import{r as e,t}from"./react-D6Jy4RLT.js";import{K as n,X as r,g as i,r as ee,v as te,w as ne}from"./ui-5JSjpmHC.js";import{x as a}from"./curriculum-rLod3J6P.js";import{S as o}from"./engine-BhleXMOO.js";import{_ as re,g as s}from"./index-DVqJcRIX.js";import{t as c}from"./markdown-DtHj94de.js";/* empty css              */import{C as l,S as u,_ as ie,a as d,b as ae,c as oe,d as se,f,g as ce,h as p,i as le,l as ue,m as de,n as fe,o as pe,p as me,r as he,s as ge,t as _e,u as ve,useNextLesson as ye,v as be,x as xe,y as Se}from"./Learn-CC2KTcxW.js";var m=e(),h=t(),Ce=[`python`,`javascript`,`typescript`,`cpp`],g={javascript:`main.js`,typescript:`main.ts`,python:`main.py`,cpp:`main.cpp`,sql:`query.sql`,html:`index.html`,bash:`~/project`};function _(e){return e===`sql`?`sql`:e===`html`?`web`:e===`bash`?`terminal`:`code`}var v={typescript:`// M3: a discriminated union, and the compiler holding you to every case.
// Delete one of the cases below and run it again — the build stops before
// anything runs, the way strict \`tsc\` stops CI.
type Reply =
  | { kind: 'text'; text: string }
  | { kind: 'tool_call'; name: string; args: Record<string, unknown> }
  | { kind: 'refusal'; reason: string }

function describe(reply: Reply): string {
  switch (reply.kind) {
    case 'text':
      return \`text (\${reply.text.length} chars)\`
    case 'tool_call':
      return \`tool \${reply.name}(\${Object.keys(reply.args).join(', ')})\`
    case 'refusal':
      return \`refused: \${reply.reason}\`
    default: {
      const unhandled: never = reply
      return unhandled
    }
  }
}

const replies: Reply[] = [
  { kind: 'text', text: 'Here is the summary you asked for.' },
  { kind: 'tool_call', name: 'search_docs', args: { query: 'pgvector', limit: 5 } },
  { kind: 'refusal', reason: 'outside the product scope' },
]
for (const r of replies) console.log(describe(r))
`,javascript:`// Predict the order these lines print in, then run it.
// This is M3's first checkpoint: sync code, then microtasks, then timers.
console.log('1 sync')
setTimeout(() => console.log('2 timeout'), 0)
Promise.resolve().then(() => console.log('3 microtask'))
queueMicrotask(() => console.log('4 queueMicrotask'))
;(async () => {
  console.log('5 async, before its first await')
  await null
  console.log('6 async, after the await')
})()
console.log('7 sync, last line')
`,python:`# Count the lines, words and characters in a piece of text:
# M1's first program, in the second language M24 introduces.
text = "\\n".join([
    "First line.",
    "Second line, a little longer.",
    "",
    "Fourth line, after a blank one.",
])

lines = text.splitlines()
words = text.split()
print("lines:", len(lines))
print("words:", len(words))
print("chars:", len(text))
print("longest line:", max(lines, key=len))
`,sql:`-- Model spend per user: the roll-up M20's credit ledger is audited with.
SELECT
  u.email,
  COUNT(r.id)                      AS requests,
  SUM(r.input_tokens)              AS tokens_in,
  SUM(r.output_tokens)             AS tokens_out,
  ROUND(SUM(r.cost_usd), 4)        AS spend_usd
FROM users u
LEFT JOIN requests r ON r.user_id = u.id
GROUP BY u.id
ORDER BY spend_usd DESC;
`,cpp:`// Reads the input box as standard input, one request per line
// ("user tokens"), and prints each user's total — the same roll-up as
// the SQL tab, in C++. Change the input, or the code, and run it again.
#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, long> tokens;
    std::string user;
    long n = 0;
    int lines = 0;
    while (std::cin >> user >> n) {
        tokens[user] += n;
        ++lines;
    }
    std::cout << lines << " requests, " << tokens.size() << " users\\n";
    for (const auto& [name, total] : tokens) {
        std::cout << "  " << name << ": " << total << " tokens\\n";
    }
    return 0;
}
`,html:`<!doctype html>
<html>
  <head>
    <style>
      body { font-family: system-ui, sans-serif; margin: 2rem; background: #0b1020; color: #e8ecf5; }
      h1 { color: #4fc1ff; }
      button { font-size: 1rem; padding: 0.6rem 1.2rem; border: 0; border-radius: 8px; background: #2fa8e6; color: white; cursor: pointer; }
    </style>
  </head>
  <body>
    <h1>Hello, web!</h1>
    <p>Edit this page and press Run Code to see it change.</p>
    <button id="launch">Launch</button>
    <p id="status">Waiting on the pad.</p>
    <script>
      let count = 0
      document.querySelector('#launch').addEventListener('click', () => {
        count += 1
        document.querySelector('#status').textContent = \`Launched \${count} time\${count === 1 ? '' : 's'}\`
        console.log('launch', count)
      })
    <\/script>
  </body>
</html>
`,text:``},we=`ada 1200
lin 15000
ada 5400
sam 300
ada 800
`,y=`
CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE);
CREATE TABLE requests (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  input_tokens INTEGER NOT NULL,
  output_tokens INTEGER NOT NULL,
  cost_usd REAL NOT NULL
);
INSERT INTO users (id, email) VALUES (1,'ada@example.com'), (2,'lin@example.com'), (3,'sam@example.com');
INSERT INTO requests (user_id, input_tokens, output_tokens, cost_usd) VALUES
  (1, 1200, 340, 0.0087), (1, 5400, 910, 0.0298), (1, 800, 120, 0.0042),
  (2, 15000, 2100, 0.0765), (2, 300, 80, 0.0017);
`;function b(){let e=re(),{state:t,setState:a}=i(),b=(0,m.useMemo)(()=>Te(e.query.ex),[e.query.ex]),x=b?.exercise,S=e.query.lang,C=x?.lang??(S&&S in g?S:`python`),[w,Ee]=(0,m.useState)(_(C)),[De,Oe]=(0,m.useState)(_(C)===`code`?C:`python`),T=w===`code`?De:w===`sql`?`sql`:w===`web`?`html`:`bash`,E=_e[T],D=ye(T),O=x?`ex:${x.id}`:`scratch:${T}`,[k,A]=(0,m.useState)(``),[j,M]=(0,m.useState)(!1),[N,P]=(0,m.useState)(``),[F,I]=(0,m.useState)(null),[L,R]=(0,m.useState)(null),[z,B]=(0,m.useState)(null),[V,ke]=(0,m.useState)({cpp:we,python:``}),[H,U]=(0,m.useState)(`console`),[Ae,je]=(0,m.useState)(!1),[W,G]=(0,m.useState)(null),[K,q]=(0,m.useState)([]),[Me,Ne]=(0,m.useState)(()=>u()),[Pe,Fe]=(0,m.useState)(0),J=(0,m.useRef)(null),Y=!!x&&((x.tests?.length??0)>0||T===`cpp`&&!!x.solution),Ie=T===`cpp`||T===`python`;(0,m.useEffect)(()=>{let e=t.code[O]??x?.starter??v[T]??``;A(e),I(null),R(null),B(null),q([]),G(T===`html`?e:null),U(Y?`tests`:w===`sql`?`results`:w===`web`?`preview`:`console`)},[O]),(0,m.useEffect)(()=>{T===`python`&&!d.isBooted&&d.preload(P),T===`typescript`&&se.preload()},[T]);let Le=(0,m.useMemo)(()=>he(T),[T]),Re=(0,m.useCallback)(e=>{A(e),J.current&&clearTimeout(J.current),J.current=setTimeout(()=>a(t=>o(t,O,e)),700)},[O,a]),X=(0,m.useCallback)(async()=>{if(j)return;if(T===`html`){q([]),G(k+(W===k?` `:``)),U(`preview`);return}M(!0),I(null),R(null),B(null);let e=V[T]??``;try{if(T===`javascript`)I(await oe(k));else if(T===`typescript`)I(await ve(k,{onStatus:P}));else if(T===`python`){let t=x?.tests??[],n=t.length?fe(k,t):k,r=e?e.replace(/\n$/,``).split(`
`):void 0,i=await d.run(n,{onStatus:P,...r?{stdin:r}:{}});if(t.length){let e=le(i.stdout,t);I({...i,stdout:e.userOutput}),B(e.outcomes.map(e=>({name:e.name,status:e.status===`pass`?`pass`:`fail`,...e.message?{detail:e.message}:{}})))}else I(i)}else if(T===`cpp`){if(x?.solution){let t=await pe(k,x.solution,e);I(t.yours),B([{name:`Matches the reference solution`,status:t.pass?`pass`:`fail`,input:e.trim()||`(no input)`,...t.reference?{expected:t.reference.stdout.trimEnd()}:{},actual:t.yours.error?t.yours.error:t.yours.stdout.trimEnd(),...t.pass?{}:{detail:t.detail}}])}else I(await ge(k,{stdin:e,onStatus:P}))}else if(T===`sql`){let e=x?.starter?.includes(`CREATE TABLE`)?void 0:y;R(await ue(k,e))}U(x&&Y?`tests`:T===`sql`?`results`:`console`)}finally{M(!1),P(``)}},[k,x,Y,T,W,j,V]),Z=()=>{if(w===`terminal`){Ne(u()),Fe(e=>e+1);return}let e=x?.starter??v[T]??``;A(e),a(t=>o(t,O,e)),I(null),R(null),B(null),T===`html`&&G(e)},ze=e=>{x&&s(`/playground`),Ee(e)},Be=z?z.every(e=>e.status===`pass`)?`pass`:`fail`:void 0,Ve=!!(F?.error||L?.error),Q=w===`sql`?[...Y?[{id:`tests`,label:`Test cases`,mark:Be}]:[],{id:`results`,label:`Results`},{id:`console`,label:`Console`,...Ve?{mark:`fail`}:{}},...x?[]:[{id:`schema`,label:`Tables`}]]:[...Y?[{id:`tests`,label:`Test cases`,mark:Be}]:[],{id:`console`,label:`Console`,...Ve?{mark:`fail`}:{}},...Ie?[{id:`input`,label:`Input`}]:[]],$=(0,h.jsx)(ie,{onClick:()=>void X(),running:j,status:N,label:Y?`Run tests`:`Run Code`}),He=Ce.map(e=>({value:e,label:`${g[e]} · ${_e[e].label}`}));return(0,h.jsxs)(`div`,{className:`page page--padtop ide-wrap pgx`,children:[(0,h.jsxs)(`div`,{className:`page-head`,children:[(0,h.jsxs)(`div`,{style:{minWidth:0},children:[(0,h.jsx)(`div`,{className:`page-head__kicker`,children:x?b.module.title:`Playground`}),(0,h.jsx)(`h1`,{className:`h-page`,children:x?x.title:`Code playground`}),(0,h.jsx)(`p`,{className:`page-head__sub`,children:x?`Your work is saved to this device as you type.`:`Write code and run it right here: every language executes in your browser, with nothing sent anywhere.`})]}),x?(0,h.jsx)(ee,{variant:`ghost`,size:`md`,onClick:()=>s(`/module/${b.module.id}`),children:`Back to module`}):null]}),(0,h.jsx)(ce,{value:w,onChange:ze}),!x&&D?(0,h.jsxs)(`a`,{className:`pgx-learn`,href:`#/learn/${D.lesson.id}`,children:[(0,h.jsx)(ne,{size:15}),(0,h.jsx)(`span`,{className:`grow`,children:D.done===0?`New to ${E.label}? Learn the basics lesson by lesson, right here.`:D.done===D.total?`All ${D.total} ${E.label} lessons passed.`:`${D.done} of ${D.total} ${E.label} lessons passed · Next: ${D.lesson.title}`}),(0,h.jsxs)(`span`,{className:`pgx-learn__go`,children:[D.done===0?`Start learning`:D.done===D.total?`Review`:`Continue`,(0,h.jsx)(te,{size:13})]})]}):null,x?(0,h.jsx)(`div`,{className:`pgx-brief`,children:(0,h.jsx)(c,{children:x.prompt})}):null,w===`terminal`?(0,h.jsx)(p,{lang:`bash`,file:g.bash,right:(0,h.jsxs)(`button`,{type:`button`,className:`ide__tool`,onClick:Z,children:[(0,h.jsx)(r,{size:13}),`Reset`]}),children:(0,h.jsx)(Se,{shell:Me,onShell:Ne,height:460},Pe)}):w===`web`?(0,h.jsxs)(`div`,{className:`pgx-web`,children:[(0,h.jsx)(p,{lang:`html`,file:g.html,right:(0,h.jsxs)(`button`,{type:`button`,className:`ide__tool`,onClick:Z,children:[(0,h.jsx)(r,{size:13}),`Reset`]}),children:(0,h.jsx)(me,{run:$,children:(0,h.jsx)(l,{ide:!0,value:k,onChange:Re,lang:`html`,minHeight:440,onRun:()=>void X(),placeholder:`Write HTML, CSS and JavaScript here…`})})}),(0,h.jsx)(p,{lang:`html`,file:`Preview`,className:`pgx-web__out`,children:(0,h.jsxs)(de,{tabs:[{id:`preview`,label:`Preview`},{id:`console`,label:`Console${K.length?` (${K.length})`:``}`,...K.some(e=>e.level===`error`)?{mark:`fail`}:{}}],active:H===`console`?`console`:`preview`,onTab:U,height:1e3,children:[(0,h.jsx)(`div`,{hidden:H===`console`,children:W==null?null:(0,h.jsx)(xe,{html:W,onLog:e=>q(t=>[...t,e]),height:420})}),H===`console`?(0,h.jsx)(f,{empty:`console.log from your page shows here.`,children:K.map((e,t)=>(0,h.jsx)(`span`,{className:e.level===`error`?`ide-console__err`:e.level===`warn`?`ide-console__warn`:void 0,children:`${e.text}\n`},t))}):null]})})]}):(0,h.jsxs)(p,{lang:T,file:g[T]??`main`,...w===`code`&&!x?{choices:He,onChoose:e=>Oe(e)}:{},right:(0,h.jsxs)(h.Fragment,{children:[j&&T===`python`?(0,h.jsxs)(`button`,{type:`button`,className:`ide__tool`,onClick:()=>d.cancel(),children:[(0,h.jsx)(n,{size:13}),`Stop`]}):null,x?.solution?(0,h.jsx)(`button`,{type:`button`,className:`ide__tool`,onClick:()=>je(e=>!e),children:Ae?`Hide solution`:`Solution`}):null,(0,h.jsxs)(`button`,{type:`button`,className:`ide__tool`,onClick:Z,children:[(0,h.jsx)(r,{size:13}),`Reset`]})]}),children:[(0,h.jsx)(me,{run:$,children:(0,h.jsx)(l,{ide:!0,value:k,onChange:Re,lang:T,minHeight:380,onRun:()=>void X(),placeholder:`Write ${E.label} here…`})}),(0,h.jsx)(de,{tabs:Q,active:Q.some(e=>e.id===H)?H:Q[0].id,onTab:U,right:(0,h.jsx)(`span`,{className:`pgx-status`,children:N||(F?`${F.ms} ms`:L?`${L.ms} ms`:`Ctrl+Enter runs`)}),children:H===`tests`&&Y?(0,h.jsx)(ae,{results:z,empty:`Run your code to check it against the tests.`}):H===`input`&&Ie?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(`p`,{className:`ide-hint`,children:[`Standard input: what the program reads`,T===`python`?` with input()`:` from std::cin`,`, one line at a time.`]}),(0,h.jsx)(`textarea`,{className:`ide-stdin`,"aria-label":`Standard input`,value:V[T]??``,onChange:e=>ke(t=>({...t,[T]:e.target.value})),spellCheck:!1})]}):H===`results`&&w===`sql`?L&&!L.error?(0,h.jsx)(be,{tables:L.tables}):(0,h.jsx)(`p`,{className:`ide-empty`,children:L?.error?`The query failed — see the Console tab.`:`Run your query to see the rows it returns.`}):H===`schema`&&w===`sql`?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(`p`,{className:`ide-hint`,children:`Each run starts from a fresh in-memory database with these tables.`}),(0,h.jsx)(`pre`,{className:`tcase__value`,children:y.trim()})]}):w===`sql`?(0,h.jsx)(f,{error:L?.error,note:L&&!L.error?`Ran in ${L.ms} ms.`:void 0,empty:`Errors from your SQL show here.`}):(0,h.jsx)(f,{stdout:F?.stdout,stderr:F?.stderr,error:F?.error,note:F?.result?`→ ${F.result}`:F&&!F.stdout&&!F.stderr&&!F.error&&!F.plots.length?`Ran cleanly with no output.`:void 0,children:F?.plots.map((e,t)=>(0,h.jsx)(`img`,{src:e,alt:`Figure ${t+1}`},t))})})]}),(0,h.jsx)(`p`,{className:`pgx-note`,children:Le.note}),Ae&&x?.solution?(0,h.jsx)(`div`,{className:`pgx-brief`,children:(0,h.jsx)(c,{children:"**Reference solution**\n\n```"+(x.lang??``)+`
`+x.solution+"\n```"})}):null,(0,h.jsx)(`p`,{className:`track-note`,children:`Everything here runs inside this browser tab. Nothing you write is uploaded — which also means each language brings its runtime to you the first time you run it, and your browser then caches it: Python about 7 MB, TypeScript about 9 MB, and the C++ compiler about 105 MB before compression. The Terminal is a practice one; the real terminal work of M1 happens on your own machine.`})]})}function Te(e){if(!e)return null;for(let t of a){let n=t.exercises?.find(t=>t.id===e);if(n)return{exercise:n,module:t}}return null}export{b as Playground};