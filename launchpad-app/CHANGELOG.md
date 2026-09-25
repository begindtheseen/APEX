# Changelog

What changed in each version of LAUNCHPAD. The newest version is first; the app shows the entry for
the version it is running under Settings → What's new.

## 1.1.0

**Learn to code** — roadmaps of guided lessons, connected to the playground — and a playground
rebuilt around four modes, where every language really runs.

- **The playground has four modes: Code, SQL, Web and Terminal.** Code writes Python, JavaScript,
  TypeScript or C++ (pick it from the file pill); SQL runs on a seeded database and shows its rows as
  a table; Web renders HTML, CSS and JavaScript in a live preview with its console; Terminal is a
  practice shell. One IDE window for all of them: a floating Run Code button, and a panel below
  with Test cases, Console, Input, Results or Preview.
- **Learn to code.** It opens on roadmaps: pick a goal — AI Product Engineer, Frontend, Backend, Data
  & ML, Systems & C++ — and its courses are laid out in the order a mentor would teach them, as a
  numbered path ending at a finish line. Seven courses, 83 lessons: Terminal, Web, JavaScript,
  TypeScript, Python, SQL and C++. Each lesson is a short explanation and a challenge, done in the
  same IDE window; Run Code really runs your code and shows every check as a test case — the input,
  what was expected, and what your code produced. Hints come one at a time, the solution when you
  ask. Your code, progress and a daily streak are saved on this device. It is practice: it does not
  change claims, readiness or reviews. More lessons, past the basics, will follow.
- **A practice terminal.** A pretend computer that lives in the page: `pwd`, `ls`, `cd`, `mkdir`,
  `touch`, `echo` with `>` and `>>`, `cat`, `cp`, `mv`, `rm`, `grep`, `&&`, and enough git — init,
  status, add, commit, log, branch, checkout — to practise the loop. It says plainly that it is a
  simulation; M1's real terminal work still happens on your own machine.
- **C++ compiles and runs in your browser.** Real clang++ (C++20, warnings on), compiled to
  WebAssembly and running in the tab: containers, algorithms, strings, streams, smart pointers. The
  Input tab is the program's standard input; compile errors show clang's own message; a crash or a
  loop that never ends is reported and stopped. One limit, stated in the playground: this toolchain
  has no exception support, so `throw` and `try` do not compile. The compiler is a one-time download
  of about 105 MB before compression, which the browser keeps.
- **TypeScript, type-checked for real.** The real compiler in strict mode checks your code first, and
  a type error stops the run the way `tsc --noEmit` stops CI. Clean code runs as JavaScript.
- **MATLAB, Simulink and Rust are gone** from the playground: none of them could run outside ORBIT's
  desktop app.
- **The editor highlights every mode's language**, in a charcoal theme built for reading code.

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
