# Organizational and Sociotechnical Embedding of AI Coding Agents

> **Provenance:** secondary literature review, generated 2026-05-01 to 2026-05-02 via deep-research synthesis. See `methodology.md` §1.1 for the discipline. Original `.docx` archived at `sources/_originals/Organizational and Sociotechnical Embedding of AI Coding Agents.docx`.

---

# Organizational and Sociotechnical Embedding of AI Coding Agents

## Scope of the evidence

The post-2022 literature on AI coding agents in real software work is now substantial enough to show recurring patterns, but it is still methodologically uneven. The strongest evidence comes from developer surveys, enterprise case studies, open-source repository mining, and a small number of mixed-method studies inside firms. What is still notably scarce is exactly what the prompt flags as most needed: long-duration organizational studies, comparative firm studies, and embedded ethnographies that follow teams as adoption matures rather than capturing a single moment of enthusiasm or anxiety. [1]

Across these studies, AI coding agents are not simply “productivity tools.” They are reorganizing software work along at least four dimensions at once: the micro-practices of writing and understanding code; the team-level allocation of reviewing, debugging, and scoping work; the organizational politics of policy, compliance, and infrastructure; and the professional politics of identity, authorship, and expertise. The literature is strongest on the first two and much thinner on the latter two. [2]

One reference in particular needs careful verification because it is already being summarized loosely in secondary discussion: the Gao et al. open-source PR study. In the accessible MSR 2026 preprint, the authors report that 79.0% of merged Human+AI PRs received no external reviews or comments, while 10.7% of analyzed guideline artifacts and 13.1% of repositories mentioned AI usage. The commonly repeated shorthand “80% merged without review” is a fair approximation of the first number, but “10.7% of repos” is not quite right: that figure is artifact-level, not repository-level. [3]

## Layered map

## Major studies compared

## How work is being reorganized

The most consistent finding across studies is that AI coding agents do not simply substitute for coders; they shift labor toward problem framing, context provision, verification, repair, and review. In the IBM case, understanding code was more prominent than generating it. In the German study, code generation was the most common task, but the authors argue that the real bottleneck has moved to validation and architectural reasoning. The result is not “full automation,” but a redistribution of effort toward oversight and contextual judgment. [21]

That redistribution is socially uneven. Juniors and seniors do not appear to benefit in the same way. The Schmitt study shows that GenAI triggers different identity work depending on domain experience, while the German study describes an “Experience Paradox” in which expertise shapes both how tools are used and how valuable they feel. This matters organizationally because firms are not just changing workflows; they may also be changing apprenticeship, mentorship, and pathways for skill formation. [22]

Code review is the clearest site where sociotechnical change becomes visible. The Dorner study suggests that practitioners do not expect review to disappear. Instead, they expect more AI pre-review, more reviewed artifact types, and stable or greater review time, with humans concentrating on architecture and higher-level concerns. The Gao open-source study is the sharper warning signal: in actual OSS practice, Human+AI PRs already receive dramatically lighter scrutiny than comparable human-only PRs, especially when the contributor has no prior ownership. In other words, the normative future of “AI filters first, humans judge what matters” is not yet matched by robust human review in the wild. [23]

The open-source evidence also suggests a split between acceptance and governance. The Watanabe study shows that agent-authored PRs are often accepted, especially for bounded maintenance work such as tests, docs, and refactoring. The Gao study shows that review and documentation practices have not caught up: artifacts with AI guidance are rare, and review on Human+AI PRs is often thin. Together, these studies suggest that many communities are operationally incorporating AI faster than they are governing it. [24]

Inside firms, governance is appearing less as a mature, standardized framework than as a patchwork of compliance constraints, local rules, and responsibility allocations. In the IBM study, respondents treated copyright contamination and authorship as shared responsibility problems between developer and tool. In the German study, regulatory pressures around proprietary code, cloud processing, GDPR, and the EU AI Act shape tool choice and even whether public tools can be used at all. The AI-first-policy study suggests another governance mode entirely: executive pressure to adopt, combined with uncertainty about employment consequences. That is a very different governance logic from slow compliance review, but it is part of the same organizational embedding story. [25]

## Professional identity and authority

The professional question running through this literature is not only “Will AI deskill developers?” but “What counts as expertise once code production is partially delegated?” The current evidence points to a shift from authority based on direct authorship toward authority based on review, contextualization, and accountability. The IBM study found that developers often located authorship differently depending on whether they rewrote, pasted, or merely implemented AI-suggested ideas, while still regarding risk mitigation as a shared responsibility. That is a strong sign that professional authority is being reassembled rather than erased. [26]

