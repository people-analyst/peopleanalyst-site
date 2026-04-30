# Survey Respondent Interface

**Type:** ui
**Origin repo(s):** preference-modeler (canonical), baby-namer (tournament variant), reincarnation (adaptive variant)
**Extraction readiness:** needs extraction
**Depends on:** token-based resource auth, email safety switch (for invitations), psychometric item bank (for adaptive variant)
**Last reviewed:** 2026-04-24

## What it is

A token-gated (no-login) interface for a respondent to answer a set of items — ratings, selections, free-text, or pairwise comparisons — whose responses flow into a downstream scoring or analysis pipeline. Three variants already exist in the portfolio: open-ended estimation (preference-modeler 360), multi-round pairwise voting (baby-namer tournament), and adaptive item selection (reincarnation psychometrics).

## Data shape

- `surveys` — survey definition (name, owner, config JSON).
- `survey_items` — one row per question (prompt, type, options JSONB, ordering).
- `survey_tokens` — one row per respondent invitation (token, scope, expiry, used_at).
- `survey_responses` — one row per item-response (token, item_id, value JSONB, submitted_at).
- Response analysis tables/views (aggregation, item-total correlation, Cronbach's alpha for psychometric variants).

## UI / surface shape

- Route: `/s/[token]` or `/survey/[slug]?t=[token]` — token validated server-side; no login required.
- Progressive rendering: one item per screen OR grouped pages, depending on item count.
- Client-side draft persistence (P109 navigation-triggered auto-save) so a respondent doesn't lose progress.
- Submit → scoring pipeline kicks off async; respondent sees a confirmation page with optional teaser of aggregate data (if allowed).
- For tournament variant: pairwise UI with two cards, vote buttons, progress through bracket.
- For adaptive variant: server decides next item based on response history (not a linear path).

## Variants in the wild

- **Preference-modeler** — canonical open-ended. 360 feedback, anonymous pooling enforced by 5+ response threshold before display.
- **Baby-namer** — tournament: multi-round voting, seeded brackets, live aggregate via realtime channel.
- **Reincarnation** — adaptive item selection based on exploration budget + response entropy. Psychometric scoring (Cronbach's alpha, item-total correlation) produced server-side post-submission.

## Primary files in origin

- `app/survey/[token]/` — respondent UI route (preference-modeler)
- `server/survey/token-auth.ts` — token validation middleware
- `server/scoring/` — post-submission pipeline
- `server/survey/adaptive-selector.ts` — adaptive variant's next-item logic (reincarnation)

## Next-version notes

- Unify the three variants behind one `<Survey>` component with a pluggable "next item" strategy (linear / pairwise / adaptive).
- Token issuance is reinvented per-app; should become a shared module (per P108).
- The aggregation-privacy threshold ("don't show until 5+ responses") is specific to preference-modeler but belongs as a reusable gate.

## Related patterns

- P108 — Stateless Token Auth for Resource Access
- P109 — Navigation-Triggered Auto-Save
- P17 — Signed Webhook with Narrow Event Dispatcher (result forwarding)
- P41 — Polling Status Endpoint (for async scoring completion)
