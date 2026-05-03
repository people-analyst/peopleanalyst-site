# Trust Calibration and Reliance Under Varying AI Reliability in Software Work

> **Provenance:** secondary literature review, generated 2026-05-01 to 2026-05-02 via deep-research synthesis. See `methodology.md` §1.1 for the discipline. Original `.docx` archived at `sources/_originals/Trust Calibration and Reliance Under Varying AI Reliability in Software Work.docx`.

---

# Trust Calibration and Reliance Under Varying AI Reliability in Software Work

## Executive summary

The post-2020 literature on human-AI software work is now substantial enough to support a few firm conclusions. First, coding studies do measure reliance behavior and downstream code outcomes, but they usually manipulate AI availability, binary quality/provenance cues, or interface interventions rather than a true gradient of reliability over time. I did not find a verified post-2020 coding study that experimentally varies reliability across multiple levels and repeated sessions in a way that would let us estimate trust hysteresis or trust-repair curves. [1]

Second, stated trust and behavioral reliance often come apart. In security tasks, participants can say the tool was helpful or believe their solution is secure while still accepting insecure AI suggestions or producing less secure code. In other settings, awareness or validation support increases verification effort and performance but also increases workload. [2]

Third, the classic algorithm-appreciation/aversion literature associated with Jennifer Logg[3], Berkeley Dietvorst[4], and Jason William Burton[5] does not transfer cleanly to coding: software work looks less like a stable preference for or against algorithms and more like context-sensitive, convenience-driven reliance under costly verification constraints. [6]

I verified the studies below against primary pages from Association for Computing Machinery[7], arXiv[8], or publisher-hosted PDFs. Where a duration, randomization detail, or sample breakdown was not reported in the accessible primary source, I mark it as unspecified rather than inferring it.

## Study-by-study comparison

Measure legend: ST = stated trust/helpfulness/confidence/self-report; BR = behavioral reliance (acceptance/copy/use/override); VE = verification effort (review time, edits, tracing, tests, gaze, search); O = downstream outcome (correctness, security, repair success, maintainability proxy).

## Cross-study synthesis

Across this coding literature, the dominant pattern is not a smooth “more reliability → more trust” curve but a patchwork of coarse manipulations: AI present vs. absent, better vs. worse outputs, provenance disclosure, warnings, instructions, and uncertainty cues. Behavioral reliance often rises whenever AI reduces effort, but that increase does not reliably track either stated trust or downstream code quality/security; the clearest divergences appear in security work, where users can feel confident, rate tools as helpful, or keep accepting suggestions while producing insecure code. Relative to the classic appreciation/aversion literature, coding looks less like a stable preference for algorithms and more like conditional reliance under verification cost. The evidence for asymmetric failure impacts in coding is suggestive rather than cleanly causal: developers report that repeated errors quickly reduce trust, and observational work shows they often revise or discard earlier trust decisions, but no verified coding experiment stages a salient failure and then measures recovery over time. [53]

## Manipulation map

## Panel study blueprint

A credible panel is justified because repeated interactions matter for trust formation in general AI-advice research, Wang’s trust-design work explicitly argues for dynamic recalibration, and the verified coding studies remain overwhelmingly single-session or passive-log designs. A repeated-trials AI-advice study in a non-coding domain found that prior interactions shape later trust and reliance over sequences of trials, while coding work has not yet translated that logic into longitudinal reliability manipulation. [60]

### Experimental manipulations

The panel should manipulate suggestion reliability at multiple levels, not just on/off or good/bad. A defensible minimum would use four reliability bands at the suggestion level—for example, approximately 95%, 85%, 70%, and 55% suggestion-quality bands—combined with explicit variation in error severity: harmless style issue, maintainability issue, functional bug, and silent security flaw. Reliability should not remain stationary. Participants should be assigned to reliability trajectories, such as stable-high, stable-mid, declining, improving, oscillating, and “mostly-high with one catastrophic failure.” That last trajectory is what the current coding literature lacks most: a way to estimate how many correct suggestions are needed to recover after a salient failure.

I would also cross reliability with repair interventions after failures. These can include provenance disclosure, warnings, uncertainty cues, minimal explanations, richer validation aids such as tests or examples, and explicit safety instructions. Wang 2024 and Vasconcelos 2025 provide a strong starting menu of candidate cues; Serafini 2025 and Yardim 2026 show that warnings/instructions matter but are not sufficient on their own. [61]

### Repeated measures

