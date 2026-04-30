# Reusable Engineering Patterns

> Production-validated patterns extracted from this codebase, written in domain-agnostic form so they can be dropped into any new project. Each entry includes a clean TypeScript sketch (Vela-specific names and business rules stripped), the design decisions behind it, where to find the original, and tradeoffs.

**Companion doc:** [`PRODUCT_INTEGRATION_MAP.md`](./PRODUCT_INTEGRATION_MAP.md) — for *what each thing in this codebase actually is*. This doc is for *what's worth stealing*.

---

## Pattern Index

| # | Pattern Name | Core Technology | Problem Solved |
|---|---|---|---|
| 1 | Three-Tier Supabase Client Split | Supabase / Postgres / RLS | Prevent accidental privilege escalation in mixed public/admin codebases |
| 2 | Async GPU Job via Webhook-Triggered Spawn | Modal / FastAPI endpoint | Trigger long-running training jobs from web requests without blocking |
| 3 | Direct DB Write-Back from Worker (no callback) | Service-role key + worker | Eliminate webhook-loss reconciliation bugs for trusted workers |
| 4 | Two-Pass Classification with Weighted Merge | Vision LLM + metadata | Cheap+coarse and expensive+precise classifiers cooperating |
| 5 | Confidence-Tier Auto-Assign with Manual Override | Score gap heuristic | Auto-route high-confidence work, queue ambiguous work for humans |
| 6 | JSONB Rule-Weights Scoring Matrix | Postgres JSONB | Per-row scoring rules editable without migrations |
| 7 | Entropy-Based Cluster Coherence | Shannon entropy | Detect drifting / mixed clusters in human-curated data |
| 8 | Editorial Lifecycle State Machine | Status enum + sticky transitions | Curator decisions survive automated re-runs |
| 9 | Idempotent Pipeline Upsert by Natural Key | Postgres unique key | Safe re-ingestion after script failures |
| 10 | Insert-Promote with FK-Gated Trigger | Multi-step insert | Bypass ordering deadlocks when triggers depend on a sibling row |
| 11 | Append-Only Audit History with Pool Ladder | Append-only table + ladder enum | Reversible state movements with full history |
| 12 | Append-Only Signal Capture | POST-only tables | Immutable user-event log for analytics + ML retraining |
| 13 | Dual-Write Fanout with Legacy FK | Idempotent secondary write | Migrate from old schema to new without freezing writes |
| 14 | Multi-Stage Cron with Per-Stage Error Isolation | Vercel Cron + Bearer auth | One nightly entrypoint that doesn't fail wholesale on partial failure |
| 15 | Provider/Adapter Strategy with Discriminated Union | TypeScript exhaustive switch | Add new external sources in ~100 lines |
| 16 | Hash-Based Asset Deduplication | SHA-256 + storage path | Prevent duplicate uploads across sources |
| 17 | Multi-Fallback JSON Parsing for LLM Output | Layered regex + JSON | Robust parsing of unreliable LLM JSON responses |
| 18 | Bounded Retry with Tolerable Partial Failure | Exponential backoff + threshold | Network-flaky downloads without all-or-nothing failures |
| 19 | One-Way Import Boundary (lint-enforced kernel) | ESLint custom rule | Keep a shared kernel free of host-app coupling |
| 20 | Flexible JSONB State Column on Hot Rows | JSONB array on entity row | Track per-record nested history without exploding tables |
| 21 | Polling Status Endpoint over Push Webhook | GET /status with materialized view | Stateless frontend without webhook delivery worries |
| 22 | Plaintext-in-Body Secret for Internal Endpoints | Shared secret + HTTPS | Cheap auth for trusted-host webhooks (no HMAC overhead) |
| 23 | Display Component / Data Loader Separation | Server Component → Client UI | Keep UI components testable + storybook-friendly |
| 24 | Public-Twin Design Reference Route | Un-gated `/design/*` route | Share design references externally without admin auth |
| 25 | Markdown → Tagged Passage Ingest | Markdown parse + tag extract | Convert authored prose into structured DB rows |
| 26 | TTS Sequence Builder (audio + units pairing) | External TTS + sequence table | Pair generated audio with curated content |
| 27 | NULL-Safe `.neq` in Postgres Query Builders | SQL three-valued logic + `.or()` | Avoid silently dropping NULL rows when negating a filter |
| 28 | Operational Coverage Log + Demand-Driven Routing | Per-op signal table + periodic rollup | Turn every operation into a corpus-quality measurement that drives acquisition / content / research |
| 29 | Recursive Editorial Compounding | Loop: write → measure → gap → respond | Each pass of the system makes the next pass better-supported; corpus quality compounds rather than drifts |
| 30 | Polymorphic Curation Queue | Single `(item_kind, item_id)` queue table | One inbox across many domain object types; resolutions also append to the curator-actions log |
| 31 | Cron Tick + DB Checkpoint (no detached process) | Vercel Cron + status column on the work table | Long-running jobs that survive restarts, deploys, and human inattention without `nohup`/`/tmp` |

---

## 1. Three-Tier Supabase Client Split

**Problem.** Web apps that mix anonymous, authenticated, and admin/system access often gravitate toward a single client factory. That single client either over-shares (service-role key reaches public routes) or under-serves (admin operations fail RLS). The result is silent privilege escalation or noisy "permission denied" debugging.

**The Pattern.**

```ts
// lib/db/client.ts — browser; respects RLS
import { createBrowserClient } from "@supabase/ssr";
export function createBrowserDb() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_DB_URL!,
    process.env.NEXT_PUBLIC_DB_ANON_KEY!,
  );
}

// lib/db/server.ts — SSR; respects RLS via cookies
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
export async function createServerDb() {
  const store = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_DB_URL!,
    process.env.NEXT_PUBLIC_DB_ANON_KEY!,
    { cookies: { getAll: () => store.getAll(), setAll: (c) => c.forEach(({ name, value, options }) => store.set(name, value, options)) } },
  );
}

// lib/db/service.ts — bypasses RLS; admin-only
import { createClient } from "@supabase/supabase-js";
export function createServiceDb() {
  return createClient(
    process.env.DB_URL!,
    process.env.DB_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
```

Add a runtime guard so the wrong client can't be imported into a route group:

```ts
// In any route under /app/api/(public)/* — fail fast if service is imported
if (process.env.NEXT_RUNTIME && typeof window === "undefined") {
  // In a public route, prefer createServerDb. createServiceDb is admin-only.
}
```

**Key Design Decisions.**
- **Three names, three files** — splitting them into separate modules makes "I imported the wrong client" a code-review-visible mistake instead of a parameter mistake.
- **Service-role client never reads cookies** — it has no user context to lose.
- **All three clients constructed lazily** — Next.js bundles them per route; the service-role key never leaks to the browser bundle.
- **Tradeoff considered:** A single `createDb({ as: "user"|"service" })` factory is more DRY but easier to misuse. The split form is preferred even with three near-identical files.

**This Codebase.** `lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/supabase/service.ts`. Used everywhere — admin pages typically pair `createServerClient()` (for the auth check) with `createServiceClient()` (for the actual write).

**Tradeoffs.**

| Pro | Con |
|---|---|
| Wrong-client errors visible at import site | Three near-identical files to maintain |
| Service role can never accidentally reach the browser | New engineers must learn which is which |
| Easy to grep for service-role usage in code review | Slight friction when an endpoint legitimately needs both |

---

## 2. Async GPU Job via Webhook-Triggered Spawn

**Problem.** A web request needs to trigger a multi-minute or multi-hour GPU job (LoRA training, video render, embedding batch). The HTTP request must return quickly; the job must be durable; the trigger must be authenticated.

**The Pattern.** Modal exposes two FastAPI endpoints: a *trigger* (cheap, web-runnable, validates secret) and a *worker* (GPU, runs async via `.spawn()`).

```python
# job/app.py
import os, uuid, modal
from typing import Any

app = modal.App("worker-app")
trigger_image = modal.Image.debian_slim().pip_install("fastapi", "supabase")
gpu_image = modal.Image.debian_slim().pip_install("torch", "supabase")
secrets = [modal.Secret.from_name("worker-secrets")]  # shared env

@app.function(timeout=600, secrets=secrets, image=trigger_image)
@modal.fastapi_endpoint(method="POST")
def trigger(payload: dict[str, Any]) -> dict[str, Any]:
    secret = os.environ.get("TRIGGER_SECRET", "")
    if not secret or payload.get("trigger_secret") != secret:
        return {"ok": False, "error": "Unauthorized"}
    job_id = str(uuid.uuid4())
    worker.spawn({**payload, "job_id": job_id})  # fire-and-forget
    return {"ok": True, "spawned": True, "job_id": job_id}

@app.function(timeout=10_800, gpu="A100", secrets=secrets, image=gpu_image)
def worker(body: dict[str, Any]) -> None:
    # 1. mark row "running"
    # 2. do work
    # 3. mark row "ready" or "failed" with error_message
    ...
```

Web side:

```ts
// app/api/admin/jobs/start/route.ts
export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(process.env.MODAL_TRIGGER_URL!, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...body, trigger_secret: process.env.TRIGGER_SECRET! }),
  });
  return Response.json(await res.json());
}
```

**Key Design Decisions.**
- **Two functions, two images** — the trigger image is small (no torch); the worker image is fat. Cuts trigger cold-start to ~1s.
- **Secret in body, not header** — HTTPS encrypts the body and Modal's FastAPI rejects unauthorized payloads cheaply. No HMAC needed when both endpoints are trusted.
- **`spawn()`, not `.remote()`** — the trigger returns immediately with the job ID; the worker runs in its own Modal task.
- **Job ID generated by the trigger** — caller knows the ID before the worker starts, so it can write a "pending" DB row and poll for state.
- **Tradeoff considered:** Could use a queue (SQS, Cloud Tasks). Modal's `spawn()` is durable enough for jobs counted in hours; for jobs counted in days a real queue is worth it.

**This Codebase.** `modal/lora_training.py` (`trigger_train` + `train_lora`), called from `app/api/admin/lora/train/route.ts`. Modal config in `modal/config.py`.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Web request returns in <1s regardless of job length | Two images to maintain in Modal |
| No queue infrastructure to operate | Bound to Modal's durability guarantees |
| Job ID known immediately for DB linkage | Lost spawns require manual reconciliation |
| Trigger secret rotated independently of GPU code | Trigger and worker must agree on payload schema |

---

## 3. Direct DB Write-Back from Worker (no callback)

**Problem.** Long-running workers traditionally callback to the originating web app via webhook on completion. Webhooks get lost, signatures expire, network partitions cause silent failures. For workers you control, the round-trip is unnecessary.

**The Pattern.** Give the worker a service-role DB key and let it write the result row directly. The web app polls.

```python
# In the worker function
from supabase import create_client
db = create_client(os.environ["DB_URL"], os.environ["DB_SERVICE_ROLE_KEY"])

def worker(body):
    job_id = body["job_id"]
    db.table("jobs").update({
        "status": "running",
        "started_at": "now()",
    }).eq("id", job_id).execute()

    try:
        result = do_work(body)
        db.table("jobs").update({
            "status": "ready",
            "result_path": result.path,
            "completed_at": "now()",
        }).eq("id", job_id).execute()
    except Exception as e:
        db.table("jobs").update({
            "status": "failed",
            "error_message": str(e)[:8000],
            "completed_at": "now()",
        }).eq("id", job_id).execute()
        raise
```

**Key Design Decisions.**
- **The worker is the source of truth for job status** — no race between webhook delivery and DB update.
- **Errors written before re-raising** — Modal's error reporting still works, but the user-visible record is set first.
- **`error_message` truncated** — Postgres rows have practical size limits; raw stack traces can be megabytes.
- **`now()` from the database** — avoids clock skew between worker and web app.
- **Tradeoff considered:** Push notifications still possible by adding a row trigger that calls a webhook. The DB write is the durable event; the webhook is best-effort UI nudge.

**This Codebase.** `modal/lora_training.py` writes to `lora_adapters` directly. Frontend polls `/api/admin/lora/training/status`.

**Tradeoffs.**

| Pro | Con |
|---|---|
| No webhook loss to reconcile | Worker must hold a service-role key (security boundary widens) |
| Single source of truth (the DB row) | No real-time push to user; needs polling or DB triggers |
| Errors recorded even when worker process dies before exit | Worker is now coupled to DB schema |

---

