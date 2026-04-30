# Monte Carlo Simulation Engine

**Type:** algo
**Origin repo(s):** voi-calculator (standalone wizard), people-analyst (VOI + compensation), anycomp (scenario modeling), decision-wizard (embedded analytical)
**Extraction readiness:** copy-paste bundle (algorithm is clean; integration is per-app)
**Depends on:** none (this is a leaf algorithm)
**Last reviewed:** 2026-04-24

## What it is

Deterministic-seeded stochastic simulation over a set of uncertain inputs. For each of N iterations: sample each input from its distribution (normal / uniform / triangular / custom), apply cross-variable dependencies (Spearman correlation or formula graph), compute the target expression, record. Summarize across iterations: percentile bounds (P5/P50/P95), mean, Expected Value of Perfect Information (EVPI) for decision variables, sensitivity ranking.

## Data shape

- Input: `{ name, distribution: { type, params }, dependencies?: [{ on: name, rho: number }] }[]` plus a target expression.
- Per-run config: `{ iterations: number, seed: number }`.
- Output: `{ samples: number[], percentiles: {p5, p50, p95}, mean, stddev, evpi?: number, sensitivity: Array<{name, correlation}> }`.
- Persistence: usually stored in a `simulation_runs` table with (id, input_config JSONB, output_summary JSONB, created_at).

## UI / surface shape

- Input editor: one row per variable with distribution picker and parameter inputs.
- Dependency matrix: Spearman rank correlations between pairs.
- Run button → progress indicator (10k iterations is sub-second in Node, but UI should not freeze).
- Output: histogram of target, percentile table, sensitivity bar chart, EVPI callout.

## Variants in the wild

- **Voi-calculator** — standalone wizard, most sophisticated UI, supports EVPI.
- **Anycomp** — embedded inside scenario modeling; stochastic variant of the deterministic scenario.
- **People-analyst** — uses for compensation-scenario uncertainty (budget ±10%, participation ±X%).
- **Decision-wizard** — simplest variant; runs a small simulation inside the Kepner-Tregoe VOI step.

## Primary files in origin

- `server/simulation/engine.ts` (voi-calculator) — pure function, no framework deps
- `server/simulation/distributions.ts` — normal, uniform, triangular samplers with seeded RNG
- `server/simulation/correlations.ts` — Spearman rank transform for correlated samples
- `server/simulation/evpi.ts` — expected-value-of-perfect-information calculator

## Next-version notes

- Engine is already mostly framework-agnostic. Could be published as a shared `@portfolio/monte-carlo` package in the consolidated repo.
- Distribution library is small (3 types); adding Beta and LogNormal would cover common real-world cases.
- EVPI currently supports single-decision problems; multi-stage decisions would require a larger rewrite.

## Related patterns

- Pure algorithm — few direct pattern deps. Closest match is P37 (Multi-Fallback JSON Parsing) if output is consumed from LLM recommendations, but that's consumer-side, not engine-side.
