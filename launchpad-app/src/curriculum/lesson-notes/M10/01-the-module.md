<!-- Context notes for M10/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[Stack traces|stack-traces]] 2
[[source maps|source-maps]] 1
[[bisection|bisection]] 2
[[correlation IDs|correlation-ids]] 2
[[SLOs|slos]] 2
[[flame graphs|flame-graphs]] 2
[[blameless postmortem|blameless-postmortem]] 2
[[OTel spans|otel-spans]] 2

::: context stack-traces How to read a stack trace
When a program crashes, it prints the chain of function calls that were running at that moment, each with a file name and line number — the most recent call first. Read down from the top until you reach the first line in *your* code rather than in a library. That line is usually where to start looking, even if it is not where the mistake was made.
:::

::: context source-maps What source maps do
Before code ships to browsers it is usually **minified**: names shortened, spaces removed, everything on one enormous line. An error then points at something like `main.js:1:48213`, which tells you nothing. A **source map** is a file that translates positions in the minified code back to your original files and lines, so error-tracking tools can show you the real line.
:::

::: context bisection Finding a bug by halving
**Bisection** is binary search applied to debugging. If the app worked 1,000 commits ago and fails now, test the commit halfway between; whichever half holds the break, halve again. About ten tests find the exact commit, since 2 × 2 × … ten times is 1,024. `git bisect` automates it, and the same trick works on data, settings and dates.
:::

::: context correlation-ids What a correlation ID is
A busy server's logs interleave thousands of requests. A **correlation ID** is a unique label created when a request arrives, stamped on every log line that request produces and passed along to every other service it calls. Search for that one ID and you get the whole story of one user's request, in order, out of millions of lines.
:::

::: context slos What an SLO is
An **SLO** (service level objective) is a target for how well your service should work, measured over a period — for example "99.5% of requests succeed" or "95% of requests finish within one second" over 30 days. That second kind is often called **p95 latency**: the time that 95 out of 100 requests beat. An **SLA** is a promise in a contract, usually with money attached if it is missed.
:::

::: context flame-graphs What a flame graph shows
A **profiler** samples, many times a second, which functions your program is in the middle of running. A **flame graph** (a chart introduced by performance engineer Brendan Gregg) draws those samples as stacked bars: the wider a bar, the more of the time that function was on the stack. The widest bars near the top are where your program actually spends its time — often not where you guessed.
:::

::: context blameless-postmortem What a blameless postmortem is
After an outage, the team writes up what happened, how it was noticed, how it was fixed, and what will change. **Blameless** means the write-up asks how the system let a reasonable person make that mistake, not who to punish — because people who expect blame hide details, and the details are what prevent the next outage. Companies like Google and Etsy wrote publicly about the practice, and it is now common across the industry.
:::

::: context otel-spans What OpenTelemetry spans are
**OTel** is short for OpenTelemetry, an open standard and set of libraries for recording what your system does. A **span** is one timed step of a request — "query database, 40 ms" — and spans nest inside each other to form a **trace** of the whole request. Drawn as a timeline, the slow step is obvious at a glance.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120" font-family="Inter, Arial, sans-serif">
  <rect x="20" y="16" width="320" height="20" rx="3" fill="#8fb8f0" stroke="#1d6fd1"/>
  <text x="28" y="30" font-size="11" fill="#1f2a44">POST /ask — 2.4 s</text>
  <rect x="30" y="44" width="30" height="20" rx="3" fill="#ffffff" stroke="#1d6fd1"/>
  <text x="66" y="58" font-size="11" fill="#1f2a44">db 0.2 s</text>
  <rect x="64" y="72" width="240" height="20" rx="3" fill="#f2b880" stroke="#1f2a44"/>
  <text x="72" y="86" font-size="11" fill="#1f2a44">model call — 1.8 s</text>
  <rect x="308" y="100" width="24" height="16" rx="3" fill="#ffffff" stroke="#1d6fd1"/>
  <text x="302" y="112" font-size="11" text-anchor="end" fill="#1f2a44">save log 0.2 s</text>
</svg>
```
:::
