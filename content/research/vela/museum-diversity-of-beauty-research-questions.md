---
title: "Museum diversity of beauty — research questions"
subtitle: "Bootstrap of the museum diversity-of-beauty thread. Three sub-questions on cross-institution variation, alignment with serving populations, and temporal change."
status: v1 — questions doc only; analysis is downstream
date: 2026-04-29
audience: Research surface — outline of the thread, not a study report
authors: ["Mike West"]
---

# Museum diversity of beauty — research questions

A museum's collection is a cumulative curatorial signal: acquisitions, gifts, deaccessions, and exhibitions shape what enters the public-facing corpus. Taken as text, **that corpus is itself a measurement of cultural taste over time** — whose images an institution selects, catalogs, labels, and shows to the visiting public or its digital equivalent. Within Vela's broader instrument frame (taste calibration and structured response elsewhere in the platform), treating *the curator* as respondent and *the collection* as an aggregated outcome lets us compare institutions the way we compare individual profiles: not morally, but descriptively. This bootstrap doc states questions only; analysis ships in downstream ASNs.

## Sub-question (a) — museum vs. museum

**How does the diversity of "beauty" represented vary across institutions?** Candidate feeders include Art Institute of Chicago, the Met, Bibliothèque nationale de France, Smithsonian Open Access, and Europeana; final inclusion is committed in protocol, not here. Operationalize diversity on four axes: **cultural representation** (region or culture of subject or artist); **physical representation** of figurative subjects (gender presentation, age band, visible race/ethnicity, readable body-type clusters); **temporal coverage** from **date of creation** (not acquisition — keep the distinction sharp); **medium** (oil, drawing, print, sculpture, photography, etc.). Indices such as Simpson, Shannon, or Jensen–Shannon, plus pairwise contrasts with corrected alpha, answer whether flagship corpora converge on a single "Western canon" shape or diverge in legible ways.

This sub-question is the most tractable: normalized plumbing exists via adapters under `scripts/artwork/sources/`. The missing piece is a **labeled-diversity overlay** at scale; LLM-vs-gold reliability is the headline limitation.

## Sub-question (b) — museum vs. its primary serving location

**For each museum, how does corpus diversity compare to the diversity of the population its building primarily serves** (metro / commuting region)? US institutions pair naturally with Census and American Community Survey tabulations at county or CBSA level; European sites with Eurostat and national equivalents. Expected output is a divergence map — which demographic dimensions diverge between collection and catchment population, magnitude, and direction. Caveats belong in the eventual methods note: trusteeship, diaspora audiences, deliberate international scope — a museum is not a demographic mirror.

Vela does not yet host population layers; **ingest is a separate assignment** from corpus labeling.

## Sub-question (c) — temporal change using artwork dates

**Using creation date**, how does represented diversity shift across time? Slice corpora into decades or half-centuries; compute the same diversity metrics per slice and per institution. Ask whether trajectories **converge** (similar modern profiles) or **diverge** (institutional specialties). Acquisition date matters for reading *when a choice was made*: creation date alone confounds catalog shape with historical production availability. Prefer analyses that can separate creation-era from acquisition-era once both fields are reliable.

## Methods sketch

A full run needs: (1) a **normalized cross-museum schema** — largely underway; (2) a **labeled-diversity overlay** for subject-level attributes — corpus build, not rhetorical; (3) optionally a **population-data layer** for sub-question (b). Preregister museums, sampling rule, labels, exclusions, and metrics **before** first comparisons (program "design before data" rule).

## What this thread is not

Not a polemic against museums; not a single-museum case study where the comparison is the point; not a pre-written answer. Sub-question (a) is queued as **ASN-981** with preregistration first; (b) and (c) wait on population ingest and richer date coverage respectively. Contact: `mike@peopleanalyst.com`.
