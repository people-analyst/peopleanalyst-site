# Literature Review

**Coordination cost in heterogeneous AI tool ecosystems**

Working draft · v0.1 · 2026-04-29 · For posting at peopleanalyst.com/research/devplane

This review situates the DevPlane research program within five literatures whose intersection defines the program's contribution. Each section: what the field knows, the canonical references, and where the C1 lead study (see [PROPOSAL.md](PROPOSAL.md)) extends or differs.

A note on confidence. References marked **[C]** are canonical and high-confidence — I am confident they exist as cited and represent the field accurately. References marked **[F]** are field-level claims (consensus or pattern across the literature) where I have not verified a specific source. Open questions marked **[DR]** are flagged for OpenAI Deep Research expansion (see [`deep-research-prompts.md`](deep-research-prompts.md)). Mike will validate uncertain references against scite, Google Scholar, or the deep-research outputs before public posting.

---

## 1. Cockpit and process-control HCI — the automation tradition

This literature is the program's primary anchor. It studies what happens when humans supervise automation that does work formerly done by humans, in high-stakes settings (aviation cockpits, nuclear control rooms, anesthesia, autonomous vehicles).

The foundational paper is **Bainbridge's *Ironies of Automation*** [C], a six-page article in *Automatica* in 1983 that articulated two ironies: (1) designer errors are absorbed and amplified by automation, and (2) automating the easy parts of a task leaves the operator with the harder residual, while simultaneously eroding the practice and situation awareness needed to handle that residual. Forty years later it remains the most-cited starting point for human-factors work on automation.

The literature elaborates Bainbridge along several axes. **Endsley's situation awareness model** [C] (1995, in *Human Factors*) provides the standard three-level decomposition: perception, comprehension, projection. SAGAT, Endsley's measurement instrument, has been used in hundreds of automation studies. **Lee & See (2004)** [C], also in *Human Factors*, gives the field its definitive treatment of trust calibration: trust is not just "more is better" but a calibration problem with both over-trust and under-trust costs, mediated by the operator's mental model of automation reliability. **Parasuraman & Manzey (2010)** [C] consolidate the literature on complacency and automation bias as attentional phenomena — operators systematically under-allocate attention to checks the automation purportedly handles.

The risk-compensation strand sits adjacent to but distinct from this literature. **Peltzman (1975)** [C], in the *Journal of Political Economy*, observed that automotive safety regulation produced smaller-than-expected reductions in fatalities, attributing the gap to compensating increases in risky driving. **Wilde's risk homeostasis theory** [C] generalized this into a hypothesis that operators target a constant level of perceived risk, fully offsetting safety improvements. The empirical record supports partial offset more often than full homeostasis [F], but the partial-offset prediction is the live one.

Recent work on automation in software development is sparse [DR]. The cockpit literature has been applied to clinical decision support, autonomous vehicles, and aviation, but the AI-agents-on-a-codebase setting is not well represented in the canonical literature as of this writing. This is one of the gaps the C1 study targets directly.

**Where DevPlane research extends.** The cockpit literature was built around a narrow operator-supervises-one-or-two-systems pattern. Heterogeneous AI tool ecosystems present a different topology: one operator supervises N concurrent agents with overlapping authority over the same codebase, mediated through a coordination surface (the kanban/registry). The *Ironies* prediction in this regime has not been formally tested. C1 tests it.

## 2. Computer-supported cooperative work — the coordination tradition

CSCW has spent four decades studying how groups coordinate work through shared artifacts, and is the natural literature for stigmergic coordination patterns of the kind DevPlane uses.

**Schmidt & Bannon's articulation work** [C] (1992, in the inaugural issue of the *Computer Supported Cooperative Work* journal) is the field's foundational concept: the ongoing meta-work of dividing, scheduling, and integrating cooperative work, distinct from the productive work itself. Articulation work is exactly what DevPlane's coordination layer is trying to absorb.

**Suchman's *Plans and Situated Actions*** [C] (1987) reframed workplace activity from plan-execution to situated improvisation. The implication for coordination tools is sharp: coordination layers that treat plans as authoritative and execution as derivative will systematically misrepresent how work actually happens. DevPlane's design tension between assignment-as-spec and assignment-as-orientation echoes this directly.

