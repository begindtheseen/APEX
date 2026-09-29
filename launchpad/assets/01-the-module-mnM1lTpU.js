var e=`---
id: m33-the-module
title: "How a Language Model Works — what to understand and what to build"
minutes: 8
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
M6 said it plainly: no training, no backprop, no attention math. That was the right call in month
three and it is a debt now. You have shipped on a model you treat as a function; this module opens the
function. It is not a research course and it does not derive anything you will never use. The aim is
narrower and more useful: when a model card says "grouped-query attention," a release note says
"trained with reinforcement learning on verifiable rewards," or a price page charges more past a context
threshold, you know which part of the machine is being talked about and what it costs. Every module in
this layer leans on that. It assumes M24's Python and nothing else: no calculus beyond "the slope tells
you which way is downhill," no linear algebra beyond a matrix multiply, which you will write by hand once.

**Core concepts:** **Tokens are learned, not given** — byte-pair encoding (BPE: start from bytes,
repeatedly merge the most frequent adjacent pair into a new token) is why M6's token counts looked
strange. **Embeddings** — each token id indexes a row of a learned table, a vector the rest of the model
reads. **Attention is a weighted average**: each position makes a query, every earlier position offers a
key and a value, the weights are a softmax (a function that turns any list of numbers into positives
summing to one) over [[query-key dot products|attention-scores]] scaled by the square root of the head size, and a **causal
mask** hides the future. The **transformer block** — attention, then an MLP (a small two-layer network
applied to each position alone), each wrapped in a residual connection (the block's output is *added*
to its input) with [[layer normalization|layer-norm]] in front — stacked many times. **Next-token prediction**: the
last layer produces logits (one raw score per vocabulary entry), softmax makes them a distribution, and
sampling with a temperature picks one. **Training** is cross-entropy loss (how surprised the model was by
the true next token) pushed down by gradient descent, with backpropagation as the bookkeeping that
computes every parameter's slope in one backward pass. **Pretraining at scale** and **[[scaling laws|scaling-laws]]** —
loss falls smoothly and predictably as parameters, data and compute grow together, which is why bigger
worked. **Post-training turns a predictor into an assistant**: supervised fine-tuning (SFT) on
demonstrations, then preference methods — RLHF (reinforcement learning from human feedback), AI-feedback
variants such as constitutional methods, and DPO (direct preference optimization, which learns from
pairs of better and worse answers without a separate reward model). **Reasoning models**: reinforcement
learning on verifiable rewards (answers a program can check) and **test-time compute** — M6's effort
dial, seen from the inside. **Mixture-of-experts**: total parameters versus active parameters per token.
**Long context**: [[positional encoding|positional-encoding]] and M6's KV cache, now with its arithmetic. **Why models
hallucinate**, and a first look at **interpretability**.

> **A common belief here produces a feature that cannot work: that the model "looks things up" and
> sometimes gets it wrong.** There is no lookup. There is a distribution over the next token, and a
> fluent wrong continuation is exactly what the objective produces when the fact was rare or absent in
> the training data. OpenAI's September 2025 paper *Why Language Models Hallucinate* adds that most
> benchmarks grade a confident guess above "I don't know," so training toward them rewards guessing.
> For the builder this settles a design question: **you cannot prompt your way to truthfulness; you
> verify.** That is what M18's span-level citations and M12's graders are for, and this module is the
> reason they are not optional.

> **The masking trap — the bug that looks like success.** Forget the causal mask, or apply it after the
> softmax instead of before, and each position can see the token it is supposed to predict. Training loss
> drops faster than anything you have seen, and sampling produces garbage, because at generation time the
> future does not exist. **Test the mask, do not eyeball the loss:** change the token at position *t+1*
> and assert that the output at position *t* is identical to the last decimal. Write that test before the
> training loop.

> **Check the first number before the last one.** A freshly initialized model should be equally unsure
> of every token, so its first loss should be close to the [[natural log of the vocabulary size|step-zero-loss]] — about
> 6.24 for a 512-token vocabulary. If step zero reads 30, your initialization or your logits are wrong,
> and nothing that happens over the next hour of training will tell you so. Then report **validation**
> loss on text the model never trained on. On a corpus of a few megabytes a tiny model memorizes: training
> loss keeps falling while [[validation loss turns upward|overfitting]], and only the second curve is the model.

> **Currency: the recipe is the least published part of the field.** Architecture details for
> open-weight families are in their model cards, configuration files and technical reports; closed labs
> publish far less, and their post-training recipes almost nothing. Names like RLHF, DPO, GRPO (group
> relative policy optimization, the RL method the DeepSeek-R1 work made widely known) and constitutional
> training are **families**, not fixed procedures, and the mix changes release to release. In your
> explainer, mark every claim as *published* (with the source and its date), *measured by you*, or
> *inferred*. Appendix D has a dated snapshot of the landscape; the configuration file of a current
> open-weight model is the primary source.

**Checkpoints** ① a byte-pair tokenizer trained by hand: encode then decode reproduces held-out text byte
for byte, with token counts compared against M6's provider numbers on the same five texts · ② a bigram
baseline (predict the next token from the current one alone) trained, its step-zero loss checked
against ln(vocabulary), its validation loss written down as the number to beat · ③ one causal attention
head written from a blank file, passing the masking test · ④ the full tiny GPT: stacked blocks with
residuals, layer norm and MLP, parameter count predicted by hand before the code prints it, a train and
validation loss curve · ⑤ sampling at three temperatures [[plus top-k|top-k]], and a KV cache added to generation
with the speedup measured · ⑥ the explainer: every part of the tiny model mapped to its frontier
counterpart, each claim marked published, measured or inferred.

**Artifact** \`LAB\` — a tiny GPT trained from scratch on your laptop. A text corpus of 1 to 10 MB that you
chose and can legally use (public-domain books, your own notes, a code base with a permissive license);
your own BPE tokenizer with a vocabulary between 512 and 4,096; a decoder-only transformer of roughly 1 to
15 million parameters — for scale, 4 layers, 4 heads, a model width of 128 to 256 and a context of 128 to
256 tokens trains in well under an hour on a recent laptop (measure yours; do not trust that estimate).
**Attention, the mask, the softmax and the residual wiring are written by you**, as tensor operations;
you may use [[PyTorch's autograd|autograd]] for the backward pass and its optimizer, but not its built-in attention
modules in the graded file. A NumPy forward pass of one attention head checked against your PyTorch
version to within 1e-5. A training loop logging train and validation loss every few hundred steps and
saving the curve as an image. Sampling with temperature and top-k. A KV cache with measured
tokens-per-second before and after. Then **\`EXPLAINER.md\`**: a table with one row per part —
tokenizer, embeddings, positional scheme, attention, block, output head, loss, optimizer, sampling,
cache — and four columns: what yours is, what a current frontier or open-weight model uses instead, why
the difference exists at scale, and the source with its date. Add three rows for what your model does not
have at all: post-training, reasoning RL, mixture-of-experts.

**Three pieces of arithmetic you will be asked for.** First, **parameters**: each block holds about
[[12·d² weights|param-count]] for a model width d (4·d² in attention, 8·d² in an MLP four times as wide), plus the
embedding table at vocabulary × d. Predict your count on paper, then let the code print it; a gap means
you misunderstand a shape. Second, **the KV cache**: bytes per token = 2 (a key and a value) × layers ×
KV heads × head size × bytes per number. For an illustrative configuration of 32 layers, 8 KV heads, a
head size of 128 and 2-byte numbers, that is 131,072 bytes per token — 128 KiB — so 100,000 tokens of
context hold about 12 GiB of cache for one conversation, before the weights. That is why grouped-query
attention (several query heads sharing one key-value head) exists, why long context is priced
differently, and it is the formula M36 uses to predict memory before measuring it. Third, **mixture-of-
experts**: a router sends each token to a few of many expert MLPs, so compute per token follows the
*active* parameters while memory follows the *total*. A model card that gives only one of those two
numbers has not told you what it costs to serve.

**Reading, after your version runs, not before.** Karpathy's minbpe, nanoGPT and nanochat are the
reference implementations most working engineers learned from, and nanochat carries the whole pipeline —
tokenizer, pretraining, SFT and a GRPO-style RL stage — in one readable repository. Read them *after* the
checkpoint you are on passes. Typed from a reference, the same code teaches you to type. Optionally, run
Anthropic's open-source circuit-tracer once on a small open-weight model to see an attribution graph (a
map of which internal features pushed toward one output); it is the most direct view of "what is inside"
you can get on a laptop, and the tool changes quickly, so check its current supported models first.

::: context attention-scores How attention decides where to look
A dot product multiplies two lists of numbers entry by entry and adds up the results; it comes out large when the two vectors point the same way. Each position turns its vector into a query ("what am I looking for?"), and each position it may see offers a key ("what do I contain?") and a value ("what I pass on").

The query-key dot products score how well each visible token matches. Softmax turns those scores into weights, and the output is the weighted sum of the values. Reading "it" in "the cat sat down because it was tired," one head might put most of its weight on "cat."
:::

::: context layer-norm Keeping the numbers in a steady range
Layer normalization rescales each position's vector so its entries average zero with a spread (standard deviation) of one, then applies a learned scale and shift. Without it, numbers passing through dozens of stacked blocks can drift ever larger or smaller, and training becomes unstable.

"In front" means it runs on the input to attention and to the MLP, not on their output. This pre-norm arrangement, used by GPT-2 and most models since, trains more reliably in deep stacks. Many current models use a close cousin, RMSNorm, which skips subtracting the average.
:::

::: context scaling-laws Why bigger kept working
A scaling law is a curve, fitted to many training runs, that predicts loss from model size, training data and compute. Work at OpenAI (2020) and DeepMind (2022, the "Chinchilla" paper) found loss falls along a smooth power law, so a lab can train small models cheaply, fit the curve, and forecast what a far larger run will reach before paying for it.

Chinchilla also showed many large models had been trained on too little data for their size; its rule of thumb was roughly 20 training tokens per parameter. A lower loss does not promise any particular skill, which is why evals still matter.
:::

::: context positional-encoding Telling the model where each token sits
Attention on its own compares tokens by content, not position: shuffle the earlier words and the weighted average at the last position comes out exactly the same. Positional encoding adds the missing order.

The original transformer added fixed sine-wave patterns to each embedding; GPT-2 learned one vector per position; many current open-weight models use rotary position embeddings (RoPE), which rotate queries and keys by an angle that depends on position. This matters for long context: a model handles positions it never saw in training poorly, and context-extension methods work by adjusting the positional scheme.
:::

::: context step-zero-loss Why ln(vocabulary) is the starting number
Cross-entropy loss is minus the natural log of the probability the model gave the true next token. A freshly initialized model has learned nothing, so it should spread its probability evenly: 1/512 for each token of a 512-token vocabulary. Minus ln(1/512) is ln(512), about 6.24.

A much larger first loss means the untrained model is already confidently wrong about some tokens, usually because the output layer starts with weights that are too big. Checking this one number takes seconds and catches a bug that would otherwise waste a whole training run.
:::

::: context overfitting Memorizing instead of learning
Training loss is measured on the text the model learns from; validation loss on text held back from it. Early on both fall together. Once a small model has seen a small corpus many times, it starts memorizing exact passages: training loss keeps dropping, but predictions on new text get worse, so validation loss climbs.

That is **overfitting**, the same idea behind M12's held-out test set. The checkpoint worth keeping is usually the one near the bottom of the validation curve, and its validation loss is the number to report.
:::

::: context top-k Two dials on the dice roll
Sampling picks the next token at random according to the model's probabilities. **Temperature** divides the logits before the softmax: below 1 it sharpens the distribution toward the favorite, above 1 it flattens it so unlikely tokens are picked more often, and near 0 it becomes "always take the top token."

**Top-k** discards every token except the k most likely, rescales what remains to sum to one, and samples from that, so a one-in-ten-thousand oddity can never slip in. Hosted APIs expose versions of the same dials, and some reasoning models fix or remove them (M6).
:::

::: context autograd Slopes computed for you
Autograd is PyTorch's automatic differentiation. As your forward pass runs, it records every tensor operation; when you call \`loss.backward()\`, it walks that record in reverse, applying the chain rule, and stores in each parameter's \`.grad\` the slope of the loss with respect to that parameter. That is backpropagation, done as bookkeeping rather than by hand.

The optimizer then nudges every parameter a little downhill. The lesson allows it because deriving gradients by hand teaches calculus, not transformers; the understanding lives in the forward pass you write yourself.
:::

::: context param-count Where 12·d² comes from
In attention, four weight matrices each map a width-d vector to another width-d vector: queries, keys, values, and the output projection. Each is d × d, so 4·d². The MLP widens to 4d and back: a d × 4d matrix plus a 4d × d matrix, 8·d². Together that is 12·d² per block, ignoring the small bias and normalization terms.

At d = 256 that is 786,432 weights per block, so four blocks hold about 3.1 million, before the embedding table (a 4,096-token vocabulary × 256 adds 1,048,576).
:::
`;export{e as default};