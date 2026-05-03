# Feminist Epistemology, Standpoint Theory, and AI Knowledge Production

> **Provenance:** secondary literature review, generated 2026-05-01 to 2026-05-02 via deep-research synthesis. See `methodology.md` §1.1 for the discipline. Original `.docx` archived at `sources/_originals/Feminist Epistemology, Standpoint Theory, and AI Knowledge Production.docx`.

---

# Feminist Epistemology, Standpoint Theory, and AI Knowledge Production

## Scope and framing

This report scans the post-2015 literature that explicitly or substantively carries feminist epistemology and standpoint theory into AI critique, fairness research, and human-centered AI methodology, while anchoring that scan in primary foundational texts by Donna Haraway[1], Sandra Harding[2], Patricia Hill Collins[3], Lorraine Code[4], and Miranda Fricker[5]. Across that tradition, the key through-line is not a rejection of objectivity as such, but a reconstruction of objectivity as socially located, historically accountable, and improved through critical scrutiny from marginalized standpoints rather than through claims to neutrality from nowhere. Haraway’s argument against the “god trick,” Harding’s “strong objectivity,” Collins’s standpoint criteria, Code’s epistemic responsibility, and Fricker’s account of testimonial and hermeneutical injustice together form a coherent challenge to any AI knowledge practice that treats datasets, labels, benchmarks, and model outputs as self-justifying or context-free. [6]

The contemporary AI literature does not absorb this tradition evenly. In its strongest form, it changes the unit of analysis from the model to the sociotechnical system, changes the authorized knower from the technical expert to a plural and contestable set of situated stakeholders, and changes evaluation from abstract metric optimization to context-specific inquiry into harms, exclusions, and interpretive limits. In its weakest form, it name-checks “context,” “participation,” or “plural perspectives” while leaving problem framing, benchmark design, and success criteria under the control of the same technical actors and organizational incentives. That distinction is visible across recent work on fairness, documentation, participatory AI, and responsible-AI evaluation. [7]

## Tradition map

The clearest bridge from this tradition into contemporary AI critique comes from Safiya Umoja Noble[18] and Algorithms of Oppression[19], Ruha Benjamin[20] and Race After Technology[21], Catherine D'Ignazio[22] and Lauren Klein[23] with Data Feminism[24], Kate Crawford[25] with Atlas of AI[26], and Abeba Birhane[27]. These works do not merely argue that AI is biased. They ask who gets to define valid knowledge, which classificatory systems become authoritative, how objectivity is rhetorically claimed, and what material, racial, colonial, and labor relations make AI knowledge possible in the first place. [28]

## Empirical application inventory

Search ranking and public knowledge. In Algorithms of Oppression, Noble shows that searches on Google[29] for “black girls” returned pornographic and degrading results, arguing that the issue is structural rather than accidental: algorithms presented as neutral information tools are shaped by commercial imperatives, racist and sexist histories, and proprietary classification practices. This is a paradigmatic standpoint critique because it starts from the lived experience of those misrepresented and asks whose knowledge counts as credible public information. [30]

Race, automation, and objective-looking domination. Benjamin’s “New Jim Code” names technologies that reproduce existing inequities while being marketed as more objective or progressive than older discriminatory systems. Her chapter excerpt explicitly argues that the desire for objectivity, efficiency, profitability, and progress fuels technical fixes that hide and deepen discrimination, and that these systems are sold as morally superior because they purport to rise above human bias even though they depend on historical data produced through exclusion. [31]

Intersectional benchmarking. Joy Buolamwini[32] and Timnit Gebru[33]’s Gender Shades is one of the most important empirical translations of standpoint insights into AI evaluation design. Rather than accepting aggregate accuracy, it introduces an intersectional benchmark and shows that commercial gender-classification systems perform worst on darker-skinned women, with error rates up to 34.7%, while lighter-skinned men have much lower error. This is not only an empirical fairness finding; it is a proof that who is made visible in the benchmark determines what the system can “know” about its own performance. [34]

Documentation as epistemic accountability. Datasheets for Datasets and Model Cards translate epistemic responsibility into concrete AI method. Datasheets require creators to disclose motivation, composition, collection process, uses, labor, risks, and affected stakeholders; model cards require intended-use disclosure and evaluation across relevant cultural, demographic, phenotypic, and intersectional groups. These artifacts do not fully solve standpoint problems, but they materially shift questions of provenance, context, and responsibility into the evaluative core of AI development. [35]

