var ENV = require('./_env');
// The PWA promise: install once, then work with no network at all.
const { chromium } = require('playwright');
const U = ENV.BASE + '/index.html';
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

(async () => {
  const b = await chromium.launch(ENV.launchOpts);
  const ctx = await b.newContext();
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e)));

  await p.goto(U, { waitUntil: 'networkidle' });
  await p.evaluate(() => navigator.serviceWorker.ready);
  await p.waitForTimeout(1200);

  const inst = await p.evaluate(async () => {
    const keys = await caches.keys();
    const c = await caches.open(keys[0]);
    const reqs = await c.keys();
    const shell = await c.match('./index.html');
    return { cache: keys[0], entries: reqs.length,
             shellType: shell ? shell.headers.get('content-type') : null,
             shellLen: shell ? (await shell.text()).length : 0 };
  });
  console.log('        ' + JSON.stringify(inst));
  ok('the shell installs', inst.entries >= 12 && /text\/html/.test(inst.shellType || ''), JSON.stringify(inst));

  // Poison attempt: navigate to a non-HTML in-scope 200, then check the shell.
  await p.goto(ENV.BASE + '/icon.svg');
  await p.waitForTimeout(500);
  await p.goto(ENV.BASE + '/manifest.json');
  await p.waitForTimeout(500);
  await p.goto(U);
  await p.waitForTimeout(600);
  const after = await p.evaluate(async () => {
    const keys = await caches.keys();
    const c = await caches.open(keys[0]);
    const shell = await c.match('./index.html');
    const t = shell ? await shell.text() : '';
    return { type: shell ? shell.headers.get('content-type') : null, len: t.length, isHtml: /^<!DOCTYPE html>/i.test(t.trim()) };
  });
  console.log('        ' + JSON.stringify({ type: after.type, len: after.len, isHtml: after.isHtml }));
  ok('a non-HTML navigation cannot become the shell', after.isHtml && after.len > 100000, JSON.stringify(after));

  // Now go offline and reload.
  await ctx.setOffline(true);
  await p.goto(U, { waitUntil: 'domcontentloaded' }).catch(e => errs.push('goto: ' + e.message));
  await p.waitForTimeout(1500);
  const off = await p.evaluate(() => ({
    title: document.title,
    hasApp: typeof window.goTab === 'function' && typeof window.enterLaunchpad === 'function',
    launcher: !!document.querySelector('.lsLp'),
    booting: document.body.classList.contains('booting'),
    modules: (typeof AI_CURRICULUM !== 'undefined') ? AI_CURRICULUM.length : 0
  }));
  console.log('        offline: ' + JSON.stringify(off));
  ok('the app loads with no network', off.hasApp && off.launcher && off.modules === 33 && !off.booting, JSON.stringify(off));

  // And the realm works offline.
  // The realm entrance plays a ~1s transition before routing; wait past it.
  await p.click('.lsLp');
  await p.waitForTimeout(2200);
  const realm = await p.evaluate(() => ({
    active: document.getElementById('launchpadApp').classList.contains('active'),
    len: (document.querySelector('#launchpadApp .lp-body') || {}).innerHTML?.length || 0
  }));
  ok('LAUNCHPAD renders offline', realm.active && realm.len > 5000, JSON.stringify(realm));

  const ticked = await p.evaluate(() => { lpToggle('M0', 'delta'); return lpProgress().M0 && lpProgress().M0.delta; });
  ok('progress can be recorded offline', ticked === true);

  await ctx.setOffline(false);
  ok('no page errors', errs.length === 0, errs.join(' | '));
  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nOFFLINE WORKS');
  process.exit(fails ? 1 : 0);
})();
