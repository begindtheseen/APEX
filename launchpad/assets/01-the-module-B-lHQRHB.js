var e=`---
id: m11-the-module
title: "Ingestion: Real Documents Into a Corpus — what to understand and what to build"
minutes: 3
covers:
  - "What an embedding is — a fixed-length vector a model emits for a text, near for near meaning — and what it structurally cannot do"
  - "Object storage, signed upload URLs, scoped paths and short expiry"
  - "Private buckets, deny-by-default, server-side content-type and size validation"
  - "Text-layer extraction vs OCR"
  - "Tables and multi-column layout"
  - "Character-offset provenance — page-level cannot verify a span"
  - "Ingestion as a resumable job with per-file failure"
  - "Re-ingestion when the parser improves"
  - "The embedding dimensionality decision: pgvector indexes the vector type to 2,000 dimensions and halfvec to 4,000; several common models emit 3,072; and you choose the model in this module but hit the ceiling in M18 — so record it in the decision log before you embed anything"
---
The first mile of most real AI products, and a seam that is easy to leave to nobody — most retrieval
material opens at the embedding step, assuming a corpus that already exists as text. **Extraction
quality dominates retrieval quality by a wide margin.** No amount of hybrid search and reranking
recovers a table flattened into word soup at ingestion.

**Core concepts:** What an embedding is — a fixed-length vector a model emits for a text, near for near
meaning — and what it structurally cannot do. Object storage, signed upload URLs, scoped paths and short
expiry. **Private buckets, deny-by-default, server-side content-type and size validation.** Text-layer
extraction vs OCR **vs the page image through a vision model**, and what each one costs you in
provenance. Tables and multi-column layout. **Character-offset provenance** — page-level cannot
verify a span. Ingestion as a resumable job on M8’s queue, with per-file failure. Re-ingestion when the
parser improves. The embedding dimensionality decision.

> **Page-level provenance cannot verify a span.** A citation has to highlight the exact sentence that
> supports a claim, and character offsets into extracted text are unrecoverable after the fact,
> especially through OCR. M18 needs span-level citations, so page-level provenance here is incompatible
> with it. Store **character offsets into the stored extracted text**, with page and section carried
> alongside.

> **Record the embedding model’s output dimensionality in the decision log before you embed anything.**
> It is an M11 decision with an M18 consequence: pgvector indexes \`vector\` to 2,000 dimensions and
> \`halfvec\` to 4,000, and several widely-used embedding models emit 3,072. You choose the model here
> but hit the ceiling in M18. Get this wrong and you hit a flat error there and diagnose it as having
> written the index wrong.

> **The third extraction path, and the arm this module makes you measure.** Text-layer extraction and
> OCR are not the only options. Handing the page image to a vision model is what a working team reaches
> for first on a scanned or multi-column document, and it frequently beats OCR on exactly the thing this
> module scores: tables. So run it as a real arm — the **same twenty documents**, the same metric, priced
> in latency and dollars per document. Then try to carry character offsets through it and report what
> happens honestly. A vision model returns text it read off an image, and on a scanned page there is no
> text layer to map those characters back into, so **span-level provenance is the thing this arm is worst
> at.** That is the finding, not a failure of the exercise. M18 needs span citations, so an arm that wins
> on tables and cannot produce offsets is an arm you **name and cut** — the same move M18 makes with
> contextual retrieval. Write down which path each document type goes through, and why.

**Checkpoints** ① twenty documents hand-labeled and split into dev and test before any pipeline code is
written · ② one document uploaded through a signed URL and stored in a private bucket · ③ text extracted
from a digital PDF, a scanned one and a \`.docx\`, with character offsets kept · ④ the pipeline resumable on
the M8 queue, with the orphan-cleanup job and the retention rule written down · ⑤ the same twenty
documents through a vision model as a second extraction arm, scored on the same table metric and priced
per document, with what happened to character offsets written down.

**Artifact** \`EVIDENCE\` — a pipeline accepting a real signed-URL upload, handling a digital PDF, a
scanned PDF, and a \`.docx\`; character-offset provenance on every chunk. **A private bucket with
deny-by-default, scoped short-expiry signed URLs, server-side content-type and size validation, an
orphan-cleanup job, and a stated retention policy.** Resumable on M8’s queue. Scored against **twenty
hand-labeled documents, split dev/test at creation** — and the **vision-model arm measured against the
same twenty**, named as kept or cut, with its provenance result stated either way.

> **Exported:** the corpus and its offsets → M18. The embedding dimensionality decision → M18
> (the **column** holds thousands more than the **index** will take: an HNSW index caps at 2,000
> dimensions for \`vector\` and 4,000 for \`halfvec\`).
`;export{e as default};