---
title: "Research Pipeline — Status"
description: "What's running, queued, blocked, and recently completed across the Vela research program."
status: v2-auto
publishedAt: 2026-05-05
generatedBy: scripts/research/report-pipeline-status.ts
---

> **DO NOT EDIT BY HAND.** Auto-generated 2026-05-05T09:51:37.261Z by `scripts/research/report-pipeline-status.ts` (ASN-980). Re-run with `npm run research:status`. Edits made directly will be overwritten on the next regen. To change content, edit the underlying signal: `docs/AGENT-ASSIGNMENTS.md` (ASN status), `docs/research/instrument-validation/` (snapshots), `docs/research/ingest-batches/` (corpus absorption).

## In progress

- **ASN-456** `treatment_runs` persistence — every run becomes a real row _(claimed)_
- **ASN-459** Gallery detail view + curator actions _(claimed)_
- **ASN-460** Suitability learning loop — curator verdicts → treatment ranking _(claimed)_
- **ASN-461** Baldwin BIBLE — canonical character profile (Biographic Player pilot) _(claimed)_
- **ASN-590** Penwright `/penwright/[track]` — memoir workspace fork of the guide-editor _(in_progress)_
- **ASN-476** Coincidence Finder — cross-tag query surface for emergent insight _(claimed)_
- **ASN-467** Book inbox inventory + type classification (overnight triage prep) _(claimed)_
- **ASN-632** `/labs` migration — narrow the main app, stage experiments honestly _(claimed)_
- **ASN-668** Boudoir Research — proposal, literature review, and paper outlines _(claimed)_
- **ASN-1207** Western canon spine — discovery + four-axes mapping pass _(in_progress)_
- **ASN-250** Book triage + extraction batch — Mosaic source library acquisition _(partial)_
- **ASN-669** Boudoir Research — studio discovery and canonical inventory _(partial)_
- **ASN-1037** Erotic Writing Corpus — canonical-literary tier acquisition (60-100 works) _(partial)_
- **ASN-1057** Shadow-library fetch reliability — detail-page hop or md5 direct API _(partial)_

## Queued

