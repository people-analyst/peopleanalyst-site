---
title: "Product & Strategy Memo"
description: "What the cultural-diffusion pipeline actually buys us — which findings to ship, which to hold back, and which lines to cut from the marketing copy."
publishedAt: "2026-04-13"
status: published
authors: ["Namesake Research"]
category: review
---

# Product & Strategy Memo: What the Cultural Diffusion Pipeline Actually Buys Us

**To:** Mike (founder) and the Namesake product/eng team
**From:** Research review
**Date:** 2026-04-13
**Re:** PhD pipeline (Phases 1–11) — product implications, defensibility, and the things we should not say in the UI

---

## 1. Bottom line up front

The pipeline is a real asset, but its product value lives in three or four very specific surfaces — phonetic neighborhoods, the aspirational/cautionary split for the trending-why card, the Bass/Hawkes lifecycle badges, and the regional-popularity map — and **not** in the headline "we measured the causal impact of culture on names" framing. The variance decomposition (Phase 9) shows event characteristics explain only ~1.8% of adoption variance; the right consumer story is "we know which names *sound* like the ones you love and how long that sound stays in style," not "we predict cultural shocks." Ship the four high-evidence features, gate the trending-why card behind aspirational/cautionary attribution, and pull back the AUC=0.999 "predictability" claim before it appears anywhere a parent or journalist can see it.

---

## 2. What the research proves (product-facing)

These are the findings I'd put weight on in product copy, with the surface and the citing phase.

**(a) Phonetic neighborhoods are real and dense.** Phase 3 produced a 34M-edge graph over 43,334 names with mean within-cluster correlation of 0.233 and 422,084 significant phonetic spillover events across 1,790 clusters. Phase 8a confirms that cultural events spill onto phonetic cousins (the "Frozen lifted Elsa, Elise, Elara" mechanism). This directly supports the **"Names that sound like X" panel** (A-038) and is the single most defensible feature in the pipeline. It is also the answer to "if you like Aiden but want something rarer." No competitor builds this from CMU phonemes; substring matching is the industry default and is genuinely worse.

**(b) Search leads births by ~1–2 years, but the sign depends on attribution.** Phase 7a's headline panel-VAR shows IRF +0.0063 at h=1, decaying to ~0 by year 5. The aspirational subsamples (film, celebrity birth/naming, sports, music) show IRFs 2–7× the baseline; the news_event subsample shows **negative** IRFs at h=1–2. This is the empirical foundation for the **trending-why card** (A-009 enhancement, A-040): the card must condition on attribution and respect the sign. A name attributed to Hurricane Katrina or Caylee Anthony should be presented as "people are searching this because of news, not because they're naming children." Without that conditioning, the card is actively misleading.

**(c) Adoption is dominated by peer transmission, not broadcast.** Phase 7c's Bass fits across 60,470 names: median q (peer) = 0.088, median p (broadcast) = 0.019; 42.7% classified peer, 26.1% broadcast, 26.8% mixed. This is the evidentiary basis for the **adoption-curve / "how this name spreads" badge** (A-042). Three buckets — Broadcast / Peer / Viral — is honest given the fit distribution.

**(d) Cultural shocks decay fast.** Phase 7b: median Hawkes branching ratio 0.23, half-life 1.38 weeks (in the underlying continuous signal — annual product copy needs translation). This supports a **"staying power" indicator** (A-041), but the copy needs care: the half-life is short for the *shock*, not for the name's elevated baseline. Saying "this name will fade in two weeks" would be wrong. Saying "trends like this typically settle within a year or two" is supported.

**(e) Geographic diffusion is real, and it's weakening.** Phase 10a: Moran's I dropped from 0.51 (1960s) to 0.27 (2020s); coastal-vs-interior t=2.07, p=0.039; first adopters were coastal in 100% of the 11 top events analyzed. This supports **regional popularity badges** (A-045) and a choropleth on the profile. The "spreading southward / inland" copy is supportable on the canonical examples; do not generalize per-name claims past the 11 events actually tested without more data.

