# Context notes for a LAUNCHPAD lesson

LAUNCHPAD's lessons are generated from `AI_ENGINEERING_CURRICULUM.md` by
`scripts/launchpad-curriculum.ts`, word for word, so their notes live here
instead and the generator merges them in. Every lesson has them: at least four
for a module lesson (`01-the-module.md`), at least two for a gate lesson
(`02-the-gate.md`); aim for 6–10 and 2–5. `lessons.test.ts` checks the counts.

## The file

`src/curriculum/lesson-notes/<M id>/<same file name as the lesson>`:

```
<!-- Context notes for M5/01-the-module.md. -->
[[phrase exactly as it appears in the lesson|note-id]] 1
[[another phrase|other-id]] 2

::: context note-id A short headline, not the phrase again
40–120 words (15–260 allowed) in plain words: what the term means, an
everyday example, and why it matters on the job.
:::

::: context other-id …
:::
```

- Each mark line is the phrase, its id, and which appearance of the phrase to
  mark (1 = the first time it appears in the lesson file, header included).
- Notes follow in the order their phrases appear. Ids are lowercase words and
  dashes, unique in the lesson.
- Never mark inside the header, a heading, code, a link, a table or maths.
- About one note in five may carry a picture: one fenced `svg` block, with a
  `viewBox`, dark ink on light (`#1f2a44`, blues `#1d6fd1`/`#8fb8f0`, red
  `#b4232c`), text at least 11 px, no scripts or links.
- Every fact true; check numbers.

## What earns a note

A term a newcomer will not know, the reason behind a rule, how the thing shows
up at work, or a picture that makes it click. Not a note on every bold word, and
not a repeat of the sentence it sits in.

## Checking

`npm test` regenerates the lessons with the notes merged in and checks them. If
the document changes so a phrase disappears, the generator skips that note and
names it; move the mark or rewrite the note.
