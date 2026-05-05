# Emotion corpus expansion — sourcing log (ASN-930)

**Wave:** Emotion Surfaces (ASN-930..938)  
**Goal:** Broaden CC0/PD figurative coverage so crowd-rating pools (ASN-934) are not biased toward grief/yearning/tenderness-adjacent tones.  
**Image-level emotion labels** still flow through passage ↔ image pairings (ASN-931); this doc tracks **library growth** and **passage-side** counts as a tilt proxy.

## Underserved primaries (query packs live in code)

Canonical list: `EMOTION_CORPUS_UNDERSERVED_PRIMARIES` in `lib/artwork/emotion-discovery-packs.ts`.

| Primary    | Runbook target (approved units) | Notes |
|-----------|-----------------------------------|--------|
| anger     | ≥40                               | Myth/combat + moral outrage subjects |
| anxiety   | ≥40                               | Night, storm, expressionist isolation |
| confusion | ≥40                               | Dreamlike / ambiguous crowds |
| disgust   | ≥40                               | Grotesque, memento mori (curatorial register) |
| excitement| ≥40                               | Triumph, festival, dance |
| fear      | ≥40                               | Horror, inferno, skeleton — boundary-sensitive |
| joy       | ≥40                               | Non-tenderness celebration (distinct from tenderness) |
| realization | ≥40                             | Vision, conversion, annunciation-adjacent |
| surprise  | ≥40                               | Astonishment, discovery |

If a museum/API genuinely returns fewer than 25 viable hits after boundary + license filters, **document the gap** here and lower that row only for that emotion.

## Per-emotion audit — passage corpus (`loom_passage_tags`)

Passage tags are the only per-emotion row counts wired today (ASN-588). Refresh counts anytime:

```bash
npm run artwork:discover:emotion -- --audit
```

Paste TSV output below when you run it (initial snapshot placeholder until first run lands in git).

### Snapshot: passage_primary counts (2026-04-29, linked dev DB)

```
admiration	0
anger	0
anxiety	0
chagrin	0
confusion	0
desire	0
disappointment	0
disgust	0
embarrassment	0
excitement	0
exposure-dread	0
fear	0
grief	0
guilt	0
humiliation	0
joy	0
love	0
mortification	0
nostalgia	0
pride	0
pride-as-defense	0
realization	0
relief	0
remorse	0
sadness	0
shame	0
surprise	0
tenderness	0
yearning	0
```

All zeros here means `loom_passage_tags` is not yet populated on this database (or bulk tagging has not run); re-run `npm run artwork:discover:emotion -- --audit` after memoir taxonomy ingest.

### Active image library size

**1356** `experience_units` with `status = 'active'` (same audit run). Image↔emotion distributions await ASN-931 pairings + later decomposition/telemetry.

## Discovery commands

Preview candidates (Met + ARTIC + BnF default):

```bash
npm run artwork:discover:emotion -- --emotion fear --sources met,artic,bnf --limit-per-query 12
```

Dry-run (queries only):

```bash
npm run artwork:discover:emotion -- --emotion anger --dry-run
```

Europeana (probationary key, session cap — see `scripts/sources/europeana.ts`):

```bash
npm run artwork:discover:emotion -- --emotion fear --sources europeana
```

Smithsonian EDAN bulk has **no** HTTP search client in-repo; hints for shard grep:

```bash
npm run artwork:discover:emotion -- --emotion disgust --sources smithsonian --dry-run
```

Then use substring hints printed with `scripts/ingest/smithsonian.ts` workflows.

## Sourcing log — operator-maintained

| Emotion | Queued (IDs / batch) | Approved | Rejected | Curator notes |
|---------|----------------------|----------|----------|----------------|
| …       | …                    | …        | …        | …              |

After approval: units follow existing `decompose` + `content_attribution` pipeline like all ingests.

## Sourcing log — 2026-05-04 deep-research arrival

External LLM bring-back returned: 36 runs (30 per-emotion via Prompt 1 on OpenAI Deep Research; 6 cross-cutting via Prompts 2–5 split between OpenAI and Claude). Full archive at `docs/research/emotion-corpus-expansion/external-runs/`; INDEX, plan, and cross-citation digest alongside.

**Counts:**

| Source | Count | Notes |
|---|---|---|
| Per-emotion runs (Prompt 1, OpenAI) | 30 | one per primary emotion |
| Cross-cutting source-discovery runs (Prompt 2) | 2 | OpenAI + Claude (paired for convergence reading) |
| Cross-cutting historiography runs (Prompt 3) | 2 | OpenAI + Claude |
| Cross-cultural ethnography runs (Prompt 4) | 1 | Claude only — OpenAI counterpart future bring-back |
| Therapy-transcript discovery runs (Prompt 5) | 1 | Claude only — OpenAI counterpart future bring-back |
| **Total** | **36** | |

