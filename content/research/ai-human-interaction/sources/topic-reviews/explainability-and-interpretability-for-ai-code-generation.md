# Explainability and Interpretability for AI Code Generation

> **Provenance:** secondary literature review, generated 2026-05-01 to 2026-05-02 via deep-research synthesis. See `methodology.md` §1.1 for the discipline. Original `.docx` archived at `sources/_originals/Explainability and Interpretability for AI Code Generation.docx`.

---

# Explainability and Interpretability for AI Code Generation

## Scope and conditions

No connected folder materials were available to inspect in this session, so this report applies the requested deep-research conditions directly: a post-2021 core corpus with one foundational pre-2021 anchor where the user explicitly asked for it; verification of major references on publisher or arXiv pages; priority to methods that explain concrete code completions, edits, refactorings, or repair actions; separation of technically faithful explanation from developer-actionable explanation; and explicit treatment of both single-suggestion systems and multi-step agentic systems.

The literature since 2022 is not evenly distributed. There is a meaningful body of work on token saliency, syntax-aware probing, causal interventions on code models, uncertainty highlighting, and conversational repair loops, plus a growing HCI literature on trust and mental models for code assistants. By contrast, there is still relatively little directly on end-user counterfactual explanations for code suggestions, and even less on explaining repository-scale autonomous coding trajectories in a way developers can reliably audit. [1]

## Typology of explanation methods

The clearest way to organize the space is by what is being exposed to the developer.

The most important pattern across this typology is that code-generation explanation has shifted away from “show more internals” and toward “show the right evidence for the user’s next decision.” That is exactly where the literature around social explanation, uncertainty highlighting, and trust-design converges. [13]

## Evidence from human-facing evaluations

The central gap in this area is the one the user asked to foreground: the difference between faithful explanation and actionable explanation. Tim Miller[14]’s synthesis argues that people prefer explanations that are contrastive, selective, and social, and that probabilities by themselves are usually not what humans find most explanatory. Helena Vasconcelos[15] and coauthors then showed the code-generation version of that problem very directly: in a mixed-methods study with 30 programmers, highlighting tokens with low generation probability did not help over a no-highlighting baseline, but highlighting tokens with high predicted edit likelihood led to faster task completion, more targeted edits, and better subjective ratings. In other words, the signal that was closer to user action outperformed the signal that was closer to raw model internals. [16]

That same pattern appears in prompt-to-code interfaces. In What It Wants Me To Say, the system does not try to expose neural internals; instead, it translates the produced code back into a more systematic natural-language utterance. In a between-subjects think-aloud study with 24 participants, the grounded version improved end users’ understanding of the model’s scope and the kind of language needed to use it effectively. The explanation was useful because it repaired the user’s mental model of the tool, not because it visualized attention heads or logits. [17]

The trust literature on code assistants reaches a similar conclusion. Investigating and Designing for Trust in AI-powered Code Generation Tools combined interviews with 17 developers and a design-probe study, and found that developers struggle with setting expectations, configuring the tool, and validating suggestions. One of the explored design directions was to offer indicators of model mechanism, but the paper’s practical contribution is broader: explanations must support expectation-setting and evaluation, not only transparency-for-its-own-sake. Grounded Copilot complements this by showing that programmers use assistants in both acceleration and exploration modes; explanations are especially valuable in exploration, when the user is uncertain how to proceed and therefore most vulnerable to over-trust or wasted debugging effort. [18]

Natural-language explanation also changes behavior even when it is not a faithful model explanation. A 2026 experiment with 173 programmers found that comments in AI-generated JavaScript code significantly increased adoption regardless of developer expertise. That is useful evidence for rationale design: explanatory annotations can change whether code is accepted, but this is precisely why the faithfulness/actionability distinction matters. A helpful explanation can be behaviorally powerful without necessarily being the best account of the model’s internal computation. [19]

## Evaluation table

## Agentic systems and trajectory explanation

For agentic code systems, the explanation object is no longer “why this token?” or even “why this patch?” It is “why this trajectory?” ReAct is the conceptual starting point: it interleaves reasoning and acting so that actions can gather evidence and reasoning can update plans, explicitly aiming for greater interpretability. Its manual analysis showed that these interleaved traces are more grounded and trustworthy than pure chain-of-thought on knowledge-intensive tasks, although the framework was not designed specifically for software repositories. [29]

