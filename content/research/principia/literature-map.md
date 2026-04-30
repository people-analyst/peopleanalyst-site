# Principia — literature map

A narrative orientation to the field Principia indexes. Three layers — measurement theory, construct-specific instrumentation, and meta-analytic accumulations — and where Principia sits among them.

## The three layers

### Layer 1 — measurement theory (the methodology field)

Classical Test Theory (Lord & Novick 1968), Generalizability Theory (Cronbach et al. 1972), and Item Response Theory (Lord 1980; Embretson & Reise 2000) are the methodological substrate. Reliability coefficients (Cronbach 1951; McDonald 1999), validity frameworks (Messick 1989; Kane 2013), measurement invariance across groups and time (Vandenberg & Lance 2000), and scale construction practice (Hinkin 1998; DeVellis 2017) sit on this substrate.

This layer tells us *how* a construct should be measured, what counts as adequate evidence for a measurement claim, and where measurement claims systematically fail.

### Layer 2 — construct-specific instrumentation (the surveyed field)

The bulk of the literature Principia indexes. For every construct family in `PROGRAM.md`, there is an instrument-development paper, a series of validation papers, eventually a meta-analytic accumulation, and a body of operational work in organizations and labs that uses (and sometimes extends or contests) the validated instruments.

Engagement has the UWES (Schaufeli et al. 2002, 2006) and the Gallup Q12 measurement program; commitment has Allen & Meyer's three-component model (Allen & Meyer 1990, 1991; Meyer & Herscovitch 2001); justice has Colquitt's measure (Colquitt 2001) operationalizing the four-factor distributive/procedural/interpersonal/informational model; psychological safety has Edmondson's seven-item team-level instrument (Edmondson 1999) that has spread far beyond its original team-level claim.

Each construct's instrumentation literature is dense, contested, and cumulative. The survey work in Principia is to make the contests legible, the cumulation traceable, and the operational guidance for builders sourced rather than received-wisdom.

### Layer 3 — meta-analytic accumulations (the synthesis field)

Where the construct-specific literature has been quantitatively synthesized — Hunter & Schmidt (2004) on psychometric meta-analysis as the methodology; Borenstein et al. (2009) on meta-analytic statistics; Cooper (2017) on the practice of synthesis. Construct-specific examples: Christian et al. (2011) on engagement; Riketta (2002) on commitment-performance; Colquitt et al. (2001) on the justice meta-analysis; Edmondson & Lei (2014) on psychological safety after fifteen years.

Where strong meta-analyses exist, Principia's effect-size table cites them as the anchor row. Where they do not, Principia surfaces the gap and may file an analytical sub-study (preregistered) to produce one. The discipline: meta-analyses are an *input* to Principia's synthesis layer, not a substitute for it.

## Where Principia sits

Principia is **the indexing layer between layer 2 and layer 3.** It is not measurement theory (it consumes that), not the construct-specific instrumentation literature (it surveys that), and not a meta-analysis service (it cites those when they exist; it surfaces gaps when they do not).

The portable contribution: a queryable, source-graded registry of all three layers, with the construct-family surveys as the unit of synthesis and the effect-size table as the operational output. Builders, researchers, and practitioners who today bounce across handbook chapters, meta-analyses, original instrument-validation papers, and review articles can land in one place — graded, sourced, and current — and find what the literature actually says, in a form they can interrogate.

## What Principia adds that does not exist today

Three things, none of them currently available in any single artifact:

1. **Source-graded effect-size tables across constructs**, queryable. Where most existing references freeze a snapshot at publication date and lose currency immediately, Principia versions and snapshots its rows; consumers pin to a snapshot the way they pin a dependency.
2. **Item-level instrument schemas with reverse-coding, scale anchors, and scoring rules surfaced as data, not prose.** A builder who needs to operationalize an instrument today reads a paper and transcribes by hand. Principia exposes the items as typed records.
3. **A canonical measurement vocabulary that other apps subscribe to.** `@measurement/core` is the schema spine; Principia is its registry; sibling apps consume both. Today, every app that needs a measurement layer (Vela's Reincarnation, the People Analytics Platform's Calculus, AnyComp's compensation-fairness measurement) re-implements its schema. Principia is the place where that gets consolidated once.

## Foundational references — see `bibliography.bib`

The bibliography seed covers measurement theory, scale construction practice, meta-analytic methodology, and the foundational instrument-development papers for the tier-1 construct families. Construct-specific bibliographies grow per-family inside each survey document; cross-cutting methodology references stay in `bibliography.bib`.

## Status

This map is the v1 narrative orientation. It is intended to be revised as the surveys land — what looks like a clean three-layer picture today may surface a fourth layer (e.g., a separate operational-research-on-instruments literature, or a domain-specific measurement-policy literature) once the engagement survey is complete and the methodology has met its first real construct-family.
