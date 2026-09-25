var ENV = require('./_env');
var LP = require('./_launchpad');
// The whole LAUNCHPAD walk at three widths: from the launcher into the app,
// the dashboard, the ladder and the hard gate, The Plan, the parallel tracks,
// a module page, claiming M0 through its gate, and back to the launcher with
// the count carried over.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(ENV.launchOpts);
  let fail=0; const ok=(n,c,x='')=>{console.log((c?'  PASS':'  FAIL')+'  '+n+(x?'  '+x:''));if(!c)fail++;};
  for (const [w,h,name] of [[390,844,'390'],[430,932,'430'],[1280,1000,'1280']]) {
    const ctx = await b.newContext({ viewport:{width:w,height:h}, acceptDownloads:true });
    const pg = await ctx.newPage();
    const errs=[]; pg.on('pageerror',e=>errs.push(e.message)); pg.on('dialog',d=>d.accept());
    await LP.reset(pg);
    await pg.goto(ENV.BASE + '/index.html',{waitUntil:'networkidle'});
    console.log('\n── '+name+'px ──');
    const ov=()=>pg.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);

    ok('four realms', (await pg.$$eval('.ls-panel',e=>e.length))===4);
    ok('the panel counts gates', (await pg.$eval('#lsSubLp',e=>e.textContent)).trim()==='0/33 PASSED');
    await Promise.all([pg.waitForURL(/\/launchpad\//,{timeout:8000}), pg.click('.lsLp')]).catch(()=>{});
    await pg.waitForSelector('.shell .route',{timeout:8000}).catch(()=>{});
    ok('the app opens', !!(await pg.$('.shell .route')));
    ok('sidebar nav', (await pg.$$eval('.side .nav-item',e=>e.length))>=15);
    ok('9 layer cards', (await pg.$$eval('.dcard',e=>e.length))===9);
    ok('9 layers in mission progress', (await pg.$$eval('.mrow',e=>e.length))===9);
    ok('readiness ring', !!(await pg.$('.mission__ring')));
    ok('home no overflow', !(await ov()));

    await LP.go(pg,'/learning');
    ok('33 modules on the ladder', (await pg.$$eval('.mcard',e=>e.length))===33);
    ok('32 locked on a fresh install', (await pg.$$eval('.mcard[data-locked="true"]',e=>e.length))===32);
    ok('only M0 open', (await pg.$$eval('.mcard[data-locked="false"] .mcard__tier',e=>e.map(x=>x.textContent.trim().slice(0,2)).join()))==='M0');
    ok('hard gate', (await pg.$$eval('#hard-gate .tick',e=>e.length))===4);
    ok('ladder no overflow', !(await ov()));
    ok('locked opens but cannot be claimed', await (async()=>{
      await LP.go(pg,'/module/M5?step=build');
      const t=await LP.text(pg);
      const rows=await pg.$$eval('.tick',e=>e.every(x=>x.getAttribute('aria-disabled')==='true'));
      return /Locked — reading ahead is fine, claiming is not/.test(t) && rows;
    })());

    await LP.go(pg,'/plan');
    await pg.fill('#lpRunway','6'); await pg.fill('#lpHours','20'); await pg.waitForTimeout(250);
    ok('short runway -> Spine', await pg.evaluate(()=>{
      const v=document.querySelector('.lp-verdict').textContent, w=document.querySelector('.lp-why').textContent;
      return (v.includes('SPINE')||v.includes('NEITHER FITS')) && w.includes('Spine');
    }));
    await pg.fill('#lpRunway','24'); await pg.fill('#lpHours','25'); await pg.waitForTimeout(250);
    ok('long runway -> full', (await pg.$eval('.lp-verdict',e=>e.textContent)).includes('FULL PROGRAM FITS'));
    ok('plan no overflow', !(await ov()));

    await LP.go(pg,'/tracks');
    ok('10 tracks', (await pg.$$eval('.lp-track',e=>e.length))===10);
    ok('tracks has the rail', (await pg.$$eval('.read > .stack',e=>e.length))===2);

    await LP.go(pg,'/module/M0?step=learn');
    ok('learn, build, recall', (await pg.$$eval('.path__step',e=>e.map(x=>x.querySelector('.path__label').textContent).join()))==='Learn,Build,Recall');
    ok('words first, then lessons', await pg.$$eval('.card-head',e=>{
      const t=e.map(x=>x.textContent);
      const wi=t.findIndex(x=>/^01 · Words/.test(x)), li=t.findIndex(x=>/^02 · Lessons/.test(x));
      return wi>=0 && li>wi;
    }));
    ok('two lessons from the document', (await pg.$$eval('.lesson',e=>e.length))===2);
    ok('the mechanism figure', !!(await pg.waitForSelector('.lp-figure svg',{timeout:4000}).catch(()=>null)));
    ok('rail facts', (await pg.$$eval('.fact',e=>e.length))>=4);
    await LP.go(pg,'/module/M0?step=build');
    ok('gate spec rows', (await pg.$$eval('.gate-row',e=>e.length))>=3);
    ok('module no overflow', !(await ov()));

    await LP.pass(pg,'M0');
    ok('the claim track fills', (await pg.$$eval('.claimtrack__step[data-on="true"]',e=>e.length))===3);
    await LP.go(pg,'/learning');
    ok('M0 gate opens the ramp', (await pg.$$eval('.mcard[data-locked="true"]',e=>e.length))===28);

    await pg.reload({waitUntil:'networkidle'});
    await pg.waitForTimeout(400);
    ok('progress persists', (await pg.$$eval('.mcard[data-locked="true"]',e=>e.length))===28);
    await LP.go(pg,'/');
    ok('ring reflects progress', (await pg.$eval('.mission__ring',e=>e.textContent.trim()))!=='0%');

    await LP.go(pg,'/settings');
    const dl=pg.waitForEvent('download',{timeout:5000}).catch(()=>null);
    await pg.click('button:has-text("Export")');
    const file=await dl;
    ok('export downloads', !!file && /^launchpad-backup-/.test(file.suggestedFilename()));

    await Promise.all([pg.waitForURL(u=>!/\/launchpad\//.test(String(u)),{timeout:8000}), pg.evaluate(()=>document.querySelector('.nav-item--realms').click())]).catch(()=>{});
    await pg.waitForTimeout(600);
    ok('returns to launcher', await pg.$eval('#launcherScreen',e=>e.classList.contains('active')).catch(()=>false));
    ok('the panel carries the count', (await pg.$eval('#lsSubLp',e=>e.textContent)).startsWith('1/33'));
    ok('no page errors', errs.length===0, errs.join('|'));
    await ctx.close();
  }
  console.log('\n'+(fail?('FAILURES: '+fail):'ALL CHECKS PASSED'));
  await b.close(); process.exit(fail?1:0);
})();
