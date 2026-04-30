---
title: "Aesthetic Desire, the Figurative Body, and Adaptive Recommendation: A Literature Review for the Vela Research Program"
status: Reconciled — ASN-596 complete, 2026-04-24
date: 2026-04-24
source: Reconciled from two independent parallel literature-map drafts (ASN-575, 2026-04-24) plus subsequent browser-lane expansion. DOIs verified against publisher pages during ASN-575 merge.
---

# Aesthetic Desire, the Figurative Body, and Adaptive Recommendation

**A Literature Review for the Vela Research Program**

*Prepared 24 April 2026 — cross-validated from two independent parallel literature-map drafts*

## Abstract

This literature review synthesises the empirical and theoretical foundations underlying the Vela Research Program, a multi-phase investigation into aesthetic desire, figurative body perception, and adaptive recommendation. Drawing on empirical aesthetics, neuroaesthetics, computational psychometrics, and information-retrieval research, the review maps each major construct — from the eight desire dimensions operationalised in Vela's scoring engine to the pool-based adaptive curation system — onto its closest scholarly antecedents. Special attention is given to the points at which Vela's behavioural, multi-signal approach diverges from prior work, and to the methodological gaps that remain open pending corpus growth. The review is grounded in citations verified across two independent parallel drafts.

## 1. Introduction

The psychological study of aesthetic experience has historically centred on preference and liking — typically operationalised as a single hedonic rating on a bounded scale [@berlyne_1971_aesthetics; @silvia_2005_emotional]. This framing captures evaluative valence but leaves underspecified the appetitive dimension of aesthetic response: the forward-leaning impulse to remain with an image, to seek more of its kind, to allow it to reorganise attention. Vela, a platform for curated figurative art, attempts to capture precisely this dimension through a multi-signal response model in which explicit ratings, implicit saves, dwell time, and boundary (aversion) flags combine into a desire score that is distinct from simple liking. The platform simultaneously functions as a personalised recommendation engine and, under the IRB-governed research programme documented in `docs/RESEARCH-PROGRAM.md`, as a repeated-measures experimental instrument for the empirical study of aesthetic desire.

The present review organises the relevant literature into five thematic domains: (1) the psychology of aesthetic desire and the theoretical construct it attempts to measure; (2) the figurative body as a perceptually and affectively privileged stimulus class; (3) the eight desire dimensions that structure Vela's scoring engine; (4) adaptive recommendation and computational psychometrics; and (5) the statistical and psychometric methods required to validate the system. For each domain, the review situates Vela's design choices relative to existing empirical work, identifies convergences and divergences, and notes where the current corpus — still nascent as of April 2026 — precludes formal instrument validation (cf. `docs/engine-room/02-instrument-validation.md`).

## 2. The Psychology of Aesthetic Desire

### 2.1 From preference to desire: theoretical foundations

The dominant paradigm in empirical aesthetics treats aesthetic response as a form of preference or liking, deriving largely from Berlyne's (1971) arousal theory. Berlyne proposed that collative variables — novelty, complexity, ambiguity, and incongruity — drive arousal along an inverted-U curve, with the most aesthetically rewarding stimuli occupying a middle range of complexity. Although influential, this framework conflates the pleasure of resolution with the pull of the unresolved; it cannot, within its own terms, distinguish sustained engagement from satisfied evaluation.

Silvia (2005) advanced the field by recasting aesthetic response as appraisal-driven emotion. On his account, interest — the emotion most directly analogous to desire — arises when a stimulus is appraised as both novel and comprehensible: novel enough to demand engagement, familiar enough to reward it. This distinguishes interest from pleasure, which is hedonically positive but does not require the forward orientation that novelty-with-coping-potential produces. Vela's multi-signal response model is grounded in this distinction: raw ratings capture evaluative pleasure; saves and extended dwell capture Silvia's interest-class response; boundary flags capture the aversion that Silvia & Brown (2007) demonstrated is a genuine aesthetic emotion rather than a null result.

Armstrong and Detweiler-Bedell (2008) developed a related but distinct account, framing beauty as an approach-motivational state akin to the exhilaration of encountering a solvable challenge. Their framework positions the aesthetic response as energising and directed, not merely pleasant, which aligns closely with Vela's operational definition of desire as the forward-lean toward more of a kind. Reber, Schwarz, and Winkielman (2004) offered a complementary account centred on processing fluency: the ease with which a stimulus is perceptually processed generates positive affect, explaining why symmetry, prototypicality, and contrast often increase liking. Vela's system partially inherits this effect through its structure and classical dimensions, but also deliberately includes stimuli that reward effortful engagement — a divergence from pure fluency accounts that the empirical program can quantify.

