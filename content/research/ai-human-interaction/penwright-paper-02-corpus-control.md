# Paper 2 — Corpus Control and Epistemic Agency in AI-Augmented Writing

*Tier-1 foundational paper of the Penwright Research Program. Position-and-mechanism paper for the epistemic-control alternative to default-LLM-corpus inheritance in AI writing systems.*

— 2026-05-05

---

## Abstract

The default behavior of every general-purpose AI writing tool is to draw on the language model's training distribution as the authoritative substrate for all generated text. The training distribution is presented as neutral; in practice it encodes specific cultural, historical, and linguistic perspectives that present themselves as universal. The writer using such a tool inherits this epistemic stance invisibly — the voice the AI tends toward is not the writer's voice but the training distribution's voice. We propose **Corpus Control** as a design principle: writers explicitly select which voices, sources, and interpretive frameworks shape their work, and which are excluded. The principle is instantiated in Penwright's Corpus Control Layer through three mechanisms (corpus selection · attribution visibility · source integration). We position the principle against three under-engaged literatures (standpoint theory, epistemic injustice, and the AI bias tradition) and against three alternative approaches to LLM-output shaping (retrieval-augmented generation, fine-tuning, prompt engineering) — each of which addresses adjacent problems but locates control in the wrong place. We name four threats to validity and three production-data tests that will adjudicate. The principle's contribution claim is structural: epistemic agency in AI-augmented writing is a load-bearing authorial choice, not a retrieval optimization, and the system's job is to make that choice legible and revisable rather than to optimize it away.

---

## 1. Introduction — the epistemic problem of default-LLM behavior

Any AI writing tool has to answer, implicitly or explicitly, a question that predates AI by millennia: *whose voices, whose perspectives, whose evidence should shape what gets said?* The pre-AI answer is that the writer chooses. They read the writers they choose to read; they cite the sources they choose to cite; they engage the counterpositions they choose to engage. The choices are visible (in citations, in influences, in the writer's stated commitments) and contestable (a reader can see what's in the corpus and what isn't, and judge the work accordingly). Authorship has always been, in part, an epistemic exercise: choosing whose words and frameworks to bring into one's own work.

The default behavior of contemporary AI writing tools answers the question differently. The language model draws on its training distribution — whatever it was trained on, in whatever proportion, with whatever exclusions — as the substrate for all generated text. The writer's freeform prompt selects an output region within that distribution; the distribution itself is not selected by the writer and is not visible to them. Whatever the model was trained on becomes, by default, the operative corpus. The choice that authorship has always required is made by the model creators, not the writer.

This is presented as neutrality. In a literal sense it is universality: a single training distribution serves all users. In an epistemic sense it is something else. The training distribution reflects what is digitized, what is accessible, what is licensable, what is in dominant languages, what is recent enough to have an internet footprint, what model creators thought was worth collecting. These are specific choices, and they encode specific perspectives. Books in dominant languages outweigh books in other languages by orders of magnitude. Internet text — itself a particular cultural-historical artifact — outweighs older oral traditions. Published academic work outweighs unpublished archives. Commercially licensable corpora outweigh non-commercial repositories. The training distribution is not the world; it is a particular sampling of the world, with known and well-documented biases (Bender et al. 2021; Birhane et al. 2021; Solaiman & Dennison 2021).

The writer using a default-LLM tool inherits this sampling as their effective epistemic substrate. The voice the AI tends toward is the model's voice, which is the training distribution's voice, which is a particular cultural-historical artifact presented as universal. The writer's authorial agency over the corpus — the agency that authorship has always involved — is silently displaced. The displacement is invisible because the training distribution is not exposed; it is the unmarked default against which the writer's prompts operate.

The argument of this paper is that this displacement is the load-bearing epistemic problem in AI-augmented writing, that it has been under-engaged in the field's measurement and design surfaces, and that the structural answer is to make corpus selection a first-class authorial choice. We call the design principle that does this **Corpus Control**. Penwright instantiates the principle through three concrete mechanisms; the rest of this paper develops the principle, positions it against adjacent literatures, distinguishes it from adjacent technical approaches, and names what the program will need to test before claiming it works.

---

## 2. The Penwright commitment — corpus is an authorial choice

Per the Penwright system's foundational specification (`vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md` §6.2), corpus selection is *"epistemic control, not just search."* The phrasing is precise. Search is a retrieval problem: given a query, find the most relevant material. Epistemic control is an authorial problem: given a piece of writing, decide which voices should shape it and which should not. The two problems are not the same problem, and they require different system shapes.

Penwright's Corpus Control Layer treats the corpus as something the writer assembles and revises rather than something the system retrieves over. The writer chooses which sources are in scope (published works, unpublished drafts, conversation transcripts, primary documents, archival materials, the writer's own prior work). The writer specifies how much each source should shape the generated material — *influence weights*, in the implementation language. The writer specifies counterpositions — sources to read against rather than draw from. The corpus is not pre-given by the model; it is constructed per piece by the writer, and the construction is itself an authorial gesture with its own history of revision.

