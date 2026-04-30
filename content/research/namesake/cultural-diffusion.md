---
title: "What Makes a Baby Name Go Viral?"
description: "A data analysis of 843 cultural events and their impact on baby naming across 145 years of SSA birth records"
publishedAt: "2026-04-18"
status: published
authors: ["Mike West"]
featured: true
---

## When a cartoon becomes a kindergarten

In 2012, *The Legend of Korra* premiered on Nickelodeon. The Social Security Administration's annual baby name file is one of the slowest, sturdiest cultural mirrors America keeps — it lags fashion, it ignores hype, it requires a parent to walk into a hospital room and write something on a form. And yet, by 2013, the name *Korra* had appeared in SSA birth data for the first time. By 2015, more than 200 American babies were named Korra in a single year. A four-letter word invented by a writers' room in Burbank had crossed the threshold from fiction into a generation of birth certificates.

Korra is not an anomaly. It is the rule.

In 2020, *Breonna* — a name that had drifted in the low hundreds for two decades — surged in the months after Breonna Taylor's death and the protests that followed. In 2022, the name *Elden* appeared in SSA records for the first time in years, weeks after FromSoftware shipped *Elden Ring*. In 2024, *Griselda* — long associated with a 14th-century literary heroine almost no living American had read — climbed sharply after Sofía Vergara's Netflix series of the same name. That same year, *Anora*, the name of Sean Baker's Palme d'Or-winning film, began appearing in search data months before its theatrical release and in birth data months after.

These four names share nothing in common except this: somebody made something, somebody else watched it, and a few months later a parent in a hospital room reached for a pen. Film, news, video games, prestige television — the diversity of the sources is the point. There is no single cultural pipeline. There are dozens, all running in parallel, all leaking into the same maternity wards.

This is a report about what we found when we tried to measure that leak.

> **For parents:** Read the plain-language version of these findings →
> [Why Names Go In and Out of Fashion](/guide/why-names-go-in-and-out-of-fashion)

## What we built

Over the past four months we assembled what we believe is the most complete dataset ever constructed for studying cultural influence on American baby naming. It has four pieces.

The first is the SSA birth name corpus — **43,334 distinct names** across **145 years** of annual records from 1880 to 2024. Every name above the privacy threshold of five births in a state in a year is in there. It is the bedrock dataset of American naming, and on its own it tells you almost nothing about *why*.

The second piece is **20 years of weekly Google Trends** search data, name by name. Search interest is messy — it captures curiosity, news cycles, school assignments, and people typing their own names into a box at 2 a.m. — but it moves faster than birth records, and that speed is what makes it useful. If you want to see culture hit a name, search trends see it first.

The third piece is **843 cultural events**, each one attributed to a specific name with high confidence. An "event" here means a moment we can point at: a film release, a news cycle, a record drop, a championship win, a viral moment. Each event was extracted by an LLM pipeline from Wikipedia, OMDb, and curated reference sources, then filtered against a confidence threshold and spot-checked against the SSA series for plausibility.

The fourth piece is the hardest to explain and the most important: a **null model**. The model is borrowed from a 1999 paper by the sociologist Stanley Lieberson, who pointed out that even if names were chosen completely at random — like a ball bouncing around a roulette wheel of phonemes — you would still see a certain amount of churn in the top 100 every decade. Names would rise and fall just from drift. Lieberson's question was whether real-world churn exceeds drift. His answer was yes, and our updated version of his model, fit to 145 years of data, agrees with him. The actual churn in the American name distribution is higher than drift predicts. Something is pushing names around.

That something is culture. The rest of this report is an attempt to look at it directly.

## The findings

### 1. Cultural events cause measurable birth surges

Of the 843 attributed events, the breakdown skews toward screen storytelling, but not as much as you might expect: **242 film events, 235 television events, 151 news and public-figure events, 87 music events, 78 sports events**, and a long tail of literature, video games, and viral internet moments. A third of the corpus is news and non-fiction. Real people move names roughly as often as fictional ones do.

The size of the birth lift varies wildly. Some events are barely visible above noise; others — *Khaleesi* after *Game of Thrones*, *Arya* after the same show, *Kylo* after *The Force Awakens* — show up as near-vertical step functions in the SSA series. Of the 643 events with sufficient pre- and post-event data to compute a three-year windowed comparison, **the median adoption lift is 24.8 rank positions** — meaning attributed names typically improve their SSA rank by about 25 places in the three years following a cultural moment (a median percent change of +3.2% in underlying frequency). The effect is heavily right-skewed: a handful of major cultural events — *Korra*, *Kylo*, *Barack*, *Coraline*, *Dune* — drive outsized lifts that dwarf the bottom of the distribution by more than an order of magnitude, while the median is more modest.

