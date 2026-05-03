# Institutional Economics of AI and the Reorganization of Work and Knowledge Production

> **Provenance:** secondary literature review, generated 2026-05-01 to 2026-05-02 via deep-research synthesis. See `methodology.md` §1.1 for the discipline. Original `.docx` archived at `sources/_originals/Institutional Economics of AI and the Reorganization of Work and Knowledge Production.docx`.

---

# Institutional Economics of AI and the Reorganization of Work and Knowledge Production

## Scope and evidentiary standard

This report treats institutional economics as two connected lenses on AI. The first is the Coase–Williamson line, which explains organizations by the comparative costs of using markets, hierarchies, and hybrids. The second is the Ostrom–Bloomington line, which explains how communities govern shared resources through rules, monitoring, sanctioning, and multilevel coordination. I use those lenses to read the post-2015 AI literature on firms, training data, and open-source production, while keeping three quality conditions in view: primary sources first, post-2015 evidence prioritized, and a clear distinction between direct Williamson/Ostrom applications and adjacent empirical evidence that an institutional-economics account should absorb. [1]

The resulting literature map is asymmetric. There are now several explicit papers applying theory-of-the-firm reasoning to AI-enabled boundary change and a growing policy-and-commons literature on AI datasets and open-source AI. But the much larger evidence base still comes from adjacent adoption, productivity, governance, and software-engineering studies that do not primarily identify as institutional economics. That asymmetry is itself an important finding: the institutional consequences of AI are more visible in the data than in the currently labeled research program. [2]

## Core institutional framework

Coase’s starting point is that firms exist because using the price mechanism is costly: discovering relevant prices, negotiating, drafting contracts, inspecting performance, and resolving disputes all consume resources. In his Nobel lecture, Coase explicitly restated the argument of The Nature of the Firm this way: transaction costs make administrative coordination sometimes cheaper than market exchange, so efficient economies require a mix of markets and “areas of planning within organizations.” Williamson then transformed that intuition into a comparative-governance framework: the transaction becomes the basic unit of analysis, transactions differ in their attributes, and governance structures differ in their costs and competencies. The central question is not “market or state” in the abstract, but which governance form best aligns with a given transaction. [3]

Within that framework, three concepts matter most for AI. Transaction costs are the costs of search, bargaining, coordination, monitoring, and enforcement. Asset specificity refers to investments that are much more valuable inside one relationship than outside it, which creates vulnerability to hold-up and raises the value of safeguards or integration. Governance hybrids are the intermediate forms between spot markets and full hierarchy—long-term contracts, franchising, relational contracting, regulated platforms, and other arrangements that mix flexibility with control. Williamson’s 1991 formulation is especially important here because it formalizes markets, hybrids, and hierarchies as distinct organizational forms rather than treating everything not integrated as a market. [4]

Ostrom’s contribution answers a different but complementary question: how do communities sustain cooperation around shared resources without collapsing into either privatization or Leviathan? In her synthesis of long-enduring commons, she identified eight design principles: clearly defined boundaries; congruence between appropriation/provision rules and local conditions; collective-choice arrangements; monitoring; graduated sanctions; conflict-resolution mechanisms; minimal recognition of rights to organize; and nested enterprises for larger systems. She also argued, against one-size-fits-all solutions, that robust governance is often multilevel and polycentric. In her Nobel lecture essay, polycentric systems are defined as many formally independent centers of decision-making that can still operate as a coherent system through mutual adjustment, contracting, cooperation, and conflict resolution. [5]

The deepest payoff of combining these traditions is analytical. Transaction-cost economics tells us when work should move across boundaries and when new safeguards or integration are warranted. Commons and polycentric-governance theory tell us how shared informational resources, contributor communities, and rule systems can survive repeated use, opportunism, and scale. AI affects both at once: it changes the cost of performing transactions and the governance burden of maintaining shared knowledge resources. [6]

