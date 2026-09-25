var e=`---
id: m18-the-module
title: "Retrieval You Actually Measured — what to understand and what to build"
minutes: 3
covers:
  - "pgvector HNSW parameters, the dimension ceiling, the recall/latency curve"
  - "Chunking: why fixed-size is the right baseline; what contextual retrieval fixes"
  - "Two-stage retrieval: hybrid lexical+semantic fused with RRF, then a cross-encoder"
  - "Agentic and iterative retrieval"
  - "Grounding and span-level citation verification"
  - "The long-context baseline, and when to skip retrieval entirely"
  - "The embedding lifecycle: batched generation, cost per 1,000 chunks, re-embedding"
---
**Build the measuring instrument before the retriever.** Imports M12’s dataset table and graders —
swapping in retrieval graders is hours, not a rebuild.

**Core concepts:** **pgvector: HNSW parameters, the *index* dimension ceiling (2,000 for \`vector\`,
4,000 for \`halfvec\` — the column itself holds far more), and the recall/latency curve.** Chunking — why fixed-size is the right baseline and what contextual
retrieval actually fixes. Two-stage retrieval: hybrid lexical+semantic fused with RRF, then a
cross-encoder reranker. Agentic and iterative retrieval. **Grounding and span-level citation
verification** against M11’s character offsets. The long-context baseline, and when to skip retrieval
entirely. **The embedding lifecycle** — batched generation, cost per 1,000 chunks, re-embedding.

> **The filtered-search trap, with the correct mechanism.** A \`WHERE\` clause does not
> bypass the HNSW index; the filter is applied as the index returns candidates, so the symptom is
> **returning fewer rows than your LIMIT**, not slower queries. Since pgvector 0.8.0 the fix is
> \`hnsw.iterative_scan\`, **which ships off** — so your recall@10 gate number is measured under an unnamed
> GUC that changes it. Name it. The Supabase-specific version: chaining \`.eq()\` after \`.rpc()\` applies the
> filter in PostgREST *after* the SQL function already ranked and limited, returning plausible rows that
> are the wrong ones.

**Checkpoints** ① the measuring instrument first: a golden set, split dev/test at creation, with the
number of test queries written down before anything is measured · ② a recall@k baseline number, stated
with its bootstrap interval · ③ hybrid + RRF measured against it, delta and interval reported together ·
④ reranker measured, with the candidate depth that actually matters, delta and interval together · ⑤ the
arms you did not run, named in writing, with the corpus size that would have justified running them ·
⑥ the long-context comparison run once on the same queries and priced — an anecdote, labeled as one, not
a ranked arm · ⑦ span-level citation verification against M11 offsets · ⑧ embedding lifecycle: batched,
priced per 1,000 chunks, re-embedded behind the read switch · ⑨ whether your delta’s interval crosses
zero, said out loud in the README, whichever way it came out.

**Artifact** \`EVIDENCE\` — retrieval over M11’s corpus, on M12’s runner and tables, with a measured
**recall@k baseline**, then **two** interventions measured independently: **hybrid+RRF and a reranker.**

**Two, not five, and the reason is the corpus.** M11 gives you twenty hand-labeled documents and about
twenty-five hand-written queries split dev/test, which leaves roughly **ten queries in the test half**.
Recall@10 over ten queries moves in steps of 0.1 and its bootstrap interval is about ±0.3. You cannot
rank five arms on that; **there is no third split left to re-measure a winner on**, and taking the
maximum of five would bias the margin upward in a way no re-measurement here can undo. So: two arms,
each reported with its interval, and **contextual retrieval named in writing as the arm you cut, and
why.** Run the long-context comparison (same queries, no retrieval) **once as a priced anecdote rather
than as a ranked arm**, and label it that way.

Then span-level citation verification against M11’s character offsets. **Embedding lifecycle:** batched
generation with rate-limit handling, measured cost per 1,000 chunks, a re-embed as a restartable backfill
behind a dual-index read switch (M14’s resumable pattern, if you have passed it). A written table of what
each arm bought, what it cost in latency and dollars, **and which ones did nothing.** Built with M12’s
split discipline — **the reported number is the test number.**
`;export{e as default};