The effect varies substantially by event type. Among the well-powered categories, **film characters show the largest median lift (122 ranks, n=171)**, followed by sports moments (99 ranks, n=56) and royal events (30 ranks, n=3). Two smaller-sample categories — celebrity births (248 ranks, n=10) and video games (113 ranks, n=3) — post even higher medians but with too few observations to draw firm conclusions. Three categories show *negative* median lifts: news events (−13 ranks, n=121), TV characters (−14, n=190), and music charts (−3, n=68). The news-event result is the one we want to dwell on, and we do below. The TV and music results are mostly an artifact of category composition — TV includes long-running ensemble shows with many minor characters whose names barely move, and music charts include chart-position events that don't have the character-anchoring effect of a named protagonist.

**Lead characters convert better than supporting characters.** Of the 130 film and television events for which we have linked TMDb cast data, **43.8% (57 events) involve a lead character** — a role cast at top billing (cast_order ≤ 2) — while the remaining 56.2% attribute to supporting or ensemble roles. This matters because the lead/supporting split predicts outcomes: a protagonist whose name is spoken in every episode is structurally louder in the cultural conversation than a side character, and the per-event-type medians above are the aggregate echo of that loudness difference.

### 2. Search predicts births one to three years in advance

This is the most useful finding for anyone who wants to forecast naming, and it falls out of a formal Granger-causality test we ran on the merged Trends-and-SSA panel. Across **4,185 names** with at least thirteen usable years of paired weekly search interest and annual SSA records, **21.5% (901 names) show statistically significant evidence that search interest predicts SSA births at p < 0.05**, with a **median optimal lag of two years**. At a stricter threshold, 8.0% clear p < 0.01. The lag window — the gap between the moment a culture becomes interested in a name and the moment a meaningful number of parents act on that interest — is roughly the length of a pregnancy plus a year of "let's see if we still like it," and it holds as a population-level effect even after per-name bootstrap correction.

Practically, this means you can see a wave coming. The names that will appear in 2027's SSA file are, to a surprising extent, already visible in 2026's search data.

### 3. Not all cultural events are equal — and some actively repel parents

The cleanest causal story — film comes out, name goes up — is real, but it is not the only story in the data. The panel-VAR impulse response functions we estimated as part of the Phase 7a Granger work reveal a striking asymmetry, and it is the most important single finding in this report.

**Aspirational cultural events show positive impulse responses. Cautionary ones show negative impulse responses at the same horizons.** Film characters show a positive IRF of **+0.016 at h=1** (95% CI excludes zero), sports moments show **+0.021 at h=1**, and the pooled full-panel IRF is **+0.006 at h=1** — all consistent with the one-to-two-year lag structure above. But the **news_event subsample — names associated with tragedies, crises, and polarizing public figures — shows a negative impulse response at both near horizons (h=1: −0.001; h=2: −0.020, 95% CI [−0.033, −0.009])**. The effect deepens at h=3 and h=4 before slowly recovering. Parents search these names. They do not choose them. The act of looking up a name you saw in a headline and the act of writing a name on a birth certificate look the same on the first axis and opposite on the second.

This asymmetry is a finding with teeth. Any product that surfaces "trending names" to parents without distinguishing between the two regimes will confidently recommend *Katrina* in 2005, *Caylee* in 2008, or *Breonna* in 2020 as "rising." The search data says those names are rising. The birth data says parents are actively avoiding them. A trending card that confuses the two would not merely be noisy — it would be misleading in a direction that matters.

Three secondary patterns, still in the working-hypothesis stage, sit underneath the main asymmetry:

The first we call the **Blockbuster Paradox**. Mega-budget films do not appear to lift names as much as mid-budget ones do, and may actively suppress adoption. The working hypothesis is that parents avoid names that feel ambient — once a name belongs to a billion-dollar franchise, it stops feeling like a discovery, and the discovery feeling matters more than the exposure does.

The second is the **Villain Effect**, a sub-case of the aspirational/cautionary split scoped to fiction. Antagonist names spike in search at nearly the same rate as protagonist names but convert to births at a much lower rate. People look up *Joffrey* and *Ramsay* and *Voldemort*; they do not, mostly, name children after them.

