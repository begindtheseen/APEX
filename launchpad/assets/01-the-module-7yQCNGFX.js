var e=`---
id: m21-the-module
title: "Security and the Trust Boundary — what to understand and what to build"
minutes: 3
covers:
  - "Trust boundaries and secrets: what runs where"
  - "Authentication vs authorization; broken access control as the bug that actually ships"
  - "RLS as a design skill"
  - "Injection, XSS, CSRF, SSRF — by exploiting them yourself"
  - "Dependency and supply-chain risk"
  - "Prompt injection, direct and indirect: contained, not fixed"
  - "The lethal trifecta (Simon Willison’s framing, and say so when you use it): private data + untrusted content + exfiltration"
  - "Tool permission design and excessive agency"
  - "Treating model output as untrusted input"
  - "PII, log leakage, deletion, and the constraints you do not control"
---
**Core concepts:** Trust boundaries and secrets — what runs where. [[Authentication vs authorization|authn-authz]];
**broken access control as the bug that actually ships.** [[RLS|rls]] as a design skill. Injection, XSS, CSRF,
SSRF **at working depth, by exploiting them yourself.** Dependency and [[supply-chain risk|supply-chain]]. **Prompt
injection — direct and indirect — contained rather than fixed.** The lethal trifecta (**Simon Willison’s
framing, and say so when you use it**): private data + untrusted content + exfiltration. Tool permission design and excessive agency. **Treating model
output as untrusted input.** [[PII|pii]], log leakage, deletion, and the constraints you do not control.

**The constraints you do not control.** The constraints above are ones you author. On the job you are
handed the others: **[[approved-subprocessor lists|subprocessor]]** (adding a vendor is a legal action, not a technical
one), what a DPA does, **[[zero-data-retention configurations|zero-data-retention]]**, [[data residency|data-residency]], and security
questionnaires — which land on the engineer who built the feature. **The week-one move is asking whether
a vendor is approved before you write code against it.**

**Checkpoints** ① secrets audit: prove what actually ships to the browser by searching the files it
downloads · ② broken access control, exploited **on the deliberately vulnerable copy** then fixed ·
③ injection, XSS or SSRF: one landed, one fixed, one test — **SSRF targets are your own allowlisted test
hosts and private-network addresses on your own network, never a third party’s endpoint** · ④ [[cross-tenant|cross-tenant]]
file access through a guessed or replayed URL, landed and fixed **on the vulnerable copy with synthetic
tenants — never against production, where the rows belong to real people** · ⑤ one exploit run through the
M19 fetch tool · ⑥ indirect prompt injection landed through
retrieved content · ⑦ tool permissions with a written blast-radius analysis · ⑧ the bidirectional
data-flow doc, with the delete path implemented and tested.

**Artifact** \`EVIDENCE\` — **every exploit in this module runs against your own deliberately vulnerable
copy of the flagship, on your own machine or your own account, and against nothing else. Running any of it
against a system you do not own is a crime in most countries and the end of the job search this program
exists for.** An attack-then-fix log against that copy: **five** exploits you ran yourself, each with
fix and test. Four are the standard set; **the fifth is
cross-tenant file access — reading another tenant’s uploaded file by guessing or replaying its URL** (a
misconfigured bucket is none of injection, XSS, CSRF, or SSRF — so the standard four cannot catch the leak
you are most likely to ship under time pressure). CSRF against the OAuth callback is M26’s own attack,
once there is a callback to attack. One of the five runs through M19’s agent fetch tool.

A tool-permission design for M19’s agent with blast-radius analysis.

**A bidirectional data-flow document** — not only what flows *in*. Every boundary
customer data crosses, every third party that sees it, the retention setting and jurisdiction at each,
**plus an implemented delete path** removing the user’s rows, objects, embeddings, and trace records; a
written list of what cannot be deleted and why; and a test asserting nothing survives in any store you
control. Plus the constraints you do not control: subprocessor lists, DPAs, zero-data-retention config,
residency.

> Once the flagship has real users their data lands in at least seven places built by different modules.
> Retention is something to *implement*, not merely a thing to name in a document.

> This reconciles a tension the curriculum creates on purpose: M10 and M12 teach you to log everything
> about a model call; this is where that meets not shipping customer PII to a third-party platform.

::: context authn-authz Who you are versus what you may do
**Authentication** checks who you are: logging in with a password or a Google account. **Authorization** checks what you are allowed to do once you are in: may this user see that invoice?

An office badge gets you into the building (authentication); it does not open every door (authorization). Getting the second one wrong is extremely common, which is why "broken access control" sits at the top of the OWASP Top 10, the industry's best-known list of web security risks.
:::

::: context rls Row-level security
Row-level security is a PostgreSQL feature: you attach **policies** to a table that decide, row by row, what each user may read or change, such as "a user may only see rows they own". The database enforces them on every query, even when the app code forgets to check.

Supabase leans on it heavily because the browser talks to the database through Supabase's API. Designing those policies well is as much a design task as a security one.
:::

::: context supply-chain The code you did not write
A modern app pulls in hundreds of open-source packages, and each of those pulls in more. Supply-chain risk is the chance that one of them is buggy, abandoned or tampered with, and brings the problem into your app.

Everyday defences: keep a lockfile so versions do not change silently, turn on automated alerts such as GitHub's Dependabot, and think twice before adding a tiny package for something you could write in ten lines.
:::

::: context pii Personally identifiable information
PII is any data that can identify a real person: names, email addresses, phone numbers, home addresses, and often IP addresses or account IDs. Laws such as the EU's GDPR put strict rules on how it is collected, stored, shared and deleted.

For AI apps the easy mistake is logging: full prompts and responses often contain PII, and sending them to a third-party logging tool means that data now lives somewhere else too.
:::

::: context subprocessor Vendors that touch customer data
When your company handles a customer's data, every outside service that also sees it (a cloud host, a model provider, an email service) is a **subprocessor**. Business customers usually get a list of approved ones and a promise of notice before a new one is added.

The legal side is a **DPA**, a data processing agreement: a contract saying what a vendor may do with the data, how it is protected and when it is deleted. That is why adding a new vendor is a legal step, not just an \`npm install\`.
:::

::: context zero-data-retention The provider keeps nothing
By default, AI providers may keep your prompts and responses for a limited time, for example to check for abuse. **Zero data retention** (ZDR) is an arrangement, usually for business accounts, where the provider agrees not to store them after the response is returned.

Some features that depend on stored data may not be available under it, so check what an arrangement actually covers before promising a customer anything.
:::

::: context data-residency Which country the data lives in
Data residency is about the physical location where data is stored and processed. Some customers, and some laws, require that data stay within a region: a European hospital may insist its records never leave the EU.

Cloud and AI providers often let you choose a region for this reason. For an engineer it means checking where each service in the chain actually runs, not just the main database.
:::

::: context cross-tenant Many customers, one system
In a **multi-tenant** app, many customers (tenants), such as different companies, share the same servers and database. Each tenant's data must stay invisible to every other tenant.

A cross-tenant leak is when one customer can see another's data. Files are a common weak spot: an uploaded file stored at a predictable, public address is only as private as its URL. The safer pattern is private storage plus short-lived signed links checked against who is asking.
:::
`;export{e as default};