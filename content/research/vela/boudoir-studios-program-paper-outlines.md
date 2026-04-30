# Paper Outlines

**Program:** Boudoir Studio Research Program
**Companion docs:** `README.md`, `00-research-proposal.md`, `01-literature-review.md`, `03-methodology.md`

This document outlines three planned publications drawn from the program's findings. Paper A (the headline census) and Paper B (stated-vs-revealed positioning) are peer-reviewed empirical articles. Paper C is a serious-press essay carrying the participatory-aesthetic frame to a non-academic audience. The Vela-magazine version of Paper C is the *Be in the Art, Be Art* article scoped under ASN-674.

The outlines are at draft-skeleton level: section headings, key contents, expected figures and tables. Word counts are target ranges. Final form is determined after Phase 2 results land.

---

## Paper A: *Cultural Representation in American Boudoir Studios vs. American Art Museums: A Census Comparison*

**Target venue:** *Empirical Studies of the Arts* (Sage), or *Poetics* (Elsevier). Both venues publish quantitative empirical aesthetics with cross-institutional comparison.
**Target length:** 8,000–10,000 words (journal-standard).
**Authorship:** Mike West, principal. Vela research-program collaborators on the instrument and museum-side dataset. Co-authorship to be settled after analysis.
**Submission target:** Within 6 weeks of ASN-672 completion.

### Abstract (~250 words)

The U.S. art-museum canon has been extensively critiqued for its under-representation of women, non-white, and non-young-adult subjects. A parallel commercial figurative-image industry — boudoir photography studios — produces hundreds of thousands of figurative images annually, almost entirely of women, predominantly commissioned by the depicted subject. No prior work has compared the two surfaces along common representational dimensions. This study censuses 1,500–3,000 U.S. boudoir studios via website rhetoric and (where available) portfolio imagery, and compares the resulting representational distribution against a canonical-museum-imagery census produced with the same instrument. We find [direction-pending Phase 2] that the boudoir corpus is closer to U.S. Census 2020 distributions than the museum corpus on body type and age depicted; on Fitzpatrick skin-tone distribution, the corpora differ in pattern but not in overall deviation magnitude. We discuss the implications for theories of canonical exclusion, the participatory turn in figurative representation, and the empirical bases for cultural-representation claims. Methodologically, we contribute a schema-parity protocol for comparing institutional figurative-image surfaces using a single LLM-vision-based coding instrument with prompt-version stamping and Cohen's κ inter-rater reliability validation.

### 1. Introduction (~1,500 words)

- Open with the problem framing: the figurative-art canon has been critiqued for representational narrowness; commercial figurative photography has not been studied as a comparator.
- Establish stakes: cultural-representation claims about *who is depicted* in U.S. visual culture have proceeded almost entirely through canonical-institution data. The non-canonical commercial-photography industry is large and structurally different.
- Cite the canonical-exclusion empirical literature (Topaz et al. 2019; Reilly 2018; Pollock & Parker 1981) and the comparable film-industry methodological literature (Smith, Choueiti & Pieper 2025).
- State the headline question and the predicted direction.
- Preview the methodological contribution (schema-parity LLM-vision coding) and the substantive finding.

### 2. Related work (~1,200 words)

- Compressed version of `01-literature-review.md` §§4, 5, 7. Specifically:
  - The canonical-museum representation literature (Topaz; Pollock & Parker; Reilly).
  - The boudoir-industry literature (Lawler; Aliaga & Pelegrín; Vrbová; Gill).
  - The Annenberg-Initiative methodological template (Smith et al.) and its prior application to museums (Topaz et al.).
- Identifies the gap: no prior cross-institutional figurative-image-surface comparison in the U.S. context.

### 3. Methods (~1,800 words)

- **Sampling frame: museum side.** Vela `census_analyses` table — its provenance, imagery sources (ARTIC, Met, BnF, Smithsonian, Europeana), filter criteria, sample size.
- **Sampling frame: studio side.** Discovery pipeline (ASN-669): Google Places, Yelp, photography directories, SERP probes. Inclusion criteria (commercial; U.S.-based; primary public-facing portfolio; not a tutorial / blog / influencer; not a chain franchise). Final analytical sample size.
- **Instrument.** `lib/research/vision-analyzer.ts` v3, with prompt-version stamp. Codebook in `lib/research/census-types.ts`. Fields used in this paper: subject_skin_tone, subject_gender_presentation, subject_body_type, subject_age_depicted, subject_pose_orientation, figure_count, cultural_tradition_depicted, orientalism_flag, multiple_skin_tones.
- **Reliability.** Hand-coded 50-image validation subsample per corpus; Cohen's κ per field; both corpora exceed 0.6 threshold (or report which fields do not).
- **Statistical analysis.** Chi-square goodness-of-fit per dimension against U.S. Census 2020 reference distributions; Cramér's V; bootstrap CIs on deviation-magnitude differences.
- **Pre-registration.** Reference the OSF / publicly archived pre-registration document derived from `03-methodology.md`.

