---
title: "Phase 7b — Hawkes Self-Exciting Process Fits"
description: "How long a cultural shock keeps echoing through baby naming: branching ratios and half-lives from 6,328 Hawkes process fits."
publishedAt: "2026-04-13"
status: published
authors: ["Namesake Research"]
category: report
---

# Phase 7b — Hawkes Self-Exciting Process Fits

## Overview

- **Names fit:** 6,328
- **Converged:** 6,326 (100.0%)
- **Failed to converge:** 2
- **Stable (branching ratio < 1):** 6,033
- **Pathological (branching ratio >= 1):** 293

## Parameter Distributions (converged fits)

### Branching Ratio (alpha/beta)

| Stat | Value |
|------|-------|
| Mean | 0.5345 |
| Median | 0.2411 |
| Std | 1.4748 |
| P5 | 0.0000 |
| P25 | 0.0000 |
| P75 | 0.5476 |
| P95 | 0.9755 |

### Half-Life (weeks)

| Stat | Value |
|------|-------|
| Mean | 1402526.5117 |
| Median | 1.3860 |
| Std | 9760257.4699 |
| P5 | 0.5766 |
| P25 | 0.8645 |
| P75 | 4.4342 |
| P95 | 20.8673 |

### Background Rate (mu)

| Stat | Value |
|------|-------|
| Mean | 0.0665 |
| Median | 0.0645 |
| Std | 0.0397 |
| P5 | 0.0113 |
| P25 | 0.0308 |
| P75 | 0.0970 |
| P95 | 0.1332 |

### Excitation (alpha)

| Stat | Value |
|------|-------|
| Mean | 0.0750 |
| Median | 0.0526 |
| Std | 0.0831 |
| P5 | 0.0000 |
| P25 | 0.0000 |
| P75 | 0.1162 |
| P95 | 0.2426 |

### Decay Rate (beta)

| Stat | Value |
|------|-------|
| Mean | 0.5413 |
| Median | 0.5001 |
| Std | 0.4637 |
| P5 | 0.0332 |
| P25 | 0.1563 |
| P75 | 0.8018 |
| P95 | 1.2020 |

### Branching Ratio (stable fits only, < 1)

- Mean: 0.2853
- Median: 0.2128
- Std: 0.2820

## Stratification by Event Type

| Event Type | N | Branching Ratio (med) | Half-Life weeks (med) | Stable % |
|-----------|---|----------------------|----------------------|----------|
| no_event | 5561 | 0.2956 | 1.61 | 95.3% |
| tv_character | 244 | 0.0000 | 0.75 | 95.9% |
| film_character | 223 | 0.0000 | 0.81 | 97.8% |
| news_event | 132 | 0.0000 | 1.09 | 94.7% |
| music_chart | 67 | 0.0000 | 0.99 | 95.5% |
| sports_moment | 56 | 0.0000 | 0.71 | 89.3% |
| celebrity_naming | 20 | 0.0260 | 0.85 | 95.0% |
| celebrity_birth | 11 | 0.0000 | 0.65 | 100.0% |
| royal_event | 5 | 0.0000 | 0.59 | 100.0% |
| unknown | 3 | 0.0000 | 0.62 | 66.7% |
| video_game | 2 | 0.0686 | 1.08 | 100.0% |
| book_character | 1 | 0.2138 | 1.39 | 100.0% |
| video_game_character | 1 | 0.4685 | 1.36 | 100.0% |

## Diagnostic Notes

- Branching ratio < 1 indicates a stable (sub-critical) process where shocks decay.
- Branching ratio >= 1 indicates a super-critical process (fit likely pathological).
- Half-life measures how long the memory of a shock persists.
- Pathological fits (branching ratio capped at 10) are excluded from downstream analysis.
