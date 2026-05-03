# Cognitive apprenticeship, ZPD, and AI as a more-knowledgeable other

> **Provenance:** secondary literature review, generated 2026-05-01 to 2026-05-02 via deep-research synthesis. See `methodology.md` §1.1 for the discipline. Original `.docx` archived at `sources/_originals/Cognitive apprenticeship, ZPD, and AI as a more-knowledgeable other.docx`.

---

# Cognitive apprenticeship, ZPD, and AI as a more-knowledgeable other

## Scope and bottom line

This focused scan prioritized post-2018 primary studies, formal field experiments, and official product documentation, while using the classic apprenticeship and ZPD texts only as anchors for interpretation. The clearest pattern is that AI now works best when it behaves like a bounded coach inside the learner’s zone of proximal development rather than like an omniscient solver. In the strongest recent studies, learning improves when AI asks guiding questions, sequences support, and withholds direct solutions until the learner has generated something first. When AI becomes an always-available answer engine, immediate performance often rises, but later unaided performance, delayed retention, and metacognitive calibration can fall. [1]

A second pattern is theoretical rather than statistical. The literature increasingly speaks Vygotskian language: AI as a more-knowledgeable other, AI-mediated scaffolding, and algorithmic support inside the ZPD. But the strongest transfer is still partial. The post-2018 evidence base operationalizes coaching and scaffolding much more often than it operationalizes articulation, reflection, exploration, or scaffold fade-out. In other words, current AI most credibly approximates a coach or hinting tutor, not yet a full cognitive-apprenticeship mentor. [2]

## How the theory is traveling into AI tutoring

Vygotsky’s ZPD is the distance between what a learner can do independently and what the learner can do with guidance, and the classical apprenticeship view treats learning as guided participation in expert practice rather than simple information delivery. In the current AI literature, that translation usually appears as adaptive hints, guided questioning, worked-step sequencing, and interfaces that try to keep students productively engaged without turning the system into a shortcut. [3]

Across the educational-technology literature, the continuity from classic intelligent tutoring systems to LLM tutors is striking. The strongest contemporary systems still do recognizably ITS-like work: they diagnose, hint, sequence, constrain, and monitor. What LLMs mainly add is flexible language, lower authoring cost, and more natural dialogue. The best recent results do not come from unconstrained chat. They come from tightly structured hint systems, hybrid human-AI tutoring, or LLMs explicitly steered toward research-based pedagogical moves. [4]

That same logic is now visible in product design. Khanmigo from Khan Academy[5] is explicitly described as a tutor that guides learners to the answer rather than simply giving it, while Synthesis Tutor from Synthesis[6] emphasizes real-time micro-assessment, adaptation, and sequenced support instead of free-form LLM chat. Those design claims are directionally aligned with the stronger empirical papers, although public product copy is not the same thing as independent causal evaluation. [7]

The MKO framing is also spreading beyond tutoring proper. Recent work applies it to medical education, second-language feedback, and qualitative-coding support, which shows that the theory is being used as a broad design vocabulary for AI-assisted skill acquisition. But much of that literature is still theoretical or formative rather than rigorous causal testing. [8]

## Mapping the apprenticeship constructs

The mapping below synthesizes how the six apprenticeship constructs are currently instantiated in AI tutoring and assistance.

The overall balance is therefore uneven. Post-2018 AI tutoring has migrated most of the way on coaching and scaffolding, part of the way on modeling, and only modestly on articulation and reflection. Exploration, especially exploration protected from premature answer reveal, remains the least mature construct in both research and product design. [15]

## Evidence on acceleration and short-circuiting

### Accelerated most consistently

The strongest causal gains are in mathematics and in the quality of tutoring itself. A 2024 randomized study of math help found that ChatGPT-generated hints produced statistically significant learning gains relative to no-help controls and were not significantly different from human tutor-authored hints on gains or time-on-task, although the raw hint-generation pipeline initially failed quality checks on 32% of problems before mitigation. [16]

A 2025 randomized controlled trial comparing an AI tutor with an active-learning class found that students learned significantly more in less time with the AI tutor, with median gains more than double those of the classroom condition, higher engagement, higher motivation, and a large estimated effect size. The critical detail is design: the tutor was not open-ended chat, but a tightly structured system that mirrored the pedagogy of the instructor and moved students sequentially through problem parts. [17]

