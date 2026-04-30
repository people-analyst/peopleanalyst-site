# Methodology and Statistical Plan

**Program:** Boudoir Studio Research Program
**Companion docs:** `README.md`, `00-research-proposal.md`, `01-literature-review.md`, `02-paper-outlines.md`

This document operationalizes the program's research questions, defines the comparator corpora, specifies the codebooks and instruments, and pre-registers the statistical tests. Pre-registration is fixed at the time of Phase 1 sign-off; deviations during Phase 2 are documented in a deviation log committed alongside the final analysis.

---

## §1. Operationalizing "culturally representative"

The program treats *cultural representation* as decomposable into measurable dimensions, each of which can be operationalized given the data available. The composite concept is not a single metric; it is a vector of dimension-wise comparisons against a reference distribution.

The program operationalizes cultural representation along **eight dimensions**, organized into three families:

### Subject-side demographic dimensions

These describe the subjects depicted in the imagery.

1. **Skin tone (Fitzpatrick-style bins).** Allowed values: `very_light`, `light`, `medium`, `medium_dark`, `dark`, `very_dark`, `stylized`, `unclear`. (Schema source: `lib/research/census-types.ts`.) Per ANALYSIS_PROMPT_VERSION v3 (ASN-272), the `stylized` label is reserved for cases where no readable modeled flesh exists — paintings, photos, sculpture with lifelike flesh commit to the closest representational bin. Reference distribution for U.S. comparison: U.S. Census 2020 race/ethnicity tabulations, mapped via a documented Fitzpatrick × Census-race correspondence (the mapping is imperfect and the mapping document is published as Appendix C of Paper A).
2. **Body type.** Allowed values: `thin`, `average`, `full`, `muscular`, `unclear`. Reference distribution: CDC NHANES adult-female body composition data, mapped to the four categories via documented BMI-band correspondence.
3. **Age depicted.** Allowed values: `child`, `adolescent`, `young_adult`, `middle_adult`, `older_adult`, `unclear`. Reference distribution: U.S. Census 2020 adult-female age distribution. The boudoir corpus is bounded to adults by the inclusion criteria.
4. **Gender presentation.** Allowed values: `feminine`, `masculine`, `androgynous`, `unclear`, `none`. Used as a corpus-balance check rather than a primary representation dimension; the boudoir corpus is feminine-dominant by construction.

### Subject-relational dimensions

These describe the depicted subject's relation to the apparatus and the viewer.

5. **Pose orientation.** Allowed values: `active`, `passive`, `neutral`, `unclear`. The Berger / Mulvey literature predicts canonical museum-canonical figurative work to skew passive; the boudoir prediction is mixed.
6. **Gaze.** Allowed values: `direct`, `averted`, `downcast`, `closed`, `obscured`, `unclear`. Direct gaze was historically minority-positioned in the European canon; the boudoir prediction is direct-gaze majority.
7. **Figure count.** Allowed values: `one`, `two`, `small_group`, `large_group`, `unclear`. The boudoir corpus is one-figure-dominant by construction.

### Cultural-tradition dimensions

These describe the cultural register the imagery occupies.

8. **Cultural tradition depicted.** Allowed values: 21 values per `lib/research/census-types.ts` (`western_european`, `north_american`, `latin_american`, `west_african`, `east_african`, `north_african`, `sub_saharan_african`, `east_asian`, `south_asian`, `southeast_asian`, `central_asian`, `middle_eastern`, `oceanic`, `indigenous_american`, `ancient_mediterranean`, `ancient_near_eastern`, `ancient_egyptian`, `nordic`, `eastern_european`, `multiple`, `unclear`). The boudoir corpus, as a contemporary U.S. commercial industry, is expected to cluster heavily in `north_american` and `western_european`. The museum corpus is expected to span more broadly given its encyclopedic-collection sourcing. This dimension is reported with care: the comparison highlights that *museums* are the more globally-cultural institution on this specific axis, even as they are the less demographically-representative on the subject-side dimensions.
9. **Orientalism flag.** Boolean: `true` where Western Orientalist visual conventions (spectacle, exoticized non-Western subject) are present. Predicted higher in the museum corpus; predicted near-zero in the boudoir corpus.

