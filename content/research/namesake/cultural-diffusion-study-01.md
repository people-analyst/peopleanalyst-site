# Preregistration — Cultural Diffusion Study 01

**Study identifier:** `cultural-diffusion-study-01`
**Repository:** `people-analyst/baby-namer`
**Registration type:** OSF-style internal preregistration (upload-ready)
**Version:** 1.0 — 2026-04-29
**Frozen at commit:** `4f218f8` (`docs: session handoff (2026-04-28)`)
**Master design source:** [`PHD_STUDY_SPEC.md`](../PHD_STUDY_SPEC.md) — formalized here as a frozen protocol with named hypotheses, locked analysis plans, and a deviations log.
**Engineering:** `scripts/python/research/phase{1..11}/`, `cloud/modal_app.py`, parquet artifacts under `data/research/processed/`.
**Authors:** Mike West (PI), with Claude as research engineer.
**Signed:** Mike West, 2026-04-29.

---

## 1. Background

Naming has long been positioned as a paradigm case for two competing theories of cultural change. The internal-fashion view (Lieberson, 2000) holds that name turnover arises predominantly from endogenous taste cycling that requires no external cultural cause. The neutral-drift view (Hahn & Bentley, 2003; Bentley et al., 2007) goes further, modeling naming as a Wright–Fisher random-copying process and showing that observed top-100 turnover is consistent with drift alone at realistic effective population sizes. Against both, a cultural-events view (Berger et al., 2012; the spike-attribution literature) holds that specific identifiable events — films, news cycles, celebrity births, sports moments — drive measurable adoption lifts.

The Namesake research pipeline assembles a dataset that, to our knowledge, has not previously been brought together at this granularity: SSA national name files 1880–2024 (2,149,477 rows), SSA state files 1910–2024 (6,600,640 rows), 20 years of weekly Google Trends interest for ~32K names (7,941,450 weekly rows), 843 LLM-attributed cultural events linked to specific names, the CMU Pronouncing Dictionary as a phoneme substrate, GDELT for an independent attention channel, and TMDb for cast / role metadata. The combination unlocks a per-name, per-event causal-inference design that the prior literature could not run.

This preregistration codifies the design that produced the reports currently published under [`docs/research/reports/`](../reports/) and the planned analyses queued in `PHD_STUDY_SPEC.md` Phases 8–11. **Phases 1–7 and 10 are completed at the time of freeze; Phase 8 is in flight; Phases 9 and 11 are queued.** Per OSF norms, retrospective registration is permitted for analyses already executed *only if* the preregistered specifications match the artifacts on disk. Section 11 (Deviations and amendments) tracks any divergence between this protocol and what was actually run.

---

## 2. Research questions

Twelve research questions are inherited verbatim from `PHD_STUDY_SPEC.md` §2 and consolidated below into six confirmatory hypotheses (H1–H6) plus three exploratory hypotheses (H7–H9). Confirmatory hypotheses are evaluated at the alpha policy in §9; exploratory hypotheses are reported descriptively with the same alpha as a guide rather than a gate.

**Foundational (Phase 5).** What does the unconditional name turnover process look like? How much variance in annual rank movement is explained by a neutral-drift / pure-fashion null model?

**Diffusion mechanics (Phases 6, 7).** Does Google search interest Granger-cause SSA births at the name level, and what is the distributed lag structure? When fitted with a Hawkes process, what is the typical half-life of a cultural shock to adoption, and does it vary by event type? When fitted with Bass, what is the (p, q) distribution across names, and which event types produce broadcast-driven vs peer-driven adoption?

**Causal (Phase 8).** For the 200 best-attributed cultural spikes, what is the synthetic-control causal ATE on adoption? What is the cross-sectional distribution of ATEs and what predicts heterogeneity? What fraction of the cultural mass that appears in a focal name's phonetic neighborhood after an event lands on the focal name vs leaks to its acoustic cousins? Does the search-to-adoption conversion ratio follow a Hill curve in exposure intensity, with diminishing or *negative* marginal returns above an inflection point?

