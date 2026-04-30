# Research parity — follow-up trigger prompts for each property

## Why this file exists

`peopleanalyst.com/research` shows the research underneath every PeopleAnalyst property. Each property's surface is normalized against a **seven-slot baseline** so excellence parity is legible across the portfolio:

1. **Overview** — research program framing
2. **Methodology** — how this work is done
3. **Reports** — the actual findings (multiple files)
4. **Audience tiers** — same headline research, four framings: peer-review · engineering · general audience · product implications
5. **Bibliography** — `.bib` + literature map
6. **Preregistrations + protocols** — study designs filed before execution
7. **Pipeline** — what is running, what is queued

Where a slot is empty, the site shows it openly as "forthcoming" — visible gaps, not papered-over ones. Each property also surfaces a **Why this matters** paragraph (the extrapolation — what this research lets you understand outside the surface domain) and a featured **Read first** link to the general-audience explainer.

The strongest patterns in each repo (Vela's bibliography + preregistrations; Namesake's audience-tier reviews + phased reports) need to spread to the others. This file lists the gaps and gives you a paste-ready trigger prompt for an agent in each repo.

The peopleanalyst-site manifest lives at `/Users/mikewest/peopleanalyst-site/content/research/_manifest.ts` — every entry has a `status: "live" | "forthcoming"` field; flipping `forthcoming` to `live` (with a `source: { repo, path }`) is how new artifacts get pulled into the portfolio. After updates, run `npm run research:sync` from `/Users/mikewest/peopleanalyst-site`.

---

## Vela — `/Users/mikewest/vela`

**Strong:** Bibliography (3 `.bib` + 3 literature maps), papers/RQ briefs, preregistrations, multiple research initiatives (cross-thread RQ program, christianity-sex-shame, text-aesthetic, Boudoir Studios, artist studies).

**Gaps to fill:**
- No standalone Methodology document (currently embedded in literature reviews).
- Audience-tier reviews are only general-audience. Peer-review framing, engineering critique, and product implications missing for the most-developed thread.
- No focused Pipeline document — `RESEARCH-PROGRAM.md` mixes plan with state.
- No outside-reader Overview document.

### Trigger prompt — paste into Claude Code in `/Users/mikewest/vela`

