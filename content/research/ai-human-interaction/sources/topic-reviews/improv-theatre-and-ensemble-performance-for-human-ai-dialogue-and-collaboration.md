# Improv Theatre and Ensemble Performance for Human-AI Dialogue and Collaboration

> **Provenance:** secondary literature review, generated 2026-05-01 to 2026-05-02 via deep-research synthesis. See `methodology.md` §1.1 for the discipline. Original `.docx` archived at `sources/_originals/Improv Theatre and Ensemble Performance for Human-AI Dialogue and Collaboration.docx`.

---

# Improv Theatre and Ensemble Performance for Human-AI Dialogue and Collaboration

## Scope and framing

This scan centers on post-2010 literature and tools, while treating older stage-improv texts as the concept sources behind later formalizations. The post-2010 record is uneven: there is now a recognizable applied-improv field in management, medicine, and HCI, but the strongest empirical work is still concentrated in a few pockets rather than spread across a mature, cumulative research program. Foundational practitioner-editors such as Theresa Robbins Dudeck and Caitlin McClure frame applied improvisation as the use of improv principles, tools, and mindsets beyond theatre, while newer practitioner texts such as Kat Koppett’s Training to Imagine[1] continue to translate those principles into organizational and educational curricula. At the same time, formal reviews of workplace and medical-improv literature still describe the empirical base as thin, heterogeneous, and often weakly aligned to outcomes. [2]

For human-AI interaction, the most consequential shift is that improv is no longer only a metaphor. It now appears as a corpus-building method, an evaluation lens, a turn-taking design problem, a stage test-bed for conversational agents, and a naming frame for new multi-agent ideation systems. The best current evidence comes from a small set of projects: SPOLIN and SpolinBot at University of Southern California[3]; the LuminAI line of work and later Creative Sense-Making and OCSM measurement work at Georgia Institute of Technology[4]; the Improbotics / artificial-improvisor papers by Mathewson and Mirowski; and the 2025 YES AND multi-agent framework from Microsoft Research[5]. These projects do not yet amount to a unified HAI theory, but they are enough to outline one. [6]

No accessible folder-specific style instructions were available in connected sources, so this report follows the requested deep-research format and research priorities directly.

## Heuristic and construct map

The most useful way to translate improv into HAI is not as a slogan but as a stack of interactional constructs.

Offer recognition is the base move. In improv pedagogy, an offer is any verbal, physical, or situational contribution that can be taken up by a partner. In the dialogue-systems literature, Cho and May effectively formalize the same move as grounding plus “initiation of next relevant contribution”: the response must show that it understood the emerging world state and then move it somewhere. That makes “offer recognition” a measurable uptake event rather than a purely theatrical intuition. [7]

Acceptance versus blocking is the central local rule. SPOLIN defines a “yes-and” response as one that accepts the reality established by the prompt and adds relevant new information; the paper also makes the practical reason explicit: generic or noncommittal responses create a conversational “black hole.” That claim is especially valuable for HAI because it turns an old improv warning into a systems problem: blocking is costly because it collapses momentum, shrinks shared context, and discourages further contribution. [8]

The “and” component matters as much as the “yes.” Contemporary corpora work treats a good response not as bare affirmation but as context-sensitive extension. Cho and May’s human evaluation criteria explicitly separate agreement with context from the quality of the new relevant contribution. In other words, “yes-and-ness” is already close to a two-part score: confirm the shared scene, then advance it. [9]

Status awareness is the main social-control construct. In Johnstone-derived pedagogy, status is not just rank but the behaviorally negotiated relationship between partners; current health-professions literature uses this directly, via exercises such as Status Cards, to help participants notice hierarchy, power differentials, and their own responses to those differences. For HAI, status is the construct that links stage improv to assistant behavior, role negotiation, initiative balance, deference, and interruption rights. [10]

