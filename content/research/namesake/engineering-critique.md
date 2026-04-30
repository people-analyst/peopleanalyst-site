---
title: "Engineering Critique of the Modal Pipeline"
description: "Adversarial PhD-level review of the orchestration and phases 3–7 — what's solid, what silently fails, and what to fix before publishing."
publishedAt: "2026-04-14"
status: published
authors: ["Namesake Research"]
category: review
---

# Engineering critique — Modal research pipeline (post-2026-04-13 run)

**Reviewer:** adversarial PhD-level data-science review
**Audience:** the engineers who keep this thing running
**Scope:** Modal orchestration + phases 3-7 in detail, plus methodology / status docs

This memo is intentionally blunt. The pipeline ran end-to-end and produced numbers that look reasonable, but several of those numbers are reported with more confidence than the code can support, and several of the cloud-mode plumbing decisions silently throw away outputs. Fix the silent-failure issues before publishing anything.

---

## 1. TL;DR

1. **Phase-11 report copy is the only phase that rescues `docs/research/...` outputs from the throwaway container.** Every other phase that writes a Markdown report to `REPO_ROOT/docs/...` (Granger 7a, Hawkes 7b, Bass 7c, Phase 5, Phase 6, side-quests, etc.) writes to a path that is **not** on the Modal volume, so the report dies with the container. The parquet artefacts survive; the prose does not. The reports you have locally are stale-from-laptop or implicitly recreated by phase 11.
2. **The "4,185 names with valid Granger tests" headline silently includes degenerate tests.** `granger_for_series` (granger_panel.py:195) returns `None` only when `np.std == 0` for either column or `statsmodels` raises. When statsmodels emits the `constant values` warning **without** raising, the per-lag `f_stat` ends up NaN, `valid_lags` may still contain at least one numeric entry, and the row is counted. The "4,185" is an upper bound; the real count of well-conditioned tests is unmeasured.
3. **`build_annual_panel.py:187` does an O(N²)-ish closure aggregation** — the lambda `x[ssa.loc[x.index, "sex"] == "M"].sum()` re-indexes the parent DataFrame for every single (name, year) group. On the full SSA panel (≈2.1M rows, ≈25K names × ≈145 years × 2 sexes) this is the 30-minute step. A pivot-and-divide replacement is one line and ≈50× faster.
4. **`build_neighborhood_graph.py --dry-run` does not short-circuit the O(n²) main loop.** `--dry-run` is checked at line 393, *after* Pass 1 (edit edges, the actual O(n²) work), Pass 2 (rhyme), and Pass 3 (top-k product) have already executed. A `--dry-run` of the full corpus takes the same wall-clock as a real run; the only thing it skips is the final `write_parquet_rows`. This is genuinely dangerous on Modal because dry-run is the sanity gate operators reach for first.
5. **`PIPELINE_STATUS.md` shows everything as "Not Started".** The auto-generated nightly status reporter checks the local repo's `data/research/` directory — but the parquets live in the Modal volume now. Status reporting is decoupled from where the data actually is. Anyone reading the doc this morning would conclude the pipeline never ran.

---

## 2. Data-quality issues

### 2a. Sex aggregation in `build_annual_panel.py:184-195` is anti-idiomatic and brittle

```python
agg = (
    ssa.groupby(["name", "year"])
    .agg(
        births_count=("count", "sum"),
        count_m=("count", lambda x: x[ssa.loc[x.index, "sex"] == "M"].sum()),
        count_total=("count", "sum"),
    )
    .reset_index()
)
```

Three problems compound:

1. **Closure over `ssa`** — every group call re-indexes the parent DataFrame by the group's row labels. For ~25K × 145 = ~3.6M groups, this is the dominant cost.
2. **`ssa.loc[x.index]` assumes a unique RangeIndex.** If `ssa` was ever reset/concatenated and labels duplicated (which happens after the SSA snapshot is rebuilt in chunks), `loc[x.index]` returns a Cartesian explosion and `count_m` becomes garbage. There is no guard.
3. **`count_total == births_count`.** Two columns derived from the same expression are computed twice and one is then dropped. Pure waste.

Replacement (≈50× faster, no closure):

