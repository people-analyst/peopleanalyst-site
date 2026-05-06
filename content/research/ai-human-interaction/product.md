# Product implications — what the AI–Human Interaction program tells us to build next

*A product strategist's lens on the AHI program's empirical commitments. What the measurement framework, the seven non-negotiable rules of authorship, and the genre-aware behavior pattern imply for Penwright's roadmap and adjacent authoring surfaces — where the product is following findings, where it is making explicit bets ahead of evidence.*

— 2026-05-05

---

## 1. The state of the record, plainly

The AHI program's empirical instruments are partly built and partly designed. Penwright lives inside Vela's repo at `/labs/penwright`; F-03 (the Authorship Packet UI MVP) has shipped; F-19 (the Adaptive Authorship Control Kernel) is the spine that ships first or in parallel with the rest of Wave 1. The Penwright Measurement Framework is specified — six skill dimensions, six derived indices, three measurement layers, a five-step learning loop, four failure modes as veto conditions — but most of its instrumentation is in design, not in production. The empirical record produced to date is auto-ethnography of one writer (the principal investigator). The external-operator pilot (PA-009 in the assignment queue) is the load-bearing mitigation for causal claims; the longitudinal capability claim — *"better writer with Penwright, than without it, in 6 months"* — cannot be tested until at least six months past pilot recruitment. The twelve-paper Penwright Research Program is sequenced; most papers are pre-data.

The product question, given that state, is not *"what features should we build because the data told us to?"* — there is not yet enough data to dictate features. The product question is *"what should we build now that the future data will not require us to tear out?"* That is roadmap discipline in service of an empirical engine, and it is its own discipline.

---

## 2. Implications anchored in the Penwright Measurement Framework

The framework names six derived indices. Each index is simultaneously a research instrument and a product commitment, because the index needs a UI substrate to be measurable at all.

### Writing Quality index — UI must not over-promise

**Architectural commitment:** the Writing Quality index aggregates across argumentation, structure, voice, genre fit, revision, and independence. It is intentionally multi-dimensional, not a single grade.

**Implication:** any UI that surfaces "your writing is improving" or a composite score back to the writer commits the product to defending the index's external validity before any paper has run. A reviewer who sees a "writing quality: 7.3" pill in the UI and then reads in a paper that the index has not been calibrated against expert ratings will conclude the product is over-claiming.

**Concrete action:** keep score-shaped feedback internal to the kernel until the index-against-criterion validation pass lands. External-facing surfaces should show *trajectory* and *patterns* (e.g., "your second drafts have grown structurally tighter this month") rather than absolute scores. The internal kernel tracks the index; the UI carries narrative.

### Independence index — Practice/Constraint Mode is the substrate, and it has to be required, not optional

**Architectural commitment:** the Independence index is measured through transfer-layer evidence — what the writer can do *without* AI scaffolding, captured under Practice Mode and Constraint Mode (per AHI methodology §2.1). Without transfer-layer samples, capability development is indistinguishable from in-system fluency.

**Implication:** if Practice/Constraint Mode is opt-in for longitudinal participants, the cohort that uses it self-selects on the dimension being measured. The instrument loses its claim. The mode has to be *required* — a periodic discipline, not a feature toggle — for any writer in the longitudinal study, including the PI.

**Concrete action:** specify Practice/Constraint Mode as a recurring required event for longitudinal-track participants (e.g., one independent-writing sample every two weeks, with a calendar reminder and a soft-block on Penwright sessions until the sample lands). Document this as part of the pilot onboarding (PA-009). The product cost is real (writers will resist); the measurement cost of skipping it is fatal.

### Integration index — Authorship Packets must make AI contribution legible

**Architectural commitment:** Authorship Packets replace freeform prompting with five structured fields (intent · structure · key ideas · relevant passages · counterpositions) per AHI methodology §2.1. The Integration index measures how AI suggestions are absorbed into final output — incorporated wholesale, integrated with revision, or rejected.

**Implication:** Penwright cannot measure integration if final output is opaque about where AI-shaped passages came from. The product needs to track passage-level provenance — which passages began as AI suggestions, which began as writer typing, which were rewritten across the boundary. Today's UI does not surface this; the underlying data model needs to.

**Concrete action:** instrument passage-level provenance in the document model (writer-original / AI-suggestion-accepted-verbatim / AI-suggestion-revised / AI-suggestion-rejected-and-rewritten). Surface a writer-facing "provenance heatmap" in revision view so writers see their own integration patterns. The instrumentation is a research need; the heatmap is a writer-development affordance derived from it.

### Metacognitive index — the Reflection Layer must be UX-light enough that writers actually do it

**Architectural commitment:** the Reflection Layer prompts the writer to articulate what worked, what didn't, and what to try next, after sessions. The Metacognitive index is downstream of those prompts.

