<!-- Context notes for M14/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[merged diff|diff]] 1
[[blast radius|blast-radius]] 1
[[formatting sweep|formatting-sweep]] 1

::: context diff What a diff is
A **diff** is the list of exactly what changed between two versions of code: lines removed (usually shown in red with a minus) and lines added (green with a plus). The maintainer's merged diff is the fix that really went in, which makes it an answer key nobody can argue with.
:::

::: context blast-radius What blast radius means
The **blast radius** of a change is everything it could affect. Searching for a function's name finds the obvious callers, but misses calls built from strings, code in other repositories, scheduled jobs and anything that depends on its old behaviour indirectly. Treating the search results as the whole list is how "a small change" takes something down.
:::

::: context formatting-sweep Why blame lands on a formatting commit
Teams sometimes run a formatter such as Prettier over the whole codebase, producing one commit that touches nearly every line. After that, `git blame` credits most lines to that commit, which explains nothing. Git can be told to skip such commits (`git blame --ignore-rev`), and the pickaxe searches past them.
:::