### What the operationalization does not claim

The eight dimensions do not exhaust *cultural representation* as a concept. They constitute one quantitative operationalization grounded in the existing instrument and the existing literature. The program is explicit (in Paper A §5 and Paper A §6) that:

- Aesthetic-quality dimensions are not measured here.
- Subject-side autonomy and consent are not directly measurable from imagery alone; the positioning analysis (RQ-B2) addresses subject-authorship rhetorically.
- Long-tail dimensions (e.g., visible disability) are coded only where the instrument supports it. For visible disability, the program adds a separate Phase 2 coding pass (see §4 below).

## §2. Comparator corpora — schema parity

### Museum-side comparator: `census_analyses`

The museum-side data lives in Vela's `census_analyses` table, populated by `lib/research/vision-analyzer.ts` with prompt version v3 (ASN-272). Source imagery comes from licensed museum APIs (Art Institute of Chicago CC0, Met CC0, BnF varies, Smithsonian, Europeana varies). The sample is curated for figurative content and includes provenance metadata.

For Paper A, the museum-side analytical sample is filtered to:
- `has_human_figure = true`
- Images sourced from U.S.-collected provenance (i.e., depicted in U.S. museum collections regardless of artist origin), to keep the comparator a U.S. cultural-institution sample rather than a global art-history sample. (This filter is committed as a pre-registered choice; sensitivity analysis with the unfiltered sample is reported in supplementary materials.)

### Studio-side corpus

For Paper A, the boudoir-side analytical sample is constructed as follows:
- **Studios:** All studios with `inclusion_review = 'included'` in `boudoir_studios_research` (ASN-669).
- **Imagery (Phase 3 dependency):** Up to 12 portfolio images per studio, fetched per ASN-673 protocol; the analytical pool is the union.
- **Filter:** `has_human_figure = true` (the same filter applied on the museum side).

If Phase 3 has not shipped at the time of Paper A submission, Paper A reports the *positioning-side* (rhetorical) cultural-representation findings and explicitly notes the absence of image-side evidence. The image-side analysis is added as an addendum once ASN-673 ships.

### Schema parity

Both corpora are coded with `lib/research/vision-analyzer.ts` v3, with identical `ANALYSIS_PROMPT_VERSION` stamping. Field-level definitions are taken verbatim from `lib/research/census-types.ts`. No re-coding of the museum side is required.

Where the boudoir-side rhetorical (positioning) data is used as a stand-in for image-side evidence (in the absence of Phase 3), the substitution is explicit and the limitations section documents the implications.

## §3. Codebook — positioning analysis (RQ-B2)

The positioning codebook is applied to website copy by Claude Haiku via `lib/research/boudoir-studios/positioning-analyzer.ts` (ASN-671). Each studio receives one positioning record per coding pass; multiple coding passes produce multiple version-stamped records.

| Field | Type | Allowed values |
|-------|------|----------------|
| **archetype** | array of enum | `empowerment`, `partner_gift`, `bridal`, `maternity`, `body_acceptance`, `classical_fine_art`, `lingerie_commercial`, `sensual_implied`, `nude_artistic`, `confessional_personal`, `couples_intimate`, `editorial_high_fashion` |
| **audience_addressed** | array of enum | `self_authoring_subject`, `partner_recipient`, `bride`, `mother`, `survivor`, `general_woman`, `couple`, `senior`, `lgbtq_explicit` |
| **emotional_register** | enum | `aspirational_confident`, `tender_intimate`, `playful_flirty`, `serious_artistic`, `therapeutic_healing`, `celebratory_milestone` |
| **body_politics_signal** | array of enum | `body_inclusive_explicit`, `body_inclusive_implicit`, `body_neutral`, `body_idealized`, `not_addressed` |
| **producer_gender_claim** | enum | `woman_owned_explicit`, `woman_owned_implicit`, `not_stated`, `not_woman_owned` |
| **price_tier** | enum (nullable) | `under_500`, `500_1500`, `1500_3500`, `3500_plus` |
| **subject_authorship_framing** | enum | `subject_authors_strong`, `subject_authors_implied`, `mixed`, `photographer_authors`, `not_addressed` |