**Citations extracted:** ~1,200 unique works across the 36 runs (per `EXTRACTED-CITATIONS-2026-05-04.md`). Section A (per-emotion canonical texts) covered Anger through Grief in full; remaining 15 emotions referenced structurally — follow-up Phase 2.5 needed for full extraction.

**Downstream surfaces updated by this arrival:**

- `docs/research/corpus-acquisition/EMOTION-CORPUS.md` — *Bring-back arrival — 2026-05-04* section appended; ~70 new MIKE-ACQUIRE rows; ~17 new PD-AUTO candidates.
- `docs/research/corpus-acquisition/THERAPY-TRANSCRIPT-CORPUS.md` — same appendage; ~30 new rows.
- `docs/research/corpus-acquisition/CROSS-CULTURAL-EMOTION-ETHNOGRAPHY.md` — NEW sibling tracker created from Prompt 4 (cross-cultural ethnography) + cross-cultural sections of per-emotion runs.
- `docs/RESEARCH-PROGRAM.md` §VI-B — new emotion-research thread block; provisional EM.1..EM.5 RQs.
- `docs/research/papers/emotion-research-program-public-introduction.md` — public-facing essay (draft v1).
- `docs/research/emotion-research-program-literature-map.md` — scaffold with column structure + cross-cutting rows populated.
- `docs/research/emotion-research-program-bibliography.bib` — draft v1 with ~95 BibTeX entries spanning historiography (§A), constructionist/appraisal/affect-theory (§B), cross-cultural ethnography (§C), religious + contemplative (§D), per-emotion canonical Anger–Grief (§E), memoir CONVERGENT canon (§F), therapy canon (§G).
- `docs/research/OVERVIEW.md` — emotion-research thread row added to *parallel threads* + *what is published*.
- `docs/research/PIPELINE_STATUS.md` — emotion-research entry added to *Running*.

**Convergent-source highlights (cited 3+ times across per-emotion runs OR cross-cutting LLM agreement):**

- Catherine Lutz, *Unnatural Emotions* (1988) — 8+ emotion runs.
- Anna Wierzbicka, *Emotions Across Languages and Cultures* (1999) — 10+ emotion runs.
- Aristotle, *Rhetoric* — 4+ emotion runs (anger, fear, contempt, etc.).
- Søren Kierkegaard, *The Concept of Anxiety* (1844) — 3+ emotion runs.
- Heidegger, *Being and Time* §40 — 4+ emotion runs.
- Mary Karr, *The Liars' Club* + *Lit* — both CONVERGENT across OpenAI and Claude on Prompt 2.
- Joan Didion, *The Year of Magical Thinking* — 4+ emotion runs (grief, bewilderment, disappointment).
- C. S. Lewis, *A Grief Observed* + *Surprised by Joy* — both CONVERGENT.
- Yalom, *Love's Executioner* — 4+ runs (desire, grief, source-discovery, therapy-discovery).

**Honest gaps flagged across the bring-back (consolidated from §J of digest):** East/Southeast Asian memoir; Continental European clinical writing; non-Anglophone ethnography beyond the canonical Lutz/Levy/Briggs lineage; emerging indigenous emotion frameworks beyond Kimmerer/Krenak/Akomolafe; disability/trans/sex-work memoir under-cited; mid-20th-c. Eastern European confessional traditions suspected to exist but undercited.

**Next:**

- **Phase 2.5** — extract per-emotion canonical anchors for the remaining 15 emotions (joy, hope, jealousy, longing, loneliness, love, nostalgia, pride, relief, resentment, sadness, shame, tenderness, trust, despair, contentment, contempt, boredom, bewilderment, awe). Filed as a follow-up under ASN-1023.
- **Phase 4** — `lib/loom/taxonomy/emotion.ts` extension covering 12 candidate primary additions identified in the bring-back INDEX (awe, bewilderment, boredom, contempt, contentment, despair, gratitude, hope, jealousy, loneliness, resentment, trust). Plus longing↔yearning collapse-or-keep decision per the OpenAI longing run §1.

## Engineering shipped (2026-04-29)

- `lib/artwork/emotion-discovery-packs.ts` — shared packs + Europeana strategy shapes + Smithsonian EDAN term hints.
- `scripts/artwork/discover-by-emotion.ts` — CLI: `--emotion`, `--sources`, `--audit`, `--list-emotions`.
- `getEmotionDiscoveryQueriesForMet|Artic|Bnf`, `getSmithsonianEmotionEdanTermHints` on museum clients.
- `searchEuropeana({ strategies })` override for emotion-targeted Europeana runs.
- `npm run artwork:discover:emotion`.
