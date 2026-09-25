var ENV = require('./_env');
var LP = require('./_launchpad');
// Re-measures the wave-4 performance findings against the fixes.
const { chromium } = require('playwright');
const U = ENV.BASE + '/index.html';
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

(async () => {
  const b = await chromium.launch(ENV.launchOpts);

  // ---- 1.1 the launcher is honest about not being ready ----
  {
    const ctx = await b.newContext();
    const p = await ctx.newPage();
    await p.goto(U, { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(600);
    const st = await p.evaluate(() => ({
      booting: document.body.classList.contains('booting'),
      clickable: getComputedStyle(document.querySelector('.lsLp')).pointerEvents
    }));
    ok('once loaded, the launcher is live', st.booting === false && st.clickable !== 'none', JSON.stringify(st));
    await ctx.close();
  }

  // ---- 6.1 off-screen animations are paused ----
  // LAUNCHPAD's figures are SMIL, which CSS cannot stop: each one is paused
  // until it is near the viewport and paused again when it leaves.
  const figs = (p) => p.evaluate(() => {
    const svgs = Array.from(document.querySelectorAll('.shell svg'))
      .filter(s => s.animationsPaused && s.querySelector('animate, animateTransform, animateMotion'));
    const vis = [], hid = [];
    for (const s of svgs) {
      const r = s.getBoundingClientRect();
      const onScreen = r.bottom > -200 && r.top < innerHeight + 200 && r.width > 0;
      (onScreen ? vis : hid).push(s.animationsPaused() ? 'paused' : 'running');
    }
    return { total: svgs.length, visRunning: vis.filter(x => x === 'running').length, vis: vis.length,
             hidPaused: hid.filter(x => x === 'paused').length, hid: hid.length };
  });
  {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
    const p = await ctx.newPage();
    const errs = []; p.on('pageerror', e => errs.push(String(e)));
    await LP.reset(p);
    await LP.open(p, '/');
    await p.waitForTimeout(600);
    const a = await figs(p);
    ok('off-screen figures are paused', a.total > 0 && a.hid > 0 && a.hidPaused === a.hid, JSON.stringify(a));
    ok('on-screen figures still run', a.vis === 0 || a.visRunning > 0, JSON.stringify(a));

    // scrolling resumes what comes into view
    await p.evaluate(() => {
      const last = Array.from(document.querySelectorAll('.shell svg')).filter(s => s.querySelector('animate, animateTransform, animateMotion')).pop();
      last.scrollIntoView({ block: 'center' });
    });
    await p.waitForTimeout(700);
    const c = await p.evaluate(() => {
      let onRunning = 0;
      for (const s of document.querySelectorAll('.shell svg')) {
        const r = s.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight && r.width > 0 && s.animationsPaused && !s.animationsPaused()) onRunning++;
      }
      return onRunning;
    });
    ok('scrolling resumes what comes into view', c > 0, 'running=' + c);
    const back = await figs(p);
    ok('and pauses what scrolled away', back.hid > 0 && back.hidPaused === back.hid, JSON.stringify(back));

    // ---- 4.3 leaving a page stops its clocks ----
    // The figures are unmounted with their page; the SVG timeline of the one
    // left on a module page must not run while a page without it is showing.
    await LP.go(p, '/module/M6?step=learn');
    await p.waitForSelector('.lp-figure svg');
    await p.evaluate(() => document.querySelector('.lp-figure svg').scrollIntoView({ block: 'center' }));
    await p.waitForTimeout(500);
    const m = await figs(p);
    ok('a module figure runs while its page is open', m.total === 1 && m.visRunning === 1, JSON.stringify(m));
    await LP.go(p, '/settings');
    const d = await figs(p);
    ok('leaving the page leaves no figure running', d.visRunning === 0 && d.hidPaused === d.hid, JSON.stringify(d));
    ok('no page errors', errs.length === 0, errs.join(' | '));
    await ctx.close();
  }

  // ---- 7.2 / 7.3 the per-render cost ----
  // The old realm re-rendered all of Home on every tick. The app renders one
  // route; what matters is that moving onto the heaviest pages stays quick.
  {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    await LP.reset(p);
    await LP.open(p, '/settings');
    const timeRoute = (route, sel, n) => p.evaluate(([route, sel, n]) => new Promise(res => {
      const runs = [];
      const one = () => new Promise(done => {
        location.hash = '/settings';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          const t0 = performance.now();
          location.hash = route;
          const poll = () => document.querySelectorAll(sel).length >= n ? done(performance.now() - t0) : requestAnimationFrame(poll);
          poll();
        }));
      });
      (async () => {
        for (let i = 0; i < 7; i++) runs.push(await one());
        runs.sort((x, y) => x - y);
        res(Math.round(runs[3] * 10) / 10);
      })();
    }), [route, sel, n]);
    await timeRoute('/', '.dcard', 9); // warm the lazy chunks
    const home = await timeRoute('/', '.dcard', 9);
    const ladder = await timeRoute('/learning', '.mcard', 33);
    const mod = await timeRoute('/module/M12?step=build', '.gate-row', 1);
    console.log('        median route draw: home ' + home + 'ms · ladder ' + ladder + 'ms · module ' + mod + 'ms');
    ok('Home draws in a reasonable time', home < 250, home + 'ms');
    ok('the ladder draws in a reasonable time', ladder < 250, ladder + 'ms');
    ok('a module draws in a reasonable time', mod < 250, mod + 'ms');
    await ctx.close();
  }

  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nALL PERFORMANCE CHECKS PASSED');
  process.exit(fails ? 1 : 0);
})();
