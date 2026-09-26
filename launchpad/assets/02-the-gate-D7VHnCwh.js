var e=`---
id: m20-the-gate
title: "Cost, Metering, and Unit Economics — the gate, and what most people miss"
minutes: 1
covers:
  - "The usage object and the four-number cost of a request, taken further than M6 took it"
  - "Prompt caching mechanics, breakpoint placement, verifying from the meters"
  - "Percentiles from raw distributions"
  - "Streaming as a perceived-latency fix, not a real one"
  - "Model x effort routing, and why caches being model-scoped hurts a cascade"
  - "Cost attribution per feature and per user, both"
  - "Budget alerts and circuit breakers"
  - "Unit economics, and the product-analytics question: is it worth keeping"
---
**GATE** — **REFEREE:** your reviewer, re-running the queries; each number must be reproducible from SQL.
**PASS:** state cost per active user per month, and end-to-end **[[p50 and p95|percentiles]] with the request count
behind them**, each backed by the query. **If [[your n|sample-size]] does not support a p99, say so and do not quote
one:** on a few hundred requests from a dozen users, p99 is the second-slowest request you ever served,
which is one sample. *"p99 on 300 requests is one request"* is the better answer, and it is the one this
module is actually teaching. Say whether you would keep the feature. **ON FAIL:** you are reporting an average — recompute from the raw
distribution.

**Most-missed:** Reporting an average; computing percentiles by averaging per-minute percentiles.
**[[Percentiles do not average|no-averaging]].** · Quoting a p99 from a sample that cannot support one. On a few hundred
requests, p99 is a single observation, and a hiring manager who asks "what is your n?" ends that answer.
· Measuring time-to-first-byte instead of [[time-to-first-token|ttft]]. They can
be seconds apart. · Routing on per-token price instead of cost per completed task — a cheap call that
needs three retries is not cheap. · The alert without the breaker; an alert at 3am tells you about money
already spent. · Running the budget check *after* the API call. · Cost per feature but not per user, which
hides the distribution entirely when AI cost per user is extremely skewed.

::: context percentiles The typical user and the unlucky one
Sort all your response times from fastest to slowest. **p50** (the median) is the value halfway down: half of requests were faster. **p95** is the value 95% of the way down: only 1 request in 20 was slower.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 150" font-family="Inter, Arial, sans-serif">
  <line x1="20" y1="120" x2="345" y2="120" stroke="#1f2a44" stroke-width="1.5"/>
  <g fill="#8fb8f0" stroke="#1f2a44" stroke-width="1">
    <rect x="30" y="80" width="24" height="40"/><rect x="56" y="30" width="24" height="90"/>
    <rect x="82" y="45" width="24" height="75"/><rect x="108" y="75" width="24" height="45"/>
    <rect x="134" y="95" width="24" height="25"/><rect x="160" y="105" width="24" height="15"/>
    <rect x="186" y="110" width="24" height="10"/><rect x="212" y="113" width="24" height="7"/>
    <rect x="264" y="115" width="24" height="5"/><rect x="316" y="116" width="24" height="4"/>
  </g>
  <line x1="94" y1="20" x2="94" y2="120" stroke="#1d6fd1" stroke-width="2"/>
  <text x="98" y="20" font-size="12" fill="#1d6fd1">p50</text>
  <line x1="212" y1="40" x2="212" y2="120" stroke="#b4232c" stroke-width="2"/>
  <text x="216" y="40" font-size="12" fill="#b4232c">p95</text>
  <text x="20" y="140" font-size="11" fill="#1f2a44">fast</text>
  <text x="320" y="140" font-size="11" fill="#1f2a44">slow</text>
  <text x="270" y="100" font-size="11" fill="#6c7a93">long tail</text>
</svg>
\`\`\`

Averages hide the slow tail; percentiles show it. The slow requests are the ones users complain about.
:::

::: context sample-size How many measurements stand behind it
**n** is the number of measurements behind a statistic. It decides which statistics you can honestly report.

p99 means "only 1% of requests were slower than this". With 300 requests, 1% is three requests, so your p99 is decided by the few slowest you happened to see, and one unusual request swings it completely. Quoting it as a stable fact overstates what you know.
:::

::: context no-averaging Why you cannot average percentiles
Say one minute had 1,000 requests and a p95 of 1 second, and the next had 10 requests and a p95 of 9 seconds. Averaging the two p95s gives 5 seconds, as if both minutes mattered equally, yet one had a hundred times more traffic.

The true p95 across both minutes comes from pooling all 1,010 raw times and sorting them. That is why you keep the raw measurements, not just per-minute summaries.
:::

::: context ttft When the first word appears
Time-to-first-token (TTFT) is how long a user waits before the model's first word shows up on screen. With streaming, it is the delay that matters most for how fast the app *feels*.

Time-to-first-byte measures when *any* data arrives, and a server can send headers or an opening message right away, long before the model has produced anything. Measure the thing the user sees.
:::
`;export{e as default};