At the neural level, Vessel, Starr, and Rubin (2012) demonstrated that artworks rated as especially moving — as opposed to merely liked — activate the default mode network, the brain's self-referential processing system. This finding suggests that intense aesthetic experience involves a kind of self-relevance absent from ordinary preference. Chatterjee and Vartanian (2014) situated this within a broader perception-emotion-meaning triad, arguing that aesthetic episodes involve interacting perceptual, affective, and semantic processes. Vela's decomposition schema attempts to operationalise the perceptual layer of this triad through 45 structured features, while the desire score aggregates the affective layer across users.

Menninghaus et al. (2019) provided the most comprehensive empirical taxonomy of aesthetic emotions, identifying distinct states — pleasure, awe, being-moved, and fascination among them — that are intrinsically rewarding, motivationally potent, and frequently mixed in valence. Vela's `responses.emotions[]` tag and `intensity` field attempt to capture this richer phenomenology, though the current free-text tagging approach compresses the taxonomy considerably relative to the forced-choice instruments Menninghaus et al. employed.

### 2.2 Negative aesthetic response: the boundary signal

A recurring gap in aesthetic theory is the treatment of negative response as non-response — the absence of interest rather than a psychologically real outcome. Silvia and Brown (2007) explicitly challenged this view, demonstrating that anger and disgust function as genuine aesthetic emotions with distinct appraisal patterns: disgust signals a stimulus appraised as offensive or contaminating; anger signals one appraised as threatening or unjust. Both are real aesthetic reactions, not methodological failures.

Vela formalises this insight through the `boundary_flag` signal and the `BoundaryTags` system. A boundary flag contributes −1.0 to a unit's response weight — the most extreme weight in the system — and triggers tag generation that produces durable exclusion rules for the generating user. This is a stronger operationalisation of negative aesthetic response than any prior recommender system employs, and it constitutes one of Vela's most significant divergences from the existing literature.

## 3. The Figurative Body as a Special Case

Figurative art — and the depicted human body in particular — occupies a privileged position in aesthetic research because it engages perceptual, empathic, social-cognitive, and culturally mediated processes simultaneously. Vela's library is constituted entirely of figurative work spanning five centuries; the research program treats this focus not as an editorial constraint but as a theoretical resource.

The most foundational empirical support for treating the depicted body as a distinct visual class comes from Downing, Jiang, Shuman, and Kanwisher (2001), who identified a cortical area in the extrastriate cortex selective for visual processing of human bodies — the Extrastriate Body Area — that responds to whole-body depictions independently of face-processing regions. This finding supports Vela's assumption that figurative-body stimuli deserve dedicated measurement features rather than treatment as generic visual stimuli.

Freedberg and Gallese (2007) extended this neuroscientific grounding through the embodied simulation hypothesis, proposing that depicted pose, gesture, and implied movement in figurative art activate motor and somatosensory cortices in the viewer. Viewing a depicted reclining figure, on this account, partially recruits the neural resources involved in perceiving an actual reclining person. This prediction grounds Vela's `pose_type` and `gesture` decomposition features as potentially desire-relevant variables in a way that art-historical features (period, medium, attribution) do not directly predict.

Portrait gaze constitutes a specific case within this broader framework. Kesner, Grygarová, Honsnejmanová, and Fus (2018) demonstrated through combined fMRI and eye-tracking that direct gaze in painted portraits engages social-cognitive processing differently from averted gaze, altering viewing behaviour and evoking stronger responses. Vela encodes gaze direction as a decomposition field and can test this effect behaviourally at scale in ways that the small-sample neuroimaging paradigm cannot.

Leder, Ring, and Dressler-Stross (2013) identified an important complexity specific to portraiture: aesthetic evaluation of a portrait can diverge from perceived liking of the depicted person, with artwork-level and person-level evaluations sometimes dissociating. Vela currently collapses both into a single desire score; distinguishing these channels is a future modelling challenge the research program may need to address as the corpus grows.

## 4. The Eight Desire Dimensions

Vela's scoring engine constructs user profiles across eight desire dimensions: softness, intensity, narrative, structure, texture, abstraction, classical, and contemporary. Each dimension has at least one supporting reference in aesthetic or perceptual research, though the dimensions are themselves a curatorial invention rather than a replication of any existing taxonomy.

The **softness** dimension is anchored in Bar and Neta's (2006) finding that humans show a robust perceptual preference for curved, smooth forms over sharp angular ones, a preference linked to threat-avoidance appraisals. Vela extends this from simple geometric forms to a broader construct that absorbs rendering style, light quality, and pose into a single dimension — a generalisation that Bar and Neta's stimuli did not test.

The **intensity** dimension maps onto the arousal axis of Russell's (1980) circumplex model of affect. High-arousal stimuli — those with hard light, high contrast, or physically demanding poses — are predicted to produce stronger desire responses in users whose profiles favour this dimension, independent of valence. The arousal component Berlyne identified in collative variables provides the further theoretical grounding here.

