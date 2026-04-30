# Paper scaffold — RQ4: Individual differences in desire profile structure

**Status:** Scaffold — not a submission draft  
**Source RQ:** `docs/RESEARCH-PROGRAM.md` §II — *What individual differences predict desire profile structure?*  
**Target venues (choose one primary):** *Personality and Individual Differences* **or** *Empirical Studies of the Arts*

---

## Title (draft)

**Viewer types in figurative aesthetics: Factor structure and behavioral correlates of multidimensional desire profiles**  
(Alternative: *Eight dimensions, how many people? Clustering aesthetic response in a behavioral corpus*)

---

## Abstract

Psychometric approaches to aesthetic taste often rely on self-report inventories; Vela instead induces **implicit multidimensional profiles** from Pass/Resonates, ratings, saves, and related signals mapped into eight desire dimensions (softness, intensity, narrative, structure, texture, abstraction, classical, contemporary). We ask how many latent **factors** explain covariance among these dimensions across users, whether **finite mixture (cluster) models** recover interpretable viewer types, and whether **behavioral session features**—exploration breadth, rating variance, boundary rate, session frequency, mode progression—predict cluster membership better than demographic placeholders (which Vela largely does not collect). Analyses use consent-filtered exports of `user_desire_profiles` and, for temporal sensitivity, `user_desire_profile_versions`. **Construct validity and factor retention cannot be responsibly claimed** until the eligible-user count exceeds thresholds in `docs/engine-room/02-instrument-validation.md` (spec §4.3 cites denominator 20 per dimension). We pre-register parallel analysis for **snapshot-only** vs **most-recent-version-only** profiles. Successful replication would yield a data-driven taxonomy of figurative “desire types” for theory and for cold-start personalization.

*Word count:* ~215

---

## Introduction — prose prompts (~400 words)

1. **Individual differences without Likert blocks (1 paragraph).** Contrast traditional aesthetic sensitivity inventories with **behaviorally inferred** profiles; cite Rentfrow & Gosling-style work only as analogy—be clear Vela is **not** using BFI.

2. **Eight dimensions (1 paragraph).** Summarize their origin (`docs/engine-room/01-math-spec.md`, `REINCARNATION_CONFIG`): these are **system constructs**, not user-facing labels—Discuss limitations honestly.

3. **Research questions (1 paragraph).** EFA → factor retention; cluster on factor scores or raw dimensions (pre-register); multinomial or latent class regression predicting cluster from aggregates computed in `scripts/research/compute-features.ts` style features (save rate, boundary rate, exploration index).

4. **Ethics.** Profiles are sensitive; aggregation only; no re-identification narrative.

---

## Hypothesis (formal)

Let $\mathbf{d}_i \in \mathbb{R}^8$ be the dimension score vector for user $i$ (latest snapshot unless modeling versions).

- **H1 (factor structure):** A scree plot and parallel analysis favor **m < 8** factors with interpretable loadings (e.g., a “classical–contemporary” bipolar plus a “soft–intense” axis)—pre-register rotation (oblimin).

- **H2 (clusters):** Mixture or k-means on factor scores yields **K ∈ {3,4,5}** classes with silhouette > .50 **or** entropy criterion met—final *K* chosen by pre-registered information criteria, not post-hoc cherry-picking.

- **H3 (correlates):** Behavioral predictors (pre-registered list from aggregated `responses` + `player_sessions`) explain incremental variance in cluster membership beyond chance (likelihood ratio test vs intercept-only).

- **H4 (demographics null):** If any sparse demographic proxy exists in export, its incremental $R^2$ is negligible vs behavioral block (exploratory if absent).

---

## Methods

### Sample

Users with `research_consent` and `total_responses` ≥ threshold (align with profile manager eligibility, e.g., ≥5 eligible responses—cite `lib/reincarnation/profile-manager.ts` rules at analysis freeze).

### Dimension scores

Source: `user_desire_profiles.dimension_scores` (JSONB) — parse to matrix $\mathbf{D}$ ($N \times 8$). Optional: use first vs last row per user from `user_desire_profile_versions` for **sensitivity**.

### Exploratory factor analysis (EFA)

- Determine factorability (KMO, Bartlett).  
- **Maximum likelihood** EFA with promax or oblimin rotation.  
- Retain factors with parallel analysis + scree + theoretical interpretability.

### Cluster analysis

- **Gaussian finite mixture** (`mclust`) preferred over naive k-means; report BIC.  
- Validate clusters with **multivariate ANOVA** on raw behavioral features not used to build profiles (hold-out behavioral set if engineered features overlap—split features into **profile-training** vs **validation** sets pre-registered).

### Predicting cluster membership

Multinomial logistic regression or **latent class regression** if integrating mixture steps:  
$\Pr(c_i = k) = \text{softmax}(\boldsymbol{\eta}_k^\top \mathbf{b}_i)$ where $\mathbf{b}_i$ is vector of session aggregates.

