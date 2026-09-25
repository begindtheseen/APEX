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
**GATE** — **REFEREE:** your reviewer, scoring against your held-out test set, half of it hand-written.
**PASS:** state your delta **together with its bootstrap interval and the number of queries behind
it**, and say out loud **whether the interval crosses zero.** With a set this small it very probably
does, and then the finding is *"I cannot distinguish these two with the data I have"* — **saying that
plainly is the pass condition, not a failure of the module.** Then state recall@10 before and after
**with the \`hnsw.iterative_scan\` setting named and the dev–test gap stated**; **name the arm you cut and
the size of corpus that would have justified running it**; and **defend your routing rule between
retrieval and long context using your own numbers.** **ON FAIL:** the golden set is LLM-generated, or you
tuned on the set you reported, **or you reported a winner with no interval** — hand-write 25, re-split,
re-run.

> "Should this be RAG or just long context?" is the live architectural question in 2026 and the
> instrument to answer it already exists once you have a golden set. One priced anecdote, labeled as
> one — not a row in a ranked table you do not have the queries to support.

**Most-missed:** Evaluating end-to-end with a judge scoring answer quality. **Answer quality hides
retrieval failure** — a strong model answers correctly from pretraining even when retrieval returned
garbage. · Generating the golden set entirely with an LLM: synthetic queries are written *from* the
chunk, leak its vocabulary, and every retriever scores artificially high. · Treating HNSW as exact search,
and never measuring recall at all. · Reranking too few candidates — if the right chunk is at rank 73 and
you rerank the top 10, the reranker is pure added latency. · Skipping lexical search, which is why queries
with an error code or a person’s name fail on pure vector. · Asking for "citations like [1]" and trusting
them. Free-text markers are generated text; if citations are not machine-checkable against offsets, you
have the appearance of grounding.
`;export{e as default};