The **narrative** dimension, which captures the image's legibility as a story with an implied before and after, draws on Leder, Belke, Oeberst, and Augustin's (2004) processing model of aesthetic appreciation. Their model posits a "cognitive understanding" stage at which the viewer constructs a symbolic interpretation of the work; narrative-rich images reach this stage more readily. Iosifyan (2021) provided recent empirical support, demonstrating that theory-of-mind ability — the capacity to read intentions and mental states — independently predicts aesthetic appreciation in visual art, suggesting that images legible as social scenes are advantaged for viewers with strong social-cognitive processing.

The **structure** dimension concerns compositional order — geometric balance, the rule of thirds, diagonal tension. Arnheim's (1974) foundational analysis of visual perception established the vocabulary for compositional structure that underlies this dimension, and Jacobsen and Höfel's (2002) empirical work demonstrated that symmetry and complexity shape beauty judgments in formal patterns independently of semantic content. Reber et al.'s (2004) processing-fluency account also converges here: structurally legible compositions are processed more easily and therefore liked more, all else equal.

The **texture** dimension engages the cross-modal connection between visual and haptic perception. Lederman and Abbott (1981) established texture as a robust perceptual dimension with cross-modal organisation; Fleming (2014) demonstrated that the visual system recovers material surface properties — gloss, roughness, translucency — from image cues with considerable accuracy. Vela's texture dimension operationalises desire for this class of surface information, though the specific relationship between material perception and desire response in figurative art remains unstudied.

The **abstraction** dimension captures the figurative-to-abstract continuum. Kawabata and Zeki (2004) compared neural responses to abstract, portrait, landscape, and still-life images, finding that abstract art activates different regions than representational work — suggesting that abstract and representational aesthetics recruit distinct processing pathways. Vela measures desire for work across this continuum, with the `rendering` field in `visual_decompositions` providing the primary abstraction-level indicator.

The **classical** and **contemporary** dimensions capture preference along the historical axis. Leder and Nadal (2014) reviewed how expertise and prior knowledge — both of which mediate responses to classical work — modulate aesthetic appreciation through the processing model's stages. Muth and Carbon (2013) provided an empirically grounded account of what contemporary art distinctively offers: the "aesthetic aha," a pleasure specific to the resolution of initially ambiguous or challenging images. Vela's extended dwell measure can serve as a behavioural proxy for this resolution process.

## 5. Adaptive Recommendation and Computational Psychometrics

### 5.1 Item Response Theory as a measurement framework

The conceptual analogy between Vela's adaptive curation system and computerised adaptive testing (CAT) from psychometrics is not decorative. Van der Linden (2018) established the psychometric foundations for adaptive item selection: as a person answers items, the system's estimate of their latent trait improves, and subsequent items are selected to be maximally informative at the current trait level. Vela's pool ladder and profile update logic implement a heuristic version of this logic — units accumulate response evidence across users, are routed into quality pools accordingly, and user profiles improve with each response. The system is not a formal IRT implementation (it does not estimate maximum-likelihood person parameters or compute Fisher information), but it is psychometric in spirit.

The `CONFIDENCE_DENOMINATOR` of 20 used in Vela's profile confidence calculation — which caps confidence at N = 20 eligible responses — is consistent with Maas and Hox's (2005) empirical guidance that level-2 sample sizes below this threshold produce unstable statistical estimates. The specific constant is an engineering choice, but it is defensible within the psychometric literature.

### 5.2 Multi-signal utility and implicit feedback

Vela's utility computation combines explicit ratings, implicit saves, and boundary flags into a weighted per-response score. The theoretical foundation for differential weighting of implicit and explicit signals is Hu, Koren, and Volinsky's (2008) landmark paper on collaborative filtering for implicit feedback datasets, which demonstrated that implicit signals carry preference information with variable confidence. Vela departs from Hu et al. by adding a strongly negative signal (`boundary_flag` at −1.0) with no standard analogue in recommendation systems, and by operating on an aesthetically curated corpus with known perceptual structure rather than transactional behavioural data.

Koren's (2009) work on temporal dynamics in collaborative filtering provides the theoretical basis for Vela's profile temporal decay. Koren demonstrated that user preferences drift over time and that models incorporating temporal information outperform static baselines. Vela implements a transparent 60-day half-life rather than learning a latent temporal factorisation, a simpler approach that privileges interpretability and reproducibility over predictive accuracy.

### 5.3 Signal diversity and redundancy

Vela's `SignalDiversity` measure operationalises rating variance as a first-class information signal: a unit that provokes strong disagreement (some 1s, some 5s) carries more diagnostic information than one that everyone mildly likes. This is a novel formulation for which no single primary source exists in the recommendation literature. Its theoretical grounding is in the psychometric literature on item discrimination — the principle that items which distinguish high-ability from low-ability respondents are more informative than items that everyone gets right — and in Silvia's (2005) appraisal framework, which implies that units provoking split appraisals (interesting to some, uninteresting to others) are capturing genuine individual differences in aesthetic preference.

