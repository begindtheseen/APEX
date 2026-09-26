var e=`---
id: m7-the-module
title: "HTTP, Streaming, and the Wire — what to understand and what to build"
minutes: 2
covers:
  - 'HTTP as a wire format: the status codes and headers that carry meaning in practice — write your own list and be able to defend each entry, because "about twelve headers matter" invites "which twelve?" and there is no list you did not choose'
  - "REST and where it stops being the right answer"
  - "SSE and chunked transfer, from scratch, no SDK"
  - "Production streaming failures: proxy buffering, aborts, mid-stream errors, resumption"
  - "Idempotency — why a retry corrupts data unless designed for"
  - "Timeouts, backoff with jitter, which failures are retry-safe"
  - "Rate limiting from both sides"
  - "Webhooks: at-least-once, signature verification on the raw bytes"
  - "CORS; cookies vs bearer vs JWT and where each breaks"
---
**Core concepts:** HTTP as a wire format — the status codes and headers that carry meaning in practice.
**Write your own list and be able to defend each entry**, because "about twelve headers matter" invites
"which twelve?" and there is no list you did not choose.
[[REST|rest]] and where it stops being the right answer (real APIs have action endpoints; [[offset pagination|offset-pagination]] is
the most common correctness bug in list endpoints). **[[SSE|sse]] and chunked transfer from scratch, [[no SDK|sdk]].**
Production streaming failure modes: [[proxy buffering|proxy-buffering]], client aborts, mid-stream errors, dropped
connections, resumption. **Idempotency** — why a retry is a data-corruption bug unless designed for.
Timeouts, backoff with jitter, which failures are retry-safe. [[Rate limiting|rate-limiting]] from both sides. [[Webhooks|webhooks]] —
at-least-once, signature verification on **raw bytes**. [[CORS|cors]]; cookies vs bearer vs JWT and where each
breaks.

**Checkpoints** ① read and write one HTTP request by hand, no client library · ② a working SSE frame
parser against a deliberately chunk-split fixture · ③ the streaming proxy end to end, no SDK · ④
\`AbortController\` wired through: killing the client stops upstream billing · ⑤ proxy buffering and a
mid-stream error reproduced, and recovered from both · ⑥ the idempotency table: same key twice, one row.

**Artifact** \`EVIDENCE\` — **the streaming LLM proxy.** Raw \`fetch\`, raw \`ReadableStream\`, hand-parsed
SSE frames, no SDK. \`AbortController\` end to end. A Postgres idempotency-key dedupe table. Deliberately
reproduces proxy buffering and a mid-stream error, and recovers from both. The flagship server, written
in plain JavaScript in M2, is rebuilt in TypeScript here — this is the module where that move happens.

> **Exported, and named so the consumers are checkable:** the **SSE transport** → M22. The
> **idempotency table** → M8, M20.

> **One load-bearing detail.** The wire format you define here is the one M22’s client has to consume,
> and M22 consumes it through **a custom transport you write** — not the prebuilt default of the popular
> AI frontend library, which expects its own versioned wire format. That join is not free; **budget it
> now** (it is in the 45h), and check the current wire format the week you build it. The path of least
> resistance when stuck deletes this module’s reason to exist.

::: context rest What REST means
**REST** is the most common style for web APIs. Web addresses name *things* — \`/users/42\`, \`/orders\` — and the HTTP method says what to do with them: GET reads, POST creates, PATCH or PUT changes, DELETE removes. It fits naturally until you need an *action*, like "cancel this order" or "retry this payment," which is why real APIs end up with endpoints like \`POST /orders/42/cancel\`.
:::

::: context offset-pagination Why offset pagination skips and repeats
Offset pagination asks for "20 items, skipping the first 20" to get page two. If a new item is added at the top while someone is paging, everything slides down one place, so the last item of page one shows up again on page two; a deletion makes one item vanish between pages. **Cursor** pagination — "the 20 items after item #8812" — does not have this problem.
:::

::: context sse What SSE is
**Server-Sent Events** are a simple standard for a server to keep one HTTP response open and push messages down it as they happen. Each message is a few lines of text such as \`data: Hello\` followed by a blank line. It flows one way, server to browser, which is exactly what streaming a model's answer word by word needs.
:::

::: context sdk What an SDK is
An **SDK** (software development kit) is a ready-made library a company publishes so you can use its service without writing raw web requests — you call a function and it handles the details. Doing it once *without* the SDK shows you what those details are, which is what you need when the SDK's behaviour surprises you in production.
:::

::: context proxy-buffering Why a stream can arrive all at once
Between your server and the user there are often other servers — proxies, load balancers, content-delivery networks. Some of them collect a response before passing it on, to be efficient. For a normal page that is harmless. For a streamed answer it means the user stares at nothing for twenty seconds and then gets the whole reply in one lump.
:::

::: context rate-limiting What rate limiting is
A **rate limit** caps how many requests someone may make in a period — say, 50 a minute. Go over and the service answers **429 Too Many Requests**, often with a header saying how long to wait. "From both sides" means you must behave well under your model provider's limits, and you must set limits of your own so one user, or one script, cannot use up your budget.
:::

::: context webhooks What a webhook is
Instead of you asking a service "has anything happened yet?" over and over, the service calls a URL on *your* server when something happens — a payment succeeds, a repository gets a new commit. Senders often deliver the same event more than once, so your handler must cope with repeats. The request carries a **signature** computed from its exact bytes and a shared secret, so you can check it really came from them.
:::

::: context cors What CORS is
Browsers stop a web page's code from reading responses from a *different* site unless that site says it is allowed, using special headers. That rule is **CORS** (cross-origin resource sharing), and it is behind many confusing "blocked by CORS policy" errors. It protects users in the browser only: it does nothing to stop a script or \`curl\` from calling your server directly.
:::
`;export{e as default};