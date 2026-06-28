# APEX — Supporting Research

This document is the evidence base behind APEX. Every science claim, phase-unlock
threshold, habit rationale, and Navy fact used in the app is recorded here with the
paper or primary source it came from.

> **Provenance & caveats.** This dataset was compiled by the app's author from the
> research conducted in the conversation that originally designed APEX. Citations are
> recorded **as provided**. Primary peer-reviewed sources (DOIs / PMC IDs below) are
> the authoritative references; secondary coverage (news, Medium, community guides) is
> labeled as such and should be treated as supporting context, not primary evidence.
> Numbers that drive product behavior (e.g. the 66-day habit average, the 252 NUC-NF
> composite) are mapped to where they're used in the app so they can be re-verified and
> updated over time.

---

## Habit formation

### Lally et al. (2010) — the core study
- **Citation:** Lally, P., van Jaarsveld, C.H.M., Potts, H.W.W., & Wardle, J. (2010). How are habits formed: Modelling habit formation in the real world. *European Journal of Social Psychology*, 40(6), 998–1009.
- **DOI:** https://doi.org/10.1002/ejsp.674
- **Key findings:** 96 participants, 12 weeks. Average habit automaticity: **66 days**. Range: **18–254 days**. Simple habits (drinking water) automate in ~18 days; complex habits (50 sit-ups daily) up to 254 days. **Missing one day did not materially affect formation; missing several days in a row did.**
- **Used in app for:** the 66-day rep-count target; the "miss 1–2 days and your streak survives, miss 3+ and the counter resets" rule; phase-unlock calibration — Phase 1 simple habits = 14 days, Phase 2 moderate = 21 days, Phase 3 complex = 28 days.

### 2024 systematic review
- 20 studies, 2,600+ participants. Confirmed a median of **66 days**, range **59–335 days** for most everyday habits.
- **Source:** secondary coverage (Medium / @iamrahulrao15, 2026). *Secondary — supporting context.*

### Verplanken & Sui (2019) — habit–identity link
- **Citation:** Verplanken, B., & Sui, J. (2019). Habit and Identity: Behavioral, Cognitive, Affective, and Motivational Facets of an Integrated Self. *Frontiers in Psychology*, 10, 1504.
- **DOI:** https://doi.org/10.3389/fpsyg.2019.01504 · **PMC:** PMC6635880
- **Key findings:** Habits tied to identity show stronger automaticity; habit–identity links correlate with higher self-esteem, cognitive self-integration, and orientation toward the ideal self. When habits relate to central values they become part of the "true self."
- **Used in app for:** identity framing ("Every rep is a vote for the identity you are choosing").

---

## Implementation intentions (IF–THEN planning)

### Gollwitzer & Sheeran — meta-analysis, plus fMRI support (2022)
- **Citation:** Gollwitzer, P.M. & Sheeran, P. Implementation intentions and goal achievement: A meta-analysis of effects and processes.
- **Supporting fMRI:** bioRxiv 2022.11.13.516302 — "Can the brain strategically go on automatic pilot?"
- **Key findings:** IF–THEN plans create a strong associative link between a situational cue (S) and a response (R), similar to habits built through repetition. Implementation intentions outperform goal intentions alone across health, academic, and interpersonal domains.
- **Used in app for:** the cue field on every habit (the "IF … THEN …" prompts).

### Secondary finding — stating goals publicly
- Publicly announcing goals can backfire: social acknowledgment can satisfy the identity need without the behavior being completed. *Supporting context.*

---

## Cannabis & cognitive recovery

### Sorkhou et al. (2022)
- **Key findings:** **28 days of abstinence** produces measurable improvements in visual search speed, selective attention, and visuospatial working memory.
- **Used in app for:** Phase 3 unlock timing (day 43 = 6+ weeks past this threshold).

### Gowin et al. (2025) — large fMRI study
- **Sample:** n ≈ 1,000+.
- **Key findings:** Confirmed reduced prefrontal-cortex activation in heavy cannabis users during working-memory tasks; abstaining before cognitively demanding tasks meaningfully improves performance.
- **Used in app for:** the Phase 3 cognitive-recovery science article.

### THC & REM sleep — mechanism
- THC suppresses REM sleep architecture. Users fall asleep faster but miss slow-wave and REM restoration phases. REM is where the prefrontal cortex repairs and memories consolidate.
- **Used in app for:** the `h_noweed` habit rationale and the sleep science article.

