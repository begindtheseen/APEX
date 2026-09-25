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

**Most-missed:** \`chunk.toString().split('\\n')\` — corrupts output the moment a frame splits across TCP
chunks, and works perfectly on localhost, so it ships. · Assuming HTTP 200 means the whole response
succeeded; the status commits before the body exists. · Writing the assistant message to the database only in
\`finally\`/\`onFinish\`, which on serverless may never run. · \`200 { ok: false }\`, which breaks every retry
library, monitor and health check. · A client-generated idempotency key per *render* instead of per
*logical operation*. · Doing webhook work before responding, so the provider times out and retries,
multiplying the work.
`;export{e as default};