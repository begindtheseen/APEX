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
their two requests. The spend limit is set and you can say the number. The page states what it records,
and you can show a request deleted on demand. **ON FAIL:** it runs on your laptop. That is a different
artifact, and no later module can bolt onto it.

**Most-missed:** Putting the key in the client (the browser side) because it works. It works, and it is
now public; scrapers (programs that automatically scan public repos for secrets) find committed keys in
minutes. · Building the whole product instead of v1. Everything you are
tempted to add here has a module later, and each one is easier on top of something already deployed.
· Skipping the log because there is nothing to look at yet. M10 and M12 both read this log and neither can
reconstruct a month of calls after the fact. · Calling it done when it runs locally. Two strangers on their
own devices is the gate for a reason.
`;export{e as default};