var e=`---
id: m40-the-gate
title: "The Frontier Capstone: Build Something New — the gate, and what most people miss"
minutes: 2
covers:
  - "The capability delta: what a new release does that the previous generation could not, stated as a task and measured on your own cases against the previous model, never read off a launch post"
  - "Newly possible and newly cheap, fast or local are both deltas, provided you measure them"
  - "Scoping to one job for one kind of person, with a kill date written before the first line of code"
  - "Built on Layer 9 by construction: at least two providers or one open model, and at least one non-text modality or an MCP server"
  - "Strangers, not friends: the only users whose behavior tells you anything. Acquisition starts in week one, and M2's four rules (spend limit, controlled access, call log, privacy line with delete-on-request) come back unchanged"
  - "The model-watch harness: detection, an adapter that makes a new model one configuration line, the M12 runner, a paired comparison against your production model, and a page that ends in a decision"
  - "The 48-hour clock as a design constraint: a harness that needs a day of edits per model cannot meet it"
  - "Launch-day noise: first-day benchmark claims, vibes posts, broken chat templates, and hosts that serve the same open weights at different quality. Evaluate through the maker's own API or reference configuration first, and name the host and quantization"
  - "A product on a preview model needs M35's failover, because previews change on the maker's schedule"
  - "Reading triage: release notes, then API changes and deprecations, then the model card's evaluation table and known limitations, then your own harness, and a paper only when your numbers say it matters"
  - "Drop-in score versus migrated score: report your production prompts unchanged separately from any re-tuned prompt, and tune on dev only"
  - "The decision a delta ends in: adopt, watch or ignore, with the trigger that re-opens it"
  - "The hand-off: Track 11's 30 minutes a week become a run and a read on this harness, and continue on your team's eval set once you are hired"
---
**GATE** — **REFEREE:** your reviewer, who names a hosted model your harness has never been configured for, watches you evaluate it from a [[clean clone|clean-clone]], then audits the timestamps, the call log and the write-up. **PASS:** the named model is added by one configuration line and its one-page delta comes out inside 2 hours, with the paired bootstrap interval against your production model and the dollar ceiling holding; the real evaluation's delta page is timestamped inside 48 hours of the maker's public announcement; the product's log shows at least 5 strangers completing the core job; the product runs on two providers or one open model and uses a non-text modality or an MCP server, shown live; and the write-up states the enabling delta with its interval and case count, cost per completed task, and p50 and p95 with the request count. **ON FAIL:** if the named model needed more than one configuration line, fix the adapter and repeat on a second model the reviewer names; if the strangers are short, keep acquiring and never count people you know; if the 48-hour window was missed, wait for the next release, because the window is not extended.

**Most-missed:** Building the flagship again with a newer model and calling it new. · Taking the launch
post's benchmark as the enabling claim instead of measuring the predecessor on the same cases. ·
Counting friends, colleagues or the reviewer as users. · Scoring an open model through a broken chat
template or an unnamed host and publishing the result as the model's. · A harness that is really a
script edited by hand for each release. · Comparing a [[migrated prompt|migrated-prompt]] on the new model with the old
prompt on the old model and reporting the gap as the model. · Shipping on a preview model with no
[[failover|failover]]. · Reading every paper that trends, or none; the harness decides which one. · A delta page
with no decision on it, which is a news summary.

::: context clean-clone Proving the repository is complete
A **clean clone** is a fresh copy of the repository in a new folder or on another machine, with none of your local files, caches, installed packages or settings.

A harness that works on your laptop may secretly depend on a file you never committed, a package you installed months ago, or an environment variable you set once. Running from a clean clone, with only the setup the README describes, shows that anyone (including you, next year) can run it.
:::

::: context migrated-prompt Changing two things at once
A **migrated prompt** is one you rewrote to suit the new model. Comparing the new model with its new prompt against the old model with its old prompt changes two things at once, so you cannot say how much of the gap came from the model and how much from the prompt.

The fair reports are the **drop-in** score (both models, same production prompt) and, separately, the migrated score, with the prompt tuned on dev only. The old model might have improved just as much with the new prompt.
:::

::: context failover Switching to a backup automatically
**Failover** means that when the primary service fails or disappears, requests switch automatically to a backup, here another model or provider behind the same interface.

A preview model can be rate-limited, changed or withdrawn on short notice. With failover, users get a slightly different model instead of an error page. It only works if the backup has been evaluated on the same tasks and the switch has actually been tested, not just written.
:::
`;export{e as default};