<!-- Context notes for M8/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[backfill|backfill]] 1
[[invent a queue|queue]] 1
[[request path|request-path]] 2
[[At-least-once delivery|at-least-once]] 2
[[Backpressure|backpressure]] 2
[[dead-letter paths|dead-letter]] 2
[[lease|lease]] 1

::: context backfill What a backfill is
A **backfill** is going back over data you already have and filling in something new for all of it — say, computing a summary for two million old documents after you add a summary column. It runs for hours, so it must survive a crash halfway and pick up where it stopped rather than starting again from row one.
:::

::: context queue What a job queue is
A **queue** is a waiting line for work. The part of your app that talks to users just adds a job to the line and answers straight away ("we're on it"). Separate programs called **workers** take jobs from the front and do the slow part. If a worker dies, the job is still in the line.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 100" font-family="Inter, Arial, sans-serif">
  <rect x="8" y="30" width="70" height="40" rx="8" fill="#ffffff" stroke="#1f2a44" stroke-width="2"/>
  <text x="43" y="54" font-size="12" text-anchor="middle" fill="#1f2a44">web app</text>
  <line x1="78" y1="50" x2="104" y2="50" stroke="#1f2a44" stroke-width="2"/>
  <polygon points="110,50 100,45 100,55" fill="#1f2a44"/>
  <g fill="#f2b880" stroke="#1f2a44" stroke-width="1.5">
    <rect x="116" y="34" width="32" height="32" rx="4"/><rect x="154" y="34" width="32" height="32" rx="4"/><rect x="192" y="34" width="32" height="32" rx="4"/>
  </g>
  <text x="170" y="86" font-size="11" text-anchor="middle" fill="#6c7a93">jobs waiting</text>
  <line x1="226" y1="50" x2="252" y2="50" stroke="#1f2a44" stroke-width="2"/>
  <polygon points="258,50 248,45 248,55" fill="#1f2a44"/>
  <rect x="262" y="30" width="90" height="40" rx="8" fill="#8fb8f0" stroke="#1d6fd1" stroke-width="2"/>
  <text x="307" y="54" font-size="12" text-anchor="middle" fill="#1f2a44">worker</text>
</svg>
```
:::

::: context request-path What the request path is
The **request path** is everything that runs between a user's request arriving and your response going back — the time they spend watching a spinner. Slow work there (reading a 200-page PDF, calling a model several times) makes pages hang and hits platform time limits. Moving it to a background job keeps the response quick.
:::

::: context at-least-once What at-least-once delivery promises
A queue can promise that every job will run **at least once** — not exactly once. If a worker finishes the work and then crashes before marking the job done, the job is handed out again and runs a second time. Exactly-once delivery is not something a queue can guarantee in general; what you can build is exactly-once *effects*, by making the work idempotent so a second run changes nothing.
:::

::: context backpressure What backpressure is
When work arrives faster than your workers can finish it, the queue grows — and without a limit it grows until memory, disk or patience runs out. **Backpressure** is pushing back on whoever is adding work: slowing them down, telling them "busy, try later," or refusing new jobs once the line is too long. It is the difference between a slow system and a crashed one.
:::

::: context dead-letter What a dead-letter queue is
Some jobs fail every time — bad input, a bug that only this job hits. Retrying them forever wastes work and can clog the line. After a set number of attempts, such a job is moved to a separate **dead-letter** list where it stops retrying and waits for a person to look at it. The name comes from the post office's department for mail that could not be delivered.
:::

::: context lease What a lease on a job is
When a worker takes a job, it claims it for a limited time — a **lease**, say five minutes. If the worker finishes, it marks the job done. If it crashes, it never renews the claim, the lease runs out, and another worker can pick the job up. Without the time limit, a job taken by a dead worker would sit "in progress" forever.
:::
