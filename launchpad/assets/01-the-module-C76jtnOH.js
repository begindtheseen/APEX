var e=`---
id: m29-the-module
title: "The Evidence Layer v2 — what to understand and what to build"
minutes: 1
covers:
  - "The README as product spec plus decision record"
  - "Publishing the failing v1 numbers alongside the improved ones"
  - "The write-up genre that converts: a numbered account of something that went wrong in your own system"
---
**Core concepts:** The README as product spec plus [[decision record|decision-record]]. Publishing the failing v1 numbers
alongside the improved ones. The write-up genre that converts: a numbered account of something that went
wrong in your own system.

**Artifact** \`EVIDENCE\` — the flagship README carrying **the eval numbers including the failing v1** —
the improvement delta is the evidence of engineering; a single good number could have been luck. A
decision log of the five choices that mattered. One public write-up of a measurement you made. **The
final pinned three:** the flagship · the open-source contribution history · one [[design doc|design-doc]] or public
write-up.

**Plus the two sentences M28 could not honestly rehearse**, now that what they describe exists:

- **Fine-tuning** — *"Prompt, then retrieval, [[then fine-tune|fine-tune]], then [[distill|distill]]. Here’s what each cheaper rung
  cost, and here’s the number from my own eval set that says the earlier rungs hadn’t run out."*
- **Frameworks** — *"I hand-rolled the agent loop at the wire level, then ran the same agent on an [[SDK|sdk]]
  tool runner and wrote up what the hooks bought and what they hid."*

::: context decision-record Writing down why, not only what
A decision record captures an important choice: the options you considered, the one you picked, the reason, and what would make you revisit it. A handful of these, such as "Postgres queue instead of a hosted one, because…", shows how you think.

Hiring managers cannot watch you work, but they can read your reasoning. That is exactly what a good decision record shows them.
:::

::: context design-doc Thinking on paper before building
A design doc is a document written before (or while) building something substantial. It states the problem, the proposed design, the alternatives considered and the trade-offs. Colleagues comment on it, and the arguments happen in the document instead of in the code.

Many tech companies use them routinely, so a public one shows you already work in the form teams use.
:::

::: context fine-tune Training a model further on your examples
Fine-tuning means taking an already trained model and training it a bit more on your own examples, so it picks up a specific task, format or style.

It costs more effort than better prompting or better retrieval, and it is harder to update, which is why the usual order is cheaper steps first. Saying "the numbers showed prompting and retrieval had not run out yet" is a mature answer.
:::

::: context distill A small model learning from a big one
Distillation trains a smaller, cheaper **student** model to imitate the outputs of a larger **teacher** model on your task. Done well, the student gets close to the teacher on that task at a fraction of the cost and latency.

It sits at the end of the ladder because it needs a lot of good examples, and usually a working system on a big model first.
:::

::: context sdk Software development kit
An SDK, a **software development kit**, is a ready-made library a company publishes so you can use its service without hand-writing every request, for example the official Python or TypeScript SDK for a model provider's API.

SDKs save time and handle details like retries, but they also hide what is happening on the wire. Having built it once by hand, you can say exactly what the SDK is doing for you.
:::
`;export{e as default};