# Kanban Board + Hub Sync (Spoke Side)

**Type:** infra
**Origin repo(s):** kanbai (hub, folding into devplane), 11 spoke apps
**Extraction readiness:** copy-paste bundle
**Depends on:** Hub ecosystem sync (for bi-directional card flow)
**Last reviewed:** 2026-04-24

## What it is

Local PostgreSQL-backed kanban (cards, epics, subtasks, lifecycle columns) embedded in each spoke app. Syncs bi-directionally with the Kanbai hub: card creation/moves push to the hub, inbound webhook pushes from hub apply to the local board. Some variants support AI agent runners that claim cards, execute them, and complete via a structured completion block.

> **Consolidation note:** devplane's own kanban (the product of this hub repo) is in the same family. When kanbai folds into devplane, the hub side unifies — devplane becomes the single kanban authority for the portfolio. Spoke apps in the people-analytics toolbox continue to maintain local boards that sync with devplane.

## Data shape

- `cards` — local kanban card (id, asn, title, column, agent_type, dependencies JSONB).
- `card_activity` — append-only event log per card (status changes, completion blocks, comments).
- `card_sync_state` — per-card (hub_card_id, last_synced_at, pending_push: boolean).
- `completion_blocks` — structured completion records (P04 two-phase commit).

## UI / surface shape

- Board view: columns = lifecycle stages, cards = draggable.
- Card detail: title, description, dependencies, activity log, completion block viewer.
- Agent-facing: `/api/agent/*` surface (claim, list, log completion) bypasses user auth.

## Variants in the wild

- **Kanbai** — canonical hub + its own kanban UI.
- **Devplane** — parallel implementation focused on cross-repo orchestration. Richer agent dispatch. Folds with kanbai going forward.
- **Metric-market, reincarnation** — support AI agent runners that claim + complete cards.
- **Most other spokes** — read-only or minimal mirrors.

## Primary files in origin

- `src/kanban.ts` (devplane) — local kanban CRUD + lifecycle
- `src/dispatch.ts` (devplane) — agent dispatch spawning Claude subprocess
- `src/completion.ts` — completion block protocol (DP-01/02/03)
- `server/kanban-agent-runner.ts` (variants across spokes) — budgeted agent runner (Prompt F target)

## Next-version notes

- Merge kanbai's hub-side into devplane (explicit consolidation decision already made).
- The completion block protocol (P04 / devplane's DP-01/02/03) should become the canonical format for all spoke → hub completion messages, replacing the drifted ad-hoc formats in some spokes.
- Budgeted agent runners across spokes should adopt the canonical Budgeted Agent pattern (hub MASTER-PATTERNS → "Canonical Implementations" → "Budgeted AI Agent with Pause/Resume").

## Related patterns

- P04 — Discriminated-Union State Machine with Two-Phase Commit
- P19 — Two-Phase Actor Handoff (Builder → Reviewer)
- P08 — Sequential Subprocess Dispatcher with Lenient Success Heuristic
- Canonical: Budgeted AI Agent with Pause/Resume
