import{r as e,t}from"./react-D6Jy4RLT.js";import{E as n,L as r,O as i,X as a,g as o,r as s,t as c,v as l}from"./ui-5JSjpmHC.js";import{g as u}from"./engine-BhleXMOO.js";import{_ as d,g as f}from"./index-C5ywhJnc.js";import{t as p}from"./markdown-CkaLBiqd.js";/* empty css              */import{A as m,D as h,M as g,N as _,S as v,_ as y,b,c as ee,d as te,g as x,i as S,j as C,k as w,l as T,m as E,p as ne,r as re,s as ie,t as ae,v as oe,x as se,y as D}from"./lessonCode-BqOy2-Gj.js";var O=e(),k=`@@LEARN`,ce=/^@@LEARN (\d+) (PASS|FAIL|ERROR)(?: (.*))?$/;function A(e){return e.replace(/\s*\n\s*/g,` `).trim()}function j(e,t){return e.checks.map((e,t)=>({c:e,i:t})).filter(e=>e.c.kind===t)}var le=`const throws = (f) => { try { f(); return false } catch { return true } }
  const __eq = (a, b) => { if (Object.is(a, b)) return true; if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null || Array.isArray(a) !== Array.isArray(b)) return false; const ka = Object.keys(a), kb = Object.keys(b); return ka.length === kb.length && ka.every((k) => __eq(a[k], b[k])) }
  const __show = (v) => { if (v === undefined) return 'undefined'; if (typeof v === 'function') return '[Function]'; if (typeof v === 'bigint') return v + 'n'; try { const j = JSON.stringify(v); return j === undefined ? String(v) : j } catch { return String(v) } }
  const __err = (e) => (e instanceof Error ? e.name + ': ' + e.message : String(e))
  const __learn = (i, f) => { try { const r = f(); console.log('${k} ' + i + (r ? ' PASS ' : ' FAIL ') + __show(r)) } catch (e) { console.log('${k} ' + i + ' ERROR ' + __err(e)) } }
  const __case = (i, f, w) => { try { const got = f(); console.log('${k} ' + i + (__eq(got, w()) ? ' PASS ' : ' FAIL ') + __show(got)) } catch (e) { console.log('${k} ' + i + ' ERROR ' + __err(e)) } }`,ue=le.replace(`(f) =>`,`(f: () => unknown): boolean =>`).replace(`const __eq = (a, b) =>`,`const __eq = (a: any, b: any): boolean =>`).replace(`const __show = (v) =>`,`const __show = (v: unknown): string =>`).replace(`const __err = (e) =>`,`const __err = (e: unknown): string =>`).replace(`const __learn = (i, f) =>`,`const __learn = (i: number, f: () => unknown): void =>`).replace(`const __case = (i, f, w) =>`,`const __case = (i: number, f: () => unknown, w: () => unknown): void =>`).replace(`.every((k) =>`,`.every((k: string) =>`),de=`#include <cmath>
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
template <class T> std::string __learn_show(const T& v) { if constexpr (requires(std::ostream& os) { os << v; }) { std::ostringstream o; o << v; return o.str(); } else { return "(a value)"; } }`;function fe(e){let t=j(e,`test`),n=j(e,`case`);switch(e.lang){case`javascript`:case`typescript`:{let r=e.lang===`typescript`,i=r?j(e,`type-error`).map(e=>`  // @ts-expect-error ${pe} ${e.i}\n  ;(() => { ${A(e.c.code)} })`):[];if(!t.length&&!n.length)return i.length?`\n;{\n${i.join(`
`)}\n}\n`:``;let a=r?`  // @ts-ignore
`:``,o=[...t.map(e=>({i:e.i,line:`${a}  __learn(${e.i}, () => (${A(e.c.expr)}))`})),...n.map(e=>({i:e.i,line:`${a}  __case(${e.i}, () => (${e.c.call}), () => (${A(e.c.expect)}))`}))].sort((e,t)=>e.i-t.i).map(e=>e.line);return`\n;{\n  ${r?ue:le}\n${o.join(`
`)}\n${i.join(`
`)}\n}\n`}case`python`:{if(!t.length&&!n.length)return``;let e=[...t.map(e=>({i:e.i,line:`__learn_test(${e.i}, lambda: (${A(e.c.expr)}))`})),...n.map(e=>({i:e.i,line:`__learn_case(${e.i}, lambda: (${e.c.call}), lambda: (${A(e.c.expect)}))`}))].sort((e,t)=>e.i-t.i).map(e=>e.line);return[``,``,`def raises(exc, fn):`,`    try:`,`        fn()`,`    except exc:`,`        return True`,`    return False`,``,`def __learn_same(a, b):`,`    if isinstance(b, bool) or b is None:`,`        return a is b`,`    return type(a) is not bool and a == b`,``,`def __learn_test(i, f):`,`    try:`,`        r = f()`,`        print("${k} %d %s %r" % (i, "PASS" if r else "FAIL", r))`,`    except Exception as e:`,`        print("${k} %d ERROR %s: %s" % (i, type(e).__name__, e))`,``,`def __learn_case(i, f, w):`,`    try:`,`        got = f()`,`        print("${k} %d %s %r" % (i, "PASS" if __learn_same(got, w()) else "FAIL", got))`,`    except Exception as e:`,`        print("${k} %d ERROR %s: %s" % (i, type(e).__name__, e))`,``,...e,``].join(`
`)}case`cpp`:return!t.length&&!n.length?``:`\n${de}\nint main() {\n${[...t.map(e=>({i:e.i,line:`    { bool __r = (${A(e.c.expr)}); std::cout << "${k} ${e.i} " << (__r ? "PASS " : "FAIL ") << __learn_show(__r) << std::endl; }`})),...n.map(e=>({i:e.i,line:`    { auto __v = (${e.c.call}); bool __ok = (__v == (${A(e.c.expect)})); std::cout << "${k} ${e.i} " << (__ok ? "PASS " : "FAIL ") << __learn_show(__v) << std::endl; }`}))].sort((e,t)=>e.i-t.i).map(e=>e.line).join(`
`)}\n    return 0;\n}\n`;case`sql`:return`\n;\nSELECT '${k}' AS __learn;\n${j(e,`query`).map(e=>`SELECT '${k} ${e.i}' AS __learn;\n${e.c.sql.replace(/;\s*$/,``)};`).join(`
`)}\n`;case`html`:case`bash`:case`git`:return``}}var pe=`learn-type-check`;function me(e,t){if(!t)return null;let n=[...t.matchAll(/main\.ts\((\d+),\d+\): error (TS\d+)/g)];if(!n.length)return null;let r=e.split(`
`),i=[],a=new Set;for(let[,e,t]of n){let n=Number(e)-1,o=RegExp(`// @ts-expect-error ${pe} (\\d+)`).exec(r[n]??``);if(t!==`TS2578`||!o)return null;i.push(Number(o[1])),a.add(n)}return{fails:i,program:r.map((e,t)=>a.has(t)?``:e).join(`
`)}}function he(e,t){let n=fe(e);return n?t.endsWith(`
`)?t+n.replace(/^\n/,``):t+n:t}function ge(e){return j(e,`dom`).map(e=>e.c.steps)}function M(e){return e.replace(/\r\n?/g,`
`).split(`
`).map(e=>e.trimEnd()).join(`
`).replace(/^\n+|\n+$/g,``)}function _e(e){let t=new Map,n=[];for(let r of e.replace(/\r\n?/g,`
`).split(`
`)){let e=ce.exec(r);e?t.set(Number(e[1]),{status:e[2],...e[3]?{message:e[3]}:{}}):n.push(r)}return{clean:n.join(`
`),marks:t}}function ve(e,t){return typeof e==`number`&&typeof t==`number`?Math.abs(e-t)<=1e-9*Math.max(1,Math.abs(e),Math.abs(t)):e===t}function N(e,t,n){if(e.length!==t.length)return!1;let r=e=>JSON.stringify(e.map(e=>typeof e==`number`?Number(e.toPrecision(12)):e)),i=n?e:[...e].sort((e,t)=>r(e).localeCompare(r(t))),a=n?t:[...t].sort((e,t)=>r(e).localeCompare(r(t)));return i.every((e,t)=>e.length===a[t].length&&e.every((e,n)=>ve(e,a[t][n])))}function P(e){return e.length?e.slice(0,8).map(e=>e.map(e=>e===null?`NULL`:String(e)).join(` | `)).join(`
`)+(e.length>8?`\n… ${e.length-8} more`:``):`(no rows)`}function F(e,t=600){return e.length>t?`${e.slice(0,t)}…`:e}var I=e=>se(y,e),ye=e=>e.replace(/^\/home\/you/,`~`);function be(e){let t=b();for(let n of e.starter.split(`
`))n.trim()&&(t=v(t,n).state);return{...t,history:[],transcript:[]}}function xe(e,t){let n=t.trim().split(/\s+/),[r,i=``]=n,a=n.slice(2).join(` `);switch(r){case`cwd`:return e.cwd===I(i)?null:`you are in ${ye(e.cwd)}, not ${ye(I(i))}`;case`dir`:{let t=D(e,I(i));return t?.kind===`dir`?null:t?`${i} is a file, not a folder`:`there is no folder ${i}`}case`missing`:return D(e,I(i))?`${i} should not exist any more`:null;case`file`:{let n=D(e,I(i));if(!n)return`there is no file ${i}`;if(n.kind!==`file`)return`${i} is a folder, not a file`;if(!a)return null;let r=/^(==|contains)\s+(.*)$/.exec(a);if(!r)return`the check "${t}" could not be read`;let o=n.content.replace(/\n$/,``);return r[1]===`==`?o===r[2]?null:`${i} contains ${JSON.stringify(o)}, not ${JSON.stringify(r[2])}`:o.includes(r[2])?null:`${i} does not contain ${JSON.stringify(r[2])}`}case`ran`:{let t=n.slice(1).join(` `);return e.history.flatMap(e=>e.split(`&&`).map(e=>e.trim().replace(/\s+/g,` `))).some(e=>e===t||e.startsWith(`${t} `))?null:`you have not run ${t} yet`}case`used`:{let t=n.slice(1).join(` `);return e.history.some(e=>e.includes(t))?null:`you have not used ${t} in a command yet`}case`printed-line`:{let t=n.slice(1).join(` `);return e.transcript.some(e=>e.out.split(`
`).includes(t))?null:`nothing has printed the line ${JSON.stringify(t)} yet`}case`printed`:{let t=n.slice(1).join(` `);return e.transcript.some(e=>e.out.includes(t))?null:`nothing has printed ${JSON.stringify(t)} yet`}case`git`:{let r=oe(e,I(i)),[,,a,...o]=n;if(!r)return`${i===`.`?`~/project`:i} is not a git repository yet`;switch(a){case`repo`:return null;case`commits`:{let e=Number(o[1]);return(o[0]===`>=`?r.commits>=e:r.commits===e)?null:`the repository has ${r.commits} commit${r.commits===1?``:`s`}`}case`branch`:return r.branch===o[0]?null:`you are on ${r.branch}, not ${o[0]}`;case`has-branch`:return r.branches.includes(o[0])?null:`there is no branch ${o[0]}`;case`staged`:return r.staged.includes(o[0])?null:`${o[0]} is not staged`;case`untracked`:return r.untracked.includes(o[0])?null:`${o[0]} is not an untracked file`;case`modified`:return r.modified.includes(o[0])?null:`${o[0]} has no unstaged changes`;case`commits-on`:{let e=Number(o[2]),t=r.branchCommits[o[0]];return t===void 0?`there is no branch ${o[0]}`:(o[1]===`>=`?t>=e:t===e)?null:`${o[0]} has ${t} commit${t===1?``:`s`}`}case`merges`:{let e=Number(o[1]);return(o[0]===`>=`?r.merges>=e:r.merges===e)?null:`the history has ${r.merges} merge commit${r.merges===1?``:`s`}`}case`log`:{let e=o.slice(1).join(` `);return r.messages.some(t=>t.includes(e))?null:`no commit message contains ${JSON.stringify(e)}`}case`clean`:return r.staged.length?`still staged: ${r.staged.join(`, `)}`:null;default:return`the check "${t}" could not be read`}}default:return`the check "${t}" could not be read`}}function Se(e,t,n){let{clean:r,marks:i}=_e(n.stdout),a=n.tables??[],o=new Map;if(e.lang===`sql`){let e=a.findIndex(e=>e.columns.length===1&&e.columns[0]===`__learn`&&e.rows[0]?.[0]===`@@LEARN`),t=e>=0?a.slice(e+1):[];for(let e=0;e<t.length;e++){let n=t[e],r=n.columns[0]===`__learn`?/^@@LEARN (\d+)$/.exec(String(n.rows[0]?.[0]??``)):null;if(!r)continue;let i=t[e+1],a=i&&i.columns[0]===`__learn`;o.set(Number(r[1]),i&&!a?i.rows:[])}e>=0&&(a=a.slice(0,e))}let s=new Map(j(e,`dom`).map((e,t)=>[e.i,t])),c=n.error?`Did not run — fix the error shown in the console first.`:null,l=M(r),u=e.checks.map((r,u)=>{let d={name:r.name,...r.hint?{hint:r.hint}:{}},f=(e,t={})=>({...d,status:e?`pass`:`fail`,...t});if(r.kind===`source`)return f(new RegExp(r.pattern,`m`).test(t)!==r.absent);if(r.kind===`shell`){if(!n.shell)return f(!1,{detail:`The terminal has not been used yet.`});let e=r.facts.map(e=>xe(n.shell,e)).find(e=>e!==null);return f(!e,{input:r.facts.join(`
`),...e?{actual:e}:{}})}if(r.kind===`dom`){let e=n.dom?.[s.get(u)??-1];return c?f(!1,{input:r.steps.join(`
`),detail:c}):e?f(e.pass,{input:r.steps.join(`
`),...e.detail?{actual:e.detail}:{}}):f(!1,{input:r.steps.join(`
`),detail:`The page did not finish loading, so this was not checked.`})}if(r.kind===`type-error`){if(c)return f(!1,{input:r.code,detail:c});let e=n.typeFails?.includes(u);return f(!e,{input:r.code,expected:`a type error`,actual:e?`it type-checks`:`a type error`,...e?{detail:`The compiler accepts this, so the type still lets it through. Tighten the type until this line is rejected.`}:{}})}if(c){let t=r.kind===`case`?r.call:r.kind===`test`?A(r.expr):r.kind===`query`?r.sql:e.stdin?.trim();return f(!1,{detail:c,...t?{input:t}:{}})}switch(r.kind){case`output`:{let t=M(r.expect);return f(t===l,{input:e.stdin?.trim()||`(no input)`,expected:F(t),actual:F(l)||`(nothing printed)`})}case`includes`:{let e=r.expect.filter(e=>!l.includes(M(e)));return f(!e.length,{expected:r.expect.join(`
`),actual:F(l)||`(nothing printed)`,...e.length?{detail:`Not in the output: ${e.map(e=>`“${e}”`).join(`, `)}`}:{}})}case`test`:case`case`:{let e=i.get(u),t=r.kind===`case`?r.call:A(r.expr),n=r.kind===`case`?r.expect:`true`;return e?e.status===`ERROR`?f(!1,{input:t,expected:n,actual:e.message??`an error`}):f(e.status===`PASS`,{input:t,expected:n,actual:e.message??``}):f(!1,{input:t,expected:n,detail:`This check never ran: the program stopped before it got there.`})}case`result`:{let e=a[a.length-1],t=P(r.rows)+(r.ordered?`
(in this order)`:``);return e?f(N(r.rows,e.rows,r.ordered),{expected:t,actual:P(e.rows)}):f(!1,{expected:t,actual:`(no rows)`,detail:`Your SQL did not return any rows. The last statement should be a SELECT.`})}case`query`:{let e=o.get(u);if(!e)return f(!1,{input:r.sql,detail:`This check never ran.`});if(/^\s*EXPLAIN\s+QUERY\s+PLAN\b/i.test(r.sql)){let t=e=>e.map(e=>[e[e.length-1]??null]);return f(N(t(r.rows),t(e),!0),{input:r.sql,expected:P(t(r.rows)),actual:P(t(e))})}return f(N(r.rows,e,!0),{input:r.sql,expected:P(r.rows),actual:P(e)})}}});return{passed:u.every(e=>e.status===`pass`),results:u,output:r.replace(/\n+$/,e.lang===`sql`?``:`
`).replace(/^\n$/,``),stderr:n.stderr,error:n.error,tables:a,ms:n.ms}}var Ce='@track bash\n@title Terminal\n@name Linux and the command line\n@blurb The command line every developer lives in: moving around, making, reading and changing files, without a mouse.\n\n=== term-01 | Where am I?\n--- teach\nThe **terminal** is a way to talk to your computer in text. You type a **command**, press Enter, and it answers.\n\nThe line before your cursor is the **prompt**: `~/project $` means you are in a folder called `project` inside your home folder (`~`). Two commands you will use every day:\n\n- `pwd` — **p**rint **w**orking **d**irectory: the full path of the folder you are in.\n- `ls` — **l**i**s**t what is in it. Folders show with a `/` at the end.\n\nThis terminal is a practice one: it lives in the page, so nothing you type can touch your real files.\n--- task\nRun `pwd` to see where you are, then `ls` to see what is in this folder.\n--- starter\nmkdir src\ntouch README.md\n--- solution\npwd\nls\n--- hint\nType `pwd` and press Enter. Then type `ls` and press Enter.\n--- check shell | You printed where you are\nran pwd\nprinted /home/you/project\n--- check shell | You listed the folder\nran ls\nprinted README.md\n\n=== term-02 | Making folders and moving into them\n--- teach\n`mkdir name` **m**a**k**es a **dir**ectory (a folder). `cd name` **c**hanges **d**irectory — it moves you into it, and the prompt changes to show where you are.\n\n```\n~/project $ mkdir notes\n~/project $ cd notes\n~/project/notes $\n```\n\n`cd ..` goes back up one level, and `cd` on its own takes you home.\n--- task\nMake a folder called `notes` and move into it.\n--- starter\n--- solution\nmkdir notes\ncd notes\n--- hint\nFirst `mkdir notes`, then `cd notes`.\n--- check shell | The notes folder exists\ndir notes\n--- check shell | You are inside it\ncwd notes\n\n=== term-03 | Files: create, write, read\n--- teach\n`touch name` makes an empty file. To put text in a file, `echo` it and **redirect** the output with `>`:\n\n```\necho "Launch at dawn" > plan.txt\n```\n\n`echo` prints its text; `> plan.txt` sends that text into the file instead of the screen. Careful: `>` **replaces** whatever the file held.\n\nPut the text in double quotes. The quotes keep it together as one piece, and stop characters such as `>` or `&` inside it from being read as part of the command.\n\n`cat plan.txt` prints a file\'s contents, so you can check what you wrote.\n--- task\nCreate `hello.txt` containing exactly `Hello, terminal!`, then show it with `cat`.\n--- starter\n--- solution\necho "Hello, terminal!" > hello.txt\ncat hello.txt\n--- hint\nPut the text in quotes: `echo "Hello, terminal!" > hello.txt`.\n--- hint\nThen `cat hello.txt`.\n--- check shell | hello.txt holds the greeting\nfile hello.txt == Hello, terminal!\n--- check shell | You read it back with cat\nran cat\nprinted Hello, terminal!\n\n=== term-04 | Paths\n--- teach\nA **path** says where something is. `docs/guides` means "the `guides` folder inside `docs`, inside where I am now" — a **relative** path. `..` means "the folder above", so `../..` is two levels up. `~` is your home folder, and a path starting with `/` is **absolute**: it starts from the very top.\n\nAn option that starts with `-`, like the `-p` below, is a **flag**: it changes how a command behaves. `mkdir -p` makes every folder along a path at once, so you do not need one `mkdir` per level:\n\n```\nmkdir -p src/components/buttons\ncd src/components\ncd ../..\n```\n--- task\nWith one command, make the folders `docs/guides`. Move into `docs/guides`, then come back up to `project` using `..`.\n--- starter\n--- solution\nmkdir -p docs/guides\ncd docs/guides\ncd ../..\n--- hint\n`mkdir -p docs/guides` makes both folders.\n--- hint\nFrom `docs/guides`, two levels up is `cd ../..`.\n--- check shell | docs/guides exists\ndir docs/guides\n--- check shell | You went into it\nran cd docs/guides\n--- check shell | You came back up with ..\nused ..\ncwd .\n\n=== term-05 | Copying and moving\n--- teach\n`cp source destination` **c**o**p**ies a file. `mv source destination` **m**o**v**es it — and because moving a file to a new name in the same folder is renaming, `mv` is also how you rename:\n\n```\ncp report.txt report-backup.txt\nmv report.txt final-report.txt\n```\n\nIf the destination is a folder, the file goes inside it with the same name: `mv notes.txt archive/`. Copying a whole folder needs `cp -r` (**r**ecursive).\n--- task\nThere is a file called `draft.txt`. Copy it to `backup.txt`, then rename `draft.txt` to `final.txt`.\n--- starter\necho "Our first mission plan" > draft.txt\n--- solution\ncp draft.txt backup.txt\nmv draft.txt final.txt\n--- hint\n`cp draft.txt backup.txt` first; then `mv draft.txt final.txt`.\n--- check shell | backup.txt is a copy\nfile backup.txt == Our first mission plan\n--- check shell | draft.txt is now final.txt\nfile final.txt == Our first mission plan\nmissing draft.txt\n\n=== term-06 | Deleting\n--- teach\n`rm file` **r**e**m**oves a file. There is no bin to get it back from, so read the command before you press Enter.\n\nA folder needs `rm -r folder`: `-r` removes it and everything inside it. (`rmdir` only removes a folder that is already empty.)\n\n```\nrm old-notes.txt\nrm -r build\n```\n--- task\nDelete the file `junk.txt` and the whole `old` folder (it has files inside). Leave `keep.txt` alone.\n--- starter\ntouch junk.txt\ntouch keep.txt\nmkdir -p old/logs\necho "stale" > old/logs/app.log\n--- solution\nrm junk.txt\nrm -r old\n--- hint\n`rm junk.txt` for the file, `rm -r old` for the folder.\n--- check shell | junk.txt is gone\nmissing junk.txt\n--- check shell | old/ and everything in it is gone\nmissing old\n--- check shell | keep.txt is still there\nfile keep.txt\n\n=== term-07 | Looking inside files\n--- teach\nReal files can be long, so there are commands that show just part of one:\n\n- `head -n 3 file` — the first 3 lines. `tail -n 3 file` — the last 3.\n- `wc -l file` — **w**ord **c**ount; with `-l`, how many **l**ines.\n- `grep text file` — only the lines that contain `text`. Add `-i` to ignore case, `-n` to show line numbers.\n\n`grep` is how developers dig through logs: `grep ERROR server.log` pulls every error out of thousands of lines.\n--- task\n`launch.log` is the log from a test launch. Count its lines with `wc -l`, then use `grep` to show only the lines containing `ERROR`.\n--- starter\necho "09:00 INFO systems check" > launch.log\necho "09:01 INFO fuel loaded" >> launch.log\necho "09:02 ERROR valve 3 stuck" >> launch.log\necho "09:03 INFO valve 3 reset" >> launch.log\necho "09:04 ERROR telemetry dropout" >> launch.log\necho "09:05 INFO liftoff" >> launch.log\n--- solution\nwc -l launch.log\ngrep ERROR launch.log\n--- hint\n`wc -l launch.log` counts the lines.\n--- hint\n`grep ERROR launch.log` prints only the error lines.\n--- check shell | You counted the lines\nran wc -l\nprinted 6 launch.log\n--- check shell | You found both errors\nran grep\nprinted 09:02 ERROR valve 3 stuck\nprinted 09:04 ERROR telemetry dropout\n\n=== term-08 | Chaining and appending\n--- teach\n`&&` joins two commands: the second runs only if the first worked. It is how you write a sequence on one line:\n\n```\nmkdir build && cd build\n```\n\n`>>` is like `>`, but it **adds** to the end of the file instead of replacing it:\n\n```\necho "first" > list.txt\necho "second" >> list.txt\n```\n--- task\nIn a single line, make a folder `logs` and move into it using `&&`. Then build `todo.txt` with two lines, `buy fuel` then `check engines`, using `>` for the first and `>>` for the second.\n--- starter\n--- solution\nmkdir logs && cd logs\necho "buy fuel" > todo.txt\necho "check engines" >> todo.txt\n--- hint\n`mkdir logs && cd logs` does both steps.\n--- hint\n`echo "buy fuel" > todo.txt`, then `echo "check engines" >> todo.txt`.\n--- check shell | You used && to make and enter logs\nused &&\ndir logs\ncwd logs\n--- check shell | todo.txt has both lines, in order\nfile logs/todo.txt contains buy fuel\nfile logs/todo.txt contains check engines\nused >>\n\n=== term-09 | Hidden files, and the long listing\n--- teach\nA file or folder whose name starts with a dot is **hidden**: plain `ls` skips it. Settings live in files like that — `.env`, `.gitignore`, `.config` — so you need to be able to see them.\n\n- `ls -a` shows **a**ll of them, hidden ones included (plus `.` for this folder and `..` for the one above).\n- `ls -l` is the **l**ong listing: one line per entry, with whether it is a folder (`d`) or a file (`-`), and its size.\n\nFlags combine: `ls -la` is both at once.\n--- task\nSomething in this folder is hidden. Find it with `ls -a`, then look at the sizes with `ls -l`.\n--- starter\necho "API_KEY=demo" > .env\nmkdir src\necho "print(\'hi\')" > main.py\n--- solution\nls -a\nls -l\n--- hint\n`ls -a` shows the hidden file.\n--- hint\n`ls -l` shows one line per file, starting with `-rw-r--r--` for files.\n--- check shell | You found the hidden file\nprinted .env\n--- check shell | You used the long listing\nprinted -rw-r--r--\n\n=== term-10 | Getting home, and back again\n--- teach\nDeep in a project, three shortcuts save a lot of typing:\n\n- `cd ~` (or just `cd`) jumps straight to your **home** folder, wherever you are.\n- `cd -` jumps back to wherever you were **before** the last `cd`.\n- An **absolute** path works from anywhere: `cd /home/you/project`.\n\nRun `pwd` whenever you want to be sure where you have landed.\n--- task\nYou are three folders deep, in `src/app/components`. Jump to your home folder, check with `pwd` that you are there, then come straight back with `cd -`.\n--- starter\nmkdir -p src/app/components\ncd src/app/components\n--- solution\ncd ~\npwd\ncd -\n--- hint\n`cd ~` goes home; `pwd` then prints `/home/you`.\n--- hint\n`cd -` takes you back to `src/app/components` in one step.\n--- check shell | You checked that you were home\nprinted-line /home/you\n--- check shell | You came back with cd -\nran cd -\ncwd src/app/components\n',we=`@track cpp
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
`,Te=`@track git
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
`,Ee=`@track html
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
`,De=`@track javascript
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
`,Oe=`@track python
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
`,ke=`@track sql
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
`,Ae=`@track sql
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
`,je=`@track sql
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
`,Me=`@track sql
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
`,Ne=`@track sql
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
`,Pe=`@track typescript
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
`,Fe=[`bash`,`git`,`html`,`javascript`,`typescript`,`python`,`sql`,`cpp`],Ie=Object.assign({"./tracks/bash.txt":Ce,"./tracks/cpp.txt":we,"./tracks/git.txt":Te,"./tracks/html.txt":Ee,"./tracks/javascript.txt":De,"./tracks/python.txt":Oe,"./tracks/sql.advanced.txt":ke,"./tracks/sql.expert.txt":Ae,"./tracks/sql.intermediate.txt":je,"./tracks/sql.projects.txt":Me,"./tracks/sql.txt":Ne,"./tracks/typescript.txt":Pe}),Le=[`basics`,`intermediate`,`advanced`,`expert`,`projects`];function L(e){let[t=``,n=`basics`]=e.replace(/\.txt$/,``).split(`.`);return[Fe.indexOf(t),Le.indexOf(n)]}var Re=Object.entries(Ie).map(([e,t])=>[e.split(`/`).pop(),t]).filter(([e])=>L(e)[0]>=0).sort((e,t)=>{let[n,r]=L(e[0]),[i,a]=L(t[0]);return n-i||r-a}),ze=Fe.filter(e=>Re.some(([t])=>t.split(`.`)[0]===e)),R=[{id:`ai-product`,title:`AI Product Engineer`,blurb:`The order LAUNCHPAD itself teaches in: the command line and git, JavaScript and TypeScript for the product, the web page it lives in, SQL for its data and Python for its models.`,steps:[`bash`,`git`,`javascript`,`typescript`,`html`,`sql`,`python`]},{id:`software`,title:`Software Engineer`,blurb:`The ground every software job stands on: one language learned properly, the command line and git, SQL, and then C++ to see what the machine is really doing.`,steps:[`python`,`bash`,`git`,`sql`,`cpp`]},{id:`frontend`,title:`Frontend Developer`,blurb:`Pages people use: HTML and CSS first, then the JavaScript that makes them react, TypeScript to keep it correct as it grows, and the tools every team works in.`,steps:[`html`,`javascript`,`typescript`,`bash`,`git`]},{id:`backend`,title:`Backend Developer`,blurb:`The server side: the command line and git it runs on, JavaScript and TypeScript for the code that answers requests, and SQL for the data it keeps.`,steps:[`bash`,`git`,`javascript`,`typescript`,`sql`]},{id:`data`,title:`Data & ML`,blurb:`Python, the language of data work and machine learning, SQL to get the data out of where it lives, and the command line and git to keep the work reproducible.`,steps:[`python`,`sql`,`bash`,`git`]},{id:`systems`,title:`Systems & C++`,blurb:`Close to the machine: the command line and git, Python to learn to think in code, then C++ for programs that are fast and exact about memory.`,steps:[`bash`,`git`,`python`,`cpp`]}];function z(e){return{stdout:e.stdout,stderr:e.stderr,error:e.error,ms:e.ms}}async function Be(e,t,n={}){let{onStatus:r}=n;switch(e.lang){case`bash`:case`git`:return{stdout:``,stderr:``,error:null,...n.shell?{shell:n.shell}:{},ms:0};case`html`:{let n=await x(t,ge(e)),r=n.logs.filter(e=>e.level===`error`).map(e=>e.text);return{stdout:n.logs.filter(e=>e.level!==`error`).map(e=>e.text).join(`
`),stderr:r.join(`
`),error:null,dom:n.results,ms:n.ms}}case`javascript`:return z(await m(t));case`typescript`:{let e=await g(t,{onStatus:r}),n=me(t,e.error);return n?{...z(await g(n.program,{onStatus:r})),typeFails:n.fails}:z(e)}case`python`:{let n=e.stdin?.replace(/\n$/,``).split(`
`);return z(await h.run(t,{onStatus:r,...n?{stdin:n}:{}}))}case`cpp`:return z(await w(t,{stdin:e.stdin??``,onStatus:r}));case`sql`:{let n=await C(t,e.schema);return{stdout:``,stderr:``,error:n.error,tables:n.tables,ms:n.ms}}}}function Ve(e){return e===`git`?`bash`:e}function He(e){e===`python`&&!h.isBooted&&h.preload(),e===`typescript`&&_.preload()}var Ue=[`basics`,`intermediate`,`advanced`,`expert`,`projects`],We=[`javascript`,`typescript`,`python`,`sql`,`cpp`,`html`,`bash`,`git`],Ge=new Set([`teach`,`task`,`starter`,`solution`,`hint`,`stdin`,`schema`,`check`]),Ke=class extends Error{};function B(e,t){throw new Ke(`${e}: ${t}`)}function V(e){let t=0,n=e.length;for(;t<n&&e[t].trim()===``;)t++;for(;n>t&&e[n-1].trim()===``;)n--;return e.slice(t,n).join(`
`)}function H(e){let t=V(e);return t?`${t}\n`:``}function qe(e,t){let n;try{n=JSON.parse(e)}catch{return B(t,`expected rows as JSON, got: ${e.slice(0,60)}`)}return Array.isArray(n)&&n.every(e=>Array.isArray(e)&&e.every(e=>e===null||typeof e==`string`||typeof e==`number`))||B(t,`rows must be an array of arrays of strings, numbers or null`),n}function Je(e,t,n){let r=/^check\s+(\w+)(?:\s+(\w+))?\s*\|\s*(.+)$/.exec(e);r||B(n,`a check needs "--- check <kind> | <name>", got "--- ${e}"`);let[,i,a,o]=r,s=t.filter(e=>e.startsWith(`?? `)).map(e=>e.slice(3).trim()).join(` `)||void 0,c=t.filter(e=>!e.startsWith(`?? `)),l=V(c),u={name:o.trim(),...s?{hint:s}:{}},d=`${n} "${u.name}"`;switch(i){case`output`:return l||B(d,`an output check needs the expected output`),{...u,kind:`output`,expect:l};case`includes`:{let e=V(c).split(`
`).filter(e=>e.trim()!==``);return e.length||B(d,`an includes check needs at least one line`),{...u,kind:`includes`,expect:e}}case`test`:return l||B(d,`a test check needs an expression`),{...u,kind:`test`,expr:l};case`case`:{let e=c.findIndex(e=>e.startsWith(`=> `));e<0&&B(d,`a case needs the call, then a "=> expected" line`);let t=V(c.slice(0,e)).replace(/\s*\n\s*/g,` `),n=c.slice(e).join(`
`).slice(3).trim();return(!t||!n)&&B(d,`a case needs both a call and an expected value`),{...u,kind:`case`,call:t,expect:n}}case`dom`:case`shell`:{let e=V(c).split(`
`).map(e=>e.trim()).filter(Boolean);return e.length||B(d,`a ${i} check needs at least one line`),i===`dom`?{...u,kind:`dom`,steps:e}:{...u,kind:`shell`,facts:e}}case`source`:a&&a!==`absent`&&B(d,`unknown source flag "${a}"`),l||B(d,`a source check needs a pattern`);try{new RegExp(l)}catch{B(d,`not a valid pattern: ${l}`)}return{...u,kind:`source`,pattern:l,absent:a===`absent`};case`result`:{let e=V(c).split(`
`),t=e[0]?.trim()===`ordered`,n=(t?e.slice(1):e).join(`
`).trim();return{...u,kind:`result`,rows:qe(n,d),ordered:t}}case`type-error`:return l||B(d,`a type-error check needs the code that must not type-check`),{...u,kind:`type-error`,code:l};case`query`:{let e=c.findIndex(e=>e.startsWith(`=> `));e<0&&B(d,`a query check needs a "=> [[...]]" line with the expected rows`);let t=V(c.slice(0,e));return t||B(d,`a query check needs a query`),{...u,kind:`query`,sql:t,rows:qe(c.slice(e).join(`
`).slice(3).trim(),d)}}default:return B(d,`unknown check kind "${i}"`)}}function Ye(e,t=`track`){let n=e.replace(/\r\n?/g,`
`).split(`
`),r={},i=[],a=0,o;for(;a<n.length&&!n[a].startsWith(`=== `);a++){if(n[a].trim()===`@schema`){let e=++a;for(;a<n.length&&n[a].trim()!==`@end`;)a++;a>=n.length&&B(t,`"@schema" without a closing "@end"`),o=V(n.slice(e,a));continue}let e=/^@(\w+)\s+(.*)$/.exec(n[a]);e&&(r[e[1]]=e[2].trim())}let s=r.track;for(We.includes(s)||B(t,`"@track" must be one of ${We.join(`, `)}`),r.title||B(t,`missing "@title"`);a<n.length;){let e=/^=== (\S+)\s*\|\s*(.+)$/.exec(n[a]);e||B(t,`expected "=== <id> | <title>" at line ${a+1}`);let r=e[1],c=`${t} ${r}`;a++;let l=[];for(;a<n.length&&!n[a].startsWith(`=== `);a++){let e=n[a],t=/^--- (.+)$/.exec(e),r=t?.[1].split(/\s/)[0];t&&r&&Ge.has(r)?l.push({header:t[1].trim(),body:[]}):l.length?l[l.length-1].body.push(e):e.trim()&&B(c,`text before the first "--- " section: ${e.slice(0,40)}`)}let u=e=>{let t=l.filter(t=>t.header===e);return t.length>1&&B(c,`more than one "--- ${e}"`),t[0]?.body},d=u(`teach`),f=u(`task`),p=u(`starter`),m=u(`solution`);(!d||!f||!m)&&B(c,`needs teach, task and solution`);let h=l.filter(e=>e.header.startsWith(`check`)).map(e=>Je(e.header,e.body,c));h.length||B(c,`needs at least one check`);let g=u(`stdin`),_=u(`schema`),v=_?V(_):o;i.push({id:r,lang:s,title:e[2].trim(),teach:V(d),task:V(f),starter:p?H(p):``,solution:H(m),hints:l.filter(e=>e.header===`hint`).map(e=>V(e.body)),checks:h,...g?{stdin:H(g)}:{},...v?{schema:v}:{}})}let c=new Set;for(let e of i)c.has(e.id)&&B(t,`duplicate lesson id ${e.id}`),c.add(e.id);i.length||B(t,`no lessons`);let l=r.level??`basics`;Ue.includes(l)||B(t,`"@level" must be one of ${Ue.join(`, `)}`);let u=r.course??(l===`basics`?s:`${s}-${l}`);return i.some(e=>e.checks.some(e=>e.kind===`type-error`))&&s!==`typescript`&&B(t,`type-error checks are for TypeScript tracks`),{id:u,lang:s,level:l,title:r.title,name:r.name??r.title,blurb:r.blurb??``,lessons:i}}var U=Re.map(([e,t])=>Ye(t,e)),Xe=new Map;for(let e of U)e.lessons.forEach((t,n)=>Xe.set(t.id,{track:e,lesson:t,index:n}));function Ze(e){return U.find(t=>t.id===e)??U.find(t=>t.lang===e)}function W(e){return U.filter(t=>t.lang===e)}function Qe(e,t){let n=W(e);return n.find(e=>K(e,t)<e.lessons.length)??n[n.length-1]}function $e(e){return Xe.get(e)}function G(e,t){return e.lessons.find(e=>!t[e.id])??e.lessons[e.lessons.length-1]}function K(e,t){return e.lessons.filter(e=>t[e.id]).length}function et(e,t=new Date){let n=e=>`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`,r=new Set(Object.values(e).map(e=>n(new Date(e)))),i=new Date(t);r.has(n(i))||i.setDate(i.getDate()-1);let a=0;for(;r.has(n(i));)a++,i.setDate(i.getDate()-1);return a}var tt={bash:`The command line`,git:`Git`,html:`HTML & CSS`,javascript:`JavaScript`,typescript:`TypeScript`,python:`Python`,sql:`SQL`,cpp:`C++`};function q(e){return tt[e]??e}var J=[...new Set(U.map(e=>e.lang))].filter(e=>W(e).length>1).map(e=>({id:`master-${e}`,title:q(e),blurb:`${q(e)} from the first line to expert: the basics, then the idioms, the design and debugging skills and the problem solving that let you build anything in it on your own, then real projects.`,steps:W(e).map(e=>e.id)})),Y={basics:`Basics`,intermediate:`Intermediate`,advanced:`Advanced`,expert:`Expert`,projects:`Projects`},X=t();function nt({lessonId:e}){if(!e)return(0,X.jsx)(Q,{});let t=e.startsWith(`roadmap-`)?rt.find(t=>`roadmap-${t.id}`===e):void 0;if(t)return(0,X.jsx)(ot,{roadmap:t});let n=Ze(e);if(n)return(0,X.jsx)(st,{track:n});let r=$e(e);return r?(0,X.jsx)(ct,{track:r.track,lesson:r.lesson,index:r.index},r.lesson.id):(0,X.jsx)(Q,{missing:e})}function Z(){let{state:e}=o(),t=et(e.learn);return t?(0,X.jsxs)(`span`,{className:`lm-streak`,title:`Days in a row with a lesson passed`,children:[(0,X.jsx)(r,{size:14}),t,`-day streak`]}):null}var rt=[...R,...J];function Q({missing:e}){let{state:t}=o(),n=d(),r=rt.find(e=>e.id===n.query.goal)??R[0],i=(e,t=e.title)=>(0,X.jsxs)(`button`,{type:`button`,role:`tab`,"aria-selected":e.id===r.id,"data-active":e.id===r.id,className:`rm-goals__pill`,onClick:()=>f(`/learn?goal=${e.id}`,{replace:!0}),children:[e.id.startsWith(`master-`)?(0,X.jsx)(T,{lang:e.id.slice(7),size:16}):null,t]},e.id);return(0,X.jsxs)(`div`,{className:`page page--padtop ide-wrap lm-home`,children:[(0,X.jsxs)(`header`,{className:`rm-hero`,children:[(0,X.jsxs)(`div`,{className:`page-head__kicker`,children:[`Learn to code `,(0,X.jsx)(Z,{})]}),(0,X.jsx)(`h1`,{className:`rm-hero__title`,children:`Choose where you want to end up. Each roadmap lines up the courses that get you there, one step at a time.`})]}),e?(0,X.jsxs)(`p`,{className:`lm-missing`,children:[`There is no lesson called “`,e,`”. Pick a course below.`]}):null,(0,X.jsxs)(`div`,{className:`rm-goals`,role:`tablist`,"aria-label":`Roadmap`,children:[(0,X.jsx)(`span`,{className:`rm-goals__label`,children:`Reach a goal`}),(0,X.jsx)(`div`,{className:`rm-goals__row`,children:R.map(e=>i(e))}),J.length?(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`span`,{className:`rm-goals__label`,children:`Or master one language, beginner to expert`}),(0,X.jsx)(`div`,{className:`rm-goals__row`,children:J.map(e=>i(e))})]}):null]}),(0,X.jsxs)(`section`,{className:`rm`,children:[(0,X.jsxs)(`header`,{className:`rm__head`,children:[(0,X.jsx)(`span`,{className:`rm__goal`,children:r.title}),(0,X.jsx)(`button`,{type:`button`,className:`rm__see`,onClick:()=>f(`/learn/roadmap-${r.id}`),children:`View every step`})]}),(0,X.jsx)(at,{roadmap:r,passed:t.learn})]}),(0,X.jsx)(`h2`,{className:`lm-h2`,children:`Browse every course`}),ze.map(e=>(0,X.jsxs)(`section`,{className:`lm-lang`,"aria-label":q(e),children:[(0,X.jsxs)(`h3`,{className:`lm-lang__name`,children:[(0,X.jsx)(T,{lang:e,size:20}),q(e),(0,X.jsxs)(`span`,{className:`lm-lang__count`,children:[W(e).length,` course`,W(e).length===1?``:`s`,` · `,W(e).reduce((e,t)=>e+t.lessons.length,0),` lessons`]})]}),(0,X.jsx)(`div`,{className:`lm-courses`,children:W(e).map(e=>{let n=K(e,t.learn);return(0,X.jsxs)(`a`,{className:`lm-course`,href:`#/learn/${e.id}`,children:[(0,X.jsx)(`span`,{className:`lm-course__icon`,children:(0,X.jsx)(T,{lang:e.lang,size:30})}),(0,X.jsxs)(`span`,{className:`lm-course__text`,children:[(0,X.jsx)(`span`,{className:`lm-course__level`,"data-level":e.level,children:Y[e.level]}),(0,X.jsx)(`span`,{className:`lm-course__title`,children:e.name}),(0,X.jsx)(`span`,{className:`lm-course__meta`,children:n===e.lessons.length?`Complete`:`${n} of ${e.lessons.length} lessons`}),(0,X.jsx)(c,{value:n/e.lessons.length,height:4})]})]},e.id)})})]},e)),(0,X.jsx)(`p`,{className:`track-note`,children:`Learn to code is practice, and it counts for nothing else: passing a lesson does not change your modules, your readiness or your review queue.`})]})}function it(e){let[t,n]=(0,O.useState)(3);return(0,O.useLayoutEffect)(()=>{let t=e.current;if(!t)return;let r=()=>{let e=t.clientWidth;n(e>=900?5:e>=620?4:3)};r();let i=new ResizeObserver(r);return i.observe(t),()=>i.disconnect()},[e]),t}function $(e,t){let n=e.steps.map(e=>Ze(e)).filter(e=>!!e),r=n.map(e=>K(e,t)===e.lessons.length),i=r.indexOf(!1);return{tracks:n,done:r,current:i,allDone:i<0}}function at({roadmap:e,passed:t}){let{tracks:n,done:r,current:i,allDone:a}=$(e,t),o=(0,O.useRef)(null),s=it(o),c=n.length+1,l=e=>{let t=Math.floor(e/s),n=e%s;return{row:t,col:t%2?s-1-n:n}},u=e=>{if(e>=c-1)return;let t=l(e),n=l(e+1);return n.row===t.row?n.col>t.col?`right`:`left`:t.col===s-1?`turn-right`:`turn-left`};return(0,X.jsxs)(`div`,{className:`rm__path`,ref:o,style:{gridTemplateColumns:`repeat(${s}, minmax(0, 1fr))`},children:[n.map((e,n)=>{let a=K(e,t),o=r[n]||n===i,{row:s,col:c}=l(n);return(0,X.jsxs)(`div`,{className:`rm-step`,style:{gridRow:s+1,gridColumn:c+1},children:[(0,X.jsxs)(`a`,{href:`#/learn/${e.lang}`,className:`rm-tile`,"data-lit":o,"data-state":r[n]?`done`:n===i?`current`:`todo`,"aria-label":`Step ${n+1}: ${e.name}, ${a} of ${e.lessons.length} lessons passed`,title:`${e.name} · ${a}/${e.lessons.length} lessons`,children:[(0,X.jsx)(T,{lang:e.lang,size:34}),(0,X.jsx)(`span`,{className:`rm-tile__n`,"aria-hidden":`true`,children:n+1})]}),(0,X.jsx)(`span`,{className:`rm-step__label`,children:e.name}),u(n)?(0,X.jsx)(`span`,{className:`rm-link`,"data-dir":u(n),"data-lit":r[n],"aria-hidden":`true`}):null]},e.lang)}),(()=>{let{row:t,col:r}=l(n.length);return(0,X.jsxs)(`div`,{className:`rm-step`,style:{gridRow:t+1,gridColumn:r+1},children:[(0,X.jsx)(`span`,{className:`rm-tile rm-tile--end`,"data-lit":a,role:`img`,"aria-label":a?`${e.title}: every course complete`:`Finish line: complete every course on the ${e.title} roadmap`,children:(0,X.jsx)(S,{size:32})}),a?(0,X.jsx)(`span`,{className:`rm-step__label`,children:`Goal reached`}):null]})})()]})}function ot({roadmap:e}){let{state:t}=o(),{tracks:n,done:r,current:a,allDone:s}=$(e,t.learn),u=r.filter(Boolean).length,d=e=>f(`/learn/${G(e,t.learn).id}`);return(0,X.jsxs)(`div`,{className:`page page--padtop ide-wrap`,children:[(0,X.jsxs)(`a`,{className:`lm-back`,href:`#/learn?goal=${e.id}`,children:[(0,X.jsx)(i,{size:13}),`Roadmaps`]}),(0,X.jsxs)(`div`,{className:`rmv-head`,children:[(0,X.jsxs)(`div`,{className:`page-head__kicker`,children:[`Roadmap · `,n.length,` courses `,(0,X.jsx)(Z,{})]}),(0,X.jsx)(`h1`,{className:`h-page`,children:e.title}),(0,X.jsx)(`p`,{className:`page-head__sub`,children:e.blurb}),(0,X.jsxs)(`div`,{className:`lm-course-go`,children:[(0,X.jsx)(c,{value:u/n.length,height:6}),(0,X.jsxs)(`span`,{className:`lm-course-go__n`,children:[u,`/`,n.length]}),(0,X.jsxs)(`button`,{type:`button`,className:`ide-run`,onClick:()=>d(n[s?0:a]),children:[s?`Review`:u===0&&K(n[0],t.learn)===0?`Start step 1`:`Continue step ${a+1}`,(0,X.jsx)(l,{size:13})]})]})]}),(0,X.jsxs)(`ol`,{className:`rmv`,children:[n.map((e,n)=>{let i=K(e,t.learn);return(0,X.jsxs)(`li`,{className:`rmv-step`,"data-state":r[n]?`done`:n===a?`current`:`todo`,children:[(0,X.jsxs)(`span`,{className:`rm-tile rmv-step__tile`,"data-lit":r[n]||n===a,children:[(0,X.jsx)(T,{lang:e.lang,size:30}),(0,X.jsx)(`span`,{className:`rm-tile__n`,"aria-hidden":`true`,children:n+1})]}),(0,X.jsxs)(`div`,{className:`rmv-step__body`,children:[(0,X.jsx)(`a`,{className:`rmv-step__name`,href:`#/learn/${e.lang}`,children:e.name}),(0,X.jsx)(`p`,{className:`rmv-step__blurb`,children:e.blurb}),(0,X.jsxs)(`div`,{className:`rmv-step__row`,children:[(0,X.jsx)(c,{value:i/e.lessons.length,height:4}),(0,X.jsxs)(`span`,{className:`rmv-step__n`,children:[i,`/`,e.lessons.length,` lessons`]}),(0,X.jsxs)(`button`,{type:`button`,className:`rmv-step__go`,onClick:()=>d(e),children:[i===0?`Start`:i===e.lessons.length?`Review`:`Continue`,(0,X.jsx)(l,{size:12})]})]})]})]},e.lang)}),(0,X.jsxs)(`li`,{className:`rmv-step`,"data-state":s?`done`:`todo`,children:[(0,X.jsx)(`span`,{className:`rm-tile rm-tile--end rmv-step__tile`,"data-lit":s,children:(0,X.jsx)(S,{size:28})}),(0,X.jsxs)(`div`,{className:`rmv-step__body`,children:[(0,X.jsx)(`span`,{className:`rmv-step__name`,children:s?`Goal reached`:`Finish line`}),(0,X.jsx)(`p`,{className:`rmv-step__blurb`,children:s?`Every course on the ${e.title} roadmap, complete. The basics are yours; more lessons past them will follow.`:`Complete every course above to reach it.`})]})]})]})]})}function st({track:e}){let{state:t}=o(),r=K(e,t.learn),a=e.lessons.length,s=G(e,t.learn);return(0,X.jsxs)(`div`,{className:`page page--padtop ide-wrap`,children:[(0,X.jsxs)(`a`,{className:`lm-back`,href:`#/learn`,children:[(0,X.jsx)(i,{size:13}),`Roadmaps`]}),(0,X.jsxs)(`div`,{className:`lm-course-head`,children:[(0,X.jsx)(`span`,{className:`rm-tile`,style:{"--tile":`72px`},children:(0,X.jsx)(T,{lang:e.lang,size:40})}),(0,X.jsxs)(`div`,{style:{minWidth:0},className:`grow`,children:[(0,X.jsxs)(`div`,{className:`page-head__kicker`,children:[Y[e.level],` · `,a,` lessons `,(0,X.jsx)(Z,{})]}),(0,X.jsx)(`h1`,{className:`h-page`,children:e.name}),(0,X.jsx)(`p`,{className:`page-head__sub`,children:e.blurb})]})]}),W(e.lang).length>1?(0,X.jsx)(`nav`,{className:`lm-ladder`,"aria-label":`${q(e.lang)} courses`,children:W(e.lang).map((n,r)=>(0,X.jsxs)(`a`,{href:`#/learn/${n.id}`,className:`lm-ladder__step`,"data-here":n.id===e.id,"data-done":K(n,t.learn)===n.lessons.length,children:[(0,X.jsx)(`span`,{className:`lm-ladder__n`,children:r+1}),Y[n.level]]},n.id))}):null,(0,X.jsxs)(`div`,{className:`lm-course-go`,children:[(0,X.jsx)(c,{value:r/a,height:6}),(0,X.jsxs)(`span`,{className:`lm-course-go__n`,children:[r,`/`,a]}),(0,X.jsxs)(`button`,{type:`button`,className:`ide-run`,onClick:()=>f(`/learn/${s.id}`),children:[r===0?`Start course`:r===a?`Review`:`Continue`,(0,X.jsx)(l,{size:13})]})]}),(0,X.jsx)(`ol`,{className:`lm-outline`,children:e.lessons.map((e,i)=>{let o=!!t.learn[e.id],c=e.id===s.id&&r<a;return(0,X.jsx)(`li`,{"data-done":o,"data-next":c,children:(0,X.jsxs)(`a`,{href:`#/learn/${e.id}`,children:[(0,X.jsx)(`span`,{className:`lm-outline__n`,"aria-hidden":`true`,children:o?(0,X.jsx)(n,{size:13}):i+1}),(0,X.jsx)(`span`,{className:`lm-outline__title`,children:e.title}),o?(0,X.jsx)(`span`,{className:`lm-outline__tag`,children:`Passed`}):c?(0,X.jsx)(`span`,{className:`lm-outline__tag lm-outline__tag--next`,children:`Next`}):null]})},e.id)})})]})}function ct({track:e,lesson:t,index:r}){let{state:a,setState:c}=o(),d=t.lang===`bash`||t.lang===`git`,[m,h]=(0,O.useState)(!1),[g,_]=(0,O.useState)(0),[v,y]=(0,O.useState)(!1),b=(0,O.useRef)(null),ee=ae(`learn:${t.id}:example`,t.teach,t.schema),te=!!a.learn[t.id],x=e.lessons[r-1],S=e.lessons[r+1],C=W(e.lang),w=S?void 0:C[C.findIndex(t=>t.id===e.id)+1];(0,O.useEffect)(()=>He(t.lang),[t.lang]);let E=(0,O.useCallback)(()=>{c(e=>u(e,t.id)),h(!0),requestAnimationFrame(()=>b.current?.scrollIntoView({block:`nearest`,behavior:`smooth`}))},[t.id,c]),ne=(0,O.useCallback)(async(e,n,r)=>{let i=Se(t,e,await Be(t,he(t,e),{onStatus:r}));return{run:{stdout:i.output,stderr:i.stderr,error:i.error,plots:[],result:null,tables:i.tables,ms:i.ms},tests:i.results}},[t]);return(0,X.jsxs)(`div`,{className:`page page--padtop ide-wrap`,children:[(0,X.jsxs)(`div`,{className:`lm-top`,children:[(0,X.jsxs)(`a`,{className:`lm-back`,href:`#/learn/${e.id}`,children:[(0,X.jsx)(i,{size:13}),e.title]}),(0,X.jsx)(`div`,{className:`lm-dots`,"aria-label":`Lesson ${r+1} of ${e.lessons.length}`,children:e.lessons.map((e,t)=>(0,X.jsx)(`a`,{href:`#/learn/${e.id}`,className:`lm-dots__dot`,"data-done":!!a.learn[e.id],"data-here":t===r,title:`${t+1}. ${e.title}`,"aria-label":`Lesson ${t+1}: ${e.title}${a.learn[e.id]?` (passed)`:``}`},e.id))}),(0,X.jsx)(Z,{})]}),(0,X.jsxs)(`article`,{className:`lm-flow`,children:[(0,X.jsxs)(`div`,{className:`lm-text__kicker`,children:[(0,X.jsx)(T,{lang:e.lang,size:18}),`Lesson `,r+1,` of `,e.lessons.length,te?(0,X.jsx)(`span`,{className:`lm-passed-tag`,children:`Passed`}):null]}),(0,X.jsx)(`h1`,{className:`lm-text__title`,children:t.title}),(0,X.jsx)(`div`,{className:`lm-teach`,children:(0,X.jsx)(p,{renderCode:ee,children:t.teach})}),(0,X.jsxs)(`section`,{className:`lm-challenge`,children:[(0,X.jsx)(`div`,{className:`lm-challenge__label`,children:`Your turn`}),(0,X.jsx)(p,{children:t.task}),t.stdin?(0,X.jsxs)(`div`,{className:`lm-stdin`,children:[(0,X.jsx)(`div`,{className:`lm-stdin__label`,children:`Input the program reads`}),(0,X.jsx)(`pre`,{children:t.stdin})]}):null,d?(0,X.jsx)(`p`,{className:`lm-challenge__how`,children:`Type the commands into the terminal below, then press Check.`}):null]}),(0,X.jsx)(`div`,{className:`lm-work`,children:d?(0,X.jsx)(lt,{lesson:t,onPass:E}):(0,X.jsx)(re,{lang:Ve(t.lang),code:t.starter,saveKey:`learn:${t.id}`,grade:ne,onPass:E,runLabel:`Run Code`,input:!1,minHeight:260,testsHint:`Press Run Code to run your code against the tests.`,eager:!0})}),(0,X.jsx)(`div`,{ref:b,children:m?(0,X.jsxs)(`div`,{className:`lm-win`,children:[(0,X.jsx)(n,{size:16}),(0,X.jsx)(`span`,{className:`grow`,children:S?`Lesson passed. Next: ${S.title}`:w?`That is the whole ${e.name} course. Next: ${w.name}.`:`Lesson passed — that is the whole ${e.name} course.`}),(0,X.jsxs)(`button`,{type:`button`,className:`ide-run`,onClick:()=>f(S?`/learn/${S.id}`:w?`/learn/${w.lessons[0].id}`:`/learn/${e.id}`),children:[S?`Continue`:w?`Start the next course`:`Back to the course`,(0,X.jsx)(l,{size:13})]})]}):null}),(0,X.jsxs)(`div`,{className:`lm-help`,children:[t.hints.slice(0,g).map((e,t)=>(0,X.jsxs)(`div`,{className:`lm-hint`,children:[(0,X.jsxs)(`span`,{className:`lm-hint__n`,children:[`Hint `,t+1]}),(0,X.jsx)(p,{children:e})]},t)),(0,X.jsxs)(`div`,{className:`lm-help__row`,children:[g<t.hints.length?(0,X.jsx)(`button`,{type:`button`,className:`lm-link`,onClick:()=>_(e=>e+1),children:g===0?`Show a hint`:`Another hint`}):null,(0,X.jsx)(`button`,{type:`button`,className:`lm-link`,onClick:()=>y(e=>!e),children:v?`Hide the solution`:`Show the solution`})]}),v?(0,X.jsxs)(`div`,{className:`lm-solution`,children:[(0,X.jsx)(`p`,{children:`One way to do it. Try typing it yourself rather than copying — that is where it sticks.`}),(0,X.jsx)(p,{children:"```"+ut(t.lang)+`
`+t.solution+"```"})]}):null]}),(0,X.jsxs)(`div`,{className:`lm-nav`,children:[x?(0,X.jsxs)(s,{variant:`ghost`,size:`sm`,onClick:()=>f(`/learn/${x.id}`),children:[(0,X.jsx)(i,{size:13}),x.title]}):(0,X.jsx)(`span`,{}),S?(0,X.jsxs)(s,{variant:`ghost`,size:`sm`,onClick:()=>f(`/learn/${S.id}`),children:[S.title,(0,X.jsx)(l,{size:13})]}):null]})]})]})}function lt({lesson:e,onPass:t}){let[n,r]=(0,O.useState)(()=>be(e)),[i,o]=(0,O.useState)(0),[s,c]=(0,O.useState)(null),[l,u]=(0,O.useState)(!1),d=async()=>{u(!0),c(null);try{let r=Se(e,``,await Be(e,``,{shell:n}));c(r),r.passed&&t()}finally{u(!1)}};return(0,X.jsx)(`div`,{className:`embed`,children:(0,X.jsxs)(ee,{lang:`bash`,file:`~/project`,right:(0,X.jsxs)(`button`,{type:`button`,className:`ide__tool`,onClick:()=>{r(be(e)),o(e=>e+1),c(null)},title:`Start this lesson over`,children:[(0,X.jsx)(a,{size:13}),`Reset`]}),children:[(0,X.jsx)(ne,{shell:n,onShell:r,height:300,banner:`Practice terminal for this lesson. Type help to see the commands.`},i),(0,X.jsx)(`div`,{className:`lm-termbar`,children:(0,X.jsx)(te,{onClick:()=>void d(),running:l,label:`Check`})}),(0,X.jsx)(ie,{tabs:[{id:`tests`,label:`Test cases`,...s?{mark:s.passed?`pass`:`fail`}:{}}],active:`tests`,onTab:()=>{},children:(0,X.jsx)(E,{results:s?.results??null,empty:`Do the challenge in the terminal, then press Check.`})})]})})}function ut(e){return e===`javascript`?`js`:e===`typescript`?`ts`:e}function dt(e){let{state:t}=o();return(0,O.useMemo)(()=>{let n=Qe(e,t.learn);return n?{lesson:G(n,t.learn),done:K(n,t.learn),total:n.lessons.length}:null},[e,t.learn])}export{nt as Learn,dt as useNextLesson};