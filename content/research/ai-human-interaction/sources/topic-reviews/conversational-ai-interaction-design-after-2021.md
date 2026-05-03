# Conversational AI interaction design after 2021

> **Provenance:** secondary literature review, generated 2026-05-01 to 2026-05-02 via deep-research synthesis. See `methodology.md` §1.1 for the discipline. Original `.docx` archived at `sources/_originals/Conversational AI interaction design after 2021.docx`.

---

# Conversational AI interaction design after 2021

## Scope and selection criteria

This scan prioritizes post-2021 work on conversational interaction design for LLM chatbots, voice assistants, embodied agents, and XR/VR conversational systems. I weighted peer-reviewed empirical studies and authoritative reviews most heavily, then used systematic/meta-analytic work and a small number of tightly relevant classical HCI touchstones to interpret the newer evidence. Each load-bearing reference below was checked against a publisher, conference, or institutional repository page carrying venue and DOI metadata when available.

Across this literature, the strongest recurring result is that the main usability bottleneck is no longer only “can the model generate language?” but “can the interface manage time, repair, modality, and user expectations well enough for language to remain usable?” The post-2021 evidence is especially convergent on four points: response timing strongly shapes quality of experience; repair works better when the system shows what it understood and supports multi-turn recovery; multimodal coordination helps, but only when it reduces ambiguity rather than adding theatrical flourish; and blank-slate natural-language interfaces remain hard to discover and calibrate, even when users like them. [1]

## Typology of interaction-design challenges

Temporal coordination failures. Systems still struggle with end-of-turn detection, pause handling, barge-in, interruption tolerance, and visible latency management. The older “silence timeout” interaction model remains a poor fit for human conversational timing, and post-2021 studies continue to find that users notice and dislike sluggish, mistimed turn exchange. [2]

Repair failures after misunderstanding. Breakdowns are rarely solved by a single apology. The best evidence points toward explicit grounding, partial understanding, rephrasing, and dialogic explanation as more promising than generic acknowledgments or personality-first recovery moves. [3]

Multimodal common-ground failures. Voice alone often leaves reference, attention, and progress opaque. Studies on gaze, visual asymmetry, audio icons, and VR fillers suggest that a second modality helps when it clarifies what the system is tracking, where the user should look, or whether the system is “thinking,” but not when it simply decorates the interaction. [4]

Mode-boundary instability. Users move fluidly between terse commands, exploratory questioning, advice-seeking, and social talk, but most systems still treat these as separate products or hidden modes. The literature shows both real demand for extended dialogue and continued architectural awkwardness around transitions between command-and-control and open-ended conversation. [5]

Discoverability and feedback deficits in open-ended interfaces. The blank chat box suggests infinite capability, but users often do not know what the system can do, what it just inferred, or how to adapt when outputs are plausible-but-wrong. Capability communication, prompt guidance, and novice-friendly task framing help somewhat, but they do not yet reliably produce accurate mental models. [6]

## Comparative empirical findings

### Turn-taking, latency, barge-in, and interruption

The modern baseline remains Gabriel Skantze[7]’s 2021 review: conversational systems still interrupt users, leave long response delays, and provide too little timely feedback, while human turn-taking draws on richer multimodal cues than silence detection alone. Post-2021 empirical work largely supports that diagnosis rather than overturning it. A 2023 pilot comparison of a fast-turn-taking “conversational listener” against Alexa-style timing found that users were sensitive to turn-taking delay and that faster, more characterful timing made interaction feel more natural, even though the study itself is explicitly framed as preliminary. In a different direction, work on incomplete questions showed that interruption recovery does not require restarting from scratch: a partial-understanding pipeline on the SLUICE corpus answered only 0.77% fewer questions than a system given the full question, suggesting that “resume from partial understanding” is a viable design primitive rather than a niche technical trick. By 2025, latency studies in VR-based LLM agents were converging on a more usable rule of thumb: delays above about four seconds degrade quality of experience, but natural fillers such as gestures and verbal cues can soften perceived waiting time, especially under high-delay conditions. [8]

The key comparison across these studies is that they do not show a single silver bullet. Faster raw latency helps. Incremental listening helps. Bridging cues help. But the common design lesson is architectural: systems need a fast path for turn management and a slower path for semantic generation, rather than one monolithic “wait, then answer” pipeline. The literature is therefore moving from a purely recognition-centric framing toward orchestration of listening, prediction, response preparation, and visible buffering. [2]

