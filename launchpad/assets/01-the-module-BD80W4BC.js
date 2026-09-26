var e=`---
id: m31-the-module
title: "Employed Mode — what to understand and what to build"
minutes: 2
covers:
  - "A second operating contract at an employed weekly budget (5-8h, not 18)"
  - "Retargeting the cold rebuild to the employer’s codebase"
  - "Re-contracting or replacing the reviewer before the start date"
  - "Manager checkpoints at week 6 and week 14, scripted in advance"
---
Your first final-round interview is the last point at which you can write this with a clear head, and it
usually lands one to three weeks before an offer. Being hired before you finish the program is a success,
not a failure — it is the outcome this plan is shaped for, which is a different claim from a prediction
that it will happen to you.

**Core concepts:** A second operating contract at an employed weekly budget (5–8h, not 18). Retargeting
the cold rebuild to the employer’s codebase. Re-contracting or replacing the reviewer before the start
date. [[Manager checkpoints|manager-checkpoints]] at week 6 and week 14, scripted in advance.

**Artifact** \`LAB\` — **do the arithmetic on what is left before you write the order.** A hire at the
application date leaves around **[[665 module hours|hours-arithmetic]]** unfinished, and at six or seven hours a week that is
close to **two more years of evenings** on top of a full-time job. Decide in this module which of it you
will actually finish and which you are deliberately abandoning, and **write both lists down.** That
decision is what the second operating contract is for; the alternative is two years of quietly falling
behind a plan you never renegotiated.

Then the contract itself: a realistic employed weekly budget (**5–8 hours, not 18**) and a module order
driven by what the job needs first. Track 4 retargeted from your own artifacts
to a component of the employer’s codebase — which doubles as [[onboarding|onboarding]]. The reviewer relationship
re-contracted or deliberately replaced, **decided before the start date.** The monthly re-plan surviving
with new inputs: [[PR review comments|code-review]], tickets that took longer than estimated, things you could not answer
that month. The estimate log continuing against real tickets from week one.

Plus **two scheduled written manager checkpoints at week 6 and week 14**, scripted before the start date,
asking directly whether you are where they would expect.

::: context manager-checkpoints Asking your manager how it is going
New hires often wait for a formal review to learn how they are doing, and by then any problem has been building for months. A checkpoint is a scheduled moment where **you** ask directly: "Am I where you would expect someone to be at this point? What should I do more or less of?"

Week 6 is early enough to change course, and week 14 is roughly when the first few months, often the probation period, are ending.
:::

::: context hours-arithmetic Checking the two years
665 hours at 6 hours a week is about 111 weeks; at 7 hours a week, 95 weeks. Two years is 104 weeks, so either way it is about two years, and that assumes no weeks off at all.

A plan that quietly assumes you will keep going at that pace for two years on top of a new job is unlikely to hold. Choosing now what to drop keeps the plan honest.
:::

::: context onboarding Getting up to speed at a new job
Onboarding is the first weeks at a new job: accounts, setup, meeting the team, and learning the codebase and how work gets done. Many companies give new hires a small "starter" ticket and a buddy to ask.

Studying one part of the employer's codebase in depth is onboarding and practice at the same time, so the hours count twice.
:::

::: context code-review Colleagues reading your changes
In code review, one or more teammates read your pull request before it is merged, leaving comments such as questions, suggestions or requests for changes.

Review comments are free, specific feedback on your weak spots. Collecting the ones that repeat ("add a test for the error case", "this name is unclear") shows you exactly what to study next.
:::
`;export{e as default};