**(f) Rarity is the dominant moderator of cultural impact.** Phase 8c moderation: rarity η²=0.63, p≈0; very-common names get +0.0013 ATE, very-rare get -0.00007. This means **"this rare name will pop after a movie" is empirically wrong** — most cultural mass lands on names that already had market share. Useful for tempering tournament expectations; could justify a quiet "trending sensitivity" hint on rare names.

---

## 3. What the research suggests but doesn't yet prove

These are directionally interesting but I would not put them in user copy yet.

**(a) The "cautionary name" flag (the Karen Index).** The aspirational/cautionary sign flip in Phase 7a (news_event IRF h=2 = -0.023) is *real and strong as a panel finding*, but n=104 events in a single subsample, dominated by a handful of high-salience tragedies. **Confidence-bar:** before we surface a "cultural risk" badge on individual names, we'd want (i) a per-name cautionary flag with its own synthetic control (not just panel IRF), (ii) at least 30 attributed cautionary events with consistent sign, and (iii) tone validation from GDELT or equivalent. Right now we have a population-level result we could use to *gate* the trending-why card (don't show "rising" when the attribution is news_event), not a per-name shame badge.

**(b) Unisex names respond more strongly to cultural events.** Moderation test #6: β=0.000209, p=0.0004, but η² is implicit and the absolute effect is tiny. Worth a methodology footnote; not worth a profile badge until we replicate on a larger event set.

**(c) Coastal-first cultural diffusion.** 100% of 11 events started on the coast. That's a strong descriptive pattern but n=11. Confidence-bar: 50+ events with coastal-first classification before a "Trending first in [coast]" generalized claim ships.

**(d) Spelling-variant collapsing would change everything.** RECOMMENDATIONS.md §2c flagged this; nothing in Phases 1–11 actually does it. Aiden/Aidan/Ayden are tracked separately and the Bass/Hawkes/ATE numbers fragment across them. Before we publish per-name ATEs in dollars or percentages, the variant collapse needs to happen.

---

## 4. Red flags / over-claims

I was asked to find problems. Here they are, in descending severity.

**(a) AUC = 0.999 is a red flag, not a moat.** The predictability_ceiling result is almost certainly leakage or a degenerate test design. The base rate is 0.5% (271 of 58,409), the AR(1) baseline alone hits AUC 0.997, and the "improvement" of the full model over Top-500 is 0.017 AUC — and over AR(1) is 0.002. The honest reading is: *"prior rank predicts next rank; nothing else materially adds."* This is the opposite of what Salganik's MusicLab framework was supposed to demonstrate. It also looks dangerously like the test set leaked into the features (any feature with post-2014 information would do it). **Do not put "we predict baby name success with 99.9% accuracy" anywhere.** Journalists will pull-quote it; statisticians will dismantle it; both are bad. A defensible methodology page sentence: "Most variation in which names enter the top 100 is explained by their position the year before — cultural and phonetic features add a small but real edge."

**(b) The variance decomposition's headline number undercuts the entire premise.** Event characteristics explain 1.8% of ATE variance. Name-intrinsic features explain 53%. The cycle features have VIFs in the *millions* (multicollinearity with sin/cos of decade), which means several reported R² deltas are unstable. Two product-facing risks: (i) the "we measured cultural causation" framing the report leans on is at odds with its own variance result; (ii) the methodology page (A-044) needs to be honest that "cultural events explain X%, name characteristics explain Y%" leans toward name-characteristics, not the other way round. Lead with phonetics, treat culture as garnish.

**(c) The synthetic-control ATEs are tiny and signed mostly negative.** Phase 8a: median ATE -0.000028, only 36% of 200 events have positive ATEs, news_event and sports_moment means are negative. Saying "after Frozen, Elsa registrations rose by an estimated 340%" (the example in RESEARCH_TO_PRODUCT.md) requires you to be in the positive-ATE 36% with a known canonical example. Across the corpus, the typical event does *not* lift its name. The trending-why card needs a confidence threshold and a fallback for the majority of events whose causal estimate is null or negative.

**(d) The seven side-quest tests are all null. Don't ship them as findings.** Blockbuster paradox, villain effect, streaming lag, award timing, franchise decay, gender drift — all null-consistent. One literally errored ("test_olympic_sprint"). The honest framing is "we tested seven popular hypotheses about culture and naming; six were consistent with neutral drift, one couldn't be tested." That's a real finding for the methodology page (Lieberson partial vindication) but it kills A-043 (blockbuster paradox disclosure) as a per-name feature — there is no blockbuster paradox in this data.

