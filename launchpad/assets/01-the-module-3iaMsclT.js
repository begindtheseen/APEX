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
The first mile of most real AI products, and a seam that is easy to leave to nobody — most [[retrieval|rag]]
material opens at the embedding step, assuming a corpus that already exists as text. **Extraction
quality dominates retrieval quality by a wide margin.** No amount of [[hybrid search and reranking|hybrid-rerank]]
recovers a table flattened into word soup at ingestion.

**Core concepts:** What an embedding is — a fixed-length vector a model emits for a text, near for near
meaning — and what it structurally cannot do. [[Object storage|object-storage]], [[signed upload URLs|signed-urls]], scoped paths and short
expiry. **Private buckets, deny-by-default, server-side content-type and size validation.** Text-layer
extraction vs [[OCR|ocr]] **vs the page image through a vision model**, and what each one costs you in
provenance. Tables and multi-column layout. **[[Character-offset provenance|provenance]]** — page-level cannot
verify a span. Ingestion as a resumable job on M8’s queue, with per-file failure. Re-ingestion when the
parser improves. The [[embedding dimensionality decision|dimensionality]].

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

::: context rag Retrieval, and what RAG means
Most AI products that answer questions about *your* documents work the same way, called **RAG** (retrieval-augmented generation, a name from a 2020 research paper). First, search the documents for the passages most related to the question. Then put those passages into the prompt and ask the model to answer from them, citing where each claim came from. The answer can only be as good as the passages found — and those can only be as good as the text extracted from the files.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 110" font-family="Inter, Arial, sans-serif">
  <rect x="6" y="36" width="72" height="36" rx="8" fill="#ffffff" stroke="#1f2a44" stroke-width="2"/>
  <text x="42" y="58" font-size="12" text-anchor="middle" fill="#1f2a44">question</text>
  <rect x="100" y="36" width="72" height="36" rx="8" fill="#f2b880" stroke="#1f2a44" stroke-width="2"/>
  <text x="136" y="58" font-size="12" text-anchor="middle" fill="#1f2a44">search</text>
  <rect x="194" y="36" width="72" height="36" rx="8" fill="#8fb8f0" stroke="#1d6fd1" stroke-width="2"/>
  <text x="230" y="58" font-size="12" text-anchor="middle" fill="#1f2a44">model</text>
  <rect x="288" y="36" width="66" height="36" rx="8" fill="#ffffff" stroke="#1d6fd1" stroke-width="2"/>
  <text x="321" y="58" font-size="12" text-anchor="middle" fill="#1f2a44">answer</text>
  <g stroke="#1f2a44" stroke-width="2"><line x1="78" y1="54" x2="94" y2="54"/><line x1="172" y1="54" x2="188" y2="54"/><line x1="266" y1="54" x2="282" y2="54"/></g>
  <g fill="#1f2a44"><polygon points="99,54 91,50 91,58"/><polygon points="193,54 185,50 185,58"/><polygon points="287,54 279,50 279,58"/></g>
  <text x="183" y="92" font-size="11" text-anchor="middle" fill="#6c7a93">top passages + question</text>
  <text x="136" y="24" font-size="11" text-anchor="middle" fill="#6c7a93">your documents</text>
</svg>
\`\`\`
:::

::: context hybrid-rerank Hybrid search and reranking
**Keyword search** finds passages containing the exact words; **embedding search** finds passages with similar meaning. **Hybrid search** runs both and merges the results, because each catches what the other misses — product codes and names for one, paraphrases for the other. **Reranking** then passes the top few dozen candidates through a second, slower model that reorders them by how well each actually answers the question.
:::

::: context object-storage What object storage is
Databases are for rows; files such as PDFs and images go into **object storage** — Amazon S3 is the best-known, and Supabase Storage works the same way. Files live in named containers called **buckets**, each file under a path like \`user-42/report.pdf\`. A bucket can be public, readable by anyone with the address, or private, which is where user uploads belong.
:::

::: context signed-urls What a signed URL is
A **signed URL** is a temporary web address that allows one specific action — "upload one file to exactly this path" — and stops working after a short time. Your server creates it using its secret key, and the user's browser sends the file straight to storage. The user never sees your key, and the link cannot be reused to upload somewhere else or read someone else's files.
:::

::: context ocr What OCR is
A scanned PDF is really a set of photographs of pages: there is no text in it, only pixels. **OCR** (optical character recognition) is software that looks at those pixels and guesses the letters. It makes characteristic mistakes — "rn" read as "m", "0" as "O" — and it loses the layout of tables and columns easily, which is why its output needs checking.
:::

::: context provenance What provenance means here
**Provenance** is a record of where something came from. For a citation, it means knowing not just which document and page a passage came from, but its exact position — say, characters 10,412 to 10,530 of the extracted text. With that, the app can highlight the exact sentence behind a claim so a reader can check it in seconds.
:::

::: context dimensionality What embedding dimensionality means
An embedding is a list of numbers, and its **dimensionality** is how long that list is — common models produce 768, 1,536 or 3,072 numbers per piece of text. Longer lists take more storage and can hit index size limits in the database. Every vector in a column must be the same length, so switching models later means re-embedding every document you have.
:::
`;export{e as default};