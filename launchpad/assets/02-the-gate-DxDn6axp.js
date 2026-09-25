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
**GATE** — **REFEREE:** a vague two-sentence ticket written by the reviewer, cold, and the reviewer
playing a PM who will not take no. **PASS:** clarifying questions and a sliced plan in 15 minutes;
defend what you would cut if the deadline halved; **and report a result that missed its target, in
writing, without apologizing and without asking for more time.** **ON FAIL:** more data points — the
estimate log is a standing item from M3, not three points gathered here.

> **The estimate log is a standing item from M3, not three data points here.** Costs nothing, produces
> dozens of points by the time you are interviewing, and *"my median estimate error is X and I most
> reliably underestimate Y"* is a better mid-level signal than anything else in this document.

**Most-missed:** Disappearing for nine days on something that should have been scoped to two, and
delivering more than was asked. This is what most "not mid-level yet" feedback means. · Having no
stop-or-continue rule on an open-ended ticket, so it absorbs three days or three months identically.
· Apologizing for a missed target or asking for more time, instead of reporting the result and the
evidence.
`;export{e as default};