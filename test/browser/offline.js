var ENV = require('./_env');
var LP = require('./_launchpad');
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
    const keys = (await caches.keys()).filter(k => k.indexOf('apex-shell-') === 0);
    const c = await caches.open(keys[0]);
    const reqs = await c.keys();
    const shell = await c.match('./index.html');
    return { cache: keys[0], entries: reqs.length,
             shellType: shell ? shell.headers.get('content-type') : null,
             shellLen: shell ? (await shell.text()).length : 0 };
  });
  console.log('        ' + JSON.stringify(inst));
  ok('the shell installs', inst.entries >= 11 && /text\/html/.test(inst.shellType || ''), JSON.stringify(inst));

  // Poison attempt: navigate to a non-HTML in-scope 200, then check the shell.
  await p.goto(ENV.BASE + '/icon.svg');
  await p.waitForTimeout(500);
  await p.goto(ENV.BASE + '/manifest.json');
  await p.waitForTimeout(500);
  await p.goto(U);
  await p.waitForTimeout(600);
  const after = await p.evaluate(async () => {
    const keys = (await caches.keys()).filter(k => k.indexOf('apex-shell-') === 0);
    const c = await caches.open(keys[0]);
    const shell = await c.match('./index.html');
    const t = shell ? await shell.text() : '';
    return { type: shell ? shell.headers.get('content-type') : null, len: t.length, isHtml: /^<!DOCTYPE html>/i.test(t.trim()) };
  });
  console.log('        ' + JSON.stringify({ type: after.type, len: after.len, isHtml: after.isHtml }));
  ok('a non-HTML navigation cannot become the shell', after.isHtml && after.len > 100000, JSON.stringify(after));

  // LAUNCHPAD is its own app with its own worker below APEX's. Visit it online
  // the way a reader does — open it once, open a module, no reload —
  // and it must then keep working with the network gone.
  await LP.open(p, '/');
  await p.evaluate(() => navigator.serviceWorker.getRegistration('./').then(r => r && navigator.serviceWorker.ready));
  await p.waitForTimeout(800);
  await LP.go(p, '/module/M0?step=learn');
  await p.waitForSelector('.lesson', { timeout: 6000 }).catch(() => {});
  await LP.go(p, '/module/M0?step=build');
  await LP.go(p, '/plan');
  await LP.go(p, '/');
  const lpSw = await p.evaluate(async () => {
    const r = await navigator.serviceWorker.getRegistration(location.href);
    return { scope: r ? new URL(r.scope).pathname : null, keys: await caches.keys() };
  });
  ok('LAUNCHPAD runs its own worker beside APEX\'s', /\/launchpad\/$/.test(lpSw.scope || '') &&
    lpSw.keys.some(k => k.indexOf('apex-shell-') === 0) && lpSw.keys.some(k => k.indexOf('launchpad-') === 0), JSON.stringify(lpSw));

  // Now go offline and reload.
  await ctx.setOffline(true);
  await p.goto(U, { waitUntil: 'domcontentloaded' }).catch(e => errs.push('goto: ' + e.message));
  await p.waitForTimeout(1500);
  const off = await p.evaluate(() => ({
    title: document.title,
    hasApp: typeof window.goTab === 'function',
    launcher: !!document.querySelector('.lsLp'),
    booting: document.body.classList.contains('booting'),
    count: (document.getElementById('lsSubLp') || {}).textContent
  }));
  console.log('        offline: ' + JSON.stringify(off));
  ok('the app loads with no network', off.hasApp && off.launcher && !off.booting && /\/33 PASSED/.test(off.count || ''), JSON.stringify(off));

  // And LAUNCHPAD opens from the launcher and works offline.
  await Promise.all([p.waitForURL(/\/launchpad\//, { timeout: 8000 }), p.click('.lsLp')]).catch(e => errs.push('launch: ' + e.message));
  await p.waitForSelector('.shell .route', { timeout: 8000 }).catch(() => {});
  await p.waitForTimeout(600);
  const realm = await p.evaluate(() => ({
    drawn: !!document.querySelector('.shell .route'),
    layers: document.querySelectorAll('.dcard').length
  }));
  ok('LAUNCHPAD renders offline', realm.drawn && realm.layers === 9, JSON.stringify(realm));

  await LP.go(p, '/module/M0?step=build');
  await p.waitForSelector('.tick', { timeout: 6000 }).catch(() => {});
  await LP.tick(p, /^Delta written/).catch(e => errs.push('tick: ' + e.message));
  const rec = await LP.record(p);
  ok('progress can be recorded offline', !!(rec && rec.mods && rec.mods.M0 && rec.mods.M0.delta === true), JSON.stringify(rec && rec.mods && rec.mods.M0));
  await LP.go(p, '/module/M0?step=learn');
  await p.waitForSelector('.lesson', { timeout: 6000 }).catch(() => {});
  ok('a visited module\'s lessons read offline', (await p.$$eval('.lesson', e => e.length)) === 2);

  await ctx.setOffline(false);
  ok('no page errors', errs.length === 0, errs.join(' | '));
  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nOFFLINE WORKS');
  process.exit(fails ? 1 : 0);
})();
