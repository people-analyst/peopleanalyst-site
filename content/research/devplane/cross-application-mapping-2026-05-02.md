# Cross-App Convergent-Feature Mapping — Vela × Meta-Factory

**Date:** 2026-05-02
**Sources:** `docs/research/feature-brainstorm-convergence-2026-05-02.md`, `docs/research/ai-research-synthesis.md`
**Scope:** Read-only inventory of two portfolio apps. Decide which devplane convergent features adapt cleanly, which apply across all three, and which should not be force-fit.

The discipline carried from devplane: vela and meta-factory are MORE consumer-facing than devplane, so warmth / relational-identity / companion-framing prohibitions are stricter, not looser. Several features that fit devplane's operator-cockpit shape do not fit a customer-facing reading surface or a batch-extraction substrate.

---

## 1. Vela — production reading platform with AI under the hood

**Repo:** `/Users/mikewest/vela/` (Next.js 16, Supabase, Anthropic SDK, ~96 admin pages)
**Scan:** ~69 files importing `@anthropic-ai/sdk`. Claim-audit, copilot, editorial QA roles, factory pipelines, knowledge extraction, biographic monologue, fiction generation, atlas briefing, museum enrichment, reflection copy.

### AI surface inventory

1. **Claim audit pipeline** (`lib/audit/`): claim-extractor → retrieve → verdict → publish-gate. Verdict enum {supported, complicated, contradicted, uncertain, unaudited}; gates publishing under `AUDIT_GATE_PUBLISH=strict`.
2. **Editorial QA roles** (`lib/qa/editorial/roles/`): nine specialized reviewer roles (continuity, art-direction, series-arc, typography, visual-rhythm, palette-consistency, magazine-layout, image-text…) running independently per artifact.
3. **Copilot proposal engine** (`lib/copilot/`): typed proposals with status lifecycle `draft|accepted|rejected|ignored` + curator_notes. Half-built standpoint pill.
4. **Voice / writer-retrieval lens** (`lib/platform/writer-retrieval/`, `lib/qa/voice/`): voice-rewriter, plagiarism-critic, voice-score per writer.
5. **Knowledge extractor + merge queue** (`lib/knowledge/`): entity extraction with merge decisions; closest analog to devplane's approval gate.
6. **Reincarnation player reflection** (`lib/player/reflection-claude.ts`): customer-facing pattern copy at end-of-sequence — high-stakes warmth surface.
7. **Fiction story generator** (`lib/fiction/story-generator.ts`): personalized agent-authored fiction.
8. **Biographic monologue generator** (`lib/biographic/`): in-voice monologues for real historical writers (Baldwin, Karr, etc.). Most identity-fragile surface in the portfolio.
9. **Atlas briefing + factory runner** (`lib/atlas/`, `lib/factory/runner.ts`): briefing synthesis + downstream batch derivative production with cost ledger.
10. **Agent-decision log** (`lib/qa/agent-decision-log.ts`): autonomy tier {proposed|review-before-ship|audit-sample|trusted}, decision_type, outcome, rollback. Already most of devplane's coordination-event log shape.

### User-facing pain per surface

1. Claim audit: members read essays whose claims silently failed audit; gate is loose by default.
2. Editorial roles: nine score the same artifact independently; conflicts unsurfaced.
3. Copilot: curator faces a flat list; no confidence/grounding distinction.
4. Voice audit: drift from a writer's actual register slips through; no per-byline drift memory.
5. Knowledge merge: plausible-sounding merges conflate distinct entities.
6. Reincarnation reflection: warmth-tuned summary that flatters rather than describes; no origin marker.
7. Fiction: customer reads agent-written fiction without knowing it's agent-written; model swap mid-series drifts voice silently.
8. Biographic monologue: Baldwin "speaks" something Baldwin would not say; refusals list isn't enforced as a typed event.
9. Atlas briefing: shipped with confident tone whose evidence is thin.
10. Agent-decision log: trusted-tier agents drift toward more autonomy without silent-acceptance check.

### Convergent features that apply to vela

