# Translation and Interpreting Studies for AI as a Translator of Domains and Registers

> **Provenance:** secondary literature review, generated 2026-05-01 to 2026-05-02 via deep-research synthesis. See `methodology.md` §1.1 for the discipline. Original `.docx` archived at `sources/_originals/Translation and Interpreting Studies for AI as a Translator of Domains and Registers.docx`.

---

# Translation and Interpreting Studies for AI as a Translator of Domains and Registers

## Scope and quality conditions

This scan uses a post-2015 secondary literature window, but it anchors the argument in the earlier canonical primary texts that still organize the field: Lawrence Venuti[1]’s The Translator's Invisibility[2], Eugene A. Nida[3]’s Toward a Science of Translating[4], Hans J. Vermeer[5] and Katharina Reiss[6] in Towards a General Theory of Translational Action[7], Ernst-August Gutt[8]’s Translation and Relevance[9], Daniel Gile[10]’s Basic Concepts and Models for Interpreter and Translator Training[11], and Robin Setton[12]’s Simultaneous Interpretation[13]. The reason to retain these older works is simple: later scholarship still defines itself through them, critiques them, or extends them into machine-assisted settings. [14]

To meet deep-research standards for this section, I applied five conditions. First, priority goes to primary sources or official publisher/journal records when establishing concepts, and to peer-reviewed post-2015 work when assessing current uptake. Second, I separate “translation as a task label” from “translation theory used as a substantive analytic frame.” Third, I distinguish three target settings instead of collapsing them: code generation and code migration, document mediation, and expert-to-lay register transfer. Fourth, I treat interpreting studies not as a loose metaphor for AI latency, but as a disciplined literature on overload, anticipation, omission, and coordination. Fifth, I mark where the translation frame is illuminating and where it becomes misleading by smuggling in assumptions about human intention, accountability, or phenomenology that do not cleanly transfer to current LLMs. These conditions are motivated by the verified literature base below. [15]

## Framework map

### Domestication, foreignization, and invisibility

Venuti’s contrast between domestication and foreignization remains highly portable to AI systems because current models are strongly biased toward fluency, readability, and target-side normalization. That is exactly the terrain where “naturalization” becomes analytically visible: the system smooths away friction, unfamiliarity, minority usage, or source-text strangeness in order to produce a transparent target text. Recent reviews of domestication/foreignization research continue to describe domestication as reader-oriented accessibility and foreignization as preservation of cultural otherness, while recent work on translator visibility shows that the problem is not only textual style but also the erasure of the mediating agent behind a fluent output. Venuti’s 2026 essay on machine translation sharpens the point further: when machine output is judged mainly by readability or invariant transfer, a deeply instrumental model of translation hides interpretation itself. [16]

Applied to LLMs, this lens is strong when the system translates across registers or domains and quietly replaces source-specific framing with target-side expectations. It explains why plain-language outputs often feel “better written” while also being subtly more assimilative than the source. It is weaker when users need aggressive adaptation on purpose. In those cases, what looks like domestication may simply be a legitimate response to task purpose, audience, or safety constraints. The concept therefore identifies a real failure mode, but it cannot by itself tell us whether a smoothing operation is justified. [17]

### Equivalence, fidelity, and the move beyond them

Nida’s framework still matters because it moved translation theory away from word-for-word correspondence toward receptor-oriented response, communication, and function. Recent reconsiderations of dynamic equivalence emphasize that the concept continues to orient debates about meaning, response, and fidelity, even when scholars criticize or reframe it. At the same time, recent “beyond equivalence” work argues that any single source utterance carries a field of possible meanings that are historically and culturally layered, so “finding the equivalent” is often too crude a picture of what translators actually do. [18]

