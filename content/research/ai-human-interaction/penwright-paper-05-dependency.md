# Preregistration — Penwright Paper 5: Dependency and Independence in AI-Assisted Writing

**Study identifier:** `penwright-paper-05-dependency`
**Repository:** `people-analyst/peopleanalyst-site` (preregistration); `people-analyst/vela` (Penwright production system)
**Registration type:** OSF-style internal preregistration (upload-ready when external-operator pilot enrolls first cohort)
**Version:** 1.0 — 2026-05-05 (pre-data; locked at first pilot enrollment)
**Frozen at:** commit SHA recorded at OSF filing
**Companion papers:** Paper 4 (Measurement Framework — operationalizes the indices used here); Paper 6 (Learning Loops — operationalizes the loop discipline this study analyzes); Paper 3 (Authorship Packet Model — operationalizes the input shape this study assumes)

---

## 1. Background

The dependency question is the empirical heart of the AI-augmented writing program. Most contemporary AI writing tools optimize against a productivity-and-fluency frame: more output, faster, with higher in-system quality. A growing body of cognate work in AI-assisted programming (Lee, Liang & Yang 2022) and in cognitive offloading more broadly (Risko & Gilbert 2016; Heersmink 2017) has documented that productivity gains can coincide with measurable declines in *independent* capability — the user becomes more productive within the AI-augmented environment and less capable outside it. The authorship analogue has been theorized (cf. Paper 1) but not yet measured in a structured production-data setting.

The Penwright Research Program treats the dependency question as a curve, not a binary: AI assistance plausibly *helps* capability development at moderate engagement levels (cognitive apprenticeship, scaffolded difficulty, structured feedback) and *harms* capability development above some threshold of utilization (passive acceptance, voice flattening, atrophy of independent composition). This study preregisters the contrast that locates the threshold — operationalized through Penwright's continuous production-data instrumentation against the framework specified in Paper 4.

