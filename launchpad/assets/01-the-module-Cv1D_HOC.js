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

**What you need to understand.** [[Client and server|client-server]]: what runs on someone else’s machine and what runs on
yours. [[An API key as a secret|api-key]] — why it cannot go in the browser, and how to prove it did not. Request and
response: one round trip, start to finish. [[Environment variables|env-vars]] and why the same code behaves differently
in two places. [[Deployment|deployment]] as making the thing *reachable*, not as *finishing* it. Logging a call before you
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
  and M21 only needs two principals to exploit. A third-party account worth connecting: M26 is [[OAuth|oauth]]
  against somebody else's API and does not care which app initiates it. And a [[CI/deploy pipeline|ci-pipeline]], which
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
you prove it is not in the [[client bundle|client-bundle]] by searching the files the browser downloads. **A hard spend
limit is set at the model service before the first request**, low enough that the worst month you can
imagine is an amount you would shrug at, because this URL is on the public internet and the bill is yours.
**The page is not open to the whole world:** put it behind a shared word you hand out, or a list of
addresses you invite, so the people using it are people you chose. And **every model call is written to a
log with its input, output, usage ([[the token counts the service reports|token-counts]]) and time, from the very first
request** — the item M0 pointed here — because M10 and M12 both read that log and a month of calls you did
not record is gone for good. M10 then *upgrades* a trace store rather than starting one. **That log holds
other people’s words**, so the page says in one line what is recorded and for how long, you keep it no
longer than you said, and you delete a person’s entries when they ask. M11 and M21 make this rigorous; the
one line and the delete-on-request are due now.

::: context client-server Whose computer runs what
The **client** is the program on the user's side — usually their web browser, on their phone or laptop. The **server** is a computer you control that waits for requests and answers them. The rule that follows is simple and it never bends: anything sent to the client, the user can read and change. Secrets and checks that matter live on the server.
:::

::: context api-key An API key is a password that spends money
When your code calls a model service, it sends a long secret string — the API key — that says "bill this account." Anyone who has the key can make calls on your bill. Anything the browser downloads can be read by the person using it (the browser's developer tools show every file), so a key placed in front-end code is a key handed to every visitor.
:::

::: context env-vars What an environment variable is
A named value handed to a program when it starts, from outside the code — for example \`ANTHROPIC_API_KEY\`. In Node your code reads it as \`process.env.ANTHROPIC_API_KEY\`. On your laptop it might come from a local file that git is told to ignore; on Vercel you type it into the project's settings. Same code, different values in each place, and the secret never lands in your repository.
:::

::: context deployment What deploying means
**Deploying** is putting your code on a server that is always on and reachable at a public address, then starting it there. On Vercel it can be as short as pushing to GitHub: the service notices, builds the app and puts the new version live at a URL. Deploying early matters because the problems of a live app — real devices, slow networks, strangers — only show up once it is live.
:::

::: context oauth What OAuth is
OAuth is the standard behind buttons like "Sign in with Google" or "Connect your calendar." Instead of giving your app their password, the user is sent to the other service, approves a limited set of permissions, and your app receives a token that can do only those things — and that the user can revoke later. Getting it right has several fiddly steps, which is why it has its own module.
:::

::: context ci-pipeline What CI and a deploy pipeline are
**CI** stands for continuous integration: every time code is pushed, a server automatically installs it, builds it and runs the tests, and marks the change red or green. A **deploy pipeline** carries on from there, putting a green build live without anyone copying files by hand. GitHub Actions is a common place to set this up. Nearly every software job expects you to have worked with one.
:::

::: context client-bundle What the client bundle is
Before a web app goes live, a build step packs the code meant for the browser into a few files, often minified into dense, hard-to-read text. That package is the bundle, and every visitor downloads all of it. "Search the files the browser downloads" means opening those files and searching for the first few characters of your key. If it is there, it is public.
:::

::: context token-counts Why the token counts go in the log
Each reply from the model service reports how many tokens went in (your prompt) and how many came out (the answer). Those two numbers are what you are billed for, so logging them from the first request lets you work out what one user, one feature or one bad prompt costs — questions later modules will ask of this log.
:::
`;export{e as default};