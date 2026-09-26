<!-- Context notes for M18/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[pgvector|pgvector]] 2
[[HNSW parameters|hnsw]] 2
[[RRF|rrf]] 2
[[cross-encoder reranker|cross-encoder]] 1
[[GUC|guc]] 1
[[golden set|golden-set]] 1
[[recall@k baseline|recall-at-k]] 1
[[bootstrap interval|bootstrap-interval]] 1

::: context pgvector Vector search inside Postgres
pgvector is an extension for PostgreSQL, the popular open-source database. It adds a `vector` column type for storing embeddings (lists of numbers that capture what a piece of text means) and operators to find the rows whose vectors are closest to a query's.

The practical win: your documents, their metadata and their embeddings live in one database you already run, instead of in a separate specialised vector database. Supabase ships with it available.
:::

::: context hnsw A shortcut map for finding neighbours
HNSW stands for **Hierarchical Navigable Small World**. It is an index that links each vector to a few of its near neighbours, in layers: a sparse top layer for big jumps, denser layers below for fine steps. A search hops greedily toward the query instead of comparing against every row.

That makes it fast but **approximate**: it can miss a true nearest neighbour. Its settings trade speed for accuracy. In pgvector, `m` and `ef_construction` shape the graph when it is built, and `hnsw.ef_search` sets how many candidates a query looks at. More candidates means higher recall and slower queries: that is the recall/latency curve.
:::

::: context rrf Merging two ranked lists fairly
RRF, **Reciprocal Rank Fusion**, combines results from two searches (say keyword search and vector search) whose scores are not comparable. It ignores the scores and uses only positions: each document gets $1/(k + \text{rank})$ from each list it appears in, and the sums are sorted. $k$ is usually $60$.

A document ranked 1st by one search and 5th by the other scores $1/61 + 1/65 \approx 0.032$. It is simple, needs no tuning, and rewards documents both searches agree on.
:::

::: context cross-encoder A slower, sharper second look
An embedding model reads the query and each document **separately**, which is fast because document vectors can be computed ahead of time. A cross-encoder reads the query and one document **together** and outputs a single relevance score. Seeing both at once makes it much more accurate, but it has to run once per candidate at query time.

So it is used as a second stage: fast search picks, say, the top 50, and the reranker reorders just those.
:::

::: context guc A Postgres setting
GUC is PostgreSQL's name for a configuration setting (from "Grand Unified Configuration", the name of its settings system). You change one with a `SET` command, for a whole server or just your current session.

The trap the lesson points at: `hnsw.iterative_scan` is a GUC, it defaults to off, and flipping it changes what a filtered query returns. If your report does not say which value you ran with, someone else cannot reproduce your number.
:::

::: context golden-set The answer key
A golden set is a fixed collection of test questions, each paired with the answer a correct system should give. For retrieval, that means each query is labelled with which chunks actually contain the answer.

It works like an answer key for an exam: once you have it, any change to the system can be scored the same way, so "is this better?" becomes a number instead of a feeling. Building it by hand is slow, and that effort is why it is trusted.
:::

::: context recall-at-k Did the right chunk make the shortlist?
Recall@k asks: of all the chunks that truly answer this query, what fraction appear in the top $k$ results? Recall@10 of $0.67$ means two thirds of the right chunks were in the first ten.

```svg
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
```

It measures the retriever alone, before any model writes an answer.
:::

::: context bootstrap-interval How much would the number wobble?
With only ten test queries, one lucky query moves your score a lot. The bootstrap estimates that wobble: draw ten queries at random **from your own ten**, with repeats allowed, and score that resampled set. Do this thousands of times. The middle 95% of those scores is the bootstrap interval.

If recall@10 is $0.6$ with an interval of roughly $0.3$ to $0.9$, the honest summary is "somewhere in there", and a rival scoring $0.7$ is not clearly better.
:::
