# Preregistration — Penwright Paper 7: Genre-Specific Effects of AI Writing Systems

**Study identifier:** `penwright-paper-07-genre-effects`
**Repository:** `people-analyst/peopleanalyst-site` (preregistration); `people-analyst/vela` (Penwright production system)
**Registration type:** OSF-style internal preregistration (upload-ready when external-operator pilot enrolls first cohort across genres)
**Version:** 1.0 — 2026-05-05 (pre-data; locked at first cross-genre pilot enrollment)
**Frozen at:** commit SHA recorded at OSF filing
**Companion preregistration:** `penwright-paper-05-dependency.md` (filed alongside; shares analytical infrastructure)
**Companion papers:** Paper 4 (Measurement Framework — operationalizes the indices); Paper 6 (Learning Loops — operationalizes loop discipline); Paper 3 (Authorship Packet Model — input shape); Paper 2 (Corpus Control — epistemic substrate)

---

## 1. Background

The genre-fork is the program's most architecturally consequential commitment and its most empirically vulnerable. The Penwright vision documents (`vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md` §6.3, §7) require that memoir, nonfiction, and fiction never collapse into a single skill model — copy, schema enums, prompts, and metrics each fork by genre rather than sharing a runtime parameter. The four-failure-mode veto (per Paper 4 §3) treats *ignoring genre differences* as a non-negotiable disqualifier. The kernel architecture (F-19) enforces the fork at the registry layer.

These commitments cost real engineering. They are justified *if* AI's effects on writing capability differ meaningfully across memoir / nonfiction / fiction. They are not justified — and would be over-engineering — if AI's effects collapse across genres. Paper 7 preregisters the test that adjudicates the question.

The headline hypothesis is genre-dependence of AI writing effects. The headline is **falsifiable**: if Paper 7's data shows that AI effects do not differ across genres on the indices the framework treats as load-bearing, the genre-fork is not justified at that layer (it may still be justified at adjacent layers — measurement, intervention design, voice preservation — but the program's load-bearing claim about genre-as-structural would not survive). The yes-world / no-world specification below is designed to be informative either way.

The study is **gated on the external-operator pilot accumulating writers across all three genres** — at minimum two writers per genre with 3+ months of data and ≥3 valid Constraint-Mode samples per writer. The preregistration is filed pre-data; data accumulation begins at first cross-genre enrollment and continues until the minimum cohort condition is met.

---

## 2. Research question (program link)

**Paper 7 in the twelve-paper Penwright Research Program.** Question: *Do AI-augmented-writing effects on capability development differ across memoir, nonfiction, and fiction at a magnitude that justifies the program's structural genre-fork commitment?*

The question is operationalized as a between-genre contrast on the genre-specific subcomponents of the Penwright Measurement Framework (per Paper 4 §2.2 — Expressive Skill is genre-forked at the dimension level; integration, originality, and metacognitive indicators have genre-specific components). The contrast pairs writers within and across genre cohorts, controlling for AI-utilization, loop-completion, and writer-level baselines.

---

## 3. Hypotheses

**H1 (primary).** The strength of the AI-utilization-vs-capability-transfer relationship (per Paper 5) differs across the three genres at a magnitude meeting the pre-specified effect-size threshold (§5.3).

- *Yes-world consequence:* the genre-fork is structurally justified; the program's architectural commitment to never collapsing genre is empirically supported on the load-bearing dimension.
- *No-world consequence:* AI-utilization-vs-capability-transfer is statistically indistinguishable across genres, controlling for writer-level baselines. The genre-fork is not justified at this layer; the architecture may still be justified at others (per §6 below).