### Repair after error and misunderstanding

Repair is where the interaction-design literature has become noticeably more mature since 2021. A 2024 scoping review of spoken-dialogue-system breakdown repair synthesized 36 papers from an initial pool of 818 and produced two frameworks: six kinds of system repair and five kinds of user repair. Its most important conclusion is not just taxonomy; it is that the literature remains unbalanced, with too much attention on narrow repair moves and too little on information/disclosure strategies that help users understand what failed and why. [9]

Empirical papers sharpen that point. In conversational product search, rephrasing the user’s input to display the system’s interpretation improved conversational engagement and perceived competence, whereas generic acknowledgments such as “okay” or “right” did not. In other words, a repair move that exposes grounding beats one that merely signals social continuity. A 2022 Wizard-of-Oz study on list advancement found that cross-modal repair via gaze could outperform speech reformulation for that task, showing that the “best” repair modality may differ from the modality in which the error occurred. And an experiment on humorous repair found a telling asymmetry: humorous responses could repair breakdowns, but participants still preferred non-humorous responses overall, implying that personality can modulate repair but should rarely substitute for clarity. [10]

The strongest field-style evidence comes from the 19-month household study of explanatory dialogues for voice assistants. There, one-shot accounts of why a system acted as it did were often decontextualized and failed to sustain actual dialogue about breakdowns; over time, users turned instead to behavioral workarounds such as switching features off. That result matters because it pushes repair design beyond the classic “good error message” ideal. In open-ended conversational systems, accountable repair appears to require an ongoing explanatory exchange that recognizes user emotion, context, and successive speech acts, not just a static excuse. [11]

### Multimodal coordination

The multimodal findings are narrower in volume than the turn-taking or repair findings, but the pattern is coherent. When users and systems do not share the same visual context, humans adapt; a 2023 referential communication study found that people produced more informative expressions when a machine partner faced visual asymmetries such as distractors or occlusions. This matters because it suggests that multimodal conversational design is not just about adding modalities; it is about making asymmetries legible and giving users ways to compensate. [12]

The clearest post-2021 user-study evidence comes from narrowly scoped tasks. In the list-advancement study, gaze served as an effective repair resource. In instructional video navigation, pairing audio icons with visual points-of-action helped users finish faster, with fewer voice commands and higher satisfaction than baseline interaction, though usability challenges remained. In delayed VR conversation, gestures and verbal fillers reduced the subjective cost of waiting. Taken together, these studies imply a strong design rule: the second modality should either disambiguate reference, expose attention, or keep temporal alignment intact. Multimodality that does not perform one of those jobs is much harder to justify. [13]

The empirical literature is therefore best read as support for functional multimodality, not for maximal multimodality. Voice-plus-screen, gaze, or gesture works when it reduces common-ground uncertainty. It is much less well-tested for broad, open-ended LLM interaction in everyday settings. Most post-LLM evidence is still in Wizard-of-Oz, lab, assistive-task, or VR contexts rather than long-term deployment of fully multimodal assistants. [13]

### Mode-switching between brief commands and extended dialogue

This is one of the most important design problems and one of the least well-settled empirically. On the demand side, systems are already used beyond command-and-control. A two-year analysis of more than 600,000 Alexa queries from 456 older adults in assisted living found three recurrent relational patterns: asking personal questions to get to know the assistant, asking for advice, and engaging the assistant to alleviate stress. That is strong evidence that real users do not naturally stay inside the “brief command” box once conversational systems are embedded in daily life. [14]

On the interaction side, users’ framing of the interface also shifts quickly. A 2025 large-scale analysis of more than 200,000 human-LLM conversations found that many users begin with structured, machine-like prompts and then shift toward more natural, polite, and contextually nuanced language after early interactions. This implies that mode-switching is not only a system-side orchestration problem; it is also a mental-model transition in which the user progressively decides whether the system is “tool-like,” “partner-like,” or something unstable in between. [15]

The literature has architectural responses, but they remain more system-centric than behaviorally validated. Work on unified conversational models with system-initiated transitions between chit-chat and task dialogue treats the boundary between modes as an active conversational problem rather than a hard separation, which is conceptually aligned with user behavior. Yet the empirical user-literature still lacks strong comparisons of how people want to enter, leave, and renegotiate those modes in one continuous interaction. The best current evidence is thus indirect: users do cross modes in the wild, and current systems still provide too little explicit support for doing so cleanly. [16]

