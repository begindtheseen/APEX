<!-- Context notes for M9/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[regression|regression]] 1
[[failing on refactors|refactor]] 1
[[with the service key|service-key]] 1

::: context regression What a regression is
A **regression** is something that used to work and broke after a change — often a change to a different part of the code. Most bugs users meet in mature software are regressions, which is why a test is really valuable only if it would fail the day someone breaks that behaviour again.
:::

::: context refactor What refactoring means
**Refactoring** is changing how code is organized — renaming, splitting a function, moving files — without changing what it does. Good tests should stay green through a refactor, because the behaviour did not change. Tests that break every time you tidy up are checking *how* the code is written, which makes people afraid to improve it.
:::

::: context service-key Why the service key hides bugs
Supabase gives you a secret service key that ignores row-level security entirely — it is meant for trusted server code doing admin work. If a test sets up data and checks results with that key, the security policies never run, so the test passes whether your policies are right, wrong or missing. Tests about what users can see must run as a user.
:::