```python
agg = (
    ssa.assign(count_m=lambda d: d["count"].where(d["sex"] == "M", 0))
       .groupby(["name", "year"], sort=False)
       .agg(births_count=("count", "sum"), count_m=("count_m", "sum"))
       .reset_index()
)
agg["gender_pct_male"] = agg["count_m"] / agg["births_count"].replace(0, np.nan)
```

### 2b. Search-trends ingestion at `build_annual_panel.py:134` uses `df.iterrows()`

`for _, row in df.iterrows()` over a 100K-row batch, ~70 batches, in pure Python. This is the second-slowest step in Phase 4a and is doing nothing pandas can't vectorize:

```python
df["year"] = pd.to_datetime(df["period_start"]).dt.year
batch_means = (
    df.dropna(subset=["name", "year", "interest_score"])
      .groupby(["name", "year"], sort=False)["interest_score"]
      .mean()
)
# accumulate via running sum/count rather than appending to lists
```

A simpler architectural fix: do the annual mean in a single `pyarrow.compute.group_by` over the whole file and return a DataFrame, not a `dict[(name, year)] -> mean`. The downstream `agg.apply(lambda r: search_annual.get((r["name"], r["year"])), axis=1)` at line 224 is then replaced by a merge.

### 2c. `agg.apply(..., axis=1)` at `build_annual_panel.py:224` is a per-row lookup

For ~3.6M rows, ≈10× slower than `pd.Series(...).map(...)` or a merge. It also double-converts the lookup key into a tuple per row.

### 2d. Phase 4b spelling-of-`event_id` issue

`build_weekly_panel.py:69` declares `event_id` as `pa.string()`. The cultural-events table loader at line 119-120 falls back to `df["id"] = range(len(df))` when no `id` column is present — i.e. an integer. The merged column is then assigned strings *and* (potentially) ints elsewhere depending on the source. The UUID-vs-Int64 bug fixed tonight is exactly this class of issue — and there are at least three other columns in the pipeline whose dtypes are coerced at write time and inferred at read time. Add a Pandera (or even a hand-written) schema check at every parquet boundary, not just at the writer.

### 2e. `--limit` in `build_weekly_panel.py:135-138` truncates *before* z-score and rolling baseline are computed

That is correct for the lazy-load path (less data, faster) but means a `--limit 100` smoke test produces statistically different `search_score_normalized` values than the full run, because the normalization is per-name and the rolling baseline is per-name — but the *event proximity* loop iterates `events.iterrows()` (row 161) over the *full* event table even when only 100 names have data. The merge then writes events for names that aren't in the panel into a no-op branch (`if not mask.any(): continue`). Fine for correctness; wasteful for a smoke test that's supposed to be cheap.

### 2f. Phase 4a fills missing search weeks with 0.0, then Phase 7a treats 0.0 as missing

`granger_panel.py:91-95` documents the hack:

> The annual panel has search_score_annual_mean of 0.0 (not NaN) for pre-2004 years because the Phase 4a builder filled missing weeks with 0.

…and then drops those rows on line 178. This means **every downstream consumer that doesn't know to filter `> 0` will compute means/correlations against synthetic zeros.** The right fix is at the source: Phase 4a should write NaN for "no Trends data," not 0. Anyone doing a quick `panel.search_score_annual_mean.mean()` today gets a number that is biased toward zero by the entire pre-2004 era.

### 2g. Phase 5 N_e calibration is suspicious

`fit_null_model.py:200` hardcodes `n_e = 5000` *inside* the `estimate_innovation_rate_and_ne` function whose docstring claims to "calibrate N_e via binary search." The actual binary search lives in `calibrate_ne_per_sex` (line 241), which *does* run, but the dead code path remains and the comment block on lines 192-201 ends with "we'll calibrate more carefully" then immediately returns 5000. If `calibrate_ne_per_sex` ever fails silently (it has a `result[sex] = 5000.0` fallback at line 273), the published 9,852 / 22,320 numbers in `methodology.md` are wrong and nobody knows.

---

## 3. Silent failures

### 3a. `granger_for_series` undercounts degeneracy (CRITICAL)

The headline number from Phase 7a is "4,185 names with valid Granger tests." Three failure modes get logged but not deducted:

1. statsmodels emits `granger_failed reason=constant values ...` as a `log.warning` (line 210) — this *does* return None, so it's actually accounted for. Good.
2. **However**, when `result[lag][0]["ssr_ftest"]` returns a tuple where the F-statistic is a Python `nan` because the regression was rank-deficient *but didn't raise*, the per-lag is set to NaN (line 222-223). If at least one of the three lags has a real F-stat, `valid_lags` is non-empty, and the row is counted. The reported "n=4,185" includes these partially-degenerate rows.
3. The `granger_significant_05` flag is computed as `min_pvalue < 0.05` over only the non-NaN lags. A name where lag-1 yields p=0.04 and lag-2/3 are both NaN is reported as "significant at p<0.05" with optimal lag 1, n_obs ≥ 13. There is no way for a downstream reader to know how many of the 901 "significant" results are single-lag flukes.

**Recommended fix:** add a `n_valid_lags` column and require ≥2 valid lags before counting toward the headline. Also count and report the number of names where statsmodels emitted *any* warning during `grangercausalitytests`, captured with `warnings.catch_warnings(record=True)`. Right now `warnings.filterwarnings("ignore")` (line 68) makes the noise invisible — and the operator who watched 4,954 (the live tail count, before dedup) "granger_failed" lines stream by in the logs has no way to reconcile that against "4,185 valid."

### 3b. `--dry-run` in `build_neighborhood_graph.py` is a no-op for performance

Already in the TL;DR. Concretely, lines 199-322 do all the heavy work *unconditionally*. Move the `args.dry_run` check before line 199 and have the dry-run path estimate counts from the blocking statistics at line 195 (which it already has). Otherwise a Modal operator who runs `phase3b_phonetic_neighbors --dry-run` to check disk paths will burn 8 CPUs × 4 hours and still not produce a parquet.

### 3c. Phase 5 `RNG_SEED + 7 + hash(cfg["key"]) % 10000` (`fit_null_model.py:279`)

Python's `hash()` is process-randomized by default since 3.3 (`PYTHONHASHSEED`). Modal containers don't pin `PYTHONHASHSEED`, so **the calibration RNG seed for each (sex, decade) is non-reproducible across runs.** Best case, this changes N_e by ±5% between runs and you don't notice. Worst case, the published N_e numbers in `methodology.md` are not the N_e produced by tonight's run. Use `hashlib.sha1(cfg["key"].encode()).digest()[:4]` or just enumerate the configs and use the index.

### 3d. Phase 11 only copies files written under `/app/docs/research`

`modal_app.py:629-635` is a single-purpose hack:

```python
src = Path("/app/docs/research")
dst = Path(VOLUME_MOUNT) / "reports" / "phase11"
if src.exists():
    for md in src.glob("*.md"):
        shutil.copy2(md, dst / md.name)
```

But `phase7a_granger_causality.md` writes to `/app/docs/research/reports/phase7a_granger_causality.md` — note the **`reports/`** subdirectory. `src.glob("*.md")` is non-recursive. **Every one of the ten phase reports under `docs/research/reports/` is silently dropped** even when phase 11 runs. The orchestrator never copies phase 5 / 6 / 7 / 8 / 9 / 10 reports back. They exist only in the throwaway container's filesystem; a re-run produces them fresh, but `modal volume get` never sees them.

The fix is two characters: `src.rglob("*.md")` plus replicate the relative directory structure. But this should be a per-phase responsibility, not a Phase-11 afterthought — every phase that writes to `docs/research/...` needs to either (a) write to the volume instead, or (b) copy out before exit.

### 3e. `phase11_report` raises on non-zero rc *before* the report copy runs

`modal_app.py:626-637`:

```python
rc = _run_phase("research/phase11_report/generate_report.py", args)
if rc != 0:
    raise RuntimeError(f"generate_report.py exited {rc}")
src = Path("/app/docs/research")
...
```

If the report-generator partially writes (writes 4 of 10 sections, then crashes on a missing input), the `raise` short-circuits before the partial outputs are copied. They're lost. Move the copy *before* the rc check, then re-raise.

### 3f. Spillover analysis loads the **34M-edge** graph then filters in pandas

`spillover_analysis.py:216-228` does `pd.read_parquet(PHONETIC_NEIGHBORS, columns=[...])` — the entire edges file — then filters to `match_type in ('both', 'rhyme')`. On a 34M-edge graph at ~30 bytes/row that's ~1 GB of pandas memory before the filter. Use `pyarrow.dataset` with a pushdown filter or batch the read like `build_annual_panel.load_phonetic_density` already does.

