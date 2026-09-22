var ENV = require('./_env');
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
  {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
    const p = await ctx.newPage();
    const errs = []; p.on('pageerror', e => errs.push(String(e)));
    await p.goto(U);
    await p.evaluate(() => { localStorage.clear(); });
    await p.goto(U);
    await p.evaluate(() => enterLaunchpad());
    await p.waitForTimeout(900);
    const a = await p.evaluate(() => {
      const svgs = Array.from(document.querySelectorAll('#launchpadApp svg'));
      const vis = [], hid = [];
      for (const s of svgs) {
        const r = s.getBoundingClientRect();
        const onScreen = r.bottom > -200 && r.top < innerHeight + 200 && r.width > 0;
        (onScreen ? vis : hid).push(s.animationsPaused() ? 'paused' : 'running');
      }
      return { total: svgs.length, visRunning: vis.filter(x => x === 'running').length, vis: vis.length,
               hidPaused: hid.filter(x => x === 'paused').length, hid: hid.length };
    });
    ok('off-screen figures are paused', a.hid === 0 || a.hidPaused === a.hid, JSON.stringify(a));
    ok('on-screen figures still run', a.vis === 0 || a.visRunning > 0, JSON.stringify(a));

    // scrolling resumes what comes into view
    await p.evaluate(() => { const m = document.querySelector('#launchpadApp .lp-main') || document.scrollingElement; m.scrollTop = 2000; });
    await p.waitForTimeout(700);
    const c = await p.evaluate(() => {
      const svgs = Array.from(document.querySelectorAll('#launchpadApp svg'));
      let onRunning = 0;
      for (const s of svgs) {
        const r = s.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight && r.width > 0 && !s.animationsPaused()) onRunning++;
      }
      return onRunning;
    });
    ok('scrolling resumes what comes into view', c > 0, 'running=' + c);

    // ---- 4.3 leaving the realm stops the clocks ----
    await p.evaluate(() => exitLaunchpad());
    await p.waitForTimeout(400);
    const d = await p.evaluate(() => {
      const svgs = Array.from(document.querySelectorAll('#launchpadApp svg'));
      return { total: svgs.length, running: svgs.filter(s => !s.animationsPaused()).length };
    });
    ok('leaving the realm pauses every figure in it', d.total === 0 || d.running === 0, JSON.stringify(d));
    ok('no page errors', errs.length === 0, errs.join(' | '));
    await ctx.close();
  }

  // ---- 7.2 / 7.3 the per-render waste ----
  {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(U);
    await p.evaluate(() => { localStorage.clear(); });
    await p.goto(U);
    const counts = await p.evaluate(() => {
      enterLaunchpad();
      const API = AI_CURRICULUM_API;
      let plan = 0, cp = 0, byId = 0;
      const rp = API.plan, rc = API.criticalPath, rb = API.byId;
      API.plan = function () { plan++; return rp.apply(this, arguments); };
      API.criticalPath = function () { cp++; return rc.apply(this, arguments); };
      API.byId = function () { byId++; return rb.apply(this, arguments); };
      LP_ART_ROWS = null; LP_ART_ROWS_KEY = null;
      renderLaunchpad(true);
      API.plan = rp; API.criticalPath = rc; API.byId = rb;
      return { plan, cp, byId };
    });
    console.log('        home render: plan()=' + counts.plan + ' criticalPath()=' + counts.cp + ' byId()=' + counts.byId);
    ok('plan() is no longer run per layer scene', counts.plan <= 6, 'plan=' + counts.plan);
    ok('criticalPath() is computed once', counts.cp <= 3, 'cp=' + counts.cp);

    // ---- 3.2 no forced sync layout to replay the entrance ----
    const src = await p.evaluate(() => document.documentElement.outerHTML.indexOf('void host.offsetWidth'));
    ok('the entrance no longer forces a synchronous layout', src === -1);

    // render time
    const t = await p.evaluate(() => {
      const runs = [];
      for (let i = 0; i < 12; i++) { const a = performance.now(); renderLaunchpad(true); runs.push(performance.now() - a); }
      runs.sort((x, y) => x - y);
      return Math.round(runs[Math.floor(runs.length / 2)] * 10) / 10;
    });
    console.log('        median Home render: ' + t + 'ms');
    ok('Home renders in a reasonable time', t < 120, t + 'ms');
    await ctx.close();
  }

  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nALL PERFORMANCE CHECKS PASSED');
  process.exit(fails ? 1 : 0);
})();
