var e=`---
id: m2-the-gate
title: "Flagship v1 — the gate, and what most people miss"
minutes: 1
covers:
  - "Client and server: what runs on someone else’s machine and what runs on yours"
  - "An API key as a secret — why it cannot go in the browser, and how to prove it did not"
  - "Request and response: one round trip, start to finish"
  - "Environment variables and why the same code behaves differently in two places"
  - "Deployment as making the thing reachable, not as finishing it"
  - "Logging a call before you need the log, because usage you did not record is gone"
---
**GATE** — **REFEREE:** two people who are not you, on their own devices, with no instructions from you.
**PASS:** both reach the URL, type something, get a reply, and can say what the app is for. Your log shows
their two requests. [[The spend limit is set|spend-limit]] and you can say the number. The page states what it records,
and you can show [[a request deleted on demand|delete-on-request]]. **ON FAIL:** it runs on your laptop. That is a different
artifact, and no later module can bolt onto it.

**Most-missed:** Putting the key in the client (the browser side) because it works. It works, and it is
now public; scrapers (programs that automatically scan public repos for secrets) find committed keys in
minutes. · Building the whole product instead of v1. Everything you are
tempted to add here has a module later, and each one is easier on top of something already deployed.
· Skipping the log because there is nothing to look at yet. M10 and M12 both read this log and neither can
reconstruct a month of calls after the fact. · Calling it done when it runs locally. Two strangers on their
own devices is the gate for a reason.

::: context spend-limit What a spend limit does
Model services let you cap how much an account can spend in a month. Once the cap is reached, further calls are refused instead of billed. The app stops answering, which is annoying — and far better than waking up to a bill because someone found your URL and scripted a few hundred thousand requests.
:::

::: context delete-on-request Why deletion on request matters
Your log holds what people typed, and people type personal things. Privacy laws in many places — Europe's GDPR and California's privacy law among them — give people the right to ask a company to delete data about them. Building the habit now, at the scale of two users, is far easier than adding it to a system that already holds data from thousands.
:::
`;export{e as default};