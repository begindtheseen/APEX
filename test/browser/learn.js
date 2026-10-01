var ENV = require('./_env');
var LP = require('./_launchpad');
// Learn mode, lesson by lesson, through the real UI. For every lesson in
// every track: the starter code must NOT pass (the lesson asks for work), and
// the reference solution MUST pass every check (the lesson can be passed).
// The runtimes (Pyodide, sql.js, the TypeScript compiler and clang) are the
// same pinned packages the app downloads, served here from node_modules.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

const NM = path.join(ENV.REPO, 'node_modules');
const TYPES = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.wasm': 'application/wasm', '.tar': 'application/x-tar', '.ts': 'text/plain', '.json': 'application/json', '.zip': 'application/zip' };
const pyodideVersion = require(path.join(NM, 'pyodide', 'package.json')).version;

async function serveCdn(ctx) {
  const fulfil = async (route, file) => {
    if (!fs.existsSync(file)) return route.continue();
    await route.fulfill({ status: 200, body: fs.readFileSync(file), headers: { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'access-control-allow-origin': '*' } });
  };
  await ctx.route(/^https:\/\/cdn\.jsdelivr\.net\/pyodide\/v([^/]+)\/full\/(.+)$/, (route) => {
    const m = /\/pyodide\/v([^/]+)\/full\/([^?]+)/.exec(route.request().url());
    if (m[1] !== pyodideVersion) return route.continue();
    return fulfil(route, path.join(NM, 'pyodide', m[2]));
  });
  await ctx.route(/^https:\/\/(cdn\.jsdelivr\.net\/npm|unpkg\.com)\/((?:@[^/]+\/)?[^@/]+)@[^/]+\/(.+)$/, (route) => {
    const m = /^https:\/\/(?:cdn\.jsdelivr\.net\/npm|unpkg\.com)\/((?:@[^/]+\/)?[^@/]+)@[^/]+\/([^?]+)/.exec(route.request().url());
    return fulfil(route, path.join(NM, m[1], m[2]));
  });
}

// A lesson carries runnable examples in its text as well as the challenge;
// everything here works on the challenge's playground.
const WORK = '.lm-work';

async function setCode(p, code) {
  await p.click(WORK + ' .cm-content');
  await p.keyboard.press('Control+A');
  await p.evaluate(([w, c]) => {
    const dt = new DataTransfer();
    dt.setData('text/plain', c);
    document.querySelector(w + ' .cm-content').dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
  }, [WORK, code]);
  await p.waitForTimeout(80);
}

/** Runs & checks; returns { passed, results: [status name], output } */
async function check(p) {
  await p.evaluate(() => { const t = document.querySelector('.tcases'); if (t) t.setAttribute('data-stale', '1'); });
  await p.click('.lm-work .ide__run .ide-run, .lm-work .lm-termbar .ide-run');
  await p.waitForFunction(() => {
    const b = document.querySelector('.lm-work .ide__run .ide-run, .lm-work .lm-termbar .ide-run');
    return b && !b.disabled && document.querySelector('.lm-work .tcases:not([data-stale])');
  }, null, { timeout: 180000 });
  return p.evaluate(() => ({
    passed: !!document.querySelector('.lm-win'),
    results: Array.from(document.querySelectorAll('.tcases__tab')).map((t) => t.dataset.status + ' ' + t.textContent.trim()),
    output: (document.querySelector('.tcase') || {}).innerText || '',
  }));
}

/** Types command lines into the practice terminal, one Enter each. */
async function typeCommands(p, text) {
  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    await p.fill('#termInput', line);
    await p.keyboard.press('Enter');
  }
}

/** Marks these course exams passed, as if she had passed them, so every course opens. */
async function passGates(p, ids) {
  await p.evaluate((ids) => new Promise((done, fail) => {
    const q = indexedDB.open('launchpad');
    q.onerror = () => fail(q.error);
    q.onsuccess = () => {
      const tx = q.result.transaction('state', 'readwrite');
      const os = tx.objectStore('state');
      const g = os.get('learner');
      g.onsuccess = () => {
        const st = g.result;
        const at = new Date().toISOString();
        for (const id of ids) st.learn[id] = at;
        os.put(st, 'learner');
      };
      tx.oncomplete = () => { q.result.close(); done(); };
      tx.onerror = () => fail(tx.error);
    };
  }), ids);
}