Human-AI tutoring also looks especially promising when the AI supports the tutor rather than replacing the tutor. In the Tutor CoPilot RCT, students whose tutors had access to the copilot were 4 percentage points more likely to master lesson topics, with gains up to 9 percentage points for lower-rated tutors. The AI shifted tutor behavior toward pedagogically stronger moves, such as asking guiding questions and prompting explanation, which is a direct transfer of coaching into a scalable assistance layer. [18]

Outside mathematics, the evidence is thinner but suggestive. In qualitative-coding instruction, Annota explicitly framed peer-based AI hints as a more-knowledgeable other operating in the ZPD and reported better understanding of research questions, more careful attention to justifications, and improved calibration around over- versus under-annotation. In second-language learning, newer AI systems are beginning to operationalize ZPD more directly through error-specific feedback and dynamically fading prompts. [19]

Computing education is moving in the same direction, but the evidence there is still more formative than causal. Exploratory deployments have integrated GPT-3.5 into automated programming-assessment workflows and reported meaningful student experience questions around AI-driven feedback, while separate evaluations show substantial variation in the quality of LLM-generated next-step hints for programming novices. That means programming assistants currently look more like promising but unstable coaches than fully validated tutors. [20]

### Short-circuited most clearly

The clearest short-circuiting result is the Bastani field experiment with nearly one thousand high-school math students. Both the unguarded GPT-4 interface and the safeguarded tutor improved supported practice performance, but when AI access was removed, students who had relied on the unguarded interface performed worse than students who had never had AI access. The guarded tutor largely mitigated that harm by shifting the system toward teacher-designed hints rather than direct answer delivery. That is one of the strongest current demonstrations that AI can either scaffold learning or replace it, depending on the interaction design. [21]

A separate 2025 randomized trial reached a similar conclusion on delayed retention. Students who learned with ChatGPT later performed worse on a surprise test 45 days after learning than peers who studied traditionally, with the paper interpreting the result through cognitive offloading. This is important because it shows that the “harm” question is not confined to math tutors; it generalizes to the broader issue of what happens when generative AI performs too much of the cognitive work during acquisition. [22]

The metacognitive story is equally concerning. A 2026 study of logical-reasoning tasks found that AI use could improve performance while degrading metacognitive monitoring, leading users to overestimate how well they had actually done. This is exactly the kind of calibration failure that apprenticeship-style reflection is meant to correct, and it helps explain why unrestricted AI often feels educationally effective in the moment even when later transfer and independent performance stall. [23]

Open-ended interpretive work raises an additional risk: convergence without understanding. Annota’s authors warn that if AI begins to look authoritative in subjects that involve legitimate human disagreement, students may simply align with the system and lose the diversity of human interpretation that the task is supposed to cultivate. In their terms, the danger is not just dependence but AI-induced groupthink and standardization. [24]

## Productive struggle under AI assistance

The productive-struggle and desirable-difficulties literatures give a strong explanatory frame for these results. Bjork’s desirable-difficulties account argues that conditions which make learning feel harder in the short run, such as retrieval, reduced feedback, variation, and interleaving, often produce better long-run retention and transfer. Productive-struggle work in mathematics makes the same point in a more instructional idiom: students need challenge that is difficult enough to require sensemaking but not so difficult that they disengage. AI matters because it can either preserve those conditions or erase them. [25]

The recent AI tutoring evidence lines up with that framework unusually well. The systems that help most are the ones that preserve generation: guided hints in the math-hint study, sequential problem decomposition in the 2025 AI tutor RCT, teacher-designed hint rails in the Bastani safeguarded tutor, and multi-turn productive-failure steering in the ACL tutoring paper. The systems that harm most are the ones that reduce generation to answer-following. [26]

That yields a concrete set of conditions under which AI is more likely to behave like apprenticeship support rather than a shortcut:

Delay answer reveal. Ask for an attempt, prediction, or explanation before giving the next hint. [27]

Use hint ladders, not full solutions. Progressive disclosure preserves effort while keeping the learner inside the ZPD. [28]

Require articulation. The learner should explain why a hint is right, wrong, or helpful, not just consume it. [29]

Support reflection explicitly. Confidence checks, self-evaluation prompts, and error diagnosis are needed because AI fluency can distort self-monitoring. [30]

Fade support and test withdrawal. If a study never measures performance after AI removal, it has not really tested whether scaffolding became learning. [31]

Current product rhetoric is moving in this same direction. Khanmigo publicly frames itself as a guide that does not simply hand over answers, and Synthesis Tutor highlights continuous micro-assessment and adaptive support. The empirical literature suggests those are the right instincts. What remains to be shown is whether those design principles hold up in independent, longitudinal, product-specific evaluations. [7]

