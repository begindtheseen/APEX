# Writing Learn-to-code courses

Every course is one plain-text file in `src/learn/tracks/`. The app loads every
file there by itself (see `platform.ts`); adding a course is adding a file.

## Files and ids

| File                       | Course id               | Level        |
| -------------------------- | ----------------------- | ------------ |
| `python.txt`               | `python`                | basics       |
| `python.intermediate.txt`  | `python-intermediate`   | intermediate |
| `python.advanced.txt`      | `python-advanced`       | advanced     |
| `python.expert.txt`        | `python-expert`         | expert       |
| `python.projects.txt`      | `python-projects`       | projects     |

The header of a non-basics file:

```
@track python
@level advanced
@title Python · Advanced
@name Python, advanced: generators, decorators and design
@blurb One or two sentences on what this course makes you able to do.
```

`@title` is short (breadcrumbs); `@name` is the course's full name (roadmap
tiles, the course page). Lesson ids are unique across the whole app: use the
prefix you were given (`py3-01`, `py3-02`, …).

## The lesson format

Read the comment at the top of `parse.ts`: it is the spec. In short:

```
=== py3-04 | Generators: values on demand
--- teach
Markdown. Explain the idea properly, with examples.
--- task
Markdown. The one thing to do. Say exactly what to name things.
--- starter
code the editor opens with
--- solution
code that passes every check
--- hint
Revealed one at a time. Two or three, from a nudge to nearly the answer.
--- stdin
(optional) input the program reads — Python and C++
--- schema
(optional, SQL) the tables this lesson starts from; or @schema…@end in the header
--- check case | countdown(3) yields 3, 2, 1
list(countdown(3))
=> [3, 2, 1]
```

### Check kinds