Every suggestion event should generate a compact measurement packet. At minimum, that packet should include: immediate stated trust/confidence in the suggestion; accept/reject/override; whether the suggestion was copied verbatim, partially adopted, or rewritten; verification time; verification actions; final code outcome; and persistence of the AI-derived code after revision and later maintenance.

The repeated measures should clearly separate constructs that the present literature often blends:

Stated trust: trust in the suggestion, confidence in correctness/security, perceived helpfulness, expected future reliability.

Behavioral reliance: accept, reject, partial accept, override, later revert, re-prompt because the first answer was distrusted.

Verification effort: time to first test/run, time to first documentation lookup, number of test runs, stack-trace checks, searches, cursor traces, hover/peek/diff use, edit distance from accepted suggestion, and, where feasible, eye-tracking on a subsample.

Downstream outcomes: correctness, security vulnerabilities, maintainability/readability, static-analysis warnings, complexity, review outcomes, and whether the AI-sourced code survives after 24 hours, 1 week, and the next change.

That separation is exactly what the current field needs, because CCS 2023, ICSE 2024, AIware 2024, Tang 2024, and Vasconcelos 2025 all show in different ways that self-reports, acceptance, and outcomes do not reliably collapse into one measure. [62]

### Sample size and cadence

For a panel that aims to estimate reliability gradients, staged failures, recovery, and subgroup differences, I would not treat this like a small HCI lab study. A practical minimum is 240 retained participants at the end of the panel—roughly 60 per reliability trajectory if there are four major trajectories. Because 6–24 month studies will lose participants, that implies 320–400 recruited at baseline even with moderate attrition. If the design crosses trajectory with participant type, such as students vs. professional developers, I would push the baseline target to 400–600.

The cadence should be frequent enough to create real sequential dynamics rather than a vague “before/after.” For a 6-month design, I would use weekly tasks and aim for 24 sessions. For a 12-month design, either biweekly tasks for 24 sessions or weekly tasks for 40–48 sessions is defensible. For a 24-month design, a lighter cadence can work, but not if it collapses the sequence into only a handful of touchpoints. The unit of power should be the suggestion event nested within person nested within project/task, not just the participant count.

### Logging and instrumentation

The study needs deep IDE instrumentation from the start. That means logging autocomplete exposures, acceptance, edits, deletions, undo events, test runs, compiler/linter results, search actions, navigation actions, documentation access, prompt text if a chat assistant is involved, and the exact suggestion variant shown to the participant. Tang 2024 is the best current example of how valuable IDE + gaze instrumentation can be for verification research, though I would reserve eye-tracking for a subsample or shorter subpanel because of burden and cost. [26]

If resources allow, pair IDE logs with:

screen/video capture for a subset of sessions,

eye-tracking for a rotating subsample,

code review annotations from blinded raters for security and maintainability,

post-session recall on the most trusted and least trusted suggestion of the session,

delayed follow-up on whether accepted code was later reverted, rewritten, or implicated in defects.

### Ethical and consent issues

Because the missing design requires staged failures, the consent process must explicitly cover exposure to intentionally imperfect or misleading AI suggestions in a sandboxed research environment. Participants should know that suggestions may vary in quality, that some may be deliberately degraded for research purposes, and that tasks must remain outside production systems. Compensation should not depend on accepting AI suggestions. Debriefing should reveal the manipulated reliability trajectories and any deceptive elements that were necessary to prevent demand effects.

When security tasks are used, the environment should be isolated so that insecure code cannot be deployed or reused inadvertently. Participants should be able to opt out of the most invasive instrumentation, especially eye-tracking and screen recording, without losing core compensation.

### Analysis plan

The analysis should be explicitly longitudinal.

At the suggestion level, use mixed-effects logistic models for acceptance, override, and secure/incorrect outcomes, with random effects for participant, task, project, and session. Use mixed-effects linear or generalized models for verification time, edit distance, and count outcomes such as number of tests or searches. Reliability band, failure severity, intervention type, session index, and participant expertise should all be modeled as fixed effects, with interactions.

To capture asymmetry and recovery, add:

event-study / interrupted time-series models centered on injected failures,

survival models for time until a participant sharply reduces reliance after a failure,

recovery-curve models estimating how many subsequent correct suggestions are needed to return to pre-failure reliance,

hysteresis models that allow build-up and recovery slopes to differ,

and, if the sequence is rich enough, state-space or hidden-state models distinguishing states such as exploratory trust, routine reliance, rupture, guarded use, and repair.