## Gap statement

The largest empirical gap is that ZPD is often invoked but rarely measured. Many papers describe AI as a more-knowledgeable other or use apprenticeship language, yet recent authors still characterize ZPD and cognitive apprenticeship as sensitizing concepts rather than constructs that are being formally estimated, updated in real time, or experimentally manipulated through calibrated fade-out. The field talks in a Vygotskian register more often than it runs Vygotskian tests. [32]

The second gap is construct coverage. Coaching and scaffolding are overrepresented; articulation, reflection, and exploration are underrepresented. Annota is unusual precisely because it forces justification and disagreement with hints. Tutor CoPilot is unusual because it studies whether AI changes the quality of teaching moves. The productive-failure steering paper is unusual because it explicitly tries to preserve exploration. Those papers stand out because most of the literature still optimizes for correctness, efficiency, and student satisfaction rather than for the deeper apprenticeship mechanisms. [33]

The third gap is outcome choice. Immediate performance is measured far more often than retention, transfer, calibration, or post-withdrawal independence. Yet the strongest warnings in the literature come precisely from studies that looked beyond immediate task completion: Bastani’s removal test, the delayed surprise test in the cognitive-crutch RCT, and the metacognitive-monitoring study showing overconfidence under AI use. If the field continues to evaluate tutors mainly on within-session correctness, it will systematically overestimate educational value. [34]

The fourth gap is domain balance. The best causal evidence is concentrated in mathematics and tutor-support settings. Language learning, qualitative analysis, writing, and programming all have active research, but much of it is still formative, small-scale, or focused on perception and interaction quality rather than robust learning transfer. That means the claim “AI can act as a more-knowledgeable other” is most defensible today for structured domains with clear intermediate steps, and least defensible for open-ended domains where judgment, interpretation, and identity-rich practice matter most. [35]

The fifth gap is translational. Publicly visible branded tutors are ahead in deployment and messaging, but not yet in publicly accessible independent evidence. In this scan, the richest causal evidence came from research-built tutors and hybrid tutoring systems, while product pages for Khanmigo and Synthesis emphasize question-first guidance and adaptivity without supplying the same depth of independent longitudinal evaluation in the public literature. That does not mean the products are ineffective. It means the field has not yet validated commercially prominent implementations as rigorously as it has validated a handful of research systems. [36]

The upshot is straightforward. Post-2018 AI tutoring research supports a narrower but important claim: AI can often function as a useful coach and scaffold inside a learner’s ZPD, and sometimes as a force multiplier for less-experienced human tutors. The evidence is much weaker for the broader claim that AI already realizes the full logic of cognitive apprenticeship. The under-tested constructs are exactly the ones that matter most for durable expertise: articulation, reflection, exploration, and the fading of support that proves the learner can now act alone. [37]



[1] [4] [11] [16] [26] [28] [35] https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0304013

https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0304013

[2] Mind in Society

https://home.fau.edu/musgrove/web/vygotsky1978.pdf?utm_source=chatgpt.com

[3] Interaction Between Learning and Development

https://lchc.ucsd.edu/tclearninglounge/ROOT/carlos/readings/vygotsky_learning_and_dev.pdf?utm_source=chatgpt.com

[5] [9] [17] https://www.nature.com/articles/s41598-025-97652-6

https://www.nature.com/articles/s41598-025-97652-6

[6] [21] [27] [31] [34] https://hamsabastani.github.io/education_llm.pdf

https://hamsabastani.github.io/education_llm.pdf

[7] [36] https://www.khanacademy.org/khan-labs?ref=maginative.com

https://www.khanacademy.org/khan-labs?ref=maginative.com

[8] [32] https://www.nature.com/articles/s41746-025-01823-8

https://www.nature.com/articles/s41746-025-01823-8

[10] [18] [37] https://arxiv.org/pdf/2410.03017

https://arxiv.org/pdf/2410.03017

[12] [15] [19] [24] [29] [33] https://tech4good.soe.ucsc.edu/assets/docs/iui-2024-an.pdf

https://tech4good.soe.ucsc.edu/assets/docs/iui-2024-an.pdf

[13] https://doi.org/10.1111/bjet.13599

https://doi.org/10.1111/bjet.13599

[14] https://aclanthology.org/2025.findings-acl.1348/

https://aclanthology.org/2025.findings-acl.1348/

[20] https://dl.acm.org/doi/10.1145/3639474.3640061

https://dl.acm.org/doi/10.1145/3639474.3640061

[22] https://www.sciencedirect.com/science/article/pii/S2590291125010186

