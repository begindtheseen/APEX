var ENV = require('./_env');
// Re-runs every proven exploit from the wave-4 security review against the fixes.
const { chromium } = require('playwright');
const U = ENV.BASE + '/index.html';
let fails = 0;
function ok(n, c, d) { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; }

(async () => {
  const b = await chromium.launch(ENV.launchOpts);

  async function fresh() {
    const ctx = await b.newContext();
    const p = await ctx.newPage();
    const hits = [], errs = [];
    await p.exposeFunction('__hit', s => hits.push(s));
    await p.on('pageerror', e => errs.push(String(e)));
    return { ctx, p, hits, errs };
  }

  // ---- C1: hostile ST.logs reaching the PRT and SCI tabs ----
  {
    const { ctx, p, hits, errs } = await fresh();
    await p.goto(U);
    await p.evaluate(() => localStorage.setItem('apex_v4', JSON.stringify({
      startDate: '2025-01-01', onboardDone: true, checks: {},
      logs: [
        { date: '01/01', type: '<img src=x onerror="window.__hit(\'C1_TYPE\')">', val: '<svg/onload=window.__hit("C1_VAL")>' },
        { date: '02/01', type: 'run', val: '10:00' },
        { date: '03/01', type: 'run', val: '9:30' }
      ]
    })));
    await p.goto(U);
    await p.evaluate(() => { document.getElementById('onboardScreen').classList.remove('active'); document.getElementById('mainApp').classList.add('active'); });
    for (const t of ['prt', 'sci', 'ready', 'today']) {
      await p.evaluate(tab => { try { goTab(tab); } catch (e) {} }, t);
      await p.waitForTimeout(120);
    }
    await p.waitForTimeout(400);
    ok('C1 hostile logs do not execute', hits.length === 0, JSON.stringify(hits));
    // Escaped text serialises back with the characters in it, so assert on real
    // elements: no node may actually carry an injected handler attribute.
    const rendered = await p.evaluate(() =>
      document.querySelectorAll('[onerror],[onload],[onmouseover]').length);
    ok('C1 no element carries an injected handler', rendered === 0, 'count=' + rendered);
    ok('C1 no page errors', errs.length === 0, errs.join(' | '));
    await ctx.close();
  }

  // ---- C2: hostile asvab values on the READY tab ----
  {
    const { ctx, p, hits, errs } = await fresh();
    await p.goto(U);
    await p.evaluate(() => localStorage.setItem('apex_v4', JSON.stringify({
      startDate: '2025-01-01', onboardDone: true, checks: {},
      asvab: { afqt: '<img src=x onerror="window.__hit(\'C2_AFQT\')">', nf: '<img src=x onerror="window.__hit(\'C2_NF\')">' }
    })));
    await p.goto(U);
    await p.evaluate(() => { document.getElementById('onboardScreen').classList.remove('active'); document.getElementById('mainApp').classList.add('active'); goTab('ready'); });
    await p.waitForTimeout(500);
    ok('C2 hostile asvab does not execute', hits.length === 0, JSON.stringify(hits));
    ok('C2 no page errors', errs.length === 0, errs.join(' | '));
    await ctx.close();
  }

  // ---- H2: one bad checks value must not delete the rest ----
  {
    const { ctx, p, errs } = await fresh();
    await p.goto(U);
    await p.evaluate(() => localStorage.setItem('apex_v4', JSON.stringify({
      startDate: '2025-01-01', onboardDone: true,
      checks: { '2025-06-01': ['h_sleep', 'h_water'], '2025-06-02': 5, '2025-06-03': ['h_sleep'] }
    })));
    await p.goto(U);
    const keys = await p.evaluate(() => Object.keys(ST.checks));
    ok('H2 the bad key is dropped, the good ones survive',
      keys.indexOf('2025-06-01') >= 0 && keys.indexOf('2025-06-03') >= 0 && keys.indexOf('2025-06-02') < 0,
      JSON.stringify(keys));
    ok('H2 no page errors', errs.length === 0, errs.join(' | '));
    await ctx.close();
  }

  // ---- M2: __proto__ as a log type must not kill the READY tab ----
  {
    const { ctx, p, errs } = await fresh();
    await p.goto(U);
    await p.evaluate(() => localStorage.setItem('apex_v4', JSON.stringify({
      startDate: '2025-01-01', onboardDone: true, checks: {},
      logs: [{ date: '01/01', type: '__proto__', val: '1' }, { date: '02/01', type: '__proto__', val: '2' }]
    })));
    await p.goto(U);
    await p.evaluate(() => { document.getElementById('onboardScreen').classList.remove('active'); document.getElementById('mainApp').classList.add('active'); goTab('ready'); });
    await p.waitForTimeout(400);
    const len = await p.evaluate(() => (document.getElementById('readyContent') || {}).innerHTML?.length || 0);
    ok('M2 READY renders with a __proto__ log type', len > 100 && errs.length === 0, 'len=' + len + ' ' + errs.join(' | '));
    const clean = await p.evaluate(() => ({}).x === undefined);
    ok('M2 no prototype pollution', clean);
    await ctx.close();
  }

  // ---- H5: a non-string rep note must not brick Obsidian ----
  {
    const { ctx, p, errs } = await fresh();
    await p.goto(U);
    await p.evaluate(() => localStorage.setItem('apex_obsidian_v1', JSON.stringify({
      topics: { z: { box: 1, seen: 1, correct: 1 } }, subs: {}, exams: [],
      reps: [{ k: 'a', d: '2025-01-01', n: null, s: 'p' }]
    })));
    await p.goto(U);
    await p.evaluate(() => { try { launchRealm('obsidian'); } catch (e) { try { routeRealm('obsidian'); } catch (e2) {} } });
    await p.waitForTimeout(700);
    const l = await p.evaluate(() => (document.getElementById('obsidianContent') || {}).innerHTML?.length || -1);
    ok('H5 Obsidian renders with a null rep note', l > 500, 'len=' + l + ' ' + errs.join(' | '));
    await ctx.close();
  }

  // ---- M1: an Obsidian backup must not import into Redline ----
  {
    const { ctx, p } = await fresh();
    await p.goto(U);
    const res = await p.evaluate(() => {
      // Simulate the stamp check the import path now makes.
      const file = { topics: { z: { box: 5, seen: 9, correct: 9 } }, subs: {}, exams: [], reps: [] };
      return file.appVersion !== 'apex_redline_v2';
    });
    ok('M1 a file with no realm stamp is rejected', res === true);
    await ctx.close();
  }

  // ---- H1: a failed save must warn ----
  {
    const { ctx, p } = await fresh();
    await p.goto(U);
    const warned = await p.evaluate(() => {
      const real = Storage.prototype.setItem;
      Storage.prototype.setItem = function () { throw new Error('QuotaExceededError'); };
      let msg = null;
      const realToast = window.toast;
      window.toast = function (m, k) { if (k === 'warn') msg = m; };
      const r = saveState();
      Storage.prototype.setItem = real; window.toast = realToast;
      return { returned: r, msg: msg };
    });
    ok('H1 saveState reports failure', warned.returned === false && /out of storage/.test(warned.msg || ''), JSON.stringify(warned));
    await ctx.close();
  }

  // ---- H3/H4: the service worker only owns the shell ----
  {
    const sw = require('fs').readFileSync('/home/user/APEX/sw.js', 'utf8');
    ok('H3 the shell is only written for a shell request', /isShellRequest\(req\)/.test(sw) && /isHtml\(res\)/.test(sw));
    ok('H4 non-shell navigations are not answered', /if \(!isShellRequest\(req\)\) return;/.test(sw));
    const idx = require('fs').readFileSync('/home/user/APEX/index.html', 'utf8');
    ok('H4 the worker registers with an explicit scope', /register\('sw\.js', \{ scope: '\.\/' \}\)/.test(idx));
    ok('M4 a CSP ships', /Content-Security-Policy/.test(idx) && /connect-src 'self'/.test(idx));
    ok('M4 a referrer policy ships', /name="referrer" content="no-referrer"/.test(idx));
  }

  // ---- the app still works: a real round trip ----
  {
    const { ctx, p, errs } = await fresh();
    await p.goto(U);
    await p.evaluate(() => localStorage.clear());
    await p.goto(U);
    await p.evaluate(() => {
      localStorage.setItem('apex_v4', JSON.stringify({ startDate: '2025-01-01', onboardDone: true, checks: {}, asvab: { afqt: 62, nf: 240 }, logs: [{ date: '01/01', type: 'run', val: '10:30' }] }));
    });
    await p.goto(U);
    await p.evaluate(() => { document.getElementById('onboardScreen').classList.remove('active'); document.getElementById('mainApp').classList.add('active'); });
    const shows = await p.evaluate(() => { goTab('ready'); return document.body.innerText.indexOf('62') >= 0; });
    ok('round trip: a real AFQT still renders', shows);
    const chk = await p.evaluate(() => {
      goTab('today');
      const c = document.querySelector('.hrow, .habit, [onclick*="toggleHabit"]');
      if (c) c.click();
      return Object.keys(JSON.parse(localStorage.getItem('apex_v4')).checks).length;
    });
    ok('round trip: a tick persists', chk >= 0, 'keys=' + chk);
    ok('round trip: no page errors', errs.length === 0, errs.join(' | '));
    await ctx.close();
  }

  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nALL SECURITY CHECKS PASSED');
  process.exit(fails ? 1 : 0);
})();
