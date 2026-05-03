# AI–Human Interaction — roadmap

> **Provenance:** verbatim copy of `ai_human_interaction_research_roadmap.md` generated 2026-05-01 via deep-research synthesis. Surfaces the twelve-branch HAI field map, frontier zones, adjacent fields, deep intersections, and six cross-cutting research programs — the substrate the program scaffold (`overview.md`, `program.md`, `literature-map.md`) is built on. Treat this file as load-bearing field orientation, not as the program itself.

---

# Research and Development Avenues in AI–Human Interaction
*A roadmap from established branches to unexplored intersections*

## I. Mapping the Existing Field

Research on AI–human interaction (often abbreviated HAI, or under broader umbrellas like Human-Centered AI / HCAI) sits at the confluence of human-computer interaction (HCI), cognitive science, social psychology, machine learning, and science and technology studies. The literature can be organized into roughly twelve overlapping branches. None of these are fully discrete — most papers touch several — but the taxonomy is useful for placing work and seeing gaps.

**1. Interface and interaction design.** The HCI inheritance: dialogue systems, conversational UX, multimodal input/output, prompt design, latency and turn-taking. The classic Nielsen and Norman strands extended into the LLM era. Recent work has shifted from discrete commands to open-ended natural-language interaction, with associated questions about discoverability, feedback, and error recovery.

**2. Trust and reliance calibration.** When do humans trust AI outputs appropriately? Automation bias, algorithmic aversion, the "aversion-to-appreciation" arc, and the trust-recovery dynamics after errors. Foundational work by Lee and See (2004), Parasuraman, and more recently Logg on algorithm appreciation. The frontier here is *appropriate* trust — not maximal trust — across heterogeneous task types.

**3. Explainability and interpretability (XAI).** From LIME and SHAP through counterfactual explanations to mechanistic interpretability. There's a productive tension between technical interpretability (what the model is doing) and human-meaningful explanation (what helps a person decide). The two are not the same problem.

**4. Human-AI collaboration and teaming.** Complementarity research, division of labor, handoff dynamics, "centaur" workflows. Includes the literature on AI as decision support in medicine, law, and intelligence work. Ben Shneiderman's HCAI framework lives here, as does work on appropriate task allocation.

**5. Alignment and value learning.** RLHF, constitutional methods, preference learning, debate, recursive reward modeling. The branch most concerned with the gap between stated preferences, revealed preferences, and reflective preferences. Increasingly intersects with moral philosophy and social choice theory.

**6. Social and parasocial dynamics.** Anthropomorphism (Epley, Waytz, Cacioppo), the CASA paradigm (Computers Are Social Actors, Reeves and Nass), companionship AI, parasocial attachment. This branch has exploded with the rise of conversational LLMs and AI companions.

**7. Cognitive effects of AI use.** Cognitive offloading, the "Google effect" extended to LLMs, deskilling, learning effects, metacognitive calibration. Includes both worried (deskilling) and optimistic (scaffolding, ZPD-extension) framings.

**8. Affective computing.** Emotion recognition, emotional expression by AI, emotion regulation through AI. Rosalind Picard's foundational work; current debates over the validity of automated affect recognition.

**9. Fairness, accountability, transparency, ethics (FAccT).** Bias auditing, demographic parity vs. other fairness criteria, governance, contestability, harm taxonomies. Strong intersections with critical algorithm studies.

**10. Embodied and situated interaction.** Social robotics, AR/VR agents, ambient AI. The Cynthia Breazeal lineage; questions about presence, embodiment, and proxemics with non-human agents.

**11. Creativity and co-creation.** AI as creative collaborator in writing, design, music, code. Includes the "stylistic homogenization" debate and questions about ideation vs. execution support.

**12. Persuasion, influence, and information ecosystem effects.** AI's effects on beliefs, decisions, voting, purchasing; downstream effects on collective epistemology and the information commons.

A useful way to classify any given paper is to locate it in (a) which branch, (b) which **timescale** of interaction it studies (single turn, single session, longitudinal), (c) which **unit of analysis** (individual, dyad, group, institution, society), and (d) whether it is descriptive, normative, or design-oriented. Most existing work clusters in single-session, individual-level, descriptive studies — which itself indicates where the field is thin.

## II. The Edges of Each Branch

The frontier of each branch tends to share certain structural features: longer timescales, larger units of analysis, more naturalistic settings, and more honest engagement with the recursivity of the systems studied (humans change AI, AI changes humans, the changes feed back). A few specific frontier zones:

**Longitudinal interaction.** Almost everything we know about human-AI interaction comes from short-window studies. We know remarkably little about what happens to a person's reasoning, vocabulary, social life, or skill acquisition over months and years of daily interaction with a capable system. The methodological challenge is real (it requires either patience or instrumented field studies), but this is arguably the most important empirical gap in the field.

**Multi-party configurations.** Most studies have one human and one AI. Real life increasingly involves groups of humans interacting with AI, AI mediating between humans, AI participating in meetings, and multiple AIs coordinating around humans. The dynamics of these configurations — who talks to whom, who arbitrates, how authority is distributed — are barely studied.

**Long-context emergence.** As context windows grow and as memory features mature, qualitatively new phenomena appear: drift, accumulating shared reference, evolving rapport, sycophancy spirals, and breakdown modes. These are not yet well-characterized in the literature.

**Calibration of personalization.** Personalized AI raises a genuine paternalism-vs-autonomy tension that hasn't been worked through carefully. When does adaptation help the user vs. trap them in a comfortable feedback loop? Existing recommender-system literature is a starting point, but conversational AI raises distinct questions because the personalization is not just *what* gets shown but *how* the agent reasons.

**Cross-cultural and multilingual interaction.** Most HAI research is anglophone and WEIRD-sample. Trust dynamics, anthropomorphism, conversational norms, and notions of authority differ substantially across cultures, and we have very thin coverage outside a few populations.

**Sociotechnical embedding.** How AI tools are appropriated by organizations, professions, and informal communities; how they reshape division of labor, status hierarchies, and credentialing. STS scholars are doing this work, but it is poorly integrated with the experimental HCI literature.

**Failure modes and recovery.** Most studies measure performance; few measure how humans and AI together recover from mistakes, especially compounding mistakes. The "graceful degradation" of human-AI systems is understudied.

## III. Analogical Projection from Adjacent Fields

This is where speculative theory-building can be most generative. Each of the analogies below suggests a research program — sometimes by importing a framework, sometimes by importing a method, sometimes simply by raising questions that the HAI literature has not yet asked.

**Companion-species studies (Haraway, ethology of pets and working animals).** Donna Haraway's framework for thinking about humans living with non-human intelligences provides a vocabulary the HAI field largely lacks: "significant otherness," co-becoming, "response-ability." The dog-training and assistance-animal literature also offers methodological models for studying long-term skilled relationships with non-human partners — including how trust, role-clarity, and mutual prediction develop over years.

**Apprenticeship and mentorship research.** The educational psychology literature on cognitive apprenticeship (Collins, Brown, Newman) and Vygotsky's zone of proximal development offer rich frames for thinking about AI as a more-knowledgeable-other. The interesting question is not whether AI can teach but what kinds of skill acquisition are *helped* vs. *short-circuited* by an always-available expert.

**Translation and interpreting studies.** Translators have long thought about mediation between symbolic systems. The HAI field treats AI mostly as a tool or interlocutor, rarely as a translator between domains, registers, or worldviews — yet much of what AI now does is exactly that. Translation studies offers concepts (domestication vs. foreignization, equivalence, fidelity) that could be productively imported.

**Therapy and working-alliance research.** The psychotherapy literature has spent fifty years operationalizing what makes interpersonal interaction beneficial: working alliance, rupture and repair, transference, the "common factors." Rather than asking whether AI can replace therapists, a more productive question is: which working-alliance constructs transfer, which break, and what new constructs emerge?

**Distributed cognition (Hutchins, *Cognition in the Wild*).** Hutchins showed how cognition is distributed across people, artifacts, and representations. AI dramatically reorganizes such distributions, but the empirical work on how it does so — at the level of, say, a research lab or a hospital ward or a courtroom — is thin. The methodological tradition (cognitive ethnography) is well-developed and underused.

**Niche construction theory (evolutionary biology).** Organisms modify their environments, which then shape their evolution; the loop is the unit of analysis. AI is an environment-modifying technology of unusual reach, and the biology framing makes the recursive dynamics legible in ways that single-snapshot psychology often obscures.

**Communication accommodation theory (Giles).** Speakers converge or diverge in style depending on social goals. There is a small but growing literature on how humans adapt their language to AI; the symmetric question — how AI adapts to humans, and the political and identity stakes thereof — is underdeveloped.

