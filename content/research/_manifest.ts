import type { CategoryId, AudienceTier } from "./_taxonomy";
import type { ArcId } from "./_arcs";

export type ProductId =
  | "vela"
  | "namesake"
  | "fourth-and-two"
  | "pa-platform"
  | "devplane"
  | "principia"
  | "ai-human-interaction";

export type ManifestEntry = {
  product: ProductId;
  category: CategoryId;
  slug: string;
  title: string;
  summary?: string;
  audienceTier?: AudienceTier;
  initiative?: string;
  /**
   * Research-arc tags. Multi-arc; an entry can sit under more than one. Entries
   * with no arc tag (engineering critiques, pipeline-status, raw bibliographies)
   * stay accessible via the per-product surface but do not surface on the
   * arc-organized /research index.
   */
  arcs?: ArcId[];
  source?: {
    repo: string;
    path: string;
  };
  status: "live" | "forthcoming";
};

export type ProductMeta = {
  id: ProductId;
  label: string;
  blurb: string;
  href?: string;
  whyItMatters: string;
  featuredEntrySlug?: string;
};

export const PRODUCT_META: Record<ProductId, ProductMeta> = {
  vela: {
    id: "vela",
    label: "Vela",
    blurb:
      "A contemplative platform for fine-art figurative work. Research probes desire dimensions, compositional features, temporal dynamics, and individual differences — with a deliberately rigorous bibliography and preregistered protocols.",
    href: "https://vela.study",
    whyItMatters:
      "On its surface, Vela's research is figurative-art response. Underneath, it is an instrument: how does desire — move-toward — separate from preference (like)? How do compositional features mediate response? How stable are individual differences? The methods generalize. They speak to consumer-behavior research, aesthetic measurement methodology, taste calibration in any high-volume domain, and the design of adaptive measurement instruments well outside HR. The corpus is fine art; the questions are general.",
    featuredEntrySlug: "public-introduction",
  },
  namesake: {
    id: "namesake",
    label: "Namesake",
    blurb:
      "Intentional baby naming. Research is an empirical investigation of cultural diffusion: how names break out, what predicts spread, and where the predictability ceiling lives.",
    href: "https://namesake.baby",
    whyItMatters:
      "Naming is the obvious-seeming domain. The research underneath it is cultural diffusion — how cultural objects spread, what predicts breakouts, and where the predictability ceiling lives. Findings extrapolate beyond names: how marketing campaigns succeed or fail, how misinformation propagates, how innovations diffuse through organizations, why fashion cycles look the way they do, what separates lasting public discourse from brief virality. Names are the testbed because the corpus is dense and the temporal signal is clean. The implications travel.",
    featuredEntrySlug: "general-audience-explainer",
  },
  "fourth-and-two": {
    id: "fourth-and-two",
    label: "Fourth & Two",
    blurb:
      "Fantasy football intelligence. Research arc forthcoming — likely decisions-under-uncertainty in fantasy and off-season game design as revenue innovation.",
    whyItMatters:
      "Forthcoming. Anticipated frame: decisions under uncertainty in fantasy extrapolate to executive compensation modeling, medical-decision support, capital allocation, and public-policy tradeoffs — any domain where Monte Carlo plus structured information design beats single-point estimates. The off-season game design thread is itself a study in how to extend a niche industry's revenue cycle.",
  },
  "pa-platform": {
    id: "pa-platform",
    label: "People Analytics Platform",
    blurb:
      "Hub-and-spoke ecosystem for AI-native HR analytics. Research arc forthcoming — likely the principal-issues thesis, hub-and-spoke as moat, and RID/SID adaptive measurement.",
    whyItMatters:
      "The principal-issues thesis is the spine. It says every domain has a load-bearing measurement set, and most domains are stuck because they have not named it. People analytics is the demonstration; the same logic applies to any field where rigorous measurement is unevenly distributed across organizations. The platform is built to make load-bearing-set delivery executable at solo cadence — which is the operating-system claim underneath every other portfolio item.",
  },
  devplane: {
    id: "devplane",
    label: "DevPlane",
    blurb:
      "A cockpit for multi-tool software development. Research is an empirical program on coordination cost in heterogeneous AI tool ecosystems — using DevPlane's continuous production telemetry as the apparatus, not the subject. Lead study: a pre-registered field test of risk compensation in human-AI coordination.",
    whyItMatters:
      "The productivity claims being made for AI coding tools are largely grounded in agent-side measurements — lines produced, tasks completed, time-to-PR. If the Ironies of Automation (Bainbridge 1983) are operative — operator vigilance falling as agent reliability rises — those measurements systematically overstate net effect. The DevPlane research program tests that prediction with continuous production telemetry on a real operator running real agents on a real, multi-month codebase. The methodology generalizes: any team running heterogeneous tools through a coordination layer (multi-tool ops dashboards, hospital handoff systems, distributed scientific instruments) shares the same shape of problem.",
    featuredEntrySlug: "overview",
  },
  principia: {
    id: "principia",
    label: "Principia",
    blurb:
      "A source-graded survey of organizational measurement — predominantly the people side. Codifies constructs, instruments, items, measures, and meta-analytic effect-size tables into a queryable registry shared across the People Analytics Platform.",
    whyItMatters:
      "Load-bearing organizational measurement is unevenly distributed across organizations and disciplines. The same construct gets measured five different ways across five different studies; effect-size tables live scattered through chapters of textbooks; high-quality instruments get reinvented in low-quality form because the original is paywalled or buried. Principia exists to give builders, researchers, and operators a single graded, sourced, queryable place to look — and to give the People Analytics Platform a canonical measurement vocabulary it can subscribe to. The methodology generalizes: source grading, statistical-metadata extraction into a shared schema, novelty verification before publication, queryable indexing — the same shape works for clinical psychology, educational measurement, marketing research, or any field where rigorous measurement is unevenly distributed.",
    featuredEntrySlug: "overview",
  },
  "ai-human-interaction": {
    id: "ai-human-interaction",
    label: "AI–Human Interaction",
    blurb:
      "A research program on what AI does to human capability over time, and what kinds of system design support development rather than dependence. Penwright — an authorship-development system shipped inside Vela — is the lead empirical apparatus; the broader frame extends to AI as a long-term cognitive partner across professions, domains, and life stages.",
    whyItMatters:
      "Existing AI–human-interaction research clusters in single-session, individual-level, descriptive studies. We know remarkably little about what happens to a person's reasoning, vocabulary, social life, or skill acquisition over months and years of daily interaction with capable AI systems. If the Ironies of Automation generalize — operator vigilance falling as system reliability rises — then the productivity story being told today systematically overstates net effect. The portable contribution: a measurement framework for AI-augmented capability development with explicit failure modes, a pre-registered twelve-paper empirical program, and a theoretical bridge between mainstream HAI and the bodies of theory it has under-engaged (companion-species studies, cognitive apprenticeship, working-alliance theory, distributed cognition, niche construction, transactive memory, ritual studies, indigenous relational ontologies). The methods generalize beyond writing — to coding, design, research, education, and clinical practice.",
    featuredEntrySlug: "penwright-paper-01-public",
  },
};