### 4. Results (~1,800 words; will be the largest section)

- **Section 4.1.** Skin-tone distribution: museum vs. boudoir vs. U.S. Census 2020 reference. **Figure 1.** Stacked-bar comparison.
- **Section 4.2.** Body-type distribution: same comparison. **Figure 2.**
- **Section 4.3.** Age-depicted distribution: same comparison. **Figure 3.** This is predicted to be the sharpest finding.
- **Section 4.4.** Gender-presentation and figure-count: framing comparators (the boudoir corpus is by construction women-dominant; the museum corpus is more mixed).
- **Section 4.5.** Cultural-tradition depicted and orientalism flag: post-stratified across museum source provenance for interpretability.
- **Section 4.6.** Aggregate deviation-magnitude comparison. **Table 1.** Per-dimension χ² and Cramér's V; final summary row of total deviation from Census reference.

### 5. Discussion (~1,500 words)

- Interpret the findings against the program's pre-registered hypotheses.
- Discuss what "more representative" means and does not mean. The program does not claim aesthetic superiority; it claims demographic-representational difference.
- Locate findings inside the canonical-exclusion literature: the boudoir industry, despite its commercial postfeminist framing, sits outside the apparatus that Pollock & Parker (1981) and Reilly (2018) critique. What it does and doesn't fix in that apparatus.
- Discuss the gatekeeper-vs-participant epistemic gap: the same data can be read as evidence for the genre's substantive cultural work, or as evidence of a commercially-driven coincidence with demographic representativeness. The data does not adjudicate; it constrains the rhetorical positions both readings can occupy.
- Note that the comparison is between two figurative-image surfaces, not between two institutional types in toto. Museums also produce non-figurative work; boudoir studios sometimes shoot couples, families, and maternity.

### 6. Limitations (~600 words)

- Selection-frame bias on the studio side (discoverable studios over-represent search-engine-optimized studios, urban studios, etc.).
- Image-side coverage gaps from Cloudflare and robots-blocked studios.
- Website-mediated representation is not equivalent to in-room practice; Paper B and adjacent ethnographic work would be needed to address this.
- The U.S. Census reference category for body type and age depicted requires operationalization that necessarily involves judgment calls; sensitivity analysis with alternative bin definitions is reported in supplementary materials.
- Image-side analysis (Phase 3) may not have shipped at submission time; the paper will note this and either include the image-side analysis or note its absence and the implications.

### 7. Conclusion (~400 words)

- The headline finding restated.
- Implications for the broader cultural-representation discourse — particularly that the canonical-museum literature's framing of the representational problem may benefit from cross-institutional comparators rather than within-canon historical-trend analysis alone.
- A note on what the program will pursue next (Paper B, Paper C, possible international comparators).

### Appendices

- **Appendix A.** Pre-registered hypothesis document (verbatim).
- **Appendix B.** Codebook (`lib/research/census-types.ts` + applied prompt versioning).
- **Appendix C.** Inter-rater reliability per field, both corpora.
- **Appendix D.** Per-state distribution of the boudoir corpus (Map figure + table).

### Expected figures and tables

- Figure 1. Skin-tone distribution comparison.
- Figure 2. Body-type distribution comparison.
- Figure 3. Age-depicted distribution comparison.
- Figure 4. Geographic distribution map of the boudoir corpus.
- Figure 5 (if Phase 3 ships). Cluster diagram.
- Table 1. Per-dimension χ² and Cramér's V.
- Table 2. Codebook field-by-field IRR.

---

## Paper B: *Stated and Revealed: Aesthetic Positioning in U.S. Boudoir Photography Studios*

**Target venue:** *Poetics* or *Visual Studies* (Taylor & Francis). Both publish mixed-methods analysis of cultural-industry positioning.
**Target length:** 6,000–8,000 words.
**Authorship:** Mike West, principal.
**Submission target:** Concurrent with or following Paper A.

### Abstract (~250 words)