Status reversals are a special case of turn and initiative redistribution. They are what make a scene dynamically alive rather than flatly compliant. The LuminAI work is useful here even though it is dance-based: it treats leader/follower shifts as a probabilistic, continuously re-evaluated state rather than a fixed role, and shows both how important that is and how hard it is for users to read when cues are weak. For HAI, status reversal becomes an interaction-design question about when the system should follow, when it should lead, and how legible those changes are. [11]

Scene construction is the medium-horizon construct. SPOLIN frames improvisation as accelerated shared-world building under conditions where there is little or no pre-existing objective reality. That makes scene construction analogous to human-AI common-ground formation: jointly stabilizing “where we are,” “who we are,” “what matters now,” and “what counts as coherent next.” Cho and May’s later project descriptions are also telling because they say explicitly that “yes-and” is only the beginning; they identify character-building, scene-building, anomaly extension, and callbacks as missing next steps. [12]

Long-form structure is the macro-horizon construct. Post-2010 formalization is clearest in The Upright Citizens Brigade Comedy Improvisation Manual[13] and Matt Fotis’s Long Form Improvisation and American Comedy[14], which treat the Harold as a repeatable long-form architecture for recurrence, game discovery, thematic connection, and callback. For HAI, the key translation is not “make chat funny.” It is: maintain motifs across turns, heighten rather than merely continue, and reintroduce prior material in a way that feels earned. [15]

Repair after broken offers is the construct that matters most in serious HAI. SPOLIN’s annotation notes are important here: the paper distinguishes contradiction, “yes-but,” and repair-oriented clarification moves, then deliberately includes some clarification turns within the “yes-and” umbrella because they help establish actionable shared reality. That is the cleanest bridge between improv and trustworthy AI: an improv-informed system should not blindly affirm falsehoods; it should accept the partner’s intent and preserve momentum by repairing toward a shared, usable frame. [16]

## Applications beyond the stage

The applied-improv field is now coherent enough to name, but still mixed in evidentiary strength. The two edited collections associated with Theresa Robbins Dudeck and Caitlin McClure—Applied Improvisation and The Applied Improvisation Mindset—serve as the clearest field-defining practitioner-scholar compendia. They collect applications in leadership development, organizational change, youth work, conflict resolution, community-building, and resilience training, including Mary Tyszkiewicz’s Heroic Improv cycle. As field-mapping texts, they matter because they show how improv pedagogy has been translated into non-theatrical settings; as scientific evidence, they are better treated as agenda-setting syntheses than as outcome studies. [17]

In business and management education, the strongest post-2010 pattern is pedagogical rather than clinical or experimental. A 2016 literature review concluded that workplace improvisation training had substantial theory around it but limited empirical evidence for training transfer. Later management-education pieces remain consistent with that diagnosis: they present improv exercises as ways to help students enact psychological safety and positive communication, and they provide plausible course designs, but they do not yet constitute a robust causal evidence base. Koppett’s recent edition of Training to Imagine is best read in the same way: a mature pedagogy and facilitation framework, not a settled efficacy literature. [18]

Medicine is where applied improv is currently most organized as a reviewable subfield. Watson and Fu’s 2016 piece framed “medical improv” as a novel way to teach communication and professionalism. Kukora and colleagues extended that logic to bad-news disclosure. The most load-bearing source, though, is the 2024 state-of-the-art review, which screened 1,869 records and synthesized 17 eligible curricula from 2012-2022. Its conclusion is both encouraging and sobering: medical-improv programs are feasible and acceptable, and their goals cluster around interpersonal, interprofessional, and empathic communication, but the evidence base is heterogeneous, often thinly described, and usually centered on feasibility and acceptability rather than strong outcome claims. [19]

