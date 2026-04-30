# Boudoir Studio Website-Copy Crawl — Protocol

**ASN:** ASN-670
**Module:** `lib/research/boudoir-studios/crawl.ts`
**Runner:** `scripts/research/boudoir/crawl-copy.ts`
**Tables:** `boudoir_studio_pages` (page-level rows) + `boudoir_studios_research.pages_crawled_at` / `pages_crawl_status` (parent-side aggregate)
**Companion docs:** `03-methodology.md` §5–6, `inventories/2026-04-28-phase-1c-final.md`

This document is the standing operational reference for the website-copy crawl. It is the authority on what the crawler does, what it refuses to do, and how the operator runs it safely against the full corpus.

## Scope

For each studio with `inclusion_review='included'` AND `status='active'` in `boudoir_studios_research`, the crawler attempts to capture four canonical page kinds:

1. **`home`** — the studio's `website_url` (or its canonical root after redirects).
2. **`about`** — `/about`, `/about-us`, `/about-me`, `/our-story`, or `/meet*`. Anchor scanning of the homepage HTML augments the path probes.
3. **`pricing`** — `/pricing`, `/investment`, `/experience`, `/packages`, or `/rates`. The schema's `pricing` and `experience` enum values are interchangeable; the crawler always writes `page_kind='pricing'` and the URL retains the actual slug. Anchor scanning of the homepage HTML augments the path probes.
4. **`faq`** — `/faq` or `/frequently-asked-questions`. Anchor scanning of the homepage HTML augments the path probes.

Page kinds the crawler **does not** attempt: gallery / portfolio / blog / contact / social / login / cart. These are out of scope for the positioning analysis (ASN-671) and would substantially expand the per-studio fetch count.

**Image bytes are never fetched, ever.** This is a non-negotiable boundary. The crawler is HTML/text-only. The migration's `raw_html_blob_url` column is reserved for a possible future opt-in archive; in v1 it is always NULL.

## Polite-fetcher rules

These rules are encoded in `crawl.ts` and apply uniformly to every request the crawler issues, including the `robots.txt` lookup itself.

- **Declared User-Agent.** All requests carry `User-Agent: Vela-Research-Bot (https://vela.study/research; mike@peopleanalyst.com)`. The contact email is intentional — sysadmins who want to flag the bot can reach the operator directly.
- **Per-host throttle.** 1 request / 2 seconds per host. The throttle is enforced by an in-process `Map` keyed on `URL.hostname`; concurrent workers operating on different studios share the throttle table.
- **Single concurrent connection per host.** The throttle implies serialization within a host, so the crawler does not need an explicit semaphore. Subdomains of the same registrable domain are treated as separate hosts (the crawler does not normalize to eTLD+1 for throttling purposes).
- **Timeouts.** `robots.txt` fetch: 10 seconds. Page fetches: 30 seconds. Both are hard caps via `AbortSignal.timeout`.
- **Retries.** Up to 3 retries on `429` and `5xx` responses. Exponential backoff with jitter: `1.5s × 2^attempt + uniform(0, 750ms)`. After the final retry, the page is recorded as `unreachable` with the HTTP status in `error_detail`.
- **No anti-bot evasion.** Cloudflare challenge detection is explicit: a `cf-mitigated` response header, a `403` with a Cloudflare `Server` header, or the presence of any of the standard challenge-page body markers (`Just a moment...`, `cf-browser-verification`, `cf_chl_opt`, `Attention Required! | Cloudflare`) → the page is recorded as `unreachable` with `error_detail='cloudflare_challenge'`. The crawler does not attempt to defeat the challenge.

## robots.txt discipline