The coding-agent literature since 2025 sharpens the problem. debug-gym argues that coding agents need interactive exploration tools such as a debugger because many tasks cannot be solved from static context alone. Debug2Fix then shows that integrating interactive debugging into a software-engineering agent can materially improve benchmark performance, including gains of more than 20% on some settings. These papers are not “explanation methods” in the classic XAI sense, but they matter because they reveal what an explanation of an agent would have to include: not just a reasoning summary, but the runtime evidence, tool observations, and branch decisions that the agent used. [30]

AgentRx and the Universal Verifier move even closer to explicit process explanation. AgentRx treats agent failure as a trajectory-localization problem and uses evidence-backed constraint violations to identify a critical failure step on a benchmark of 115 manually annotated failed trajectories. The Universal Verifier work argues that verifiers for long web trajectories must separate process from outcome and controllable from uncontrollable failures, and reports human-level agreement on its benchmark while reducing false positives relative to prior baselines. Together, these papers imply that trajectory explanation for coding agents will likely need to look less like a saliency map and more like an audited execution report with evidence, step attribution, and causal blame assignment. [31]

The key limitation is that these trajectory papers mostly optimize diagnosis, evaluation, or training signal. They do not yet answer the HCI question the user cares about: what representation of a long coding trajectory actually helps a developer verify, debug, or trust an autonomous refactoring, repair, or repository-editing session. [32]

## What remains open

The explicit statement from this scan is that the explanation problem for autonomous coding agents remains open in three especially important places: long-horizon traces, tool calls, and shared-artifact edits.

Long-horizon traces remain largely unsolved. The strongest current methods can localize failures or verify process quality, but there is no widely accepted code-agent equivalent of token attribution that remains intelligible across dozens or hundreds of steps. Existing trajectory work treats the problem as diagnosis and scoring, not as a developer-facing explanation interface. [33]

Tool-call explanation is underdeveloped. Coding agents increasingly rely on search, test runners, compilers, debuggers, linters, and file tools. The literature shows these tools matter, but explanations rarely connect four things at once: why a tool was chosen, why those parameters were used, what observation was extracted, and how that observation changed the next edit decision. That connection is essential for auditable agentic coding. [34]

Shared-artifact editing is the major missing unit of explanation. Autonomous coding agents edit not only a function but an evolving set of artifacts: multiple source files, tests, configs, docs, and generated outputs. Current explanation work is strongest for single completions, local repairs, or isolated candidate patches. It is weak for repository-scale change narratives that preserve intent across cumulative diffs. The repair literature shows the importance of iterative feedback, but not yet how to summarize or justify a multi-file change set to a human reviewer. [35]

Faithfulness and actionability are still misaligned. The best-established empirical result in this scan is still the Vasconcelos finding: generation-probability highlighting is more “internal” but less useful; edit-likelihood highlighting is less direct as a model explanation but more helpful for programmers. Miller’s framework predicts exactly this tension. Future coding-agent explanations will likely need a layered design: one layer for causal/process faithfulness, another for actionable reviewer guidance. [16]

Human-subject evidence is too thin for agentic coding. There are now several credible user studies for single-suggestion tools, prompt-to-code systems, and trust-building concepts, but very few evaluations of whether explanations for autonomous coding trajectories help developers catch bugs, detect tool misuse, or calibrate trust on real repository tasks. The benchmark literature is moving faster than the human-factors literature. [36]

Counterfactual explanation for code assistants is sparse in end-user form. In this scan, code-specific explanation work used causal syntax interventions, structural probing, uncertainty cues, or validation-feedback loops far more often than user-facing “if the context had been X rather than Y, the suggestion would have changed to Z” explanations. The closest operational analogues are intervention-based analyses such as do_code and iterative repair systems that expose why a prior candidate failed, but direct counterfactual explanation for completions and refactorings appears underdeveloped. [37]

The practical conclusion is straightforward. For current code assistants, the most promising explanation stack is: structure-aware local explanation for suggestions, risk-sensitive cues for verification, grounded natural-language reformulation for mental-model repair, and audited trajectory/process logs for agents. What does not appear sufficient is exposing raw probabilities, attention-like visuals, or generic rationale text without validation evidence. [38]

## Open questions and limitations

This scan verified major references on publisher, conference, official-lab, or arXiv pages, but it also surfaced a genuine coverage limitation: some emerging 2025–2026 coding-agent work is available primarily as arXiv preprints or official lab publication pages rather than archival conference versions. The conclusions about agentic explainability are therefore high-confidence as a research direction, but not yet as a settled evidence base.

