# Coordination Cost in Heterogeneous AI Tool Ecosystems

**A multi-arm research program from DevPlane**

Working draft · v0.1 · 2026-04-29

---

## The portable claim

Modern software is built across a fragmented ecosystem of specialist tools — editors, repos, CI, deploy, data, agents — each excellent in isolation and almost none designed to coordinate with the others. Veteran engineers absorb the resulting integration cost so reflexively they no longer see it. As AI agents become first-class participants in this ecosystem, the absorbed cost moves from invisible-to-experts to load-bearing-on-everyone, and the gap between "anyone can build" and "anyone can ship" widens. **This program studies that coordination cost: where it lives, how to measure it, and which interventions actually reduce it without producing offsetting compensation effects elsewhere in the system.**

DevPlane — a working multi-agent operational dashboard with assignment registry, handoff protocol, and production telemetry — is the apparatus, not the subject.

## Why this is research, not product validation

Product validation asks "does our thing work." Research asks "what is true about the world, given evidence we collect under a discipline that protects against motivated reasoning." The difference matters because the conclusions a vendor wants to reach about coordination tools are predictable in advance, and predictable conclusions don't survive contact with rigorous design.

This program commits to:

- **Pre-registered predictions** for each study: the "yes" world and the "no" world are both written down before data collection.
- **Falsifiable constructs.** "Coordination cost" is decomposed into measurable units (time, intervention count, semantic drift, residence time) before it is invoked.
- **Acknowledged researcher position.** The principal investigator is also the operator of the system being studied. This is auto-ethnography for the descriptive arms and an explicit threat-to-validity for the causal arms; mitigated through external operators where claims require generalization.
- **Open methods, open data** to the extent the underlying production data permits, with a documented scrubbing protocol for proprietary content.

## The data asset

Most academic researchers studying multi-agent or human-AI coordination work with laboratory tasks or post-hoc incident reports. DevPlane produces continuous production telemetry on a real operator running real agents on a real, multi-month codebase, with ground truth on:

- Dispatch text issued by the operator
- Agent attribution for every change
- Self-reported agent outcome ("done," "blocked," etc.)
- Merge outcome (the actual ground truth — what shipped, what got reworked, what got abandoned)
- Operator interventions in the queue (claims, retractions, manual edits, conflict resolutions)

The instrumentation spec at [`instrumentation-spec.md`](instrumentation-spec.md) defines the schema. The corpus this produces is the foundational asset for every study below.

## Three arms

### Arm A — Agent ↔ Agent

Studies of how AI agents coordinate (or fail to) when working through shared artifacts rather than direct communication. DevPlane uses **stigmergic coordination** — agents write to and read from a shared queue, but do not message each other directly. The Arm A questions are about the failure modes that emerge specifically from this architecture.

**Lead question — A1: Stigmergic drift.** Do agents coordinating through shared artifacts diverge from agents coordinating through direct outputs, in ways predictable from the queue's information density? *Anchor:* Theraulaz on stigmergy; Hayes-Roth on blackboard systems; Lewis convention emergence.

Other A-arm questions worth eventual study: false-complete rate (how often "done" is wrong), information loss across handoff chains, conflict resolution dynamics under simultaneous overlapping work.

### Arm B — Human ↔ AI

