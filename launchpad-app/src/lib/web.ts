/* ============================================================================
   Web mode — the live preview
   ----------------------------------------------------------------------------
   Her HTML (with any <style> and <script> in it) is rendered in a sandboxed
   iframe: scripts run, but the page cannot reach this app, its storage or
   its cookies (no allow-same-origin). A small script injected first forwards
   console output and uncaught errors to the parent over postMessage, tagged
   with a per-render channel id so a stale frame can never write into a new
   run's console.

   The same relay answers Learn mode's page checks. A check is a few lines of
   plain steps — `h1 text == Hello`, `click button`, `#out text == Clicked` —
   run inside the page after it loads, and reported back the same way. Each
   check gets a freshly loaded page of its own.

   Steps: `click <sel>`, `type <sel> <text>`, `press <sel> <Key>` (focuses it,
   then keydown and keyup; `Space`, and modifiers as in `Ctrl+z`; Enter and
   Space activate buttons, links and checkboxes the way a browser does),
   `wait <ms>` (up to 3000; later steps run after it), and assertions
   `<sel> exists | missing | focused | count <op> N | text <op> v |
   value <op> v | attr <name> <op> v | style <prop> <op> v | class <name>`.
   A check with no `wait` runs synchronously, all in one go, as it always has.
   Checks run side by side in frames of one page, and a frame that takes the
   focus clears it from the others, so `focused` also accepts the element
   that last received focus when the document's focus has been cleared.

   Forms: the frame is sandboxed without allow-forms, so the browser refuses
   to submit a form and never fires `submit`. The relay stands in for it: a
   click on a submit button (or Enter in a field) validates the form and
   fires a cancelable `submit` event on it, and a `method="dialog"` form
   closes its dialog, so `preventDefault()` handlers work as on a real page.
   Nothing ever navigates.
   ========================================================================== */

export interface WebLog {
  level: 'log' | 'warn' | 'error'
  text: string
}

export interface DomResult {
  pass: boolean
  /** The step that failed, and what the page actually had. */
  detail?: string
}

