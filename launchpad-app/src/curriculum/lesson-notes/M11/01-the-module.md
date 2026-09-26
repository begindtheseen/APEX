<!-- Context notes for M11/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[retrieval|rag]] 1
[[hybrid search and reranking|hybrid-rerank]] 1
[[Object storage|object-storage]] 2
[[signed upload URLs|signed-urls]] 2
[[OCR|ocr]] 2
[[Character-offset provenance|provenance]] 2
[[embedding dimensionality decision|dimensionality]] 2

::: context rag Retrieval, and what RAG means
Most AI products that answer questions about *your* documents work the same way, called **RAG** (retrieval-augmented generation, a name from a 2020 research paper). First, search the documents for the passages most related to the question. Then put those passages into the prompt and ask the model to answer from them, citing where each claim came from. The answer can only be as good as the passages found — and those can only be as good as the text extracted from the files.

```svg
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
```
:::

::: context hybrid-rerank Hybrid search and reranking
**Keyword search** finds passages containing the exact words; **embedding search** finds passages with similar meaning. **Hybrid search** runs both and merges the results, because each catches what the other misses — product codes and names for one, paraphrases for the other. **Reranking** then passes the top few dozen candidates through a second, slower model that reorders them by how well each actually answers the question.
:::

::: context object-storage What object storage is
Databases are for rows; files such as PDFs and images go into **object storage** — Amazon S3 is the best-known, and Supabase Storage works the same way. Files live in named containers called **buckets**, each file under a path like `user-42/report.pdf`. A bucket can be public, readable by anyone with the address, or private, which is where user uploads belong.
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
