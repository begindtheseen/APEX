<!-- Context notes for M3/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[CPU-bound work|cpu-bound]] 1
[[retry storm|retry-storm]] 1
[[narrowing|narrowing]] 1

::: context cpu-bound CPU-bound versus waiting
Some work is slow because it waits — for a network reply or a disk. Other work is slow because it computes: resizing an image, parsing a huge file, a tight loop over millions of items. That second kind is **CPU-bound**. `async` only helps with waiting; while CPU-bound code runs, Node can do nothing else, so every other user's request stalls behind it.
:::

::: context retry-storm What a retry storm is
When a service slows down, every client that gets an error tries again — often immediately, often several times. The retries pile on top of the normal traffic, so the struggling service gets even more work and fails harder. The standard fixes are to wait longer after each failure (exponential backoff), add a little randomness so clients do not retry in lockstep, and limit how many requests are in flight at once.
:::

::: context narrowing What narrowing means
TypeScript narrows a type when your code proves something about a value. Inside `if (user !== null) { … }`, the checker knows `user` is not null, so it lets you use it safely. The `as` cast and the `!` mark skip the proof and simply tell the checker to trust you — so when you are wrong, the error moves from compile time to a crash in front of a user.
:::
