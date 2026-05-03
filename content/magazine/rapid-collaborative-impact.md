# Why People Analytics Is Stuck — and How to Unstick It

## The Dilemma the Book Solved

When *People Analytics For Dummies* was published by Wiley in 2019, the publisher format set up a dilemma I knew I couldn't solve cleanly. Survey-style coverage of an entire technical field — measurement methodology, applied behavioral science, statistical modeling, decision science, organizational design — in a 350-page book pitched at readers assumed to have no prior knowledge in the category, is, on its face, preposterous. You can't fit it. If you leave anything important out, you fail the reader and you subject yourself to legitimate critique. If you put too much in, every topic becomes too shallow to be useful — same problem, different direction.

Faced with that, I made a choice that I think is the most useful thing in the book, and the part that has been least understood about it.

I decided not to survey the field at all. Instead, I asked: *what is the small set of analytics that, if delivered, would actually produce results in 100% of organizations regardless of size, industry, or maturity?* Then I wrote a book that tried to deliver exactly that, with the technical bar low enough that someone without a deep analytics background could implement it.

That choice didn't come from nowhere. It came from a specific set of failures I lived through.

## The Genesis: Children's Medical, Then a Struggling Startup, Then the Realization

I spent two decades watching what worked at large companies — Merck, PetSmart, Google. People analytics was my work and I knew it produced real value. The problem I kept coming back to: *this stuff is important and it works — but it's impossible to apply at companies that don't have Google's resources, executive backing, and profit margins.*

I thought a lot about what kind of organizations I would *want* to have access to this work. The first non-Google-tier engagement I took on was **Children's Medical in Dallas**, a non-profit children's hospital. Like many people analytics opportunities before and after, the organization hired me as a solo contributor to help them build the capability.

It was drastically unrealistic. Even with my cross-field orientation and my deep experience, a single person was going to fail at the scope of work being asked. Not because the people there didn't believe in it, and not because I couldn't make some real contributions — I did — but because the field is genuinely difficult: it requires the simultaneous presence of *strategy, science, statistics, and systems* (the four S's), and one person can't carry all four at industrial scale. By definition there were few people in the world with that capability set, because the field was new.

I did what I could and moved on. But the question stayed with me: *how do we learn from this failure, and how do we more successfully bring people analytics to organizations like Children's Medical?*

Then I worked with a 500-person San Francisco startup — a former unicorn that had been crushed by competitors and was burning runway trying to imitate Google's HR practices (the open floor plan, the bean bags, the free lunches, the ping-pong tables). Their per-unit cost of production was climbing above their competitors' and their stock options were bleeding value with every funding round. Same problem in a different package: a team without enough people, money, or institutional knowledge to do what Google does — and going broke pretending to.

That second engagement is where I actually crystallized the frameworks. *Activated Value, CAMS, Net Activated Value* — they came out of asking: *what is the single indexable KPI a small team can implement, manage, and explain to managers without requiring a PhD in industrial-organizational psychology?* But the underlying realization had already happened at Children's Medical:

**This problem is in most places. The opposite condition — Google's conditions — is rare. Without a shift in how the field operates, people analytics stays stuck at the few elite organizations who can afford it and never reaches everyone else.**

That's the load-bearing argument for why this work matters. People analytics has been demonstrably valuable for two decades. But if the only way to do it is the way Google does it, the field is dead on arrival for the vast majority of organizations — including the ones (like Children's Medical) where its impact would be most humanizing.

## A Name For The Framework

I've used a couple of names for the methodology over the years. **Lean People Analytics** is one. **Rapid Collaborative Insight (RCI)** is another, originally developed for the consensus-finding process in complex multi-stakeholder analyses.

In this essay I'm consolidating both under a sharper name: **Rapid Collaborative Impact (RCI)** — same acronym as the original, with *Insight* evolved to *Impact* because the methodology's point is not what you find but what you do with it. Insight is necessary but ancillary. Impact is principal. RCI is the meta-framework; **Lean People Analytics** is RCI's HR-specific instance.

