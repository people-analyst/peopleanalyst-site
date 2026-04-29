---
title: "Diversity of beauty across museum collections — research questions"
subtitle: "Bootstrap of the museum diversity-of-beauty thread. Three sub-questions on cross-institution variation, alignment with serving populations, and temporal change."
status: v1 — questions doc only; analysis is downstream
date: 2026-04-29
audience: Research surface — outside-reader register; outline of the thread, not a study report
authors: ["Mike West"]
---

# Diversity of beauty across museum collections — research questions

A museum's collection is a curatorial decision compounded over a century-plus of acquisitions, deaccessions, and gifts. Treated as a corpus, it is itself a measurement of what a culture has chosen to call beautiful, and of whose beauty it has chosen to preserve. This thread asks how that measurement varies — across institutions, between an institution and the population it physically serves, and over time. The intent is descriptive, not prosecutorial: museums make choices, those choices accumulate, and the accumulated record is legible if one is willing to count.

The thread sits inside the broader Vela instrument frame. The same architecture that lets us decompose individual-viewer desire (the player; the engine documented at `docs/REINCARNATION.md`) extends naturally to corpus-level questions if one treats *the curator* as a respondent and *the collection* as an aggregated response set.

## Sub-question (a) — museum vs. museum

**How does the diversity of beauty represented vary across institutions?** Take five major museums currently feeding Vela's discovery layer (Art Institute of Chicago, the Metropolitan Museum, Bibliothèque nationale de France, Smithsonian Open Access, Europeana) and a sixth — the Rijksmuseum — for breadth. Operationalise *diversity* on four dimensions:

- **Cultural representation** — region or culture of subject; region or culture of artist
- **Physical representation** — gender presentation, approximate age band, race / ethnicity, body-type cluster (where readable)
- **Temporal coverage** — date of creation (not date of acquisition; distinguish)
- **Medium** — oil, drawing, print, sculpture, photograph, manuscript, digital

Compute per-museum diversity indices (Simpson, Shannon, or Jensen–Shannon depending on the dimension) and pairwise comparisons with appropriate multiple-comparison correction. The comparison answers a real question: is "the Western canon" what these institutions actually surface, or do they differ from each other in legible ways?

This is the most tractable of the three sub-questions because the corpora already exist via the museum adapters at `scripts/artwork/sources/`. What's missing is the labeled-diversity overlay — adding subject demographics + cultural origin metadata at scale is the engineering task, and the LLM-labeling reliability of those labels is the headline limitation any analysis must own.

## Sub-question (b) — museum vs. its primary serving location

**For a given museum, how does the diversity of its corpus compare to the diversity of the population it primarily serves?** Pittsburgh is two-thirds white; the Carnegie Museum of Art is sited there. Chicago is one-third Black, Latino, and Asian respectively; the Art Institute is sited there. Paris is one-fifth foreign-born; the Louvre and the BnF are sited there. The interesting finding-shape is the per-museum trajectory of *divergence* between its corpus and its catchment population — which dimensions diverge, by how much, and in which direction.

The data layer this sub-question requires does not yet exist in Vela. It needs population-level demography at the metro level: US Census / American Community Survey for US institutions, Eurostat / national censuses for European ones. Adding that layer is its own ASN. The analytical move once the layer is in place is straightforward: compare per-museum corpus diversity (from sub-question a) against per-region population diversity, dimension by dimension; report the gap.

This is a politically charged comparison, and the methods doc that frames it must be careful. The intent is descriptive, the limitations are real (a museum is not strictly accountable to its city's demographics — its donors, its peer institutions, its founding-era pedagogical mission, all shape acquisitions), and the published write-up should make space for those caveats rather than burying them.

## Sub-question (c) — temporal change using artwork dates

**Using the date of creation field, how has the diversity of beauty represented shifted over time?** Slice each museum's corpus into per-decade or per-half-century buckets and compute the same diversity indices per bucket. The interesting finding-shape is the per-museum trajectory: are institutions converging (modern acquisitions broadening the cross-institutional consensus) or diverging (institutions specialising into distinguishable curatorial profiles)? Are there inflection points?

A subtle confound: the *date of creation* is a property of the work, not of the museum's act of curation. A museum that mostly acquired 19th-century work will have a 19th-century-shaped corpus regardless of when it acquired the pieces. To separate "what the museum chose" from "what was made," the analysis needs both creation date and acquisition date — the latter is patchier in the public APIs but is recoverable for many works. A comparison that holds creation-decade fixed and varies acquisition-decade is the cleanest read of curatorial change.

## Methods sketch

A proper analysis requires three artifacts that are partially in place: a normalised cross-museum schema (substantially in place via the existing adapters); a labeled-diversity overlay (mostly missing; flag as a corpus task); and a population-data layer (external; flag as ingest task). The order is: schema first, overlay second, population third. The first analysis (sub-question a) doesn't need the population layer; (b) does. The preregistration must commit to museums-included, sampling rule, labeling schema, exclusion rules, and comparison metric *before* the first comparison is run; per the program's "design before data" rule.

## What this thread is not

This thread is not a critique-of-museums project; the descriptive question is the question, and the moral interpretation belongs to readers and to the institutions themselves. It is not a single-museum case study; the comparison is the point. It is not a "here is the answer" piece; the program states the questions, then earns the answers in subsequent ASNs (sub-question (a) is queued at ASN-981; (b) and (c) follow once their data layers exist). And it is not a stand-in for individual-viewer research — the player and the engine answer different questions about how *people* respond to figurative work. This thread asks how *institutions* have answered them, sorted, kept, and shown.

## What's next

ASN-981 (museum-diversity sub-question (a) — analysis) is filed and ready to claim once a research agent has bandwidth. The preregistration commits before the analysis script runs. Sub-questions (b) and (c) wait on their respective data layers; population-data ingest and acquisition-date enrichment are separate ASNs to be filed when (a) lands.

Correspondence on the thread: `mike@peopleanalyst.com`.
