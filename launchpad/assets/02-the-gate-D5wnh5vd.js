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
small Python service in 60 minutes, and explain each place [[the idiom differs|idiom]] from what you would write in
TypeScript. **ON FAIL:** the idiom is wrong — a passing test cannot catch this, which is why the referee
is human.

**Most-missed:** Writing TypeScript with Python syntax: classes everywhere, raw \`dict\`s, no type hints,
[[camelCase|naming-case]]. That is the thing a Python reviewer notices first. · Assuming the tool you learned is the tool
the job uses. \`uv\` is the current default and the right one to learn here, **but poetry is widely used in
production teams, pyenv solves a real problem in interpreter-version management, and conda is still
standard in ML-adjacent organizations.** If a posting stack names one of them, learn it in an afternoon
and say nothing — nobody is judging you for the packaging tool, and being doctrinaire about it is its own
bad signal. · Assuming type hints behave like TypeScript’s [[compile-then-trust contract|runtime-hints]].

::: context idiom Writing it the way natives do
An idiom is the usual, expected way to express something in a language. Code can be correct and still unidiomatic, like a sentence that is grammatical but that no native speaker would say.

Reviewers notice it at once, and in a job interview or a code review it signals how much of the language you really know. A test cannot check for it, which is why this gate needs a human.
:::

::: context naming-case camelCase versus snake_case
JavaScript and TypeScript name variables and functions in **camelCase**: \`userName\`, \`getOrders\`. Python's style guide, PEP 8, uses **snake_case**: \`user_name\`, \`get_orders\`, with CamelCase kept for class names.

It seems small, but it is the first thing a Python reviewer notices, and tools like \`ruff\` flag it automatically.
:::

::: context runtime-hints Type hints are not enforced
In TypeScript, the compiler checks types and then you trust them. Python type hints are different: the Python interpreter ignores them when the code runs. A function marked as taking an \`int\` will happily accept a string.

Only a separate type checker (mypy, pyright) reads the hints, before running. So data arriving from outside still needs checking at runtime, which is the job pydantic does.
:::
`;export{e as default};