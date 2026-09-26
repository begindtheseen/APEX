<!-- Context notes for M18/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[held-out test set|held-out]] 1
[[whether the interval crosses zero|crosses-zero]] 1
[[RAG|rag]] 1
[[a judge scoring answer quality|llm-judge]] 1
[[lexical search|lexical-search]] 1

::: context held-out Questions you never practised on
A held-out test set is a slice of your data that you set aside at the start and do not look at while building or tuning. You only score on it at the end.

It is like a teacher keeping the real exam questions secret: if you tune on the questions you report, you are memorising the exam, and your number will look better than the system really is.
:::

::: context crosses-zero When a difference might be nothing
Your "delta" is new score minus old score. If its interval runs from, say, $-0.1$ to $+0.3$, it includes zero, which means "no difference at all" is still a reasonable reading of your data. You cannot claim the change helped.

Saying so plainly is a strength in a real job. Teams make costly decisions on numbers like these, and an engineer who flags "we cannot tell yet" saves them from shipping noise.
:::

::: context rag Retrieval-augmented generation
RAG stands for **retrieval-augmented generation**: before the model answers, the system searches your documents, pastes the most relevant passages into the prompt, and asks the model to answer from them.

The alternative is **long context**: modern models can read hundreds of thousands of tokens at once, so for a small enough collection you can paste in everything. That is simpler, but costs more per question and can get slower, which is why the choice is worth measuring.
:::

::: context llm-judge Using a model to grade a model
An "LLM judge" is a language model prompted to grade another model's answer, for example "score this answer 1–5 for correctness". It is cheap and scales to thousands of answers.

The catch here: a strong model often knows the answer already from its training, so the final answer can look right even when the search step found nothing useful. Grading only the answer hides a broken retriever. Measure retrieval directly.
:::

::: context lexical-search Matching the actual words
Lexical search matches the words themselves, the way a search box does: documents containing "ERR_4012" rank high for the query "ERR_4012". The classic scoring method is BM25; in Postgres it is full-text search.

Vector search matches meaning instead, which is great for paraphrases but weak on exact strings like error codes, product numbers or names, which carry little "meaning" for an embedding. Hybrid search runs both and merges the lists.
:::