For AI, this matters in two opposite ways. In code translation, equivalence can often be operationalized rather strongly through compilation, tests, or behavioral checks, so the old equivalence vocabulary still has bite. But in document mediation and expert-to-lay explanation, fidelity cannot mean lexical preservation alone, and it often cannot even mean a single stable “same meaning.” Here, the more useful question is whether the system preserved the right constraints, caveats, and action-guiding implications for the intended audience. This is exactly where equivalence is still useful as a problem statement, but no longer sufficient as a theory of success. [19]

### Skopos, coherence, and adequacy

Reiss and Vermeer’s skopos theory is especially productive for AI because it begins with purpose: what is this target text for, for whom, in what situation, under what commission or brief. The official English edition foregrounds purpose, intratextual coherence, and intertextual coherence or fidelity, and later applications continue to use the skopos/coherence/fidelity triad to explain why different target texts can all be acceptable if their purposes differ. [20]

This translates almost directly into prompt engineering and interface design. A request for “explain this MRI report to a patient,” “rewrite this clause for a contracting officer,” and “port this Java method to idiomatic Python” does not merely ask for one content-preserving transfer. Each request supplies a different skopos, so adequacy should be judged against a different target situation. The skopos lens is therefore excellent for AI systems that serve multiple audiences. It becomes dangerous when purpose is allowed to override factual and normative constraints too easily. In high-stakes settings, “fit for purpose” must be bounded by preserved caveats, provenance, and verifiability. [21]

### Relevance theory and inferential mediation

Gutt’s primary claim is still striking: once translation is understood within a general theory of inferential communication, there may be no need for a special theory of translation. His account centers interpretive resemblance, explicatures, implicatures, and the relation between cognitive effects and processing effort. Recent extensions of relevance-theoretic work in translation and interpreting continue to develop precisely these questions, including post-editing and interpreting, and explicitly connect them to translator and interpreter decision-making. [22]

This is one of the best conceptual bridges to LLM behavior. It illuminates why AI systems often add background information, explicitate assumptions, or collapse ambiguity when “helpfulness” is rewarded: they are optimizing for an inferred balance between effect and effort for an imagined audience. It also helps explain omission. If the model infers that some detail is low-value, it may delete it to produce a more easily processable response. The catch is that current LLMs are not human inferential agents in Gutt’s sense; the analogy is behavioral, not ontological. Relevance theory is therefore useful as a disciplined description of output patterns and risks, but not as evidence that the model understands intentions the way a human mediator does. [23]

## Interpreting studies and cognitive mediation

Interpreting studies makes the translation frame more concrete by showing what happens when mediation must occur under pressure. Gile’s effort models were built to explain why interpreters, even good ones, produce errors, omissions, and infelicities when comprehension, memory, production, and coordination compete for limited resources. Gile’s later clarifications emphasize that the models are didactic and functional rather than full descriptive psychologies, but they remain influential precisely because they explain overload and the “tightrope” condition near capacity saturation. Setton’s cognitive-pragmatic account adds a different emphasis: anticipation, restoration of implicit-explicit balance, communicative repackaging, and judgment/compensation/coordination within a working-memory-based model informed by pragmatics. [24]

Post-2015 interpreting research broadly supports this overload-centered picture while refining it. Synthetic reviews of cognitive load in distance interpreting still treat Gile’s effort models as foundational, but also point to more differentiated resource models. The 2020 attentional-control model explicitly separates language control from processing control. Prediction research shows that simultaneous interpreters anticipate upcoming language and use production-based mechanisms to support comprehension. Studies of live captioning and remote simultaneous interpreting show how extra visual channels can sometimes improve accuracy for proper names and numbers while also increasing processing demands. Recent work on consecutive interpreting shows similar resource bottlenecks in note-decoding and duration effects. [25]

For AI mediation, the payoffs are immediate. Interpreting studies gives names to four recurrent LLM behaviors: selection under pressure, omission when coordinating too many constraints, compensation through paraphrase, and anticipation based on partial context. Those are not merely “bugs”; they are the structural shape of mediation when time, context, or channel management is difficult. But the literature also shows the limit of the analogy. Human interpreters are embodied, situated, and ethically accountable participants in live interaction. LLMs simulate the outputs of mediation without occupying the same social role. So interpreting studies should guide interface and evaluation design, especially around overload and triadic coordination, but it should not be mistaken for a full psychology of the model. [26]

