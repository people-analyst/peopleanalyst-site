# docs/CAPABILITIES/

**Application building blocks.** When you're standing up a new app, this is where you look first to see what already exists in the portfolio that you can reuse instead of rebuilding.

> **Architectural doctrine:** capabilities follow the [Portfolio Capability Platform Playbook](../PORTFOLIO_CAPABILITY_PLATFORM_PLAYBOOK.md) — folder standard `src/capabilities/<name>/{contracts,core,adapters,ui,tests}`, extraction maturity Levels 0–3, "extractability now, extraction later." This catalog is the **portfolio-wide directory** of capabilities; each entry's actual implementation lives under `src/capabilities/<name>/` in its owning app.
>
> **First reference implementation:** [Performix](../PERFORMIX_CAPABILITY_ARCHITECTURE.md) composes seven capabilities (`protected-feedback`, `insight-player`, `cams-diagnostic`, `survey-collector-adapter`, `performance-science-library`, `segmentation-adapter`, `action-loop`) and is the proving ground for the doctrine.

## How this differs from `MAPS/` and `PATTERNS/`

| Surface | Grain | Example |
|---|---|---|
| `docs/MAPS/` | One repo's architecture inventory | "Calculus has a metric-definition engine, a statistical enrichment module, an AI agent, ..." |
| `docs/PATTERNS/` | Engineering technique, domain-agnostic, copy-paste code sketch | "Discriminated-Union State Machine (P04)" |
| `docs/CAPABILITIES/` | **Application-level functional building block** — a feature or subsystem a new app would want whole | "Data-driven profile page," "Survey respondent interface," "Monte Carlo simulation engine" |

A capability is usually **an assembly of several patterns** applied to a recognizable functional need. The Baby-Namer profile page is the concrete capability; the patterns it's built from (P49 dense entity page, P50 composite weighted score, P51 dial→pillar projection, P55 recommendation cluster, P66 graceful degradation) are the engineering ingredients.

## Capability grain

A capability has:
- **Functional identity** — something a PM would put on a feature list ("profile page," "surveys," "data warehouse")
- **Reusable data shape** — a table structure or API contract that transfers
- **Reusable UI/surface shape** (when applicable) — routes, components, UX primitives
- **Known origin repo(s)** — where a working version lives today
- **Extraction readiness** — can I copy-paste it today, or does it need to be lifted out of business logic first?

Capabilities can stay **domain-aware** (unlike patterns, which must be domain-agnostic). "Profile page for people analytics" is a valid capability as long as the shape transfers to "profile page for naming products."

## File format

Each capability gets one file: `<capability-slug>.md` with this structure:

```
# <Capability Name>

**Type:** ui | data | algo | integration | agent | infra
**Origin repo(s):** <repos that have a working implementation>
**Extraction readiness:** copy-paste bundle | needs extraction | design reference only
**Depends on:** <other capabilities this assumes>
**Last reviewed:** <date>

## What it is
<one paragraph — functional description, not implementation>

## Data shape
<tables / schemas / API contract sketch>

## UI / surface shape
<routes, components, UX primitives — or "n/a" for pure backend>

## Variants in the wild
<how different repos' implementations differ>

## Primary files in origin
<key file paths in the origin repo>

## Next-version notes
<what you'd improve when building fresh>

## Related patterns
<P-numbers from MASTER-PATTERNS.md that implement pieces of this capability>
```

## Type tags

| Tag | Meaning |
|---|---|
| `ui` | Reusable UI surface (profile page, survey form, admin list) |
| `data` | Data model / backend architecture (warehouse, event log, segmentation schema) |
| `algo` | Algorithm (Monte Carlo, segmentation math, scoring model) |
| `integration` | Connector / adapter (OAuth provider, webhook pattern, hub sync) |
| `agent` | AI/agent capability (budgeted agent, extraction pipeline, LoRA training) |
| `infra` | Operational building block (job queue, feature flag, email gateway) |

## How this catalog gets populated