## 4. Two-Pass Classification with Weighted Merge

**Problem.** A single LLM classifier is either too expensive (run on every item) or too noisy (unsupervised metadata only). You want to combine cheap structural signals with expensive vision/LLM judgment, biased toward the LLM but rescued by metadata when available.

**The Pattern.**

```ts
type Score = { id: string; score: number };

export function mergeScores(passA: Score[], passB: Score[], weightA: number): Score[] {
  const wA = Math.min(1, Math.max(0, weightA));
  const wB = 1 - wA;
  const ids = new Set([...passA.map((s) => s.id), ...passB.map((s) => s.id)]);
  return [...ids]
    .map((id) => ({
      id,
      score:
        wA * (passA.find((s) => s.id === id)?.score ?? 0) +
        wB * (passB.find((s) => s.id === id)?.score ?? 0),
    }))
    .sort((a, b) => b.score - a.score);
}

// Usage
const metadataScores = scoreFromMetadata(item, buckets); // cheap, may be empty
const visionScores = await scoreFromVisionLLM(item, buckets); // expensive
const merged = metadataScores.length
  ? mergeScores(metadataScores, visionScores, /* metadata weight */ 0.35)
  : visionScores;
```

**Key Design Decisions.**
- **Weight is on the cheap pass** — the LLM dominates (weight 0.65) but metadata can break ties and rescue LLM mistakes.
- **Union of IDs, not intersection** — buckets that only one pass scores still appear; the other contributes 0.
- **Sorted output** — callers get an immediately-usable ranking.
- **Pure function** — easy to unit-test with synthetic scores.
- **Tradeoff considered:** A learned ensemble (logistic regression over both passes) would adapt better but requires labeled data. Hand-tuned weight is good enough until you have ground truth.

**This Codebase.** `lib/lora/bucket-engine.ts` (`mergeBucketScores`); the scoring rules live in `lib/lora/bucket-rules.ts`; vision pass in `lib/lora/vision-classifier.ts` (Claude Haiku).

**Tradeoffs.**

| Pro | Con |
|---|---|
| Cheap rescue for LLM errors | Weight requires manual tuning |
| Easy to add a third pass (different weighting scheme) | No principled bound on combined score |
| Pure function — testable in isolation | Caller must coordinate the two passes |

---

## 5. Confidence-Tier Auto-Assign with Manual Override

**Problem.** A scoring pipeline produces ranked candidates. You want to auto-act on confident results, queue ambiguous results for humans, and never auto-act on low-confidence ones — without picking magic thresholds blindly.

**The Pattern.** Use the *gap* between the top score and the second-best, not just the top score.

```ts
type Confidence = "high" | "medium" | "low";

export function assignWithConfidence(
  scores: Score[],
): { id: string | null; confidence: Confidence } {
  const sorted = [...scores].sort((a, b) => b.score - a.score);
  const [top, second] = sorted;
  if (!top || top.score === 0) return { id: null, confidence: "low" };
  const gap = second ? top.score - second.score : 1;

  if (top.score > 0.75 && gap > 0.2) return { id: top.id, confidence: "high" };
  if (top.score > 0.5) return { id: top.id, confidence: "medium" };
  return { id: null, confidence: "low" };
}

// Routing
function route(item, result) {
  if (result.confidence === "high") autoAssign(item, result.id);
  else if (result.confidence === "medium") queueForReview(item, result.id);
  else queueForManualClassification(item);
}
```

**Key Design Decisions.**
- **Two-axis threshold** — the *score* tells you "is anything good?"; the *gap* tells you "is the winner unambiguous?".
- **`null` id on low confidence** — forces caller to handle the no-decision case explicitly (no fallback to "best of bad options").
- **Three tiers, not five** — fewer states is easier to monitor; medium is the only ambiguous one.
- **Tradeoff considered:** Calibrated confidence (running an actual probabilistic model) is more principled but harder to implement. The heuristic works because the score distribution in practice is bimodal.

**This Codebase.** `lib/lora/bucket-engine.ts#assignBucket`. The "manual" tier appears as `bucket_confidence: "manual"` on the bucket itself, which forces score → 0 (see Pattern 6).

**Tradeoffs.**

| Pro | Con |
|---|---|
| Three-tier output is easy to dashboard | Thresholds must be tuned per-domain |
| Gap heuristic catches "two roughly equal candidates" | Doesn't handle the case where many candidates are all good |
| `null` forces explicit no-decision handling | Caller-side routing logic gets repetitive |

---

## 6. JSONB Rule-Weights Scoring Matrix

**Problem.** Multi-dimensional scoring rules (e.g. "category X prefers `lighting=soft` weight 0.8 and `color=warm` weight 0.9") need to be editable by non-engineers without a migration on every change. A normalized table-per-dimension is rigid; hardcoded TypeScript needs deploys.

**The Pattern.**

```ts
type RuleWeights = Record<string, Record<string, number>> & {
  // sentinel keys
  bucket_confidence?: "auto" | "manual";
};

type CategoryRow = {
  id: string;
  name: string;
  rule_weights: RuleWeights | null; // JSONB column
};

type ItemFeatures = Record<string, string>; // e.g. { lighting: "soft", color: "warm" }

export function scoreItemAgainstCategories(
  features: ItemFeatures,
  categories: CategoryRow[],
): Score[] {
  return categories
    .map((cat) => {
      // Manual-only categories opt out of auto-scoring
      if (cat.rule_weights?.bucket_confidence === "manual") {
        return { id: cat.id, score: 0 };
      }
      let sum = 0,
        matched = 0;
      for (const [dim, weights] of Object.entries(cat.rule_weights ?? {})) {
        if (dim === "bucket_confidence") continue;
        const observed = features[dim];
        if (!observed) continue;
        const w = (weights as Record<string, number>)[observed];
        if (typeof w === "number") {
          sum += w;
          matched++;
        }
      }
      return { id: cat.id, score: matched > 0 ? sum / matched : 0 };
    })
    .sort((a, b) => b.score - a.score);
}
```

**Key Design Decisions.**
- **Average, not sum** — high-dimensional categories don't dominate by virtue of having more rules.
- **Sentinel key `bucket_confidence: "manual"`** — opts a category out of auto-scoring without a separate column.
- **Schema-flexible** — a new dimension is added by editing a JSONB row in the admin UI, no migration.
- **Tradeoff considered:** A typed config file would be safer but redeploys for every change. The JSONB form lets editors iterate without engineering.

**This Codebase.** `lib/lora/bucket-rules.ts` defines the type; `lib/lora/bucket-engine.ts` consumes it. The `lora_buckets.rule_weights` column is JSONB.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Editable without migrations | No schema validation at the DB layer |
| Trivially extensible to new dimensions | Typos in dimension names silently score 0 |
| Sentinel keys keep config in one column | Querying by individual dimension is awkward |

---

## 7. Entropy-Based Cluster Coherence

**Problem.** Curated clusters (image buckets, content tags, user segments) drift over time as items are added. You want a single "is this cluster still coherent?" metric that surfaces in a dashboard, plus per-feature evidence for the curator.

**The Pattern.** Compute Shannon entropy per feature dimension, normalize to [0,1], take the inverse mean as the coherence score.

```ts
const FEATURES = ["lighting", "color", "subject_distance"] as const;

function normalizedEntropy(counts: Record<string, number>): number {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  const probs = Object.values(counts).map((c) => c / total);
  const H = -probs.reduce((acc, p) => (p > 0 ? acc + p * Math.log2(p) : acc), 0);
  const Hmax = Math.log2(Math.max(2, Object.keys(counts).length));
  return Hmax > 0 ? H / Hmax : 0;
}

export function clusterCoherence(items: Record<string, string>[]) {
  const featureDistributions = FEATURES.map((feat) => {
    const counts: Record<string, number> = {};
    for (const item of items) {
      const v = item[feat] ?? "unclear";
      counts[v] = (counts[v] ?? 0) + 1;
    }
    return { feat, counts, entropy: normalizedEntropy(counts) };
  });
  const meanEntropy =
    featureDistributions.reduce((a, b) => a + b.entropy, 0) /
    featureDistributions.length;
  const coherence = 1 - meanEntropy;
  const verdict = coherence >= 0.7 ? "tight" : coherence >= 0.5 ? "mixed" : "drifty";
  return { coherence, verdict, featureDistributions };
}
```

**Key Design Decisions.**
- **Normalized entropy** — Shannon entropy depends on cardinality; dividing by max possible entropy makes clusters with different feature spaces comparable.
- **Mean across features** — equal weight to each feature; weighted mean is a one-line change if needed.
- **Categorical verdict** — dashboards need a label, not a number.
- **Outlier detection is a separate step** — flag items whose feature values disagree with the cluster's dominant on ≥50% of features.
- **Tradeoff considered:** Could use silhouette score (K-means style), but features here are categorical, not continuous. Entropy is the right tool.

**This Codebase.** `lib/lora/coherence.ts` (`computeBucketCoherence`). Drives `/admin/lora/coherence`.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Single comparable score across heterogeneous clusters | Treats all features equally by default |
| Pure function over `Record<string,string>` items | Doesn't tell you *what* to do — just that something's drifty |
| Linear time in items × features | Can't capture inter-feature correlations (e.g. "warm + soft" valid, "warm + harsh" invalid) |

---

## 8. Editorial Lifecycle State Machine

**Problem.** Content and curatorial systems need a four-state lifecycle: candidate → chosen → in_piece → retired. Curator decisions (status changes) must survive automated re-ingestion. Status changes drive downstream behavior (rendering, indexing, billing).

**The Pattern.**

```ts
type EditorialStatus = "candidate" | "chosen" | "in_piece" | "retired";

type Transition =
  | { from: "candidate"; to: "chosen"; reason: string }
  | { from: "chosen"; to: "in_piece"; piece_id: string }
  | { from: EditorialStatus; to: "retired"; reason: string };

const ALLOWED: Record<EditorialStatus, EditorialStatus[]> = {
  candidate: ["chosen", "retired"],
  chosen: ["in_piece", "retired", "candidate"], // can demote
  in_piece: ["retired"],
  retired: [], // terminal under normal flow
};

function canTransition(from: EditorialStatus, to: EditorialStatus): boolean {
  return ALLOWED[from].includes(to);
}

// Idempotency: writing same status to same row is a no-op
async function setStatus(id: string, next: EditorialStatus, reason?: string) {
  const row = await db.from("entities").select("status").eq("id", id).single();
  if (row.status === next) return; // idempotent
  if (!canTransition(row.status, next)) {
    throw new Error(`Illegal transition ${row.status} → ${next}`);
  }
  await db.from("entities").update({
    status: next,
    status_reason: reason,
    status_updated_at: new Date().toISOString(),
  }).eq("id", id);
}
```

Re-ingest must NOT overwrite curator state:

```ts
async function reingestRow(parsed: ParsedRow) {
  const existing = await db.from("entities").select("status").eq("natural_key", parsed.natural_key).maybeSingle();
  await db.from("entities").upsert({
    ...parsed,
    // never overwrite status if curator has touched it
    status: existing?.status ?? "candidate",
  }, { onConflict: "natural_key" });
}
```

**Key Design Decisions.**
- **Status changes only via `setStatus`** — no `db.update({ status })` scattered through the codebase. Grep-able invariant.
- **Idempotent writes** — same status → no-op, including no `status_updated_at` bump.
- **Re-ingest preserves status** — automated scripts MUST NOT regress curator decisions.
- **`retired` is terminal under normal flow** — un-retire is an admin-explicit action with audit.
- **Tradeoff considered:** A full event-sourced lifecycle (immutable status_events table) is more auditable but heavier. The single mutable column + audit log is enough for editorial workflows.

**This Codebase.** Used across `mosaic_passages`, `excerpts`, `magazine_articles`, training pool decisions. The pattern is consistently applied even though each table implements it independently.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Curator decisions survive script reruns | Idempotency must be enforced consistently across every writer |
| Cheap to query by status | No history (add an audit table for that) |
| Small, finite state space — easy to reason about | "Re-open retired" requires explicit admin action |

---

## 9. Idempotent Pipeline Upsert by Natural Key

**Problem.** Ingest scripts crash, re-run, partial-fail. Without a stable natural key + upsert semantics, retries either explode (unique-constraint violation) or duplicate rows.

**The Pattern.**

