# Product implications — what Vela's research tells us to build next

*A product strategist's lens on the empirical record. What the findings to date imply for the next six months of build, where the roadmap is following data, and where it is making explicit bets ahead of evidence.*

— 2026-05-05

---

## 1. The state of the record, plainly

Vela's research instruments are in place; the empirical record they produce is uneven. The dual-grade corpus is live, the Reincarnation engine is shipped through Phase R8, telemetry records every consented response server-side, and four primary research questions have paper-stage scaffolds — RQ1 (desire vs. preference), RQ2 (compositional features), RQ3 (temporal dynamics), RQ4 (individual differences). Each scaffold is honest about the same thing: the corpus of *user responses* is below the thresholds the analyses require. The Phase 1 power floor is 50 users × ~20 responses each (1,000 responses); the live state shows one profile and 106 responses from a single user (`docs/REINCARNATION.md` §Status, 2026-04-20).

The engine is instrumented; the findings will not arrive until *enough people use it*. Every product implication below threads through that constraint. The question is not "what features should we build because the data told us to?" — there is not yet enough data to dictate features. The question is "what should we build next so that the data will tell us anything at all?" That is product strategy in service of an empirical engine, and it is its own discipline.

---

## 2. Implications anchored in the published scaffolds

### RQ1 — desire is operationalized as multi-signal; the player's signal capture is therefore load-bearing

**Empirical claim:** Desire is hypothesized to be statistically separable from liking via latent profile analysis on the multivariate response vector — rating, save, dwell, boundary flag, emotion tags, intensity (`docs/research/papers/rq1-desire-vs-preference.md` §Variables). H3 explicitly states that no formal claim of multiple classes can be made below the pre-registered floor of ~1,000 responses across ≥50 users.

**Implication:** The player's job is not just to entertain — it is to capture the multi-signal vector at every encounter, *cleanly*. Two of the six signals ride on a sheet that is opt-in, dismissible, and — per the player notes — `intensity` was removed from the inline form and now sits in schema-only limbo (`docs/PLAYER.md` §Follow-up TODOs). The published RQ1 scaffold names `intensity` as an LPA indicator. The product is not collecting an indicator the analysis is committed to using.

**Concrete action:** File an ASN to either (a) reintroduce a minimal intensity control on the optional sheet, (b) derive intensity server-side from rating + dwell + emotion-count, or (c) drop `intensity` from the RQ1 LPA pre-registration. Not deciding is the worst option — the schema gathers nulls, and the analysis silently loses a feature it was designed around.

### RQ2 — embodied compositional features matter at the response level; the decomposition schema is the instrument

**Empirical claim:** RQ2 hypothesizes that gaze, intimacy, light quality, and negative-space features predict desire-relevant outcomes (save, log dwell) more strongly than coarse style/medium tags. The analysis depends on the 45-field decomposition schema being trustworthy at field-level granularity (`docs/research/papers/rq2-compositional-features.md` §Methods; expert validation owed via RQ12).

**Implication:** Two product moves follow. First, RQ12 (expert validation of decomposition fields) has been parked because it requires recruiting 3–5 art historians for a structured annotation study. As long as RQ12 is parked, *every* RQ2 finding will be challenged at peer review on the question "how do you know your features mean what you say they mean?" The validation study is not optional polish — it is an unblock for any RQ2 paper. Second, the `experience_unit_relations` graph is described in `AGENTS.md` *Known issues* as sparse outside CLIP edges; the dense graph that would let us *quantify* feature-similarity at the unit-pair level is not populated.

**Concrete action:** Schedule the RQ12 expert validation study as a Q3 deliverable with explicit recruitment + IRB tracks. In parallel, file an ASN to populate `experience_unit_relations` with feature-level edges (gaze, intimacy, framing) so RQ2 can cross-reference findings against an actual graph rather than against ad-hoc joins.

