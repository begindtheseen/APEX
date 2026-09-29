var e=`---
id: m38-the-gate
title: "Adapting a Model: Fine-Tuning and When Not To — the gate, and what most people miss"
minutes: 2
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
**GATE** — **REFEREE:** your reviewer, or an ML engineer if you have one, re-running the scoring: they load
your adapter through the same serving stack the numbers came from, re-score the held-out M12 test set, and
draw 20 test items at random to search for in your training data, [[near-duplicates included|near-duplicates]]. **PASS:** all
three arms — the adapter, the prompted frontier model given the same examples, and the M18 retrieval arm —
scored on the same held-out cases with n stated and a paired bootstrap interval on each difference, saying
out loud where an interval crosses zero; the forgetting set scored before and after; cost per 1,000
requests for each arm rebuilt from measured tokens and measured throughput, every rate dated and training
amortized over a stated volume; none of the 20 items found in the training data; the license or terms
clause for every data source quoted; and the written decision defended with those numbers, including the
monthly volume at which it would flip. "Do not fine-tune" passes on exactly the same terms as "fine-tune".
**ON FAIL:** a test item or a near-duplicate is in the training data, the frontier arm was prompted weaker
than it could be, or a difference is reported without its interval — rebuild the split, retrain, and
re-score all three arms.

**Most-missed:** Fine-tuning to add knowledge that retrieval should supply. · Comparing the adapter with a
zero-shot prompt instead of the same examples served in context. · Training with one chat template and
serving with another, or computing loss on the prompt tokens as well as the answer. · [[Picking the checkpoint|checkpoint]] on the test set, then reporting the test set. ·
Distilling from the same frontier model you use as the baseline and the judge, so the judge rewards its
own phrasing — M12's self-preference warning, now baked into the training data. · Pricing the GPU at full
utilization when the flagship keeps it busy an hour a day. · Evaluating on a 16-bit base and shipping on a
[[quantized one|quantized-base]]. · Forgetting that a hosted fine-tune expires with its base model, and that nobody gives you
the weights to take elsewhere. · Using flagship users' text without checking what your privacy policy
promised them. · Treating "the fine-tune did not help" as a failed module.

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
`;export{e as default};