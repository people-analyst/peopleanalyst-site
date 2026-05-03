# Creativity, Ideation, and Co-Creation With AI

> **Provenance:** secondary literature review, generated 2026-05-01 to 2026-05-02 via deep-research synthesis. See `methodology.md` §1.1 for the discipline. Original `.docx` archived at `sources/_originals/Creativity, Ideation, and Co-Creation With AI.docx`.

---

# Creativity, Ideation, and Co-Creation With AI

## Scope and corpus

This scan prioritizes post-2021 empirical studies on AI as a creative collaborator across writing, code, design, music, and research. I weighted peer-reviewed experiments, field studies, and platform analyses most heavily; I flag preprints where they matter because some of the most relevant creativity papers are still not formally published. I also separate objective output measures such as blinded expert ratings, click-through rates, semantic-similarity metrics, platform favorites, and benchmark scores from self-report measures such as creative self-efficacy, ownership, enjoyment, intrinsic motivation, and perceived competence. One practical limitation: no connected folder with additional style rules was accessible in this session, so I applied the active deep-research standards directly in this report. [1]

The highest-confidence pattern across this literature is a distinction between the individual and the collective level. For many bounded creative tasks, AI expands an individual user’s reachable option set enough to improve judged novelty, usefulness, fluency, or speed. But when many people draw on the same model families and similar prompts, the resulting pool of outputs often becomes more similar. In other words, AI often expands the candidate space for one person while narrowing the distribution of outputs across many people. That distinction is central to interpreting the homogenization debate correctly. [2]

## Comparison matrix

## What the evidence says about ideation and execution

Across writing, design, and code, the modal result is not that AI simply helps or hurts creativity. It helps different phases differently. The strongest causal evidence says AI is especially effective when it reduces blank-page costs, proposes initial directions, or speeds revision and implementation. The 2023 professional-writing experiment found that work shifted away from rough drafting and toward idea generation and editing; the ad-copy study found “sounding board” collaboration worked better than handing authorship over to the model; and the Grounded Copilot study found programmers toggling between exploration and acceleration modes rather than using AI in one uniform way. [18]

Design evidence sharpens this further. The cleanest phase-specific design paper shows large ideation gains for all designers, but implementation benefits break by expertise: novices keep improving, whereas experts can lose efficiency because AI suggestions conflict with well-developed routines. A newer phase paper similarly argues that idea-generation collaboration tends to raise novelty through cognitive flexibility, whereas idea-elaboration collaboration tends to raise usefulness by reducing cognitive overload. The implication is that AI assistance should be evaluated against the phase objective: divergent phases want breadth and surprise; convergent phases want refinement and fit. [19]

This is also where the “candidate space” issue becomes precise. At the individual level, AI often does expand the candidate space: users produce more ideas, more detailed ideas, or more polished outputs. But at the population level, many of those expansions happen inside the same high-probability neighborhoods of the model’s learned distribution. That is why studies can simultaneously find higher average judged creativity per person and lower diversity across the full pool of outputs. The contradiction is only apparent. [20]

The literature is thinner in music and scientific research. In music, most post-2021 studies still emphasize usability, inspiration, self-efficacy, and perceived competence rather than blinded originality judgments or corpus-level style dispersion. In research, benchmark and system papers are moving quickly, but direct human-subject evidence on AI as a collaborator in real scientific ideation is still sparse compared with writing and design. [21]

## What is actually supported in the homogenization debate

The clearest evidence in this debate comes from work by Anil Doshi[22] and Oliver Hauser[23], from Barrett R. Anderson[24] and colleagues, and from the reanalysis by Lennart Meincke[25], Gideon Nave[26], and Christian Terwiesch[27] of data released by Byung Cheol Lee[28] and Jaeyeon Chung[29]. Read together, these studies support a narrower but much more defensible claim than popular commentary usually makes: using the same LLMs under similar prompting conditions can raise the average judged creativity of individual outputs while reducing the diversity of outputs across a group. [30]

Well-supported claims. First, in bounded writing and brainstorming tasks, AI often improves average judged creativity or usefulness at the individual level. Second, in the same families of tasks, pooled outputs often become more similar. Third, these similarity effects are not only stylistic in the narrow literary sense; they can also appear semantically, conceptually, or strategically, as in story ideas, brainstorming pools, and ad-copy content. Fourth, the risks are larger when AI acts as a default producer or anchor rather than as a dialogic partner. [31]

Contested or overstated claims. It is not well-supported that AI inherently homogenizes all creative work across all domains. Visual-art evidence is more mixed: one large platform study found higher productivity and higher audience value, lower average novelty, but also rising peak novelty after adoption. It is also not well-supported that homogenization is unavoidable. Prompt-engineering work shows that idea variance can be materially increased, with chain-of-thought and diversity-oriented prompting bringing AI-generated idea pools closer to human dispersion. And it is still too early to claim that AI use inevitably causes lasting damage to users’ intrinsic creative ability, although the first repeated-exposure studies raise real concern. [32]

