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

(async () => {
  const src = path.join(ENV.REPO, 'launchpad-app', 'src', 'learn');
  const { parseTrack } = await import(pathToFileURL(path.join(src, 'parse.ts')).href);
  const langs = ['bash', 'git', 'html', 'javascript', 'typescript', 'python', 'sql', 'cpp'];
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
  const p = await ctx.newPage();
  // Playwright's service-worker block reaches into the sandboxed preview
  // frames, where reading navigator.serviceWorker throws: its noise, not ours.
  const errs = []; p.on('pageerror', (e) => { if (!/serviceWorker/.test(String(e))) errs.push(String(e)); });
  await LP.reset(p);
  await LP.open(p, '/learn');

  const goals = await p.$$eval('.rm-goals [role=tab]', (e) => e.map((c) => c.textContent.trim()));
  ok('Learn to code opens on roadmaps: a pill per goal', goals.length >= 5 && goals[0] === 'AI Product Engineer' && goals.includes('Software Engineer'), goals.join(', '));
  const steps = await p.$$eval('.rm-step', (e) => e.map((t) => (t.querySelector('.rm-step__label') || {}).textContent || (t.querySelector('.rm-tile--end') ? 'CERTIFICATE' : '')));
  ok('the goal shows its courses in order, ending at a certificate',
    steps.join(' / ') === 'Linux and the command line / Git and version control / JavaScript, the language of the web / TypeScript: types that catch bugs / HTML and CSS: building pages / SQL fundamentals / Python, a first language / CERTIFICATE', steps.join(' / '));
  const badges = await p.$$eval('.rm-tile__n', (e) => e.map((t) => t.textContent.trim()));
  ok('each course tile carries its step number', badges.join(',') === '1,2,3,4,5,6,7', badges.join(','));
  const links = await p.$$eval('.rm-link', (e) => e.map((t) => t.dataset.dir));
  ok('the dotted path snakes: along a row, around the end, and back', links.includes('right') && links.includes('turn-right') && links.includes('left'), links.join(','));
  await p.click('.rm-goals [role=tab]:has-text("Data & ML")');
  await p.waitForTimeout(300);
  const dataSteps = await p.$$eval('.rm-step__label', (e) => e.map((t) => t.textContent));
  ok('picking another goal shows its roadmap', dataSteps.join(' / ') === 'Python, a first language / SQL fundamentals / Linux and the command line / Git and version control' && /goal=data/.test(p.url()), dataSteps.join(' / '));
  await p.click('.rm__see');
  await p.waitForTimeout(400);
  const detail = await p.$$eval('.rmv-step', (e) => e.length);
  ok('View every step opens the goal course by course', /#\/learn\/roadmap-data/.test(p.url()) && detail === 5, p.url() + ' ' + detail);
  await LP.go(p, '/learn');
  const courses = await p.$$eval('.lm-course', (e) => e.length);
  ok('every course is listed too, grouped by language', courses === tracks.length && (await p.$$eval('.lm-lang', (e) => e.length)) === langs.length, courses + ' of ' + tracks.length);
  const mastery = await p.$$eval('.rm-goals__row:last-child .rm-goals__pill', (e) => e.length);
  ok('each language with several courses has a beginner-to-expert roadmap', mastery === langs.filter((l) => tracks.filter((t) => t.lang === l).length > 1).length, String(mastery));
  const navLearn = await p.$$eval('.side .nav-item', (e) => e.some((a) => /Learn to code/.test(a.textContent)));
  ok('Learn to code is in the sidebar', navLearn);

  // Every basics lesson goes through the UI here; past the basics, the first
  // and last lesson of each course do (the Node checker, src/learn/verify.test.ts,
  // runs every lesson of every course through the same runtimes).
  const only = process.env.LEARN_ONLY ? process.env.LEARN_ONLY.split(',') : null;
  for (const track of tracks) {
    if (only && !only.includes(track.id) && !only.includes(track.lang)) continue;
    const bad = [];
    const t0 = Date.now();
    const sample = track.level === 'basics' || process.env.LEARN_ALL ? track.lessons : [track.lessons[0], track.lessons[track.lessons.length - 1]];
    for (const lesson of sample) {
      await LP.go(p, '/learn/' + lesson.id);
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
    }
    ok(track.title + ': every starter needs work and every solution passes (' + sample.length + ' of ' + track.lessons.length + ' lessons, ' + Math.round((Date.now() - t0) / 1000) + 's)', bad.length === 0, bad.join('\n        '));
  }

  // Progress shows on the roadmap and the courses, and the playground points into it.
  await LP.go(p, '/learn');
  const metas = await p.$$eval('.lm-course', (e) => e.filter((c) => /Basics/.test((c.querySelector('.lm-course__level') || {}).textContent || '')).map((c) => c.querySelector('.lm-course__meta').textContent.trim()));
  ok('every basics course shows as complete', only ? true : metas.every((c) => c === 'Complete'), metas.join(' | '));
  const end = await p.$eval('.rm-tile--end', (e) => e.dataset.lit).catch(() => '');
  const lit = await p.$$eval('.rm-tile:not(.rm-tile--end)', (e) => e.every((t) => t.dataset.lit === 'true'));
  ok('and every step lights up, through to the certificate', only ? true : end === 'true' && lit, end);
  await LP.go(p, '/learn/javascript');
  const outline = await p.$$eval('.lm-outline li', (e) => e.map((li) => li.dataset.done));
  ok('a course page lists its lessons with what was passed', outline.length === 12 && (only ? true : outline.every((d) => d === 'true')), outline.join(','));
  await LP.go(p, '/playground?lang=cpp');
  const callout = await p.$eval('.pgx-learn', (e) => e.textContent).catch(() => '');
  ok('the playground offers Learn to code for its language', /C\+\+/.test(callout), callout.slice(0, 120));
  const file = await p.$eval('.ide__file', (e) => e.textContent.trim()).catch(() => '');
  ok('?lang= opens the playground on that language', /main\.cpp/.test(file), file);

  // The examples in a lesson's explanation run where they stand, console-style.
  await LP.go(p, '/learn/js-03');
  await p.waitForSelector('.lm-teach .embed');
  await p.click('.lm-teach .ide__run .ide-run');
  await p.waitForFunction(() => /0\.30000000000000004/.test((document.querySelector('.lm-teach .ide-console') || {}).innerText || ''), null, { timeout: 30000 }).catch(() => {});
  const example = await p.$eval('.lm-teach .ide-console', (e) => e.innerText).catch(() => '');
  ok('an example in the lesson text runs in place and shows each value', /^3\n2\n9\n0\.30000000000000004\n0\.3/.test(example.trim()), example.replace(/\n/g, ' | '));

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
