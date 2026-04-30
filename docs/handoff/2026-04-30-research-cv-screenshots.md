# Handoff — research surface, /cv page, portfolio screenshots

**Agent:** Claude Code (Opus 4.7, 1M context)
**Date:** 2026-04-30
**Session focus:** stand up `/research`, `/cv`, and portfolio screenshot pipeline

---

## State

Two commits on `main`, **not yet pushed.**
- `e6c2e46` Add portfolio screenshot + blur pipeline; project-card gallery
- `dc6ea48` Add /research surface, /cv page, and seven-slot parity baseline

Plus prior in-session pulls (already on main):
- `9a22eff` Pull ASN-957 + ASN-958 into research/vela slots
- `5380000` Pull ASN-954 + ASN-956 into research/vela slots

Working tree clean. Holding push for Mike's review milestone.

## What was shipped today

### `/research` surface
Three routes (landing · `[product]` index · `[product]/[slug]` reader). **Seven-slot baseline taxonomy** — Overview · Methodology · Reports · Audience-tiers · Bibliography · Preregistrations · Pipeline. Forthcoming slots shown openly so parity gaps are legible across products. Manifest-driven content sync from source repos via `npm run research:sync`. **49 research files live** across Vela (33) and Namesake (16). BibTeX rendered as raw preformatted text (sidesteps Next.js JSON-serialization edge case with LaTeX escapes).

Per-product:
- **Vela**: 36 of 39 slots populated. Multiple initiatives tagged (rq-program · christianity-sex-shame · text-aesthetic · boudoir-studios · artist-studies · museum-diversity). Forthcoming: methodology standalone (now landed via ASN-954), pipeline (ASN-956), overview (ASN-957) — all three pulled in.
- **Namesake**: 17 of 19 slots populated. All four audience-tiers live, 12 phased reports, methodology, pipeline, bibliography, literature map, preregistration.
- **Fourth & Two** + **PA Platform**: structurally present, all forthcoming. Lagging on stack migration per Mike.

### `/cv` page
Full resume rendered from `content/cv/resume.md` (copied from `~/Desktop/resume-product-pivot-2026-04-27.md`). Print-optimized stylesheet — `@page` margins, hidden chrome, denser typography on print. `<PrintButton>` triggers `window.print()` for PDF. Linked from masthead.

### Portfolio screenshots
Playwright capture of live product surfaces at 1440x900. Sharp blur pipeline for figurative bands. ProjectCard renders thumbnail strip. Pipeline: `npm run portfolio:capture` → `npm run portfolio:blur`.

- **Vela**: 4 surfaces (landing-blurred, about, writers, membership-blurred). Captions explicitly note artwork tiles are blurred.
- **Namesake**: 5 surfaces (landing, name-wizard, names-index, name-profile, collections).

### Follow-up trigger prompts
`docs/research-parity-followups.md` — paste-ready prompts for each source repo with seven-slot rationale and project-context framing. **Vela responses already landed** (ASN-954/956/957/958 via Conductor queue). **Namesake responses already landed** (bibliography + literature-map + preregistration). **Vela ASN-955** (christianity-sex-shame audience-tier reviews) still in queue. **Fourth & Two and PA Platform** prompts not yet sent.

### Memory updates
- `~/.claude/projects/-Users-mikewest-vela/memory/project_emotion_architecture.md` updated with the **multi-scale player solidification (2026-04-29)** — Desire / Emotion / Story-fit as scale-isolated dimensions, per-scale corpora, two-inventory comfort-gate model. Captured as a downstream fix to the Vela screenshot constraint (corpus broadening unlocks content-safe player demo).

## Open / pending

| Item | What's needed | Owner |
|---|---|---|
| **Push to Vercel** | Two unpushed commits + the four prior. Push as one milestone batch when Mike's reviewed live in dev. | Mike |
| **ASN-955 — Vela audience-tier reviews** | Three reviews of christianity-sex-shame thread (academic-peer, engineering, product). Still in Vela's OPEN queue. Will land when worked. | Vela Conductor queue |
| **Vela screenshots — pre-corpus-fix** | Landing + Membership are usable with current blur. Long-term fix is the multi-scale corpus expansion. About + Writers are thin but content-safe. | future capture pass |
| **Fourth & Two + PA Platform research surfaces** | Trigger prompts in `docs/research-parity-followups.md` ready to send when those repos are on current stack. | Mike (stack migration first) |
| **Multi-scale player + corpus expansion** | Vela-side initiative captured in memory but no trigger prompt drafted. See "Trigger prompt needed" section below. | next session |
| **`/parts` (Reusable Patterns) surface** | Not started. Mike confirmed naming: full label "Reusable Patterns", menu label `parts`. Source per repo: `docs/REUSABLE_PATTERNS.md` likely. Cross-references between repos are the value. | next session |
| **DevPlane on portfolio** | Not started. Two paths: (a) dedicated `/devplane` page, (b) 5th product card on home. Mike said "increasingly relevant"; wants kanban-creation video as a barnburner demo. Phase B (manual MP4 recording, not Playwright). | Mike to record video; agent to wire display |
| **Synthesis paragraph for `/research` landing** | Currently a placeholder italic paragraph. Replaces with the central-thread synthesis once the principal-issues essay (`~/Desktop/principal-issues-essay-draft-v3-2026-04-27.md`) is finalized. | Mike |
| **Tournament screenshot timeout** | `https://namesake.baby/tournament` timed out at 30s during capture. Bump timeout + add longer settle when redoing capture. | next session |
| **NYT card** | Pulled pending corrected description per prior handoff. Still pending. | Mike |
| **Logo options** | Mike said he'd offer later. | Mike |
| **DNS to peopleanalyst.com** | Per prior handoff, still pending. | Mike |

