import{r as e,t}from"./react-D6Jy4RLT.js";import{E as n,L as r,O as i,X as a,g as o,r as s,t as c,v as l}from"./ui-5JSjpmHC.js";import{g as u}from"./engine-BhleXMOO.js";import{_ as d,g as f}from"./index-C-al7Hj1.js";import{t as p}from"./markdown-DYOPQskl.js";/* empty css              */import{A as m,D as h,M as g,N as _,S as v,_ as ee,b as y,c as te,d as b,g as x,i as S,j as C,k as w,l as T,m as E,p as D,r as ne,s as re,t as ie,v as ae,x as oe,y as O}from"./lessonCode-BeFK8dy3.js";var k=e(),A=`@@LEARN`,se=/^@@LEARN (\d+) (PASS|FAIL|ERROR)(?: (.*))?$/;function j(e){return e.replace(/\s*\n\s*/g,` `).trim()}function M(e,t){return e.checks.map((e,t)=>({c:e,i:t})).filter(e=>e.c.kind===t)}var ce=`const throws = (f) => { try { f(); return false } catch { return true } }
  const __eq = (a, b) => { if (Object.is(a, b)) return true; if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null || Array.isArray(a) !== Array.isArray(b)) return false; const ka = Object.keys(a), kb = Object.keys(b); return ka.length === kb.length && ka.every((k) => __eq(a[k], b[k])) }
  const __show = (v) => { if (v === undefined) return 'undefined'; if (typeof v === 'function') return '[Function]'; if (typeof v === 'bigint') return v + 'n'; try { const j = JSON.stringify(v); return j === undefined ? String(v) : j } catch { return String(v) } }
  const __err = (e) => (e instanceof Error ? e.name + ': ' + e.message : String(e))
  const __learn = (i, f) => { try { const r = f(); console.log('${A} ' + i + (r ? ' PASS ' : ' FAIL ') + __show(r)) } catch (e) { console.log('${A} ' + i + ' ERROR ' + __err(e)) } }
  const __case = (i, f, w) => { try { const got = f(); console.log('${A} ' + i + (__eq(got, w()) ? ' PASS ' : ' FAIL ') + __show(got)) } catch (e) { console.log('${A} ' + i + ' ERROR ' + __err(e)) } }`,le=ce.replace(`(f) =>`,`(f: () => unknown): boolean =>`).replace(`const __eq = (a, b) =>`,`const __eq = (a: any, b: any): boolean =>`).replace(`const __show = (v) =>`,`const __show = (v: unknown): string =>`).replace(`const __err = (e) =>`,`const __err = (e: unknown): string =>`).replace(`const __learn = (i, f) =>`,`const __learn = (i: number, f: () => unknown): void =>`).replace(`const __case = (i, f, w) =>`,`const __case = (i: number, f: () => unknown, w: () => unknown): void =>`).replace(`.every((k) =>`,`.every((k: string) =>`),ue=`#include <cmath>
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
template <class T> std::string __learn_show(const T& v) { if constexpr (requires(std::ostream& os) { os << v; }) { std::ostringstream o; o << v; return o.str(); } else { return "(a value)"; } }`;function de(e){let t=M(e,`test`),n=M(e,`case`);switch(e.lang){case`javascript`:case`typescript`:{let r=e.lang===`typescript`,i=r?M(e,`type-error`).map(e=>`  // @ts-expect-error ${fe} ${e.i}\n  ;(() => { ${j(e.c.code)} })`):[];if(!t.length&&!n.length)return i.length?`\n;{\n${i.join(`
`)}\n}\n`:``;let a=r?`  // @ts-ignore
`:``,o=[...t.map(e=>({i:e.i,line:`${a}  __learn(${e.i}, () => (${j(e.c.expr)}))`})),...n.map(e=>({i:e.i,line:`${a}  __case(${e.i}, () => (${e.c.call}), () => (${j(e.c.expect)}))`}))].sort((e,t)=>e.i-t.i).map(e=>e.line);return`\n;{\n  ${r?le:ce}\n${o.join(`
`)}\n${i.join(`
`)}\n}\n`}case`python`:{if(!t.length&&!n.length)return``;let e=[...t.map(e=>({i:e.i,line:`__learn_test(${e.i}, lambda: (${j(e.c.expr)}))`})),...n.map(e=>({i:e.i,line:`__learn_case(${e.i}, lambda: (${e.c.call}), lambda: (${j(e.c.expect)}))`}))].sort((e,t)=>e.i-t.i).map(e=>e.line);return[``,``,`def raises(exc, fn):`,`    try:`,`        fn()`,`    except exc:`,`        return True`,`    return False`,``,`def __learn_same(a, b):`,`    if isinstance(b, bool) or b is None:`,`        return a is b`,`    return type(a) is not bool and a == b`,``,`def __learn_test(i, f):`,`    try:`,`        r = f()`,`        print("${A} %d %s %r" % (i, "PASS" if r else "FAIL", r))`,`    except Exception as e:`,`        print("${A} %d ERROR %s: %s" % (i, type(e).__name__, e))`,``,`def __learn_case(i, f, w):`,`    try:`,`        got = f()`,`        print("${A} %d %s %r" % (i, "PASS" if __learn_same(got, w()) else "FAIL", got))`,`    except Exception as e:`,`        print("${A} %d ERROR %s: %s" % (i, type(e).__name__, e))`,``,...e,``].join(`
`)}case`cpp`:return!t.length&&!n.length?``:`\n${ue}\nint main() {\n${[...t.map(e=>({i:e.i,line:`    { bool __r = (${j(e.c.expr)}); std::cout << "${A} ${e.i} " << (__r ? "PASS " : "FAIL ") << __learn_show(__r) << std::endl; }`})),...n.map(e=>({i:e.i,line:`    { auto __v = (${e.c.call}); bool __ok = (__v == (${j(e.c.expect)})); std::cout << "${A} ${e.i} " << (__ok ? "PASS " : "FAIL ") << __learn_show(__v) << std::endl; }`}))].sort((e,t)=>e.i-t.i).map(e=>e.line).join(`
`)}\n    return 0;\n}\n`;case`sql`:return`\n;\nSELECT '${A}' AS __learn;\n${M(e,`query`).map(e=>`SELECT '${A} ${e.i}' AS __learn;\n${e.c.sql.replace(/;\s*$/,``)};`).join(`
`)}\n`;case`html`:case`bash`:case`git`:return``}}var fe=`learn-type-check`;function pe(e,t){if(!t)return null;let n=[...t.matchAll(/main\.ts\((\d+),\d+\): error (TS\d+)/g)];if(!n.length)return null;let r=e.split(`
`),i=[],a=new Set;for(let[,e,t]of n){let n=Number(e)-1,o=RegExp(`// @ts-expect-error ${fe} (\\d+)`).exec(r[n]??``);if(t!==`TS2578`||!o)return null;i.push(Number(o[1])),a.add(n)}return{fails:i,program:r.map((e,t)=>a.has(t)?``:e).join(`
`)}}function me(e,t){let n=de(e);return n?t.endsWith(`
`)?t+n.replace(/^\n/,``):t+n:t}function he(e){return M(e,`dom`).map(e=>e.c.steps)}function N(e){return e.replace(/\r\n?/g,`
`).split(`
`).map(e=>e.trimEnd()).join(`
`).replace(/^\n+|\n+$/g,``)}function ge(e){let t=new Map,n=[];for(let r of e.replace(/\r\n?/g,`
`).split(`
`)){let e=se.exec(r);e?t.set(Number(e[1]),{status:e[2],...e[3]?{message:e[3]}:{}}):n.push(r)}return{clean:n.join(`
`),marks:t}}function _e(e,t){return typeof e==`number`&&typeof t==`number`?Math.abs(e-t)<=1e-9*Math.max(1,Math.abs(e),Math.abs(t)):e===t}function P(e,t,n){if(e.length!==t.length)return!1;let r=e=>JSON.stringify(e.map(e=>typeof e==`number`?Number(e.toPrecision(12)):e)),i=n?e:[...e].sort((e,t)=>r(e).localeCompare(r(t))),a=n?t:[...t].sort((e,t)=>r(e).localeCompare(r(t)));return i.every((e,t)=>e.length===a[t].length&&e.every((e,n)=>_e(e,a[t][n])))}function F(e){return e.length?e.slice(0,8).map(e=>e.map(e=>e===null?`NULL`:String(e)).join(` | `)).join(`
`)+(e.length>8?`\n… ${e.length-8} more`:``):`(no rows)`}function I(e,t=600){return e.length>t?`${e.slice(0,t)}…`:e}var L=e=>oe(ee,e),R=e=>e.replace(/^\/home\/you/,`~`);function ve(e){let t=y();for(let n of e.starter.split(`
`))n.trim()&&(t=v(t,n).state);return{...t,history:[],transcript:[]}}function ye(e,t){let n=t.trim().split(/\s+/),[r,i=``]=n,a=n.slice(2).join(` `);switch(r){case`cwd`:return e.cwd===L(i)?null:`you are in ${R(e.cwd)}, not ${R(L(i))}`;case`dir`:{let t=O(e,L(i));return t?.kind===`dir`?null:t?`${i} is a file, not a folder`:`there is no folder ${i}`}case`missing`:return O(e,L(i))?`${i} should not exist any more`:null;case`file`:{let n=O(e,L(i));if(!n)return`there is no file ${i}`;if(n.kind!==`file`)return`${i} is a folder, not a file`;if(!a)return null;let r=/^(==|contains)\s+(.*)$/.exec(a);if(!r)return`the check "${t}" could not be read`;let o=n.content.replace(/\n$/,``);return r[1]===`==`?o===r[2]?null:`${i} contains ${JSON.stringify(o)}, not ${JSON.stringify(r[2])}`:o.includes(r[2])?null:`${i} does not contain ${JSON.stringify(r[2])}`}case`ran`:{let t=n.slice(1).join(` `);return e.history.flatMap(e=>e.split(`&&`).map(e=>e.trim().replace(/\s+/g,` `))).some(e=>e===t||e.startsWith(`${t} `))?null:`you have not run ${t} yet`}case`used`:{let t=n.slice(1).join(` `);return e.history.some(e=>e.includes(t))?null:`you have not used ${t} in a command yet`}case`printed-line`:{let t=n.slice(1).join(` `);return e.transcript.some(e=>e.out.split(`
`).includes(t))?null:`nothing has printed the line ${JSON.stringify(t)} yet`}case`printed`:{let t=n.slice(1).join(` `);return e.transcript.some(e=>e.out.includes(t))?null:`nothing has printed ${JSON.stringify(t)} yet`}case`git`:{let r=ae(e,L(i)),[,,a,...o]=n;if(!r)return`${i===`.`?`~/project`:i} is not a git repository yet`;switch(a){case`repo`:return null;case`commits`:{let e=Number(o[1]);return(o[0]===`>=`?r.commits>=e:r.commits===e)?null:`the repository has ${r.commits} commit${r.commits===1?``:`s`}`}case`branch`:return r.branch===o[0]?null:`you are on ${r.branch}, not ${o[0]}`;case`has-branch`:return r.branches.includes(o[0])?null:`there is no branch ${o[0]}`;case`staged`:return r.staged.includes(o[0])?null:`${o[0]} is not staged`;case`untracked`:return r.untracked.includes(o[0])?null:`${o[0]} is not an untracked file`;case`modified`:return r.modified.includes(o[0])?null:`${o[0]} has no unstaged changes`;case`commits-on`:{let e=Number(o[2]),t=r.branchCommits[o[0]];return t===void 0?`there is no branch ${o[0]}`:(o[1]===`>=`?t>=e:t===e)?null:`${o[0]} has ${t} commit${t===1?``:`s`}`}case`merges`:{let e=Number(o[1]);return(o[0]===`>=`?r.merges>=e:r.merges===e)?null:`the history has ${r.merges} merge commit${r.merges===1?``:`s`}`}case`log`:{let e=o.slice(1).join(` `);return r.messages.some(t=>t.includes(e))?null:`no commit message contains ${JSON.stringify(e)}`}case`clean`:return r.staged.length?`still staged: ${r.staged.join(`, `)}`:null;default:return`the check "${t}" could not be read`}}default:return`the check "${t}" could not be read`}}function be(e,t,n){let{clean:r,marks:i}=ge(n.stdout),a=n.tables??[],o=new Map;if(e.lang===`sql`){let e=a.findIndex(e=>e.columns.length===1&&e.columns[0]===`__learn`&&e.rows[0]?.[0]===`@@LEARN`),t=e>=0?a.slice(e+1):[];for(let e=0;e<t.length;e++){let n=t[e],r=n.columns[0]===`__learn`?/^@@LEARN (\d+)$/.exec(String(n.rows[0]?.[0]??``)):null;if(!r)continue;let i=t[e+1],a=i&&i.columns[0]===`__learn`;o.set(Number(r[1]),i&&!a?i.rows:[])}e>=0&&(a=a.slice(0,e))}let s=new Map(M(e,`dom`).map((e,t)=>[e.i,t])),c=n.error?`Did not run — fix the error shown in the console first.`:null,l=N(r),u=e.checks.map((r,u)=>{let d={name:r.name,...r.hint?{hint:r.hint}:{}},f=(e,t={})=>({...d,status:e?`pass`:`fail`,...t});if(r.kind===`source`)return f(new RegExp(r.pattern,`m`).test(t)!==r.absent);if(r.kind===`shell`){if(!n.shell)return f(!1,{detail:`The terminal has not been used yet.`});let e=r.facts.map(e=>ye(n.shell,e)).find(e=>e!==null);return f(!e,{input:r.facts.join(`
`),...e?{actual:e}:{}})}if(r.kind===`dom`){let e=n.dom?.[s.get(u)??-1];return c?f(!1,{input:r.steps.join(`
`),detail:c}):e?f(e.pass,{input:r.steps.join(`
`),...e.detail?{actual:e.detail}:{}}):f(!1,{input:r.steps.join(`
`),detail:`The page did not finish loading, so this was not checked.`})}if(r.kind===`type-error`){if(c)return f(!1,{input:r.code,detail:c});let e=n.typeFails?.includes(u);return f(!e,{input:r.code,expected:`a type error`,actual:e?`it type-checks`:`a type error`,...e?{detail:`The compiler accepts this, so the type still lets it through. Tighten the type until this line is rejected.`}:{}})}if(c){let t=r.kind===`case`?r.call:r.kind===`test`?j(r.expr):r.kind===`query`?r.sql:e.stdin?.trim();return f(!1,{detail:c,...t?{input:t}:{}})}switch(r.kind){case`output`:{let t=N(r.expect);return f(t===l,{input:e.stdin?.trim()||`(no input)`,expected:I(t),actual:I(l)||`(nothing printed)`})}case`includes`:{let e=r.expect.filter(e=>!l.includes(N(e)));return f(!e.length,{expected:r.expect.join(`
`),actual:I(l)||`(nothing printed)`,...e.length?{detail:`Not in the output: ${e.map(e=>`“${e}”`).join(`, `)}`}:{}})}case`test`:case`case`:{let e=i.get(u),t=r.kind===`case`?r.call:j(r.expr),n=r.kind===`case`?r.expect:`true`;return e?e.status===`ERROR`?f(!1,{input:t,expected:n,actual:e.message??`an error`}):f(e.status===`PASS`,{input:t,expected:n,actual:e.message??``}):f(!1,{input:t,expected:n,detail:`This check never ran: the program stopped before it got there.`})}case`result`:{let e=a[a.length-1],t=F(r.rows)+(r.ordered?`
(in this order)`:``);return e?f(P(r.rows,e.rows,r.ordered),{expected:t,actual:F(e.rows)}):f(!1,{expected:t,actual:`(no rows)`,detail:`Your SQL did not return any rows. The last statement should be a SELECT.`})}case`query`:{let e=o.get(u);if(!e)return f(!1,{input:r.sql,detail:`This check never ran.`});if(/^\s*EXPLAIN\s+QUERY\s+PLAN\b/i.test(r.sql)){let t=e=>e.map(e=>[e[e.length-1]??null]);return f(P(t(r.rows),t(e),!0),{input:r.sql,expected:F(t(r.rows)),actual:F(t(e))})}return f(P(r.rows,e,!0),{input:r.sql,expected:F(r.rows),actual:F(e)})}}});return{passed:u.every(e=>e.status===`pass`),results:u,output:r.replace(/\n+$/,e.lang===`sql`?``:`
`).replace(/^\n$/,``),stderr:n.stderr,error:n.error,tables:a,ms:n.ms}}var xe='@track bash\n@title Terminal\n@name Linux and the command line\n@blurb The command line every developer lives in: moving around, making, reading and changing files, without a mouse.\n\n=== term-01 | Where am I?\n--- teach\nThe **terminal** is a way to talk to your computer in text. You type a **command**, press Enter, and it answers.\n\nThe line before your cursor is the **prompt**: `~/project $` means you are in a folder called `project` inside your home folder (`~`). Two commands you will use every day:\n\n- `pwd` — **p**rint **w**orking **d**irectory: the full path of the folder you are in.\n- `ls` — **l**i**s**t what is in it. Folders show with a `/` at the end.\n\nThis terminal is a practice one: it lives in the page, so nothing you type can touch your real files.\n--- task\nRun `pwd` to see where you are, then `ls` to see what is in this folder.\n--- starter\nmkdir src\ntouch README.md\n--- solution\npwd\nls\n--- hint\nType `pwd` and press Enter. Then type `ls` and press Enter.\n--- check shell | You printed where you are\nran pwd\nprinted /home/you/project\n--- check shell | You listed the folder\nran ls\nprinted README.md\n\n=== term-02 | Making folders and moving into them\n--- teach\n`mkdir name` **m**a**k**es a **dir**ectory (a folder). `cd name` **c**hanges **d**irectory — it moves you into it, and the prompt changes to show where you are.\n\n```\n~/project $ mkdir notes\n~/project $ cd notes\n~/project/notes $\n```\n\n`cd ..` goes back up one level, and `cd` on its own takes you home.\n--- task\nMake a folder called `notes` and move into it.\n--- starter\n--- solution\nmkdir notes\ncd notes\n--- hint\nFirst `mkdir notes`, then `cd notes`.\n--- check shell | The notes folder exists\ndir notes\n--- check shell | You are inside it\ncwd notes\n\n=== term-03 | Files: create, write, read\n--- teach\n`touch name` makes an empty file. To put text in a file, `echo` it and **redirect** the output with `>`:\n\n```\necho "Launch at dawn" > plan.txt\n```\n\n`echo` prints its text; `> plan.txt` sends that text into the file instead of the screen. Careful: `>` **replaces** whatever the file held.\n\nPut the text in double quotes. The quotes keep it together as one piece, and stop characters such as `>` or `&` inside it from being read as part of the command.\n\n`cat plan.txt` prints a file\'s contents, so you can check what you wrote.\n--- task\nCreate `hello.txt` containing exactly `Hello, terminal!`, then show it with `cat`.\n--- starter\n--- solution\necho "Hello, terminal!" > hello.txt\ncat hello.txt\n--- hint\nPut the text in quotes: `echo "Hello, terminal!" > hello.txt`.\n--- hint\nThen `cat hello.txt`.\n--- check shell | hello.txt holds the greeting\nfile hello.txt == Hello, terminal!\n--- check shell | You read it back with cat\nran cat\nprinted Hello, terminal!\n\n=== term-04 | Paths\n--- teach\nA **path** says where something is. `docs/guides` means "the `guides` folder inside `docs`, inside where I am now" — a **relative** path. `..` means "the folder above", so `../..` is two levels up. `~` is your home folder, and a path starting with `/` is **absolute**: it starts from the very top.\n\nAn option that starts with `-`, like the `-p` below, is a **flag**: it changes how a command behaves. `mkdir -p` makes every folder along a path at once, so you do not need one `mkdir` per level:\n\n```\nmkdir -p src/components/buttons\ncd src/components\ncd ../..\n```\n--- task\nWith one command, make the folders `docs/guides`. Move into `docs/guides`, then come back up to `project` using `..`.\n--- starter\n--- solution\nmkdir -p docs/guides\ncd docs/guides\ncd ../..\n--- hint\n`mkdir -p docs/guides` makes both folders.\n--- hint\nFrom `docs/guides`, two levels up is `cd ../..`.\n--- check shell | docs/guides exists\ndir docs/guides\n--- check shell | You went into it\nran cd docs/guides\n--- check shell | You came back up with ..\nused ..\ncwd .\n\n=== term-05 | Copying and moving\n--- teach\n`cp source destination` **c**o**p**ies a file. `mv source destination` **m**o**v**es it — and because moving a file to a new name in the same folder is renaming, `mv` is also how you rename:\n\n```\ncp report.txt report-backup.txt\nmv report.txt final-report.txt\n```\n\nIf the destination is a folder, the file goes inside it with the same name: `mv notes.txt archive/`. Copying a whole folder needs `cp -r` (**r**ecursive).\n--- task\nThere is a file called `draft.txt`. Copy it to `backup.txt`, then rename `draft.txt` to `final.txt`.\n--- starter\necho "Our first mission plan" > draft.txt\n--- solution\ncp draft.txt backup.txt\nmv draft.txt final.txt\n--- hint\n`cp draft.txt backup.txt` first; then `mv draft.txt final.txt`.\n--- check shell | backup.txt is a copy\nfile backup.txt == Our first mission plan\n--- check shell | draft.txt is now final.txt\nfile final.txt == Our first mission plan\nmissing draft.txt\n\n=== term-06 | Deleting\n--- teach\n`rm file` **r**e**m**oves a file. There is no bin to get it back from, so read the command before you press Enter.\n\nA folder needs `rm -r folder`: `-r` removes it and everything inside it. (`rmdir` only removes a folder that is already empty.)\n\n```\nrm old-notes.txt\nrm -r build\n```\n--- task\nDelete the file `junk.txt` and the whole `old` folder (it has files inside). Leave `keep.txt` alone.\n--- starter\ntouch junk.txt\ntouch keep.txt\nmkdir -p old/logs\necho "stale" > old/logs/app.log\n--- solution\nrm junk.txt\nrm -r old\n--- hint\n`rm junk.txt` for the file, `rm -r old` for the folder.\n--- check shell | junk.txt is gone\nmissing junk.txt\n--- check shell | old/ and everything in it is gone\nmissing old\n--- check shell | keep.txt is still there\nfile keep.txt\n\n=== term-07 | Looking inside files\n--- teach\nReal files can be long, so there are commands that show just part of one:\n\n- `head -n 3 file` — the first 3 lines. `tail -n 3 file` — the last 3.\n- `wc -l file` — **w**ord **c**ount; with `-l`, how many **l**ines.\n- `grep text file` — only the lines that contain `text`. Add `-i` to ignore case, `-n` to show line numbers.\n\n`grep` is how developers dig through logs: `grep ERROR server.log` pulls every error out of thousands of lines.\n--- task\n`launch.log` is the log from a test launch. Count its lines with `wc -l`, then use `grep` to show only the lines containing `ERROR`.\n--- starter\necho "09:00 INFO systems check" > launch.log\necho "09:01 INFO fuel loaded" >> launch.log\necho "09:02 ERROR valve 3 stuck" >> launch.log\necho "09:03 INFO valve 3 reset" >> launch.log\necho "09:04 ERROR telemetry dropout" >> launch.log\necho "09:05 INFO liftoff" >> launch.log\n--- solution\nwc -l launch.log\ngrep ERROR launch.log\n--- hint\n`wc -l launch.log` counts the lines.\n--- hint\n`grep ERROR launch.log` prints only the error lines.\n--- check shell | You counted the lines\nran wc -l\nprinted 6 launch.log\n--- check shell | You found both errors\nran grep\nprinted 09:02 ERROR valve 3 stuck\nprinted 09:04 ERROR telemetry dropout\n\n=== term-08 | Chaining and appending\n--- teach\n`&&` joins two commands: the second runs only if the first worked. It is how you write a sequence on one line:\n\n```\nmkdir build && cd build\n```\n\n`>>` is like `>`, but it **adds** to the end of the file instead of replacing it:\n\n```\necho "first" > list.txt\necho "second" >> list.txt\n```\n--- task\nIn a single line, make a folder `logs` and move into it using `&&`. Then build `todo.txt` with two lines, `buy fuel` then `check engines`, using `>` for the first and `>>` for the second.\n--- starter\n--- solution\nmkdir logs && cd logs\necho "buy fuel" > todo.txt\necho "check engines" >> todo.txt\n--- hint\n`mkdir logs && cd logs` does both steps.\n--- hint\n`echo "buy fuel" > todo.txt`, then `echo "check engines" >> todo.txt`.\n--- check shell | You used && to make and enter logs\nused &&\ndir logs\ncwd logs\n--- check shell | todo.txt has both lines, in order\nfile logs/todo.txt contains buy fuel\nfile logs/todo.txt contains check engines\nused >>\n\n=== term-09 | Hidden files, and the long listing\n--- teach\nA file or folder whose name starts with a dot is **hidden**: plain `ls` skips it. Settings live in files like that — `.env`, `.gitignore`, `.config` — so you need to be able to see them.\n\n- `ls -a` shows **a**ll of them, hidden ones included (plus `.` for this folder and `..` for the one above).\n- `ls -l` is the **l**ong listing: one line per entry, with whether it is a folder (`d`) or a file (`-`), and its size.\n\nFlags combine: `ls -la` is both at once.\n--- task\nSomething in this folder is hidden. Find it with `ls -a`, then look at the sizes with `ls -l`.\n--- starter\necho "API_KEY=demo" > .env\nmkdir src\necho "print(\'hi\')" > main.py\n--- solution\nls -a\nls -l\n--- hint\n`ls -a` shows the hidden file.\n--- hint\n`ls -l` shows one line per file, starting with `-rw-r--r--` for files.\n--- check shell | You found the hidden file\nprinted .env\n--- check shell | You used the long listing\nprinted -rw-r--r--\n\n=== term-10 | Getting home, and back again\n--- teach\nDeep in a project, three shortcuts save a lot of typing:\n\n- `cd ~` (or just `cd`) jumps straight to your **home** folder, wherever you are.\n- `cd -` jumps back to wherever you were **before** the last `cd`.\n- An **absolute** path works from anywhere: `cd /home/you/project`.\n\nRun `pwd` whenever you want to be sure where you have landed.\n--- task\nYou are three folders deep, in `src/app/components`. Jump to your home folder, check with `pwd` that you are there, then come straight back with `cd -`.\n--- starter\nmkdir -p src/app/components\ncd src/app/components\n--- solution\ncd ~\npwd\ncd -\n--- hint\n`cd ~` goes home; `pwd` then prints `/home/you`.\n--- hint\n`cd -` takes you back to `src/app/components` in one step.\n--- check shell | You checked that you were home\nprinted-line /home/you\n--- check shell | You came back with cd -\nran cd -\ncwd src/app/components\n',Se=`@track cpp
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

The return type comes first, then the name, then the typed **parameters** (\`a\` and \`b\`). The values a call passes in — \`2\` and \`3\` in \`add(2, 3)\` — are the **arguments**.

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

\`<cctype>\` has helpers for single characters: \`std::toupper(c)\`, \`std::isspace(c)\`, \`std::isdigit(c)\`. They take and return an \`int\`, not a \`char\`, so convert on the way in and out: \`static_cast<char>(std::toupper(static_cast<unsigned char>(c)))\`. The \`unsigned char\` step matters for letters outside plain English (like \`é\`), which a \`char\` can hold as a negative number the helpers are not allowed to receive.
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
\`out += static_cast<char>(std::toupper(static_cast<unsigned char>(c)));\` appends one uppercase character.
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

The checks in this lesson are written as \`[] { …; return …; }()\`. That is a **lambda** — a small unnamed function — defined and called on the spot, so a check can set up variables, call your function and test the result. You will write lambdas yourself later; here you only need to read them.
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
`,Ce=`@track git
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
`,we=`@track html
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
<form>
  <label for="email">Email</label>
  <input id="email" type="email" placeholder="you@example.com">
  <button type="submit">Sign up</button>
</form>
\`\`\`

A \`form\` wraps the fields that belong together. \`type\` changes the field: \`text\`, \`email\`, \`password\`, \`number\`, \`checkbox\`… \`placeholder\` is grey example text that disappears when you type. A \`button\` is what people press.
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

The JavaScript in that example, piece by piece:

- \`const button = …\` makes a **variable**: a name for a value, here the element found on the page. Use \`const\` for a name that will always mean the same thing, and \`let\` for one you will change later: \`let n = 0\`, then \`n = n + 1\`.
- \`() => { … }\` is an **arrow function**: a block of code saved to run later. Handing it to \`addEventListener\` means "run this every time the button is clicked", not "run it now".
- \`'Lift off!'\` is a **string** — text in quotes, single or double.
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

Two string tools do the work here. \`+\` joins strings together: \`'Hello, ' + 'Ada'\` is \`'Hello, Ada'\`, and a number joined to a string becomes text, so \`18 + ' left'\` is \`'18 left'\`. \`.length\` is how many characters a string holds: \`'rocket'.length\` is \`6\` (no brackets — it is a value, not a call). Use brackets to do the arithmetic first: \`(20 - 6) + ' left'\`.
--- task
Make a character counter: an \`input\` with \`id="message"\` and a paragraph with \`id="left"\`. As you type, \`#left\` should say how many of 20 characters are left, like \`17 left\`. Before any typing it says \`20 left\`.
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

\`['Ada', 'Lin', 'Sam']\` is an **array**: several values in order, inside square brackets. \`for (const name of crew) { … }\` is a **\`for…of\` loop**: it runs the block once for each item, with \`name\` holding the current one — \`'Ada'\`, then \`'Lin'\`, then \`'Sam'\`.

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
`,Te=`@track javascript
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

When you only need to choose between two **values**, the **ternary** operator does it in one expression — \`condition ? valueIfTrue : valueIfFalse\`:

\`\`\`js
const temperature = 31
const label = temperature > 30 ? 'hot' : 'not hot'   // 'hot'
\`\`\`

Use it for a simple either-or; for three or more outcomes, \`if\` / \`else if\` reads better.
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

\`while (condition) { … }\` repeats while the condition is true — make sure something inside changes, or it never stops. Inside any loop, \`break\` leaves the loop early and \`continue\` skips straight to the next pass.
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

\`a\` and \`b\` are the function's **parameters** — the names it gives its inputs. The values you pass when you call it, like \`2\` and \`3\` in \`add(2, 3)\`, are the **arguments**. \`return\` hands a value back to whoever called the function.

Parameters can have defaults: \`function greet(name, mark = '!') { … }\`. A function with no \`return\` gives back \`undefined\`. Functions are values: you can pass them to other functions, which is how most of JavaScript works.

\`split\` cuts a string into an array of pieces. \`/\\s+/\` is a **pattern** (a regular expression) meaning "one or more whitespace characters", so \`'a  b c'.split(/\\s+/)\` is \`['a', 'b', 'c']\` however many spaces sit between the words.
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

To give back several named results at once, return an **object** — named values in braces (the next lesson covers objects properly):

\`\`\`js
function range(values) {
  return { low: Math.min(...values), high: Math.max(...values) }
}
range([4, 9, 2]).high   // 9
\`\`\`

\`...values\` **spreads** the array into separate arguments, so \`Math.min(...[4, 9, 2])\` is \`Math.min(4, 9, 2)\`.
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

Reading a property that is not there gives \`undefined\`. The \`??\` operator supplies a fallback for that: \`a ?? b\` is \`a\`, unless \`a\` is \`null\` or \`undefined\`, in which case it is \`b\`. So \`user.nickname ?? user.name\` is the name when there is no nickname — and \`(counts[word] ?? 0) + 1\` starts a missing count at 0.

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
`,Ee=`@track python
@level advanced
@title Python · Advanced
@name Python, advanced: iterators, decorators, data models and algorithms
@blurb Learn how Python works underneath (iterators, generators, decorators, context managers, special methods) and the algorithmic thinking (recursion, dynamic programming, big-O, search) that turns slow code into code that finishes.

=== py3-01 | Iterators and the iterator protocol
--- teach
The intermediate course taught you to write Python the way experienced people do. This course opens the hood: how Python's own features work underneath, so you can build your own, and the algorithms that decide whether code finishes at all.

Every \`for\` loop in Python runs on one small agreement called the **iterator protocol**. Once you know it, generators, files, \`zip\`, \`range\` and dict views stop being magic.

There are two roles:

- An **iterable** is anything you can loop over. It has an \`__iter__\` method that returns an iterator. Lists, strings, dicts and ranges are iterables.
- An **iterator** is the thing that hands out values one at a time. It has \`__next__\`, which returns the next value or raises \`StopIteration\` when there are none left. An iterator's \`__iter__\` returns itself.

You can drive the protocol by hand with the built-ins \`iter()\` and \`next()\`:

\`\`\`python
it = iter([10, 20])
next(it)      # 10
next(it)      # 20
# next(it)    -> StopIteration
\`\`\`

A \`for\` loop is exactly this, done for you:

\`\`\`python
# for x in things: body     is roughly:
it = iter(things)
while True:
    try:
        x = next(it)
    except StopIteration:
        break
    body
\`\`\`

**Why the two roles?** An iterator remembers *where it is*, so it can only be walked once. An iterable can hand out a *fresh* iterator each time, so you can loop over it again and again, and even have two loops over it at once.

\`\`\`python
class Squares:                      # an iterable
    def __init__(self, n):
        self.n = n
    def __iter__(self):
        return SquaresIterator(self.n)

class SquaresIterator:              # its iterator
    def __init__(self, n):
        self.i = 0
        self.n = n
    def __iter__(self):
        return self
    def __next__(self):
        if self.i >= self.n:
            raise StopIteration
        self.i += 1
        return self.i * self.i

list(Squares(3))    # [1, 4, 9]
list(Squares(3))    # [1, 4, 9]   again: a fresh iterator each time
\`\`\`

**Common mistake:** writing a class whose \`__iter__\` returns \`self\` and then being surprised that the second loop is empty. That class is an iterator, and iterators are one-shot.
--- task
Write two classes:

- \`CountdownIterator(n)\`, an **iterator** producing \`n, n-1, ..., 1\`, then raising \`StopIteration\`. Its \`__iter__\` returns itself.
- \`Countdown(n)\`, an **iterable** whose \`__iter__\` returns a new \`CountdownIterator\` each time, so it can be looped over more than once.
--- starter
class CountdownIterator:
    def __init__(self, n):
        self.n = n


class Countdown:
    def __init__(self, n):
        self.n = n
--- solution
class CountdownIterator:
    def __init__(self, n):
        self.current = n

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value


class Countdown:
    def __init__(self, n):
        self.n = n

    def __iter__(self):
        return CountdownIterator(self.n)
--- hint
The iterator needs a counter that \`__next__\` moves down. When it reaches 0, \`raise StopIteration\`.
--- hint
Remember to return the value *before* you move the counter, or you will skip \`n\`.
--- hint
\`Countdown.__iter__\` is one line: \`return CountdownIterator(self.n)\`.
--- check case | Countdown(3) produces 3, 2, 1
list(Countdown(3))
=> [3, 2, 1]
--- check case | Countdown(0) produces nothing
list(Countdown(0))
=> []
--- check test | A Countdown can be looped over twice
(lambda c: list(c) == [2, 1] and list(c) == [2, 1])(Countdown(2))
?? Countdown.__iter__ must return a brand new CountdownIterator each time.
--- check test | The iterator returns itself from iter()
(lambda it: iter(it) is it)(CountdownIterator(2))
--- check test | The iterator is used up after one pass
(lambda it: (next(it), next(it)) == (2, 1) and raises(StopIteration, lambda: next(it)) and list(it) == [])(CountdownIterator(2))
--- check case | Works with anything that loops: sum
sum(Countdown(100))
=> 5050

=== py3-02 | Generators and pipelines
--- teach
Writing an iterator class by hand is a lot of ceremony. A **generator function** does the same job in a few lines: any function containing \`yield\` returns a generator, which is an iterator.

\`\`\`python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

g = countdown(3)
next(g)        # 3
list(g)        # [2, 1]
\`\`\`

Each \`yield\` hands out one value and **pauses** the function, local variables and all. The next \`next()\` resumes right after the \`yield\`. When the function returns, the generator raises \`StopIteration\` for you.

**Why this matters: laziness.** A generator produces values only when asked. It can walk a million-line log without holding it in memory, and it can even be endless:

\`\`\`python
from itertools import count
def evens():
    for n in count():
        if n % 2 == 0:
            yield n
\`\`\`

**Pipelines.** Because each generator takes an iterable and yields values, you can chain small stages together, like pipes in a shell. Each stage does one job, and values flow through one at a time:

\`\`\`python
def non_blank(lines):
    for line in lines:
        if line.strip():
            yield line.strip()

def as_ints(lines):
    for line in lines:
        yield int(line)

lines = ["3", "", "4", "  5 "]
sum(as_ints(non_blank(lines)))    # 12
\`\`\`

A **generator expression** is a comprehension with round brackets: \`(x * x for x in nums)\`. It is lazy too, and passing one straight into \`sum(...)\` or \`max(...)\` avoids building a list.

**Common mistakes.** Calling a generator function runs *none* of its body; it only makes the generator. So errors inside show up later, when you first ask for a value. And a generator is an iterator, so it is used up after one pass.
--- task
Write three generator functions:

- \`read_numbers(lines)\` yields the integer on each line, after stripping. It skips blank lines, lines starting with \`#\`, and lines that are not whole numbers.
- \`running_total(nums)\` yields the running total after each number.
- \`take(n, items)\` yields the first \`n\` items of any iterable, **including an endless one**, then stops.

All three must be lazy: they must not read more input than they need.
--- starter
def read_numbers(lines):
    return [int(line) for line in lines]


def running_total(nums):
    return []


def take(n, items):
    return list(items)[:n]
--- solution
def read_numbers(lines):
    for line in lines:
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        try:
            yield int(line)
        except ValueError:
            continue


def running_total(nums):
    total = 0
    for n in nums:
        total += n
        yield total


def take(n, items):
    if n <= 0:
        return
    for i, item in enumerate(items, start=1):
        yield item
        if i >= n:
            return
--- hint
Each function is a \`for\` loop with a \`yield\` inside. \`continue\` skips a line in \`read_numbers\`.
--- hint
Put only \`int(line)\` in \`try\` / \`except ValueError\`, and \`yield\` the result when it works.
--- hint
In \`take\`, stop with \`return\` as soon as you have yielded \`n\` items. Do not check for more first, or you will read one item too many. Handle \`n <= 0\` before the loop.
--- check case | read_numbers skips blanks, comments and junk
list(read_numbers(["10", "  ", "# total", " -4 ", "abc", "3.5", "7"]))
=> [10, -4, 7]
--- check test | read_numbers is a generator
__import__("inspect").isgeneratorfunction(read_numbers)
--- check test | read_numbers is lazy: it does not read past what you ask for
next(read_numbers(__import__("itertools").chain(["5"], (str(1 // 0) for _ in "x")))) == 5
?? Yield each number as soon as you have it, instead of building a list first.
--- check case | running_total
list(running_total([3, 1, 4, 1, 5]))
=> [3, 4, 8, 9, 14]
--- check case | take the first 5 running totals of the endless 1, 2, 3, ...
list(take(5, running_total(__import__("itertools").count(1))))
=> [1, 3, 6, 10, 15]
--- check test | take never reads one item too many
(lambda it: list(take(2, it)) == [0, 1] and next(it) == 2)(iter(range(10)))
--- check case | take(0, ...) is empty
list(take(0, __import__("itertools").count()))
=> []
--- check case | take more than there is
list(take(10, "abc"))
=> ["a", "b", "c"]

=== py3-03 | Debugging: the iterator that ran dry
--- teach
Some bugs make no sense until you know what to suspect. This one produces no error at all: a value that should be there is simply empty.

**Reproduce and shrink.** Cut the program down to the fewest lines that still show the wrong result:

\`\`\`python
nums = (n for n in [3, 1, 2])
print(max(nums))    # 3
print(sorted(nums)) # []    <- where did the numbers go?
\`\`\`

**Check your assumptions.** The hidden assumption is "\`nums\` is a collection of numbers". It is not. It is a *generator*: a one-shot iterator. \`max\` walked it to the end, and there is nothing left for \`sorted\`. The same is true of \`zip(...)\`, \`map(...)\`, \`filter(...)\`, \`enumerate(...)\`, \`reversed(...)\`, an open file, and anything a generator function returns.

**Inspect, carefully.** \`type(nums)\` tells you what you have. But beware: *printing* \`list(nums)\` to see the values uses the iterator up, so adding a debug print can change what the program does. That is a classic "heisenbug", a bug that changes when you look at it. Print the type, not the contents, or make a list first.

**Fix the cause.** If you need the values more than once, turn them into a list *once*, where they are created:

\`\`\`python
nums = [n for n in [3, 1, 2]]     # or list(generator)
max(nums), sorted(nums)           # (3, [1, 2, 3])
\`\`\`

If the data is too large for a list, restructure so you only need one pass (compute both results in one loop), or create a fresh iterator for each pass.
--- task
**Bug report:** \`summary(lines)\` should return \`(how many non-blank lines, the longest one)\` but the longest is always \`""\`. \`standings(names, points)\` should return \`(the leader's name, every name sorted by points, highest first)\` but the list is always empty.

Find out why and fix both. Keep the functions' results exactly as described; \`summary([])\` is \`(0, "")\`.
--- starter
def load(lines):
    return (line.strip() for line in lines if line.strip())


def summary(lines):
    records = load(lines)
    count = sum(1 for _ in records)
    longest = max(records, key=len, default="")
    return count, longest


def standings(names, points):
    pairs = zip(names, points)
    leader = max(pairs, key=lambda p: p[1])[0]
    ranked = [name for name, _ in sorted(pairs, key=lambda p: -p[1])]
    return leader, ranked
--- solution
def load(lines):
    return (line.strip() for line in lines if line.strip())


def summary(lines):
    records = list(load(lines))
    count = len(records)
    longest = max(records, key=len, default="")
    return count, longest


def standings(names, points):
    pairs = list(zip(names, points))
    leader = max(pairs, key=lambda p: p[1])[0]
    ranked = [name for name, _ in sorted(pairs, key=lambda p: -p[1])]
    return leader, ranked
--- hint
Print \`type(records)\` inside \`summary\`. What kind of object is it, and how many times can you loop over it?
--- hint
\`zip(...)\` returns an iterator as well. \`max\` used it up before \`sorted\` got its turn.
--- hint
Make each one a list where it is created: \`list(load(lines))\` and \`list(zip(names, points))\`.
--- check case | summary counts and finds the longest line
summary(["a", "  bbb ", "", "cc"])
=> (3, "bbb")
--- check case | summary of nothing
summary([])
=> (0, "")
--- check case | standings finds the leader and ranks everyone
standings(["ada", "lin", "sam"], [7, 12, 9])
=> ("lin", ["lin", "sam", "ada"])
--- check case | Equal points keep their original order
standings(["x", "y", "z"], [5, 5, 1])
=> ("x", ["x", "y", "z"])

=== py3-04 | Decorators
--- teach
In Python, functions are values. You can pass a function to another function, and return one from it. A **decorator** is a function that takes a function and returns a new function that wraps it, adding behaviour before or after.

\`\`\`python
import functools

def shout(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper

@shout
def greet(name):
    return f"hello, {name}"

greet("ada")        # 'HELLO, ADA'
\`\`\`

The \`@shout\` line is only shorthand for \`greet = shout(greet)\`: the name \`greet\` now points at \`wrapper\`, which calls the original.

Three details matter:

- **\`*args, **kwargs\`** in the wrapper pass every argument through unchanged, so the decorator works on any function.
- **\`return\`** the original's result, or the decorated function will quietly return \`None\`.
- **\`functools.wraps(func)\`** copies the original's name, docstring and other details onto the wrapper. Without it, \`greet.__name__\` is \`'wrapper'\`, which confuses error messages, debuggers and any tool that looks functions up by name.

A wrapper can keep state as an attribute on itself, since functions are objects too: \`wrapper.calls = 0\`.

**Decorators with arguments** need one more layer. \`@repeat(3)\` first *calls* \`repeat(3)\`, which must return the actual decorator:

\`\`\`python
def repeat(times):              # takes the settings
    def decorator(func):        # takes the function
        @functools.wraps(func)
        def wrapper(*args, **kwargs):   # takes the call's arguments
            return [func(*args, **kwargs) for _ in range(times)]
        return wrapper
    return decorator

@repeat(3)
def roll():
    return 4

roll()     # [4, 4, 4]
\`\`\`

A function defined inside another function can keep using the outer function's variables even after the outer one has returned. The inner function together with the variables it remembers is called a **closure**. Each layer here closes over the variables of the layer outside it, which is how \`wrapper\` still knows \`times\` and \`func\` long after \`repeat\` returned.

**Common mistake:** writing \`@repeat\` without brackets for a decorator that takes arguments. Python then passes the function in as \`times\`, and things go wrong far from the cause.
--- task
Write two decorators, both using \`functools.wraps\`:

- \`count_calls(func)\`: the returned function has an attribute \`calls\`, starting at \`0\` and going up by one on every call. It returns whatever \`func\` returns.
- \`retry(times)\`: a decorator with an argument. The decorated function is tried up to \`times\` times in total. If a try raises an exception, it tries again; if every try fails, the last exception is raised. As soon as a try succeeds, its result is returned.
--- starter
import functools


def count_calls(func):
    return func


def retry(times):
    def decorator(func):
        return func
    return decorator
--- solution
import functools


def count_calls(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return func(*args, **kwargs)

    wrapper.calls = 0
    return wrapper


def retry(times):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except Exception:
                    if attempt == times:
                        raise
        return wrapper
    return decorator
--- hint
In \`count_calls\`, set \`wrapper.calls = 0\` after defining \`wrapper\`, and add one inside it before calling \`func\`.
--- hint
\`retry\` has three levels: \`retry(times)\` returns \`decorator(func)\`, which returns \`wrapper(*args, **kwargs)\`.
--- hint
In the wrapper, loop over the attempts with \`return func(...)\` inside \`try\`. In \`except\`, a bare \`raise\` re-raises the current exception; do that only on the last attempt.
--- check test | count_calls counts every call
(lambda f: (f(1), f(2), f(3), f.calls)[3] == 3)(count_calls(lambda x: x))
--- check test | A new decorated function starts at 0
count_calls(lambda: 1).calls == 0
--- check case | count_calls passes arguments through and returns the result
count_calls(lambda a, b=1: a + b)(1, b=5)
=> 6
--- check test | Both decorators keep the original's name (functools.wraps)
count_calls(len).__name__ == "len" and retry(2)(len).__name__ == "len"
?? Put @functools.wraps(func) on the wrapper.
--- check case | retry succeeds on the third try
retry(3)((lambda seq: lambda: next(seq)())(iter([lambda: 1 / 0, lambda: 1 / 0, lambda: "ok"])))()
=> "ok"
--- check test | retry gives up after \`times\` tries and raises the last error
raises(ZeroDivisionError, retry(2)((lambda seq: lambda: next(seq)())(iter([lambda: 1 / 0, lambda: 1 / 0, lambda: "ok"]))))
--- check test | retry stops as soon as a try succeeds
(lambda log: (retry(5)(lambda: log.append(1) or len(log))(), log)[1] == [1])([])
--- check case | retry passes arguments through
retry(1)(lambda a, b: a * b)(6, b=7)
=> 42

=== py3-05 | Context managers
--- teach
\`with\` guarantees that clean-up happens, whatever happens inside the block:

\`\`\`python
with open("notes.txt", "w") as f:
    f.write("hi")
# the file is closed here, even if write() had raised
\`\`\`

(\`open(name, "w")\` opens a file for writing; the \`with\` block closes it again.)

Any object can work with \`with\` if it has two methods. The statement

\`\`\`python
with manager as value:
    body
\`\`\`

does roughly this:

\`\`\`python
value = manager.__enter__()
try:
    body
except BaseException as e:
    if not manager.__exit__(type(e), e, e.__traceback__):
        raise                   # __exit__ returned false: let it propagate
else:
    manager.__exit__(None, None, None)
\`\`\`

So \`__enter__\` sets things up and returns what \`as\` binds. \`__exit__\` receives the exception (or three \`None\`s if there was none), cleans up, and **returns True to swallow the exception**, or anything false to let it carry on.

\`\`\`python
class Tag:
    def __init__(self, name):
        self.name = name
    def __enter__(self):
        print(f"<{self.name}>")
        return self
    def __exit__(self, exc_type, exc, tb):
        print(f"</{self.name}>")
        return False          # never hide errors
\`\`\`

**The shortcut: \`contextlib.contextmanager\`.** For most cases, write a generator that yields once. Code before the \`yield\` is \`__enter__\`, code after it is \`__exit__\`, and an exception in the block is raised *at the \`yield\`*:

\`\`\`python
from contextlib import contextmanager

@contextmanager
def tag(name):
    print(f"<{name}>")
    try:
        yield
    finally:
        print(f"</{name}>")
\`\`\`

**Common mistake:** leaving out \`try\` / \`finally\` around the \`yield\`. It works while nothing goes wrong, and silently skips the clean-up the first time something does, which is exactly when clean-up matters.

One tool the task needs: \`del settings[key]\` removes a key (and its value) from a dict.
--- task
Write two context managers:

- A class \`Suppress(*exc_types)\`. Inside its block, exceptions of any of the given types (including their subclasses) are swallowed and stored in \`self.caught\`; any other exception passes through. \`self.caught\` is \`None\` if nothing was caught. \`__enter__\` returns the manager itself.
- With \`@contextmanager\`, \`temp_setting(settings, key, value)\`: inside the block, \`settings[key]\` is \`value\`. Afterwards, the old value is put back, or the key is removed if it was not there before. This must happen **even if the block raises**, and the exception must not be swallowed.
--- starter
from contextlib import contextmanager


class Suppress:
    def __init__(self, *exc_types):
        self.exc_types = exc_types


@contextmanager
def temp_setting(settings, key, value):
    settings[key] = value
    yield
--- solution
from contextlib import contextmanager


class Suppress:
    def __init__(self, *exc_types):
        self.exc_types = exc_types
        self.caught = None

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        if exc_type is not None and issubclass(exc_type, self.exc_types):
            self.caught = exc
            return True
        return False


_MISSING = object()


@contextmanager
def temp_setting(settings, key, value):
    old = settings.get(key, _MISSING)
    settings[key] = value
    try:
        yield
    finally:
        if old is _MISSING:
            del settings[key]
        else:
            settings[key] = old
--- hint
\`__exit__\` gets \`exc_type\` as \`None\` when nothing went wrong. Test that before calling \`issubclass(exc_type, self.exc_types)\` (a tuple of types works there).
--- hint
Remember the old value before changing it. \`None\` could be a real value, so use a unique marker object for "was not there".
--- hint
Wrap the \`yield\` in \`try:\` / \`finally:\` and restore (or \`del\`) in the \`finally\`.
--- check test | Suppress works in a real with block
(lambda g: (exec("with Suppress(ZeroDivisionError) as s:\\n    1 / 0\\n", g), type(g["s"].caught) is ZeroDivisionError)[1])(dict(globals()))
--- check test | __enter__ returns the manager, and a listed error is swallowed
(lambda s: s.__enter__() is s and bool(s.__exit__(KeyError, KeyError("k"), None)))(Suppress(KeyError, IndexError))
--- check test | The caught exception is stored
(lambda s, e: (s.__enter__(), s.__exit__(IndexError, e, None), s.caught is e)[2])(Suppress(KeyError, IndexError), IndexError("i"))
--- check test | Subclasses are caught too
bool(Suppress(LookupError).__exit__(KeyError, KeyError("k"), None))
--- check test | Other errors pass through
not Suppress(KeyError).__exit__(ValueError, ValueError("v"), None)
--- check test | With no error, caught stays None
(lambda s: (s.__enter__(), s.__exit__(None, None, None), s.caught)[2] is None)(Suppress(KeyError))
--- check case | temp_setting sets the value inside, restores it after
(lambda d: (lambda cm: [cm.__enter__(), d["mode"], cm.__exit__(None, None, None), dict(d)][1::2])(temp_setting(d, "mode", "test")))({"mode": "live"})
=> ["test", {"mode": "live"}]
--- check case | A key that was not there is removed afterwards
(lambda d: (lambda cm: [cm.__enter__(), d["x"], cm.__exit__(None, None, None), dict(d)][1::2])(temp_setting(d, "x", 1)))({})
=> [1, {}]
--- check case | The old value comes back even when the block raises, and the error still propagates
(lambda g: (exec("try:\\n    with temp_setting(cfg, 'debug', True):\\n        raise RuntimeError('boom')\\nexcept RuntimeError:\\n    cfg['propagated'] = True\\n", g), g["cfg"])[1])({**globals(), "cfg": {"debug": False}})
=> {"debug": False, "propagated": True}
?? Put the yield inside try/finally.

=== py3-06 | Dataclasses and enums
--- teach
Many classes exist only to hold data. Writing \`__init__\`, \`__repr__\` and \`__eq__\` by hand for each is repetitive and easy to get wrong. **\`@dataclass\`** writes them for you from type-annotated fields:

\`\`\`python
from dataclasses import dataclass, field

@dataclass
class Item:
    name: str
    price: float
    tags: list[str] = field(default_factory=list)

Item("tea", 2.5)                      # Item(name='tea', price=2.5, tags=[])
Item("tea", 2.5) == Item("tea", 2.5)  # True
\`\`\`

\`name: str\` is a **type annotation**: it records what type the field is meant to hold (\`list[str]\` is a list of strings). Python does not check annotations when the program runs (the expert course shows the tools that do); \`@dataclass\` reads them to find the fields.

Fields with defaults must come after fields without. A mutable default needs \`field(default_factory=list)\`, which calls \`list()\` for each new object. (Remember the mutable default bug? Dataclasses refuse a plain \`= []\` for that reason.)

Useful options: \`@dataclass(frozen=True)\` makes instances read-only, which also makes them **hashable** so they can go in sets and be dict keys. \`@dataclass(order=True)\` adds \`<\`, \`>\` and friends, comparing fields in order.

**Enums** give a fixed set of named values. Instead of passing strings like \`"high"\` around (where a typo like \`"hihg"\` fails silently), you pass \`Priority.HIGH\` (where a typo is an immediate \`AttributeError\`):

\`\`\`python
from enum import Enum

class Colour(Enum):
    RED = 1
    GREEN = 2

Colour.RED            # <Colour.RED: 1>
Colour.RED.name       # 'RED'
Colour.RED.value      # 1
Colour(2)             # <Colour.GREEN: 2>   look up by value
Colour["GREEN"]       # <Colour.GREEN: 2>   look up by name
list(Colour)          # [<Colour.RED: 1>, <Colour.GREEN: 2>]
\`\`\`

**Common mistake:** comparing an enum member to its raw value. \`Colour.RED == 1\` is \`False\`. Compare members with members (\`is\` works too), and use \`.value\` when you really need the number.
--- task
Write:

- An \`Enum\` called \`Priority\` with members \`LOW = 1\`, \`MEDIUM = 2\`, \`HIGH = 3\`.
- A dataclass \`Task\` with fields \`title\` (str), \`priority\` (default \`Priority.MEDIUM\`), \`tags\` (a list, default empty and **not shared** between tasks) and \`done\` (default \`False\`), plus a method \`complete()\` that sets \`done\` to \`True\`.
- A frozen dataclass \`Point\` with fields \`x\` and \`y\`.
- \`by_priority(tasks)\` returning the tasks sorted highest priority first, then by title A to Z.
--- starter
from dataclasses import dataclass, field
from enum import Enum


class Task:
    def __init__(self, title):
        self.title = title


def by_priority(tasks):
    return tasks
--- solution
from dataclasses import dataclass, field
from enum import Enum


class Priority(Enum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3


@dataclass
class Task:
    title: str
    priority: Priority = Priority.MEDIUM
    tags: list[str] = field(default_factory=list)
    done: bool = False

    def complete(self):
        self.done = True


@dataclass(frozen=True)
class Point:
    x: float
    y: float


def by_priority(tasks):
    return sorted(tasks, key=lambda t: (-t.priority.value, t.title))
--- hint
\`tags: list[str] = field(default_factory=list)\` gives each task its own list.
--- hint
\`@dataclass(frozen=True)\` above \`class Point:\` with two annotated fields.
--- hint
Enum members do not compare with \`<\`, so sort on \`-t.priority.value\` then \`t.title\`.
--- check test | Priority members and lookups
Priority.HIGH.value == 3 and Priority(1) is Priority.LOW and Priority["MEDIUM"] is Priority.MEDIUM and len(Priority) == 3
--- check case | Task has a generated repr with the defaults
repr(Task("write"))
=> "Task(title='write', priority=<Priority.MEDIUM: 2>, tags=[], done=False)"
--- check test | Two tasks with the same data are equal
Task("a", Priority.LOW) == Task("a", Priority.LOW) and Task("a") != Task("b")
--- check test | Tasks do not share their tag list
(lambda a, b: (a.tags.append("x"), b.tags)[1] == [])(Task("a"), Task("b"))
--- check test | complete() marks the task done
(lambda t: (t.complete(), t.done)[1] is True)(Task("a"))
--- check test | Point is frozen
raises(__import__("dataclasses").FrozenInstanceError, lambda: setattr(Point(1, 2), "x", 5))
--- check test | Frozen points can go in a set
len({Point(1, 2), Point(1, 2), Point(2, 1)}) == 2
--- check case | by_priority sorts by priority, then title
[t.title for t in by_priority([Task("b"), Task("z", Priority.HIGH), Task("a"), Task("c", Priority.LOW), Task("m", Priority.HIGH)])]
=> ["m", "z", "a", "b", "c"]

=== py3-07 | Special methods: making your own types feel built in
--- teach
Why does \`len(x)\` work on a list, \`x[0]\` on a string and \`a + b\` on numbers? Because those types define **special methods** (also called *dunder* methods, for the double underscores). Python turns syntax into method calls:

| You write | Python calls |
|---|---|
| \`len(v)\` | \`v.__len__()\` |
| \`v[i]\` | \`v.__getitem__(i)\` |
| \`for x in v\` | \`v.__iter__()\` |
| \`x in v\` | \`v.__contains__(x)\` |
| \`a + b\` | \`a.__add__(b)\` |
| \`a * 3\` | \`a.__mul__(3)\` |
| \`3 * a\` | \`a.__rmul__(3)\` (after \`int.__mul__\` gives up) |
| \`a == b\` | \`a.__eq__(b)\` |
| \`hash(a)\` | \`a.__hash__()\` |
| \`abs(a)\` | \`a.__abs__()\` |
| \`bool(a)\` | \`a.__bool__()\` (or \`__len__\` if there is no \`__bool__\`) |

Define them and your objects work with the whole language: \`sum\`, \`sorted\`, \`in\`, sets, dict keys. (Two built-ins you may want for the task: \`any(xs)\` is \`True\` if at least one item of \`xs\` is truthy, and \`all(xs)\` if every item is.)

\`\`\`python
class Money:
    def __init__(self, cents):
        self.cents = cents
    def __add__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        return Money(self.cents + other.cents)
    def __repr__(self):
        return f"Money({self.cents})"

Money(150) + Money(75)     # Money(225)
\`\`\`

Returning \`NotImplemented\` (a special value, not an error) tells Python "I don't know how to do this", so it can try the other operand's method, and raise a clear \`TypeError\` if neither knows.

**The hash rule.** Objects that compare equal must have equal hashes, or sets and dicts will misbehave. When you define \`__eq__\`, Python sets \`__hash__\` to \`None\` (unhashable) unless you define it too. Hash the same data you compare, and only if that data cannot change: \`hash(self.components)\` for a tuple.

\`__getitem__\` receives whatever is inside the brackets. For \`v[1:3]\` that is a \`slice\` object; \`isinstance(index, slice)\` lets you handle both.

**Common mistake:** making \`__add__\` change \`self\` and return it. \`a + b\` must never modify \`a\`; return a new object.
--- task
Write a class \`Vector\` built from any number of numbers, \`Vector(1, 2, 3)\`, stored as a tuple so it cannot change. It supports:

- \`repr\` → \`Vector(1, 2, 3)\`; \`len\`; iteration; \`v[i]\` (a slice returns a new \`Vector\`)
- \`v + w\` and \`v - w\` element by element; a \`ValueError\` if the lengths differ
- \`v * k\` and \`k * v\` for a number \`k\`
- \`==\` with another \`Vector\`, and a \`__hash__\` consistent with it
- \`abs(v)\`, the length \`sqrt(x² + y² + ...)\`, and \`bool(v)\`, false only when every component is 0
--- starter
class Vector:
    def __init__(self, *components):
        self.components = list(components)
--- solution
import math


class Vector:
    def __init__(self, *components):
        self.components = tuple(components)

    def __repr__(self):
        return f"Vector({', '.join(repr(c) for c in self.components)})"

    def __len__(self):
        return len(self.components)

    def __iter__(self):
        return iter(self.components)

    def __getitem__(self, index):
        if isinstance(index, slice):
            return Vector(*self.components[index])
        return self.components[index]

    def _check(self, other):
        if not isinstance(other, Vector):
            return False
        if len(other) != len(self):
            raise ValueError("vectors must have the same length")
        return True

    def __add__(self, other):
        if not self._check(other):
            return NotImplemented
        return Vector(*(a + b for a, b in zip(self, other)))

    def __sub__(self, other):
        if not self._check(other):
            return NotImplemented
        return Vector(*(a - b for a, b in zip(self, other)))

    def __mul__(self, k):
        if not isinstance(k, (int, float)):
            return NotImplemented
        return Vector(*(a * k for a in self))

    __rmul__ = __mul__

    def __eq__(self, other):
        if not isinstance(other, Vector):
            return NotImplemented
        return self.components == other.components

    def __hash__(self):
        return hash(self.components)

    def __abs__(self):
        return math.sqrt(sum(a * a for a in self))

    def __bool__(self):
        return any(self.components)
--- hint
Store \`tuple(components)\`. Many methods then just hand over to the tuple: \`len(self.components)\`, \`iter(self.components)\`, \`hash(self.components)\`.
--- hint
For \`+\` and \`-\`, build a new Vector from \`zip(self, other)\`. Check the lengths first and raise \`ValueError\` if they differ.
--- hint
\`__rmul__ = __mul__\` makes \`3 * v\` work. In \`__getitem__\`, \`isinstance(index, slice)\` tells you to return \`Vector(*self.components[index])\`.
--- check case | repr
repr(Vector(1, 2, 3))
=> "Vector(1, 2, 3)"
--- check test | len, iteration and indexing
(lambda v: len(v) == 3 and list(v) == [4, 5, 6] and v[0] == 4 and v[-1] == 6)(Vector(4, 5, 6))
--- check case | A slice is a Vector
Vector(1, 2, 3, 4)[1:3]
=> Vector(2, 3)
--- check case | Addition and subtraction
(Vector(1, 2) + Vector(10, 20), Vector(5, 5) - Vector(1, 2))
=> (Vector(11, 22), Vector(4, 3))
--- check test | Adding different lengths raises ValueError
raises(ValueError, lambda: Vector(1, 2) + Vector(1, 2, 3))
--- check test | Scaling works on both sides, and + does not change the original
(lambda v: v * 2 == Vector(2, 4) and 3 * v == Vector(3, 6) and (v + v, v)[1] == Vector(1, 2))(Vector(1, 2))
--- check test | Equal vectors hash equal and work in sets and dicts
len({Vector(1, 2), Vector(1, 2), Vector(2, 1)}) == 2 and {Vector(0, 1): "up"}[Vector(0, 1)] == "up"
--- check test | Vector is not equal to a tuple with the same numbers
Vector(1, 2) != (1, 2)
--- check test | abs is the length, bool is false only for zero
abs(Vector(3, 4)) == 5.0 and not Vector(0, 0) and bool(Vector(0, 1))
--- check test | Components cannot be changed
isinstance(Vector(1, 2).components, tuple)
?? Store the components as a tuple.

=== py3-08 | functools: partial, reduce and lru_cache
--- teach
\`functools\` is the standard library's toolbox for working *with* functions.

**\`partial\`** fixes some arguments of a function now, giving you a new function that takes the rest later:

\`\`\`python
from functools import partial
def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
square(9)           # 81
int_from_binary = partial(int, base=2)
int_from_binary("101")   # 5
\`\`\`

It is handy wherever something wants a function of one argument (a \`key=\`, a callback) and yours takes more.

**\`reduce\`** folds a sequence into one value by applying a two-argument function repeatedly, left to right:

\`\`\`python
from functools import reduce
reduce(lambda acc, x: acc + x, [1, 2, 3, 4], 0)    # ((((0+1)+2)+3)+4) = 10
reduce(lambda acc, x: acc * x, [], 1)              # 1: the start value
\`\`\`

Always give a start value: without one, \`reduce\` fails on an empty sequence. For sums and products, \`sum()\` and \`math.prod()\` are clearer; \`reduce\` earns its place when the combining step is your own, like chaining functions together.

**\`lru_cache\`** remembers a function's results by its arguments. Call it again with the same arguments and it returns the stored answer instantly:

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def slow_square(n):
    print("computing", n)
    return n * n

slow_square(4)   # prints "computing 4", returns 16
slow_square(4)   # returns 16 at once, nothing printed
slow_square.cache_info()   # CacheInfo(hits=1, misses=1, maxsize=None, currsize=1)
\`\`\`

This only makes sense for **pure functions**, whose result depends only on their arguments. Cache a function that reads the clock or a file, and you get stale answers. The arguments must be hashable too: no lists.

**Common mistake:** in \`reduce\`, mixing up the order of the two arguments. The first is always the running result so far; the second is the next item.
--- task
Write:

- \`product(nums)\` using \`reduce\`; \`product([])\` is \`1\`.
- \`compose(*funcs)\` returning one function that applies them **right to left**: \`compose(f, g, h)(x)\` is \`f(g(h(x)))\`, and \`compose()\` returns its argument unchanged. Use \`reduce\`.
- \`two_to_the\`, made with \`partial\` from the built-in \`pow\`, so \`two_to_the(10)\` is \`1024\`.
- \`collatz_steps(n)\`, cached with \`lru_cache\`: \`0\` if \`n\` is 1, otherwise \`1 +\` the steps of \`n // 2\` (if \`n\` is even) or \`3 * n + 1\` (if odd).
--- starter
from functools import lru_cache, partial, reduce


def product(nums):
    return 0


def compose(*funcs):
    return funcs[0]


def collatz_steps(n):
    return 0
--- solution
from functools import lru_cache, partial, reduce


def product(nums):
    return reduce(lambda acc, x: acc * x, nums, 1)


def compose(*funcs):
    return reduce(lambda f, g: lambda x: f(g(x)), funcs, lambda x: x)


two_to_the = partial(pow, 2)


@lru_cache(maxsize=None)
def collatz_steps(n):
    if n == 1:
        return 0
    if n % 2 == 0:
        return 1 + collatz_steps(n // 2)
    return 1 + collatz_steps(3 * n + 1)
--- hint
\`reduce(lambda acc, x: acc * x, nums, 1)\`: the last argument is the start value for an empty list.
--- hint
For \`compose\`, start from the identity function \`lambda x: x\`, and at each step combine the function so far \`f\` with the next one \`g\` into \`lambda x: f(g(x))\`.
--- hint
\`partial(pow, 2)\` fixes the base; \`@lru_cache(maxsize=None)\` goes directly above \`def collatz_steps\`.
--- check test | product, including the empty case
product([2, 3, 4]) == 24 and product([]) == 1 and product([-1, 5]) == -5
--- check case | compose applies right to left
compose(lambda x: x + 1, lambda x: x * 2)(5)
=> 11
--- check case | compose works with any number of functions
compose(str, abs, lambda x: x - 10)(3)
=> "7"
--- check case | compose() is the identity
compose()("same")
=> "same"
--- check test | two_to_the is a partial of pow
two_to_the(10) == 1024 and isinstance(two_to_the, __import__("functools").partial)
--- check test | collatz_steps small values
[collatz_steps(n) for n in (1, 2, 6, 27)] == [0, 1, 8, 111]
--- check case | The longest chain below 30,000 (the cache makes this fast)
max(range(1, 30000), key=collatz_steps)
=> 26623
--- check test | collatz_steps is cached with lru_cache
collatz_steps.cache_info().hits > 0
?? Put @lru_cache(maxsize=None) on collatz_steps.
--- check source | Uses reduce
\\breduce\\(

=== py3-09 | Debugging: aliasing and shared state
--- teach
A variable in Python is not a box holding a value. It is a **name pointing at an object**. Two names can point at the same object, and then a change made through one is visible through the other. That is called **aliasing**, and it is behind some of the most confusing bugs you will meet.

\`\`\`python
a = [1, 2]
b = a          # no copy: b is another name for the same list
b.append(3)
a              # [1, 2, 3]
a is b         # True   (same object)
\`\`\`

**The debugging tool** is \`is\` (or \`id()\`): when two things change together, ask whether they are the same object.

**Where aliasing hides:**

\`\`\`python
grid = [[0] * 3] * 2      # the outer * copies the REFERENCE to one inner list
grid[0][0] = 9
grid                      # [[9, 0, 0], [9, 0, 0]]
grid[0] is grid[1]        # True
\`\`\`

\`[0] * 3\` is fine (numbers cannot change), but \`[inner] * 2\` gives two references to *one* inner list. Build each row separately: \`[[0] * 3 for _ in range(2)]\`.

\`dict.fromkeys(names, [])\` has the same flaw: every key gets the *same* list.

**Shallow and deep copies.** \`list(x)\`, \`x.copy()\`, \`x[:]\` and \`copy.copy(x)\` make a **shallow** copy: a new outer container, but the *same* objects inside. For nested data, you need \`copy.deepcopy\`, which copies all the way down:

\`\`\`python
import copy
state = {"round": 1, "scores": {"ada": 0}}
shallow = state.copy()
deep = copy.deepcopy(state)
state["scores"]["ada"] = 5
shallow["scores"]     # {'ada': 5}   shares the inner dict
deep["scores"]        # {'ada': 0}   independent
\`\`\`

**Fix the cause.** When you see "changing one thing changed another", find where the second name was created, and decide deliberately: should these share, or should one be a copy? Also, a function should not quietly change data it was given unless that is its whole job and its name says so.
--- task
**Bug report:**

1. \`place(make_board(3), 0, 0, "X")\` puts an X in the whole first column instead of one cell.
2. \`new_inventories(["ada", "lin"])\` gives players whose item lists are linked: giving Ada a sword gives Lin one too.
3. \`snapshots(state, changes)\` should return the state after each change, but every snapshot shows the final scores, and the caller's own \`state\` is changed.

Fix all three. \`snapshots\` must not modify the \`state\` passed in.
--- starter
def make_board(size):
    return [["."] * size] * size


def place(board, row, col, mark):
    board[row][col] = mark
    return board


def new_inventories(names):
    return dict.fromkeys(names, [])


def snapshots(state, changes):
    history = []
    for name, score in changes:
        state["scores"][name] = score
        history.append(state.copy())
    return history
--- solution
import copy


def make_board(size):
    return [["."] * size for _ in range(size)]


def place(board, row, col, mark):
    board[row][col] = mark
    return board


def new_inventories(names):
    return {name: [] for name in names}


def snapshots(state, changes):
    current = copy.deepcopy(state)
    history = []
    for name, score in changes:
        current["scores"][name] = score
        history.append(copy.deepcopy(current))
    return history
--- hint
Check \`board[0] is board[1]\`. Then build each row separately with a comprehension.
--- hint
\`dict.fromkeys(names, [])\` gives every key the same list. A dict comprehension makes a new list per name.
--- hint
In \`snapshots\`, work on \`copy.deepcopy(state)\`, and append a \`copy.deepcopy\` of it each time: \`.copy()\` is shallow, so the inner \`scores\` dict was shared.
--- check case | place marks exactly one cell
place(make_board(3), 0, 0, "X")
=> [["X", ".", "."], [".", ".", "."], [".", ".", "."]]
--- check test | Every row is its own list
(lambda b: b[0] is not b[1] and b[1] is not b[2])(make_board(3))
--- check test | Inventories are independent
(lambda inv: (inv["ada"].append("sword"), inv["lin"])[1] == [])(new_inventories(["ada", "lin"]))
--- check case | Each snapshot shows the state at that moment
[s["scores"] for s in snapshots({"round": 1, "scores": {"ada": 0, "lin": 0}}, [("ada", 3), ("lin", 5), ("ada", 4)])]
=> [{"ada": 3, "lin": 0}, {"ada": 3, "lin": 5}, {"ada": 4, "lin": 5}]
--- check test | snapshots does not change the caller's state
(lambda st: (snapshots(st, [("ada", 9)]), st)[1] == {"round": 1, "scores": {"ada": 0}})({"round": 1, "scores": {"ada": 0}})

=== py3-10 | Design: composition over inheritance, and the strategy pattern
--- teach
There are two ways to give a class new behaviour. **Inheritance** says "an \`ExpressOrder\` *is an* \`Order\`, with one method replaced". **Composition** says "an \`Order\` *has a* shipping method, and asks it for the cost".

Inheritance looks natural at first, and then it multiplies. Express shipping, gift wrap, discounts: soon you need \`ExpressGiftWrappedDiscountedOrder\`, one class for every combination. Worse, an order cannot change its shipping method without becoming a different class.

With composition, each varying part becomes an object you plug in:

\`\`\`python
class Order:
    def __init__(self, items, shipping):
        self.items = items
        self.shipping = shipping      # any object with a cost(order) method

    def shipping_cost(self):
        return self.shipping.cost(self)
\`\`\`

This is the **strategy pattern**: a family of interchangeable objects, each with the same method, chosen at run time. \`Order\` does not know or care which one it has. Adding a new shipping method means writing a new small class; \`Order\` does not change at all.

Strategy objects can hold their own settings, which a chain of \`if\`s cannot do neatly:

\`\`\`python
class Flat:
    def __init__(self, fee):
        self.fee = fee
    def cost(self, order):
        return self.fee

Order(items, Flat(3.50))
\`\`\`

**When to use which?** Inherit when the child genuinely *is* a kind of the parent and uses nearly all of it (a \`TimeoutError\` is an \`OSError\`). Compose when a *part* of the behaviour varies. A useful smell: an \`if\`/\`elif\` chain on a type name or mode string, repeated in several methods, is asking to become strategy objects.

In Python a strategy does not even have to be a class: any object with the right method works ("duck typing"), and for a single method, a plain function often does the job.
--- task
\`Order.shipping_cost\` is a chain of \`if\`s on a string. Refactor it to the strategy pattern:

- Classes \`Standard\`, \`Express\` and \`Pickup\`, each with a method \`cost(order)\`: Standard is \`0\` when the subtotal is 50 or more, otherwise \`4.99\`; Express is \`9.99 + per_kg * order.weight()\`, where \`Express(per_kg=2.0)\` has \`per_kg\` defaulting to \`2.0\`; Pickup is \`0\`.
- \`Order(items, shipping)\` takes a shipping **object** and asks it for the cost. \`Order\` must not mention any shipping method by name.

Items are \`(name, price, weight_kg)\` tuples. \`subtotal\`, \`weight\` and \`total\` keep working as now.
--- starter
class Order:
    def __init__(self, items, shipping):
        self.items = items
        self.shipping = shipping

    def subtotal(self):
        return sum(price for _, price, _ in self.items)

    def weight(self):
        return sum(kg for _, _, kg in self.items)

    def shipping_cost(self):
        if self.shipping == "standard":
            return 0 if self.subtotal() >= 50 else 4.99
        elif self.shipping == "express":
            return 9.99 + 2.0 * self.weight()
        elif self.shipping == "pickup":
            return 0
        raise ValueError(f"unknown shipping: {self.shipping}")

    def total(self):
        return round(self.subtotal() + self.shipping_cost(), 2)
--- solution
class Standard:
    def cost(self, order):
        return 0 if order.subtotal() >= 50 else 4.99


class Express:
    def __init__(self, per_kg=2.0):
        self.per_kg = per_kg

    def cost(self, order):
        return 9.99 + self.per_kg * order.weight()


class Pickup:
    def cost(self, order):
        return 0


class Order:
    def __init__(self, items, shipping):
        self.items = items
        self.shipping = shipping

    def subtotal(self):
        return sum(price for _, price, _ in self.items)

    def weight(self):
        return sum(kg for _, _, kg in self.items)

    def shipping_cost(self):
        return self.shipping.cost(self)

    def total(self):
        return round(self.subtotal() + self.shipping_cost(), 2)
--- hint
Move each branch of the \`if\` chain into the \`cost(self, order)\` method of its own class. Use \`order.subtotal()\` and \`order.weight()\` instead of \`self.\`.
--- hint
\`Express\` needs an \`__init__(self, per_kg=2.0)\` that stores \`per_kg\`.
--- hint
\`Order.shipping_cost\` becomes one line: \`return self.shipping.cost(self)\`.
--- check case | Standard is free over 50
Order([("boots", 60.0, 1.2)], Standard()).total()
=> 60.0
--- check case | Standard charges 4.99 under 50
Order([("socks", 8.0, 0.1), ("hat", 12.0, 0.2)], Standard()).total()
=> 24.99
--- check case | Express charges by weight
Order([("books", 30.0, 2.5)], Express()).total()
=> 44.99
--- check case | Express can be configured
Order([("books", 30.0, 2.5)], Express(per_kg=1.0)).total()
=> 42.49
--- check case | Pickup is free
Order([("tv", 400.0, 15.0)], Pickup()).total()
=> 400.0
--- check case | A brand new strategy works without changing Order
Order([("gift", 20.0, 1.0)], type("Flat", (), {"cost": lambda self, order: 3.5})()).total()
=> 23.5
--- check source absent | Order no longer checks shipping names
==\\s*["'](standard|express|pickup)["']

=== py3-11 | Recursion, memoisation and dynamic programming
--- teach
A **recursive** function solves a problem by calling itself on a smaller version of the same problem. It needs two parts:

- a **base case** small enough to answer directly, and
- a **recursive case** that makes the problem smaller and trusts the call to solve the rest.

\`\`\`python
def total(nums):
    if not nums:                    # base case
        return 0
    return nums[0] + total(nums[1:])   # smaller problem
\`\`\`

**The trap: repeated work.** The textbook Fibonacci recursion is correct but hopeless:

\`\`\`python
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)
\`\`\`

\`fib(5)\` calls \`fib(3)\` twice, \`fib(2)\` three times, and the count doubles with each step. \`fib(40)\` makes over 300 million calls. The fix is **memoisation**: remember each answer the first time. With \`@lru_cache\`, every \`fib(k)\` is computed once, and \`fib(40)\` takes 41 calls.

That is the heart of **dynamic programming (DP)**: when a problem breaks into *overlapping* subproblems, solve each once and reuse it.

**Top-down vs bottom-up.** Memoised recursion is *top-down*: start from the question and recurse. Python limits recursion depth (about 1000 calls), so for big inputs you often go *bottom-up* instead: fill a table from the smallest subproblem upwards with a loop.

**Worked example: fewest coins.** Coins \`[1, 3, 4]\`, amount \`6\`. Grabbing the biggest coin first gives 4+1+1 (three coins), but 3+3 is two. Greedy fails, so think in subproblems: *the best way to make \`a\` is one coin \`c\` plus the best way to make \`a - c\`*, for whichever coin gives the fewest.

\`\`\`python
best[0] = 0
best[a] = 1 + min(best[a - c] for each coin c <= a)
\`\`\`

Filling \`best[0]\`, \`best[1]\`, … \`best[amount]\` in order means every value you need is already there when you need it.

**Counting combinations** is similar but has a twist: to count \`1+2\` and \`2+1\` as the *same* way, loop over the coins on the outside, so each coin is only ever added after the ones before it.
--- task
Solve two coin problems with dynamic programming. Both must handle an amount of 10,000 quickly.

- \`min_coins(coins, amount)\` returns the fewest coins that add up to \`amount\`, or \`-1\` if it cannot be done. \`min_coins(coins, 0)\` is \`0\`.
- \`count_ways(coins, amount)\` returns how many different **combinations** of coins add up to \`amount\` (order does not matter, so \`1+2\` and \`2+1\` are one way). There is exactly one way to make \`0\`.

You have an unlimited supply of each coin.
--- starter
def min_coins(coins, amount):
    count = 0
    for coin in sorted(coins, reverse=True):
        while amount >= coin:
            amount -= coin
            count += 1
    return count if amount == 0 else -1


def count_ways(coins, amount):
    return 0
--- solution
def min_coins(coins, amount):
    INF = float("inf")
    best = [0] + [INF] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a and best[a - c] + 1 < best[a]:
                best[a] = best[a - c] + 1
    return best[amount] if best[amount] != INF else -1


def count_ways(coins, amount):
    ways = [1] + [0] * amount
    for c in coins:
        for a in range(c, amount + 1):
            ways[a] += ways[a - c]
    return ways[amount]
--- hint
The starter's greedy \`min_coins\` fails for coins \`[1, 3, 4]\` and amount 6. Make a list \`best\` where \`best[a]\` is the fewest coins for amount \`a\`, with \`best[0] = 0\` and everything else "infinity" (\`float("inf")\`).
--- hint
For each amount \`a\` from 1 upwards, try every coin \`c <= a\`: \`best[a] = min(best[a], best[a - c] + 1)\`. Unreachable amounts stay infinite; return -1 for those.
--- hint
For \`count_ways\`, \`ways = [1] + [0] * amount\`, then *for each coin* (outer loop), for each \`a\` from \`c\` to \`amount\`: \`ways[a] += ways[a - c]\`.
--- check case | min_coins, the usual case
min_coins([1, 2, 5], 11)
=> 3
--- check case | Greedy is wrong here, DP is not
min_coins([1, 3, 4], 6)
=> 2
?? Taking the biggest coin first gives 4+1+1. Try every coin at every amount.
--- check case | Impossible gives -1
min_coins([2], 3)
=> -1
--- check case | Zero needs zero coins
min_coins([1, 5], 0)
=> 0
--- check case | A big amount
min_coins([1, 7, 23, 97, 331], 10000)
=> 34
--- check case | A big amount with no 1-coin
min_coins([7, 23, 97, 331], 9999)
=> 33
--- check case | count_ways counts combinations, not orders
count_ways([1, 2, 5], 5)
=> 4
--- check case | count_ways with several coins
count_ways([2, 5, 3, 6], 10)
=> 5
--- check test | One way to make zero, none when it cannot be done
count_ways([1, 2], 0) == 1 and count_ways([7], 3) == 0
--- check case | count_ways for 10,000 with eight coins
count_ways([1, 2, 5, 10, 20, 50, 100, 200], 10000)
=> 1133873304647601

=== py3-12 | Big-O: code that finishes
--- teach
Two programs can give the same answer and differ by hours. **Big-O notation** describes how the work grows as the input grows, ignoring constant factors:

| Big-O | Name | 1,000 items | 1,000,000 items |
|---|---|---|---|
| O(1) | constant | 1 | 1 |
| O(log n) | logarithmic | 10 | 20 |
| O(n) | linear | 1,000 | 1,000,000 |
| O(n log n) | sorting | 10,000 | 20,000,000 |
| O(n²) | quadratic | 1,000,000 | 1,000,000,000,000 |

Python does very roughly ten million simple steps a second. So O(n²) on a million items is not "slow"; it never finishes.

**Know the cost of what you call.** Hidden loops are where quadratic code comes from:

| Operation | list | set / dict |
|---|---|---|
| \`x in c\` | O(n): checks every item | O(1) on average |
| \`c.append(x)\` / \`c.add(x)\` | O(1) | O(1) |
| \`c.insert(0, x)\`, \`c.pop(0)\` | O(n) | n/a |
| \`sum(c[a:b])\` | O(b - a) | n/a |

This innocent-looking loop is O(n²), because \`x not in result\` scans the list each time:

\`\`\`python
result = []
for x in items:
    if x not in result:      # hidden loop
        result.append(x)
\`\`\`

Add a \`set\` beside the list and the check becomes instant. The loop is now O(n).

**Precompute to answer many questions.** If you will be asked for the sum of \`nums[lo:hi]\` many times, summing each slice is O(n) per question. Instead, build **prefix sums** once: \`prefix[i]\` is the sum of the first \`i\` numbers. Then every range sum is one subtraction:

\`\`\`python
nums   = [3, 1, 4, 1, 5]
prefix = [0, 3, 4, 8, 9, 14]      # prefix[i] = sum(nums[:i])
# sum(nums[1:4]) == prefix[4] - prefix[1] == 9 - 3 == 6
\`\`\`

O(n) once, then O(1) per question, instead of O(n) per question.

**Common mistake:** testing only on tiny inputs. Everything is fast on ten items. Always ask: *what happens when this is 100,000?*
--- task
Both functions must handle 100,000-item inputs in well under a second.

- \`dedupe(items)\` returns the items with duplicates removed, keeping the **first** occurrence of each, in order.
- \`range_sums(nums, queries)\` takes a list of \`(lo, hi)\` pairs and returns a list with \`sum(nums[lo:hi])\` for each (\`lo <= hi\`, both within the list). Use prefix sums.
--- starter
def dedupe(items):
    result = []
    for x in items:
        if x not in result:
            result.append(x)
    return result


def range_sums(nums, queries):
    return [sum(nums[lo:hi]) for lo, hi in queries]
--- solution
def dedupe(items):
    seen = set()
    result = []
    for x in items:
        if x not in seen:
            seen.add(x)
            result.append(x)
    return result


def range_sums(nums, queries):
    prefix = [0]
    for n in nums:
        prefix.append(prefix[-1] + n)
    return [prefix[hi] - prefix[lo] for lo, hi in queries]
--- hint
The starter gives the right answers. It is too slow because \`x not in result\` and \`sum(nums[lo:hi])\` are hidden loops. Where does each one run, and how many times?
--- hint
Keep a \`set\` of what you have seen beside the result list, and test membership in the set.
--- hint
Build \`prefix\` so \`prefix[i]\` is the sum of the first \`i\` numbers (it has one more entry than \`nums\`). Then each answer is \`prefix[hi] - prefix[lo]\`.
--- check case | dedupe keeps the first of each, in order
dedupe([3, 1, 3, 2, 1, 3])
=> [3, 1, 2]
--- check case | dedupe works on strings and empty input
(dedupe(list("mississippi")), dedupe([]))
=> (["m", "i", "s", "p"], [])
--- check test | dedupe on 200,000 items
dedupe(list(range(100000)) * 2) == list(range(100000))
?? \`x not in list\` scans the whole list. A set answers that instantly.
--- check case | range_sums answers each query
range_sums([3, 1, 4, 1, 5], [(1, 4), (0, 5), (2, 2), (4, 5)])
=> [6, 14, 0, 5]
--- check case | Negative numbers
range_sums([5, -2, -3, 10], [(0, 3), (1, 4)])
=> [0, 5]
--- check test | 200,000 queries over 100,000 numbers
range_sums(list(range(100000)), [(0, 100000)] * 200000 + [(5, 10)])[-2:] == [4999950000, 35]
?? Summing a slice for every query is billions of steps here. Build prefix sums once.

=== py3-13 | Problem solving: shortest path on a grid (BFS)
--- teach
"What is the fewest number of moves from here to there?" comes up in games, maps, puzzles and networks. When every move costs the same, the answer is **breadth-first search (BFS)**.

**The idea.** Explore in rings. First every square 1 step from the start, then every square 2 steps away, then 3… The first time you reach the goal, you got there by a shortest route, because every shorter distance was fully explored before.

**The mechanics.** Keep a **queue** of squares to visit, first in first out, and a record of squares already seen:

\`\`\`python
from collections import deque

def steps_to(grid, start, goal):
    rows, cols = len(grid), len(grid[0])
    queue = deque([(start, 0)])
    seen = {start}
    while queue:
        (r, c), dist = queue.popleft()
        if (r, c) == goal:
            return dist
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] != "#" and (nr, nc) not in seen:
                seen.add((nr, nc))
                queue.append(((nr, nc), dist + 1))
    return -1
\`\`\`

Three details make it correct and fast:

- **\`deque.popleft()\`**, not \`list.pop(0)\`. Removing from the front of a list shifts every other item along; a deque does it in O(1).
- **Mark squares as seen when you *add* them to the queue**, not when you take them out. Otherwise the same square can be queued many times from different neighbours.
- **Check the bounds before indexing**. A negative index does not fail in Python; it quietly wraps around to the other side of the grid.

Every square is added at most once, so BFS is O(rows × cols).

**Common mistake:** using depth-first search (recursion, or a stack) for shortest paths. DFS finds *a* path, not the shortest, and exploring every path to compare them is exponential.
--- task
Write \`shortest_path(grid)\`. The grid is a list of equal-length strings: \`S\` is the start, \`E\` the end, \`#\` a wall, \`.\` open floor. You can move up, down, left or right, one square per step, never through walls or off the grid.

Return the fewest steps from \`S\` to \`E\`, or \`-1\` if \`E\` cannot be reached. It must handle grids with tens of thousands of squares.
--- starter
def shortest_path(grid):
    return -1
--- solution
from collections import deque


def shortest_path(grid):
    rows, cols = len(grid), len(grid[0])
    start = goal = None
    for r, row in enumerate(grid):
        for c, ch in enumerate(row):
            if ch == "S":
                start = (r, c)
            elif ch == "E":
                goal = (r, c)
    queue = deque([(start, 0)])
    seen = {start}
    while queue:
        (r, c), dist = queue.popleft()
        if (r, c) == goal:
            return dist
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] != "#" and (nr, nc) not in seen:
                seen.add((nr, nc))
                queue.append(((nr, nc), dist + 1))
    return -1
--- hint
First find the coordinates of \`S\` and \`E\` with two nested loops over the rows and columns.
--- hint
Use a \`deque\` of \`((row, col), distance)\` and a \`seen\` set. Pop from the left; push each open, unseen neighbour with \`distance + 1\`.
--- hint
Check \`0 <= nr < rows and 0 <= nc < cols\` *before* reading \`grid[nr][nc]\`, and add to \`seen\` at the moment you queue a square.
--- check case | A straight corridor
shortest_path(["S..E"])
=> 3
--- check case | Around a wall
shortest_path(["S#.", ".#.", "..E"])
=> 4
--- check case | Walled off
shortest_path(["S#E"])
=> -1
--- check case | Start next to the end
shortest_path(["SE"])
=> 1
--- check case | Does not wrap around the edges
shortest_path(["E#S"])
=> -1
?? Check the bounds yourself: grid[r][-1] is the last column, not an error.
--- check case | Open 300 by 300 grid, corner to corner
shortest_path(["S" + "." * 299] + ["." * 300] * 298 + ["." * 299 + "E"])
=> 598
--- check case | A long winding maze
shortest_path(["".join("S" if (r, c) == (0, 0) else "E" if (r, c) == (200, 0) else "#" if r % 2 and c != (199 if r % 4 == 1 else 0) else "." for c in range(200)) for r in range(201)])
=> 20100

=== py3-14 | Problem solving: binary search
--- teach
Looking for a word in a dictionary, you do not start at page one. You open it in the middle, see whether your word is before or after, and throw away half the book. Repeat, and a million pages take about twenty looks. That is **binary search**, O(log n), and it works on anything **sorted**.

The version that is most useful in practice does not ask "is \`x\` here?" but "**where is the first position whose value is at least \`x\`?**" That answers membership, insertion points and range counts all at once.

\`\`\`python
def first_at_least(nums, target):
    lo, hi = 0, len(nums)          # the answer is somewhere in [lo, hi]
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1           # mid and everything left of it is too small
        else:
            hi = mid               # mid might be the answer; keep it
    return lo
\`\`\`

The whole trick is the **invariant**: at every step, the answer lies between \`lo\` and \`hi\`. Each branch keeps that true while shrinking the range, and the loop ends when \`lo == hi\`, the answer. If every value is smaller than \`target\`, the answer is \`len(nums)\`, which is why \`hi\` starts there and not at \`len(nums) - 1\`.

**Binary search on the answer.** The same idea works when there is no list at all, only a yes/no question that flips once. "What is the largest \`r\` with \`r * r <= n\`?" The answer is between 0 and \`n\`; for a guess \`mid\`, if \`mid * mid <= n\` the answer is at least \`mid\`, otherwise it is below. Halve until the range closes. Because Python integers have no size limit, this works exactly even for numbers with forty digits, where \`n ** 0.5\` (a float) is already wrong.

**Common mistakes:** loops that never end because \`lo = mid\` instead of \`mid + 1\`; off-by-one answers from mixing up "first at least" with "last below"; and forgetting that the input must be sorted.

(The standard library has this built in, in the \`bisect\` module; you will use it in the expert course. Writing it yourself once is how you learn to trust it.)
--- task
Write both without \`bisect\` or \`math.isqrt\`:

- \`first_at_least(nums, target)\`: \`nums\` is sorted ascending; return the index of the first element \`>= target\`, or \`len(nums)\` if there is none. It must be O(log n).
- \`int_sqrt(n)\`: for a whole number \`n >= 0\`, return the largest integer \`r\` with \`r * r <= n\`. It must be exact even for very large \`n\`.
--- starter
def first_at_least(nums, target):
    for i, x in enumerate(nums):
        if x >= target:
            return i
    return len(nums)


def int_sqrt(n):
    return int(n ** 0.5)
--- solution
def first_at_least(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo


def int_sqrt(n):
    lo, hi = 0, n
    while lo < hi:
        mid = (lo + hi + 1) // 2
        if mid * mid <= n:
            lo = mid
        else:
            hi = mid - 1
    return lo
--- hint
Keep \`lo\` and \`hi\` with the answer always between them (\`hi\` starts at \`len(nums)\`). Each step, look at the middle and move one end.
--- hint
If \`nums[mid] < target\`, the answer is to the right: \`lo = mid + 1\`. Otherwise \`mid\` could be it: \`hi = mid\`.
--- hint
For \`int_sqrt\`, you are looking for the *last* value that passes, so round the middle up, \`mid = (lo + hi + 1) // 2\`, then \`lo = mid\` if \`mid * mid <= n\`, else \`hi = mid - 1\`.
--- check case | first_at_least finds the first match
first_at_least([1, 3, 3, 3, 8], 3)
=> 1
--- check case | Between values, it gives the insertion point
first_at_least([1, 3, 5, 7], 4)
=> 2
--- check test | Below everything is 0, above everything is len
first_at_least([2, 4], 1) == 0 and first_at_least([2, 4], 5) == 2 and first_at_least([], 7) == 0
--- check test | 20,000 searches in a million numbers
(lambda big: all(first_at_least(big, q) == (q + 1) // 2 for q in range(0, 2000000, 97)))(list(range(0, 2000000, 2)))
?? A loop from the start takes up to a million steps per search. Halve the range each time.
--- check test | int_sqrt on small numbers
[int_sqrt(n) for n in (0, 1, 2, 3, 4, 15, 16, 17, 99, 100)] == [0, 1, 1, 1, 2, 3, 4, 4, 9, 10]
--- check test | int_sqrt is exact on huge numbers
int_sqrt(10 ** 30) == 10 ** 15 and int_sqrt(10 ** 30 - 1) == 10 ** 15 - 1 and int_sqrt(2 ** 200) == 2 ** 100
?? Floats have about 16 significant digits, so n ** 0.5 is wrong here. Search on whole numbers.
--- check source absent | Does not use bisect or math.isqrt
\\bbisect\\b|\\bisqrt\\s*\\(
`,De=`@track python
@level expert
@title Python · Expert
@name Python, expert: the machinery, concurrency, testing and hard problems
@blurb Understand the machinery serious Python code is built on (closures, descriptors, class hooks, coroutines), write code that is typed, tested and designed for change, and solve the kind of hard problems that need a real algorithm.

=== py4-01 | Debugging: closures and late binding
--- teach
The advanced course showed you how iterators, decorators and special methods work. This course goes further into the machinery (closures, descriptors, class hooks, coroutines), then into typing, testing and design for change, and ends with problems that need a real algorithm.

It starts with a bug that only makes sense once you know how a **closure** remembers variables. You met closures in the decorators lesson: a function defined inside another can use the outer function's variables, even after the outer one has returned:

\`\`\`python
def make_greeter(greeting):
    def greet(name):
        return f"{greeting}, {name}"
    return greet

hello = make_greeter("hello")
hello("ada")          # 'hello, ada'
\`\`\`

Two rules about closures cause most of the bugs.

**1. Closures capture variables, not values.** The inner function looks the variable up *when it runs*, not when it was created. This is **late binding**. In a loop, every function you create shares the one loop variable, so by the time you call them, they all see its final value:

\`\`\`python
funcs = [lambda: i for i in range(3)]
[f() for f in funcs]      # [2, 2, 2], not [0, 1, 2]
\`\`\`

The fix is to capture the *current value* at creation time, either with a default argument (defaults are evaluated when the function is defined) or with a factory function that gets its own variable per call:

\`\`\`python
funcs = [lambda i=i: i for i in range(3)]      # default argument
def make(i):
    return lambda: i                            # factory: a new i each call
funcs = [make(i) for i in range(3)]
[f() for f in funcs]      # [0, 1, 2]
\`\`\`

**2. Assigning to a name makes it local.** If an inner function *assigns* to a variable (including \`+=\`), Python treats that name as local to the inner function for the whole function body, so reading it first fails with \`UnboundLocalError\`. Declare \`nonlocal count\` to say "this is the outer function's variable":

\`\`\`python
def make_counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment
\`\`\`

**The debugging method here:** when several functions "all return the same thing", suspect a shared variable. You can even look at what a closure captured: \`f.__closure__[0].cell_contents\` shows the current value of its first captured variable, and it is the same cell for every function made in the loop.
--- task
**Bug report:**

1. \`make_multipliers(4)\` should return four functions where the \`k\`th multiplies by \`k\`, but all of them multiply by 3.
2. \`make_handlers(["save", "open"])\` should map each name to a function returning \`"clicked <name>"\`, but every handler says \`"clicked open"\`.
3. \`make_counter()\` should return a function that counts 1, 2, 3… but calling it crashes with \`UnboundLocalError\`.

Fix all three.
--- starter
def make_multipliers(n):
    return [lambda x: i * x for i in range(n)]


def make_handlers(names):
    handlers = {}
    for name in names:
        handlers[name] = lambda: f"clicked {name}"
    return handlers


def make_counter():
    count = 0

    def increment():
        count += 1
        return count

    return increment
--- solution
def make_multipliers(n):
    def times(k):
        return lambda x: k * x
    return [times(i) for i in range(n)]


def make_handlers(names):
    handlers = {}
    for name in names:
        handlers[name] = lambda name=name: f"clicked {name}"
    return handlers


def make_counter():
    count = 0

    def increment():
        nonlocal count
        count += 1
        return count

    return increment
--- hint
Call each multiplier and look at \`f.__closure__[0].cell_contents\`. Are they separate variables or one shared one?
--- hint
Capture the value when each function is created: a default argument (\`lambda name=name: ...\`) or a small factory function that returns the lambda.
--- hint
The counter assigns to \`count\`, which makes it local to \`increment\`. Add \`nonlocal count\` as the first line of \`increment\`.
--- check case | Each multiplier uses its own k
[f(10) for f in make_multipliers(4)]
=> [0, 10, 20, 30]
--- check case | Each handler remembers its own name
{name: h() for name, h in make_handlers(["save", "open", "quit"]).items()}
=> {"save": "clicked save", "open": "clicked open", "quit": "clicked quit"}
--- check case | The counter counts
(lambda c: [c(), c(), c()])(make_counter())
=> [1, 2, 3]
--- check test | Two counters are independent
(lambda a, b: (a(), a(), b()) == (1, 2, 1))(make_counter(), make_counter())

=== py4-02 | Descriptors: how @property really works
--- teach
When you write \`obj.attr\`, Python does not just look in the object's dictionary. It first checks whether the *class* has an attribute of that name that is a **descriptor**: an object with \`__get__\` (and maybe \`__set__\`). If so, Python calls it. That single rule is how \`@property\`, methods, \`classmethod\` and \`staticmethod\` all work.

\`\`\`python
class Loud:
    def __get__(self, obj, owner):
        return "HELLO"

class Thing:
    greeting = Loud()     # a descriptor, stored on the CLASS

Thing().greeting          # 'HELLO'   (Loud.__get__ was called)
\`\`\`

The protocol:

- \`__get__(self, obj, owner)\`: called on read. \`obj\` is the instance, or \`None\` when read from the class itself (\`Thing.greeting\`); by convention return the descriptor itself then.
- \`__set__(self, obj, value)\`: called on assignment. Having it makes a **data descriptor**, which wins over the instance's own \`__dict__\`.
- \`__set_name__(self, owner, name)\`: called once when the class is created, telling the descriptor the name it was assigned to.

**Where does the value live?** Not on the descriptor! There is one descriptor per *class*, shared by every instance. Store per-object data in the instance: \`obj.__dict__[self.name] = value\`.

A reusable validator shows why descriptors exist. With \`@property\` you would repeat the same getter and setter for every field; a descriptor writes it once:

\`\`\`python
class NonEmpty:
    def __set_name__(self, owner, name):
        self.name = name
    def __get__(self, obj, owner):
        if obj is None:
            return self
        return obj.__dict__[self.name]
    def __set__(self, obj, value):
        if not value:
            raise ValueError(f"{self.name} must not be empty")
        obj.__dict__[self.name] = value

class User:
    username = NonEmpty()
    email = NonEmpty()
    def __init__(self, username, email):
        self.username = username      # goes through NonEmpty.__set__
        self.email = email
\`\`\`

A descriptor with only \`__get__\` is a **non-data descriptor**, and the instance's \`__dict__\` wins over it. That enables a neat trick: compute a value on first access, store it in the instance dict under the *same name*, and from then on Python finds the stored value first and never calls \`__get__\` again. That is exactly how \`functools.cached_property\` works.

**Common mistake:** storing the value on \`self\` inside the descriptor (\`self.value = value\`). Every instance then shares one value, because there is only one descriptor.
--- task
Write two descriptors:

- \`Positive\`: a data descriptor for numbers that must be greater than 0. Assigning anything else raises \`ValueError\`. Store the value in the instance's \`__dict__\` under the attribute's own name (use \`__set_name__\`). Reading it from the class returns the descriptor.
- \`lazy(func)\`: a non-data descriptor used like a decorator on a method. The first read calls \`func(obj)\`, stores the result in the instance's \`__dict__\` under the same name, and returns it; later reads never call \`func\` again.

Then write \`Product(name, price, quantity)\`, where \`price\` and \`quantity\` are \`Positive\`, with a property \`total\` (price × quantity).
--- starter
class Positive:
    pass


class lazy:
    def __init__(self, func):
        self.func = func


class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
--- solution
class Positive:
    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, obj, owner):
        if obj is None:
            return self
        return obj.__dict__[self.name]

    def __set__(self, obj, value):
        if not isinstance(value, (int, float)) or isinstance(value, bool) or value <= 0:
            raise ValueError(f"{self.name} must be a number greater than 0")
        obj.__dict__[self.name] = value


class lazy:
    def __init__(self, func):
        self.func = func

    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, obj, owner):
        if obj is None:
            return self
        value = self.func(obj)
        obj.__dict__[self.name] = value
        return value


class Product:
    price = Positive()
    quantity = Positive()

    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

    @property
    def total(self):
        return self.price * self.quantity
--- hint
\`__set_name__(self, owner, name)\` stores \`self.name = name\`. \`__get__\` returns \`self\` when \`obj is None\`, otherwise \`obj.__dict__[self.name]\`.
--- hint
In \`Positive.__set__\`, check the value, then store it with \`obj.__dict__[self.name] = value\`, never on \`self\`.
--- hint
\`lazy\` has no \`__set__\`. Its \`__get__\` computes \`self.func(obj)\`, stores it in \`obj.__dict__[self.name]\`, and returns it; the instance dict then shadows the descriptor.
--- check case | A valid product
(lambda p: (p.price, p.quantity, p.total))(Product("pen", 1.5, 4))
=> (1.5, 4, 6.0)
--- check test | Non-positive values are rejected, at creation and later
raises(ValueError, lambda: Product("x", 0, 1)) and raises(ValueError, lambda: Product("x", 1, -3)) and (lambda p: raises(ValueError, lambda: setattr(p, "price", -1)) and p.price == 2)(Product("x", 2, 1))
--- check test | Non-numbers are rejected
raises(ValueError, lambda: Product("x", "5", 1))
--- check test | Each product keeps its own values
(lambda a, b: (a.price, b.price) == (1, 2))(Product("a", 1, 1), Product("b", 2, 1))
?? The descriptor is shared by every instance: store the value in obj.__dict__, not on self.
--- check test | Values live in the instance dict under their own names
vars(Product("a", 2.5, 3)) == {"name": "a", "price": 2.5, "quantity": 3}
--- check test | Reading from the class gives the descriptor
isinstance(Product.price, Positive)
--- check case | lazy computes once, then reads the stored value
(lambda log: (lambda R: (lambda r: (r.data, r.data, len(log), "data" in vars(r)))(R()))(type("R", (), {"data": lazy(lambda self: log.append(1) or 42)})))([])
=> (42, 42, 1, True)
--- check test | lazy values are per instance
(lambda R: (R().v, R().v) == (1, 1))(type("R", (), {"n": 0, "v": lazy(lambda self: self.n + 1)}))

=== py4-03 | Class hooks: __init_subclass__ and the plugin pattern
--- teach
Some programs are built from **plugins**: commands, file formats, payment providers. Each lives in its own class, and the core program finds them without a hand-kept list. Forget to add a new class to the list and it silently does not exist; the fix is to have classes **register themselves** the moment they are defined.

Python gives base classes a hook for exactly that. \`__init_subclass__\` is called *on the base class* every time a subclass is created (it is implicitly a class method, so its first argument is the new subclass):

\`\`\`python
class Exporter:
    formats = {}

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        Exporter.formats[cls.extension] = cls

class CsvExporter(Exporter):
    extension = "csv"

class JsonExporter(Exporter):
    extension = "json"

Exporter.formats     # {'csv': <class 'CsvExporter'>, 'json': <class 'JsonExporter'>}
\`\`\`

Things to get right:

- **Register on the base class explicitly** (\`Exporter.formats\`), so every subclass shares one registry.
- **Call \`super().__init_subclass__(**kwargs)\`** so the hook cooperates with other base classes.
- **Validate at definition time.** The hook runs when the \`class\` statement runs, so a subclass that forgot its \`extension\`, or reused one, can raise an error immediately, at import, long before a user hits it.

Subclasses can also pass keyword arguments to the hook: \`class Csv(Exporter, extension="csv")\` calls \`__init_subclass__(extension="csv")\`.

Before \`__init_subclass__\` existed, this took a **metaclass** (a class whose instances are classes). Metaclasses can do more, but they are harder to read and combine; reach for the hook first. A class decorator (\`@register\`) is the other alternative, at the cost of having to remember to write it.

Classes can also be created by calling \`type(name, bases, namespace)\` directly, and the hook still runs. That is how the checks below add plugins of their own.
--- task
Build a tiny command system:

- \`class Command\` with a class attribute \`registry = {}\` and a method \`run(self, args)\` that subclasses override (\`args\` is a list of strings; it returns a string).
- Every subclass registers itself in \`Command.registry\` under its class attribute \`name\`, via \`__init_subclass__\`. A subclass with no \`name\` (or an empty one) raises \`TypeError\`; a name that is already registered raises \`ValueError\`.
- \`Add\` (name \`"add"\`) returns the sum of its integer arguments as a string; \`Upper\` (name \`"upper"\`) returns its arguments joined by spaces, uppercased.
- \`dispatch(line)\` splits the line into words, finds the command by the first word, and returns \`command().run(rest)\`. An empty line returns \`"error: empty command"\`; an unknown name returns \`"error: unknown command <name>"\`.
--- starter
class Command:
    registry = {}

    def run(self, args):
        raise NotImplementedError


class Add(Command):
    def run(self, args):
        return str(sum(int(a) for a in args))


def dispatch(line):
    return "error: empty command"
--- solution
class Command:
    registry = {}
    name = None

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        if not cls.name:
            raise TypeError(f"{cls.__name__} needs a name")
        if cls.name in Command.registry:
            raise ValueError(f"command {cls.name!r} is already registered")
        Command.registry[cls.name] = cls

    def run(self, args):
        raise NotImplementedError


class Add(Command):
    name = "add"

    def run(self, args):
        return str(sum(int(a) for a in args))


class Upper(Command):
    name = "upper"

    def run(self, args):
        return " ".join(args).upper()


def dispatch(line):
    words = line.split()
    if not words:
        return "error: empty command"
    command = Command.registry.get(words[0])
    if command is None:
        return f"error: unknown command {words[0]}"
    return command().run(words[1:])
--- hint
Give \`Command\` a class attribute \`name = None\`, so subclasses that forget theirs inherit \`None\` and you can test \`if not cls.name\`.
--- hint
In \`__init_subclass__(cls, **kwargs)\`, call \`super().__init_subclass__(**kwargs)\`, validate, then \`Command.registry[cls.name] = cls\`.
--- hint
\`dispatch\`: \`words = line.split()\`, handle the empty case, look up \`Command.registry.get(words[0])\`, then \`command().run(words[1:])\`.
--- check case | add sums its arguments
dispatch("add 1 2 39")
=> "42"
--- check case | upper shouts
dispatch("upper hello there")
=> "HELLO THERE"
--- check test | Both commands registered themselves
Command.registry.get("add") is Add and Command.registry.get("upper") is Upper and Command not in Command.registry.values()
--- check test | A new plugin works with no other change
(type("Echo", (Command,), {"name": "echo", "run": lambda self, args: "|".join(args)}), dispatch("echo a b c"))[1] == "a|b|c"
--- check test | A subclass without a name is rejected when it is defined
raises(TypeError, lambda: type("Nameless", (Command,), {}))
--- check test | A duplicate name is rejected
raises(ValueError, lambda: type("Add2", (Command,), {"name": "add"}))
--- check test | Empty and unknown commands give errors, not crashes
dispatch("   ") == "error: empty command" and dispatch("fly away") == "error: unknown command fly"

=== py4-04 | Advanced generators: send and yield from
--- teach
A generator can do more than hand values out. It can also **receive** them, and it can **delegate** to another generator.

**\`send\`.** \`yield\` is an expression. \`x = yield value\` hands out \`value\`, pauses, and when the caller resumes it with \`g.send(something)\`, that \`something\` becomes \`x\`:

\`\`\`python
def echo_upper():
    reply = None
    while True:
        text = yield reply
        reply = text.upper()

g = echo_upper()
next(g)             # run to the first yield ("prime" it); returns None
g.send("hi")        # 'HI'
g.send("there")     # 'THERE'
\`\`\`

You must call \`next(g)\` (or \`g.send(None)\`) once before sending anything real, because a new generator has not reached a \`yield\` yet. A generator used like this is a small **stateful machine**: it keeps its local variables between messages, with no class needed.

**\`yield from\`.** Inside a generator, \`yield from other\` passes through every value \`other\` yields (and every value sent in) until \`other\` finishes. It is how a recursive generator stays short:

\`\`\`python
def walk(tree):
    for node in tree:
        if isinstance(node, list):
            yield from walk(node)    # hand over to the recursive call
        else:
            yield node

list(walk([1, [2, [3]], 4]))   # [1, 2, 3, 4]
\`\`\`

**Return values.** A generator can \`return\` a value. It arrives as the result of the \`yield from\` expression in the generator that delegated to it:

\`\`\`python
def add_up():
    total = 0
    while True:
        x = yield
        if x is None:
            return total      # ends this generator with a result
        total += x

def outer(results):
    while True:
        results.append((yield from add_up()))
\`\`\`

This send-and-delegate machinery is the ancestor of \`async\`/\`await\`, which is the next lesson.

**Common mistake:** when flattening, treating strings as nested lists. A string is iterable, and its characters are strings too, so recursing into strings never ends. Test for \`list\` and \`tuple\` explicitly.
--- task
Write three generators:

- \`averager()\`: after priming with \`next()\`, each \`send(x)\` returns the average of all numbers sent so far.
- \`flatten(items)\`: yields every non-list, non-tuple value from arbitrarily nested lists and tuples, in order, using \`yield from\`. Strings are values, not containers.
- \`tally()\` receives numbers by \`send\` until it receives \`None\`, then **returns** the tuple \`(count, total)\`. \`collect(results)\` loops forever, appending the result of \`yield from tally()\` to the list \`results\` each time a tally finishes.
--- starter
def averager():
    yield 0


def flatten(items):
    for item in items:
        yield item


def tally():
    return (0, 0)
    yield


def collect(results):
    yield
--- solution
def averager():
    total = 0
    count = 0
    average = None
    while True:
        x = yield average
        total += x
        count += 1
        average = total / count


def flatten(items):
    for item in items:
        if isinstance(item, (list, tuple)):
            yield from flatten(item)
        else:
            yield item


def tally():
    count = 0
    total = 0
    while True:
        x = yield
        if x is None:
            return (count, total)
        count += 1
        total += x


def collect(results):
    while True:
        results.append((yield from tally()))
--- hint
In \`averager\`, keep a running total and count in local variables; the line \`x = yield average\` both hands out the latest average and receives the next number.
--- hint
\`flatten\` recurses with \`yield from flatten(item)\` when \`isinstance(item, (list, tuple))\`.
--- hint
\`tally\` ends with \`return (count, total)\` when it receives \`None\`. In \`collect\`, \`results.append((yield from tally()))\` inside \`while True:\` (note the extra brackets).
--- check case | averager keeps a running average
(lambda g: (next(g), g.send(10), g.send(20), g.send(0))[1:])(averager())
=> (10.0, 15.0, 10.0)
--- check case | flatten handles any nesting, and keeps strings whole
list(flatten([1, [2, (3, [4, []])], "ab", [[["deep"]]]]))
=> [1, 2, 3, 4, "ab", "deep"]
--- check case | flatten of nothing
list(flatten([]))
=> []
--- check test | tally returns (count, total) when sent None
(lambda g: (next(g), g.send(4), g.send(6), raises(StopIteration, lambda: g.send(None))))(tally())[3]
--- check case | collect gathers one result per finished tally
(lambda res: (lambda g: (next(g), g.send(1), g.send(2), g.send(None), g.send(5), g.send(None), res)[-1])(collect(res)))([])
=> [(2, 3), (1, 5)]
--- check source | Uses yield from
\\byield\\s+from\\b

=== py4-05 | asyncio: concurrency with async and await
--- teach
Much of a program's time is spent **waiting**: for a network reply, a database, a timer. \`asyncio\` lets one thread start many waits and handle whichever finishes first, instead of waiting for each in turn. That is **concurrency** (juggling several tasks), not parallelism (doing several computations at the same instant).

\`\`\`python
import asyncio

async def fetch(name, delay):
    await asyncio.sleep(delay)      # stand-in for a network call
    return f"{name} ready"
\`\`\`

- \`async def\` defines a **coroutine function**. Calling it runs nothing; it returns a coroutine object.
- \`await\` runs a coroutine (or anything awaitable) and, while it is waiting, lets the event loop run other tasks.
- \`await\` only works inside \`async def\`, or at the top level of the program in environments that allow it (this one does).

**Running things at the same time.** Awaiting one after another is still one-at-a-time:

\`\`\`python
a = await fetch("a", 1)     # 1 second
b = await fetch("b", 1)     # another second: 2 in total
\`\`\`

\`asyncio.gather\` starts them all and waits for all of them, returning the results **in the order you passed them in**, whatever order they finished in:

\`\`\`python
a, b = await asyncio.gather(fetch("a", 1), fetch("b", 1))   # about 1 second
\`\`\`

**Producer and consumer.** When there is a stream of work and you want at most \`n\` jobs running at once, use an \`asyncio.Queue\` and \`n\` workers:

\`\`\`python
async def worker(queue, results):
    while True:
        item = await queue.get()
        try:
            results.append(await handle(item))
        finally:
            queue.task_done()          # tell the queue this item is finished

async def run(items, n):
    queue = asyncio.Queue()
    results = []
    workers = [asyncio.create_task(worker(queue, results)) for _ in range(n)]
    for item in items:
        await queue.put(item)          # the producer
    await queue.join()                 # wait until every item is task_done
    for w in workers:
        w.cancel()                     # workers loop forever; stop them
    return results
\`\`\`

**Common mistakes.** Forgetting \`await\` (you get a coroutine object and a warning, not a result). Calling \`time.sleep\` inside a coroutine, which freezes *everything*, because nothing else can run while the thread is blocked; use \`await asyncio.sleep\`. And forgetting \`task_done()\`, which leaves \`queue.join()\` waiting forever.
--- task
Write:

- \`fetch(name, delay)\`: a coroutine that waits \`delay\` seconds with \`asyncio.sleep\` and returns \`f"{name}:{delay}"\`.
- \`fetch_all(jobs)\`: a coroutine taking a list of \`(name, delay)\` pairs, running every fetch **concurrently**, returning the results in the same order as \`jobs\`.
- \`square_slowly(x)\`: a coroutine that waits \`0.05\` seconds and returns \`x * x\`.
- \`process(items, workers)\`: a coroutine that squares every item with \`square_slowly\`, using an \`asyncio.Queue\` and exactly \`workers\` worker tasks, and returns the results sorted.

The code at the bottom already runs them and times them; keep it.
--- starter
import asyncio
import time


async def fetch(name, delay):
    await asyncio.sleep(delay)
    return f"{name}:{delay}"


async def fetch_all(jobs):
    results = []
    for name, delay in jobs:
        results.append(await fetch(name, delay))
    return results


async def square_slowly(x):
    await asyncio.sleep(0.05)
    return x * x


async def process(items, workers):
    return sorted([await square_slowly(x) for x in items])


start = time.perf_counter()
results = await fetch_all([("a", 0.3), ("b", 0.1), ("c", 0.2)])
fetch_seconds = time.perf_counter() - start

start = time.perf_counter()
squares = await process(list(range(20)), 5)
process_seconds = time.perf_counter() - start
print(results, round(fetch_seconds, 1))
--- solution
import asyncio
import time


async def fetch(name, delay):
    await asyncio.sleep(delay)
    return f"{name}:{delay}"


async def fetch_all(jobs):
    return list(await asyncio.gather(*(fetch(name, delay) for name, delay in jobs)))


async def square_slowly(x):
    await asyncio.sleep(0.05)
    return x * x


async def process(items, workers):
    queue = asyncio.Queue()
    results = []

    async def worker():
        while True:
            item = await queue.get()
            try:
                results.append(await square_slowly(item))
            finally:
                queue.task_done()

    tasks = [asyncio.create_task(worker()) for _ in range(workers)]
    for item in items:
        await queue.put(item)
    await queue.join()
    for task in tasks:
        task.cancel()
    return sorted(results)


start = time.perf_counter()
results = await fetch_all([("a", 0.3), ("b", 0.1), ("c", 0.2)])
fetch_seconds = time.perf_counter() - start

start = time.perf_counter()
squares = await process(list(range(20)), 5)
process_seconds = time.perf_counter() - start
print(results, round(fetch_seconds, 1))
--- hint
\`await asyncio.gather(*coroutines)\` runs them all at once. Build the coroutines with a generator expression and spread it with \`*\`.
--- hint
For \`process\`: make a \`Queue\`, start \`workers\` tasks with \`asyncio.create_task(worker())\`, put every item, then \`await queue.join()\`.
--- hint
Each worker loops forever: \`item = await queue.get()\`, compute, and call \`queue.task_done()\` in a \`finally\`. After \`join()\`, cancel the worker tasks.
--- check case | fetch_all returns results in the order of the jobs
results
=> ["a:0.3", "b:0.1", "c:0.2"]
--- check test | The fetches ran at the same time (about 0.3s, not 0.6s)
fetch_seconds < 0.55
?? Awaiting each fetch in a loop waits for them one after another. Use asyncio.gather.
--- check case | process squares everything
squares
=> [x * x for x in range(20)]
--- check test | Five workers made it about five times faster than one at a time
process_seconds < 0.8
?? 20 items at 0.05s each is 1s one by one. Five workers pulling from a Queue should take about 0.2s.
--- check test | They are all coroutine functions
all(__import__("inspect").iscoroutinefunction(f) for f in (fetch, fetch_all, square_slowly, process))
--- check source | process uses an asyncio.Queue
asyncio\\.Queue\\(

=== py4-06 | heapq and bisect: the right structure for speed
--- teach
Some questions come up again and again: "what is the smallest item right now?", "where does this value go in sorted order?". Answering them by sorting every time is O(n log n) per question. Two standard-library modules answer them far faster.

**\`heapq\`: the smallest item, always ready.** A *heap* is a list kept in a special partial order where \`heap[0]\` is always the smallest item. Adding and removing are O(log n):

\`\`\`python
import heapq
h = []
for x in [5, 1, 8, 3]:
    heapq.heappush(h, x)
h[0]                    # 1   the smallest, without sorting
heapq.heappop(h)        # 1   removes and returns it
heapq.heappop(h)        # 3
heapq.nlargest(2, [5, 1, 8, 3, 9])       # [9, 8]
list(heapq.merge([1, 4, 9], [2, 3, 10])) # [1, 2, 3, 4, 9, 10]
\`\`\`

\`heapq\` only does *min*-heaps. For a max-heap, push negated numbers and negate again when you pop. Items can be tuples, \`(priority, item)\`, which compare by the first element first.

**Two heaps make a running median.** Keep the smaller half of the numbers in a max-heap (\`low\`, stored negated) and the larger half in a min-heap (\`high\`). Keep their sizes within one of each other, and every number in \`low\` no bigger than any in \`high\`. Then the median is at the top of one heap, or halfway between the two tops. Each new number costs O(log n), instead of re-sorting everything.

**\`bisect\`: positions in a sorted list.** \`bisect_left(a, x)\` is the binary search you wrote in the advanced course: the first index whose value is at least \`x\`. \`bisect_right\` gives the index just past any equal values. \`insort\` inserts while keeping the list sorted.

\`\`\`python
import bisect
bisect.bisect_left([10, 20, 30], 20)     # 1
bisect.bisect_right([10, 20, 30], 20)    # 2
\`\`\`

A classic use is mapping a number onto bands without an \`if\` chain:

\`\`\`python
breakpoints = [18.5, 25, 30]
labels = ["under", "normal", "over", "obese"]
labels[bisect.bisect_right(breakpoints, 22.0)]   # 'normal'
\`\`\`

**Common mistake:** reading \`h[1]\` as "the second smallest". A heap is only partly ordered: \`h[0]\` is the minimum, and the rest is in no useful order.
--- task
Write:

- \`k_largest(nums, k)\`: the \`k\` largest numbers, largest first, using \`heapq\`.
- \`class RunningMedian\` with \`add(x)\` and \`median()\`: the median of everything added so far (the average of the middle two when the count is even). \`median()\` with nothing added raises \`ValueError\`. Use two heaps, so 100,000 adds with a median after each are fast.
- \`grade(score)\` using \`bisect\`: below 60 is \`"F"\`, 60 up to 70 is \`"D"\`, then \`"C"\`, \`"B"\`, and 90 or more is \`"A"\`.
--- starter
import bisect
import heapq


def k_largest(nums, k):
    return sorted(nums)[:k]


class RunningMedian:
    def __init__(self):
        self.values = []

    def add(self, x):
        self.values.append(x)

    def median(self):
        s = sorted(self.values)
        return s[len(s) // 2]


def grade(score):
    return "F"
--- solution
import bisect
import heapq


def k_largest(nums, k):
    return heapq.nlargest(k, nums)


class RunningMedian:
    def __init__(self):
        self.low = []    # max-heap of the smaller half, stored negated
        self.high = []   # min-heap of the larger half

    def add(self, x):
        if self.low and x > -self.low[0]:
            heapq.heappush(self.high, x)
        else:
            heapq.heappush(self.low, -x)
        if len(self.low) > len(self.high) + 1:
            heapq.heappush(self.high, -heapq.heappop(self.low))
        elif len(self.high) > len(self.low):
            heapq.heappush(self.low, -heapq.heappop(self.high))

    def median(self):
        if not self.low:
            raise ValueError("no values yet")
        if len(self.low) > len(self.high):
            return -self.low[0]
        return (-self.low[0] + self.high[0]) / 2


def grade(score):
    return "FDCBA"[bisect.bisect_right([60, 70, 80, 90], score)]
--- hint
\`heapq.nlargest(k, nums)\` already returns them largest first.
--- hint
Keep \`low\` (negated, so it acts as a max-heap) and \`high\`. Push the new number onto the correct side, then move one number across if \`low\` has more than one extra, or \`high\` has more than \`low\`.
--- hint
If \`low\` is bigger, the median is \`-low[0]\`; otherwise it is the average of \`-low[0]\` and \`high[0]\`. For \`grade\`, \`bisect_right([60, 70, 80, 90], score)\` gives 0 to 4, an index into \`"FDCBA"\`.
--- check case | k_largest, largest first
k_largest([5, 1, 9, 3, 9, 7], 3)
=> [9, 9, 7]
--- check case | k larger than the list
k_largest([2, 1], 5)
=> [2, 1]
--- check test | Running median, odd and even counts
(lambda m: [m.add(x) or m.median() for x in [5, 15, 1, 3, 8]])(RunningMedian()) == [5, 10.0, 5, 4.0, 5]
--- check test | Negative numbers and duplicates
(lambda m: [m.add(x) or m.median() for x in [-2, -2, -10, 4]])(RunningMedian()) == [-2, -2.0, -2, -2.0]
--- check test | Empty median raises ValueError
raises(ValueError, lambda: RunningMedian().median())
--- check test | 100,000 adds, with a median after every one
(lambda m: [m.add(x) or m.median() for x in range(100000)][-1])(RunningMedian()) == 49999.5
?? Sorting on every median() call is far too slow here. Keep two heaps.
--- check case | grade boundaries
[grade(s) for s in (0, 59.9, 60, 69, 70, 80, 89.5, 90, 100)]
=> ["F", "F", "D", "D", "C", "B", "B", "A", "A"]
--- check source | grade uses bisect
bisect\\.bisect

=== py4-07 | Typing: Protocols and generics
--- teach
Type hints describe what a function expects and returns. Python itself does not enforce them at run time; tools such as mypy and pyright read them and catch mistakes before the code runs, and editors use them for autocompletion. In a large codebase they are documentation that cannot go out of date without something complaining.

\`\`\`python
def mean(values: list[float]) -> float:
    return sum(values) / len(values)
\`\`\`

**Protocols: typing by behaviour.** Python has always worked by *duck typing*: if it has an \`area()\` method, you can ask for its area. A \`Protocol\` puts that into the type system. It lists the methods something must have, and **any** class with those methods matches, with no inheritance needed:

\`\`\`python
from typing import Protocol, runtime_checkable

@runtime_checkable
class Closeable(Protocol):
    def close(self) -> None: ...

class File:
    def close(self) -> None:
        print("closed")

isinstance(File(), Closeable)   # True, though File never mentions Closeable
\`\`\`

\`@runtime_checkable\` also makes \`isinstance\` work, but at run time it only checks that the methods *exist*, not their signatures.

**Generics: one class, many types.** A \`Stack\` of ints and a \`Stack\` of strings are the same code. A **type variable** says "some type, the same one throughout":

\`\`\`python
from typing import Generic, TypeVar
T = TypeVar("T")

class Box(Generic[T]):
    def __init__(self, item: T) -> None:
        self.item = item
    def get(self) -> T:
        return self.item

def first(items: list[T]) -> T:      # returns the same type the list holds
    return items[0]

b: Box[int] = Box(3)
\`\`\`

(Since Python 3.12 you can also write \`class Box[T]:\` and \`def first[T](items: list[T]) -> T:\` without the \`TypeVar\` line.)

Hints are ordinary Python objects you can inspect: \`typing.get_type_hints(first)\` returns the annotations as a dict.

**Common mistakes.** Making a class *inherit* from a protocol "to be safe" defeats the point: protocols exist so unrelated classes match by shape. And a hint is not a check; if you need validation at run time, write it.
--- task
Write, with full type hints:

- A runtime-checkable \`Protocol\` called \`HasArea\` with a method \`area(self) -> float\`.
- Classes \`Square(side)\` and \`Circle(radius)\` with \`area()\` methods. They must **not** inherit from \`HasArea\`.
- \`total_area(shapes: Iterable[HasArea]) -> float\`.
- A generic \`class Stack(Generic[T])\` with \`push(item)\`, \`pop()\` (raises \`IndexError\` when empty), \`peek()\` (also \`IndexError\` when empty), and \`__len__\`.
- \`first(items: Sequence[T], default: T) -> T\` returning the first item, or \`default\` if \`items\` is empty.
--- starter
import math
from typing import Generic, Iterable, Protocol, Sequence, TypeVar, runtime_checkable

T = TypeVar("T")


class Square:
    def __init__(self, side):
        self.side = side


def total_area(shapes):
    return 0
--- solution
import math
from typing import Generic, Iterable, Protocol, Sequence, TypeVar, runtime_checkable

T = TypeVar("T")


@runtime_checkable
class HasArea(Protocol):
    def area(self) -> float: ...


class Square:
    def __init__(self, side: float) -> None:
        self.side = side

    def area(self) -> float:
        return self.side * self.side


class Circle:
    def __init__(self, radius: float) -> None:
        self.radius = radius

    def area(self) -> float:
        return math.pi * self.radius ** 2


def total_area(shapes: Iterable[HasArea]) -> float:
    return sum(shape.area() for shape in shapes)


class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        if not self._items:
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def peek(self) -> T:
        if not self._items:
            raise IndexError("peek at empty stack")
        return self._items[-1]

    def __len__(self) -> int:
        return len(self._items)


def first(items: Sequence[T], default: T) -> T:
    return items[0] if items else default
--- hint
A protocol is a class inheriting from \`Protocol\` whose method body is just \`...\`. Put \`@runtime_checkable\` above it.
--- hint
\`Stack(Generic[T])\` keeps a plain list inside; \`pop\` and \`peek\` check for emptiness first and raise \`IndexError\`.
--- hint
Annotate everything, including \`-> None\` on \`__init__\` and \`push\`, and \`-> float\` on \`total_area\`.
--- check test | Squares and circles match the protocol without inheriting it
isinstance(Square(2), HasArea) and isinstance(Circle(1), HasArea) and HasArea not in Square.__mro__ and not isinstance(object(), HasArea)
--- check test | total_area adds up any mix of shapes
abs(total_area([Square(2), Circle(1), Square(0.5)]) - (4 + __import__("math").pi + 0.25)) < 1e-9 and total_area([]) == 0
--- check test | total_area is annotated to return float and take HasArea items
(lambda h: h["return"] is float and "HasArea" in str(h["shapes"]))(__import__("typing").get_type_hints(total_area))
--- check case | Stack is last in, first out
(lambda s: (s.push(1), s.push(2), s.push(3), s.peek(), s.pop(), s.pop(), len(s))[3:])(Stack())
=> (3, 3, 2, 1)
--- check test | Popping or peeking an empty stack raises IndexError
raises(IndexError, lambda: Stack().pop()) and raises(IndexError, lambda: Stack().peek())
--- check test | Stack is generic: Stack[str] works and has one type parameter
len(Stack.__parameters__) == 1 and len(Stack[str]()) == 0
--- check test | first, with and without items
first([7, 8], 0) == 7 and first([], "none") == "none" and first("xyz", "?") == "x"

=== py4-08 | Testing: write the test that catches the bug
--- teach
A test is a small program that checks another program. The most valuable tests are the ones that **fail when the code is wrong**. A test that passes on buggy code is worse than none, because it makes you confident.

The shape of a test is **arrange, act, assert**:

\`\`\`python
def test_slugify():
    # arrange: an input; act: call the code; assert: compare with what it should be
    assert slugify("Hello, World") == "hello-world"
    assert slugify("") == ""
\`\`\`

\`assert condition, message\` raises \`AssertionError\` (with the message) if the condition is false. Test runners such as \`pytest\` find functions whose names start with \`test_\`, run them, and report every \`AssertionError\`.

**How to choose test cases.** Do not pick random examples; pick the cases that *break* implementations:

- **Each rule in the specification** gets a case that only passes if that rule is implemented.
- **Boundaries**: exactly at a limit, one either side of it. Off-by-one bugs live there.
- **Exceptions to the rule, and exceptions to the exceptions.**
- **Both outcomes**: a test that only ever expects \`True\` cannot catch a function that always returns \`True\`.
- **Degenerate inputs**: empty, zero, one element, negative.

A useful habit: **imagine the likely bugs**, then make sure some case catches each one. Professionals check their tests exactly like that, by deliberately breaking the code ("mutation testing") and seeing whether any test notices.

**Tests take the code as a parameter here.** To check your test, the checker calls it with several implementations, some correct and some broken:

\`\`\`python
def test_absolute(absolute):
    assert absolute(5) == 5       # catches "return -x"
    assert absolute(-5) == 5      # catches "return x"
    assert absolute(0) == 0       # the boundary between the two cases
\`\`\`

**Common mistakes.** Recomputing the expected value with the same logic as the code under test (then both are wrong together). Asserting on too little. And tests that depend on each other's order or on shared state.
--- task
The rule for leap years: a year is a leap year if it is divisible by 4, **except** years divisible by 100, which are not, **except** years divisible by 400, which are.

Write \`test_is_leap(is_leap)\`. It takes a function \`is_leap(year)\` that should return \`True\` or \`False\`, and uses \`assert\` to check it. Your test must **pass** (return without error) for a correct implementation, and **raise \`AssertionError\`** for every buggy one the checker tries. Think about which bugs are likely.
--- starter
def test_is_leap(is_leap):
    assert is_leap(2024)
--- solution
def test_is_leap(is_leap):
    # the basic rule, both ways
    assert is_leap(2024) is True
    assert is_leap(2023) is False
    assert is_leap(4) is True
    # divisible by 100: not a leap year
    assert is_leap(1900) is False
    assert is_leap(1800) is False
    assert is_leap(2100) is False
    assert is_leap(2200) is False
    # divisible by 400: a leap year again, before and after 2000
    assert is_leap(2000) is True
    assert is_leap(1600) is True
    assert is_leap(2400) is True
    # near the boundaries
    assert is_leap(1999) is False
    assert is_leap(2001) is False
    assert is_leap(1996) is True
--- hint
List the three rules, and for each one, write a year that is only right if that rule is implemented.
--- hint
Test both outcomes: some years that are leap years and some that are not. A test with only "True" cases cannot catch a function that always says True.
--- hint
Years such as 1900 and 2100 (divisible by 100) catch a missing century rule; 2000 and also 1600 or 2400 (divisible by 400) catch a missing or half-done 400 rule.
--- check test | Passes a correct implementation
not raises(AssertionError, lambda: test_is_leap(lambda y: y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)))
--- check test | Passes the standard library's implementation
not raises(AssertionError, lambda: test_is_leap(__import__("calendar").isleap))
--- check test | Catches a function that ignores the century rule
raises(AssertionError, lambda: test_is_leap(lambda y: y % 4 == 0))
--- check test | Catches a function that forgets the 400 rule
raises(AssertionError, lambda: test_is_leap(lambda y: y % 4 == 0 and y % 100 != 0))
--- check test | Catches a function that always says True
raises(AssertionError, lambda: test_is_leap(lambda y: True))
--- check test | Catches a 400 rule that only works from 2000 on
raises(AssertionError, lambda: test_is_leap(lambda y: (y % 4 == 0 and y % 100 != 0) or (y % 400 == 0 and y >= 2000)))
?? Try a year divisible by 400 other than 2000.
--- check test | Catches a function that checks divisibility by 40 instead of 400
raises(AssertionError, lambda: test_is_leap(lambda y: y % 4 == 0 and (y % 100 != 0 or y % 40 == 0)))
?? Try several century years that are not leap years, not just one.

=== py4-09 | Design: pure logic, thin I/O, injected dependencies
--- teach
Look at almost any hard-to-test program and you find the same problem: the **logic is tangled with the input and output**. The function that decides *what* should happen also reads the keyboard, prints, sends email or looks at the clock. To test it, you would have to type input and read the screen.

The fix is an architecture sometimes called **functional core, imperative shell**:

- A **pure core**: functions that take data and return data. No \`input()\`, no \`print()\`, no global state, no clock. Same input, same output, every time. Trivial to test.
- A **thin shell**: a small layer that reads input, calls the core, and writes output. It has almost no logic, so it barely needs testing.

**Dependency injection** is how the shell stays swappable. Instead of reaching out for \`print\` or the clock itself, a function *receives* them as parameters:

\`\`\`python
def run(lines, notify):
    for line in lines:
        ...
        notify(f"alert: {line}")

run(sys.stdin.read().splitlines(), print)    # the real program
sent = []
run(["a", "b"], sent.append)                 # a test: collect what would be sent
\`\`\`

The same goes for time: \`def is_overdue(due, today)\` is testable for any date; \`def is_overdue(due)\` that calls \`date.today()\` inside is only testable today.

**Reading input.** A program reads what the user types, or pipes in, from **standard input**: in this editor, the Input box. \`input()\` reads one line and returns it without the newline; \`sys.stdin.read()\` (after \`import sys\`) reads all of it at once as one string, and \`.splitlines()\` turns that into a list of lines. Only the shell reads input; the pure core is handed the lines.

**A program's entry point** goes under \`if __name__ == "__main__":\`. That block runs when the file is executed as a program, but not when another file imports it to reuse (or test) the functions.

**Common mistake:** "injecting" by setting a global variable that the function reads. That still couples everything to one shared value; pass it in as an argument.
--- task
The stock checker works but is one tangled function. Refactor it so that the **output stays exactly the same** for the given input, into:

- \`parse_stock(lines)\` → a list of \`(name, stock, minimum)\` tuples with ints, skipping blank lines.
- \`needs_reorder(items)\` → only the items whose stock is **below** their minimum, in order.
- \`format_alert(item)\` → \`"REORDER widget: 3 left (minimum 10)"\`.
- \`run(lines, notify)\` → calls \`notify(message)\` once per alert, then once with the summary \`"2 of 5 items need reordering"\`, and returns the number of alerts. It must not print anything itself.
- The entry point, under \`if __name__ == "__main__":\`, calls \`run\` with the lines of standard input and \`print\`.
--- starter
import sys


def main():
    count = 0
    total = 0
    for line in sys.stdin.read().splitlines():
        line = line.strip()
        if not line:
            continue
        total += 1
        name, stock, minimum = line.split()
        stock = int(stock)
        minimum = int(minimum)
        if stock < minimum:
            count += 1
            print(f"REORDER {name}: {stock} left (minimum {minimum})")
    print(f"{count} of {total} items need reordering")


main()
--- solution
import sys


def parse_stock(lines):
    items = []
    for line in lines:
        if not line.strip():
            continue
        name, stock, minimum = line.split()
        items.append((name, int(stock), int(minimum)))
    return items


def needs_reorder(items):
    return [item for item in items if item[1] < item[2]]


def format_alert(item):
    name, stock, minimum = item
    return f"REORDER {name}: {stock} left (minimum {minimum})"


def run(lines, notify):
    items = parse_stock(lines)
    low = needs_reorder(items)
    for item in low:
        notify(format_alert(item))
    notify(f"{len(low)} of {len(items)} items need reordering")
    return len(low)


if __name__ == "__main__":
    run(sys.stdin.read().splitlines(), print)
--- stdin
widget 3 10
gizmo 25 5

sprocket 0 1
doohickey 7 7
flange 40 12
--- hint
Pull out the pure pieces first: \`parse_stock\` (the loop that builds tuples), \`needs_reorder\` (a filter), \`format_alert\` (the f-string). None of them prints.
--- hint
\`run(lines, notify)\` wires them together and calls \`notify(...)\` where the old code called \`print(...)\`.
--- hint
The entry point is two lines: \`if __name__ == "__main__":\` and \`run(sys.stdin.read().splitlines(), print)\`.
--- check output | The program's output is unchanged
REORDER widget: 3 left (minimum 10)
REORDER sprocket: 0 left (minimum 1)
2 of 5 items need reordering
--- check case | parse_stock builds tuples and skips blank lines
parse_stock(["bolt 4 9", "  ", "nut 12 3"])
=> [("bolt", 4, 9), ("nut", 12, 3)]
--- check case | needs_reorder keeps only items below their minimum
needs_reorder([("a", 1, 2), ("b", 2, 2), ("c", 5, 1), ("d", 0, 3)])
=> [("a", 1, 2), ("d", 0, 3)]
--- check case | format_alert
format_alert(("washer", 3, 10))
=> "REORDER washer: 3 left (minimum 10)"
--- check case | run sends messages through the notifier it is given
(lambda sent: (run(["bolt 1 5", "nut 9 2"], sent.append), sent))([])
=> (1, ["REORDER bolt: 1 left (minimum 5)", "1 of 2 items need reordering"])
--- check case | run with nothing to report
(lambda sent: (run([], sent.append), sent))([])
=> (0, ["0 of 0 items need reordering"])

=== py4-10 | Debugging: floating-point surprises
--- teach
This looks like a bug in Python:

\`\`\`python
0.1 + 0.2            # 0.30000000000000004
0.1 + 0.2 == 0.3     # False
round(2.675, 2)      # 2.67, not 2.68
\`\`\`

It is not a bug; it is how floats work in every language. A \`float\` stores numbers in **binary**, and most decimal fractions, including 0.1, have no exact binary form, the same way 1/3 has no exact decimal form. Each float is the nearest representable value, and tiny errors appear when you add them up. \`2.675\` is actually stored as \`2.67499999...\`, which is why it rounds down.

**Diagnose it.** When a comparison of computed numbers fails "impossibly", print with \`repr()\` or with many digits: \`f"{x:.20f}"\`. If you see \`...0000004\` or \`...9999998\`, it is floating point.

**Choose the right fix for the job:**

1. **Measurements and science** (lengths, sensor readings, physics): floats are right, but never compare them with \`==\`. Compare with a tolerance:

\`\`\`python
import math
math.isclose(0.1 + 0.2, 0.3)                       # True (relative tolerance 1e-9)
math.isclose(1e-12, 0.0, abs_tol=1e-9)             # True: near zero you need abs_tol
\`\`\`

A relative tolerance alone never considers anything "close" to exactly 0, so add \`abs_tol\` when zero is a possible answer.

2. **Money**: never use floats. Use \`decimal.Decimal\`, created **from strings**:

\`\`\`python
from decimal import Decimal
Decimal("0.10") + Decimal("0.20") == Decimal("0.30")    # True, exactly
Decimal(0.1)      # Decimal('0.1000000000000000055511151231257827...')  the float's error, preserved
\`\`\`

Or work in whole cents as \`int\`.

3. **Exact fractions** (ratios, probabilities): \`fractions.Fraction(1, 3) * 3 == 1\` is exactly \`True\`.

**Splitting money** has its own trap: 10.00 split three ways is not three times 3.33, because a cent disappears. Work in cents, give everyone the rounded-down share, then hand out the leftover cents one each.
--- task
**Bug report** from the finance team:

1. \`is_settled(["0.10", "0.20", "-0.30"])\` says \`False\`, but those transactions cancel out. \`balance\` must return the exact total as a \`Decimal\`.
2. \`split("10.00", 3)\` returns three equal shares that add up to 9.99. It must return a list of \`Decimal\` amounts in cents that add up **exactly** to the total, with any leftover cents going one each to the first people: \`[Decimal("3.34"), Decimal("3.33"), Decimal("3.33")]\`.
3. \`same_reading(0.1 + 0.2, 0.3)\` says two sensor readings differ. Readings count as the same if they are within a relative tolerance of \`1e-9\` or an absolute tolerance of \`1e-9\`.
--- starter
def balance(amounts):
    return sum(float(a) for a in amounts)


def is_settled(amounts):
    return balance(amounts) == 0


def split(total, people):
    share = round(float(total) / people, 2)
    return [share] * people


def same_reading(a, b):
    return a == b
--- solution
import math
from decimal import Decimal


def balance(amounts):
    return sum((Decimal(a) for a in amounts), Decimal("0"))


def is_settled(amounts):
    return balance(amounts) == 0


def split(total, people):
    cents = int(Decimal(total) * 100)
    base, extra = divmod(cents, people)
    return [Decimal(base + (1 if i < extra else 0)) / 100 for i in range(people)]


def same_reading(a, b):
    return math.isclose(a, b, rel_tol=1e-9, abs_tol=1e-9)
--- hint
Print \`repr(balance(["0.10", "0.20", "-0.30"]))\`. Then build each amount with \`Decimal(a)\` from the string, never from a float.
--- hint
\`sum\` starts from the int \`0\`; give it a \`Decimal("0")\` start so the result is always a \`Decimal\`, even for no amounts.
--- hint
For \`split\`, turn the total into whole cents, \`divmod(cents, people)\` gives each person's base share and the leftover cents; give one extra cent to each of the first \`extra\` people, then divide by 100 as a \`Decimal\`.
--- check case | balance is exact
balance(["0.10", "0.20"])
=> __import__("decimal").Decimal("0.30")
--- check test | balance returns a Decimal, even for no amounts
type(balance(["1.5"])).__name__ == "Decimal" and balance([]) == 0 and type(balance([])).__name__ == "Decimal"
--- check test | Transactions that cancel out are settled
is_settled(["0.10", "0.20", "-0.30"]) and is_settled([]) and not is_settled(["0.01"])
--- check case | split gives leftover cents to the first people
split("10.00", 3)
=> [__import__("decimal").Decimal("3.34"), __import__("decimal").Decimal("3.33"), __import__("decimal").Decimal("3.33")]
--- check test | split always adds up exactly
all(sum(split(t, n)) == __import__("decimal").Decimal(t) for t in ("100.00", "0.05", "19.99", "7.00") for n in (1, 2, 3, 7))
--- check test | same_reading uses a tolerance
same_reading(0.1 + 0.2, 0.3) and not same_reading(1.0, 1.001) and same_reading(1e-12, 0.0) and same_reading(1e20, 1e20 + 1)

=== py4-11 | Problem solving: edit distance
--- teach
How different are two strings? Spell checkers, DNA comparison and \`diff\` all need a precise answer. The **edit distance** (Levenshtein distance) is the fewest single-character **insertions, deletions and substitutions** that turn one string into the other. \`kitten\` → \`sitting\` takes 3: substitute k→s, substitute e→i, insert g.

**Restate as subproblems.** Let \`d(i, j)\` be the distance between the first \`i\` characters of \`a\` and the first \`j\` characters of \`b\`. Look at the last characters, \`a[i-1]\` and \`b[j-1]\`:

- If they are **equal**, they cost nothing: \`d(i, j) = d(i-1, j-1)\`.
- Otherwise, the last step was one of three edits; take the cheapest:
  - delete \`a[i-1]\`: \`d(i-1, j) + 1\`
  - insert \`b[j-1]\`: \`d(i, j-1) + 1\`
  - substitute: \`d(i-1, j-1) + 1\`

**Base cases**: turning a prefix of length \`i\` into the empty string takes \`i\` deletions, so \`d(i, 0) = i\`, and \`d(0, j) = j\`.

**Why not plain recursion?** Each call branches three ways and the same \`(i, j)\` pairs come up again and again: exponential. Memoisation fixes the repeats, but recursion depth grows to \`len(a) + len(b)\`, past Python's limit for long strings. So fill a table **bottom-up**, row by row:

\`\`\`
        ""  s  i  t  t  i  n  g
    ""   0  1  2  3  4  5  6  7
    k    1  1  2  3  4  5  6  7
    i    2  2  1  2  3  4  5  6
    ...
\`\`\`

Each cell needs only the cell to its left, the one above, and the one diagonally above-left. So you only need to keep **the previous row**, which cuts memory from \`len(a) × len(b)\` to \`len(b)\`.

The table is \`len(a) × len(b)\` cells, O(n·m) time: fine for strings of a thousand or so characters each.

**Common mistake:** an off-by-one between string indices and table indices. Row \`i\` of the table is about \`a[:i]\`, so the character it adds is \`a[i - 1]\`.
--- task
Write \`edit_distance(a, b)\` returning the fewest insertions, deletions and substitutions that turn \`a\` into \`b\`. It must handle two strings of about 1,000 characters each in a few seconds.
--- starter
def edit_distance(a, b):
    if a == b:
        return 0
    return max(len(a), len(b))
--- solution
def edit_distance(a, b):
    previous = list(range(len(b) + 1))
    for i in range(1, len(a) + 1):
        current = [i] + [0] * len(b)
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                current[j] = previous[j - 1]
            else:
                current[j] = 1 + min(previous[j], current[j - 1], previous[j - 1])
        previous = current
    return previous[len(b)]
--- hint
Start with the row for the empty prefix of \`a\`: \`list(range(len(b) + 1))\`, since turning \`""\` into \`b[:j]\` takes \`j\` insertions.
--- hint
Each new row starts with \`i\`. For each \`j\`, if \`a[i - 1] == b[j - 1]\` copy the diagonal (\`previous[j - 1]\`); otherwise take 1 + the smallest of above, left and diagonal.
--- hint
After the last row, the answer is its final entry, \`previous[len(b)]\`.
--- check case | kitten to sitting
edit_distance("kitten", "sitting")
=> 3
--- check test | Empty strings
edit_distance("", "abc") == 3 and edit_distance("abc", "") == 3 and edit_distance("", "") == 0
--- check case | Identical strings
edit_distance("same", "same")
=> 0
--- check test | Distance is the same in both directions
edit_distance("sunday", "saturday") == 3 and edit_distance("saturday", "sunday") == 3
--- check case | Completely different
edit_distance("abc", "xyz")
=> 3
--- check case | 1,200 characters, only 2 edits apart
edit_distance("ab" * 600, "ba" * 600)
=> 2
?? Plain recursion explodes here. Fill a table bottom-up, keeping only the previous row.
--- check case | 1,000 characters, all different
edit_distance("a" * 1000, "b" * 1000)
=> 1000

=== py4-12 | Problem solving: Dijkstra's shortest path
--- teach
BFS finds the fewest *steps*. When steps have different costs (road lengths, travel times, prices), the fewest steps can be the most expensive route. **Dijkstra's algorithm** finds the cheapest route when every cost is zero or more.

**The idea.** Like BFS, it grows outwards from the start, but in order of *total cost so far* instead of number of steps. It keeps a tentative best cost for every place it has reached, and always settles the **cheapest unsettled place next**. When a place is settled, its cost is final: any other route to it would have to pass through somewhere at least as expensive, and costs never go negative.

**The data structure** that makes "cheapest next" fast is a heap:

\`\`\`python
import heapq

def costs_from(graph, start):
    best = {start: 0}
    heap = [(0, start)]
    while heap:
        cost, node = heapq.heappop(heap)
        if cost > best[node]:
            continue                      # an old, worse entry: skip it
        for neighbour, weight in graph.get(node, []):
            new = cost + weight
            if new < best.get(neighbour, float("inf")):
                best[neighbour] = new
                heapq.heappush(heap, (new, neighbour))
    return best
\`\`\`

Details that matter:

- A node may be pushed several times as better routes appear. Instead of updating the heap in place, push the new entry and **skip stale entries** when they come off (\`cost > best[node]\`).
- **To recover the route**, record for each node which node you reached it from (\`previous[neighbour] = node\`) whenever you improve it; then walk back from the goal and reverse.
- You can **stop early** the moment the goal comes off the heap.

With a heap, Dijkstra is O(E log V) for E edges and V nodes. Scanning a plain list for the cheapest node each time is O(V²), hopeless for tens of thousands of nodes.

**Common mistake:** marking a node finished when you *push* it, as in BFS. With weights, a later, longer-looking path can still be cheaper; only popping settles a node.
--- task
Write \`cheapest(graph, start, goal)\`. \`graph\` maps each node to a list of \`(neighbour, cost)\` pairs (costs are 0 or more; a node may appear only as a neighbour and not as a key). Return \`(total_cost, path)\` where \`path\` is the list of nodes from \`start\` to \`goal\` inclusive, or \`None\` if the goal cannot be reached. \`cheapest(g, x, x)\` is \`(0, [x])\`.

It must handle a graph of about 20,000 nodes quickly.
--- starter
def cheapest(graph, start, goal):
    return None
--- solution
import heapq


def cheapest(graph, start, goal):
    best = {start: 0}
    previous = {}
    heap = [(0, start)]
    while heap:
        cost, node = heapq.heappop(heap)
        if node == goal:
            path = [node]
            while node in previous:
                node = previous[node]
                path.append(node)
            return cost, path[::-1]
        if cost > best[node]:
            continue
        for neighbour, weight in graph.get(node, []):
            new = cost + weight
            if new < best.get(neighbour, float("inf")):
                best[neighbour] = new
                previous[neighbour] = node
                heapq.heappush(heap, (new, neighbour))
    return None
--- hint
Keep \`best\` (cheapest known cost per node), \`previous\` (where you came from) and a heap of \`(cost, node)\` starting with \`(0, start)\`.
--- hint
Pop the cheapest entry; skip it if it is worse than \`best[node]\`; otherwise relax each neighbour, pushing it when you find a cheaper cost. Use \`graph.get(node, [])\` for nodes with no outgoing edges.
--- hint
When the goal is popped, follow \`previous\` back to the start, reverse the list, and return it with the cost.
--- check case | The cheaper route has more steps
cheapest({"A": [("B", 10), ("C", 1)], "C": [("D", 1)], "D": [("B", 1)]}, "A", "B")
=> (3, ["A", "C", "D", "B"])
--- check case | Start is the goal
cheapest({"A": [("B", 1)]}, "A", "A")
=> (0, ["A"])
--- check case | Unreachable
cheapest({"A": [("B", 1)], "C": [("A", 1)]}, "A", "C")
=> None
--- check case | Edges are one way
cheapest({"A": [("B", 5)], "B": [("A", 1), ("C", 1)]}, "C", "A")
=> None
--- check case | Zero-cost edges are fine
cheapest({"s": [("a", 0), ("b", 2)], "a": [("b", 0)], "b": [("t", 1)]}, "s", "t")
=> (1, ["s", "a", "b", "t"])
--- check case | A 150 by 150 weighted grid (22,500 nodes)
cheapest({(r, c): [((r + dr, c + dc), ((r + dr) * 7 + (c + dc) * 13) % 10 + 1) for dr, dc in ((0, 1), (1, 0), (0, -1), (-1, 0)) if 0 <= r + dr < 150 and 0 <= c + dc < 150] for r in range(150) for c in range(150)}, (0, 0), (149, 149))[0]
=> 745
?? Finding the cheapest node by scanning every node is far too slow here. Use a heap.

=== py4-13 | Problem solving: a tokenizer
--- teach
Over the next two lessons you will build a calculator that understands \`2 * (3 + 4) - -1\`, the same way real interpreters and compilers work, in two stages:

1. **Tokenizing** (this lesson): turn the characters into a list of meaningful pieces, **tokens**: \`2\`, \`*\`, \`(\`, \`3\`, \`+\`, \`4\`, \`)\`, \`-\`, \`-\`, \`1\`.
2. **Parsing** (next lesson): work out the structure of the tokens and compute the result.

Splitting the job keeps each half simple: the parser never has to think about spaces or how many characters a number has.

**How a tokenizer works.** Walk through the text with an index \`i\`. Look at the character there and decide what kind of token starts at that position:

\`\`\`python
i = 0
while i < len(text):
    ch = text[i]
    if ch.isspace():
        i += 1                      # skip it, no token
    elif ch.isdigit():
        start = i
        while i < len(text) and text[i].isdigit():
            i += 1                  # consume the whole number
        tokens.append(int(text[start:i]))
    elif ...
\`\`\`

The key rule is **maximal munch**: always take the *longest* token that fits. \`123\` is one number, not three; \`**\` is one power operator, not two multiplications. So when you see \`*\`, peek at the next character before deciding.

**Report errors precisely.** When a character does not start any token, raise an error that says *what* and *where*: \`unexpected character '$' at position 4\`. That message is the difference between a tool people can use and one they give up on.

**Common mistake:** writing \`text = text[1:]\` to move along. It works, but copies the rest of the string every time, making the tokenizer quadratic. Move an index instead.
--- task
Write \`tokenize(text)\` returning a list of tokens:

- Numbers: a run of digits with at most one \`.\`. With a \`.\` it becomes a \`float\`, otherwise an \`int\`. A run with two dots (\`1.2.3\`) or only a dot is a \`ValueError\`.
- Operators and brackets as strings: \`+\`, \`-\`, \`*\`, \`/\`, \`**\`, \`(\`, \`)\`. \`**\` is one token.
- Spaces are skipped. Any other character raises \`ValueError\` with a message containing its position, like \`unexpected character '$' at position 4\`.
--- starter
def tokenize(text):
    return text.split()
--- solution
def tokenize(text):
    tokens = []
    i = 0
    while i < len(text):
        ch = text[i]
        if ch.isspace():
            i += 1
        elif ch.isdigit() or ch == ".":
            start = i
            while i < len(text) and (text[i].isdigit() or text[i] == "."):
                i += 1
            number = text[start:i]
            if number.count(".") > 1 or number == ".":
                raise ValueError(f"bad number {number!r} at position {start}")
            tokens.append(float(number) if "." in number else int(number))
        elif text.startswith("**", i):
            tokens.append("**")
            i += 2
        elif ch in "+-*/()":
            tokens.append(ch)
            i += 1
        else:
            raise ValueError(f"unexpected character {ch!r} at position {i}")
    return tokens
--- hint
Use a \`while i < len(text)\` loop with an index, and one branch per kind of token: space, number, \`**\`, single-character operator, anything else.
--- hint
For a number, remember \`start = i\`, move \`i\` along while you see digits or dots, then look at \`text[start:i]\`: count the dots before converting.
--- hint
Check for \`**\` with \`text.startswith("**", i)\` *before* the single \`*\` case, and move \`i\` on by 2.
--- check case | A mixed expression
tokenize("3 + 4.5*(2-1)")
=> [3, "+", 4.5, "*", "(", 2, "-", 1, ")"]
--- check case | ** is one token
tokenize("2**3*4")
=> [2, "**", 3, "*", 4]
--- check test | Whole numbers are ints, decimals are floats
type(tokenize("7")[0]) is int and type(tokenize("7.0")[0]) is float and tokenize(".5") == [0.5]
--- check test | Empty and blank input give no tokens
tokenize("") == [] and tokenize("   ") == []
--- check case | Multi-digit numbers and spaces
tokenize("  120 /  12  ")
=> [120, "/", 12]
--- check test | An unknown character is a ValueError
raises(ValueError, lambda: tokenize("3 $ 4")) and raises(ValueError, lambda: tokenize("x"))
--- check test | The error message names the character and its position
(lambda msg: "'$'" in msg and "4" in msg)((lambda g: (exec("try:\\n    tokenize('3 + $')\\nexcept ValueError as e:\\n    msg = str(e)\\n", g), g.get("msg", ""))[1])(dict(globals())))
?? Put the character (with repr, so it has quotes) and the index i in the message.
--- check test | A number with two dots is rejected
raises(ValueError, lambda: tokenize("1.2.3")) and raises(ValueError, lambda: tokenize("1 + . + 2"))
--- check test | 100,000 tokens
len(tokenize("1+" * 50000 + "1")) == 100001

=== py4-14 | Problem solving: a recursive-descent calculator
--- teach
You have tokens. Now: what does \`2 + 3 * 4\` mean? Not \`(2 + 3) * 4\`, because \`*\` binds tighter than \`+\`. A **grammar** writes those rules down, one rule per level of precedence, loosest first:

\`\`\`
expr   := term   (("+" | "-") term)*
term   := unary  (("*" | "/") unary)*
unary  := "-" unary  |  power
power  := atom   ("**" unary)?
atom   := NUMBER  |  "(" expr ")"
\`\`\`

Read \`*\` as "zero or more times" and \`?\` as "optional". So an \`expr\` is terms separated by \`+\` or \`-\`; a term is unary pieces separated by \`*\` or \`/\`; and so on down to numbers and bracketed sub-expressions.

**Recursive descent** turns each rule into one function with the same name. Each function consumes the tokens its rule matches and returns their value:

\`\`\`python
def expr(self):
    value = self.term()
    while self.peek() in ("+", "-"):
        op = self.take()
        right = self.term()
        value = value + right if op == "+" else value - right
    return value
\`\`\`

Precedence falls out of the structure: \`expr\` only ever sees whole terms, so by the time it adds, every multiplication inside a term has already happened. Brackets work because \`atom\` calls back up to \`expr\`: that is the recursion in the name.

Two subtler rules, both matching Python itself:

- **Left to right** for \`+ - * /\`: \`8 - 3 - 2\` is \`(8 - 3) - 2 = 3\`. The \`while\` loop gives you that, because it folds each new term into the value so far.
- **Right to left** for \`**\`: \`2 ** 3 ** 2\` is \`2 ** 9 = 512\`. \`power\` calls \`unary\` for its right side, which can itself contain another \`**\`. And \`-2 ** 2\` is \`-(2 ** 2) = -4\`, because \`unary\` handles the minus *around* \`power\`.

**Errors.** A parser must reject nonsense rather than guess. Keep a position in the token list, and:

- when a rule needs a number or \`(\` and finds something else (or the end), raise \`ValueError\`;
- when \`atom\` has parsed \`( expr\`, it must find \`)\`;
- after parsing the whole \`expr\`, every token must have been used, or \`1 2\` would quietly evaluate to 1.

**Common mistake:** evaluating with Python's built-in \`eval\`. Apart from missing the point, \`eval\` on user input runs *any* Python code the user types.
--- task
Your tokenizer from the last lesson is in the starter. Write \`evaluate(text)\` that tokenizes \`text\` and computes its value using recursive descent with the grammar above:

- \`+ - * /\` with the usual precedence, left to right; \`/\` is true division.
- \`**\` binds tighter than unary minus on its left and is right-associative: \`2 ** 3 ** 2\` is \`512\`, \`-2 ** 2\` is \`-4\`, \`2 ** -1\` is \`0.5\`.
- Unary minus, any number of times: \`--3\` is \`3\`.
- Brackets.
- Anything malformed (empty, a missing number, unbalanced brackets, leftover tokens) raises \`ValueError\`. Dividing by zero may raise \`ZeroDivisionError\`. Do not use \`eval\`.
--- starter
def tokenize(text):
    tokens = []
    i = 0
    while i < len(text):
        ch = text[i]
        if ch.isspace():
            i += 1
        elif ch.isdigit() or ch == ".":
            start = i
            while i < len(text) and (text[i].isdigit() or text[i] == "."):
                i += 1
            number = text[start:i]
            if number.count(".") > 1 or number == ".":
                raise ValueError(f"bad number {number!r} at position {start}")
            tokens.append(float(number) if "." in number else int(number))
        elif text.startswith("**", i):
            tokens.append("**")
            i += 2
        elif ch in "+-*/()":
            tokens.append(ch)
            i += 1
        else:
            raise ValueError(f"unexpected character {ch!r} at position {i}")
    return tokens


def evaluate(text):
    raise NotImplementedError
--- solution
def tokenize(text):
    tokens = []
    i = 0
    while i < len(text):
        ch = text[i]
        if ch.isspace():
            i += 1
        elif ch.isdigit() or ch == ".":
            start = i
            while i < len(text) and (text[i].isdigit() or text[i] == "."):
                i += 1
            number = text[start:i]
            if number.count(".") > 1 or number == ".":
                raise ValueError(f"bad number {number!r} at position {start}")
            tokens.append(float(number) if "." in number else int(number))
        elif text.startswith("**", i):
            tokens.append("**")
            i += 2
        elif ch in "+-*/()":
            tokens.append(ch)
            i += 1
        else:
            raise ValueError(f"unexpected character {ch!r} at position {i}")
    return tokens


class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0

    def peek(self):
        return self.tokens[self.pos] if self.pos < len(self.tokens) else None

    def take(self):
        token = self.peek()
        self.pos += 1
        return token

    def expr(self):
        value = self.term()
        while self.peek() in ("+", "-"):
            op = self.take()
            right = self.term()
            value = value + right if op == "+" else value - right
        return value

    def term(self):
        value = self.unary()
        while self.peek() in ("*", "/"):
            op = self.take()
            right = self.unary()
            value = value * right if op == "*" else value / right
        return value

    def unary(self):
        if self.peek() == "-":
            self.take()
            return -self.unary()
        return self.power()

    def power(self):
        base = self.atom()
        if self.peek() == "**":
            self.take()
            return base ** self.unary()
        return base

    def atom(self):
        token = self.take()
        if token == "(":
            value = self.expr()
            if self.take() != ")":
                raise ValueError("expected )")
            return value
        if isinstance(token, (int, float)):
            return token
        raise ValueError(f"expected a number, got {token!r}")


def evaluate(text):
    parser = Parser(tokenize(text))
    value = parser.expr()
    if parser.peek() is not None:
        raise ValueError(f"unexpected {parser.peek()!r}")
    return value
--- hint
Make a small \`Parser\` class holding the tokens and a position, with \`peek()\` (the current token, or \`None\` at the end) and \`take()\` (return it and move on).
--- hint
Write one method per grammar rule. \`expr\` and \`term\` are loops; \`unary\` calls itself after a \`-\`; \`power\` parses an atom and, if the next token is \`**\`, raises it to \`self.unary()\`; \`atom\` handles a number or \`( expr )\`.
--- hint
In \`evaluate\`, after \`parser.expr()\` returns, raise \`ValueError\` if any token is left over. In \`atom\`, raise \`ValueError\` if the token is not a number or \`(\`, and if the \`)\` is missing.
--- check test | Precedence and brackets
evaluate("2 + 3 * 4") == 14 and evaluate("(2 + 3) * 4") == 20 and evaluate("2 * (3 + 4) - -1") == 15
--- check test | Left to right for - and /
evaluate("8 - 3 - 2") == 3 and evaluate("100 / 10 / 5") == 2.0 and evaluate("7 - 2 * 3 + 1") == 2
--- check test | ** is right-associative and binds tighter than unary minus
evaluate("2 ** 3 ** 2") == 512 and evaluate("-2 ** 2") == -4 and evaluate("2 ** -1") == 0.5 and evaluate("(-2) ** 2") == 4
--- check test | Repeated unary minus and decimals
evaluate("--3") == 3 and evaluate("-(-(1.5))") == 1.5 and evaluate("0.1 * 10") == 1.0
--- check test | Agrees with Python on a batch of expressions
all(evaluate(e) == eval(e) for e in ["1+2*3-4/5", "((1))", "2*-3", "-2**-2", "3-(2-(1-(0)))", "10/4*2", "2**2**3", "1 - -1 - -1", "4*(3+2)**2/5"])
--- check test | Malformed input raises ValueError
all(raises(ValueError, lambda e=e: evaluate(e)) for e in ["", "2 +", "(1 + 2", "1 + 2)", "* 3", "1 2", "()", "3 ** "])
?? Check for a missing ")" in atom, and for leftover tokens after the whole expression.
--- check test | Long input: 20,001 terms
evaluate("1+" * 20000 + "1") == 20001 and evaluate("2*" * 30 + "1") == 2 ** 30
--- check source absent | Does not use eval
\\beval\\s*\\(
`,Oe=`@track python
@level intermediate
@title Python · Intermediate
@name Python, intermediate: idioms, errors, classes and the standard library
@blurb Write Python the way experienced people do: comprehensions, unpacking, dicts that count for you, exceptions you design, classes that behave, and the habits that let you read a traceback, fix the real cause and untangle messy code.

=== py2-01 | Comprehensions: list, dict and set
--- teach
You met list comprehensions at the end of the basics. They come in three shapes, and they are worth knowing well because Python code is full of them:

\`\`\`python
nums = [3, 1, 4, 1, 5, 9, 2, 6]

[n * 10 for n in nums if n > 3]        # list: [40, 50, 90, 60]
{n % 3 for n in nums}                  # set:  {0, 1, 2}   (no duplicates)
{n: n * n for n in nums if n % 2 == 0} # dict: {4: 16, 2: 4, 6: 36}
\`\`\`

Read each one left to right as a sentence: *"\`n * 10\`, for each \`n\` in \`nums\`, if \`n > 3\`"*. The brackets decide what you get: \`[...]\` a list, \`{x ...}\` a set, \`{k: v ...}\` a dict.

**Why bother?** A comprehension says *what* the result is in one line, where a loop says *how* to build it over four. The reader sees "a list of these, filtered by that" at a glance, and there is no half-built variable to get wrong.

You can loop twice, which reads like nested \`for\` loops in the same order:

\`\`\`python
[(r, c) for r in range(2) for c in range(3)]
# [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2)]
\`\`\`

A condition can also choose between two values. That \`if ... else\` goes *before* the \`for\`, because it is part of the expression, not a filter:

\`\`\`python
["even" if n % 2 == 0 else "odd" for n in [1, 2, 3]]   # ['odd', 'even', 'odd']
\`\`\`

\`a if condition else b\` is a **conditional expression**, and it works anywhere a value does, not just in comprehensions: \`label = "even" if n % 2 == 0 else "odd"\`.

**Truthiness.** In any \`if\`, Python treats empty or zero values — \`""\`, \`[]\`, \`{}\`, \`set()\`, \`0\`, \`None\` — as false, and everything else as true. So \`if name:\` means "if \`name\` is not empty", and a comprehension's \`if name\` skips the empty strings.

**Common mistakes.**

- \`{}\` on its own is an empty *dict*, not an empty set. Write \`set()\` for an empty set.
- Swapping keys and values with \`{v: k for k, v in d.items()}\` silently loses entries when two keys share a value: the later one wins.
- A comprehension with side effects (\`[print(x) for x in xs]\`) builds a useless list. Use a plain loop when you want to *do* something rather than *make* something.
--- task
Write three functions, each a single comprehension:

- \`squares_of_odds(nums)\` returns a list of the squares of the odd numbers, in their original order.
- \`invert(d)\` returns a new dict with keys and values swapped.
- \`initials(names)\` returns the **set** of lowercase first letters of the names, skipping empty strings.
--- starter
def squares_of_odds(nums):
    result = []
    return result


def invert(d):
    return d


def initials(names):
    return set()
--- solution
def squares_of_odds(nums):
    return [n * n for n in nums if n % 2 == 1]


def invert(d):
    return {v: k for k, v in d.items()}


def initials(names):
    return {name[0].lower() for name in names if name}
--- hint
Each function body can be one \`return\` of a comprehension. Decide on the brackets first: list, dict, or set?
--- hint
For \`invert\`, loop over \`d.items()\`, which gives you \`(key, value)\` pairs, and put the value first.
--- hint
For \`initials\`, \`if name\` skips empty strings because an empty string counts as false: \`{name[0].lower() for name in names if name}\`.
--- check case | squares_of_odds keeps odd numbers, squared, in order
squares_of_odds([1, 2, 3, 4, 5])
=> [1, 9, 25]
--- check case | Negative odd numbers count too
squares_of_odds([-3, -2, 0, 7])
=> [9, 49]
--- check case | squares_of_odds of an empty list is empty
squares_of_odds([])
=> []
--- check case | invert swaps keys and values
invert({"a": 1, "b": 2})
=> {1: "a", 2: "b"}
--- check test | invert does not change the dict you pass in
(lambda d: (invert(d), d)[1] == {"x": 9})({"x": 9})
--- check case | initials is a set of lowercase first letters
initials(["Ada", "alan", "Grace", "", "guido"])
=> {"a", "g"}
--- check case | initials of no names is an empty set
initials([])
=> set()

=== py2-02 | Tuples, unpacking, enumerate and zip
--- teach
A **tuple** is an ordered group of values, written with commas (the brackets are usually optional):

\`\`\`python
point = (3, 4)
point[0]            # 3
len(point)          # 2
\`\`\`

Unlike a list, a tuple cannot be changed after it is made. That makes it the natural type for a *fixed bundle* of values that belong together: a coordinate, an \`(x, y, z)\`, a function returning two results.

**Unpacking** pulls a tuple (or any sequence) apart into names in one go:

\`\`\`python
x, y = point               # x is 3, y is 4
a, b = 1, 2
a, b = b, a                # swap without a temporary variable
first, *rest = [10, 20, 30, 40]   # first is 10, rest is [20, 30, 40]
\`\`\`

A function "returns two things" by returning a tuple, and the caller unpacks it:

\`\`\`python
def div_mod(a, b):
    return a // b, a % b

q, r = div_mod(17, 5)      # q is 3, r is 2
\`\`\`

Two built-ins make loops cleaner, and both hand you tuples to unpack:

\`\`\`python
names = ["ada", "lin", "sam"]
scores = [91, 78, 85]

list(enumerate(names, start=1))   # [(1, 'ada'), (2, 'lin'), (3, 'sam')]
list(zip(names, scores))          # [('ada', 91), ('lin', 78), ('sam', 85)]
dict(zip(names, scores))          # {'ada': 91, 'lin': 78, 'sam': 85}

for i, name in enumerate(names, start=1):
    print(i, name)
\`\`\`

**Common mistakes.**

- \`for i in range(len(names)): print(names[i])\` works but is clumsy and easy to get wrong. Use \`enumerate\` when you need the position.
- \`zip\` stops at the *shortest* input, silently. If the lists should be the same length, \`zip(a, b, strict=True)\` raises an error when they are not.
- A one-element tuple needs a trailing comma: \`(5,)\`. \`(5)\` is just the number 5 in brackets.
--- task
Write:

- \`min_max(nums)\` returning a tuple \`(smallest, largest)\`.
- \`numbered(lines)\` returning a list of strings like \`"1. first"\`, \`"2. second"\`, numbering from 1 (use \`enumerate\`).
- \`scoreboard(names, scores)\` returning a dict mapping each name to its score (use \`zip\`).
- \`head_tail(items)\` returning a tuple \`(first_item, list_of_the_rest)\` using star unpacking.
--- starter
def min_max(nums):
    pass


def numbered(lines):
    pass


def scoreboard(names, scores):
    pass


def head_tail(items):
    pass
--- solution
def min_max(nums):
    return min(nums), max(nums)


def numbered(lines):
    return [f"{i}. {line}" for i, line in enumerate(lines, start=1)]


def scoreboard(names, scores):
    return dict(zip(names, scores))


def head_tail(items):
    first, *rest = items
    return first, rest
--- hint
\`return a, b\` returns the tuple \`(a, b)\`.
--- hint
\`enumerate(lines, start=1)\` gives \`(1, line)\`, \`(2, line)\`… Unpack them in the comprehension: \`for i, line in enumerate(...)\`.
--- hint
\`first, *rest = items\` puts the first item in \`first\` and a list of the others in \`rest\`.
--- check case | min_max returns a (smallest, largest) tuple
min_max([4, -2, 9, 0])
=> (-2, 9)
--- check case | min_max of one number
min_max([7])
=> (7, 7)
--- check case | numbered counts from 1
numbered(["wake", "code", "sleep"])
=> ["1. wake", "2. code", "3. sleep"]
--- check case | numbered of nothing is an empty list
numbered([])
=> []
--- check case | scoreboard pairs names with scores
scoreboard(["ada", "lin"], [91, 78])
=> {"ada": 91, "lin": 78}
--- check case | head_tail splits the first item from the rest
head_tail([10, 20, 30])
=> (10, [20, 30])
--- check case | head_tail of a single item has an empty rest
head_tail(["only"])
=> ("only", [])

=== py2-03 | String methods and f-string formatting
--- teach
Strings come with a large toolkit. The ones you will reach for constantly:

\`\`\`python
s = "  Launch Window: 14:05  "
s.strip()                      # 'Launch Window: 14:05'
s.strip().split(": ")          # ['Launch Window', '14:05']
"a,b,,c".split(",")            # ['a', 'b', '', 'c']
"-".join(["2026", "09", "25"]) # '2026-09-25'
"report.csv".endswith(".csv")  # True
"hello".replace("l", "L")      # 'heLLo'
"Ada Lovelace".title()         # 'Ada Lovelace'
"abc123".isalnum(), "42".isdigit()   # (True, True)
"key=value=x".partition("=")   # ('key', '=', 'value=x')
\`\`\`

\`sep.join(pieces)\` is the opposite of \`split\`: it glues a list of strings together with \`sep\` between them. It accepts any iterable of strings, including a comprehension written without its square brackets, \`"".join(c.upper() for c in "abc")\` → \`'ABC'\`. (That bracket-less form is a *generator expression*; the advanced course explains what it really is.)

Strings are **immutable**: every method returns a *new* string. \`s.upper()\` on its own line does nothing useful. You must keep the result: \`s = s.upper()\`.

**f-strings can format, not just insert.** After the value, a colon starts a *format spec*:

\`\`\`python
price = 1234.5
f"{price:.2f}"       # '1234.50'     two decimal places
f"{price:,.2f}"      # '1,234.50'    with a thousands separator
f"{42:5d}"           # '   42'       width 5, right-aligned (numbers default right)
f"{'ab':<5}|"        # 'ab   |'      left-align in width 5
f"{'ab':>5}|"        # '   ab|'      right-align
f"{'ab':^6}|"        # '  ab  |'     centre
f"{7:03d}"           # '007'         pad with zeros
f"{0.256:.1%}"       # '25.6%'
\`\`\`

The order inside the spec is *align, width, comma, precision, type*. Aligned columns are how you make text reports readable:

\`\`\`python
for name, qty in [("tea", 3), ("biscuits", 12)]:
    print(f"{name:<10}{qty:>4}")
\`\`\`

**Common mistakes.** \`str.split()\` with no argument splits on any run of whitespace and drops empty pieces; \`str.split(" ")\` splits on every single space and keeps empty strings. And a width is a *minimum*: a value longer than the width is never cut short.
--- task
Write two functions.

\`format_row(item, qty, price)\` returns one line of a receipt: the item name left-aligned in a column 10 wide, the quantity right-aligned in 4, then the line total (\`qty * price\`) right-aligned in 12 with a thousands separator and 2 decimals. For example \`format_row("apple", 3, 0.5)\` is \`"apple        3        1.50"\`.

\`slugify(title)\` turns a title into a URL slug: lowercase, every run of characters that are not letters or digits becomes a single \`-\`, and there is no \`-\` at either end. \`slugify("  Hello, World!  ")\` is \`"hello-world"\`.
--- starter
def format_row(item, qty, price):
    return f"{item} {qty} {qty * price}"


def slugify(title):
    return title.lower()
--- solution
def format_row(item, qty, price):
    return f"{item:<10}{qty:>4}{qty * price:>12,.2f}"


def slugify(title):
    kept = "".join(c if c.isalnum() else " " for c in title.lower())
    return "-".join(kept.split())
--- hint
The spec for the total is \`>12,.2f\`: right-align, width 12, thousands separator, 2 decimals.
--- hint
For \`slugify\`, first replace every character that is not \`isalnum()\` with a space. Then the problem becomes "join the words with hyphens".
--- hint
\`"-".join(text.split())\` joins the words with hyphens, and \`split()\` with no argument already ignores runs of spaces and spaces at the ends.
--- check case | format_row lines up the three columns
format_row("apple", 3, 0.5)
=> "apple     " + "   3" + "        1.50"
--- check case | Large totals get a thousands separator
format_row("laptop", 2, 1250.0)
=> "laptop    " + "   2" + "    2,500.00"
--- check case | A long name is not cut short
format_row("watermelons", 1, 3.0)
=> "watermelons" + "   1" + "        3.00"
--- check case | slugify lowercases and joins words with hyphens
slugify("  Hello, World!  ")
=> "hello-world"
--- check case | Punctuation between words becomes one hyphen
slugify("Python 3.13 -- is out!")
=> "python-3-13-is-out"
--- check case | A title with no letters or digits gives an empty slug
slugify("!!! ---")
=> ""

=== py2-04 | Dicts in depth: get, setdefault, Counter and defaultdict
--- teach
Counting and grouping are two of the most common things programs do, and Python has a tool for each.

**\`get\` and \`setdefault\`.** \`d.get(key, default)\` reads without failing when the key is missing. \`d.setdefault(key, default)\` reads *and*, if the key is missing, stores the default first, then returns the stored value. That makes grouping a one-liner:

\`\`\`python
groups = {}
for word in ["apple", "avocado", "banana"]:
    groups.setdefault(word[0], []).append(word)
groups   # {'a': ['apple', 'avocado'], 'b': ['banana']}
\`\`\`

**Importing.** Python ships with a large **standard library** of modules. \`collections\` is one of them. \`import collections\` makes it available as \`collections.Counter\`; \`from collections import Counter\` brings that one name in directly. Imports go at the top of the file.

**\`collections.defaultdict\`** does the same thing without having to say it every time: you give it a function that makes the default, and it calls that the first time a key is used.

\`\`\`python
from collections import defaultdict
groups = defaultdict(list)
for word in ["apple", "avocado", "banana"]:
    groups[word[0]].append(word)
dict(groups)   # {'a': ['apple', 'avocado'], 'b': ['banana']}
\`\`\`

**\`collections.Counter\`** is a dict built for counting:

\`\`\`python
from collections import Counter
c = Counter("mississippi")
c["s"]              # 4
c["z"]              # 0   (missing keys count as zero, no KeyError)
c.most_common(2)    # [('i', 4), ('s', 4)]
\`\`\`

\`most_common\` sorts by count, highest first; equal counts keep the order in which the items were *first seen*. That matters when you write checks that expect an exact order.

**Common mistakes.**

- Reading a \`defaultdict\` with \`groups[key]\` *creates* the key. To ask "is it there?" use \`key in groups\`.
- \`d.setdefault(k, []).append(x)\` is fine, but \`d.get(k, []).append(x)\` does nothing: \`get\` hands back a fresh list that is never stored.
- A \`Counter\` or \`defaultdict\` is still a dict, but it prints differently. Convert with \`dict(...)\` when you return it to code that expects a plain dict.
--- task
Write:

- \`group_by_length(words)\` returning a plain \`dict\` from word length to the list of words of that length, in their original order. Use \`defaultdict\`.
- \`top_words(text, n)\` returning the \`n\` most common lowercase words of \`text\` as a list of \`(word, count)\` tuples. Use \`Counter\`.
--- starter
from collections import Counter, defaultdict


def group_by_length(words):
    return {}


def top_words(text, n):
    return []
--- solution
from collections import Counter, defaultdict


def group_by_length(words):
    groups = defaultdict(list)
    for word in words:
        groups[len(word)].append(word)
    return dict(groups)


def top_words(text, n):
    return Counter(text.lower().split()).most_common(n)
--- hint
\`groups = defaultdict(list)\` and then \`groups[len(word)].append(word)\`. No \`if\` needed.
--- hint
Return \`dict(groups)\` so the caller gets a plain dict.
--- hint
\`Counter(some_list).most_common(n)\` already returns a list of \`(item, count)\` tuples.
--- check case | group_by_length groups words by their length
group_by_length(["hi", "yo", "hey", "a"])
=> {2: ["hi", "yo"], 3: ["hey"], 1: ["a"]}
--- check test | group_by_length returns a plain dict
type(group_by_length(["a"])) is dict
?? Wrap the defaultdict in dict(...) before returning it.
--- check case | No words, no groups
group_by_length([])
=> {}
--- check case | top_words counts case-insensitively
top_words("the cat and The dog and THE end", 2)
=> [("the", 3), ("and", 2)]
--- check case | Ties keep the order the words first appeared
top_words("b a b a c", 3)
=> [("b", 2), ("a", 2), ("c", 1)]
--- check case | top_words of empty text is empty
top_words("", 5)
=> []

=== py2-05 | Sorting with key= and lambda
--- teach
\`sorted(items)\` returns a new sorted list; \`items.sort()\` sorts the list in place and returns \`None\`. Both take two optional arguments that do most of the real work: \`key\` and \`reverse\`.

\`key\` is a function Python calls on each item to get *the value to sort by*:

\`\`\`python
words = ["banana", "Kiwi", "apple"]
sorted(words)                    # ['Kiwi', 'apple', 'banana']  (capitals sort first)
sorted(words, key=str.lower)     # ['apple', 'banana', 'Kiwi']
sorted(words, key=len)           # ['Kiwi', 'apple', 'banana']
\`\`\`

For a one-off key you write a **lambda**, a small nameless function: \`lambda p: p["age"]\` means "given \`p\`, return \`p['age']\`".

\`\`\`python
people = [{"name": "Lin", "age": 30}, {"name": "Ada", "age": 36}, {"name": "Sam", "age": 30}]
sorted(people, key=lambda p: p["age"])
# Lin 30, Sam 30, Ada 36
\`\`\`

**Sorting by several things.** Return a tuple: tuples compare their first items, and only look at the second when the first are equal. To sort one part the other way, negate it if it is a number:

\`\`\`python
sorted(people, key=lambda p: (-p["age"], p["name"]))
# Ada 36, Lin 30, Sam 30   (oldest first, then by name)
\`\`\`

Python's sort is **stable**: items that compare equal keep their original order. That is true with \`reverse=True\` too.

The same \`key=\` works on \`min\` and \`max\`: \`max(people, key=lambda p: p["age"])\` is the oldest person, not the largest dict.

**Common mistakes.**

- \`names = names.sort()\` sets \`names\` to \`None\`. Either \`names.sort()\` on its own line, or \`names = sorted(names)\`.
- \`key=len()\` calls \`len\` with nothing and fails. Pass the function itself: \`key=len\`.
- Negating only works for numbers. To sort strings descending inside a tuple key, sort twice (stability makes that correct) or use \`reverse=True\` on the whole thing.
--- task
Each person is a dict with \`"name"\` and \`"age"\`. Write:

- \`by_age_then_name(people)\` returning a new list, oldest first, ties broken by name A to Z.
- \`longest_first(words)\` returning the words sorted by length, longest first, with words of equal length keeping their original order.
- \`youngest(people)\` returning the **name** of the youngest person, using \`min\` with a key.
--- starter
def by_age_then_name(people):
    return people


def longest_first(words):
    return sorted(words)


def youngest(people):
    return min(people)
--- solution
def by_age_then_name(people):
    return sorted(people, key=lambda p: (-p["age"], p["name"]))


def longest_first(words):
    return sorted(words, key=len, reverse=True)


def youngest(people):
    return min(people, key=lambda p: p["age"])["name"]
--- hint
A key can return a tuple: \`(-p["age"], p["name"])\` sorts by age descending, then name ascending.
--- hint
For \`longest_first\`, \`key=len, reverse=True\`. Because the sort is stable, equal lengths keep their order.
--- hint
\`min(people, key=...)\` returns the whole dict. Take its \`["name"]\`.
--- check case | Oldest first, then alphabetical
[p["name"] for p in by_age_then_name([{"name": "Lin", "age": 30}, {"name": "Ada", "age": 36}, {"name": "Cy", "age": 30}])]
=> ["Ada", "Cy", "Lin"]
--- check test | by_age_then_name does not change the list you pass in
(lambda ps: (by_age_then_name(ps), [p["name"] for p in ps])[1] == ["B", "A"])([{"name": "B", "age": 1}, {"name": "A", "age": 2}])
?? Use sorted(...), which returns a new list, rather than .sort().
--- check case | longest_first keeps ties in their original order
longest_first(["bb", "a", "ccc", "dd", "e"])
=> ["ccc", "bb", "dd", "a", "e"]
--- check case | youngest returns a name
youngest([{"name": "Ada", "age": 36}, {"name": "Tim", "age": 9}, {"name": "Lin", "age": 30}])
=> "Tim"

=== py2-06 | *args, **kwargs and default arguments
--- teach
Python functions can take a flexible number of arguments.

**\`*args\`** collects any extra *positional* arguments into a tuple. **\`**kwargs\`** collects extra *keyword* arguments into a dict. The names \`args\` and \`kwargs\` are only a convention; the stars do the work.

\`\`\`python
def show(*args, **kwargs):
    return args, kwargs

show(1, 2, colour="red")   # ((1, 2), {'colour': 'red'})
\`\`\`

The stars also work the other way round, when *calling*: they spread a list or dict out into separate arguments.

\`\`\`python
nums = [3, 7, 1]
max(*nums)                 # same as max(3, 7, 1)
opts = {"sep": "-"}
print("a", "b", **opts)    # a-b
\`\`\`

**Defaults and keyword-only arguments.** A parameter with \`=\` has a default. Anything after a bare \`*\` (or after \`*args\`) can only be passed by name, which stops callers mixing up arguments that look alike:

\`\`\`python
def connect(host, *, port=443, timeout=5.0):
    return f"{host}:{port} (timeout {timeout}s)"

connect("example.org", port=8080)   # 'example.org:8080 (timeout 5.0s)'
# connect("example.org", 8080)  ->  TypeError: takes 1 positional argument
\`\`\`

The full order of a signature is: normal parameters, \`*args\`, keyword-only ones, \`**kwargs\`.

**Common mistake:** a default is worked out *once*, when \`def\` runs, not on every call. For numbers and strings that never matters. For lists and dicts it matters a lot, and that is the next lesson.
--- task
Write:

- \`total(*nums)\` returning the sum of any number of numbers (\`total()\` is \`0\`).
- \`tag(name, *children, **attrs)\` returning an HTML string. The attributes come first, in the order given, as \`key="value"\`, and the children are joined with nothing in between. \`tag("a", "home", href="/")\` is \`'<a href="/">home</a>'\`; \`tag("p")\` is \`"<p></p>"\`; \`tag("b", "x", "y")\` is \`"<b>xy</b>"\`.
--- starter
def total(nums):
    return sum(nums)


def tag(name, children, attrs):
    return ""
--- solution
def total(*nums):
    return sum(nums)


def tag(name, *children, **attrs):
    attr_text = "".join(f' {key}="{value}"' for key, value in attrs.items())
    return f"<{name}{attr_text}>{''.join(children)}</{name}>"
--- hint
Inside the function, \`nums\` (from \`*nums\`) is a tuple, so \`sum(nums)\` works on it directly.
--- hint
Build the attributes as one string: each one is \`' key="value"'\` (note the leading space), joined together from \`attrs.items()\`.
--- hint
The shape is \`f"<{name}{attr_text}>{''.join(children)}</{name}>"\`.
--- check case | total adds any number of numbers
total(1, 2, 3, 4)
=> 10
--- check case | total() is 0
total()
=> 0
--- check case | tag with an attribute and a child
tag("a", "home", href="/")
=> '<a href="/">home</a>'
--- check case | tag with nothing inside
tag("p")
=> "<p></p>"
--- check case | Several children are joined
tag("b", "x", "y")
=> "<b>xy</b>"
--- check case | Attributes keep the order they were given in
tag("img", src="a.png", alt="A")
=> '<img src="a.png" alt="A"></img>'

=== py2-07 | Debugging: the mutable default argument
--- teach
This lesson is a bug hunt. Before the bug, the **method**, because the method is what you keep:

1. **Reproduce it.** Find the smallest set of calls that shows the problem, every time.
2. **State what you expected and what you got.** Precisely: "the second call returned \`['tea', 'milk']\`, I expected \`['milk']\`".
3. **Check your assumptions.** The bug lives in something you believe that is not true. List what you are assuming and test each one.
4. **Inspect.** Print values, or print \`id(x)\`, which is the identity of an object. Two names with the same \`id\` are the *same* object.
5. **Fix the cause, not the symptom.** A patch that clears the list after each call hides the problem; understanding *why* the list is shared removes it.

Here is the bug, reproduced:

\`\`\`python
def add_item(item, cart=[]):
    cart.append(item)
    return cart

add_item("tea")      # ['tea']
add_item("milk")     # ['tea', 'milk']   <- a new customer got the old cart
\`\`\`

The assumption that fails: "\`cart=[]\` gives me a new empty list on each call". It does not. The default is created **once, when the \`def\` line runs**, and stored on the function. Every call that leaves \`cart\` out gets *that same list*, and \`append\` changes it in place. You can see it:

\`\`\`python
add_item.__defaults__    # (['tea', 'milk'],)
\`\`\`

**The fix** is to use a value that cannot be changed as the default, usually \`None\`, and make the new list *inside* the function, which runs on every call:

\`\`\`python
def add_item(item, cart=None):
    if cart is None:
        cart = []
    cart.append(item)
    return cart
\`\`\`

Use \`is None\`, not \`if not cart\`: an empty list passed in on purpose is falsy too, and you must still add to *that* list.

The same trap catches \`{}\`, \`set()\`, and any object you create in a default. It is so common that linters flag it on sight.
--- task
**Bug report:** in the ordering system, the second customer's basket already contains the first customer's items, and the word tally for one document includes words from a previous document.

Reproduce both bugs, then fix the cause in \`add_to_basket\` and \`tally\`. Both must still add to a basket or dict that the caller passes in, and return it.
--- starter
def add_to_basket(item, basket=[]):
    basket.append(item)
    return basket


def tally(words, counts={}):
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return counts
--- solution
def add_to_basket(item, basket=None):
    if basket is None:
        basket = []
    basket.append(item)
    return basket


def tally(words, counts=None):
    if counts is None:
        counts = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return counts
--- hint
Print \`add_to_basket.__defaults__\` after a couple of calls. What do you see?
--- hint
Make the default \`None\`, and create the empty list or dict inside the function.
--- hint
\`if basket is None: basket = []\`. Use \`is None\` so an empty basket the caller passes in is still used.
--- check test | Two new baskets do not share items
add_to_basket("tea") == ["tea"] and add_to_basket("milk") == ["milk"]
?? Each call without a basket must start from an empty list made during that call.
--- check test | A basket you pass in is added to and returned
(lambda b: add_to_basket("jam", b) is b and b == ["bread", "jam"])(["bread"])
--- check test | An empty basket you pass in is still the one used
(lambda b: add_to_basket("egg", b) is b)([])
?? Check \`is None\`, not \`if not basket\`: an empty list is falsy too.
--- check test | Two new tallies are independent
tally(["a", "b", "a"]) == {"a": 2, "b": 1} and tally(["c"]) == {"c": 1}
--- check test | A dict you pass in keeps counting
(lambda d: tally(["x", "x"], d) is d and d == {"x": 3})({"x": 1})

=== py2-08 | Exceptions you design
--- teach
In the basics you caught \`ValueError\`. Real code needs a little more: the full shape of \`try\`, and exceptions of your own.

\`\`\`python
try:
    value = int(text)          # the code that might fail
except ValueError as err:      # runs only if that error happened
    print("not a number:", err)
else:                          # runs only if NO error happened
    print("got", value)
finally:                       # always runs, error or not
    print("done")
\`\`\`

Why have \`else\` at all? It keeps the \`try\` block small. Only the line that can fail belongs in \`try\`; code that runs on success goes in \`else\`, so an unexpected error there is not swallowed by the \`except\`. \`finally\` is for clean-up that must happen whatever occurs: closing a file, releasing a lock.

**Your own exception classes.** A custom exception is a class that inherits from \`Exception\` (or from one of your own). It lets callers catch *your* kind of failure specifically, and it can carry data:

\`\`\`python
class ShippingError(Exception):
    """Base class for everything that can go wrong with shipping."""

class TooHeavy(ShippingError):
    def __init__(self, weight, limit):
        super().__init__(f"{weight} kg is over the {limit} kg limit")
        self.weight = weight
        self.limit = limit

try:
    raise TooHeavy(32, 30)
except ShippingError as err:     # catches TooHeavy too: it IS a ShippingError
    print(err, err.weight)       # 32 kg is over the 30 kg limit 32
\`\`\`

\`class TooHeavy(ShippingError):\` makes \`TooHeavy\` a **subclass** that **inherits** from \`ShippingError\`: it *is* a \`ShippingError\`, with everything that class has, plus what it adds. \`super()\` means "the parent class", so \`super().__init__(message)\` runs the parent's \`__init__\`, which sets the text you see when the exception is printed. The triple-quoted string on the first line of \`ShippingError\` is a **docstring**, the class's documentation; a class needs at least one line in its body, and a docstring is enough.

\`except\` clauses are tried top to bottom, and the first match wins, so put the most specific classes first.

**Common mistakes.**

- \`except Exception:\` around a large block hides bugs you did not expect. Catch what you can handle, where you can handle it.
- \`raise TooHeavy\` with no arguments fails here, because \`__init__\` needs them. Raise an instance: \`raise TooHeavy(32, 30)\`.
--- task
Build a small withdrawal system:

- \`class LedgerError(Exception)\`, the base class.
- \`class InsufficientFunds(LedgerError)\`, created as \`InsufficientFunds(shortfall)\`. It stores \`self.shortfall\`, and its message is \`"short by <shortfall>"\`.
- \`withdraw(balance, amount)\` returns the new balance. It raises \`ValueError\` if \`amount\` is not positive, and \`InsufficientFunds\` if \`amount\` is more than \`balance\`.
- \`attempt(balance, amount)\` calls \`withdraw\` and returns a string: \`"ok: <new balance>"\` on success, \`"refused: short by <shortfall>"\` for \`InsufficientFunds\`, and \`"invalid"\` for a \`ValueError\`. Use \`try\` / \`except\` / \`else\`.
--- starter
class LedgerError(Exception):
    pass


def withdraw(balance, amount):
    return balance - amount


def attempt(balance, amount):
    return "ok: " + str(withdraw(balance, amount))
--- solution
class LedgerError(Exception):
    pass


class InsufficientFunds(LedgerError):
    def __init__(self, shortfall):
        super().__init__(f"short by {shortfall}")
        self.shortfall = shortfall


def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("amount must be positive")
    if amount > balance:
        raise InsufficientFunds(amount - balance)
    return balance - amount


def attempt(balance, amount):
    try:
        new_balance = withdraw(balance, amount)
    except InsufficientFunds as err:
        return f"refused: {err}"
    except ValueError:
        return "invalid"
    else:
        return f"ok: {new_balance}"
--- hint
\`InsufficientFunds.__init__(self, shortfall)\` should call \`super().__init__(f"short by {shortfall}")\` and set \`self.shortfall\`.
--- hint
In \`withdraw\`, check the bad cases first and \`raise\` an instance, like \`raise InsufficientFunds(amount - balance)\`.
--- hint
In \`attempt\`, only the \`withdraw(...)\` call goes inside \`try\`. \`str(err)\` is the message you gave \`super().__init__\`.
--- check case | A valid withdrawal returns the new balance
withdraw(100, 30)
=> 70
--- check case | Withdrawing everything is allowed
withdraw(50, 50)
=> 0
--- check test | Overdrawing raises InsufficientFunds (a LedgerError)
raises(InsufficientFunds, lambda: withdraw(20, 50)) and raises(LedgerError, lambda: withdraw(0, 1))
--- check test | InsufficientFunds is a LedgerError and carries the shortfall
issubclass(InsufficientFunds, LedgerError) and InsufficientFunds(30).shortfall == 30 and str(InsufficientFunds(30)) == "short by 30"
--- check test | Zero or negative amounts raise ValueError
raises(ValueError, lambda: withdraw(10, 0)) and raises(ValueError, lambda: withdraw(10, -5))
--- check case | attempt reports success
attempt(100, 40)
=> "ok: 60"
--- check case | attempt reports a refusal with the shortfall
attempt(20, 50)
=> "refused: short by 30"
--- check case | attempt reports an invalid amount
attempt(20, -1)
=> "invalid"

=== py2-09 | Debugging: reading a traceback
--- teach
When a Python program crashes, it prints a **traceback**. People new to Python see a wall of red and panic; experienced people read it in ten seconds, because it is a precise report of what happened.

\`\`\`
Traceback (most recent call last):
  File "main.py", line 17, in <module>
    print(order_total(ORDERS))
  File "main.py", line 14, in order_total
    return sum(line_total(parse_line(line)) for line in lines)
  File "main.py", line 14, in <genexpr>
    return sum(line_total(parse_line(line)) for line in lines)
  File "main.py", line 10, in line_total
    return item["qty"] * item["price"]
TypeError: can't multiply sequence by non-int of type 'float'
\`\`\`

**Read it from the bottom up.**

1. **The last line is the error**: its type (\`TypeError\`) and message. The message says that something is a *sequence* (a string, here) being multiplied by a float.
2. **The frame just above it is where it happened**: \`line_total\`, line 10.
3. **The frames above that are how you got there**: each call, from the outermost (\`<module>\`, the top level of your file) inwards. "Most recent call last" means the bottom is the latest. (\`<genexpr>\` is the generator expression inside \`sum(...)\`, which runs as a frame of its own.)

Now the important part: **where it crashed is not always where the bug is.** Line 10 is correct code: multiplying a quantity by a price. It crashed because \`item["qty"]\` is the string \`"3"\`, not the number \`3\`. The real question is: *who made that value?* Walk *up* the data flow. \`parse_line\` built the dict, and it forgot to convert the quantity.

A quick way to confirm your theory before changing anything:

\`\`\`python
item = parse_line("tea,3,2.50")
print(repr(item["qty"]), type(item["qty"]))    # '3' <class 'str'>
\`\`\`

\`repr\` shows the quotes, which a plain \`print\` hides.

**Fix the cause, not the symptom.** Writing \`int(item["qty"])\` inside \`line_total\` would stop *this* crash, but every other user of \`parse_line\` would still get strings. Fix the function that produces bad data, so everything after it can trust it.
--- task
**Bug report:** running the order program crashes with the traceback above. It should print the order total, \`17.5\`.

Find the cause and fix it at the source. After your fix, \`parse_line\` must return the name with spaces trimmed, the quantity as an \`int\`, and the price as a \`float\`, even when there are spaces around the commas.
--- starter
ORDERS = ["tea, 3, 2.50", "biscuits, 2, 1.25", "jam, 1, 7.50"]


def parse_line(line):
    name, qty, price = line.split(",")
    return {"name": name, "qty": qty, "price": float(price)}


def line_total(item):
    return item["qty"] * item["price"]


def order_total(lines):
    return sum(line_total(parse_line(line)) for line in lines)


print(order_total(ORDERS))
--- solution
ORDERS = ["tea, 3, 2.50", "biscuits, 2, 1.25", "jam, 1, 7.50"]


def parse_line(line):
    name, qty, price = line.split(",")
    return {"name": name.strip(), "qty": int(qty), "price": float(price)}


def line_total(item):
    return item["qty"] * item["price"]


def order_total(lines):
    return sum(line_total(parse_line(line)) for line in lines)


print(order_total(ORDERS))
--- hint
The traceback ends in \`line_total\`, but that line is fine. What type is \`item["qty"]\`? Print \`repr(parse_line("tea, 3, 2.50"))\`.
--- hint
The quantity is still a string. Which function created that dict?
--- hint
Convert in \`parse_line\`: \`int(qty)\` (it copes with the surrounding spaces) and \`name.strip()\`.
--- check output | The program prints the total
17.5
--- check case | parse_line converts and trims every field
parse_line(" tea , 3 , 2.50")
=> {"name": "tea", "qty": 3, "price": 2.5}
--- check test | The quantity is a real int
type(parse_line("jam,1,7.5")["qty"]) is int
--- check case | order_total of no lines is 0
order_total([])
=> 0
--- check source absent | The fix is not a patch inside line_total
int\\(\\s*item\\[

=== py2-10 | Classes that behave: __repr__, __eq__ and @property
--- teach
A class that only has \`__init__\` works, but it is awkward: printing it shows \`<__main__.Money object at 0x7f...>\`, and two objects with the same data are not equal. A few special methods fix that.

**\`__repr__\`** returns the text Python shows for the object in the console, in lists, and in error messages. A good one looks like the code that would build it:

\`\`\`python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return (self.x, self.y) == (other.x, other.y)

[Point(1, 2)]             # [Point(1, 2)]
Point(1, 2) == Point(1, 2)   # True  (without __eq__ this is False)
\`\`\`

**\`__eq__\`** decides what \`==\` means. Without it, \`==\` asks "is this the very same object?". \`isinstance(other, Point)\` is true when \`other\` is a \`Point\` (or a subclass of one). Returning \`NotImplemented\` for other types lets Python try the other side and then say \`False\`, instead of crashing.

**\`@property\`** makes a method look like an attribute. It is how you *compute* a value on the fly, or *validate* a value when it is set, while callers still write plain \`obj.attr\`:

\`\`\`python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return self.width * self.height

r = Rectangle(3, 4)
r.area          # 12   (no brackets: it reads like data)
r.width = 10
r.area          # 40   (always up to date)
\`\`\`

A property can have a **setter**. The usual pattern stores the real value in an attribute with a leading underscore, and the setter checks it first:

\`\`\`python
class Account:
    def __init__(self, balance):
        self.balance = balance          # goes through the setter below

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("balance cannot be negative")
        self._balance = value
\`\`\`

**Common mistake:** inside the getter, writing \`return self.balance\` calls the property again, forever, until Python gives up with \`RecursionError\`. The getter and setter use \`self._balance\`.
--- task
Write a class \`Temperature\`:

- \`Temperature(celsius)\` stores the temperature.
- a \`celsius\` property with a setter that raises \`ValueError\` for anything below \`-273.15\` (this applies in \`__init__\` too).
- a \`fahrenheit\` property (\`celsius * 9 / 5 + 32\`) with a setter that converts back and stores Celsius.
- \`__repr__\` giving \`Temperature(21.5)\`.
- \`__eq__\` so two temperatures with the same Celsius value are equal.
--- starter
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius
--- solution
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("below absolute zero")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9 / 5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5 / 9

    def __repr__(self):
        return f"Temperature({self._celsius})"

    def __eq__(self, other):
        if not isinstance(other, Temperature):
            return NotImplemented
        return self._celsius == other._celsius
--- hint
Store the number in \`self._celsius\`. The \`celsius\` property returns it; its setter checks, then assigns it.
--- hint
Keep \`self.celsius = celsius\` in \`__init__\`: it goes through the setter, so construction is validated too.
--- hint
The \`fahrenheit\` setter can just do \`self.celsius = (value - 32) * 5 / 9\` and let the Celsius setter do the checking.
--- check case | fahrenheit is computed
Temperature(100).fahrenheit
=> 212.0
--- check test | Setting fahrenheit updates celsius
(lambda t: (setattr(t, "fahrenheit", 32), t.celsius)[1] == 0)(Temperature(50))
--- check test | Too cold is rejected when created
raises(ValueError, lambda: Temperature(-300))
--- check test | Too cold is rejected when set later
(lambda t: raises(ValueError, lambda: setattr(t, "celsius", -274)) and t.celsius == 5)(Temperature(5))
--- check test | Absolute zero itself is allowed
Temperature(-273.15).celsius == -273.15
--- check case | repr looks like the code that builds it
repr(Temperature(21.5))
=> "Temperature(21.5)"
--- check test | Equal temperatures are ==, different ones are not
Temperature(20) == Temperature(20) and Temperature(20) != Temperature(21) and Temperature(1) != "1"

=== py2-11 | The standard library: math, itertools and collections
--- teach
Python ships with a large standard library. Knowing what is in it saves you from writing (and debugging) things that already exist. Three modules pay off immediately.

**\`math\`**: beyond \`+ - * /\`.

\`\`\`python
import math
math.ceil(7 / 2), math.floor(7 / 2)    # (4, 3)
math.sqrt(16), math.hypot(3, 4)        # (4.0, 5.0)
math.gcd(12, 18), math.prod([2, 3, 4]) # (6, 24)
math.inf > 10**100                     # True
\`\`\`

**\`itertools\`**: tools for looping.

\`\`\`python
from itertools import accumulate, chain, combinations, groupby, islice, count

list(accumulate([1, 2, 3, 4]))              # [1, 3, 6, 10]   running totals
list(chain([1, 2], [3], [4, 5]))            # [1, 2, 3, 4, 5]
list(chain.from_iterable([[1, 2], [3]]))    # [1, 2, 3]       flatten one level
list(combinations("abc", 2))                # [('a', 'b'), ('a', 'c'), ('b', 'c')]
list(islice(count(10), 3))                  # [10, 11, 12]    first 3 of an endless count
[(k, len(list(g))) for k, g in groupby("aaabcc")]   # [('a', 3), ('b', 1), ('c', 2)]
\`\`\`

\`groupby\` only groups items that are *next to each other*: sort first if you want every equal item together.

**\`collections\`**: besides \`Counter\` and \`defaultdict\`, \`namedtuple\` makes a tiny class whose fields have names, and \`deque\` is a list with fast adding and removing at both ends.

\`\`\`python
from collections import namedtuple, deque
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
p.x, p[1]            # (3, 4)   by name or by position
p                    # Point(x=3, y=4)

q = deque([1, 2, 3])
q.appendleft(0); q.pop()
q                    # deque([0, 1, 2])
\`\`\`

**Common mistake:** writing your own running total, flatten or pairs loop with index arithmetic. It is not wrong, but it is longer, slower to read, and the off-by-one errors are yours to find.
--- task
Using the standard library:

- \`running_totals(nums)\` returns the list of running totals (use \`itertools.accumulate\`).
- \`flatten(lists)\` returns one list from a list of lists (use \`itertools.chain\`).
- \`pages_needed(items, per_page)\` returns how many pages you need to show \`items\` things, \`per_page\` at a time (use \`math.ceil\`). Zero items need zero pages.
- \`Point\`, a \`namedtuple\` with fields \`x\` and \`y\`.
- \`run_lengths(text)\` returns a list of \`(character, count)\` for each run of repeated characters (use \`itertools.groupby\`).
--- starter
import math
from collections import namedtuple
from itertools import accumulate, chain, groupby


def running_totals(nums):
    return nums


def flatten(lists):
    return lists


def pages_needed(items, per_page):
    return items // per_page


def run_lengths(text):
    return []
--- solution
import math
from collections import namedtuple
from itertools import accumulate, chain, groupby

Point = namedtuple("Point", ["x", "y"])


def running_totals(nums):
    return list(accumulate(nums))


def flatten(lists):
    return list(chain.from_iterable(lists))


def pages_needed(items, per_page):
    return math.ceil(items / per_page)


def run_lengths(text):
    return [(ch, len(list(group))) for ch, group in groupby(text)]
--- hint
\`accumulate\` and \`chain.from_iterable\` give you iterators; wrap them in \`list(...)\`.
--- hint
\`math.ceil(items / per_page)\` rounds up, so 11 items at 5 per page is 3 pages.
--- hint
\`groupby(text)\` yields \`(char, group)\` pairs; \`len(list(group))\` counts the run.
--- check case | running_totals
running_totals([5, -2, 10, 1])
=> [5, 3, 13, 14]
--- check case | running_totals of nothing
running_totals([])
=> []
--- check case | flatten joins the lists
flatten([[1, 2], [], [3], [4, 5]])
=> [1, 2, 3, 4, 5]
--- check test | pages_needed rounds up
pages_needed(11, 5) == 3 and pages_needed(10, 5) == 2 and pages_needed(1, 50) == 1 and pages_needed(0, 5) == 0
--- check test | Point has named fields
(lambda p: p.x == 3 and p.y == 4 and p == (3, 4) and repr(p) == "Point(x=3, y=4)")(Point(3, 4))
--- check case | run_lengths counts each run
run_lengths("aaabccdddd")
=> [("a", 3), ("b", 1), ("c", 2), ("d", 4)]
--- check case | A letter can come back in a later run
run_lengths("aabaa")
=> [("a", 2), ("b", 1), ("a", 2)]

=== py2-12 | Processing text in memory
--- teach
A lot of programming is turning text into data: logs, CSV exports, config files. You do not need a file on disk to practise it; a multi-line string behaves the same way.

**Lines.** \`text.splitlines()\` splits on line breaks and, unlike \`split("\\n")\`, does not leave an empty string at the end when the text ends with a newline:

\`\`\`python
text = "a\\nb\\n"
text.split("\\n")      # ['a', 'b', '']
text.splitlines()     # ['a', 'b']
\`\`\`

A robust parsing loop strips each line and skips blank lines and comments *first*, before doing anything else, so the rest of the loop only sees real data:

\`\`\`python
for line in text.splitlines():
    line = line.strip()
    if not line or line.startswith("#"):
        continue
    ...
\`\`\`

**\`io.StringIO\`** is a string that pretends to be an open file. Anything that reads or writes files (the \`csv\` module, \`print(..., file=...)\`, a function that expects a file) works on it:

\`\`\`python
import io, csv

f = io.StringIO("name,score\\nada,91\\nlin,78\\n")
rows = list(csv.DictReader(f))
rows[0]            # {'name': 'ada', 'score': '91'}   (every value is a string)

out = io.StringIO()
writer = csv.writer(out, lineterminator="\\n")
writer.writerow(["name", "note"])
writer.writerow(["ada", "likes, commas"])
out.getvalue()     # 'name,note\\nada,"likes, commas"\\n'
\`\`\`

Notice that \`csv\` quoted the field that contains a comma. That is why you use \`csv\` instead of \`",".join(...)\`: joining by hand breaks the moment your data contains the separator.

**Common mistakes.** The \`csv\` writer ends lines with \`\\r\\n\` unless you pass \`lineterminator="\\n"\`. \`csv\` gives you strings: convert numbers yourself. And after writing to a \`StringIO\`, read it back with \`getvalue()\`, not \`read()\` (the read position is at the end).
--- task
Write:

- \`level_counts(text)\` takes log text where each line looks like \`2026-09-25 12:00:01 ERROR disk full\`. It returns a plain dict from level (the third word) to how many lines have it. Skip blank lines and lines starting with \`#\`, even when they have leading spaces.
- \`to_csv(rows)\` takes a list of lists and returns CSV text with \`\\n\` line endings, using \`csv.writer\` and \`io.StringIO\`, so fields containing commas or quotes are quoted correctly.
--- starter
import csv
import io


def level_counts(text):
    counts = {}
    for line in text.split("\\n"):
        level = line.split()[2]
        counts[level] = counts.get(level, 0) + 1
    return counts


def to_csv(rows):
    return "\\n".join(",".join(str(v) for v in row) for row in rows)
--- solution
import csv
import io


def level_counts(text):
    counts = {}
    for line in text.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        level = line.split()[2]
        counts[level] = counts.get(level, 0) + 1
    return counts


def to_csv(rows):
    out = io.StringIO()
    writer = csv.writer(out, lineterminator="\\n")
    writer.writerows(rows)
    return out.getvalue()
--- hint
Strip each line first, then \`continue\` past blank lines and comments before you split.
--- hint
For \`to_csv\`: \`out = io.StringIO()\`, \`csv.writer(out, lineterminator="\\n")\`, \`writer.writerows(rows)\`.
--- hint
Return \`out.getvalue()\`.
--- check case | level_counts counts each level
level_counts("2026-09-25 10:00:00 INFO start\\n2026-09-25 10:00:01 ERROR disk full\\n2026-09-25 10:00:02 INFO ok\\n")
=> {"INFO": 2, "ERROR": 1}
--- check case | Blank lines and comments are skipped
level_counts("# nightly run\\n\\n   \\n  # indented comment\\n2026-09-25 10:00:00 WARN low memory\\n")
=> {"WARN": 1}
--- check case | Empty text gives an empty dict
level_counts("")
=> {}
--- check case | to_csv writes simple rows
to_csv([["name", "score"], ["ada", 91]])
=> "name,score\\nada,91\\n"
--- check case | Fields with commas and quotes are quoted
to_csv([["ada", "likes, commas"], ["lin", 'said "hi"']])
=> 'ada,"likes, commas"\\nlin,"said ""hi"""\\n'

=== py2-13 | Problem solving: two sum
--- teach
This lesson is about *how to solve a problem you have not seen before*. Here is a method that works on almost anything.

1. **Restate the problem** in your own words, including what to return when there is no answer.
2. **Work small examples by hand**, including awkward ones: empty input, duplicates, negatives.
3. **Write the brute force first** in your head or on paper. It is usually obvious and usually slow, but it proves you understand the problem.
4. **Find what the brute force repeats**, and remember it instead of recomputing it.
5. **Check the edge cases again** against the faster version.

**The problem.** Given a list \`nums\` and a \`target\`, find two *different* positions \`i < j\` with \`nums[i] + nums[j] == target\`.

**Brute force:** try every pair.

\`\`\`python
def two_sum_slow(nums, target):
    for j in range(len(nums)):
        for i in range(j):
            if nums[i] + nums[j] == target:
                return (i, j)
    return None
\`\`\`

For a list of \`n\` numbers that is about \`n * n / 2\` pairs. With 100,000 numbers that is five *billion* additions: far too slow.

**What does it repeat?** For each \`j\`, the inner loop searches everything before \`j\` for one specific value: \`target - nums[j]\`, the **complement**. Searching a list is slow; looking something up in a dict is (on average) instant. So as you walk the list once, keep a dict from *value* to *the position where you first saw it*. At each \`j\`, ask the dict whether the complement has been seen.

\`\`\`python
seen = {}
# at position j with value x:
#   if target - x in seen: found it: (seen[target - x], j)
#   otherwise remember x
\`\`\`

That is one pass: about \`n\` steps instead of \`n * n / 2\`. This "trade memory for time with a dict" move is one of the most useful ideas in programming.

**Watch the details.** Check for the complement *before* you store the current number, or \`[3]\` with target \`6\` would pair 3 with itself. And think about which index you keep when a value appears twice.
--- task
Write \`two_sum(nums, target)\` returning a tuple \`(i, j)\` with \`i < j\` and \`nums[i] + nums[j] == target\`, or \`None\` if there is no such pair.

If there are several answers, return the one with the **smallest \`j\`**, and for that \`j\` the **smallest \`i\`**. It must handle 100,000 numbers quickly.
--- starter
def two_sum(nums, target):
    return None
--- solution
def two_sum(nums, target):
    seen = {}
    for j, x in enumerate(nums):
        need = target - x
        if need in seen:
            return (seen[need], j)
        if x not in seen:
            seen[x] = j
    return None
--- hint
Walk the list once with \`enumerate\`. For each number \`x\`, the partner you need is \`target - x\`.
--- hint
Keep a dict from value to index. Look the partner up *before* storing \`x\`, so a number never pairs with itself.
--- hint
To return the smallest \`i\`, store a value's index only the first time you see it: \`if x not in seen: seen[x] = j\`.
--- check case | The classic example
two_sum([2, 7, 11, 15], 9)
=> (0, 1)
--- check case | A number cannot pair with itself, but a duplicate can
two_sum([3, 2, 4, 3], 6)
=> (1, 2)
--- check case | Two equal numbers
two_sum([3, 3], 6)
=> (0, 1)
--- check case | Negative numbers
two_sum([-3, 4, 3, 90], 0)
=> (0, 2)
--- check case | Smallest j first, then smallest i
two_sum([1, 4, 1, 3], 4)
=> (0, 3)
?? When a value appears twice, keep the index of the first time you saw it.
--- check case | No pair gives None
two_sum([1, 2, 3], 7)
=> None
--- check case | Empty list gives None
two_sum([], 5)
=> None
--- check case | 100,000 numbers, answer at the very end
two_sum(list(range(1, 100001)), 199999)
=> (99998, 99999)
?? Checking every pair is billions of steps here. Use a dict so each number is handled once.

=== py2-14 | Design: untangling a long function
--- teach
Code that works is not finished. Code gets *read* far more often than it gets written, and a 40-line function that parses, computes, decides and formats all at once is hard to read, hard to test and hard to change.

**The refactoring method:**

1. **Pin the behaviour down first.** Before you move anything, have checks (or a few saved outputs) that prove the program still does exactly what it did. Refactoring means changing the *shape*, never the *behaviour*.
2. **Find the separate jobs.** Read the function and name each thing it does in a few words: "parse a line", "average the scores", "choose a letter", "format a row". Each phrase is a function waiting to be extracted.
3. **Extract one at a time**, running the checks after each move.
4. **Name things for what they mean**, not how they work: \`letter(avg)\` rather than \`check_thresholds(x)\`.
5. **What remains is the story.** The top-level function should read like a summary of the steps.

Before:

\`\`\`python
def total(text):
    t = 0
    for l in text.split(","):
        l = l.strip()
        if l:
            t += int(l)
    return t
\`\`\`

After:

\`\`\`python
def parse_numbers(text):
    return [int(part) for part in text.split(",") if part.strip()]

def total(text):
    return sum(parse_numbers(text))
\`\`\`

Now \`parse_numbers\` can be tested alone, reused elsewhere, and fixed in one place.

Each small function should do **one job** and *return* its result rather than print it or change something far away. Functions like that are easy to test, and they fit together.

**Common mistake:** "improving" behaviour during a refactor. If you notice a bug, write it down and fix it separately, so a changed output never leaves you wondering whether it was the refactor or the fix.
--- task
\`report(text)\` works, but it does everything in one place. Refactor it, **keeping its output exactly the same**, into:

- \`parse_line(line)\` returns \`(name, scores)\` for a data line, with the name stripped and title-cased and the scores as a list of ints, or \`None\` for a blank line or a \`#\` comment.
- \`average(scores)\` returns the mean as a float, or \`0.0\` for an empty list.
- \`letter(avg)\` returns \`"A"\` (90 and up), \`"B"\` (80 and up), \`"C"\` (70 and up) or \`"F"\`.
- \`format_row(name, avg)\` returns one row of the report.
- \`report(text)\` builds the report by calling those four.
--- starter
def report(text):
    out = []
    best_name = None
    best_avg = -1
    for raw in text.splitlines():
        raw = raw.strip()
        if raw == "" or raw.startswith("#"):
            continue
        name, _, rest = raw.partition(":")
        name = name.strip().title()
        nums = []
        for part in rest.split(","):
            part = part.strip()
            if part:
                nums.append(int(part))
        if len(nums) == 0:
            avg = 0.0
        else:
            avg = sum(nums) / len(nums)
        if avg >= 90:
            grade = "A"
        elif avg >= 80:
            grade = "B"
        elif avg >= 70:
            grade = "C"
        else:
            grade = "F"
        out.append(f"{name:<10}{avg:6.1f}  {grade}")
        if avg > best_avg:
            best_avg = avg
            best_name = name
    if best_name is not None:
        out.append(f"Top: {best_name}")
    return "\\n".join(out)
--- solution
def parse_line(line):
    line = line.strip()
    if not line or line.startswith("#"):
        return None
    name, _, rest = line.partition(":")
    scores = [int(part) for part in rest.split(",") if part.strip()]
    return name.strip().title(), scores


def average(scores):
    return sum(scores) / len(scores) if scores else 0.0


def letter(avg):
    if avg >= 90:
        return "A"
    if avg >= 80:
        return "B"
    if avg >= 70:
        return "C"
    return "F"


def format_row(name, avg):
    return f"{name:<10}{avg:6.1f}  {letter(avg)}"


def report(text):
    rows = []
    best = None
    for line in text.splitlines():
        parsed = parse_line(line)
        if parsed is None:
            continue
        name, scores = parsed
        avg = average(scores)
        rows.append(format_row(name, avg))
        if best is None or avg > best[1]:
            best = (name, avg)
    if best is not None:
        rows.append(f"Top: {best[0]}")
    return "\\n".join(rows)
--- hint
Start with the easiest extraction: \`letter(avg)\` is the \`if\`/\`elif\` chain, returning instead of assigning.
--- hint
\`parse_line\` is the strip, the "skip" test (return \`None\`), the \`partition(":")\` and the list of ints. A comprehension can build the scores.
--- hint
When all four exist, \`report\` becomes: for each line, \`parse_line\`; skip \`None\`; \`average\`; \`format_row\`; track the best. Compare its output with the original on the sample text.
--- check case | parse_line reads a data line
parse_line("  ada lovelace: 90, 85,100 ")
=> ("Ada Lovelace", [90, 85, 100])
--- check test | parse_line skips blanks and comments
parse_line("") is None and parse_line("   ") is None and parse_line("# header") is None
--- check case | parse_line with no scores
parse_line("sam:")
=> ("Sam", [])
--- check test | average, including the empty case
average([80, 90]) == 85.0 and average([]) == 0.0
--- check test | letter uses the right boundaries
[letter(x) for x in (95, 90, 89.9, 80, 75, 70, 69.9, 0)] == ["A", "A", "B", "B", "C", "C", "F", "F"]
--- check case | format_row lays out one row
format_row("Ada", 91.66)
=> "Ada         91.7  A"
--- check case | report is unchanged
report("# class 3B\\nada: 90, 95\\n\\n lin : 70,80,75\\nsam: 50\\ngrace: 99,98")
=> "Ada         92.5  A\\nLin         75.0  C\\nSam         50.0  F\\nGrace       98.5  A\\nTop: Grace"
--- check case | A tie for top keeps the first
report("a: 80\\nb: 80")
=> "A           80.0  B\\nB           80.0  B\\nTop: A"
--- check case | Nothing to report
report("# only a comment\\n")
=> ""
--- check test | report is built from the four helpers
{"parse_line", "average", "format_row"} <= set(report.__code__.co_names)
?? report should call parse_line, average and format_row (and format_row calls letter).
`,ke=`@track python
@level projects
@title Python · Projects
@name Python projects: real programs, built step by step, then designed by you
@blurb Build three real programs one step at a time (an expense tracker, a Markdown converter and a library system with saving and loading), then prove you can work alone on four capstones where you get only a specification and design everything yourself.

=== pyp-01 | Expense tracker 1: planning and parsing commands
--- teach
Welcome to the projects course. Everything here uses what the three courses before it taught: the idioms of the intermediate course, the classes and algorithms of the advanced one, and the design habits of the expert one (a pure core, a thin shell, injected dependencies, tests that catch bugs). Each of the first three projects is a real program built over four lessons, and **each lesson starts from where the last one finished**. Then come the capstones, where you get only a specification.

The first project is an **expense tracker** you drive with typed commands:

\`\`\`
add 12.50 food lunch with Sam
add 3.20 transport bus
total food
report
\`\`\`

**Plan before you type.** A program this size has four jobs, and each gets its own lesson and its own layer of code:

1. **Parse**: turn a line of text into a structured command, or reject it with a clear reason.
2. **Model**: store expenses and answer questions about them.
3. **Report**: turn the stored data into readable output.
4. **Run**: the loop that reads input, calls the layers above, and prints results.

Keeping these apart means each can be tested on its own, and a change to the report format never breaks parsing.

**Decide how to represent the data.** Money is the classic trap: \`0.1 + 0.2\` is not \`0.3\` in floating point. So this program stores every amount as a whole number of **cents** (\`12.50\` becomes \`1250\`) and only turns it back into a decimal string for display. Converting from text yourself is simple with \`partition\`:

\`\`\`python
"12.5".partition(".")     # ('12', '.', '5')
"12".partition(".")       # ('12', '', '')
"5".ljust(2, "0")         # '50'  pad on the right: 5 tenths is 50 cents
\`\`\`

**Decide the error policy.** A command-line tool must never crash on a typo. Here, the parser raises \`ValueError\` with a message a user can act on (\`usage: add <amount> <category> [note]\`), and the run loop (lesson 4) will catch it and print it.

A parsed command is a small dict. The shape is your *contract* between the parser and the rest of the program:

\`\`\`python
{"cmd": "add", "amount": 1250, "category": "food", "note": "lunch with Sam"}
{"cmd": "total", "category": None}
{"cmd": "report"}
\`\`\`

**Common mistake:** trying to handle every command in one long function that parses, stores and prints. It works for three commands and becomes impossible at ten.
--- task
Write the parsing layer:

\`to_cents(text)\` turns a string amount into whole cents: \`"12.50"\` → \`1250\`, \`"3"\` → \`300\`, \`"0.5"\` → \`50\`. It raises \`ValueError\` for anything that is not digits with an optional \`.\` and at most two decimal places (\`"abc"\`, \`"12.345"\`, \`"-5"\`, \`"1."\`), and for zero.

\`parse_command(line)\` returns one of the dicts shown above (command words are case-insensitive; categories are lowercased; the note is the rest of the words joined by single spaces, or \`""\`). It raises \`ValueError\` for: an empty line (\`"empty command"\`), \`add\` with fewer than two arguments (\`"usage: add <amount> <category> [note]"\`), \`total\` with more than one argument (\`"usage: total [category]"\`), \`report\` with any argument (\`"usage: report"\`), or an unknown command (\`"unknown command: <word>"\`).
--- starter
# Expense tracker, step 1: understand one command.
# Amounts are kept in whole cents (ints), never floats.


def to_cents(text):
    pass


def parse_command(line):
    pass
--- solution
# Expense tracker, step 1: understand one command.
# Amounts are kept in whole cents (ints), never floats.


def to_cents(text):
    """Turn "12.50" into 1250. Only positive amounts with at most 2 decimals."""
    whole, dot, frac = text.partition(".")
    if not whole.isdigit() or (dot and not frac.isdigit()) or len(frac) > 2:
        raise ValueError(f"bad amount: {text}")
    cents = int(whole) * 100 + int(frac.ljust(2, "0"))
    if cents <= 0:
        raise ValueError(f"amount must be positive: {text}")
    return cents


def parse_command(line):
    """Turn one command line into a dict, or raise ValueError saying what is wrong."""
    words = line.split()
    if not words:
        raise ValueError("empty command")
    cmd, args = words[0].lower(), words[1:]
    if cmd == "add":
        if len(args) < 2:
            raise ValueError("usage: add <amount> <category> [note]")
        return {"cmd": "add", "amount": to_cents(args[0]), "category": args[1].lower(), "note": " ".join(args[2:])}
    if cmd == "total":
        if len(args) > 1:
            raise ValueError("usage: total [category]")
        return {"cmd": "total", "category": args[0].lower() if args else None}
    if cmd == "report":
        if args:
            raise ValueError("usage: report")
        return {"cmd": "report"}
    raise ValueError(f"unknown command: {words[0]}")
--- hint
For \`to_cents\`, \`whole, dot, frac = text.partition(".")\`. The whole part must be digits; if there was a dot, the fraction must be digits too, and at most 2 of them.
--- hint
\`int(frac.ljust(2, "0"))\` turns \`"5"\` into 50 and \`""\` into 0. Check the total is more than zero at the end.
--- hint
In \`parse_command\`, split the line into words, look at the first word (lowercased), and check how many arguments each command got before building its dict.
--- check test | to_cents converts valid amounts
[to_cents(t) for t in ("12.50", "3", "0.5", "0.05", "1200")] == [1250, 300, 50, 5, 120000]
--- check test | to_cents rejects bad amounts
all(raises(ValueError, lambda t=t: to_cents(t)) for t in ("abc", "12.345", "-5", "1.", ".5", "0", "0.00", "", "1,000"))
--- check case | parse an add command
parse_command("add 12.50 Food lunch   with Sam")
=> {"cmd": "add", "amount": 1250, "category": "food", "note": "lunch with Sam"}
--- check case | The note is optional
parse_command("ADD 7 rent")
=> {"cmd": "add", "amount": 700, "category": "rent", "note": ""}
--- check test | total and report
parse_command("total") == {"cmd": "total", "category": None} and parse_command("Total FOOD") == {"cmd": "total", "category": "food"} and parse_command("report") == {"cmd": "report"}
--- check test | Bad commands raise ValueError
all(raises(ValueError, lambda l=l: parse_command(l)) for l in ("", "   ", "add 5", "add", "total a b", "report now", "spend 5 fun", "add x food"))
--- check test | The error messages say what is wrong
(lambda msg: msg("") == "empty command" and msg("add 5") == "usage: add <amount> <category> [note]" and msg("fly") == "unknown command: fly")(lambda l: (lambda g: (exec("try:\\n    parse_command(line)\\nexcept ValueError as e:\\n    msg = str(e)\\n", g), g.get("msg"))[1])({**globals(), "line": l}))

=== pyp-02 | Expense tracker 2: the ledger
--- teach
Now the model: somewhere to keep expenses and a set of questions you can ask about them.

**One record type, one owner.** Each expense is a small, fixed bundle of fields, which is exactly what a dataclass is for. The collection of expenses belongs to a \`Ledger\` class, and *every* change and question goes through its methods. That gives the rules one home: if you later need to reject duplicate entries or keep an audit log, there is exactly one place to change.

\`\`\`python
from dataclasses import dataclass

@dataclass
class Expense:
    amount: int        # cents
    category: str
    note: str = ""
\`\`\`

**Answer questions from the data, do not store answers.** It is tempting to keep a running \`self.total\` and update it on every \`add\`. But stored answers go stale the moment someone adds a \`remove\` method and forgets to update them. Computing \`total()\` from the list whenever you are asked is always right, and for a personal expense list it is plenty fast.

\`\`\`python
def total(self, category=None):
    return sum(e.amount for e in self.expenses if category is None or e.category == category)
\`\`\`

**Formatting cents for people.** \`divmod\`-style arithmetic splits cents into whole units and the remainder, and the format spec does the rest:

\`\`\`python
cents = 123456
f"{cents // 100:,}.{cents % 100:02d}"    # '1,234.56'
\`\`\`

\`:02d\` pads the cents to two digits, so 5 cents shows as \`.05\`, not \`.5\`.

Defining \`__len__\` lets callers write \`len(ledger)\`, which reads naturally and is what Python programmers expect from a collection.

**Common mistake:** letting other code reach in and edit \`ledger.expenses\` directly. It works until the day the ledger needs to enforce a rule. Go through the methods.
--- task
Add the model to your parser:

- A dataclass \`Expense\` with \`amount\` (int cents), \`category\` (str) and \`note\` (str, default \`""\`).
- \`format_cents(cents)\` returning a string with a thousands separator and two decimals: \`1250\` → \`"12.50"\`, \`5\` → \`"0.05"\`, \`123456\` → \`"1,234.56"\`.
- A class \`Ledger\` with \`add(amount, category, note="")\` (stores and returns a new \`Expense\`), \`total(category=None)\` (cents, for one category or all), \`categories()\` (sorted, no duplicates) and \`__len__\`.
--- starter
# Expense tracker, step 1: understand one command.
# Amounts are kept in whole cents (ints), never floats.


def to_cents(text):
    """Turn "12.50" into 1250. Only positive amounts with at most 2 decimals."""
    whole, dot, frac = text.partition(".")
    if not whole.isdigit() or (dot and not frac.isdigit()) or len(frac) > 2:
        raise ValueError(f"bad amount: {text}")
    cents = int(whole) * 100 + int(frac.ljust(2, "0"))
    if cents <= 0:
        raise ValueError(f"amount must be positive: {text}")
    return cents


def parse_command(line):
    """Turn one command line into a dict, or raise ValueError saying what is wrong."""
    words = line.split()
    if not words:
        raise ValueError("empty command")
    cmd, args = words[0].lower(), words[1:]
    if cmd == "add":
        if len(args) < 2:
            raise ValueError("usage: add <amount> <category> [note]")
        return {"cmd": "add", "amount": to_cents(args[0]), "category": args[1].lower(), "note": " ".join(args[2:])}
    if cmd == "total":
        if len(args) > 1:
            raise ValueError("usage: total [category]")
        return {"cmd": "total", "category": args[0].lower() if args else None}
    if cmd == "report":
        if args:
            raise ValueError("usage: report")
        return {"cmd": "report"}
    raise ValueError(f"unknown command: {words[0]}")
--- solution
# Expense tracker, step 2: a ledger that stores expenses.
from dataclasses import dataclass


def to_cents(text):
    """Turn "12.50" into 1250. Only positive amounts with at most 2 decimals."""
    whole, dot, frac = text.partition(".")
    if not whole.isdigit() or (dot and not frac.isdigit()) or len(frac) > 2:
        raise ValueError(f"bad amount: {text}")
    cents = int(whole) * 100 + int(frac.ljust(2, "0"))
    if cents <= 0:
        raise ValueError(f"amount must be positive: {text}")
    return cents


def parse_command(line):
    """Turn one command line into a dict, or raise ValueError saying what is wrong."""
    words = line.split()
    if not words:
        raise ValueError("empty command")
    cmd, args = words[0].lower(), words[1:]
    if cmd == "add":
        if len(args) < 2:
            raise ValueError("usage: add <amount> <category> [note]")
        return {"cmd": "add", "amount": to_cents(args[0]), "category": args[1].lower(), "note": " ".join(args[2:])}
    if cmd == "total":
        if len(args) > 1:
            raise ValueError("usage: total [category]")
        return {"cmd": "total", "category": args[0].lower() if args else None}
    if cmd == "report":
        if args:
            raise ValueError("usage: report")
        return {"cmd": "report"}
    raise ValueError(f"unknown command: {words[0]}")


@dataclass
class Expense:
    amount: int
    category: str
    note: str = ""


def format_cents(cents):
    """1250 -> "12.50", 123456 -> "1,234.56"."""
    return f"{cents // 100:,}.{cents % 100:02d}"


class Ledger:
    def __init__(self):
        self.expenses = []

    def add(self, amount, category, note=""):
        expense = Expense(amount, category, note)
        self.expenses.append(expense)
        return expense

    def total(self, category=None):
        return sum(e.amount for e in self.expenses if category is None or e.category == category)

    def categories(self):
        return sorted({e.category for e in self.expenses})

    def __len__(self):
        return len(self.expenses)
--- hint
Import \`dataclass\` at the top and declare the three annotated fields; the default goes on the last one.
--- hint
\`format_cents\` is one f-string: \`cents // 100\` with \`:,\` then \`cents % 100\` with \`:02d\`.
--- hint
The ledger keeps a list, \`self.expenses\`. \`total\` is a \`sum\` over a generator with an \`if\`; \`categories\` is \`sorted\` of a set comprehension.
--- check test | format_cents
[format_cents(c) for c in (1250, 5, 0, 100, 123456, 100000000)] == ["12.50", "0.05", "0.00", "1.00", "1,234.56", "1,000,000.00"]
--- check test | add stores and returns an Expense
(lambda l: (l.add(1250, "food", "lunch"), len(l))[0] == Expense(1250, "food", "lunch") and len(l) == 1)(Ledger())
--- check test | The note defaults to empty
Expense(300, "bus").note == "" and Ledger().add(5, "x").note == ""
--- check case | total, overall and by category
(lambda l: (l.add(1250, "food"), l.add(320, "transport"), l.add(4500, "food"), l.total(), l.total("food"), l.total("fun"))[3:])(Ledger())
=> (6070, 5750, 0)
--- check case | categories are sorted without duplicates
(lambda l: (l.add(1, "rent"), l.add(2, "food"), l.add(3, "rent"), l.categories())[-1])(Ledger())
=> ["food", "rent"]
--- check test | An empty ledger
len(Ledger()) == 0 and Ledger().total() == 0 and Ledger().categories() == []
--- check test | The parser still works
parse_command("add 1 food") == {"cmd": "add", "amount": 100, "category": "food", "note": ""}

=== pyp-03 | Expense tracker 3: reports
--- teach
A report answers "where did the money go?" at a glance. That takes three steps, and each is a standard technique.

**1. Aggregate.** Group the expenses by category and sum each group. A plain dict with \`get\` does it in one pass:

\`\`\`python
totals = {}
for e in expenses:
    totals[e.category] = totals.get(e.category, 0) + e.amount
\`\`\`

**2. Order.** Biggest spending first is most useful. For equal totals, order by name, so the report is the same every time you run it; a report whose rows shuffle randomly is hard to compare from month to month. One sort with a tuple key does both:

\`\`\`python
rows = sorted(totals.items(), key=lambda kv: (-kv[1], kv[0]))
\`\`\`

**3. Lay out.** Fixed-width columns make numbers line up so the eye can scan them. Left-align names, right-align amounts:

\`\`\`python
f"{'food':<12}{'57.50':>10}"     # 'food             57.50'
\`\`\`

**Return lines, do not print them.** \`report()\` returns a list of strings. Printing is the run loop's job. A method that returns data can be tested by comparing lists, reused in a different interface (a web page, an email), and combined with other output. A method that prints can only be looked at.

**Handle the empty case on purpose.** A report on no data should say so, rather than print a header, a rule and a total of zero, or crash on \`max()\` of an empty list.

**Common mistake:** forgetting ties. Sorting only by amount makes the order of equal totals depend on insertion order, and your tests (and your users) see it change.
--- task
Add two methods to \`Ledger\`:

- \`by_category()\` returns a dict from category to total cents.
- \`report()\` returns a list of lines: one per category, highest total first and ties in alphabetical order, as the category left-aligned in 12 characters then \`format_cents(total)\` right-aligned in 10; then a line of 22 \`-\` characters; then \`TOTAL\` laid out the same way. An empty ledger's report is \`["no expenses"]\`.
--- starter
# Expense tracker, step 2: a ledger that stores expenses.
from dataclasses import dataclass


def to_cents(text):
    """Turn "12.50" into 1250. Only positive amounts with at most 2 decimals."""
    whole, dot, frac = text.partition(".")
    if not whole.isdigit() or (dot and not frac.isdigit()) or len(frac) > 2:
        raise ValueError(f"bad amount: {text}")
    cents = int(whole) * 100 + int(frac.ljust(2, "0"))
    if cents <= 0:
        raise ValueError(f"amount must be positive: {text}")
    return cents


def parse_command(line):
    """Turn one command line into a dict, or raise ValueError saying what is wrong."""
    words = line.split()
    if not words:
        raise ValueError("empty command")
    cmd, args = words[0].lower(), words[1:]
    if cmd == "add":
        if len(args) < 2:
            raise ValueError("usage: add <amount> <category> [note]")
        return {"cmd": "add", "amount": to_cents(args[0]), "category": args[1].lower(), "note": " ".join(args[2:])}
    if cmd == "total":
        if len(args) > 1:
            raise ValueError("usage: total [category]")
        return {"cmd": "total", "category": args[0].lower() if args else None}
    if cmd == "report":
        if args:
            raise ValueError("usage: report")
        return {"cmd": "report"}
    raise ValueError(f"unknown command: {words[0]}")


@dataclass
class Expense:
    amount: int
    category: str
    note: str = ""


def format_cents(cents):
    """1250 -> "12.50", 123456 -> "1,234.56"."""
    return f"{cents // 100:,}.{cents % 100:02d}"


class Ledger:
    def __init__(self):
        self.expenses = []

    def add(self, amount, category, note=""):
        expense = Expense(amount, category, note)
        self.expenses.append(expense)
        return expense

    def total(self, category=None):
        return sum(e.amount for e in self.expenses if category is None or e.category == category)

    def categories(self):
        return sorted({e.category for e in self.expenses})

    def __len__(self):
        return len(self.expenses)
--- solution
# Expense tracker, step 3: reports.
from dataclasses import dataclass


def to_cents(text):
    """Turn "12.50" into 1250. Only positive amounts with at most 2 decimals."""
    whole, dot, frac = text.partition(".")
    if not whole.isdigit() or (dot and not frac.isdigit()) or len(frac) > 2:
        raise ValueError(f"bad amount: {text}")
    cents = int(whole) * 100 + int(frac.ljust(2, "0"))
    if cents <= 0:
        raise ValueError(f"amount must be positive: {text}")
    return cents


def parse_command(line):
    """Turn one command line into a dict, or raise ValueError saying what is wrong."""
    words = line.split()
    if not words:
        raise ValueError("empty command")
    cmd, args = words[0].lower(), words[1:]
    if cmd == "add":
        if len(args) < 2:
            raise ValueError("usage: add <amount> <category> [note]")
        return {"cmd": "add", "amount": to_cents(args[0]), "category": args[1].lower(), "note": " ".join(args[2:])}
    if cmd == "total":
        if len(args) > 1:
            raise ValueError("usage: total [category]")
        return {"cmd": "total", "category": args[0].lower() if args else None}
    if cmd == "report":
        if args:
            raise ValueError("usage: report")
        return {"cmd": "report"}
    raise ValueError(f"unknown command: {words[0]}")


@dataclass
class Expense:
    amount: int
    category: str
    note: str = ""


def format_cents(cents):
    """1250 -> "12.50", 123456 -> "1,234.56"."""
    return f"{cents // 100:,}.{cents % 100:02d}"


class Ledger:
    def __init__(self):
        self.expenses = []

    def add(self, amount, category, note=""):
        expense = Expense(amount, category, note)
        self.expenses.append(expense)
        return expense

    def total(self, category=None):
        return sum(e.amount for e in self.expenses if category is None or e.category == category)

    def categories(self):
        return sorted({e.category for e in self.expenses})

    def __len__(self):
        return len(self.expenses)

    def by_category(self):
        totals = {}
        for e in self.expenses:
            totals[e.category] = totals.get(e.category, 0) + e.amount
        return totals

    def report(self):
        if not self.expenses:
            return ["no expenses"]
        rows = sorted(self.by_category().items(), key=lambda kv: (-kv[1], kv[0]))
        lines = [f"{category:<12}{format_cents(total):>10}" for category, total in rows]
        lines.append("-" * 22)
        lines.append(f"{'TOTAL':<12}{format_cents(self.total()):>10}")
        return lines
--- hint
\`by_category\` is the \`totals.get(category, 0) + amount\` loop.
--- hint
Sort \`self.by_category().items()\` with \`key=lambda kv: (-kv[1], kv[0])\`, and format each row with \`f"{category:<12}{format_cents(total):>10}"\`.
--- hint
After the rows, append \`"-" * 22\` and the TOTAL row. Check for an empty ledger first.
--- check case | by_category sums each category
(lambda l: (l.add(1250, "food"), l.add(320, "bus"), l.add(4500, "food"), l.by_category())[-1])(Ledger())
=> {"food": 5750, "bus": 320}
--- check case | The report, biggest first
(lambda l: (l.add(1250, "food"), l.add(320, "transport"), l.add(4500, "food"), l.add(120000, "rent"), l.report())[-1])(Ledger())
=> ["rent          1,200.00", "food             57.50", "transport         3.20", "----------------------", "TOTAL         1,260.70"]
--- check case | Equal totals are in alphabetical order
(lambda l: (l.add(500, "zoo"), l.add(500, "art"), l.add(500, "music"), l.report())[-1][:3])(Ledger())
=> ["art               5.00", "music             5.00", "zoo               5.00"]
--- check case | An empty report
Ledger().report()
=> ["no expenses"]

=== pyp-04 | Expense tracker 4: the program
--- teach
The last piece is the loop that makes this a program: read commands, run them, print what happened.

\`\`\`python
def run(lines):
    ledger = Ledger()
    out = []
    for line in lines:
        ...
    return out
\`\`\`

**Where to catch errors.** Each layer below raises \`ValueError\` when something is wrong, and knows nothing about screens or users. The run loop is the **error boundary**: the one place that knows how to *report* a problem, so it catches the error, turns it into an \`error: ...\` line, and carries on with the next command. One typo must never lose the rest of someone's input.

Catch only what you expect (\`ValueError\` from parsing). An unexpected \`TypeError\` is a bug in *your* code, and hiding it would make it much harder to find.

**\`run(lines)\` returns output instead of printing** for the same reason as \`report()\`: it can be tested with a list of lines in and a list of lines out, with no keyboard involved. The real program is then a thin shell around it:

\`\`\`python
if __name__ == "__main__":
    for line in run(sys.stdin.read().splitlines()):
        print(line)
\`\`\`

\`sys.stdin.read()\` reads everything the user typed or piped in. The \`__name__\` guard means the loop runs when the file is executed as a program, but not when another file imports its functions.

**Blank lines and comments** (\`# September\`) are skipped before parsing, so an input file can be laid out and annotated for humans.

That is the whole program: four layers, each small, each testable, each with one job. Look back at how little each lesson needed to change the ones before it. That is what a good structure buys you.
--- task
Write \`run(lines)\`, returning the list of output lines:

- Skip blank lines and lines starting with \`#\`.
- A line that fails to parse produces \`"error: <message>"\`, and processing continues.
- \`add\` stores the expense and produces \`"added 12.50 to food"\`.
- \`total\` produces \`"total: <amount>"\`; \`total food\` produces \`"total food: <amount>"\`.
- \`report\` produces the report lines.

Then add the entry point under \`if __name__ == "__main__":\` that runs the lines of standard input and prints each output line.
--- starter
# Expense tracker, step 3: reports.
from dataclasses import dataclass


def to_cents(text):
    """Turn "12.50" into 1250. Only positive amounts with at most 2 decimals."""
    whole, dot, frac = text.partition(".")
    if not whole.isdigit() or (dot and not frac.isdigit()) or len(frac) > 2:
        raise ValueError(f"bad amount: {text}")
    cents = int(whole) * 100 + int(frac.ljust(2, "0"))
    if cents <= 0:
        raise ValueError(f"amount must be positive: {text}")
    return cents


def parse_command(line):
    """Turn one command line into a dict, or raise ValueError saying what is wrong."""
    words = line.split()
    if not words:
        raise ValueError("empty command")
    cmd, args = words[0].lower(), words[1:]
    if cmd == "add":
        if len(args) < 2:
            raise ValueError("usage: add <amount> <category> [note]")
        return {"cmd": "add", "amount": to_cents(args[0]), "category": args[1].lower(), "note": " ".join(args[2:])}
    if cmd == "total":
        if len(args) > 1:
            raise ValueError("usage: total [category]")
        return {"cmd": "total", "category": args[0].lower() if args else None}
    if cmd == "report":
        if args:
            raise ValueError("usage: report")
        return {"cmd": "report"}
    raise ValueError(f"unknown command: {words[0]}")


@dataclass
class Expense:
    amount: int
    category: str
    note: str = ""


def format_cents(cents):
    """1250 -> "12.50", 123456 -> "1,234.56"."""
    return f"{cents // 100:,}.{cents % 100:02d}"


class Ledger:
    def __init__(self):
        self.expenses = []

    def add(self, amount, category, note=""):
        expense = Expense(amount, category, note)
        self.expenses.append(expense)
        return expense

    def total(self, category=None):
        return sum(e.amount for e in self.expenses if category is None or e.category == category)

    def categories(self):
        return sorted({e.category for e in self.expenses})

    def __len__(self):
        return len(self.expenses)

    def by_category(self):
        totals = {}
        for e in self.expenses:
            totals[e.category] = totals.get(e.category, 0) + e.amount
        return totals

    def report(self):
        if not self.expenses:
            return ["no expenses"]
        rows = sorted(self.by_category().items(), key=lambda kv: (-kv[1], kv[0]))
        lines = [f"{category:<12}{format_cents(total):>10}" for category, total in rows]
        lines.append("-" * 22)
        lines.append(f"{'TOTAL':<12}{format_cents(self.total()):>10}")
        return lines
--- solution
# Expense tracker, step 4: the program.
import sys
from dataclasses import dataclass


def to_cents(text):
    """Turn "12.50" into 1250. Only positive amounts with at most 2 decimals."""
    whole, dot, frac = text.partition(".")
    if not whole.isdigit() or (dot and not frac.isdigit()) or len(frac) > 2:
        raise ValueError(f"bad amount: {text}")
    cents = int(whole) * 100 + int(frac.ljust(2, "0"))
    if cents <= 0:
        raise ValueError(f"amount must be positive: {text}")
    return cents


def parse_command(line):
    """Turn one command line into a dict, or raise ValueError saying what is wrong."""
    words = line.split()
    if not words:
        raise ValueError("empty command")
    cmd, args = words[0].lower(), words[1:]
    if cmd == "add":
        if len(args) < 2:
            raise ValueError("usage: add <amount> <category> [note]")
        return {"cmd": "add", "amount": to_cents(args[0]), "category": args[1].lower(), "note": " ".join(args[2:])}
    if cmd == "total":
        if len(args) > 1:
            raise ValueError("usage: total [category]")
        return {"cmd": "total", "category": args[0].lower() if args else None}
    if cmd == "report":
        if args:
            raise ValueError("usage: report")
        return {"cmd": "report"}
    raise ValueError(f"unknown command: {words[0]}")


@dataclass
class Expense:
    amount: int
    category: str
    note: str = ""


def format_cents(cents):
    """1250 -> "12.50", 123456 -> "1,234.56"."""
    return f"{cents // 100:,}.{cents % 100:02d}"


class Ledger:
    def __init__(self):
        self.expenses = []

    def add(self, amount, category, note=""):
        expense = Expense(amount, category, note)
        self.expenses.append(expense)
        return expense

    def total(self, category=None):
        return sum(e.amount for e in self.expenses if category is None or e.category == category)

    def categories(self):
        return sorted({e.category for e in self.expenses})

    def __len__(self):
        return len(self.expenses)

    def by_category(self):
        totals = {}
        for e in self.expenses:
            totals[e.category] = totals.get(e.category, 0) + e.amount
        return totals

    def report(self):
        if not self.expenses:
            return ["no expenses"]
        rows = sorted(self.by_category().items(), key=lambda kv: (-kv[1], kv[0]))
        lines = [f"{category:<12}{format_cents(total):>10}" for category, total in rows]
        lines.append("-" * 22)
        lines.append(f"{'TOTAL':<12}{format_cents(self.total()):>10}")
        return lines


def run(lines):
    """Run every command line; return the output lines. Never crashes on bad input."""
    ledger = Ledger()
    out = []
    for line in lines:
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        try:
            command = parse_command(line)
        except ValueError as err:
            out.append(f"error: {err}")
            continue
        if command["cmd"] == "add":
            ledger.add(command["amount"], command["category"], command["note"])
            out.append(f"added {format_cents(command['amount'])} to {command['category']}")
        elif command["cmd"] == "total":
            category = command["category"]
            label = "total" if category is None else f"total {category}"
            out.append(f"{label}: {format_cents(ledger.total(category))}")
        else:
            out.extend(ledger.report())
    return out


if __name__ == "__main__":
    for output_line in run(sys.stdin.read().splitlines()):
        print(output_line)
--- stdin
# September
add 12.50 food lunch with Sam
add 3.20 transport bus
add 45 food groceries
add 1200 rent

add abc food
total
total food
spend 5 fun
report
--- hint
Inside the loop: strip, skip blanks and comments, then \`try: command = parse_command(line)\` / \`except ValueError as err:\` append the error line and \`continue\`.
--- hint
Then branch on \`command["cmd"]\`. For \`total\`, the label is \`"total"\` or \`f"total {category}"\`; for \`report\`, \`out.extend(ledger.report())\`.
--- hint
You need \`import sys\` at the top for \`sys.stdin.read().splitlines()\`.
--- check output | The program runs a whole session
added 12.50 to food
added 3.20 to transport
added 45.00 to food
added 1,200.00 to rent
error: bad amount: abc
total: 1,260.70
total food: 57.50
error: unknown command: spend
rent          1,200.00
food             57.50
transport         3.20
----------------------
TOTAL         1,260.70
--- check case | run returns the output lines
run(["add 2 fun", "total fun", "total"])
=> ["added 2.00 to fun", "total fun: 2.00", "total: 2.00"]
--- check case | Errors do not stop the run
run(["add", "add 1.234 x", "report"])
=> ["error: usage: add <amount> <category> [note]", "error: bad amount: 1.234", "no expenses"]
--- check case | Nothing in, nothing out
run(["", "# just a comment"])
=> []

=== pyp-05 | Markdown converter 1: inline formatting with regular expressions
--- teach
The second project converts **Markdown** (the plain-text format of READMEs and chat messages) into HTML. This lesson handles formatting *inside* a line; the next three handle the structure of the document.

| Markdown | HTML |
|---|---|
| \`**bold**\` | \`<strong>bold</strong>\` |
| \`*italic*\` | \`<em>italic</em>\` |
| \`\` \`code\` \`\` | \`<code>code</code>\` |
| \`[text](url)\` | \`<a href="url">text</a>\` |

**Regular expressions** are a small language for describing patterns in text, and the \`re\` module runs them:

\`\`\`python
import re
re.findall(r"\\d+", "3 cats and 12 dogs")          # ['3', '12']
re.sub(r"\\*\\*(.+?)\\*\\*", r"<b>\\1</b>", "a **b** c")  # 'a <b>b</b> c'
\`\`\`

The pieces you need:

| Pattern | Matches |
|---|---|
| \`\\*\` | a literal \`*\` (a bare \`*\` means "repeat") |
| \`.\` | any character; \`\\S\` any non-space character |
| \`+\`, \`*\`, \`?\` | one or more, zero or more, optional |
| \`+?\`, \`*?\` | the same, but as **few** as possible |
| \`( )\` | a group you can refer to as \`\\1\`, \`\\2\` in the replacement |
| \`[^\\]]\` | any character except \`]\` |

Write patterns as raw strings (\`r"..."\`) so Python does not treat the backslashes itself.

**Greedy vs lazy.** In \`"**a** and **b**"\`, the greedy \`\\*\\*(.+)\\*\\*\` matches from the first \`**\` to the *last*, swallowing \` and \`. The lazy \`.+?\` stops at the first closing \`**\`.

**Precision matters.** \`5 * 3 * 2\` is not italic, and Markdown agrees: emphasis needs a non-space character just inside each star. \`\\*(\\S|\\S.*?\\S)\\*\` says exactly that: a star, then either a single non-space character, or a non-space, as little as possible, and another non-space; then a star. The \`|\` means "or", and the regex tries the left side first, which is why \`*a* or *b*\` gives two short matches instead of one long one.

**Escape first.** Text like \`a < b\` must become \`a &lt; b\`, or the browser reads \`<\` as the start of a tag. Replace \`&\` *first*, or you will turn the \`&\` of every \`&lt;\` you just made into \`&amp;lt;\`.

**Code spans are special:** nothing inside backticks is formatted. \`re.split\` with a *capturing* group keeps the separators, so the code spans land at the odd positions of the result:

\`\`\`python
re.split(r"(\`[^\`]+\`)", "use \`a*b*c\` here")    # ['use ', '\`a*b*c\`', ' here']
\`\`\`
--- task
Write:

- \`escape(text)\`: replace \`&\`, \`<\`, \`>\` and \`"\` with \`&amp;\`, \`&lt;\`, \`&gt;\` and \`&quot;\`.
- \`inline(text)\`: escape the text and convert \`**strong**\`, \`*em*\` (only when the characters just inside the stars are not spaces), \`\` \`code\` \`\` and \`[text](url)\` links. Text inside backticks is escaped but not otherwise formatted.
--- starter
# Markdown to HTML, step 1: inline formatting.
import re


def escape(text):
    return text


def inline(text):
    return text
--- solution
# Markdown to HTML, step 1: inline formatting.
import re

STRONG = re.compile(r"\\*\\*(\\S|\\S.*?\\S)\\*\\*")
EM = re.compile(r"\\*(\\S|\\S.*?\\S)\\*")
LINK = re.compile(r"\\[([^\\]]+)\\]\\(([^)\\s]+)\\)")


def escape(text):
    """Make text safe to put inside HTML. The & must be replaced first."""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def format_text(text):
    text = escape(text)
    text = LINK.sub(r'<a href="\\2">\\1</a>', text)
    text = STRONG.sub(r"<strong>\\1</strong>", text)
    return EM.sub(r"<em>\\1</em>", text)


def inline(text):
    """Code spans first, so nothing inside backticks is formatted."""
    parts = re.split(r"(\`[^\`]+\`)", text)
    out = []
    for i, part in enumerate(parts):
        if i % 2 == 1:
            out.append(f"<code>{escape(part[1:-1])}</code>")
        else:
            out.append(format_text(part))
    return "".join(out)
--- hint
Split the text with \`re.split(r"(\`[^\`]+\`)", text)\`. Odd positions are code spans: strip the backticks and escape. Even positions get escaped and then formatted.
--- hint
Do the formatting with \`re.sub\` after escaping: links first, then \`**strong**\`, then \`*em*\` (so the strong stars are gone before the em pattern looks).
--- hint
A strong pattern that refuses spaces just inside: \`r"\\*\\*(\\S|\\S.*?\\S)\\*\\*"\`. The em pattern is the same with single stars.
--- check case | escape, with & first
escape('a < b && "c" > d')
=> "a &lt; b &amp;&amp; &quot;c&quot; &gt; d"
--- check case | Bold and italic
inline("**bold** and *soft*")
=> "<strong>bold</strong> and <em>soft</em>"
--- check case | Two bold phrases stay separate
inline("**a** or **b**")
=> "<strong>a</strong> or <strong>b</strong>"
--- check case | Stars with spaces around them are not emphasis
inline("5 * 3 * 2")
=> "5 * 3 * 2"
--- check case | Code spans are escaped but not formatted
inline("run \`a*b*c < d\` now")
=> "run <code>a*b*c &lt; d</code> now"
--- check case | Links
inline("see [the docs](https://example.com/a?x=1&y=2)")
=> 'see <a href="https://example.com/a?x=1&amp;y=2">the docs</a>'
--- check case | Plain text is only escaped
inline("fish & chips")
=> "fish &amp; chips"

=== pyp-06 | Markdown converter 2: headings and paragraphs
--- teach
Inline formatting works within a line. Now the document's **blocks**: headings and paragraphs.

\`\`\`
# Title

This is one paragraph
that spans two lines.

## Section
Another paragraph.
\`\`\`

becomes

\`\`\`
<h1>Title</h1>
<p>This is one paragraph that spans two lines.</p>
<h2>Section</h2>
<p>Another paragraph.</p>
\`\`\`

The rules: a line starting with one to six \`#\` and a space is a heading of that level. Consecutive ordinary lines form one paragraph, joined with spaces. A blank line ends a paragraph. A heading also ends any paragraph before it.

**Line-by-line processing with a buffer.** You cannot write a paragraph's HTML when you see its first line, because you do not yet know where it ends. So collect its lines in a list, and **flush** (write it out and clear it) when something ends it: a blank line, a heading, or the end of the input.

\`\`\`python
paragraph = []

def flush():
    if paragraph:
        html.append(f"<p>{inline(' '.join(paragraph))}</p>")
        paragraph.clear()
\`\`\`

\`flush\` is defined inside \`convert\` so it can see \`html\` and \`paragraph\`. It calls \`paragraph.clear()\` rather than \`paragraph = []\`, because assigning inside \`flush\` would create a new local variable instead of emptying the shared list. That is the closure rule from the expert course.

**Don't forget the end.** When the loop finishes, the last paragraph is still in the buffer. The most common bug in this kind of code is losing the final block.

**Common mistake:** matching headings with \`line.startswith("#")\`. Then \`#hashtag\` and \`####### seven\` become headings. A regular expression can state the rule exactly: \`^(#{1,6})\\s+(.*)$\`.
--- task
Write \`convert(md)\` returning the HTML as a string, one block per line (joined with \`"\\n"\`):

- \`#\` to \`######\` followed by a space: \`<h1>\`…\`<h6>\`, text trimmed and run through \`inline\`.
- Consecutive other non-blank lines (each stripped): one \`<p>\`, joined with single spaces, run through \`inline\`.
- Blank lines separate blocks and produce nothing themselves.
--- starter
# Markdown to HTML, step 1: inline formatting.
import re

STRONG = re.compile(r"\\*\\*(\\S|\\S.*?\\S)\\*\\*")
EM = re.compile(r"\\*(\\S|\\S.*?\\S)\\*")
LINK = re.compile(r"\\[([^\\]]+)\\]\\(([^)\\s]+)\\)")


def escape(text):
    """Make text safe to put inside HTML. The & must be replaced first."""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def format_text(text):
    text = escape(text)
    text = LINK.sub(r'<a href="\\2">\\1</a>', text)
    text = STRONG.sub(r"<strong>\\1</strong>", text)
    return EM.sub(r"<em>\\1</em>", text)


def inline(text):
    """Code spans first, so nothing inside backticks is formatted."""
    parts = re.split(r"(\`[^\`]+\`)", text)
    out = []
    for i, part in enumerate(parts):
        if i % 2 == 1:
            out.append(f"<code>{escape(part[1:-1])}</code>")
        else:
            out.append(format_text(part))
    return "".join(out)
--- solution
# Markdown to HTML, step 2: headings and paragraphs.
import re

STRONG = re.compile(r"\\*\\*(\\S|\\S.*?\\S)\\*\\*")
EM = re.compile(r"\\*(\\S|\\S.*?\\S)\\*")
LINK = re.compile(r"\\[([^\\]]+)\\]\\(([^)\\s]+)\\)")


def escape(text):
    """Make text safe to put inside HTML. The & must be replaced first."""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def format_text(text):
    text = escape(text)
    text = LINK.sub(r'<a href="\\2">\\1</a>', text)
    text = STRONG.sub(r"<strong>\\1</strong>", text)
    return EM.sub(r"<em>\\1</em>", text)


def inline(text):
    """Code spans first, so nothing inside backticks is formatted."""
    parts = re.split(r"(\`[^\`]+\`)", text)
    out = []
    for i, part in enumerate(parts):
        if i % 2 == 1:
            out.append(f"<code>{escape(part[1:-1])}</code>")
        else:
            out.append(format_text(part))
    return "".join(out)


HEADING = re.compile(r"^(#{1,6})\\s+(.*)$")


def convert(md):
    html = []
    paragraph = []

    def flush():
        if paragraph:
            html.append(f"<p>{inline(' '.join(paragraph))}</p>")
            paragraph.clear()

    for raw in md.splitlines():
        line = raw.strip()
        heading = HEADING.match(line)
        if not line:
            flush()
        elif heading:
            flush()
            level = len(heading.group(1))
            html.append(f"<h{level}>{inline(heading.group(2).strip())}</h{level}>")
        else:
            paragraph.append(line)
    flush()
    return "\\n".join(html)
--- hint
Loop over \`md.splitlines()\`, strip each line, and decide: blank, heading (use a compiled \`re\` pattern), or paragraph text.
--- hint
Keep a \`paragraph\` list and a nested \`flush()\` that writes it as a \`<p>\` and clears it. Call \`flush()\` on a blank line, before a heading, and once after the loop.
--- hint
The heading level is \`len(match.group(1))\`, the number of \`#\` characters.
--- check case | A heading and a two-line paragraph
convert("# Title\\n\\nOne paragraph\\nover two lines.")
=> "<h1>Title</h1>\\n<p>One paragraph over two lines.</p>"
--- check case | A heading ends a paragraph even without a blank line
convert("text\\n## Part *two*\\nmore")
=> "<p>text</p>\\n<h2>Part <em>two</em></h2>\\n<p>more</p>"
--- check case | Not headings: no space, or seven #
convert("#hashtag\\n\\n####### seven")
=> "<p>#hashtag</p>\\n<p>####### seven</p>"
--- check case | Extra blank lines and indentation
convert("\\n\\n   first  \\n\\n\\n  second\\n\\n")
=> "<p>first</p>\\n<p>second</p>"
--- check case | Every heading level
convert("###### small\\n### mid")
=> "<h6>small</h6>\\n<h3>mid</h3>"
--- check case | Empty input
convert("")
=> ""

=== pyp-07 | Markdown converter 3: lists
--- teach
Lists add a second kind of block that spans several lines:

\`\`\`
- milk
- eggs

1. mix
2. bake
\`\`\`

becomes

\`\`\`
<ul>
<li>milk</li>
<li>eggs</li>
</ul>
<ol>
<li>mix</li>
<li>bake</li>
</ol>
\`\`\`

A line starting with \`- \` or \`* \` is a bullet item; a line starting with a number, a dot and a space is a numbered item. Consecutive items of the same kind are one list. Anything else (a blank line, a heading, ordinary text, or an item of the *other* kind) ends it.

**The converter now has state.** Besides the paragraph buffer, it must remember whether a list is open and which kind. That is a small **state machine**: the same line can mean different things depending on the current state. An item when no list is open starts one (\`<ul>\` then \`<li>\`); an item when the same kind is open just adds an \`<li>\`.

\`\`\`python
list_kind = None      # None, "ul" or "ol"

def list_item(kind, text):
    nonlocal list_kind
    if list_kind != kind:
        flush()                    # close whatever was open
        html.append(f"<{kind}>")
        list_kind = kind
    html.append(f"<li>{inline(text)}</li>")
\`\`\`

This time the helper *assigns* to \`list_kind\`, so it needs \`nonlocal\`. Extend \`flush()\` to close an open list as well as a paragraph, and every existing call to it (blank line, heading, end of input) now closes lists too, for free.

**Watch the overlap with emphasis.** \`* item\` (star then space) is a bullet, but \`*word* starts here\` is a paragraph with italics. The pattern \`^[-*]\\s+\` requires the space.

**Common mistake:** ordinary text right after a list being swallowed into the list, or the list never being closed. Test both.
--- task
Extend \`convert\` with lists:

- \`- item\` or \`* item\`: a \`<ul>\`; \`1. item\` (any number): an \`<ol>\`.
- Output \`<ul>\` / \`<ol>\`, each \`<li>...</li>\` and the closing tag on their own lines. Item text is run through \`inline\`.
- A blank line, heading, ordinary line, or an item of the other kind closes the open list. Headings and paragraphs work as before.
--- starter
# Markdown to HTML, step 2: headings and paragraphs.
import re

STRONG = re.compile(r"\\*\\*(\\S|\\S.*?\\S)\\*\\*")
EM = re.compile(r"\\*(\\S|\\S.*?\\S)\\*")
LINK = re.compile(r"\\[([^\\]]+)\\]\\(([^)\\s]+)\\)")


def escape(text):
    """Make text safe to put inside HTML. The & must be replaced first."""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def format_text(text):
    text = escape(text)
    text = LINK.sub(r'<a href="\\2">\\1</a>', text)
    text = STRONG.sub(r"<strong>\\1</strong>", text)
    return EM.sub(r"<em>\\1</em>", text)


def inline(text):
    """Code spans first, so nothing inside backticks is formatted."""
    parts = re.split(r"(\`[^\`]+\`)", text)
    out = []
    for i, part in enumerate(parts):
        if i % 2 == 1:
            out.append(f"<code>{escape(part[1:-1])}</code>")
        else:
            out.append(format_text(part))
    return "".join(out)


HEADING = re.compile(r"^(#{1,6})\\s+(.*)$")


def convert(md):
    html = []
    paragraph = []

    def flush():
        if paragraph:
            html.append(f"<p>{inline(' '.join(paragraph))}</p>")
            paragraph.clear()

    for raw in md.splitlines():
        line = raw.strip()
        heading = HEADING.match(line)
        if not line:
            flush()
        elif heading:
            flush()
            level = len(heading.group(1))
            html.append(f"<h{level}>{inline(heading.group(2).strip())}</h{level}>")
        else:
            paragraph.append(line)
    flush()
    return "\\n".join(html)
--- solution
# Markdown to HTML, step 3: lists.
import re

STRONG = re.compile(r"\\*\\*(\\S|\\S.*?\\S)\\*\\*")
EM = re.compile(r"\\*(\\S|\\S.*?\\S)\\*")
LINK = re.compile(r"\\[([^\\]]+)\\]\\(([^)\\s]+)\\)")


def escape(text):
    """Make text safe to put inside HTML. The & must be replaced first."""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def format_text(text):
    text = escape(text)
    text = LINK.sub(r'<a href="\\2">\\1</a>', text)
    text = STRONG.sub(r"<strong>\\1</strong>", text)
    return EM.sub(r"<em>\\1</em>", text)


def inline(text):
    """Code spans first, so nothing inside backticks is formatted."""
    parts = re.split(r"(\`[^\`]+\`)", text)
    out = []
    for i, part in enumerate(parts):
        if i % 2 == 1:
            out.append(f"<code>{escape(part[1:-1])}</code>")
        else:
            out.append(format_text(part))
    return "".join(out)


HEADING = re.compile(r"^(#{1,6})\\s+(.*)$")
BULLET = re.compile(r"^[-*]\\s+(.*)$")
NUMBERED = re.compile(r"^\\d+\\.\\s+(.*)$")


def convert(md):
    html = []
    paragraph = []
    list_kind = None

    def flush():
        nonlocal list_kind
        if paragraph:
            html.append(f"<p>{inline(' '.join(paragraph))}</p>")
            paragraph.clear()
        if list_kind:
            html.append(f"</{list_kind}>")
            list_kind = None

    def list_item(kind, text):
        nonlocal list_kind
        if list_kind != kind:
            flush()
            html.append(f"<{kind}>")
            list_kind = kind
        html.append(f"<li>{inline(text)}</li>")

    for raw in md.splitlines():
        line = raw.strip()
        heading = HEADING.match(line)
        bullet = BULLET.match(line)
        numbered = NUMBERED.match(line)
        if not line:
            flush()
        elif heading:
            flush()
            level = len(heading.group(1))
            html.append(f"<h{level}>{inline(heading.group(2).strip())}</h{level}>")
        elif bullet:
            list_item("ul", bullet.group(1))
        elif numbered:
            list_item("ol", numbered.group(1))
        else:
            if list_kind:
                flush()
            paragraph.append(line)
    flush()
    return "\\n".join(html)
--- hint
Add two patterns: \`r"^[-*]\\s+(.*)$"\` and \`r"^\\d+\\.\\s+(.*)$"\`, and a \`list_kind\` variable that starts as \`None\`.
--- hint
Write a nested \`list_item(kind, text)\` that opens a new list when \`list_kind != kind\` (flushing first), then appends the \`<li>\`. It needs \`nonlocal list_kind\`.
--- hint
Make \`flush()\` also close an open list (append \`</ul>\` or \`</ol>\` and reset \`list_kind\`). An ordinary line after a list must flush before starting its paragraph.
--- check case | A bullet list
convert("- milk\\n* eggs & *ham*")
=> "<ul>\\n<li>milk</li>\\n<li>eggs &amp; <em>ham</em></li>\\n</ul>"
--- check case | A numbered list after a bullet list
convert("- a\\n- b\\n1. one\\n22. two")
=> "<ul>\\n<li>a</li>\\n<li>b</li>\\n</ul>\\n<ol>\\n<li>one</li>\\n<li>two</li>\\n</ol>"
--- check case | Text after a list starts a paragraph
convert("- a\\nthen text\\nmore text")
=> "<ul>\\n<li>a</li>\\n</ul>\\n<p>then text more text</p>"
--- check case | A paragraph, a list, a heading
convert("Intro\\n- x\\n# End")
=> "<p>Intro</p>\\n<ul>\\n<li>x</li>\\n</ul>\\n<h1>End</h1>"
--- check case | Italic text at the start of a line is not a list
convert("*word* starts here")
=> "<p><em>word</em> starts here</p>"
--- check case | Headings and paragraphs still work
convert("# T\\n\\np1\\np2")
=> "<h1>T</h1>\\n<p>p1 p2</p>"

=== pyp-08 | Markdown converter 4: code blocks and the command line
--- teach
The last feature is fenced **code blocks**:

\`\`\`\`
\`\`\`python
if x < 3:
    print("*not italic*")
\`\`\`
\`\`\`\`

Inside a fence, *nothing* is Markdown: no headings, no lists, no emphasis, and the indentation must survive. The only thing to do is escape it. The output is

\`\`\`
<pre><code class="language-python">if x &lt; 3:
    print(&quot;*not italic*&quot;)</code></pre>
\`\`\`

**A new mode.** In a code block, lines must not be stripped or interpreted, so the one-line-at-a-time \`for\` loop no longer fits: when you see an opening fence you want to *consume* every line up to the closing fence in one go. Switch to an index-based loop, where a branch can move the index as far as it needs:

\`\`\`python
i = 0
while i < len(lines):
    if opening fence:
        i += 1
        while i < len(lines) and lines[i].strip() != "\`\`\`":
            code.append(escape(lines[i]))      # raw line, not stripped
            i += 1
        ...
    i += 1          # also steps past the closing fence
\`\`\`

A fence that is never closed runs to the end of the document: the inner loop simply stops at the end.

**The command line.** Like the expense tracker, the converter becomes a program by adding a thin shell: read all of standard input, convert it, print it. Because \`convert\` takes a string and returns a string, the shell is one line, and everything that matters can be tested without it.

With this lesson you have built a real tool: a document converter with inline formatting, block structure, state, modes and a command-line interface, in well under a hundred lines, each part testable on its own.
--- task
Extend \`convert\`:

- A line that is \` \`\`\` \` optionally followed by a language name (after stripping) opens a code block; the next line that strips to \` \`\`\` \` closes it (or the end of the input does).
- Output the block as \`<pre><code>\` + the raw lines, escaped but not stripped or formatted, joined with \`"\\n"\` + \`</code></pre>\` on one output entry. With a language, the opening tag is \`<code class="language-NAME">\`.
- A code block closes any open paragraph or list first.

Then add the entry point under \`if __name__ == "__main__":\` that converts all of standard input and prints the result.
--- starter
# Markdown to HTML, step 3: lists.
import re

STRONG = re.compile(r"\\*\\*(\\S|\\S.*?\\S)\\*\\*")
EM = re.compile(r"\\*(\\S|\\S.*?\\S)\\*")
LINK = re.compile(r"\\[([^\\]]+)\\]\\(([^)\\s]+)\\)")


def escape(text):
    """Make text safe to put inside HTML. The & must be replaced first."""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def format_text(text):
    text = escape(text)
    text = LINK.sub(r'<a href="\\2">\\1</a>', text)
    text = STRONG.sub(r"<strong>\\1</strong>", text)
    return EM.sub(r"<em>\\1</em>", text)


def inline(text):
    """Code spans first, so nothing inside backticks is formatted."""
    parts = re.split(r"(\`[^\`]+\`)", text)
    out = []
    for i, part in enumerate(parts):
        if i % 2 == 1:
            out.append(f"<code>{escape(part[1:-1])}</code>")
        else:
            out.append(format_text(part))
    return "".join(out)


HEADING = re.compile(r"^(#{1,6})\\s+(.*)$")
BULLET = re.compile(r"^[-*]\\s+(.*)$")
NUMBERED = re.compile(r"^\\d+\\.\\s+(.*)$")


def convert(md):
    html = []
    paragraph = []
    list_kind = None

    def flush():
        nonlocal list_kind
        if paragraph:
            html.append(f"<p>{inline(' '.join(paragraph))}</p>")
            paragraph.clear()
        if list_kind:
            html.append(f"</{list_kind}>")
            list_kind = None

    def list_item(kind, text):
        nonlocal list_kind
        if list_kind != kind:
            flush()
            html.append(f"<{kind}>")
            list_kind = kind
        html.append(f"<li>{inline(text)}</li>")

    for raw in md.splitlines():
        line = raw.strip()
        heading = HEADING.match(line)
        bullet = BULLET.match(line)
        numbered = NUMBERED.match(line)
        if not line:
            flush()
        elif heading:
            flush()
            level = len(heading.group(1))
            html.append(f"<h{level}>{inline(heading.group(2).strip())}</h{level}>")
        elif bullet:
            list_item("ul", bullet.group(1))
        elif numbered:
            list_item("ol", numbered.group(1))
        else:
            if list_kind:
                flush()
            paragraph.append(line)
    flush()
    return "\\n".join(html)
--- solution
# Markdown to HTML, step 4: code blocks and the command line.
import sys
import re

STRONG = re.compile(r"\\*\\*(\\S|\\S.*?\\S)\\*\\*")
EM = re.compile(r"\\*(\\S|\\S.*?\\S)\\*")
LINK = re.compile(r"\\[([^\\]]+)\\]\\(([^)\\s]+)\\)")


def escape(text):
    """Make text safe to put inside HTML. The & must be replaced first."""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def format_text(text):
    text = escape(text)
    text = LINK.sub(r'<a href="\\2">\\1</a>', text)
    text = STRONG.sub(r"<strong>\\1</strong>", text)
    return EM.sub(r"<em>\\1</em>", text)


def inline(text):
    """Code spans first, so nothing inside backticks is formatted."""
    parts = re.split(r"(\`[^\`]+\`)", text)
    out = []
    for i, part in enumerate(parts):
        if i % 2 == 1:
            out.append(f"<code>{escape(part[1:-1])}</code>")
        else:
            out.append(format_text(part))
    return "".join(out)


HEADING = re.compile(r"^(#{1,6})\\s+(.*)$")
BULLET = re.compile(r"^[-*]\\s+(.*)$")
NUMBERED = re.compile(r"^\\d+\\.\\s+(.*)$")
FENCE = re.compile(r"^\`\`\`\\s*([\\w+-]*)\\s*$")


def convert(md):
    html = []
    paragraph = []
    list_kind = None

    def flush():
        nonlocal list_kind
        if paragraph:
            html.append(f"<p>{inline(' '.join(paragraph))}</p>")
            paragraph.clear()
        if list_kind:
            html.append(f"</{list_kind}>")
            list_kind = None

    def list_item(kind, text):
        nonlocal list_kind
        if list_kind != kind:
            flush()
            html.append(f"<{kind}>")
            list_kind = kind
        html.append(f"<li>{inline(text)}</li>")

    lines = md.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        fence = FENCE.match(line)
        heading = HEADING.match(line)
        bullet = BULLET.match(line)
        numbered = NUMBERED.match(line)
        if fence:
            flush()
            language = fence.group(1)
            code = []
            i += 1
            while i < len(lines) and lines[i].strip() != "\`\`\`":
                code.append(escape(lines[i]))
                i += 1
            attr = f' class="language-{language}"' if language else ""
            html.append(f"<pre><code{attr}>" + "\\n".join(code) + "</code></pre>")
        elif not line:
            flush()
        elif heading:
            flush()
            level = len(heading.group(1))
            html.append(f"<h{level}>{inline(heading.group(2).strip())}</h{level}>")
        elif bullet:
            list_item("ul", bullet.group(1))
        elif numbered:
            list_item("ol", numbered.group(1))
        else:
            if list_kind:
                flush()
            paragraph.append(line)
        i += 1
    flush()
    return "\\n".join(html)


if __name__ == "__main__":
    print(convert(sys.stdin.read()))
--- stdin
# Shopping *list*

Things to buy **today**:

- milk & eggs
- \`bread\`

1. go to the shop
2. pay

\`\`\`python
if total < 10:
    print("cheap")
\`\`\`
See [the map](https://example.com/map?a=1&b=2).
--- hint
Change the \`for\` loop into \`i = 0\` / \`while i < len(lines):\` with \`i += 1\` at the end of the body, so a branch can move \`i\` further.
--- hint
Match the opening fence with \`r"^\`\`\`\\s*([\\w+-]*)\\s*$"\` on the stripped line; group 1 is the language (possibly empty). Flush, then collect escaped raw lines until a line strips to three backticks.
--- hint
For the entry point you need \`import sys\`, then \`print(convert(sys.stdin.read()))\` under the \`__name__\` guard.
--- check output | Converts a whole document from standard input
<h1>Shopping <em>list</em></h1>
<p>Things to buy <strong>today</strong>:</p>
<ul>
<li>milk &amp; eggs</li>
<li><code>bread</code></li>
</ul>
<ol>
<li>go to the shop</li>
<li>pay</li>
</ol>
<pre><code class="language-python">if total &lt; 10:
    print(&quot;cheap&quot;)</code></pre>
<p>See <a href="https://example.com/map?a=1&amp;b=2">the map</a>.</p>
--- check case | Code keeps indentation and is not formatted
convert("\`\`\`\\n  # not a heading\\n  - *raw*\\n\`\`\`")
=> "<pre><code>  # not a heading\\n  - *raw*</code></pre>"
--- check case | A code block closes an open paragraph
convert("text\\n\`\`\`js\\nlet a = 1;\\n\`\`\`\\nafter")
=> '<p>text</p>\\n<pre><code class="language-js">let a = 1;</code></pre>\\n<p>after</p>'
--- check case | An unclosed fence runs to the end
convert("\`\`\`\\na\\n\\nb")
=> "<pre><code>a\\n\\nb</code></pre>"
--- check case | An empty code block
convert("\`\`\`\\n\`\`\`")
=> "<pre><code></code></pre>"

=== pyp-09 | Library system 1: the data model
--- teach
The third project is a lending library: books, members, loans, rules, and saving everything to disk. It is the kind of program most business software is: a **domain model** with rules, plus persistence.

**Model the nouns.** Read a description of the problem and underline the nouns: *books*, *members*, *loans*, *the library*. Each is a candidate class. Then ask what identifies each one: a book by its **ISBN**, a member by a **member id**. Identifiers are what you use as dict keys and what you store in other records to point at things.

\`\`\`python
@dataclass
class Book:
    isbn: str
    title: str
    author: str
    copies: int = 1
\`\`\`

**One object owns the collections.** \`Library\` holds dicts of books and members keyed by their ids, and every change goes through its methods. That is where rules live: "a member id cannot be used twice", "adding a book that already exists adds copies".

**A custom exception for the domain.** Callers need to tell "the library refused this" apart from a bug. A \`LibraryError\` class does that: the interface can catch \`LibraryError\` and show its message, while a real \`TypeError\` still stops the program.

**Protect your internals from aliasing.** If \`add_book\` stores the caller's \`Book\` object and later changes its \`copies\`, the caller's object changes too, which is the aliasing bug from the advanced course. \`dataclasses.replace(book)\` makes a copy (optionally with some fields changed), so the library owns its own record:

\`\`\`python
from dataclasses import replace
stored = replace(book)          # a new Book with the same fields
\`\`\`

**Lookups that fail loudly.** \`book(isbn)\` returns the record or raises \`LibraryError("no such book: ...")\`. Every later method can then call it and trust the result, instead of repeating \`if isbn not in self.books\` everywhere.

**Common mistake:** keying things by name. Two members can be called Sam, and titles change; ids do not.
--- task
Write:

- \`class LibraryError(Exception)\`.
- Dataclasses \`Book(isbn, title, author, copies=1)\` and \`Member(member_id, name)\`.
- \`Library\` with \`books\` and \`members\` dicts, and:
  - \`add_book(book)\`: if the ISBN is new, store a **copy** of the book; if it exists, add \`book.copies\` to the stored copies. A book with fewer than 1 copy raises \`LibraryError\`. Returns the stored book.
  - \`add_member(member)\`: a duplicate member id raises \`LibraryError\`.
  - \`book(isbn)\` and \`member(member_id)\`: return the record, or raise \`LibraryError\` (\`"no such book: <isbn>"\`, \`"no such member: <id>"\`).
  - \`find_by_author(text)\`: titles of books whose author contains \`text\`, ignoring case, sorted.
--- starter
# Library system, step 1: the data model.
from dataclasses import dataclass


class LibraryError(Exception):
    pass


class Library:
    def __init__(self):
        self.books = {}
        self.members = {}
--- solution
# Library system, step 1: the data model.
from dataclasses import dataclass, replace


class LibraryError(Exception):
    pass


@dataclass
class Book:
    isbn: str
    title: str
    author: str
    copies: int = 1


@dataclass
class Member:
    member_id: str
    name: str


class Library:
    def __init__(self):
        self.books = {}
        self.members = {}

    def add_book(self, book):
        if book.copies < 1:
            raise LibraryError("a book needs at least one copy")
        if book.isbn in self.books:
            self.books[book.isbn].copies += book.copies
        else:
            self.books[book.isbn] = replace(book)
        return self.books[book.isbn]

    def add_member(self, member):
        if member.member_id in self.members:
            raise LibraryError(f"member {member.member_id} already exists")
        self.members[member.member_id] = member

    def book(self, isbn):
        if isbn not in self.books:
            raise LibraryError(f"no such book: {isbn}")
        return self.books[isbn]

    def member(self, member_id):
        if member_id not in self.members:
            raise LibraryError(f"no such member: {member_id}")
        return self.members[member_id]

    def find_by_author(self, text):
        text = text.lower()
        return sorted(b.title for b in self.books.values() if text in b.author.lower())
--- hint
Two \`@dataclass\` classes with annotated fields; \`copies: int = 1\` goes last.
--- hint
In \`add_book\`, validate first, then either increase \`self.books[book.isbn].copies\` or store \`replace(book)\` (import \`replace\` from \`dataclasses\`).
--- hint
\`book(isbn)\` checks \`if isbn not in self.books:\` and raises \`LibraryError(f"no such book: {isbn}")\`. \`find_by_author\` lowercases both sides and sorts the matching titles.
--- check test | add_book stores books by ISBN
(lambda lib: (lib.add_book(Book("111", "Dune", "Frank Herbert")), lib.book("111").title)[1] == "Dune" and lib.book("111").copies == 1)(Library())
--- check case | Adding the same ISBN again adds copies
(lambda lib: (lib.add_book(Book("111", "Dune", "Frank Herbert", 2)), lib.add_book(Book("111", "Dune", "Frank Herbert", 3)), lib.book("111").copies)[-1])(Library())
=> 5
--- check test | The library keeps its own copy of the book
(lambda lib, b: (lib.add_book(b), lib.add_book(Book("1", "T", "A", 4)), b.copies)[-1] == 1)(Library(), Book("1", "T", "A"))
?? Store replace(book), not the caller's object.
--- check test | Zero copies is rejected
raises(LibraryError, lambda: Library().add_book(Book("1", "T", "A", 0)))
--- check test | Duplicate members are rejected
(lambda lib: (lib.add_member(Member("m1", "Ada")), raises(LibraryError, lambda: lib.add_member(Member("m1", "Sam"))))[1])(Library())
--- check test | Unknown ids raise LibraryError, which is an Exception
raises(LibraryError, lambda: Library().book("nope")) and raises(LibraryError, lambda: Library().member("nope")) and issubclass(LibraryError, Exception)
--- check case | find_by_author ignores case and sorts titles
(lambda lib: (lib.add_book(Book("1", "Emma", "Jane Austen")), lib.add_book(Book("2", "Dune", "Frank Herbert")), lib.add_book(Book("3", "Persuasion", "JANE AUSTEN")), lib.find_by_author("austen"))[-1])(Library())
=> ["Emma", "Persuasion"]

=== pyp-10 | Library system 2: loans and rules
--- teach
A library exists to lend books, and lending comes with **rules**: a member can borrow at most three books, cannot borrow the same book twice, and cannot borrow a book with no copies left. Rules like these are the heart of most real software, and they deserve care.

**A loan is a record too.** It links a member to a book, with a due date:

\`\`\`python
@dataclass
class Loan:
    member_id: str
    isbn: str
    due: date
\`\`\`

It stores **ids**, not the \`Member\` and \`Book\` objects themselves. Ids are stable, easy to save to a file (next lesson), and there is only one copy of each book's data to keep up to date.

**Derive, do not duplicate.** How many copies are available? You could store an \`available\` count on each book and remember to change it on every checkout and return. Or you could compute it: copies minus loans of that ISBN. The computed version can never disagree with the loans, because it *is* the loans. Keep a single source of truth wherever you can.

**Check every rule before changing anything.** \`checkout\` validates the member, the book, the duplicate, the limit and the availability, and only then appends the loan. If a check fails halfway after something was changed, the data is left half-updated.

**Time is an input.** A due date depends on today's date. Calling \`date.today()\` inside \`checkout\` would make it impossible to test ("does a loan made on 1 March fall due on 15 March?") except on 1 March. Pass \`today\` in, the dependency injection idea from the expert course:

\`\`\`python
from datetime import date, timedelta
date(2026, 3, 1) + timedelta(days=14)     # datetime.date(2026, 3, 15)
\`\`\`

**Named constants** (\`LOAN_DAYS = 14\`, \`MAX_LOANS = 3\`) at the top of the file say what the numbers mean and give each rule one place to change.

**Common mistake:** returning \`True\`/\`False\` from \`checkout\` to mean success or failure. The caller has to check it, and will forget. Raising a \`LibraryError\` with a message cannot be ignored silently, and says *why*.
--- task
Add loans:

- Constants \`LOAN_DAYS = 14\` and \`MAX_LOANS = 3\`, and a dataclass \`Loan(member_id, isbn, due)\`.
- \`Library.loans\`, a list, starting empty.
- \`available(isbn)\`: copies minus current loans of that book (unknown ISBN raises \`LibraryError\`).
- \`loans_of(member_id)\`: that member's loans (unknown member raises \`LibraryError\`).
- \`checkout(member_id, isbn, today)\`: checks, in this order, that the member and book exist, that the member does not already have this book, that they have fewer than \`MAX_LOANS\` loans, and that a copy is available, raising \`LibraryError\` otherwise. Then it records and returns a \`Loan\` due \`LOAN_DAYS\` after \`today\`.
- \`return_book(member_id, isbn)\`: removes and returns that loan, or raises \`LibraryError\` if there is no such loan.
--- starter
# Library system, step 1: the data model.
from dataclasses import dataclass, replace


class LibraryError(Exception):
    pass


@dataclass
class Book:
    isbn: str
    title: str
    author: str
    copies: int = 1


@dataclass
class Member:
    member_id: str
    name: str


class Library:
    def __init__(self):
        self.books = {}
        self.members = {}

    def add_book(self, book):
        if book.copies < 1:
            raise LibraryError("a book needs at least one copy")
        if book.isbn in self.books:
            self.books[book.isbn].copies += book.copies
        else:
            self.books[book.isbn] = replace(book)
        return self.books[book.isbn]

    def add_member(self, member):
        if member.member_id in self.members:
            raise LibraryError(f"member {member.member_id} already exists")
        self.members[member.member_id] = member

    def book(self, isbn):
        if isbn not in self.books:
            raise LibraryError(f"no such book: {isbn}")
        return self.books[isbn]

    def member(self, member_id):
        if member_id not in self.members:
            raise LibraryError(f"no such member: {member_id}")
        return self.members[member_id]

    def find_by_author(self, text):
        text = text.lower()
        return sorted(b.title for b in self.books.values() if text in b.author.lower())
--- solution
# Library system, step 2: loans and rules.
from dataclasses import dataclass, replace
from datetime import date, timedelta

LOAN_DAYS = 14
MAX_LOANS = 3


class LibraryError(Exception):
    pass


@dataclass
class Book:
    isbn: str
    title: str
    author: str
    copies: int = 1


@dataclass
class Member:
    member_id: str
    name: str


@dataclass
class Loan:
    member_id: str
    isbn: str
    due: date


class Library:
    def __init__(self):
        self.books = {}
        self.members = {}
        self.loans = []

    def add_book(self, book):
        if book.copies < 1:
            raise LibraryError("a book needs at least one copy")
        if book.isbn in self.books:
            self.books[book.isbn].copies += book.copies
        else:
            self.books[book.isbn] = replace(book)
        return self.books[book.isbn]

    def add_member(self, member):
        if member.member_id in self.members:
            raise LibraryError(f"member {member.member_id} already exists")
        self.members[member.member_id] = member

    def book(self, isbn):
        if isbn not in self.books:
            raise LibraryError(f"no such book: {isbn}")
        return self.books[isbn]

    def member(self, member_id):
        if member_id not in self.members:
            raise LibraryError(f"no such member: {member_id}")
        return self.members[member_id]

    def find_by_author(self, text):
        text = text.lower()
        return sorted(b.title for b in self.books.values() if text in b.author.lower())

    def available(self, isbn):
        book = self.book(isbn)
        return book.copies - sum(1 for loan in self.loans if loan.isbn == isbn)

    def loans_of(self, member_id):
        self.member(member_id)
        return [loan for loan in self.loans if loan.member_id == member_id]

    def checkout(self, member_id, isbn, today):
        current = self.loans_of(member_id)
        self.book(isbn)
        if any(loan.isbn == isbn for loan in current):
            raise LibraryError(f"{member_id} already has {isbn}")
        if len(current) >= MAX_LOANS:
            raise LibraryError("loan limit reached")
        if self.available(isbn) < 1:
            raise LibraryError(f"no copies of {isbn} available")
        loan = Loan(member_id, isbn, today + timedelta(days=LOAN_DAYS))
        self.loans.append(loan)
        return loan

    def return_book(self, member_id, isbn):
        for i, loan in enumerate(self.loans):
            if loan.member_id == member_id and loan.isbn == isbn:
                return self.loans.pop(i)
        raise LibraryError(f"{member_id} has not borrowed {isbn}")
--- hint
Import \`date\` and \`timedelta\` from \`datetime\`, add the \`Loan\` dataclass and \`self.loans = []\` in \`__init__\`.
--- hint
\`available\` is \`self.book(isbn).copies\` minus the number of loans with that ISBN. \`loans_of\` calls \`self.member(member_id)\` first so unknown members raise.
--- hint
In \`checkout\`, run every check first (reuse \`loans_of\`, \`book\` and \`available\`), then append \`Loan(member_id, isbn, today + timedelta(days=LOAN_DAYS))\`.
--- check case | A checkout is due 14 days later
(lambda lib: (lib.add_book(Book("1", "Dune", "Frank Herbert")), lib.add_member(Member("m1", "Ada")), lib.checkout("m1", "1", date(2026, 3, 1)))[-1])(Library())
=> Loan("m1", "1", date(2026, 3, 15))
--- check case | available counts loans
(lambda lib: (lib.add_book(Book("1", "Dune", "F", 2)), lib.add_member(Member("a", "Ada")), lib.add_member(Member("b", "Bo")), lib.available("1"), lib.checkout("a", "1", date(2026, 1, 1)), lib.available("1"), lib.checkout("b", "1", date(2026, 1, 1)), lib.available("1"))[3::2])(Library())
=> (2, 1, 0)
--- check test | No copies left
(lambda lib: (lib.add_book(Book("1", "Dune", "F")), lib.add_member(Member("a", "Ada")), lib.add_member(Member("b", "Bo")), lib.checkout("a", "1", date(2026, 1, 1)), raises(LibraryError, lambda: lib.checkout("b", "1", date(2026, 1, 1))))[-1])(Library())
--- check test | The same book twice is refused
(lambda lib: (lib.add_book(Book("1", "Dune", "F", 5)), lib.add_member(Member("a", "Ada")), lib.checkout("a", "1", date(2026, 1, 1)), raises(LibraryError, lambda: lib.checkout("a", "1", date(2026, 1, 1))))[-1])(Library())
--- check test | At most three loans each
(lambda lib: ([lib.add_book(Book(str(i), f"B{i}", "A")) for i in range(4)], lib.add_member(Member("a", "Ada")), [lib.checkout("a", str(i), date(2026, 1, 1)) for i in range(3)], raises(LibraryError, lambda: lib.checkout("a", "3", date(2026, 1, 1))), len(lib.loans_of("a")))[3:])(Library()) == (True, 3)
--- check test | Unknown member or book
(lambda lib: (lib.add_book(Book("1", "Dune", "F")), lib.add_member(Member("a", "Ada")), raises(LibraryError, lambda: lib.checkout("zz", "1", date(2026, 1, 1))), raises(LibraryError, lambda: lib.checkout("a", "9", date(2026, 1, 1))), lib.loans)[2:])(Library()) == (True, True, [])
--- check test | Returning frees the copy; returning twice is refused
(lambda lib: (lib.add_book(Book("1", "Dune", "F")), lib.add_member(Member("a", "Ada")), lib.checkout("a", "1", date(2026, 1, 1)), lib.return_book("a", "1").isbn, lib.available("1"), raises(LibraryError, lambda: lib.return_book("a", "1")))[3:])(Library()) == ("1", 1, True)

=== pyp-11 | Library system 3: saving and loading with JSON
--- teach
A library that forgets everything when the program stops is not much use. The data needs to be **persisted**: written somewhere and read back later. JSON is the most common format for that: text, human-readable, and understood by every language.

\`\`\`python
import json
text = json.dumps({"name": "Ada", "tags": ["x", "y"], "active": True})
text                   # '{"name": "Ada", "tags": ["x", "y"], "active": true}'
json.loads(text)       # back to a dict
\`\`\`

JSON only knows **dicts (with string keys), lists, strings, numbers, booleans and null**. Anything else must be converted on the way out and rebuilt on the way in:

| Python | Out (to JSON) | In (from JSON) |
|---|---|---|
| dataclass | \`dataclasses.asdict(obj)\` | \`Book(**d)\` |
| \`date\` | \`d.isoformat()\` → \`"2026-03-15"\` | \`date.fromisoformat(s)\` |
| tuple, set | a list | rebuild if you need the type |

**Design the file format deliberately.** Write down its shape, because other programs (and future versions of yours) will depend on it. Here, a dict of three lists: \`books\`, \`members\`, \`loans\`.

**Make output stable.** \`json.dumps(data, indent=2, sort_keys=True)\` produces the same text for the same data every time, which makes saved files readable and easy to compare.

**The round trip is the test.** The essential property of save and load is that loading what you saved gives back the same library: \`Library.from_json(lib.to_json())\` must behave exactly like \`lib\`.

**Loading is a trust boundary.** A save file can be truncated, hand-edited or from an older version. \`json.loads\` raises \`json.JSONDecodeError\` (a \`ValueError\`) on broken text; a missing key raises \`KeyError\`; a wrong field raises \`TypeError\` when you build the dataclass. Catch those and raise one clear \`LibraryError("corrupt save file: ...")\`, so the caller has one thing to handle. Writing \`raise LibraryError(...) from err\` keeps the original error attached as the cause, so a traceback still shows what really went wrong.

**\`@classmethod\`** is the natural shape for "build a new object from something": \`Library.from_json(text)\` receives the class as \`cls\` and returns \`cls()\` filled in. It is an **alternative constructor**, like \`date.fromisoformat\`.

**Common mistake:** loading by assigning the parsed dicts straight into \`self.books\`. Everything "works" until some code calls \`book.title\` on what is actually a dict. Rebuild real objects on load.
--- task
Add persistence to \`Library\`:

- \`to_json()\` returns \`json.dumps(data, indent=2, sort_keys=True)\` where \`data\` is \`{"books": [...], "members": [...], "loans": [...]}\`: books and members as dicts of their fields (in the order they were added), and each loan as \`{"member_id": ..., "isbn": ..., "due": "YYYY-MM-DD"}\`.
- The class method \`Library.from_json(text)\` rebuilds a \`Library\` with real \`Book\`, \`Member\` and \`Loan\` objects (with \`date\` due dates). Broken JSON, missing keys or bad fields raise \`LibraryError\`.
--- starter
# Library system, step 2: loans and rules.
from dataclasses import dataclass, replace
from datetime import date, timedelta

LOAN_DAYS = 14
MAX_LOANS = 3


class LibraryError(Exception):
    pass


@dataclass
class Book:
    isbn: str
    title: str
    author: str
    copies: int = 1


@dataclass
class Member:
    member_id: str
    name: str


@dataclass
class Loan:
    member_id: str
    isbn: str
    due: date


class Library:
    def __init__(self):
        self.books = {}
        self.members = {}
        self.loans = []

    def add_book(self, book):
        if book.copies < 1:
            raise LibraryError("a book needs at least one copy")
        if book.isbn in self.books:
            self.books[book.isbn].copies += book.copies
        else:
            self.books[book.isbn] = replace(book)
        return self.books[book.isbn]

    def add_member(self, member):
        if member.member_id in self.members:
            raise LibraryError(f"member {member.member_id} already exists")
        self.members[member.member_id] = member

    def book(self, isbn):
        if isbn not in self.books:
            raise LibraryError(f"no such book: {isbn}")
        return self.books[isbn]

    def member(self, member_id):
        if member_id not in self.members:
            raise LibraryError(f"no such member: {member_id}")
        return self.members[member_id]

    def find_by_author(self, text):
        text = text.lower()
        return sorted(b.title for b in self.books.values() if text in b.author.lower())

    def available(self, isbn):
        book = self.book(isbn)
        return book.copies - sum(1 for loan in self.loans if loan.isbn == isbn)

    def loans_of(self, member_id):
        self.member(member_id)
        return [loan for loan in self.loans if loan.member_id == member_id]

    def checkout(self, member_id, isbn, today):
        current = self.loans_of(member_id)
        self.book(isbn)
        if any(loan.isbn == isbn for loan in current):
            raise LibraryError(f"{member_id} already has {isbn}")
        if len(current) >= MAX_LOANS:
            raise LibraryError("loan limit reached")
        if self.available(isbn) < 1:
            raise LibraryError(f"no copies of {isbn} available")
        loan = Loan(member_id, isbn, today + timedelta(days=LOAN_DAYS))
        self.loans.append(loan)
        return loan

    def return_book(self, member_id, isbn):
        for i, loan in enumerate(self.loans):
            if loan.member_id == member_id and loan.isbn == isbn:
                return self.loans.pop(i)
        raise LibraryError(f"{member_id} has not borrowed {isbn}")
--- solution
# Library system, step 3: saving and loading.
import json
from dataclasses import asdict, dataclass, replace
from datetime import date, timedelta

LOAN_DAYS = 14
MAX_LOANS = 3


class LibraryError(Exception):
    pass


@dataclass
class Book:
    isbn: str
    title: str
    author: str
    copies: int = 1


@dataclass
class Member:
    member_id: str
    name: str


@dataclass
class Loan:
    member_id: str
    isbn: str
    due: date


class Library:
    def __init__(self):
        self.books = {}
        self.members = {}
        self.loans = []

    def add_book(self, book):
        if book.copies < 1:
            raise LibraryError("a book needs at least one copy")
        if book.isbn in self.books:
            self.books[book.isbn].copies += book.copies
        else:
            self.books[book.isbn] = replace(book)
        return self.books[book.isbn]

    def add_member(self, member):
        if member.member_id in self.members:
            raise LibraryError(f"member {member.member_id} already exists")
        self.members[member.member_id] = member

    def book(self, isbn):
        if isbn not in self.books:
            raise LibraryError(f"no such book: {isbn}")
        return self.books[isbn]

    def member(self, member_id):
        if member_id not in self.members:
            raise LibraryError(f"no such member: {member_id}")
        return self.members[member_id]

    def find_by_author(self, text):
        text = text.lower()
        return sorted(b.title for b in self.books.values() if text in b.author.lower())

    def available(self, isbn):
        book = self.book(isbn)
        return book.copies - sum(1 for loan in self.loans if loan.isbn == isbn)

    def loans_of(self, member_id):
        self.member(member_id)
        return [loan for loan in self.loans if loan.member_id == member_id]

    def checkout(self, member_id, isbn, today):
        current = self.loans_of(member_id)
        self.book(isbn)
        if any(loan.isbn == isbn for loan in current):
            raise LibraryError(f"{member_id} already has {isbn}")
        if len(current) >= MAX_LOANS:
            raise LibraryError("loan limit reached")
        if self.available(isbn) < 1:
            raise LibraryError(f"no copies of {isbn} available")
        loan = Loan(member_id, isbn, today + timedelta(days=LOAN_DAYS))
        self.loans.append(loan)
        return loan

    def return_book(self, member_id, isbn):
        for i, loan in enumerate(self.loans):
            if loan.member_id == member_id and loan.isbn == isbn:
                return self.loans.pop(i)
        raise LibraryError(f"{member_id} has not borrowed {isbn}")

    def to_json(self):
        data = {
            "books": [asdict(b) for b in self.books.values()],
            "members": [asdict(m) for m in self.members.values()],
            "loans": [{"member_id": l.member_id, "isbn": l.isbn, "due": l.due.isoformat()} for l in self.loans],
        }
        return json.dumps(data, indent=2, sort_keys=True)

    @classmethod
    def from_json(cls, text):
        try:
            data = json.loads(text)
            library = cls()
            for b in data["books"]:
                library.add_book(Book(**b))
            for m in data["members"]:
                library.add_member(Member(**m))
            for l in data["loans"]:
                library.loans.append(Loan(l["member_id"], l["isbn"], date.fromisoformat(l["due"])))
        except (ValueError, KeyError, TypeError) as err:
            raise LibraryError(f"corrupt save file: {err}") from err
        return library
--- hint
\`from dataclasses import asdict\` turns a Book or Member into a dict. For loans, build the dict yourself so the date becomes \`loan.due.isoformat()\`.
--- hint
\`from_json\` is a \`@classmethod\`: \`library = cls()\`, then add each book and member with \`Book(**d)\` / \`Member(**d)\`, and append a \`Loan\` for each loan with \`date.fromisoformat(d["due"])\`.
--- hint
Wrap the whole of loading in \`try:\` and turn \`ValueError\`, \`KeyError\` and \`TypeError\` into \`raise LibraryError(...) from err\`.
--- check case | to_json writes the agreed format
(lambda lib: (lib.add_book(Book("1", "Dune", "Frank Herbert", 2)), lib.add_member(Member("m1", "Ada")), lib.checkout("m1", "1", date(2026, 3, 1)), __import__("json").loads(lib.to_json()))[-1])(Library())
=> {"books": [{"isbn": "1", "title": "Dune", "author": "Frank Herbert", "copies": 2}], "members": [{"member_id": "m1", "name": "Ada"}], "loans": [{"member_id": "m1", "isbn": "1", "due": "2026-03-15"}]}
--- check test | to_json is stable: sorted keys and indented
(lambda lib: (lib.add_member(Member("m1", "Ada")), lib.to_json())[1] == '{\\n  "books": [],\\n  "loans": [],\\n  "members": [\\n    {\\n      "member_id": "m1",\\n      "name": "Ada"\\n    }\\n  ]\\n}')(Library())
--- check test | A round trip gives back real objects
(lambda lib: (lib.add_book(Book("1", "Dune", "F", 2)), lib.add_member(Member("m1", "Ada")), lib.checkout("m1", "1", date(2026, 3, 1)), (lambda new: new.book("1") == Book("1", "Dune", "F", 2) and new.member("m1") == Member("m1", "Ada") and new.loans == [Loan("m1", "1", date(2026, 3, 15))] and new.available("1") == 1)(Library.from_json(lib.to_json())))[-1])(Library())
--- check test | Saving what you loaded gives the same text
(lambda lib: (lib.add_book(Book("9", "Emma", "Austen")), lib.add_member(Member("x", "Xi")), lib.checkout("x", "9", date(2026, 12, 25)), Library.from_json(lib.to_json()).to_json() == lib.to_json())[-1])(Library())
--- check test | from_json is a class method
isinstance(Library.__dict__["from_json"], classmethod)
--- check test | Corrupt files raise LibraryError
all(raises(LibraryError, lambda t=t: Library.from_json(t)) for t in ["not json", "{}", '{"books": [{"isbn": "1"}], "members": [], "loans": []}', '{"books": [], "members": [], "loans": [{"member_id": "a", "isbn": "1", "due": "someday"}]}'])

=== pyp-12 | Library system 4: overdue loans and fines
--- teach
The last feature is the one that makes a library's day-to-day work possible: knowing what is overdue, what each member owes, and what is due back soon.

**Date arithmetic.** Subtracting two dates gives a \`timedelta\`, whose \`.days\` is a whole number that can be negative:

\`\`\`python
from datetime import date
(date(2026, 3, 20) - date(2026, 3, 15)).days     # 5   five days late
(date(2026, 3, 10) - date(2026, 3, 15)).days     # -5  not due yet
\`\`\`

A loan returned *on* its due date is not late: only positive differences count. \`max(0, days)\` expresses "late days, never negative" in one step.

**One helper, used everywhere.** "How many days late is this loan?" is needed by the overdue list and by the fine. Write it once as \`days_late(loan, today)\`, and both features are guaranteed to agree. Two slightly different copies of the same calculation is how off-by-one disagreements happen.

**Reports are sorted on purpose.** The overdue list is most useful with the worst cases first, then by name and title, so that the same data always gives the same order.

**Money in cents, again.** The fine is 20 cents per day per late book, an integer. Formatting is the interface's business.

**\`today\` stays an argument.** Every one of these methods depends on the date, and every one takes \`today\`. That is why testing them is easy: you can check "three days after the due date, the fine is 60" without waiting three days.

With this lesson the library system is complete: a model with rules, persistence with a stable file format and validation, and time-based reports, all tested without touching a real disk or a real clock.
--- task
Add \`FINE_PER_DAY = 20\` (cents) and these \`Library\` methods:

- \`days_late(loan, today)\`: how many days after its due date \`today\` is, never negative.
- \`overdue(today)\`: a list of \`(member name, book title, days late)\` for every loan that is late, most days late first, then by name, then by title.
- \`fine(member_id, today)\`: the member's total fine in cents, \`FINE_PER_DAY\` for each day each of their loans is late.
- \`due_soon(today, within=3)\`: titles of books on loan that are due between \`today\` and \`within\` days after it (inclusive), soonest first, then by title.
--- starter
# Library system, step 3: saving and loading.
import json
from dataclasses import asdict, dataclass, replace
from datetime import date, timedelta

LOAN_DAYS = 14
MAX_LOANS = 3


class LibraryError(Exception):
    pass


@dataclass
class Book:
    isbn: str
    title: str
    author: str
    copies: int = 1


@dataclass
class Member:
    member_id: str
    name: str


@dataclass
class Loan:
    member_id: str
    isbn: str
    due: date


class Library:
    def __init__(self):
        self.books = {}
        self.members = {}
        self.loans = []

    def add_book(self, book):
        if book.copies < 1:
            raise LibraryError("a book needs at least one copy")
        if book.isbn in self.books:
            self.books[book.isbn].copies += book.copies
        else:
            self.books[book.isbn] = replace(book)
        return self.books[book.isbn]

    def add_member(self, member):
        if member.member_id in self.members:
            raise LibraryError(f"member {member.member_id} already exists")
        self.members[member.member_id] = member

    def book(self, isbn):
        if isbn not in self.books:
            raise LibraryError(f"no such book: {isbn}")
        return self.books[isbn]

    def member(self, member_id):
        if member_id not in self.members:
            raise LibraryError(f"no such member: {member_id}")
        return self.members[member_id]

    def find_by_author(self, text):
        text = text.lower()
        return sorted(b.title for b in self.books.values() if text in b.author.lower())

    def available(self, isbn):
        book = self.book(isbn)
        return book.copies - sum(1 for loan in self.loans if loan.isbn == isbn)

    def loans_of(self, member_id):
        self.member(member_id)
        return [loan for loan in self.loans if loan.member_id == member_id]

    def checkout(self, member_id, isbn, today):
        current = self.loans_of(member_id)
        self.book(isbn)
        if any(loan.isbn == isbn for loan in current):
            raise LibraryError(f"{member_id} already has {isbn}")
        if len(current) >= MAX_LOANS:
            raise LibraryError("loan limit reached")
        if self.available(isbn) < 1:
            raise LibraryError(f"no copies of {isbn} available")
        loan = Loan(member_id, isbn, today + timedelta(days=LOAN_DAYS))
        self.loans.append(loan)
        return loan

    def return_book(self, member_id, isbn):
        for i, loan in enumerate(self.loans):
            if loan.member_id == member_id and loan.isbn == isbn:
                return self.loans.pop(i)
        raise LibraryError(f"{member_id} has not borrowed {isbn}")

    def to_json(self):
        data = {
            "books": [asdict(b) for b in self.books.values()],
            "members": [asdict(m) for m in self.members.values()],
            "loans": [{"member_id": l.member_id, "isbn": l.isbn, "due": l.due.isoformat()} for l in self.loans],
        }
        return json.dumps(data, indent=2, sort_keys=True)

    @classmethod
    def from_json(cls, text):
        try:
            data = json.loads(text)
            library = cls()
            for b in data["books"]:
                library.add_book(Book(**b))
            for m in data["members"]:
                library.add_member(Member(**m))
            for l in data["loans"]:
                library.loans.append(Loan(l["member_id"], l["isbn"], date.fromisoformat(l["due"])))
        except (ValueError, KeyError, TypeError) as err:
            raise LibraryError(f"corrupt save file: {err}") from err
        return library
--- solution
# Library system, step 4: overdue loans and fines.
import json
from dataclasses import asdict, dataclass, replace
from datetime import date, timedelta

LOAN_DAYS = 14
MAX_LOANS = 3
FINE_PER_DAY = 20  # cents


class LibraryError(Exception):
    pass


@dataclass
class Book:
    isbn: str
    title: str
    author: str
    copies: int = 1


@dataclass
class Member:
    member_id: str
    name: str


@dataclass
class Loan:
    member_id: str
    isbn: str
    due: date


class Library:
    def __init__(self):
        self.books = {}
        self.members = {}
        self.loans = []

    def add_book(self, book):
        if book.copies < 1:
            raise LibraryError("a book needs at least one copy")
        if book.isbn in self.books:
            self.books[book.isbn].copies += book.copies
        else:
            self.books[book.isbn] = replace(book)
        return self.books[book.isbn]

    def add_member(self, member):
        if member.member_id in self.members:
            raise LibraryError(f"member {member.member_id} already exists")
        self.members[member.member_id] = member

    def book(self, isbn):
        if isbn not in self.books:
            raise LibraryError(f"no such book: {isbn}")
        return self.books[isbn]

    def member(self, member_id):
        if member_id not in self.members:
            raise LibraryError(f"no such member: {member_id}")
        return self.members[member_id]

    def find_by_author(self, text):
        text = text.lower()
        return sorted(b.title for b in self.books.values() if text in b.author.lower())

    def available(self, isbn):
        book = self.book(isbn)
        return book.copies - sum(1 for loan in self.loans if loan.isbn == isbn)

    def loans_of(self, member_id):
        self.member(member_id)
        return [loan for loan in self.loans if loan.member_id == member_id]

    def checkout(self, member_id, isbn, today):
        current = self.loans_of(member_id)
        self.book(isbn)
        if any(loan.isbn == isbn for loan in current):
            raise LibraryError(f"{member_id} already has {isbn}")
        if len(current) >= MAX_LOANS:
            raise LibraryError("loan limit reached")
        if self.available(isbn) < 1:
            raise LibraryError(f"no copies of {isbn} available")
        loan = Loan(member_id, isbn, today + timedelta(days=LOAN_DAYS))
        self.loans.append(loan)
        return loan

    def return_book(self, member_id, isbn):
        for i, loan in enumerate(self.loans):
            if loan.member_id == member_id and loan.isbn == isbn:
                return self.loans.pop(i)
        raise LibraryError(f"{member_id} has not borrowed {isbn}")

    def to_json(self):
        data = {
            "books": [asdict(b) for b in self.books.values()],
            "members": [asdict(m) for m in self.members.values()],
            "loans": [{"member_id": l.member_id, "isbn": l.isbn, "due": l.due.isoformat()} for l in self.loans],
        }
        return json.dumps(data, indent=2, sort_keys=True)

    @classmethod
    def from_json(cls, text):
        try:
            data = json.loads(text)
            library = cls()
            for b in data["books"]:
                library.add_book(Book(**b))
            for m in data["members"]:
                library.add_member(Member(**m))
            for l in data["loans"]:
                library.loans.append(Loan(l["member_id"], l["isbn"], date.fromisoformat(l["due"])))
        except (ValueError, KeyError, TypeError) as err:
            raise LibraryError(f"corrupt save file: {err}") from err
        return library

    def days_late(self, loan, today):
        return max(0, (today - loan.due).days)

    def overdue(self, today):
        rows = [
            (self.members[l.member_id].name, self.books[l.isbn].title, self.days_late(l, today))
            for l in self.loans
            if self.days_late(l, today) > 0
        ]
        return sorted(rows, key=lambda r: (-r[2], r[0], r[1]))

    def fine(self, member_id, today):
        return sum(self.days_late(l, today) * FINE_PER_DAY for l in self.loans_of(member_id))

    def due_soon(self, today, within=3):
        soon = [l for l in self.loans if 0 <= (l.due - today).days <= within]
        return [self.books[l.isbn].title for l in sorted(soon, key=lambda l: (l.due, self.books[l.isbn].title))]
--- hint
\`days_late\` is \`max(0, (today - loan.due).days)\`.
--- hint
\`overdue\` builds tuples for loans where \`days_late(...) > 0\`, looking up names and titles with \`self.members[...]\` and \`self.books[...]\`, then sorts with \`key=lambda r: (-r[2], r[0], r[1])\`.
--- hint
For \`due_soon\`, keep loans where \`0 <= (loan.due - today).days <= within\`, sort them by \`(loan.due, title)\`, and return the titles.
--- check test | days_late is never negative
(lambda lib: (lib.add_book(Book("1", "Dune", "F")), lib.add_member(Member("a", "Ada")), lib.checkout("a", "1", date(2026, 3, 1)), [lib.days_late(lib.loans[0], date(2026, 3, d)) for d in (10, 15, 16, 20)])[-1] == [0, 0, 1, 5])(Library())
--- check case | overdue lists the worst first
(lambda lib: ([lib.add_book(Book(i, t, "A")) for i, t in (("1", "Dune"), ("2", "Emma"), ("3", "Ulysses"))], lib.add_member(Member("a", "Ada")), lib.add_member(Member("b", "Bo")), lib.checkout("a", "1", date(2026, 3, 1)), lib.checkout("b", "2", date(2026, 3, 5)), lib.checkout("b", "3", date(2026, 3, 1)), lib.overdue(date(2026, 3, 20)))[-1])(Library())
=> [("Ada", "Dune", 5), ("Bo", "Ulysses", 5), ("Bo", "Emma", 1)]
--- check case | Nothing overdue
(lambda lib: (lib.add_book(Book("1", "Dune", "F")), lib.add_member(Member("a", "Ada")), lib.checkout("a", "1", date(2026, 3, 1)), lib.overdue(date(2026, 3, 15)))[-1])(Library())
=> []
--- check case | fine adds up every late day of every book
(lambda lib: ([lib.add_book(Book(i, i, "A")) for i in "123"], lib.add_member(Member("a", "Ada")), lib.checkout("a", "1", date(2026, 3, 1)), lib.checkout("a", "2", date(2026, 3, 4)), lib.checkout("a", "3", date(2026, 3, 30)), lib.fine("a", date(2026, 3, 20)))[-1])(Library())
=> 140
--- check test | fine for an unknown member raises LibraryError
raises(LibraryError, lambda: Library().fine("zz", date(2026, 1, 1)))
--- check case | due_soon, soonest first, inclusive
(lambda lib: ([lib.add_book(Book(i, t, "A")) for i, t in (("1", "Dune"), ("2", "Emma"), ("3", "Ulysses"), ("4", "Beloved"))], lib.add_member(Member("a", "Ada")), lib.add_member(Member("b", "Bo")), lib.checkout("a", "1", date(2026, 3, 3)), lib.checkout("a", "2", date(2026, 3, 1)), lib.checkout("b", "3", date(2026, 3, 10)), lib.checkout("b", "4", date(2026, 3, 1)), lib.due_soon(date(2026, 3, 14)))[-1])(Library())
=> ["Beloved", "Emma", "Dune"]

=== pyp-13 | Capstone: a to-do manager with undo
--- teach
From here on, you get a specification and an empty file. There are no step-by-step instructions, and the checks test only behaviour, so the design is yours. This is where you prove you can build things on your own.

**How to approach a specification:**

1. **Read it twice**, then write down every behaviour as a one-line example: \`add("x") returns 1\`, \`undo() with nothing to undo returns False\`.
2. **Choose the data model first.** What do you store, and in what shape? Most of the difficulty of a program is decided here.
3. **Build a skeleton**: the class and every method, each doing nothing yet. Then make one behaviour work at a time, trying it as you go.
4. **Hunt for edge cases**: empty input, unknown ids, doing something twice, undoing when there is nothing to undo.
5. **Refactor** once it works: name things well, remove repetition.

**Thinking about undo.** There are two classic designs:

- **Snapshots**: before every change, save a copy of the whole state; undo restores the last copy. Simple and hard to get wrong. Costs memory, which does not matter for a to-do list. The copy must be *deep*, or the "saved" state changes along with the live one.
- **Commands**: record each change as an object that knows how to reverse itself (\`add\` is undone by removing, \`remove\` by restoring the item). Cheaper, and more code.

Either is a good answer; choose one deliberately. Note what should *not* be undone: here, ids are never reused, even after undoing an \`add\`.
--- task
Build a class \`TodoList\`:

- \`add(title, priority="normal", tags=())\` adds an item and returns its id: 1, 2, 3, … Ids are never reused, even after \`remove\` or \`undo\`. The title is stripped; an empty title raises \`ValueError\`. \`priority\` must be \`"low"\`, \`"normal"\` or \`"high"\`, otherwise \`ValueError\`.
- \`done(item_id)\` marks an item done; \`remove(item_id)\` deletes it. An unknown id raises \`KeyError\`.
- \`pending(tag=None)\` returns the titles of items not done, \`high\` first, then \`normal\`, then \`low\`, and oldest first within the same priority. With a tag, only items that have that tag.
- \`search(text)\` returns the ids (ascending) of all items, done or not, whose title contains \`text\`, ignoring case.
- \`undo()\` reverses the most recent \`add\`, \`done\` or \`remove\` that has not been undone yet, and returns \`True\`; with nothing left to undo, it returns \`False\`. Failed operations (those that raised) are not undoable.
- \`summary()\` returns \`"<n> pending, <m> done"\`.
--- starter
# Capstone: design and build TodoList to the specification in the task.
--- solution
import copy

PRIORITIES = {"high": 0, "normal": 1, "low": 2}


class TodoList:
    def __init__(self):
        self._items = {}
        self._next_id = 1
        self._history = []

    def _snapshot(self):
        self._history.append(copy.deepcopy(self._items))

    def _get(self, item_id):
        if item_id not in self._items:
            raise KeyError(item_id)
        return self._items[item_id]

    def add(self, title, priority="normal", tags=()):
        title = title.strip()
        if not title:
            raise ValueError("title must not be empty")
        if priority not in PRIORITIES:
            raise ValueError(f"unknown priority: {priority}")
        self._snapshot()
        item_id = self._next_id
        self._next_id += 1
        self._items[item_id] = {"title": title, "priority": priority, "tags": set(tags), "done": False}
        return item_id

    def done(self, item_id):
        self._get(item_id)
        self._snapshot()
        self._items[item_id]["done"] = True

    def remove(self, item_id):
        self._get(item_id)
        self._snapshot()
        del self._items[item_id]

    def undo(self):
        if not self._history:
            return False
        self._items = self._history.pop()
        return True

    def pending(self, tag=None):
        rows = [
            (PRIORITIES[item["priority"]], item_id, item["title"])
            for item_id, item in self._items.items()
            if not item["done"] and (tag is None or tag in item["tags"])
        ]
        return [title for _, _, title in sorted(rows)]

    def search(self, text):
        text = text.lower()
        return sorted(item_id for item_id, item in self._items.items() if text in item["title"].lower())

    def summary(self):
        done = sum(1 for item in self._items.values() if item["done"])
        return f"{len(self._items) - done} pending, {done} done"
--- hint
Decide your data model first. One option: a dict from id to a small record (title, priority, tags, done), plus a counter for the next id.
--- hint
For undo, the simplest correct design is to push a deep copy of your items onto a history list before every successful change, and pop it back on \`undo()\`. Keep the id counter out of the snapshot so ids are never reused.
--- hint
For \`pending\`, sort by a tuple: a priority rank (high 0, normal 1, low 2), then the id.
--- check case | Ids count up from 1
(lambda t: [t.add("a"), t.add("b"), t.add("c")])(TodoList())
=> [1, 2, 3]
--- check case | pending orders by priority, then age
(lambda t: (t.add("water plants", "low"), t.add("pay rent", "high"), t.add("email Sam"), t.add("fix bike", "high"), t.pending())[-1])(TodoList())
=> ["pay rent", "fix bike", "email Sam", "water plants"]
--- check case | done items leave the pending list; titles are stripped
(lambda t: (t.add("  a  "), t.add("b"), t.done(1), t.pending(), t.summary())[-2:])(TodoList())
=> (["b"], "1 pending, 1 done")
--- check case | pending by tag
(lambda t: (t.add("a", tags=["home"]), t.add("b", tags=["work"]), t.add("c", "high", tags=("home", "urgent")), t.pending("home"))[-1])(TodoList())
=> ["c", "a"]
--- check test | Bad input raises ValueError
raises(ValueError, lambda: TodoList().add("   ")) and raises(ValueError, lambda: TodoList().add("x", "urgent"))
--- check test | Unknown ids raise KeyError
raises(KeyError, lambda: TodoList().done(1)) and raises(KeyError, lambda: TodoList().remove(7))
--- check case | search ignores case and includes done items
(lambda t: (t.add("Buy milk"), t.add("call mum"), t.add("MILK the cow"), t.done(3), t.search("milk"))[-1])(TodoList())
=> [1, 3]
--- check case | undo reverses done, remove and add, newest first
(lambda t: (t.add("a"), t.add("b"), t.done(1), t.remove(2), t.undo(), t.pending(), t.undo(), t.pending(), t.undo(), t.pending())[4:])(TodoList())
=> (True, ["b"], True, ["a", "b"], True, ["a"])
--- check test | Nothing to undo returns False
(lambda t: (t.undo(), t.add("x"), t.undo(), t.undo(), t.summary()))(TodoList()) == (False, 1, True, False, "0 pending, 0 done")
--- check test | Ids are never reused, even after undo
(lambda t: (t.add("a"), t.add("b"), t.undo(), t.add("c")))(TodoList())[-1] == 3
--- check test | A failed operation cannot be undone
(lambda t: (t.add("a"), raises(KeyError, lambda: t.done(5)), raises(ValueError, lambda: t.add("")), t.undo(), t.undo()))(TodoList())[3:] == (True, False)

=== pyp-14 | Capstone: a calculator language with variables
--- teach
In the expert course you wrote a tokenizer and a recursive-descent parser for arithmetic. This capstone turns that into a tiny **language**: it has variables, functions, its own power operator and error messages instead of crashes. It is designed by you from a specification, like a real interpreter.

**Reuse the architecture, not just the code.** The same pipeline works: *tokenize → parse → evaluate*, with one grammar rule per precedence level. New features slot into it:

- **Names** are a new kind of token: a letter or underscore, then letters, digits or underscores. In \`atom\`, a name followed by \`(\` is a function call; otherwise it is a variable to look up.
- **Function calls** parse a comma-separated list of expressions between brackets.
- **Assignment** (\`let x = ...\`) is a *statement*, not part of the expression grammar. Recognise it first, then evaluate the right-hand side with the expression parser.
- **State** (the variables) lives in the interpreter object and survives between lines.

**Errors are part of the design.** An interactive calculator must answer every line. Use your own exception class inside the parser (so you can tell your deliberate errors from bugs), and convert it to an \`error: ...\` reply in one place, at the top.

**Specification details that are easy to miss:** \`^\` is right-associative; unary minus binds *less* tightly than \`^\` (so \`-2 ^ 2\` is \`-4\`); a failed \`let\` must not change the variable; results that are whole numbers print without \`.0\`.

Plan the grammar on paper before writing code. Getting the grammar right is most of the work.
--- task
Build a class \`Interpreter\` with a method \`execute(line)\` that returns a string.

- \`let NAME = EXPR\` evaluates \`EXPR\`, stores it in variable \`NAME\`, and returns \`"NAME = VALUE"\`. Otherwise, the line is an expression and the reply is its value.
- Expressions: numbers (\`3\`, \`2.5\`), variables, \`+ - * /\` with the usual precedence (left to right), \`^\` for power (right-associative, binding tighter than unary minus: \`-2 ^ 2\` is \`-4\`, \`2 ^ -1\` is \`0.5\`), unary minus, brackets, and the functions \`sqrt(x)\`, \`abs(x)\`, \`min(a, b, ...)\` and \`max(a, b, ...)\`.
- Values print as Python prints them, except that a float with a whole value prints without \`.0\`: \`7 / 2\` → \`"3.5"\`, \`6 / 2\` → \`"3"\`.
- Errors never raise: they return a string starting with \`"error: "\`. Exactly \`"error: unknown variable NAME"\` for an undefined variable and \`"error: division by zero"\` for dividing by zero. A failed \`let\` leaves the variable unchanged. Names are case-sensitive, and \`let\` cannot assign to a function name.
--- starter
# Capstone: design and build Interpreter to the specification in the task.
--- solution
import math
import re

TOKEN = re.compile(r"\\s*(?:(\\d+\\.\\d*|\\.\\d+|\\d+)|([A-Za-z_]\\w*)|(\\S))")
FUNCTIONS = {"sqrt": math.sqrt, "abs": abs, "min": min, "max": max}


class CalcError(Exception):
    pass


def tokenize(text):
    tokens = []
    pos = 0
    text = text.rstrip()
    while pos < len(text):
        m = TOKEN.match(text, pos)
        number, name, op = m.groups()
        if number:
            tokens.append(("num", float(number) if "." in number else int(number)))
        elif name:
            tokens.append(("name", name))
        elif op in "+-*/^(),":
            tokens.append(("op", op))
        else:
            raise CalcError(f"unexpected character {op!r}")
        pos = m.end()
    return tokens


class Parser:
    def __init__(self, tokens, variables):
        self.tokens = tokens
        self.pos = 0
        self.variables = variables

    def peek(self):
        return self.tokens[self.pos] if self.pos < len(self.tokens) else (None, None)

    def take(self):
        token = self.peek()
        self.pos += 1
        return token

    def expect(self, op):
        if self.take() != ("op", op):
            raise CalcError(f"expected {op}")

    def parse(self):
        value = self.expr()
        if self.pos != len(self.tokens):
            raise CalcError("syntax error")
        return value

    def expr(self):
        value = self.term()
        while self.peek() in (("op", "+"), ("op", "-")):
            op = self.take()[1]
            right = self.term()
            value = value + right if op == "+" else value - right
        return value

    def term(self):
        value = self.unary()
        while self.peek() in (("op", "*"), ("op", "/")):
            op = self.take()[1]
            right = self.unary()
            if op == "/":
                if right == 0:
                    raise CalcError("division by zero")
                value = value / right
            else:
                value = value * right
        return value

    def unary(self):
        if self.peek() == ("op", "-"):
            self.take()
            return -self.unary()
        return self.power()

    def power(self):
        base = self.atom()
        if self.peek() == ("op", "^"):
            self.take()
            return base ** self.unary()
        return base

    def atom(self):
        kind, value = self.take()
        if kind == "num":
            return value
        if kind == "name":
            if self.peek() == ("op", "("):
                return self.call(value)
            if value not in self.variables:
                raise CalcError(f"unknown variable {value}")
            return self.variables[value]
        if (kind, value) == ("op", "("):
            result = self.expr()
            self.expect(")")
            return result
        raise CalcError("syntax error")

    def call(self, name):
        if name not in FUNCTIONS:
            raise CalcError(f"unknown function {name}")
        self.expect("(")
        args = [self.expr()]
        while self.peek() == ("op", ","):
            self.take()
            args.append(self.expr())
        self.expect(")")
        if name in ("sqrt", "abs") and len(args) != 1:
            raise CalcError(f"{name} takes one argument")
        if name == "sqrt" and args[0] < 0:
            raise CalcError("square root of a negative number")
        return FUNCTIONS[name](*args)


def show(value):
    if isinstance(value, float) and value.is_integer():
        return str(int(value))
    return str(value)


class Interpreter:
    LET = re.compile(r"^let\\s+([A-Za-z_]\\w*)\\s*=(.*)$")

    def __init__(self):
        self.variables = {}

    def evaluate(self, text):
        tokens = tokenize(text)
        if not tokens:
            raise CalcError("empty expression")
        return Parser(tokens, self.variables).parse()

    def execute(self, line):
        line = line.strip()
        try:
            m = self.LET.match(line)
            if m:
                name = m.group(1)
                if name in FUNCTIONS or name == "let":
                    raise CalcError(f"cannot assign to {name}")
                value = self.evaluate(m.group(2))
                self.variables[name] = value
                return f"{name} = {show(value)}"
            return show(self.evaluate(line))
        except CalcError as err:
            return f"error: {err}"
        except (OverflowError, ValueError, TypeError) as err:
            return f"error: {err}"
--- hint
Start from the tokenizer and parser architecture of the expert course. Add a \`name\` token kind (a regular expression such as \`[A-Za-z_]\\w*\` helps) and a \`,\` token.
--- hint
Grammar, loosest first: expr (\`+ -\`), term (\`* /\`), unary (\`-\`), power (\`atom ^ unary\`), atom (number, name, call, or bracketed expr). Recognise \`let NAME =\` with a regular expression before parsing.
--- hint
Define your own exception class, raise it for every deliberate error (with the exact messages from the specification), and catch it once in \`execute\` to return \`f"error: {err}"\`.
--- check case | Arithmetic with precedence
(lambda i: [i.execute(l) for l in ["1 + 2 * 3", "(1 + 2) * 3", "10 - 4 - 3", "7 / 2", "6 / 2", "2.5 * 2"]])(Interpreter())
=> ["7", "9", "3", "3.5", "3", "5"]
--- check case | Power and unary minus
(lambda i: [i.execute(l) for l in ["2 ^ 3 ^ 2", "-2 ^ 2", "(-2) ^ 2", "2 ^ -1", "--4"]])(Interpreter())
=> ["512", "-4", "4", "0.5", "4"]
--- check case | Variables persist between lines
(lambda i: [i.execute(l) for l in ["let rate = 1.5", "let hours = 8", "rate * hours", "let hours = hours + 2", "rate * hours"]])(Interpreter())
=> ["rate = 1.5", "hours = 8", "12", "hours = 10", "15"]
--- check case | Functions
(lambda i: [i.execute(l) for l in ["sqrt(16)", "abs(-3.5)", "max(1, 7, 3)", "min(4, -2 * 3)", "max(sqrt(9), 2) + 1"]])(Interpreter())
=> ["4", "3.5", "7", "-6", "4"]
--- check test | Unknown variables and division by zero
(lambda i: i.execute("y + 1") == "error: unknown variable y" and i.execute("1 / (2 - 2)") == "error: division by zero")(Interpreter())
--- check test | Syntax errors reply with an error, never raise
(lambda i: all(i.execute(l).startswith("error: ") for l in ["", "1 +", "(1", "1)", "2 3", "* 4", "let = 3", "let 5 = 3", "max()", "sqrt(1, 2)", "3 $ 4", "let sqrt = 4"]))(Interpreter())
--- check test | A failed let does not change the variable
(lambda i: (i.execute("let x = 5"), i.execute("let x = 1 / 0"), i.execute("x"))[1:])(Interpreter()) == ("error: division by zero", "5")
--- check test | Names are case-sensitive and can contain digits and underscores
(lambda i: (i.execute("let total_2 = 3"), i.execute("total_2 * 2"), i.execute("Total_2"))[1:])(Interpreter()) == ("6", "error: unknown variable Total_2")

=== pyp-15 | Capstone: a bank ledger with validation
--- teach
Money software is unforgiving: a lost cent is a bug report, and a half-finished transfer is a disaster. This capstone is about **correctness under bad input**.

**Validate at the boundary.** Every value that comes from outside (a user, a file, another system) is checked the moment it arrives, and turned into a trusted internal form. Here, amounts arrive as strings like \`"12.34"\`; check the format strictly, convert to integer cents once, and the rest of the code never sees a string or a float again. Strict means: reject \`"12.345"\`, \`"-5"\`, \`"1e3"\`, \`" "\`, and also a float like \`12.5\`, because accepting floats would invite exactly the rounding errors you are avoiding.

**Atomic operations.** A transfer is two changes: take from one account, give to another. If the first happens and the second fails, money vanishes. The rule is: **check everything that can fail first, then make all the changes**, with nothing between them that can raise. A transfer to a missing account, or of more than the balance, must leave *both* accounts, and both statements, exactly as they were.

**An audit trail.** Real ledgers never just overwrite a balance; they record every movement. A statement per account (a list of lines, each with the movement and the resulting balance) lets anyone check the arithmetic.

**Distinct errors for distinct problems.** Bad input (\`ValueError\`), an unknown account (\`KeyError\`), and a refused withdrawal (\`InsufficientFunds\`, your own class) are different situations for the caller: a form shows a validation message, a missing account is probably a bug, and insufficient funds is a normal business outcome.

**Design questions to settle first:** how will you store an account? How will you generate account numbers? Where does validation live, so it is written once?
--- task
Build \`class InsufficientFunds(Exception)\` and \`class Bank\`:

- Amounts are strings of digits with an optional \`.\` and one or two decimals (\`"12"\`, \`"12.3"\`, \`"12.34"\`), surrounding spaces allowed. Anything else (including non-strings) raises \`ValueError\`. Balances are always shown as strings with two decimals and no thousands separator, like \`"1234.50"\`.
- \`open(name, initial="0.00")\` returns a new account number: \`"ACC-0001"\`, \`"ACC-0002"\`, … An empty name raises \`ValueError\`. The initial amount may be zero.
- \`deposit(number, amount)\` and \`withdraw(number, amount)\`: the amount must be more than zero (\`ValueError\`); withdrawing more than the balance raises \`InsufficientFunds\`.
- \`transfer(source, target, amount)\`: moves money between two different accounts (the same account twice is a \`ValueError\`); insufficient funds raises \`InsufficientFunds\`. A failed transfer changes nothing.
- An unknown account number raises \`KeyError\` everywhere.
- \`balance(number)\` returns the balance string. \`total()\` returns the sum of all balances.
- \`statement(number)\` returns a list of lines, one per movement: \`"open 10.00 -> 10.00"\`, \`"deposit 5.50 -> 15.50"\`, \`"withdraw 2.00 -> 13.50"\`, \`"transfer-out 3.00 to ACC-0002 -> 10.50"\`, \`"transfer-in 3.00 from ACC-0001 -> 3.00"\`. Each ends with the balance after that movement. Failed operations add no line.
--- starter
# Capstone: design and build InsufficientFunds and Bank to the specification in the task.
--- solution
import re


class InsufficientFunds(Exception):
    pass


AMOUNT = re.compile(r"\\d+(\\.\\d{1,2})?")


def parse_amount(text):
    """"12.34" -> 1234 cents. Only strings with at most two decimals."""
    if not isinstance(text, str) or not AMOUNT.fullmatch(text.strip()):
        raise ValueError(f"invalid amount: {text!r}")
    whole, _, frac = text.strip().partition(".")
    return int(whole) * 100 + int(frac.ljust(2, "0"))


def fmt(cents):
    return f"{cents // 100}.{cents % 100:02d}"


class Bank:
    def __init__(self):
        self._accounts = {}
        self._opened = 0

    def _account(self, number):
        if number not in self._accounts:
            raise KeyError(number)
        return self._accounts[number]

    def _positive(self, amount):
        cents = parse_amount(amount)
        if cents <= 0:
            raise ValueError("amount must be more than zero")
        return cents

    def _record(self, number, kind, cents, detail=""):
        account = self._accounts[number]
        account["history"].append(f"{kind} {fmt(cents)}{detail} -> {fmt(account['balance'])}")

    def open(self, name, initial="0.00"):
        if not isinstance(name, str) or not name.strip():
            raise ValueError("an account needs a name")
        cents = parse_amount(initial)
        self._opened += 1
        number = f"ACC-{self._opened:04d}"
        self._accounts[number] = {"name": name.strip(), "balance": cents, "history": []}
        self._record(number, "open", cents)
        return number

    def deposit(self, number, amount):
        account = self._account(number)
        cents = self._positive(amount)
        account["balance"] += cents
        self._record(number, "deposit", cents)

    def withdraw(self, number, amount):
        account = self._account(number)
        cents = self._positive(amount)
        if cents > account["balance"]:
            raise InsufficientFunds(f"{number} has only {fmt(account['balance'])}")
        account["balance"] -= cents
        self._record(number, "withdraw", cents)

    def transfer(self, source, target, amount):
        src = self._account(source)
        self._account(target)
        if source == target:
            raise ValueError("cannot transfer to the same account")
        cents = self._positive(amount)
        if cents > src["balance"]:
            raise InsufficientFunds(f"{source} has only {fmt(src['balance'])}")
        src["balance"] -= cents
        self._accounts[target]["balance"] += cents
        self._record(source, "transfer-out", cents, f" to {target}")
        self._record(target, "transfer-in", cents, f" from {source}")

    def balance(self, number):
        return fmt(self._account(number)["balance"])

    def statement(self, number):
        return list(self._account(number)["history"])

    def total(self):
        return fmt(sum(a["balance"] for a in self._accounts.values()))
--- hint
Write one function that validates and converts an amount string to integer cents (a regular expression such as \`\\d+(\\.\\d{1,2})?\` with \`fullmatch\` is precise). Use it everywhere, and one function that formats cents for display.
--- hint
Store each account as a record with its name, balance in cents and a list of statement lines. Count opened accounts to make numbers with \`f"ACC-{n:04d}"\`.
--- hint
In \`transfer\`, look up both accounts, check they differ, validate the amount and check the balance before you change either balance.
--- check case | Open, deposit, withdraw
(lambda b: (lambda a: (b.deposit(a, "5.50"), b.withdraw(a, " 2 "), b.balance(a), b.statement(a)))(b.open("Ada", "10.00")))(Bank())[2:]
=> ("13.50", ["open 10.00 -> 10.00", "deposit 5.50 -> 15.50", "withdraw 2.00 -> 13.50"])
--- check test | Account numbers count up
(lambda b: [b.open("A"), b.open("B"), b.open("C")])(Bank()) == ["ACC-0001", "ACC-0002", "ACC-0003"]
--- check case | A transfer moves money and records both sides
(lambda b: (b.open("Ada", "20"), b.open("Bo"), b.transfer("ACC-0001", "ACC-0002", "3"), b.balance("ACC-0001"), b.balance("ACC-0002"), b.statement("ACC-0001")[-1], b.statement("ACC-0002")[-1], b.total())[3:])(Bank())
=> ("17.00", "3.00", "transfer-out 3.00 to ACC-0002 -> 17.00", "transfer-in 3.00 from ACC-0001 -> 3.00", "20.00")
--- check test | Invalid amounts raise ValueError
(lambda b: (lambda a: all(raises(ValueError, lambda x=x: b.deposit(a, x)) for x in ["12.345", "-5", "abc", "", "1e3", "0", "0.00", "5.", 12.5, None]))(b.open("Ada")))(Bank())
--- check test | Overdrawing raises InsufficientFunds and changes nothing
(lambda b: (lambda a: (raises(InsufficientFunds, lambda: b.withdraw(a, "10.01")), b.balance(a), len(b.statement(a))))(b.open("Ada", "10")))(Bank()) == (True, "10.00", 1)
--- check test | A failed transfer changes nothing at all
(lambda b: (b.open("Ada", "10"), b.open("Bo", "1"), raises(InsufficientFunds, lambda: b.transfer("ACC-0001", "ACC-0002", "50")), raises(KeyError, lambda: b.transfer("ACC-0001", "ACC-0099", "1")), raises(ValueError, lambda: b.transfer("ACC-0001", "ACC-0001", "1")), b.balance("ACC-0001"), b.balance("ACC-0002"), len(b.statement("ACC-0001")), len(b.statement("ACC-0002")))[2:])(Bank()) == (True, True, True, "10.00", "1.00", 1, 1)
--- check test | Unknown accounts raise KeyError
raises(KeyError, lambda: Bank().balance("ACC-0001")) and raises(KeyError, lambda: Bank().deposit("ACC-0001", "1"))
--- check test | An account needs a name
raises(ValueError, lambda: Bank().open("   "))
--- check test | Exact to the cent over many operations
(lambda b: (lambda a: ([b.deposit(a, "0.10") for _ in range(1000)], [b.withdraw(a, "0.07") for _ in range(1000)], b.balance(a))[-1])(b.open("Ada")))(Bank()) == "30.00"
--- check test | Big balances print with no separator
(lambda b: b.balance(b.open("Rich", "1234567.8")))(Bank()) == "1234567.80"

=== pyp-16 | Capstone: a text adventure state machine
--- teach
A text adventure is a **state machine**: the game is always in some state (which room you are in, what you carry, what is where), each command moves it to a new state, and the reply describes what happened. The same shape describes vending machines, network protocols, checkout flows and game AI.

**Separate data from logic.** The rooms, exits and items are *data*: a dict you can read, edit or load from a file. The rules (how \`go\`, \`take\` and \`drop\` work) are *code*. Your code should work for any world with the same shape, not just the example: the checks try a different world too.

**Identify the state.** Before writing a line, list exactly what changes during play: the current room, the inventory, the items in each room, whether the game is over. Everything else (descriptions, exits, which exit needs which key) is fixed. Keep changing state in the game object.

**Do not modify the data you were given.** If two games are created from the same world dict and the first one's \`take\` removes an item from *the shared dict*, the second game starts with the item missing. That is the aliasing bug once more. Make a deep copy of the world when a game starts.

**A command parser, a dispatcher, and one method per verb.** Split the input into a verb and the rest; look the verb up; call its handler. Each handler checks its own preconditions ("is there such an exit?", "is it locked?", "is the item here?") and returns the reply.

**The end state.** Once the goal item is taken, the game is over and every command gets the same reply. Check that *first*, before any other command logic runs.

**Precise output matters here**, as it does whenever another program (or a checker) reads your output. Follow the reply formats exactly, including full stops and the order of lists.
--- task
The starter defines \`WORLD\`, an example world. Build a class \`Game(world)\` for any world of that shape (\`start\`, \`goal\`, and \`rooms\`, each with \`description\`, \`exits\`, \`items\` and optionally \`locked\`, which maps a direction to the item needed to go that way).

\`game.room\` is the current room's name. \`game.do(command)\` returns the reply (commands are case-insensitive):

- \`look\`: \`"<description> Exits: <exits, sorted, comma-separated>."\`, followed by \`" You see: <items in the room's order>."\` if the room has items. With no exits: \`Exits: none.\`
- \`go <direction>\`: moves and returns the new room's \`look\` text. No such exit: \`"You can't go that way."\`. A locked exit without its item in your inventory: \`"The way <direction> is locked."\`.
- \`take <item>\`: \`"Taken: <item>."\`, or \`"There is no <item> here."\`. Taking the goal item replies \`"Taken: <item>. You win!"\` and ends the game.
- \`drop <item>\`: puts it in the current room (at the end of its item list): \`"Dropped: <item>."\`, or \`"You don't have <item>."\`.
- \`inventory\`: \`"You carry: <items, sorted>."\` or \`"You carry nothing."\`.
- Anything else, including a verb missing its word: \`"I don't understand."\`. After the game is over, every command replies \`"The game is over."\`.

Creating or playing a game must not change the world dict it was given.
--- starter
WORLD = {
    "start": "hall",
    "goal": "treasure",
    "rooms": {
        "hall": {
            "description": "A dusty hall.",
            "exits": {"north": "library", "east": "kitchen"},
            "items": ["lamp"],
        },
        "library": {
            "description": "Shelves of old books.",
            "exits": {"south": "hall"},
            "items": ["key", "map"],
        },
        "kitchen": {
            "description": "It smells of bread.",
            "exits": {"west": "hall", "down": "cellar"},
            "items": [],
            "locked": {"down": "key"},
        },
        "cellar": {
            "description": "Treasure glitters in the dark.",
            "exits": {"up": "kitchen"},
            "items": ["treasure"],
        },
    },
}

# Capstone: design and build Game to the specification in the task.
--- solution
import copy

WORLD = {
    "start": "hall",
    "goal": "treasure",
    "rooms": {
        "hall": {
            "description": "A dusty hall.",
            "exits": {"north": "library", "east": "kitchen"},
            "items": ["lamp"],
        },
        "library": {
            "description": "Shelves of old books.",
            "exits": {"south": "hall"},
            "items": ["key", "map"],
        },
        "kitchen": {
            "description": "It smells of bread.",
            "exits": {"west": "hall", "down": "cellar"},
            "items": [],
            "locked": {"down": "key"},
        },
        "cellar": {
            "description": "Treasure glitters in the dark.",
            "exits": {"up": "kitchen"},
            "items": ["treasure"],
        },
    },
}


class Game:
    def __init__(self, world):
        self.world = copy.deepcopy(world)
        self.rooms = self.world["rooms"]
        self.room = self.world["start"]
        self.inventory = []
        self.over = False

    def look(self):
        room = self.rooms[self.room]
        exits = ", ".join(sorted(room["exits"])) or "none"
        text = f"{room['description']} Exits: {exits}."
        if room["items"]:
            text += f" You see: {', '.join(room['items'])}."
        return text

    def go(self, direction):
        room = self.rooms[self.room]
        if direction not in room["exits"]:
            return "You can't go that way."
        key = room.get("locked", {}).get(direction)
        if key and key not in self.inventory:
            return f"The way {direction} is locked."
        self.room = room["exits"][direction]
        return self.look()

    def take(self, item):
        items = self.rooms[self.room]["items"]
        if item not in items:
            return f"There is no {item} here."
        items.remove(item)
        self.inventory.append(item)
        if item == self.world.get("goal"):
            self.over = True
            return f"Taken: {item}. You win!"
        return f"Taken: {item}."

    def drop(self, item):
        if item not in self.inventory:
            return f"You don't have {item}."
        self.inventory.remove(item)
        self.rooms[self.room]["items"].append(item)
        return f"Dropped: {item}."

    def do(self, command):
        if self.over:
            return "The game is over."
        words = command.lower().split()
        if not words:
            return "I don't understand."
        verb, rest = words[0], " ".join(words[1:])
        if verb == "look" and not rest:
            return self.look()
        if verb == "inventory" and not rest:
            if not self.inventory:
                return "You carry nothing."
            return f"You carry: {', '.join(sorted(self.inventory))}."
        if verb == "go" and rest:
            return self.go(rest)
        if verb == "take" and rest:
            return self.take(rest)
        if verb == "drop" and rest:
            return self.drop(rest)
        return "I don't understand."
--- hint
State that changes: the current room, the inventory, each room's items, and whether the game is over. Deep-copy the world in \`__init__\` so the items can change safely.
--- hint
In \`do\`, check "game over" first, then split the command into a verb and the rest, and call one method per verb.
--- hint
For \`go\`, check the exit exists, then look in the room's \`locked\` dict (use \`.get(..., {})\`, since most rooms have none) for a required item.
--- check case | Looking around the start
Game(WORLD).do("look")
=> "A dusty hall. Exits: east, north. You see: lamp."
--- check case | Moving, taking and the inventory
(lambda g: [g.do(c) for c in ["go north", "take key", "take sword", "inventory", "go west", "go south", "look"]])(Game(WORLD))
=> ["Shelves of old books. Exits: south. You see: key, map.", "Taken: key.", "There is no sword here.", "You carry: key.", "You can't go that way.", "A dusty hall. Exits: east, north. You see: lamp.", "A dusty hall. Exits: east, north. You see: lamp."]
--- check case | A locked way needs its key
(lambda g: [g.do(c) for c in ["go east", "go down", "go west", "go north", "take key", "go south", "go east", "go down"]] + [g.room])(Game(WORLD))
=> ["It smells of bread. Exits: down, west.", "The way down is locked.", "A dusty hall. Exits: east, north. You see: lamp.", "Shelves of old books. Exits: south. You see: key, map.", "Taken: key.", "A dusty hall. Exits: east, north. You see: lamp.", "It smells of bread. Exits: down, west.", "Treasure glitters in the dark. Exits: up. You see: treasure.", "cellar"]
--- check case | Winning ends the game
(lambda g: [g.do(c) for c in ["go north", "TAKE KEY", "go south", "go east", "go down", "take treasure", "look"]][-3:] + [g.room])(Game(WORLD))
=> ["Treasure glitters in the dark. Exits: up. You see: treasure.", "Taken: treasure. You win!", "The game is over.", "cellar"]
--- check case | Dropping puts the item in the current room
(lambda g: [g.do(c) for c in ["take lamp", "drop map", "go north", "drop lamp", "look", "inventory"]])(Game(WORLD))
=> ["Taken: lamp.", "You don't have map.", "Shelves of old books. Exits: south. You see: key, map.", "Dropped: lamp.", "Shelves of old books. Exits: south. You see: key, map, lamp.", "You carry nothing."]
--- check test | Unknown commands
(lambda g: [g.do(c) for c in ["dance", "", "go", "take", "look around"]] == ["I don't understand."] * 5)(Game(WORLD))
--- check test | Games do not change the world, or each other
(lambda w: (lambda g1: (g1.do("take lamp"), Game(w).do("look"), w["rooms"]["hall"]["items"])[1:])(Game(w)))(WORLD) == ("A dusty hall. Exits: east, north. You see: lamp.", ["lamp"])
--- check case | Works for a different world
(lambda g: [g.do(c) for c in ["look", "go up", "take coin", "take star", "inventory", "go up"]])(Game({"start": "pit", "goal": "star", "rooms": {"pit": {"description": "A deep pit.", "exits": {"up": "rim"}, "items": ["coin", "rope"], "locked": {"up": "rope"}}, "rim": {"description": "The rim.", "exits": {}, "items": ["star"]}}}))
=> ["A deep pit. Exits: up. You see: coin, rope.", "The way up is locked.", "Taken: coin.", "There is no star here.", "You carry: coin.", "The way up is locked."]
--- check case | A room with no exits
(lambda g: [g.do("take rope"), g.do("go up")])(Game({"start": "pit", "goal": "star", "rooms": {"pit": {"description": "A deep pit.", "exits": {"up": "rim"}, "items": ["rope"], "locked": {"up": "rope"}}, "rim": {"description": "The rim.", "exits": {}, "items": ["star"]}}}))
=> ["Taken: rope.", "The rim. Exits: none. You see: star."]
`,Ae=`@track python
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

A \`while\` loop repeats as long as its condition is true — make sure something inside changes, or it never stops. Inside any loop, \`break\` leaves the loop early and \`continue\` skips straight to the next pass.
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

\`def\` starts the definition; the names in brackets are **parameters**; the values you pass when you call it (\`"Lin"\` and \`"?"\` above) are the **arguments**. \`return\` hands a value back to whoever called it. A parameter with \`=\` has a default. A function without \`return\` returns \`None\` — Python's value for "nothing".

\`pass\` is a statement that does nothing. It holds the place of a body you have not written yet, since a \`def\` cannot be left empty — you will see it in starters.
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
`,je=`@track sql
@level advanced
@title SQL · Advanced
@name SQL, advanced: window functions, schema design and the database's own rules
@blurb Write the queries analysts reach for — CTEs, recursion, window functions — and design databases that protect themselves with constraints, indexes, transactions, upserts, views and triggers.
@schema
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  manager_id INTEGER REFERENCES employees(id),
  dept TEXT NOT NULL,
  salary INTEGER NOT NULL,
  hired TEXT NOT NULL
);
INSERT INTO employees (id, name, title, manager_id, dept, salary, hired) VALUES
  (1,  'Maya', 'CEO',              NULL, 'exec',    250000, '2019-01-10'),
  (2,  'Omar', 'CTO',              1,    'eng',     200000, '2019-03-01'),
  (3,  'Lena', 'CFO',              1,    'finance', 190000, '2019-06-15'),
  (4,  'Raj',  'Eng manager',      2,    'eng',     150000, '2020-02-01'),
  (5,  'Tess', 'Staff engineer',   2,    'eng',     150000, '2020-05-20'),
  (6,  'Ivan', 'Engineer',         4,    'eng',     120000, '2021-01-11'),
  (7,  'Nora', 'Engineer',         4,    'eng',     120000, '2021-09-01'),
  (8,  'Paul', 'Engineer',         4,    'eng',     105000, '2022-04-18'),
  (9,  'Zara', 'Accountant',       3,    'finance',  90000, '2021-07-07'),
  (10, 'Leo',  'Intern',           6,    'eng',      40000, '2024-06-03'),
  (11, 'Amy',  'Analyst',          3,    'finance',  90000, '2023-02-14');
CREATE TABLE daily_sales (
  day TEXT NOT NULL,
  region TEXT NOT NULL,
  amount REAL NOT NULL,
  PRIMARY KEY (day, region)
);
INSERT INTO daily_sales (day, region, amount) VALUES
  ('2024-07-01', 'north', 120), ('2024-07-02', 'north',  80), ('2024-07-03', 'north', 150),
  ('2024-07-05', 'north',  90), ('2024-07-06', 'north', 200), ('2024-07-07', 'north', 110),
  ('2024-07-01', 'south',  60), ('2024-07-03', 'south',  75), ('2024-07-04', 'south',  75),
  ('2024-07-05', 'south',  40), ('2024-07-07', 'south',  95);
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id INTEGER REFERENCES categories(id)
);
INSERT INTO categories (id, name, parent_id) VALUES
  (1, 'All', NULL), (2, 'Electronics', 1), (3, 'Home', 1), (4, 'Audio', 2),
  (5, 'Headphones', 4), (6, 'Speakers', 4), (7, 'Cables', 2), (8, 'Kitchen', 3), (9, 'Earbuds', 5);
@end

=== sql3-01 | CTEs: a query in named steps
--- teach
Most lessons in this course share three tables:

- \`employees\` — \`id\`, \`name\`, \`title\`, \`manager_id\` (another employee, NULL for the CEO), \`dept\`, \`salary\`, \`hired\`
- \`daily_sales\` — \`day\`, \`region\` (\`north\` or \`south\`), \`amount\`; some days have no row
- \`categories\` — \`id\`, \`name\`, \`parent_id\` (NULL for the root): a tree

The intermediate course answered business questions with joins, subqueries and \`CASE\`. This course adds what analysts reach for next — recursion and window functions — and then turns to design: a database that protects its own data.

You have already chained two \`WITH\` steps to fix a fan-out. Each step can also use the ones defined **before** it, which turns a long question into a pipeline:

\`\`\`sql
WITH dept_pay AS (
  SELECT dept, COUNT(*) AS headcount, SUM(salary) AS payroll
  FROM employees
  GROUP BY dept
), company AS (
  SELECT SUM(payroll) AS total FROM dept_pay
)
SELECT d.dept, d.payroll, c.total
FROM dept_pay d CROSS JOIN company c;
\`\`\`

\`company\` is built from \`dept_pay\`, and the final \`SELECT\` uses both. \`CROSS JOIN\` with a one-row result simply puts that value on every row.

Why bother, when subqueries can do the same? Because each step has a **name** that says what it means, and you can debug a step by selecting from it on its own. Long reports written as nested subqueries are read inside-out; CTEs are read top to bottom, in the order you thought of them.

One precision trap: dividing two integers in SQLite gives an integer (\`7 / 2\` is \`3\`). Multiply by \`100.0\` first to get a real percentage.
--- task
Return one row per department with \`dept\`, \`headcount\`, \`payroll\` (total salary) and \`share\` — the department's payroll as a percentage of the whole company's payroll, rounded to 1 decimal. Use at least two CTEs. Sort by payroll, largest first.
--- starter
SELECT dept, COUNT(*) AS headcount, SUM(salary) AS payroll
FROM employees
GROUP BY dept;
--- solution
WITH dept_pay AS (
  SELECT dept, COUNT(*) AS headcount, SUM(salary) AS payroll
  FROM employees
  GROUP BY dept
), company AS (
  SELECT SUM(payroll) AS total FROM dept_pay
)
SELECT d.dept, d.headcount, d.payroll,
       ROUND(100.0 * d.payroll / c.total, 1) AS share
FROM dept_pay d
CROSS JOIN company c
ORDER BY d.payroll DESC;
--- hint
First CTE: payroll per department. Second CTE: the sum of those payrolls.
--- hint
Join the two with \`CROSS JOIN\` and compute \`ROUND(100.0 * d.payroll / c.total, 1)\`.
--- check result | eng, finance, exec with their shares
ordered
[["eng", 7, 885000, 58.8], ["finance", 3, 370000, 24.6], ["exec", 1, 250000, 16.6]]
--- check source | Uses more than one CTE
\\)\\s*,\\s*\\w+\\s+[Aa][Ss]\\s*\\(

=== sql3-02 | Recursive CTEs: generating a series
--- teach
\`daily_sales\` has no row for a day with no sales in a region. A chart built straight from it would silently skip those days — and a "per day" average would be wrong. You need a row for **every** day, with 0 where nothing happened. SQL has no loop, but it has **recursive CTEs**:

\`\`\`sql
WITH RECURSIVE n(x) AS (
  SELECT 1                           -- the anchor: the first row
  UNION ALL
  SELECT x + 1 FROM n WHERE x < 5    -- the step: builds the next row from the last
)
SELECT x FROM n;                     -- 1, 2, 3, 4, 5
\`\`\`

How it runs: the anchor produces the first rows. Then the step runs on the rows produced last time, and its output becomes the input to the next round. When a round produces nothing — here, when \`x < 5\` is false — it stops. **Always write the stopping condition first**; without it the query runs forever.

A calendar is the same idea with dates:

\`\`\`sql
WITH RECURSIVE days(day) AS (
  SELECT '2024-07-01'
  UNION ALL
  SELECT date(day, '+1 day') FROM days WHERE day < '2024-07-07'
)
SELECT day FROM days;
\`\`\`

Then \`LEFT JOIN\` the real data onto the calendar. The calendar supplies every day; the data fills in what it has; \`COALESCE(amount, 0)\` fills the gaps. Remember the LEFT JOIN rule from the intermediate course: a filter on the right-hand table — here, the region — belongs in the \`ON\`.
--- task
Return one row for every day from \`2024-07-01\` to \`2024-07-07\` with the \`north\` region's sales: columns \`day\` and \`amount\`, where a day with no row shows \`0\`. Sort by day.
--- starter
SELECT day, amount
FROM daily_sales
WHERE region = 'north'
ORDER BY day;
--- solution
WITH RECURSIVE days(day) AS (
  SELECT '2024-07-01'
  UNION ALL
  SELECT date(day, '+1 day') FROM days WHERE day < '2024-07-07'
)
SELECT d.day, COALESCE(s.amount, 0) AS amount
FROM days d
LEFT JOIN daily_sales s ON s.day = d.day AND s.region = 'north'
ORDER BY d.day;
--- hint
Build the calendar with \`WITH RECURSIVE days(day) AS (SELECT '2024-07-01' UNION ALL SELECT date(day, '+1 day') FROM days WHERE day < '2024-07-07')\`.
--- hint
\`LEFT JOIN daily_sales s ON s.day = d.day AND s.region = 'north'\`, and \`COALESCE(s.amount, 0)\`.
--- check result | Seven days; 4 July is 0
ordered
[["2024-07-01", 120.0], ["2024-07-02", 80.0], ["2024-07-03", 150.0], ["2024-07-04", 0], ["2024-07-05", 90.0], ["2024-07-06", 200.0], ["2024-07-07", 110.0]]

=== sql3-03 | Recursive CTEs: walking an org chart
--- teach
A self-join finds someone's *direct* reports. "Everyone under Omar, at any depth" needs as many joins as the tree is deep — and you do not know the depth in advance. A recursive CTE walks it for you:

\`\`\`sql
WITH RECURSIVE chain(id, name, depth) AS (
  SELECT id, name, 1 FROM employees WHERE manager_id = 4    -- Raj's direct reports
  UNION ALL
  SELECT e.id, e.name, c.depth + 1
  FROM employees e
  JOIN chain c ON e.manager_id = c.id                       -- their reports, and so on
)
SELECT * FROM chain;
\`\`\`

Round one finds the people whose manager is Raj. Each later round joins \`employees\` to the rows found in the round before: people managed by *those* people. When a round finds nobody, it stops — the leaves of the tree end the recursion on their own.

Carry along whatever you need as you go: a \`depth\` counter, the manager's name, a path string. The anchor sets the starting value; the step updates it.

Walking **up** is the same with the join flipped: start from one person and join \`e.id = c.manager_id\` to climb to the CEO.

Real data can contain a cycle (A manages B, B manages A), and then the recursion never ends. Guarding with \`WHERE c.depth < 20\` in the step is cheap insurance.
--- task
Return everyone who reports to **Omar**, directly or indirectly: their \`name\` and \`depth\` (1 for Omar's direct reports, 2 for theirs, and so on). Sort by depth, then name. Find Omar by name, not by id.
--- starter
SELECT name, 1 AS depth
FROM employees
WHERE manager_id = (SELECT id FROM employees WHERE name = 'Omar')
ORDER BY name;
--- solution
WITH RECURSIVE reports(id, name, depth) AS (
  SELECT id, name, 1
  FROM employees
  WHERE manager_id = (SELECT id FROM employees WHERE name = 'Omar')
  UNION ALL
  SELECT e.id, e.name, r.depth + 1
  FROM employees e
  JOIN reports r ON e.manager_id = r.id
)
SELECT name, depth
FROM reports
ORDER BY depth, name;
--- hint
The starter is the anchor: Omar's direct reports at depth 1. Put it inside \`WITH RECURSIVE reports(id, name, depth) AS ( … )\`.
--- hint
The step: \`SELECT e.id, e.name, r.depth + 1 FROM employees e JOIN reports r ON e.manager_id = r.id\`, joined to the anchor with \`UNION ALL\`.
--- check result | Raj and Tess, then Ivan, Nora and Paul, then Leo
ordered
[["Raj", 1], ["Tess", 1], ["Ivan", 2], ["Nora", 2], ["Paul", 2], ["Leo", 3]]

=== sql3-04 | Recursive CTEs: paths through a tree
--- teach
Category trees are everywhere: shops, file systems, comment threads. A recursive CTE can build each node's **path** from the root, by carrying a string along and appending to it at each step:

\`\`\`sql
WITH RECURSIVE tree(id, path) AS (
  SELECT id, name FROM categories WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, t.path || '/' || c.name
  FROM categories c
  JOIN tree t ON c.parent_id = t.id
)
SELECT path FROM tree;
\`\`\`

This walks **down** from the root, so every node is reached through its parent, and its path is its parent's path plus its own name.

The path is useful beyond display. Sorting by it lists the tree in reading order, each parent directly above its children. And "everything under Electronics" becomes \`WHERE path LIKE 'All/Electronics/%'\`.

Count as you go, too: a \`level\` column starting at 0 and growing by 1 per step tells you how deep each node is — handy for indenting.
--- task
Return every category with its \`path\` from the root, names joined by \`' > '\` (for example \`All > Electronics > Audio\`), and its \`level\` (0 for \`All\`, 1 for its children, and so on). Sort by path.
--- starter
SELECT name AS path, 0 AS level
FROM categories
WHERE parent_id IS NULL;
--- solution
WITH RECURSIVE tree(id, path, level) AS (
  SELECT id, name, 0 FROM categories WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, t.path || ' > ' || c.name, t.level + 1
  FROM categories c
  JOIN tree t ON c.parent_id = t.id
)
SELECT path, level
FROM tree
ORDER BY path;
--- hint
Anchor: the root, \`SELECT id, name, 0 FROM categories WHERE parent_id IS NULL\`.
--- hint
Step: join \`categories c\` to the tree on \`c.parent_id = t.id\`, building \`t.path || ' > ' || c.name\` and \`t.level + 1\`.
--- check result | Nine categories in tree order, Earbuds four levels down
ordered
[["All", 0], ["All > Electronics", 1], ["All > Electronics > Audio", 2], ["All > Electronics > Audio > Headphones", 3], ["All > Electronics > Audio > Headphones > Earbuds", 4], ["All > Electronics > Audio > Speakers", 3], ["All > Electronics > Cables", 2], ["All > Home", 1], ["All > Home > Kitchen", 2]]

=== sql3-18 | Problem: everyone under every manager
--- teach
**The problem.** HR wants a table of every manager with the size and cost of the whole team beneath them: for each employee who manages anyone, the number of people below them **at any depth**, and the total salary of those people. Maya, the CEO, has everyone below her; Ivan has only his intern.

Lesson 3 walked the tree below *one* person. This asks for the same walk below *every* person at once. Work it through the problem-solving steps from the intermediate course:

1. **Restate it with an example.** Omar manages Raj and Tess; Raj manages Ivan, Nora and Paul; Ivan manages Leo. So Omar's team is 6 people, and its payroll is their six salaries — not Omar's own.
2. **Brute force first.** You could run lesson 3's query once per manager, changing the name each time. That gives the right numbers, but it is one query per manager, and a new manager means a new query.
3. **Find the pattern.** Every walk starts the same way — a manager and their direct reports — and every step does the same thing: add the reports of the people found so far. The only difference between the walks is *whose* walk it is. So carry that along: make the recursive rows **pairs**, \`(boss_id, emp_id)\`, meaning "emp is somewhere under boss".
   - Anchor: every direct link, \`SELECT manager_id, id FROM employees WHERE manager_id IS NOT NULL\`.
   - Step: for each pair found, the people managed by \`emp_id\` are also under the same \`boss_id\`.
4. **Then it is ordinary grouping.** Group the pairs by \`boss_id\`: \`COUNT(*)\` is the team size, and joining each \`emp_id\` back to \`employees\` gives the salaries to sum.
5. **Check the edges.** People who manage nobody (Leo, Zara…) produce no pairs as a boss, so they do not appear — which is what the question asks. Every person appears once per boss above them, never twice under the same boss, because a tree has only one path upwards.
--- task
For every employee who manages at least one person, return \`name\`, \`reports\` (the number of people under them at any depth) and \`team_payroll\` (the total salary of those people, not counting the manager). Use one recursive CTE for all managers at once. Sort by \`reports\`, largest first, then name.
--- starter
SELECT b.name, COUNT(*) AS reports, SUM(e.salary) AS team_payroll
FROM employees e
JOIN employees b ON b.id = e.manager_id
GROUP BY b.id, b.name
ORDER BY reports DESC, b.name;
--- solution
WITH RECURSIVE under(boss_id, emp_id) AS (
  SELECT manager_id, id FROM employees WHERE manager_id IS NOT NULL
  UNION ALL
  SELECT u.boss_id, e.id
  FROM under u
  JOIN employees e ON e.manager_id = u.emp_id
)
SELECT b.name, COUNT(*) AS reports, SUM(e.salary) AS team_payroll
FROM under u
JOIN employees b ON b.id = u.boss_id
JOIN employees e ON e.id = u.emp_id
GROUP BY b.id, b.name
ORDER BY reports DESC, b.name;
--- hint
The starter counts only direct reports: Maya shows 2, but everyone is under her. You need the whole tree below each manager.
--- hint
Make the recursion build pairs \`(boss_id, emp_id)\`. The anchor is every direct link: \`SELECT manager_id, id FROM employees WHERE manager_id IS NOT NULL\`.
--- hint
The step keeps the boss and moves one level down: \`SELECT u.boss_id, e.id FROM under u JOIN employees e ON e.manager_id = u.emp_id\`. Then group the pairs by boss and join \`employees\` twice, once for the boss's name and once for the salaries.
--- check result | Five managers, with whole-tree headcounts and payrolls
ordered
[["Maya", 10, 1255000], ["Omar", 6, 685000], ["Raj", 4, 385000], ["Lena", 2, 180000], ["Ivan", 1, 40000]]
--- check source | Uses a recursive CTE
[Rr][Ee][Cc][Uu][Rr][Ss][Ii][Vv][Ee]

=== sql3-05 | Window functions: ranking
--- teach
\`GROUP BY\` collapses rows into one per group. A **window function** computes across a group of rows but keeps every row. The group is described by \`OVER (...)\`:

\`\`\`sql
SELECT name, dept, salary,
       RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS pos
FROM employees;
\`\`\`

- \`PARTITION BY dept\` — rank within each department separately (leave it out for one ranking over everything).
- \`ORDER BY salary DESC\` — the order the ranking follows.

The three ranking functions differ only in how they treat **ties**. For salaries 150, 150, 120:

| function | gives | meaning |
| --- | --- | --- |
| \`ROW_NUMBER()\` | 1, 2, 3 | always distinct; ties broken arbitrarily unless you add a tie-breaker |
| \`RANK()\` | 1, 1, 3 | ties share, then a gap — "third fastest" |
| \`DENSE_RANK()\` | 1, 1, 2 | ties share, no gap — "second-highest salary" |

Pick by the question. "Exactly one row per group" wants \`ROW_NUMBER\` with a tie-breaker in the \`ORDER BY\`, so the result is the same every run. "Everyone who shares the top spot" wants \`RANK\` or \`DENSE_RANK\`.

Window functions run after \`WHERE\` and \`GROUP BY\`, so you cannot filter on them in the same query's \`WHERE\` — wrap the query in a CTE and filter outside. You will do that in the expert course.
--- task
For every employee in the \`eng\` department, return \`name\`, \`salary\`, and three rankings by salary (highest first): \`rn\` with \`ROW_NUMBER()\` (ties broken by name, A to Z), \`rnk\` with \`RANK()\` and \`dense\` with \`DENSE_RANK()\`. Sort by \`rn\`.
--- starter
SELECT name, salary
FROM employees
WHERE dept = 'eng'
ORDER BY salary DESC;
--- solution
SELECT name, salary,
       ROW_NUMBER() OVER (ORDER BY salary DESC, name) AS rn,
       RANK()       OVER (ORDER BY salary DESC) AS rnk,
       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense
FROM employees
WHERE dept = 'eng'
ORDER BY rn;
--- hint
Each ranking is its own column: \`RANK() OVER (ORDER BY salary DESC) AS rnk\`.
--- hint
\`ROW_NUMBER\` needs the tie-breaker: \`OVER (ORDER BY salary DESC, name)\`. Sort the final result by \`rn\`.
--- check result | Ties share a RANK (with gaps) and a DENSE_RANK (without)
ordered
[["Omar", 200000, 1, 1, 1], ["Raj", 150000, 2, 2, 2], ["Tess", 150000, 3, 2, 2], ["Ivan", 120000, 4, 4, 3], ["Nora", 120000, 5, 4, 3], ["Paul", 105000, 6, 6, 4], ["Leo", 40000, 7, 7, 5]]

=== sql3-06 | Running totals with SUM() OVER
--- teach
Aggregates become window functions when you add \`OVER\`. With an \`ORDER BY\` inside, they accumulate — a **running total**:

\`\`\`sql
SELECT day, amount,
       SUM(amount) OVER (ORDER BY day) AS so_far
FROM daily_sales
WHERE region = 'north';
\`\`\`

Each row's \`so_far\` is the sum of every row up to and including it, in day order. \`PARTITION BY\` restarts the running total for each group:

\`\`\`sql
SUM(amount) OVER (PARTITION BY region ORDER BY day)
\`\`\`

Without \`ORDER BY\` inside \`OVER\`, the window is the whole partition, so every row gets the partition's grand total — which is exactly what you want for "share of total":

\`\`\`sql
amount * 100.0 / SUM(amount) OVER (PARTITION BY region)
\`\`\`

The same works for \`AVG\`, \`COUNT\`, \`MIN\` and \`MAX\`: a running count, a best-so-far.

A subtle default: with \`ORDER BY\`, the window includes every row with the **same** sort value as the current one (its *peers*). If two rows tie on \`day\`, both show the total including both. When the order column is unique — here \`(day, region)\` is the primary key, so within a region \`day\` is unique — you never notice. The next lesson shows how to take control of this.
--- task
For each region, return \`region\`, \`day\`, \`amount\`, \`running\` (the region's running total up to and including that day) and \`pct\` (that day's amount as a percentage of the region's total for the week, rounded to 1 decimal). Sort by region, then day.
--- starter
SELECT region, day, amount
FROM daily_sales
ORDER BY region, day;
--- solution
SELECT region, day, amount,
       SUM(amount) OVER (PARTITION BY region ORDER BY day) AS running,
       ROUND(amount * 100.0 / SUM(amount) OVER (PARTITION BY region), 1) AS pct
FROM daily_sales
ORDER BY region, day;
--- hint
Running total: \`SUM(amount) OVER (PARTITION BY region ORDER BY day)\`.
--- hint
Region total: the same without \`ORDER BY\` — \`SUM(amount) OVER (PARTITION BY region)\`. Divide and round.
--- check result | Running totals restart per region
ordered
[["north", "2024-07-01", 120.0, 120.0, 16.0], ["north", "2024-07-02", 80.0, 200.0, 10.7], ["north", "2024-07-03", 150.0, 350.0, 20.0], ["north", "2024-07-05", 90.0, 440.0, 12.0], ["north", "2024-07-06", 200.0, 640.0, 26.7], ["north", "2024-07-07", 110.0, 750.0, 14.7], ["south", "2024-07-01", 60.0, 60.0, 17.4], ["south", "2024-07-03", 75.0, 135.0, 21.7], ["south", "2024-07-04", 75.0, 210.0, 21.7], ["south", "2024-07-05", 40.0, 250.0, 11.6], ["south", "2024-07-07", 95.0, 345.0, 27.5]]

=== sql3-07 | LAG and LEAD: comparing with neighbours
--- teach
"How did today compare with yesterday?" needs a value from **another row**. \`LAG(x)\` returns \`x\` from the previous row of the window; \`LEAD(x)\` from the next one:

\`\`\`sql
SELECT day, amount,
       LAG(amount) OVER (ORDER BY day) AS prev,
       amount - LAG(amount) OVER (ORDER BY day) AS change
FROM daily_sales
WHERE region = 'north';
\`\`\`

The first row has no previous row, so \`LAG\` gives NULL (and so does the change). You can ask for a default instead — \`LAG(amount, 1, 0)\` — but think first: is "no previous day" really a change from zero? Usually NULL is the honest answer.

\`LAG(x, n)\` looks \`n\` rows back. And, as always, \`PARTITION BY region\` keeps north's rows from being compared with south's.

The catch: \`LAG\` means the previous **row**, not the previous **day**. North has no row for 4 July, so on 5 July the "previous" row is 3 July. That may be what you want (compare with the last recorded day), or not (then build a full calendar first, as in lesson 2). Either way, it is worth showing how far back the previous row was:

\`\`\`sql
julianday(day) - julianday(LAG(day) OVER (ORDER BY day)) AS gap_days
\`\`\`
--- task
For both regions, return \`region\`, \`day\`, \`amount\`, \`change\` (the amount minus the region's previous recorded amount; NULL for its first row) and \`gap_days\` (the number of days since the region's previous row, as a number; NULL for its first row). Sort by region, then day.
--- starter
SELECT region, day, amount,
       amount - LAG(amount) OVER (ORDER BY day) AS change
FROM daily_sales
ORDER BY region, day;
--- solution
SELECT region, day, amount,
       amount - LAG(amount) OVER w AS change,
       julianday(day) - julianday(LAG(day) OVER w) AS gap_days
FROM daily_sales
WINDOW w AS (PARTITION BY region ORDER BY day)
ORDER BY region, day;
--- hint
The starter compares north with south: its window has no \`PARTITION BY region\`.
--- hint
\`gap_days\` is \`julianday(day) - julianday(LAG(day) OVER (PARTITION BY region ORDER BY day))\`. A named \`WINDOW w AS (…)\` saves repeating it.
--- check result | Changes and gaps within each region
ordered
[["north", "2024-07-01", 120.0, null, null], ["north", "2024-07-02", 80.0, -40.0, 1.0], ["north", "2024-07-03", 150.0, 70.0, 1.0], ["north", "2024-07-05", 90.0, -60.0, 2.0], ["north", "2024-07-06", 200.0, 110.0, 1.0], ["north", "2024-07-07", 110.0, -90.0, 1.0], ["south", "2024-07-01", 60.0, null, null], ["south", "2024-07-03", 75.0, 15.0, 2.0], ["south", "2024-07-04", 75.0, 0.0, 1.0], ["south", "2024-07-05", 40.0, -35.0, 1.0], ["south", "2024-07-07", 95.0, 55.0, 2.0]]

=== sql3-08 | Window frames: moving averages
--- teach
A window function sees a **frame**: the rows around the current one that it aggregates over. You can set the frame yourself:

\`\`\`sql
AVG(amount) OVER (
  ORDER BY day
  ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)
\`\`\`

This averages the current row and the two before it — a 3-row **moving average**, the standard way to smooth a noisy daily series. Near the start there are fewer rows available, so the first row averages just itself and the second averages two.

The frame parts:

- \`UNBOUNDED PRECEDING\` — from the first row of the partition
- \`n PRECEDING\` / \`n FOLLOWING\` — n rows before / after
- \`CURRENT ROW\`
- \`UNBOUNDED FOLLOWING\` — to the last row

And the frame type:

- \`ROWS\` counts physical rows.
- \`RANGE\` works on *values*: it includes every row whose sort value is within the range, so ties (peers) are always included together.

This is the default you met last lesson. With only \`ORDER BY\`, the frame is \`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\` — and if two rows tie on the sort key, both get the total including both, so a "running total" jumps by two rows at once. When you want exactly one row at a time, say \`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\`, and give the \`ORDER BY\` a tie-breaker.

Frames also give you "the rest of the partition": \`ROWS BETWEEN 1 FOLLOWING AND UNBOUNDED FOLLOWING\`.
--- task
For the \`north\` region, return \`day\`, \`amount\` and \`moving_avg\`: the average of that row and the two rows before it (fewer at the start), rounded to 1 decimal. Sort by day.
--- starter
SELECT day, amount,
       ROUND(AVG(amount) OVER (ORDER BY day), 1) AS moving_avg
FROM daily_sales
WHERE region = 'north'
ORDER BY day;
--- solution
SELECT day, amount,
       ROUND(AVG(amount) OVER (
         ORDER BY day
         ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ), 1) AS moving_avg
FROM daily_sales
WHERE region = 'north'
ORDER BY day;
--- hint
The starter's default frame runs from the first row: it is a running average, not a moving one.
--- hint
Add a frame inside \`OVER\`: \`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\`.
--- check result | A three-row moving average
ordered
[["2024-07-01", 120.0, 120.0], ["2024-07-02", 80.0, 100.0], ["2024-07-03", 150.0, 116.7], ["2024-07-05", 90.0, 106.7], ["2024-07-06", 200.0, 146.7], ["2024-07-07", 110.0, 133.3]]
--- check source | Sets the frame with ROWS
[Rr][Oo][Ww][Ss]\\s+[Bb][Ee][Tt][Ww][Ee][Ee][Nn]

=== sql3-19 | Debugging: the running balance that repeats
--- schema
CREATE TABLE ledger (
  id INTEGER PRIMARY KEY,
  account TEXT NOT NULL,
  day TEXT NOT NULL,
  amount INTEGER NOT NULL
);
INSERT INTO ledger (id, account, day, amount) VALUES
  (1, 'ana', '2024-07-01', 100),
  (2, 'ana', '2024-07-02', -30),
  (3, 'ana', '2024-07-02', -20),
  (4, 'ana', '2024-07-04', 50),
  (5, 'bo',  '2024-07-01', 200),
  (6, 'bo',  '2024-07-03', -50),
  (7, 'bo',  '2024-07-03', 25),
  (8, 'bo',  '2024-07-03', -75);
--- teach
This lesson's table: \`ledger\` (\`id\`, \`account\`, \`day\`, \`amount\`) — one row per transaction, several on some days. \`id\` is the order they happened in.

**The bug report.** The statement page shows each transaction with the account's balance after it. Ana's two payments on 2 July both show a balance of **50**; after the first one (−30) her balance was 70. Bo's three transactions on 3 July all show **100**. The balance at the end of each day is right.

The method is the one you used on queries in the intermediate course:

1. **Reproduce it small.** Run the query for one account and read the raw rows next to the balance. Ana's lines 2 and 3 show the same number.
2. **Look for the pattern in what is wrong.** Every wrong row shares its \`day\` with another row of the same account. Rows alone on their day are right. That points at how ties on \`day\` are handled.
3. **Check your assumption.** The query assumes \`SUM(...) OVER (... ORDER BY day)\` adds one row at a time. It does not: with only an \`ORDER BY\`, the default frame is \`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\`, and \`RANGE\` takes every **peer** — every row with the same \`day\` — together (you met this in the window-frames lesson). So both of Ana's 2 July rows get the total after both.
4. **Fix the cause, not the symptom.** The real problem is that \`day\` does not fully decide the order. Make the order unique with a tie-breaker, \`ORDER BY day, id\`, and say that you mean one row at a time with \`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\`. Hiding the repeated numbers on the page, or grouping by day, would treat the symptom and lose the per-transaction balance the page exists to show.
5. **Check that the fix did not break what was right.** The balance at the end of each day must not change.
--- task
Fix the statement query so \`balance\` is each account's running balance after **each** transaction, in the order they happened (\`day\`, then \`id\`). Keep the columns \`id\`, \`account\`, \`day\`, \`amount\`, \`balance\` and the sort order.
--- starter
SELECT id, account, day, amount,
       SUM(amount) OVER (PARTITION BY account ORDER BY day) AS balance
FROM ledger
ORDER BY account, day, id;
--- solution
SELECT id, account, day, amount,
       SUM(amount) OVER (
         PARTITION BY account
         ORDER BY day, id
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS balance
FROM ledger
ORDER BY account, day, id;
--- hint
Look only at Ana's rows. Which rows show a wrong balance, and what do they have in common?
--- hint
With only \`ORDER BY day\`, rows that share a day are peers and are summed together. The window needs to know which of them came first.
--- hint
Order the window by \`day, id\`, and add \`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\`.
--- check result | A balance after every transaction, in order
ordered
[[1, "ana", "2024-07-01", 100, 100], [2, "ana", "2024-07-02", -30, 70], [3, "ana", "2024-07-02", -20, 50], [4, "ana", "2024-07-04", 50, 100], [5, "bo", "2024-07-01", 200, 200], [6, "bo", "2024-07-03", -50, 150], [7, "bo", "2024-07-03", 25, 175], [8, "bo", "2024-07-03", -75, 100]]

=== sql3-09 | Constraints: rules the database enforces
--- schema
CREATE TABLE plans (
  name TEXT PRIMARY KEY,
  monthly_cents INTEGER NOT NULL
);
INSERT INTO plans (name, monthly_cents) VALUES ('free', 0), ('team', 1200), ('enterprise', 4900);
--- teach
Application code has bugs, runs in several versions at once, and is joined by scripts and admin tools that skip its checks. The only rule that holds for **every** writer is one the database enforces. That is what constraints are for:

\`\`\`sql
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'team', 'enterprise')),
  seats INTEGER NOT NULL DEFAULT 1 CHECK (seats >= 1)
);
\`\`\`

| constraint | refuses |
| --- | --- |
| \`PRIMARY KEY\` | a second row with the same key |
| \`NOT NULL\` | a missing value |
| \`UNIQUE\` | a value that is already in the column (NULLs excepted) |
| \`CHECK (expr)\` | a row for which \`expr\` is false |
| \`DEFAULT v\` | (not a rule) fills the column when an insert leaves it out |

Constraints can also go at the end, covering several columns: \`UNIQUE (team_id, email)\` means one email per team, but the same email may join two teams.

When a constraint is broken, the statement fails with an error and changes nothing. You can choose another reaction with \`INSERT OR IGNORE\` (skip the bad row silently) or \`INSERT OR REPLACE\` (delete the old row, then insert). The checks in this lesson use \`INSERT OR IGNORE … RETURNING id\`: a row that your table accepts comes back, and a row it refuses returns nothing.

In SQLite, \`INTEGER PRIMARY KEY\` is special: it becomes the row's own id, filled in automatically when you leave it out. And a column type is only a hint — SQLite happily stores \`'abc'\` in an \`INTEGER\` column — which is one more reason to write \`CHECK\`s for what matters.
--- task
Create a table \`accounts\` with:

- \`id\` — integer primary key
- \`email\` — text, required, and unique
- \`plan\` — text, required, and only \`'free'\`, \`'team'\` or \`'enterprise'\`
- \`seats\` — integer, required, at least 1, defaulting to 1
--- starter
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  email TEXT,
  plan TEXT,
  seats INTEGER
);
--- solution
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'team', 'enterprise')),
  seats INTEGER NOT NULL DEFAULT 1 CHECK (seats >= 1)
);
--- hint
Stack constraints after the type, space-separated: \`email TEXT NOT NULL UNIQUE\`.
--- hint
\`CHECK (plan IN ('free', 'team', 'enterprise'))\` and \`seats INTEGER NOT NULL DEFAULT 1 CHECK (seats >= 1)\`.
--- check query | A valid account is accepted
INSERT OR IGNORE INTO accounts (id, email, plan, seats) VALUES (1, 'ops@acme.io', 'team', 5) RETURNING id
=> [[1]]
--- check query | A second account with the same email is refused
INSERT OR IGNORE INTO accounts (id, email, plan, seats) VALUES (2, 'ops@acme.io', 'free', 1) RETURNING id
=> []
--- check query | An unknown plan is refused
INSERT OR IGNORE INTO accounts (id, email, plan, seats) VALUES (3, 'x@acme.io', 'gold', 1) RETURNING id
=> []
--- check query | Zero seats are refused
INSERT OR IGNORE INTO accounts (id, email, plan, seats) VALUES (4, 'y@acme.io', 'team', 0) RETURNING id
=> []
--- check query | A missing email or plan is refused
INSERT OR IGNORE INTO accounts (id, email, plan, seats) VALUES (5, NULL, 'free', 1), (6, 'z@acme.io', NULL, 1) RETURNING id
=> []
--- check query | seats defaults to 1
INSERT OR IGNORE INTO accounts (id, email, plan) VALUES (7, 'solo@acme.io', 'free') RETURNING seats
=> [[1]]

=== sql3-10 | Foreign keys
--- schema
CREATE TABLE teams (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO teams (id, name) VALUES (1, 'Platform'), (2, 'Growth');
--- teach
A foreign key says "this column must point at a real row over there":

\`\`\`sql
CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  email TEXT NOT NULL
);
\`\`\`

With it, the database refuses a member whose \`team_id\` names no team — no more **orphans**, rows pointing at nothing, which every report then has to step around.

The \`ON DELETE\` part says what happens to members when their team is deleted:

| action | effect |
| --- | --- |
| \`NO ACTION\` / \`RESTRICT\` (default) | refuse to delete a team that still has members |
| \`CASCADE\` | delete its members too |
| \`SET NULL\` | keep the members, set their \`team_id\` to NULL (the column must allow NULL) |

Choose by meaning. A team's memberships make no sense without the team: \`CASCADE\`. Invoices must survive a customer being removed: \`RESTRICT\`, and archive customers instead of deleting them.

**The SQLite catch:** for backwards compatibility, SQLite does *not* enforce foreign keys unless you switch them on, once per connection:

\`\`\`sql
PRAGMA foreign_keys = ON;
\`\`\`

Without it, \`REFERENCES\` is just documentation. Every app that uses SQLite should run this pragma as soon as it opens the database. \`PRAGMA foreign_keys;\` on its own tells you the current setting (1 is on).
--- task
Turn foreign key enforcement on, then create a table \`members\` with \`id\` (integer primary key), \`team_id\` (integer, required, referencing \`teams(id)\`, deleting a team deletes its members) and \`email\` (text, required).
--- starter
CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  team_id INTEGER NOT NULL,
  email TEXT NOT NULL
);
--- solution
PRAGMA foreign_keys = ON;

CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  email TEXT NOT NULL
);
--- hint
\`team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE\`.
--- hint
Enforcement is off until you run \`PRAGMA foreign_keys = ON;\` — put it first.
--- check query | Foreign keys are enforced
PRAGMA foreign_keys
=> [[1]]
--- check query | team_id references teams(id) and cascades on delete
SELECT "table", "from", "to", on_delete FROM pragma_foreign_key_list('members')
=> [["teams", "team_id", "id", "CASCADE"]]
--- check query | Members can be added to real teams
INSERT INTO members (id, team_id, email) VALUES (1, 1, 'ana@acme.io'), (2, 1, 'bo@acme.io'), (3, 2, 'cy@acme.io') RETURNING id
=> [[1], [2], [3]]
--- check query | Deleting Platform removes its members, and only them
DELETE FROM teams WHERE id = 1;
SELECT id FROM members ORDER BY id
=> [[3]]

=== sql3-11 | Design: normalising a flat table
--- schema
CREATE TABLE orders_flat (
  order_id INTEGER NOT NULL,
  placed TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  sku TEXT NOT NULL,
  product_name TEXT NOT NULL,
  unit_price REAL NOT NULL,
  qty INTEGER NOT NULL
);
INSERT INTO orders_flat VALUES
  (101, '2024-05-01', 'ana@mail.com', 'Ana Ruiz', 'MUG-1', 'Mug',       9.00, 2),
  (101, '2024-05-01', 'ana@mail.com', 'Ana Ruiz', 'PEN-2', 'Pen',       3.50, 4),
  (102, '2024-05-03', 'bo@mail.com',  'Bo Chen',  'MUG-1', 'Mug',       9.00, 1),
  (103, '2024-05-09', 'ana@mail.com', 'Ana Ruiz', 'LMP-3', 'Desk lamp', 45.00, 1),
  (104, '2024-06-02', 'bo@mail.com',  'Bo Chen',  'MUG-1', 'Mug',       10.00, 3),
  (104, '2024-06-02', 'bo@mail.com',  'Bo Chen',  'PEN-2', 'Pen',       3.50, 1);
--- teach
Spreadsheet exports often arrive as one wide table: every order line repeats the customer's name and the product's name. It works until it doesn't:

- **Update anomaly** — Ana changes her name; you must update every one of her rows, and missing one leaves her with two names.
- **Insert anomaly** — you cannot record a new product until someone orders it.
- **Delete anomaly** — delete Bo's only order and you lose the fact that Bo exists.

**Normalising** splits the table so every fact is stored once, in the table it describes. Ask of each column: *what is this a fact about?*

- \`customer_name\` is a fact about a customer → \`customers\`
- \`product_name\` is a fact about a product → \`products\`
- \`placed\` is a fact about an order → \`orders\`
- \`qty\` is a fact about one product in one order → \`order_items\`
- \`unit_price\`? Look at the data: the Mug cost 9.00 in May and 10.00 in June. It is what was **charged on that line**, so it belongs on \`order_items\`, not on \`products\`. Putting it on products would rewrite history.

Each table gets a key, and the links become foreign keys. Then fill the new tables from the old one with \`INSERT … SELECT DISTINCT\`:

\`\`\`sql
INSERT INTO customers (email, name)
SELECT DISTINCT customer_email, customer_name FROM orders_flat;
\`\`\`

Leaving out an \`INTEGER PRIMARY KEY\` lets SQLite number the rows. To link orders to those new ids, join back on the natural key: \`JOIN customers c ON c.email = f.customer_email\`.

The test that you lost nothing: joining the new tables back together must reproduce the flat table exactly.
--- task
Split \`orders_flat\` into four tables and fill them from it:

- \`customers\` — \`id\` (integer primary key), \`email\` (text, required, unique), \`name\` (text, required)
- \`products\` — \`sku\` (text primary key), \`name\` (text, required)
- \`orders\` — \`id\` (integer primary key, the old \`order_id\`), \`customer_id\` (references \`customers(id)\`), \`placed\`
- \`order_items\` — \`order_id\` (references \`orders(id)\`), \`sku\` (references \`products(sku)\`), \`qty\`, \`unit_price\`, with the primary key \`(order_id, sku)\`
--- starter
-- Design the four tables, then fill them from orders_flat.
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL
);
--- solution
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL
);
CREATE TABLE products (
  sku TEXT PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  placed TEXT NOT NULL
);
CREATE TABLE order_items (
  order_id INTEGER NOT NULL REFERENCES orders(id),
  sku TEXT NOT NULL REFERENCES products(sku),
  qty INTEGER NOT NULL,
  unit_price REAL NOT NULL,
  PRIMARY KEY (order_id, sku)
);

INSERT INTO customers (email, name)
SELECT DISTINCT customer_email, customer_name FROM orders_flat;

INSERT INTO products (sku, name)
SELECT DISTINCT sku, product_name FROM orders_flat;

INSERT INTO orders (id, customer_id, placed)
SELECT DISTINCT f.order_id, c.id, f.placed
FROM orders_flat f
JOIN customers c ON c.email = f.customer_email;

INSERT INTO order_items (order_id, sku, qty, unit_price)
SELECT order_id, sku, qty, unit_price FROM orders_flat;
--- hint
Create all four tables first. \`order_items\` ends with \`PRIMARY KEY (order_id, sku)\` as a table constraint.
--- hint
Fill customers and products with \`INSERT … SELECT DISTINCT\`, then orders by joining \`orders_flat\` to \`customers\` on the email to find each \`customer_id\`.
--- hint
Keep \`unit_price\` on \`order_items\`: the Mug's price changed between orders.
--- check query | Each fact stored once: 2 customers, 3 products, 4 orders, 6 items
SELECT (SELECT COUNT(*) FROM customers), (SELECT COUNT(*) FROM products), (SELECT COUNT(*) FROM orders), (SELECT COUNT(*) FROM order_items)
=> [[2, 3, 4, 6]]
--- check query | Joining the tables back reproduces the flat table exactly
SELECT COUNT(*) FROM (
  SELECT order_id, placed, customer_email, customer_name, sku, product_name, unit_price, qty FROM orders_flat
  EXCEPT
  SELECT o.id, o.placed, c.email, c.name, p.sku, p.name, oi.unit_price, oi.qty
  FROM order_items oi
  JOIN orders o    ON o.id = oi.order_id
  JOIN customers c ON c.id = o.customer_id
  JOIN products p  ON p.sku = oi.sku
)
=> [[0]]
--- check query | order_items has the composite primary key (order_id, sku)
SELECT name FROM pragma_table_info('order_items') WHERE pk > 0 ORDER BY pk
=> [["order_id"], ["sku"]]
--- check query | Customer emails are unique
SELECT COUNT(*) FROM pragma_index_list('customers') WHERE "unique" = 1
=> [[1]]
--- check query | products has no price column (the price lives on the order line)
SELECT COUNT(*) FROM pragma_table_info('products') WHERE name LIKE '%price%'
=> [[0]]

=== sql3-12 | Indexes and EXPLAIN QUERY PLAN
--- schema
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  placed TEXT NOT NULL,
  total REAL NOT NULL
);
WITH RECURSIVE n(i) AS (SELECT 1 UNION ALL SELECT i + 1 FROM n WHERE i < 2000)
INSERT INTO orders (id, customer_id, placed, total)
SELECT i, i % 200, date('2024-01-01', '+' || (i % 300) || ' days'), (i * 37 % 500) / 4.0 FROM n;
--- teach
Without help, finding one customer's orders means reading **every** row of the table — a *full scan*. An **index** is a separate, sorted copy of some columns with a pointer back to each row, like the index at the back of a book. The database jumps to the right place in it instead of reading everything.

\`\`\`sql
CREATE INDEX idx_orders_customer ON orders(customer_id);
\`\`\`

To see what the database will actually do, put \`EXPLAIN QUERY PLAN\` in front of a query:

\`\`\`sql
EXPLAIN QUERY PLAN
SELECT id, total FROM orders WHERE customer_id = 7;
\`\`\`

The \`detail\` column tells the story:

- \`SCAN orders\` — reads the whole table. Fine for tiny tables; slow for big ones.
- \`SEARCH orders USING INDEX idx_orders_customer (customer_id=?)\` — jumps straight to the matching rows.
- \`USE TEMP B-TREE FOR ORDER BY\` — had to sort the result itself afterwards.

A **composite index** on several columns is sorted by the first, then the second within it — like a phone book by surname, then first name. An index on \`(customer_id, placed)\` can find one customer's orders **already in date order**, so \`WHERE customer_id = ? ORDER BY placed\` needs no sort step. The order of the columns matters: the column you test with \`=\` goes first; the one you sort or range over goes after it.

Indexes are not free: each one takes space and slows every insert and update a little, because it must be kept in step. Index for the queries you actually run.
--- task
The app's busiest query is:

\`\`\`sql
SELECT id, total FROM orders WHERE customer_id = 7 ORDER BY placed DESC;
\`\`\`

Create an index named \`idx_orders_customer_placed\` that lets it find the customer's rows **and** return them in order without a separate sort.
--- starter
CREATE INDEX idx_orders_customer_placed ON orders(placed);
--- solution
CREATE INDEX idx_orders_customer_placed ON orders(customer_id, placed);
--- hint
Look at the plan: \`EXPLAIN QUERY PLAN SELECT id, total FROM orders WHERE customer_id = 7 ORDER BY placed DESC;\`
--- hint
The column tested with \`=\` goes first in the index, the sort column second.
--- check query | The index covers customer_id, then placed
SELECT name FROM pragma_index_info('idx_orders_customer_placed') ORDER BY seqno
=> [["customer_id"], ["placed"]]
--- check query | The query searches the index and needs no sort step
EXPLAIN QUERY PLAN SELECT id, total FROM orders WHERE customer_id = 7 ORDER BY placed DESC
=> [[4, 0, 63, "SEARCH orders USING INDEX idx_orders_customer_placed (customer_id=?)"]]

=== sql3-13 | Transactions: all or nothing
--- schema
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  owner TEXT NOT NULL,
  balance INTEGER NOT NULL
);
INSERT INTO accounts (id, owner, balance) VALUES (1, 'Ana', 100), (2, 'Bo', 50), (3, 'Cy', 0);
CREATE TABLE transfers (
  id INTEGER PRIMARY KEY,
  from_id INTEGER NOT NULL,
  to_id INTEGER NOT NULL,
  amount INTEGER NOT NULL
);
--- teach
A transfer of money is three statements: take from one account, add to another, record the transfer. If the program crashes after the first, money has vanished. A **transaction** makes several statements one unit — either all of them happen, or none do:

\`\`\`sql
BEGIN;
UPDATE accounts SET balance = balance - 30 WHERE id = 1;
UPDATE accounts SET balance = balance + 30 WHERE id = 2;
INSERT INTO transfers (from_id, to_id, amount) VALUES (1, 2, 30);
COMMIT;
\`\`\`

- \`BEGIN\` starts the transaction.
- \`COMMIT\` makes every change permanent, together.
- \`ROLLBACK\` throws away every change since \`BEGIN\`, as if none had happened.

Until \`COMMIT\`, other connections do not see the changes, and if the process dies the database recovers to the state before \`BEGIN\`. That is the **A** (atomic) and **I** (isolated) in the *ACID* promise.

In an app the pattern is always the same: begin, do the work, check that everything went as expected, then commit — or roll back on any error or failed check. A failed check here might be a balance going negative, or an \`UPDATE\` that changed 0 rows because the account id was wrong. \`SELECT changes()\` tells you how many rows the last statement changed.

Transactions are also fast: SQLite writes to disk once per commit, so 10,000 inserts in one transaction can be hundreds of times faster than 10,000 separate ones.
--- task
Run two transfers, each as its own transaction:

1. Move **40** from Ana (id 1) to Cy (id 3): both balance updates and a row in \`transfers\`. Commit it.
2. Start moving **80** from Bo (id 2) to Cy: begin, update both balances, then query Bo's balance — it is negative, so **roll the whole transfer back**.
--- starter
UPDATE accounts SET balance = balance - 40 WHERE id = 1;
UPDATE accounts SET balance = balance + 40 WHERE id = 3;
INSERT INTO transfers (from_id, to_id, amount) VALUES (1, 3, 40);

UPDATE accounts SET balance = balance - 80 WHERE id = 2;
UPDATE accounts SET balance = balance + 80 WHERE id = 3;
INSERT INTO transfers (from_id, to_id, amount) VALUES (2, 3, 80);
--- solution
BEGIN;
UPDATE accounts SET balance = balance - 40 WHERE id = 1;
UPDATE accounts SET balance = balance + 40 WHERE id = 3;
INSERT INTO transfers (from_id, to_id, amount) VALUES (1, 3, 40);
COMMIT;

BEGIN;
UPDATE accounts SET balance = balance - 80 WHERE id = 2;
UPDATE accounts SET balance = balance + 80 WHERE id = 3;
SELECT balance FROM accounts WHERE id = 2;
ROLLBACK;
--- hint
Wrap the first transfer in \`BEGIN;\` … \`COMMIT;\`.
--- hint
Wrap the second in \`BEGIN;\` … and, after the \`SELECT\` shows Bo at -30, end it with \`ROLLBACK;\` instead of \`COMMIT;\`.
--- check query | Only the first transfer moved money
SELECT id, balance FROM accounts ORDER BY id
=> [[1, 60], [2, 50], [3, 40]]
--- check query | Only the first transfer was recorded
SELECT from_id, to_id, amount FROM transfers
=> [[1, 3, 40]]
--- check query | Money was neither created nor destroyed
SELECT SUM(balance) FROM accounts
=> [[150]]
--- check source | Rolls back the failed transfer
\\b[Rr][Oo][Ll][Ll][Bb][Aa][Cc][Kk]\\b

=== sql3-14 | UPSERT: insert or update
--- schema
CREATE TABLE daily_views (
  page TEXT NOT NULL,
  day TEXT NOT NULL,
  views INTEGER NOT NULL,
  PRIMARY KEY (page, day)
);
INSERT INTO daily_views (page, day, views) VALUES
  ('/pricing', '2024-07-01', 10),
  ('/docs',    '2024-07-01', 4);
CREATE TABLE raw_hits (
  page TEXT NOT NULL,
  ts TEXT NOT NULL
);
INSERT INTO raw_hits (page, ts) VALUES
  ('/pricing', '2024-07-01 22:10:00'),
  ('/pricing', '2024-07-01 23:59:59'),
  ('/pricing', '2024-07-02 00:00:01'),
  ('/docs',    '2024-07-02 09:30:00'),
  ('/blog',    '2024-07-01 12:00:00'),
  ('/blog',    '2024-07-01 12:05:00'),
  ('/blog',    '2024-07-01 13:00:00');
--- teach
Counters, settings and caches all need "insert this row, or if it already exists, update it". Doing it in two steps — \`SELECT\`, then \`INSERT\` or \`UPDATE\` — has a race: two requests can both see "no row" and both insert. **UPSERT** does it in one statement:

\`\`\`sql
INSERT INTO daily_views (page, day, views)
VALUES ('/pricing', '2024-07-01', 3)
ON CONFLICT (page, day) DO UPDATE SET views = views + excluded.views;
\`\`\`

- \`ON CONFLICT (page, day)\` names the **unique** constraint that decides "already exists" — it must match a primary key or unique index exactly.
- \`excluded\` is the row you tried to insert. \`excluded.views\` is the 3; plain \`views\` is the value already in the table.
- \`DO NOTHING\` instead of \`DO UPDATE\` keeps the existing row and moves on.

You can upsert many rows at once from a query. One SQLite parsing quirk: when the rows come from a \`SELECT\`, SQLite cannot tell whether \`ON\` begins a join or the conflict clause, so the \`SELECT\` needs a \`WHERE\` before \`ON CONFLICT\` — \`WHERE true\` is the customary way:

\`\`\`sql
INSERT INTO t (a, b)
SELECT a, b FROM staging WHERE true
ON CONFLICT (a) DO UPDATE SET b = excluded.b;
\`\`\`

Compare \`INSERT OR REPLACE\`: it *deletes* the old row and inserts a new one, so any columns you did not supply are lost, and delete triggers fire. UPSERT updates in place.
--- task
Fold the raw hits into the daily counters with **one** \`INSERT … SELECT … ON CONFLICT\` statement: count \`raw_hits\` per page and calendar day (\`date(ts)\`), add each count to the existing row for that page and day, and create a row where none exists yet.
--- starter
INSERT INTO daily_views (page, day, views)
SELECT page, date(ts), COUNT(*)
FROM raw_hits
GROUP BY page, date(ts);
--- solution
INSERT INTO daily_views (page, day, views)
SELECT page, date(ts), COUNT(*)
FROM raw_hits
WHERE true
GROUP BY page, date(ts)
ON CONFLICT (page, day) DO UPDATE SET views = views + excluded.views;
--- hint
Run the starter: it fails, because \`/pricing\` on 2024-07-01 already exists.
--- hint
Add \`ON CONFLICT (page, day) DO UPDATE SET views = views + excluded.views\` — and a \`WHERE true\` before \`GROUP BY\` so SQLite parses it.
--- check query | Existing counters were added to, new ones created
SELECT page, day, views FROM daily_views ORDER BY page, day
=> [["/blog", "2024-07-01", 3], ["/docs", "2024-07-01", 4], ["/docs", "2024-07-02", 1], ["/pricing", "2024-07-01", 12], ["/pricing", "2024-07-02", 1]]
--- check source | Uses ON CONFLICT … DO UPDATE
[Oo][Nn]\\s+[Cc][Oo][Nn][Ff][Ll][Ii][Cc][Tt][\\s\\S]*[Dd][Oo]\\s+[Uu][Pp][Dd][Aa][Tt][Ee]

=== sql3-15 | Views: saved queries
--- teach
A **view** is a query with a name, stored in the database. You select from it like a table, but it holds no data: each time you use it, its query runs against the current tables.

\`\`\`sql
CREATE VIEW eng_team AS
SELECT name, title, salary FROM employees WHERE dept = 'eng';

SELECT * FROM eng_team WHERE salary > 100000;
\`\`\`

What views are good for:

- **One definition of a business number.** If "active customer" or "net revenue" is defined in one view, every report that uses the view agrees — and when the definition changes, it changes once.
- **Simpler queries.** Hide a five-table join behind a name.
- **A narrower surface.** Give a reporting tool the view, not the raw tables with salaries and emails.

Name the output columns clearly inside the view with \`AS\`, because those names are what everyone else sees.

A view is always up to date, because it is re-run every time. The price is that it is re-run every time: a slow query behind a view is still slow. (Other databases offer *materialized* views that store the result; in SQLite you build that yourself with a table and triggers.)

To change a view, \`DROP VIEW name;\` and create it again.
--- task
Create a view named \`dept_summary\` with one row per department and the columns \`dept\`, \`headcount\`, \`avg_salary\` (the average salary, rounded to the nearest whole number) and \`top_salary\` (the highest salary).
--- starter
SELECT dept, COUNT(*) AS headcount
FROM employees
GROUP BY dept;
--- solution
CREATE VIEW dept_summary AS
SELECT dept,
       COUNT(*) AS headcount,
       ROUND(AVG(salary)) AS avg_salary,
       MAX(salary) AS top_salary
FROM employees
GROUP BY dept;
--- hint
\`CREATE VIEW dept_summary AS\` followed by the \`SELECT\`.
--- hint
\`ROUND(AVG(salary)) AS avg_salary, MAX(salary) AS top_salary\`.
--- check query | The view gives one row per department
SELECT dept, headcount, avg_salary, top_salary FROM dept_summary ORDER BY dept
=> [["eng", 7, 126429.0, 200000], ["exec", 1, 250000.0, 250000], ["finance", 3, 123333.0, 190000]]
--- check query | It is a view, not a table
SELECT type FROM sqlite_master WHERE name = 'dept_summary'
=> [["view"]]
--- check query | It reflects changes to employees immediately
UPDATE employees SET salary = 260000 WHERE name = 'Lena';
SELECT top_salary FROM dept_summary WHERE dept = 'finance'
=> [[260000]]

=== sql3-16 | Triggers: reacting to changes
--- schema
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  stock INTEGER NOT NULL
);
INSERT INTO products (id, name, stock) VALUES (1, 'Mug', 20), (2, 'Lamp', 5);
CREATE TABLE order_lines (
  id INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  qty INTEGER NOT NULL
);
--- teach
A **trigger** is SQL the database runs by itself when something happens to a table. It keeps derived data in step no matter which code made the change:

\`\`\`sql
CREATE TRIGGER line_added
AFTER INSERT ON order_lines
BEGIN
  UPDATE products SET stock = stock - NEW.qty WHERE id = NEW.product_id;
END;
\`\`\`

- **When:** \`BEFORE\` or \`AFTER\`, and the event: \`INSERT\`, \`UPDATE\` (or \`UPDATE OF column\`), \`DELETE\`.
- **Which rows:** it runs once for each affected row.
- **The row:** \`NEW\` is the row as inserted or updated; \`OLD\` is the row as it was before an update or delete. An insert has no \`OLD\`, a delete no \`NEW\`.
- **The body** sits between \`BEGIN\` and \`END;\`, with a \`;\` after each statement inside.

A \`WHEN\` condition limits when it fires: \`AFTER UPDATE OF price ON products WHEN NEW.price <> OLD.price\`. And a \`BEFORE\` trigger can refuse a change with \`SELECT RAISE(ABORT, 'message')\`.

Use triggers sparingly. They are invisible to someone reading the application code, and a chain of triggers firing triggers is hard to reason about. They shine for rules that must hold whatever writes the data: stock counts, audit logs, \`updated_at\` stamps.
--- task
Create two triggers that keep \`products.stock\` in step with \`order_lines\`:

- \`order_line_added\` — after a line is inserted, take its \`qty\` off the product's stock.
- \`order_line_removed\` — after a line is deleted, put its \`qty\` back.
--- starter
CREATE TRIGGER order_line_added
AFTER INSERT ON order_lines
BEGIN
  SELECT 1;
END;
--- solution
CREATE TRIGGER order_line_added
AFTER INSERT ON order_lines
BEGIN
  UPDATE products SET stock = stock - NEW.qty WHERE id = NEW.product_id;
END;

CREATE TRIGGER order_line_removed
AFTER DELETE ON order_lines
BEGIN
  UPDATE products SET stock = stock + OLD.qty WHERE id = OLD.product_id;
END;
--- hint
Inside the first trigger: \`UPDATE products SET stock = stock - NEW.qty WHERE id = NEW.product_id;\`
--- hint
The delete trigger uses \`OLD\`, because a deleted row has no \`NEW\`.
--- check query | Adding lines takes stock
INSERT INTO order_lines (id, product_id, qty) VALUES (1, 1, 3), (2, 2, 2), (3, 1, 4);
SELECT id, stock FROM products ORDER BY id
=> [[1, 13], [2, 3]]
--- check query | Deleting a line gives its stock back
DELETE FROM order_lines WHERE id = 3;
SELECT id, stock FROM products ORDER BY id
=> [[1, 17], [2, 3]]
--- check query | Both triggers exist
SELECT name FROM sqlite_master WHERE type = 'trigger' ORDER BY name
=> [["order_line_added"], ["order_line_removed"]]

=== sql3-17 | RETURNING: see what you changed
--- schema
CREATE TABLE tickets (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  opened TEXT NOT NULL,
  closed TEXT
);
INSERT INTO tickets (id, title, status, opened, closed) VALUES
  (1, 'Login fails on Safari',   'open',    '2024-06-02', NULL),
  (2, 'Export is slow',          'open',    '2024-06-20', NULL),
  (3, 'Typo on pricing page',    'closed',  '2024-06-05', '2024-06-06'),
  (4, 'Webhook retries',         'open',    '2024-07-03', NULL),
  (5, 'Dark mode contrast',      'pending', '2024-06-11', NULL);
--- teach
After an \`INSERT\`, \`UPDATE\` or \`DELETE\`, the app often needs to know what happened: the id the new row got, or which rows a bulk update touched. Without help that means a second query — and a second query can see a different world if another writer got in between. \`RETURNING\` hands the affected rows back from the same statement:

\`\`\`sql
INSERT INTO tickets (title, opened) VALUES ('New bug', '2024-07-09')
RETURNING id, status;          -- the generated id, and the default status

DELETE FROM tickets WHERE status = 'closed'
RETURNING id, title;           -- exactly what was deleted
\`\`\`

\`RETURNING\` takes any expressions over the row's columns, the way a \`SELECT\` list does, and shows the row **after** the change (for a delete, as it was just before it went). It returns one row per affected row, and nothing if no row matched — useful in itself: "did that update find its row?"

It pairs well with the safe-change routine: the returned rows are your record of what the statement actually did.
--- task
Close every **open** ticket opened before \`2024-07-01\`: set its \`status\` to \`'closed'\` and \`closed\` to \`'2024-07-10'\`. In the same statement, return the \`id\` and \`title\` of each ticket you closed.
--- starter
UPDATE tickets
SET status = 'closed', closed = '2024-07-10'
WHERE opened < '2024-07-01';
--- solution
UPDATE tickets
SET status = 'closed', closed = '2024-07-10'
WHERE status = 'open' AND opened < '2024-07-01'
RETURNING id, title;
--- hint
Only \`open\` tickets: the pending one and the already-closed one must not change.
--- hint
End the \`UPDATE\` with \`RETURNING id, title\`.
--- check result | Returns tickets 1 and 2
[[1, "Login fails on Safari"], [2, "Export is slow"]]
--- check query | Exactly those two changed
SELECT id, status, closed FROM tickets ORDER BY id
=> [[1, "closed", "2024-07-10"], [2, "closed", "2024-07-10"], [3, "closed", "2024-06-06"], [4, "open", null], [5, "pending", null]]
`,Me=`@track sql
@level expert
@title SQL · Expert
@name SQL, expert: fast queries, hard questions and trustworthy data
@blurb Make slow queries fast and prove it with the query plan, answer the analyst's hardest questions — top-N, streaks, sessions, cohorts, funnels — and find and repair broken data yourself.

=== sql4-01 | Sargable predicates
--- schema
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  created TEXT NOT NULL,
  total REAL NOT NULL
);
WITH RECURSIVE n(i) AS (SELECT 1 UNION ALL SELECT i + 1 FROM n WHERE i < 3000)
INSERT INTO orders (id, customer_id, created, total)
SELECT i, i % 400 + 1, datetime('2024-03-01', '+' || (i * 37 % 44640) || ' minutes'), (i * 53 % 400) / 4.0 + 5 FROM n;
CREATE INDEX idx_orders_created ON orders(created);
--- teach
The advanced course taught you to create indexes and read \`EXPLAIN QUERY PLAN\`. This course puts them to work on slow queries, then takes on the analyst's hardest questions and data that needs repairing. Each lesson brings its own tables; the lesson text says what they are. Here: \`orders\` (\`id\`, \`customer_id\`, \`created\` as \`'YYYY-MM-DD HH:MM:SS'\`, \`total\`) — 3,000 rows in March 2024 — with an index \`idx_orders_created\` on \`created\`.

An index is sorted by the **stored value** of its columns. It can find \`created >= '2024-03-15'\` by jumping into the sorted list. But look at this:

\`\`\`sql
SELECT COUNT(*) FROM orders WHERE date(created) = '2024-03-15';
\`\`\`

The index is sorted by \`created\`, not by \`date(created)\`. To know which rows match, the database has to compute \`date()\` for **every** row: a full scan, index ignored. \`EXPLAIN QUERY PLAN\` shows \`SCAN orders\`.

A predicate the database can answer from an index is called **sargable** (from *Search ARGument ABLE*). The rule: leave the indexed column **bare** on one side of the comparison, and move all the computing to the other side:

| not sargable | sargable rewrite |
| --- | --- |
| \`date(created) = '2024-03-15'\` | \`created >= '2024-03-15' AND created < '2024-03-16'\` |
| \`strftime('%Y', created) = '2024'\` | \`created >= '2024-01-01' AND created < '2025-01-01'\` |
| \`total * 1.2 > 120\` | \`total > 100\` |
| \`substr(sku, 1, 3) = 'MUG'\` | \`sku >= 'MUG' AND sku < 'MUH'\` |

Use a half-open range (\`>=\` start, \`<\` next start). \`BETWEEN '2024-03-15' AND '2024-03-15 23:59:59'\` works too, but is easy to get wrong at the edges.

When you truly must search on an expression — say \`lower(email)\` — index the expression itself: \`CREATE INDEX idx_email_lower ON users(lower(email));\`. The query must then use exactly that expression.

A view's plan is its query's plan, so \`EXPLAIN QUERY PLAN SELECT * FROM some_view\` shows how the view's query runs.
--- task
The dashboard lists the orders of 15 March 2024 with this slow query:

\`\`\`sql
SELECT id, created, total FROM orders WHERE date(created) = '2024-03-15';
\`\`\`

Create a view named \`orders_mar_15\` with the same columns (\`id\`, \`created\`, \`total\`) and the same rows, rewritten so it uses \`idx_orders_created\`.
--- starter
CREATE VIEW orders_mar_15 AS
SELECT id, created, total
FROM orders
WHERE date(created) = '2024-03-15';
--- solution
CREATE VIEW orders_mar_15 AS
SELECT id, created, total
FROM orders
WHERE created >= '2024-03-15' AND created < '2024-03-16';
--- hint
Run \`EXPLAIN QUERY PLAN SELECT * FROM orders_mar_15;\` on the starter: \`SCAN orders\`.
--- hint
Leave \`created\` bare: a range from \`'2024-03-15'\` (inclusive) to \`'2024-03-16'\` (exclusive).
--- check query | Same rows as the slow query: 117 orders worth 6561.00
SELECT COUNT(*), ROUND(SUM(total), 2), MIN(created) >= '2024-03-15', MAX(created) < '2024-03-16' FROM orders_mar_15
=> [[117, 6561.0, 1, 1]]
--- check query | No order of the day is missed
SELECT COUNT(*) FROM orders WHERE date(created) = '2024-03-15' AND id NOT IN (SELECT id FROM orders_mar_15)
=> [[0]]
--- check query | The plan searches idx_orders_created with a range
EXPLAIN QUERY PLAN SELECT * FROM orders_mar_15
=> [[3, 0, 165, "SEARCH orders USING INDEX idx_orders_created (created>? AND created<?)"]]

=== sql4-02 | Covering indexes and column order
--- schema
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  status TEXT NOT NULL,
  total REAL NOT NULL
);
WITH RECURSIVE n(i) AS (SELECT 1 UNION ALL SELECT i + 1 FROM n WHERE i < 3000)
INSERT INTO orders (id, customer_id, status, total)
SELECT i, i % 250 + 1, CASE i % 5 WHEN 0 THEN 'refunded' WHEN 1 THEN 'pending' ELSE 'paid' END, (i * 29 % 300) / 2.0 FROM n;
--- teach
This lesson's table: \`orders\` (\`id\`, \`customer_id\`, \`status\`, \`total\`), 3,000 rows, no indexes yet.

When a query uses an index, it normally does two lookups per row: find the entry in the index, then follow its pointer to the table row to fetch the other columns. If the index **already contains every column the query needs**, the second lookup disappears. That is a **covering index**, and the plan says so: \`USING COVERING INDEX\`.

Take the report every finance team wants:

\`\`\`sql
SELECT customer_id, COUNT(*) AS orders, SUM(total) AS spent
FROM orders
WHERE status = 'paid'
GROUP BY customer_id;
\`\`\`

It needs \`status\` (to filter), \`customer_id\` (to group) and \`total\` (to sum). The column **order** in the index decides what it can do:

1. **Equality columns first.** \`status = 'paid'\` jumps to one contiguous block of the index only if \`status\` leads.
2. **Then the grouping or sorting column.** Within the \`status = 'paid'\` block, entries are sorted by the next column. With \`customer_id\` next, rows arrive already grouped, so there is no \`USE TEMP B-TREE FOR GROUP BY\` step.
3. **Then the columns you only read.** \`total\` rides along so the table is never touched.

Get the order wrong and the plan tells you. With \`(customer_id, status, total)\` the index still covers the query, but \`status\` is not first, so the database reads the whole index: \`SCAN orders USING COVERING INDEX\`. Better than a table scan — but still every entry.

Covering indexes are the sharpest tool for a hot query, and the most specific. Wide indexes cost space and write speed, so build them for the few queries that matter.
--- task
Create an index named \`idx_orders_status_customer_total\` that makes the report above search only the paid orders, read nothing from the table itself, and need no separate grouping step.
--- starter
CREATE INDEX idx_orders_status_customer_total ON orders(customer_id, status, total);
--- solution
CREATE INDEX idx_orders_status_customer_total ON orders(status, customer_id, total);
--- hint
Check the plan: \`EXPLAIN QUERY PLAN SELECT customer_id, COUNT(*), SUM(total) FROM orders WHERE status = 'paid' GROUP BY customer_id;\`
--- hint
Equality column first, then the grouping column, then the column you only read.
--- check query | The index columns are status, customer_id, total
SELECT name FROM pragma_index_info('idx_orders_status_customer_total') ORDER BY seqno
=> [["status"], ["customer_id"], ["total"]]
--- check query | The report searches a covering index, with no temp B-tree
EXPLAIN QUERY PLAN SELECT customer_id, COUNT(*) AS orders, SUM(total) AS spent FROM orders WHERE status = 'paid' GROUP BY customer_id
=> [[6, 0, 56, "SEARCH orders USING COVERING INDEX idx_orders_status_customer_total (status=?)"]]

=== sql4-03 | Top N per group
--- schema
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  units_sold INTEGER
);
INSERT INTO products (id, category, name, units_sold) VALUES
  (1,  'books', 'Atlas',      50),
  (2,  'books', 'Bestiary',   50),
  (3,  'books', 'Cookbook',   30),
  (4,  'books', 'Diary',      10),
  (5,  'games', 'Echo',       80),
  (6,  'games', 'Fable',      60),
  (7,  'games', 'Gambit',     60),
  (8,  'games', 'Hexa',       20),
  (9,  'music', 'Intro',      15),
  (10, 'toys',  'Jigsaw',     NULL),
  (11, 'toys',  'Kite',       5);
--- teach
This lesson's table: \`products\` (\`id\`, \`category\`, \`name\`, \`units_sold\` — NULL when no sales have been recorded yet).

"The best two sellers in **each** category" is one of the most asked questions in analytics, and \`LIMIT\` cannot answer it: \`LIMIT\` applies to the whole result, not per group. The pattern is: **rank within each group with a window function, then filter on the rank.**

Window functions are computed after \`WHERE\`, so you cannot filter on one in the same query. Rank in a CTE, filter outside it:

\`\`\`sql
WITH ranked AS (
  SELECT category, name, units_sold,
         RANK() OVER (PARTITION BY category ORDER BY units_sold DESC) AS pos
  FROM products
)
SELECT * FROM ranked WHERE pos <= 2;
\`\`\`

The choice of ranking function **is** the definition of "top 2", so make it on purpose:

- \`ROW_NUMBER()\` — exactly two rows per category. Ties are cut arbitrarily unless you add a tie-breaker (\`ORDER BY units_sold DESC, id\`).
- \`RANK()\` — everyone whose position is 1 or 2. If two tie for second, you get three rows; if two tie for *first*, the next one is third and is left out.
- \`DENSE_RANK()\` — the top two **values**, and every product that has one of them.

And decide what NULL means. In SQLite, NULL sorts *below* every number in \`DESC\` order — so a product with no data would rank after the real ones and could sneak into a top-2 for a small category. "No sales recorded" is not a ranking; filter it out before you rank.
--- task
Return the top two products per category by \`units_sold\`, keeping ties: every product whose \`RANK()\` in its category is 1 or 2. Ignore products with no recorded sales. Columns: \`category\`, \`name\`, \`units_sold\`, \`pos\` (the rank). Sort by category, then pos, then name.
--- starter
SELECT category, name, units_sold
FROM products
ORDER BY units_sold DESC
LIMIT 2;
--- solution
WITH ranked AS (
  SELECT category, name, units_sold,
         RANK() OVER (PARTITION BY category ORDER BY units_sold DESC) AS pos
  FROM products
  WHERE units_sold IS NOT NULL
)
SELECT category, name, units_sold, pos
FROM ranked
WHERE pos <= 2
ORDER BY category, pos, name;
--- hint
Compute \`RANK() OVER (PARTITION BY category ORDER BY units_sold DESC)\` in a CTE, then keep \`pos <= 2\` outside it.
--- hint
Filter \`units_sold IS NOT NULL\` inside the CTE, before ranking — otherwise Jigsaw ranks second among toys.
--- check result | Both tied books, three games (a tie for second), Intro and Kite alone
ordered
[["books", "Atlas", 50, 1], ["books", "Bestiary", 50, 1], ["games", "Echo", 80, 1], ["games", "Fable", 60, 2], ["games", "Gambit", 60, 2], ["music", "Intro", 15, 1], ["toys", "Kite", 5, 1]]

=== sql4-04 | Gaps and islands: streaks
--- schema
CREATE TABLE logins (
  user_id INTEGER NOT NULL,
  day TEXT NOT NULL
);
INSERT INTO logins (user_id, day) VALUES
  (1, '2024-07-01'), (1, '2024-07-02'), (1, '2024-07-02'), (1, '2024-07-03'),
  (1, '2024-07-05'), (1, '2024-07-06'), (1, '2024-07-09'),
  (2, '2024-07-01'), (2, '2024-07-03'), (2, '2024-07-04'), (2, '2024-07-05'), (2, '2024-07-06'),
  (3, '2024-07-10');
--- teach
This lesson's table: \`logins\` (\`user_id\`, \`day\`) — one row per login, and a user can log in more than once a day.

"How long is each user's streak of consecutive days?" is a **gaps-and-islands** problem: find the runs (islands) of consecutive values separated by gaps. It looks like it needs a loop. It needs one trick.

Number each user's days in order with \`ROW_NUMBER()\`. Within a run of consecutive days, the day goes up by 1 and the row number goes up by 1 — so **day minus row number stays constant** for the whole run, and jumps when there is a gap:

| day | row number | day − row number |
| --- | --- | --- |
| 07-01 | 1 | 06-30 |
| 07-02 | 2 | 06-30 |
| 07-03 | 3 | 06-30 |
| 07-05 | 4 | 07-01 |
| 07-06 | 5 | 07-01 |

That constant is an **island key**. Group by user and key, and each group is one streak: \`MIN(day)\` starts it, \`MAX(day)\` ends it, \`COUNT(*)\` is its length.

\`\`\`sql
date(day, '-' || ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY day) || ' days') AS grp
\`\`\`

The trap is **duplicates**. Two logins on 07-02 give that day two row numbers, the difference shifts by one, and the streak splits in the wrong place. Reduce the data to one row per user per day *first* (\`SELECT DISTINCT\`), then number it.

The same trick finds runs of consecutive ids, months without an outage, and any other "consecutive" question.
--- task
Return every login streak: \`user_id\`, \`streak_start\`, \`streak_end\` and \`days\` (its length). A single day on its own is a streak of 1. Sort by user, then start.
--- starter
SELECT user_id, MIN(day) AS streak_start, MAX(day) AS streak_end, COUNT(*) AS days
FROM logins
GROUP BY user_id;
--- solution
WITH days AS (
  SELECT DISTINCT user_id, day FROM logins
), keyed AS (
  SELECT user_id, day,
         date(day, '-' || ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY day) || ' days') AS grp
  FROM days
)
SELECT user_id, MIN(day) AS streak_start, MAX(day) AS streak_end, COUNT(*) AS days
FROM keyed
GROUP BY user_id, grp
ORDER BY user_id, streak_start;
--- hint
First reduce to one row per user per day with \`SELECT DISTINCT user_id, day\`.
--- hint
The island key: \`date(day, '-' || ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY day) || ' days')\`. Consecutive days share it.
--- hint
Group by \`user_id\` and the key; \`MIN\`, \`MAX\` and \`COUNT(*)\` give each streak.
--- check result | Six streaks; the double login on 2 July does not split user 1's first streak
ordered
[[1, "2024-07-01", "2024-07-03", 3], [1, "2024-07-05", "2024-07-06", 2], [1, "2024-07-09", "2024-07-09", 1], [2, "2024-07-01", "2024-07-01", 1], [2, "2024-07-03", "2024-07-06", 4], [3, "2024-07-10", "2024-07-10", 1]]

=== sql4-05 | Sessionising events
--- schema
CREATE TABLE events (
  user_id INTEGER NOT NULL,
  ts TEXT NOT NULL
);
INSERT INTO events (user_id, ts) VALUES
  (1, '2024-07-01 09:00:00'), (1, '2024-07-01 09:10:00'), (1, '2024-07-01 09:40:00'),
  (1, '2024-07-01 10:20:00'), (1, '2024-07-01 10:25:00'), (1, '2024-07-01 13:00:00'),
  (2, '2024-07-01 09:05:00'), (2, '2024-07-01 11:00:00'), (2, '2024-07-01 11:29:00');
--- teach
This lesson's table: \`events\` (\`user_id\`, \`ts\`) — one row per thing a user did in the app.

Product analytics thinks in **sessions**: a burst of activity, ended by a stretch of silence. The usual rule: a new session starts when more than 30 minutes pass since the user's previous event. There is no session id in the data; you derive it in three steps, each a window function.

1. **Gap to the previous event.** \`LAG(ts) OVER (PARTITION BY user_id ORDER BY ts)\`.
2. **Flag session starts.** 1 when there is no previous event or the gap is over 30 minutes, else 0.
3. **Number the sessions.** A running \`SUM\` of the flags: it goes up by one at each start, so every event gets the number of its session.

\`\`\`sql
SUM(is_start) OVER (PARTITION BY user_id ORDER BY ts
                    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS session
\`\`\`

Then group by \`user_id, session\` for start, end and size.

Measure time gaps in whole **seconds**, not fractions of days. \`julianday(b) - julianday(a)\` is a floating-point number, and multiplying it back up to minutes can give 29.9999999 for exactly 30 minutes — so an edge case silently lands on the wrong side. \`unixepoch(ts)\` gives integer seconds, and \`unixepoch(b) - unixepoch(a) > 1800\` is exact.

This "flag the boundaries, then running-sum the flags" pattern is worth remembering on its own: it turns any "start a new group when …" rule into a group number.
--- task
Split each user's events into sessions (a new session starts when **more than** 30 minutes have passed since that user's previous event). Return \`user_id\`, \`session\` (1, 2, … per user, in time order), \`started\`, \`ended\` and \`events\` (the count). Sort by user, then session.
--- starter
SELECT user_id, 1 AS session, MIN(ts) AS started, MAX(ts) AS ended, COUNT(*) AS events
FROM events
GROUP BY user_id;
--- solution
WITH gaps AS (
  SELECT user_id, ts,
         CASE
           WHEN LAG(ts) OVER (PARTITION BY user_id ORDER BY ts) IS NULL THEN 1
           WHEN unixepoch(ts) - unixepoch(LAG(ts) OVER (PARTITION BY user_id ORDER BY ts)) > 1800 THEN 1
           ELSE 0
         END AS is_start
  FROM events
), numbered AS (
  SELECT user_id, ts,
         SUM(is_start) OVER (PARTITION BY user_id ORDER BY ts
                             ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS session
  FROM gaps
)
SELECT user_id, session, MIN(ts) AS started, MAX(ts) AS ended, COUNT(*) AS events
FROM numbered
GROUP BY user_id, session
ORDER BY user_id, session;
--- hint
Step one: a CTE with \`is_start\`, 1 when \`LAG(ts)\` is NULL or the gap is over 1800 seconds.
--- hint
Step two: \`SUM(is_start) OVER (PARTITION BY user_id ORDER BY ts ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)\` numbers the sessions.
--- hint
Compare \`unixepoch(ts) - unixepoch(previous ts)\` with 1800; exactly 30 minutes (09:10 to 09:40) stays in the same session.
--- check result | Five sessions; a gap of exactly 30 minutes does not split
ordered
[[1, 1, "2024-07-01 09:00:00", "2024-07-01 09:40:00", 3], [1, 2, "2024-07-01 10:20:00", "2024-07-01 10:25:00", 2], [1, 3, "2024-07-01 13:00:00", "2024-07-01 13:00:00", 1], [2, 1, "2024-07-01 09:05:00", "2024-07-01 09:05:00", 1], [2, 2, "2024-07-01 11:00:00", "2024-07-01 11:29:00", 2]]

=== sql4-06 | Deduplicating: keep the latest row
--- schema
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  updated_at TEXT NOT NULL
);
INSERT INTO contacts (id, email, name, phone, updated_at) VALUES
  (1, 'ana@mail.com',  'Ana',      '111', '2024-01-01'),
  (2, 'ANA@mail.com',  'Ana Ruiz', '222', '2024-03-01'),
  (3, 'bo@mail.com',   'Bo',       '333', '2024-02-01'),
  (4, 'bo@mail.com',   'Bo Chen',  '444', '2024-02-01'),
  (5, 'cy@mail.com',   'Cy',       '555', '2024-01-15'),
  (6, ' ana@mail.com', 'Ana',      '666', '2024-02-01');
--- teach
This lesson's table: \`contacts\` (\`id\`, \`email\`, \`name\`, \`phone\`, \`updated_at\`), filled by several imports that never checked for duplicates.

Deduplication has three decisions, and the SQL is the easy part:

1. **What makes two rows "the same"?** Here, the email — but \`'ANA@mail.com'\` and \`' ana@mail.com'\` are the same person, so the key is \`lower(trim(email))\`.
2. **Which copy survives?** The most recently updated one.
3. **What breaks a tie?** Rows 3 and 4 were both updated on 2024-02-01. Without a rule, which one survives is luck — and a re-run may choose differently. Choose a deterministic tie-breaker: the higher id (the later insert).

\`ROW_NUMBER()\` encodes all three: partition by the key, order by the survival rule and the tie-breaker, and the row numbered 1 in each partition is the keeper.

\`\`\`sql
SELECT id,
       ROW_NUMBER() OVER (
         PARTITION BY lower(trim(email))
         ORDER BY updated_at DESC, id DESC
       ) AS rn
FROM contacts;
\`\`\`

Then delete everything that is not a keeper: \`DELETE FROM contacts WHERE id NOT IN (SELECT id FROM … WHERE rn = 1)\`. Run it as a \`SELECT\` first and read the list.

Cleaning without prevention is a chore you will repeat. Finish by making the duplicate impossible: a **unique index on the expression**, so the database itself refuses a second \`' Ana@Mail.com'\`:

\`\`\`sql
CREATE UNIQUE INDEX contacts_email_key ON contacts(lower(trim(email)));
\`\`\`

(A unique index cannot be created while duplicates still exist — so the order is always clean, then constrain.)
--- task
Delete the duplicate contacts, keeping for each email (compared lower-cased and trimmed) only the row with the latest \`updated_at\`, and on a tie the higher \`id\`. Then create a unique index named \`contacts_email_key\` on \`lower(trim(email))\`.
--- starter
DELETE FROM contacts
WHERE id NOT IN (SELECT MAX(id) FROM contacts GROUP BY email);
--- solution
DELETE FROM contacts
WHERE id NOT IN (
  SELECT id FROM (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY lower(trim(email))
             ORDER BY updated_at DESC, id DESC
           ) AS rn
    FROM contacts
  )
  WHERE rn = 1
);

CREATE UNIQUE INDEX contacts_email_key ON contacts(lower(trim(email)));
--- hint
The starter groups by the raw email, so the three spellings of Ana's address stay apart — and \`MAX(id)\` ignores \`updated_at\`.
--- hint
Number rows with \`ROW_NUMBER() OVER (PARTITION BY lower(trim(email)) ORDER BY updated_at DESC, id DESC)\`, and delete every id that is not numbered 1.
--- check query | One row per person: the latest, ties to the higher id
SELECT id, name, phone FROM contacts ORDER BY id
=> [[2, "Ana Ruiz", "222"], [4, "Bo Chen", "444"], [5, "Cy", "555"]]
--- check query | A differently-spelled duplicate is now refused
INSERT OR IGNORE INTO contacts (email, name, updated_at) VALUES (' CY@mail.com', 'Cy again', '2024-05-01') RETURNING id
=> []
--- check query | A new address is still welcome
INSERT OR IGNORE INTO contacts (id, email, name, updated_at) VALUES (7, 'dee@mail.com', 'Dee', '2024-05-01') RETURNING id
=> [[7]]

=== sql4-07 | Pivoting with conditional aggregation
--- schema
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  created TEXT NOT NULL,
  status TEXT NOT NULL,
  total REAL NOT NULL
);
INSERT INTO orders (id, created, status, total) VALUES
  (1,  '2024-01-05', 'paid',      100.00),
  (2,  '2024-01-09', 'paid',       50.00),
  (3,  '2024-01-20', 'cancelled',  30.00),
  (4,  '2024-02-02', 'paid',       80.00),
  (5,  '2024-02-14', 'refunded',   80.00),
  (6,  '2024-02-15', 'paid',       20.50),
  (7,  '2024-02-28', 'paid',       10.00),
  (8,  '2024-03-01', 'cancelled',  15.00),
  (9,  '2024-03-03', 'paid',       60.00),
  (10, '2024-03-19', 'refunded',   25.00),
  (11, '2024-03-30', 'paid',       40.00);
--- teach
This lesson's table: \`orders\` (\`id\`, \`created\`, \`status\`, \`total\`).

\`GROUP BY month, status\` gives one row per month **and** status — a long list. People want a grid: one row per month, one **column** per status. Turning rows into columns is a **pivot**, and SQL does it with **conditional aggregation**: an aggregate over a \`CASE\` that only lets some rows count.

\`\`\`sql
SELECT substr(created, 1, 7) AS month,
       SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS paid,
       SUM(CASE WHEN status = 'paid' THEN total ELSE 0 END) AS paid_revenue
FROM orders
GROUP BY month;
\`\`\`

Each column sees every row of the month, but the \`CASE\` turns the rows it should ignore into 0. SQLite also treats a comparison as 1 or 0, so \`SUM(status = 'paid')\` is a short way to count, and some databases offer \`COUNT(*) FILTER (WHERE status = 'paid')\`, which SQLite supports too.

Two details make a pivot trustworthy:

- **Write the \`ELSE 0\`.** Without it, a month with no refunds sums nothing but NULLs and shows NULL instead of 0 — and NULL then poisons any arithmetic you do with the column.
- **The columns are fixed in the query.** A new status value appears in no column until you add one. Pivots are for known, stable categories; if the values change often, return the long form and let the chart pivot it.

Derived columns combine the pieces: net revenue is paid revenue minus refunded revenue, all inside one pass over the table.
--- task
Return one row per month (\`'YYYY-MM'\`) with the columns \`month\`, \`paid\`, \`refunded\` and \`cancelled\` (the number of orders in each status; 0 when none) and \`net\` (the total of paid orders minus the total of refunded orders, rounded to 2 decimals). Sort by month.
--- starter
SELECT substr(created, 1, 7) AS month, status, COUNT(*) AS n
FROM orders
GROUP BY month, status;
--- solution
SELECT substr(created, 1, 7) AS month,
       SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS paid,
       SUM(CASE WHEN status = 'refunded' THEN 1 ELSE 0 END) AS refunded,
       SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled,
       ROUND(SUM(CASE WHEN status = 'paid' THEN total
                      WHEN status = 'refunded' THEN -total
                      ELSE 0 END), 2) AS net
FROM orders
GROUP BY month
ORDER BY month;
--- hint
One row per month means \`GROUP BY month\` only; each status becomes \`SUM(CASE WHEN status = '…' THEN 1 ELSE 0 END)\`.
--- hint
\`net\` is one more \`SUM(CASE …)\`: \`total\` for paid, \`-total\` for refunded, \`0\` otherwise.
--- check result | Three months; no refunds in January shows 0, not NULL
ordered
[["2024-01", 2, 0, 1, 150.0], ["2024-02", 3, 1, 0, 30.5], ["2024-03", 2, 1, 1, 75.0]]

=== sql4-08 | JSON columns
--- schema
CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  payload TEXT NOT NULL
);
INSERT INTO events (id, user_id, name, payload) VALUES
  (1, 1, 'checkout',  '{"items": [{"sku": "MUG", "qty": 2}, {"sku": "PEN", "qty": 1}], "coupon": "SPRING"}'),
  (2, 2, 'checkout',  '{"items": [{"sku": "MUG", "qty": 1}]}'),
  (3, 1, 'page_view', '{"path": "/pricing"}'),
  (4, 3, 'checkout',  '{"items": [{"sku": "LAMP", "qty": 1}, {"sku": "PEN", "qty": 3}], "coupon": null}'),
  (5, 2, 'checkout',  '{"items": []}');
--- teach
This lesson's table: \`events\` (\`id\`, \`user_id\`, \`name\`, \`payload\`), where \`payload\` is a JSON document whose shape depends on the event.

Event data often arrives as JSON with a different shape per event, and storing it as-is in a text column is reasonable. SQLite's JSON functions query inside it:

\`\`\`sql
SELECT json_extract(payload, '$.coupon') FROM events;   -- 'SPRING', NULL, …
SELECT payload ->> '$.coupon' FROM events;              -- the same, shorter
SELECT json_array_length(payload, '$.items') FROM events;
\`\`\`

A path starts at \`$\` (the whole document): \`$.coupon\` is a key, \`$.items[0].sku\` the first item's sku. A key that is missing gives NULL — and so does a key whose value is JSON \`null\`, so the two are indistinguishable this way. \`->>\` returns a plain SQL value; \`->\` returns JSON text (use it when you want to keep a sub-document as JSON).

Arrays need **\`json_each\`**, a table-valued function: it turns an array into rows, one per element, and you join it like a table:

\`\`\`sql
SELECT e.id, item.value ->> '$.sku' AS sku
FROM events e, json_each(e.payload, '$.items') AS item;
\`\`\`

The comma in \`FROM events e, json_each(…)\` is an older spelling of \`CROSS JOIN\`. With a table-valued function it means "for each event \`e\`, the rows \`json_each\` makes from *that* event's payload". Each row of \`json_each\` has \`key\` (the index), \`value\` (the element) and more. An empty array produces no rows, so event 5 simply contributes nothing.

When a JSON field becomes important — filtered on every request — promote it: add a generated column \`coupon TEXT GENERATED ALWAYS AS (payload ->> '$.coupon')\` and index it, or give it a real column. JSON is flexible storage, not a substitute for a schema.
--- task
From the \`checkout\` events, return one row per sku with \`sku\`, \`units\` (the total \`qty\` across all checkouts) and \`orders\` (the number of checkout events that include it). Sort by units, highest first, then sku.
--- starter
SELECT payload ->> '$.items[0].sku' AS sku, payload ->> '$.items[0].qty' AS units
FROM events
WHERE name = 'checkout';
--- solution
SELECT item.value ->> '$.sku' AS sku,
       SUM(item.value ->> '$.qty') AS units,
       COUNT(DISTINCT e.id) AS orders
FROM events e, json_each(e.payload, '$.items') AS item
WHERE e.name = 'checkout'
GROUP BY sku
ORDER BY units DESC, sku;
--- hint
The starter only looks at the first item. \`json_each(e.payload, '$.items')\` gives one row per item.
--- hint
Read the item's fields with \`item.value ->> '$.sku'\` and \`item.value ->> '$.qty'\`, then group by sku.
--- check result | PEN 4 units in 2 orders, MUG 3 in 2, LAMP 1 in 1
ordered
[["PEN", 4, 2], ["MUG", 3, 2], ["LAMP", 1, 1]]
--- check source | Uses json_each
json_each

=== sql4-09 | Design: many-to-many for an app
--- schema
CREATE TABLE notes (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  tags TEXT
);
INSERT INTO notes (id, title, tags) VALUES
  (1, 'Q3 plan',      'work, urgent'),
  (2, 'Groceries',    'personal'),
  (3, 'Launch ideas', 'Work,ideas'),
  (4, 'Draft',        NULL),
  (5, 'Old stuff',    ''),
  (6, 'Board prep',   'urgent,work, work');
--- teach
This lesson's table: \`notes\` (\`id\`, \`title\`, \`tags\`), from a notes app whose first version stored tags as a comma-separated string.

That design breaks as soon as anyone asks a real question. "All notes tagged work" becomes \`tags LIKE '%work%'\` — which also matches \`homework\`. Renaming a tag means rewriting strings. Nothing stops \`'Work'\` and \`'work'\` becoming two tags. The string is a **list stuffed into one column**, and relational databases do lists with rows.

A note has many tags; a tag belongs to many notes. That is a **many-to-many** relationship, and it always takes three tables: the two things, and a **join table** with one row per link:

\`\`\`sql
CREATE TABLE tags (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE);
CREATE TABLE note_tags (
  note_id INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  tag_id  INTEGER NOT NULL REFERENCES tags(id)  ON DELETE CASCADE,
  PRIMARY KEY (note_id, tag_id)
);
\`\`\`

The composite primary key makes each link unique — the same tag cannot be attached twice — and doubles as the index for "tags of this note". Cascades mean deleting a note removes its links (not the tags, which other notes share). Remember \`PRAGMA foreign_keys = ON\`.

**Migrating** the old strings is the expert part: split each string into rows. A recursive CTE does it by peeling off one piece per step:

\`\`\`sql
WITH RECURSIVE split(note_id, piece, rest) AS (
  SELECT id, NULL, tags || ',' FROM notes WHERE tags IS NOT NULL
  UNION ALL
  SELECT note_id,
         trim(substr(rest, 1, instr(rest, ',') - 1)),
         substr(rest, instr(rest, ',') + 1)
  FROM split WHERE rest <> ''
)
SELECT note_id, lower(piece) FROM split WHERE piece <> '';
\`\`\`

Normalise as you go (\`lower\`, \`trim\`, drop empty pieces), and use \`INSERT OR IGNORE\` or \`DISTINCT\` so a tag listed twice links once. You need the split twice — once to fill \`tags\`, once to fill \`note_tags\` — so save it once: \`CREATE TEMP TABLE pieces AS <query>\` stores a query's result as a table that disappears when the connection closes. When everything has moved, drop the old column with \`ALTER TABLE notes DROP COLUMN tags;\` so nobody keeps writing to it.
--- task
Replace the \`tags\` string with a many-to-many design:

1. Turn foreign key enforcement on.
2. Create \`tags\` (\`id\` integer primary key, \`name\` text, required, unique) and \`note_tags\` (\`note_id\` referencing \`notes(id)\`, \`tag_id\` referencing \`tags(id)\`, both cascading on delete, primary key \`(note_id, tag_id)\`).
3. Move every tag across: names lower-cased and trimmed, blank pieces ignored, each tag stored once, each note linked to each of its tags once.
4. Drop the old \`tags\` column from \`notes\`.
--- starter
PRAGMA foreign_keys = ON;

CREATE TABLE tags (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);
--- solution
PRAGMA foreign_keys = ON;

CREATE TABLE tags (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);
CREATE TABLE note_tags (
  note_id INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (note_id, tag_id)
);

CREATE TEMP TABLE pieces AS
WITH RECURSIVE split(note_id, piece, rest) AS (
  SELECT id, NULL, tags || ',' FROM notes WHERE tags IS NOT NULL
  UNION ALL
  SELECT note_id,
         trim(substr(rest, 1, instr(rest, ',') - 1)),
         substr(rest, instr(rest, ',') + 1)
  FROM split
  WHERE rest <> ''
)
SELECT DISTINCT note_id, lower(piece) AS name FROM split WHERE piece <> '';

INSERT INTO tags (name) SELECT DISTINCT name FROM pieces;

INSERT INTO note_tags (note_id, tag_id)
SELECT p.note_id, t.id FROM pieces p JOIN tags t ON t.name = p.name;

ALTER TABLE notes DROP COLUMN tags;
--- hint
Create \`note_tags\` with a table-level \`PRIMARY KEY (note_id, tag_id)\` and \`ON DELETE CASCADE\` on both references.
--- hint
Split once into a temporary table (\`CREATE TEMP TABLE pieces AS WITH RECURSIVE …\`), keeping \`DISTINCT note_id, lower(piece)\` where the piece is not empty. Then fill \`tags\` and \`note_tags\` from it.
--- hint
Finish with \`ALTER TABLE notes DROP COLUMN tags;\`.
--- check query | Four tags, each once
SELECT name FROM tags ORDER BY name
=> [["ideas"], ["personal"], ["urgent"], ["work"]]
--- check query | Each note is linked to its tags, once each
SELECT n.title, group_concat(t.name, ',' ORDER BY t.name)
FROM notes n JOIN note_tags nt ON nt.note_id = n.id JOIN tags t ON t.id = nt.tag_id
GROUP BY n.id ORDER BY n.id
=> [["Q3 plan", "urgent,work"], ["Groceries", "personal"], ["Launch ideas", "ideas,work"], ["Board prep", "urgent,work"]]
--- check query | The same link cannot be added twice
INSERT OR IGNORE INTO note_tags (note_id, tag_id) SELECT 1, id FROM tags WHERE name = 'work' RETURNING note_id
=> []
--- check query | A tag name cannot be added twice
INSERT OR IGNORE INTO tags (name) VALUES ('work') RETURNING id
=> []
--- check query | Deleting a note removes its links, not the tags
DELETE FROM notes WHERE id = 1;
SELECT (SELECT COUNT(*) FROM note_tags), (SELECT COUNT(*) FROM tags)
=> [[5, 4]]
--- check query | The old tags column is gone
SELECT COUNT(*) FROM pragma_table_info('notes') WHERE name = 'tags'
=> [[0]]

=== sql4-10 | Audit trails with triggers
--- schema
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO products (id, name, price) VALUES (1, 'Mug', 9.0), (2, 'Lamp', 45.0);
CREATE TABLE audit_log (
  id INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  old_row TEXT,
  new_row TEXT
);
--- teach
This lesson's tables: \`products\` (\`id\`, \`name\`, \`price\`) and an empty \`audit_log\` (\`id\`, \`product_id\`, \`action\`, \`old_row\`, \`new_row\`).

"Who changed this price, and what was it before?" Regulators, support teams and your future self all ask it. An **audit trail** records every change as a row. Doing it in application code misses every change made elsewhere — a migration, an admin console, a one-off fix at 2am. A trigger catches them all.

Three triggers cover a table: one per event. Each writes the row as it was (\`OLD\`) and as it became (\`NEW\`). Store both as JSON so one log table works for any table's shape:

\`\`\`sql
CREATE TRIGGER products_audit_update
AFTER UPDATE ON products
WHEN OLD.name IS NOT NEW.name OR OLD.price IS NOT NEW.price
BEGIN
  INSERT INTO audit_log (product_id, action, old_row, new_row)
  VALUES (NEW.id, 'update',
          json_object('name', OLD.name, 'price', OLD.price),
          json_object('name', NEW.name, 'price', NEW.price));
END;
\`\`\`

Details that separate a useful audit trail from noise:

- **Skip no-op updates.** An app that saves a form rewrites every field, changed or not. The \`WHEN\` clause logs only real changes. Use \`IS NOT\`, not \`<>\`, so a change to or from NULL counts.
- **Inserts have no \`OLD\`, deletes have no \`NEW\`.** Log NULL for the missing side.
- **Never update or delete audit rows.** The log is append-only; that is what makes it evidence.
- In production you would also record *when* (\`datetime('now')\`) and *who* — which the app has to supply, since the database does not know the user.

\`json_object('name', OLD.name, …)\` builds \`{"name":"Mug","price":9.0}\`; \`json_extract(old_row, '$.price')\` reads it back.
--- task
Create three triggers that record every change to \`products\` in \`audit_log\`, with \`old_row\` and \`new_row\` as \`json_object('name', …, 'price', …)\` of the row before and after (NULL for the side that does not exist):

- \`products_audit_insert\` — after insert, \`action\` \`'insert'\`.
- \`products_audit_update\` — after update, \`action\` \`'update'\`, only when the name or price actually changed.
- \`products_audit_delete\` — after delete, \`action\` \`'delete'\`.
--- starter
CREATE TRIGGER products_audit_update
AFTER UPDATE ON products
BEGIN
  INSERT INTO audit_log (product_id, action) VALUES (NEW.id, 'update');
END;
--- solution
CREATE TRIGGER products_audit_insert
AFTER INSERT ON products
BEGIN
  INSERT INTO audit_log (product_id, action, old_row, new_row)
  VALUES (NEW.id, 'insert', NULL, json_object('name', NEW.name, 'price', NEW.price));
END;

CREATE TRIGGER products_audit_update
AFTER UPDATE ON products
WHEN OLD.name IS NOT NEW.name OR OLD.price IS NOT NEW.price
BEGIN
  INSERT INTO audit_log (product_id, action, old_row, new_row)
  VALUES (NEW.id, 'update',
          json_object('name', OLD.name, 'price', OLD.price),
          json_object('name', NEW.name, 'price', NEW.price));
END;

CREATE TRIGGER products_audit_delete
AFTER DELETE ON products
BEGIN
  INSERT INTO audit_log (product_id, action, old_row, new_row)
  VALUES (OLD.id, 'delete', json_object('name', OLD.name, 'price', OLD.price), NULL);
END;
--- hint
Each trigger is \`AFTER <event> ON products BEGIN INSERT INTO audit_log … ; END;\`.
--- hint
The update trigger needs \`WHEN OLD.name IS NOT NEW.name OR OLD.price IS NOT NEW.price\` so a save that changes nothing logs nothing.
--- check query | Inserts, real updates and deletes are logged — a no-op save is not
INSERT INTO products (id, name, price) VALUES (3, 'Pen', 3.5);
UPDATE products SET price = 10.0 WHERE id = 1;
UPDATE products SET name = 'Lamp', price = 45.0 WHERE id = 2;
DELETE FROM products WHERE id = 3;
SELECT product_id, action, old_row, new_row FROM audit_log ORDER BY id
=> [[3, "insert", null, "{\\"name\\":\\"Pen\\",\\"price\\":3.5}"], [1, "update", "{\\"name\\":\\"Mug\\",\\"price\\":9.0}", "{\\"name\\":\\"Mug\\",\\"price\\":10.0}"], [3, "delete", "{\\"name\\":\\"Pen\\",\\"price\\":3.5}", null]]
--- check query | The old price can be read back from the log
SELECT json_extract(old_row, '$.price') FROM audit_log WHERE action = 'update'
=> [[9.0]]

=== sql4-11 | Debugging: orphans and duplicates
--- schema
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL
);
INSERT INTO customers (id, email, name) VALUES
  (1, 'ana@mail.com', 'Ana'),
  (2, 'bo@mail.com',  'Bo'),
  (3, 'ANA@mail.com', 'Ana'),
  (4, 'cy@mail.com',  'Cy'),
  (5, 'bo@mail.com ', 'Bo');
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  total REAL NOT NULL
);
INSERT INTO orders (id, customer_id, total) VALUES
  (1, 1, 20.0), (2, 3, 35.0), (3, 2, 10.0), (4, 5, 12.0),
  (5, 9, 50.0), (6, 4, 5.0), (7, NULL, 8.0), (8, 7, 3.0);
--- teach
This lesson's tables: \`customers\` (\`id\`, \`email\`, \`name\`) and \`orders\` (\`id\`, \`customer_id\`, \`total\`), from a legacy app with no constraints.

**The bug report.** The customer count on the dashboard is higher than the CRM's, and revenue by customer does not add up to total revenue. Both are symptoms of bad data, not of bad report SQL.

The method for data problems is the same as for code: **measure before you touch anything**.

1. **Find duplicates.** Group by the normalised key and look for groups over 1:

\`\`\`sql
SELECT lower(trim(email)) AS k, COUNT(*), group_concat(id)
FROM customers GROUP BY k HAVING COUNT(*) > 1;
\`\`\`

\`group_concat(id)\` joins the group's ids into one string, such as \`'1,3'\`, so you can see exactly which rows collide.

2. **Find orphans** — child rows whose parent is missing. An anti-join:

\`\`\`sql
SELECT o.* FROM orders o
WHERE NOT EXISTS (SELECT 1 FROM customers c WHERE c.id = o.customer_id);
\`\`\`

(A NULL \`customer_id\` matches nothing, so it shows up here too. When a table declares its foreign keys, \`PRAGMA foreign_key_check\` lists orphans for you.)

3. **Fix in the right order.** Merging duplicates means *re-pointing* their children to the survivor **before** deleting them — delete first, and you create new orphans. Choose the survivor by a rule (here the lowest id, the original account).

4. **Decide what orphans mean.** Sometimes they can be re-attached; sometimes they are junk from a bug. Here they point at customers that no longer exist and cannot be recovered, so they go.

5. **Measure again**, then **prevent it**: a unique index on the normalised email stops the duplicates coming back. (Adding a foreign key to an existing SQLite table means rebuilding the table — create the new table with the constraint, copy the rows, drop the old one, rename — which is a job for a migration of its own.)

Do the fix inside a transaction, so a mistake halfway leaves nothing half-done.
--- task
Clean the data, in a transaction:

1. Re-point every order of a duplicate customer to the surviving customer — the one with the **lowest id** among those sharing the same \`lower(trim(email))\`.
2. Delete the duplicate customers.
3. Delete the orphan orders (their \`customer_id\` is NULL or matches no customer).
4. Create a unique index named \`customers_email_key\` on \`lower(trim(email))\`.
--- starter
BEGIN;
DELETE FROM customers
WHERE id NOT IN (SELECT MIN(id) FROM customers GROUP BY lower(trim(email)));
COMMIT;
--- solution
BEGIN;

UPDATE orders
SET customer_id = (
  SELECT MIN(c2.id)
  FROM customers c1
  JOIN customers c2 ON lower(trim(c2.email)) = lower(trim(c1.email))
  WHERE c1.id = orders.customer_id
)
WHERE customer_id IN (SELECT id FROM customers);

DELETE FROM customers
WHERE id NOT IN (SELECT MIN(id) FROM customers GROUP BY lower(trim(email)));

DELETE FROM orders
WHERE NOT EXISTS (SELECT 1 FROM customers c WHERE c.id = orders.customer_id);

CREATE UNIQUE INDEX customers_email_key ON customers(lower(trim(email)));

COMMIT;
--- hint
Measure first: group customers by \`lower(trim(email))\` for duplicates, and anti-join orders to customers for orphans. The starter deletes duplicates before moving their orders — creating new orphans.
--- hint
Re-point with a correlated subquery: for each order, the \`MIN(id)\` of customers whose normalised email equals its current customer's. Restrict the update to orders whose customer exists.
--- hint
Then delete the duplicates, then \`DELETE FROM orders WHERE NOT EXISTS (…)\`, then create the unique index.
--- check query | Three customers remain: the originals
SELECT id, email FROM customers ORDER BY id
=> [[1, "ana@mail.com"], [2, "bo@mail.com"], [4, "cy@mail.com"]]
--- check query | Duplicates' orders now belong to the survivors; orphans are gone
SELECT id, customer_id FROM orders ORDER BY id
=> [[1, 1], [2, 1], [3, 2], [4, 2], [6, 4]]
--- check query | No order points at a missing customer
SELECT COUNT(*) FROM orders o WHERE NOT EXISTS (SELECT 1 FROM customers c WHERE c.id = o.customer_id)
=> [[0]]
--- check query | A new duplicate spelling is refused
INSERT OR IGNORE INTO customers (email, name) VALUES (' CY@Mail.com', 'Cy') RETURNING id
=> []

=== sql4-12 | Problem: cohort retention
--- schema
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  signed_up TEXT NOT NULL
);
INSERT INTO users (id, signed_up) VALUES
  (1, '2024-01-05'), (2, '2024-01-20'), (3, '2024-01-31'), (4, '2024-01-15'),
  (5, '2024-02-02'), (6, '2024-02-10'),
  (7, '2024-03-03');
CREATE TABLE activity (
  user_id INTEGER NOT NULL REFERENCES users(id),
  day TEXT NOT NULL
);
INSERT INTO activity (user_id, day) VALUES
  (1, '2024-01-06'), (1, '2024-02-03'), (1, '2024-02-20'), (1, '2024-03-15'),
  (2, '2024-02-01'),
  (3, '2024-03-02'),
  (5, '2024-03-01'), (5, '2024-04-10'),
  (6, '2024-02-11'), (6, '2024-04-20'),
  (7, '2024-04-01');
--- teach
This lesson's tables: \`users\` (\`id\`, \`signed_up\`) and \`activity\` (\`user_id\`, \`day\`) — one row each time a user was active.

**The problem.** Growth wants to know whether people stick around. Group users into **cohorts** by the month they signed up. For each cohort, report its size and the percentage of its users who were active **one month** after their signup month, and **two months** after. A user signing up in January is "month 1 active" if they were active at any time in February.

Work it through the problem-solving steps:

1. **Restate with an example.** January's cohort is users 1–4. In February, users 1 and 2 were active: 2 of 4, 50%. User 1 was active twice in February — that is still one user.
2. **Find the key quantity:** for every activity, *how many months after signup* it happened. Turn a date into a month number, \`year * 12 + month\`, and subtract:

\`\`\`sql
(CAST(strftime('%Y', a.day) AS INTEGER) * 12 + CAST(strftime('%m', a.day) AS INTEGER))
- (CAST(strftime('%Y', u.signed_up) AS INTEGER) * 12 + CAST(strftime('%m', u.signed_up) AS INTEGER))
\`\`\`

\`strftime\` returns text (\`'03'\`); \`CAST(x AS INTEGER)\` converts it to the number 3 so the arithmetic is done on numbers. Month numbers carry across years correctly, which "month minus month" would not (December to January is +1, not −11).

3. **Build in steps with CTEs:** users with their cohort; activity with its month offset; then per cohort, the **distinct** users with offset 1, and with offset 2.
4. **Mind the edges.** Users with no activity at all (user 4) still count in the cohort size — so the cohort side must drive the query and activity must be LEFT-joined or counted with conditional aggregation. A cohort nobody came back to shows \`0.0\`, not NULL. Percentages are \`100.0 * active / size\`.
5. **Check against the example** before you trust the rest.
--- task
Return one row per signup cohort: \`cohort\` (\`'YYYY-MM'\`), \`users\` (cohort size), \`m1_pct\` and \`m2_pct\` — the percentage of the cohort's users active in the first and second month after their signup month, rounded to 1 decimal (0.0 when nobody). Sort by cohort.
--- starter
SELECT strftime('%Y-%m', signed_up) AS cohort, COUNT(*) AS users
FROM users
GROUP BY cohort;
--- solution
WITH u AS (
  SELECT id,
         strftime('%Y-%m', signed_up) AS cohort,
         CAST(strftime('%Y', signed_up) AS INTEGER) * 12 + CAST(strftime('%m', signed_up) AS INTEGER) AS m0
  FROM users
), a AS (
  SELECT DISTINCT a.user_id,
         CAST(strftime('%Y', a.day) AS INTEGER) * 12 + CAST(strftime('%m', a.day) AS INTEGER) - u.m0 AS offset
  FROM activity a
  JOIN u ON u.id = a.user_id
)
SELECT u.cohort,
       COUNT(*) AS users,
       ROUND(100.0 * SUM(EXISTS (SELECT 1 FROM a WHERE a.user_id = u.id AND a.offset = 1)) / COUNT(*), 1) AS m1_pct,
       ROUND(100.0 * SUM(EXISTS (SELECT 1 FROM a WHERE a.user_id = u.id AND a.offset = 2)) / COUNT(*), 1) AS m2_pct
FROM u
GROUP BY u.cohort
ORDER BY u.cohort;
--- hint
Give each user a month number \`year * 12 + month\` for their signup, and each activity the same; the difference is the month offset.
--- hint
Drive the final query from users (so inactive users count in the size), and for each user ask whether an activity with offset 1 (or 2) exists — \`EXISTS\` gives 1 or 0, which you can \`SUM\`.
--- hint
\`ROUND(100.0 * SUM(…) / COUNT(*), 1)\`. Check January: 4 users, 50.0 and 50.0.
--- check result | Jan 50/50, Feb 50/100, Mar 100/0
ordered
[["2024-01", 4, 50.0, 50.0], ["2024-02", 2, 50.0, 100.0], ["2024-03", 1, 100.0, 0.0]]

=== sql4-13 | Problem: a conversion funnel
--- schema
CREATE TABLE events (
  user_id INTEGER NOT NULL,
  ts TEXT NOT NULL,
  name TEXT NOT NULL
);
INSERT INTO events (user_id, ts, name) VALUES
  (1, '2024-07-01 10:00', 'view'), (1, '2024-07-01 10:05', 'cart'), (1, '2024-07-01 10:10', 'checkout'), (1, '2024-07-01 10:12', 'purchase'),
  (2, '2024-07-01 10:00', 'view'), (2, '2024-07-01 10:01', 'cart'), (2, '2024-07-01 10:03', 'view'),
  (3, '2024-07-01 09:00', 'cart'), (3, '2024-07-01 09:05', 'view'), (3, '2024-07-01 09:10', 'checkout'),
  (4, '2024-07-01 11:00', 'view'), (4, '2024-07-01 11:02', 'cart'), (4, '2024-07-01 11:04', 'checkout'),
  (5, '2024-07-01 12:00', 'purchase'),
  (6, '2024-07-01 13:00', 'view'), (6, '2024-07-01 13:01', 'view'), (6, '2024-07-01 13:05', 'cart'),
  (6, '2024-07-01 13:07', 'checkout'), (6, '2024-07-01 13:09', 'purchase'), (6, '2024-07-01 13:30', 'purchase'),
  (7, '2024-07-01 14:00', 'view');
--- teach
This lesson's table: \`events\` (\`user_id\`, \`ts\`, \`name\`), where \`name\` is one of \`view\`, \`cart\`, \`checkout\`, \`purchase\`.

**The problem.** The shop's funnel is **view → cart → checkout → purchase**. For each step, how many users reached it — *in order* — and what percentage of the previous step's users made it this far?

"In order" is the whole difficulty. User 3 added to cart *before* ever viewing a product (a deep link), then viewed, then checked out. Counting users per event name would credit them with cart and checkout; the funnel must not. User 5 only has a purchase — an import glitch — and must not count at any step. User 6 viewed twice and purchased twice: still one user per step.

Approach:

1. **Restate precisely.** A user reaches step 1 at their first \`view\`. They reach step 2 at their first \`cart\` **after** that time; step 3 at their first \`checkout\` after *that*; and so on. Each step's time is the earliest qualifying event.
2. **One CTE per step**, each built from the one before:

\`\`\`sql
s1 AS (SELECT user_id, MIN(ts) AS t FROM events WHERE name = 'view' GROUP BY user_id),
s2 AS (SELECT e.user_id, MIN(e.ts) AS t
       FROM events e JOIN s1 ON s1.user_id = e.user_id
       WHERE e.name = 'cart' AND e.ts > s1.t
       GROUP BY e.user_id),
…
\`\`\`

Because each step joins only the users who reached the previous one, the counts can only shrink.

3. **Assemble the report** with a \`UNION ALL\` of one row per step (step number, name, count), then \`LAG\` over the step number gives the previous step's count for the percentage. The first step has no previous one, so its percentage is NULL.

4. **Check by hand** against the data: six users viewed (everyone but user 5); four of them carted after viewing.
--- task
Return one row per funnel step: \`step\` (1–4), \`name\`, \`users\` (how many users reached it in order) and \`pct\` — \`users\` as a percentage of the previous step's users, rounded to 1 decimal (NULL for step 1). Sort by step.
--- starter
SELECT name, COUNT(DISTINCT user_id) AS users
FROM events
GROUP BY name;
--- solution
WITH s1 AS (
  SELECT user_id, MIN(ts) AS t FROM events WHERE name = 'view' GROUP BY user_id
), s2 AS (
  SELECT e.user_id, MIN(e.ts) AS t
  FROM events e JOIN s1 ON s1.user_id = e.user_id
  WHERE e.name = 'cart' AND e.ts > s1.t
  GROUP BY e.user_id
), s3 AS (
  SELECT e.user_id, MIN(e.ts) AS t
  FROM events e JOIN s2 ON s2.user_id = e.user_id
  WHERE e.name = 'checkout' AND e.ts > s2.t
  GROUP BY e.user_id
), s4 AS (
  SELECT e.user_id, MIN(e.ts) AS t
  FROM events e JOIN s3 ON s3.user_id = e.user_id
  WHERE e.name = 'purchase' AND e.ts > s3.t
  GROUP BY e.user_id
), steps AS (
  SELECT 1 AS step, 'view' AS name, COUNT(*) AS users FROM s1
  UNION ALL SELECT 2, 'cart', COUNT(*) FROM s2
  UNION ALL SELECT 3, 'checkout', COUNT(*) FROM s3
  UNION ALL SELECT 4, 'purchase', COUNT(*) FROM s4
)
SELECT step, name, users,
       ROUND(100.0 * users / LAG(users) OVER (ORDER BY step), 1) AS pct
FROM steps
ORDER BY step;
--- hint
Step 1 is each user's first \`view\`. Each later step is the first event of the next name **after** the previous step's time, for users who reached the previous step.
--- hint
Write \`s1\` … \`s4\` as CTEs, each joining the one before. Then stack four count rows with \`UNION ALL\`.
--- hint
\`LAG(users) OVER (ORDER BY step)\` gives the previous step's count for \`pct\`.
--- check result | 6 viewed, 4 carted in order, 3 checked out, 2 purchased
ordered
[[1, "view", 6, null], [2, "cart", 4, 66.7], [3, "checkout", 3, 75.0], [4, "purchase", 2, 66.7]]

=== sql4-14 | Problem: find and fix a slow query
--- schema
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE CHECK (email = lower(email)),
  name TEXT NOT NULL
);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  created TEXT NOT NULL,
  total REAL NOT NULL
);
WITH RECURSIVE n(i) AS (SELECT 1 UNION ALL SELECT i + 1 FROM n WHERE i < 1000)
INSERT INTO customers (id, email, name) SELECT i, 'user' || i || '@example.com', 'User ' || i FROM n;
WITH RECURSIVE n(i) AS (SELECT 1 UNION ALL SELECT i + 1 FROM n WHERE i < 8000)
INSERT INTO orders (id, customer_id, created, total)
SELECT i, i % 1000 + 1, datetime('2024-01-01', '+' || (i * 97 % 525600) || ' minutes'), (i * 31 % 300) / 2.0 FROM n;
CREATE VIEW customer_month AS
SELECT c.email, o.id AS order_id, o.created, o.total
FROM orders o
JOIN customers c ON c.id = o.customer_id
WHERE lower(c.email) = 'user347@example.com'
  AND strftime('%Y-%m', o.created) = '2024-03';
--- teach
This lesson's tables: \`customers\` (\`id\`, \`email\` — unique, and a \`CHECK\` guarantees it is stored lower-case — \`name\`), 1,000 rows; \`orders\` (\`id\`, \`customer_id\`, \`created\`, \`total\`), 8,000 rows; and a view \`customer_month\` that the support tool calls on every page load.

**The report.** Support says the customer page got slower as the shop grew, and it is only going to grow. Nobody knows why.

Finding a slow query is a method, not a hunch:

1. **Read the plan.** \`EXPLAIN QUERY PLAN SELECT * FROM customer_month;\` Every \`SCAN\` on a big table is a suspect; \`AUTOMATIC INDEX\` means SQLite found it worth building a throwaway index *for this one query* — a missing index, announced.
2. **For each suspect, ask why the index is not used.** Is there no index on that column? Or is there one the predicate cannot use — a column wrapped in a function (lesson 1)?
3. **Question every function.** Is \`lower()\` needed at all? Read the schema: if a constraint already guarantees the value, the function is doing nothing except blocking the index.
4. **Fix one thing, re-read the plan,** until each table is reached by a \`SEARCH\`.
5. **Prove the answer did not change.** A fast wrong query is worse than a slow right one — compare the rows before and after.

Indexes for a join: the table you *start* from needs an index on its filter column; the table you *join into* needs an index on the join column — and, if you also filter it by a range, the range column right after, so one index answers both.

This shop names indexes after their columns: \`idx_<table>_<column>_<column>\`.
--- task
Make \`customer_month\` fast without changing the rows it returns: recreate the view under the same name and columns with sargable predicates, and add whatever index it needs (named by the shop's convention), so that both tables are reached with \`SEARCH\` and nothing is scanned.
--- starter
EXPLAIN QUERY PLAN SELECT * FROM customer_month;
--- solution
DROP VIEW customer_month;
CREATE VIEW customer_month AS
SELECT c.email, o.id AS order_id, o.created, o.total
FROM orders o
JOIN customers c ON c.id = o.customer_id
WHERE c.email = 'user347@example.com'
  AND o.created >= '2024-03-01' AND o.created < '2024-04-01';

CREATE INDEX idx_orders_customer_id_created ON orders(customer_id, created);
--- hint
Run the starter and read the plan. Then read the \`customers\` schema: can \`email\` ever contain capitals?
--- hint
Drop the \`lower()\` (the unique index on \`email\` can then be used), turn the month test into a range on \`created\`, and index orders by the join column and then the range column.
--- hint
\`DROP VIEW customer_month;\` then create it again; the index is \`idx_orders_customer_id_created ON orders(customer_id, created)\`.
--- check query | The view returns the same rows as before
SELECT email, order_id, created, total FROM customer_month ORDER BY order_id
=> [["user347@example.com", 1346, "2024-03-31 16:02:00", 13.0], ["user347@example.com", 6346, "2024-03-03 11:22:00", 113.0]]
--- check query | Both tables are searched, nothing scanned
EXPLAIN QUERY PLAN SELECT * FROM customer_month
=> [[4, 0, 45, "SEARCH c USING COVERING INDEX sqlite_autoindex_customers_1 (email=?)"], [8, 0, 50, "SEARCH o USING INDEX idx_orders_customer_id_created (customer_id=? AND created>? AND created<?)"]]
`,Ne=`@track sql
@level intermediate
@title SQL · Intermediate
@name SQL, intermediate: joins, subqueries and honest numbers
@blurb Answer real business questions from several tables at once — every join type, grouping, subqueries, CASE, dates and text — and catch the NULLs and fan-outs that quietly make reports wrong.
@schema
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  city TEXT,
  referred_by INTEGER REFERENCES customers(id),
  joined TEXT NOT NULL
);
INSERT INTO customers (id, name, email, city, referred_by, joined) VALUES
  (1, 'Ada',  'ada@mail.com',  'London', NULL, '2024-01-15'),
  (2, 'Ben',  'BEN@Mail.com',  'Paris',  1,    '2024-02-03'),
  (3, 'Cleo', NULL,            NULL,     1,    '2024-02-20'),
  (4, 'Dev',  ' dev@work.io',  'London', 2,    '2024-03-11'),
  (5, 'Eve',  'eve@mail.com',  'Berlin', NULL, '2024-04-01'),
  (6, 'Finn', 'finn@Work.io ', NULL,     4,    '2024-04-18'),
  (7, 'Gus',  'gus@post.org',  'Paris',  NULL, '2024-05-02');
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO products (id, name, category, price) VALUES
  (1, 'Notebook',     'stationery',   4.50),
  (2, 'Fountain pen', 'stationery',  32.00),
  (3, 'Desk lamp',    'home',        45.00),
  (4, 'Mug',          'home',         9.00),
  (5, 'Headphones',   'electronics', 89.00),
  (6, 'USB cable',    'electronics',  6.50),
  (7, 'Planner',      'stationery',  18.00),
  (8, 'Bookends',     'home',         9.00);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  placed TEXT NOT NULL,
  status TEXT NOT NULL,
  coupon TEXT
);
INSERT INTO orders (id, customer_id, placed, status, coupon) VALUES
  (1, 1, '2024-03-02 10:15:00', 'shipped',   NULL),
  (2, 1, '2024-03-20 18:40:00', 'shipped',   'SPRING10'),
  (3, 2, '2024-03-21 09:05:00', 'cancelled', NULL),
  (4, 2, '2024-04-07 14:30:00', 'shipped',   'WELCOME5'),
  (5, 3, '2024-04-07 20:10:00', 'paid',      'SPRING10'),
  (6, 4, '2024-05-15 11:00:00', 'shipped',   NULL),
  (7, 5, '2024-05-28 16:45:00', 'refunded',  ''),
  (8, 1, '2024-06-01 08:30:00', 'paid',      NULL);
CREATE TABLE order_items (
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  qty INTEGER NOT NULL,
  unit_price REAL NOT NULL
);
INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES
  (1, 1, 3, 4.50), (1, 4, 1, 9.00),
  (2, 5, 1, 80.10),
  (3, 2, 1, 32.00),
  (4, 3, 1, 45.00), (4, 6, 2, 6.50),
  (5, 2, 1, 28.80), (5, 1, 2, 4.50),
  (6, 5, 1, 89.00), (6, 4, 2, 9.00),
  (7, 3, 1, 45.00),
  (8, 6, 3, 6.50), (8, 1, 1, 5.50);
CREATE TABLE payments (
  id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  amount REAL NOT NULL
);
INSERT INTO payments (id, order_id, amount) VALUES
  (1, 1, 22.50), (2, 2, 80.10), (3, 4, 30.00), (4, 4, 28.00),
  (5, 5, 37.80), (6, 6, 107.00), (7, 7, 45.00), (8, 7, -45.00), (9, 8, 25.00);
CREATE TABLE newsletter (
  email TEXT NOT NULL,
  signed_up TEXT NOT NULL
);
INSERT INTO newsletter (email, signed_up) VALUES
  ('ada@mail.com',  '2024-01-20'),
  ('zoe@mail.com',  '2024-02-14'),
  ('ben@mail.com',  '2024-03-01'),
  ('Zoe@mail.com ', '2024-05-09'),
  ('max@post.org',  '2024-06-11');
@end

=== sql2-01 | Joining three tables
--- teach
The basics joined two tables — \`requests\` to \`users\` — and grouped, filtered and changed their rows. This course asks harder questions of a bigger database, and on the way teaches the traps that make a report quietly wrong: NULLs, joins that multiply rows, and text that looks equal but is not.

It uses a small online shop. Its tables:

- \`customers\` — \`id\`, \`name\`, \`email\`, \`city\`, \`referred_by\` (another customer's id, or NULL), \`joined\`
- \`products\` — \`id\`, \`name\`, \`category\`, \`price\`
- \`orders\` — \`id\`, \`customer_id\`, \`placed\` (a \`'YYYY-MM-DD HH:MM:SS'\` timestamp), \`status\` (\`paid\`, \`shipped\`, \`cancelled\`, \`refunded\`), \`coupon\`
- \`order_items\` — one row per product in an order: \`order_id\`, \`product_id\`, \`qty\`, \`unit_price\` (what was actually charged, which can differ from today's price)
- \`payments\` — \`id\`, \`order_id\`, \`amount\` (an order can have several; refunds are negative)
- \`newsletter\` — \`email\`, \`signed_up\`

Real questions usually cross more than two tables. You join them one link at a time, each \`JOIN\` with its own \`ON\`:

\`\`\`sql
SELECT o.id, c.name, p.name AS product
FROM order_items oi
JOIN orders o    ON o.id = oi.order_id
JOIN customers c ON c.id = o.customer_id
JOIN products p  ON p.id = oi.product_id;
\`\`\`

Read it as a chain: every item belongs to one order, every order to one customer, every item names one product. Start from the table whose rows you want one of per result row (here, one row per item), then walk out along the foreign keys.

Two habits save a lot of confusion. First, give every table a short alias and prefix **every** column with it — \`products.name\` and \`customers.name\` would otherwise collide. Second, when two columns share a name in the result, rename one with \`AS\`.
--- task
For every item in a **shipped** order, return four columns: the order id, the customer's name, the product's name and the quantity. Sort by order id, then by product name.
--- starter
SELECT oi.order_id, oi.product_id, oi.qty
FROM order_items oi;
--- solution
SELECT o.id AS order_id, c.name AS customer, p.name AS product, oi.qty
FROM order_items oi
JOIN orders o    ON o.id = oi.order_id
JOIN customers c ON c.id = o.customer_id
JOIN products p  ON p.id = oi.product_id
WHERE o.status = 'shipped'
ORDER BY o.id, p.name;
--- hint
Start \`FROM order_items oi\`, then \`JOIN orders o ON o.id = oi.order_id\`.
--- hint
Two more joins: \`customers\` through \`o.customer_id\` and \`products\` through \`oi.product_id\`. Filter with \`WHERE o.status = 'shipped'\`.
--- hint
Sort with \`ORDER BY o.id, p.name\`.
--- check result | Seven items from orders 1, 2, 4 and 6, in order
ordered
[[1, "Ada", "Mug", 1], [1, "Ada", "Notebook", 3], [2, "Ada", "Headphones", 1], [4, "Ben", "Desk lamp", 1], [4, "Ben", "USB cable", 2], [6, "Dev", "Headphones", 1], [6, "Dev", "Mug", 2]]

=== sql2-02 | LEFT JOIN: where the filter goes
--- teach
A \`LEFT JOIN\` keeps every row of the left table, filling the right side with NULL when nothing matches. That promise has a catch that trips up almost everyone once.

Suppose you want every customer with their number of *live* orders (paid or shipped). This looks right:

\`\`\`sql
SELECT c.name, COUNT(o.id) AS live_orders
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.status IN ('paid', 'shipped')
GROUP BY c.id, c.name;
\`\`\`

But \`WHERE\` runs **after** the join. A customer with no orders arrives with \`o.status\` = NULL, and \`NULL IN ('paid', 'shipped')\` is not true, so \`WHERE\` throws the row away. A customer whose only order was refunded is dropped the same way. The LEFT JOIN kept them; the WHERE undid it.

The fix is to put conditions on the **right-hand** table inside the \`ON\`:

\`\`\`sql
LEFT JOIN orders o ON o.customer_id = c.id AND o.status IN ('paid', 'shipped')
\`\`\`

Now the condition decides which orders *match*. A customer with no matching orders still survives, with NULLs, and \`COUNT(o.id)\` counts them as 0.

The rule of thumb: in a LEFT JOIN, conditions about the right table go in \`ON\`; conditions about the left table go in \`WHERE\`.
--- task
Return **every** customer's name and their number of orders whose status is \`paid\` or \`shipped\`, as a column named \`live_orders\` (0 for customers with none). Sort by name.
--- starter
SELECT c.name, COUNT(o.id) AS live_orders
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.status IN ('paid', 'shipped')
GROUP BY c.id, c.name
ORDER BY c.name;
--- solution
SELECT c.name, COUNT(o.id) AS live_orders
FROM customers c
LEFT JOIN orders o
  ON o.customer_id = c.id AND o.status IN ('paid', 'shipped')
GROUP BY c.id, c.name
ORDER BY c.name;
--- hint
Run the starter: Eve, Finn and Gus are missing. Which clause removed them?
--- hint
Move the status condition out of \`WHERE\` and into the \`ON\`, joined with \`AND\`.
--- check result | All seven customers; Eve, Finn and Gus have 0
ordered
[["Ada", 3], ["Ben", 1], ["Cleo", 1], ["Dev", 1], ["Eve", 0], ["Finn", 0], ["Gus", 0]]

=== sql2-03 | Self-joins
--- teach
Sometimes a table points at itself. In \`customers\`, \`referred_by\` holds the id of the customer who brought this one in. To show the referrer's *name*, join the table to itself — using two different aliases, so SQL knows which copy you mean:

\`\`\`sql
SELECT c.name, r.name AS referrer
FROM customers c
JOIN customers r ON r.id = c.referred_by;
\`\`\`

\`c\` is "the customer", \`r\` is "the referrer": the same table, playing two parts. Employees and their managers, categories and their parents, replies and the message they answer — they are all self-joins.

As with any join, an inner join drops rows with no match: customers nobody referred (\`referred_by\` is NULL) disappear. Whether that is right depends on the question. "Who referred whom?" — fine. "List every customer with their referrer" — use \`LEFT JOIN\`, and the missing referrers come back as NULL.
--- task
Return **every** customer's name and the name of the customer who referred them, as a column named \`referrer\` (NULL when nobody did).
--- starter
SELECT c.name, r.name AS referrer
FROM customers c
JOIN customers r ON r.id = c.referred_by;
--- solution
SELECT c.name, r.name AS referrer
FROM customers c
LEFT JOIN customers r ON r.id = c.referred_by;
--- hint
The starter loses Ada, Eve and Gus. Why do they have no match?
--- hint
Change the join so customers without a referrer stay in the result.
--- check result | Seven customers, NULL for the three nobody referred
[["Ada", null], ["Ben", "Ada"], ["Cleo", "Ada"], ["Dev", "Ben"], ["Eve", null], ["Finn", "Dev"], ["Gus", null]]

=== sql2-04 | GROUP BY in depth
--- teach
You met \`GROUP BY\` and \`HAVING\` in the basics. Here is what happens underneath, in the order the database does it:

1. \`FROM\` and the \`JOIN\`s build one wide set of rows.
2. \`WHERE\` drops rows.
3. \`GROUP BY\` sorts the survivors into buckets.
4. The aggregates run once per bucket.
5. \`HAVING\` drops buckets.
6. \`SELECT\` shapes the output, then \`ORDER BY\` sorts it.

That order explains the rules. \`WHERE\` cannot use \`SUM(...)\` because the sums do not exist yet; \`HAVING\` can. And a condition that could go in either place (\`category = 'home'\`) belongs in \`WHERE\`, where it throws rows away early.

Three more tools:

- \`COUNT(DISTINCT x)\` counts different values. After a join, \`COUNT(*)\` counts joined rows — one per order *item* — which is rarely what you want to call "orders" or "customers".
- You can group by an expression, such as \`GROUP BY substr(placed, 1, 7)\` — the first seven characters of the timestamp, like \`'2024-03'\` — for months. (Lesson 8 covers text functions.)
- NULLs all fall into one group of their own.

One refinement of the basics rule that every selected column is grouped or aggregated. Grouping by a table's **primary key** also lets you select that table's other columns: \`GROUP BY c.id\` with \`c.name\` in the \`SELECT\` is fine, because each group is exactly one customer and so has exactly one name. PostgreSQL accepts this too. SQLite goes further and lets you select *any* column that is neither grouped nor aggregated, silently picking a value from some row in the group. Other databases reject that, and so should you: when in doubt, add the column to the \`GROUP BY\`.

\`\`\`sql
SELECT p.category, COUNT(DISTINCT o.customer_id) AS buyers
FROM order_items oi
JOIN orders o   ON o.id = oi.order_id
JOIN products p ON p.id = oi.product_id
GROUP BY p.category;
\`\`\`
--- task
Using only orders whose status is \`paid\` or \`shipped\`, return one row per product category with: the category, the number of **different customers** who bought from it (\`buyers\`), the total units (\`units\`), and the revenue — the sum of \`qty * unit_price\`, rounded to 2 decimals (\`revenue\`). Keep only categories with revenue of at least 60, highest revenue first.
--- starter
SELECT p.category, COUNT(*) AS buyers, SUM(oi.qty) AS units
FROM order_items oi
JOIN products p ON p.id = oi.product_id
GROUP BY p.category;
--- solution
SELECT p.category,
       COUNT(DISTINCT o.customer_id) AS buyers,
       SUM(oi.qty) AS units,
       ROUND(SUM(oi.qty * oi.unit_price), 2) AS revenue
FROM order_items oi
JOIN orders o   ON o.id = oi.order_id
JOIN products p ON p.id = oi.product_id
WHERE o.status IN ('paid', 'shipped')
GROUP BY p.category
HAVING SUM(oi.qty * oi.unit_price) >= 60
ORDER BY revenue DESC;
--- hint
You need \`orders\` in the join too: for the status filter, and for \`customer_id\`.
--- hint
\`COUNT(DISTINCT o.customer_id)\` for buyers. The status filter goes in \`WHERE\`; the revenue threshold goes in \`HAVING\`.
--- check result | electronics then home; stationery (56.80) is left out
ordered
[["electronics", 3, 7, 201.6], ["home", 3, 4, 72.0]]

=== sql2-05 | Subqueries: a value, or a list
--- teach
A subquery is a \`SELECT\` in brackets inside another statement. Where it goes depends on what it returns.

A **scalar subquery** returns one row with one column, and can sit anywhere a single value can:

\`\`\`sql
SELECT name, price,
       price - (SELECT AVG(price) FROM products) AS above_avg
FROM products;
\`\`\`

A subquery that returns **one column of many rows** is a list, and pairs with \`IN\`:

\`\`\`sql
SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders WHERE status = 'cancelled');
\`\`\`

Why not just join? Because a join multiplies. Joining customers to their orders gives one row per *order*: a customer with three matching orders appears three times, and you end up bolting on \`DISTINCT\` (which drops duplicate rows — lesson 11) to undo it. \`IN\` asks a yes-or-no question — "is this customer's id in that list?" — so each customer appears at most once, however many times they match.

Subqueries can nest. The inner list may itself be built from a join or another subquery; SQL does not mind, and it often reads closer to the question you were asked.
--- task
Return the name of every customer who has bought at least one product in the \`electronics\` category (any order status), **each name once**, in alphabetical order. Use \`IN\` with a subquery.
--- starter
SELECT c.name
FROM customers c
JOIN orders o       ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p     ON p.id = oi.product_id
WHERE p.category = 'electronics'
ORDER BY c.name;
--- solution
SELECT name
FROM customers
WHERE id IN (
  SELECT o.customer_id
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  JOIN products p     ON p.id = oi.product_id
  WHERE p.category = 'electronics'
)
ORDER BY name;
--- hint
Run the starter: Ada appears twice because she bought electronics in two orders.
--- hint
Build the list of customer ids who bought electronics in a subquery, then \`WHERE id IN (...)\` on \`customers\`.
--- check result | Ada, Ben and Dev, once each
ordered
[["Ada"], ["Ben"], ["Dev"]]
--- check source | Uses IN with a subquery
\\b[Ii][Nn]\\s*\\(\\s*[Ss][Ee][Ll][Ee][Cc][Tt]

=== sql2-06 | Correlated subqueries and EXISTS
--- teach
The subqueries so far ran once. A **correlated** subquery refers to the outer row, so it runs (conceptually) once *per* outer row:

\`\`\`sql
SELECT p.name, p.price
FROM products p
WHERE p.price > (SELECT AVG(x.price) FROM products x WHERE x.category = p.category);
\`\`\`

For each product \`p\`, the inner query averages the prices *in p's category*. The link is \`x.category = p.category\`: the inner query reaches out to the row being tested. The aliases matter — without two different names, SQL cannot tell the inner products from the outer one.

\`EXISTS (subquery)\` is true when the subquery returns at least one row. It never looks at *what* the rows contain, so the convention is \`SELECT 1\`:

\`\`\`sql
SELECT c.name
FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.status = 'refunded');
\`\`\`

\`EXISTS\` is almost always correlated, and it can stop at the first match, which makes it cheap. In SQLite it is also an expression with a value — 1 or 0 — so it can go in the \`SELECT\` list as a yes/no column.
--- task
Return every product priced **above the average price of its own category**: its \`name\`, \`category\`, \`price\`, and a column \`sold_shipped\` that is \`1\` if the product appears in at least one \`shipped\` order and \`0\` otherwise. Use a correlated subquery for the average and \`EXISTS\` for \`sold_shipped\`.
--- starter
SELECT name, category, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);
--- solution
SELECT p.name, p.category, p.price,
       EXISTS (
         SELECT 1
         FROM order_items oi
         JOIN orders o ON o.id = oi.order_id
         WHERE oi.product_id = p.id AND o.status = 'shipped'
       ) AS sold_shipped
FROM products p
WHERE p.price > (SELECT AVG(x.price) FROM products x WHERE x.category = p.category);
--- hint
The starter compares with the average of *all* products. Give the outer table an alias and add \`WHERE x.category = p.category\` inside.
--- hint
For the flag: \`EXISTS (SELECT 1 FROM order_items oi JOIN orders o ON … WHERE oi.product_id = p.id AND o.status = 'shipped') AS sold_shipped\`.
--- check result | Fountain pen (never shipped), Desk lamp and Headphones
[["Fountain pen", "stationery", 32.0, 0], ["Desk lamp", "home", 45.0, 1], ["Headphones", "electronics", 89.0, 1]]
--- check source | Uses EXISTS
\\b[Ee][Xx][Ii][Ss][Tt][Ss]\\s*\\(

=== sql2-07 | CASE: decisions inside a query
--- teach
\`CASE\` turns conditions into values. The searched form checks each \`WHEN\` in order and returns the first match:

\`\`\`sql
SELECT name,
       CASE
         WHEN price >= 50 THEN 'premium'
         WHEN price >= 10 THEN 'standard'
         ELSE 'budget'
       END AS tier
FROM products;
\`\`\`

Order matters: a price of 89 is also \`>= 10\`, but the first true \`WHEN\` wins, so list the narrowest conditions first. Without an \`ELSE\`, anything that matches nothing becomes NULL — usually a sign you forgot a case, so write the \`ELSE\`.

There is a short form for comparing one expression with fixed values:

\`\`\`sql
CASE status WHEN 'paid' THEN 'open' WHEN 'shipped' THEN 'done' ELSE 'closed' END
\`\`\`

Boundaries are where bugs live. "Orders of 25 or more are medium" means \`>= 25\`, and an order of exactly 25.00 must land in medium. Decide each edge on purpose, then test the edge.

\`CASE\` works anywhere an expression does — in \`SELECT\`, \`ORDER BY\`, inside \`SUM(...)\` — which makes it one of the most useful tools in SQL.
--- task
Return one row per order with its \`id\`, its \`total\` (the sum of \`qty * unit_price\`, rounded to 2 decimals) and a \`size\`: \`'small'\` under 25, \`'medium'\` from 25 up to (but not including) 100, and \`'large'\` at 100 or more. Sort by id.
--- starter
SELECT order_id AS id, ROUND(SUM(qty * unit_price), 2) AS total
FROM order_items
GROUP BY order_id
ORDER BY order_id;
--- solution
SELECT order_id AS id,
       ROUND(SUM(qty * unit_price), 2) AS total,
       CASE
         WHEN SUM(qty * unit_price) >= 100 THEN 'large'
         WHEN SUM(qty * unit_price) >= 25  THEN 'medium'
         ELSE 'small'
       END AS size
FROM order_items
GROUP BY order_id
ORDER BY order_id;
--- hint
Add a third column: \`CASE WHEN … THEN … END AS size\`.
--- hint
Test the largest bucket first: \`WHEN SUM(qty * unit_price) >= 100 THEN 'large'\`, then \`>= 25\`, then \`ELSE 'small'\`. Order 8 totals exactly 25.00.
--- check result | Eight orders sized, order 8 (exactly 25) is medium
ordered
[[1, 22.5, "small"], [2, 80.1, "medium"], [3, 32.0, "medium"], [4, 58.0, "medium"], [5, 37.8, "medium"], [6, 107.0, "large"], [7, 45.0, "medium"], [8, 25.0, "medium"]]

=== sql2-08 | Working with text
--- teach
Real text is messy: capitals, stray spaces, missing values. SQLite's text functions clean it up:

| Function | Does |
| --- | --- |
| \`lower(s)\`, \`upper(s)\` | change case |
| \`trim(s)\` | remove spaces at both ends (\`ltrim\`, \`rtrim\` for one end) |
| \`length(s)\` | number of characters |
| \`substr(s, start, n)\` | the piece from \`start\` (counting from 1), \`n\` long; leave \`n\` out for "to the end" |
| \`instr(s, t)\` | where \`t\` first appears in \`s\` (0 if it does not) |
| \`replace(s, a, b)\` | every \`a\` replaced by \`b\` |
| \`a || b\` | joins text |

They combine. Everything after the \`@\` in an email:

\`\`\`sql
SELECT substr(email, instr(email, '@') + 1) FROM customers;
\`\`\`

Clean **before** you compare or group. \`'Mail.com'\`, \`'mail.com'\` and \`'mail.com '\` are three different strings to \`GROUP BY\`, so a report grouped on raw text quietly splits one bucket into three. Normalise with \`lower(trim(...))\` first.

Two more things to know. \`LIKE\` ignores case for plain letters in SQLite, but \`=\` does not. And every text function given NULL returns NULL — a missing email has no domain, and it will show up as a NULL group unless you filter it out.
--- task
Count customers per email **domain** (the part after the \`@\`), treating domains case-insensitively and ignoring stray spaces. Return \`domain\` (lower-case, trimmed) and \`customers\`, skipping customers with no email. Sort by \`customers\` descending, then \`domain\`.
--- starter
SELECT substr(email, instr(email, '@') + 1) AS domain, COUNT(*) AS customers
FROM customers
GROUP BY domain
ORDER BY customers DESC, domain;
--- solution
SELECT lower(trim(substr(email, instr(email, '@') + 1))) AS domain,
       COUNT(*) AS customers
FROM customers
WHERE email IS NOT NULL
GROUP BY domain
ORDER BY customers DESC, domain;
--- hint
Run the starter: \`Mail.com\` and \`mail.com\` are counted apart, \`Work.io \` has a trailing space, and Cleo's NULL email makes a group of its own.
--- hint
Wrap the domain in \`lower(trim(...))\` and add \`WHERE email IS NOT NULL\`.
--- check result | mail.com 3, work.io 2, post.org 1
ordered
[["mail.com", 3], ["work.io", 2], ["post.org", 1]]

=== sql2-09 | Dates and times
--- teach
SQLite has no separate date type. Dates are stored as text in ISO format — \`'2024-03-20'\` or \`'2024-03-20 18:40:00'\` — and that is enough, because ISO text sorts in time order and a set of functions understands it:

\`\`\`sql
SELECT date('2024-03-20 18:40:00');              -- '2024-03-20'
SELECT date('2024-03-20', '+10 days');           -- '2024-03-30'
SELECT date('2024-03-20', 'start of month');     -- '2024-03-01'
SELECT date('2024-01-31', '+1 month');           -- '2024-03-02' (no Feb 31st!)
SELECT strftime('%Y-%m', '2024-03-20 18:40:00'); -- '2024-03'
SELECT julianday('2024-03-20') - julianday('2024-03-02');  -- 18.0 days
\`\`\`

\`strftime(format, time)\` formats: \`%Y\` year, \`%m\` month, \`%d\` day, \`%H\` hour, \`%W\` week of the year, \`%w\` weekday (0 is Sunday). \`date('now')\` is today.

For monthly reports, group by \`strftime('%Y-%m', placed)\`: every timestamp in March collapses to \`'2024-03'\`.

Beware the join trap from the grouping lesson: once \`orders\` is joined to \`order_items\`, there is one row per *item*, so \`COUNT(*)\` counts items. To count orders, use \`COUNT(DISTINCT o.id)\`.

Comparing ranges works on the text directly: \`placed >= '2024-04-01' AND placed < '2024-05-01'\` is April — and, unlike wrapping the column in a function, a database can use an index for it. You will see why that matters when you meet indexes in the advanced course.
--- task
Return a monthly sales report over orders whose status is \`paid\` or \`shipped\`: \`month\` (as \`'YYYY-MM'\`), \`orders\` (the number of different orders), and \`revenue\` (the sum of \`qty * unit_price\`, rounded to 2 decimals). Sort by month.
--- starter
SELECT placed AS month, COUNT(*) AS orders
FROM orders
GROUP BY placed;
--- solution
SELECT strftime('%Y-%m', o.placed) AS month,
       COUNT(DISTINCT o.id) AS orders,
       ROUND(SUM(oi.qty * oi.unit_price), 2) AS revenue
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
WHERE o.status IN ('paid', 'shipped')
GROUP BY month
ORDER BY month;
--- hint
\`strftime('%Y-%m', o.placed)\` turns each timestamp into its month; group by that.
--- hint
Join \`order_items\` for revenue, and count orders with \`COUNT(DISTINCT o.id)\` — the join makes one row per item.
--- check result | Four months, with order counts and revenue
ordered
[["2024-03", 2, 102.6], ["2024-04", 2, 95.8], ["2024-05", 1, 107.0], ["2024-06", 1, 25.0]]

=== sql2-10 | Debugging: the rows NULL made disappear
--- teach
**The bug report.** Marketing asked for every order that did **not** use the \`SPRING10\` coupon, with a readable coupon label. The query below returns two orders. There are eight orders and two used \`SPRING10\`, so six were expected.

How to debug a query that returns too few rows:

1. **Reproduce and count.** \`SELECT COUNT(*) FROM orders\` gives 8; the answer should be 8 − 2 = 6.
2. **Look at what went missing.** \`SELECT id, coupon FROM orders\` — every missing order has \`coupon\` = NULL.
3. **Check your assumption.** The query assumes \`coupon != 'SPRING10'\` is true for "no coupon". It is not.

SQL uses **three-valued logic**: a comparison is true, false or *unknown*. Any comparison with NULL — \`NULL = 'x'\`, \`NULL != 'x'\`, even \`NULL = NULL\` — is unknown, and \`WHERE\` keeps only rows where the condition is **true**. So \`coupon != 'SPRING10'\` silently drops every order with no coupon. \`NOT (…)\` does not rescue it: not-unknown is still unknown.

Fixes, from most to least explicit:

\`\`\`sql
WHERE coupon IS NULL OR coupon <> 'SPRING10'
WHERE coupon IS NOT 'SPRING10'        -- SQLite: IS / IS NOT treat NULL as a value
WHERE COALESCE(coupon, '') <> 'SPRING10'
\`\`\`

\`COALESCE(a, b, …)\` returns its first non-NULL argument, which also makes labels: \`COALESCE(coupon, 'none')\`. And watch for the cousin of NULL: the **empty string**. Order 7 has \`coupon = ''\`, which is *not* NULL, so COALESCE leaves it alone. \`NULLIF(x, '')\` turns \`''\` into NULL, so \`COALESCE(NULLIF(trim(coupon), ''), 'none')\` handles both.
--- task
Fix the query so it returns every order that did not use \`SPRING10\`: its \`id\` and a \`coupon_label\` that shows the coupon code, or \`'none'\` when the coupon is NULL or blank. Sort by id.
--- starter
SELECT id, coupon AS coupon_label
FROM orders
WHERE coupon != 'SPRING10'
ORDER BY id;
--- solution
SELECT id, COALESCE(NULLIF(trim(coupon), ''), 'none') AS coupon_label
FROM orders
WHERE coupon IS NULL OR coupon <> 'SPRING10'
ORDER BY id;
--- hint
Look at the coupons of the missing orders with \`SELECT id, coupon FROM orders\`. What does \`NULL != 'SPRING10'\` evaluate to?
--- hint
Let NULL coupons through explicitly: \`WHERE coupon IS NULL OR coupon <> 'SPRING10'\`.
--- hint
For the label, \`COALESCE(...)\` handles NULL but not \`''\`; wrap the coupon in \`NULLIF(trim(coupon), '')\` first.
--- check result | Six orders, blank and missing coupons labelled none
ordered
[[1, "none"], [3, "none"], [4, "WELCOME5"], [6, "none"], [7, "none"], [8, "none"]]

=== sql2-11 | DISTINCT, UNION and UNION ALL
--- teach
\`SELECT DISTINCT\` removes duplicate rows from a result — duplicates across **all** the selected columns, not just the first:

\`\`\`sql
SELECT DISTINCT city FROM customers;          -- London, Paris, NULL, Berlin
SELECT DISTINCT city, referred_by FROM customers;  -- pairs, so more rows
\`\`\`

To stack two results on top of each other, use \`UNION\` or \`UNION ALL\`. Both need the same number of columns, and the column names come from the first \`SELECT\`:

\`\`\`sql
SELECT email FROM customers
UNION ALL
SELECT email FROM newsletter;
\`\`\`

- \`UNION ALL\` keeps every row, duplicates included. It is cheaper and the right choice when you want counts or know the parts cannot overlap.
- \`UNION\` removes duplicates from the combined result, including duplicates *within* one side.

An \`ORDER BY\` goes once, at the very end, and sorts the whole combined result.

Deduplication compares values exactly. \`'BEN@Mail.com'\` and \`'ben@mail.com'\` are different strings, so neither \`DISTINCT\` nor \`UNION\` will merge them. When you mean "the same address", normalise inside each \`SELECT\` before the union does its work.
--- task
Build one mailing list from customers and newsletter subscribers: every **distinct** email address, lower-cased and trimmed, with no NULLs, as a single column named \`email\`, sorted alphabetically.
--- starter
SELECT email FROM customers
UNION ALL
SELECT email FROM newsletter;
--- solution
SELECT lower(trim(email)) AS email FROM customers WHERE email IS NOT NULL
UNION
SELECT lower(trim(email)) FROM newsletter
ORDER BY email;
--- hint
\`UNION\` (without \`ALL\`) removes duplicates — but only exact ones. Normalise each side with \`lower(trim(email))\`.
--- hint
Filter Cleo's NULL out with \`WHERE email IS NOT NULL\` on the customers side, and put a single \`ORDER BY email\` at the end.
--- check result | Eight addresses, each once
ordered
[["ada@mail.com"], ["ben@mail.com"], ["dev@work.io"], ["eve@mail.com"], ["finn@work.io"], ["gus@post.org"], ["max@post.org"], ["zoe@mail.com"]]

=== sql2-12 | Pagination with LIMIT and OFFSET
--- teach
Apps show long lists a page at a time. \`LIMIT n OFFSET k\` skips \`k\` rows, then returns the next \`n\`. With a page size of 3, page \`p\` (counting from 1) is:

\`\`\`sql
SELECT name, price FROM products
ORDER BY price DESC, name
LIMIT 3 OFFSET 3;   -- page 2: skip (2 - 1) * 3 rows
\`\`\`

The part people forget is the **tie-breaker**. If two products cost the same, \`ORDER BY price DESC\` alone does not say which comes first, and the database may choose differently from one query to the next. Then an item can show up on two pages, or on none. Always end the \`ORDER BY\` with something unique, or at least something that fully decides the order the user expects.

\`OFFSET\` has a cost: to skip 10,000 rows the database still has to find and throw away 10,000 rows. For deep pages, **keyset pagination** is faster — remember the last row you showed and ask for what comes after it:

\`\`\`sql
-- the last row on the previous page was ('Fountain pen', 32.0)
SELECT name, price FROM products
WHERE price < 32.0 OR (price = 32.0 AND name > 'Fountain pen')
ORDER BY price DESC, name
LIMIT 3;
\`\`\`

It also stays correct when rows are inserted while someone is paging.
--- task
Return **page 2** of the product list, 3 products per page, sorted by price from highest to lowest, with ties broken by name A to Z. Return \`name\` and \`price\`.
--- starter
SELECT name, price
FROM products
ORDER BY price DESC
LIMIT 3;
--- solution
SELECT name, price
FROM products
ORDER BY price DESC, name
LIMIT 3 OFFSET 3;
--- hint
Page 2 skips the first page: \`OFFSET 3\`.
--- hint
Bookends and Mug cost the same. Add \`name\` after \`price DESC\` in the \`ORDER BY\` so their order is decided.
--- check result | Planner, Bookends, Mug — in that order
ordered
[["Planner", 18.0], ["Bookends", 9.0], ["Mug", 9.0]]

=== sql2-13 | Changing data with conditions
--- teach
\`UPDATE\` and \`DELETE\` get their power from \`WHERE\`, and \`WHERE\` can use everything you have learned — including subqueries into other tables:

\`\`\`sql
-- cancel paid orders from customers who have no email on file
UPDATE orders SET status = 'cancelled'
WHERE status = 'paid'
  AND customer_id IN (SELECT id FROM customers WHERE email IS NULL);
\`\`\`

\`SET\` can compute from the row's current values: \`SET price = price * 1.1\` uses each row's own price. Money is floating point here, so round what you store: \`ROUND(price * 1.1, 2)\`.

\`INSERT\` can take its rows from a query instead of \`VALUES\`:

\`\`\`sql
INSERT INTO newsletter (email, signed_up)
SELECT lower(trim(email)), date('now') FROM customers WHERE city = 'Paris';
\`\`\`

The safe routine for any change:

1. Write the \`SELECT\` with the exact \`WHERE\` you plan to use, and check it returns exactly the rows you mean.
2. Change \`SELECT …\` to \`UPDATE … SET …\` or \`DELETE\`, keeping the \`WHERE\` word for word.
3. Query again to confirm the effect.

A subquery on the **same** table you are changing is allowed, but be careful: it sees the table as it was before the statement started.
--- task
Make two changes:

1. Raise the price of every \`stationery\` product by 10%, rounded to 2 decimals.
2. Delete every newsletter row whose email (lower-cased and trimmed) belongs to a customer (compare the customer's email lower-cased and trimmed too) — they already hear from us.
--- starter
-- 1. Raise stationery prices by 10%.

-- 2. Remove subscribers who are already customers.
--- solution
UPDATE products
SET price = ROUND(price * 1.1, 2)
WHERE category = 'stationery';

DELETE FROM newsletter
WHERE lower(trim(email)) IN (
  SELECT lower(trim(email)) FROM customers WHERE email IS NOT NULL
);
--- hint
\`UPDATE products SET price = ROUND(price * 1.1, 2) WHERE category = 'stationery';\`
--- hint
\`DELETE FROM newsletter WHERE lower(trim(email)) IN (SELECT … FROM customers …);\` — normalise both sides.
--- check query | Stationery prices went up 10%
SELECT name, price FROM products WHERE category = 'stationery' ORDER BY id
=> [["Notebook", 4.95], ["Fountain pen", 35.2], ["Planner", 19.8]]
--- check query | Other prices did not change
SELECT SUM(price) FROM products WHERE category <> 'stationery'
=> [[158.5]]
--- check query | Only non-customers are left on the newsletter
SELECT email FROM newsletter ORDER BY signed_up
=> [["zoe@mail.com"], ["Zoe@mail.com "], ["max@post.org"]]

=== sql2-14 | Debugging: the join that double-counts
--- teach
**The bug report.** Finance runs this report of what each customer ordered and what they paid. Ada's items come to 127.60 and she paid 127.60, but the report says she paid 175.10. Ben's numbers are both inflated too.

The cause is called **fan-out**. Joining a table multiplies rows: an order with 2 items becomes 2 rows. Join payments on as well and an order with 2 items **and** 2 payments becomes 2 × 2 = 4 rows — every item paired with every payment. \`SUM\` then adds each payment once per item and each item once per payment.

How to find it:

1. **Pick one wrong number and shrink the query to it.** Add \`WHERE c.name = 'Ada'\`.
2. **Remove the aggregation and look at the raw rows** — \`SELECT o.id, oi.product_id, p.amount …\`. You will see the same payment repeated.
3. **Count rows per key.** If a row you expected once appears several times, a join is fanning out.

The fix is not \`DISTINCT\` inside \`SUM\` — two genuinely different payments of the same amount would then merge. The fix is to **aggregate each child table down to one row per order first**, then join those one-row-per-order results. A \`WITH\` can hold several named steps, separated by commas:

\`\`\`sql
WITH items AS (
  SELECT order_id, SUM(qty * unit_price) AS items_total
  FROM order_items GROUP BY order_id
), paid AS (
  SELECT order_id, SUM(amount) AS paid_total
  FROM payments GROUP BY order_id
)
SELECT …
FROM orders o
JOIN items i     ON i.order_id = o.id
LEFT JOIN paid p ON p.order_id = o.id
\`\`\`

Joining one-to-one pieces cannot multiply anything. The general rule: never sum across two independent one-to-many joins at once.
--- task
Fix the report so each customer with orders shows their correct \`items_total\` and \`paid_total\` (both over all their orders, rounded to 2 decimals). Keep the columns \`name\`, \`items_total\`, \`paid_total\`. Customers whose orders have no payments at all should show \`0\` paid.
--- starter
SELECT c.name,
       ROUND(SUM(oi.qty * oi.unit_price), 2) AS items_total,
       ROUND(SUM(p.amount), 2) AS paid_total
FROM customers c
JOIN orders o       ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
LEFT JOIN payments p ON p.order_id = o.id
GROUP BY c.id;
--- solution
WITH items AS (
  SELECT order_id, SUM(qty * unit_price) AS items_total
  FROM order_items
  GROUP BY order_id
), paid AS (
  SELECT order_id, SUM(amount) AS paid_total
  FROM payments
  GROUP BY order_id
)
SELECT c.name,
       ROUND(SUM(i.items_total), 2) AS items_total,
       ROUND(COALESCE(SUM(p.paid_total), 0), 2) AS paid_total
FROM customers c
JOIN orders o    ON o.customer_id = c.id
JOIN items i     ON i.order_id = o.id
LEFT JOIN paid p ON p.order_id = o.id
GROUP BY c.id;
--- hint
Add \`WHERE c.name = 'Ada'\` and select the raw rows without \`SUM\`. Which payment appears twice, and why?
--- hint
Sum \`order_items\` per order in one \`WITH\` step and \`payments\` per order in another; each then has one row per order.
--- hint
Join \`orders\` to both steps and sum those per customer. Ben's cancelled order has no payment, so wrap the paid sum in \`COALESCE(…, 0)\` only where it could be NULL.
--- check result | Correct totals; Ben paid 58, Eve's refund nets to 0
[["Ada", 127.6, 127.6], ["Ben", 90.0, 58.0], ["Cleo", 37.8, 37.8], ["Dev", 107.0, 107.0], ["Eve", 45.0, 0.0]]

=== sql2-15 | Problem: the second-highest salary
--- schema
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  dept TEXT NOT NULL,
  salary INTEGER
);
INSERT INTO employees (id, name, dept, salary) VALUES
  (1,  'Ana', 'eng',    120000),
  (2,  'Bo',  'eng',    120000),
  (3,  'Cy',  'eng',     95000),
  (4,  'Di',  'eng',     80000),
  (5,  'Ed',  'sales',   70000),
  (6,  'Flo', 'sales',   70000),
  (7,  'Gia', 'ops',     60000),
  (8,  'Hal', 'sales',   55000),
  (9,  'Ivy', 'design',  65000),
  (10, 'Jo',  'eng',     NULL),
  (11, 'Kit', 'design',  65000);
--- teach
This lesson's database has one table, \`employees\` (\`id\`, \`name\`, \`dept\`, \`salary\`). Contractors have a NULL salary.

**The problem.** For each department, find the second-highest salary. "Second-highest" means the second-highest *distinct* amount: if two people share the top salary, the answer is the next amount below it. A department with fewer than two distinct salaries has no second-highest, and should show NULL rather than vanish.

How to approach a problem like this:

1. **Restate it with examples.** eng earns 120000, 120000, 95000, 80000 (and one NULL). The second-highest is 95000, not 120000.
2. **Try the obvious answer and find where it breaks.** \`ORDER BY salary DESC LIMIT 1 OFFSET 1\` returns the second *row* — 120000 again, because of the tie. It also works on one department at a time only.
3. **Rephrase.** "The second-highest salary" is "the highest salary that is below the highest salary". That is two MAXes, one inside the other:

\`\`\`sql
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
\`\`\`

4. **Generalise.** Make it per department with a correlated subquery, and drive the query from the list of departments so every department appears, even the ones with no answer. A subquery in \`FROM\` — \`(SELECT DISTINCT dept FROM employees) d\` — works like a table, as long as you give it an alias. \`MAX\` over no rows returns NULL — exactly the "no answer" you want.

5. **Check the edge cases against the data:** a tie at the top (eng, sales), a department with one person (ops), a department where everyone earns the same (design), and NULL salaries (MAX ignores them).
--- task
Return one row per department: \`dept\` and \`second_salary\` (the second-highest distinct salary, or NULL if there is none). Sort by \`dept\`.
--- starter
SELECT dept, salary AS second_salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
--- solution
SELECT d.dept,
       (SELECT MAX(e.salary)
        FROM employees e
        WHERE e.dept = d.dept
          AND e.salary < (SELECT MAX(salary) FROM employees WHERE dept = d.dept)
       ) AS second_salary
FROM (SELECT DISTINCT dept FROM employees) d
ORDER BY d.dept;
--- hint
For one department: the MAX salary that is less than the MAX salary.
--- hint
Drive the query from \`(SELECT DISTINCT dept FROM employees) d\`, so every department gets a row.
--- hint
Put the "max below the max" in a scalar subquery in the SELECT list, correlated on \`e.dept = d.dept\` (the inner MAX needs \`dept = d.dept\` too).
--- check result | design NULL, eng 95000, ops NULL, sales 55000
ordered
[["design", null], ["eng", 95000], ["ops", null], ["sales", 55000]]

=== sql2-16 | Problem: finding what is missing
--- teach
**The problem.** Sales wants to win back customers who have never bought anything. "Bought" means an order that is \`paid\` or \`shipped\`: a customer whose only order was refunded or cancelled has not really bought.

This is an **anti-join**: rows in one table with *no* match in another. You cannot find them with an ordinary join, because a join only produces rows that match. There are three standard ways to ask for a missing match:

\`\`\`sql
-- 1. NOT EXISTS: clearest, and safe with NULLs
SELECT c.name FROM customers c
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);

-- 2. LEFT JOIN, then keep the rows where the right side is missing
SELECT c.name FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;

-- 3. NOT IN: works, until the list contains a NULL
SELECT c.name FROM customers c
WHERE c.id NOT IN (SELECT customer_id FROM orders);
\`\`\`

The trap in option 3: \`x NOT IN (1, 2, NULL)\` means \`x <> 1 AND x <> 2 AND x <> NULL\`, and the last comparison is *unknown*, so the whole condition is never true. Try "customers who never referred anyone":

\`\`\`sql
SELECT name FROM customers
WHERE id NOT IN (SELECT referred_by FROM customers);  -- no rows at all!
\`\`\`

\`referred_by\` is NULL for several customers, so the list contains NULL and the answer is empty — without any error. Prefer \`NOT EXISTS\`; it has no such trap.

A wrong turn many people take first: \`JOIN orders … WHERE status NOT IN ('paid', 'shipped')\`. That finds customers who have *some* order that is not a purchase — a different question.
--- task
Return the names of the customers who have **no** order with status \`paid\` or \`shipped\` (including customers with no orders at all), alphabetically.
--- starter
SELECT DISTINCT c.name
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.status NOT IN ('paid', 'shipped')
ORDER BY c.name;
--- solution
SELECT c.name
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.id AND o.status IN ('paid', 'shipped')
)
ORDER BY c.name;
--- hint
The starter finds Ben, who has bought (order 4), and misses Finn and Gus, who have no orders to join.
--- hint
Ask per customer whether a purchase exists: \`WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND …)\`.
--- check result | Eve (refunded only), Finn and Gus
ordered
[["Eve"], ["Finn"], ["Gus"]]

=== sql2-17 | Design: choosing the joins for a report
--- teach
Every report is a set of decisions about joins. Make them on purpose, from the requirements, before you write a line:

| The requirement says… | Use |
| --- | --- |
| "only X that have a Y" | \`JOIN\` (inner) |
| "every X, with its Y if there is one" | \`LEFT JOIN\` from X |
| "every X and every Y, matched where possible" | \`FULL OUTER JOIN\` (SQLite 3.39+) |
| "every combination of X and Y" | \`CROSS JOIN\` — calendars, grids |
| "X that has no Y" | \`NOT EXISTS\` / anti-join |

Then three questions for each LEFT JOIN:

1. **Which rows must survive?** That is the table you start \`FROM\`. Everything else hangs off it.
2. **Where does each filter go?** A condition on a LEFT-joined table goes in its \`ON\`, or it turns the join back into an inner join (lesson 2).
3. **Could this join multiply rows?** If two one-to-many tables hang off the same row, aggregate one of them first (lesson 14). Count rows as you add each join.

Then decide what "nothing" looks like: \`COUNT(o.id)\` gives 0 for no matches, \`MAX(...)\` gives NULL, and \`SUM(...)\` gives NULL unless you \`COALESCE\` it.

Build the query one join at a time and run it after each step. A report that is wrong usually went wrong at one specific join, and you will see it the moment it happens.
--- task
Build the **account review**: one row for **every** customer, sorted by name, with columns \`name\`; \`referrer\` (the referring customer's name, or NULL); \`live_orders\` (their number of \`paid\` or \`shipped\` orders, 0 if none); and \`last_order\` (the date — \`'YYYY-MM-DD'\`, no time — of their most recent \`paid\` or \`shipped\` order, or NULL).
--- starter
SELECT c.name, r.name AS referrer, COUNT(o.id) AS live_orders, MAX(o.placed) AS last_order
FROM customers c
JOIN customers r ON r.id = c.referred_by
JOIN orders o    ON o.customer_id = c.id
WHERE o.status IN ('paid', 'shipped')
GROUP BY c.id, c.name, r.name
ORDER BY c.name;
--- solution
SELECT c.name,
       r.name AS referrer,
       COUNT(o.id) AS live_orders,
       date(MAX(o.placed)) AS last_order
FROM customers c
LEFT JOIN customers r ON r.id = c.referred_by
LEFT JOIN orders o
  ON o.customer_id = c.id AND o.status IN ('paid', 'shipped')
GROUP BY c.id, c.name, r.name
ORDER BY c.name;
--- hint
"Every customer" means both joins must be \`LEFT JOIN\`s from \`customers\`.
--- hint
The status filter belongs in the orders join's \`ON\`, not in \`WHERE\`.
--- hint
\`date(MAX(o.placed))\` drops the time; it stays NULL when there are no live orders.
--- check result | All seven customers, with NULLs and zeros where nothing matched
ordered
[["Ada", null, 3, "2024-06-01"], ["Ben", "Ada", 1, "2024-04-07"], ["Cleo", "Ada", 1, "2024-04-07"], ["Dev", "Ben", 1, "2024-05-15"], ["Eve", null, 0, null], ["Finn", "Dev", 0, null], ["Gus", null, 0, null]]
`,Pe=`@track sql
@level projects
@title SQL · Projects
@name SQL projects: three real databases, then your own designs
@blurb Build three working databases end to end — an online store, a product-analytics pipeline and a library — then design three more from a written specification, with nothing but the requirements to go on.
@schema
CREATE TABLE events (
  event_id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  ts TEXT NOT NULL
);
INSERT INTO events (event_id, user_id, name, ts) VALUES
  ('e01', 1, 'visit',    '2024-07-01 09:00:00'),
  ('e02', 1, 'signup',   '2024-07-01 09:05:00'),
  ('e03', 2, 'visit',    '2024-07-01 10:00:00'),
  ('e04', 2, 'visit',    '2024-07-01 17:00:00'),
  ('e05', 1, 'activate', '2024-07-02 08:00:00'),
  ('e06', 3, 'visit',    '2024-07-02 09:00:00'),
  ('e07', 3, 'signup',   '2024-07-02 09:02:00'),
  ('e08', 2, 'signup',   '2024-07-02 11:00:00'),
  ('e09', 3, 'activate', '2024-07-03 15:00:00'),
  ('e10', 1, 'visit',    '2024-07-03 16:00:00'),
  ('e11', 4, 'visit',    '2024-07-03 18:00:00'),
  ('e12', 4, 'signup',   '2024-07-03 18:10:00'),
  ('e13', 2, 'activate', '2024-07-05 11:00:00'),
  ('e14', 5, 'visit',    '2024-07-05 11:00:00'),
  ('e15', 5, 'signup',   '2024-07-05 11:30:00'),
  ('e16', 1, 'visit',    '2024-07-05 12:00:00'),
  ('e17', 4, 'visit',    '2024-07-06 09:00:00'),
  ('e18', 3, 'visit',    '2024-07-06 10:00:00'),
  ('e19', 6, 'signup',   '2024-07-07 21:00:00'),
  ('e20', 6, 'visit',    '2024-07-07 22:00:00'),
  ('e21', 2, 'visit',    '2024-07-07 08:00:00'),
  ('e22', 1, 'visit',    '2024-07-08 09:00:00'),
  ('e23', 5, 'activate', '2024-07-09 09:00:00'),
  ('e24', 3, 'visit',    '2024-07-09 13:00:00'),
  ('e25', 4, 'activate', '2024-07-10 10:00:00');
@end

=== sqlp-01 | Store 1: the schema
--- schema
CREATE TABLE import_rows (
  order_ref INTEGER NOT NULL,
  placed TEXT NOT NULL,
  email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  country TEXT NOT NULL,
  sku TEXT NOT NULL,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  qty INTEGER NOT NULL,
  status TEXT NOT NULL
);
INSERT INTO import_rows VALUES
  (1001, '2024-01-03 10:00:00', 'ana@mail.com',  'Ana Ruiz',  'ES', 'MUG',   'Mug',          'home',        '9.00',  2, 'paid'),
  (1001, '2024-01-03 10:00:00', 'ana@mail.com',  'Ana Ruiz',  'ES', 'PEN',   'Fountain pen', 'stationery',  '32.50', 1, 'paid'),
  (1002, '2024-01-15 12:30:00', 'BO@mail.com ',  'Bo Chen',   'UK', 'LAMP',  'Desk lamp',    'home',        '45.00', 1, 'SHIPPED'),
  (1003, '2024-02-01 09:00:00', 'cy@mail.com',   'Cy Diaz',   'US', 'MUG',   'Mug',          'home',        '9.00',  4, 'shipped'),
  (1003, '2024-02-01 09:00:00', 'cy@mail.com',   'Cy Diaz',   'US', 'NOTE',  'Notebook',     'stationery',  '4.35',  3, 'shipped'),
  (1003, '2024-02-01 09:00:00', 'cy@mail.com',   'Cy Diaz',   'US', 'NOTE',  'Notebook',     'stationery',  '4.35',  3, 'shipped'),
  (1004, '2024-02-14 18:00:00', ' ana@mail.com', 'Ana Ruiz',  'ES', 'HEAD',  'Headphones',   'electronics', '89.99', 1, 'Paid'),
  (1005, '2024-02-20 11:11:00', 'dee@mail.com',  'Dee Evans', 'UK', 'PEN',   'Fountain pen', 'stationery',  '32.50', 2, 'refunded'),
  (1006, '2024-03-05 16:45:00', 'bo@mail.com',   'Bo Chen',   'UK', 'HEAD',  'Headphones',   'electronics', '79.99', 1, 'paid'),
  (1006, '2024-03-05 16:45:00', 'bo@mail.com',   'Bo Chen',   'UK', 'CABLE', 'USB cable',    'electronics', '6.50',  3, 'paid'),
  (1007, '2024-03-18 08:20:00', 'cy@mail.com',   'Cy Diaz',   'US', 'LAMP',  'Desk lamp',    'home',        '45.00', 1, 'shipped'),
  (1008, '2024-03-29 21:00:00', 'eli@mail.com',  'Eli Fox',   'US', 'MUG',   'Mug',          'home',        '9.00',  1, 'paid');
--- teach
This course puts the three SQL courses to work. First, three databases built step by step, each lesson carrying on from the last; then three capstones, where you design everything yourself from a written specification.

**Project one: an online store's database**, from an empty file to the reports the owners read every Monday. Four lessons: the schema, loading the data, a revenue report, a customer report.

The shop has been running on spreadsheets. Its export is already here as \`import_rows\`: one row per order line, with the customer and product repeated on every line (you will load it next lesson). First, design where it will live. Four tables, each about one thing:

- \`customers\` — who buys
- \`products\` — what is sold
- \`orders\` — one purchase: who, when, what state it is in
- \`order_items\` — one product within one order: how many, at what price

Decisions worth making on purpose:

- **Money in integer cents.** \`0.1 + 0.2\` is not \`0.3\` in floating point, and sums of prices drift by fractions of a cent. Store \`price_cents INTEGER\`, and divide by 100.0 only for display.
- **The price charged lives on the order line** (\`unit_cents\`), separately from today's list price on \`products\`. Prices change; history must not.
- **Natural keys stay unique.** The database assigns each customer an \`id\`, but an email may still belong to only one customer, and a SKU to one product — say so with \`UNIQUE\`.
- **States are a closed list.** \`CHECK (status IN (...))\` stops \`'Shipped '\` and \`'shiped'\` from ever being stored.
- **One line per product per order.** A composite primary key \`(order_id, product_id)\`; buying two mugs is \`qty = 2\`, not two lines.
- **Children go with their parent.** Deleting an order should delete its lines (\`ON DELETE CASCADE\`), but deleting a product that has been sold should be refused (the default).
--- task
Turn foreign keys on, then create:

- \`customers\` — \`id\` integer primary key; \`email\` text, required, unique; \`name\` text, required; \`country\` text, required
- \`products\` — \`id\` integer primary key; \`sku\` text, required, unique; \`name\`, \`category\` text, required; \`price_cents\` integer, required, not negative
- \`orders\` — \`id\` integer primary key; \`customer_id\` required, referencing \`customers(id)\`; \`placed\` text, required; \`status\` text, required, one of \`'paid'\`, \`'shipped'\`, \`'refunded'\`
- \`order_items\` — \`order_id\` referencing \`orders(id)\` and deleted with its order; \`product_id\` referencing \`products(id)\`; \`qty\` integer, required, at least 1; \`unit_cents\` integer, required, not negative; primary key \`(order_id, product_id)\`
--- starter
PRAGMA foreign_keys = ON;

CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  country TEXT NOT NULL
);
--- solution
PRAGMA foreign_keys = ON;

CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  country TEXT NOT NULL
);
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0)
);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  placed TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('paid', 'shipped', 'refunded'))
);
CREATE TABLE order_items (
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  qty INTEGER NOT NULL CHECK (qty > 0),
  unit_cents INTEGER NOT NULL CHECK (unit_cents >= 0),
  PRIMARY KEY (order_id, product_id)
);
--- hint
Model each table on \`customers\`. Checks go after the type: \`price_cents INTEGER NOT NULL CHECK (price_cents >= 0)\`.
--- hint
\`order_items\` ends with a table constraint, \`PRIMARY KEY (order_id, product_id)\`, and its \`order_id\` has \`REFERENCES orders(id) ON DELETE CASCADE\`.
--- check query | Foreign keys are on
PRAGMA foreign_keys
=> [[1]]
--- check query | A customer, a product and an order with a line can be stored
INSERT INTO customers (id, email, name, country) VALUES (1, 'ana@mail.com', 'Ana', 'ES');
INSERT INTO products (id, sku, name, category, price_cents) VALUES (1, 'MUG', 'Mug', 'home', 900);
INSERT INTO orders (id, customer_id, placed, status) VALUES (1, 1, '2024-01-03 10:00:00', 'paid');
INSERT INTO order_items (order_id, product_id, qty, unit_cents) VALUES (1, 1, 2, 900) RETURNING order_id, qty
=> [[1, 2]]
--- check query | A second customer with the same email is refused
INSERT OR IGNORE INTO customers (id, email, name, country) VALUES (2, 'ana@mail.com', 'Ana B', 'ES') RETURNING id
=> []
--- check query | A duplicate SKU or a negative price is refused
INSERT OR IGNORE INTO products (id, sku, name, category, price_cents) VALUES (2, 'MUG', 'Mug 2', 'home', 900), (3, 'CUP', 'Cup', 'home', -1) RETURNING id
=> []
--- check query | An unknown status is refused
INSERT OR IGNORE INTO orders (id, customer_id, placed, status) VALUES (2, 1, '2024-01-04 10:00:00', 'Shipped ') RETURNING id
=> []
--- check query | A zero quantity, or the same product twice in one order, is refused
INSERT OR IGNORE INTO order_items (order_id, product_id, qty, unit_cents) VALUES (1, 1, 1, 900) RETURNING qty
=> []
--- check query | order_items points at orders (cascading) and products
SELECT "table", "from", on_delete FROM pragma_foreign_key_list('order_items') ORDER BY "from"
=> [["orders", "order_id", "CASCADE"], ["products", "product_id", "NO ACTION"]]
--- check query | Deleting an order deletes its lines
DELETE FROM orders WHERE id = 1;
SELECT COUNT(*) FROM order_items
=> [[0]]

=== sqlp-02 | Store 2: loading the export
--- schema
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  country TEXT NOT NULL
);
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0)
);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  placed TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('paid', 'shipped', 'refunded'))
);
CREATE TABLE order_items (
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  qty INTEGER NOT NULL CHECK (qty > 0),
  unit_cents INTEGER NOT NULL CHECK (unit_cents >= 0),
  PRIMARY KEY (order_id, product_id)
);
CREATE TABLE import_rows (
  order_ref INTEGER NOT NULL,
  placed TEXT NOT NULL,
  email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  country TEXT NOT NULL,
  sku TEXT NOT NULL,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  qty INTEGER NOT NULL,
  status TEXT NOT NULL
);
INSERT INTO import_rows VALUES
  (1001, '2024-01-03 10:00:00', 'ana@mail.com',  'Ana Ruiz',  'ES', 'MUG',   'Mug',          'home',        '9.00',  2, 'paid'),
  (1001, '2024-01-03 10:00:00', 'ana@mail.com',  'Ana Ruiz',  'ES', 'PEN',   'Fountain pen', 'stationery',  '32.50', 1, 'paid'),
  (1002, '2024-01-15 12:30:00', 'BO@mail.com ',  'Bo Chen',   'UK', 'LAMP',  'Desk lamp',    'home',        '45.00', 1, 'SHIPPED'),
  (1003, '2024-02-01 09:00:00', 'cy@mail.com',   'Cy Diaz',   'US', 'MUG',   'Mug',          'home',        '9.00',  4, 'shipped'),
  (1003, '2024-02-01 09:00:00', 'cy@mail.com',   'Cy Diaz',   'US', 'NOTE',  'Notebook',     'stationery',  '4.35',  3, 'shipped'),
  (1003, '2024-02-01 09:00:00', 'cy@mail.com',   'Cy Diaz',   'US', 'NOTE',  'Notebook',     'stationery',  '4.35',  3, 'shipped'),
  (1004, '2024-02-14 18:00:00', ' ana@mail.com', 'Ana Ruiz',  'ES', 'HEAD',  'Headphones',   'electronics', '89.99', 1, 'Paid'),
  (1005, '2024-02-20 11:11:00', 'dee@mail.com',  'Dee Evans', 'UK', 'PEN',   'Fountain pen', 'stationery',  '32.50', 2, 'refunded'),
  (1006, '2024-03-05 16:45:00', 'bo@mail.com',   'Bo Chen',   'UK', 'HEAD',  'Headphones',   'electronics', '79.99', 1, 'paid'),
  (1006, '2024-03-05 16:45:00', 'bo@mail.com',   'Bo Chen',   'UK', 'CABLE', 'USB cable',    'electronics', '6.50',  3, 'paid'),
  (1007, '2024-03-18 08:20:00', 'cy@mail.com',   'Cy Diaz',   'US', 'LAMP',  'Desk lamp',    'home',        '45.00', 1, 'shipped'),
  (1008, '2024-03-29 21:00:00', 'eli@mail.com',  'Eli Fox',   'US', 'MUG',   'Mug',          'home',        '9.00',  1, 'paid');
--- teach
The empty tables from last lesson are here, next to \`import_rows\`, the spreadsheet export. Loading it is \`INSERT … SELECT\`, one table at a time, **parents before children** so every foreign key has something to point at. Before writing any of it, **look at the data**. \`SELECT * FROM import_rows\` shows every problem you have to handle:

- **Emails with stray capitals and spaces**: \`'BO@mail.com '\` and \`' ana@mail.com'\`. Normalise with \`lower(trim(email))\` and group by that.
- **Statuses in mixed case**: \`'SHIPPED'\`, \`'Paid'\`. \`lower(trim(status))\`, or the \`CHECK\` you wrote will (rightly) refuse the row.
- **Prices as text in dollars.** Convert to cents — and watch floating point: \`89.99 * 100\` is \`8998.999999999999\`, and \`CAST(… AS INTEGER)\` truncates to 8998. **Round first**: \`CAST(ROUND(CAST(price AS REAL) * 100) AS INTEGER)\`.
- **An exact duplicate line** (order 1003's notebooks appear twice — the export double-counted). \`SELECT DISTINCT\` drops it; the primary key would refuse it anyway.
- **A product sold at two prices.** The headphones went for 89.99 and, on sale, 79.99. Each line keeps what it was charged; the product's list price is the highest price it has sold at.

Grouping by the normalised email gives one row per customer, but the name and country columns are neither grouped nor aggregated. Every row of a customer carries the same name, so \`MIN(customer_name)\` is an honest way to pick it — an aggregate, so the query is valid in any database.

Then the linking. \`orders\` needs a \`customer_id\`, which the export does not have — it has an email. Join back to the customers you just inserted on the normalised email to find the id. \`order_items\` finds its \`product_id\` the same way, through the SKU. The order's own id can simply be the export's \`order_ref\`.

Finish by reconciling: the total of the lines you loaded must equal the total in the export, minus the duplicate. Numbers that do not reconcile are a bug in the load, not a rounding curiosity.
--- task
Load \`import_rows\` into the four tables:

- one customer per normalised email (\`lower(trim(email))\`), with their name and country
- one product per SKU, with \`price_cents\` the highest price it sold at, in cents
- one order per \`order_ref\` (use it as the order \`id\`), linked to its customer, with the status lower-cased and trimmed
- one line per order and product, with \`unit_cents\` the price on that line in cents — the duplicate line loaded once
--- starter
INSERT INTO customers (email, name, country)
SELECT email, customer_name, country FROM import_rows;
--- solution
INSERT INTO customers (email, name, country)
SELECT lower(trim(email)), MIN(customer_name), MIN(country)
FROM import_rows
GROUP BY lower(trim(email))
ORDER BY MIN(order_ref);

INSERT INTO products (sku, name, category, price_cents)
SELECT sku, MIN(product_name), MIN(category), MAX(CAST(ROUND(CAST(price AS REAL) * 100) AS INTEGER))
FROM import_rows
GROUP BY sku
ORDER BY MIN(order_ref), sku;

INSERT INTO orders (id, customer_id, placed, status)
SELECT DISTINCT r.order_ref, c.id, r.placed, lower(trim(r.status))
FROM import_rows r
JOIN customers c ON c.email = lower(trim(r.email));

INSERT INTO order_items (order_id, product_id, qty, unit_cents)
SELECT DISTINCT r.order_ref, p.id, r.qty, CAST(ROUND(CAST(r.price AS REAL) * 100) AS INTEGER)
FROM import_rows r
JOIN products p ON p.sku = r.sku;
--- hint
Customers: \`SELECT lower(trim(email)), MIN(customer_name), MIN(country) FROM import_rows GROUP BY lower(trim(email))\`. Products the same way, grouped by SKU, with \`MAX(...)\` of the price in cents.
--- hint
Cents: \`CAST(ROUND(CAST(price AS REAL) * 100) AS INTEGER)\` — without \`ROUND\`, 89.99 becomes 8998.
--- hint
Orders and lines: \`SELECT DISTINCT … FROM import_rows r JOIN customers c ON c.email = lower(trim(r.email))\`, and \`JOIN products p ON p.sku = r.sku\` for the lines.
--- check query | 5 customers, 6 products, 8 orders, 11 lines
SELECT (SELECT COUNT(*) FROM customers), (SELECT COUNT(*) FROM products), (SELECT COUNT(*) FROM orders), (SELECT COUNT(*) FROM order_items)
=> [[5, 6, 8, 11]]
--- check query | Emails are normalised, one customer each
SELECT email, name, country FROM customers ORDER BY email
=> [["ana@mail.com", "Ana Ruiz", "ES"], ["bo@mail.com", "Bo Chen", "UK"], ["cy@mail.com", "Cy Diaz", "US"], ["dee@mail.com", "Dee Evans", "UK"], ["eli@mail.com", "Eli Fox", "US"]]
--- check query | Prices are exact cents, list price the highest sold
SELECT sku, price_cents FROM products ORDER BY sku
=> [["CABLE", 650], ["HEAD", 8999], ["LAMP", 4500], ["MUG", 900], ["NOTE", 435], ["PEN", 3250]]
--- check query | Orders belong to the right customers, with clean statuses
SELECT o.id, c.email, o.status FROM orders o JOIN customers c ON c.id = o.customer_id ORDER BY o.id
=> [[1001, "ana@mail.com", "paid"], [1002, "bo@mail.com", "shipped"], [1003, "cy@mail.com", "shipped"], [1004, "ana@mail.com", "paid"], [1005, "dee@mail.com", "refunded"], [1006, "bo@mail.com", "paid"], [1007, "cy@mail.com", "shipped"], [1008, "eli@mail.com", "paid"]]
--- check query | Each line keeps the price it was charged; the total reconciles
SELECT (SELECT unit_cents FROM order_items oi JOIN products p ON p.id = oi.product_id WHERE oi.order_id = 1006 AND p.sku = 'HEAD'), SUM(qty * unit_cents) FROM order_items
=> [[7999, 45303]]

=== sqlp-03 | Store 3: the revenue report
--- schema
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  country TEXT NOT NULL
);
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0)
);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  placed TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('paid', 'shipped', 'refunded'))
);
CREATE TABLE order_items (
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  qty INTEGER NOT NULL CHECK (qty > 0),
  unit_cents INTEGER NOT NULL CHECK (unit_cents >= 0),
  PRIMARY KEY (order_id, product_id)
);
INSERT INTO customers (id, email, name, country) VALUES
  (1, 'ana@mail.com', 'Ana Ruiz', 'ES'),
  (2, 'bo@mail.com', 'Bo Chen', 'UK'),
  (3, 'cy@mail.com', 'Cy Diaz', 'US'),
  (4, 'dee@mail.com', 'Dee Evans', 'UK'),
  (5, 'eli@mail.com', 'Eli Fox', 'US');
INSERT INTO products (id, sku, name, category, price_cents) VALUES
  (1, 'MUG', 'Mug', 'home', 900),
  (2, 'PEN', 'Fountain pen', 'stationery', 3250),
  (3, 'LAMP', 'Desk lamp', 'home', 4500),
  (4, 'NOTE', 'Notebook', 'stationery', 435),
  (5, 'HEAD', 'Headphones', 'electronics', 8999),
  (6, 'CABLE', 'USB cable', 'electronics', 650);
INSERT INTO orders (id, customer_id, placed, status) VALUES
  (1001, 1, '2024-01-03 10:00:00', 'paid'),
  (1002, 2, '2024-01-15 12:30:00', 'shipped'),
  (1003, 3, '2024-02-01 09:00:00', 'shipped'),
  (1004, 1, '2024-02-14 18:00:00', 'paid'),
  (1005, 4, '2024-02-20 11:11:00', 'refunded'),
  (1006, 2, '2024-03-05 16:45:00', 'paid'),
  (1007, 3, '2024-03-18 08:20:00', 'shipped'),
  (1008, 5, '2024-03-29 21:00:00', 'paid');
INSERT INTO order_items (order_id, product_id, qty, unit_cents) VALUES
  (1001, 1, 2, 900),
  (1001, 2, 1, 3250),
  (1002, 3, 1, 4500),
  (1003, 1, 4, 900),
  (1003, 4, 3, 435),
  (1004, 5, 1, 8999),
  (1005, 2, 2, 3250),
  (1006, 5, 1, 7999),
  (1006, 6, 3, 650),
  (1007, 3, 1, 4500),
  (1008, 1, 1, 900);
--- teach
The store is loaded. (Its tables are here with the data from last lesson.) Now the owners' first question: **where does the money come from, month by month?**

A report like this is a pipeline, and CTEs are its stages:

1. **Line revenue** — join items to orders and products, drop refunded orders, compute \`qty * unit_cents\` per line, and tag each line with its month and category.
2. **Aggregate** — sum per month and category.
3. **Compare** — each category's share of its month, with a window function: \`SUM(revenue) OVER (PARTITION BY month)\` puts the month's total on every row of that month, without collapsing them.

Keep the arithmetic in integer cents until the very end, then convert once: \`ROUND(cents / 100.0, 2)\`. Converting early and then summing reintroduces the floating-point drift you designed away.

Refunds: a refunded order is money you gave back. Excluding it is the simplest honest choice for a revenue report; a finance report would show it as a negative line instead. Either way, decide it explicitly and say so in the column name or the report title — silent inclusion is how two dashboards end up disagreeing.
--- task
Return revenue by month and category, excluding refunded orders: \`month\` (\`'YYYY-MM'\`), \`category\`, \`revenue\` (in dollars, rounded to 2 decimals) and \`share\` (the category's percentage of that month's revenue, rounded to 1 decimal). Sort by month, then revenue from highest to lowest.
--- starter
SELECT strftime('%Y-%m', o.placed) AS month, SUM(oi.qty * oi.unit_cents) AS revenue
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
GROUP BY month;
--- solution
WITH lines AS (
  SELECT strftime('%Y-%m', o.placed) AS month, p.category, oi.qty * oi.unit_cents AS cents
  FROM order_items oi
  JOIN orders o   ON o.id = oi.order_id
  JOIN products p ON p.id = oi.product_id
  WHERE o.status <> 'refunded'
), totals AS (
  SELECT month, category, SUM(cents) AS cents
  FROM lines
  GROUP BY month, category
)
SELECT month, category,
       ROUND(cents / 100.0, 2) AS revenue,
       ROUND(100.0 * cents / SUM(cents) OVER (PARTITION BY month), 1) AS share
FROM totals
ORDER BY month, revenue DESC;
--- hint
First CTE: one row per line with its month, category and \`qty * unit_cents\`, refunded orders filtered out. Second: sum per month and category.
--- hint
\`share\` is \`100.0 * cents / SUM(cents) OVER (PARTITION BY month)\`. Convert cents to dollars only in the final \`SELECT\`.
--- check result | Seven month-and-category rows, refund excluded
ordered
[["2024-01", "home", 63.0, 66.0], ["2024-01", "stationery", 32.5, 34.0], ["2024-02", "electronics", 89.99, 64.7], ["2024-02", "home", 36.0, 25.9], ["2024-02", "stationery", 13.05, 9.4], ["2024-03", "electronics", 99.49, 64.8], ["2024-03", "home", 54.0, 35.2]]

=== sqlp-04 | Store 4: the customer report
--- schema
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  country TEXT NOT NULL
);
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0)
);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  placed TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('paid', 'shipped', 'refunded'))
);
CREATE TABLE order_items (
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  qty INTEGER NOT NULL CHECK (qty > 0),
  unit_cents INTEGER NOT NULL CHECK (unit_cents >= 0),
  PRIMARY KEY (order_id, product_id)
);
INSERT INTO customers (id, email, name, country) VALUES
  (1, 'ana@mail.com', 'Ana Ruiz', 'ES'),
  (2, 'bo@mail.com', 'Bo Chen', 'UK'),
  (3, 'cy@mail.com', 'Cy Diaz', 'US'),
  (4, 'dee@mail.com', 'Dee Evans', 'UK'),
  (5, 'eli@mail.com', 'Eli Fox', 'US');
INSERT INTO products (id, sku, name, category, price_cents) VALUES
  (1, 'MUG', 'Mug', 'home', 900),
  (2, 'PEN', 'Fountain pen', 'stationery', 3250),
  (3, 'LAMP', 'Desk lamp', 'home', 4500),
  (4, 'NOTE', 'Notebook', 'stationery', 435),
  (5, 'HEAD', 'Headphones', 'electronics', 8999),
  (6, 'CABLE', 'USB cable', 'electronics', 650);
INSERT INTO orders (id, customer_id, placed, status) VALUES
  (1001, 1, '2024-01-03 10:00:00', 'paid'),
  (1002, 2, '2024-01-15 12:30:00', 'shipped'),
  (1003, 3, '2024-02-01 09:00:00', 'shipped'),
  (1004, 1, '2024-02-14 18:00:00', 'paid'),
  (1005, 4, '2024-02-20 11:11:00', 'refunded'),
  (1006, 2, '2024-03-05 16:45:00', 'paid'),
  (1007, 3, '2024-03-18 08:20:00', 'shipped'),
  (1008, 5, '2024-03-29 21:00:00', 'paid');
INSERT INTO order_items (order_id, product_id, qty, unit_cents) VALUES
  (1001, 1, 2, 900),
  (1001, 2, 1, 3250),
  (1002, 3, 1, 4500),
  (1003, 1, 4, 900),
  (1003, 4, 3, 435),
  (1004, 5, 1, 8999),
  (1005, 2, 2, 3250),
  (1006, 5, 1, 7999),
  (1006, 6, 3, 650),
  (1007, 3, 1, 4500),
  (1008, 1, 1, 900);
INSERT INTO customers (id, email, name, country) VALUES (6, 'fay@mail.com', 'Fay Gold', 'ES');
--- teach
The second Monday question: **who are our customers, and how much are they worth?** The tables are the same as last lesson, plus Fay, who signed up yesterday and has not ordered yet.

A customer report has to include **every** customer — including the ones who have not bought, because "signed up but never bought" is exactly who marketing wants to reach. That decides the shape: start from \`customers\` and LEFT JOIN everything else.

Three traps, each from an earlier course:

- **Condition placement.** Refunded orders must not count, but a customer whose only order was refunded must still appear. The status filter goes in the LEFT JOIN's \`ON\`.
- **Fan-out.** Joining orders to their lines makes one row per *line*, so \`COUNT(o.id)\` counts lines. Count orders with \`COUNT(DISTINCT o.id)\`, or pre-aggregate each order's total in a CTE first.
- **NULL is not zero.** A customer with no orders has \`SUM(...)\` = NULL. \`COALESCE(…, 0)\` makes the report say what it means.

Then a **segment**, so the numbers turn into action. A \`CASE\` on lifetime spend: big spenders are \`'vip'\`, anyone who has spent something is \`'active'\`, everyone else \`'inactive'\`. Write the boundaries into the task, and test the edges.
--- task
Return one row per customer (all of them): \`email\`, \`orders\` (their non-refunded orders), \`spent\` (total of those orders in dollars, rounded to 2 decimals; 0 if none), \`last_order\` (date of the latest non-refunded order as \`'YYYY-MM-DD'\`, or NULL) and \`segment\` — \`'vip'\` for spend of 100 dollars or more, \`'active'\` for any spend above 0, else \`'inactive'\`. Sort by spent, highest first, then email.
--- starter
SELECT c.email, COUNT(o.id) AS orders
FROM customers c
JOIN orders o ON o.customer_id = c.id
GROUP BY c.id;
--- solution
WITH order_totals AS (
  SELECT o.id, o.customer_id, o.placed, SUM(oi.qty * oi.unit_cents) AS cents
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  WHERE o.status <> 'refunded'
  GROUP BY o.id
), per_customer AS (
  SELECT c.email,
         COUNT(t.id) AS orders,
         COALESCE(SUM(t.cents), 0) AS cents,
         date(MAX(t.placed)) AS last_order
  FROM customers c
  LEFT JOIN order_totals t ON t.customer_id = c.id
  GROUP BY c.id
)
SELECT email, orders,
       ROUND(cents / 100.0, 2) AS spent,
       last_order,
       CASE WHEN cents >= 10000 THEN 'vip'
            WHEN cents > 0 THEN 'active'
            ELSE 'inactive' END AS segment
FROM per_customer
ORDER BY spent DESC, email;
--- hint
Pre-aggregate: a CTE with one row per non-refunded order and its total in cents. That removes the fan-out.
--- hint
LEFT JOIN customers to that CTE, \`COUNT(t.id)\` for orders, \`COALESCE(SUM(t.cents), 0)\` for spend, \`date(MAX(t.placed))\` for the last order.
--- hint
The segment is a \`CASE\` on cents: \`>= 10000\` is vip, \`> 0\` is active.
--- check result | Six customers; Dee (refund only) and Fay (no orders) are inactive
ordered
[["bo@mail.com", 2, 144.49, "2024-03-05", "vip"], ["ana@mail.com", 2, 140.49, "2024-02-14", "vip"], ["cy@mail.com", 2, 94.05, "2024-03-18", "active"], ["eli@mail.com", 1, 9.0, "2024-03-29", "active"], ["dee@mail.com", 0, 0.0, null, "inactive"], ["fay@mail.com", 0, 0.0, null, "inactive"]]

=== sqlp-05 | Analytics 1: ingesting raw events
--- schema
CREATE TABLE raw_events (
  id INTEGER PRIMARY KEY,
  received_at TEXT NOT NULL,
  body TEXT NOT NULL
);
INSERT INTO raw_events (id, received_at, body) VALUES
  (1,  '2024-07-01 09:00:01', '{"event_id": "e1", "user_id": 1, "name": "visit", "ts": "2024-07-01 09:00:00"}'),
  (2,  '2024-07-01 09:03:01', '{"event_id": "e2", "user_id": 1, "name": "signup", "ts": "2024-07-01 09:03:00"}'),
  (3,  '2024-07-01 09:03:09', '{"event_id": "e2", "user_id": 1, "name": "signup", "ts": "2024-07-01 09:03:00"}'),
  (4,  '2024-07-01 10:00:01', '{"event_id": "e3", "user_id": 2, "name": "visit", "ts": "2024-07-01 10:00:00"}'),
  (5,  '2024-07-01 10:20:00', 'not json at all'),
  (6,  '2024-07-01 11:00:01', '{"event_id": "e4", "name": "visit", "ts": "2024-07-01 11:00:00"}'),
  (7,  '2024-07-02 08:00:01', '{"event_id": "e5", "user_id": "3", "name": "Visit", "ts": "2024-07-02 08:00:00"}'),
  (8,  '2024-07-02 10:30:02', '{"event_id": "e6", "user_id": 2, "name": "signup", "ts": "2024-07-02T10:30:00Z"}'),
  (9,  '2024-07-02 12:00:01', '{"event_id": "e7", "user_id": 1, "name": "activate", "ts": "2024-07-02 12:00:00", "props": {"plan": "pro"}}'),
  (10, '2024-07-03 09:00:01', '{"user_id": 4, "name": "visit", "ts": "2024-07-03 09:00:00"}');
--- teach
**Project two: product analytics.** The app sends an event every time a user does something — \`visit\`, \`signup\`, \`activate\` — and the team wants daily actives, a signup funnel and retention. Four lessons: ingest, daily actives, funnel, retention.

Events arrive in \`raw_events\` exactly as the clients sent them: a JSON \`body\` per row. Raw data from the outside world is never clean, and the first job of any pipeline is to turn it into a table you can trust. Read the rows and you find:

- **Body that is not JSON at all** (row 5). \`json_valid(body)\` is 0 for it; every JSON function would error or return NULL.
- **Client retries.** The phone lost signal and sent \`e2\` twice. The event carries its own id, so the id — not the row — decides what is a duplicate. Make \`event_id\` the primary key and load with \`INSERT OR IGNORE\`: the first copy wins, later copies are skipped.
- **Missing required fields**: no \`user_id\` (row 6), no \`event_id\` (row 10). An event you cannot attribute or deduplicate is not usable; skip it (a real pipeline would also count what it skipped).
- **Wrong types**: \`"user_id": "3"\` is a string. \`CAST(… AS INTEGER)\` fixes it — and \`typeof(user_id)\` in the result proves it.
- **Inconsistent values**: \`"Visit"\` vs \`"visit"\`; a timestamp in ISO form with \`T\` and \`Z\`. \`lower()\`, and \`datetime(ts)\`, which turns \`'2024-07-02T10:30:00Z'\` into \`'2024-07-02 10:30:00'\`.

The rule of an ingest step: the output table has constraints strict enough that bad data **cannot** land in it, and the query does the cleaning that makes good data fit. Order the input by the raw row id, so "first copy wins" means the copy that arrived first.
--- task
Create \`events\` (\`event_id\` text primary key; \`user_id\` integer, required; \`name\` text, required; \`ts\` text, required) and load it from \`raw_events\`: only rows whose body is valid JSON and has both an \`event_id\` and a \`user_id\`; \`user_id\` as an integer; \`name\` lower-cased; \`ts\` normalised with \`datetime()\`; each \`event_id\` once (the first copy received).
--- starter
CREATE TABLE events (
  event_id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  ts TEXT NOT NULL
);
--- solution
CREATE TABLE events (
  event_id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  ts TEXT NOT NULL
);

INSERT OR IGNORE INTO events (event_id, user_id, name, ts)
SELECT body ->> '$.event_id',
       CAST(body ->> '$.user_id' AS INTEGER),
       lower(body ->> '$.name'),
       datetime(body ->> '$.ts')
FROM raw_events
WHERE json_valid(body)
  AND body ->> '$.event_id' IS NOT NULL
  AND body ->> '$.user_id' IS NOT NULL
ORDER BY id;
--- hint
Filter first: \`WHERE json_valid(body) AND body ->> '$.event_id' IS NOT NULL AND body ->> '$.user_id' IS NOT NULL\`.
--- hint
\`INSERT OR IGNORE … SELECT … ORDER BY id\` lets the primary key drop the retried copy.
--- hint
Clean each field: \`CAST(body ->> '$.user_id' AS INTEGER)\`, \`lower(body ->> '$.name')\`, \`datetime(body ->> '$.ts')\`.
--- check query | Six clean events: bad JSON, missing ids and the retry are gone
SELECT event_id, user_id, name, ts FROM events ORDER BY event_id
=> [["e1", 1, "visit", "2024-07-01 09:00:00"], ["e2", 1, "signup", "2024-07-01 09:03:00"], ["e3", 2, "visit", "2024-07-01 10:00:00"], ["e5", 3, "visit", "2024-07-02 08:00:00"], ["e6", 2, "signup", "2024-07-02 10:30:00"], ["e7", 1, "activate", "2024-07-02 12:00:00"]]
--- check query | Every user_id is stored as an integer
SELECT DISTINCT typeof(user_id) FROM events
=> [["integer"]]
--- check query | A replayed event is still ignored
INSERT OR IGNORE INTO events (event_id, user_id, name, ts) VALUES ('e1', 1, 'visit', '2024-07-01 09:00:00') RETURNING event_id
=> []

=== sqlp-06 | Analytics 2: daily active users
--- teach
The clean \`events\` table (\`event_id\`, \`user_id\`, \`name\`, \`ts\`) now holds ten days of real traffic. The first number every product team watches: **daily active users** (DAU) — how many *different* users did anything each day — and alongside it, how many of them were **new** that day.

Two traps make naive DAU charts lie:

1. **Days with no events vanish.** \`GROUP BY date(ts)\` has no row for a day with no activity, so a chart simply skips it, and a dead day looks like nothing happened. Generate the calendar with a recursive CTE and LEFT JOIN onto it (the advanced course, lesson 2).
2. **Activity is not users.** A user with five events is one active user: \`COUNT(DISTINCT user_id)\`.

"New" needs each user's **first-ever** day, which is a per-user \`MIN\`:

\`\`\`sql
SELECT user_id, MIN(date(ts)) AS first_day FROM events GROUP BY user_id
\`\`\`

Then a day's new users are the users whose \`first_day\` is that day. Because it is computed over *all* events, not just the report's week, a user first seen before the report starts is never counted as new inside it.

Both measures hang off the calendar, and each is its own aggregate, so compute them in separate CTEs and join both onto the calendar — joining them together first would fan out.
--- task
For every day from \`2024-07-01\` to \`2024-07-07\`, return \`day\`, \`dau\` (distinct users with any event that day) and \`new_users\` (users whose first-ever event was that day). Days with no activity show 0 for both. Sort by day.
--- starter
SELECT date(ts) AS day, COUNT(*) AS dau
FROM events
GROUP BY day;
--- solution
WITH RECURSIVE days(day) AS (
  SELECT '2024-07-01'
  UNION ALL
  SELECT date(day, '+1 day') FROM days WHERE day < '2024-07-07'
), active AS (
  SELECT date(ts) AS day, COUNT(DISTINCT user_id) AS dau
  FROM events
  GROUP BY date(ts)
), firsts AS (
  SELECT first_day AS day, COUNT(*) AS new_users
  FROM (SELECT user_id, MIN(date(ts)) AS first_day FROM events GROUP BY user_id)
  GROUP BY first_day
)
SELECT d.day, COALESCE(a.dau, 0) AS dau, COALESCE(f.new_users, 0) AS new_users
FROM days d
LEFT JOIN active a ON a.day = d.day
LEFT JOIN firsts f ON f.day = d.day
ORDER BY d.day;
--- hint
Build the seven-day calendar with a recursive CTE, and LEFT JOIN the numbers onto it.
--- hint
DAU per day is \`COUNT(DISTINCT user_id)\` grouped by \`date(ts)\`. New users: each user's \`MIN(date(ts))\`, then count users per first day.
--- check result | Seven days; 4 July is empty
ordered
[["2024-07-01", 2, 2], ["2024-07-02", 3, 1], ["2024-07-03", 3, 1], ["2024-07-04", 0, 0], ["2024-07-05", 3, 1], ["2024-07-06", 2, 0], ["2024-07-07", 2, 1]]

=== sqlp-07 | Analytics 3: a signup funnel with a deadline
--- teach
Next: the **signup funnel**, visit → signup → activate. You built an ordered funnel in the expert course; this one adds a rule product teams care about — a **deadline**. Activation only counts if it happens **within 72 hours of signing up**. A user who activates a week later is a win, but not one the onboarding flow can take credit for.

So each step has two conditions: it happens **after** the previous step, and (for activation) **no later than** a window after it:

\`\`\`sql
WHERE e.name = 'activate'
  AND e.ts > s2.t
  AND unixepoch(e.ts) - unixepoch(s2.t) <= 72 * 3600
\`\`\`

Measure the window in integer seconds with \`unixepoch\` — \`72 * 3600\` exactly — so an activation at precisely the 72-hour mark is included, as the rule says ("within" includes the boundary; write that decision down).

Data details that decide the numbers here:

- User 6 signed up *before* their first visit (they came from an invite link). In an ordered funnel their signup does not follow a visit, so they stop at step 1.
- User 2 activated exactly 72 hours after signing up: in.
- Users 4 and 5 activated, but too late: out.

This time report each step's conversion against the **first** step (the share of visitors who got this far), which is how an overall funnel chart reads. \`FIRST_VALUE(users) OVER (ORDER BY step)\` gives step 1's count on every row.
--- task
Return the funnel visit → signup → activate: \`step\` (1–3), \`name\`, \`users\` and \`pct\` (users as a percentage of step 1's users, rounded to 1 decimal). A user reaches step 1 at their first \`visit\`, step 2 at their first \`signup\` after that, and step 3 at their first \`activate\` after that signup and no more than 72 hours after it. Sort by step.
--- starter
SELECT name, COUNT(DISTINCT user_id) AS users
FROM events
GROUP BY name;
--- solution
WITH s1 AS (
  SELECT user_id, MIN(ts) AS t FROM events WHERE name = 'visit' GROUP BY user_id
), s2 AS (
  SELECT e.user_id, MIN(e.ts) AS t
  FROM events e JOIN s1 ON s1.user_id = e.user_id
  WHERE e.name = 'signup' AND e.ts > s1.t
  GROUP BY e.user_id
), s3 AS (
  SELECT e.user_id, MIN(e.ts) AS t
  FROM events e JOIN s2 ON s2.user_id = e.user_id
  WHERE e.name = 'activate' AND e.ts > s2.t
    AND unixepoch(e.ts) - unixepoch(s2.t) <= 72 * 3600
  GROUP BY e.user_id
), steps AS (
  SELECT 1 AS step, 'visit' AS name, COUNT(*) AS users FROM s1
  UNION ALL SELECT 2, 'signup', COUNT(*) FROM s2
  UNION ALL SELECT 3, 'activate', COUNT(*) FROM s3
)
SELECT step, name, users,
       ROUND(100.0 * users / FIRST_VALUE(users) OVER (ORDER BY step), 1) AS pct
FROM steps
ORDER BY step;
--- hint
One CTE per step, each joined to the previous one and taking the earliest qualifying event after it.
--- hint
The activation step adds \`unixepoch(e.ts) - unixepoch(s2.t) <= 72 * 3600\`.
--- hint
Stack the three counts with \`UNION ALL\`, then \`FIRST_VALUE(users) OVER (ORDER BY step)\` for the percentage.
--- check result | 6 visitors, 5 signed up after visiting, 3 activated in time
ordered
[[1, "visit", 6, 100.0], [2, "signup", 5, 83.3], [3, "activate", 3, 50.0]]

=== sqlp-08 | Analytics 4: day-N retention
--- teach
The last analytics question: **do people come back?** Day-N retention asks, for N = 1, 2, … 7: of the users who signed up, what share were active on the Nth calendar day after their signup day?

Build it from pieces you know:

1. **Each user's signup day** — \`date(ts)\` of their \`signup\` event.
2. **Each user's active days** — \`SELECT DISTINCT user_id, date(ts)\`.
3. **The offsets 1–7** — a recursive CTE generating a series.
4. **Every (user, N) pair** — \`CROSS JOIN\` the signups with the offsets.
5. For each pair, was the user active on \`date(signup_day, '+' || N || ' days')\`? \`EXISTS\` gives 1 or 0.

There is one subtlety that separates a correct retention table from a misleading one: **users who have not had day N yet.** The data ends on \`2024-07-10\`. User 6 signed up on 07-07; their day 7 is 07-14, which has not happened. Counting them as "not retained" on day 7 makes recent signups drag the curve down for no reason. Only users whose day N is on or before the last day of data are **eligible** for day N; they form the denominator.

So each row reports \`eligible\` (users whose day N has happened), \`retained\` (eligible users active on day N) and \`pct\`. Find the last day of data from the data itself (\`MAX(date(ts))\`), not by typing it in.
--- task
Return one row for each N from 1 to 7: \`day\` (N), \`eligible\` (signed-up users whose day N is on or before the last day in \`events\`), \`retained\` (eligible users with any event on exactly their day N) and \`pct\` (retained as a percentage of eligible, rounded to 1 decimal). A user's day 0 is the date of their \`signup\` event. Sort by day.
--- starter
SELECT user_id, date(ts) AS signup_day
FROM events
WHERE name = 'signup';
--- solution
WITH RECURSIVE n(day) AS (
  SELECT 1 UNION ALL SELECT day + 1 FROM n WHERE day < 7
), signups AS (
  SELECT user_id, date(MIN(ts)) AS d0 FROM events WHERE name = 'signup' GROUP BY user_id
), active AS (
  SELECT DISTINCT user_id, date(ts) AS d FROM events
), last AS (
  SELECT MAX(date(ts)) AS d FROM events
), pairs AS (
  SELECT n.day, s.user_id,
         EXISTS (SELECT 1 FROM active a
                 WHERE a.user_id = s.user_id AND a.d = date(s.d0, '+' || n.day || ' days')) AS hit
  FROM n
  CROSS JOIN signups s
  CROSS JOIN last
  WHERE date(s.d0, '+' || n.day || ' days') <= last.d
)
SELECT day, COUNT(*) AS eligible, SUM(hit) AS retained,
       ROUND(100.0 * SUM(hit) / COUNT(*), 1) AS pct
FROM pairs
GROUP BY day
ORDER BY day;
--- hint
Four CTEs: the series 1–7, each user's signup day, each user's distinct active days, and the last day of data.
--- hint
\`CROSS JOIN\` the series with the signups, keep pairs whose day N (\`date(d0, '+' || day || ' days')\`) is on or before the last day, and flag each with \`EXISTS (…)\`.
--- hint
Group by N: \`COUNT(*)\` is eligible, \`SUM(hit)\` is retained.
--- check result | Seven days of retention, with shrinking eligibility
ordered
[[1, 6, 2, 33.3], [2, 6, 1, 16.7], [3, 6, 2, 33.3], [4, 5, 3, 60.0], [5, 5, 1, 20.0], [6, 4, 0, 0.0], [7, 4, 3, 75.0]]

=== sqlp-09 | Library 1: the schema
--- schema
CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);
INSERT INTO members (id, name, email) VALUES (1, 'Ana', 'ana@mail.com'), (2, 'Bo', 'bo@mail.com'), (3, 'Cy', 'cy@mail.com');
--- teach
**Project three: a library.** Four lessons: the schema, availability, overdue fines, and returns that charge fines by themselves. The town's membership list already exists as \`members\` (\`id\`, \`name\`, \`email\`). You design the rest.

The first modelling decision is the classic one: a **book** is not a **copy**. "Dune" is one book with an ISBN, a title and an author; the library owns three physical copies of it, each with its own barcode. You lend copies, not books. Get this wrong — a \`books\` table with a \`quantity\` column — and you cannot say *which* copy is overdue or damaged.

- \`books\` — the title: ISBN (unique), title, author
- \`copies\` — a physical item: which book, its barcode (unique)
- \`loans\` — one lending: which copy, which member, when lent, when due, when returned (NULL while out)

Now the rules, as constraints wherever the database can hold them:

- A loan is due **after** it starts: \`CHECK (due_on > loaned_on)\`.
- It cannot be returned before it was lent: \`CHECK (returned_on IS NULL OR returned_on >= loaned_on)\`.
- **A copy can be out on only one loan at a time.** This is the interesting one. A plain \`UNIQUE (copy_id)\` would allow only one loan per copy *ever*. What you want is "unique among the loans that are still open" — a **partial index**:

\`\`\`sql
CREATE UNIQUE INDEX one_open_loan_per_copy ON loans(copy_id) WHERE returned_on IS NULL;
\`\`\`

Only rows matching the \`WHERE\` go into the index, so uniqueness applies to open loans alone. Closed loans pile up freely as history.
--- task
Turn foreign keys on and create:

- \`books\` — \`id\` integer primary key; \`isbn\` text, required, unique; \`title\` and \`author\` text, required
- \`copies\` — \`id\` integer primary key; \`book_id\` required, referencing \`books(id)\`; \`barcode\` text, required, unique
- \`loans\` — \`id\` integer primary key; \`copy_id\` required, referencing \`copies(id)\`; \`member_id\` required, referencing \`members(id)\`; \`loaned_on\` and \`due_on\` text, required, with the due date after the loan date; \`returned_on\` text, NULL while out, never before the loan date
- a unique partial index named \`one_open_loan_per_copy\` so a copy can have only one open loan at a time
--- starter
PRAGMA foreign_keys = ON;

CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  isbn TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  author TEXT NOT NULL
);
--- solution
PRAGMA foreign_keys = ON;

CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  isbn TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  author TEXT NOT NULL
);
CREATE TABLE copies (
  id INTEGER PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES books(id),
  barcode TEXT NOT NULL UNIQUE
);
CREATE TABLE loans (
  id INTEGER PRIMARY KEY,
  copy_id INTEGER NOT NULL REFERENCES copies(id),
  member_id INTEGER NOT NULL REFERENCES members(id),
  loaned_on TEXT NOT NULL,
  due_on TEXT NOT NULL,
  returned_on TEXT,
  CHECK (due_on > loaned_on),
  CHECK (returned_on IS NULL OR returned_on >= loaned_on)
);
CREATE UNIQUE INDEX one_open_loan_per_copy ON loans(copy_id) WHERE returned_on IS NULL;
--- hint
Two \`CHECK\`s at the end of \`loans\`: \`CHECK (due_on > loaned_on)\` and \`CHECK (returned_on IS NULL OR returned_on >= loaned_on)\`.
--- hint
The one-open-loan rule is \`CREATE UNIQUE INDEX one_open_loan_per_copy ON loans(copy_id) WHERE returned_on IS NULL;\`
--- check query | Books, copies and a loan can be stored
INSERT INTO books (id, isbn, title, author) VALUES (1, '9780441013593', 'Dune', 'Frank Herbert');
INSERT INTO copies (id, book_id, barcode) VALUES (1, 1, 'D-1'), (2, 1, 'D-2');
INSERT INTO loans (id, copy_id, member_id, loaned_on, due_on) VALUES (1, 1, 1, '2024-07-01', '2024-07-15') RETURNING id, returned_on
=> [[1, null]]
--- check query | A duplicate ISBN or barcode is refused
INSERT OR IGNORE INTO books (id, isbn, title, author) VALUES (2, '9780441013593', 'Dune again', 'F. H.') RETURNING id
=> []
--- check query | The same copy cannot go out twice at once
INSERT OR IGNORE INTO loans (id, copy_id, member_id, loaned_on, due_on) VALUES (2, 1, 2, '2024-07-02', '2024-07-16') RETURNING id
=> []
--- check query | Once returned, the copy can go out again
UPDATE loans SET returned_on = '2024-07-05' WHERE id = 1;
INSERT OR IGNORE INTO loans (id, copy_id, member_id, loaned_on, due_on) VALUES (3, 1, 2, '2024-07-06', '2024-07-20') RETURNING id
=> [[3]]
--- check query | A due date before the loan, or a return before it, is refused
INSERT OR IGNORE INTO loans (id, copy_id, member_id, loaned_on, due_on, returned_on) VALUES (4, 2, 1, '2024-07-10', '2024-07-01', NULL), (5, 2, 1, '2024-07-10', '2024-07-24', '2024-07-09') RETURNING id
=> []
--- check query | loans references copies and members
SELECT "table", "from" FROM pragma_foreign_key_list('loans') ORDER BY "from"
=> [["copies", "copy_id"], ["members", "member_id"]]

=== sqlp-10 | Library 2: what can I borrow?
--- schema
CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  isbn TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  author TEXT NOT NULL
);
CREATE TABLE copies (
  id INTEGER PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES books(id),
  barcode TEXT NOT NULL UNIQUE
);
CREATE TABLE loans (
  id INTEGER PRIMARY KEY,
  copy_id INTEGER NOT NULL REFERENCES copies(id),
  member_id INTEGER NOT NULL REFERENCES members(id),
  loaned_on TEXT NOT NULL,
  due_on TEXT NOT NULL,
  returned_on TEXT,
  CHECK (due_on > loaned_on),
  CHECK (returned_on IS NULL OR returned_on >= loaned_on)
);
CREATE UNIQUE INDEX one_open_loan_per_copy ON loans(copy_id) WHERE returned_on IS NULL;
INSERT INTO members (id, name, email) VALUES (1, 'Ana', 'ana@mail.com'), (2, 'Bo', 'bo@mail.com'), (3, 'Cy', 'cy@mail.com');
INSERT INTO books (id, isbn, title, author) VALUES
  (1, '9780441013593', 'Dune',    'Frank Herbert'),
  (2, '9780141439587', 'Emma',    'Jane Austen'),
  (3, '9780547572291', 'Ubik',    'Philip K. Dick'),
  (4, '9780807083697', 'Kindred', 'Octavia E. Butler');
INSERT INTO copies (id, book_id, barcode) VALUES
  (1, 1, 'D-1'), (2, 1, 'D-2'), (3, 1, 'D-3'), (4, 2, 'E-1'), (5, 3, 'U-1'), (6, 3, 'U-2');
INSERT INTO loans (id, copy_id, member_id, loaned_on, due_on, returned_on) VALUES
  (1, 1, 1, '2024-06-01', '2024-06-15', '2024-06-14'),
  (2, 2, 2, '2024-06-20', '2024-07-04', NULL),
  (3, 1, 3, '2024-06-25', '2024-07-09', NULL),
  (4, 4, 1, '2024-07-01', '2024-07-15', NULL),
  (5, 5, 2, '2024-05-01', '2024-05-15', '2024-05-30'),
  (6, 6, 1, '2024-04-01', '2024-04-15', NULL);
--- teach
The library's tables are here with real data: four books, six copies, three members and six loans. *Kindred* has just been catalogued and has no copies yet.

The question the front desk and the website both ask: **for each book, how many copies are there, how many are out, and how many can be borrowed right now?** Put it in a view, \`book_availability\`, so the desk, the website and the weekly report all share one definition of "available".

A copy is **out** when it has a loan with \`returned_on IS NULL\` — thanks to last lesson's partial index, at most one. Build it in the order of the tables:

- start **from \`books\`**, so a book with no copies still appears (with 0 everywhere, not missing);
- LEFT JOIN \`copies\`;
- LEFT JOIN \`loans\` **on the copy and \`returned_on IS NULL\`** — the open-loan condition belongs in the \`ON\`, or every copy that was ever returned would be counted in odd ways, and copies with no loans would drop out.

Then count: \`COUNT(c.id)\` copies, \`COUNT(l.id)\` open loans, and available is the difference. Because each copy has at most one open loan, this join cannot fan out — the constraint you designed is what makes this query correct.
--- task
Create a view \`book_availability\` with one row per book (including books with no copies): \`book_id\`, \`title\`, \`copies\`, \`on_loan\` (copies currently out) and \`available\` (copies minus on loan).
--- starter
CREATE VIEW book_availability AS
SELECT b.id AS book_id, b.title, COUNT(*) AS copies
FROM books b
JOIN copies c ON c.book_id = b.id
GROUP BY b.id;
--- solution
CREATE VIEW book_availability AS
SELECT b.id AS book_id, b.title,
       COUNT(c.id) AS copies,
       COUNT(l.id) AS on_loan,
       COUNT(c.id) - COUNT(l.id) AS available
FROM books b
LEFT JOIN copies c ON c.book_id = b.id
LEFT JOIN loans l  ON l.copy_id = c.id AND l.returned_on IS NULL
GROUP BY b.id;
--- hint
Start from \`books\` and LEFT JOIN both \`copies\` and \`loans\`.
--- hint
The loans join is \`ON l.copy_id = c.id AND l.returned_on IS NULL\`; count \`c.id\` and \`l.id\`, not \`*\`.
--- check query | Every book, with copies, loans and availability
SELECT book_id, title, copies, on_loan, available FROM book_availability ORDER BY book_id
=> [[1, "Dune", 3, 2, 1], [2, "Emma", 1, 1, 0], [3, "Ubik", 2, 1, 1], [4, "Kindred", 0, 0, 0]]
--- check query | Returning a copy makes it available straight away
UPDATE loans SET returned_on = '2024-07-15' WHERE id = 4;
SELECT available FROM book_availability WHERE title = 'Emma'
=> [[1]]

=== sqlp-11 | Library 3: overdue loans and fines
--- schema
CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  isbn TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  author TEXT NOT NULL
);
CREATE TABLE copies (
  id INTEGER PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES books(id),
  barcode TEXT NOT NULL UNIQUE
);
CREATE TABLE loans (
  id INTEGER PRIMARY KEY,
  copy_id INTEGER NOT NULL REFERENCES copies(id),
  member_id INTEGER NOT NULL REFERENCES members(id),
  loaned_on TEXT NOT NULL,
  due_on TEXT NOT NULL,
  returned_on TEXT,
  CHECK (due_on > loaned_on),
  CHECK (returned_on IS NULL OR returned_on >= loaned_on)
);
CREATE UNIQUE INDEX one_open_loan_per_copy ON loans(copy_id) WHERE returned_on IS NULL;
INSERT INTO members (id, name, email) VALUES (1, 'Ana', 'ana@mail.com'), (2, 'Bo', 'bo@mail.com'), (3, 'Cy', 'cy@mail.com');
INSERT INTO books (id, isbn, title, author) VALUES
  (1, '9780441013593', 'Dune',    'Frank Herbert'),
  (2, '9780141439587', 'Emma',    'Jane Austen'),
  (3, '9780547572291', 'Ubik',    'Philip K. Dick'),
  (4, '9780807083697', 'Kindred', 'Octavia E. Butler');
INSERT INTO copies (id, book_id, barcode) VALUES
  (1, 1, 'D-1'), (2, 1, 'D-2'), (3, 1, 'D-3'), (4, 2, 'E-1'), (5, 3, 'U-1'), (6, 3, 'U-2');
INSERT INTO loans (id, copy_id, member_id, loaned_on, due_on, returned_on) VALUES
  (1, 1, 1, '2024-06-01', '2024-06-15', '2024-06-14'),
  (2, 2, 2, '2024-06-20', '2024-07-04', NULL),
  (3, 1, 3, '2024-06-25', '2024-07-09', NULL),
  (4, 4, 1, '2024-07-01', '2024-07-15', NULL),
  (5, 5, 2, '2024-05-01', '2024-05-15', '2024-05-30'),
  (6, 6, 1, '2024-04-01', '2024-04-15', NULL);
--- teach
Every Monday the library emails members with overdue books. The rules:

- A loan is **overdue** when it is still out and its due date has passed.
- The fine is **25 cents per day** overdue, **capped at 10 dollars** (1000 cents) per loan — nobody should owe more than a book is worth.

Dates: \`julianday(a) - julianday(b)\` is the number of days between two dates. For whole dates like \`'2024-07-15'\` the difference is a whole number, but it is still a REAL; \`CAST(… AS INTEGER)\` makes it an integer for display and arithmetic.

The cap is \`MIN(days * 25, 1000)\` — in SQLite, \`MIN\` with two or more arguments is the ordinary "smaller of these values" function, not the aggregate.

Choose the reporting date carefully. \`date('now')\` makes the report correct today and untestable forever: tomorrow it gives different numbers. Reports that people check, compare and reproduce take the date as an input. Here it is fixed: **as of 2024-07-15**. A book due on the 15th is not overdue on the 15th.
--- task
Return every loan that is overdue as of \`2024-07-15\`: \`member\` (name), \`title\`, \`due_on\`, \`days_overdue\` (an integer) and \`fine_cents\` (25 per day, at most 1000). Sort by fine, largest first, then member.
--- starter
SELECT m.name AS member, l.due_on
FROM loans l
JOIN members m ON m.id = l.member_id
WHERE l.returned_on IS NULL;
--- solution
SELECT m.name AS member, b.title, l.due_on,
       CAST(julianday('2024-07-15') - julianday(l.due_on) AS INTEGER) AS days_overdue,
       MIN(CAST(julianday('2024-07-15') - julianday(l.due_on) AS INTEGER) * 25, 1000) AS fine_cents
FROM loans l
JOIN members m ON m.id = l.member_id
JOIN copies c  ON c.id = l.copy_id
JOIN books b   ON b.id = c.book_id
WHERE l.returned_on IS NULL
  AND l.due_on < '2024-07-15'
ORDER BY fine_cents DESC, member;
--- hint
Overdue: \`returned_on IS NULL AND due_on < '2024-07-15'\`. The title is two joins away: loans → copies → books.
--- hint
Days: \`CAST(julianday('2024-07-15') - julianday(l.due_on) AS INTEGER)\`; fine: \`MIN(days * 25, 1000)\`.
--- check result | Ana's 91-day loan is capped; Emma, due today, is not overdue
ordered
[["Ana", "Ubik", "2024-04-15", 91, 1000], ["Bo", "Dune", "2024-07-04", 11, 275], ["Cy", "Dune", "2024-07-09", 6, 150]]

=== sqlp-12 | Library 4: returns that charge fines
--- schema
CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  isbn TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  author TEXT NOT NULL
);
CREATE TABLE copies (
  id INTEGER PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES books(id),
  barcode TEXT NOT NULL UNIQUE
);
CREATE TABLE loans (
  id INTEGER PRIMARY KEY,
  copy_id INTEGER NOT NULL REFERENCES copies(id),
  member_id INTEGER NOT NULL REFERENCES members(id),
  loaned_on TEXT NOT NULL,
  due_on TEXT NOT NULL,
  returned_on TEXT,
  CHECK (due_on > loaned_on),
  CHECK (returned_on IS NULL OR returned_on >= loaned_on)
);
CREATE UNIQUE INDEX one_open_loan_per_copy ON loans(copy_id) WHERE returned_on IS NULL;
INSERT INTO members (id, name, email) VALUES (1, 'Ana', 'ana@mail.com'), (2, 'Bo', 'bo@mail.com'), (3, 'Cy', 'cy@mail.com');
INSERT INTO books (id, isbn, title, author) VALUES
  (1, '9780441013593', 'Dune',    'Frank Herbert'),
  (2, '9780141439587', 'Emma',    'Jane Austen'),
  (3, '9780547572291', 'Ubik',    'Philip K. Dick'),
  (4, '9780807083697', 'Kindred', 'Octavia E. Butler');
INSERT INTO copies (id, book_id, barcode) VALUES
  (1, 1, 'D-1'), (2, 1, 'D-2'), (3, 1, 'D-3'), (4, 2, 'E-1'), (5, 3, 'U-1'), (6, 3, 'U-2');
INSERT INTO loans (id, copy_id, member_id, loaned_on, due_on, returned_on) VALUES
  (1, 1, 1, '2024-06-01', '2024-06-15', '2024-06-14'),
  (2, 2, 2, '2024-06-20', '2024-07-04', NULL),
  (3, 1, 3, '2024-06-25', '2024-07-09', NULL),
  (4, 4, 1, '2024-07-01', '2024-07-15', NULL),
  (5, 5, 2, '2024-05-01', '2024-05-15', '2024-05-30'),
  (6, 6, 1, '2024-04-01', '2024-04-15', NULL);
CREATE TABLE fines (
  loan_id INTEGER PRIMARY KEY REFERENCES loans(id),
  cents INTEGER NOT NULL CHECK (cents > 0)
);
--- teach
Last lesson's report shows fines building up. When a late book comes back, the fine becomes **real**: it should be recorded in the new \`fines\` table (\`loan_id\`, \`cents\`) at the moment of return, whichever system recorded the return — the desk, the self-service kiosk, or a librarian fixing a typo.

"Whenever this column changes, do that" is a trigger:

\`\`\`sql
CREATE TRIGGER loan_returned
AFTER UPDATE OF returned_on ON loans
WHEN OLD.returned_on IS NULL AND NEW.returned_on > NEW.due_on
BEGIN
  INSERT INTO fines (loan_id, cents) VALUES (NEW.id, …);
END;
\`\`\`

- \`UPDATE OF returned_on\` fires only when that column is assigned — not when someone edits the due date.
- The \`WHEN\` makes it fire only on the actual return (\`OLD.returned_on IS NULL\`) and only when late. A book returned on time, or on its due date, owes nothing — and the table's \`CHECK (cents > 0)\` would refuse a zero fine anyway.
- The fine uses the same rule as the report: 25 cents per day late, capped at 1000. Now \`NEW.returned_on\` replaces the fixed report date.

A fine is money owed, so keep it even if the loan record is later edited. The \`loan_id\` primary key also makes sure one loan can only be fined once.
--- task
Create a trigger \`loan_returned\` that, when a loan's \`returned_on\` is set on a loan that was still out and the return is after \`due_on\`, inserts a row into \`fines\` with the loan's id and 25 cents per day late, at most 1000.
--- starter
CREATE TRIGGER loan_returned
AFTER UPDATE OF returned_on ON loans
BEGIN
  SELECT 1;
END;
--- solution
CREATE TRIGGER loan_returned
AFTER UPDATE OF returned_on ON loans
WHEN OLD.returned_on IS NULL AND NEW.returned_on > NEW.due_on
BEGIN
  INSERT INTO fines (loan_id, cents)
  VALUES (NEW.id, MIN(CAST(julianday(NEW.returned_on) - julianday(NEW.due_on) AS INTEGER) * 25, 1000));
END;
--- hint
Fire only on a real, late return: \`WHEN OLD.returned_on IS NULL AND NEW.returned_on > NEW.due_on\`.
--- hint
The amount is \`MIN(CAST(julianday(NEW.returned_on) - julianday(NEW.due_on) AS INTEGER) * 25, 1000)\`.
--- check query | A late return is fined per day; a very late one is capped
UPDATE loans SET returned_on = '2024-07-15' WHERE id IN (2, 6);
SELECT loan_id, cents FROM fines ORDER BY loan_id
=> [[2, 275], [6, 1000]]
--- check query | An on-time return is not fined
UPDATE loans SET returned_on = '2024-07-15' WHERE id = 4;
SELECT COUNT(*) FROM fines WHERE loan_id = 4
=> [[0]]
--- check query | Editing a loan that was already returned charges nothing more
UPDATE loans SET returned_on = '2024-06-01' WHERE id = 5;
SELECT COUNT(*) FROM fines
=> [[2]]

=== sqlp-13 | Capstone: event ticketing
--- schema
CREATE TABLE venues (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0)
);
INSERT INTO venues (id, name, capacity) VALUES (1, 'Hall', 3), (2, 'Club', 100);
--- teach
**Capstones.** From here on there is no worked example and almost no starter: a specification, and checks that use your database the way the application would. How you get there — names of constraints, which checks, how the view is built — is yours to decide. The checks only rely on the **table names, column names and behaviour the spec states**, so extra columns are fine as long as they have defaults or allow NULL.

Work like you would on the job:

1. **Read the whole spec** and list the entities, their columns, and every rule.
2. **Decide where each rule lives.** A rule the database can enforce (unique, required, range, reference) is a constraint. A number other people read is a view.
3. **Write the tables, then try to break them.** Insert good rows, then bad ones, and see that each bad one is refused.
4. **Build the view last** and check it by hand against a few rows.

**The spec: a small ticketing system.** The venue list already exists (\`venues\`: \`id\`, \`name\`, \`capacity\`).

- Enforce foreign keys.
- \`events\` — \`id\` (integer primary key), \`venue_id\` (required, a real venue), \`title\` (required), \`starts_at\` (required text timestamp).
- \`tickets\` — \`id\` (integer primary key), \`event_id\` (required, a real event), \`seat\` (required text), \`buyer_email\` (required), \`price_cents\` (required integer, zero or more). **A seat can be sold only once per event** — the same seat at a different event is fine. Deleting an event deletes its tickets.
- A view \`event_sales\` with one row per event — including events with no tickets sold — and the columns \`event_id\`, \`title\`, \`sold\` (tickets sold), \`capacity\` (the venue's), \`remaining\` (capacity minus sold) and \`revenue_cents\` (total ticket price; 0 when none sold).
--- task
Implement the ticketing specification above: the \`events\` and \`tickets\` tables with every rule it states, foreign keys enforced, and the \`event_sales\` view.
--- starter
-- Ticketing: your schema goes here.
--- solution
PRAGMA foreign_keys = ON;

CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  venue_id INTEGER NOT NULL REFERENCES venues(id),
  title TEXT NOT NULL,
  starts_at TEXT NOT NULL
);

CREATE TABLE tickets (
  id INTEGER PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  seat TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  UNIQUE (event_id, seat)
);

CREATE VIEW event_sales AS
SELECT e.id AS event_id, e.title,
       COUNT(t.id) AS sold,
       v.capacity,
       v.capacity - COUNT(t.id) AS remaining,
       COALESCE(SUM(t.price_cents), 0) AS revenue_cents
FROM events e
JOIN venues v ON v.id = e.venue_id
LEFT JOIN tickets t ON t.event_id = e.id
GROUP BY e.id, e.title, v.capacity;
--- hint
"Once per event" is a composite rule: a table-level \`UNIQUE (event_id, seat)\`.
--- hint
The view starts from \`events\`, joins its venue, and LEFT JOINs tickets so an event with no sales still has a row; \`COALESCE\` the revenue.
--- check query | Foreign keys are enforced
PRAGMA foreign_keys
=> [[1]]
--- check query | Events and tickets can be created
INSERT INTO events (id, venue_id, title, starts_at) VALUES (10, 1, 'Quartet', '2024-09-01 19:00'), (11, 2, 'DJ night', '2024-09-02 22:00'), (12, 1, 'Poetry', '2024-09-03 18:00');
INSERT INTO tickets (id, event_id, seat, buyer_email, price_cents) VALUES (1, 10, 'A1', 'ana@x.io', 2500), (2, 10, 'A2', 'bo@x.io', 2500), (3, 11, 'A1', 'cy@x.io', 1500) RETURNING id
=> [[1], [2], [3]]
--- check query | A seat already sold for that event is refused
INSERT OR IGNORE INTO tickets (id, event_id, seat, buyer_email, price_cents) VALUES (4, 10, 'A1', 'dee@x.io', 2500) RETURNING id
=> []
--- check query | A negative price or a missing buyer is refused
INSERT OR IGNORE INTO tickets (id, event_id, seat, buyer_email, price_cents) VALUES (5, 10, 'B1', 'eli@x.io', -100), (6, 10, 'B2', NULL, 100) RETURNING id
=> []
--- check query | event_sales covers every event, unsold ones included
SELECT event_id, title, sold, capacity, remaining, revenue_cents FROM event_sales ORDER BY event_id
=> [[10, "Quartet", 2, 3, 1, 5000], [11, "DJ night", 1, 100, 99, 1500], [12, "Poetry", 0, 3, 3, 0]]
--- check query | Cancelling an event removes its tickets
DELETE FROM events WHERE id = 10;
SELECT COUNT(*) FROM tickets
=> [[1]]

=== sqlp-14 | Capstone: splitting expenses
--- schema
CREATE TABLE people (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);
INSERT INTO people (id, name) VALUES (1, 'Ana'), (2, 'Bo'), (3, 'Cy'), (4, 'Dee');
--- teach
**The spec: an app for splitting shared expenses** among a group of friends. Someone pays for dinner; the app records who owes what share of it; at any moment it can say who is up and who is down. The group already exists in \`people\` (\`id\`, \`name\`).

- Enforce foreign keys.
- \`expenses\` — \`id\` (integer primary key), \`paid_by\` (required, a real person), \`description\` (required), \`amount_cents\` (required integer, **more than zero**).
- \`shares\` — who owes what part of an expense: \`expense_id\` (a real expense; deleting the expense deletes its shares), \`person_id\` (a real person), \`share_cents\` (required integer, zero or more). A person has **at most one share per expense**.
- A view \`balances\` with one row for **every** person — including people with no expenses — and the columns \`person_id\`, \`name\`, \`paid_cents\` (total of the expenses they paid), \`owed_cents\` (total of their shares) and \`net_cents\` (paid minus owed: positive means the group owes them).
- A view \`unbalanced_expenses\` listing every expense whose shares do not add up to its amount — including expenses with no shares at all — with the columns \`expense_id\`, \`amount_cents\` and \`shared_cents\` (the total of its shares, 0 if none).

A warning from experience: \`balances\` joins people to two different one-to-many tables (expenses paid, shares owed). Build each total separately before combining them.
--- task
Implement the expense-splitting specification above: the \`expenses\` and \`shares\` tables with every rule, foreign keys enforced, and the \`balances\` and \`unbalanced_expenses\` views.
--- starter
-- Expense splitting: your schema goes here.
--- solution
PRAGMA foreign_keys = ON;

CREATE TABLE expenses (
  id INTEGER PRIMARY KEY,
  paid_by INTEGER NOT NULL REFERENCES people(id),
  description TEXT NOT NULL,
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0)
);

CREATE TABLE shares (
  expense_id INTEGER NOT NULL REFERENCES expenses(id) ON DELETE CASCADE,
  person_id INTEGER NOT NULL REFERENCES people(id),
  share_cents INTEGER NOT NULL CHECK (share_cents >= 0),
  PRIMARY KEY (expense_id, person_id)
);

CREATE VIEW balances AS
WITH paid AS (
  SELECT paid_by AS person_id, SUM(amount_cents) AS cents FROM expenses GROUP BY paid_by
), owed AS (
  SELECT person_id, SUM(share_cents) AS cents FROM shares GROUP BY person_id
)
SELECT p.id AS person_id, p.name,
       COALESCE(pd.cents, 0) AS paid_cents,
       COALESCE(ow.cents, 0) AS owed_cents,
       COALESCE(pd.cents, 0) - COALESCE(ow.cents, 0) AS net_cents
FROM people p
LEFT JOIN paid pd ON pd.person_id = p.id
LEFT JOIN owed ow ON ow.person_id = p.id;

CREATE VIEW unbalanced_expenses AS
SELECT e.id AS expense_id, e.amount_cents,
       COALESCE(SUM(s.share_cents), 0) AS shared_cents
FROM expenses e
LEFT JOIN shares s ON s.expense_id = e.id
GROUP BY e.id
HAVING COALESCE(SUM(s.share_cents), 0) <> e.amount_cents;
--- hint
\`shares\` needs a composite primary key \`(expense_id, person_id)\` for "one share per person per expense".
--- hint
For \`balances\`, total the paid amounts per person and the owed shares per person in two separate CTEs, then LEFT JOIN both onto \`people\`.
--- hint
\`unbalanced_expenses\` LEFT JOINs shares onto expenses, groups by expense, and keeps groups with \`HAVING\` total ≠ amount.
--- check query | Foreign keys are enforced
PRAGMA foreign_keys
=> [[1]]
--- check query | Expenses can be recorded; a zero amount is refused
INSERT INTO expenses (id, paid_by, description, amount_cents) VALUES (1, 1, 'Dinner', 9000), (2, 2, 'Taxi', 3000), (3, 1, 'Tickets', 5000), (5, 3, 'Snacks', 1200);
INSERT OR IGNORE INTO expenses (id, paid_by, description, amount_cents) VALUES (4, 1, 'Free walk', 0);
SELECT id FROM expenses ORDER BY id
=> [[1], [2], [3], [5]]
--- check query | Shares can be recorded
INSERT INTO shares (expense_id, person_id, share_cents) VALUES (1, 1, 3000), (1, 2, 3000), (1, 3, 3000), (2, 2, 1500), (2, 3, 1500), (3, 1, 2500), (3, 2, 2000) RETURNING expense_id
=> [[1], [1], [1], [2], [2], [3], [3]]
--- check query | A second share for the same person and expense, or a negative share, is refused
INSERT OR IGNORE INTO shares (expense_id, person_id, share_cents) VALUES (1, 1, 100), (2, 4, -5) RETURNING expense_id
=> []
--- check query | Balances cover everyone and are not inflated by the joins
SELECT person_id, name, paid_cents, owed_cents, net_cents FROM balances ORDER BY person_id
=> [[1, "Ana", 14000, 5500, 8500], [2, "Bo", 3000, 6500, -3500], [3, "Cy", 1200, 4500, -3300], [4, "Dee", 0, 0, 0]]
--- check query | Expenses whose shares do not add up are flagged, including ones with no shares
SELECT expense_id, amount_cents, shared_cents FROM unbalanced_expenses ORDER BY expense_id
=> [[3, 5000, 4500], [5, 1200, 0]]
--- check query | Deleting an expense deletes its shares
DELETE FROM expenses WHERE id = 1;
SELECT COUNT(*) FROM shares
=> [[4]]

=== sqlp-15 | Capstone: appointment booking
--- schema
CREATE TABLE staff (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO staff (id, name) VALUES (1, 'Dr Ng'), (2, 'Dr Oz');
--- teach
**The spec: bookings for a small clinic.** Clients book appointments with staff; the clinic needs to spot double bookings and see each day's workload. The staff list already exists (\`staff\`: \`id\`, \`name\`).

- \`clients\` — \`id\` (integer primary key), \`email\` (required, and unique **ignoring case**: \`ANA@x.io\` and \`ana@x.io\` are the same client), \`name\`.
- \`appointments\` — \`id\` (integer primary key), \`staff_id\` (required, a real staff member), \`client_id\` (required, a real client), \`starts_at\` and \`ends_at\` (required text timestamps, \`'YYYY-MM-DD HH:MM'\`; an appointment must **end after it starts**), \`status\` (required; \`'booked'\` or \`'cancelled'\`; **defaults to \`'booked'\`**).
- A view \`double_bookings(staff_id, first_id, second_id)\`: every pair of **booked** appointments for the same staff member whose times overlap, with \`first_id\` less than \`second_id\`. Two intervals overlap when each starts before the other ends; back-to-back appointments (one ends at 09:30, the next starts at 09:30) do **not** overlap. Cancelled appointments never count.
- A view \`daily_schedule(staff_id, day, appointments, booked_minutes)\`: for each staff member and calendar day (\`'YYYY-MM-DD'\`) with booked appointments, how many and their total length in whole minutes.
- An index that lets the app list one staff member's appointments in time order without a separate sort: its first column \`staff_id\`, its second \`starts_at\`.
--- task
Implement the booking specification above: the \`clients\` and \`appointments\` tables with every rule, the \`double_bookings\` and \`daily_schedule\` views, and the index.
--- starter
-- Clinic bookings: your schema goes here.
--- solution
PRAGMA foreign_keys = ON;

CREATE TABLE clients (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT
);

CREATE TABLE appointments (
  id INTEGER PRIMARY KEY,
  staff_id INTEGER NOT NULL REFERENCES staff(id),
  client_id INTEGER NOT NULL REFERENCES clients(id),
  starts_at TEXT NOT NULL,
  ends_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'booked' CHECK (status IN ('booked', 'cancelled')),
  CHECK (ends_at > starts_at)
);

CREATE INDEX idx_appointments_staff_start ON appointments(staff_id, starts_at);

CREATE VIEW double_bookings AS
SELECT a.staff_id, a.id AS first_id, b.id AS second_id
FROM appointments a
JOIN appointments b
  ON b.staff_id = a.staff_id
 AND a.id < b.id
 AND a.starts_at < b.ends_at
 AND b.starts_at < a.ends_at
WHERE a.status = 'booked' AND b.status = 'booked';

CREATE VIEW daily_schedule AS
SELECT staff_id,
       date(starts_at) AS day,
       COUNT(*) AS appointments,
       SUM((unixepoch(ends_at) - unixepoch(starts_at)) / 60) AS booked_minutes
FROM appointments
WHERE status = 'booked'
GROUP BY staff_id, date(starts_at);
--- hint
Case-insensitive uniqueness: a unique index on the expression \`lower(email)\`, as in the expert course's deduplication lesson. (Declaring the column \`UNIQUE COLLATE NOCASE\`, which makes it compare ignoring case, works too.)
--- hint
Overlap is a self-join: same staff, \`a.id < b.id\`, \`a.starts_at < b.ends_at AND b.starts_at < a.ends_at\`, both booked.
--- hint
Minutes: \`(unixepoch(ends_at) - unixepoch(starts_at)) / 60\`, summed per staff member and \`date(starts_at)\`.
--- check query | Clients can be added; the same email in other capitals is refused
INSERT INTO clients (id, email, name) VALUES (1, 'ana@x.io', 'Ana'), (2, 'bo@x.io', 'Bo');
INSERT OR IGNORE INTO clients (id, email, name) VALUES (3, 'ANA@x.io', 'Ana again');
SELECT id FROM clients ORDER BY id
=> [[1], [2]]
--- check query | Appointments are booked by default
INSERT INTO appointments (id, staff_id, client_id, starts_at, ends_at) VALUES
  (1, 1, 1, '2024-09-02 09:00', '2024-09-02 09:30'),
  (2, 1, 2, '2024-09-02 09:30', '2024-09-02 10:00'),
  (3, 1, 2, '2024-09-02 09:45', '2024-09-02 10:15'),
  (4, 2, 1, '2024-09-02 09:00', '2024-09-02 10:00'),
  (5, 1, 1, '2024-09-03 14:00', '2024-09-03 15:00')
RETURNING id, status
=> [[1, "booked"], [2, "booked"], [3, "booked"], [4, "booked"], [5, "booked"]]
--- check query | An appointment ending before it starts, or with an unknown status, is refused
INSERT OR IGNORE INTO appointments (id, staff_id, client_id, starts_at, ends_at, status) VALUES
  (8, 1, 1, '2024-09-04 10:00', '2024-09-04 09:00', 'booked'),
  (9, 1, 1, '2024-09-04 11:00', '2024-09-04 11:30', 'maybe')
RETURNING id
=> []
--- check query | Overlaps are found; back-to-back is fine
SELECT staff_id, first_id, second_id FROM double_bookings ORDER BY staff_id, first_id, second_id
=> [[1, 2, 3]]
--- check query | Cancelled appointments stop counting; a one-minute overlap is caught
UPDATE appointments SET status = 'cancelled' WHERE id = 3;
INSERT INTO appointments (id, staff_id, client_id, starts_at, ends_at) VALUES (6, 2, 2, '2024-09-02 09:59', '2024-09-02 10:30');
SELECT staff_id, first_id, second_id FROM double_bookings ORDER BY staff_id, first_id, second_id
=> [[2, 4, 6]]
--- check query | The daily schedule counts booked appointments and minutes
SELECT staff_id, day, appointments, booked_minutes FROM daily_schedule ORDER BY staff_id, day
=> [[1, "2024-09-02", 2, 60], [1, "2024-09-03", 1, 60], [2, "2024-09-02", 2, 91]]
--- check query | An index leads with staff_id, then starts_at
SELECT COUNT(*) > 0
FROM pragma_index_list('appointments') il
JOIN pragma_index_info(il.name) a ON a.seqno = 0 AND a.name = 'staff_id'
JOIN pragma_index_info(il.name) b ON b.seqno = 1 AND b.name = 'starts_at'
=> [[1]]
`,Fe=`@track sql
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
GROUP BY u.id, u.email;
--- solution
SELECT u.email, COUNT(r.id) AS requests
FROM users u
LEFT JOIN requests r ON r.user_id = u.id
GROUP BY u.id, u.email;
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
- \`REFERENCES users(id)\` — a **foreign key**: each \`user_id\` is meant to point at a real row in \`users\`
- \`DEFAULT 0\` — the value when an insert leaves it out
- \`UNIQUE\` — no two rows may share the value

Constraints are rules the database enforces for every writer, forever — cheaper than remembering them in every piece of code.

One catch in SQLite, the database these lessons run on: it records a foreign key but only **enforces** it once the connection has run \`PRAGMA foreign_keys = ON;\`. Until then, an \`api_keys\` row pointing at user 99 is accepted. Most other databases (PostgreSQL, MySQL) always enforce it; in SQLite, turn it on first.
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
`,Ie=`@track typescript
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

Two more pieces the task uses. \`Record<string, number>\` is a generic type too: an object whose keys are strings and whose values are numbers — the type of a counts object like \`{ a: 2, l: 1 }\`. And a parameter can be a function: \`key: (item: T) => string\` means "a function that takes one \`T\` and returns a string".
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

This is "parse, don't assert": \`JSON.parse(text) as User\` compiles and lies; a guard checks. The one \`as\` inside the guard is different from the ones lesson 6 ruled out: \`x as Record<string, unknown>\` claims only "an object with some properties", and every property is still \`unknown\` until its own \`typeof\` check proves what it is. (In a real project a library such as Zod writes these for you — M3.)
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
`,Le=[`bash`,`git`,`html`,`javascript`,`typescript`,`python`,`sql`,`cpp`],Re=Object.assign({"./tracks/bash.txt":xe,"./tracks/cpp.txt":Se,"./tracks/git.txt":Ce,"./tracks/html.txt":we,"./tracks/javascript.txt":Te,"./tracks/python.advanced.txt":Ee,"./tracks/python.expert.txt":De,"./tracks/python.intermediate.txt":Oe,"./tracks/python.projects.txt":ke,"./tracks/python.txt":Ae,"./tracks/sql.advanced.txt":je,"./tracks/sql.expert.txt":Me,"./tracks/sql.intermediate.txt":Ne,"./tracks/sql.projects.txt":Pe,"./tracks/sql.txt":Fe,"./tracks/typescript.txt":Ie}),ze=[`basics`,`intermediate`,`advanced`,`expert`,`projects`];function z(e){let[t=``,n=`basics`]=e.replace(/\.txt$/,``).split(`.`);return[Le.indexOf(t),ze.indexOf(n)]}var Be=Object.entries(Re).map(([e,t])=>[e.split(`/`).pop(),t]).filter(([e])=>z(e)[0]>=0).sort((e,t)=>{let[n,r]=z(e[0]),[i,a]=z(t[0]);return n-i||r-a}),Ve=Le.filter(e=>Be.some(([t])=>t.split(`.`)[0]===e)),B=[{id:`ai-product`,title:`AI Product Engineer`,blurb:`The order LAUNCHPAD itself teaches in: the command line and git, JavaScript and TypeScript for the product, the web page it lives in, SQL for its data and Python for its models.`,steps:[`bash`,`git`,`javascript`,`typescript`,`html`,`sql`,`python`]},{id:`software`,title:`Software Engineer`,blurb:`The ground every software job stands on: one language learned properly, the command line and git, SQL, and then C++ to see what the machine is really doing.`,steps:[`python`,`bash`,`git`,`sql`,`cpp`]},{id:`frontend`,title:`Frontend Developer`,blurb:`Pages people use: HTML and CSS first, then the JavaScript that makes them react, TypeScript to keep it correct as it grows, and the tools every team works in.`,steps:[`html`,`javascript`,`typescript`,`bash`,`git`]},{id:`backend`,title:`Backend Developer`,blurb:`The server side: the command line and git it runs on, JavaScript and TypeScript for the code that answers requests, and SQL for the data it keeps.`,steps:[`bash`,`git`,`javascript`,`typescript`,`sql`]},{id:`data`,title:`Data & ML`,blurb:`Python, the language of data work and machine learning, SQL to get the data out of where it lives, and the command line and git to keep the work reproducible.`,steps:[`python`,`sql`,`bash`,`git`]},{id:`systems`,title:`Systems & C++`,blurb:`Close to the machine: the command line and git, Python to learn to think in code, then C++ for programs that are fast and exact about memory.`,steps:[`bash`,`git`,`python`,`cpp`]}];function V(e){return{stdout:e.stdout,stderr:e.stderr,error:e.error,ms:e.ms}}async function He(e,t,n={}){let{onStatus:r}=n;switch(e.lang){case`bash`:case`git`:return{stdout:``,stderr:``,error:null,...n.shell?{shell:n.shell}:{},ms:0};case`html`:{let n=await x(t,he(e)),r=n.logs.filter(e=>e.level===`error`).map(e=>e.text);return{stdout:n.logs.filter(e=>e.level!==`error`).map(e=>e.text).join(`
`),stderr:r.join(`
`),error:null,dom:n.results,ms:n.ms}}case`javascript`:return V(await m(t));case`typescript`:{let e=await g(t,{onStatus:r}),n=pe(t,e.error);return n?{...V(await g(n.program,{onStatus:r})),typeFails:n.fails}:V(e)}case`python`:{let n=e.stdin?.replace(/\n$/,``).split(`
`);return V(await h.run(t,{onStatus:r,...n?{stdin:n}:{}}))}case`cpp`:return V(await w(t,{stdin:e.stdin??``,onStatus:r}));case`sql`:{let n=await C(t,e.schema);return{stdout:``,stderr:``,error:n.error,tables:n.tables,ms:n.ms}}}}function Ue(e){return e===`git`?`bash`:e}function We(e){e===`python`&&!h.isBooted&&h.preload(),e===`typescript`&&_.preload()}var Ge=[`basics`,`intermediate`,`advanced`,`expert`,`projects`],Ke=[`javascript`,`typescript`,`python`,`sql`,`cpp`,`html`,`bash`,`git`],qe=new Set([`teach`,`task`,`starter`,`solution`,`hint`,`stdin`,`schema`,`check`]),Je=class extends Error{};function H(e,t){throw new Je(`${e}: ${t}`)}function U(e){let t=0,n=e.length;for(;t<n&&e[t].trim()===``;)t++;for(;n>t&&e[n-1].trim()===``;)n--;return e.slice(t,n).join(`
`)}function W(e){let t=U(e);return t?`${t}\n`:``}function Ye(e,t){let n;try{n=JSON.parse(e)}catch{return H(t,`expected rows as JSON, got: ${e.slice(0,60)}`)}return Array.isArray(n)&&n.every(e=>Array.isArray(e)&&e.every(e=>e===null||typeof e==`string`||typeof e==`number`))||H(t,`rows must be an array of arrays of strings, numbers or null`),n}function Xe(e,t,n){let r=/^check\s+([\w-]+)(?:\s+(\w+))?\s*\|\s*(.+)$/.exec(e);r||H(n,`a check needs "--- check <kind> | <name>", got "--- ${e}"`);let[,i,a,o]=r,s=t.filter(e=>e.startsWith(`?? `)).map(e=>e.slice(3).trim()).join(` `)||void 0,c=t.filter(e=>!e.startsWith(`?? `)),l=U(c),u={name:o.trim(),...s?{hint:s}:{}},d=`${n} "${u.name}"`;switch(i){case`output`:return l||H(d,`an output check needs the expected output`),{...u,kind:`output`,expect:l};case`includes`:{let e=U(c).split(`
`).filter(e=>e.trim()!==``);return e.length||H(d,`an includes check needs at least one line`),{...u,kind:`includes`,expect:e}}case`test`:return l||H(d,`a test check needs an expression`),{...u,kind:`test`,expr:l};case`case`:{let e=c.findIndex(e=>e.startsWith(`=> `));e<0&&H(d,`a case needs the call, then a "=> expected" line`);let t=U(c.slice(0,e)).replace(/\s*\n\s*/g,` `),n=c.slice(e).join(`
`).slice(3).trim();return(!t||!n)&&H(d,`a case needs both a call and an expected value`),{...u,kind:`case`,call:t,expect:n}}case`dom`:case`shell`:{let e=U(c).split(`
`).map(e=>e.trim()).filter(Boolean);return e.length||H(d,`a ${i} check needs at least one line`),i===`dom`?{...u,kind:`dom`,steps:e}:{...u,kind:`shell`,facts:e}}case`source`:a&&a!==`absent`&&H(d,`unknown source flag "${a}"`),l||H(d,`a source check needs a pattern`);try{new RegExp(l)}catch{H(d,`not a valid pattern: ${l}`)}return{...u,kind:`source`,pattern:l,absent:a===`absent`};case`result`:{let e=U(c).split(`
`),t=e[0]?.trim()===`ordered`,n=(t?e.slice(1):e).join(`
`).trim();return{...u,kind:`result`,rows:Ye(n,d),ordered:t}}case`type-error`:return l||H(d,`a type-error check needs the code that must not type-check`),{...u,kind:`type-error`,code:l};case`query`:{let e=c.findIndex(e=>e.startsWith(`=> `));e<0&&H(d,`a query check needs a "=> [[...]]" line with the expected rows`);let t=U(c.slice(0,e));return t||H(d,`a query check needs a query`),{...u,kind:`query`,sql:t,rows:Ye(c.slice(e).join(`
`).slice(3).trim(),d)}}default:return H(d,`unknown check kind "${i}"`)}}function Ze(e,t=`track`){let n=e.replace(/\r\n?/g,`
`).split(`
`),r={},i=[],a=0,o;for(;a<n.length&&!n[a].startsWith(`=== `);a++){if(n[a].trim()===`@schema`){let e=++a;for(;a<n.length&&n[a].trim()!==`@end`;)a++;a>=n.length&&H(t,`"@schema" without a closing "@end"`),o=U(n.slice(e,a));continue}let e=/^@(\w+)\s+(.*)$/.exec(n[a]);e&&(r[e[1]]=e[2].trim())}let s=r.track;for(Ke.includes(s)||H(t,`"@track" must be one of ${Ke.join(`, `)}`),r.title||H(t,`missing "@title"`);a<n.length;){let e=/^=== (\S+)\s*\|\s*(.+)$/.exec(n[a]);e||H(t,`expected "=== <id> | <title>" at line ${a+1}`);let r=e[1],c=`${t} ${r}`;a++;let l=[];for(;a<n.length&&!n[a].startsWith(`=== `);a++){let e=n[a],t=/^--- (.+)$/.exec(e),r=t?.[1].split(/\s/)[0];t&&r&&qe.has(r)?l.push({header:t[1].trim(),body:[]}):l.length?l[l.length-1].body.push(e):e.trim()&&H(c,`text before the first "--- " section: ${e.slice(0,40)}`)}let u=e=>{let t=l.filter(t=>t.header===e);return t.length>1&&H(c,`more than one "--- ${e}"`),t[0]?.body},d=u(`teach`),f=u(`task`),p=u(`starter`),m=u(`solution`);(!d||!f||!m)&&H(c,`needs teach, task and solution`);let h=l.filter(e=>e.header.startsWith(`check`)).map(e=>Xe(e.header,e.body,c));h.length||H(c,`needs at least one check`);let g=u(`stdin`),_=u(`schema`),v=_?U(_):o;i.push({id:r,lang:s,title:e[2].trim(),teach:U(d),task:U(f),starter:p?W(p):``,solution:W(m),hints:l.filter(e=>e.header===`hint`).map(e=>U(e.body)),checks:h,...g?{stdin:W(g)}:{},...v?{schema:v}:{}})}let c=new Set;for(let e of i)c.has(e.id)&&H(t,`duplicate lesson id ${e.id}`),c.add(e.id);i.length||H(t,`no lessons`);let l=r.level??`basics`;Ge.includes(l)||H(t,`"@level" must be one of ${Ge.join(`, `)}`);let u=r.course??(l===`basics`?s:`${s}-${l}`);return i.some(e=>e.checks.some(e=>e.kind===`type-error`))&&s!==`typescript`&&H(t,`type-error checks are for TypeScript tracks`),{id:u,lang:s,level:l,title:r.title,name:r.name??r.title,blurb:r.blurb??``,lessons:i}}var G=Be.map(([e,t])=>Ze(t,e)),Qe=new Map;for(let e of G)e.lessons.forEach((t,n)=>Qe.set(t.id,{track:e,lesson:t,index:n}));function $e(e){return G.find(t=>t.id===e)??G.find(t=>t.lang===e)}function K(e){return G.filter(t=>t.lang===e)}function et(e,t){let n=K(e);return n.find(e=>J(e,t)<e.lessons.length)??n[n.length-1]}function tt(e){return Qe.get(e)}function q(e,t){return e.lessons.find(e=>!t[e.id])??e.lessons[e.lessons.length-1]}function J(e,t){return e.lessons.filter(e=>t[e.id]).length}function nt(e,t=new Date){let n=e=>`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`,r=new Set(Object.values(e).map(e=>n(new Date(e)))),i=new Date(t);r.has(n(i))||i.setDate(i.getDate()-1);let a=0;for(;r.has(n(i));)a++,i.setDate(i.getDate()-1);return a}var rt={bash:`The command line`,git:`Git`,html:`HTML & CSS`,javascript:`JavaScript`,typescript:`TypeScript`,python:`Python`,sql:`SQL`,cpp:`C++`};function Y(e){return rt[e]??e}var X=[...new Set(G.map(e=>e.lang))].filter(e=>K(e).length>1).map(e=>({id:`master-${e}`,title:Y(e),blurb:`${Y(e)} from the first line to expert: the basics, then the idioms, the design and debugging skills and the problem solving that let you build anything in it on your own, then real projects.`,steps:K(e).map(e=>e.id)})),Z={basics:`Basics`,intermediate:`Intermediate`,advanced:`Advanced`,expert:`Expert`,projects:`Projects`},Q=t();function it({lessonId:e}){if(!e)return(0,Q.jsx)(ot,{});let t=e.startsWith(`roadmap-`)?at.find(t=>`roadmap-${t.id}`===e):void 0;if(t)return(0,Q.jsx)(ut,{roadmap:t});let n=$e(e);if(n)return(0,Q.jsx)(dt,{track:n});let r=tt(e);return r?(0,Q.jsx)(ft,{track:r.track,lesson:r.lesson,index:r.index},r.lesson.id):(0,Q.jsx)(ot,{missing:e})}function $(){let{state:e}=o(),t=nt(e.learn);return t?(0,Q.jsxs)(`span`,{className:`lm-streak`,title:`Days in a row with a lesson passed`,children:[(0,Q.jsx)(r,{size:14}),t,`-day streak`]}):null}var at=[...B,...X];function ot({missing:e}){let{state:t}=o(),n=d(),r=at.find(e=>e.id===n.query.goal)??B[0],i=(e,t=e.title)=>(0,Q.jsxs)(`button`,{type:`button`,role:`tab`,"aria-selected":e.id===r.id,"data-active":e.id===r.id,className:`rm-goals__pill`,onClick:()=>f(`/learn?goal=${e.id}`,{replace:!0}),children:[e.id.startsWith(`master-`)?(0,Q.jsx)(T,{lang:e.id.slice(7),size:16}):null,t]},e.id);return(0,Q.jsxs)(`div`,{className:`page page--padtop ide-wrap lm-home`,children:[(0,Q.jsxs)(`header`,{className:`rm-hero`,children:[(0,Q.jsxs)(`div`,{className:`page-head__kicker`,children:[`Learn to code `,(0,Q.jsx)($,{})]}),(0,Q.jsx)(`h1`,{className:`rm-hero__title`,children:`Choose where you want to end up. Each roadmap lines up the courses that get you there, one step at a time.`})]}),e?(0,Q.jsxs)(`p`,{className:`lm-missing`,children:[`There is no lesson called “`,e,`”. Pick a course below.`]}):null,(0,Q.jsxs)(`div`,{className:`rm-goals`,role:`tablist`,"aria-label":`Roadmap`,children:[(0,Q.jsx)(`span`,{className:`rm-goals__label`,children:`Reach a goal`}),(0,Q.jsx)(`div`,{className:`rm-goals__row`,children:B.map(e=>i(e))}),X.length?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`span`,{className:`rm-goals__label`,children:`Or master one language, beginner to expert`}),(0,Q.jsx)(`div`,{className:`rm-goals__row`,children:X.map(e=>i(e))})]}):null]}),(0,Q.jsxs)(`section`,{className:`rm`,children:[(0,Q.jsxs)(`header`,{className:`rm__head`,children:[(0,Q.jsx)(`span`,{className:`rm__goal`,children:r.title}),(0,Q.jsx)(`button`,{type:`button`,className:`rm__see`,onClick:()=>f(`/learn/roadmap-${r.id}`),children:`View every step`})]}),(0,Q.jsx)(lt,{roadmap:r,passed:t.learn})]}),(0,Q.jsx)(`h2`,{className:`lm-h2`,children:`Browse every course`}),Ve.map(e=>(0,Q.jsxs)(`section`,{className:`lm-lang`,"aria-label":Y(e),children:[(0,Q.jsxs)(`h3`,{className:`lm-lang__name`,children:[(0,Q.jsx)(T,{lang:e,size:20}),Y(e),(0,Q.jsxs)(`span`,{className:`lm-lang__count`,children:[K(e).length,` course`,K(e).length===1?``:`s`,` · `,K(e).reduce((e,t)=>e+t.lessons.length,0),` lessons`]})]}),(0,Q.jsx)(`div`,{className:`lm-courses`,children:K(e).map(e=>{let n=J(e,t.learn);return(0,Q.jsxs)(`a`,{className:`lm-course`,href:`#/learn/${e.id}`,children:[(0,Q.jsx)(`span`,{className:`lm-course__icon`,children:(0,Q.jsx)(T,{lang:e.lang,size:30})}),(0,Q.jsxs)(`span`,{className:`lm-course__text`,children:[(0,Q.jsx)(`span`,{className:`lm-course__level`,"data-level":e.level,children:Z[e.level]}),(0,Q.jsx)(`span`,{className:`lm-course__title`,children:e.name}),(0,Q.jsx)(`span`,{className:`lm-course__meta`,children:n===e.lessons.length?`Complete`:`${n} of ${e.lessons.length} lessons`}),(0,Q.jsx)(c,{value:n/e.lessons.length,height:4})]})]},e.id)})})]},e)),(0,Q.jsx)(`p`,{className:`track-note`,children:`Learn to code is practice, and it counts for nothing else: passing a lesson does not change your modules, your readiness or your review queue.`})]})}function st(e){let[t,n]=(0,k.useState)(3);return(0,k.useLayoutEffect)(()=>{let t=e.current;if(!t)return;let r=()=>{let e=t.clientWidth;n(e>=900?5:e>=620?4:3)};r();let i=new ResizeObserver(r);return i.observe(t),()=>i.disconnect()},[e]),t}function ct(e,t){let n=e.steps.map(e=>$e(e)).filter(e=>!!e),r=n.map(e=>J(e,t)===e.lessons.length),i=r.indexOf(!1);return{tracks:n,done:r,current:i,allDone:i<0}}function lt({roadmap:e,passed:t}){let{tracks:n,done:r,current:i,allDone:a}=ct(e,t),o=(0,k.useRef)(null),s=st(o),c=n.length+1,l=e=>{let t=Math.floor(e/s),n=e%s;return{row:t,col:t%2?s-1-n:n}},u=e=>{if(e>=c-1)return;let t=l(e),n=l(e+1);return n.row===t.row?n.col>t.col?`right`:`left`:t.col===s-1?`turn-right`:`turn-left`};return(0,Q.jsxs)(`div`,{className:`rm__path`,ref:o,style:{gridTemplateColumns:`repeat(${s}, minmax(0, 1fr))`},children:[n.map((e,n)=>{let a=J(e,t),o=r[n]||n===i,{row:s,col:c}=l(n);return(0,Q.jsxs)(`div`,{className:`rm-step`,style:{gridRow:s+1,gridColumn:c+1},children:[(0,Q.jsxs)(`a`,{href:`#/learn/${e.lang}`,className:`rm-tile`,"data-lit":o,"data-state":r[n]?`done`:n===i?`current`:`todo`,"aria-label":`Step ${n+1}: ${e.name}, ${a} of ${e.lessons.length} lessons passed`,title:`${e.name} · ${a}/${e.lessons.length} lessons`,children:[(0,Q.jsx)(T,{lang:e.lang,size:34}),(0,Q.jsx)(`span`,{className:`rm-tile__n`,"aria-hidden":`true`,children:n+1})]}),(0,Q.jsx)(`span`,{className:`rm-step__label`,children:e.name}),u(n)?(0,Q.jsx)(`span`,{className:`rm-link`,"data-dir":u(n),"data-lit":r[n],"aria-hidden":`true`}):null]},e.lang)}),(()=>{let{row:t,col:r}=l(n.length);return(0,Q.jsxs)(`div`,{className:`rm-step`,style:{gridRow:t+1,gridColumn:r+1},children:[(0,Q.jsx)(`span`,{className:`rm-tile rm-tile--end`,"data-lit":a,role:`img`,"aria-label":a?`${e.title}: every course complete`:`Finish line: complete every course on the ${e.title} roadmap`,children:(0,Q.jsx)(S,{size:32})}),a?(0,Q.jsx)(`span`,{className:`rm-step__label`,children:`Goal reached`}):null]})})()]})}function ut({roadmap:e}){let{state:t}=o(),{tracks:n,done:r,current:a,allDone:s}=ct(e,t.learn),u=r.filter(Boolean).length,d=e=>f(`/learn/${q(e,t.learn).id}`);return(0,Q.jsxs)(`div`,{className:`page page--padtop ide-wrap`,children:[(0,Q.jsxs)(`a`,{className:`lm-back`,href:`#/learn?goal=${e.id}`,children:[(0,Q.jsx)(i,{size:13}),`Roadmaps`]}),(0,Q.jsxs)(`div`,{className:`rmv-head`,children:[(0,Q.jsxs)(`div`,{className:`page-head__kicker`,children:[`Roadmap · `,n.length,` courses `,(0,Q.jsx)($,{})]}),(0,Q.jsx)(`h1`,{className:`h-page`,children:e.title}),(0,Q.jsx)(`p`,{className:`page-head__sub`,children:e.blurb}),(0,Q.jsxs)(`div`,{className:`lm-course-go`,children:[(0,Q.jsx)(c,{value:u/n.length,height:6}),(0,Q.jsxs)(`span`,{className:`lm-course-go__n`,children:[u,`/`,n.length]}),(0,Q.jsxs)(`button`,{type:`button`,className:`ide-run`,onClick:()=>d(n[s?0:a]),children:[s?`Review`:u===0&&J(n[0],t.learn)===0?`Start step 1`:`Continue step ${a+1}`,(0,Q.jsx)(l,{size:13})]})]})]}),(0,Q.jsxs)(`ol`,{className:`rmv`,children:[n.map((e,n)=>{let i=J(e,t.learn);return(0,Q.jsxs)(`li`,{className:`rmv-step`,"data-state":r[n]?`done`:n===a?`current`:`todo`,children:[(0,Q.jsxs)(`span`,{className:`rm-tile rmv-step__tile`,"data-lit":r[n]||n===a,children:[(0,Q.jsx)(T,{lang:e.lang,size:30}),(0,Q.jsx)(`span`,{className:`rm-tile__n`,"aria-hidden":`true`,children:n+1})]}),(0,Q.jsxs)(`div`,{className:`rmv-step__body`,children:[(0,Q.jsx)(`a`,{className:`rmv-step__name`,href:`#/learn/${e.lang}`,children:e.name}),(0,Q.jsx)(`p`,{className:`rmv-step__blurb`,children:e.blurb}),(0,Q.jsxs)(`div`,{className:`rmv-step__row`,children:[(0,Q.jsx)(c,{value:i/e.lessons.length,height:4}),(0,Q.jsxs)(`span`,{className:`rmv-step__n`,children:[i,`/`,e.lessons.length,` lessons`]}),(0,Q.jsxs)(`button`,{type:`button`,className:`rmv-step__go`,onClick:()=>d(e),children:[i===0?`Start`:i===e.lessons.length?`Review`:`Continue`,(0,Q.jsx)(l,{size:12})]})]})]})]},e.lang)}),(0,Q.jsxs)(`li`,{className:`rmv-step`,"data-state":s?`done`:`todo`,children:[(0,Q.jsx)(`span`,{className:`rm-tile rm-tile--end rmv-step__tile`,"data-lit":s,children:(0,Q.jsx)(S,{size:28})}),(0,Q.jsxs)(`div`,{className:`rmv-step__body`,children:[(0,Q.jsx)(`span`,{className:`rmv-step__name`,children:s?`Goal reached`:`Finish line`}),(0,Q.jsx)(`p`,{className:`rmv-step__blurb`,children:s?`Every course on the ${e.title} roadmap, complete. The basics are yours; more lessons past them will follow.`:`Complete every course above to reach it.`})]})]})]})]})}function dt({track:e}){let{state:t}=o(),r=J(e,t.learn),a=e.lessons.length,s=q(e,t.learn);return(0,Q.jsxs)(`div`,{className:`page page--padtop ide-wrap`,children:[(0,Q.jsxs)(`a`,{className:`lm-back`,href:`#/learn`,children:[(0,Q.jsx)(i,{size:13}),`Roadmaps`]}),(0,Q.jsxs)(`div`,{className:`lm-course-head`,children:[(0,Q.jsx)(`span`,{className:`rm-tile`,style:{"--tile":`72px`},children:(0,Q.jsx)(T,{lang:e.lang,size:40})}),(0,Q.jsxs)(`div`,{style:{minWidth:0},className:`grow`,children:[(0,Q.jsxs)(`div`,{className:`page-head__kicker`,children:[Z[e.level],` · `,a,` lessons `,(0,Q.jsx)($,{})]}),(0,Q.jsx)(`h1`,{className:`h-page`,children:e.name}),(0,Q.jsx)(`p`,{className:`page-head__sub`,children:e.blurb})]})]}),K(e.lang).length>1?(0,Q.jsx)(`nav`,{className:`lm-ladder`,"aria-label":`${Y(e.lang)} courses`,children:K(e.lang).map((n,r)=>(0,Q.jsxs)(`a`,{href:`#/learn/${n.id}`,className:`lm-ladder__step`,"data-here":n.id===e.id,"data-done":J(n,t.learn)===n.lessons.length,children:[(0,Q.jsx)(`span`,{className:`lm-ladder__n`,children:r+1}),Z[n.level]]},n.id))}):null,(0,Q.jsxs)(`div`,{className:`lm-course-go`,children:[(0,Q.jsx)(c,{value:r/a,height:6}),(0,Q.jsxs)(`span`,{className:`lm-course-go__n`,children:[r,`/`,a]}),(0,Q.jsxs)(`button`,{type:`button`,className:`ide-run`,onClick:()=>f(`/learn/${s.id}`),children:[r===0?`Start course`:r===a?`Review`:`Continue`,(0,Q.jsx)(l,{size:13})]})]}),(0,Q.jsx)(`ol`,{className:`lm-outline`,children:e.lessons.map((e,i)=>{let o=!!t.learn[e.id],c=e.id===s.id&&r<a;return(0,Q.jsx)(`li`,{"data-done":o,"data-next":c,children:(0,Q.jsxs)(`a`,{href:`#/learn/${e.id}`,children:[(0,Q.jsx)(`span`,{className:`lm-outline__n`,"aria-hidden":`true`,children:o?(0,Q.jsx)(n,{size:13}):i+1}),(0,Q.jsx)(`span`,{className:`lm-outline__title`,children:e.title}),o?(0,Q.jsx)(`span`,{className:`lm-outline__tag`,children:`Passed`}):c?(0,Q.jsx)(`span`,{className:`lm-outline__tag lm-outline__tag--next`,children:`Next`}):null]})},e.id)})})]})}function ft({track:e,lesson:t,index:r}){let{state:a,setState:c}=o(),d=t.lang===`bash`||t.lang===`git`,[m,h]=(0,k.useState)(!1),[g,_]=(0,k.useState)(0),[v,ee]=(0,k.useState)(!1),y=(0,k.useRef)(null),te=ie(`learn:${t.id}:example`,t.teach,t.schema),b=!!a.learn[t.id],x=e.lessons[r-1],S=e.lessons[r+1],C=K(e.lang),w=S?void 0:C[C.findIndex(t=>t.id===e.id)+1];(0,k.useEffect)(()=>We(t.lang),[t.lang]);let E=(0,k.useCallback)(()=>{c(e=>u(e,t.id)),h(!0),requestAnimationFrame(()=>y.current?.scrollIntoView({block:`nearest`,behavior:`smooth`}))},[t.id,c]),D=(0,k.useCallback)(async(e,n,r)=>{let i=be(t,e,await He(t,me(t,e),{onStatus:r}));return{run:{stdout:i.output,stderr:i.stderr,error:i.error,plots:[],result:null,tables:i.tables,ms:i.ms},tests:i.results}},[t]);return(0,Q.jsxs)(`div`,{className:`page page--padtop ide-wrap`,children:[(0,Q.jsxs)(`div`,{className:`lm-top`,children:[(0,Q.jsxs)(`a`,{className:`lm-back`,href:`#/learn/${e.id}`,children:[(0,Q.jsx)(i,{size:13}),e.title]}),(0,Q.jsx)(`div`,{className:`lm-dots`,"aria-label":`Lesson ${r+1} of ${e.lessons.length}`,children:e.lessons.map((e,t)=>(0,Q.jsx)(`a`,{href:`#/learn/${e.id}`,className:`lm-dots__dot`,"data-done":!!a.learn[e.id],"data-here":t===r,title:`${t+1}. ${e.title}`,"aria-label":`Lesson ${t+1}: ${e.title}${a.learn[e.id]?` (passed)`:``}`},e.id))}),(0,Q.jsx)($,{})]}),(0,Q.jsxs)(`article`,{className:`lm-flow`,children:[(0,Q.jsxs)(`div`,{className:`lm-text__kicker`,children:[(0,Q.jsx)(T,{lang:e.lang,size:18}),`Lesson `,r+1,` of `,e.lessons.length,b?(0,Q.jsx)(`span`,{className:`lm-passed-tag`,children:`Passed`}):null]}),(0,Q.jsx)(`h1`,{className:`lm-text__title`,children:t.title}),(0,Q.jsx)(`div`,{className:`lm-teach`,children:(0,Q.jsx)(p,{renderCode:te,children:t.teach})}),(0,Q.jsxs)(`section`,{className:`lm-challenge`,children:[(0,Q.jsx)(`div`,{className:`lm-challenge__label`,children:`Your turn`}),(0,Q.jsx)(p,{children:t.task}),t.stdin?(0,Q.jsxs)(`div`,{className:`lm-stdin`,children:[(0,Q.jsx)(`div`,{className:`lm-stdin__label`,children:`Input the program reads`}),(0,Q.jsx)(`pre`,{children:t.stdin})]}):null,d?(0,Q.jsx)(`p`,{className:`lm-challenge__how`,children:`Type the commands into the terminal below, then press Check.`}):null]}),(0,Q.jsx)(`div`,{className:`lm-work`,children:d?(0,Q.jsx)(pt,{lesson:t,onPass:E}):(0,Q.jsx)(ne,{lang:Ue(t.lang),code:t.starter,saveKey:`learn:${t.id}`,grade:D,onPass:E,runLabel:`Run Code`,input:!1,minHeight:260,testsHint:`Press Run Code to run your code against the tests.`,eager:!0})}),(0,Q.jsx)(`div`,{ref:y,children:m?(0,Q.jsxs)(`div`,{className:`lm-win`,children:[(0,Q.jsx)(n,{size:16}),(0,Q.jsx)(`span`,{className:`grow`,children:S?`Lesson passed. Next: ${S.title}`:w?`That is the whole ${e.name} course. Next: ${w.name}.`:`Lesson passed — that is the whole ${e.name} course.`}),(0,Q.jsxs)(`button`,{type:`button`,className:`ide-run`,onClick:()=>f(S?`/learn/${S.id}`:w?`/learn/${w.lessons[0].id}`:`/learn/${e.id}`),children:[S?`Continue`:w?`Start the next course`:`Back to the course`,(0,Q.jsx)(l,{size:13})]})]}):null}),(0,Q.jsxs)(`div`,{className:`lm-help`,children:[t.hints.slice(0,g).map((e,t)=>(0,Q.jsxs)(`div`,{className:`lm-hint`,children:[(0,Q.jsxs)(`span`,{className:`lm-hint__n`,children:[`Hint `,t+1]}),(0,Q.jsx)(p,{children:e})]},t)),(0,Q.jsxs)(`div`,{className:`lm-help__row`,children:[g<t.hints.length?(0,Q.jsx)(`button`,{type:`button`,className:`lm-link`,onClick:()=>_(e=>e+1),children:g===0?`Show a hint`:`Another hint`}):null,(0,Q.jsx)(`button`,{type:`button`,className:`lm-link`,onClick:()=>ee(e=>!e),children:v?`Hide the solution`:`Show the solution`})]}),v?(0,Q.jsxs)(`div`,{className:`lm-solution`,children:[(0,Q.jsx)(`p`,{children:`One way to do it. Try typing it yourself rather than copying — that is where it sticks.`}),(0,Q.jsx)(p,{children:"```"+mt(t.lang)+`
`+t.solution+"```"})]}):null]}),(0,Q.jsxs)(`div`,{className:`lm-nav`,children:[x?(0,Q.jsxs)(s,{variant:`ghost`,size:`sm`,onClick:()=>f(`/learn/${x.id}`),children:[(0,Q.jsx)(i,{size:13}),x.title]}):(0,Q.jsx)(`span`,{}),S?(0,Q.jsxs)(s,{variant:`ghost`,size:`sm`,onClick:()=>f(`/learn/${S.id}`),children:[S.title,(0,Q.jsx)(l,{size:13})]}):null]})]})]})}function pt({lesson:e,onPass:t}){let[n,r]=(0,k.useState)(()=>ve(e)),[i,o]=(0,k.useState)(0),[s,c]=(0,k.useState)(null),[l,u]=(0,k.useState)(!1),d=async()=>{u(!0),c(null);try{let r=be(e,``,await He(e,``,{shell:n}));c(r),r.passed&&t()}finally{u(!1)}};return(0,Q.jsx)(`div`,{className:`embed`,children:(0,Q.jsxs)(te,{lang:`bash`,file:`~/project`,right:(0,Q.jsxs)(`button`,{type:`button`,className:`ide__tool`,onClick:()=>{r(ve(e)),o(e=>e+1),c(null)},title:`Start this lesson over`,children:[(0,Q.jsx)(a,{size:13}),`Reset`]}),children:[(0,Q.jsx)(D,{shell:n,onShell:r,height:300,banner:`Practice terminal for this lesson. Type help to see the commands.`},i),(0,Q.jsx)(`div`,{className:`lm-termbar`,children:(0,Q.jsx)(b,{onClick:()=>void d(),running:l,label:`Check`})}),(0,Q.jsx)(re,{tabs:[{id:`tests`,label:`Test cases`,...s?{mark:s.passed?`pass`:`fail`}:{}}],active:`tests`,onTab:()=>{},children:(0,Q.jsx)(E,{results:s?.results??null,empty:`Do the challenge in the terminal, then press Check.`})})]})})}function mt(e){return e===`javascript`?`js`:e===`typescript`?`ts`:e}function ht(e){let{state:t}=o();return(0,k.useMemo)(()=>{let n=et(e,t.learn);return n?{lesson:q(n,t.learn),done:J(n,t.learn),total:n.lessons.length}:null},[e,t.learn])}export{it as Learn,ht as useNextLesson};