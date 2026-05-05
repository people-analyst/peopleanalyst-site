---
title: "Methodology"
description: "How the DevPlane research program is conducted: operational discipline, research discipline, and the standards C1 and successor studies inherit."
status: v0.1
publishedAt: 2026-04-30
authors: ["Mike West"]
featured: true
---

> **v0.1** — first methodology surface. Subsequent revisions are expected as the coordination-event log moves from spec (DP-63) to live capture and as the C1 lead study clears its run-in period.

## 1. The instrument frame

DevPlane ships as a multi-tool software-development cockpit — assignment registry, agent dispatch, kanban, handoff protocol. Beneath that surface, it is a measurement instrument. A single operator runs heterogeneous AI agents (Cursor, Claude Code, others as adopted) on a multi-project portfolio, and every state transition that matters — dispatch, claim, agent self-report, intervention, merge outcome — is captured against a stable assignment identity. The substrate is real production work, not a benchmark or a laboratory task. The construct under study is **coordination cost in heterogeneous AI tool ecosystems**, decomposed into measurable units before it is invoked. The methods generalize: the same architecture answers questions for any team running heterogeneous tools through a coordination layer, and the corpus is structured so that swapping the operator, the agent fleet, or the project mix leaves the instrument intact.

## 2. Operational discipline

The program's research validity rests on operational discipline that is already enforced for product reasons. Three pieces matter most.

The **assignment registry** is the substrate. Every non-trivial unit of work is filed as a self-contained card with explicit acceptance criteria, file ownership, dependencies, and a stable identifier (`DP-` or `ASN-`). Cards do not move silently — every transition (OPEN → CLAIMED → IN_PROGRESS → REVIEW → DONE) is a logged event with an attributable actor. This is what turns the kanban from a UI into a corpus.

The **handoff protocol** governs continuity across sessions and across agents. Before any non-trivial workstream pauses, the agent writes a handoff file (one file per agent, never shared — the shared git index is a known race surface) that names the state, what is committed, what is staged, and what the next agent needs to know. Handoffs are deleted in the same commit that closes the work, leaving git history as the long-term record.

The **two-phase actor handoff** is the builder→reviewer pattern. For assignments on the dual-stage pipeline, the executing agent does not commit: it typecheckss, writes a session report, and fires `devplane_log_completion` with `commit_sha: "UNCOMMITTED"`. A separate review agent verifies, commits with explicit paths, pushes, and fires the second completion. This separation is operationally useful (the reviewer catches what the builder cannot self-see) and methodologically useful (it makes the boundary between agent-attributable and operator-attributable failure auditable after the fact, which is exactly the construct C1 needs to pre-register).

The **shared-index-aware commit protocol** — every commit uses `git commit -- <paths>` with explicit file lists — is in the same family. It exists because parallel agents share `.git/index` and a whole-index commit can sweep up another agent's staged work. The same protocol makes attribution tractable: every commit carries a clean file manifest, and reconciliation against `git log` is mechanical.

The **coordination-event log** ([`instrumentation-spec.md`](instrumentation-spec.md), DP-63) is the apparatus that captures all of the above as immutable, append-only events: dispatch text (hashed and separately scrubbable), agent self-reports stored *separately* from ground-truth merge outcomes, operator interventions with kind and dwell, conflict and auto-resolve signals, session start/end. Self-report and outcome are stored separately because their divergence is the research signal — that is also the operationalization of the false-complete construct.

## 3. Research discipline

This program commits to the practices that distinguish research from product validation.

**Pre-registered predictions.** Each study writes down both the yes-world and the no-world before data collection. C1 ([PROPOSAL.md](PROPOSAL.md)) registers three: H1 (partial offset — risk compensation visible at meaningful magnitude), H2 (operator dwell time decreases following a coordination improvement), H0 (the null — agent-side improvement passes through without offset). The yes/no symmetry matters because the conclusions a vendor would prefer to reach are predictable in advance, and predictable conclusions do not survive contact with rigorous design. Formal OSF deposit is timed to precede unblinding to the post-intervention rate data.