---

## BDNF & exercise

- **Aerobic exercise → BDNF (multiple RCTs):** post-exercise BDNF and dopamine stay elevated for **2–4 hours**; 12 weeks of combined aerobic + resistance training substantially improved cognitive function and BDNF levels. → *post-workout study timing; ASVAB study-block placement.*
- **Cold exposure → norepinephrine:** cold-water exposure raises norepinephrine ~**300%** and BDNF ~**12%** acutely. → *`h_cold` rationale.*
- **Sugar → BDNF suppression:** high dietary sugar suppresses BDNF gene expression at the molecular level. → *`h_nosugar` rationale.*
- **Omega-3 DHA → BDNF:** DHA supplementation measurably raises BDNF over **8–12 weeks**. → *`h_omega` rationale and supplement stack.*

---

## Aerobic adaptation

- **Talk test / lactate threshold:** aerobic zone = can speak 3–4 words continuously while running; tempo = one word at a time; anaerobic = cannot speak. → *training-plan notes; "why you gas out" article.*
- **80/20 rule (polarized training):** 80% of sessions at easy aerobic pace builds base; 20% hard intervals builds speed. Beginners who invert this plateau or get injured within ~3 weeks. → *training-plan design and article.*
- **Mitochondrial biogenesis / capillary density / cardiac stroke volume:** all increase with consistent aerobic training over **6–8 weeks**. → *"what aerobic adaptation looks like" article.*

---

## Navy / boot camp

**Sources used:** navy.com/navy-life/boot-camp (official); navyenlisted.com (2026 guide); govfacts.org (2025); sandboxx.us; military.com (Sailor's Creed, recruit essentials); Wikipedia (Recruit Training Command Great Lakes); pcspayitforward.com (2026 guide); veteran accounts (Quora). *Mix of official and secondary sources.*

**Verified facts used in the app:**
- Boot camp: **9 weeks**, RTC Great Lakes, IL (shortened from 10 weeks as of January 2025).
- Pay begins day 1. E-1 base pay 2026: **$2,407.20/month**.
- NUC-NF composite: **AR + MK + EI + GS ≥ 252** (or VE + AR + MK + MC ≥ 252).
- NAPT backup: score **235–251** on NF composite → take the NAPT, score **50+** to qualify.
- Enlistment bonus: up to **$75,000** (NUC-NF) + **$10,000** (submarine volunteer).
- AFQT minimum: **50** to enlist.
- Memorize verbatim: **Sailor's Creed**, the **11 General Orders**, rank structure E-1 to O-10.
- Phonetic alphabet: NATO standard, uniform across branches.
- PRT events: push-ups (2 min) + curl-ups (2 min) + plank hold + 1.5-mile run.
- Male age 24 pass standards: run **13:15**, push-ups **42**, curl-ups **52**, plank **1:30**.
- Position of Attention: heels together, feet at 45°, arms straight, thumbs on trouser seams, eyes forward, chin in.
- Battle Stations 21: 12-hour final assessment on the USS Trayer simulator, Week 7.

---

## Supplement stack — evidence base

| Supplement | Dose | Evidence | Mechanism |
|---|---|---|---|
| Omega-3 DHA+EPA | 1000–2000 mg | Strong RCTs | Raises BDNF, reduces neuroinflammation; structural neuronal-membrane component |
| Creatine monohydrate | 3–5 g | Strong RCTs (Proc. Royal Society) | Improves working memory and cognitive performance; high-intensity exercise capacity |
| Magnesium glycinate | 200–400 mg | Good | Cofactor for hundreds of brain enzymatic reactions; sleep quality |
| Lion's Mane | 500–1000 mg | Moderate (8–12 weeks) | Stimulates Nerve Growth Factor; requires fruiting-body extract, not mycelium |
| Caffeine + L-Theanine | 100–200 mg + 200 mg | Best acute cognitive stack | Sustained attention, working memory; take ~90 min post-wake |
| Vitamin D3 | 2000–5000 IU | Good | Brain vitamin-D receptors throughout; deficiency linked to impaired cognition |

> **Not medical advice.** Supplement doses are recorded from the source research as
> compiled. Check with a qualified clinician before starting any supplement, especially
> before shipping to boot camp (some over-the-counter supplements are restricted).

---

*Last compiled: 2026-06-28.*
