---
title: "Lieberson Null Model Results"
description: "Full-scale Phase 5 analysis: 1.95M threshold rows across 46,412 names, 145 years of SSA data. Neutral drift + phonetic fashion null models with Wright-Fisher calibration."
publishedAt: "2026-04-10"
status: published
authors: ["Mike West"]
featured: true
---
# Phase 5 — Lieberson Null Model Results

**Generated:** 2026-04-12 00:48 UTC
**Pipeline step:** Phase 5 (null model) — body regenerated from `null_model_summary.json` + `null_model_thresholds.parquet`.

## Key Findings

- **Total name-year rows (thresholds parquet):** 1,950,660
- **Unique names (summary JSON):** 46,412
- **Names classified (≥10 SSA years, bucketed):** 46,412
- **Innovation rate (μ):** 0.050455
- **N_e (female):** 9,852
- **N_e (male):** 22,320
- **Average observed turnover per decade:** 23.4%
- **Share of name-years beating neutral drift at p95:** 4.57%
- **Share of name-years beating neutral drift at p99:** 2.83%
- **Share of name-years beating phonetic null at p95:** 5.27%
- **Share of name-years beating phonetic null at p99:** 3.74%

## Classification Breakdown (table)

Buckets use the share of years (aggregated across sexes) where `beats_neutral_p99` is true, for names with **at least 10** distinct SSA years:

| Bucket | Names |
|--------|------:|
| drift-consistent | 39,055 |
| partially-cultural | 6,743 |
| culturally-influenced | 390 |
| strongly-cultural | 224 |
| **Total** | **46,412** |

## Methodology Notes

- **Parquet columns used:** `name`, `year`, `beats_neutral_p99` on `null_model_thresholds.parquet`.
- **Year-level beat:** for each `(name, year)`, `beats_neutral_p99` is the logical OR across sex rows for that name-year.
- **Per-name fraction:** mean of year-level beats over all years with data for that name (among names with ≥10 years).
- **Bucket thresholds:** `<5%` drift-consistent; `5–19%` partially-cultural; `20–39%` culturally-influenced; `≥40%` strongly-cultural.
- **Summary metrics** (μ, N_e, turnover, % beating nulls) are read from `null_model_summary.json`.