Redundancy management is handled at two levels. Ziegler, McNee, Konstan, and Lausen (2005) established the classical argument for recommendation diversification: recommendation lists that include semantically similar items produce lower user satisfaction despite potentially higher accuracy. This supports Vela's `RedundancyPenalty`, which penalises units whose relation-graph neighbours have already been presented. At the runtime level, Radford et al.'s (2021) CLIP model provides the multimodal embedding space in which cosine similarity is computed; units above the 0.85 threshold are penalised, and those above 0.92 are hard-deduplicated.

### 5.4 Cold start and content-based priors

Vela's cold-start strategy — using decomposition features (`pose_type`, `light_quality`, `rendering`, `medium`) to compute informed priors for units with no responses — follows the content-based recommendation approach surveyed by Lops, de Gemmis, and Semeraro (2011). In the absence of interaction data, item features substitute for collaborative signal. Vela's decomposition priors are a hand-crafted, domain-specific variant of this strategy, designed to reflect the specific perceptual and aesthetic structure of figurative art rather than generic feature categories.

### 5.5 Exploration, exploitation, and session dynamics

The exploration-exploitation tradeoff is a fundamental challenge in adaptive systems. Li, Chu, Langford, and Schapire's (2010) contextual-bandit formulation established that even personalised systems must explore to avoid preference lock-in. Vela hard-codes exploration quotas through its pool system and exploration-budget mechanism rather than learning an online policy, sacrificing optimality for transparency and reproducibility — the correct trade-off for a system that doubles as a research instrument.

Within-session behaviour is modelled through a session momentum term that boosts the candidate score of units sharing the dimension of recently highly-rated content. Jannach, Ludewig, and Lerche (2017) demonstrated empirically that within-session behaviour reveals short-term intent that long-term user profiles cannot capture, supporting the motivating logic for this mechanism. Vela's implementation is a bounded additive term (capped at ±0.15) rather than a full next-item session model, reflecting the constraint that session intent must not dominate long-term profile alignment.

Knijnenburg, Willemsen, Gantner, Soncu, and Newell (2012) provided the foundational argument that recommendation evaluation must encompass the subjective experience of the recommendation process, not only predictive accuracy. This principle is embedded in Vela's `CandidateScore` design, which explicitly blends population-level desire evidence, user-profile alignment, session context, curator priorities, and pool quality into a composite that optimises for curation quality rather than rating prediction alone.

## 6. Statistical Methods for the Research Program

The five research phases described in `docs/RESEARCH-PROGRAM.md` draw on a specific set of statistical methods, each with established psychometric precedent.

Research Question 1, which aims to empirically separate desire from preference through latent subgroup identification, requires latent profile analysis. Nylund, Asparouhov, and Muthén (2007) provided the gold-standard Monte Carlo guidance for class enumeration in LPA, establishing BIC, the Lo-Mendell-Rubin likelihood-ratio test, and entropy as complementary class-number criteria. The application of LPA to Vela's multi-signal response space — where features are behavioural (saves, dwell, boundary flags) rather than self-report — extends the method into a domain not covered by Nylund et al.'s simulation conditions.

Research Question 2, predicting desire response from visual decomposition features, requires multilevel regression with responses nested within units nested within users. Maas and Hox (2005) established that 50 level-2 units is the conventional minimum for stable random-effects estimation. Vela's target of 50 users with 20 responses each in Phase 1 directly reflects this constraint. The multilevel structure in Vela is more complex than the two-level case Maas and Hox simulated — responses are crossed between users and units rather than strictly nested — making their guidance conservative for this design.

Research Question 3, assessing whether desire profiles stabilise across sessions, requires intraclass correlation coefficients computed on repeated profile snapshots. Shrout and Fleiss (1979) established the standard ICC(2,1) estimator for consistency across occasions. The infrastructure requirement for this analysis — an append-only `user_desire_profile_versions` table — is documented as a gap in `docs/engine-room/02-instrument-validation.md`, and the analysis cannot be conducted until the table is populated.

Koren, Bell, and Volinsky (2009) contextualise Vela's personalisation approach within the broader landscape of matrix factorisation methods for recommendation. Their review establishes that latent-factor models — in which user and item embeddings are learned jointly from response data — represent the dominant recommendation paradigm. Vela's explicit 8-dimension model trades predictive flexibility for interpretability and construct validity, a trade-off the research program is well-positioned to evaluate once sufficient data accumulates.

## 6.A. Evidence strength by scoring component

The preceding sections argue that the literature supports the construct families underlying Vela's engine. The present subsection is more surgical: for each individual scoring component in `docs/engine-room/01-math-spec.md`, what does the literature actually support, and at what strength?

