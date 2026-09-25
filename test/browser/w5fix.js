var ENV = require('./_env');
var LP = require('./_launchpad');
// The wave-5 walkthrough and code-review findings, re-run against LAUNCHPAD as
// its own app. The rules they pinned now live in launchpad-app/src/engine/
// claims.ts; these check that the app a reader uses still keeps them.
const { chromium } = require('playwright');
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

async function seed(p, rec) {
  await LP.reset(p);
  await p.evaluate(r => localStorage.setItem('apex_launchpad_v1', JSON.stringify(r)), rec);
}

(async () => {
  const b = await chromium.launch(ENV.launchOpts);
  const ctx = await b.newContext({ viewport: { width: 390, height: 900 } });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  p.on('dialog', d => d.accept());
  const counter = () => p.locator('.cpbar span').first().textContent();

  // ---- H2: a legacy record must not enter the new regime in violation ----
  await seed(p, { ids: 2, flagship: {}, setup: {},
    mods: { M0: { delta: true, artifact: true, gate: true },
            M1: { delta: true, artifact: true, gate: true } } });   // no cp at all
  await LP.open(p, '/module/M1?step=build');
  ok('a record claimed under the old rules shows its checkpoints as done', /8 of 8/.test(await counter()), await counter());

  // ---- H2b: the gate may not be claimed with checkpoints outstanding ----
  // A hand-edited record claims the artifact with two of eight ticked. Two
  // ticked means this is not the legacy case, so nothing is filled in, and
  // the gate must still refuse.
  // The keys are the realm's hash of each checkpoint's text.
  const labels = await LP.checkpoints(p).locator('.tick__label').allTextContents();
  const cpKey = t => { let h = 5381; for (let i = 0; i < t.length; i++) h = ((h * 33) ^ t.charCodeAt(i)) >>> 0; return 'c' + h.toString(36); };
  const firstTwo = labels.slice(0, 2).map(cpKey);
  await seed(p, { ids: 2, flagship: {}, setup: {},
    mods: { M0: { delta: true, artifact: true, gate: true },
            M1: { delta: true, artifact: true, gate: false, cp: { [firstTwo[0]]: true, [firstTwo[1]]: true } } } });
  await LP.open(p, '/module/M1?step=build');
  await LP.tick(p, /^Gate passed/);
  ok('the gate refuses with checkpoints outstanding', (await LP.record(p)).mods.M1.gate === false,
    await p.locator('.lp-refusal').last().textContent().catch(() => ''));

  // ---- M1/W2: un-ticking delta clears the checkpoints with it ----
  await LP.reset(p);
  await LP.open(p, '/');
  await LP.pass(p, 'M0');
  await LP.go(p, '/module/M1?step=build');
  await LP.tick(p, /^Delta written/);
  const cps = LP.checkpoints(p);
  for (let i = 0; i < 8; i++) { await cps.nth(i).click(); await p.waitForTimeout(60); }
  ok('all eight tick', /8 of 8/.test(await counter()));
  await LP.tick(p, /^Delta written/);
  const m1 = (await LP.record(p)).mods.M1;
  ok('un-ticking the delta clears the checkpoints too', Object.keys(m1.cp).length === 0 && m1.delta === false, JSON.stringify(m1));
  const foot = await LP.text(p);
  ok('and the page no longer says the artifact can be claimed', !/Tick "Artifact built"/.test(foot) && /Write the delta first — that is what opens these/.test(foot));

  // ---- H3: a checkpoint tick is keyed by its text, not its position ----
  await LP.tick(p, /^Delta written/);
  await cps.nth(0).click(); await cps.nth(1).click(); await p.waitForTimeout(150);
  const keys = Object.keys((await LP.record(p)).mods.M1.cp);
  ok('ticks are stored under a content key, not an index', keys.length === 2 && keys.every(k => /^c[0-9a-z]+$/.test(k)), keys.join(','));

  // ---- W4/M6: the owns line must not point backwards ----
  const owns = {};
  for (const id of ['M20', 'M3', 'M10', 'M2']) {
    await LP.go(p, '/module/' + id + '?step=learn');
    owns[id] = (await p.locator('.page-head__sub').first().textContent()).trim().slice(-120);
  }
  ok('M20 says cost is introduced in M6 and owned here', /introduced in M6 and owned here/.test(owns.M20), owns.M20);
  ok('M3 points forward to M13', /taken further in M13/.test(owns.M3), owns.M3);
  ok('M10 points forward to M12', /taken further in M12/.test(owns.M10), owns.M10);
  ok('M2 still says taught here and nowhere else', /taught here and nowhere else/.test(owns.M2), owns.M2);

  // ---- W1: the plan must not reward typing a bigger number ----
  await LP.go(p, '/plan');
  const months = async (h) => {
    await p.fill('#lpRunway', '30'); await p.fill('#lpHours', String(h)); await p.waitForTimeout(200);
    return p.locator('.lp-path').first().locator('.lp-path__value').textContent();
  };
  const at18 = await months(18), at20 = await months(20), at999 = await months(999);
  const capped = /Every figure above is worked out at 18/.test(await LP.text(p));
  ok('entering more than the ceiling does not shorten the program',
    at18 === at20 && at20 === at999 && capped, JSON.stringify({ at18, at20, at999, capped }));

  // ---- W6: "checkpoint" is defined somewhere the reader will find it ----
  await LP.go(p, '/');
  ok('the word "checkpoint" is defined on Home', /Checkpoint\s*\n?\s*A named piece of a module/.test(await LP.text(p)));

  // ---- W8: a locked module must not tell you to tick things ----
  await LP.go(p, '/module/M5?step=build');
  const locked = await LP.text(p);
  ok('a locked module says so instead of telling you to tick',
    /locked, so nothing here can be ticked/.test(locked) && !/Tick each one as you finish it —/.test(locked));

  // ---- W7: the ladder's rule text matches the enforced order ----
  await LP.go(p, '/learning');
  const rule = await LP.text(p);
  ok('the ladder describes the real order', /tick each checkpoint as you finish it/i.test(rule) && !/three ticks/.test(rule));

  ok('no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nALL WAVE-5 WALKTHROUGH FIXES VERIFIED');
  process.exit(fails ? 1 : 0);
})();
