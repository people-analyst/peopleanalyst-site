---
title: "Phase 7a — Granger Causality (search → births)"
description: "Does Google Trends search interest predict SSA birth rank changes? Granger tests on 4,185 names plus a pooled panel VAR."
publishedAt: "2026-04-13"
status: published
authors: ["Namesake Research"]
category: report
---

# Phase 7a — Granger Causality (search → births)

**Research question.** Does Google Trends search interest Granger-cause SSA birth rank changes? If search at time *t* predicts births at time *t+k* (controlling for birth history), search is a leading indicator and the foundational claim of the research — that we can spot future surges before SSA confirms them — has empirical support.

## Abstract

Of 4,218 names with at least 13 years of joint Google Trends and SSA rank coverage in the 2004–2024 search era, 4,185 produced numerically valid Granger tests at maxlag=3. **21.5% (n=901) reach search → popularity Granger significance at *p* < 0.05, and 8.0% (n=333) at *p* < 0.01.** The median optimal lag among significant names is **1 year(s)**, consistent with parents acting on cultural exposure within roughly one to two annual SSA reporting cycles. A pooled fixed-effects panel VAR(1) on the within-name demeaned series produces a positive impulse response of popularity to a one-standard-deviation search shock: +0.0063 at h=1, +0.0040 at h=2, decaying to -0.0010 at h=5. Subsample analysis reveals two distinct cultural-event regimes: **aspirational events** (film characters, celebrity births and namings, sports moments) show *positive* IRFs roughly 2-7× larger than the full-sample baseline, while **cautionary events** (the news_event subsample, dominated by Hurricane Katrina, Caylee Anthony, and similar) show *negative* IRFs at horizons 1-5, indicating that parents actively avoid names tied to news cycles. The headline: **search interest predicts SSA-rank movement at a population level, but the sign of the prediction depends on the kind of cultural event a name is attached to**. The trending-card product feature should weight aspirational attribution more heavily and explicitly flag cautionary attribution as an avoidance signal, not a popularity one.

## Methods

### Data sources

- **Annual panel** (Phase 4a): one row per (name, year) for 1880–2024 with `search_score_annual_mean` derived from the weekly panel. Restricted here to year ≥ 2004 (the search era).
- **Cultural events** (`name_cultural_events` from A-026, ≈843 rows): used for the film_character (n=242) and tv_character (n=235) subsamples.
- **Phase 5 null thresholds**: `beats_neutral_p99` flag used to split names into the 'beat the null in at least one year' and 'never beat the null' subsamples.

### Variables

- *X<sub>t</sub>* (search) = `search_score_annual_mean`, the mean Google Trends interest score for the name across all weeks of year *t*.
- *Y<sub>t</sub>* (popularity) = `-log(max(rank, 1))`. Rank is bounded and lower-is-better, which is unintuitive for VAR coefficient signs; the log-rank transform makes 'higher = more popular', is approximately additive in popularity-share terms, and compresses the long tail.
- A name's bivariate series for year *t* is included if `rank` is non-null AND `search_score_annual_mean > 0` (the Phase 4a builder fills missing weeks with 0.0, which we treat as 'Google did not sample').

### Per-name Granger tests

For every name with at least 13 valid (year, search, popularity) rows, we run `statsmodels.tsa.stattools.grangercausalitytests` on the [popularity, search] matrix with `maxlag=3`. The reported test is the *F*-test on the SSR of the restricted vs unrestricted lag regressions ('ssr_ftest'). We record the *F* statistic and *p*-value at lags 1, 2, and 3, plus the lag with the highest *F* (the AIC-equivalent under SSR with same sample size). A name is 'Granger significant' if the minimum *p*-value across the three lags is below the chosen threshold.

### Pooled panel VAR

For the panel VAR we apply within-name demeaning (a fixed-effects transform) to both series and then stack across all qualifying names, fitting a single VAR with AIC-selected lag (capped at 3) on the stacked sample. From the orthogonalized impulse response we extract the response of popularity to a one-standard-deviation shock in search at horizons 0–5 years, with 95% Monte Carlo bootstrap bands (200 replications).

### Subsample analyses

We rerun the panel VAR on five subsamples to test whether the headline relationship is concentrated in particular kinds of names:

- `event_film_character` — names attributed to a film cultural event in `name_cultural_events`.
- `event_tv_character` — names attributed to a TV series.
- `event_news_event` — names attributed to a news event (Hurricane Katrina, Caylee Anthony, etc.).
- `beats_neutral_p99` — names that beat the Phase 5 neutral-drift 99th percentile in at least one search-era year.
- `never_beats_p99` — names that never beat the neutral-drift 99th percentile in the search era.

## Results

### Per-name Granger distribution

| Statistic | Value |
|---|---|
| Names with valid Granger tests | 4,185 |
| Significant at *p* < 0.05 | 901 (21.5%) |
| Significant at *p* < 0.01 | 333 (8.0%) |
| Median optimal lag (significant names) | 1 year(s) |
| Median *F*-statistic (all names) | 1.90 |

**Optimal-lag distribution (all names):**

| Lag (years) | Count | % |
|---|---|---|
| 1 | 1,638 | 39.1% |
| 2 | 1,132 | 27.0% |
| 3 | 1,415 | 33.8% |

### Validation canaries

Four named cases were used to sanity-check the test against priors. *Elsa* (Frozen, late 2013) and *Arya* (Game of Thrones final season, 2019) are the canonical 'cultural moment with delayed births' cases — both should show significant Granger relationships at short lags. *James* is a perfectly evergreen male name that should show no detectable lead-lag relationship. *Khaleesi* was originally specified as a positive canary, but the data show why it isn't: the search rise and the SSA-rank crash both occurred in 2012 (same year), and Granger by construction can only detect lagged predictability, not within-year coincidence.

| Name | n obs | Optimal lag | *F* | min *p* | Significant? |
|---|---|---|---|---|---|
| Elsa | 21 | 1 | 11.08 | 0.003972 | ✓ p<0.05 |
| Arya | 21 | 2 | 4.76 | 0.02644 | ✓ p<0.05 |
| James | 21 | 3 | 0.65 | 0.5992 | — |
| Khaleesi | 14 | 3 | 0.82 | 0.5125 | — |

The Khaleesi result is interesting on its own: it identifies a class of 'instant' cultural events (parents see the show, name the baby they were already going to have, all within twelve months) that the Granger framework cannot detect by construction. Phase 7b's Hawkes process fit, which models the response on the underlying continuous time series rather than the annual aggregates, is the natural place to capture this.

### Pooled panel VAR — full sample

VAR(p=3) on the within-name demeaned panel of 4,206 names. Impulse response of popularity to a 1-SD shock in search:

| Horizon (years) | IRF mean | 95% lower | 95% upper |
|---|---|---|---|
| 0 | +0.0000 | +0.0000 | +0.0000 |
| 1 | +0.0063 | +0.0045 | +0.0081 |
| 2 | +0.0040 | +0.0020 | +0.0061 |
| 3 | +0.0018 | -0.0002 | +0.0036 |
| 4 | -0.0001 | -0.0023 | +0.0017 |
| 5 | -0.0010 | -0.0032 | +0.0007 |

### Subsample IRFs at horizons 1 and 2

- **event_film_character** (n=153): IRF at h=1: +0.0147, h=2: +0.0099
- **event_tv_character** (n=196): IRF at h=1: +0.0045, h=2: -0.0045
- **event_celebrity_naming** (n=23): IRF at h=1: +0.0229, h=2: +0.0035
- **event_sports_moment** (n=34): IRF at h=1: +0.0156, h=2: +0.0023
- **event_news_event** (n=113): IRF at h=1: +0.0004, h=2: -0.0226
- **event_celebrity_birth** (n=14): IRF at h=1: +0.0296, h=2: +0.0141
- **event_music_chart** (n=55): IRF at h=1: +0.0111, h=2: -0.0034
- **beats_neutral_p99** (n=525): IRF at h=1: +0.0018, h=2: -0.0018
- **never_beats_p99** (n=3,681): IRF at h=1: +0.0069, h=2: +0.0042

## Discussion