https://www.sciencedirect.com/science/article/pii/S2590291125010186

[23] [30] https://aaltodoc.aalto.fi/server/api/core/bitstreams/37e73890-d0cf-48fe-8b3a-fbb1de9abd85/content

https://aaltodoc.aalto.fi/server/api/core/bitstreams/37e73890-d0cf-48fe-8b3a-fbb1de9abd85/content

[25] Creating Desirable Difficulties to Enhance Learning

https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/04/EBjork_RBjork_2011.pdf?utm_source=chatgpt.com



## Comparison table: AI-augmented work studies (relevant to distributed cognition lens)



## Synthesis

Across these studies, the pattern is not “AI helps” or “AI hurts”—it’s that AI reorganizes the cognitive system, and different study designs illuminate different slices of that reorganization.

Short, controlled experiments (e.g., Microsoft Research) consistently show local gains in code generation speed. These isolate the generation node of the system. 

Field and longitudinal studies (NAV IT, Management Science) show weaker or mixed productivity effects, indicating that gains at one node are offset by costs elsewhere. 

Process-rich studies (METR) reveal where the costs move: review, verification, integration, and coordination—classic distributed-cognition phenomena where representational burden shifts across system components. 

Trace studies (PR/issue mining) provide the clearest evidence of Hutchins-style dynamics: AI outputs become circulating cognitive artifacts that persist, mutate, and coordinate work across time and actors. 

Taken together, the literature already contains implicit distributed cognition findings:

Memory is externalized into prompts, chat logs, and generated code. 

Attention shifts from generation → evaluation. 

Coordination increasingly flows through AI-mediated artifacts. 

Responsibility becomes ambiguous (who “owns” the output?). 

But crucially, no study treats the full sociotechnical system as the primary unit of analysis over time. The field is measuring outcomes of reorganization without modeling the reorganization itself.



## Gap statement: what a credible 6–24 month panel study must measure

A serious longitudinal (6–24 month) distributed-cognition study of AI-augmented software work would need to move beyond “productivity” and instrument the evolving cognitive system. Concretely:

### 1. Unit of analysis: the system, not the individual

Developer(s), AI tools, IDEs, repos, CI/CD, documentation, tickets, review processes 

Explicit mapping of who/what holds which representations over time 

### 2. Longitudinal representational tracking

Track how information propagates across:

Issue → prompt → generated code → edits → tests → PR → review → merge → rework 

Persist and version: 

Prompts and outputs 

Code diffs 

Review comments 

Test failures 

Measure latency, transformation, and loss at each transition 

### 3. Redistribution of cognitive labor

Operationalize shifts in:

Generation time vs. verification time 

Search vs. prompting vs. reading vs. debugging 

Individual vs. team-level cognition (e.g., reliance on shared artifacts) 

### 4. Artifact ecology metrics

Which artifacts become authoritative? (prompt vs. code vs. tests vs. comments) 

Stability vs. churn of AI-generated artifacts 

Reuse vs. discard rates of AI outputs 

### 5. Coordination and responsibility structure

Who edits AI output vs. who reviews it 

Ownership ambiguity (self-report + behavioral proxies) 

Escalation patterns (AI → human, or human → AI) 

### 6. Breakdown and repair dynamics

Frequency and type of failures (hallucination, partial correctness, integration mismatch) 

Detection latency 

Repair pathways (re-prompt, manual fix, abandonment) 

Downstream propagation of small errors 

### 7. Skill and expertise trajectory (panel component)

Within-person change over time: 

Reliance patterns 

Verification skill 

Mental model of system boundaries 

Between-person variation: 

Junior vs. senior developers (critical given heterogeneous effects) 

### 8. Multimodal instrumentation (non-negotiable)

Screen + IDE telemetry 

Prompt/response logs 

Repo + PR traces 

Periodic interviews (stimulated recall) 

Optional: meeting observations / code reviews 

### 9. Outcome measures (reframed)

Instead of only:

Time-to-completion 

Task counts 

Also include:

System efficiency (total human + AI effort per feature) 

Error propagation cost 

Coordination overhead 

Cognitive load distribution 



### Bottom line

Right now, the literature is measuring surface-level productivity effects of a deeper structural shift. A credible 6–24 month panel study would treat AI not as a tool but as a node in a distributed cognitive system, and would explicitly measure how cognition is reallocated, externalized, and coordinated over time.

Until that happens, we’ll keep getting “AI speeds things up” and “AI slows things down” as competing truths—when they’re actually simultaneous properties of the same reorganized system.