More conceptually, recent health-professions scholarship has moved beyond “use improv to make students less awkward.” Gray, Cartmill, and Whitehead argue that theatre contributes a richer model of collaboration itself: attending to roles and hierarchies, reciprocal listening and challenge, trust and communication, and navigating uncertainty, risk, and failure. The 2023 AMA Journal of Ethics piece makes the parallel even more explicit by using Johnstone-derived status work to address hierarchy in clinical teams. This is important for HAI because it suggests that the real transferable unit is not humor or spontaneity alone, but collaborative role negotiation under uncertainty. [20]

In HCI and adjacent co-creative systems work, the field is not called “applied improv” as often, but the inheritance is visible. Earlier design-method papers argued that improvisation techniques help designers with collaboration, spontaneity, and learning through error; later systems work operationalized those concerns in concrete human-machine settings rather than workshop methods alone. The practitioner ecosystem around Stanford University[21] is relevant here: Stanford Improvisors[22] explicitly teach supportive play, saying yes, celebrating mistakes, and long-form formats such as the Harold and Armando, while Patricia Ryan Madson’s “improv wisdom” framing has fed directly into communication and design education. This Stanford lineage is influential, but it is better documented as educational practice than as experimental HCI evidence. [23]

## Improv as a frame for human-AI conversation

The most explicit text-first attempt to use improv theory for dialogue systems is SPOLIN. Cho and May argue that improv is unusually rich in grounding moves because scenes start with almost no pre-established reality, so participants must build common ground in dialogue itself. They collected a yes-and corpus, trained a classifier to mine more such turns, and showed in human evaluations that fine-tuning on this material improved “creative grounding” relative to models trained only on general-purpose dialogue datasets. Just as important, they make the limits visible: even improved models still rank below professional improvisers, and the authors themselves identify character-building, scene-building, and callbacks as the next frontier. [24]

The theatre-performance line of work by Mathewson and Mirowski takes a different route. Their 2017 and 2018 AIIDE papers use live improvisational theatre as a stress-test for conversational AI. The 2017 paper presents artificial improvisors alongside humans and emphasizes what improv demands from any partner: rapid adaptation, empathy, fluid collaboration, audience connection, and acceptance and amplification of offers. The 2018 Improbotics paper then operationalizes this in a live “imitation game” structure where some human performers speak lines supplied by an AI. The results are telling: rehearsal improves performers’ sense of control and proficiency, but realism remains limited by the interface and mechanism; performers repeatedly report that the system gives “curve balls,” requires humans to do more justificatory work, and rarely carries story arcs or important plot items forward. That is almost a perfect diagnosis of present-day LLM conversation: locally plausible, globally fragile. [25]

The turn-taking literature around LuminAI extends the frame from language to interaction dynamics. Winston and Magerko treat turn-taking in improvised interaction as lead/follow negotiation, and their study shows both promise and friction: users could often perceive a difference between turn-taking and non-turn-taking versions, but the turn-taking version also produced more awkwardness and, on balance, lower user experience. This matters for HAI because many current “mixed-initiative” claims underestimate a basic design problem: initiative is only useful when users can read it, predict it, and smoothly contest it. Improv gives the right concepts; it does not remove the legibility problem. [26]

The 2025 YES AND framework is newer and narrower, but it is important because it explicitly ports improv language into GenAI design. Ghosh and Rintel use “yes and” not to model scene work directly, but to create a multi-agent ideation system in which agents build on one another’s ideas, ask clarification questions, and take turns using a confidence-based turn-taking mechanism while the user can interject and steer. That is a notable shift: improv is no longer only a metaphor for evaluating humans and machines; it is becoming a named interaction architecture for generative systems. [27]

Taken together, these projects show where the analogy is strongest. It is strongest where dialogue is open-ended, collaborative, and underdetermined: brainstorming, exploratory problem framing, creative writing, role-play, rehearsal, coaching, playful tutoring, and other settings where mutual uptake and scene extension matter more than exact task completion. It is also strong wherever the cost of blocking is high and where a system must preserve momentum while still helping the human discover what the interaction is “about.” [28]

