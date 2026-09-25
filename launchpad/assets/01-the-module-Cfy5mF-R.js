var e=`---
id: m25-the-module
title: "Python as a Second Production Language — what to understand and what to build"
minutes: 1
covers:
  - "Python semantics at depth"
  - "asyncio and the blocking-call trap — a concurrency model that is not JavaScript’s"
  - "FastAPI with streaming responses and dependency injection"
  - "Reading and debugging idiomatic Python you did not write"
---
**Trip-wire from M0:** if eight or more of your twenty postings ask for Python — **which is the likely
case** — **M24 and then this module run immediately after M12 and the hard gate**, and you are already on
the alternate ordering. **If the trip-wire has fired, do not then reach for the cut order’s "M25 second
half" line**, whose condition is the inverse: you cannot both move Python earlier because the market asks
for it and cut it because the market does not.

**Core concepts:** Python semantics at depth. **asyncio and the blocking-call trap** — a concurrency model
that is not JavaScript’s. FastAPI with streaming responses and dependency injection. Reading and debugging
idiomatic Python you did not write.

**Checkpoints** ① typed request and response models, and one streaming route · ② the blocking-call trap
reproduced: an async handler frozen, then fixed · ③ M12 eval runner ported, pytest faking the model
client · ④ the type checker green in CI on the ported runner.

**Artifact** \`EVIDENCE\` — **M12’s eval runner ported to Python**, so this module extends something you
already built rather than standing alone. Typed request/response models, streaming, a pytest suite faking
the model client, type checker green in CI, plus a written runtime diff **including a reproduction of a
blocking call freezing the asyncio loop and its fix.**
`;export{e as default};