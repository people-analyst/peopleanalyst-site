## 5.9 Variance Decomposition: What Fraction of Naming Is Cultural?

Nested OLS with incremental R^2 reporting. Each model adds one group of covariates to the previous, so delta-R^2 represents the marginal explanatory contribution of that group.

| Step | Group | Features Added | Cumulative R^2 | Delta R^2 | Adj R^2 | n |
|------|-------|---------------|----------------|-----------|---------|---|
| A | event | 4 | 0.0104 | 0.0104 | -0.0098 | 200 |
| B | name_matching | 4 | 0.5093 | 0.4989 | 0.4887 | 200 |
| C | name_independent | 7 | 0.5181 | 0.0088 | 0.4788 | 200 |
| D | phonetic | 3 | 0.5222 | 0.0041 | 0.4747 | 200 |
| E | cycle | 1 | 0.5223 | 0.0001 | 0.4718 | 200 |

### Interpretation

Event characteristics alone explain R² = 0.0104 of variation in the per-event synthetic-control divergence (the `ate_t2` column). The full model with all four groups reaches R² = 0.5223.

**A-209 caveat on the `name_matching` block.** The `name_matching` block's ΔR² of 0.4989 is *partly tautological*: those features (syllable count, log_pre_rank, pre_spike_trajectory_3yr, phonetic_neighborhood_size) are inputs to the Phase 8a synthetic-control donor matching. A well-fit donor pool mechanically reduces the divergence variance left over for those variables to explain. The honest comparison is event ΔR² vs `name_independent` + `phonetic` + `cycle` ΔR², where the name features are independent of the matching procedure.

Residual variance: 47.8% — attributable to idiosyncratic factors, measurement error, SUTVA-violation noise from phonetic spillover (see A-208), and fundamentally unpredictable cultural dynamics.

### Multicollinearity Warning

The following features have VIF > 10:

  - log_budget: VIF = 40.9
  - log_revenue: VIF = 38.1

Standard errors on these coefficients may be unreliable.


*Analysis based on 200 events with valid causal ATEs.*
