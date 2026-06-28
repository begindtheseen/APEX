# APEX — Supporting Research

This document is the evidence base behind APEX. Every science claim, threshold,
Navy fact, and supplement note used in the app is recorded here with its source
and a confidence grade, so user-facing wording can be matched to evidence
strength.

---

## Research quality rules

APEX separates evidence into four confidence levels:

- **Grade A — Official / primary operational source.** Navy.com, MyNavyHR, DFAS,
  DoD, OPSS, official Navy recruiting documents, peer-reviewed meta-analyses, or
  full peer-reviewed papers.
- **Grade B — Peer-reviewed single study.** Useful for rationale, but app
  language must avoid overclaiming or implying certainty.
- **Grade C — Secondary educational source.** Supporting context only. Cannot
  drive app thresholds, eligibility claims, pay claims, medical claims, or Navy
  readiness claims.
- **Grade D — Community / anecdotal source.** User-experience color only. Cannot
  be used as a factual source for app logic.

### App wording rule

Any user-facing claim must be written according to evidence strength:

- **Grade A:** "The Navy requires…" / "DFAS lists…" / "A meta-analysis found…"
- **Grade B:** "This study suggests…" / "was associated with…" / "may improve…"
- **Grade C:** "Reported by secondary coverage…" / "supporting context only"
- **Grade D:** "Anecdotal reports suggest…" / "not used for app logic"

**Claims that affect eligibility, Navy standards, pay, supplements, drug testing,
boot-camp expectations, or health outcomes must be Grade A or Grade B.**

---

## User-facing medical / military disclaimer

APEX is a preparation and education app. It does **not** provide medical advice,
legal advice, recruiting guarantees, enlistment eligibility decisions, or
official Navy determinations.

For Navy eligibility, bonuses, rating availability, medical waivers, drug-testing
policy, and ship-date requirements, users must confirm with an official Navy
recruiter or official Navy source.

For supplements, medications, cannabis cessation, mental health, injury recovery,
and sleep issues, users should consult a qualified clinician and check OPSS / DoD
guidance where applicable.

*(This disclaimer is surfaced in-app on the Science tab and during onboarding.)*

---

## Habit formation

### Lally et al. (2010) — the seminal real-world study
- **Citation:** Lally, P., van Jaarsveld, C.H.M., Potts, H.W.W., & Wardle, J. (2010). How are habits formed: Modelling habit formation in the real world. *European Journal of Social Psychology*, 40(6), 998–1009.
- **DOI:** https://doi.org/10.1002/ejsp.674
- **Evidence grade:** B (single study, foundational).
- **Key findings:** 96 participants. Time-to-automaticity averaged ~66 days but ranged widely (≈18 to 254 days). Missing a single day did not meaningfully reduce eventual automaticity.
- **Used in app for:** the rep-count target; the "miss 1–2 days and your streak survives" rule.
- **Safe wording:** "Habits don't form in 21 days — most take roughly two months, with large individual variation." **Avoid:** "exactly 66 days," "permanent after 66 days," "missing a day never matters."

### Singh et al. (2024) — systematic review and meta-analysis  *(replaces the prior "2024 systematic review" entry)*
- **Citation:** Singh, B. et al. (2024). Time to Form a Habit: A Systematic Review and Meta-Analysis of Health Behaviour Habit Formation and Its Determinants.
- **Source:** PubMed Central — peer-reviewed systematic review.
- **URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC11641623/
- **Evidence grade:** A (for habit-formation timing).
- **Key findings:** Across 20 studies and 2,600+ participants, time-to-habit-formation varied substantially. Median timelines were commonly around **59–66 days**, mean timelines were longer, and some habits took up to **335 days**.
- **Product use:** supports the 66-day "identity lock-in" target; supports warning users that habit formation is **not** a 21-day process; supports forgiving short misses instead of treating one missed day as total failure.
- **Safe wording:** "Most habits do not become automatic in 21 days. A systematic review found median habit-formation timelines around two months, with large variation by person and behavior." **Avoid:** "Habits take exactly 66 days," "After 66 days the habit is permanent," "Missing one day never matters."

### Verplanken & Sui (2019) — habit–identity link
- **Citation:** Verplanken, B., & Sui, J. (2019). Habit and Identity. *Frontiers in Psychology*, 10, 1504. **PMC:** PMC6635880.
- **Evidence grade:** B.
- **Key findings:** Habits tied to identity show stronger automaticity and associate with higher self-esteem and cognitive self-integration.
- **Used in app for:** identity framing. **Safe wording:** "habits tied to identity *may* be more durable."

---

## Implementation intentions (IF–THEN planning)

