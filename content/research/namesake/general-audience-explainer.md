---
title: "How Baby Names Actually Spread"
description: "A long-form explainer for a general reader — inside a 145-year experiment in human imitation, and what the data does and doesn't tell you about the name on your shortlist."
publishedAt: "2026-04-14"
status: published
authors: ["Namesake Research"]
category: review
exportBasename: "general-audience-20260414"
---

# How Baby Names Actually Spread

*Inside a 145-year experiment in human imitation, and what it can — and can't — tell you about the name on your shortlist.*

---

There is a particular kind of conversation that happens in the third trimester. You float a name to your sister; she frowns and says she went to high school with one of those. You float another to a coworker; she says her dog. By the time you arrive at the hospital, you have a list of four names and a private conviction that you, unlike the herd, have chosen well — that whatever you write on the birth certificate is going to be a sound nobody else in your child's kindergarten class is making.

The data has bad news about that conviction.

For the past two years, a small research project has been pulling together what is, as far as we can tell, the largest integrated dataset on American naming ever assembled: every name above the privacy floor in the Social Security Administration's birth files from 1880 to 2024 — about two million name-year-sex observations — joined to twenty years of weekly Google search data, eleven hundred attributed cultural events, the CMU Pronouncing Dictionary, state-level birth records, Google Books n-grams, and a few other things. The point of the exercise was not to tell parents what to name their children. The point was to test, with the tools that economists use on minimum-wage policy and that epidemiologists use on outbreaks, a question that anybody who has ever held a baby-name book has wondered about: where does the wave of fashion that is currently sloshing across your shortlist actually come from?

The answer, after several months of running synthetic controls and Granger tests and Bass diffusion fits, is more interesting than either extreme of the usual debate. Names are not random; they are not entirely cultural either; and the part that is cultural is not the part most people would point to.

Here is what the data shows.

## The drift floor

The starting point is a model the sociologist Stanley Lieberson published a quarter-century ago, in a book called *A Matter of Taste*. Lieberson noticed something deeply counterintuitive about the rise and fall of names: a surprising amount of the churn could be explained by *no cause at all*. Imagine a population of parents copying each other at random — each new parent picking a name in proportion to how often they've heard it, with a small chance of inventing a new one. That model, called neutral drift, comes out of population genetics. It assumes nothing about Frozen, nothing about Beyoncé, nothing about your grandmother. It is the closest thing the social sciences have to a "what would happen if nothing in particular happened" baseline.

Run that model against 145 years of American birth data — calibrated to the actual rate at which new names enter the pool, the actual male and female pool sizes — and you find that it accounts for the overwhelming majority of what looks, to the naked eye, like culture. About 23% of names in the SSA top tier turn over every decade. A model that knows nothing about culture will reproduce most of that. Out of nearly two million name-year observations, only **4.6%** clear the drift model's 95th-percentile threshold, and only **2.8%** clear the 99th. Bucket all 46,000 named individuals in our sample by how often they exceed the null, and **84% are statistically indistinguishable from drift**. Another **15%** show partial cultural influence. Just **1.3%** — about 600 names — qualify as "culturally driven" or "strongly cultural."

What does this mean in plain English? It means that the romance of name-picking is, to a first approximation, a romance about a process that doesn't need a cause. Most parents are doing what most parents have always done: imitating, with a small probabilistic flutter, the names that other parents are using. The fact that the imitation produces apparent waves — Jennifers in the 1970s, Aidens in the 2010s — is not evidence of anything mysterious. It is what happens when you let a hundred million people copy each other for a few generations.

The implication for your shortlist is gentle but real: the originality you are reaching for is probably less original than it feels. Not because you have bad taste. Because the math of cultural copying is rigged against the very idea of unforced individuality. Even if every parent in America picked a name purely from a hat, the hat would still produce trends.

## Sound is the unit, not meaning

Now: that residual 15%. What's actually going on there? The most useful single answer comes from a body of work pioneered by the marketing scholar Jonah Berger, which says that names spread less through their meanings and more through their sounds.

We tested this directly. The pronouncing dictionary lets us decompose every name in the corpus into phonemes — the building blocks linguists use, like the *AY* sound or the *DEN* coda — and then build a graph connecting names that share onsets and rhymes. With that graph in hand we can ask: when one name spikes, do its phonetic neighbors rise too?

The answer is unambiguously yes. Across **166,000 phonetic name-pairs**, the average cross-correlation in popularity over time is **0.18 — nearly three times higher than for random control pairs**, with a t-statistic above 7 and a p-value vanishing into the twelfth decimal. The effect is visible inside almost every sound family the algorithm finds. The famous Aiden / Jayden / Brayden / Caden / Hayden cluster is the canonical case, but it is one of more than a thousand. When Korra hit, names ending in the same vowel-plus-double-consonant pattern moved with it. When Liam climbed to number one, *every* short, soft-onset, single-syllable boy's name climbed with him.

