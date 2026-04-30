# AI Field Mapping → Canonical Schema

**Type:** data
**Origin repo(s):** conductor (canonical), data-anonymizer, people-analyst, preference-modeler, segmentation-studio
**Extraction readiness:** needs extraction
**Depends on:** CSV ingestion (upstream), Hub field-exchange registry
**Last reviewed:** 2026-04-24

## What it is

Source columns (from a CSV upload or an external system's API) → fuzzy-match plus AI-assisted suggestion to a 20–30-field canonical HRIS schema → local mapping UI surfaces suggestions ranked by confidence → user confirms or overrides → write normalized employee records. The "AI-assisted" part is a Claude or GPT-4o pass that looks at column names AND sample values to propose canonical targets, then is gated by a confidence threshold.

## Data shape

- `canonical_schema` — 20-30 target fields with: name, type, aliases (array), sample values, validation regex.
- `mapping_suggestions` — per-upload, per-column suggestion with (target_field, confidence, source: fuzzy|ai|user).
- `confirmed_mappings` — user-confirmed decisions, stored per-upload for reuse on re-upload.
- Feedback loop: confirmed mappings update alias weights over time.

## UI / surface shape

- Mapping review grid: one row per source column, suggested target with confidence pill, sample values preview, confirm/override buttons.
- Auto-confirm high-confidence mappings (>0.9); human review for the rest.
- "Apply the same mapping to future uploads of this file shape" checkbox.

## Variants in the wild

- **Conductor** — most sophisticated variant. BigQuery sources in addition to CSV.
- **Segmentation-studio** — chains mapping directly into segment builder.
- **Data-anonymizer** — uses mapping to identify which fields are PII.
- **Preference-modeler** — simpler variant (fewer canonical fields).

## Primary files in origin

- `server/mapping/ai-suggester.ts` (conductor) — Claude call, structured JSON response
- `server/mapping/fuzzy-matcher.ts` — Levenshtein + token-set scoring
- `server/mapping/confidence.ts` — blends fuzzy + AI signals
- `app/mapping/` — review UI

## Next-version notes

- The canonical schema is currently per-repo with drift between them. Should be portfolio-hub-owned (same fix as CSV ingestion's alias registry).
- AI suggester makes a Claude call per-upload; could be batched and cached by column-signature hash.
- Mapping persistence is per-repo; a "mapping library" shared across the toolbox would let the first app to see a new source shape teach the others.

## Related patterns

- P37 — Multi-Fallback JSON Parsing for LLM Output
- P93 — Proactive Rate-Limit Queue (for AI suggester calls)
- P83 — Strategy Registry for Column Transforms
- P91 — Capability Self-Registration with Maturity Assessment
