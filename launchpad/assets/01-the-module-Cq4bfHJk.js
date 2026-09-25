var e=`---
id: m24-the-module
title: "Python On-Ramp — what to understand and what to build"
minutes: 1
covers:
  - "Environments and dependencies on current tooling (uv, ruff, one pinned type checker)"
  - "Python semantics where they differ from TypeScript: names vs values, LEGB, truthiness, generators"
  - "pytest"
  - "Type hints with a checker in CI"
  - "pydantic as the runtime validation boundary"
  - "One typed FastAPI route"
---
Deliberately small: a single large Python module sitting near the end of the program is the most likely
thing to be cut under deadline pressure. **Plan on the trip-wire firing.** Python appears in most
AI-engineering postings, so the earlier slot is the base case and this late one is the exception. The bet
this program is actually making is that learning correctness once in TypeScript and then porting it beats
splitting your attention across two languages from month one — **not that you can avoid Python.**

**Core concepts:** Environments and dependencies on current tooling — **\`uv\`, \`ruff\`, one pinned type
checker.** (The names have a shelf life; the module is unchanged if they move.) Python semantics where they differ from TypeScript — names
vs values, LEGB, truthiness, generators. pytest. Type hints with a checker in CI. pydantic as the runtime
validation boundary. One typed FastAPI route.

**Artifact** \`LAB\` — current tooling: \`uv\`, \`ruff\`, and **one type checker you pin by name and
version** — mypy and pyright are the two you will meet most, with faster newer ones arriving; pick one,
write down which and when you chose it, and expect the name to age faster than the idea. Python semantics where they differ from TS, each proved by a small script. pytest. Type hints with
a checker green in CI. pydantic as the validation boundary. One typed FastAPI route with a test.
`;export{e as default};