```
CONTEXT
You are working on Vela's research surface. The Vela research program will be published at peopleanalyst.com/research/vela alongside Namesake, Fourth & Two, and the People Analytics Platform. The portfolio site uses a seven-slot baseline (Overview · Methodology · Reports · Audience-tiers · Bibliography · Preregistrations · Pipeline) and shows a "Why this matters" extrapolation per product plus a "Read first" general-audience explainer.

The portable claim for Vela research (the why-it-matters): figurative-art response on the surface, but underneath an instrument — how does desire (move-toward) separate from preference (like)? The methods generalize to consumer-behavior research, aesthetic measurement, taste calibration in any high-volume domain, and the design of adaptive measurement instruments outside HR.

Vela is strong on bibliography, multi-initiative research, and preregistrations. It is weak on (a) a standalone methodology doc, (b) full audience-tier coverage, (c) a focused pipeline doc, and (d) a one-page overview.

GOALS

File the following four assignments in docs/AGENT-ASSIGNMENTS.md (use `npm run asn:next` to allocate ASNs). Each is a real assignment with completion criteria.

ASSIGNMENT 1 — Methodology document
Write `docs/research/methodology.md` (~800 words). Cover: adaptive measurement under RID/SID, dual-grade corpus ingestion, instrument-validation standards, the multi-initiative organization (cross-thread RQ program · christianity-sex-shame · text-aesthetic · Boudoir Studios · artist studies), preregistration practice. Reader: a peer reviewer or hiring manager who needs to know whether to take the work seriously. Do not duplicate `multi-faceted-vs-dual-grade.md`; reference it.

ASSIGNMENT 2 — Audience-tier reviews for the christianity-sex-shame thread
The general-audience tier already exists (`papers/christianity-sex-shame-public-introduction.md`). Add three reviews of the headline thread, modeled on Namesake's `docs/research/reviews/` (located at `/Users/mikewest/Vibe Coding Projects/baby-namer/docs/research/reviews/`):
- `docs/research/reviews/christianity-sex-shame-academic-peer-review.md` — peer-review framing
- `docs/research/reviews/christianity-sex-shame-engineering-critique.md` — engineering reviewer's lens (instrument design, corpus, retrieval architecture)
- `docs/research/reviews/christianity-sex-shame-product-implications.md` — what this research tells us to build next on Vela

ASSIGNMENT 3 — Pipeline document
Write `docs/research/PIPELINE_STATUS.md` modeled on Namesake's `docs/research/PIPELINE_STATUS.md`. Sections: running, queued, blocked, recent completions. Short (~one page) and current. Distinct from RESEARCH-PROGRAM.md (which is the plan, not the state).

ASSIGNMENT 4 — Overview document
Write `docs/research/OVERVIEW.md` — one page, outside-reader. Frame the program: questions asked, methods used, why this matters beyond Vela, what's forthcoming. Avoid repeating internal-process detail; this is the elevator pitch.

ACCEPTANCE — for all four
- File created at the specified path
- Passes a quick read-through; no obvious gaps or placeholders left in
- Committed and pushed
- Manifest at `/Users/mikewest/peopleanalyst-site/content/research/_manifest.ts` updated to flip the corresponding entry from `forthcoming` to `live` with `source: { repo: "people-analyst/vela", path: "<your path>" }`
- `npm run research:sync` run from `/Users/mikewest/peopleanalyst-site` to verify the import lands

ASSIGNMENT 5 — Bootstrap the museum diversity-of-beauty thread
A research thread that has been discussed but not written up: how cultural and physical diversity of beauty is represented across the museum stacks Vela pulls from. Three sub-questions:
(a) museum-vs-museum — comparative corpus diversity across ARTIC, Met, BnF, Smithsonian, Europeana, Rijksmuseum
(b) museum vs. audience — how each museum's representation compares to the population in its primary serving location
(c) temporal change — using artwork dates to track how representation has shifted over time within each museum

Create:
- `docs/research/papers/museum-diversity-of-beauty-research-questions.md` — frame the three sub-questions formally, with operationalization notes (what counts as "diversity," which fields are usable, where data is missing)
- A note in `docs/RESEARCH-PROGRAM.md` adding this as an initiative so it shows up on the program map
- Add it to the proposed-studies file

This is bootstrap-only; the actual analysis is a separate, larger ASN. The goal here is to get the thread on the research map so it stops being invisible.

PRIORITY ORDER: Methodology > Pipeline > Overview > Audience-tier reviews > Museum diversity-of-beauty bootstrap. The first three unblock site shape; the audience-tier reviews are highest-craft and benefit from the methodology being final first; the museum-diversity bootstrap is a thread-starter, not the analysis itself.
```

---

## Namesake — `/Users/mikewest/Vibe Coding Projects/baby-namer`

**Strong:** Audience-tier reviews (full 4-tier set), 12 phased reports, methodology, pipeline status.

**Gaps to fill:**
- No bibliography. Vela has `.bib` + literature-map files per thread; Namesake should match the pattern at least for the cultural-diffusion thread.
- No formal preregistration document. `docs/research/PHD_STUDY_SPEC.md` is the design but not a frozen, time-stamped, hypotheses-named, analysis-plan-included preregistration.

### Trigger prompt — paste into Claude Code in `/Users/mikewest/Vibe Coding Projects/baby-namer`

