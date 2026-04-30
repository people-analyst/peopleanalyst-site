# Risk Compensation in Human-AI Coordination

**A field-study proposal for the DevPlane research program**

Working draft · v0.1 · 2026-04-29 · For posting at peopleanalyst.com/research/devplane

This is the formal proposal for **C1**, the lead study of the three-arm program described in [PROGRAM.md](PROGRAM.md). It serves as both a research design document and a pre-registration in spirit (formal OSF pre-registration to follow once the analysis pipeline is built and a first run-in period of data is collected).

---

## 1. Background and motivation

Bainbridge (1983), in a six-page paper titled *Ironies of Automation* in the journal *Automatica*, made what has become one of the foundational observations of human-factors research on automation: automating the easy parts of a task makes the remaining manual parts harder, not easier. The operator loses practice on the routine cases the automation now handles, loses the situational awareness that came from doing those routine cases, and is left with the residual exceptional cases that resisted automation precisely because they are difficult, novel, or ill-specified.

Forty years of subsequent work in cockpit automation, process control, automotive systems, and clinical decision support has elaborated this observation into a literature with measurable phenomena: **complacency** (Parasuraman & Manzey 2010), **automation bias** (Mosier & Skitka), the **trust calibration gap** (Lee & See 2004), and most relevantly for this study, **risk compensation** — first formalized in the automotive safety context (Peltzman 1975, Wilde) and observed in domains as varied as protective sports equipment, antilock brakes, and medical procedures.

The risk compensation hypothesis predicts that improvements to a system's automated reliability are partially offset by reductions in the operator's vigilance, such that the net change in total system error is smaller — sometimes substantially smaller — than the improvement to the automated component alone.

**The C1 study asks whether this phenomenon appears in human-AI coordination in software development**, where the "automation" is a fleet of AI coding agents and the "operator" is a developer supervising and dispatching them through a coordination layer (DevPlane).

This question matters because the productivity claims being made for AI coding tools — by vendors, analysts, and increasingly by enterprise buyers — are largely grounded in agent-side measurements (lines of code, tasks completed, time-to-PR). If risk compensation is operative in this regime, those measurements systematically overstate net productivity gains because they ignore the offsetting decrement in operator-attributable error.

## 2. Theoretical frame

The mechanism we hypothesize is:

> Operator vigilance allocates dynamically across attentional capacity. When perceived agent reliability rises (as a result of a coordination improvement that reduces visible failures), the operator reallocates attention away from agent supervision and toward other tasks. This reallocation is rational in expectation but mis-calibrated in detail: agent failures shift from a regime that was caught by operator vigilance to a regime that escapes it.

This is a direct application of risk homeostasis (Wilde) to human-AI software development, mediated by trust calibration (Lee & See 2004) and constrained by the *Ironies of Automation* observation that residual failures shift toward the harder end of the difficulty distribution as automation improves.

We do not claim full risk homeostasis (perfect offset). The empirical literature on risk compensation finds partial offset more often than full offset, with magnitude depending on visibility, salience, and feedback timing. We claim only **detectable partial offset** as the prediction.

## 3. Hypotheses

We pre-register three hypotheses, with explicit yes-world and no-world consequences for each.

### H1 (primary)

> Following a coordination-protocol improvement that measurably reduces agent-attributable failure rate, operator-attributable failure rate increases by a non-trivial fraction of the agent-side reduction, such that net system error reduction is smaller than the agent-side improvement alone.

**Operationalization.**
- Agent-attributable failure: an event where an agent produced output that did not pass review without operator-led correction (rework events, false-complete events, abandonment events).
- Operator-attributable failure: an event where the operator's dispatch, intervention, or supervision is the proximate cause of a defect or rework cycle (mis-specified dispatch, missed conflict, premature merge approval).
- Net system error: total of the above per unit work shipped (per merged PR or per equivalent unit).

**Yes world.** Risk compensation is operative. Engineering investment in coordination tooling should split between agent-quality improvements and interface improvements that maintain operator vigilance. Productivity claims grounded in agent-only measurement systematically overstate net effect.

**No world.** Risk compensation is not detected in this regime. Operators of heterogeneous AI tool ecosystems do not behave like cockpit pilots or process-control operators. Engineering investment in agent quality compounds without offset, and current productivity measurement is not as misleading as the H1 prediction implies.

### H2 (secondary)

> Operator dwell time per assignment (a proxy for vigilance) decreases following the coordination improvement, with effect size correlated to the magnitude of the perceived reliability gain.

**Operationalization.** Dwell time is the elapsed time between an operator opening an assignment card and either approving its associated change, intervening in the queue, or moving to a different card. Vigilance is the latent construct; dwell time is the observable proxy and its construct validity is itself a finding.