The analogy is weakest in three places. First, by inference from the theatre papers, ordinary text-only chat lacks a shared embodied audience and many of the physical and affective cues that stage improvisation treats as constitutive of the event; improv onstage is explicitly audience-coupled and physically expressive in a way most LLM chat is not. Second, current systems still struggle with long-range narrative stakes: the Improbotics performers report that humans must carry arcs and callbacks, and Cho and May say explicitly that present bots are not good at “experiencing reality together” over time. Third, in factual or high-stakes domains, naive “yes-and” is unsafe; the better transfer is “accept the user’s intent, then repair toward a usable and truthful shared frame,” which SPOLIN’s treatment of clarification already implies. [29]

## Measurement and instrumentation

A central finding of this scan is that there is still no widely accepted, domain-general psychometric instrument for “yes-and-ness” as such. What exists instead are partial operationalizations.

The closest direct instrument is the SPOLIN annotation-and-classification pipeline. It defines a yes-and turn as one that accepts the prompt’s reality and adds relevant information, trains a high-precision classifier to find more of those turns, and evaluates generation quality using human judgments of contextual agreement and new relevant contribution. That makes SPOLIN the best current candidate for an operational measure of local offer uptake in text interaction. It is not a full scene-quality metric, but it is a real, published instrument for one of improv’s core constructs. [30]

For broader co-creative interaction, the Georgia Tech line is more ambitious. Creative Sense-Making proposed a way to quantify interaction dynamics through time in open-ended co-creation, including rhythm of interaction and style of turn-taking. OCSM then reformulated that line into a method grounded in observable markers and made three dimensions explicit: participation, newness, and appropriateness. OCSM is not specific to improv theatre dialogue, but it is explicitly designed for improvisational co-creative interaction and is likely the strongest existing template for measuring scene-building-like dynamics at a higher level than individual “yes-and” turns. [31]

The stage-AI studies contribute another class of measures: experience and legibility metrics. Improbotics used adapted presence-style questionnaires around possibility to act, realism, proficiency, interface interference, and ability to attend to the performance rather than the mechanism. LuminAI used user judgments around understanding of leader/follower differences, engagement, responsiveness, and awkwardness. These are not improv-native measures, but they are practical instruments for assessing whether an improv-informed interaction design actually feels collaborative. [32]

There are also weaker but still useful proxy measures. Improbotics compares human-typed, human-spoken, scripted, and AI-generated lines using sentence length, difficult-word proportion, sentiment, and grammar / spelling errors. Those metrics are obviously crude, but the paper is candid about using them only as surrogate indicators when direct dialogue quality is hard to score. For HAI, this suggests a layered measurement strategy: local uptake metrics, interaction-dynamics metrics, user-experience metrics, and low-level lexical proxies. [33]

The largest gap is at the scene level. I did not find a validated post-2010 instrument that directly scores “shared scene-building” across full human-AI conversations in the way improvisers talk about scene work: jointly established reality, role clarity, objective formation, heightening, callback use, and end-of-scene payoff. The literature has pieces of that construct, but not the whole instrument. That absence is itself a clear research opportunity. [34]

## Research program

An improv-informed human-AI interaction-design program should start from one core design claim: good collaborative dialogue is not only about relevance or helpfulness in isolation; it is about maintaining a negotiable shared world while advancing it in ways the partner can use. On that view, an assistant should be designed not merely to answer, but to recognize offers, accept user intent, add relevant structure, repair broken premises without killing momentum, manage initiative shifts legibly, and sustain motifs across longer arcs. The existing literature already supports each piece of that claim separately, even if no single paper integrates them fully. [35]

A concrete design program would have six modules.

Offer uptake and anti-blocking. Build local response models that explicitly score whether the system took up the user’s proposition, question, or framing and whether it added a next relevant contribution. SPOLIN provides the obvious base layer here. In serious-use systems, “anti-blocking” should be reframed as “accept intent, then repair toward truth,” not as “affirm whatever was said.” [36]