- **Citation:** Gollwitzer, P.M. & Sheeran, P. — meta-analysis of implementation intentions and goal achievement; supporting fMRI: bioRxiv 2022.11.13.516302.
- **Evidence grade:** A (meta-analysis) / B (fMRI).
- **Key findings:** IF–THEN plans create a strong cue→response association and outperform goal intentions alone across domains.
- **Used in app for:** the cue field on every habit. **Safe wording:** "Planning a specific cue *has been shown to* improve follow-through."

---

## Cannabis & cognitive recovery  *(replaced — graded and re-worded)*

### Sorkhou et al. (2022)
- **Citation:** Sorkhou, M. et al. (2022). Effects of 28 days of cannabis abstinence on cognition in major depressive disorder: A pilot study.
- **Source:** PubMed — peer-reviewed pilot study. **URL:** https://pubmed.ncbi.nlm.nih.gov/35690891/
- **Evidence grade:** B.
- **Key finding:** In participants with major depressive disorder and comorbid cannabis use disorder, 28 days of abstinence **may** improve select cognitive domains.
- **Product use:** supports the idea that cognitive recovery *can begin* within the first month of abstinence; supports Phase 3 messaging **with cautious language only.**
- **Safe wording:** "Some studies suggest attention and working-memory measures *may* improve after several weeks of cannabis abstinence, especially in people with cannabis use disorder." **Avoid:** "28 days fully restores your brain," "Everyone's cognition improves after 28 days," "Cannabis damage is reversed in a month."

### Gowin et al. (2025)
- **Citation:** Gowin, J.L. et al. (2025). Brain Function Outcomes of Recent and Lifetime Cannabis Use.
- **Source:** PubMed Central / JAMA Network Open. **URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC11775743/
- **Evidence grade:** B.
- **Key finding:** Heavy lifetime and recent cannabis use were **associated with** lower brain activation during working-memory tasks in young adults.
- **Product use:** supports the Phase 3 "working memory / focus recovery" article; supports abstinence before ASVAB study blocks.
- **Safe wording:** "Heavy or recent cannabis use *has been associated with* lower brain activation during working-memory tasks." **Avoid:** "Cannabis permanently lowers intelligence," "causes brain damage in every user," "this study proves quitting immediately restores performance."

> **REM / sleep wording:** state as "Cannabis use *has been associated with* reduced REM sleep," not "cannabis chronically suppresses REM." (Grade B.)

---

## BDNF, exercise, cold exposure  (rationale only)

- Aerobic exercise is **associated with** acute increases in BDNF (single studies / small trials). **Grade B.** Wording: "exercise *may* elevate BDNF for a few hours," not "BDNF peaks for exactly 2–4 hours in everyone."
- Cold exposure raising norepinephrine and sugar/omega-3 effects on BDNF are **Grade B** mechanistic findings — use "*may*," "*has been associated with*." Do **not** present as guaranteed outcomes or medical advice.

---

## Aerobic adaptation

- Talk test, 80/20 polarized training, and adaptation timelines (mitochondrial biogenesis, capillary density, stroke volume over ~6–8 weeks) are **Grade B** exercise-physiology rationale. Wording: "tends to," "over several weeks," not fixed guarantees.

---

## Navy / boot camp  *(replaced — official-source priority)*

### Source priority
Navy facts in APEX must come from official sources first:
1. Navy.com  2. MyNavyHR  3. DFAS  4. DoD / OPSS  5. Official Navy recruiting documents  6. Secondary military sites only when official sources are unavailable.

