<!-- Context notes for M24/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[LEGB|legb]] 2
[[truthiness|truthiness]] 2
[[generators|generators]] 2
[[pydantic|pydantic]] 2
[[FastAPI|fastapi]] 2

::: context legb Where Python looks up a name
When Python meets a name like `total`, it searches four places in order: **L**ocal (inside the current function), **E**nclosing (any function wrapped around it), **G**lobal (the module), and **B**uilt-in (names like `len` and `print`). The first match wins.

It explains surprises such as assigning to a variable inside a function quietly creating a new local one instead of changing the outer one.
:::

::: context truthiness What counts as true
Both languages let you write `if items:` with a non-boolean value, but they disagree on what counts as false. In Python, an empty list, an empty dict, an empty string, `0` and `None` are all false.

In JavaScript, an empty string and `0` are false too, but an empty array `[]` and an empty object `{}` are **true**. Code ported from TypeScript that checks "is there anything in this list?" can quietly change meaning.
:::

::: context generators Values made one at a time
A generator is a function that uses `yield` to hand back values one by one, pausing in between, instead of building a whole list first. Reading a 10 GB log file line by line with a generator uses almost no memory; loading it into a list would not fit.

JavaScript has generators too, but Python code uses them far more often, and idiomatic Python leans on them constantly.
:::

::: context pydantic Checking data at the edge of your program
Pydantic is a Python library where you describe data as a class with type hints, such as a `User` with a `name: str` and an `age: int`. When data comes in, from a request or a model's JSON output, pydantic checks it against that description and raises a clear error if it does not fit.

It plays the same role Zod plays in TypeScript: the one place untrusted data is checked before the rest of your code relies on it.
:::

::: context fastapi A Python web framework built on type hints
FastAPI is a popular Python framework for building web APIs. You write an ordinary function with type hints, and FastAPI uses those hints (through pydantic) to validate incoming requests and to generate interactive API documentation automatically.

It supports async code and streaming responses, which is why it is so common in AI backends and appears in many job postings.
:::