Shared scene-state modeling. Maintain explicit representations of emerging characters, roles, goals, constraints, unresolved tensions, and salient callbacks. Cho and May’s observation that current bots are weak at scene-building and experience-sharing, together with Improbotics performers’ complaint that humans must carry the story arc, points directly to this requirement. [37]

Legible mixed initiative. Use turn-taking logic that allows the AI to lead occasionally, but only with readable cues and reversible control. LuminAI suggests that initiative without legibility feels awkward; YES AND suggests one promising route, where confidence-based turn-taking is combined with human interjection and steering rights. [38]

Status calibration. Treat role, deference, confidence, and interruption rights as adjustable interaction variables. A coach, collaborator, tutor, facilitator, and assistant should not all occupy the same status profile. The medical-improv status literature suggests that noticing and modulating hierarchy is a trainable skill; HAI systems should make it a design parameter. [39]

Long-form memory and callback support. Move beyond turn-level relevance toward motif management, return of salient details, heightening of tensions, and thematic closure. The Harold literature matters here less for its exact stage structure than for its insistence that coherence can be built through recurrence and transformation rather than through rigid scripts. [40]

Experience-level collaboration quality. Evaluate not just task success but whether the human felt able to act, understood who was leading, experienced appropriate challenge rather than arbitrary derailment, and perceived the system as contributing to rather than parasitically riding the scene. The Improbotics and LuminAI questionnaires are imperfect but directly useful starting points. [41]

Methodologically, the program should combine corpus work, controlled experiments, and qualitative interaction analysis. Corpus work should annotate not only yes-and turns but whole conversational segments for offer, uptake, block, repair, status move, callback, scene-state update, and unresolved tension. Experimental work should compare baseline assistants with improv-informed variants on both human ratings and behavioral metrics. Qualitative video- or transcript-coding should then use OCSM-like constructs—participation, newness, appropriateness—to study how collaborative sense-making actually unfolds through time. [42]

The most important derived metrics for such a program would be: offer-uptake rate, block rate, repair latency, additive relevance, scene-state consistency, initiative-balance / status symmetry, callback density, long-range arc retention, and user-rated collaborative agency. Of those, only the first few have anything close to established precedent today. But that is enough to define a serious measurement agenda rather than leaving “yes-and” as a loose metaphor. [43]

## Open questions and limitations

The evidence base is still asymmetrical. Business and management applications have mature pedagogy and many practitioner texts, but comparatively little strong empirical transfer evidence. Medical improv has the best organized review literature, but even there the review emphasizes heterogeneity and generally low-quality evidence. HCI and HAI have the most conceptually interesting studies, but sample sizes are often small and the projects are still system-specific. [44]

The field also has a scale problem. Most published work operationalizes one improv construct at a time—yes-and, turn-taking, status awareness, or co-creative dynamics—whereas real ensemble performance bundles them together. That means any immediate transfer to human-AI dialogue design should be understood as modular and partial, not as a wholesale import of improv theatre into product interaction. [45]

The cleanest bottom line is this: improv is a strong design and analysis frame for human-AI dialogue when the target is collaborative meaning-making under uncertainty. It is strongest at the level of uptake, repair, initiative, and co-construction of shared context. It weakens when embodiment, audience feedback, and narrative stakes are central but unavailable, and it must be constrained carefully in factual or safety-critical settings. The research opportunity is not to make AI “act like an improviser” in the broadest sense. It is to operationalize the few improv moves that measurably improve collaborative dialogue, then test them rigorously. [46]



[1] [11] [26] [38] https://cdn.aaai.org/ojs/12931/12931-52-16448-1-2-20201228.pdf

https://cdn.aaai.org/ojs/12931/12931-52-16448-1-2-20201228.pdf

[2] [17] https://www.bloomsbury.com/us/applied-improvisation-9781350014367/

