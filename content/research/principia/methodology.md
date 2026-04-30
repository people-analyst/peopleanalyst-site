# Principia — methodology

How the survey is conducted, what counts as evidence, and what the schema discipline requires.

## 1. Source selection

Principia draws from three tiers of sources, ordered by how much weight a citation carries:

1. **Primary peer-reviewed literature** — instrument-validation papers, meta-analyses, primary empirical studies. Default citation target. Citations point here even when a tertiary source first surfaced the work.
2. **Foundational books and edited handbooks** — when the primary literature is dispersed across decades and a recognized handbook synthesizes it (Hulin & Judge 2003 on job attitudes; Schmitt & Highhouse 2013 on industrial-organizational handbook). Cited as synthesis; does not substitute for primary lit on specific findings.
3. **Grey literature, technical reports, dissertations** — used as pointers and to surface forthcoming or hard-to-find evidence. Findings are not promoted into Principia's effect-size tables from grey lit alone; they require corroboration from tier 1 or 2.

Tertiary sources (textbooks, popular books, encyclopedia entries) are used to *navigate* the literature, never to ground a claim. When a tertiary source points to an effect, Principia traces the citation chain to the original and grades that.

## 2. Source-quality grading

Every cited study and instrument carries a quality grade. The grade is published alongside the citation; it is not a private annotation.

| Grade | Meaning |
|-------|---------|
| **A** | High-N, replicated, methodologically sound; preregistered or with clear analysis-plan transparency; multi-site or multi-population evidence |
| **B** | Solid single study; adequate N; standard methods; not yet replicated but no obvious threats |
| **C** | Methodologically caveated — small N, restricted population, single-site, or measurement issues that bear on interpretation |
| **D** | Pointer-only — used to surface a construct or instrument; not load-bearing for any claim Principia makes |

Grading is conservative. If the rubric admits two grades, take the lower. If a grade is uncertain, write a one-sentence rationale and use the lower; the rationale stays attached to the citation.

A construct survey may include grade-C and grade-D citations as part of completeness. The effect-size table promotes only A and B grades into headline numbers; C grades may appear as caveated rows; D grades do not appear in the effect-size table at all.

## 3. Statistical-metadata extraction

For each empirical study Principia cites in an effect-size table, a structured row is produced:

- `study_id` — Principia internal key
- `publication` — the canonical citation, with DOI or stable identifier
- `construct_a`, `construct_b` — the two constructs related (or `construct_a` and `outcome` for predictor-outcome relations)
- `effect_type` — `r` | `d` | `β` | `OR` | `η²` | `f²` | other (named explicitly)
- `effect_value`
- `ci_lower`, `ci_upper` — when reported
- `p_value` — when reported and meaningful (large-N studies often produce uninformative p-values; the column is documented but not load-bearing)
- `n` — total sample size
- `study_design` — e.g., `cross-sectional`, `longitudinal`, `experimental`, `quasi-experimental`, `meta-analysis`
- `population` — e.g., `working adults`, `nurses`, `university students`, `organizational leaders`
- `country_or_region` — for cross-cultural mapping
- `replication_status` — independent (pre-replication), replicated (with link), failed-to-replicate (with link)
- `quality_grade` — A | B | C | D
- `extraction_notes` — anything load-bearing the extractor surfaced (measurement-instrument used; covariates included; selection issues)

Extraction is AI-assisted with a novelty-verification step: the extracted row is checked against the cited paper before promotion. A row that cannot be verified is held in a `pending_verification` state and does not appear in any consumer of the registry.

## 4. Construct-family ordering

The construct-family roadmap is sequenced by *literature density* and *measurement-model maturity*, not by perceived organizational importance. Dense, mature literatures come first because they form the methodology proof-of-method and the spine of the eventual book.

Ordering principles:

1. **Foundational constructs first** — engagement, job satisfaction, organizational commitment, organizational climate. These have the densest literatures and the clearest measurement-model conventions.
2. **Derivative constructs second** — organizational justice, psychological safety, perceived organizational support. Ride on the foundational measurement scaffolding.
3. **Composite constructs third** — leadership, performance, organizational citizenship. Heterogeneous; require careful instrument-level disambiguation; benefit from foundational + derivative work being in place.
4. **Outcomes after antecedents** — turnover, withdrawal, burnout. Surveyed after the antecedent constructs are in place so the predictor-outcome rows have a target schema to land in.

