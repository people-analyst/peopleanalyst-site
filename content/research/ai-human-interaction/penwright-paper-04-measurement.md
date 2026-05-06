# Paper 4 — A Measurement Framework for AI-Augmented Writing Skill Development

*Tier-2 foundational paper of the Penwright Research Program. Operationalizes the measurement system that underwrites every subsequent empirical paper. Six skill dimensions, six derived indices, three measurement layers, a five-step learning loop, and four non-negotiable failure modes acting as veto conditions on every design decision.*

— 2026-05-05

---

## Abstract

The AI-augmented-writing literature has converged on a narrow set of measurement targets: output quality, output rate, and user satisfaction. None of these directly addresses what AI does to *the writer* — to argumentative skill, structural competence, voice distinctiveness, independence from the tool, or capability transfer outside the AI environment. We propose the **Penwright Measurement Framework**: a multi-dimensional measurement system explicitly designed to detect capability development rather than output fluency. The framework operates across three measurement layers (output · process · development), six skill dimensions (structural · expressive · integrative · originality · independence · metacognitive), six derived indices (Writing Quality · Independence · Integration · Originality · Metacognitive · Development Velocity), and a five-step learning loop (write · analyze · reflect · practice · re-measure). Four failure modes act as non-negotiable veto conditions: output-only optimization, over-automation, weak measurement, and ignoring genre differences. We position the framework against measurement theory (the reflective-vs-formative distinction; latent-vs-observed inference under continuous measurement and model drift) and against three established instrument families (HCI usability scales, educational skill assessments, standardized writing rubrics) — none of which is fit for purpose. We name what is measurable in v1, what awaits Wave-2-through-6 feature implementation, and what requires production data accumulation and external validation. The framework is instantiated in Penwright (an authorship system inside Vela's `app/labs/penwright/`); production data accumulates against the longitudinal capability claim — *better writer with Penwright, than without it, in six months.*

---

## 1. Introduction — what gets measured in AI-augmented writing today

The contemporary measurement surface in AI-augmented writing is narrow. Three things dominate.

**Output quality.** LLM-as-judge scoring, human-rater scales, AWE (automated writing evaluation) systems, comparison-to-reference metrics. The unit of measurement is the produced text. Output-quality measurement is well-developed; the literature is dense (Beigman Klebanov & Madnani 2020 give a recent survey of AWE; Liang, Yasunaga & Leskovec 2023 give a survey of LLM-as-judge methods).

**Output rate.** Words per session, sessions per week, tokens generated. Productivity-style metrics. The unit of measurement is the rate of output production. The HCI productivity literature on AI coding tools (e.g., Peng et al. 2023 on GitHub Copilot) is the cognate.

**User satisfaction.** SUS (System Usability Scale; Brooke 1996), NPS, retention curves, qualitative interview studies. The unit of measurement is the user's experience of the tool. The HCI usability tradition (Nielsen 1993; Sauro & Lewis 2016) is the foundation.

Each of these is well-developed. Together they describe AI writing tools comprehensively along three dimensions: *what gets produced*, *how fast*, and *how well-liked the tool is*.

None of them measures what AI does to the writer.

The gap is striking and becomes obvious as soon as it is named. A writer can produce higher-quality outputs faster, with high satisfaction, while *becoming a less capable writer* — because the writer is no longer practicing composition, no longer developing voice, no longer building structural competence, no longer engaging counterpositions. The output-quality metric will reward the trajectory; the output-rate metric will reward the trajectory; the satisfaction metric will reward the trajectory. Capability decline is invisible inside the existing measurement surface.

The cognate problem in AI-assisted programming has begun to surface: Lee, Liang & Yang (2022) and others have noted that productivity gains from AI coding tools coincide with measurable decline in independent problem-solving skill on novel tasks. The educational-psychology literature on cognitive offloading (Risko & Gilbert 2016; Heersmink 2017) has been making the analogous point about external memory aids for over a decade. Neither cognate has been fully transposed into AI-augmented writing measurement, where the failure mode is at least as plausible and the consequences for authorial development are at least as severe.

A measurement framework that addresses the gap has to do two things at once. First, it must specify *what to measure* — the skill dimensions, the indicators, the indices, the layers — with enough precision to support empirical claims. Second, it must specify *what not to measure* — the failure modes that would collapse the framework into a glorified output-quality scoreboard. The Penwright Measurement Framework attempts both.

The literature it positions against is sparse for the same reason the framework is needed: existing AI-augmented-skill measurement work is overwhelmingly in coding, where the failure modes have been more visible because the outputs are testable. Writing is harder to evaluate, the outputs less testable, the metric noise higher; the field has correspondingly under-engaged. That under-engagement is the opening this paper addresses.

---

## 2. The framework

### 2.1 Three measurement layers

Penwright separates measurement into three layers:

**Output Layer.** *What was written?* The produced text — drafts, revisions, completed pieces. Indicators: structural coherence, conceptual clarity, expressive specificity, integration quality, voice distinctiveness. This is the layer the existing AI-writing measurement literature has saturated. Penwright records it but does not optimize against it.

**Process Layer.** *How was it written?* The trajectory through Penwright — packet construction, retrieval interactions, edit patterns, time allocation, mode transitions (Practice vs. Constraint vs. default). Indicators: packet completeness, packet shape, retrieval-to-insertion ratios, revision depth, mode-utilization patterns. This is the layer the existing literature has barely touched, because pre-Penwright tools do not capture authorial process at this granularity.

**Development Layer.** *How is the writer changing?* The longitudinal trajectory across sessions — week-over-week, month-over-month. Indicators: index slopes, baseline-to-current deltas, transfer-layer (no-AI) sample comparisons. This is the layer that requires patience: it is not measurable in a discrete session, and it is not measurable in a single month. Six-plus months of continuous data are the minimum.

The three-layer separation is the framework's first commitment. Output without process produces black-box quality scores. Process without development produces session-level analytics that don't answer the load-bearing capability question. Development without output and process is unanchored. All three are required.

### 2.2 Six skill dimensions

The framework's canonical skill axes:

- **A. Structural skill** — organizing writing into meaningful forms. Indicators: section coherence, transitions, hierarchy clarity. Genre-applicable across memoir / nonfiction / fiction with shared scoring.
- **B. Expressive skill** — *genre-forked*. Memoir: emotional specificity, experiential grounding. Nonfiction: conceptual clarity, argument precision. Fiction: sensory detail, scene construction. Each genre has its own indicators; cross-genre composite is invalid.
- **C. Integrative skill** — incorporating sources, retrieved corpus, counterpositions. Indicators: relevance, transformation (not copying), synthesis quality.
- **D. Originality** — deviation from source phrasing, novel structure or framing, unique voice expression. The indicator distinction *deviation from corpus patterns* is non-trivial: it operationalizes voice as measurable distance, not as a vibe.
- **E. Independence** — quality of writing produced without AI assistance, performance under Constraint Mode, performance on transfer-layer samples. The load-bearing dimension for the longitudinal claim.
- **F. Metacognitive skill** — reflection quality, pattern recognition, articulation of authorial choices. Indicators: reflection-prompt response specificity, pattern-naming accuracy, applied-pattern frequency.

Each dimension has a *genreApplicability* attribute: which of memoir / nonfiction / fiction the dimension applies to, and whether cross-genre aggregation is valid. The architectural commitment that genre never collapses (per the seven non-negotiable rules of authorship; cf. Paper 3) is enforced at the dimension level: composite indices that average across genres without normalization are invalid by construction.

### 2.3 Six derived indices

The six indices are the executive-level metrics — what surfaces in feedback, what papers reference, what the program adjudicates against.

1. **Writing Quality Index (WQI).** A composite of structural, expressive, and integrative quality. Reflective construct (per §4.1); the underlying writing quality causes the indicator scores.
2. **Independence Index (II).** Performance without assistance, improvement in constrained writing, transfer-layer-sample quality. Formative construct; independence is constituted by these indicators rather than caused by an underlying latent.
3. **Integration Index (INTI).** How sources are used — relevance, transformation, synthesis. Formative.
4. **Originality Index (OI).** Novelty of phrasing, deviation from corpus patterns, voice distinctiveness. Reflective; the underlying authorial originality causes the deviation indicators.
5. **Metacognitive Index (MI).** Reflection quality, pattern recognition. Reflective.
6. **Development Velocity (DV).** Rate of improvement across sessions. Formative; derived from the slopes of the other indices over time.

The mixed reflective/formative composition is intentional and consequential — see §4.1.

### 2.4 The five-step learning loop

Each session, ideally, runs the loop:

1. **Write.** The writer produces a draft (within an Authorship Packet, per Paper 3).
2. **Analyze.** The system extracts structure, patterns, weaknesses — feeds back what the writer did.
3. **Reflect.** The writer engages the Reflection Layer — articulates what worked, what didn't, what to try.
4. **Practice.** The system prompts a constraint or technique to apply (Practice Mode, Constraint Mode, counterposition drill, reconstruction exercise).
5. **Re-measure.** The next draft is scored against the same indices; deltas are recorded.

The loop is the unit of measurement at the *process* layer and the unit of intervention at the *development* layer. It is also the structural commitment that prevents the framework from collapsing into an output-quality scoreboard: if the system optimizes only for the *re-measure* step's output quality, the *practice* step is incentivized to drill specific patterns that game the score; if the practice step is decoupled from output quality (and tied instead to capability transfer under Constraint Mode), the loop optimizes the writer rather than the writer's outputs.

---

## 3. The four failure modes (non-negotiable veto)

Per §13 of the Penwright Measurement Framework vision document (`vela/docs/VISION-PENWRIGHT-MEASUREMENT.md`), the framework names four failure modes that act as veto conditions on every measurement decision.

1. **Optimization for output only.** *Destroys learning.* Any measurement design that aggregates toward output quality (the *what was written* layer) at the expense of process and development is rejected. The architectural answer is the three-layer separation (§2.1) plus the requirement that the longitudinal capability claim is the load-bearing outcome variable.

2. **Over-automation.** *Creates dependency.* Any measurement design that substitutes for the writer's judgment about their own development is rejected. The Reflection Layer's writer-articulated outputs are load-bearing — the system can analyze what the writer did, but the writer must articulate what they noticed. Indicators that bypass writer self-articulation (e.g., automated insight generation that the writer passively receives) violate this rule.

3. **Weak measurement.** *No research value.* Any indicator captured because it is easy rather than because it carries signal is rejected. Time-on-task is a salient example — easy to capture, weakly correlated with capability development, and frequently used as a proxy for engagement. The framework excludes it from the indices.

4. **Ignoring genre differences.** *Invalid conclusions.* Any composite index that aggregates across memoir / nonfiction / fiction without genre-specific normalization is rejected. The genre-fork is structural, not cosmetic. Cross-genre comparisons require explicit normalization; cross-genre claims require explicit defense.

These four are not aspirations. They are filters that kill measurement designs at proposal time. Every dimension, every index, every event has to pass through them.

---

## 4. Measurement-theory positioning

A framework that aspires to underwrite a twelve-paper research program must engage the measurement-theory tradition explicitly. Three engagement points are load-bearing.

### 4.1 Reflective vs. formative measurement

The distinction (Bollen & Lennox 1991; Diamantopoulos & Winklhofer 2001) is foundational and routinely under-engaged in applied measurement work.

A **reflective** construct is one in which the latent variable causes the indicators. Depression is the canonical example: the underlying construct produces low energy, low mood, low motivation; the indicators are *manifestations* of the latent. Reflective constructs admit traditional psychometric scaffolding — Cronbach's alpha for internal consistency, exploratory and confirmatory factor analysis, item-response theory.

A **formative** construct is one in which the indicators cause (or constitute) the latent. Socioeconomic status is the canonical example: income, education, and occupation are not manifestations of an underlying SES; they are the components that, taken together, define what SES *is*. Formative constructs require different scaffolding — partial-least-squares structural equation modeling (PLS-SEM), weight stability analysis, multicollinearity discipline. Cronbach's alpha is meaningless on a formative construct; the indicators are not supposed to correlate.

The Penwright Measurement Framework's six indices are *mixed*:

- **Writing Quality Index** — reflective. The underlying writing quality causes the structural / clarity / expressive indicators.
- **Independence Index** — formative. Independence is constituted by performance-without-assistance + improvement-in-constrained-mode + transfer-layer quality. There is no underlying "independence" that causes these; the indicators define what independence is.
- **Integration Index** — formative. Constituted by relevance + transformation + synthesis.
- **Originality Index** — reflective. The underlying authorial originality causes the deviation-from-corpus and voice-distinctiveness indicators.
- **Metacognitive Index** — reflective. Underlying metacognitive capability causes the reflection-quality and pattern-recognition indicators.
- **Development Velocity** — formative. Derived from the slopes of the other indices.

The mixed composition has two consequences. First, validation work has to be split: WQI/OI/MI need traditional reliability and factor-validity analyses; II/INTI/DV need PLS-SEM-style weight-stability and multicollinearity work. Second, composite scoring across reflective and formative indices is methodologically fraught; the framework should not aggregate WQI + II + INTI into a single "writing competence" score without explicit treatment.

### 4.2 Latent vs. observed

The indices are **latent** — never directly observed. What is observed is *indicators* (passage-level provenance, packet-completion scores, Constraint-Mode samples, reflection-prompt responses, retrieval-to-insertion ratios). The latent-observed distinction is foundational in psychometrics (Messick 1989; Kane 2013; Borsboom 2005) and matters for inference in every direction.

Two implications for the framework:

First, **validation is an argument, not a property** (Kane 2013). The framework cannot demonstrate "validity" once and be done; each empirical claim built on the indices needs a fresh validity argument that names the inferences being made and the evidence supporting them. A paper that claims "Independence Index improved by 0.4 over six months" must defend the inferences (what does the index measure? what does a 0.4 change mean? what alternative explanations are ruled out?) — not invoke a one-time validation.

Second, **the indicators carry their own error structure**. LLM-derived scoring (used for several of the dimensions, especially structural coherence and voice distinctiveness) is downstream of a model that has its own training distribution and version. Model-version drift contaminates measurement: an index drop of 0.2 points could mean the writer changed or the model did. The framework needs *frozen-model evaluation samples* (a fixed set of writing samples scored under fixed model versions) to separate writer-level change from model-level change. This is queued work, not shipped work.

### 4.3 Why standard psychometric scaffolding only partly applies

Most psychometric scaffolding assumes:

- **Discrete administration.** A test taken at one time, scored, and recorded.
- **A defined population.** A sampling frame and known characteristics.
- **External validation criteria.** Independent measures the indicators can be validated against.

The Penwright framework violates all three:

- **Continuous measurement.** Every authorship session contributes data. There is no discrete administration; the relevant time-units are sessions (process layer) and windows-of-many-sessions (development layer). Test-retest reliability does not directly translate.
- **A self-selected population.** Penwright users are writers who chose Penwright; they differ from the population of writers along dimensions the framework cannot fully observe (motivation to develop, willingness to engage structured input, prior AI-tool experience).
- **External validation criteria are partial.** Expert human ratings can validate Writing Quality components; standardized writing rubrics can partially validate structural indicators; but Independence and Development Velocity have no established external criterion to validate against, because the constructs themselves are novel.

Standard scaffolding can be *adapted* but not *imported wholesale*. The framework borrows: the reflective/formative distinction, the latent-observed framing, the validation-as-argument tradition. It departs: continuous measurement, self-selected cohort, partial external criteria. The departure is honest; it is not a methodological gap to be papered over.

---

## 5. Threats to validity

Six threats attend any empirical claim built on the framework. Each requires a named mitigation.

### 5.1 LLM-as-evidence drift

LLM-derived scoring contaminates measurement when the underlying model changes. Mitigation: frozen-model evaluation samples and version-pinned analysis pipelines. **Status:** queued; not shipped.

### 5.2 Auto-ethnography of the principal investigator

The PI is also Penwright's designer and most active user. Mitigation: external-operator pilot (PA-009 in the program's assignment queue). **Status:** queued; not shipped.