https://www.bloomsbury.com/us/applied-improvisation-9781350014367/

[3] [4] [22] [32] [33] [41] https://cdn.aaai.org/ojs/13030/13030-52-16547-1-2-20201228.pdf

https://cdn.aaai.org/ojs/13030/13030-52-16547-1-2-20201228.pdf

[5] [19] https://pubmed.ncbi.nlm.nih.gov/27455469/

https://pubmed.ncbi.nlm.nih.gov/27455469/

[6] [8] [24] https://justin-cho.com/spolin

https://justin-cho.com/spolin

[7] [9] [12] [16] [28] [30] [35] [36] [42] [43] [45] https://aclanthology.org/2020.acl-main.218.pdf

https://aclanthology.org/2020.acl-main.218.pdf

[10] [39] https://journalofethics.ama-assn.org/article/how-use-improv-help-interprofessional-students-respond-status-and-hierarchy-clinical-practice/2023-05

https://journalofethics.ama-assn.org/article/how-use-improv-help-interprofessional-students-respond-status-and-hierarchy-clinical-practice/2023-05

[13] [23] https://www.researchgate.net/publication/221516785_Improvisation_principles_and_techniques_for_design

https://www.researchgate.net/publication/221516785_Improvisation_principles_and_techniques_for_design

[14] [20] https://link.springer.com/article/10.1007/s10459-024-10314-6

https://link.springer.com/article/10.1007/s10459-024-10314-6

[15] https://openlibrary.org/works/OL17346764W/The_Upright_Citizens_Brigade_Comedy_Improvisation_Manual

https://openlibrary.org/works/OL17346764W/The_Upright_Citizens_Brigade_Comedy_Improvisation_Manual

[18] [44] https://www.sciencedirect.com/org/science/article/abs/pii/S0019785816000327

https://www.sciencedirect.com/org/science/article/abs/pii/S0019785816000327

[21] [31] https://www.researchgate.net/publication/317868758_Creative_Sense-Making_Quantifying_Interaction_Dynamics_in_Co-Creation

https://www.researchgate.net/publication/317868758_Creative_Sense-Making_Quantifying_Interaction_Dynamics_in_Co-Creation

[25] [29] [46] https://cdn.aaai.org/ojs/12926/12926-52-16443-1-2-20201228.pdf

https://cdn.aaai.org/ojs/12926/12926-52-16443-1-2-20201228.pdf

[27] https://www.microsoft.com/en-us/research/publication/yes-and-a-generative-ai-multi-agent-framework-for-enhancing-diversity-of-thought-in-individual-ideation-for-problem-solving-through-confidence-based-agent-turn-taking/?locale=ja

https://www.microsoft.com/en-us/research/publication/yes-and-a-generative-ai-multi-agent-framework-for-enhancing-diversity-of-thought-in-individual-ideation-for-problem-solving-through-confidence-based-agent-turn-taking/?locale=ja

[34] [37] https://magazine.viterbi.usc.edu/fall-2020/features/you-are-an-ai-yes-and-i-also-do-improv-comedy/

https://magazine.viterbi.usc.edu/fall-2020/features/you-are-an-ai-yes-and-i-also-do-improv-comedy/

[40] https://link.springer.com/book/10.1057/9781137376589

https://link.springer.com/book/10.1057/9781137376589



Below is a structured extraction of the empirical core from the deep research you just ran. I’ve filtered to actual studies / systems with evaluative components (not just theory or pedagogy), and normalized them into a comparable format.



# 1) Comparison Table — Empirical Studies & Systems



# 2) Synthesis Paragraph

