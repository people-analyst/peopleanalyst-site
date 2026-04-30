# Identity Resolution + Multi-CSV Join

**Type:** algo
**Origin repo(s):** conductor (canonical)
**Extraction readiness:** needs extraction
**Depends on:** CSV ingestion (upstream)
**Last reviewed:** 2026-04-24

## What it is

Upload 2–10 CSVs from different HRIS / source systems, each with different employee identifiers (employee_id, email, name variations) → run a multi-pass convergence engine that joins them into a unified master key table. Match passes run in order of decreasing confidence (exact ID match → normalized email match → fuzzy name + tenure match), each pass locking in matches before the next begins. Produces an anchor table of master keys with per-field conflict policies (OVERWRITE / IGNORE / FILL_HOLES) applied to the supplementary columns.

## Data shape

- `identity_resolution_runs` — one per execution (input_files JSONB, policies JSONB, status, started_at, completed_at).
- `master_keys` — resolved unique employees (master_id, stable ID used downstream).
- `source_mappings` — M:N: source_file_id + source_row_id → master_id, with match_pass (which pass matched it) and match_confidence.
- Output: `resolved_employees` — the merged record with resolved values (conflict policies applied).
- Unresolved rows go to `resolution_conflicts` for manual review.

## UI / surface shape

- Upload step: drop 2-10 files, pick an anchor file (the one whose rows become master).
- Policy editor: per-column, pick OVERWRITE / IGNORE / FILL_HOLES.
- Run button → progress (P80 async-with-polling).
- Results view: master_keys count, per-pass match counts, conflicts list with manual resolution UI.

## Variants in the wild

Conductor is the only production home; other people-analytics apps that need it currently either (a) manually pre-join CSVs outside the system or (b) re-implement a subset.

## Primary files in origin

- `server/identity-resolution/runner.ts` (conductor)
- `server/identity-resolution/match-passes/` — ordered match strategies
- `server/identity-resolution/conflict-resolver.ts` — policy application
- `app/identity-resolution/` — upload + policy UI

## Next-version notes

- The match passes are hardcoded; pluggable match strategies (via P35 Provider/Adapter Strategy) would let new sources (Workday, ADP) add their own rules.
- Confidence scoring is all-or-nothing per pass; a continuous confidence score would enable triage of borderline matches.
- Once extracted, this is a strong candidate for a canonical in the people-analytics toolbox — today, each app that needs joined data either calls conductor's API or duplicates logic. The toolbox model (API-first) means this should be one canonical service.

## Related patterns

- P80 — Async-with-Polling Job Pipeline
- P79 — Deterministic Identity Cache (related: preserving identity across independent files)
- P35 — Provider/Adapter Strategy with Discriminated Union
- P89 — Multi-Status Pipeline State Machine
