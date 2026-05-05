<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version (16.2.4) has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# peopleanalyst-site — Agent Orientation

**Live URL:** https://peopleanalyst.com
**Repo:** people-analyst/peopleanalyst-site
**Stack:** Next.js 16 + React 19 + Tailwind 4 + TypeScript 5 + Resend (newsletter)
**Owner:** Mike West (mike@peopleanalyst.com)
**Vercel project:** `peopleanalyst-site` (auto-deploys on push to `main`)

## What this site is

The portfolio + research surface + magazine + consulting hub for the **PeopleAnalyst portfolio**. Not a backend platform — a content-driven Next.js site with one API route (`/api/subscribe` → Resend Audiences) and a small set of TS scripts. Most surfaces render markdown via the shared `MarkdownProse` component (rehype-raw enabled — `<details>/<summary>` works in markdown for accordions).

The site is the *aggregator* for everything in the portfolio: each sister repo's research surface mirrors here at `/research/<product>/` for build-time rendering; the home page shows portfolio cards from `content/projects.ts`; the magazine renders editorial pieces from `content/magazine/`; the consulting page is the lead-gen surface; the CV page renders from `content/cv/resume.md`.

## Read These First

Always: this file, **`docs/handoff/`** (latest dated handoff — what shipped most recently), **`docs/AGENT-ASSIGNMENTS.md`** (work queue with PA-NNN entries), **`docs/research-followup-rollout.md`** (cross-portfolio research-followup status dashboard).

For the **magazine workstream**: **`docs/magazine/PLAN.md`** (the strategic + execution plan; load-bearing for any magazine work) → **`docs/magazine/VOICE.md`** (when it lands per PA-100 — Mike-authored voice spec; load-bearing for every drafting session) → **`docs/magazine/COLUMN-SHAPES.md`** (when it lands per PA-101).

For **research-surface** work, check **`docs/research-parity-followups.md`** — it's the meta-doc with trigger prompts that get dispatched into sister repos when new research surfaces need standing up.

By task area:

| Touching… | Read |
|-----------|------|
| Portfolio cards (home page) | `content/projects.ts` (Project type + array; PROJECTS.length drives the home sidebar count) |
| Research arc taxonomy | `content/research/_arcs.ts` (8 arcs; multi-tag via `arcs?: ArcId[]` on manifest entries) |
| Research manifest | `content/research/_manifest.ts` (every entry; `source: { repo, path }` documents canonical source repo) |
| Research category baseline | `content/research/_taxonomy.ts` (seven-slot categories: overview · methodology · reports · audience-tiers · bibliography · preregistrations · pipeline) |
| Magazine articles | `content/magazine/_meta.ts` (article registry) + `content/magazine/<slug>.md` (article body) |
| Consulting page | `content/consulting/services.md` (markdown body — rendered via MarkdownProse with rehype-raw for accordions) |
| Consulting page sidebar (stats + clients) | `app/consulting/page.tsx` (PRACTICE_STATS + INDUSTRY_BLOCKS arrays) |
| CV | `content/cv/resume.md` |
| Capabilities (parts page) | `content/parts/_meta.ts` + `content/capabilities/<slug>.md` |
| CTA popout (slide-in, all pages) | `components/cta-popout.tsx` + `lib/cta-config.ts` (per-route CTA configs) |
| Subscribe API | `app/api/subscribe/route.ts` (needs `RESEND_API_KEY` + `RESEND_AUDIENCE_ID` env vars to route to Mike's audience; falls back to function logs without them) |
| Footer / masthead | `components/footer.tsx` + `components/masthead.tsx` |
| Sidebar stats (home page) | `scripts/fetch-portfolio-stats.ts` → writes `content/stats/portfolio-stats.json`; manual refresh via `npm run portfolio:stats` |

## The Definition of Done

A task is NOT done until: (1) implemented, (2) `npx tsc --noEmit` passes (0 errors), (3) committed to `main`, (4) pushed to GitHub, (5) Vercel build green, (6) verified live at https://peopleanalyst.com (or the relevant subroute).

PA-site has no health endpoint or commit-SHA verification analog (unlike vela). Just check the live page renders and the change is visible.

## Critical Rules

**Never:**
- Use `bg-paper-bg` / `text-paper-bg` Tailwind classes — they don't exist as registered theme tokens. The token name is `--color-paper`, so the classes are `bg-paper`, `text-paper`, `border-paper`. Same pattern for `paper-card`, `paper-divider`, `ink`, `ink-body`, `ink-secondary`, `ink-muted`, `accent`, `accent-warn`. (This bug bit the CTA popout — the button text was invisible until fixed.)
- Capitalize "people analytics" as a discipline noun in prose. **It stays lowercase by default.** Only capitalize when naming a formal organizational function (a team, a department, a platform/product brand). See `~/.claude/projects/-Users-mikewest-vela/memory/feedback_people_analytics_capitalization.md`.
- Refer to the writing-features authorship system as "Loom" — it was renamed to **Penwright** (see `vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md`). DB tables (`loom_*`) stay as legacy schema names per the planned migration; everything else is Penwright.
- Push every commit to `main` — each push triggers a Vercel build (~$0.78, ~6-min Turbo). Push at logical milestones, not per commit. Vercel build cost is real and tracked.

**Always:**
- Run `npx tsc --noEmit` before pushing
- For magazine drafting: inherit the voice from `docs/magazine/VOICE.md` (when it lands per PA-100). Until then, use `content/magazine/rapid-collaborative-impact.md` (the principal-issues essay) as the de-facto calibration spec — it's the closest thing to PA-magazine-voice that exists today.
- For Penwright's longitudinal-test framing, use the comparative phrasing: *"better with Penwright, than without it, in 6 months"* — not the abstinence-test version *"better without it in 6 months"*.

## Tailwind 4 quick-reference

Tokens registered in `app/globals.css` `@theme inline` block:

| CSS variable | Tailwind class root |
|---|---|
| `--color-paper` (= `--paper-bg` = `#f5f1e8`) | `bg-paper`, `text-paper`, `border-paper` |
| `--color-paper-card` (= `#fbf8ef`) | `bg-paper-card`, etc. |
| `--color-paper-divider` (= `#d6cdb8`) | `border-paper-divider`, etc. |
| `--color-ink` (= `--ink-headline` = `#1a1a1a`) | `text-ink`, `bg-ink`, etc. |
| `--color-ink-body` (= `#2c2c2c`) | `text-ink-body` |
| `--color-ink-secondary` (= `#5c5040`) | `text-ink-secondary` |
| `--color-ink-muted` (= `#8c8070`) | `text-ink-muted` |
| `--color-accent` (= `#1a3a5c`) | `text-accent`, `bg-accent`, `border-accent` |
| `--color-accent-warn` (= `#b8260b`) | `text-accent-warn` |

Fonts: Inter (`--font-inter`, sans default) and IBM Plex Mono (`--font-plex-mono`, used for kicker labels with `tracking-[0.18em] uppercase text-[10px]` styling).

## Available scripts

```
npm run dev                # Next.js dev server at localhost:3000
npm run build              # production build
npm run start              # production server (after build)
npm run lint               # eslint
npm run research:sync      # research import/sync (existing — touches content/research/)
npm run portfolio:stats    # GitHub-sourced commits + LoC + repo count → content/stats/portfolio-stats.json
npm run portfolio:capture  # screenshot capture (puppeteer/playwright pipeline)
npm run portfolio:blur     # blur the captured screenshots (for license-restricted artwork etc.)
npm run portfolio:auth     # auth-required screenshot capture (with .auth/ session storage)
```

## Operational commands

| Tool | Use |
|------|-----|
| `vercel ls` | Deployment status |
| `vercel logs peopleanalyst-site` | Production function logs (subscribe API logs land here) |
| `vercel env add <NAME> production` | Add env vars (RESEND_API_KEY, RESEND_AUDIENCE_ID) |
| `gh repo view people-analyst/peopleanalyst-site` | GitHub state |
| `/Users/mikewest/devplane/bin/dp.js status .` | DevPlane action status (use absolute path; not on PATH) |
| `/Users/mikewest/devplane/bin/dp.js actions add "PA-NNN — title" --cat=follow-up` | Mirror new ASN to DevPlane |
| `/Users/mikewest/devplane/bin/dp.js actions done <id>` | Mark DP action complete after PA-NNN ships |

## Sister repos in the portfolio

The PA-site research surface mirrors content from sister repos. When manifest entries point at `source: { repo, path }`, those are the canonical source locations.

| Repo | Local path | Purpose |
|------|------------|---------|
| **vela** | `/Users/mikewest/vela` | Vela platform; writing-features (Penwright lives here at `app/labs/penwright/`); research surface mirrored to PA `/research/vela/` |
| **devplane** | `/Users/mikewest/devplane` | Operator cockpit + the `dp` CLI; research surface mirrored to PA `/research/devplane/` |
| **principia** | `/Users/mikewest/principia` | Organizational measurement registry; research surface mirrored to PA `/research/principia/` |
| **baby-namer** (Namesake) | `/Users/mikewest/Vibe Coding Projects/baby-namer` | Cultural-diffusion research; mirrored to PA `/research/namesake/` |
| **MFL Command Center** (Fourth & Two) | `/Users/mikewest/Vibe Coding Projects/MFL Command Center` | Fantasy-football intelligence; research forthcoming |
| **people-analytics-toolbox** (PA Platform hub) | `/Users/mikewest/Vibe Coding Projects/people-analytics-toolbox` | Hub-and-spoke ecosystem; research forthcoming |
| **meta-factory** | `/Users/mikewest/Vibe Coding Projects/meta-factory-prod/meta-factory-prod` | Production-factory monorepo; corpus-substrate work lives here |
| **Performix** | `/Users/mikewest/Vibe Coding Projects/Performix` | Enterprise performance analytics — early build |
| **devplane-site** | `/Users/mikewest/devplane-site` | DevPlane marketing site — LOCAL-ONLY today, scaffolded for `devplane.dev`; not yet pushed |

## Workflow patterns

**Solo PA-site session.** Cursor open in PA-site root + Claude Code launched in `/Users/mikewest/peopleanalyst-site/` + `npm run dev` running for live preview at localhost:3000. This is the optimal base camp for any pure-PA-site work.

**Cross-repo coordination** (e.g., the Penwright rename which touched vela + PA-site, or the corpus-substrate work spanning vela + meta-factory + PA-site): keep a vela-rooted Claude Code session as the meta base camp; it has the broadest history. PA-site work can be done from there via absolute paths — it works, it's just less clean than a PA-rooted session.

**Magazine drafting** (once the voice doc lands per PA-100): Penwright at `vela/app/labs/penwright/` is being built for exactly this kind of work. Until Penwright is the right surface, drafting happens in Cursor against the voice spec at `docs/magazine/VOICE.md`, with the Writer's Desk critic-personas (per PA-300) summoned for targeted feedback before publishing.

## Conventions worth knowing

- **Lowercase brand identity.** "peopleanalyst" in the masthead and footer is intentionally lowercase. Same lowercase applied to "principal-issues" magazine name (working). Capitalization in prose follows the people-analytics rule above.
- **PA-NNN ID scheme** for assignments. Vela owns ASN-NNN; DevPlane owns DP-NN; Principia owns PRN-NNN; Namesake owns A-NNN; Fourth & Two owns F2-NNN; PA Platform/toolbox owns PAP-NNN; this site owns PA-NNN. Numbering jumps by hundreds for visual separation between subprograms (PA-001..PA-012 = AHI program followups; PA-100+ = magazine initiative).
- **Manifest entries** in `content/research/_manifest.ts` flip `status: "forthcoming"` → `status: "live"` when a sister-repo source file lands. After flipping, run `npm run research:sync` from this site to verify the import.
- **Cross-portfolio links.** All sites in the portfolio should link back to peopleanalyst.com (footer at minimum); this site lists the live-launched siblings in its footer "My Work" column. Add new sites as they go public.
- **Editorial voice across surfaces.** PA-site's editorial voice is Mike's analytical voice — written-not-slide-shaped, methodology-first, source-anchored. NOT marketing-toned. NOT vendor-neutral hand-waving. Different vector than Vela's contemplative voice.

## Known gotchas

- **CTA popout `text-paper-bg` bug** — fixed (commit `ebd6e6d`), but worth knowing: this is the easiest Tailwind-4 mistake to make. Use `text-paper` not `text-paper-bg`.
- **Footer + masthead are NOT auto-updated** when a new site launches. Manual edit in `components/footer.tsx` + `components/masthead.tsx` required.
- **The CTA popout fires at 25s OR 60% scroll** (whichever first), with 14-day localStorage suppression after dismiss / indefinite suppression after subscribe. To test it without waiting, clear `pa-cta-state` localStorage in DevTools.
- **Newsletter signups land in Vercel function logs** until env vars are set. Without `RESEND_API_KEY` + `RESEND_AUDIENCE_ID`, the popout's UX still works end-to-end — signups just sit in logs (`vercel logs peopleanalyst-site --since 1h | grep subscribe`).
- **Resend integration treats duplicates as success** (idempotent UX). Subscribers who try twice see the same "Thanks" message; the second submission is a no-op on Resend's side.

## Pending Mike-actions (as of 2026-05-05)

- Set `RESEND_API_KEY` + `RESEND_AUDIENCE_ID` env vars in **Vercel production** (`vercel env add ... production`, then `vercel --prod`). Local `.env.local` is in place; production still needs them.
- PA-100 (the magazine voice doc) — Mike-authored task; unblocks Wave 2 of the magazine initiative

## Resolved (2026-05-05)

- **`principalissues.com` purchased** (defensive — future option for magazine domain or education-analytics vertical)
- **`people-analyst/devplane-site` GitHub repo created** — local repo at `/Users/mikewest/devplane-site/` can now be pushed (`gh repo view people-analyst/devplane-site` → push `main` → connect Vercel + DNS for `devplane.dev`)
- **Magazine title settled — `principal-issues`** (no longer "working name"; this is the name)
- **Cross-portfolio linking pattern decided.** Common shape: every site links back to `peopleanalyst.com` in the footer; `peopleanalyst.com` links to all live sister sites in its footer (currently `components/footer.tsx` `MY_WORK_LINKS` — Vela + Namesake; add as more go live, e.g. devplane.dev once it deploys). Other cross-site linking is case-by-case where products work closely together.