### RQ3 — the within-session inverted-U shape is a designed product hypothesis, not just an analysis hypothesis

**Empirical claim:** RQ3 predicts a concave-down (warm-up → peak → fatigue) trajectory within sessions, with peak position predicted by sequence-engine role assignments — entry / build / shift / peak / release / ground (`docs/research/papers/rq3-temporal-dynamics.md` §Hypothesis H1, H2). The analysis requires `player_session_queue` to export *role per trial position*; the scaffold flags that this export path may not be wired (`§Methods`).

**Implication:** Sequence-engine role assignments are simultaneously a UX choice (how the editorial sequence paces) and an experimental condition (how the analysis attributes trajectory shape). If the export pipeline doesn't carry role per trial, the analysis collapses to time-only growth curves and *the role hypothesis cannot be tested*. The roadmap has been treating role assignment as background plumbing; RQ3 makes it the object of study.

**Concrete action:** Verify that `scripts/research/export-dataset.ts` selects `player_session_queue.role` per trial; if not, file an export-pipeline ASN before the next dataset freeze. The kind of small invisible block that, left unaddressed, kills a paper at submission.

### RQ4 — the eight desire dimensions are an engineering artifact; the product should treat them as hypotheses, not as truths

**Empirical claim:** RQ4 explicitly notes that the eight dimensions (softness, intensity, narrative, structure, texture, abstraction, classical, contemporary) are *system constructs, not user-facing labels* (`docs/research/papers/rq4-individual-differences.md` §Introduction prompt 2; §Limitations: "Dimensions are mathematically coupled through shared scoring code — factor structure may reflect engine design more than psyche"). Section §1.4 of the research program calls out that the engine's `CONFIDENCE_DENOMINATOR = 20`, the 0.7/0.3 pool-promotion thresholds, and the multiplicative `DesireScore` form are all engineering choices — not literature-derived (`docs/RESEARCH-PROGRAM.md` §1.4).