| Scoring component | Best literature anchor | What the literature actually supports | Evidence strength |
|---|---|---|---|
| `Utility` / `DesireScore` (§2.1, §2.4) | Silvia (2005); Armstrong & Detweiler-Bedell (2008); Hu, Koren, & Volinsky (2008) | Strong support for separating evaluative pleasure from interest/approach, and for weighting heterogeneous behavioural signals differently. **No strong primary source identified for Vela's exact multiplicative `Utility × SignalDiversity − Redundancy` form.** | Moderate for components; weak for the exact formula |
| `SignalDiversity` (§2.2) | Berlyne (1971); Silvia (2005); Menninghaus et al. (2019) | Mixed, non-unanimous response patterns plausibly carry informational value where novelty, ambiguity, or mixed emotion are involved. **No strong primary source identified for normalised rating variance as a first-class positive scoring signal.** | Weak to moderate |
| `CandidateScore` (§5) | Knijnenburg et al. (2012); Schedl et al. (2018); Ziegler et al. (2005) | Strong support for balancing personalisation, user experience, and diversity. **No strong primary source identified for Vela's exact profile/curator/population coefficient mix or pool-bonus ladder.** | Moderate |
| `BoundaryTags` | Silvia & Brown (2007); Gerger, Leder, & Kremer (2014); Menninghaus et al. (2019) | Strong support that negative aesthetic emotions are real, structured, and behaviourally important. Literature supports tracking aversion; **does not uniquely validate Vela's exact tag-propagation logic.** | Strong for construct; weak for operationalisation |
| `ResponseCount` / confidence gates | van der Linden (2018); Hu et al. (2008) | Generic support for confidence increasing with informative observations and unequal evidential weight across interactions. **No strong primary source identified for Vela's exact gates at 5, 10, and 20.** | Weak to moderate |
| `DecayFactor` (60-day half-life) | Koren (2009); Jannach, Ludewig, & Lerche (2017) | Strong support that preferences drift and short-term context diverges from long-term profile. **No strong primary source identified for a fixed 60-day half-life.** | Moderate |
| `ExplorationBudget` (25% default) | Li et al. (2010); Schedl et al. (2018) | Strong support for exploration–exploitation tradeoffs and explicit exploration in adaptive recommendation. **No strong primary source identified for Vela's specific 10% / 25% / 60% quotas.** | Strong generic; weak exact |
| `RedundancyPenalty` | Ziegler et al. (2005); Radford et al. (2021) | Strong support for diversification and for using learned representation spaces to estimate similarity. The bridge from those ideas to Vela's exact penalty cap is original engineering. | Moderate to strong |
| `SessionMomentum` (bounded additive, ±0.15) | Jannach et al. (2017); Knijnenburg et al. (2012) | Good support that ongoing-session behaviour reveals immediate intent that long-term profiles miss. **No strong primary source identified for Vela's additive momentum cap and factor.** | Weak to moderate |
| `ColdStartPriors` (decomposition-seeded) | Lops, de Gemmis, & Semeraro (2011); Schedl et al. (2018) | Strong support for feature-based cold start when interaction history is sparse. **No strong primary source identified for pose/light/rendering/medium priors specific to figurative desire.** | Moderate |
| CLIP-based redundancy (σ = 0.85 / 0.92) | Radford et al. (2021); Ziegler et al. (2005) | Strong support for embedding-based similarity and for diversification. **No strong primary source identified for Vela's exact soft and hard thresholds.** | Moderate |

The most secure empirical bridge, then, is this: the literature supports a multi-signal, time-sensitive, exploratory, diversified, body-aware recommender for aesthetic research. It does not yet support Vela's exact formulas as anything stronger than transparent hypotheses.

## 7. Current Instrument State and Validation Limitations

As of April 2026, the Vela instrument is theoretically well-grounded but empirically nascent. The instrument validation report (`docs/engine-room/02-instrument-validation.md`) documents that 95.3% of the 1,325 active units return the exact neutral prior score of 0.25, reflecting a starved response corpus (197 total responses, one eligible user). Formal reliability assessments — split-half reliability, test-retest stability, and convergent validity against curator ratings — cannot be reported at this N. The minimum conditions for each are clear: split-half reliability requires 20 responses on at least 10 units; test-retest requires a versioned profile history that does not yet exist; construct validity requires 20 profiled users per dimension.

These are limitations of corpus size, not of theoretical design. The engine v3 cold priors introduced in ASN-567 begin to differentiate units before any human responses arrive, using decomposition features to spread the prior distribution away from the flat 0.25 floor. The participant recruitment campaign in ASN-576–581 targets the minimum thresholds for reliability analysis. The review team recommends that no substantive psychometric claim be made from current Vela output until at least the Phase 1 sample targets described in `docs/RESEARCH-PROGRAM.md` §IX are reached.

## 7.A. Claims to hold as hypotheses, not literature-backed findings

In the interest of intellectual honesty — and so that external reviewers are not left to reverse-engineer the distinction — the following Vela design claims are retained as working hypotheses rather than literature-backed findings:

