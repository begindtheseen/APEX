var e=`---
id: m37-the-gate
title: "Beyond Text: Vision, Speech, Images and Embeddings — the gate, and what most people miss"
minutes: 1
covers:
  - "An image is tokens too: a vision model cuts the picture into patches, bills by pixel area up to a per-model cap, and silently downscales beyond it, so resolution is a cost and accuracy dial you set on purpose"
  - "Vision reading is generation, not OCR: it fails by confident, plausible substitution, with no per-character confidence to flag the error"
  - "When classic OCR still wins (positions you can highlight, identical reruns, per-word confidence, volume cost, offline) and the hybrid that hands the model both the OCR text and the image"
  - "The photograph is not the document: normalize orientation and crop in your own code, log the exact bytes sent, and evaluate on photographs taken the way users take them"
  - "Speech-to-text measured as word error rate on your own audio, with the normalization named, never a vendor benchmark"
  - "Text-to-speech and the real-time factor: speech must be made at least as fast as it is spoken, and audio is evaluated by round-tripping through speech-to-text plus human preference"
  - "Realtime voice as a latency budget: a chain of timed stages from the user falling silent to the first sound back, with endpointing usually the largest term, reported as percentiles from the raw per-turn array"
  - "Turn-taking and barge-in: an interruption stops playback, cancels generation upstream, and truncates the assistant turn to what was actually heard"
  - "Cascade versus speech-to-speech: seams you can measure and grade against latency and prosody you cannot otherwise get"
  - "Diffusion, intuitively: start from noise, remove it step by step conditioned on the prompt, steered by guidance; editing is the same process from a partially re-noised image under a mask"
  - "Image generation as a product surface: refusals as a branch, likeness and trademark blocks, output ownership and indemnity terms, and the unsettled copyright status of machine-generated work"
  - "Provenance: a C2PA manifest proves who signed, not what is true; stripping it is trivial, soft bindings survive some transformations, and no detector reliably says whether an image is AI-generated"
  - "Embeddings beyond retrieval: linear classifiers with measurable calibration, clustering that suggests but does not label, deduplication thresholds that belong to one model, and the modality gap in multimodal embeddings"
  - "Evaluating output that is not text: field-level exact match for extraction, WER for speech, assertable checklists plus a calibrated judge for images"
---
**GATE** — **REFEREE:** your reviewer, on a call, with ten documents of their own that your system has
never seen, photographed on their own phone, then five minutes of voice conversation in which they
interrupt the assistant at least three times, while your latency log and cost meter run. **PASS:**
field-level exact match on your held-out test set with its bootstrap CI, beside the classic OCR arm on the
same photographs, and the reviewer's ten scored separately and [[labeled as an anecdote|anecdote]]; voice p50 and p95
end to end over at least 50 turns, broken down by stage, with n stated; every interruption stops
playback, shows generation cancelled in the cost meter, and leaves the transcript holding only what was
heard; WER on recordings that include a second speaker, with your normalization named; the embeddings
job's precision and recall on test at a threshold fixed on dev; and a C2PA manifest verified, then shown
missing after a screenshot. **ON FAIL:** a number came from dev, from your own voice alone, or from an
average — re-split, re-record with a second speaker, and re-run from the raw distribution.

**Most-missed:** Evaluating extraction on clean scans and shipping to phone cameras. · Sending
full-resolution photographs "for accuracy" and paying for pixels the provider discards — or shrinking them
until the small print is gone; measure both ends. · Trusting a vision model's [[coordinates or counts|coordinates-counts]]; the
providers call them approximate. · Quoting a vendor's WER instead of measuring your own audio. ·
Measuring voice latency from "request sent" rather than from the moment the user stopped speaking, which
hides endpointing. · [[Waiting for the whole answer|sentence-streaming]] before starting TTS. · Reusing a similarity threshold across embedding models, or across image and text. · Letting
clustering name your failure categories. · Building on a video API as if it will exist next year.

::: context anecdote Why ten documents prove so little
Ten documents are too few to estimate accuracy. If the system reads 9 of the reviewer's 10 correctly, a 95% confidence interval for its true accuracy runs from roughly 55% to almost 100%, which says almost nothing.

The reviewer's ten still matter: they show your system works on documents you could not have chosen or tuned for. But the accuracy claim has to come from the held-out test set, and labeling the ten as an anecdote keeps anyone from quoting them as the number.
:::

::: context coordinates-counts Where vision models guess
Vision models are much better at describing what is in a picture than at saying exactly where it is or exactly how many there are. The image has been cut into patches and often shrunk, and the answer is generated text, so a request for a bounding box or a count of forty small items returns a plausible number, not a measured one.

If you need positions you can highlight, take them from an OCR engine or a detection model that returns boxes, and check any count that matters.
:::

::: context sentence-streaming Start speaking before the answer is finished
A model writes its answer a few tokens at a time. If the app waits for the whole reply before sending it to text-to-speech, the user sits in silence for the full generation time, which for a paragraph can run to several seconds.

The usual fix is to cut the streaming text at sentence boundaries and send the first sentence to TTS while the model is still writing the rest. The first sound then arrives after one sentence, not the whole answer. You now also have to track which sentences were actually played, so a barge-in can truncate the turn correctly.
:::
`;export{e as default};