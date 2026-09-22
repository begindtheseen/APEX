var ENV = require('./_env');
// The checkpoint completion mechanism: it exists, it persists, and it gates.
const { chromium } = require('playwright');
const U = ENV.BASE + '/index.html';
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

(async () => {
  const b = await chromium.launch(ENV.launchOpts);
  const ctx = await b.newContext();
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(String(e)));
  await p.goto(U);
  await p.evaluate(() => localStorage.clear());
  await p.goto(U);
  await p.evaluate(() => { enterLaunchpad(); lpOpen('M1'); });
  await p.waitForTimeout(300);

  // M1 has 8 checkpoints.
  const n = await p.evaluate(() => document.querySelectorAll('#launchpadApp .lx-cp').length);
  ok('checkpoints render as controls', n === 8, 'n=' + n);

  const bar = await p.evaluate(() => (document.querySelector('#launchpadApp .lx-cpbar span') || {}).textContent);
  ok('the counter starts at zero', /0 of 8/.test(bar || ''), bar);

  // M1 is locked until M0 passes: ticking must refuse.
  await p.evaluate(() => document.querySelectorAll('#launchpadApp .lx-cp')[0].click());
  await p.waitForTimeout(200);
  let done = await p.evaluate(() => lpCpCount('M1').done);
  ok('a locked module refuses a checkpoint', done === 0, 'done=' + done);

  // Pass M0 so M1 opens.
  await p.evaluate(() => {
    lpOpen('M0');
    lpToggle('M0', 'delta');
    // M0 has no checkpoints, so the artifact opens straight away.
    lpToggle('M0', 'artifact');
    lpToggle('M0', 'gate');
    lpOpen('M1');
  });
  await p.waitForTimeout(300);
  ok('M0 passes with no checkpoints of its own', await p.evaluate(() => lpProgress().M0.gate === true));

  // Delta first.
  await p.evaluate(() => document.querySelectorAll('#launchpadApp .lx-cp')[0].click());
  await p.waitForTimeout(150);
  done = await p.evaluate(() => lpCpCount('M1').done);
  ok('a checkpoint needs the delta first', done === 0, 'done=' + done);

  await p.evaluate(() => { lpToggle('M1', 'delta'); });
  await p.waitForTimeout(200);

  // Tick three.
  await p.evaluate(async () => {
    for (const i of [0, 1, 2]) { document.querySelectorAll('#launchpadApp .lx-cp')[i].click(); }
  });
  await p.waitForTimeout(300);
  done = await p.evaluate(() => lpCpCount('M1').done);
  ok('checkpoints tick', done === 3, 'done=' + done);

  const bar2 = await p.evaluate(() => (document.querySelector('#launchpadApp .lx-cpbar span') || {}).textContent);
  ok('the counter follows', /3 of 8/.test(bar2 || ''), bar2);

  // The artifact must refuse while checkpoints are outstanding.
  let toastMsg = null;
  p.on('console', () => {});
  await p.evaluate(() => { lpToggle('M1', 'artifact'); });
  await p.waitForTimeout(200);
  ok('the artifact is refused with checkpoints outstanding',
    await p.evaluate(() => lpProgress().M1.artifact === false));
  toastMsg = await p.evaluate(() => (document.getElementById('toast') || {}).textContent);
  ok('and the refusal says how many are left', /3 of 8/.test(toastMsg || ''), toastMsg);

  // Finish them.
  await p.evaluate(() => {
    for (let i = 3; i < 8; i++) document.querySelectorAll('#launchpadApp .lx-cp')[i].click();
  });
  await p.waitForTimeout(400);
  done = await p.evaluate(() => lpCpCount('M1').done);
  ok('all eight tick', done === 8, 'done=' + done);

  await p.evaluate(() => { lpToggle('M1', 'artifact'); });
  await p.waitForTimeout(200);
  ok('the artifact opens once they are all done', await p.evaluate(() => lpProgress().M1.artifact === true));

  await p.evaluate(() => { lpToggle('M1', 'gate'); });
  await p.waitForTimeout(200);
  ok('the gate opens after the artifact', await p.evaluate(() => lpProgress().M1.gate === true));
  ok('and M2 unlocks', await p.evaluate(() => lpApi().isUnlocked('M2', lpProgress()) === true));

  // Persistence across a reload.
  await p.reload();
  await p.evaluate(() => { enterLaunchpad(); lpOpen('M1'); });
  await p.waitForTimeout(300);
  ok('checkpoints survive a reload', await p.evaluate(() => lpCpCount('M1').done) === 8);
  const ticked = await p.evaluate(() => document.querySelectorAll('#launchpadApp .lx-cp.on').length);
  ok('and render as ticked', ticked === 8, 'ticked=' + ticked);

  // Un-ticking a checkpoint takes back what rested on it.
  p.on('dialog', d => d.accept());
  await p.evaluate(() => { lpCp('M1', 4); });
  await p.waitForTimeout(300);
  const after = await p.evaluate(() => ({ cp: lpCpCount('M1').done, a: lpProgress().M1.artifact, g: lpProgress().M1.gate, m2: lpApi().isUnlocked('M2', lpProgress()) }));
  ok('un-ticking a checkpoint clears the artifact and the gate',
    after.cp === 7 && after.a === false && after.g === false && after.m2 === false, JSON.stringify(after));

  // Export/import round trip keeps them.
  await p.evaluate(() => { lpCp('M1', 4); });
  await p.waitForTimeout(200);
  const round = await p.evaluate(() => {
    const raw = JSON.parse(localStorage.getItem('apex_launchpad_v1'));
    const cleaned = lpClean(raw);
    return cleaned.mods.M1 && Object.keys(cleaned.mods.M1.cp).length;
  });
  ok('lpClean carries the checkpoints through an import', round === 8, 'n=' + round);

  ok('no page errors', errs.length === 0, errs.join(' | '));
  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nCHECKPOINT COMPLETION WORKS');
  process.exit(fails ? 1 : 0);
})();