## Information goods and AI before the current wave

The pre-AI information-goods literature already supplied much of the necessary conceptual bridge. In The Wealth of Networks, Yochai Benkler argued that networked information technologies enlarge the domain of decentralized “social production,” making commons-based peer production more economically important rather than marginal. That argument matters for AI because code, data, models, benchmarks, evaluation sets, and documentation are all information goods whose production often occurs outside a single firm boundary, even when firms later try to appropriate value from them. [7]

Charlotte Hess and Elinor Ostrom then made the more institutionally precise move: knowledge should be analyzed not simply as a public good or private asset, but as a governed commons with different resource characteristics, different kinds of congestion, and different governance dilemmas depending on whether the scarce input is ideas, artifacts, infrastructure, access, attention, or curation. Their 2003 article explicitly proposed applying common-pool-resource insights to scholarly information and the “intellectual public domain,” and their 2007 volume framed knowledge as a shared resource embedded in a complex ecosystem rather than a frictionless stock. The later knowledge-commons literature generalized that insight into a reusable research framework for information, science, and culture. [8]

The most direct pre-GenAI bridge from Williamson to digital platforms is the 2020 research agenda by Frank Nagle, Robert Seamans, and Steven Tadelis. Their argument is that digitally mediated transactions do not make transaction-cost economics obsolete; they expose its boundary conditions. In particular, reputation mechanisms, private information, and nonpecuniary transactions become central features of digital organization. That is highly relevant to AI because training-data collection, model use, open-source contribution, and platform dependence all involve digitally mediated exchange where formal prices are only part of the governance problem. [9]

Taken together, this earlier literature implies that AI should not be modeled only as a labor-saving tool. It is also a reorganization technology for information goods: it changes who can contribute, who can extract value, which assets become specific, which transactions become monitorable, and how commons are defended against enclosure or underprovision. [10]

## Empirical applications after 2015

The direct theory-of-the-firm literature on AI has become more concrete, but it is still disproportionately conceptual. The 2020 “Artificially Intelligent Firm” paper argues that AI perforates firm boundaries, creates a new information asymmetry, introduces triangular agency relationships, and weakens traditional limits to integration. The 2021 formal paper on AI adoption and system-wide change shows that adoption is not just a task-level substitution story: because organizational tasks interact, modularity and coordination architecture shape where AI can be deployed. Firm-level asset-market evidence then sharpens the stakes: a 2023 paper on generative AI and firm values shows that market reactions depend not only on exposure to AI but also on whether exposed tasks are core or supplemental and on firms’ data assets. A 2024 corporate-governance analysis extends this boundary logic by emphasizing “perforation and blurring” through externally provided AI services, strategic access to critical third-party resources without ownership, and hybrid platform arrangements. A 2025 theory paper goes further and predicts “algorithmic governance” as a new form between markets and hierarchies, with movement first toward markets and then partial reintegration into hybrid forms. [11]

The commons side of the literature is newer but unusually direct. The Open Future AI_Commons work treated facial-recognition training datasets assembled from openly licensed photographs as a governance failure of the digital commons: open content made for sharing was repurposed into extractive training pipelines without adequate consent, reciprocity, or protection against harmful downstream uses. The subsequent 2024 white paper on commons-based dataset governance for AI explicitly argues that AI training datasets can be treated as a public good governed as a commons, with rules designed to generate public value while preventing capture by commercial actors. In parallel, the Open Source Initiative[12] has moved the open-source-AI discussion toward governance of data access itself: its 2025 white paper on data governance in open-source AI emphasizes responsible, systematic access, and its Open Source AI Definition 1.0 requires access not only to code and parameters but to the data information needed to study and modify the system. A related scientific literature on data commons shows why this move is institutionally plausible: data commons are defined as cloud-based data platforms with governance structures that allow communities to manage, analyze, and share data, and they are explicitly framed as mechanisms to accelerate AI and ML research while handling curation and access collectively. [13]

