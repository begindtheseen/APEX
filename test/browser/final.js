var ENV = require('./_env');
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(ENV.launchOpts);
  let fail=0; const ok=(n,c,x='')=>{console.log((c?'  PASS':'  FAIL')+'  '+n+(x?'  '+x:''));if(!c)fail++;};
  for (const [w,h,name] of [[390,844,'390'],[430,932,'430'],[1280,1000,'1280']]) {
    const pg = await b.newPage({ viewport:{width:w,height:h} });
    const errs=[]; pg.on('pageerror',e=>errs.push(e.message));
    await pg.goto(ENV.BASE + '/index.html',{waitUntil:'networkidle'});
    console.log('\n── '+name+'px ──');
    const ov=()=>pg.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);

    ok('four realms', (await pg.$$eval('.ls-panel',e=>e.length))===4);
    await pg.click('.lsLp'); await pg.waitForTimeout(1500);
    ok('realm opens', await pg.$eval('#launchpadApp',e=>e.classList.contains('active')));
    ok('sidebar nav', (await pg.$$eval('#launchpadApp .lp-navbtn',e=>e.length))===4);
    ok('9 layer cards', (await pg.$$eval('.lp-lay',e=>e.length))===9);
    ok('readiness ring', !!(await pg.$('.lp-ring')));
    // The realm is white and blue. Scoped to the LAUNCHPAD subtree and read
    // off computed style, because the document also carries other realms'
    // palettes and APEX is legitimately green.
    ok('no green anywhere', await pg.evaluate(()=>{
      const green=c=>{const m=c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/); if(!m) return false;
        const [r,g,b]=[+m[1],+m[2],+m[3]]; return g>110 && g>r+45 && g>b+45;};
      const props=['color','backgroundColor','borderTopColor','borderLeftColor','fill','stroke'];
      for(const el of document.querySelectorAll('#launchpadApp, #launchpadApp *')){
        const cs=getComputedStyle(el);
        for(const p of props) if(green(cs[p])) return false;
      }
      return true;
    }));
    ok('home no overflow', !(await ov()));

    await pg.click('#launchpadApp .lp-navbtn >> nth=1'); await pg.waitForTimeout(350);
    ok('33 modules', (await pg.$$eval('.lp-mod',e=>e.length))===33);
    // 30, not 28: the hard gate now actually locks layers 4-6, and M29/M30
    // gained the inbound edge Rule 2 claims every module but M0 has.
    ok('32 locked on a fresh install', (await pg.$$eval('.lp-mod.lock',e=>e.length))===32);
    ok('only M0 open', (await pg.$$eval('.lp-mod:not(.lock)',e=>e.map(x=>x.textContent.trim().slice(0,2)).join())) === 'M0');
    ok('locked opens but cannot be claimed', await (async()=>{await pg.evaluate(()=>lpOpen('M5'));await pg.waitForTimeout(250);const has=(await pg.$eval('#launchpadApp',e=>e.innerText)).includes('LOCKED');await pg.click('#lpCrumb a');await pg.waitForTimeout(250);return has;})());
    ok('hard gate', !!(await pg.$('.lp-gate')));
    ok('modules no overflow', !(await ov()));

    await pg.click('#launchpadApp .lp-navbtn >> nth=2'); await pg.waitForTimeout(300);
    await pg.fill('.lp-f >> nth=0 >> input','6'); await pg.fill('.lp-f >> nth=1 >> input','20'); await pg.waitForTimeout(300);
    ok('short runway -> Spine', await pg.evaluate(()=>{
      const v=document.querySelector('.lp-vrec').textContent, w=document.querySelector('.lp-vwhy').textContent;
      return (v.includes('SPINE')||v.includes('NEITHER FITS')) && w.includes('Spine');
    }));
    await pg.fill('.lp-f >> nth=0 >> input','24'); await pg.fill('.lp-f >> nth=1 >> input','25'); await pg.waitForTimeout(300);
    ok('long runway -> full', (await pg.$eval('.lp-vrec',e=>e.textContent)).includes('FULL PROGRAM FITS'));

    await pg.click('#launchpadApp .lp-navbtn >> nth=3'); await pg.waitForTimeout(300);
    ok('10 tracks', (await pg.$$eval('#launchpadApp .lp-tk',e=>e.length))===10);
    ok('tracks has the rail', (await pg.$$eval('#launchpadApp .lp-cols',e=>e.length))===1);

    await pg.click('#launchpadApp .lp-navbtn >> nth=1'); await pg.waitForTimeout(300);
    await pg.click('#launchpadApp .lp-mod:not(.lock)'); await pg.waitForTimeout(350);
    ok('numbered sections', (await pg.$$eval('.lx-sec',e=>e.length))>=4);
    ok('sections numbered in sequence', await pg.$$eval('.lx-secN',e=>{
      const n=e.map(x=>parseInt(x.textContent,10));
      return n.length>=5 && n.every((v,i)=>v===i+1);
    }));
    ok('every lesson has the same six sections', await pg.evaluate(async()=>{
      const ids=AI_CURRICULUM.map(m=>m.id), want=['WORDS','UNDERSTAND','BUILD','CHECKPOINTS','GATE','PITFALLS'];
      for(const id of ids){ lpOpen(id);
        const got=[...document.querySelectorAll('.lx-secN')].map(x=>x.textContent.replace(/^\d+ · /,''));
        if(got.length!==want.length||!want.every((w,i)=>got[i].includes(w))) { lpOpen('M0'); return false; } }
      lpOpen('M0'); return true;
    }));
    ok('words section first', (await pg.$eval('.lx-secN',e=>e.textContent)).indexOf('WORDS')!==-1);
    ok('words rows', (await pg.$$eval('.lx-wd',e=>e.length))>=8);
    ok('gate spec rows', (await pg.$$eval('.lx-gk b',e=>e.length))>=3);
    ok('rail facts', (await pg.$$eval('.lx-rk',e=>e.length))>=4);

    const n=await pg.$$eval('.lp-chk',e=>e.length);
    for(let i=0;i<n;i++){ await pg.click(`.lp-chk >> nth=${i}`); await pg.waitForTimeout(120); }
    // The way back is the breadcrumb now; the second stacked back button is gone.
    ok('lesson keeps Modules lit', (await pg.$$eval('#launchpadApp .lp-navbtn.on',e=>e.map(x=>x.textContent.trim()).join()))==='Modules');
    ok('crumb names the path', /Modules \/ .+ \/ M0/.test(await pg.$eval('#lpCrumb',e=>e.textContent)));
    await pg.click('#lpCrumb a'); await pg.waitForTimeout(350);
    ok('M0 gate opens the ramp', (await pg.$$eval('.lp-mod.lock',e=>e.length))===28);

    await pg.reload({waitUntil:'networkidle'});
    ok('sublabel persists', (await pg.$eval('#lsSubLp',e=>e.textContent)).startsWith('1/33'));
    await pg.click('.lsLp'); await pg.waitForTimeout(1500);
    ok('ring reflects progress', (await pg.$eval('.lp-rv',e=>e.textContent))!=='0%');

    const dl=pg.waitForEvent('download',{timeout:5000}).catch(()=>null);
    await pg.click('button:has-text("Export progress")');
    ok('export downloads', !!(await dl));

    await pg.click('#launchpadApp .lp-exit'); await pg.waitForTimeout(400);
    ok('returns to launcher', await pg.$eval('#launcherScreen',e=>e.classList.contains('active')));
    ok('no page errors', errs.length===0, errs.join('|'));
    await pg.close();
  }
  console.log('\n'+(fail?('FAILURES: '+fail):'ALL CHECKS PASSED'));
  await b.close(); process.exit(fail?1:0);
})();