At the same time, deskilling anxiety is real and explicit in the data. The German study records worries that continuous AI use could erode basic understanding of how code works; the IBM study reports participants who worried AI would make people “lazy” or blur occupational boundaries; and the Schmitt study argues that these changes are experienced as identity work conditioned by seniority. These concerns are not marginal “ethics talk.” They are reports from practicing engineers about competence, autonomy, and peer recognition. [27]

A second professional issue is epistemic authority inside teams: who gets trusted, and on what basis, when the code is AI-assisted? The open-source PR evidence suggests that AI-associated contributions can be merged with surprisingly little visible review. The Dorner study warns that the unresolved tensions here are understanding, accountability, and trust. Read together, these studies imply that authority may drift upward toward reviewers and maintainers, but only if organizations actually preserve review capacity. If they do not, the result is not stronger human judgment; it is weaker scrutiny with blurred accountability. [28]

The field is beginning to name these changes, but it is not yet analyzing them with enough role granularity. A CHASE 2026 position paper argues that developers and testers may undergo different forms of identity work under GenAI and that tensions between roles deserve direct study rather than being compressed into a generic “developer” category. That agenda is convincing precisely because the empirical literature already shows that experience and role matter, while rarely following those differences deeply. [29]

## Gap statement

The biggest gap is the absence of longitudinal organizational research. Nearly all of the strongest studies are cross-sectional surveys, pilot case studies, or repository analyses. They tell us a lot about early adoption and a fair amount about current practice, but very little about stabilization: whether verification burden declines or compounds, whether juniors actually become less skilled over time, whether review cultures harden or erode, and whether internal policies become routinized or remain symbolic. The literature itself repeatedly gestures toward these unknowns. [30]

The second major gap is comparative firm research across regulatory environments. The German study is unusually valuable because it explicitly anchors adoption in GDPR and the EU AI Act, but it is one national case. The field still does not have a strong comparative design that follows similar firms across, for example, U.S., EU, and other regulatory contexts to see how governance, infrastructure, and acceptable uses actually diverge. Right now, claims about regulatory effects are plausible and increasingly important, but empirically thin. [31]

The third gap is managerial and policy process tracing. We have signals that policies matter: open-source guidance is rare and often reactive; AI-first corporate policies create pressure; enterprise deployments raise questions of IP, authorship, and responsibility. But the literature has not yet mapped how policies are written, enforced, audited, contested, or revised over time, nor how those processes interact with security, procurement, legal review, and developer-experience teams. In other words, there is much more evidence of policy existence and policy effects than of policy process. [32]

The fourth gap is role-stratified learning and authority research. The current evidence strongly suggests that seniority and role mediate benefits and harms, but we still know little about how AI adoption reshapes onboarding, mentorship, code ownership, promotion criteria, or tester-developer relations. That gap matters because organizational embedding is not only about tool deployment; it is also about the reproduction of the profession. [33]

The fifth gap is outcome quality beyond self-reports and merge rates. High merge rates for agentic PRs and positive productivity perceptions tell us something important, but they do not resolve long-run maintainability, review debt, latent defects, or architectural drift. The existing literature is beginning to recognize this, especially where it points to verification burden, context loss, and future maintenance pain, but robust downstream quality studies are still sparse. [34]

Taken together, the literature supports a clear bottom line. AI coding agents are already embedded in software work as sociotechnical participants, not just standalone tools. At the individual level they accelerate and assist; at the team level they reallocate effort toward scoping and review; at the organizational level they are filtered through infrastructure, compliance, and policy; at the professional level they unsettle identity, authorship, and authority; and at the ecosystem level they are diffusing faster than governance is maturing. What is missing is not evidence that change is happening. What is missing is durable, comparative, organizational evidence about how that change settles into institutions. [35]



[1] [6] [11] [17] A Large-Scale Survey on the Usability of AI Programming Assistants: Successes and Challenges

https://arxiv.org/abs/2303.17125?utm_source=chatgpt.com

[2] [7] [21] [25] [26] [35] Examining the Use and Impact of an AI Code Assistant on Developer Productivity and Experience in the Enterprise

https://arxiv.org/pdf/2412.06603

[3] [10] [15] [28] [32] On Autopilot? An Empirical Study of Human–AI Teaming and Review Practices in Open Source

https://arxiv.org/html/2601.13754v1

[4] [19] [24] [34] On the Use of Agentic Coding: An Empirical Study of Pull Requests on GitHub

https://arxiv.org/abs/2509.14745?utm_source=chatgpt.com

[5] [14] [23] Quo Vadis, Code Review? Exploring the Future of Code Review

https://arxiv.org/pdf/2508.06879

