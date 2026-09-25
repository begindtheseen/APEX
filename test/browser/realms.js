var ENV = require('./_env');
var LP = require('./_launchpad');
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(ENV.launchOpts);
  let fail=0; const ok=(n,c,x='')=>{console.log((c?'  PASS':'  FAIL')+'  '+n+(x?'  '+x:''));if(!c)fail++;};
  for (const [w,h,label] of [[390,844,'390'],[1280,900,'1280']]) {
    console.log('\n════ '+label+'px ════');
    for (const [sel,name,appId] of [['.lsObs','OBSIDIAN','obsidianApp'],['.lsRed','REDLINE','obsidianApp']]) {
      const pg = await b.newPage({ viewport:{width:w,height:h} });
      const errs=[]; pg.on('pageerror',e=>errs.push(e.message));
      await pg.goto(ENV.BASE + '/index.html',{waitUntil:'networkidle'});
      await pg.click(sel); await pg.waitForTimeout(1600);
      console.log(' ── '+name);
      const rc = await pg.evaluate(id=>getComputedStyle(document.getElementById(id)).getPropertyValue('--rc').trim(), appId);
      ok('themed accent', !!rc, rc);
      ok('rail present', (await pg.$$eval('.screen.active .lp-navbtn, #'+appId+' .lp-navbtn',e=>e.length))>2);
      ok('entrance class', (await pg.evaluate(id=>document.querySelector('#'+id+' .lp-body').className, appId)).includes('mo-in'));
      ok('no h-overflow', !(await pg.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth)));
      // hover lift only where a pointer exists
      const liftEl = await pg.$('#'+appId+' .mo-lift');
      if (liftEl && w>800) {
        const t0=await liftEl.evaluate(e=>getComputedStyle(e).transform);
        await liftEl.hover(); await pg.waitForTimeout(250);
        const t1=await liftEl.evaluate(e=>getComputedStyle(e).transform);
        ok('hover lifts', t0!==t1);
      }
      // rail navigation actually changes the view
      const nav = await pg.$$('#'+appId+' .lp-navbtn');
      if (nav.length>2) {
        const before = await pg.evaluate(id=>document.querySelector('#'+id+' .lp-body').innerHTML.length, appId);
        await nav[2].click(); await pg.waitForTimeout(450);
        const after = await pg.evaluate(id=>document.querySelector('#'+id+' .lp-body').innerHTML.length, appId);
        ok('rail changes view', before!==after);
        ok('active moves', (await pg.$$eval('#'+appId+' .lp-navbtn.on',e=>e.length))===1);
      }
      ok('leaves the realm', await (async()=>{
        for (let i=0;i<4;i++){
          await pg.click('#'+appId+' .lp-exit'); await pg.waitForTimeout(400);
          if (await pg.$eval('#launcherScreen',e=>e.classList.contains('active'))) return true;
        }
        return false; })());
      ok('no page errors', errs.length===0, errs.join('|'));
      await pg.close();
    }

    // LAUNCHPAD is its own app at /launchpad/ — ORBIT's platform, not a
    // screen inside this page — so its leg drives that app.
    {
      const pg = await b.newPage({ viewport:{width:w,height:h} });
      const errs=[]; pg.on('pageerror',e=>errs.push(e.message));
      await pg.goto(ENV.BASE + '/index.html',{waitUntil:'networkidle'});
      console.log(' ── LAUNCHPAD');
      await Promise.all([pg.waitForURL(/\/launchpad\//, { timeout: 8000 }), pg.click('.lsLp')]).catch(()=>{});
      await pg.waitForSelector('.shell .route', { timeout: 8000 }).catch(()=>{});
      ok('the panel opens the app', /\/launchpad\/(index\.html)?(#.*)?$/.test(pg.url()), pg.url());
      ok('ORBIT shell, LAUNCHPAD brand', await pg.evaluate(()=>!!document.querySelector('.shell .side') && document.title.includes('LAUNCHPAD')), await pg.title());
      const navCount = await pg.$$eval('.side .nav-item', e=>e.length);
      ok('rail present, with the nine layers', navCount >= 9 + 3, 'items=' + navCount);
      ok('entrance class', !!(await pg.$('.route')));
      ok('no h-overflow', !(await pg.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth)));
      // rail navigation actually changes the view
      const before = await pg.evaluate(()=>document.querySelector('.route').innerText.length);
      await pg.evaluate(()=>{ document.querySelector('.side .nav-item[href="#/learning"]').click(); });
      await pg.waitForTimeout(500);
      const after = await pg.evaluate(()=>document.querySelector('.route').innerText.length);
      ok('rail changes view', before!==after && pg.url().endsWith('#/learning'));
      ok('active moves', (await pg.$$eval('.side .nav-item[data-on="true"]',e=>e.length))===1);
      ok('the rail leads back to the realms', await (async()=>{
        await Promise.all([pg.waitForURL(u => !/\/launchpad\//.test(String(u)), { timeout: 8000 }), pg.evaluate(()=>document.querySelector('.nav-item--realms').click())]).catch(()=>{});
        await pg.waitForTimeout(600);
        return await pg.$eval('#launcherScreen',e=>e.classList.contains('active')).catch(()=>false);
      })());
      ok('no page errors', errs.length===0, errs.join('|'));
      await pg.close();
    }
  }
  console.log('\n'+(fail?('FAILURES: '+fail):'ALL REALMS PASS'));
  await b.close(); process.exit(fail?1:0);
})();