- **The exact operational definition of aesthetic desire** as rating + save + dwell + return-to-similar. The literature supports multi-signal motivational interpretation, but not this precise composite.
- **The eight-dimension taxonomy** as a canonical factor structure. The dimensions are defensible composites, but no primary source validates them as natural, orthogonal, or exhaustive.
- **The 45-feature figurative decomposition schema.** A plausible and potentially important methodological innovation, not imported from any single established literature.
- **The exact `DesireScore` equation**, especially the multiplication of utility by rating variance and the chosen normalisation constants.
- **The exact `CandidateScore` formula**, including pool bonuses, the 0.3 / 0.1 / 0.2 component weights, and the hard exclusion behaviour of the PURGATORY pool.
- **Exact boundary heuristics**: promotion/demotion thresholds, the purgatory cutoff, trigger rules for boundary tags, and the assumption that boundary evidence should generalise across similar content.
- **Exact temporal heuristics**: a 60-day half-life, the confidence denominator of 20, the minimum sample-size gates at 5 and 10, and the bounded additive session-momentum rule.
- **Exact exploration and redundancy heuristics**: fixed exploration quotas, CLIP soft/hard thresholds, and penalty caps.
- **Research-program hypotheses** such as *"gaze/light/intimacy will outrank medium/period,"* *"within-session desire follows an inverted-U,"* *"cross-domain transfer will proceed through decomposition features,"* and *"museum provenance will create a halo effect."* These are good hypotheses, not established empirical results.

This list is intentionally conservative. It does not mean the engine is wrong — it means that every constant, every formula, and every heuristic prediction above is something the research program should *validate*, not something it should *defend*.

## 8. Conclusions

The Vela Research Program occupies a theoretically distinctive position in the empirical aesthetics landscape. It is, to the authors' knowledge, the only platform that simultaneously (1) captures desire as distinct from preference through a multi-signal behavioural architecture, (2) decomposes figurative imagery into 45+ structured perceptual features, (3) builds longitudinal desire profiles across eight theoretically grounded dimensions, and (4) treats the recommendation engine as a formal instrument subject to psychometric scrutiny. Each of these contributions has a foundation in prior literature — from Silvia's appraisal theory to Hu et al.'s implicit feedback framework to Maas and Hox's sample-size guidance — but no prior work combines them in a single system.

The primary scientific contribution will be empirical rather than theoretical: the first large-scale behavioural dataset demonstrating whether desire is separable from preference in aesthetic response to figurative art, and which compositional features of the depicted body predict it. The literature reviewed here provides the scaffolding. The corpus will provide the answer.

## 9. Priority sources for external readers

Readers pressed for time can triangulate the review from nine priority sources:

- **Silvia, P. J. (2005).** *Emotional responses to art.* The single clearest bridge from classical collative-variable aesthetics to a modern appraisal account of interest — the best theoretical anchor for Vela's claim that desire is not identical to liking. https://doi.org/10.1037/1089-2680.9.4.342
- **Armstrong, T., & Detweiler-Bedell, B. (2008).** *Beauty as an emotion.* Strongest literature support for an approach-oriented, "forward-leaning" understanding of aesthetic response. https://doi.org/10.1037/a0012558
- **Leder, H., Belke, B., Oeberst, A., & Augustin, D. (2004).** *A model of aesthetic appreciation.* Most helpful general-process model for situating perceptual, affective, and meaning-making phases. https://doi.org/10.1348/0007126042369811
- **Freedberg, D., & Gallese, V. (2007).** *Motion, emotion and empathy in esthetic experience.* The conceptual source for why figurative bodily depiction matters mechanistically. https://doi.org/10.1016/j.tics.2007.02.003
- **Kesner, L., Grygarová, D., Honsnejmanová, I., & Fus, P. (2018).** *Gaze in portrait paintings.* Links a concrete figurative feature to measurable attentional and social-cognitive outcomes. https://doi.org/10.1016/j.bandc.2018.06.004
- **Hu, Y., Koren, Y., & Volinsky, C. (2008).** *Collaborative filtering for implicit feedback datasets.* Core technical justification for treating behavioural signals as unequal evidence. https://doi.org/10.1109/ICDM.2008.22
- **Li, L., Chu, W., Langford, J., & Schapire, R. E. (2010).** *Contextual-bandit approach.* Cleanest foundational source for explicit exploration in adaptive recommendation. https://doi.org/10.1145/1772690.1772758
- **Ziegler, C.-N., McNee, S. M., Konstan, J. A., & Lausen, G. (2005).** *Topic diversification.* Directly supports Vela's anti-redundancy intuition. https://doi.org/10.1145/1060745.1060754
- **Radford, A., et al. (2021).** *Learning transferable visual models from natural language supervision.* Provides the practical basis for CLIP-based similarity and session-level visual deduplication.

