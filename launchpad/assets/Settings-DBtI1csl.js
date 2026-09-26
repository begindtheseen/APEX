import{r as e,t}from"./react-D6Jy4RLT.js";import{$ as n,E as r,F as i,R as a,Y as o,a as s,at as c,g as l,i as u,it as d,nt as f,r as p,s as m,st as h}from"./ui-HLvg0yNZ.js";import{S as g}from"./curriculum-rLod3J6P.js";import{B as _,K as v,c as y,d as b,i as x,r as S,s as C}from"./engine-BgS-zwBg.js";import{t as w}from"./markdown-DsbVK3rR.js";/* empty css              */import{i as T,t as E}from"./format-BVobAEuJ.js";var D=e(),O=`# Changelog

What changed in each version of LAUNCHPAD. The newest version is first; the app shows the entry for
the version it is running under Settings → What's new.

## 1.2.2

**Focus blocks keep you on the lesson.** While a block is running, the app will not take you
anywhere else: a sidebar link, the search box, the back button or a typed address puts you back on
the lesson, and the strip at the bottom says why and how to leave. Moving between the lessons of
the same module is fine. To go somewhere else, pause the block or end it.

- **Pause** becomes available once five minutes of the block have run, and again five minutes
  after each resume; until then the button shows how long is left. While paused you can go
  anywhere, and **Resume** takes you straight back to the lesson.
- **I'm done** ends the block at any moment, and every minute it ran still counts.

## 1.2.1

**Read aloud no longer freezes on iPhone.** It would play for a while, then stop at random, and
was harder to start each time. Each voice worker takes about 450 MB of memory to start and more
with every longer sentence, never giving it back; the iPhone ran two, ran out of memory, and lost a
worker mid-lesson — and nothing noticed, so the reading waited on it forever, and every restart
queued behind it.

- An iPhone or iPad now runs one voice worker, and gives it shorter pieces (long sentences are
  cut at a comma or semicolon, where a reader pauses anyway), so its memory stays small. The
  worker is let go after 45 seconds of quiet, giving the memory back.
- A worker that fails, stops answering, or is taken by the system is replaced by a fresh one, and
  the sentence it was making is made again. If none can start, the reader says so instead of
  hanging.
- When iOS stops the page's audio (a call, Siri, another app, the screen locking), the reader
  starts it again, or shows Paused so one tap on Resume carries on. Play always starts with fresh
  audio.

**Read aloud reads fluently.** The natural voice paused after almost every comma, semicolon,
colon and dash, as if it could only say a few words at a time. It was cutting sentences into
pieces there to start sooner, and every piece came with half a second of silence at each end —
and on a phone, a wait for the next piece to be made.

- Sentences are now read whole — only a very long one is cut, at a clause — and the voice pauses
  where a reader would: a breath between sentences, a longer one between paragraphs.
- The silence the voice model puts around every clip is trimmed, and each sentence is queued on the
  audio clock to start exactly when the last one ends.
- Where a computer has a GPU (WebGPU: Safari on Mac, Chrome and Edge), the voice runs there,
  many times faster than it speaks. It times itself on a sentence as it starts, and a
  device where the GPU is not faster uses its processor instead, and remembers.
- Before the first word it waits just long enough, if it needs to, that the reading will not have
  to stop and wait later; what it reads is kept on the device, so hearing a lesson again is instant.

## 1.2.0

**More paths in Learn to code, a course on building AI from scratch, and a read-aloud voice that sounds like a person.**

- **Five new goals**, each going as deep as the job needs, not just the basics:
  - **Web Developer** — whole sites and web apps, front to back: HTML, CSS and JavaScript all the
    way to accessible, fast pages, TypeScript, SQL, and three real sites built at the end.
  - **AI Research Engineer** — for the people who build and improve the models themselves: Python
    to expert, then the new AI course, then C++ for the code that has to be fast.
  - **Data Engineer** — SQL from the first SELECT to query plans and schemas that hold up, Python to
    move and clean data, and the command line to run it.
  - **DevOps & Platform Engineer** — the command line to real scripts, git from the first commit to
    rebase and bisect, and Python for the tools you write for everyone else.
  - **Game & Performance Engineer** — C++ from the basics to move semantics, templates, containers
    built from raw memory and undefined behaviour, then three real programs.
- **AI from scratch** (16 lessons), a specialty course after the Python ladder: vectors and
  gradients, regression, an autograd engine like the one inside PyTorch, neural networks and the
  loop that trains them, softmax and the log-sum-exp trick, tokenizers and byte-pair encoding, a
  bigram language model, attention and a transformer block, and how to tell a model that learns
  from one that memorises — every piece built by you in plain Python, so nothing is magic, and
  debugged the way ML engineers debug: gradient checks, exploding losses, leaky validation sets.
  It ends with a capstone: train your own tiny language model to a target loss.
- **Read aloud sounds like a person now.** Lessons are read by a natural neural voice (Kokoro)
  instead of the browser's built-in synthesiser, which on many devices still sounds like a
  robot. It runs on your device, the same voice everywhere: six voices to choose from, American
  and British. The first time, it downloads once (about 92 MB, with progress shown) and then works
  offline; the device's own voices stay in the picker for anyone who prefers them, and are used
  automatically if the natural voice cannot load.
- **C++ works on iPhone and iPad.** An iPhone or iPad cannot run the 105 MB C++ compiler inside a
  browser, so C++ never compiled there. Now it is compiled and run on Compiler Explorer
  (godbolt.org) instead — the code is sent there, and the playground and the output say so.
  Everywhere else C++ still compiles in the tab, and uses the same service only if the in-tab
  compiler cannot start.

## 1.1.0

**Learn to code** — roadmaps of guided lessons, connected to the playground — and a playground
rebuilt around four modes, where every language really runs.

- **The playground comes to the lesson.** Every coding module's lessons end with **Try it here**:
  the playground, embedded under the text, in the languages that module works in (JavaScript and
  TypeScript for the runtime modules, SQL for Postgres, Python from M24, the terminal for M1 and
  git), and the Build step works on the artifact in the same window — the code is kept with the
  module, and one click takes it to the full playground. In Learn to code, a lesson is one flow: the
  explanation, its examples runnable where they stand (a console-style example shows each line's
  value), then your turn, coded right there, and on to the next lesson. The playground is still its
  own page for anything else.
- **The playground has four modes: Code, SQL, Web and Terminal.** Code writes Python, JavaScript,
  TypeScript or C++ (pick it from the file pill); SQL runs on a seeded database and shows its rows as
  a table; Web renders HTML, CSS and JavaScript in a live preview with its console; Terminal is a
  practice shell. One IDE window for all of them: a floating Run Code button, and a panel below
  with Test cases, Console, Input, Results or Preview.
- **Learn to code.** It opens on roadmaps: pick a goal — AI Product Engineer, Software Engineer,
  Frontend, Backend, Data & ML, Systems & C++ — and its courses are laid out in the order a mentor
  would teach them, as a numbered path of course tiles ending at a certificate, lit up as you go.
  View every step walks a goal course by course. Your code, progress and a daily streak are saved
  on this device. It is practice: it does not change claims, readiness or reviews.
- **From your first line to expert, in every language the playground runs.** 36 courses, 499
  lessons: Linux and the command line, Git, HTML and CSS, JavaScript, TypeScript, Python, SQL and
  C++, each from the basics through intermediate, advanced and expert (the terminal and git to
  advanced), and then a projects course. Past the basics every course mixes four kinds of lesson:
  new ideas, **debugging** real broken code from a bug report (reproduce, read the error, narrow it
  down, fix the cause), **problem solving** (design the algorithm yourself, with a big input only an
  efficient answer finishes in time) and **design** (refactor working code into a better shape, or
  shape an API to a spec). Projects courses build real programs step by step — a to-do store with
  undo, an adventure engine, a typed router, a matrix library, an analytics database — and end in
  capstones: a
  specification, an empty file, and tests that only check what your program does, so the design is
  yours. Each language also has a **mastery roadmap** that walks its whole ladder, and each course
  offers the next when you finish. Every lesson is checked in the real runtimes before it ships:
  its starter needs work, and its solution passes.
- **Every lesson happens in the same window.** A short explanation with examples you can run where
  they stand, then the challenge in the IDE below it; Run Code really runs your code and shows every
  check as a test case — the input, what was expected, and what your code produced. TypeScript
  lessons can also check that a type rejects what it should. Hints come one at a time, the solution
  when you ask.
- **A practice terminal.** A small real shell that lives in the page: quoting, variables,
  \`$(…)\`, wildcards, pipes, redirection (standard error too), \`for\`, \`while\` and \`if\`, scripts you
  save and run, and \`grep\`, \`sort\`, \`uniq\`, \`cut\`, \`find\`, \`sed\`, \`xargs\` and the rest. Its git
  merges line by line and writes real conflict markers for you to resolve, and has stash, reset,
  revert, rebase, cherry-pick, tags, bisect, blame and a pretend remote that rejects a push the way
  a real one does. It says plainly that it is a simulation; M1's real terminal work still happens on
  your own machine.
- **C++ compiles and runs in your browser.** Real clang++ (C++20, warnings on), compiled to
  WebAssembly and running in the tab: containers, algorithms, strings, streams, smart pointers. The
  Input tab is the program's standard input; compile errors show clang's own message; a crash or a
  loop that never ends is reported and stopped. One limit, stated in the playground: this toolchain
  has no exception support, so \`throw\` and \`try\` do not compile. The compiler is a one-time download
  of about 105 MB before compression, which the browser keeps.
- **TypeScript, type-checked for real.** The real compiler in strict mode checks your code first, and
  a type error stops the run the way \`tsc --noEmit\` stops CI. Clean code runs as JavaScript.
- **MATLAB, Simulink and Rust are gone** from the playground: none of them could run outside ORBIT's
  desktop app.
- **The editor highlights every mode's language**, in a charcoal theme built for reading code.

## 1.0.0

LAUNCHPAD now runs on the ORBIT learning platform: the same dashboard, module pages, lesson reader,
spaced-repetition recall, focus blocks, progress charts and code playground, with LAUNCHPAD's
curriculum inside it, unchanged.

- **Every module is whole.** The note to read first, the timing notes, the Words, what you have to
  hold in your head, the pitfalls, the mechanism figure, the artifact, the checkpoints, the gate and
  its referee — all of it, from the curriculum file.
- **Lessons.** Each module's prose from the curriculum document is its lessons, verbatim, read in
  ORBIT's reader with read-aloud and a saved place.
- **Build, then the gate.** Delta written, checkpoints, artifact built, gate passed — claimed in
  order, only once a module is open, exactly as before. The hard gate still holds Layers 4–6.
- **Recall.** Every module's Words are flashcards on ORBIT's FSRS scheduler.
- **The Plan and the parallel tracks** have their own pages, running the curriculum's own arithmetic.
- **The playground runs JavaScript for real**, alongside Python and SQL.
- **Your progress came with you.** The old realm's record is read the first time the app opens and
  kept in step, and an old backup file restores in Settings.
`,k=/^##[ \t]+v?(\d+\.\d+\.\d+)[ \t]*$/gm;function A(e){let t=[],n=[];k.lastIndex=0;for(let t=k.exec(e);t;t=k.exec(e))n.push({version:t[1],start:t.index,end:t.index+t[0].length});for(let r=0;r<n.length;r++){let i=e.slice(n[r].end,n[r+1]?.start??e.length);t.push({version:n[r].version,notes:i.trim()})}return t}var j=A(O);function M(e){let t=j.find(t=>t.version===e);return t&&t.notes?t.notes:null}var N=t();function P(){let{state:e,setState:t}=l(),[w,O]=(0,D.useState)(null),[k,A]=(0,D.useState)(null),[j,M]=(0,D.useState)(!1),P=(0,D.useRef)(null);(0,D.useEffect)(()=>{b().then(O)},[e.updatedAt]),(0,D.useEffect)(()=>{if(!k)return;let e=setTimeout(()=>A(null),6e3);return()=>clearTimeout(e)},[k]);let R=g(),z=Object.keys(e.items).length,B=Object.values(e.claims).filter(e=>e.delta||e.artifact||e.gate).length,V=!!e.settings.weights&&e.settings.weights.some((e,t)=>e!==v[t]),H=async e=>{let n=await e.text(),r=C(n);if(!r.ok){A({tone:`bad`,text:r.error});return}if(r.claimsOnly){if(!window.confirm(`Replace all LAUNCHPAD progress with this backup?`))return;t(e=>({...e,claims:r.state.claims,flagship:r.state.flagship,setup:r.state.setup,legacyImportedAt:e.legacyImportedAt??new Date().toISOString()})),A({tone:`ok`,text:`LAUNCHPAD progress restored: ${Object.keys(r.state.claims).length} modules with claims, from a backup of the old realm.`});return}t(r.state),A({tone:`ok`,text:`Restored ${Object.keys(r.state.claims).length} modules' claims, ${Object.keys(r.state.items).length} words and ${r.state.attempts.length} logged attempts.`})};return(0,N.jsxs)(`div`,{className:`page page--padtop`,children:[(0,N.jsx)(`div`,{className:`page-head`,children:(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`div`,{className:`page-head__kicker`,children:[(0,N.jsx)(a,{size:13}),`Local-first · no account · no server`]}),(0,N.jsx)(`h1`,{className:`h-page`,children:`Settings`}),(0,N.jsx)(`p`,{className:`page-head__sub`,children:`Everything you do lives in this browser on this device. Nothing is uploaded, which also means nothing is recoverable if site data is cleared without an export.`})]})}),k?(0,N.jsx)(u,{index:0,style:{marginBottom:`var(--gap)`},children:(0,N.jsxs)(`div`,{className:`signal`,children:[(0,N.jsx)(`span`,{className:`signal__dot`,style:{background:k.tone===`ok`?`var(--ok)`:`var(--bad)`}}),(0,N.jsx)(`div`,{className:`signal__msg`,children:k.text})]})}):null,(0,N.jsxs)(`div`,{className:`read`,children:[(0,N.jsxs)(`div`,{className:`stack`,children:[(0,N.jsxs)(u,{index:0,children:[(0,N.jsx)(s,{icon:(0,N.jsx)(n,{size:15}),title:`Backup & restore`,right:(0,N.jsxs)(m,{tone:z+B>0?`warn`:`default`,children:[B,` modules · `,z,` words`]}),divided:!0}),(0,N.jsxs)(`div`,{className:`setting`,children:[(0,N.jsxs)(`div`,{className:`grow`,children:[(0,N.jsx)(`div`,{className:`setting__label`,children:`Export a backup`}),(0,N.jsx)(`p`,{className:`setting__help`,children:`A single JSON file containing your claims — every delta, checkpoint, artifact and gate — the hard gate, your plan, your recall history and settings. Keep a copy somewhere that is not this device — that file is the durable version of your progress.`})]}),(0,N.jsx)(`div`,{className:`setting__control`,children:(0,N.jsxs)(p,{variant:`primary`,size:`md`,onClick:()=>x(e),children:[(0,N.jsx)(i,{size:15}),`Export`]})})]}),(0,N.jsxs)(`div`,{className:`setting`,children:[(0,N.jsxs)(`div`,{className:`grow`,children:[(0,N.jsx)(`div`,{className:`setting__label`,children:`Restore from a backup`}),(0,N.jsx)(`p`,{className:`setting__help`,children:`Replaces everything currently stored. Malformed files are rejected rather than partially applied. A backup exported by the old LAUNCHPAD realm in APEX restores too: it replaces your claims, the hard gate and the plan, and leaves recall alone.`})]}),(0,N.jsxs)(`div`,{className:`setting__control`,children:[(0,N.jsx)(`input`,{ref:P,type:`file`,accept:`application/json,.json`,style:{display:`none`},onChange:e=>{let t=e.target.files?.[0];t&&H(t),e.target.value=``}}),(0,N.jsxs)(p,{variant:`ghost`,size:`md`,onClick:()=>P.current?.click(),children:[(0,N.jsx)(c,{size:15}),`Choose file`]})]})]}),(0,N.jsxs)(`div`,{className:`setting`,children:[(0,N.jsxs)(`div`,{className:`grow`,children:[(0,N.jsx)(`div`,{className:`setting__label`,children:`Storage`}),(0,N.jsx)(`p`,{className:`setting__help`,children:w?`${E(w.usedBytes)} used of ${E(w.quotaBytes)} available. ${w.persisted?`This origin is marked persistent, so the browser will not evict it under disk pressure.`:`Not marked persistent — the browser may evict this data if the device runs low on space.`}`:`Storage estimates are not available in this browser.`})]}),w&&!w.persisted?(0,N.jsx)(`div`,{className:`setting__control`,children:(0,N.jsx)(p,{variant:`ghost`,size:`md`,onClick:()=>void y().then(async e=>{O(await b()),A(e?{tone:`ok`,text:`Storage is now persistent.`}:{tone:`bad`,text:`The browser declined. Safari ignores this request entirely — export regularly instead.`})}),children:`Request persistence`})}):null]})]}),(0,N.jsx)(L,{index:1}),(0,N.jsxs)(u,{index:1,children:[(0,N.jsx)(s,{icon:(0,N.jsx)(o,{size:15}),title:`Scheduling`,divided:!0}),(0,N.jsxs)(`div`,{className:`setting`,children:[(0,N.jsxs)(`div`,{className:`grow`,children:[(0,N.jsxs)(`div`,{className:`setting__label`,children:[`Target retention — `,Math.round(e.settings.desiredRetention*100),`%`]}),(0,N.jsx)(`p`,{className:`setting__help`,children:`How much you want to remember when an item comes due. This is far more sensitive than it looks: dropping from 90% to 80% roughly triples every interval, and raising it to 95% cuts them by 60%. 90% is the balance point between workload and retention, and is where the default sits.`})]}),(0,N.jsx)(`div`,{className:`setting__control`,children:(0,N.jsx)(`input`,{className:`range`,type:`range`,min:.8,max:.95,step:.01,value:e.settings.desiredRetention,onChange:e=>t(t=>({...t,settings:{...t.settings,desiredRetention:Number(e.target.value)}})),"aria-label":`Target retention`})})]}),(0,N.jsx)(F,{label:`Ask for confidence before revealing`,help:`Captures a judgement of learning before you see the answer. This is what makes the calibration chart on the Progress page possible, and seeing your own overconfidence plotted is the single most useful thing this app can show you.`,value:e.settings.askConfidence,onChange:e=>t(t=>({...t,settings:{...t.settings,askConfidence:e}}))}),(0,N.jsx)(F,{label:`Interleave topics within a session`,help:`Mixes related-but-confusable material instead of blocking it. It feels worse during the session and produces substantially better retention a day later. Brand-new material is still blocked until you have a few successes on it.`,value:e.settings.interleave,onChange:e=>t(t=>({...t,settings:{...t.settings,interleave:e}}))}),(0,N.jsx)(F,{label:`Fuzz review intervals`,help:`Jitters each interval by a few percent so a heavy study day does not create a permanent spike in your queue months later.`,value:e.settings.fuzz,onChange:e=>t(t=>({...t,settings:{...t.settings,fuzz:e}}))}),(0,N.jsx)(F,{label:`Reduce motion`,help:`Stops the star drift, the card entrance animations and the counting rings. Your system's own reduced-motion setting is always respected regardless of this.`,value:e.settings.reduceMotion,onChange:e=>t(t=>({...t,settings:{...t.settings,reduceMotion:e}}))}),(0,N.jsx)(F,{label:`Keep the menu on screen`,help:`The navigation rail hides itself and comes back when you move the pointer to the left edge of the window. It is hidden by default so that the nearest way out of a lesson is the back link at the top of it, rather than a list of everywhere else you could be. Turn this on to keep the rail in view the whole time.`,value:e.settings.pinSidebar===!0,onChange:e=>t(t=>({...t,settings:{...t.settings,pinSidebar:e}}))}),(0,N.jsxs)(`div`,{className:`setting`,children:[(0,N.jsxs)(`div`,{className:`grow`,children:[(0,N.jsxs)(`div`,{className:`setting__label`,children:[`Reading speed — `,e.settings.speechRate??1,`×`]}),(0,N.jsx)(`p`,{className:`setting__help`,children:`How fast a lesson is read aloud. The same picker sits above any lesson that can be read, and whichever you set last is the one you keep — it is remembered between sessions rather than starting over at normal speed each time.`})]}),(0,N.jsx)(`div`,{className:`setting__control`,children:(0,N.jsx)(`select`,{className:`select`,value:String(e.settings.speechRate??1),"aria-label":`Reading speed`,onChange:e=>t(t=>({...t,settings:{...t.settings,speechRate:Number(e.target.value)}})),children:T(e.settings.speechRate??1).map(e=>(0,N.jsxs)(`option`,{value:String(e),children:[e,`×`]},e))})})]}),V?(0,N.jsxs)(`div`,{className:`setting`,children:[(0,N.jsxs)(`div`,{className:`grow`,children:[(0,N.jsx)(`div`,{className:`setting__label`,children:`Custom FSRS parameters in use`}),(0,N.jsx)(`p`,{className:`setting__help`,children:`Your weight vector differs from the shipped defaults. Below roughly 1,000 reviews the defaults usually win — reset if you are unsure where these came from.`})]}),(0,N.jsx)(`div`,{className:`setting__control`,children:(0,N.jsx)(p,{variant:`ghost`,size:`md`,onClick:()=>t(e=>({...e,settings:{...e.settings,weights:void 0}})),children:`Reset to defaults`})})]}):null]}),(0,N.jsxs)(u,{index:2,children:[(0,N.jsx)(s,{icon:(0,N.jsx)(f,{size:15}),title:`Goals`,divided:!0}),(0,N.jsxs)(`div`,{className:`setting`,children:[(0,N.jsxs)(`div`,{className:`grow`,children:[(0,N.jsx)(`div`,{className:`setting__label`,children:`Weekly study target`}),(0,N.jsx)(`p`,{className:`setting__help`,children:`Weekly rather than daily on purpose. A daily target fails on the first busy day and turns an otherwise good week into a felt failure; a weekly one absorbs the variance.`})]}),(0,N.jsxs)(`div`,{className:`setting__control`,children:[(0,N.jsx)(`input`,{className:`input`,type:`number`,min:0,max:10080,step:30,value:e.goals.weeklyMinutes,onChange:e=>t(t=>({...t,goals:{...t.goals,weeklyMinutes:I(e.target.value,0,10080)}})),"aria-label":`Weekly minutes`}),(0,N.jsx)(`span`,{style:{fontSize:11.5,color:`var(--ink-4)`},children:`min`})]})]}),(0,N.jsxs)(`div`,{className:`setting`,children:[(0,N.jsxs)(`div`,{className:`grow`,children:[(0,N.jsx)(`div`,{className:`setting__label`,children:`New items per day`}),(0,N.jsx)(`p`,{className:`setting__help`,children:`Every new item becomes a permanent review obligation. Twelve a day is roughly 90 reviews a day at steady state — raise it knowingly.`})]}),(0,N.jsx)(`div`,{className:`setting__control`,children:(0,N.jsx)(`input`,{className:`input`,type:`number`,min:0,max:200,value:e.goals.newPerDay,onChange:e=>t(t=>({...t,goals:{...t.goals,newPerDay:I(e.target.value,0,200)}})),"aria-label":`New items per day`})})]}),(0,N.jsxs)(`div`,{className:`setting`,children:[(0,N.jsxs)(`div`,{className:`grow`,children:[(0,N.jsx)(`div`,{className:`setting__label`,children:`Target date (optional)`}),(0,N.jsx)(`p`,{className:`setting__help`,children:`An interview or deadline. When set, intervals tighten and target retention climbs as the date approaches, so the last review lands close enough to matter.`})]}),(0,N.jsx)(`div`,{className:`setting__control`,children:(0,N.jsx)(`input`,{className:`input`,type:`date`,value:e.goals.targetDate??``,onChange:e=>t(t=>({...t,goals:{...t.goals,targetDate:e.target.value||void 0}})),"aria-label":`Target date`})})]}),(0,N.jsx)(`div`,{className:`setting`,children:(0,N.jsxs)(`div`,{className:`grow`,children:[(0,N.jsx)(`div`,{className:`setting__label`,children:`When and where you study`}),(0,N.jsx)(`p`,{className:`setting__help`,children:`A cue-based plan — “after I pour my coffee, at the kitchen table” — beats a reminder time. Context stability is what actually drives a habit to automatic, and that takes about two months, not three weeks.`})]})}),(0,N.jsxs)(`div`,{className:`setting`,style:{paddingTop:0},children:[(0,N.jsx)(`input`,{className:`input input--wide grow`,placeholder:`After I…`,value:e.goals.cue??``,onChange:e=>t(t=>({...t,goals:{...t.goals,cue:e.target.value.slice(0,120)}})),"aria-label":`Study cue`}),(0,N.jsx)(`input`,{className:`input`,placeholder:`Where`,value:e.goals.place??``,onChange:e=>t(t=>({...t,goals:{...t.goals,place:e.target.value.slice(0,60)}})),"aria-label":`Study place`})]})]}),(0,N.jsxs)(u,{index:3,style:{borderColor:`rgba(244,97,78,0.22)`},children:[(0,N.jsx)(s,{icon:(0,N.jsx)(h,{size:15}),title:`Danger zone`,divided:!0}),(0,N.jsxs)(`div`,{className:`setting`,children:[(0,N.jsxs)(`div`,{className:`grow`,children:[(0,N.jsx)(`div`,{className:`setting__label`,children:`Erase everything`}),(0,N.jsx)(`p`,{className:`setting__help`,children:`Deletes all progress, review history and settings from this device. There is no undo and no server copy. Export first.`})]}),(0,N.jsx)(`div`,{className:`setting__control`,children:j?(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(p,{variant:`danger`,size:`md`,onClick:()=>void S().then(()=>{t(_()),M(!1),A({tone:`ok`,text:`Everything erased.`})}),children:[(0,N.jsx)(d,{size:15}),`Yes, erase it`]}),(0,N.jsx)(p,{variant:`ghost`,size:`md`,onClick:()=>M(!1),children:`Cancel`})]}):(0,N.jsxs)(p,{variant:`danger`,size:`md`,onClick:()=>M(!0),children:[(0,N.jsx)(d,{size:15}),`Erase`]})})]})]})]}),(0,N.jsxs)(`div`,{className:`stack`,children:[(0,N.jsxs)(u,{index:0,children:[(0,N.jsx)(s,{icon:(0,N.jsx)(a,{size:15}),title:`You`,divided:!0}),(0,N.jsxs)(`div`,{className:`sect`,children:[(0,N.jsx)(`label`,{className:`setting__label`,htmlFor:`displayName`,children:`Display name`}),(0,N.jsx)(`input`,{id:`displayName`,className:`input input--wide`,style:{width:`100%`,marginTop:9},value:e.settings.displayName,onChange:e=>t(t=>({...t,settings:{...t.settings,displayName:e.target.value.slice(0,60)}})),placeholder:`Future Engineer`}),(0,N.jsx)(`p`,{className:`setting__help`,style:{marginTop:9},children:`Shown on the dashboard. Stored only on this device.`})]})]}),(0,N.jsxs)(u,{index:1,children:[(0,N.jsx)(s,{icon:(0,N.jsx)(r,{size:15}),title:`What is installed`,divided:!0}),(0,N.jsxs)(`div`,{className:`sect`,style:{fontSize:12,color:`var(--ink-3)`,lineHeight:2},children:[(0,N.jsxs)(`div`,{children:[R.modules,` modules on 9 layers`]}),(0,N.jsxs)(`div`,{children:[R.lessons,` lessons, from the curriculum document`]}),(0,N.jsxs)(`div`,{children:[R.cards.toLocaleString(`en-US`),` words to recall`]}),(0,N.jsxs)(`div`,{children:[Math.round(R.hours).toLocaleString(`en-US`),` module hours, plus the parallel tracks`]}),(0,N.jsxs)(`div`,{children:[`Version `,`1.2.2`]})]})]}),(0,N.jsxs)(u,{index:2,children:[(0,N.jsx)(s,{icon:(0,N.jsx)(n,{size:15}),title:`Privacy`,divided:!0}),(0,N.jsx)(`div`,{className:`sect`,style:{fontSize:12,color:`var(--ink-3)`,lineHeight:1.75},children:`There is no account, no analytics and no network call carrying anything you do. The only outbound requests this app makes are, if you open the playground, for the Python and SQLite runtimes — both from a public CDN, both cached after the first load. JavaScript runs in the browser’s own engine and needs nothing downloaded.`})]}),(0,N.jsxs)(u,{index:3,children:[(0,N.jsx)(s,{icon:(0,N.jsx)(o,{size:15}),title:`About the scheduler`,divided:!0}),(0,N.jsx)(`div`,{className:`sect`,style:{fontSize:12,color:`var(--ink-3)`,lineHeight:1.75},children:`Words are scheduled by FSRS-6, a fitted power-law memory model with per-item stability and difficulty, and the Progress page shows all of it rather than hiding it behind a score. What opens a module is not the scheduler: it is the gate — a referee’s yes on every module it depends on — recorded by you on the module page.`})]})]})]})]})}function F({label:e,help:t,value:n,onChange:r}){return(0,N.jsxs)(`div`,{className:`setting`,children:[(0,N.jsxs)(`div`,{className:`grow`,children:[(0,N.jsx)(`div`,{className:`setting__label`,children:e}),(0,N.jsx)(`p`,{className:`setting__help`,children:t})]}),(0,N.jsx)(`div`,{className:`setting__control`,children:(0,N.jsx)(`button`,{className:`toggle`,"data-on":n,onClick:()=>r(!n),role:`switch`,"aria-checked":n,"aria-label":e,type:`button`})})]})}function I(e,t,n){let r=Math.round(Number(e));return Number.isFinite(r)?Math.min(Math.max(r,t),n):t}function L({index:e}){let t=`1.2.2`,n=M(t),i=j.filter(e=>e.version!==t).slice(0,3),[a,o]=(0,D.useState)(!1);return(0,N.jsxs)(u,{index:e,children:[(0,N.jsx)(s,{icon:(0,N.jsx)(r,{size:15}),title:`What's new in ${t}`,divided:!0}),(0,N.jsx)(`div`,{className:`sect`,children:n?(0,N.jsx)(w,{className:`updates__notes`,children:n}):(0,N.jsx)(`p`,{className:`setting__help`,children:`Nothing was written down for this version. That is a gap in the changelog rather than a version that changed nothing.`})}),i.length?(0,N.jsxs)(`div`,{className:`sect`,children:[(0,N.jsx)(p,{variant:`ghost`,size:`md`,onClick:()=>o(e=>!e),children:a?`Hide earlier versions`:`Earlier versions (${i.length})`}),a?i.map(e=>(0,N.jsxs)(`div`,{style:{marginTop:14},children:[(0,N.jsx)(`div`,{className:`setting__label`,children:e.version}),(0,N.jsx)(w,{className:`updates__notes`,children:e.notes})]},e.version)):null]}):null]})}export{P as Settings};