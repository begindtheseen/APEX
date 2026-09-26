var e=`---
id: m7-the-gate
title: "HTTP, Streaming, and the Wire — the gate, and what most people miss"
minutes: 1
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
**GATE** — **REFEREE:** your reviewer, reading the server logs and a database row count — both are facts
neither of you can argue with. **PASS:** kill the client mid-generation and show from logs that upstream
billing stopped; replay one idempotency key twice and show exactly one row; narrate what arrives on the
wire between first byte and first rendered token. **ON FAIL:** rebuild the frame parser against a
deliberately chunk-split fixture.

**Most-missed:** \`chunk.toString().split('\\n')\` — corrupts output the moment a frame splits across [[TCP|tcp]]
chunks, and works perfectly on [[localhost|localhost]], so it ships. · Assuming HTTP 200 means the whole response
succeeded; the status commits before the body exists. · Writing the assistant message to the database only in
\`finally\`/\`onFinish\`, which on serverless may never run. · \`200 { ok: false }\`, which breaks every retry
library, monitor and [[health check|health-check]]. · A client-generated idempotency key per *render* instead of per
*logical operation*. · Doing webhook work before responding, so the provider times out and retries,
multiplying the work.

::: context tcp TCP does not keep your pieces
**TCP** is the layer underneath HTTP that delivers bytes reliably and in order. It does *not* promise to deliver them in the pieces you sent. One message may arrive split across two chunks, or two messages may arrive glued together. Code that assumes each chunk is one complete line works until the network decides otherwise.
:::

::: context localhost Why localhost hides bugs
**localhost** means your own machine, acting as both client and server. Nothing crosses a real network, so data tends to arrive fast and in large, whole pieces. Bugs that depend on slow links, split chunks or dropped connections simply do not happen there, which is why "it works on my machine" proves so little.
:::

::: context health-check What a health check is
Hosting platforms and monitoring tools regularly call a small address on your app, such as \`/health\`, and read the status code. A 200 means "healthy, keep sending traffic"; an error means "take this copy out or wake someone up." Answering 200 with an error hidden in the body tells every one of those tools that all is well.
:::
`;export{e as default};