Either name works — they're both mine — but I'll lean on RCI here because it generalizes outside HR cleanly.

## The Non-Linear Insight

The key realization underneath the choice is that organizational systems aren't linearly additive. Some elements are load-bearing — if they fail, everything else fails too, no matter how good the rest of the work is. Others are ancillary — they're nice to have, but their absence doesn't undermine the system.

Most analytics surveys treat all topics as roughly equal-weight: here's a chapter on engagement, here's a chapter on retention, here's a chapter on diversity, here's a chapter on talent acquisition. That's not how the system actually works. If the principal metrics in the lifecycle were missing — if you couldn't tell whether you were attracting the right people, activating them once they arrived, or losing them faster than expected — every other piece of analytics would be running on top of a hollow center. **Organizations whose principal analytics are broken cannot be saved by additional sophistication elsewhere.**

So the right question for any field, or any organization within a field, isn't "what could we measure?" — there's no end to that list — but: *what is the smallest set of measurements such that, if all of them were right, the rest takes care of itself, and if any of them is missing, no amount of fancy work elsewhere recovers?*

## The 4S Synthesis: Why Google Worked And Why Imitations Fail

If I were to point to the one thing Google's people-analytics work got right, it's this: they grasp at this point that the result of having behavioral science at the heart of it — but that you cannot get there alone. You need behavioral science *plus* statistics *plus* strategy *plus* systems to scale. Take any one of those four out and you don't get a smaller version of the right answer. You get something else, something that will fail, and for predictable reasons.

The four S's:

- **Strategy** — HR strategy, talent management, talent acquisition, total rewards, organizational design, culture. The business reason any of this matters.
- **Science** — psychological theory and research methods, sociological theory, labor economics, organizational behavior, anthropology. *People are predictable and understandable but probabilistically, not deterministically.* This is the part that's most often missing.
- **Statistics** — t-tests, correlation, multiple regression, predictive modeling, machine learning. The signal-from-noise discipline.
- **Systems** — data warehousing, ETL pipelines, code (SQL, Python, JavaScript), reporting infrastructure, visualization. The thing that makes any of it scale.

Google's best people-analytics work always had all four. Where the field gets in trouble — and where most non-Google organizations end up failing — is when an org tries to copy Google's *outputs* (a slide from a conference talk, a manager-effectiveness model, an attrition model) without the underlying four-S capability that produced it. Conference talks become red herrings. Without behavioral science at the heart, you have a pile of data and no way to extract meaning. Without statistics, you confuse signal with noise. Without strategy, you produce analyses nobody acts on. Without systems, the work doesn't scale past a heroic individual.

I have to state this over and over until I'm blue in the face: *you cannot apply general analytics frameworks exclusively to people and succeed because people are not machines.* They are predictable and understandable but probabilistic, not deterministic. Behavioral science is not optional. It tells you what questions to ask, how to design data collection alongside analysis, and how to interpret answers. There is not a pile of data that can answer the right questions without actively managing the data collection with the analysis. Think of the number of dimensions that can describe people in an organization, many of them changing — you start to get into infinite combinations. Behavioral science is the thing that lets you navigate that space without drowning in it.

This is missed over and over again — by data scientists who try to apply general ML frameworks to HR, by HR teams who buy "AI-powered" platforms that don't have behavioral science underneath, by founders who assume they can hire one analyst and skip the four S's. They cannot. The methodology RCI proposes is, in part, a discipline against that mistake.

## The Principal Set For The Workforce Lifecycle: The Three A's

The three big problems related to people that all companies must solve are:

- **Attraction** — getting talent into the company. The metrics measure the attractive force of the company to acquire the quality of talent it wants.
- **Activation** — getting talent up to optimum productivity once they're inside. The metrics measure the proportion of people and teams who have all the basic requirements to produce high performance.
- **Attrition** — keeping the highest-value employees while letting others go. The metrics measure the degree of control the company has over who stays and who leaves.

