# Boudoir Studio Inventory Protocol

**Program:** Boudoir Studio Research Program
**Companion docs:** `00-research-proposal.md`, `03-methodology.md`, `README.md`
**Authoritative table:** `boudoir_studios_research` (research-namespaced; not user-facing)
**ASN:** ASN-669

This document is the runbook reference for what counts as a *boudoir studio* in the research inventory, and what doesn't. It mirrors §5 of `03-methodology.md` (the sampling design) but is written as a maintainable rules document — when an inclusion-criteria edge case arises, this is the file you edit.

---

## What we are inventorying

A **U.S. commercial boudoir photography studio**. The unit of analysis is the *studio* (which may be a one-person operation or a multi-photographer business), not the photographer-as-individual.

A studio is **included** when **all** of the following are true:

1. **Commercial business with active public-facing portfolio.** The business sells boudoir photography services to consumers and presents at least a portfolio website that public users can browse.
2. **U.S.-based.** The studio's primary location is in the United States (or its territories — DC, PR, VI, GU, AS, MP). The methodology's reference distributions are U.S. Census 2020 tabulations; non-US studios cannot be coded against those references and are excluded from the analytical sample regardless of their commercial activity.
3. **Active.** The website resolves and the business is not marked as closed by the discovery source (Google `businessStatus !== "OPERATIONAL"` is excluded; Yelp `is_closed = true` is excluded).
4. **Identifiable as boudoir-focused.** The studio either explicitly markets boudoir / intimate portrait work as a service or the discovery source returned it under a boudoir-specific category (e.g. Yelp's `boudoirphotography`, Google Places query `boudoir photographer <city>`, PPA specialty `Boudoir`).

A studio is **excluded** when **any** of the following are true:

1. **Chain franchise (≥10 locations).** Chain photography studios with national-scale franchise structures are institutionally distinct from the independent-studio category the research program studies. The exclusion list (lib/research/boudoir-studios/inclusion.ts → `CHAIN_NAME_HINTS`) currently catches Boudoir Divas, JCPenney Portraits, Sears Portrait, Lifetouch, Picture People, Olan Mills, Glamour Shots, Portrait Simple. Add to this list as new chains appear in the discovery output.
2. **Tutorial / blog / influencer / education-only.** Sites that exist primarily to teach photography to other photographers, sell courses, run podcasts, or operate as an influencer presence (e.g. ShootProof tutorial pages, Click Photo School) are excluded — they do not constitute "commercial boudoir businesses serving consumers."
3. **Non-US.** Explicit non-US state, non-US country TLD (`.uk`, `.ca`, `.au`, `.de`, `.fr`, `.it`, `.es`, `.nl`, `.ie`, `.nz`), or Yelp `country !== "US"` triggers exclusion.
4. **Inactive URL.** When a website domain produces a hard 404 / DNS failure / 5xx persistently across the polite-fetch retry window, the row is marked `status = inactive_url`. The studio is retained in the table for traceability but is filtered out of analytical samples.

A studio is queued as **pending review** when:

- It looks plausible (commercial intent, US adjacency) but lacks one of the inclusion signals — typically no website, ambiguous TLD, or no US state on the discovery record. The reviewer either upgrades to `included` (after confirming the missing signal manually) or flips to `excluded` with a reason.

---

## Discovery sources (per §5 of methodology)

The discovery pipeline draws candidates from four independent sources, each implemented as a typed adapter under `lib/research/boudoir-studios/sources/`.

| Source | Adapter | Auth | Rate posture | Notes |
|--------|---------|------|--------------|-------|
| Google Places | `google-places.ts` | `GOOGLE_PLACES_API_KEY` | 1 req/s in-process | Text Search by city × {boudoir photographer, intimate portrait photographer, boudoir studio}. Caps at 20 results per request. |
| Yelp Places API (v3) | `yelp.ts` | `YELP_API_KEY` (Bearer) | 1 req/s; trial = 300 calls/day, 5,000/30-days | `term=boudoir`, `categories=boudoirphotography,photographers`, per-city, paginated to `offset=150` (Yelp surfaces ≤240 results per query). Yelp does NOT expose website domain — those records dedup via name+city+state fuzzy. (Yelp consolidated/rebranded "Fusion" → "Places API" but kept the v3 URL + Bearer-token shape; verified 2026-04-28.) |
| Photography directories | `photography-directories.ts` | none | Polite fetcher (1 req/2s/host, robots respected) | PPA `members.ppa.com/findmyphotographer?specialty=Boudoir`. Regional associations are a placeholder list — bespoke parsers per directory are follow-up work. |
| SERP probes | `serp.ts` | `SERPAPI_KEY` (preferred) | 1 req/1.5s in-process | "boudoir photographer <city>" via SerpApi. Direct scraping of search engine SERPs is intentionally NOT supported. |

When an adapter's API key is missing, it returns an empty result with `status = "skipped:missing_key"` and the orchestrator continues. Discovery completes from the available sources; the missing-key list is logged in the run report.

---

## Polite fetcher rules (apply to every adapter that hits the open web)

- 1 request / 2s per host. Single concurrent connection per host.
- User-Agent: `Vela-Research-Bot (https://vela.study/research; mike@peopleanalyst.com)`.
- Respect robots.txt: parse and check the path before fetching. `Disallow` for `*` or `vela-research-bot` skips and logs.
- Exponential backoff on 429/5xx with a hard cap (3 retries).
- No image bytes are fetched in this ASN. (Image fetching is ASN-673, contingent on Phase 2 sign-off.)

---

## Dedup algorithm

Implemented in `lib/research/boudoir-studios/dedup.ts`. Three strategies, applied in order:

1. **Normalized website domain (eTLD+1ish, lowercased, `www.` stripped).** Strongest signal; two records with the same domain are merged.
2. **Studio-name fuzzy match within (city, state).** Token-set Jaccard ≥ 0.75 after dropping common photography-business suffix tokens (`photography`, `studio`, `boudoir`, `llc`, `inc`, etc.). Constrained to the same (city, state) to avoid merging unrelated studios that happen to share a name.
3. **Lat/lng radius ≤ 200 m.** Last-resort tiebreak; requires ≥ 0.5 name similarity to avoid merging unrelated tenants of a shared studio building.

Merged records keep the canonical row (preferring the row with a non-null website_domain; otherwise the earliest-discovered) and accumulate the duplicates' provenance entries under `source_provenance.sources`.

---

## Idempotency

The persistence layer upserts on `slug`. A second run of `--execute` over the same discovery output is a no-op for rows that already exist; it refreshes the `inclusion_review` field if the classifier has been improved between runs.

`slug` derivation (`lib/research/boudoir-studios/slug.ts`):

1. If `website_domain` is non-null → slug = `website_domain` with `.` → `-`.
2. Else slug = slugify(`studio_name + city + state`).

This is stable as long as the website domain is stable. If a studio's domain changes, the next discovery pass will produce a NEW row; reconciling those is operator work via the inventory dashboard (follow-up).

---

## Coverage gaps and how we report them

The methodology document explicitly accepts coverage gaps. The expected pre-review gaps (in declining severity) are:

1. **Studios with no website / no Yelp listing / no Google Places presence.** Out of scope by construction — the discovery surface is web-based.
2. **Studios whose websites Disallow the crawler.** Robots.txt is respected absolutely; these are flagged and the percentage is reported as a coverage statistic.
3. **Studios that appear under a non-boudoir category on Yelp / Places.** These are missed by the category filter; SERP probes catch some but not all.
4. **Studios in cities not in `CITY_SEEDS`.** The seed list is ~100 cities biased toward population centers; small-town studios are systematically under-represented (see "Selection bias" in §6 of methodology).

When a discovery pass completes, the per-state distribution is checked against the IMLS / BLS QCEW per-state commercial photography baseline at the analysis stage. Post-stratification weights correct for the per-state coverage ratio.

---

## When you change the inclusion rules

The auto-classifier (`lib/research/boudoir-studios/inclusion.ts`) is intentionally conservative — it auto-classifies only unambiguous cases. When you tighten or loosen a rule:

1. Update `inclusion.ts` and add a note in this file explaining the change.
2. Re-run `npm run research:boudoir:discover -- --execute --limit=…` against the existing inventory; the upsert refreshes `inclusion_review` for affected rows.
3. Bump the methodology document if the change affects the analytical sample (e.g. tightening the U.S.-only rule to exclude territories would change the reference-distribution mapping).

---

## What this protocol does NOT cover

- Studio website copy fetching → ASN-670 (`crawl-protocol.md`)
- Studio image fetching → ASN-673 (Phase 2, contingent)
- Studio outreach / explicit-permission protocol → §6 of `00-research-proposal.md`
- Post-stratification weighting / BLS QCEW baseline integration → analysis-side ASN (Phase 2)

---

## Status

- 2026-04-27 — Initial protocol shipped with ASN-669 (this commit). Phase-1A discovery: framework + adapters + first dry-run pass. API keys pending operator action.