### 5.3 Self-selection

Penwright users self-select on motivation, AI-tool comfort, willingness to engage structured input. Findings hold for the self-selected cohort and may not generalize. Mitigation: explicit cohort-characteristic disclosure in every paper; recruitment-channel diversity in the pilot to weaken homogeneity. **Status:** disclosure discipline is enforceable; recruitment-diversity is queued.

### 5.4 Reflection-prompt social desirability

The Metacognitive Index depends on reflection-prompt responses. Self-report contamination (demand characteristics, social desirability, theory-of-the-researcher) is well-documented. Mitigation: validate the index against external metacognitive criteria (think-aloud protocols, retrospective accuracy on technique identification). **Status:** validation pass is queued.

### 5.5 Single-system generalization

Findings hold for Penwright as instantiated. Mitigation: theoretical scaffolding that explains why findings should travel; eventual replication on adjacent systems via the Adaptive Authorship Control Kernel as portable substrate. **Status:** scaffolding partial; replication is forward-looking.

### 5.6 Performative reflection

A subtler version of 5.4: writers may answer reflection prompts in ways that game the index they suspect is being measured (whether or not they know it consciously). Mitigation: triangulation against process-layer indicators that are not under writer control (retrieval patterns, edit depth). **Status:** triangulation discipline is in design.

