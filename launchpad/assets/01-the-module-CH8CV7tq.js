var e=`---
id: m2-the-module
title: "Flagship v1 — what to understand and what to build"
minutes: 6
covers:
  - "Client and server: what runs on someone else’s machine and what runs on yours"
  - "An API key as a secret — why it cannot go in the browser, and how to prove it did not"
  - "Request and response: one round trip, start to finish"
  - "Environment variables and why the same code behaves differently in two places"
  - "Deployment as making the thing reachable, not as finishing it"
  - "Logging a call before you need the log, because usage you did not record is gone"
---
**Why this exists.** Sixteen later modules extend the flagship — M5, M6, M7, M9, M10, M11, M12, M16, M18,
M19, M20, M21, M22, M23, M26 and M29. This module specs it, M10 instruments it, M12 evaluates it, M21 attacks a
copy, M22 rebuilds its chat surface, M23 deploys its pipeline. Something has to build it first. And the
Layer 3 → 4 hard gate requires that flagship *deployed, reachable, and carrying two real users* — months
before the deploy pipeline and the UI arrive in Layer 6. A v1 that does one thing and is actually on the
internet resolves both: the later modules get something to extend, and the hard gate becomes reachable by
doing the work rather than by waiting.

**What you need to understand.** Client and server: what runs on someone else’s machine and what runs on
yours. An API key as a secret — why it cannot go in the browser, and how to prove it did not. Request and
response: one round trip, start to finish. Environment variables and why the same code behaves differently
in two places. Deployment as making the thing *reachable*, not as *finishing* it. Logging a call before you
need the log, because usage you did not record is gone.

**Checkpoints** ① the one-page specification written and signed line by line, before any code · ② one
model call made from a script and its reply printed · ③ the same call behind a server route, with the reply
shown on a page · ④ the key in a server-side environment variable, and a search of the files the browser
downloads proving it is not there · ⑤ the call log written on every request: input, output, usage, time ·
⑥ deployed at a URL that works on a phone you did not configure · ⑦ two strangers through it, their
requests visible in your log.

**The specification, first — the item M0 pointed here.** Give the app a name and write its one-page
specification: who it is for, the one thing it does, what a user types in and what they get back, and what
it must never do. Sixteen later modules add to this page, so you **sign it line by line** before you
build anything. Then read it against this checklist — **as what the app must be able to grow into, not
as what it has.** You are checking the concept, not the code; nothing on this list is built in this
module, and the modules that build these lines are M5, M11, M20, M21 and M23. If your named app could
never carry one of the lines, **pick a different app now, while changing your mind is free.** "Fix the
app before M3" would be an unrunnable instruction.

| The flagship must be able to grow into | Built by |
|---|---|
| A streaming chat surface you can rebuild on your own M7 protocol | M22 |
| Multiple real users with skewed usage, and a paid tier | M20 |
| A user-uploaded document corpus | M11, M18 |
| At least one irreversible side-effecting action | M19, M21 |
| Two distinct roles (so broken-access-control exploits are real) | M5, M21 |
| A third-party account worth connecting | M26 |
| A CI/deploy pipeline you own | M23 |
| Model calls being logged from day one | M10, M12 |

**If a line fails anyway, in month ten — the amendment procedure.** The instruction above is to pick a
different app *now*, and it is the right instruction. But the lines above pay off between M11 and M26,
which is months eight to eighteen, and you choose the app in month two; some readers will get here
anyway, and "take the labeled fallback" is not an answer, because that fallback substitutes *traffic*
and says nothing about a missing tier or a missing role. So:

- **Four of the eight bolt on to a running app at any point.** A paid tier (a payment processor in test
  mode is free, and M20 needs metering, not revenue). A second role — M5 already builds the auth seam,
  and M21 only needs two principals to exploit. A third-party account worth connecting: M26 is OAuth
  against somebody else's API and does not care which app initiates it. And a CI/deploy pipeline, which
  M23 adds by construction. Budget **10–15 hours** for whichever you are repairing.
- **Two cannot be bolted on.** A user-uploaded document corpus, because M11 and M18 measure extraction
  against documents your users actually brought, not a folder you assembled to pass a module. And a
  streaming chat surface, because M22 rebuilds the surface your app already has. If your flagship has
  neither, M11, M18 and M22 have no substrate, and no amount of late work creates one.
- **A second small app is the fallback, and it is partial.** M20, M21 and M26 will accept one — metering,
  exploitation and OAuth are all self-contained. M11, M18 and M22 will not, for the reason above.
- **What it costs is Track 3.** Every module that runs on the second app is a module whose artifact does
  not build on the one before it, which is the dependency spiral the program runs on. Those hours are not
  in the 1,584 — they are the price of a month-two decision you are paying in month ten, and the honest
  place to record that is \`INCIDENTS.md\`: what you believed, what happened, what you changed.

**The artifact** \`EVIDENCE\` — the smallest honest version of it. A plain HTML page with one text box. A
server route that sends what the user typed to a model at Anthropic, using your own API key, and returns
the reply. The reply shown on the page. The whole thing deployed on Vercel, so it has a URL a stranger can
open on their phone. **No streaming, no accounts, no database** — each has its own module later
(streaming in M7, accounts and the database in M5) and each is easier to add to something already
running. Four rules that cannot be skipped. The key lives on the server in an environment variable, and
you prove it is not in the client bundle by searching the files the browser downloads. **A hard spend
limit is set at the model service before the first request**, low enough that the worst month you can
imagine is an amount you would shrug at, because this URL is on the public internet and the bill is yours.
**The page is not open to the whole world:** put it behind a shared word you hand out, or a list of
addresses you invite, so the people using it are people you chose. And **every model call is written to a
log with its input, output, usage (the token counts the service reports) and time, from the very first
request** — the item M0 pointed here — because M10 and M12 both read that log and a month of calls you did
not record is gone for good. M10 then *upgrades* a trace store rather than starting one. **That log holds
other people’s words**, so the page says in one line what is recorded and for how long, you keep it no
longer than you said, and you delete a person’s entries when they ask. M11 and M21 make this rigorous; the
one line and the delete-on-request are due now.
`;export{e as default};