- For each origin, the crawler fetches `<origin>/robots.txt` once per process and caches the parsed result in memory.
- The standing `robots-parser` library handles wildcard matching and most-specific-rule selection. The crawler additionally enforces a "stricter wins" rule between the `Vela-Research-Bot` agent group and the `*` group: a page is allowed only if **both** groups would permit it. This is more conservative than RFC 9309's UA-specific-takes-precedence default and matches the assignment's explicit ask.
- Missing `robots.txt` (404 / connection failure) → fail-open per RFC 9309 (no rules → permitted).
- A `Disallow` for the relevant path → page recorded with `status='robots_blocked'`. The crawler does not retry under an alternate path.
- The `User-agent` string presented to the parser is the literal `Vela-Research-Bot ...` UA. Sites that publish `User-agent: Vela-Research-Bot` will match; sites that only declare `User-agent: *` will use that group via the fail-open path noted above.
- `Crawl-delay` is intentionally **not** honored beyond the standard 2s/host throttle. If a site declares a longer crawl-delay, the operator should add the host to a future site-specific override list rather than slowing the entire pipeline.

## Per-status semantics

Every row in `boudoir_studio_pages` has one of the six statuses below. The aggregate `pages_crawl_status` on the parent row is derived from the per-page statuses.

| Status | Meaning | Retryable? | Has `extracted_text`? |
|--------|---------|------------|----------------------|
| `ok` | Page fetched and Readability extraction yielded ≥50 words. | No (idempotent re-runs are no-ops on `(studio_id, page_kind, url)`). | Yes. |
| `robots_blocked` | `robots.txt` disallowed the path. | No. | No. |
| `unreachable` | Network error, non-2xx HTTP status (after retries), Cloudflare challenge, or non-HTML content type. | Yes via `--resume` if the parent's `pages_crawl_status='failed_retry'`. | No. |
| `paywalled` | HTTP 401 or 402 on the page. | Yes via `--resume` if the operator chooses to retry. | No. |
| `redirect_loop` | The fetch surfaced a redirect-loop error from the platform fetcher. Rare. | Yes via `--resume`. | No. |
| `extraction_failed` | The page returned ≥10KB of HTML but Readability extracted fewer than 50 words. Typical for JS-rendered SPAs (Squarespace/Showit/Wix shells where the static HTML is a header + footer with no body copy). | Manual — would require switching to a headless renderer, out of scope for v1. | No. |

Aggregate `pages_crawl_status`:

- `complete` — all four canonical page kinds returned `ok`.
- `partial` — at least one page kind returned `ok` but not all four.
- `blocked` — the home page was `robots_blocked` or `unreachable` (no usable content).
- `failed_retry` — the home page status was something else (e.g. `extraction_failed` only) and the studio is eligible for a `--resume` retry.

## Resume / idempotency contract

- Per-page upsert key is `(studio_id, page_kind, url)`. Re-runs are safe and do not duplicate rows. A re-run that produces a different `url` for the same kind (e.g. the alt-URL probe found `/about-me` this run vs `/about` last run) writes a *new* row; the prior row remains as a record of the prior state.
- **`--resume`** filters out studios whose `pages_crawled_at IS NOT NULL` AND `pages_crawl_status != 'failed_retry'`. This is the recommended default for the full-corpus run after a session interruption.
- **`--studio-ids=<comma-separated UUIDs>`** targets specific studios for re-crawl. Useful for spot-checking after fixing a fetcher bug.
- **Checkpoint:** `data/research/boudoir/crawl-progress.json` is written every 10 completed studios (rolling per-status / per-page-kind / per-crawl-status histograms). The file is gitignored implicitly via the `data/` convention; the markdown summary at the end of each run is the durable artifact.

## Extraction methodology

- Raw HTML is hashed with SHA-256 **before** extraction; the hash is persisted in `html_hash` even when extraction fails. This lets us detect re-crawls that yielded identical content without retaining the full HTML blob.
- Extraction uses `@mozilla/readability` invoked against a `jsdom` DOM. Defaults are loosened from news-article tuning: `charThreshold=200` (down from 500), `keepClasses=false`. The choice is deliberate — boudoir studio marketing copy is shorter and more emotive than the news articles Readability was originally tuned for.
- Extracted text is whitespace-collapsed (single spaces, trimmed) and capped at 200,000 characters before persistence. The cap is a defensive backstop; in practice no studio page approaches it.
- `word_count` is computed from the extracted text by splitting on Unicode whitespace and counting non-empty tokens.
- The `extraction_failed` heuristic — `html.length ≥ 10,000` AND `word_count < 50` — is the load-bearing signal for "JS-rendered SPA shell". When the heuristic fires we keep the row (so the failure rate is auditable) but do not persist `extracted_text`.