| Feature | Why it lands here | User benefit | Size | DP-substrate dep |
|---|---|---|---|---|
| **Origin marker (DP-71)** | Vela ships agent-authored customer-touching text; closed-loop risk is stronger here than devplane | Member sees AI-assisted / human-authored / human-edited pill on artifacts | M | No |
| **Multi-axis reviewer (DP-68)** | The 9 roles + claim-audit + voice-score IS a multi-axis reviewer scattered across tables | One reviewer card per article, all axes; minority objection surfaces | M | Yes — adopt schema |
| **Calibration score (DP-75)** on copilot/extractor | Accept/reject signal already exists; ratio is free | Per-extractor reliability number | S | No |
| **Skopos brief + rephrase (DP-74)** | Atlas already produces a brief; missing piece is "what I understood" before generation | Editor catches misunderstandings before 1200-word monologue is generated | M | Partial |
| **Sycophancy circuit-breaker (DP-77)** | Reflection-claude is the most sycophancy-prone surface in the portfolio (warmth copy *about the user*) | Reflection copy describes rather than flatters; contrarian re-pass after streaks | S–M | No |
| **Halt-and-surface (DP-84)** | No first-class halt verb today | Editor inbox for "agent flagged this" | S | No |
| **Briefing template log (DP-70)** | Atlas, fiction, monologue, 9 roles — ad-hoc versioning today | Sees which prompt versions actually work | M | No |
| **Rupture-repair (DP-79)** | `agent_decisions.outcome=rolled_back` exists; add type/clock/repair_path | Distinguishes rework strategies longitudinally | S | No |
| AI-withdrawal baseline (DP-76) | Could author Karr / Baldwin without AI for comparison | Knows whether AI-Karr is recognizable as Karr | L | No |
| Refusal verb (DP-78) | Dossier §6 refusals → typed event | Refusal as positive signal | S | Yes |
| Reliability sparkline (DP-81) | voice-score per (writer × model × template) data exists | Catches model-upgrade drift before member complaints | M | Yes |
| Claim-semantics + TTL (DP-82) | Stale-audit concept exists; mostly relabeling | Lower priority; no concurrent-agent trample | S–M | Yes |
| Silent-acceptance badge (DP-69) | Trusted-tier drift is real | Catches drift before it becomes pattern | S | Yes |
| Synthetic-degradation (DP-80) | Voice-score is a calibration baseline; fault-injection-friendly | Research signal | M | Yes |
| Phylogeny viewer (DP-83) | Editorial prompts evolve frequently | Lower priority | M | Yes |

### Top 3 cards to file for vela

1. **Origin marker on customer-facing artifacts.** Vela ships agent-authored fiction, agent-generated monologue *in the voice of a real historical person*, and warmth-tuned reflection copy *to paying members*. Closed-loop risk is more urgent here than at devplane because the audience is non-technical readers with no signal that what they're reading is generated. Adaptation: vela's origin enum is more granular — `human-authored | human-edited | ai-assisted | ai-generated | human-supervised-ai | quoted-from-source` — to handle the reality that even "human" essays are sometimes AI-rewritten for voice. Ship as a member-visible pill on every magazine row, fiction story, monologue, and `your-path` insight.

2. **Unified multi-axis editorial reviewer.** Vela has nine editorial QA roles + claim-audit + voice-score, but they're nine separate pipelines that fight for the same artifact and produce nine independent verdicts. Editor sees the symptom (red counts) without the structure (which axis dissented, which is the minority report). Adopting the multi-axis schema unifies existing surface area — net code drops while editorial signal goes up. The five-cluster lock from devplane's research applies verbatim.

3. **Sycophancy circuit-breaker on reflection / fiction / monologue copy.** The reflection-claude pattern-copy generator is *the* surface where Nature 2026's warmth-vs-accuracy finding is most load-bearing in the entire portfolio: a paying member at end-of-sequence is a vulnerability moment. Vela has a strong incentive to make the copy land warmly; the literature says exactly that drift produces 10–30 pp error inflation. Fire a contrarian re-pass when reflection comes back glowing 3+ runs in a row. Same primitive applied to monologue refusal-violation detection and to fiction when continuation rate is suspiciously high.

