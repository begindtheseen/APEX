var e=`---
id: m33-the-gate
title: "How a Language Model Works — the gate, and what most people miss"
minutes: 2
covers:
  - "Tokens are learned, not given: byte-pair encoding starts from bytes and repeatedly merges the most frequent adjacent pair, which is why M6's token counts looked strange"
  - "Embeddings: each token id indexes a row of a learned table, a vector the rest of the model reads"
  - "Attention is a weighted average: queries against keys, scaled by the square root of the head size, softmax over the scores, then a weighted sum of values"
  - "The causal mask hides the future; forget it and training loss falls beautifully while samples are garbage. Test it by changing token t+1 and asserting position t is unchanged"
  - "The transformer block: attention then an MLP, each wrapped in a residual connection with layer normalization in front, stacked many times"
  - "Next-token prediction: logits, softmax, and sampling with temperature and top-k"
  - "Training: cross-entropy loss pushed down by gradient descent, with backpropagation as the bookkeeping that computes every parameter's slope in one backward pass. Step-zero loss should be near ln(vocabulary size); report validation loss, not training loss"
  - "Pretraining at scale and scaling laws: loss falls smoothly and predictably as parameters, data and compute grow together, which is why bigger worked"
  - "Post-training turns a predictor into an assistant: supervised fine-tuning, then preference methods (RLHF, AI-feedback and constitutional variants, DPO)"
  - "Reasoning models: reinforcement learning on verifiable rewards, and test-time compute as M6's effort dial seen from the inside"
  - "Mixture-of-experts: compute per token follows active parameters, memory follows total parameters"
  - "Long context: positional encoding, and the KV cache from M6 with its arithmetic, bytes per token = 2 x layers x KV heads x head size x bytes per number, which is why grouped-query attention exists"
  - "Why models hallucinate: there is no lookup, only a distribution, and graded benchmarks reward guessing. You verify (M18, M12); you cannot prompt your way to truthfulness"
  - "A first look at interpretability: features and attribution graphs, and why a visible chain of thought is not always a faithful record"
---
**GATE** — **REFEREE:** an ML engineer, or your reviewer if no ML engineer is available, watching a
screen share as you open a blank file, with 90 minutes on the clock, library documentation allowed, no
AI assistant and no copy of your own code. **PASS:** you write causal multi-head self-attention from
the blank file and it passes three tests the referee runs: output shapes, the masking test (changing the
token at position t+1 leaves the output at position t unchanged), and agreement with a reference
implementation to within 1e-5; you drop it into your tiny GPT and its validation loss beats your bigram
baseline on camera; then, pointing at your own lines, you show the referee where the KV cache would
attach and what a mixture-of-experts layer would replace. **ON FAIL:** name the mistake in writing —
mask, scaling or shapes — wait 7 days, and rebuild from a blank file.

**Most-missed:** Omitting the division by the square root of the head size, so the softmax saturates to
[[one-hot weights|scaling-softmax]] and training stalls. · Reporting training loss without a validation split, and calling
memorization learning. · Treating temperature 0 as a guarantee of identical output on a hosted API;
batching and [[floating-point order|fp-order]] make that false in practice, and on some current models the parameter
is gone (M6). · Reading "[[70B|parameter-memory]]" as a memory figure without multiplying by bytes per parameter and adding
the cache. · Assuming a mixture-of-experts model is as cheap to host as its active parameter count
suggests. · Taking a reasoning model's [[visible chain of thought|cot-faithfulness]] as a faithful record of how it reached
the answer; published interpretability work shows it is not always one. · Copying nanoGPT line by line and
counting it as the artifact. · Writing "the model knows" or "the model remembers" in an explainer. It
has weights and a context window, and every claim about what it can do should say which of the two it
comes from.

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
`;export{e as default};