**Implication:** if the prompts feel like homework, writers will skip them or perform compliance — answering what they think is wanted rather than what they noticed. Either failure mode contaminates the index. The Reflection Layer has to feel like a writer's tool (helpful for their own development) before it can be a research instrument (yielding usable signal).

**Concrete action:** ship Reflection Layer in two forms. A *quick* form — single sentence per question, post-session, optional — that captures most of the time. A *deep* form — multi-paragraph, weekly, opt-in — for writers who want to engage further. Compare index signal between the two forms before declaring either the canonical instrument. Honesty about response bias is part of the instrument design, not an afterthought.

### Genre-Awareness index — genre context belongs at every authorship surface

**Architectural commitment:** memoir, nonfiction, and fiction never collapse into a single skill model. F-19 forks copy, schema enums, prompts, and metrics by genre.

**Implication:** every authorship surface (packet builder, draft view, revision tools, reflection prompts) must carry genre context that is set early and visible throughout. A writer working on a memoir in one tab and a nonfiction piece in another should never see them confused — the kernel knows they are different; the UI has to as well, because the prompts the writer receives are different per genre.

**Concrete action:** treat genre as a required field on every Penwright session, displayed in the session header, not buried in metadata. Make genre changes mid-session a deliberate UI gesture (with a confirmation), not an accident. Pre-empt the failure where genre context drifts silently and the writer gets fiction-shaped feedback on a memoir draft.

### Authorial-Voice index — Corpus Control is the spine; corpus choice has to be legible

**Architectural commitment:** the Corpus Control Layer lets writers select sources and influence weights rather than inheriting the LLM's training distribution. The Authorial-Voice index reflects the degree to which output bears the writer's voice rather than the model's.

**Implication:** if writers don't see their corpus choice in the UI, they don't know that the choice is load-bearing. They will accept defaults, and the default is the LLM's training distribution, which is exactly what the Corpus Control Layer was built to displace. The voice index will then measure *the LLM's voice as filtered through individual writers*, which is not what the program claims.

**Concrete action:** make corpus choice a first-class authorship gesture — explicit on session start, visible during drafting, editable mid-session with an effect-on-output preview. Before/after side-by-sides (default model vs curated corpus on the same packet) should be one click away. The Corpus Control Layer is invisible until the UI surfaces it; until then, it is shipping in name only.

---

## 3. Implications anchored in the seven non-negotiable rules of authorship

Per §7 of `vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md` — load-bearing internal spec — the seven rules act as veto conditions on every product decision. Each rule forecloses a category of feature and commits the roadmap to its opposite.

1. **Don't build generic AI writing features.** Forecloses the temptation to copy what other AI-writing products ship (autocomplete-on-everything, suggestion bars, "improve this paragraph" buttons). Commits the roadmap to authorship-specific affordances — packet-shaped composition, corpus-aware drafting, genre-forked prompts.
2. **Don't collapse genre distinctions.** Discussed above. Veto on any UI that treats writing as one thing. Commits the roadmap to per-genre authorship surfaces.
3. **Don't hide source attribution.** Forecloses citation-by-vibe, paraphrase-without-trace, and AI-suggestion absorption without provenance. Commits the roadmap to passage-level provenance (per the Integration index above) and explicit corpus attribution in output.
4. **Don't flatten emotional nuance.** Forecloses any UI that smooths writer voice toward an AI-shaped middle. Commits the roadmap to surfacing voice-distinctiveness as a measurable quantity (the Authorial-Voice index) and to corpus-control as the lever that defends it.
5. **Don't optimize for speed over authorship.** Forecloses output-rate metrics, words-per-minute leaderboards, and "finish faster" affordances. Commits the roadmap to capability-development metrics and longitudinal trajectory feedback over short-cycle productivity feedback.
6. **Don't make AI compliant.** Forecloses sycophantic suggestion patterns and yes-and prompt structures. Commits the roadmap to AI-as-counterpositioner — the *counterpositions* field in the Authorship Packet is the product expression of this rule. AI surfaces should be *willing to disagree* by design.
7. **Don't over-moralize.** Forecloses content-warning bloat, refusal-to-engage on genre material, and lecture-mode framing. Commits the roadmap to treating writers as adults with editorial judgment — the editorial discipline is set by the writer's chosen corpus and genre, not by a global policy layer.

The product implication of having seven rules acting as veto: the roadmap's job is *as much subtractive as additive*. Every quarter, features that drift toward any of the seven failure patterns get cut. The rules are not aspirations; they are filters.

---

## 4. Implications from the genre-aware behavior pattern

