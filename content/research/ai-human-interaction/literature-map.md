# AI–Human Interaction — literature map

Index of the assembled secondary literature for the program. Organized by the twelve-branch HAI field map (see `roadmap.md` §I), with frontier-zone annotations. Status reflects what is in `sources/` as of 2026-05-03.

**Status legend:**
- ✅ — review present in `sources/topic-reviews/`
- 🔁 — multi-LLM synthesis present in `sources/syntheses/`
- 🟡 — queued for next pass
- ⬜ — gap, not yet attempted

---

## I. The twelve HAI branches

### 1. Interface and interaction design
Conversational UX, prompt design, multimodal I/O, latency, turn-taking. Foundational lineage: Nielsen, Norman, extended into the LLM era.

- ✅ *Conversational AI interaction design after 2021* — [`sources/topic-reviews/conversational-ai-interaction-design-after-2021.md`](sources/topic-reviews/conversational-ai-interaction-design-after-2021.md)

### 2. Trust and reliance calibration
Automation bias, algorithmic aversion, the aversion-to-appreciation arc, trust-recovery dynamics. Anchors: Lee & See (2004), Parasuraman, Logg.

- ✅ *Trust calibration and reliance under varying AI reliability in software work* — [`sources/topic-reviews/trust-calibration-and-reliance-under-varying-ai-reliability-in-software-work.md`](sources/topic-reviews/trust-calibration-and-reliance-under-varying-ai-reliability-in-software-work.md)

### 3. Explainability and interpretability (XAI)
LIME, SHAP, counterfactuals, mechanistic interpretability. Tension: technical interpretability vs. human-meaningful explanation.

- ✅ *Explainability and interpretability for AI code generation* — [`sources/topic-reviews/explainability-and-interpretability-for-ai-code-generation.md`](sources/topic-reviews/explainability-and-interpretability-for-ai-code-generation.md)

### 4. Human-AI collaboration and teaming
Complementarity, division of labor, handoff dynamics, "centaur" workflows. Anchors: Shneiderman's HCAI framework.

- ✅ *Organizational and sociotechnical embedding of AI coding agents* — [`sources/topic-reviews/organizational-and-sociotechnical-embedding-of-ai-coding-agents.md`](sources/topic-reviews/organizational-and-sociotechnical-embedding-of-ai-coding-agents.md)
- ✅ *Distributed cognition for AI-augmented professional work* — [`sources/topic-reviews/distributed-cognition-for-ai-augmented-professional-work.md`](sources/topic-reviews/distributed-cognition-for-ai-augmented-professional-work.md)
- 🔁 *Stigmergic coordination* — [`sources/syntheses/stigmergic-coordination.md`](sources/syntheses/stigmergic-coordination.md)
- 🔁 *Coordination-failure evidence in multi-agent LLM systems* — [`sources/syntheses/coordination-failure-multi-agent-llm.md`](sources/syntheses/coordination-failure-multi-agent-llm.md)

### 5. Alignment and value learning
RLHF, constitutional methods, preference learning, debate, recursive reward modeling. Intersects moral philosophy and social choice theory.

