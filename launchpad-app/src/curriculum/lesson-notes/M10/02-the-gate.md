<!-- Context notes for M10/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[fault-injection script|fault-injection]] 1
[[Time-to-mitigate|mitigate-first]] 1
[[Alerting on causes|symptoms-not-causes]] 1

::: context fault-injection What fault injection is
**Fault injection** means breaking your own system on purpose — killing a process, adding delay, cutting off the database — to check that your monitoring notices and your recovery works. Netflix made the idea famous with Chaos Monkey, a tool that randomly shut down its servers during working hours so engineers had to build systems that shrugged it off.
:::

::: context mitigate-first Stop the bleeding, then investigate
**Mitigating** means making the harm stop — roll back the last deploy, switch off the broken feature, move traffic elsewhere — often before anyone knows the cause. **Root cause** is the full explanation, and it can take hours. Users are hurting the whole time you investigate, so experienced on-call engineers mitigate first and diagnose afterwards.
:::

::: context symptoms-not-causes Alert on what users feel
A **cause** alert fires on something that *might* matter — high CPU, a full-ish disk. A **symptom** alert fires on what users actually experience — errors rising, pages slowing. Cause alerts fire constantly while nothing is wrong, people learn to mute them, and then the real failure goes unnoticed. Google's widely read Site Reliability Engineering book recommends alerting on symptoms.
:::