## Trigger prompt needed — multi-scale player (Vela)

Drafting deferred to next session. The shape:

> Vela is moving from single-scale (Desire) to multi-scale, scale-isolated rating. Three independent dimensions: Desire (current), Emotion (per axis), Story-fit (narrative-arc placement). Each gets its own curated corpus. Cross-scale rating contamination is the failure mode to engineer against. Two inventories per scale (starter comfort-gate + emergent). The portfolio screenshot constraint is downstream — corpus broadening unlocks safe player capture.
>
> File assignments to:
> 1. Architect multi-scale player (data model: scale-tagged sessions/pools; rating engine: scale isolation; UI: scale switcher)
> 2. Curate Emotion starter corpus (per-axis seed sets at Mike's comfort gate)
> 3. Curate Story-fit starter corpus (narrative-arc-positioning seed set)
> 4. Demo mode for portfolio capture (admin override; safe-corpus state)
> 5. New research thread: "Multi-dimensional aesthetic rating — pollution-free measurement of orthogonal scales" — publication-grade

Connects to Emotion Architecture wave (ASN-930..938) and ASN-934 crowd-rating mechanism. Memory: `project_emotion_architecture.md`.

## Files touched (this session)

**Added:**
- `app/research/page.tsx`, `app/research/[product]/page.tsx`, `app/research/[product]/[slug]/page.tsx`
- `app/cv/page.tsx`
- `components/markdown-prose.tsx`, `components/print-button.tsx`
- `content/research/_taxonomy.ts`, `content/research/_manifest.ts`, content/research/{vela,namesake}/*.md (49 files)
- `content/cv/resume.md`
- `lib/research.ts`
- `scripts/research-sync.ts`, `scripts/capture-screenshots.ts`, `scripts/blur-screenshots.ts`
- `public/portfolio/{vela,namesake}/*.png` (11 PNGs)
- `docs/research-parity-followups.md`

**Modified:**
- `app/globals.css` — research-prose, research-raw, cv-document, print stylesheet
- `components/masthead.tsx` — research + cv links
- `components/project-card.tsx` — ScreenshotStrip
- `content/projects.ts` — Screenshot type, screenshots fields per project, Namesake status → live
- `package.json` + `package-lock.json` — react-markdown, remark-gfm, tsx, playwright, sharp

## Background processes

- **Dev server (`npm run dev`)** — running on `http://localhost:3000`. Started early in session via `nohup`-style `&` background launch. PID changes per session — kill via `lsof -ti:3000 | xargs kill` if needed. Safe to leave or kill.

## Last completed step

Two commits landed (`dc6ea48`, `e6c2e46`). Working tree clean. Routes verified at 200 in dev: `/`, `/research`, `/research/vela`, `/research/namesake`, `/research/fourth-and-two`, `/research/pa-platform`, several individual `/research/<product>/<slug>` reports including `/research/namesake/bibliography-bibtex` (which had been the .bib edge case). `/cv`, `/stack`, `/fails`, `/cv` print stylesheet verified working.

## Next concrete step

If Mike resumes:
1. Walk `/research`, `/cv`, and project cards on `/` in a browser; mark up anything to change.
2. When happy, push: `git push` from peopleanalyst-site. Six commits land in one Vercel build.
3. Decide what's next: (a) ASN-955 dispatch, (b) `/parts` reusable-patterns surface, (c) DevPlane portfolio integration, (d) multi-scale player Vela trigger prompt, (e) Fourth & Two + PA Platform stack migration.

If a different agent picks up: read this file and `docs/research-parity-followups.md`. Confirm `git status` is clean and you're on `main`. Run `npm run dev` (port 3000 should still be bound). Don't push without Mike's say-so.

## Resumption checklist

```bash
cd /Users/mikewest/peopleanalyst-site
git status                       # expect clean on main
git log --oneline -8             # expect e6c2e46 at top
ls docs/handoff/                 # see all parked sessions
cat docs/research-parity-followups.md   # paste-ready trigger prompts
npm run dev                      # localhost:3000
open http://localhost:3000/research
open http://localhost:3000/cv
```