- ⬜ Not yet drafted (lower priority for this program — alignment work is well-funded elsewhere; this program's contribution is downstream of alignment).

### 6. Social and parasocial dynamics
Anthropomorphism (Epley, Waytz, Cacioppo), CASA paradigm (Reeves & Nass), companionship AI, parasocial attachment.

- ✅ *Parasocial dynamics, companion AI, and emotional engagement in extended human-AI interaction* — [`sources/topic-reviews/parasocial-dynamics-companion-ai-and-emotional-engagement-in-extended-human-ai-interaction.md`](sources/topic-reviews/parasocial-dynamics-companion-ai-and-emotional-engagement-in-extended-human-ai-interaction.md)

### 7. Cognitive effects of AI use
Cognitive offloading, the "Google effect" extended to LLMs, deskilling, learning effects, metacognitive calibration.

- ✅ *Longitudinal cognitive effects and skill change in AI-assisted programming* — [`sources/topic-reviews/longitudinal-cognitive-effects-and-skill-change-in-ai-assisted-programming.md`](sources/topic-reviews/longitudinal-cognitive-effects-and-skill-change-in-ai-assisted-programming.md)
- ✅ *Cognitive apprenticeship, ZPD, and AI as a more-knowledgeable other* — [`sources/topic-reviews/cognitive-apprenticeship-zpd-and-ai-as-a-more-knowledgeable-other.md`](sources/topic-reviews/cognitive-apprenticeship-zpd-and-ai-as-a-more-knowledgeable-other.md)
- 🔁 *Ironies of automation in AI coding-agent supervision* — [`sources/syntheses/ironies-of-automation-coding-agent-supervision.md`](sources/syntheses/ironies-of-automation-coding-agent-supervision.md)
- 🔁 *Risk compensation outside automotive safety* — [`sources/syntheses/risk-compensation-outside-automotive-safety.md`](sources/syntheses/risk-compensation-outside-automotive-safety.md)

### 8. Affective computing
Emotion recognition, emotional expression by AI, emotion regulation. Anchors: Picard.

- ⬜ Not yet drafted (Vela's emotion-corpus expansion at `vela/docs/research/emotion-corpus-expansion/` overlaps; cross-link rather than duplicate).

### 9. Fairness, accountability, transparency, ethics (FAccT)
Bias auditing, fairness criteria, governance, contestability, harm taxonomies. Strong intersections with critical algorithm studies.

- ✅ *Feminist epistemology, standpoint theory, and AI knowledge production* — [`sources/topic-reviews/feminist-epistemology-standpoint-theory-and-ai-knowledge-production.md`](sources/topic-reviews/feminist-epistemology-standpoint-theory-and-ai-knowledge-production.md)
- ✅ *Political philosophy and democratic theory of AI after 2018* — [`sources/topic-reviews/political-philosophy-and-democratic-theory-of-ai-after-2018.md`](sources/topic-reviews/political-philosophy-and-democratic-theory-of-ai-after-2018.md)

### 10. Embodied and situated interaction
Social robotics, AR/VR agents, ambient AI. Anchors: Breazeal, presence and proxemics with non-human agents.

- ⬜ Not yet drafted (lower priority — not the program's near-term empirical surface).

### 11. Creativity and co-creation
AI as creative collaborator. Stylistic-homogenization debate, ideation vs. execution support.

- ✅ *Creativity, ideation, and co-creation with AI* — [`sources/topic-reviews/creativity-ideation-and-co-creation-with-ai.md`](sources/topic-reviews/creativity-ideation-and-co-creation-with-ai.md)
- ✅ *Aesthetics of AI-generated art and AI-augmented practice* — [`sources/topic-reviews/aesthetics-of-ai-generated-art-and-ai-augmented-practice.md`](sources/topic-reviews/aesthetics-of-ai-generated-art-and-ai-augmented-practice.md)

### 12. Persuasion, influence, and information ecosystem effects
AI's effects on beliefs, decisions, voting, purchasing; downstream collective epistemology.

- ✅ *Persuasion, belief change, and AI's epistemic effects on users* — [`sources/topic-reviews/persuasion-belief-change-and-ais-epistemic-effects-on-users.md`](sources/topic-reviews/persuasion-belief-change-and-ais-epistemic-effects-on-users.md)

---

## II. Frontier zones (across branches)

### Longitudinal interaction
- ✅ *Longitudinal cognitive effects and skill change in AI-assisted programming* (cross-listed under Branch 7)

### Multi-party configurations
- 🔁 *Coordination-failure in multi-agent LLM systems* (cross-listed under Branch 4)
- 🔁 *Stigmergic coordination* (cross-listed under Branch 4)

### Long-context emergence
- ⬜ Gap. Likely the highest-leverage frontier zone for empirical work in 2026; needs a dedicated review.

### Calibration of personalization
- ⬜ Gap. Adjacent to Branches 2 (trust) and 6 (parasocial); needs a dedicated review.

### Cross-cultural and multilingual interaction
- ✅ *Indigenous and non-Western relational ontologies in AI ethics and human-AI interaction* — [`sources/topic-reviews/indigenous-and-non-western-relational-ontologies-in-ai-ethics-and-human-ai-interaction.md`](sources/topic-reviews/indigenous-and-non-western-relational-ontologies-in-ai-ethics-and-human-ai-interaction.md)
- ✅ *Communication accommodation theory in human-AI interaction* — [`sources/topic-reviews/communication-accommodation-theory-in-human-ai-interaction.md`](sources/topic-reviews/communication-accommodation-theory-in-human-ai-interaction.md)

### Sociotechnical embedding
- ✅ *Organizational and sociotechnical embedding of AI coding agents* (cross-listed under Branch 4)
- ✅ *Institutional economics of AI and the reorganization of work and knowledge production* — [`sources/topic-reviews/institutional-economics-of-ai-and-the-reorganization-of-work-and-knowledge-production.md`](sources/topic-reviews/institutional-economics-of-ai-and-the-reorganization-of-work-and-knowledge-production.md)

### Failure modes and recovery
- ✅ *Rupture and repair in human-AI coding interaction* — [`sources/topic-reviews/rupture-and-repair-in-human-ai-coding-interaction.md`](sources/topic-reviews/rupture-and-repair-in-human-ai-coding-interaction.md)
- ✅ *Working alliance and rupture-repair from psychotherapy to human-AI interaction* — [`sources/topic-reviews/working-alliance-and-rupture-repair-from-psychotherapy-to-human-ai-interaction.md`](sources/topic-reviews/working-alliance-and-rupture-repair-from-psychotherapy-to-human-ai-interaction.md)

---

## III. Adjacent fields imported (Roadmap §III)

These are the bodies of theory the HAI mainstream has under-engaged. The Penwright Research Program (Track A) draws materially from this set; Track B is built around bringing it forward.

- ✅ *Companion-species and ethology of working partnerships* — [`sources/topic-reviews/companion-species-and-ethology-of-working-partnerships.md`](sources/topic-reviews/companion-species-and-ethology-of-working-partnerships.md)
- ✅ *Cognitive apprenticeship, ZPD, and AI as a more-knowledgeable other* (cross-listed under Branch 7)
- ✅ *Translation and interpreting studies for AI as a translator of domains and registers* — [`sources/topic-reviews/translation-and-interpreting-studies-for-ai-as-a-translator-of-domains-and-registers.md`](sources/topic-reviews/translation-and-interpreting-studies-for-ai-as-a-translator-of-domains-and-registers.md)
- ✅ *Working alliance and rupture-repair from psychotherapy to human-AI interaction* (cross-listed under Failure modes)
- ✅ *Distributed cognition for AI-augmented professional work* (cross-listed under Branch 4)
- ✅ *Niche construction theory: feedback between organisms and environments* — [`sources/topic-reviews/niche-construction-theory-feedback-between-organisms-and-environments.md`](sources/topic-reviews/niche-construction-theory-feedback-between-organisms-and-environments.md)
- ✅ *Communication accommodation theory in human-AI interaction* (cross-listed under cross-cultural)
- ✅ *Improv theatre and ensemble performance for human-AI dialogue and collaboration* — [`sources/topic-reviews/improv-theatre-and-ensemble-performance-for-human-ai-dialogue-and-collaboration.md`](sources/topic-reviews/improv-theatre-and-ensemble-performance-for-human-ai-dialogue-and-collaboration.md)
- ✅ *Institutional economics of AI and the reorganization of work and knowledge production* (cross-listed under sociotechnical)
- ✅ *Phenomenology of skill and AI-augmented expert work* — [`sources/topic-reviews/phenomenology-of-skill-and-ai-augmented-expert-work.md`](sources/topic-reviews/phenomenology-of-skill-and-ai-augmented-expert-work.md)
- ✅ *Phenomenology of attention in post-2010 theory and AI-augmented work* — [`sources/topic-reviews/phenomenology-of-attention-in-post-2010-theory-and-ai-augmented-work.md`](sources/topic-reviews/phenomenology-of-attention-in-post-2010-theory-and-ai-augmented-work.md)
- 🔁 *Transactive memory in human-AI teams* — [`sources/syntheses/transactive-memory.md`](sources/syntheses/transactive-memory.md)
- ✅ *Ritual studies and non-human agents for long-term human-AI use* — [`sources/topic-reviews/ritual-studies-and-non-human-agents-for-long-term-human-ai-use.md`](sources/topic-reviews/ritual-studies-and-non-human-agents-for-long-term-human-ai-use.md)

---

## IV. Deep intersections (Roadmap §IV)

Bodies of research where genuine theoretical integration is possible — not just analogy.

- 🟡 Developmental psychology of children with AI — queued (B5 in `program.md`)
- ✅ *Disability studies, crip theory, and AI as access infrastructure* — [`sources/topic-reviews/disability-studies-crip-theory-and-ai-as-access-infrastructure.md`](sources/topic-reviews/disability-studies-crip-theory-and-ai-as-access-infrastructure.md)
- ✅ *Feminist epistemology, standpoint theory, and AI knowledge production* (cross-listed under Branch 9)
- ✅ *Indigenous and non-Western relational ontologies* (cross-listed under cross-cultural)
- ✅ *Psychoanalytic theory for human-AI working alliance measurement* — [`sources/topic-reviews/psychoanalytic-theory-for-human-ai-working-alliance-measurement.md`](sources/topic-reviews/psychoanalytic-theory-for-human-ai-working-alliance-measurement.md)
- ✅ *History of mediation technologies and AI* — [`sources/topic-reviews/history-of-mediation-technologies-and-ai.md`](sources/topic-reviews/history-of-mediation-technologies-and-ai.md)
- ✅ *Memory, mourning, and digital remains* — [`sources/topic-reviews/memory-mourning-and-digital-remains.md`](sources/topic-reviews/memory-mourning-and-digital-remains.md)

---

## V. Cross-LLM syntheses (the verifying layer)

These six documents take the secondary reviews above and re-check substantive claims against primary sources, with explicit claim-status tagging (A/B/C/D — see `methodology.md` §1.2).

- 🔁 *Stigmergic Coordination* — [`sources/syntheses/stigmergic-coordination.md`](sources/syntheses/stigmergic-coordination.md)
- 🔁 *Coordination-Failure Evidence in Multi-Agent LLM Systems* — [`sources/syntheses/coordination-failure-multi-agent-llm.md`](sources/syntheses/coordination-failure-multi-agent-llm.md)
- 🔁 *Ironies of Automation in AI Coding-Agent Supervision* — [`sources/syntheses/ironies-of-automation-coding-agent-supervision.md`](sources/syntheses/ironies-of-automation-coding-agent-supervision.md)
- 🔁 *Risk Compensation Outside Automotive Safety* — [`sources/syntheses/risk-compensation-outside-automotive-safety.md`](sources/syntheses/risk-compensation-outside-automotive-safety.md)
- 🔁 *Transactive Memory* — [`sources/syntheses/transactive-memory.md`](sources/syntheses/transactive-memory.md)
- 🔁 *CMU Faculty-Mapping Documents* — [`sources/syntheses/cmu-faculty-mapping.md`](sources/syntheses/cmu-faculty-mapping.md) (program-design adjacency rather than topic synthesis)

---

## VI. What's missing — honest gaps

- **Long-context emergence** — no dedicated review yet (drift, sycophancy spirals, evolving rapport, breakdown modes in extended sessions). Highest-leverage near-term frontier.
- **Calibration of personalization** — no dedicated review yet. Adjacent to existing trust + parasocial reviews but raises distinct paternalism-vs-autonomy questions.
- **Developmental psychology of children with AI** — queued; ethically and politically sensitive enough to warrant a program-level decision before commissioning a review.
- **Embodied / situated interaction** — not yet attempted; lower priority for this program's near-term empirical surface.
- **Alignment and value learning** — explicitly out of scope; well-covered elsewhere.
- **Affective computing** — Vela's `emotion-corpus-expansion/` covers adjacent ground; cross-link rather than duplicate.
- **Conversation analysis and ethnomethodology** — Sacks/Schegloff/Jefferson tradition mentioned in the roadmap (§IV); no dedicated review yet.

---

## Cross-references

- `roadmap.md` — the field-mapping document this map is indexed against
- `program.md` — the twelve-paper Penwright Research Program drawing from this literature
- `methodology.md` — how the reviews and syntheses were generated
- `vela/docs/research/emotion-corpus-expansion/` — adjacent program at Vela; affective-computing overlap
