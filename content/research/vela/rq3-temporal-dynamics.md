# Paper scaffold — RQ3: Within-session desire trajectories and between-session stability

**Status:** Scaffold — not a submission draft  
**Source RQ:** `docs/RESEARCH-PROGRAM.md` §II — *How does desire shift within and across viewing sessions?*  
**Target venues (choose one primary):** *Cognition and Emotion* **or** *Psychology of Aesthetics, Creativity, and the Arts (PACA)*

---

## Title (draft)

**Warm-up, peak, and fatigue: Modeling aesthetic response trajectories in sequenced figurative viewing**  
(Alternative: *Within-session growth curves and the stability of desire profiles across repeated engagement*)

---

## Abstract

Aesthetic experience unfolds in time, yet most studies treat ratings as exchangeable draws. Vela presents figurative images in **editorially sequenced** orders with explicit **role** metadata (entry, build, shift, peak, release, ground), enabling tests of whether ratings and approach behaviors follow predictable **within-session trajectories** (e.g., inverted-U shaped engagement) and whether **between-session** summaries of desire-relevant dimensions stabilize like traits or fluctuate like moods. We specify **multilevel growth curve models** (linear and quadratic time) for rating and log dwell nested within sessions and users, with session-level covariates including sequence role indicators. For cross-session stability, we estimate **intraclass correlations (ICC)** on dimension scores using append-only **`user_desire_profile_versions`** rows (post-ASN-572) or, where history is absent, acknowledge limits per validation report. Pre-registered **minimum session and user counts** apply; early data may support only within-session models. Results inform pacing in contemplative interfaces and the interpretability of adaptive profiles over time.

*Word count:* ~195

---

## Introduction — prose prompts (~400 words)

1. **Temporal blind spot (1 paragraph).** Cite appraisal dynamics (Silvia, 2005) and emotion time course work: why a single rating per image misses **fatigue**, **warm-up**, and **context carried by sequence**.

2. **Vela’s natural experiment (1 paragraph).** Describe sequence roles as a designed rhythm—not fully orthogonal to content, so pre-register controls for unit difficulty (e.g., mean population rating) as level-2 covariates.

3. **Across-session stability (1 paragraph).** Connect to psychometrics: profiles as soft traits. Acknowledge **honest-N**: `docs/engine-room/02-instrument-validation.md` states test-retest was not computable until versioned profiles exist—**now** reference `user_desire_profile_versions` migration `20260424143000_asn572_replay_provenance.sql`.

4. **Contributions.** (a) Growth parameters for aesthetic ratings in the wild; (b) first ICC estimates for Vela’s eight desire dimensions once *N* permits.

5. **Ethics.** Brief consent / withdrawal framing.

---

## Hypothesis (formal)

Let $y_{ist}$ be outcome (rating or log dwell) for user $i$ in session $s$ at within-session trial index $t \in \{1,\ldots,T_{is}\}$.

- **H1 (within-session shape):** Quadratic time coefficient $\beta_{2i} < 0$ on average: concave-down trajectory (peak mid-session) after controlling for role indicators.

- **H2 (role alignment):** Indicators for **peak** role associated with higher predicted $y$ than **entry**, holding time and unit covariates fixed (ordinal contrast test).

- **H3 (between-session ICC):** For each desire dimension $d$, $\text{ICC}_d > .40$ across profile versions spaced ≥14 days apart, **if** ≥30 users contribute ≥3 snapshots each (pre-register exact window).

---

## Methods

### Data assembly

- Sort `responses` by `created_at` within (`user_hash`, `session_id`).  
- Merge `player_sessions` for session boundaries and `mode` (learning / calibrated / guided).  
- Merge **queue / role** data: if `player_session_queue` (or equivalent) is exported, attach `role` per trial; else infer role from join to `sequence_units` / engine logs—**pre-register inference path** or restrict to sessions with explicit queue export.

### Within-session growth model

**Level 1 (trials):**

$$
y_{ist} = \pi_{0is} + \pi_{1is} t_{ist} + \pi_{2is} t_{ist}^2 + \mathbf{w}_{ist}^\top \boldsymbol{\delta} + e_{ist}
$$

**Level 2 (sessions):** $\pi_{0is} = \theta_{00} + u_{0is}$, etc., with optional **level 3 (users)**.

**Alternative:** Piecewise linear splines at trial quantiles if quadratic misfits.

**Software:** R `lme4`, `nlme`, or Bayesian `brms` for full posterior on random curvature.

### Between-session stability