The second limitation is topical sparsity. There is much more work today on explaining model behavior to researchers and on diagnosing or verifying agent trajectories than on helping everyday developers understand an autonomous coding agent’s repository-level decisions. That imbalance is itself one of the report’s central findings.



[1] [5] [6] [37] [2302.03788] Toward a Theory of Causation for Interpreting Neural Code Models

https://arxiv.org/abs/2302.03788

[2] [3] [2302.09587] On the Reliability and Explainability of Language Models for Program Generation

https://arxiv.org/abs/2302.09587

[4] [22] AST-Probe: Recovering abstract syntax trees from hidden representations of pre-trained language models (ASE 2022 - Research Papers) - ASE 2022

https://conf.researchr.org/details/ase-2022/ase-2022-research-papers/12/AST-Probe-Recovering-abstract-syntax-trees-from-hidden-representations-of-pre-traine?utm_source=chatgpt.com

[7] [2302.07248] Generation Probabilities Are Not Enough: Uncertainty Highlighting in AI Code Completions

https://arxiv.org/abs/2302.07248

[8] [9] [15] [17] [36] "What It Wants Me To Say": Bridging the Abstraction Gap Between End-User Programmers and Code-Generating Large Language Models - Microsoft Research

https://www.microsoft.com/en-us/research/publication/what-it-wants-me-to-say-bridging-the-abstraction-gap-between-end-user-programmers-and-code-generating-large-language-models/?locale=ja&utm_source=chatgpt.com

[10] [35] Automated Program Repair via Conversation: Fixing 162 out of 337 Bugs for $0.42 Each using ChatGPT - Illinois Experts

https://experts.illinois.edu/en/publications/automated-program-repair-via-conversation-fixing-162-out-of-337-b?utm_source=chatgpt.com

[11] [27] [28] [29] ReAct: Synergizing Reasoning and Acting in Language Models | OpenReview

https://openreview.net/forum?id=WE_vluYUL-X&utm_source=chatgpt.com

[12] [31] [32] [33] AgentRx: Diagnosing AI Agent Failures from Execution Trajectories | Cool Papers - Immersive Paper Discovery

https://papers.cool/arxiv/2602.02475?utm_source=chatgpt.com

[13] [14] [16] Explanation in artificial intelligence: Insights from the social sciences - ScienceDirect

https://www.sciencedirect.com/science/article/pii/S0004370218305988?utm_source=chatgpt.com

[18] [23] Investigating and Designing for Trust in AI-powered Code Generation Tools - Microsoft Research

https://www.microsoft.com/en-us/research/publication/investigating-and-designing-for-trust-in-ai-powered-code-generation-tools/?lang=ko-kr&utm_source=chatgpt.com

[19] [25] Do comments and expertise still matter? An experiment on programmers’ adoption of AI-generated JavaScript code - ScienceDirect

https://www.sciencedirect.com/science/article/pii/S0164121225003036?utm_source=chatgpt.com

[20] [38] [2308.03873] Evaluating and Explaining Large Language Models for Code Using Syntactic Structures

https://arxiv.org/abs/2308.03873

[21] [2308.03873] Evaluating and Explaining Large Language Models for Code Using Syntactic Structures

https://ar5iv.org/pdf/2308.03873

[24] Grounded Copilot: How Programmers Interact with Code-Generating Models - Microsoft Research

https://www.microsoft.com/en-us/research/publication/grounded-copilot-how-programmers-interact-with-code-generating-models/?utm_source=chatgpt.com

[26] A Case Study of LLM for Automated Vulnerability Repair:

https://arxiv.org/pdf/2405.15690?utm_source=chatgpt.com

[30] [34] debug-gym: A Text-Based Environment for Interactive Debugging - Microsoft Research

https://www.microsoft.com/en-us/research/publication/debug-gym-a-text-based-environment-for-interactive-debugging/?utm_source=chatgpt.com







Below is a clean extraction and synthesis of the deep-research results you generated in this session, formatted to your requested standard: comparison table → synthesis → panel-study design gap.



# 1) Comparison Table (studies on explainability for code generation)



# 2) Synthesis

Across the literature, a very consistent empirical pattern emerges:

### 1. Faithful explanations ≠ useful explanations

The strongest controlled evidence (Vasconcelos et al.) shows that signals closest to model internals (e.g., token probabilities) do not help developers, while signals aligned with developer action (e.g., edit likelihood) do help.

