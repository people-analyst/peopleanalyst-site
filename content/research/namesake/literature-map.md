# Literature Map — Namesake Research Program (Cultural Diffusion)

**Status:** First merged draft
**Date:** 2026-04-29
**Scope:** every cited or method-naming work that appears in `docs/research/reports/` and the master spec `docs/research/PHD_STUDY_SPEC.md`. Each section names the construct or method, the Namesake measure, the canonical source, and Namesake's divergence or extension. Companion `bibliography.bib` carries BibTeX with verified DOIs.
**Method:** Citations harvested by walking every report under `docs/research/reports/` and the methods rows of `PHD_STUDY_SPEC.md` §1, then cross-referenced against shipped artifacts (`null_model_summary.json`, `granger_results.parquet`, `event_panel.parquet`, etc.).
**Citation style:** APA 7 inline; BibTeX keys `lastname_year_firstword` in `bibliography.bib`.
**DOI policy:** DOIs and URLs included only when verified to resolve. Public-dataset references appear in their own section.

**Column legend:**
- **Coordinate:** the construct, method, or pipeline component being positioned.
- **Namesake measure:** the concrete column, parquet artifact, or scoring step.
- **Primary source (APA 7):** the canonical citation.
- **DOI / URL:** verified publisher or stable identifier.
- **Relevance:** why this source matters for the Namesake claim (≤40 words).
- **Namesake divergence or extension:** what we do differently from the cited work.

---

## A. The Lieberson neutral-fashion debate (`PHD_STUDY_SPEC` §1, Phase 5)

The whole research program is structured around a falsifiable contest: do cultural events drive naming, or does most of the observed turnover fall out of a neutral-copying ("internal fashion") process? Phase 5's null model is the referee.

