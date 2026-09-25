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
REST and where it stops being the right answer (real APIs have action endpoints; offset pagination is
the most common correctness bug in list endpoints). **SSE and chunked transfer from scratch, no SDK.**
Production streaming failure modes: proxy buffering, client aborts, mid-stream errors, dropped
connections, resumption. **Idempotency** — why a retry is a data-corruption bug unless designed for.
Timeouts, backoff with jitter, which failures are retry-safe. Rate limiting from both sides. Webhooks —
at-least-once, signature verification on **raw bytes**. CORS; cookies vs bearer vs JWT and where each
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
`;export{e as default};