Ethical data curation. Susan Leavy and coauthors explicitly ground AI data curation in feminist epistemology and critical race theory, arguing that curators should examine perspectives in data, analyze the theory embedded in representation choices, and interrogate sampling, feature selection, and annotation as power-laden acts. This is one of the clearest direct methodological bridges from feminist epistemology into AI pipeline design. [36]

Fairness as a sociotechnical, not purely model-level, property. Fairness and Abstraction in Sociotechnical Systems is not framed as feminist epistemology, but it is deeply compatible with Harding and Haraway: it argues that treating fairness as a property of the model alone is an “abstraction error,” because fairness and justice are properties of social and legal systems rather than isolated technical tools. Its “framing,” “portability,” “formalism,” “ripple effect,” and “solutionism” traps have become central for standpoint-informed critiques of AI fairness research. [37]

Fairness practice inside organizations. Madaio and coauthors studied 33 AI practitioners and found that disaggregated evaluation work is constrained by difficulty choosing appropriate groups and metrics, lack of engagement with direct stakeholders or domain experts, business imperatives that prioritize customers over marginalized groups, and pressure to deploy at scale. This is exactly the kind of gap a standpoint lens predicts: even when teams adopt fairness tools, dominant institutional standpoints still govern what is measurable and worth acting on. [38]

Value pluralism, not ethical consensus. Jakesch and coauthors surveyed a US-representative sample, crowdworkers, and AI practitioners and found that different groups prioritize responsible-AI values differently; practitioners rated values less important on average than other groups and prioritized fairness differently from the public, while demographic background also shaped priorities. For standpoint-informed HAI, this matters because it shows that “AI values” are not stable developer-side constants; they are socially situated and contested. [39]

Participatory AI under scrutiny. Delgado and coauthors analyze the “participatory turn” in AI design and stress that it is often unclear whether participation grants substantive agency to affected stakeholders. Their framework is valuable precisely because it refuses to treat any consultative workshop as evidence of democratic legitimacy. [40]

XAI and knowledge-enhanced LMs as epistemic sites. Several recent papers make the feminist-epistemology bridge explicit. Hancox-Li and Kumar argue that feature-importance methods embed epistemic values and should attend to social context and subjugated knowers; Huang and Hung argue that technical XAI is insufficient because relevant interpretive resources require active involvement of diverse stakeholders; Kraft and Soulier argue that knowledge-enhanced language models are often assumed to increase trustworthiness and objectivity, even though they inherit biased “knowledge” and risk perpetuating epistemic injustice. [41]

Meta-critique of AI ethics itself. Birhane and coauthors’ The Forgotten Margins of AI Ethics reviews FAccT and AIES literature and concludes that attention to concrete use cases, lived experience, and historically marginalized groups remains shallow in much of the field. Widder’s work on epistemic power in AI ethics labor extends that diagnosis by arguing that the “view from nowhere” and the epistemic supremacy of quantification still structure what counts as legitimate AI knowledge work. [42]

## Where the tradition transforms HAI and where it is only cited

The tradition genuinely transforms HAI methodology when it changes the object of evaluation, the authorized evaluator, and the criteria of success. The object of evaluation changes from the model to the sociotechnical arrangement in which the model operates; the authorized evaluator changes from the internal engineer to a structured plurality of affected groups, domain experts, and outgroup critics; and the criteria of success change from usability, trust, or aggregate accuracy to context-specific accounts of harm, exclusion, contestability, and differential burden. That is the common trajectory linking Gender Shades, datasheets, model cards, sociotechnical fairness, practitioner studies of fairness work, public-value elicitation, and integrated-XAI arguments. [43]

By contrast, the tradition is mostly name-checked when “context” is invoked without changing the frame of analysis, when “participation” is organized without substantive stakeholder agency, when “fairness” remains a post-hoc disparity check detached from institutional history, or when “responsible AI” tools are evaluated mainly for usability rather than whether they actually redistribute epistemic and organizational power. Berman and coauthors show that most responsible-AI tool evaluations focus on usability while sidelining whether the tools change development practice; Delgado and coauthors show that participatory AI often struggles to confer substantive agency; Madaio and coauthors show that fairness work is still constrained by business priorities and weak stakeholder engagement; and Birhane’s review shows that much AI ethics work remains shallow in its treatment of lived experience and marginalized groups. [44]