**Grudin's "Why CSCW applications fail"** [C] (1988, Communications of the ACM) named the social asymmetries that doom most groupware: the people who do the coordination work are not the people who get the benefit. Translated to DevPlane: the operator absorbs the cost of writing dispatches; the agents (and their downstream consumers) get the benefit. This asymmetry is a design constraint, not an incidental fact.

The stigmergy strand within coordination research draws from biology (Theraulaz on ant trail formation) [F] and AI (Hayes-Roth's blackboard architectures from the 1980s) [C]. Stigmergic coordination — actors coordinating through modifications to a shared environment rather than through direct messages — is the theoretical category DevPlane occupies. The CSCW community has revisited stigmergy periodically [DR], but a focused contemporary literature on stigmergic coordination among AI agents is thin.

Recent CSCW work on human-AI collaboration has grown rapidly since 2020 [DR]. CHI and CSCW conference proceedings include a growing stream of empirical studies on developers using single AI assistants (Copilot, ChatGPT). The multi-agent operational case is less well covered.

**Where DevPlane research extends.** Three contributions: (1) empirical telemetry on stigmergic coordination at sustained operational scale, where most stigmergy work has been theoretical or simulation-based; (2) a contemporary instance of Grudin's coordination-cost asymmetry in the AI-agent setting; (3) a setting where Suchman's situated-action framing can be tested against the formal-plan framing using continuous data on dispatch-text fidelity to shipped output.

## 3. Empirical software engineering — the methodology tradition

The empirical SE literature provides the methodological template for studying coordination using repository telemetry.

**Brooks' *The Mythical Man-Month*** [C] (1975) made the original argument that adding people to a software project increases coordination cost super-linearly. **Conway's Law** [C] (1968) named the structural relationship between organizational communication patterns and the systems they produce. Both are pre-empirical observations whose empirical testing has been the field's project for decades.

**Herbsleb & Mockus** [C] (in *IEEE Transactions on Software Engineering*) on coordination costs in distributed software development, particularly comparing same-site vs. distributed work. These are large-N observational studies using version-control and issue-tracker data, and their methodological approach — operationalize coordination cost as time-to-completion deltas under specified conditions — is directly applicable to the C1 study at smaller scale with richer per-event data.

The contemporary empirical SE literature uses GitHub and similar repositories at very large N. **Vasilescu and collaborators at CMU** [DR] have published extensively on developer activity, productivity measurement, and the methodological challenges of telemetry-based research (selection effects, what counts as a "unit," the ecological validity of public-repo data). Their methodological discipline — particularly around acknowledging confounds and treating activity metrics with appropriate skepticism — is what the DevPlane research program is trying to inherit at smaller N.

A specific recent strand is the empirical study of GitHub Copilot and similar AI assistants [DR]. RCTs from Microsoft and academic groups have measured task-completion time, satisfaction, and code quality. These typically study individual developers using a single AI assistant on bounded tasks, not multi-agent operational settings.

**Where DevPlane research extends.** The empirical SE literature has rich methodology and large-N observational corpora, but very small operational telemetry on the multi-agent operator role. DevPlane provides exactly that: small N, very high resolution. The methodological commitments of empirical SE (acknowledged confounds, skeptical treatment of activity metrics) are what protect the program from the failure modes of less-disciplined "AI productivity" research.

## 4. Behavioral decision-making — the operator tradition

The B-arm of the program (human-AI interaction) draws principally from this literature, and even the C1 study depends on it for the trust-calibration mechanism.

**Kahneman & Tversky's heuristics-and-biases program** [C] supplies the broad framing: human judgment under uncertainty is systematically biased in directions predictable from a small number of mechanisms (representativeness, availability, anchoring). Tetlock's work on **forecasting calibration** [C] (*Expert Political Judgment*, 2005; *Superforecasting*, 2015 with Gardner) provides the canonical methodology for measuring calibration: Brier scores, calibration diagrams, the distinction between calibration and resolution.

**Klein's naturalistic decision-making** [C] and the **recognition-primed decision model** offer a complementary framing for expert decision-making in time-pressured operational settings, which is exactly the operator-of-multiple-agents situation.

**Decision fatigue** [C] (Vohs, Baumeister, and others, though this literature has had replication concerns [F]) predicts that decision quality degrades across a session of repeated choices. The competing prediction from **deliberate practice** literature (Ericsson) [C] is that performance improves within a session as the operator warms up. These literatures make opposite predictions on the dispatch-quality-across-session question (B-arm secondary), which makes that question worth asking — the data adjudicates.

**The trust-in-automation literature** discussed in §1 is the bridge from behavioral decision-making into the cockpit/HCI tradition: Lee & See specifically integrate trust theory from Mayer/Davis/Schoorman with the automation context.

**Where DevPlane research extends.** The behavioral literature has rich theory and laboratory evidence, but very little continuous data on a single operator making thousands of micro-decisions over months in an operational setting. DevPlane's dispatch corpus is unusually well-suited to test calibration, fatigue, and continuation-bias predictions that the laboratory literature can only approximate.

## 5. Multi-agent systems and stigmergic coordination — the architecture tradition

The A-arm of the program draws on a literature that overlaps CSCW (§2) but extends into AI and distributed systems.

**Hayes-Roth's blackboard architectures** [C] (1985, in the *Artificial Intelligence* journal) defined the model of multiple specialist agents coordinating through a shared structured artifact rather than through direct messaging. Stigmergic coordination in DevPlane is a direct contemporary instance.

**Distributed-systems coordination primitives** [C] — consensus protocols, supervision trees, work queues — provide the engineering vocabulary for what DevPlane does at the agent-coordination layer. The CSCW vs. distributed-systems literatures have historically not communicated well [F]; DevPlane operates at exactly their intersection.

**Recent work on multi-agent LLM systems** [DR] — agentic workflows, agent orchestration frameworks (LangGraph, CrewAI, AutoGen, others), multi-agent debate/critique architectures — is rapidly growing but largely engineering-focused rather than empirical. The empirical question of how multi-agent LLM coordination actually fails in production is under-studied.

**Where DevPlane research extends.** A1's stigmergic-drift question — does coordination through shared artifacts produce systematically different failure signatures than direct-communication coordination — is a question this literature implies but rarely tests with real production data on heterogeneous agents.

## Synthesis — where this program sits

The DevPlane research program is at the intersection of these five literatures, and its contribution is partly to put them in conversation with each other:

- From the **automation tradition**, we take the Ironies-of-Automation prediction and the trust-calibration mechanism (foundation for C1)
- From **CSCW**, we take articulation-work, situated-action, and the coordination-asymmetry observations (foundation for the A-arm)
- From **empirical SE**, we take the methodological discipline for telemetry-based observation (foundation for measurement)
- From **behavioral decision-making**, we take the calibration measurement instruments (foundation for B-arm)
- From **multi-agent systems**, we take the stigmergic-coordination architectural vocabulary (frame for A1)

The program's distinctive position is the **continuous production telemetry on a real heterogeneous-AI multi-agent operator role**. Each of the five literatures has rich theory and partial empirics; none has had access to this kind of data at this resolution.

## Open questions for deep-research expansion

These are the gaps where I have low confidence and where targeted deep research is highest-value. They map directly to prompts in [`deep-research-prompts.md`](deep-research-prompts.md).

1. **Post-2020 application of *Ironies of Automation* to AI/LLM contexts.** The prediction is specific; how often has it been formally tested in any AI-related setting, and with what results?
2. **Recent CMU HCII / S3D / LTI work on human-AI collaboration in software development.** Specific authors, recent papers (2023–2026), live citations to the cockpit-automation literature.
3. **Risk compensation outside automotive.** How robust is the partial-offset finding across non-automotive domains? What's the most rigorous extension to information-work or knowledge-work settings?
4. **Empirical studies of multi-agent LLM coordination failures.** What's been published, what corpora are available, what failure-mode taxonomies already exist?
5. **Stigmergic coordination, contemporary computational treatment.** Has the CSCW or AI literature returned to stigmergy in the last decade? With what theoretical extensions?

The deep-research outputs will be reconciled against this review and the review revised before posting.

## Concluding note

A literature review's job is to make clear what is known, what is contested, and what is unknown. By that standard, the AI-coordination-cost question sits at the intersection of much that is known (cockpit automation, CSCW coordination, empirical SE methodology), some that is contested (decision fatigue replication, full-vs-partial risk homeostasis), and a substantial amount that is genuinely unknown — particularly the joint behavior of heterogeneous AI agents and a single human operator in a sustained operational setting. The DevPlane research program is sized to address the unknowns in this last category, with as much methodological discipline as the existing traditions provide.
