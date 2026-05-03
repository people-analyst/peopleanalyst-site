# Longitudinal cognitive effects and skill change in AI-assisted programming

> **Provenance:** secondary literature review, generated 2026-05-01 to 2026-05-02 via deep-research synthesis. See `methodology.md` §1.1 for the discipline. Original `.docx` archived at `sources/_originals/Longitudinal cognitive effects and skill change in AI-assisted programming.docx`.

---

# Longitudinal cognitive effects and skill change in AI-assisted programming

## Scope and evidence standard

This scan focuses on post-2020 studies about AI coding assistants and closely related programming tutors, with priority given to studies that track change across days, weeks, semesters, or years rather than one-shot lab sessions. For each load-bearing study, I verified the paper against a primary source page on arXiv, ACM, IEEE/ACM conference pages, or a publisher page, and extracted the design, duration, sample size, and instrument(s). I coded studies as true longitudinal, short repeated-measures, cohort-longitudinal, cross-sectional comparator, or proposal/framework so the difference between actual temporal evidence and design aspirations stays explicit.

## Comparison table

### Proposal and framework papers that matter, but are not longitudinal evidence

## What longitudinal evidence actually exists

The strongest conclusion from the literature is that true longitudinal evidence is still very thin. There are only a handful of studies that observe programming-related AI use over more than a few days, and those studies mostly measure trust, workflow, or course-level prompting behavior rather than durable change in code comprehension, debugging ability, problem decomposition, language fluency, or metacognitive calibration. The cleanest student repeated-measures designs are Kazemitabaar’s 10-session-plus-retention study, Ma’s 8-week course study, and Shah’s 10-day trust-evolution study; the cleanest professional longitudinal designs are Stray’s two-year Copilot case study and Sergeyuk’s two-year IDE telemetry study. None of those, however, provides a 6–24 month individual-level panel of programming cognition. [23]

What exists instead are three weaker temporal designs. First, short repeated-measures studies show immediate and near-term adaptation, not durable skill change. Second, cohort-longitudinal classroom studies show that AI becomes normalized and that prompting shifts toward verification and debugging, but they do not follow the same learners over long spans and cannot isolate model drift, instructor adaptation, or peer norms from learner development. Third, professional telemetry studies reveal macro-level workflow restructuring over years, but they do not contain direct skill tests. The result is a fundamental mismatch between the intensity of the deskilling debate and the maturity of the evidence base. [24]

## Deskilling, skill substitution, and critical thinking

The broadest empirical bridge from programming to the deskilling debate comes from the 2025 critical-thinking paper by researchers from Microsoft Research[25] and collaborators. In a survey of 319 knowledge workers describing 936 GenAI-assisted work tasks, higher confidence in GenAI predicted less critical thinking, while higher self-confidence predicted more critical thinking; qualitatively, GenAI shifted critical effort from direct task execution toward verification, response integration, and stewardship. That is not a programming study, but it maps closely onto the programming literature’s recurring observation that AI does not remove cognition so much as reallocate it toward checking, selecting, and integrating machine output. [26]

In programming-specific evidence, the pattern is similar but sharper. Prather et al. show that struggling novices can finish with an illusion of competence; Shihab et al. show that brownfield work shifts from read-understand-implement toward prompt-view-implement; and Qiao et al. show that performance can improve without any accompanying rise in codebase understanding. Observing Without Doing reaches a similar conclusion through the lens of cognitive apprenticeship: students often observe and reuse expert-level solutions without participating in the articulation, reflection, and refinement that build independent skill. Together, these studies support a skill-substitution account more strongly than a demonstrated long-run deskilling account: AI often substitutes for parts of planning, coding, and local debugging, but the literature has not yet shown that this substitution accumulates into measurable long-term decline. [27]

The literature also contains important negative and null findings that complicate alarmist deskilling narratives. Kazemitabaar et al. did not find short-term decrements in manual code modification or one-week retention; Bassner et al. found better scores but the same learning rather than worse learning; the three-year classroom study found stable assignment and final-grade outcomes despite large changes in prompt behavior; and Stray et al. found no statistically significant post-adoption change in commit-based activity among professional Copilot users. These results do not disprove long-run deskilling, but they do show that the strongest current evidence is not “AI causes immediate skill collapse.” It is closer to “AI can improve completion, reduce frustration, and change work patterns while leaving learning unchanged or undermeasured.” [28]

The “Google effect” generalized to LLMs appears in this literature mostly as a conceptual framing, not as a direct programming measurement. In a higher-education study comparing LLMs and search, students described ChatGPT as keeping material in a more manageable zone of difficulty, but also as reducing the “mental exercise” of finding and synthesizing information, raising concerns about retention and “brain rust.” Programming papers such as DBox and Knowledge Markers pick up exactly this tension: AI can keep learners inside a workable Zone of Proximal Development, but unless it is deliberately scaffolded, it can also short-circuit the productive struggle needed for decomposition, evaluation, and habit formation. The key point is that this ZPD/cognitive-apprenticeship line is currently better developed as theory and design guidance than as longitudinal evidence of measured skill change. [29]

