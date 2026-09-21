var ENV = require('./_env');
// Measures every text/background pair the LAUNCHPAD realm renders.
const { chromium } = require('playwright');
const U=ENV.BASE + '/index.html';
(async()=>{
const b=await chromium.launch(ENV.launchOpts);
const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto(U); await p.evaluate(()=>localStorage.clear()); await p.goto(U);
const views=['home','modules','plan','tracks'];
let all=[];
for (const v of views){
  await p.evaluate(t=>{enterLaunchpad();lpTab(t);},v);
  await p.waitForTimeout(400);
  all=all.concat(await p.evaluate(()=>{
    function lum(c){const m=(c.match(/[\d.]+/g)||[0,0,0]).slice(0,3).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*m[0]+0.7152*m[1]+0.0722*m[2];}
    function rgba(c){const m=(c.match(/[\d.]+/g)||[0,0,0]).map(Number);return {r:m[0]||0,g:m[1]||0,b:m[2]||0,a:m.length>3?m[3]:1};}
    // Composite every translucent layer over the one behind it. Taking a 4%-alpha
    // background at face value reads as near-white and invents failures.
    function bg(el){const st=[];let e=el;while(e){st.push(rgba(getComputedStyle(e).backgroundColor));e=e.parentElement;}
      let out={r:0,g:3,b:10};
      for(let i=st.length-1;i>=0;i--){const c=st[i];if(!c.a)continue;
        out={r:c.r*c.a+out.r*(1-c.a),g:c.g*c.a+out.g*(1-c.a),b:c.b*c.a+out.b*(1-c.a)};}
      return 'rgb('+out.r+','+out.g+','+out.b+')';}
    const out=[];
    document.querySelectorAll('#launchpadApp *').forEach(el=>{
      const t=Array.from(el.childNodes).filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join('');
      if(!t) return;
      const cs=getComputedStyle(el);
      if(cs.visibility==='hidden'||cs.display==='none') return;
      const r=el.getBoundingClientRect(); if(!r.width||!r.height) return;
      const op=parseFloat(cs.opacity); if(op<0.3) return;
      const a=lum(cs.color),c=lum(bg(el));
      const ratio=(Math.max(a,c)+0.05)/(Math.min(a,c)+0.05);
      const px=parseFloat(cs.fontSize), bold=parseInt(cs.fontWeight,10)>=700;
      const large=px>=24||(px>=18.66&&bold);
      const need=large?3:4.5;
      if(ratio<need) out.push({ratio:+ratio.toFixed(2),need,sel:el.className&&typeof el.className==='string'?el.className.split(' ').slice(0,2).join('.'):el.tagName,px:+px.toFixed(1),text:t.slice(0,32)});
    });
    return out;
  }));
}
// lesson views
for (const id of ['M0','M1','M5','M12','M18']){
  await p.evaluate(i=>lpOpen(i),id);
  await p.waitForTimeout(250);
  all=all.concat(await p.evaluate(()=>{
    function lum(c){const m=(c.match(/[\d.]+/g)||[0,0,0]).slice(0,3).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*m[0]+0.7152*m[1]+0.0722*m[2];}
    function rgba(c){const m=(c.match(/[\d.]+/g)||[0,0,0]).map(Number);return {r:m[0]||0,g:m[1]||0,b:m[2]||0,a:m.length>3?m[3]:1};}
    // Composite every translucent layer over the one behind it. Taking a 4%-alpha
    // background at face value reads as near-white and invents failures.
    function bg(el){const st=[];let e=el;while(e){st.push(rgba(getComputedStyle(e).backgroundColor));e=e.parentElement;}
      let out={r:0,g:3,b:10};
      for(let i=st.length-1;i>=0;i--){const c=st[i];if(!c.a)continue;
        out={r:c.r*c.a+out.r*(1-c.a),g:c.g*c.a+out.g*(1-c.a),b:c.b*c.a+out.b*(1-c.a)};}
      return 'rgb('+out.r+','+out.g+','+out.b+')';}
    const out=[];
    document.querySelectorAll('#launchpadApp *').forEach(el=>{
      const t=Array.from(el.childNodes).filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join('');
      if(!t) return;
      const cs=getComputedStyle(el);
      if(cs.visibility==='hidden'||cs.display==='none') return;
      const r=el.getBoundingClientRect(); if(!r.width||!r.height) return;
      const op=parseFloat(cs.opacity); if(op<0.3) return;
      const a=lum(cs.color),c=lum(bg(el));
      const ratio=(Math.max(a,c)+0.05)/(Math.min(a,c)+0.05);
      const px=parseFloat(cs.fontSize), bold=parseInt(cs.fontWeight,10)>=700;
      const large=px>=24||(px>=18.66&&bold);
      const need=large?3:4.5;
      if(ratio<need) out.push({ratio:+ratio.toFixed(2),need,sel:el.className&&typeof el.className==='string'?el.className.split(' ').slice(0,2).join('.'):el.tagName,px:+px.toFixed(1),text:t.slice(0,32)});
    });
    return out;
  }));
}
const seen=new Set(), uniq=[];
all.forEach(x=>{const k=x.sel+'|'+x.ratio;if(!seen.has(k)){seen.add(k);uniq.push(x);}});
uniq.sort((a,b)=>a.ratio-b.ratio);
console.log('LAUNCHPAD pairs below threshold:', uniq.length);
uniq.slice(0,20).forEach(x=>console.log('  '+String(x.ratio).padEnd(6)+'need '+x.need+'  '+x.px+'px  '+x.sel.padEnd(28)+'  "'+x.text+'"'));
console.log('errors',errs);
await b.close();})();