```
CONTEXT
You are working on Namesake's research surface. The Namesake research program is published at peopleanalyst.com/research/namesake alongside Vela, Fourth & Two, and the People Analytics Platform. The portfolio site uses a seven-slot baseline (Overview · Methodology · Reports · Audience-tiers · Bibliography · Preregistrations · Pipeline) and shows a "Why this matters" extrapolation per product plus a "Read first" general-audience explainer.

The portable claim for Namesake research (the why-it-matters): names are the testbed, but the actual research is cultural diffusion — how cultural objects spread, what predicts breakouts, and where the predictability ceiling lives. Findings extrapolate to marketing, misinformation propagation, organizational innovation diffusion, fashion cycles, and public discourse waves. The implications travel.

Namesake is strong on audience-tier reviews (4 framings) and phased reports. It is weak on (a) bibliography — Vela has `.bib` + literature maps per thread; Namesake has none — and (b) a formal preregistration document — PHD_STUDY_SPEC is the design but is not a preregistration.

GOALS

File the following two assignments in docs/agent-assignments.md.

ASSIGNMENT 1 — Bibliography
Add two files for the cultural-diffusion thread:
- `docs/research/bibliography.bib` — BibTeX. Cover the cited literature in the existing reports (Hawkes processes, Bass diffusion, Granger causality, Moran's I, cultural-diffusion theory, naming literature, SSA-derived corpus methodology). Pull citations from the actual reports at `docs/research/reports/`.
- `docs/research/literature-map.md` — narrative map of the field; how the cited works fit together; what gaps Namesake's research fills.

Use Vela's pattern at `/Users/mikewest/vela/docs/research/bibliography.bib` and `/Users/mikewest/vela/docs/research/literature-map.md` as the structural model.

ASSIGNMENT 2 — Preregistration
Write `docs/research/preregistrations/cultural-diffusion-study-01.md`. Take PHD_STUDY_SPEC.md as raw material, but produce a formal preregistration: time-stamped frozen protocol, named hypotheses (H1, H2, H3...), data sources, analysis plan, exclusion criteria, deviations log section. Use Vela's `/Users/mikewest/vela/docs/research/preregistrations/study-01.md` as the structural model.

ACCEPTANCE
- Files created at the specified paths
- Bibliography is real (no fake citations); each entry traces back to something cited in `docs/research/reports/`
- Preregistration is signed and dated
- Committed and pushed
- Manifest at `/Users/mikewest/peopleanalyst-site/content/research/_manifest.ts` updated to flip the corresponding entries from `forthcoming` to `live` with `source: { repo: "people-analyst/baby-namer", path: "<your path>" }`
- `npm run research:sync` run from `/Users/mikewest/peopleanalyst-site` to verify the import lands

PRIORITY ORDER: Bibliography first (it's reference material — easier; unblocks one slot). Preregistration second (more deliberate work).
```

---

## Fourth & Two — repo location TBD

**State:** No research artifacts yet. All seven slots forthcoming.

**Anticipated arc:**
- Thread A: decisions under uncertainty in fantasy — Monte Carlo decision support, principal-issues-set framing
- Thread B: off-season game design as revenue innovation — extending the industry's revenue cycle past Week 17

### Trigger prompt — paste into Claude Code in the Fourth & Two repo

