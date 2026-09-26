<!-- Context notes for M6/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[["confidence score"|confidence-score]] 1
[[caching TTLs|ttl]] 1
[[tokenizer|tokenizer]] 1

::: context confidence-score Why a model's confidence number is not a probability
If you ask a model to add "confidence: 0.92" to its answer, it writes those characters the same way it writes every other word: as the text that seems most fitting. Nothing in it measures how often answers like this turn out correct, and research has repeatedly found such self-reported scores poorly calibrated. Sending "low-confidence" answers to a human reviewer sounds sensible, but the switch is driven by a number that was never measured.
:::

::: context ttl What a TTL is
**TTL** means time to live: how long a stored copy is kept before it expires. For prompt caches it is typically minutes, not days, so a cached prefix nobody reuses soon is thrown away and the next request pays full price. Like the rest of this module, the exact numbers are set by each provider and change, which is why the gate asks when you last checked them.
:::

::: context tokenizer What a tokenizer is
A **tokenizer** is the part of a model that chops text into the tokens it reads and bills. Each model family has its own vocabulary of pieces, so the same sentence can be a different number of tokens for different providers. "About four characters per token" is a rough average for English prose; code, numbers and many other languages often use more tokens, so count with the provider's own tool.
:::