For open-source production, the most useful evidence comes from the GitHub[14] ecosystem and adjacent OSS studies. A 2024/2025 project-level study using proprietary Copilot usage data reports that Copilot increases open-source code contributions by 5.9 percent. Another 2024/2025 study argues that LLMs change the trajectory of open-source innovation by affecting the balance between capability innovation and iterative innovation. A 2026 Microsoft Research study of self-admitted generative-AI usage in open-source artifacts finds that developers now leave traces of AI use across commits, issues, and pull requests, and that usage spans a broad taxonomy of tasks. But the institutional downside is already visible in more theoretical work: the 2026 “Vibe Coding Kills Open Source” model argues that if AI lowers the cost of building on OSS while weakening the direct human engagement through which maintainers receive career, reputational, and sometimes monetary returns, entry, sharing, and quality may fall even as short-run productivity rises. [15]

The larger adjacent workplace literature fills in the mechanism layer. National Bureau of Economic Research[16] evidence from customer support shows that generative AI raised average productivity by about 14 percent, with much larger gains for less experienced workers, in part by diffusing high-performer practices. Nationally representative survey work shows rapid work adoption of generative AI, with 23 percent of employed respondents using it at work at least once in the previous week and 1 to 5 percent of total work hours already AI-assisted by late 2024. A large 2025 field experiment across 66 firms found narrower effects from individual-level access to an integrated AI tool—mainly less time on email and less after-hours work, but no broad shift in task composition from individual-level provision alone. Danish matched data similarly suggest rapid adoption and many new AI-related tasks without large earnings or hours effects yet. Corporate-governance evidence also shows AI changing monitoring: a 2025 quasi-natural experiment on Chinese manufacturers finds AI functioning as a corporate monitor by improving transparency and constraining managerial discretion. [17]

## Predicted organizational reordering under widespread AI adoption

A Williamsonian prediction is that activities migrate to AI when production becomes cheaper and governance remains manageable. That points toward tasks with low asset specificity, codified interfaces, modular handoffs, relatively standardized outputs, and cheap ex post verification: screening, search, summarization, drafting, translation, code scaffolding, documentation, routine customer interaction, and many first-pass monitoring and compliance functions. The adoption literature supports this reading. AI improves work most clearly where it transfers reusable “best practices,” where tasks are supplemental rather than identity-defining, and where system architecture allows local substitution without triggering heavy coordination failures. [18]

By contrast, the framework predicts slower or more partial substitution where verification costs are high, context is tacit and repository-specific, asset specificity is substantial, or the task is not just productive but constitutional—setting rules, allocating residual control, interpreting exceptions, adjudicating conflict, and conferring legitimacy. Ostrom’s design principles are especially relevant here: collective-choice arrangements, low-cost conflict resolution, and nested multilevel governance are not just “extra” functions; they are part of what keeps a system governable. The empirical pattern is consistent with that prediction. AI strongly helps novices in some settings, but experienced developers working on large, familiar open-source repositories were reported by METR in 2025 to be slower with AI tools, and current LLMs still struggle to reliably detect or volunteer security concerns in programming contexts. [19]

What dissolves under AI-driven cost reduction is therefore not “the firm” in general but specific institutions whose main function was to move information, assemble first drafts, or intermediate low-trust routine transactions. Some middle layers devoted to coordination-through-communication rather than coordination-through-judgment should weaken; some outsourcing markets for routine implementation should cheapen; and some transactional boundaries should blur as firms rely on externally provided AI services instead of internal production. But the same literature also points to forces of reintegration and concentration. Where complementary assets such as compute, proprietary data, distribution, regulatory capacity, or workflow embedding are decisive, AI can strengthen large incumbents rather than decentralize production. [20]