The key estimands should not be just “average trust increased/decreased,” but: 1. the slope of reliance across reliability bands, 2. the drop after a salient failure, 3. the gap between post-failure stated trust and post-failure behavior, 4. the number of correct suggestions required for recovery, 5. and whether recovery depends on intervention type, error severity, or participant expertise.

## Open questions and limitations

Some of the newest studies, especially the 2025 manipulated-ChatGPT paper and the 2026 password-storage paper, were accessible through ACM title/DOI pages and publisher- or author-hosted abstracts rather than fully expanded open PDFs in this session. I therefore marked some details, especially exact session duration and some assignment mechanics, as unspecified.

The literature also still uses “trust” inconsistently. Several papers explicitly or implicitly treat acceptance as a proxy for trust, while others measure trust only through post-task self-report. That is not a flaw in any single paper so much as the core methodological problem this literature now faces.

The strongest bottom-line conclusion from this scan is straightforward: coding research has shown that AI availability, warnings, provenance, and uncertainty cues can change reliance and outcomes, but it still lacks the experimental machinery needed to estimate gradient effects, failure asymmetry, and trust repair over time.



[1] [9] [54] [56] https://dl.acm.org/doi/10.1145/3490099.3511157

https://dl.acm.org/doi/10.1145/3490099.3511157

[2] [4] [7] [15] [16] [17] [18] [19] [62] https://arxiv.org/pdf/2211.03622

https://arxiv.org/pdf/2211.03622

[3] [36] [37] [38] [39] [40] [41] [55] [57] [61] https://arxiv.org/pdf/2305.11248

https://arxiv.org/pdf/2305.11248

[5] [60] https://pure.tue.nl/ws/files/348036208/3686164.pdf

https://pure.tue.nl/ws/files/348036208/3686164.pdf

[6] [53] https://ideas.repec.org/a/eee/jobhdp/v151y2019icp90-103.html

https://ideas.repec.org/a/eee/jobhdp/v151y2019icp90-103.html

[8] [20] [21] [22] [23] [24] [58] https://homepages.dcc.ufmg.br/~figueiredo/disciplinas/papers/icse2024asare.pdf

https://homepages.dcc.ufmg.br/~figueiredo/disciplinas/papers/icse2024asare.pdf

[10] [11] [12] [13] [14] https://arxiv.org/pdf/2202.07682

https://arxiv.org/pdf/2202.07682

[25] [26] [27] [28] [29] [30] https://arxiv.org/pdf/2405.16081

https://arxiv.org/pdf/2405.16081

[31] [32] [33] [34] [35] [59] https://storage.googleapis.com/gweb-research2023-media/pubtools/7831.pdf

https://storage.googleapis.com/gweb-research2023-media/pubtools/7831.pdf

[42] https://dl.acm.org/doi/10.1145/3702320

https://dl.acm.org/doi/10.1145/3702320

[43] [44] [45] [46] [47] https://arxiv.org/pdf/2302.07248

https://arxiv.org/pdf/2302.07248

[48] https://dl.acm.org/doi/abs/10.1145/3706598.3713989

https://dl.acm.org/doi/abs/10.1145/3706598.3713989

[49] [50] https://casa.rub.de/forschung/publikationen/detail/exploring-the-impact-of-intervention-methods-on-developers-security-behavior-in-a-manipulated-chatgpt-study

https://casa.rub.de/forschung/publikationen/detail/exploring-the-impact-of-intervention-methods-on-developers-security-behavior-in-a-manipulated-chatgpt-study

[51] https://dl.acm.org/doi/10.1145/3772318.3791693

https://dl.acm.org/doi/10.1145/3772318.3791693

[52] https://casa.rub.de/forschung/publikationen/detail/the-ai-tool-cant-make-it-any-worse-investigating-developers-security-behavior-with-ai-assistants-in-a-password-storage-study

https://casa.rub.de/forschung/publikationen/detail/the-ai-tool-cant-make-it-any-worse-investigating-developers-security-behavior-with-ai-assistants-in-a-password-storage-study



# Trust Calibration and Reliance Under Varying AI Reliability in Software Work

## Executive summary

The post-2020 literature on human-AI software work is now substantial enough to support a few firm conclusions. First, coding studies do measure reliance behavior and downstream code outcomes, but they usually manipulate AI availability, binary quality/provenance cues, or interface interventions rather than a true gradient of reliability over time. I did not find a verified post-2020 coding study that experimentally varies reliability across multiple levels and repeated sessions in a way that would let us estimate trust hysteresis or trust-repair curves. 