All three are required. When you have two of the three nailed down but not all three, the system fails: attraction + activation without retention is going in circles; activation + retention without attraction loses to better-talented competitors; attraction + retention without activation pays for talent that doesn't produce.

Every metric and survey question in the field can be located against one of these three. That's the lifecycle's principal set.

## The Principal Metric Tying Human Capital To Dollars: NAV

Here's the C-suite tie. *Activated value* (and from it, *Net Activated Value*, NAV) is what I crystallized at the 500-person startup. I needed a single indexable KPI that could:

- Be practical to implement
- Be easily grasped by front-line managers
- Correlate to employee performance
- Correlate to business performance
- Be administered anywhere by people without a PhD
- Be tracked monthly or quarterly as a regular management ritual
- Be used in conjunction with other data to make better decisions

What fell out is the **CAMS framework**. The theory of activation says that, taken down to its essence, four conditions must exist for an employee or team to consistently produce at or above expectations:

- **Capability** (knowledge, skills, abilities) — what people bring to the company
- **Alignment** — knowing what they're expected to accomplish and how they're performing
- **Motivation** (preferences, commitment, engagement) — willingness to do the work
- **Support** — tools, resources, manager and peer relationships, absence of negative consequences

If any one of those four is missing, it's difficult-to-impossible for the employee or team to perform reliably. *It doesn't matter if you're capable, motivated, and supported if you're not aligned. And so on through every combination.*

The CAMS index is an 8-item survey on a 0–10 agreement scale (one team-perspective and one individual-perspective item per factor). The total ranges 0–80 per respondent. From the index:

- **Activated** = CAMS index ≥ 70
- **At-Risk** = CAMS index < 60
- **Net Activated Percent** = (workforce − at-risk in workforce) ÷ total headcount

To convert into dollars, multiply Net Activated Percent by **ELV** (Employee Lifetime Value, the people-analytics analog of customer lifetime value, calculated as `HCROI × annual cost × lifetime tenure` per segment):

**Net Activated Value (NAV) per segment = (Segment Net Activated %) × (Segment ELV)**

NAV is the dollar value the activated portion of the workforce represents. The opportunity (the difference between ELV and NAV) is the dollar gap created by the unactivated portion. Comparing opportunity across segments tells you where to spend money to get the largest return.

NAV is not a rigorous accounting measure. It's a thinking tool. But in a C-suite conversation, it's the one number that puts human-capital state and dollar outcomes on the same axis — the one number a CEO can use to compare HR investments against any other capital allocation decision.

## Lean People Analytics: RCI Applied To The HR Domain

**Lean People Analytics** is RCI applied to the HR domain. It's what falls out of the principal-issues + four-S approach when the team is one person, the budget is zero, the company is doubling every year, and Google's preconditions don't apply. You don't get to do the whole stack. You get to do the load-bearing set, fast, with the tools you have, and prove value before you ask for more.

