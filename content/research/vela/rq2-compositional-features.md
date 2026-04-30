# Paper scaffold — RQ2: Compositional features predicting desire response

**Status:** Scaffold — not a submission draft  
**Source RQ:** `docs/RESEARCH-PROGRAM.md` §II — *What compositional features of figurative imagery predict desire response?*  
**Target venues (choose one primary):** *British Journal of Psychology* **or** *Frontiers in Psychology* (Perception / Perception Science track)

---

## Title (draft)

**The grammar of desire: Which compositional features of figurative images predict approach-oriented aesthetic response?**  
(Alternative: *Embodied composition over art-historical label: multilevel models of figurative viewing behavior*)

---

## Abstract

A growing literature links depicted gaze, pose, and lighting to attention and empathy in museum contexts, but rarely at **feature-level granularity** across hundreds of heterogeneous figurative stimuli paired with **multi-signal behavioral outcomes**. We merge consent-filtered `responses` with AI-assisted `visual_decompositions` (45+ structured fields per `experience_unit`) and fit **multilevel regressions**: trial-level outcomes (rating, save, log dwell) nested within participants and crossed with stimulus units. Random intercepts for users and **crossed random effects for units** (where identified) quantify stable individual and image contributions. We test whether embodied/relational features (gaze, intimacy, negative space, light quality) explain variance beyond style tier, medium, and period proxies. Complementary **SHAP** analysis on a gradient-boosted tree provides interpretable global feature rankings without replacing the inferential model. **Evidence is thin until** the active corpus accumulates sufficient per-unit response diversity (`docs/engine-room/02-instrument-validation.md`); we pre-register minimum per-unit *n* for entering decomposition interactions. If hypotheses hold, results show which compositional variables deserve causal follow-up (e.g., sequence experiments).

*Word count:* ~210

---

## Introduction — prose prompts (~400 words)

1. **Hook with embodied simulation (1 paragraph).** Freedberg & Gallese (2007) and follow-on neuroaesthetics (Chatterjee & Vartanian, 2014): why compositional grammar should matter for **approach** responses, not only recognition.

2. **Limit of prior work (1 paragraph).** Lab studies use small stimulus sets; art-historical labels confound medium with composition. Vela’s decomposition schema is **instrumental**—document its provenance (Claude vision pipeline) and the need for expert validation (tie to RQ12 / future work, not this paper’s core).

3. **Present RQ2 (1 paragraph).** State the hypothesis from the research program: embodied/relational features dominate over coarse style tags. Preview multilevel structure and SHAP as complementary lenses.

4. **Contribution (2–3 sentences).** First large-N mapping (once recruited) from fine-grained decomposition to **multi-signal** outcomes in figurative art + editorial photography jointly.

5. **Ethics (brief).** Figurative content; consent; avoid objectification language in Discussion.

---

## Hypothesis (formal)

Let $y_{ijk}$ be outcome $k$ (e.g., save, log dwell, ordinal rating) for user $i$ on unit $j$ at trial position $t$. Let $\mathbf{x}_j \in \mathbb{R}^p$ be decomposition predictors for unit $j$ (standardized), and $\mathbf{z}_j$ coarse tags (style_tier, medium).

- **H1 (dominance):** Coefficients on gaze-related, intimacy, negative space, and light-quality features jointly explain strictly greater reduction in deviance than $\mathbf{z}_j$ alone (nested model test, $\alpha = .05$, pre-register df).

- **H2 (specific direction):** Direct gaze and tight framing **increase** dwell conditional on intimacy_level controls; boundary_flag probability increases in pre-registered high-intimacy × tight-framing cells (exploratory if sparse).

- **H3 (robustness):** SHAP top-$m$ features overlap substantially with multilevel significant predictors after FDR correction within the decomposition family.

---

## Methods

### Participants and design

Same consent filter as RQ1. Trials nested in users; units crossed (multiple ratings per unit across users encouraged for generalization).

### Outcomes (level 1)

| Outcome | Source | Model family |
|---------|--------|--------------|
| `rating` | `responses.rating` | Ordinal mixed logit or continuous robust LM |
| `saved` | `responses.saved` | Mixed-effects logistic |
| `dwell_ms` | `responses.dwell_ms` | LMM on log(dwell + 1); sensitivity on Tobit/censored |

### Predictors (level 2 / unit)

From `visual_decompositions` (exact column names in DB migration + `lib/types.ts` — **refresh list at analysis time**):

- **Primary theory cluster:** `gaze` (or equivalent), `pose_type`, `light_quality`, `intimacy_level`, fields encoding negative space / framing if present.  
- **Controls:** `rendering`, `medium`, `period_reference` (if sparse, collapse categories).  
- **From `experience_units`:** `style_tier`, `primary_dimension`, optional `tags` (dimensionality reduction or hand-picked tags pre-registered).

### Multilevel model

**Recommended specification (R `lme4` / `glmmTMB`; or Stata `mixed`):**

$$
y_{ij} = \beta_0 + \mathbf{x}_j^\top \boldsymbol{\beta} + \mathbf{z}_j^\top \boldsymbol{\gamma} + u_{0i} + v_{0j} + \epsilon_{ij}
$$