Field-level definitions are documented in full in `docs/research/boudoir-studios-program/positioning-codebook.md`, produced as part of ASN-671. The codebook is version-stamped and changes are tracked in the codebook's changelog.

## §4. Pre-registered hypotheses and statistical tests

The hypotheses below are pre-registered before Phase 2 data collection. Each hypothesis specifies the test, the directional prediction, and the alpha threshold.

**H1 (corresponds to RQ-B1, primary).** The boudoir corpus is closer to U.S. Census 2020 reference distributions than the museum corpus on body type and age depicted, measured as the magnitude of dimension-wise χ² goodness-of-fit deviation.
- Test: bootstrap CI on the difference *(museum-corpus deviation magnitude) − (boudoir-corpus deviation magnitude)*, per dimension.
- Directional prediction: difference > 0 for body type and age depicted.
- Alpha: 0.05; deviations corrected for multiple testing across the eight dimensions using Benjamini–Hochberg.

**H2 (corresponds to RQ-B1, primary).** On Fitzpatrick skin-tone distribution, the corpora differ in pattern but the deviation-magnitude difference is non-directional or smaller than for H1's dimensions.
- Test: same bootstrap CI; explicitly two-sided.

**H3 (corresponds to RQ-B1, secondary).** The museum corpus exhibits a higher Orientalism-flag prevalence than the boudoir corpus.
- Test: two-proportion z-test; one-sided (museum > boudoir).
- Alpha: 0.05.

**H4 (corresponds to RQ-B1, secondary).** The boudoir corpus exhibits a higher direct-gaze proportion than the museum corpus.
- Test: same; one-sided (boudoir > museum).

**H5 (corresponds to RQ-B2).** Latent class analysis on the positioning codebook fields identifies 4–6 stable classes. Stability assessed via BIC, entropy ≥ 0.7, and bootstrap class-replicability.

**H6 (corresponds to RQ-B2).** Class membership varies with U.S. Census region and (where parsable) price tier.
- Test: multinomial logistic regression of class membership on region and price tier; likelihood-ratio test.

**H7 (corresponds to RQ-B3, contingent on Phase 3).** Stated archetype predicts revealed visual cluster at classification accuracy in the range 0.55–0.75.
- Test: held-out classification accuracy from multinomial logistic regression of stated archetype on cluster membership.
- Directional prediction: accuracy is materially above chance (1 / number of archetypes) and materially below 1.0.

**H8 (corresponds to RQ-B3, contingent on Phase 3).** Studios marketing the *empowerment* archetype split between at least two visual clusters, with cluster split ratios non-trivially imbalanced (i.e., the split is structural, not random).
- Test: chi-square on the empowerment-stated × cluster crosstab; Cramér's V for effect size.

The pre-registration document is committed as `docs/research/boudoir-studios-program/preregistration.md` at the moment of Phase 1 sign-off and is not modified thereafter except via a documented amendment.

## §5. Sampling design and inter-rater reliability

### Studio sampling

The discovery pipeline (ASN-669) draws candidates from four independent sources:
1. Google Places (text search by city, filter by category).
2. Yelp (category + location).
3. Photography directories (PPA member directory, regional photographer associations, *Rangefinder* directory where accessible).
4. SERP probes ("boudoir photographer <city>" — top 10 organic per city seed).