[8] [18] [27] [31] Adoption of Generative Artificial Intelligence in the German Software Engineering Industry: An Empirical Study

https://arxiv.org/pdf/2601.16700

[9] [16] [22] [33] AIS Electronic Library (AISeL) - ICIS 2025 Proceedings: Tensions of Occupational Identity and Patterns of Identity Protection: Preliminary Insights on Generative AI in the Software Engineering Domain

https://aisel.aisnet.org/icis2025/impl_adopt/impl_adopt/9/

[12] [30] arxiv.org

https://arxiv.org/pdf/2406.00560

[13] [2412.06603] Examining the Use and Impact of an AI Code Assistant on Developer Productivity and Experience in the Enterprise

https://arxiv.org/abs/2412.06603

[20] Everyday Practitioner Experiences of AI-First Policies ...

https://dl.acm.org/doi/full/10.1145/3772318.3791271?utm_source=chatgpt.com

[29] Role and Identity Work of Software Engineering Professionals in the Generative AI Era

https://arxiv.org/pdf/2602.18190



## Comparison table (post-2022 empirical studies)



## Synthesis (what the evidence actually converges on)

Across these studies, the consistent pattern is not “automation of coding,” but reallocation of cognitive and organizational labor. AI agents compress the cost of producing candidate code, which shifts the bottleneck toward verification, integration, and accountability. At the individual level, developers increasingly use AI for comprehension, recall, and scaffolding—not just generation. At the team level, division of labor reorganizes around who frames problems and who validates outputs, rather than who writes code. At the ecosystem level, open-source evidence shows adoption outrunning governance: AI-generated contributions are accepted quickly and often with reduced scrutiny. At the professional level, identity and authority are being renegotiated—expertise is moving away from authorship toward judgment, review, and contextual understanding, but without stable institutional supports yet in place.

The most important tension is this: the system assumes stronger human oversight just as actual oversight becomes thinner or more strained. That mismatch—visible in the Gao PR results and the code-review literature—is the central sociotechnical risk emerging from current evidence.



## Gap statement: what a credible 6–24 month panel study must measure

A serious longitudinal (panel) study would need to move beyond cross-sectional perception and repository snapshots. At minimum, it should include:

### 1. Multi-level panel structure

Units tracked simultaneously: 

Individual developers (skill, usage patterns, cognition) 

Teams (workflow, division of labor, review practices) 

Organizations (policy, infrastructure, governance) 

Repeated measures at monthly or quarterly intervals over 6–24 months. 

### 2. Behavioral (not just self-report) instrumentation

IDE telemetry: prompt frequency, acceptance rates, edit distance from AI outputs 

Version control traces: PR size, review depth, review latency, merge outcomes 

Task-level timing: production vs. verification time allocation 

Code quality proxies: defect rates, rollback frequency, maintainability metrics 

### 3. Verification and review load

Direct measurement of: 

Time spent verifying AI outputs 

Number of review iterations per PR 

“silent acceptance” rates (no-comment merges) 

Critical: track whether verification burden declines (learning) or accumulates (fatigue/erosion) over time. 

### 4. Skill formation and deskilling dynamics

Longitudinal skill assessments: 

Debugging ability without AI 

Architectural reasoning tasks 

Cohort comparison: 

Juniors vs. seniors 

New hires vs. pre-AI baseline employees 

Measure apprenticeship disruption (e.g., fewer opportunities to struggle and learn). 

### 5. Identity and authority restructuring

Repeated surveys + qualitative interviews capturing: 

Perceived authorship (“who wrote this code?”) 

Trust in peers vs. AI outputs 

Promotion and evaluation criteria shifts 

Network analysis: 

Who approves code over time 

Whether authority concentrates (e.g., senior reviewers) 

### 6. Governance and policy evolution (process tracing)

Track: 

Introduction of AI policies 

Enforcement mechanisms (CI rules, review gates, audit logs) 

Violations and exceptions 

Compare policy intent vs. actual practice over time. 

### 7. Cross-regulatory comparison

Parallel panels in at least: 

U.S. firms 

EU firms (under European Union AI Act / GDPR constraints) 

Measure: 

Tool choice differences 

Data governance constraints 

Impact on workflow and productivity 

### 8. Long-horizon outcome quality

Not just merge rates: 

Post-merge defect rates 

Incident frequency 

Refactoring churn 

Evaluate whether AI-assisted code produces latent maintenance debt. 



## Bottom line

A credible panel study must treat AI coding agents as embedded sociotechnical actors, not just tools. That means measuring not only productivity, but verification load, learning trajectories, authority structures, and governance processes over time. Right now, the field has strong signals about early disruption—but almost no evidence about stabilization, which is exactly where the real organizational consequences will show up.


