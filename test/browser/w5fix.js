var ENV = require('./_env');
// The wave-5 walkthrough and code-review findings, re-run against the fixes.
const { chromium } = require('playwright');
const U = ENV.BASE + '/index.html';
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

(async () => {
  const b = await chromium.launch(ENV.launchOpts);
  const ctx = await b.newContext({ viewport: { width: 390, height: 900 } });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  p.on('dialog', d => d.accept());

  await p.goto(U);
  await p.evaluate(() => localStorage.clear());
  await p.goto(U);

  // ---- H2: a legacy record must not enter the new regime in violation ----
  await p.evaluate(() => localStorage.setItem('apex_launchpad_v1', JSON.stringify({
    ids: 2, flagship: {}, setup: {},
    mods: { M0: { delta: true, artifact: true, gate: true },
            M1: { delta: true, artifact: true, gate: true } }   // no cp at all
  })));
  await p.goto(U);
  await p.evaluate(() => { enterLaunchpad(); lpOpen('M1'); });
  await p.waitForTimeout(400);
  const legacy = await p.evaluate(() => ({ c: lpCpCount('M1'), txt: (document.querySelector('#launchpadApp .lx-cpbar span') || {}).textContent }));
  ok('a record claimed under the old rules shows its checkpoints as done',
    legacy.c.done === legacy.c.total && legacy.c.total === 8, JSON.stringify(legacy));

  // ---- H2b: the gate may not be claimed with checkpoints outstanding ----
  await p.evaluate(() => localStorage.clear());
  await p.goto(U);
  await p.evaluate(() => {
    enterLaunchpad();
    lpToggle('M0', 'delta'); lpToggle('M0', 'artifact'); lpToggle('M0', 'gate');
    lpOpen('M1'); lpToggle('M1', 'delta');
    // Tick two, then force the artifact past the guard the way a hand-edited
    // record could. Two ticked means this is NOT the legacy case, so the
    // migration does not fill the rest and the gate must still refuse.
    lpCp('M1', 0); lpCp('M1', 1);
    LP_ST.mods.M1.artifact = true; lpSave();
    lpToggle('M1', 'gate');
  });
  await p.waitForTimeout(300);
  ok('the gate refuses with checkpoints outstanding',
    await p.evaluate(() => lpProgress().M1.gate === false));

  // ---- M1/W2: un-ticking delta clears the checkpoints with it ----
  await p.evaluate(() => localStorage.clear());
  await p.goto(U);
  await p.evaluate(() => {
    enterLaunchpad();
    lpToggle('M0', 'delta'); lpToggle('M0', 'artifact'); lpToggle('M0', 'gate');
    lpOpen('M1'); lpToggle('M1', 'delta');
    for (let i = 0; i < 8; i++) lpCp('M1', i);
  });
  await p.waitForTimeout(400);
  ok('all eight tick', await p.evaluate(() => lpCpCount('M1').done) === 8);
  await p.evaluate(() => lpToggle('M1', 'delta'));
  await p.waitForTimeout(400);
  const afterDelta = await p.evaluate(() => ({ cp: lpCpCount('M1').done, delta: lpProgress().M1.delta }));
  ok('un-ticking the delta clears the checkpoints too', afterDelta.cp === 0 && afterDelta.delta === false, JSON.stringify(afterDelta));
  const foot = await p.evaluate(() => {
    lpOpen('M1');
    return Array.from(document.querySelectorAll('#launchpadApp .lx-ls')).map(e => e.textContent).join(' | ');
  });
  ok('and the page no longer says the artifact can be claimed', !/can be claimed/.test(foot), foot.slice(0, 120));

  // ---- H3: a checkpoint tick is keyed by its text, not its position ----
  const keyed = await p.evaluate(() => {
    localStorage.clear();
    enterLaunchpad();
    lpToggle('M0', 'delta'); lpToggle('M0', 'artifact'); lpToggle('M0', 'gate');
    lpOpen('M1'); lpToggle('M1', 'delta');
    lpCp('M1', 0); lpCp('M1', 1);
    const stored = JSON.parse(localStorage.getItem('apex_launchpad_v1')).mods.M1.cp;
    const keys = Object.keys(stored);
    return { keys, looksHashed: keys.every(k => /^c[0-9a-z]+$/.test(k)) };
  });
  ok('ticks are stored under a content key, not an index', keyed.looksHashed && keyed.keys.length === 2, JSON.stringify(keyed));
  const survive = await p.evaluate(() => {
    // shrink the list, reload the entry, then restore it
    const m = lpApi().byId('M1');
    const full = m.checkpoints.slice();
    m.checkpoints = full.slice(0, 2);
    const shrunk = lpCpCount('M1').done;
    m.checkpoints = full;
    return { shrunk, restored: lpCpCount('M1').done };
  });
  ok('shrinking the list does not destroy ticks outside it', survive.restored === 2, JSON.stringify(survive));

  // ---- W4/M6: the owns line must not point backwards ----
  const owns = await p.evaluate(() => {
    const out = {};
    ['M20', 'M6', 'M3', 'M13', 'M10', 'M12', 'M2'].forEach(id => {
      lpOpen(id);
      const el = document.querySelector('#launchpadApp .lx-sub');
      out[id] = el ? el.textContent.trim().slice(-120) : '';
    });
    return out;
  });
  ok('M20 says cost is introduced in M6 and owned here', /introduced in M6 and owned here/.test(owns.M20), owns.M20);
  ok('M3 points forward to M13', /taken further in M13/.test(owns.M3), owns.M3);
  ok('M10 points forward to M12', /taken further in M12/.test(owns.M10), owns.M10);
  ok('M2 still says taught here and nowhere else', /taught here and nowhere else/.test(owns.M2), owns.M2);

  // ---- W1: the plan must not reward typing a bigger number ----
  const plan = await p.evaluate(() => {
    const a = lpApi().plan({ runwayMonths: 30, weeklyHours: 18 });
    const c = lpApi().plan({ runwayMonths: 30, weeklyHours: 20 });
    const d = lpApi().plan({ runwayMonths: 30, weeklyHours: 999 });
    return { at18: a.fullMonths, at20: c.fullMonths, at999: d.fullMonths, capped: c.cappedByCeiling };
  });
  ok('entering more than the ceiling does not shorten the program',
    plan.at18 === plan.at20 && plan.at20 === plan.at999 && plan.capped === true, JSON.stringify(plan));

  // ---- W6: "checkpoint" is defined somewhere the reader will find it ----
  const gloss = await p.evaluate(() => {
    lpTab('home');
    return /Checkpoint/.test(document.getElementById('launchpadApp').innerText);
  });
  ok('the word "checkpoint" is defined on Home', gloss === true);

  // ---- W8: a locked module must not tell you to tick things ----
  const locked = await p.evaluate(() => {
    localStorage.clear(); lpLoad(); lpOpen('M5');
    const t = document.getElementById('launchpadApp').innerText;
    return { tellsYouToTick: /Tick each one as you finish it/.test(t), saysLocked: /locked, so nothing here can be ticked/.test(t) };
  });
  ok('a locked module says so instead of telling you to tick',
    locked.saysLocked && !locked.tellsYouToTick, JSON.stringify(locked));

  // ---- W7: the ladder's rule text matches the enforced order ----
  // The rulebook is a lead sentence plus a definition list now, not one blob.
  const rule = await p.evaluate(() => { lpTab('modules'); return document.getElementById('launchpadApp').innerText; });
  ok('the ladder describes the real order', /checkpoint/i.test(rule) && !/three ticks/.test(rule), rule.slice(0, 150));

  ok('no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nALL WAVE-5 WALKTHROUGH FIXES VERIFIED');
  process.exit(fails ? 1 : 0);
})();