**Heterogeneity (Phase 9).** Of the variance in adoption lift across cultural events, what fraction is attributable to (a) event characteristics, (b) name characteristics, (c) phonetic neighborhood state, (d) generation-cycle position, (e) residual?

**Predictability and geography (Phase 10).** What is the upper bound on out-of-sample predictability of name "winners" trained on 2004–2014 → tested on 2015–2024? Does cultural-event-driven naming exhibit spatial autocorrelation across U.S. states? Do coastal states adopt event-linked names earlier than interior states?

---

## 3. Hypotheses

Each hypothesis specifies (a) the parameter or contrast of interest, (b) the data partition it is evaluated on, (c) the decision rule, and (d) the artifact that will record the result.

### H1 (confirmatory) — Search Granger-causes SSA popularity at the population level.

**Parameter:** Pooled within-name fixed-effects panel-VAR(p=3) impulse response of `popularity = -log(rank)` to a one-SD shock in `search_score_annual_mean`, at horizons 1 and 2.

**Decision rule:** H1 is supported if the IRF at h=1 has a 95% Monte Carlo bootstrap CI (200 replications) that excludes zero on the positive side, and the IRF at h=2 has the same direction.

**Artifact:** `data/research/processed/panel_var_irf.parquet` (full-sample row).

**Partition:** All names with at least `MAX_LAG + 5 = 8` valid (year, search, popularity) rows in the search-era window 2004–2024.

### H2 (confirmatory) — The aspirational/cautionary asymmetry.

**Parameter:** Subsample IRFs at horizons 1 and 2 for `event_news_event` (cautionary) versus the pooled aspirational subsample (`event_film_character` ∪ `event_celebrity_birth` ∪ `event_celebrity_naming` ∪ `event_sports_moment`).

**Decision rule:** H2 is supported if the `event_news_event` IRF at h=2 has a 95% CI that excludes zero on the *negative* side AND the aspirational pooled IRF at h=1 has a 95% CI that excludes zero on the *positive* side. The contrast must hold sign.

**Artifact:** `data/research/processed/panel_var_irf.parquet` subsample rows.

### H3 (confirmatory) — Names beat neutral drift more often than the p99 nominal rate.

**Parameter:** Share of name-years (across 46,412 names with ≥10 SSA years) for which `beats_neutral_p99 = TRUE`, computed as the logical OR across sex rows.

**Decision rule:** H3 is supported if the observed share exceeds the nominal 1% expected under the null by at least a factor of 2. (Pre-registered threshold: ≥2%.)

**Artifact:** `data/research/processed/null_model_thresholds.parquet`, summarized in `null_model_summary.json`.

### H4 (confirmatory) — Phonetic neighbors co-vary more than chance.

**Parameter:** Welch's two-sample *t*-statistic comparing pairwise cross-correlation between phonetic neighbors (Phase 6 graph) versus a random control of 1,000 non-neighbor pairs.

**Decision rule:** H4 is supported if Welch *t* > 4 with two-sided *p* < 1e-6 (a deliberately strict threshold given the large *n* on both sides; the conventional α=0.05 would be uninformative).

**Artifact:** `data/research/processed/phonetic_spillover_results.parquet` and `.phase6_checkpoint.json`.

### H5 (confirmatory) — Per-event causal ATEs are positive on average for aspirational events.

**Parameter:** Mean ATE at horizon t+3 across the 200 best-attributed events, restricted to aspirational `event_type` values (`film_character`, `tv_character`, `celebrity_birth`, `celebrity_naming`, `sports_moment`, `music_chart`, `royal_event`, `book_character`, `video_game`).

**Decision rule:** H5 is supported if the mean ATE_t3 across aspirational events is positive AND the placebo distribution (1,000 non-spiking names matched on covariates) has fewer than 5% of replicates with mean ATE_t3 at or above the observed value.

**Artifact:** `data/research/processed/event_ate.parquet` (Phase 8a).

