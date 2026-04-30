---
title: "Methodology"
description: "Data sources, analytical methods, and limitations for the Namesake research pipeline."
status: published
publishedAt: 2026-04-11
authors: ["Mike West"]
featured: true
---

## 1. Data sources

The Namesake research pipeline combines internal Supabase snapshots, bulk external downloads, and live API enrichment. The architecture follows the staged, disk-first design in `docs/research/PHD_STUDY_SPEC.md`: each phase writes Parquet before the next phase reads it, so analysis is reproducible even when production tables move forward. Unless noted, row counts reflect the latest materialized Parquet snapshots under `data/research/` (see `docs/research/PIPELINE_STATUS.md` for byte sizes, update times, and divergence notes against live Supabase).

**SSA national births (1880–2024).** The Social Security Administration national file provides name × year × sex counts. The research snapshot contains **2,149,477** rows (`external/ssa_national_year.parquet`). **Refresh cadence:** SSA releases a new annual file each spring (typically May) for the prior calendar year; we re-snapshot when updating the study.

**SSA state-level births (1910–2024).** State-by-year counts enable geographic diffusion work. **6,600,640** rows (`external/ssa_state_year.parquet`). **Refresh cadence:** aligned with the national file release.

**CMU Pronouncing Dictionary.** ARPAbet pronunciations for English lexical items and many proper names. **126,052** entries (`external/cmu_pronouncing_dict.parquet`). **Refresh cadence:** static upstream release; we rebuild only when the CMU source or our g2p fallback pipeline changes.

**Google Trends.** Weekly search-interest series back to the modern Trends era, joined to names in our corpus. The Trends snapshot holds **7,941,450** weekly rows in the on-disk extract; **32,516** distinct names have been scored through the pipeline’s fetch and normalization passes (the operational target treats broad name coverage as a first-class metric—see pipeline blockers in `PIPELINE_STATUS.md` when the live table and Parquet diverge). **Refresh cadence:** ongoing incremental pulls with rate limiting and caching; full re-pulls are scheduled when expanding coverage or closing snapshot gaps.

**Google Books Ngrams (English / English fiction).** Token-level annual frequencies for book-culture baselines and long-horizon comparison. **5,800,721** name-token matches (`external/google_ngrams_names.parquet`). **Refresh cadence:** tied to Google’s Ngrams corpus versions; bulk re-ingest is occasional (not real-time).

**GDELT.** Daily news-mention volume by name for an independent attention channel versus search. **9,212** rows in the current Parquet (`external/gdelt_name_mentions.parquet`). **Refresh cadence:** batch backfills and incremental updates as Phase 2 scripts are re-run.

**Wikipedia and Wikidata.** Wikipedia search and pageview utilities support attribution evidence and character-page signals; Wikidata SPARQL links IMDb identifiers to stable entities for downstream joins (`scripts/python/research/phase2_external/d04_wiki_pageviews.py`, `d05_wikidata_links.py`). Row counts vary by scrape window; the layer is primarily **API-driven at attribution time** rather than a single static row count.

**OMDb.** Film and TV metadata (release dates, genres, plots) feed spike attribution (`scripts/attribute_spikes.py`). A bulk title cache exists in principle (`d09_omdb_full_cache.py`); production use is **request-cached** during attribution runs. **Refresh cadence:** on-demand per attribution batch and when expanding the cache job.

**TMDb.** Cast order, billing, and character roles (lead vs supporting) enrich film and TV events (`d10_tmdb_titles.py`, `d10b_tmdb_event_cast.py`). **Refresh cadence:** API-backed; re-run when extending cast coverage or reconciling unresolved IMDb identifiers.

Together, these sources feed Phases 1–6 of the pipeline described in `docs/research/PHD_STUDY_SPEC.md`.

## 2. Cultural event attribution

**Spike detection** precedes attribution. `scripts/detect_spikes.py` scans each name’s smoothed weekly Trends series for prominent peaks. A candidate spike must clear a **minimum magnitude of +75%** above a pre-spike baseline and meet a **scipy peak-prominence threshold of 15** (with additional duration and baseline windows so that slow drifts are not labeled as discrete spikes). Detected spikes are written to `name_spike_events` and passed to attribution.

**LLM synthesis** uses **Claude Haiku** (`claude-haiku-4-5-20251001` in code) after OMDb and Wikipedia evidence gathering. The user message is assigned to `prompt` as below—verbatim from `scripts/attribute_spikes.py` (including Python f-string placeholders and doubled braces in the JSON example):