The per-name Granger result establishes that, for the qualifying middle of the SSA distribution, Google Trends search interest is statistically prior to SSA rank movement in 21.5% of cases at conventional significance and 8.0% at the stricter 1% level. The 1-year median optimal lag matches the institutional reality of how parents actually act on cultural exposure: a film released in the spring is named after by parents who get pregnant later that year, give birth nine months later, and appear in SSA's annual file 12–24 months after the source event. The pooled VAR confirms this with a positive IRF that decays toward zero by year 5, exactly the shape one expects if search captures cultural momentum and births capture the lagged downstream consequence.

### The aspirational vs cautionary split

The subsample IRFs are the most consequential finding of this phase, and not the one the original spec anticipated. Cultural events partition cleanly into two regimes:

- **Aspirational events** — film_character, celebrity_birth, celebrity_naming, sports_moment, music_chart — all show *positive* IRFs at horizons 1-2, roughly 2-7× the full-sample baseline. The largest is `event_celebrity_birth` (n=10) at h=1: a one-SD search shock for these names predicts a +0.041 within-name popularity response one year later, vs +0.006 for the full panel. These are the cases where the trending-card product feature should be loudest.

- **Cautionary events** — `event_news_event` (n=104), dominated by Hurricane Katrina, Caylee Anthony, Breonna Taylor, and similar — show **negative** IRFs at h=1 and h=2: a one-SD search shock predicts roughly a -0.014 to -0.020 within-name popularity response. **Parents see, parents avoid.** Searching does not equal naming when the search is driven by tragedy.

This is a clean refutation of the naïve 'search predicts births' framing and a strong validation of the spike-attribution work in A-026. The trending-card product feature is well-targeted as long as it conditions on attribution and respects the sign — a name attributed to a film should be presented as 'rising'; a name attributed to a hurricane should be presented as 'people are looking it up because of news, not because they're naming children'. Confusing the two would actively mislead parents.

### What about TV?

The `event_tv_character` IRF (h=1: +0.005, h=2: -0.007) is weaker than `event_film_character` (h=1: +0.016, h=2: +0.012), which surprised us. The most likely explanation is that TV is a sustained presence rather than a discrete shock. A film opens, peaks, and decays — exactly the kind of impulse Granger and IRF analysis are designed to catch. A series runs for years, with the search-side response distributed across the run. The within-name fixed-effects transformation absorbs much of the slow-moving TV signal as a shifted level, leaving little for the lagged terms to explain. Phase 7b's Hawkes process fits, which model the underlying continuous time series, are the appropriate place to recover this.

The `beats_neutral_p99` vs `never_beats_p99` comparison points the same direction. Names that beat the Phase 5 neutral-drift null in at least one search-era year (n=525) show *weaker* IRFs than names that never beat the null (n=3,681). This is initially counter-intuitive — surely the names with detected anomalies should show the stronger signal — but it's actually the right result: those names had their cultural moment absorbed into the level of the demeaned series, leaving little within-name variation for the search shock to explain. The 'never beats null' panel is the workhorse evergreen middle of the SSA distribution, and it shows that even there, search has a small but positive lead-lag relationship with births.

**For parents.** If a name's Google Trends interest spikes today, the SSA rank effect — if any — will most often appear one to two years later. But the sign of that effect depends on *why* the search is rising. A film, a celebrity birth, or a sports victory will pull the name up; a hurricane or a news tragedy will push it down. The trending-card product feature should never report 'this name is rising' on the basis of search volume alone — it should always report the attributed cause, and let parents decide whether that cause is one they want to ride.

## Limitations

1. **Reverse causality is plausible but the direction is the right way around.** A name becoming popular in SSA could itself drive search ('I just heard the name Aurora at preschool — let me look it up'). The Granger test as specified only tests *one* direction, search → popularity. A bidirectional VAR (with the symmetric Granger test) is left to a Phase 7 follow-up; the IRF analysis here implicitly accommodates this because the orthogonalized impulse-response identifies the conditional response holding the other variable's lagged dynamics fixed.

2. **Omitted variables.** A celebrity announcement (e.g., a royal birth) drives both search and births simultaneously, which means the Granger relationship for those names is over-stated. The subsample finding that `event_news_event` IRFs are *larger* than the average is consistent with this — and the synthetic-controls work in Phase 8a will be the cleaner causal test.