### Vela data export path (by table)

| Table | Columns / role |
|-------|----------------|
| `user_desire_profiles` | `dimension_scores`, `axes`, `boundary_tags`, `total_responses`, `session_count`, `profile_version` |
| `user_desire_profile_versions` | Longitudinal replicate of dimension snapshots + `created_at` |
| `responses` | Aggregates: mean rating, SD, save rate, boundary rate, counts per user |
| `player_sessions` | Session counts, mode distribution, mean duration |

Feature engineering may mirror `scripts/research/compute-features.ts` outputs—version that script in the OSF component.

---

## Pre-registered analysis plan (OSF-ready)

1. **EFA:** 8 indicators, max 3 factors initially, expand only if parallel analysis supports.  
2. **Clustering:** Compare k=3..6 with BIC; pick winner by pre-registered rule.  
3. **Stability:** Bootstrap adjusted Rand index vs random halves.  
4. **Regression:** Block-wise entry of predictors.

---

## Power analysis

- **EFA / CFA planning:** MacCallum et al. (1999) sample size guidelines; conservative **N ≥ 200** subjects for stable eight-indicator EFA; **N ≥ 100** minimum for exploratory only with prominent caveats.  
- **Cluster stability:** Dolnicar (2002) bootstrapping mixtures; aim **≥150** users.  
- **Multinomial regression:** Peduzzi et al. (1996) events-per-variable rule—limit predictors to ≤ *events*/10.

**Citations:**  
MacCallum, R. C., Widaman, K. F., Zhang, S., & Hong, S. (1999). Sample size in factor analysis. *Psychological Methods, 4*(1), 84–99.  
Dolnicar, S. (2002). A review of data-driven market segmentation in tourism. *Journal of Travel & Tourism Marketing, 12*(1), 1–22.

---

## Data sources

**Internal:** Profile tables + aggregated responses/sessions.

**External validation (optional extension):** If a short **self-report aesthetic sensitivity** scale is administered in a future wave, MTMM matrix—outside core paper. **TODO(ASN-575)** for relevant scales (e.g., Aesthetic Experience Scale).

---

## Expected figures

| # | Sketch |
|---|--------|
| F1 | **Scree + parallel analysis** for eight dimensions. |
| F2 | **Factor loading heatmap** after rotation. |
| F3 | **Radar charts** of cluster centroids on dimensions (normalize 0–1). |
| F4 | **Multinomial coefficient plot** for behavioral predictors. |

---

## Limitations

- **Construct confound:** Dimensions are mathematically coupled through shared scoring code—factor structure may reflect **engine design** more than psyche; discuss need for independent validation.  
- **Selection:** Highly active users dominate early exports.  
- **No demographics:** Limits generalization claims—frame as **behavioral** typology.

---

## Contribution statement

We offer a **behavior-first typology** of aesthetic engagement with figurative imagery, grounded in implicit signals rather than self-report, with explicit links to the adaptive engine’s dimension basis. If clusters replicate, they become hypotheses for personalization ethics (stereotyping risk) and for cross-domain prediction work (RQ7).

---

## References (seed list — TODO ASN-575)

1. Fabrigar, L. R., Wegener, D. T., MacCallum, R. C., & Strahan, E. J. (1999). Evaluating the use of exploratory factor analysis in psychological research. *Psychological Methods, 4*(3), 272–299.  
2. MacCallum, R. C., Widaman, K. F., Zhang, S., & Hong, S. (1999). Sample size in factor analysis. *Psychological Methods, 4*(1), 84–99.  
3. McCrae, R. R., & Costa, P. T., Jr. (1997). Personality trait structure as a human universal. *American Psychologist, 52*(5), 509–516. *(analogy only)*  
4. Rentfrow, P. J., & Gosling, S. D. (2003). The do re mi’s of everyday life: The structure and personality correlates of music preferences. *Journal of Personality and Social Psychology, 84*(6), 1236–1256. *(method analogy)*
5. Peduzzi, P., Concato, J., Kemper, E., Holford, T. R., & Feinstein, A. R. (1996). A simulation study of the number of events per variable in logistic regression analysis. *Journal of Clinical Epidemiology, 49*(12), 1373–1379.
6. Dolnicar, S. (2002). A review of data-driven market segmentation in tourism. *Journal of Travel & Tourism Marketing, 12*(1), 1–22.
7. Chamorro-Premuzic, T., & Furnham, A. (2004). Art judgement: A measure related to both personality and intelligence? *Imagination, Cognition and Personality, 24*(1), 3–24.
8. McManus, I. C., & Furnham, A. (2006). Aesthetic activities and aesthetic attitudes: Influences of education, background and personality on interest and involvement in the arts. *British Journal of Psychology, 97*(4), 555–587.

**TODO(ASN-575):** Add empirical aesthetics papers on individual differences, chills, Openness correlates, and digital behavior typologies.
