<!-- Context notes for M33/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[one-hot weights|scaling-softmax]] 1
[[floating-point order|fp-order]] 1
[[70B|parameter-memory]] 1
[[visible chain of thought|cot-faithfulness]] 2

::: context scaling-softmax Why divide by the square root
A dot product adds one product per dimension, so for random vectors its typical size grows with the square root of the head size: at 64 dimensions, scores run about eight times larger than at one. Softmax exaggerates gaps. Feed it scores like 40, 10 and 5 and nearly all the weight lands on the first, a "one-hot" pattern (a single 1, the rest 0).

Then almost no gradient reaches the other positions and learning stalls. Dividing by the square root of the head size brings the scores back to a typical size of about one.
:::

::: context fp-order Same inputs, slightly different sums
Computer arithmetic on fractions rounds at every step, so (a + b) + c can differ from a + (b + c) in the last digits. A hosted API groups your request with other people's into a batch, and the batch's size and shape change the order in which the GPU adds numbers up.

A tiny difference can flip which token scores highest, and once one token differs, everything after it diverges. So temperature 0 on a shared server narrows the output but does not guarantee the same text twice.
:::

::: context parameter-memory Turning a parameter count into gigabytes
"70B" means 70 billion parameters, not 70 gigabytes. Memory is parameters times bytes per parameter: at 16-bit (2 bytes each) that is 140 GB for the weights alone; at 8-bit, 70 GB; at 4-bit, about 35 GB plus some overhead.

Then add the KV cache, which grows with context length and with the number of conversations served at once. The headline number on a model card is where the arithmetic starts, not the answer. M36 does this calculation on real hardware.
:::

::: context cot-faithfulness The reasoning you see is not a transcript
A reasoning model's visible chain of thought is text the model generated, shaped by training like any other output. Published research, including Anthropic's, has found cases where a model used a hint or shortcut to reach its answer and its written reasoning never mentioned it.

The chain of thought is useful evidence of what the model considered, but not a guaranteed record of the computation that produced the answer. Some providers also show a summary rather than the raw reasoning.
:::