---

## 2. Meta-Factory — substrate that builds AI workflows

**Repo:** `/Users/mikewest/Vibe Coding Projects/meta-factory/` (TypeScript flat monorepo, ~80 packages, asset registry of 5,013 assets, OpenAI primary).
**User shape:** operator drives a CLI / pipeline. No end-customer surface. Output is structured JSON consumed by other tools (vela, performix, downstream factories).
**Scan:** ~90 files importing `openai` / `@anthropic-ai/sdk`. Each "factory" / "agent" package wraps a prompt template + structured output schema.

### AI surface inventory

1. **Factory packages** (~25 specialized extractors): book, research, requirements, persona, segmentation, application-designs, job-family, competency, prompt, publishing. Each loads `prompts/<agent>/<task>.md` and writes JSON.
2. **Validators package** (`packages/validators/`): 12 typed validators (Schema, SemanticShape, Corrections, NotesCoverage, **Hallucination**, CrossChapterConsistency, FactorRegistry, Classification, CrossContentConsistency, Documentation, PayFactory). Verdict = `ok|warn|error`. Closest portfolio analog to a multi-axis reviewer.
3. **Referee** (`packages/referee/`): scores candidate summaries against book text; consolidate + refine.
4. **Critic agent** (`packages/critic_agent/`): assumptions, contradictions, alternate applications. Standpoint reviewer in disguise.
5. **Orchestrator**: factory registry, backlog, content detection, rate limiting, monitoring.
6. **Synthesis agent**: reads multiple BookSummaryCanonical objects → comparative analysis.
7. **Deep-research LLM classifier**: pre-classifies content before routing.
8. **Asset registry** (5,013 assets): single source of truth — the "manifest" the corpus literature called missing.
9. **Observability**: cost tracking per LLM call.
10. **Prompt-factory**: generates prompts for other factories — meta-recursion structurally present, no origin marker.

### Operator-facing pain per surface

1. Factories: ~25 JSON files per pipeline run, no longitudinal degradation signal.
2. Validators: flat verdict; can't distinguish hallucination-warn from schema-warn at a glance.
3. Referee: if all candidates are bad, picks one anyway — no halt verb.
4. Critic: never re-run as contrarian against synthesis_agent. Two passes never argue.
5. Orchestrator: routes content to a factory possibly on stale prompt version.
6. Synthesis: runs on summaries that may themselves be agent-generated → closed loop.
7. Classifier: misclassified content silently ingests into wrong factory.
8. Asset registry: no `origin` field — doesn't know which assets are agent-authored.
9. Observability: tracks generation cost, not rework / governance cost.
10. Prompt-factory: prompts generating prompts is the most direct closed-loop risk in the portfolio.

### Convergent features that apply to meta-factory