### Verified facts used in the app
- **Boot camp location:** Recruit Training Command, Great Lakes, Illinois. *(Grade A.)*
- **Boot camp length:** Navy.com currently describes Navy boot camp as **9 weeks**. *(Grade A.)*
- Boot camp includes medical, dental, fitness screening, vaccinations, haircut/uniform issue, swim testing, classroom instruction, inspections, physical training, weapons/firefighting training, the official PFA, Battle Stations, and graduation.
- **Pre-basic physical requirements (Navy.com), male age 20–24:** push-ups **42** in two minutes · plank **2 × 30 sec** · 1.5-mile run **13:15**. *(Grade A.)*
- **Pre-basic physical requirements (Navy.com), female age 20–24:** push-ups **17** in two minutes · plank **2 × 30 sec** · 1.5-mile run **15:15**. *(Grade A.)*
- **Current Navy PRT events:** push-ups, **forearm plank**, and a cardiorespiratory event (standard 1.5-mile run/walk or authorized alternate cardio — treadmill, 500-yd swim, stationary cycle, or a 2,000 m row). Sequence: push-ups → forearm plank → cardio. *(Grade A — MyNavyHR Guide-5A.)*
- **Curl-ups are NOT a current Navy PRT event.** Forearm planks **replaced curl-ups via NAVADMIN 225/20 (Nov 2020), effective 2021.** Do not list curl-ups as a PRT event except when explicitly describing historical standards. *(Corrected in-app: curl-ups removed from PRT standards, logging, and the physical-readiness score. Note: several secondary sites still list the old curl-up standard — another reason to trust official sources first.)*
- **Forearm plank scoring** is age/sex table-based (single max hold): for male 20–24, roughly ~1:00 minimum "satisfactory" up to ~3:20 "outstanding." The app uses a 1:30 target as a practical "good" hold and labels it a target, not a guaranteed pass line. *(Navy.com also lists a pre-basic DEP screen of "plank 2 × 30 sec.")*
- **2026 update:** the Navy is moving to **two PFAs per year** and has authorized a **2,000 m rowing** cardio event in addition to the run/swim/bike options (Stars and Stripes, Dec 2025; NAVADMIN guidance). The app's "cardio event" framing already covers this; re-verify exact rowing/plank tables against MyNavyHR before relying on specific times.
- **Pay:** begins after accession / active-duty processing — word first-pay timing carefully. DFAS 2026 enlisted base pay (3.8% raise effective Jan 1, 2026): **E-1 under 4 months active duty ≈ $2,225.70/month**, **E-1 after 4 months $2,407.20/month**. *(Grade A — DFAS; verified 2026-06-28. Do not say "$2,407.20 on day one.")*
- **Nuclear-field qualification numbers:** the commonly cited gates are **NF composite ≥ 252** (AR+MK+EI+GS, or VE+AR+MK+MC; with AR+MK ≥ 110) and **AFQT ≥ 50**; those scoring 235–251 may pursue the **NAPT** path. Show as **recruiter-verification-required** — the app uses 252 / 50 as practice-score *targets* and labels them "confirm with your recruiter." *(Verified 2026-06-28 against Navy recruiting/NAPT references.)*
- **Enlistment bonuses** must be labeled **"up to"** and **"subject to eligibility, contract, rating, ship date, and current Navy policy."**

### Product wording
**Use:** "According to Navy.com…," "DFAS lists…," "Current Navy PRT guidance uses push-ups, forearm plank, and cardio," "Confirm with your recruiter — standards, bonuses, and rating availability can change."
**Avoid:** "Guaranteed bonus," "Guaranteed Nuke eligibility," "You will make $2,407.20 immediately on day one," "Curl-ups are part of the current PRT."

---

## Supplement stack — evidence base and military safety rules

APEX may discuss supplements as educational context but must **not** function as a
medical advisor or boot-camp supplement recommender.

### Required safety rules
- DoD supplement safety source: **Operation Supplement Safety (OPSS)** — the DoD
  dietary-supplement and substance program. **DoD Instruction 6130.06** formalizes
  OPSS and establishes a Prohibited Dietary Supplement Ingredients List.
- Service members may **not** use products containing ingredients on that list.
- Before APEX displays any supplement, it should tell users to: (1) check the DoD
  Prohibited List; (2) use the OPSS Scorecard; (3) prefer third-party certified
  products; (4) ask a recruiter, military medical provider, or OPSS "Ask the
  Expert" before shipping; (5) stop bringing/taking supplements to boot camp
  unless specifically allowed.

### Supplement evidence table
| Supplement | Evidence status | Product stance | Safe wording |
|---|---|---|---|
| Omega-3 DHA/EPA | Moderate–strong (general health); claim-specific evidence required | Educational only | "May support general brain and cardiovascular health; verify product safety through OPSS." |
| Creatine monohydrate | Strong (high-intensity performance); moderate emerging (cognition) | Educational only | "May support repeated high-intensity output; hydration and product safety matter." |
| Magnesium glycinate | Moderate (deficiency / sleep support) | Educational only | "May help if intake/status is low; not a substitute for a sleep routine." |
| Lion's Mane | Limited / moderate | Avoid as core recommendation | "Evidence is still developing; not required for APEX." |
| Caffeine + L-Theanine | Good acute attention evidence | Optional education only | "Can improve alertness short-term, but timing and sleep protection matter." |
| Vitamin D3 | Good if deficient; not universal | Recommend testing / clinician guidance | "Most useful when deficiency is present." |

### Product rule
APEX must not sell supplements, rank supplement brands, or imply supplements are
necessary for Navy readiness. **Training, sleep, nutrition, hydration, abstinence
from disqualifying substances, and consistent study blocks are the core plan.**
Supplements are optional, secondary, and safety-gated.