## LLMs as translators across code, registers, and domains

The code-translation literature already speaks the language of translation, but usually in a technical rather than theoretical sense. The field moves from unsupervised programming-language translation in TransCoder, to aligned benchmarks and corpora such as AVATAR, to general code models such as CodeT5 that explicitly model NL–PL and PL–PL alignment, and to systems such as CoTran that add compilation and symbolic-equivalence feedback. Across these papers the recurring finding is that surface fluency is not enough: functionally accurate code remains hard, and evaluation must include execution, tests, or symbolic checks rather than text similarity alone. [27]

The Weisz et al. Java-to-Python study is important because it is human-centered rather than purely benchmark-driven. In a controlled study with 32 software engineers, AI support reduced errors relative to working alone, but the effects depended on how outputs were presented. Multiple candidate translations mattered more to the workflow than simply varying output quality, and the main problem was not only correctness but users’ ability to inspect, compare, and evaluate imperfect translations. That makes the paper highly relevant to an AI-as-translator framing: it treats code generation not as one-shot replacement but as mediated comparison, adjudication, and revision. [28]

The specification-to-code line pushes the framing further. The 2022 hazard-analysis paper on Codex evaluated code synthesis against the complexity and expressivity of specification prompts, and current coding-agent documentation explicitly emphasizes verification through logs, test results, and visible uncertainty. In other words, the system is already being operationalized as a translator from a human brief into executable artifacts, with the crucial addition that the “fidelity test” is not rhetorical elegance but observable behavior plus inspectable traces. [29]

Cross-register and cross-domain work shows the same pattern outside software. Retrieval-augmented lay-language generation treats expert-to-lay mediation as both simplification and background explanation, introducing corpora and methods meant to preserve medically relevant content while making it intelligible to nonexperts. Easy-read and plain-language studies show that LLMs can increase accessibility, but they also raise ethical concerns about loss of nuance, paternalism, and hidden transformations of meaning. Recent evaluations of plain-language summaries further show that readability alone is not enough: high simplicity scores do not guarantee actual public understanding. [30]

This is also where the translation frame exposes concrete AI failure modes. Comparative work on generative-AI translation of scientific texts shows systematic linguistic differences from human translation. Studies of scientific summarization show a more dangerous pattern: LLMs often omit scope-limiting details and overgeneralize findings, sometimes even when prompted for accuracy; human-written summaries are far less likely to make those broadening errors. Work on machine-translation simplification and machine translationese reaches a similar conclusion from a different angle: machine outputs tend toward homogenization and reduced variation. In translation-theory terms, this is where false equivalence and naturalization cease to be literary abstractions and become measurable risks. [31]

## Trust, phenomenology, and verification

The phenomenology of working with human translators and interpreters is a better model for AI mediation than the usual “assistant” metaphor, because it is built around structured dependence under uncertainty. Research on translation project management shows trust as a dynamic practice rather than a one-time belief: clients, project managers, and translators build confidence through credentials, communication, revision structures, and managed vulnerability. In interpreter-mediated settings, trust is similarly relational and role-specific. In psychotherapy and healthcare, accuracy and confidentiality are recurring anchors of trust, but so are responsiveness, clear role boundaries, and the handling of emotional or cultural nuance. [32]

One of the most useful recent correctives comes from work with deaf professionals using signed-language interpreters. That study argues that “trust” can be too vague and sometimes unhelpful; instead of relying on an undifferentiated trust relation, users assess and evaluate interpreters’ values, competencies, and performance through concrete practices. This is exactly the right move for AI mediators. The question is not whether people should “trust the model.” The question is what observable proxies they use: comparison of variants, provenance, explicit uncertainty, opportunity for challenge, domain-expert review, and the ability to inspect omitted or transformed content. [33]