A reviewer evaluating any paper built on the framework should expect each of the six threats to be named and addressed in the paper's threats-to-validity register, not deferred to "future work."

---

## 6. Comparison to existing instruments

Three established instrument families merit explicit comparison. None is fit for measuring AI-augmented capability development; the reasons are specific.

### 6.1 HCI usability scales (System Usability Scale and cognates)

The SUS (Brooke 1996) is the standard usability instrument: ten items, validated across thousands of studies, easy to administer, broadly applicable. The cognate scales — UEQ (User Experience Questionnaire; Laugwitz et al. 2008), QUIS (Chin et al. 1988), AttrakDiff (Hassenzahl et al. 2003) — share its strengths.

What HCI usability scales measure: ease of use, learnability, satisfaction with the tool. What they do not measure: what the tool does to the user over time. A writer can find Penwright "easy to use" while becoming a worse writer because of it; SUS scores would not predict capability development and would not detect capability decline. The instrument is well-validated for what it is. It is not what the framework needs to measure.

### 6.2 Educational skill assessments (NAEP writing scales; standardized rubrics)

The NAEP writing assessment (National Assessment of Educational Progress; National Center for Education Statistics) and similar large-scale educational assessments are dimension-based, validated against expert ratings, and longitudinally administered. They measure writing skill at point-in-time, against a fixed criterion.

