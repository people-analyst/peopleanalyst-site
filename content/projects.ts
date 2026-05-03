export type Screenshot = {
  src: string;
  caption: string;
};

export type Project = {
  slug: string;
  headline: string;
  tagline: string;
  audience: string;
  problem: string;
  built: string;
  novel: string[];
  stack: string[];
  outcome: string;
  role: string;
  commits?: string;
  story: string;
  href?: string;
  status?: "live" | "private" | "client" | "archived";
  screenshots?: Screenshot[];
};

export const PROJECTS: Project[] = [
  {
    slug: "devplane",
    headline: "DevPlane",
    tagline:
      "A cockpit for multi-tool software development — assignment registry, two-phase actor handoff, coordination-event log. The operator-side measurement layer that AI coding tools' agent-side metrics miss.",
    audience:
      "Solo founders and small teams running heterogeneous AI tool ecosystems.",
    problem:
      "AI coding tools' productivity claims rest on agent-side measurements — lines produced, tasks completed, time-to-PR. If the Ironies of Automation are operative — operator vigilance falling as agent reliability rises — those measurements systematically overstate net effect. There is no operator-side cockpit catching the loss.",
    built:
      "A multi-agent kanban with a completion-block protocol that tracks per-card execution across heterogeneous AI tools. Continuous coordination-event log. Two-phase actor handoff (builder → reviewer) where the second transition requires an artifact only the reviewer can produce. Cross-tool sync via a hub SDK so an operator coordinates Cursor, Claude Code, Replit, and other agents through one board. The continuous production telemetry that runs the C1 risk-compensation field study — a pre-registered test of Bainbridge 1983 in real coding work.",
    novel: [
      "Two-phase actor handoff (builder → reviewer) where the second transition requires an artifact only the reviewer can produce — enforces review without trusting it",
      "Coordination-event log as a research instrument, not just an audit trail — the apparatus for the C1 risk-compensation field study",
      "Completion blocks as a protocol — every assignment ends with structured machine-readable completion, not free-text close-out",
      "Hub-and-spoke sync between heterogeneous AI tools so an operator coordinates Cursor + Claude Code + Replit + custom agents through one board",
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "Hono",
      "SQLite",
      "MCP",
      "Server-Sent Events",
    ],
    outcome:
      "Private. The operator-side coordination spine for the multi-app portfolio. Live, measuring, instrumented for the C1 field study.",
    role: "Designer, engineer.",
    story:
      "DevPlane exists because the productivity claims being made for AI coding tools are largely grounded in agent-side measurements — and those measurements systematically miss what an operator running multiple agents actually has to do. The bet: build the operator's cockpit, instrument it, and run a pre-registered field study against the agents-on-tap-make-everyone-faster claim. Either the data validates the claim or it qualifies it; either way it is more honest than what the field has today.",
    status: "private",
    screenshots: [
      { src: "/portfolio/devplane/dashboard-desktop.png", caption: "Dashboard — multi-tool kanban with two-phase actor handoff and per-card execution telemetry" },
    ],
  },

  {
    slug: "fourth-and-two",
    headline: "Fourth & Two",
    tagline:
      "A fantasy football platform with a magazine front and a strategy engine back — SI-style covers, Monte Carlo decisions, weekly LLM-generated newsroom stories.",
    audience:
      "Serious fantasy football players who want analytics-grade decision support, not just projections.",
    problem:
      "Fantasy products are either marketplaces with shallow projections or hardcore stat tools that do not make a case. The middle — readable intelligence with a point of view — is empty.",
    built:
      "A multi-app monorepo: a public newsroom (apps/web), a GM workflow console (gm-console), a strategy portal with cover-art game modes (apps/strategy), and a Python analytics API. Live MFL adapter, projections provider, Monte Carlo strategy engine, weekly LLM-generated stories under editorial discipline.",
    novel: [
      "Newsroom-as-product: weekly LLM-generated stories with editorial structure, briefs, and StoryNumbers",
      "Monte Carlo strategy engine running per-decision (fourth-down, lineup, waivers)",
      "Multi-app monorepo with formal adapter contract for swapping fantasy providers",
      "Magazine-grade cover art system for each game mode (the-pick, the-matchup, survivor, drive-duel, fourth-down-gambit)",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "Postgres",
      "Alembic",
      "Vercel",
    ],
    outcome:
      "Private. Multi-app monorepo with engine, adapters, magazine, and analytics API in active development.",
    role: "Designer, engineer; agent-assisted execution.",
    story:
      "Fourth & Two is the bet that intelligence is more readable when it has a sensibility — a magazine voice on the front, a Monte Carlo engine on the back, and editorial discipline binding them. The platform exists because the middle — analytics with a point of view — was empty.",
    status: "private",
    screenshots: [
      { src: "/portfolio/fourth-and-two/magazine-landing-desktop.png", caption: "Magazine landing — newsroom front and editorial entry point" },
      { src: "/portfolio/fourth-and-two/league-desktop.png", caption: "League — roster, standings, and GM Console workflow entry" },
      { src: "/portfolio/fourth-and-two/strategy-desktop.png", caption: "Strategy — Monte Carlo decision support across lineup and roster moves" },
      { src: "/portfolio/fourth-and-two/draft-sandbox-desktop.png", caption: "Draft Day — fantasy draft application (snake sandbox), cover art and live picks" },
      { src: "/portfolio/fourth-and-two/waivers-desktop.png", caption: "Waivers — claim queue with strategy-engine-backed recommendations" },
      { src: "/portfolio/fourth-and-two/rankings-desktop.png", caption: "Rankings — internal projection and ranking system underneath the engine" },
      { src: "/portfolio/fourth-and-two/analytics-desktop.png", caption: "4th & 2 Analytics — Monte Carlo strategy sandbox" },
      { src: "/portfolio/fourth-and-two/game-center-desktop.png", caption: "Game Center — The Pick, Survivor, and the cover-art game roster" },
    ],
  },

  {
    slug: "namesake",
    headline: "Namesake",
    tagline:
      "Intentional baby naming, instrumented — live trend frequency, sibling-set acoustic checks, narrative association from a curated literary corpus.",
    audience:
      "Expecting parents who want something more thoughtful than a top-100 listicle.",
    problem:
      "Most baby-naming tools are SEO listicles. They cannot tell you whether a name is rising or fading this month, whether it sounds right next to your other kids, or what its narrative texture actually is.",
    built:
      "A naming tool that pulls live trend data, scores phonetic and sibling fit, and surfaces narrative associations from a literary corpus. A calibration loop that learns parent preferences over the session.",
    novel: [
      "Live trend frequency from external data sources, not stale annual rankings",
      "Sibling-set acoustic checks (rhyme, stress, syllable count, ending overlap)",
      "Narrative association layer pulled from curated literary references",
      "Within-session preference calibration so the tool gets sharper as parents use it",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "BigQuery",
      "Anthropic API",
      "Vercel",
    ],
    outcome:
      "Private beta. Decision tool for one of the highest-stakes irreversible decisions parents make.",
    role: "Designer, engineer.",
    story:
      "Naming a child is high-stakes and irreversible. Most tools treat it as entertainment. Namesake treats it as a decision — with live signal, acoustic structure, and literary depth — because that is what the decision actually warrants.",
    status: "live",
    href: "https://namesake.baby",
    screenshots: [
      { src: "/portfolio/namesake/landing-desktop.png", caption: "Landing" },
      { src: "/portfolio/namesake/name-wizard-desktop.png", caption: "Name Wizard — guided 20-min selection" },
      { src: "/portfolio/namesake/names-index-desktop.png", caption: "Names index — 47K names with SSA history" },
      { src: "/portfolio/namesake/name-profile-desktop.png", caption: "Name profile — AI intelligence with citation chains" },
      { src: "/portfolio/namesake/collections-desktop.png", caption: "Collections" },
    ],
  },

  {
    slug: "vela",
    headline: "Vela",
    tagline:
      "A contemplative platform that began with fine-art figurative work and has broadened into an adaptive-authorship substrate — magazine paced per-reader, Editorial Office of staff voices, Penwright in /labs, and three editorial axes (figurative response · emotion architecture · developmental theology).",
    audience:
      "Adults who want disciplined, taste-driven encounters — figurative art on one hand, longform editorial work on the other — and the research participants who help calibrate the underlying instruments.",
    problem:
      "Image platforms either flatten taste into engagement metrics or hide behind gatekeepers. Editorial platforms publish on calendars rather than to readers. Neither produces a reading rhythm. Neither learns from you. Vela is built on the bet that a single substrate can do both — taste-driven figurative discovery and longform editorial work — when adaptive measurement runs underneath.",
    built:
      "385 active works pulled from museum APIs (ARTIC, Met, BnF, Smithsonian, Europeana) with full attribution and license discipline. An adaptive player (Reincarnation engine) that learns desire and pool composition across visual rhyme and emotional register. A magazine with original fiction, editorial criticism, and three load-bearing editorial axes — figurative response, emotion architecture, and developmental theology — paced per-user (each reader's magazine begins when they arrive, not on a calendar). Penwright: authorship system in /labs/penwright (F-03 Authorship Packet UI MVP shipped; F-19 Adaptive Authorship Control Kernel is the spine — see Penwright card below). Editorial Office: Writer's Desk (1:1 chat with each writer) and The Office (multi-writer convening with round-2 react). Stripe membership. Chrome extension for attribution capture. Derivative pipeline that produces new transformative works under license.",
    novel: [
      "Reincarnation engine: per-user desire scoring with RID/SID adaptive measurement and visual-rhyme sequencing",
      "Per-user magazine pacing — each reader's editorial schedule begins when they arrive; positioning wedge is \"your magazine begins when you do\"",
      "Three editorial axes (figurative response · emotion architecture · developmental theology) coexist on a single substrate; emotion is now the core editorial axis (post the 2026-04-30 pivot)",
      "Editorial Office — Writer's Desk + multi-writer convening turns the writer roster from production tool into colleagues",
      "Pill paradigm: 80 admin pages collapsed into ~7 named flows, each a typed pill expression",
      "Adaptive authorship platform underneath — Vela is property #1; siblings reuse the substrate",
      "Museum-grade attribution and license discipline as a first-class feature, not a footnote",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind 4",
      "TypeScript",
      "Supabase",
      "pgvector",
      "Vercel",
      "Modal",
      "Anthropic API",
      "Stripe",
      "Playwright",
    ],
    outcome:
      "Live at vela.study. Stripe membership in live mode. Magazine publishing weekly. ~1,300 commits since project start. Penwright in early build inside the same repo; Editorial Office and per-user magazine pacing in active development.",
    role: "Designer, engineer.",
    commits: "1,300+",
    story:
      "Vela began as a bet that taste compounds when given a substrate. The substrate is the asymmetry: AI holds the survived corpus, humans hold the unsurvived response. Vela is the place where those two meet — careful sourcing on one side, calibrated human signal on the other, and a magazine for the language in between. The bet has broadened: the same substrate now hosts Penwright (authorship system in /labs), the Editorial Office (writer collaboration), per-user magazine pacing, and three editorial axes that coexist without collapsing. It is also the reference implementation for an adaptive-authorship platform that future siblings will sit on top of.",
    href: "https://vela.study",
    status: "live",
    screenshots: [
      { src: "/portfolio/vela/landing-desktop-blurred.png", caption: "Landing — magazine + sequences (artwork tiles blurred for portfolio display)" },
      { src: "/portfolio/vela/about-desktop.png", caption: "About — what Vela is for" },
      { src: "/portfolio/vela/writers-desktop.png", caption: "Writers — staff voice infrastructure" },
      { src: "/portfolio/vela/membership-desktop-blurred.png", caption: "Membership — Stripe-backed Member tier (artwork tiles blurred)" },
    ],
  },

  {
    slug: "penwright",
    headline: "Penwright",
    tagline:
      "An AI-augmented authorship system — corpus control, packet-shaped composition, and a measurement framework that asks whether the writer is better without it in six months.",
    audience:
      "Memoirists, essayists, and editorial writers who would rather become more capable than write faster.",
    problem:
      "Most AI writing tools optimize for output fluency. They make it easier to produce something faster — and that something is often shaped by the model rather than the writer. The longer-term cost (capability erosion, voice flattening, sycophancy spirals, source attribution buried) is barely measured because the field measures what is easy to measure. The result is a generation of tools that look like assistants and act like substitutes.",
    built:
      "An authorship environment that inverts the prompt-then-edit pattern. Writers assemble Authorship Packets — intent · structure · key ideas · relevant passages · counterpositions — before the AI is invoked. Corpus selection is explicit: writers choose which sources influence the work rather than inheriting the model's training distribution. The Adaptive Authorship Control Kernel (F-19) is the spine — central registry of skill measurement, intervention, and genre-aware behavior (memoir / nonfiction / fiction never collapsed). The Penwright Measurement Framework — six skill dimensions, six derived indices, three measurement layers, five-step learning loop, and four non-negotiable failure modes — determines whether a session made the writer better. Lives inside Vela's repo (app/labs/penwright/) for now; graduates when the design stabilizes.",
    novel: [
      "Authorship Packet Model — replaces freeform prompting with structured input units; the structure itself is data",
      "Corpus Control Layer — writer selects sources rather than inheriting the LLM's training distribution",
      "Adaptive Authorship Control Kernel (F-19) — central registry of measurement and intervention; genre-aware behavior forks copy + schema enums + prompts + metrics rather than collapsing them",
      "Penwright Measurement Framework — first multi-dimensional measurement system for AI-augmented writing skill development; four non-negotiable failure modes (output-only optimization · over-automation · weak measurement · ignoring genre differences) act as veto",
      "Anti-invention constraint — when a structural rhetorical move requires biographical material the user has not supplied, the tool refuses to render rather than confabulating",
      "Has its own published research program at peopleanalyst.com/research/ai-human-interaction (12-paper Penwright Research Program across three tiers)",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "pgvector",
      "Vercel",
      "Anthropic API",
    ],
    outcome:
      "Early build inside Vela's repo (app/labs/penwright). F-03 (Authorship Packet UI MVP) shipped. F-19 (Adaptive Authorship Control Kernel) is the architectural spine; it ships first or in parallel with the first feature. 19 features (F-01..F-19) sequenced across 6 implementation waves; 79 ASNs in flight.",
    role: "Designer, engineer.",
    story:
      "Penwright exists because the field of AI writing is being measured by output and not by capability. The longitudinal test — better writer without Penwright in six months — is unfashionable but load-bearing. The alternative bet — better outputs faster, optimization toward fluency — is the bet most of the field has already taken. Penwright is the bet on the other side: that writers can become more capable inside an AI-augmented environment, and that this can be measured rigorously enough to fail on its own terms. Seven non-negotiable rules in §7 of the vision doc act as the spine for every product decision (don't build generic AI writing features · don't collapse genre distinctions · don't hide source attribution · don't flatten emotional nuance · don't optimize for speed over authorship · don't make AI compliant · don't over-moralize).",
    status: "private",
  },

  {
    slug: "performix",
    headline: "Performix",
    tagline:
      "Enterprise performance data analytics — sister vertical to the People Analytics Platform, and the first non-Vela consumer of the dual-grade research-ingest pattern being lifted into shared infrastructure.",
    audience:
      "Enterprise organizations that need performance-data analytics under the same architectural discipline as the broader People Analytics Platform — but with a vertical product surface rather than a hub-and-spoke composition.",
    problem:
      "Performance data — review cycles, calibration, distribution shape, multi-rater dynamics — is among the densest, most consequential, and most poorly-instrumented data in any organization. Most products either treat it as a transaction record (HRIS posture) or as a dashboard (BI posture). Neither captures the analytical posture the data actually warrants — comparative, longitudinal, distribution-aware, decision-support-shaped.",
    built:
      "Early build. The architectural bet: Performix is the first instance of the library-core multi-property pattern outside Vela — proving that the research-ingest, dual-grade corpus, and adaptive-measurement substrate ports cleanly to a non-Vela vertical brand. Currently a placeholder repo; substance arrives as the research-ingest extraction (from Vela into MetaFactory's packages/research-ingest/) lands and Performix becomes its first consumer. The Research Ingestion paradigm rollout (ASN-1000+) is the cross-fleet sequencing.",
    novel: [
      "First non-Vela consumer of the dual-grade research-ingest pipeline — a real port test of the library-core substrate",
      "First test of the library-core multi-property pattern outside Vela — if patterns transfer, the cross-property substrate is real; if they don't, the substrate has to be re-thought",
      "Vertical-product surface against the same architectural substrate as the broader People Analytics Platform",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "Supabase",
      "pgvector",
      "Vercel",
      "Anthropic API",
    ],
    outcome:
      "Early build. Repo seeded; substance gated on the research-ingest extraction landing in MetaFactory.",
    role: "Designer, engineer.",
    story:
      "Performix is the test of the cross-property pattern. If the library-core substrate (dual-grade ingestion, adaptive measurement, the canonical-vocabulary discipline) ports cleanly from Vela into a vertical that shares no editorial subject matter, the architecture is real. If it doesn't, the substrate is Vela-specific and the multi-property bet has to be re-thought. Either result is informative.",
    status: "private",
  },

  {
    slug: "meta-factory",
    headline: "MetaFactory",
    tagline:
      "A focused production-factory monorepo — book ingestion, job/competency/persona/survey factories, and the dual-grade research-ingest pipeline shared across the portfolio.",
    audience:
      "The portfolio itself. MetaFactory is internal infrastructure consumed by Vela, Performix, the People Analytics Platform, and others.",
    problem:
      "Cross-cutting infrastructure — book ingestion at chapter-respecting fidelity, schema-conformant typed extraction, job/competency/persona generation, survey factories — gets re-implemented per consumer when there is no production-factory substrate. The half-renovated state is worse than either decision: a 'Universal Information Factory' framing that tried to do too much, the resulting analytics-vs-production drift, and a multi-hundred-file cleanup-doc midden in the repo root that documents an effort that did not land. The substrate has to be narrowed and its purpose made legible in 30 seconds.",
    built:
      "A monorepo of production factories — book ingestion (collector / organizer / referee), job-matching, competency, personas, surveys, pay, business-plan, variableizer — plus core infrastructure (asset registry, storage resolver, schemas, prompts, deep-research agent). Currently undergoing the consolidation drive (ASN-1003): KEEP/DROP rule fully executed (production factories KEEP; analytics offerings DROP); the dual-grade research-ingest pipeline migrated in from Vela; the cleanup-doc midden archived; CLAUDE.md / AGENTS.md / README rewritten to actual current state.",
    novel: [
      "Production-factory architecture — every package outputs an artifact; analytics offerings explicitly excluded",
      "Dual-grade corpus ingestion — same database holds editorially-selected curator passages and bulk research chunks, distinguished by tag",
      "Cryptographic provenance contract — SHA-256 tracked for every source file; safe-delete invariants require hash verification on backup and durable storage before any local delete",
      "~$0.13 per research-run synthesis at 30K+ passage scale — most 'AI research' tools run 10–100× more expensive because they retrieve without pattern extraction",
      "Schema-extracted measurement vocabulary (@measurement/core) shared across consumers — Principia, the People Analytics Platform, and the toolbox/hub all subscribe rather than reinventing constructs / instruments / items / measures / effect-sizes",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "Supabase",
      "pgvector",
      "OpenAI embeddings",
      "Anthropic API",
      "Vercel",
    ],
    outcome:
      "Private. Five-track consolidation in flight (audit · pruning · production-factory finalization · research-ingest migration · consumer rewiring). Eight sub-ASNs (ASN-1004..ASN-1011) under the parent (ASN-1003).",
    role: "Designer, engineer.",
    story:
      "MetaFactory exists because cross-portfolio infrastructure can't be re-built per consumer and can't sit half-renovated forever. The narrowing decision is made — production over analytics — and what's outstanding is executing the cuts, finalizing what remains, and lifting Vela's research-ingest pipeline back in (because Vela built dual-grade ingestion when MetaFactory's API-based approach lost fidelity, and that pipeline now belongs in the substrate). The interesting bet is whether a focused production-factory substrate compounds across consumers fast enough to justify the consolidation cost.",
    status: "private",
  },

  {
    slug: "pa-platform",
    headline: "People Analytics Platform",
    tagline:
      "A hub-and-spoke ecosystem for AI-native people analytics — production spokes on shared schemas and APIs, composable into packages for both standard data warehouse reporting and custom data science.",
    audience:
      "Enterprise HR teams that need analytics-grade infrastructure, not dashboards.",
    problem:
      "HR analytics products either trap data in dashboards or silo it across vendors. Cross-cutting concerns — anonymization, metric calculation, segmentation, survey delivery, decision support — get re-implemented per product. The result is brittle, fragmented, expensive, and hostile to combination: each tool is good at its one thing, and useless next to its neighbor.",
    built:
      "A central hub (people-analytics-toolbox) plus a roster of production spokes that work standalone and compose. Each spoke produces a discrete artifact; spokes share data schemas and APIs so they pull into packages addressing real analytical needs without integration tax. Public-facing spokes include Calculus (210+ precomputed HR metrics), Conductor (metadata-grounded SQL/Python codegen), Reincarnation (RID/SID adaptive measurement), AnyComp (compensation OS), VOI Calculator (formal decision-theoretic value-of-information), Persona Factory, Survey Factory, and Competency Factory — alongside additional internal production spokes that power packages but stay back-end. Hub layer carries the cross-cutting services — Data Anonymizer (deterministic PII), Survey Engine, Preference Modeler, Segmentation Studio, Decision Support — that every spoke depends on. Standardized reporting and bespoke analytical work both run through the same substrate; a custom engagement is a new package composed from existing spokes, not a new build.",
    novel: [
      "Compartmentalable packages on shared data schemas and APIs — every spoke speaks the same anonymization, metric, segmentation, and survey vocabulary, so spokes compose without integration tax (the architectural conviction underneath the rest)",
      "Reincarnation: cross-study item-response accumulation without confounding — adaptive selection over the full evidence pool, not just the current study",
      "Conductor: metadata-grounded SQL/Python generation (not example-grounded) — the model sees schema, field semantics, and canonical metric definitions",
      "Calculus: precomputed metric materialization so manager-level segmentations are instant rather than dashboard-render-blocked",
      "VOI Calculator: formal Expected Value of Perfect/Sample Information as production software — essentially absent in commercial HR tooling",
      "AnyComp: compensation as one coherent decision surface, not four disconnected screens",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Python",
      "BigQuery",
      "Postgres",
      "pgvector",
      "Vercel",
      "Anthropic API",
    ],
    outcome:
      "Hub plus 20 production spokes plus the cross-cutting hub services. Solo build since 2022. Several spokes deployed at enterprise clients; the platform composition powers both off-the-shelf reporting and bespoke analytical packages.",
    role: "All roles.",
    story:
      "The platform exists because every HR analytics product I worked with kept re-implementing the same five things — anonymization, metric definitions, segmentation, surveys, decision support — and getting each one slightly wrong. Building them once, well, and letting verticals consume them is the bet. Standardization where it earns its keep; custom analytical assembly where it earns its keep; the same substrate underneath both. The architecture is what makes a single founder productive at this scale.",
    status: "private",
  },
];
