<!-- Context notes for M15/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[the index is a third|git-index]] 2
[[merge/rebase/squash|merge-rebase-squash]] 1
[[reflog|reflog]] 2
[[revert vs reset|revert-reset]] 2
[[Atomic commits|atomic-commits]] 2
[[cohesion and coupling|cohesion-coupling]] 2
[[the rule of three|rule-of-three]] 1
[[one decision record|decision-record]] 2

::: context git-index The index, git's staging area
Git has three places your code can be. Your **working folder** holds the files you edit. The **index** (also called the staging area) holds what will go into the next commit — `git add` copies changes there. A **commit** saves a snapshot of the index, not of your folder. That is how you can commit two of the five files you changed, and why "I edited it but the commit doesn't have it" happens.
:::

::: context merge-rebase-squash Merge, rebase and squash
A **merge** joins two lines of work with a new commit that has both as parents, keeping the history exactly as it happened. A **rebase** replays your commits on top of the other line, as if you had started from there, producing a straight history made of brand-new commits. A **squash** combines several commits into one.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 150" font-family="Inter, Arial, sans-serif">
  <text x="10" y="30" font-size="12" fill="#1f2a44">merge</text>
  <line x1="70" y1="26" x2="310" y2="26" stroke="#6c7a93" stroke-width="2"/>
  <path d="M130 26 L170 58 L230 58 L290 26" fill="none" stroke="#1d6fd1" stroke-width="2"/>
  <g fill="#6c7a93"><circle cx="70" cy="26" r="7"/><circle cx="130" cy="26" r="7"/><circle cx="210" cy="26" r="7"/></g>
  <g fill="#1d6fd1"><circle cx="170" cy="58" r="7"/><circle cx="230" cy="58" r="7"/></g>
  <circle cx="290" cy="26" r="8" fill="#f2b880" stroke="#1f2a44" stroke-width="2"/>
  <text x="290" y="12" font-size="11" text-anchor="middle" fill="#1f2a44">merge commit</text>
  <text x="10" y="112" font-size="12" fill="#1f2a44">rebase</text>
  <line x1="70" y1="108" x2="310" y2="108" stroke="#6c7a93" stroke-width="2"/>
  <g fill="#6c7a93"><circle cx="70" cy="108" r="7"/><circle cx="130" cy="108" r="7"/><circle cx="190" cy="108" r="7"/></g>
  <g fill="#1d6fd1"><circle cx="250" cy="108" r="7"/><circle cx="310" cy="108" r="7"/></g>
  <text x="280" y="136" font-size="11" text-anchor="middle" fill="#1d6fd1">your commits, copied: new IDs</text>
</svg>
```
:::

::: context reflog The reflog, git's undo diary
The **reflog** is a private log, on your machine only, of every place your branches and `HEAD` have pointed recently — including commits that no longer appear in any branch. After a bad reset or a rebase gone wrong, `git reflog` shows where you were a few minutes ago, and you can go straight back. Entries are kept for about 90 days by default.
:::

::: context revert-reset Revert versus reset
`git revert` makes a **new** commit that undoes an old one; history stays intact, so it is safe on a branch other people use. `git reset` moves your branch back to an earlier commit, dropping the later ones from it — fine for tidying your own unpushed work, but on a shared branch it pulls commits out from under your teammates.
:::

::: context atomic-commits What an atomic commit is
An **atomic commit** does one logical thing — "rename `userId` to `accountId`" or "fix the timezone bug" — and leaves the code working. Commits like that are easy to review, easy to undo on their own, and let `git bisect` point at a single cause. A commit called "Friday's work" that mixes three changes is none of those.
:::

::: context cohesion-coupling Cohesion and coupling
**Cohesion** is how well the things inside one module belong together: a module that handles invoices and nothing else is cohesive. **Coupling** is how much modules depend on each other's insides: if changing the invoice code forces changes in five other files, they are tightly coupled. The long-standing advice is high cohesion, low coupling — each piece does one job and can change without dragging the others along.
:::

::: context rule-of-three The rule of three
Do not build a shared abstraction the first time you write something, or even the second. When you write similar code the **third** time, you have enough examples to see what actually varies, so factor it out then. Martin Fowler's book *Refactoring* popularized the rule, crediting it to Don Roberts. Abstracting too early usually guesses wrong and is harder to undo than copying.
:::

::: context decision-record What a decision record is
A **decision record** (often an ADR, architecture decision record) is a short note written when a significant choice is made: the situation, the options, the decision and its consequences. Months later, when someone asks "why on earth do we do it this way?", the answer is in the repository instead of in the head of someone who has left.
:::