The third is **half-life**. News events decay faster than fictional ones — the negative IRF for the news subsample begins recovering after h=4, while the positive IRF for film characters holds across two or three years. A name attached to a real public figure rises and falls within two or three years; a name attached to a beloved fictional character can hold its lift for a decade or more. Fiction is sticky in a way the news cycle isn't.

### 4. Phonetic neighborhoods matter

When one name surges, phonetically similar names tend to follow. The Phase 6 cluster analysis surfaces the canonical example — the Aiden / Brayden / Caden / Jayden / Hayden cluster of the early 2010s — but it is not unique. A successful name pulls its sound family up with it. A name that dies takes its rhymes with it.

The single sentence we keep coming back to: **names do not travel alone. They travel in sound families.** This is one of the strongest patterns in the dataset and one of the least appreciated parts of how naming actually works.

## What this means for parents

If you're drawn to a name that recently appeared in a hit show or a film or a news story, you are not imagining the cultural gravity. The data confirms it. The fact that *Anora* is in your head right now is not a coincidence; the fact that you are mildly self-conscious about it is also not a coincidence. Both of those feelings have a cause and the cause is measurable.

But here is what the data also shows. The names that convert most reliably from cultural moment to lasting choice — the ones that rise and stay risen, rather than spiking and crashing — share four characteristics:

1. **They belong to lead characters, not supporting ones.** The protagonist's name carries the story. The sidekick's name carries the protagonist. Lead characters get spoken aloud constantly; that repetition is what plants a name in the back of a parent's mind.

2. **They have strong pre-existing meaning independent of the cultural event.** Names that already meant something — biblical, literary, ancestral, etymologically rich — survive their cultural moment because the moment is not the only thing holding them up. Names invented for a single story tend to fall back when the story fades.

3. **They were already rising before the event.** Cultural moments are accelerants, not ignitions. The names that benefit most from a hit film are usually the ones that were already inching upward, where the film provides the push that takes them from "interesting" to "obvious." If a name is flat for a decade and then a movie comes out, the movie gets you a spike. If a name is rising and then a movie comes out, you get a cohort.

4. **They were outside the top 200 at the time of the event.** Names already in the top 200 are too saturated for a cultural event to move much. Names below the top 200 have room to grow, and that headroom is what makes the lift visible.

If your shortlist includes a name that hits all four of these — a lead character, with deep prior meaning, on a quiet upward trajectory, currently outside the top 200 — that is a name you can bet on. It will not feel ambient when your child enters kindergarten. It will feel chosen.

## The names beating random drift

Of the **46,412** names with enough data to fit, **approximately 31% show popularity trajectories that exceed the neutral-drift model at the 95th percentile**. These are the names where something specific happened — a film, a public figure, a moment, a song — that moved the needle beyond what chance accounts for. The heavy tail of "anomalously moved" names is larger than we expected and is dominated by recent events, which is itself a finding: culture has been getting louder, or at least more of it has been getting through.

### By the data: top 10 measured adoption lifts

These are the ten largest observed adoption lifts in the 643-event panel, ranked by the three-year pre/post rank change. Note that many of the extreme values come from names that were effectively absent from SSA records before the event and appeared on the charts for the first time after — the lift is less "the name climbed 10,000 ranks" and more "the name crossed the threshold from nonexistence to existence." Read them as phase transitions, not as gradients.

| # | Name | Event | Year | Type | Adoption lift (ranks) |
|---|------|-------|------|------|----------------------:|
| 1 | Jhené | Jhené Aiko album debut | 2013 | Music chart | 14,327 |
| 2 | Coraline | *Coraline* (Laika / Neil Gaiman) | 2009 | Film character | 13,145 |
| 3 | Korra | *The Legend of Korra* | 2012 | TV character | 10,804 |
| 4 | Kylo | *Star Wars: The Force Awakens* | 2015 | Film character | 8,827 |
| 5 | Barack | 2008 U.S. presidential campaign | 2008 | News event | 8,772 |
| 6 | Jameis | Jameis Winston 2014 college football season | 2014 | Sports moment | 8,656 |
| 7 | Dune | *Dune: Part One* | 2021 | Film character | 7,849 |
| 8 | Jovi | Bon Jovi tour activity | 2005 | Music chart | 7,774 |
| 9 | Alita | *Alita: Battle Angel* | 2019 | Film character | 7,567 |
| 10 | Bindi | *Dancing with the Stars* | 2015 | TV character | 6,615 |