The likely new organizational forms are hybrids: partially marketized, partially integrated, and increasingly protocol-mediated. The most plausible candidates in the current literature are algorithmic-governance forms between market and hierarchy; firms with blurred boundaries due to external model, API, and platform dependence; governed data commons and licensing pools for training-data access; and polycentric AI regimes in which firms, communities, standards bodies, and regulators each govern different layers of the stack. The 2025–2026 “algorithmic boundary,” “human–AI collectives,” and “headless firm” papers push this logic furthest, though these remain early and should be treated as frontier theory rather than settled evidence. [21]

## Software engineering, code commons, and an underbuilt research agenda

For software engineering, the clearest current result is heterogeneity, not a single productivity number. In a controlled task experiment, developers with access to GitHub Copilot completed a JavaScript task 55.8 percent faster. In open-source collaboration, Copilot usage is associated with a 5.9 percent increase in project-level code contributions. Yet the METR 2025 study suggests that experienced developers on large repositories they know intimately may be slower with current AI coding tools, and the security literature finds that models still miss many vulnerabilities and can generate or normalize insecure patterns. The institutional implication is that software engineering is not simply becoming “automated coding.” It is separating into cheaper generation and more valuable specification, review, integration, evaluation, testing, security hardening, and governance. [22]

That points directly to the under-engaged institutional question in the software-firm literature: how AI coding agents change the transaction-cost structure inside the firm. The neglected variables are not just lines of code per hour, but search costs over repositories and dependencies; drafting costs for code and tests; monitoring costs over developers and agents; verification costs for outputs; handoff costs across teams; onboarding costs for juniors; and the cost of maintaining architectural coherence when much more code can be produced than carefully reviewed. The existing evidence already suggests that these margins move in different directions at once: generation costs fall, but review, security, provenance, and context-management costs often rise. [23]

Code should therefore be treated as a governed commons, not merely as a reusable input. The nonrival part is obvious: code can be copied at near-zero marginal cost. The rival part is easier to miss: maintainer attention, review bandwidth, issue triage, release management, trust, and long-term stewardship are scarce. The knowledge-commons framework already teaches that informational abundance can coexist with governance scarcity. The new OSS literature suggests AI intensifies that mismatch: AI systems can extract more value from repositories while reducing the direct user-maintainer interactions through which reciprocity, reputation, funding, and learning have traditionally been sustained. [24]

For a human-centered AI research agenda, the next institutional-economic questions are now fairly clear. First, where does asset specificity move when coding becomes agentic: from individual human skill to proprietary repository context, evaluation harnesses, embeddings, workflow instrumentation, and model-vendor relationships? Second, where are the new hold-up points: API dependence, rate limits, policy shifts, telemetry asymmetry, proprietary copilots, cloud credits, and locked-in orchestration layers? Third, what hybrids are emerging between software firm, model vendor, platform, and OSS community, and which contractual safeguards or partial integrations stabilize them? Fourth, how should open-source communities redesign licenses, norms, attribution rules, and funding mechanisms when AI-mediated use raises extraction while lowering reciprocal human attention? Fifth, which tasks of apprenticeship disappear, and what new professional ladders replace them when routine implementation is cheaper but review and governance are dearer? Sixth, when do data commons, model-openness requirements, and polycentric governance actually outperform bilateral licensing markets for AI training inputs? Those are not peripheral questions. They are the institutional core of how AI reorganizes work and knowledge production. [25]

The main limitation of the current literature is not absence of evidence, but mismatch between evidence and framework. We have many adoption and productivity studies, and we now have several direct papers on AI-driven firm-boundary change and dataset commons. What remains underbuilt is the middle layer that institutional economics is uniquely good at supplying: a systematic account of how AI changes governance costs, how those changes reallocate decision rights, and how shared code and data can remain productive without being strip-mined. That is precisely where future HAI work can make a distinctive contribution. [26]



[1] [3] [6] [18] Ronald H. Coase – Prize Lecture - NobelPrize.org

https://www.nobelprize.org/prizes/economic-sciences/1991/coase/lecture/

