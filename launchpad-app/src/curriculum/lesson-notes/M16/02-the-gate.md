<!-- Context notes for M16/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[count blinded|count-blinded]] 1
[[false positives|false-positives]] 1

::: context count-blinded Why the count is hidden
If you knew every diff had exactly one planted defect, you would stop looking once you found one, and "find the bug" becomes a guessing game. Hiding the count — anywhere from zero to three, with at least one clean diff — forces a real review of every line, which is what reviewing agent code at work actually requires.
:::

::: context false-positives Why false alarms are scored
A **false positive** is flagging a problem that is not there. A reviewer who marks everything as suspicious catches every real defect and is useless, because the team soon learns to ignore them. Scoring false alarms separately rewards being right, not just being loud.
:::
