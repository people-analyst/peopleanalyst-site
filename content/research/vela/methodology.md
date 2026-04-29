---
title: "Methodology"
description: "How the Vela research program is conducted: instrument framing, adaptive measurement, dual-grade ingestion, and the standards reports inherit."
status: v1
publishedAt: 2026-04-29
authors: ["Mike West"]
featured: true
---

> **v1** — first standalone methodology surface. Subsequent revisions are expected as the engine, the corpus, and the validation cadence mature.

## 1. The instrument frame

Vela ships as a fine-art figurative platform. Beneath that surface, it is a measurement instrument. Participants encounter curated images one at a time, respond on a multi-signal channel — explicit rating, save, dwell, boundary flag, optional emotion tag — and the system accumulates a behavioural record that decomposes a single construct: **desire**, the forward-leaning impulse to remain with an image and seek more of its kind, distinguished from **preference**, the evaluative judgment that an image is good. Fine art is the substrate because the stimulus space is dense, culturally legible, and tractable to curate. The methods are general: the same architecture answers consumer-behaviour, aesthetic-measurement, and adaptive-measurement-design questions in any high-volume domain, and the engine is implemented to be domain-agnostic (`lib/reincarnation/`) so that swapping the stimulus class — clothing, fragrance, dating profiles, candidate photographs — leaves the instrument intact.

## 2. Adaptive measurement — RID/SID architecture

Vela uses an item-response architecture we refer to internally as **RID/SID**: each response is recorded against a stable **response-item descriptor** (the unit, its primary dimension, and its decomposition features) and a stable **subject-item descriptor** (the user's evolving desire profile). This separation is the design move that lets the corpus accumulate response across studies and across instrument iterations without confounding instrument change with subject change. When the desire-score formula is updated, prior responses can be re-scored against the new formula because they are anchored to the unit, not to a session-bound encoding.

The runtime engine (`docs/REINCARNATION.md`) implements this on three coupled mechanisms. **Per-unit `desire_score`** is computed from the multi-signal record as `Utility × SignalDiversity − RedundancyPenalty`, dimension-local: a unit's score in the *softness* dimension is independent of its score in *narrative*. **Pool movement** discretises the score into six tiers (`INFINITY → D → C → B → A → PURGATORY`) per dimension; movement is batch-only and threshold-gated, so within-session response never moves a unit. **User desire profiles** record per-dimension scores and per-period thresholds, and a separate `calibrated` mode (`/play`) administers fixed-multiset sessions for cross-arm comparability. The math is documented at code-level cross-reference in `docs/engine-room/01-math-spec.md`; this doc is the prose summary.

## 3. Dual-grade corpus ingestion

The text corpus that feeds retrieval and editorial uses a deliberate two-grade design (see the AGENTS.md "Corpus ingestion" rule and the comparison memo at `docs/research/multi-faceted-vs-dual-grade.md`). **Curator-grade passages** — approximately fifteen hand-labelled picks per source, tagged with theme, charge tier, and arc stage — feed the editorial Mosaic surface. **Research-bulk-grade chunks** — fifty to one hundred fifty paragraph-respecting passages of roughly five hundred words each — feed audit and retrieval against participant claims. The two grades coexist in `mosaic_passages`, distinguished by a `research-bulk-chunk` theme tag. Retrieval against a curator-only source produces a characteristic failure mode: top hits are unrelated but high-similarity, because the curator pass selects for editorial weight and the retrieval index needs ground. The case study at `docs/research/2026-04-23-christianity-sex-hangup.md` documents the failure and the fix; every source intended to be load-bearing for an audit or synthesis pass is run through `npm run ingest:dual` before any claim-retrieval is run against it.

## 4. Multi-initiative organisation

The program runs in parallel threads, each with its own literature review, BibTeX bibliography, and study queue, and each governed by the same shared methodology. Active threads as of this writing: a cross-thread RQ program (twelve research questions in `docs/RESEARCH-PROGRAM.md`), the **christianity-sex-shame** thread (literature review, three research notes, an intervention protocol), the **text-aesthetic** thread, the **Boudoir Studios Program** (a separate research-only initiative), the **artist studies** series (Warhol, Klimt, Schiele, Sargent), and a museum **diversity-of-beauty** thread in design. Threads do not share a write-up format; they share a corpus pipeline, a scoring engine, and a release standard.

## 5. Instrument validation

Instrument-validation snapshots are written to `docs/research/instrument-validation/` per volume. Each snapshot records score-distribution shape, response-count distribution, dimension coverage, split-half reliability where the corpus supports it, test-retest stability where historical profile snapshots exist, and the running status of declared open questions. The current snapshot (2026-04-24) reports neutral-prior dominance and split-half non-eligibility — both expected at present participant volume — and names the two recruitment assignments that move the corpus past the threshold. The cadence is per-volume, not per-week: snapshots are dated, checksummed, and treated as frozen analysis artifacts even when the live database has moved on.

## 6. Preregistration practice

Studies are preregistered before data collection. Preregistrations live at `docs/research/preregistrations/` (current: `study-01.md`, the recruited-cohort presentation-order RCT). Intervention protocols designed but not yet collecting live at `docs/research/protocols/` (current: `theological-coherence-intervention-v0.1.md`, an eight-week RCT with an active-comparison CBT arm and stratified randomisation across three traditions). The rule is that the design is frozen in version-controlled markdown before the first participant is enrolled. Subsequent versions update the file and increment the version stamp; the original is preserved in git.

## 7. Peer-review readiness standard

Reports inherit a documented standard. A **field-positioning literature review** must precede the empirical write-up — for cross-thread work and for each thread independently. A **replication footprint** — the data extraction script and the analysis script that produce the published numbers — is a closure requirement; if a result cannot be re-derived from the repository as of the published commit, the result is not yet a report. **LLM-assisted attribution and synthesis** are reported as a separate signal, never as load-bearing input: when a Claude model has generated or attributed a claim, the report names the model and prompt and treats the output as a candidate for verification, not as evidence.