Three commitments follow from this stance, and they are load-bearing for the rest of the paper.

**Visibility.** The writer can see the corpus they've assembled. The reader of finished work can see (through attribution) which sources shaped which passages. The model's training distribution does not vanish — it remains the underlying substrate — but it is supplemented and partially overridden by the writer's curated corpus. The visibility is what makes contestation possible: a reader who disagrees with what's in the corpus can say so specifically, and a writer who wants to broaden their own corpus can do so deliberately.

**Revisability.** Corpus selection is not a one-time setup. Writers add and remove sources as their understanding develops; they re-weight as the work evolves; they bring in counterpositions as the argument sharpens. The corpus is a living document, not a configuration.

**Genre-fork.** Per the Penwright commitment that memoir / nonfiction / fiction never collapse, the corpus's role differs across genres. In nonfiction, sources function as evidence and integration carries citation. In memoir, sources function as influence and integration carries experiential grounding (the writer's lived experience as primary, the corpus as orienting). In fiction, sources function as resonance and integration is craft-level (rhythm, structure, image-vocabulary) rather than evidentiary.

These three commitments together distinguish Corpus Control from adjacent technical approaches and motivate the theoretical positioning that follows.

---

## 3. Theoretical positioning

The principle of Corpus Control engages three bodies of theory the contemporary AI writing literature has under-engaged. None is foreign to the field; none has been brought to bear on the corpus-shape question with the specificity Penwright invites.

### 3.1 Standpoint theory (Harding 1991, 2004; Haraway 1988)

Standpoint theory in feminist epistemology argues that all knowledge is *situated* — produced from a particular social position with particular interests, particular access to evidence, and particular blind spots. Sandra Harding's *Whose Science? Whose Knowledge?* (1991) develops the argument that the dominant perspective often presents itself as universal precisely because it has not been required to mark itself as a perspective. Donna Haraway's "Situated Knowledges" (1988) makes the cognate argument: the "view from nowhere" is itself a view from somewhere, and the somewhere is typically unmarked.

The default-LLM behavior maps onto this argument structurally. The training distribution is presented as neutral or comprehensive; it does not advertise itself as one possible corpus among many. Writers using default-LLM tools inherit the distribution as the unmarked baseline. Standpoint theory's contribution is to insist that there is no unmarked baseline — every corpus is a corpus, and pretending otherwise is itself a positioned move.

Penwright's Corpus Control Layer is a standpoint-aware design. The writer is required to specify the corpus, which means the writer is required to acknowledge that the corpus is *a corpus* — partial, situated, revisable. The system does not provide a neutral default that absolves the writer of the choice; it presents the choice as the foundational authorial gesture. Standpoint theory provides the theoretical justification for treating this as a feature rather than friction.

### 3.2 Epistemic injustice (Fricker 2007)

Miranda Fricker's *Epistemic Injustice* (2007) develops two concepts that are load-bearing here. **Testimonial injustice** occurs when a hearer fails to credit a speaker's testimony because of prejudice about the speaker's group — whose voices are heard, whose are dismissed. **Hermeneutical injustice** occurs when a community lacks the interpretive frameworks needed to understand certain experiences — whose interpretive vocabularies are available for sense-making.

Both forms of injustice have been documented in AI systems. LLMs trained predominantly on dominant-language, dominant-culture, dominant-genre material reproduce testimonial patterns: certain voices over-represented in generated text, certain framings amplified, certain styles unmarked while others are flagged as "dialectal" or "non-standard." LLMs trained on the dominant interpretive frameworks reproduce hermeneutical patterns: experiences that have well-developed vocabulary in the training distribution are easier to articulate; experiences that don't are harder to articulate, and the AI tends to translate them into the available vocabulary, sometimes accurately and sometimes destructively.

Penwright's response is structural. The Corpus Control Layer lets the writer foreground voices that the training distribution under-weights — by explicit corpus inclusion. The Source Integration mechanism lets the writer use interpretive vocabularies that the training distribution under-supplies — by selecting sources that carry those vocabularies and by tagging where they appear in output. The visibility of attribution is the structural answer to the invisibility of testimonial and hermeneutical patterns in default-LLM output.

