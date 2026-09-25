var e=`---
id: m24-the-gate
title: "Python On-Ramp — the gate, and what most people miss"
minutes: 1
covers:
  - "Environments and dependencies on current tooling (uv, ruff, one pinned type checker)"
  - "Python semantics where they differ from TypeScript: names vs values, LEGB, truthiness, generators"
  - "pytest"
  - "Type hints with a checker in CI"
  - "pydantic as the runtime validation boundary"
  - "One typed FastAPI route"
---
**GATE** — **REFEREE:** your reviewer, with a timer. **PASS:** add a typed route and a test to your own
small Python service in 60 minutes, and explain each place the idiom differs from what you would write in
TypeScript. **ON FAIL:** the idiom is wrong — a passing test cannot catch this, which is why the referee
is human.

**Most-missed:** Writing TypeScript with Python syntax: classes everywhere, raw \`dict\`s, no type hints,
camelCase. That is the thing a Python reviewer notices first. · Assuming the tool you learned is the tool
the job uses. \`uv\` is the current default and the right one to learn here, **but poetry is widely used in
production teams, pyenv solves a real problem in interpreter-version management, and conda is still
standard in ML-adjacent organizations.** If a posting stack names one of them, learn it in an afternoon
and say nothing — nobody is judging you for the packaging tool, and being doctrinaire about it is its own
bad signal. · Assuming type hints behave like TypeScript’s compile-then-trust contract.
`;export{e as default};