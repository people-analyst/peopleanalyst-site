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

**Context:** The AI–Human Interaction program scaffold ships with this gap explicitly flagged (`literature-map.md` §VI). It is the highest-leverage near-term empirical frontier — drift, sycophancy spirals, evolving rapport, accumulating shared reference, breakdown modes in extended sessions. Almost no literature exists; what does exist is scattered across HCI, AI-safety, conversational-agent design, and clinical psychology of long-term relationships. A focused review is needed before Penwright Paper 8 (longitudinal effects) can engage the right anchors.

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
**Owns:** `content/research/ai-human-interaction/penwright-paper-04-measurement.md`

**Context:** Tier-2 foundational paper of the Penwright Research Program. The vision-document version exists at `vela/docs/VISION-PENWRIGHT-MEASUREMENT.md` (load-bearing internal spec). Paper 4 is the externally-facing, peer-review-shaped version of the same content. The vision doc says *what the framework is*; the paper says *what the framework contributes to the field, against what alternatives, with what evidence*.

**Prompt:** Convert `vela/docs/VISION-PENWRIGHT-MEASUREMENT.md` into a standalone paper at `content/research/ai-human-interaction/penwright-paper-04-measurement.md`. Required sections: abstract, introduction (positioning against existing AI-augmented-skill measurement work — minimal because the literature is sparse; that's the point), the framework itself (six dimensions, six indices, three layers, five-step learning loop), the four failure modes (§13 of the vision doc — non-negotiable veto), measurement-theory positioning (reflective vs formative; latent vs observed), threats to validity, comparison to existing instruments (HCI usability scales, educational-skill assessments, standardized writing rubrics — all of which are wrong for this purpose for specified reasons), what's measurable in v1 and what waits for production data accumulation. Tone: peer-review-shaped but not obsequious. Citations specific. Update `penwright-sub-paper-plan.md` to reflect the converted form. Manifest entry already exists as forthcoming-style report; flip to live with the new path.

**Acceptance:**
- Paper file lands at specified path
- Vision doc still load-bearing internally — paper is the external-facing version, not a replacement
- All four failure modes explicitly carried forward
- Threats-to-validity section included
- Manifest entry added as a `category: "reports"` with `initiative: "penwright-research-program"`, `status: "live"`
- Committed and pushed

**Dependencies:** none (the vision doc is canonical source)

---

### PA-006 — Paper 3 (Authorship Packet Model) — prose draft

**Status:** OPEN
**Category:** paper draft
**Owns:** `content/research/ai-human-interaction/penwright-paper-03-authorship-packet.md`

**Context:** Tier-1 foundational paper of the Penwright Research Program. The vision-document version exists at `vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md` (load-bearing internal spec, with the seven non-negotiable rules in §7). Paper 3 is the externally-facing version — defines the Authorship Packet Model as a structured-input alternative to freeform prompting, and positions it against the existing prompt-engineering, transactive-memory, and translation-theory literatures.

**Prompt:** Convert `vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md` into a standalone paper at `content/research/ai-human-interaction/penwright-paper-03-authorship-packet.md`. Required sections: abstract, introduction (the prompt-engineering dead end), the Authorship Packet Model (intent · structure · key ideas · relevant passages · counterpositions), theoretical positioning (transactive memory, translation theory, cognitive load theory), the seven non-negotiable rules from §7 carried forward verbatim with brief commentary, comparison to alternative input shapes (freeform prompts, structured chain-of-thought, retrieval-augmented generation), threats to validity, what production data will adjudicate. Manifest entry as a `category: "reports"` with `initiative: "penwright-research-program"`, `status: "live"`.

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
**Owns:** `content/research/ai-human-interaction/preregistrations/penwright-paper-05-dependency.md`

**Context:** First OSF preregistration candidate for the Penwright Research Program. Paper 5 (Dependency and Independence in AI-Assisted Writing) tests when AI helps vs. harms writer capability. Pre-registered hypotheses with yes-world / no-world consequences must be specified before data collection begins; formal OSF filing follows once the analysis pipeline is built and a run-in period of Penwright production data is collected.

**Prompt:** Draft a formal preregistration at the specified path, modeled on Vela's `docs/research/preregistrations/study-01.md`. Required sections: study title, version, frozen-at commit, hypotheses (H1, H2, H3... with yes-world / no-world predictions), data sources (Penwright production telemetry — specify which event types and which derived indices), exclusion criteria, analysis plan (specific statistical tests, multiple-comparison correction strategy, pre-registered effect-size thresholds), threats-to-validity register, deviations log section. Genre-aware analysis required (memoir / nonfiction / fiction analyzed separately). The "what's measured" decomposition must reference the Penwright Measurement Framework (PA-005's paper, or the vision doc until then). Manifest entry as `category: "preregistrations"`, `status: "live"`.

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
**Owns:** `content/research/ai-human-interaction/preregistrations/penwright-paper-07-genre-effects.md`

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

**Context:** The AHI program scaffold ships with all four audience-tier slots present in the manifest (general-audience already live via `penwright-paper-01-public`; peer-review, engineering, product all forthcoming). This assignment closes the peer-review slot.

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

**Context:** Closes the engineering audience-tier slot for the AHI program. The Penwright system inside Vela is the primary instrumentation surface; F-19 (Adaptive Authorship Control Kernel) is the architectural spine that all measurement runs through.

**Prompt:** Write the engineering-reviewer's lens on the AHI program at `content/research/ai-human-interaction/engineering.md`. Cover: F-19 architecture (central registry of measurement and intervention; genre-aware fork pattern), the Penwright Measurement Framework's instrumentation requirements, the production-data accumulation discipline, and the verification protocols for treating LLM outputs as evidence rather than answers. Failure modes and stress conditions explicit. ~1500-2500 words. Manifest entry `ai-human-interaction:engineering` flips to `live`.

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

**Context:** Closes the product audience-tier slot. The AHI program's findings (current and projected) imply specific product decisions for Penwright, for the broader Vela substrate, and for adjacent authoring environments.

**Prompt:** Write the product-implications framing of the AHI program at `content/research/ai-human-interaction/product.md`. Each implication must trace to a specific finding, a specific Penwright design decision, or a specific architectural commitment. Cover: what the measurement framework implies for Penwright's interaction design; what the seven non-negotiable rules of authorship (§7 of `vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md`) imply for product roadmap priorities; what the genre-aware behavior pattern (memoir / nonfiction / fiction never collapsed) means for downstream surfaces. Honest about pre-data state. ~1500-2500 words. Manifest entry `ai-human-interaction:product` flips to `live`.

**Acceptance:**
- File at the path
- Each implication traces to a specific design decision or finding (not generic product wishes)
- Honest about pre-data state where applicable
- Manifest entry flipped to `live`
- Committed and pushed

**Dependencies:** PA-005, PA-006 (Paper 4 + Paper 3 prose drafts) preferable but not blocking

---

### PA-009 — External-operator pilot: recruit + onboard 5–10 outside Penwright users

**Status:** OPEN
**Category:** decision · recruitment · long-running
**Owns:** `content/research/ai-human-interaction/protocols/external-operator-pilot.md`

**Context:** Mitigates the auto-ethnography threat-to-validity. The program's principal investigator (Mike) is also Penwright's designer and most active user; this is acceptable for descriptive work but is an explicit threat to the causal claims any of the longitudinal papers (especially Paper 8) need to defend. An external-operator pilot — 5–10 outside Penwright users, recruited, onboarded, and tracked under the same instrumentation — is the load-bearing mitigation. Without it, Paper 8 cannot carry weight beyond auto-ethnography.

**Prompt:** Draft a pilot protocol at the specified path. Required sections: recruitment criteria (writers who would benefit from Penwright; range across memoir / nonfiction / fiction; experience-level diversity), recruitment channels (email lists, writing communities, paid recruitment via Prolific or similar), onboarding flow (account provisioning, instrumentation discipline, expectations setting), data-handling protocol (anonymization, consent, retention), success criteria (target number of writers active 3+ months at the data-collection threshold for Paper 5/7/8 to begin), what the pilot does *not* do (it is not the formal study; it is the data-baseline-builder for the formal study). Then file the recruitment work as concrete next-action assignments (separate from this one). Manifest entry as `category: "preregistrations"` with `slug: "external-operator-pilot-protocol"`.

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

## Magazine initiative — Wave 1 (foundation)

Companion plan: `docs/magazine/PLAN.md` (the strategic + execution plan covering everything the magazine needs to compound). Numbering jumps to PA-100+ for visual separation from the AHI-program ASNs above.

### PA-100 — Voice doc (Mike-authored with AI critic support)

**Status:** OPEN
**Category:** editorial · Mike-fronted (NOT agent-doable end-to-end)
**Owns:** `docs/magazine/VOICE.md` (NEW)

**Context:** Voice is the calibration north-star for every drafting session. Without it, articles drift toward AI-toned prose; with it, the magazine compounds a recognizable register. Vela's analog is `docs/magazine/VELA-MAGAZINE-VOICE.md` (load-bearing). PA's voice is *Mike's* voice, so this isn't an agent-authored task — it's a Mike-drafted spec with AI playing critic during refinement.

**Prompt:** Draft `docs/magazine/VOICE.md` covering:
- How the magazine sounds vs the book vs LinkedIn posts vs a peer-review paper vs a conference talk
- What claims it does and doesn't make (no marketing-toned overreach; no vendor-neutral hand-waving)
- Calibration phrases (e.g., "when in doubt, sound like the principal-issues essay")
- Voice anti-patterns to flag (excessive hedging; jargon-without-explanation; unearned authority claims)
- The "second-person executive" register PA leans on vs the "first-person memoirist" register Vela uses
- Concrete examples: a paragraph of PA-magazine prose, a paragraph of LinkedIn-Mike prose, a paragraph of book-Mike prose, with notes on what makes each register distinctive

**Acceptance:**
- File created at the path
- Voice is *operationalized* — a downstream agent can read this and produce in-register prose for an article
- Includes ≥3 paragraph-length voice examples + commentary
- Committed and pushed

**Dependencies:** none. This unblocks Wave 2.

---

### PA-101 — Column shapes definition + naming

**Status:** OPEN
**Category:** editorial scaffolding
**Owns:** `docs/magazine/COLUMN-SHAPES.md` (NEW)

**Context:** Vela has Mosaic and Constellation as named editorial moves. PA's analog: 2-4 *named shapes* that articles inherit so readers learn what to expect and writers have a discipline that prevents drift. See `docs/magazine/PLAN.md` §2 for candidate shapes.

**Prompt:** Define the column shapes at `docs/magazine/COLUMN-SHAPES.md`. For each shape: name (Mike picks), 2-3 sentence description, structural anatomy (sections / patterns), example pieces from the seed list that fit, voice notes specific to the shape. Initial candidates from PLAN.md: *Research v Field*, *Framework drill-down*, *Case study*, *Cross-portfolio meta-piece*. Mike refines names and adds/removes shapes.

**Acceptance:**
- File at the path
- Each shape has a structural anatomy (so a writer can pattern-match)
- Naming reads as editorial conventions, not technical labels
- Committed and pushed

**Dependencies:** PA-100 (voice doc) preferable but not blocking — shapes can be defined before voice is final.

---

### PA-102 — Source-anchoring schema (relatedResearch / relatedConsulting)

**Status:** OPEN
**Category:** infrastructure · agent-doable
**Owns:** `content/magazine/_meta.ts`, `app/magazine/[slug]/page.tsx`, optional updates to `app/research/arc/[arc]/page.tsx`

**Context:** Articles should bidirectionally link to the research arc / research entry / consulting case they derive from. Each magazine article surface shows its anchors; each arc detail page shows its relevant magazine pieces.

**Prompt:** Extend `MagazineArticle` type in `content/magazine/_meta.ts` with optional fields:
- `relatedResearch?: { product: ProductId; slug: string; arc?: ArcId }[]` — pointers to research-surface entries
- `relatedConsulting?: string[]` — slugs/section refs in `content/consulting/services.md` (or just free text labels)
- `relatedPortfolio?: string[]` — slugs from `content/projects.ts`

Update the existing `rapid-collaborative-impact` entry to populate these (e.g., principal-issues thesis arc, Vela RID/SID work, NYT compensation, PA Platform card). Update `app/magazine/[slug]/page.tsx` to render an "Anchored in" sidebar/section showing the related items as links. Optional bonus: update `app/research/arc/[arc]/page.tsx` to surface a "Magazine pieces in this arc" section listing magazine articles whose `relatedResearch` includes the current arc.

**Acceptance:**
- Schema extended
- `rapid-collaborative-impact` entry populated with anchors
- Article page renders the anchor section
- Typecheck clean
- Committed and pushed

**Dependencies:** none. Agent-doable end-to-end.

---

### PA-103 — Editorial calendar / pipeline-status doc

**Status:** OPEN
**Category:** editorial scaffolding · agent-doable
**Owns:** `docs/magazine/EDITORIAL-CALENDAR.md` (NEW)

**Context:** Per `docs/magazine/PLAN.md` §7, the seed list contains ~17 named pieces with status (D = drafted somewhere; P = polished; S = shipped; F = future). Stand up a tracking doc that's the live source-of-truth for editorial state — what's queued, what's drafting, what's shipped, what's parked.

**Prompt:** Lift the seed-list table from `PLAN.md` §7 into a standalone `docs/magazine/EDITORIAL-CALENDAR.md`. Add: per-piece "next action" column (e.g., "draft from book chapter X," "polish Mar 2026 NYT doc + scrub client confidentiality"), drafting-cadence target (one piece every 2-3 weeks), pipeline-state convention (Ready → Drafting → Polishing → Reviewing → Shipped). Reference back to PLAN.md §7 as the seed-list source-of-truth (not a duplicate; the calendar is the *operational* view).

**Acceptance:**
- File at the path
- Calendar mirrors PLAN.md §7 with operational additions (next-action, cadence target, state convention)
- Committed and pushed

**Dependencies:** none. Agent-doable.

---

## Magazine initiative — Wave 2 (first articles, blocked on PA-100 voice doc)

### PA-110 — First 4S piece: *Science*

**Status:** OPEN — **BLOCKED on PA-100 (voice doc)**
**Category:** article · 4S banner
**Owns:** `content/magazine/4s-science.md` + `_meta.ts` entry

**Context:** Per PLAN.md §7, the *Science* S is the most contested + most under-emphasized + most needs Mike's voice asserting it. The principal-issues essay's §"4S Synthesis" + Mike's broader writing on behavioral-science-at-the-heart establish the thesis; this piece extends and stands alone.

**Prompt:** Draft `content/magazine/4s-science.md` (~3000-5000 words). Source materials: principal-issues essay §"4S Synthesis", relevant book chapters on behavioral science underneath HR analytics, the "people aren't machines" argument, the science-vs-data-science distinction. Use the voice doc (PA-100) as the calibration spec. Use the column shape that fits (likely *Framework drill-down* or whatever PA-101 defines). Add `_meta.ts` entry with: kicker = "4S · Science", appropriate `relatedResearch` (probably principia + AHI program), `relatedConsulting` (the function-build + custom-architecture sections of the consulting page).

**Acceptance:**
- Article file at path
- Voice consistent with PA-100 spec
- Sources anchored via `relatedResearch[]`
- Manifest entry added
- Committed and pushed

**Dependencies:** PA-100 (voice), PA-102 (schema)

---

### PA-111 — NYT Compensation Cycle case study

**Status:** OPEN — **BLOCKED on PA-100 (voice doc)**
**Category:** article · Case study
**Owns:** `content/magazine/nyt-compensation-cycle.md` + `_meta.ts` entry

**Context:** Lowest-effort polish in the seed list — the technical doc was already written (Mar 2026, 11K words). Needs scrub for client confidentiality + reshape for editorial format. Per the consulting-page precedent: scrub the $ figure (already done elsewhere); name the methodology + decision-shape but not internal sums.

**Prompt:** Polish `/Users/mikewest/Desktop/Mike/NYT_AIP_RSU_Technical_Documentation_FINAL.docx` (already at-hand) into a magazine case study at `content/magazine/nyt-compensation-cycle.md`. Trim to 3000-4000 words. Scrub: any specific dollar figures (per consulting-page precedent), specific person names, specific band thresholds. Keep: the methodology (Monte Carlo at population scale + regression surrogate calculators), the structural insight (compensation distribution within ratings drives unit-level cost), the decision shape (scenario 1 vs scenario 2 framing). Voice per PA-100 spec.

**Acceptance:**
- Article file at path; client-confidentiality-scrubbed
- 3000-4000 words
- Manifest entry added with `relatedConsulting` linking to the Decision-support-under-uncertainty section of consulting page
- Committed and pushed

**Dependencies:** PA-100 (voice), PA-102 (schema)

---

### PA-112 — NAV deep-dive

**Status:** OPEN — **BLOCKED on PA-100**
**Category:** article · Framework drill-down
**Owns:** `content/magazine/net-activated-value.md` + `_meta.ts` entry

**Prompt:** Draft a piece on Net Activated Value (NAV) as the single indexable KPI tying human-capital state to dollar outcomes. Source: book chapter + principal-issues essay §"Principal Metric Tying Human Capital To Dollars: NAV". Length 2500-4000 words. Cover: why a single indexable KPI matters; the CAMS framework underneath NAV; ELV calculation; NAV as a thinking tool not an accounting measure; how it surfaces in C-suite conversation. Voice per PA-100.

**Acceptance:**
- Article file at path
- Manifest entry added
- Committed and pushed

**Dependencies:** PA-100, PA-102

---

### PA-113 — Why CAMS

**Status:** OPEN — **BLOCKED on PA-100**
**Category:** article · CAMS banner anchor piece
**Owns:** `content/magazine/why-cams.md` + `_meta.ts` entry

**Prompt:** Draft a 2500-4000 word piece on CAMS — the activation framework — as a self-contained methodology argument. Source: book chapters + principal-issues essay. This is the *anchor* piece for the CAMS banner; subsequent pieces drill down into Capability, Alignment, Motivation, Support individually. Frame: why each of the four conditions matters; why the conjunction (not just one or two) matters; the 8-item survey; the index thresholds (≥70 activated; <60 at-risk).

**Acceptance:**
- Article file at path
- Manifest entry with `kicker = "CAMS"`
- Committed and pushed

**Dependencies:** PA-100, PA-102

---

## Magazine initiative — Wave 3 (Writer's Desk MVP)

### PA-300 — Writer's Desk MVP: 2-3 critic-personas wired into drafting

**Status:** OPEN
**Category:** infrastructure · drafting tool
**Owns:** `.cursor/rules/magazine-critics/*.md` (one per persona) OR `lib/magazine/critics.ts` (saved-prompts module) — implementation detail TBD

**Context:** Per PLAN.md §4, PA's Writer's Desk = single-author + AI as a critic-roster. MVP starts with 2-3 named personas the writer can summon during drafting for targeted feedback.

**Prompt:** Build the MVP critic-roster. Pick 2-3 from PLAN.md §4 candidates: *the skeptical academic measurement-handbook editor*, *the founder reading on a Saturday*, *the smart non-specialist who's never heard of CAMS*, *the data scientist skeptic*, *the bored skeptic*, *the Foucauldian critic*. For each: a saved-prompt that loads the persona's perspective + a calibrated set of failure modes to look for + an output format (e.g., "list 3-7 specific concerns; for each, name the paragraph + the failure mode + a suggested fix"). Wire them so the writer can summon a critic against any draft section in Cursor (likely via `.cursor/rules/` or a saved-prompts file Mike copy-pastes).

**Acceptance:**
- 2-3 personas implemented + tested against the principal-issues essay (does the academic-editor persona surface real concerns?)
- Implementation chosen (Cursor rules / saved-prompts file / lib module)
- Documentation at `docs/magazine/WRITERS-DESK.md` — how to invoke each persona
- Committed and pushed

**Dependencies:** none — orthogonal to articles being drafted

---

### PA-302 — Architectural validation: Penwright kernel hosts critic-roster

**Status:** OPEN — **DEPENDS on PA-300 + Penwright kernel work in vela**
**Category:** architectural research / cross-product
**Owns:** finding documented at `docs/magazine/PENWRIGHT-KERNEL-VALIDATION.md` (NEW)

**Context:** Penwright's Adaptive Authorship Control Kernel (F-19) was designed for memoir/nonfiction/fiction genre-aware behavior. Open question per PLAN.md §4: can the same kernel host a *per-author critic-roster* for analytical writing? If yes, Penwright is more general than its scope. If no, that's a real architectural finding.

**Prompt:** Once PA-300 ships and the Penwright kernel work in vela is far enough along (probably ASN-1106..1108 — kernel schema, registry, adapter PoC), validate whether the critic-roster can be hosted as a kernel-level construct. Try implementing PA-300's critics as kernel registrations. Document what works and what doesn't. Outcome: either fold the critic-roster into Penwright (more general kernel) OR document why it's PA-magazine-specific infrastructure that doesn't generalize.

**Acceptance:**
- Validation attempted
- Finding documented with concrete evidence (works / partial / doesn't)
- If "works" — refactor PA-300 to consume the kernel
- If "doesn't" — finding informs Penwright's scope going forward
- Committed and pushed

**Dependencies:** PA-300 + vela ASN-1106..1108

---

## Magazine initiative — Wave 4+ (filed in PLAN.md §9; not pre-filed as ASNs)

The following are queued but not yet filed as full ASNs in this batch:
- **Corpus substrate work** (lives in vela / meta-factory queues): cross-tag behavioral-science books for PA retrieval, reactivate dormant meta-factory books, targeted acquisition of PA canonical texts, extract dual-grade pipeline to `meta-factory/packages/research-ingest/` (already on vela's research-ingest paradigm rollout — ASN-1000+)
- **Field-Reporting initiative** (PA-400+): protocol + first Field-sourced piece — gated on Mike's commit/park decision per PLAN.md §6
- **Distribution helpers** (PA-200+): LinkedIn cross-post, Medium API integration, unified `npm run magazine:export-distribution` — file when 3+ articles are queued for syndication

---

## Done

*(empty — populate as PA assignments ship)*

---

## Parked

*(empty)*