This is not a claim that Corpus Control eliminates epistemic injustice. The underlying model still has its own patterns, and the writer's curated corpus reflects the writer's own existing knowledge and biases. The claim is that the principle gives writers a *mechanism* for resisting epistemic patterns they would otherwise inherit silently — and that having the mechanism, with visibility into what's in the corpus and what's not, is structurally different from not having it.

### 3.3 The AI bias tradition (Bender et al. 2021; Bommasani et al. 2021; Birhane et al. 2021; Solaiman & Dennison 2021)

The technical AI literature on bias has converged on a documented set of findings: gender bias in generated text, racial bias in classification, geographic and language-dominance bias in linguistic resources, occupational stereotype reproduction, and so on. The "stochastic parrots" critique (Bender, Gebru, McMillan-Major & Mitchell 2021) gives one version of the field-level argument: large language models reflect their training data without understanding it, and the training data carries patterns the models then reproduce.

Mitigation work in this tradition has focused on two layers. **Training-data curation** — filtering, weighting, augmenting the corpus that the model is trained on — operates at the model-development phase and produces durable changes to the model's behavior. **Post-hoc fine-tuning** — adjusting the model's weights or output after pre-training, often through reinforcement learning from human feedback (RLHF) or direct preference optimization — operates after pre-training and shapes the model's behavior on specific tasks or in specific contexts. Both are model-side interventions: they change what the model is.

Corpus Control operates at a different layer. It does not change what the model is; it changes what the *user* is working against. The model's training distribution is not removed; it is supplemented, partially overridden, or recontextualized by the user's curated corpus. The intervention is at the application layer, per-piece, per-writer, revisable in real time.

The contribution claim relative to the AI bias tradition is *not* that Corpus Control replaces training-data curation or fine-tuning. Both of those remain necessary work. The claim is that it adds a layer the field has under-developed: *user-side, per-piece, revisable epistemic agency*. The model-side interventions cannot deliver this — by their nature they apply uniformly to all users — and the prompt-engineering layer cannot deliver it either, because prompts operate within the training distribution rather than alongside or against it.

---

## 4. Corpus Control as a design principle vs. adjacent technical approaches

Three technical approaches address adjacent problems and bear comparison. Each is well-developed in the technical literature; each operates at a different layer than Corpus Control; the layer differences matter.

### 4.1 vs. retrieval-augmented generation (RAG)

RAG (Lewis et al. 2020 and successor work) augments generation with retrieved sources — the model has access not just to its training distribution but also to a defined retrieval corpus. The mechanism is similar to Corpus Control's: a defined source pool, retrieval-against-prompt, integration-into-output.

The framings differ. RAG is a *retrieval optimization*: given a query, find the most semantically relevant material from the retrieval corpus, and use it to ground generation. The optimization target is relevance to the prompt. The retrieval pool is typically administrator-defined; the user types prompts; the system retrieves accordingly.

Corpus Control is an *authorial choice*: given a piece of writing, the writer decides which voices and sources should shape the work, and the system honors that choice. The optimization target is the writer's epistemic stance, not relevance to the prompt. The corpus is writer-defined per piece; the user constructs the corpus as part of authoring; the retrieval that follows operates within the writer's curation rather than independent of it.

The mechanisms can co-exist — Corpus Control can use RAG-style retrieval as one of its engines — but the framings are not interchangeable. RAG locates control with the system administrator and optimizes for query-relevance. Corpus Control locates control with the writer and optimizes for writer-articulated epistemic intent.

### 4.2 vs. fine-tuning

Fine-tuning adjusts the model's weights to shift its behavior. It operates at the model-development or model-deployment layer; it is durable; it applies uniformly to all users of the fine-tuned model. Domain-specific fine-tunes (a medical-writing model, a legal-writing model) and style-specific fine-tunes (a Hemingway-shaped model) are common patterns.

The differences with Corpus Control are structural. Fine-tuning is administrator-controlled and per-deployment; Corpus Control is writer-controlled and per-piece. Fine-tuning's granularity is coarse (a model behaves a way for everyone using it); Corpus Control's granularity is fine (a corpus is constructed per piece, often per section). Fine-tuning is durable; Corpus Control is revisable.

Both can be valuable. Fine-tuning is the right answer for problems that *should* shift uniformly across all users (safety filters, domain-specific terminology consistency, content-policy compliance). Corpus Control is the right answer for problems where users *should* have differentiated epistemic stances (which voices shape my piece versus my colleague's; which sources I'm reading against this week versus last week).

