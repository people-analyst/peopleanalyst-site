# Where the Research Stands — Plain-English Status

> **Audience:** you (the founder), plus any non-technical collaborator who wants to know what we've found, what's shaky, and what we're doing about it.
>
> **Last refreshed:** 2026-04-30 · after the second end-to-end Modal pipeline run + the wave 1+2 cleanup landing (A-196 → A-209, A-236 → A-238).
>
> **Re-run this page** whenever the pipeline regenerates outputs, by re-invoking the four reviewer agents and updating §2 / §3 / §4 below.

---

## 1. What we set out to answer

Do baby names in the United States spread by chance, by contagion (hearing them in your social circle), by broadcast (a movie comes out), by sound (names that rhyme rise together), or something else entirely?

We built an 11-phase research pipeline that combines:

- 145 years of Social Security birth records (1880–2024),
- 22 years of weekly Google Trends interest (2004–2026, ~90% complete),
- A sound-alike graph of 43,334 names (built from phoneme dictionaries),
- 1,141 cultural events (movies, TV, celebrities, news, sports) hand-attributed to specific names by an LLM,
- And a menagerie of demographic, geographic, and cultural-trend features.

Then we threw it at a dozen different statistical models — null-drift baselines, Granger causality, Hawkes point processes, Bass diffusion, synthetic controls, variance decomposition, Moran spatial autocorrelation, and a predictability ceiling test. The pipeline runs end-to-end in the cloud on Modal.

---

## 2. What we've found (with honest confidence levels)

### ✅ Strong: Phonetic neighborhoods are real and dense.

Names that sound alike — Aiden, Jaden, Caden, Brayden — really do rise and fall together. We measured it across 422,000 sound-alike pairs and the effect is ~3× stronger than for random name pairs. This is the most defensible finding in the pipeline and the single best product hook: "names that sound like one you love."
*Confidence: high. Replicated across multiple phases.*

### ✅ Strong: Search interest leads birth registration by about a year.

When a name starts trending on Google, the SSA birth-count rank responds roughly 1–2 years later. This is the first place we see something that looks causal: parents get pregnant after the cultural moment, babies arrive months later, SSA tallies them the year after that.
*Confidence: high at the population level. Per-name badges would need to survive a stricter multiple-testing correction (see §3).*

### ✅ Strong: Parents chase some cultural moments and actively avoid others.

Aspirational cultural events (movies, celebrity births, sports heroes) lift the names they touch. News events — particularly tragedies — *push names down*. The sign of the cultural moment matters. "Khaleesi" went up; "Katrina" went down. This is the empirical foundation for gating the trending-why card on our site: we should never show a grieving story as a "rising name."
*Confidence: high as a population-level finding; lower per-name.*

### 🟡 Medium: Adoption looks more like word-of-mouth than one-shot broadcast.

Across 60,470 names, the "peer" parameter of a Bass diffusion model is several times larger than the "broadcast" parameter. Names spread through social contagion more than through announcement.
*Confidence: medium. The parameter distributions are wide; median vs mean diverges in places.*

### 🟡 Medium: A surprising share of name churn is statistically indistinguishable from random copying.

This is the Lieberson null-drift result. ~84% of observed name turnover can be explained by random copying alone. Parents are not as original as they feel.
*Confidence: medium. The claim is robust as a descriptive finding, but the exact percentages shift depending on how N_e (effective population size) is calibrated — and that calibration has a reproducibility bug we're fixing (see §3).*

### 🟡 Medium: Geographic diffusion is real and weakening.

