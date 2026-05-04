# Phenomenology Delta Pass — 2026-05-02

**Source:** *Phenomenology of Attention in Post-2010 Theory and AI-Augmented Work* and *Phenomenology of Skill and AI-Augmented Expert Work* (~/Desktop/AI Research/, arrived after the 5-cluster brainstorm). Cross-referenced against `feature-brainstorm-convergence-2026-05-02.md` (14 filed cards) + cluster B/C/E brainstorms. Delta only.

---

## 1. The two underlying concerns, plain language

**Phenomenology of Attention** is about the slow erosion of *the operator's ability to hold a problem*. Not "AI distracts me" — that's the cheap version. The deeper concern — Stiegler's *tertiary retention* and *psychopower* (the system cannibalizing the same attention it exploits), Citton's *exo-attention* (attentional gestures performed outside the body), Hansen's *preconscious modulation* (sensibility shaped before the user feels themselves paying attention), Hayles's *cognitive assemblages* — is that AI is becoming the **default attentional environment**, not a tool inside it. Empirical chorus (Lee 2025: confidence-in-AI inversely correlates with critical thinking; Oh 2026: LLM withdrawal is *infrastructurally* disruptive; Sergeyuk 2026: 2-yr telemetry shows context-switch expansion; Shen & Tamkin 2026: heavy delegation weakens skill formation on unfamiliar libraries) converges: **what AI offloads is not memory or syntax but the iterative acts of traversal, checking, and error-sensing through which sustained reasoning gets built**. Operator pain in their own words: *I ship more, but I'm losing the sense that I'm holding the problem; I can't reconstruct what I just merged.*

