# Rupture and Repair in Human-AI Coding Interaction

> **Provenance:** secondary literature review, generated 2026-05-01 to 2026-05-02 via deep-research synthesis. See `methodology.md` §1.1 for the discipline. Original `.docx` archived at `sources/_originals/Rupture and Repair in Human-AI Coding Interaction.docx`.

---

# Rupture and Repair in Human-AI Coding Interaction

## Executive summary

Post-2020 evidence on human-AI coding interaction is now strong enough to support a practical rupture-and-repair model, but it is still dominated by small- to mid-size studies and short sessions rather than true longitudinal designs. Across the direct coding studies, the most consequential ruptures are not obvious syntax failures; they are silent semantic errors, partial or missing-precondition answers, context-loss failures, overcomplicated outputs, and repository-scale misalignment, because those failures delay detection and make repair expensive (see Tie et al., Vaithilingam et al., Barke et al., Perry et al., Di & Zhang, Ehsani, and SWE-CI in the comparison table). The best-documented repair strategies are re-prompting, task scaffolding, adding context, manual override, switching tasks/tools, and escalation to outside sources or people; these strategies help, but their success is only moderate in the one study that reports rates in detail, and persistent unhelpful responses strongly predict abandonment. Trust is consistently double-edged: developers often report liking or preferring the assistant even when objective time, success, or security outcomes do not improve, and in security contexts the assistant can increase false confidence. The main research gap is no longer “do failures happen?” but “how quickly are different failures detected, which repair path is chosen, how often does repair actually recover the session, and what delayed regressions appear weeks or months later?”

Metadata note: links below prioritize arXiv, DOI, Association for Computing Machinery pages, or the closest already-verified public manuscript page recovered in the earlier scan. Where the earlier verified scan did not recover stable metadata, I mark fields as unspecified rather than inventing values.

## Comparison table

Rows marked adjacent are included because they provide a repair or working-alliance lens that is useful for coding interaction, not because they are direct coding studies.

Important versioning note: the accessible Tie et al. preprint and the later revised/TOSEM version do not report identical sample sizes or headline summaries. I therefore keep them separate and do not mechanically merge their counts.

## Cross-study synthesis

Across the direct coding studies, failure detection follows a consistent hierarchy: overt correctness failures are caught by compilers, tests, or immediate runtime problems, while silent semantic, partial, security, and context-loss failures are often detected only after code inspection, execution anomalies, documentation lookup, or sometimes not at all (Tie; Vaithilingam; Barke; Perry). Repair is also patterned rather than random: clarification, task scaffolding, and adding context appear more effective than opaque manual debugging in the best-reported rates, and interfaces that make intent inspectable can improve both speed and success (Tie; Di & Zhang). Trust and usability judgments diverge from objective outcomes: users often prefer or feel helped by the assistant even when time, success, or security do not improve, and overconfidence can reduce scrutiny (Vaithilingam; Perry). Compounding dynamics appear at multiple scales: a small local misunderstanding can create a 20-minute debugging cul-de-sac in a lab session, while at repository scale it can expand into multi-file PR failure, CI breakage, duplicate work, or long-horizon regressions (Barke; Vaithilingam; Ehsani; SWE-CI). The largest remaining empirical weakness is that very few studies measure time-to-suspicion, time-to-localization, and time-to-repair as separate events, even though the literature strongly suggests those intervals are where the real productivity and trust costs accumulate.

## Gap statement for a credible panel study

A credible 6–24 month panel study should treat rupture-and-repair in coding as an event sequence, not a final-score problem. The experimental core should seed several rupture classes that the present literature already suggests are behaviorally distinct: silent semantic bugs, partial answers with missing preconditions, confidently wrong API use, context-loss after several turns, cognitive-overload outputs that are locally plausible but globally unhelpful, and repository-scale tool/agent misalignment that only surfaces in CI or review. Those seeds should be crossed with repair-affordance arms, at minimum: plain conversational use, structured prompt-scaffolding support, a grounding-aware editable-comment interface, validator-rich assistance with tests/CI/security feedback surfaced early, and escalation paths to external search or a human reviewer. This design follows the failure classes emphasized by Tie, the mode/validation dynamics in Barke, the debugging-cost findings in Vaithilingam, the silent-security failures in Perry, the grounding intervention in Di & Zhang, and the repository-scale compounding in Ehsani and SWE-CI.