What educational skill assessments measure: writing performance against a defined rubric at a defined administration time. What they do not measure: process, development trajectory, capability transfer between tool-augmented and tool-free contexts, dependency dynamics. The NAEP framework was designed for educational assessment of student populations, not for capability tracking in adult continuous-use environments. The transfer is partial; the gaps are load-bearing.

### 6.3 Standardized writing rubrics (Six-Trait Writing Model; Hayes & Flower; AWE systems)

The Six-Trait Writing Model (Spandel 2005) — Ideas, Organization, Voice, Word Choice, Sentence Fluency, Conventions — is dimension-based and widely used in educational contexts. The Hayes & Flower (1980) cognitive process model is the foundational process model in the writing-research literature. AWE (automated writing evaluation) systems — e-Rater (Burstein, Tetreault & Madnani 2013), MI Write, and successor systems — apply NLP scoring to writing samples.

Each has strengths. Six-Trait gives a recognized vocabulary. Hayes & Flower decomposes the writing process into planning / translating / reviewing. AWE provides scalable scoring.

The failure modes are specific. Six-Trait collapses genre — one rubric for memoir, nonfiction, and fiction alike, which the framework's non-negotiable rule against genre-collapse explicitly forbids. Hayes & Flower is a process model, not a measurement system; it describes activity but does not produce indicators. AWE systems optimize for output quality (scoring against a reference standard); they do not measure independence, dependency, capability transfer, or developmental trajectory. Each instrument family answers the wrong question for the framework's purposes.