### 3g. Cultural-event subsamples in `granger_panel.py:404-429` swallow Supabase failures

```python
except Exception as e:
    log.warning("subsample_load_failed", error=str(e)[:200])
return subsamples  # empty dict
```

If Supabase is briefly unreachable, the subsample IRFs section of the report becomes "no subsample IRFs available" and the abstract that already claims "aspirational vs cautionary split" no longer matches the table. The orchestrator does not re-run on this. **Either retry-with-backoff or fail loud.**

---

## 4. Reproducibility & state management

### 4a. The volume mount aliasing is clever but fragile

`modal_app.py:60-63` documents that `Path(__file__).parents[4] / "data" / "research"` resolves to `/app/data/research` because `REPO_ROOT = /app` inside the container, and the volume is mounted at `/app/data`. This works **only because every phase script lives at exactly four directory levels deep** (`scripts/python/research/phaseX/foo.py`). The CMU loader and the new phase-11 generator are in slightly different relative positions; if anyone moves a script up or down a directory level, `parents[4]` silently points to nothing useful and writes go to a hallucinated path. This is a recurring class of bug — every script independently computes its own `DATA_ROOT`. Centralize it (env var with a fallback) once.

### 4b. Resume tokens are docstring-only in places

`build_annual_panel.py:28` claims `data/research/_state/phase4__annual.jsonl (one entry per completed decade)`. The actual file does not exist; `ProgressTracker` is imported but never instantiated in `main()`. The phase is **not resumable** despite advertising it. If the 30-minute groupby crashes at minute 25, you start from zero. Same for `build_weekly_panel.py:25`.

### 4c. `_LOADED` global in `supabase_client.py:80-91`

Inside Modal, scripts are invoked via `subprocess.Popen` per phase, so each phase is a fresh process and the cache is harmless. *But* `_run_phase` runs the script as a child of the Modal function process — if anyone refactors `phase7_granger` to call `granger_panel.main()` directly inside the Modal function (the obvious cost optimization), `_LOADED` and `_cached_client` survive across phase invocations and a credential rotation mid-pipeline silently uses the stale client.

### 4d. The `.env.local` requirement is enforced even when env vars are present

`supabase_client.py:88-91`:

```python
env_path = REPO_ROOT / ".env.local"
if not env_path.exists():
    raise RuntimeError(f"missing {env_path}")
load_dotenv(env_path)
```

`modal_app.py:47` works around this with a `touch /app/.env.local` in the image build. It's a *sentinel* to bypass an over-strict check. Do the right thing: `if env_path.exists(): load_dotenv(env_path)` and let the missing-key check at line 105 do the actual work. The current arrangement makes the on-laptop and on-Modal paths different *forever* and the touched empty file is a permanent scar.

### 4e. Orchestrator has no idempotency guard

`run_full_pipeline` (`modal_app.py:658`) re-runs every phase from scratch — there is no "skip if output exists and is newer than inputs" check. A re-run of the orchestrator after a single phase-9 fix re-burns CPU on phases 1-8. `--start-at` works but requires the operator to know what's already done. The volume already contains parquet manifests (`_state/MANIFEST.json`); read them.

### 4f. `RNG_SEED = 42` everywhere — in fit_null_model.py *and* spillover_analysis.py

