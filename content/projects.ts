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
    slug: "pa-platform",
    headline: "People Analytics Platform",
    tagline:
      "A hub-and-spoke ecosystem for AI-native HR analytics — twenty production spokes on shared schemas and APIs, composable into packages for both standardized reporting and custom analytical work.",
    audience:
      "Enterprise HR teams that need analytics-grade infrastructure, not dashboards.",
    problem:
      "HR analytics products either trap data in dashboards or silo it across vendors. Cross-cutting concerns — anonymization, metric calculation, segmentation, survey delivery, decision support — get re-implemented per product. The result is brittle, fragmented, expensive, and hostile to combination: each tool is good at its one thing, and useless next to its neighbor.",
    built:
      "A central hub (people-analytics-toolbox) plus a roster of production spokes that work standalone and compose. Each spoke produces a discrete artifact; spokes share data schemas and APIs so they pull into packages addressing real analytical needs without integration tax. Production spokes include Calculus (210+ precomputed HR metrics), Conductor (metadata-grounded SQL/Python codegen), Reincarnation (RID/SID adaptive measurement), AnyComp (compensation OS), VOI Calculator (formal decision-theoretic value-of-information), Pay Factory, Total Rewarder, Job Matching Factory, Persona Factory, Survey Factory, Competency Factory, Business Ideas Factory, Application Designs Factory, Requirements Factory, Publishing Factory, Client Onboarding. Hub layer carries the cross-cutting services — Data Anonymizer (deterministic PII), Survey Respondent, Preference Modeler, Segmentation Studio, Decision Support — that every spoke depends on. Standardized reporting and bespoke analytical work both run through the same substrate; a custom engagement is a new package composed from existing spokes, not a new build.",
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
      "A contemplative platform for fine-art figurative work — adaptive sequencing, museum sourcing, editorial magazine.",
    audience:
      "Adults who want disciplined, taste-driven encounters with figurative art — and the research participants who help calibrate it.",
    problem:
      "Image platforms either flatten taste into engagement metrics or hide behind gatekeepers. Neither produces a reading rhythm. Neither learns from you.",
    built:
      "385 active works pulled from museum APIs (ARTIC, Met, BnF, Smithsonian, Europeana) with full attribution and license discipline. An adaptive player that learns desire and pool composition. A magazine with original fiction and editorial criticism. Stripe membership. A Chrome extension for attribution capture. A derivative pipeline that produces new transformative works under license.",
    novel: [
      "Reincarnation engine: per-user desire scoring with RID/SID adaptive measurement and visual-rhyme sequencing",
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
      "Live at vela.study. Stripe membership in live mode. Magazine publishing weekly. ~1,300 commits since project start.",
    role: "Designer, engineer.",
    commits: "1,300+",
    story:
      "Vela began as a bet that taste compounds when given a substrate. The substrate is the asymmetry: AI holds the survived corpus, humans hold the unsurvived response. Vela is the place where those two meet — careful sourcing on one side, calibrated human signal on the other, and a magazine for the language in between. It is also the reference implementation for an adaptive-authorship platform that future siblings will sit on top of.",
    href: "https://vela.study",
    status: "live",
    screenshots: [
      { src: "/portfolio/vela/landing-desktop-blurred.png", caption: "Landing — magazine + sequences (artwork tiles blurred for portfolio display)" },
      { src: "/portfolio/vela/about-desktop.png", caption: "About — what Vela is for" },
      { src: "/portfolio/vela/writers-desktop.png", caption: "Writers — staff voice infrastructure" },
      { src: "/portfolio/vela/membership-desktop-blurred.png", caption: "Membership — Stripe-backed Member tier (artwork tiles blurred)" },
    ],
  },
];