**Status at freeze:** Phase 8a is in flight. The current `cultural-diffusion.md` and `moderation_tests.md` reports use a precursor adoption-lift estimand (3-year pre/post rank change) rather than the synthetic-control ATE. H5 is preregistered against the synthetic-control specification.

### H6 (confirmatory) — Lead characters convert better than supporting characters.

**Parameter:** Mean ATE_t3 split by `is_lead_character ∈ {TRUE, FALSE}` within the film/TV subsample (`event_type ∈ {film_character, tv_character}`).

**Decision rule:** H6 is supported if the lead-character mean ATE_t3 exceeds the supporting-character mean by at least one placebo standard deviation, with a one-sided permutation *p* < 0.05.

**Artifact:** Same as H5, joined with `is_lead_character` from `name_cultural_events`.

### H7 (exploratory) — Hill curve with reactance (Blockbuster Paradox).

**Parameter:** Reactance term γ in the Hill+reactance specification fit on three exposure measures (revenue, spike magnitude, vote count).

**Decision rule:** A confirmed Blockbuster Paradox would require γ < 0 with two-sided *p* < 0.05 on at least one exposure measure. Status as of `blockbuster_paradox_report.md`: γ not significant on any of the three; H7 currently has *negative evidence* and is reported as an exploratory null.

**Artifact:** `blockbuster_paradox_report.md`.

### H8 (exploratory) — Predictability ceiling.

**Parameter:** Test-set AUC of a full-feature logistic regression predicting "entered SSA top 100 between 2015–2024" trained on 2004–2014 features.

**Decision rule:** H8 is reported descriptively. The headline number — full-model AUC 0.999 vs AR(1) baseline AUC 0.997 — is presented as evidence of strong structural predictability rather than as a Salganik-paradigm refutation; the discussion in `predictability_ceiling.md` is the canonical interpretation.

**Artifact:** `predictability_ceiling.md`.

### H9 (exploratory) — Spatial autocorrelation has decreased in the streaming era.

**Parameter:** Mean Moran's I across years 1960–2014 vs 2015–2024 for top-200 names.

**Decision rule:** Welch's two-sample *t*-test on annual Moran's I, two-sided *p* < 0.05. Direction expected: post-streaming < pre-streaming, consistent with national-exposure flattening.

**Artifact:** `moran_report.md`. Status at freeze: pre-streaming mean I = 0.4285, post-streaming = 0.2906 — significant in the report; H9 is reported as exploratory because the era boundary is a researcher choice rather than a pre-specified break date in the original spec.

---

## 4. Design summary

| Element | Specification |
|---|---|
| Study type | Observational, multi-method causal inference on a constructed panel |
| Unit of analysis | Variable: name × year (Phase 5, 7, 9), name × week (Phase 7b, 8), event (Phase 6 spillover, Phase 8a synthetic control), state × year (Phase 10a) |
| Time window | 1880–2024 (SSA), 2004–2024 (Google Trends), 2015–2024 (GDELT, predictability test set) |
| Treatment definition | Attributed cultural event in `name_cultural_events` clearing the LLM-confidence threshold (median 0.72) AND with a detected spike in `name_spike_events` (≥+75% above pre-spike baseline; scipy peak-prominence ≥15) |
| Outcomes | (a) `births_count` (Phase 4 panel), (b) `rank` and derived `-log(rank)` (Phase 7a), (c) per-event ATE on births_per_1000 at t+1..t+5 (Phase 8a), (d) `beats_neutral_p99` flag (Phase 5) |
| Counterfactual | (a) Wright–Fisher / phonetic-fashion null simulation for population-level claims; (b) synthetic control built from non-spiking matched donors for per-event causal ATEs |
| Blinding | Not applicable (observational) |
| Multiple-testing policy | Per-name analyses use Benjamini–Hochberg FDR control (§9); panel-level estimands report a single coefficient and do not require FDR. |

---

## 5. Data sources

The following sources are pre-specified as inputs. Any later additions or substitutions enter the deviations log (§11). All sources are pulled into Parquet under `data/research/` per `methodology.md` §1.

