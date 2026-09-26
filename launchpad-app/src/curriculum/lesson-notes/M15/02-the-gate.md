<!-- Context notes for M15/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[lagging metric|lagging-metric]] 1
[[history rewriting|history-rewriting]] 1
[[merge base|merge-base]] 1

::: context lagging-metric Leading and lagging measures
A **lagging** metric records an outcome after the fact — here, whether a stranger got round to merging your PR. It matters, but you cannot control it or act on it this week. A **leading** measure tracks what you do now: review rounds finished, comments answered. Gating on the leading one keeps your progress in your own hands.
:::

::: context history-rewriting Why rebase rewrites history
A commit's ID depends on its contents *and* on its parent. Rebasing changes the parent, so every rebased commit gets a new ID, even if the code is identical. Anyone who already pulled the old commits now has a different history from yours, and sorting that out is painful — which is why teams say: never rebase a branch other people are using.
:::

::: context merge-base What the merge base is
The **merge base** is the most recent commit that both branches share — the point where they split. Git compares each side against it to see who changed what. Reading the merge base tells you what the code looked like *before* either change, which is how you work out what both people meant, instead of throwing one person's work away.
:::