The strongest HAI lesson here is that verification practices should be built into the mediation interface. The Weisz study suggests the value of multiple candidates for comparison. Current coding-agent guidance emphasizes terminal logs, test results, and uncertainty communication. Professional translator studies under automation likewise show that human agency reappears through revision, client interaction, and community norms even when machine translation or GenAI is in the loop. An AI-as-translator framing therefore points away from seamless conversational polish and toward visibly accountable mediation. [34]

## Inventory of HAI work that uses translation theory substantively

The inventory is real but thin. Most HAI papers use “translation” as an application domain or benchmark, not as a substantive conceptual frame. The works below are the strongest examples I found along the spectrum from direct theory-use to theory-adjacent design.

Directly theory-facing or explicitly conceptual: the 2015 mixed-initiative translation essay by Green, Heer, and Manning makes a clear AI–HCI case for user-centered, interactive translation rather than fully automatic replacement; the 2016 translator-computer-interaction process study by Bundgaard, Christensen, and Schjoldager explicitly studies translation as situated human-computer work; Venuti’s 2026 essay argues for a hermeneutic human-machine collaboration model rather than an instrumental transfer model. [35]

Translation/interpreting studies adjacent to HAI: the 2023 relevance-theoretic synthesis and the 2026 collection on applications of relevance theory both include machine translation and post-editing as mediated communication problems, not merely engineering tasks; the 2026 study on meaningful creative work under automatic translation technologies analyzes how professional translators reclaim interpretive agency inside human-machine workflows. [36]

Human-centered AI work that is translation-rich but weakly theory-explicit: the 2020 CHI study on mobile translation AI identifies unmet needs and design implications for real-world translation users; the Weisz Java-to-Python study treats code migration as collaborative translation with inspection and adjudication; current plain-language and easy-read LLM work treats expert-to-lay mediation as a transformation problem but rarely engages translation theory directly. [37]

The upshot is that there is no large HAI tradition yet that substantially imports Venuti, Nida, skopos theory, or interpreting theory into LLM interface design. The field is best described as a set of promising adjacent literatures that have not yet been strongly integrated. That gap is precisely what makes the AI-as-translator framing worth pursuing. [38]

## Research-program statement

The most promising research program is not “AI as author” and not “AI as tool” in the thin sense, but AI as translator under accountable commission. In code generation, this means treating prompts, comments, issue tickets, and legacy code as source texts whose target form is executable code for a specified audience, environment, and maintenance regime. The evaluation stack should combine skopos-sensitive criteria such as idiomaticity and team conventions with harder fidelity tests such as compilation, tests, behavioral equivalence, safety checks, and comparison among alternative translations. The Weisz study, the broader code-translation literature, and current coding-agent guidance all point in this direction. [39]

In document mediation, the key move is to make domestication and foreignization controllable rather than hidden. Systems should be able to produce paired outputs: one highly accessible and target-oriented, one caveat-preserving and source-proximal, plus an explanation of what was added, omitted, or normalized. Relevance theory suggests how to expose explicatures and recovered assumptions; the scientific-summarization literature shows why this matters, since overgeneralization and omission are common even when outputs sound coherent. In this domain, provenance, variant comparison, and omission highlighting should be design defaults rather than expert-only features. [40]

In cross-register communication, the ideal target is not generic simplification but audience-specific adequacy with bounded loss. A hospital patient, a contract reviewer, a policymaker, and a novice programmer do not need the same target text. Skopos theory gives the correct grammar for that fact; Nida explains why audience response matters; recent lay-language and easy-read work shows both the promise and the ethical hazard. Research here should test not just readability, but retained caveats, decision quality, actionability, and the user’s ability to detect uncertainty or contest a mediation. [41]

