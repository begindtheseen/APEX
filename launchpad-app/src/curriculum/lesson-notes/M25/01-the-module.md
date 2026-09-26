<!-- Context notes for M25/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[asyncio|asyncio]] 2
[[blocking-call trap|blocking-call]] 2
[[dependency injection|dependency-injection]] 2
[[faking|faking]] 1

::: context asyncio Python's way of waiting on many things at once
asyncio is Python's built-in library for **concurrency**: one program juggling many tasks that spend most of their time waiting, such as dozens of model API calls in flight at once.

It looks like JavaScript's `async`/`await`, but it differs in important ways. JavaScript's I/O libraries are non-blocking by nature, while much of Python's ecosystem was written before asyncio and blocks by default, so you have to pick async-ready libraries on purpose.
:::

::: context blocking-call One slow call freezes everyone
An asyncio program runs all its tasks on one **event loop**, taking turns. A task only hands over its turn at an `await`. If a task calls something that blocks, such as `time.sleep` or a regular (non-async) HTTP library, the whole loop stops until it returns.

It is like one customer at a single till who starts a long phone call: the entire queue waits. With one test user nobody notices; with fifty real users every request stalls.
:::

::: context dependency-injection Handing a function what it needs
Dependency injection means a function receives the things it depends on (a database session, a model client, the current user) from outside, instead of creating them itself.

FastAPI does this with `Depends(...)`: you declare what a route needs and the framework supplies it for each request. The big payoff is testing: in a test you can inject a fake model client in place of the real one.
:::

::: context faking Standing in for the real thing in tests
A **fake** (or mock) is a stand-in object that behaves like the real model client but returns canned answers instantly, for free, and the same way every time.

Unit tests check your code's logic, and a real model call would make them slow, costly and flaky. The model's actual quality is measured separately, by the eval suite.
:::