| Kind          | Proves                                                          | Languages            |
| ------------- | --------------------------------------------------------------- | -------------------- |
| `output`      | everything printed equals the text (trailing space ignored)     | all that print       |
| `includes`    | the output contains each line                                   | all that print       |
| `case`        | a call equals the expected value (the language's own equality) | Python, JS, TS, C++  |
| `test`        | an expression is true                                           | Python, JS, TS, C++  |
| `type-error`  | this code does NOT type-check (the compiler rejects it)         | TypeScript           |
| `result`      | the last result set of her SQL (`ordered` optional)             | SQL                  |
| `query`       | a query run after hers returns these rows                       | SQL                  |
| `dom`         | steps run inside the rendered page (see `lib/web.ts`)           | HTML                 |
| `shell`       | facts about the practice shell afterwards (see `grade.ts`)      | Terminal, Git        |
| `source`      | her code matches (or, `absent`, does not match) a regex         | all — never alone    |

A line in a check starting `?? ` is that check's hint.

How checks run: her code runs first, unchanged; a harness appended after it
evaluates `case`/`test` checks. So they call functions, classes and variables
she defined. Helpers inside checks: `raises(ErrorType, fn)` in Python,
`throws(fn)` in JavaScript/TypeScript. In **C++ the harness supplies `main()`**:
a C++ lesson with `case`/`test` checks asks for functions or classes and has no
`main`; a C++ lesson that asks for a whole program uses `output`/`includes` with
`stdin`. Case values are compared with `==` (so `std::vector`, `std::map`,
`std::string`, numbers all work); floats: compare with a tolerance in a `test`.

## The two rules the checker enforces

1. **The starter must NOT pass.** The lesson asks for work.
2. **The solution MUST pass every check.** The lesson can be passed.

Verify your course — it runs the real runtimes (Pyodide, the TypeScript
compiler, sql.js, clang in WebAssembly, Chromium, the practice shell):

```
cd launchpad-app
VERIFY=python-advanced npx vitest run src/learn/verify.test.ts
VERIFY=python-advanced VERIFY_LESSON=py3-04,py3-05 npx vitest run src/learn/verify.test.ts
npx vitest run src/learn/learn.test.ts        # format and structure rules
```

Both must be green before a course is done.

## What the runtimes can and cannot do

- **Python** — CPython 3.14 (Pyodide 314), standard library only (NumPy exists in
  the app but not in the checker: do not use it). `input()` reads `stdin`.
  Each run starts from an empty namespace. `asyncio` works (top-level `await`
  too). Files: an in-memory filesystem — `open()` works within one run.
- **JavaScript** — the body of an async function in a worker: top-level
  `await`, timers (the run waits for them), no DOM, no Node (`require`, `fs`,
  `process` are absent), no network. `console.log` of objects prints like
  `{ a: 1, b: [ 1, 2 ] }`, strings inside objects in double quotes.
- **TypeScript** — `strict`, target ES2022, libs `es2022` + `webworker`. A type
  error stops the run. `type-error` checks prove a type rejects what it
  should: the check's code must fail to compile against her code.
- **C++** — clang, C++20, `-Wall -Wextra`, **exceptions are OFF** (`throw`,
  `try` do not compile): signal errors with `std::optional`, return codes,
  `std::variant`, or an error struct. Standard library available (containers,
  algorithms, `<memory>`, `<optional>`, `<variant>`, `<functional>`,
  `<numeric>`, `<ranges>`, `<sstream>`, `<iomanip>`, `<cmath>`). Each run
  compiles (a few seconds).
- **SQL** — SQLite (sql.js): CTEs, recursive CTEs, window functions, UPSERT,
  `RETURNING`, JSON functions, generated columns, triggers, views,
  `EXPLAIN QUERY PLAN` (a query check can read its `detail` column). Every run
  starts from a fresh database built from the lesson's schema.
- **Web** — her HTML (with `<style>` and `<script>`) in a sandboxed iframe
  800×600, no network, no `localStorage` (it throws), no `alert` flows. Each
  `dom` check gets a freshly loaded page. Steps: `click <sel>`, `type <sel>
  <text>`, `press <sel> <Key>` (focuses it and sends the key: `Enter`,
  `Escape`, `Tab`, `ArrowDown`, `Space`, `Ctrl+k`…; Enter/Space activate buttons and links
  the way a real keyboard does), `wait <ms>` (up to 3000; the steps after it
  run once the time has passed — for timers, debounce, `fetch`-free async
  code), and assertions `<sel> exists|missing|focused|count <op> N|text <op>
  v|value <op> v|attr <name> <op> v|style <prop> <op> v|class <name>` (ops
  `==`, `!=`, `contains`, `>=`, `<=`, `>`, `<`). Computed styles come back as
  the browser reports them (`rgb(…)`, `px`).
  **Forms:** a sandboxed page cannot really submit, so the checker stands in:
  a click on a submit button (or Enter in a text field) runs the browser's
  validation (`required`, `pattern`, `type=email`… — an invalid form does not
  submit) and then fires a cancelable `submit` event on the form, which her
  script handles (`event.preventDefault()` and all). A `method="dialog"` form
  closes its `<dialog>`. Nothing navigates.
- **Terminal / Git** — the practice shell in `lib/shell.ts` (read `HELP` and
  the command list). The `starter` of a shell lesson is setup commands run
  silently before she starts; the `solution` is the commands she would type,
  one per line; checks are `shell` facts (`checkFact` in `grade.ts`).

## What makes a good lesson here

- **Teach properly.** A real explanation with a worked example, the why as
  well as the how, the mistake people make. Code examples in `teach` must be
  correct: in the app they are runnable in place (Python/JS/TS examples with
  no print of their own run console-style, each expression line showing its
  value; `>>>` transcripts work too; C++ examples run only if they have
  `main`).
- **One clear task**, precise about names and behaviour. Say what the
  function is called, what it takes and what it returns.
- **Checks that mean something**: behaviour, edge cases (empty input, one
  element, duplicates, negatives), and for problem-solving lessons a large
  input that only an efficient solution finishes in time. Never grade on the
  source alone.
- **Hints** go from a nudge to nearly the answer. Never the answer outright.
- Second person ("you"), plain English, no filler. No text copied from
  anywhere else.

### The lesson kinds every course past the basics mixes in

- **Concept** — a new idea, then implement it.
- **Debugging** — the starter is realistic code with a real bug (and a bug
  report as the task: what was expected, what happened). The teach section
  teaches the *method* — reproduce, read the error, check assumptions, narrow
  down, print/inspect, fix the cause not the symptom. Checks prove the fix.
- **Problem solving** — a problem statement with examples; she designs the
  algorithm. Teach the approach (restate, examples, brute force first, find
  the pattern, improve), include edge cases and a big input.
- **Design** — refactor messy working code into a better shape (behaviour
  checks keep it working; `source` checks can confirm the structure asked
  for), or design an API/data model to a spec.
- **Build** — part of a larger program, one step per lesson, each lesson's
  starter picking up where the last solution left off.

The **projects** course is several real programs built step by step, then
**capstones**: a specification, an empty (or nearly empty) starter, and
behaviour checks only — she decides the design. That is where "can build
anything on their own" is proved.
