var e=`---
id: m9-the-gate
title: "Tests That Fail for the Right Reason — the gate, and what most people miss"
minutes: 1
covers:
  - "The pyramid and what each level is genuinely for"
  - "A unit test that fails for the right reason"
  - "Test doubles, and when mocking makes a test worthless"
  - "Integration tests against real Postgres, including RLS"
  - "CI as a gate, not a place tests run"
  - "The flakiness budget"
  - "Mutation testing as the instrument coverage is not"
  - "The deterministic-shell/probabilistic-core seam"
  - "Property-based tests and fuzzing for the code that parses and validates input"
---
**GATE** — **REFEREE:** your reviewer, reading the **mutation score** — a number you cannot argue with —
plus bug reports taken from **already-closed public issues** so the exercise is not self-administered.
**PASS:** a mutation score **around 70% on the module you care about**, with a written disposition for
every surviving mutant. The number is a target, not a law — it is high enough to catch assert-nothing
tests and low enough to reach, and a full-repo run against a suite with real Postgres integration tests
is slow enough that scoping it to one module is the right call. **Say which module you scored and why.**
And on a sourced bug, failing test first, then fix, explaining why the test would still fail if the fix were wrong in a
*different* way. **ON FAIL:** surviving mutants in code you claimed was covered — the tests assert
implementation, not behavior.

> Mutation score, not coverage, is the instrument that tells you whether a test would actually catch a
> [[regression|regression]] — which is exactly what "tests that fail for the right reason" asks you to prove.

**Most-missed:** Testing what the code does rather than what it should do. **A test that has never
failed has never been tested.** · \`vi.mock()\` on your own modules until the test mirrors the
implementation — [[failing on refactors|refactor]], passing on bugs. Mock at the network or process boundary, never
your own seams. · Mocking the Supabase client and asserting on \`.from().select()\` chains — that tests
your mental model of Supabase. · Seeding *and* asserting [[with the service key|service-key]], bypassing RLS entirely, so
the test proves nothing about what a real user sees. · \`retries: 2\` or \`sleep(500)\` (pause half a second), which hides
the bug and triples the suite time.

::: context regression What a regression is
A **regression** is something that used to work and broke after a change — often a change to a different part of the code. Most bugs users meet in mature software are regressions, which is why a test is really valuable only if it would fail the day someone breaks that behaviour again.
:::

::: context refactor What refactoring means
**Refactoring** is changing how code is organized — renaming, splitting a function, moving files — without changing what it does. Good tests should stay green through a refactor, because the behaviour did not change. Tests that break every time you tidy up are checking *how* the code is written, which makes people afraid to improve it.
:::

::: context service-key Why the service key hides bugs
Supabase gives you a secret service key that ignores row-level security entirely — it is meant for trusted server code doing admin work. If a test sets up data and checks results with that key, the security policies never run, so the test passes whether your policies are right, wrong or missing. Tests about what users can see must run as a user.
:::
`;export{e as default};