The logging layer has to be much richer than in most current studies. A serious design must capture time-to-suspicion, time-to-localization, and time-to-repair as distinct timestamps; full prompt history and context-state changes; model version and tool-selection events; code diffs, file-touch counts, branch transitions, and revert operations; validator outputs including tests, CI, lint, type checking, and security scans; and escalation events such as switching tools, opening docs, searching, asking a human, or abandoning the session. The right instrumentation is a combination of IDE plugin telemetry, git hooks, captured assistant interaction logs, server-side tool traces, and repository/CI harvesting. Without that joined trace, the field will continue to know that derailments happen without being able to say when they first become visible or why one repair path succeeds while another fails.

The sample and task design need to correct the external-validity limits of current work. A credible main sample should be professional developers, with students used only as pilots or comparison strata rather than as the primary evidence for deployment claims. Tasks should come from real, testable repositories and span multiple difficulty and familiarity levels: bug fixing, refactoring, unfamiliar API integration, security hardening, multi-file feature work, and bounded pull-request tasks. The same repos should be exercised under multiple autonomy levels, such as autocomplete/chat assistance, bounded tool-using agents, and PR-submitting agents, because the literature shows that rupture mechanisms change when responsibility shifts from suggestion to execution. Repository selection should favor repos with strong tests, stable issue histories, and reproducible CI so that delayed regressions can be attributed cleanly.

Outcome metrics must extend beyond immediate completion. The minimum set is productivity, correctness, repair burden, abandonment, trust calibration, and long-term regressions. Productivity should include not just task time but net time after repair, number of abandoned branches, and rework required later. Correctness should include functional tests, semantic evaluation where possible, and security or policy checks for relevant tasks. Trust should be measured repeatedly rather than once, with emphasis on task-goal alignment, perceived recoverability, and calibrated confidence instead of a single generic satisfaction item. Long-term outcomes should include reopened issues, reverted commits, reviewer churn, regression introductions, and repository health checks after merge or handoff. These choices are motivated by the misalignment between subjective preference and objective outcomes in Vaithilingam and Perry, the abandonment dynamics in Tie, and the delayed derailments seen in Ehsani and SWE-CI.

Power should be planned at the event level, not only at the participant level. The data structure will be nested—rupture events within sessions, sessions within developers, developers within repos—so mixed-effects models and survival/event-history models are the natural analysis framework. Because existing human studies are small and do not provide stable interaction-effect estimates, the safest approach is simulation-based power analysis, using plausible rupture and abandonment rates informed by Tie’s failure counts and by pilot data from the instrumentation phase. As a practical design target, a strong panel would aim for roughly 150–300 professional developers with 8–12 instrumented sessions each, or an equivalent number of repeated observations that yields hundreds of common rupture events per repair arm; rarer outcomes such as abandonment, security regressions, or PR rejection will require either larger samples, longer follow-up, or deliberate oversampling of high-risk tasks. A smaller student-heavy study can be valuable as a pilot, but it should not be treated as definitive evidence about production use.

Operationally, the study must be built as if it were handling sensitive production telemetry, because it probably will. Ethical review should require explicit consent, separation of research data from employee performance evaluation, and clear redaction/secrets policies. Raw prompts, diffs, and repository traces should be stored only as long as necessary, with de-identification, secret scanning, and access controls built into the pipeline. Model versions, dependency snapshots, seeded rupture scripts, and validators should be containerized and version-locked so that every failure and repair episode is reproducible. The most credible seeding/validation setup would combine deterministic task seeds, frozen repository snapshots, mirrored CI, and pre-registered evaluation criteria. Otherwise, the study risks confounding model drift, repository drift, and human adaptation.

## Measure-to-instrument map

These measures directly target the main blind spots left by the current literature: event-level latency, repair pathway efficacy, and delayed repository consequences.

## Illustrative panel cadence

timeline
    title Rupture-and-repair panel cadence for a 6–24 month study
    Month 0 : ethics review
            : consent and baseline profiling
            : instrumentation setup
            : repository snapshotting and seed validation
    Months 1-2 : pilot sessions
               : telemetry shakeout
               : power-model calibration
    Months 2-6 : repeated instrumented coding sessions
               : post-session trust and recoverability surveys
               : monthly CI/test/security harvests
    Months 3, 6, 9, 12 : qualitative follow-up interviews
                        : repository health checks
                        : regression and revert audits
    Months 12-18 : continued sessions for long-horizon subgroup
                 : autonomy-level crossovers
                 : reviewer and maintainer feedback collection
    Months 18-24 : final follow-ups
                 : delayed regression scans
                 : retention audit
                 : preregistered closeout analysis