This sounds like a small finding. It isn't. It changes how you should think about why you like the name you like. You probably don't love *Aria* because of its meaning ("air," in Italian) or its associations (the Game of Thrones character, the operatic solo). You love it because, in the year you happened to start thinking about names, the entire phonetic family it belongs to — *-ria*, *-ya*, soft-A starts, two syllables ending in a vowel — was warming up around you. You heard it in coffee shops. You heard a version of it on a podcast. The name on your shortlist is less a single decision than a vote inside a much larger vote about which sounds belong to this decade.

Aggregate this all the way up and you get the variance decomposition that, more than any other result, surprised us. When we asked: of all the variation across cultural events in how strongly a name was lifted, how much is explained by the *event itself* (its budget, its star power, its genre, its recency)? — the answer was **less than 2%**. Add in the name's intrinsic properties — its phonetics, syllable count, gender skew — and you jump to **54%**. Sound and structure explain roughly thirty times more of the cultural lift than the cultural source does.

Films make news. Sounds make names.

## Aspirational versus cautionary: the sign matters

Still: events do something. They are not the main mover, but they are a real one, and the way they work is more interesting than the gross category "cultural event" implies.

Once you've fit the synthetic-control machinery to 200 of the best-attributed events in our corpus — a method economists use to construct a counterfactual version of each treated name from a weighted blend of similar non-treated names — a striking pattern falls out. Aspirational events tend to lift names. Cautionary events tend to suppress them. And the asymmetry is visible at the same horizons in the same model.

In a pooled vector autoregression on the search-and-births panel, names attributed to **film characters** show a positive impulse response of about **+0.016** one year after a one-standard-deviation shock in search interest — small in absolute terms, but more than double the full-sample baseline. **Sports moments** post a similar positive bump. **Celebrity-baby announcements** post the largest positive response in the dataset.

But names attributed to **news events** — the tragedies, the headlines, the polarizing public figures — show *negative* impulse responses at the same horizons. A search spike for *Katrina* in 2005, *Caylee* in 2008, or *Breonna* in 2020 was followed not by more babies with those names but by fewer. People looked up the names. People did not use them. The act of being curious about a name and the act of giving it to a child look identical on the search side and *opposite* on the birth side.

This is the most important practical finding in the entire study, and it has a clear product implication: any tool that surfaces "trending names" by search volume alone — and most do — will confidently recommend names that parents are actively avoiding. The trend is real. The direction is wrong. Search is the wave; the sign of the wave depends entirely on whether what's pushing it is a movie people loved or a story people grieved.

The Bass diffusion model, which separates name adoption into two channels — one driven by direct media exposure ("broadcast"), one driven by hearing the name from other parents ("peer") — tells a complementary story. Across roughly 60,000 names with fittable curves, the median imitation coefficient (q) was **0.088**, the median innovation coefficient (p) was **0.019**, and **q exceeded p in the average name by a factor of about five**. Translated: parents hear names from other parents far more often than they hear them from the original source. Only about a quarter of names look broadcast-dominated. The rest are word-of-mouth phenomena, with culture providing the seed and the playground providing the spread.

The romantic version of this is: a name lives in the small social world it touches, not in the huge cultural world it came from. The cynical version is: by the time you "discover" a name on your shortlist, three of your friends have already heard it from someone else.

## Geography is collapsing

A name once had a place. Jennifer was a coastal trend before it was a national one; Madison started in the suburbs of the upper Midwest; old-Southern names like *Beau* and *Cooper* radiated outward from a few specific states. We can measure this directly with a statistic called Moran's I, which captures how much a name's popularity in one state predicts its popularity in geographic neighbors. A high Moran's I means strong regional clustering; a value near zero means the country is moving as one.

In the 1960s, the average Moran's I across the top 200 names was **0.51**. By the 2020s it had fallen to **0.27** — almost half. The decline is monotonic across decades and accelerates after 2010. The streaming era has flattened the regional texture of American naming. Cultural events still tend to be adopted first on the coasts and in the largest media markets — every one of the eleven major events we tracked was first adopted in a coastal state — but the lag between coastal adoption and national adoption is shrinking, and the regional flavor of the country is fading from its birth certificates faster than from almost any other cultural register we know how to measure.

If you grew up on a regional name and assumed your child would carry the same regional flag, the math is no longer with you. The country is naming as one country.

## We can predict almost everything, which means we can predict almost nothing