This paper analyzes the positioning rhetoric and visual repertoire of U.S. boudoir photography studios at scale. Using a controlled-vocabulary codebook applied via LLM to the website copy of [N] studios, we identify [latent class count] stable archetypes — *empowerment*, *partner-gift*, *bridal*, *classical-fine-art*, *lingerie-commercial* — distinguished by audience addressed, emotional register, body-politics signal, and subject-authorship framing. We then apply the same vision instrument used in Paper A to portfolio imagery from a stratified sample of these studios, embed the images via CLIP, and cluster studios in image-space. The cross-reference between *stated* archetype and *revealed* visual cluster reveals [direction-pending Phase 3]: [headline] studios marketing the *empowerment* archetype split between two visual clusters — one consistent with the rhetoric and one consistent with the *partner-gift* visual repertoire. Classification accuracy of stated archetype from visual cluster is [number]. We discuss what this gap means for postfeminist-sensibility theory (Gill 2007, 2017), for the consumer in search of a particular kind of session, and for the methodological generalization of the stated-vs-revealed audit to other consumer-photography sectors.

### 1. Introduction (~1,200 words)

- Open with the methodological observation: marketing rhetoric and product reality often diverge in ways consumers cannot easily verify.
- Frame the boudoir industry as a case where the gap is empirically measurable.
- Cite Gill (2007, 2017) on postfeminist-sensibility self-misrepresentation.
- State the question: does stated archetype predict revealed visual cluster? At what classification accuracy?
- Preview the methodological contribution: a generalizable stated-vs-revealed audit framework.

### 2. Related work (~1,000 words)

- Compressed §§5 and 6 of `01-literature-review.md`.
- Specifically: postfeminist-media-culture literature; the wedding-industrial-complex literature; the Drenten/Gurrieri/Tyler work on aestheticized labor.

### 3. Methods (~1,500 words)

- Studio sample (carry forward from Paper A).
- Positioning codebook: archetype, audience addressed, emotional register, body-politics signal, producer-gender claim, price tier, subject-authorship framing. (See `03-methodology.md` §3 for full codebook with allowed values.)
- Latent class analysis on positioning fields.
- Image sampling: ≤12 portfolio images per studio, fetched per ASN-673 protocol.
- Image classification using `lib/research/vision-analyzer.ts` v3 (same instrument as Paper A).
- CLIP embedding; HDBSCAN clustering.
- Cross-reference: multinomial logistic regression of stated archetype on cluster membership; classification accuracy + confusion matrix.

### 4. Results — stated positioning (~1,200 words)

- LCA results: number of classes, BIC, entropy. **Table 1.** Class-conditional probabilities for each codebook field.
- Class-prevalence variation by region (state, U.S. Census region) and by parsable price tier. **Figure 1.** Class prevalence map.
- Validation against IRR sample.

### 5. Results — revealed positioning (~1,200 words)

- Image-cluster results: number of clusters, silhouette coefficient. **Figure 2.** Cluster scatter (UMAP-projected).
- Cluster characterization: representative anonymized exemplars, mean visual-feature profile per cluster. **Table 2.**

### 6. Results — stated vs revealed (~1,000 words)

- Crosstab: stated archetype × revealed cluster. **Figure 3.** Sankey or alluvial diagram.
- Multinomial-logistic classification accuracy. **Table 3.** Confusion matrix.
- Identify the stated-archetype categories that split most cleanly across revealed clusters; interpret.

### 7. Discussion (~1,200 words)

- Interpret stated-vs-revealed gap inside postfeminist-sensibility theory (Gill).
- Locate the *empowerment*-archetype split inside the broader question of marketing-vs-practice in commercial visual industries.
- Discuss generalizations: the audit framework applies to wedding photography, family portraiture, brand photography, executive headshots, etc.
- Note implications for consumers who use marketing rhetoric to choose a studio.

### 8. Limitations (~500 words)

- Studio-portfolio bias: studios curate their portfolios; the visual repertoire on the website is not the visual repertoire of the practice.
- LCA solution stability under alternative codebook formulations.
- HDBSCAN cluster boundaries; sensitivity to embedding model (CLIP vs alternatives).
- Phase 3 dependency: Paper B is publishable on the stated side alone if Phase 3 ships partially.

### 9. Conclusion (~400 words)

### Appendices

- **Appendix A.** Full codebook.
- **Appendix B.** Latent class analysis fit statistics.
- **Appendix C.** Cluster characterization tables.
- **Appendix D.** Studio outreach protocol for any identifiably-displayed studio.

---

## Paper C: *Be in the Art, Be Art* — essay version

**Target venue (serious-press):** *n+1*, *The Atlantic Ideas*, *NYRB*, *The Point*, *The Yale Review*. Choice depends on the editorial-fit conversation Mike has with each venue's editors.
**Vela magazine version:** Article 3 in ASN-674, written to Vela voice (`docs/magazine/VELA-MAGAZINE-VOICE.md`).
**Target length (essay):** 5,000–7,000 words for serious-press; 1,800–2,500 words for the Vela version.

