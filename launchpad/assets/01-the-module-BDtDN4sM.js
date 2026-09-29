var e=`---
id: m37-the-module
title: "Beyond Text: Vision, Speech, Images and Embeddings — what to understand and what to build"
minutes: 9
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
Everything you have built so far takes text in and puts text out. Users photograph a receipt instead of
typing it, talk to the app while driving, upload a screenshot of an error. Each of those breaks an
assumption the text stack quietly relied on — that input cost tracks length, that a second of latency is
fine, that the output is a string you can assert against. This module is the engineering of each
modality: what it costs, how it fails, and how you measure it. It assumes M18's embeddings and golden-set discipline, M22's streaming surface and
client-side timing, and M35's provider interface, because the best model for each modality is rarely from
the same maker. M33 owns the internals. You ship two modalities to real users and
one embeddings job, and measure all three.

**Core concepts:** **An image is tokens too** — a vision model [[cuts the picture into patches|image-patches]], bills by
pixel area up to a per-model cap, and silently downscales beyond it, so resolution is a cost and accuracy
dial you set on purpose. **Vision reading is generation, not OCR**: it fails by plausible substitution,
not by garbled characters. When **classic OCR** (optical character recognition: an engine that returns
characters with positions and confidences) still wins, and the **hybrid** that hands the model both the
OCR text and the image. **Speech-to-text** (STT) measured as **[[word error rate|wer]] on your own audio**, never a
vendor benchmark. **Text-to-speech** (TTS) and the **[[real-time factor|real-time-factor]]** — speech has to be made at least as
fast as it is spoken. **Realtime voice as a latency budget**: a chain of timed stages, with **[[endpointing|endpointing]]**
(deciding the user has finished) usually the largest term. **Turn-taking and barge-in.**
**Cascade versus speech-to-speech** — seams you can measure against latency you cannot otherwise get.
**Diffusion, intuitively**: noise to image, one denoising step at a time, steered by **guidance**.
**Provenance** — [[C2PA content credentials|c2pa]], watermarks, and what each proves. **Embeddings beyond
retrieval**: classification, clustering, deduplication, and **multimodal embeddings** with their modality
gap. **Evaluating output that is not text.**

> **A common belief that is wrong: that a vision model reading a document is OCR with better manners.**
> An OCR engine that cannot read a smudged digit gives you a low-confidence character in a known box. A
> vision model gives you a confident, well-formed \`8\` where the paper says \`3\`, and a total that is
> internally consistent and wrong, with no per-character confidence to flag it. Classic OCR still wins
> when you need **positions you can highlight** (M11's provenance), **the same output on every rerun**,
> **auditable per-word confidence**, **volume at a fraction of the cost**, or **no network at all**. The
> vision model wins on layout, handwriting and anything that needs understanding rather than
> transcription. Measure both arms on the same photographs; do not decide from this paragraph.

> **The photograph is not the document.** Phone photographs arrive rotated by metadata the model may never
> see (at least one provider documents that it receives none), at a resolution the provider will shrink
> until small print is illegible, with glare, perspective and blur. **Normalize orientation and crop in
> your own code before the call**, log the exact bytes you sent, and evaluate on photographs taken the way
> your users take them.

> **Barge-in is M22's stop button with a microphone.** When the user talks over the assistant, stopping
> the audio is the easy third. The model is still generating and billing, and the history now claims the
> user heard a paragraph they cut off after four words. **Cancel upstream, and truncate the assistant turn
> to what was actually played**, or the next answer will refer to things the user never heard. Without
> [[echo cancellation|echo-cancellation]], the assistant also hears itself through the speaker and interrupts itself.

> **Provenance proves who signed, not what is true, and absence proves nothing.** A C2PA manifest is
> signed metadata recording who made an asset and with what tools, including a generator. A screenshot or
> a re-encode strips it; a **soft binding** (an invisible watermark or fingerprint pointing back to the
> manifest in a registry) survives some of that. No detector reliably answers "is this image
> AI-generated", and at least one major provider documents that its own model cannot — **do not build a
> feature on that question.** The EU AI Act now requires machine-readable marking of synthetic content, on
> a schedule that has already shifted once — check what applies to your product and when.

> **Currency: this module decays as fast as M6.** Voice models and transports, per-minute and per-image
> prices, accepted input types and sizes, image and video generators, embedding models and their
> dimensions, and the C2PA specification version all move monthly. **Video generation is the sharpest
> case**: a flagship video product and its API were launched and shut down inside two years. Look it up the
> week you build and record the check date; Appendix D is a dated starting point.

**Checkpoints** ① the price of a picture: the same document photographed, sent at three resolutions, with
the token count predicted from the provider's documented formula, read back from the usage object, and
extraction accuracy at each · ② classic OCR, vision model and hybrid on the same photographs: field-level
exact match, cost and p50/p95 latency for each arm · ③ speech both ways: your own WER code over twenty
recordings including a second speaker and a noisy room, and TTS with its real-time factor measured ·
④ the voice latency budget: per-stage timestamps on 50 turns, p50/p95 per stage and end to end, and a
barge-in whose cancellation shows in the cost meter · ⑤ one generated image carrying a C2PA manifest that
an open-source verifier accepts, then screenshotted and verified again, and the failure recorded · ⑥ the
embeddings job that is not search, with its threshold fixed on dev and precision and recall reported on
test.

**Artifact** \`EVIDENCE\` — two modalities in the flagship, in production form: authenticated, metered
through M20's ledger, visible in M10's traces, and failing honestly in M22's surface. The default pair is
**photograph-to-record** — a user photographs a document their use of the flagship involves, and the
flagship extracts it into typed fields, keeping the image as the provenance M11 would demand — and a
**voice mode**: speech in, the flagship's existing pipeline, streamed speech out, with barge-in. Another
user-facing pair is acceptable if both halves are evaluated. The photograph arm is scored on **at
least 80 real photographs** (flat, phone in good light, phone at an angle in poor light — at least 20 of
each), **split dev/test at creation** on M12's tables, reported per field with a bootstrap interval, with
the classic OCR engine as a baseline arm and both priced per 1,000 documents. The voice arm reports
**end-to-end p50 and p95 over at least 50 turns**, broken down by stage, plus WER on twenty recordings.
Then **one embeddings job that is not search** — near-duplicate detection, a classifier, or clustering over
data the flagship already holds — on **at least 200 hand-labeled items or pairs**, split dev/test, with the
threshold chosen on dev and precision and recall reported on test. The README is a table: what each arm
cost, what it bought, and which one you would turn off.

**The voice latency budget, worked.** Illustrative figures, not targets: endpointing silence 500 ms, STT
finalization 150, network in 50, model time-to-first-token 400, TTS to first audio 150, network out and
playback 50 — about 1,300 ms from the user falling silent to the first sound back. In a **cascade**
(separate STT, model and TTS) every term is measurable and has a lever: a shorter silence timeout cuts
people off mid-thought, which is why semantic endpointing (a model judging whether the utterance is
finished) exists; streaming STT removes most of the finalization; M6 and M20 already taught you to cut
TTFT; TTS can start on the first sentence. A **speech-to-speech** model takes audio in and emits audio out
in one hop, winning on latency and [[prosody|prosody]], but it removes the text at each stage that your M12 graders,
M10 traces and M35 interface were built around — if you choose it, turn on its transcripts and grade
those. Browsers get WebRTC (jitter buffering, echo cancellation); servers usually a WebSocket. **Report percentiles from the raw per-turn array** (M12's rule): one slow turn in ten is what
users remember.

**Diffusion, intuitively.** Training takes real images, adds noise in increasing amounts, and teaches a
network to predict the noise that was added. Generation runs it backwards: start from pure noise and
remove a little at a time, each step conditioned on your prompt, until an image is left. **Guidance** runs
each step with and without the prompt and pushes further along the difference; turn it up and the image
obeys the prompt more closely, loses variety, and past a point turns harsh. Most systems do this in a
compressed [[latent space|latent-space]], and some generate autoregressively instead — check what you call. **Editing** starts the same process from your image partially re-noised, with a mask saying which
region may change. The engineering is the surface around it: refusals handled as an M6 branch; likeness, trademarks and minors blocked before the call as well as after; the provider's
terms on output ownership and [[indemnity|indemnity]]; and the United States Copyright Office's position that purely
machine-generated material is not protected — check your own jurisdiction before a client builds on it.
**Video** is the same idea through time: short clips, some with generated audio, priced per second.

**Evaluating output that is not text.** STT: WER is substitutions plus deletions plus insertions over
reference words, and **the normalization you apply first** (numbers, casing, punctuation, fillers) can move
it as much as a change of vendor — name it. TTS: you cannot assert on a waveform, so round-trip the audio
through STT to catch skipped and mispronounced words, measure the real-time factor (LAUNCHPAD's own on-device
read-aloud voice measures it as it plays and falls back when it lags), and collect pairwise human preferences. Extraction: field-level exact match after
normalization, per field, because a document-level score can hide a total that is wrong on a third of
receipts. Generated images: an assertable checklist first (the right number of objects, the requested text
legible), then a vision-model judge calibrated against your labels exactly as M12 calibrates any judge,
reported as TPR and TNR.

**Embeddings beyond retrieval.** M18's search vector is a general feature. A small linear classifier on
embeddings is fast, cheap, and gives a score whose calibration you can measure — unlike a confidence the
model writes itself (M6). Clustering suggests groups for M12's open coding; it does not label them, for
the reason M12 refuses to delegate labeling. Deduplication is a cosine threshold, and **thresholds belong
to one model**: they do not survive a model change. **Multimodal embeddings** put images and text in one
space, but image-to-text similarities sit systematically lower than text-to-text ones — the modality gap —
so a threshold tuned on one pair of modalities is wrong for another.

::: context image-patches How a picture becomes tokens
A vision model does not read an image pixel by pixel. It slices the picture into a grid of small squares, called **patches**, and turns each one into something like a token that sits in the input beside your text.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 130" font-family="Inter, Arial, sans-serif">
  <rect x="20" y="20" width="120" height="90" fill="#8fb8f0" stroke="#1f2a44" stroke-width="2"/>
  <g stroke="#1f2a44" stroke-width="1">
    <line x1="50" y1="20" x2="50" y2="110"/><line x1="80" y1="20" x2="80" y2="110"/><line x1="110" y1="20" x2="110" y2="110"/>
    <line x1="20" y1="50" x2="140" y2="50"/><line x1="20" y1="80" x2="140" y2="80"/>
  </g>
  <text x="80" y="126" font-size="11" text-anchor="middle" fill="#1f2a44">12 patches</text>
  <line x1="150" y1="65" x2="185" y2="65" stroke="#1d6fd1" stroke-width="2"/>
  <polygon points="190,65 180,60 180,70" fill="#1d6fd1"/>
  <g fill="#fff" stroke="#1d6fd1" stroke-width="1.5">
    <rect x="200" y="55" width="12" height="20"/><rect x="214" y="55" width="12" height="20"/><rect x="228" y="55" width="12" height="20"/>
    <rect x="242" y="55" width="12" height="20"/><rect x="256" y="55" width="12" height="20"/><rect x="270" y="55" width="12" height="20"/>
    <rect x="284" y="55" width="12" height="20"/><rect x="298" y="55" width="12" height="20"/><rect x="312" y="55" width="12" height="20"/>
    <rect x="326" y="55" width="12" height="20"/>
  </g>
  <text x="270" y="95" font-size="11" text-anchor="middle" fill="#1f2a44">12 image tokens in the input</text>
</svg>
\`\`\`

More pixels means more patches, so the cost grows with the image's **area**: doubling both width and height roughly quadruples the tokens, until the provider's size cap, beyond which it shrinks the image for you and small print can blur away.
:::

::: context wer Word error rate, the standard score for transcripts
**Word error rate** (WER) compares a transcript with a correct reference, word by word. It counts **substitutions** (a wrong word), **deletions** (a missing word) and **insertions** (an extra word), then divides by the number of words in the reference.

Reference "send the invoice today", transcript "send an invoice to day": two substitutions (the→an, today→to) and one insertion (day), so 3 ÷ 4 = 75%. Lower is better, and insertions can push it past 100%. Whether "20" matches "twenty" depends on the normalization you apply first, which is why the lesson makes you name it.
:::

::: context real-time-factor Can the voice keep up with itself?
The **real-time factor** is how long a system takes to produce audio divided by how long that audio lasts. Making 10 seconds of speech in 5 seconds is a factor of 0.5.

Below 1, the speech is made faster than it plays, so playback never runs dry. Above 1, the listener hears the voice stall mid-sentence while the next piece is still being made, however fast the first word arrived. It is the audio cousin of a video that keeps pausing to buffer.
:::

::: context endpointing Knowing when the user has stopped talking
A voice app hears a continuous stream of sound and must decide when a turn is over. The simplest method uses **voice activity detection** (a small model that labels each slice of audio as speech or not) and waits for a fixed stretch of silence.

That wait is pure delay added to every reply, and it is a trade-off: wait half a second and people who pause to think get cut off; wait longer and the assistant feels slow. That is why endpointing is often the largest term in the latency budget.
:::

::: context c2pa Signed labels on media files
**C2PA** (the Coalition for Content Provenance and Authenticity) is an industry standard, backed by companies including Adobe and Microsoft, for attaching a signed record to an image, video or audio file. **Content Credentials** is the name shown to users.

The record, called a **manifest**, says who made the file and with what tools, and is signed with a certificate the way a website is. A verifier checks that the signature is valid and that the file has not changed since signing. It tells you who vouched for the file, not whether what it shows is true.
:::

::: context echo-cancellation Stopping the app from hearing itself
When a phone or laptop plays the assistant's voice through its speaker, the microphone picks it up again. Without help, the app transcribes its own words, decides the user is talking, and interrupts itself.

**Acoustic echo cancellation** knows exactly what the device just played, estimates how that sound arrives back at the microphone, and subtracts it from the recording. Video-call software has done this for years, and browsers can do it for you when capturing audio. Testing with headphones on hides the problem entirely, so test on a speaker.
:::

::: context prosody How something is said, not just what
**Prosody** is the rhythm, stress, pitch and pace of speech: the difference between "Really." and "Really?", or a hesitant answer and a confident one.

A cascade turns speech into plain text, and plain text throws most of that away, so the model never hears that the user sounded annoyed, and the voice at the end has to guess the tone from words alone. A speech-to-speech model hears and produces the audio directly, so it can keep it, at the price of losing the text you would otherwise log and grade.
:::

::: context latent-space Working on a compressed image instead of pixels
Running diffusion directly on millions of pixels is slow. Most image generators first use a separate network (an **autoencoder**) that squeezes an image into a much smaller grid of numbers, and a matching decoder that turns such a grid back into a picture.

That smaller space is the **latent space**. The denoising steps happen there, and only the final result is decoded into pixels. Stable Diffusion's original models, for example, worked on a grid eight times smaller than the image on each side, which is a large part of why they could run on a single consumer graphics card.
:::

::: context indemnity Who pays if the output gets you sued
An **indemnity** is a contract promise that one party will cover another's legal costs and damages in a specified situation. Here it means the image provider promises to defend you if someone claims a generated image infringes their copyright.

These promises usually come with conditions, such as being on a particular paid plan, keeping the provider's filters switched on, or not deliberately prompting for a copy of a known work. Read which outputs and which uses are covered before telling a client they are protected.
:::
`;export{e as default};