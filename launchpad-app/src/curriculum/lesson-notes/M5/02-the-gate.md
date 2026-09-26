<!-- Context notes for M5/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[cold-then-warm|cold-warm]] 1
[[correct composite|composite-index]] 1
[[migration history|migrations]] 1

::: context cold-warm Cold and warm caches
The first time a query runs, the data it needs may have to come from disk. Postgres and the operating system then keep recently used data in memory, so the second run is often much faster with nothing else changed. Measure the slow version cold and the fast version warm and the cache gets credit for your index. Running each twice and keeping the second number compares like with like.
:::

::: context composite-index Why column order matters in an index
An index on `(a, b)` is sorted by `a` first, then by `b` within each `a` — like a phone book sorted by last name, then first name. It is great for finding "Smith" or "Smith, Maria," and nearly useless for finding every "Maria," because the Marias are scattered all through the book. And every index must be updated on every insert, so extra ones slow down writes.
:::

::: context migrations What a migration is
A **migration** is a small file describing one change to the database's structure — "add a `plan` column to `users`" — kept in the repository and applied in order. Every copy of the database, from your laptop to production, gets the same changes the same way, and the history shows who changed what and when. A change clicked in a dashboard leaves no such record.
:::