const VELA_REPO = "people-analyst/vela";
const NAMESAKE_REPO = "people-analyst/baby-namer";
const DEVPLANE_REPO = "people-analyst/devplane";
const PRINCIPIA_REPO = "people-analyst/principia";

export const MANIFEST: ManifestEntry[] = [
  // ===== VELA =====
  {
    product: "vela",
    category: "overview",
    slug: "research-program",
    title: "The Vela research program",
    summary:
      "What Vela's research program is, what threads it runs, where its methods generalize, and how to read further. The outside-reader one-pager — distinct from the internal twelve-RQ program plan.",
    source: { repo: VELA_REPO, path: "docs/research/OVERVIEW.md" },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "methodology",
    slug: "methodology",
    title: "Methodology",
    summary:
      "Adaptive measurement, dual-grade corpus ingestion, RID/SID architecture, and the standards reports inherit.",
    source: { repo: VELA_REPO, path: "docs/research/methodology.md" },
    arcs: ["adaptive-measurement", "aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "methodology",
    slug: "multi-faceted-vs-dual-grade",
    title: "Multi-faceted vs. dual-grade ingestion",
    summary:
      "Methodological note on the Vela ingestion architecture — when to favor the dual-grade pattern, when multi-faceted extraction wins.",
    source: { repo: VELA_REPO, path: "docs/research/multi-faceted-vs-dual-grade.md" },
    arcs: ["adaptive-measurement"],
    status: "live",
  },

  // Vela reports — RQ briefs + thread-level literature reviews + research notes
  {
    product: "vela",
    category: "reports",
    slug: "rq1-desire-vs-preference",
    title: "RQ1 — Desire vs. preference",
    summary:
      "What separates desire (move-toward) from preference (like) in figurative response.",
    initiative: "rq-program",
    source: { repo: VELA_REPO, path: "docs/research/papers/rq1-desire-vs-preference.md" },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "rq2-compositional-features",
    title: "RQ2 — Compositional features",
    summary: "Which compositional features mediate response, and how do they interact.",
    initiative: "rq-program",
    source: { repo: VELA_REPO, path: "docs/research/papers/rq2-compositional-features.md" },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "rq3-temporal-dynamics",
    title: "RQ3 — Temporal dynamics",
    summary: "How desire moves over a session and across sessions.",
    initiative: "rq-program",
    source: { repo: VELA_REPO, path: "docs/research/papers/rq3-temporal-dynamics.md" },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "rq4-individual-differences",
    title: "RQ4 — Individual differences",
    summary: "Which dimensions of variance separate participants and how stable they are.",
    initiative: "rq-program",
    source: { repo: VELA_REPO, path: "docs/research/papers/rq4-individual-differences.md" },
    arcs: ["aesthetic-response", "adaptive-measurement"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "literature-review",
    title: "Literature review (cross-thread)",
    summary: "Field positioning across the desire / aesthetic / measurement literature.",
    initiative: "rq-program",
    source: { repo: VELA_REPO, path: "docs/research/papers/literature-review.md" },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "desire-index-vol1-analysis",
    title: "Desire Index — Vol. 1 analysis",
    summary: "First-volume analysis of the desire-index instrument.",
    initiative: "rq-program",
    source: { repo: VELA_REPO, path: "docs/research/desire-index-vol1-analysis.md" },
    arcs: ["aesthetic-response", "adaptive-measurement"],
    status: "live",
  },
  // Christianity / sex / shame thread
  {
    product: "vela",
    category: "reports",
    slug: "christianity-sex-shame-literature-review",
    title: "Christianity, sex, and shame — literature review",
    summary: "Literature review for the Christianity / sex / shame thread.",
    initiative: "christianity-sex-shame",
    source: {
      repo: VELA_REPO,
      path: "docs/research/papers/christianity-sex-shame-literature-review.md",
    },
    arcs: ["religion-morality"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "christianity-sex-hangup",
    title: "The Christianity sex hangup",
    summary: "A research note synthesizing the historical case.",
    initiative: "christianity-sex-shame",
    source: { repo: VELA_REPO, path: "docs/research/2026-04-23-christianity-sex-hangup.md" },
    arcs: ["religion-morality"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "christianity-reinterpretation-pattern",
    title: "Christianity — reinterpretation pattern",
    summary: "How the tradition reads itself across centuries.",
    initiative: "christianity-sex-shame",
    source: {
      repo: VELA_REPO,
      path: "docs/research/2026-04-23-christianity-reinterpretation-pattern.md",
    },
    arcs: ["religion-morality"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "augustine-across-his-works",
    title: "Augustine across his works",
    summary: "An across-the-corpus reading of Augustine on the body, sex, and shame.",
    initiative: "christianity-sex-shame",
    source: {
      repo: VELA_REPO,
      path: "docs/research/2026-04-23-augustine-across-his-works.md",
    },
    arcs: ["religion-morality"],
    status: "live",
  },
  // Text-aesthetic thread
  {
    product: "vela",
    category: "reports",
    slug: "text-aesthetic-literature-review",
    title: "Text-aesthetic literature review",
    summary: "Literature review for the text-aesthetic thread.",
    initiative: "text-aesthetic",
    source: {
      repo: VELA_REPO,
      path: "docs/research/papers/text-aesthetic-literature-review.md",
    },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  // Boudoir Studios Program — full initiative
  {
    product: "vela",
    category: "reports",
    slug: "boudoir-studios-program-proposal",
    title: "Boudoir Studios Program — research proposal",
    summary: "Program proposal for the Boudoir Studios research initiative.",
    initiative: "boudoir-studios",
    source: {
      repo: VELA_REPO,
      path: "docs/research/boudoir-studios-program/00-research-proposal.md",
    },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "boudoir-studios-program-literature-review",
    title: "Boudoir Studios Program — literature review",
    initiative: "boudoir-studios",
    source: {
      repo: VELA_REPO,
      path: "docs/research/boudoir-studios-program/01-literature-review.md",
    },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "boudoir-studios-program-paper-outlines",
    title: "Boudoir Studios Program — paper outlines",
    initiative: "boudoir-studios",
    source: {
      repo: VELA_REPO,
      path: "docs/research/boudoir-studios-program/02-paper-outlines.md",
    },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "boudoir-studios-program-methodology",
    title: "Boudoir Studios Program — methodology",
    initiative: "boudoir-studios",
    source: {
      repo: VELA_REPO,
      path: "docs/research/boudoir-studios-program/03-methodology.md",
    },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  // Artist studies methods
  {
    product: "vela",
    category: "reports",
    slug: "warhol-methods",
    title: "Warhol — methods",
    summary: "Methodological notes for the Warhol artist study.",
    initiative: "artist-studies",
    source: { repo: VELA_REPO, path: "docs/research/warhol-methods.md" },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "klimt-methods",
    title: "Klimt — methods",
    initiative: "artist-studies",
    source: { repo: VELA_REPO, path: "docs/research/klimt-methods.md" },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "schiele-methods",
    title: "Schiele — methods",
    initiative: "artist-studies",
    source: { repo: VELA_REPO, path: "docs/research/schiele-methods.md" },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "sargent-methods",
    title: "Sargent — methods",
    initiative: "artist-studies",
    source: { repo: VELA_REPO, path: "docs/research/sargent-methods.md" },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "emotion-corpus-expansion-2026-04",
    title: "Emotion corpus expansion (2026-04)",
    summary: "Notes on the emotion-corpus expansion plan.",
    source: { repo: VELA_REPO, path: "docs/research/emotion-corpus-expansion-2026-04.md" },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  // Museum diversity-of-beauty thread
  {
    product: "vela",
    category: "reports",
    slug: "museum-diversity-of-beauty-research-questions",
    title: "Museum diversity of beauty — research questions",
    summary:
      "Bootstrap of the thread. Three sub-questions: (a) museum-vs-museum corpus differences, (b) museum vs. its primary serving location, (c) temporal change using artwork creation dates. Analysis of (a) is queued at ASN-981.",
    initiative: "museum-diversity",
    source: {
      repo: VELA_REPO,
      path: "docs/research/papers/museum-diversity-of-beauty-research-questions.md",
    },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "museum-diversity-of-beauty",
    title: "Diversity of beauty across museum collections",
    summary:
      "Cross-museum comparison of how cultural and physical diversity of beauty is represented. Three sub-questions: (a) museum-vs-museum corpus differences, (b) museum vs. its primary audience location, (c) how representation has shifted over time using artwork dates. Forthcoming write-up; questions doc is the live entry above.",
    initiative: "museum-diversity",
    arcs: ["aesthetic-response"],
    status: "forthcoming",
  },
  {
    product: "vela",
    category: "bibliography",
    slug: "museum-diversity-literature-map",
    title: "Museum diversity-of-beauty — literature map",
    summary: "Forthcoming — field positioning for the diversity-of-beauty thread.",
    initiative: "museum-diversity",
    arcs: ["aesthetic-response"],
    status: "forthcoming",
  },

  // Vela audience tiers — public introductions are the general-audience tier
  {
    product: "vela",
    category: "audience-tiers",
    slug: "public-introduction",
    title: "Public introduction (cross-thread)",
    summary: "General-audience entry point into the Vela research program.",
    audienceTier: "general-audience",
    source: { repo: VELA_REPO, path: "docs/research/papers/public-introduction.md" },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "audience-tiers",
    slug: "christianity-sex-shame-public-introduction",
    title: "Christianity, sex, and shame — public introduction",
    audienceTier: "general-audience",
    initiative: "christianity-sex-shame",
    source: {
      repo: VELA_REPO,
      path: "docs/research/papers/christianity-sex-shame-public-introduction.md",
    },
    arcs: ["religion-morality"],
    status: "live",
  },
  {
    product: "vela",
    category: "audience-tiers",
    slug: "text-aesthetic-public-introduction",
    title: "Text-aesthetic — public introduction",
    audienceTier: "general-audience",
    initiative: "text-aesthetic",
    source: {
      repo: VELA_REPO,
      path: "docs/research/papers/text-aesthetic-public-introduction.md",
    },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "audience-tiers",
    slug: "peer-review-framing",
    title: "Peer-review framing",
    summary: "Headline findings positioned for academic peer review.",
    audienceTier: "peer-review",
    arcs: ["aesthetic-response"],
    status: "forthcoming",
  },
  {
    product: "vela",
    category: "audience-tiers",
    slug: "engineering-critique",
    title: "Engineering critique",
    summary: "Architecture and instrument design from an engineering reviewer's lens.",
    audienceTier: "engineering",
    status: "forthcoming",
  },
  {
    product: "vela",
    category: "audience-tiers",
    slug: "product-implications",
    title: "Product implications",
    summary: "What the research tells us to build next.",
    audienceTier: "product",
    source: { repo: VELA_REPO, path: "docs/research/reviews/product-implications.md" },
    status: "live",
  },

  // Vela bibliography — literature maps + .bib source files
  {
    product: "vela",
    category: "bibliography",
    slug: "literature-map",
    title: "Literature map (cross-thread)",
    summary: "Map of the field across the major Vela research threads.",
    source: { repo: VELA_REPO, path: "docs/research/literature-map.md" },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "bibliography",
    slug: "bibliography-bibtex",
    title: "Bibliography — BibTeX (cross-thread)",
    summary: "Master bibliography in BibTeX form.",
    source: { repo: VELA_REPO, path: "docs/research/bibliography.bib" },
    status: "live",
  },
  {
    product: "vela",
    category: "bibliography",
    slug: "christianity-sex-shame-literature-map",
    title: "Christianity, sex, and shame — literature map",
    initiative: "christianity-sex-shame",
    source: { repo: VELA_REPO, path: "docs/research/christianity-sex-shame-literature-map.md" },
    arcs: ["religion-morality"],
    status: "live",
  },
  {
    product: "vela",
    category: "bibliography",
    slug: "christianity-sex-shame-bibliography-bibtex",
    title: "Christianity, sex, and shame — BibTeX",
    initiative: "christianity-sex-shame",
    source: { repo: VELA_REPO, path: "docs/research/christianity-sex-shame-bibliography.bib" },
    status: "live",
  },
  {
    product: "vela",
    category: "bibliography",
    slug: "text-aesthetic-literature-map",
    title: "Text-aesthetic literature map",
    initiative: "text-aesthetic",
    source: { repo: VELA_REPO, path: "docs/research/text-aesthetic-literature-map.md" },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "bibliography",
    slug: "text-aesthetic-bibliography-bibtex",
    title: "Text-aesthetic BibTeX",
    initiative: "text-aesthetic",
    source: { repo: VELA_REPO, path: "docs/research/text-aesthetic-bibliography.bib" },
    status: "live",
  },

  // Vela preregistrations + protocols
  {
    product: "vela",
    category: "preregistrations",
    slug: "study-01",
    title: "Study 01 — preregistration",
    summary: "First preregistered Vela study.",
    source: { repo: VELA_REPO, path: "docs/research/preregistrations/study-01.md" },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "preregistrations",
    slug: "theological-coherence-intervention-v0-1",
    title: "Theological-coherence intervention (v0.1)",
    summary: "Protocol for the theological-coherence intervention study.",
    initiative: "christianity-sex-shame",
    source: {
      repo: VELA_REPO,
      path: "docs/research/protocols/theological-coherence-intervention-v0.1.md",
    },
    arcs: ["religion-morality"],
    status: "live",
  },
  {
    product: "vela",
    category: "preregistrations",
    slug: "boudoir-studios-crawl-protocol",
    title: "Boudoir Studios — crawl protocol",
    initiative: "boudoir-studios",
    source: {
      repo: VELA_REPO,
      path: "docs/research/boudoir-studios-program/crawl-protocol.md",
    },
    arcs: ["aesthetic-response"],
    status: "live",
  },
  {
    product: "vela",
    category: "preregistrations",
    slug: "boudoir-studios-inventory-protocol",
    title: "Boudoir Studios — inventory protocol",
    initiative: "boudoir-studios",
    source: {
      repo: VELA_REPO,
      path: "docs/research/boudoir-studios-program/inventory-protocol.md",
    },
    arcs: ["aesthetic-response"],
    status: "live",
  },

  // Vela pipeline
  {
    product: "vela",
    category: "pipeline",
    slug: "thesis-readiness",
    title: "Thesis readiness",
    summary: "Where the research program sits relative to thesis-grade readiness.",
    source: { repo: VELA_REPO, path: "docs/research/THESIS-READINESS.md" },
    status: "live",
  },
  {
    product: "vela",
    category: "pipeline",
    slug: "proposed-studies",
    title: "Proposed studies",
    summary: "Studies queued for design and execution.",
    source: { repo: VELA_REPO, path: "docs/research/proposed-studies.md" },
    status: "live",
  },
  {
    product: "vela",
    category: "pipeline",
    slug: "downstream-strategy-2026-04-24",
    title: "Downstream research strategy (2026-04-24)",
    summary: "How the research program connects to recruitment and publication.",
    source: { repo: VELA_REPO, path: "docs/research/downstream-strategy-2026-04-24.md" },
    status: "live",
  },
  {
    product: "vela",
    category: "pipeline",
    slug: "pipeline-status",
    title: "Pipeline status",
    summary: "Hand-curated snapshot of running / queued / blocked / recently completed / coming soon across the Vela research program.",
    source: { repo: VELA_REPO, path: "docs/research/PIPELINE_STATUS.md" },
    status: "live",
  },

  // ===== NAMESAKE =====
  {
    product: "namesake",
    category: "overview",
    slug: "where-we-are",
    title: "Where we are",
    summary: "Current state of the Namesake research program.",
    source: { repo: NAMESAKE_REPO, path: "docs/research/where-we-are.md" },
    status: "live",
  },
  {
    product: "namesake",
    category: "methodology",
    slug: "methodology",
    title: "Methodology",
    summary:
      "How cultural-diffusion research is conducted at Namesake — instruments, sources, and standards.",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/methodology.md" },
    arcs: ["adaptive-measurement", "cultural-diffusion"],
    status: "live",
  },

  // Namesake reports
  {
    product: "namesake",
    category: "reports",
    slug: "cultural-diffusion",
    title: "Cultural diffusion",
    summary: "Headline cultural-diffusion findings.",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/cultural-diffusion.md" },
    arcs: ["cultural-diffusion"],
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "blockbuster-paradox",
    title: "Blockbuster paradox",
    summary: "Why naming-event blockbusters do not always cause spread.",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/blockbuster_paradox_report.md" },
    arcs: ["cultural-diffusion"],
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "moran-report",
    title: "Moran's I report",
    summary: "Spatial autocorrelation results across the SSA-derived corpus.",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/moran_report.md" },
    arcs: ["cultural-diffusion"],
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "moderation-tests",
    title: "Moderation tests",
    summary: "Moderation analyses across diffusion variables.",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/moderation_tests.md" },
    arcs: ["cultural-diffusion"],
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "phase5-null-model",
    title: "Phase 5 — null model results",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/phase5_null_model_results.md" },
    arcs: ["cultural-diffusion"],
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "phase6-phonetic-spillover",
    title: "Phase 6 — phonetic spillover",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/phase6_phonetic_spillover.md" },
    arcs: ["cultural-diffusion"],
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "phase7a-granger-causality",
    title: "Phase 7a — Granger causality",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/phase7a_granger_causality.md" },
    arcs: ["cultural-diffusion"],
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "phase7b-hawkes-fit",
    title: "Phase 7b — Hawkes process fit",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/phase7b_hawkes_fit.md" },
    arcs: ["cultural-diffusion"],
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "phase7c-bass-diffusion",
    title: "Phase 7c — Bass diffusion",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/phase7c_bass_diffusion.md" },
    arcs: ["cultural-diffusion"],
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "predictability-ceiling",
    title: "Predictability ceiling",
    summary: "Where the upper bound of name-spread prediction lives.",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/predictability_ceiling.md" },
    arcs: ["cultural-diffusion"],
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "variance-decomposition",
    title: "Variance decomposition",
    initiative: "cultural-diffusion",
    source: {
      repo: NAMESAKE_REPO,
      path: "docs/research/reports/variance_decomposition_report.md",
    },
    arcs: ["cultural-diffusion"],
    status: "live",
  },

  // Namesake audience tiers — full set
  {
    product: "namesake",
    category: "audience-tiers",
    slug: "general-audience-explainer",
    title: "General-audience explainer",
    summary: "The diffusion findings, written for a general reader.",
    audienceTier: "general-audience",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reviews/general-audience-explainer.md" },
    arcs: ["cultural-diffusion"],
    status: "live",
  },
  {
    product: "namesake",
    category: "audience-tiers",
    slug: "academic-peer-review",
    title: "Academic peer-review framing",
    audienceTier: "peer-review",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reviews/academic-peer-review.md" },
    arcs: ["cultural-diffusion"],
    status: "live",
  },
  {
    product: "namesake",
    category: "audience-tiers",
    slug: "engineering-critique",
    title: "Engineering critique",
    audienceTier: "engineering",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reviews/engineering-critique.md" },
    status: "live",
  },
  {
    product: "namesake",
    category: "audience-tiers",
    slug: "product-implications",
    title: "Product implications",
    audienceTier: "product",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reviews/product-implications.md" },
    status: "live",
  },

  // Namesake bibliography
  {
    product: "namesake",
    category: "bibliography",
    slug: "literature-map",
    title: "Literature map",
    summary: "Field positioning across the cultural-diffusion literature.",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/literature-map.md" },
    arcs: ["cultural-diffusion"],
    status: "live",
  },
  {
    product: "namesake",
    category: "bibliography",
    slug: "bibliography-bibtex",
    title: "Bibliography — BibTeX",
    summary: "Master bibliography in BibTeX form for the cultural-diffusion thread.",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/bibliography.bib" },
    status: "live",
  },

  // Namesake preregistrations
  {
    product: "namesake",
    category: "preregistrations",
    slug: "cultural-diffusion-study-01",
    title: "Cultural Diffusion Study 01 — preregistration",
    summary:
      "v1.0 OSF-style preregistration of the cultural-diffusion studies — H1–H6 confirmatory + H7–H9 exploratory, frozen at commit 4f218f8.",
    initiative: "cultural-diffusion",
    source: {
      repo: NAMESAKE_REPO,
      path: "docs/research/preregistrations/cultural-diffusion-study-01.md",
    },
    arcs: ["cultural-diffusion", "adaptive-measurement"],
    status: "live",
  },

  // Namesake pipeline
  {
    product: "namesake",
    category: "pipeline",
    slug: "pipeline-status",
    title: "Pipeline status",
    source: { repo: NAMESAKE_REPO, path: "docs/research/PIPELINE_STATUS.md" },
    status: "live",
  },

  // ===== FOURTH & TWO — all forthcoming =====
  {
    product: "fourth-and-two",
    category: "overview",
    slug: "research-program",
    title: "The Fourth & Two research program",
    summary: "Forthcoming — research arc to be designed.",
    arcs: ["decision-support"],
    status: "forthcoming",
  },
  {
    product: "fourth-and-two",
    category: "methodology",
    slug: "methodology",
    title: "Methodology",
    arcs: ["decision-support"],
    status: "forthcoming",
  },
  {
    product: "fourth-and-two",
    category: "reports",
    slug: "decisions-under-uncertainty",
    title: "Decisions under uncertainty in fantasy",
    summary: "Anticipated thread — Monte Carlo decision support, principal-issues-set framing.",
    arcs: ["decision-support"],
    status: "forthcoming",
  },
  {
    product: "fourth-and-two",
    category: "reports",
    slug: "off-season-game-design",
    title: "Off-season game design as revenue innovation",
    summary:
      "Anticipated thread — extending an industry's revenue cycle past Week 17 through novel game design.",
    status: "forthcoming",
  },
  {
    product: "fourth-and-two",
    category: "audience-tiers",
    slug: "general-audience",
    title: "General-audience explainer",
    audienceTier: "general-audience",
    arcs: ["decision-support"],
    status: "forthcoming",
  },
  {
    product: "fourth-and-two",
    category: "audience-tiers",
    slug: "peer-review",
    title: "Peer-review framing",
    audienceTier: "peer-review",
    arcs: ["decision-support"],
    status: "forthcoming",
  },
  {
    product: "fourth-and-two",
    category: "audience-tiers",
    slug: "engineering",
    title: "Engineering critique",
    audienceTier: "engineering",
    status: "forthcoming",
  },
  {
    product: "fourth-and-two",
    category: "audience-tiers",
    slug: "product",
    title: "Product implications",
    audienceTier: "product",
    status: "forthcoming",
  },
  {
    product: "fourth-and-two",
    category: "bibliography",
    slug: "literature-map",
    title: "Literature map",
    arcs: ["decision-support"],
    status: "forthcoming",
  },
  {
    product: "fourth-and-two",
    category: "preregistrations",
    slug: "preregistration",
    title: "Preregistration(s)",
    arcs: ["decision-support"],
    status: "forthcoming",
  },
  {
    product: "fourth-and-two",
    category: "pipeline",
    slug: "pipeline-status",
    title: "Pipeline status",
    status: "forthcoming",
  },

  // ===== PA PLATFORM — all forthcoming =====
  {
    product: "pa-platform",
    category: "overview",
    slug: "research-program",
    title: "The People Analytics Platform research program",
    summary: "Forthcoming — research arc to be designed.",
    arcs: ["organizational-measurement"],
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "methodology",
    slug: "methodology",
    title: "Methodology",
    arcs: ["organizational-measurement", "adaptive-measurement"],
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "reports",
    slug: "principal-issues-thesis",
    title: "The principal-issues thesis",
    summary:
      "Anticipated headline thread — load-bearing analytics, the Three A's, NAV, why most companies cannot do people analytics. Draft v3 exists locally and is being prepared for publication.",
    arcs: ["organizational-measurement", "decision-support"],
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "reports",
    slug: "hub-and-spoke-as-moat",
    title: "Hub-and-spoke as moat",
    summary:
      "Anticipated thread — architectural defensibility of a single-author people-analytics platform.",
    arcs: ["organizational-measurement"],
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "reports",
    slug: "rid-sid-adaptive-measurement",
    title: "RID/SID adaptive measurement",
    summary:
      "Anticipated thread — cross-study item-response accumulation without confounding.",
    arcs: ["adaptive-measurement", "organizational-measurement"],
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "audience-tiers",
    slug: "general-audience",
    title: "General-audience explainer",
    audienceTier: "general-audience",
    arcs: ["organizational-measurement"],
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "audience-tiers",
    slug: "peer-review",
    title: "Peer-review framing",
    audienceTier: "peer-review",
    arcs: ["organizational-measurement"],
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "audience-tiers",
    slug: "engineering",
    title: "Engineering critique",
    audienceTier: "engineering",
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "audience-tiers",
    slug: "product",
    title: "Product implications",
    audienceTier: "product",
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "bibliography",
    slug: "literature-map",
    title: "Literature map",
    arcs: ["organizational-measurement"],
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "preregistrations",
    slug: "preregistration",
    title: "Preregistration(s)",
    arcs: ["organizational-measurement"],
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "pipeline",
    slug: "pipeline-status",
    title: "Pipeline status",
    status: "forthcoming",
  },

  // ===== DEVPLANE =====
  {
    product: "devplane",
    category: "overview",
    slug: "overview",
    title: "DevPlane research — overview",
    summary:
      "Coordination cost in heterogeneous AI tool ecosystems. Outside-reader brief on what the program studies, why now, and what it contributes.",
    source: { repo: DEVPLANE_REPO, path: "docs/research/OVERVIEW.md" },
    arcs: ["coordination-cost"],
    status: "live",
  },
  {
    product: "devplane",
    category: "methodology",
    slug: "methodology",
    title: "Methodology",
    summary:
      "Operational discipline (assignment registry, handoff protocol, two-phase actor handoff, shared-index commit, coordination-event log) plus research discipline (pre-registered predictions, falsifiable constructs, acknowledged researcher position, threats-to-validity register).",
    source: { repo: DEVPLANE_REPO, path: "docs/research/methodology.md" },
    arcs: ["coordination-cost"],
    status: "live",
  },
  {
    product: "devplane",
    category: "reports",
    slug: "program",
    title: "Coordination cost in heterogeneous AI tool ecosystems — program",
    summary:
      "The full three-arm research program: Agent↔Agent, Human↔AI, and Interface (the lead arm). C1 — risk compensation in human-AI coordination — is the lead study. Theoretical lineage across cockpit HCI, CSCW, empirical SE, behavioral decision-making, and stigmergic-coordination literatures.",
    source: { repo: DEVPLANE_REPO, path: "docs/research/PROGRAM.md" },
    arcs: ["coordination-cost"],
    status: "live",
  },
  {
    product: "devplane",
    category: "audience-tiers",
    slug: "general-audience",
    title: "General-audience explainer",
    audienceTier: "general-audience",
    arcs: ["coordination-cost"],
    status: "forthcoming",
  },
  {
    product: "devplane",
    category: "audience-tiers",
    slug: "peer-review",
    title: "Peer-review framing",
    audienceTier: "peer-review",
    arcs: ["coordination-cost"],
    status: "forthcoming",
  },
  {
    product: "devplane",
    category: "audience-tiers",
    slug: "engineering",
    title: "Engineering critique",
    audienceTier: "engineering",
    status: "forthcoming",
  },
  {
    product: "devplane",
    category: "audience-tiers",
    slug: "product",
    title: "Product implications",
    audienceTier: "product",
    status: "forthcoming",
  },
  {
    product: "devplane",
    category: "bibliography",
    slug: "literature-review",
    title: "Five-literature review",
    summary:
      "Cockpit/process-control HCI · CSCW · empirical software engineering · behavioral decision-making · multi-agent systems and stigmergic coordination. With explicit confidence flags ([C] canonical, [F] field-level, [DR] open for deep-research expansion).",
    source: { repo: DEVPLANE_REPO, path: "docs/research/LITERATURE-REVIEW.md" },
    arcs: ["coordination-cost"],
    status: "live",
  },
  {
    product: "devplane",
    category: "preregistrations",
    slug: "c1-risk-compensation-proposal",
    title: "C1 — Risk compensation in human-AI coordination (proposal)",
    summary:
      "Formal proposal for the C1 lead study. Pre-registered hypotheses with yes-world / no-world consequences; pre-committed coding rules for failure attribution; Bayesian structural time-series analysis plan; threats-to-validity register. The proposal serves as pre-registration in spirit; formal OSF filing follows once the analysis pipeline is built and a run-in period of data is collected.",
    source: { repo: DEVPLANE_REPO, path: "docs/research/PROPOSAL.md" },
    arcs: ["coordination-cost"],
    status: "live",
  },
  {
    product: "devplane",
    category: "pipeline",
    slug: "pipeline-status",
    title: "Pipeline status",
    summary:
      "Running / queued / blocked / recently completed / coming soon. Honest pre-data-collection snapshot of the C1 risk-compensation field study.",
    source: { repo: DEVPLANE_REPO, path: "docs/research/PIPELINE_STATUS.md" },
    status: "live",
  },
  {
    product: "devplane",
    category: "reports",
    slug: "synthesis-convergence-2026-05-02",
    title: "Feature brainstorm convergence (2026-05-02)",
    summary:
      "Five parallel cluster lenses (coordination, working alliance, trust calibration, governance, identity) synthesized 143 raw features from the AI-research corpus into a Now/Next/Later/Killed slate. Documents the convergence map (which primitives appeared in 3+ clusters) and the decision rule that filed 14 cards into the shipping wave.",
    source: { repo: DEVPLANE_REPO, path: "docs/research/feature-brainstorm-convergence-2026-05-02.md" },
    arcs: ["coordination-cost"],
    status: "live",
  },
  {
    product: "devplane",
    category: "reports",
    slug: "phenomenology-delta-2026-05-02",
    title: "Phenomenology delta — attention-as-duration & skill formation (2026-05-02)",
    summary:
      "Cross-references the post-2010 phenomenology-of-attention literature (Stiegler, Citton, Hayles) and phenomenology-of-skill (Dreyfus, Merleau-Ponty, Heersmink) against the 14-card synthesis slate. Surfaces what the existing measurement set covers (verification load, withdrawal disruption) and what it misses (sustained reasoning duration, situation-disclosing experience, transparency-vs-incorporation). Source for DP-88 (sustained-reasoning window) and DP-91 (phenomenology probe).",
    source: { repo: DEVPLANE_REPO, path: "docs/research/phenomenology-delta-2026-05-02.md" },
    arcs: ["coordination-cost"],
    status: "live",
  },
  {
    product: "devplane",
    category: "reports",
    slug: "cross-application-mapping-2026-05-02",
    title: "Cross-application AI-surface mapping (2026-05-02)",
    summary:
      "Inventory of AI surfaces across vela and meta-factory, mapped to the 14-card synthesis slate. Identifies which devplane primitives port directly to other portfolio apps (origin marker, multi-axis reviewer, sycophancy circuit-breaker) and which require app-specific adaptation. Source document for the cross-repo dispatch wave (DP-93 through DP-96).",
    source: { repo: DEVPLANE_REPO, path: "docs/research/cross-application-mapping-2026-05-02.md" },
    arcs: ["coordination-cost"],
    status: "live",
  },

  // ===== PRINCIPIA =====
  {
    product: "principia",
    category: "overview",
    slug: "overview",
    title: "Principia — overview",
    summary:
      "A source-graded survey of organizational measurement, output as a book + queryable database, rendered from one underlying registry. Outside-reader brief on what it codifies, why now, and how it relates to the rest of the portfolio via @measurement/core.",
    source: { repo: PRINCIPIA_REPO, path: "docs/research/OVERVIEW.md" },
    arcs: ["organizational-measurement", "adaptive-measurement"],
    status: "live",
  },
  {
    product: "principia",
    category: "methodology",
    slug: "methodology",
    title: "Methodology",
    summary:
      "Source selection, source-quality grading rubric (A–D), statistical-metadata extraction protocol, schema discipline against @measurement/core, versioning + snapshots, novelty verification, threats to validity, author position.",
    source: { repo: PRINCIPIA_REPO, path: "docs/research/methodology.md" },
    arcs: ["organizational-measurement", "adaptive-measurement"],
    status: "live",
  },
  {
    product: "principia",
    category: "reports",
    slug: "construct-family-roadmap",
    title: "Construct-family roadmap",
    summary:
      "17 construct families across 4 tiers (foundational · derivative · composite · outcomes), 8 queued for sequencing, 3 parallel threads (surveys · infrastructure · book draft).",
    source: { repo: PRINCIPIA_REPO, path: "docs/research/PROGRAM.md" },
    arcs: ["organizational-measurement"],
    status: "live",
  },
  {
    product: "principia",
    category: "reports",
    slug: "engagement-survey",
    title: "Engagement — construct-family survey",
    summary:
      "First tier-1 family. Densest accumulated literature; serves as the methodology proof-of-method. UWES, Gallup Q12, MEI, JES, plus the Kahn-tradition qualitative work. Blocked on @measurement/core extraction (vela ASN-1013).",
    arcs: ["organizational-measurement"],
    status: "forthcoming",
  },
  {
    product: "principia",
    category: "reports",
    slug: "job-satisfaction-survey",
    title: "Job satisfaction — construct-family survey",
    summary:
      "Tier-1, second in the queue. Long history; classic measurement-model debates (global vs facet; affective vs cognitive). JDI, MSQ, JSS, Brief Index of Affective Job Satisfaction.",
    arcs: ["organizational-measurement"],
    status: "forthcoming",
  },
  {
    product: "principia",
    category: "reports",
    slug: "organizational-commitment-survey",
    title: "Organizational commitment — construct-family survey",
    summary:
      "Tier-1, third. Tripartite measurement model (Allen & Meyer affective / continuance / normative) is canonical and well-tested.",
    arcs: ["organizational-measurement"],
    status: "forthcoming",
  },
  {
    product: "principia",
    category: "audience-tiers",
    slug: "general-audience",
    title: "General-audience explainer",
    summary:
      "Public framing of the survey-as-instrument argument — what builders, practitioners, and researchers can do with a queryable, source-graded measurement registry that they could not do before.",
    audienceTier: "general-audience",
    arcs: ["organizational-measurement"],
    status: "forthcoming",
  },
  {
    product: "principia",
    category: "audience-tiers",
    slug: "peer-review",
    title: "Peer-review framing",
    summary:
      "Positioning against the existing measurement-handbook tradition (Schmitt & Highhouse 2013; Borman et al. 2003) and the meta-analytic synthesis tradition (Hunter & Schmidt 2004; Cooper 2017). What Principia adds, what it does not claim to add.",
    audienceTier: "peer-review",
    arcs: ["organizational-measurement"],
    status: "forthcoming",
  },
  {
    product: "principia",
    category: "audience-tiers",
    slug: "engineering",
    title: "Engineering critique",
    summary:
      "Engineering reviewer's lens — schema discipline, the ETL pipeline, the verification-log infrastructure, the hub-and-spoke @measurement/core story. How the registry is built and where it can fail.",
    audienceTier: "engineering",
    status: "forthcoming",
  },
  {
    product: "principia",
    category: "audience-tiers",
    slug: "product",
    title: "Product implications",
    summary:
      "What the registry tells us to build next — on the People Analytics Platform, on Vela, in the toolbox/hub. Which constructs unlock which platform features once their rows exist.",
    audienceTier: "product",
    status: "forthcoming",
  },
  {
    product: "principia",
    category: "bibliography",
    slug: "literature-map",
    title: "Literature map",
    summary:
      "Three-layer field orientation — measurement theory, construct-specific instrumentation, meta-analytic accumulations. Where Principia sits between layers 2 and 3 as the indexing layer.",
    source: { repo: PRINCIPIA_REPO, path: "docs/research/literature-map.md" },
    arcs: ["organizational-measurement"],
    status: "live",
  },
  {
    product: "principia",
    category: "bibliography",
    slug: "bibliography-bibtex",
    title: "Bibliography — BibTeX",
    summary:
      "28 foundational references — measurement theory, scale construction, meta-analytic methodology, tier-1 construct instrument-development papers, tier-2 derivative-construct anchors. Construct-specific bibliographies live inside each survey document; this file holds the cross-cutting methodology references.",
    source: { repo: PRINCIPIA_REPO, path: "docs/research/bibliography.bib" },
    status: "live",
  },
  {
    product: "principia",
    category: "preregistrations",
    slug: "preregistration",
    title: "Preregistration(s)",
    summary:
      "Synthesis-analytic preregistrations land here as construct-family surveys surface meta-analytic gaps. None filed yet — first will land alongside the engagement survey if a meta-analytic gap appears.",
    arcs: ["organizational-measurement"],
    status: "forthcoming",
  },
  {
    product: "principia",
    category: "pipeline",
    slug: "pipeline-status",
    title: "Pipeline status",
    summary:
      "Honest pre-data snapshot. Schema extraction (ASN-1013) blocks first construct-family survey from completing in canonical-typed form; tier-1 families queued; database build follows extraction.",
    source: { repo: PRINCIPIA_REPO, path: "docs/research/PIPELINE_STATUS.md" },
    status: "live",
  },

  // ===== AI–HUMAN INTERACTION =====
  {
    product: "ai-human-interaction",
    category: "overview",
    slug: "overview",
    title: "AI–Human Interaction — overview",
    summary:
      "What AI does to human capability over time. Penwright is the lead empirical apparatus; the broader frame extends to AI as long-term cognitive partner across professions and domains.",
    arcs: ["capability-development", "coordination-cost"],
    status: "live",
  },
  {
    product: "ai-human-interaction",
    category: "methodology",
    slug: "methodology",
    title: "Methodology",
    summary:
      "Multi-LLM deep-research with synthesis discipline; Penwright production-instrument design; the Penwright Measurement Framework (six skill dimensions, six derived indices, three measurement layers, five-step learning loop) with four non-negotiable failure modes; pre-registered hypotheses; genre-aware analysis required.",
    arcs: ["capability-development", "adaptive-measurement"],
    status: "live",
  },
  {
    product: "ai-human-interaction",
    category: "reports",
    slug: "program",
    title: "The twelve-paper Penwright Research Program plus six cross-cutting programs",
    summary:
      "Track A — twelve sub-papers across three tiers (foundational theory · measurement and mechanism · longitudinal empirical studies) drawing from a shared dataset generated by Penwright in production. Track B — six cross-cutting research programs the Penwright evidence may eventually seed.",
    arcs: ["capability-development", "coordination-cost"],
    status: "live",
  },
  {
    product: "ai-human-interaction",
    category: "reports",
    slug: "penwright-paper-01-technical",
    title: "Paper 1 (technical) — Human–AI Authorship, Skill Development, and Measurement",
    summary:
      "Tier-1 foundational paper. Synthesizes phenomenology of skill, attention theory, transactive memory, standpoint theory, epistemic injustice, cognitive apprenticeship, working-alliance theory, psychoanalytic theory, improv theory, translation theory, niche construction, and institutional economics into a single positioning argument for Penwright. Outline draft.",
    initiative: "penwright-research-program",
    arcs: ["capability-development"],
    status: "live",
  },
  {
    product: "ai-human-interaction",
    category: "reports",
    slug: "penwright-sub-paper-plan",
    title: "Penwright Research Program — sub-paper plan (v1.0)",
    summary:
      "Publication-and-product-integration strategy for the twelve-paper Penwright program. Three tiers, shared-dataset discipline, three-phase publication windows, paper-to-feature mapping. Verbatim source.",
    initiative: "penwright-research-program",
    arcs: ["capability-development"],
    status: "live",
  },
  {
    product: "ai-human-interaction",
    category: "audience-tiers",
    slug: "penwright-paper-01-public",
    title: "Why AI Writing Tools Are Failing Us — and What Comes Next",
    summary:
      "Public-audience version of Tier-1 Paper 1. Frames the case for capability-development AI writing systems for a general reader. Outline draft.",
    audienceTier: "general-audience",
    initiative: "penwright-research-program",
    arcs: ["capability-development"],
    status: "live",
  },
  {
    product: "ai-human-interaction",
    category: "audience-tiers",
    slug: "peer-review",
    title: "Peer-review framing",
    summary: "Forthcoming — peer-review positioning of headline findings against the existing HAI, educational-psychology, and working-alliance literatures.",
    audienceTier: "peer-review",
    arcs: ["capability-development"],
    status: "forthcoming",
  },
  {
    product: "ai-human-interaction",
    category: "audience-tiers",
    slug: "engineering",
    title: "Engineering critique",
    summary: "Forthcoming — engineering reviewer's lens on the Penwright Measurement Framework, the Adaptive Authorship Control Kernel (F-19), and the instrumentation discipline.",
    audienceTier: "engineering",
    status: "forthcoming",
  },
  {
    product: "ai-human-interaction",
    category: "audience-tiers",
    slug: "product",
    title: "Product implications",
    summary: "Forthcoming — what the program tells us to build next, in Penwright and in adjacent authoring environments.",
    audienceTier: "product",
    status: "forthcoming",
  },
  {
    product: "ai-human-interaction",
    category: "bibliography",
    slug: "literature-map",
    title: "Literature map",
    summary:
      "Index of 29 secondary literature reviews + 6 cross-LLM syntheses, organized by the twelve-branch HAI field map plus frontier zones, adjacent fields, and deep intersections. Honest gap-flagging at the bottom.",
    arcs: ["capability-development", "coordination-cost"],
    status: "live",
  },
  {
    product: "ai-human-interaction",
    category: "bibliography",
    slug: "roadmap",
    title: "Field-mapping roadmap",
    summary:
      "The twelve-branch HAI field map, frontier zones, adjacent fields the mainstream has under-engaged, deep intersections where genuine theoretical integration is possible, and six cross-cutting research programs. Verbatim source — load-bearing field orientation.",
    arcs: ["capability-development", "coordination-cost"],
    status: "live",
  },
  {
    product: "ai-human-interaction",
    category: "preregistrations",
    slug: "preregistration",
    title: "Preregistration(s)",
    summary:
      "Forthcoming — Paper 5 (dependency) and Paper 7 (genre) are the first OSF candidates. Protocols in draft; formal filing follows once the analysis pipeline is built and a run-in period of Penwright production data is collected.",
    arcs: ["capability-development"],
    status: "forthcoming",
  },
  {
    product: "ai-human-interaction",
    category: "pipeline",
    slug: "pipeline-status",
    title: "Pipeline status",
    summary:
      "What's drafted (Paper 1 in two registers, the sub-paper plan, the field-mapping roadmap, 29 literature reviews, 6 syntheses) · what's queued (long-context-emergence review, OSF preregistrations, external-operator pilot) · what's gated on the Penwright production system accumulating a useful run-in period of data.",
    status: "live",
  },
];
