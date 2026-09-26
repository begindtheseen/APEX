var e=`---
id: m27-the-module
title: "Pay, Terms, and the Negotiation — what to understand and what to build"
minutes: 2
covers:
  - "Reading an offer: base vs equity vs bonus, vesting, what startup equity is realistically worth"
  - "W-2 vs 1099 vs agency vs employer-of-record"
  - "Computing the delta yourself rather than taking a headline number — with your own state, your own premium and your own deductions in your own spreadsheet, because no single percentage survives contact with a real return"
  - "References and employment verification when you are self-employed: they are different checks, and a reference you paid gets disclosed"
  - 'Describing the year accurately: "I spent the last year building and operating X, full-time and self-directed, with a working engineer reviewing my code." Not naming how you learned is fine; constructing a framing designed to be mistaken for employment is not, because the follow-ups this module predicts — what title, how big was the team, who was the client — are exactly where it falls apart'
---
The funnel-filter half of this work already happened in M0, where it belongs, because it determines which
modules matter. This is the transaction itself.

**Core concepts:** Reading an offer — base vs [[equity|equity]] vs bonus, [[vesting|vesting]], what a startup’s equity is
realistically worth. **[[W-2 vs 1099|w2-1099]] vs agency vs [[employer-of-record|employer-of-record]].** Computing the delta yourself — **with your own state,
your own premium and your own deductions in your own spreadsheet, because no single percentage survives
contact with a real return** — rather than taking a headline number. References and employment
verification when you are self-employed. **Not naming how you learned is fine; constructing a framing
designed to be mistaken for employment is not.**

> Check the classification on every posting before applying, and know your delta before you negotiate.
> You already tagged twenty postings employee or contract in M0. That is your data, and it is a better
> artifact than any general claim about what remote roles pay.

**Artifact** \`EVIDENCE\` — **the tax structures here are the United States ones (W-2 and 1099); if you
are somewhere else, substitute your own two employment structures, because the exercise is identical.**
A pay floor and target with the postings that justify them; a spreadsheet modeling the same headline
number as W-2 vs 1099 with [[self-employment tax|self-employment-tax]], health insurance, and unpaid time off; a negotiation
script rehearsed out loud and recorded. **Plus a references plan: three real people secured before your
first offer** — your reviewer, one person from your warm list, and a maintainer from Track 2 if that
track is running; all three already exist in this curriculum, and none of them knows they are a
reference until you ask. **If you paid your reviewer, say so when you offer them as a reference.** It is
still a strong reference, a checker will ask what your working relationship was, and the disclosure costs
you nothing while being caught out [[costs you the loop|interview-loop]]. And **know the difference between a reference and
[[employment verification|employment-verification]]:** references speak to your work; employment verification checks employment
records, which you do not have, so a background check will ask for 1099s or client invoices instead.
**Say up front that the last year was self-employed** rather than letting it surface at the offer.

::: context equity A share of the company
Equity is part-ownership of the company, given as part of your pay. Public companies usually grant **RSUs** (restricted stock units: shares you receive over time). Startups usually grant **stock options**: the right to buy shares later at a fixed price.

Startup equity only turns into money if the company is sold or goes public, and most startups never get there. A common rule of thumb is to judge an offer as if the equity might be worth nothing, and treat anything more as a bonus.
:::

::: context vesting Earning your equity over time
Vesting means your equity becomes truly yours gradually, as long as you stay. A very common schedule is **four years with a one-year cliff**: nothing vests during the first year, then 25% vests on your first anniversary, and the rest vests monthly or quarterly over the next three years.

If you leave after eleven months, you typically walk away with none of it. Read the schedule before comparing two offers.
:::

::: context w2-1099 Employee or contractor, in US tax terms
In the US, a **W-2** is the tax form an employee gets; a **1099** is what an independent contractor gets. The names are simply the numbers of the IRS tax forms.

A W-2 employer withholds your taxes, pays half of Social Security and Medicare for you, and often provides health insurance and paid time off. A 1099 contractor is paid the full amount and covers all of that themselves. That is why the same hourly number is worth noticeably less on a 1099, and why you should compute the difference with your own figures.
:::

::: context employer-of-record A company that employs you on paper
An employer of record (EOR) is a company, such as Deel or Remote, that legally employs you on behalf of the business you actually work for. It runs payroll, taxes and benefits under local law, while the client directs your day-to-day work.

It is common when a company hires someone in a state or country where it has no legal presence. For you it usually means real employee status, with the EOR's name on the paperwork.
:::

::: context self-employment-tax Paying both halves
Employees and employers each pay 7.65% of wages toward Social Security and Medicare. A self-employed person pays both halves: **15.3%** (12.4% Social Security, up to a yearly earnings cap, plus 2.9% Medicare), on top of ordinary income tax.

It is charged on 92.35% of net self-employment earnings, and half of it is deductible, so the real effect depends on your numbers. That is exactly why the lesson says to build the spreadsheet yourself.
:::

::: context interview-loop The run of interviews before an offer
In tech hiring, "the loop" is the main round of interviews after the initial screens: often four to six sessions with engineers and managers covering coding, system design and behavioral questions, sometimes in a single day.

"Losing the loop" means being rejected at that stage. A small honesty problem discovered late, such as a reference that tells a different story, can end it even when the interviews went well.
:::

::: context employment-verification Checking that the jobs were real
Before a final offer, many companies run a **background check** through a firm such as HireRight or Checkr. Part of it is employment verification: confirming with past employers that you worked there, when, and under what title.

It is a records check, not an opinion of your work. When you have been self-employed there is no employer to call, so the checker asks for proof such as 1099 forms, client invoices or tax returns instead.
:::
`;export{e as default};