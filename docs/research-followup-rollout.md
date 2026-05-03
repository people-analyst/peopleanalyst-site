# Research follow-up rollout — status dashboard

Single-pane visibility across the assignments that close every `forthcoming`-status research-surface slot at peopleanalyst.com/research, bringing each property up to the same standard of completion as the most-developed threads (Christianity-sex-shame at Vela; Namesake's audience-tier reviews + phased reports; DevPlane's overview/methodology/proposal scaffolding).

**Filed:** 2026-05-03. **Owner:** rotates per assignment; tracked in each repo's local queue.

> **Companion doc:** `docs/research-parity-followups.md` holds the structural specification + trigger prompts that informed each assignment. This doc is the *status* dashboard. That doc is the *spec*.

---

## How this is wired

Every assignment has three artefacts:
1. **Local repo queue entry** — the canonical, agent-pickup-able prompt
2. **DevPlane action card** — visibility on the multi-project board (`dp actions <repo-path>` to list per project)
3. **Manifest entry** in `peopleanalyst-site/content/research/_manifest.ts` — flips from `forthcoming` to `live` when the file lands; surfaces on the public research page after `npm run research:sync`

---

## Status table

| Repo | ID | Title | Status | Manifest entry |
|------|-----|-------|--------|---------------|
| vela | ASN-1184 | Peer-review framing | OPEN | `vela:peer-review-framing` |
| vela | ASN-1185 | Engineering critique | OPEN | `vela:engineering-critique` |
| vela | ASN-1186 | Product implications | OPEN | `vela:product-implications` |
| vela | ASN-1187 | Museum diversity-of-beauty write-up | OPEN | `vela:museum-diversity-of-beauty` |
| vela | ASN-1188 | Museum-diversity literature map | OPEN | `vela:museum-diversity-literature-map` |
| peopleanalyst-site | PA-010 | AHI peer-review framing | OPEN | `ai-human-interaction:peer-review` |
| peopleanalyst-site | PA-011 | AHI engineering critique | OPEN | `ai-human-interaction:engineering` |
| peopleanalyst-site | PA-012 | AHI product implications | OPEN | `ai-human-interaction:product` |
| devplane | DP-100 | General-audience explainer | OPEN | `devplane:general-audience` |
| devplane | DP-101 | Peer-review framing | OPEN | `devplane:peer-review` |
| devplane | DP-102 | Engineering critique | OPEN | `devplane:engineering` |
| devplane | DP-103 | Product implications | OPEN | `devplane:product` |
| principia | PRN-001 | General-audience explainer | OPEN | `principia:general-audience` |
| principia | PRN-002 | Peer-review framing | OPEN | `principia:peer-review` |
| principia | PRN-003 | Engineering critique | OPEN | `principia:engineering` |
| principia | PRN-004 | Product implications | OPEN | `principia:product` |
| principia | PRN-005 | Engagement construct-family survey | OPEN (gated on vela ASN-1013) | `principia:engagement-survey` |
| principia | PRN-006 | Job-satisfaction construct-family survey | OPEN (gated on PRN-005) | `principia:job-satisfaction-survey` |
| principia | PRN-007 | Organizational-commitment survey | OPEN (gated on PRN-005, PRN-006) | `principia:organizational-commitment-survey` |
| principia | PRN-008 | Synthesis-analytic preregistration scaffold | OPEN | `principia:preregistration` |
| MFL Command Center (4&2) | F2-001 | Stand up the research surface | OPEN | (multi-entry — full surface) |
| people-analytics-toolbox (PA Platform) | PAP-001 | Stand up the research surface | OPEN | (multi-entry — full surface) |

**Total:** 22 assignments across 6 repos. 17 single-entry; 2 multi-entry meta-assignments (F2-001 and PAP-001 each cover ~10 manifest slots).

**Fully-staffed slots after this wave lands:** 5 + 3 + 4 + 8 + (~10) + (~10) = ~40 manifest entries flipped from forthcoming to live.

---

## Per-repo entry-points

```bash
# Vela queue — append assignments live at the bottom of the file
$EDITOR /Users/mikewest/vela/docs/AGENT-ASSIGNMENTS.md
# DevPlane actions: dp actions /Users/mikewest/vela

# peopleanalyst-site queue
$EDITOR /Users/mikewest/peopleanalyst-site/docs/AGENT-ASSIGNMENTS.md
# DevPlane actions: dp actions /Users/mikewest/peopleanalyst-site

# DevPlane queue (the meta-tool's own queue)
$EDITOR /Users/mikewest/devplane/docs/ASSIGNMENT-QUEUE.md
# DevPlane actions: dp actions /Users/mikewest/devplane

# Principia queue (newly stood up)
$EDITOR /Users/mikewest/principia/docs/AGENT-ASSIGNMENTS.md
# DevPlane actions: dp actions /Users/mikewest/principia

# Fourth & Two queue (newly stood up)
$EDITOR "/Users/mikewest/Vibe Coding Projects/MFL Command Center/docs/AGENT-ASSIGNMENTS.md"
# DevPlane actions: dp actions "/Users/mikewest/Vibe Coding Projects/MFL Command Center"

# PA Platform / toolbox queue (newly stood up)
$EDITOR "/Users/mikewest/Vibe Coding Projects/people-analytics-toolbox/docs/AGENT-ASSIGNMENTS.md"
# DevPlane actions: dp actions "/Users/mikewest/Vibe Coding Projects/people-analytics-toolbox"
```

---

## Closing the loop

When an assignment ships:

1. Author flips its status in the repo's local queue (OPEN → DONE) with the commit SHA.
2. Author flips the manifest entry in `peopleanalyst-site/content/research/_manifest.ts`: `status: "forthcoming"` → `status: "live"` + adds `source: { repo, path }`.
3. Author runs `cd /Users/mikewest/peopleanalyst-site && npm run research:sync` to verify the import and pull the file in.
4. Author commits the manifest update + sync output to peopleanalyst-site and pushes.
5. Author marks the DevPlane action done: `dp actions done <action-id>`.
6. Updates this status table (OPEN → DONE) with a link to the commit.

When all 22 land, the public research surface at peopleanalyst.com/research is at completion-parity across the seven properties — the deliverable Mike named (2026-05-03).

---

## What this does not cover

- **Future research arcs.** As new threads emerge (e.g., the developmental-theology arc; the emotion architecture work; new diagnostic engagements), they will have their own forthcoming entries. Add to this dashboard as filed.
- **Pipeline-status entries.** Most pipeline-status slots are already live or are minor maintenance. Not in this wave.
- **Research-arc reorganization.** The arc-organized `/research` index is parked mid-flight (foundation in commit `a2c28c4`). When that resumes, the arc affiliations of these in-flight assignments may surface in additional ways.