/** The script that runs inside the preview: console relay, and the checker. */
function injected(channel: string, checks: string[][] | null): string {
  const cfg = JSON.stringify({ channel, checks })
  // Kept dependency-free and ES2017: it runs in whatever the frame gives it.
  return `<script>(function(){
var CFG=${cfg.replace(/</g, '\\u003c')};
function post(m){m.channel=CFG.channel;try{parent.postMessage(m,'*')}catch(e){}}
function show(v){if(typeof v==='string')return v;try{return JSON.stringify(v)}catch(e){return String(v)}}
['log','info','warn','error'].forEach(function(k){var o=console[k];console[k]=function(){var a=[].slice.call(arguments).map(show).join(' ');post({type:'console',level:k==='info'?'log':k,text:a});o&&o.apply(console,arguments)}});
window.addEventListener('error',function(e){post({type:'console',level:'error',text:(e.message||'Error')+(e.lineno?' (line '+e.lineno+')':'')})});
function submits(el){if(!el||!el.form)return false;var ty=String(el.getAttribute('type')||'').toLowerCase();return el.tagName==='BUTTON'?(ty===''||ty==='submit'):(el.tagName==='INPUT'&&(ty==='submit'||ty==='image'))}
function submitForm(form,by){
  if(!form.noValidate&&!(by&&by.formNoValidate)&&!form.reportValidity())return;
  var ev;try{ev=new SubmitEvent('submit',{bubbles:true,cancelable:true,submitter:by||null})}catch(e){ev=new Event('submit',{bubbles:true,cancelable:true})}
  if(!form.dispatchEvent(ev))return;
  var dlg=String(form.getAttribute('method')||'').toLowerCase()==='dialog'&&form.closest('dialog');
  if(dlg&&dlg.open)dlg.close(by&&by.value?by.value:undefined);
}
window.addEventListener('click',function(e){var t=e.target,b=t&&t.closest?t.closest('button,input'):null;if(e.defaultPrevented||!submits(b)||b.disabled)return;e.preventDefault();submitForm(b.form,b)});
window.addEventListener('keydown',function(e){var t=e.target;if(e.defaultPrevented||e.key!=='Enter'||!t||t.tagName!=='INPUT'||!t.form||/^(button|submit|reset|image|checkbox|radio|file|color|range)$/i.test(t.type))return;e.preventDefault();var els=t.form.elements;for(var i=0;i<els.length;i++){if(submits(els[i])){if(!els[i].disabled)els[i].click();return}}submitForm(t.form,null)});
if(!CFG.checks)return;
var lastFocus=null;document.addEventListener('focusin',function(e){lastFocus=e.target},true);
function hasFocus(el){var a=document.activeElement;return a===el||((!a||a===document.body)&&lastFocus===el&&el.isConnected)}
function norm(s){return String(s==null?'':s).replace(/\\s+/g,' ').trim()}
function cmp(op,a,b){var x=Number(a),y=Number(b);switch(op){case '==':return a===b;case '!=':return a!==b;case 'contains':return a.indexOf(b)>=0;case '>=':return x>=y;case '<=':return x<=y;case '>':return x>y;case '<':return x<y}return false}
var KEYS=['exists','missing','focused','count','text','value','attr','style','class'];
function activates(el,key){var tag=el.tagName,ty=String(el.type||'').toLowerCase();if(el.disabled)return false;if(key==='Enter')return tag==='BUTTON'||tag==='SUMMARY'||(tag==='A'&&el.hasAttribute('href'))||(tag==='INPUT'&&/^(button|submit|reset|image)$/.test(ty));if(key===' ')return tag==='BUTTON'||tag==='SUMMARY'||(tag==='INPUT'&&/^(button|submit|reset|image|checkbox|radio)$/.test(ty));return false}
function press(el,spec){
  var parts=spec.length>1?spec.split('+'):[spec],key=parts.pop()||'+',mods={};parts.forEach(function(p){mods[p.toLowerCase()]=true});
  if(key==='Space')key=' ';
  var code=key===' '?'Space':/^[a-z]$/i.test(key)?'Key'+key.toUpperCase():/^[0-9]$/.test(key)?'Digit'+key:key;
  function ev(type){return new KeyboardEvent(type,{key:key,code:code,bubbles:true,cancelable:true,ctrlKey:!!(mods.ctrl||mods.control),shiftKey:!!mods.shift,altKey:!!mods.alt,metaKey:!!(mods.meta||mods.cmd)})}
  if(typeof el.focus==='function')el.focus();
  if(el.dispatchEvent(ev('keydown'))&&key==='Enter'&&activates(el,key))el.click();
  if(el.dispatchEvent(ev('keyup'))&&key===' '&&activates(el,key))el.click();
}
function step(line){
  var t=line.trim(); if(!t) return null;
  var m=/^click\\s+(.+)$/.exec(t); if(m){var el=document.querySelector(m[1]); if(!el) return 'nothing matches '+m[1]+' to click'; el.click(); return null}
  m=/^press\\s+(.+)\\s+(\\S+)$/.exec(t); if(m){var pel=document.querySelector(m[1]); if(!pel) return 'nothing matches '+m[1]+' to press '+m[2]+' on'; press(pel,m[2]); return null}
  m=/^type\\s+(\\S+)\\s+(.*)$/.exec(t); if(m){var inp=document.querySelector(m[1]); if(!inp) return 'nothing matches '+m[1]+' to type into'; inp.value=m[2]; inp.dispatchEvent(new Event('input',{bubbles:true})); inp.dispatchEvent(new Event('change',{bubbles:true})); return null}
  var words=t.split(/\\s+/), k=-1; for(var i=1;i<words.length;i++){if(KEYS.indexOf(words[i])>=0){k=i;break}}
  if(k<0) return 'the check "'+t+'" could not be read';
  var sel=words.slice(0,k).join(' '), key=words[k], rest=words.slice(k+1);
  var all; try{all=document.querySelectorAll(sel)}catch(e){return 'bad selector '+sel}
  var el=all[0];
  if(key==='exists') return all.length?null:'there is no '+sel+' on the page';
  if(key==='missing') return all.length?sel+' should not be on the page':null;
  if(key==='focused') return !el?'there is no '+sel+' on the page':hasFocus(el)?null:sel+' does not have the keyboard focus'+(document.activeElement&&document.activeElement!==document.body?' ('+describe(document.activeElement)+' has it)':'');
  if(key==='count'){var op=rest[0],n=rest[1]; return cmp(op,String(all.length),n)?null:'expected '+sel+' count '+op+' '+n+', found '+all.length}
  if(!el) return 'there is no '+sel+' on the page';
  var actual, op2, want;
  if(key==='text'||key==='value'){actual=norm(key==='text'?el.textContent:el.value); op2=rest[0]; want=norm(rest.slice(1).join(' '))}
  else if(key==='attr'){actual=el.getAttribute(rest[0]); if(actual===null) return sel+' has no '+rest[0]+' attribute'; actual=norm(actual); op2=rest[1]; want=norm(rest.slice(2).join(' '))}
  else if(key==='style'){actual=norm(getComputedStyle(el).getPropertyValue(rest[0])); op2=rest[1]; want=norm(rest.slice(2).join(' '))}
  else if(key==='class'){return el.classList.contains(rest[0])?null:sel+' does not have the class '+rest[0]}
  return cmp(op2,actual,want)?null:sel+' '+key+(key==='attr'||key==='style'?' '+rest[0]:'')+': expected '+(op2==='contains'?'to contain ':'')+JSON.stringify(want)+', found '+JSON.stringify(actual);
}
function describe(el){return el.tagName.toLowerCase()+(el.id?'#'+el.id:'')}
function runCheck(lines,done){
  var i=0;
  (function next(){
    while(i<lines.length){
      var line=lines[i++],w=/^wait\\s+(\\d+)\\s*(ms)?$/.exec(line.trim());
      if(w){setTimeout(next,Math.min(Number(w[1]),3000));return}
      var err;try{err=step(line)}catch(e){err=String(e&&e.message||e)}
      if(err)return done({pass:false,detail:err});
    }
    done({pass:true});
  })();
}
function runChecks(){
  var results=[],k=0;
  (function next(){
    if(k>=CFG.checks.length)return post({type:'checks',results:results});
    runCheck(CFG.checks[k],function(r){results.push(r);k++;next()});
  })();
}
window.addEventListener('load',function(){setTimeout(runChecks,60)});
})();</script>`
}

