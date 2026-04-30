# GitHub Bi-Directional Sync

**Type:** integration
**Origin repo(s):** data-anonymizer (canonical), meta-factory, all 11 other spoke apps
**Extraction readiness:** copy-paste bundle (P81 is the clean core)
**Depends on:** GitHub App or PAT (per-spoke auth)
**Last reviewed:** 2026-04-24

## What it is

Full bi-directional git sync from a sandboxed environment where the `git` CLI is unavailable, using only HTTPS calls to GitHub's Git Data API. Spoke apps can pull repository state into their working volumes and push changes back without ever invoking `git`. Essential for Replit-hosted apps (no git binary by default) — less critical once apps move to Vercel, but the pattern stays valuable for any sandboxed compute (e.g. Vercel Functions, Modal workers) that needs to produce repo artifacts.

## Data shape

- `github_sync_state` — per-repo (sha, last_pull_at, last_push_at, pending_files JSONB).
- Optional `github_sync_log` — append-only audit of pushes (who, what files, commit_sha).
- Persistent file volume (Replit volume or Modal volume) to hold working copy between syncs.

## UI / surface shape

Usually n/a — automated background behavior. When surfaced:
- Status widget: last pull, pending changes, last push.
- Manual "Sync now" button for recovery.

## Variants in the wild

- **Data-anonymizer** — canonical implementation of P81. Full bi-directional, with sync lock (P82) to prevent concurrent pushes.
- **Meta-factory** — P102 base_tree overlay variant. Pushes only its subset of files to a shared monorepo without clobbering other spokes' files.
- **Most other spokes** — use the same SDK with minor variations in which paths they sync.

## Primary files in origin

- `server/github/sync-engine.ts` (data-anonymizer) — P81 implementation
- `server/github/lock.ts` — P82 sync lock with admin escape hatch
- `server/github/base-tree.ts` (meta-factory) — overlay push for monorepo

## Next-version notes

- On Vercel, you'd typically reach for the git CLI or a Vercel Function that shells out. This pattern stays relevant for Modal workers and for any agent sandbox that runs without `git` installed.
- The 15-minute auto-push cadence is a Replit-era compromise; with Vercel, consider event-driven pushes instead (push when a specific action completes).
- The sync lock (P82) has a manual escape hatch — in the consolidated toolbox, add automated stale-lock expiration.

## Related patterns

- P81 — Git Data API Sync Engine
- P82 — Sync Lock with Manual Escape Hatch
- P102 — base_tree Spoke Overlay Push
- P17 — Signed Webhook with Narrow Event Dispatcher (for GitHub webhook receivers)
