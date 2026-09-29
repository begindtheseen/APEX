<!-- Context notes for M33/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[query-key dot products|attention-scores]] 1
[[layer normalization|layer-norm]] 2
[[scaling laws|scaling-laws]] 2
[[positional encoding|positional-encoding]] 2
[[natural log of the vocabulary size|step-zero-loss]] 1
[[validation loss turns upward|overfitting]] 1
[[plus top-k|top-k]] 1
[[PyTorch's autograd|autograd]] 1
[[12·d² weights|param-count]] 1

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
Autograd is PyTorch's automatic differentiation. As your forward pass runs, it records every tensor operation; when you call `loss.backward()`, it walks that record in reverse, applying the chain rule, and stores in each parameter's `.grad` the slope of the loss with respect to that parameter. That is backpropagation, done as bookkeeping rather than by hand.

The optimizer then nudges every parameter a little downhill. The lesson allows it because deriving gradients by hand teaches calculus, not transformers; the understanding lives in the forward pass you write yourself.
:::

::: context param-count Where 12·d² comes from
In attention, four weight matrices each map a width-d vector to another width-d vector: queries, keys, values, and the output projection. Each is d × d, so 4·d². The MLP widens to 4d and back: a d × 4d matrix plus a 4d × d matrix, 8·d². Together that is 12·d² per block, ignoring the small bias and normalization terms.

At d = 256 that is 786,432 weights per block, so four blocks hold about 3.1 million, before the embedding table (a 4,096-token vocabulary × 256 adds 1,048,576).
:::