Second, stated trust and behavioral reliance often come apart. In security tasks, participants can say the tool was helpful or believe their solution is secure while still accepting insecure AI suggestions or producing less secure code. In other settings, awareness or validation support increases verification effort and performance but also increases workload. 

Third, the classic algorithm-appreciation/aversion literature associated with Jennifer Logg, Berkeley Dietvorst, and Jason William Burton does not transfer cleanly to coding: software work looks less like a stable preference for or against algorithms and more like context-sensitive, convenience-driven reliance under costly verification constraints. 

I verified the studies below against primary pages from Association for Computing Machinery, arXiv, or publisher-hosted PDFs. Where a duration, randomization detail, or sample breakdown was not reported in the accessible primary source, I mark it as unspecified rather than inferring it.

## Study-by-study comparison

Measure legend: ST = stated trust/helpfulness/confidence/self-report; BR = behavioral reliance (acceptance/copy/use/override); VE = verification effort (review time, edits, tracing, tests, gaze, search); O = downstream outcome (correctness, security, repair success, maintainability proxy).

## Cross-study synthesis

Across this coding literature, the dominant pattern is not a smooth “more reliability → more trust” curve but a patchwork of coarse manipulations: AI present vs. absent, better vs. worse outputs, provenance disclosure, warnings, instructions, and uncertainty cues. Behavioral reliance often rises whenever AI reduces effort, but that increase does not reliably track either stated trust or downstream code quality/security; the clearest divergences appear in security work, where users can feel confident, rate tools as helpful, or keep accepting suggestions while producing insecure code. Relative to the classic appreciation/aversion literature, coding looks less like a stable preference for algorithms and more like conditional reliance under verification cost. The evidence for asymmetric failure impacts in coding is suggestive rather than cleanly causal: developers report that repeated errors quickly reduce trust, and observational work shows they often revise or discard earlier trust decisions, but no verified coding experiment stages a salient failure and then measures recovery over time. 

## Manipulation map

## Panel study blueprint

A credible panel is justified because repeated interactions matter for trust formation in general AI-advice research, Wang’s trust-design work explicitly argues for dynamic recalibration, and the verified coding studies remain overwhelmingly single-session or passive-log designs. A repeated-trials AI-advice study in a non-coding domain found that prior interactions shape later trust and reliance over sequences of trials, while coding work has not yet translated that logic into longitudinal reliability manipulation. 

### Experimental manipulations

The panel should manipulate suggestion reliability at multiple levels, not just on/off or good/bad. A defensible minimum would use four reliability bands at the suggestion level—for example, approximately 95%, 85%, 70%, and 55% suggestion-quality bands—combined with explicit variation in error severity: harmless style issue, maintainability issue, functional bug, and silent security flaw. Reliability should not remain stationary. Participants should be assigned to reliability trajectories, such as stable-high, stable-mid, declining, improving, oscillating, and “mostly-high with one catastrophic failure.” That last trajectory is what the current coding literature lacks most: a way to estimate how many correct suggestions are needed to recover after a salient failure.

I would also cross reliability with repair interventions after failures. These can include provenance disclosure, warnings, uncertainty cues, minimal explanations, richer validation aids such as tests or examples, and explicit safety instructions. Wang 2024 and Vasconcelos 2025 provide a strong starting menu of candidate cues; Serafini 2025 and Yardim 2026 show that warnings/instructions matter but are not sufficient on their own. 

### Repeated measures

Every suggestion event should generate a compact measurement packet. At minimum, that packet should include: immediate stated trust/confidence in the suggestion; accept/reject/override; whether the suggestion was copied verbatim, partially adopted, or rewritten; verification time; verification actions; final code outcome; and persistence of the AI-derived code after revision and later maintenance.

The repeated measures should clearly separate constructs that the present literature often blends:

Stated trust: trust in the suggestion, confidence in correctness/security, perceived helpfulness, expected future reliability.

Behavioral reliance: accept, reject, partial accept, override, later revert, re-prompt because the first answer was distrusted.

Verification effort: time to first test/run, time to first documentation lookup, number of test runs, stack-trace checks, searches, cursor traces, hover/peek/diff use, edit distance from accepted suggestion, and, where feasible, eye-tracking on a subsample.

Downstream outcomes: correctness, security vulnerabilities, maintainability/readability, static-analysis warnings, complexity, review outcomes, and whether the AI-sourced code survives after 24 hours, 1 week, and the next change.