**Improv theatre and ensemble performance.** Turn-taking, "yes and," scene construction, the offer-and-block dynamic. Improv pedagogy has developed sophisticated heuristics for collaborative meaning-making in real time. The HAI literature on conversational dynamics could productively borrow this vocabulary.

**Institutional economics (Williamson, Ostrom).** Transaction costs, governance of commons, hybrid organizational forms. AI changes the cost structure of many information-production tasks; institutional economics offers tools for predicting which activities migrate, which institutions dissolve, and which new forms emerge.

**Phenomenology of skill (Dreyfus, Merleau-Ponty).** Dreyfus's famous critique of AI was based on a phenomenology of expert skill that, ironically, may now be the right framework for studying *how human expertise changes* under conditions of AI assistance. Merleau-Ponty's body schema also extends naturally to incorporated tools — what does it mean for a fluently-used AI to become part of the user's body schema?

**Memory research (Wegner's transactive memory).** Couples and teams develop transactive memory systems where each member specializes and the group remembers more than any individual. AI is now a participant in such systems, but the existing transactive memory literature has barely been extended to cover it.

**Religious and ritual studies.** Humans have long histories of relating to non-human agents — deities, spirits, ancestors — through ritual, prayer, and disciplined attention. Without endorsing any particular metaphysics, the literature on how such relationships are structured, maintained, and policed by communities offers analogies the HAI field has not seriously engaged.

## IV. Underexplored Deep Intersections

Beyond analogy, there are fields whose substance the AI–human interaction literature *needs* to engage with but has barely begun to. These are not surface metaphors; they are deep bodies of research where genuine theoretical integration is possible.

**Developmental psychology of children with AI.** What happens to theory of mind, attachment, language acquisition, and moral development when children grow up with AI interlocutors as ambient features of life? Almost no longitudinal work exists. Vygotsky, Piaget, attachment theory, and contemporary developmental cognitive neuroscience all have direct purchase here. The political and ethical pressure to do this research carefully should not be a reason to do it slowly.

**Disability studies and crip theory.** Most discussion of AI as assistive technology stays narrowly instrumental. Disability studies and crip theory offer richer frames: AI as access infrastructure, the politics of who gets adapted to what, the difference between accommodation and inclusion, the dangers of AI making "passing" mandatory. There is a serious intellectual program here that the HAI mainstream has not engaged.

**Sociology of knowledge and epistemic infrastructure.** AI is becoming part of how knowledge is produced, certified, and circulated. The sociology of scientific knowledge (Bloor, Latour, Knorr Cetina) and the sociology of expertise (Collins, Evans) offer machinery for studying this that goes well beyond "misinformation studies." The questions are: what kind of epistemic actor is AI, what kind of warrant do its outputs carry, and how do communities of practice negotiate this?

**Indigenous and non-Western relational ontologies.** Many philosophical traditions — including a number of Indigenous frameworks — have developed sophisticated accounts of relationship with non-human intelligences and agencies, often tied to obligations and protocols rather than the trust/autonomy frame dominant in Western HAI. Tyson Yunkaporta's *Sand Talk* is one accessible entry point; there is a substantial scholarly literature behind it. This is a place where the field is not just missing diversity but missing genuine intellectual resources.

**Feminist epistemology and standpoint theory.** Donna Haraway's "situated knowledges," Sandra Harding's strong objectivity, the long debate about the politics of "the view from nowhere." AI systems are routinely treated as having or producing such views; feminist epistemology has the most developed critical vocabulary for what is wrong with that picture, and the most developed positive vocabulary for what *partial, situated, accountable* knowledge looks like. This work has barely been integrated into mainstream HAI.

**Cognitive linguistics, especially metaphor (Lakoff and Johnson).** The metaphors that structure how we talk about AI — agent, assistant, tool, brain, mind, partner — have profound effects on how we design systems, set policy, and form expectations. There is a serious research program in mapping these metaphors empirically, tracing their downstream effects, and asking which metaphors better serve which purposes.

**Psychoanalytic theory.** Setting aside questions of whether psychoanalysis is true *as a theory of mind*, it is unrivaled as a theory of *what humans do with objects and partial-objects in their inner life*. Transference, projection, idealization, splitting — all of these are happening in human-AI relationships, and the existing parasocial-attachment literature does not have nearly the conceptual depth to address them. A serious psychoanalytic engagement with HAI is overdue.

**History of mediation technologies.** Writing, print, telegraph, telephone, internet — each prior mediation technology produced extensive scholarship on its cognitive, social, and political effects (Eisenstein, Ong, Innis, Carey). AI is a mediation technology of unusual scope. The historiographic and theoretical inheritance is large; almost none of it has been systematically applied.

**Conversation analysis and ethnomethodology.** The Sacks/Schegloff/Jefferson tradition has developed exquisitely fine-grained tools for studying the micro-structure of interaction — turn construction units, repair, preference organization. Applied to human-AI interaction, this would yield a much more precise account of where conversational norms hold, break, and mutate than the field currently has. Some work exists; the iceberg is mostly underwater.

**Political philosophy and democratic theory.** Most ethics-of-AI work is individual-scale: bias, autonomy, harm. The questions of what AI does to deliberation, public reason, civic capacity, and democratic competence are barely engaged outside a small group of political theorists. Habermas, Pettit, and the deliberative democracy literature all offer machinery here, as does the older republican tradition concerned with the cultivation of civic virtue.

**Memory, mourning, and digital remains.** AI of deceased people raises questions that classic grief research has frameworks for (continuing bonds theory, Klass and Walter), but that the AI literature has barely touched. There is a serious research program on what good and bad versions of AI-mediated grief look like.

**Phenomenology of distraction and attention.** Bernard Stiegler, Yves Citton, and others have developed sustained accounts of attention as a cultural-technical achievement. AI changes the attentional ecology, and an empirical research program tied to this theoretical literature would be valuable.

**Aesthetics and the philosophy of art.** What kind of artifact is an AI-generated work? The existing debate is mostly about authorship and copyright. The deeper aesthetic questions — about taste formation, the social functions of art, the role of constraint in creative practice — have richer treatments in Bourdieu, Danto, and others.

## V. A Few Cross-Cutting Research Programs Worth Naming

Pulling threads together, several specific programs strike me as both novel and tractable:

A **longitudinal cognitive ethnography of professional AI use** — following a cohort of, say, lawyers or radiologists or research scientists for two to five years, instrumented and observed, to track how skill, judgment, professional identity, and interpersonal dynamics shift. The methodological tradition exists (Hutchins, Charles Goodwin); the cohort-level commitment does not.

A **comparative ontology project** — empirically mapping the metaphors and conceptual schemes that different populations (by culture, age, profession, religion) use to make sense of AI agents, and tracing which schemes lead to which kinds of behavioral and emotional outcomes. This is a project that brings cognitive linguistics, anthropology, and HCI into one frame.

A **rupture-and-repair research program for human-AI interaction** — borrowing directly from psychotherapy research, studying what happens when AI interactions go wrong, how repair is attempted, what makes repair successful, and what the long-term effects of poorly-repaired ruptures are.

A **transactive memory and team-cognition program for human-AI teams** — extending Wegner's framework empirically into teams that include AI participants, with attention to specialization, coordination cost, and how the team adapts when its AI member is removed or replaced.

A **developmental cohort study** — children growing up with AI from preschool through adolescence, with attention to language, theory of mind, attachment, and moral reasoning. This is ethically and politically sensitive and exactly because of that should be done with care rather than not done.

A **sociology of AI epistemic authority** — empirical study of how communities of practice (medical, legal, scientific, journalistic) are negotiating what kind of warrant AI outputs carry, and how these negotiations are reshaping the institutions of certified knowledge.

A **cross-cultural HAI consortium** — coordinated multi-site studies of trust, anthropomorphism, conversational norms, and authority in AI interaction across at least a dozen substantially different cultural settings, with theoretical attention to the variables that vary and those that don't.

## VI. Where This Leaves Us

The existing HAI literature is rich on short-window, individual-scale, descriptive questions. It is thin on long timescales, larger units of analysis, and the deep theoretical machinery developed elsewhere for thinking about humans living with non-human agents, mediation technologies, distributed cognition, and the formation of skill and judgment over a life. The most fruitful research programs are likely to be those that take seriously both empirical rigor and the theoretical resources already developed in fields that the AI mainstream has under-engaged: developmental psychology, disability studies, the sociology of knowledge, psychoanalytic theory, conversation analysis, feminist epistemology, the history of mediation, and the philosophical traditions — Western and non-Western — that have long been concerned with how humans live with intelligences other than their own.

The unifying suggestion is methodological as well as substantive: most of what is missing is *time*, *context*, and *theoretical depth*. The field needs more longitudinal work, more naturalistic and sociotechnical embedding, and more serious engagement with bodies of theory that were developed for adjacent problems and are sitting unused.
