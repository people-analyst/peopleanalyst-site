# Compensation Scenario Modeling

**Type:** data
**Origin repo(s):** anycomp (most full-featured), people-analyst, calculus, decision-wizard
**Extraction readiness:** needs extraction (heavy business logic bleed)
**Depends on:** segmentation dimensions (to scope scenarios), Monte Carlo simulation (for stochastic scenarios), statistical analysis (for equity checks)
**Last reviewed:** 2026-04-24

## What it is

Define a compensation scenario — budget envelope, merit matrix, pay structures, proposed actions — then sandbox it against the real employee population to produce: cost impact, compa-ratio distribution shift, equity checks by demographic slice, AI-generated narrative summary, and an exportable packet (CSV, PDF, or push to downstream systems).

## Data shape

- `comp_scenarios` — scenario metadata (owner, name, cycle, status, assumptions JSONB).
- `merit_matrices` — grid of performance × position → percentage raise (per-scenario overrides).
- `pay_structures` — grade/band definitions, min/mid/max per grade.
- `scenario_actions` — proposed per-employee actions (raise, promotion, re-grade, no action).
- `scenario_results` — computed impact metrics (total_cost, compa_ratio_distribution JSONB, equity_report JSONB).
- Optional `scenario_simulation_runs` — Monte Carlo output when stochastic inputs are used.

## UI / surface shape

- Scenario list with status chips, last-run timestamp, cost delta.
- Scenario builder: budget input → segment scope → merit matrix editor → action preview → run button.
- Results dashboard: cost card, compa-ratio histogram (before/after), equity report table, AI narrative summary.
- Export: CSV, PDF, or direct-push API to downstream HRIS.

## Variants in the wild

- **Anycomp** — most full-featured. VOI integration, scenario kit/templates, comprehensive export.
- **Calculus** — embeds inside Tier 1 recipes; less standalone UI.
- **People-analyst** — emphasis on Monte Carlo + stochastic inputs.
- **Decision-wizard** — wraps a scenario in the Kepner-Tregoe analytical frame (criteria-weighted).

## Primary files in origin

- `server/scenarios/` (anycomp)
- `server/merit-matrix/` — matrix CRUD + application
- `server/equity-check/` — slice-by-demographic reporting
- `app/scenarios/[id]/` — scenario builder UI

## Next-version notes

- The merit matrix editor is re-invented per-app; extract as a shared component.
- Equity check logic should be one canonical implementation in the toolbox (currently drifts between repos — different statistical thresholds).
- AI narrative generation is a good candidate for the canonical Budgeted Agent pattern (already documented as a hub canonical).

## Related patterns

- P09 — Runtime Provider Registry (for export adapters)
- P40 — Flexible JSONB State Column (scenario assumptions and results)
- P104 — Idempotent Batch Webhook Receiver (for downstream HRIS push)
- Canonical: Budgeted AI Agent with Pause/Resume (for narrative generation)