### 4.3 vs. prompt engineering

Prompt engineering — and its more disciplined cousin, structured chain-of-thought prompting (Wei et al. 2022) — attempts to constrain model output through input language. The user crafts the prompt to elicit the desired behavior.

The structural limit of prompt engineering is that prompts operate *within* the training distribution. A prompt cannot bring sources into the corpus that aren't in the training data; it can only ask the model to behave a certain way given what's already there. Stylistic prompts ("write like Hemingway") work to the extent that the model has Hemingway-shaped material in its training distribution; epistemic prompts ("draw on standpoint-theory frameworks") work to the extent that those frameworks are already in the distribution.

Corpus Control operates at a different layer: it changes the source material, not the input language. The writer who wants the AI to draw on a specific archival source can include that source in the corpus, where prompt-engineering alone could only ask the model to "consider" the source's perspective without giving the model access to it. The contribution is structural — the source is *present* — not stylistic.

---

## 5. The Penwright instantiation — three mechanisms

Corpus Control as a design principle is realized in Penwright through three concrete mechanisms.

**Corpus selection.** Writers explicitly assemble the corpus for a piece. The corpus can include published works, unpublished drafts, conversation transcripts, primary documents, archival materials, the writer's own prior work, expert interviews, research notes. Each source carries metadata: provenance, license-tier, attribution requirements, the writer's commentary on what they are using the source for. Influence weights specify how much each source should shape generated material. Counterpositions specify sources the writer is reading *against* rather than drawing *from* — distinct from primary corpus, distinct from absent.

**Attribution visibility.** Every passage of generated text carries provenance. Provenance is multi-level: which sources from the corpus shaped the passage; how literally the passage adopts source material (verbatim, lightly revised, transformed, original-but-influenced); where the writer revised the AI-generated material. The provenance is visible to the writer at draft-time and (in appropriate genres) to the reader at read-time. The visibility is what makes the corpus's role *contestable* — the writer can see whether the corpus is producing the desired influence; the reader can see what shaped the work.

**Source integration.** Source integration is genre-aware. In nonfiction, integration carries citation discipline: explicit attribution at the passage level; the corpus is the work's evidentiary base. In memoir, integration carries experiential grounding: the writer's lived experience is primary, the corpus orients but does not displace; attribution operates at the influence-acknowledgment level rather than the citation level. In fiction, integration carries craft-influence: rhythm, structure, image-vocabulary, dramatic logic; attribution operates at the acknowledgments-and-influences level customary in the genre.

The three mechanisms, taken together, give writers an operationalized form of epistemic agency in AI-augmented writing — a form that is visible, revisable, genre-aware, and present at the application layer rather than the model layer.

---

## 6. Threats to validity

Four threats attend any empirical claim the program makes about Corpus Control's effects.

**6.1 Self-curated corpus reproduces the writer's existing biases.** A corpus chosen by the writer reflects what the writer already knows about and values. If the writer's existing corpus is itself patterned by the same biases the principle is meant to mitigate, Corpus Control may amplify those patterns rather than correct them. Mitigation: counterposition discipline (the Authorship Packet's *counterpositions* field, per Paper 3, requires engagement with sources outside the writer's primary corpus); periodic corpus-diversity reviews via the Reflection Layer; eventual external-rater corpus audits in the longitudinal pilot.

**6.2 The default LLM voice still leaks through.** Corpus Control changes what the model draws from but does not change what the model *is*. The underlying training distribution still influences generation — phrasing tendencies, structural defaults, register patterns. A writer who curates a strong corpus and still receives generation that reads in the model's default voice has only partially achieved the principle's goal. Mitigation: the Voice Preservation & Drift Guard mechanism (per the broader Penwright spec) surfaces deviation from the writer's pre-AI baseline; explicit re-anchoring is required when drift exceeds a threshold. The mitigation is the right shape; instrumentation is in design, not yet shipped.

**6.3 Single-system generalization.** Penwright's Corpus Control Layer is one instantiation of the principle. Findings about its effects may not transfer to other AI writing systems unless adjacent surfaces run analogous mechanisms. Mitigation: theoretical scaffolding that explains why the principle should travel; eventual replication via the Adaptive Authorship Control Kernel as portable substrate.