This is **hub-seeded** today — the initial draft came from scanning the 17 `*-map.md` files in `docs/MAPS/` and extracting recurring functional subsystems. Going forward, each repo will contribute its own capabilities via **Prompt G** (TBD) the same way they contribute architecture maps via Prompt A and patterns via Prompt B.

**Do NOT add repo-specific business logic here.** If you can't strip enough business context to make the shape transferable, it's a code reference that belongs in the repo, not in this catalog.

## Current inventory

**Clearly recurring (3+ repos).** These are the highest-leverage building blocks — when standing up a new app in the portfolio, check here first.

| Capability | Type | Origin | Also in |
|---|---|---|---|
| [Data-driven profile page](data-profile-page.md) | ui | baby-namer | vela, people-analyst |
| [Survey respondent interface](survey-respondent-interface.md) | ui | preference-modeler | baby-namer, reincarnation |
| [CSV ingestion + column detection](csv-ingestion.md) | data | segmentation-studio | calculus, conductor, data-anonymizer, people-analyst |
| [Segmentation / dimension management](segmentation-dimensions.md) | data | segmentation-studio | calculus, conductor, meta-factory, people-analyst, preference-modeler, reincarnation |
| [AI field mapping → canonical schema](ai-field-mapping.md) | data | conductor | data-anonymizer, people-analyst, preference-modeler, segmentation-studio |
| [Compensation scenario modeling](compensation-scenarios.md) | data | anycomp | calculus, conductor, decision-wizard, meta-factory, people-analyst, preference-modeler, voi-calculator |
| [Monte Carlo simulation engine](monte-carlo-simulation.md) | algo | voi-calculator | anycomp, decision-wizard, people-analyst |
| [Statistical analysis engine (HAVE)](statistical-analysis.md) | algo | calculus | anycomp, conductor, people-analyst |
| [Realtime vote / response aggregation](realtime-aggregation.md) | data | baby-namer | reincarnation, vela |
| [Hub ecosystem sync (directives + metrics)](hub-ecosystem-sync.md) | integration | kanbai (hub) | 12 spokes |
| [GitHub bi-directional sync](github-sync.md) | integration | data-anonymizer | 12 other spokes |
| [Documentation generation + hub score](docs-generation.md) | integration | (shared) | 13 repos |
| [Kanban board + hub sync (spoke)](kanban-spoke.md) | infra | kanbai | 11 spokes |

**Strong single-origin** (1–2 repos, clearly extractable).

| Capability | Type | Origin | Status |
|---|---|---|---|
| [Adaptive learning queue / pool ladder](adaptive-queue.md) | algo | reincarnation (also vela) | written |
| [Identity resolution + multi-CSV join](identity-resolution.md) | algo | conductor | written |
| Name enrichment + intelligence scoring | data | baby-namer | stub |
| LoRA style adapter training | algo | vela | stub |
| Financial instrument panel / KPI dashboard | ui | people-analyst | stub |
| Decision wizard (Kepner-Tregoe) | ui | decision-wizard | stub |
| Media asset library + curatorial sequencing | data | vela | stub |
| Psychometric item bank + adaptive sampling | data | reincarnation | stub |
| Research / census + Modal vision analysis | algo | vela | stub |
| Upward feedback collection + aggregation | ui | preference-modeler | stub |
| Strategic priority elicitation | ui | anycomp | stub |
| Metric definition registry + tier classification | data | conductor | stub |
| API specification manifest | integration | (shared) | stub |
| Email safety switch | infra | preference-modeler | stub |

Stubs need their full capability files written — the row above is a placeholder until someone drafts the full doc. Contribute by filing `<slug>.md` using the format at the top of this README.

## Related

- **Patterns** that implement pieces of these capabilities: [`../PATTERNS/MASTER-PATTERNS.md`](../PATTERNS/MASTER-PATTERNS.md)
- **Architecture maps** showing where each capability lives in its origin repo: [`../MAPS/`](../MAPS/)
- **Consolidation plan** — this catalog is the evidence base for deciding which implementation wins when merging clusters: [`../DEVPLANE-MISSION.md`](../DEVPLANE-MISSION.md)