Across-source dedup is by normalized website domain → studio_name fuzzy match → lat/lng radius. Inclusion criteria (auto-applied where unambiguous; queued for manual review otherwise):
- Commercial business with active public-facing portfolio.
- U.S.-based.
- Not a photography tutorial / blog / influencer.
- Not a chain franchise (chain photography studios with ≥10 locations are excluded as institutionally distinct from the independent-studio category the program studies).

Target inventory: 1,500–3,000 unique studios. Final analytical N is determined by inclusion-pass results.

### Image sampling (Phase 3, contingent)

≤12 portfolio images per studio, sampled by:
1. Homepage hero / featured image (1, if present).
2. Top-of-page images on the portfolio / gallery page (up to 8, in display order).
3. Top images on `/about`, `/services`, `/experience` (up to 3 supplementary).

Total per-studio cap is 12. Studios with <3 fetchable portfolio images are flagged for manual review.

### Inter-rater reliability

Two independent coders (Mike + one collaborator) hand-code a stratified random sample of 50 studios per corpus. Stratification across:
- Region (4 U.S. Census regions).
- Inclusion-pipeline source (4 sources).
- (Studio side only) Stated price tier where available.

For each codebook field (vision-analyzer fields and positioning fields), Cohen's κ is computed against the LLM-coded values. Per-field κ ≥ 0.6 is the publication threshold; fields with κ < 0.6 either:
- Trigger a codebook revision and re-coding; or
- Are reported as low-reliability with the limitation explicit in the paper.

## §6. Threats to validity and mitigations

### Selection bias on the studio side

Discoverable studios over-represent search-engine-optimized studios, urban studios, and studios with recent web maintenance. The bias direction is interpretable: under-represented studios likely include older, smaller-town, lower-budget operations.

*Mitigation:* The discovery pipeline uses four independent sources designed to capture different bias profiles. Per-state distribution is checked against the IMLS-derived population baseline (commercial photography studios per state from BLS QCEW data). Post-stratification weights are applied at the analysis stage where the bias-distribution shape is interpretable.

### Coverage bias from robots.txt and Cloudflare

Some studios block scraping or use anti-bot infrastructure. The program respects all such blocks (ASN-670 and ASN-673 protocols).

*Mitigation:* Coverage gaps are reported as a pre-stratified sensitivity analysis. The headline finding is robust if the directional result holds under reasonable assumptions about the blocked subpopulation's distribution.

### Image-curation bias on the studio side

Studios curate their websites; the visible portfolio is not the practice's full repertoire.

*Mitigation:* This is an unavoidable feature of website-mediated representation as the unit of analysis. The paper is explicit about it. Phase 3 cluster analysis nevertheless yields useful information about *what studios choose to display*, which is itself a substantive cultural-representation question.

### Reference-distribution validity

The U.S. Census 2020 distributions are the operational reference. They are not a perfect proxy for "what U.S. women look like in figurative imagery" — they aggregate across age in ways that may not match aesthetic-medium conventions.

*Mitigation:* The paper reports both raw deviation magnitudes and Census-aligned comparisons; the directional claim is robust where the two agree.

### LLM-instrument validity

The vision-analyzer is a Claude Haiku-based instrument. Its reliability is established in `lib/research/census-types.ts` and `docs/RESEARCH-PROGRAM.md` §RQ12, but the boudoir corpus may exhibit features the instrument was not validated against.

*Mitigation:* The IRR sample is the primary validity check. The codebook revision protocol triggers when reliability falls below threshold.

### Multiple-comparison risk

Eight dimensions × two corpora = many tests.

*Mitigation:* Benjamini–Hochberg correction across the dimension family. Headline findings (H1, H3, H4) are pre-registered as primary; secondary findings (H2, others) are explicitly secondary.

### Demographic-vs-aesthetic conflation

The program uses demographic distribution as one operationalization of "cultural representation." This is not the only operationalization.

