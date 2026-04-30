# Where the Research Stands — Plain-English Status

> **Audience:** you (the founder), plus any non-technical collaborator who wants to know what we've found, what's shaky, and what we're doing about it.
>
> **Last refreshed:** 2026-04-14 · after the first end-to-end Modal pipeline run + four independent peer reviews.
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

### 🔴 Red flag: The "99.9% predictable" headline is not what it sounds like.

One model reported AUC = 0.999 at predicting which names enter the SSA top 100 next year. Sounds amazing. **It is almost certainly a base-rate artifact.** The positive class is 0.46% of names (almost no one enters the top 100), and a trivial baseline that just looks at "last year's rank" already hits AUC = 0.997. The "full model" adds 0.002 on top of that. The honest reading is: *prior rank predicts next rank; nothing else adds much.* We will not put "we predict baby-name success with 99.9% accuracy" on the site.
*Confidence: the statistical flaw is high-confidence. Acting like the number is meaningful would be a mistake.*

### 🔴 Red flag: "We measured causal effects" is overstated.

Phase 8 produces synthetic-control estimates of per-event impact. They're presented as causal ATEs ("average treatment effects"). Three problems, per the peer review: no pre-treatment fit diagnostics are reported, the donor pool is systematically comparing against quieter names (which biases the estimate), and the sound-alike spillover violates a core assumption. The typical event has an estimated effect near zero or slightly negative, not the "Frozen lifted Elsa by 340%" story we'd like to tell. The synthetic-control numbers are still interesting — they're just not causal in the technical sense, and we shouldn't claim they are.
*Confidence: the critique is high-confidence. The numbers themselves are fine as descriptive; just not as causal.*

### 🔴 Red flag: Seven "fun" secondary tests are all null.

We ran side quests: blockbuster paradox, villain effect, streaming lag, award-timing, franchise decay, unisex drift. **None of them rejected the null.** This is honestly a finding — it means neutral drift is harder to beat than pop-naming-science articles imply — but it kills any plan to ship these as per-name site badges.
*Confidence: high that the tests are null; honest framing is "neutral drift partially vindicated."*

---

## 3. What's wobbly (the warts)

These are known problems. Most have assignments queued in `docs/agent-assignments.md` (see §4).

1. **Multiple-testing discipline is inconsistent.** Phase 7a (Granger) applied a rigorous correction that collapses "21.5% significant" down to "1.0% survives FDR." Good. But other phases — moderation tests (9 tests), side quests (7), Hill-curve specifications (3), variance decomposition (F-tests) — applied no correction. With that many parallel tests, a few false positives are statistically expected. Any per-name feature we ship has to use the FDR-corrected column, not the raw one.

2. **"Cultural events explain 1.8% of variance" undercuts the paper's own framing.** The variance decomposition found that event characteristics explain ~1.8% of event-level effect variance, while name-intrinsic features (rarity, sound, gender) explain about 53%. The paper body sometimes says "<15%," which doesn't match the table. *The right consumer story is: we know which names sound like the ones you love and how long that sound stays in style — cultural events are garnish, not the main course.*

3. **LLM attribution is load-bearing and unvalidated.** All 1,141 event→name associations came from an LLM. Median confidence is 0.72 (LLM self-report, not human-checked). We have no gold-standard evaluation. A manual audit of even 50 attributions would let us put a real precision/recall number on this.

4. **Data coverage gaps matter more than the paper admits.** The framing says "1880–2024" but most of the interesting statistical work (search → births, Hawkes, synthetic controls) requires the 2004+ Google Trends era. Anything about the pre-internet era is birth-record-only.

5. **Spelling variants fragment the signal.** Aiden, Aidan, and Ayden are tracked separately. Most models don't collapse them. This almost certainly understates the true effect size of any single cultural moment, because the credit gets spread across variants.

6. **Silent engineering failures affected this run.** Several phases wrote their Markdown reports to a container directory that wasn't persisted; those reports were recreated by Phase 11's overwrite, but it means we lost intermediate state. The effective-population-size calibration uses a process-randomized Python hash, so the N_e numbers aren't guaranteed identical across re-runs. An O(n²) pandas pattern made one phase take 30 minutes instead of 30 seconds. All fixable, none catastrophic, and none invalidate the headline findings — but they do mean the *exact* numbers could shift a few percent on the next re-run.

7. **The report has unfilled template placeholders.** The headline abstract still contains `[X]%`, `[Y] weeks`, `[Z]` in places. That's a Phase 11 templating bug, not a scientific issue, but it means the auto-generated report needs a cleanup pass before anyone cites it.

8. **Effect sizes are reported in units nobody can interpret.** ATEs of 0.000065 "market-share points" convey nothing to a lay reader. Future iterations should translate to "about X more births per 10,000 in the year after the event" or similar.

---

## 4. What we're doing about it

Follow-up work is tracked as assignments A-196 → A-209 in [`docs/agent-assignments.md`](../agent-assignments.md). Highlights:

| Priority | Assignment | What it does |
|----------|------------|--------------|
| P0 | A-196 | Stop dropping Phase 5–10 reports on Modal (silent-failure fix) |
| P0 | A-197 | Gate Granger "valid tests" on ≥2 non-degenerate lags (stops single-lag flukes inflating headline) |
| P0 | A-198 | Rewrite the O(n²) pandas groupby in `build_annual_panel.py` (30 min → ~30 sec) |
| P0 | A-199 | Make `phase3b --dry-run` actually short-circuit the heavy loop |
| P0 | A-200 | Phase 4a writes NaN for missing Trends, not `0.0` (fixes a class of bias in every downstream consumer) |
| P0 | A-201 | Attribution-gated trending-why card — never surface tragedies as "rising" |
| P0 | A-202 | Pull "AUC 0.999" from any user-facing or marketing surface |
| P1 | A-203 | Seed determinism (PYTHONHASHSEED + errband_mc seed) so re-runs reproduce exactly |
| P1 | A-204 | Parquet schema tests at every boundary (would've caught tonight's UUID/Int64 bug) |
| P1 | A-205 | Tiny-corpus regression test — 10 names, 2 years, assert headline stats ±5% |
| P1 | A-206 | Status reporter reads Modal volume, not local disk |
| P1 | A-207 | Fill Phase 11 report template placeholders; strip product-copy from methodology section |
| P1 | A-208 | Reframe "causal ATE" language where the design doesn't support it |
| P2 | A-209 | Fix variance-decomposition collinearity (VIFs in the millions) |

A few of these could meaningfully change reported numbers. The *signs* of the findings (aspirational lifts names, news depresses them; sound spreads; peer > broadcast) are robust to these fixes. The *magnitudes* — especially effect sizes and the variance decomposition — could shift.

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

Baby names spread more by sound than by story, parents chase aspirational cultural moments and actively avoid tragedy-adjacent ones, and most name turnover looks about as random as a Pólya urn — but several of the precise numbers in our report need cleanup before they're ready for the public, and we've queued the work to get them there.