## Notes on reconciliation

This review was reconciled from two independent parallel drafts (ASN-596 pattern — ChatGPT Deep Research + browser Claude Opus 4.7 1M context, both 2026-04-24). Structure and prose are primarily from the Claude branch; §6.A evidence-strength table, §7.A hypotheses-not-findings list, and §9 priority-source list are integrated from the ChatGPT branch. The ChatGPT draft is preserved unchanged at `docs/research/papers/literature-review-chatgpt-draft.md` for audit. The Chatterjee & Vartanian (2014) DOI was verified as `10.1016/j.tics.2014.03.003` during ASN-575 merge; all other DOIs were verified during that merge and carried forward here.

## References

Armstrong, T., & Detweiler-Bedell, B. (2008). Beauty as an emotion: The exhilarating prospect of mastering a challenging world. *Review of General Psychology, 12*(4), 305–329. https://doi.org/10.1037/a0012558

Arnheim, R. (1974). *Art and visual perception: A psychology of the creative eye* (new version). University of California Press.

Bar, M., & Neta, M. (2006). Humans prefer curved visual objects. *Psychological Science, 17*(8), 645–648. https://doi.org/10.1111/j.1467-9280.2006.01759.x

Berlyne, D. E. (1971). *Aesthetics and psychobiology*. Appleton-Century-Crofts.

Chatterjee, A., & Vartanian, O. (2014). Neuroaesthetics. *Trends in Cognitive Sciences, 18*(7), 370–375. https://doi.org/10.1016/j.tics.2014.03.003

Downing, P. E., Jiang, Y., Shuman, M., & Kanwisher, N. (2001). A cortical area selective for visual processing of the human body. *Science, 293*(5539), 2470–2473. https://doi.org/10.1126/science.1063414

Fleming, R. W. (2014). Visual perception of materials and their properties. *Vision Research, 94*, 62–75. https://doi.org/10.1016/j.visres.2014.06.004

Freedberg, D., & Gallese, V. (2007). Motion, emotion and empathy in esthetic experience. *Trends in Cognitive Sciences, 11*(5), 197–203. https://doi.org/10.1016/j.tics.2007.02.003

Hu, Y., Koren, Y., & Volinsky, C. (2008). Collaborative filtering for implicit feedback datasets. In *Proceedings of the 2008 IEEE International Conference on Data Mining* (pp. 263–272). https://doi.org/10.1109/ICDM.2008.22

Iosifyan, M. (2021). Theory of mind increases aesthetic appreciation in visual arts. *Art & Perception, 9*(2), 113–133. https://doi.org/10.1163/22134913-bja10011

Jacobsen, T., & Höfel, L. (2002). Aesthetic judgments of novel graphic patterns: Analyses of individual judgments. *Perceptual and Motor Skills, 95*(3 Pt 1), 755–766. https://doi.org/10.2466/pms.2002.95.3.755

Jannach, D., Ludewig, M., & Lerche, L. (2017). Session-based item recommendation in e-commerce: On short-term intents, reminders, trends and discounts. *User Modeling and User-Adapted Interaction, 27*(3–5), 351–392. https://doi.org/10.1007/s11257-017-9194-1

Kawabata, H., & Zeki, S. (2004). Neural correlates of beauty. *Journal of Neurophysiology, 91*(4), 1699–1705. https://doi.org/10.1152/jn.01225.2003

Kesner, L., Grygarová, D., Honsnejmanová, I., & Fus, P. (2018). Perception of direct vs. averted gaze in portrait paintings: An fMRI and eye-tracking study. *Brain and Cognition, 125*, 88–99. https://doi.org/10.1016/j.bandc.2018.06.004

Knijnenburg, B. P., Willemsen, M. C., Gantner, Z., Soncu, H., & Newell, C. (2012). Explaining the user experience of recommender systems. *User Modeling and User-Adapted Interaction, 22*(4–5), 441–504. https://doi.org/10.1007/s11257-011-9118-4

Koren, Y. (2009). Collaborative filtering with temporal dynamics. In *Proceedings of the 15th ACM SIGKDD International Conference on Knowledge Discovery and Data Mining* (pp. 447–456). https://doi.org/10.1145/1557019.1557072

Koren, Y., Bell, R., & Volinsky, C. (2009). Matrix factorization techniques for recommender systems. *Computer, 42*(8), 30–37. https://doi.org/10.1109/MC.2009.263

Leder, H., Belke, B., Oeberst, A., & Augustin, D. (2004). A model of aesthetic appreciation and aesthetic judgments. *British Journal of Psychology, 95*(4), 489–508. https://doi.org/10.1348/0007126042369811

Leder, H., & Nadal, M. (2014). Ten years of a model of aesthetic appreciation and aesthetic judgments. *British Journal of Psychology, 105*(4), 443–464. https://doi.org/10.1111/bjop.12084

