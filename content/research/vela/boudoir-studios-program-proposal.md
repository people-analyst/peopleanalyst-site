# Research Proposal — Comparative Cultural Representation in American Boudoir Studios and American Art Museums

**Principal investigator:** Mike West (mike@peopleanalyst.com); Vela / PeopleAnalyst
**Status:** Draft proposal, Phase 1 — open for review prior to Phase 2 data collection (ASN-669+)
**Affiliation context:** Vela research program (`docs/RESEARCH-PROGRAM.md`)
**Date:** 2026-04-27

---

## 1. Background and significance

The figurative body is, and has been for at least five centuries of post-Renaissance European visual culture, the central case for studying how images carry cultural meaning. Empirical aesthetics has investigated bodily depiction primarily through museum-canonical work — Old Masters paintings, classical sculpture, occasionally photography (Berlyne 1971; Vessel, Starr & Rubin 2012; Freedberg & Gallese 2007). Critical art-historical scholarship has long noted that the museum canon over-represents male producers and idealized white-European subjects (Pollock & Parker 1981; Reilly 2018). Quantitative documentation of who is depicted and who depicts in canonical American art collections has been pursued by activist groups (the Guerrilla Girls' museum counts) and by individual museum studies, but no large-scale, schema-driven census of the American figurative-art canon exists in the literature comparable to the USC Annenberg Inclusion Initiative's reports on Hollywood film representation (Smith, Choueiti & Pieper, *Inequality in 1,800 Popular Films* 2025).

While museums occupy this canonical position, a parallel figurative-image economy has grown to scale outside the museum frame. Commercial boudoir photography studios — independent, mostly woman-owned, distributed across the U.S. — produce hundreds of thousands of figurative images annually, almost exclusively of women, commissioned by the depicted subject herself, and sold back to her. The industry's revenue, customer base, and visual output are all materially larger than the comparable surface area of American art-museum acquisitions in any given year. Yet the boudoir genre has been studied either as a postfeminist self-empowerment phenomenon in case-study form (Aliaga & Pelegrín 2024 on Peruvian women; Vrbová 2024 on Slovak women; Lawler 2020 on 1980s how-to guides) or in the broader frame of "sexualized labour" on social media (Drenten, Gurrieri & Tyler 2020). It has not been compared, on any rigorous representational dimension, against the museum canon to which it stands as commercial counterpart.

This program proposes that comparison.

The proposal sits inside a longer-running theoretical commitment expressed in Vela's own platform research: that aesthetic desire is shaped by who is allowed to be depicted, by whom, in what posture, with what register of seriousness — and that what the establishment frame discounts is often where the live cultural work is happening. The history of art's reception of emerging figurative forms — photography itself, the Impressionists, Pop, graffiti — is reliably one of dismissal followed by canonization. Studying the boudoir industry while it remains in the dismissal phase carries both methodological clarity (the data is undisturbed by canonization pressure) and historical urgency (the moment cannot be reconstructed later).

## 2. Specific aims

1. **Build a near-comprehensive inventory of U.S. commercial boudoir photography studios.** Target: 1,500–3,000 unique studios, with city, state, primary website, and inclusion-criteria-passing review.
2. **Construct a structured corpus of website rhetoric.** For each studio, capture homepage, about, pricing/experience, and FAQ copy in a versioned, robots-respectful crawl.
3. **Classify positioning rhetoric** along a controlled-vocabulary codebook — archetype, audience addressed, emotional register, body-politics signal, producer-gender claim, price tier, subject-authorship framing — with prompt-version stamping and Cohen's κ inter-rater reliability ≥ 0.6 per field.
4. **Run a pre-registered comparative cultural-representation study** of the boudoir corpus against `census_analyses` (the existing Vela museum census produced by `lib/research/vision-analyzer.ts`) along Fitzpatrick skin-tone bins, gender presentation, body type, age depicted, gaze, pose orientation, figure count, cultural tradition depicted, and an Orientalism flag.
5. **(Phase 2, contingent)** Apply the museum-census instrument to a sample of studio portfolio imagery; embed images with CLIP; cluster studios by visual repertoire; cross-reference *stated* positioning against *revealed* visual cluster.
6. **Publish.** One peer-reviewed empirical paper on the census comparison (target: *Empirical Studies of the Arts* or *Poetics*); one peer-reviewed mixed-methods paper on stated-vs-revealed positioning (target: *Poetics* or *Visual Studies*); one serious-press essay on the participatory-aesthetic shift the data document.

## 3. Research questions

The format follows `docs/RESEARCH-PROGRAM.md` §II. Hypotheses are pre-registered before Phase 2 data collection per `03-methodology.md`.

**RQ-B1. Are American boudoir studios more demographically representative of the U.S. female population than American art museums are of the women they depict?**

- *Hypothesis:* On the dimensions where pre-registered prediction is sharp — Fitzpatrick skin-tone distribution, body type distribution, age depicted — the boudoir corpus is closer to U.S. Census 2020 distributions for adult women than the museum corpus is. The directionality is sharpest for body type and age; less sharp but still predicted for skin tone. The museum corpus over-represents `young_adult`, `thin`, and `light`/`very_light` figures relative to both U.S. demographics and the boudoir corpus.
- *Method:* Chi-square goodness-of-fit per dimension against U.S. Census 2020 reference distributions; Cramér's V for effect size; Kolmogorov–Smirnov test on age distribution. Comparison of museum-corpus deviation magnitude vs boudoir-corpus deviation magnitude using bootstrap CIs.
- *Data:* `census_analyses` (museum side, pre-existing); `boudoir_image_features` (Phase 2; copy-only side runs an inferred-from-rhetoric comparator with limitations documented).
- *Vela instrument:* Schema parity between the two corpora via shared `lib/research/vision-analyzer.ts` v3.
- *Expected contribution:* The first quantitative cross-institutional cultural-representation comparison between the museum-canonical figurative-art surface and a major non-canonical commercial figurative-image surface in the U.S. context.
- *Target venue:* *Empirical Studies of the Arts* or *Poetics*.

**RQ-B2. What positioning archetypes structure the U.S. boudoir industry's self-presentation, and how stable are they across regions and price tiers?**

- *Hypothesis:* Latent class analysis on positioning fields (archetype, audience, register, body politics, subject-authorship) identifies 4–6 stable archetypes — *empowerment / classical / partner-gift / bridal / lingerie-commercial / nude-fine-art* are candidate clusters — with measurable regional and price-tier variation.
- *Method:* Latent class analysis (LCA) on the codebook fields; BIC and entropy comparison across 2–7 class solutions; multinomial regression of class membership on state-level demographics and price tier where parsable.
- *Data:* `boudoir_positioning_analyses` (ASN-671).
- *Vela instrument:* The codebook in `03-methodology.md` §3, with prompt-version stamping mirroring `vision-analyzer.ts`.
- *Expected contribution:* The first taxonomic mapping of the U.S. boudoir industry's positioning landscape, with regional and price-tier overlays.
- *Target venue:* *Poetics* or *Visual Studies*.

**RQ-B3. Does *stated* positioning rhetoric predict *revealed* visual repertoire, or do studios cluster differently in image-space than in copy-space?**

- *Hypothesis:* Stated archetype is a partial but imperfect predictor of revealed visual cluster. Specifically, studios marketing the *empowerment* archetype split between two visual clusters — one consistent with the rhetoric (low retouching, body-inclusive, varied poses) and one consistent with the *partner-gift* or *lingerie-commercial* visual repertoire. The classification rate of stated archetype from visual cluster is predicted to be 0.55–0.75 — meaningfully above chance, materially below 1.0.
- *Method:* CLIP image embeddings; HDBSCAN clustering; multinomial logistic regression of stated archetype on cluster membership; classification accuracy + confusion matrix.
- *Data:* `boudoir_image_features` and `boudoir_image_embeddings` (ASN-673, contingent).
- *Vela instrument:* Reuse of `vision-analyzer.ts` for image classification ensures direct museum-side parity for the cross-reference.
- *Expected contribution:* Empirical operationalization of stated-vs-revealed positioning gap in a commercial visual industry, with a reusable methodology applicable to other consumer-photography sectors (wedding, family portraiture, brand photography).
- *Target venue:* *Poetics* or *Visual Communication*.

**RQ-B4. Does the boudoir industry, viewed as a participatory-aesthetic institution, occupy structural positions previously characteristic of emerging art forms — photography, Pop, graffiti — at the moment of canonical exclusion?**

- *Hypothesis:* This is a qualitative-historical question, addressed in Paper C (the essay). The descriptive answer the data support is that boudoir studios share three diagnostic features of pre-canonical forms: subject-as-author authority is high; the producer class is structurally excluded from canonical training and validation circuits; and critical reception oscillates between dismissal and recuperation in ways that mirror the photographic case (Sontag 1977; Tagg 1988).
- *Method:* Theoretical synthesis grounded in the empirical findings of RQ-B1 and RQ-B2; no separate statistical test.
- *Data:* The literature review (`01-literature-review.md`) and the empirical findings of RQ-B1, RQ-B2.
- *Expected contribution:* A historiographic frame that helps locate the contemporary boudoir industry inside a recurring cultural pattern, rather than as an isolated postfeminist phenomenon.
- *Target venue:* *n+1*, *The Atlantic*, *NYRB*, or comparable serious-press venue.

## 4. Theoretical framing

The program is grounded in three converging frames:

**Empirical aesthetics of the figurative body.** Berlyne (1971) located aesthetic response in the dynamics of stimulus complexity, novelty, and ambiguity. Silvia (2005) refined this into appraisal theory; Menninghaus et al. (2019) provided the most current theoretical taxonomy of aesthetic emotions, distinguishing aesthetic pleasure, awe, being-moved, and fascination. Vessel, Starr & Rubin (2012) showed that intense aesthetic experience activates the default-mode network — i.e., the self-referential brain — implicating self-relevance as a predictor of aesthetic response. Freedberg & Gallese (2007) demonstrated that depicted bodies engage observers' motor and somatosensory cortices via embodied simulation. The figurative body is, by all of these frameworks, a special-case stimulus: cognitively, emotionally, and motorically engaging in ways non-figurative imagery is not. The program asks: when one institution (museums) produces figurative imagery for the depicted subject's *consumption* and another (boudoir studios) produces it for the depicted subject's *commissioning*, what differs in the resulting representational distribution?

**The gaze, agency, and self-authorship.** Mulvey's (1975) account of the male gaze established that the position of the depicted subject in the image — and the apparatus that produced the image — encodes a politics. Berger (1972) anticipated this in *Ways of Seeing*: women in the European canon are depicted as available to be looked at, men as actors. bell hooks (1992), in "The Oppositional Gaze," extended Mulvey by analyzing the Black female spectator's relationship to a canon that does not depict her. The boudoir genre is anomalous within these frames: the depicted woman is also the commissioning party, and frequently the only intended viewer. The program treats this commissioning–depiction collapse as the genre's distinguishing structural feature.

**Photography as democratization of pictorial authority.** Sontag (1977), Barthes (1981), Tagg (1988), and Sekula (1986) established the critical infrastructure for treating photography's expansion as a historical process — the camera makes pictorial authority cheap, distributable, and available to constituencies the canonical art apparatus excluded. The boudoir industry sits inside that arc as one of its current expressions. Drenten, Gurrieri & Tyler (2020) and Marwick (2015) document the social-media-era extension of the same democratization. Lawler's (2020) historical analysis of 1980s boudoir how-to guides shows that the genre's commercial form predates the social-media phase by several decades.

**The four-axes synthesis.** Mike West's PeopleAnalyst program treats sex, work, learning, and religion as load-bearing universal human features, with each domain producing characteristic institutional and aesthetic forms. The boudoir industry sits at the intersection of the sex axis (the depicted body is sexual) and the commissioned-devotion axis (the subject pays to be seen seriously) — operating in the participatory-aesthetic mode (the subject is also the author). This synthesis is the program's organizing frame and is developed in the literature review.

## 5. Risks and limitations

- **Selection bias.** Studio websites are marketing surfaces; in-room practice may diverge. The program studies *publicly mediated representation*, not boudoir practice in toto.
- **Cloudflare and robots.txt coverage gaps.** Some studios block scraping or use anti-bot infrastructure. Phase 2 explicitly accepts coverage gaps rather than fight them. Per `03-methodology.md` §6, post-stratification weights or sensitivity analysis address bias from missingness where the missingness pattern is interpretable.
- **Geographic scope.** The program limits to U.S. studios. International expansion is a clean follow-on but out of scope for the headline study.
- **Demographic-vs-aesthetic conflation.** "Cultural representation" along demographic dimensions does not exhaust what aesthetic representation can mean. The program is explicit that it measures one operationalization, not the full concept.
- **Gatekeeper-vs-participant epistemic gap.** Critical art-historical reading and participant self-description disagree systematically on what boudoir is. The program does not attempt to adjudicate; the comparison is framed in measurable representational terms, with the qualitative gap documented in Paper C.
- **Image-side legal exposure.** Phase 2 imagery is rate-limited, robots-strict, never persisted as bytes, and used only for feature extraction and embedding. Aggregate cluster diagrams use anonymized exemplars; no studio is identifiably depicted in publication without explicit written permission.

## 6. Ethics and IRB framing

No human subjects beyond the website operators are studied. Public commercial websites are the data source; the inclusion criteria require an active public-facing portfolio. The Common Rule (45 CFR 46) does not extend to publicly available commercial-website content; nonetheless, the program adopts conservative practice:

- All data collection respects robots.txt and standard rate-limiting conventions.
- The user agent identifies the program and provides a contact email.
- No image bytes are persisted; only features, embeddings, hashes, and source URLs.
- No identifiable studio appears in user-facing publication without explicit written permission.
- Aggregate findings are released; no individual studio's marketing posture is held up for public ridicule. Stated-vs-revealed gap reporting names cluster patterns, not specific studios.
- The program's findings will be shared with at least a sample of studios that opt in to receive them, in accordance with research-ethics best practice for commercial subjects.

## 7. Timeline and resources

| Phase | ASNs | Estimated duration | Cost ceiling |
|-------|------|--------------------|--------------|
| 1 — Scaffolding | ASN-668 | 1–1.5 work days | $0 (synthesis only) |
| 2 — Discovery + corpus | ASN-669, ASN-670 | 3–4 work days | <$200 (API + crawl infrastructure) |
| 2 — Positioning analysis | ASN-671 | 1 work day | ~$300 (Haiku per studio) |
| 2 — Headline study | ASN-672 | 2 work days | $0 (analysis on existing data) |
| 3 — Image study (contingent) | ASN-673 | 2 work days | ~$1,500 (Haiku + CLIP per studio) |
| Publication | ASN-674 | 1.5 work days | $0 |

Total cost ceiling under $2,000, dominated by Phase 3. Wall-clock time is 8–12 work days excluding peer review.

## 8. Out of scope for this proposal

- Non-U.S. studios. International comparative work is a natural follow-on once the U.S. baseline is published.
- In-room ethnographic fieldwork. The program treats publicly mediated representation as the unit of analysis.
- Customer-side research (who books boudoir, why, what they do with the images). A clean follow-on study but separately scoped.
- Pricing-elasticity or business-model analysis. Adjacent but not relevant to the cultural-representation question.
- Adjudication between gatekeeper and participant readings. The program documents the gap; it does not resolve it.

## References (selected; full list in `01-literature-review.md`)

- Aliaga, V. P., & Pelegrín, A. (2024). Representation of Peruvian women's identity through boudoir photography. *Atlantis Press Conference Proceedings*.
- Barthes, R. (1981). *Camera lucida: Reflections on photography* (R. Howard, Trans.). Hill & Wang. (Original work published 1980)
- Berger, J. (1972). *Ways of seeing*. BBC / Penguin.
- Berlyne, D. E. (1971). *Aesthetics and psychobiology*. Appleton-Century-Crofts.
- Drenten, J., Gurrieri, L., & Tyler, M. (2020). Sexualized labour in digital culture: Instagram influencers, porn chic and the monetization of attention. *Gender, Work & Organization*, 27(1), 41–66. https://doi.org/10.1111/gwao.12354
- Freedberg, D., & Gallese, V. (2007). Motion, emotion and empathy in esthetic experience. *Trends in Cognitive Sciences*, 11(5), 197–203.
- hooks, b. (1992). The oppositional gaze: Black female spectators. In *Black looks: Race and representation* (pp. 115–131). South End Press.
- Ingraham, C. (2008). *White weddings: Romancing heterosexuality in popular culture* (2nd ed.). Routledge.
- Lawler, M. (2020). Reconstructing visual economies: Boudoir photography "how to" guides in 1980s US & UK. (Working paper / academia.edu)
- Marwick, A. E. (2015). Instafame: Luxury selfies in the attention economy. *Public Culture*, 27(1), 137–160.
- Menninghaus, W., Wagner, V., Wassiliwizky, E., Schindler, I., Hanich, J., Jacobsen, T., & Koelsch, S. (2019). What are aesthetic emotions? *Psychological Review*, 126(2), 171–195. https://doi.org/10.1037/rev0000135
- Mulvey, L. (1975). Visual pleasure and narrative cinema. *Screen*, 16(3), 6–18.
- Pollock, G., & Parker, R. (1981). *Old mistresses: Women, art and ideology*. Pantheon.
- Reilly, M. (2018). *Curatorial activism: Towards an ethics of curating*. Thames & Hudson.
- Sekula, A. (1986). The body and the archive. *October*, 39, 3–64.
- Silvia, P. J. (2005). Emotional responses to art: From collation and arousal to cognition and emotion. *Review of General Psychology*, 9(4), 342–357.
- Smith, S. L., Choueiti, M., & Pieper, K. (2025). *Inequality in 1,800 popular films: Examining portrayals of gender, race/ethnicity, LGBTQ+ & disability across 17 years*. USC Annenberg Inclusion Initiative. https://aii.annenberg.usc.edu/reports
- Sontag, S. (1977). *On photography*. Farrar, Straus & Giroux.
- Tagg, J. (1988). *The burden of representation: Essays on photographies and histories*. University of Massachusetts Press.
- Vessel, E. A., Starr, G. G., & Rubin, N. (2012). The brain on art: Intense aesthetic experience activates the default mode network. *Frontiers in Human Neuroscience*, 6, 66. https://doi.org/10.3389/fnhum.2012.00066
- Vrbová, K. (2024). Slovak women's use of boudoir photography offline and online (Master's thesis, Malmö University).
