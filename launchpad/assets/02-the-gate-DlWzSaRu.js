var e=`---
id: m1-the-gate
title: "First Code — the gate, and what most people miss"
minutes: 1
covers:
  - "What a program is: a file of instructions a runtime (here, Node) reads top to bottom"
  - "The terminal as a place you type commands, and what a working directory means"
  - "Variables, functions, arguments and return values — the four things every program is made of"
  - "Conditionals and loops, and why a loop that never ends is the first bug everyone writes"
  - "Arrays and objects: a list of things, and a thing with named parts"
  - "Reading an error message: the type, the message, the file and the line number"
  - "What a test is — code that runs your code and says yes or no without you looking"
  - "git as a save-point system: what a commit is, and what branch, remote and getting back mean"
---
**GATE** — **REFEREE:** anyone who writes code for a living, watching your screen for 20 minutes, on a
task you have not seen. **PASS:** from an empty directory: create a file, write a function with a test,
run it, make the test fail, read the error out loud and say what it means, fix it, [[commit, push|commit-push]]. No
tutorial open. **ON FAIL:** do it again from an empty directory. Re-running the tutorial does not count —
the whole failure mode of this module is a working repo you cannot rebuild.

**Most-missed:** Following a tutorial to a working app and mistaking that for being able to write one. The
gate here is an empty directory for exactly this reason. · Reading the error message as noise instead of as
the answer. It names the file and the line, and usually it names the mistake too. · Copying code you
cannot explain, which converts a 5-minute bug into a 2-hour one because you cannot [[form a hypothesis|hypothesis]]
about your own program. · Setting up a perfect environment (your editor and installed tools) instead of
writing programs. A slightly wrong editor that you use beats a perfect one you configure for a week. · Not committing until it works. The
point of a save-point is to have one from before it broke.

::: context commit-push Commit and push are two different steps
A **commit** saves a snapshot of your files, with a short message, into the history on your own machine. A **push** copies those commits up to the remote, such as GitHub, where someone else can see them. Committing without pushing means your work exists only on your laptop, which is why the gate asks for both.
:::

::: context hypothesis Debugging is guessing, then checking
Working engineers rarely stare at a bug until the answer appears. They say "I think it fails because this value is empty here," then check that one guess — print the value, add a test — and keep or throw out the idea. You can only make a guess like that about code you understand, which is why pasted code you cannot explain makes every bug slower.
:::
`;export{e as default};