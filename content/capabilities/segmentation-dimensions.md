# Segmentation / Dimension Management

**Type:** data
**Origin repo(s):** segmentation-studio (canonical), consumed by calculus, conductor, meta-factory, people-analyst, preference-modeler, reincarnation
**Extraction readiness:** copy-paste bundle (schema is stable; UI less so)
**Depends on:** CSV ingestion (to populate from HRIS), AI field mapping (to align with canonical dimensions)
**Last reviewed:** 2026-04-24

## What it is

Define employee grouping dimensions (Department, Geography, Level, Tenure Bucket, etc.) → populate their nodes (e.g., Engineering under Dept., EMEA under Geography) → optionally auto-derive nodes via formula (tenure buckets from hire_date) → use dimensions for analytics roll-up, filtering, and scenario slicing across the portfolio. Every people-analytics app eventually needs this.

## Data shape

- `dimensions` — top-level dimension definitions (name, type, derived_formula, is_canonical).
- `dimension_nodes` — hierarchical tree rows (dimension_id, parent_id, name, code, metadata JSONB).
- `employee_dimension_membership` — M:N between employees and nodes (time-sliced: `effective_from`, `effective_to`).
- Optional `derived_node_rules` — formulas that auto-compute membership (e.g. "tenure_years >= 5 → Senior bucket").

## UI / surface shape

- Dimensions list page → drill into a dimension → tree/outline view of nodes with drag-to-reorder.
- Node editor: name, code, parent, member list, derivation rule (if any).
- Import tab: map CSV column → dimension (uses CSV ingestion capability).
- Consumer apps pull via API rather than re-implement the UI.

## Variants in the wild

- **Segmentation-studio** is the canonical producer and has the richest UI.
- **Conductor** consumes via import and mostly treats dimensions as read-only reference data.
- **Preference-modeler** uses dimensions to scope who can see whose feedback.
- **Reincarnation** uses dimensions for item targeting (who gets which survey items).

## Primary files in origin

- `server/dimensions/schema.ts` (segmentation-studio)
- `server/dimensions/derive.ts` — formula-based node derivation
- `server/dimensions/api.ts` — produces the shared API surface other apps consume
- `app/dimensions/` — admin UI

## Next-version notes

- Time-slicing (`effective_from`/`effective_to`) is partially implemented — point-in-time queries work for membership but not for node definitions.
- Formula derivation supports simple boolean expressions; more apps need "compute bucket from numeric range" as a first-class primitive.
- Consumer apps currently copy the dimensions table locally rather than query via API. In the consolidated people-analytics monorepo, this should flip to API-only consumption.

## Related patterns

- P40 — Flexible JSONB State Column on Hot Rows (metadata JSONB on nodes)
- P35 — Provider/Adapter Strategy with Discriminated Union (derivation rule types)
- P41 — Polling Status Endpoint (for derived-membership recompute jobs)