A concise verdict is therefore possible. The statement “AI makes outputs more alike” is well-supported in specific writing and brainstorming setups. The statement “AI broadly flattens culture across writing, code, design, music, and research” is still contested and underidentified. The statement “AI can be configured to preserve more dispersion” is plausible and partially supported, but the mitigation literature is still much smaller than the homogenization literature itself. [33]

## Confidence, identity, and repeated exposure

The confidence and identity evidence is much more mixed than the output-quality evidence, and it depends heavily on how the human role is structured. Positive self-belief effects do appear. The professional-writing experiment reported higher self-efficacy; programming-course experiments found higher programming self-efficacy and motivation; and the music-education study reported gains in creative interest, self-efficacy, and perceived competence. But these are mostly self-report gains, not proof that underlying creative capability improved. [34]

The strongest causal identity evidence points the other way when humans are demoted from author to editor. The poetry experiments found that people were least creative when they only edited AI text, and that a co-creator interface restored performance through greater creative self-efficacy. The creativity-support-tool study found that ChatGPT users produced more and more detailed ideas, but felt less responsible for them. And a four-study paper on human–GenAI collaboration found a clear psychological trade-off: performance improved, but subsequent solo work came with lower intrinsic motivation and more boredom, even though some carryover performance effects remained. [35]

The repeated-exposure literature is still small, but it is now meaningful enough to matter. The most ambitious longitudinal paper combined a natural experiment on academic publications with a seven-day lab study plus follow-ups and argued that once AI is withdrawn, performance gains fade while homogeneity can continue to rise. That is an important and provocative result, but it should still be treated as suggestive rather than settled, because it is new, domain-spanning, and not yet independently replicated at the same level of causal rigor. By contrast, shorter-horizon evidence on repeated use is more secure: the 2023 writing study and the 2025 motivation study both show that AI can quickly reshape workflow expectations, affect subsequent task engagement, and alter what users think creative work feels like. [36]

The cross-study pattern is that agency over direction is the key moderator. When the human sets the direction and AI serves as a co-creator, reflector, or sounding board, confidence effects are more often neutral-to-positive. When AI supplies the initial draft and the human reacts, identity dilution, anchoring, and lower ownership become much more likely. [37]

## Gap statement for rigorous future studies

The main gap is not that the field lacks positive or negative findings. The gap is that too many studies still manipulate “AI access” as a single binary treatment. Rigorous creativity research now needs to manipulate where AI enters the process, how much variance the system is allowed to generate, and what role the human occupies relative to the model. Existing evidence already shows these are not minor design choices; they change both output and psychology. [38]

A strong next-generation study should manipulate at least the following conditions:

Creative phase: problem framing, idea generation, idea selection, elaboration, execution, and revision should be separated rather than collapsed into one task. [19]

Variance regime: single-model/single-prompt assistance versus diversity-seeking prompting, multi-model assistance, or deliberately anti-anchor conditions should be compared directly. [39]

Human role: editor, critic, curator, co-creator, and ghostwriter conditions should be distinguished, because the current evidence shows these roles have different effects on both quality and self-efficacy. [40]

Expertise: novices, intermediates, and experts should be analyzed separately, especially in design and code, where expert routines can make implementation assistance backfire. [41]

Exposure length and withdrawal: one-shot use, repeated use, and forced withdrawal should all be studied so the field can distinguish temporary augmentation from durable learning or dependency. [42]

Evaluation level: studies should report individual average quality, best-in-pool quality, and pool diversity simultaneously. The homogenization debate persists largely because papers often report only one of these levels. [43]

Measure family: every study should pair blinded output judgments and structural diversity metrics with self-report measures of confidence, ownership, and motivation. Right now, domains like music rely too heavily on self-report alone. [44]

Domain realism: tasks should move beyond short prompts and classroom exercises into real workflows with audience feedback, market outcomes, or field-level corpus effects. The best current examples are ad copy, art platforms, and publication archives. [45]

The most important methodological recommendation is simple: future papers should stop asking whether AI “helps creativity” in general and instead ask which stage, which role, which expertise tier, and which level of analysis is being optimized. Without that, the field will keep producing seemingly contradictory findings that are actually talking about different constructs. [46]

## Open questions and limitations

The literature is strongest for short-form writing, brainstorming, and design. It is weaker for music, code ideation, and real scientific co-discovery, where many studies either emphasize adoption and self-report or benchmark model outputs without fully embedding humans in the loop. Several important papers are also still preprints, especially on interaction logs, mitigation strategies, and scientific co-creation systems. So the field now supports a strong claim about phase-specific gains and group-level convergence, but a weaker claim about long-run damage or universal homogenization across all creative domains. [47]