```ts
type ParsedRow = {
  natural_key: string; // stable across re-parses (e.g. content hash, source URL, slug)
  // ... everything else parsed from source
};

async function ingestParsedRow(parsed: ParsedRow) {
  // Read curator-managed fields first so upsert doesn't clobber them
  const existing = await db
    .from("entities")
    .select("editorial_status, curator_notes, manual_overrides")
    .eq("natural_key", parsed.natural_key)
    .maybeSingle();

  await db.from("entities").upsert(
    {
      ...parsed,
      editorial_status: existing?.data?.editorial_status ?? "candidate",
      curator_notes: existing?.data?.curator_notes ?? null,
      manual_overrides: existing?.data?.manual_overrides ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "natural_key" },
  );
}
```

**Key Design Decisions.**
- **Natural key, not surrogate** — `natural_key` is content-derived (hash, slug, source ID); replays produce the same row.
- **Read-then-upsert** — curator fields (`editorial_status`, notes, overrides) are *read first* and re-supplied to upsert so the script can't regress them.
- **Single transaction not required** — read-then-upsert is fine because curator fields rarely change mid-ingest; if they do, last-write-wins on the upsert is acceptable.
- **Tradeoff considered:** Postgres `INSERT ... ON CONFLICT DO UPDATE SET col = EXCLUDED.col` could do this in one statement, but the read-then-upsert form is clearer and works through ORMs.

**This Codebase.** Mosaic passage ingestion (`scripts/mosaic/ingest-passages.ts` family); museum source ingest in `scripts/artwork/sources/*`; `lib/ingest/insert-with-attribution.ts`.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Re-runs are safe; no manual cleanup after failures | Two queries per row (read + upsert) — slower than single-statement upsert |
| Curator fields protected by construction | Race window between read and upsert (acceptable for low-write workloads) |
| Works through any ORM | Depends on a real natural key (not always available) |

---

## 10. Insert-Promote with FK-Gated Trigger

**Problem.** A row's "active" state is gated by a Postgres trigger that requires a sibling row in another table. If you insert the parent row already active, the trigger fires too early. If you insert the sibling first, you have no parent FK to link to.

**The Pattern.** Three-step insert: insert parent at safe state, insert sibling, then promote parent.

```ts
async function insertWithGatedSibling(
  parent: ParentRow,
  sibling: SiblingRow,
  desiredFinalStatus: "active",
) {
  // Step 1: insert parent at gate-safe status
  const initial = desiredFinalStatus === "active" ? "pending_review" : desiredFinalStatus;
  const { data: parentRow } = await db
    .from("parents")
    .insert({ ...parent, status: initial })
    .select("id")
    .single();

  // Step 2: insert sibling — FK now satisfied
  await db.from("siblings").insert({ parent_id: parentRow.id, ...sibling });

  // Step 3: promote — trigger reads sibling and allows transition
  if (desiredFinalStatus === "active") {
    const { error } = await db
      .from("parents")
      .update({ status: "active" })
      .eq("id", parentRow.id);
    if (error) {
      // Trigger refused → parent stays at pending_review
      return { id: parentRow.id, actualStatus: "pending_review", downgraded: true };
    }
  }
  return { id: parentRow.id, actualStatus: desiredFinalStatus, downgraded: false };
}
```

**Key Design Decisions.**
- **Initial status is the safest the gate accepts** — typically a "pending review" or "draft" state.
- **The trigger is the source of truth** — the function tries to promote, but if the gate refuses, the row stays at safe state and the caller is told.
- **Returned `downgraded` flag** — caller can surface "license missing" or "review needed" without running its own gate logic.
- **Tradeoff considered:** Using `DEFERRABLE INITIALLY DEFERRED` constraints with a transaction would be cleaner, but Postgres triggers don't always support deferral. This three-step form works regardless of trigger semantics.

**This Codebase.** `lib/ingest/insert-with-attribution.ts` (`insertExperienceUnitWithAttribution`). The license-check trigger on `experience_units` requires a `content_attribution` row before allowing `status='active'`.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Works with any trigger, including non-deferrable | Three round-trips instead of one transaction |
| Caller learns whether the gate accepted | More complex than a single insert |
| Naturally records "promotion attempted, denied" state | Race possible if sibling is deleted between steps 2 and 3 |

---

## 11. Append-Only Audit History with Pool Ladder

**Problem.** Items move between curated pools/tiers based on automated scoring. You need: (a) the current state, (b) the full history of moves with reasons, (c) a way to "lock" certain items so they never move automatically.

**The Pattern.**

```ts
type Tier = "INBOX" | "D" | "C" | "B" | "A" | "ARCHIVE";

const PROMOTE: Record<Tier, Tier | null> = {
  INBOX: "D", D: "C", C: "B", B: "A", A: null, ARCHIVE: null,
};
const DEMOTE: Record<Tier, Tier | null> = {
  A: "B", B: "C", C: "D", D: "INBOX", INBOX: null, ARCHIVE: null,
};

type Item = {
  id: string;
  tier: Tier;
  score: number | null;
  locked: boolean; // chosen-one / curator-anchored
  sample_count: number;
};

async function applyTransitions(items: Item[]) {
  const moves: { item_id: string; from: Tier; to: Tier; reason: string }[] = [];
  for (const item of items) {
    if (item.locked) continue; // anchors never move
    if (item.sample_count < MIN_SAMPLES) continue; // not enough data

    let next: Tier | null = null;
    let reason = "";
    if (item.score != null && item.score >= 0.7 && PROMOTE[item.tier]) {
      next = PROMOTE[item.tier];
      reason = "promotion";
    } else if (item.score != null && item.score <= 0.3 && DEMOTE[item.tier]) {
      next = DEMOTE[item.tier];
      reason = "demotion";
    }
    if (next && next !== item.tier) {
      moves.push({ item_id: item.id, from: item.tier, to: next, reason });
    }
  }
  // Apply mutations + append history in one batch
  if (moves.length) {
    await db.from("items").upsert(moves.map((m) => ({ id: m.item_id, tier: m.to })));
    await db.from("item_tier_history").insert(
      moves.map((m) => ({ ...m, moved_at: new Date().toISOString() })),
    );
  }
  return moves;
}
```

**Key Design Decisions.**
- **Two ladder maps** — promotion and demotion are explicit; terminal states return `null`.
- **`locked` short-circuits** — curator-anchored items are immutable to automation (admin can still move them manually).
- **Min sample size** — items with <N data points aren't moved (avoids noise-driven thrash).
- **History is append-only** — every move logged; current tier is the latest in history (or denormalized on the item row for fast reads).
- **Batch only mutates items that actually move** — no-op rows aren't written.
- **Tradeoff considered:** A finite state machine with arbitrary transitions is more flexible. The ladder form is restrictive on purpose — it forces the design to *be* monotonic-step-at-a-time, which is what curators expect.

**This Codebase.** `lib/reincarnation/pool-manager.ts`. The pool column lives on `experience_units`; history in `unit_pool_history`. Curator-anchored items have `chosen_one = true`.

**Tradeoffs.**

| Pro | Con |
|---|---|
| One-step movements are predictable for curators | Bigger swings (INBOX → A) take many runs |
| Locking mechanism is one boolean | Requires both items table and history table |
| Easy to dashboard ("how many items moved last night?") | Score thresholds need tuning per domain |

---

## 12. Append-Only Signal Capture

**Problem.** User interactions (ratings, scrolls, dwells, decisions) need to feed back into ranking, segmentation, or ML retraining. Mutating user-state rows on every interaction is fragile (last-write-wins, lost intermediate state). You want an immutable event log.

**The Pattern.**

```ts
type Signal = {
  id: string; // server-generated UUID
  user_id: string;
  entity_id: string;
  signal_type: "view" | "rating" | "save" | "dismiss" | "scroll_depth";
  value: number | null; // numeric payload (rating, dwell ms, scroll %)
  source: string; // origin tag — "player", "magazine", "three_rooms"
  session_id: string | null;
  created_at: string;
};

export async function POST(req: Request) {
  const supabase = await createServerDb();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const limited = await rateLimit({ user_id: user.id, endpoint: "signal" });
  if (!limited.ok) return new Response("Too Many Requests", { status: 429 });

  const body = await req.json();
  await supabase.from("signals").insert({
    user_id: user.id,
    entity_id: body.entity_id,
    signal_type: body.signal_type,
    value: body.value ?? null,
    source: body.source ?? "unknown",
    session_id: body.session_id ?? null,
  });
  return Response.json({ ok: true });
}
```

**Key Design Decisions.**
- **Insert-only, never update** — signals are immutable; corrections go through a "retracted by" pattern (insert a new signal that references the old one).
- **`source` tag** — same signal type from different products is distinguishable. Critical when the same `signals` table serves player, magazine, three-rooms, etc.
- **Rate-limited per-user** — append-only tables grow unbounded under abuse.
- **Auth-checked** — anonymous signals go to a separate sessionless events table or are dropped.
- **No fancy join keys** — `entity_id` is opaque; the consumer joins to the relevant entity table.
- **Tradeoff considered:** Could batch signals client-side and POST in groups. Worth doing once per-signal POSTs become a bottleneck, but per-signal is simpler.

**This Codebase.** `responses` + `capture_signals` for player; `reader_text_signals` for magazine; `three_rooms_reveals` for Three Rooms (different table because the schema varies). `lib/three-rooms/signal-writer.ts` and `app/api/platform/signal/text/route.ts` show the pattern.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Lossless event log; rebuildable analytics | Table grows linearly; needs partitioning or rollup over time |
| Easy to add new signal_types without migration | Per-signal POST is chatty |
| Source tag enables per-product analytics | No client-side dedup — caller must idempotent its own retries |

---

## 13. Dual-Write Fanout with Legacy FK

**Problem.** You're migrating from an old schema (Mosaic passages) to a new one (NI excerpts). The new system isn't ready to be authoritative. You can't freeze writes to the old system. You need every write to the old to fan out to the new, idempotently.

**The Pattern.**

```ts
type LegacyPassage = {
  id: string;
  body: string;
  charge: number;
  arc_stage: string | null;
  themes: string[];
  editorial_status: EditorialStatus;
};

async function dualWritePassageToNewSpine(passage: LegacyPassage): Promise<void> {
  const existing = await db
    .from("excerpts")
    .select("id")
    .eq("legacy_passage_id", passage.id) // idempotency key
    .maybeSingle();

  if (existing.data) {
    await db.from("excerpts").update({
      excerpt_text: passage.body,
      emotional_intensity: passage.charge,
      narrative_position: mapArcStage(passage.arc_stage),
      updated_at: new Date().toISOString(),
    }).eq("id", existing.data.id);
  } else {
    const { data: created } = await db.from("excerpts").insert({
      excerpt_text: passage.body,
      emotional_intensity: passage.charge,
      narrative_position: mapArcStage(passage.arc_stage),
      legacy_passage_id: passage.id, // FK back to old system
    }).select("id").single();
    if (created) {
      // Re-derive joins (themes, tags) from legacy state
      await rebuildExcerptThemes(created.id, passage.themes);
    }
  }
}

// Caller handles errors as non-fatal
async function writeAndFanout(passage: LegacyPassage) {
  await db.from("legacy_passages").upsert(passage); // primary
  try {
    await dualWritePassageToNewSpine(passage);
  } catch (e) {
    // log but don't block primary
    console.warn("dual-write failed", { id: passage.id, e });
  }
}
```

**Key Design Decisions.**
- **Legacy FK as idempotency key** — `legacy_passage_id` makes "did I already fan this out?" a single query.
- **Primary write commits first; secondary is best-effort** — the migration must never block business operations.
- **Periodic reconciliation script** — finds legacy rows missing from new spine, re-runs fanout. Repairs missed writes.
- **Rebuild joins on insert, update in place on existing** — joins (themes, tags) are derivable; rebuild is cheaper than diffing.
- **Tradeoff considered:** Could use a Postgres trigger on the legacy table. Application-level fanout is more visible in logs and easier to disable.

**This Codebase.** `scripts/narrative-intelligence/dual-write.ts`. The migration target is `excerpts` (and join tables); `legacy_mosaic_passage_id` is the idempotency FK. See `docs/VELA-NARRATIVE-INTELLIGENCE-RECONCILIATION.md`.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Primary system never blocked by migration code | Need a reconciliation pass to catch failures |
| Idempotent via legacy FK | Two writes per operation (slower) |
| New spine can be rebuilt from legacy at any time | New schema constrained to be derivable from old |

