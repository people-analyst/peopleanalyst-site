# PeopleAnalyst Magazine — initiative plan

**Filed:** 2026-05-04
**Status:** strategic plan; first wave of execution ASNs filed in `docs/AGENT-ASSIGNMENTS.md` (PA-100..PA-115)
**Companion docs:** `docs/magazine/VOICE.md` (Mike-authored, in flight as PA-100), `docs/magazine/COLUMN-SHAPES.md` (PA-101)

---

## The bet

The magazine is the long-form distribution surface for the **principal-issues thesis** and the methodology spine underneath the PeopleAnalyst portfolio. It exists because the book (*People Analytics For Dummies*, Wiley 2019) had a structural distribution problem — smart analytics professionals don't read Dummies books; people who read Dummies books don't see themselves as analytics-responsible. The fix isn't to rewrite the book. The fix is to publish the same content in *other packages*, for the right audience, at the right ego level. The magazine is one of those packages.

The bet that separates this from a content-marketing project: *demonstration, not assertion*. Vela's contemplative voice does this through sensibility (the work shows the sensibility rather than declaring it); PA's analytical voice does it through *worked argument and case-grounding*. The principal-issues essay establishes the meta-thesis through that move. Each subsequent piece does it for one framework, one S, one decision shape, one practice.

If the magazine works, it does for analytical work what Vela does for figurative response: gives the field a place to be argued in long form, with the methodology made executable rather than gestured at.

## What sophistication looks like for PA (different vector than Vela)

Vela's sophistication is layered: voice infrastructure (sensibility documented as *VELA-MAGAZINE-VOICE.md*), source-grounded writing (30K+ ingested passages, dual-grade tagging, retrieval-augmented composition), editorial calendar with bench (Anchor Watch + Constellation as named columns, weekly cadence). The architecture supports a *poetic* register at scale.

PA's sophistication is differently layered:

1. **Depth of argument** — claims survive a peer-review-shaped read; methodology-first; framework-anchored
2. **Source-anchored claims** — not literary corpus; PA's substrate is the *research surface* (peopleanalyst.com/research) + the *consulting archive* + eventually *practitioner interviews*. Every piece links back.
3. **Cross-portfolio pollination** — articles bidirectionally link to the research arc they derive from; arc detail pages surface their relevant magazine pieces. The portfolio isn't a marketing surface around the magazine — the portfolio *is* the magazine's substrate.
4. **Single voice** — Mike's. Guest writers dilute the brand. The *Writer's Desk* (see §6) gets us multi-perspective critique without multi-author voice fragmentation.
5. **Less diverse than Vela by design** — fewer voices, one editorial register, more focused topic surface. Sophistication compounds within the spine, not across.

## 1 — Voice (PA-100, Mike-authored)

The voice doc is the calibration north-star for every drafting session, AI-assisted or otherwise. Without it, articles drift toward AI-toned prose; with it, the magazine compounds a recognizable register over time.

What it covers:
- How the magazine sounds vs the book vs LinkedIn posts vs a peer-review paper vs a conference talk
- What claims it does and doesn't make (no marketing-toned overreach; no AI-research-funded vendor-neutral hand-waving)
- Calibration phrases ("when in doubt, sound like the principal-issues essay")
- Voice anti-patterns to flag (excessive hedging; jargon-without-explanation; unearned authority claims)
- The "second-person executive" register PA leans on vs. the "first-person memoirist" register Vela uses

**Owner:** Mike. PA-100 is structurally a Mike-drafts-with-AI-critic-support task, not an AI-authored task. Voice is HIS.

## 2 — Editorial architecture: column shapes + banners

### Named recurring column shapes (PA-101)

Vela has Mosaic and Constellation as named editorial moves. PA's analog: define 2-4 *named shapes* that articles inherit so readers learn what to expect and writers (Mike, drafting with AI) have a discipline that prevents drift.

Candidate shapes (Mike to pick names + structure):

