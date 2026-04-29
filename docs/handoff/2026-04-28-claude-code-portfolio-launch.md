# Handoff — peopleanalyst.com portfolio site launch

**Agent:** Claude Code (Opus 4.7, 1M context)
**Date:** 2026-04-28
**Session focus:** scaffold and ship peopleanalyst.com as a product/engineering portfolio

---

## State

**committed & pushed.** Working tree clean on `main`.
Last commit: `96a7d1a` — *Hero: ship Option C; strip "Solo founder" prefix from role fields*
Remote: `https://github.com/people-analyst/peopleanalyst-site` · Vercel auto-deploy is wired.

## What was shipped today

1. Renamed `people-analyst/portfolio` → `people-analyst/portfolio-archive` (preserved as content reference)
2. Created `people-analyst/peopleanalyst-site` (public)
3. Scaffolded Next.js 16 + React 19 + Tailwind 4 + TypeScript via `create-next-app@latest`
4. **Design system** — `app/globals.css`:
   - Parchment palette: `#F5F1E8` bg, `#FBF8EF` card, `#D6CDB8` divider
   - Ink: `#1A1A1A` headline, `#2C2C2C` body, `#8C8070` muted
   - Accent: navy `#1A3A5C`; warn `#B8260B` (reserved for /fails)
   - `--radius: 0`, no shadows, hairline rules instead of cards
5. **Type:** Inter (sans) + IBM Plex Mono (mono) via `next/font/google`
6. **Components:** `Masthead`, `ProjectCard` (single-column reading + marginalia gutter)
7. **Content:** 4 project cards in `content/projects.ts` — Vela, People Analytics Platform, Fourth & Two, Namesake
   - PA Platform absorbs Reincarnation + Conductor as named novel items (intentional consolidation — "20+ apps" was reading as unbelievable)
8. **Pages:**
   - `/` — hero + 4 project cards
   - `/stack` — hub-and-spoke explanation, custom infra catalog, four-S applied, standing stack
   - `/fails` — stub with rationale ("publish the fails because that's where the judgment lives")
9. **Deploy:** Vercel project linked, production deploy live at `https://peopleanalyst-site.vercel.app`

## Open / pending

| Item | What's needed | Owner |
|---|---|---|
| **DNS to peopleanalyst.com** | Vercel dashboard → project `peopleanalyst-site` → Settings → Domains → add `peopleanalyst.com` + `www.peopleanalyst.com`. Update DNS at registrar with the records Vercel provides (typically A `76.76.21.21` + CNAME `cname.vercel-dns.com`) | Mike |
| **NYT card description** | Mike removed pending corrected description. Card was at `content/projects.ts`; re-add when Mike provides new wording. Be conservative — earlier numbers ($1.6M / 110% / 18 segments) were flagged as wrong | Mike → next agent |
| **Logo options** | Mike said he'd offer logo options later | Mike |
| **Vela screenshot embeds** | Project cards currently have no media. Question deferred: full-bleed? bordered? captioned with marginalia? Once decided, add `media:` field to `Project` type in `content/projects.ts` | Mike to decide framing |
| **Fails page content** | `/fails` is a stub. Mike said he'll dredge stories | Mike |
| **Voice/copy refinements** | Hero copy and cards are 80%-Mike. Specifically flagged for voice pass: hero supporting paragraph, Vela's asymmetry-thesis story paragraph, every card's "story" italics block | Mike, edit strings in `app/page.tsx` and `content/projects.ts` directly |
| **Handoff protocol decision** | Mike pasted a spec for `docs/handoff/` protocol. I asked one disambiguator (does it replace DevPlane completion-blocks, supplement them, or only cover mid-flight pauses?). Mike did not answer before pausing. **This handoff file is the first instance of that protocol** — pattern works fine for this use case | Mike to confirm intent before applying to vela |

## Files touched (this session)

- `app/globals.css` — replaced default tokens with parchment design system
- `app/layout.tsx` — Inter + IBM Plex Mono via next/font, metadata
- `app/page.tsx` — hero + project list
- `app/stack/page.tsx` — engineering stack page (new)
- `app/fails/page.tsx` — fails stub (new)
- `components/masthead.tsx` (new)
- `components/project-card.tsx` (new)
- `content/projects.ts` (new)
- `.vercel/` — link to mike-6359s-projects/peopleanalyst-site

## Last completed step

Pushed `96a7d1a` to `origin/main`. Vercel auto-deploy ran. Production URL `peopleanalyst-site.vercel.app` returns HTTP 200 with the Option-C hero.

## Next concrete step

If Mike resumes and wants to keep momentum: **point peopleanalyst.com DNS at Vercel.** That's the one remaining gating step before the site is at the canonical URL.

If a different agent picks up: read this file, confirm `git status` is clean, run `npm run dev` from `/Users/mikewest/peopleanalyst-site` (port 3030), then ask Mike which of the pending items to tackle next. Don't guess — every pending item is gated on Mike's input.

## Background processes

- Dev server (PID 46630) — **killed** before writing this handoff. Log was at `/tmp/peopleanalyst-dev.log`. Safe to restart with `npm run dev` from the repo root.
- Nothing else in flight.

## Blockers / decisions for Mike

1. **DNS pointing** (manual step in Vercel dashboard + registrar)
2. **NYT card replacement copy** — no draft yet, needs to come from Mike
3. **Vela screenshot framing** — full-bleed / bordered / marginalia caption
4. **Handoff protocol scope** — does the spec you pasted replace DevPlane completion-blocks, or only cover mid-flight pauses? (My read: only mid-flight pauses; DevPlane already covers completed work. This file is the test case.)

## Cross-repo state worth knowing

The `vela` repo had two pre-existing uncommitted items at session start that I did not touch:
- `M scripts/lora/asn598-yonic-import-and-sample.ts`
- `?? docs/derivatives/source-prep-demo-2026-04-26.md`

These belong to other in-flight work, not this session.

## Resumption checklist

```bash
cd /Users/mikewest/peopleanalyst-site
git status                    # expect clean on main
git log --oneline -3          # expect 96a7d1a at top
ls docs/handoff/              # see all parked sessions
npm run dev                   # localhost:3030
open https://peopleanalyst-site.vercel.app
```
