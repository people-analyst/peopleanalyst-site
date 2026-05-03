# PeopleAnalyst — Agent Assignments

Self-contained assignment queue for the peopleanalyst-site repo. Pattern parallels Vela's `docs/AGENT-ASSIGNMENTS.md`, scaled for a smaller repo.

**ID scheme:** `PA-NNN`. Vela uses `ASN-NNN`; DevPlane uses `DP-NN` for items captured directly there. PA owns the `PA-` prefix. If sub-programs proliferate, sub-prefixes can be added (e.g., `PA-AHI-001` for AI-Human-Interaction-specific).

**DevPlane mirror:** every PA-NNN entry has a corresponding `dp actions` item in the peopleanalyst-site project. Status changes here propagate via `dp actions done <id>` from `/Users/mikewest/peopleanalyst-site`.

**Lifecycle:**
1. **OPEN** — assignment exists, not yet picked up
2. **CLAIMED** — agent in flight (claim before working)
3. **DONE** — committed, pushed, build green, manifest updated where applicable, DP action marked done
4. **PARKED** — paused with reason

**Rules:**
- Each assignment is self-contained (an agent picking it up cold should have what they need).
- Acceptance criteria are explicit.
- File ownership is named where multiple agents could collide.
- Manifest entries (`content/research/_manifest.ts`) flip from `forthcoming` to `live` when an entry's source file lands.

---

## Open assignments

### PA-001 — Long-context emergence: literature review

**Status:** OPEN
**Category:** literature review · highest-leverage frontier zone
**Owns:** `content/research/ai-human-interaction/sources/topic-reviews/long-context-emergence.md`

**Context:** The AI–Human Interaction program scaffold ships with this gap explicitly flagged (`literature-map.md` §VI). It is the highest-leverage near-term empirical frontier — drift, sycophancy spirals, evolving rapport, accumulating shared reference, breakdown modes in extended sessions. Almost no literature exists; what does exist is scattered across HCI, AI-safety, conversational-agent design, and clinical psychology of long-term relationships. A focused review is needed before Loom Paper 8 (longitudinal effects) can engage the right anchors.

**Prompt:** Run a multi-LLM deep-research pass on long-context emergence in conversational AI, following the template in `content/research/ai-human-interaction/methodology.md` §1.1. Topics to cover: drift across long sessions, sycophancy dynamics, evolving rapport / pseudo-relationship formation, breakdown modes (incoherence cascade, persona collapse), and the clinical-psychology adjacencies (transference, idealization, working-alliance development over months). Cite specifics. Flag uncertainty. Save the consolidated review at the path above. Save raw LLM outputs at `sources/syntheses/external-runs/long-context-emergence--<llm>--<YYYYMMDD>.md` if multiple LLMs were used.

**Acceptance:**
- Review file lands at the specified path with provenance header
- Citations specific (author + title + year + page where possible)
- Honest "where you are uncertain" section at the end
- `literature-map.md` updated: ⬜ → ✅ for this entry
- Committed and pushed

**Dependencies:** none

---

### PA-002 — Calibration of personalization: literature review

**Status:** OPEN
**Category:** literature review
**Owns:** `content/research/ai-human-interaction/sources/topic-reviews/calibration-of-personalization.md`

**Context:** Adjacent to existing trust + parasocial reviews but raises distinct questions: paternalism vs. autonomy in personalized AI, when adaptation helps vs. traps the user in a comfortable feedback loop, the difference between *what gets shown* (recommender-system literature) and *how the agent reasons* (conversational AI). Existing reviews don't cover this gap.

**Prompt:** Multi-LLM deep-research pass on calibration of personalization in conversational AI. Anchors: recommender-system filter-bubble literature (Pariser; Bakshy et al.), conversational-AI personalization debates, paternalism-vs-autonomy ethics (Sunstein, Thaler & Sunstein, Conly), comfort-loop dynamics in companion AI. Distinguish *content personalization* from *reasoning personalization*. Save at the path above using the template in `methodology.md` §1.1.