The last finding is the one we want to be most careful about, because it is genuinely impressive and also, on inspection, less impressive than it sounds.

In a Salganik-style predictability exercise — borrowed from a famous 2006 *Science* study by Matthew Salganik, Peter Dodds, and Duncan Watts on hit songs — we trained a model on naming data from 2004 to 2014 and asked it to predict which names would enter the SSA top 100 between 2015 and 2024. The model achieved an **AUC of 0.999**. By the rough intuition of statistics, this is essentially a perfect classifier. We could, in principle, tell you with stunning accuracy which names will be popular next year.

The catch is that the simplest possible baseline — *if a name was in the top 500 last year, predict it will be in the top 100 next year* — also achieves an AUC of **0.982**. The fancy model adds **0.017** of AUC over the dumb rule. That increment is real, and it does come from the cultural and phonetic features. But it is dwarfed by the much larger fact: the names that will be popular tomorrow are almost entirely names that are popular today. The cultural future, at the population scale, is the cultural present plus a small perturbation.

This is the same finding Salganik landed on with songs, and it is the deep paradox of cultural prediction. Macro-trends are very predictable because most of any year's hits were also last year's hits. But the *interesting* part — which specific name will break out, which one will collapse — sits inside the small residual that the macro-prediction misses. We can predict the wave; we can't predict the spray.

For parents this matters in a specific way. If you are using any kind of "next year's hot names" list to inform your shortlist, what you are really getting is "this year's hot names, with a slight time-shift." That isn't useless. It is just less prophetic than the headlines around such lists tend to imply. The actual future is harder to call than the prediction problem makes it look.

## The honest limits

A few things this analysis cannot do, and it would be dishonest to imply otherwise.

The data is American. Naming dynamics in Brazil, in Korea, in Iran are not in scope, and the assumption that the same forces operate elsewhere with the same magnitudes is an assumption, not a finding. Google Trends only goes back to 2004, which means anything we say about the lead-lag relationship between search and births is based on a twenty-year window — long enough to detect short lags, too short to test whether the relationship has changed across cultural eras. The eleven hundred cultural events in our corpus were assembled by a careful but inevitably imperfect attribution pipeline; some of the events are stronger than others, and a handful are probably miscoded. The synthetic-control method has assumptions, including one — that treated and donor names don't influence each other — that the phonetic spillover finding above directly violates in some cases. We have done what we can to mitigate these issues; we have not made them disappear.

The headline number — "less than 2% of variance is explained by event characteristics" — is conditional on the events we measured and the variance we could measure. There are surely cultural mechanisms operating at scales our pipeline does not see: family transmission, religious community, regional dialect, the slow and almost untraceable diffusion of a sound through ten thousand small conversations. The drift baseline absorbs much of this into "noise," but the noise is not really noise. It is the rest of the iceberg.

## So: what should a parent actually do?

We owe you a useful conclusion, so here is one.

If you have been agonizing over a shortlist, the most actionable thing this study suggests is that **you should worry less about the cultural moment behind a name and more about the sound family it belongs to**. The film, the show, the celebrity baby — these are smaller forces than they feel like. A name riding a single hit will spike and fade; a name riding a sound family will rise more slowly and stay risen for a generation. If you are picking a name because the show is good, you are probably picking with the wave that will ebb. If you are picking a name because something about the rhythm of it lives in your ear, you are probably picking with the wave that will hold.

Second: **check the sign of the cultural moment, not just its size**. If a name is rising in search and you can trace the rise to a film or a celebrity, the rise is real and probably aspirational. If you can trace it to a tragedy or a controversy, the rise is also real, but the data says other parents will treat it as a name to avoid, and your child will carry that asymmetry with them. The search trend will not warn you. The birth data does.

Third: **if you want a name that will feel uncommon at kindergarten drop-off, look at the sound neighbors of names you already love that are themselves rare**. A name two doors down from your favorite — same texture, lower rank — is more likely to stay rare, because the wave that lifts it will be diffuse and slow.

And fourth: at some point, close the spreadsheet. The data can tell you how the waves work. It cannot tell you which name will land when you say it out loud to a sleeping newborn at three in the morning. That part is yours, and the beautiful thing about it is that even though you are choosing inside a culture that is mostly choosing for you, the choice still feels — *is* — entirely your own.

Names are how people quietly participate in the story of their time. The story of our time, the data suggests, is one of softer regional borders, denser sound families, faster cultural cycles, and a stubborn human tendency to copy each other while believing we are not. None of that ruins the act of picking a name. It just gives you, if you want it, slightly better hearing for the music you are already inside.

Whisper the name once. If it sounds like your child, write it down.