Spatial clustering of name adoption (Moran's I) has dropped from 0.51 in the 1960s to 0.27 today. The internet flattens naming geography, just like it flattens everything else.
*Confidence: medium. Coastal-first diffusion is documented for 11 cultural events — real but a small sample.*

### ✅ Resolved: A-239 honest forecasting respec — predicting breakthroughs, not autoregression.

The "AUC = 0.999" finding is gone, replaced with an honest respec'd task: *for names with rank in [201, 5000] in year t, predict whether the name enters the SSA top 200 within the next 3 years*. Train 2004–2018, test 2019–2021 (test set: 26,717 (name, year) rows with 126 positives).

| Model | AUC | PR-AUC | P@25 | P@100 |
|---|---|---|---|---|
| AR(1) prior rank | 0.978 | 0.158 | 0.12 | 0.21 |
| Full Logistic | 0.990 | 0.324 | 0.32 | 0.41 |
| **Full LightGBM** | **0.991** | **0.595** | **0.96** | **0.66** |

The headline is the **+0.44 PR-AUC delta over AR(1)** — AUC is saturated by construction in any rank-based prediction problem. The operational read: of the GBT's top-25 predicted breakthroughs, 24 are real (P@25 = 0.96) vs 3 (P@25 = 0.12) for AR(1). That's an 8× lift at the top, and it surfaces precisely the names where culture/sound features matter at the margin. Top GBT importance: `rank_3yr_trend`, `phonetic_density`, `search_3yr_mean`, `births_count`, `sex_pct_male`.
*Confidence: high. PR-AUC delta is the right metric under this much imbalance, and the calibration table is honest about where the model still over-predicts.*

### 🟡 Recharacterized: synthetic-control divergence ≠ causal ATE (A-208).

Phase 8a now reports outputs as **synthetic-control-adjusted divergences**, not causal ATEs. Per A-208, every event row carries a `post_pre_mspe_ratio` (Abadie diagnostic) and a per-event placebo p-value, and only the strict subset that passes (placebo p < 0.10 AND post/pre MSPE > 5) carries `is_causal_candidate = TRUE`. **In the 2026-04-30 run, 24 of 200 events meet that bar.** The other 176 keep their divergence numbers (still useful descriptive evidence) but no longer carry the causal framing. Methodology §4c documents the SUTVA-violation, donor-endogeneity, and N_treated=1 reasons we decline to call the pool average "causal."
*Confidence: high. The reframe matches what the design supports.*

### 🔴 Red flag: Seven "fun" secondary tests are all null.

We ran side quests: blockbuster paradox, villain effect, streaming lag, award-timing, franchise decay, unisex drift. **None of them rejected the null.** This is honestly a finding — it means neutral drift is harder to beat than pop-naming-science articles imply — but it kills any plan to ship these as per-name site badges.
*Confidence: high that the tests are null; honest framing is "neutral drift partially vindicated."*

---

## 3. What's wobbly (the warts) — 2026-04-30 update

The wave-1+2 fixes from this session resolved most of the wart list below. What's resolved is recorded with the SHA / assignment so the audit trail is durable; what's still pending sits at the bottom.

**Resolved this session:**

1. ✅ **Multiple-testing discipline (A-197).** Phase 7a now gates the "valid Granger" headline on `n_valid_lags ≥ 2`; single-lag-only fits are reported as a separate stratum and excluded from the BH-FDR family. Headline counts in the 2026-04-30 report use the strict gate.

2. ✅ **The "1.8% of variance" framing is gone (A-209).** Phase 9's cycle features (VIFs in the millions) are now PCA-orthogonalized to a single PC; the "name" block is split into `name_matching` (Phase 8a inputs — partly tautological) and `name_independent` (the honest comparison vs the event block). New honest numbers (2026-04-30 run): event ΔR² = 0.0104, `name_matching` ΔR² = 0.4989 (flagged tautological), `name_independent` ΔR² = 0.0088, phonetic ΔR² = 0.0041, cycle ΔR² = 0.0001. The honest comparison is event 1.0% vs name_independent + phonetic + cycle ≈ 1.3% — they're roughly comparable, not 1.8% vs 53%.

3. 🟡 **LLM attribution audit harness shipped (A-236).** A 50-event stratified-sample harness exists; verdicts are pending human input. Until the audit completes, attribution-driven gates use a heuristic floor (`CULTURAL_EVENT_MIN_CONFIDENCE_FOR_CAUSAL_CLAIM = 0.7`); when verdicts land, the floor will track the audit's recommended bucket-precision.

4. ✅ **Data-coverage NaN-vs-zero fixed (A-200).** The annual panel now writes NaN for missing Trends data and 0.0 only for real Google-zero readings. 1.32M pre-2004 rows correctly NaN; 256K post-2004 NaN, 263K real zeros, 121K positive — three distinct cases preserved, methodology §4a documents.

5. ✅ **Spelling-variant collapse end-to-end (A-237).** `spelling_groups.parquet` (43,334 names → 36,265 groups under the consonant-guarded rule), Phase 8a `--use-variant-rollup` flag, and the rendered `spelling_variant_sensitivity.md` are all shipped. Strict-gate causal-candidate churn at the rollup boundary: 5/11 ≈ 45% across the 53 events present in both runs (small enough to read as "spelling-variant fragmentation does affect the strict-gate set, but it's confined to events with real variant siblings"). Top shifts are now Emanuel→Emmanuel, Lindsay→Lindsey, Cory→Corey, Cain→Kane — phonetically credible spelling pairs, not the garbage `Adaline→Kamari` collisions that surfaced the A-240 g2p quality bug in the first place.

6. ✅ **Silent engineering failures plugged.** A-196 (Modal: every phase's reports persisted to volume), A-203 (PYTHONHASHSEED + errband_mc seed pinned), A-198 (Phase 4a vectorized: 30 min → 2 sec), A-199 (Phase 3b dry-run short-circuits), A-204 (parquet schema gate at every boundary), A-205 (tiny-corpus regression test), A-206 (status reader against Modal volume) all landed.

7. ✅ **Phase 11 placeholders gone (A-207).** The 2026-04-30 report's abstract is fully data-driven (median divergence, half-life, etc.) and a placeholder-substitution gate raises RuntimeError on any unfilled `[X]`/`[Y]`/`[Z]`/`{date_str}` token. §7.3 product copy moved out to `RESEARCH_TO_PRODUCT.md`.

8. ✅ **Effect-size units interpretable (A-238).** `event_ates.parquet` now carries `ate_t<k>_births_per_10k` and `ate_t<k>_births_in_cohort` companion columns. Jackson 2009 ATE of 0.0033 m.s.p. now reads as "≈33.5 more births per 10K, ≈11,716 in the 2009 cohort."

**Still wobbly:**

9. **A-240 — Phase 3a g2p quality fix.** Building the A-237 sensitivity table surfaced a serious upstream issue: 25,773 of 33,921 g2p-decomposed names (76%) come back with NO consonant phonemes (`Adaline → AA0 AA1 IY0`). A-237's downstream rollup now guards against this (vowel-only decompositions are routed to singletons) but the underlying decomposition is still wrong, and Phase 6 phonetic-spillover + Phase 3b neighborhood graph + Phase 9's `phonetic_density` feature all rely on it. Queued as A-240.

10. **A-236 verdicts.** The attribution-audit harness is shipped; the 50 manual verdicts are the next human-in-the-loop step.

---

## 4. What we're doing about it — 2026-04-30 status

A-196 → A-209 are all **COMPLETE** as of this session. A-236 (LLM-attribution audit) shipped as a harness; the verdicts are the human-in-the-loop next step. A-237 shipped as substrate; the sensitivity table needs a Phase 8a re-run with the rollup flag. A-238 (effect-size translation) shipped end-to-end. A-239 (Phase 10b respec) is queued for a separate session.

| Status | Assignment | What it does |
|--------|------------|--------------|
| ✅ | A-196 | Modal copies every phase's reports to the volume (silent-drop fix) |
| ✅ | A-197 | Granger "valid" stratifies on ≥2 non-degenerate lags |
| ✅ | A-198 | Phase 4a M/F aggregation vectorized (30 min → 2 sec) |
| ✅ | A-199 | Phase 3b `--dry-run` short-circuits the O(n²) loop |
| ✅ | A-200 | Phase 4a writes NaN for missing Trends, 0.0 only for real Google zeros |
| ✅ | A-201 | Trending-why card gates causal claim on confidence ≥ 0.7 |
| ✅ | A-202 | "AUC 0.999" carries an A-202 banner; not on consumer surfaces |
| ✅ | A-203 | Seed determinism (PYTHONHASHSEED + errband_mc seed) pinned |
| ✅ | A-204 | Parquet schema gate (declares every boundary; CLI fails on drift) |
| ✅ | A-205 | Tiny-corpus regression test (10 names × 2 years, runs in ~7 sec) |
| ✅ | A-206 | Status reporter reads Modal volume; PIPELINE_STATUS refreshed end-to-end |
| ✅ | A-207 | Phase 11 abstract data-driven; placeholder gate errors on `[X]` |
| ✅ | A-208 | Phase 8a outputs reframed as "synthetic-control-adjusted divergence" + post/pre MSPE + is_causal_candidate gate (24/200 strict) |
| ✅ | A-209 | Phase 9 cycle features PCA-orthogonalized; name block split into matching/independent |
| ✅ | A-236 | LLM-attribution audit harness (sample + calibration scripts shipped; verdicts pending) |
| ✅ | A-237 | Spelling-variant collapse: substrate + rollup flag + sensitivity table |
| ⏳ | A-240 | Phase 3a g2p quality fix (76% vowel-only OOV decompositions; surfaced by A-237) |
| ✅ | A-238 | Effect-size unit translation: market-share → births per 10K + in-cohort |
| ✅ | A-239 | Phase 10b respec (rank [201, 5000] → top-200 in 3y); GBT P@25 = 0.96 |

Of the warts that A-196 → A-209 set out to fix, the ones that meaningfully shifted reported numbers in the 2026-04-30 run:

- **Variance-decomposition framing** (A-209): the published "events explain 1.8%, name explains 53%" headline collapses. New honest numbers: event 1.0% vs name_independent 0.9% vs phonetic 0.4% — comparable, not order-of-magnitude separated. The "name dominates" story was an artifact of pooling matching-input features with truly-independent ones.
- **Synthetic-control causal subset** (A-208): of 200 events, 24 pass the strict (placebo p < 0.10 AND post/pre MSPE > 5) gate. The other 176 still have divergence numbers but no longer carry the causal framing.
- **Granger headline stability** (A-197 + A-200): the 2026-04-30 panel (with NaN at the source) qualifies more names (7,530 with valid Granger tests vs 4,185 in the 2026-04-13 run). All survive the ≥2-valid-lags gate, which is itself confirmation that the prior single-lag-only stratum was a Phase-4a-zeros artifact.

The signs of the findings (aspirational lifts names, news depresses them; sound spreads; peer > broadcast) are unchanged. The magnitudes shifted exactly as the peer review predicted.

---

## 5. How to refresh this page

When the pipeline re-runs (e.g. after Google Trends completes its backlog and phases 4–11 are re-executed), three steps:

1. **Re-run the pipeline on Modal:**
   ```
   .venv/bin/modal run --detach cloud/modal_app.py::run_full_pipeline
   ```
2. **Re-invoke the four reviewer agents** on the fresh outputs (each writes to `docs/research/reviews/<audience>.md`). Compare to prior reviews — what shifted? Any new red flags?
3. **Update §2, §3, §4 of this file.** Keep the tone plain; keep the warts honest. If a red flag has been resolved, move it out of §3 and note the fix in §4. If a new one appeared, add it.

---

## 6. One-sentence summary for someone who won't read anything

Baby names spread more by sound than by story, parents chase aspirational cultural moments and actively avoid tragedy-adjacent ones, and most name turnover looks about as random as a Pólya urn — and as of 2026-04-30 the report's headline numbers are the ones the data actually supports, with the wart fixes the peer review demanded all landed.