**Acceptance:**
- Review file at specified path with provenance header
- Citations specific
- Distinguishes content vs. reasoning personalization explicitly
- `literature-map.md` updated: ⬜ → ✅
- Committed and pushed

**Dependencies:** none

---

### PA-003 — Developmental psychology of children with AI: commissioning decision

**Status:** OPEN — needs Mike's call before drafting
**Category:** decision
**Owns:** decision document at `content/research/ai-human-interaction/decisions/PA-003-children-with-ai-commissioning.md` (new directory)

**Context:** The roadmap §IV calls out developmental psychology of children with AI as a deep-intersection where genuine theoretical integration is possible — Vygotsky, Piaget, attachment theory, contemporary developmental cognitive neuroscience all directly applicable. But the topic is ethically and politically sensitive enough that drafting a literature review (let alone an empirical study) warrants a program-level decision before agent work begins. Two real risks: (1) the review itself becoming part of a policy argument the program isn't equipped to defend, (2) commissioning empirical work that the program isn't structured to run responsibly.

**Prompt:** Produce a one-page decision memo at the path above. Sections: (1) what a literature review here would cover and what value it would add; (2) what risks the review itself carries — political framing, citation thickets, claims the program may not want to take a public position on; (3) two or three concrete commissioning options ranging from "narrow scoping note + bibliography only" to "full review + position paper"; (4) a recommendation. Mike approves the option before any review work begins.

**Acceptance:**
- Decision memo lands at specified path
- Three commissioning options articulated, each with risk/benefit
- Recommendation is specific (not "it depends")
- Mike sign-off before PA-003 spawns a follow-up review assignment
- Committed and pushed

**Dependencies:** none

---

### PA-004 — Conversation analysis / ethnomethodology: literature review

**Status:** OPEN
**Category:** literature review
**Owns:** `content/research/ai-human-interaction/sources/topic-reviews/conversation-analysis-ethnomethodology.md`

**Context:** The roadmap §IV identifies conversation analysis (Sacks/Schegloff/Jefferson tradition) as a body of fine-grained interaction-analysis machinery the HAI mainstream has barely touched. Some work exists; most of the iceberg is underwater. A focused review would surface what's been done in CA-of-HAI and what micro-structural questions are still open.

**Prompt:** Multi-LLM deep-research pass on conversation analysis applied to human-AI interaction. Anchors: Sacks/Schegloff/Jefferson canonical works, turn-construction-unit analysis, repair sequences, preference organization, the ethnomethodological inheritance (Garfinkel). Flag where CA has been applied to HAI vs. where it has not. Save at the path above.

**Acceptance:**
- Review file at specified path with provenance header
- Distinguishes CA-of-HAI work from CA-on-CA work
- Identifies micro-structural questions the field has not yet asked
- `literature-map.md` updated: ⬜ → ✅
- Committed and pushed

**Dependencies:** none

---

### PA-005 — Paper 4 (Measurement Framework) — prose draft

**Status:** OPEN
**Category:** paper draft
**Owns:** `content/research/ai-human-interaction/loom-paper-04-measurement.md`

**Context:** Tier-2 foundational paper of the Loom Research Program. The vision-document version exists at `vela/docs/VISION-LOOM-MEASUREMENT.md` (load-bearing internal spec). Paper 4 is the externally-facing, peer-review-shaped version of the same content. The vision doc says *what the framework is*; the paper says *what the framework contributes to the field, against what alternatives, with what evidence*.