/** The page the preview renders: the relay first, then her HTML. */
export function buildPage(html: string, channel: string, checks: string[][] | null = null): string {
  const script = injected(channel, checks)
  // Put the relay before anything of hers so it sees her first console.log.
  if (/<head[^>]*>/i.test(html)) return html.replace(/<head[^>]*>/i, (m) => `${m}${script}`)
  if (/<html[^>]*>/i.test(html)) return html.replace(/<html[^>]*>/i, (m) => `${m}<head>${script}</head>`)
  return `<!doctype html><html><head><meta charset="utf-8">${script}</head><body>${html}</body></html>`
}

let seq = 0
export function newChannel(): string {
  seq += 1
  return `web-${Date.now().toString(36)}-${seq}`
}

/**
 * Renders the page in a hidden frame and runs one check inside it; resolves
 * with what it logged and what the check found (null if it never reported).
 */
function checkInFrame(html: string, steps: string[] | null, timeoutMs: number): Promise<{ logs: WebLog[]; result: DomResult | null }> {
  const channel = newChannel()
  return new Promise((resolve) => {
    const frame = document.createElement('iframe')
    frame.setAttribute('sandbox', 'allow-scripts allow-modals')
    frame.setAttribute('aria-hidden', 'true')
    frame.tabIndex = -1
    // On screen, behind the page, all but invisible and click-through. A frame
    // that is off screen, visibility:hidden or opacity:0 is not rendered, and
    // events tied to rendering (a <dialog>'s close, animation frames) arrive
    // late or never.
    frame.style.cssText = 'position:fixed;left:0;top:0;width:800px;height:600px;border:0;opacity:0.01;pointer-events:none;z-index:-1'
    const logs: WebLog[] = []
    const done = (result: DomResult | null) => {
      window.removeEventListener('message', onMessage)
      clearTimeout(timer)
      frame.remove()
      resolve({ logs, result })
    }
    const onMessage = (e: MessageEvent) => {
      const m = e.data as { channel?: string; type?: string; level?: WebLog['level']; text?: string; results?: DomResult[] }
      if (!m || m.channel !== channel || e.source !== frame.contentWindow) return
      if (m.type === 'console') logs.push({ level: m.level ?? 'log', text: m.text ?? '' })
      if (m.type === 'checks') done(m.results?.[0] ?? { pass: true })
    }
    const timer = setTimeout(() => done(null), timeoutMs)
    window.addEventListener('message', onMessage)
    frame.srcdoc = buildPage(html, channel, [steps ?? []])
    document.body.appendChild(frame)
  })
}

/**
 * Runs each check in a page of its own, so one check's clicks never leak
 * into the next, and returns what the page logged (once) and what each check
 * found. A page that never finished loading fails its check. Browser-only.
 */
export async function runWebChecks(html: string, checks: string[][], timeoutMs = 6000): Promise<{ logs: WebLog[]; results: DomResult[] | null; ms: number }> {
  const started = Date.now()
  // A check that focuses something in its frame takes the focus from this
  // page; hand it back to wherever she was when they are done.
  const before = document.activeElement
  const runs = await Promise.all((checks.length ? checks : [null]).map((c) => checkInFrame(html, c, timeoutMs)))
  if (before instanceof HTMLElement && before !== document.activeElement && before.isConnected) before.focus({ preventScroll: true })
  const stalled: DomResult = { pass: false, detail: 'The page did not finish loading in time, so this was not checked.' }
  return {
    logs: runs[0]!.logs,
    results: checks.length ? runs.map((r) => r.result ?? stalled) : [],
    ms: Date.now() - started,
  }
}
