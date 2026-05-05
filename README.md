# peopleanalyst-site

Portfolio + research surface + magazine + consulting hub for the [PeopleAnalyst](https://peopleanalyst.com) portfolio.

A content-driven Next.js site. Most surfaces render markdown via a shared `MarkdownProse` component (rehype-raw enabled, so `<details>/<summary>` accordions work inside markdown). One API route (`/api/subscribe` → Resend Audiences) backs the newsletter popout. Everything else is static.

## Role in the portfolio

This is the public surface for the **people-analyst** GitHub org — the aggregator and editorial face for everything else in the portfolio. Each sister repo (vela, devplane, principia, namesake, fourth-and-two, people-analytics-toolbox, meta-factory, performix) authors its research drafts in-repo; this site mirrors them into `/research/<product>/` for build-time rendering. Cross-project operations (assignment dispatch, agent kanban, session reports) live in the sister repo **devplane** at `localhost:4000`; this site is where those programs become legible to the outside world.

Hosted programs:

- **AI–Human Interaction (AHI) research program** at `/research` — including the C1 risk-compensation field study mirrored at `/research/devplane`
- **principal-issues** magazine at `/magazine` — editorial surface for analytical writing on AI–human interaction, people analytics, and organization measurement
- **Consulting** at `/consulting` — lead-gen surface; ten service accordions backed by `content/consulting/services.md`
- **Portfolio + CV** at `/` and `/cv` — product cards, sidebar stats, and the canonical Mike CV

## Stack

- **Next.js** 16.2.4 (App Router, React 19)
- **Tailwind** 4 (tokens registered via `@theme inline` in `app/globals.css`)
- **TypeScript** 5
- **Resend** for newsletter signups
- **Playwright + sharp** for portfolio screenshot capture
- Auto-deploys to Vercel on push to `main`

## Layout

| Surface | Source |
|---|---|
| Home (portfolio) | `app/page.tsx` + `content/projects.ts` |
| Research arcs | `content/research/` (manifest, taxonomy, per-product folders mirrored from sister repos) |
| Magazine | `content/magazine/` (`_meta.ts` + `<slug>.md` per article) |
| Consulting | `app/consulting/page.tsx` + `content/consulting/services.md` |
| CV | `content/cv/resume.md` |
| Capabilities (parts) | `content/parts/_meta.ts` + `content/capabilities/<slug>.md` |
| CTA popout | `components/cta-popout.tsx` + `lib/cta-config.ts` |
| Subscribe API | `app/api/subscribe/route.ts` |

The research surface mirrors content from sister repos (`vela`, `devplane`, `principia`, `baby-namer`, etc.). Manifest entries in `content/research/_manifest.ts` declare the canonical source via `source: { repo, path }`, and `npm run research:sync` pulls them in.

## Scripts

```bash
npm run dev                # localhost:3000
npm run build              # production build
npm run start              # production server
npm run lint

npm run research:sync      # mirror sister-repo research files into content/research/
npm run portfolio:stats    # GitHub-sourced commits + LoC → content/stats/portfolio-stats.json
npm run portfolio:capture  # Playwright screenshot capture
npm run portfolio:blur     # blur captured screenshots (license-restricted artwork)
npm run portfolio:auth     # auth-required screenshot capture
```

## Environment

The newsletter route falls back to logging in Vercel function output if env vars are missing — UX still completes end-to-end. To actually deliver to Resend Audiences:

```
RESEND_API_KEY=...
RESEND_AUDIENCE_ID=...
```

Set via `vercel env add <NAME> production`.

## Conventions

- **Brand** is lowercase: `peopleanalyst` in the masthead/footer is intentional.
- **"people analytics"** stays lowercase in prose unless naming a formal team or product.
- **Tailwind tokens** are `bg-paper`, `text-ink`, `text-accent`, etc. — *not* `bg-paper-bg`. The theme tokens are declared in `app/globals.css`.
- **Push at milestones, not per commit.** Each push to `main` triggers a Vercel build.

## History

Stood up 2026-04-28 from `create-next-app`. Solo-owner pace, content-first, frequent reframing. Major milestones:

| Date | Milestone |
|------|-----------|
| 2026-04-28 | Initial commit; design system + masthead + first project card (Vela); hero reframe around architecture |
| 2026-04-29 | First Vela research drafts pulled in (ASN-954..958) |
| 2026-04-30 | `/research` surface + `/cv` page + seven-slot parity baseline; portfolio screenshot+blur pipeline; DevPlane added as 5th product; Principia as 6th; Fourth & Two screenshots; shared footer |
| 2026-05-03 | **Big buildout day.** AI–Human Interaction research program live; PA-001..PA-009 agent-assignment queue stood up; consulting page (10 service accordions + right-rail sidebar); research arcs taxonomy + per-arc detail pages; CTA popout (per-page next-step + newsletter fallback); subscribe API wired to Resend Audiences (env-gated, idempotent); Loom → Penwright rebrand; magazine surface stood up with first article (`Rapid Collaborative Impact`) |
| 2026-05-04 | Magazine initiative plan + Wave 1 ASNs (PA-100..PA-302); `AGENTS.md` substantive orientation doc; DP-112 synthesis content added to `/research/devplane` |

63 commits in the first week.

## Notes from sister repos

Compiled from references to `peopleanalyst-site` / `peopleanalyst.com` across the Vela repo (`/Users/mikewest/vela`). Captures workflow, conventions, and gotchas that originate sister-side and land here.

### Vela ↔ peopleanalyst-site sync pattern

Vela authors research drafts in `vela/docs/research/`; this site mirrors them under `content/research/vela/<slug>.md`. The contract:

1. Ship the source doc in Vela first — commit + push.
2. Edit `content/research/_manifest.ts` here: flip the matching slug entry from `status: "forthcoming"` → `"live"` and add `source: { repo: "people-analyst/vela", path: "docs/research/<...>.md" }`.
3. Run `npm run research:sync` from this repo. Verify the synced markdown copy lands cleanly (e.g. `[copied] vela/<slug>`).
4. Commit the manifest change *plus* any newly-synced files in `content/research/vela/` together. Push.

The Vela commit must precede the manifest commit so `source.path` resolves on sync. If you flip status without a corresponding source file in Vela's tip, the sync errors with "missing source files."

### Seven-slot baseline

Each product on `/research/<product>/` is scaffolded against a seven-slot baseline: **Overview · Methodology · Reports · Audience-tiers · Bibliography · Preregistrations · Pipeline**. Vela uses this as its reference register; Namesake/baby-namer is the worked example. Empty slots stay `forthcoming`; a product is "fully aligned" when none remain.

### Recent ASN history landing here (Vela side)

Surfaces opened or filled over the last two weeks:

| ASN | What it brought to peopleanalyst-site |
|-----|----------------------------------------|
| ASN-954 | `vela/methodology` slot live (`docs/research/methodology.md`) |
| ASN-955 | Christianity-sex-shame audience-tier reviews (P3, ongoing) |
| ASN-956 | `vela/pipeline-status` slot live |
| ASN-957 | `vela/research-program` overview slot live (`docs/research/OVERVIEW.md`) |
| ASN-958 | `vela/museum-diversity-of-beauty-research-questions` slot live |
| ASN-980 | Pipeline-status auto-generation (post-956 follow-up) |
| ASN-981 | Museum-diversity sub-question (a) preregistration → analysis |
| ASN-1186 | `vela/product-implications` slot live (audience-tier 3 review, 1,912 words) |

Companion engineering critique (`vela/engineering-critique`) shipped 2026-05-04 at 1,806 words; manifest flip was queued as a peopleanalyst-site session.

### Penwright Research Program lives here

Per `vela/docs/VISION-PENWRIGHT-AUTHORSHIP.md` and `VISION-PENWRIGHT-MEASUREMENT.md`, the public-facing research program for Penwright + the broader AI–Human Interaction (AHI) frame is hosted at this repo under `content/research/ai-human-interaction/` (rendered at `peopleanalyst.com/research/ai-human-interaction`). That program owns the published-paper trajectory — the twelve-paper Penwright Research Program, Tier-1 through Tier-3, see `penwright-sub-paper-plan.md` here. Vela's vision docs own the system itself; methodology section here at `methodology.md` §2.2 mirrors the Vela measurement doc. Keep them paired — design changes that affect measurement claims propagate both ways.

### Untracked-tree caveat (2026-04-29 session)

When ASN-954/956 first landed, `content/research/` was discovered to be entirely untracked WIP — manifest + taxonomy + 60 markdown files all outside git. The shipping agent committed only the four files directly tied to the active ASNs (manifest, taxonomy, the two new vela docs) and left the other 58 untracked rather than claim ownership of the broader portfolio launch. If you find untracked content under `content/research/`, check whether it's intentional WIP before bulk-adding.

### Large-push hazard (2026-04-30)

A four-commit batch (~20K line insertions + screenshots) failed `git push` with HTTP 400 / sideband disconnect — GitHub's default HTTP buffer cap. Fix that worked:

```bash
git -c http.postBuffer=524288000 push
```

Or set globally if it recurs: `git config --global http.postBuffer 524288000`.

### Sister-repo prompts archive

Vela carries paste-ready prompts (`vela/docs/research/portfolio-alignment-prompts.md`) for repeating the seven-slot alignment pass on **DevPlane** and **People Analytics Toolbox**. Same pattern: edit `_manifest.ts` here, sync, verify routes 200 on localhost, commit. For products without an active source repo (PA Toolbox, possibly Fourth & Two), Option B authors docs in-place at `content/research/<product>/` with no `source` block — lower-friction.

### Contact + ownership

Owner: Mike West (`mike@peopleanalyst.com`). Vela Conductor sessions in the Vela repo treat this site as a downstream surface; sister-repo agents are expected to commit here when their assignment names a manifest flip. The Vela commit must precede the manifest commit (see sync pattern above).

## For agents

`AGENTS.md` is the load-bearing orientation doc — it covers the full task-area map, sister-repo layout, the PA-NNN ID scheme, and the gotchas this README skips. Read it first.

`docs/handoff/` carries the latest dated handoff (what shipped most recently) and `docs/AGENT-ASSIGNMENTS.md` is the work queue.