## Synthesis

The most defensible synthesis is this: post-2020 research on AI-assisted programming supports a performance–understanding dissociation far more strongly than it supports either simple “deskilling” or simple “no-harm” claims. Across students, AI assistance repeatedly improves speed, completion, and subjective ease, while direct evidence for gains in comprehension, debugging independence, decomposition quality, or calibrated self-assessment is weak, mixed, or absent. Where comprehension is measured directly, it often fails to rise with performance. Where metacognition is examined, the most common problems are over-trust, reactive debugging, poor self-assessment, and shallow engagement with expert-level solutions. Where true longitudinal evidence exists for professionals, it tracks workflow restructuring over months and years but does not test cognition directly. So the current state of the field is not “we know AI programming assistants deskill developers”; it is “we have growing evidence that they can substitute for parts of programming work, narrow or redirect metacognitive activity, and decouple visible productivity from invisible understanding, while the long-run skill trajectory remains largely unmeasured.” [30]

## Gap statement for a credible 6-to-24-month panel study

A credible 6-to-24-month panel study would need to do much more than log adoption or survey attitudes. It would need a baseline before routine AI use, repeated measurement waves, and explicit AI-withdrawal checkpoints so that researchers can distinguish temporary assistance from genuine capability growth. At minimum, the same participants should be tested every 6 to 8 weeks on unfamiliar-code comprehension, debugging and fault localization, problem decomposition into subgoals, language/API fluency in the target language, and transfer to adjacent tasks done without AI support. That is the only way to tell whether AI is building internal skill, merely masking weakness, or producing dependence that is only visible when the tool is removed. The current literature simply does not do this. [31]

The measurement battery should combine objective programming tests with metacognitive instrumentation. Objective tests should include codebase-comprehension quizzes, debugging tasks scored by fix quality and time-to-isolate root cause, decomposition tasks scored for subgoal structure and sequencing, and language-fluency tasks that assess idiomatic use of libraries and error interpretation. Metacognition should be measured through confidence judgments before and after each task, trust/reliance scales, calibration error between predicted and actual performance, and structured reflection prompts that capture why participants accepted, edited, or rejected AI suggestions. Existing studies already show that trust, self-confidence, and self-perception matter; what is missing is a panel that tracks whether those constructs improve, deteriorate, or bifurcate over time. [32]

The design also needs real usage telemetry across tools, not just single-tool exposure. It should instrument prompt requests, accepted and rejected suggestions, copy/paste from chat to IDE, degree of post-AI editing, time spent verifying outputs, context switching, test-writing behavior, and use of external search. Because tools differ substantially in interaction style, the panel should distinguish autocomplete-style assistants, chat-based assistants, and more agentic environments. Current studies mostly examine Copilot, ChatGPT, or integrated tutors; there is almost no longitudinal evidence yet on Cursor-, Claude Code-, or agentic-IDE-style use in the wild, which is a major external-validity gap. [33]

Finally, the study should be designed to separate selection effects from tool effects. That means delayed-start or staggered-adoption groups, expertise stratification, stable task families, control for model/version drift, and capture of off-platform AI usage. Without that, apparent “skill change” could simply reflect that stronger or more motivated programmers adopt AI earlier, or that newer models got better mid-study. The professional telemetry papers are especially clear on this limitation. [34]

## Open questions and limitations

Several important questions remain unresolved. I found very little direct longitudinal evidence on professionals’ code comprehension, debugging independence, or metacognitive calibration; almost no study tracks language fluency over months; and explicit problem-decomposition measures are still mostly confined to scaffold/tool-design papers rather than panel studies. In addition, some of the most relevant 2025–2026 work is still in preprint form, and newer papers often have stronger design ideas than validated long-term data. That imbalance between conceptual sophistication and temporal evidence is, in itself, the central finding of this scan. [35]



[1] https://arxiv.org/abs/2302.07427

https://arxiv.org/abs/2302.07427

[2] [3] https://arxiv.org/html/2403.15472v1

https://arxiv.org/html/2403.15472v1

[4] [32] https://arxiv.org/pdf/2509.13253

https://arxiv.org/pdf/2509.13253

[5] [6] [24] https://arxiv.org/html/2603.22672v1

https://arxiv.org/html/2603.22672v1

[7] [8] https://arxiv.org/html/2511.04144v1

https://arxiv.org/html/2511.04144v1

[9] [10] [34] https://arxiv.org/abs/2509.20353

https://arxiv.org/abs/2509.20353

[11] [33] https://arxiv.org/html/2601.10258

https://arxiv.org/html/2601.10258

[12] [27] https://arxiv.org/html/2405.17739v1

