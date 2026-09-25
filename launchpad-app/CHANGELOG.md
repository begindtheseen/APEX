# Changelog

What changed in each version of LAUNCHPAD. The newest version is first; the app shows the entry for
the version it is running under Settings → What's new.

## 1.1.0

**Learn to code** — a new guided mode, connected to the playground — and a playground where every
language really runs.

- **Learn mode.** Lesson by lesson through the basics of JavaScript, TypeScript, Python, SQL and C++
  (60 lessons). Each is a short explanation, one task, and your own code in the playground's editor.
  Run & check really runs it and grades what it did — the exact output, calls into the functions you
  wrote, the rows your query returned — with hints one at a time and the solution when you ask. Your
  code and progress are saved on this device; Open in playground takes your code to the scratchpad,
  and the playground points back into the lessons for the language you are on. It is practice: it
  does not change claims, readiness or reviews. More lessons, past the basics, will follow.
- **C++ compiles and runs in your browser.** Real clang++ (C++20, warnings on), compiled to
  WebAssembly and running in the tab: containers, algorithms, strings, streams, smart pointers. An
  input box is the program's standard input; compile errors show clang's own message; a crash or a
  loop that never ends is reported and stopped. One limit, stated in the playground: this toolchain
  has no exception support, so `throw` and `try` do not compile. The compiler is a one-time download
  of about 105 MB before compression, which the browser keeps.
- **TypeScript, type-checked for real.** The real compiler in strict mode checks your code first, and
  a type error stops the run the way `tsc --noEmit` stops CI. Clean code runs as JavaScript.
- **MATLAB, Simulink, Rust and Shell are gone** from the playground: none of them could run outside
  ORBIT's desktop app. M1's terminal work belongs in a real terminal on your own machine.
- **JavaScript and TypeScript are highlighted in the editor.**

## 1.0.0

LAUNCHPAD now runs on the ORBIT learning platform: the same dashboard, module pages, lesson reader,
spaced-repetition recall, focus blocks, progress charts and code playground, with LAUNCHPAD's
curriculum inside it, unchanged.

- **Every module is whole.** The note to read first, the timing notes, the Words, what you have to
  hold in your head, the pitfalls, the mechanism figure, the artifact, the checkpoints, the gate and
  its referee — all of it, from the curriculum file.
- **Lessons.** Each module's prose from the curriculum document is its lessons, verbatim, read in
  ORBIT's reader with read-aloud and a saved place.
- **Build, then the gate.** Delta written, checkpoints, artifact built, gate passed — claimed in
  order, only once a module is open, exactly as before. The hard gate still holds Layers 4–6.
- **Recall.** Every module's Words are flashcards on ORBIT's FSRS scheduler.
- **The Plan and the parallel tracks** have their own pages, running the curriculum's own arithmetic.
- **The playground runs JavaScript for real**, alongside Python and SQL.
- **Your progress came with you.** The old realm's record is read the first time the app opens and
  kept in step, and an old backup file restores in Settings.
