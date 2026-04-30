# Paper scaffold — RQ1: Latent profiles of aesthetic desire vs preference / liking

**Status:** Scaffold — not a submission draft  
**Source RQ:** `docs/RESEARCH-PROGRAM.md` §II — *Can aesthetic desire be reliably distinguished from preference and liking in behavioral data?*  
**Target venues (choose one primary):** *Empirical Studies of the Arts* **or** *Psychology of Aesthetics, Creativity, and the Arts (PACA)*

---

## Title (draft)

**Beyond liking: latent profiles of aesthetic response in figurative art viewing**  
(Alternative: *Separating appetitive engagement from hedonic evaluation in a multi-signal aesthetic task*)

---

## Abstract (placeholder statistical language acceptable)

Empirical aesthetics often collapses aesthetic experience into a single hedonic dimension—typically liking or preference judgments. Contemplative and museum-adjacent platforms, however, afford richer signals: saves, dwell time, boundary flags, and repeated engagement with stylistically related content. We ask whether these signals support a **latent profile** structure in which one class of responses reflects **desire** (forward-leaning, approach-oriented engagement) and another reflects **preference or liking** (positive evaluation without sustained approach). Using consent-filtered behavioral data from Vela (`responses` joined to `player_sessions` and `experience_units`), we fit latent profile analysis (LPA) on a multivariate feature space including rating, save, dwell, boundary flag, optional emotion tags, intensity, and proxies for “return to similar” content. We compare two- through four-class solutions using information criteria and bootstrap likelihood ratio tests, and validate emergent profiles against session length and return rate. **As of the instrument-validation baseline, the corpus is underpowered for stable class enumeration**; we therefore pre-register minimum *N* thresholds below which we report only exploratory fits. If classes replicate at scale, results support treating aesthetic desire as statistically separable from liking—implications for how digital cultural platforms instrument user engagement.

*Word count:* ~230

---

## Introduction — prose prompts (~400 words of *guidance*, not final copy)

1. **Opening problem (1 paragraph).** Write for a reader who accepts that people “like” art but is skeptical that platforms can measure anything finer. Argue that single-item liking scales lose the distinction between *evaluating* an image as good and *being pulled* by it—link to appraisal theories of aesthetic emotion vs motivational accounts of beauty (Armstrong & Detweiler-Bedell, 2008; Menninghaus et al., 2019).

2. **Gap (1 paragraph).** Laboratory studies of aesthetic preference rarely combine Pass/Resonates-style binary approach with continuous ratings, saves, and dwell in one instrument. HCI and recommender literature log clicks but rarely interpret them as aesthetic constructs. Position Vela as a **field instrument**: ecologically valid stimulus diversity (curated figurative corpus) with explicit consent for research export.

3. **RQ and contribution preview (1 short paragraph).** State RQ1 plainly: latent structure, not just regression on a composite. Preview that **construct validity** hinges on whether profiles predict external session behaviors (duration, return) in theoretically aligned directions.

4. **Ethical frame (2–3 sentences).** Figurative bodies; avoid sexualizing framing; anonymized exports; IRB as applicable. Cite your institution’s determination—do not assert exemption without documentation.

5. **Roadmap sentence.** “Section 2 formalizes hypotheses; Section 3 specifies methods…,” matching the headings below.

---

## Hypothesis (formal)

Let $\mathbf{y}_{ij}$ denote the multivariate response vector for participant $i$ on trial $j$ (rating, save, dwell, boundary, emotion-derived features, etc.). Let $C \in \{1,\ldots,K\}$ be latent class membership for trial or participant (analyst must pre-register **trial-level vs person-centered aggregation**—see Methods).

- **H1 (separability):** For $K \geq 3$, the finite mixture model exhibits better fit than $K=2$ and yields at least one class whose centroid is high on **approach-correlated** indicators (save, long dwell, Resonates) without requiring uniformly high liking; and at least one class high on **liking** (rating) with low approach indicators.

- **H2 (criterion validity):** Conditional on covariates, membership (or class-weighted posterior probability) in the “desire-like” class positively predicts **session length** and **return within 7 days**, relative to the “liking-only” class.

- **H3 (null for underpowered runs):** If total consented responses $N_r$ falls below the pre-registered floor, no formal claim of $K>1$ is made; exploratory plots only.