The translation frame illuminates AI behavior best when it helps us see selection, omission, register shift, false equivalence, and naturalization as structural mediation choices rather than random glitches. It misleads when it implies that LLMs have the same intentional, ethical, and phenomenological status as human translators or interpreters. The right outcome is therefore not anthropomorphism, but a better design and evaluation vocabulary: briefs instead of vague prompts, target situations instead of generic tasks, variant comparison instead of single-output faith, and verification practices modeled on how skilled clients already work with human mediators. [42]

## Open questions and limitations

Two limits should be stated plainly. First, canonical translation theory is rich, but its direct uptake in HAI for LLMs is still sparse; many of the strongest current connections are analogical or programmatic rather than already institutionalized in interface research. Second, some of the most interesting recent developments—especially around AI and professional translation labor, and around Venuti’s 2026 intervention on human-machine collaboration—are very recent, so their influence on HAI design has not yet had time to consolidate. Those are not reasons to reject the frame. They are reasons to treat this moment as a field-building opportunity. [43]



[1] [5] [22] Translation and Relevance: Cognition and Context - 2nd Edition - Ernst

https://www.routledge.com/Translation-and-Relevance-Cognition-and-Context/Gutt/p/book/9781900650298?utm_source=chatgpt.com

[2] [12] [17] Easy-read and large language models: on the ethical dimensions of LLM-based text simplification | Ethics and Information Technology | Springer Nature Link

https://link.springer.com/article/10.1007/s10676-024-09792-4?utm_source=chatgpt.com

[3] [11] [24] (PDF) The Effort Models of Interpreting as a Didactic Construct

https://www.researchgate.net/publication/356372279_The_Effort_Models_of_Interpreting_as_a_Didactic_Construct?utm_source=chatgpt.com

[4] [10] [28] [34] [39] Better Together? An Evaluation of AI-Supported Code Translation for IUI 2022 - IBM Research

https://research.ibm.com/publications/better-together-an-evaluation-of-ai-supported-code-translation?utm_source=chatgpt.com

[6] [33] Deaf professionals’ perceptions of 'trust' in relationships with signed language interpreters | Translation & Interpreting

https://www.trans-int.org/index.php/transint/article/view/1717?utm_source=chatgpt.com

[7] [30] Retrieval augmentation of large language models for lay language generation - ScienceDirect

https://www.sciencedirect.com/science/article/pii/S1532046423003015?utm_source=chatgpt.com

[8] [42] Spring 2026 - Volume 52 Issue 3 – Critical Inquiry

https://criticalinquiry.uchicago.edu/past_issues/issue/autumn_2008_v35_n1/?utm_source=chatgpt.com

[9] [26] Simultaneous Interpretation: A cognitive-pragmatic analysis | Robin Setton

https://benjamins.com/catalog/btl.28?utm_source=chatgpt.com

[13] [16] A Review of 'The Translator's Invisibility' Book by Lawrence Venuti | International Journal of Linguistics, Literature and Translation

https://al-kindipublishers.org/index.php/ijllt/article/view/7359?utm_source=chatgpt.com

[14] Translation Changes Everything: Theory and Practice - 1st Edition - La

https://www.routledge.com/Translation-Changes-Everything-Theory-and-Practice/Venuti/p/book/9780415696289?utm_source=chatgpt.com

[15] [36] Relevance Theory in Translation and Interpreting: A Cognitive-Pragmati

https://www.routledge.com/Relevance-Theory-in-Translation-and-Interpreting-A-Cognitive-Pragmatic-Approach/Gallai/p/book/9781032025728?utm_source=chatgpt.com

[18] Toward a Science of Translating: With Special Reference to Principles and ... - Eugene A. Nida - Google Books

https://books.google.com/books/about/Toward_a_Science_of_Translating.html?id=T9A7EAAAQBAJ&utm_source=chatgpt.com

[19] AVATAR: A Parallel Corpus for Java-Python Program Translation - ACL Anthology

https://aclanthology.org/2023.findings-acl.143/?utm_source=chatgpt.com