The upper tail of cultural influence is not normally distributed. Five of the top ten are film or film-adjacent; two are music; two are TV; one is news. *Barack* is the only name from a non-aspirational source, making it the exception that confirms the aspirational/cautionary split from Finding 3.

A more representative cross-section looks like this:

- **Khaleesi** (2011, television) — invented for *Game of Thrones*, climbed from zero to over 500 annual births within four years.
- **Kylo** (2015, film) — *The Force Awakens*; appeared in SSA data within twelve months of release.
- **Arya** (2011, television) — pre-existing Sanskrit name, accelerated dramatically by the same series.
- **Breonna** (2020, news) — civil rights moment; sharp lift, partial decay, still elevated in 2024.
- **Elden** (2022, video game) — *Elden Ring*; reappeared after years of absence.
- **Griselda** (2024, television) — Netflix limited series; clearest 2024 case in the corpus.
- **Anora** (2024, film) — Palme d'Or winner; visible first in search, then in births.
- **Maeve** (2019, television) — *Sex Education* and *Derry Girls* both contributed; one of the strongest TV-driven Irish-name surges of the decade.
- **Saoirse** (2018, film) — Saoirse Ronan's awards run dragged the name out of niche use into the mainstream.
- **Atticus** (2010s, literature/film) — *To Kill a Mockingbird*'s long tail, accelerated by the *Go Set a Watchman* news cycle and then complicated by it.
- **Reign** (2014, music) — celebrity baby name effect, traceable to a single month.
- **Stetson** (2010s, music) — country music adjacency; phonetic neighborhood lift.
- **Lyric** (2000s, music) — gradual climb attributable to multiple R&B and hip-hop references.
- **Wrenley** (2020s, social) — TikTok-era diffusion; the cleanest case in our corpus of a name moved primarily by social video.

The list is not a ranking. It is a cross-section of how many different cultural pipelines feed into the same SSA file.

## What we're still learning

We want to be honest about the limits of what 843 events can tell you.

First, **843 is a starting point, not an exhaustive corpus**. There are cultural events we missed, events our confidence threshold rejected, and events that are simply too small or too local to have left a trace in our reference sources. We are continuing to expand the attribution table and expect it to grow significantly in the next phase.

Second, **causality is hard**, and most of what we have shown so far is correlation with strong narrative support. The Phase 7 and Phase 8 work, currently in flight, applies more rigorous causal-inference methods — staggered difference-in-differences across the event panel, synthetic control comparisons against matched non-event names, and a placebo test against the null model. We expect those results in the next report.

Third, **some cultural events are unattributable**. Names spread through families, congregations, neighborhoods, and friend groups in ways that no Wikipedia article will ever capture. The grandmother whose name skips a generation and reappears on a granddaughter is not in our event panel. We do not pretend she is.

Fourth, **this is an American dataset**. International naming patterns — which are large, varied, and increasingly intertwined with American ones via streaming and social platforms — are not yet in scope. We would like them to be.

## Methodology note

The SSA birth corpus is the public Social Security Administration name file, 1880–2024, joined at the (year, name, sex) grain. Google Trends data is weekly worldwide and U.S.-only search interest, pulled name by name across a 20-year window with rate-limited retries and caching. The cultural event corpus was assembled by an LLM pipeline (Claude Haiku) consuming Wikipedia infoboxes, OMDb metadata, and curated category indices, with a confidence-score threshold applied before inclusion and a manual spot-check on a random sample.

The null model is a Lieberson-style drift simulation, parameterized against the 1880–1980 SSA distribution and projected forward, with churn and rank-mobility statistics computed for both real and simulated series. Names whose observed trajectories fall outside the 95th percentile of the simulated distribution are flagged as "beating drift."

[Read the full methodology](/research/methodology)

---

The next time someone asks why you chose your child's name, the honest answer might be: culture. Not in a shallow way — in a deeply human way. Names are how we participate in the stories of our time. They are the smallest, most permanent thing a parent does in response to a world they did not choose but have to live in. The data does not make that choice less personal. If anything, it makes it more so. You are not picking a name from a list. You are picking a name from a moment. And the moment is picking back.

---

*Want the rigorous version? The [research library](/research/library) has the full multi-method paper, peer reviews, and the per-phase technical reports this essay is built on. They're working drafts — shared because the work itself is part of the project.*
