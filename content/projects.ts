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
};

export const PROJECTS: Project[] = [
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
      "Reincarnation engine: per-user desire scoring with pool management and visual-rhyme sequencing",
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
    role: "Solo founder, designer, engineer.",
    commits: "1,300+",
    story:
      "Vela began as a bet that taste compounds when given a substrate. The substrate is the asymmetry: AI holds the survived corpus, humans hold the unsurvived response. Vela is the place where those two meet — careful sourcing on one side, calibrated human signal on the other, and a magazine for the language in between. It is also the reference implementation for an adaptive-authorship platform that future siblings will sit on top of.",
    href: "https://vela.study",
    status: "live",
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
    role: "Solo founder, designer, engineer.",
    story:
      "Naming a child is high-stakes and irreversible. Most tools treat it as entertainment. Namesake treats it as a decision — with live signal, acoustic structure, and literary depth — because that is what the decision actually warrants.",
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
      "Replit",
    ],
    outcome:
      "Private. Multi-app monorepo with engine, adapters, magazine, and analytics API in active development.",
    role: "Solo founder, designer, engineer; agent-assisted execution.",
    story:
      "Fourth & Two is the bet that intelligence is more readable when it has a sensibility — a magazine voice on the front, a Monte Carlo engine on the back, and editorial discipline binding them. The platform exists because the middle — analytics with a point of view — was empty.",
    status: "private",
  },

  {
    slug: "nyt-aip",
    headline: "NYT — Audience Intelligence Platform",
    tagline:
      "Built the segmentation and simulation infrastructure behind a multi-million-dollar subscription-revenue model at the New York Times.",
    audience:
      "Internal — NYT subscription strategy and revenue teams.",
    problem:
      "Subscription companies make pricing and segmentation decisions on aggregated dashboards that hide the heterogeneity. The real lift sits inside which segments respond to which interventions, and that signal does not survive aggregation.",
    built:
      "Monte Carlo plus regression-surrogate simulation infrastructure for counterfactual analysis. A multi-segment audience decomposition replacing single-aggregate forecasts. Active Subscription LTV machinery and a hand-off pack of methodology documentation.",
    novel: [
      "Surrogate-model approach for fast counterfactual simulation against a large model",
      "Multi-segment decomposition replacing single-aggregate forecasts",
      "Active Subscription LTV computed at segment granularity",
      "Methodology documentation that survived hand-off and stayed in use",
    ],
    stack: [
      "Python",
      "BigQuery",
      "scikit-learn",
      "statsmodels",
      "Anthropic API",
    ],
    outcome:
      "Revenue model attributed in the year of attribution. Methodology pack delivered and adopted.",
    role: "Embedded analytics consultant via PeopleAnalyst.",
    story:
      "Most subscription analytics rolls up to a single aggregate forecast and stops there. The interesting decisions live one level down — which segment, which intervention, which timing — and they are usually invisible at aggregate. The work was about making that level visible without losing rigor.",
    status: "client",
  },

  {
    slug: "reincarnation",
    headline: "Reincarnation",
    tagline:
      "Adaptive diagnostic survey infrastructure with RID/SID architecture — questions accumulate item-response statistics across studies without confounding.",
    audience:
      "Researchers, organizational psychologists, and product teams that need adaptive measurement at scale.",
    problem:
      "Commercial survey platforms either run studies in silos (no cross-study learning) or pool naively (lose study-level integrity). Neither lets a question's evidence accumulate across studies in a way that adaptive selection can use.",
    built:
      "A multi-study item bank with RID (respondent-ID) and SID (study-ID) separation. Adaptive selection that draws on the full accumulated evidence to choose the next question. Pool management with desire scoring. Vela serves as the live testbed.",
    novel: [
      "Cross-study item-response accumulation without confounding study-level inference",
      "Adaptive selection over the full evidence pool, not just the current study",
      "Lab-instrument framing — the engine is treated as scientific instrumentation, not just product code",
      "12 active research questions running through the same substrate",
    ],
    stack: ["TypeScript", "Postgres", "pgvector", "Anthropic API", "Vercel"],
    outcome:
      "Live inside Vela. Designed as the spine for forthcoming peer-reviewed and dissertation-track research.",
    role: "Solo founder, designer, engineer.",
    story:
      "Adaptive measurement is well understood in psychometrics and almost absent in commercial survey tools. Reincarnation closes that gap, then goes one step further — letting evidence accumulate across studies — so the longer the system runs, the sharper its instrument becomes.",
    status: "private",
  },

  {
    slug: "conductor",
    headline: "Conductor",
    tagline:
      "Natural-language SQL and Python generation grounded in metadata and documented business logic — not example-based prompting.",
    audience:
      "People analytics teams orchestrating BigQuery, One Model imports, and tiered metric recipes.",
    problem:
      "Most AI-for-SQL products see only sample queries. They do not see the schema, the field documentation, or the canonical metric definitions. They generate answers that look right and are not.",
    built:
      "An orchestrator that pipes BigQuery metadata, One Model imports, and documented metric recipes into the model, generates SQL or Python from a natural-language ask, and routes through field mediation for cross-system reconciliation.",
    novel: [
      "Metadata-grounded code generation, not example-grounded",
      "Tiered metric recipes — canonical definitions are first-class inputs",
      "Field mediation for reconciling differently-named fields across systems",
      "Designed as the central data-orchestration spoke for the People Analytics Toolbox",
    ],
    stack: ["Next.js", "TypeScript", "Python", "BigQuery", "Anthropic API"],
    outcome:
      "Private. Deployed as the data-orchestration spoke for the People Analytics Toolbox ecosystem.",
    role: "Solo founder, designer, engineer.",
    story:
      "AI for analytics has mostly been pattern-matching against example queries. The interesting move is the other direction: feed the model the same metadata a careful human would read first — schemas, field semantics, canonical metric definitions — and let it reason from there.",
    status: "private",
  },

  {
    slug: "pa-platform",
    headline: "People Analytics Platform",
    tagline:
      "A hub-and-spoke ecosystem of 14+ TypeScript apps for AI-native HR analytics — measurement, decision science, survey delivery, and a compensation OS.",
    audience:
      "Enterprise HR teams that need analytics-grade infrastructure, not dashboards.",
    problem:
      "HR analytics products either trap data in dashboards or silo it across vendors. Cross-cutting concerns — anonymization, metric calculation, segmentation, survey delivery — get re-implemented per product. The result is brittle, fragmented, and expensive.",
    built:
      "Hub (`people-analytics-toolbox`) and spokes: calculus / metric-engine, conductor, segmentation-studio, survey-respondent, reincarnation, anycomp, voi-calculator, decision-wizard, preference-modeler, data-anonymizer, metric-market, peopleanalyst app. Cross-cutting services consumed by multiple verticals.",
    novel: [
      "Formal VOI (Expected Value of Perfect/Sample Information) is essentially absent in commercial HR tooling — VOI Calculator implements the academic framework as production software",
      "Calculus precomputes and materializes 210+ HR metrics, so manager-level segmentations are instant rather than dashboard-render-blocked",
      "AnyComp treats merit, equity, market-pricing, and total-rewards as one coherent decision surface",
      "Segmentation Studio handles the reality that every enterprise has inconsistent job codes, titles, and leveling",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Python",
      "BigQuery",
      "Postgres",
      "Vercel",
    ],
    outcome:
      "14+ apps live; hub-and-spoke architecture; solo build since 2022. Several spokes deployed at enterprise clients.",
    role: "Solo founder; all roles.",
    story:
      "The platform exists because every HR analytics product I worked with kept re-implementing the same five things — anonymization, metric definitions, segmentation, surveys, decision support — and getting each one slightly wrong. Building them once, well, and letting verticals consume them is the bet.",
    status: "private",
  },
];
