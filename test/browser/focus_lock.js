var ENV = require('./_env');
var LP = require('./_launchpad');
// A running focus block holds her on its lesson. Every way out is tried — a
// sidebar link, the back button, a typed address, the realm switcher — and
// each must leave her where she was, with the strip saying why. Pause is
// unavailable (with its countdown showing) until five minutes of the block
// have run; once paused she can go anywhere, and Resume takes her back.
// "I'm done" works at any moment. The page's clock is faked, so the five
// minutes pass in an instant.
const { chromium } = require('playwright');
let fails = 0;
// The sidebar hides off-screen until the pointer reaches the edge, so links in
// it are clicked the way the browser dispatches a click, event and all.
const tap = (p, sel) => p.evaluate((q) => document.querySelector(q).click(), sel);
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

(async () => {
  const b = await chromium.launch(ENV.launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: 'block' });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  await p.clock.install({ time: new Date('2026-09-26T10:00:00Z') });
  await LP.reset(p);
  await LP.open(p, '/focus');

  await p.click('button:has-text("Start 15 minutes")');
  await p.waitForSelector('.fbar');
  await p.clock.runFor(1500);
  const lesson = await p.evaluate(() => location.hash);
  ok('starting a block opens the thing it is for', /^#\/(module|review|bench|learning)/.test(lesson), lesson);
  const pause = p.locator('.fbar__btn', { hasText: /Pause/ });
  ok('Pause is not available at the start of a block, and says when it will be', await pause.isDisabled() && /Pause in 5:00|Pause in 4:5\d/.test(await pause.innerText()), await pause.innerText());
  ok('the ways out are dimmed while the block runs', (await p.evaluate(() => document.documentElement.dataset.focusLock)) === 'true');

  // Out through the sidebar.
  await tap(p, '.side__nav a[href="#/settings"]');
  await p.clock.runFor(800);
  ok('a sidebar link does not take her out of the lesson', (await p.evaluate(() => location.hash)) === lesson, await p.evaluate(() => location.hash));
  const notice = await p.locator('.fbar__notice').innerText().catch(() => '');
  ok('and the strip says why, and how to leave', /focus block/.test(notice) && /pause in \d:\d\d|end the block/i.test(notice), notice);

  // Out by typing an address (or any code that changes the route).
  await p.evaluate(() => { location.hash = '#/settings'; });
  await p.clock.runFor(800);
  ok('changing the address puts her back on the lesson', (await p.evaluate(() => location.hash)) === lesson, await p.evaluate(() => location.hash));

  // Out through the back button.
  await p.goBack().catch(() => {});
  await p.clock.runFor(800);
  ok('the back button puts her back on the lesson', (await p.evaluate(() => location.hash)) === lesson, await p.evaluate(() => location.hash));

  // Out of the app entirely, through the realm switcher.
  await tap(p, '.nav-item--realms');
  await p.clock.runFor(800);
  ok('the realm switcher does not take her out of the app either', p.url().includes('/launchpad/') && (await p.evaluate(() => location.hash)) === lesson, p.url());

  // Five minutes of focus later, Pause opens up.
  await p.clock.runFor(5 * 60_000);
  ok('after five minutes of focus, Pause is available', !(await pause.isDisabled()) && (await pause.innerText()).trim() === 'Pause', await pause.innerText());
  await pause.click();
  await p.clock.runFor(500);
  const pausedLabel = await p.locator('.fbar__label').innerText()
  const lockAttr = await p.evaluate(() => document.documentElement.dataset.focusLock ?? '')
  ok('paused, the strip says so and the way out opens', /Paused/i.test(pausedLabel) && !lockAttr, JSON.stringify({ pausedLabel, lockAttr }));
  await tap(p, '.side__nav a[href="#/settings"]');
  await p.clock.runFor(800);
  ok('paused, she can go anywhere', (await p.evaluate(() => location.hash)) === '#/settings');

  // Resume takes her back, and the next pause waits another five minutes.
  await p.click('.fbar__btn:has-text("Resume")');
  await p.clock.runFor(800);
  ok('Resume takes her back to the lesson', (await p.evaluate(() => location.hash)) === lesson, await p.evaluate(() => location.hash));
  ok('and Pause waits another five minutes', await pause.isDisabled() && /Pause in [45]:\d\d/.test(await pause.innerText()), await pause.innerText());
  await p.clock.runFor(2 * 60_000);
  ok('the countdown on Pause keeps time', /Pause in [23]:\d\d/.test(await pause.innerText()), await pause.innerText());

  // "I'm done" is never rationed.
  await p.click('.fbar__btn--end');
  await p.clock.runFor(800);
  ok("\"I'm done\" ends the block at any moment", (await p.locator('.fbar').count()) === 0 && (await p.evaluate(() => location.hash)) === '#/focus');
  const day = await p.evaluate(() => document.querySelector('.focus-done')?.textContent ?? '');
  ok('and the block is credited', /done|today/.test(day), day);
  await tap(p, '.side__nav a[href="#/settings"]');
  await p.clock.runFor(800);
  ok('with the block over, she is free again', (await p.evaluate(() => location.hash)) === '#/settings' && !(await p.evaluate(() => document.documentElement.dataset.focusLock)));

  ok('no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
  await b.close();
  console.log(fails ? `\n${fails} FAILED` : '\nA FOCUS BLOCK HOLDS HER ON THE LESSON');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
