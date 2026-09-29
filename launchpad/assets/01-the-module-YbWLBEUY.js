var e=`---
id: m38-the-module
title: "Adapting a Model: Fine-Tuning and When Not To — what to understand and what to build"
minutes: 9
covers:
  - "The adaptation ladder: prompt, few-shot examples, retrieval (M18), fine-tune, train. Each rung costs more to build, to keep current and to throw away, and most problems stop at the second or third rung because frontier models learn well from examples in the prompt"
  - "Fine-tuning changes form, retrieval supplies facts. A fine-tune teaches a format, a style, a narrow decision boundary or a shorter prompt; it is an unreliable way to add knowledge and a stale one the day the knowledge changes"
  - "LoRA: the base weights stay frozen and two thin matrices per layer learn the change, so the result is an adapter of megabytes, not a copy of the model"
  - "QLoRA: the frozen base held in 4-bit while the adapter trains at higher precision. M36's memory arithmetic applied to training, with activations as the number that decides whether it fits"
  - "The chat template and loss masking: train on the exact token layout you serve with, and compute loss on the assistant's tokens only"
  - "A loss curve is not an eval. Only M12's runner on held-out cases, through the serving stack you would ship, produces a number this module accepts"
  - "The fair fight: the honest competitor to a fine-tune on 500 examples is those same examples served in context, by a prompted frontier model and by M18's retriever as dynamic few-shot"
  - "Overfitting (training loss falls while validation loss rises) and catastrophic forgetting (better at the task, worse at everything else), both measured with their own sets"
  - "Hosted fine-tuning APIs: upload examples, get a model id, never the weights. The tunable tier trails the newest models and the fine-tune expires with its base"
  - "Preference tuning with DPO: pairs of a better and a worse answer, for when you can judge outputs but cannot write the ideal one. Rejected answers can come from failures you labeled in M12"
  - "Distillation: a large teacher writes training data for a small student, governed by the teacher's terms of service and license, which you quote and date before you start"
  - "Dataset construction: provenance per row, licensing and consent, near-duplicate separation from the test set, and the fact that an adapter cannot forget one user without being retrained"
  - "Serving an adapter: vLLM with LoRA enabled or llama.cpp with a GGUF adapter, merged or unmerged, evaluated in the exact configuration that ships"
  - "Cost per 1,000 requests with utilization counted and training amortized, and the monthly volume at which self-hosting beats the API"
---
The Cut List removed model training for the job the rest of this program aims at, and for that job the
cut stands. This module exists because "should we fine-tune?" is a question every team working with
models eventually asks with money on the line, and the people who answer it well have run the experiment
rather than read about it. It pays off three things: M33's post-training (now you run a small version
of it), M36's open weights and memory arithmetic (the model you train here is one you already ran), and M18's retrieval (the rung below fine-tuning, and the arm fine-tuning most often loses
to). **The product of this module is a decision, not an adapter.** The adapter is one arm of an
experiment, and "do not fine-tune" is an allowed, often correct, result.

**Core concepts:** **The adaptation ladder** — prompt, [[few-shot examples|few-shot]], retrieval (M18), fine-tune,
train (continued pretraining or from scratch) — each rung costing more to build, more to keep current and
more to throw away, and **most problems stop at the second or third rung** because frontier models learn
well from examples placed in the prompt. **Fine-tuning changes form, retrieval supplies facts:** a
fine-tune teaches a format, a style, a narrow decision boundary or a shorter prompt; it is an unreliable
way to add knowledge and a stale one the day the knowledge changes. **LoRA** ([[low-rank adaptation|lora]]): the
original weights stay frozen and you train two thin matrices per layer whose product is the change, so
the result is an **adapter** of megabytes rather than a copy of the model. **QLoRA** keeps the frozen
base in 4-bit and trains the adapter at higher precision, which is what makes a mid-sized model fit one
card — M36's memory arithmetic, applied to training. **The [[chat template|chat-template]] and [[loss masking|loss-masking]]**: train on the
exact token layout you will serve with, and compute loss on the assistant's tokens only. **Overfitting**
(training loss falls while validation loss rises) and **catastrophic forgetting** (the model gets better
at your task and worse at everything else), both measured, neither assumed. **Hosted fine-tuning APIs**,
where you upload examples and get back a model id but never the weights. **Preference tuning (DPO**,
[[direct preference optimization|dpo]]): training on pairs of a better and a worse answer, for when you can judge
outputs but cannot write the ideal one. **Distillation**: a large teacher model writes the training data
for a small student, **governed by the teacher's terms of service**. **Dataset construction, cleaning
and licensing**, including what training on user data does to M21's delete path. **Serving an adapter**,
and pricing it per 1,000 requests with the idle hours counted.

> **The common belief that is wrong: "fine-tune it on our documents so it knows them."** A fine-tune on
> facts produces a model that states them in the right voice and gets a share of them wrong, with no
> citation to check against, and every edit to a document means a retrain. That is M18's job, and M18
> already gave you span-level citations. Reach for a fine-tune when the failure in your M12 taxonomy is
> about *shape* — the output breaks a schema the prompt keeps failing to hold, the tone drifts, the
> prompt needs forty examples to behave and you pay for them on every request — or when a small model
> has to do a frontier model's narrow job for a fraction of the cost or latency. Check prompt caching
> (M6) before "the prompt is too long" becomes your reason; a cached prefix may already have made it
> cheap.

> **A loss curve is not an eval.** Training loss measures how well the model predicts your training
> tokens, which a model can do perfectly while getting worse at the task. The only numbers this module
> accepts come from M12's runner, on held-out cases, **through the serving stack you would ship** — the
> same base precision, quantization and chat template. An adapter evaluated in a notebook with a
> hand-written prompt format is a different system from the one you would ship. A template mismatch
> fails silently: no error, just a model that is a little worse than it was in training.

> **The fair fight.** The tempting comparison is the tuned model against a bare, zero-shot prompt. That
> is a strawman. The honest competitor to a fine-tune on 500 examples is **the same 500 examples used
> without training**: the frontier model with its best prompt plus a handful of them, and M18's retriever
> pulling the most similar labeled examples into the prompt for each request (dynamic few-shot). If the
> tuned model cannot beat its own training data served through retrieval, the training bought nothing.

> **Terms you must read yourself.** The major providers' terms restrict using their outputs to develop
> models that compete with them; whether a narrow task-specific student falls inside that clause is a
> legal reading, not an engineering one. Open-weight licenses differ from each other, and some attach
> conditions to models trained on their outputs. Before you distill, **quote the clause, name the
> version and date of the terms you read**, and if it is ambiguous, use human labels or a teacher whose
> license plainly permits it.

> **Currency: fast decay.** Which hosted models can be fine-tuned, and by which methods (supervised,
> preference, reinforcement with a grader), changes by quarter, and the tunable tier usually trails the
> newest models. A hosted fine-tune also dies with its base model's deprecation, so the lifecycle date is
> part of the decision. TRL, PEFT and Unsloth rename trainer options between releases, the loss-masking
> flag included. The week you build, read
> each tool's current documentation, record the versions, the prices and the date, and put the
> differences in your \`DELTA.md\`.

**Checkpoints** ① the first rungs scored: the prompted frontier model and a few-shot variant on the M12
held-out set, with intervals, before any training exists · ② the dataset: at least 500 training rows for
one narrow task, deduplicated against the test set with a near-duplicate search, every row carrying a
source and a license or consent column · ③ the first LoRA run on a small open model, with train and
validation loss plotted and the adapter answering through your serving stack · ④ all three arms scored
on the same held-out cases with paired bootstrap intervals, plus a forgetting set scored before and after
· ⑤ cost per 1,000 requests for each arm, from measured tokens and measured throughput · ⑥ the written
decision, with the volume at which it would flip.

**Artifact** \`LAB\` — a LoRA fine-tune of a small open model (one you ran in M36, or a smaller sibling)
on **one narrow flagship task** — a classification, an extraction into a fixed schema, a routing decision
or a rewrite into a house style; pick one your M12 taxonomy says is failing on shape. Train on **at least
500 examples**, tune on dev only, and score on the **held-out M12 test set, at least 100 cases, n
stated**. Three arms, same cases, same graders: **(a) the prompted frontier model** with its best prompt
and a few of the same examples; **(b) the M18 retrieval approach** — retrieved labeled examples, or
retrieved corpus chunks if the task needs facts, named in writing; **(c) the adapter**, served the way it
would ship (vLLM with LoRA enabled, or llama.cpp with the adapter converted to GGUF — check both tools'
current flags). Each difference reported with its **paired bootstrap interval** (M12: resample the
per-item differences). A **forgetting set of at least 30 cases** outside the task, scored on the base
model and on the adapter. **Cost per 1,000 requests** for each arm, and a one-page decision. One DPO run
is optional, its rejected answers taken from failures you labeled in M12.

**The memory arithmetic, before you rent anything.** Read the model's \`config.json\` and predict, as M36
taught. For an illustrative 8B model with 32 layers, hidden size 4,096, an MLP width of 14,336 and
grouped key/value projections of width 1,024, LoRA at rank 16 on [[all seven linear projections|seven-projections]] adds
16 × (8,192 + 5,120 + 5,120 + 8,192 + 3 × 18,432) = 1,310,720 parameters per layer, about **42 million**
in all: roughly 0.5% of the model, an adapter of about 84 MB in 16-bit. The QLoRA base is about 8 billion
× half a byte, a little over **4 GB**. The adapter's optimizer state is about 14 bytes per trained
parameter (16-bit gradients plus 32-bit weights and [[two moments|optimizer-state]]), about 0.6 GB. **Activations are the
number that decides whether it fits**, and they scale with sequence length and batch size; gradient
[[checkpointing|gradient-checkpointing]] trades compute for them. Write the prediction down, then read the real peak from the
training log.

**The cost arithmetic, which is where fine-tunes usually lose.** A self-hosted adapter costs
1,000 × G ÷ (u × R) per 1,000 requests, where G is the GPU's price per hour, R the requests per hour it
sustains at your latency target (measured, M36) and u the fraction of hours it is busy. Illustrative: at
G = $2.00 and R = 3,600, full utilization gives $0.56 per 1,000; at u = 5%, the same card costs $11.11.
Add the training bill amortized over the requests the adapter will serve before you retrain — an
illustrative $40 of runs over 200,000 requests is $0.20 per 1,000 — and compare against the API arms
priced from their usage objects with dated rates (M20 owns the method). **Solve for the monthly volume
where the lines cross**; that number is the core of the decision, and many flagships never reach it.

**Hyperparameters that matter.** [[Learning rate first|learning-rate]]: LoRA wants a markedly higher rate than full
fine-tuning (published work from 2025 puts it near ten times; check current guidance), and changing rank
or alpha without revisiting it confounds the result. Apply LoRA to all linear layers, not attention alone.
One to three epochs. At most two configurations, on dev — M18's warning about picking a winner from many
arms on a small set applies unchanged.

**The data owes you three things.** Provenance: every row says where it came from. Licensing and consent:
flagship users' text in a training set is a use your privacy policy has to cover, and **an adapter cannot
forget one user without being retrained** — add that row to M21's written list of what cannot be deleted,
with the retraining path. Separation: exact-match deduplication is not enough; search for near-duplicates
of every test item, because paraphrased copies inflate the score exactly the way M18's LLM-written golden
set did.

::: context few-shot Teaching by example, inside the prompt
**Few-shot** prompting means putting a handful of worked examples (an input and the answer you want for it) in the prompt before the real input. The model picks up the pattern from them, which is called **in-context learning**.

Nothing about the model changes: remove the examples and the behavior goes with them. That is its strength. You can swap, add or fix an example in a minute, with no training run, which is why it sits so low on the ladder and why a fine-tune has to beat it to earn its cost.
:::

::: context lora Training a small correction instead of the whole model
Each layer of a model holds large grids of numbers (weight matrices). Full fine-tuning adjusts every number in them. **LoRA** freezes them and learns a correction built from two thin matrices, B and A, whose product has the same shape as the original.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 150" font-family="Inter, Arial, sans-serif">
  <rect x="15" y="20" width="100" height="100" fill="#e8eef8" stroke="#1f2a44" stroke-width="2"/>
  <text x="65" y="66" font-size="13" text-anchor="middle" fill="#1f2a44">W</text>
  <text x="65" y="82" font-size="11" text-anchor="middle" fill="#1f2a44">frozen</text>
  <text x="65" y="138" font-size="11" text-anchor="middle" fill="#1f2a44">4,096 × 4,096</text>
  <text x="140" y="75" font-size="18" text-anchor="middle" fill="#1f2a44">+</text>
  <rect x="165" y="20" width="12" height="100" fill="#8fb8f0" stroke="#1d6fd1" stroke-width="2"/>
  <text x="171" y="138" font-size="11" text-anchor="middle" fill="#1d6fd1">B</text>
  <text x="192" y="75" font-size="14" text-anchor="middle" fill="#1f2a44">×</text>
  <rect x="205" y="64" width="100" height="12" fill="#8fb8f0" stroke="#1d6fd1" stroke-width="2"/>
  <text x="255" y="96" font-size="11" text-anchor="middle" fill="#1d6fd1">A</text>
  <text x="255" y="138" font-size="11" text-anchor="middle" fill="#1d6fd1">rank 16: trained</text>
</svg>
\`\`\`

For one 4,096 × 4,096 matrix, that is about 16.8 million frozen numbers against 2 × 4,096 × 16 = 131,072 trained ones, under 1%. The "rank" is the thin side's width. Only B and A are saved, which is why the adapter is megabytes.
:::

::: context chat-template The exact text wrapper around every message
A chat model never sees "messages". It sees one long string in which special tokens mark where the system prompt, each user turn and each assistant turn begin and end. The recipe that turns a message list into that string is the model's **chat template**, and every model family has its own.

The model learned during training to expect its template exactly. Train with one layout and serve with a slightly different one (a missing token, a different role marker) and nothing errors; the model just behaves a little worse, which is why the lesson insists on the same template end to end.
:::

::: context loss-masking Grading only the answer, not the question
During training, the model predicts each next token and is scored on how wrong it was; that score is the **loss**. By default every token in a training example counts, including the system prompt and the user's message.

**Loss masking** excludes those prompt tokens from the score, so the model is only graded on writing the assistant's reply. Without it, much of the training effort goes into learning to reproduce your prompts, which you will always supply anyway, instead of learning the answers you want.
:::

::: context dpo Learning from "this one is better"
**DPO**, introduced in a 2023 research paper, trains a model on pairs of answers to the same prompt: one marked better, one worse. The model is nudged to make the better answer more likely than the worse one, while a frozen copy of the starting model keeps it from drifting too far.

The older recipe, reinforcement learning from human feedback, first trained a separate reward model and then ran a reinforcement learning loop against it. DPO skips both, which makes it much simpler to run. Its use case is taste: you can tell which of two replies is better long before you could write the perfect one.
:::

::: context seven-projections Where the 42 million comes from
Each layer of this kind of model has seven weight matrices that transform its input. Four sit in **attention**: query, key, value and output. Three sit in the **MLP**, the feed-forward block: gate, up and down. LoRA on a matrix that maps a width *in* to a width *out* adds rank × (in + out) numbers.

Query and output map 4,096 to 4,096 (8,192). Key and value map 4,096 to only 1,024 (5,120), because in **grouped-query attention** several query heads share one key and value head. Gate and up map 4,096 to 14,336, and down maps it back (18,432 each). Times 16, then times 32 layers: 41,943,040.
:::

::: context optimizer-state The memory the trainer keeps per number
The optimizer is the algorithm that decides how to change each weight after every step. The usual choice, **Adam** (in its AdamW variant), keeps two running averages for every trained number: one of its recent gradients and one of their squares. Those are the **two moments**, and they let it take steadier, better-sized steps.

Stored in 32-bit alongside a 32-bit copy of the weight and a 16-bit gradient, that is 4 + 4 + 4 + 2 = 14 bytes per trained number. Because the frozen base is not trained, it needs none of this, which is much of why LoRA fits where full fine-tuning does not.
:::

::: context gradient-checkpointing Gradient checkpointing: trading time for memory
To learn, the trainer needs the intermediate results (**activations**) of every layer from the forward pass when it works backward to compute gradients. Normally it keeps all of them in GPU memory, and they grow with sequence length and batch size.

**Gradient checkpointing** keeps only some of them and recomputes the rest during the backward pass when they are needed. Each training step gets slower, but peak memory drops a lot, which is often the difference between a run that fits on one card and one that crashes out of memory.
:::

::: context learning-rate How big a step each update takes
The **learning rate** sets how far the weights move after each batch of examples. Too high and the loss jumps around or blows up; too low and the model barely learns in the epochs you run.

LoRA adds a second knob that interacts with it: the trained correction is multiplied by **alpha ÷ rank** before it is added. Change rank or alpha and you have changed the effective step size too, so if the score moves you cannot tell which change caused it. That is why the lesson says to revisit the learning rate whenever either changes.
:::
`;export{e as default};