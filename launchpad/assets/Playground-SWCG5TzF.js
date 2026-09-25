import{r as e,t}from"./react-D6Jy4RLT.js";import{E as n,G as ee,J as te,W as ne,a as r,at as i,d as a,g as o,i as s,r as c,s as l,st as u,tt as d,v as f,w as p}from"./ui-BG3tcG8E.js";import{x as m}from"./curriculum-rLod3J6P.js";import{S as h}from"./engine-BhleXMOO.js";import{_ as re,g}from"./index-BGsEkQdP.js";import{t as _}from"./markdown-Przl-lmY.js";/* empty css              */import{a as ie,c as ae,d as oe,f as se,i as ce,l as le,n as v,o as y,p as b,r as ue,s as de,t as x,u as S,useNextLesson as C}from"./Learn-DeVMU1DO.js";var w=e(),T=t(),E={typescript:`// M3: a discriminated union, and the compiler holding you to every case.
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
`,text:``},D=`ada 1200
lin 15000
ada 5400
sam 300
ada 800
`,fe=`
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
`;function O(){let e=re(),{state:t,setState:m}=o(),O=(0,w.useMemo)(()=>he(e.query.ex),[e.query.ex]),[A,j]=(0,w.useState)(O?.exercise.lang??(v.includes(e.query.lang)?e.query.lang:`javascript`)),M=C(A),[N,P]=(0,w.useState)(``),[F,I]=(0,w.useState)(!1),[L,R]=(0,w.useState)(``),[z,B]=(0,w.useState)(null),[V,H]=(0,w.useState)(null),[U,W]=(0,w.useState)(null),[G,ge]=(0,w.useState)(D),[K,_e]=(0,w.useState)(!1),q=(0,w.useRef)(null),J=O?.exercise,Y=x[A],X=J?`ex:${J.id}`:`scratch:${A}`;(0,w.useEffect)(()=>{let e=t.code[X];if(e!=null){P(e);return}P(J?.starter??E[A]??``)},[X]),(0,w.useEffect)(()=>{A===`python`&&!y.isBooted&&y.preload(R)},[A]),(0,w.useEffect)(()=>{A===`typescript`&&se.preload()},[A]);let Z=(0,w.useMemo)(()=>ce(A),[A]),ve=(0,w.useCallback)(e=>{P(e),q.current&&clearTimeout(q.current),q.current=setTimeout(()=>{m(t=>h(t,X,e))},700)},[X,m]),Q=(0,w.useCallback)(async()=>{I(!0),B(null),H(null),W(null);try{if(A===`javascript`){B(await le(N));return}if(A===`python`){let e=J?.tests??[],t=e.length?ue(N,e):N,n=await y.run(t,{onStatus:R});if(e.length){let t=ie(n.stdout,e);B({...n,stdout:t.userOutput}),W(t.outcomes)}else B(n);return}if(A===`sql`){let e=J?.starter?.includes(`CREATE TABLE`)?void 0:fe;H(await S(N,e));return}if(A===`typescript`){B(await oe(N,{onStatus:R}));return}if(A===`cpp`){if(J?.solution){let e=await de(N,J.solution,G);B(e.yours),W([{name:`Matches the reference solution`,status:e.pass?`pass`:`fail`,message:e.detail}]);return}B(await ae(N,{stdin:G,onStatus:R}));return}}finally{I(!1),R(``)}},[A,N,J,G]),ye=()=>{let e=J?.starter??E[A]??``;P(e),m(t=>h(t,X,e)),B(null),H(null),W(null)},$=U?.every(e=>e.status===`pass`)??!1;return(0,T.jsxs)(`div`,{className:`page page--padtop`,children:[(0,T.jsxs)(`div`,{className:`page-head`,children:[(0,T.jsxs)(`div`,{style:{minWidth:0},children:[(0,T.jsxs)(`div`,{className:`page-head__kicker`,children:[(0,T.jsx)(d,{size:13}),J?O.module.title:`Scratchpad`]}),(0,T.jsx)(`h1`,{className:`h-page`,children:J?J.title:`Code playground`}),(0,T.jsx)(`p`,{className:`page-head__sub`,children:J?`Your work is saved to this device as you type.`:`A place to try things. JavaScript, TypeScript, Python, SQL and C++ all execute for real, in your browser, with nothing sent anywhere.`})]}),J?(0,T.jsx)(c,{variant:`ghost`,size:`md`,onClick:()=>g(`/module/${O.module.id}`),children:`Back to module`}):null]}),J?null:(0,T.jsx)(`div`,{style:{marginBottom:`var(--gap)`},children:(0,T.jsx)(a,{value:A,options:v.map(e=>({value:e,label:x[e].label})),onChange:e=>{j(e),B(null),H(null),W(null)}})}),!J&&M?(0,T.jsxs)(`div`,{className:`pg-learn`,children:[(0,T.jsx)(p,{size:16}),(0,T.jsxs)(`span`,{className:`grow`,children:[(0,T.jsx)(`strong`,{children:`Learn mode`}),` —`,` `,M.done===0?`new to ${Y.label}? Go through the basics lesson by lesson, in this editor, with every step checked.`:M.done===M.total?`you have passed all ${M.total} ${Y.label} lessons.`:`${M.done} of ${M.total} ${Y.label} lessons passed. Next: ${M.lesson.title}.`]}),(0,T.jsxs)(c,{variant:`primary`,size:`sm`,onClick:()=>g(`/learn/${M.lesson.id}`),children:[M.done===0?`Start the basics`:M.done===M.total?`Review`:`Continue`,(0,T.jsx)(f,{size:13})]})]}):null,J?(0,T.jsxs)(s,{index:0,style:{marginBottom:`var(--gap)`},children:[(0,T.jsx)(r,{icon:(0,T.jsx)(d,{size:15}),title:`Brief`,right:(0,T.jsxs)(`div`,{style:{display:`flex`,gap:6},children:[(0,T.jsx)(l,{tone:`blue`,children:Y.label}),(0,T.jsx)(l,{ghost:!0,children:Z.mode})]}),divided:!0}),(0,T.jsx)(`div`,{className:`sect`,children:(0,T.jsx)(_,{children:J.prompt})})]}):null,(0,T.jsxs)(`div`,{className:`pg`,children:[(0,T.jsxs)(s,{index:1,children:[(0,T.jsxs)(`div`,{className:`pg__toolbar`,children:[(0,T.jsxs)(c,{variant:`primary`,size:`sm`,onClick:()=>void Q(),disabled:F,children:[(0,T.jsx)(ee,{size:13}),Z.mode===`execute`?`Run`:`Check`]}),F&&A===`python`?(0,T.jsxs)(c,{variant:`ghost`,size:`sm`,onClick:()=>y.cancel(),children:[(0,T.jsx)(ne,{size:13}),`Stop`]}):null,(0,T.jsxs)(c,{variant:`quiet`,size:`sm`,onClick:ye,children:[(0,T.jsx)(te,{size:13}),`Reset`]}),J?.solution?(0,T.jsx)(c,{variant:`quiet`,size:`sm`,onClick:()=>_e(e=>!e),children:K?`Hide solution`:`Solution`}):null,(0,T.jsxs)(`div`,{className:`pg__status`,children:[F?(0,T.jsx)(`span`,{className:`pg__spinner`}):null,L||(z?`${z.ms} ms`:V?`${V.ms} ms`:`Ctrl+Enter to run`)]})]}),(0,T.jsx)(b,{value:N,onChange:ve,lang:A,minHeight:400,onRun:()=>void Q(),placeholder:`Write ${Y.label} here…`}),(0,T.jsxs)(`div`,{className:`pg__note`,children:[Z.mode===`execute`?(0,T.jsx)(n,{size:11,style:k}):(0,T.jsx)(i,{size:11,style:k}),Z.note]}),A===`cpp`?(0,T.jsxs)(`div`,{className:`pg__stdin`,children:[(0,T.jsx)(`label`,{htmlFor:`pgStdin`,children:`Input — standard input for the program`}),(0,T.jsx)(`textarea`,{id:`pgStdin`,value:G,onChange:e=>ge(e.target.value),spellCheck:!1,rows:5})]}):null]}),(0,T.jsxs)(`div`,{className:`stack`,children:[U?(0,T.jsxs)(s,{index:2,children:[(0,T.jsx)(r,{icon:$?(0,T.jsx)(n,{size:15}):(0,T.jsx)(u,{size:15}),title:$?`All tests passed`:`Tests`,right:(0,T.jsxs)(l,{tone:$?`ok`:`bad`,children:[U.filter(e=>e.status===`pass`).length,`/`,U.length]}),divided:!0}),(0,T.jsx)(`div`,{className:`sect`,children:(0,T.jsx)(`div`,{className:`tests`,children:U.map((e,t)=>(0,T.jsxs)(`div`,{className:`test`,"data-status":e.status,children:[(0,T.jsx)(`span`,{className:`test__icon`,children:e.status===`pass`?(0,T.jsx)(n,{size:13}):(0,T.jsx)(u,{size:13})}),(0,T.jsxs)(`div`,{className:`grow`,children:[(0,T.jsx)(`div`,{className:`test__name`,children:e.name}),e.message?(0,T.jsx)(`div`,{className:`test__msg`,children:e.message}):null]})]},t))})})]}):null,V?(0,T.jsx)(me,{result:V}):null,z?(0,T.jsx)(pe,{out:z,capability:Z}):null,K&&J?.solution?(0,T.jsxs)(s,{index:4,children:[(0,T.jsx)(r,{icon:(0,T.jsx)(n,{size:15}),title:`Reference solution`,divided:!0}),(0,T.jsx)(`div`,{className:`sect`,children:(0,T.jsx)(_,{children:"```"+(J.lang??``)+`
`+J.solution+"\n```"})})]}):null,!z&&!V&&!U?(0,T.jsxs)(s,{index:3,children:[(0,T.jsx)(r,{icon:(0,T.jsx)(d,{size:15}),title:`Output`,divided:!0}),(0,T.jsx)(`div`,{className:`sect`,children:(0,T.jsx)(`div`,{className:`console`})})]}):null]})]}),(0,T.jsx)(`p`,{className:`track-note`,children:`Everything here runs inside this browser tab. Nothing you write is uploaded, and nothing leaves the device — which also means each language brings its runtime to you the first time you run it, and your browser then caches it: Python about 7 MB, TypeScript about 9 MB, and the C++ compiler about 105 MB before compression. The terminal work of M1 is not here on purpose: that happens in a real terminal on your own machine. New to a language? Learn to code walks through its basics here, lesson by lesson.`})]})}function pe({out:e,capability:t}){return t.mode===`execute`?(0,T.jsxs)(s,{index:3,children:[(0,T.jsx)(r,{icon:(0,T.jsx)(d,{size:15}),title:`Output`,right:(0,T.jsxs)(`span`,{className:`eyebrow-dim`,children:[e.ms,` ms`]}),divided:!0}),(0,T.jsxs)(`div`,{className:`sect`,children:[(0,T.jsxs)(`div`,{className:`console`,children:[e.stdout?(0,T.jsx)(`span`,{children:e.stdout}):null,e.stderr?(0,T.jsx)(`span`,{className:`console__err`,children:e.stderr}):null,e.error?(0,T.jsx)(`span`,{className:`console__err`,children:e.error}):null,e.result?(0,T.jsx)(`span`,{className:`console__meta`,children:`→ ${e.result}\n`}):null,!e.stdout&&!e.stderr&&!e.error&&!e.result&&e.plots.length===0?(0,T.jsx)(`span`,{className:`console__meta`,children:`Ran cleanly with no output.`}):null]}),e.plots.map((e,t)=>(0,T.jsx)(`img`,{className:`console__plot`,src:e,alt:`Figure ${t+1}`},t))]})]}):(0,T.jsxs)(s,{index:3,children:[(0,T.jsx)(r,{icon:(0,T.jsx)(i,{size:15}),title:`Not executed`,divided:!0}),(0,T.jsx)(`div`,{className:`sect`,style:{fontSize:12.5,color:`var(--ink-3)`,lineHeight:1.7},children:t.note})]})}function me({result:e}){return(0,T.jsxs)(s,{index:3,children:[(0,T.jsx)(r,{icon:(0,T.jsx)(d,{size:15}),title:`Result`,right:(0,T.jsxs)(`span`,{className:`eyebrow-dim`,children:[e.ms,` ms`]}),divided:!0}),(0,T.jsx)(`div`,{className:`sect`,children:e.error?(0,T.jsx)(`div`,{className:`console`,children:(0,T.jsx)(`span`,{className:`console__err`,children:e.error})}):e.tables.length===0?(0,T.jsx)(`div`,{className:`console`,children:(0,T.jsx)(`span`,{className:`console__meta`,children:`Statement ran and returned no rows. INSERT, UPDATE and CREATE produce no result set — run a SELECT to see the effect.`})}):e.tables.map((t,n)=>(0,T.jsxs)(`div`,{className:`grid`,style:{marginBottom:n<e.tables.length-1?12:0},children:[(0,T.jsxs)(`div`,{className:`grid__caption`,children:[t.rows.length,` row`,t.rows.length===1?``:`s`,` · `,t.columns.length,` column`,t.columns.length===1?``:`s`]}),(0,T.jsxs)(`table`,{children:[(0,T.jsx)(`thead`,{children:(0,T.jsx)(`tr`,{children:t.columns.map(e=>(0,T.jsx)(`th`,{children:e},e))})}),(0,T.jsx)(`tbody`,{children:t.rows.slice(0,200).map((e,t)=>(0,T.jsx)(`tr`,{children:e.map((e,t)=>(0,T.jsx)(`td`,{className:e===null?`null`:void 0,children:e===null?`NULL`:String(e)},t))},t))})]})]},n))})]})}var k={display:`inline`,verticalAlign:`-1px`,marginRight:6};function he(e){if(!e)return null;for(let t of m){let n=t.exercises?.find(t=>t.id===e);if(n)return{exercise:n,module:t}}return null}export{O as Playground};