| Coordinate | Namesake measure | Primary source (APA) | DOI / URL | Relevance | Namesake divergence |
|---|---|---|---|---|---|
| Internal-fashion / "matter of taste" theory | Phase 5 null model; bucket field on `name_cultural_events` × `null_model_thresholds.parquet` (`drift-consistent`, `partially-cultural`, `culturally-influenced`, `strongly-cultural`) | Lieberson, S. (2000). *A matter of taste: How names, fashions, and culture change*. Yale University Press. | [Yale UP](https://yalebooks.yale.edu/book/9780300094978/a-matter-of-taste/) | Origin of the claim that name churn arises predominantly from endogenous taste cycling rather than discrete cultural events. The ceiling our pipeline tries to break. | We attribute 843 specific cultural events with a confidence-thresholded LLM pipeline and benchmark each against the same neutral simulation, so the contrast becomes per-event rather than population-level. |
| Neutral drift / random copying applied to baby names | Innovation rate $\mu = 0.0505$ and effective population sizes ($N_e^F = 9{,}852$, $N_e^M = 22{,}320$) in `null_model_summary.json` | Hahn, M. W., & Bentley, R. A. (2003). Drift as a mechanism for cultural change: an example from baby names. *Proceedings of the Royal Society B, 270*(Suppl. 1), S120–S123. | [10.1098/rsbl.2003.0045](https://doi.org/10.1098/rsbl.2003.0045) | Establishes the Wright–Fisher analogy for SSA-grade naming data and the magnitude of drift expected with realistic $N_e$. | We carry the framework forward to 2024, refit per-sex $N_e$ on the modern panel, and report the share of name-years that beat the null at p95 (4.57%) and p99 (2.83%). |
| Random-copying as a general cultural-change mechanism | Phase 5 phonetic-fashion null in `fit_phonetic_fashion.py`; `beats_phonetic_p99` flag (5.27% of name-years at p95) | Bentley, R. A., Lipo, C. P., Herzog, H. A., & Hahn, M. W. (2007). Regular rates of popular culture change reflect random copying. *Evolution and Human Behavior, 28*(3), 151–158. | [10.1016/j.evolhumbehav.2006.10.002](https://doi.org/10.1016/j.evolhumbehav.2006.10.002) | Generalizes the drift result to dog breeds, pottery, and other cultural domains, predicting power-law turnover where random copying dominates. | The phonetic-fashion null incorporates Berger-style sound-neighborhood pull, so divergence between drift and phonetic nulls quantifies how much structure sits in sound communities versus generic copying. |
| Wright–Fisher population genetics | Posterior $N_e$ fits used to parameterize Phase 5 simulation | Wright, S. (1931). Evolution in Mendelian populations. *Genetics, 16*(2), 97–159. | [10.1093/genetics/16.2.97](https://doi.org/10.1093/genetics/16.2.97) | Foundational drift-only model the cultural application borrows from. | We use it as a null, not as a description; cultural innovation rate $\mu$ is not biological mutation. |
| Genetical theory of natural selection | Same | Fisher, R. A. (1930). *The genetical theory of natural selection*. Clarendon Press. | [Internet Archive](https://archive.org/details/geneticaltheoryo031631mbp) | Co-foundational source for the drift framework Phase 5 inherits via Hahn & Bentley. | We extend the analogy only as far as turnover statistics; do not import "fitness" as a per-name parameter. |
| Neutral theory of molecular evolution | Conceptual analogue for the "most change is drift" framing in `cultural-diffusion.md` | Kimura, M. (1968). Evolutionary rate at the molecular level. *Nature, 217*(5129), 624–626. | [10.1038/217624a0](https://doi.org/10.1038/217624a0) | Provides the rhetorical template: most observed change is consistent with the null, with selection visible only in the tails. | Our findings reverse Kimura's emphasis: the modal name year is null-consistent, but the tail (4.57% at p95) is large enough that population-level claims of "drift dominates" understate culture's role. |

---

## B. Phonetic neighborhoods and sound-driven fashion (`PHD_STUDY_SPEC` §1, Phases 3 + 6)

The single sentence the cultural-diffusion essay keeps returning to — **names do not travel alone; they travel in sound families** — is operationalized as a phoneme-edit-distance graph.

| Coordinate | Namesake measure | Primary source (APA) | DOI / URL | Relevance | Namesake divergence |
|---|---|---|---|---|---|
| Phonetic neighborhood as the unit of cultural diffusion in baby names | `phonetic_spillover_results.parquet` (166,046 phonetic pairs); `phonetic_clusters.parquet` (1,221 clusters); Phase 6 Welch *t* = 7.21 (p ≈ 1.1 × 10⁻¹²) for phonetic vs random pairs | Berger, J., Bradlow, E. T., Braunstein, A., & Zhang, Y. (2012). From Karen to Katie: Using baby names to understand cultural evolution. *Psychological Science, 23*(10), 1067–1073. | [10.1177/0956797612443371](https://doi.org/10.1177/0956797612443371) | Establishes that phonetic neighbors co-vary in popularity at rates substantially above chance — the empirical foundation for Namesake's spillover analysis. | Berger inferred phonemes from spelling heuristics on a smaller window; we use the CMU Pronouncing Dictionary plus a g2p fallback across the full SSA universe (1880–2024) and persist the neighborhood graph as a queryable artifact. |
| ARPAbet phoneme strings for English given names | `research_name_phonemes` table; phoneme/sonority/onset-rhyme features in `data/research/derived/phonetic_features.parquet` | Carnegie Mellon University. (2014). *The CMU Pronouncing Dictionary, version 0.7b* [Software]. | [CMU](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) | Provides ARPAbet for ~134K English words including a large fraction of attested first names; the substrate for the Phase 3 graph. | We backfill out-of-vocabulary names with a g2p model rather than dropping them, which matters because the most "culturally interesting" recent names (Khaleesi, Wrenley) are exactly the ones missing from CMU. |

---

## C. Cultural diffusion theory (`PHD_STUDY_SPEC` §1, Phase 7c)

The Bass model and the structural-virality framework are the two diffusion theories Namesake actually fits, not just cites.

| Coordinate | Namesake measure | Primary source (APA) | DOI / URL | Relevance | Namesake divergence |
|---|---|---|---|---|---|
| Innovation/imitation decomposition of adoption curves | Phase 7c `bass_params.parquet` (60,470 fits, R² median 0.992): `p`, `q`, classification ∈ {broadcast 26.1%, peer 42.7%, mixed 26.8%, unfit 4.4%} | Bass, F. M. (1969). A new product growth for model consumer durables. *Management Science, 15*(5), 215–227. | [10.1287/mnsc.15.5.215](https://doi.org/10.1287/mnsc.15.5.215) | Provides the (p, q) decomposition that lets us separate broadcast-driven from peer-driven names — the key behavioral prediction of the cultural-events theory. | Bass was about durable goods with a fixed market potential m; we fit on adoption-curve segments with rolling segmentation, accept that m is partly identified through the SSA registration ceiling, and report stratified medians by event_type rather than firm-level dynamics. |
| Diffusion of innovations as a general framework | Background motivation for Phase 7c segmentation choices and the "innovators / early adopters / majority" framing in the cultural-diffusion essay | Rogers, E. M. (2003). *Diffusion of innovations* (5th ed.). Free Press. | [Free Press](https://www.simonandschuster.com/books/Diffusion-of-Innovations-5th-Edition/Everett-M-Rogers/9780743222099) | Defines the conceptual vocabulary (innovator, imitator, S-curve) we operationalize via Bass and the spike-attribution panel. | Rogers is qualitative; we instantiate his typology as the Bass classification rule (`broadcast` vs `peer`) on 60K fitted curves. |
| Broadcast vs viral cascades | Conceptual frame for the side-quest panel on cascade structure (`docs/research/reports/side_quests.md`) and the Bass-classification stratification | Goel, S., Anderson, A., Hofman, J., & Watts, D. J. (2016). The structural virality of online diffusion. *Management Science, 62*(1), 180–196. | [10.1287/mnsc.2015.2158](https://doi.org/10.1287/mnsc.2015.2158) | Formalizes the broadcast↔viral spectrum that Bass collapses into a single (p, q) ratio; constrains how to interpret peer-dominant names. | We apply the broadcast/viral framing to *names* rather than to URL cascades; the analogue of "tree depth" is the Phase 6 spillover ratio onto phonetic cousins. |

---

## D. Self-exciting processes and contagion dynamics (`PHD_STUDY_SPEC` §1, Phase 7b)

Hawkes processes give us a continuous-time complement to the annual-grain Granger work.

| Coordinate | Namesake measure | Primary source (APA) | DOI / URL | Relevance | Namesake divergence |
|---|---|---|---|---|---|
| Self-exciting point processes; branching ratio as a contagion measure | Phase 7b `hawkes_params.parquet` (6,328 fits, 6,033 stable): branching ratio (median 0.241), half-life weeks (median 1.39), background rate $\mu$ (median 0.064), excitation $\alpha$, decay $\beta$ | Hawkes, A. G. (1971). Spectra of some self-exciting and mutually exciting point processes. *Biometrika, 58*(1), 83–90. | [10.1093/biomet/58.1.83](https://doi.org/10.1093/biomet/58.1.83) | The canonical statement of the model; defines branching ratio < 1 as the stability boundary that 95.3% of fits satisfy. | We fit Hawkes on weekly Google Trends spike series rather than on births directly; the half-life captures the memory of cultural attention, not of the SSA file. The mismatch is intentional — short-horizon search excitation is exactly what the Granger annual aggregation cannot resolve (limitation §3 of the Phase 7a report). |

---

## E. Time-series causal inference — Granger causality and panel VAR (`PHD_STUDY_SPEC` §1, Phase 7a)

| Coordinate | Namesake measure | Primary source (APA) | DOI / URL | Relevance | Namesake divergence |
|---|---|---|---|---|---|
| Granger causality between paired time series | Phase 7a `granger_results.parquet` (4,185 names, 21.5% significant at p<0.05 raw, 1.0% under BH at α=0.05; median optimal lag 1 year); validation canaries (Elsa, Arya, James, Khaleesi) | Granger, C. W. J. (1969). Investigating causal relations by econometric models and cross-spectral methods. *Econometrica, 37*(3), 424–438. | [10.2307/1912791](https://doi.org/10.2307/1912791) | Defines the predictive-causality test that anchors the search→births claim. | The Khaleesi non-result identifies a class of within-year cultural shocks Granger cannot detect by construction — Phase 7b Hawkes is the explicit complement. |
| Panel vector autoregression and impulse-response analysis | Within-name demeaned panel VAR(p=3) on 4,206 names; pooled IRF +0.0063 at h=1 with 95% CI [+0.0045, +0.0081]; subsample IRFs reveal aspirational (+) vs cautionary (−) split | Sims, C. A. (1980). Macroeconomics and reality. *Econometrica, 48*(1), 1–48. | [10.2307/1912017](https://doi.org/10.2307/1912017) | Foundational specification for VAR/IRF analysis applied across the stacked panel; the orthogonalized IRF is what isolates the response of births to a one-SD search shock. | We apply Sims' macro tooling to a name-level cultural panel; the most consequential finding (negative IRF for `event_news_event` at h=2: −0.0226, 95% CI [−0.033, −0.009]) is a within-name fixed-effects result, not a cross-name comparison. |

---

## F. Synthetic-control causal inference (`PHD_STUDY_SPEC` §1, Phase 8)

| Coordinate | Namesake measure | Primary source (APA) | DOI / URL | Relevance | Namesake divergence |
|---|---|---|---|---|---|
| Synthetic-control method (origination) | Donor-pool construction in `phase8_causal/synthetic_controls.py`; placebo distribution on 1,000 non-spiking names | Abadie, A., & Gardeazabal, J. (2003). The economic costs of conflict: A case study of the Basque Country. *American Economic Review, 93*(1), 113–132. | [10.1257/000282803321455188](https://doi.org/10.1257/000282803321455188) | Introduces the convex-weights matching that lets us build a counterfactual for a single treated unit (here, a name with a cultural spike). | We treat 200 events instead of one and do per-event placebo inference rather than narrative comparison. |
| Synthetic-control method (formalization, placebo inference) | `research_event_ate` ATE_t1..ATE_t5 with placebo p-value; covariate set in `PHD_STUDY_SPEC` §4 (`is_lead_character`, `is_title_character`, `actor_popularity`, `budget`, `revenue`, `genres`) | Abadie, A., Diamond, A., & Hainmueller, J. (2010). Synthetic control methods for comparative case studies: Estimating the effect of California's tobacco control program. *Journal of the American Statistical Association, 105*(490), 493–505. | [10.1198/jasa.2009.ap08746](https://doi.org/10.1198/jasa.2009.ap08746) | Provides the MSPE-minimizing donor weights and the placebo-test framework for empirical p-values that we use directly. | The donor pool is matched on phonetic-neighborhood density (not just covariates), an extension that follows from Phase 6 spillover. |

---

## G. Spatial autocorrelation (`PHD_STUDY_SPEC` §1, Phase 10a)

| Coordinate | Namesake measure | Primary source (APA) | DOI / URL | Relevance | Namesake divergence |
|---|---|---|---|---|---|
| Moran's I for spatial autocorrelation | Decade-by-decade Moran's I in `moran_report.md` (1960s: 0.515 → 2020s: 0.268); pre-streaming mean 0.429 vs post-streaming 0.291 | Moran, P. A. P. (1950). Notes on continuous stochastic phenomena. *Biometrika, 37*(1/2), 17–23. | [10.1093/biomet/37.1-2.17](https://doi.org/10.1093/biomet/37.1-2.17) | Defines the I statistic that quantifies whether name popularity is geographically clustered — the empirical lever for the streaming-era homogenization claim. | We compute Moran's I on the SSA state file (`ssa_state_year.parquet`) rather than on contiguous neighborhoods; spatial weights are state-adjacency, and the trend (decreasing I) is read as evidence of streaming-era national-exposure flattening. |

---

## H. Predictability ceiling (`PHD_STUDY_SPEC` §1, Phase 10b)

| Coordinate | Namesake measure | Primary source (APA) | DOI / URL | Relevance | Namesake divergence |
|---|---|---|---|---|---|
| Predictability of cultural-success outcomes; MusicLab paradigm | Phase 10b train-on-2004–2014, test-on-2015–2024 model panel (`predictability_ceiling.md`): full-feature logistic AUC 0.999, PR-AUC 0.881, P@100 = 0.98 | Salganik, M. J., Dodds, P. S., & Watts, D. J. (2006). Experimental study of inequality and unpredictability in an artificial cultural market. *Science, 311*(5762), 854–856. | [10.1126/science.1121066](https://doi.org/10.1126/science.1121066) | Establishes the framing of "ceiling" prediction in cultural domains: even with full information about the past, future hits remain partially unpredictable. | Our high AUC is partly an artifact of structural features (prior popularity, phonetic density) constraining the possibility space — a divergence from Salganik's experimental setup, where path dependence on early plays is the main predictability bottleneck. We flag this in the report's interpretation rather than claiming we have broken Salganik's ceiling. |

---

## I. Saturation, exposure, and reactance — the Blockbuster Paradox (`PHD_STUDY_SPEC` §1, Phase 8b)

| Coordinate | Namesake measure | Primary source (APA) | DOI / URL | Relevance | Namesake divergence |
|---|---|---|---|---|---|
| Hill equation as a saturation form for exposure → response | Phase 8b Hill fits in `blockbuster_paradox_report.md` (revenue: $E_{\max}$, EC50, h; reactance term γ) | Hill, A. V. (1910). The possible effects of the aggregation of the molecules of haemoglobin on its dissociation curves. *Journal of Physiology, 40*, iv–vii. | [Wiley](https://physoc.onlinelibrary.wiley.com/journal/14697793) | Original Hill curve; the analytical scaffold for the saturation hypothesis in name adoption. | We add a reactance term to the standard Hill curve to test for non-monotonicity at high exposure — a structural deviation from Hill's one-way saturation. |
| Modern review and parameterization of the Hill equation | Same | Goutelle, S., Maurin, M., Rougier, F., Barbaut, X., Bourguignon, L., Ducher, M., & Maire, P. (2008). The Hill equation: a review of its capabilities in pharmacological modelling. *Fundamental & Clinical Pharmacology, 22*(6), 633–648. | [10.1111/j.1472-8206.2008.00633.x](https://doi.org/10.1111/j.1472-8206.2008.00633.x) | Practical guide we follow for parameter identification, especially the Hill coefficient h. | We accept that h < 1 is concavity, not paradox; the paradox claim is *only* triggered by a significant negative reactance γ — which the current sample does not support. |
| Adstock / advertising memory | Conceptual motivation for the Hill+exposure framing (PHD_STUDY_SPEC §1) | Broadbent, S. (1979). One way TV advertisements work. *Journal of the Market Research Society, 21*(3), 139–166. | — | Marketing-mix-modeling source for the decay-of-exposure assumption that exposure has a half-life and a saturation shoulder. | We use the adstock framing only metaphorically; the actual decay structure on names comes from Phase 7b Hawkes fits, not an adstock fit. |
| Psychological reactance as the mechanism behind the Blockbuster Paradox | Reactance term γ in the Hill+reactance specification (`blockbuster_paradox_report.md`) | Brehm, J. W. (1966). *A theory of psychological reactance*. Academic Press. | — | Provides the theoretical reason a parent might *avoid* a name precisely because it has become ambient — the missing piece in a pure-saturation account. | We test reactance empirically against null and find it not significant in the current sample (γ p > 0.05 across exposure measures); the Blockbuster Paradox remains a hypothesis with negative evidence rather than a confirmed finding. |

---

## J. Survival analysis (`PHD_STUDY_SPEC` §1, Phase 9 / future work)

| Coordinate | Namesake measure | Primary source (APA) | DOI / URL | Relevance | Namesake divergence |
|---|---|---|---|---|---|
| Cox proportional-hazards model | Planned analysis of name "lifespan" after a cultural event (`PHD_STUDY_SPEC` §1, supporting role) | Cox, D. R. (1972). Regression models and life-tables. *Journal of the Royal Statistical Society. Series B (Methodological), 34*(2), 187–220. | [10.1111/j.2517-6161.1972.tb00899.x](https://doi.org/10.1111/j.2517-6161.1972.tb00899.x) | Standard hazard-model machinery for time-to-decay analyses; the "half-life" intuition in the cultural-diffusion essay would be formalized here. | Currently scoped but not yet fit; flagged in the preregistration deviations log because the Phase 7b Hawkes half-life partially substitutes for the Cox lifespan estimand. |

---

## K. Multiple-testing control

| Coordinate | Namesake measure | Primary source (APA) | DOI / URL | Relevance | Namesake divergence |
|---|---|---|---|---|---|
| Benjamini–Hochberg false-discovery-rate procedure | `granger_results.parquet` columns `pvalue_bh_adjusted`, `granger_significant_05_bh` (42 names / 1.0% survive at α=0.05 vs 901 / 21.5% raw) | Benjamini, Y., & Hochberg, Y. (1995). Controlling the false discovery rate: A practical and powerful approach to multiple testing. *Journal of the Royal Statistical Society. Series B (Methodological), 57*(1), 289–300. | [10.1111/j.2517-6161.1995.tb02031.x](https://doi.org/10.1111/j.2517-6161.1995.tb02031.x) | Provides the standard FDR control we apply across the ~5K per-name Granger family. | We persist both raw and BH-adjusted columns in the canonical artifact and route smart-list product features through the BH-adjusted gate, which is unusual; most published analyses report only one. |

---

## L. Public data sources referenced as research instruments

These are not theoretical works but they are the empirical substrate; the methodology section of every report eventually grounds out here.

| Source | Namesake use | Citation |
|---|---|---|
| SSA national + state name files | `external/ssa_national_year.parquet` (2,149,477 rows), `external/ssa_state_year.parquet` (6,600,640 rows). | U.S. Social Security Administration. (2025). *Beyond the top 1000 names* [Data set]. [ssa.gov](https://www.ssa.gov/oact/babynames/limits.html) |
| Google Trends | `external/google_trends_*` parquets; weekly fetcher in `cloud/modal_app.py::fetch_search_trends_weekly`. | Google. (2026). *Google Trends*. [trends.google.com](https://trends.google.com/) |
| GDELT 2.0 | `external/gdelt_name_mentions.parquet`. | GDELT Project. (2024). *The GDELT Project, version 2.0*. [gdeltproject.org](https://www.gdeltproject.org/) |
| OMDb API | Spike-attribution evidence in `scripts/attribute_spikes.py`. | Fritz, B. (2024). *OMDb API: The Open Movie Database*. [omdbapi.com](https://www.omdbapi.com/) |
| TMDb API v3 | Cast / role metadata in `tmdb_titles.parquet`, `tmdb_cast.parquet`. | The Movie Database. (2024). *TMDb API, version 3*. [themoviedb.org](https://developer.themoviedb.org/reference/intro/getting-started) |
| Google Books Ngrams | `external/google_ngrams_names.parquet` (5.8M token rows) for pre-internet baseline. | Google Books Ngram Viewer. (2020). *Google Books Ngram Corpus*. [ngrams datasets v3](https://storage.googleapis.com/books/ngrams/books/datasetsv3.html) |

---

## M. What Namesake adds — gap analysis

Each row in this section is a place where the literature sets up a question the field has not answered with this depth of data, and where Namesake's pipeline produces the missing number.

| Gap in the literature | What Namesake contributes | Where in the corpus |
|---|---|---|
| Lieberson 2000 vs Hahn–Bentley 2003 leave the question open: how much of observed turnover is drift, how much is cultural? Both sides argue from population-level statistics. | A *per-name-year* null-vs-cultural classification on 46,412 names with 4 buckets (drift-consistent → strongly-cultural). 4.57% of name-years beat neutral drift at p95; 5.27% beat the phonetic null. | `phase5_null_model_results.md` |
| Berger et al. 2012 establishes phonetic spillover at the population level but does not measure how much cultural mass leaks from the focal name to its acoustic cousins for specific events. | Welch *t* = 7.21 across 166K phonetic pairs; Phase 6 produces the *focal share* and *spillover ratio* per attributed event. | `phase6_phonetic_spillover.md`; planned per-event extension in Phase 8 |
| Granger 1969 / Sims 1980: the literature has applied these to macroeconomic series for decades but rarely to attention → behavior conversion at scale. | 4,185 per-name Granger tests with FDR correction; pooled IRF with subsample decomposition that uncovers an aspirational (+) vs cautionary (−) sign split by event_type. | `phase7a_granger_causality.md` |
| Salganik 2006 sets a predictability ceiling in an experimental cultural market but the natural-experiment version was not feasible without the Trends + SSA join. | Train-on-2004–2014 → test-on-2015–2024 model panel with full-feature logistic at AUC 0.999, deliberately presented as a structural-features upper bound rather than a Salganik-paradigm refutation. | `predictability_ceiling.md` |
| Bass 1969 / Goel 2016: broadcast-vs-peer typology is widely cited but rarely fit at corpus scale on a single domain. | 60,470 Bass fits stratified by event_type; sports moments are the most peer-dominant (47.0% peer); animation is the most broadcast-dominant. | `phase7c_bass_diffusion.md` |
| Marketing-mix modeling treats exposure → outcome as a Hill curve but rarely tests a *reactance* term. | Hill+reactance specification across three exposure measures (revenue, spike magnitude, vote count); reactance non-significant in the current sample, which is itself a publishable null. | `blockbuster_paradox_report.md` |
| Most diffusion studies treat events as exogenous binary shocks. | Synthetic-controls design with per-event placebo p-values, planned for the 200 best-attributed events in Phase 8a, with covariate set documented in `PHD_STUDY_SPEC` §4. | Phase 8 (in flight at time of writing) |

---

*Companion files: [`bibliography.bib`](bibliography.bib) (BibTeX), [`PHD_STUDY_SPEC.md`](PHD_STUDY_SPEC.md) (master design), [`PIPELINE_STATUS.md`](PIPELINE_STATUS.md) (artifact freshness), and the per-phase reports under [`reports/`](reports/).*