My synthesis is that standpoint theory has been substantively integrated into HAI only when it becomes methodological, not adjectival. If a paper cites Haraway or Collins but leaves the benchmark fixed, the label ontology untouched, the relevant stakeholder set predefined by developers, and the final success criterion reducible to technical performance plus a few disaggregated bars, then the tradition has decorative rather than transformative force. The recent literature provides repeated evidence for this judgment, even where the vocabulary used is “participation,” “sociotechnical,” or “responsible.” [45]

## Research-program statement for a standpoint-informed HAI

A standpoint-informed HAI program would begin from the premise that AI systems do not merely serve users; they participate in producing social knowledge about people, categories, risks, abilities, and futures. For that reason, HAI cannot be limited to optimizing interaction quality between a generic human and a model. Its central question becomes: whose standpoint organized the system, whose experiences were needed to make it work, whose interpretations were excluded, and who is answerable when the system stabilizes one version of reality over others? That reframing follows directly from Haraway, Harding, Collins, Code, and Fricker, and is reinforced by contemporary AI critiques from Noble, Benjamin, D’Ignazio and Klein, Crawford, Birhane, and recent FAccT work. [46]

### Design

In design, standpoint-informed HAI would start problem formulation from communities likely to bear misclassification, surveillance, denial, or interpretive erasure, rather than from the optimization possibilities of available data. It would document why a task should be automated at all, what social relations the system presupposes, who can refuse participation, and how input from directly affected groups changes categories, labels, and deployment scope. Participation would be treated as governance and co-definition, not merely feedback collection. Data curation would make visible provenance, labor, consent, missing contexts, and the theories already encoded in labels and ontologies. [47]

### Measurement

In measurement, standpoint-informed HAI would reject single aggregate metrics as sufficient evidence of quality. It would require intersectional evaluation, scenario-specific harm models, and public reporting of uncertainty, non-portability, and disagreement. It would measure not only error rates but also whose values defined the objective, which groups were absent from the benchmark, whether deployed use matches intended use, whether communities prioritized different values than developers did, and whether the system’s surrounding institution changes outcomes in ways the artifact-level evaluation missed. In other words, it would treat sociotechnical validity as the primary object of measurement, with model-level metrics nested inside it. [48]

### Interpretation

In interpretation, standpoint-informed HAI would treat system outputs as situated claims rather than neutral discoveries. Explanations would be evaluated not only for technical faithfulness but for whether they furnish the interpretive resources different stakeholders need to contest decisions, identify structural bias, and understand the conditions under which the system should not be trusted. This implies moving from expert-only XAI toward integrated social-epistemic explanation, where affected stakeholders and domain experts participate in interpreting what an explanation means and whether it repairs or compounds epistemic injustice. [49]

Put compactly, a standpoint-informed HAI program differs from current mainstream HAI in three decisive ways. In design, it centers historically situated communities rather than abstract users; in measurement, it treats values and harms as plural, contested, and institutionally mediated rather than as developer-chosen constants; in interpretation, it frames AI outputs as accountable but partial knowledge, always open to challenge from those for whom the system sees badly. That is the methodological meaning of “situated, partial, accountable” knowledge in HAI. [50]

## Open questions and limitations

Two limitations remain important. First, the strongest methodological translations of feminist epistemology into AI still cluster around fairness, documentation, participation, and critique; there is less mature work showing how to operationalize standpoint-informed evaluation for everyday HAI topics like trust calibration, preference learning, adaptive interfaces, or multi-turn generative interaction. Second, several foundational book-length works were verifiable on the open web mainly through primary introductions, excerpts, and publisher-accessible materials rather than unrestricted full-text chapters. The conceptual through-lines are clear, but some chapter-level nuances of the books are therefore better treated as strongly supported rather than exhaustively reconstructed here. [51]

A final unresolved issue is one that the foundational tradition itself already names: how to treat marginalized standpoints as epistemically indispensable without romanticizing them as innocent or sovereign. Haraway explicitly warns against romanticizing “vision from below,” and current participatory-AI scholarship shows how easily institutions can instrumentalize community knowledge without redistributing power. A mature standpoint-informed HAI program therefore needs both stronger participation and stronger critique of participation itself. [52]



