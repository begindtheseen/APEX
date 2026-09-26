<!-- Context notes for M0/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[smoke test|smoke-test]] 1
[[Runway|runway]] 2
[[model spend|model-spend]] 1
[[hosting|hosting]] 2
[[W-2 or 1099|w2-or-1099]] 1
[[logged traces|traces]] 1
[[real PR|pull-request]] 1
[[behavioral round|behavioral-round]] 1

::: context smoke-test Why it is called a smoke test
The name comes from hardware and plumbing: switch the new thing on, or blow smoke through the pipes, and see if smoke comes out where it should not. In software it means a quick, shallow check that the basics work at all — the tools start, the app loads, one request succeeds — before anyone spends time on detailed testing.
:::

::: context runway Where "runway" comes from
It is startup slang, borrowed from airports: the length of ground left before you must be in the air. The arithmetic is one division — money you have, divided by money you spend each month. With \$24,000 saved and \$3,000 a month going out, your runway is 8 months. Everything that makes the monthly number bigger makes the runway shorter, which is why this page counts the program's own costs too.
:::

::: context model-spend Paying for a model by the word
Apps that use an AI model usually call it over the internet through an API and pay for each call. The bill is counted in **tokens** — chunks of text, roughly three-quarters of an English word each on average — and priced per million tokens, with the model's reply usually costing more than your question. One test is fractions of a cent. A script that sends a thousand documents through a large model can cost real money in an afternoon.
:::

::: context hosting What "hosting" means
Your laptop sleeps, loses its connection and has no public address, so other people cannot reach an app running on it. Hosting is renting a computer in a data center that keeps your app running day and night at a web address. Services such as Vercel, Render, Fly.io or a big cloud like AWS all sell this; small projects often fit in a free tier, and the bill grows with traffic.
:::

::: context w2-or-1099 Employee or contractor
These are the US tax forms each kind of worker receives. A **W-2** employee has taxes taken out of every paycheck, and the employer pays half of Social Security and Medicare and usually offers benefits such as health insurance. A **1099** contractor is paid the full amount and handles the rest: quarterly estimated taxes, both halves of Social Security and Medicare (about 15.3%), and no benefits. The same hourly number is worth noticeably less on a 1099.
:::

::: context traces What a trace is
A trace is the full record of one request as it moved through your system: what the user typed, the exact prompt your code sent to the model, what came back, which tools were called, how long each step took and what it cost. Reading a hundred of them is how you find out how your app actually fails, instead of how you imagine it fails.
:::

::: context pull-request What a PR is
A **pull request** (PR) is how a change gets into a shared project. You make your change on your own copy, then ask the project's owners to "pull" it in. They read the difference line by line, leave comments, and either merge it or ask for changes. An **OSS maintainer** is someone with the right to merge into an open-source project — a stranger with no reason to go easy on you.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 110" font-family="Inter, Arial, sans-serif">
  <rect x="8" y="35" width="92" height="40" rx="8" fill="#ffffff" stroke="#1d6fd1" stroke-width="2"/>
  <text x="54" y="59" font-size="12" text-anchor="middle" fill="#1f2a44">your change</text>
  <rect x="134" y="35" width="92" height="40" rx="8" fill="#ffffff" stroke="#1f2a44" stroke-width="2"/>
  <text x="180" y="59" font-size="12" text-anchor="middle" fill="#1f2a44">review</text>
  <rect x="260" y="35" width="92" height="40" rx="8" fill="#8fb8f0" stroke="#1d6fd1" stroke-width="2"/>
  <text x="306" y="59" font-size="12" text-anchor="middle" fill="#1f2a44">merged</text>
  <line x1="100" y1="55" x2="126" y2="55" stroke="#1f2a44" stroke-width="2"/>
  <polygon points="132,55 122,50 122,60" fill="#1f2a44"/>
  <line x1="226" y1="55" x2="252" y2="55" stroke="#1f2a44" stroke-width="2"/>
  <polygon points="258,55 248,50 248,60" fill="#1f2a44"/>
  <path d="M180 75 C180 100 54 100 54 80" fill="none" stroke="#b4232c" stroke-width="2"/>
  <polygon points="54,76 49,86 59,86" fill="#b4232c"/>
  <text x="117" y="106" font-size="11" text-anchor="middle" fill="#b4232c">changes requested</text>
  <text x="54" y="24" font-size="11" text-anchor="middle" fill="#6c7a93">opens the PR</text>
</svg>
```
:::

::: context behavioral-round The behavioral interview
Most engineering interview loops include one round with no code. The interviewer asks "tell me about a time when…" — you disagreed with someone, missed a deadline, broke something in production — and listens for a real situation, what you did and what changed afterwards. Candidates are often coached to answer in that order (situation, task, action, result). Vague or invented stories fall apart at the first follow-up question, which is why a dated log of real incidents is worth so much.
:::