**6.4 The opt-in problem.** Corpus Control is opt-in by design — writers actively assemble the corpus rather than receiving it from the system. Writers who skip the assembly step fall back to default-LLM behavior, and the principle is achieved in name only for those writers. The empirical record produced by such writers will look like default-LLM output regardless of the surrounding architecture. Mitigation: UX discipline that makes corpus assembly the entry-default for serious authorship work; instrumentation that flags low-corpus-engagement sessions distinctly. The mitigation is structural; its UX implementation is in design.

---

## 7. What production data will adjudicate

Three specific tests, each operationalized against the production data the program will accumulate.

**Test 1: Corpus-selection effects on output characteristics.** *Hypothesis:* outputs generated under a writer-curated corpus differ measurably from outputs generated under default-LLM behavior on indicators sensitive to corpus shape — voice distinctiveness (Originality Index), source-integration patterns (Integration Index), cross-source synthesis quality. *Test:* A/B comparison on the same Authorship Packet under default-corpus vs. writer-curated-corpus, scored against the relevant indices, stratified by genre. *No-world:* default-corpus and curated-corpus outputs are indistinguishable on the relevant indices. *Implication if null:* the principle does not produce the measurable effect it claims; either the mechanism is too weak or the indices do not capture corpus-driven differences.

**Test 2: Attribution visibility effects on writer behavior.** *Hypothesis:* writers who see passage-level attribution at draft-time will accept fewer AI suggestions wholesale and revise more than writers who do not see attribution, holding output quality constant. *Test:* visible-vs-hidden attribution comparison on matched writer cohorts in the longitudinal pilot. *No-world:* attribution visibility does not change writer behavior. *Implication if null:* visibility is a transparency feature without behavioral effect; the principle's contribution narrows to the corpus-selection mechanism only.

**Test 3: Long-term voice preservation under Corpus Control.** *Hypothesis:* writers using Corpus Control over six months will retain measurable voice distinctiveness against their pre-AI baseline, more so than writers in default-LLM-tool conditions. *Test:* longitudinal voice-distinctiveness measurement (Authorial-Voice Index against the writer's baseline) in the external-operator pilot, with the comparison group assembled from matched writers using default-LLM-only tools. *No-world:* voice distinctiveness erodes equivalently across both conditions. *Implication if null:* the load-bearing claim — that Corpus Control protects writer voice over time — is not supported, and the principle's longitudinal value is not what the program has claimed.

The third test is the most consequential and the slowest. It cannot be executed until the external-operator pilot has accumulated at least six months of usage data with both Corpus-Control and default-tool comparison cohorts in place.

---

## 8. What this paper claims (and does not)

The paper claims that Corpus Control is a well-specified design principle with theoretical grounding in standpoint theory, epistemic injustice, and the AI bias literature. The principle is structurally distinct from adjacent technical approaches (RAG, fine-tuning, prompt engineering) — each of which addresses an adjacent problem at a different layer — and the differences are consequential for what the principle can deliver. The paper claims that the principle is operationalized in Penwright through three concrete mechanisms (corpus selection, attribution visibility, source integration) with genre-aware integration. The paper claims that the principle is testable under three production-data tests, the most consequential of which requires the external-operator pilot to deliver before adjudication is possible.

The paper does *not* claim that Corpus Control eliminates the epistemic patterns the AI bias literature has documented. Those patterns operate at the model-training layer and require model-layer intervention; Corpus Control operates at the application layer and addresses a different (though adjacent) problem. The paper does *not* claim that the principle is a complete solution to the displacement of authorial epistemic agency in AI-augmented writing; it is one mechanism in service of that goal, and the paper names complementary mechanisms (Voice Preservation, the Authorship Packet's *counterpositions* field, the Reflection Layer's metacognitive surfaces) that operate in coordination.

The paper claims, finally, that the field's measurement and design surfaces have under-engaged the corpus-control question for structural reasons: default-LLM behavior makes the operative corpus invisible, and what is invisible does not get measured. Surfacing the corpus as a first-class authorial choice is a precondition for measuring what difference corpus selection makes — and the program's commitment to that measurement is what distinguishes it from the broader AI-writing field's current measurement priorities.

---

*Companion artifacts in the AHI program:* `methodology.md` (program-wide methodology); `penwright-paper-03-authorship-packet.md` (Paper 3, Tier-1, the structural input shape); `penwright-paper-04-measurement.md` (Paper 4, Tier-2, the measurement framework); `peer-review.md` (audience-tier 1, peer-review framing); `engineering.md` (audience-tier 2, engineering reviewer's lens); `product.md` (audience-tier 3, product implications). Vision specs at `vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md` and `vela/docs/VISION-PENWRIGHT-MEASUREMENT.md` are the load-bearing internal sources.