---

## 14. Multi-Stage Cron with Per-Stage Error Isolation

**Problem.** A nightly batch needs to run several independent stages (score, move, update profiles). If one stage fails, you don't want to lose the others. You also want a single cron entrypoint, not N.

**The Pattern.**

```ts
type StageResult = { name: string; ok: boolean; metrics: Record<string, number>; error?: string };

export async function GET(req: Request): Promise<Response> {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const start = Date.now();
  const stages: StageResult[] = [];

  for (const stage of [scoreStage, poolMoveStage, profileUpdateStage]) {
    try {
      const metrics = await stage();
      stages.push({ name: stage.name, ok: true, metrics });
    } catch (e) {
      stages.push({
        name: stage.name,
        ok: false,
        metrics: {},
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }
  return Response.json({
    duration_ms: Date.now() - start,
    stages,
    ok: stages.every((s) => s.ok),
  });
}
```

**Key Design Decisions.**
- **Bearer secret in `Authorization`** — Vercel cron supplies this header; same shape works for manual curl invocations.
- **Sequential, not parallel** — stages can depend on each other (e.g. profiles read scores). Parallelize only inside a stage.
- **Per-stage try/catch** — one stage's exception doesn't kill the others.
- **Response body is the run report** — observability without an external logging system. `/admin/qa` or similar can ingest this.
- **`ok: false`** flips on any failure — easy alerting condition.
- **Tradeoff considered:** Workflow DevKit (durable workflows with retries) would handle partial failures more cleanly for jobs that span hours. For a 60-second batch, plain try/catch is enough.

**This Codebase.** `app/api/cron/reincarnation/route.ts`. Stages: scorer, pool mover, profile updater. Configured in `vercel.json` (or `vercel.ts`).

**Tradeoffs.**

| Pro | Con |
|---|---|
| One stage failure doesn't block the others | No retries for the failed stage (next run picks it up) |
| Single cron entry to monitor | Sequential execution can be slow for many stages |
| Self-reporting (response body has the run summary) | Long runs may exceed function timeout (300s default) |

---

## 15. Provider/Adapter Strategy with Discriminated Union

**Problem.** Multiple external sources (museum APIs, social platforms, payment processors) all need to be queried with similar parameters and produce similar normalized output. You want adding a new source to be a low-friction, low-blast-radius change.

**The Pattern.**

```ts
type SourceId = "alpha" | "beta" | "gamma";

type SearchParams = {
  source: SourceId;
  query: string;
  limit?: number;
};

type Candidate = {
  source: SourceId;
  source_id: string;
  title: string;
  // ... normalized fields
};

// Each adapter exports one async function
import { searchAlpha, fetchAlphaById } from "./sources/alpha";
import { searchBeta,  fetchBetaById  } from "./sources/beta";
import { searchGamma, fetchGammaById } from "./sources/gamma";

export async function searchSource(p: SearchParams): Promise<Candidate[]> {
  switch (p.source) {
    case "alpha": return searchAlpha(p);
    case "beta":  return searchBeta(p);
    case "gamma": return searchGamma(p);
    default: {
      const _exhaustive: never = p.source; // compile error if a SourceId is added without a case
      throw new Error(`unhandled source: ${_exhaustive}`);
    }
  }
}

export async function fetchById(source: SourceId, id: string): Promise<Candidate | null> {
  switch (source) {
    case "alpha": return fetchAlphaById(id);
    case "beta":  return fetchBetaById(id);
    case "gamma": return fetchGammaById(id);
    default: { const _: never = source; throw new Error(); }
  }
}
```

**Key Design Decisions.**
- **Discriminated union, not class hierarchy** — adapters are functions, not objects with state.
- **`never` exhaustiveness check** — adding a source to `SourceId` triggers TypeScript errors at every dispatcher until handled.
- **Each adapter is independent** — separate file, separate test, separate env vars. Adding a new source touches `sources/<new>.ts` + the dispatcher.
- **Normalized output type** — every adapter returns the same shape; consumers don't branch on source.
- **Tradeoff considered:** A registry pattern (`registerAdapter("alpha", searchAlpha)`) is more dynamic but loses exhaustiveness checking. Static dispatch is preferred when the set of providers is small and known at build time.