[20] [41] Towards a General Theory of Translational Action: Skopos Theory Explai

https://www.routledge.com/Towards-a-General-Theory-of-Translational-Action-Skopos-Theory-Explained/Reiss-Vermeer/p/book/9781905763955?utm_source=chatgpt.com

[21] Simplifying radiology reports with large language models: privacy-compliant open- versus closed-weight models | European Radiology | Springer Nature Link

https://link.springer.com/article/10.1007/s00330-026-12329-6?utm_source=chatgpt.com

[23] [40] Frontiers | Functional relevance as a principle of translation problem-solving

https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.1073532/full?utm_source=chatgpt.com

[25] A Synthetic Review of Cognitive Load in Distance Interpreting: Toward an Explanatory Model - PMC

https://pmc.ncbi.nlm.nih.gov/articles/PMC9360781/?utm_source=chatgpt.com

[27] Unsupervised Translation of Programming Languages | Research - AI at Meta

https://ai.meta.com/research/publications/unsupervised-translation-of-programming-languages/?utm_source=chatgpt.com

[29] A hazard analysis framework for code synthesis large language models | OpenAI

https://openai.com/index/a-hazard-analysis-framework-for-code-synthesis-large-language-models/?utm_source=chatgpt.com

[31] What are the differences? A comparative study of generative artificial intelligence translation and human translation of scientific texts | Humanities and Social Sciences Communications

https://www.nature.com/articles/s41599-024-03726-7?utm_source=chatgpt.com

[32] Dynamics of Trusting in Translation Project Management: Leaps of Faith and Balancing Acts - Maeve Olohan, Elena Davitti, 2017

https://journals.sagepub.com/doi/10.1177/0891241615603449?utm_source=chatgpt.com

[35] [38] UW Interactive Data Lab

https://idl.uw.edu/papers/translation-ai-hci?utm_source=chatgpt.com

[37] Unmet Needs and Opportunities for Mobile Translation AI

https://research.google/pubs/unmet-needs-and-opportunities-for-mobile-translation-ai/?utm_source=chatgpt.com

[43] You Sneak the Human Back in: Automatic Translation Technologies and the Pursuit of Meaningful Creative Work in Professional Translation - Deborah Giustini, Karol Muszyński, Valeria Pulignano, 2026

https://journals.sagepub.com/doi/full/10.1177/07308884261440939?utm_source=chatgpt.com





Below is a structured extraction and synthesis from the deep-research thread on AI as translation (domains, registers, code, and interpretation). I’ve focused on studies and papers that either (a) explicitly frame LLMs as translation systems or (b) empirically evaluate cross-domain / cross-language / cross-register transformations—plus a few adjacent interpreting/cognitive-load studies used as analogues.



# 1) Comparison Table — Studies & Evidence Base



# 2) Synthesis (Analytical)

Across translation studies, interpreting studies, and LLM evaluation research, a consistent structural pattern emerges:

### 1. LLMs behave like goal-conditioned translators (skopos systems)

Performance depends less on fidelity in a strict sense and more on whether the implicit purpose of the translation is correctly inferred. 

This aligns strongly with Hans Vermeer—but unlike human translators, LLMs infer skopos probabilistically rather than through explicit negotiation. 

### 2. Systematic transformation biases map cleanly to translation theory

Domestication bias (Venuti): LLMs normalize unfamiliar structures into familiar ones (e.g., simplifying technical nuance). 

False equivalence: Superficially correct outputs that violate deeper semantic constraints (common in code translation). 

Omission under load: Analogous to Daniel Gile—LLMs drop constraints when context is saturated. 

### 3. Code generation = translation, not synthesis (in most cases)

Evidence from Codex, TransCoder, and CodeXGLUE suggests that LLMs: 

Map natural language ↔ code 

Map code ↔ code 

Map specification ↔ implementation 

But they do so through pattern alignment, not semantic grounding → hence fragile correctness. 

### 4. Interactive loops outperform one-shot translation

