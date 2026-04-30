# DevPlane Research — Overview

**Coordination cost in heterogeneous AI tool ecosystems.**

Working draft · v0.1 · 2026-04-29 · For posting at peopleanalyst.com/research/devplane

---

## The question

Software is built across a fragmented ecosystem of specialist tools — editors, repos, CI, deploy, data warehouses, AI agents — each excellent in isolation and almost none designed to coordinate with the others. Veteran engineers absorb the resulting integration cost so reflexively they no longer see it. As AI agents become first-class participants in this ecosystem, that absorbed cost moves from invisible-to-experts to load-bearing-on-everyone, and the gap between "anyone can build" and "anyone can ship" widens.

This research program asks a specific version of that question: **where does coordination cost actually live in human-AI software development, how is it measured, and which interventions reduce it without producing offsetting compensation effects elsewhere in the system?**

DevPlane — a working multi-agent operational dashboard with assignment registry, handoff protocol, and continuous production telemetry — is the apparatus, not the subject.

## Why now

Three things have changed simultaneously, and the intersection is under-studied:

1. **Multiple AI coding agents on a single codebase is now a real operational pattern,** not a research demo. Cursor, Claude Code, Devin, GitHub Copilot Workspace, and others are routinely run concurrently by individual operators on shared repositories.
2. **The operator-of-multiple-agents is a new role** without a corresponding body of human-factors literature. Cockpit HCI (Bainbridge 1983 onward) studied a pilot supervising one or two automation systems; this is one human supervising N heterogeneous agents with overlapping authority.
3. **The economic argument for AI coding tools assumes the coordination cost is small.** If it isn't — if risk compensation, handoff loss, or instrument blindness erodes the gains agents produce — then the productivity claims being made today systematically overstate net effect.

## The portable contribution

We are not building a benchmark, not evaluating any specific model, and not advocating any specific tool. The contribution is a methodology and an empirical record:

- **A taxonomy of coordination failure modes** with prevalence rates from production telemetry, not anecdote.
- **A measurement instrument** for coordination cost that decomposes total time-to-merge into operator and agent components.
- **A pre-registered test of risk compensation** (the *Ironies of Automation*, Bainbridge 1983) in human-AI coordination — the program's lead study.

The methods generalize beyond AI agents: any team running heterogeneous tools through a coordination layer (multi-tool ops dashboards, hospital handoff systems, distributed scientific instruments) shares the same shape of problem.

## The data

Most academic researchers studying multi-agent or human-AI coordination work with laboratory tasks or post-hoc incident reports. DevPlane produces continuous production telemetry on a real operator running real agents on a real, multi-month codebase, with ground truth on:

- Dispatch text issued by the operator
- Agent attribution for every change
- Self-reported agent outcome ("done," "blocked," etc.)
- Merge outcome — what actually shipped vs. what got reworked or abandoned
- Operator interventions, including conflict resolutions and manual edits

The instrumentation specification is published and the corpus is being accumulated.

## The discipline

This program is structured to avoid the failure modes of vendor-funded "research":

- **Pre-registered predictions** — the "yes" world and the "no" world are written down before data collection
- **Falsifiable, operationalized constructs** — "coordination cost" is decomposed into measurable units before being invoked
- **Acknowledged researcher position** — the principal investigator is also the operator of the system being studied; this is auto-ethnography for descriptive work and an explicit threat-to-validity for causal claims, mitigated through external operators where claims require generalization
- **No effect-size-free conclusions, no vendor comparisons, no LLM-internals claims**

## Why this matters

If coordination cost in human-AI software development behaves like cockpit automation (the *Ironies of Automation* hypothesis), then the productivity story being told about AI coding tools is missing a major term. Improvements to agent quality compound only to the extent that the coupled human-machine system actually capitalizes on them — and four decades of automation research suggests it often doesn't, because the operator's vigilance falls when the automation's reliability rises.

That has consequences for how teams adopt AI tools, how vendors should design them, and how regulators or platform owners should think about safety claims grounded in agent-side improvements alone. The point of this research is to find out whether the consequence is real, in this regime, with this kind of system, at measurable magnitude.

## Read more

- **[PROPOSAL.md](PROPOSAL.md)** — the formal study proposal for C1, the lead study
- **[LITERATURE-REVIEW.md](LITERATURE-REVIEW.md)** — the five literatures this program is in conversation with
- **[PROGRAM.md](PROGRAM.md)** — the full three-arm program with parked questions and roadmap
- **[instrumentation-spec.md](instrumentation-spec.md)** — the coordination-event log schema