Leder, H., Ring, A., & Dressler-Stross, S. (2013). See me, feel me! Aesthetic evaluations of art portraits. *Psychology of Aesthetics, Creativity, and the Arts, 7*(4), 358–369. https://doi.org/10.1037/a0033311

Lederman, S. J., & Abbott, S. G. (1981). Texture perception: Studies of intersensory organization using a discrepancy paradigm, and visual versus tactual psychophysics. *Journal of Experimental Psychology: Human Perception and Performance, 7*(4), 902–915. https://doi.org/10.1037/0096-1523.7.4.902

Li, L., Chu, W., Langford, J., & Schapire, R. E. (2010). A contextual-bandit approach to personalized news article recommendation. In *Proceedings of the 19th International Conference on World Wide Web* (pp. 661–670). https://doi.org/10.1145/1772690.1772758

Lops, P., de Gemmis, M., & Semeraro, G. (2011). Content-based recommender systems: State of the art and trends. In F. Ricci, L. Rokach, B. Shapira, & P. B. Kantor (Eds.), *Recommender systems handbook* (pp. 73–105). Springer. https://doi.org/10.1007/978-0-387-85820-3_3

Maas, C. J. M., & Hox, J. J. (2005). Sufficient sample sizes for multilevel modeling. *Methodology, 1*(3), 86–92. https://doi.org/10.1027/1614-2241.1.3.86

Menninghaus, W., Wagner, V., Hanich, J., Wassiliwizky, E., Jacobsen, T., & Koelsch, S. (2019). What are aesthetic emotions? *Psychological Review, 126*(2), 171–195. https://doi.org/10.1037/rev0000135

Murdock, B. B. (1962). The serial position effect of free recall. *Journal of Experimental Psychology, 64*(5), 482–488. https://doi.org/10.1037/h0045106

Muth, C., & Carbon, C.-C. (2013). The aesthetic aha: On the pleasure of having insights into Gestalt. *Acta Psychologica, 144*(1), 25–30. https://doi.org/10.1016/j.actpsy.2013.02.004

Nylund, K. L., Asparouhov, T., & Muthén, B. O. (2007). Deciding on the number of classes in latent class analysis and growth mixture modeling: A Monte Carlo simulation study. *Structural Equation Modeling, 14*(4), 535–569. https://doi.org/10.1080/10705510701575396

Radford, A., Kim, J. W., Hallacy, C., Ramesh, A., Goh, G., Agarwal, S., Sastry, G., Askell, A., Mishkin, P., Clark, J., Krueger, G., & Sutskever, I. (2021). Learning transferable visual models from natural language supervision. In *Proceedings of the 38th International Conference on Machine Learning* (pp. 8748–8763). PMLR.

Reber, R., Schwarz, N., & Winkielman, P. (2004). Processing fluency and aesthetic pleasure: Is beauty in the perceiver's processing experience? *Personality and Social Psychology Review, 8*(4), 364–382. https://doi.org/10.1207/S15327957PSPR0804_3

Russell, J. A. (1980). A circumplex model of affect. *Journal of Personality and Social Psychology, 39*(6), 1161–1178. https://doi.org/10.1037/h0077714

Schedl, M., Zamani, H., Chen, C.-W., Deldjoo, Y., & Elahi, M. (2018). Current challenges and visions in music recommender systems research. *International Journal of Multimedia Information Retrieval, 7*(2), 95–116. https://doi.org/10.1007/s13735-018-0154-2

Shrout, P. E., & Fleiss, J. L. (1979). Intraclass correlations: Uses in assessing rater reliability. *Psychological Bulletin, 86*(2), 420–428. https://doi.org/10.1037/0033-2909.86.2.420

Silvia, P. J. (2005). Emotional responses to art: From collation and arousal to cognition and emotion. *Review of General Psychology, 9*(4), 342–357. https://doi.org/10.1037/1089-2680.9.4.342

Silvia, P. J., & Brown, E. M. (2007). Anger, disgust, and the negative aesthetic emotions: Expanding an appraisal model of aesthetic experience. *Psychology of Aesthetics, Creativity, and the Arts, 1*(2), 100–106. https://doi.org/10.1037/1931-3896.1.2.100

van der Linden, W. J. (Ed.). (2018). *Handbook of item response theory* (Vols. 1–3). Chapman and Hall/CRC.

Vessel, E. A., Starr, G. G., & Rubin, N. (2012). The brain on art: Intense aesthetic experience activates the default mode network. *Frontiers in Human Neuroscience, 6*, 66. https://doi.org/10.3389/fnhum.2012.00066

Ziegler, C.-N., McNee, S. M., Konstan, J. A., & Lausen, G. (2005). Improving recommendation lists through topic diversification. In *Proceedings of the 14th International Conference on World Wide Web* (pp. 22–32). https://doi.org/10.1145/1060745.1060754