*Mitigation:* The paper is explicit that demographic representation does not exhaust the concept. Aesthetic-register representation (e.g., does the figurative work treat its subjects with comparable seriousness?) is a separate research question that this program does not attempt.

## §7. Reproducibility and data governance

- All pipeline scripts (ASN-669..672) commit to `scripts/research/boudoir/` with documented entry points.
- Frozen results datasets ship as `data/research/boudoir-museum-comparison.json` (ASN-672) — every reported number traces to a row in this file.
- The pre-registration document is committed at the time of Phase 1 sign-off and version-controlled.
- All deviations from pre-registration during Phase 2 are logged in `docs/research/boudoir-studios-program/deviations.md`.
- Inter-rater reliability raw data ships under `docs/research/boudoir-studios-program/irr/`.
- No image bytes are persisted (per ASN-673 hard rules).
- Studio identities are anonymized in publication unless explicit written permission is obtained.

## §8. What this methodology does not commit to

- A causal claim. The program produces descriptive comparison; it does not claim that the boudoir industry's representational profile is *because of* any particular structural feature (e.g., woman ownership, postfeminist sensibility, commercial commission structure). Causal claims would require a different design.
- A normative claim about which corpus is "better." The paper reports which corpus is *closer to U.S. demographic distributions* on each measured dimension; it does not equate demographic-representational closeness with aesthetic merit.
- A defense of the boudoir industry's commercial practices. The program's framework treats both corpora as cultural-institutional surfaces with measurable representational profiles; the analysis is not a brief for or against either.
- Adjudication between the gatekeeper read and the participant read. The program documents the disagreement and constrains what each side can claim, but does not decide.

## §9. Open questions for review before Phase 2

1. **Skin-tone-to-Census-race mapping.** The Fitzpatrick × U.S. Census 2020 race correspondence is imperfect. Is the published Appendix-C mapping acceptable, or should the program adopt a different operationalization (e.g., compare against the Aesthetic Skin Tone study population baselines rather than Census)?

   **Resolved 2026-04-28 (Mike):** Appendix-C Fitzpatrick × Census mapping is good enough to get started. Open to refinement in a follow-up if reviewer feedback or sensitivity analyses surface a sharper operationalization.

2. **Body-type reference distribution.** The CDC NHANES BMI bands map imperfectly to the four-category schema. Is the published BMI-band correspondence acceptable, or should the program treat body-type comparison as descriptive only (no formal hypothesis test)?

   **Resolved 2026-04-28 (Mike):** Try both — report the formal NHANES-BMI-band hypothesis test *and* the descriptive companion analysis side-by-side. Two signals are better than one; the descriptive table guards the formal test against schema-mapping artifacts.

3. **Phase 3 timing.** Does the program ship Paper A on positioning-side evidence alone (faster) or wait for Phase 3 image-side evidence (more authoritative)? The default is the former; the alternative is documented as an option for review.

   **Resolved 2026-04-28 (Mike):** Split into two papers. Paper A: positioning-side evidence (RQ-B2 codebook against the 4,500-studio crawl) — ships fast, holds value standalone. Paper B: image-side evidence (Phase 3 classifiers — skin-tone, body-type, posture coding) — cites Paper A and extends. Standard cultural-representation citation pattern; insulates against Phase 3 timeline drift.

4. **Studio outreach.** For Vela-aligned studios identified during Phase 2/3, the program proposes an outreach protocol offering the editorial story and seeking explicit display permission. Is the protocol acceptable as drafted in `00-research-proposal.md` §6?

   **Resolved 2026-04-28 (Mike):** Accept §6 draft as-is for now. Re-evaluate after first batch of outreach attempts surfaces operational issues.

---

**Status:** All four gates resolved. ASN-672 (the headline cultural-representation comparative study) is now claimable once the boudoir crawl drains and post-crawl reclassification runs. Per #3, ASN-672 scope is now Paper A only (positioning-side); a sibling ASN should be filed for Paper B before Phase 3 image-side work begins.
