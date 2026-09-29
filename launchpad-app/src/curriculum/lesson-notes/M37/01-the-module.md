<!-- Context notes for M37/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[cuts the picture into patches|image-patches]] 2
[[word error rate|wer]] 2
[[real-time factor|real-time-factor]] 2
[[endpointing|endpointing]] 2
[[C2PA content credentials|c2pa]] 1
[[echo cancellation|echo-cancellation]] 1
[[prosody|prosody]] 2
[[latent space|latent-space]] 1
[[indemnity|indemnity]] 2

::: context image-patches How a picture becomes tokens
A vision model does not read an image pixel by pixel. It slices the picture into a grid of small squares, called **patches**, and turns each one into something like a token that sits in the input beside your text.

```svg
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
```

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
