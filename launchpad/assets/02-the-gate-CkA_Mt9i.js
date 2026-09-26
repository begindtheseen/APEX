var e=`---
id: m14-the-gate
title: "Reading and Changing Code You Did Not Write — the gate, and what most people miss"
minutes: 1
covers:
  - "Tracing one user action end to end — architecture is the output of tracing, not the input"
  - "A predict-then-ask protocol for using AI on code you are learning"
  - "Three layers of code search: ripgrep, ast-grep, LSP"
  - "Reading tests as executable specification"
  - "Git history as documentation: blame, pickaxe, log -L, bisect"
  - "Inferring unwritten conventions"
  - "Chesterton’s fence"
  - "Characterization tests around code you do not understand"
  - "Strangler fig, the resumable backfill, the dual-run cutover"
---
**GATE** — **REFEREE:** your reviewer, who reverts a merged bug-fix commit from the ones you saved unread
in M1 and scores you against the maintainer’s actual [[merged diff|diff]]. **PASS:** state the root cause out loud
in **one sentence** before writing any fix — scored separately, and a correct diagnosis with an
unfinished patch passes the diagnosis half. Then arrive at a fix that matches the maintainer’s on the
behavior (not necessarily line for line), 3 of 5 attempts, **two of them tightened to 45 minutes.** Then
defend three things you thought were wrong and deliberately did not change. **ON FAIL:** pull the next
commit from the queue in 7 days. Never read the fix commits.

**Most-missed:** Reading directories top-down, or asking for an architecture overview first. · Asking
the assistant to produce the answer rather than pressure-test yours. People who ask it questions learn
the code; people who hand it the task do not. · Searching (grepping) for a function name and treating the hits as
the complete [[blast radius|blast-radius]]. · \`git blame\` as the final answer — it gives the last commit to touch the line,
usually a [[formatting sweep|formatting-sweep]]. \`git log -S\` and \`git log -L :funcname:file\` answer "why is this here."
· Pattern-matching ugliness to badness. **Your confidence is highest exactly where your context is
lowest.** · Waiting to understand the whole system before opening anything. The most common ramp killer.

::: context diff What a diff is
A **diff** is the list of exactly what changed between two versions of code: lines removed (usually shown in red with a minus) and lines added (green with a plus). The maintainer's merged diff is the fix that really went in, which makes it an answer key nobody can argue with.
:::

::: context blast-radius What blast radius means
The **blast radius** of a change is everything it could affect. Searching for a function's name finds the obvious callers, but misses calls built from strings, code in other repositories, scheduled jobs and anything that depends on its old behaviour indirectly. Treating the search results as the whole list is how "a small change" takes something down.
:::

::: context formatting-sweep Why blame lands on a formatting commit
Teams sometimes run a formatter such as Prettier over the whole codebase, producing one commit that touches nearly every line. After that, \`git blame\` credits most lines to that commit, which explains nothing. Git can be told to skip such commits (\`git blame --ignore-rev\`), and the pickaxe searches past them.
:::
`;export{e as default};