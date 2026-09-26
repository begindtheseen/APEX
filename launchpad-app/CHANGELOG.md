# Changelog

What changed in each version of LAUNCHPAD. The newest version is first; the app shows the entry for
the version it is running under Settings → What's new.

## 1.1.0

**Learn to code** — roadmaps of guided lessons, connected to the playground — and a playground
rebuilt around four modes, where every language really runs.

- **The playground comes to the lesson.** Every coding module's lessons end with **Try it here**:
  the playground, embedded under the text, in the languages that module works in (JavaScript and
  TypeScript for the runtime modules, SQL for Postgres, Python from M24, the terminal for M1 and
  git), and the Build step works on the artifact in the same window — the code is kept with the
  module, and one click takes it to the full playground. In Learn to code, a lesson is one flow: the
  explanation, its examples runnable where they stand (a console-style example shows each line's
  value), then your turn, coded right there, and on to the next lesson. The playground is still its
  own page for anything else.
- **The playground has four modes: Code, SQL, Web and Terminal.** Code writes Python, JavaScript,
  TypeScript or C++ (pick it from the file pill); SQL runs on a seeded database and shows its rows as
  a table; Web renders HTML, CSS and JavaScript in a live preview with its console; Terminal is a
  practice shell. One IDE window for all of them: a floating Run Code button, and a panel below
  with Test cases, Console, Input, Results or Preview.
- **Learn to code.** It opens on roadmaps: pick a goal — AI Product Engineer, Software Engineer,
  Frontend, Backend, Data & ML, Systems & C++ — and its courses are laid out in the order a mentor
  would teach them, as a numbered path of course tiles ending at a certificate, lit up as you go.
  View every step walks a goal course by course. Your code, progress and a daily streak are saved
  on this device. It is practice: it does not change claims, readiness or reviews.
- **From your first line to expert, in every language the playground runs.** 36 courses, 499
  lessons: Linux and the command line, Git, HTML and CSS, JavaScript, TypeScript, Python, SQL and
  C++, each from the basics through intermediate, advanced and expert (the terminal and git to
  advanced), and then a projects course. Past the basics every course mixes four kinds of lesson:
  new ideas, **debugging** real broken code from a bug report (reproduce, read the error, narrow it
  down, fix the cause), **problem solving** (design the algorithm yourself, with a big input only an
  efficient answer finishes in time) and **design** (refactor working code into a better shape, or
  shape an API to a spec). Projects courses build real programs step by step — a to-do store with
  undo, an adventure engine, a typed router, a matrix library, an analytics database — and end in
  capstones: a
  specification, an empty file, and tests that only check what your program does, so the design is
  yours. Each language also has a **mastery roadmap** that walks its whole ladder, and each course
  offers the next when you finish. Every lesson is checked in the real runtimes before it ships:
  its starter needs work, and its solution passes.
- **Every lesson happens in the same window.** A short explanation with examples you can run where
  they stand, then the challenge in the IDE below it; Run Code really runs your code and shows every
  check as a test case — the input, what was expected, and what your code produced. TypeScript
  lessons can also check that a type rejects what it should. Hints come one at a time, the solution
  when you ask.
- **A practice terminal.** A small real shell that lives in the page: quoting, variables,
  `$(…)`, wildcards, pipes, redirection (standard error too), `for`, `while` and `if`, scripts you
  save and run, and `grep`, `sort`, `uniq`, `cut`, `find`, `sed`, `xargs` and the rest. Its git
  merges line by line and writes real conflict markers for you to resolve, and has stash, reset,
  revert, rebase, cherry-pick, tags, bisect, blame and a pretend remote that rejects a push the way
  a real one does. It says plainly that it is a simulation; M1's real terminal work still happens on
  your own machine.
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
