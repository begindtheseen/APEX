var e=`---
id: m17-the-gate
title: "Scoping, Estimating, and Someone Else’s Priorities — the gate, and what most people miss"
minutes: 1
covers:
  - "Turning a vague request into clarifying questions"
  - "Decomposing into one-to-two-day independently shippable slices"
  - "Estimating, and naming the riskiest assumption"
  - "Renegotiating when the estimate is wrong"
  - "The open-ended quality ticket, run against a real OSS AI application you did not write, with prompts in-repo and no decision log — on your own system it tests measurement; on a stranger’s it tests measurement plus archaeology, which is the actual job"
  - "A capability-question protocol: cheap, expensive-and-uncertain, structurally impossible"
  - "Explaining a limit to a non-engineer who wants a guarantee"
---
**GATE** — **REFEREE:** a vague [[two-sentence ticket|ticket]] written by the reviewer, cold, and the reviewer
playing a PM who will not take no. **PASS:** clarifying questions and a sliced plan in 15 minutes;
defend what you would cut if the deadline halved; **and report a result that missed its target, in
writing, without apologizing and without asking for more time.** **ON FAIL:** more data points — the
[[estimate log|estimate-log]] is a standing item from M3, not three points gathered here.

> **The estimate log is a standing item from M3, not three data points here.** Costs nothing, produces
> dozens of points by the time you are interviewing, and *"my [[median estimate error|median-error]] is X and I most
> reliably underestimate Y"* is a better mid-level signal than anything else in this document.

**Most-missed:** Disappearing for nine days on something that should have been scoped to two, and
delivering more than was asked. This is what most "[[not mid-level yet|mid-level]]" feedback means. · Having no
stop-or-continue rule on an open-ended ticket, so it absorbs three days or three months identically.
· Apologizing for a missed target or asking for more time, instead of reporting the result and the
evidence.

::: context ticket A unit of work in a tracker
A ticket (or issue) is one item in a team's work tracker, such as Jira, Linear or GitHub Issues. It has a title, a description, someone assigned to it and a status like "to do", "in progress" or "done".

Real tickets are often just a sentence or two written in a hurry. Asking good questions before starting is part of the job, not a sign you missed something.
:::

::: context estimate-log A diary of guesses and outcomes
An estimate log is a simple table: the task, your estimate written down **before** starting, the actual time taken, and a line on why they differed. A spreadsheet is enough.

After a few dozen rows, patterns appear: you might find you finish UI work on time but take three times longer whenever a database migration is involved. That is evidence you can act on, and something few candidates can show in an interview.
:::

::: context median-error Why the median, not the average
The median is the middle value once you sort the numbers. If your last five estimates were off by 10%, 20%, 30%, 40% and 400%, the median error is 30%, while the average is 100%, dragged up by one disaster.

The median describes your *typical* miss. The big outliers still matter, but they are better reported separately ("and once, badly, when…").
:::

::: context mid-level What the levels mean
Most tech companies grade engineers in levels, roughly junior, mid-level, senior, staff. The titles vary (L3, L4, E4…), but the idea is the same: a **junior** engineer needs tasks broken down for them, a **mid-level** engineer can take a loosely defined task, scope it and deliver it without close supervision, and a **senior** engineer does that for work spanning several people.

That is why scoping is the dividing line this module aims at.
:::
`;export{e as default};