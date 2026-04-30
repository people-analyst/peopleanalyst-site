# Principia — pipeline status

Hand-curated snapshot of running / queued / blocked / recently completed / coming soon. Updated when state changes.

**As of:** 2026-04-30

## Running

Nothing. Principia is at scaffold v1; the survey work has not started.

## Queued

- **First construct-family survey: engagement.** Tier 1, position 1 in `PROGRAM.md`. Blocked on `@measurement/core` schema extraction (see *Blocked* below). Survey scope: UWES, Gallup Q12, MEI, JES, plus the Kahn-tradition qualitative measurement work. The methodology proof-of-method.
- **Construct-family ordering re-confirmation.** The roadmap in `PROGRAM.md` is the v1 sequence. Before the engagement survey kicks off, the ordering should be re-confirmed against any external pull from the People Analytics Platform's Calculus, AnyComp, or Reincarnation work. ~one work session.
- **Initial database schema design (Postgres / Supabase).** Once `@measurement/core` lands, a queryable schema is defined for `Construct`, `Instrument`, `Item`, `Measure`, `Model`, `EffectSize`, `Publication`. Optimized for "find all r values between construct X and construct Y where N>100 and quality_grade ≥ B" queries. Estimated one to two work sessions once unblocked.
- **Verification-log surface.** A small admin/contributor surface showing every extracted row, its verification status, and links to the source paragraphs the verifier used. Required before the engagement survey ships, because the survey's published novelty-verification log is a load-bearing part of the methodology.

## Blocked

- **Schema extraction.** `@measurement/core` has not yet been extracted from meta-factory's `packages/core/`. Tracked as **ASN-1013** in vela's `docs/AGENT-ASSIGNMENTS.md` (filed alongside this scaffold). The extraction is part of the meta-factory consolidation drive (project_meta_factory_consolidation memory entry; `docs/META-FACTORY-CONSOLIDATION.md` visibility dashboard). Until it lands, all construct-family surveys produce drafts in markdown using meta-factory-aligned surrogate types.
- **Database build.** Blocked on schema extraction (above) — the queryable Postgres schema cannot meaningfully be designed until the canonical types are stable.
- **Sibling-app subscriptions.** Vela, the People Analytics Platform, the toolbox/hub, and meta-factory all eventually consume Principia via `@measurement/core`. None of those subscriptions can be wired until the package and the registry exist. Not blocking Principia's first survey work; blocking the integration work that follows.

## Recently completed

- **2026-04-30.** Scaffold v1 — repo initialized at `people-analyst/principia`; AGENTS.md, README.md, OVERVIEW.md, methodology.md, PROGRAM.md, this file, bibliography seed, literature map seed all landed. Registered as the sixth product on peopleanalyst.com/research. ASN-1013 filed in vela for the schema extraction.
- **2026-04-30.** Reconnaissance pass through meta-factory and people-analytics-toolbox completed; existing measurement schemas inventoried; gap list identified (publication metadata, effect-size table, item-level extensions, queryable database, evidence-base API).

## Coming soon

The 30 / 60 / 90 horizon, contingent on schema-extraction unblocking:

- **30 days post-unblock.** First construct-family survey (engagement) draft v1 in markdown — construct definition, instrument inventory (UWES + Q12 to start), reliability/validity evidence, novelty-verification pass for cited rows. Effect-size table populated for the 8–12 strongest predictor and outcome relations.
- **60 days post-unblock.** Engagement survey v1 frozen; second tier-1 family (job satisfaction) draft v1 underway. Database schema designed and migrations applied. Verification-log surface live (basic table view).
- **90 days post-unblock.** Three tier-1 families landed (engagement, job satisfaction, organizational commitment). Book introduction chapter draft. First external-reader pass on the methodology document — confirming the rubric, the verification log, and the construct-family ordering meet the standard the methodology section claims.

## Process notes

- Updates land in the same commit as the work that triggers them. A construct-family survey ship updates this file in the same push.
- "Blocked" status is honest about *what* is blocked. If a queued item is blocked on Mike's decision rather than on engineering, the blocker line names that.
- This file is read by the peopleanalyst.com research surface as the canonical pipeline status. Replacing it with vapor-state will surface immediately as a contradiction with the construct-family roadmap in `PROGRAM.md`.
