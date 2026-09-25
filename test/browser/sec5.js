var ENV = require('./_env');
var LP = require('./_launchpad');
// Re-runs the wave-5 security findings against the fixes.
const { chromium } = require('playwright');
const U = ENV.BASE + '/index.html';
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

(async () => {
  const b = await chromium.launch(ENV.launchOpts);

  async function fresh() {
    const ctx = await b.newContext();
    const p = await ctx.newPage();
    const hits = [], errs = [];
    await p.exposeFunction('__hit', s => hits.push(s));
    p.on('pageerror', e => errs.push(String(e)));
    p.on('dialog', d => d.accept());
    return { ctx, p, hits, errs };
  }
  const X = t => '<img src=x onerror="window.__hit(\'' + t + '\')">';

  // ---- C1a: APEX — skipReasons and study.exams ----
  {
    const { ctx, p, hits, errs } = await fresh();
    await p.goto(U);
    await p.evaluate(XSRC => { const X = new Function('return ' + XSRC)(); localStorage.setItem('apex_v4', JSON.stringify({
      startDate: '2025-01-01', onboardDone: true, checks: {},
      skipReasons: { h_water: [{ date: X('REASON_DATE'), reason: X('REASON') },
                               { date: '5/2', reason: X('REASON2') },
                               { date: '5/3', reason: X('REASON2') },
                               { date: '5/4', reason: X('REASON2') }] },
      study: { topics: { [X('TOPICKEY')]: { box: 1, due: X('DUE'), seen: 1, correct: 1 } },
               subs: {}, exams: [{ date: X('EXAMDATE'), mode: 'mock', perSub: { AR: { correct: 1, total: 2, score: 50 } } }] },
      asvabLogs: [{ date: X('ASVABDATE'), type: X('ASVABTYPE'), val: 60 }],
      logs: [{ date: X('LOGDATE'), type: X('LOGTYPE'), val: X('LOGVAL') }],
      prt: { run: X('PRTRUN'), pu: 40, cu: 50, pl: 3 },
      targetJob: X('JOB'), shipDate: X('SHIP'), lastBackup: X('BK')
    })); }, X.toString());
    await p.goto(U);
    await p.evaluate(() => {
      document.getElementById('onboardScreen').classList.remove('active');
      document.getElementById('mainApp').classList.add('active');
    });
    for (const t of ['today', 'prt', 'ready', 'sci', 'study', 'jobs']) {
      await p.evaluate(tab => { try { goTab(tab); } catch (e) {} }, t);
      await p.waitForTimeout(200);
    }
    await p.waitForTimeout(600);
    const live = await p.evaluate(() => document.querySelectorAll('[onerror],[onload],[onmouseover],[onclick^="window."]').length);
    ok('APEX: no hostile value executes', hits.length === 0, JSON.stringify(hits));
    ok('APEX: no element carries an injected handler', live === 0, 'count=' + live);
    ok('APEX: no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
    await ctx.close();
  }

  // ---- C1b: OBSIDIAN and REDLINE ----
  for (const realm of [['obsidian', 'apex_obsidian_v1'], ['redline', 'apex_redline_v2']]) {
    const { ctx, p, hits, errs } = await fresh();
    await p.goto(U);
    await p.evaluate(([key, X]) => {
      const mk = new Function('return ' + X)();
      localStorage.setItem(key, JSON.stringify({
        topics: { [mk('OBSKEY')]: { box: 1, due: mk('OBSDUE'), seen: 1, correct: 1, post: 'a real draft' } },
        subs: { [mk('OBSSUB')]: { seen: 1, correct: 1 } },
        exams: [{ date: mk('OBSEXAM'), sub: mk('OBSEXSUB'), correct: 1, total: 2, wacc: mk('OBSWACC') }],
        reps: [{ k: mk('REPK'), d: mk('REPD'), n: 'note', s: 'p' }],
        appVersion: key
      }));
    }, [realm[1], X.toString()]);
    await p.goto(U);
    await p.evaluate(r => { try { launchRealm(r); } catch (e) { try { routeRealm(r); } catch (e2) {} } }, realm[0]);
    await p.waitForTimeout(2200);
    // walk the realm's own views
    await p.evaluate(() => {
      const btns = document.querySelectorAll('#obsidianApp .lp-navbtn, #obsidianApp [onclick*="obsView"]');
      btns.forEach(x => { try { x.click(); } catch (e) {} });
    });
    await p.waitForTimeout(800);
    const live = await p.evaluate(() => document.querySelectorAll('[onerror],[onload],[onmouseover]').length);
    ok(realm[0].toUpperCase() + ': no hostile value executes', hits.length === 0, JSON.stringify(hits));
    ok(realm[0].toUpperCase() + ': no injected handler in the DOM', live === 0, 'count=' + live);
    const post = await p.evaluate(() => { const k = Object.keys(OBS_ST.topics)[0]; return k ? OBS_ST.topics[k].post : null; });
    ok(realm[0].toUpperCase() + ': the post draft survives', post === 'a real draft', String(post));
    ok(realm[0].toUpperCase() + ': no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
    await ctx.close();
  }

  // ---- C1c: LAUNCHPAD — a hostile record from the old realm ----
  // The old realm's key is still read once, on the first launch of the app,
  // and it can hold anything a hand edit or another site on the origin wrote.
  {
    const { ctx, p, hits, errs } = await fresh();
    await LP.reset(p);
    await p.evaluate(XSRC => {
      const X = new Function('return ' + XSRC)();
      localStorage.setItem('apex_launchpad_v1', JSON.stringify({
        ids: 2, flagship: { name: X('FLAGNAME'), [X('FLAGKEY')]: X('FLAGVAL') },
        setup: { runwayMonths: X('RUNWAY'), weeklyHours: 12 },
        mods: { M0: { delta: true, artifact: true, gate: true, cp: { [X('CPKEY')]: true } },
                [X('MODKEY')]: { delta: X('DELTA'), gate: true } }
      }));
    }, X.toString());
    for (const r of ['/', '/learning', '/plan', '/tracks', '/module/M0?step=build', '/module/M1?step=build', '/settings']) {
      if (r === '/') await LP.open(p, r); else await LP.go(p, r);
    }
    await p.waitForTimeout(400);
    const live = await p.evaluate(() => document.querySelectorAll('[onerror],[onload],[onmouseover]').length);
    ok('LAUNCHPAD: no hostile value executes', hits.length === 0, JSON.stringify(hits));
    ok('LAUNCHPAD: no injected handler in the DOM', live === 0, 'count=' + live);
    const rec = await LP.record(p);
    ok('LAUNCHPAD: the honest part of the record survives', !!(rec && rec.mods.M0 && rec.mods.M0.gate === true), JSON.stringify(rec && rec.mods.M0));
    ok('LAUNCHPAD: no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
    await ctx.close();
  }

  // ---- H1: a missing curriculum must not erase progress ----
  // The curriculum ships inside the app now, in its own chunk. If that chunk
  // will not load, the app cannot draw — and it must not have touched the
  // record on the way down.
  {
    const { ctx, p, errs } = await fresh();
    await LP.reset(p);
    await p.evaluate(() => localStorage.setItem('apex_launchpad_v1', JSON.stringify({
      ids: 2, flagship: {}, setup: {},
      mods: { M0: { delta: true, artifact: true, gate: true }, M1: { delta: true, artifact: true, gate: true } }
    })));
    await p.route('**/launchpad/assets/curriculum-*.js', r => r.abort());
    await p.goto(LP.URL + '#/').catch(() => {});
    await p.waitForTimeout(1500);
    const stored = await p.evaluate(() => JSON.parse(localStorage.getItem('apex_launchpad_v1') || '{}'));
    ok('a failed curriculum load does not erase progress',
      !!(stored.mods && stored.mods.M0 && stored.mods.M0.gate === true && stored.mods.M1),
      JSON.stringify(stored.mods));
    // and it comes back when the chunk does
    await p.unroute('**/launchpad/assets/curriculum-*.js');
    await p.goto(ENV.BASE + '/index.html');
    await LP.open(p, '/learning');
    const locked = await p.$$eval('.mcard[data-locked="true"]', e => e.length);
    const rec = await LP.record(p);
    ok('progress is intact once the curriculum loads again', rec.passed === 2 && locked < 32, 'passed=' + rec.passed + ' locked=' + locked);
    await ctx.close();
  }

  // ---- M1: an out-of-range phase must not brick the Today tab ----
  {
    const { ctx, p, errs } = await fresh();
    await p.goto(U);
    await p.evaluate(() => localStorage.setItem('apex_v4', JSON.stringify({
      startDate: '2025-01-01', onboardDone: true, checks: {}, phase: 97
    })));
    await p.goto(U);
    await p.evaluate(() => {
      document.getElementById('onboardScreen').classList.remove('active');
      document.getElementById('mainApp').classList.add('active');
      goTab('today');
    });
    await p.waitForTimeout(500);
    const len = await p.evaluate(() => (document.getElementById('todayScreen') || document.querySelector('.tabc.active') || {}).innerHTML?.length || 0);
    ok('an impossible phase does not brick Today', len > 500 && errs.length === 0, 'len=' + len + ' ' + errs.slice(0, 1).join(''));
    await ctx.close();
  }

  // ---- M2: a malformed exam entry must not brick Study ----
  {
    const { ctx, p, errs } = await fresh();
    await p.goto(U);
    await p.evaluate(() => localStorage.setItem('apex_v4', JSON.stringify({
      startDate: '2025-01-01', onboardDone: true, checks: {},
      study: { topics: {}, subs: {}, exams: [{ date: '1/1', mode: 'mock' }, { date: '1/2', mode: 'mock', perSub: 'nope' }] }
    })));
    await p.goto(U);
    await p.evaluate(() => {
      document.getElementById('onboardScreen').classList.remove('active');
      document.getElementById('mainApp').classList.add('active');
      goTab('study');
    });
    await p.waitForTimeout(500);
    const len = await p.evaluate(() => (document.getElementById('studyScreen') || document.querySelector('.tabc.active') || {}).innerHTML?.length || 0);
    ok('a malformed exam entry does not brick Study', len > 500 && errs.length === 0, 'len=' + len + ' ' + errs.slice(0, 1).join(''));
    await ctx.close();
  }

  // ---- C2: the service worker must not serve a poisoned script ----
  {
    const ctx = await b.newContext();
    const p = await ctx.newPage();
    await p.goto(U, { waitUntil: 'networkidle' });
    await p.evaluate(() => navigator.serviceWorker.ready);
    await p.waitForTimeout(1200);
    const poisoned = await p.evaluate(async () => {
      const keys = (await caches.keys()).filter(k => k.indexOf('apex-shell-') === 0);
      const c = await caches.open(keys[0]);
      await c.put('/curriculum.js', new Response('window.__POISONED = true;',
        { status: 200, headers: { 'Content-Type': 'application/javascript' } }));
      const back = await c.match('/curriculum.js');
      return (await back.text()).indexOf('__POISONED') >= 0;
    });
    ok('the poison is in the cache (the attack is real)', poisoned === true);
    await p.goto(U, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1000);
    const ran = await p.evaluate(() => ({ poisoned: !!window.__POISONED, app: typeof window.goTab === 'function' }));
    ok('an online load ignores the poisoned cache entry', ran.poisoned === false && ran.app, JSON.stringify(ran));

    // LAUNCHPAD's worker: poison its own entry script in its own cache, and a
    // cache nobody owns, then load it online.
    await LP.open(p, '/');
    await p.evaluate(() => navigator.serviceWorker.getRegistration(location.href).then(r => r && r.active));
    await p.waitForTimeout(800);
    const lpPoison = await p.evaluate(async () => {
      const src = document.querySelector('script[type=module][src]').src;
      const keys = await caches.keys();
      const body = 'window.__LP_POISONED = true;';
      for (const k of keys.filter(k => k.indexOf('launchpad-') === 0).concat(['someone-else'])) {
        const c = await caches.open(k);
        await c.put(src, new Response(body, { status: 200, headers: { 'Content-Type': 'application/javascript' } }));
      }
      return { src, keys };
    });
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForTimeout(800);
    const lpRan = await p.evaluate(() => ({ poisoned: !!window.__LP_POISONED, drawn: !!document.querySelector('.shell .route') }));
    ok('LAUNCHPAD: an online load ignores a poisoned script entry', lpRan.poisoned === false && lpRan.drawn, JSON.stringify({ ...lpRan, keys: lpPoison.keys }));
    await ctx.close();
  }

  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nALL WAVE-5 SECURITY CHECKS PASSED');
  process.exit(fails ? 1 : 0);
})();
