<!-- Context notes for M38/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[near-duplicates included|near-duplicates]] 1
[[Picking the checkpoint|checkpoint]] 1
[[quantized one|quantized-base]] 1

::: context near-duplicates Copies that exact matching misses
A **near-duplicate** is the same item with small changes: reworded, reformatted, a name swapped, extra whitespace. An exact-match check only catches identical text, so these slip through.

If a test item has a close twin in the training data, the adapter can score well on it by memory rather than skill, and the result overstates what it will do on new inputs. Finding them takes a similarity search, for example comparing embeddings as in M18 and reviewing every pair above a threshold by hand.
:::

::: context checkpoint A saved snapshot partway through training
Trainers save the model's weights at intervals, after every few hundred steps or every epoch; each save is a **checkpoint**. Later checkpoints are not always better, because the model can start overfitting, so you choose one.

That choice is a tuning decision, like any other, and belongs on the dev set. Choose the checkpoint that scores best on test and then report that same test score, and you have quietly fitted to the test set: the number is higher than a fresh set would give.
:::

::: context quantized-base Why lower precision changes the result
**Quantization** stores each weight in fewer bits, for example 4 instead of 16, so the model uses far less memory. Each weight is rounded slightly, and the rounding changes the model's outputs a little.

An adapter learned a correction relative to one exact set of base weights. Put it on a differently rounded base and the correction no longer lines up perfectly, usually a small loss, occasionally a larger one on your particular task. Only evaluating the configuration you will actually ship tells you which.
:::
