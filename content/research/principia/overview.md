# Principia — overview

Principia is a comprehensive, source-graded survey of organizational measurement — predominantly the people side of organizations. The output is two-shaped: a **book manuscript** and a **queryable database**. They are produced from the same underlying registry; the book is one rendering, the API is another, and anything else (a portfolio research surface, a printed reference, an SDK for builders) is a third.

## What it codifies

For each construct family Principia covers, the survey produces:

1. **The construct itself** — definition, theoretical lineage, measurement-model assumptions (reflective vs formative; unidimensional vs multidimensional; latent vs observed)
2. **Instrument inventory** — every instrument that has measured the construct, with item-level schemas (item text, response options, scale anchors, reverse-coding, scoring rules)
3. **Reliability and validity evidence** — per instrument, cited from the validation literature
4. **Effect-size table** — meta-analytic and primary-study links between this construct and its predictors and outcomes, with study-quality grades
5. **Cross-cultural notes** — where the construct travels, where it does not, what gets lost in translation
6. **Operational notes for builders** — how to use this construct in production research, common implementation pitfalls

## What it is not

- **Not original empirical research.** Original work happens in sibling apps (Vela, the People Analytics Platform, Fourth & Two) and feeds back into Principia where appropriate.
- **Not a textbook substitute.** Textbooks teach; Principia indexes. The targeted reader has read at least one psychometrics text already.
- **Not a meta-analysis service.** Where strong meta-analyses exist, Principia cites them; where they do not, Principia surfaces the gap and may file an analytical sub-study (see *Preregistrations*).
- **Not exhaustive on day one.** The construct-family roadmap (see `PROGRAM.md`) is sequenced; coverage compounds; the book ships when the spine is dense enough to stand on its own.

## Why this matters

Load-bearing measurement is unevenly distributed across organizations and disciplines. The same construct is measured five different ways across five different studies. Effect-size tables live in the chapters of one textbook and the appendices of another. High-quality instruments get reinvented in low-quality form because the original is paywalled or buried. Principia exists to give builders, researchers, and operators a single place to look — graded, sourced, queryable — and to give the People Analytics Platform a canonical measurement vocabulary it can subscribe to.

The portable claim: **the principal-issues thesis says every domain has a load-bearing measurement set, and most domains are stuck because they have not named it.** Principia names the measurement set for organizations. The methodology — source grading, statistical-metadata extraction into a shared schema, novelty verification before publication, queryable indexing — generalizes. The same shape would work for clinical psychology, educational measurement, marketing research, or any field where rigorous measurement is unevenly distributed across the working community.

## How it relates to the rest of the portfolio

Principia is one of three consumers of the eventual `@measurement/core` shared package — the canonical measurement vocabulary that meta-factory has already drafted in `packages/core/` and that the people-analytics-toolbox/hub will consume for its metric library work. The hub-and-spoke discipline:

- **`@measurement/core`** — canonical vocabulary (`Construct`, `Instrument`, `Item`, `Measure`, `Model`, `EffectSize`, `Publication`, `StudyQualityGrade`)
- **Principia** — the canonical registry (the rows; the surveyed construct families; the graded effect-size tables; the book draft as it accumulates)
- **People Analytics Platform / toolbox** — consumes the registry via `@measurement/core`-typed reads to power the metric library, AnyComp's compensation-fairness measurement, Calculus's metric definitions, and Reincarnation's adaptive-measurement work
- **Meta-factory** — continues to do book and paper extraction, populating Principia where it surfaces instrument-level evidence
- **Vela** — uses the registry to ground its adaptive-measurement and instrument-validation research

A sibling app that discovers a new instrument in the wild does not silently expand the shared schema; it files a Principia-side assignment to register the instrument. This is the same hub-and-spoke discipline the People Analytics Platform applies to anonymization, metric calculation, and segmentation. Consolidate once, consume many times.

## What's next

This is the v1 scaffold (2026-04-30). The construct-family surveys begin once `@measurement/core` is extracted from meta-factory and the queryable database schema lands. Schema extraction is tracked as **ASN-1013** in vela's meta-factory consolidation drive. First survey on the queue: **engagement** (the densest accumulated literature; serves as the methodology proof-of-method).

For the construct-family roadmap, see `PROGRAM.md`.
For methodology — source selection, grading, extraction, schema discipline — see `methodology.md`.
For current state, see `PIPELINE_STATUS.md`.