### H0 (the null)

> The coordination improvement reduces agent-attributable failure rate without any detectable change in operator-attributable failure rate or operator dwell time.

H0 is the no-world for both H1 and H2. It is also the most actionable null result: if true, it suggests that this specific operator-system configuration does not exhibit the *Ironies of Automation*, and the program's subsequent studies should investigate why this regime differs from the cockpit and process-control cases.

## 4. Setting and apparatus

**Setting.** DevPlane in production, single-operator (Mike West), running heterogeneous AI agents (Cursor cloud, Claude Code, others as adopted) on a multi-project portfolio of working software repositories.

**Apparatus.** The coordination-event log specified in [`instrumentation-spec.md`](instrumentation-spec.md), implemented as DP-50, captures all dispatches, agent self-reports, merge outcomes, operator interventions, and timing information needed for the dependent variables defined in §3.

**Why a field study.** A laboratory study could control more variables but would lose the construct it is trying to measure. Risk compensation is a longitudinal, system-level phenomenon that emerges from sustained operator-system interaction; manufactured task settings of 1–2 hours produce the wrong distribution of operator behavior. The field setting is essential to construct validity here, and the cost is a more complex analysis to handle confounding.

## 5. Intervention design

**Candidate intervention.** The auto-resolve heuristic for assignment-status reconciliation (lineage ASN-953/979). This is a single, well-bounded change that:

- Reduces a specific class of agent-coordination failure (queue drift, "open but shipped" cards, ASN collision)
- Has clear before/after operational signatures
- Was already planned as a product improvement, so studying it does not require introducing artificial conditions
- Is reversible if the analysis indicates contamination from a confound

**Backup interventions** in priority order, in case the auto-resolve heuristic produces too small a primary-effect signal or runs into implementation timing issues:

1. The structured handoff protocol (improves session-to-session continuity for agents)
2. A capacity-regulation feature (limits agent dispatch when queue is saturated)
3. The conflict-detection system (flags overlapping work earlier)

Each backup intervention is a candidate for its own H1 test, sequentially.

## 6. Measurement

### Primary dependent variable
**Net system error rate.** Defined as (agent-attributable failures + operator-attributable failures) / units of work shipped, where unit of work is one merged PR or equivalent. Measured weekly across the run-in and post-intervention periods.

### Secondary dependent variables
- **Agent-attributable failure rate** alone, to verify the intervention worked on its target
- **Operator-attributable failure rate** alone, to test the mechanism
- **Dwell time per assignment** as the vigilance proxy (H2)
- **Time to detect** for failures that do escape into shipped work — Bainbridge's prediction is that detection time worsens even if rate is unchanged

### Construct definitions

The boundary between agent- and operator-attributable failures is the methodologically sensitive construct. We pre-register the coding rule:

> A failure is **agent-attributable** if the proximate cause is an output the agent produced that, on its face and judged at the time of production, did not satisfy the dispatch as written. A failure is **operator-attributable** if the proximate cause is a dispatch that under-specified the requirement, an intervention that introduced an error, or an approval/merge action that admitted defective work to the shipped state. A failure may be **shared-attribution**, in which case it counts 0.5 to each.

This rule will be applied by the operator (Mike) at the end of each week, blind to the intervention condition where possible. Inter-rater reliability is impossible at single-operator N=1; instead we will preserve all dispatch text, agent output, and outcome data so that an external reviewer can re-code the failures independently in a later study (planned as a follow-up).

## 7. Analysis plan

### Primary analysis
**Bayesian structural time-series** (CausalImpact-style) modeling the net system error rate across a run-in period (≥30 days pre-intervention) and a post-intervention period (≥60 days). The counterfactual is constructed from the pre-intervention trend with appropriate priors on volatility.

The H1 prediction is that the post-intervention trajectory is *above* the pure agent-improvement counterfactual (which would be the trajectory if the agent improvement carried through with no offset) but *below* the pre-intervention trend (so net is still an improvement, just smaller than agent-side suggests).

### Secondary analyses
- Two-sample comparison of dwell time distributions, pre vs. post, with bootstrap confidence intervals (H2)
- Survival analysis on time-to-detect for failures that escaped to shipped state
- Visual inspection of week-over-week trajectories for any non-linear effects suggesting adaptation phases

### Pre-registered exclusions
- Any week containing fewer than 5 merged units is excluded from rate calculations
- Any failure related to a pre-existing infrastructure outage (CI, GitHub, Vercel, etc.) is excluded as not attributable to the coordination system