**Phenomenology of Skill** is about whether the operator is becoming a better engineer or a better operator-of-an-engineer. Dreyfus (five-stage: novice → competence → proficiency → expertise → mastery; expertise as *absorbed embodied coping*) and Merleau-Ponty (the *body schema* as plastic and task-relative; the blind man's cane as the canonical incorporation case) insist **expertise is not the production of correct artifacts; it is sedimented practical discrimination, formed by repeated exposure to whole situations including their breakdowns**. Post-2024 phenomenology-of-AI (Heersmink: LLMs as cognitive artifacts going *transparent* without *incorporated*; the 2025 *weak-transparency-vs-strong-incorporation* distinction; Schneider-Kamp & Godono's *AI-extended professional self*; Gallagher's *front-loaded phenomenology*) reframes deskilling as: **does the user still undergo the right kinds of situation-disclosing experience?** Pain: *the diff is correct, the reviewer is satisfied — and I no longer feel pulled toward the right next move; solicitation has been replaced by prompt-brokerage plus verification.*

---

## 2. What the existing slate already addresses

| Phenomenological concern | Existing card(s) | Engagement |
|---|---|---|
| Verification has eaten generation (Lee 2025 task-stewardship shift) | DP-75 calibration score; DP-77 sycophancy circuit-breaker | **Partial** — measures claim-vs-state delta but treats verification as a metric, not as a load |
| Withdrawal disruption / infrastructural dependence (Oh 2026) | DP-76 AI-withdrawal probe column | **Partial** — designed as a skill probe, not an attention-recovery probe |
| Sustained reasoning / "holding a problem over time" (the Stiegler/Citton core) | none of the 14 cards | **Surface-only** — DP-79 rupture-clocks measure latency; nothing measures *duration of held attention* |
| Pseudo-expertise / situation-disclosing experience (Dreyfus skill phases) | C #20 (pseudo-apprenticeship detector — Later-tier, not filed); E #21 (scaffolding-vs-substitution skill trace — folded into DP-76) | **Partial** — the right move is named, not yet filed at Now/Next |
| Tool transparency vs. incorporation (Merleau-Ponty / Heersmink) | DP-71 origin marker; DP-78 refusal verb | **Surface-only** — provenance is logged; transparency-of-use is not surfaced as a felt variable |
| Memory-as-power / which prior context the agent saw (Stiegler tertiary retention) | DP-71 origin marker; B #5 memory-continuity flag (folded); E #17 memory-as-power audit log (Later) | **Partial** — the data is logged; the operator surface is missing |
| Mode-switching / register (command vs exploration vs tutor) | B #13 status-card; B #27 mode-boundary indicator (both Later) | **Surface-only** — named, deferred |
| Salience / "field of solicitations" being silently narrowed by AI | none | **Missing** — this is the gap |

Honest score: **the slate engages the verification-and-skill axis well; it does not yet engage the attention-formation or solicitation-narrowing axis at all.** Phenomenology contributes new ground.

---

## 3. What the slate misses — five new features

### DP-88: Sustained-Reasoning Window
**What it does.** Weekly per-operator: longest contiguous window of holding one problem — kanban dwell on one card + IDE focus on related files + *no* dispatch — without firing an agent. Single number on the Board ("longest unmediated reasoning window: 47 min, last week 1h 12m").
**Underlying pain.** *I have lost the felt sense of how long I can think about one thing before I reach for the model.*
**Why it lands.** Stiegler: tertiary retentions either *scaffold* attention or *cannibalize* it. Citton's exo-attention names the externalization. Lee 2025 measured the verification-vs-generation shift; nobody measures unmediated-thinking *duration*. Attention paper's gap statement: "ability to hold a problem over time" is the missing core variable. Devplane already knows the dispatch boundary; measuring *time between dispatches per problem* is a free, unobtrusive proxy.
**Leverage:** high · **Tractability:** high (DP-63 event log has the data).
**Felt user benefit:** the operator sees an honest weekly number for *how long their own thinking ran without scaffold*. Awareness, not optimization — Mike chooses what to do with it.
**Anti-pattern check:** N. Surface-as-data; never tone-modulate by it.

### DP-89: Solicitation Trace
**What it does.** Log the 60-second pre-dispatch window when the operator opens a card in the IDE: files opened, symbols jumped to, lines hovered, text typed/deleted. Mark cards `pre-dispatched` if the agent fires within 60s of card-open. Quarterly: share of cards where operator's *field of relevant possibilities* opened before the agent's did vs. cards where agent went first.
**Underlying pain.** *I no longer notice the moment I would have started thinking; the agent is there before salience forms.*
**Why it lands.** Merleau-Ponty/Dreyfus made operational. Dreyfus's expert is defined by salience-without-deliberation; Merleau-Ponty's body schema makes a *field of solicitations* available before thought. Skill paper: "if AI increasingly selects the relevant code pattern…before the programmer has had to learn to see the situation, then some of the experiential conditions of intuitive expertise may be thinned out." Nothing in the slate measures *who saw the situation first*.
**Leverage:** high · **Tractability:** med (needs IDE telemetry; partial data from Cursor session events).
**Felt user benefit:** the operator can tell whether the week's work was *led by their own seeing* or *led by the agent's framing*. DP-76 tests capability under withdrawal; this measures who saw first under normal conditions. Different diagnosis.
**Anti-pattern check:** N. Pure log; never rendered as warmth or fault.

### DP-90: Restoration Lane
**What it does.** After a sustained AI-heavy session (≥3 dispatches in 90 min, or verification-cost ledger over threshold), Board proposes a typed restorative break — *not* a wellness widget. Three options: (1) unmediated-reading slot (one un-summarized doc, no AI), (2) codebase walk (10 min reading a file the agent didn't touch), (3) fix-without-help (a tiny `solo-only` ticket). Logs which was taken; tracks DP-88 improvement on the next session.
**Underlying pain.** *I finish a heavy AI session and feel hollowed out; I don't know how to recover the conditions for thinking.*
**Why it lands.** Attention paper's third gap is "environmental and restorative" — Kaplan ART and the EEG nature-walk literature have never been connected to AI-heavy work. MetaCues 2026 and Flores-Saviaga AI-timeouts are the design-side; nothing in production puts a restorative move *into the work surface*. DP-79 measures rupture; DP-90 puts recovery against it.
**Leverage:** med · **Tractability:** med.
**Felt user benefit:** the operator has a named, non-cheesy way to come back to themselves after AI-heavy work, with a measurement of whether it worked.
**Anti-pattern check:** N — but DROPPED if any UI copy uses "you've worked hard" or relational framing. Frame: *"in mediated work 90 min — restoration block recommended."*

### DP-91: Front-Loaded Phenomenology Probe
**What it does.** Monthly micro-elicitation card. Five Petitmengin-style stimulated-recall questions on a randomly-chosen recent dispatch: "When did the agent feel transparent vs. obtrusive? When were you drawn to a possibility vs. calculating it? Where did authorship feel unclear? Where did trust rise or fall?" Free-text, stored, embedded; quarterly digest looks for drift in the operator's experiential vocabulary.
**Underlying pain.** *I have no record of the moments where the tool stopped feeling like a tool, or where I stopped feeling like the engineer.*
**Why it lands.** Gallagher's front-loaded phenomenology (PhilPapers GALPAE) is the explicit recommendation in the Skill paper: phenomenological distinctions should *shape* measurement, not decorate post-hoc results. The slate has zero first-person experiential data — DP-75 calibration is third-person; DP-79 is timestamps; DP-76 is performance. This is the only feature on either pass that gives Mike's *experience of the work* a longitudinal record.
**Leverage:** med · **Tractability:** high (5 questions monthly, existing card schema).
**Felt user benefit:** Mike has a record of his own felt sense of work-with-AI over 12 months — whether transparency and obtrusiveness moved together, diverged, or oscillated.
**Anti-pattern check:** N. Probe is operator-private; never shared, never affect-coded.

### DP-92: Whole-Situation Exposure Index
**What it does.** Per ticket-class (refactor, bug-fix, new-feature, code-review, integration), track fraction of cards the operator *saw the whole shape of* — operationally: opened ≥3 files across ≥2 directories before dispatch; read the failing test before the agent; made any edit before the agent. Quarterly per-class index. Pair with DP-76 outcomes to test the Dreyfus prediction.
**Underlying pain.** *I'm shipping more work in domains I'm building less and less situated familiarity with.*
**Why it lands.** Dreyfus: expertise comes from *whole situations*, not from successful outputs. Shen & Tamkin 2026 found heavy delegation weakened skill formation on unfamiliar libraries — this is the operational version turned into a dashboard. The slate measures *did work get done* (calibration) and *can the operator do it solo* (DP-76); it does not measure *did the operator have the kind of exposure that builds intuition*.
**Leverage:** high · **Tractability:** med.
**Felt user benefit:** Mike knows which ticket-classes he's still developing intuition in vs. which he's becoming a pure orchestrator over — categorical readout that DP-76's binary capability cannot give.
**Anti-pattern check:** N.

---

## 4. Methodological critique of the existing slate

There is one. **The slate measures attention-as-event (DP-79 rupture clocks: time-to-suspicion, time-to-localization, time-to-repair) but not attention-as-duration.** Stiegler, Citton, and the Attention paper's gap statement converge: the right unit is not "rupture latency" but "length of time the operator could hold the problem before reaching for the system." DP-79 is a clock-on-failure; what's missing is a clock-on-attention-formation. DP-88 is the fix. *DP-79 is correct as it stands — this is a category the slate did not have, not a defect in it.*

Similarly: DP-75 calibration is third-person verification (did claims hold against repo state). The phenomenology corpus — Gallagher front-loaded, Petitmengin micro-phenomenology, the 2024 *Phenomenology and the Cognitive Sciences* special issue — insists first-person experiential data is methodologically necessary. None of the 14 cards capture first-person data. DP-91 is the minimal addition.

The critique isn't that the slate is wrong; it's that the prior 5-cluster pass was *empirically and behaviorally* framed (cockpit HCI, CSCW, working-alliance, trust-calibration, identity-and-niche). Phenomenology adds the duration and salience axes those clusters did not surface.

---

## 5. Additions to LITERATURE-REVIEW.md (DP-64 input)

Drop these into a new §6 *Phenomenology of attention and skill — the experiential tradition*:

- **Stiegler, B.** *Taking Care of Youth and the Generations* (2010); *Symbolic Misery* (2014). Tertiary retention as pharmakon; psychopower. — *Anchors the duration-of-attention question DP-88 makes operational.*
- **Citton, Y.** *The Ecology of Attention* (Polity, 2017). Endo- vs exo-attention; ecological levels. — *Frames AI as externalization of attentional gestures.*
- **Hansen, M. B. N.** *Feed-Forward* (2015). Media inflecting sensibility outside perceptual consciousness. — *Warrant for pre-dispatch IDE telemetry (DP-89).*
- **Hayles, N. K.** *Unthought* (2017); *Bacteria to AI* (2024). Cognitive assemblages. — *Frame for operator-plus-agent as distributed reasoner.*
- **Williams, J.** *Stand Out of Our Light* (Cambridge, 2018). Attention as ground of practical freedom. — *Ethical frame for operator-as-curator copy (E #14).*
- **Lee, H.-P. et al.** "Impact of Generative AI on Critical Thinking" (Microsoft Research, 2025). 319 workers, 936 use cases. — *Anchor for verification-eats-generation diagnosis.*
- **Oh, S. et al.** AI Withdrawal Diary Study (CSCW 2026). — *Anchor for DP-76's infrastructural-embedding framing.*
- **Sergeyuk, A. et al.** Two-Year Telemetry Study (2026). 800 devs. — *Longitudinal evidence DP-81 needs.*
- **Shen, Z. & Tamkin, A.** Skill Formation under Heavy AI Delegation (2026). — *Empirical support for DP-92.*
- **Heersmink, R. et al.** LLMs as Cognitive Artifacts (*Synthese*, 2024). — *Anchor for transparency-vs-incorporation distinction in DP-91.*
- **Schneider-Kamp, A. & Godono, A.** AI-Extended Professional Self (*AI & Society*, 2025). — *Reference for AI-as-capability-extension frame in DP-92.*
- **Gallagher, S.** *Front-Loaded Phenomenology* (PhilPapers GALPAE). — *Methodological warrant for DP-91.*
- **Petitmengin, C.** *Describing One's Subjective Experience in the Second Person* (2006). — *Method warrant for DP-91 question format.*
- **Dreyfus, H. L.** *What Computers Still Can't Do* (MIT, 1992) + 1980 Berkeley five-stage report. — *Anchor for situation-disclosing-experience claim DP-92 operationalizes.*
- **Merleau-Ponty, M.** *Phenomenology of Perception* (1945, Routledge 2012 trans.). Body schema, operative intentionality, the cane. — *Anchor for tool-transparency vs incorporation.*

---

## 6. Top-3 to file as Now/Next-tier

The prior convergence pass discipline was *file what 3+ clusters independently endorsed*. Phenomenology is single-lens, so the bar shifts: these three fill a category the prior 14 cards leave empty, and each has a clean tractability story.

1. **DP-88 — Sustained-Reasoning Window (Now-tier).** Smallest addition that gives devplane a *duration-of-attention* axis. Data already on DP-63's coordination-event log; build is a rolling-window computation + Board readout. Cleanest answer to the question Mike asked when commissioning DP-85: *what would the operator FEEL different about?* — an honest weekly number for how long they thought about one thing without reaching for the system. Unavailable in any current PM tool; central variable Stiegler/Citton/Lee-2025 converge on. Pairs with DP-79 (DP-79 is failure-latency clock; DP-88 is attention-formation clock — different times, both needed).

2. **DP-91 — Front-Loaded Phenomenology Probe (Now-tier).** Five Petitmengin-style questions, monthly, stored on the card. The slate has zero first-person experiential data; the phenomenology corpus says you cannot answer the skill-formation question without it. Tractability high (no infra beyond card schema); leverage medium-but-irreplaceable. The only feature on either pass that gives Mike a longitudinal record of his own felt sense of the work — which is what peopleanalyst.com's research positioning eventually has to ground.

3. **DP-92 — Whole-Situation Exposure Index (Next-tier).** Next because it depends on DP-76 (withdrawal probe) being live; *whole-situation exposure × solo-capability outcome* is the Dreyfus-prediction test the Skill paper says hasn't been run. DP-89 (Solicitation Trace) needs IDE-telemetry plumbing the slate lacks; DP-90 (Restoration Lane) risks anti-pattern drift if not carefully designed — both go to Later, named.

**Slate after delta:** 14 filed + 3 phenomenology = 17. The 3 cover *attention-as-duration*, *first-person experiential record*, and *whole-situation exposure* — categories the behavioral/empirical clusters of the prior pass had no vocabulary for. That is the entire point of running phenomenology after behaviorism.
