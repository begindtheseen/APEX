var e=`---
id: m36-the-module
title: "Open Weights on Your Own Hardware — what to understand and what to build"
minutes: 8
covers:
  - "Where open weights live: a Hugging Face Hub model repository, its model card and license, gated repos that need an access request and a token, and hf download pinned to a revision"
  - "File formats: safetensors holds tensors only and is safe to load; older pickle-based checkpoints can run code when loaded; GGUF is llama.cpp's single file carrying weights, tokenizer and chat template together"
  - "Quantization: storing each weight in fewer bits. 8-bit, 4-bit, GGUF k-quants such as Q4_K_M, and the calibrated GPU-side methods AWQ and GPTQ, plus FP8 on newer cards"
  - "What quantization costs in quality is uneven: small models, arithmetic, code, long context and tool-call formatting break first, and perplexity can barely move while your task pass rate drops. Your M12 set is the verdict; KL divergence against the reference file is a cheap second signal"
  - "The memory bill predicted before measured: parameters times bytes per parameter, plus the KV cache (2 x layers x KV heads x head dimension x bytes per element, per token, per sequence), plus runtime overhead"
  - "The weights are a fixed cost; the KV cache scales with context length times concurrency, and it is what runs a GPU out of memory in production"
  - "Decode is memory-bandwidth bound: every generated token reads every active weight once, so tokens per second is roughly memory bandwidth divided by model size. A prediction you can check"
  - "Mixture-of-experts models: memory is set by total parameters, speed by active parameters"
  - "Local runtimes: llama.cpp, Ollama, LM Studio, and MLX on Apple silicon, each exposing an OpenAI-compatible endpoint so the M12 runner points at it unchanged. Each has a default (context length, GPU layers, memory fitting) that silently decides what you measure unless you pin it"
  - "Serving at scale with vLLM or SGLang: continuous batching, paged attention, prefix caching, and the throughput-versus-latency curve you sweep to choose an operating point"
  - "Renting a GPU by the hour: billing starts at boot, the model download is billed time, idle hours cost the same as busy ones, and an unauthenticated public endpoint is a free service for strangers"
  - "A model file is untrusted input: prefer safetensors and GGUF, read remote code before enabling trust_remote_code. M21's trust boundary on the download path"
  - "Licenses: Apache 2.0 and MIT versus custom community licenses with user-count thresholds, attribution clauses and regional exclusions. Open weights is not open source"
  - "When local beats an API (privacy and residency, offline, high steady volume, controlled latency) and when it does not (frontier capability, spiky or low traffic, and the operations work you now own). Decided by cost per successful request at your real utilization"
---
Everything you have shipped so far calls a model someone else runs. This module downloads one and runs
it yourself: first on the machine in front of you, then on a GPU you rent by the hour and put under load.
It pays off M34's landscape reading (the open-weights side of the map becomes something you have
operated, not something you read about), M20's unit economics (you finally have a second price to
compare against, and it is priced per hour rather than per token), and M25's Python (the serving stack
is Python end to end). It assumes the M12 harness exists and still runs, because the only honest answer
to "is the small local model good enough?" is your own eval set, not a leaderboard.

**Core concepts:** **Where open weights live** — the Hugging Face Hub: a model repository, its model
card, its license, gated repos that need an access request and a token, and \`hf download\`. **File
formats** — safetensors (tensors only, safe to load) versus older pickle-based checkpoints (loading one
can run code), and **GGUF** (llama.cpp's single-file format carrying weights, tokenizer and chat template
together). **Quantization** — storing each weight in fewer bits: 8-bit, 4-bit, GGUF **k-quants** (block-wise
mixes such as Q4_K_M, where the letter after K says how much of the model gets the larger type), and the
[[GPU-side calibrated methods|calibrated-quant]] **AWQ** and **GPTQ**, plus FP8 on newer cards. **The memory bill, predicted
before measured**: parameters × bytes per parameter, plus the **KV cache** (the stored keys and values
of every token in context, M6's mechanism), plus runtime overhead. **[[Decode is memory-bandwidth bound|bandwidth-bound]]**:
each generated token reads every active weight once, so tokens per second is roughly bandwidth divided
by model size — a prediction you can check. **Mixture-of-experts** models: memory is set by total
parameters, speed by active ones. **Local runtimes** — llama.cpp, Ollama, LM Studio, MLX on Apple
silicon — and the OpenAI-compatible endpoint they all expose. **Serving at scale** — vLLM or SGLang:
**continuous batching** (new requests join the running batch between decode steps instead of waiting for
it to finish), **paged attention** (the KV cache allocated in fixed blocks like virtual memory, so
fragmentation stops wasting it), prefix caching, and the **[[throughput-versus-latency curve|operating-curve]]**. **Renting a
GPU by the hour.** **Licenses** — Apache 2.0 and MIT versus custom community licenses with user-count
thresholds, attribution clauses and regional exclusions. **When local beats an API, and when it does not.**

> **A common belief that is wrong: "4-bit is basically lossless."** It is lossless on the benchmark in
> the blog post. Quantization damage is uneven: smaller models lose more than larger ones at the same bit
> width; arithmetic, code, long-context retrieval and tool-call formatting break before casual chat does;
> and **perplexity** (how surprised the model is by a reference text, the number llama.cpp's own tooling
> reports) can move by a hair while your task's pass rate drops. That is why this module runs your M12 set
> at each level instead of trusting a table. Use llama.cpp's [[KL-divergence mode|kl-divergence]] as a cheap second signal
> against the highest-precision file, not as the verdict.

> **Three ways the memory you measure is not the memory you predicted, all silent.** vLLM claims a fixed
> fraction of GPU memory at startup and fills it with KV cache, so \`nvidia-smi\` reads nearly full whatever
> the model weighs; read its startup log instead, which prints the KV cache size in tokens and the maximum
> concurrency it implies. llama.cpp now adjusts unset arguments to fit the device, which can quietly
> shrink your context or move layers to the CPU; pin \`-c\` and \`-ngl\` when you measure. Ollama picks a
> default context length that depends on available memory and truncates prompts longer than it without
> returning an error; \`ollama ps\` shows the context and the CPU/GPU split it actually chose. **State the context
> length next to every memory number, or the number means nothing.**

> **A model file is untrusted input.** Pickle-format checkpoints execute code when loaded, and
> \`trust_remote_code\` runs Python from the repository on your machine — M21's trust boundary, now on the
> download path. Prefer safetensors and GGUF, pin the repository revision you downloaded, and read what
> remote code you are about to run. The other half: llama-server, Ollama and vLLM all serve an
> unauthenticated endpoint by default. On a rented GPU with a public port, that is a free inference
> service for whoever scans it first. Set an API key and [[bind to localhost behind a tunnel|localhost-tunnel]].

> **Currency: model names, file formats and runtime defaults move monthly.** Which open families lead
> (Appendix D holds a dated snapshot; M34 taught you to read the landscape), which quantization formats
> each runtime supports, vLLM and llama.cpp flags and their defaults, Ollama's default context rule, GPU
> hourly prices and license terms all change on a timescale shorter than this program. Look each one up
> the week you build and write the check date beside it in your \`DELTA.md\`.

**Checkpoints** ① one open model pulled from the Hub with its license read and recorded, answering locally
through an OpenAI-compatible endpoint · ② memory predicted on paper for three quantization levels at a
stated context length, then measured, prediction and measurement side by side · ③ the M12 eval set run at
all three levels through the unchanged runner, paired deltas with bootstrap intervals · ④ the same model
served by vLLM on a rented GPU, swept at four concurrency levels with throughput and p95 latency recorded
· ⑤ cost per 1,000 requests at two utilization levels against the M34 API model, with the break-even rate
· ⑥ the written recommendation, including the conditions that would reverse it.

**Artifact** \`EVIDENCE\` — a \`local-weights\` repo with four parts. **First, the quantization ladder on your
own machine:** one open model small enough to fit (on a laptop, a model in the single-digit billions of
parameters is realistic; pick the family from your M34 notes), run at three levels — the highest precision
that fits as the reference, one 4-bit level, and one below 4 bits to find where it breaks. For each level,
a memory prediction written before loading and the measurement after, at the same pinned context length.
Then **the M12 eval set run against all three** through the same runner that scores your API model,
pointed at the local endpoint rather than rewritten for it, reported as paired deltas against the
reference with bootstrap intervals, plus tokens per second compared against your bandwidth prediction.
**Second, serving under load:** the same model family on a rented GPU under vLLM (or SGLang), loaded from
safetensors or an official FP8 or AWQ checkpoint, driven by \`vllm bench serve\` at four concurrency levels
with prompt and response lengths taken from your M20 logs rather than the tool's defaults; record output
tokens per second, requests per second, p50 and p95 time-to-first-token and [[inter-token latency|inter-token]], and the
request count behind each (M20's rule: no p99 you cannot support). Run the M12 smoke tier once against
the vLLM endpoint too, because **the file you evaluated on the laptop is not the file you served**.
**Third, the money:** cost per 1,000 requests for the rented GPU at saturated throughput and at the
utilization your real flagship traffic implies, against the M34 API model priced from your median token
counts, both divided by the eval pass rate to give cost per 1,000 *successful* requests (M20's cost per
completed task). **Fourth, a one-page recommendation** for your flagship: local, rented, API, or a split,
with the numbers behind it and what would change the answer.

**The memory arithmetic, worked once.** The numbers here are illustrative — read yours from the model's
\`config.json\` and the file sizes on disk. Take an 8B-parameter model with 32 layers, 8 key-value heads
(grouped-query attention, where several query heads share one key-value head) and a head dimension of
128. Weights at 16-bit: 8 × 10⁹ × 2 bytes = 16 GB. At Q8_0, about 8.5 bits per weight once [[block scales|block-scales]] are
counted: about 8.5 GB. At Q4_K_M, a mix averaging somewhat under 5 bits: about 5 GB — and the GGUF file
size is the exact figure, so use it. KV cache per token = 2 (keys and values) × layers × KV heads × head
dimension × bytes per element = 2 × 32 × 8 × 128 × 2 = 131,072 bytes, 128 KiB. At an 8,192-token context
that is 1 GiB per sequence, and a server holding sixteen such sequences at once needs 16 GiB of KV cache
on top of the weights. **The weights are a fixed cost; the KV cache scales with context times concurrency,
and it is what runs a GPU out of memory in production.** Add runtime overhead (compute buffers, the
CUDA or Metal context), and remember that Apple silicon lets the GPU use only part of [[unified memory|unified-memory]] by
default — look up the limit for your machine.

**The break-even, worked once.** Also illustrative, not a quote. A GPU rented at $2.00 an hour that
sustains 5 requests a second within your p95 target serves 18,000 requests an hour: about $0.11 per 1,000
at full load. If your flagship's real traffic is 600 requests an hour, the GPU is busy 3% of the time and
the same hour costs $3.33 per 1,000. An API model at $0.002 a request costs $2.00 per 1,000 whatever the
traffic. Break-even is the hourly price divided by the API cost per request — here 1,000 requests an hour,
sustained, every hour you pay for. **Local wins on privacy and data residency, offline operation, very
high steady volume, and latency you control; it loses on capability at the frontier, on spiky or low
traffic where you pay for idle hours, and on the operations work (M23) you now own — patching, restarts,
autoscaling, the on-call page.**

::: context calibrated-quant Rounding with a sample of real data
Plain quantization rounds every weight to the nearest value in the smaller format. Calibrated methods first run a small sample of text through the model to see which weights matter most for its actual outputs. GPTQ uses that to adjust the not-yet-rounded weights as it goes, compensating for the error; AWQ protects the weights tied to the largest activations by scaling them before rounding.

Both usually lose less quality than plain rounding at 4 bits, and GPU servers such as vLLM can run them. FP8 is a different route: an 8-bit floating-point format that recent data-center GPUs compute with directly.
:::

::: context bandwidth-bound Why speed is set by memory, not math
Generation has two phases. **Prefill** reads your whole prompt at once and keeps the GPU's arithmetic busy. **Decode** produces one token at a time, and for each token the chip must stream every active weight from memory to its compute units. For a single user, that reading, not the math, is the bottleneck.

So a rough ceiling is bandwidth divided by model size: a 5 GB file on a machine with 100 GB/s of memory bandwidth tops out near 20 tokens per second. Batching helps because one read of the weights serves every sequence in the batch.
:::

::: context operating-curve Choosing where on the curve to run
Serve more requests at once and the GPU produces more tokens per second in total, because each read of the weights serves more sequences. But each user waits longer. Plot throughput against p95 latency as concurrency rises and the curve climbs steeply, then flattens while latency keeps growing.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 170" font-family="Inter, Arial, sans-serif">
  <line x1="50" y1="140" x2="340" y2="140" stroke="#1f2a44" stroke-width="1.5"/>
  <line x1="50" y1="20" x2="50" y2="140" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="54" y="16" font-size="11" fill="#1f2a44">throughput</text>
  <text x="340" y="158" font-size="11" text-anchor="end" fill="#1f2a44">p95 latency</text>
  <line x1="220" y1="25" x2="220" y2="140" stroke="#b4232c" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="224" y="132" font-size="11" fill="#b4232c">latency target</text>
  <polyline points="70,120 110,72 170,48 300,38" fill="none" stroke="#1d6fd1" stroke-width="2"/>
  <circle cx="70" cy="120" r="4" fill="#8fb8f0" stroke="#1d6fd1"/>
  <circle cx="110" cy="72" r="4" fill="#8fb8f0" stroke="#1d6fd1"/>
  <circle cx="170" cy="48" r="7" fill="#1d6fd1"/>
  <circle cx="300" cy="38" r="4" fill="#8fb8f0" stroke="#1d6fd1"/>
  <text x="78" y="124" font-size="11" fill="#1f2a44">1</text>
  <text x="116" y="88" font-size="11" fill="#1f2a44">4</text>
  <text x="160" y="72" font-size="11" fill="#1f2a44">16</text>
  <text x="292" y="58" font-size="11" fill="#1f2a44">64</text>
  <text x="120" y="36" font-size="11" fill="#1d6fd1">operating point</text>
</svg>
\`\`\`

The numbers are concurrency levels. The operating point is the one you choose: usually the highest throughput whose p95 still meets your latency target.
:::

::: context kl-divergence How far the quantized model's guesses moved
KL divergence measures how different two probability distributions are; zero means identical. llama.cpp's perplexity tool can save the full next-token probabilities of your highest-precision file over a text, then compare a quantized file against them, position by position.

Perplexity only asks how well each file predicted the text. KL divergence asks how far the quantized model's whole distribution drifted from the reference, which catches damage an average can hide. It is still a statistic about text, not your task, so your eval set decides.
:::

::: context localhost-tunnel Reachable by you, invisible to scanners
A server bound to \`0.0.0.0\` listens on every network interface, the public one included, so anyone on the internet who finds the port can use it. Bound to localhost (\`127.0.0.1\`), only programs on the same machine can connect.

You then reach it through a tunnel, such as SSH port forwarding, which carries your traffic over an encrypted, authenticated connection and makes the remote port appear on your laptop. Automated scanners sweep the internet for open ports around the clock, so an exposed model server is found fast.
:::

::: context inter-token The gap between words
Inter-token latency is the time between one streamed token and the next, after the first has arrived. Time to first token decides how long a user stares at nothing; inter-token latency decides how fast the answer then flows. One second divided by it gives roughly the tokens per second each user sees.

Under load both get worse, for different reasons: queued requests push time to first token up, while bigger batches slow every decode step for everyone. Record percentiles of both.
:::

::: context block-scales Where the extra half bit comes from
GGUF quantizations store weights in small blocks. In Q8_0 each block holds 32 weights as 8-bit integers plus one 16-bit scale that says what those integers are multiplied by. That is 32 × 8 + 16 = 272 bits for 32 weights, or 8.5 bits each.

Per-block scales let each small group use its own range, which keeps rounding error low, and they are why a file is always a little larger than parameters × the nominal bit count. K-quants go further, with scales of their own grouped inside larger blocks.
:::

::: context unified-memory One pool for CPU and GPU
On Apple silicon the CPU and GPU share the same physical memory, instead of the GPU having its own. That is why a laptop with plenty of memory can load models that would need an expensive graphics card elsewhere.

The catch is that the system keeps a share for itself and, by default, lets the GPU use only part of the total. A model that needs "32 GB" on paper will not fit on a 32 GB Mac, so look up the actual limit for your machine before you predict.
:::
`;export{e as default};