| Feature | Why it lands here | Operator benefit | Size | DP-substrate dep |
|---|---|---|---|---|
| **Origin marker (DP-71)** on registry rows | 5,013 entries with no origin tag; prompt-factory output feeds other factories | Can query "human-authored summaries only"; research instrument becomes interpretable | M | No |
| **Multi-axis reviewer (DP-68)** for validators | 12 validators producing typed verdicts; consolidate to one schema | One structured verdict per output; filter by axis | M | Yes |
| **Calibration score (DP-75)** per factory × prompt-version | Ground-truth check exists via referee + downstream usage | Per-factory reliability trajectory; calls out drift | S | No |
| **Sycophancy circuit-breaker (DP-77)** on critic | Critic *should* be contrarian; today one pass | Real contrarian re-review when critic's been quiet too long | S | No |
| **Skopos brief + rephrase (DP-74)** | Each factory loads prompt, runs blind | Catches "this was misclassified" before paying for full extraction | M | No |
| **Briefing template log (DP-70)** | Prompts live as files; no per-version output-quality signal | Sees which prompt versions produce ok-rated output | M | No |
| **Refusal verb (DP-78)** on factories | Today factories extract whatever comes in | Misroutes get clean repair path | S | Yes |
| **Rupture-repair (DP-79)** on referee/refine cycles | Refine cycles exist; type/clock/repair_path is columns | Sees which factories' outputs most often refined and which strategies land | S | No |
| **Generation-cost vs governance-cost ledger** | Observability tracks generation cost; rework is missing column | "Synthesis costs $X to generate but $4X to validate" | S | Yes |
| **Reliability sparkline (DP-81)** per (factory × model × template) | All three identifiers exist | Longitudinal factory reliability dashboard | M | Yes |
| **Synthetic-degradation (DP-80)** | Asset registry + orchestrator is cleanest fault-injection harness in portfolio | Real measure of validator true-positive rate | M | Yes |
| **Halt-and-surface (DP-84)** | Orchestrator dispatches with no escape valve | Typed halt event when factory hits low confidence | S | No |
| AI-withdrawal baseline (DP-76) | Less applicable — meta-factory is built specifically for scale humans can't | Research-only, not Now/Next | L | Yes |
| Phylogeny viewer (DP-83) | Builds on DP-70 | Mid-tier | M | Yes |
| Silent-acceptance badge (DP-69) | Less applicable — batch, not interactive review | Lower priority | S | Yes |

### Top 3 cards to file for meta-factory

1. **Origin marker on asset registry rows.** Closed-loop risk is structurally largest here: prompt-factory generates prompts other factories load, synthesis agent reads agent-authored summaries, registry is the single source of truth. Without origin tagging, by month 6 a substantial fraction of "ground truth" is agent-authored. Adaptation: enum is `human-curated | extracted-from-source | agent-generated | agent-derived | mixed-pipeline`. One column on registry plus a `registry:verify` rule that flags closed-loop chains.

2. **Multi-axis validator verdict schema.** Validators package is *already* a multi-axis reviewer — 12 typed validators on the same artifact — but verdict shape is `ok|warn|error` per validator with no unified rendering. Adopting devplane's multi-axis schema (task_score, calibration_score, rupture_type, affected_surfaces, minority_objection, evidence_grounding) gives the operator one structured object that the existing 12 validators write into rather than 12 parallel result streams. Smaller footprint AND more signal.

3. **Briefing template evolution log + accepted-output ratio.** Every factory loads a prompt from `prompts/<agent>/<task>.md`. These prompts are the load-bearing IP. Today they evolve in git with no per-version output-quality signal. Versioning + per-version `output_accepted` (passed validators / passed referee / made it into a downstream consumer without warn) gives the operator the niche-construction loop the corpus names — substrate edits its own coordination environment based on selected behavior. Highest-leverage instrumentation hook on the meta-factory substrate.

---

## 3. Cross-cutting: features that apply to all three apps (DP-86 candidates)

Strongest candidates for the cross-application pattern library.

1. **Origin marker (DP-71).** Devplane: commits/tickets/session reports. Vela: artifacts members consume. Meta-factory: registry assets. All three have closed-loop risk; same primitive (typed enum + recursion guard); enum values differ per app but shape is identical.

2. **Multi-axis reviewer schema (DP-68).** Devplane: reviewer pill. Vela: 9 editorial roles + claim-audit + voice-score. Meta-factory: 12 validators + referee + critic. All three have multi-axes-on-one-artifact structures already. One canonical schema collapses three ad-hoc implementations. Highest-leverage DP-86 candidate.

3. **Calibration score (DP-75).** Each app has typed claims, an accept/reject signal, and grounded-vs-not classification. Per-app signals differ (devplane: claim-vs-repo; vela: copilot accepted; meta-factory: validator passed) but the primitive is identical.

4. **Briefing template evolution log (DP-70).** Devplane: dispatch templates. Vela: editorial-role prompts + atlas briefing. Meta-factory: factory prompts. Same primitive: prompt-version + per-version selected-behavior ratio. Pedreschi 2024 publication target reads identically.

