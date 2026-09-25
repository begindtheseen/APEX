var e=`---
id: m9-the-module
title: "Tests That Fail for the Right Reason — what to understand and what to build"
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
**Core concepts:** The pyramid and what each level is genuinely for. A unit test that fails for the right
reason. Test doubles and when mocking makes a test worthless. Integration tests against real Postgres
including RLS. CI as a gate, not a place tests run. The flakiness budget. **Mutation testing as the
instrument coverage is not.** **The seam between deterministic shell and probabilistic core.**

**Checkpoints** ① one unit test that fails for the right reason, then passes · ② the four test doubles,
each used once where it belongs · ③ integration tests against real Postgres, including two RLS policies ·
④ the record-replay model client, with a split-frame stream recorded · ⑤ green required check in CI, plus
a mutation score at or above 70% on the module you scored.

**Artifact** \`LAB\` — one shipped repo from zero tests to a green required check: about fifteen unit, five
integration against real local Postgres including two RLS policies, CI as a merge gate, a written
flakiness budget, **and a mutation-testing run with a disposition written for every surviving mutant.**
**The runner moves from M3’s bare \`node --test\` to vitest here** for watch mode, TypeScript and ESM
handling without a build step, and the fixture ergonomics — **not because \`node:test\` lacks mocking**,
which it has had for years in \`mock.fn\`, \`mock.method\`, \`mock.timers\` and \`mock.module\`. Say which of
those reasons is actually yours; a reviewer who runs Node’s test runner daily will ask.

**Plus the single most reused fixture in this curriculum, built once here:** a **record-replay model
client** in TypeScript covering a streamed response **with frames deliberately split mid-frame and
mid-multibyte-character** (the grapheme case from M4 and the frame parser from M7), a tool-use block,
and a refusal carrying its \`stop_details\`.

> **Exported:** the record-replay model client → M12 (the zero-cost CI tier).
`;export{e as default};