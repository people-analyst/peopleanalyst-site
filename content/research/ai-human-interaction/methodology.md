# AI–Human Interaction — methodology

This page describes how the work is done — for the literature-review work that scaffolds the program, for the production-instrument work that generates the empirical dataset, and for the standards each report inherits.

---

## 1. Literature-mapping methodology

The 2026-05 program scaffold was generated through a **multi-LLM deep-research** approach with explicit synthesis discipline. The goal at this stage is *not* original empirical synthesis; it is field orientation dense enough to anchor the empirical work that follows.

### 1.1 Per-topic literature reviews

For each branch of the existing HAI field map (twelve branches; see `literature-map.md`) and each frontier zone (longitudinal · multi-party · long-context · personalization-calibration · cross-cultural · sociotechnical · failure-recovery), a structured deep-research prompt was issued to one or more frontier LLMs. The prompt was the same across runs: *produce a structured literature review with conceptual landscape, foundational texts, contemporary debates, primary case material, cross-cultural variants, suppressed alternatives, recommended chapter-level reads, and an honest "where you are uncertain" section.*

The 30 per-topic reviews currently in `sources/topic-reviews/` are the unedited outputs of this pass. They are **secondary literature** — not primary research — and they are tagged as such in the literature map.

### 1.2 Multi-LLM synthesis

For a subset of high-priority topics (currently six), the same prompt was run across 2–3 frontier LLMs and the outputs synthesized into a single document with explicit claim-status tagging:

- **A** — replicated by both source documents and supported by primary evidence
- **B** — contradicted across sources and excluded from the final synthesis
- **C** — plausible but not sufficiently verified
- **D** — unique to one source document but corroborated by primary evidence

Synthesis reports live in `sources/syntheses/` and surface points of LLM-convergence (highest confidence) and LLM-divergence (most editorially interesting — divergence often signals contested territory in the actual literature).

### 1.3 Discipline

- **Citation specificity required** — each prompt instructed the LLM to cite author + title + year + page or chapter where possible, and to flag uncertainty rather than fabricate.
- **Primary-source verification** for headline claims — the synthesis reports re-check substantive claims against publisher pages, official project pages, or accessible primary PDFs, and call out bibliographic errors explicitly (the stigmergic-coordination synthesis caught one such bibliographic error in a source review).
- **Disagreement is informative, not noise** — when LLM outputs diverge, that disagreement is preserved and surfaced rather than smoothed.
- **Cost discipline** — these are expensive runs; per-topic reviews are issued in priority order rather than as a single batch.

### 1.4 What this pass is not

- It is not original empirical synthesis. The synthesis reports do not run new analyses or extract new effect sizes; they triangulate across LLM-generated reviews against primary sources.
- It is not a meta-analysis. Where strong meta-analyses exist in the literature (Lee & See 2004 on trust calibration, Logg et al. on algorithm appreciation, Kahn et al. on engagement), the program cites them; it does not attempt to re-pool effect sizes across primary studies.
- It is not the substantive program. It is the field-orientation step that the empirical program (Track A — Loom) is built on.

---

## 2. Empirical-instrument methodology — Loom

The empirical track of the program is built on the *Loom* system shipped inside Vela — an authorship-development environment with built-in instrumentation. The instrumentation discipline matters: the program is constructed around a *production* system whose users are real authors, not laboratory subjects, and whose data is collected continuously, not in a discrete study window.

### 2.1 Instruments

- **Authorship Packets** — structured input units (intent · structure · key ideas · relevant passages · counterpositions) that replace freeform prompts. Packet structure itself is data — packet completeness and shape correlate with downstream output quality.
- **Corpus Control Layer** — writers select sources and influence weights. Corpus selection is logged, downstream output is attributed to source contributions, and side-by-side default-vs-curated comparisons are runnable.
- **Adaptive Authorship Control Kernel (F-19)** — central registry of measurement and intervention. Genre-aware (memoir / nonfiction / fiction); copy + schema enums + prompts + metrics fork by genre rather than collapsing into a single mode.
- **Practice Mode + Constraint Mode** — opt-in environments for independent-writing samples without AI scaffolding. Generates the no-AI baseline that capability transfer is measured against.
- **Reflection Layer** — structured prompts inviting the writer to articulate what worked, what didn't, and what to try next. Surfaces metacognitive engagement as measurable signal.

### 2.2 The Loom Measurement Framework

Detailed in companion document `vela/docs/VISION-LOOM-MEASUREMENT.md` (load-bearing for all measurement claims in the program).

- **Six skill dimensions** — argumentation · structure · voice · genre fit · revision · independence
- **Six derived indices** — Writing Quality · Independence · Integration · Metacognitive · Genre-Awareness · Authorial-Voice
- **Three measurement layers** — output (the writing itself) · process (the trajectory through Loom) · transfer (independent-writing baseline)
- **Five-step learning loop** — write → reflect → pattern-recognize → practice → re-attempt
- **Four failure modes the framework is engineered to avoid** (§13 of the measurement vision — non-negotiable veto):
  1. **Output-only optimization** — optimizing the framework toward output quality at the expense of capability development
  2. **Over-automation** — the framework substituting for the writer's judgment about their own development
  3. **Weak measurement** — accepting low-signal proxies because they are easy to capture
  4. **Ignoring genre differences** — collapsing memoir / nonfiction / fiction into a single skill model

### 2.3 Discipline

- **Pre-registered hypotheses** for empirical papers, with yes-world and no-world consequences specified before data collection.
- **Falsifiable, operationalized constructs** — every construct decomposed into a measurable index before being invoked in claims.
- **Genre-aware analysis required** — no claim is accepted that collapses memoir / nonfiction / fiction.
- **Acknowledged researcher position** — the principal investigator is also the system designer and a Loom user; this is auto-ethnography for descriptive work and an explicit threat-to-validity for causal claims, mitigated through external operators where claims require generalization.
- **Capability-transfer is the load-bearing test** — the longitudinal claim is *"better writer without Loom in 6 months,"* measured against an external baseline, not against in-system performance.

---

## 3. Standards reports inherit

Every report in this program is expected to inherit:

- **Honest gap-flagging** — what the report does not address and why
- **Source-attribution discipline** — verbatim quotes attributed; paraphrased claims attributed; LLM-synthesized text marked as such
- **Genre fork** for any claim about writing — separate analysis paths for memoir / nonfiction / fiction
- **Threats-to-validity register** — for any empirical claim, the threats considered and the mitigations attempted
- **Pre-vs-post-data discipline** — predictions written before analysis; exploratory findings labeled as such

---

## 4. What's next on methodology

- **OSF preregistration** — Paper 5 (dependency) and Paper 7 (genre) are the first candidates; protocols are in draft, formal filing follows once the analysis pipeline is built and a run-in period of data is collected.
- **External-operator pilot** — to mitigate the auto-ethnography threat, a pilot cohort of 5–10 external Loom users is needed before Paper 8's longitudinal claims can carry weight.
- **Reconciliation pass** — the framework names in `VISION-LOOM-MEASUREMENT.md` need to be reconciled against the F-19 control-kernel registry (vela ASN-1112).