5. **Skopos brief + pre-execution rephrase (DP-74).** Every app has a moment where an agent loads context and could echo it back before generating. Thin templating concern; adapts cleanly to all three.

6. **Sycophancy circuit-breaker (DP-77).** Nature 2026 finding is universal. Devplane: reviewer drift. Vela: reflection / fiction / monologue warmth-drift. Meta-factory: critic under-criticism. Adapt the trigger; keep the primitive.

7. **Refusal verb (DP-78).** Lifecycle-pill foundation. Devplane: agent / reviewer decline. Vela: dossier-refusal / publish-gate decline. Meta-factory: factory misroute decline. Same typed event, different domain enums.

These seven are the strongest DP-86 cross-app substrate. The rest (rupture-repair triple, claim-semantics, reliability sparkline, halt-and-surface, withdrawal baseline) are more devplane-shaped — they fit vela and meta-factory but with more adaptation, so they belong in a second wave, not the foundation.

---

## 4. What does NOT apply — devplane-shaped features that should not be force-fit

- **Halt-and-surface lane (DP-84) — partial-fit only.** "Lane" is a kanban primitive devplane has and the others don't. Primitive (typed halt verb) transfers; lane visualization does not. Adapt as queue/inbox event, not column.

- **Claim-semantics + TTL (DP-82) — devplane-specific.** Built to counter trample patterns when multiple Cursor agents work the same repo. Vela has no concurrent-agent-on-same-artifact problem; meta-factory's factories don't fight over outputs. Skip for cross-app substrate.

- **Reliability sparkline (DP-81) — data layer only.** Three identifiers transfer; the sparkline-on-swimlane visualization doesn't. Build the data layer cross-app; let each app render its own surface.

- **Rupture-repair triple (DP-79) — devplane-natural.** Vela analog: `outcome=rolled_back`; meta-factory analog: refine cycles. Columns transfer; rework-column-splits-into-sub-lanes UI does not.

- **AI-withdrawal probe column (DP-76) — devplane-shaped.** "Probe column" is kanban-specific. Primitive (longitudinal human-only baseline) is real but renders as a longitudinal report, not a column.

- **Silent-acceptance vigilance badge (DP-69) — operator-cockpit-shaped.** Devplane is interactive review; vela / meta-factory are batch. Streak primitive transfers; badge UI doesn't.

- **Synthetic-degradation (DP-80) — research instrument, not user feature.** Useful in all three but document as cross-app research infrastructure, not Now/Next user card.

- **Phylogeny viewer (DP-83) — depends on DP-70 everywhere.** Defer.

**Hard prohibitions (carry over from devplane and *strengthen* for vela / meta-factory):**

- Never warmth-tune reflection-claude / fiction / monologue. Nature 2026 is most load-bearing on the most customer-facing surfaces in the portfolio.
- Never present persistent agent identity as a relational claim in vela copy. "Vela knows your taste" reads as warmth; "Vela tracks 47 ratings — here they are" does not.
- Never companion-frame docent / reflection / fiction. Members at end-of-sequence are at vulnerability moments — wrong surface to drift warm.
- Never cross-pollinate origin-untagged artifacts across apps. If meta-factory's prompt-factory generates a prompt that vela's editorial role uses, the chain must be tagged at every step.

---

## 5. Disposition

**For vela**, three cards to file: origin marker on customer-facing artifacts, unified multi-axis editorial reviewer, sycophancy circuit-breaker on customer-facing copy. All three doable on existing schema; all three pull from devplane's already-shipped or in-flight primitives.

**For meta-factory**, three cards: origin marker on asset registry, multi-axis validator verdict schema, briefing template evolution log. The validator-schema unification is net-negative LOC.

**For DP-86 cross-app substrate**, the seven-feature foundation in §3. These read across all three apps with minor adaptation and substantial code reuse.

**Out of scope for cross-app**: features whose value is in the devplane-shape (kanban lanes, swimlanes, operator cockpit). Don't force-fit; let each app build its own visualization on the shared data layer.
