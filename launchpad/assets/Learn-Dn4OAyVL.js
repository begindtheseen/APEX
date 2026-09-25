import{r as e,t}from"./react-D6Jy4RLT.js";import{E as n,L as r,O as i,X as a,g as o,r as s,t as c,v as l}from"./ui-5JSjpmHC.js";import{g as u}from"./engine-BhleXMOO.js";import{_ as d,g as f}from"./index-QTR4qJgX.js";import{t as p}from"./markdown-ChhZRiFg.js";/* empty css              */import{A as m,D as h,M as g,N as _,S as v,_ as ee,b as y,c as te,d as ne,g as b,i as x,j as S,k as C,l as w,m as T,p as re,r as ie,s as ae,t as oe,v as se,x as ce,y as E}from"./lessonCode-CIep__Ie.js";var D=e(),O=`@@LEARN`,le=/^@@LEARN (\d+) (PASS|FAIL|ERROR)(?: (.*))?$/;function k(e){return e.replace(/\s*\n\s*/g,` `).trim()}function A(e,t){return e.checks.map((e,t)=>({c:e,i:t})).filter(e=>e.c.kind===t)}var ue=`const throws = (f) => { try { f(); return false } catch { return true } }
  const __eq = (a, b) => { if (Object.is(a, b)) return true; if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null || Array.isArray(a) !== Array.isArray(b)) return false; const ka = Object.keys(a), kb = Object.keys(b); return ka.length === kb.length && ka.every((k) => __eq(a[k], b[k])) }
  const __show = (v) => { if (v === undefined) return 'undefined'; if (typeof v === 'function') return '[Function]'; if (typeof v === 'bigint') return v + 'n'; try { const j = JSON.stringify(v); return j === undefined ? String(v) : j } catch { return String(v) } }
  const __err = (e) => (e instanceof Error ? e.name + ': ' + e.message : String(e))
  const __learn = (i, f) => { try { const r = f(); console.log('${O} ' + i + (r ? ' PASS ' : ' FAIL ') + __show(r)) } catch (e) { console.log('${O} ' + i + ' ERROR ' + __err(e)) } }
  const __case = (i, f, w) => { try { const got = f(); console.log('${O} ' + i + (__eq(got, w()) ? ' PASS ' : ' FAIL ') + __show(got)) } catch (e) { console.log('${O} ' + i + ' ERROR ' + __err(e)) } }`,de=ue.replace(`(f) =>`,`(f: () => unknown): boolean =>`).replace(`const __eq = (a, b) =>`,`const __eq = (a: any, b: any): boolean =>`).replace(`const __show = (v) =>`,`const __show = (v: unknown): string =>`).replace(`const __err = (e) =>`,`const __err = (e: unknown): string =>`).replace(`const __learn = (i, f) =>`,`const __learn = (i: number, f: () => unknown): void =>`).replace(`const __case = (i, f, w) =>`,`const __case = (i: number, f: () => unknown, w: () => unknown): void =>`).replace(`.every((k) =>`,`.every((k: string) =>`),fe=`#include <cmath>
#include <iostream>
#include <map>
#include <memory>
#include <sstream>
#include <string>
#include <vector>
template <class T> std::string __learn_show(const T& v);
inline std::string __learn_show(const std::string& v) { std::string o = "\\""; for (char c : v) o += (c == '\\n' ? std::string("\\\\n") : std::string(1, c)); return o + "\\""; }
inline std::string __learn_show(const char* v) { return __learn_show(std::string(v)); }
inline std::string __learn_show(bool v) { return v ? "true" : "false"; }
inline std::string __learn_show(char v) { return std::string("'") + v + "'"; }
template <class T> std::string __learn_show(const std::vector<T>& v) { std::string o = "{"; for (std::size_t i = 0; i < v.size(); ++i) o += (i ? ", " : "") + __learn_show(v[i]); return o + "}"; }
template <class K, class V> std::string __learn_show(const std::map<K, V>& m) { std::string o = "{"; bool first = true; for (const auto& [k, x] : m) { o += (first ? "" : ", ") + std::string("{") + __learn_show(k) + ", " + __learn_show(x) + "}"; first = false; } return o + "}"; }
template <class T> std::string __learn_show(const T& v) { if constexpr (requires(std::ostream& os) { os << v; }) { std::ostringstream o; o << v; return o.str(); } else { return "(a value)"; } }`;function pe(e){let t=A(e,`test`),n=A(e,`case`);switch(e.lang){case`javascript`:case`typescript`:{let r=e.lang===`typescript`,i=r?A(e,`type-error`).map(e=>`  // @ts-expect-error ${me} ${e.i}\n  ;(() => { ${k(e.c.code)} })`):[];if(!t.length&&!n.length)return i.length?`\n;{\n${i.join(`
`)}\n}\n`:``;let a=r?`  // @ts-ignore
`:``,o=[...t.map(e=>({i:e.i,line:`${a}  __learn(${e.i}, () => (${k(e.c.expr)}))`})),...n.map(e=>({i:e.i,line:`${a}  __case(${e.i}, () => (${e.c.call}), () => (${k(e.c.expect)}))`}))].sort((e,t)=>e.i-t.i).map(e=>e.line);return`\n;{\n  ${r?de:ue}\n${o.join(`
`)}\n${i.join(`
`)}\n}\n`}case`python`:{if(!t.length&&!n.length)return``;let e=[...t.map(e=>({i:e.i,line:`__learn_test(${e.i}, lambda: (${k(e.c.expr)}))`})),...n.map(e=>({i:e.i,line:`__learn_case(${e.i}, lambda: (${e.c.call}), lambda: (${k(e.c.expect)}))`}))].sort((e,t)=>e.i-t.i).map(e=>e.line);return[``,``,`def raises(exc, fn):`,`    try:`,`        fn()`,`    except exc:`,`        return True`,`    return False`,``,`def __learn_same(a, b):`,`    if isinstance(b, bool) or b is None:`,`        return a is b`,`    return type(a) is not bool and a == b`,``,`def __learn_test(i, f):`,`    try:`,`        r = f()`,`        print("${O} %d %s %r" % (i, "PASS" if r else "FAIL", r))`,`    except Exception as e:`,`        print("${O} %d ERROR %s: %s" % (i, type(e).__name__, e))`,``,`def __learn_case(i, f, w):`,`    try:`,`        got = f()`,`        print("${O} %d %s %r" % (i, "PASS" if __learn_same(got, w()) else "FAIL", got))`,`    except Exception as e:`,`        print("${O} %d ERROR %s: %s" % (i, type(e).__name__, e))`,``,...e,``].join(`
`)}case`cpp`:return!t.length&&!n.length?``:`\n${fe}\nint main() {\n${[...t.map(e=>({i:e.i,line:`    { bool __r = (${k(e.c.expr)}); std::cout << "${O} ${e.i} " << (__r ? "PASS " : "FAIL ") << __learn_show(__r) << std::endl; }`})),...n.map(e=>({i:e.i,line:`    { auto __v = (${e.c.call}); bool __ok = (__v == (${k(e.c.expect)})); std::cout << "${O} ${e.i} " << (__ok ? "PASS " : "FAIL ") << __learn_show(__v) << std::endl; }`}))].sort((e,t)=>e.i-t.i).map(e=>e.line).join(`
`)}\n    return 0;\n}\n`;case`sql`:return`\n;\nSELECT '${O}' AS __learn;\n${A(e,`query`).map(e=>`SELECT '${O} ${e.i}' AS __learn;\n${e.c.sql.replace(/;\s*$/,``)};`).join(`
`)}\n`;case`html`:case`bash`:case`git`:return``}}var me=`learn-type-check`;function he(e,t){if(!t)return null;let n=[...t.matchAll(/main\.ts\((\d+),\d+\): error (TS\d+)/g)];if(!n.length)return null;let r=e.split(`
`),i=[],a=new Set;for(let[,e,t]of n){let n=Number(e)-1,o=RegExp(`// @ts-expect-error ${me} (\\d+)`).exec(r[n]??``);if(t!==`TS2578`||!o)return null;i.push(Number(o[1])),a.add(n)}return{fails:i,program:r.map((e,t)=>a.has(t)?``:e).join(`
`)}}function ge(e,t){let n=pe(e);return n?t.endsWith(`
`)?t+n.replace(/^\n/,``):t+n:t}function _e(e){return A(e,`dom`).map(e=>e.c.steps)}function j(e){return e.replace(/\r\n?/g,`
`).split(`
`).map(e=>e.trimEnd()).join(`
`).replace(/^\n+|\n+$/g,``)}function ve(e){let t=new Map,n=[];for(let r of e.replace(/\r\n?/g,`
`).split(`
`)){let e=le.exec(r);e?t.set(Number(e[1]),{status:e[2],...e[3]?{message:e[3]}:{}}):n.push(r)}return{clean:n.join(`
`),marks:t}}function ye(e,t){return typeof e==`number`&&typeof t==`number`?Math.abs(e-t)<=1e-9*Math.max(1,Math.abs(e),Math.abs(t)):e===t}function M(e,t,n){if(e.length!==t.length)return!1;let r=e=>JSON.stringify(e.map(e=>typeof e==`number`?Number(e.toPrecision(12)):e)),i=n?e:[...e].sort((e,t)=>r(e).localeCompare(r(t))),a=n?t:[...t].sort((e,t)=>r(e).localeCompare(r(t)));return i.every((e,t)=>e.length===a[t].length&&e.every((e,n)=>ye(e,a[t][n])))}function N(e){return e.length?e.slice(0,8).map(e=>e.map(e=>e===null?`NULL`:String(e)).join(` | `)).join(`
`)+(e.length>8?`\n… ${e.length-8} more`:``):`(no rows)`}function P(e,t=600){return e.length>t?`${e.slice(0,t)}…`:e}var F=e=>ce(ee,e),I=e=>e.replace(/^\/home\/you/,`~`);function L(e){let t=y();for(let n of e.starter.split(`
`))n.trim()&&(t=v(t,n).state);return{...t,history:[],transcript:[]}}function be(e,t){let n=t.trim().split(/\s+/),[r,i=``]=n,a=n.slice(2).join(` `);switch(r){case`cwd`:return e.cwd===F(i)?null:`you are in ${I(e.cwd)}, not ${I(F(i))}`;case`dir`:{let t=E(e,F(i));return t?.kind===`dir`?null:t?`${i} is a file, not a folder`:`there is no folder ${i}`}case`missing`:return E(e,F(i))?`${i} should not exist any more`:null;case`file`:{let n=E(e,F(i));if(!n)return`there is no file ${i}`;if(n.kind!==`file`)return`${i} is a folder, not a file`;if(!a)return null;let r=/^(==|contains)\s+(.*)$/.exec(a);if(!r)return`the check "${t}" could not be read`;let o=n.content.replace(/\n$/,``);return r[1]===`==`?o===r[2]?null:`${i} contains ${JSON.stringify(o)}, not ${JSON.stringify(r[2])}`:o.includes(r[2])?null:`${i} does not contain ${JSON.stringify(r[2])}`}case`ran`:{let t=n.slice(1).join(` `);return e.history.flatMap(e=>e.split(`&&`).map(e=>e.trim().replace(/\s+/g,` `))).some(e=>e===t||e.startsWith(`${t} `))?null:`you have not run ${t} yet`}case`used`:{let t=n.slice(1).join(` `);return e.history.some(e=>e.includes(t))?null:`you have not used ${t} in a command yet`}case`printed-line`:{let t=n.slice(1).join(` `);return e.transcript.some(e=>e.out.split(`
`).includes(t))?null:`nothing has printed the line ${JSON.stringify(t)} yet`}case`printed`:{let t=n.slice(1).join(` `);return e.transcript.some(e=>e.out.includes(t))?null:`nothing has printed ${JSON.stringify(t)} yet`}case`git`:{let r=se(e,F(i)),[,,a,...o]=n;if(!r)return`${i===`.`?`~/project`:i} is not a git repository yet`;switch(a){case`repo`:return null;case`commits`:{let e=Number(o[1]);return(o[0]===`>=`?r.commits>=e:r.commits===e)?null:`the repository has ${r.commits} commit${r.commits===1?``:`s`}`}case`branch`:return r.branch===o[0]?null:`you are on ${r.branch}, not ${o[0]}`;case`has-branch`:return r.branches.includes(o[0])?null:`there is no branch ${o[0]}`;case`staged`:return r.staged.includes(o[0])?null:`${o[0]} is not staged`;case`untracked`:return r.untracked.includes(o[0])?null:`${o[0]} is not an untracked file`;case`modified`:return r.modified.includes(o[0])?null:`${o[0]} has no unstaged changes`;case`commits-on`:{let e=Number(o[2]),t=r.branchCommits[o[0]];return t===void 0?`there is no branch ${o[0]}`:(o[1]===`>=`?t>=e:t===e)?null:`${o[0]} has ${t} commit${t===1?``:`s`}`}case`merges`:{let e=Number(o[1]);return(o[0]===`>=`?r.merges>=e:r.merges===e)?null:`the history has ${r.merges} merge commit${r.merges===1?``:`s`}`}case`log`:{let e=o.slice(1).join(` `);return r.messages.some(t=>t.includes(e))?null:`no commit message contains ${JSON.stringify(e)}`}case`clean`:return r.staged.length?`still staged: ${r.staged.join(`, `)}`:null;default:return`the check "${t}" could not be read`}}default:return`the check "${t}" could not be read`}}function xe(e,t,n){let{clean:r,marks:i}=ve(n.stdout),a=n.tables??[],o=new Map;if(e.lang===`sql`){let e=a.findIndex(e=>e.columns.length===1&&e.columns[0]===`__learn`&&e.rows[0]?.[0]===`@@LEARN`),t=e>=0?a.slice(e+1):[];for(let e=0;e<t.length;e++){let n=t[e],r=n.columns[0]===`__learn`?/^@@LEARN (\d+)$/.exec(String(n.rows[0]?.[0]??``)):null;if(!r)continue;let i=t[e+1],a=i&&i.columns[0]===`__learn`;o.set(Number(r[1]),i&&!a?i.rows:[])}e>=0&&(a=a.slice(0,e))}let s=new Map(A(e,`dom`).map((e,t)=>[e.i,t])),c=n.error?`Did not run — fix the error shown in the console first.`:null,l=j(r),u=e.checks.map((r,u)=>{let d={name:r.name,...r.hint?{hint:r.hint}:{}},f=(e,t={})=>({...d,status:e?`pass`:`fail`,...t});if(r.kind===`source`)return f(new RegExp(r.pattern,`m`).test(t)!==r.absent);if(r.kind===`shell`){if(!n.shell)return f(!1,{detail:`The terminal has not been used yet.`});let e=r.facts.map(e=>be(n.shell,e)).find(e=>e!==null);return f(!e,{input:r.facts.join(`
`),...e?{actual:e}:{}})}if(r.kind===`dom`){let e=n.dom?.[s.get(u)??-1];return c?f(!1,{input:r.steps.join(`
`),detail:c}):e?f(e.pass,{input:r.steps.join(`
`),...e.detail?{actual:e.detail}:{}}):f(!1,{input:r.steps.join(`
`),detail:`The page did not finish loading, so this was not checked.`})}if(r.kind===`type-error`){if(c)return f(!1,{input:r.code,detail:c});let e=n.typeFails?.includes(u);return f(!e,{input:r.code,expected:`a type error`,actual:e?`it type-checks`:`a type error`,...e?{detail:`The compiler accepts this, so the type still lets it through. Tighten the type until this line is rejected.`}:{}})}if(c){let t=r.kind===`case`?r.call:r.kind===`test`?k(r.expr):r.kind===`query`?r.sql:e.stdin?.trim();return f(!1,{detail:c,...t?{input:t}:{}})}switch(r.kind){case`output`:{let t=j(r.expect);return f(t===l,{input:e.stdin?.trim()||`(no input)`,expected:P(t),actual:P(l)||`(nothing printed)`})}case`includes`:{let e=r.expect.filter(e=>!l.includes(j(e)));return f(!e.length,{expected:r.expect.join(`
`),actual:P(l)||`(nothing printed)`,...e.length?{detail:`Not in the output: ${e.map(e=>`“${e}”`).join(`, `)}`}:{}})}case`test`:case`case`:{let e=i.get(u),t=r.kind===`case`?r.call:k(r.expr),n=r.kind===`case`?r.expect:`true`;return e?e.status===`ERROR`?f(!1,{input:t,expected:n,actual:e.message??`an error`}):f(e.status===`PASS`,{input:t,expected:n,actual:e.message??``}):f(!1,{input:t,expected:n,detail:`This check never ran: the program stopped before it got there.`})}case`result`:{let e=a[a.length-1],t=N(r.rows)+(r.ordered?`
(in this order)`:``);return e?f(M(r.rows,e.rows,r.ordered),{expected:t,actual:N(e.rows)}):f(!1,{expected:t,actual:`(no rows)`,detail:`Your SQL did not return any rows. The last statement should be a SELECT.`})}case`query`:{let e=o.get(u);return e?f(M(r.rows,e,!0),{input:r.sql,expected:N(r.rows),actual:N(e)}):f(!1,{input:r.sql,detail:`This check never ran.`})}}});return{passed:u.every(e=>e.status===`pass`),results:u,output:r.replace(/\n+$/,e.lang===`sql`?``:`
`).replace(/^\n$/,``),stderr:n.stderr,error:n.error,tables:a,ms:n.ms}}var Se=`@track bash
@title Terminal
@name Linux and the command line
@blurb The command line every developer lives in: moving around, making, reading and changing files, without a mouse.

=== term-01 | Where am I?
--- teach
The **terminal** is a way to talk to your computer in text. You type a **command**, press Enter, and it answers.

The line before your cursor is the **prompt**: \`~/project $\` means you are in a folder called \`project\` inside your home folder (\`~\`). Two commands you will use every day:

- \`pwd\` — **p**rint **w**orking **d**irectory: the full path of the folder you are in.
- \`ls\` — **l**i**s**t what is in it. Folders show with a \`/\` at the end.

This terminal is a practice one: it lives in the page, so nothing you type can touch your real files.
--- task
Run \`pwd\` to see where you are, then \`ls\` to see what is in this folder.
--- starter
mkdir src
touch README.md
--- solution
pwd
ls
--- hint
Type \`pwd\` and press Enter. Then type \`ls\` and press Enter.
--- check shell | You printed where you are
ran pwd
printed /home/you/project
--- check shell | You listed the folder
ran ls
printed README.md

=== term-02 | Making folders and moving into them
--- teach
\`mkdir name\` **m**a**k**es a **dir**ectory (a folder). \`cd name\` **c**hanges **d**irectory — it moves you into it, and the prompt changes to show where you are.

\`\`\`
~/project $ mkdir notes
~/project $ cd notes
~/project/notes $
\`\`\`

\`cd ..\` goes back up one level, and \`cd\` on its own takes you home.
--- task
Make a folder called \`notes\` and move into it.
--- starter
--- solution
mkdir notes
cd notes
--- hint
First \`mkdir notes\`, then \`cd notes\`.
--- check shell | The notes folder exists
dir notes
--- check shell | You are inside it
cwd notes

=== term-03 | Files: create, write, read
--- teach
\`touch name\` makes an empty file. To put text in a file, \`echo\` it and **redirect** the output with \`>\`:

\`\`\`
echo "Launch at dawn" > plan.txt
\`\`\`

\`echo\` prints its text; \`> plan.txt\` sends that text into the file instead of the screen. Careful: \`>\` **replaces** whatever the file held.

\`cat plan.txt\` prints a file's contents, so you can check what you wrote.
--- task
Create \`hello.txt\` containing exactly \`Hello, terminal!\`, then show it with \`cat\`.
--- starter
--- solution
echo "Hello, terminal!" > hello.txt
cat hello.txt
--- hint
Put the text in quotes: \`echo "Hello, terminal!" > hello.txt\`.
--- hint
Then \`cat hello.txt\`.
--- check shell | hello.txt holds the greeting
file hello.txt == Hello, terminal!
--- check shell | You read it back with cat
ran cat
printed Hello, terminal!

=== term-04 | Paths
--- teach
A **path** says where something is. \`docs/guides\` means "the \`guides\` folder inside \`docs\`, inside where I am now" — a **relative** path. \`..\` means "the folder above", so \`../..\` is two levels up. \`~\` is your home folder, and a path starting with \`/\` is **absolute**: it starts from the very top.

\`mkdir -p\` makes every folder along a path at once, so you do not need one \`mkdir\` per level:

\`\`\`
mkdir -p src/components/buttons
cd src/components
cd ../..
\`\`\`
--- task
With one command, make the folders \`docs/guides\`. Move into \`docs/guides\`, then come back up to \`project\` using \`..\`.
--- starter
--- solution
mkdir -p docs/guides
cd docs/guides
cd ../..
--- hint
\`mkdir -p docs/guides\` makes both folders.
--- hint
From \`docs/guides\`, two levels up is \`cd ../..\`.
--- check shell | docs/guides exists
dir docs/guides
--- check shell | You went into it
ran cd docs/guides
--- check shell | You came back up with ..
used ..
cwd .

=== term-05 | Copying and moving
--- teach
\`cp source destination\` **c**o**p**ies a file. \`mv source destination\` **m**o**v**es it — and because moving a file to a new name in the same folder is renaming, \`mv\` is also how you rename:

\`\`\`
cp report.txt report-backup.txt
mv report.txt final-report.txt
\`\`\`

If the destination is a folder, the file goes inside it with the same name: \`mv notes.txt archive/\`. Copying a whole folder needs \`cp -r\` (**r**ecursive).
--- task
There is a file called \`draft.txt\`. Copy it to \`backup.txt\`, then rename \`draft.txt\` to \`final.txt\`.
--- starter
echo "Our first mission plan" > draft.txt
--- solution
cp draft.txt backup.txt
mv draft.txt final.txt
--- hint
\`cp draft.txt backup.txt\` first; then \`mv draft.txt final.txt\`.
--- check shell | backup.txt is a copy
file backup.txt == Our first mission plan
--- check shell | draft.txt is now final.txt
file final.txt == Our first mission plan
missing draft.txt

=== term-06 | Deleting
--- teach
\`rm file\` **r**e**m**oves a file. There is no bin to get it back from, so read the command before you press Enter.

A folder needs \`rm -r folder\`: \`-r\` removes it and everything inside it. (\`rmdir\` only removes a folder that is already empty.)

\`\`\`
rm old-notes.txt
rm -r build
\`\`\`
--- task
Delete the file \`junk.txt\` and the whole \`old\` folder (it has files inside). Leave \`keep.txt\` alone.
--- starter
touch junk.txt
touch keep.txt
mkdir -p old/logs
echo "stale" > old/logs/app.log
--- solution
rm junk.txt
rm -r old
--- hint
\`rm junk.txt\` for the file, \`rm -r old\` for the folder.
--- check shell | junk.txt is gone
missing junk.txt
--- check shell | old/ and everything in it is gone
missing old
--- check shell | keep.txt is still there
file keep.txt

=== term-07 | Looking inside files
--- teach
Real files can be long, so there are commands that show just part of one:

- \`head -n 3 file\` — the first 3 lines. \`tail -n 3 file\` — the last 3.
- \`wc -l file\` — **w**ord **c**ount; with \`-l\`, how many **l**ines.
- \`grep text file\` — only the lines that contain \`text\`. Add \`-i\` to ignore case, \`-n\` to show line numbers.

\`grep\` is how developers dig through logs: \`grep ERROR server.log\` pulls every error out of thousands of lines.
--- task
\`launch.log\` is the log from a test launch. Count its lines with \`wc -l\`, then use \`grep\` to show only the lines containing \`ERROR\`.
--- starter
echo "09:00 INFO systems check" > launch.log
echo "09:01 INFO fuel loaded" >> launch.log
echo "09:02 ERROR valve 3 stuck" >> launch.log
echo "09:03 INFO valve 3 reset" >> launch.log
echo "09:04 ERROR telemetry dropout" >> launch.log
echo "09:05 INFO liftoff" >> launch.log
--- solution
wc -l launch.log
grep ERROR launch.log
--- hint
\`wc -l launch.log\` counts the lines.
--- hint
\`grep ERROR launch.log\` prints only the error lines.
--- check shell | You counted the lines
ran wc -l
printed 6 launch.log
--- check shell | You found both errors
ran grep
printed 09:02 ERROR valve 3 stuck
printed 09:04 ERROR telemetry dropout

=== term-08 | Chaining and appending
--- teach
\`&&\` joins two commands: the second runs only if the first worked. It is how you write a sequence on one line:

\`\`\`
mkdir build && cd build
\`\`\`

\`>>\` is like \`>\`, but it **adds** to the end of the file instead of replacing it:

\`\`\`
echo "first" > list.txt
echo "second" >> list.txt
\`\`\`
--- task
In a single line, make a folder \`logs\` and move into it using \`&&\`. Then build \`todo.txt\` with two lines, \`buy fuel\` then \`check engines\`, using \`>\` for the first and \`>>\` for the second.
--- starter
--- solution
mkdir logs && cd logs
echo "buy fuel" > todo.txt
echo "check engines" >> todo.txt
--- hint
\`mkdir logs && cd logs\` does both steps.
--- hint
\`echo "buy fuel" > todo.txt\`, then \`echo "check engines" >> todo.txt\`.
--- check shell | You used && to make and enter logs
used &&
dir logs
cwd logs
--- check shell | todo.txt has both lines, in order
file logs/todo.txt contains buy fuel
file logs/todo.txt contains check engines
used >>

=== term-09 | Hidden files, and the long listing
--- teach
A file or folder whose name starts with a dot is **hidden**: plain \`ls\` skips it. Settings live in files like that — \`.env\`, \`.gitignore\`, \`.config\` — so you need to be able to see them.

- \`ls -a\` shows **a**ll of them, hidden ones included (plus \`.\` for this folder and \`..\` for the one above).
- \`ls -l\` is the **l**ong listing: one line per entry, with whether it is a folder (\`d\`) or a file (\`-\`), and its size.

Flags combine: \`ls -la\` is both at once.
--- task
Something in this folder is hidden. Find it with \`ls -a\`, then look at the sizes with \`ls -l\`.
--- starter
echo "API_KEY=demo" > .env
mkdir src
echo "print('hi')" > main.py
--- solution
ls -a
ls -l
--- hint
\`ls -a\` shows the hidden file.
--- hint
\`ls -l\` shows one line per file, starting with \`-rw-r--r--\` for files.
--- check shell | You found the hidden file
printed .env
--- check shell | You used the long listing
printed -rw-r--r--

=== term-10 | Getting home, and back again
--- teach
Deep in a project, three shortcuts save a lot of typing:

- \`cd ~\` (or just \`cd\`) jumps straight to your **home** folder, wherever you are.
- \`cd -\` jumps back to wherever you were **before** the last \`cd\`.
- An **absolute** path works from anywhere: \`cd /home/you/project\`.

Run \`pwd\` whenever you want to be sure where you have landed.
--- task
You are three folders deep, in \`src/app/components\`. Jump to your home folder, check with \`pwd\` that you are there, then come straight back with \`cd -\`.
--- starter
mkdir -p src/app/components
cd src/app/components
--- solution
cd ~
pwd
cd -
--- hint
\`cd ~\` goes home; \`pwd\` then prints \`/home/you\`.
--- hint
\`cd -\` takes you back to \`src/app/components\` in one step.
--- check shell | You checked that you were home
printed-line /home/you
--- check shell | You came back with cd -
ran cd -
cwd src/app/components
`,Ce=`@track cpp
@title C++
@name C++, close to the machine
@blurb Compiled for real by clang++ in your browser: from main() and std::cout to vectors, strings, references, classes and pointers.

=== cpp-01 | Hello, main()
--- teach
Every C++ program starts in a function called \`main\`. The compiler turns your source into a program; when it runs, \`main\` runs.

\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Launch in T-minus 10\\n";
    return 0;
}
\`\`\`

- \`#include <iostream>\` brings in the standard input/output library.
- \`std::cout << …\` sends text to the output; \`\\n\` ends the line. You can chain: \`std::cout << "a" << 42 << "\\n";\`
- Every statement ends with \`;\`. Blocks go in \`{ }\`.
- \`return 0;\` tells whoever ran the program that it succeeded.

Unlike Python or JavaScript, nothing runs until the whole file compiles. A missing \`;\` means no program at all — read the compiler's first error, it points at the line.
--- task
Write a complete program that prints exactly:

\`\`\`
Hello, world!
C++ is compiled and running in your browser.
\`\`\`
--- starter
#include <iostream>

int main() {
    // Print the two lines here.
    return 0;
}
--- solution
#include <iostream>

int main() {
    std::cout << "Hello, world!\\n";
    std::cout << "C++ is compiled and running in your browser.\\n";
    return 0;
}
--- hint
\`std::cout << "Hello, world!\\n";\` — and a second line like it.
--- check output | Prints both lines, exactly
Hello, world!
C++ is compiled and running in your browser.

=== cpp-02 | Variables and types
--- teach
C++ is **statically typed**: every variable has a type, fixed when it is declared.

\`\`\`cpp
int count = 3;               // whole number
double price = 4.99;         // decimal
bool ready = true;
char grade = 'A';            // one character, single quotes
std::string name = "Ada";    // needs #include <string>
auto total = count * price;  // auto: let the compiler work out the type (double)
\`\`\`

\`const\` marks a value that must not change: \`const double pi = 3.14159;\`. Assigning to it is a compile error — the compiler catches the mistake before the program exists.
--- task
In \`main\`, declare \`const std::string city = "Houston";\`, an \`int population\` of \`2300000\`, and a \`double area_km2\` of \`1651.1\`. Print them as:

\`\`\`
Houston: 2300000 people, 1651.1 km2
\`\`\`
--- starter
#include <iostream>
#include <string>

int main() {
    return 0;
}
--- solution
#include <iostream>
#include <string>

int main() {
    const std::string city = "Houston";
    int population = 2300000;
    double area_km2 = 1651.1;
    std::cout << city << ": " << population << " people, " << area_km2 << " km2\\n";
    return 0;
}
--- hint
Chain everything into one \`std::cout << … << "\\n";\`.
--- check output | Prints the line
Houston: 2300000 people, 1651.1 km2
--- check source | city is a const std::string
const\\s+std::string\\s+city
--- check source | population is an int
\\bint\\s+population\\b

=== cpp-03 | Arithmetic, and integer division
--- teach
From here on, some lessons ask for **functions** rather than a whole program. You write the function; the checker supplies \`main()\` and calls it — so do **not** write a \`main\` in those lessons.

\`\`\`cpp
int add(int a, int b) {
    return a + b;
}
\`\`\`

The return type comes first, then the name, then typed parameters.

Arithmetic has one trap everyone meets: dividing two \`int\`s gives an \`int\`, throwing the remainder away.

\`\`\`cpp
7 / 2                        // 3
7 % 2                        // 1  (the remainder)
7.0 / 2                      // 3.5
static_cast<double>(7) / 2   // 3.5 — convert first, then divide
\`\`\`
--- task
Write \`double average(int total, int count)\` that returns the exact average (so \`average(7, 2)\` is \`3.5\`), and \`int remainder_of(int a, int b)\` returning the remainder of \`a / b\`. No \`main\` — the checker has it.
--- starter
// No main() in this lesson: the checker supplies it and calls your functions.

double average(int total, int count) {
    return total / count;
}

int remainder_of(int a, int b) {
    return 0;
}
--- solution
// No main() in this lesson: the checker supplies it and calls your functions.

double average(int total, int count) {
    return static_cast<double>(total) / count;
}

int remainder_of(int a, int b) {
    return a % b;
}
--- hint
\`total / count\` divides two ints. Convert one first: \`static_cast<double>(total) / count\`.
--- check case | average(7, 2) is 3.5
average(7, 2)
=> 3.5
--- check case | average(10, 4) is 2.5
average(10, 4)
=> 2.5
--- check case | remainder_of(17, 5) is 2
remainder_of(17, 5)
=> 2

=== cpp-04 | Reading input
--- teach
\`std::cin >> variable\` reads the next value from standard input — whatever is in the **Input** box under the editor — skipping spaces and newlines, and converting to the variable's type:

\`\`\`cpp
int a, b;
std::cin >> a >> b;
std::cout << a + b << "\\n";
\`\`\`

Used as a condition, \`std::cin >> x\` is true while it managed to read something, so this reads every number until the input runs out:

\`\`\`cpp
int n;
while (std::cin >> n) {
    // use n
}
\`\`\`

\`std::getline(std::cin, line)\` reads a whole line into a \`std::string\` instead.
--- task
The input is a list of whole numbers. Read them all and print how many there were, their sum, and the largest, as:

\`\`\`
count 5, sum 30, max 11
\`\`\`
--- stdin
4 8 11
2 5
--- starter
#include <iostream>

int main() {
    int n;
    return 0;
}
--- solution
#include <iostream>

int main() {
    int n;
    int count = 0;
    int sum = 0;
    int max = 0;
    while (std::cin >> n) {
        if (count == 0 || n > max) max = n;
        count++;
        sum += n;
    }
    std::cout << "count " << count << ", sum " << sum << ", max " << max << "\\n";
    return 0;
}
--- hint
\`while (std::cin >> n) { … }\` runs once per number.
--- hint
Start \`max\` from the first number rather than from 0, or negative inputs would break it.
--- check output | Prints count, sum and max for the input
count 5, sum 30, max 11
--- check source | Reads with std::cin
std::cin\\s*>>

=== cpp-05 | Making decisions
--- teach
\`if\` runs a block when a condition is true:

\`\`\`cpp
if (temperature > 30) {
    std::cout << "hot\\n";
} else if (temperature > 15) {
    std::cout << "mild\\n";
} else {
    std::cout << "cold\\n";
}
\`\`\`

Compare with \`==\`, \`!=\`, \`<\`, \`<=\`, \`>\`, \`>=\`; combine with \`&&\` (and), \`||\` (or), \`!\` (not). Watch for \`=\` (assign) where you meant \`==\` (compare) — clang warns about it, which is one reason to read warnings.
--- task
Write \`std::string grade(int score)\` returning \`"pass"\` for 70 or more, \`"close"\` for 60 to 69, and \`"fail"\` otherwise. (No \`main\`.)
--- starter
#include <string>

std::string grade(int score) {
    return "";
}
--- solution
#include <string>

std::string grade(int score) {
    if (score >= 70) {
        return "pass";
    } else if (score >= 60) {
        return "close";
    }
    return "fail";
}
--- hint
Test the highest band first: \`if (score >= 70) return "pass";\`
--- check case | 85 passes
grade(85)
=> "pass"
--- check case | 70 passes (the boundary)
grade(70)
=> "pass"
--- check case | 64 is close
grade(64)
=> "close"
--- check case | 12 fails
grade(12)
=> "fail"

=== cpp-06 | Loops
--- teach
The counting \`for\` loop has three parts — start; keep going while; step:

\`\`\`cpp
for (int i = 1; i <= 5; i++) {
    std::cout << i << "\\n";
}
\`\`\`

\`while (condition) { … }\` repeats while the condition is true. \`break\` leaves a loop early; \`continue\` skips to the next pass.
--- task
Write a program that prints the numbers 1 to 15, one per line, printing \`Fizz\` for multiples of 3, \`Buzz\` for multiples of 5, and \`FizzBuzz\` for multiples of both.
--- starter
#include <iostream>

int main() {
    return 0;
}
--- solution
#include <iostream>

int main() {
    for (int n = 1; n <= 15; n++) {
        if (n % 15 == 0) {
            std::cout << "FizzBuzz\\n";
        } else if (n % 3 == 0) {
            std::cout << "Fizz\\n";
        } else if (n % 5 == 0) {
            std::cout << "Buzz\\n";
        } else {
            std::cout << n << "\\n";
        }
    }
    return 0;
}
--- hint
\`n % 3 == 0\` means n is a multiple of 3 — check 15 first.
--- check output | Prints FizzBuzz from 1 to 15
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
--- check source | Uses a loop
\\b(for|while)\\b

=== cpp-07 | Functions
--- teach
Functions let you name a piece of work and reuse it. A function must be declared before it is used, and its parameter and return types are part of what it is:

\`\`\`cpp
bool is_positive(int n) {
    return n > 0;
}

long long square(long long x) {
    return x * x;
}
\`\`\`

\`void\` means it returns nothing. \`int\` holds numbers up to about 2 billion; \`long long\` goes to about 9 × 10¹⁸ — pick it when values can get big. A function can call itself (**recursion**) as long as some case stops it.
--- task
Write \`bool is_even(int n)\` and \`long long factorial(int n)\` (the product 1 × 2 × … × n, with \`factorial(0)\` equal to 1). No \`main\`.
--- starter
bool is_even(int n) {
    return false;
}

long long factorial(int n) {
    return 0;
}
--- solution
bool is_even(int n) {
    return n % 2 == 0;
}

long long factorial(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
--- hint
\`factorial\`: start \`result\` at 1 and multiply by 2, 3, … n in a loop.
--- check test | is_even works both ways
is_even(10) && !is_even(7)
--- check case | factorial(5) is 120
factorial(5)
=> 120
--- check case | factorial(0) is 1
factorial(0)
=> 1
--- check case | factorial(20) fits in a long long
factorial(20)
=> 2432902008176640000LL

=== cpp-08 | std::vector
--- teach
\`std::vector\` is C++'s growable array — the container to reach for first:

\`\`\`cpp
#include <vector>

std::vector<int> v = {3, 9, 2};
v.push_back(7);        // add to the end
v.size();              // 4
v[0];                  // 3
for (int x : v) {      // a range-for loop: each element in turn
    // ...
}
\`\`\`

Pass a vector to a function as \`const std::vector<int>& v\`: the \`&\` means "refer to the caller's vector" instead of copying it, and \`const\` promises not to change it. (More on references in lesson 10.)
--- task
Write \`int max_value(const std::vector<int>& v)\` (assume v is not empty) and \`double mean(const std::vector<int>& v)\`. No \`main\`.
--- starter
#include <vector>

int max_value(const std::vector<int>& v) {
    return 0;
}

double mean(const std::vector<int>& v) {
    return 0;
}
--- solution
#include <vector>

int max_value(const std::vector<int>& v) {
    int best = v[0];
    for (int x : v) {
        if (x > best) best = x;
    }
    return best;
}

double mean(const std::vector<int>& v) {
    long long sum = 0;
    for (int x : v) sum += x;
    return static_cast<double>(sum) / v.size();
}
--- hint
Start \`best\` at \`v[0]\`, then compare every element.
--- hint
For the mean, add up in a loop, then divide as a double.
--- check case | max_value({3, 9, 2}) is 9
max_value({3, 9, 2})
=> 9
--- check case | max_value works with negatives
max_value({-5, -2, -9})
=> -2
--- check test | mean({1, 2, 3, 4}) is 2.5
std::abs(mean({1, 2, 3, 4}) - 2.5) < 1e-9

=== cpp-09 | std::string
--- teach
\`std::string\` holds text and knows its own length:

\`\`\`cpp
#include <string>

std::string s = "Ada Lovelace";
s.size();              // 12
s[0];                  // 'A'   (a char)
s + "!"                // "Ada Lovelace!"
s.find("Love");        // 4 — or std::string::npos if absent
s.substr(4, 4);        // "Love"
for (char c : s) { }   // each character
\`\`\`

\`<cctype>\` has helpers for single characters: \`std::toupper(c)\`, \`std::isspace(c)\`, \`std::isdigit(c)\`.
--- task
Write \`std::string initials(const std::string& name)\` returning the uppercase first letter of each word (\`"ada lovelace"\` → \`"AL"\`; words are separated by spaces), and \`int count_char(const std::string& s, char c)\`. No \`main\`.
--- starter
#include <string>
#include <cctype>

std::string initials(const std::string& name) {
    return "";
}

int count_char(const std::string& s, char c) {
    return 0;
}
--- solution
#include <string>
#include <cctype>

std::string initials(const std::string& name) {
    std::string out;
    bool start = true;
    for (char c : name) {
        if (c == ' ') {
            start = true;
        } else if (start) {
            out += static_cast<char>(std::toupper(static_cast<unsigned char>(c)));
            start = false;
        }
    }
    return out;
}

int count_char(const std::string& s, char c) {
    int n = 0;
    for (char x : s) {
        if (x == c) n++;
    }
    return n;
}
--- hint
Keep a flag "the next letter starts a word": true at the start and after each space.
--- hint
\`out += static_cast<char>(std::toupper(c));\` appends one character.
--- check case | initials("ada lovelace") is "AL"
initials("ada lovelace")
=> "AL"
--- check case | Extra spaces are fine
initials("  grace  brewster hopper")
=> "GBH"
--- check case | count_char counts
count_char("mississippi", 's')
=> 4

=== cpp-10 | References
--- teach
By default C++ passes arguments **by value**: the function gets a copy, and changing it changes nothing outside.

A **reference** (\`&\`) is another name for an existing variable. Pass by reference and the function works on the caller's own variable:

\`\`\`cpp
void add_one(int& n) {
    n = n + 1;
}

int x = 4;
add_one(x);   // x is now 5
\`\`\`

So there are three ways to take an argument:

- \`int n\` — a copy; cheap for small types
- \`const std::vector<int>& v\` — no copy, read-only; the default for big things
- \`std::vector<int>& v\` — no copy, and the function may change it
--- task
Write \`void double_all(std::vector<int>& v)\` that doubles every element **in place**, and \`void swap_values(int& a, int& b)\`. No \`main\`.
--- starter
#include <vector>

void double_all(std::vector<int> v) {
    for (int x : v) {
        x = x * 2;
    }
}

void swap_values(int a, int b) {
}
--- solution
#include <vector>

void double_all(std::vector<int>& v) {
    for (int& x : v) {
        x = x * 2;
    }
}

void swap_values(int& a, int& b) {
    int tmp = a;
    a = b;
    b = tmp;
}
--- hint
Both the parameter and the loop variable need \`&\`: \`std::vector<int>& v\` and \`for (int& x : v)\`.
--- hint
Swapping needs a temporary: \`int tmp = a; a = b; b = tmp;\`
--- check test | double_all changes the caller's vector
[] { std::vector<int> v{1, 2, 3}; double_all(v); return v == std::vector<int>{2, 4, 6}; }()
--- check test | swap_values swaps
[] { int a = 1, b = 2; swap_values(a, b); return a == 2 && b == 1; }()

=== cpp-11 | Structs and classes
--- teach
A \`struct\` groups related values into one type:

\`\`\`cpp
struct Point {
    double x;
    double y;
};

Point p{3.0, 4.0};
p.x;   // 3.0
\`\`\`

A \`class\` is the same thing with its data **private** by default, so only its own member functions can change it. That is how a type keeps its rules:

\`\`\`cpp
class Account {
public:
    explicit Account(int start) : balance_(start) {}
    void deposit(int amount) { balance_ += amount; }
    int balance() const { return balance_; }   // const: does not change the object
private:
    int balance_;
};
\`\`\`

The part after \`:\` in the constructor initialises members before the body runs.
--- task
Write \`struct Point { double x; double y; };\` and \`double distance(Point a, Point b)\` (straight-line distance; \`std::sqrt\` is in \`<cmath>\`). Then write a \`class Counter\` with a constructor taking a starting value, \`void increment()\`, \`void reset()\` (back to 0), and \`int value() const\`. No \`main\`.
--- starter
#include <cmath>

--- solution
#include <cmath>

struct Point {
    double x;
    double y;
};

double distance(Point a, Point b) {
    double dx = a.x - b.x;
    double dy = a.y - b.y;
    return std::sqrt(dx * dx + dy * dy);
}

class Counter {
public:
    explicit Counter(int start) : value_(start) {}
    void increment() { value_++; }
    void reset() { value_ = 0; }
    int value() const { return value_; }
private:
    int value_;
};
--- hint
Distance: \`std::sqrt(dx * dx + dy * dy)\`.
--- hint
Keep the count in a private member, e.g. \`int value_;\`, set by the constructor.
--- check test | distance of a 3-4-5 triangle is 5
std::abs(distance(Point{0, 0}, Point{3, 4}) - 5.0) < 1e-9
--- check case | Counter starts where it is told
Counter(5).value()
=> 5
--- check test | increment and reset
[] { Counter c(1); c.increment(); c.increment(); bool three = c.value() == 3; c.reset(); return three && c.value() == 0; }()

=== cpp-12 | std::map
--- teach
\`std::map\` stores **key → value** pairs, kept sorted by key:

\`\`\`cpp
#include <map>
#include <string>

std::map<std::string, int> stock;
stock["apples"] = 5;
stock["pears"] += 2;          // a missing key starts at 0, then += 2
stock.count("kiwis");         // 0 — does the key exist?
for (const auto& [name, qty] : stock) {
    // name, qty — in key order
}
\`\`\`

Reading \`m[key]\` inserts the key if it is missing; use \`m.find(key)\` or \`m.count(key)\` when you only want to look.
--- task
Write \`std::map<std::string, int> count_words(const std::string& text)\` that counts how many times each space-separated word appears. (Reading words out of a string: \`std::istringstream in(text); std::string w; while (in >> w) { … }\` — it needs \`<sstream>\`.) No \`main\`.
--- starter
#include <map>
#include <string>
#include <sstream>

std::map<std::string, int> count_words(const std::string& text) {
    std::map<std::string, int> counts;
    return counts;
}
--- solution
#include <map>
#include <string>
#include <sstream>

std::map<std::string, int> count_words(const std::string& text) {
    std::map<std::string, int> counts;
    std::istringstream in(text);
    std::string word;
    while (in >> word) {
        counts[word]++;
    }
    return counts;
}
--- hint
\`counts[word]++\` works even the first time: a missing entry starts at 0.
--- check case | Counts repeated words
count_words("to be or not to be")
=> std::map<std::string, int>{{"be", 2}, {"not", 1}, {"or", 1}, {"to", 2}}
--- check test | An empty string gives an empty map
count_words("").empty()

=== cpp-13 | Pointers and ownership
--- teach
A **pointer** holds the address of a value. \`&x\` takes the address of \`x\`; \`*p\` follows a pointer to the value:

\`\`\`cpp
int x = 10;
int* p = &x;     // p points at x
*p = 20;         // x is now 20
int* none = nullptr;   // points at nothing — never follow it
\`\`\`

Pointers are how C++ reaches memory that outlives a function. Memory you allocate must be given back exactly once, so modern C++ does not use raw \`new\` and \`delete\` for that: a **smart pointer** owns the object and frees it automatically.

\`\`\`cpp
#include <memory>
auto p = std::make_unique<int>(42);   // p owns an int
*p += 1;                              // 43
// freed automatically when p goes out of scope
\`\`\`

Rule of thumb: raw pointers to *look at* things, \`std::unique_ptr\` to *own* them.
--- task
Write \`void set_to_zero(int* p)\` that sets the value \`p\` points at to zero — and does nothing if \`p\` is \`nullptr\`. Then write \`std::unique_ptr<int> make_counter(int start)\` that returns a newly owned int holding \`start\`. No \`main\`.
--- starter
#include <memory>

void set_to_zero(int* p) {
}

--- solution
#include <memory>

void set_to_zero(int* p) {
    if (p != nullptr) {
        *p = 0;
    }
}

std::unique_ptr<int> make_counter(int start) {
    return std::make_unique<int>(start);
}
--- hint
Check \`if (p != nullptr)\` before \`*p = 0;\`.
--- hint
\`return std::make_unique<int>(start);\`
--- check test | set_to_zero changes the value it points at
[] { int x = 7; set_to_zero(&x); return x == 0; }()
--- check test | set_to_zero(nullptr) is safe
[] { set_to_zero(nullptr); return true; }()
--- check test | make_counter owns a new int
[] { auto p = make_counter(41); *p += 1; return *p == 42; }()
--- check source absent | Does not use raw new
\\bnew\\s+int\\b
`,we=`@track git
@title Git
@name Git and version control
@blurb Save every version of your work, see exactly what changed, undo mistakes, and build on branches that merge back together.

=== git-01 | Starting a repository
--- teach
**git** keeps the history of a project: every version you saved, what changed in it and why. Every team you will work on uses it.

It works on a **repository** (a "repo"): a folder git is watching. \`git init\` turns the folder you are in into one. Git keeps its records in a hidden folder called \`.git\` — hidden because its name starts with a dot, so plain \`ls\` does not show it but \`ls -a\` does.

You never edit \`.git\` yourself; git commands do that.
--- task
Turn \`project\` into a git repository, then use \`ls -a\` to see the hidden \`.git\` folder git made.
--- starter
echo "# Rocket" > README.md
--- solution
git init
ls -a
--- hint
\`git init\` first.
--- hint
Then \`ls -a\` — the \`.git/\` folder is in the list.
--- check shell | project is a git repository
git . repo
--- check shell | You found the .git folder
printed .git

=== git-02 | Asking git what it sees
--- teach
\`git status\` is the command you will run more than any other. It tells you, for every file git can see, which of three states it is in:

- **Untracked** — a new file git has never saved.
- **Modified** — a saved file you have changed since.
- **Staged** — a change you have chosen to include in the next save.

Run it whenever you are unsure what is going on. It only reads; it never changes anything.
--- task
Run \`git status\` and read the list of untracked files. Then create a file called \`notes.txt\` (any way you like) and run \`git status\` again: it joins the list.
--- starter
git init
echo "# Rocket" > README.md
echo "print('liftoff')" > main.py
--- solution
git status
touch notes.txt
git status
--- hint
\`git status\`, then \`touch notes.txt\`, then \`git status\` again.
--- check shell | notes.txt exists and git sees it as untracked
file notes.txt
git . untracked notes.txt
--- check shell | Git showed you notes.txt in its status
ran git status
printed notes.txt

=== git-03 | Staging: choosing what to save
--- teach
Saving in git is two steps, and the first is choosing. \`git add <file>\` **stages** a file: it goes in the box of changes the next save will include. Files you do not add are left out.

\`\`\`
git add README.md     # just this file
git add .             # everything in this folder
\`\`\`

After adding, \`git status\` lists the file under **Changes to be committed**. Choosing lets you save related changes together, even when you have been working on several things.
--- task
Stage \`README.md\` only — leave \`main.py\` untracked — then check with \`git status\`.
--- starter
git init
echo "# Rocket" > README.md
echo "print('liftoff')" > main.py
--- solution
git add README.md
git status
--- hint
\`git add README.md\` stages just that file.
--- check shell | README.md is staged
git . staged README.md
--- check shell | main.py is left out
git . untracked main.py
--- check shell | You checked with git status
ran git status
printed Changes to be committed

=== git-04 | Your first commit
--- teach
The second step is \`git commit\`, which saves everything staged as a **commit**: a snapshot of the project, with a message saying what changed.

\`\`\`
git commit -m "Add the launch checklist"
\`\`\`

\`-m\` gives the message. A good one finishes the sentence *"This commit will…"*: **Add the launch checklist**, **Fix the fuel calculation**. \`git log --oneline\` then lists your commits, newest first, each with a short id.
--- task
Stage both files and commit them with a message. Then look at the history with \`git log --oneline\`.
--- starter
git init
echo "# Rocket" > README.md
echo "print('liftoff')" > main.py
--- solution
git add .
git commit -m "Add README and main program"
git log --oneline
--- hint
\`git add .\` stages everything.
--- hint
\`git commit -m "Add the first files"\` — the quotes keep the message together.
--- check shell | There is one commit
git . commits == 1
--- check shell | Nothing is left waiting to be committed
git . clean
--- check shell | You looked at the history
ran git log

=== git-05 | Seeing what changed: diff
--- teach
Before you save a change, look at it. \`git diff\` shows every line that differs from the last commit:

\`\`\`
diff --git a/main.py b/main.py
 print('liftoff')
+print('stage two')
\`\`\`

Lines starting with \`+\` were added, \`-\` removed, and a space means unchanged. \`git diff --staged\` does the same for changes you have already added. Reading your own diff before committing is how you catch the debugging line you forgot to delete.
--- task
Add the line \`print('stage two')\` to the end of \`main.py\` (use \`>>\`), then run \`git diff\` to see the change.
--- starter
git init
echo "print('liftoff')" > main.py
git add .
git commit -m "Add main"
--- solution
echo "print('stage two')" >> main.py
git diff
--- hint
\`echo "print('stage two')" >> main.py\` adds the line; \`>\` would replace the file.
--- hint
Then \`git diff\`.
--- check shell | main.py has a new, unsaved line
file main.py contains stage two
git . modified main.py
--- check shell | git diff showed it as added
ran git diff
printed +print('stage two')

=== git-06 | Committing a change
--- teach
A file git already tracks goes through the same two steps every time you change it: \`git add\`, then \`git commit\`. Git then has both versions, and the history grows by one.

Commit small and often: one commit per idea — *Add stage two*, then *Fix the timer* — rather than one enormous commit at the end of the day. Small commits are easy to read, review and undo.
--- task
\`main.py\` has a change that is not saved yet. Commit it with a message that starts with a verb (like \`Add stage two\`), then check \`git log --oneline\` shows two commits.
--- starter
git init
echo "print('liftoff')" > main.py
git add .
git commit -m "Add main"
echo "print('stage two')" >> main.py
--- solution
git add main.py
git commit -m "Add stage two"
git log --oneline
--- hint
\`git add main.py\`, then \`git commit -m "Add stage two"\`.
--- check shell | The history has two commits
git . commits == 2
git . clean
--- check shell | You looked at the history
ran git log

=== git-07 | Undoing a change: restore
--- teach
Changed a file and wish you had not? \`git restore <file>\` puts it back exactly as it was in the last commit.

\`\`\`
git restore config.txt           # throw away changes to the file
git restore --staged config.txt  # un-stage it, but keep the changes
\`\`\`

Careful: restoring throws your changes away for good — they were never saved, so git has no copy. This is why committing often is a safety net.
--- task
\`config.txt\` was overwritten by mistake. Use git to put it back to the last committed version.
--- starter
git init
echo "thrust = 100" > config.txt
git add .
git commit -m "Add config"
echo "oops" > config.txt
--- solution
git restore config.txt
--- hint
\`git diff\` shows what happened; \`git restore config.txt\` undoes it.
--- check shell | config.txt is back to the committed version
file config.txt == thrust = 100
--- check shell | Git did the undoing
ran git restore

=== git-08 | Branches
--- teach
A **branch** is a separate line of work. You make one to build something without disturbing \`main\`, and merge it back when it is ready. Teams work this way so that \`main\` always works.

\`\`\`
git switch -c feature     # make a branch called feature and move onto it
git branch                # list branches; * marks the one you are on
\`\`\`

\`git checkout -b feature\` is the older spelling of \`git switch -c feature\` — you will see both.
--- task
Make a branch called \`feature\` and switch to it. Then list the branches with \`git branch\`.
--- starter
git init
echo "# Rocket" > README.md
git add .
git commit -m "Start the project"
--- solution
git switch -c feature
git branch
--- hint
\`git switch -c feature\` makes it and moves you onto it.
--- check shell | You are on feature
git . branch feature
git . has-branch main
--- check shell | The branch list shows you on it
printed * feature

=== git-09 | Working on a branch
--- teach
Commits you make on a branch stay on that branch. Switch back to \`main\` and git swaps the files in your folder to match \`main\` — the new file disappears, because \`main\` has never had it. Switch to the branch again and it is back.

This is the point of branches: \`main\` stays exactly as it was while you work.
--- task
You are on \`feature\`. Create \`engine.py\` (any content), stage it and commit it. Then switch back to \`main\` and list the folder — \`engine.py\` is not there.
--- starter
git init
echo "# Rocket" > README.md
git add .
git commit -m "Start the project"
git switch -c feature
--- solution
echo "thrust = 100" > engine.py
git add engine.py
git commit -m "Add the engine"
git switch main
ls
--- hint
\`echo "thrust = 100" > engine.py\`, \`git add engine.py\`, \`git commit -m "Add the engine"\`.
--- hint
Then \`git switch main\` and \`ls\`.
--- check shell | feature has the new commit
git . commits-on feature == 2
--- check shell | You are back on main, which does not have engine.py
git . branch main
missing engine.py
ran ls

=== git-10 | Merging a branch back
--- teach
When the work on a branch is done, you **merge** it into \`main\`. From \`main\`:

\`\`\`
git merge feature
\`\`\`

If \`main\` has not changed since the branch was made, git simply moves \`main\` forward to include the new commits — a **fast-forward**. The files from the branch appear in your folder.
--- task
The \`feature\` branch has a finished \`engine.py\`. You are on \`main\`: merge \`feature\` into it.
--- starter
git init
echo "# Rocket" > README.md
git add .
git commit -m "Start the project"
git switch -c feature
echo "thrust = 100" > engine.py
git add .
git commit -m "Add the engine"
git switch main
--- solution
git merge feature
--- hint
\`git merge feature\`, from \`main\`.
--- check shell | main now has the engine
git . branch main
file engine.py == thrust = 100
git . commits == 2

=== git-11 | When both branches moved
--- teach
If \`main\` got new commits while you worked on a branch, a merge cannot just move forward. Git combines both sides from the commit where they split and makes a **merge commit** with two parents — \`git log\` shows it as *Merge branch '…'*.

When both sides changed **different** files, or different parts of the project, this is automatic. When both changed the **same** lines, that is a **conflict**: git stops and asks you to choose. (In a real terminal you would edit the file and commit; this practice terminal stops and changes nothing.)
--- task
\`main\` and \`docs\` both have new commits, in different files. On \`main\`, merge \`docs\`, then look at \`git log --oneline\`.
--- starter
git init
echo "# Rocket" > README.md
git add .
git commit -m "Start the project"
git switch -c docs
echo "How to launch" > GUIDE.md
git add .
git commit -m "Add the guide"
git switch main
echo "thrust = 100" > engine.py
git add .
git commit -m "Add the engine"
--- solution
git merge docs
git log --oneline
--- hint
\`git merge docs\` from \`main\`.
--- check shell | Both sides' work is on main
file GUIDE.md
file engine.py
--- check shell | There is a merge commit
git . merges == 1
git . log contains Merge branch 'docs'
--- check shell | You looked at the history
ran git log
`,Te=`@track html
@title Web
@name HTML and CSS: building pages
@blurb HTML, CSS and a little JavaScript, with a live preview: from your first heading to a page that reacts to clicks.

=== web-01 | Your first page
--- teach
A web page is written in **HTML**: text wrapped in **tags** that say what each piece is. A tag opens with \`<name>\` and closes with \`</name>\`:

\`\`\`html
<h1>Mission Control</h1>
<p>All systems are go.</p>
\`\`\`

\`h1\` is the main heading, \`p\` a paragraph. The browser reads the tags and draws the page — the **Preview** tab shows it as you run your code.
--- task
Make a page with a main heading that says \`Hello, web!\` and a paragraph underneath it (any text).
--- starter
<!-- Write your heading and paragraph here -->

--- solution
<h1>Hello, web!</h1>
<p>This is my first page.</p>
--- hint
A heading is \`<h1>…</h1>\`; a paragraph is \`<p>…</p>\`.
--- check dom | The main heading says Hello, web!
h1 text == Hello, web!
--- check dom | There is a paragraph
p exists

=== web-02 | Headings and text
--- teach
HTML has six heading levels, \`h1\` (most important) to \`h6\`. Use one \`h1\` per page, then \`h2\` for sections — screen readers and search engines read this outline.

Inside text, \`<strong>\` marks something important (bold) and \`<em>\` adds emphasis (italic):

\`\`\`html
<h2>Launch checklist</h2>
<p>Check the <strong>fuel level</strong> <em>before</em> ignition.</p>
\`\`\`
--- task
Under an \`h1\` of \`Space Log\`, add two sections, each with an \`h2\` heading and a paragraph. Make at least one word in a paragraph **strong**.
--- starter
<h1>Space Log</h1>

--- solution
<h1>Space Log</h1>
<h2>Day one</h2>
<p>We reached <strong>orbit</strong> at noon.</p>
<h2>Day two</h2>
<p>The view is <em>incredible</em>.</p>
--- hint
Each section is an \`<h2>\` followed by a \`<p>\`.
--- check dom | One main heading: Space Log
h1 count == 1
h1 text == Space Log
--- check dom | Two section headings
h2 count >= 2
--- check dom | Paragraphs under them
p count >= 2
--- check dom | Something is strong
p strong exists

=== web-03 | Links and images
--- teach
A **link** is an \`a\` tag; its \`href\` **attribute** says where it goes. Attributes sit inside the opening tag as \`name="value"\`:

\`\`\`html
<a href="https://www.nasa.gov">Visit NASA</a>
\`\`\`

An **image** is \`img\` — it has no closing tag. \`src\` is the picture's address and \`alt\` describes it for anyone who cannot see it:

\`\`\`html
<img src="rocket.png" alt="A rocket on the launch pad">
\`\`\`

Always write \`alt\`: it is what a screen reader says, and what shows if the image fails to load.
--- task
Add a link with the text \`Read the docs\` that goes to \`https://developer.mozilla.org\`, and an image with \`src="logo.png"\` and a meaningful \`alt\`.
--- starter
<h1>Resources</h1>

--- solution
<h1>Resources</h1>
<a href="https://developer.mozilla.org">Read the docs</a>
<img src="logo.png" alt="The MDN logo">
--- hint
\`<a href="…">text</a>\` for the link.
--- hint
\`<img src="logo.png" alt="…">\` — no closing tag.
--- check dom | The link goes to MDN
a attr href == https://developer.mozilla.org
--- check dom | The link says Read the docs
a text == Read the docs
--- check dom | The image has a source and a description
img attr src == logo.png
img attr alt !=

=== web-04 | Lists
--- teach
Two kinds of list:

\`\`\`html
<ul>            <!-- unordered: bullet points -->
  <li>Fuel</li>
  <li>Oxygen</li>
</ul>

<ol>            <!-- ordered: numbered steps -->
  <li>Ignite</li>
  <li>Lift off</li>
</ol>
\`\`\`

Each item is an \`li\` (list item), inside a \`ul\` or an \`ol\`. Indenting the items is optional but makes the structure easy to see.
--- task
Make an unordered list of three planets, and an ordered list of three launch steps.
--- starter
<h1>Mission</h1>

--- solution
<h1>Mission</h1>
<ul>
  <li>Mercury</li>
  <li>Venus</li>
  <li>Earth</li>
</ul>
<ol>
  <li>Fuel up</li>
  <li>Count down</li>
  <li>Lift off</li>
</ol>
--- hint
Each item is \`<li>…</li>\`, inside \`<ul>…</ul>\` or \`<ol>…</ol>\`.
--- check dom | A bullet list with three planets
ul li count == 3
--- check dom | A numbered list with three steps
ol li count == 3

=== web-05 | Forms and buttons
--- teach
Forms collect input. A \`label\` names a field; its \`for\` matches the field's \`id\`, so clicking the label focuses the field (and screen readers read them together):

\`\`\`html
<label for="email">Email</label>
<input id="email" type="email" placeholder="you@example.com">
<button type="submit">Sign up</button>
\`\`\`

\`type\` changes the field: \`text\`, \`email\`, \`password\`, \`number\`, \`checkbox\`… A \`button\` is what people press.
--- task
Build a small sign-in form: a label \`Username\` joined to an \`input\` with \`id="username"\`, a label \`Password\` joined to a password \`input\` with \`id="password"\`, and a button that says \`Sign in\`.
--- starter
<h1>Sign in</h1>

--- solution
<h1>Sign in</h1>
<form>
  <label for="username">Username</label>
  <input id="username" type="text">
  <label for="password">Password</label>
  <input id="password" type="password">
  <button type="submit">Sign in</button>
</form>
--- hint
\`<label for="username">Username</label>\` then \`<input id="username">\`.
--- hint
The password field needs \`type="password"\`.
--- check dom | Username has a label joined to its field
label[for=username] text == Username
#username exists
--- check dom | Password is a password field, with a label
#password attr type == password
label[for=password] exists
--- check dom | A Sign in button
button text == Sign in

=== web-06 | CSS: colour and type
--- teach
**CSS** styles HTML. Put rules in a \`<style>\` tag: a **selector** says which elements, and **declarations** say how they look:

\`\`\`html
<style>
  h1 {
    color: tomato;
    font-size: 40px;
  }
  p {
    color: #444444;
  }
</style>
\`\`\`

\`color\` is the text colour — a name (\`tomato\`), a hex code (\`#1e90ff\`) or \`rgb(30, 144, 255)\`. \`font-size\` sets the size, and \`font-family\` the typeface.
--- task
Style the page: make the \`h1\` the colour \`rgb(30, 144, 255)\` (that is \`#1e90ff\`, "dodger blue") and \`32px\` tall, and make paragraphs \`18px\`.
--- starter
<h1>Styled</h1>
<p>Some text to style.</p>
--- solution
<style>
  h1 {
    color: #1e90ff;
    font-size: 32px;
  }
  p {
    font-size: 18px;
  }
</style>
<h1>Styled</h1>
<p>Some text to style.</p>
--- hint
Rules go inside \`<style>…</style>\`: \`h1 { color: #1e90ff; font-size: 32px; }\`.
--- check dom | The heading is dodger blue
h1 style color == rgb(30, 144, 255)
--- check dom | The heading is 32px
h1 style font-size == 32px
--- check dom | Paragraphs are 18px
p style font-size == 18px

=== web-07 | Classes
--- teach
To style some elements and not others, give them a **class** and select it with a dot:

\`\`\`html
<style>
  .warning { color: darkorange; font-weight: bold; }
</style>

<p class="warning">Low fuel</p>
<p>All other systems nominal</p>
\`\`\`

An element can have several classes (\`class="card featured"\`), and a class can be used on as many elements as you like. An \`id\` (\`#name\`) is for exactly one element.
--- task
Give two of the three paragraphs the class \`done\`, and style \`.done\` so its text is \`grey\` (the colour \`rgb(128, 128, 128)\`) with a line through it (\`text-decoration: line-through\`).
--- starter
<h1>Checklist</h1>
<p>Fuel loaded</p>
<p>Crew aboard</p>
<p>Hatch sealed</p>
--- solution
<style>
  .done {
    color: grey;
    text-decoration: line-through;
  }
</style>
<h1>Checklist</h1>
<p class="done">Fuel loaded</p>
<p class="done">Crew aboard</p>
<p>Hatch sealed</p>
--- hint
\`<p class="done">…</p>\` on two of them, and \`.done { … }\` in the style.
--- check dom | Two paragraphs are done
p.done count == 2
--- check dom | Done items are grey
.done style color == rgb(128, 128, 128)
--- check dom | Done items are crossed out
.done style text-decoration-line == line-through
--- check dom | The third is left alone
p:not(.done) style text-decoration-line == none

=== web-08 | The box model
--- teach
Every element is a box. From the inside out:

- **content** — the text or image
- **padding** — space inside the border
- **border** — the edge (\`border: 2px solid #333\`)
- **margin** — space outside, between this box and its neighbours

\`\`\`css
.card {
  padding: 16px;
  border: 2px solid #1e90ff;
  margin: 24px;
  border-radius: 8px;   /* rounded corners */
}
\`\`\`

A \`div\` is a plain box with no meaning of its own — the usual thing to style as a card.
--- task
Make a \`div\` with the class \`card\` containing an \`h2\` and a \`p\`. Give \`.card\` \`20px\` of padding, a \`2px solid\` border, and \`12px\` rounded corners.
--- starter
<!-- A card: a div with class="card" -->

--- solution
<style>
  .card {
    padding: 20px;
    border: 2px solid #1e90ff;
    border-radius: 12px;
  }
</style>
<div class="card">
  <h2>Falcon</h2>
  <p>Reusable first stage.</p>
</div>
--- hint
\`<div class="card"><h2>…</h2><p>…</p></div>\` and a \`.card { … }\` rule.
--- check dom | A card with a heading and text
.card h2 exists
.card p exists
--- check dom | 20px of padding
.card style padding-top == 20px
.card style padding-left == 20px
--- check dom | A 2px solid border
.card style border-top-width == 2px
.card style border-top-style == solid
--- check dom | Rounded corners
.card style border-top-left-radius == 12px

=== web-09 | Flexbox layout
--- teach
By default boxes stack top to bottom. **Flexbox** lines children up in a row (or a column) and spaces them:

\`\`\`css
.row {
  display: flex;
  gap: 12px;                 /* space between the children */
  justify-content: center;   /* along the row */
  align-items: center;       /* across it */
}
\`\`\`

\`flex-direction: column\` stacks them instead. Flexbox is how most layouts — navigation bars, card rows, centred content — are built.
--- task
Put three \`div\`s with the class \`tile\` inside a \`div\` with the class \`row\`. Make \`.row\` a flex container with a \`12px\` gap.
--- starter
<div class="row">
  <div class="tile">A</div>
</div>
--- solution
<style>
  .row {
    display: flex;
    gap: 12px;
  }
  .tile {
    padding: 12px;
    background: #1e90ff;
    color: white;
  }
</style>
<div class="row">
  <div class="tile">A</div>
  <div class="tile">B</div>
  <div class="tile">C</div>
</div>
--- hint
\`.row { display: flex; gap: 12px; }\`
--- check dom | Three tiles in the row
.row .tile count == 3
--- check dom | The row is a flex container
.row style display == flex
--- check dom | 12px between the tiles
.row style column-gap == 12px

=== web-10 | JavaScript: reacting to a click
--- teach
A \`<script>\` tag runs JavaScript in the page. It can find elements and change them — that is the **DOM** (the page as objects):

\`\`\`html
<button id="launch">Launch</button>
<p id="status">Waiting</p>

<script>
  const button = document.querySelector('#launch')
  const status = document.querySelector('#status')

  button.addEventListener('click', () => {
    status.textContent = 'Lift off!'
  })
<\/script>
\`\`\`

\`querySelector\` takes the same selectors as CSS. \`addEventListener('click', …)\` runs a function every time the button is clicked. Put the script after the elements it uses.
--- task
Make a counter: a button with \`id="add"\` and a paragraph with \`id="count"\` that starts at \`0\`. Each click adds one to the number shown.
--- starter
<button id="add">+1</button>
<p id="count">0</p>

<script>
  // Find the button and the paragraph, then listen for clicks.
<\/script>
--- solution
<button id="add">+1</button>
<p id="count">0</p>

<script>
  const button = document.querySelector('#add')
  const count = document.querySelector('#count')
  let n = 0

  button.addEventListener('click', () => {
    n = n + 1
    count.textContent = n
  })
<\/script>
--- hint
Keep the number in a variable (\`let n = 0\`) and set \`count.textContent = n\` after adding one.
--- check dom | Starts at 0
#count text == 0
--- check dom | One click shows 1
click #add
#count text == 1
--- check dom | Three clicks show 3
click #add
click #add
click #add
#count text == 3

=== web-11 | Reading what people type
--- teach
An \`input\` fires an \`input\` event every time its text changes, and \`.value\` is what is in it:

\`\`\`html
<input id="name">
<p id="hello"></p>

<script>
  const name = document.querySelector('#name')
  name.addEventListener('input', () => {
    document.querySelector('#hello').textContent = 'Hello, ' + name.value
  })
<\/script>
\`\`\`

This is the loop behind every live search box and character counter.
--- task
Make a character counter: an \`input\` with \`id="message"\` and a paragraph with \`id="left"\`. As she types, \`#left\` should say how many of 20 characters are left, like \`17 left\`. Before any typing it says \`20 left\`.
--- starter
<input id="message">
<p id="left">20 left</p>

<script>
<\/script>
--- solution
<input id="message">
<p id="left">20 left</p>

<script>
  const message = document.querySelector('#message')
  const left = document.querySelector('#left')

  message.addEventListener('input', () => {
    left.textContent = (20 - message.value.length) + ' left'
  })
<\/script>
--- hint
Listen for \`input\` on \`#message\` and use \`message.value.length\`.
--- check dom | Starts at 20 left
#left text == 20 left
--- check dom | Typing "hi" leaves 18
type #message hi
#left text == 18 left
--- check dom | Typing a longer word counts it
type #message rocket
#left text == 14 left

=== web-12 | Building a list from data
--- teach
Pages are usually built from data. Loop over an array and create an element for each item:

\`\`\`html
<ul id="crew"></ul>

<script>
  const crew = ['Ada', 'Lin', 'Sam']
  const list = document.querySelector('#crew')

  for (const name of crew) {
    const li = document.createElement('li')
    li.textContent = name
    list.appendChild(li)
  }
<\/script>
\`\`\`

\`createElement\` makes a new element, \`textContent\` fills it, and \`appendChild\` puts it on the page. This is, underneath, what every front-end framework does.
--- task
\`planets\` holds four names. Fill the \`ul\` with \`id="planets"\` with one \`li\` per planet, in order, using a loop.
--- starter
<ul id="planets"></ul>

<script>
  const planets = ['Mercury', 'Venus', 'Earth', 'Mars']
<\/script>
--- solution
<ul id="planets"></ul>

<script>
  const planets = ['Mercury', 'Venus', 'Earth', 'Mars']
  const list = document.querySelector('#planets')

  for (const planet of planets) {
    const li = document.createElement('li')
    li.textContent = planet
    list.appendChild(li)
  }
<\/script>
--- hint
\`document.createElement('li')\`, set its \`textContent\`, then \`list.appendChild(li)\`.
--- check dom | Four planets listed
#planets li count == 4
--- check dom | In order, starting with Mercury
#planets li:first-child text == Mercury
#planets li:last-child text == Mars
--- check source | Built with a loop
\\b(for|forEach|map)\\b
`,Ee=`@track javascript
@title JavaScript
@name JavaScript, the language of the web
@blurb The language of the web, from console.log to async/await — the ground M1 to M3 build on.

=== js-01 | Printing
--- teach
A JavaScript program is a list of statements, run top to bottom. \`console.log\` writes a line to the output:

\`\`\`js
console.log('Launch in T-minus 10')
\`\`\`

Text in quotes is a **string** — single \`'…'\` or double \`"…"\` quotes both work. \`console.log\` takes several values and puts a space between them:

\`\`\`js
console.log('Fuel:', 98, 'percent')   // Fuel: 98 percent
\`\`\`

Anything after \`//\` is a **comment**, ignored by the computer and written for people.
--- task
Make the program print exactly:

\`\`\`
Hello, world!
JavaScript is running in your browser.
\`\`\`
--- starter
// Write your two console.log() calls below.

--- solution
console.log('Hello, world!')
console.log('JavaScript is running in your browser.')
--- hint
One \`console.log(...)\` per line of output, with the text in quotes.
--- check output | Prints both lines, exactly
Hello, world!
JavaScript is running in your browser.
?? Punctuation and capitals count.

=== js-02 | Variables: let and const
--- teach
A **variable** is a name for a value. Declare it with \`const\` when it will not be reassigned, and \`let\` when it will:

\`\`\`js
const name = 'Ada'
let score = 10
score = score + 5      // fine: score is a let
// name = 'Lin'        // TypeError: assignment to a const
\`\`\`

Prefer \`const\`: it tells the reader "this never changes". JavaScript's basic types are **string**, **number** (whole or decimal — there is only one number type), **boolean** (\`true\` / \`false\`), \`null\`, and \`undefined\` (declared but no value yet). \`typeof x\` tells you which.
--- task
Declare:

- a \`const\` named \`city\` holding \`'Houston'\`
- a \`let\` named \`visitors\` starting at \`100\`

then add \`25\` to \`visitors\` (reassign it), and print \`city\` and \`visitors\` on one line: \`Houston 125\`.
--- starter
// Declare city and visitors, update visitors, print both.

--- solution
const city = 'Houston'
let visitors = 100
visitors = visitors + 25
console.log(city, visitors)
--- hint
\`visitors = visitors + 25\` (or \`visitors += 25\`) updates a let.
--- check case | city is 'Houston'
city
=> 'Houston'
--- check case | visitors ended at 125
visitors
=> 125
--- check source | city is declared with const
\\bconst\\s+city\\b
--- check source | visitors is declared with let
\\blet\\s+visitors\\b
--- check output | Prints: Houston 125
Houston 125

=== js-03 | Numbers and math
--- teach
Arithmetic uses \`+ - * /\`, \`%\` for the remainder, and \`**\` for powers. Division always gives a decimal when it needs to: \`7 / 2\` is \`3.5\`.

\`\`\`js
Math.round(2.6)      // 3
Math.floor(2.6)      // 2
Math.max(3, 9, 4)    // 9
(0.1 + 0.2)          // 0.30000000000000004 — decimals are approximate
Number((0.1 + 0.2).toFixed(2))   // 0.3
\`\`\`

\`toFixed(n)\` gives a **string** with n decimals; wrap it in \`Number(...)\` to get a number back.
--- task
A request used \`1250\` input tokens and \`380\` output tokens; input costs \`0.000003\` dollars a token and output \`0.000015\`. Set \`const cost\` to the total, rounded to 6 decimals as a number (\`Number(x.toFixed(6))\`), and print it.
--- starter
const inputTokens = 1250
const outputTokens = 380
const cost = 0
console.log(cost)
--- solution
const inputTokens = 1250
const outputTokens = 380
const cost = Number((inputTokens * 0.000003 + outputTokens * 0.000015).toFixed(6))
console.log(cost)
--- hint
Multiply each count by its price, add them, then \`Number(total.toFixed(6))\`.
--- check test | cost is the total in dollars
Math.abs(cost - 0.00945) < 1e-12
--- check source | Computes it with *
\\*
--- check output | Prints the cost
0.00945

=== js-04 | Strings and template literals
--- teach
Strings have methods — functions attached to the value:

\`\`\`js
const s = '  Hello World  '
s.trim()          // 'Hello World'
s.toLowerCase()   // '  hello world  '
s.length          // 15
s.includes('World')   // true
\`\`\`

To build a string from values, use a **template literal**: backticks, with values inside \`\${…}\`:

\`\`\`js
const name = 'Ada'
const count = 3
console.log(\`\${name} has \${count} new messages\`)
\`\`\`

Any expression works inside \`\${}\`: \`\${count * 2}\`, \`\${name.toUpperCase()}\`.
--- task
\`raw\` holds a messy user name. Make \`const clean\` the trimmed, lowercased version, then print exactly:

\`\`\`
user: ada lovelace (12 characters)
\`\`\`

with a template literal that takes the name and its length from \`clean\`.
--- starter
const raw = '   Ada Lovelace  '
const clean = raw
console.log(clean)
--- solution
const raw = '   Ada Lovelace  '
const clean = raw.trim().toLowerCase()
console.log(\`user: \${clean} (\${clean.length} characters)\`)
--- hint
Chain the methods: \`raw.trim().toLowerCase()\`.
--- hint
\`.length\` is a property, not a method — no brackets.
--- check case | clean is trimmed and lowercased
clean
=> 'ada lovelace'
--- check source | Uses a template literal
\`[^\`]*\\$\\{
--- check output | Prints the sentence
user: ada lovelace (12 characters)

=== js-05 | Making decisions
--- teach
\`if\` runs a block only when its condition is true. Blocks go in braces:

\`\`\`js
const temperature = 31
if (temperature > 30) {
  console.log('hot')
} else if (temperature > 15) {
  console.log('mild')
} else {
  console.log('cold')
}
\`\`\`

Compare with \`===\` and \`!==\` (strict: \`1 === '1'\` is false). Avoid \`==\`, which converts types first and surprises people. Combine with \`&&\` (and), \`||\` (or), \`!\` (not).
--- task
Write a function \`grade(score)\` that returns \`'pass'\` for 70 or more, \`'close'\` for 60 to 69, and \`'fail'\` otherwise.
--- starter
function grade(score) {
  return ''
}
--- solution
function grade(score) {
  if (score >= 70) {
    return 'pass'
  } else if (score >= 60) {
    return 'close'
  } else {
    return 'fail'
  }
}
--- hint
Test the highest band first: \`if (score >= 70) return 'pass'\`.
--- check case | 85 is a pass
grade(85)
=> 'pass'
--- check case | 70 is a pass (the boundary)
grade(70)
=> 'pass'
--- check case | 64 is close
grade(64)
=> 'close'
--- check case | 12 is a fail
grade(12)
=> 'fail'

=== js-06 | Loops
--- teach
A \`for…of\` loop runs once for each item in an array:

\`\`\`js
for (const name of ['ada', 'lin', 'sam']) {
  console.log('hello', name)
}
\`\`\`

The classic counting loop has three parts — start; keep going while; step:

\`\`\`js
let total = 0
for (let i = 1; i <= 5; i++) {
  total += i
}
console.log(total)   // 15
\`\`\`

\`while (condition) { … }\` repeats while the condition is true.
--- task
Print the numbers 1 to 15, one per line, printing \`Fizz\` for multiples of 3, \`Buzz\` for multiples of 5, and \`FizzBuzz\` for multiples of both. Use a loop.
--- starter
// FizzBuzz, 1 to 15.

--- solution
for (let n = 1; n <= 15; n++) {
  if (n % 15 === 0) console.log('FizzBuzz')
  else if (n % 3 === 0) console.log('Fizz')
  else if (n % 5 === 0) console.log('Buzz')
  else console.log(n)
}
--- hint
\`n % 3 === 0\` means n is a multiple of 3. Check 15 first.
--- check output | Prints FizzBuzz from 1 to 15
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
--- check source | Uses a loop
\\b(for|while)\\b

=== js-07 | Functions
--- teach
A function packages code under a name. Two common ways to write one:

\`\`\`js
function add(a, b) {
  return a + b
}

const multiply = (a, b) => a * b    // an arrow function
\`\`\`

Parameters can have defaults: \`function greet(name, mark = '!') { … }\`. A function with no \`return\` gives back \`undefined\`. Functions are values: you can pass them to other functions, which is how most of JavaScript works.
--- task
Write:

- \`wordCount(text)\` — how many words are in \`text\`, split on whitespace, ignoring extra spaces (\`text.trim().split(/\\s+/)\` gives the words; be careful with the empty string).
- \`isEven(n)\` — \`true\` when n is even.
--- starter
function wordCount(text) {
}

function isEven(n) {
}
--- solution
function wordCount(text) {
  const trimmed = text.trim()
  return trimmed === '' ? 0 : trimmed.split(/\\s+/).length
}

const isEven = (n) => n % 2 === 0
--- hint
\`''.split(/\\s+/)\` is \`['']\` — one empty word — so handle the empty string first.
--- check case | wordCount('the quick brown fox') is 4
wordCount('the quick brown fox')
=> 4
--- check case | Extra spaces do not count as words
wordCount('  spaced   out  ')
=> 2
--- check case | The empty string has 0 words
wordCount('')
=> 0
--- check test | isEven works both ways
isEven(10) === true && isEven(7) === false

=== js-08 | Arrays
--- teach
An **array** holds values in order:

\`\`\`js
const planets = ['Mercury', 'Venus', 'Earth']
planets[0]            // 'Mercury'
planets.at(-1)        // 'Earth'
planets.length        // 3
planets.push('Mars')  // adds to the end
planets.slice(1, 3)   // ['Venus', 'Earth']
planets.includes('Venus')   // true
\`\`\`

\`const\` stops you reassigning the variable, but you can still change the array's contents.
--- task
Write \`stats(latencies)\` that returns an object \`{ fastest, slowest, average }\` for an array of numbers. (\`Math.min(...arr)\` spreads the array into arguments.)
--- starter
function stats(latencies) {
  return { fastest: 0, slowest: 0, average: 0 }
}
--- solution
function stats(latencies) {
  let sum = 0
  for (const ms of latencies) sum += ms
  return {
    fastest: Math.min(...latencies),
    slowest: Math.max(...latencies),
    average: sum / latencies.length,
  }
}
--- hint
Sum with a loop, then divide by \`latencies.length\`.
--- check test | fastest and slowest
stats([120, 95, 210, 143, 180]).fastest === 95 && stats([120, 95, 210, 143, 180]).slowest === 210
--- check case | average
stats([120, 95, 210, 143, 180]).average
=> 149.6
--- check case | Works for a single value
stats([7])
=> {"fastest": 7, "slowest": 7, "average": 7}

=== js-09 | Objects
--- teach
An **object** groups named values (properties):

\`\`\`js
const user = { name: 'Ada', plan: 'pro', credits: 120 }
user.name              // 'Ada'
user['plan']           // 'pro' — brackets take any string, even a variable
user.credits -= 20
Object.keys(user)      // ['name', 'plan', 'credits']
const { name, plan } = user    // destructuring: pull properties into variables
const copy = { ...user, plan: 'free' }   // spread: a new object with one change
\`\`\`

Objects are how JavaScript represents almost everything — a request, a row, a config.
--- task
Write \`countWords(text)\` returning an object that maps each lowercase word to how many times it appears. For example, \`countWords('the The cat')\` is \`{ the: 2, cat: 1 }\`.
--- starter
function countWords(text) {
  const counts = {}
  return counts
}
--- solution
function countWords(text) {
  const counts = {}
  for (const word of text.toLowerCase().split(/\\s+/)) {
    if (word === '') continue
    counts[word] = (counts[word] ?? 0) + 1
  }
  return counts
}
--- hint
\`counts[word] = (counts[word] ?? 0) + 1\` — \`??\` supplies 0 the first time.
--- check case | Counts repeated words
countWords('to be or not to be')
=> {"to": 2, "be": 2, "or": 1, "not": 1}
--- check case | Ignores case
countWords('The the THE').the
=> 3
--- check case | The empty string gives {}
countWords('')
=> {}

=== js-10 | map, filter and reduce
--- teach
Arrays have methods that take a function and apply it to every item:

\`\`\`js
const nums = [1, 2, 3, 4, 5, 6]
nums.map((n) => n * n)              // [1, 4, 9, 16, 25, 36]
nums.filter((n) => n % 2 === 0)     // [2, 4, 6]
nums.reduce((sum, n) => sum + n, 0) // 21
\`\`\`

\`map\` transforms each item, \`filter\` keeps the ones that pass, \`reduce\` folds them into one value (the second argument is the starting value). They return new arrays — the original is untouched — and they chain: \`nums.filter(...).map(...)\`.
--- task
\`requests\` is an array of \`{ user, tokens }\`. Write:

- \`heavyUsers(requests)\` — the \`user\` names of requests over 1000 tokens, in order (filter, then map).
- \`totalTokens(requests)\` — the sum of all tokens (reduce).
--- starter
function heavyUsers(requests) {
  return []
}

function totalTokens(requests) {
  return 0
}
--- solution
function heavyUsers(requests) {
  return requests.filter((r) => r.tokens > 1000).map((r) => r.user)
}

function totalTokens(requests) {
  return requests.reduce((sum, r) => sum + r.tokens, 0)
}
--- hint
\`requests.filter((r) => r.tokens > 1000).map((r) => r.user)\`
--- check case | heavyUsers keeps the big requests' users
heavyUsers([{ user: 'ada', tokens: 1200 }, { user: 'lin', tokens: 300 }, { user: 'sam', tokens: 15000 }])
=> ["ada", "sam"]
--- check case | totalTokens adds them up
totalTokens([{ user: 'ada', tokens: 1200 }, { user: 'lin', tokens: 300 }])
=> 1500
--- check case | totalTokens of nothing is 0
totalTokens([])
=> 0
--- check source | Uses reduce
\\.reduce\\(

=== js-11 | Errors
--- teach
When something goes wrong, JavaScript **throws** an error. Unhandled, it stops the program. \`try\` / \`catch\` handles it:

\`\`\`js
try {
  JSON.parse('{ not json')
} catch (err) {
  console.log('bad input:', err.message)
}
\`\`\`

Throw your own when a function is given something it cannot work with:

\`\`\`js
function percent(part, whole) {
  if (whole === 0) throw new RangeError('whole must not be zero')
  return (part / whole) * 100
}
\`\`\`

\`finally { … }\` runs whether or not something was thrown.
--- task
Write \`parsePort(text)\`:

- return the number if \`text\` is a whole number from 1 to 65535
- return \`null\` if it is not a whole number at all (\`Number.isInteger(Number(text))\` is false)
- **throw** a \`RangeError\` if it is a whole number outside 1–65535
--- starter
function parsePort(text) {
  return Number(text)
}
--- solution
function parsePort(text) {
  const port = Number(text)
  if (text.trim() === '' || !Number.isInteger(port)) return null
  if (port < 1 || port > 65535) throw new RangeError(\`port out of range: \${port}\`)
  return port
}
--- hint
Convert with \`Number(text)\` and check \`Number.isInteger\` first; return null if it fails.
--- hint
\`throw new RangeError('…')\` for numbers outside the range.
--- check case | '8080' gives 8080
parsePort('8080')
=> 8080
--- check case | 'http' gives null
parsePort('http')
=> null
--- check test | '70000' throws
throws(() => parsePort('70000'))
--- check test | '0' throws
throws(() => parsePort('0'))

=== js-12 | Promises and async/await
--- teach
Some work finishes later — a network request, a timer. JavaScript does not wait for it; it gets a **Promise**, a placeholder for the value that arrives later. \`await\` pauses an \`async\` function until the promise settles:

\`\`\`js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function main() {
  console.log('start')
  await wait(100)
  console.log('100ms later')
}
main()
\`\`\`

Run things at the same time with \`Promise.all\`: it starts them all and waits for every one. \`await\`ing them one by one runs them in sequence — slower, and the most common async mistake (M3 calls it "sequential when you meant parallel").
--- task
\`fetchScore(id)\` below pretends to be a network call. Write \`async function totalScore(ids)\` that fetches every id **in parallel** with \`Promise.all\` and returns the sum of the scores. Then print \`await totalScore([1, 2, 3])\` (top-level await works here).
--- starter
const fetchScore = (id) => new Promise((resolve) => setTimeout(() => resolve(id * 10), 50))

async function totalScore(ids) {
  let total = 0
  for (const id of ids) {
    total += await fetchScore(id)
  }
  return total
}

console.log(await totalScore([1, 2, 3]))
--- solution
const fetchScore = (id) => new Promise((resolve) => setTimeout(() => resolve(id * 10), 50))

async function totalScore(ids) {
  const scores = await Promise.all(ids.map((id) => fetchScore(id)))
  return scores.reduce((sum, s) => sum + s, 0)
}

console.log(await totalScore([1, 2, 3]))
--- hint
\`ids.map((id) => fetchScore(id))\` starts every call and gives an array of promises.
--- hint
\`await Promise.all(promises)\` waits for all of them and gives an array of results.
--- check output | Prints the total
60
--- check source | Uses Promise.all
Promise\\.all\\(
?? Awaiting inside the loop runs the calls one after another. Promise.all runs them together.
`,De=`@track python
@title Python
@name Python, a first language
@blurb From print() to classes: the twelve ideas every Python program is built from.

=== py-01 | Printing
--- teach
A Python program is a list of instructions, run top to bottom. The first instruction everyone learns is \`print\`, which writes a line of text to the output:

\`\`\`python
print("Launch in T-minus 10")
\`\`\`

Text in quotes is a **string**. \`print\` can take several values separated by commas, and puts a space between them:

\`\`\`python
print("Fuel:", 98, "percent")   # Fuel: 98 percent
\`\`\`

Anything after \`#\` on a line is a **comment** — Python ignores it. Comments are for the next person who reads your code, which is usually you.
--- task
Make the program print exactly these two lines:

\`\`\`
Hello, world!
Python is running in your browser.
\`\`\`
--- starter
# Write your two print() calls below.

--- solution
print("Hello, world!")
print("Python is running in your browser.")
--- hint
Each line of output needs its own \`print(...)\`, with the text inside quotes.
--- hint
Capitals and punctuation count: \`Hello, world!\` has a comma and an exclamation mark.
--- check output | Prints both lines, exactly
Hello, world!
Python is running in your browser.
?? Compare your output with the expected lines character by character — spacing and punctuation matter.

=== py-02 | Variables and types
--- teach
A **variable** is a name for a value. You create one with \`=\`:

\`\`\`python
name = "Ada"
age = 36
height_m = 1.65
is_engineer = True
\`\`\`

Every value has a **type**: \`"Ada"\` is a \`str\` (string), \`36\` is an \`int\` (whole number), \`1.65\` is a \`float\` (decimal), and \`True\` is a \`bool\`. \`type(x)\` tells you which:

\`\`\`python
print(type(age))   # <class 'int'>
\`\`\`

A variable can be reassigned, and it always refers to the most recent value. Names use lowercase with underscores: \`max_speed\`, not \`MaxSpeed\`.
--- task
Create three variables:

- \`city\` holding the string \`"Houston"\`
- \`population\` holding the whole number \`2300000\`
- \`is_capital\` holding \`False\`

Then print \`city\` and \`population\` on one line with a single \`print\`, so the output is \`Houston 2300000\`.
--- starter
# Create city, population and is_capital, then print city and population.

--- solution
city = "Houston"
population = 2300000
is_capital = False
print(city, population)
--- hint
\`print(a, b)\` prints both values with a space between them.
--- hint
\`False\` has a capital F and no quotes — it is a bool, not a string.
--- check case | city is the string "Houston"
city
=> "Houston"
--- check test | population is the int 2300000
type(population) is int and population == 2300000
?? Write the number without quotes or commas: 2300000.
--- check case | is_capital is False
is_capital
=> False
--- check output | Prints: Houston 2300000
Houston 2300000

=== py-03 | Arithmetic
--- teach
Python does arithmetic with the operators you would expect, plus a few more:

| Operator | Meaning | Example | Result |
|---|---|---|---|
| \`+ - *\` | add, subtract, multiply | \`7 * 3\` | \`21\` |
| \`/\` | divide (always a float) | \`7 / 2\` | \`3.5\` |
| \`//\` | whole-number division | \`7 // 2\` | \`3\` |
| \`%\` | remainder | \`7 % 2\` | \`1\` |
| \`**\` | power | \`2 ** 10\` | \`1024\` |

Brackets work as in maths: \`(2 + 3) * 4\` is \`20\`. \`round(x, 2)\` rounds to two decimal places.
--- task
A request used \`1250\` input tokens and \`380\` output tokens. Input costs \`0.000003\` dollars per token and output costs \`0.000015\` per token.

Set \`input_tokens\`, \`output_tokens\`, and \`cost\` (the total in dollars, rounded to 6 decimal places with \`round\`). Then print \`cost\`.
--- starter
input_tokens = 0
output_tokens = 0
cost = 0
print(cost)
--- solution
input_tokens = 1250
output_tokens = 380
cost = round(input_tokens * 0.000003 + output_tokens * 0.000015, 6)
print(cost)
--- hint
Multiply each token count by its price, then add the two.
--- hint
\`round(value, 6)\` keeps six digits after the decimal point.
--- check test | input_tokens and output_tokens are set
input_tokens == 1250 and output_tokens == 380
--- check test | cost is the total in dollars
abs(cost - 0.00945) < 1e-9
?? 1250 × 0.000003 + 380 × 0.000015 = 0.00945.
--- check source | Computes the cost rather than typing it in
\\*
?? Use * to multiply — the point is to let Python do the arithmetic.
--- check output | Prints the cost
0.00945

=== py-04 | Strings and f-strings
--- teach
Strings have useful methods — functions attached to the value:

\`\`\`python
s = "  Hello World  "
s.strip()      # "Hello World"     (removes spaces at the ends)
s.lower()      # "  hello world  "
s.upper()      # "  HELLO WORLD  "
len(s)         # 15                (length, including spaces)
"World" in s   # True
\`\`\`

The cleanest way to build a string out of values is an **f-string** — put \`f\` before the quotes and variables inside \`{}\`:

\`\`\`python
name = "Ada"
count = 3
print(f"{name} has {count} new messages")
\`\`\`

Inside the braces you can put any expression, like \`{count * 2}\` or \`{name.upper()}\`.
--- task
\`raw\` holds a messy user name. Make \`clean\` the stripped, lowercased version of it, then print exactly:

\`\`\`
user: ada lovelace (12 characters)
\`\`\`

using an f-string, where the name and the length come from \`clean\`.
--- starter
raw = "   Ada Lovelace  "
clean = raw
print(clean)
--- solution
raw = "   Ada Lovelace  "
clean = raw.strip().lower()
print(f"user: {clean} ({len(clean)} characters)")
--- hint
Methods can be chained: \`raw.strip().lower()\`.
--- hint
The length goes inside the f-string too: \`{len(clean)}\`.
--- check case | clean is stripped and lowercased
clean
=> "ada lovelace"
--- check source | Uses an f-string
f"|f'
--- check output | Prints the sentence
user: ada lovelace (12 characters)

=== py-05 | Making decisions
--- teach
\`if\` runs a block of code only when a condition is true. The block is the indented lines underneath — Python uses indentation (4 spaces) instead of braces:

\`\`\`python
temperature = 31
if temperature > 30:
    print("hot")
elif temperature > 15:
    print("mild")
else:
    print("cold")
\`\`\`

Comparisons: \`==\` (equal), \`!=\`, \`<\`, \`<=\`, \`>\`, \`>=\`. Combine conditions with \`and\`, \`or\`, \`not\`. Note \`=\` assigns and \`==\` compares — mixing them up is the most common beginner error.
--- task
Write a function-free program that sets \`label\` based on \`score\`:

- \`"pass"\` if score is 70 or more
- \`"close"\` if score is 60 to 69
- \`"fail"\` otherwise

Then print \`label\`. The starter has \`score = 64\`; your \`if\` must work for any score.
--- starter
score = 64
label = ""
print(label)
--- solution
score = 64
if score >= 70:
    label = "pass"
elif score >= 60:
    label = "close"
else:
    label = "fail"
print(label)
--- hint
Check the highest band first: \`if score >= 70:\`, then \`elif score >= 60:\`, then \`else:\`.
--- check output | Prints close for a score of 64
close
--- check source | Uses if / elif / else
\\belif\\b
?? Three outcomes need \`if\`, \`elif\` and \`else\`.
--- check source | Uses else for everything below 60
\\belse\\s*:

=== py-06 | Lists
--- teach
A **list** holds several values in order:

\`\`\`python
planets = ["Mercury", "Venus", "Earth"]
planets[0]          # "Mercury"  (counting starts at 0)
planets[-1]         # "Earth"    (negative counts from the end)
len(planets)        # 3
planets.append("Mars")
planets[1:3]        # ["Venus", "Earth"]  (a slice: from 1 up to, not including, 3)
\`\`\`

Lists can hold any type, and \`sum\`, \`min\`, \`max\` and \`sorted\` work on lists of numbers.
--- task
\`latencies\` holds response times in milliseconds. Append one more measurement, \`180\`. Then set:

- \`fastest\` to the smallest value
- \`slowest\` to the largest
- \`average\` to the mean (sum divided by count)

and print them in that order on one line.
--- starter
latencies = [120, 95, 210, 143]

--- solution
latencies = [120, 95, 210, 143]
latencies.append(180)
fastest = min(latencies)
slowest = max(latencies)
average = sum(latencies) / len(latencies)
print(fastest, slowest, average)
--- hint
\`min(latencies)\`, \`max(latencies)\`, and \`sum(latencies) / len(latencies)\`.
--- check case | 180 was appended
latencies
=> [120, 95, 210, 143, 180]
--- check test | fastest and slowest are right
fastest == 95 and slowest == 210
--- check test | average is the mean of all five
abs(average - 149.6) < 1e-9
--- check output | Prints all three
95 210 149.6

=== py-07 | Loops
--- teach
A \`for\` loop runs its block once for every item in a list (or anything else you can iterate):

\`\`\`python
for name in ["ada", "lin", "sam"]:
    print("hello", name)
\`\`\`

\`range(n)\` gives the numbers \`0\` to \`n - 1\`; \`range(1, 6)\` gives \`1\` to \`5\`:

\`\`\`python
total = 0
for n in range(1, 6):
    total = total + n      # or: total += n
print(total)               # 15
\`\`\`

A \`while\` loop repeats as long as its condition is true — make sure something inside changes, or it never stops.
--- task
Print the numbers from 1 to 15, one per line, but print \`Fizz\` instead of multiples of 3, \`Buzz\` instead of multiples of 5, and \`FizzBuzz\` instead of multiples of both. Use a loop.
--- starter
# FizzBuzz, 1 to 15.

--- solution
for n in range(1, 16):
    if n % 15 == 0:
        print("FizzBuzz")
    elif n % 3 == 0:
        print("Fizz")
    elif n % 5 == 0:
        print("Buzz")
    else:
        print(n)
--- hint
\`n % 3 == 0\` is true when n is a multiple of 3.
--- hint
Check "multiple of both" (that is, of 15) first — otherwise 15 stops at Fizz.
--- check output | Prints FizzBuzz from 1 to 15
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
--- check source | Uses a loop
\\b(for|while)\\b

=== py-08 | Functions
--- teach
A **function** packages code under a name so you can run it again with different inputs:

\`\`\`python
def greet(name, punctuation="!"):
    return f"Hello, {name}{punctuation}"

greet("Ada")         # "Hello, Ada!"
greet("Lin", "?")    # "Hello, Lin?"
\`\`\`

\`def\` starts the definition; the names in brackets are **parameters**; \`return\` hands a value back to whoever called it. A parameter with \`=\` has a default. A function without \`return\` returns \`None\`.
--- task
Write a function \`word_count(text)\` that returns how many words are in \`text\` (words are separated by spaces — \`text.split()\` gives you the list of words).

Also write \`is_even(n)\` that returns \`True\` when n is even and \`False\` otherwise.
--- starter
def word_count(text):
    pass


def is_even(n):
    pass
--- solution
def word_count(text):
    return len(text.split())


def is_even(n):
    return n % 2 == 0
--- hint
\`"a b c".split()\` is \`["a", "b", "c"]\`, and \`len\` of that is 3.
--- hint
\`n % 2 == 0\` is already True or False — you can return it directly.
--- check case | word_count("the quick brown fox") is 4
word_count("the quick brown fox")
=> 4
--- check case | word_count handles extra spaces
word_count("  spaced   out  ")
=> 2
--- check case | word_count("") is 0
word_count("")
=> 0
--- check case | is_even(10) is True
is_even(10)
=> True
--- check case | is_even(7) is False
is_even(7)
=> False

=== py-09 | Dictionaries
--- teach
A **dictionary** (\`dict\`) maps keys to values — like a lookup table:

\`\`\`python
prices = {"input": 0.000003, "output": 0.000015}
prices["input"]            # 0.000003
prices["cached"] = 0.0000003
"output" in prices         # True
prices.get("missing", 0)   # 0 — .get gives a default instead of an error
\`\`\`

Loop over keys and values together with \`.items()\`:

\`\`\`python
for key, value in prices.items():
    print(key, value)
\`\`\`
--- task
Write \`count_words(text)\` that returns a dict mapping each word to how many times it appears. Words are separated by spaces and should be compared in lowercase, so \`"The the"\` counts \`the\` twice.
--- starter
def count_words(text):
    counts = {}
    return counts
--- solution
def count_words(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts
--- hint
Loop over \`text.lower().split()\`.
--- hint
\`counts[word] = counts.get(word, 0) + 1\` adds one, starting from zero the first time.
--- check case | Counts repeated words
count_words("to be or not to be")
=> {"to": 2, "be": 2, "or": 1, "not": 1}
--- check case | Ignores case
count_words("The the THE")
=> {"the": 3}
--- check case | An empty string gives an empty dict
count_words("")
=> {}

=== py-10 | List comprehensions
--- teach
Building a new list from an old one is so common that Python has a short form for it — the **list comprehension**:

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
squares = [n * n for n in numbers]          # [1, 4, 9, 16, 25, 36]
evens   = [n for n in numbers if n % 2 == 0] # [2, 4, 6]
\`\`\`

Read it as: "\`n * n\` for each \`n\` in \`numbers\`", optionally "if" a condition. The same idea builds dicts: \`{name: len(name) for name in names}\`.
--- task
Using comprehensions:

- \`long_words(words)\` returns the words longer than 4 characters, uppercased.
- \`lengths(words)\` returns a dict mapping each word to its length.
--- starter
def long_words(words):
    result = []
    return result


def lengths(words):
    return {}
--- solution
def long_words(words):
    return [w.upper() for w in words if len(w) > 4]


def lengths(words):
    return {w: len(w) for w in words}
--- hint
\`[w.upper() for w in words if len(w) > 4]\`
--- check case | long_words keeps and uppercases long words
long_words(["rocket", "fuel", "orbit", "go"])
=> ["ROCKET", "ORBIT"]
--- check case | lengths maps words to their lengths
lengths(["ada", "lovelace"])
=> {"ada": 3, "lovelace": 8}
--- check source | Uses a comprehension
\\[[^\\]]*\\bfor\\b[^\\]]*\\bin\\b
?? Write the list as [expression for item in list if condition].

=== py-11 | Handling errors
--- teach
When something goes wrong at run time, Python **raises an exception**. Unhandled, it stops the program. \`try\` / \`except\` lets you handle it:

\`\`\`python
try:
    n = int("forty-two")
except ValueError:
    n = 0
\`\`\`

You can raise your own when your function is given something it cannot work with:

\`\`\`python
def percent(part, whole):
    if whole == 0:
        raise ValueError("whole must not be zero")
    return part / whole * 100
\`\`\`

Catch the specific exception you expect (\`ValueError\`, \`KeyError\`, \`ZeroDivisionError\`…) — a bare \`except:\` hides real bugs.
--- task
Write \`parse_port(text)\`:

- return the text as an \`int\` if it is a whole number from 1 to 65535
- if the text is not a number at all, return \`None\` (catch the \`ValueError\` that \`int()\` raises)
- if it is a number outside 1–65535, raise \`ValueError\` yourself
--- starter
def parse_port(text):
    return int(text)
--- solution
def parse_port(text):
    try:
        port = int(text)
    except ValueError:
        return None
    if port < 1 or port > 65535:
        raise ValueError(f"port out of range: {port}")
    return port
--- hint
Wrap only the \`int(text)\` in \`try\` / \`except ValueError: return None\`.
--- hint
After the conversion, check the range and \`raise ValueError(...)\` if it is outside 1–65535.
--- check case | "8080" gives 8080
parse_port("8080")
=> 8080
--- check case | "http" gives None
parse_port("http")
=> None
--- check test | "70000" raises ValueError
raises(ValueError, lambda: parse_port("70000"))
?? A number outside 1–65535 must raise ValueError, not return something.
--- check test | "0" raises ValueError
raises(ValueError, lambda: parse_port("0"))

=== py-12 | Classes
--- teach
A **class** bundles data with the functions that work on it. Each object made from the class has its own data:

\`\`\`python
class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

acct = Account("ada")
acct.deposit(50)      # 50
acct.balance          # 50
\`\`\`

\`__init__\` runs when the object is created. \`self\` is the object itself — every method takes it first, and \`self.x\` is how an object stores its own data.
--- task
Write a class \`Counter\` that:

- starts at \`0\` (or at a \`start\` value passed in)
- has \`increment()\` that adds one and returns the new value
- has \`reset()\` that sets it back to \`0\`
- keeps the current value in \`self.value\`
--- starter
class Counter:
    pass
--- solution
class Counter:
    def __init__(self, start=0):
        self.value = start

    def increment(self):
        self.value += 1
        return self.value

    def reset(self):
        self.value = 0
--- hint
\`def __init__(self, start=0): self.value = start\`
--- hint
\`increment\` changes \`self.value\`, then \`return self.value\`.
--- check case | A new Counter starts at 0
Counter().value
=> 0
--- check case | It can start somewhere else
Counter(5).value
=> 5
--- check test | increment adds one and returns it
(lambda c: (c.increment(), c.increment()) == (1, 2) and c.value == 2)(Counter())
--- check test | reset goes back to 0
(lambda c: (c.increment(), c.reset(), c.value)[2] == 0)(Counter(9))
`,Oe=`@track sql
@title SQL
@name SQL fundamentals
@blurb Asking a database questions: SELECT through joins, grouping, changing data and CTEs — on a users-and-requests schema like the one your product will have.
@schema
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL,
  created TEXT NOT NULL
);
INSERT INTO users (id, email, plan, created) VALUES
  (1, 'ada@example.com', 'pro',  '2025-01-04'),
  (2, 'lin@example.com', 'free', '2025-02-11'),
  (3, 'sam@example.com', 'free', '2025-03-20'),
  (4, 'kai@example.com', 'pro',  '2025-03-28');
CREATE TABLE requests (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  model TEXT NOT NULL,
  input_tokens INTEGER NOT NULL,
  output_tokens INTEGER NOT NULL,
  cost_usd REAL NOT NULL
);
INSERT INTO requests (id, user_id, model, input_tokens, output_tokens, cost_usd) VALUES
  (1, 1, 'sonnet',  1200,  340, 0.0087),
  (2, 1, 'sonnet',  5400,  910, 0.0298),
  (3, 1, 'haiku',    800,  120, 0.0012),
  (4, 2, 'sonnet', 15000, 2100, 0.0765),
  (5, 2, 'haiku',    300,   80, 0.0006),
  (6, 4, 'haiku',   2200,  400, 0.0034);
@end

=== sql-01 | Your first query
--- teach
A relational database stores data in **tables**: rows of records, each with the same named **columns**. This lesson's database has two:

- \`users\` — \`id\`, \`email\`, \`plan\` (\`'free'\` or \`'pro'\`), \`created\`
- \`requests\` — one row per model call: \`id\`, \`user_id\`, \`model\`, \`input_tokens\`, \`output_tokens\`, \`cost_usd\`

You ask a database questions in **SQL**. The simplest question is "show me everything in a table":

\`\`\`sql
SELECT * FROM requests;
\`\`\`

\`SELECT\` says what you want, \`*\` means every column, \`FROM\` names the table. SQL keywords are conventionally written in capitals; the database does not care. End each statement with \`;\`.
--- task
Write a query that returns every row and every column of the \`users\` table.
--- starter
-- Show every user.

--- solution
SELECT * FROM users;
--- hint
\`SELECT * FROM <table>;\`
--- check result | Returns all four users, every column
[[1, "ada@example.com", "pro", "2025-01-04"], [2, "lin@example.com", "free", "2025-02-11"], [3, "sam@example.com", "free", "2025-03-20"], [4, "kai@example.com", "pro", "2025-03-28"]]

=== sql-02 | Choosing columns
--- teach
Instead of \`*\`, list the columns you want, in the order you want them:

\`\`\`sql
SELECT email, plan FROM users;
\`\`\`

\`AS\` gives a column a new name in the result — useful for computed columns:

\`\`\`sql
SELECT id, input_tokens + output_tokens AS total_tokens FROM requests;
\`\`\`

Asking for only the columns you need is a habit worth keeping: on real tables it is faster, and the query says what it is for.
--- task
Return each request's \`id\`, its \`model\`, and its total tokens (input plus output) as a column named \`total_tokens\`.
--- starter
SELECT * FROM requests;
--- solution
SELECT id, model, input_tokens + output_tokens AS total_tokens FROM requests;
--- hint
\`input_tokens + output_tokens AS total_tokens\`
--- check result | id, model and total tokens for every request
[[1, "sonnet", 1540], [2, "sonnet", 6310], [3, "haiku", 920], [4, "sonnet", 17100], [5, "haiku", 380], [6, "haiku", 2600]]
--- check source | Names the column total_tokens
[Aa][Ss]\\s+total_tokens

=== sql-03 | Filtering with WHERE
--- teach
\`WHERE\` keeps only the rows that match a condition:

\`\`\`sql
SELECT * FROM users WHERE plan = 'pro';
SELECT * FROM requests WHERE input_tokens > 1000;
\`\`\`

Text goes in single quotes. Compare with \`=\`, \`<>\` (not equal), \`<\`, \`<=\`, \`>\`, \`>=\`; combine with \`AND\`, \`OR\` and \`NOT\`; use brackets when mixing them. \`IN ('a', 'b')\` matches any of a list, and \`LIKE 'ada%'\` matches a pattern (\`%\` is any run of characters).
--- task
Return the \`id\`, \`user_id\` and \`input_tokens\` of every **sonnet** request with **more than 2000** input tokens.
--- starter
SELECT id, user_id, input_tokens FROM requests;
--- solution
SELECT id, user_id, input_tokens
FROM requests
WHERE model = 'sonnet' AND input_tokens > 2000;
--- hint
Two conditions joined with \`AND\`: \`model = 'sonnet' AND input_tokens > 2000\`.
--- check result | The two big sonnet requests
[[2, 1, 5400], [4, 2, 15000]]

=== sql-04 | Sorting and limiting
--- teach
Rows come back in no guaranteed order unless you ask for one. \`ORDER BY\` sorts; \`DESC\` reverses; \`LIMIT\` keeps the first n:

\`\`\`sql
SELECT email, created FROM users ORDER BY created DESC LIMIT 2;
\`\`\`

You can sort by several columns (\`ORDER BY plan, email\`) — the second breaks ties in the first. "Top n" questions are always \`ORDER BY … DESC LIMIT n\`.
--- task
Return the \`id\` and \`cost_usd\` of the **three most expensive** requests, most expensive first.
--- starter
SELECT id, cost_usd FROM requests;
--- solution
SELECT id, cost_usd
FROM requests
ORDER BY cost_usd DESC
LIMIT 3;
--- hint
\`ORDER BY cost_usd DESC LIMIT 3\`
--- check result | The top three, in order
ordered
[[4, 0.0765], [2, 0.0298], [1, 0.0087]]

=== sql-05 | Aggregates
--- teach
**Aggregate functions** turn many rows into one value:

\`\`\`sql
SELECT COUNT(*) FROM users;                 -- how many rows
SELECT SUM(cost_usd) FROM requests;         -- total
SELECT AVG(input_tokens) FROM requests;     -- mean
SELECT MIN(created), MAX(created) FROM users;
\`\`\`

With \`WHERE\`, the aggregate only sees the rows that passed the filter. \`ROUND(x, 4)\` rounds to four decimal places — money in floating point needs it.
--- task
In one query, return three columns about **all** requests: how many there are, the total input tokens, and the highest single cost.
--- starter
SELECT * FROM requests;
--- solution
SELECT COUNT(*), SUM(input_tokens), MAX(cost_usd) FROM requests;
--- hint
\`SELECT COUNT(*), SUM(...), MAX(...) FROM requests;\`
--- check result | 6 requests, 24900 input tokens, 0.0765 at most
[[6, 24900, 0.0765]]

=== sql-06 | Grouping
--- teach
\`GROUP BY\` splits the rows into groups and runs the aggregates once per group:

\`\`\`sql
SELECT model, COUNT(*) AS calls, SUM(cost_usd) AS spend
FROM requests
GROUP BY model;
\`\`\`

Every column in the \`SELECT\` must either be in the \`GROUP BY\` or be inside an aggregate. To filter **groups** (rather than rows), use \`HAVING\`, which runs after grouping:

\`\`\`sql
... GROUP BY model HAVING COUNT(*) >= 3;
\`\`\`

\`WHERE\` filters rows before they are grouped; \`HAVING\` filters the groups after.
--- task
For each \`user_id\`, return the user id, their number of requests, and their total input tokens — but only for users with **more than one** request.
--- starter
SELECT user_id FROM requests;
--- solution
SELECT user_id, COUNT(*) AS requests, SUM(input_tokens) AS input_total
FROM requests
GROUP BY user_id
HAVING COUNT(*) > 1;
--- hint
\`GROUP BY user_id\`, then \`HAVING COUNT(*) > 1\`.
--- check result | Users 1 and 2, with their counts and totals
[[1, 3, 7400], [2, 2, 15300]]
--- check source | Filters groups with HAVING
\\b[Hh][Aa][Vv][Ii][Nn][Gg]\\b

=== sql-07 | Joining tables
--- teach
\`requests\` only stores a \`user_id\`. To see the email next to each request, **join** the tables on the column they share:

\`\`\`sql
SELECT users.email, requests.model
FROM requests
JOIN users ON users.id = requests.user_id;
\`\`\`

\`ON\` says which rows belong together. Short aliases keep it readable: \`FROM requests r JOIN users u ON u.id = r.user_id\`, then \`u.email\`, \`r.model\`. An inner \`JOIN\` keeps only rows that have a match on both sides.
--- task
Return each **haiku** request's user email, model and input tokens.
--- starter
SELECT user_id, model, input_tokens FROM requests WHERE model = 'haiku';
--- solution
SELECT u.email, r.model, r.input_tokens
FROM requests r
JOIN users u ON u.id = r.user_id
WHERE r.model = 'haiku';
--- hint
\`FROM requests r JOIN users u ON u.id = r.user_id\`
--- check result | Three haiku requests with their emails
[["ada@example.com", "haiku", 800], ["lin@example.com", "haiku", 300], ["kai@example.com", "haiku", 2200]]
--- check source | Uses a JOIN
\\b[Jj][Oo][Ii][Nn]\\b

=== sql-08 | LEFT JOIN and NULL
--- teach
An inner join drops rows with no match — \`sam\` has never made a request, so sam vanishes from a join with \`requests\`. A **LEFT JOIN** keeps every row from the left table and fills the right side with \`NULL\` when there is no match:

\`\`\`sql
SELECT u.email, r.id
FROM users u
LEFT JOIN requests r ON r.user_id = u.id;
\`\`\`

\`NULL\` means "no value". It is not zero and not an empty string: test it with \`IS NULL\`, never \`= NULL\`. \`COUNT(column)\` skips NULLs (while \`COUNT(*)\` counts rows), and \`COALESCE(x, 0)\` replaces a NULL with 0.
--- task
Return **every** user's email with how many requests they have made — including users with none, who should show \`0\`.
--- starter
SELECT u.email, COUNT(*)
FROM users u
JOIN requests r ON r.user_id = u.id
GROUP BY u.id;
--- solution
SELECT u.email, COUNT(r.id) AS requests
FROM users u
LEFT JOIN requests r ON r.user_id = u.id
GROUP BY u.id;
--- hint
Change \`JOIN\` to \`LEFT JOIN\` so sam is kept.
--- hint
\`COUNT(*)\` counts sam's single NULL-filled row as 1. Count a column from \`requests\` instead: \`COUNT(r.id)\`.
--- check result | All four users, sam with 0
[["ada@example.com", 3], ["lin@example.com", 2], ["sam@example.com", 0], ["kai@example.com", 1]]

=== sql-09 | Inserting rows
--- teach
\`INSERT\` adds rows:

\`\`\`sql
INSERT INTO users (id, email, plan, created)
VALUES (5, 'mo@example.com', 'free', '2025-04-02');
\`\`\`

Name the columns you are filling, in the order the values come. Several rows at once: \`VALUES (…), (…)\`. The table's constraints still apply — this schema has \`email … UNIQUE\`, so a second \`ada@example.com\` would be refused. That refusal is the database protecting your data; do not work around it.
--- task
Add a user with id \`5\`, email \`mo@example.com\`, plan \`free\`, created \`2025-04-02\`. Then add a request for them: id \`7\`, model \`haiku\`, \`500\` input tokens, \`90\` output tokens, cost \`0.0008\`.
--- starter
-- Insert the new user, then their first request.

--- solution
INSERT INTO users (id, email, plan, created)
VALUES (5, 'mo@example.com', 'free', '2025-04-02');

INSERT INTO requests (id, user_id, model, input_tokens, output_tokens, cost_usd)
VALUES (7, 5, 'haiku', 500, 90, 0.0008);
--- hint
Two \`INSERT INTO … VALUES (…);\` statements — the user first, since the request refers to them.
--- check query | The user exists
SELECT email, plan, created FROM users WHERE id = 5
=> [["mo@example.com", "free", "2025-04-02"]]
--- check query | Their request exists and points at them
SELECT user_id, model, input_tokens, output_tokens, cost_usd FROM requests WHERE id = 7
=> [[5, "haiku", 500, 90, 0.0008]]
--- check query | Nothing else changed
SELECT COUNT(*) FROM users
=> [[5]]

=== sql-10 | Updating and deleting
--- teach
\`UPDATE\` changes existing rows; \`DELETE\` removes them. Both take a \`WHERE\` — and both change **every** row when you forget it:

\`\`\`sql
UPDATE users SET plan = 'pro' WHERE id = 3;
DELETE FROM requests WHERE cost_usd = 0;
\`\`\`

A good habit: write the \`SELECT … WHERE …\` first, check it returns exactly the rows you mean, then turn it into the \`UPDATE\` or \`DELETE\`.
--- task
Upgrade \`lin@example.com\` to the \`pro\` plan (match on the email), and delete every request with **fewer than 500** input tokens.
--- starter
-- Upgrade lin, then delete the small requests.

--- solution
UPDATE users SET plan = 'pro' WHERE email = 'lin@example.com';
DELETE FROM requests WHERE input_tokens < 500;
--- hint
\`UPDATE users SET plan = 'pro' WHERE email = 'lin@example.com';\`
--- check query | lin is on pro
SELECT plan FROM users WHERE email = 'lin@example.com'
=> [["pro"]]
--- check query | Nobody else changed plan
SELECT COUNT(*) FROM users WHERE plan = 'pro'
=> [[3]]
--- check query | The small request is gone
SELECT COUNT(*) FROM requests WHERE input_tokens < 500
=> [[0]]
--- check query | The others are still there
SELECT COUNT(*) FROM requests
=> [[5]]

=== sql-11 | Creating tables
--- teach
\`CREATE TABLE\` defines a table: each column's name, type and rules.

\`\`\`sql
CREATE TABLE invoices (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  amount_cents INTEGER NOT NULL,
  paid INTEGER NOT NULL DEFAULT 0
);
\`\`\`

- \`PRIMARY KEY\` — uniquely identifies each row
- \`NOT NULL\` — a value is required
- \`REFERENCES users(id)\` — a **foreign key**: must point at a real user
- \`DEFAULT 0\` — the value when an insert leaves it out
- \`UNIQUE\` — no two rows may share the value

Constraints are rules the database enforces for every writer, forever — cheaper than remembering them in every piece of code.
--- task
Create a table \`api_keys\` with: \`id\` (integer primary key), \`user_id\` (integer, required, referencing \`users(id)\`), \`label\` (text, required), and \`revoked\` (integer, required, default \`0\`). Then insert one key: id \`1\`, user \`1\`, label \`laptop\` — leaving \`revoked\` to its default.
--- starter
-- CREATE TABLE api_keys (...);

--- solution
CREATE TABLE api_keys (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  label TEXT NOT NULL,
  revoked INTEGER NOT NULL DEFAULT 0
);

INSERT INTO api_keys (id, user_id, label) VALUES (1, 1, 'laptop');
--- hint
Four columns, comma-separated, inside \`CREATE TABLE api_keys ( … );\`.
--- hint
The insert names only \`id, user_id, label\`; \`revoked\` fills itself in.
--- check query | The key is there, and revoked defaulted to 0
SELECT user_id, label, revoked FROM api_keys
=> [[1, "laptop", 0]]
--- check query | label is required (NOT NULL)
SELECT "notnull" FROM pragma_table_info('api_keys') WHERE name = 'label'
=> [[1]]
--- check query | user_id references users
SELECT "table", "from", "to" FROM pragma_foreign_key_list('api_keys')
=> [["users", "user_id", "id"]]

=== sql-12 | Subqueries and WITH
--- teach
A query can use the result of another. A **subquery** in brackets works anywhere a value or table would:

\`\`\`sql
SELECT * FROM requests
WHERE cost_usd > (SELECT AVG(cost_usd) FROM requests);
\`\`\`

When a query gets layered, name the steps with \`WITH\` — a **common table expression** (CTE). Each step reads like a small table:

\`\`\`sql
WITH spend AS (
  SELECT user_id, SUM(cost_usd) AS total
  FROM requests
  GROUP BY user_id
)
SELECT * FROM spend WHERE total > 0.01;
\`\`\`

CTEs are how real reporting queries stay readable: each step has a name, and you can run any one of them on its own to check it.
--- task
Return the email and total spend (rounded to 4 decimals) of every user whose total spend is **above the average** total spend per user (averaged over users who have made requests). Use a \`WITH\` step for the per-user totals.
--- starter
SELECT user_id, SUM(cost_usd) FROM requests GROUP BY user_id;
--- solution
WITH spend AS (
  SELECT user_id, SUM(cost_usd) AS total
  FROM requests
  GROUP BY user_id
)
SELECT u.email, ROUND(s.total, 4) AS total
FROM spend s
JOIN users u ON u.id = s.user_id
WHERE s.total > (SELECT AVG(total) FROM spend);
--- hint
Build \`spend\` with \`WITH spend AS (SELECT user_id, SUM(cost_usd) AS total … GROUP BY user_id)\`.
--- hint
Compare against \`(SELECT AVG(total) FROM spend)\`, and join \`users\` for the email.
--- check result | Only lin spends more than the average
[["lin@example.com", 0.0771]]
--- check source | Uses WITH
\\b[Ww][Ii][Tt][Hh]\\s+\\w+\\s+[Aa][Ss]\\s*\\(
`,ke=`@track typescript
@title TypeScript
@name TypeScript: types that catch bugs
@blurb JavaScript with a checker that reads your code before it runs. Strict mode, from annotations to generics.

=== ts-01 | Type annotations
--- teach
TypeScript is JavaScript plus **types**. You write what kind of value a variable holds after a colon, and the compiler checks every use before anything runs:

\`\`\`ts
const name: string = 'Ada'
let age: number = 36
const isEngineer: boolean = true
\`\`\`

Here, every run type-checks your code first (in \`strict\` mode, the setting real projects use). If the types do not line up, you get the compiler's error and **nothing runs** — the same stop \`tsc\` puts in front of CI.

Most of the time TypeScript **infers** the type from the value (\`let age = 36\` is already a \`number\`), so you annotate where it helps a reader: function parameters, and things the compiler cannot see.
--- task
Declare three annotated variables — \`city: string\` as \`'Houston'\`, \`population: number\` as \`2300000\`, and \`isCapital: boolean\` as \`false\` — and print \`city\` and \`population\` on one line.
--- starter
// Declare city, population and isCapital with type annotations.

--- solution
const city: string = 'Houston'
const population: number = 2300000
const isCapital: boolean = false
console.log(city, population)
--- hint
The pattern is \`const name: type = value\`.
--- check source | city is annotated as a string
\\bcity\\s*:\\s*string\\b
--- check source | population is annotated as a number
\\bpopulation\\s*:\\s*number\\b
--- check source | isCapital is annotated as a boolean
\\bisCapital\\s*:\\s*boolean\\b
--- check test | The values are right
city === 'Houston' && population === 2300000 && isCapital === false
--- check output | Prints: Houston 2300000
Houston 2300000

=== ts-02 | Reading a type error
--- teach
A type error is the compiler telling you, before anything runs, that a value is being used as something it is not. They read like this:

\`\`\`
main.ts(2,7): error TS2322: Type 'string' is not assignable to type 'number'.
\`\`\`

\`main.ts(2,7)\` is line 2, column 7. \`TS2322\` is the error code — search it and you will find explanations. The message says what it found (\`string\`) and what it needed (\`number\`).

The fix is almost never to silence the checker. It is to make the value really be what the code says it is: here, turn the text into a number with \`Number(...)\`.
--- task
The starter does not type-check. Press Run & check to see the error, then fix the code so it type-checks and prints \`Total: 42\`. Keep the annotations; fix the values.
--- starter
const unitPrice: number = '6'
const quantity: number = 7
const total: number = unitPrice * quantity
console.log(\`Total: \${total}\`)
--- solution
const unitPrice: number = Number('6')
const quantity: number = 7
const total: number = unitPrice * quantity
console.log(\`Total: \${total}\`)
--- hint
\`'6'\` in quotes is a string. Either write \`6\`, or convert it with \`Number('6')\`.
--- check output | Type-checks and prints the total
Total: 42
--- check source | Keeps the number annotation
unitPrice\\s*:\\s*number

=== ts-03 | Typed functions
--- teach
Parameters are where types pay off most: they say what a function accepts and what it gives back.

\`\`\`ts
function add(a: number, b: number): number {
  return a + b
}

const greet = (name: string, mark = '!'): string => \`Hello, \${name}\${mark}\`
\`\`\`

The return type after the brackets is a promise to the caller — the compiler checks every \`return\` against it. A function that returns nothing is \`: void\`. In strict mode an unannotated parameter is an error (\`TS7006: implicitly has an 'any' type\`), because an untyped parameter would switch the checker off for everything it touches.
--- task
Write \`wordCount(text: string): number\` (words split on whitespace; the empty string has none) and \`isEven(n: number): boolean\`. Both parameters and both return types must be annotated.
--- starter
function wordCount(text) {
  return text.trim().split(/\\s+/).length
}

function isEven(n) {
  return n % 2 === 0
}
--- solution
function wordCount(text: string): number {
  const trimmed = text.trim()
  return trimmed === '' ? 0 : trimmed.split(/\\s+/).length
}

function isEven(n: number): boolean {
  return n % 2 === 0
}
--- hint
\`function wordCount(text: string): number { … }\`
--- hint
\`''.trim().split(/\\s+/)\` is \`['']\`, one empty word — return 0 for the empty string first.
--- check source | wordCount is typed
wordCount\\s*\\(\\s*text\\s*:\\s*string\\s*\\)\\s*:\\s*number
--- check source | isEven is typed
isEven\\s*\\(\\s*n\\s*:\\s*number\\s*\\)\\s*:\\s*boolean
--- check test | wordCount counts words
wordCount('the quick brown fox') === 4 && wordCount('  spaced   out ') === 2
--- check case | wordCount('') is 0
wordCount('')
=> 0
--- check test | isEven works both ways
isEven(10) && !isEven(7)

=== ts-04 | Arrays and tuples
--- teach
An array type is the item type followed by \`[]\`:

\`\`\`ts
const latencies: number[] = [120, 95, 210]
const names: string[] = ['ada', 'lin']
\`\`\`

The compiler then knows \`latencies[0]\` is a number and that \`latencies.push('fast')\` is an error.

A **tuple** is a fixed-length array where each position has its own type — handy for returning two things at once:

\`\`\`ts
const pair: [string, number] = ['ada', 1200]
const [user, tokens] = pair    // user: string, tokens: number
\`\`\`
--- task
Write \`minMax(values: number[]): [number, number]\` that returns the smallest and largest value as a tuple.
--- starter
function minMax(values) {
}
--- solution
function minMax(values: number[]): [number, number] {
  return [Math.min(...values), Math.max(...values)]
}
--- hint
\`Math.min(...values)\` spreads the array into arguments.
--- check source | Takes number[] and returns a [number, number] tuple
minMax\\s*\\(\\s*values\\s*:\\s*number\\[\\]\\s*\\)\\s*:\\s*\\[\\s*number\\s*,\\s*number\\s*\\]
--- check case | Finds both ends
minMax([120, 95, 210, 143])
=> [95, 210]
--- check case | Works for one value
minMax([7])
=> [7, 7]

=== ts-05 | Object types and interfaces
--- teach
Describe the shape of an object with an **interface** (or a \`type\` alias — for objects they are almost interchangeable):

\`\`\`ts
interface User {
  name: string
  plan: 'free' | 'pro'
  credits: number
}

function describe(user: User): string {
  return \`\${user.name} (\${user.plan}) has \${user.credits} credits\`
}
\`\`\`

Now a misspelled property (\`user.nmae\`), a missing one, or a plan of \`'gold'\` is caught before the code runs. \`'free' | 'pro'\` is a **union of literal types**: only those two strings are allowed.
--- task
Declare \`interface Request\` with \`user: string\`, \`model: string\` and \`tokens: number\`. Then write \`summarize(req: Request): string\` returning \`'<user> used <tokens> tokens on <model>'\` — e.g. \`'ada used 1200 tokens on sonnet'\`.
--- starter
// Declare the Request interface, then summarize().

--- solution
interface Request {
  user: string
  model: string
  tokens: number
}

function summarize(req: Request): string {
  return \`\${req.user} used \${req.tokens} tokens on \${req.model}\`
}
--- hint
\`interface Request { user: string; model: string; tokens: number }\`
--- check source | Declares the Request interface
interface\\s+Request\\s*\\{
--- check source | summarize takes a Request
summarize\\s*\\(\\s*req\\s*:\\s*Request\\s*\\)\\s*:\\s*string
--- check case | Builds the sentence
summarize({ user: 'ada', model: 'sonnet', tokens: 1200 })
=> 'ada used 1200 tokens on sonnet'

=== ts-06 | Optional values and null
--- teach
A property marked \`?\` may be missing; its type becomes \`T | undefined\`:

\`\`\`ts
interface Profile {
  name: string
  nickname?: string
}
\`\`\`

Strict mode will not let you call a string method on something that might be \`undefined\` — you must **narrow** first:

\`\`\`ts
function display(p: Profile): string {
  if (p.nickname !== undefined) {
    return p.nickname.toUpperCase()   // here TypeScript knows it is a string
  }
  return p.name
}
\`\`\`

Shorter forms: \`p.nickname ?? p.name\` (use the right side when the left is null or undefined) and \`p.nickname?.toUpperCase()\` (stop and give undefined if it is missing).
--- task
The starter does not type-check. Fix \`displayName\` so it returns the nickname in uppercase when there is one, and the name otherwise — without \`!\` or \`as\` (narrow, or use \`??\` / \`?.\`).
--- starter
interface Profile {
  name: string
  nickname?: string
}

function displayName(p: Profile): string {
  return p.nickname.toUpperCase()
}
--- solution
interface Profile {
  name: string
  nickname?: string
}

function displayName(p: Profile): string {
  return p.nickname?.toUpperCase() ?? p.name
}
--- hint
\`p.nickname?.toUpperCase()\` is undefined when there is no nickname; \`?? p.name\` fills that in.
--- check case | Uses the nickname when there is one
displayName({ name: 'Ada Lovelace', nickname: 'ada' })
=> 'ADA'
--- check case | Falls back to the name
displayName({ name: 'Lin' })
=> 'Lin'
--- check source absent | No non-null assertion or cast
nickname!|\\bas\\s+string\\b
?? \`!\` and \`as\` tell the checker to trust you. Narrowing proves it.

=== ts-07 | Unions and narrowing
--- teach
A **union** type is "one of these": \`string | number\`. Before you use a union value you narrow it, and TypeScript follows your checks:

\`\`\`ts
function format(id: string | number): string {
  if (typeof id === 'number') {
    return id.toFixed(0)        // id: number here
  }
  return id.trim()              // id: string here
}
\`\`\`

\`typeof\` narrows primitives; \`Array.isArray(x)\` narrows arrays; \`'key' in obj\` and \`instanceof\` narrow objects.
--- task
Write \`toCents(amount: number | string): number\`. A number is dollars (\`1.5\` → \`150\`); a string looks like \`'$2.25'\` (→ \`225\`). Round to a whole number of cents.
--- starter
function toCents(amount: number | string): number {
  return amount * 100
}
--- solution
function toCents(amount: number | string): number {
  if (typeof amount === 'number') {
    return Math.round(amount * 100)
  }
  return Math.round(Number(amount.replace('$', '')) * 100)
}
--- hint
\`if (typeof amount === 'number') { … }\` — below that, amount is a string.
--- hint
\`'$2.25'.replace('$', '')\` is \`'2.25'\`; \`Number(...)\` turns it into 2.25.
--- check case | A number of dollars
toCents(1.5)
=> 150
--- check case | A dollar string
toCents('$2.25')
=> 225
--- check case | Rounds away float error
toCents(0.29)
=> 29
--- check source | Narrows with typeof
typeof\\s+amount

=== ts-08 | Discriminated unions
--- teach
When objects of different shapes share one field that says which shape they are, TypeScript can narrow on that field. That is a **discriminated union** — the backbone of M3's trust boundary and of every model response you will handle:

\`\`\`ts
type Reply =
  | { kind: 'text'; text: string }
  | { kind: 'refusal'; reason: string }

function show(r: Reply): string {
  switch (r.kind) {
    case 'text':
      return r.text        // r is the text shape here
    case 'refusal':
      return r.reason
  }
}
\`\`\`

Add \`const unhandled: never = r\` in a \`default:\` branch and the compiler **forces** you to handle every case: add a new kind to \`Reply\` and every switch that forgot it stops compiling.
--- task
\`Event\` has three kinds. Finish \`describe\` so every kind is handled, and keep the \`never\` line so a future kind cannot be missed:

- \`start\` → \`'started <model>'\`
- \`delta\` → \`'+<text.length> chars'\`
- \`stop\` → \`'stopped: <reason>'\`
--- starter
type Event =
  | { kind: 'start'; model: string }
  | { kind: 'delta'; text: string }
  | { kind: 'stop'; reason: string }

function describe(e: Event): string {
  switch (e.kind) {
    case 'start':
      return \`started \${e.model}\`
    default: {
      const unhandled: never = e
      return unhandled
    }
  }
}
--- solution
type Event =
  | { kind: 'start'; model: string }
  | { kind: 'delta'; text: string }
  | { kind: 'stop'; reason: string }

function describe(e: Event): string {
  switch (e.kind) {
    case 'start':
      return \`started \${e.model}\`
    case 'delta':
      return \`+\${e.text.length} chars\`
    case 'stop':
      return \`stopped: \${e.reason}\`
    default: {
      const unhandled: never = e
      return unhandled
    }
  }
}
--- hint
Run it first: the error on the \`never\` line tells you which kinds are still unhandled.
--- check case | start
describe({ kind: 'start', model: 'sonnet' })
=> 'started sonnet'
--- check case | delta
describe({ kind: 'delta', text: 'hello' })
=> '+5 chars'
--- check case | stop
describe({ kind: 'stop', reason: 'end_turn' })
=> 'stopped: end_turn'
--- check source | Keeps the exhaustiveness check
:\\s*never\\s*=

=== ts-09 | Generics
--- teach
Some functions work the same way for any type. A **generic** takes the type as a parameter, written in angle brackets:

\`\`\`ts
function first<T>(items: T[]): T | undefined {
  return items[0]
}

first([1, 2, 3])        // number | undefined
first(['a', 'b'])       // string | undefined
\`\`\`

\`T\` is filled in from the arguments, so the result keeps its real type instead of collapsing to \`any\`. Arrays themselves are generic: \`number[]\` is shorthand for \`Array<number>\`, and \`Promise<string>\` is a promise of a string.
--- task
Write a generic \`lastN<T>(items: T[], n: number): T[]\` that returns the last \`n\` items (all of them if there are fewer), and a generic \`groupCount<T>(items: T[], key: (item: T) => string): Record<string, number>\` that counts items per key.
--- starter
function lastN(items, n) {
}

function groupCount(items, key) {
}
--- solution
function lastN<T>(items: T[], n: number): T[] {
  return n <= 0 ? [] : items.slice(-n)
}

function groupCount<T>(items: T[], key: (item: T) => string): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const item of items) {
    const k = key(item)
    counts[k] = (counts[k] ?? 0) + 1
  }
  return counts
}
--- hint
\`items.slice(-n)\` gives the last n items — but check \`n <= 0\` first, since \`slice(-0)\` is everything.
--- hint
\`Record<string, number>\` is an object type with string keys and number values.
--- check source | lastN is generic
lastN\\s*<\\s*T\\s*>
--- check source | groupCount is generic
groupCount\\s*<\\s*T\\s*>
--- check case | lastN(…, 2)
lastN([1, 2, 3, 4], 2)
=> [3, 4]
--- check case | lastN with fewer items than n
lastN(['a'], 5)
=> ["a"]
--- check case | groupCount counts by key
groupCount(['ada', 'lin', 'al'], (s) => s[0])
=> {"a": 2, "l": 1}

=== ts-10 | unknown and type guards
--- teach
Data from outside your program — JSON from a model, a request body — has no type the compiler can trust. Give it the type **\`unknown\`**: TypeScript will not let you use an \`unknown\` value until you have checked what it is.

A **type guard** is a function that does the checking and tells the compiler about it with \`x is T\`:

\`\`\`ts
interface User { name: string; credits: number }

function isUser(x: unknown): x is User {
  return (
    typeof x === 'object' && x !== null &&
    typeof (x as Record<string, unknown>).name === 'string' &&
    typeof (x as Record<string, unknown>).credits === 'number'
  )
}
\`\`\`

This is "parse, don't assert": \`JSON.parse(text) as User\` compiles and lies; a guard checks. (In a real project a library such as Zod writes these for you — M3.)
--- task
Write \`isPoint(x: unknown): x is Point\` for \`interface Point { x: number; y: number }\`, then \`parsePoint(text: string): Point | null\` that parses JSON and returns the point only if it really is one.
--- starter
interface Point {
  x: number
  y: number
}

function parsePoint(text: string): Point | null {
  return JSON.parse(text) as Point
}
--- solution
interface Point {
  x: number
  y: number
}

function isPoint(x: unknown): x is Point {
  if (typeof x !== 'object' || x === null) return false
  const o = x as Record<string, unknown>
  return typeof o.x === 'number' && typeof o.y === 'number'
}

function parsePoint(text: string): Point | null {
  const value: unknown = JSON.parse(text)
  return isPoint(value) ? value : null
}
--- hint
Check \`typeof x === 'object' && x !== null\` first, then each property's type.
--- hint
\`const value: unknown = JSON.parse(text)\` — then \`isPoint(value) ? value : null\`.
--- check case | A real point passes
parsePoint('{"x": 1, "y": 2}')
=> {"x": 1, "y": 2}
--- check case | Wrong types are rejected
parsePoint('{"x": "1", "y": 2}')
=> null
--- check case | Missing fields are rejected
parsePoint('{"x": 1}')
=> null
--- check case | null is rejected
parsePoint('null')
=> null
--- check source | Has a type guard
x\\s+is\\s+Point
--- check source absent | Does not cast the parsed JSON
JSON\\.parse\\([^)]*\\)\\s+as\\s

=== ts-11 | Utility types
--- teach
TypeScript can build new types from existing ones. The ones you will use every week:

\`\`\`ts
interface Settings { theme: string; fontSize: number; beta: boolean }

Partial<Settings>                // every property optional
Readonly<Settings>               // no property can be reassigned
Pick<Settings, 'theme'>          // only the listed properties
Omit<Settings, 'beta'>           // everything except those
Record<'free' | 'pro', number>   // an object with exactly these keys
\`\`\`

\`Partial\` is what an "update" takes: a patch with any subset of fields.
--- task
Write \`applyPatch(current: Settings, patch: Partial<Settings>): Settings\` that returns a **new** settings object with the patch applied (the original unchanged). Then declare \`const LIMITS: Record<'free' | 'pro', number>\` with free \`100\` and pro \`1000\`.
--- starter
interface Settings {
  theme: string
  fontSize: number
  beta: boolean
}

--- solution
interface Settings {
  theme: string
  fontSize: number
  beta: boolean
}

function applyPatch(current: Settings, patch: Partial<Settings>): Settings {
  return { ...current, ...patch }
}

const LIMITS: Record<'free' | 'pro', number> = { free: 100, pro: 1000 }
--- hint
Object spread: \`{ ...current, ...patch }\` — later properties win.
--- check source | The patch is a Partial<Settings>
patch\\s*:\\s*Partial\\s*<\\s*Settings\\s*>
--- check case | Applies the patch
applyPatch({ theme: 'dark', fontSize: 13, beta: false }, { fontSize: 15 }).fontSize
=> 15
--- check test | Keeps the rest, leaves the original alone
(() => { const s = { theme: 'dark', fontSize: 13, beta: false }; const t = applyPatch(s, { beta: true }); return t.theme === 'dark' && t.beta && s.beta === false && t !== s })()
--- check test | LIMITS has both plans
LIMITS.free === 100 && LIMITS.pro === 1000
--- check source | LIMITS is a Record over the two plans
LIMITS\\s*:\\s*Record\\s*<
`,Ae=[`bash`,`git`,`html`,`javascript`,`typescript`,`python`,`sql`,`cpp`],je=Object.assign({"./tracks/bash.txt":Se,"./tracks/cpp.txt":Ce,"./tracks/git.txt":we,"./tracks/html.txt":Te,"./tracks/javascript.txt":Ee,"./tracks/python.txt":De,"./tracks/sql.txt":Oe,"./tracks/typescript.txt":ke}),Me=[`basics`,`intermediate`,`advanced`,`expert`,`projects`];function R(e){let[t=``,n=`basics`]=e.replace(/\.txt$/,``).split(`.`);return[Ae.indexOf(t),Me.indexOf(n)]}var Ne=Object.entries(je).map(([e,t])=>[e.split(`/`).pop(),t]).filter(([e])=>R(e)[0]>=0).sort((e,t)=>{let[n,r]=R(e[0]),[i,a]=R(t[0]);return n-i||r-a}),Pe=Ae.filter(e=>Ne.some(([t])=>t.split(`.`)[0]===e)),z=[{id:`ai-product`,title:`AI Product Engineer`,blurb:`The order LAUNCHPAD itself teaches in: the command line and git, JavaScript and TypeScript for the product, the web page it lives in, SQL for its data and Python for its models.`,steps:[`bash`,`git`,`javascript`,`typescript`,`html`,`sql`,`python`]},{id:`software`,title:`Software Engineer`,blurb:`The ground every software job stands on: one language learned properly, the command line and git, SQL, and then C++ to see what the machine is really doing.`,steps:[`python`,`bash`,`git`,`sql`,`cpp`]},{id:`frontend`,title:`Frontend Developer`,blurb:`Pages people use: HTML and CSS first, then the JavaScript that makes them react, TypeScript to keep it correct as it grows, and the tools every team works in.`,steps:[`html`,`javascript`,`typescript`,`bash`,`git`]},{id:`backend`,title:`Backend Developer`,blurb:`The server side: the command line and git it runs on, JavaScript and TypeScript for the code that answers requests, and SQL for the data it keeps.`,steps:[`bash`,`git`,`javascript`,`typescript`,`sql`]},{id:`data`,title:`Data & ML`,blurb:`Python, the language of data work and machine learning, SQL to get the data out of where it lives, and the command line and git to keep the work reproducible.`,steps:[`python`,`sql`,`bash`,`git`]},{id:`systems`,title:`Systems & C++`,blurb:`Close to the machine: the command line and git, Python to learn to think in code, then C++ for programs that are fast and exact about memory.`,steps:[`bash`,`git`,`python`,`cpp`]}];function B(e){return{stdout:e.stdout,stderr:e.stderr,error:e.error,ms:e.ms}}async function Fe(e,t,n={}){let{onStatus:r}=n;switch(e.lang){case`bash`:case`git`:return{stdout:``,stderr:``,error:null,...n.shell?{shell:n.shell}:{},ms:0};case`html`:{let n=await b(t,_e(e)),r=n.logs.filter(e=>e.level===`error`).map(e=>e.text);return{stdout:n.logs.filter(e=>e.level!==`error`).map(e=>e.text).join(`
`),stderr:r.join(`
`),error:null,dom:n.results,ms:n.ms}}case`javascript`:return B(await m(t));case`typescript`:{let e=await g(t,{onStatus:r}),n=he(t,e.error);return n?{...B(await g(n.program,{onStatus:r})),typeFails:n.fails}:B(e)}case`python`:{let n=e.stdin?.replace(/\n$/,``).split(`
`);return B(await h.run(t,{onStatus:r,...n?{stdin:n}:{}}))}case`cpp`:return B(await C(t,{stdin:e.stdin??``,onStatus:r}));case`sql`:{let n=await S(t,e.schema);return{stdout:``,stderr:``,error:n.error,tables:n.tables,ms:n.ms}}}}function Ie(e){return e===`git`?`bash`:e}function Le(e){e===`python`&&!h.isBooted&&h.preload(),e===`typescript`&&_.preload()}var Re=[`basics`,`intermediate`,`advanced`,`expert`,`projects`],ze=[`javascript`,`typescript`,`python`,`sql`,`cpp`,`html`,`bash`,`git`],Be=new Set([`teach`,`task`,`starter`,`solution`,`hint`,`stdin`,`schema`,`check`]),Ve=class extends Error{};function V(e,t){throw new Ve(`${e}: ${t}`)}function H(e){let t=0,n=e.length;for(;t<n&&e[t].trim()===``;)t++;for(;n>t&&e[n-1].trim()===``;)n--;return e.slice(t,n).join(`
`)}function U(e){let t=H(e);return t?`${t}\n`:``}function He(e,t){let n;try{n=JSON.parse(e)}catch{return V(t,`expected rows as JSON, got: ${e.slice(0,60)}`)}return Array.isArray(n)&&n.every(e=>Array.isArray(e)&&e.every(e=>e===null||typeof e==`string`||typeof e==`number`))||V(t,`rows must be an array of arrays of strings, numbers or null`),n}function Ue(e,t,n){let r=/^check\s+(\w+)(?:\s+(\w+))?\s*\|\s*(.+)$/.exec(e);r||V(n,`a check needs "--- check <kind> | <name>", got "--- ${e}"`);let[,i,a,o]=r,s=t.filter(e=>e.startsWith(`?? `)).map(e=>e.slice(3).trim()).join(` `)||void 0,c=t.filter(e=>!e.startsWith(`?? `)),l=H(c),u={name:o.trim(),...s?{hint:s}:{}},d=`${n} "${u.name}"`;switch(i){case`output`:return l||V(d,`an output check needs the expected output`),{...u,kind:`output`,expect:l};case`includes`:{let e=H(c).split(`
`).filter(e=>e.trim()!==``);return e.length||V(d,`an includes check needs at least one line`),{...u,kind:`includes`,expect:e}}case`test`:return l||V(d,`a test check needs an expression`),{...u,kind:`test`,expr:l};case`case`:{let e=c.findIndex(e=>e.startsWith(`=> `));e<0&&V(d,`a case needs the call, then a "=> expected" line`);let t=H(c.slice(0,e)).replace(/\s*\n\s*/g,` `),n=c.slice(e).join(`
`).slice(3).trim();return(!t||!n)&&V(d,`a case needs both a call and an expected value`),{...u,kind:`case`,call:t,expect:n}}case`dom`:case`shell`:{let e=H(c).split(`
`).map(e=>e.trim()).filter(Boolean);return e.length||V(d,`a ${i} check needs at least one line`),i===`dom`?{...u,kind:`dom`,steps:e}:{...u,kind:`shell`,facts:e}}case`source`:a&&a!==`absent`&&V(d,`unknown source flag "${a}"`),l||V(d,`a source check needs a pattern`);try{new RegExp(l)}catch{V(d,`not a valid pattern: ${l}`)}return{...u,kind:`source`,pattern:l,absent:a===`absent`};case`result`:{let e=H(c).split(`
`),t=e[0]?.trim()===`ordered`,n=(t?e.slice(1):e).join(`
`).trim();return{...u,kind:`result`,rows:He(n,d),ordered:t}}case`type-error`:return l||V(d,`a type-error check needs the code that must not type-check`),{...u,kind:`type-error`,code:l};case`query`:{let e=c.findIndex(e=>e.startsWith(`=> `));e<0&&V(d,`a query check needs a "=> [[...]]" line with the expected rows`);let t=H(c.slice(0,e));return t||V(d,`a query check needs a query`),{...u,kind:`query`,sql:t,rows:He(c.slice(e).join(`
`).slice(3).trim(),d)}}default:return V(d,`unknown check kind "${i}"`)}}function We(e,t=`track`){let n=e.replace(/\r\n?/g,`
`).split(`
`),r={},i=[],a=0,o;for(;a<n.length&&!n[a].startsWith(`=== `);a++){if(n[a].trim()===`@schema`){let e=++a;for(;a<n.length&&n[a].trim()!==`@end`;)a++;a>=n.length&&V(t,`"@schema" without a closing "@end"`),o=H(n.slice(e,a));continue}let e=/^@(\w+)\s+(.*)$/.exec(n[a]);e&&(r[e[1]]=e[2].trim())}let s=r.track;for(ze.includes(s)||V(t,`"@track" must be one of ${ze.join(`, `)}`),r.title||V(t,`missing "@title"`);a<n.length;){let e=/^=== (\S+)\s*\|\s*(.+)$/.exec(n[a]);e||V(t,`expected "=== <id> | <title>" at line ${a+1}`);let r=e[1],c=`${t} ${r}`;a++;let l=[];for(;a<n.length&&!n[a].startsWith(`=== `);a++){let e=n[a],t=/^--- (.+)$/.exec(e),r=t?.[1].split(/\s/)[0];t&&r&&Be.has(r)?l.push({header:t[1].trim(),body:[]}):l.length?l[l.length-1].body.push(e):e.trim()&&V(c,`text before the first "--- " section: ${e.slice(0,40)}`)}let u=e=>{let t=l.filter(t=>t.header===e);return t.length>1&&V(c,`more than one "--- ${e}"`),t[0]?.body},d=u(`teach`),f=u(`task`),p=u(`starter`),m=u(`solution`);(!d||!f||!m)&&V(c,`needs teach, task and solution`);let h=l.filter(e=>e.header.startsWith(`check`)).map(e=>Ue(e.header,e.body,c));h.length||V(c,`needs at least one check`);let g=u(`stdin`),_=u(`schema`),v=_?H(_):o;i.push({id:r,lang:s,title:e[2].trim(),teach:H(d),task:H(f),starter:p?U(p):``,solution:U(m),hints:l.filter(e=>e.header===`hint`).map(e=>H(e.body)),checks:h,...g?{stdin:U(g)}:{},...v?{schema:v}:{}})}let c=new Set;for(let e of i)c.has(e.id)&&V(t,`duplicate lesson id ${e.id}`),c.add(e.id);i.length||V(t,`no lessons`);let l=r.level??`basics`;Re.includes(l)||V(t,`"@level" must be one of ${Re.join(`, `)}`);let u=r.course??(l===`basics`?s:`${s}-${l}`);return i.some(e=>e.checks.some(e=>e.kind===`type-error`))&&s!==`typescript`&&V(t,`type-error checks are for TypeScript tracks`),{id:u,lang:s,level:l,title:r.title,name:r.name??r.title,blurb:r.blurb??``,lessons:i}}var W=Ne.map(([e,t])=>We(t,e)),Ge=new Map;for(let e of W)e.lessons.forEach((t,n)=>Ge.set(t.id,{track:e,lesson:t,index:n}));function Ke(e){return W.find(t=>t.id===e)??W.find(t=>t.lang===e)}function G(e){return W.filter(t=>t.lang===e)}function qe(e,t){let n=G(e);return n.find(e=>q(e,t)<e.lessons.length)??n[n.length-1]}function Je(e){return Ge.get(e)}function K(e,t){return e.lessons.find(e=>!t[e.id])??e.lessons[e.lessons.length-1]}function q(e,t){return e.lessons.filter(e=>t[e.id]).length}function Ye(e,t=new Date){let n=e=>`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`,r=new Set(Object.values(e).map(e=>n(new Date(e)))),i=new Date(t);r.has(n(i))||i.setDate(i.getDate()-1);let a=0;for(;r.has(n(i));)a++,i.setDate(i.getDate()-1);return a}var Xe={bash:`The command line`,git:`Git`,html:`HTML & CSS`,javascript:`JavaScript`,typescript:`TypeScript`,python:`Python`,sql:`SQL`,cpp:`C++`};function J(e){return Xe[e]??e}var Y=[...new Set(W.map(e=>e.lang))].filter(e=>G(e).length>1).map(e=>({id:`master-${e}`,title:J(e),blurb:`${J(e)} from the first line to expert: the basics, then the idioms, the design and debugging skills and the problem solving that let you build anything in it on your own, then real projects.`,steps:G(e).map(e=>e.id)})),X={basics:`Basics`,intermediate:`Intermediate`,advanced:`Advanced`,expert:`Expert`,projects:`Projects`},Z=t();function Ze({lessonId:e}){if(!e)return(0,Z.jsx)(Qe,{});let t=e.startsWith(`roadmap-`)?$.find(t=>`roadmap-${t.id}`===e):void 0;if(t)return(0,Z.jsx)(nt,{roadmap:t});let n=Ke(e);if(n)return(0,Z.jsx)(rt,{track:n});let r=Je(e);return r?(0,Z.jsx)(it,{track:r.track,lesson:r.lesson,index:r.index},r.lesson.id):(0,Z.jsx)(Qe,{missing:e})}function Q(){let{state:e}=o(),t=Ye(e.learn);return t?(0,Z.jsxs)(`span`,{className:`lm-streak`,title:`Days in a row with a lesson passed`,children:[(0,Z.jsx)(r,{size:14}),t,`-day streak`]}):null}var $=[...z,...Y];function Qe({missing:e}){let{state:t}=o(),n=d(),r=$.find(e=>e.id===n.query.goal)??z[0],i=(e,t=e.title)=>(0,Z.jsxs)(`button`,{type:`button`,role:`tab`,"aria-selected":e.id===r.id,"data-active":e.id===r.id,className:`rm-goals__pill`,onClick:()=>f(`/learn?goal=${e.id}`,{replace:!0}),children:[e.id.startsWith(`master-`)?(0,Z.jsx)(w,{lang:e.id.slice(7),size:16}):null,t]},e.id);return(0,Z.jsxs)(`div`,{className:`page page--padtop ide-wrap lm-home`,children:[(0,Z.jsxs)(`header`,{className:`rm-hero`,children:[(0,Z.jsxs)(`div`,{className:`page-head__kicker`,children:[`Learn to code `,(0,Z.jsx)(Q,{})]}),(0,Z.jsx)(`h1`,{className:`rm-hero__title`,children:`Choose where you want to end up. Each roadmap lines up the courses that get you there, one step at a time.`})]}),e?(0,Z.jsxs)(`p`,{className:`lm-missing`,children:[`There is no lesson called “`,e,`”. Pick a course below.`]}):null,(0,Z.jsxs)(`div`,{className:`rm-goals`,role:`tablist`,"aria-label":`Roadmap`,children:[(0,Z.jsx)(`span`,{className:`rm-goals__label`,children:`Reach a goal`}),(0,Z.jsx)(`div`,{className:`rm-goals__row`,children:z.map(e=>i(e))}),Y.length?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`span`,{className:`rm-goals__label`,children:`Or master one language, beginner to expert`}),(0,Z.jsx)(`div`,{className:`rm-goals__row`,children:Y.map(e=>i(e))})]}):null]}),(0,Z.jsxs)(`section`,{className:`rm`,children:[(0,Z.jsxs)(`header`,{className:`rm__head`,children:[(0,Z.jsx)(`span`,{className:`rm__goal`,children:r.title}),(0,Z.jsx)(`button`,{type:`button`,className:`rm__see`,onClick:()=>f(`/learn/roadmap-${r.id}`),children:`View every step`})]}),(0,Z.jsx)(tt,{roadmap:r,passed:t.learn})]}),(0,Z.jsx)(`h2`,{className:`lm-h2`,children:`Browse every course`}),Pe.map(e=>(0,Z.jsxs)(`section`,{className:`lm-lang`,"aria-label":J(e),children:[(0,Z.jsxs)(`h3`,{className:`lm-lang__name`,children:[(0,Z.jsx)(w,{lang:e,size:20}),J(e),(0,Z.jsxs)(`span`,{className:`lm-lang__count`,children:[G(e).length,` course`,G(e).length===1?``:`s`,` · `,G(e).reduce((e,t)=>e+t.lessons.length,0),` lessons`]})]}),(0,Z.jsx)(`div`,{className:`lm-courses`,children:G(e).map(e=>{let n=q(e,t.learn);return(0,Z.jsxs)(`a`,{className:`lm-course`,href:`#/learn/${e.id}`,children:[(0,Z.jsx)(`span`,{className:`lm-course__icon`,children:(0,Z.jsx)(w,{lang:e.lang,size:30})}),(0,Z.jsxs)(`span`,{className:`lm-course__text`,children:[(0,Z.jsx)(`span`,{className:`lm-course__level`,"data-level":e.level,children:X[e.level]}),(0,Z.jsx)(`span`,{className:`lm-course__title`,children:e.name}),(0,Z.jsx)(`span`,{className:`lm-course__meta`,children:n===e.lessons.length?`Complete`:`${n} of ${e.lessons.length} lessons`}),(0,Z.jsx)(c,{value:n/e.lessons.length,height:4})]})]},e.id)})})]},e)),(0,Z.jsx)(`p`,{className:`track-note`,children:`Learn to code is practice, and it counts for nothing else: passing a lesson does not change your modules, your readiness or your review queue.`})]})}function $e(e){let[t,n]=(0,D.useState)(3);return(0,D.useLayoutEffect)(()=>{let t=e.current;if(!t)return;let r=()=>{let e=t.clientWidth;n(e>=900?5:e>=620?4:3)};r();let i=new ResizeObserver(r);return i.observe(t),()=>i.disconnect()},[e]),t}function et(e,t){let n=e.steps.map(e=>Ke(e)).filter(e=>!!e),r=n.map(e=>q(e,t)===e.lessons.length),i=r.indexOf(!1);return{tracks:n,done:r,current:i,allDone:i<0}}function tt({roadmap:e,passed:t}){let{tracks:n,done:r,current:i,allDone:a}=et(e,t),o=(0,D.useRef)(null),s=$e(o),c=n.length+1,l=e=>{let t=Math.floor(e/s),n=e%s;return{row:t,col:t%2?s-1-n:n}},u=e=>{if(e>=c-1)return;let t=l(e),n=l(e+1);return n.row===t.row?n.col>t.col?`right`:`left`:t.col===s-1?`turn-right`:`turn-left`};return(0,Z.jsxs)(`div`,{className:`rm__path`,ref:o,style:{gridTemplateColumns:`repeat(${s}, minmax(0, 1fr))`},children:[n.map((e,n)=>{let a=q(e,t),o=r[n]||n===i,{row:s,col:c}=l(n);return(0,Z.jsxs)(`div`,{className:`rm-step`,style:{gridRow:s+1,gridColumn:c+1},children:[(0,Z.jsxs)(`a`,{href:`#/learn/${e.lang}`,className:`rm-tile`,"data-lit":o,"data-state":r[n]?`done`:n===i?`current`:`todo`,"aria-label":`Step ${n+1}: ${e.name}, ${a} of ${e.lessons.length} lessons passed`,title:`${e.name} · ${a}/${e.lessons.length} lessons`,children:[(0,Z.jsx)(w,{lang:e.lang,size:34}),(0,Z.jsx)(`span`,{className:`rm-tile__n`,"aria-hidden":`true`,children:n+1})]}),(0,Z.jsx)(`span`,{className:`rm-step__label`,children:e.name}),u(n)?(0,Z.jsx)(`span`,{className:`rm-link`,"data-dir":u(n),"data-lit":r[n],"aria-hidden":`true`}):null]},e.lang)}),(()=>{let{row:t,col:r}=l(n.length);return(0,Z.jsxs)(`div`,{className:`rm-step`,style:{gridRow:t+1,gridColumn:r+1},children:[(0,Z.jsx)(`span`,{className:`rm-tile rm-tile--end`,"data-lit":a,role:`img`,"aria-label":a?`${e.title}: every course complete`:`Finish line: complete every course on the ${e.title} roadmap`,children:(0,Z.jsx)(x,{size:32})}),a?(0,Z.jsx)(`span`,{className:`rm-step__label`,children:`Goal reached`}):null]})})()]})}function nt({roadmap:e}){let{state:t}=o(),{tracks:n,done:r,current:a,allDone:s}=et(e,t.learn),u=r.filter(Boolean).length,d=e=>f(`/learn/${K(e,t.learn).id}`);return(0,Z.jsxs)(`div`,{className:`page page--padtop ide-wrap`,children:[(0,Z.jsxs)(`a`,{className:`lm-back`,href:`#/learn?goal=${e.id}`,children:[(0,Z.jsx)(i,{size:13}),`Roadmaps`]}),(0,Z.jsxs)(`div`,{className:`rmv-head`,children:[(0,Z.jsxs)(`div`,{className:`page-head__kicker`,children:[`Roadmap · `,n.length,` courses `,(0,Z.jsx)(Q,{})]}),(0,Z.jsx)(`h1`,{className:`h-page`,children:e.title}),(0,Z.jsx)(`p`,{className:`page-head__sub`,children:e.blurb}),(0,Z.jsxs)(`div`,{className:`lm-course-go`,children:[(0,Z.jsx)(c,{value:u/n.length,height:6}),(0,Z.jsxs)(`span`,{className:`lm-course-go__n`,children:[u,`/`,n.length]}),(0,Z.jsxs)(`button`,{type:`button`,className:`ide-run`,onClick:()=>d(n[s?0:a]),children:[s?`Review`:u===0&&q(n[0],t.learn)===0?`Start step 1`:`Continue step ${a+1}`,(0,Z.jsx)(l,{size:13})]})]})]}),(0,Z.jsxs)(`ol`,{className:`rmv`,children:[n.map((e,n)=>{let i=q(e,t.learn);return(0,Z.jsxs)(`li`,{className:`rmv-step`,"data-state":r[n]?`done`:n===a?`current`:`todo`,children:[(0,Z.jsxs)(`span`,{className:`rm-tile rmv-step__tile`,"data-lit":r[n]||n===a,children:[(0,Z.jsx)(w,{lang:e.lang,size:30}),(0,Z.jsx)(`span`,{className:`rm-tile__n`,"aria-hidden":`true`,children:n+1})]}),(0,Z.jsxs)(`div`,{className:`rmv-step__body`,children:[(0,Z.jsx)(`a`,{className:`rmv-step__name`,href:`#/learn/${e.lang}`,children:e.name}),(0,Z.jsx)(`p`,{className:`rmv-step__blurb`,children:e.blurb}),(0,Z.jsxs)(`div`,{className:`rmv-step__row`,children:[(0,Z.jsx)(c,{value:i/e.lessons.length,height:4}),(0,Z.jsxs)(`span`,{className:`rmv-step__n`,children:[i,`/`,e.lessons.length,` lessons`]}),(0,Z.jsxs)(`button`,{type:`button`,className:`rmv-step__go`,onClick:()=>d(e),children:[i===0?`Start`:i===e.lessons.length?`Review`:`Continue`,(0,Z.jsx)(l,{size:12})]})]})]})]},e.lang)}),(0,Z.jsxs)(`li`,{className:`rmv-step`,"data-state":s?`done`:`todo`,children:[(0,Z.jsx)(`span`,{className:`rm-tile rm-tile--end rmv-step__tile`,"data-lit":s,children:(0,Z.jsx)(x,{size:28})}),(0,Z.jsxs)(`div`,{className:`rmv-step__body`,children:[(0,Z.jsx)(`span`,{className:`rmv-step__name`,children:s?`Goal reached`:`Finish line`}),(0,Z.jsx)(`p`,{className:`rmv-step__blurb`,children:s?`Every course on the ${e.title} roadmap, complete. The basics are yours; more lessons past them will follow.`:`Complete every course above to reach it.`})]})]})]})]})}function rt({track:e}){let{state:t}=o(),r=q(e,t.learn),a=e.lessons.length,s=K(e,t.learn);return(0,Z.jsxs)(`div`,{className:`page page--padtop ide-wrap`,children:[(0,Z.jsxs)(`a`,{className:`lm-back`,href:`#/learn`,children:[(0,Z.jsx)(i,{size:13}),`Roadmaps`]}),(0,Z.jsxs)(`div`,{className:`lm-course-head`,children:[(0,Z.jsx)(`span`,{className:`rm-tile`,style:{"--tile":`72px`},children:(0,Z.jsx)(w,{lang:e.lang,size:40})}),(0,Z.jsxs)(`div`,{style:{minWidth:0},className:`grow`,children:[(0,Z.jsxs)(`div`,{className:`page-head__kicker`,children:[X[e.level],` · `,a,` lessons `,(0,Z.jsx)(Q,{})]}),(0,Z.jsx)(`h1`,{className:`h-page`,children:e.name}),(0,Z.jsx)(`p`,{className:`page-head__sub`,children:e.blurb})]})]}),G(e.lang).length>1?(0,Z.jsx)(`nav`,{className:`lm-ladder`,"aria-label":`${J(e.lang)} courses`,children:G(e.lang).map((n,r)=>(0,Z.jsxs)(`a`,{href:`#/learn/${n.id}`,className:`lm-ladder__step`,"data-here":n.id===e.id,"data-done":q(n,t.learn)===n.lessons.length,children:[(0,Z.jsx)(`span`,{className:`lm-ladder__n`,children:r+1}),X[n.level]]},n.id))}):null,(0,Z.jsxs)(`div`,{className:`lm-course-go`,children:[(0,Z.jsx)(c,{value:r/a,height:6}),(0,Z.jsxs)(`span`,{className:`lm-course-go__n`,children:[r,`/`,a]}),(0,Z.jsxs)(`button`,{type:`button`,className:`ide-run`,onClick:()=>f(`/learn/${s.id}`),children:[r===0?`Start course`:r===a?`Review`:`Continue`,(0,Z.jsx)(l,{size:13})]})]}),(0,Z.jsx)(`ol`,{className:`lm-outline`,children:e.lessons.map((e,i)=>{let o=!!t.learn[e.id],c=e.id===s.id&&r<a;return(0,Z.jsx)(`li`,{"data-done":o,"data-next":c,children:(0,Z.jsxs)(`a`,{href:`#/learn/${e.id}`,children:[(0,Z.jsx)(`span`,{className:`lm-outline__n`,"aria-hidden":`true`,children:o?(0,Z.jsx)(n,{size:13}):i+1}),(0,Z.jsx)(`span`,{className:`lm-outline__title`,children:e.title}),o?(0,Z.jsx)(`span`,{className:`lm-outline__tag`,children:`Passed`}):c?(0,Z.jsx)(`span`,{className:`lm-outline__tag lm-outline__tag--next`,children:`Next`}):null]})},e.id)})})]})}function it({track:e,lesson:t,index:r}){let{state:a,setState:c}=o(),d=t.lang===`bash`||t.lang===`git`,[m,h]=(0,D.useState)(!1),[g,_]=(0,D.useState)(0),[v,ee]=(0,D.useState)(!1),y=(0,D.useRef)(null),te=oe(`learn:${t.id}:example`,t.teach,t.schema),ne=!!a.learn[t.id],b=e.lessons[r-1],x=e.lessons[r+1],S=G(e.lang),C=x?void 0:S[S.findIndex(t=>t.id===e.id)+1];(0,D.useEffect)(()=>Le(t.lang),[t.lang]);let T=(0,D.useCallback)(()=>{c(e=>u(e,t.id)),h(!0),requestAnimationFrame(()=>y.current?.scrollIntoView({block:`nearest`,behavior:`smooth`}))},[t.id,c]),re=(0,D.useCallback)(async(e,n,r)=>{let i=xe(t,e,await Fe(t,ge(t,e),{onStatus:r}));return{run:{stdout:i.output,stderr:i.stderr,error:i.error,plots:[],result:null,tables:i.tables,ms:i.ms},tests:i.results}},[t]);return(0,Z.jsxs)(`div`,{className:`page page--padtop ide-wrap`,children:[(0,Z.jsxs)(`div`,{className:`lm-top`,children:[(0,Z.jsxs)(`a`,{className:`lm-back`,href:`#/learn/${e.id}`,children:[(0,Z.jsx)(i,{size:13}),e.title]}),(0,Z.jsx)(`div`,{className:`lm-dots`,"aria-label":`Lesson ${r+1} of ${e.lessons.length}`,children:e.lessons.map((e,t)=>(0,Z.jsx)(`a`,{href:`#/learn/${e.id}`,className:`lm-dots__dot`,"data-done":!!a.learn[e.id],"data-here":t===r,title:`${t+1}. ${e.title}`,"aria-label":`Lesson ${t+1}: ${e.title}${a.learn[e.id]?` (passed)`:``}`},e.id))}),(0,Z.jsx)(Q,{})]}),(0,Z.jsxs)(`article`,{className:`lm-flow`,children:[(0,Z.jsxs)(`div`,{className:`lm-text__kicker`,children:[(0,Z.jsx)(w,{lang:e.lang,size:18}),`Lesson `,r+1,` of `,e.lessons.length,ne?(0,Z.jsx)(`span`,{className:`lm-passed-tag`,children:`Passed`}):null]}),(0,Z.jsx)(`h1`,{className:`lm-text__title`,children:t.title}),(0,Z.jsx)(`div`,{className:`lm-teach`,children:(0,Z.jsx)(p,{renderCode:te,children:t.teach})}),(0,Z.jsxs)(`section`,{className:`lm-challenge`,children:[(0,Z.jsx)(`div`,{className:`lm-challenge__label`,children:`Your turn`}),(0,Z.jsx)(p,{children:t.task}),t.stdin?(0,Z.jsxs)(`div`,{className:`lm-stdin`,children:[(0,Z.jsx)(`div`,{className:`lm-stdin__label`,children:`Input the program reads`}),(0,Z.jsx)(`pre`,{children:t.stdin})]}):null,d?(0,Z.jsx)(`p`,{className:`lm-challenge__how`,children:`Type the commands into the terminal below, then press Check.`}):null]}),(0,Z.jsx)(`div`,{className:`lm-work`,children:d?(0,Z.jsx)(at,{lesson:t,onPass:T}):(0,Z.jsx)(ie,{lang:Ie(t.lang),code:t.starter,saveKey:`learn:${t.id}`,grade:re,onPass:T,runLabel:`Run Code`,input:!1,minHeight:260,testsHint:`Press Run Code to run your code against the tests.`,eager:!0})}),(0,Z.jsx)(`div`,{ref:y,children:m?(0,Z.jsxs)(`div`,{className:`lm-win`,children:[(0,Z.jsx)(n,{size:16}),(0,Z.jsx)(`span`,{className:`grow`,children:x?`Lesson passed. Next: ${x.title}`:C?`That is the whole ${e.name} course. Next: ${C.name}.`:`Lesson passed — that is the whole ${e.name} course.`}),(0,Z.jsxs)(`button`,{type:`button`,className:`ide-run`,onClick:()=>f(x?`/learn/${x.id}`:C?`/learn/${C.lessons[0].id}`:`/learn/${e.id}`),children:[x?`Continue`:C?`Start the next course`:`Back to the course`,(0,Z.jsx)(l,{size:13})]})]}):null}),(0,Z.jsxs)(`div`,{className:`lm-help`,children:[t.hints.slice(0,g).map((e,t)=>(0,Z.jsxs)(`div`,{className:`lm-hint`,children:[(0,Z.jsxs)(`span`,{className:`lm-hint__n`,children:[`Hint `,t+1]}),(0,Z.jsx)(p,{children:e})]},t)),(0,Z.jsxs)(`div`,{className:`lm-help__row`,children:[g<t.hints.length?(0,Z.jsx)(`button`,{type:`button`,className:`lm-link`,onClick:()=>_(e=>e+1),children:g===0?`Show a hint`:`Another hint`}):null,(0,Z.jsx)(`button`,{type:`button`,className:`lm-link`,onClick:()=>ee(e=>!e),children:v?`Hide the solution`:`Show the solution`})]}),v?(0,Z.jsxs)(`div`,{className:`lm-solution`,children:[(0,Z.jsx)(`p`,{children:`One way to do it. Try typing it yourself rather than copying — that is where it sticks.`}),(0,Z.jsx)(p,{children:"```"+ot(t.lang)+`
`+t.solution+"```"})]}):null]}),(0,Z.jsxs)(`div`,{className:`lm-nav`,children:[b?(0,Z.jsxs)(s,{variant:`ghost`,size:`sm`,onClick:()=>f(`/learn/${b.id}`),children:[(0,Z.jsx)(i,{size:13}),b.title]}):(0,Z.jsx)(`span`,{}),x?(0,Z.jsxs)(s,{variant:`ghost`,size:`sm`,onClick:()=>f(`/learn/${x.id}`),children:[x.title,(0,Z.jsx)(l,{size:13})]}):null]})]})]})}function at({lesson:e,onPass:t}){let[n,r]=(0,D.useState)(()=>L(e)),[i,o]=(0,D.useState)(0),[s,c]=(0,D.useState)(null),[l,u]=(0,D.useState)(!1),d=async()=>{u(!0),c(null);try{let r=xe(e,``,await Fe(e,``,{shell:n}));c(r),r.passed&&t()}finally{u(!1)}};return(0,Z.jsx)(`div`,{className:`embed`,children:(0,Z.jsxs)(te,{lang:`bash`,file:`~/project`,right:(0,Z.jsxs)(`button`,{type:`button`,className:`ide__tool`,onClick:()=>{r(L(e)),o(e=>e+1),c(null)},title:`Start this lesson over`,children:[(0,Z.jsx)(a,{size:13}),`Reset`]}),children:[(0,Z.jsx)(re,{shell:n,onShell:r,height:300,banner:`Practice terminal for this lesson. Type help to see the commands.`},i),(0,Z.jsx)(`div`,{className:`lm-termbar`,children:(0,Z.jsx)(ne,{onClick:()=>void d(),running:l,label:`Check`})}),(0,Z.jsx)(ae,{tabs:[{id:`tests`,label:`Test cases`,...s?{mark:s.passed?`pass`:`fail`}:{}}],active:`tests`,onTab:()=>{},children:(0,Z.jsx)(T,{results:s?.results??null,empty:`Do the challenge in the terminal, then press Check.`})})]})})}function ot(e){return e===`javascript`?`js`:e===`typescript`?`ts`:e}function st(e){let{state:t}=o();return(0,D.useMemo)(()=>{let n=qe(e,t.learn);return n?{lesson:K(n,t.learn),done:q(n,t.learn),total:n.lessons.length}:null},[e,t.learn])}export{Ze as Learn,st as useNextLesson};