This cadence is designed to capture both short-lag derailments that appear within a session and delayed repository consequences that only emerge after more code, more review, and more CI cycles. That is the central empirical gap left by the present literature: short lab studies reveal rupture and repair pressure, while the autonomous-agent studies reveal delayed compounding, but almost no study yet connects the two in one longitudinal design.





# Rupture and Repair in Human-AI Coding Interaction

## Executive summary

Post-2020 evidence on human-AI coding interaction is now strong enough to support a practical rupture-and-repair model, but it is still dominated by small- to mid-size studies and short sessions rather than true longitudinal designs. Across the direct coding studies, the most consequential ruptures are not obvious syntax failures; they are silent semantic errors, partial or missing-precondition answers, context-loss failures, overcomplicated outputs, and repository-scale misalignment, because those failures delay detection and make repair expensive (see Tie et al., Vaithilingam et al., Barke et al., Perry et al., Di & Zhang, Ehsani, and SWE-CI in the comparison table). The best-documented repair strategies are re-prompting, task scaffolding, adding context, manual override, switching tasks/tools, and escalation to outside sources or people; these strategies help, but their success is only moderate in the one study that reports rates in detail, and persistent unhelpful responses strongly predict abandonment. Trust is consistently double-edged: developers often report liking or preferring the assistant even when objective time, success, or security outcomes do not improve, and in security contexts the assistant can increase false confidence. The main research gap is no longer “do failures happen?” but “how quickly are different failures detected, which repair path is chosen, how often does repair actually recover the session, and what delayed regressions appear weeks or months later?”

Metadata note: links below prioritize arXiv, DOI, Association for Computing Machinery pages, or the closest already-verified public manuscript page recovered in the earlier scan. Where the earlier verified scan did not recover stable metadata, I mark fields as unspecified rather than inventing values.

## Comparison table

Rows marked adjacent are included because they provide a repair or working-alliance lens that is useful for coding interaction, not because they are direct coding studies.

Important versioning note: the accessible Tie et al. preprint and the later revised/TOSEM version do not report identical sample sizes or headline summaries. I therefore keep them separate and do not mechanically merge their counts.

## Cross-study synthesis

Across the direct coding studies, failure detection follows a consistent hierarchy: overt correctness failures are caught by compilers, tests, or immediate runtime problems, while silent semantic, partial, security, and context-loss failures are often detected only after code inspection, execution anomalies, documentation lookup, or sometimes not at all (Tie; Vaithilingam; Barke; Perry). Repair is also patterned rather than random: clarification, task scaffolding, and adding context appear more effective than opaque manual debugging in the best-reported rates, and interfaces that make intent inspectable can improve both speed and success (Tie; Di & Zhang). Trust and usability judgments diverge from objective outcomes: users often prefer or feel helped by the assistant even when time, success, or security do not improve, and overconfidence can reduce scrutiny (Vaithilingam; Perry). Compounding dynamics appear at multiple scales: a small local misunderstanding can create a 20-minute debugging cul-de-sac in a lab session, while at repository scale it can expand into multi-file PR failure, CI breakage, duplicate work, or long-horizon regressions (Barke; Vaithilingam; Ehsani; SWE-CI). The largest remaining empirical weakness is that very few studies measure time-to-suspicion, time-to-localization, and time-to-repair as separate events, even though the literature strongly suggests those intervals are where the real productivity and trust costs accumulate.

## Gap statement for a credible panel study

A credible 6–24 month panel study should treat rupture-and-repair in coding as an event sequence, not a final-score problem. The experimental core should seed several rupture classes that the present literature already suggests are behaviorally distinct: silent semantic bugs, partial answers with missing preconditions, confidently wrong API use, context-loss after several turns, cognitive-overload outputs that are locally plausible but globally unhelpful, and repository-scale tool/agent misalignment that only surfaces in CI or review. Those seeds should be crossed with repair-affordance arms, at minimum: plain conversational use, structured prompt-scaffolding support, a grounding-aware editable-comment interface, validator-rich assistance with tests/CI/security feedback surfaced early, and escalation paths to external search or a human reviewer. This design follows the failure classes emphasized by Tie, the mode/validation dynamics in Barke, the debugging-cost findings in Vaithilingam, the silent-security failures in Perry, the grounding intervention in Di & Zhang, and the repository-scale compounding in Ehsani and SWE-CI.

The logging layer has to be much richer than in most current studies. A serious design must capture time-to-suspicion, time-to-localization, and time-to-repair as distinct timestamps; full prompt history and context-state changes; model version and tool-selection events; code diffs, file-touch counts, branch transitions, and revert operations; validator outputs including tests, CI, lint, type checking, and security scans; and escalation events such as switching tools, opening docs, searching, asking a human, or abandoning the session. The right instrumentation is a combination of IDE plugin telemetry, git hooks, captured assistant interaction logs, server-side tool traces, and repository/CI harvesting. Without that joined trace, the field will continue to know that derailments happen without being able to say when they first become visible or why one repair path succeeds while another fails.