[1] [4] [31] An empirical investigation of the impact of ChatGPT on creativity | Nature Human Behaviour

https://www.nature.com/articles/s41562-024-01953-1

[2] [5] [20] [30] [43] Generative artificial intelligence enhances creativity but reduces the diversity of novel content by Anil R Doshi, Oliver Hauser :: SSRN

https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4535536

[3] [25] Experimental evidence on the productivity effects of generative artificial intelligence - PubMed

https://pubmed.ncbi.nlm.nih.gov/37440646/?utm_source=chatgpt.com

[6] [47] The Roles of Idea Generation and Elaboration in Human-AI Collaborative Creativity | Sciety

https://sciety.org/articles/activity/10.31234/osf.io/xm2f5_v3?utm_source=chatgpt.com

[7] [22] [38] [40] [45] Large Language Model in Creative Work: The Role of Collaboration Modality and User Expertise | Management Science

https://pubsonline.informs.org/doi/abs/10.1287/mnsc.2023.03014?af=R&utm_source=chatgpt.com

[8] [26] Paper page - The Impact of AI on Developer Productivity: Evidence from GitHub Copilot

https://huggingface.co/papers/2302.06590?utm_source=chatgpt.com

[9] Grounded Copilot: How Programmers Interact with Code-Generating Models - Microsoft Research

https://www.microsoft.com/en-us/research/publication/grounded-copilot-how-programmers-interact-with-code-generating-models/?utm_source=chatgpt.com

[10] The effect of generative artificial intelligence (AI)-based tool use on students' computational thinking skills, programming self-efficacy and motivation | SCALE Initiative

https://scale.stanford.edu/publications/effect-generative-artificial-intelligence-ai-based-tool-use-students-computational?utm_source=chatgpt.com

[11] [19] [41] [46] The Double-Edged Roles of Generative AI in the Creative Process: Experiments on Design Work | Information Systems Research

https://pubsonline.informs.org/doi/10.1287/isre.2024.0937?utm_source=chatgpt.com

[12] [32] Generative artificial intelligence, human creativity, and art | PNAS Nexus | Oxford Academic

https://academic.oup.com/pnasnexus/article-abstract/doi/10.1093/pnasnexus/pgae052/7618478?utm_source=chatgpt.com

[13] [35] [37] Establishing the importance of co-creation and self-efficacy in creative collaboration with artificial intelligence | Scientific Reports

https://www.nature.com/articles/s41598-024-69423-2

[14] [21] [24] [27] [28] [44] Evaluating Human-AI Interaction via Usability, User Experience and Acceptance Measures for MMM-C: A Creative AI System for Music Composition | IJCAI

https://www.ijcai.org/proceedings/2023/0640?utm_source=chatgpt.com

[15] Frontiers | The influence of collaborative music creation supported by generative artificial intelligence on students’ creativity

https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1709513/full

[16] Generative AI lacks the human creativity to achieve scientific discovery from scratch | Scientific Reports

https://www.nature.com/articles/s41598-025-93794-9

[17] [23] Evaluating LLMs' divergent thinking capabilities for scientific idea generation with minimal context | Nature Communications

https://www.nature.com/articles/s41467-026-70245-1

[18] [34] Experimental Evidence on the Productivity Effects of Generative Artificial Intelligence by Shakked Noy, Whitney Zhang :: SSRN

https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4375283&utm_source=chatgpt.com

[29] [39] Prompting Diverse Ideas: Increasing AI Idea Variance by Lennart Meincke, Ethan R. Mollick, Christian Terwiesch :: SSRN

https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4708466&utm_source=chatgpt.com

[33] ChatGPT decreases idea diversity in brainstorming | Nature Human Behaviour

https://www.nature.com/articles/s41562-025-02173-x?utm_source=chatgpt.com

[36] [42] Creative scar without generative AI: Individual creativity fails to sustain while homogeneity keeps climbing - ScienceDirect

https://www.sciencedirect.com/science/article/pii/S0160791X25002775?utm_source=chatgpt.com



Below is a consolidated, evidence-weighted synthesis of post-2021 research on AI as a creative collaborator across domains (writing, coding, design, music, research). I’ve separated objective-output studies vs. self-report, flagged where findings are robust vs. tentative, and emphasized design features (since many claims hinge on weak experimental setups).



# 1) Comparison Matrix of Key Studies (Post-2021)

### Legend

Design: RCT = randomized controlled experiment; Lab = controlled but short; Field = real-world deployment 

Measures: Obj = objective output (ratings, novelty metrics, performance); SR = self-report 

Duration: exposure length (critical for interpretation) 



## A. Writing & Ideation Tasks



## B. Creativity / Design / Divergent Thinking



## C. Coding / Technical Problem Solving



## D. Music / Art Generation