The methodology has the same shape as Lean elsewhere — fast iteration, working prototype before perfecting design, ship the principal-issues set rather than try to model everything. The key innovation is that the principal-issues set is *named* (Three A's, CAMS, ELV, NAV) so it's executable. You're not improvising what to focus on; you're delivering a known-good minimum that any organization can implement.

This is the methodology I would have wanted at Children's Medical. It's the one I built at the 500-person startup. And it's the one most of the field still doesn't operate under, because most of the field is still trying to imitate Google's outputs without Google's four-S capability behind them.

## RCI As Process: How You Actually Find The Principal Set

In a complex organization, the principal set isn't always self-evident. Different stakeholders see different things as principal. The collaborative half of *Rapid Collaborative Impact* is the process for arriving at consensus on the principal set fast — combining structured stakeholder collaboration with data-driven analysis to converge on the right load-bearing measures faster than either approach alone.

The original instance was at Merck. The question was about how to deliver training: e-learning versus the established practice of flying salespeople in for in-person sessions. The analytical question was straightforward — does e-learning produce equivalent learning outcomes at lower cost? — but the organizational question was where the real disagreement lived. I improvised a structured pseudo-mathematical decision process inspired by Kepner-Tregoe, ran it with the cross-functional taskforce, and produced a consensus to standardize on e-learning for the relevant population — saving the company millions of dollars and producing what later formalized as the RCI process.

The pattern has been reused across many engagements since: surface the load-bearing question with stakeholders, structure the disagreement, bring data to bear within the structure, converge faster than either pure data analysis or pure stakeholder negotiation could on their own.

## Full-Stack People Analytics Systems: The Engineering Pattern

Once you know the principal set, the next question is how to *assemble* it. **Full-Stack People Analytics Systems** treats the analytics function as a software stack rather than a reporting team: data ingestion, canonical normalization, calculation engines, decision tools, surface delivery. Each layer is an independent engineering concern. Each layer can be built, tested, and improved without forcing every other layer to change.

The 15+ application People Analytics Platform I've shipped since 2022 — Conductor (data intelligence orchestrator with AI-powered SQL generation over BigQuery metadata), Calculus (persistent batch calculation engine for 210+ HR metrics), Reincarnation (adaptive diagnostic system with RID/SID architecture for cross-study item learning), VOI Calculator (Value of Information analysis with Monte Carlo and EVPI/EVSI), AnyComp (compensation decision OS), Survey Respondent (15 question types including MaxDiff and Conjoint), Data Anonymizer (deterministic PII anonymization), MetaFactory (universal information factory for unstructured-to-structured pipelines), and others — is the principal-issues set built out as that software stack, concretely. Each application addresses a load-bearing layer. None of them is sophisticated for the sake of sophistication; each one exists because the load-bearing set demanded it.

This is the part of RCI that scales. Lean PA can be done by a heroic individual. Full-Stack systems are how that individual's work compounds across organizations and across time without requiring heroism each engagement.

## The Political Mechanism

There's a strategic side-effect to the principal-issues approach worth being explicit about. **Delivering the principal set produces real, visible value before sophisticated analytics work has been funded.** When executives see that value, they fund more. The depth follows the principal-first sequencing.

This matters because most organizations get the order wrong. They invest in sophisticated tooling, build a data team, license a vendor platform, and *then* try to figure out what questions to ask. The principal-issues approach inverts: ship the load-bearing set first, prove it works, *then* unlock budget for the rest. This is as much an organizational design strategy as it is an analytics strategy. The framework doubles as a sequencing argument.

## Why The Book Didn't Fully Land

I'll say something honest about *People Analytics For Dummies*: I'm proud of it, but it has a distribution problem I couldn't solve from inside the book.

Smart analytics professionals won't read a Dummies book — the format triggers an ego mismatch, no matter how substantive the content is. People who *do* read Dummies books generally don't see themselves as analytics-responsible — audience mismatch, no matter how clear the argument. So the book exists, it has been read, but the readers who would most benefit from the principal-issues thesis are largely the ones who never picked it up.

That's not the publisher's fault and it's not the book's fault. It's a structural mismatch between the format and the audience the thesis is for. The fix isn't to rewrite the book. The fix is to publish the same content in *other packages* — for the right audience, at the right ego level. This essay is one of them.

## Why This Matters Beyond HR

The RCI thesis is not specific to people analytics. It's a meta-framework for any field where rigorous measurement could be applied but isn't yet. Every domain has a load-bearing set. Most domains haven't named it. Most domains are stuck for the same reason HR is — without principal-issues thinking and the four-S synthesis, the field can only be done by the rare elite organization.

I've spent the last few years applying RCI to domains that aren't HR:

In **Namesake** (intentional baby naming, namesake.baby), the principal issues are the *cultural-diffusion factors* that actually make a name break out — versus the dozens of ancillary signals that don't. The research pipeline analyzes 843 cultural events through 5 theoretical frameworks and 15 external data sources, but the goal is the same: identify the load-bearing factors and ship a low-technical-bar implementation that lets parents see them.

In **Fourth & 2** (fantasy football intelligence), the principal issues are the small set of *decisions* that actually swing a season — versus the much larger set of fan-noise statistics that don't. The PRISM and CAMS engines exist because most fantasy-football tools obscure the principal decisions in a flood of ancillary stats.

In **Vela** (contemplative visual art at vela.study), the principal issues are the *desire dimensions* that actually move readers — versus the surface aesthetics that don't. The adaptive sequencing engine and the dual-grade corpus exist to surface the load-bearing factors first.

In the **NYT AIP/RSU project** (executive compensation modeling for the 2025 cycle), the principal issue was that *performance distribution alone does not determine outcomes — which individuals receive which ratings also matters, because compensation distribution within ratings drives unit-level cost.* I built Monte Carlo simulation + regression-based surrogate calculators that translated executive uncertainty into quantified ranges, producing a cross-program reallocation recommendation grounded in distribution-of-outcome analysis rather than a point estimate.

In the **Mars Royal Canin Petcare ALV project**, the principal issue was that *associate value isn't a tenure or pay calculation — it's a multi-factor function of CAMS activation × performance variation × ramp time, applied per individual sales rep.* The framework calculated ALV at the level of individual associates for the 150-person Royal Canin field sales organization, integrating compensation, sales performance, and CAMS-style activation measures into one decision tool.

The pattern is consistent. Each domain has a load-bearing set most practitioners don't name. The work is to find it, build a low-technical-bar implementation that surfaces it, ship, demonstrate, then go deeper.

## Ten Design Principles That Hold The Approach Together

These ten principles, drawn from the *People Analytics For Dummies* appendix, are the design discipline underneath everything above. They're worth restating because they explain *how* to do RCI work in practice — not just why:

1. **The heart of analytics isn't metrics — it's problem solving.** Calculation is one step among many. The goal is a solution to a problem that produces useful, measurable improvement.
2. **Every analysis is both familiar and unique.** Build a toolbox of familiar tools, but apply them in context. No two organizations have the same load-bearing set.
3. **Inside every business problem is a people problem struggling to get out.** Ask "why" five times consecutively and you'll always find people there waving back at you.
4. **The actions of people are influenced by forces (seen or unseen) that operate as vectors.** Vectors have magnitude and direction. The more vectors you understand, the more predictable behavior becomes.
5. **A company receives forces, experiences stresses, and exhibits strains.** Physics terms apply: forces are external pressures, stress is the impact, strain is the observable deformation.
6. **Know explicitly what change you want to create and in what direction.** Without a specific objective, no method of analysis will produce useful insight.
7. **Segmentation choices can both illuminate and darken insight.** Wrong segmentation hides real issues; too much segmentation is noise. Get the segmentation right.
8. **Accuracy and precision are different things.** Accuracy is the absence of error; precision is the level of detail. Effective analysis always requires accuracy; precision should be guided by usefulness.
9. **Quantification is approximation.** Reality exceeds the boundaries of what science can capture. The point isn't perfect representation — it's whether the analysis can explain, predict, and help control the outcomes you care about.
10. **You don't understand something until you quantify it. But you understand nothing if all you do is quantify.** Eventually you have to use imperfect information to make changes in the real world and see whether they worked. You don't need all data — you need specific data.

These ten are also the pattern of how I work. They're the operating system underneath the named methodologies.

## Closing

What I wanted at Children's Medical wasn't a smaller version of Google. It was a different kind of methodology — one that could actually be implemented by the kind of organization I was working with. Rapid Collaborative Impact is that methodology. It's still being developed. It's the work of the rest of my career.

If we leave the field where it is — accessible only to organizations with Google's resources — most of humanity never benefits from it. RCI is one attempt to fix that. There need to be more.
