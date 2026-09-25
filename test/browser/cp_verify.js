var ENV = require('./_env');
var LP = require('./_launchpad');
// The checkpoint completion mechanism: it exists, it persists, and it gates —
// driven through LAUNCHPAD's own Build step, the way a reader ticks them.
const { chromium } = require('playwright');
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

(async () => {
  const b = await chromium.launch(ENV.launchOpts);
  const ctx = await b.newContext();
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(String(e)));
  p.on('dialog', d => d.accept());
  await LP.reset(p);
  await LP.open(p, '/module/M1?step=build');

  const cps = LP.checkpoints(p);
  const cpDone = async () => (await LP.record(p))?.mods?.M1 ? Object.keys((await LP.record(p)).mods.M1.cp || {}).length : 0;
  const counter = () => p.locator('.cpbar span').first().textContent();

  // M1 has 8 checkpoints.
  const n = await cps.count();
  ok('checkpoints render as controls', n === 8 && (await cps.first().getAttribute('role')) === 'checkbox', 'n=' + n);
  ok('the counter starts at zero', /0 of 8/.test(await counter()), await counter());

  // M1 is locked until M0 passes: ticking must refuse.
  await cps.first().click({ force: true });
  await p.waitForTimeout(200);
  ok('a locked module refuses a checkpoint', (await cpDone()) === 0);
  ok('and its checkpoints leave the tab order',
    (await cps.evaluateAll(els => els.every(e => e.getAttribute('tabindex') === '-1' && e.getAttribute('aria-disabled') === 'true'))));

  // Pass M0 so M1 opens. M0 has no checkpoints, so the artifact opens at once.
  await LP.pass(p, 'M0');
  ok('M0 passes with no checkpoints of its own', (await LP.record(p)).mods.M0.gate === true);
  await LP.go(p, '/module/M1?step=build');

  // Delta first.
  await cps.first().click();
  await p.waitForTimeout(150);
  ok('a checkpoint needs the delta first', (await cpDone()) === 0);
  ok('and says so', /delta first/i.test((await p.locator('.lp-refusal').first().textContent().catch(() => '')) || ''));

  await LP.tick(p, /^Delta written/);

  for (const i of [0, 1, 2]) { await cps.nth(i).click(); await p.waitForTimeout(80); }
  ok('checkpoints tick', (await cpDone()) === 3, 'done=' + (await cpDone()));
  ok('the counter follows', /3 of 8/.test(await counter()), await counter());

  // The artifact must refuse while checkpoints are outstanding, and say how many.
  await LP.tick(p, /^Artifact built/);
  ok('the artifact is refused with checkpoints outstanding', (await LP.record(p)).mods.M1.artifact === false);
  const refusal = await p.locator('.lp-refusal').last().textContent();
  ok('and the refusal says how many are left', /3 of 8/.test(refusal || ''), refusal);

  for (let i = 3; i < 8; i++) { await cps.nth(i).click(); await p.waitForTimeout(80); }
  ok('all eight tick', (await cpDone()) === 8);

  await LP.tick(p, /^Artifact built/);
  ok('the artifact opens once they are all done', (await LP.record(p)).mods.M1.artifact === true);
  await LP.tick(p, /^Gate passed/);
  ok('the gate opens after the artifact', (await LP.record(p)).mods.M1.gate === true);
  await LP.go(p, '/module/M2?step=build');
  ok('and M2 unlocks', (await p.locator('.card', { hasText: 'Locked — reading ahead is fine' }).count()) === 0);

  // Persistence across a reload.
  await p.reload({ waitUntil: 'networkidle' });
  await LP.go(p, '/module/M1?step=build');
  await p.waitForTimeout(300);
  ok('checkpoints survive a reload', (await cpDone()) === 8);
  ok('and render as ticked', (await cps.evaluateAll(els => els.filter(e => e.getAttribute('aria-checked') === 'true').length)) === 8);

  // Un-ticking a checkpoint takes back what rested on it, here and downstream.
  await cps.nth(4).click();
  await p.waitForTimeout(300);
  const r = (await LP.record(p)).mods.M1;
  ok('un-ticking a checkpoint clears the artifact and the gate',
    Object.keys(r.cp).length === 7 && r.artifact === false && r.gate === false, JSON.stringify({ cp: Object.keys(r.cp).length, a: r.artifact, g: r.gate }));
  await LP.go(p, '/module/M2?step=build');
  ok('and M2 locks again', (await p.locator('.card', { hasText: 'Locked — reading ahead is fine' }).count()) === 1);

  // The mirrored record carries the checkpoints under their content keys, so
  // an old backup and this app read each other's ticks.
  await LP.go(p, '/module/M1?step=build');
  await cps.nth(4).click();
  await p.waitForTimeout(200);
  const keys = Object.keys((await LP.record(p)).mods.M1.cp);
  ok('checkpoints are recorded under content keys', keys.length === 8 && keys.every(k => /^c[0-9a-z]+$/.test(k)), keys.slice(0, 3).join(','));

  ok('no page errors', errs.length === 0, errs.join(' | '));
  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nCHECKPOINT COMPLETION WORKS');
  process.exit(fails ? 1 : 0);
})();
