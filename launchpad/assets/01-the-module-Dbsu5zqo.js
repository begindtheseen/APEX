var e=`---
id: m14-the-module
title: "Reading and Changing Code You Did Not Write — what to understand and what to build"
minutes: 2
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
What the first 90 days of any job actually is. **Greenfield is a rounding error in the first six months
of any job** — that is the whole argument, and it needs no statistic.

**Core concepts:** Tracing one real user action end to end — architecture is the *output* of tracing, not
the input. A predict-then-ask protocol for using AI on code you are learning. The three layers of code
search: ripgrep (lexical), ast-grep (structural), LSP (semantic). Reading tests as executable
specification. Git history as documentation — blame, pickaxe, \`log -L\`, bisect. Inferring unwritten
conventions. Chesterton’s fence. **Characterization tests around code you don’t understand.**
Strangler fig, **the resumable backfill** (on M8’s queue), the dual-run cutover.

**Checkpoints** ① trace one user action end to end with \`file:line\` at every hop · ② answer "why is this
line here" using pickaxe and \`log -L\`, not blame alone · ③ characterization tests pinning an untested
module, bugs included · ④ a behavior change behind a flag, both paths green · ⑤ the resumable backfill
over 100k rows, killed and restarted clean · ⑥ the dual-run cutover on a deterministic feature.

**Artifact** \`EVIDENCE\` — four pieces:
1. A written end-to-end trace of one user action in a real repo with \`file:line\` at every hop, **plus
   getting it running from a cold clone and writing the setup doc that was missing.**
2. Characterization tests locking in an untested module’s behavior *including its bugs*, then a behavior
   change behind a flag with both paths green.
3. A resumable backfill over 100k rows on M8’s queue — killed halfway, restarted, zero double-processing.
4. A dual-run cutover on **a deterministic feature** — a pure-function or query-path refactor where old
   and new outputs diff exactly.

> **#4 is deliberately not an AI feature.** Comparing two versions of a model-backed feature and
> justifying a cutover **is an eval**, and M12 is where you learn to do that properly. Do it here and you
> produce exactly the vibe comparison table M12 exists to prevent. Keep the target deterministic, where
> the comparison is unambiguous and the lesson is actually about cutover.

> **Exported:** characterization tests → M15.
`;export{e as default};