- $u_{0i}$: user random intercept.  
- $v_{0j}$: unit random intercept **only if** units have sufficient repeated ratings; else unit as fixed effect cluster-robust SE (Snijders & Bosker, 2012).

**Interactions:** Pre-register at most **two** decomposition × position interactions (e.g., fatigue × intimacy) to limit multiplicity.

### SHAP complement

Train **XGBoost** or **LightGBM** on pooled trial matrix (user-level aggregates as additional columns). Use `shap` library; report **mean |SHAP|** ranking with bootstrap CI. SHAP is **descriptive**, not inferential.

### Software

Python (`pymer4` calling R), or pure R; `marginaleffects` for contrasts. Version-pin decomposition export date because `visual_decompositions` can be backfilled.

### Vela data export path (by table)

| Table | Role |
|-------|------|
| `responses` | Outcomes + `unit_id`, `user_hash`, `session_id`, timestamps |
| `visual_decompositions` | Unit-level predictors (`unit_id` FK) |
| `experience_units` | `style_tier`, `primary_dimension`, `status` |
| `profiles` | Consent gate |

Join path: `responses.unit_id` → `visual_decompositions` (1:1 per unit) → `experience_units.id`.

---

## Pre-registered analysis plan (OSF-ready)

1. **Primary model:** Mixed model for `saved` with decomposition block + controls.  
2. **Secondary:** Same for `log(dwell)`.  
3. **Multiplicity:** FDR within the decomposition coefficient family per outcome.  
4. **Missing data:** Listwise deletion vs multiple imputation for sparse decomposition fields—choose one pre-registered.  
5. **Subgroup:** Photographic (`editorial_soft`, `cinematic`) vs classical painting strata—report if cell sizes allow.

---

## Power analysis

- **Clustered data:** Maas & Hox (2005): aim for **≥50 level-2 units (users)** with **≥20 observations each** for stable random slopes; Vela Phase 1 table targets ~50 users and 1,000 responses total (`docs/RESEARCH-PROGRAM.md` §IX).  
- **Crossed random effects for stimuli:** Schielzeth & Forstmeier (2009) caution on **random slopes for stimuli** with few repeats—pre-register **minimum responses per unit** (e.g., ≥5) for unit random intercepts.  
- **Effect sizes:** For logistic mixed models, simulate power with `simr` package given pilot variance components.

**Citation:** Maas, C. J. M., & Hox, J. J. (2005). Sufficient sample sizes for multilevel modeling. *Methodology, 1*(3), 86–92.

---

## Data sources

**Internal:** As above; optionally `unit_pool_history` as time-varying confound if pool changed during data collection.

**External:** **TODO(ASN-575)** — cite normative pose/gaze perception studies from literature map. Optional: WikiArt metadata for period labels **not** used as primary predictors (avoid double-counting with decomposition).

---

## Expected figures

| # | Sketch |
|---|--------|
| F1 | **Coefficient forest plot** for decomposition block (95% CI). |
| F2 | **Predicted probability** of save across intimacy × gaze (marginal means). |
| F3 | **SHAP beeswarm** for top 15 features. |
| F4 | **Variance partition** diagram: ICC_user, ICC_unit, residual. |

---

## Limitations

- **Decomposition is AI-generated** — measurement error and drift across model versions; freeze `ANALYSIS_PROMPT_VERSION` / pipeline commit in supplement.  
- **Confounding:** Popular units get more responses; joint modeling of exposure needed for some robustness checks.  
- **Causal language:** Multilevel coefficients are associational unless paired with experimental sequence manipulations (future RQ5–7).

---

## Contribution statement

We provide a **replicable multilevel framework** linking fine-grained figurative composition features to **approach-oriented** behavioral outcomes in the wild, with explicit handling of nested observations and AI-labeled stimuli. The decomposition schema itself becomes a hypothesis list for curators and for adaptive systems that currently treat style tier as a proxy for content.

---

## References (seed list — TODO ASN-575 merge)

1. Chatterjee, A., & Vartanian, O. (2014). Neuroaesthetics. *Trends in Cognitive Sciences, 18*(7), 369–375.  
2. Freedberg, D., & Gallese, V. (2007). Motion, emotion and empathy in esthetic experience. *Trends in Cognitive Sciences, 11*(5), 197–203.  
3. Lundberg, S. M., & Lee, S.-I. (2017). A unified approach to interpreting model predictions. *NeurIPS*.  
4. Maas, C. J. M., & Hox, J. J. (2005). Sufficient sample sizes for multilevel modeling. *Methodology, 1*(3), 86–92.  
5. Schielzeth, H., & Forstmeier, W. (2009). Conclusions beyond support: Overconfident estimates in mixed models. *Behavioral Ecology, 20*(4), 416–420.  
6. Snijders, T. A. B., & Bosker, R. J. (2012). *Multilevel analysis: An introduction to basic and advanced multilevel modeling* (2nd ed.). Sage.

**TODO(ASN-575):** Add perception literature on gaze cueing, personal space in images, and museum eye-tracking.
