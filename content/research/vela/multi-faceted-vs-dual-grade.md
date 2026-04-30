# Multi-faceted vs `ingest:dual` — comparison memo

ASN-689 acceptance artifact. Updated 2026-04-29 with empirical probe data
from the path-B kickoff. Full-book live runs still open.

## Why we run both

`ingest:dual` and the multi-faceted pipeline serve different consumers.
They are not substitutes; this memo is the running record of what each
produces on the same source.

| | `ingest:dual` | `multi-faceted` |
|---|---|---|
| Consumer | Mosaic editorial · retrieval · audits | `/sources/[code]` profile · factory corpus surfaces |
| Output shape | Curator passages (~15) + research-bulk (~50–150) | Models / Constructs / Instruments / Factor model / Chapter summaries / Case studies (+opt-in Propositions / Supports) |
| Granularity | Passage chunks (~500 words) | Typed entities, per chapter |
| Per-book cost (sonnet 4.6, default tier, with chapter caching) | ~$0.30 (embed + chunk LLMs are cheap) | $4.30–$7.54 (12-chapter book) |
| Per-book cost (deep tier, +propositions) | n/a | $6.46–$12.34 |
| Fail mode if absent | Retrieval against the source returns unrelated high-similarity hits | `/sources/[code]` panel is empty for the source |

## Probe data — Maslow, *A Theory of Human Motivation* (60KB chunk, 2026-04-29)

Path-B validation runs on a single representative chunk.

### Probe 1: entities bundle vs three singles control (untuned)

| | Bundle | Singles |
|---|---|---|
| Models | 1 | 1 |
| Constructs | 10 | 8 |
| Instruments | 0 | 0 |
| Cost | $0.115 | $0.252 |
| Stop | clean | clean |

54.1% savings; comparable counts; bundle's first-model fields slightly
shallower than singles (e.g. `key_meta_analytic_correlates: []` vs 5
entries; `aggregation_rules` shorter).

### Probe 2: entities bundle (tuned with FIELD COMPLETENESS) vs singles

| | Bundle | Singles |
|---|---|---|
| Models | 1 | 1 |
| Constructs | 9 | 9 |
| Instruments | 0 | 0 |
| Cost | $0.121 | $0.256 |
| Stop | clean | clean (1 parse error on instruments singleton) |

52.9% savings; counts match; bundle's `aggregation_rules` is now **richer
than singles** (captured the specific 85/70/50/40/10 satisfaction
percentages). **Crucial finding: singles hallucinated
`first_publication_year: 1943`; bundle correctly returned `null` because
the chunk contains zero mentions of 1943.** The FIELD COMPLETENESS rule
made the bundle more source-faithful, not just cheaper. Memory:
`feedback_bundled_prompts_source_fidelity`.

### Probe 3: argument bundle (factor_model + propositions + supports)

| | Result |
|---|---|
| stop_reason | `max_tokens` |
| Output truncated | yes, mid-string at position 46274 |
| Cost | $0.257 |

The bundle exceeded the 12K output-token budget. Propositions extraction
is intrinsically high-output (20–50+ per chapter, each ~50 tokens). **The
bundle pattern doesn't fit propositions.** Decision: split argument back —
factor_model becomes a singleton (small output), propositions becomes a
separate opt-in single.

### Probe 4: narrative bundle (chapter_summary + case_studies)

| | Result |
|---|---|
| stop_reason | clean (`end_turn`) |
| chapter_summary | 1 (rich — logline + pitch + story_script + 12 takeaways + 7 key_questions + 10 misconceptions) |
| case_studies | 7 (each typed and outcome-coded) |
| Output tokens | 15,442 of 16,000 budget |
| Cost | $0.308 |

Works at the limit of the 16K budget. High-value output but expensive.

## Per-bundle decision (path-B post-probe)

| Bundle | Status | Cost/chapter | In default tier? |
|---|---|---|---|
| `entities` | ✓ ship | ~$0.12 | yes |
| `factor_model` (singleton) | ✓ ship | ~$0.05 | yes |
| `narrative` | ✓ ship | ~$0.31 | yes |
| `propositions` (singleton) | ✓ ship | ~$0.20–$0.40 | **opt-in** via `--include-propositions` |

## Tier model

Mike, 2026-04-29: *"books we need or want to go deep on, or that we intend
to do a broader guide based on (in synthesis with other hand selected
books) — then we get the more expensive propositions. That until we are
flush with money and can spend the extra money to just have it on hand."*