**(e) BH-corrected Granger collapses from 21.5% to 1.0%.** Phase 7a's robustness section is admirably candid: 42 names survive FDR control out of 4,185. Any per-name "search predicts your name" badge should use `granger_significant_05_bh`, not the raw column, and we should expect ~1% of names to qualify — which probably means "no badge" for the vast majority.

**(f) n=200 events is small for the moderation/variance claims.** Two of nine moderation tests are significant. With n=200 and nine tests, expect ~0.5 false positives at α=0.05; we're not far above noise. The rarity moderator is so large (η²=0.63) it's almost certainly real, but the unisex result (β=0.0002) is in the regime where a single recoding decision could flip it.

---

## 5. Concrete product recommendations

Prioritized. Each: ask, evidence, effort, risk.

**P0 — Ship "Names that sound like X" (A-038).**
- *Ask:* Phonetic neighbor panel on every name profile, sortable by rarity, with 5–20 neighbors.
- *Evidence:* Phase 3 graph is built; Phase 8a confirms phonetic spillover is the actual causal mechanism for cultural events; Phase 9 says name-intrinsic features dominate.
- *Effort:* Small. Sync script + API route + component. Data exists.
- *Risk:* Low. The output is concrete, testable, and obviously useful. Worst case: some neighbors look weird and we tune the edit-distance threshold.

**P0 — Ship the trending-why card with attribution gating (A-009 enhancement / A-040).**
- *Ask:* Card shows "[Name] is rising because of [event]" only when (a) attribution confidence ≥ 0.7, (b) event_type is in the aspirational set (film, tv, celebrity, sports, music), and (c) per-event ATE is positive at p<0.10. Otherwise show a generic "interest in this name has been rising" or nothing.
- *Evidence:* Phase 7a aspirational/cautionary split; Phase 8a per-event ATEs.
- *Effort:* Small-medium. Mostly copy logic and a confidence gate.
- *Risk:* Medium. If the gate is too loose, we surface tragedies as "trending"; if too tight, the feature appears on almost no profiles. Start tight; loosen with traffic data.

**P1 — Ship Bass adoption-curve badge (A-042) and Hawkes staying-power indicator (A-041) as a paired feature.**
- *Ask:* Three-bucket badge (Broadcast / Peer / Viral) plus a coarse "staying power" of Long / Medium / Short.
- *Evidence:* Phase 7b/7c fit on 60K+ names; classification is a lookup.
- *Effort:* Small once the sync exists; copy work is the real lift.
- *Risk:* Medium. The Hawkes half-life is in *weeks at the shock level*; translating to "years at the name level" requires a defensible mapping. Easy to overpromise.

**P1 — Regional popularity badges (A-045).**
- *Ask:* Per-state choropleth on the profile + a "more popular in [region]" badge when the dispersion is meaningful.
- *Evidence:* Phase 10a Moran's I and SSA state data.
- *Effort:* Medium (UI + per-state aggregation).
- *Risk:* Low for descriptive per-state data; medium if we generalize the "diffuses coastal-to-interior" claim past the 11-event sample.