The study is **gated on the external-operator pilot** (PA-009 in the program's assignment queue) because the principal investigator's own data — auto-ethnographic by design (cf. peer-review framing §4.1) — cannot defend the causal claim. The preregistration is filed pre-data; data accumulation begins at first external-operator enrollment and continues for at least six months before the primary analysis is locked.

---

## 2. Research question (program link)

**Paper 5 in the twelve-paper Penwright Research Program.** Question: *At what level of AI-assistance utilization does AI cease to support and begin to harm independent writing capability, as measured by capability transfer to no-AI (Constraint Mode) work?*

The question is operationalized as a threshold-detection contrast on the Independence Index (per Paper 4 §2.3) and on raw Constraint-Mode quality scores measured against the writer's pre-AI baseline. The contrast is genre-stratified across memoir / nonfiction / fiction per the program's non-negotiable genre-fork commitment.

---

## 3. Hypotheses

**H1 (primary).** Capability transfer to Constraint Mode (operationalized as the writer's Constraint-Mode quality score, measured against their study-entry baseline) shows a non-monotonic relationship with AI-utilization rate, with an inflection point at which higher AI-utilization predicts *lower* transfer.

- *Yes-world consequence:* the threshold is empirically detectable; Penwright's design recommendation that writers maintain moderate-not-high AI engagement is supported.
- *No-world consequence:* AI-utilization is monotonically associated with transfer (either positively or negatively) or has no detectable relationship; the threshold framing is wrong, and either "use AI more" or "use AI less" without threshold-aware nuance is the correct first-order recommendation.

**H2 (secondary, confirmatory).** The H1 inflection point differs across memoir / nonfiction / fiction.

- *Yes-world consequence:* genre-specific dependency thresholds; the Penwright kernel's genre-fork is functionally load-bearing for dependency management.
- *No-world consequence:* a single inflection point holds across genres; the genre-fork is not justified at the dependency layer (it may still be justified at other layers — measurement, intervention design — see Paper 7).

**H3 (secondary, confirmatory).** Loop-completion discipline (the per-session loop-completion rate from Paper 6) moderates the H1 relationship: writers with high loop-completion rates show *higher* transfer at any given AI-utilization level than writers with low loop-completion rates.

- *Yes-world consequence:* the loop architecture's claim that disciplined practice mitigates dependency is supported.
- *No-world consequence:* loop-completion does not moderate the AI-utilization-transfer relationship; the loop's value, if any, is at a layer this study does not measure.

**Exploratory (descriptive only, no preregistered tests).** Trajectory shapes of individual writers (writer-level dependency curves over time); patterns of dependency-vs-capability divergence in writers whose Constraint-Mode work declines while in-system quality improves.

---

## 4. Design summary

| Element | Specification |
|---|---|
| Setting | Continuous production-data observation; Penwright telemetry across the external-operator pilot cohort |
| Unit of observation | Writer-week (aggregating session-level events) |
| Unit of analysis (primary) | Writer (random effect); Constraint-Mode delta-from-baseline as outcome |
| Independent variable | AI-utilization composite (specified §5) |
| Moderator | Loop-completion rate (per Paper 6 §2) |
| Stratification | Genre (memoir / nonfiction / fiction); analyses run separately per genre and pooled with explicit interaction terms |
| Held constant | Penwright instrumentation; kernel version-pinned per analytical window |
| Blinding | Analyst blinded to writer identity at analysis time; cohort assignment is not blinded (no random assignment — observational within pilot cohort) |

---

## 5. Operationalization

### 5.1 AI-utilization composite

A writer's AI-utilization rate per writer-week is computed from the Penwright event-taxonomy (per VISION-PENWRIGHT-MEASUREMENT.md §6) as a weighted combination of:

- **Retrieval engagement rate** — `RETRIEVAL_REQUEST` events per session minute (writer-week mean)
- **Suggestion-acceptance ratio** — `PASSAGE_INSERTED` events / (`PASSAGE_INSERTED` + `PASSAGE_DISMISSED`) events
- **Time-with-active-AI proportion** — fraction of session time during which the AI surface was actively engaged (vs. independent-writing intervals)

Composite weighting is **pre-specified** at 0.4 / 0.4 / 0.2 (retrieval / acceptance / time), based on theoretical priority of suggestion-acceptance as the most directly capability-relevant indicator. Composite is z-scored within-genre for cross-writer comparability.

Sensitivity analysis: the primary test is repeated under two alternative weightings (equal 0.33/0.33/0.33 and acceptance-dominant 0.2/0.6/0.2) to verify the H1 inflection-point conclusion is not weighting-artifact. Conclusion is preregistered: H1 is supported only if it holds under the primary weighting AND at least one sensitivity weighting.

### 5.2 Capability transfer outcome

**Primary outcome:** Constraint-Mode quality score per writer-period (8-week aggregation), measured against the writer's study-entry baseline. *Constraint-Mode quality* is a composite of expert-rater scores on a periodic Constraint-Mode writing sample (one sample per 4 weeks per writer; rated against a genre-specific rubric by ≥2 expert raters; ICC ≥ 0.7 required for inclusion).

**Secondary outcome:** Independence Index slope (per Paper 4 §2.3) over the same window, computed from in-system performance metrics under Constraint-Mode-flagged sessions.

The expert-rater Constraint-Mode score is the load-bearing outcome; the Independence Index is the secondary because it is computed within the Penwright instrumentation (LLM-scored) and inherits the LLM-as-evidence drift threat (cf. peer-review framing §3.3). The expert-rater score is the higher-rigor anchor.

---

## 6. Data sources

**Primary data:** Penwright production telemetry, scope-locked per analytical window:

- `authorship_metric_snapshots` — derived indices per session
- `authorship.packet.*` — packet shape, completion, content
- `authorship.retrieval.*` (or equivalent canonical key per ASN-1112 reconciliation) — retrieval engagement
- `authorship.completion.*` — passage provenance, AI-suggestion acceptance/rejection
- `authorship.practice.*` and `authorship.deep_writing.*` — Constraint-Mode and Practice-Mode session boundaries
- `authorship.reflection.*` — reflection-prompt responses
- `authorship_intervention_events` — intervention triggering and completion

**Frozen analytical dataset:** Per-paper Parquet snapshot pinned to the preregistration's frozen-at SHA. The snapshot is taken at the analytical lock-in date and re-runnable indefinitely. This snapshot **must exist** before the primary analysis; if the snapshot pipeline has not shipped at lock-in time, the analysis is deferred and a deviation is logged.

**External data:** expert-rater Constraint-Mode quality scores; consent and demographic records from the external-operator pilot.

---

## 7. Inclusion and exclusion criteria

**Inclusion (analysis set):**

- External-operator pilot participants who have completed informed consent
- Minimum 3 months of Penwright usage data at lock-in
- Minimum 3 valid Constraint-Mode samples (one per 4 weeks across the 12-week minimum window)
- Loop-completion rate ≥ 0.4 (writers whose loop-completion rate is below 0.4 are analyzed in a separate exploratory cohort; the primary analysis is the loop-engaged cohort)

**Exclusion (analysis set, preregistered):**

- The principal investigator's data is excluded from the primary analysis (auto-ethnography mitigation; cf. peer-review framing §4.1). PI data is reported descriptively in a separate appendix as a methodological case study.
- Writers with fewer than 12 weeks of usage at lock-in are excluded from the primary analysis but reported in an exploratory appendix.
- Writers who withdraw consent at any point are removed entirely from the analysis set; their data is retained per recruitment-platform policy or deleted per their request.
- Sessions flagged as "test" or "demo" by the writer are excluded from telemetry aggregations.

**Genre attribution:** every session is genre-tagged at session start. Writers who work across multiple genres are included in each genre's stratified analysis; cross-genre writer-level effects are reported in the secondary analysis.

---

## 8. Sample size and power

**Target:** Minimum **N = 5 writers with 3+ months of data** at primary analysis lock-in, with ≥3 valid Constraint-Mode samples per writer. This is small.

**Power justification (honest):** with N = 5 writers and ~3-4 Constraint-Mode samples per writer, the study is **underpowered** for traditional null-hypothesis-significance-testing inference on individual contrasts. The minimum detectable effect for the primary inflection-point analysis at this N is large — Cohen's *d* of approximately 0.8–1.0 for the strongest specifications, depending on within-writer variance.

**The honest framing:** Paper 5 v1.0 produces *descriptive evidence* about whether the dependency curve is observable in the small pilot cohort and whether the effects, if any, are large enough to motivate a larger study. The paper does *not* deliver a confirmatory test of the threshold model at the small-N v1.0 stage. The confirmatory test is deferred to v2.0 of this preregistration once N ≥ 20 writers accumulates (estimated 12–18 months past first enrollment).

**This is preregistered:** v1.0 reports descriptive-only; v2.0 (locked separately) runs confirmatory inference. Splitting the preregistration prevents post-hoc inflation of v1.0 conclusions.

---

## 9. Primary outcome and analysis plan (v1.0 — descriptive)

**v1.0 deliverable:** descriptive characterization of the AI-utilization-vs-Constraint-Mode-quality relationship across the small pilot cohort, stratified by genre.

**Analytical procedure:**

1. **Per-writer trajectory plots.** For each writer, plot AI-utilization composite (x) against Constraint-Mode quality (y) over the analytical window. Visual inspection for inflection-point patterns.
2. **Per-genre pooled visualization.** Aggregate writer-level data within each genre; loess smoothing with bootstrap 95% bands for visualization. No formal threshold-detection test at v1.0 N.
3. **Effect-size reporting.** For each writer, report change-from-baseline in Constraint-Mode quality with bootstrap 95% CI; cohort-level central tendency reported descriptively, not inferentially.
4. **Loop-completion stratification.** Repeat (1)–(3) stratified by loop-completion rate (high vs. low, split at the cohort median).
5. **Pre-registered narrative criteria.** The paper concludes "*pattern consistent with H1*" if a majority of writers (≥60%) show within-writer Constraint-Mode quality decline at the highest-utilization quartile of their own data. Otherwise, "*pattern not consistent with H1*."

**No formal NHST inference at v1.0.** Bayesian posterior intervals reported for change-from-baseline; the posterior is the descriptive summary, not a test against zero.

**v2.0 (locked at N ≥ 20):** piecewise hierarchical regression with breakpoint estimation; Bonferroni correction across the three-genre analysis stack (corrected α = 0.05/3 = 0.0167); pre-specified effect-size threshold for "harm" detection at *d* = 0.5 against the highest-utilization-quartile vs. cohort-mean baseline contrast.

---

## 10. Multiple-comparison strategy

**v1.0 descriptive only:** no formal comparison correction (no NHST). The descriptive pattern is reported; the conclusion language is bounded.

**v2.0 confirmatory (preregistered now for the future v2.0 lock):**

- Three-genre stratified analyses: Bonferroni correction across the three primary tests (memoir / nonfiction / fiction), corrected α = 0.0167.
- Sensitivity analysis under alternative AI-utilization composite weightings (per §5.1): conclusions require concordance under the primary weighting AND at least one sensitivity weighting.
- Secondary tests (H2, H3): reported under Benjamini-Hochberg correction within each family.
- Exploratory analyses: no formal correction; reported as exploratory and flagged in tables.

---

## 11. Stopping rules and ethics

- Participants may withdraw at any time; partial data retained per recruitment-platform policy or deleted per the participant's request.
- No interim peeking for efficacy; the v1.0 analytical lock-in is the first formal analysis.
- The pilot's consent flow includes an explicit *capability-monitoring* clause: participants are informed that their writing-quality trajectory is being measured and will be reported in aggregate, with the option to receive their own trajectory data on request.
- IRB approval per the recruitment kit's institutional pathway (institution TBD as pilot recruits).

---

## 12. Threats to validity (per program standard)

**12.1 Auto-ethnography of the principal investigator.** *Threat:* PI's own data is the deepest available and the most contaminated. *Mitigation:* PI excluded from primary analysis; reported descriptively in a separate appendix.

**12.2 Self-selection in the pilot cohort.** *Threat:* writers who accept Penwright pilot enrollment self-select on dimensions the study cannot fully observe. *Mitigation:* recruitment-channel diversity per the pilot protocol (PA-009); demographic and prior-AI-tool-experience reporting in every results table.

**12.3 LLM-scoring drift.** *Threat:* indices that depend on LLM-derived scoring (Independence Index, components of Writing Quality) are vulnerable to model-version change over the analytical window. *Mitigation:* model version pinned per analytical window; frozen-evaluation samples scored periodically to detect drift; secondary analyses repeated under alternative scoring backbones at v2.0 lock-in. **Status: queued; required before v2.0 confirmatory inference.**

**12.4 Reflection-prompt social desirability.** *Threat:* writers' reflection-prompt responses may be contaminated by demand characteristics. The Metacognitive Index is downstream. *Mitigation:* triangulation with non-self-report indicators (retrieval depth, edit patterns); reflection-vs-behavior divergence analyzed as a marker of performative reflection.

**12.5 Constraint-Mode artifact.** *Threat:* writers may treat Constraint-Mode samples as performative challenges rather than capability tests, producing scores that don't reflect their typical no-AI work. *Mitigation:* expert-rater rubrics blinded to writer identity and to Penwright utilization; Constraint-Mode samples drawn from naturalistic contexts where possible (e.g., journal entries, freewriting tasks the writer was already doing) rather than artificial in-system prompts.

**12.6 Small-N and detection-floor.** *Threat:* the v1.0 cohort cannot detect modest effects. *Mitigation:* descriptive-only v1.0; confirmatory v2.0 deferred to N ≥ 20.

---

## 13. Deviations and amendments

Any change to: hypotheses, inclusion/exclusion criteria, AI-utilization composite weighting, analytical procedure, primary outcome, or sample-size targets after the v1.0 lock-in must be filed as a new version of this preregistration with a dated changelog row (OSF amendment pattern). The original v1.0 remains the canonical record of pre-data commitments.

The v2.0 confirmatory lock-in is itself an amendment but is preregistered now in §9 to prevent post-hoc inflation. The v2.0 file will be a separate document referencing this v1.0.

---

## 14. OSF upload checklist

- [ ] Create OSF project "Penwright Paper 5 — Dependency and Independence in AI-Assisted Writing"
- [ ] Upload this markdown as a component
- [ ] Link frozen repo commit SHA after first pilot-enrollment lock
- [ ] Register DOI per institutional policy
- [ ] Mirror in the program-level OSF collection alongside Paper 7 preregistration

---

*Companion artifacts in the AHI program:* `methodology.md` (program-wide methodology); `penwright-paper-04-measurement.md` (Paper 4 — Measurement Framework, the indices used here); `penwright-paper-06-learning-loops.md` (Paper 6 — the loop architecture this study analyzes); `penwright-paper-03-authorship-packet.md` (Paper 3 — input shape); `peer-review.md` (audience-tier 1 — threats register source). Vision specs at `vela/docs/VISION-PENWRIGHT-MEASUREMENT.md` and `vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md` are the load-bearing internal sources.
