# Adaptive Learning Queue / Pool Ladder

**Type:** algo
**Origin repo(s):** reincarnation (canonical, survey items), vela (divergent variant, image library curation)
**Extraction readiness:** needs extraction (algorithm is clean; persistence schema is shared across both variants)
**Depends on:** append-only signal capture (user responses that drive re-pooling)
**Last reviewed:** 2026-04-24

## What it is

Items (survey questions, images, or any rankable unit) are distributed across named pools forming a ladder — e.g. `INFINITY → D → C → B → A → PURGATORY` — based on accumulated response signals. A background batch scorer runs every N hours, recomputes per-item virtue scores using seeded randomness + thresholds, and promotes or demotes items across pool boundaries. Users querying for the "next item" see a probability-weighted sample drawn from the current pools, so adaptive reordering happens naturally as more responses come in.

> **Dual-owner note.** Reincarnation drives survey items; vela uses the same shape to curate its image library. Both owners are valid; learnings from one may apply to the other but they have diverged intentionally and neither needs to chase the other.

## Data shape

- `items` — one row per rankable unit with current `pool` column (enum).
- `item_signals` — append-only per-user/per-item feedback events (P32).
- `pool_transitions` — append-only audit log of promotions/demotions (P31 append-only pool ladder).
- `scorer_runs` — metadata per batch run (started_at, items_scored, transitions_made).

## UI / surface shape

- Admin view: pool populations (how many items in each), transition history.
- Consumer surface (`/api/next-item?scope=X`): returns a probability-weighted item from the current pools.
- Editorial override: operators can pin/demote manually (P28 sticky transitions so auto-scoring doesn't reverse curator intent).

## Variants in the wild

- **Reincarnation** — canonical. Pools represent psychometric quality (item discrimination + response volume). Scorer uses item-total correlation.
- **Vela** — same ladder shape applied to image aesthetic coherence. Scorer uses entropy + Inception-v3 similarity (P27 cluster coherence).

## Primary files in origin

- `server/pools/ladder.ts` (reincarnation) — pool definitions, transition rules
- `server/pools/scorer.ts` — batch scorer
- `server/pools/sampler.ts` — probability-weighted next-item sampler
- `db/schema/pools.sql` — shared schema shape (P31 append-only pool ladder)

## Next-version notes

- The batch scorer cadence is fixed (every N hours); adaptive scoring (run when enough new signals accumulate) would be more efficient.
- Sticky transitions (P28) need more visibility — it's currently hard to tell whether an item's pool is curator-pinned vs. algorithm-placed.
- The reincarnation and vela variants share the persistence shape; worth a common package in the consolidated repo even though the scorer implementations differ.

## Related patterns

- P31 — Append-Only Audit History with Pool Ladder
- P27 — Entropy-Based Cluster Coherence (vela variant)
- P28 — Editorial Lifecycle State Machine with Sticky Transitions
- P32 — Append-Only Signal Capture
- P34 — Multi-Stage Cron with Per-Stage Error Isolation (scorer orchestration)