The full ordering and rationale lives in `PROGRAM.md`.

## 5. Schema discipline

Principia consumes `@measurement/core` (currently being extracted from meta-factory's `packages/core/` per vela ASN-1013). The canonical types:

- **`Construct`** — a theoretical entity with name, alternate names, definition, measurement-model assumptions, classification, source citations
- **`Instrument`** — a survey, scale, or battery that measures one or more constructs; carries items, scoring rules, reliability and validity evidence, normative data
- **`Item`** — a single survey question; carries text, type, response options, scale anchors, reverse-coding flag, scoring contribution
- **`Measure`** — a scored output produced by applying an instrument's scoring rule to an item set
- **`Model`** — a theoretical or statistical model linking constructs (e.g., job-demands-resources; person-organization fit)
- **`EffectSize`** — a single study-level row in the effect-size table, with the columns enumerated above
- **`Publication`** — the citable source; authors, year, journal, DOI, study-quality grade
- **`StudyQualityGrade`** — `A` | `B` | `C` | `D`

Until `@measurement/core` lands, Principia's drafts use locally-typed surrogates that match the meta-factory schema names exactly. When the package is published, a single import-rewrite sweep replaces the surrogates.

A sibling app that needs a schema field Principia has not yet defined files a Principia-side assignment to add the field — never a silent local extension. The hub-and-spoke discipline only works if the canonical types are imported, not copied.

## 6. Versioning and snapshots

Each construct-family survey is a versioned artifact. v1 of *engagement* is frozen at a date and committed; future revisions create v2 (additive) or v2-breaking (when a measurement-model claim has to change because the literature moved). Consumers of the registry pin to a snapshot the way they pin a dependency version.

The book manuscript is rendered from the registry at a point in time; that point is named in the manuscript (e.g., "Principia 2027 edition, registry snapshot 2027-03-15"). Future editions re-render from a new snapshot.

## 7. Novelty verification

Every non-trivial claim — every effect-size row, every reliability statistic, every "the literature shows that…" — passes a novelty-verification step before promotion to the registry. The check: does the cited paper actually contain the claim? AI-assisted extraction is fast and lossy; a paper read produces extraction artifacts that look right and are not. The verification pass exists because the readers Principia needs to keep are exactly the readers who notice the first time it makes up a citation.

Verification is implemented as a paired second-pass: the extractor produces the row, a separate verifier reads the source and confirms the row's claims against the source text. Disagreements go to a queue that a human reviewer resolves. The verification log is part of the registry and is exposed to consumers (a row carries a `verification_status` and a link to the verifier's notes).

## 8. Author position

Principia is single-author (Mike West) with AI-assisted extraction and verification. The position is named because positionality matters for a synthesis work — what gets surveyed, what gets graded down, what enters the book is shaped by the author's judgment. The methodology is what makes the judgment legible: source grading is a public rubric; the verification log is a published artifact; the construct-family ordering is justified, not assumed; coverage gaps are surfaced, not hidden.

The aspiration, post-v1: open the registry to external contributions under the same grading and verification discipline. A peer-reviewed contribution model — "I want to add construct family X" — that produces externally-graded extensions to the registry. That is downstream; v1 is single-author so the methodology proof-of-method is unambiguous.

## 9. Threats to validity

Three honest risks:

- **Coverage bias.** What gets surveyed first shapes which construct families look mature. The mitigation is the published roadmap (`PROGRAM.md`) and the explicit "forthcoming" status on every un-covered family.
- **Extraction error.** AI-assisted extraction will produce wrong rows. The mitigation is the verification pass and the published verification log.
- **Author position.** Single-author judgment shapes inclusion. The mitigation is the published rubric for grading and the planned external-contribution model.

These are documented in every construct-family survey under a *threats and limitations* section. They are not hidden in a methodology footnote.
