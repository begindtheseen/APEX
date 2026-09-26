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
What the first 90 days of any job actually is. **[[Greenfield|greenfield]] is a rounding error in the first six months
of any job** — that is the whole argument, and it needs no statistic.

**Core concepts:** Tracing one real user action end to end — architecture is the *output* of tracing, not
the input. A predict-then-ask protocol for using AI on code you are learning. The three layers of code
search: ripgrep (lexical), ast-grep (structural), [[LSP|lsp]] (semantic). Reading tests as executable
specification. Git history as documentation — [[blame, pickaxe|pickaxe]], \`log -L\`, bisect. Inferring unwritten
conventions. [[Chesterton’s fence|chestertons-fence]]. **[[Characterization tests|characterization-tests]] around code you don’t understand.**
[[Strangler fig|strangler-fig]], **the resumable backfill** (on M8’s queue), the [[dual-run cutover|dual-run]].

**Checkpoints** ① trace one user action end to end with \`file:line\` at every hop · ② answer "why is this
line here" using pickaxe and \`log -L\`, not blame alone · ③ characterization tests pinning an untested
module, bugs included · ④ a behavior change [[behind a flag|feature-flag]], both paths green · ⑤ the resumable backfill
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

::: context greenfield Greenfield and brownfield
A **greenfield** project starts from nothing — an empty field to build on, with no existing code to respect. **Brownfield** means working inside a system that already exists, with its history, users and odd decisions. Almost every new hire works brownfield first, so learning to find your way around someone else's code is the everyday skill.
:::

::: context lsp Three ways to search code
**ripgrep** searches for exact text, very fast. **ast-grep** searches by code structure, so you can find "every call to \`fetch\` with two arguments" however it is spaced. **LSP** (the Language Server Protocol, created by Microsoft) is what powers "go to definition" and "find all references" in your editor: it understands the language, so it knows which \`save\` you mean.
:::

::: context pickaxe Digging through git history
\`git blame\` shows, for each line, the last commit that touched it. The **pickaxe**, \`git log -S "text"\`, finds the commits where that text was added or removed — usually the one that explains *why* it exists. \`git log -L\` follows the history of a range of lines or a single function through every change. Together they turn "who wrote this nonsense?" into "oh, that is why."
:::

::: context chestertons-fence Chesterton's fence
From the writer G. K. Chesterton: if you come across a fence in the middle of a road and see no use for it, do not tear it down — first go and find out why someone put it there. In code, a strange-looking check or delay is often a fix for a problem you have not met yet. Remove it only once you know what it was for.
:::

::: context characterization-tests What characterization tests are
A **characterization test** records what code *currently does*, not what it should do — bugs included. You feed it inputs, write down the outputs it gives today, and assert those. The term comes from Michael Feathers' book *Working Effectively with Legacy Code*. It gives you a safety net for changing code nobody fully understands: if an output moves, you know, and you decide whether that was intended.
:::

::: context strangler-fig The strangler fig pattern
Named by Martin Fowler after a tropical vine that grows down around a host tree until it stands on its own, often killing the tree inside. Instead of rewriting an old system in one risky jump, you build the new one alongside it and move features across one at a time, routing each to the new code as it is ready, until the old system has nothing left to do and can be switched off.
:::

::: context dual-run What a dual-run cutover is
Run the old code and the new code side by side on the same real inputs — users still get the old result — and compare the outputs. Every difference is either a bug in the new code or an old bug you now understand. When they have matched long enough, you **cut over**: the new code's answers become the real ones, and the old code can be retired.
:::

::: context feature-flag What a feature flag is
A **feature flag** is a switch, stored outside the code, that turns a code path on or off without deploying anything new. Teams ship new behaviour switched off, turn it on for staff or 1% of users, watch, and widen it — and if something breaks, they flip it off in seconds instead of rushing out a fix.
:::
`;export{e as default};