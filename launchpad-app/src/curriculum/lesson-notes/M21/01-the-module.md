<!-- Context notes for M21/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[Authentication vs authorization|authn-authz]] 2
[[RLS|rls]] 2
[[supply-chain risk|supply-chain]] 2
[[PII|pii]] 2
[[approved-subprocessor lists|subprocessor]] 1
[[zero-data-retention configurations|zero-data-retention]] 1
[[data residency|data-residency]] 1
[[cross-tenant|cross-tenant]] 1

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

The legal side is a **DPA**, a data processing agreement: a contract saying what a vendor may do with the data, how it is protected and when it is deleted. That is why adding a new vendor is a legal step, not just an `npm install`.
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