### 6.4 Why the framework is different

The contribution claim is structural: capability development is the outcome, not output quality. Existing instruments measure outputs (or tools); the framework measures *the writer*. Existing instruments are point-in-time (or session-window); the framework is continuous and longitudinal. Existing instruments are genre-collapsed (or single-genre); the framework is genre-forked across memoir / nonfiction / fiction. Existing instruments rely on external administration and discrete validation; the framework operates inside a production system on a self-selected cohort and validates as ongoing argument.

The differences are not gentle refinements. They are different commitments about what to measure and what to count as evidence. The framework's claim is that the differences are warranted by the question — *what does AI do to the writer over time?* — that the existing instruments were not designed to answer.

---

## 7. What's measurable in v1; what awaits production data and external validation

A measurement framework is only as live as the instrumentation that backs it. The current state separates cleanly into four categories.

### 7.1 Measurable today

With current Penwright instrumentation (F-03 Authorship Packet UI MVP shipped; foundational telemetry active):

- Packet completeness scores per session (which packet fields were populated, with what specificity)
- Session-level writing-behavior metrics (words written, time spent, edit frequency, revision depth)
- Retrieval metrics (passages viewed, inserted, dismissed)
- Genre context per session (memoir / nonfiction / fiction)
- Mode utilization (default / Practice / Constraint / Deep Writing)