**Implication:** Two product surfaces are committed to a structure the research has not yet validated. `/your-path` (taste discovery, one of Vela's five core surfaces) renders the user's profile in dimension language. The calibration probes Compass Wave-1 is shipping (`docs/VISION-COMPASS.md`) borrow the same eight-dimension axis logic for written content. If RQ4's factor analysis collapses the eight dimensions to fewer factors — three or four with "soft–intense" and "classical–contemporary" as the dominant axes, say — then `/your-path` uses a vocabulary the data doesn't support and Compass pre-commits to it across a sister system.

**Concrete action:** Treat dimension-language touching user surfaces as provisional until RQ4 ships. Do *not* surface dimension scores to readers in Compass Wave-5 (`/your-compass`) before the RQ4 factor analysis has run, even on a small cohort. Internally the engine keeps the eight-dimension structure; externally, what the reader sees should be no narrower than what the data actually distinguishes. A "what we don't know yet" item with direct UI consequences.

---

## 3. Implications that cut across RQs

### Recruitment is the bottleneck; the study surface must move from research-affordance to first-class product

RQ1, RQ2, RQ3, and RQ4 all hit the same wall: not enough consented users with enough responses each. The current recruitment pathway is `/preferences` → Research Participation card → opt-in toggle. That is a *consent affordance*, not a recruitment instrument. The AGENTS.md *Main App Focus* section names "the study" as Vela's first of five committed-to-extraordinary-things, with Penwright + Prolific as the surface. The empirical engine will not yield findings until the study surface is treated with the same product seriousness as the player.

**Concrete action:** Prolific recruitment for calibrated mode — "give us 30 minutes, rate ~50 images, get compensated" — is the unblock for Phase 1 of every primary RQ. File as a Q2 deliverable: study URL, consent + compensation flow, pre-registered dataset target, OSF link for the export. Frictionless from the moment a Prolific worker lands.

### The decomposition schema is the methodological contribution; productize the *vocabulary*, not just the data

§1.4 of the research program makes the strongest novelty claim Vela can credibly defend: *no single prior paper spans Vela's feature breadth* in figurative decomposition. The 45-field schema is "Vela's primary methodological contribution." RQ11 (perceptual literacy) is built on the hypothesis that *exposure to the decomposition vocabulary changes what viewers attend to* — the schema is not just an annotation layer, it is potentially an educational instrument.

**Concrete action:** Unit profile pages (one of the five committed surfaces) should expose decomposition fields in reader-legible language — composed prose naming the gaze, the framing, the light quality, not raw JSON. Already partly in motion via "What Rembrandt Knew About Shadow"-style essays; the product move is to make decomposition-language a recurring affordance on every unit profile, with a measured before/after effect on subsequent ratings (RQ11's quasi-experiment runs against this exact data path). File as: unit-profile decomposition surfacing + RQ11 instrumentation, joined ASN.

### Compass needs to learn from Reincarnation's empirical posture, not just its math

Compass borrows Reincarnation's pool-and-profile architecture and applies it to written content (`docs/VISION-COMPASS.md` §Relationship to Reincarnation). What it must *also* borrow is the discipline of treating engine constants as engineering choices subject to validation, not as canonical values. Reincarnation v3 carries a documented gap between spec and runtime — boundary-rule schema mismatch (`AGENTS.md` *Known issues*), 0.7/0.3 pool thresholds undefended in the literature (`§1.4`), confidence-denominator-20 as an approximation rather than a derived value. Compass is currently shipping Wave-1 with its own equivalents — calibration probe weights, chain placement scorer thresholds, expected-impact-shape parameters — that will all need the same treatment.

**Concrete action:** Open a Compass equivalent of `docs/research/literature-map.md` §K ("Reincarnation — novelty, superiority, gaps") *before* Wave-2 ships. Document which Compass mechanisms are novel, which are derivative, and which constants are engineering choices that need empirical validation. The early discipline costs less than the retrofit. The Compass Wave-5 engine-version freezing (`docs/VISION-COMPASS.md` §Wave structure) is a good start but is not a substitute.

---

## 4. What we don't know yet — bets the roadmap is making, not findings

Five places where the product roadmap is committed to a direction that the research has not yet supported:

**The 25% exploration budget.** RQ6 (`docs/RESEARCH-PROGRAM.md` §II) explicitly hypothesizes that the current 25% exploration ratio is suboptimal and that the right value varies by profile maturity. The product ships 25% as the "balanced" default. We are betting it is approximately right; we have no evidence that it is.

**The pool ladder structure (INFINITY → D → C → B → A → PURGATORY).** Six discrete pools is an engineering choice. Three pools or eight pools might recover identical empirical behavior. There is no published comparison.

**The Reveal as a separate product surface.** RQ9 hypothesizes that gradual disclosure produces *higher* final ratings than sequential presentation. That hypothesis is not yet tested. The Reveal is parked in `/labs` partly for this reason — the product correctly recognizes the bet.

**Compass chains as developmental orderings.** The whole architecture of Compass assumes that articles can be ordered along developmental chains and that readers can be located on those chains via 5-point ratings + calibration probes. The construct is pre-empirical. The first reader cohort is the test.

**The eight desire dimensions as the right factor count.** Discussed above under RQ4. We are running with eight; the data may say four.

The honest framing: each of these is a deliberate bet, taken because shipping the bet is the only way to generate the evidence that would either confirm or correct it. The roadmap's job is not to avoid bets — it is to be clear-eyed about which decisions are bets versus which are findings. This document is the ledger.

---

*Companion artifacts:* `docs/research/reviews/peer-review-framing.md` (audience-tier 1, in flight); `docs/research/reviews/engineering-critique.md` (audience-tier 2, shipped 2026-05-04). Manifest entry `vela:product-implications` is the corresponding slot on `peopleanalyst.com/research/vela`.
