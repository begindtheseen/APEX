var e=`---
id: m18-the-gate
title: "Retrieval You Actually Measured — the gate, and what most people miss"
minutes: 2
covers:
  - "pgvector HNSW parameters, the dimension ceiling, the recall/latency curve"
  - "Chunking: why fixed-size is the right baseline; what contextual retrieval fixes"
  - "Two-stage retrieval: hybrid lexical+semantic fused with RRF, then a cross-encoder"
  - "Agentic and iterative retrieval"
  - "Grounding and span-level citation verification"
  - "The long-context baseline, and when to skip retrieval entirely"
  - "The embedding lifecycle: batched generation, cost per 1,000 chunks, re-embedding"
---
**GATE** — **REFEREE:** your reviewer, scoring against your [[held-out test set|held-out]], half of it hand-written.
**PASS:** state your delta **together with its bootstrap interval and the number of queries behind
it**, and say out loud **[[whether the interval crosses zero|crosses-zero]].** With a set this small it very probably
does, and then the finding is *"I cannot distinguish these two with the data I have"* — **saying that
plainly is the pass condition, not a failure of the module.** Then state recall@10 before and after
**with the \`hnsw.iterative_scan\` setting named and the dev–test gap stated**; **name the arm you cut and
the size of corpus that would have justified running it**; and **defend your routing rule between
retrieval and long context using your own numbers.** **ON FAIL:** the golden set is LLM-generated, or you
tuned on the set you reported, **or you reported a winner with no interval** — hand-write 25, re-split,
re-run.

> "Should this be [[RAG|rag]] or just long context?" is the live architectural question in 2026 and the
> instrument to answer it already exists once you have a golden set. One priced anecdote, labeled as
> one — not a row in a ranked table you do not have the queries to support.

**Most-missed:** Evaluating end-to-end with [[a judge scoring answer quality|llm-judge]]. **Answer quality hides
retrieval failure** — a strong model answers correctly from pretraining even when retrieval returned
garbage. · Generating the golden set entirely with an LLM: synthetic queries are written *from* the
chunk, leak its vocabulary, and every retriever scores artificially high. · Treating HNSW as exact search,
and never measuring recall at all. · Reranking too few candidates — if the right chunk is at rank 73 and
you rerank the top 10, the reranker is pure added latency. · Skipping [[lexical search|lexical-search]], which is why queries
with an error code or a person’s name fail on pure vector. · Asking for "citations like [1]" and trusting
them. Free-text markers are generated text; if citations are not machine-checkable against offsets, you
have the appearance of grounding.

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
`;export{e as default};