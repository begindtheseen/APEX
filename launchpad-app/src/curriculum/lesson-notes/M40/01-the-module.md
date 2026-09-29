<!-- Context notes for M40/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[kill date|kill-date]] 2
[[Strangers, not friends|strangers]] 2
[[paired|paired]] 2
[[model card|model-card]] 2
[[general availability|general-availability]] 1
[[sampling settings|sampling-settings]] 1
[[Hugging Face|hugging-face]] 1
[[leakage|leakage]] 1

::: context kill-date Deciding in advance when to stop
A **kill date** is a date, with a condition, on which you stop the project unless it has hit a target you wrote down beforehand: for example, "if no stranger completes the job within two weeks of launch, I stop."

Writing it before you start matters because of the **sunk-cost** pull: the more hours you have put in, the easier it feels to justify a few more, and the bar quietly moves. A rule set on day one, while you had nothing invested, is the one you can trust.
:::

::: context strangers Why friends' opinions do not count
Friends, family and colleagues want to be kind, so they try the product because you asked, praise it, and rarely come back. Their behavior tells you about your relationship, not about the product. Rob Fitzpatrick's book *The Mom Test* is built on this problem: people will say your idea is great to avoid hurting you.

A stranger who found the product, used it for the job and finished owes you nothing, so what they do is evidence. That is why the gate counts only people who do not know you.
:::

::: context paired Comparing on the same cases
A **paired** comparison runs both models on exactly the same cases and looks at the difference case by case, rather than comparing two separate averages.

Some cases are hard for every model and some are easy for every model. Pairing cancels that shared difficulty out, so what is left is the difference the models actually make. The result is a much tighter interval from the same number of cases, which matters when you have only twenty hand-written ones.
:::

::: context model-card The document that comes with a model
A **model card** is the document a maker publishes alongside a model: what it is for, how it was trained in broad terms, its evaluation results, and its known limitations and risks. The idea comes from a 2019 research paper, and it is now standard on open-weight releases and common for hosted ones.

The evaluation table shows where the maker claims gains, which tells you what to test. The limitations section is often the most useful part, because it is where makers admit what the model does badly.
:::

::: context general-availability Preview versus the real release
Providers often release a new model first as a **preview** (also called beta or experimental) before **general availability**, the point at which it is the provider's stable, supported offering.

A preview can change behavior without notice, have low rate limits, carry different terms (including how your data is used), and be withdrawn on a short schedule. Building a demo on one is fine. A product on one needs a fallback, because the model you tested may not be the model you are served next month.
:::

::: context sampling-settings The knobs that pick each next word
At each step a model produces probabilities for every possible next token, and **sampling settings** decide how one is chosen. **Temperature** controls how adventurous the choice is (lower means more predictable); **top-p** and **top-k** limit the choice to the most likely candidates.

Makers often publish the settings a model was tuned to use, and some models behave noticeably worse far from them, for example by repeating themselves. Run a new model at your old model's settings and a bad score may be a settings problem, not the model.
:::

::: context hugging-face Where open models are published
**Hugging Face** is a company whose website, the **Hub**, is where most open-weight models are published: each model has a page with its weight files, its model card, its license and its chat template. It also hosts datasets and small demo apps.

For a model watch, it is the place new open models appear first, often before any announcement reaches the news. Listing a maker's models newest first, by hand or through the Hub's API, is a cheap way to spot a release.
:::

::: context leakage When test answers seep into your choices
**Leakage** is when information from the test set influences how the system was built, so the test score no longer measures performance on unseen cases. It rarely looks like cheating: rewriting a prompt until test cases pass, or picking the best of five prompt variants by their test score, is enough.

Each tweak fits the prompt a little more to those particular cases. The score rises, but a fresh set would not show the same gain. That is why tuning happens on dev and the test set is run once at the end.
:::
