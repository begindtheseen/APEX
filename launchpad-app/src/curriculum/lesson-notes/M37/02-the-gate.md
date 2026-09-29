<!-- Context notes for M37/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[labeled as an anecdote|anecdote]] 1
[[coordinates or counts|coordinates-counts]] 1
[[Waiting for the whole answer|sentence-streaming]] 1

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