(async () => {
  const src = path.join(ENV.REPO, 'launchpad-app', 'src', 'learn');
  const { parseTrack } = await import(pathToFileURL(path.join(src, 'parse.ts')).href);
  const langs = ['bash', 'git', 'html', 'javascript', 'typescript', 'python', 'sql', 'cpp', 'cs'];
  const LEVELS = ['basics', 'intermediate', 'advanced', 'expert', 'projects'];
  const files = fs.readdirSync(path.join(src, 'tracks')).filter((f) => f.endsWith('.txt'));
  const key = (f) => { const [l, v = 'basics'] = f.replace(/\.txt$/, '').split('.'); return [langs.indexOf(l), LEVELS.indexOf(v)]; };
  const tracks = files
    .filter((f) => key(f)[0] >= 0)
    .sort((a, b) => key(a)[0] - key(b)[0] || key(a)[1] - key(b)[1])
    .map((f) => parseTrack(fs.readFileSync(path.join(src, 'tracks', f), 'utf8'), f));

  const b = await chromium.launch(ENV.launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 1000 }, serviceWorkers: 'block' });
  await serveCdn(ctx);
  let p = await ctx.newPage();
  // Playwright's service-worker block reaches into the sandboxed preview
  // frames, where reading navigator.serviceWorker throws: its noise, not ours.
  // A lesson's own page (a sandboxed srcdoc frame) throwing is the learner's
  // code at work — an unfinished starter, say — and the lesson shows it in its
  // console. Only the app's own errors count here.
  const errs = [];
  const watch = (pg) => pg.on('pageerror', (e) => { if (!/serviceWorker/.test(String(e)) && !/about:srcdoc/.test(String(e.stack))) errs.push(String(e)); });
  watch(p);
  // Each course gets a fresh page: hundreds of runs in one page (Pyodide, clang,
  // the TypeScript compiler) grow it until the browser kills it on a small runner.
  // Lessons passed on this page that the app has not yet been seen to save.
  let unsaved = [];
  const learned = (pg) => pg.evaluate(() => new Promise((done) => {
    const q = indexedDB.open('launchpad');
    q.onerror = () => done([]);
    q.onsuccess = () => {
      const g = q.result.transaction('state').objectStore('state').get('learner');
      g.onsuccess = () => { done(Object.keys((g.result || {}).learn || {})); q.result.close(); };
      g.onerror = () => { done([]); q.result.close(); };
    };
  })).catch(() => []);
  const freshPage = async () => {
    // The app saves a moment after a pass; on a slow runner, leaving straight away
    // lost it. Wait (up to 10 s) until every pass made on this page is on disk.
    for (let t = 0; t < 40 && unsaved.length; t++) {
      const have = await learned(p);
      unsaved = unsaved.filter((id) => !have.includes(id));
      if (unsaved.length) await p.waitForTimeout(250);
    }
    unsaved = [];
    await p.goto('about:blank').catch(() => {});
    await p.close().catch(() => {});
    p = await ctx.newPage();
    watch(p);
    await LP.open(p, '/learn');
  };
  await LP.reset(p);
  await LP.open(p, '/learn');

  const goals = await p.$$eval('.rm-goals [role=tab]', (e) => e.map((c) => c.textContent.trim()));
  ok('Learn to code opens on roadmaps: a pill per goal, the internship phase first', goals.length >= 5 && goals[0] === 'Phase 1 · Internship-ready' && goals.includes('Backend & AI Infrastructure'), goals.join(', '));
  const steps = await p.$$eval('.rm-step', (e) => e.map((t) => (t.querySelector('.rm-step__label') || {}).textContent || (t.querySelector('.rm-tile--end') ? 'CERTIFICATE' : '')));
  ok('the goal shows its courses in order, ending at a certificate',
    steps.length === 10 && steps[0] === 'Python, a first language' && steps[2] === 'Linux and the command line' && steps[8].startsWith('Data Structures and Algorithms I:') && steps[9] === 'CERTIFICATE', steps.join(' / '));
  const badges = await p.$$eval('.rm-tile__n', (e) => e.map((t) => t.textContent.trim()));
  ok('each course tile carries its step number', badges.join(',') === '1,2,3,4,5,6,7,8,9', badges.join(','));
  const links = await p.$$eval('.rm-link', (e) => e.map((t) => t.dataset.dir));
  ok('the dotted path snakes: along a row, around the end, and back', links.includes('right') && links.includes('turn-right') && links.includes('left'), links.join(','));
  await p.click('.rm-goals [role=tab]:has-text("Data & ML")');
  await p.waitForTimeout(300);
  const dataSteps = await p.$$eval('.rm-step__label', (e) => e.map((t) => t.textContent));
  ok('picking another goal shows its roadmap', dataSteps.join(' / ') === 'Python, a first language / SQL fundamentals / Linux and the command line / Git and version control' && /goal=data/.test(p.url()), dataSteps.join(' / '));
  // A goal with several courses in one language, then another: each tile is
  // its own course, so switching must replace the path, not add to it.
  await p.click('.rm-goals [role=tab]:has-text("Web Developer")');
  await p.waitForTimeout(300);
  await p.click('.rm-goals [role=tab]:has-text("AI Research Engineer")');
  await p.waitForTimeout(400);
  const aiSteps = await p.$$eval('.rm-step__label', (e) => e.map((t) => t.textContent));
  ok('a goal can go deep in one language, and switching goals shows only its own courses', aiSteps.length === 11 && aiSteps.filter((t) => /Python/.test(t)).length === 5 && aiSteps.some((t) => /AI from scratch/.test(t)), aiSteps.length + ': ' + aiSteps.join(' / '));
  await p.click('.rm-goals [role=tab]:has-text("Data & ML")');
  await p.waitForTimeout(300);
  await p.click('.rm__see');
  await p.waitForTimeout(400);
  const detail = await p.$$eval('.rmv-step', (e) => e.length);
  ok('View every step opens the goal course by course', /#\/learn\/roadmap-data/.test(p.url()) && detail === 5, p.url() + ' ' + detail);
  await LP.go(p, '/learn');
  const courses = await p.$$eval('.lm-course', (e) => e.length);
  ok('every course is listed too, grouped by language', courses === tracks.length && (await p.$$eval('.lm-lang', (e) => e.length)) === langs.length, courses + ' of ' + tracks.length);
  // Only the per-language roadmaps carry a language logo on their pill.
  const mastery = await p.$$eval('.rm-goals__pill .lang-mark', (e) => e.length);
  ok('each language with several courses has a beginner-to-expert roadmap', mastery === langs.filter((l) => tracks.filter((t) => t.lang === l).length > 1).length, String(mastery));
  const navLearn = await p.$$eval('.side .nav-item', (e) => e.some((a) => /Learn to code/.test(a.textContent)));
  ok('Learn to code is in the sidebar', navLearn);

  // Every basics lesson goes through the UI here; past the basics, the first
  // and last lesson of each course do (the Node checker, src/learn/verify.test.ts,
  // runs every lesson of every course through the same runtimes).
  const only = process.env.LEARN_ONLY ? process.env.LEARN_ONLY.split(',') : null;
  // Written from outside the app: it saves its own record as it closes, over anything written under it.
  await p.goto(ENV.BASE + '/index.html');
  await passGates(p, tracks.flatMap((t) => t.lessons.filter((l) => l.gate).map((l) => l.id)));
  await LP.open(p, '/learn');
  for (const track of tracks) {
    if (only && !only.includes(track.id) && !only.includes(track.lang)) continue;
    await freshPage();
    const bad = [];
    const t0 = Date.now();
    // A course exam is unseen problems, not a lesson: the Node checker solves those.
    const lessons = track.lessons.filter((l) => !l.gate);
    const sample = track.level === 'basics' || process.env.LEARN_ALL ? lessons : [lessons[0], lessons[lessons.length - 1]];
    for (const [i, lesson] of sample.entries()) {
      if (i && i % 6 === 0) await freshPage();
      // A page that crashes (clang's compiler is large) gets one more go on a fresh page.
      for (let attempt = 0; attempt < 2; attempt++) try {
        await LP.go(p, '/learn/' + lesson.id);
        const ready = await p.waitForSelector(track.lang === 'bash' || track.lang === 'git' ? '#termInput' : WORK + ' .cm-content', { timeout: 30000 }).then(() => true, () => false);
        if (!ready) { bad.push(lesson.id + ': no workspace → ' + (await p.$eval('.route', (e) => e.innerText.slice(0, 160)).catch(() => '')).replace(/\n/g, ' ')); break; }
        if (track.lang === 'bash' || track.lang === 'git') {
          await p.waitForSelector('#termInput');
          const s = await check(p);
          if (s.passed) bad.push(lesson.id + ': passes with nothing typed');
          await typeCommands(p, lesson.solution);
        } else {
          await p.waitForSelector(WORK + ' .cm-content');
          await setCode(p, lesson.starter);
          const s = await check(p);
          if (s.passed) bad.push(lesson.id + ': the starter already passes');
          await setCode(p, lesson.solution);
        }
        const r = await check(p);
        if (!r.passed) bad.push(lesson.id + ': the solution fails → ' + r.results.filter((x) => !x.startsWith('pass')).join(' | ') + ' || ' + r.output.slice(0, 240).replace(/\n/g, '⏎'));
        else unsaved.push(lesson.id);
        break;
      } catch (e) {
        const why = String(e && e.message).split('\n')[0];
        await freshPage();
        if (attempt === 0 && /Target crashed/.test(why)) { console.log('  note  ' + lesson.id + ': the page crashed; once more on a fresh page'); continue; }
        // Say where, and carry on with the next lesson.
        bad.push(lesson.id + ': ' + why);
      }
    }
    ok(track.title + ': every starter needs work and every solution passes (' + sample.length + ' of ' + track.lessons.length + ' lessons, ' + Math.round((Date.now() - t0) / 1000) + 's)', bad.length === 0, bad.join('\n        '));
  }

  // Progress shows on the roadmap and the courses, and the playground points into it.
  await LP.go(p, '/learn');
  const metas = await p.$$eval('.lm-course', (e) => e.filter((c) => /Basics/.test((c.querySelector('.lm-course__level') || {}).textContent || '')).map((c) => c.querySelector('.lm-course__meta').textContent.trim()));
  ok('every basics course shows as complete', only ? true : metas.every((c) => c === 'Complete'), metas.join(' | '));
  // Past the basics only a course's first and last lessons are run here, so
  // only the basics steps (and, with LEARN_ALL, the certificate) can light.
  const basics = tracks.filter((t) => t.level === 'basics').map((t) => t.name);
  const end = await p.$eval('.rm-tile--end', (e) => e.dataset.lit).catch(() => '');
  const lit = await p.$$eval('.rm-step', (e, names) => e.filter((s) => names.includes((s.querySelector('.rm-step__label') || {}).textContent)).map((s) => (s.querySelector('.rm-tile') || {}).dataset?.lit), basics);
  ok('and its basics steps light up' + (process.env.LEARN_ALL ? ', through to the certificate' : ''), only ? true : lit.length >= 4 && lit.every((x) => x === 'true') && (!process.env.LEARN_ALL || end === 'true'), lit.join(',') + ' · ' + end);
  await LP.go(p, '/learn/javascript');
  const outline = await p.$$eval('.lm-outline li', (e) => e.map((li) => li.dataset.done));
  ok('a course page lists its lessons with what was passed', outline.length === tracks.find((t) => t.id === 'javascript').lessons.length && (only ? true : outline.every((d) => d === 'true')), outline.join(','));
  await LP.go(p, '/playground?lang=cpp');
  const callout = await p.$eval('.pgx-learn', (e) => e.textContent).catch(() => '');
  ok('the playground offers Learn to code for its language', /C\+\+/.test(callout), callout.slice(0, 120));
  const file = await p.$eval('.ide__file', (e) => e.textContent.trim()).catch(() => '');
  ok('?lang= opens the playground on that language', /main\.cpp/.test(file), file);

  // The examples in a lesson's explanation run where they stand, console-style.
  await LP.go(p, '/learn/js-03');
  await p.waitForSelector('.lm-teach .embed');
  await p.click('.lm-teach .ide__run .ide-run');
  await p.waitForFunction(() => /16\n4/.test((document.querySelector('.lm-teach .ide-console') || {}).innerText || ''), null, { timeout: 30000 }).catch(() => {});
  const example = await p.$eval('.lm-teach .ide-console', (e) => e.innerText).catch(() => '');
  ok('an example in the lesson text runs in place and shows each value', /^10\n6\n16\n4$/.test(example.trim()), example.replace(/\n/g, ' | '));

  // Every module lesson carries the playground in its module's languages.
  await LP.go(p, '/module/M3?lesson=m3-the-module');
  await p.waitForSelector('.tryit');
  // The label is the button's own text, after the language's logo.
  const langsOffered = await p.$$eval('.tryit__lang', (e) => e.map((b) => b.lastChild.textContent.trim()));
  ok('a module lesson ends with Try it here, in the languages the module works in', langsOffered.join(',') === 'JavaScript,TypeScript', langsOffered.join(','));
  await p.$eval('.tryit', (e) => e.scrollIntoView());
  await p.waitForTimeout(400);
  await p.click('.tryit .ide__run .ide-run');
  await p.waitForFunction(() => /7 sync, last line/.test((document.querySelector('.tryit .ide-console') || {}).innerText || ''), null, { timeout: 30000 }).catch(() => {});
  const tried = await p.$eval('.tryit .ide-console', (e) => e.innerText).catch(() => '');
  ok('and it runs right there in the lesson', /1 sync[\s\S]*7 sync, last line[\s\S]*2 timeout/.test(tried), tried.replace(/\n/g, ' | ').slice(0, 120));
  await LP.go(p, '/module/M3?step=build');
  ok('the Build step works on the artifact in the same embedded playground', !!(await p.$('.tryit .ide')));

  // Code carries from a lesson into the playground.
  await LP.go(p, '/learn/py-01');
  await setCode(p, 'print("carried over")\n');
  await p.click(WORK + ' .ide__tool:has-text("Playground")');
  await p.waitForTimeout(600);
  const carried = await p.$$eval('.cm-content .cm-line', (ls) => ls.map((l) => l.textContent).join('\n')).catch(() => '');
  ok('Open in playground carries the code over', /carried over/.test(carried) && /#\/playground\?lang=python/.test(p.url()), carried.slice(0, 60));

  ok('no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nEVERY LESSON CAN BE PASSED, AND NONE PASSES ON ITS STARTER');
  process.exit(fails ? 1 : 0);
})();