- **ASN-967** Virtual Docent — corpus validation script
- **ASN-968** Virtual Docent — toolbar badge when active tab matches corpus
- **ASN-586** Subject-LoRA sourcing — commissioned shoots + artist-direct licensing
- **ASN-306** Warhol — research & licensable-asset audit (foundation)
- **ASN-316** Schiele — research & licensable-asset audit
- **ASN-356** Cross-arc preference synthesis in photographer briefs
- **ASN-366** Cross-corpus entity extraction + knowledge graph
- **ASN-601** Mosaic pilot — three testimony-plus-research pieces
- **ASN-609** P6 — Registry migration: `book-sources.ts` → `mosaic_sources` rows
- **ASN-612** P6b — Consumer refactor: read sources from `mosaic_sources` DB instead of TS files
- **ASN-426** Batch extraction — desire-science cluster
- **ASN-427** Batch extraction — body-shame memoir cluster
- **ASN-431** Research backlog — target books / documentaries / reports / people
- **ASN-603** Library views — proprietary filter + global review queue
- **ASN-634** Extend pipeline to museum / licensed sources — derive variants from canon
- **ASN-663** `/admin/factory-corpus` — Capabilities tab
- **ASN-667** `/admin/factory-corpus` — Capabilities tab
- **ASN-673** Boudoir Research — image cluster study (Phase 2, contingent)
- **ASN-674** Boudoir Research — Vela magazine + PA showcase article suite
- **ASN-955** Christianity-sex-shame thread — three audience-tier reviews
- **ASN-956** Research pipeline status doc
- **ASN-959** Mosaic admin — Flag gap → Coverage Gap Essay (passage / piece context)
- **ASN-960** Acquisition queue — "Filled by Coverage Gap Essay" loop-back (ASN-707 / ASN-709)
- **ASN-961** Atlas coverage — thin-section gap flag (briefing_coverage_log)
- **ASN-975** Topic constellation v1 — extend to work + learning axes
- **ASN-976** Topic constellation v1 — anchor → source-profile cross-links (Layer-D bridge)
- **ASN-981** Museum diversity sub-question (a) — analysis
- **ASN-983** Penwright emotion panel — "what you've connected to" tab (gated on ASN-934)
- **ASN-999** Reincarnation caller for the analytics player MVP
- **ASN-1002** Performix repo bootstrap + `lib/research-client.ts` MVP
- **ASN-1008** Meta-Factory Track D — research-ingest migration (Vela → meta-factory)
- **ASN-1009** Meta-Factory Track D — research-ingest public API contract
- **ASN-1010** Meta-Factory Track E — Vela rewires to consume `@vela/factory/research-ingest`
- **ASN-1036** Erotic Writing — codebook v1 finalization + analyzer schema lock
- **ASN-1038** Erotic Writing Corpus — online-corpora tier (AO3 + Literotica + Reddit erotica)
- **ASN-1039** Erotic Writing Analyzer — Haiku coder against codebook v1
- **ASN-1040** Erotic Writing — frozen analysis dataset + statistical pre-analysis
- **ASN-1041** Erotic Writing — Paper A (diachronic + producer-axis findings)
- **ASN-1042** Erotic Writing — Paper B (audience-target × orientation; AO3-vs-canonical wedge)
- **ASN-1043** Erotic Writing — Vela magazine essay suite (4-6 pieces)
- **ASN-1044** Erotic Writing — Penwright integration (literary-erotica voice samples)
- **ASN-1045** Erotic Writing — Mosaic integration (testimony layer)
- **ASN-1070** Compass — first chain wired end-to-end (developmental theology pilot)
- **ASN-1072** Compass — third Vela chain ("emotional regulation")
- **ASN-1078** Compass — research-integrity layer (engine version freezing + export)
- **ASN-1090** Magazine — Why Writing the Body Works (and Why It Sometimes Doesn't) — trauma-writing methodology
- **ASN-1097** Penwright Claim Verification Panel — arc parent
- **ASN-1098** Schema — `loom_claims` + `loom_events` + track-registry genre flag
- **ASN-1184** Vela research — peer-review framing (audience tier)
- **ASN-1186** Vela research — product implications (audience tier)
- _… +15 more_

## Blocked

- **ASN-1101** `<ClaimVerificationPanel>` + integration into Penwright workspace
- **ASN-1102** Telemetry verification + `/admin/penwright/claims-pulse` lo-fi dashboard
- **ASN-1104** Retrieval at scale — Turbopuffer property_id filter + pgvector statement-timeout fix

## Recently shipped (last 30 days)

- `2026-05-05` `cd3182fa2` docs(handoff): file ASN-1211/1212 follow-ups + session handoff
- `2026-05-04` `09d19750c` feat(asn-980): auto-generate docs/research/PIPELINE_STATUS.md from in-repo signals
- `2026-05-04` `fe0a4ae96` docs(asn-1037): flat .txt acquisition list — boil-down for library/AbeBooks runs
- `2026-05-02` `be62a06c6` ASN-1035: erotic-writing pilot corpus, IRR frame, codebook v1, κ tooling
- `2026-05-04` `5f3a9089d` docs(asn-1185): ship engineering critique audience-tier — 1,806 words
- `2026-05-04` `177bd788b` feat(emotion-taxonomy): Phase 4 — extend EMOTION_PRIMARY_OPTIONS to 42 + Phase 2.5 — fill remaining 15 per-emotion canon
- `2026-05-04` `ba2db973b` docs(emotion-research): file emotion thread (Phases 2+3) — public intro, lit map, bibliography, acquisition trackers
- `2026-05-03` `b1f5a8d05` docs(emotion-corpus): preserve 36-run deep-research bring-back + synthesis plan
- `2026-05-03` `0bc121df4` docs(compass + ingest-log): commit Wave-6 vision-doc reference + 2026-05-02 ingest log entries
- `2026-05-02` `2efd1ba15` ASN-1029: corpus acquisition DB, PD agent, admin + cron (#31)
- `2026-05-02` `c066e5c6e` ASN-672: boudoir-museum comparison runner and Paper A bundle (#23)
- `2026-05-02` `aa4159f27` ASN-1034: Erotic writing research program — proposal, lit review, methods, codebook v0, license posture (#33)
- `2026-05-02` `a59718783` ASN-958: Complete museum diversity bootstrap closure (#24)
- `2026-05-02` `3dbbbb723` ASN-1031 stragglers: 6 of 9 recovered via Calibre + bulk-chunk hotfix
- `2026-05-01` `7e984b560` corpus: ingest 6 Seagate-copied books + reconcile acquisition trackers
- `2026-05-01` `9d59ce0c8` ASN-1016 + ASN-671: n=30 stratified field-notes pass + fresh positioning histograms
- `2026-05-01` `60cbe35aa` emotion corpus: external deep-research prompts (ChatGPT/Claude/Gemini/Perplexity)
- `2026-04-30` `c896f5669` ASN-1014: passage emotion tagging pipeline (Haiku, cron, admin) (#15)
- `2026-04-30` `c21b46073` ASN-671: boudoir positioning Haiku instrument, migration, IRR helpers (#12)
- `2026-04-30` `6cab159ab` ASN-712: Atlas methodology paper scaffold + export-atlas-corpus script (#4)
- `2026-04-30` `47370e933` docs: revise DevPlane prompt + handoff after inspecting devplane/docs/research
- `2026-04-30` `58bea1a0d` docs: capture portfolio alignment prompts + session wrap handoff
- `2026-04-29` `14abe31e0` ASN-665: backfill commit_sha in DevPlane completion block
- `2026-04-29` `083e6930d` ASN-957 + ASN-958: Overview v1 + museum diversity-of-beauty bootstrap
- `2026-04-29` `5dc347e9a` ASN-661: Cron-pattern passage embedding backfill — RPC + per-item fallback + attempt counter

## Recent corpus absorption

- `2026-04-29` — `docs/research/ingest-batches/2026-04-29-vela-batch-1.md`
- `2026-04-29` — `docs/research/ingest-batches/2026-04-29-vela-batch-1-run.md`
- `2026-04-28` — `docs/research/ingest-batches/2026-04-28-vela-batch-1.md`

## Instrument validation cadence

Latest snapshot: `2026-04-24.json` (mtime 2026-04-24).

## Counts

- in_progress + partial: 14
- queued (open): 65
- blocked: 3
- complete (research-tagged total): 79
- total research-tagged ASNs in queue: 209