[2] [11] [16] The nature of the Artificially Intelligent Firm - An economic investigation into changes that AI brings to the firm - ScienceDirect

https://www.sciencedirect.com/science/article/pii/S030859612030046X?utm_source=chatgpt.com

[4] (PDF) The Analysis of Discrete Structural Alternatives

https://www.researchgate.net/publication/235356931_The_Analysis_of_Discrete_Structural_Alternatives?utm_source=chatgpt.com

[5] [12] [19] dlc.dlib.indiana.edu

https://dlc.dlib.indiana.edu/dlc/bitstreams/b741af75-4871-479e-8d68-e5ebba6d44ae/download

[7] [10] The Wealth of Networks

https://yalebooks.yale.edu/book/9780300127232/the-wealth-of-networks/?utm_source=chatgpt.com

[8] Ideas, Artifacts, and Facilities: Information as a Common-Pool Resource

https://dlc.dlib.indiana.edu/dlc/items/d9b815c0-e5dc-4561-b724-76e487789b14?utm_source=chatgpt.com

[9] [20] [26] Transaction Cost Economics in the Digital Economy: A Research Agenda by Frank Nagle, Robert Seamans, Steven Tadelis :: SSRN

https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3661856

[13] AI_Commons – Open Future

https://openfuture.eu/publication/ai-commons/?utm_source=chatgpt.com

[14] [21] The Algorithmic Boundary: How AI Transforms the Nature of the Firm  by Weining Zhang :: SSRN

https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5338650&utm_source=chatgpt.com

[15] The Impact of Generative AI on Collaborative Open-Source Software Development: Evidence from GitHub Copilot by Fangchen Song, Ashish Agarwal, Wen Wen :: SSRN

https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4856935&utm_source=chatgpt.com

[17] Generative AI at Work | NBER

https://www.nber.org/papers/w31161?utm_source=chatgpt.com

[22] The Impact of AI on Developer Productivity: Evidence from GitHub Copilot - Microsoft Research

https://www.microsoft.com/en-us/research/publication/the-impact-of-ai-on-developer-productivity-evidence-from-github-copilot/?utm_source=chatgpt.com

[23] AI Adoption and System-Wide Change | NBER

https://www.nber.org/papers/w28811?utm_source=chatgpt.com

[24] Understanding Knowledge as a Commons: From Theory to Practice on JSTOR

https://www.jstor.org/stable/j.ctt5hhdf6?utm_source=chatgpt.com

[25] Comparative Economic Organization: The Analysis of Discrete Structural Alternatives | The Mechanisms Of Governance | Oxford Academic

https://academic.oup.com/book/51832/chapter/420646325?utm_source=chatgpt.com



Below is a consolidated, verification-sensitive synthesis of the institutional-economics–meets-AI literature you’ve been building toward. I’ve structured it exactly as requested:



# 1) Comparison Table — Empirical & Quasi-Empirical Studies

(Post-2015; prioritized where institutional or transaction-cost implications are explicit or inferable. Items marked † = partial institutional framing; ‡ = indirect but structurally relevant.)



# 2) Synthesis Paragraph

Across this literature, a consistent institutional-economic pattern emerges: AI acts as a selective transaction-cost compressor, not a universal one. It dramatically lowers search, drafting, and coordination costs for low- to mid-specificity cognitive tasks, which pushes those activities toward market-like or tool-mediated production rather than firm-internal specialization. However, this compression is paired with a countervailing increase in governance costs—especially around validation, integration, attribution, and control. In transaction-cost terms (Oliver Williamson), AI shifts the locus of cost from ex ante production to ex post governance. At the same time, the evidence suggests a bifurcation in asset specificity: routine knowledge becomes less specific (more easily substituted by AI), while high-level integrative, judgment-heavy work becomes more specific and valuable. From an Ostromian perspective (Elinor Ostrom), AI transforms knowledge and code into a more fragile commons—expanding participation but increasing risks of overuse, enclosure, and degradation—thus making governance design (rules, monitoring, sanctions, boundary definition) more central, not less. The resulting organizational prediction is not firm collapse, but recomposition into hybrid governance forms: AI-augmented markets for routine cognition, paired with tighter hierarchical or community governance around integration, quality, and shared infrastructure.



