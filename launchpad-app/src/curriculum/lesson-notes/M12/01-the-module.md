<!-- Context notes for M12/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[open coding → axial coding|open-axial-coding]] 1
[[LLM-as-judge|llm-as-judge]] 2
[[TPR/TNR|tpr-tnr]] 2
[[pinned model IDs|pinned-models]] 1
[[confusion matrix|confusion-matrix]] 1
[[percentiles|percentiles]] 1
[[bootstrap resampling|bootstrap]] 1
[[golden set|golden-set]] 1

::: context open-axial-coding Borrowed from social science
Both terms come from qualitative research, where people study interviews and field notes. **Open coding**: read each trace and write a short, free-form note on what went wrong, in your own words, with no categories decided in advance. **Axial coding**: afterwards, group those notes into a handful of named failure types and count each one. Deciding the categories first means you only find the failures you already expected.
:::

::: context llm-as-judge What LLM-as-judge means
Having a person read every output does not scale, so teams ask a language model to grade outputs against a written rubric: "Did the answer cite a source? Yes or no." The catch is that the judge is a model too, and it makes mistakes. Before you trust its grades, you measure how often it agrees with careful human labels — that is what "calibrated" means here.
:::

::: context tpr-tnr TPR and TNR in plain words
Treat "this output failed" as the thing the judge is trying to spot. **TPR** (true positive rate): of the outputs that really failed, what share did the judge flag? **TNR** (true negative rate): of the outputs that were really fine, what share did it pass? With 8 failures in 100, a judge that passes everything is 92% "accurate" and has a TPR of zero.
:::

::: context pinned-models Why pin model IDs
Providers offer short aliases that quietly move to newer models, and exact IDs for one specific version. Pinning the exact ID means your app's behaviour changes only when *you* change it. Pinned versions do not last forever — providers retire old models on announced dates — so a switch is eventually forced on you, and the eval set is what tells you whether the new model is as good on your cases.
:::

::: context confusion-matrix The confusion matrix
A table of the four ways a judge's verdict can line up with the truth. Here a judge checked 100 traces with 8 real failures: it caught 6 and missed 2, and of the 92 good ones it passed 88 and wrongly flagged 4. So TPR is 6 of 8, or 75%, and TNR is 88 of 92, about 96%.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 160" font-family="Inter, Arial, sans-serif">
  <text x="230" y="16" font-size="12" text-anchor="middle" fill="#1f2a44">judge said</text>
  <text x="180" y="36" font-size="11" text-anchor="middle" fill="#1f2a44">fail</text>
  <text x="280" y="36" font-size="11" text-anchor="middle" fill="#1f2a44">pass</text>
  <text x="40" y="78" font-size="11" text-anchor="middle" fill="#1f2a44">really fail</text>
  <text x="40" y="128" font-size="11" text-anchor="middle" fill="#1f2a44">really pass</text>
  <rect x="130" y="46" width="100" height="50" fill="#8fb8f0" stroke="#1f2a44"/>
  <rect x="230" y="46" width="100" height="50" fill="#f2b880" stroke="#1f2a44"/>
  <rect x="130" y="96" width="100" height="50" fill="#f2b880" stroke="#1f2a44"/>
  <rect x="230" y="96" width="100" height="50" fill="#8fb8f0" stroke="#1f2a44"/>
  <text x="180" y="76" font-size="12" text-anchor="middle" fill="#1f2a44">6 caught</text>
  <text x="280" y="76" font-size="12" text-anchor="middle" fill="#b4232c">2 missed</text>
  <text x="180" y="126" font-size="12" text-anchor="middle" fill="#b4232c">4 false alarms</text>
  <text x="280" y="126" font-size="12" text-anchor="middle" fill="#1f2a44">88 passed</text>
</svg>
```
:::

::: context percentiles Why percentiles, and why not average them
The **p95** of a set of response times is the time that 95% of requests beat. Averages hide pain: if most requests take 1 second and a few take 30, the average looks fine while some users wait half a minute. And percentiles cannot be averaged — the p95 of two servers combined is not the mean of their two p95s — so always compute them from the raw numbers.
:::

::: context bootstrap What bootstrap resampling is
You have one set of 100 results and want to know how much the score could wobble by chance. **Bootstrapping** (introduced by statistician Bradley Efron in 1979) invents thousands of alternative sets by drawing 100 results at random from your 100, *with replacement*, and scoring each one. The middle 95% of those scores is your confidence interval. If it includes zero improvement, you have not shown an improvement.
:::

::: context golden-set What a golden set is
A **golden set** is a collection of example inputs whose correct answers or labels you have checked by hand and trust. Every version of the system is scored against it. Keeping part of it aside, never looked at while tuning, is what stops the score from simply rewarding you for memorizing the examples.
:::
