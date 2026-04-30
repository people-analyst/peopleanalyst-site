# CSV Ingestion + Column Detection

**Type:** data
**Origin repo(s):** segmentation-studio (canonical ingest), data-anonymizer (PII-scanning variant), calculus (Tier 1 variant)
**Extraction readiness:** needs extraction
**Depends on:** AI field mapping → canonical schema (commonly chained after ingest)
**Last reviewed:** 2026-04-24

## What it is

Upload CSV or XLSX → auto-detect column types via fuzzy matching against 20–30 canonical field aliases → apply per-column transformation rules (normalize dates, hash IDs, anonymize PII, cast types) → produce standardized rows ready for downstream use. The same ingest pipeline appears in almost every people-analytics app because every one of them eats HRIS CSVs.

## Data shape

- `uploads` — one row per file upload (user, filename, size, status, detected_schema JSONB).
- `canonical_fields` — registry of target fields with aliases, expected types, validation regex.
- `column_mappings` — per-upload, per-column mapping decision (source name → canonical field + confidence).
- Row output — usually a `staging_rows` table with the standardized shape; downstream code transforms staging → domain tables.

## UI / surface shape

- Upload drop zone + progress bar (P80 async-with-polling job pipeline).
- Column mapping review UI — rows: source column, sample values, suggested canonical field, confidence, user-confirm button.
- Ingest report: N rows, K unmapped columns, M rows rejected (with reasons).

## Variants in the wild

- **Segmentation-studio** — canonical producer, feeds segment builder downstream.
- **Data-anonymizer** — adds PII scanning via P88 risk-scored validator and auto-hashes identified columns.
- **Calculus** — Tier 1 recipes consume ingest output for metric calculation.
- **Conductor** — multi-file variant; chains into identity-resolution capability to merge across files.

## Primary files in origin

- `server/ingest/upload-handler.ts` (segmentation-studio) — 202-accept + background processing
- `server/ingest/column-detector.ts` — fuzzy alias matching
- `server/ingest/transform-strategies/` (data-anonymizer) — P83 strategy registry for per-column transforms
- `shared/canonical-fields.json` — field registry (should be portfolio-wide, is currently per-repo)

## Next-version notes

- The `canonical_fields` registry should live in the hub (or in a shared package) — right now each repo duplicates its alias list with drift between them.
- The fuzzy-match scoring is ad-hoc; would benefit from a named algorithm (Levenshtein + token-set + aliases) with a single tunable threshold.
- Unify XLSX and CSV paths — some repos handle only one.

## Related patterns

- P80 — Async-with-Polling Job Pipeline
- P83 — Strategy Registry for Column Transforms
- P88 — Risk-Scored Field Validator (anonymizer variant)
- P87 — Readiness Checklist with Score (for upload quality)
- P92 — Staggered-Start Periodic Background Timer (for reprocessing jobs)
