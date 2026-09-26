<!-- Context notes for M5/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[Supabase|supabase]] 3
[[one index|index]] 1
[[RLS policy|rls]] 1
[[ORM|orm]] 2
[[N+1|n-plus-one]] 2
[[Expand/contract|expand-contract]] 2
[[JWT keys|jwt]] 1
[[embeddings|embeddings]] 1

::: context supabase What Supabase is
Supabase is a hosted service built around a Postgres database. On top of the database it adds the pieces most apps need — user sign-in, file storage and ready-made APIs — so a small team can skip building them. The sentence here is the warning: clicking around Supabase's dashboard is not the same skill as understanding the Postgres underneath, and the second is what interviews and outages test.
:::

::: context index An index is the one at the back of a book
Without an index, the database finds matching rows the way you would find a word in a book with no index: read every page. That is a **sequential scan**. An index is a separate, sorted structure pointing to where each value lives, so the database can jump almost straight to the right rows — an **index scan**. `EXPLAIN` tells you which one it chose.

```svg
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
```
:::

::: context rls What row-level security is
**RLS** is a Postgres feature that makes the database itself decide which rows each user may see or change. You write a policy such as "a user may read a note only if its `user_id` is theirs," and the database applies it to every query, whatever the app's code forgets to check. Supabase leans on it heavily, because its APIs can be called straight from the browser.
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
