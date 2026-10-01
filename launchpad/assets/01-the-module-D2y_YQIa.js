var e=`---
id: m5-the-module
title: "The Postgres Underneath Supabase — what to understand and what to build"
minutes: 5
covers:
  - "Relational modeling — constraints as the thing that actually enforces invariants"
  - "SQL without an ORM: joins, aggregates, CTEs, window functions"
  - "Indexes and EXPLAIN (ANALYZE, BUFFERS) — the slow-to-fast loop"
  - "Transactions, isolation, the lost update"
  - "N+1 queries"
  - "Connection pooling and the Vercel+Supabase failure mode"
  - "RLS: correct first, then fast"
  - "Expand/contract as a concept"
  - "Asymptotic complexity, taught here because here it is measurable"
  - "The planner: force each join strategy with enable_hashjoin/enable_mergejoin/enable_nestloop off and time all three on the same query, so its choice becomes a decision you watched it make"
  - "Estimated vs actual rows — the first thing to say about any plan; one query where stale ANALYZE or a correlated predicate breaks the estimate"
  - "The isolation levels: Postgres accepts four names and behaves in three ways, because READ UNCOMMITTED behaves as READ COMMITTED. Show that M4’s lost update survives READ COMMITTED (the default, which is why putting it in a transaction fails) and is caught under REPEATABLE READ — caught, not silently fixed: the transaction aborts with a serialization failure, and your application has to catch that and retry the whole transaction. The retry loop is the lesson; without it you have turned a silent wrong answer into a 500"
  - "MVCC and dead-tuple bloat: bulk update, watch the query slow with no code change, VACUUM, watch it recover"
  - "Operating Postgres: backups and point-in-time restore, replicas and their lag, isolation anomalies under concurrent load"
---
[[Supabase|supabase]] fluency is not Postgres fluency.

> **Open with a 3-hour win, not a 15-hour rig.** One table of 50k rows, one slow query, one EXPLAIN,
> [[one index|index]], one measured speedup you state as a number. **Do not work backwards from a headline
> factor** — it depends on the query, the selectivity and the cache state, and a target set in advance is
> the habit M12 exists to break. It will probably land somewhere between one and three orders of
> magnitude; if it comes out at 1.2×, that is the interesting result and finding out why is the
> exercise. **See the loop work on day one**, then build the 5,000,000-row rig with
> the purpose already understood. Environment setup with no visible result, at the exact start of the
> abandonment window, is how modules get abandoned.

**Checkpoints** ① the 3-hour win: 50k rows, one slow query, one EXPLAIN, one index, one measured speedup
you can state as a number · ② reading a plan out loud: seq scan vs index scan vs bitmap heap, and which
line of EXPLAIN told you · ③ the 5,000,000-row rig loaded, with a load generator you wrote rather than a
benchmark you downloaded · ④ six of the twelve queries with plans captured before and after · ⑤ all
twelve, plus the wall-clock table that shows the slow-to-fast loop closing · ⑥ an [[RLS policy|rls]] set benchmarked
correct-but-slow against correct-and-fast, with the plan diff that explains it · ⑦ asymptotic complexity
written against your own measurements, not against a textbook curve · ⑧ the legacy-key rotation performed
and documented as a procedure someone else could follow · ⑨ the flagship on hosted Supabase: sign-in, one
user-scoped table, one policy, a pooled connection · ⑩ a backup restored to a point in time and timed against the recovery-point goal you wrote down first · ⑪ a read replica’s lag measured under the load generator, one stale read reproduced, and the route that avoids it · ⑫ a lost update reproduced under concurrent load, then fixed with the right lock or isolation level, and the reason stated.

**Core concepts:** Relational modeling — constraints as the thing that actually enforces invariants.
SQL without an [[ORM|orm]]: joins, aggregates, CTEs, window functions. Indexes and
\`EXPLAIN (ANALYZE, BUFFERS)\` — the deliberate slow-to-fast loop. Transactions, isolation, the lost update.
[[N+1|n-plus-one]]. **Connection pooling and the Vercel+Supabase failure mode.** RLS — correct first, then fast.
[[Expand/contract|expand-contract]] *as a concept*. **The planner:** force each join strategy with \`enable_hashjoin\` /
\`enable_mergejoin\` / \`enable_nestloop\` off and time all three on the same query, so its choice becomes a
decision you watched it make. **Estimated vs actual rows** — the first thing to say about any plan; one
query where stale \`ANALYZE\` or a correlated predicate breaks the estimate. **The isolation levels — four names, three
behaviours**, because READ UNCOMMITTED behaves as READ COMMITTED: show that M4’s lost update survives
READ COMMITTED (the default, which is why putting it in a transaction fails) and is **caught** under
REPEATABLE READ. Caught, not silently fixed — the transaction aborts with a serialization failure, and
**your application has to catch that and retry the whole transaction.** The retry loop is the lesson;
without it you have converted a silent wrong answer into a user-visible 500 and will conclude that
REPEATABLE READ does not work. **MVCC and dead-tuple bloat:** bulk update, watch the query slow
with no code change, \`VACUUM\`, watch it recover. The local Supabase stack runs in the containers you
checked could install in M1. **Operating Postgres: backups and point-in-time restore, replicas and their lag, isolation anomalies under concurrent load.**

**Asymptotic complexity, taught here because here it is measurable.** State the complexity of the loop
or query you just wrote, predict where it breaks, measure against the 5,000,000-row dataset, compare prediction
to plan.

> The cut list removes "algorithm theater" — implementations, puzzle practice, graphs and toposort. **It
> does not remove the notation or the reasoning.** Big-O is the working vocabulary of code review and design discussion, and M14, M15, and M13 all put you on the
> *receiving* end of it.

> **The connection surface, named.**
> There are four distinct endpoints with different IP-version and plan availability: direct, shared
> pooler in session mode, shared pooler in transaction mode (the serverless one), and dedicated pooler.
> Session mode’s old port was removed in Feb 2025 and the IPv4 add-on is a *swap*, not a dual-stack
> addition. **Verify the current endpoint table before you start** — this is a platform claim wearing
> fundamentals clothing and it moves at platform speed.

> **Key naming is mid-migration.** Supabase is replacing the legacy \`anon\`/\`service_role\` [[JWT keys|jwt]] with
> publishable/secret keys, deprecating the old pair inside this curriculum’s own calendar. Learn both
> names once, then use the new ones. **Make the migration an artifact:** rotate the flagship onto the new
> keys, disable the legacy pair, prove with a test that nothing broke.

**Artifact** \`LAB\` — a \`pg-lab\` repo against a local Supabase stack. The 3-hour win first. Then the
5,000,000-row rig: twelve hand-written queries with EXPLAIN plans before and after, a documented
slow-to-fast loop with wall-clock numbers from **a load generator you wrote** (exported to M23); an RLS
policy set benchmarked correct-but-slow vs fast; the legacy-key rotation above as an artifact. Plus
asymptotic complexity, measured. **Then the flagship moves onto hosted Supabase:** sign-in, one table
scoped to the signed-in user, one row-level security policy, and a pooled connection, so the app now has
accounts and keeps data between visits. **The lab itself stays private; this last piece is the exception,
because it changes what a stranger sees.**

> Two things belong later. The **expand/contract-under-load build** is in M23, where the deploy
> pipeline exists to run it through. **pgvector recall and filtered search** are in M18 — at this
> position recall is *literally unmeasurable*, because no corpus, [[embeddings|embeddings]], queries, or golden set
> exist yet.

::: context supabase What Supabase is
Supabase is a hosted service built around a Postgres database. On top of the database it adds the pieces most apps need — user sign-in, file storage and ready-made APIs — so a small team can skip building them. The sentence here is the warning: clicking around Supabase's dashboard is not the same skill as understanding the Postgres underneath, and the second is what interviews and outages test.
:::

::: context index An index is the one at the back of a book
Without an index, the database finds matching rows the way you would find a word in a book with no index: read every page. That is a **sequential scan**. An index is a separate, sorted structure pointing to where each value lives, so the database can jump almost straight to the right rows — an **index scan**. \`EXPLAIN\` tells you which one it chose.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 130" font-family="Inter, Arial, sans-serif">
  <text x="90" y="16" font-size="12" text-anchor="middle" fill="#b4232c">sequential scan: read all</text>
  <g fill="#ffffff" stroke="#b4232c" stroke-width="1.5">
    <rect x="20" y="26" width="140" height="14"/><rect x="20" y="42" width="140" height="14"/><rect x="20" y="58" width="140" height="14"/>
    <rect x="20" y="74" width="140" height="14"/><rect x="20" y="90" width="140" height="14"/><rect x="20" y="106" width="140" height="14"/>
  </g>
  <text x="270" y="16" font-size="12" text-anchor="middle" fill="#1d6fd1">index scan: jump</text>
  <rect x="190" y="40" width="50" height="60" rx="4" fill="#8fb8f0" stroke="#1d6fd1" stroke-width="1.5"/>
  <text x="215" y="74" font-size="11" text-anchor="middle" fill="#1f2a44">index</text>
  <g fill="#ffffff" stroke="#6c7a93" stroke-width="1.5">
    <rect x="260" y="26" width="90" height="14"/><rect x="260" y="42" width="90" height="14"/><rect x="260" y="58" width="90" height="14"/>
    <rect x="260" y="74" width="90" height="14"/><rect x="260" y="90" width="90" height="14"/><rect x="260" y="106" width="90" height="14"/>
  </g>
  <rect x="260" y="74" width="90" height="14" fill="#1d6fd1"/>
  <line x1="240" y1="70" x2="256" y2="80" stroke="#1d6fd1" stroke-width="2"/>
</svg>
\`\`\`
:::

::: context rls What row-level security is
**RLS** is a Postgres feature that makes the database itself decide which rows each user may see or change. You write a policy such as "a user may read a note only if its \`user_id\` is theirs," and the database applies it to every query, whatever the app's code forgets to check. Supabase leans on it heavily, because its APIs can be called straight from the browser.
:::

::: context orm What an ORM is
An **ORM** (object-relational mapper) is a library that lets you treat database rows as objects in your programming language and writes the SQL for you — Prisma and Drizzle are common in TypeScript. It is convenient, and it hides exactly what this module wants you to see: the SQL actually sent, and how many times it was sent.
:::

::: context n-plus-one The N+1 query problem
Load a list of 50 posts with one query, then fetch each post's author with its own query: 1 + 50 = 51 trips to the database where one or two would do. Each trip is quick on your laptop, so the page seems fine, and then it crawls in production where every trip crosses a network. A join, or one query that fetches all 50 authors at once, fixes it.
:::

::: context expand-contract Changing a database without downtime
You cannot rename a column in one step while the old version of your app is still running and reading it. **Expand/contract** does it in stages: *expand* by adding the new column next to the old one, move the code and the data across, and only when nothing reads the old column any more, *contract* by removing it. Every step is safe to deploy on its own.
:::

::: context jwt What a JWT is
A **JWT** (JSON Web Token, often said "jot") is a small piece of text holding facts such as "this is user 42, role: member," plus a signature. The signature lets a server detect if anyone changed the contents, but the contents themselves are not secret — anyone holding the token can decode and read them. Supabase's older keys were JWTs; the new publishable and secret keys replace them.
:::

::: context embeddings What an embedding is
An **embedding** is a list of numbers — often hundreds or thousands long — that a model produces to represent the meaning of a piece of text. Texts that mean similar things get lists that are close together, even with no words in common, so "cancel my plan" can find "how do I end my subscription". **pgvector** is a Postgres extension that stores these lists and finds the nearest ones.
:::
`;export{e as default};