Studies of the operator running multiple agents — cognitive load, decision quality, trust calibration, attention allocation. Borrows instruments from aviation (NASA-TLX, Endsley's situation awareness) and decision science (Brier scoring, calibration diagrams).

**Lead question — B1: Trust calibration.** Are operator priors about agent reliability well-calibrated to actual reliability, or systematically biased — and if biased, in which direction? *Anchor:* Lee & See 2004 on trust in automation; Tetlock on forecasting calibration; Kahneman on overconfidence.

Other B-arm questions: dispatch quality decay across a session (decision fatigue vs. expertise development — these predict opposite curves), plan continuation bias when agent output deviates from intent, situation-awareness recovery after time away.

### Arm C — Interface (the lead arm)

Studies of the joint system — neither the agents alone nor the operator alone, but the coupled human-machine assembly. This is the arm where DevPlane's data is most distinctive, because the joint system is precisely what laboratory studies cannot reproduce.

**Lead question — C1: Risk compensation in human-AI coordination.** When agent-agent coordination improves (fewer collisions, cleaner handoffs, better protocols), does operator vigilance decrease enough to offset the gain in net system reliability? In other words: do the **Ironies of Automation** (Bainbridge 1983) appear in human-AI software development the way they appear in cockpit and process-control automation?

This is the program's lead study. See § *The lead study* below.

Other C-arm questions: instrument-blindness (what failure modes does the kanban systematically render invisible), decomposition of total time-to-merge into operator vs. agent components.

## The lead study — C1, Risk Compensation

**Hypothesis (pre-registered).** Introducing an improvement to agent-agent coordination protocols produces (a) a measurable reduction in agent-agent failure events, and (b) a partially-offsetting increase in operator-attributable failure events, such that the net reduction in total system error is meaningfully smaller than the agent-agent improvement alone.

**Yes-world consequence.** Risk compensation is a real phenomenon in human-AI software ops. Engineering investment should split between agent quality and operator interface; productivity claims based on agent improvements alone systematically overstate net gains.

**No-world consequence.** Risk compensation does not appear in this regime. Operators in heterogeneous AI tool ecosystems do not behave like pilots or process-control operators. Engineering investment in agent quality compounds without offset.

**Design.**

- **Setting:** DevPlane in production, instrumented per [`instrumentation-spec.md`](instrumentation-spec.md).
- **Intervention:** introduce one well-bounded coordination improvement (candidate: the auto-resolve heuristic for assignment-status reconciliation, lineage ASN-953/979). Single-step change with a clear before/after.
- **Dependent variables:** (1) agent-agent failure events per unit work; (2) operator-caught-failure events per unit work; (3) total system error per unit work; (4) operator dwell time per assignment as a proxy for vigilance.
- **Statistical approach:** interrupted time-series with a sufficient run-in period (≥30 days pre-intervention, ≥60 days post). Bayesian structural time-series (CausalImpact-style) for the counterfactual.
- **Threats to validity:** maturation effects (operator gets better over time independent of intervention), instrumentation effects (the act of measuring changes the operator's behavior — a Hawthorne risk that must be flagged), construct validity of "vigilance" (dwell time is a proxy, not the construct itself).
- **Auto-ethnography flag.** The principal investigator is the operator. Findings are first-person case data; generalization claims require replication with at least one external operator before being made.

**Theoretical anchors.** Bainbridge 1983, "Ironies of Automation" (the canonical citation). Peltzman 1975 on automotive risk compensation. Wilde's risk homeostasis theory. Lee & See 2004 for the trust-mediated mechanism. More recent: Parasuraman & Manzey 2010 on complacency and bias in human use of automation.

## Theoretical lineage

This program is in conversation with five literatures, in roughly descending order of centrality:

- **Cockpit and process-control HCI** — Bainbridge, Endsley, Parasuraman, Lee & See
- **Computer-supported cooperative work (CSCW)** — Schmidt & Bannon on articulation work, Suchman on situated action, Grudin on group-aware design
- **Empirical software engineering** — Herbsleb on distributed development, Vasilescu and others on GitHub-scale telemetry
- **Behavioral decision-making** — Tetlock on forecasting, Kahneman on bias, Klein on naturalistic decision-making
- **Stigmergic and blackboard coordination systems** — Theraulaz on biological stigmergy, Hayes-Roth on blackboard architectures

The reading queue at [`reading-queue.md`](reading-queue.md) starts with the four papers most load-bearing for the lead study.

## What is parked, with discipline

A research program is partly defined by what it refuses to study yet. To prevent scope creep:

- **No claims about LLM internals or model architecture.** This is a coordination program, not a model-evaluation program.
- **No "5 ways AI is changing software engineering" framing.** Claims will be specific, measured, and bounded.
- **No effect-size-free conclusions.** A statistically detectable effect that is operationally trivial will be reported as such.
- **No vendor comparisons** as primary findings. If Cursor outperforms Claude Code on some metric in this corpus, that finding is noise unless replicated under controlled conditions, which we are not running.
- **No survey-only studies.** Self-report has a place but is not the primary instrument.

## How a collaborator can engage

This program is structured to make collaboration cheap. A faculty researcher, graduate student, or senior practitioner could plausibly contribute by:

- **Co-designing measurement.** Particularly Arm B's cognitive-load and trust-calibration instruments, where validated scales exist and a methodological partner would substantially strengthen construct validity.
- **Providing a second operator.** The single largest threat to external validity is the auto-ethnography problem. A second operator with comparable instrumentation produces a within-vs-between-subject comparison that immediately makes the C-arm work generalizable.
- **Bringing a complementary corpus.** Comparative data from other multi-agent operational settings (industrial or academic) would let us test whether failure-mode taxonomies generalize across systems.
- **Co-authoring the position paper for venue submission.** Likely first venue: CHI, CSCW, or ICSE; possibly an HCI workshop first.

## Roadmap

- **Day 0–30 (current).** Build the corpus. Read the four-paper queue. Sharpen this document. Map CMU faculty.
- **Day 30–90.** First pre-registration (C1). Outreach to faculty. Begin recruiting one external operator.
- **Day 90–180.** Run the C1 intervention with sufficient observation window. Begin Arm A descriptive work in parallel using accumulated corpus.
- **Month 6–12.** First report draft. Workshop submission.

This is a slow program. It is designed to be slow. Coordination cost is the kind of construct that punishes rushed measurement.
