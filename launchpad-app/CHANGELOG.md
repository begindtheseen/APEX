# Changelog

What changed in each version of LAUNCHPAD. The newest version is first; the app shows the entry for
the version it is running under Settings → What's new.

## 1.2.3

**Learn to code has its own focus mode.** Every course and coding lesson has a **Focus** button.
It starts a block on the lesson you are up to, in the same focus look as the rest of the app, and
keeps you on that language — the next lesson and the next course are fine, anything else waits
until you pause or finish. The Focus page now lets you choose between your path and Learn to code.

**The screen stays on while you use LAUNCHPAD.** It no longer dims and locks in the middle of a
long read: it stays on while a focus block runs, while a lesson is read aloud, and for fifteen
minutes after you last scroll, tap or type.

**Read aloud says equations properly.** A centred dot is "times" (still "dot" between two vectors),
powers are "to the power of", degrees are degrees, matrices are read row by row, and ×, ² and
10^6 in ordinary text come out as words. Lists separated by dots now get a short pause between
items instead of running together, so every lesson has been recorded again.

## 1.2.2

**Focus mode changes how the app looks.** While a block runs, the rail, the top bar and the
search box are gone, the edges of the screen fall into shadow, and one quiet line at the top says
what you are doing. There is the lesson and nothing else until you pause or finish.

**Read aloud: every lesson is recorded, so it plays straight away and never runs out of memory.**
On an iPhone the voice made on the phone could manage only a few sentences before the phone ran
out of memory. Now LAUNCHPAD's lessons are recorded once, ahead of time, in the same natural voice
(Heart), and the phone just plays the recording — no model, no workers, no waiting, and no stopping
halfway to load more. It starts in a fraction of a second, carries on from the lock screen, and a
speed change applies at once with the voice's pitch kept. A lesson edited since it was recorded is
read on the device until it is recorded again.

**Read aloud follows along, word by word.** The word being read is lit up in the lesson as it is
spoken, and the sentence around it faintly, so your eye can keep your place. Scroll away and
**Back to the word being read** appears; one tap brings you back to it. The timing is exact: it
comes from the voice model's own durations for every sound it makes, not a guess.

**The voice made on the device is steadier on a Mac.** It makes the lesson well ahead of where you
are when the computer is fast enough, so it never stops halfway to load more, and it hands its
memory back every thirty sentences, so a long lesson no longer ends with the tab out of memory.

**Focus blocks keep you on the lesson.** While a block is running, the app will not take you
anywhere else: a sidebar link, the search box, the back button or a typed address puts you back on
the lesson, and the strip at the bottom says why and how to leave. Moving between the lessons of
the same module is fine. To go somewhere else, pause the block or end it.

- **Pause** becomes available once five minutes of the block have run, and again five minutes
  after each resume; until then the button shows how long is left. While paused you can go
  anywhere, and **Resume** takes you straight back to the lesson.
- **I'm done** ends the block at any moment, and every minute it ran still counts.

## 1.2.1

**Read aloud no longer freezes on iPhone.** It would play for a while, then stop at random, and
was harder to start each time. Each voice worker takes about 450 MB of memory to start and more
with every longer sentence, never giving it back; the iPhone ran two, ran out of memory, and lost a
worker mid-lesson — and nothing noticed, so the reading waited on it forever, and every restart
queued behind it.

- An iPhone or iPad now runs one voice worker, and gives it shorter pieces (long sentences are
  cut at a comma or semicolon, where a reader pauses anyway), so its memory stays small. The
  worker is let go after 45 seconds of quiet, giving the memory back.
- A worker that fails, stops answering, or is taken by the system is replaced by a fresh one, and
  the sentence it was making is made again. If none can start, the reader says so instead of
  hanging.
- When iOS stops the page's audio (a call, Siri, another app, the screen locking), the reader
  starts it again, or shows Paused so one tap on Resume carries on. Play always starts with fresh
  audio.

**Read aloud reads fluently.** The natural voice paused after almost every comma, semicolon,
colon and dash, as if it could only say a few words at a time. It was cutting sentences into
pieces there to start sooner, and every piece came with half a second of silence at each end —
and on a phone, a wait for the next piece to be made.

- Sentences are now read whole — only a very long one is cut, at a clause — and the voice pauses
  where a reader would: a breath between sentences, a longer one between paragraphs.
- The silence the voice model puts around every clip is trimmed, and each sentence is queued on the
  audio clock to start exactly when the last one ends.
- Where a computer has a GPU (WebGPU: Safari on Mac, Chrome and Edge), the voice runs there,
  many times faster than it speaks. It times itself on a sentence as it starts, and a
  device where the GPU is not faster uses its processor instead, and remembers.
- Before the first word it waits just long enough, if it needs to, that the reading will not have
  to stop and wait later; what it reads is kept on the device, so hearing a lesson again is instant.

## 1.2.0

**More paths in Learn to code, a course on building AI from scratch, and a read-aloud voice that sounds like a person.**

- **Five new goals**, each going as deep as the job needs, not just the basics:
  - **Web Developer** — whole sites and web apps, front to back: HTML, CSS and JavaScript all the
    way to accessible, fast pages, TypeScript, SQL, and three real sites built at the end.
  - **AI Research Engineer** — for the people who build and improve the models themselves: Python
    to expert, then the new AI course, then C++ for the code that has to be fast.
  - **Data Engineer** — SQL from the first SELECT to query plans and schemas that hold up, Python to
    move and clean data, and the command line to run it.
  - **DevOps & Platform Engineer** — the command line to real scripts, git from the first commit to
    rebase and bisect, and Python for the tools you write for everyone else.
  - **Game & Performance Engineer** — C++ from the basics to move semantics, templates, containers
    built from raw memory and undefined behaviour, then three real programs.
- **AI from scratch** (16 lessons), a specialty course after the Python ladder: vectors and
  gradients, regression, an autograd engine like the one inside PyTorch, neural networks and the
  loop that trains them, softmax and the log-sum-exp trick, tokenizers and byte-pair encoding, a
  bigram language model, attention and a transformer block, and how to tell a model that learns
  from one that memorises — every piece built by you in plain Python, so nothing is magic, and
  debugged the way ML engineers debug: gradient checks, exploding losses, leaky validation sets.
  It ends with a capstone: train your own tiny language model to a target loss.
- **Read aloud sounds like a person now.** Lessons are read by a natural neural voice (Kokoro)
  instead of the browser's built-in synthesiser, which on many devices still sounds like a
  robot. It runs on your device, the same voice everywhere: six voices to choose from, American
  and British. The first time, it downloads once (about 92 MB, with progress shown) and then works
  offline; the device's own voices stay in the picker for anyone who prefers them, and are used
  automatically if the natural voice cannot load.
- **C++ works on iPhone and iPad.** An iPhone or iPad cannot run the 105 MB C++ compiler inside a
  browser, so C++ never compiled there. Now it is compiled and run on Compiler Explorer
  (godbolt.org) instead — the code is sent there, and the playground and the output say so.
  Everywhere else C++ still compiles in the tab, and uses the same service only if the in-tab
  compiler cannot start.

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
