---
title: "Pipeline Status"
description: "Honest snapshot of what is running, queued, blocked, recently completed, and on the three-month horizon for the DevPlane research program."
status: v0.1
publishedAt: 2026-04-30
authors: ["Mike West"]
---

> **v0.1** — manually maintained. The program is young; this snapshot reflects actual current state, not aspirational state. "Forthcoming" is acceptable for many slots — the seven-slot baseline (overview, program, proposal, literature review, methodology, pipeline status, instrumentation spec) is designed so that visible gaps stay visible. Last updated 2026-04-30.

## Running

Nothing is producing research data yet. The program is in pre-instrumentation setup.

The operational substrate **is** running: DevPlane in production, single operator, heterogeneous AI agents (Cursor, Claude Code) on a multi-project portfolio. Assignment registry, handoff protocol, two-phase actor handoff, and the shared-index-aware commit protocol are live and have been for several months. Git history, session reports under `docs/handoff/`, and `devplane_log_completion` records exist as a partial pre-instrumentation corpus and are recoverable for `dispatch`, `merge_outcome`, and `rework` event types — but not for `dwell_ms` or `operator_inspect`, which require the coordination-event log itself.

The **coordination-event log** ([`instrumentation-spec.md`](instrumentation-spec.md), DP-63) is specified at v0.1 but not yet implemented. This is the critical-path unblocker.

## Queued

The next three concrete pieces, in order:

1. **DP-63 — coordination-event log implementation.** New SQLite table in the existing DevPlane database, capture points wired in `src/agent-workflow.ts`, the kanban UI, the auto-resolver/reconciler, and the session manager. Acceptance includes one week of live capture against current DevPlane usage with spot-check verification. Estimated ~2 weeks of implementation work; nothing else moves until this lands.
2. **C1 pre-registration formalization.** [`PROPOSAL.md`](PROPOSAL.md) is the working pre-registration in spirit; OSF deposit is queued for filing once the analysis pipeline is built and the run-in period has accumulated enough data to confirm the instrumentation works. The deposit must precede unblinding to post-intervention rate data.
3. **Reading-queue completion.** The four-paper queue at [`reading-queue.md`](reading-queue.md) — Bainbridge (1983), Lee & See (2004), Parasuraman & Manzey (2010), one CSCW anchor — is the minimum to put the program in conversation with its primary literature. Mike's evening reading.

## Blocked

- **C1 run-in period.** Cannot start until DP-63 ships. The pre-registered design requires ≥30 days of pre-intervention data captured by the live event log; partial backfill from git history covers some event types but not the dwell-time and inspection events that anchor H2.
- **C1 intervention deployment.** Candidate intervention is the auto-resolve heuristic for assignment-status reconciliation (lineage ASN-953/979). Deployment timestamp is the intervention boundary; it cannot be set until the run-in baseline is captured.
- **External-operator replication.** Single-operator N=1 is the largest threat to external validity. Replication requires recruiting at least one external operator with comparable instrumentation, plus a consent protocol and likely IRB oversight depending on institutional partnership. Not committed in the C1 proposal; a successor assignment.
- **Faculty outreach.** [`faculty-map.md`](faculty-map.md) is being built up over weeks. Explicit hold: do not email until the four-paper queue is read and PROGRAM.md has been sharpened against that reading.
- **Deep-research literature gaps.** [`deep-research-prompts.md`](deep-research-prompts.md) names five low-confidence areas in the literature review (post-2020 *Ironies of Automation* applications to AI/LLM contexts, recent CMU HCII/S3D/LTI work on human-AI dev collaboration, risk-compensation outside automotive, empirical multi-agent LLM coordination failures, contemporary stigmergy treatment). Outputs land in `deep-research-outputs/` and reconcile back into the literature review before public posting.

## Recently completed

- **2026-04-29 — Research scaffold landed** ([`PROGRAM.md`](PROGRAM.md), [`OVERVIEW.md`](OVERVIEW.md), [`PROPOSAL.md`](PROPOSAL.md), [`LITERATURE-REVIEW.md`](LITERATURE-REVIEW.md), [`instrumentation-spec.md`](instrumentation-spec.md), [`reading-queue.md`](reading-queue.md), [`deep-research-prompts.md`](deep-research-prompts.md), [`faculty-map.md`](faculty-map.md)). The three-arm program is named, the lead study is specified, the literature is reviewed with confidence flags on uncertain references, and the apparatus is specified at v0.1.
- **2026-04-30 — Methodology surface published** ([`methodology.md`](methodology.md)). Operational discipline (assignment registry, handoff protocol, two-phase actor handoff, shared-index-aware commit protocol, coordination-event log) and research discipline (pre-registered yes/no worlds, falsifiable constructs, pre-committed coding rules for attribution, acknowledged researcher position, threats-to-validity register) are documented.

## Coming soon — three-month horizon

**Day 0–30 (current).** Build the corpus by shipping DP-63. Read the four-paper queue. Sharpen [`PROGRAM.md`](PROGRAM.md) against that reading. Map 3–5 CMU faculty whose work touches this. Reconcile deep-research outputs back into the literature review.

**Day 30–60.** Run-in period begins (≥30 days of pre-intervention corpus). First pre-registration filed at OSF before the post-intervention period opens. Outreach to faculty using the sharpened materials. Begin recruiting one external operator for the replication arm.

**Day 60–90.** Mid-run-in checkpoint: spot-check that the event log is capturing what the analysis plan needs. Begin descriptive A-arm work in parallel using accumulated corpus (false-complete base rates, stigmergic-coordination patterns visible in the queue). The C1 intervention deployment is still ahead.

This is a slow program. It is designed to be slow. Coordination cost is the kind of construct that punishes rushed measurement.

---

**Master spec:** [`PROGRAM.md`](PROGRAM.md)
**Lead study:** [`PROPOSAL.md`](PROPOSAL.md)
**Methodology:** [`methodology.md`](methodology.md)
**Apparatus:** [`instrumentation-spec.md`](instrumentation-spec.md)
