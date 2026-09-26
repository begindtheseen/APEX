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

**Core concepts:** Python semantics at depth. **[[asyncio|asyncio]] and the [[blocking-call trap|blocking-call]]** — a concurrency model
that is not JavaScript’s. FastAPI with streaming responses and [[dependency injection|dependency-injection]]. Reading and debugging
idiomatic Python you did not write.

**Checkpoints** ① typed request and response models, and one streaming route · ② the blocking-call trap
reproduced: an async handler frozen, then fixed · ③ M12 eval runner ported, pytest [[faking|faking]] the model
client · ④ the type checker green in CI on the ported runner.

**Artifact** \`EVIDENCE\` — **M12’s eval runner ported to Python**, so this module extends something you
already built rather than standing alone. Typed request/response models, streaming, a pytest suite faking
the model client, type checker green in CI, plus a written runtime diff **including a reproduction of a
blocking call freezing the asyncio loop and its fix.**

::: context asyncio Python's way of waiting on many things at once
asyncio is Python's built-in library for **concurrency**: one program juggling many tasks that spend most of their time waiting, such as dozens of model API calls in flight at once.

It looks like JavaScript's \`async\`/\`await\`, but it differs in important ways. JavaScript's I/O libraries are non-blocking by nature, while much of Python's ecosystem was written before asyncio and blocks by default, so you have to pick async-ready libraries on purpose.
:::

::: context blocking-call One slow call freezes everyone
An asyncio program runs all its tasks on one **event loop**, taking turns. A task only hands over its turn at an \`await\`. If a task calls something that blocks, such as \`time.sleep\` or a regular (non-async) HTTP library, the whole loop stops until it returns.

It is like one customer at a single till who starts a long phone call: the entire queue waits. With one test user nobody notices; with fifty real users every request stalls.
:::

::: context dependency-injection Handing a function what it needs
Dependency injection means a function receives the things it depends on (a database session, a model client, the current user) from outside, instead of creating them itself.

FastAPI does this with \`Depends(...)\`: you declare what a route needs and the framework supplies it for each request. The big payoff is testing: in a test you can inject a fake model client in place of the real one.
:::

::: context faking Standing in for the real thing in tests
A **fake** (or mock) is a stand-in object that behaves like the real model client but returns canned answers instantly, for free, and the same way every time.

Unit tests check your code's logic, and a real model call would make them slow, costly and flaky. The model's actual quality is measured separately, by the eval suite.
:::
`;export{e as default};