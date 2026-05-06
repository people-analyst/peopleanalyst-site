# Paper 3 — The Authorship Packet Model: structured input as an alternative to freeform prompting in AI-augmented writing

*Tier-1 foundational paper of the Penwright Research Program. Position-and-mechanism paper for the structural-input alternative to the prompt-then-edit interaction pattern that has come to dominate AI writing tools.*

— 2026-05-05

---

## Abstract

AI writing tools have converged on a default interaction shape — *prompt → AI draft → human edit* — that produces output fluency at the cost of authorial capability development. We propose an alternative: the **Authorship Packet Model**, a five-field structured input unit (intent · structure · key ideas · relevant passages · counterpositions) that the writer assembles before AI generation rather than after. The structure itself is data — packet completeness, packet shape, and the relationship between packet structure and downstream output quality become extractable signals. We position the model against three under-engaged literatures (transactive memory, translation theory, cognitive load theory) and against three alternative input shapes (freeform prompts, structured chain-of-thought, retrieval-augmented generation). We carry forward the seven non-negotiable rules of authorship that act as veto conditions on the design, and we name three threats to validity (auto-ethnography of the principal investigator, single-system generalization, writer learning curve) and the production-data tests that will adjudicate them. The model is instantiated in Penwright (an authorship system inside Vela's `app/labs/penwright/`); production data accumulates against the longitudinal capability claim — *better writer with Penwright, than without it, in six months.*

---

## 1. Introduction — the prompt-engineering dead end

The default interaction pattern in AI writing tools is prompt-then-edit. The writer types a sentence or a paragraph as a prompt; the AI generates a draft; the writer edits the draft. Variations exist (autocomplete-first, suggestion-bars, "improve this paragraph" buttons), but they share the same underlying shape: the writer's *generative* contribution is compressed into the prompt, and the writer's *editorial* contribution is whatever survives the round-trip with the model.

Three failure modes follow from this shape.

**Output-shaped optimization.** The writer's contribution is a prompt; the AI's contribution is the prose; the writer's role becomes editor of AI-generated material rather than originator. Tools that ship in this pattern optimize for output quality (the prose the AI produces) because output quality is what the prompt-and-draft loop foregrounds. Authorship — the slower, harder, less measurable activity of *deciding what to say and how to say it* — drops out of the optimization target.

**Voice flattening.** The AI's training distribution dominates voice. Even with prompt-engineering tricks (style references, tone parameters, voice exemplars), the model's prior pulls strongly toward the median of its training data. Writer voice — the distinctive cadence, vocabulary, register, attentional pattern that distinguishes one author from another — fades into the model's, and the writer often does not notice because the output reads "well." The failure is silent.

**Capability erosion.** The writer practices selection-and-edit, not composition. Over time, the underlying composition skills (sentence-level construction, paragraph-level organization, argument-level shape, scene-level dramatic logic) atrophy because they are not exercised. The writer becomes more productive in the prompt-and-draft loop and less capable outside it. The longitudinal effect is invisible inside the tool because the in-system metric (output rate, output quality) keeps improving while the out-of-system capability declines.

Penwright bets on a different interaction shape. Rather than compressing the writer's generative contribution into a prompt, Penwright requires the writer to *assemble structure first* — to commit to intent, organizational shape, load-bearing claims, source material, and counterpositions before the AI is invoked. The AI then drafts, critiques, or develops *from the structure*, not from a freeform sentence. The writer's generative contribution stays foregrounded; the AI's contribution is downstream of authorial commitments the writer has already made. This is the Authorship Packet Model.

---

## 2. The Authorship Packet Model

An Authorship Packet is a five-field structured input unit. Each field corresponds to an authorial commitment the writer would have to make in any case to produce coherent work — but in freeform prompting, those commitments stay implicit and the AI fills them in by default. The packet makes them explicit and writer-owned.

**Intent.** What the writer is trying to do at the level of the unit being authored. For a memoir passage: *render the moment of recognition without explaining it.* For a nonfiction argument: *establish that the standard explanation has a load-bearing exception.* For a fiction scene: *put the protagonist in a position where the next decision will reveal character.* Intent is not topic; it is the authorial *move* the writer is attempting.

**Structure.** The organizational shape the writer commits to. Linear vs. recursive. Chronological vs. thematic. Argument-then-evidence vs. evidence-then-argument. Frame-and-fill vs. unfolding. Structure is the choice that, once made, organizes everything downstream — and the choice that prompt-then-edit defers entirely to the model.

**Key ideas.** The load-bearing claims, beats, or images. For an argument: the three or four points the unit must establish. For memoir: the felt moments the passage must carry. For fiction: the dramatic beats the scene must hit. Key ideas are not an outline; they are the *load-bearing content* the writer is committed to delivering, in their own formulation.

**Relevant passages.** Selected source material — from the writer's chosen corpus, prior writing, research notes, conversation transcripts, primary documents. The writer chooses what is in scope. Penwright's Corpus Control Layer (the substrate that makes this field work) lets the writer select and weight sources rather than inheriting the LLM's training distribution.

**Counterpositions.** What the writer is reading *against* — objections, alternative readings, opposing arguments, dissenting voices, the strongest version of the case the writer is not making. The field forces the writer to engage with disagreement before drafting, when the load is lowest. It also encodes a non-negotiable rule (the AI should be willing to disagree, per §7 below) at the input layer rather than the output layer.

The structure is data. A completed packet has measurable shape — five fields with measurable completion, measurable length, measurable specificity, measurable coherence with each other. Penwright instruments this directly: every packet a writer assembles is logged in a structured form, every output is attributable to the packet that produced it, and the relationship between *packet shape* and *output characteristics* becomes an empirical surface rather than an opinion.

The role of AI in the model is downstream of the packet. The AI does not draft from a freeform prompt; it drafts (or critiques, or extends, or interrogates) from the packet. The writer's generative contribution stays foregrounded because the structural commitments are the writer's. The AI is a substrate for the writer's authorial work, not a substitute for it.

---

## 3. Theoretical positioning

The Authorship Packet Model engages three bodies of theory the contemporary HAI literature has under-engaged: transactive memory, translation theory, and cognitive load theory. None is foreign to the field; none has been brought to bear on the input-shape question with the specificity the packet model invites.

### 3.1 Transactive memory (Wegner 1987; Lewis 2003)

Transactive memory describes how groups distribute responsibility for remembering across members. In an established couple or a long-lived team, individual members know not only their own memory but also *who knows what* — the team's effective memory is larger than any individual's because lookup is distributed.

The packet model extends transactive memory to human-AI writing. The writer holds *intent*, *voice*, *judgment*, *taste*, *the sense of what the unit is trying to do*. The AI holds *retrieval*, *syntactic generation*, *critique-from-distance*, *pattern-matching across the corpus*. The Authorship Packet is the encoding mechanism that makes the transaction explicit: each field corresponds to a load-bearing distribution of responsibility. *Counterpositions* especially — the writer commits to the shape of the disagreement the AI should engage with, which prevents the failure mode where the writer offloads judgment to the AI by underspecifying counterpositions.

The bridge to transactive memory is structurally important: it lets the program describe what is going on between writer and AI without invoking either the *"AI as collaborator"* metaphor (which over-anthropomorphizes the model) or the *"AI as tool"* metaphor (which undersells what the model contributes). The packet describes the transaction, not the agents.

### 3.2 Translation theory (Venuti 1995; Bermann & Wood 2005)

Translation theory has long distinguished *domesticating* translation (smoothing the source toward the target reader's expectations) from *foreignizing* translation (preserving source-text strangeness so the reader registers that they are reading a translation). The two are not equally distributed across publishing markets; English-language commercial translation defaults strongly to domestication, which Venuti has argued constitutes a kind of cultural erasure.

The packet model maps to the foreignizing tradition. AI writing tools default to domestication: the model's voice is the smooth target, and writer voice gets pulled toward it. The packet's *intent* and *counterpositions* fields, and the Corpus Control Layer that powers the *relevant passages* field, are the foreignizing levers — they preserve the writer's voice from being smoothed toward the model's. Voice preservation, in this framing, is not a UI feature but a translation-theoretic commitment.

This positioning has product consequences. The Authorial-Voice index (per the Penwright Measurement Framework) is operationalized against *the writer's pre-AI baseline*, not against an absolute "good voice" criterion — because the relevant question is whether the writer's voice survives the AI substrate, not whether the substrate produces writing that meets some external standard. That is the foreignizing test, ported.

### 3.3 Cognitive load theory (Sweller 1988; the segmenting / sequencing literature)

Cognitive load theory partitions mental effort during a task into *intrinsic* load (the inherent complexity of the material), *extraneous* load (the burden imposed by the way the task is presented), and *germane* load (effort spent on schema construction). The educational design literature has shown that segmenting and sequencing reduce extraneous load and free germane load for learning.

Generative composition imposes high intrinsic load: the writer is juggling structure, ideas, voice, sources, and counterpositions simultaneously while producing prose. Freeform prompting collapses all of these into a single moment — the writer types a sentence and the AI generates everything else, but the writer's *editorial* burden in revision is now everything they didn't specify. The load is displaced, not reduced.

The packet model segments and sequences. The writer commits to structural decisions *before* drafting, when load is lowest. Counterposition work happens before drafting, not during. The drafting moment is therefore less cognitively contested — the writer has already made the load-bearing decisions and can attend to prose-level work. The bridge is well-supported in educational design and has not been brought to AI writing input shapes specifically.

---

## 4. The seven non-negotiable rules of authorship

The Penwright vision document (`vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md` §7) carries seven rules forward as veto conditions on every product decision. The rules are reproduced verbatim, with brief commentary on each.

1. **Do not build generic AI writing features.** No autocomplete-first. No ghostwriting-first.
   *Commentary:* the temptation to copy what other AI-writing products ship is constant. The rule forecloses the easy path. Authorship-specific affordances (packet-shaped composition, corpus-aware drafting, genre-forked prompts) are the alternative.

2. **Do not collapse genre distinctions.** Memoir ≠ nonfiction ≠ fiction.
   *Commentary:* enforced architecturally — copy, schema enums, prompts, and metrics each fork by genre rather than sharing a runtime parameter. Cross-genre features are the exception that requires justification, not the default.

3. **Do not hide source attribution.** Corpus is visible and attributable.
   *Commentary:* operationalized as passage-level provenance (writer-original / AI-suggestion-accepted / AI-suggestion-revised / AI-suggestion-rejected). Citation-by-vibe and paraphrase-without-trace are foreclosed at the data-model layer.

4. **Do not flatten emotional nuance.** Especially the shame-family taxonomy.
   *Commentary:* the contribution-claim from Vela's emotion-corpus work — that emotion-family granularity is load-bearing — propagates into Penwright's drafting and critique surfaces. Smoothing toward AI-shaped affective middle is forbidden.

5. **Do not optimize for speed over authorship.** "Cheap victory" is a failure mode.
   *Commentary:* output-rate metrics, words-per-minute leaderboards, "finish faster" affordances are all foreclosed. The longitudinal capability claim is the load-bearing outcome variable, not output velocity.

6. **Do not make AI compliant.** Office writers should disagree.
   *Commentary:* the *counterpositions* field is the product expression of this rule at the input layer. AI surfaces should be willing to push back, not yes-and. Sycophancy detection is a measurement obligation.

7. **Do not over-moralize feedback.** Tone must match Vela's voice.
   *Commentary:* content-warning bloat, refusal-to-engage on genre material, lecture-mode framing are all foreclosed. The editorial discipline is set by the writer's chosen corpus and genre, not by a global policy layer.

The rules are not aspirations; they are filters. Every feature decision passes through them, and features that drift toward any of the seven failure patterns get cut.

---

## 5. Comparison to alternative input shapes

The Authorship Packet Model is one of several input shapes that have appeared in AI-augmented writing and adjacent fields. The alternatives are well-documented; the packet model's contribution is structural, not presentational, and the comparison clarifies the structural difference.

**Freeform prompting.** The most common shape. The writer types a sentence or paragraph; the AI generates from it. Strengths: low learning curve, fast iteration, accessible to writers who do not want to engage with structural commitments. Failure modes: the prompt is the entire structure, so the AI fills in everything else (intent, organization, voice, sources, counterpositions); writer voice gets pulled toward the model's; capability erosion compounds because the writer practices selection-and-edit. The packet model's alternative is structural — the writer commits before generating, so the AI fills in less.

**Structured chain-of-thought** (Wei et al. 2022; the prompt-engineering literature). An AI engineering pattern in which a problem is decomposed into reasoning steps and the AI walks through them. Strengths: improves AI reasoning quality on complex tasks; makes AI process inspectable. Failure modes: optimizes the *AI's* reasoning quality, not the writer's development; the structure is the AI's, not the writer's. The packet model's structure represents the *writer's* reasoning, not the AI's, and the failure mode is the opposite — over-investment in writer-side structure where chain-of-thought is the better fit.

**Retrieval-augmented generation (RAG)** (Lewis et al. 2020 and subsequent). A pattern in which relevant sources are retrieved and added to the generation context. Strengths: makes generation source-aware; reduces hallucination on factual queries. Failure modes: the input shape is unchanged — the writer still types a prompt — and the retrieval is optimized for relevance to the prompt, not for the writer's authorial choice. The packet model's *relevant passages* field is a writer's authorial gesture (the writer chooses what is in scope) rather than a retrieval optimization (an algorithm chooses what is most semantically similar). The Corpus Control Layer is the substrate; RAG is one of its possible engines, not its replacement.

**Form-based interfaces** (the established UX pattern in writing tools — Scrivener corkboards, Ulysses outlines, Notion templates). Strengths: structured input is familiar; writers often already use forms outside AI tools. Failure modes: forms typically capture *content* (chapter titles, beat sheets, character profiles) rather than *authorial commitments* (intent, structural choice, counterpositions). The packet's contribution is the choice of fields — not that input is structured, but that the structure encodes the load-bearing authorial decisions specifically.

---

## 6. Threats to validity

The Authorship Packet Model is a design hypothesis. Three threats to validity attend any empirical claim the program will make about its effects.

**Auto-ethnography of the principal investigator.** The principal investigator is also Penwright's designer and most active user. Findings about packet-completeness-vs-output-quality, packet-shape-evolution-over-time, or packet-mediated capability transfer are auto-ethnography until external operators run the system. The mitigation is the external-operator pilot (PA-009 in the assignment queue): 5–10 outside Penwright users recruited under IRB-clean consent and tracked under the same instrumentation. The pilot is queued; until it delivers, every causal claim about the packet model is one-writer evidence. The descriptive claims are unaffected.

**Single-system generalization.** The packet model is instantiated as Penwright with specific design decisions: five fields, this UI, this kernel registration, this genre fork. Findings may not transfer to other AI-writing systems unless adjacent surfaces run the analogous instrument. The mitigation depends on the Adaptive Authorship Control Kernel as a portable substrate; the program currently has no sibling systems running the kernel. The threat is real and currently weakly mitigated.

**Writer learning curve.** Writers need to learn the packet structure. The learning curve is unmeasured at scale; writers who drop off because the packet is too much overhead will not appear in the cohort that produces longitudinal data. The instrument's internal measurements cannot detect this self-selection because it happens before instrumentation begins. The mitigation requires UX discipline (low-friction packet entry, partial-packet acceptance, scaffolded onboarding) and external operator data on first-month retention.

A fourth threat — output-quality optimization drift under product pressure — is structural rather than empirical. The four-failure-mode veto in the Penwright Measurement Framework is the formal answer. The social discipline that enforces it across release cycles is unverified.

---

## 7. What production data will adjudicate

Three specific tests, each operationalized against the production data the program will accumulate.

**Test 1: Packet completeness vs. output quality.** *Hypothesis:* more complete packets produce higher-quality outputs as scored by the Writing Quality index. *Test:* regress index on packet-field-completion scores, controlling for genre and writer experience level. *No-world:* packet completeness does not predict output quality. *Implication if null:* the packet structure may be over-engineered relative to its measurement payoff; specific fields may be redundant.

**Test 2: Genre-fork necessity.** *Hypothesis:* packet shapes differ across memoir / nonfiction / fiction in ways that affect output quality. *Test:* packet field distributions stratified by genre; interaction terms in regression of output quality on packet shape and genre. *No-world:* packet shapes are interchangeable across genres. *Implication if null:* the genre-aware fork is over-engineering at the packet layer; the broader genre-fork commitment (Paper 7) addresses this question more comprehensively.

**Test 3: Capability transfer.** *Hypothesis:* writers who use the packet model for 6+ months produce better Constraint-Mode (no-AI) work than matched controls without packet exposure. *Test:* pre-vs-post Constraint-Mode samples scored against the Writing Quality index, with the matched-control group constructed from the external-operator pilot. *No-world:* the packet model produces no detectable transfer. *Implication if null:* the model fails its load-bearing test; the program's longitudinal claim does not survive its own measurement.

The third test is the most important. It is also the slowest — the external-operator pilot has to recruit, onboard, and run for at least six months before the test can be executed. The program is committed to the patience this requires.

---

## 8. What this paper claims

The Authorship Packet Model is a structural alternative to freeform prompting in AI-augmented writing. It is theoretically grounded in transactive memory, translation theory, and cognitive load theory. It is genre-forked across memoir, nonfiction, and fiction. It is testable under three production-data tests. It is constrained by seven non-negotiable rules that act as veto conditions on its design. It is one instantiation of a more general claim — that the input shape of AI-augmented work is the load-bearing design choice, and that the field's default (freeform prompting) is a local optimum that under-serves authorial capability development.

The paper does not claim that the model has been validated. It claims that the model is well-specified enough to be falsified by the production data the program is committed to producing, on the timeline that data accumulation requires. That is a different claim than "this works"; it is the only honest claim available pre-pilot.

The paper also does not claim that the packet model is the right input shape for every AI-augmented activity. The model is shaped for *authorship* — work where the writer's generative contribution is the load-bearing element. Activities where the user's contribution is selection rather than composition (some forms of summarization, some forms of extraction, some forms of routine documentation) likely have different optimal input shapes. The packet model's contribution is to claim a region of the design space — long-form authored work where capability development matters — and to specify what input shape serves that region.

---

*Companion artifacts in the AHI program:* `methodology.md` (program-wide methodology, the Penwright Measurement Framework summary §2.2); `peer-review.md` (audience-tier 1, peer-review framing of the program); `engineering.md` (audience-tier 2, engineering reviewer's lens on F-19 and the framework instrumentation); `product.md` (audience-tier 3, what the program tells us to build next); `penwright-paper-01-public.md` (general-audience companion to Paper 1). Vision specs at `vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md` and `vela/docs/VISION-PENWRIGHT-MEASUREMENT.md` are the load-bearing internal sources.