**Internal (Supabase snapshot).** `name_search_trends` (weekly Trends), `name_rank_history` (annual SSA), `name_cultural_events` (843 attributed events), `name_spike_events` (spike geometry), `name_enrichment` (origin, syllables, vibe), `name_stats` (gender, peak rank), `name_full_deduped` (canonical name table).

**External.** SSA national + state files (ssa.gov), Google Trends (weekly + monthly tiers), CMU Pronouncing Dictionary v0.7b, Google Books Ngrams v3, GDELT 2.0, Wikipedia REST + Wikidata SPARQL, OMDb API, TMDb API v3.

**Research-table namespace.** New tables prefixed `research_*` with RLS deny-by-default per `PHD_STUDY_SPEC.md` §4.4.

---

## 6. Sample construction and inclusion / exclusion

### Names — Phase 4 panel construction

**Included.** Every name appearing in `name_rank_history` with `year ∈ [1880, 2024]` and `rank ≤ 1000`. Names that only appear in state-level files (1910 onward, with state `count ≥ 5`) but never on the national top-1000 are included in Phase 10 only.

**Excluded.** Names that fail the SSA privacy threshold of 5 births in a state in a year (these never enter the source files; standard SSA-public limitation). Names whose phoneme decomposition fails both CMU lookup AND g2p fallback are excluded from Phase 6 spillover analysis only; they remain in Phase 5 and Phase 7a.

### Names — Phase 7a Granger qualification

**Included.** Names with ≥13 valid (year, search, popularity) rows in the 2004–2024 window, where "valid" means `rank` non-null AND `search_score_annual_mean > 0` (the Phase 4 builder fills missing weeks with 0.0; we treat 0.0 as "Google did not sample" rather than "interest was zero").

**Excluded.** Names with fewer than 13 valid years. The pooled panel VAR uses a more permissive `MAX_LAG + 5 = 8` floor, so subsample IRFs partially recover names dropped from the per-name table.

### Events — Phase 8a causal-inference qualification

**Included.** The 200 best-attributed events selected by joint ranking on (a) LLM confidence score in `name_cultural_events` (median 0.72 across the corpus), (b) spike-geometry cleanliness in `name_spike_events`, (c) availability of ≥3 matched non-spiking donors in the pre-event covariate space.

**Excluded.** Events with confidence < 0.35 (already filtered out at attribution time). Events whose spike clears `+75%` magnitude but fails peak-prominence ≥15. Events lacking sufficient pre-treatment history (5 years) for MSPE-based donor-weight optimization.

### Sex-stratification

Phase 5 fits effective population sizes separately by sex ($N_e^F = 9{,}852$, $N_e^M = 22{,}320$). Phase 7a is *not* sex-stratified in the canonical run; sensitivity runs by sex are exploratory.

### Era boundary for H9