### Working thesis

The boudoir industry does, at scale, what figurative art has historically done in canonical institutions: it depicts the human body with deliberate aesthetic intent. The art establishment's habitual dismissal of the genre repeats a pattern visible across two centuries of new figurative forms — photography itself, the Impressionists, Pop, graffiti — in which the establishment is reliably wrong about what counts in the moment and reliably late to admit it. The historically interesting question is not whether boudoir is art (the answer to that question changes on a 30–50 year delay), but what boudoir's existence says about the contemporary cultural relationship to depiction itself. The answer is that participation has overtaken spectatorship as the dominant aesthetic mode. People no longer want only to look at art; they want to be in the art, to be the art. The boudoir studio is one institutional surface where that desire becomes empirically visible.

### Section-level outline (serious-press version, ~5,500 words)

1. **Opening (~600 words).** Specific physical observation: a woman entering a boudoir studio for her session. Resist the urge to explain; let the scene render. End the section on a single sentence that names the cultural question without resolving it.
2. **The dismissal pattern (~900 words).** The art establishment's reliably wrong reception of new figurative forms. Photography in the 1840s. The Impressionists at the Salon. Pop in the 1960s. Graffiti in the 1980s. Each case, briefly. The pattern: dismissed → recuperated → canonized → naturalized.
3. **What the data say (~1,200 words).** Bring the empirical findings from Papers A and B forward, but in narrative not statistical register. The boudoir corpus closer to U.S. demographic distributions than the museum corpus; the stated-vs-revealed gap that complicates an unconditional empowerment reading. The data is not rhetorically convenient for either side — that is its value.
4. **The participatory turn (~1,000 words).** The 20th-century mass-media regime trained audiences. The post-streaming regime trains performers. From reality TV through OnlyFans to boudoir studios, people are not just consuming aesthetic objects; they are commissioning themselves into them. Cite Jenkins, Marwick, Drenten et al. — but lightly, the way an essayist cites a sociologist. The point is to name the shift, not to lecture about it.
5. **Be in the art, be art (~900 words).** The deepest read. The participatory turn is not narcissism, though it has narcissistic expressions. It is, on a longer view, a recovery of the pre-canonical condition in which most figurative imagery was *of* its commissioning subject — patron portraits, wedding pictures, the family album. The 20th-century museum-canonical mode was the historical anomaly. The boudoir industry is one of several contemporary surfaces returning the figurative image to its older configuration: the depicted subject is also the commissioning party.
6. **The gatekeeper read and the participant read (~700 words).** Both are partial. The gatekeeper read sees commercial kitsch and a coopted feminism. The participant read sees agency and self-authorship. The data documents both; the disagreement does not resolve from inside either frame. What matters historically is that the disagreement is exactly the form the dismissal-then-canonization pattern takes during its dismissal phase.
7. **Closing (~200 words).** Return to the opening scene. The reader does not need a verdict. The reader needs to have been somewhere — having read this — that they cannot easily leave.

### Vela magazine version (~2,000 words; ASN-674 Article 3)

The Vela version is shorter, in second-person voice, and follows `docs/magazine/VELA-MAGAZINE-VOICE.md`:

- Opens in a specific physical or sensory moment — not a scene-setting paragraph.
- Names what is usually unnamed about the contemporary participatory-aesthetic shift.
- Moves through the historical pattern (dismissal-then-canonization) without naming it as a pattern; demonstrates it through specific cases.
- Arrives at a recognition the reader can carry — what it means to want to be in the art, not just to look at it.
- Ends in image, not in conclusion.

The Vela version cites no scholarship; the framework operates invisibly. The reader senses the thinking without seeing the apparatus.

### Editorial fit notes

- *n+1* is the strongest fit for the serious-press version: long-form, theoretically literate, comfortable with cultural-criticism arguments grounded in empirical work, willing to publish heterodox readings of contemporary phenomena.
- *The Atlantic Ideas* is a plausible fit if the empirical findings are framed as a stand-alone story rather than as essay-with-data.
- *NYRB* is the most prestigious fit but slowest and most editorially conservative.
- *The Point* and *The Yale Review* are well-suited if the cultural-criticism essay frame outweighs the empirical-research frame.

### Cross-publication

Per Mike's range-showcase posture, a version of Paper C cross-publishes to PeopleAnalyst with the empirical apparatus more fully visible — closer to a long-form research-report style. The PeopleAnalyst version is a separate writing pass, not a copy.