**Use:** "Supplements are optional. Navy readiness is built on training, sleep,
food, hydration, discipline, and clean testing." / "Before using any supplement,
check OPSS and the DoD Prohibited List." / "Do not bring supplements to boot camp
unless your recruiter or official RTC guidance says they are allowed."
**Avoid:** "This stack will make you pass," "Boot-camp safe," "Guaranteed clean,"
"Navy-approved supplement," "Required for cognitive recovery."

---

## Claim audit checklist

Before any APEX claim goes into the app, verify:
- What is the exact claim?
- Is it user-facing or internal-only?
- Does it affect Navy eligibility, pay, PRT, supplements, health, or drug testing?
- What source supports it?
- Is the source official, peer-reviewed, secondary, or anecdotal?
- What is the evidence grade?
- What safe wording should the app use?
- What wording should the app avoid?
- Where is this claim used in the app?
- When was it last verified?

**Required format:**
`Claim → Source → Evidence grade → Used in app where → Safe wording → Last verified date`

### Logged claim audits (this revision)
| Claim | Source | Grade | Used where | Safe wording | Last verified |
|---|---|---|---|---|---|
| Habit automaticity ≈ 2 months, not 21 days | Singh 2024 / Lally 2010 | A / B | Onboarding, day-66 note, rep toasts | "median around two months, large variation" | 2026-06-28 |
| Cannabis abstinence may aid cognition | Sorkhou 2022 | B | Phase-3 science | "may improve … especially in CUD" | 2026-06-28 |
| Cannabis associated with lower working-memory activation | Gowin 2025 | B | Phase-3 science | "has been associated with" | 2026-06-28 |
| Push-ups 42 / run 13:15 pass (male 20–24) | Navy.com | A | PRT standards, physical readiness | "According to Navy.com…" | 2026-06-28 |
| Curl-ups are a PRT event | — (outdated) | — | REMOVED from current PRT | n/a — historical only | 2026-06-28 |
| Current PRT = push-ups, forearm plank, cardio | Navy.com | A | PRT tab, Train standards | "Current Navy PRT guidance uses…" | 2026-06-28 |
| NF composite ≥ 252 / AFQT ≥ 50 | Commonly cited; recruiter-verify | recruiter-verify | ASVAB science, practice-score targets | "commonly cited; confirm with recruiter" | 2026-06-28 |
| Enlistment bonus up to $75k | Navy recruiting (varies) | recruiter-verify | Onboarding, Phase-4 science | "up to … subject to eligibility/contract/rating/ship date/policy" | 2026-06-28 |
| E-1 base pay 2026 | DFAS | A | (research only) | "$2,225.70 under 4 mo / $2,407.20 after; not day-one" | 2026-06-28 |

---

## Source-verification log

**Verified 2026-06-28** (web search against official/authoritative sources):

| Claim | Result | Source(s) |
|---|---|---|
| Current PRT = push-ups, forearm plank, cardio | **Confirmed** | MyNavyHR Guide-5A; Military.com |
| Curl-ups removed, replaced by forearm plank | **Confirmed** — NAVADMIN 225/20 (Nov 2020), eff. 2021 | Military.com "Goodbye Curl-Ups" (2020) |
| E-1 base pay 2026: ~$2,225.70 (<4 mo) / $2,407.20 (4 mo+) | **Confirmed** (3.8% raise eff. Jan 1, 2026) | DFAS 2026 pay tables; Military.com |
| Push-ups 42 / 1.5-mi run 13:15 (male 20–24) | **Confirmed** | Navy fitness standards references |
| AFQT ≥ 50; NF composite ≥ 252 (AR+MK ≥ 110); NAPT 235–251 | **Confirmed** as commonly-cited gates (recruiter-verify) | Navy ASVAB/NAPT references |
| Forearm plank: ~1:00 satisfactory → ~3:20 outstanding (M20–24) | **Confirmed** as table-based; app's 1:30 = practical target | navy-prt.com; Sogevity |
| 2026: twice-yearly PFA + 2,000 m rowing cardio option | **Noted** (new) — re-verify exact tables before relying | Stars and Stripes (Dec 2025) |

Caveat: some figures were confirmed via authoritative secondary aggregators rather than a direct Navy.com / MyNavyHR page fetch (those weren't reachable from this environment). Treat Navy.com, MyNavyHR, and DFAS as the final word and re-confirm exact tables, bonuses, and rating availability with a recruiter before each release.

---

*Last compiled & verified: 2026-06-28. Re-verify Navy standards, pay, and bonus figures against official sources before each release.*
