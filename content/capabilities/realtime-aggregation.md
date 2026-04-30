# Realtime Vote / Response Aggregation

**Type:** data
**Origin repo(s):** baby-namer (canonical, tournament votes), reincarnation (item responses), vela (player signals)
**Extraction readiness:** copy-paste bundle
**Depends on:** Supabase (for Postgres changes broadcast)
**Last reviewed:** 2026-04-24

## What it is

User interactions (vote, pass, rate, respond) are written to a dedicated append-only table → Supabase Realtime broadcasts the INSERT over a channel named by the scoping entity → client channels subscribed to that scope receive the delta and update aggregated counts/rankings on screen with no page reload. Pattern solves the "live tallies without polling" problem without standing up a WebSocket server.

## Data shape

- Append-only event table: `{ id, scope_id, event_type, payload JSONB, user_id?, created_at }`.
- Aggregate view or materialized view keyed on `scope_id` that computes counts/ranks.
- Supabase Realtime subscription on the event table, filtered by `scope_id = <channel key>`.
- Optional: rate limit on writes per user to prevent spam.

## UI / surface shape

- Client hook (e.g. `useRealtimeAggregate(scopeId)`) that subscribes on mount, handles INSERT events, merges into local state.
- UI elements that reflect live counts — vote bars, ranking lists, live participant counts.
- Graceful fallback: polling every N seconds if the realtime channel errors.

## Variants in the wild

- **Baby-namer** — tournament matchup vote bars. Scope = matchup_id.
- **Reincarnation** — item response aggregation. Scope = survey_instance_id.
- **Vela** — player signal processing (aesthetic feedback events). Scope = player_id.

## Primary files in origin

- `db/supabase/realtime.ts` (baby-namer) — channel helpers
- `hooks/useRealtimeAggregate.ts` — client subscription hook
- `server/events/vote-writer.ts` — write endpoint with rate limiting

## Next-version notes

- The "channel-name-by-scope" pattern (P57) is clean and already domain-agnostic; could be packaged as a shared hook in the consolidated monorepo.
- Fallback polling is currently per-app; should become a shared concern.
- When channel count grows, consider server-derived aggregates rather than client-computed to avoid re-running reducer logic in every tab.

## Related patterns

- P57 — Realtime fan-out by channel naming
- P32 — Append-Only Signal Capture
- P41 — Polling Status Endpoint (as fallback when realtime errors)
