<!-- Context notes for M36/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[GPU-side calibrated methods|calibrated-quant]] 1
[[Decode is memory-bandwidth bound|bandwidth-bound]] 2
[[throughput-versus-latency curve|operating-curve]] 2
[[KL-divergence mode|kl-divergence]] 1
[[bind to localhost behind a tunnel|localhost-tunnel]] 1
[[inter-token latency|inter-token]] 1
[[block scales|block-scales]] 1
[[unified memory|unified-memory]] 1

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

```svg
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
```

The numbers are concurrency levels. The operating point is the one you choose: usually the highest throughput whose p95 still meets your latency target.
:::

::: context kl-divergence How far the quantized model's guesses moved
KL divergence measures how different two probability distributions are; zero means identical. llama.cpp's perplexity tool can save the full next-token probabilities of your highest-precision file over a text, then compare a quantized file against them, position by position.

Perplexity only asks how well each file predicted the text. KL divergence asks how far the quantized model's whole distribution drifted from the reference, which catches damage an average can hide. It is still a statistic about text, not your task, so your eval set decides.
:::

::: context localhost-tunnel Reachable by you, invisible to scanners
A server bound to `0.0.0.0` listens on every network interface, the public one included, so anyone on the internet who finds the port can use it. Bound to localhost (`127.0.0.1`), only programs on the same machine can connect.

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
