var e=`---
id: m11-the-gate
title: "Ingestion: Real Documents Into a Corpus — the gate, and what most people miss"
minutes: 1
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
**GATE** — **REFEREE:** your reviewer, scoring against your twenty hand-labeled documents — a number you
cannot fudge. **PASS:** state what percentage of tables your parser destroys, with evidence; show a
citation that **highlights the exact span** in the correct page of the correct source; and say which
extraction path each document type goes through, with **the vision arm's table score and its provenance
result on the record — kept or cut, and why.** **ON FAIL:**
provenance is page-level — rebuild to offsets before M18.

**Most-missed:** Storing page-level provenance, then discovering in M18 that span citations are
unverifiable and offsets are unrecoverable after the fact. · Making the bucket public under time
pressure. A misconfigured bucket is none of injection, XSS, CSRF or SSRF, so the standard exploit set will
not catch it. · Picking a 3,072-dimension embedding model without checking the pgvector index ceiling. ·
Running the vision arm, finding it wins on tables, and adopting it without checking whether it can still
produce the character offsets M18's span citations are built on.
`;export{e as default};