This directly supports the framework of Tim Miller:

Humans want contrastive, actionable, decision-relevant explanations 

Not raw model transparency 



### 2. Explanations that change behavior are not necessarily faithful

Code comments and natural-language rationales increase adoption rates 

But they may not reflect actual model reasoning 

→ This creates a behavioral leverage vs epistemic accuracy tradeoff



### 3. The field is shifting from “interpretability” → “workflow support”

Early work:

Token attribution 

Attention visualization 

Recent work:

Uncertainty cues 

Natural-language grounding 

Validation feedback loops 

Debugging traces 

→ Explanations are increasingly embedded in the developer loop, not isolated artifacts



### 4. Agentic systems change the unit of explanation

For single-shot models:

Explain a completion 

For agents:

Must explain a trajectory 

Emerging requirements:

Step-level reasoning 

Tool usage justification 

Evidence propagation 

Failure localization 

But:

Most current work explains trajectories for evaluation/debugging 

Not for human understanding in real workflows 



### 5. Human-subject evidence is shallow and short-horizon

Nearly all studies:

Single-session 

Lab or short task 

No longitudinal exposure 

Missing:

Learning effects 

Trust calibration over time 

Skill development or erosion 



# 3) Gap Statement: What a Credible 6–24 Month Panel Study Must Measure

A serious longitudinal study in this domain would need to move beyond current limitations.

## A. Core Design Requirements

### 1. Panel structure

Duration: 6–24 months 

Repeated measures (monthly or per sprint) 

Mixed-method: 

Behavioral telemetry 

Task outcomes 

Self-report 

Artifact analysis (code diffs) 

### 2. Sample

100–300 developers minimum 

Stratified by: 

Experience level 

Domain (backend, ML, infra, etc.) 

AI usage intensity 



## B. What Must Be Measured (critical constructs)

### 1. Verification behavior (not just trust)

% of AI suggestions reviewed 

Time spent verifying 

Types of verification (tests, reading, execution) 

→ Current gap: we measure trust perception, not verification behavior



### 2. Error detection latency

Time from suggestion → detection of flaw 

Silent error vs obvious failure 

→ Critical for safety and productivity tradeoffs



### 3. Explanation interaction patterns

Which explanation types are used: 

Comments 

Uncertainty cues 

AST views 

Trace logs 

When they are invoked: 

Exploration vs execution phases 



### 4. Mental model evolution

How users understand: 

Model capabilities 

Failure modes 

Reliability domains 

Measured via:

Periodic elicitation tasks 

Prediction tasks (“will this code work?”) 



### 5. Skill trajectory (deskilling vs augmentation)

Independent problem-solving ability over time 

Ability to debug without AI 

Code comprehension speed 



### 6. Trust calibration (not raw trust)

Alignment between: 

Confidence in AI output 

Actual correctness 

→ Miscalibration is the real risk



### 7. Trajectory-level comprehension (agentic systems)

Can developers explain: 

Why an agent took a sequence of actions 

Which step caused failure 

What tools contributed 



### 8. Artifact-level reasoning

Understanding of: 

Multi-file changes 

Refactoring intent 

Dependency impacts 

→ Completely missing in current literature



## C. Experimental Manipulations Required

To make the study causal (not just observational):

### Randomize explanation conditions:

Token attribution vs none 

Edit-likelihood highlighting 

Natural-language rationale 

Process trace (agent logs) 

Hybrid layered explanations 



## D. Outcome Metrics

### Productivity

Task completion time 

Rework rate 

### Quality

Bug density 

Post-deployment failures 

### Cognitive

Mental model accuracy 

Debugging effectiveness 

### Behavioral

Verification rates 

Explanation usage patterns 



## E. What This Study Would Finally Answer

A well-designed panel study would resolve:

Do explanations actually improve real-world code quality over time? 

Which explanation types lead to durable skill vs dependency? 

How does trust calibration evolve with repeated exposure? 

What explanation format works for agent trajectories? 

Where is the tipping point between augmentation and deskilling? 



# Bottom Line

The current literature convincingly shows:

Actionable explanations beat faithful ones 

Process evidence beats static transparency 

Agent systems require entirely new explanation paradigms 

But it does not yet answer the most important question:

What explanations make developers better over time—not just faster in a single session?

That is exactly what a 6–24 month panel study must resolve.


