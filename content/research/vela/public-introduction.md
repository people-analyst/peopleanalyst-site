---
title: "What Do You Actually Want From a Picture?"
subtitle: "The difference between liking something and desiring it turns out to be one of the more interesting questions in science. A new research program is trying to measure it."
status: Final — ASN-597 complete, 2026-04-24
date: 2026-04-24
audience: General public — external landing for the Vela research program. Suitable for `/research` route, linked from `/study` and study-participant FAQs.
voice: Science-culture essay register (named researchers, explanatory apparatus). NOT Vela magazine voice. A separate Vela-magazine companion piece is a future deliverable.
---

# What Do You Actually Want From a Picture?

*The difference between liking something and desiring it turns out to be one of the more interesting questions in science. A new research program is trying to measure it.*

There is a difference between liking something and wanting more of it.

You probably know this from experience. You have seen paintings you could admire without wanting to linger. You have seen photographs that stopped you cold, made you feel something you couldn't quite name, made you want to find more like them. The two experiences feel different from the inside. But most of the ways we study aesthetic response — most of the ways platforms and museums and curators think about what moves people — treat them as the same thing.

A number of researchers think this is a mistake, and they have been working to prove it.

---

The standard tool in aesthetic research is the rating scale. Show someone a painting. Ask them how much they like it on a scale of one to seven. Record the number. Do this ten thousand times with different paintings and different people and you have a dataset. From that dataset you can start to understand preference — what kinds of images people tend to like.

What the rating scale cannot capture is what happens in the body before the rating.

Psychologist Paul Silvia at the University of North Carolina has spent years distinguishing between two kinds of aesthetic response that rating scales collapse together. The first is pleasure — the hedonic warmth of encountering something you like. The second is interest — a more forward-oriented state, the pull of something that is novel enough to demand your engagement and familiar enough to reward it. Interest has a direction to it. It leans. It wants more. Pleasure can be satisfied; interest keeps reaching.

A team of researchers at New York University added a neural dimension to this distinction. Edward Vessel and his colleagues showed participants hundreds of artworks and asked them not just to rate how much they liked each image but how much it moved them — a different question, one that gets at something closer to what Silvia means by interest. What they found was striking: images rated as merely liked activated the brain's sensory and evaluative systems, as you would expect. But images rated as genuinely moving activated the default mode network — the brain's self-referential processing system, the part that handles autobiographical memory and imagination and the experience of your own inner life. The most powerful aesthetic responses, apparently, are the ones that feel most personal. The painting reaches into something you already are.

---

The human body, depicted in art, turns out to be a special case of this.

When you look at a photograph of a reclining figure — especially a carefully composed one, with particular light and particular stillness — something happens in your brain that does not happen when you look at a landscape or an abstract form. The art historian David Freedberg, at Columbia, and the neuroscientist Vittorio Gallese, at Parma, proposed that we respond to depicted bodies through a form of embodied simulation: the visual system partially activates the motor and somatosensory circuits that would be involved in perceiving an actual body in that position. You don't just see a figure at rest. Something in your nervous system echoes it.

This is not quite the same as mirror neurons, the famously overhyped concept from the nineties. But it is in the same territory: the idea that looking at depicted human movement or posture is a more physical, more intimate experience than looking at most other things. The depicted human body recruits the perceiving body of the viewer in ways that a bowl of fruit typically does not.

What this means for art curation is that pose, gesture, gaze, and light — the compositional grammar of the figurative body — should be predictive of desire response in ways that art-historical category (period, attribution, medium) is not. Whether you are moved by a particular photograph should have more to do with the quality of presence the image conveys than with whether it was taken in 1965 or 2012.

---

Testing that hypothesis turns out to require measuring desire, not just liking. And measuring desire turns out to require more than a rating.

The research program at Vela — a platform for curated figurative art currently under development — is trying to build that measurement instrument. When a user encounters an image, the system records not just a rating but a constellation of signals: whether the image was saved, how long the user lingered, and crucially, whether the user felt a kind of aversion — a "do not show me this kind of thing again" response strong enough to trigger a durable exclusion rule.

That last signal — the aversion — is treated with the same scientific seriousness as the positive ones. Paul Silvia again, this time with his colleague Emily Brown, spent years demonstrating that disgust and anger are real aesthetic emotions, not just failed preferences. When you encounter an image that produces a strong negative response, that response is data. The system notes it. It weights it heavily — more heavily, in fact, than any positive signal, because a clear aversion tells you something precise about the person that mild liking rarely does.

---

Over time, these signals accumulate into something the researchers call a desire profile: a description of a person's aesthetic preferences across eight dimensions — softness, intensity, narrative, structure, texture, abstraction, and an axis that runs from classical to contemporary. The dimensions are not arbitrary. Each is grounded in perceptual research: the preference for curved over angular forms (softness), the role of arousal in aesthetic response (intensity), the way theory-of-mind ability predicts appreciation for images that read as stories (narrative).

The profile is not a fixed thing. It decays — preferences shift, and the system knows this. What you responded to deeply six months ago is weighted less than what you responded to last week, with a half-life of approximately sixty days, reflecting the empirical reality that aesthetic taste, like musical taste, is not static.

---

What makes this research program unusual is not just its ambition. It is its honesty about what it does not yet know.

Most algorithmic systems — the recommendation engines that decide what you see on every major platform — operate as black boxes. They optimize for engagement metrics that are not clearly defined and present their outputs as confident predictions. The Vela program has committed to something called the honest-N principle: if the data is too thin to support a conclusion, the conclusion is not drawn. The instrument validation report from April 2026 states plainly that of 1,325 active images, 95.3% currently return a score of exactly 0.25 — the neutral prior, the system's way of saying "I have not yet seen enough responses to this image to tell you anything about it." The system is confident in its ignorance.

This is, in the context of algorithmic recommendation, genuinely unusual. Most systems would simply fill in the gap with a plausible-looking number. This one refuses to.

---

The deeper question the research is trying to answer is whether desire — aesthetic desire, the forward lean toward more of a kind — is a real and measurable thing, distinct from simple preference, and whether it can be tracked across sessions and predicted from the compositional features of an image.

If the answer is yes, the implications run in several directions. For curation, it would mean that the grammar of the figurative body — how a figure is posed, how it is lit, how much of the frame it fills, where its gaze goes — is not just art-historical information but predictive information, the kind that could guide a platform toward showing you images that do not merely please you but move you.

For science, it would be the first large-scale behavioral demonstration that desire and preference, however closely related they feel, are separable responses to art — with different neural signatures, different behavioral correlates, and different compositional predictors.

For the person looking at a picture and feeling something they cannot quite name: it would be a confirmation that the thing they are feeling is real, that it has a structure, and that someone, finally, is taking it seriously enough to measure it.

---

*The Vela research program is currently in its instrument-building phase, with formal data collection pending participant recruitment. Findings from Phases 1 and 2 are targeted for submission to journals in empirical aesthetics and human-computer interaction.*

*For the formal literature review underlying this introduction, see* [Aesthetic Desire, the Figurative Body, and Adaptive Recommendation](/research/literature-review). *For the full research-program specification, see* [the Research Program](/research/program). *For the proposed studies underway or scheduled, see* [Proposed Studies](/research/proposed-studies).
