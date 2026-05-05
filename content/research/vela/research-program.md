---
title: "The Vela Research Program — Overview"
description: "What Vela's research program is, what threads it runs, where its methods generalize, and how to read further."
status: v1
publishedAt: 2026-04-29
authors: ["Mike West"]
featured: true
---

> **v1 outside-reader one-pager.** Distinct from `RESEARCH-PROGRAM.md` (the internal twelve-RQ program plan); this page is the entry point for someone arriving cold.

## What Vela research is

Vela is a contemplative platform for fine-art figurative work. Beneath that surface, it is a measurement instrument. Every interaction — explicit rating, save, dwell, optional emotion tag, optional boundary flag — is recorded against a stable item descriptor and a stable subject descriptor, and the system accumulates a behavioural record that decomposes a single construct: **desire**, the forward-leaning impulse to remain with an image and seek more of its kind, distinguished from **preference**, the evaluative judgment that an image is good. Fine art is the testbed because the stimulus space is dense, culturally legible, and tractable to curate. The methods are general.

## What we are studying

The program runs as **parallel threads**, each with its own literature review, BibTeX bibliography, and study queue, and each governed by a shared methodology.

- **The RQ program** — twelve research questions across desire as a construct, the figurative feature model, temporal dynamics, individual differences, adaptive recommendation, computational aesthetics, and perceptual literacy. Specified in `docs/RESEARCH-PROGRAM.md`.
- **Christianity, sex, and shame** — historical and empirical synthesis on the Western Christian tradition's relationship to embodiment and sexuality, with a draft theological-coherence intervention protocol. Five published papers; literature review and BibTeX live.
- **Text-aesthetic** — the literature counterpart to the figurative thread: how do readers experience aesthetic response to *sentences*, and how does that map onto the visual instrument? Literature map + review + AESTHEMOS amendment published.
- **Emotion research program** — historiographic, ethnographic, and empirical synthesis on how named emotions do social work. Treats emotion-words as historically contingent vocabularies that make some experiences legible and others impossible. Five provisional research questions (EM.1..EM.5) covering emotion-naming over time, the constructionist/essentialist tension, cross-cultural translation, source-class density, and the editorial bar for honest emotional writing. Public introduction, literature map, and bibliography live; per-emotion canonical anchors populating from a 36-run external deep-research bring-back. Sibling thread, additive to the desire program.
- **Boudoir Studios Program** — research-only initiative on the contemporary boudoir-photography industry. Studio discovery + crawl + corpus of 9,336 studios across all 50 states; literature review, paper outlines, and methodology in place.
- **Artist studies** — recurring per-artist arcs (Warhol, Klimt, Schiele, Sargent), each producing methods notes, a placement gallery, an editorial essay, and (where applicable) AI method studies routed through the derivative pipeline.
- **Museum diversity of beauty** — comparative work on how the corpus of "beauty" curated by major museums varies across institutions, against local serving populations, and over time. Bootstrap thread; questions doc live, analysis queued.

The threads do not share a write-up format; they share a corpus pipeline, a scoring engine, and a release standard.

## How we study it

The full methodology lives at `docs/research/methodology.md`. In one paragraph: an item-response architecture (RID/SID) lets the corpus accumulate response across studies and instrument iterations without confounding subject change with instrument change; the text corpus that feeds retrieval and editorial uses a deliberate two-grade pattern (curator-grade for editorial, research-bulk-grade for audit and retrieval — see `docs/research/multi-faceted-vs-dual-grade.md`); preregistration is the rule, not the exception.

## What is published

Live entries on the research surface, organised by thread:

- **RQ program** — `rq1-desire-vs-preference`, `rq2-compositional-features`, `rq3-temporal-dynamics`, `rq4-individual-differences`; cross-thread `literature-review`; `desire-index-vol1-analysis`.
- **Christianity, sex, and shame** — `christianity-sex-shame-literature-review`, `christianity-sex-shame-public-introduction`, `christianity-sex-hangup`, `christianity-reinterpretation-pattern`, `augustine-across-his-works`; `theological-coherence-intervention-v0-1` protocol.
- **Text-aesthetic** — `text-aesthetic-literature-review`, `text-aesthetic-public-introduction`, `text-aesthetic-literature-map`, `text-aesthetic-bibliography-bibtex`.
- **Emotion research program** — `emotion-research-program-public-introduction`, `emotion-research-program-literature-map`, `emotion-research-program-bibliography` (BibTeX); 36-run external deep-research bring-back archive at `docs/research/emotion-corpus-expansion/external-runs/`; `emotion-corpus-expansion-2026-04` sourcing log.
- **Boudoir Studios Program** — `boudoir-studios-program-proposal`, `boudoir-studios-program-literature-review`, `boudoir-studios-program-paper-outlines`, `boudoir-studios-program-methodology`; crawl + inventory protocols.
- **Artist studies** — `warhol-methods`, `klimt-methods`, `schiele-methods`, `sargent-methods`.
- **Museum diversity of beauty** — `museum-diversity-of-beauty-research-questions` (this thread's bootstrap doc; the analysis is queued).
- **Cross-cutting** — `methodology`, `pipeline-status`, `multi-faceted-vs-dual-grade`, `emotion-corpus-expansion-2026-04`, `downstream-strategy-2026-04-24`, `thesis-readiness`, `proposed-studies`, `study-01` preregistration, `bibliography-bibtex`, `literature-map`.

## What is next

Live tracking lives at `docs/research/PIPELINE_STATUS.md`. In one sentence: bulk corpus ingest (ASN-665) finishes feeding retrieval; the museum-diversity sub-question (a) analysis runs against a preregistered protocol; recruitment scales the participant base past the neutral-prior corpus floor flagged in the 2026-04-24 instrument-validation snapshot.

## Where it generalizes

The instrument is general. The same architecture answers:

- **Consumer-behaviour research** — taste calibration in any high-volume domain (clothing, fragrance, dating-profile selection, candidate photographs, restaurant menus, music libraries) needs the desire/preference separation.
- **Aesthetic-measurement methodology** — replacing one-shot Likert with adaptive, profile-anchored measurement is a method change that earns evidence here and ports cleanly to typography, design, architecture, film.
- **Adaptive-measurement design outside HR** — the principal-issues thesis says every domain has a load-bearing measurement set; Vela operationalises that thesis on figurative response. Educational diagnostics, product research, attitudinal surveys, and mental-health screening all sit on the same architectural backbone.
- **Computational humanities** — the corpus-as-instrument frame ("a museum's collection is itself a measurement of cultural taste over time") is the museum-diversity thread's spine and applies to literary canons, film archives, and music libraries.

## How to read further

Start with the **Methodology** doc for the instrument frame, the **Pipeline status** for the current state, and any thread's **literature review** for field positioning. Correspondence: `mike@peopleanalyst.com`.