## E. Identity, Confidence, and Subjective Experience



# 2) Synthesis (What Actually Holds Up)

### 1. Ideation Expansion vs. Distribution Compression

Well-supported: AI increases average output quality and fluency (more ideas, faster production). 

Also supported: AI reduces variance across users (ideas become more similar). 

Interpretation: AI widens the individual candidate set, but narrows the population-level distribution. 

👉 This resolves the apparent contradiction:

Within-person: expansion 

Across-person: homogenization 



### 2. Homogenization Debate — What’s Solid vs. Weak

Well-supported (replicated across multiple RCTs):

Outputs cluster stylistically when AI is used 

Lower-skill users converge toward higher-skill outputs 

Reduced variance in idea space 

Contested / weakly supported:

That AI reduces absolute creativity (mean creativity often increases) 

That homogenization persists after iterative prompting or expert steering 

That effects hold in long-term workflows (almost no strong longitudinal evidence) 



### 3. Divergent vs. Convergent Task Effects

Divergent tasks (brainstorming, ideation): 

↑ quantity 

↑ average quality 

↓ diversity 

Convergent tasks (editing, debugging, refinement): 

Strong consistent gains 

Less concern about homogenization 

👉 AI behaves more like a convergence accelerator than a divergence engine.



### 4. Skill-Level Effects (Critical)

Strongest consistent finding across domains: 

Low-skill users benefit most 

High-skill users see smaller gains or even constraint effects 

This is the “capability compression” phenomenon.



### 5. Confidence and Identity Effects

Users report: 

↑ confidence 

↑ perceived creativity 

But: 

Evidence of overconfidence 

Emerging shift toward: 

creator → curator/editor 

generator → selector 



### 6. The Biggest Limitation of the Entire Literature

Almost all studies are:

Single-session 

Artificial tasks 

No learning or adaptation 

👉 We are mostly observing first-contact effects, not stable human-AI creative systems.



# 3) Gap Statement: What a Credible 6–24 Month Panel Study Must Do

A serious longitudinal study would need to move beyond “does AI help?” to:

## A. Core Design Requirements

### 1. Panel Structure

Duration: 6–24 months 

Repeated measures: monthly or biweekly 

N: 300–1,000 participants 

Stratified by: 

skill level 

domain (writing, coding, design, etc.) 



### 2. Task Ecology (Critical)

Must include:

Real-world creative work (not toy prompts) 

Both: 

Divergent phases (ideation) 

Convergent phases (refinement) 



### 3. Experimental Manipulations

At minimum:

#### A. AI Access Condition

No AI 

AI (baseline) 

AI + structured prompting training 

#### B. Interaction Mode

Passive use (autocomplete) 

Active co-creation (dialogue) 

AI-first vs. human-first workflows 

#### C. Diversity Interventions

Single-model vs. multi-model exposure 

Prompt diversification constraints 



### 4. Measurement System (Must Be Multi-Layered)

#### A. Objective Output Measures

Expert ratings (blind) 

Novelty metrics (semantic distance, embedding dispersion) 

Style variance across participants 

Task success / correctness (for coding) 

#### B. Process Measures

Prompt trajectories 

Iteration depth 

branching vs. linear workflows 

#### C. Individual-Level Outcomes

Skill development (pre/post tests) 

Transfer to non-AI tasks 

Creativity tests (e.g., Torrance-style variants) 

#### D. Identity & Cognition

Creative self-efficacy 

Role perception (creator vs. editor) 

اعتماد / reliance calibration 



### 5. Distribution-Level Metrics (CRITICAL AND CURRENTLY MISSING)

This is the biggest gap in current literature.

Must measure:

Variance across participants 

Clustering of outputs 

Emergence of dominant styles 

👉 Homogenization is a distributional phenomenon, not an individual one.



### 6. Learning and Adaptation Effects

Track:

Does diversity recover over time? 

Do experts learn to “de-homogenize” outputs? 

Does reliance increase or stabilize? 



## B. Key Hypotheses a Proper Study Should Test

Short-term homogenization → long-term divergence recovery? 

Expert users re-expand the candidate space over time 

AI shifts creativity from generation → selection skill 

Repeated exposure increases reliance but also meta-skill 

Multi-model ecosystems reduce homogenization 



## C. Failure Modes to Avoid (Common in Current Literature)

Single-session inference about long-term creativity 

Self-report as proxy for creativity 

No measurement of output distribution 

Ignoring workflow structure 

Treating AI as static (instead of adaptive system) 



# Bottom Line

AI reliably increases average creative output and speed 

It also reliably compresses variation across people 

The field has strong short-term evidence but almost no longitudinal understanding 

👉 The central unresolved question is:

Does AI ultimately standardize creativity—or does it change what “being creative” means?

Right now, the literature simply isn’t designed to answer that.