```
CONTEXT
You are bootstrapping Fourth & Two's research surface. The work will be published at peopleanalyst.com/research/fourth-and-two alongside Vela, Namesake, and the People Analytics Platform. The portfolio site uses a seven-slot baseline (Overview · Methodology · Reports · Audience-tiers · Bibliography · Preregistrations · Pipeline) and shows a "Why this matters" extrapolation per product plus a "Read first" general-audience explainer.

The portable claim for Fourth & Two research (the why-it-matters): decisions under uncertainty in fantasy football extrapolate to executive compensation modeling, medical-decision support, capital allocation, and public-policy tradeoffs — any domain where Monte Carlo plus structured information design beats single-point estimates. The off-season game design thread is itself a study in how to extend a niche industry's revenue cycle.

The two anticipated research threads:
- Thread A: decisions under uncertainty in fantasy. The Monte Carlo strategy engine + the principal-issues-set framing applied to fantasy decisions (lineup, waiver, fourth-down).
- Thread B: off-season game design as revenue innovation. The five side-game patterns (the-pick, the-matchup, survivor, drive-duel, fourth-down-gambit) studied as a coordinated revenue mechanism.

GOALS

Stand up `docs/research/` matching the parity baseline. Use Vela (`/Users/mikewest/vela/docs/research/`) and Namesake (`/Users/mikewest/Vibe Coding Projects/baby-namer/docs/research/`) as references — Vela is strong on bibliography + preregistrations + multi-initiative organization; Namesake is strong on audience-tier reviews + phased reports.

Create the following structure (initial drafts; iterate from there). Each file should be substantive enough to publish as v1 but flagged with editorial notes where it needs more work.

- `docs/research/OVERVIEW.md` — one-page, outside-reader. The two threads, why they matter beyond fantasy, what's coming.
- `docs/research/methodology.md` — Monte Carlo strategy engine as instrument; observational data from the MFL adapter; decision-quality outcomes; how the two threads fit together methodologically.
- `docs/research/reports/decisions-under-uncertainty.md` — Thread A first draft.
- `docs/research/reports/off-season-game-design.md` — Thread B first draft.
- `docs/research/reviews/general-audience-explainer.md` — public framing of the principal-issues-in-fantasy thesis.
- `docs/research/reviews/academic-peer-review.md` — peer-review framing (decision science under uncertainty literature).
- `docs/research/reviews/engineering-critique.md` — engineering reviewer's lens (Monte Carlo engine, simulation infrastructure, surrogate modeling).
- `docs/research/reviews/product-implications.md` — what this research tells us to build next.
- `docs/research/bibliography.bib` — BibTeX covering decision science under uncertainty, sports analytics, Monte Carlo simulation, fantasy economics literature.
- `docs/research/literature-map.md` — narrative map of the field.
- `docs/research/preregistrations/` — directory; add one preregistration scaffold (e.g., a forward decision-quality study).
- `docs/research/PIPELINE_STATUS.md` — running, queued, blocked, recent completions.

ACCEPTANCE
- All files created
- Each file substantive (not a placeholder); editorial notes where iteration is needed
- Committed and pushed
- Manifest at `/Users/mikewest/peopleanalyst-site/content/research/_manifest.ts` updated — flip the corresponding entries from `forthcoming` to `live` with the actual repo string and source paths
- `npm run research:sync` run from `/Users/mikewest/peopleanalyst-site` to verify imports

PRIORITY ORDER: Overview + general-audience-explainer first (they unlock the "Read first" entry point on the portfolio). Methodology + the two reports next. Bibliography + literature-map after. Preregistration + remaining audience-tier reviews last.
```

---

## People Analytics Platform — repo location TBD (people-analyst/people-analytics-toolbox or equivalent hub repo)

**State:** No research artifacts yet. All seven slots forthcoming.

**Anticipated arc:**
- Thread A: principal-issues thesis — load-bearing analytics, the Three A's, NAV, why most companies cannot do people analytics
- Thread B: hub-and-spoke as moat — architectural defensibility of a single-author people-analytics platform
- Thread C: RID/SID adaptive measurement — cross-study item-response accumulation without confounding

