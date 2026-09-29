<!-- Context notes for M38/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[few-shot examples|few-shot]] 2
[[low-rank adaptation|lora]] 1
[[chat template|chat-template]] 2
[[loss masking|loss-masking]] 2
[[direct preference optimization|dpo]] 1
[[all seven linear projections|seven-projections]] 1
[[two moments|optimizer-state]] 1
[[checkpointing|gradient-checkpointing]] 1
[[Learning rate first|learning-rate]] 1

::: context few-shot Teaching by example, inside the prompt
**Few-shot** prompting means putting a handful of worked examples (an input and the answer you want for it) in the prompt before the real input. The model picks up the pattern from them, which is called **in-context learning**.

Nothing about the model changes: remove the examples and the behavior goes with them. That is its strength. You can swap, add or fix an example in a minute, with no training run, which is why it sits so low on the ladder and why a fine-tune has to beat it to earn its cost.
:::

::: context lora Training a small correction instead of the whole model
Each layer of a model holds large grids of numbers (weight matrices). Full fine-tuning adjusts every number in them. **LoRA** freezes them and learns a correction built from two thin matrices, B and A, whose product has the same shape as the original.

```svg
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
```

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