```
    prompt = f"""You are analyzing why the baby name "{name}" spiked +{spike_magnitude:.0f}% in Google search interest around {spike_date} (year {spike_year}).

Evidence gathered:
{evidence_text}

Based on this evidence and your knowledge of popular culture in {spike_year}, determine:
1. What most likely caused this search spike?
2. How confident are you? (high/moderate/low)

Return ONLY valid JSON:
{{
  "event_type": "film_character|tv_character|celebrity_birth|celebrity_naming|royal_event|sports_moment|music_chart|book_character|news_event|unknown",
  "event_title": "Name of the film/show/event",
  "event_subtitle": "Brief subtitle (e.g., 'Disney animated film' or 'Netflix drama')",
  "event_description": "1-2 sentence description of the event",
  "character_name": "Character name if applicable, else null",
  "person_name": "Real person's name if applicable, else null",
  "release_date": "YYYY-MM-DD if known, else null",
  "confidence_score": 0.0-1.0,
  "confidence_label": "High|Moderate|Low",
  "evidence_summary": "Brief explanation of why you believe this caused the spike",
  "display_text": "One compelling sentence for display on the name profile. E.g.: 'Elsa surged after Disney\\'s Frozen premiered in November 2013, bringing the name to a new generation of parents.'"
}}

If you cannot identify a cause with at least low confidence, set event_type to "unknown" and confidence_score to 0.1."""
```

**Confidence scores** on accepted attributions span **0.35–0.99** with a **median near 0.72**. The corpus contains **1,121** attributed events across **nine** `event_type` values (the JSON schema above), after filtering and deduplication against spike geometry and database constraints.

## 3. Lieberson null model (Phase 5)

Phase 5 implements a **neutral drift** benchmark in the Lieberson / Hahn–Bentley tradition: names evolve as if popularity were copied with **no cultural “fitness” differences**, producing a distribution of rank movements and turnover against which observed trajectories are compared. The point is not to deny culture—it is to **quantify how much churn arises from “random copying” alone** so that event studies and spillover analyses have a defensible baseline. A companion **phonetic-fashion** null incorporates Berger-style neighborhood pull without reference to films, news, or celebrities; divergence between the two nulls flags how much structure sits in sound communities versus generic drift.

Effective population sizes are estimated separately by sex: **N_e_F = 9,852** and **N_e_M = 22,320** (rounded from the fitted posteriors in `data/research/processed/null_model_summary.json`). Simulated null quantiles are joined to every name-year row; each name is then placed into one of **four** buckets: **strongly-cultural**, **culturally-influenced**, **partially-cultural**, and **drift-consistent**—reflecting how often observed ranks exceed neutral (and phonetic) null thresholds. **46,412** unique names receive a classification in the shipped artifact consumed by the app (`lib/null-model.ts`).

Scripts: `scripts/python/research/phase5_null_model/fit_null_model.py` orchestrates `fit_neutral_drift.py`, `fit_phonetic_fashion.py`, and `simulate_nulls.py`, with verification in `verify_phase5.py`. Primary outputs live under `data/research/processed/` (for example `null_model_thresholds.parquet` and `null_model_summary.json`).

## 4. Granger causality (Phase 7a)

Phase **7a** tests whether **search Granger-causes births** at the name level using a **panel VAR** framework on the merged annual/weekly panels. For each name with enough overlapping history, search and birth series enter a vector autoregression; **Granger block-exogeneity tests** ask whether lags of search improve prediction of births beyond lags of births alone (and vice versa). **Impulse response functions** trace how a one-standard-deviation innovation to search propagates into future birth counts—this is where **aspirational** (fiction, sports) and **cautionary** (tragedy, controversy) event families diverge in sign.

**4,185** names have sufficient data for testing. **21.5%** show significance at **p < 0.05**; the **median optimal lag is one year** after model selection across names. Because the same hypothesis is evaluated thousands of times, we report **Benjamini–Hochberg**-adjusted inference alongside raw p-values; the **BH-adjusted rate is 1.0%** at the stated threshold—substantially tighter than the nominal 21.5%, as expected under multiple testing. IRFs split **aspirational** media or sports-driven patterns (positive responses at short horizons) from **cautionary** news-associated names (negative IRFs at comparable horizons), matching the asymmetry discussed in the cultural diffusion report.

Implementation: `scripts/python/research/phase7_timeseries/granger_panel.py` with `verify_phase7.py`. Phase **7b** (Hawkes self-exciting processes on event timing) and **7c** (Bass diffusion fits) live alongside Phase 7a for complementary dynamics; they are documented in the operator README even when outputs are still pending in `PIPELINE_STATUS.md`.

## 4a. Missing Google Trends data — NaN convention (A-200)

The annual panel covers **1880–2024** but Google Trends data only exists from **2004**. We distinguish three cases in `search_score_annual_mean`:

- **Real positive reading**: Google sampled the (name, year) and reported non-zero interest. Stored as the value Google returned (an annual mean across the year's weeks).
- **Real zero reading**: Google sampled the (name, year) and reported zero interest in every week of that year. Stored as `0.0` (a meaningful low-attention signal — kept, not dropped).
- **No data**: No row exists in `name_search_trends` for the (name, year). This includes every pre-2004 row and any (name, year) Google never returned. Stored as `NaN`.

Granger and Bass downstream paths treat `NaN` as "drop this row" but treat `0.0` as a valid observation. Earlier pipeline runs filled missing weeks with `0.0`, which biased annual aggregates toward zero across the entire pre-2004 era; that bias is removed at the source as of A-200 (commit history will show the cutoff date).

## 4b. Reproducibility (A-203)

Two non-determinism sources have been pinned:

- **Phase 5 N_e calibration** previously seeded the per-config RNG with `RNG_SEED + 7 + hash(cfg["key"]) % 10000`. Python's built-in `hash()` is randomized per interpreter start unless `PYTHONHASHSEED` is fixed; Modal containers don't pin it. Each Phase 5 run therefore drew different (sex, decade) calibration trajectories, and the published $N_e^F$ / $N_e^M$ shifted by single-digit names per re-run. Replaced with a SHA-1-derived offset that is stable across runs on any machine. The Modal image also sets `PYTHONHASHSEED=0` as belt-and-braces.
- **Phase 7a IRF stderr bands** are produced by `statsmodels.tsa.api.IRAnalysis.errband_mc(orth=True, repl=200)`, which draws bootstrap simulations from numpy's global RNG with no seed argument. We now seed `np.random.seed(11_207)` immediately before the call. Each `fit_panel_var` invocation (full panel + 9 subsamples) gets the same seed; bootstrap simulations differ across subsamples because the underlying fitted VARs differ, but each (subsample, run) pair is reproducible.

## 5. Reproducibility

- **Python environment:** `scripts/python/.venv` (see `scripts/python/research/README.md`). Activate with `scripts/python/.venv/bin/python` for all phase scripts.
- **Data root:** `data/research/` — `raw/` (Phase 1), `external/` (Phase 2), `derived/` (Phases 3–4), `processed/` (Phases 5–6), plus `_state/` resume tokens and `logs/research/` for structured logs.
- **Phase entry points:** Phase 1 `phase1_internal_snapshot/snapshot_supabase.py`; Phase 2 `phase2_external/d01_*.py` … `d15_*.py`; Phase 3 `phase3_phonetic/decompose_phonemes.py`, `build_neighborhood_graph.py`; Phase 4 `phase4_panel/build_annual_panel.py`, `build_weekly_panel.py`, `build_event_panel.py`; Phase 5 `phase5_null_model/`; Phase 6 `phase6_spillover/spillover_analysis.py`; Phase 7 `phase7_timeseries/granger_panel.py` (and siblings); Phases 8–11 per the README table.
- **Attribution and spikes (outside the numbered phase folder):** `scripts/detect_spikes.py`, `scripts/attribute_spikes.py`.

Re-running a phase uses JSONL checkpoints in `data/research/_state/` so jobs are safe to interrupt and resume. The operator manual (`scripts/python/research/README.md`) documents `--dry-run`, `--limit`, and the recommended order: Phase 0 scaffolding through Phase 11 report generation, with Phase 2 sub-sources ordered to unblock phonetics (CMU) before slow bulk pulls (Ngrams, GDELT).

## 6. Limitations

**Coverage gaps in Parquet snapshots.** Internal dumps can lag production; `name_rank_history` has been observed at roughly **60%** row alignment relative to live expectations in some audits, and **Google Trends** Parquet coverage is about **75%** of the database row count until a full re-snapshot completes—interpret cross-source comparisons cautiously during backfill. When `PIPELINE_STATUS.md` flags divergence, prefer the database counts for operational decisions and treat Parquet as a frozen analysis artifact until the next verified snapshot.

**API and identifier hygiene.** **23** TMDb-linked **imdb_id** values remain unresolved after reconciliation; cast and role metadata may be incomplete for those titles, which weakens lead/supporting character covariates for the affected events.

**Temporal resolution.** Annual SSA data and weekly search data **cannot resolve within-year ordering** of shocks. Standard Granger tests at annual frequency **miss same-year mediation**; Phase **7b Hawkes** models on higher-frequency event timing are intended to address shorter-horizon contagion and self-excitation that VARs at annual grain blur together.

**Causal language.** Granger causality is **predictive**, not structural. Event attribution relies on LLM judgment plus media metadata; residual confounding and missed events always remain. Synthetic-control ATEs (Phase 8, when available) narrow but do not eliminate observational bias.

**Scope.** Results describe **U.S. SSA–registered births** and U.S.-centric media; they do not fully describe global naming, immigration-driven adoption, or informal names never registered with SSA.

Further detail and roadmap ordering: `docs/research/PHD_STUDY_SPEC.md`. Live row counts and snapshot health: `docs/research/PIPELINE_STATUS.md`.