[1] [38] https://arxiv.org/abs/2112.05675

https://arxiv.org/abs/2112.05675

[2] [13] [22] [27] [34] [43] [48] https://proceedings.mlr.press/v81/buolamwini18a/buolamwini18a.pdf

https://proceedings.mlr.press/v81/buolamwini18a/buolamwini18a.pdf

[3] [36] [47] https://www.aies-conference.com/2021/wp-content/posters/171_%20Ethical%20Data%20Curation%20for%20AI_%20An%20Approach%20based%20on%20Feminist%20Epistemology%20and%20Critical%20Theories%20of%20Race.pdf

https://www.aies-conference.com/2021/wp-content/posters/171_%20Ethical%20Data%20Curation%20for%20AI_%20An%20Approach%20based%20on%20Feminist%20Epistemology%20and%20Critical%20Theories%20of%20Race.pdf

[4] [6] [8] [24] [25] [46] [50] [51] [52] https://sidoli.w.waseda.jp/Haraway_1988_Situated_Knowledges_The_Science_Question_in_Feminism.pdf

https://sidoli.w.waseda.jp/Haraway_1988_Situated_Knowledges_The_Science_Question_in_Feminism.pdf

[5] [7] [11] [37] [45] Fairness and Abstraction in Sociotechnical Systems

https://sorelle.friedler.net/papers/sts_fat2019.pdf

[9] [17] [19] https://facctconference.org/static/papers24/facct24-96.pdf

https://facctconference.org/static/papers24/facct24-96.pdf

[10] [26] [32] https://thehangedman.com/teaching-files/svd-phd/2-gender/harding.pdf

https://thehangedman.com/teaching-files/svd-phd/2-gender/harding.pdf

[12] https://people.duke.edu/~jmoody77/FacFav/CollinsBFT.pdf

https://people.duke.edu/~jmoody77/FacFav/CollinsBFT.pdf

[14] [18] https://www.degruyterbrill.com/document/doi/10.1515/9781438480510/html?srsltid=AfmBOorxWpMowWrOj6NZQ64O_ev48XhHbE1PX4C8SGZYqRB1pox49Nsv

https://www.degruyterbrill.com/document/doi/10.1515/9781438480510/html?srsltid=AfmBOorxWpMowWrOj6NZQ64O_ev48XhHbE1PX4C8SGZYqRB1pox49Nsv

[15] [35] Datasheets for Datasets

https://arxiv.org/pdf/1803.09010

[16] [20] https://www.mirandafricker.com/uploads/1/3/6/2/136236203/introduction.pdf

https://www.mirandafricker.com/uploads/1/3/6/2/136236203/introduction.pdf

[21] [31] https://courses.complex-systems-laboratory.org/system/files/Race%20After%20Technology%20-%20Ruha%20BenjaminChapter1_0.pdf

https://courses.complex-systems-laboratory.org/system/files/Race%20After%20Technology%20-%20Ruha%20BenjaminChapter1_0.pdf

[23] [29] [39] https://facctconference.org/static/pdfs_2022/facct22-3533097.pdf

https://facctconference.org/static/pdfs_2022/facct22-3533097.pdf

[28] [30] https://safiyaunoble.com/wp-content/uploads/2020/09/Algorithms_Oppression_Introduction_Intro.pdf

https://safiyaunoble.com/wp-content/uploads/2020/09/Algorithms_Oppression_Introduction_Intro.pdf

[33] [42] https://facctconference.org/static/pdfs_2022/facct22-3533157.pdf

https://facctconference.org/static/pdfs_2022/facct22-3533157.pdf

[40] https://arxiv.org/abs/2310.00907

https://arxiv.org/abs/2310.00907

[41] https://arxiv.org/pdf/2101.12737

https://arxiv.org/pdf/2101.12737

[44] https://arxiv.org/abs/2401.17486

https://arxiv.org/abs/2401.17486

[49] https://philarchive.org/archive/HUAAAB-3

https://philarchive.org/archive/HUAAAB-3



Below is a structured extraction of the empirical studies and quasi-empirical programs referenced in the deep research output, followed by a synthesis and a forward-looking panel-study design.