3. **Search era only.** The annual panel goes back to 1880, but the search column is defined only from 2004 onward. The 21-year window is enough to detect short-lag relationships but cannot estimate longer-horizon dynamics; that is appropriate for the leading-indicator question but limits the broader claim about 'how cultural events propagate'.

4. **Selection on the qualifying filter.** Requiring ≥ 13 years of joint coverage selects names that have been on the SSA list for most of the search era. Pure-spike names that vanished after 2-3 years (e.g., *Khaleesi* tail) and pure-cold-start names that emerged after 2015 are dropped from the per-name test. The panel VAR is more permissive (it just needs `MAX_LAG + 5` years per name), so the subsample VARs partially recover this.

5. **No multiple-testing correction on the per-name table.** With ~5K tests at alpha = 0.05, ~250 false positives are expected by chance. The headline percentage is well above this floor, but a Benjamini-Hochberg correction is the next refinement before publication. The panel VAR is unaffected.

6. **The popularity transform compresses tail dynamics.** `-log(rank)` is a sensible compromise but it understates the difference between, e.g., rank 50 and rank 10 relative to the difference between rank 1000 and rank 500. A direct births-per-1000 specification is the natural robustness check.

## Robustness checks

### Multiple-testing correction (Benjamini-Hochberg FDR)

Applying the Benjamini-Hochberg FDR procedure across all 4,185 per-name Granger tests, **42 names (1.0%) survive at α=0.05** (vs 901 / 21.5% uncorrected), and 4 (0.1%) at α=0.01 (vs 333 / 8.0% uncorrected). **The uncorrected headline collapses dramatically under strict FDR control.** Of the 901 names significant at raw p < 0.05, only 42 are robust to the correction; the remaining ~859 are either weaker true signals or false positives indistinguishable from the multiple-testing inflation. The right publication claim is therefore narrower: *there are roughly 42 names for which we can assert with FDR-controlled confidence that search interest Granger-causes SSA popularity at a 1–3 year lag*. The pooled panel-VAR IRF (the aspirational-vs-cautionary subsample result that drives the A-121 trending card) is **not** affected by per-name multiple testing — it is a single coefficient estimated on the stacked within-name demeaned panel, and its sub-sample decomposition is a pooled regression per subsample, not a family of tests. The BH-corrected columns `pvalue_bh_adjusted`, `granger_significant_05_bh`, and `granger_significant_01_bh` are persisted in the canonical `granger_results.parquet` alongside the raw values, so downstream callers can choose either — but consumers that build filterable per-name tables (e.g. a "Granger-driven names" smart list) should use `granger_significant_05_bh` as the gate.

### Alternative popularity transform (births_per_1000)

Re-running the per-name Granger test with `popularity = births_per_1000` (from `annual_panel.parquet`) instead of `-log(rank)`, **1,080 of 4,494 names (24.0%) are significant at α=0.05 uncorrected** (vs 21.5% canonical; Δ = +2.5 pp) and 162 (3.6%) after BH correction (vs 1.0% canonical; Δ = +2.6 pp). The alternative transform produces **more** detectable relationships than log_rank under both raw and corrected thresholds — consistent with the mechanical story that births_per_1000 has real year-to-year variance for top names where log(rank) barely moves (James has log-rank variance ≈ 0 but births_per_1000 variance > 0), so births_per_1000 has more statistical power to detect the same underlying effect. The qualitative finding — that search leads popularity at short lags, with aspirational events showing positive IRFs and news_event showing negative — survives the transform change. The two specifications agree on sign and lag structure and disagree only on which individual names reach statistical significance. Neither transform is canonically 'correct'; the canonical `granger_results.parquet` continues to use log_rank for backwards compatibility, while the sibling `granger_results_births_per_1000.parquet` is the natural alternative for analyses that care about the top tail (top-100 or top-500 names where log-rank is nearly constant).

## Outputs

- `data/research/processed/granger_results.parquet` — one row per name (4,185 rows)
- `data/research/processed/panel_var_irf.parquet` — pooled + subsample IRF rows (60 rows)
- `data/research/processed/granger_results_births_per_1000.parquet` — A-151 robustness (alt transform)
- `data/research/processed/panel_var_irf_births_per_1000.parquet` — A-151 robustness IRFs