- **Default tier** (entities + factor_model + narrative): $4.30–$7.54
  per 12-chapter book. Always run on vela-tagged sources we want public
  source profiles for.
- **Deep tier** (+propositions): $6.46–$12.34 per book. Reserved for
  books that anchor a guide / cross-source synthesis or that we want
  full argument-graph treatment on. Toggle: `--include-propositions`.

## What multi-faceted captures that `ingest:dual` does not

Concrete examples from the Maslow probe outputs:

1. **Named theoretical models** with explicit factor structure. The
   entities bundle returned Maslow's Hierarchy as a typed entity with
   `primary_factors: [Physiological, Safety, Love, Esteem,
   Self-Actualization, Self-Transcendence, Cognitive Needs]`,
   `aggregation_rules` capturing the partial-satisfaction percentages
   (85/70/50/40/10), and a `cluster_category: Motivation`. Passage chunks
   from `ingest:dual` could not surface this in queryable form.
2. **Constructs as cards.** 9 typed constructs (Physiological Needs,
   Safety Needs, Self-Actualization, Self-Transcendence, Prepotency, …)
   each with definition + level + linked models. A query for
   "self-actualization" hits the construct card directly rather than
   passage excerpts.
3. **Chapter summary as a story-shape.** logline, pitch, character /
   problem / guide / plan / call-to-action, transformative_journey, key
   questions, misconceptions, takeaways. Useful for editorial reading
   guides built from a source.
4. **Case studies typed and outcome-coded.** "The Chronically and
   Extremely Hungry Man" / "The Psychopathic Personality" / "Martyrs and
   Idealists" — each with type, outcome_type, conflict, illustrates,
   themes, quotes.

## What `ingest:dual` captures that multi-faceted does not

1. **Long-form passage retrieval** for any claim. Multi-faceted indexes
   typed entities; it does not replace passage-level evidence retrieval.
2. **Magazine-grade pull quotes** with charge tier and arc-stage tagging
   (curator pass).
3. **Embedding-backed similarity** at passage level. Multi-faceted
   entities are not embedded in this iteration (follow-up scope).

## Cost / time per book

Filled per book after the first live full-book run. The chunk-level
probe data already published above.

| Book | book_key | dual-grade passages | multi-faceted entities | tier | run log | actual cost |
|---|---|---|---|---|---|---|
| TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| TBD | TBD | TBD | TBD | TBD | TBD | TBD |

## Decision matrix

When a vela-tagged book lands, which pipelines should we run, in what
order?

1. **Always run `ingest:dual` first.** Cheap; fixes retrieval; everything
   else depends on a queryable corpus.
2. **Run default-tier `multi-faceted` for vela-audience books we want to
   feature** on the source profile. Reserve for sources reached from
   magazine articles, museum tours, or the reading list.
3. **Add `--include-propositions` for books that anchor a guide** —
   broader cross-source synthesis where the argument-graph queries pay
   off. Mike's "until we're flush" tier.
4. **Skip multi-faceted entirely for factory-internal sources** unless
   we later want a per-source factory studio surface. The current ASN-685
   panel is public-facing; factory-internal extraction adds spend without
   UI payoff.

## Open questions

- Should multi-faceted entities also be embedded for retrieval (parallel
  to `mosaic_passages.embedding`)? Decide once ASN-690's suggestion
  engine for the magazine editor defines the retrieval shape.
- Aggregator + referee passes are scaffolded in the design doc but not
  yet wired in the orchestrator's `--execute` path. Add when the
  per-chapter loop is validated end-to-end on a real book.
- Long books (>1MB source, chapters >200KB each) will land toward the
  high end of the cost envelope because input-cost grows. May want a
  sub-chapter split strategy honoring sub-headers (per book-ingestion
  rule 2). Defer until a real long-book run shows the actual hit.

## How to extend this memo

After every multi-faceted run:

1. Append a row to the *Cost / time per book* table with concrete numbers.
2. If the run surfaced something the prompt set didn't anticipate, note
   it in *What multi-faceted captures*.
3. If a bundle's actuals differ materially from the envelope, update the
   per-bundle envelope in `lib/factory/multi-faceted-pipeline.ts` and
   re-publish here.
4. Revise the decision matrix if a pattern emerges.

The run log lives at `data/factory-outputs/research/run-logs/<book_key>-<ts>.json`
and is the source of truth for these numbers.
