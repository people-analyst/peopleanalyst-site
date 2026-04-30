---
title: "Academic Peer-Review Memo"
description: "A senior referee's review of the cultural-diffusion manuscript, written for a Sociological Science / ASR methods track. Candid, adversarial, constructive."
publishedAt: "2026-04-14"
status: published
authors: ["Senior referee (assumed)"]
category: review
exportBasename: "peer-review-20260414"
---

# Peer-Review Memo

**Manuscript:** *Cultural Diffusion of Personal Names: A Multi-Method Causal Study of Search, Media, and Birth Registration in the United States, 1880–2024* (`docs/research/phd_cultural_diffusion_20260414.md`)

**Reviewer:** Senior referee, computational social science / sociology of culture
**Outlet (assumed):** *Sociological Science* / *American Sociological Review* methods track
**Date of review:** 2026-04-14
**Recommendation in advance:** **Reject with encouragement to resubmit** as a substantially restructured manuscript. The dataset is genuinely valuable; the analytic execution is not yet at a publishable standard.

---

## 1. Summary of claims

The authors integrate 145 years of SSA birth records, ~20 years of weekly Google Trends, a CMU-derived phonetic neighborhood graph, and roughly 1,141 LLM-attributed cultural events. They claim to:

1. Quantify the share of name-year turnover attributable to neutral drift vs. cultural causation, via a Wright–Fisher / Lieberson null model (Phase 5).
2. Identify phonetic-neighborhood spillover as a "missing variable" in prior research (Phase 6).
3. Establish that search Granger-causes births at ~1-year lag, with a clean *aspirational/cautionary* asymmetry in impulse responses (Phase 7a).
4. Recover Hawkes branching ratios and Bass (p, q) parameters indicating that peer adoption dominates broadcast adoption (Phases 7b–c).
5. Estimate causal ATEs for 200 cultural events via Abadie-style synthetic controls, conclude that cultural events explain *less than 15%* of the cross-event variance in adoption (Phase 9 variance decomposition), and refute the Blockbuster Paradox in Hill-curve form (Phase 8).
6. Demonstrate spatial autocorrelation in adoption (Moran's *I*) declining in the streaming era (Phase 10), and an extraordinary AUC = 0.999 predictability ceiling for top-100 entry (Phase 11).

These are ambitious claims. Several are interesting and defensible. Several are not supported by the evidence presented.

---

## 2. Strengths

- **Data assembly is genuinely novel.** The integration of SSA national + state files, CMU-derived phonemes, Google Trends weekly series, GDELT, Books Ngrams, OMDb/TMDb cast roles, and Wikipedia/Wikidata is an asset few prior naming studies have had. The disk-first, Parquet-checkpointed, resumable architecture (Phase 0–2 of the spec) is excellent and rarely seen in single-author social-science work.
- **Theoretical scaffolding is appropriate.** The decision to put Lieberson / Hahn–Bentley neutral drift on trial alongside the event-study apparatus is the right framing. The methodology document (`docs/research/methodology.md`) explicitly calibrates effective population sizes by sex (N_e_F ≈ 9,852; N_e_M ≈ 22,320), which is the right move and is rarely done in the naming literature.
- **The aspirational/cautionary IRF split (Phase 7a)** is the most interesting empirical finding in the manuscript. The fact that `event_news_event` IRFs are *negative* at h = 1–2 while `event_film_character` and `event_celebrity_birth` IRFs are positive and 2–7× the pooled baseline is exactly the kind of sign-asymmetry result that would interest *Sociological Science*. The Khaleesi-as-failed-canary discussion is honest and shows the authors understand the Granger framework's blind spots.
- **The Phase 7a robustness section is exemplary.** Reporting BH-adjusted FDR (which collapses the 21.5% nominal rate to 1.0%) within the same document, alongside an alternative `births_per_1000` transform that *agrees on signs and lags but disagrees on which names survive*, is exactly the kind of self-discipline reviewers want to see. **This standard is not maintained elsewhere in the paper.**
- **The Phase 5 null model's classification breakdown** (39,055 drift-consistent / 6,743 partially-cultural / 390 culturally-influenced / 224 strongly-cultural names out of 46,412) is a publishable descriptive contribution on its own, properly framed.

---

## 3. Major concerns

### 3.1 Identification: the "causal ATE" claim is overstated

The manuscript repeatedly refers to Phase 8a outputs as "causal ATEs" obtained from "Abadie-style synthetic controls." The reported specification (§4.2) is: donor pool matched on gender, syllable count, ±25% phonetic density, similar rank tier, no attributed event ±3 years; convex weights via SLSQP minimizing pre-treatment MSPE; placebo distribution from random non-spiking names.

Several concerns:

1. **No pre-treatment fit diagnostics are reported.** Abadie, Diamond, and Hainmueller (2010, 2015) emphasize that synthetic-control inference is meaningless absent good pre-period MSPE. The manuscript reports neither the distribution of pre-MSPE across the 200 events nor a post-/pre-MSPE ratio statistic, which is the standard inference workhorse. The reader has no way to know whether the 200 selected events have synthetic controls that actually track the treated unit before the event.
2. **No event-by-event placebo p-values** are shown in the headline tables. §4.2 states that placebo distributions yield per-event p-values; §5.7 shows only mean/median ATEs and a positive-ATE share (71/200, 36%). With 36% positive ATEs, *the modal causal effect is negative or null* — a fact the discussion does not engage with. Under a true positive-effect prior we would expect well above 50%. This is a finding, but it is treated as background.
3. **Attribution endogeneity contaminates the donor pool.** A name is "treated" iff the LLM attribution pipeline assigns it an event. A name is a "donor" iff the pipeline does *not* assign one. But the attribution pipeline runs only on detected spikes (peak prominence ≥ 15, magnitude ≥ +75% per `methodology.md` §2). Donor names are therefore systematically lower-volatility names. A textbook violation of donor-pool comparability. The placebo test does not fix this — it tests against the wrong population.
4. **SUTVA is violated by construction** when treated and donor names share phonetic neighbors (Phase 6 documents 166k phonetic pairs with median |r| = 0.35). The limitations section acknowledges this in one sentence (§8.4) but the inference does not adjust.
5. **Synthetic controls do not deliver causal estimates with N_treated = 1 unless strong assumptions hold.** Pooling 200 single-unit estimates into a "mean ATE" and reading it as an average treatment effect is not a standard inferential move and certainly does not warrant the "causal" framing.

**Bottom line:** what Phase 8 actually delivers is *200 model-implied trajectory deviations* with weak donor-comparability guarantees. The manuscript should call them "synthetic-control-adjusted divergences" and reserve "causal ATE" for an identification strategy that earns it.

### 3.2 The variance-decomposition headline is not credible

Section 5.9 reports a nested OLS where "event characteristics" explain 1.8% of cross-event variance in the Phase 8 ATEs and the discussion (§7.1, §7.3) builds a major claim on this — "quietly demolishes the field's intuition." This claim has at least four problems:

1. **The dependent variable is itself a model output**, not an observed outcome. Decomposing variance in synthetic-control residuals tells us about properties of the residual estimator, not about the data-generating process for naming.
2. **n = 200, with multicollinearity at catastrophic levels.** The reported VIFs (cycle_cos_100 VIF = 1,882,168; cycle_sin_100 VIF = 1,683,638; log_budget = 42.4; log_revenue = 38.9) are not "warnings"; they are evidence the OLS fit is numerically degenerate. Any interpretation of incremental R² across blocks is unsafe in this regime. The cycle terms are perfectly collinear sinusoidal pairs at different periods — they should be dropped or orthogonalized before any decomposition is reported.
3. **The "name" block (ΔR² = 0.529) is mechanically endogenous to the ATE.** Many "name" features (rank tier, gender share, prior popularity) are inputs to the synthetic-control matching procedure. Of *course* they explain residual ATE variance — the matching couldn't perfectly equilibrate them. This is a methodological tautology, not a finding.
4. The "less than 15%" framing in the body text is not what the table shows (it shows 1.8% for events alone). The reader cannot reconcile these numbers without re-reading carefully. This is sloppy.

The Section 7.3 product-implication claim ("trending should be downweighted in the Namesake scoring") is a business decision that has no business being in a peer-reviewed methodology paper. Strip it.

### 3.3 The predictability ceiling (§5.11) is a base-rate artifact

The reported AUCs — Top-500 baseline 0.982, AR(1) 0.997, full logistic 0.999 — should set off alarms, not generate a "surprisingly high predictability" interpretation.

The positive class is 271 names that entered the SSA top 100 in 2015–2024 out of a training set of 58,409 names: a base rate of 0.46%. With this imbalance, AUC is a notoriously misleading metric. PR-AUC is the right summary; the paper reports it (0.881 for the full model) but does not lean on it. Even so, 0.881 PR-AUC on a near-deterministic task — *predicting which of 58k mostly-rare names will reach the top 100, given that almost all do not* — primarily measures the model's ability to distinguish rare names from already-popular ones. The AR(1)-on-rank baseline at AUC = 0.997 with PR-AUC = 0.745 already demonstrates this: knowing last year's rank is essentially sufficient.

The interpretive claim that this "may reflect that structural features constrain the possibility space more than Salganik's framework would predict" is not warranted. Salganik et al. (2006) examined cultural products *competing for top placement among comparable candidates*. The correct analogue would condition on names already in (say) the top 500 and ask which become top 100. As specified, the test answers a trivial question (will an obscure name enter the top 100? almost never) and reports near-perfect AUC because that null prediction is correct ~99.5% of the time.

This entire section needs rebuilding with a stratified comparison set.

### 3.4 Phonetic spillover (Phase 6): construct validity and circularity

The Phase 6 result — phonetic pairs show mean |cross-correlation| = 0.184 vs. 0.066 for random control, Welch t = 7.21, p ≈ 1e-12 — sounds compelling. But:

1. The construction of the "phonetic neighborhood" via CMU phonemes plus a g2p fallback for OOV names is described impressionistically. What is the edge-weight definition? Levenshtein on ARPAbet? Onset-shared? Stress-pattern-shared? The headline report (§2.2) says "phonetic neighborhood graph with 34M edges" but the methodology files don't pin down the metric, and §3.2 in the headline calls "the onset phoneme" *the* unit of contagion — this is a strong, falsifiable claim that needs a sensitivity analysis across alternative phonetic similarity definitions.
2. The "random control" set is not stratified on length, era, or popularity. Phonetic neighbors will tend to share era of popularity (cohorts of "-ayden" names) and that cohort effect alone — not phonetic priming — could produce the cross-correlation gap. The proper control is permutation within era × popularity bin.
3. Section 5.3 reports "422,084 significant phonetic spillover events" — significant relative to what? No correction for testing across millions of pairs is mentioned.

The phonetic-spillover finding is the manuscript's most theoretically interesting potential contribution and it is currently the least defensible.

### 3.5 Multiple testing across the manuscript

The headline document runs (conservatively): ~4,185 per-name Granger tests + 422k phonetic-pair tests + 9 moderation tests + 7 side-quest tests + 200 placebo tests + 4 OLS variance-decomposition steps + 3 Hill curves + Moran's *I* across 65 years. That is on the order of 10⁵–10⁶ p-values under the most generous accounting.

Phase 7a applies BH correction to the per-name Granger tests — and reports a striking collapse from 21.5% to 1.0% significance. **This honesty should be applied across the document.** The 9 moderation tests, the 7 side-quest tests, the 3 Hill specifications, and the variance-decomposition F-tests are not BH-corrected anywhere I can find. The two "significant" moderators (rarity, is_unisex_num) survive a Bonferroni at 9 tests but should be reported alongside corrected family-wise alpha.

### 3.6 Side-quest tests are mis-framed

§6 reports "Of 7 side-quest tests, 0 rejected the null at p < 0.05. 7 were consistent with neutral drift." Four problems:

1. **One of the seven failed entirely** (`test_olympic_sprint`: "Test failed: 'event_type'", n = 0) and is nonetheless tabulated as "null-consistent." That is wrong. A failed test is not a null result; it is a missing test. Remove it or fix it.
2. The framing "fails to reject = null-consistent" is the canonical undergraduate error. With sample sizes of n = 5 (Franchise Decay) and n = 33 (Villain), the studies are statistically *underpowered*, not informative about the null. The Award Timing Window result (Cohen's d = 0.293, n = 200, p = 0.14) is a moderate effect size with insufficient power, not evidence of null consistency.
3. The "benchmarked against the Phase 5 null model's 95% band" framing is invoked but never operationalized in the side-quest tables — they appear to be plain t-tests reported as null-model-benchmarked.
4. The Blockbuster Paradox in Hill-curve form (§5.8) is reported with R² values of -11.9, -0.53, and -8.6 across exposure measures. Negative R² means the fitted Hill curve is worse than the mean. This is a non-result reported as a null result. The correct conclusion is that the Hill specification is mis-identified for these data, not that the Blockbuster Paradox is "not confirmed."

### 3.7 External validity: SSA top-N censoring

The methodology acknowledges in passing that SSA requires ≥ 5 births/year. This is not a minor footnote. Names below the threshold — including the entire long tail where neutral drift is most plausible and where the action of cultural events is *adoption from rarity* — are systematically censored. The Lieberson null is calibrated on the visible portion of the distribution, which biases the effective population size estimates and the percentage of name-years exceeding null thresholds. A discussion of right-censoring effects on N_e estimation is needed.

### 3.8 Google Trends pre-2004 missingness

Granger results, Bass fits, and Hawkes fits all rely on the search panel that begins in 2004. The headline narrative invokes "1880–2024" repeatedly; the *causal* portion uses ≤ 21 years of search data and a 200-event window biased toward the post-2004 era. The cross-period claims (e.g., the streaming-era Moran's *I* decline) are confounded by the fact that pre-2004 has no search-side covariate at all. The manuscript should be explicit that it is, effectively, two studies stapled together: a 1880–2024 descriptive null-model study, and a 2004–2024 causal study.

### 3.9 LLM attribution as a load-bearing input

The cultural-event corpus is generated by Claude Haiku 4.5 prompted on OMDb/Wikipedia evidence (`methodology.md` §2). The reliability of this attribution is reported only as "median confidence ≈ 0.72" — an LLM self-report, not a validated metric. There is no inter-rater agreement against human annotators and no precision/recall against a held-out gold standard. With the entire causal pipeline downstream of attribution, this is the single largest unmeasured source of error in the manuscript.

A reasonable bar for publication: hand-annotate ~200 spikes blindly, compute precision/recall against the LLM attributions, report by event type. Without this, the "60 film_character ATE = +0.000119, 54 news_event ATE = -0.000012" comparison in §5.7 cannot be interpreted — the news_event vs. film_character contrast may simply reflect LLM event-type confusion at category boundaries.

### 3.10 Effect sizes are vanishingly small and never contextualized

The reported mean ATE in §5.7 is 0.000065 "market share points." What is a market share point? What does 6.5e-5 mean for a name like *Aiden*? Is this 0.0065% of births? Six births per million? The manuscript never converts effect sizes into a unit a reader can interpret. For a paper whose central contribution is a "Counterfactual Catalog," this is unacceptable.

---

## 4. Minor issues / presentation

- **Abstract contains unfilled template variables** ("[results summary inserted from data]", "[X]%", "[Y] weeks", "[Z]", "[findings]", "[spatial pattern]"). The closing line includes `{date_str}`. Both indicate the report was generated programmatically and shipped without proofreading. No journal will desk-accept this.
- The §1.2 "Two Competing Theories" pairs Lieberson (2000) with Berger (2023, *Magic Words*, Harper Business). Conflating a popular-press marketing book with a Yale University Press monograph as theoretical equals is a citation hygiene problem. Berger's empirical work (Berger et al. 2012, *PNAS*) is the right citation; the Harper Business volume is not a peer-reviewed framework.
- Hawkes report (Phase 7b) shows a half-life mean of **1,402,526 weeks** and SD of **9.76 million weeks** — driven by a tiny number of pathological fits. The summary sentence "median half-life of [Y] weeks" elsewhere in the paper picks up the median (1.39 weeks), which is fine, but the means should be flagged as unreliable, not tabulated alongside medians without comment.
- §5.6 Bass fits report median R² = 0.9916 across 60,470 fits. R² values this uniformly excellent on cumulative adoption curves are essentially mechanical — Bass curves can be fit to almost any monotone-then-saturating series. R² is the wrong fit metric here; out-of-sample one-step-ahead RMSE on the rate (not cumulative) series is the standard.
- The §7.3 paragraph about the "Namesake baby naming application's scoring weights" is a conflict-of-interest disclosure that needs to be moved to a COI footnote, not discussion text.
- The "Generated by the Namesake Research Pipeline (Phase 11)" footer is appropriate for an internal artifact but not for a journal submission. A pipeline-generated manuscript needs a human author's authorship statement and a commitment that human judgment, not the generation script, is responsible for the empirical claims.
- The Moran's *I* finding (decline from 0.51 in the 1960s to 0.27 in the 2020s) is interesting and appears robust, but is reported without significance bands or null comparison. Decadal Moran's *I* with 50 states has known small-sample bias; a permutation null is needed.
- The "Coastal vs Interior Adoption" t = 2.07, p = 0.039 with n = 1,260 vs. n = 1,285 is significant but the effect size (4.30 vs. 1.54 in unspecified units) is unclear, and "first adopter was coastal: 100% of events" with n = 11 is not a finding worth bolding.

---

## 5. Questions for the author

1. **Pre-MSPE distribution.** Provide the full distribution of pre-treatment MSPE for the 200 synthetic-control fits, the post/pre MSPE ratio, and the rank-of-treated-in-placebo-distribution per event. Without these, Phase 8 inference cannot be evaluated.
2. **Donor-pool comparability.** How do you address the fact that donor names are by construction non-spiking, and treated names by construction are spiking? Have you tried matched donor pools that include other spiking names (treated by other events)?
3. **LLM attribution validation.** Provide precision, recall, and per-category Cohen's κ against a human-annotated gold standard of at least 200 spikes.
4. **Phonetic-neighborhood definition.** Pin down the edge metric. Provide a sensitivity analysis across at least three alternative similarity definitions (onset shared, full phoneme Levenshtein, Soundex/Metaphone) and demonstrate that the spillover finding is not metric-dependent.
5. **Multiple testing.** Apply BH or Bonferroni across the full family of inferential tests in the manuscript (not only Phase 7a). Report which findings survive.
6. **Predictability stratification.** Re-run Phase 11 conditioning on the names already at, say, ranks 100–500 in 2014, and report AUC/PR-AUC for top-100 entry within that competitive set. The 0.999 AUC on the unconditioned set is not informative.
7. **Variance-decomposition repair.** Drop or orthogonalize the cyclic features producing VIF > 10⁶. Decompose into name-features-known-pre-event vs. event-features only. Report Shapley R² rather than nested ΔR², which is order-dependent.
8. **Effect-size translation.** Express ATEs in births-per-million-newborns or log-rank-changes so the reader can interpret magnitudes.
9. **Failed side-quest test.** Either fix `test_olympic_sprint` or remove it. Reporting n = 0 as "null-consistent" is wrong.
10. **Negative ATEs.** Engage with the fact that 64% of events have negative or zero estimated ATEs. Is this measurement noise? Is it cautionary-event signal bleeding into the aggregate? Is the synthetic control over-fitting and producing systematic post-period regression to the mean?
11. **Pre-2004 vs. post-2004.** Restructure the paper to make the temporal coverage of each method explicit. The "1880–2024" framing is misleading for everything downstream of search data.
12. **Bass R² inflation.** Replace cumulative-curve R² with a fit metric appropriate to the rate series and re-classify the broadcast/peer/mixed buckets accordingly.

---

## 6. Verdict

**Reject in present form, with strong encouragement to resubmit a substantially revised manuscript.**

The dataset is a real contribution. The aspirational/cautionary IRF asymmetry (Phase 7a) and the Lieberson null model classification (Phase 5) are publishable on their own with modest revisions. The phonetic spillover work is potentially important but currently under-specified.

The headline causal claims (Phase 8 ATEs, the variance-decomposition "demolition," the AUC = 0.999 predictability) are not supported at the standard required for a methods-heavy outlet. The manuscript reads as the *output of a pipeline* rather than as a paper an author has thought through; the unfilled abstract templates and the failed side-quest reported as a null result are surface symptoms of a deeper issue, which is that the analytic plan was executed end-to-end without the iterative re-specification that empirical work requires.

My specific recommendation is to split this into two papers:

- **Paper A (descriptive / null-model):** Lieberson decomposition, phonetic-neighborhood structure, Moran's *I* secular trend, Bass parameter distributions. 1880–2024 scope. Honest about what is descriptive.
- **Paper B (causal / event-study):** Search-Granger IRFs with the aspirational/cautionary asymmetry as the headline. Synthetic-control case studies on a *small, hand-validated* set of events (≤ 20) with full diagnostics, rather than 200 events with weak attribution. 2004–2024 scope. The trending-card application can be motivation but does not belong in the analysis.

Both papers, properly executed, are publishable. Bundled as currently written, neither is.

---

*Reviewer signed off, 2026-04-14. Conflicts of interest: none declared. The reviewer notes the manuscript appears to be co-authored with or generated by an AI research pipeline; this should be disclosed in any submission per the journal's AI authorship policy.*