---

## Methods

### Design and participants

Observational cohort from Vela users who enabled research consent. Exclusions: sessions in the partner-prep exclusion set per math spec (`S_excl`); incomplete rows on mandatory fields for the chosen LPA specification.

### Variables (LPA indicators)

Operationalize from `responses` (and joins):

| Construct | Fields (Supabase) | Notes |
|-----------|-------------------|--------|
| Hedonic evaluation | `rating` (1–5) | Treat as ordinal or robust-normalized for mixture software |
| Approach / desire | `saved` (bool), `dwell_ms` | Log-transform dwell; winsorize tails |
| Discomfort / rejection | `boundary_flag` | Rare events—sensitivity analysis without this indicator |
| Affect granularity | `emotions` (JSON array), `intensity` | Derive count of distinct emotions, max intensity |
| Return / similarity | *Derived* | Requires sequence graph or tags—pre-register exact construction (e.g., next-trial same `primary_dimension` within 10 trials) |

Join `experience_units` for `style_tier`, `primary_dimension` as **covariates** (not LPA indicators) unless theory demands.

### Statistical plan

1. **Aggregation level (choose and pre-register one).**  
   - *Trial-level LPA:* large $N$, but non-independence within users → use **mixture model with random effects** or sandwich SEs for validation regressions.  
   - *Person-level LPA:* aggregate to means per user across sessions; smaller $N$ but cleaner independence for classic LPA.

2. **Estimation:** Gaussian mixture for continuous indicators; or **mixture item response** if treating rating ordinally. Software: **Mplus** (gold standard for LPA fit indices), **R tidyLPA** (`tidyLPA` + `mclust`), or **Stan** finite mixture for full Bayesian uncertainty.

3. **Model selection:** Compare $K=2,3,4$ using BIC, aBIC, entropy; **BLRT** bootstrap likelihood ratio test (Nylund, Asparouhov, & Muthén, 2007). Pre-register a **maximum K** to avoid over-extraction.

4. **Validation (auxiliary regressions):** Multilevel or robust GLM: session outcomes ~ posterior class probability + covariates.

5. **Sensitivity:** Drop dwell if measurement quality varies by device; drop saves if UI placement changes across app versions (document `git` release tag per export).

### Software and reproducibility

- Export: `scripts/research/export-dataset.ts` → `research/data/v{NNN}/responses.csv`, `player_sessions.csv`, `profiles.csv` (consent flags).  
- Analysis: R or Python notebook pinned in repo under `research/notebooks/rq1/` (create when analysis begins).  
- Record `REINCARNATION_ENGINE_VERSION` and export git SHA in the OSF wiki.

### Vela data export path (by table)

| Table | Export file | Key columns for RQ1 |
|-------|-------------|---------------------|
| `profiles` | `profiles.csv` | `research_consent`, timestamps |
| `responses` | `responses.csv` | `user_hash`, `session_id`, `unit_id`, `rating`, `saved`, `dwell_ms`, `boundary_flag`, `emotions`, `intensity`, `created_at` |
| `player_sessions` | `player_sessions.csv` | `id`, `user_hash`, `mode`, start/end times, `response_count` |
| `experience_units` | `experience_units.csv` (if exported) | `style_tier`, `primary_dimension` |

Exact column names: verify against `docs/RESEARCH-SCAFFOLD.md` after each export script revision.

---

## Pre-registered analysis plan (OSF-ready structure)

1. **Study design:** Observational; secondary use of behavioral data.  
2. **Primary endpoint:** Improvement in BIC from $K=2$ to best $K \leq 4$ **and** entropy $> .70$ for the selected model (adjust thresholds to venue norms).  
3. **Secondary endpoints:** Regression coefficients in H2.  
4. **Stopping rules / data freezes:** First freeze after ≥1,000 consented responses (see Power); second freeze 6 months later for stability check.  
5. **Blinding:** N/A for secondary data; analysts blind to future UI releases when re-running.  
6. **Deviations:** Any post-hoc change to indicator set logged on OSF with date.

---

## Power analysis — explicit *N* requirement + citation

LPA stability depends more on **effective sample** and separation than on raw row count. Conservative planning:

