var ENV = require('./_env');
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

  // ---- H1: a missing curriculum must not erase progress ----
  {
    const { ctx, p, errs } = await fresh();
    await p.goto(U);
    await p.evaluate(() => localStorage.setItem('apex_launchpad_v1', JSON.stringify({
      ids: 2, flagship: {}, setup: {},
      mods: { M0: { delta: true, artifact: true, gate: true }, M1: { delta: true, artifact: true, gate: true } }
    })));
    // now block the curriculum script and reload
    await p.route('**/curriculum-ai.js', r => r.abort());
    await p.goto(U).catch(() => {});
    await p.waitForTimeout(1200);
    await p.evaluate(() => { try { enterLaunchpad(); } catch (e) {} });
    await p.waitForTimeout(600);
    const stored = await p.evaluate(() => JSON.parse(localStorage.getItem('apex_launchpad_v1') || '{}'));
    ok('a failed curriculum load does not erase progress',
      stored.mods && stored.mods.M0 && stored.mods.M0.gate === true && stored.mods.M1,
      JSON.stringify(stored.mods));
    // and it comes back when the script does
    await p.unroute('**/curriculum-ai.js');
    await p.goto(U);
    await p.waitForTimeout(800);
    const back = await p.evaluate(() => { enterLaunchpad(); return lpApi().progressSummary(lpProgress()).modulesDone; });
    ok('progress is intact once the script loads again', back === 2, 'done=' + back);
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
      const keys = await caches.keys();
      const c = await caches.open(keys[0]);
      await c.put('/curriculum-ai.js', new Response('window.__POISONED = true;',
        { status: 200, headers: { 'Content-Type': 'application/javascript' } }));
      const back = await c.match('/curriculum-ai.js');
      return (await back.text()).indexOf('__POISONED') >= 0;
    });
    ok('the poison is in the cache (the attack is real)', poisoned === true);
    await p.goto(U, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1000);
    const ran = await p.evaluate(() => ({ poisoned: !!window.__POISONED, modules: (typeof AI_CURRICULUM !== 'undefined') ? AI_CURRICULUM.length : 0 }));
    ok('an online load ignores the poisoned cache entry', ran.poisoned === false && ran.modules === 33, JSON.stringify(ran));
    await ctx.close();
  }

  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nALL WAVE-5 SECURITY CHECKS PASSED');
  process.exit(fails ? 1 : 0);
})();
