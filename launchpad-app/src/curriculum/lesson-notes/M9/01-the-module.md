<!-- Context notes for M9/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[The pyramid|test-pyramid]] 2
[[Test doubles|test-doubles]] 2
[[Integration tests|integration-tests]] 2
[[CI as a gate|ci-gate]] 2
[[flakiness budget|flakiness]] 2
[[Mutation testing|mutation-testing]] 2
[[ESM|esm]] 1

::: context test-pyramid The test pyramid
A picture popularized by Mike Cohn: lots of small, fast **unit tests** at the bottom, each checking one function; fewer **integration tests** in the middle, checking that real pieces work together; and only a handful of slow **end-to-end tests** at the top, driving the whole app like a user. The higher the level, the more it proves and the slower and more fragile it is.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 140" font-family="Inter, Arial, sans-serif">
  <polygon points="180,10 222,50 138,50" fill="#b4232c" opacity="0.85"/>
  <polygon points="138,50 222,50 264,90 96,90" fill="#f2b880"/>
  <polygon points="96,90 264,90 306,130 54,130" fill="#8fb8f0"/>
  <text x="180" y="42" font-size="11" text-anchor="middle" fill="#ffffff">e2e</text>
  <text x="180" y="75" font-size="12" text-anchor="middle" fill="#1f2a44">integration</text>
  <text x="180" y="115" font-size="12" text-anchor="middle" fill="#1f2a44">unit</text>
  <text x="310" y="40" font-size="11" text-anchor="middle" fill="#6c7a93">few, slow</text>
  <text x="330" y="118" font-size="11" text-anchor="middle" fill="#6c7a93">many, fast</text>
</svg>
```
:::

::: context test-doubles What a test double is
Named after a stunt double: a stand-in used in a test instead of a real part. A **stub** returns canned answers; a **fake** is a simple working version, like an in-memory database; a **spy** records how it was called; a **mock** checks it was called in a particular way. Replace too much of your own code with doubles and the test ends up checking only the doubles.
:::

::: context integration-tests What an integration test is
A unit test checks one piece alone. An **integration test** checks that real pieces work together — here, your code talking to a real Postgres database with its real security policies switched on. They are slower to run, but they catch the bugs that live in the joins: a wrong column name, a policy that blocks a legitimate user, a query that works on fake data only.
:::

::: context ci-gate CI as a gate
On GitHub you can mark CI checks as **required**: a change cannot be merged until the automated tests pass on it. That is the difference between tests that *run* and tests that *decide*. A suite anyone can merge past when it is red is a suggestion, and the codebase drifts back to broken.
:::

::: context flakiness What a flaky test is
A **flaky** test sometimes passes and sometimes fails on the same code — because of timing, the order tests run in, or a network call. Flaky tests teach a team to click "re-run" and ignore red, and then a real failure gets ignored too. A flakiness budget is the written limit on how much of that you tolerate before fixing it becomes the top priority.
:::

::: context mutation-testing What mutation testing is
A mutation-testing tool (Stryker is the common one for JavaScript) makes small deliberate bugs in your code — turning `>` into `>=`, `+` into `-`, deleting a line — and runs your tests against each one. If the tests still pass, that "mutant" **survived**: your tests do not check that behaviour. Coverage only tells you a line *ran* during the tests, not that anything noticed if it was wrong.
:::

::: context esm What ESM is
**ESM** (ECMAScript modules) is the official way JavaScript files share code, with `import` and `export`. Node's older system, CommonJS, uses `require()`. Both are still everywhere, and mixing them causes a well-known class of confusing setup errors — one reason a test runner that handles ESM and TypeScript without extra configuration saves real time.
:::
