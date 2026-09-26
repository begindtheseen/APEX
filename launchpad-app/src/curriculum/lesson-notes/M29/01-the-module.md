<!-- Context notes for M29/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[decision record|decision-record]] 2
[[design doc|design-doc]] 1
[[then fine-tune|fine-tune]] 1
[[distill|distill]] 1
[[SDK|sdk]] 1

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
