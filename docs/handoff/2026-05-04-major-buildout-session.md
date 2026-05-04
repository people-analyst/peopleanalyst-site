# Handoff — peopleanalyst-site major buildout session

**Agent:** Claude Code (Opus 4.7, 1M context)
**Date:** 2026-05-04 (session ran across the day prior, all commits pushed)
**Session focus:** large multi-pivot buildout — AI–Human Interaction research program, research-arc reorganization, portfolio expansion (Loom→Penwright + Performix + MetaFactory), consulting-page upgrade, magazine surface, CTA popout + Resend, GitHub-sourced sidebar stats, Penwright rename across the portfolio, cross-repo research-followup wave, DevPlane site scaffolded

---

## What shipped on `peopleanalyst-site` (chronological)

All commits on `main`, all pushed.

| Commit | Subject | Surface |
|--------|---------|---------|
| `a76beb9` | Stand up the AI–Human Interaction research program | `content/research/ai-human-interaction/` (78 files: 9 program docs + 29 topic reviews + 6 syntheses + manifest entries) |
| `ea46b7a` | PA-001..PA-009 — first PA assignment queue | `docs/AGENT-ASSIGNMENTS.md` |
| `cf2a6a8` | PA Platform card → bottom of portfolio | `content/projects.ts` |
| `7fcddbd` | NYT $1.6M scrub | `content/consulting/services.md` |
| `a2c28c4` | Research-arc taxonomy + 96-entry tagging (foundation) | `content/research/_arcs.ts` + `_manifest.ts` |
| `52771da` | Portfolio: broaden Vela + add Loom/Performix/MetaFactory; "Many products" tagline | `content/projects.ts`, `app/page.tsx` |
| `3097f57` | Consulting accordions (10 fold-out service sections) | `content/consulting/services.md`, `components/markdown-prose.tsx`, `app/globals.css` |
| `f95e798` | Footer: Elsewhere → My Work; LinkedIn + GitHub → Get in touch | `components/footer.tsx` |
| `9e0a664` | PA-010..012 (AHI audience tiers) + research-followup-rollout dashboard | `docs/AGENT-ASSIGNMENTS.md`, `docs/research-followup-rollout.md` |
| `a88ff17` | Consulting page right-rail sidebar (practice stats + clients-by-industry) | `app/consulting/page.tsx` |
| `4403157` | Arc-organized `/research` index + `/research/arc/[arc]` + `/research/by-product` | `app/research/page.tsx` + `app/research/arc/[arc]/page.tsx` + `app/research/by-product/page.tsx` + `lib/research.ts` |
| `21ded7e` | Sidebar stats from GitHub (commits + LoC + repos) | `scripts/fetch-portfolio-stats.ts`, `app/page.tsx`, `content/stats/portfolio-stats.json` |
| `bb10967` | Research arcs: Organizational Measurement to top | `content/research/_arcs.ts` |
| `02c9ca5` | CTA popout — per-page next-step + newsletter fallback | `components/cta-popout.tsx`, `lib/cta-config.ts`, `app/api/subscribe/route.ts`, `app/layout.tsx` |
| `a60c9fd` | Subscribe wired to Resend Audiences (env-gated, idempotent) | `app/api/subscribe/route.ts` |
| `ebd6e6d` | CTA button text fix (text-paper-bg → text-paper) | `components/cta-popout.tsx` |
| `4aecb9e` | Penwright rename (Loom → Penwright in PA-site) + consulting line-break | `content/projects.ts`, `content/research/_arcs.ts`, `content/research/_manifest.ts`, AHI program md files, three file renames (`loom-paper-01-*` → `penwright-paper-01-*`, `loom-sub-paper-plan.md` → `penwright-sub-paper-plan.md`) |
| `27cb3da` | Magazine surface + first article (Rapid Collaborative Impact) | `app/magazine/page.tsx`, `app/magazine/[slug]/page.tsx`, `content/magazine/_meta.ts`, `content/magazine/rapid-collaborative-impact.md` |
| `36968c7` | Home sidebar paragraph rewrite — DevPlane explicit mention | `app/page.tsx` |
| `2601ef2` | Home sidebar drop "PA Toolbox spokes" row | `app/page.tsx` |
| `50c022b` | Penwright tagline: "better with it, than without it" framing | `content/projects.ts` |
| `30a32a3` | Penwright longitudinal-test framing — consistency pass (4 places) | `content/projects.ts`, `content/research/_arcs.ts`, `content/research/ai-human-interaction/methodology.md`, `content/research/ai-human-interaction/program.md` |
| `0990310` | Same framing in `penwright-paper-01-public.md` (5th place) | `content/research/ai-human-interaction/penwright-paper-01-public.md` |
| `800c210` | Magazine added to masthead nav (between research and parts) | `components/masthead.tsx` |
| `d9ca759` | Magazine H1: "People Analytics principal-issues thesis." | `app/magazine/page.tsx` |
| `07aa154` | Magazine H1: "principal-issues." (working name; Mike to revise) | `app/magazine/page.tsx` |