**This Codebase.** `scripts/artwork/sources/` — `artic.ts`, `met.ts`, `bnf.ts`, `clark.ts`, `europeana.ts`, `rijksmuseum.ts`, `norton_simon.ts`. Dispatcher in `scripts/artwork/sources/index.ts`.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Compile-time check that every source is handled | New adapter requires touching the dispatcher |
| Adding a source is ~100 LOC + dispatcher line | No runtime registration (can't add adapters via plugin) |
| Each adapter file is independently testable | Shared concerns (auth, retries) duplicated unless extracted |

---

## 16. Hash-Based Asset Deduplication

**Problem.** Assets (images, files) arrive from multiple sources and may be re-submitted. You want one canonical row per content, regardless of source URL or upload time.

**The Pattern.**

```ts
import { createHash } from "node:crypto";

export function sha256(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex");
}

async function ingestAssetWithDedup(
  buffer: Buffer,
  source: { source_id: string; source_url: string },
): Promise<{ id: string; created: boolean }> {
  const file_hash = sha256(buffer);

  // Lookup by hash first
  const existing = await db
    .from("assets")
    .select("id")
    .eq("file_hash", file_hash)
    .maybeSingle();

  if (existing.data) {
    // Optionally record alternate source
    await db.from("asset_sources").insert({
      asset_id: existing.data.id,
      source_id: source.source_id,
      source_url: source.source_url,
    }).onConflict("asset_id,source_id").ignore();
    return { id: existing.data.id, created: false };
  }

  // Upload to storage at deterministic path
  const path = `assets/${file_hash.slice(0, 2)}/${file_hash}`;
  await storage.upload(path, buffer);

  const { data } = await db.from("assets").insert({
    file_hash,
    storage_path: path,
    bytes: buffer.byteLength,
  }).select("id").single();

  await db.from("asset_sources").insert({
    asset_id: data.id,
    source_id: source.source_id,
    source_url: source.source_url,
  });
  return { id: data.id, created: true };
}
```

**Key Design Decisions.**
- **Hash as the unique key on the assets table** — Postgres index makes lookup O(log n).
- **Storage path is hash-derived** — sharded by first two hex chars to avoid huge directories.
- **Sources table is many-to-one** — one canonical asset can have many origin URLs.
- **Conflict-ignore on source insert** — re-submission of the same asset+source pair is a no-op.
- **Tradeoff considered:** Perceptual hash (pHash) catches near-duplicates (resized, recompressed) but is much harder to enforce uniqueness on. Content hash is exact-match only — appropriate when most duplicates are exact reuploads.

**This Codebase.** `lib/training-pool/promote.ts` (`sha256Buffer`, dedupe by `lora_training_images.file_hash`). The same pattern is implicit in chrome-extension ingest.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Exact-duplicate detection is O(log n) | Misses near-duplicates (compressed, cropped) |
| Hash-derived storage path doesn't depend on DB ID | Renaming an asset breaks any URL referencing the path |
| Many-source support is built in | Hash collision handling required (sha256 makes this practically impossible) |

---

## 17. Multi-Fallback JSON Parsing for LLM Output

**Problem.** LLM responses claim to be JSON but sometimes wrap output in markdown fences, prepend prose, or embed the JSON inside a larger response. A single `JSON.parse()` fails for all but the cleanest output.

**The Pattern.**

```ts
export function parseJsonFromLlm<T = unknown>(text: string): T | null {
  const trimmed = text.trim();

  // 1. Try plain parse
  try { return JSON.parse(trimmed) as T; } catch {}

  // 2. Try markdown fence: ```json ... ``` or ``` ... ```
  const fence = /```(?:json)?\s*([\s\S]*?)```/.exec(trimmed);
  if (fence?.[1]) {
    try { return JSON.parse(fence[1].trim()) as T; } catch {}
  }

  // 3. Try first balanced object or array in the text
  const obj = trimmed.match(/\{[\s\S]*\}/);
  if (obj) {
    try { return JSON.parse(obj[0]) as T; } catch {}
  }
  const arr = trimmed.match(/\[[\s\S]*\]/);
  if (arr) {
    try { return JSON.parse(arr[0]) as T; } catch {}
  }

  return null;
}

// Always validate after parsing
function validateFragments(parsed: unknown): Fragment[] {
  if (!Array.isArray(parsed)) return [];
  return parsed.filter((f): f is Fragment =>
    typeof f === "object" && f !== null &&
    typeof (f as any).body_region === "string" &&
    typeof (f as any).crop_box?.x === "number"
  );
}
```

**Key Design Decisions.**
- **Three fallbacks in order of strictness** — most LLM responses parse on attempt 1; the rest on 2.
- **Greedy regex on first object/array** — works for embedded JSON; can pick up extra trailing whitespace, but `JSON.parse` handles that.
- **Returns `null` on total failure** — caller decides whether to retry the LLM call or treat as empty result.
- **Post-parse validation is mandatory** — parse success doesn't mean shape is right. Use Zod or a hand-written guard.
- **Tradeoff considered:** Could use a streaming JSON parser. The fallback approach is simpler and handles the >95% case.

**This Codebase.** `lib/ingest/fragment-detector.ts` (`parseJsonArray`); similar logic in `lib/decomposition/`, `lib/lora/vision-classifier.ts`. Anywhere an LLM is asked to return structured data.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Robust to common LLM formatting drift | Won't recover from truly malformed JSON |
| No external dependency | Three regex passes per call (cheap but not free) |
| Easy to extend with a 4th fallback | Validation is a separate concern caller must remember |

---

## 18. Bounded Retry with Tolerable Partial Failure

**Problem.** A batch operation downloads N items from a flaky source. All-or-nothing retries fail when one item is permanently broken. No retries lose transient-failure items. You want: per-item retry with backoff, then accept partial success up to a tolerance.

**The Pattern.**

```ts
type BatchResult<T> = { ok: T[]; failed: { item: unknown; error: Error }[] };

async function fetchWithRetry(url: string, attempts = 4, baseDelayMs = 1500): Promise<Buffer> {
  let lastErr: Error | undefined;
  for (let i = 0; i < attempts; i++) {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return Buffer.from(await r.arrayBuffer());
    } catch (e) {
      lastErr = e instanceof Error ? e : new Error(String(e));
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, baseDelayMs * (i + 1)));
      }
    }
  }
  throw lastErr ?? new Error("Retry exhausted");
}

export async function downloadAll(urls: string[]): Promise<BatchResult<Buffer>> {
  const ok: Buffer[] = [];
  const failed: { item: string; error: Error }[] = [];
  for (const url of urls) {
    try { ok.push(await fetchWithRetry(url)); }
    catch (e) { failed.push({ item: url, error: e as Error }); }
  }

  // Accept partial: ≤ max(4, 5%) failures
  const tolerable = Math.max(4, Math.floor(urls.length / 20));
  if (failed.length > tolerable) {
    throw new Error(`Too many failures: ${failed.length}/${urls.length}`);
  }
  if (ok.length < MIN_REQUIRED) {
    throw new Error(`Insufficient successes: ${ok.length} < ${MIN_REQUIRED}`);
  }
  return { ok, failed };
}
```

**Key Design Decisions.**
- **Linear backoff (1.5x i)** — for short retry chains, exponential adds little; linear is easier to reason about.
- **Two failure thresholds** — *tolerable failure rate* (≤5%) AND *minimum successes* (e.g. 20). Either alone is insufficient.
- **Per-item retry, batch tolerance** — combines item-level resilience with batch-level safety.
- **Failure list returned for logging** — caller can record which items were dropped.
- **Tradeoff considered:** Parallel downloads (Promise.allSettled) are faster but harder to bound concurrency without a queue. Sequential is fine for batches up to ~100 items.

**This Codebase.** `modal/lora_training.py` — Modal training image download (4 attempts, ≤5% failure tolerated, ≥20 minimum). The same pattern in `lib/lora/vision-classifier.ts` (image fetch before Haiku call).

**Tradeoffs.**

| Pro | Con |
|---|---|
| Resilient to transient flakes without losing the batch | Sequential downloads are slow for large batches |
| Permanent failures don't block the rest | Two thresholds need tuning per use case |
| Failure list aids root-cause analysis | No circuit breaker (all bad URLs still get 4 attempts each) |

---

## 19. One-Way Import Boundary (lint-enforced kernel)

**Problem.** Building a generic kernel inside a host application — a library you intend to extract later — is doomed unless coupling is enforced. Without a guard, the kernel grows imports back into the host and becomes inseparable.

**The Pattern.** ESLint custom rule that fails on imports crossing the wall.

```js
// eslint.config.mjs
export default [
  {
    files: ["lib/kernel/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/lib/*", "@/app/*", "@/components/*"],
              message:
                "lib/kernel/ must not import from the host app. " +
                "If you need a type from the host, copy it or invert the dependency.",
            },
          ],
        },
      ],
    },
  },
];
```

CI guard:

```bash
# package.json
"scripts": {
  "qa:kernel-boundary": "eslint lib/kernel/ --rule no-restricted-imports:error"
}
```

Sanctioned exceptions are documented inline:

```ts
// lib/kernel/extraction/foo.ts
// EXCEPTION (issue #68): we import a type-only declaration from the host
// because we'd otherwise have to duplicate the entire schema. Reviewed and
// approved by the kernel-extraction team.
import type { HostType } from "@/lib/host/schema";
```

**Key Design Decisions.**
- **Lint, not folder structure** — file-system separation is cosmetic; the lint rule is what actually prevents drift.
- **Pattern-based** — `@/lib/*` and `@/app/*` cover the host; the kernel itself is exempt.
- **Exceptions in code, not config** — sanctioned exceptions get an inline comment with issue ref. Reviewers see them.
- **CI runs the same rule** — local `npm run lint` and CI both enforce.
- **Tradeoff considered:** A separate package (`@org/kernel`) with workspace boundaries is the *real* fix. The lint rule is a stepping-stone that keeps the kernel extractable.

**This Codebase.** `lib/platform/` — adaptive authorship kernel. Lint guard via `npm run qa:platform-boundary`. Sanctioned exception: `lib/platform/extraction/image-to-visual-decomposition.ts` imports types from `lib/decomposition/schema.ts` (per ASN-68).

**Tradeoffs.**

| Pro | Con |
|---|---|
| Catches violations at lint time, not extraction time | New engineers may not understand why the rule exists |
| Easy to add per-directory rules | Rule needs to be re-applied if files move |
| Documents the architectural intent in CI | False positives (legitimate cross-cuts) need exception comments |

---

## 20. Flexible JSONB State Column on Hot Rows

**Problem.** A row needs to track a small, evolving collection of nested state (e.g. transformations applied, retries logged, per-style status). A child table is normalized but adds a join on every read. The state changes infrequently per row.

**The Pattern.**

```ts
type Transformation = {
  style: string;
  status: "processing" | "completed" | "failed";
  prediction_id: string;
  submitted_at: string;
  completed_at?: string;
  storage_path?: string;
  error?: string;
};

// SQL: ALTER TABLE assets ADD COLUMN transformations jsonb DEFAULT '[]'::jsonb;

async function appendTransformation(asset_id: string, t: Transformation) {
  // Read-modify-write — fine for low-write entities
  const { data: row } = await db
    .from("assets").select("transformations").eq("id", asset_id).single();
  const current = Array.isArray(row?.transformations) ? row.transformations : [];
  const next = [...current, t];
  await db.from("assets").update({ transformations: next }).eq("id", asset_id);
}

async function updateTransformationStatus(prediction_id: string, patch: Partial<Transformation>) {
  // JSONB containment query finds the row
  const { data: rows } = await db
    .from("assets")
    .select("id, transformations")
    .filter("transformations", "cs", JSON.stringify([{ prediction_id }]));

  if (!rows?.[0]) return;
  const transforms = (rows[0].transformations as Transformation[]) ?? [];
  const idx = transforms.findIndex((t) => t.prediction_id === prediction_id);
  if (idx === -1) return;
  transforms[idx] = { ...transforms[idx], ...patch };
  await db.from("assets").update({ transformations: transforms }).eq("id", rows[0].id);
}
```

**Key Design Decisions.**
- **JSONB array of objects** — supports unlimited entries per row without schema changes.
- **Lookup by JSONB containment (`cs`)** — Postgres can index JSONB; queries are fast enough at this scale.
- **Read-modify-write** — fine when concurrency is low (per-asset writes are rare). For high contention, use Postgres `jsonb_set`.
- **Atomic updates** — single UPDATE statement, no need for a transaction across two tables.
- **Tradeoff considered:** A child table is more queryable (`SELECT * FROM transformations WHERE status='failed'`). JSONB wins when the access pattern is "load this asset and show its history."

**This Codebase.** `gallery_images.transformations` is a JSONB array; webhook handler in `app/api/transform/webhook/route.ts` updates entries by `prediction_id` containment.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Atomic single-row updates | Cross-row queries (`status=failed everywhere`) are slower |
| No migration to add new fields | Schema evolution is implicit — easy to drift |
| Whole history loads with the parent | Row size grows with entries; can hit 1MB row limit |

---

## 21. Polling Status Endpoint over Push Webhook

**Problem.** A frontend needs to display progress of long-running jobs. Push webhooks require a public endpoint, signature handling, and reconciliation when delivery fails. Polling is simpler but wastes CPU on idle jobs.

**The Pattern.** Build a status endpoint that aggregates everything the UI needs in one query.

```ts
// app/api/admin/jobs/status/route.ts
export async function GET() {
  const db = createServiceDb();
  const [{ data: jobs }, { data: workers }] = await Promise.all([
    db.from("jobs").select("id, status, progress_pct, created_at, error_message")
      .in("status", ["pending", "running", "ready", "failed"])
      .order("created_at", { ascending: false })
      .limit(100),
    db.from("workers").select("id, last_heartbeat_at, capacity_used"),
  ]);

  return Response.json({
    jobs: jobs ?? [],
    workers: workers ?? [],
    served_at: new Date().toISOString(),
  });
}
```

Frontend polls (e.g., `useSWR(..., { refreshInterval: 30_000 })`).

**Key Design Decisions.**
- **One endpoint returns everything the UI shows** — no N+1 queries on the client.
- **`served_at` timestamp** — UI can show "last updated X seconds ago" without local clock skew.
- **Status filter on the server** — completed jobs pruned to avoid sending huge histories.
- **Service-role read** — admin-only endpoint; bypasses RLS for admin convenience.
- **Tradeoff considered:** SSE (Server-Sent Events) is more efficient for real-time, but adds connection management. Polling is fine when latency requirements are >5 seconds.

**This Codebase.** `app/api/admin/lora/training/status/route.ts`. Frontend polls; Modal worker writes the rows directly (Pattern 3).

**Tradeoffs.**

| Pro | Con |
|---|---|
| Stateless — works through any reverse proxy | Wastes requests when nothing is happening |
| No webhook signature handling | Latency floor = poll interval |
| Easy to debug (just curl the URL) | Doesn't scale to thousands of clients per server |

---

## 22. Plaintext-in-Body Secret for Internal Endpoints

**Problem.** Internal services (web app → worker) need cheap, reliable mutual auth. HMAC-signed webhooks are the right answer for *external* callers. For trusted-host-to-trusted-host calls, full HMAC is overkill.

**The Pattern.**

```python
# Worker side
@app.function(secrets=[shared_secrets])
@modal.fastapi_endpoint(method="POST")
def trigger(payload: dict[str, Any]) -> dict[str, Any]:
    secret = os.environ.get("TRIGGER_SECRET", "")
    if not secret or payload.get("trigger_secret") != secret:
        return {"ok": False, "error": "Unauthorized"}
    # ... proceed
```

```ts
// Caller side (web app)
const res = await fetch(WORKER_URL, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ ...payload, trigger_secret: process.env.TRIGGER_SECRET! }),
});
```

For *external* webhooks (Replicate, Stripe), use header-based verification:

```ts
export async function POST(request: Request) {
  const expected = process.env.WEBHOOK_SECRET!;
  const got =
    request.headers.get("webhook-secret") ??
    request.headers.get("x-replicate-signature") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!got || got !== expected) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  // ... process
}
```

**Key Design Decisions.**
- **Plaintext over HTTPS is sufficient** for trusted-host pairs — TLS encrypts the body.
- **Body, not header, for the trigger** — many serverless platforms log headers but not bodies; secret-in-body is less likely to leak to logs.
- **Header-based for external callers** — matches the convention every external platform uses; Stripe, Replicate, GitHub all use headers.
- **Constant-time comparison** for sensitive cases (use `crypto.timingSafeEqual`); plain `===` is fine for low-value internal endpoints.
- **Tradeoff considered:** Full HMAC-SHA256 with timestamp + nonce is the gold standard. Use it for external webhooks; skip it for internal-only endpoints where the friction outweighs the threat.

**This Codebase.** Modal trigger endpoint validates `trigger_secret` from body (`modal/lora_training.py`). Replicate webhook validates `webhook-secret` header (`app/api/transform/webhook/route.ts`).

**Tradeoffs.**

| Pro | Con |
|---|---|
| Trivial to implement | No replay protection (HMAC + nonce is needed for that) |
| No clock-sync requirement | Logs may capture the secret if body is logged |
| Same secret rotates with environment variables | Doesn't satisfy security audits expecting HMAC |

---

## 23. Display Component / Data Loader Separation

**Problem.** UI components that fetch their own data are hard to storybook, hard to test, and hard to reuse in different contexts (preview vs. live). Components that take data as props are reusable but require a wrapper layer.

**The Pattern.** Server Component (data) → Client Component (UI). The display component is pure props-in.

```tsx
// app/admin/widgets/[id]/page.tsx — Server Component, async
import { WidgetDisplay } from "@/components/widgets/WidgetDisplay";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await createServerDb();
  const { data: widget } = await db.from("widgets").select("*").eq("id", id).single();
  if (!widget) return <NotFound />;
  return <WidgetDisplay widget={widget} />;
}

// components/widgets/WidgetDisplay.tsx — pure, no fetching
"use client";
export function WidgetDisplay({ widget }: { widget: Widget }) {
  // pure render
}

// app/design/widget/page.tsx — same display, fixture data
import { WidgetDisplay } from "@/components/widgets/WidgetDisplay";
import { widgetFixture } from "@/components/widgets/__fixtures__";
export default function DesignPreview() {
  return <WidgetDisplay widget={widgetFixture} />;
}
```

**Key Design Decisions.**
- **Server Component owns IO; Client Component owns render** — clean fault line.
- **Display component takes the *full* domain object as a prop** — not parts of it; easy to reason about render dependencies.
- **Fixture file lives next to the component** — `__fixtures__/` directory keeps mock data discoverable.
- **Public design route uses the same display** — proves the component has no hidden coupling.
- **Tradeoff considered:** Could pass props in a wrapper. The Server/Client split makes it impossible to accidentally fetch from a Client Component.

**This Codebase.** `/admin/ni/preview` and `/design/ni` both render the same NI preview component with different data sources (fixtures for `/design/ni`, live data for the admin twin). See `docs/NARRATIVE-INTELLIGENCE-DESIGN.md`.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Display component is storybook-ready | Adds a wrapper layer to every page |
| Fixtures drive design previews | Two routes for the same component (admin + public design ref) |
| Easy to swap data sources for testing | Requires discipline — easy to slip a fetch into the Client Component |

---

## 24. Public-Twin Design Reference Route

**Problem.** Designers, V0/AI tools, and external collaborators need to see the design of an admin-only surface without admin access. Sharing a screenshot rots; an unauthenticated route stays in sync.

**The Pattern.** Mount the same display component at an un-gated `/design/<surface>` route, with fixture data.

```tsx
// app/design/admin-x/page.tsx — un-gated; safe to share externally
export const dynamic = "force-static";
import { AdminXDisplay } from "@/components/admin-x/AdminXDisplay";
import { fixture } from "@/components/admin-x/__fixtures__";
export default function Page() {
  return <AdminXDisplay data={fixture} />;
}
```

```tsx
// app/admin/admin-x/preview/page.tsx — admin twin (same display, live data)
export default async function Page() {
  await requireAdmin();
  const data = await loadAdminXData();
  return <AdminXDisplay data={data} />;
}
```

**Key Design Decisions.**
- **`force-static`** — no per-request work; CDN-cacheable, embeddable.
- **Public route uses fixture, admin twin uses live data** — both sites render identically when fixtures match.
- **Documented in AGENTS.md / design docs** — explicit "this URL is safe to share externally."
- **No data plumbing in the design route** — if the fixture is wrong, the design route is wrong; truth lives in the fixture.
- **Tradeoff considered:** A separate Storybook deployment is more powerful but adds a deploy target. The in-app design route reuses the same Next.js deploy.

**This Codebase.** `/design/ni` is un-gated, paired with `/admin/ni/preview` (admin twin). Used in V0 prompts and external design discussions per `docs/NARRATIVE-INTELLIGENCE-DESIGN.md`.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Always-current design reference | Two routes to keep in sync |
| Zero-friction sharing | Fixture data must stay representative |
| Same component, same code path | Must be careful not to leak admin-only data into fixtures |

---

## 25. Markdown → Tagged Passage Ingest

**Problem.** Editors author long-form prose in Markdown. Downstream systems need structured rows tagged with metadata (charge, theme, speaker). Re-runs of the parser must not lose curator-applied state.

**The Pattern.**

```ts
type ParsedPassage = {
  passage_code: string;       // natural key derived from heading or hash
  body: string;
  speaker: string | null;     // from metadata block
  charge: number;             // 1-10 from metadata
  themes: string[];
  arc_stage: "opening" | "rising" | "climax" | "resolution" | null;
  source_path: string;        // file path for traceability
};

export function parseMarkdownPassages(markdown: string, source_path: string): ParsedPassage[] {
  const sections = markdown.split(/^## /m).slice(1); // split by H2
  return sections.map((section) => {
    const [headingLine, ...bodyLines] = section.split("\n");
    const heading = headingLine.trim();
    const body = bodyLines.join("\n").trim();

    // Convention: metadata fenced as ```meta { ... }```
    const metaMatch = /```meta\s*\n([\s\S]*?)\n```/.exec(body);
    const meta = metaMatch ? JSON.parse(metaMatch[1]) : {};
    const cleanBody = metaMatch ? body.replace(metaMatch[0], "").trim() : body;

    return {
      passage_code: meta.code ?? slugify(heading),
      body: cleanBody,
      speaker: meta.speaker ?? null,
      charge: meta.charge ?? 5,
      themes: Array.isArray(meta.themes) ? meta.themes : [],
      arc_stage: meta.arc_stage ?? null,
      source_path,
    };
  });
}

// Idempotent ingest — preserves curator state
async function ingestPassages(parsed: ParsedPassage[]) {
  for (const p of parsed) {
    const existing = await db.from("passages")
      .select("editorial_status, curator_notes")
      .eq("passage_code", p.passage_code)
      .maybeSingle();

    await db.from("passages").upsert(
      {
        ...p,
        editorial_status: existing.data?.editorial_status ?? "candidate",
        curator_notes: existing.data?.curator_notes ?? null,
      },
      { onConflict: "passage_code" },
    );
  }
}
```

**Key Design Decisions.**
- **Heading split, fenced metadata** — Markdown stays readable; metadata is structured.
- **Natural key from heading slug** — re-parses produce the same `passage_code`.
- **Curator fields preserved across re-runs** (Pattern 8 + 9 combined).
- **Source path stored** — easy to find the file from a DB row.
- **Tradeoff considered:** Frontmatter (YAML at the top) is conventional but doesn't allow per-passage metadata. Inline fenced blocks let multiple passages live in one file.

**This Codebase.** `scripts/mosaic/parse-extraction.ts`, `scripts/mosaic/ingest-passages.ts`, and downstream into `mosaic_passages`. The dual-write to NI excerpts (Pattern 13) takes it from there.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Editors keep their authoring tool (any Markdown editor) | Custom metadata syntax must be documented |
| Natural key supports safe re-runs | Heading changes break the key (mitigation: explicit `code` in meta) |
| Source path enables back-tracing | Metadata in fenced block is invisible to non-technical readers |

---

## 26. TTS Sequence Builder (audio + units pairing)

**Problem.** Generated audio (TTS, music, narration) needs to be paired with a curated list of media units in a specific order. The audio file lives in object storage; the pairing lives in the DB; both need to be queryable as a single playable sequence.

**The Pattern.**

```ts
type AudioRow = {
  id: string;
  source_text_id: string;
  storage_path: string;          // bucket path or absolute URL
  duration_seconds: number | null;
  status: "pending" | "ready" | "failed";
};

type SequenceRow = {
  id: string;
  audio_id: string;
  title: string;
  audio_url: string;             // resolved playback URL
  status: "draft" | "published";
};

type SequenceUnitRow = {
  sequence_id: string;
  unit_id: string;
  position: number;              // 1..N
  transition: "fade" | "cut" | "crossfade";
};

async function resolveAudioUrl(audio: AudioRow): Promise<string> {
  if (audio.storage_path.startsWith("http")) return audio.storage_path;
  const { data } = await storage.createSignedUrl(audio.storage_path, 60 * 60 * 24 * 7);
  return data?.signedUrl ?? "";
}

export async function createSequenceFromAudio(
  audioId: string,
  options: { title?: string; unit_ids?: string[] } = {},
) {
  const audio = await db.from("audio").select("*").eq("id", audioId).single<AudioRow>();
  if (!audio.data || audio.data.status !== "ready") throw new Error("audio not ready");

  const audio_url = await resolveAudioUrl(audio.data);
  const { data: seq } = await db.from("sequences").insert({
    audio_id: audio.data.id,
    title: options.title ?? "Untitled",
    audio_url,
    status: "draft",
  }).select("id").single();

  if (options.unit_ids?.length) {
    await db.from("sequence_units").insert(
      options.unit_ids.map((unit_id, i) => ({
        sequence_id: seq.id,
        unit_id,
        position: i + 1,
        transition: "fade",
      })),
    );
  }
  return { sequence_id: seq.id, audio_url };
}
```

**Key Design Decisions.**
- **Audio URL resolution is centralized** — handles both absolute URLs and bucket paths transparently. Caller never asks "is this signed?".
- **Sequence is a thin header; units are a join table** — supports many sequences sharing one audio, or one audio playing alone.
- **Status fields on both audio and sequence** — `audio.ready` is independent of `sequence.published`.
- **`position` instead of timestamps** — units progress at their own pace; not bound to audio length.
- **Tradeoff considered:** Could embed unit IDs as a JSONB array on the sequence row (Pattern 20). Separate join table wins when units need to be queryable independently (e.g. "what sequences contain unit X?").

**This Codebase.** `lib/text/audio-sequence-builder.ts` (`createSequenceFromTextAudio`), `lib/text/elevenlabs-client.ts` (TTS), `text_unit_audio` + `audio_sequences` + `audio_sequence_units` tables.

**Tradeoffs.**

| Pro | Con |
|---|---|
| Audio and sequencing decouple cleanly | Three tables to keep in sync |
| Reusable for any TTS provider (swap the client) | URL resolution adds an async step on read |
| Same audio can power multiple sequences | Cannot capture per-unit timestamp without an extra column |

---

## Pattern Combinations (Named Recipes)

These recipes pair multiple patterns to solve broader system-design problems. Each is named, with the patterns combined and the typical use case.

### Recipe A: "Async-Job-with-Polling"
**Patterns:** 2 + 3 + 21 + 22.
**Use when:** You need a long-running worker triggered from a web request, with a status UI, and you control both ends.
**Result:** Web app POSTs to a trigger endpoint with a body secret → worker spawns and writes status directly back to the DB → frontend polls a status endpoint. No webhooks, no message queue, ~50 lines of glue.

### Recipe B: "Curator-Augmented Auto-Classification"
**Patterns:** 4 + 5 + 6 + 8 + 9.
**Use when:** You want an LLM to do the bulk of classification work, with humans reviewing edge cases, and the system surviving re-ingests.
**Result:** Two-pass classification (metadata + LLM) → confidence-tier routing (high → auto, medium → review, low → manual) → JSONB-driven category rules editable by editors → editorial state machine preserves curator decisions across re-ingests.

### Recipe C: "Schema Migration via Dual-Write"
**Patterns:** 8 + 9 + 13 + 14.
**Use when:** Migrating from a legacy schema to a new one without freezing writes.
**Result:** Primary writes to legacy schema → dual-write fanout to new schema (idempotent via legacy FK) → editorial state preserved on both sides → nightly cron reconciles missed writes.

### Recipe D: "Public Design Reference for Admin Surface"
**Patterns:** 23 + 24.
**Use when:** Designers and external collaborators need access to an admin-only design without auth.
**Result:** Display component takes a domain object as a prop → admin route fetches live data, design route uses fixtures → both render identically → public route safe to share with V0, designers, etc.

### Recipe E: "Bulk Asset Ingest from Multiple Sources"
**Patterns:** 15 + 16 + 17 + 18.
**Use when:** Pulling assets from N external APIs, deduplicating, and handling per-item flakiness.
**Result:** Strategy-pattern adapters per source → exhaustive switch dispatcher → SHA-256 dedup at write time → multi-fallback JSON parsing for source responses → bounded retry with tolerable partial failure for the batch.

### Recipe F: "Adaptive Ranking with Audit Trail"
**Patterns:** 11 + 12 + 14.
**Use when:** Building a recommender that adapts based on user signals, with explainable item movement.
**Result:** Append-only signal capture from UI events → nightly multi-stage cron computes scores → pool-ladder transitions move items one tier at a time → append-only history records every move.

---

## 27. NULL-Safe `.neq` in Postgres Query Builders

**Problem.** Query builders like Supabase / PostgREST, Kysely, Prisma's `not: { equals }`, and hand-written SQL all forward `.neq("col", value)` to `col != value` in Postgres. Postgres uses three-valued logic: `NULL != 'anything'` evaluates to `NULL`, which is treated as false in a `WHERE` clause. Every row where `col IS NULL` is **silently dropped** — not because the predicate matched, but because it didn't resolve to TRUE. This almost never matches user intent when the column is nullable.

**Real incident that surfaced it (Vela, 2026-04-19).** The admin library `Pending` pill returned 0 rows even though `SELECT count(*) FROM experience_units WHERE status = 'pending_review'` returned 1756. The default "hide fragments" predicate was `.neq("shot_type", "fragment")`. Of the 1756 pending rows, 1418 had `shot_type = 'fragment'` and 338 had `shot_type IS NULL`. The `.neq` correctly excluded the 1418 fragments, but three-valued logic also excluded all 338 NULL rows — leaving zero. The bug was invisible because the query "looked right" and the UI quietly showed an empty grid.

**The Pattern.**

```ts
// Bug: silently drops NULL rows
query = query.neq("shot_type", "fragment");

// Fix: explicit "or NULL" branch
query = query.or("shot_type.is.null,shot_type.neq.fragment");

// Equivalent in raw SQL
WHERE (shot_type IS NULL OR shot_type != 'fragment')

// Equivalent using Postgres IS DISTINCT FROM
WHERE shot_type IS DISTINCT FROM 'fragment'
```

`IS DISTINCT FROM` is the cleanest primitive — it treats NULL as a regular value for comparison. Supabase-js doesn't expose it directly, so the `.or(col.is.null, col.neq.value)` form is the idiomatic workaround.

**Conversely, the `.neq("shot_type", "fragment")` shape IS the right query** when you deliberately want to exclude NULLs (e.g. "only rows that have been shot-classified AND are not fragments"). The bug is using it when the *intent* is "everything except fragments, including unclassified rows."

**Checklist for reviewers.**

1. Is the column `NOT NULL` in the schema? → `.neq` is safe. Skip.
2. Is there a `.not(col, "is", null)` guard already upstream in the same query? → safe. Skip.
3. Is the `.neq` comparing against a primary key (`.neq("id", ...)`)? → PKs are never NULL. Safe.
4. Is the column nullable, and the intent is "not-this-value, NULL included"? → **use `.or(col.is.null,col.neq.value)`**.
5. Is the column nullable, and the intent is "not-this-value, AND value must be set"? → `.neq(...)` is correct. Add a comment explaining the deliberate exclusion.

**Where used in this codebase.** `app/admin/library/page.tsx` fragment-hide default; `scripts/ingest/extract-fragments.ts` parent-unit selection (shot_type nullable).

**Tradeoffs.**

- **Implicit vs explicit.** `.neq` looks correct and reads naturally. The NULL-safe form is noisier but surfaces the intent at the site of the filter.
- **Performance.** `(col IS NULL OR col != X)` can still use a btree index but the planner has to union two ranges. Usually fine; for hot paths on large tables, consider `IS DISTINCT FROM` via raw SQL.
- **Team habit.** Once a codebase has one of these bugs, others are usually hiding. A one-time audit (`grep -n '\.neq('`) takes minutes and prevents a class of silent data loss.

**Where to look in the codebase.** `app/admin/library/page.tsx` (`applyUnitFilters`), `scripts/ingest/extract-fragments.ts` (parent-unit query).

---

## 28. Operational Coverage Log + Demand-Driven Routing

**Problem.** A retrieval-heavy system (a search, a writer-briefing generator, a recommender, a Q&A endpoint) generates rich signal every time it serves a request — what it found, what it didn't find, which canonical references it wished to cite but couldn't. Most systems throw that signal away the moment the response is rendered. The result: the corpus that powers the system never gets directly measured against the work the system is actually being asked to do, and acquisition/content decisions stay supply-driven ("we should buy more theology books") instead of demand-driven ("the last 8 briefings tried to cite Karl Barth and failed — buy *that* one").

**The Pattern.**

```ts
// Step 1 — log every operation's coverage state to a persistent table.

interface OperationLog {
  id: string;                          // pk
  operation_type: string;              // 'briefing' | 'search' | 'recommendation'
  query: string;                       // what the user/caller asked for
  topic_slug: string | null;           // for rollup grouping
  hit_count: number;                   // how many results returned
  top_distance: number | null;         // best-match score / distance
  themes_seen: string[];               // tags / categories surfaced
  cited_ids: string[];                 // ids of records that made the final response
  wall_ms: number;                     // latency
  metadata: Record<string, unknown>;   // free-form context
  created_at: string;
}

interface CoverageMissLog {
  id: string;
  operation_id: string;                // fk to OperationLog.id
  missed_anchor_key: string;           // canonical reference name (e.g. BibTeX cite key)
  missed_topic: string | null;
  reason: 'no_results' | 'low_quality' | 'filtered_out' | 'unmet_demand';
  created_at: string;
}

// In the operation handler, after rendering response:
async function logCoverage(service: Db, op: OperationLog, misses: CoverageMissLog[]) {
  // Best-effort. Never fail the operation on a logging error.
  try {
    await service.from('operation_log').insert(op);
    if (misses.length) await service.from('coverage_miss_log').insert(misses);
  } catch (err) {
    console.warn('coverage log failed (non-fatal):', err);
  }
}

// Step 2 — periodic rollup turns N operations of signal into routing decisions.

interface GapTarget {
  signal: 'recurring_anchor_miss' | 'thinness_cluster' | 'density_regression';
  identifier: string;       // anchor key, theme, or topic
  signal_strength: number;  // count of operations that hit this gap
  example_op_ids: string[]; // for traceability
  first_seen: string;
  last_seen: string;
}

async function rollupGaps(service: Db, sinceDays = 30): Promise<GapTarget[]> {
  // Pull misses, group by missed_anchor_key, threshold at >= 3 to suppress one-offs.
  const since = new Date(Date.now() - sinceDays * 86400_000).toISOString();
  const { data: rows } = await service
    .from('coverage_miss_log')
    .select('missed_anchor_key, missed_topic, operation_id, created_at')
    .gte('created_at', since);
  const buckets = new Map<string, GapTarget>();
  for (const r of rows ?? []) {
    const key = r.missed_anchor_key;
    const prev = buckets.get(key);
    if (prev) {
      prev.signal_strength++;
      if (prev.example_op_ids.length < 5) prev.example_op_ids.push(r.operation_id);
      if (r.created_at > prev.last_seen) prev.last_seen = r.created_at;
    } else {
      buckets.set(key, {
        signal: 'recurring_anchor_miss',
        identifier: key,
        signal_strength: 1,
        example_op_ids: [r.operation_id],
        first_seen: r.created_at,
        last_seen: r.created_at,
      });
    }
  }
  return [...buckets.values()].filter((g) => g.signal_strength >= 3);
}

// Step 3 — gaps route to one of three response channels (acquisition, content, research).
// Each channel is just a write into an existing queue — the routing logic is plain
// switch-on-signal, not ML.

async function routeGaps(service: Db, gaps: GapTarget[]) {
  for (const gap of gaps) {
    if (gap.signal === 'recurring_anchor_miss') {
      // 1. Bump priority on existing acquisition candidate, OR insert a new one.
      await service.from('acquisition_candidates').upsert({
        identifier: gap.identifier,
        source_signal: 'demand_driven',
        signal_strength: gap.signal_strength,
        last_demand_at: gap.last_seen,
      }, { onConflict: 'identifier' });
    } else if (gap.signal === 'thinness_cluster') {
      // 2. Surface as a candidate for original commentary content.
      await service.from('content_gap_essays').insert({
        gap_description: gap.identifier,
        triggering_op_ids: gap.example_op_ids,
        status: 'proposed',
      });
    }
    // 3. Density regressions: emit a research-team alert. (Out of scope here.)
  }
}
```

**Why this works.**

- **Best-effort logging.** The log write is non-blocking and never fails the operation. Missed log rows are acceptable — the rollup is statistical, not transactional.
- **Append-only.** Operation log + miss log are write-only from the application; rollups read only. Pairs naturally with [Pattern 12](#12-append-only-signal-capture).
- **Threshold suppresses noise.** A `signal_strength >= 3` cutoff hides one-off curiosity queries; only repeated demand bubbles up.
- **Routing is explicit.** Gaps are typed and switched on; acquisitions vs content vs research are different existing queues. No ML decision-maker; humans see the gap list and act, or a separate priority-bump runs nightly.
- **Demand-driven beats supply-driven.** Filling a gap that 8 future operations would hit is structurally higher-leverage than filling a gap nobody is asking about.

**Tradeoffs.**

- **Cold-start.** With an empty log, the first weeks of operation are pre-feedback; supply-driven acquisition still runs in parallel. The two are complementary, not substitutes.
- **Privacy + retention.** Logged queries can be sensitive (a writer's research draft, a member's search). Decide upfront: anonymize, retain 90 days, or scope to admin/internal operations only. RLS on `operation_log` is a must.
- **Recurrence threshold.** Three is arbitrary. For high-volume systems, raise to 10. For long-tail editorial systems, drop to 2. Surface the threshold as config.
- **Anchor-based vs theme-based misses.** Anchors (named citations) are easier to dedupe than freeform thematic gaps. Build anchor handling first; thematic clustering later (it benefits from embedding similarity over miss queries).

**Where to look in the codebase.** Canonical implementation in flight as **ASN-706** (`briefing_coverage_log` for the Atlas briefing system) and **ASN-707** (`rollup-coverage-gaps.ts` weekly rollup that bumps `acquisition_candidates` priority). The existing reincarnation engine's append-only `responses` + `unit_pool_history` tables are an earlier expression of the same shape — operations (player ratings) feed batch scoring → pool moves. See `lib/reincarnation/`.

**Adapt this for:**

- **Search + recommendation:** every "no results" or "user paged past page 2" is a coverage miss. Roll up; route to indexing improvements or new content acquisition.
- **Writer/researcher tools:** every citation a writer wished to make and couldn't.
- **Catalog + commerce:** every product lookup with zero results becomes a sourcing target.
- **Customer support / Q&A:** every unanswered question is an FAQ candidate or a doc-gap.

---

## 29. Recursive Editorial Compounding

**Problem.** Most editorial systems treat content production as terminal: the brief becomes the article and the system moves on. The signal generated *by writing* — what the writer wished was easier, what citations were missing, where the corpus was thin — evaporates. Over time the corpus grows by accident (whoever happens to acquire the next thing) rather than by design (whoever's actually being underserved). The system never compounds; it just accumulates.

**The Pattern.**

```
       ┌──────────────────────────────────────────┐
       │                                          │
       │            1. PRODUCE                    │
       │   (briefing / essay / fiction / search)  │
       │                                          │
       └──────────────┬───────────────────────────┘
                      │ generates
                      ▼
       ┌──────────────────────────────────────────┐
       │                                          │
       │            2. MEASURE                    │
       │  (coverage log; misses; thinness flags)  │
       │                                          │
       └──────────────┬───────────────────────────┘
                      │ rolls up to
                      ▼
       ┌──────────────────────────────────────────┐
       │                                          │
       │            3. RESPOND                    │
       │   in one of three productive channels:   │
       │                                          │
       │   a) acquire: queue a real source        │
       │   b) write: file Coverage Gap Essay      │
       │      (publish original commentary on     │
       │       the missing thing — gap fills      │
       │       from inside the system)            │
       │   c) research: paper / methodology piece │
       │      that reframes the gap as an object  │
       │      of inquiry                          │
       │                                          │
       └──────────────┬───────────────────────────┘
                      │ feeds back to
                      ▼
       ┌──────────────────────────────────────────┐
       │                                          │
       │       4. NEXT PRODUCTION (better)        │
       │   The next briefing/essay/search hits    │
       │   the same topic — and now finds more    │
       │   support. Repeat.                       │
       │                                          │
       └──────────────────────────────────────────┘
```

The arc is a single loop with three response channels (a/b/c). The structural insight is that a "gap" isn't a failure — it's *productive material*. Three things you can do with it, all of which compound:

1. **Acquire.** External procurement: buy the book, license the data, scrape the public archive. This is the most obvious response and the only one most systems do.
2. **Write.** Original commentary by your own editorial team. The gap *becomes* a piece of content — a "Coverage Gap Essay" that addresses what's missing. Triple win: gap is filled (from the inside), platform publishes content, the new content becomes a citable asset for *future* operations. Possible because editorial talent is on hand.
3. **Research.** Reframe the gap as an object of academic / methodological inquiry. A paper on "what topology of human discourse does this corpus reveal as missing" is publishable in HCI, DH, JCDL venues — a knowledge product extracted from the operation of the system itself.

**Why this works.**

- **Compounding.** Each cycle makes the next one structurally better-supported. After 12 cycles, the corpus has been measured 12 times against real demand and improved 12 times against measured gaps. After 100 cycles, the corpus is shaped by the actual work the platform does.
- **Productive failure.** Every "we couldn't find this" is recoverable into one of three artifacts. Nothing is wasted. This dissolves the implicit bias toward "we shouldn't run the system on hard topics where we'll fail" — running and failing is itself the productive act.
- **Editorial / engineering / research integration.** Each channel surfaces work for a different team but they all flow from the same signal pipeline. The org chart aligns naturally with the loop.

**Tradeoffs.**

- **Editorial muscle required.** Channel (b) — Coverage Gap Essays — requires writers willing and able to produce original commentary on demand. Most platforms don't have this. Without it, the loop reduces to (a) + (c), which is still useful but less generative.
- **Paper output is slow.** Channel (c) is a 6-12 month cycle; treat as a long-horizon byproduct, not the primary output.
- **Discipline of the threshold.** Without a "this gap deserves response" threshold (Pattern 28's `signal_strength`), the loop devolves into chasing one-off curiosities. The threshold is what makes it *recursive* rather than reactive.
- **Naming.** "Compounding" is honest but salesy. Internally, "operational coverage loop" or just "the loop" works fine.

**Where to look in the codebase.** Canonical instantiation in flight as **ASN-706..712** (Atlas feedback-loop arc). Reincarnation engine's `responses` → batch-scoring → pool-moves → next-session-better-supported is an earlier and narrower expression (channel (a) only — content acquisition via curator promotion, no content/research channels). See `docs/VISION-VECTOR-INFRA.md` for the Atlas case and `docs/REINCARNATION.md` for the reincarnation case.

**Adapt this for:**

- **Any editorial platform.** Pick the production unit (article, briefing, fiction, podcast episode), instrument its coverage signal, and decide which three channels you have available. Most platforms can do (a) + (b); very few do (c).
- **Internal knowledge bases.** Engineering wikis, runbooks, customer-support knowledge bases — every "I couldn't find this" is a doc gap; either acquire (link external docs) or write (write the page).
- **Scientific or analyst workflows.** Every "I wanted to cite a paper that doesn't exist" is itself a paper to be written.
- **The pattern generalizes anywhere humans use a corpus to do creative or analytical work.** If you can measure what they wished for and didn't get, you can compound it.

---

**Maintenance.** When you discover a new pattern in the codebase that meets the bar — production-validated, domain-agnostic, non-trivial — add a new entry above and update the Pattern Index table. Don't mix new patterns into existing ones; each entry is a self-contained thing to copy.

**Last updated:** 2026-04-28.

---

## 30. Polymorphic Curation Queue

**Problem.** Most editorial / data-quality systems accumulate per-domain review surfaces: a flagged-artists list, a flagged-articles list, a flagged-photos list, a flagged-tag-collisions list. Each surface gets its own table, its own admin route, its own resolution endpoint. Within six months you have eight half-finished review queues, none deep enough to be load-bearing, and curators can't see what's actually pending across the platform. The work that needs human judgment is scattered, and the *signal* — what the platform's automated decisions are uncertain about — is invisible at the org level.

**The Pattern.** One queue table, polymorphic on `(item_kind, item_id)`, with no FK to any specific domain table. Domain agents (LLM classifiers, DQ scripts, dupe detectors, nightly audits) `INSERT` into it through a single helper. Triage happens in a single admin inbox. Substantive review (rename, merge, mark-clean, escalate, dismiss) routes from that inbox to per-domain panes — but every transition writes a parallel row to the existing curator-actions log.

```sql
create table curation_queue (
  id uuid primary key default gen_random_uuid(),
  item_kind text not null,        -- 'artist' | 'design_call' | 'source_code' | …
  item_id text not null,           -- polymorphic; no FK
  flag_class text not null,        -- 'duplicate_candidate', 'placeholder_name', …
  severity text not null check (severity in ('P0','P1','P2')),
  proposed_action jsonb,           -- agent's suggested next step
  evidence jsonb,                  -- snapshots / sister_id / image_url / note
  proposed_by text not null,       -- 'dq:artists' / 'agent:editor' / curator id
  status text not null default 'pending'
    check (status in ('pending','in_review','resolved','dismissed','escalated')),
  assigned_to uuid references auth.users(id),
  resolved_at timestamptz,
  resolved_by uuid references auth.users(id),
  resolution jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

```ts
// helper API
enqueueForReview({ item_kind, item_id, flag_class, severity, proposed_action, evidence, proposed_by })
resolveQueueItem(id, { status, resolution, resolved_by })  // also writes to curator_actions
listQueueItems({ item_kind?, status?, severity?, assigned_to? })
```

**Why this works.**

- **One inbox, many sources.** Curators see everything in one place. The unified surface reveals load — when one item_kind dominates the queue, that is itself a signal.
- **No domain-specific FK.** New item kinds (a new content type, a new policy class, a new pipeline) cost nothing — they just start writing into the same table. The polymorphic shape is what avoids the eight-half-finished-queues failure mode.
- **Append to the log on every resolution.** Because `resolveQueueItem` also writes to `curator_actions` (Pattern 11 / 12), the trust-ladder analytics see every state transition without the agents having to know about both tables. The queue is *operational state*; the log is *durable history*.
- **Triage cheap, review deep.** The unified inbox is a triage surface — the card shows enough to decide *whether* to open the row. Substantive review (the actual rename, merge, escalation) lives in the per-domain pane the operator already trusts. The queue sends them there with the right context.

**Tradeoffs.**

- **No referential integrity for `item_id`.** A row can outlive the underlying object. Mitigations: (a) the `evidence` JSONB carries enough snapshot to reconstruct what was flagged; (b) the inbox treats unresolvable rows as legitimate dismissals.
- **Status enum drift.** Five statuses (`pending`, `in_review`, `resolved`, `dismissed`, `escalated`) covers most curation domains, but exotic flows (e.g. multi-step approval chains) push past it. Stay disciplined; multi-step flows belong in domain-specific tables, not in this queue.
- **Filter-explosion risk.** If `item_kind` and `flag_class` proliferate, the inbox becomes hard to scan. Default the filter chips to "open status" (pending + in_review) and derive `item_kind` chips dynamically from currently-pending rows so dead categories disappear.
- **Triage vs. action confusion.** Operators may try to resolve substantively from the inbox itself. Discipline this through UI: `View →` routes to the domain pane; the inbox card carries enough context to decide *to open*, but not enough to *resolve* (no rename input, no merge button). Domain panes own the substantive write paths.

**When to use it.**

- You have ≥3 distinct domains that produce items needing human judgment (DQ flags, dupe candidates, classification disagreements, policy review).
- You want curators to see cross-domain load — "what's the platform asking humans to look at this week".
- You already have an append-only audit log (Pattern 11 / 12) and want the queue to participate in it.

**When NOT to use it.**

- The "queue" can be auto-resolved by deterministic rules (regex auto-cleans, threshold-based auto-merges). Those write directly to the durable table; only ambiguous cases enqueue.
- You only have one domain. A polymorphic queue for one item_kind is just an indirection. Build the domain-specific pane and add the queue if/when a second domain arrives.
- The "item" mutates faster than the queue resolves (ephemeral session events, transient signals). Use a fire-and-forget signal table (Pattern 12) instead.

**Where to look in the codebase.** Canonical instantiation in **ASN-718**: `supabase/migrations/01777376613787_curation_queue.sql`, `lib/curation/queue.ts`, `app/admin/curate/queue/page.tsx`, `components/admin/curate/QueueItemCard.tsx`. Resolutions append to `curator_actions` via `lib/qa/log-curator-action.ts` (a `queue_resolve` action_type was added in the same migration).

**Adapt this for:**

- **Any platform with multiple human-judgment loops.** Spam moderation queues, support-ticket triage, copy-edit queues, fraud-review queues — same shape, different `item_kind` values.
- **Multi-tenant data-quality.** Each tenant's flags land in the same queue; filter by `item_kind = '<tenant>:<domain>'`.
- **AI-agent supervisor surfaces.** When agents propose actions but require human ratification, the queue is the natural ratification surface — `proposed_action` is the agent's draft, `resolution` is the human's decision.

---

## 31. Cron Tick + DB Checkpoint (no detached process)

**Problem.** A job needs to do bounded work over a large input set: crawl 4,000 URLs, embed 10,000 passages, prep 8,000 derivatives. The naïve solution is `nohup tsx run-the-loop.ts & disown` writing to `/tmp/log` — and it works until the process dies (Mac restart, network blip, OOM, deploy) and you discover the only state you saved was a JSON checkpoint that may or may not be current. Worse, status is invisible to anyone but `tail -f`. Worse still, recovery is manual.

**The Pattern.** Refuse the long-running detached process. Make the work re-entrant: each cron tick picks the next bounded batch from the work table, processes it, writes results, and exits well within the function ceiling. State lives on the work table itself — the rows that have a `processed_at` are done; the rows that don't are pending. Resume is automatic. Status is a SQL query.

```ts
// app/api/cron/<job>/route.ts
export const maxDuration = 800
const BATCH = 50
const CONCURRENCY = 10

export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (process.env.JOB_DISABLED === '1') {
    return NextResponse.json({ ok: true, skipped: 'JOB_DISABLED' })
  }

  const service = createServiceClient()
  const { data: pending } = await service
    .from('work_items')
    .select('id, payload')
    .is('processed_at', null)
    .order('discovered_at', { ascending: true })
    .limit(BATCH)

  // Bounded-concurrency worker pool (no external queue lib).
  const queue = [...(pending ?? [])]
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, queue.length) }).map(async () => {
      while (queue.length) {
        const item = queue.shift()!
        try {
          const result = await processItem(item)
          await service.from('work_items').update({
            processed_at: new Date().toISOString(),
            result,
          }).eq('id', item.id)
        } catch (err) {
          // Don't update processed_at — next tick retries. Log and move on.
          console.error(`[cron/<job>] failed item=${item.id}`, err)
        }
      }
    }),
  )

  const { count: remaining } = await service
    .from('work_items')
    .select('id', { count: 'exact', head: true })
    .is('processed_at', null)

  return NextResponse.json({ ok: true, processed: pending?.length ?? 0, remaining })
}
```

```jsonc
// vercel.json
{
  "crons": [
    { "path": "/api/cron/<job>", "schedule": "*/5 * * * *" }
  ]
}
```

**Why this works.**

- **Crash-safe.** A killed function leaves at most one in-flight item un-marked; the next tick retries. Mac restart, deploy, function timeout, OOM — none of them lose state, because state is in Postgres.
- **No `nohup`, no `/tmp`, no JSON checkpoint.** The work table *is* the checkpoint. Status is `SELECT count(*) FILTER (WHERE processed_at IS NULL)`.
- **Resume is automatic.** No `--resume` flag, no operator action. The query "WHERE processed_at IS NULL" is the resume.
- **Throughput is tunable.** Knobs are `BATCH` (rows per tick), `CONCURRENCY` (per-tick worker pool), and the cron `schedule`. Multiply them out: `BATCH × ticks/hour = rows/hour`. A 4,000-row job at 50/tick × 12 ticks/hour drains in ~7 hours. If you need it faster, raise `BATCH` or schedule `* * * * *`.
- **Kill switch is one env var.** `JOB_DISABLED=1` short-circuits every tick without touching `vercel.json` or revoking the cron.
- **Status is queryable from anywhere.** Admin UI, psql, `npm run state` — they all hit the same table. No "where's the log."
- **Rollouts work normally.** Deploys don't kill the job — the cron just keeps firing against the new code. You can land a code change mid-corpus without losing progress.

**Tradeoffs.**

- **Wall-clock is longer.** A single 30-min `nohup` job at concurrency=30 finishes faster than the same work spread across cron ticks. Accept this — the operational reliability win is overwhelming.
- **Per-tick startup cost.** Every tick re-creates the Supabase client, re-runs the load query. Real but small (~50ms). Mitigate by raising `BATCH` so per-tick fixed cost amortizes over more rows.
- **Idempotency burden moves to the writer.** `processItem` must be safe to retry on the same row. Use UPSERT with a natural key, or guard the work with `WHERE processed_at IS NULL` in the update predicate.
- **Observability is your responsibility.** Per-tick `console.log` lines are durable in Vercel logs, but tracking *throughput* across ticks needs either a `cron_runs` table or a periodic rollup. Worth doing if the job runs for hours or days.
- **Hot-host throttling.** A polite-fetcher pattern (1 req / 2s per host) cooperates poorly with high `CONCURRENCY` if many work items share a host. Test with a representative batch.

**When to use it.**

- The work is **bounded** — there's a finite set of items to process, and you can query "what's not done yet."
- Each item is **independent** — order matters only weakly, items don't fan out into trees.
- The job runs for **>5 minutes** total, and especially if it runs for hours. Below that, a single function invocation is fine.
- You want **status visible from a SQL query**, not a log tail.

**When NOT to use it.**

- The work is a **streaming subscription** (e.g. consume a Kafka topic) — use a durable worker (Modal / Vercel Workflow) instead.
- The work needs **strict ordering** across the whole input — bounded-concurrency tick batches don't preserve global order.
- Each item takes **longer than the function ceiling** — bounce to async (Pattern 2: webhook-spawned GPU job) or chunk the item itself.
- The job runs **once and never again** — a one-shot script is fine; don't add a permanent cron entry for a backfill that ships and dies. (Use a feature flag or remove the entry.)

**Where to look in the codebase.** Canonical instantiation in **ASN-951** for the boudoir studio crawl: `app/api/cron/boudoir-crawl/route.ts`, scheduled in `vercel.json` at `*/5 * * * *`. The work table is `boudoir_studios_research` (partition: `pages_crawled_at IS NULL OR pages_crawl_status = 'failed_retry'`); page results land in `boudoir_studio_pages`. The pattern replaced a `nohup tsx scripts/research/boudoir/crawl-copy.ts --execute & disown` job that ASN-670 originally launched — the detached process died on a Mac restart with no log surviving (`/tmp` is wiped at boot on macOS), prompting this pattern's elevation to default. Other instantiations in the same shape: `derivative-queue-work`, `audit-embeddings-incremental`, `passage-similarity`. The kill-switch convention (`<JOB>_DISABLED=1`) is consistent across them.

**Adapt this for:**

- **Any backfill or migration that touches >1,000 rows.** Don't write a one-shot script that has to run uninterrupted; write a tick handler and let cron drain it overnight.
- **Periodic external API ingestion** (museum APIs, RSS feeds, webhook backfills). The cron is already the trigger; just bound the per-tick batch.
- **Embedding / classification refresh.** Same pattern; the work table is "rows where `embedding IS NULL`" or "rows where `embedded_at < models_updated_at`."
- **Any local script you'd be tempted to launch as `nohup … & disown`.** If you're reaching for `nohup`, you're reaching for this pattern.
