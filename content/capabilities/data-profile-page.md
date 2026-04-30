# Data-Driven Profile Page

**Type:** ui
**Origin repo(s):** baby-namer (most mature), vela (adjacent variant), people-analyst (metadata-heavy variant)
**Extraction readiness:** needs extraction
**Depends on:** graceful-degradation backends (LEFT JOIN views), AI enrichment pipeline (upstream)
**Last reviewed:** 2026-04-24

## What it is

A dense single-entity detail page that pulls 6–10 parallel data sources on the server, assembles them into a summary card, tabbed sections, recommendation clusters, and multi-faceted scoring breakdowns — and renders without spinner soup or SEO-poor HTML. The canonical case is Baby-Namer's name profile (one name → meaning + cultural pathways + notable bearers + composite score + similar-sounds + user dials re-projection). The same shape transfers to vela's image/unit decomposition pages and people-analyst's model metadata views.

## Data shape

- One "anchor" row (the entity being profiled).
- N optional enrichment tables keyed on the anchor (foreign-keyed or joined).
- At least one composite score column (weighted blend of component scores, null-safe).
- At least one array/JSONB column holding pre-computed related entities or cluster membership.
- LEFT JOIN views so missing enrichment rows don't break the page.

## UI / surface shape

- Next.js App Router: Server Component assembles data; Client Components handle interactive sections (tabs, filters, user dials).
- Summary card (hero area) — name/title, primary visual, composite score, 3-5 quick stats.
- Tabbed sections for each enrichment domain (e.g. "Meaning," "Culture," "Similar").
- Recommendation strips at the bottom ("you might also like") backed by stored arrays + client de-dupe.
- User-tunable dials (sliders) that re-project stored pillar scores into personalized display numbers without recomputation.

## Variants in the wild

- **Baby-namer** — 4-pillar Namesake Score, cultural pathways, notable bearers, rhymes/sounds. Most fully-featured.
- **Vela** — same shape applied to image decomposition + haikus. Tabs are more editorial than analytical.
- **People-analyst** — emphasis on model cards / metadata rather than user-facing scoring; less tabular, more documentation-style.

## Primary files in origin

- `app/names/[slug]/page.tsx` (Baby-Namer) — server assembly entry point
- `components/name-profile/` (Baby-Namer) — tabbed sections, score cards
- `lib/scoring/composite-score.ts` (Baby-Namer) — null-safe weighted blend
- `lib/personalization/dials-to-pillars.ts` (Baby-Namer) — read-time re-projection

## Next-version notes

- Extract a `<ProfilePage>` composition wrapper that takes: anchor, [enrichments], [tabs], [score config], [recommendations]. Today each consumer re-implements the assembly layer.
- The composite score math (P50) is ready to generalize; the surrounding page layout is not.
- Add skeleton / partial-render behavior when one enrichment source is slow but the rest are ready (streaming SSR).

## Related patterns

- P49 — Dense entity page: server assembly + client display
- P50 — Composite weighted score with null-safe blending
- P51 — Personalization re-mapping (N user dials → M pillars)
- P55 — Recommendation cluster with client de-dupe + fallback
- P66 — Graceful degradation for optional enrichment
- P43 — Display Component / Data Loader Separation (vela variant)