# 3) Gap Statement — What a Credible 6–24 Month Panel Study Must Measure

The current literature is short-horizon, task-level, and weak on institutional measurement. A credible panel study (6–24 months) would need to move beyond productivity deltas and directly instrument transaction-cost structure and governance evolution.

### A. Core Measurement Domains (must include all)

#### 1. Transaction Costs (disaggregated)

Search costs: time to locate information / solutions 

Production costs: time to generate outputs 

Coordination costs: handoffs, dependencies, communication overhead 

Governance costs (critical gap): 

Review time per output 

Error detection + correction cycles 

Rework rates 

Audit / compliance overhead 

👉 Key requirement: measure pre- and post-AI adoption shifts in cost distribution, not just totals.



#### 2. Asset Specificity (Williamson)

Task-level specificity: 

% of work reusable across contexts 

reliance on firm-specific knowledge vs general knowledge 

Human capital differentiation: 

variance in output quality across workers 

wage / performance dispersion over time 

👉 Hypothesis to test: AI decreases specificity at low levels, increases it at high levels



#### 3. Governance Structures

Decision rights: 

who approves AI-generated outputs? 

Monitoring intensity: 

% of outputs reviewed 

Sanction mechanisms: 

rollback, rejection, accountability tracking 

Emergence of new roles: 

“AI reviewer,” “prompt engineer,” “model auditor” 

👉 This is where most current studies are blind.



#### 4. Boundary of the Firm

Make vs buy vs automate decisions: 

internal work vs outsourcing vs AI 

Contractor vs employee mix over time 

Platform dependency (e.g., reliance on external AI providers) 



#### 5. Commons Dynamics (Ostrom)

For code / knowledge environments:

Contribution rates (volume + diversity of contributors) 

Quality degradation or improvement over time 

Rule formation: 

contribution standards 

moderation practices 

Enclosure indicators: 

privatization of datasets or models 

API gating / access restrictions 



### B. Study Design Requirements

Panel structure: same teams / firms tracked over 6–24 months 

Multi-level: 

individual (developer, analyst) 

team (workflow) 

firm (governance + boundaries) 

Mixed methods: 

telemetry (logs, commits, task times) 

surveys (perceived coordination / trust / governance burden) 

ethnographic shadowing (to capture hidden coordination work) 

Treatment variation: 

staged AI rollout OR natural variation in adoption intensity 



### C. Critical Outcome Variables

Transaction-cost redistribution curve
(Where does time move, not just how much is saved?) 

Governance load index
(Review + correction + oversight as % of total effort) 

Skill stratification index
(Variance in output quality / compensation) 

Commons health index
(Contribution vs degradation vs enclosure) 

Organizational form shift 

Increased outsourcing? 

More platform dependence? 

Emergence of hybrid governance? 



### D. What This Study Would Resolve (Current Blind Spots)

Whether AI actually reduces total transaction costs or merely reallocates them 

Whether firms shrink, expand, or reorganize under AI 

Whether AI leads to commons flourishing or enclosure 

Whether software engineering becomes: 

more commoditized (market-like), or 

more governed (hierarchical / community-controlled) 



## Bottom Line

The existing evidence strongly suggests that AI is not simply “automation,” but a restructuring force on institutional economics itself:

It erodes some transaction costs (search, drafting) 

It amplifies others (governance, verification) 

It reshapes asset specificity 

It destabilizes and reconstitutes commons 

But we do not yet have longitudinal evidence that captures these shifts as a system. That’s the missing piece—and the opportunity for a definitive study.