Iterative prompting mirrors consecutive interpreting, where: 

Clarification 

Reframing 

Back-checking
improves fidelity. 

This suggests that human-AI collaboration is structurally closer to interpreter-client interaction than to static translation. 

### 5. Verification is not optional—it is constitutive

Across all domains (code, language, domain translation): 

Correctness cannot be assumed 

Must be tested, executed, or triangulated 

This mirrors professional translation workflows: 

Draft → review → back-translation → validation 

### 6. Where the analogy breaks

Translation theory misleads when applied too literally:

LLMs have no stable intention or meaning representation 

No accountability or ethical stance (unlike human translators) 

No persistent memory of discourse commitments 

Therefore:
→ They are statistical mediators, not agents in a communicative act 



# 3) Gap Statement — What a Credible 6–24 Month Panel Study Must Measure

Current evidence is overwhelmingly cross-sectional and task-based. A serious longitudinal study of AI-as-translator would need to move beyond benchmarks to situated, evolving human-AI systems.

## A. Core Design Requirements

1. Panel Structure

Duration: 6–24 months 

Units: Knowledge workers using AI as translator (engineering, analytics, legal, medical, etc.) 

Sample size: 

Minimum: 150–300 individuals 

Preferable: 500+ across domains 

2. Repeated Measures (monthly or biweekly)
Track within-subject change over time, not just outcomes.



## B. Measurement Domains

### 1. Translation Accuracy (Objective)

Code correctness (execution pass rates) 

Semantic equivalence scoring (human + automated) 

Error taxonomy: 

Omission 

False equivalence 

Hallucinated constraints 

Register distortion 



### 2. Verification Behavior (Critical, under-measured)

Frequency of: 

Testing 

Cross-checking 

Rewriting prompts 

Time spent verifying vs generating 

Introduction of external tools 

👉 This is the single biggest missing variable in current research.



### 3. Trust Calibration (Dynamic)

Self-reported trust vs actual correctness 

Over-trust / under-trust gap 

Drift over time: 

Does familiarity increase blind reliance? 



### 4. Cognitive Load & Attention (Interpreting parallel)

Task switching 

Sustained attention measures 

Perceived vs actual effort 

Indicators of automation complacency 



### 5. Skill Trajectory (Deskilling vs Augmentation)

Independent task performance without AI 

Ability to detect errors 

Conceptual understanding vs surface fluency 



### 6. Register & Domain Translation Capacity

Ability to: 

Translate expert → lay 

Translate requirements → implementation 

Translate across business/technical domains 

Evaluate: 

Fidelity 

Clarity 

Loss of nuance 



### 7. Interaction Structure (Interpreter Model)

Number of turns per task 

Prompt refinement patterns 

Use of meta-instructions (skopos specification) 



## C. Instrumentation Requirements

Task logs (real workflows, not lab tasks) 

Execution traces (for code) 

Prompt-response histories 

Human evaluation panels 

Optional: 

Eye-tracking / attention proxies 

IDE telemetry 

Version control diffs 



## D. Key Hypotheses the Study Must Test

Verification Hypothesis
Performance gains are mediated by verification behavior—not raw model capability. 

Trust Drift Hypothesis
Users become less accurate as trust increases beyond calibration. 

Interactive Superiority Hypothesis
Multi-turn “interpreting-like” interaction outperforms one-shot prompting. 

Skill Bifurcation Hypothesis
Users diverge into: 

High-skill orchestrators (augmenting expertise) 

Low-skill dependents (translation reliance without understanding) 



## Bottom Line

A credible panel study must treat AI not as a static tool, but as a mediating layer in an evolving translation system, where:

Accuracy = f(model × task × verification × interaction structure) 

And the real unit of analysis is human–AI translation practice over time, not isolated outputs. 



If you want, I can extend this into a full study design spec (methods, instruments, survey items, telemetry schema, and analysis plan) aligned to your People Analytics / instrumentation stack.