**Prompt:** Convert `vela/docs/VISION-LOOM-MEASUREMENT.md` into a standalone paper at `content/research/ai-human-interaction/loom-paper-04-measurement.md`. Required sections: abstract, introduction (positioning against existing AI-augmented-skill measurement work — minimal because the literature is sparse; that's the point), the framework itself (six dimensions, six indices, three layers, five-step learning loop), the four failure modes (§13 of the vision doc — non-negotiable veto), measurement-theory positioning (reflective vs formative; latent vs observed), threats to validity, comparison to existing instruments (HCI usability scales, educational-skill assessments, standardized writing rubrics — all of which are wrong for this purpose for specified reasons), what's measurable in v1 and what waits for production data accumulation. Tone: peer-review-shaped but not obsequious. Citations specific. Update `loom-sub-paper-plan.md` to reflect the converted form. Manifest entry already exists as forthcoming-style report; flip to live with the new path.

**Acceptance:**
- Paper file lands at specified path
- Vision doc still load-bearing internally — paper is the external-facing version, not a replacement
- All four failure modes explicitly carried forward
- Threats-to-validity section included
- Manifest entry added as a `category: "reports"` with `initiative: "loom-research-program"`, `status: "live"`
- Committed and pushed

**Dependencies:** none (the vision doc is canonical source)

---

### PA-006 — Paper 3 (Authorship Packet Model) — prose draft

**Status:** OPEN
**Category:** paper draft
**Owns:** `content/research/ai-human-interaction/loom-paper-03-authorship-packet.md`

**Context:** Tier-1 foundational paper of the Loom Research Program. The vision-document version exists at `vela/docs/VISION-LOOM-AUTHORSHIP.md` (load-bearing internal spec, with the seven non-negotiable rules in §7). Paper 3 is the externally-facing version — defines the Authorship Packet Model as a structured-input alternative to freeform prompting, and positions it against the existing prompt-engineering, transactive-memory, and translation-theory literatures.

**Prompt:** Convert `vela/docs/VISION-LOOM-AUTHORSHIP.md` into a standalone paper at `content/research/ai-human-interaction/loom-paper-03-authorship-packet.md`. Required sections: abstract, introduction (the prompt-engineering dead end), the Authorship Packet Model (intent · structure · key ideas · relevant passages · counterpositions), theoretical positioning (transactive memory, translation theory, cognitive load theory), the seven non-negotiable rules from §7 carried forward verbatim with brief commentary, comparison to alternative input shapes (freeform prompts, structured chain-of-thought, retrieval-augmented generation), threats to validity, what production data will adjudicate. Manifest entry as a `category: "reports"` with `initiative: "loom-research-program"`, `status: "live"`.

**Acceptance:**
- Paper file lands at specified path
- Vision doc still load-bearing internally
- Seven non-negotiable rules carried forward verbatim
- Manifest entry added
- Committed and pushed

**Dependencies:** none (the vision doc is canonical source)

---

### PA-007 — Paper 5 (Dependency) — OSF preregistration

**Status:** OPEN
**Category:** preregistration
**Owns:** `content/research/ai-human-interaction/preregistrations/loom-paper-05-dependency.md`

**Context:** First OSF preregistration candidate for the Loom Research Program. Paper 5 (Dependency and Independence in AI-Assisted Writing) tests when AI helps vs. harms writer capability. Pre-registered hypotheses with yes-world / no-world consequences must be specified before data collection begins; formal OSF filing follows once the analysis pipeline is built and a run-in period of Loom production data is collected.

**Prompt:** Draft a formal preregistration at the specified path, modeled on Vela's `docs/research/preregistrations/study-01.md`. Required sections: study title, version, frozen-at commit, hypotheses (H1, H2, H3... with yes-world / no-world predictions), data sources (Loom production telemetry — specify which event types and which derived indices), exclusion criteria, analysis plan (specific statistical tests, multiple-comparison correction strategy, pre-registered effect-size thresholds), threats-to-validity register, deviations log section. Genre-aware analysis required (memoir / nonfiction / fiction analyzed separately). The "what's measured" decomposition must reference the Loom Measurement Framework (PA-005's paper, or the vision doc until then). Manifest entry as `category: "preregistrations"`, `status: "live"`.

**Acceptance:**
- Preregistration file at specified path
- Hypotheses are falsifiable with specified yes-world / no-world consequences
- Genre-aware analysis path specified for each hypothesis where genre is plausibly load-bearing
- Threats-to-validity register included
- Time-stamped, ready for OSF filing once run-in data accumulates
- Manifest entry added
- Committed and pushed

**Dependencies:** PA-005 (preferable but not strictly blocking — the vision doc can serve as the measurement-framework reference until the paper lands)

---

### PA-008 — Paper 7 (Genre Effects) — OSF preregistration

**Status:** OPEN
**Category:** preregistration
**Owns:** `content/research/ai-human-interaction/preregistrations/loom-paper-07-genre-effects.md`

**Context:** Second OSF preregistration candidate. Paper 7 (Genre-Specific Effects of AI Writing Systems) is load-bearing for the rest of the program — if AI effects collapse across memoir / nonfiction / fiction, then collapsed analysis everywhere else is defensible; if they don't, then the genre fork is non-negotiable through the entire program. Pre-registered hypothesis: AI effects are genre-dependent (nonfiction risks shallow argument; memoir risks emotional flattening; fiction risks generic narrative).

**Prompt:** Draft a formal preregistration at the specified path, modeled on Vela's `docs/research/preregistrations/study-01.md`. Same structural template as PA-007. The headline hypothesis is *genre-dependence of AI writing effects* — pre-register specific predictions per genre, with yes-world / no-world consequences. The "no-world" outcome (genre effects do not differ) must be specified clearly enough that it can falsify the program's load-bearing claim. Manifest entry as `category: "preregistrations"`, `status: "live"`.

**Acceptance:**
- Preregistration file at specified path
- Per-genre hypotheses specified (memoir / nonfiction / fiction)
- No-world outcome explicit (what would falsify genre-dependence)
- Threats-to-validity register included
- Time-stamped
- Manifest entry added
- Committed and pushed

**Dependencies:** PA-005 (same as PA-007 — preferable but not blocking)

---

### PA-010 — AHI peer-review framing (audience tier)

**Status:** OPEN
**Category:** research-write-up · audience tier
**Owns:** `content/research/ai-human-interaction/peer-review.md`

**Context:** The AHI program scaffold ships with all four audience-tier slots present in the manifest (general-audience already live via `loom-paper-01-public`; peer-review, engineering, product all forthcoming). This assignment closes the peer-review slot.

**Prompt:** Write a peer-review-shaped framing of the AHI program at `content/research/ai-human-interaction/peer-review.md`. Position the program against the existing literatures named in the topic-review corpus (HCI, CSCW, educational psychology / cognitive apprenticeship, working-alliance theory, transactive memory, niche construction, distributed cognition, phenomenology of skill). Use Namesake's `docs/research/reviews/academic-peer-review.md` (in baby-namer repo) as the structural model. ~1500-2500 words. Threats-to-validity register required (auto-ethnography of PI, single-system generalization, longitudinal-data run-in window). Manifest entry `ai-human-interaction:peer-review` flips from `forthcoming` to `live` once the file lands.

**Acceptance:**
- File at the specified path; tone peer-review-shaped (not promotional)
- Specific cite-able anchors against named literatures
- Threats-to-validity register included
- Genre-aware analysis required where claims involve writing (memoir / nonfiction / fiction not collapsed)
- Manifest entry flipped to `live`
- Committed and pushed

**Dependencies:** PA-005 (Paper 4 measurement) preferable but not blocking — the vision doc can serve as the measurement-framework reference

---

### PA-011 — AHI engineering critique (audience tier)

**Status:** OPEN
**Category:** research-write-up · audience tier
**Owns:** `content/research/ai-human-interaction/engineering.md`

**Context:** Closes the engineering audience-tier slot for the AHI program. The Loom system inside Vela is the primary instrumentation surface; F-19 (Adaptive Authorship Control Kernel) is the architectural spine that all measurement runs through.

**Prompt:** Write the engineering-reviewer's lens on the AHI program at `content/research/ai-human-interaction/engineering.md`. Cover: F-19 architecture (central registry of measurement and intervention; genre-aware fork pattern), the Loom Measurement Framework's instrumentation requirements, the production-data accumulation discipline, and the verification protocols for treating LLM outputs as evidence rather than answers. Failure modes and stress conditions explicit. ~1500-2500 words. Manifest entry `ai-human-interaction:engineering` flips to `live`.

**Acceptance:**
- File at the path
- Specific architectural choices named with their trade-offs
- Failure modes explicit (kernel-registry drift, instrumentation latency, missing-data-window handling)
- Manifest entry flipped to `live`
- Committed and pushed

**Dependencies:** none

---

### PA-012 — AHI product implications (audience tier)

**Status:** OPEN
**Category:** research-write-up · audience tier
**Owns:** `content/research/ai-human-interaction/product.md`

**Context:** Closes the product audience-tier slot. The AHI program's findings (current and projected) imply specific product decisions for Loom, for the broader Vela substrate, and for adjacent authoring environments.

**Prompt:** Write the product-implications framing of the AHI program at `content/research/ai-human-interaction/product.md`. Each implication must trace to a specific finding, a specific Loom design decision, or a specific architectural commitment. Cover: what the measurement framework implies for Loom's interaction design; what the seven non-negotiable rules of authorship (§7 of `vela/docs/VISION-LOOM-AUTHORSHIP.md`) imply for product roadmap priorities; what the genre-aware behavior pattern (memoir / nonfiction / fiction never collapsed) means for downstream surfaces. Honest about pre-data state. ~1500-2500 words. Manifest entry `ai-human-interaction:product` flips to `live`.

**Acceptance:**
- File at the path
- Each implication traces to a specific design decision or finding (not generic product wishes)
- Honest about pre-data state where applicable
- Manifest entry flipped to `live`
- Committed and pushed

**Dependencies:** PA-005, PA-006 (Paper 4 + Paper 3 prose drafts) preferable but not blocking

---

### PA-009 — External-operator pilot: recruit + onboard 5–10 outside Loom users

**Status:** OPEN
**Category:** decision · recruitment · long-running
**Owns:** `content/research/ai-human-interaction/protocols/external-operator-pilot.md`

**Context:** Mitigates the auto-ethnography threat-to-validity. The program's principal investigator (Mike) is also Loom's designer and most active user; this is acceptable for descriptive work but is an explicit threat to the causal claims any of the longitudinal papers (especially Paper 8) need to defend. An external-operator pilot — 5–10 outside Loom users, recruited, onboarded, and tracked under the same instrumentation — is the load-bearing mitigation. Without it, Paper 8 cannot carry weight beyond auto-ethnography.

**Prompt:** Draft a pilot protocol at the specified path. Required sections: recruitment criteria (writers who would benefit from Loom; range across memoir / nonfiction / fiction; experience-level diversity), recruitment channels (email lists, writing communities, paid recruitment via Prolific or similar), onboarding flow (account provisioning, instrumentation discipline, expectations setting), data-handling protocol (anonymization, consent, retention), success criteria (target number of writers active 3+ months at the data-collection threshold for Paper 5/7/8 to begin), what the pilot does *not* do (it is not the formal study; it is the data-baseline-builder for the formal study). Then file the recruitment work as concrete next-action assignments (separate from this one). Manifest entry as `category: "preregistrations"` with `slug: "external-operator-pilot-protocol"`.

**Acceptance:**
- Protocol file at specified path
- Recruitment criteria + channels specified
- Consent + anonymization protocol drafted
- Pilot vs. formal-study boundary explicit
- Follow-up recruitment assignments filed (PA-010+)
- Manifest entry added
- Committed and pushed

**Dependencies:** none — but PA-007 and PA-008 preregistrations should land first so the pilot knows what data shape to capture

---

## Lifecycle helpers

```bash
# List open actions for PA
/Users/mikewest/devplane/bin/dp.js actions /Users/mikewest/peopleanalyst-site

# Add a new action when filing a new PA-NNN
cd /Users/mikewest/peopleanalyst-site && /Users/mikewest/devplane/bin/dp.js actions add "PA-NNN — short title" --cat=<category>

# Mark an action done after PA-NNN ships
cd /Users/mikewest/peopleanalyst-site && /Users/mikewest/devplane/bin/dp.js actions done <action-id>

# Project status
/Users/mikewest/devplane/bin/dp.js status /Users/mikewest/peopleanalyst-site
```

---

## Done

*(empty — populate as PA assignments ship)*

---

## Parked

*(empty)*