**H2a (memoir-specific).** AI utilization is associated with measurable decline in *emotional specificity* (the memoir-specific component of Expressive Skill, scored against the writer's pre-AI baseline) at a per-genre detection threshold larger than the equivalent decline in nonfiction or fiction.

- *Yes-world consequence:* the program's specific prediction that memoir is at risk for *emotional flattening* under AI is supported.
- *No-world consequence:* memoir's emotional specificity is no more vulnerable to AI utilization than other genres' equivalent dimensions; the prediction is wrong, the genre-specific intervention design needs revision.

**H2b (nonfiction-specific).** AI utilization is associated with measurable decline in *argumentative depth* (the nonfiction-specific component of Integrative Skill — argument-evidence linkage, counterposition engagement, conceptual precision) at a per-genre detection threshold larger than the equivalent decline in memoir or fiction.

- *Yes-world consequence:* the program's specific prediction that nonfiction is at risk for *shallow argument* under AI is supported.
- *No-world consequence:* nonfiction argumentative depth is no more vulnerable to AI utilization than other genres' equivalent dimensions; the prediction is wrong.

**H2c (fiction-specific).** AI utilization is associated with measurable decline in *narrative distinctiveness* (the fiction-specific component of Originality — sensory specificity, scene construction, character voice) at a per-genre detection threshold larger than the equivalent decline in memoir or nonfiction.

- *Yes-world consequence:* the program's specific prediction that fiction is at risk for *generic narrative* under AI is supported.
- *No-world consequence:* fiction narrative distinctiveness is no more vulnerable to AI utilization than other genres' equivalent dimensions; the prediction is wrong.

**H3 (intervention-genre interaction).** Intervention efficacy (per Paper 6 §3) varies across genres — the four intervention types (teach moments · constraint challenges · counterposition drills · reconstruction exercises) produce different effect magnitudes per genre on the genre-specific dimensions.

- *Yes-world consequence:* the kernel's genre-fork on intervention design is justified; cross-genre intervention reuse is not safe by default.
- *No-world consequence:* intervention efficacy does not vary by genre at the magnitude tested; the kernel can collapse intervention surfaces across genres without measurement loss.

**Exploratory (descriptive only, no preregistered tests).** Cross-genre writer-level effects (writers who work across multiple genres — does dependency in one transfer to capability in another?); within-genre subgenre effects (literary memoir vs. journalistic memoir; argument-driven vs. narrative-driven nonfiction; literary fiction vs. genre fiction).

---

## 4. Design summary

| Element | Specification |
|---|---|
| Setting | Continuous production-data observation; Penwright telemetry across the external-operator pilot cohort |
| Unit of observation | Writer-genre-week (writers may work across multiple genres; observations stratified per genre) |
| Unit of analysis (primary) | Writer-genre cell (writer × genre); random effects for writer; fixed effects for genre |
| Independent variables | AI-utilization composite (per Paper 5 §5.1); intervention-type exposure |
| Outcome (primary) | Genre-specific Expressive/Integrative/Originality components, scored against the writer's per-genre pre-AI baseline |
| Stratification | Genre (three-level fixed effect); analyses run separately per genre AND in pooled form with explicit genre-utilization interaction terms |
| Held constant | Penwright instrumentation; kernel version pinned per analytical window |
| Blinding | Analyst blinded to writer identity; expert raters blinded to writer identity, AI-utilization condition, and study hypothesis |

---

## 5. Operationalization

### 5.1 Per-genre outcome scoring

**Memoir (H2a):** Emotional specificity score per Constraint-Mode sample. Scored by ≥2 expert raters using a memoir-specific rubric covering: experiential grounding (concrete sensory anchoring of remembered moments); affective range (vocabulary specificity for emotional states); the felt-distinction between *describing an emotion* and *rendering an emotion*; resistance to interpretive over-articulation. ICC ≥ 0.7 required for inclusion.

**Nonfiction (H2b):** Argumentative depth score per Constraint-Mode sample. Scored by ≥2 expert raters using a nonfiction-specific rubric covering: argument-evidence linkage (each load-bearing claim traces to specific evidence); counterposition engagement (alternative readings articulated and addressed); conceptual precision (terms defined; distinctions held consistent); resistance to gestural assertion. ICC ≥ 0.7.

**Fiction (H2c):** Narrative distinctiveness score per Constraint-Mode sample. Scored by ≥2 expert raters using a fiction-specific rubric covering: sensory specificity (concrete particularity over generic description); scene construction (dramatic logic, beat structure, pacing); character voice distinctiveness (each speaker individuated); resistance to AI-default narrative shape. ICC ≥ 0.7.

The three rubrics share *structure* (multi-component scoring, expert raters, ICC threshold) but never share *content* — they are independently calibrated against genre-specific exemplars from the canon. Cross-genre rubric reuse is not permitted.

### 5.2 AI-utilization measure

Same composite as Paper 5 (§5.1) — retrieval engagement rate (0.4) + suggestion-acceptance ratio (0.4) + time-with-active-AI proportion (0.2). Z-scored within-genre for cross-writer comparability per genre.

### 5.3 Effect-size thresholds (pre-specified)

**H1 (primary):** Genre-fork is supported only if at least one pairwise genre contrast on the strength of the AI-utilization-transfer relationship reaches Cohen's *d* ≥ 0.6. Smaller cross-genre differences are reported descriptively; the genre-fork claim is not made on smaller effects.

**H2a-c (genre-specific):** Each genre-specific decline prediction is supported only if (a) within-genre decline magnitude reaches the writer-level effect-size threshold of *d* ≥ 0.5 against pre-AI baseline AND (b) the within-genre decline exceeds the equivalent within-other-genres declines by *d* ≥ 0.4.

**H3 (intervention-genre):** Intervention-genre interaction is supported only if at least one (intervention type × genre) cell shows efficacy that differs from the same intervention's pooled cross-genre efficacy by *d* ≥ 0.5.

These thresholds are pre-committed. The analysis cannot find smaller effects "supportive" of the hypotheses post-hoc.

---

## 6. Implications of falsification

The "no-world" outcome on H1 — AI effects are statistically indistinguishable across genres — has explicit consequences for the program's architecture. The implications are pre-stated to prevent post-hoc rationalization.

If H1 is not supported (no cross-genre difference at *d* ≥ 0.6 detected on the load-bearing dimensions): the genre-fork is not empirically justified at the dependency-and-capability-transfer layer. This does not necessarily falsify the genre-fork at all layers; the architecture may still be justified at:

- The *measurement* layer (different genres warrant different rubrics, regardless of whether AI effects differ — this is the rubric-validity question, not the dependency question)
- The *intervention design* layer (interventions may need genre-specific calibration to work, regardless of whether dependency mechanisms differ — this is H3)
- The *voice preservation* layer (Authorial-Voice may be measured differently per genre, regardless of whether AI utilization affects all genres equivalently)

But at the *core capability-development* layer — the level the program's longitudinal claim engages — the genre-fork would not be empirically supported. The program would owe the field an honest revision: drop the load-bearing genre-fork claim; retain the genre-fork at the measurement and intervention-design layers as engineering convenience rather than empirical necessity.

This commitment is the preregistration's most consequential pre-commitment. The program is committing, before data, to *abandoning a load-bearing architectural claim if the data doesn't support it*. The credibility of the entire research program rests in part on whether this commitment is honored when the data arrives.

---

## 7. Data sources

Same as Paper 5 (§6) — Penwright production telemetry, frozen analytical dataset per Parquet snapshot pinned to the preregistration's frozen-at SHA, expert-rater Constraint-Mode quality scores, consent and demographic records from the external-operator pilot.

Genre tagging is required at every session. Writers who do not declare a genre at session start cannot have their session contribute to genre-stratified analyses.

---

## 8. Inclusion and exclusion criteria

**Inclusion (analysis set):**

- External-operator pilot participants who have completed informed consent
- Minimum 3 months of Penwright usage data at lock-in
- Minimum 3 valid Constraint-Mode samples *in the relevant genre* (separate cohort per genre)
- At least two writers per genre at lock-in for the cross-genre contrast to be computable

**Exclusion (analysis set, preregistered):**

- The principal investigator's data is excluded from the primary analysis (auto-ethnography mitigation; reported descriptively in a separate appendix)
- Writers with fewer than 12 weeks of usage in the relevant genre are excluded from that genre's stratified analysis
- Writers who withdraw consent are removed entirely
- Sessions flagged as test/demo are excluded
- Mixed-genre sessions (writer working across genres in a single session) are excluded from primary analysis but retained for exploratory cross-genre analysis

**Cohort size for cross-genre contrast:** the H1 contrast requires ≥2 writers per genre at lock-in. Below this threshold, only descriptive within-genre reporting is delivered; the cross-genre contrast is deferred until the minimum is reached.

---

## 9. Sample size and power

**Target:** Minimum **N = 6 writers across genres** (2 per genre minimum) with 3+ months of data at primary analysis lock-in. Additional writers per genre improve precision but the minimum is non-negotiable for cross-genre contrast.

**Power justification (honest):** with N = 6 writers (2 per genre), the study is **substantially underpowered** for traditional NHST inference on cross-genre contrasts. The minimum detectable effect for H1 at this N is large (*d* ≥ 1.0 for confident detection); the *d* ≥ 0.6 threshold pre-specified in §5.3 is below the detection floor at minimum N.

**The honest framing (mirroring Paper 5):** Paper 7 v1.0 produces *descriptive evidence* about whether genre-specific effects are observable in the small pilot cohort and whether cross-genre differences, if any, are large enough to motivate a larger study. The paper does *not* deliver a confirmatory test of the genre-fork at the small-N v1.0 stage. Confirmatory inference is deferred to v2.0 once N ≥ 18 writers (6 per genre minimum) accumulates — estimated 18–24 months past first cross-genre enrollment.

**This is preregistered:** v1.0 reports descriptive-only with bounded-language conclusions; v2.0 (locked separately) runs confirmatory inference. The split prevents v1.0 from over-claiming on the genre-fork question.

---

## 10. Primary outcome and analysis plan (v1.0 — descriptive)

**v1.0 deliverable:** descriptive characterization of cross-genre effect-magnitude patterns in the small pilot cohort.

**Analytical procedure:**

1. **Per-writer-per-genre trajectory plots.** For each writer in each of their working genres, plot AI-utilization composite (x) against genre-specific Constraint-Mode score (y). Visual inspection for genre-specific decline patterns.
2. **Per-genre pooled visualization.** Aggregate writer-level data within each genre; loess smoothing with bootstrap 95% bands. Cross-genre overlay for visual comparison.
3. **Effect-size reporting per genre.** For each genre, report cohort-level central tendency of writer-within-genre Constraint-Mode change-from-baseline at the highest-utilization quartile vs. the lowest-utilization quartile, with bootstrap 95% CI.
4. **Cross-genre comparison.** Per-genre effect sizes presented side-by-side with pre-specified effect-size threshold (*d* ≥ 0.6) marked. The narrative criterion: "*pattern consistent with H1*" if at least one pairwise genre contrast meets or exceeds the threshold in the descriptive estimates.
5. **Per-prediction (H2a-c) reporting.** Memoir emotional-specificity decline, nonfiction argumentative-depth decline, fiction narrative-distinctiveness decline — each reported with its own effect-size estimate, against the pre-specified within-genre threshold (§5.3).
6. **Intervention-genre interaction (H3).** Visualized only at v1.0 N; no formal test.

**No NHST inference at v1.0.** Bayesian posterior intervals reported for change-from-baseline; the posterior is the descriptive summary.

**v2.0 (locked at N ≥ 18, 6 per genre):** mixed-effects regression with writer random effects, genre × utilization interaction terms, and pre-registered effect-size thresholds applied confirmatorily; Bonferroni correction across the three genre-specific predictions (H2a, H2b, H2c at corrected α = 0.0167).

---

## 11. Multiple-comparison strategy

**v1.0 descriptive only:** no formal correction (no NHST). Bounded-language conclusions only.

**v2.0 confirmatory (preregistered now for the future v2.0 lock):**

- Three genre-specific tests (H2a, H2b, H2c): Bonferroni correction at corrected α = 0.0167.
- Cross-genre H1 contrast: tested at α = 0.05 as the primary inference; confirmed under the pre-specified effect-size threshold (*d* ≥ 0.6) regardless of NHST result.
- H3 intervention-genre interaction: corrected within the four-intervention-type family at BH-FDR.
- Sensitivity analysis under alternative AI-utilization composite weightings (per Paper 5 §5.1): conclusions require concordance under primary weighting and at least one sensitivity weighting.
- Exploratory analyses: no formal correction; reported as exploratory and flagged in tables.

---

## 12. Stopping rules and ethics

Same as Paper 5 (§11). Cross-referenced via the shared external-operator pilot consent flow.

---

## 13. Threats to validity

**13.1 Auto-ethnography of the principal investigator.** Same as Paper 5 §12.1.

**13.2 Self-selection in the pilot cohort, with genre-specific bias.** *Threat:* writers who pilot Penwright self-select; cross-genre selection patterns may differ (e.g., memoir writers more or less likely to enroll than nonfiction writers). The cross-genre comparison may be confounded by who chose to pilot. *Mitigation:* recruitment targeting per genre balances enrollment; demographic and prior-experience reporting per genre cohort; cross-genre comparisons reported with per-genre cohort characteristics in the same table.

**13.3 LLM-scoring drift, with genre-asymmetric impact.** *Threat:* LLM-derived scoring may drift differently for different genres (the model's ability to score memoir's emotional specificity, nonfiction's argumentative depth, and fiction's narrative distinctiveness may not change uniformly across model versions). *Mitigation:* expert-rater Constraint-Mode scores are the load-bearing outcome (per §5.1); LLM-derived scores are secondary and version-pinned. Frozen evaluation samples per genre rotated at v2.0 lock-in.

**13.4 Genre-rubric construct validity.** *Threat:* the per-genre rubrics (§5.1) are pre-specified but not yet externally validated against established literary-craft criteria. *Mitigation:* rubric calibration pass against expert-rater consensus on genre-canonical exemplars before v1.0 lock-in. **Status: required pre-data; not yet shipped.**

**13.5 Cross-genre writer confound.** *Threat:* writers who work across multiple genres carry their cross-genre experience into each genre cell; their genre-cell observations are not independent across the cells. *Mitigation:* writer random effects in primary analysis; per-genre stratified analyses repeated on single-genre-only writer subset as sensitivity check; cross-genre writer effects reported separately as exploratory.

**13.6 Small-N detection-floor.** Same as Paper 5 §12.6. Particularly acute for cross-genre contrasts at minimum N.

**13.7 The "performative genre" problem.** *Threat:* writers may declare genre at session start without the session's actual writing matching the declared genre. The framework's commitment to genre context (per Paper 6 §3) depends on accurate genre tagging. *Mitigation:* periodic blinded expert-rater audit of session-genre concordance; writers whose declared-vs-actual match falls below 0.8 are flagged for review and may be excluded.

---

## 14. Deviations and amendments

Same policy as Paper 5 (§13). Coordinate amendments across the paired Paper 5 / Paper 7 preregistrations when changes affect shared analytical infrastructure.

---

## 15. OSF upload checklist

- [ ] Create OSF project "Penwright Paper 7 — Genre-Specific Effects of AI Writing Systems"
- [ ] Upload this markdown as a component
- [ ] Link frozen repo commit SHA after first cross-genre pilot-enrollment lock
- [ ] Register DOI per institutional policy
- [ ] Mirror in the program-level OSF collection alongside Paper 5 preregistration

---

*Companion artifacts in the AHI program:* `methodology.md` (program-wide methodology); `penwright-paper-04-measurement.md` (Paper 4 — Measurement Framework, the indices used here); `penwright-paper-06-learning-loops.md` (Paper 6 — loop architecture, intervention types tested in H3); `penwright-paper-05-dependency.md` (paired Paper 5 preregistration — shares analytical infrastructure); `peer-review.md` (audience-tier 1 — threats register source). Vision specs at `vela/docs/VISION-PENWRIGHT-MEASUREMENT.md` and `vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md` are the load-bearing internal sources.
