var ENV = require('./_env');
var LP = require('./_launchpad');
// LAUNCHPAD on a phone with a notch. The page is drawn edge to edge
// (viewport-fit=cover, translucent status bar when installed), so without
// safe-area padding the top bar sits under the clock: the menu button and
// search were only reachable by pulling the page down past its top. The
// device insets are emulated here the way an iPhone reports them.
const { chromium, devices } = require('playwright');
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };
const TOP = 47, BOTTOM = 34, BAR = 62;

(async () => {
  const b = await chromium.launch(ENV.launchOpts);
  const ctx = await b.newContext({ ...devices['iPhone 13'] });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await LP.reset(p);
  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Emulation.setSafeAreaInsetsOverride', { insets: { top: TOP, bottom: BOTTOM, left: 0, right: 0 } });

  const chrome = () => p.evaluate(() => {
    const r = s => { const e = document.querySelector(s); return e ? e.getBoundingClientRect() : null; };
    const burger = r('.topbar__burger'), bar = r('.topbar');
    return {
      barTop: Math.round(bar.top), burgerTop: Math.round(burger.top), burgerBottom: Math.round(burger.bottom),
      docScrolls: document.scrollingElement.scrollHeight > innerHeight + 1,
    };
  });

  for (const route of ['/', '/learning', '/module/M1?step=learn', '/plan']) {
    await LP.open(p, route);
    const top = await chrome();
    ok(route + ': the menu button clears the status bar', top.burgerTop >= TOP && top.burgerBottom <= TOP + BAR, JSON.stringify(top));
    ok(route + ': the document never scrolls the bar away', !top.docScrolls, JSON.stringify(top));
    await p.evaluate(() => { document.querySelector('.scroll').scrollTop = 1800; });
    await p.waitForTimeout(300);
    const down = await chrome();
    ok(route + ': scrolled down, the bar is still pinned below the status bar', down.barTop === 0 && down.burgerTop >= TOP, JSON.stringify(down));
  }

  await LP.go(p, '/learning');
  await p.click('.topbar__burger');
  await p.waitForTimeout(450);
  const side = await p.evaluate(() => ({
    brand: document.querySelector('.side__brand a').getBoundingClientRect().top,
    footPad: parseFloat(getComputedStyle(document.querySelector('.side__foot')).paddingBottom),
  }));
  ok('the drawer\'s wordmark clears the status bar', side.brand >= TOP, JSON.stringify(side));
  ok('the drawer\'s foot clears the home indicator', side.footPad >= BOTTOM, JSON.stringify(side));

  ok('no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nTHE TOP BAR CLEARS THE NOTCH');
  process.exit(fails ? 1 : 0);
})();