This is good practice but the random_pair_control sampling in spillover (line 338) reseeds at function entry every call, while the panel-VAR Monte Carlo bootstrap in granger does not seed at all (`irf.errband_mc(orth=True, repl=200, signif=0.05)` uses statsmodels' internal default RNG). The 95% IRF bands in the published Phase 7a report are not reproducible.

---

## 5. Performance traps

### 5a. The Phase-4a 30-minute groupby (already covered in §2a)

The 50× speedup is the single biggest available win.

### 5b. `build_neighborhood_graph.py:179` rebuilds dict via `iterrows`

```python
for _, row in df.iterrows():
    name = row["name"]
    phones = row["phonemes"].split() if row["phonemes"] else []
    phoneme_lists[name] = phones
    onsets[name] = row.get("onset") or get_onset(phones)
    rhymes[name] = get_rhyme(phones)
```

For 30K names this is ~3 seconds; not catastrophic but it's the same anti-pattern as 4a and will show up again at scale. `df.itertuples(index=False)` is 5-10× faster.

### 5c. Cross-correlation analysis O(pairs × years × lags) with Python loop

`spillover_analysis.py:280-335` iterates `strong.itertuples(index=False)` for ~166K pairs. Each iteration does a `pd.Series.reindex().interpolate()` which is the slow path. For the final dataset (when Trends backfill completes and the qualifying-pair count likely doubles), this becomes the bottleneck. Vectorize by stacking into a `(n_pairs, n_years)` ndarray and computing all four lag correlations as a matrix product. ~20× speedup.

### 5d. `load_phonetic_neighbors_for_names` in `fit_null_model.py:87-107` is O(edges × names)

`df["name_a"].isin(names)` over a 500K-row batch is fine, but then `for _, row in relevant.iterrows()` runs Python-per-row. For 34M edges this is ~5-10 minutes. Convert to two `.values` arrays, zip outside iterrows, or materialise as `dict.update` from a `groupby`.

### 5e. `build_weekly_panel.event_lookup` builds via `iterrows` (line 161)

Same anti-pattern. Also: the per-event `mask = trends["name"] == name` followed by `trends.loc[mask, ...].index` is O(panel_size) per event. With ~843 events and a 27M-row weekly panel, that's ~22B comparisons. Build the lookup as a merge instead.

### 5f. Granger panel-VAR bootstrap

`irf.errband_mc(orth=True, repl=200, signif=0.05)` runs 200 statsmodels VAR refits. For the full panel this is documented as memory-spiky in `modal_app.py:225`. Moving from statsmodels' built-in MC to a hand-rolled wild-bootstrap with `joblib.Parallel(n_jobs=-1)` would parallelize across the 16 CPUs you're already paying for; right now it runs single-threaded.

---

## 6. Test coverage

The pipeline is ~6,000 lines of analytical Python with **no `pytest` directory and no CI test job that exercises the phase scripts.** Here is the minimal test set that would have caught the bugs in this memo:

1. **Schema-on-write tests for every parquet boundary.** A 50-line `test_parquet_schemas.py` that loads every output parquet, asserts column names and dtypes, and fails CI if any column drifts. Would have caught the UUID-vs-Int64 issue *before* it shipped: `assert weekly_panel["event_id"].dtype == "string"`.
2. **A "tiny corpus" regression run.** Ten names, two years, run phases 3-7 end-to-end in CI on a fixture set and snapshot the headline stats (n_qualifying, n_significant, IRF h=1) to within ±5%. This is the only way to catch the silent-degeneracy issue in §3a, because the fix changes the *count* but not the schema.
3. **`granger_for_series` unit test with a pathological input.** A ~30-line series where lag-2 and lag-3 are guaranteed to produce NaN F-stats but lag-1 is fine, asserting that the function either returns None or sets `n_valid_lags=1`. Would have driven the `n_valid_lags` column into existence.
4. **`build_annual_panel.aggregating_ssa` correctness test.** Hand-construct a 6-row SSA fixture with known M/F splits, run `build_panel`, assert the gender_pct_male output matches by hand. Would have caught the `ssa.loc[x.index]` closure if anyone refactored.
5. **Modal volume round-trip test.** A `ping_writes` Modal function that writes a known sentinel file under `/app/docs/research/reports/_sentinel.md`, exits, then a second function reads `/app/data/reports/phase11/_sentinel.md` and asserts presence. Would have caught the `glob("*.md")` non-recursive bug in §3d on day one.
6. **Reproducibility test.** Re-run the same phase with the same seed twice in CI, assert byte-identical parquets. Would have caught both the `hash()`-based seeding (§3c) and the unseeded `errband_mc` (§4f).
7. **Dry-run wall-clock budget.** A CI test that asserts `phase3b --dry-run` finishes in <60 seconds on a 5K-name fixture. Would have caught §3b instantly.
8. **PIPELINE_STATUS smoke test.** Assert the status reporter, when pointed at a directory containing a known parquet, reports it as "complete." Would have caught the local-vs-volume disconnect.

There is no shortage of places to start. Pick #1 and #2 and you have prevented half of the bugs in §2 and §3.

---

## 7. Ranked fix list

Effort = naive engineer-time estimate; impact = my judgment on damage avoided.

| # | Fix | Effort | Impact |
|---|-----|--------|--------|
| 1 | Make every phase's report writer either target the volume or be copied out by the orchestrator. Replace `src.glob("*.md")` with `src.rglob("*.md")` in `modal_app.py:633` and preserve the relative directory structure. (§3d) | 1 hour | **High** — currently every phase 5-10 report is being lost on Modal. The reports we trust are all from before the cloud move. |
| 2 | Rewrite `build_annual_panel.py:184-195` to use a vectorized M/F sum and a single merge for `search_annual`. (§2a, §2c) | 1 hour | **High** — turns a 30-min step into ~30 sec, and removes a real correctness risk. |
| 3 | Add `n_valid_lags` to `granger_for_series` and require ≥2 for the headline count; capture `warnings.catch_warnings(record=True)` around `grangercausalitytests` and report the warning categories. (§3a) | 1 day | **High** — current Phase 7a abstract overstates "valid tests." |
| 4 | Move `args.dry_run` short-circuit in `build_neighborhood_graph.py` to before line 199. Print blocking statistics and exit. (§3b) | 1 hour | **High** — cheap, prevents a 4-hour mistake. |
| 5 | Fix Phase 4a NaN-vs-zero for `search_score_annual_mean` at the source: write NaN when no Trends data, drop the "treat 0 as missing" hack in Phase 7. (§2f) | 1 day | **High** — also fixes a class of "what does a zero mean here" questions for downstream consumers of `annual_panel.parquet`. |
| 6 | Wire up the resumable checkpoints that the docstrings already promise in `build_annual_panel.py` and `build_weekly_panel.py`. At minimum, a "skip if output exists and source mtimes are older" guard. (§4b, §4e) | 1 day | **Medium** — turns multi-hour failures from start-overs into resumes. |
| 7 | Add Pandera schemas for every parquet boundary plus a `test_parquet_schemas.py` in CI. (§2d, test #1) | 1 day | **Medium** — catches the UUID/Int64 class of bug structurally. |
| 8 | Replace `hash(cfg["key"]) % 10000` (`fit_null_model.py:279`) with a deterministic hash, set `irf.errband_mc(seed=...)` (or wrap with `np.random.seed`). (§3c, §4f) | 1 hour | **Medium** — currently the published N_e and IRF bands are not reproducible across runs. |
| 9 | Fix `supabase_client._ensure_env_loaded` to make `.env.local` optional when the required env vars are present. Drop the `touch /app/.env.local` from the Modal image. (§4d) | 1 hour | **Low** — quality-of-life and removes a long-term scar, but not blocking. |
| 10 | Repoint `report_pipeline_status.py` at the Modal volume (or run it as a Modal function and commit the result). Currently the auto-generated `PIPELINE_STATUS.md` says everything is "Not Started" because the local checkout has no parquet. (§1, bullet 5) | 1 day | **Medium** — operationally important; the doc is the first thing people look at. |

Honourable mentions, not in the top 10 but worth scheduling:

- **§2g** Phase 5 calibration: remove the dead `n_e = 5000` from `estimate_innovation_rate_and_ne`, propagate the *actual* fitted N_e through `methodology.md` automatically (the doc is hand-edited; that means it goes stale).
- **§3g** Subsample loaders should retry-with-backoff or fail loud, not swallow.
- **§5c, §5d, §5e** vectorize the three remaining `iterrows` hotspots before the Trends backfill doubles the panel size.
- **§4a** centralize `DATA_ROOT` as an env var with a fallback so the `parents[4]` arithmetic isn't repeated in every phase.
- A **"tiny-corpus" regression test** (test #2 above) is the single highest-leverage testing investment; it caps the entire class of "the numbers changed but no one noticed."

---

## Closing note

The pipeline is impressively complete in scope and the methodology is sound; the issues above are overwhelmingly *plumbing*, not statistics. The Granger and panel-VAR work is the right kind of analysis for the question being asked. But until §3a and §3d are fixed, the headline numbers in the Phase 7a report and the report files themselves are partially the artifact of bugs, not findings. Fix the silent failures first, then the performance, then the tests. The slow groupby in Phase 4a is the most embarrassing thing on this list and the easiest to fix; do it tomorrow morning.
