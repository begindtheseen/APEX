var e=`---
id: m28-the-gate
title: "The Evidence Layer v1 — the gate, and what most people miss"
minutes: 2
covers:
  - "A resume that maps each claim to a repo"
  - "Two pinned repos now; the pinned three (flagship, open-source history, a write-up) arrive in M29. Three, not four — there is no second product in this program, and promising a reader one you never build is the same defect as any other unsupported number"
  - "Rehearsing only the sentences your artifacts can back today. The distributed-systems and algorithms answers are yours at this point; the fine-tuning and framework answers need M12 and M19, and they belong in M29"
  - "Lab vs Evidence — labs are private"
---
**GATE** — **REFEREE:** **two strangers**, each from a place you name in advance where this ask is on
topic and welcome — a chat server for a language or framework with a feedback or show-and-tell channel, a
project’s own discussions tab, or a local meetup’s chat. Post the README link with one line: *"Five minutes, three
questions, no back-and-forth: what does this do, who is it for, what does it refuse to do?"* Five-minute
timebox each, answers **in writing.** Then **a third pass you run yourself** against the written answers:
for each question, mark the exact sentence in the README they got it from, and **if there is no such
sentence, that is the finding.** **PASS:** **2/2** on all three questions, **plus your own marked-up
README** showing where each correct answer came from. **ON FAIL:** rewrite, then **two fresh strangers.**
**Nobody is burned permanently** — a person who has read v1 can read v3 cold if enough has changed, and
treating a scarce resource as single-use is how you run out of it.

**Most-missed:** Pinning the lab repos, which reads as coursework. · Rehearsing an answer about work you
have not done yet. If the sentence needs an eval number or a hand-rolled agent loop and you have neither,
it is not your sentence yet. · A long skills list you cannot defend. A short one you can be grilled on
every line of reads as competence — **pick the number that matches what you can actually defend** rather
than a number from a rule. On "[[Prompt Engineering|prompt-engineering]]" as a line item: it reads thin to a lot of engineers,
**and** it is named explicitly in a meaningful share of 2026 postings, and a [[keyword filter|keyword-filter]] does not share
anyone’s taste. That is a [[funnel decision|funnel]]. If your twenty postings ask for it, put it on and be ready to
say what you mean by it.

::: context prompt-engineering Writing instructions for a model
Prompt engineering means designing the instructions, examples and context you give a language model so that it does the task reliably. Done seriously, it involves measurement: changing a prompt and checking the change against an eval set.

Some engineers see it as a thin skill on its own, because anyone can type a prompt. Being ready to say what you actually did, with numbers, turns the line on your resume from a buzzword into evidence.
:::

::: context keyword-filter How resumes get found
Most companies collect applications in an **applicant tracking system** (ATS) such as Greenhouse, Lever or Workday. Recruiters often search or filter the applicants in it by keywords.

So a skill you have but never wrote down may never come up in the search. Matching the posting's own words, honestly, is simply making sure you can be found.
:::

::: context funnel The job search as a funnel
A job search works like a funnel: many applications at the top, fewer recruiter screens, fewer interviews, and a few offers at the bottom. Tracking how many move from each stage to the next shows where you are losing people.

A "funnel decision" is one made to improve those numbers, for example adding a keyword that gets more applications past the first filter, rather than a matter of taste.
:::
`;export{e as default};