- **Person-level LPA:** Use rules of thumb for mixture models: **≥200–500 individuals** for complex models (see simulation literature cited in Nylund et al., 2007). For Vela’s early cohort, **person-level** LPA may be infeasible—pre-register **trial-level** mixtures with multilevel correction instead.

- **Trial-level:** Target **≥1,000 responses** across **≥50 consented users** (aligns with `docs/RESEARCH-PROGRAM.md` §IX Phase 1). Cite **Maas & Hox (2005)** for multilevel inference with modest level-2 *N* when validating H2.

- **Split-half / replication:** Hold out 20% of users for profile assignment stability (pre-register).

**Citation:** Nylund, K. L., Asparouhov, T., & Muthén, B. O. (2007). Deciding on the number of classes in latent class analysis and growth mixture modeling: A Monte Carlo simulation study. *Structural Equation Modeling, 14*(4), 535–569.

---

## Data sources (internal + external)

**Internal:** `responses`, `player_sessions`, `profiles`, `experience_units`; optional `sequence_units` / queue logs if “return to similar” is defined via sequence engine.

**External validation (optional extension):** OASIS or institution-licensed IAPS norms for valence/arousal on a **small lab subsample** matched to Vela units—*not* required for first submission; note as Phase 1b. Cross-reference **ASN-575 literature map** for normed image sets.

---

## Expected figures

| # | Sketch |
|---|--------|
| F1 | **Scree / information criteria** plot: BIC vs *K* for $K=1\ldots 4$. |
| F2 | **Profile plot:** class-conditional means on z-scored indicators (rating, log dwell, save rate, …). |
| F3 | **Sankey** or alluvial: posterior class probabilities → session length bins. |
| F4 | **ROC-style** discrimination: can a simple linear score (rating only) predict session outcomes vs mixture-based score? |

---

## Limitations (honest)

- **Confounding:** High dwell may reflect UI friction, not desire—control for app version and device class.  
- **Selection:** Consented users are not representative of all Vela users.  
- **Construct overlap:** Rating and save may correlate so strongly that mixtures collapse—report correlation matrix prominently.  
- **Thin baseline *N*:** As documented in `docs/engine-room/02-instrument-validation.md`, early exports cannot support strong claims; the paper’s contribution may initially be **methods + pre-registration** until recruitment completes.

---

## Contribution statement (one paragraph)

This work contributes a **multi-signal operationalization** of aesthetic desire in a digital figurative-art context and tests whether that operationalization exhibits **latent structure** distinguishable from liking-only patterns. If supported, it gives empirical aesthetics and HCI a vocabulary for platform metrics beyond “high rating,” with direct implications for consent text and for algorithms that might otherwise misread approach motivation as generic engagement.

---

## References (seed list — consolidate with ASN-575)

1. Armstrong, T., & Detweiler-Bedell, B. (2008). Beauty as an emotion: The exhilarating prospect of mastering a challenging world. *Review of General Psychology, 12*(4), 305–329.  
2. Berlyne, D. E. (1971). *Aesthetics and psychobiology*. Appleton-Century-Crofts.  
3. Chatterjee, A., & Vartanian, O. (2014). Neuroaesthetics. *Trends in Cognitive Sciences, 18*(7), 369–375.  
4. Maas, C. J. M., & Hox, J. J. (2005). Sufficient sample sizes for multilevel modeling. *Methodology, 1*(3), 86–92.  
5. Menninghaus, W., Wagner, V., Hanich, J., Wassiliwizky, E., Jacobsen, T., & Koelsch, S. (2019). What are aesthetic emotions? *Psychological Review, 126*(2), 171–202.  
6. Nylund, K. L., Asparouhov, T., & Muthén, B. O. (2007). Deciding on the number of classes in latent class analysis and growth mixture modeling. *Structural Equation Modeling, 14*(4), 535–569.  
7. Silvia, P. J. (2005). Emotional responses to art: From collation and arousal to cognition and emotion. *Review of General Psychology, 9*(4), 342–357.  
8. Vessel, E. A., Starr, G. G., & Rubin, N. (2012). The brain on art: Intense aesthetic experience activates the default mode network. *Frontiers in Human Neuroscience, 6*, 66.

**TODO(ASN-575):** Merge in literature-map references on aesthetic emotion taxonomies, liking vs interest, and digital museum studies.
