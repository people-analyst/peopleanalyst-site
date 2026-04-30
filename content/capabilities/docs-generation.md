# Documentation Generation + Hub Score

**Type:** integration
**Origin repo(s):** shared (all 13 spoke apps implement a version)
**Extraction readiness:** needs extraction (each repo drifted its own variant)
**Depends on:** Hub ecosystem sync (to push results), GitHub sync (to commit generated files)
**Last reviewed:** 2026-04-24

## What it is

An AI pass (Claude or GPT-4o) reads the live codebase of a spoke — schema, routes, code snippets, config — and generates `hub-docs.md` or `replit.md` with a fixed set of required sections (Architecture, Data Model, API, Hub Integration, etc.). Then scores the result against a 9-section rubric via a Hub API call and pushes the scored doc back. Same mechanism gets used for ongoing documentation refresh: the spoke re-generates its docs on a cadence so the portfolio-level documentation doesn't drift.

## Data shape

- `doc_generation_runs` — one row per generation attempt (timestamp, model, score, sections_covered JSONB).
- `hub-docs.md` (or `replit.md`) written to repo root, committed via GitHub sync.
- Hub-side: `documentation_scores` keyed on ecosystem_id, section.

## UI / surface shape

- Usually n/a — cron-driven background behavior.
- Admin button: "Regenerate docs now" with a progress indicator.

## Variants in the wild

Drift across the 13 spokes is significant:
- Some generate full spec; some score only documentation quality.
- Some track word counts per section; some use LLM-assessed completeness scores.
- Models vary (Claude vs. GPT-4o) per spoke.
- Rubric is nominally shared but each spoke has forked the prompt that consumes it.

This is one of the better candidates for canonical consolidation. The A/B/C/D prompt framework we just established (Prompt A = Architecture Map, Prompt B = Patterns, etc.) is arguably a more mature version of this capability at the hub level.

## Primary files in origin

- `server/docs/generate.ts` (varies per spoke) — the generating Claude call
- `server/docs/score.ts` — rubric scoring against hub response
- `prompts/hub-docs-prompt.md` (varies per spoke) — the drifted prompt

## Next-version notes

- Canonicalize the prompt. The hub should own the prompt template; spokes should fetch it rather than bundle their own.
- Consolidate on one model — probably Claude for consistency with the hub's Prompt A/B/D family.
- Replace cron-based regeneration with event-driven (regenerate when the codebase's relevant files change).
- The 9-section rubric has aged; tune it against the MAPS+PATTERNS+CAPABILITIES hub surfaces rather than the original ad-hoc 9 sections.

## Related patterns

- P37 — Multi-Fallback JSON Parsing for LLM Output
- P93 — Proactive Rate-Limit Queue (for the LLM call)
- P94 — Exponential Backoff with Jitter (for the LLM call)
- P81 — Git Data API Sync Engine (to commit the generated file)
