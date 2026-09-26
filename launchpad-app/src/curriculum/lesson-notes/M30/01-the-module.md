<!-- Context notes for M30/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[autocomplete off|autocomplete]] 1
[[recorded mock|mock-interview]] 1
[[a scoped PR|pull-request]] 2
[[Mid-level system design|system-design]] 2
[[The behavioral round|behavioral-round]] 2
[[merge conflict|merge-conflict]] 1
[[game-day partner|game-day]] 1
[[runbook|runbook]] 1

::: context autocomplete Coding with the helper switched off
Modern editors suggest whole lines of code as you type, powered by AI tools such as GitHub Copilot. It is a huge help day to day, and it also hides how much you can produce on your own.

Many interviews still include at least one round without it, sometimes in a plain shared editor. Practising with it off is the only way to know how you will do when it is gone.
:::

::: context mock-interview A practice run with a real person
A mock interview is a rehearsal that copies a real one: a timer, an unseen problem, and someone playing the interviewer who asks follow-up questions and pushes back.

Recording it lets you watch yourself afterwards. Most people discover habits they never noticed, like going silent for minutes or starting to type before understanding the question.
:::

::: context pull-request Proposing a change to someone else’s code
A pull request (PR) is how you propose a change on GitHub and similar sites: you put your change on a separate branch and ask the project to "pull" it into the main code. Reviewers comment line by line, and a maintainer decides whether to merge it.

"Scoped" means small and focused on one thing. A small PR gets reviewed quickly; a sprawling one tends to sit unread.
:::

::: context system-design Designing a whole system out loud
In a system design interview you are given a broad prompt, such as "design a link shortener" or "design a chat app's message history", and 45 to 60 minutes to sketch how you would build it: the main components, the data, how it handles growth and failure, and the trade-offs.

There is no single right answer. At mid-level, interviewers look for clear questions up front, sensible choices, and honest reasoning about what could break.
:::

::: context behavioral-round The interview about how you work
The behavioral round asks about your past conduct: "tell me about a disagreement with a teammate", "a time you missed a deadline", "a mistake you made". It tests how you work with people, handle pressure and learn.

Strong answers are specific, true, and show what **you** did, often told in the Situation–Task–Action–Result (STAR) shape. With no former employer to call for references, this round carries extra weight.
:::

::: context merge-conflict When git cannot combine two changes
A merge conflict happens when two changes touch the same lines of a file and git cannot tell which to keep. It stops and marks the clash so a person can decide.

In this exercise that is a problem: you wanted undoing an old fix to produce a clean failing test, and a conflict means the surrounding code has changed so much that the setup no longer works.
:::

::: context game-day Breaking things on purpose, to practise
A game day is a planned exercise where a team deliberately causes a failure, such as killing a server or cutting off the database, to rehearse its response while everyone is calm and ready.

It shows whether alerts fire, whether the runbooks make sense to someone else, and how long recovery really takes. Doing one with a partner gives you a true story about working with another person under pressure.
:::

::: context runbook Step-by-step instructions for trouble
A runbook is a written, step-by-step guide for handling a known situation: "the queue is backing up: check this dashboard, run this command, if that fails, do this".

It is written for the person on call at 3am who did not build the system. If someone else could not follow yours, that is a useful finding, and a good interview story.
:::
