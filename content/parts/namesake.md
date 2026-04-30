# Reusable Engineering Patterns

Production-validated patterns from this codebase, written in
domain-agnostic form. Strip the baby-naming nouns; what's left should
drop into any system that needs the same shape.

Each pattern has the same structure: **Problem → The Pattern (TS sketch)
→ Key Design Decisions → This Codebase (real file paths + known gaps)
→ Tradeoffs**. Pick by the index. Compose with the recipes at the bottom.

---

## Pattern Index

| # | Pattern | When to reach for it |
|---|---|---|
| 1 | [Three-client database factory](#1-three-client-database-factory) | Any app where the same DB serves browser, SSR, and trusted scripts. |
| 2 | [Idempotent upsert with composite conflict key](#2-idempotent-upsert-with-composite-conflict-key) | Any write that may be retried (webhooks, double-click, mobile reconnect). |
| 3 | [Dense entity page: server assembly + client display](#3-dense-entity-page-server-assembly--client-display) | Detail pages with many parallel data sources. |
| 4 | [Composite weighted score with null-safe blending](#4-composite-weighted-score-with-null-safe-blending) | Any 0–100 single-number summary built from N components. |
| 5 | [Personalization re-mapping (N user dials → M score pillars)](#5-personalization-re-mapping-n-user-dials--m-score-pillars) | When user preferences are captured at finer granularity than the underlying score components. |
| 6 | [Tag-tally wizard scoring](#6-tag-tally-wizard-scoring) | Quiz / preference-capture flows that need to bucket users into named outcomes. |
| 7 | [Themed-list config with two render modes](#7-themed-list-config-with-two-render-modes) | Curated content sets where some are query-defined and some are explicit lists. |
| 8 | [Defensive JSONB normalizer](#8-defensive-jsonb-normalizer) | Reading semi-structured columns whose shape has drifted. |
| 9 | [Recommendation cluster: stored arrays + client de-dupe + fallback](#9-recommendation-cluster-stored-arrays--client-de-dupe--fallback) | "You might also like" / "similar items" surfaces. |
| 10 | [LocalStorage + DB merge with custom-event sync](#10-localstorage--db-merge-with-custom-event-sync) | Per-user collections that must work logged-out. |
| 11 | [Realtime fan-out by channel naming](#11-realtime-fan-out-by-channel-naming) | Live counters / activity displays scoped to a sub-entity. |
| 12 | [Token namespace separation per audience](#12-token-namespace-separation-per-audience) | Public + per-actor share links from one underlying resource. |
| 13 | [State-machine via DB columns + action endpoint](#13-state-machine-via-db-columns--action-endpoint) | Multi-stage workflows without a dedicated state-machine library. |
| 14 | [Adaptive ranked queue](#14-adaptive-ranked-queue) | Any "next item" surface where ranking improves with feedback. |
| 15 | [Trend classification from raw rank deltas](#15-trend-classification-from-raw-rank-deltas) | Turning time-series rank into "rising / stable / falling" labels. |
| 16 | [Public dataset ingest → derived stats table](#16-public-dataset-ingest--derived-stats-table) | Ingesting large public datasets and exposing query-friendly summaries. |
| 17 | [Server-side filter config as data](#17-server-side-filter-config-as-data) | Configurable views over the same underlying table. |
| 18 | [Inline per-handler authorization](#18-inline-per-handler-authorization) | Small admin surfaces where middleware feels heavyweight. |
| 19 | [Long-running compute on a separate worker](#19-long-running-compute-on-a-separate-worker) | Pipelines too heavy for request-cycle execution. |
| 20 | [Graceful-degradation contract for optional enrichment](#20-graceful-degradation-contract-for-optional-enrichment) | Features that should still render when their data source is missing. |

---

## 1. Three-client database factory

### Problem

The same database is read from three contexts that need different
credentials and lifetimes: the browser (anon, per-tab cookie session),
the server-rendering layer (anon + cookie-bridged session), and
trusted code paths that must bypass row-level security (service-role
key, no cookies). One client doesn't fit all three; mixing them up
either leaks a service key to the browser or breaks RLS-protected
features.

### The Pattern

```ts
// db/browser.ts
import { createBrowserClient } from '@supabase/ssr';
export const db = createBrowserClient(
  process.env.NEXT_PUBLIC_DB_URL!,
  process.env.NEXT_PUBLIC_DB_ANON_KEY!,
);

// db/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
export async function createServerDb() {
  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (xs) => xs.forEach((c) => cookieStore.set(c.name, c.value, c.options)),
    },
  });
}

// db/service.ts — never import in client bundles
import { createClient } from '@supabase/supabase-js';
export function createServiceDb(): Db | null {
  const url = process.env.DB_URL;
  const key = process.env.DB_SERVICE_KEY;
  if (!url || !key) return null;            // graceful, not throw
  return createClient(url, key, { auth: { persistSession: false } });
}

// at call sites that need to fall back from service → anon
export function getDb() {
  return createServiceDb() ?? createBrowserDb();
}
```

### Key Design Decisions

- **Three explicit factories, not one configurable one.** Compile-time
  guarantees you can't accidentally bundle a service key into client code.
- **Service factory returns `null` on missing env**, never throws.
  Lets handlers degrade or fall back without try/catch around every call.
- **Cookie bridge is per-request**, never cached at module scope.
  Caching the SSR client across requests will leak sessions.
- **No singleton on the browser side either** — `createBrowserClient`
  internally caches; module-top instantiation is fine.
- **Route handlers pick explicitly.** No "smart" auto-detect — clarity
  over cleverness when auth context matters.

### This Codebase

`lib/supabase.ts` (browser singleton),
`lib/supabase-server.ts` (`createClient()` — SSR with cookies),
`lib/supabase-service.ts` (`createServiceRoleClient()` — returns `null` on
missing env), `lib/supabase-client.ts` (named export of the browser
client). Service-role fallback pattern used in
`app/api/advance-round/route.ts::getDb()`.

**Known gaps.** No type generation step (no `supabase/types.ts`); row
types are hand-written ad-hoc per query. Eventually re-generate.

### Tradeoffs

| Pro | Con |
|---|---|
| Compile-time separation of trust boundaries | Three files to keep in sync when adding a setting |
| Each client tuned for its lifecycle (browser cache vs cookie bridge vs no-session) | New contributors must know which to import |
| `null` from service factory enables graceful degradation | Easy to forget the null-check at call sites |
| No accidental service-key bundling in client code | No central place to add observability |

---

## 2. Idempotent upsert with composite conflict key

### Problem

Mutation endpoints get retried — by mobile clients on flaky networks, by
webhook providers on uncertain ACKs, by users double-clicking. Plain
`INSERT` produces duplicates; `UPDATE` requires you to know the row
already exists. You want one operation that converges to the same end
state regardless of how many times it runs.

### The Pattern

```ts
// Composite conflict key reflects the natural uniqueness of the action.
const { data, error } = await db
  .from('vote_records')
  .upsert(
    { actor_id, parent_slot, matchup_key, choice, voted_at: new Date().toISOString() },
    { onConflict: 'actor_id,parent_slot,matchup_key' }
  )
  .select()
  .single();

if (error) return Response.json({ error: error.message }, { status: 500 });
return Response.json(data);  // same response on first call AND retry
```

For high-volume ingest scripts:

```ts
const BATCH = 500;
for (let i = 0; i < rows.length; i += BATCH) {
  const slice = rows.slice(i, i + BATCH);
  await db.from('history').upsert(slice, { onConflict: 'name,year,gender' });
}
```

### Key Design Decisions

- **Conflict key encodes the *natural* uniqueness** of the operation,
  not an artificial dedup token. Re-running the same logical action
  produces the same key.
- **Always `.select().single()` after upsert** so callers see the
  current row (not just success/failure). Retries return identical
  payloads.
- **Batch size 500** balances throughput with statement-size limits.
  Smaller for wider rows, larger for narrow ones.
- **Don't combine with `RETURNING xmax` checks** unless you genuinely
  need to know "was this an insert vs update" — usually you don't.

### This Codebase

`app/api/parent-bracket-votes/route.ts`
(`onConflict: "tournament_id,parent_slot,matchup_key"`),
`scripts/ingest-ssa-history.ts`
(`onConflict: "name,year,gender"`),
`scripts/refresh-ssa.ts`
(`onConflict: "name,gender"`).

**Known gaps.** `app/api/votes/route.ts` (community vote endpoint)
checks-then-inserts and returns 409 on duplicate instead of upserting —
not idempotent; A-219 tracks the upgrade.

`app/api/webhooks/stripe/route.ts` is now idempotent via a sibling
pattern: rather than upserting `users` keyed on an event ID, it
insert-firsts into a dedicated `stripe_events` dedup table and
short-circuits on `23505` unique-violation. See migration
`supabase/migrations/20260501000000_stripe_events.sql`. This
"insert-first into a dedup table" variant is worth reaching for when
the downstream write is a plain `update` on a different table (not an
upsert), or when you want an audit trail of every webhook delivery.

### Tradeoffs

| Pro | Con |
|---|---|
| Retries are safe; clients can re-fire freely | Requires a unique index on the conflict columns |
| No "exists?" pre-check round-trip | Schema migration cost when conflict key needs to change |
| Predictable response shape on first try and retry | Doesn't tell you "was this new" without extra columns |
| Works for high-volume ingest with batched arrays | Errors mid-batch require re-running the whole batch |

---

## 3. Dense entity page: server assembly + client display

### Problem

Detail pages for a single entity often pull from 6–10 sources (core row,
historical timeseries, related entities, recommendations, computed
stats, third-party enrichment). If the client component does that
fetching, you get waterfalls, loading-spinner soup, and SEO-poor HTML.
If the server component is also where the interactive UI lives, you
lose the client-side state needed for tabs, accordions, and dynamic
sub-views.

### The Pattern

```tsx
// app/entity/[slug]/page.tsx — Server Component
export const dynamic = 'force-dynamic';

export default async function EntityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = await createServerDb();

  // Single Promise.all — all sources fetched in parallel on the server.
  const [primary, history, neighbors, similar, events, related] = await Promise.all([
    fetchPrimary(db, slug),
    fetchHistory(db, slug),
    fetchNeighbors(db, slug),
    fetchSimilar(db, slug),
    fetchEvents(db, slug),
    fetchRelated(db, slug),
  ]);

  if (!primary) return notFound();

  // Hand the assembled data to the client; client never refetches.
  return (
    <EntityClient
      primary={primary}
      history={history}
      neighbors={neighbors}
      similar={similar}
      events={events}
      related={related}
    />
  );
}
```

```tsx
// EntityClient.tsx — pure display, holds tab state only
'use client';
export function EntityClient(props: EntityProps) {
  const [tab, setTab] = useState<'overview' | 'history' | 'related'>('overview');
  // … render dense summary card, tabs, accordions, recommendation clusters …
}
```

### Key Design Decisions

- **`force-dynamic` on the page** because the underlying data is fresh
  per request and per personalization. Cache at the CDN layer instead.
- **`Promise.all` not sequential awaits** — every source is independent,
  so latency is `max()`, not `sum()`.
- **Client component never fetches.** It receives fully-formed props
  and owns only ephemeral UI state (tab, accordion open). This keeps
  the loading model trivial: render or don't.
- **`notFound()` early** so the rest of the tree never has to handle
  the missing-primary case.
- **One client component per page**, even if it's huge. Splitting it
  forces prop-drilling or client-side context for what is effectively
  one widget.

### This Codebase

`app/names/[slug]/page.tsx` (server assembly via `fetchNameProfile`,
`fetchNameRankHistory`, `fetchAlphabeticalNameNeighbors`,
`fetchSimilarSoundsForName`, `fetchYouMightAlsoLikeCards`,
`fetchCulturalEventsForName`, `fetchPhonemesForName`,
`fetchProfileRankCohortBands`),
`components/names/name-profile-page-client.tsx` (~193KB client
component; tabs + accordions only, no fetches),
`components/names/name-page-content.tsx` (the wrapper that picks
between profile and print modes).

**Known gaps.** Because everything is `force-dynamic`, hot-cache misses
are common. A future move to `cacheTag()`-based invalidation (Next.js
Cache Components) would let common entities cache-first while keeping
freshness guarantees on writes.

### Tradeoffs

| Pro | Con |
|---|---|
| One round-trip from the user's perspective; no spinner cascades | Page can't render until the slowest source returns |
| Client component stays simple — no fetch logic, no error handling for network | Server-side errors take down the whole page |
| SEO-clean; bots see fully-rendered HTML | `force-dynamic` skips static optimization |
| Easy to add a new section: add a fetch in `Promise.all`, add a prop, render | One huge client component is hard to bundle-split |

---

## 4. Composite weighted score with null-safe blending

### Problem

You want to display a single 0–100 number that summarizes N component
scores (each also 0–100). Components are computed at different times
and from different sources, so any of them can be `null`. Naively
treating `null` as `0` makes incomplete entities look terrible;
treating `null` as `100` makes them look fake. You also need a clear
fallback when *no* components are available.

### The Pattern

```ts
type Components = {
  componentA: number | null;
  componentB: number | null;
  componentC: number | null;
  componentD: number | null;
};

type Weights = { a: number; b: number; c: number; d: number };  // sum = 100

const DEFAULT_WEIGHTS: Weights = { a: 37, b: 28, c: 20, d: 15 };

const NULL_FALLBACK = 50;  // neutral, not punishing, not flattering

export function weightedScore(c: Components, w: Weights): number {
  const raw =
    ((c.componentA ?? NULL_FALLBACK) * w.a) / 100 +
    ((c.componentB ?? NULL_FALLBACK) * w.b) / 100 +
    ((c.componentC ?? NULL_FALLBACK) * w.c) / 100 +
    ((c.componentD ?? NULL_FALLBACK) * w.d) / 100;
  return Math.round(raw);
}

// Equal-weight fallback when even the weight scheme is unavailable.
export function equalWeightScore(c: Components, fallbackTotal: number | null): number {
  const parts = Object.values(c).filter((n): n is number => n != null && Number.isFinite(n));
  if (parts.length === 0) return Math.round(fallbackTotal ?? 0);
  return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);
}
```

### Key Design Decisions

- **Fallback to neutral midpoint, not 0 or 100.** Missing data shouldn't
  punish or reward. 50 is the only honest answer.
- **Two scoring paths, not three.** Weighted (with default or personal
  weights) and equal-weight (when no scheme applies). Don't proliferate.
- **Round only at display time.** Internal arithmetic stays floating
  point so re-weighting is reproducible.
- **Weights sum to 100, not 1.0.** Easier to reason about as percentages
  and the divisor (100) is consistent.
- **Always `Math.min(100, Math.max(0, x))` if you allow weights to be
  user-tunable** — drift can produce out-of-range output otherwise.

### This Codebase

`lib/name-intelligence-score.ts`:
- `DEFAULT_DASHBOARD_SCORE_WEIGHTS = { meaning: 37, trend: 28,
  uniqueness: 20, feasibility: 15 }`.
- `computeWeightedDisplayScore(row, weights)` — uses `?? 50` per
  component.
- `equalWeightDisplayScore(row)` — averages available components,
  falls back to a stored composite when none are present.

**Known gaps.** Display + storage live on the same field name, which
makes the column `namesake_score` ambiguous (raw composite vs blended
display). Trap #3 in `PRODUCT_INTEGRATION_MAP.md` documents the
hazard. Future cleanup: rename storage column.

### Tradeoffs

| Pro | Con |
|---|---|
| Honest visualization of partial data | "50" appears for empty entities, which can feel arbitrary |
| Two clear modes — easy to reason about | Two helpers means callers can pick the wrong one |
| Float arithmetic + round-at-display is reproducible | Weight changes silently shift everyone's display score |
| Works whether weights are static or per-user | Doesn't surface *which* component dragged the score down — needs a separate breakdown UI |

---

## 5. Personalization re-mapping (N user dials → M score pillars)

### Problem

Users want fine-grained control ("how much do I value sound? meaning?
heritage? practicality?" — say 8 dials). The underlying score has
fewer pillars (say 4). You need the user's preferences to influence
the displayed score *without* requiring you to recompute and re-store
8 component scores per entity.

### The Pattern

```ts
type UserDials = {  // sum to 100, fine-grained
  meaning: number; inspiration: number;
  timelessness: number; popularity: number;
  origin: number; sound: number;
  practicality: number; family: number;
};

type PillarWeights = {  // 4 underlying pillars
  meaning: number; trend: number; novelty: number; practical: number;
};

// Project user dials onto pillars. Some dials split across pillars (e.g. popularity
// is half "trend" and half "novelty" depending on direction).
function dialsToPillars(d: UserDials): PillarWeights {
  return {
    meaning:   (d.meaning ?? 0) + (d.inspiration ?? 0),
    trend:     (d.timelessness ?? 0) + (d.popularity ?? 0) * 0.5,
    novelty:   (d.popularity ?? 0) * 0.5 + (d.origin ?? 0),
    practical: (d.practicality ?? 0) + (d.sound ?? 0) + (d.family ?? 0),
  };
}

export function personalizedScore(c: Components, dials: UserDials): number {
  const pw = dialsToPillars(dials);
  const pairs = [
    { w: pw.meaning, v: c.componentA },
    { w: pw.trend, v: c.componentB },
    { w: pw.novelty, v: c.componentC },
    { w: pw.practical, v: c.componentD },
  ];
  let wSum = 0, acc = 0;
  for (const { w, v } of pairs) {
    if (v == null || w <= 0) continue;
    wSum += w;
    acc += w * (v / 100);
  }
  if (wSum <= 0) return equalWeightScore(c, null);
  return Math.round(Math.min(100, Math.max(0, (acc / wSum) * 100)));
}
```

### Key Design Decisions

- **Project user dials onto pillars at read time**, not at write time.
  No per-user denormalization, no recompute jobs.
- **Re-normalize by `wSum`** — when a component is null it drops out
  of both numerator and denominator, so the result stays on the 0–100
  scale.
- **Splits are explicit constants in code** (`* 0.5`), not stored in
  config. Tunable only by deploy.
- **Fall back to equal-weight** if all weights collapse to zero — never
  return `NaN` or 0.

### This Codebase

`lib/name-intelligence-score.ts::personalizedDisplayScore()`,
`lib/name-intelligence-score.ts::pillarWeights()` (the projection),
`lib/name-intelligence-score.ts::dashboardScoreForRow()` (the router
that picks personalized vs equal-weight).

### Tradeoffs

| Pro | Con |
|---|---|
| No data migration when adding dials — only the projection function | Projection is opinionated; users with extreme dial settings can be surprised |
| Per-user score stays a derived view, not stored | Can't easily backfill "what would my old score have been with new dials" |
| Adding/removing a pillar only touches projection + display | Requires you to communicate "this is a subjective view" in UI |

---

## 6. Tag-tally wizard scoring

### Problem

You want a short multiple-choice flow that buckets users into one of
several named outcomes (style, archetype, recommendation cluster).
A neural classifier is overkill; if-else chains don't scale. You need
something deterministic, easy to tune, and explainable.

### The Pattern

```ts
type Question = {
  id: string;
  prompt: string;
  options: { value: string; tags: string[] }[];
};

const QUESTIONS: Question[] = [
  { id: 'aesthetic', prompt: '…', options: [
    { value: 'a', tags: ['minimalist', 'cool', 'modern'] },
    { value: 'b', tags: ['ornate', 'warm', 'traditional'] },
    /* … */
  ]},
  /* 4 more questions … */
];

type Result = { topBucket: string; secondBucket: string; headline: string };

export function scoreQuiz(answers: Record<string, string>): Result {
  // 1. Tally every selected tag.
  const tagCounts: Record<string, number> = {};
  for (const [qid, value] of Object.entries(answers)) {
    const q = QUESTIONS.find((q) => q.id === qid);
    q?.options.find((o) => o.value === value)?.tags.forEach((t) => {
      tagCounts[t] = (tagCounts[t] ?? 0) + 1;
    });
  }

  // 2. Project tags onto buckets — primary tags weighted 2x, secondary 1x.
  const buckets: Record<string, number> = {
    minimalist: (tagCounts.minimalist ?? 0) * 2 + (tagCounts.modern ?? 0),
    ornate:     (tagCounts.ornate ?? 0) * 2 + (tagCounts.traditional ?? 0),
    /* … */
  };

  // 3. Top-2 with stable fallback.
  const sorted = Object.entries(buckets).sort(([, a], [, b]) => b - a);
  const top = sorted[0]?.[0] ?? 'default';
  const second = sorted.find(([k]) => k !== top)?.[0] ?? 'default';

  return { topBucket: top, secondBucket: second, headline: HEADLINES[top] };
}
```

### Key Design Decisions

- **Tags are an intermediate vocabulary** between options and buckets —
  swapping a question doesn't break the bucket logic.
- **Pure function, no DB writes during the wizard.** Quiz state is
  entirely in client memory; persistence happens only when the user
  acts on the result.
- **2× / 1× weights for primary vs secondary signals.** Prevents
  ties in 5-question quizzes and makes the dominant signal win.
- **Always return a `topBucket`**, even if all answers are blank
  (default fallback). Never crash on incomplete input.
- **Top-2, not top-1.** A "second-strongest" makes narrative output
  ("you like X, with Y as a strong second") feel personal without
  being stochastic.

### This Codebase

`lib/name-style-quiz.ts` — `QUIZ_QUESTIONS`, `scoreQuiz(answers)`,
`QuizResult` type, `archetypeHint` heuristic.
`components/names/name-style-quiz-client.tsx` — UI shell.

**Known gaps.** No analytics on which buckets people land in, so
weight-tuning is intuition-driven. No A/B framework around bucket
labels.

### Tradeoffs

| Pro | Con |
|---|---|
| Deterministic and explainable — anyone can audit the math | Hand-tuned weights drift over time without instrumentation |
| Pure function: trivially testable | Doesn't learn from user behavior |
| Adding a question = adding tags + extending bucket projection | Tag vocabulary becomes implicit; needs a glossary doc |
| Zero DB cost; runs in the browser | Only works for low-cardinality outcomes (~5–10 buckets) |

---

## 7. Themed-list config with two render modes

### Problem

Curated content surfaces ("Trending Now," "Editor's Picks," "Heritage
Collection") have a mix of dynamics. Some are query-defined ("anything
matching these filters, refreshed nightly"). Others are explicit
hand-curated lists ("these 41 specific items, snapshotted from
research"). You don't want two parallel implementations.

### The Pattern

```ts
export interface FilterConfig {
  search?: string;
  categories?: string[];
  scoreMin?: number;
  rankRange?: [number, number];
  velocityMin?: number;
  /* … any narrowable predicate … */
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  filterConfig: FilterConfig;          // applied server-side
  explicitList?: string;               // bypass filterConfig and load named JSON snapshot
  smartLink?: 'trending' | 'predicted' /* … */;  // route to player surface instead of list page
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'rising-this-year',
    slug: 'rising-this-year',
    title: 'Rising this year',
    description: '…',
    filterConfig: { velocityMin: 15, rankRange: [1, 400] },
  },
  {
    id: 'culturally-driven',
    slug: 'culturally-driven',
    title: 'Culturally Driven',
    description: '…',
    filterConfig: {},
    explicitList: 'strongly-cultural',  // loaded from data/strongly-cultural.json
  },
];

export async function loadCollection(c: Collection) {
  if (c.explicitList) return loadExplicitList(c.explicitList);
  return queryWithFilter(c.filterConfig);
}
```

### Key Design Decisions

- **One config type, two render branches.** The branching is a single
  if-statement at load time; the rest of the rendering pipeline is
  unified.
- **`filterConfig` is data, not code.** New collections require zero
  TypeScript changes when they fit the existing predicate vocabulary.
- **`explicitList` references a snapshot file by name**, not an inline
  array. Keeps the config readable when lists are large.
- **`smartLink` field hijacks the primary CTA** when a collection should
  open a different surface (e.g. an interactive player) rather than a
  static list. Optional; defaults preserve list-page behavior.
- **Snapshots are committed to git**, not regenerated on every deploy.
  Editorial decisions deserve version history.

### This Codebase

`lib/name-collections.ts` (the config + types),
`lib/collection-names-server.ts` (server-side loader),
`lib/null-model.ts::getStronglyCulturalNames()` (the explicit-list
loader),
`lib/data/null-model-names.json` (the snapshot file),
`components/names/themed-name-list-page-client.tsx`,
`components/names/collection-list-page-client.tsx`,
`components/names/collection-sort-controls.tsx`.

### Tradeoffs

| Pro | Con |
|---|---|
| Editors can add a new collection by editing one file | Adding a new predicate to `FilterConfig` requires loader changes |
| Static + query-defined collections share rendering, sorting, filtering UI | Snapshot files drift from live data unless intentionally refreshed |
| Snapshots in git give editorial provenance | Large snapshots bloat the repo |
| `smartLink` lets one collection redirect to a richer interaction | Two CTA paths to maintain |

---

## 8. Defensive JSONB normalizer

### Problem

Semi-structured columns (JSONB / JSON) accumulate shape drift as a
schema evolves: arrays become CSVs, objects gain optional fields, null
sometimes means "empty," sometimes means "unknown." Reading these
columns naively produces runtime errors in the hot path.

### The Pattern

```ts
export function normalizeStringArray(raw: unknown): string[] {
  if (raw == null) return [];
  if (Array.isArray(raw)) {
    return raw
      .filter((x): x is string => typeof x === 'string')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (typeof raw === 'string') {
    // Tolerate CSV / newline-delimited legacy values.
    return raw
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export function normalizeRichArray<T>(
  raw: unknown,
  isItem: (x: unknown) => x is T,
): T[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isItem);
}
```

### Key Design Decisions

- **Always return the empty case, never throw.** A render path should
  never blow up because a column has the wrong shape.
- **Tolerate the most common legacy shapes** — for arrays, that's CSV
  strings and `null`. Don't be more permissive than that or you mask
  real data quality issues.
- **One normalizer per logical field shape**, not per-table. Reuse
  across queries; centralizes the tolerance policy.
- **Type guards for object items**, not blind casts. A JSONB row's
  shape is a runtime fact, not a compile-time guarantee.

### This Codebase

`lib/character-qualities.ts::normalizeCharacterQualities()`,
`lib/name-list-field.ts::expandNameListField()` (handles arrays AND
CSV strings AND mixed),
plus per-component defensive patterns inside
`components/names/name-profile-page-client.tsx`.

**Known gaps.** No central Zod schema for the JSONB blob shapes — each
field has its own normalizer. A future improvement is one Zod schema
per JSONB column, with `.safeParse` returning the empty case on
failure.

### Tradeoffs

| Pro | Con |
|---|---|
| Render path is crash-free regardless of historical shape drift | Hides data quality issues that should ideally be alerted on |
| Centralized tolerance policy per field type | One normalizer per field can become per-row when types diverge |
| Simple to test (pure functions over `unknown`) | Encourages "just normalize it later" instead of fixing the writer |

---

## 9. Recommendation cluster: stored arrays + client de-dupe + fallback

### Problem

"Similar items," "you might also like," "pairs well with" surfaces
need to render a small ranked set per entity. You don't want to run a
nearest-neighbor query at request time, but pre-computed lists can be
sparse for some entities, contain duplicates, or include the entity
itself. You need a render-time pipeline that gracefully fills in.

### The Pattern

```ts
type Entity = { id: string; similarStyle?: string[]; similarSound?: string[]; sameCategory?: string[] };

export function buildRecommendationCluster(
  entity: Entity,
  fallbackPool: Entity[],
  maxItems: number,
): string[] {
  const seen = new Set<string>([entity.id]);  // never recommend self
  const out: string[] = [];

  const addFrom = (source: string[] | undefined) => {
    for (const x of source ?? []) {
      if (out.length >= maxItems) return;
      if (seen.has(x)) continue;
      seen.add(x);
      out.push(x);
    }
  };

  // Try sources in priority order.
  addFrom(entity.similarStyle);
  addFrom(entity.similarSound);
  if (out.length < maxItems) {
    // Fallback: same-category siblings, deterministic order.
    addFrom(fallbackPool.filter((e) => e.id !== entity.id).map((e) => e.id));
  }

  return out;
}

// For "which cluster do I show first?" — pick by coverage:
export function preferLargerCluster(a: string[], b: string[]): string[] {
  return a.length >= b.length ? a : b;
}
```

### Key Design Decisions

- **De-dupe with a `Set`, not array filtering** — O(n) instead of O(n²)
  and keeps insertion order.
- **Always exclude self** — sounds trivial; gets missed. Every cluster
  should pre-seed the seen set with the entity's own id.
- **Source priority is data-driven**, not algorithmic. The first
  populated source wins; later sources fill remainders. Make the
  priority order obvious in code.
- **Fallback pool is the same-category set**, ordered deterministically.
  Random selection makes the page feel non-canonical and breaks
  caching.
- **Pick the larger cluster for the visible spot** when an entity has
  multiple valid clusters with different coverage. A sparse "primary"
  cluster looks worse than a fuller "secondary."

### This Codebase

`lib/you-might-also-like.ts` (the dominant client-side de-dupe pattern),
`lib/compare-helpers.ts` (the "pick larger cluster" heuristic
between `similar_style` and `similar_sound`),
`components/names/sibling-name-card.tsx`,
`components/names/related-lists-section.tsx`.

**Known gaps.** No vector/embedding-backed fallback; when stored
arrays are empty AND same-category fallback is sparse, the cluster
just shows fewer items.

### Tradeoffs

| Pro | Con |
|---|---|
| Render-time cost is O(n); no extra round-trips | Quality is bounded by what the enrichment step put in the JSONB columns |
| Deterministic output; easy to cache and screenshot-test | No personalization unless you add a per-user re-rank step |
| Self-exclusion is centralized | Source priority is hardcoded; users can't pick |

---

## 10. LocalStorage + DB merge with custom-event sync

### Problem

A per-user collection (favorites, shortlist, history) needs to work
both logged-out (localStorage) and logged-in (server-side row). Two
storage backends mean two caches, which means stale data when one
mutates without the other knowing. You also need cross-tab sync — a
save in tab A should reflect in tab B without a page reload.

### The Pattern

```ts
// shared-collection.ts
const KEY = 'app:saved-items';
const EVENT = 'app:saved-changed';

function readLocal(): string[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
}

function writeLocal(items: string[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVENT));
}

export function subscribe(cb: () => void): () => void {
  window.addEventListener(EVENT, cb);
  // Cross-tab sync via the native `storage` event:
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) cb(); };
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener('storage', onStorage);
  };
}

export async function addItem(id: string, db: Db | null, userId: string | null) {
  // 1. Local first — instant UI feedback.
  const local = readLocal();
  if (!local.includes(id)) writeLocal([...local, id]);

  // 2. DB if logged-in — eventual consistency with the server.
  if (db && userId) {
    await db.from('saved_items').upsert({ user_id: userId, item_id: id });
  }
}

export async function loadMerged(db: Db | null, userId: string | null): Promise<string[]> {
  const local = readLocal();
  if (!db || !userId) return local;
  const { data } = await db.from('saved_items').select('item_id').eq('user_id', userId);
  const remote = (data ?? []).map((r) => r.item_id);
  return Array.from(new Set([...remote, ...local]));
}
```

### Key Design Decisions

- **Local first, DB second.** Optimistic UI — never make the user wait
  on the server to see their own action.
- **Custom event for same-tab sync, native `storage` event for
  cross-tab.** Both because they fire under different conditions
  (custom event also fires within the originating tab; `storage` does
  not).
- **Merge on read, not on write.** Writers don't have to know about
  the other store; readers always see the union.
- **`Set`-based de-dupe in `loadMerged`** — same item can exist in
  both stores after a sign-in.
- **Never `JSON.parse` without try/catch.** Any sloppy hand-edit of
  storage will crash the app otherwise.

### This Codebase

`lib/namesake-saved-names.ts` (custom-event bus,
`subscribeNamesakeSaved`, `appendNamesakeSaved`),
`lib/saved-names.ts` (`saveNameToAccount` — DB write + local sync),
`lib/saved-names-server.ts::loadSavedNames()` (the merge),
`contexts/NameListContext.tsx`.

**Known gaps.** Cross-tab `storage` event is not currently wired; only
the custom event fires. Multiple open tabs can drift until refresh.

### Tradeoffs

| Pro | Con |
|---|---|
| Works logged-out and logged-in with the same UI | Two storage paths to keep coherent |
| Optimistic UI with no spinner on save | Race: rapid save+remove can drop the remove if DB is slow |
| Cross-tab sync via native browser primitive | `storage` event doesn't fire in the originating tab — needs the custom-event pair |
| Sign-in flow can merge cleanly without losing local state | "What does the user actually have saved?" is two queries |

---

## 11. Realtime fan-out by channel naming

### Problem

You want live updates ("votes are coming in," "user X is online,"
"this item just changed") scoped to a specific sub-entity, without
every client subscribing to every change in the database.

### The Pattern

```tsx
'use client';
import { useEffect, useState, useCallback } from 'react';
import { db } from '@/db/browser';

export function useLiveCount(scopeId: string, ids: string[]) {
  const [count, setCount] = useState(0);

  const refresh = useCallback(async () => {
    const { count: c } = await db.from('events')
      .select('id', { count: 'exact', head: true })
      .in('scope_id', ids);
    setCount(c ?? 0);
  }, [ids]);

  useEffect(() => {
    if (ids.length === 0) return;
    const idSet = new Set(ids);
    const channel = db
      // Channel name encodes the scope. Each subscriber gets its own channel.
      .channel(`events-live-${scopeId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'events' },
        (payload) => {
          const row = payload.new as { scope_id?: string };
          if (row.scope_id && idSet.has(row.scope_id)) void refresh();
        }
      )
      .subscribe();

    return () => { void db.removeChannel(channel); };
  }, [scopeId, ids, refresh]);

  return count;
}
```

### Key Design Decisions

- **Channel name is the scope.** No filter parsing on the wire — the
  server-side broadcast is keyed by channel string. Tightly-named
  channels keep fan-out cheap.
- **Filter again on the client** with a `Set<id>` lookup. Postgres
  Changes broadcasts can include rows you don't care about; cheap
  client filter is the second cut.
- **Refresh by *re-querying* on event**, don't try to mutate local
  state from the payload. Counts derived from a fresh server query
  are guaranteed consistent; client-incremented counts drift.
- **Always `removeChannel` on cleanup.** Channel leaks during
  navigation produce real memory + connection costs.
- **Initial state comes from the server-rendered prop**, not from a
  client query. The realtime subscription only handles updates.

### This Codebase

`hooks/use-realtime-votes.ts::useRealtimeVoteCountsForName()` —
channel `votes-live-${tournamentId}-${nameId}`, INSERT-on-`votes`
filtered by matchup_id Set, refresh-on-event.
`components/tournament/live-vote-bar.tsx` consumes it.

**Known gaps.** Only INSERT is subscribed; UPDATE / DELETE on votes
won't trigger refresh (an admin un-vote wouldn't reflect live).

### Tradeoffs

| Pro | Con |
|---|---|
| One subscription per scoped widget; no global firehose | Each widget opens its own channel — N widgets on a page = N channels |
| Refresh-on-event guarantees counts match the DB | Extra round-trip on every event; not viable for very high event rates |
| Server-rendered initial state means no flash-of-empty | Initial state can briefly disagree with realtime if events arrive between SSR and subscribe |
| Cleanup is a single `removeChannel` call | Need to re-subscribe whenever the scope id list changes |

---

## 12. Token namespace separation per audience

### Problem

A single resource is shared with multiple audiences who have different
permissions: a public link, a per-actor private link, an organizer
admin link. Reusing one token for all of them is convenient but
catastrophic — leaking the public link grants admin access. Putting
the audience in the URL path alone is not enough; an attacker who
guesses the resource ID is past the gate.

### The Pattern

```ts
// At resource creation, mint distinct tokens per audience.
const resource = await db.from('resources').insert({
  share_token:        randomToken(24),  // public link
  parent1_secret:     randomToken(32),  // private to actor 1
  parent2_secret:     randomToken(32),  // private to actor 2
  organizer_secret:   randomToken(32),  // admin link
  parent_pin:         randomPin(6),     // out-of-band PIN for sensitive surfaces
}).select().single();

// Routes accept different tokens and never cross-resolve them.
// /public/[shareToken]      → reads by share_token
// /private/[parentSecret]   → reads by parent1_secret OR parent2_secret
// /admin/[organizerSecret]  → reads by organizer_secret
// /reveal/[shareToken]      → reads by share_token AND requires parent_pin

export async function resolveAudience(token: string) {
  const r = await db.from('resources')
    .select('id, share_token, parent1_secret, parent2_secret, organizer_secret')
    .or(`share_token.eq.${token},parent1_secret.eq.${token},parent2_secret.eq.${token},organizer_secret.eq.${token}`)
    .single();
  if (!r) return null;
  if (token === r.organizer_secret) return { resource: r, audience: 'organizer' };
  if (token === r.parent1_secret) return { resource: r, audience: 'parent1' };
  if (token === r.parent2_secret) return { resource: r, audience: 'parent2' };
  if (token === r.share_token)    return { resource: r, audience: 'public' };
  return null;
}
```

### Key Design Decisions

- **One column per audience**, not a single `tokens` JSONB. Indexed
  lookups, clear permissions, easy to revoke a single audience by
  rotating one column.
- **Different lengths/entropy by sensitivity.** Admin tokens longer than
  public ones makes brute-force economics asymmetric.
- **Out-of-band PIN for the most sensitive surface** (e.g. unveiling a
  decision). Even leak of the URL doesn't compromise it without the
  PIN.
- **Routes don't share `[token]` resolution.** The public route has no
  code path that can produce admin authorization, even by mistake.
- **`resolveAudience` is the single oracle** that maps token →
  permission level. All handlers go through it.

### This Codebase

`app/api/tournaments/route.ts` mints `share_token`,
`parent1_bracket_token`, `parent2_bracket_token`, `parent_access_code`
(PIN), `shower_host_pin`. Route layout enforces separation:
`/vote/[token]` reads `share_token`, `/bracket/[token]` reads parent
bracket tokens, `/reveal/[token]` requires both `share_token` and PIN.

**Known gaps.** No token rotation API yet — if a parent leaks their
bracket token, the only remediation is to mark the tournament closed.

### Tradeoffs

| Pro | Con |
|---|---|
| Audience-scoped revocation (rotate one column, others unaffected) | More columns to mint/manage at creation |
| Compromise of one token doesn't escalate | More URLs to communicate to users |
| Routes are physically separated; misuse is harder | Resolving "what tournament does this URL point to" requires checking N columns |
| PIN gives a true second factor for the highest-stakes surface | PIN delivery is an out-of-band UX problem |

---

## 13. State-machine via DB columns + action endpoint

### Problem

Multi-stage workflows (draft → live → completed; or open → voting →
tally → recap) need to enforce ordering, prevent invalid transitions,
and let multiple actors advance the state. A dedicated state-machine
library is overkill; ad-hoc booleans sprinkled across rows produce
"impossible" combinations.

### The Pattern

```ts
// Schema
type ResourceRow = {
  id: string;
  status: 'draft' | 'live' | 'complete';
  current_round: number;
  finalized_at: string | null;
};

// One action endpoint per transition. Each enforces its own preconditions.
// POST /api/advance-round { resourceId }
export async function POST(req: Request) {
  const { resourceId } = await req.json();
  const db = await createServerDb();

  const { data: resource } = await db.from('resources').select('*').eq('id', resourceId).single();
  if (!resource) return res(404);
  if (resource.status !== 'live') return res(409, 'must be live to advance');

  // 1. Tally the current round.
  const winners = await tallyRound(db, resourceId, resource.current_round);

  // 2. Decide: another round, or done?
  if (winners.length === 1) {
    await db.from('resources').update({
      status: 'complete',
      finalized_at: new Date().toISOString(),
    }).eq('id', resourceId);
    return res(200, { status: 'complete', winner: winners[0] });
  }

  // 3. Insert next round, advance cursor.
  await insertNextRound(db, resourceId, winners);
  await db.from('resources').update({ current_round: resource.current_round + 1 }).eq('id', resourceId);
  return res(200, { status: 'live', round: resource.current_round + 1 });
}
```

### Key Design Decisions

- **State lives in DB columns**, not in application memory. Multi-actor
  transitions stay consistent across requests.
- **One action endpoint per transition**, not a generic `/update`.
  Each endpoint encodes its preconditions explicitly.
- **Reject illegal transitions with 409**, not 400 or 500. Clients can
  detect "stale state" and refresh.
- **Single endpoint does tally + advance + status update** atomically
  (or as close to atomic as Supabase allows). Splitting them invites
  half-advanced states.
- **The transition function is the terminal authority on "is this
  done?"** — UI must not derive `complete` independently.

### This Codebase

`app/api/advance-round/route.ts` is the canonical example: tallies
parent_bracket_votes + community votes, computes winners by mode,
decides whether to mint the next round or finalize, all in one POST.
Mode + control settings (`mode='shower'` vs `'async'`,
`'open-village'` vs `'guided-democracy'` etc.) are encoded in DB
columns and read by the same endpoint.

**Known gaps.** No formal transition diagram — the legal state
transitions are implicit in `if`-guards. As complexity grows, a small
state-machine library would document this better.

### Tradeoffs

| Pro | Con |
|---|---|
| Multi-actor concurrency stays correct (DB is the arbiter) | No compile-time check that all transitions are handled |
| Easy to retry a transition — state checks make it idempotent-ish | Tally + advance ideally want a real DB transaction |
| Add a new transition by adding a new endpoint | "Reverse a step" needs a custom endpoint per direction |
| Status columns make admin observability trivial | Lots of `if (status !== 'live')` boilerplate at the top of handlers |

---

## 14. Adaptive ranked queue

### Problem

A "next item" surface (swipe, recommend, drill) needs to serve items
in roughly best-first order, but you don't want to pre-compute and
freeze the order — feedback should influence what shows up later in
the same session.

### The Pattern

```ts
type Item = { id: string; score: number; tags: string[] };

export async function buildAdaptiveQueue(
  candidatePool: Item[],
  recentlySeen: Set<string>,
  feedback: { likedTags: Set<string>; dislikedTags: Set<string> },
  limit: number,
): Promise<Item[]> {
  // 1. Filter out anything the user has seen this session.
  const fresh = candidatePool.filter((i) => !recentlySeen.has(i.id));

  // 2. Reweight by feedback.
  const scored = fresh.map((i) => {
    let boost = 0;
    for (const t of i.tags) {
      if (feedback.likedTags.has(t)) boost += 5;
      if (feedback.dislikedTags.has(t)) boost -= 8;
    }
    return { ...i, adjusted: i.score + boost };
  });

  // 3. Sort by adjusted score; sprinkle in some exploration (every 5th item is random-ish).
  scored.sort((a, b) => b.adjusted - a.adjusted);
  const top = scored.slice(0, Math.floor(limit * 0.8));
  const explore = scored.slice(Math.floor(limit * 0.8))
    .sort(() => Math.random() - 0.5)
    .slice(0, limit - top.length);

  return [...top, ...explore];
}
```

### Key Design Decisions

- **Recently-seen filter is a `Set` on the client.** Server doesn't need
  to track session state; client passes recently-seen IDs into the
  query.
- **Negative feedback weighs heavier than positive.** Disliked-tag
  penalty exceeds liked-tag boost, because a single dislike is more
  diagnostic than a single like.
- **Exploration tail (~20%) prevents queue collapse** to one tag
  cluster after a few likes. Pure exploitation is brittle.
- **Sort happens on the client** when the candidate pool is
  small/medium (~hundreds). For very large pools, push the boost
  formula into a DB function.

### This Codebase

`lib/swipe-adaptive-queue.ts` (the boost-and-reorder logic),
`hooks/use-play-queue.ts` (consumer),
`app/api/play/queue/route.ts` (server-side seed query),
`app/api/play/swipe/route.ts` (writes the feedback signal —
`name_swipes` table).

### Tradeoffs

| Pro | Con |
|---|---|
| Feedback influences subsequent items in the same session | Pure client-side adaptation doesn't survive a page reload without persisted feedback |
| Easy to reason about — sort + boost | Quality plateaus once the candidate pool is exhausted |
| Exploration tail keeps the surface fresh | Random exploration sometimes feels "wrong" right after a strong signal |
| No ML infrastructure required | Doesn't generalize across users (no collaborative filtering) |

---

## 15. Trend classification from raw rank deltas

### Problem

You have time-series rank data (item X was rank 12 last year, rank 35
this year). You want to display "rising / stable / falling" labels and
optionally penalize fast-rising items in scoring.

### The Pattern

```ts
type RankSnapshot = { year: number; rank: number };

export function classifyTrend(history: RankSnapshot[]): 'rising' | 'rising-fast' | 'stable' | 'falling' {
  if (history.length < 2) return 'stable';
  const sorted = [...history].sort((a, b) => a.year - b.year);
  const last = sorted.at(-1)!.rank;
  const prev = sorted.at(-2)!.rank;
  const delta = prev - last;  // positive = improved (lower rank number)

  const TIE = 3;            // rank wobble within ±3 = stable
  const FAST = 50;          // jump > 50 ranks = "rising fast"

  if (Math.abs(delta) <= TIE) return 'stable';
  if (delta > FAST)  return 'rising-fast';
  if (delta > 0)     return 'rising';
  return 'falling';
}

// Score adjustment: penalize unsustainable surges.
export function trendAdjustment(velocity: number): number {
  if (velocity > 100) return -25;
  if (velocity > 50)  return -12;
  return 0;
}

// Display: convert rank to a 0–99 popularity score with log scaling.
const MAX_RANK = 20000;
export function rankToPopularityScore(rank: number | null): number {
  if (!rank || rank <= 0 || rank > MAX_RANK) return 5;
  const score = Math.round(100 * (1 - Math.log(rank) / Math.log(MAX_RANK)));
  return Math.max(1, Math.min(99, score));
}
```

### Key Design Decisions

- **Tie threshold is explicit and small** (±3 ranks). Without it,
  every rank change becomes "rising" or "falling" and labels
  become noise.
- **Log-scaled score, not linear.** The difference between rank 1
  and rank 50 matters; rank 5000 vs 5050 doesn't. Log captures
  this asymmetry.
- **Surge penalty is a *signed* adjustment**, not a multiplier.
  Easy to compose with other adjustments.
- **Fast-rising is suspicious for some scoring contexts** (likely
  fad), but desirable in others (early adopter signal). Keep the
  classification separate from the scoring decision.

### This Codebase

`lib/popularity-score.ts::rankToPopularityScore()`,
`popularityScoreLabel()`, `popularityScoreColor()`,
`lib/scoring-engine.ts` velocity penalty (`if (v > 100) score -= 25`),
`lib/trend-baseline.ts`,
`lib/name-collections.ts` `TrendSignal` type
(`'up' | 'up-fast' | 'down' | 'neutral' | 'check'`).

### Tradeoffs

| Pro | Con |
|---|---|
| Explainable thresholds — easy to tune | Hand-tuned thresholds drift from underlying distribution |
| Log scaling produces more honest "popularity" labels | Users sometimes still don't intuit log scales |
| Surge penalty is composable with other score adjustments | Penalty value (`-25`) is opinionated and project-specific |
| Works on minimal data (just two years of ranks) | Longer history would enable better classification (use spline / regression) |

---

## 16. Public dataset ingest → derived stats table

### Problem

You ingest a large public dataset (years × dimensions of records) and
need fast queries for current snapshots ("latest rank, recent
velocity, peak year"). Querying the raw history every time is too
slow; computing on write doubles the surface area for bugs.

### The Pattern

```
       ┌─────────────────┐
       │ raw source files│  ← public dataset (zip / CSV / parquet)
       └────────┬────────┘
                │  parse + batch
                ▼
       ┌─────────────────┐
       │  history_table  │  primary key: (entity_id, year, dimension)
       └────────┬────────┘  upsert onConflict (the natural key)
                │  derive
                ▼
       ┌─────────────────┐
       │   stats_table   │  one row per (entity_id, dimension)
       └────────┬────────┘  fields: latest_rank, prev_rank, velocity_1y, peak_rank, peak_year
                │  read
                ▼
        application queries
```

```ts
// scripts/ingest-history.ts — one-time / annual.
const BATCH = 500;
for await (const batch of readBatches('source/*.txt', BATCH)) {
  await db.from('history_table')
    .upsert(batch, { onConflict: 'entity_id,year,dimension' });
}

// scripts/refresh-stats.ts — derived from history, runs after ingest.
const { data: latest } = await db.rpc('compute_latest_stats');
await db.from('stats_table').upsert(latest, { onConflict: 'entity_id,dimension' });
```

### Key Design Decisions

- **Two tables, one source of truth.** History is canonical; stats is
  derived. You can always rebuild stats by re-running the refresh
  script.
- **Derive in SQL when possible**, in script when it's complex enough
  to need testing. Either way, never read history at request time.
- **Batch upserts of 500** for ingest. Smaller batches multiply
  round-trip overhead; larger ones risk statement-size limits.
- **Idempotent on both tables.** Re-running ingest produces the same
  result; re-running refresh produces the same stats.
- **Stats table has the natural unique index** on its grouping key.
  Lets the app query without joins for the common case.
- **Snapshot to git** any derived JSON the app reads (e.g.
  `lib/data/phase7a-irf.json`) when the derivation is too expensive
  for the runtime.

### This Codebase

`scripts/ingest-ssa-history.ts` (history table, batched upserts on
`name,year,gender`), `scripts/refresh-ssa.ts` (stats table, upserts on
`name,gender`), `cloud/modal_app.py` (long-running derivations on
Modal that produce parquet snapshots in the `research-data` volume),
`lib/data/phase7a-irf.json` and `lib/data/null-model-names.json` (committed
snapshots consumed by app code).

### Tradeoffs

| Pro | Con |
|---|---|
| Request path is fast; reads one row per entity | Ingest is a separate operational concern |
| History stays canonical and auditable | Stats can drift from history if refresh script is forgotten |
| Re-derivation is always possible from raw | Two tables to migrate when the schema changes |
| Snapshots in git give versioned, deterministic reads for derived data | Snapshots get stale unless intentionally refreshed |

---

## 17. Server-side filter config as data

### Problem

You want non-engineers (or future-you in a hurry) to add a new
filtered view over the same underlying table without writing SQL or
touching component code. Each view has its own filter predicates,
sort order, and headline copy.

### The Pattern

```ts
export interface FilterConfig {
  search?: string;
  categories?: string[];
  scoreMin?: number;
  rankRange?: [number, number];
  velocityMin?: number;
}

export interface View {
  id: string;
  slug: string;
  title: string;
  description: string;
  filterConfig: FilterConfig;
  defaultSort?: 'rank' | 'score' | 'velocity';
}

export const VIEWS: View[] = [
  { id: 'rising',     slug: 'rising-this-year',  title: 'Rising this year',
    description: 'Climbing fastest in the last reporting year.',
    filterConfig: { velocityMin: 15, rankRange: [1, 400] }, defaultSort: 'velocity' },
  { id: 'classics',   slug: 'steady-classics',   title: 'Steady classics',
    description: 'High recognition, low drama.',
    filterConfig: { rankRange: [1, 1000] }, defaultSort: 'rank' },
];

export async function loadView(view: View, db: Db): Promise<Row[]> {
  let q = db.from('items').select('*');
  if (view.filterConfig.scoreMin != null)   q = q.gte('score', view.filterConfig.scoreMin);
  if (view.filterConfig.velocityMin != null) q = q.gte('velocity_1y', view.filterConfig.velocityMin);
  if (view.filterConfig.rankRange) q = q.gte('rank', view.filterConfig.rankRange[0])
                                        .lte('rank', view.filterConfig.rankRange[1]);
  if (view.filterConfig.categories?.length) q = q.in('category', view.filterConfig.categories);
  if (view.defaultSort === 'velocity') q = q.order('velocity_1y', { ascending: false });
  return (await q).data ?? [];
}
```

### Key Design Decisions

- **One predicate per `FilterConfig` field.** No "raw SQL" escape
  hatch — keeps configurations safe and testable.
- **Loader translates predicates to query method calls** sequentially.
  Adding a new predicate = one new field + one new translator branch.
- **Description and title are part of the config**, not separate
  CMS state. New views are one PR, not one PR per file.
- **Sort defaults are part of the view**, not user-selected. (User
  controls layered on top, but defaults make every view show
  intentionally.)

### This Codebase

`lib/name-collections.ts` (the config + types — `FilterConfig`,
`NameCollection`, `TRENDING_NOW_COLLECTIONS`),
`lib/collection-names-server.ts` (the loader),
`components/names/themed-name-list-page-client.tsx` (consumer).

### Tradeoffs

| Pro | Con |
|---|---|
| New view = one entry in a config array | New predicate kind requires a loader change |
| Filter config is data — easy to A/B or feature-flag | Configs proliferate; eventually want a CMS |
| Loader stays small; no SQL injection surface | Loader's translation logic must stay in sync with the config types |

---

## 18. Inline per-handler authorization

### Problem

Small admin/internal surfaces don't justify the cost of a full RBAC
system, but you still need to make sure every endpoint enforces the
same gate. Middleware can be skipped by accident; per-handler checks
can be forgotten. You want a check that's so close to the handler
body that omitting it is conspicuous.

### The Pattern

```ts
// lib/admin-guard.ts
export async function requireAdmin(): Promise<{ ok: true; email: string } | Response> {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return new Response('Admin not configured', { status: 500 });

  const db = await createServerDb();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return new Response('Unauthorized', { status: 401 });
  if (user.email !== adminEmail) return new Response('Forbidden', { status: 403 });

  return { ok: true, email: user.email };
}

// app/api/admin/run-audit/route.ts
export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;
  // … handler body …
}
```

### Key Design Decisions

- **Guard returns a `Response` for failures**, an object for success.
  Forces the caller to handle both with one `instanceof` check.
- **Single env var (`ADMIN_EMAIL`) or a comma-separated list** —
  enough for small teams. Move to a `roles` table when you outgrow
  this.
- **No middleware.** Middleware can be skipped if a route accidentally
  excludes a path pattern. Inline checks fail closed.
- **Verify against authenticated session**, not headers. A header
  comparison is trivially spoofable.

### This Codebase

`app/admin/page.tsx` and `app/api/admin/**/route.ts` use this
inline-check pattern. The exact helper is sometimes inlined; a
shared `requireAdmin()` would be a follow-up.

**Known gaps.** No central guard helper exists yet — every
`/api/admin/*` handler reimplements the check. Easy refactor.

### Tradeoffs

| Pro | Con |
|---|---|
| Impossible to "forget" — the check is in the handler body | Easy to forget *between* handlers, since each is independent |
| Trivial to read; no middleware indirection | Doesn't scale beyond a small set of admin emails |
| No risk of route-pattern skip | Per-handler boilerplate (until you extract a helper) |
| Works without an RBAC layer | One person leaving = config change |

---

## 19. Long-running compute on a separate worker

### Problem

Some pipelines are too heavy for a request cycle (multi-hour
simulations, Monte Carlo, large data joins, model training). Running
them on the web tier blocks deploys, exhausts function timeouts, and
fights for resources with user requests. Running them on the dev
laptop loses progress on every disconnect.

### The Pattern

- **Separate compute target** (cloud worker, Modal app, Vercel
  Sandbox, Vercel Workflow, Sidekiq, etc.) with its own deploy and
  scaling.
- **Web tier writes a job record** ("requested phase X with params
  Y") and returns immediately.
- **Worker reads job records**, runs the pipeline, writes outputs to
  shared storage (object storage, parquet volume, derived tables).
- **Web tier reads outputs** as static files or query-friendly
  derived tables — never invokes the worker synchronously.
- **Worker has its own secret store**, its own logs, its own retry
  semantics. Code can be shared via the same repo, but execution is
  fully separate.
- **Long-running invocations use a detached / durable mode** so a
  client disconnect doesn't abort the job.

```python
# cloud/worker_app.py — worker side
@app.function(cpu=16, memory=32768, timeout=3600)
def long_phase(inputs):
    raw = read_volume('/data/raw/...')
    result = monte_carlo(raw, n=10_000)
    write_volume('/data/derived/result.parquet', result)
    write_table('derived_stats', result.summary)

# Trigger from CLI (detached so disconnects don't kill it):
#   worker run --detach worker_app.py::long_phase
```

### Key Design Decisions

- **Web tier never blocks on the worker.** All worker ↔ web
  communication is asynchronous via shared storage.
- **Outputs are durable artifacts** (parquet snapshots, derived
  tables, committed JSON), not messages.
- **Worker code is in the same repo** so changes ship together,
  but deploys are independent.
- **Detached invocations only** for jobs longer than a coffee break.
  Local heartbeat-based jobs die when the laptop sleeps.
- **Outputs that live outside the worker's persistent volume need
  an explicit copy step** — many compute platforms write to
  ephemeral disk by default.

### This Codebase

`cloud/modal_app.py` (Modal app `baby-namer-research`, workspace
`people-analyst`, volume `research-data`), Python phase scripts
under `scripts/python/research/`, derived snapshots committed at
`lib/data/phase7a-irf.json` and `lib/data/null-model-names.json`,
operational guidance in `AGENTS.md` ("Long-running compute → Modal").

### Tradeoffs

| Pro | Con |
|---|---|
| Web tier stays fast and predictable | Two deploy targets, two sets of secrets |
| Pipelines can use real compute (CPUs, RAM, GPUs) without affecting users | Latency from data → worker → web is minutes-to-hours |
| Worker reruns are isolated; failures don't take down the web app | Coordination ("did the worker run yet?") is operational overhead |
| Works for any heavy compute pattern (ML, ETL, simulation) | Cross-tier debugging is harder than a monolith |

---

## 20. Graceful-degradation contract for optional enrichment

### Problem

You depend on multiple external enrichment sources (LLM-generated
metadata, third-party APIs, derived snapshots). Any one of them can
be missing for a specific entity (the LLM hasn't run yet, the API
was rate-limited, the snapshot is stale). The page should still
render usefully.

### The Pattern

```tsx
// Each enrichment source has a "missing" sentinel and a render that
// quietly omits the section.
function MaybeSection({ data, render }: { data: T | null; render: (d: T) => ReactNode }) {
  if (!data) return null;
  return render(data);
}

export function EntityPage({ entity, enrichment, history, recommendations, derivedSignal }) {
  return (
    <>
      <Header entity={entity} />                                {/* always renders */}
      <SummaryCard entity={entity} enrichment={enrichment} />   {/* core */}
      <MaybeSection data={history} render={(h) => <HistoryChart history={h} />} />
      <MaybeSection data={recommendations} render={(r) => <Recommendations items={r} />} />
      <MaybeSection data={derivedSignal} render={(s) => <SignalCard signal={s} />} />
    </>
  );
}
```

```ts
// Each fetcher returns null on "expected missing", throws on "broken".
export async function fetchDerivedSignal(slug: string): Promise<DerivedSignal | null> {
  try {
    const data = await readJson('lib/data/derived-signal.json');
    return data[slug] ?? null;
  } catch (e) {
    if (isMissingFile(e)) return null;   // expected: snapshot not regenerated yet
    throw e;                             // unexpected: surface
  }
}
```

### Key Design Decisions

- **Fetchers distinguish "expected missing" (return `null`) from
  "broken" (throw).** A missing snapshot is normal; a corrupt
  snapshot is not.
- **`null`-data sections render to `null`**, not to "no data" text.
  The user shouldn't see scaffolding for things they don't know
  exist.
- **Core data fails the page** — entity 404, summary card error.
  Optional enrichment never does.
- **LEFT JOIN at the SQL level** for enrichment that lives in
  another table. Missing enrichment ⇒ null columns ⇒ section omitted.
- **The contract is enforced at the fetcher boundary**, not at the
  component. Components just trust their props.

### This Codebase

`name_full` view = `name_stats` LEFT JOIN `name_enrichment` (missing
enrichment ⇒ null fields), `lib/phase7a-irf.ts::getTrendingCardIrfLine()`
(returns null on missing snapshot), `components/names/trending-why-card.tsx`
(omitted when null), all the `MaybeSection`-style omits inside
`components/names/name-profile-page-client.tsx`. Documented in detail
in `PRODUCT_INTEGRATION_MAP.md` Section 9 ("Dependency and Fallback Map").

### Tradeoffs

| Pro | Con |
|---|---|
| Page always renders something useful | Hides data quality gaps from users *and* engineers |
| Adding a new enrichment is low-risk (degrade-by-default) | Need separate observability to know what's actually missing |
| Encourages additive evolution of the data model | "Why is this section missing?" requires DB inspection |
| Core failures still surface as errors | Easy to forget the throw-on-broken half of the contract |

---

## Pattern Combinations / Recipes

How patterns compose for common application shapes.

### Recipe A — "Detail page with rich, possibly-missing data"

Use **#3** (server assembly + client display) as the spine. Inside
each fetcher, follow **#20** (return null on expected missing, throw
on broken). Assemble a composite display number with **#4**
(weighted score with null fallback). Render recommendation strips
with **#9** (stored arrays + de-dupe + fallback). Read JSONB columns
through **#8** (defensive normalizer).

### Recipe B — "Curated browse surface backed by a single table"

Define views with **#17** (filter config as data) and themed
collections with **#7** (two render modes — query-defined and
explicit-list). Page shell follows **#3** (server assembly).

### Recipe C — "Multi-step user flow that produces a persisted artifact"

Capture preferences with **#6** (tag-tally wizard). Hold all wizard
state in client memory; persist with a single POST at the end. The
resource you create uses **#12** (token namespace separation per
audience) so the public link can't escalate to admin. Subsequent
state transitions use **#13** (DB-column state machine + action
endpoint).

### Recipe D — "Per-user collection that works logged-out"

Use **#10** (localStorage + DB merge with custom-event sync) for
storage, **#1** (three-client database factory) so the same code
paths work in the browser and on the server.

### Recipe E — "Live activity surface tied to a sub-entity"

Use **#11** (realtime fan-out by channel naming). Initial state from
**#3** (server-rendered prop), updates via the realtime hook.
Backing writes go through **#2** (idempotent upsert) so reconnect
storms don't double-count.

### Recipe F — "Adaptive ranking surface"

Use **#14** (adaptive ranked queue) on the read side, **#2**
(idempotent upsert) for feedback writes. Score items with **#4** and
optionally personalize with **#5**. Classify trend signals with
**#15** if you display them as rising/stable/falling labels.

### Recipe G — "Heavy data product with a thin web tier"

Use **#19** (long-running compute on a separate worker) for the
pipelines, **#16** (public dataset ingest → derived stats table) for
the canonical schema. Web reads only the derived stats table and
committed snapshots. Apply **#20** (graceful-degradation contract)
so web pages render when the worker is mid-pipeline.

### Recipe H — "Small admin surface inside a public app"

**#18** (inline per-handler authorization) on every endpoint.
**#1** (three-client database factory) — admin surfaces should use
the service-role client to bypass RLS where appropriate.

---

*Cross-reference: see [`PRODUCT_INTEGRATION_MAP.md`](./PRODUCT_INTEGRATION_MAP.md)
for the same patterns in their original (baby-naming) context, with
exact route + table mappings and known traps.*