### Discoverability and feedback in open-ended interfaces

Open-ended conversational interfaces still suffer from a classic “blank slate” problem. The most direct 2025 evidence comes from transparent capability communication: in a speech-agent study with 56 participants, telling users about the system’s capabilities changed behavior — they produced significantly longer utterances — but it did not significantly improve mental-model alignment relative to a non-communicating agent. Users learned over time in both conditions, but explicit capability communication alone was not enough. That is an important negative result: discoverability is not solved by a single onboarding disclosure. [17]

Studies of actual LLM use reinforce the same point from the user side. Early ChatGPT users reported that useful, detailed, productive responses drove good experience, which means pragmatic payoff matters more than conversational novelty. But a 2025 think-aloud study of university students dealing with plausible falsehoods found something more troubling: students were often overwhelmed by long, overconfident, and sycophantic answers, and they fell back on intuitive judgments or ad hoc verification strategies. The problem here is not only output accuracy. It is the shortage of feedback about uncertainty, evidence, and what the system has actually done with the prompt. [18]

There is some evidence that bounded conversational interfaces can reduce novice barriers. In data visualization, a conversational system enabled faster performance and fewer errors than Google Sheets, especially for beginners. In education, structured prompting guidance appears to improve how learners formulate prompts and helps expose common prompting errors, though the broader gains in conversation quality are more mixed and context-dependent. The overall pattern is that conversational interfaces can lower entry cost in constrained domains, but open-ended interfaces still impose hidden learning demands that are poorly surfaced in the interaction itself. [19]

## Classical HCI lenses

The post-2021 literature reads cleanly through three classical lenses. From Don Norman[20] comes the emphasis on signifiers, feedback, and constraints: the blank prompt box often provides too few signifiers for what actions are possible, and many conversational systems provide too little feedback about internal state, grounding, or progress. The modern evidence on capability communication, rephrasing, and latency fillers can be understood as attempts to restore missing signifiers and feedback in conversation-shaped interfaces. [21]

From Jakob Nielsen[22] come visibility of system status, recognition rather than recall, and helping users recognize and recover from errors. These heuristics are unusually predictive here. Visibility of system status maps directly onto latency cues and incremental listening. Recognition rather than recall maps onto conversational examples, capability hints, and multimodal markers that reduce the need to remember what the system can do. Error recovery maps onto repair moves that expose what was understood and why the system failed. Many current open-ended chat interfaces violate all three at once. [23]

From Lucy Suchman[24] comes the reminder that human-machine interaction is situated rather than merely the execution of a prewritten plan. That frame is newly relevant in the LLM era. The strongest recent findings — partial-question recovery, dialogic explanation, multimodal repair, and shifting mental models — all point to interaction as contingent, negotiated, and indexical. Users are not simply issuing commands into a static dialog tree; they are continuously recalibrating what kind of partner the system is, what it currently knows, and which modality or repair path is appropriate next. [25]

## Gap statement and fertile untested design spaces

The most fertile untested design spaces are the ones that combine these challenge areas rather than treating them separately.

Fast-path and slow-path interaction orchestration. The literature strongly suggests that conversational systems need a low-latency path for turn management and micro-intents, plus a slower generative path for open-ended reasoning. What remains under-tested is the interface layer that decides, in real time, when to route the user to which path and how to make that routing perceptible and acceptable. Current studies show that waiting hurts and fillers help, but they do not yet test full adaptive orchestration in realistic everyday tasks. [26]

Repair-first conversational design. Repair is still too often treated as an exception handler added after generation. The better evidence points toward systems that reveal partial understanding, make uncertainty inspectable, and sustain explanatory dialogue across several turns. The under-explored space is repair as the core organizing principle of open-ended assistants, especially where outputs are plausible, verbose, and only partly wrong. [27]

Functional multimodal grounding for real products. Voice-plus-screen, gaze, and gesture have promising task-level evidence, but the deployed LLM ecosystem still lacks strong longitudinal studies of assistants that coordinate speech, screen highlight, gaze/attention, and interruption handling as a single grounding system. The design opportunity is not “more modalities”; it is common-ground management across modalities over time. [4]