Across domains, the empirical record converges on a consistent pattern: improv principles reliably improve local interaction quality but do not yet scale to sustained, high-coherence collaboration. In dialogue systems (e.g., SPOLIN), “yes-and” increases offer uptake and forward motion, validating improv’s core heuristic at the turn level. However, performance-based studies like Improbotics show that these gains do not propagate to scene-level coherence—humans still carry narrative continuity, repair breakdowns, and maintain shared context. Co-creative measurement work (CSM, OCSM) reinforces this gap by demonstrating that interaction quality is inherently temporal, requiring sustained coordination across turns rather than isolated good responses. Meanwhile, applied-improv fields (medicine, business) show strong engagement and perceived skill improvement, but lack robust causal evidence, suggesting that improv functions more as a coordination scaffold than a guaranteed performance enhancer. Finally, newer AI systems like the YES AND framework indicate that improv principles can be embedded architecturally (e.g., multi-agent turn-taking), but their effectiveness depends on legibility, coordination, and control of initiative—not just acceptance of contributions. Taken together, the literature supports a narrow but solid claim: improv is a powerful micro-level interaction rule-set, but an incomplete macro-level coordination model without additional memory, structure, and evaluation layers.



# 3) Gap Statement — What a Credible 6–24 Month Panel Study Needs

A serious longitudinal study would need to move beyond one-off interaction tasks and measure how improv-informed interaction changes over time, across contexts, and under real usage conditions.

### Core Design Requirements

1. Panel Structure

Duration: 6–24 months 

Participants: N = 150–500 (to support subgroup and longitudinal modeling) 

Contexts: At least 2–3 domains (e.g., coding, writing, decision-making) 

Conditions: 

Control: standard AI assistant 

Treatment: improv-informed assistant (explicit yes-and + scene-state features) 



2. Multi-Level Measurement Stack

### (A) Turn-Level Metrics (micro)

Offer uptake rate (SPOLIN-style) 

Block rate (contradictions, non-sequiturs) 

Additive relevance (new useful contribution) 

Repair latency (time to recover from breakdown) 

👉 Already partially validated in current literature



### (B) Interaction-Level Metrics (meso)

Participation balance (who contributes what) 

Initiative shifts (lead/follow transitions) 

Interaction rhythm (turn pacing, interruption patterns) 

👉 From CSM / OCSM



### (C) Scene-Level Metrics (macro — currently missing)

Must be newly operationalized

Shared context stability (consistency of entities/goals) 

Narrative arc retention (goal continuity across turns) 

Callback density (reuse of prior elements) 

Goal convergence (do interactions move toward resolution?) 

👉 This is the largest gap in the field



### (D) User-Experience Metrics

Perceived collaboration quality 

Cognitive load 

Trust / reliance calibration 

Sense of agency (“I can act in this interaction”) 

👉 Used in Improbotics / LuminAI, but not longitudinally



### (E) Outcome Metrics (hardest but critical)

Task success (objective where possible) 

Creativity / idea diversity 

Learning or skill acquisition 

Decision quality 

👉 Almost entirely missing in current improv literature



3. Longitudinal Dynamics to Capture

A credible study must explicitly model:

Learning effects
Do users adapt to improv-style AI? Does performance improve? 

Drift / degradation
Does “yes-and” lead to noise accumulation over time? 

Division of labor evolution
Does AI take on more narrative/control responsibility? 

Trust calibration over time
Does acceptance → over-trust? Or better collaboration? 



4. Critical Experimental Comparisons

The study should test three competing hypotheses:

Local Benefit Hypothesis (supported today)
Improv improves turn-level interaction quality 

Coordination Hypothesis (open question)
Improv improves sustained collaboration and shared context 

Fragility Hypothesis (likely)
Improv increases divergence and incoherence without additional structure 



# Bottom Line

The current literature gives you strong primitives but no integrated system:

✅ We can measure “yes-and” locally 

✅ We can observe co-creative dynamics 

❌ We cannot yet measure or sustain scene-level coherence over time 

A 6–24 month panel study would be the first to answer the real question:

Does improv-style interaction create better long-term human-AI collaboration—or just better short-term conversation?

Right now, the field genuinely does not know.


