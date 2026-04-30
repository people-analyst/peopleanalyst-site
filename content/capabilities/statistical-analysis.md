# Statistical Analysis Engine (HAVE Standard)

**Type:** algo
**Origin repo(s):** calculus (canonical, HAVE-standard endpoints), anycomp, conductor, people-analyst
**Extraction readiness:** copy-paste bundle (calculus's `/api/compute/*` surface is clean)
**Depends on:** segmentation dimensions (to slice populations)
**Last reviewed:** 2026-04-24

## What it is

Run standard statistical procedures on employee populations: chi-square (independence, goodness-of-fit), odds ratio, Pearson correlation, OLS regression, z-scores, percentile ranks. Calculus exposes these as five callable endpoints (`POST /api/compute/chi-square`, etc.) in a "HAVE" format — a unified request/response envelope that higher-level analysis modules assume. Other repos either call calculus's endpoints directly or re-implement pieces.

## Data shape

Request envelope (HAVE standard):
```
{ inputs: Array<{ name, values: number[] | string[] }>, options?: { ... } }
```
Response envelope:
```
{ statistic: number, p_value: number, effect_size?: number, confidence_interval?: [number, number], diagnostics: { ... } }
```

- No persistence required; stateless compute.
- Optional: cache results in a `compute_runs` table keyed on SHA of normalized inputs.

## UI / surface shape

- Usually n/a — this is a server-side compute endpoint that higher-level analysis modules consume.
- When surfaced directly: a "compute one of these" picker with input table editor and result display.

## Variants in the wild

- **Calculus** — canonical HAVE-standard endpoints. Other tools in the toolbox should call these rather than re-implement.
- **Anycomp** — uses for flight-risk scoring.
- **People-analyst** — embeds inside Executive Dashboard recipes (Tier 1/2/3 metric rollups).
- **Conductor** — re-implements some pieces; should migrate to calling calculus once toolbox is consolidated.

## Primary files in origin

- `server/stat-compute.ts` (calculus) — pure-math module
- `server/routes/compute.ts` — HAVE-envelope HTTP surface
- `server/analysis/` — six higher-level diagnostic modules that consume compute endpoints

## Next-version notes

- Add Bayesian variants (posterior distributions, Bayes factors) — currently frequentist only.
- Streaming responses for long-running regressions on large populations.
- Calculus should become the single compute authority in the consolidated toolbox — other repos call it via API, not re-implementation.

## Related patterns

- P05 — Validator-at-the-Boundary for Untrusted Input (HAVE envelope validation)
- P14 — Parallel API Surfaces (REST + MCP + CLI) Over a Shared Core
- P41 — Polling Status Endpoint (for long-running computes)
