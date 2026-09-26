<!-- Context notes for M4/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[each hold a pool of M|pool-math]] 1
[[Believing a transaction prevents the race|atomicity-isolation]] 1

::: context pool-math Why pools multiply
Each serverless copy of your app gets its own pool. If the platform runs 50 copies at a busy moment and each holds a pool of 10 connections, the database is asked for 500. Postgres, by default, allows 100 connections in total, so the extra requests are refused. The fix is usually a shared pooler that sits in front of the database, or much smaller pools per copy.
:::

::: context atomicity-isolation Atomicity is not isolation
A **transaction** groups changes so they all happen or none do — that is *atomicity*. Whether two transactions running at the same moment can trip over each other is a separate property, *isolation*. With Postgres's default setting, two transactions can both read a balance of 100, both add to it, and both write back, and one addition is lost. Locking the row while you read it, or asking for stricter isolation, prevents that.
:::
