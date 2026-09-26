<!-- Context notes for M21/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[perimeter|perimeter]] 1
[[rotation is the only fix|key-rotation]] 1
[[the service key in an Edge Function|service-key]] 1

::: context perimeter The edge of what you control
Your perimeter is the boundary around the systems you run and control: your servers, your database, your storage. Anything that crosses it, such as a prompt sent to a model provider or an error sent to a monitoring service, is now held by someone else under their rules.

Being able to list every such crossing is exactly what security questionnaires from business customers ask for.
:::

::: context key-rotation Replacing a leaked secret
Rotating a key means creating a new one, switching your app to it, and revoking the old one so it stops working.

Deleting the commit is not enough because git keeps history, clones and forks may already exist, and automated scanners watch public code for leaked keys. Assume anyone could have copied it the moment it was pushed. Most providers make rotation a one-click action for this reason.
:::

::: context service-key The key that skips the rules
Supabase gives a project two kinds of key (older projects call them anon and service role; newer ones, publishable and secret). The public one is meant for browsers and is limited by your row-level security policies. The **service role** (secret) key bypasses those policies entirely and is meant only for trusted server code.

An Edge Function is Supabase's own server-side code. Using the service key there just to make an RLS error go away removes the protection for every query that function runs.
:::