Discoverability scaffolds for blank-slate NL interfaces. This is arguably the largest open space. Capability disclosures alone are insufficient; users still miscalibrate, over-trust, or under-explore. The most promising untested designs are progressive, in-context scaffolds: semantic autocomplete for intents, reversible plan previews, examples that adapt to the current task, mode indicators that expose whether the system is in “fast command,” “clarifying,” or “deep reasoning” mode, and repair prompts that show what the system inferred before it generates a long answer. The novice data-visualization result suggests that bounded versions can work, but the open-ended case is still largely unproven. [28]

My overall gap statement is this: the most important unsolved problem is no longer language generation quality in isolation, but the lack of an empirically grounded interaction layer that can coordinate timing, grounding, repair, and discoverability across changing modes and modalities. The research frontier is therefore not “more natural chat” in the abstract. It is interaction architecture for conversational control: how systems should listen, signal, clarify, hand off between simple and complex modes, and recover when open-ended language is not enough. [29]

## Open questions and limitations

The evidence base is still uneven. Turn-taking and repair have clearer post-2021 empirical foundations than mode-switching and discoverability. Many multimodal studies are still task-specific, Wizard-of-Oz, VR-based, or short-term. The literature also remains concentrated in speech/voice settings and in relatively small user studies, with only a handful of longer field deployments and log-based analyses. So the conclusions above are high-confidence at the level of problem structure and design direction, but lower-confidence if one asks for settled, domain-general design prescriptions for fully multimodal, openly generative consumer assistants. [30]



[1] [2] [8] [29] https://www.sciencedirect.com/science/article/pii/S088523082030111X

https://www.sciencedirect.com/science/article/pii/S088523082030111X

[3] [9] [11] [27] [30] https://cui.acm.org/2024/proceedings/

https://cui.acm.org/2024/proceedings/

[4] [13] [22] https://diva-portal.org/smash/record.jsf?pid=diva2%3A1715165

https://diva-portal.org/smash/record.jsf?pid=diva2%3A1715165

[5] [14] https://www.researchwithrutgers.com/en/publications/voice-assistant-use-in-long-term-care/

https://www.researchwithrutgers.com/en/publications/voice-assistant-use-in-long-term-care/

[6] [17] [24] [28] https://research.vu.nl/en/publications/transparent-conversational-agents-the-impact-of-capability-commun/

https://research.vu.nl/en/publications/transparent-conversational-agents-the-impact-of-capability-commun/

[7] [12] [16] https://cui.acm.org/2023/programme/toc.html

https://cui.acm.org/2023/programme/toc.html

[10] https://research.utwente.nl/en/publications/ah-alright-okay-communicating-understanding-in-conversational-pro

https://research.utwente.nl/en/publications/ah-alright-okay-communicating-understanding-in-conversational-pro

[15] https://link.springer.com/article/10.1007/s10844-025-00960-6

https://link.springer.com/article/10.1007/s10844-025-00960-6

[18] https://www.sintef.no/en/publications/publication/0198cc3f9105-02d9cbe6-7e21-40f9-a291-a941ab2ffa64/

https://www.sintef.no/en/publications/publication/0198cc3f9105-02d9cbe6-7e21-40f9-a291-a941ab2ffa64/

[19] https://eprints.gla.ac.uk/356368/

https://eprints.gla.ac.uk/356368/

[20] [23] https://media.nngroup.com/media/articles/attachments/Heuristic_Summary1_A4_compressed.pdf

https://media.nngroup.com/media/articles/attachments/Heuristic_Summary1_A4_compressed.pdf

[21] https://mitpress.mit.edu/9780262525671/the-design-of-everyday-things/

https://mitpress.mit.edu/9780262525671/the-design-of-everyday-things/

[25] https://openlibrary.org/works/OL4962782W

https://openlibrary.org/works/OL4962782W

[26] https://cui.acm.org/2025/proceedings/

https://cui.acm.org/2025/proceedings/





Below is a structured extraction of the empirical core of the deep-research results you just generated—converted into a study-level comparison table, followed by a tight synthesis, and then a design specification for a credible 6–24 month panel study.



# 1) Comparison Table of Key Empirical Studies



# 2) Synthesis (What Actually Converges)

Across very different methods—lab experiments, field deployments, log analyses, and systematic reviews—the evidence converges on a single structural insight:

The primary bottleneck in conversational AI is no longer language generation—it is interaction coordination across time, understanding, and user expectations.

More specifically:

### 1. Time (Turn-taking / latency)

Even small delays or mistimed responses degrade experience. 

Users are highly sensitive to conversational timing. 

Mitigations (fillers, incremental feedback) help—but don’t replace architectural fixes. 

