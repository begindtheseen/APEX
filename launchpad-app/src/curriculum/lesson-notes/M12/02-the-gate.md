<!-- Context notes for M12/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[held-out test set|held-out]] 1
[[Cohen’s κ|cohens-kappa]] 1
[[Self-preference is real|self-preference]] 1

::: context held-out What "held out" means
A **held-out** set is examples you put aside at the start and never use while making changes. Tweak a prompt until it scores well on the same examples you tweak against and you mostly learn those examples. The held-out score is the honest estimate of how the change does on inputs it has not seen — which is what real users send.
:::

::: context cohens-kappa Agreement corrected for chance
Two people who both mark 90% of items "pass" without really reading would still agree most of the time: $0.9 \times 0.9 + 0.1 \times 0.1 = 0.82$, or 82%, by luck alone. **Cohen's kappa** (named after psychologist Jacob Cohen, 1960) subtracts that expected agreement: $\kappa = \frac{p_o - p_e}{1 - p_e}$, where $p_o$ is how often they agreed and $p_e$ is how often chance would make them agree. Zero means no better than chance; 1 means perfect agreement.
:::

::: context self-preference Judges favour their own writing
Research on LLM judges has found that a model tends to rate text written by itself, or by its own family of models, more generously than an outside reader would. It is a bias in the grader, not proof of quality. The fix this lesson gives is practical: measure the judge against human labels, and the bias shows up in the numbers if it is there.
:::
