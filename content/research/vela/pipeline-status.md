---
title: "Research Pipeline — Status"
description: "What's running, queued, blocked, and recently completed across the Vela research program."
status: v1
publishedAt: 2026-04-29
authors: ["Mike West"]
---

> **v1 — hand-curated snapshot as of 2026-04-29.** Distinct from `RESEARCH-PROGRAM.md`, which is the design plan. This is the page-of-record for *what is happening now*. Auto-generation is queued (ASN-980); the hand-curated cadence is per session-of-record until then.

## Running

In flight this week. Each item has an active commit log under `git log -- docs/research/` or in the assignment queue.

| Item | Surface | Last touched | Reference |
|---|---|---|---|
| **Bulk Vela source ingest (`ingest:dual` + audit)** | `docs/research/ingest-batches/2026-04-29-vela-batch-1-run.md` | 2026-04-29, 117/274 chunks (1 chunk-level error) | ASN-665 |
| **Multi-faceted extraction (Path B, default tier)** | `lib/factory/multi-faceted-pipeline.ts`, `docs/research/multi-faceted-vs-dual-grade.md` | 2026-04-29, bundled-extraction refactor shipped | ASN-689 |
| **Boudoir Studios Program — discovery + crawl** | `docs/research/boudoir-studios-program/`, `docs/research/2026-04-28-boudoir-...` | 2026-04-29, retry-counter cap landed; corpus draining | ASN-668..670, ASN-952 |
| **Emotion-corpus expansion** | `docs/research/emotion-corpus-expansion-2026-04.md` | 2026-04-28, museum-discovery CLI shipped; sourcing log open | ASN-930 |
| **Cross-source citation graph** | `factory_documents.bibtex_keys` planning; `docs/VISION-ATLAS.md` Layer-D | 2026-04-29, mapping table strategy queued | ASN-948, ASN-976 |

## Queued

Designed, scoped, or specified — not yet started. Filed in `docs/AGENT-ASSIGNMENTS.md`.

- **Methodology peer-review tier** — academic-grade companion to this v1 surface methodology. Not yet filed; flagged in the 2026-04-29 research-surface handoff as future work after a second thread reaches the depth bar.
- **Christianity-sex-shame audience-tier reviews (×3)** — peer-review, engineering, product framings of the literature-review + research notes. ASN-955.
- **Research surface — outside-reader Overview** — one-pager distinct from `RESEARCH-PROGRAM.md`. ASN-957.
- **Museum diversity-of-beauty — questions doc** — bootstrap of the thread; three sub-questions framed; downstream analysis ASN follows. ASN-958.
- **Museum diversity sub-question (a) — actual analysis** — cross-museum corpus diversity; preregistration commits before analysis runs. ASN-981.
- **Pipeline auto-generation** — script reads from `AGENT-ASSIGNMENTS.md` + `git log` + `instrument-validation/` and regenerates this page. ASN-980.
- **Theological-coherence intervention** — RCT protocol frozen at `docs/research/protocols/theological-coherence-intervention-v0.1.md`; recruitment + IRB pending.
- **RQ-program proposed studies** — twelve research questions enumerated in `docs/RESEARCH-PROGRAM.md`; per-study designs queued at `docs/research/proposed-studies.md`.

## Blocked

Each blocker is named, with the assignment that would unblock it.