---

## Key surfaces stood up this session

### `/research` — arc-organized index
- 8 arcs: organizational-measurement (top, per Mike), adaptive-measurement, cultural-diffusion, decision-support, coordination-cost, capability-development, aesthetic-response, religion-morality
- Per-arc detail at `/research/arc/<slug>`
- Per-product axis preserved at `/research/by-product` (linked from sidebar)
- Per-entry pages at `/research/<product>/<slug>` unchanged

### `/research/ai-human-interaction` — new program
- 8-arc program scaffolding (overview, methodology, program, literature-map, roadmap, pipeline-status, plus loom-sub-paper-plan, plus the two anchor papers — all renamed `penwright-*` after the rebrand)
- 29 topic literature reviews + 6 cross-LLM syntheses in `content/research/ai-human-interaction/sources/`
- Originals archived to `sources/_originals/`

### `/consulting` — major upgrade
- 10-service accordion menu (decision support, function build, platform selection, custom architecture, comp modeling, workforce planning, survey strategy, diagnostic research, AI-native augmentation, methodology coaching)
- Right-rail sidebar (practice stats: 25+ clients · 12+ years independent · 10+ years in-house F500 · 10+ years startup PM · 1 book · 97+ articles · 22K LinkedIn) + clients-by-industry block
- Engagement-shapes table (kept top-level)
- Selected past clients list + What's distinctive section
- "Send a note" mailto + "How to engage" closing

### `/magazine` — new surface
- First article: **Rapid Collaborative Impact** (the principal-issues essay, lightly cleaned + published as draft)
- Index at `/magazine`, per-article render at `/magazine/[slug]`
- H1: "principal-issues." (working name)
- In masthead nav (between research and parts) per Mike's request
- Linked from consulting page (Methodology coaching section) and footer

### CTA popout (slide-in, all pages)
- Per-page primary CTA → mailto with intent-specific subject lines
- Decline → newsletter signup form
- 25s time trigger OR 60% scroll, whichever fires first
- localStorage suppression: 14 days after dismiss; indefinite after subscribe
- POST `/api/subscribe` → Resend Audiences (env-gated; falls back to function logs without env vars)

### Sidebar stats (home page)
- Auto-derived `products` count from `PROJECTS.length` (now 8)
- GitHub-sourced `commits, last 12mo` + `lines of code` + `repos` from `npm run portfolio:stats`
- Refresh manually; written to `content/stats/portfolio-stats.json`

### Portfolio expansion (`content/projects.ts`)
- Vela card rewritten to reflect broadening (Penwright, Editorial Office, three editorial axes, per-user magazine pacing)
- 3 new cards: Penwright (was Loom), Performix, MetaFactory
- PA Platform moved to bottom
- Order: DevPlane · Fourth & Two · Namesake · Vela · Penwright · Performix · MetaFactory · PA Platform

---

## What landed in OTHER repos (cross-portfolio work)

