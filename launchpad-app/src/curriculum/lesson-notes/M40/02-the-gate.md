<!-- Context notes for M40/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[clean clone|clean-clone]] 1
[[migrated prompt|migrated-prompt]] 1
[[failover|failover]] 2

::: context clean-clone Proving the repository is complete
A **clean clone** is a fresh copy of the repository in a new folder or on another machine, with none of your local files, caches, installed packages or settings.

A harness that works on your laptop may secretly depend on a file you never committed, a package you installed months ago, or an environment variable you set once. Running from a clean clone, with only the setup the README describes, shows that anyone (including you, next year) can run it.
:::

::: context migrated-prompt Changing two things at once
A **migrated prompt** is one you rewrote to suit the new model. Comparing the new model with its new prompt against the old model with its old prompt changes two things at once, so you cannot say how much of the gap came from the model and how much from the prompt.

The fair reports are the **drop-in** score (both models, same production prompt) and, separately, the migrated score, with the prompt tuned on dev only. The old model might have improved just as much with the new prompt.
:::

::: context failover Switching to a backup automatically
**Failover** means that when the primary service fails or disappears, requests switch automatically to a backup, here another model or provider behind the same interface.

A preview model can be rate-limited, changed or withdrawn on short notice. With failover, users get a slightly different model instead of an error page. It only works if the backup has been evaluated on the same tasks and the switch has actually been tested, not just written.
:::