https://arxiv.org/html/2405.17739v1

[13] [14] https://arxiv.org/html/2501.10091v1

https://arxiv.org/html/2501.10091v1

[15] [16] https://arxiv.org/html/2506.10051v1

https://arxiv.org/html/2506.10051v1

[17] [18] https://arxiv.org/pdf/2511.02922

https://arxiv.org/pdf/2511.02922

[19] [30] https://www.sciencedirect.com/science/article/pii/S2666920X25001778

https://www.sciencedirect.com/science/article/pii/S2666920X25001778

[20] [35] https://arxiv.org/html/2502.19133v1

https://arxiv.org/html/2502.19133v1

[21] https://arxiv.org/abs/2510.04986

https://arxiv.org/abs/2510.04986

[22] https://arxiv.org/html/2604.06331v1

https://arxiv.org/html/2604.06331v1

[23] [25] [28] [31] https://arxiv.org/pdf/2302.07427

https://arxiv.org/pdf/2302.07427

[26] https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/lee_2025_ai_critical_thinking_survey.pdf

https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/lee_2025_ai_critical_thinking_survey.pdf

[29] https://arxiv.org/html/2409.13051v1

https://arxiv.org/html/2409.13051v1

Below is a cleaned, structured extraction of the deep research output you just generated—removing UI artifacts and citations, standardizing fields, and making the comparison analytically usable.



# 1. Comparison Table (Longitudinal & Related Evidence)



# 2. Synthesis

The strongest pattern across this literature is not deskilling per se, but a consistent and replicable decoupling between performance and underlying skill formation.

Across controlled experiments, AI coding assistants reliably:

Increase task completion speed 

Reduce frustration and cognitive load 

Improve surface-level performance metrics 

However, when deeper cognitive variables are measured:

Code comprehension often does not improve 

Debugging independence is rarely tested longitudinally 

Problem decomposition shifts toward reactive prompting 

Metacognitive calibration degrades (illusion of competence, over-trust) 

Where longitudinal evidence exists (especially in professional settings), it shows:

Stable or unchanged output metrics (null results) 

Significant workflow restructuring (more context switching, integration, editing) 

No direct measurement of cognitive skill change 

So the most defensible interpretation is:

AI coding assistants are currently best understood as systems of cognitive redistribution, not clearly as systems of skill erosion or skill enhancement.

They:

Substitute for planning, recall, and local generation 

Shift human effort toward verification, selection, and integration 

Risk narrowing engagement with full problem-solving cycles 

But:

There is no strong longitudinal evidence yet that this accumulates into skill decline 

There is also no strong evidence that it produces durable skill gains 

The field is therefore in a measurement gap, not a settled conclusion.



# 3. Gap Statement: What a Credible 6–24 Month Panel Study Requires

A serious longitudinal study would need to move beyond everything currently done.

## A. Core Design Requirements

True panel design (same individuals) 

Track identical developers over 6–24 months 

Not cohorts, not logs, not cross-sectional 

Baseline before AI dependence 

Measure skills before sustained AI use begins 

Repeated measurement waves 

Every 6–8 weeks minimum 

AI-withdrawal conditions 

Periodic tasks where AI is disallowed 

Only way to detect latent vs. scaffolded skill 



## B. What Must Be Measured (Explicitly)

### 1. Cognitive Skill Battery



### 2. Metacognition & Calibration

Confidence before/after task 

Prediction vs. actual performance (calibration error) 

Trust/reliance scales 

Explanation of why AI outputs were accepted/rejected 



### 3. Behavioral Telemetry (Continuous)

Prompt frequency and type 

Acceptance vs. rejection rates 

Degree of post-editing 

Copy/paste vs. inline completion 

Time spent verifying vs. generating 

Context switching 

Test-writing behavior 



## C. Critical Design Controls

Without these, results are uninterpretable:

Staggered adoption groups (avoid selection bias) 

Expertise stratification (novice vs. expert trajectories) 

Stable task families (comparable difficulty over time) 

Model drift control (LLMs improve mid-study) 

Off-platform AI tracking (shadow usage problem) 



## D. The Core Unanswered Question

The field currently cannot answer:

Does AI assistance build internal capability, mask missing capability, or replace capability over time?

A proper panel study must distinguish between:

Scaffolding (ZPD-consistent learning) 

Substitution (task completion without learning) 

Dependency (performance collapse without AI) 



# Bottom Line

Evidence today is strong on short-term performance effects 

Evidence is moderate on workflow change 

Evidence is weak-to-nonexistent on long-term cognitive skill change 

The real gap is not theoretical—it is longitudinal measurement infrastructure.



If you want, I can push this one level deeper and map these findings explicitly onto:

Dreyfus skill acquisition (novice → expert) 

Cognitive apprenticeship / ZPD 

Distributed cognition vs. internalization 

—that’s where this gets especially interesting for your broader research program.