**P2 — Honest methodology page (A-046, plus A-044).**
- *Ask:* A `/research` page that leads with phonetics ("naming is a story told in sounds, not in stories" — borrow the report's own conclusion), discloses the Salganik ceiling honestly ("prior popularity is the dominant predictor; we add a small edge"), and links to real profiles. Do not feature the AUC=0.999 number.
- *Evidence:* All of Phases 5, 9, 10b.
- *Effort:* Medium. This is the SEO and trust play.
- *Risk:* Low if we're honest; high if we let the report's headline language ("quietly demolishes the field's intuition," "settles this now") leak into consumer copy.

**Do not ship (yet):** A-043 (blockbuster paradox — the result is null), per-name "cultural risk" / Karen Index (n too small per name), per-name AR forecasts ("this name will be top 100 in 2027" — the predictability number is not what it appears).

---

## 6. Moat analysis

**Could a competitor with SSA + Google Trends reproduce this in a weekend?** The honest answer is: a sharp competitor could reproduce *the headline numbers* in 2–3 weeks, but not the product surfaces.

What is **not** a moat:
- SSA data (public).
- Google Trends correlations (~$0, pytrends).
- "We ran synthetic controls" (Abadie's package is open source; the 200-event corpus is the hard part, but a well-resourced team rebuilds it in a month).
- The "we have 11 phases of analysis" framing (it's defensible academically; commercially it's a brochure, not a barrier).
- The AUC=0.999 result (probably wrong, definitely not differentiating once corrected).

What **is** a moat, in descending order:
1. **The phonetic neighborhood graph applied at the consumer surface.** CMU + g2p fallback for the long tail (~40% of names) is real engineering work, and *no consumer baby-name product surfaces it*. This is the only feature in the pipeline that I'd describe as genuinely uncopyable in a weekend, because the work isn't the algorithm — it's the curation, the spelling-variant handling we still owe, and the integration into the UI.
2. **The 1,141-event attribution corpus joined to causal ATEs.** A competitor can rebuild the attribution layer, but it's expensive (Claude-assisted, multi-source) and the value compounds with time as more events are tagged. This is a 6–12 month lead, not a permanent one.
3. **The aspirational/cautionary sign-flip insight as product logic.** Most competitors who ship a "trending names" feature do not condition on event type. We can. That's a small product-design moat that depends on us actually building the gate, not on the data being unique.
4. **The integrated /research page as content.** Trust, SEO, differentiation. Not a moat against a serious competitor; a moat against the long tail of "another nameberry."

What we should stop pretending is a moat: the predictability result, the variance decomposition headline, and the side-quest findings. None of them produce a defensible product claim.

**Net:** The pipeline gives us 2–4 features that are real and (mostly) uncopyable on a sprint timeline. It does not give us "the world's only causal naming model" or any other narrative the headline report flirts with. Underclaim publicly; overdeliver on the four surfaces.

---

## 7. Open questions for the founder

1. **How aggressive do you want the trending-why card to be?** Tight gating (attribution conf ≥ 0.7, ATE p<0.10, aspirational only) probably yields the card on <500 profiles. Loose gating risks the Hurricane Katrina problem. Where is your tolerance?
2. **Are you willing to retract the AUC=0.999 framing internally before it leaks?** I'd kill it from the report's abstract and conclusion before /research goes live. If you want me to draft alternate language, I will.
3. **Spelling-variant collapse: now or later?** Doing it now (RECOMMENDATIONS §2c) means re-running Phases 4–8 against canonicalized names. Doing it later means the per-name product numbers will be wrong for Aiden/Aidan/Ayden-like clusters. Estimate: 1–2 weeks of pipeline rerun.
4. **How much of the report do you actually want consumers to see?** The report leans academic. Parents want "names that sound like X" and "is this name about to be on every preschool roster." There's a version of /research that's a 6-section interactive page with phonetic explorer, regional map, and lifecycle chart — and a version that's a PDF download. Which?
5. **What's the threshold for shipping a per-name "cultural risk" badge?** This is the most consequential ethical call in the pipeline. We have a population-level finding (news_event IRFs are negative); we do not have a per-name false-positive rate. Are you willing to show "this name has been associated with a tragic news cycle" on, say, *Katrina*, knowing some current Katrinas will see it?
6. **The scoring weights are locked.** Phase 9 says event characteristics explain 1.8% of ATE variance and trend-component is 25% of `namesake_score`. That's a defensible product choice (trend matters to *parents* even if it doesn't matter to *adoption outcomes*), but it's worth being explicit that the lock is a UX call, not a research-derived call. Confirm?
7. **What is the publication plan for the report itself?** If it's a /research page, fine. If it's an academic submission, the AUC and variance issues need fixing first. If it's a press push ("we ran the largest causal study of baby names ever"), the side-quest nulls and the news_event sign flip become the *story* — and that's actually a better story than the one currently in the abstract.

---

*Net recommendation: ship the four high-evidence features, kill the predictability and blockbuster-paradox claims, gate the trending card on attribution sign, and let the phonetic-neighborhood feature carry the moat narrative. The pipeline is worth what we paid for it; the report is selling something the data doesn't deliver.*