Paper 7 (Genre Effects) is load-bearing for the entire program: if AI effects collapse across memoir / nonfiction / fiction, every other paper's genre-aware analysis is over-engineering and the genre fork can be retired. If they don't, the genre fork is structural and adjacent authoring environments that copy Penwright cannot collapse it without first running their own equivalent of Paper 7.

The product is currently committed to the fork. That commitment has UI consequences (above) and architectural consequences for any future authoring surface that wants to share the kernel. *Cross-genre features are the exception that needs justification, not the default.*

**Concrete action:** when a future authoring surface (a Penwright sibling, a Vela editorial tool, a downstream consumer) wants to share F-19, the integration contract should require genre declaration up-front. The kernel refuses to register a measurement event without genre context. This is a small architectural rule with outsized downstream effect — it makes "let's ship a generic version first and add genre later" structurally impossible.

---

## 5. Implications that cut across the framework, the rules, and the genre fork

### External-operator pilot is a product gate, not a research nice-to-have

Until PA-009's pilot data accumulates (5–10 outside Penwright users on the same instrumentation), every causal claim Penwright makes is auto-ethnography. The product cannot ship a "research-backed" framing externally without the pilot's data, and the pilot has to be recruited, onboarded, and tracked under measurement discipline. The pilot is therefore a product workstream with its own surfaces — recruitment landing, onboarding flow, instrumentation discipline, retention pulse — not just a research bullet.

**Concrete action:** treat the pilot as a Q3 product deliverable with the same seriousness as the kernel. The minimum viable surface is a recruitment landing + IRB-clean consent flow + a 30-day onboarding rhythm + a tracked cohort dashboard. Penwright's longitudinal claim cannot ship to the public without it.

### Frozen analytical datasets are owed before any paper files

A paper that cites Penwright telemetry needs a frozen Parquet snapshot pinned to its preregistration SHA. Without that, the empirical record is a moving target and reviewers cannot replicate. The mechanism — periodic Parquet export under a research-program S3 bucket — is well-understood (Vela's Erotic-Writing program has the right shape). The product cost is one cron + one bucket + a snapshot-SHA recording discipline. The paper-blocking cost of skipping it is the entire program.

### Kernel-spec reconciliation (vela ASN-1112) is a paper-blocker

The Penwright Measurement Framework names constructs in `VISION-PENWRIGHT-MEASUREMENT.md`; F-19 has its own naming and shape. Until the reconciliation pass lands, queries against the kernel return one vocabulary while papers reference another. No paper that invokes a framework construct can file before this lands.

---

## 6. What we don't know yet — bets the roadmap is making, not findings

Five places where the AHI roadmap is committed to a direction the research has not yet supported:

**The longitudinal capability claim.** *"Better writer with Penwright, than without it, in 6 months."* This is the load-bearing bet of the program. We don't yet know which writers it holds for, how genre-dependent the effect is, or how the curve shape differs across writer experience levels. The roadmap is built around the bet; the data starts arriving 6+ months past pilot recruitment.

**The Authorship Packet Model vs. freeform prompting.** Penwright bets that structured-input authorship outperforms freeform on capability development (Paper 3 in the twelve-paper plan). Other AI-writing products bet the opposite. Until the comparison is run, both are betting; the asymmetry is that Penwright's bet has structural costs (writers learn the packet) and freeform's bet has none. If the bet loses, the cost was paid for nothing.

**The seven non-negotiable rules as foundational.** The rules are taken as load-bearing internal commitments. But they are themselves bets — bets about what writers want, what produces capability development, and what the field's failure modes are. A bet against rule #5 ("don't optimize for speed over authorship") would say writers prefer speed and the slower path loses commercially. The roadmap is committed to the slower path on the bet that capability-development users exist and persist.

**Genre-fork necessity.** Paper 7 will adjudicate. If genre effects collapse, the fork is over-engineering. The roadmap is committed to the fork; the cost of being wrong is real (more code paths, more test surface) but bounded; the cost of *not* committing and finding out genre matters mid-program is much larger.

**Capability transfer as the right outcome.** The program defines success by transfer-layer evidence — what writers can do without AI scaffolding, six months in. An alternative outcome — writer satisfaction, retention, output volume — would point at different product priorities. The transfer-layer choice is the discipline that distinguishes Penwright from output-optimization products. It is also a bet that there is an audience for it.

The honest framing: each of these is a deliberate bet, taken because shipping the bet is the only way to generate the evidence that would either confirm or correct it. The roadmap's job is not to avoid bets — it is to be clear-eyed about which decisions are bets versus which are findings. This document is the ledger.

---

*Companion artifacts:* `peer-review.md` (audience-tier 1, forthcoming); `engineering.md` (audience-tier 2, shipped 2026-05-05). Vision specs at `vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md` and `vela/docs/VISION-PENWRIGHT-MEASUREMENT.md` are the load-bearing internal sources.