## Concurrency + throughput

- Up to **30 concurrent workers** by default. Each worker handles one studio at a time; within a studio, page fetches are sequential (the per-host throttle is the gating factor).
- Per studio, a typical successful crawl issues 5–7 HTTP requests:
  1. `robots.txt` (cached after first hit per origin).
  2. Homepage GET.
  3. Homepage re-fetch for anchor scanning (one extra fetch — see the inline note in `crawl.ts`).
  4. About / pricing / faq probes (1–3 each, depending on alt-URL fallthroughs).
- Wall-clock estimate at 30-worker concurrency: roughly **30–60 seconds per studio** in the steady state, assuming most studios cleanly resolve all four page kinds. Studios that exhaust alt-URL probes for a missing kind take proportionally longer.

For the full corpus of **4,534 included studios**: expect **40–75 hours** of wall-clock time at concurrency=30 in the steady state. Plan for the upper end — long-tail sites with slow TLS, large HTML, or aggressive bot protection drag the median up. The crawl is bounded by per-host politeness, not by CPU or network bandwidth on Vela's side; raising concurrency above ~30 buys very little because the long tail of slow studios serializes regardless.

## Validation batch (≤50 studios)

Before scaling to the full corpus:

```
npm run research:boudoir:crawl -- --execute --limit=50
```

The first 50 included studios (ordered by `created_at` ascending) are crawled and the results persisted. Validation report: `docs/research/boudoir-studios-program/inventories/2026-04-28-asn-670-a-validation-50.md`. The protocol's tripwire is **home-page reachable rate**: if fewer than 60% of the 50 studios' homepages return `ok`, the polite-fetcher or extraction is misconfigured and the operator should investigate before scaling.

## Full-corpus run

Recommended pattern (long-running shell that survives session termination):

```bash
nohup npm run research:boudoir:crawl -- --execute --concurrency=30 \
  --report=docs/research/boudoir-studios-program/inventories/$(date -u +%Y-%m-%d)-asn-670-full-crawl.md \
  > /tmp/boudoir-crawl-$(date -u +%Y%m%d-%H%M%S).log 2>&1 &
disown
```

`--resume` should be the default for any subsequent invocation:

```bash
npm run research:boudoir:crawl -- --execute --resume --concurrency=30
```

`tail -f` the log file or peek at `data/research/boudoir/crawl-progress.json` for live progress.

## Known limitations

- **JS-only sites.** Squarespace, Showit, Wix and other SPA platforms that ship a static-HTML shell are recorded as `extraction_failed`. Full content extraction would require a headless browser, which is explicitly out of scope for v1 (the marginal coverage gain does not justify the operational cost). Coverage gaps are reported as a sensitivity analysis at the comparison stage (per `03-methodology.md` §6).
- **Cloudflare-protected sites.** Recorded as `unreachable` with `error_detail='cloudflare_challenge'`. The protocol forbids any anti-bot evasion.
- **Paywalled sites.** Rare in this corpus, but `401` / `402` responses are recorded as `paywalled` and not retried.
- **Single-language assumption.** The Readability default and the per-page-kind path heuristics assume English. The boudoir corpus is U.S.-bounded by inclusion criteria, but Spanish-language studio pages in border-state markets may still require manual handling at the analysis stage.
- **Studios without a `website_url`.** Recorded with `pages_crawl_status='blocked'` and zero pages persisted. Yelp-only and SerpAPI-only enrichment can backfill `website_url` (ASN-669 Phase 1C Step 2); after that, those studios become eligible for re-crawl via `--resume`.
- **Per-host crawl-delay overrides.** Not implemented. The 2s/host throttle is uniform. If a future audit identifies a single noisy host, add it to a per-host override map rather than slowing the global pipeline.

## What the crawler explicitly is not

- It is not a rendering engine. JS execution is not attempted.
- It is not a sitemap crawler. Only the four canonical page kinds are probed; arbitrary subpages are not enumerated.
- It is not a freshness watcher. Each row is a snapshot at `fetched_at`; the pipeline does not currently re-fetch on a schedule.
- It is not an image fetcher. Period.
