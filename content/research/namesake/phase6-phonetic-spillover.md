---
title: "Phonetic Spillover Analysis"
description: "Phase 6: phonetic neighborhood cross-correlation, clusters, Granger tests, and spillover magnitudes vs SSA panel."
publishedAt: "2026-04-10"
status: published
authors: ["Mike West"]
featured: true
---
# Phase 6 — Phonetic Spillover Analysis

**Generated:** 2026-04-12 00:48 UTC
**Sources:** `phonetic_spillover_results.parquet`, `phonetic_clusters.parquet`, `.phase6_checkpoint.json` (random control + Welch test).

## Key Findings

- **Phonetic pairs (rows):** 166,046
- **Mean cross-correlation (phonetic pairs):** 0.183707
- **Median cross-correlation (phonetic pairs):** 0.348612
- **Mean cross-correlation (random control, n=1000):** 0.065518
- **Welch t-statistic (phonetic vs random):** 7.207297
- **p-value (two-sided):** 1.11359e-12
- **Clusters:** 1,221

## Classification Breakdown (table)

### Pairwise correlation summary

| Metric | Value |
|--------|------:|
| Phonetic pairs | 166,046 |
| Mean \|cross-correlation\| (phonetic) | 0.183707 |
| Median (phonetic) | 0.348612 |
| Mean (random control) | 0.065518 |
| Welch t | 7.207297 |
| p-value | 1.11359e-12 |

### Top 5 clusters by avg_correlation

| cluster_name | size | avg_correlation |
|---|---:|---:|
| Idamae | 3 | 0.966704 |
| Ayako | 3 | 0.955235 |
| Buford | 3 | 0.938512 |
| Jerad | 3 | 0.929772 |
| Adolphus | 3 | 0.928625 |

## Methodology Notes

- **phonetic_spillover_results.parquet** columns: `name_a`, `name_b`, `edge_weight`, `cross_correlation`, `optimal_lag`, `granger_p_value`, `spillover_magnitude`.
- **phonetic_clusters.parquet** columns: `cluster_id`, `cluster_name`, `member_names`, `size`, `avg_correlation`, `leader_name`, `leader_peak_year`.
- **Welch t-test:** uses stored `control_corrs` and `t_test` from `.phase6_checkpoint.json` when present; otherwise recomputed from control correlations and phonetic-pair `cross_correlation`.