- **"Research v Field"** (working name) — what 30 years of org-behavior research established + what practitioners actually do + the gap. **Note**: requires Field-Reporting infrastructure (§6) to be load-bearing rather than self-referential. Defer until that infra is real.
- **"Framework drill-down"** — a single named framework (CAMS, NAV, Three A's), broken into its load-bearing components, each treated as a research-anchored argument. Used for the CAMS series.
- **"Case study"** — anonymized practice piece walking through a specific engagement (NYT compensation cycle, Mars Royal Canin ALV, Otsuka Workday implementation). Requires client-confidentiality scrub before publication.
- **"Cross-portfolio meta-piece"** — what the patterns across the portfolio suggest about the meta-thesis (e.g., *"Why solo cadence works"*).

These aren't all decided. PA-101 lands the chosen shapes as a doc.

### Banners (multi-piece arcs)

Banners are the magazine's *table of contents*. Reader follows a banner; writer accumulates depth under it.

Initial banners:

- **The 4S Synthesis** — one piece per S (Science, Strategy, Statistics, Systems), then deeper pieces under each. Per Mike: each S is a *banner* hosting 5-10 pieces, not one article. ~25-40 pieces of editorial real estate already named.
- **CAMS** — Capability, Alignment, Motivation, Support. Same shape: drill-down piece per factor + research-vs-practice arc.
- **The Three A's** — Attraction, Activation, Attrition. Less urgent (NAV piece covers Activation; Attraction + Attrition each become drill-downs later).
- **Principia Notes** — surfaces from the Principia construct-family surveys; each survey suggests editorial pieces about the construct's measurement story. Filed as Principia surveys land.

## 3 — Corpus substrate (engineering work, lives mostly in vela / meta-factory)

**Status: most of the corpus exists in fragments.** Vela has behavioral-science books ingested through the dual-grade pipeline. Meta-factory has dormant book ingestion in partial states. The PA-canonical texts (Schmitt & Highhouse, Borman et al., Hunter & Schmidt, Cascio, Pulakos, the IO psych handbooks) need targeted acquisition + ingestion.

**The work:**

a. **Cross-tag Vela's behavioral-science books for PA retrieval.** Books already in `mosaic_passages` with research-bulk-grade chunks; add PA-relevance tags so PA's drafting tools can retrieve them.

b. **Reactivate dormant meta-factory books.** Some books were partially-ingested before meta-factory's narrowing decision (KEEP/DROP rule, ASN-1003). Audit + complete the ingestion using the dual-grade pattern that worked for Vela.

c. **Targeted acquisition list.** Build a list of canonical PA texts not yet in the corpus. Acquire (where possible) + ingest.

d. **Cross-property research-ingest pattern** — extract Vela's pipeline into `meta-factory/packages/research-ingest/` per the existing research-ingest paradigm rollout (ASN-1000+ in vela queue). PA becomes a consumer alongside Vela and Performix.

e. **Magazine-side retrieval surface.** When drafting an article in Cursor or via Penwright, the writer can issue retrieval queries against the PA corpus subset and get source-attributed passages with citations.

**This is a real engineering initiative.** Probably 4-8 ASNs. Lives in vela / meta-factory queues, not PA's. Coordinated as cross-fleet work parallel to Vela's research-ingest extraction.

**Decoupling:** the magazine ships pieces *without* this infrastructure being complete (the principal-issues essay is the proof of that). Corpus substrate makes future pieces faster to draft and more rigorous; it doesn't gate ship-1.

## 4 — Writer's Desk (PA-300+)

PA's analog of Vela's Editorial Office, with a critical structural difference: **Vela's Office is multi-writer convening; PA's Desk is single-author + AI as a critic-roster.**

The high-leverage move: *named critic-personas* the writer can summon for targeted feedback before publishing. Each persona is a saved-prompt + a calibrated set of failure modes to look for.

Initial roster (more added over time):

- **The skeptical academic measurement-handbook editor** — would these claims survive peer review? Methodology gaps? Citation issues?
- **The founder reading this on a Saturday** — does the takeaway land in the first three paragraphs? What's the executive-summary version?
- **The smart non-specialist who's never heard of CAMS** — does the framework name carry weight without an explanation crutch? Is the jargon load too high?
- **The data scientist who thinks people analytics is just HR with a dashboard** — what would they object to? Is the objection answered?
- **The bored skeptic** — where does the prose lose them? Where does the argument go limp?
- **The Foucauldian critic** (borrowed from Vela's pattern) — what discursive conditions does this piece take for granted? What minor archives does it ignore?

**Architectural note:** if Penwright's Adaptive Authorship Control Kernel (F-19) can host the Writer's Desk's critic-roster, that's a real generalization test of the kernel. Penwright was designed for memoir/nonfiction/fiction genre-aware behavior; if the same kernel hosts a *per-author critic-roster* for analytical writing, Penwright is more general than its own scope. If it can't, that's a real architectural finding worth flagging back to vela's Penwright work.

PA-300: MVP — 2-3 personas wired into the drafting flow.
PA-301: Roster expansion + persona library.
PA-302: Architectural validation against Penwright kernel.

## 5 — Distribution

Channel strategy: peopleanalyst.com/magazine is the *canonical* home; other channels are amplifiers with canonical URL set back.

| Channel | Priority | Rationale |
|---------|----------|-----------|
| **peopleanalyst.com/magazine** | Canonical | Magazine surface, owned, indexed under Mike's brand |
| **LinkedIn long-form** | Primary distribution | 22K followers already there; the actual target audience reads here |
| **Resend newsletter** | Primary distribution | Already wired via the CTA popout; eventual digest format |
| **Medium** | Secondary | Tag-discovery + SEO amplifier; not where Mike's audience is |
| **Substack** | Future option | Only if newsletter audience grows past Resend's manual handling threshold |

**Cross-post pattern:** publish on peopleanalyst.com first; manually paste to LinkedIn + Medium with canonical link set. Five minutes per article. SEO stays with you. Each external surface is a funnel-back to the canonical.

**Automation, when warranted:** `npm run magazine:export-distribution <slug>` emits LinkedIn-paste-ready markdown (LinkedIn's editor strips some formatting; the export normalizes for it) + Medium-API-publish-ready payload. Build when 3+ articles are queued for syndication. PA-202.

**Newsletter cadence:** initially, every published article triggers a Resend broadcast to the audience. Eventually a digest format (every-2-weeks or monthly) as volume warrants.

## 6 — Field-Reporting (the journalism arm) (PA-400+)

The "Research v Field" column shape requires real practitioner-interview infrastructure to be load-bearing rather than self-referential. Per Mike: his consulting cadence is limited; over-relying on his own cases reads as self-promotion. The fix is sourcing the "Field" half from *practitioners broadly*.

This is essentially standing up a small *journalism* arm of the magazine. Real engineering + process:

- **Outreach protocol** — cold-DM templates for LinkedIn, structured ask, response-rate calibration
- **Interview structure** — semi-structured protocol; consistent enough across pieces that synthesis is possible; flexible enough to follow the practitioner's actual experience
- **Permission-to-quote workflow** — explicit consent, attribution-tier choice (named, role+industry, anonymous)
- **Anonymization tiers** — *named* / *"a CHRO at a F500 pharma"* / *fully anonymous*; practitioner picks
- **Transcript handling** — Whisper or similar; storage; redaction discipline for shared identifying details
- **Synthesis-to-piece pipeline** — turning multi-practitioner conversations into a single article that triangulates

**Cadence implication:** interviews take real calendar time. Probably 6-10 weeks per Field-Reporting piece. Not all magazine pieces are Field-Reporting; non-Field pieces ship faster.

**Initiative scope:** PA-400 (protocol), PA-401 (first Field-sourced piece — pick a topic + run it as proof), PA-402+ (subsequent pieces).

**Strategic upside Vela doesn't have:** actual reporting. People who would never read a Dummies book or a measurement handbook *will* read a magazine piece quoting the CHRO of their competitor. That's an audience-expansion mechanism the analytical voice alone can't generate.

**Strategic decision needed:** Mike commits to standing this up as a real arm of the magazine, OR parks it and the magazine ships in other shapes (4S, CAMS, Principia Notes, case studies) until/unless the bandwidth is there. Recommendation in this plan: commit, but set the cadence to *one Field piece per quarter* — modest enough to be sustainable, frequent enough to be load-bearing.

## 7 — Editorial calendar (seed list)

Pieces in flight or queued, organized by banner. Status: D = drafted (somewhere in source materials), P = polished and shippable, S = shipped, F = future.

### Foundational (the spine)

| ID | Title | Banner | Status | Source material |
|----|-------|--------|--------|-----------------|
| 1 | *Why People Analytics Is Stuck — and How to Unstick It* (Rapid Collaborative Impact) | — (foundational) | **S** | principal-issues-essay-draft-v3-2026-04-27.md → /magazine/rapid-collaborative-impact |

### The 4S Synthesis (banner)

| ID | Title | Banner | Status | Source material |
|----|-------|--------|--------|-----------------|
| 2 | *Science: Why People Aren't Machines (And Why Statistics Alone Won't Save You)* | 4S — Science | D | principal-issues essay §"4S Synthesis"; behavioral-science framing |
| 3 | *Strategy: HR Strategy as a Decision-Support Substrate* | 4S — Strategy | D | book chapters; principal-issues essay §"4S" |
| 4 | *Statistics: Signal-from-Noise as Discipline* | 4S — Statistics | F | needs new drafting |
| 5 | *Systems: People Analytics as a Software Stack* | 4S — Systems | D | Full-Stack PA Systems vision; portfolio cards |
| 6+ | (drill-downs under each S — 5-10 per banner over time) | 4S — various | F | various |

### CAMS (banner)

| ID | Title | Banner | Status | Source material |
|----|-------|--------|--------|-----------------|
| 7 | *Why CAMS — The Activation Theory in Two Pages* | CAMS | D | book chapters |
| 8 | *Capability: What People Bring* | CAMS — drill-down | F | needs research-vs-field treatment |
| 9 | *Alignment: Knowing What Good Looks Like* | CAMS — drill-down | F | same |
| 10 | *Motivation: Engagement Is Necessary But Not Sufficient* | CAMS — drill-down | F | same |
| 11 | *Support: The Manager-and-Resources Layer* | CAMS — drill-down | F | same |

### Cross-portfolio + cases

| ID | Title | Banner | Status | Source material |
|----|-------|--------|--------|-----------------|
| 12 | *Net Activated Value: The Single Indexable KPI* | Framework drill-down | D | book + draft 3 |
| 13 | *The NYT Compensation Cycle* | Case study | P | Mar 2026 technical doc — needs client-confidentiality scrub |
| 14 | *Lean People Analytics: When Google's Preconditions Don't Apply* | Methodology | D | existing methodology drafts |
| 15 | *Coordination Cost in AI Coding Tools* | Cross-portfolio | F | DevPlane research surface |
| 16 | *Why Measuring AI Writing Is Broken* | Cross-portfolio | F | AHI program + Penwright vision docs |
| 17 | *Why Solo Cadence Works (Meta-Analysis of the Portfolio)* | Cross-portfolio meta | F | needs new drafting; cross-cuts everything |

### Principia Notes (banner — fills as Principia surveys land)

| ID | Title | Banner | Status | Source material |
|----|-------|--------|--------|-----------------|
| 18+ | *(drafted as construct-family surveys complete in Principia)* | Principia Notes | F | Principia surveys (PRN-005..007 in flight) |

**Pipeline math:** ~17 named pieces on the seed list, plus banner-expansions over time. At one piece every 2-3 weeks (sustainable solo cadence with Writer's Desk support), that's a year of editorial runway from the existing material alone.

## 8 — Workstreams + dependencies

```
PA-100 Voice doc ──┬──→ all article-drafting ASNs unblock
                   │
PA-101 Column shapes ──→ PA-103 calendar refines + future articles inherit
                   │
PA-102 Source-anchoring schema ──→ enables bidirectional research↔magazine links
                   │
                   └──→ PA-110+ (article ASNs)

Vela ASN-(corpus) ──→ enables substrate-grounded drafting (not gating)

PA-300 Writer's Desk MVP ──→ critic-personas available during drafting
                   │
PA-302 Penwright kernel architectural validation (sub-task of 300)

PA-200 LinkedIn cross-post helper ──→ low priority; manual works for first 3-5 pieces
PA-201 Medium cross-post API ──→ same
PA-202 Unified distribution helper ──→ when 3+ articles queued for syndication

PA-400 Field-Reporting protocol ──→ unblocks PA-401 (first Field-sourced piece)
                                ──→ unblocks "Research v Field" column shape going live
```

## 9 — Initial ASN inventory (filed in `docs/AGENT-ASSIGNMENTS.md` as PA-100..PA-115)

**Wave 1 — foundation (immediately actionable; no dependencies):**

- PA-100: Voice doc — Mike-authored with AI critic support
- PA-101: Column shapes definition + naming
- PA-102: Source-anchoring schema (`relatedResearch[]` / `relatedConsulting[]` in `_meta.ts`)
- PA-103: Editorial calendar + pipeline-status doc

**Wave 2 — first articles (blocked on PA-100 voice doc):**

- PA-110: First 4S piece — *Science* (most contested; most needs Mike's voice asserting it)
- PA-111: NYT Compensation Cycle case study (lowest-effort polish; client confidentiality scrub)
- PA-112: NAV deep-dive
- PA-113: Why CAMS — extracted methodology piece

**Wave 3 — Writer's Desk MVP:**

- PA-300: 2-3 critic-personas wired into the drafting flow (probably as a Cursor `.cursor/rules/*` set + a saved-prompts file)
- PA-302: Penwright kernel architectural validation against the persona-roster

**Wave 4 — corpus substrate (lives mostly in vela queue):**

- vela ASN-(next): Cross-tag behavioral-science books for PA-magazine retrieval
- vela ASN-(next): Targeted acquisition list for PA canonical texts
- meta-factory ASN-(next): Reactivate dormant PA-relevant book ingestion

**Wave 5 — Field-Reporting initiative (when Mike commits to standing it up):**

- PA-400: Protocol — outreach + interview structure + permission-to-quote + anonymization tiers
- PA-401: First Field-sourced piece (pick a topic + run as proof)

**Wave 6 — distribution helpers (when 3+ articles to syndicate):**

- PA-200..PA-202: LinkedIn export, Medium API integration, unified helper

## 10 — What this plan is not

- **Not a content marketing plan.** No SEO-keyword-optimized headline factory, no engagement-bait, no listicle conversions. The magazine ships pieces when they're worth saying.
- **Not a multi-author publication.** Mike's voice is the brand. Field-Reporting brings in practitioner *quotes* (real people, real practice), not co-authored bylines.
- **Not gated on the corpus substrate landing.** Articles ship now (proof: the principal-issues essay). Substrate makes future pieces faster + more rigorous; doesn't block ship-1.
- **Not a re-publication of the book.** The book is the substrate; the magazine surfaces are *new packagings* for audiences the book doesn't reach.

## 11 — How Mike picks this up

1. **Start with PA-100 (voice doc).** Probably a 90-minute Mike-authored draft with AI playing critic. Once it lands, every other drafting session inherits it.
2. **Pick column-shape names** (PA-101). The "Research v Field" working name is fine if you commit to standing up the journalism infra; otherwise pick something that fits the shapes you'll actually use.
3. **Schema + calendar (PA-102, PA-103)** are agent-doable. Dispatch when ready.
4. **First article: 4S Science (PA-110).** Most contested S; most needs your voice asserting it. The Writer's Desk personas will help here even in skeleton form.
5. **Writer's Desk MVP (PA-300)** can run in parallel with PA-110.
6. **Field-Reporting decision — commit or park.** If commit, PA-400 is the next big initiative. If park, magazine ships in other shapes.
7. **Corpus substrate** runs on its own track in vela / meta-factory. Doesn't gate magazine; accelerates it once landed.

The magazine is a long-arc project. The voice doc is the unlock. Everything else follows from there.