The principal-issues thesis is **already drafted** at `/Users/mikewest/Desktop/principal-issues-essay-draft-v3-2026-04-27.md` (Mike's draft 3). That essay is both the central-thread synthesis for the portfolio and the headline report for this property.

### Trigger prompt — paste into Claude Code in the PA Platform repo

```
CONTEXT
You are bootstrapping the research surface for the People Analytics Platform. The work will be published at peopleanalyst.com/research/pa-platform alongside Vela, Namesake, and Fourth & Two. The portfolio site uses a seven-slot baseline (Overview · Methodology · Reports · Audience-tiers · Bibliography · Preregistrations · Pipeline) and shows a "Why this matters" extrapolation per product plus a "Read first" general-audience explainer.

The portable claim (the why-it-matters): the principal-issues thesis is the methodological spine. It says every domain has a load-bearing measurement set, and most domains are stuck because they have not named it. People analytics is the demonstration; the same logic applies to any field where rigorous measurement is unevenly distributed across organizations. The platform exists to make load-bearing-set delivery executable at solo cadence.

The principal-issues thesis essay is already drafted at `/Users/mikewest/Desktop/principal-issues-essay-draft-v3-2026-04-27.md`. It explicitly synthesizes Vela / Namesake / Fourth & Two / NYT AIP+RSU / Mars Royal Canin under one methodological frame. It has a few open editorial gaps Mike will close (closing paragraph, CAMS thresholds confirmation, QMHR definition, title decision). Treat it as the centerpiece of this research surface.

The three anticipated research threads:
- Thread A: the principal-issues thesis (load-bearing analytics, Three A's, NAV, four-S synthesis, RCI as meta-framework)
- Thread B: hub-and-spoke as moat (architectural defensibility, lint-enforced platform/vertical boundaries, how solo cadence stays sustainable)
- Thread C: RID/SID adaptive measurement (cross-study item-response accumulation; the academic-grade outlier in the platform)

GOALS

Stand up `docs/research/` matching the parity baseline. Use Vela (`/Users/mikewest/vela/docs/research/`) and Namesake (`/Users/mikewest/Vibe Coding Projects/baby-namer/docs/research/`) as references.

Create the following structure. The principal-issues essay seeds Thread A — populate from Mike's draft and preserve editorial notes where he still has work to do.

- `docs/research/OVERVIEW.md` — one-page, outside-reader. The three threads, the load-bearing claim, why this is the spine of the portfolio.
- `docs/research/methodology.md` — measurement methodology (CAMS, NAV, RID/SID), study-design practice, the four-S synthesis as research discipline (Strategy + Science + Statistics + Systems).
- `docs/research/reports/principal-issues-thesis.md` — populate from `/Users/mikewest/Desktop/principal-issues-essay-draft-v3-2026-04-27.md`. Keep editorial flags (`[NEEDS MIKE: closing paragraph]`, `[NEEDS MIKE: CAMS thresholds]`, `[NEEDS MIKE: QMHR definition]`, `[NEEDS MIKE: title decision]`).
- `docs/research/reports/hub-and-spoke-as-moat.md` — first draft of the architectural-defensibility argument. Cite specific examples (Calculus precomputation, Conductor metadata-grounded codegen, Reincarnation RID/SID, Data Anonymizer deterministic-PII).
- `docs/research/reports/rid-sid-adaptive-measurement.md` — first draft of the cross-study item-response thesis. Note the publish-worthy character.
- `docs/research/reviews/general-audience-explainer.md` — public framing of the principal-issues thesis (most companies cannot do people analytics; here is what would actually work).
- `docs/research/reviews/academic-peer-review.md` — peer-review framing. Position against IRT, organizational measurement literature, decision-science under uncertainty.
- `docs/research/reviews/engineering-critique.md` — engineering reviewer's lens (hub-and-spoke architecture, lint-enforced boundaries, deterministic anonymization, materialized metric engine).
- `docs/research/reviews/product-implications.md` — what this research tells us to build next.
- `docs/research/bibliography.bib` — BibTeX covering people analytics, IRT, decision science under uncertainty, organizational science, Lean methodology, Kepner-Tregoe.
- `docs/research/literature-map.md` — narrative map.
- `docs/research/preregistrations/` — directory; add at least one preregistration scaffold.
- `docs/research/PIPELINE_STATUS.md` — running, queued, blocked, recent completions.

ACCEPTANCE
- All files created
- principal-issues-thesis.md is the populated draft, not a paraphrase. Mike's draft is the source.
- Committed and pushed
- Manifest at `/Users/mikewest/peopleanalyst-site/content/research/_manifest.ts` updated — flip the corresponding entries from `forthcoming` to `live` with the actual repo string and source paths
- `npm run research:sync` run from `/Users/mikewest/peopleanalyst-site` to verify imports

PRIORITY ORDER: Reports (principal-issues thesis first) + general-audience explainer + Overview together — these are the "Read first" path. Methodology next. Audience tiers + bibliography + preregistration last.
```

---

## After follow-ups land

Once any source repo populates a slot:

1. Update `content/research/_manifest.ts` — flip `status: "forthcoming"` to `"live"`, add `source: { repo, path }`.
2. Run `npm run research:sync` from `/Users/mikewest/peopleanalyst-site`.
3. Verify in dev at `http://localhost:3000/research`.
4. Commit when satisfied; push at a milestone.
