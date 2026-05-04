# Feature Brainstorm Convergence — Devplane × ~/Desktop/AI Research

**Date:** 2026-05-02
**Methodology:** Five parallel Claude agents, one per cluster lens (A coordination, B working alliance, C trust calibration, D governance, E identity), each reading 6-7 of the 33 source files in `~/Desktop/AI Research/` plus the prior synthesis at `docs/research/ai-research-synthesis.md`. Each agent produced 27-30 features with leverage/tractability/anti-pattern/synthesis-overlap tags. Raw brainstorms at `docs/research/feature-brainstorms/cluster-{A-E}-features-2026-05-02.md`.
**Total raw features:** 143 (137 live + 6 explicit anti-pattern drops).
**Purpose:** turn the brainstorm into a decision. *Decide what goes in.*

---

## Headline

The five clusters converge on a much smaller slate than the brainstorm size suggests. Once you cross-reference the 143 raw features, **8-12 ideas show up under different vocabularies in 3+ clusters** — those are the highest-confidence builds. The rest are cluster-distinctive bets (one cluster's unique contribution) and Later-tier scaffolding around the convergent core.

Two cards from the prior synthesis filing wave (DP-68 multi-axis reviewer schema, DP-71 origin marker) are already in-flight at Cursor cloud — both confirmed as 4-5-cluster convergent. Four new Now-tier cards (filed below) complete the convergent core.

---

## Cross-cluster convergence map

Features where 3+ clusters independently proposed essentially the same primitive. Listed by convergence strength.

| Feature | Clusters | Status | Notes |
|---|---|---|---|
| **Multi-axis reviewer / standpoint-aware verdict** | A, B, C, D, E | **DP-68 in-flight** | Prior synthesis Feature 1; 5-cluster lock |
| **Skopos brief + pre-execution rephrase** ("show what I understood") | A, B, C, D, E | filing as **DP-74** | 5-cluster lock; B's top-2, D's top-1 |
| **Origin marker / provenance ledger** (artifacts + context manifest + summary recursion guard) | A, B, D, E | **DP-71 in-flight** | Prior synthesis Hook 9; 4-cluster lock |
| **Sycophancy circuit-breaker / contrarian re-review** | B, C, D, (E in drop list) | filing as **DP-77** | 4-cluster; NEW vs synthesis (was anti-pattern only) |
| **AI-withdrawal probe column + longitudinal solo capability** | B, C, D, E | filing later as **DP-76** (Next-tier) | Prior synthesis Feature 9 deepened |
| **Rupture-repair instrumentation triple** (3-clock timer + rupture-type taxonomy + repair-path enum) | A, B, E | filing as **DP-79** | B's #1 bundle, A's #6+#8, E's #2 |
| **Calibration score on reviewer** (claim-vs-repo-state delta) | A, C, D, E | filing as **DP-75** | C's top-1; concrete numeric primitive |
| **Refusal verb** (typed decline-with-reason event) | A, C, D, E | filing later as **DP-78** (Next-tier) | D's top-3; lifecycle pill foundation |
| **Reliability sparkline per (agent × model × prompt-template)** with rupture events | A, C, E | filing later as **DP-81** (Next-tier) | Synthesis Feature 6; depends on DP-63 + DP-71 |
| **Briefing template phylogeny viewer** | A, C, E | filing later as **DP-83** (Next-tier) | Builds on DP-70 |
| **Synthetic-degradation probe stream** (silent fault injection on ~10% of dispatches) | A, C | filing later as **DP-80** (Next-tier) | A's top-2, C's top-2; experimental knob |
| **Halt-and-surface lane** for stigmergic agent collisions | A, B, D | Later-tier; depends on shared-board lane | Synthesis anti-pattern #4 made constructive |
| **Generation-cost vs governance-cost ledger** | A, D | Later-tier | Synthesis Hook 8 as operator-facing surface |

---

## Now-tier — filed and dispatching today

DP-68 + DP-71 already in-flight at Cursor cloud. Six more cards filed and dispatched in Wave 2A (foundation + non-reviewer-touching set, parallel-safe).

### Reviewer-schema cluster (filed, dispatch held until DP-68 lands to avoid trample on `src/pills/reviewer/`)
- **DP-74** — Skopos brief + pre-execution rephrase. Five-cluster lock. Structured `brief` block on every dispatch (purpose / audience / must-survive constraints / acceptable-loss); agent must echo back "what I understood / what I plan / constraints I'll respect" before code changes proceed.
- **DP-75** — Calibration score on reviewer verdict. Three-cluster + C's top pick. Free sycophancy detector with no new infrastructure: `calibration_score = (claims that hold) / (claims made)` against the agent's session report.
- **DP-77** — Sycophancy circuit-breaker (contrarian re-review). Four-cluster, NEW vs prior synthesis. When the reviewer pill returns 4+ consecutive passes with no minority objection, fire a different-model contrarian pass.
- **DP-79** — Rupture-repair instrumentation triple. Three-cluster (A + B + E), B's top-pick bundle. One drizzle migration adds rupture_clocks + rupture_type enum + repair_path enum on rework. Existing rework column splits into sub-lanes by repair_path.

### User-benefit Later-tier promotions (filed and dispatching)
- **DP-82** — Claim-semantics layer with TTL. A's top architectural pick. Converts board-of-cards into board-of-claimed-territories; counters trample patterns directly. M-L sized.
- **DP-84** — Halt-and-surface lane. Three-cluster (A/B/D). Mandatory red-flag verb any agent or reviewer can fire to pause the lane and surface to the operator.

---

## Next-tier — filed and queued (dispatch follows the Now-tier reviewer-schema cluster)

All five Next-tier cards filed today as cursor-assigned. They depend on either DP-68 + DP-71 + DP-79 landing, or DP-63 / DP-70 being live, so they remain in backlog while the Now-tier cluster ships.

- **DP-76** — AI-withdrawal probe column + scaffolding-vs-substitution skill trace. Depends on DP-63.
- **DP-78** — Refusal verb (typed decline-with-reason event). Lifecycle-pill foundation; small but architectural.
- **DP-80** — Synthetic-degradation probe stream. Depends on DP-75 (need calibration baseline before injecting faults).
- **DP-81** — Reliability sparkline per (agent × model × prompt-template) with rupture events. Depends on DP-68 + DP-71 + DP-79.
- **DP-83** — Briefing template phylogeny viewer. Depends on DP-70 (template evolution log).

---

## New workstreams filed 2026-05-02 (per operator directive same day)

Three meta-workstreams that go *with* the convergent feature build but are bigger than any single feature card.

- **DP-85** — User-centered re-pass of the research. Inverts the convergence-pass lens: instead of "what does this research INSPIRE for devplane?" the question becomes "what underlying user pain or operator concern is this research DESCRIBING, and how could devplane address that pain better than the literature itself proposed?" Same 5-cluster axis, different lens. Output: a parallel `user-pain-convergence-2026-05-XX.md` and a Now-tier slate update. Currently `assignTo: manual` — operator and Claude will run it together; not a Cursor cloud dispatch.
- **DP-86** — Cross-application pattern library. Once devplane's convergent features stabilize for 30 days, package them as a reusable substrate the rest of the portfolio's AI-using apps consume (vela, performix, baby-namer, etc.). Per the capability doctrine: extractability now, extraction later. Out-of-range until at least Q3 2026.
- **DP-87** — Research-backed differentiation pages on devplane.com / peopleanalyst.com. Two-tier: peopleanalyst.com hosts the canonical research positioning ("DevPlane as Instrument"); devplane.com/why/* hosts short feature pages that link up to peopleanalyst.com. One page per shipped feature. Phase 1 is `/why` scaffold + 1-2 pages for already-shipped features.

---

## Later-tier — high-value but architecturally bigger

Not filing yet; surfaced here so they don't get lost. These need Now/Next-tier instruments in place first, or are L-sized builds.

- **Lifecycle-protocol pill** as a peer of dispatch/reviewer/kanban (D9 deepening of synthesis Feature 3). Composes refusal-verb (DP-78), retirement-rite, transfer-of-custody, protocol-of-entry into a single capability.
- **Coordination-failure postmortem template** (A's top-3 #21). MAST + Magentic-One taxonomies on every failed/reverted card.
- **Agent ethogram** (E's top-3 #19). 12-item blinded behavioral battery per agent-tuple. Working-animal measurement methodology — 30+ years of validated dyadic instruments untouched in HAI.
- **Generation-cost vs governance-cost ledger** (D's top-3 D4). Synthesis Hook 8 as an operator-facing bar chart; once visible, prioritization of access-labor / reciprocity / cost-of-being-legible becomes self-evident.
- **Reciprocity ledger** for OSS / external-data use (D17). Per-repo extract-vs-contribute trend; non-extractive knowledge contract.
- **Stigmergic shared-board lane** (synthesis Feature 7). Larger architectural move; gates several A-cluster features.
- **Withdrawal probe with sounding-board pairing** (E #10). Distinguishes "AI as ghostwriter" from "AI as sounding board" longitudinally.
- **Cross-repo coordination map** (A #15). Force-directed graph of in-flight cards across portfolio with file-path dependencies.
- **Cognitive ethnography recorder** (A #9). Opt-in screen + IDE + PR timeline stitched per ticket — Hutchins-flavored multimodal program.

---

## Killed list — anti-pattern violations, named

Naming the thing-not-built is part of the deliverable. These six features were proposed, then explicitly dropped on cited research grounds.

| Proposal | Cluster | Anti-pattern violated | Why dropped |
|---|---|---|---|
| Reviewer warmth-tuning per operator stress signal | B #17 | #1 (Nature 2026 warmth-vs-accuracy) | Warmth-tuning raises errors 10-30 pp; especially harmful at vulnerability moments |
| Persistent "your Cursor agent" identity copy | B #18 | #5 (Replika 2023, Character.AI study) | Relational framing creates rupture risk on model change |
| Companion-mode chat surface in operator panel | B #24 | #1 + #5 | Open-ended companion surface that warmth-drifts and identity-drifts simultaneously |
| "Tuple remembers you" notification | E #25 | #5 | Same data is exposed correctly by Memory-as-power audit log without affective framing |
| Ceremonial mourning archive for retired tuples | E #26 | #5 (over-extension) | Retirement rite (E #3) preserves event/archive/transfer without simulating bereavement |
| Stress-aware tone modulation | E #27 | #1 + #5 | Surface stress as data; never modulate output by it |

---

## Cluster-distinctive bets — one per cluster

The convergent core is high-confidence but not exhaustive. Each cluster contributes at least one feature that is *uniquely* that lens's gift to devplane and would be lost if we filed only convergent items. These are Later-tier filings worth flagging now.

- **Cluster A — Cognitive Ethnography Recorder** (#9). Hutchins flight-deck program in production: screen + IDE + PR + reviewer events stitched per ticket, browsable post-hoc. No HAI study has the cognitive-unit-of-analysis data this would produce.
- **Cluster B — Idealization → devaluation cycle detector** (#21). Tracks per-agent reviewer-score trajectory; flags sharp drops following sustained high streaks. Operator-side: keeps the verdict on the *card*, not the *agent*. Psychoanalytic literature has named the dynamic for 50 years; no production HAI system has measured it.
- **Cluster C — Pseudo-apprenticeship detector** (#20). Monthly: devplane samples 5 cards Mike merged and asks him to re-explain the diff in plain English without looking. The cleanest test of "did the operator actually understand the thing they approved." Longitudinal Skill literature names this as missing in all current studies.
- **Cluster D — Cost-of-being-legible meter** (D28, "the weird one"). Tracks operator's prompt-engineering + context-gathering + reformulation time as a column separate from "doing actual work." Operator as translator without being named as one. Speculative; possibly the most novel research instrument on the entire list.
- **Cluster E — Pattern-archive of "ugly" diffs** (#28). When the operator flags a diff `ugly`, the snippet + note + verdict goes into a per-repo "ugliness pattern" archive that future dispatches sample as negative examples. The operator slowly trains the briefing environment in their own negative-aesthetic vocabulary. Niche-construction loop in Sterelny's sense.

These five are deliberately weirder than the convergent core. Their value is not redundancy across clusters; it's distinctiveness *of* a cluster. Re-evaluate after Now-tier ships and DP-67 (the convergence design session) runs against the first wave's empirical signal.

---

## Decision sit-rep

**The discipline of this pass is not "ship more features." It is "decide what goes in."**

What goes in: 8 cards across Now + Next, stacked on a convergent core that 3+ clusters of post-2018 research independently endorsed under different vocabularies. Two are already in-flight at Cursor (DP-68, DP-71). Four file today (DP-74, DP-75, DP-77, DP-79). Five queue for the next wave (DP-76, DP-78, DP-80, DP-81, DP-83).

What does *not* go in (yet): the 11 Later-tier features above + the cluster-distinctive bets. They are real, surfaced, named, and waiting on instrumentation that the Now/Next-tier provides.

What does not go in (ever): the six anti-pattern violations, named with their cited grounds.

The 5 raw cluster brainstorms remain at `docs/research/feature-brainstorms/cluster-{A-E}-features-2026-05-02.md` as appendices — when a Later-tier card needs filing, the source rationale and citations are right there.

---

## Addenda (2026-05-02 same-day)

### Phenomenology delta

Two source documents added to `~/Desktop/AI Research/` after the cluster pass — *Phenomenology of Attention in Post-2010 Theory and AI-Augmented Work* and *Phenomenology of Skill and AI-Augmented Expert Work*. A focused agent produced `docs/research/phenomenology-delta-2026-05-02.md`. Five new features (DP-88 through DP-92), with one substantive critique of the existing slate: DP-79 measures attention-as-EVENT (rupture-clock latency) but not attention-as-DURATION, which is the variable the phenomenology corpus says actually matters. **DP-88 (Sustained-Reasoning Window)** is the fix and is filed at high priority. **DP-91 (Front-Loaded Phenomenology Probe)** is filed at high priority because the slate had zero first-person experiential data. DP-92, DP-89, DP-90 filed at lower priority. 15 new bibliography entries fold into LITERATURE-REVIEW.md via DP-64.

### Cross-application mapping

Per operator directive, applied the convergent thinking across devplane + vela + meta-factory. Inventory at `docs/research/cross-application-mapping-2026-05-02.md`. **Vela already has nascent versions of most primitives** — 9 editorial QA roles is essentially a multi-axis reviewer scattered across tables; agent_decisions table is most of the coordination event log. **Meta-factory has 12 typed validators on the same artifact** — the closest portfolio analog to a multi-axis reviewer. Top-3 cards filed per app:

- **Vela:** DP-93 origin marker on customer-facing artifacts (Baldwin-monologue / fiction / reflection-claude warmth surfaces are the most fragile in the portfolio); DP-94 unified multi-axis editorial reviewer (consolidates 9 roles + claim-audit + voice-score; net code drops); DP-95 sycophancy circuit-breaker on customer-facing copy (most load-bearing surface for Nature-2026 warmth-vs-accuracy in entire portfolio).
- **Meta-factory:** DP-96 origin marker on asset registry (closed-loop risk structurally largest because prompt-factory generates prompts other factories load); DP-97 multi-axis validator schema (relabel + consolidate the 12 validators); DP-98 prompt template evolution log + accepted-output ratio.

**DP-86 cross-application substrate candidates** (apply across all three apps with minor adaptation): origin marker, multi-axis reviewer, calibration score, briefing template log, skopos brief, sycophancy circuit-breaker, refusal verb. Defer until devplane's Now-tier ships and stabilizes; then extract.

**Devplane-shaped, NOT cross-app candidates** (force-fitting these onto vela / meta-factory loses signal): halt-and-surface lane (kanban-specific), claim-semantics + TTL (no concurrent-agent trample in vela / meta-factory), reliability sparkline (data layer transfers; UI doesn't), rupture-repair sub-lanes (rework-column-shaped), AI-withdrawal probe column, silent-acceptance badge, synthetic-degradation as user feature.

---

## Cards filed alongside this convergence (2026-05-02 final state)

**Already in-flight at Cursor cloud:** DP-68 (multi-axis reviewer schema), DP-71 (origin marker).

**Filed and dispatched in Wave 2A** (foundation + non-reviewer-touching):
- DP-63 coordination-event log
- DP-66 research report cadence
- DP-72 vela admin deep-link protocol
- DP-73 admin runbook sync
- DP-74 skopos brief + pre-execution rephrase
- DP-82 claim-semantics layer
- DP-84 halt-and-surface lane
- DP-87 research-backed why pages

**Filed, held for Wave 2B** (reviewer-schema cluster — touches `src/pills/reviewer/`, dispatch waits for DP-68's PR to merge to avoid trample):
- DP-69 silent-acceptance vigilance badge
- DP-70 briefing template evolution log
- DP-75 calibration score
- DP-77 sycophancy circuit-breaker
- DP-79 rupture-repair triple

**Filed, dispatch-ready next wave** (Next-tier — depend on Now-tier landings):
- DP-76, DP-78, DP-80, DP-81, DP-83

**Filed as workstreams** (assignTo: manual; not Cursor cloud):
- DP-85 user-centered re-pass
- DP-86 cross-application pattern library

The discipline of staging into waves rather than firing all 14 simultaneously is anti-pattern #6 in practice: the goal is not dispatch count; it is reviewable shipped work. Wave 2B fires when Wave 2A's reviewer-schema-touching dependency (DP-68) lands.
