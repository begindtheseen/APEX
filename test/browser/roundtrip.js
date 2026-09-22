var ENV = require('./_env');
// Proves the validators do not drop anything the app itself writes.
// Drives the REAL app to produce state, then loads it back and compares.
const { chromium } = require('playwright');
const U = ENV.BASE + '/index.html';
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

(async () => {
  const b = await chromium.launch(ENV.launchOpts);
  const ctx = await b.newContext();
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  p.on('dialog', d => d.accept());

  await p.goto(U);
  await p.evaluate(() => localStorage.clear());
  await p.goto(U);

  // Drive the app's own writers, not a hand-made blob.
  const before = await p.evaluate(() => {
    ST.startDate = '2025-01-01';
    ST.onboardDone = true;
    ST.phase = 2; ST.streak = 11; ST.total = 140;
    ST.lastDate = '2025-06-01'; ST.lastGoodDate = '2025-05-30';
    ST.shipDate = '2027-01-23';
    ST.targetJob = 'IT'; ST.prevJob = 'CTN';
    ST.studyHours = 3; ST.consecutiveGoodDays = 5;
    ST.lastBackup = new Date().toISOString();
    // the app's own accessors
    var t = studyTopicState('arith_1'); t.box = 2; t.seen = 9; t.correct = 7; t.due = '2025-06-10';
    var sb = studySubState('AR'); sb.seen = 9; sb.correct = 7;
    if (!ST.study.exams) ST.study.exams = [];
    // the shape the app's own scorer writes: correct, total, score
    ST.study.exams.push({ date: '2025-06-01', mode: 'full', perSub: { AR: { correct: 12, total: 16, score: 58 } } });
    ST.studyDays['2025-06-01'] = { mins: 42, q: 20 };
    toggleEnlist('e_asvab');
    ST.repCounts['h_sleep'] = 14;
    ST.catStruggle['sleep'] = 3;
    ST.skipReasons['h_water'] = [{ date: '2025-05-20', reason: 'Forgot' }, { date: '2025-05-21', reason: 'Travel' }];
    ST.skipLog['2025-05-20'] = ['h_water', 'h_sleep'];
    ST.prt = { run: '10:30', pu: 44, cu: 60, pl: 3 };
    ST.asvab = { afqt: 62, nf: 240 };
    ST.asvabLogs.push({ date: '6/1', type: 'AFQT', val: 62 });
    ST.logs.push({ date: '6/1', type: '1.5-mile run', val: '10:30' });
    ST.readiness = { sleep: 70, morning: 60, training: 55, fuel: 80, asvab: 62, navyknow: 40, cognitive: 50, evening: 65 };
    ST.checks['2025-06-01'] = new Set(['h_sleep', 'h_water']);
    ST.checks['2025-06-02'] = new Set(['h_sleep']);
    saveState();
    return JSON.parse(localStorage.getItem('apex_v4'));
  });

  // Reload: this is where the validator runs.
  await p.goto(U);
  const after = await p.evaluate(() => { return JSON.parse(JSON.stringify(serializeState())); });

  // readiness is DERIVED: deriveAll() recomputes all eight scores from the
  // habit data on every load, so it is not stored progress and comparing it
  // would be testing the app's own arithmetic, not the validator.
  delete before.readiness; delete after.readiness;

  // Deep compare, reporting the exact path of anything lost.
  const lost = [];
  (function walk(a, c, path) {
    if (a === null || a === undefined) return;
    if (Array.isArray(a)) {
      if (!Array.isArray(c) || c.length !== a.length) { lost.push(path + ' (array ' + (Array.isArray(a) ? a.length : '?') + ' -> ' + (Array.isArray(c) ? c.length : typeof c) + ')'); return; }
      a.forEach((v, i) => walk(v, c[i], path + '[' + i + ']'));
      return;
    }
    if (typeof a === 'object') {
      if (!c || typeof c !== 'object') { lost.push(path + ' (object -> ' + typeof c + ')'); return; }
      Object.keys(a).forEach(k => walk(a[k], c[k], path ? path + '.' + k : k));
      return;
    }
    if (a !== c) lost.push(path + ' (' + JSON.stringify(a) + ' -> ' + JSON.stringify(c) + ')');
  })(before, after, '');

  if (lost.length) lost.forEach(l => console.log('        LOST: ' + l));
  ok('every field the app writes survives a load', lost.length === 0, lost.length + ' differences');

  // Named spot checks, so a future change cannot quietly drop one.
  const spot = await p.evaluate(() => ({
    topic: ST.study.topics && ST.study.topics['arith_1'],
    sub: ST.study.subs && ST.study.subs['AR'],
    exams: (ST.study.exams || []).length,
    studyDay: ST.studyDays['2025-06-01'],
    enlist: !!ST.enlist['e_asvab'],
    reasons: (ST.skipReasons['h_water'] || []).map(r => r.reason),
    skipLog: ST.skipLog['2025-05-20'],
    prt: ST.prt, asvab: ST.asvab,
    asvabLogs: ST.asvabLogs.length, logs: ST.logs.length,
    checks: Object.keys(ST.checks).length,
    readiness: ST.readiness.sleep
  }));
  console.log('        ' + JSON.stringify(spot));
  ok('ASVAB topic progress survives', spot.topic && spot.topic.box === 2 && spot.topic.seen === 9);
  ok('subject totals survive', spot.sub && spot.sub.correct === 7);
  ok('exam history survives', spot.exams === 1);
  ok('study minutes survive', spot.studyDay && spot.studyDay.mins === 42);
  ok('the enlistment checklist survives', spot.enlist === true);
  ok('skip reasons survive as entries', spot.reasons.join(',') === 'Forgot,Travel');
  ok('the skip log survives', Array.isArray(spot.skipLog) && spot.skipLog.length === 2);
  ok('PRT scores survive', spot.prt.run === '10:30' && spot.prt.pu === 44);
  ok('ASVAB scores survive', spot.asvab.afqt === 62);
  ok('the two habit days survive', spot.checks === 2);
  ok('readiness is recomputed, as it always was', typeof spot.readiness === 'number' || spot.readiness === null,
    String(spot.readiness));

  // And the same round trip through export -> import.
  const imported = await p.evaluate(() => {
    var snap = serializeState(); snap.appVersion = 'apex_v4';
    var cleaned = apexClean(snap);
    return { topics: Object.keys(cleaned.study.topics).length, reasons: (cleaned.skipReasons['h_water'] || []).length,
             enlist: Object.keys(cleaned.enlist).length, days: Object.keys(cleaned.studyDays).length };
  });
  ok('an exported backup re-imports intact',
    imported.topics === 1 && imported.reasons === 2 && imported.enlist === 1 && imported.days === 1,
    JSON.stringify(imported));

  // The Obsidian/Redline validator, same question.
  await p.evaluate(() => {
    localStorage.setItem('apex_obsidian_v1', JSON.stringify({
      topics: { t1: { box: 2, due: '2025-06-10', seen: 4, correct: 3 } },
      subs: { s1: { seen: 4, correct: 3 } },
      exams: [{ date: '2025-06-01', score: 80 }],
      reps: [{ k: 'a', d: '2025-06-01', n: 'a real note', s: 'p' }],
      appVersion: 'apex_obsidian_v1'
    }));
  });
  await p.goto(U);
  const obs = await p.evaluate(() => {
    try { launchRealm('obsidian'); } catch (e) { try { routeRealm('obsidian'); } catch (e2) {} }
    return { t: OBS_ST.topics.t1, s: OBS_ST.subs.s1, e: OBS_ST.exams.length, r: OBS_ST.reps[0] };
  });
  ok('Obsidian state survives its validator',
    obs.t && obs.t.box === 2 && obs.t.due === '2025-06-10' && obs.s && obs.s.correct === 3
    && obs.e === 1 && obs.r && obs.r.n === 'a real note', JSON.stringify(obs));

  ok('no page errors', errs.length === 0, errs.join(' | '));
  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nNOTHING IS LOST');
  process.exit(fails ? 1 : 0);
})();