1. Pull `user_desire_profile_versions` (columns per migration: `user_id` hashed in export, `profile_version`, `dimension_scores` JSONB, `created_at`).  
2. Reshape to long format by dimension.  
3. Estimate ICC(1,1) or two-way random effects ANOVA for each dimension (Shrout & Fleiss, 1979) with time between observations as covariate sensitivity.

### Vela data export path (by table)

| Table | Use |
|-------|-----|
| `responses` | Trial-level outcomes, timestamps, `session_id` |
| `player_sessions` | Session duration, `mode`, user link |
| `user_desire_profile_versions` | **Primary** for longitudinal profile ICC |
| `user_desire_profiles` | Latest snapshot fallback / join key |
| `player_session_queue` | Role per position (if present in export pipeline — **verify** `export-dataset.ts` selects) |

If queue is not yet exported, add a **scoped engineering task** before analysis freeze; note in Limitations.

---

## Pre-registered analysis plan (OSF-ready)

1. **Primary:** Random intercept + random linear time + fixed quadratic (population).  
2. **Secondary:** Same model with **role** indicators instead of raw time (compare AIC).  
3. **Tertiary:** ICC per dimension with pre-registered exclusion of users with <3 snapshots.  
4. **Sensitivity:** Exclude first session per user (novelty); exclude sessions <8 trials.

---

## Power analysis

- **Growth models:** Singer & Willett (2003) recommend **≥50 persons** with **≥5 waves** for individual growth variance; analog for **≥5 trials per session** across **≥200 sessions** for random curvature stability (simulation-based—use `simr`).  
- **ICC:** Nicewander (1991) and Adachi & Willoughby (2015) on sample size for reliability of ICC; target **≥100 profile snapshots** across ≥30 users for rough stability.

**Citation:** Singer, J. D., & Willett, J. B. (2003). *Applied longitudinal data analysis: Modeling change and event occurrence*. Oxford University Press.

---

## Data sources

**Internal:** As above; `reincarnation_instrumentation` optional for engine provenance when correlating profile updates to batch runs.

**External:** **TODO(ASN-575)** — cite emotion dynamics and aesthetic chills time-course literature.

---

## Expected figures

| # | Sketch |
|---|--------|
| F1 | **Spaghetti + mean growth curve** for z-scored rating vs trial index. |
| F2 | **Marginal means** by sequence role (entry…peak…). |
| F3 | **ICC bar chart** across eight dimensions with 95% CI (bootstrap). |
| F4 | **Profile version timeline** for exemplar users (anonymized IDs). |

---

## Limitations

- **Sequence confound:** Role correlates with image difficulty; include unit-level random intercept or fe.  
- **Sparse history:** Early cohort may force **within-session only** paper; do not overclaim stability.  
- **Mode changes:** `player_sessions.mode` transitions complicate pooling—stratify or model as covariate.

---

## Contribution statement

We articulate **time** as a first-class variable in digital aesthetic response, linking sequenced presentation roles to measurable trajectories and, when data allow, quantifying **how stable** algorithmically inferred desire profiles are across weeks. That stability boundary matters for both science (trait-like constructs) and product ethics (profiles that drift without user awareness).

---

## References (seed list — TODO ASN-575)

1. Adachi, T., & Willoughby, T. (2015). Interpreting parameter estimates from growth curve models. *International Journal of Behavioral Development, 39*(2), 101–114.  
2. Silvia, P. J. (2005). Emotional responses to art: From collation and arousal to cognition and emotion. *Review of General Psychology, 9*(4), 342–357.  
3. Singer, J. D., & Willett, J. B. (2003). *Applied longitudinal data analysis*. Oxford University Press.  
4. Shrout, P. E., & Fleiss, J. L. (1979). Intraclass correlations: Uses in assessing rater reliability. *Psychological Bulletin, 86*(2), 420–428.
5. Leder, H., Belke, B., Oeberst, A., & Augustin, D. (2004). A model of aesthetic appreciation and aesthetic judgments. *British Journal of Psychology, 95*(4), 489–508.
6. Smith, J. K., & Smith, L. F. (2001). Spending time on art. *Empirical Studies of the Arts, 19*(2), 229–236. *(museum dwell-time baseline)*
7. Nicewander, W. A. (1991). *Sample size requirements for reliability coefficients.* — cited in prose for ICC planning; confirm primary source at analysis freeze.

**TODO(ASN-575):** Add citations on fatigue in aesthetic judgment, aesthetic chills time-course, and recommender “sessionization.”
