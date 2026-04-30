# Hub Ecosystem Sync (Directives + Metrics)

**Type:** integration
**Origin repo(s):** kanbai (hub side) + all 12 spoke apps in people-analytics cluster
**Extraction readiness:** copy-paste bundle (the `hub-sdk.cjs` module is shared)
**Depends on:** GitHub bi-directional sync (commonly chained for directive resolution)
**Last reviewed:** 2026-04-24

## What it is

Every spoke app registers with the Hub at startup, then maintains an ongoing conversation: **receives directives** (remote tasks) via webhook or polling, **acknowledges completion** with structured responses, and **pushes metrics and documentation** every ~5–6 hours. The hub is the conductor; spokes are the instruments. Most people-analytics apps use this to stay in coordination without human orchestration.

> **Note for consolidation:** since kanbai is folding into devplane, this capability's hub-side moves with it. Devplane becomes the hub that issues directives to the people-analytics toolbox apps.

## Data shape

Spoke side:
- `hub_directives` — received directives (id, received_at, type, payload JSONB, status, completed_at).
- `hub_outbound_metrics` — pending metric pushes (buffer flushed every ~5-6h or on-demand).
- `hub_registration` — single-row config (api_key, ecosystem_id, last_heartbeat_at).

Hub side (current: kanbai, future: devplane):
- `ecosystems` — registered spoke apps.
- `directives` — outstanding work orders.
- `metric_submissions` — inbound metric pushes.

## UI / surface shape

- Admin surface on the hub: list of ecosystems, their heartbeat status, outstanding directives.
- Admin surface on each spoke: "Hub status" widget showing last heartbeat, pending directives, failed pushes.

## Variants in the wild

All 12+ spokes run near-identical hub sync logic (the SDK is shared). Key differentiators:
- Some spokes handle AI-powered directive execution (they run a Claude call when a directive of type `ai_task` arrives).
- Some push custom metric domains (HAVE-formatted statistical metrics from calculus; compensation metrics from anycomp).
- Some sync GitHub files as part of directive resolution (the directive says "update doc X with ..." → spoke writes the file → pushes via the GitHub sync capability).

## Primary files in origin

- `hub-sdk.cjs` — shared module, near-identical across all spokes
- `server/hub/directive-handler.ts` — spoke-side directive processing (P85)
- `server/hub/metric-pusher.ts` — spoke-side outbound metrics buffer
- `server/ecosystems/` (kanbai) — hub-side directive dispatcher

## Next-version notes

- The SDK is copy-pasted across 12 repos; should become a real shared package in the consolidated monorepo.
- Heartbeat + registration is per-spoke config; could become convention-over-configuration.
- When kanbai folds into devplane, the hub endpoints need to migrate without breaking the spokes — this is a near-term consolidation milestone.

## Related patterns

- P85 — Spoke-Hub Directive Processor
- P91 — Capability Self-Registration with Maturity Assessment
- P105 — Control-Plane Directive Polling
- P104 — Idempotent Batch Webhook Receiver
- P86 — In-Memory Rate Limiter with Key Bucketing (for inbound directive rate-limiting)
