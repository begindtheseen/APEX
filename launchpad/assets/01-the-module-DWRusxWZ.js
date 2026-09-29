var e=`---
id: m1-the-module
title: "First Code — what to understand and what to build"
minutes: 5
covers:
  - "What a program is: a file of instructions a runtime (here, Node) reads top to bottom"
  - "The terminal as a place you type commands, and what a working directory means"
  - "Variables, functions, arguments and return values — the four things every program is made of"
  - "Conditionals and loops, and why a loop that never ends is the first bug everyone writes"
  - "Arrays and objects: a list of things, and a thing with named parts"
  - "Reading an error message: the type, the message, the file and the line number"
  - "What a test is — code that runs your code and says yes or no without you looking"
  - "git as a save-point system: what a commit is, and what branch, remote and getting back mean"
---
> **This is where code starts, and it starts from nothing:** what a program is, what the terminal is,
> what a variable is. Fifty-eight hours is the longest module in this layer on purpose — it is the one
> that decides whether the rest of the program is readable to you. Nothing before this assumed you
> could write anything, and nothing here assumes it either.

**Why this exists.** The promise on the cover is first principles, and the [[event loop|event-loop]] is not a first
principle for a reader who has never opened a terminal. Going from "write a plan" straight to "predict the
output order of six mixed sync/setTimeout/promise lines" walls that reader at hour 12 of a 1,860-hour
program, at the module this document itself calls "the steepest part of the curve." That is not a steep
curve; it is a missing first step, and every gate after it would inherit the gap — the blind queue asks for
twenty commits, M3’s and M4’s gates turn on an unseen bug your reviewer plants in a single file, M25’s gate
needs a pull request into an open-source Python project. So git and the terminal come first.

**What you need to understand.** What a program is: a file of instructions a [[runtime|runtime]] (here, Node) reads top
to bottom.
The terminal as a place you type commands, and what a [[working directory|working-directory]] means. Variables, functions,
arguments and return values — the four things every program is made of. Conditionals and loops, and why
a loop that never ends is the first bug everyone writes. Arrays and objects: a list of things, and a thing
with named parts. Reading an error message — the type, the message, the file and the line number. What a
test is — code that runs your code and says yes or no without you looking. git as a save-point system:
what a commit is, commit, branch, remote, and how to get back.

**Checkpoints** ① a terminal you opened yourself, \`node --version\` answering, and an empty file you
created from the command line · ② a program that prints something, run from the terminal rather than from
an editor button · ③ the file-reading program, and the first error you read to the end instead of pasting
into a search box · ④ the API program: something that came back from a real server and was reshaped by
your code · ⑤ the repeated block pulled into a function, because you noticed it, not because you were
told to · ⑥ three tests you wrote before the code, watched fail, then made pass · ⑦ a deliberate break
recovered with git — the save-point used in anger once · ⑧ the 30-minute install check done against the
named hardware floor, your first unseen task scored as a fraction, and the twenty commits saved unread
with each [[parent SHA|parent-sha]] recorded and its suite confirmed green today.

**The artifact** \`LAB\` — six small programs, each written by you from an empty file and run from the
terminal: one that reads a file and prints how many lines it has; one that asks a [[public API|public-api]] for data and
rearranges what comes back; one that fails on purpose, which you fix by reading the error message; one
where a block you had typed twice becomes a function; one with three tests you wrote before the code they
test; and one you broke on purpose and got back with git. The setup around them counts as part of the
work: node installed with its version written down, an editor you can move around in without a mouse, a
repo [[pushed to a remote|remote]] with commit messages a stranger could follow, and a page naming every tool you
installed and what each one is for.

**Then three short things you can only do now that you have tools — the items M0 pointed here:**

- **The hardware floor and a 30-minute smoke test.** Check that a local database, a [[container runtime|container-runtime]],
  a load generator and a browser you can drive from code all install now, so that if something will not
  install it fails today instead of in month three. **Name the floor while you are there, because "a
  substantial machine" is not a specification:** M5 holds a five-million-row [[Postgres|postgres]] instance and a
  container runtime at the same time, M11 runs OCR over PDFs and M18 runs a reranker, so plan on at
  least **16 GB of memory and 50 GB of free disk**. The check proves things install; it does not prove
  M5 will fit. If you are unsure, load five million rows into your local Postgres today and watch what
  happens. The browser tool is the one item nothing here requires — you check that it installs so that
  knowing your machine can run it costs half a minute now instead of an evening later.
- **The cold baseline — as a fraction, not a feeling.** A first attempt at a coding task you have never
  seen, scored honestly as a fraction. **Zero out of six is a real score, and writing it down is the
  point.** Without a number, nothing later can be compared to it.
- **The blind-exercise queue.** A list of twenty small bug-fix commits from other people’s public repos,
  found but **not read**, saved for M14 and M30, where they become practice problems with a real
  answer — \`git revert\` one, the suite goes red, work the clock, score against the maintainer’s actual
  merged diff. Real ground truth, no human required, nobody who can leak. **Save a reproducible
  starting state, not a URL:** record each commit’s parent SHA and confirm *today* that the project
  builds and its suite is green at that parent. A repo moves on, and a commit you cannot check out and
  run in fifteen months is not an exercise, it is a merge conflict.

::: context event-loop The event loop, in one breath
JavaScript does one thing at a time. When your code asks for something slow — a timer, a file, a reply from a server — it does not wait; it leaves a note and carries on. The **event loop** is the part of the runtime that, once the current code has finished, picks up the next job whose answer has arrived and runs it. That is why the order things print in can surprise you, and why it is not a first lesson.
:::

::: context runtime What a runtime is
A file of JavaScript is just text. A **runtime** is the program that reads that text and carries it out, and it also gives your code powers the language alone does not have, such as reading files or opening network connections. **Node** is the runtime you use here: it takes the JavaScript engine from Google Chrome and runs it outside the browser, on your own machine or a server. You start it by typing \`node\` and a file name.
:::

::: context working-directory Where your terminal is standing
A terminal is always "in" one folder, called the working directory. \`pwd\` prints which one, and \`cd\` moves you somewhere else. When you type \`node count.js\`, the terminal looks for \`count.js\` in that folder — so "file not found" very often just means you are standing in the wrong place.
:::

::: context parent-sha Why record the parent SHA
Every git commit has an ID: a long string of letters and numbers (a hash) that works like a fingerprint for that exact state of the code. A commit's **parent** is the commit just before it. For a bug fix, the parent is the code with the bug still in it — your practice problem. The suite being **green** means every test passes; test tools show passes in green and failures in red.
:::

::: context public-api Asking another program for data
An **API** (application programming interface) is the set of requests a program agrees to answer. A public web API lives at a web address: your code sends a request, and the server sends back data — usually as JSON, text shaped like nested lists and labelled fields — which your code can then pick apart. Weather services, GitHub and many government data sites offer free ones.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120" font-family="Inter, Arial, sans-serif">
  <rect x="10" y="30" width="100" height="60" rx="8" fill="#ffffff" stroke="#1f2a44" stroke-width="2"/>
  <text x="60" y="58" font-size="12" text-anchor="middle" fill="#1f2a44">your</text>
  <text x="60" y="73" font-size="12" text-anchor="middle" fill="#1f2a44">program</text>
  <rect x="250" y="30" width="100" height="60" rx="8" fill="#8fb8f0" stroke="#1d6fd1" stroke-width="2"/>
  <text x="300" y="65" font-size="12" text-anchor="middle" fill="#1f2a44">server</text>
  <line x1="112" y1="48" x2="240" y2="48" stroke="#1d6fd1" stroke-width="2"/>
  <polygon points="248,48 238,43 238,53" fill="#1d6fd1"/>
  <text x="180" y="40" font-size="11" text-anchor="middle" fill="#1d6fd1">request: GET /weather</text>
  <line x1="248" y1="74" x2="120" y2="74" stroke="#b4232c" stroke-width="2"/>
  <polygon points="112,74 122,69 122,79" fill="#b4232c"/>
  <text x="180" y="92" font-size="11" text-anchor="middle" fill="#b4232c">response: {"temp": 14}</text>
</svg>
\`\`\`
:::

::: context remote What a git remote is
Your repository lives in a folder on your machine. A **remote** is another copy of it somewhere else — usually on GitHub — that git knows the address of. \`git push\` sends your new commits there; \`git pull\` brings other people's commits back. The first remote is conventionally named \`origin\`. If your laptop dies, the remote is how your work survives.
:::

::: context container-runtime What a container runtime is
A **container** packages a program together with everything it needs to run — the right versions of its libraries and settings — and keeps it walled off from the rest of your machine. A container runtime such as Docker starts and stops them. It is how you can run a database for one project without installing it permanently, and how a team makes "works on my machine" mean "works on every machine."
:::

::: context postgres What Postgres is
**PostgreSQL**, usually called Postgres, is a free, open-source database that grew out of a research project at the University of California, Berkeley in the 1980s. It stores data in tables of rows and columns and you ask it questions in a language called SQL. It shows up in a large share of job postings, which is why several modules here are built on it.
:::
`;export{e as default};