The sample and task design need to correct the external-validity limits of current work. A credible main sample should be professional developers, with students used only as pilots or comparison strata rather than as the primary evidence for deployment claims. Tasks should come from real, testable repositories and span multiple difficulty and familiarity levels: bug fixing, refactoring, unfamiliar API integration, security hardening, multi-file feature work, and bounded pull-request tasks. The same repos should be exercised under multiple autonomy levels, such as autocomplete/chat assistance, bounded tool-using agents, and PR-submitting agents, because the literature shows that rupture mechanisms change when responsibility shifts from suggestion to execution. Repository selection should favor repos with strong tests, stable issue histories, and reproducible CI so that delayed regressions can be attributed cleanly.

Outcome metrics must extend beyond immediate completion. The minimum set is productivity, correctness, repair burden, abandonment, trust calibration, and long-term regressions. Productivity should include not just task time but net time after repair, number of abandoned branches, and rework required later. Correctness should include functional tests, semantic evaluation where possible, and security or policy checks for relevant tasks. Trust should be measured repeatedly rather than once, with emphasis on task-goal alignment, perceived recoverability, and calibrated confidence instead of a single generic satisfaction item. Long-term outcomes should include reopened issues, reverted commits, reviewer churn, regression introductions, and repository health checks after merge or handoff. These choices are motivated by the misalignment between subjective preference and objective outcomes in Vaithilingam and Perry, the abandonment dynamics in Tie, and the delayed derailments seen in Ehsani and SWE-CI.

Power should be planned at the event level, not only at the participant level. The data structure will be nested—rupture events within sessions, sessions within developers, developers within repos—so mixed-effects models and survival/event-history models are the natural analysis framework. Because existing human studies are small and do not provide stable interaction-effect estimates, the safest approach is simulation-based power analysis, using plausible rupture and abandonment rates informed by Tie’s failure counts and by pilot data from the instrumentation phase. As a practical design target, a strong panel would aim for roughly 150–300 professional developers with 8–12 instrumented sessions each, or an equivalent number of repeated observations that yields hundreds of common rupture events per repair arm; rarer outcomes such as abandonment, security regressions, or PR rejection will require either larger samples, longer follow-up, or deliberate oversampling of high-risk tasks. A smaller student-heavy study can be valuable as a pilot, but it should not be treated as definitive evidence about production use.

Operationally, the study must be built as if it were handling sensitive production telemetry, because it probably will. Ethical review should require explicit consent, separation of research data from employee performance evaluation, and clear redaction/secrets policies. Raw prompts, diffs, and repository traces should be stored only as long as necessary, with de-identification, secret scanning, and access controls built into the pipeline. Model versions, dependency snapshots, seeded rupture scripts, and validators should be containerized and version-locked so that every failure and repair episode is reproducible. The most credible seeding/validation setup would combine deterministic task seeds, frozen repository snapshots, mirrored CI, and pre-registered evaluation criteria. Otherwise, the study risks confounding model drift, repository drift, and human adaptation.

## Measure-to-instrument map

These measures directly target the main blind spots left by the current literature: event-level latency, repair pathway efficacy, and delayed repository consequences.

## Illustrative panel cadence

Month 0ethics reviewconsent and baselineprofilinginstrumentationsetuprepositorysnapshotting andseed validationMonths 1-2pilot sessionstelemetry shakeoutpower-modelcalibrationMonths 2-6repeatedinstrumented codingsessionspost-session trustand recoverabilitysurveysmonthlyCI/test/securityharvestsMonths 3, 6, 9, 12qualitative follow-upinterviewsrepository healthchecksregression and revertauditsMonths 12-18continued sessionsfor long-horizonsubgroupautonomy-levelcrossoversreviewer andmaintainer feedbackcollectionMonths 18-24final follow-upsdelayed regressionscansretention auditpreregisteredcloseout analysisRupture-and-repair panel cadence for a 6–24 month study

Show code

This cadence is designed to capture both short-lag derailments that appear within a session and delayed repository consequences that only emerge after more code, more review, and more CI cycles. That is the central empirical gap left by the present literature: short lab studies reveal rupture and repair pressure, while the autonomous-agent studies reveal delayed compounding, but almost no study yet connects the two in one longitudinal design.