### Sample size and power
With single-operator N=1, classical power calculation is not directly applicable. Instead we commit to a minimum observation window: 90 days post-intervention. Effect sizes will be reported as point estimates with credible intervals; the analysis is descriptive of this case and explicitly does not generalize. Generalization requires the external-operator replication described in §9.

## 8. Threats to validity

### Internal validity
- **Maturation.** The operator gets better at the operator role over time independent of any intervention. Mitigated by: structural time-series modeling that absorbs trend; reporting trend coefficient explicitly.
- **History.** External events (model changes from agent vendors, new tools introduced) confound the intervention. Mitigated by: logging vendor-side changes when known; cross-checking against event log for unexplained shifts.
- **Instrumentation reactivity.** The act of logging events changes operator behavior — Hawthorne effect. Mitigated by: passive logging only, no real-time surfacing of events to the operator, no behavior-change UI. Cannot be eliminated.

### Construct validity
- **Vigilance is latent.** Dwell time is a proxy and may not track the construct in all conditions. Mitigated by: reporting dwell-time effects as proxy results and flagging interpretation uncertainty.
- **Failure attribution is judgment-laden.** The agent-vs-operator boundary is not crisp. Mitigated by: pre-registered coding rule; preservation of raw evidence for external re-coding.

### External validity
- **Single operator (Mike).** Findings are case-specific. Mitigated by: explicit auto-ethnography flag in all reporting; planned external-operator replication.
- **Single coordination layer (DevPlane).** Findings may be specific to this architecture. Mitigated by: theoretical framing that names the architectural features doing the work, so transfer can be tested.

### Conclusion validity
- **Multiple comparisons.** Several secondary analyses risk false positives. Mitigated by: pre-registering primary analysis; secondary analyses reported as exploratory, not confirmatory.

## 9. Limitations and scope

This study explicitly does not:

- Test whether AI agents are "good" or "bad" at coding
- Compare specific vendors or models
- Make claims about software productivity in general
- Generalize to multi-operator teams (which have additional coordination dynamics not present here)
- Make policy or buying recommendations

A second-phase study with one or more external operators is planned to address the single-operator limitation. That study will require recruitment, consent protocols, and likely IRB oversight depending on institutional partnership. It is not committed in this proposal.

## 10. Timeline

| Phase | Duration | Milestone |
|---|---|---|
| Instrumentation (DP-50) | ~2 weeks | Coordination-event log live, capturing per spec |
| Run-in (baseline) | ≥ 30 days | Pre-intervention corpus accumulated |
| Intervention deployment | ~1 week | Auto-resolve heuristic released; intervention timestamp recorded |
| Post-intervention observation | ≥ 90 days | Sufficient corpus for analysis |
| Analysis and write-up | ~6 weeks | First draft of report |
| Pre-registration formalization | Concurrent | OSF pre-registration filed before unblinding to the post-intervention rate data |

Total: ~7–8 months from instrumentation to first draft.

## 11. Expected contributions

- An empirical test of *Ironies of Automation* (Bainbridge 1983) in a setting — heterogeneous AI agents in software development — where the prediction has not been formally tested
- A methodology for measuring coordination cost using continuous production telemetry, replicable in other multi-tool operator settings
- A failure-mode taxonomy with prevalence rates, useful as a reference point for subsequent comparative studies
- An honest base-rate report on how often AI agent self-reports of completion are accurate (the "false-complete" rate), which is a parameter several adjacent literatures need but few have measured

Negative results (H0) are equally valuable and will be published with equal prominence.

## 12. References

The full literature engaged by this program is reviewed in [LITERATURE-REVIEW.md](LITERATURE-REVIEW.md). The proposal-critical references are:

- Bainbridge, L. (1983). Ironies of Automation. *Automatica*, 19(6), 775–779.
- Lee, J. D., & See, K. A. (2004). Trust in automation: Designing for appropriate reliance. *Human Factors*, 46(1), 50–80.
- Parasuraman, R., & Manzey, D. H. (2010). Complacency and bias in human use of automation: An attentional integration. *Human Factors*, 52(3), 381–410.
- Peltzman, S. (1975). The effects of automobile safety regulation. *Journal of Political Economy*, 83(4), 677–725.
- Wilde, G. J. S. (1982). The theory of risk homeostasis: Implications for safety and health. *Risk Analysis*, 2(4), 209–225.
- Endsley, M. R. (1995). Toward a theory of situation awareness in dynamic systems. *Human Factors*, 37(1), 32–64.
- Mosier, K. L., & Skitka, L. J. (1996). Human decision makers and automated decision aids: Made for each other? In R. Parasuraman & M. Mouloua (Eds.), *Automation and human performance: Theory and applications* (pp. 201–220). Erlbaum.
