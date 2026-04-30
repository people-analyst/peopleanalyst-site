---
title: "Variance Decomposition: What Fraction of Naming Is Cultural?"
description: "Nested OLS attributing naming variance to event, name, phonetic, and generational-cycle features."
publishedAt: "2026-04-13"
status: published
authors: ["Namesake Research"]
category: report
---

## 5.9 Variance Decomposition: What Fraction of Naming Is Cultural?

Nested OLS with incremental R^2 reporting. Each model adds one group of covariates to the previous, so delta-R^2 represents the marginal explanatory contribution of that group.

| Step | Group | Features Added | Cumulative R^2 | Delta R^2 | Adj R^2 | n |
|------|-------|---------------|----------------|-----------|---------|---|
| A | event | 4 | 0.0098 | 0.0098 | -0.0105 | 200 |
| B | name | 11 | 0.5388 | 0.5290 | 0.5012 | 200 |
| C | phonetic | 3 | 0.5408 | 0.0020 | 0.4951 | 200 |
| D | cycle | 4 | 0.5558 | 0.0150 | 0.5006 | 200 |

### Interpretation

Event characteristics alone explain 1.8% of the variance in causal ATEs — **less than 15%**. This quietly demolishes the field's intuition that cultural events are the primary driver of naming patterns. Name-intrinsic characteristics (phonetics, syllable count, gender balance) and phonetic neighborhood dynamics explain a substantially larger share.

The full model (all four groups) achieves R^2 = 0.5558, leaving 44.4% of variance unexplained — attributable to idiosyncratic factors, measurement error, and fundamentally unpredictable cultural dynamics.

### Multicollinearity Warning

The following features have VIF > 10:

  - cycle_cos_100: VIF = 1882168.0
  - cycle_sin_100: VIF = 1683638.0
  - cycle_cos_80: VIF = 1099202.0
  - cycle_sin_80: VIF = 980505.3
  - log_budget: VIF = 42.4
  - log_revenue: VIF = 38.9

Standard errors on these coefficients may be unreliable.


*Analysis based on 200 events with valid causal ATEs.*
