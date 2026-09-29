<!-- Context notes for M34/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[host, precision|precision]] 1
[[Pin the snapshot|snapshot]] 1
[[train on your inputs|training-use]] 1

::: context precision Precision here means number format
Here, precision is how many bits store each of the model's numbers. 16-bit is the usual full-size format; 8-bit and 4-bit (quantized) versions take less memory and cost less to run, but can answer differently. Two hosts serving "the same" open-weight model may use different precisions, so scores and costs can differ with neither host doing anything wrong.

It has nothing to do with precision in the classification sense, as in precision and recall.
:::

::: context snapshot A frozen name versus a moving one
A snapshot is a model id that names one fixed version, usually with a date or version number in it; its behavior does not change while it exists. An alias is a shorter name the maker repoints at the newest version in a line.

Calling the alias is convenient until the day your eval scores, output lengths or costs shift with no change in your code. Pinning means your code and your eval both name the snapshot, and moving to a new one is a deliberate change with a re-run.
:::

::: context training-use When your data becomes training data
Training-use terms say whether the maker may use what you send (prompts, files, outputs) to train future models. Paid API terms commonly say no by default; some free tiers and consumer apps say yes.

If your users' data trains a model, pieces of it could in principle resurface elsewhere, and you may be breaking promises in your own privacy policy or customer contracts. That is why the terms go into the data-flow document, not just into the model choice.
:::