# 1) Comparison Table: Empirical & Applied Studies



# 2) Synthesis (What This Body of Evidence Actually Shows)

Across these studies, a consistent pattern emerges:

1. Measurement determines reality.
The Gender Shades result is not just about bias—it demonstrates that what is measured defines what the system can know about itself. This is the most concrete empirical realization of Donna Haraway’s “situated knowledge.”

2. “Objectivity” is systematically mis-specified.
Work like Race After Technology and Fairness and Abstraction in Sociotechnical Systems shows that AI systems are repeatedly treated as neutral evaluators, when in practice they are embedded in institutional, economic, and historical structures.

3. Tooling improvements ≠ epistemic transformation.
Datasheets, model cards, and fairness metrics introduce accountability—but studies like How Fairness Metrics Are Used in Practice show that organizational constraints override methodological ideals. The epistemology doesn’t change unless power changes.

4. Participation is unstable and often superficial.
Participatory AI: Framework and Critique demonstrates that “including perspectives” often fails to grant decision authority or epistemic legitimacy.

5. There is no stable “ground truth” of values.
Value Pluralism in AI Ethics shows empirically that stakeholders disagree—meaning fairness cannot be reduced to a single optimization function.

6. Even AI ethics research reproduces exclusion.
Meta-analyses like The Forgotten Margins of AI Ethics show that the field itself fails to incorporate marginalized standpoints—confirming the core prediction of standpoint theory.



### Bottom line

The empirical literature does not show that AI is biased in isolated ways.
It shows something deeper:

AI systems systematically stabilize dominant standpoints as objective knowledge, unless their design, measurement, and governance are explicitly restructured.



# 3) Gap Statement: What a Credible 6–24 Month Panel Study Must Measure

Current work is overwhelmingly cross-sectional, audit-based, or qualitative snapshots.

A credible longitudinal (6–24 month) panel study would need to move beyond that in three ways:



## A. Core Design Requirements

1. Multi-level panel (not just users)

Individual users (diverse standpoints) 

Developers / product teams 

Organizational context 

System outputs over time 

2. Repeated exposure to the same system

Track evolving interaction with a stable AI tool (e.g., coding assistant, decision system, LLM) 

3. Embedded interventions

Introduce changes (documentation, participatory input, metric shifts) 

Observe downstream epistemic effects 



## B. What Must Be Measured (New Variables Missing Today)

### 1. Epistemic Positioning (central gap)

Who is treated as a credible knower? 

Whose input changes system behavior? 

Perceived authority of system vs. user vs. institution 

### 2. Interpretive Capacity (Fricker-style)

Do users gain or lose ability to interpret system outputs? 

Are new “interpretive resources” created—or erased? 

### 3. Attention and Framing

What users notice vs. ignore in AI outputs 

Whether AI shifts problem framing over time 

### 4. Longitudinal Error Perception

Not just actual errors, but: 

Which errors are noticed 

Which are ignored 

Which are normalized 

### 5. Value Drift

Do user values converge toward system defaults? 

Do developers’ priorities shift under deployment pressure? 

### 6. Institutional Mediation

How org incentives reshape: 

fairness decisions 

stakeholder inclusion 

evaluation criteria 



## C. Required Outcome Metrics

A standpoint-informed panel study would NOT stop at accuracy or bias.

It would track:

Epistemic inequality over time 

Whose knowledge becomes authoritative 

Interpretive loss/gain 

Ability to challenge system outputs 

Representation drift 

Which groups become less visible in outputs 

Decision displacement 

When human judgment is replaced vs. reshaped 

Trust calibration (longitudinal) 

Not “trust level,” but who defers to whom 



## D. Minimal Viable Study Structure

Duration: 6–24 months 

Sample size: 

200–500 users (stratified by standpoint) 

20–50 developers/org stakeholders 

Data collection: 

Interaction logs 

periodic surveys 

ethnographic interviews 

system output snapshots 

Design: 

Mixed-method longitudinal panel 

With intervention arms (documentation, participatory input, metric changes) 



# Final Insight

What’s missing is not another bias audit.

It’s this:

A longitudinal account of how AI systems reconfigure who gets to know, interpret, and decide over time.

That is the empirical program required to actually test feminist epistemology in HAI—not just cite it.