**Falsifiable, operationalized constructs.** "Coordination cost" is decomposed into units before it is invoked. C1 operationalizes the central construct as follows. *Risk compensation* is a measurable reduction in operator-attributable verification activity following a coordination improvement that reduces agent-attributable failure rate, observed as: dwell time per assignment (vigilance proxy), operator-attributable failure rate (mechanism), and time-to-detect for failures that escape into shipped work (Bainbridge's specific prediction that detection worsens even if rate is unchanged). The boundary between agent-attributable and operator-attributable failure is itself a methodologically sensitive construct, which is why it gets its own pre-registered coding rule (§ next).

**Pre-committed coding rules for failure attribution.** A failure is *agent-attributable* if the proximate cause is an output the agent produced that, on its face and judged at the time of production, did not satisfy the dispatch as written. A failure is *operator-attributable* if the proximate cause is a dispatch that under-specified the requirement, an intervention that introduced an error, or an approval/merge action that admitted defective work to shipped state. *Shared-attribution* failures count 0.5 to each. The rule is applied weekly, blind to the intervention condition where possible. Inter-rater reliability is impossible at single-operator N=1 — instead, all dispatch text, agent output, and outcome data are preserved so an external reviewer can re-code independently in a follow-up study. This re-coding follow-up is a real planned ASN, not a hypothetical safeguard.

**Acknowledged researcher position.** The principal investigator is also the operator of the system being studied. This is auto-ethnography for the descriptive arms (A-arm stigmergic-drift work, base-rate reporting on false-complete) and an explicit threat-to-validity for the causal arms (C1, future C-arm interventions). Mitigation is not denial; it is a planned external-operator replication, called out in [PROPOSAL.md](PROPOSAL.md) §9 and committed as a successor assignment rather than as a hypothetical.

**Threats-to-validity register.** [PROPOSAL.md](PROPOSAL.md) §8 names them by category and states a mitigation for each: maturation (the operator gets better over time independent of any intervention; absorbed by structural time-series modeling with the trend coefficient reported explicitly), history (vendor-side model changes confound the intervention; logged when known and cross-checked against the event log), instrumentation reactivity (the act of logging changes operator behavior; mitigated by passive logging and absence of any real-time UI surfacing of the corpus to the operator — cannot be eliminated and is reported as a known confound), construct validity of vigilance (dwell time is a proxy and reported as such), single-operator external validity (the auto-ethnography flag travels with every reported finding).

**Anchored to a literature.** The lead study cites Bainbridge (1983, *Ironies of Automation*), Lee & See (2004, trust calibration), Parasuraman & Manzey (2010, complacency), Peltzman (1975) and Wilde on risk compensation, Endsley (1995) on situation awareness. The full review with confidence flags is at [LITERATURE-REVIEW.md](LITERATURE-REVIEW.md). The program does not claim novel theory; it claims novel measurement of an existing prediction in a setting where the prediction has not been formally tested.

## 4. What this methodology refuses

The program refuses several common research failure modes by name. **No effect-size-free conclusions** — a statistically detectable effect that is operationally trivial is reported as trivial. **No vendor comparisons as primary findings** — if Cursor outperforms Claude Code on some metric in this corpus, that is noise unless replicated under controlled conditions, which we are not running. **No claims about LLM internals or model architecture** — this is a coordination program, not a model-evaluation program. **No survey-only studies** — self-report has a place but is not the primary instrument; the primary instrument is the coordination-event log. **No quiet revisions to pre-registered hypotheses after data collection** — the design is frozen in version-controlled markdown before the run-in period begins, and any subsequent change increments a version stamp and preserves the original in git.

## 5. Peer-review readiness standard

Reports inherit a documented standard. A **field-positioning literature review** must precede the empirical write-up — completed for C1 at [LITERATURE-REVIEW.md](LITERATURE-REVIEW.md). A **replication footprint** — the export script and analysis script that produce the published numbers from the released corpus — is a closure requirement; if a result cannot be re-derived from the repository as of the published commit, it is not yet a report. **LLM-assisted attribution and synthesis** — including the Claude-driven session reports and devplane completions that drive much of the operational record — are reported as a separate signal, never as load-bearing input: when a model has generated or attributed a claim, the report names the model and treats the output as a candidate for verification, not as evidence.

The pipeline status — what is running, queued, blocked, recently completed, and on the three-month horizon — lives at [PIPELINE_STATUS.md](PIPELINE_STATUS.md) and is honest about how young the program is. The seven-slot baseline (overview, program, proposal, literature review, methodology, pipeline status, instrumentation spec) is designed so that visible gaps stay visible.
