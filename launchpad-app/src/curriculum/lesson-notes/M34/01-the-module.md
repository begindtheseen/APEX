<!-- Context notes for M34/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[knowledge cutoff|knowledge-cutoff]] 3
[[the modalities|modalities]] 1
[[rate-limit tier|rate-limit-tier]] 2
[[the deprecation|deprecation]] 1
[[style-controlled ranking|style-control]] 1
[[SWE-bench Verified|swe-bench]] 1
[[permissive licenses|permissive]] 2
[[community license|community-license]] 2
[[Open Source AI Definition|osaid]] 1

::: context knowledge-cutoff Where the training data stops
The knowledge cutoff is the date after which the model saw little or no training data. Ask about anything later (a library release, a price change, a news event) and the model does not know it, yet may answer fluently anyway, for the reasons M33 gave. Some makers state one date for "reliable knowledge" and a later one for the raw training data.

It matters for coding work in particular: a model can confidently suggest an API that has since changed, which is why retrieval and current documentation still earn their place.
:::

::: context modalities What kinds of input and output
A modality is a kind of data: text, images, audio, video, or documents such as PDFs. A card lists which ones the model accepts as input and which it can produce as output, and the two lists often differ; many models read images but reply only in text.

Each modality also has its own limits (image size, audio length) and its own token cost. If your flagship takes screenshots or voice, a model without that input is off the shortlist before quality comes into it.
:::

::: context rate-limit-tier How much you are allowed to send
Providers cap how many requests and tokens an account may send per minute, and sometimes per day. The caps usually come in tiers: a new account starts low and moves up as it spends more or has been paying longer, so two teams calling the same model can have very different ceilings.

A model that wins your eval is no use at launch if your tier allows a fraction of your expected traffic, and moving up can take time. That is why the tier goes on the card and gets checked early.
:::

::: context deprecation Announced, then switched off
Deprecation is the announcement that a model will stop being offered; retirement is the date it actually stops, after which calls to it fail. The gap is usually measured in months, and the maker usually names a suggested replacement.

That replacement is a different model, so prompts, parsing and costs all have to be re-checked against it, which is why the lesson calls it a forced migration. Makers publish these schedules on a deprecations page, and the date belongs on your card the day you choose a model.
:::

::: context style-control Correcting for long, pretty answers
In head-to-head votes, people tend to prefer answers that are longer and use more headings, bullets and bold text, whether or not the content is better. A style-controlled ranking uses statistics to estimate how much of each model's win rate comes from those features, and shows the ranking with that effect taken out.

A model that drops sharply between the raw table and the style-controlled one owed part of its lead to presentation. Neither table measures your task.
:::

::: context swe-bench A benchmark built from real bug fixes
SWE-bench collects real issues from open-source Python projects on GitHub. The model gets the repository and the issue text and must produce a code change; it passes if the project's tests, including the ones added with the original fix, succeed. SWE-bench Verified is a subset that human engineers screened to remove unclear or unfair tasks, and it became a headline number for coding models.

Because the issues and their fixes are public, a model may have seen the answers during training: the contamination problem, exactly.
:::

::: context permissive Licenses that ask almost nothing
Apache 2.0 and MIT are two of the most widely used open-source licenses. Both let you use, change, sell and redistribute the software, commercially too, as long as you keep the copyright and license notice. Apache 2.0 adds an explicit patent grant and asks you to mark files you changed.

Because lawyers already know these texts, a model released under one of them rarely needs more legal review than "keep the notice." That is the contrast with custom licenses, where every clause is new.
:::

::: context community-license A maker's own terms
A community license is a custom license a model maker writes for its own weights. It usually allows free use, commercial use included, but adds conditions: a user-count threshold above which you need a separate license from the maker, an acceptable-use policy listing forbidden uses, rules about naming or crediting derived models, or limits on using outputs to train other models.

Meta's Llama licenses are a well-known example, with a threshold in the hundreds of millions of monthly users. Breaking a condition can end your right to use the model.
:::

::: context osaid What open source means for a model
The Open Source Initiative is the nonprofit that maintains the widely accepted definition of open-source software and approves licenses such as MIT and Apache 2.0. Its Open Source AI Definition, published in 2024, says an AI system is open source only if you are free to use, study, modify and share it, which it says requires the weights, the code to train and run the model, and detailed information about the training data.

Most "open" models release only the weights, under their own terms, so they are open-weight.
:::
