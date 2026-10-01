var e=`---
id: m21-the-gate
title: "Security and the Trust Boundary — the gate, and what most people miss"
minutes: 1
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
  - "Threat modeling; supply-chain and container security; least-privilege IAM"
---
**GATE** — **REFEREE:** your reviewer, watching each exploit land or not, and a passing deletion test.
**PASS:** five exploits demonstrated and fixed; name every irreversible action in your agent and defend
the containment architecture **without ever saying "I tell the model to ignore injected
instructions"**; state exactly what customer data leaves your [[perimeter|perimeter]] and where it lands; and **state
what happens to every copy of a user’s data when they ask you to delete it.** **ON FAIL:** the exploit
did not actually land — you have a description, not a demonstration.

**Most-missed:** Believing code is server-side because of where the file lives. One import from server
code into browser code drags it into the browser. · Treating a leaked key as fixed by deleting the commit
— it is compromised the moment it was pushed; [[rotation is the only fix|key-rotation]]. · Trusting an \`organizationId\` or
\`userId\` sent in the request body. · Hiding the admin button in the UI (the screens a user sees) and calling that access control.
· \`USING (true)\`, or [[the service key in an Edge Function|service-key]] "because RLS was in the way." · Believing a
classifier or delimiter scheme solves prompt injection. · Assuming indirect injection is exotic — **it is
the common case**: a web page, a PDF, a calendar invite, a row another user can write to. · A
confirmation step whose summary the model itself generates — an injected model lies in the confirmation.

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
`;export{e as default};