- **Adaptive engine — corpus thin on ratings.** Most active units carry zero human responses; the 2026-04-24 instrument-validation snapshot reports 1,263 of 1,325 active units at the 0.25 neutral-prior floor (95.3%). **Unblocks via**: ASN-567 (decomposition-seeding for zero-response units) plus ASN-576..581 (participant recruitment).
- **Test-retest stability not reportable.** `user_desire_profiles` stores only the latest version; no historical snapshots exist. **Unblocks via**: ASN-572 (`user_desire_profile_versions` table — deferred).
- **`experience_unit_relations` graph empty.** R8 redundancy-penalty design exists at code level but the cross-unit relation table has no rows. **Unblocks via**: ASN-08 / R8 (relation-graph build pass).
- **Boundary-rule schema mismatch.** Live `user_boundary_rules` uses `tag_value`; the R1 spec defines `rule_value` + `source_unit_id` + `strength`. Forward migration needed. **Unblocks via**: ASN-12.
- **Cross-thread peer-review framing premature.** The cross-thread `audience-tiers` slots in the portfolio manifest stay forthcoming until at least a second thread (text-aesthetic? Boudoir Studios?) reaches christianity-sex-shame depth.

## Recently completed

Last ~30 days. Each line resolves to a `git log` entry under `docs/research/**` or to a research-tagged ASN.

- **2026-04-29** — Research-surface alignment: methodology doc + this pipeline page committed; ASN-954/956 land; ASN-980/981 follow-ups filed (commits `c2183b7c4`, this commit; `a05ed50be`).
- **2026-04-29** — Path-B refactor: bundled-extraction with chapter caching shipped; entities + factor_model + narrative bundles validated against `multi-faceted-vs-dual-grade` probe data (ASN-689; commit `d6ca4c3bc`).
- **2026-04-28** — Factory ingest smoke test on Maslow source proves pipeline; surfaces three issues into ASN-664/665.
- **2026-04-28** — Extraction-quality report and PDF-extraction audit committed (ASN-946; `f1bcc1616`).
- **2026-04-28** — Acquisition list 2026-04-23 committed; emotion-corpus expansion runbook + museum-discovery CLI shipped (ASN-930; `be747e50a`).
- **2026-04-27** — Turbopuffer parity report committed; ASN-665 mid-bulk spot-check (3/3) confirms chunker holds under load (`144331350`).
- **2026-04-26..29** — Boudoir Studios discovery framework: Phase 1A (framework), Phase 1B-A (Google Places, 4,530 included rows), Phase 1B-B (Yelp, 9,336 studios, 289/290 calls), Phase 1C (cross-source dedup → reclassification → final inventory state) — ASN-669; multi-day commit thread.
- **2026-04-24** — Instrument-validation snapshot v0.2 written; engine v1 → v2 cutover; per-unit `score_computed` rows and run-scorer instrumentation landed (`docs/research/instrument-validation/2026-04-24.json`).
- **2026-04-24** — Downstream research strategy doc committed (`docs/research/downstream-strategy-2026-04-24.md`).
- **2026-04-23** — Christianity-sex-shame thread depth: public introduction, Augustine across his works, christianity reinterpretation pattern, christianity sex hangup, formal literature review, BibTeX, literature map (multi-day commit thread on `docs/research/papers/christianity-*` and `docs/research/christianity-*`).
- **2026-04-23** — Boudoir Studios Program proposal + literature review + paper outlines + methodology committed (`8633396eb`).
- **2026-04-22** — Magazine arc, corpus expansion, Mosaic pilot, intervention protocol committed (ASN-599..602; `de7d31793`).
- **2026-04-21** — Text-aesthetic thread: literature map + literature review + public introduction + AESTHEMOS amendment (ASN-594; `984753263`).
- **2026-04-20** — Thesis-readiness report — density-meter run on all 24 major theses (`b510185a3`).

## Coming soon

Next 1–2 weeks, in priority order.

1. **Manifest live for methodology + pipeline** on peopleanalyst.com/research/vela (this commit + manifest update at `peopleanalyst-site`).
2. **ASN-957 Overview + ASN-958 Museum-diversity bootstrap** — both slated for the next session pass; both small.
3. **ASN-955 Christianity-sex-shame three reviews** — substantive critical writing; its own session.
4. **ASN-665 bulk Vela ingest completion** — currently 117/274; full coverage feeds retrieval.
5. **Recruitment push** — the binding constraint on instrument validation, adaptive engine maturation, and any preregistered analysis.
