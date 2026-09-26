var e=`---
id: m20-the-module
title: "Cost, Metering, and Unit Economics — what to understand and what to build"
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
**Core concepts:** The usage object and the four-number cost of a request, taken further than M6 took
it. [[Prompt caching|prompt-caching]] mechanics,
breakpoint placement, verifying from the meters. Percentiles from raw distributions. Streaming as a
*perceived*-latency fix, not a real one. **Model × effort routing**, and why caches being model-scoped
hurts a [[cascade|cascade]]. Cost attribution per feature *and per user*. Budget alerts **and [[circuit breakers|circuit-breaker]]**.
[[Unit economics|unit-economics]], and the product-analytics question — is it worth keeping.

> **Model routing is the wrong first dial.** The **first** quality-trading lever
> after caching is **effort** — measure the most capable model at lower effort *before* building a model
> cascade, because **caches are model-scoped and a cascade forfeits cache reuse.** Make the routing
> experiment two-dimensional: (model × effort) over the same task set, scored by M12’s harness, reported
> as **cost per completed task.**

**Checkpoints** ① the per-user credit ledger, with its decrement proved correct under concurrent
hammering · ② a test-mode subscription whose [[webhook|webhook]] consumer survives being replayed · ③ the
out-of-credit path and the spend circuit breaker, both proved from outside the app · ④ one weekly report
joining usage, quality and cost into one line per active user · ⑤ the model-by-effort routing experiment
scored by M12, reported as cost per completed task.

**Artifact** \`EVIDENCE\` — a per-user credit ledger with an [[atomic decrement|atomic-decrement]] **proven by concurrent
hammering** (balance never goes negative); a Stripe test-mode subscription with an [[idempotent|idempotent]] webhook
consumer on M8’s queue that survives replay; a server-rendered [[402 path|http-402]] with a correct body, proven by
curl; a circuit breaker on spend; one weekly SQL report joining usage, quality score, and cost into **one
line per active user, including a non-model cost column**; and the (model × effort) routing experiment
scored by M12, reported as cost per completed task.

::: context prompt-caching Not paying twice for the same prompt
Many requests start with the same long text: a system prompt, a tool list, a document. Prompt caching lets the provider keep the processed form of that shared beginning for a few minutes, so the next request that starts identically is cheaper and faster.

On Anthropic's API, reading from the cache costs a tenth of the normal input price. The catch: it only matches an **identical prefix**, so one changed character early in the prompt means a miss. The usage numbers returned with each response tell you whether it hit.
:::

::: context cascade Try cheap first, escalate if needed
A model cascade sends each request to a small, cheap model first, checks the answer, and only passes it up to a bigger, pricier model if the check fails. Like a support desk where the front line handles easy calls and escalates hard ones.

It sounds like pure savings, but each model keeps its own prompt cache, so bouncing between models throws away cache discounts, and failed first attempts still cost money.
:::

::: context circuit-breaker An automatic off switch
In a house, a circuit breaker cuts the power when too much current flows, before the wires overheat. In software, a circuit breaker stops calling something automatically once a limit is crossed.

For AI spend: once today's model bill passes a set amount, new model calls are refused until someone looks. An alert only tells a person; a breaker actually stops the spending, even at 3am when nobody reads the alert.
:::

::: context unit-economics Money in and out, per customer
Unit economics is the profit or loss on **one unit** of your business, here one user per month: what they pay you minus what serving them costs (model calls, database, email, payment fees).

A product can grow fast and still lose money on every user. If a user pays \\$20 a month and their model calls cost \\$25, more users means bigger losses. AI features make this real because each request has a visible cost, and a few heavy users can cost far more than the rest.
:::

::: context webhook A service calling you back
A webhook is an HTTP request another service sends **to your server** when something happens: Stripe tells you "payment succeeded" or "subscription cancelled" by posting a message to a URL you gave it.

It saves you from asking "anything new?" over and over. But delivery is not guaranteed to be once: Stripe retries when your server does not answer in time, and can send the same event more than once. Your code has to cope.
:::

::: context atomic-decrement Subtracting safely when two requests race
Suppose a user has 1 credit and sends two requests at the same moment. Each one reads "balance 1", each subtracts 1, and the balance ends at −1: two paid requests for one credit. That is a **race condition**.

An **atomic** operation happens as one indivisible step. The database checks "at least 1 credit?" and subtracts in the same statement, so the second request sees 0 and is refused. "Concurrent hammering" means firing many simultaneous requests to prove it holds.
:::

::: context idempotent Safe to do twice
An operation is idempotent when doing it twice has the same effect as doing it once. Pressing a lift's call button five times still calls one lift. Charging a card twice is **not** idempotent.

Since webhooks can arrive more than once, the consumer records each event's unique ID and skips any ID it has already processed. A replayed "payment succeeded" then adds credits once, not twice.
:::

::: context http-402 Payment required
Every HTTP response carries a three-digit status code: 200 means OK, 404 means not found, 500 means the server broke. **402** means "Payment Required". The HTTP standard reserves it for future use and never pinned down its details, but it is the natural code for "you are out of credit".

Returning a proper 402 with a clear message, rather than a generic error, lets the app show "top up your credits" instead of "something went wrong".
:::
`;export{e as default};