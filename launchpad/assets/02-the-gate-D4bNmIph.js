var e=`---
id: m29-the-gate
title: "The Evidence Layer v2 — the gate, and what most people miss"
minutes: 1
covers:
  - "The README as product spec plus decision record"
  - "Publishing the failing v1 numbers alongside the improved ones"
  - "The write-up genre that converts: a numbered account of something that went wrong in your own system"
---
**GATE** — **REFEREE:** the same protocol as M28 — **two strangers** from a named, on-topic place,
**plus your own marked-up pass** — with people who have not seen v1. **PASS:** they can
state the [[cost per user|cost-per-user]] and the quality number from the README alone. **ON FAIL:** the README is a
[[feature list|feature-list]], not a product spec plus decision record.

**Most-missed:** The README as a feature list. [[The stack list|stack-list]] is the least interesting thing in the repo
and it is what most portfolios lead with. · **Hiding the v1 numbers because they were bad. The
improvement delta *is* the evidence** — a single good number could have been luck. · Tutorials that
duplicate a thousand existing posts; the convincing genre is a specific, numbered account of something
that went wrong in your own system.

::: context cost-per-user The number a manager looks for
Cost per user is what it costs you to serve one active user for a month: model calls, hosting, database, email. For AI products it is a central number, because every request has a real price.

A README that states it, with how it was measured, shows you think about the product as a business, not only as code.
:::

::: context feature-list What it does versus why it matters
A feature list says "has login, chat, file upload". A product spec says who the product is for, what problem it solves, what it refuses to do, and how well it works, with numbers.

Anyone can list features. A stranger reading a spec can tell in five minutes whether you understood what you built.
:::

::: context stack-list The list of technologies
The "stack" is the set of technologies a project uses: for example Next.js, Postgres, Supabase and a model API. Most portfolio READMEs lead with that list, often as a row of logos.

It tells the reader what you picked, not how well you used it, and many other projects list the very same tools. Put it lower down and lead with what the project does and your measured results.
:::
`;export{e as default};