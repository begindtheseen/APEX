<!-- Context notes for M8/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[kill signal|kill-signal]] 1
[[hosted queue|hosted-queue]] 1

::: context kill-signal What a kill signal is
Operating systems stop programs by sending them signals. A polite one (SIGTERM) asks the program to finish up and exit, and it can run clean-up code. `kill -9` sends SIGKILL, which ends the program instantly with no chance to tidy anything. Testing with the harsh one proves your queue survives the worst case: a machine losing power mid-job.
:::

::: context hosted-queue Hosted queues
Cloud providers sell ready-made queues — Amazon SQS is a well-known one — that you use without running anything yourself. They are good tools. But when something goes wrong in one, the questions are the same ones this module teaches: who holds the job, what happens when a worker dies, what if it runs twice. Building one first makes those questions answerable.
:::
