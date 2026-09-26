<!-- Context notes for M24/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[the idiom differs|idiom]] 1
[[camelCase|naming-case]] 1
[[compile-then-trust contract|runtime-hints]] 1

::: context idiom Writing it the way natives do
An idiom is the usual, expected way to express something in a language. Code can be correct and still unidiomatic, like a sentence that is grammatical but that no native speaker would say.

Reviewers notice it at once, and in a job interview or a code review it signals how much of the language you really know. A test cannot check for it, which is why this gate needs a human.
:::

::: context naming-case camelCase versus snake_case
JavaScript and TypeScript name variables and functions in **camelCase**: `userName`, `getOrders`. Python's style guide, PEP 8, uses **snake_case**: `user_name`, `get_orders`, with CamelCase kept for class names.

It seems small, but it is the first thing a Python reviewer notices, and tools like `ruff` flag it automatically.
:::

::: context runtime-hints Type hints are not enforced
In TypeScript, the compiler checks types and then you trust them. Python type hints are different: the Python interpreter ignores them when the code runs. A function marked as taking an `int` will happily accept a string.

Only a separate type checker (mypy, pyright) reads the hints, before running. So data arriving from outside still needs checking at runtime, which is the job pydantic does.
:::
