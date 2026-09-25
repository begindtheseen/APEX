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

**Why this exists.** The promise on the cover is first principles, and the event loop is not a first
principle for a reader who has never opened a terminal. Going from "write a plan" straight to "predict the
output order of six mixed sync/setTimeout/promise lines" walls that reader at hour 12 of a 1,584-hour
program, at the module this document itself calls "the steepest part of the curve." That is not a steep
curve; it is a missing first step, and every gate after it would inherit the gap — the blind queue asks for
twenty commits, M3’s and M4’s gates turn on an unseen bug your reviewer plants in a single file, M25’s gate
needs a pull request into an open-source Python project. So git and the terminal come first.

**What you need to understand.** What a program is: a file of instructions a runtime (here, Node) reads top
to bottom.
The terminal as a place you type commands, and what a working directory means. Variables, functions,
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
with each parent SHA recorded and its suite confirmed green today.

**The artifact** \`LAB\` — six small programs, each written by you from an empty file and run from the
terminal: one that reads a file and prints how many lines it has; one that asks a public API for data and
rearranges what comes back; one that fails on purpose, which you fix by reading the error message; one
where a block you had typed twice becomes a function; one with three tests you wrote before the code they
test; and one you broke on purpose and got back with git. The setup around them counts as part of the
work: node installed with its version written down, an editor you can move around in without a mouse, a
repo pushed to a remote with commit messages a stranger could follow, and a page naming every tool you
installed and what each one is for.

**Then three short things you can only do now that you have tools — the items M0 pointed here:**

- **The hardware floor and a 30-minute smoke test.** Check that a local database, a container runtime,
  a load generator and a browser you can drive from code all install now, so that if something will not
  install it fails today instead of in month three. **Name the floor while you are there, because "a
  substantial machine" is not a specification:** M5 holds a five-million-row Postgres instance and a
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
`;export{e as default};