Streaming era is defined as `year ≥ 2015`. The choice is post-hoc (Netflix's first wholly-original tentpole *Daredevil* premiered April 2015); a sensitivity analysis at `year ≥ 2013` (House of Cards launch) is permitted as exploratory.

---

## 7. Analysis plan

The pipeline is broken into 11 numbered phases (`PHD_STUDY_SPEC.md` §4). Each phase has a pre-specified output artifact and a pre-specified verification harness (`verify_phase<N>.py`). Phase order matters because later phases depend on earlier outputs; this is the intended design and is not a researcher-degree-of-freedom.

### Phase 5 — Lieberson null model (H3)

Two null models:

1. **Neutral drift (Wright–Fisher).** Fit population turnover statistic to 1880–2003 SSA distribution; per-sex $N_e$ estimated by matching observed top-100 decadal turnover.
2. **Phonetic-fashion null.** Names rise as a function of their neighborhood's prior-year aggregate, with no event input.

For each model: 1,000 simulated trajectories; report the share of name-years where observed `rank` exceeds null at the 95th and 99th percentile. Diagnostic: the null model must reproduce observed top-100 annual turnover (~5–7% per year) within ±2 percentage points; if not, the null is wrong and we fix it before proceeding.

### Phase 6 — Phonetic spillover (H4 + Q7 prep)

Build neighborhood graph on phoneme edit distance ≤1 OR shared onset+rhyme. For every attributed event: compute focal share = focal_post / total_neighborhood_post; spillover ratio = (neighborhood_post − focal_post) / (neighborhood_pre − focal_pre). Cross-tab spillover ratio by event_type, genre, name unusualness. Welch *t* of phonetic-pair vs random-control cross-correlations for H4.

### Phase 7a — Granger + panel VAR (H1, H2)

For every qualifying name: `statsmodels.tsa.stattools.grangercausalitytests` on `[popularity, search]` matrix with `maxlag=3`; report SSR *F*-test minimum *p* across lags. Pooled within-name demeaned panel VAR with AIC-selected lag (cap=3). Orthogonalized IRF with 95% Monte Carlo bootstrap CIs (200 replications). Multiple-testing: Benjamini–Hochberg FDR across the per-name *p* family; both raw and adjusted columns persisted.

### Phase 7b — Hawkes fits (Q4)

Univariate Hawkes per name with ≥10 years of bivariate data, exponential decay kernel; estimate $(\mu, \alpha, \beta)$. Branching ratio $\alpha/\beta$; half-life $\log 2 / \beta$. Pathological fits ($\alpha/\beta \geq 1$) capped at 10 and excluded from downstream analysis.

### Phase 7c — Bass fits (Q5)

Per-name Bass fit on adoption-curve segments ≥5 years via nonlinear least squares; (m, p, q). Classification rule: broadcast if `p > 0.01 AND p/(p+q) > 0.4`; peer if `q > 0.1 AND q/(p+q) > 0.7`; mixed otherwise. Stratify medians by `event_type` for cross-table reporting.

### Phase 8a — Synthetic controls per event (H5, H6)

For each of 200 events: donor pool of non-spiking names matched on pre-spike trajectory (3y), syllable count, phonetic neighborhood density, gender, origin. Convex weights by Abadie's MSPE-pre-treatment minimization. Treatment effect = focal trajectory − synthetic, t=0..+5y. Placebo distribution: same procedure on 1,000 random non-spiking names; empirical *p*-value per event. Heterogeneity regression with covariate set in `PHD_STUDY_SPEC.md` §4 (`is_lead_character`, `is_title_character`, `actor_popularity`, `budget`, `revenue`, `genres`, etc.). Pre-specified interactions: `is_lead_character × actor_popularity`; `is_title_character × budget`; (Animation/Family in `genres`) × `is_lead_character`. Gender sanity check: events where `actor_gender` opposes the name's dominant SSA sex are filtered or analyzed as a separate stratum.

### Phase 8b — Hill saturation with reactance (H7)

Standard Hill: `conversion = E_max * exposure^h / (EC50^h + exposure^h)`. Hill+reactance: add a γ term that allows non-monotonicity at high exposure. Fit on (revenue, spike magnitude, vote count) separately. H7 supported only if γ is significantly negative on at least one specification.

### Phase 9 — Variance decomposition (Q9–Q11)

Nested OLS on event-level ATE: Model A (event), Model B (+ name), Model C (+ phonetic), Model D (+ generation cycle). Report incremental R². Multicollinearity flag at VIF > 10 (current report flags cycle_cos/sin features at VIF > 1e5, plus log_budget/log_revenue at VIF ~40). Moderation tests for the seven side-quests from `PHD_STUDY_SPEC.md` §6 (Blockbuster, Villain, Streaming Lag, Award Window, Franchise Decay, Olympic Sprint vs Marathon, Gender Drift).

### Phase 10a — Geographic diffusion (H9)

Moran's I per year for top-500 names, state-adjacency weights. Era contrast pre-2015 vs ≥2015. Diffusion velocity in states per year for top-30 events; first-adopter coastal/interior classification.

### Phase 10b — Predictability ceiling (H8)

Train-on-2004–2014 features, test-on-2015–2024 entry-into-top-100 outcome. Models: Top-500 rule baseline, AR(1) rank baseline, full-feature logistic regression. Metrics: AUC, PR-AUC, Brier, P@K for K ∈ {50, 100, 200}.

---

## 8. Sample size and power

Power calculations are pre-registered for the headline confirmatory hypotheses where feasible.

**H1 (panel-VAR full-sample IRF).** N = 4,206 names, ~84,000 within-name demeaned observations. The 200-replication bootstrap CI is the inferential gate; analytical power for an IRF coefficient of the observed magnitude (~+0.006) at this N is effectively 1.0 against the null of zero — the relevant question is bias control, not power.

**H2 (subsample IRF asymmetry).** Smallest aspirational subsample is `event_celebrity_birth` (n=14); largest cautionary subsample is `event_news_event` (n=113). Power to detect IRF magnitudes in the ±0.02 range at these N is ≥0.80 by simulation (Phase 7a robustness notebook, run 2026-04-13).

**H4 (Welch *t* on 166K phonetic pairs vs 1,000 random controls).** Power against a null of equal means is essentially 1.0; the strict threshold (*p* < 1e-6) is a researcher choice to keep the test honest given the large sample, not a power concern.

**H5 (mean ATE_t3 across 200 events).** Per `PHD_STUDY_SPEC.md` §4.4 the 200-event panel is the pre-specified target. With a placebo distribution of 1,000, empirical *p*-value resolution is 0.001; under a true mean ATE of d=0.3 (Cohen's d on standardized birth-counts), power is ≈0.95 by simulation.

**H6 (lead vs supporting).** With ~57 lead-character events and ~73 supporting (TMDb-linked subset of `event_type ∈ {film_character, tv_character}`, n=130), one-sided permutation power against a within-arm SD difference of 0.4 is ≈0.85.

For H7 (Blockbuster Paradox), the pre-specified n is bounded by the events with valid revenue / vote-count / spike-magnitude features (currently 41/200 with revenue, 53/200 with vote count, 200/200 with spike magnitude). The h=1 sensitivity in the current fit (γ SE ~10⁻⁶) places the test below the threshold of detectable γ at conventional alphas — this is itself the registered finding.

---

## 9. Multiple-testing and alpha policy

| Family | Test | Correction | Primary alpha |
|---|---|---|---|
| Per-name Granger (H1 family) | ~5,000 tests | Benjamini–Hochberg FDR | α = 0.05 (`granger_significant_05_bh`) |
| Subsample panel-VAR IRFs (H2) | 9 subsamples | None — pre-specified contrasts; report all | α = 0.05 on h=1, h=2 CIs |
| Phonetic neighbor cross-correlations (H4) | One pooled Welch test | None | strict *p* < 1e-6 (researcher-set due to large *n*) |
| Phase 5 null-model thresholds (H3) | Per name-year | None — descriptive | descriptive only |
| Phase 8a per-event ATE (H5, H6) | 200 events | Empirical *p* via 1,000 placebos | α = 0.05 with placebo ≥ observed in <5% of replicates |
| Phase 8b Hill+reactance γ (H7) | 3 exposure measures | Bonferroni across 3 | α = 0.05/3 ≈ 0.0167 |
| Phase 9 moderation (Q11 family) | 9 moderators | Reported descriptively; none gated | α = 0.05 reported, none used as gate |
| Phase 10b model comparison (H8) | Descriptive | None | descriptive only |

Per-name tables consumed by product features (e.g. smart-list filters) **must** use BH-adjusted columns (`granger_significant_05_bh`), per the `phase7a_granger_causality.md` robustness section.

---

## 10. Stopping rules, ethics, and data access

**Data stopping.** SSA national + state files are released annually (typically May) for the prior calendar year. The canonical analysis re-runs once per SSA refresh cycle. No interim peeking against the registered hypotheses is performed within a refresh cycle.

**Compute stopping.** Phase 5 (1,000-replicate null simulation), Phase 7b (Hawkes fits), Phase 7c (Bass fits), and Phase 8a (synthetic controls × 200 × 1,000 placebos) are the expensive phases. They run on Modal (`baby-namer-research` app); a phase that fails to converge on >5% of units is flagged in `verify_phase<N>.py` and analyzed before downstream phases proceed.

**Ethics.** All datasets are public (SSA, GDELT, Google Trends, Books Ngrams, Wikipedia/Wikidata) or used under license (TMDb API key, OMDb API key). No human subjects. The LLM attribution pipeline (Claude Haiku) operates on public Wikipedia / OMDb evidence; outputs are reviewed against confidence thresholds before inclusion. Spike attribution to *real persons* (news_event, celebrity_birth, sports_moment) is published only when corroborating evidence (Wikipedia article, OMDb record, news cycle) is on file.

**Data access.** Service-role-only on the `research_*` Supabase namespace per `PHD_STUDY_SPEC.md` §4.4. RLS deny-by-default. Parquet artifacts live under the Modal volume `research-data` (738 MB+) per the `AGENTS.md` Modal runbook.

---

## 11. Deviations and amendments

This is the protocol's version-1.0 changelog. Any change to hypotheses, exclusion thresholds, sample windows, or primary tests after the registration date must be logged here as a dated row, and the version field bumped.

| Date | Component | Deviation | Rationale |
|---|---|---|---|
| 2026-04-29 | Registration | v1.0 published, frozen at commit 4f218f8. | First registration; codifies the protocol that produced reports under `docs/research/reports/` and the design queued in `PHD_STUDY_SPEC.md`. |
| — | H5 estimand | Phase 8a synthetic-control ATE is the registered estimand; current `cultural-diffusion.md` and `moderation_tests.md` use a 3-year pre/post adoption-lift precursor. | Phase 8a is in flight; the precursor is a pre-Phase-8 stand-in. No conflict — the precursor results stand as an exploratory pre-Phase-8 analysis; the registered confirmatory test runs against Phase 8a output. |
| — | H7 (Blockbuster Paradox) | Currently has *negative evidence* (γ non-significant on all three exposure measures); reported here as exploratory rather than confirmatory because it was originally proposed as a confirmatory hypothesis in `PHD_STUDY_SPEC.md` but the data did not support that framing. | Honesty about the state of evidence; reclassified as exploratory until additional data lifts γ above the alpha threshold. |
| — | H9 era boundary | Streaming era pre-specified as `year ≥ 2015`. | Choice fixed at registration; sensitivity at `year ≥ 2013` permitted only as exploratory. |
| — | Phase 11 report | The `phd_cultural_diffusion_<DATE>.md` final report is queued, not yet written. | Phase 11 generates the report from artifacts; it does not re-run analysis. |

---

## 12. Cross-references and reproducibility pointers

**Master design.** [`PHD_STUDY_SPEC.md`](../PHD_STUDY_SPEC.md) — full phase plan, directory structure, and database schema.

**Artifact freshness.** [`PIPELINE_STATUS.md`](../PIPELINE_STATUS.md) — byte sizes, last-updated stamps, divergence between Parquet snapshots and live Supabase.

**Per-phase reports.** [`reports/`](../reports/) — published findings per phase.

**Audience tiers.** [`reviews/`](../reviews/) — general-audience, peer-review, engineering, and product framings of the same findings.

**Bibliography.** [`bibliography.bib`](../bibliography.bib) and [`literature-map.md`](../literature-map.md).

**Modal entry points.** `cloud/modal_app.py` — `run_full_pipeline` chains Phases 1→11; per-phase functions per `AGENTS.md`.

**Phase scripts.** `scripts/python/research/phase{0..11}/`, with `verify_phase<N>.py` companions.

---

*Signed: Mike West, 2026-04-29. Repository: `people-analyst/baby-namer`. Frozen at commit `4f218f8`.*
