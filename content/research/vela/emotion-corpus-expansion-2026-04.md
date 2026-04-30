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

## Engineering shipped (2026-04-29)

- `lib/artwork/emotion-discovery-packs.ts` — shared packs + Europeana strategy shapes + Smithsonian EDAN term hints.
- `scripts/artwork/discover-by-emotion.ts` — CLI: `--emotion`, `--sources`, `--audit`, `--list-emotions`.
- `getEmotionDiscoveryQueriesForMet|Artic|Bnf`, `getSmithsonianEmotionEdanTermHints` on museum clients.
- `searchEuropeana({ strategies })` override for emotion-targeted Europeana runs.
- `npm run artwork:discover:emotion`.
