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
vs values, [[LEGB|legb]], [[truthiness|truthiness]], [[generators|generators]]. pytest. Type hints with a checker in CI. [[pydantic|pydantic]] as the runtime
validation boundary. One typed [[FastAPI|fastapi]] route.

**Artifact** \`LAB\` — current tooling: \`uv\`, \`ruff\`, and **one type checker you pin by name and
version** — mypy and pyright are the two you will meet most, with faster newer ones arriving; pick one,
write down which and when you chose it, and expect the name to age faster than the idea. Python semantics where they differ from TS, each proved by a small script. pytest. Type hints with
a checker green in CI. pydantic as the validation boundary. One typed FastAPI route with a test.

::: context legb Where Python looks up a name
When Python meets a name like \`total\`, it searches four places in order: **L**ocal (inside the current function), **E**nclosing (any function wrapped around it), **G**lobal (the module), and **B**uilt-in (names like \`len\` and \`print\`). The first match wins.

It explains surprises such as assigning to a variable inside a function quietly creating a new local one instead of changing the outer one.
:::

::: context truthiness What counts as true
Both languages let you write \`if items:\` with a non-boolean value, but they disagree on what counts as false. In Python, an empty list, an empty dict, an empty string, \`0\` and \`None\` are all false.

In JavaScript, an empty string and \`0\` are false too, but an empty array \`[]\` and an empty object \`{}\` are **true**. Code ported from TypeScript that checks "is there anything in this list?" can quietly change meaning.
:::

::: context generators Values made one at a time
A generator is a function that uses \`yield\` to hand back values one by one, pausing in between, instead of building a whole list first. Reading a 10 GB log file line by line with a generator uses almost no memory; loading it into a list would not fit.

JavaScript has generators too, but Python code uses them far more often, and idiomatic Python leans on them constantly.
:::

::: context pydantic Checking data at the edge of your program
Pydantic is a Python library where you describe data as a class with type hints, such as a \`User\` with a \`name: str\` and an \`age: int\`. When data comes in, from a request or a model's JSON output, pydantic checks it against that description and raises a clear error if it does not fit.

It plays the same role Zod plays in TypeScript: the one place untrusted data is checked before the rest of your code relies on it.
:::

::: context fastapi A Python web framework built on type hints
FastAPI is a popular Python framework for building web APIs. You write an ordinary function with type hints, and FastAPI uses those hints (through pydantic) to validate incoming requests and to generate interactive API documentation automatically.

It supports async code and streaming responses, which is why it is so common in AI backends and appears in many job postings.
:::
`;export{e as default};