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
> regression — which is exactly what "tests that fail for the right reason" asks you to prove.

**Most-missed:** Testing what the code does rather than what it should do. **A test that has never
failed has never been tested.** · \`vi.mock()\` on your own modules until the test mirrors the
implementation — failing on refactors, passing on bugs. Mock at the network or process boundary, never
your own seams. · Mocking the Supabase client and asserting on \`.from().select()\` chains — that tests
your mental model of Supabase. · Seeding *and* asserting with the service key, bypassing RLS entirely, so
the test proves nothing about what a real user sees. · \`retries: 2\` or \`sleep(500)\` (pause half a second), which hides
the bug and triples the suite time.
`;export{e as default};