These support immediate descriptive analysis of authorial process. They do *not* support causal claims about capability development; they are the substrate, not the outcome.

### 7.2 Measurable in v1.1 (after Wave-2-through-6 features ship)

After F-04 (Practice Mode), F-07 (Voice Check), F-09 (Source Integrity), F-10 (Resonance Capture), F-11 (Deep Writing Mode), F-13 (Reflection Layer) ship per the synthesis-document plan:

- Writing Quality components (structural coherence, voice distinctiveness, source integration)
- Independence components (Constraint-Mode performance, Practice-Mode reconstruction quality)
- Metacognitive components (reflection-response specificity, pattern-recognition accuracy)
- Originality indicators (deviation-from-corpus distance, voice-baseline divergence)

The indices themselves become computable when these components land. Wave 1 (kernel) and Wave 2-6 (feature implementations) are the gating dependencies.

### 7.3 Requires longitudinal data accumulation

Independent of feature implementation, certain indicators require time:

- **Development Velocity** — slope across sessions; meaningful only after sufficient session count (rough minimum: 30 sessions per writer, ideally over 3+ months).
- **Independence Index** — periodic Constraint-Mode samples accumulated over months.
- **Capability transfer** — pre-vs-post Constraint-Mode sample comparison; minimum window 6 months.

No engineering work substitutes for the time. The longitudinal claim cannot be tested early.

### 7.4 Requires external validation

Independent of feature implementation and time, certain validation work is queued:

- **Per-index human-rater calibration.** Expert human raters score writing samples against the same dimensions the indices measure; agreement statistics (Cohen's κ, ICC) per dimension and per genre.
- **LLM-vs-human agreement.** Where indices use LLM-derived scoring, the LLM-vs-human Cohen's κ on a held-out sample. Required before any paper invokes an LLM-scored index.
- **Construct-specific external validation.** Independence against established indicators of writing autonomy (e.g., timed-essay performance under controlled conditions); Metacognitive against think-aloud protocol quality; Originality against expert ratings of voice distinctiveness.
- **Frozen-model evaluation samples.** Fixed writing samples scored under fixed model versions, re-scored periodically to detect model-drift effects on the indices.

None of these is shipped. Each is required before the indices that depend on them appear in submitted papers. The publication-queue discipline makes the dependency visible: papers gated on validation work do not file before the validation work ships.

---

## 8. What this paper claims (and does not)

The paper claims that the Penwright Measurement Framework is well-specified — that its dimensions, indices, layers, learning loop, and failure modes are stated with enough precision to be operationalized, falsified, and extended. The paper claims that the framework engages the relevant measurement-theory positions explicitly (reflective vs. formative; latent vs. observed; the limits of standard psychometric scaffolding under continuous measurement). The paper claims that existing instruments — usability scales, educational assessments, standardized writing rubrics — are not fit for purpose for measuring AI-augmented capability development, and that the reasons are specific rather than aesthetic.

The paper does *not* claim that the framework has been validated. Validation is an argument-and-evidence process; it requires production data, external-validation passes, and longitudinal accumulation that have not yet shipped. The paper does *not* claim that the framework's indices yield the predicted longitudinal effects; that question is Paper 8's territory. The paper does *not* claim that the framework generalizes beyond AI-augmented writing into adjacent AI-augmented activities; that question requires either replication on adjacent systems or theoretical scaffolding the framework does not yet provide.

The paper does claim, finally, that the framework's contribution is structural rather than incremental. Existing measurement work in AI-augmented writing answers narrow questions about outputs and tools; the framework specifies what would be required to answer the question the field has so far avoided — *what does AI do to the writer over time?* — with enough rigor to support either a confirming or a falsifying answer. The framework is the precondition for that question to be addressable empirically.

---

*Companion artifacts in the AHI program:* `methodology.md` (program-wide methodology, the Penwright Measurement Framework summary §2.2 mirrors §2 of this paper); `penwright-paper-03-authorship-packet.md` (Paper 3, Tier-1, the Authorship Packet Model); `peer-review.md` (audience-tier 1, peer-review framing of the program); `engineering.md` (audience-tier 2, engineering reviewer's lens on F-19 and the framework instrumentation); `product.md` (audience-tier 3, what the program tells us to build next). Vision specs at `vela/docs/VISION-PENWRIGHT-MEASUREMENT.md` and `vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md` are the load-bearing internal sources.