👉 Implication: Interaction must be continuous, not “wait → respond.”



### 2. Understanding (Repair)

Generic conversational moves (“okay,” “sorry”) are ineffective. 

High-performing systems: 

Show partial understanding 

Rephrase user intent 

Support multi-turn recovery 

Long-term studies show users abandon systems that don’t support ongoing repair dialogue. 

👉 Implication: Repair is not an exception—it is the core interaction loop.



### 3. Grounding (Multimodality)

Multimodal signals help only when they: 

clarify reference 

expose system attention 

maintain temporal alignment 

Decorative or “human-like” signals without grounding value do not help. 

👉 Implication: Multimodality must reduce uncertainty, not increase realism.



### 4. Mode (Command ↔ Conversation)

Users naturally shift modes: 

command → exploration → advice → relational 

Systems do not support these transitions well. 

Users adapt their behavior faster than systems adapt interaction structure. 

👉 Implication: Mode-switching is a continuous negotiation, not a discrete UI state.



### 5. Mental Models (Discoverability)

Users: 

don’t know what the system can do 

overtrust confident outputs 

struggle with ambiguity and uncertainty 

Capability explanations alone don’t fix this. 

👉 Implication: Discoverability is an ongoing interaction problem, not an onboarding problem.



# 3) Gap Statement → What a Credible 6–24 Month Panel Study Must Do

Current literature has a major limitation:

It studies isolated interaction variables (latency, repair, modality) in short sessions, while real usage involves long-term adaptation, trust calibration, and workflow integration.

A credible panel study must correct this.



## A. Study Design Requirements

### 1. Duration

Minimum: 6 months 

Ideal: 12–24 months 

Must capture: 

learning curves 

habit formation 

trust drift 

workaround emergence 



### 2. Sample

N = 150–500 users (panel) 

Stratified by: 

expertise (novice → expert) 

domain (coding, knowledge work, everyday tasks) 

usage intensity 



### 3. Context

Real deployment (NOT lab-only) 

Embedded in: 

coding workflows 

productivity tools 

daily life assistants 



## B. Measurement Model (What Must Be Captured)

### 1. Temporal Coordination Metrics

Response latency (objective) 

Perceived latency (subjective) 

Interruption frequency 

Turn overlap / barge-in success rate 



### 2. Repair Metrics (Critical)

Error detection latency (how long before user notices) 

Repair path type: 

re-prompt 

abandon 

workaround 

escalation 

Repair success rate 

Number of turns to recovery 



### 3. Mental Model Tracking (Longitudinal)

Beliefs about: 

system capability 

reliability 

appropriate use cases 

Calibration drift over time 

Overtrust vs. undertrust indicators 



### 4. Mode-Switching Behavior

Frequency of transitions: 

command → dialogue 

dialogue → task execution 

Friction at transitions 

User-initiated vs system-initiated switches 



### 5. Multimodal Coordination (if applicable)

Use of: 

voice vs text vs visual 

Cross-modal repair usage 

Attention alignment (where user looks vs system highlights) 



### 6. Outcome Metrics

Task success rate 

Time-to-completion 

Error propagation (small → large failures) 

Abandonment rate 



### 7. Trust + Reliance

Behavioral reliance (not just self-report) 

Automation bias indicators 

Verification behavior frequency 



## C. Experimental Manipulations (What Must Be Varied)

To be credible, the study must include controlled variation inside the field deployment:

### 1. Turn-taking architecture

fast-path vs wait-then-generate 

### 2. Repair design

opaque vs explicit grounding vs interactive repair 

### 3. Discoverability scaffolding

blank chat vs guided prompts vs adaptive hints 

### 4. Mode signaling

hidden vs explicit mode indicators 



## D. Data Integration Requirement

The study must combine:

Interaction logs (behavioral) 

Experience sampling (in-situ perception) 

Periodic interviews (mental model reconstruction) 

👉 Without triangulation, results will be misleading.



# Bottom Line

The current literature gives you clear local truths:

latency matters 

repair matters 

multimodality can help 

users adapt 

But it does not yet give a system-level model of:

how conversational AI becomes usable over time in real workflows.

A credible panel study must therefore shift the unit of analysis from:

“interaction episode” → “interaction trajectory over months.”



If you want, I can take this one step further and design:

a full experimental protocol 

or a measurement schema you can implement in your own products (e.g., DataLens / agents)


