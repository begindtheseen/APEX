var e=`---
id: m3-the-gate
title: "The Runtime, Unframed — the gate, and what most people miss"
minutes: 1
covers:
  - "The event loop: call stack, macrotask vs microtask queue"
  - "What a Promise actually is — a notification channel for work that already started"
  - "The four concurrency failure modes"
  - "Closures, lexical scope, this, reference identity — including warm serverless instances sharing module scope"
  - "Structural typing and where the type system lies to you"
  - "Parse, don’t assert — the trust boundary"
  - "Discriminated unions and exhaustiveness"
  - "Error taxonomy, cause chaining, retry safety"
  - "Modules and the bundle graph — the import graph is what ships"
---
**GATE** — **REFEREE:** your reviewer, watching the screen recording back with you. **PASS:** narrate
unprompted why \`setTimeout(fn,0)\` runs after a resolved \`.then()\`; convert a real \`as\`-cast of model JSON
from your own shipped code into a parsed boundary and name the production bug it prevents. **The unseen
condition:** three attempts, 45 minutes each, on an async bug your reviewer plants in a single
file you have not seen — pass 2 of 3. Narrating your own harness cannot distinguish understanding the
runtime from remembering what you built. **ON FAIL:** rebuild the concurrency harness from empty;
re-attempt in 7 days.

**Most-missed:** Believing \`async\` means "runs in the background." An async function runs synchronously
until its first \`await\`, and [[CPU-bound work|cpu-bound]] inside one blocks the whole process exactly as hard.
· \`await\` in a \`for\` loop over independent work — 200 × 200 milliseconds (ms) becomes 40 seconds. And the inverse,
\`Promise.all\` over an unbounded array, firing 200 requests into a [[retry storm|retry-storm]]. · Silencing strict-mode
errors with \`as\` and \`!\` instead of [[narrowing|narrowing]] — converting a compile error into a runtime crash.
· \`{loading, error?, data?}\` (the \`?\` marks a field that may be absent), which permits four impossible
combinations. · \`catch (e) { console.log(e) }\` and
continuing — a loud failure becomes a silent wrong answer.

::: context cpu-bound CPU-bound versus waiting
Some work is slow because it waits — for a network reply or a disk. Other work is slow because it computes: resizing an image, parsing a huge file, a tight loop over millions of items. That second kind is **CPU-bound**. \`async\` only helps with waiting; while CPU-bound code runs, Node can do nothing else, so every other user's request stalls behind it.
:::

::: context retry-storm What a retry storm is
When a service slows down, every client that gets an error tries again — often immediately, often several times. The retries pile on top of the normal traffic, so the struggling service gets even more work and fails harder. The standard fixes are to wait longer after each failure (exponential backoff), add a little randomness so clients do not retry in lockstep, and limit how many requests are in flight at once.
:::

::: context narrowing What narrowing means
TypeScript narrows a type when your code proves something about a value. Inside \`if (user !== null) { … }\`, the checker knows \`user\` is not null, so it lets you use it safely. The \`as\` cast and the \`!\` mark skip the proof and simply tell the checker to trust you — so when you are wrong, the error moves from compile time to a crash in front of a user.
:::
`;export{e as default};