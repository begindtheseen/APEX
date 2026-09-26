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

**Core concepts:** **[[pgvector|pgvector]]: [[HNSW parameters|hnsw]], the *index* dimension ceiling (2,000 for \`vector\`,
4,000 for \`halfvec\` — the column itself holds far more), and the recall/latency curve.** Chunking — why fixed-size is the right baseline and what contextual
retrieval actually fixes. Two-stage retrieval: hybrid lexical+semantic fused with [[RRF|rrf]], then a
[[cross-encoder reranker|cross-encoder]]. Agentic and iterative retrieval. **Grounding and span-level citation
verification** against M11’s character offsets. The long-context baseline, and when to skip retrieval
entirely. **The embedding lifecycle** — batched generation, cost per 1,000 chunks, re-embedding.

> **The filtered-search trap, with the correct mechanism.** A \`WHERE\` clause does not
> bypass the HNSW index; the filter is applied as the index returns candidates, so the symptom is
> **returning fewer rows than your LIMIT**, not slower queries. Since pgvector 0.8.0 the fix is
> \`hnsw.iterative_scan\`, **which ships off** — so your recall@10 gate number is measured under an unnamed
> [[GUC|guc]] that changes it. Name it. The Supabase-specific version: chaining \`.eq()\` after \`.rpc()\` applies the
> filter in PostgREST *after* the SQL function already ranked and limited, returning plausible rows that
> are the wrong ones.

**Checkpoints** ① the measuring instrument first: a [[golden set|golden-set]], split dev/test at creation, with the
number of test queries written down before anything is measured · ② a [[recall@k baseline|recall-at-k]] number, stated
with its [[bootstrap interval|bootstrap-interval]] · ③ hybrid + RRF measured against it, delta and interval reported together ·
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

::: context pgvector Vector search inside Postgres
pgvector is an extension for PostgreSQL, the popular open-source database. It adds a \`vector\` column type for storing embeddings (lists of numbers that capture what a piece of text means) and operators to find the rows whose vectors are closest to a query's.

The practical win: your documents, their metadata and their embeddings live in one database you already run, instead of in a separate specialised vector database. Supabase ships with it available.
:::

::: context hnsw A shortcut map for finding neighbours
HNSW stands for **Hierarchical Navigable Small World**. It is an index that links each vector to a few of its near neighbours, in layers: a sparse top layer for big jumps, denser layers below for fine steps. A search hops greedily toward the query instead of comparing against every row.

That makes it fast but **approximate**: it can miss a true nearest neighbour. Its settings trade speed for accuracy. In pgvector, \`m\` and \`ef_construction\` shape the graph when it is built, and \`hnsw.ef_search\` sets how many candidates a query looks at. More candidates means higher recall and slower queries: that is the recall/latency curve.
:::

::: context rrf Merging two ranked lists fairly
RRF, **Reciprocal Rank Fusion**, combines results from two searches (say keyword search and vector search) whose scores are not comparable. It ignores the scores and uses only positions: each document gets $1/(k + \\text{rank})$ from each list it appears in, and the sums are sorted. $k$ is usually $60$.

A document ranked 1st by one search and 5th by the other scores $1/61 + 1/65 \\approx 0.032$. It is simple, needs no tuning, and rewards documents both searches agree on.
:::

::: context cross-encoder A slower, sharper second look
An embedding model reads the query and each document **separately**, which is fast because document vectors can be computed ahead of time. A cross-encoder reads the query and one document **together** and outputs a single relevance score. Seeing both at once makes it much more accurate, but it has to run once per candidate at query time.

So it is used as a second stage: fast search picks, say, the top 50, and the reranker reorders just those.
:::

::: context guc A Postgres setting
GUC is PostgreSQL's name for a configuration setting (from "Grand Unified Configuration", the name of its settings system). You change one with a \`SET\` command, for a whole server or just your current session.

The trap the lesson points at: \`hnsw.iterative_scan\` is a GUC, it defaults to off, and flipping it changes what a filtered query returns. If your report does not say which value you ran with, someone else cannot reproduce your number.
:::

::: context golden-set The answer key
A golden set is a fixed collection of test questions, each paired with the answer a correct system should give. For retrieval, that means each query is labelled with which chunks actually contain the answer.

It works like an answer key for an exam: once you have it, any change to the system can be scored the same way, so "is this better?" becomes a number instead of a feeling. Building it by hand is slow, and that effort is why it is trusted.
:::

::: context recall-at-k Did the right chunk make the shortlist?
Recall@k asks: of all the chunks that truly answer this query, what fraction appear in the top $k$ results? Recall@10 of $0.67$ means two thirds of the right chunks were in the first ten.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120" font-family="Inter, Arial, sans-serif">
  <text x="12" y="20" font-size="12" fill="#1f2a44">top 10 results</text>
  <g stroke="#1f2a44" stroke-width="1.5">
    <rect x="12" y="30" width="28" height="28" fill="#fff"/><rect x="46" y="30" width="28" height="28" fill="#1d6fd1"/>
    <rect x="80" y="30" width="28" height="28" fill="#fff"/><rect x="114" y="30" width="28" height="28" fill="#fff"/>
    <rect x="148" y="30" width="28" height="28" fill="#fff"/><rect x="182" y="30" width="28" height="28" fill="#1d6fd1"/>
    <rect x="216" y="30" width="28" height="28" fill="#fff"/><rect x="250" y="30" width="28" height="28" fill="#fff"/>
    <rect x="284" y="30" width="28" height="28" fill="#fff"/><rect x="318" y="30" width="28" height="28" fill="#fff"/>
  </g>
  <rect x="12" y="76" width="16" height="16" fill="#1d6fd1" stroke="#1f2a44"/>
  <text x="34" y="89" font-size="12" fill="#1f2a44">right chunk found (2)</text>
  <rect x="180" y="76" width="16" height="16" fill="#fff" stroke="#b4232c" stroke-dasharray="3 2"/>
  <text x="202" y="89" font-size="12" fill="#b4232c">missed, rank 73 (1)</text>
  <text x="12" y="112" font-size="12" fill="#1f2a44">3 right chunks exist, 2 in the top 10: recall@10 = 2/3</text>
</svg>
\`\`\`

It measures the retriever alone, before any model writes an answer.
:::

::: context bootstrap-interval How much would the number wobble?
With only ten test queries, one lucky query moves your score a lot. The bootstrap estimates that wobble: draw ten queries at random **from your own ten**, with repeats allowed, and score that resampled set. Do this thousands of times. The middle 95% of those scores is the bootstrap interval.

If recall@10 is $0.6$ with an interval of roughly $0.3$ to $0.9$, the honest summary is "somewhere in there", and a rival scoring $0.7$ is not clearly better.
:::
`;export{e as default};