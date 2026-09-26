<!-- Context notes for M19/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[kill signal|kill-signal]] 1
[[red-team brief|red-team]] 1
[[Fuzz the ceiling|fuzzing]] 1
[[lag-1|lag-1]] 1

::: context kill-signal Stopping a program with no warning
Operating systems stop programs with signals. `SIGTERM` politely asks a program to finish up; `SIGKILL` (what `kill -9` sends) ends it instantly, and the program gets no chance to save anything.

Real servers die this way all the time: a deploy, a crash, a machine being recycled. A kill at a random moment tests whether your saved state is always consistent, not just when you stop the agent nicely.
:::

::: context red-team Attacking your own system on purpose
A red team is a person or group whose job is to attack a system the way a real adversary would, to find weaknesses before someone malicious does. The term comes from military exercises, where the "red" side played the enemy.

AI labs and security teams run red-team exercises constantly. Giving the attacker no knowledge of your defences keeps the test honest: they cannot aim only at the cases you already handled.
:::

::: context fuzzing Throwing lots of odd inputs at it
Fuzzing means feeding a program large numbers of random, malformed or hostile inputs to see what breaks. It finds the failures you would never think to write a test for.

The contrast with a demo matters. A demo shows the one path you chose. Two hundred inputs you did not design show whether the spending limit actually holds.
:::

::: context lag-1 Why simple repeat-checks miss loops
"Lag-1" means comparing each step with the step just before it. A naive loop detector asks "is this call the same as the previous one?"

An agent stuck calling search, then read, then search, then read never matches its immediately previous step, so that check never fires, even though the pattern repeats every two steps. Loop detection needs to look further back, or cap total spend regardless.
:::