| Repo | Commit(s) | Summary |
|------|-----------|---------|
| **vela** | `219ec8626`, `4c7518594` | ASN-1184..1188 research follow-ups + Penwright rename (148 files content-edited; 6 dirs renamed; 2 huge .zip files in `sources/penwright-inbox/` untracked + dir gitignored — was hitting GitHub's 2GB push limit) |
| **devplane** | `e9edce2` | DP-100..103 research audience-tier follow-up assignments |
| **principia** | `d7992ed` | New `docs/AGENT-ASSIGNMENTS.md` + PRN-001..008 (4 audience tiers + 3 construct-family surveys + preregistration scaffold) |
| **MFL Command Center (4&2)** | `69c0033` | New stub assignments doc + F2-001 (research-surface meta-task) |
| **people-analytics-toolbox (PA Platform)** | `5a6fe93` | New stub assignments doc + PAP-001 (research-surface meta-task) |
| **DevPlane site** (`/Users/mikewest/devplane-site/`) | `e01eb39` (LOCAL-ONLY) | Next.js scaffolded, landing page drafted with hero + problem + features + research-link + early-access CTA. Waiting on Mike to bless creating `people-analyst/devplane-site` GitHub repo, then push + connect devplane.dev DNS |

DevPlane mirror: 22 `dp actions` cards added across the 6 projects.

Master rollout dashboard: `docs/research-followup-rollout.md` — single-pane status of all 22 research-followup assignments and their manifest-flip targets.

---

## Penwright (the rebrand)

The writing-features authorship system rebranded **Loom → Penwright** mid-session per Mike's domain purchase (penwright.ink + penwrite.ink + inkstead.ink).

- 5 directories renamed in vela (`app/labs/`, `lib/`, `components/`, `scripts/`, `docs/` plus `sources/loom-inbox` → `sources/penwright-inbox`)
- 2 vision docs renamed (`VISION-LOOM-AUTHORSHIP.md` → `VISION-PENWRIGHT-AUTHORSHIP.md`, same for `-MEASUREMENT.md`)
- 132 source files content-edited via regex (Loom/LOOM/loom → Penwright/PENWRIGHT/penwright)
- DB tables (`loom_passages`, `loom_authorship_packets`, `loom_draft_sessions`, `loom_packet_items`, `loom_writer_profile`, `loom_emergence_events`, `loom_claims`, `loom_events`, `loom_research_studies`, `loom_workspace_sessions`) **preserved as-is** — production data; rename via planned migration only
- PA-site: 3 `loom-paper-*` files renamed; portfolio card slug + headline + body updated; manifest slugs updated; AHI program md files updated; PA-005..PA-009 entries updated; CV mention updated
- Penwright "longitudinal-test" framing standardized: *"better writer with Penwright, than without it, in 6 months"* (5 places)

Follow-up ASN to file in vela queue when ready: planned migration to rename `loom_*` DB tables → `penwright_*`.

---

## Pending — Mike's actions

| Item | What to do | Why |
|------|------------|-----|
| **Set Resend env vars** in peopleanalyst-site Vercel project | `vercel env add RESEND_API_KEY production` then `vercel env add RESEND_AUDIENCE_ID production`, then `vercel --prod` | CTA newsletter currently logs to function-logs only; setting env vars routes signups to your Resend audience |
| **Buy `principalissues.com`** | Registrar of choice | $15/yr defensive; great double-meaning (school principal + principal-issues framework); future option for magazine-domain or education-analytics vertical |
| **Bless `people-analyst/devplane-site` GitHub repo creation + DevPlane site push** | `gh repo create people-analyst/devplane-site --public --source /Users/mikewest/devplane-site --push` | Site scaffolded locally at commit `e01eb39`; needs remote + Vercel link + devplane.dev DNS pointing |
| **Decide cross-portfolio linking pattern** | Surface preferred footer-link shape | All sites should link back to peopleanalyst.com per Mike's earlier ask; per-repo footer edits queued but not done |
| **Title decision: magazine** | Keep "principal-issues" or evolve | Current H1 is the working name. More lenses get added under this banner over time. |

---

## Pending — agent-side follow-ups (queued in source repos)

- **Vela ASN-1184..1188** — Vela research audience-tier follow-ups + museum-diversity write-up
- **Vela ASN-(next)** — file the planned migration to rename `loom_*` tables → `penwright_*`
- **DevPlane DP-100..103** — DevPlane research audience-tier follow-ups
- **Principia PRN-001..008** — full first-wave research surface
- **PA-001..PA-012** — AHI program follow-ups (literature reviews, paper drafts, preregistrations, external-operator pilot)
- **F2-001 / PAP-001** — stand up research surfaces in 4&2 and PA Platform repos

---

## Memory updates this session

- `feedback_people_analytics_capitalization.md` — "people analytics" stays lowercase as a discipline noun; capitalize only when naming a formal org function (team, department, platform/product brand)

(Plus prior memory updates from earlier turns: emotion deep-research arrival, the Penwright rebrand context, etc.)

---

## How to pick up next session

**START HERE:** read **`AGENTS.md`** (now substantive — the orientation doc; was placeholder until this session). It covers stack, definition-of-done, critical rules, Tailwind 4 token reference, available scripts, sister repos, workflow patterns, conventions, known gotchas, and pending Mike-actions.

Then:

1. This file + `docs/research-followup-rollout.md` for the cross-portfolio rollout state
2. `docs/AGENT-ASSIGNMENTS.md` for the work queue (PA-001..PA-012 = AHI followups; PA-100+ = magazine initiative)
3. `docs/magazine/PLAN.md` for the magazine initiative — comprehensive strategic + execution plan
4. `~/.claude/projects/-Users-mikewest-vela/memory/MEMORY.md` for live conventions (auto-memory namespace; the lowercase-people-analytics rule etc. live there)
5. Check Mike's pending-actions list (in `AGENTS.md` and below) before starting any work that depends on Resend env vars or DevPlane domain.

**Recommended workflow** going forward (per the session-end conversation): launch Claude Code from `/Users/mikewest/peopleanalyst-site/` for pure PA-site work — clean PA-rooted context, no vela CLAUDE.md inheritance, project-specific session. Cursor open in PA-site, `npm run dev` for live preview. Cross-repo work (Penwright rename, corpus-substrate, etc.) keeps a vela-rooted session as the meta base camp.

Working tree clean. All commits pushed. Local `devplane-site` is the only orphan — by design, waiting on Mike's bless.