That separation is exactly what the current field needs, because CCS 2023, ICSE 2024, AIware 2024, Tang 2024, and Vasconcelos 2025 all show in different ways that self-reports, acceptance, and outcomes do not reliably collapse into one measure. 

### Sample size and cadence

For a panel that aims to estimate reliability gradients, staged failures, recovery, and subgroup differences, I would not treat this like a small HCI lab study. A practical minimum is 240 retained participants at the end of the panel—roughly 60 per reliability trajectory if there are four major trajectories. Because 6–24 month studies will lose participants, that implies 320–400 recruited at baseline even with moderate attrition. If the design crosses trajectory with participant type, such as students vs. professional developers, I would push the baseline target to 400–600.

The cadence should be frequent enough to create real sequential dynamics rather than a vague “before/after.” For a 6-month design, I would use weekly tasks and aim for 24 sessions. For a 12-month design, either biweekly tasks for 24 sessions or weekly tasks for 40–48 sessions is defensible. For a 24-month design, a lighter cadence can work, but not if it collapses the sequence into only a handful of touchpoints. The unit of power should be the suggestion event nested within person nested within project/task, not just the participant count.

### Logging and instrumentation

The study needs deep IDE instrumentation from the start. That means logging autocomplete exposures, acceptance, edits, deletions, undo events, test runs, compiler/linter results, search actions, navigation actions, documentation access, prompt text if a chat assistant is involved, and the exact suggestion variant shown to the participant. Tang 2024 is the best current example of how valuable IDE + gaze instrumentation can be for verification research, though I would reserve eye-tracking for a subsample or shorter subpanel because of burden and cost. 

If resources allow, pair IDE logs with:

screen/video capture for a subset of sessions,

eye-tracking for a rotating subsample,

code review annotations from blinded raters for security and maintainability,

post-session recall on the most trusted and least trusted suggestion of the session,

delayed follow-up on whether accepted code was later reverted, rewritten, or implicated in defects.

### Ethical and consent issues

Because the missing design requires staged failures, the consent process must explicitly cover exposure to intentionally imperfect or misleading AI suggestions in a sandboxed research environment. Participants should know that suggestions may vary in quality, that some may be deliberately degraded for research purposes, and that tasks must remain outside production systems. Compensation should not depend on accepting AI suggestions. Debriefing should reveal the manipulated reliability trajectories and any deceptive elements that were necessary to prevent demand effects.

When security tasks are used, the environment should be isolated so that insecure code cannot be deployed or reused inadvertently. Participants should be able to opt out of the most invasive instrumentation, especially eye-tracking and screen recording, without losing core compensation.

### Analysis plan

The analysis should be explicitly longitudinal.

At the suggestion level, use mixed-effects logistic models for acceptance, override, and secure/incorrect outcomes, with random effects for participant, task, project, and session. Use mixed-effects linear or generalized models for verification time, edit distance, and count outcomes such as number of tests or searches. Reliability band, failure severity, intervention type, session index, and participant expertise should all be modeled as fixed effects, with interactions.

To capture asymmetry and recovery, add:

event-study / interrupted time-series models centered on injected failures,

survival models for time until a participant sharply reduces reliance after a failure,

recovery-curve models estimating how many subsequent correct suggestions are needed to return to pre-failure reliance,

hysteresis models that allow build-up and recovery slopes to differ,

and, if the sequence is rich enough, state-space or hidden-state models distinguishing states such as exploratory trust, routine reliance, rupture, guarded use, and repair.

The key estimands should not be just “average trust increased/decreased,” but:

the slope of reliance across reliability bands,

the drop after a salient failure,

the gap between post-failure stated trust and post-failure behavior,

the number of correct suggestions required for recovery,

and whether recovery depends on intervention type, error severity, or participant expertise.

## Open questions and limitations

Some of the newest studies, especially the 2025 manipulated-ChatGPT paper and the 2026 password-storage paper, were accessible through ACM title/DOI pages and publisher- or author-hosted abstracts rather than fully expanded open PDFs in this session. I therefore marked some details, especially exact session duration and some assignment mechanics, as unspecified.

The literature also still uses “trust” inconsistently. Several papers explicitly or implicitly treat acceptance as a proxy for trust, while others measure trust only through post-task self-report. That is not a flaw in any single paper so much as the core methodological problem this literature now faces.

The strongest bottom-line conclusion from this scan is straightforward: coding research has shown that AI availability, warnings, provenance, and uncertainty cues can change reliance and outcomes, but it still lacks the experimental machinery needed to estimate gradient effects, failure asymmetry, and trust repair over time.


