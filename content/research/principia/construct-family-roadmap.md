# Principia — research program

The construct-family roadmap, sequenced by literature density and measurement-model maturity. This is what gets surveyed, in what order, and why.

## Three parallel threads

The work runs in three threads concurrently:

1. **Construct-family surveys** — the bulk of the work. One construct family at a time, end-to-end, before moving to the next.
2. **Infrastructure** — the queryable database (Postgres + API), the `@measurement/core` consumer wiring, the verification log surface, the book renderer.
3. **Book draft** — assembled from completed surveys. Each completed survey is a chapter draft; the introductory and synthesis chapters are written last.

The surveys lead. Infrastructure follows enough to support the surveys. The book trails — it is the last rendering, not the first deliverable.

## Construct-family roadmap

Sequenced by literature density and measurement-model maturity (see `methodology.md` §4 for the rationale).

### Tier 1 — foundational constructs (densest literatures)

| # | Family | Why first | Anchor instruments |
|---|--------|-----------|--------------------|
| 1 | **Engagement** | Densest accumulated literature; methodology proof-of-method. Three measurement traditions in tension (Schaufeli's UWES, Kahn's qualitative tradition, the practitioner-survey tradition) — surveying engagement is *itself* a methodology contribution. | UWES, Gallup Q12, MEI, JES |
| 2 | **Job satisfaction** | Long history; classic measurement-model debates (global vs facet; affective vs cognitive). | JDI, MSQ, JSS, Brief Index |
| 3 | **Organizational commitment** | Tripartite measurement model (Allen & Meyer affective/continuance/normative) is canonical and well-tested. | OCQ, TCM (Allen & Meyer) |
| 4 | **Organizational climate** | Multiple traditions (climate vs culture; specific climates: safety, service, innovation, justice). Survey clarifies the ontology. | OCDQ, Litwin & Stringer, climate-for-X variants |

### Tier 2 — derivative constructs (rest on tier 1 scaffolding)

| # | Family | Why second |
|---|--------|------------|
| 5 | **Organizational justice** | Distributive / procedural / interactional / informational measurement model is dense and well-validated. |
| 6 | **Psychological safety** | Edmondson 1999 onwards. Construct is dense; instruments cluster around a core. |
| 7 | **Perceived organizational support** | SPOS family. Tight literature; clean validation work. |
| 8 | **Work-related stress, strain, burnout** | MBI, OLBI, BAT. Construct boundaries against engagement matter — the survey adjudicates. |

### Tier 3 — composite constructs (heterogeneous, require disambiguation)

| # | Family | Why third |
|---|--------|------------|
| 9 | **Leadership** | Transformational, transactional, authentic, servant, ethical, charismatic — overlapping instruments, contested measurement-model assumptions. The survey provides the disambiguation. |
| 10 | **Performance** | Task / contextual / counterproductive / adaptive. Multi-source rating, behaviorally-anchored vs trait-rated debates. |
| 11 | **Organizational citizenship behavior (OCB)** | Heterogeneous taxonomy; overlap with contextual performance; survey clarifies. |

### Tier 4 — outcomes (covered after antecedents land)

| # | Family | Why fourth |
|---|--------|------------|
| 12 | **Turnover (intent and actual)** | Surveyed after antecedents are in place so the predictor-outcome rows have a target schema. |
| 13 | **Withdrawal behaviors** | Lateness, absenteeism, work-effort reduction. |
| 14 | **Counterproductive work behavior (CWB)** | Adjacent to performance and OCB; surveyed alongside them. |

### Tier 5 — adjacent / methodology

| # | Family | Why surveyed at all |
|---|--------|---------------------|
| 15 | **Psychological capital (PsyCap)** | Composite of hope, efficacy, resilience, optimism. Surveyed because the composite measurement model is itself a methodology case study. |
| 16 | **Person-environment fit family** | Person-job, person-organization, person-supervisor, person-group fit. The measurement model varies more than the literature acknowledges; surveying clarifies. |
| 17 | **Work design / job characteristics** | JDS, WDQ. Foundation for predictor variables in many of the above families. |

### Open / queued for sequencing decision

- Innovation, creativity at work
- Identification (organizational, occupational, team)
- Trust (organizational, supervisor, team)
- Voice and silence
- Workplace incivility, harassment, mistreatment
- Diversity climate and related workplace-experience constructs
- Compensation justice and pay-related attitudes (intersects directly with AnyComp on the People Analytics Platform)

## Per-family work-product

Every construct-family survey ships the same artifact:

1. **Construct definition + history** — what it is, where it came from, the measurement-model debates that shaped how it gets measured today
2. **Instrument inventory** — every instrument that has measured the construct, with item-level schemas (item text, response options, scale anchors, reverse-coding, scoring rules)
3. **Reliability / validity evidence** — per instrument, cited from the validation literature, source-graded
4. **Effect-size table** — the construct's predictors and outcomes, with study-quality grades, replication status, and population notes
5. **Cross-cultural notes** — where the construct travels, where it does not
6. **Operational notes for builders** — implementation pitfalls, common errors, instrument-choice guidance
7. **Threats and limitations** — coverage bias, extraction-error risk, author-position notes

The first survey (engagement) doubles as the methodology proof-of-method. Its threats-and-limitations section will be more elaborate than later surveys' because it documents the methodology's own first-pass mistakes.

## Sequencing constraints

Several construct families wait on `@measurement/core` extraction (vela ASN-1013) because their effect-size tables cannot land in a typed registry that does not yet exist. Until the package extracts, surveys produce drafts in markdown and `Construct` / `Instrument` / `Item` surrogates that match the meta-factory schema names; once `@measurement/core` lands, a single import-rewrite sweep migrates all surveys to canonical types.

The construct-family ordering is also subject to *external pull*. If the People Analytics Platform's Calculus or AnyComp work needs a specific construct surveyed before the foundational order would otherwise reach it, the construct-family ordering re-sequences. The roadmap is durable; it is not rigid.

## What this is not a roadmap for

- **Empirical research on these constructs.** Original research happens in Vela, the People Analytics Platform, and Fourth & Two. Principia surveys; the apps test.
- **Instrument creation.** Principia indexes existing instruments; it does not develop new ones. Where coverage gaps exist (Mike's adaptive-measurement work in Vela's Reincarnation engine is one example), Principia will register the new instrument once it has primary validation evidence.
- **Replication studies.** Principia surfaces replication status as a column in the effect-size table; it does not run replications. Replications are research-app work.

## Status

Tier 1 — engagement queued as the first survey, blocked on `@measurement/core` extraction. See `PIPELINE_STATUS.md`.
