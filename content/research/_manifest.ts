import type { CategoryId, AudienceTier } from "./_taxonomy";

export type ProductId = "vela" | "namesake" | "fourth-and-two" | "pa-platform";

export type ManifestEntry = {
  product: ProductId;
  category: CategoryId;
  slug: string;
  title: string;
  summary?: string;
  audienceTier?: AudienceTier;
  initiative?: string;
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
};

const VELA_REPO = "people-analyst/vela";
const NAMESAKE_REPO = "people-analyst/baby-namer";

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
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "klimt-methods",
    title: "Klimt — methods",
    initiative: "artist-studies",
    source: { repo: VELA_REPO, path: "docs/research/klimt-methods.md" },
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "schiele-methods",
    title: "Schiele — methods",
    initiative: "artist-studies",
    source: { repo: VELA_REPO, path: "docs/research/schiele-methods.md" },
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "sargent-methods",
    title: "Sargent — methods",
    initiative: "artist-studies",
    source: { repo: VELA_REPO, path: "docs/research/sargent-methods.md" },
    status: "live",
  },
  {
    product: "vela",
    category: "reports",
    slug: "emotion-corpus-expansion-2026-04",
    title: "Emotion corpus expansion (2026-04)",
    summary: "Notes on the emotion-corpus expansion plan.",
    source: { repo: VELA_REPO, path: "docs/research/emotion-corpus-expansion-2026-04.md" },
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
    status: "forthcoming",
  },
  {
    product: "vela",
    category: "bibliography",
    slug: "museum-diversity-literature-map",
    title: "Museum diversity-of-beauty — literature map",
    summary: "Forthcoming — field positioning for the diversity-of-beauty thread.",
    initiative: "museum-diversity",
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
    status: "live",
  },
  {
    product: "vela",
    category: "audience-tiers",
    slug: "peer-review-framing",
    title: "Peer-review framing",
    summary: "Headline findings positioned for academic peer review.",
    audienceTier: "peer-review",
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
    status: "forthcoming",
  },

  // Vela bibliography — literature maps + .bib source files
  {
    product: "vela",
    category: "bibliography",
    slug: "literature-map",
    title: "Literature map (cross-thread)",
    summary: "Map of the field across the major Vela research threads.",
    source: { repo: VELA_REPO, path: "docs/research/literature-map.md" },
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
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "phase5-null-model",
    title: "Phase 5 — null model results",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/phase5_null_model_results.md" },
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "phase6-phonetic-spillover",
    title: "Phase 6 — phonetic spillover",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/phase6_phonetic_spillover.md" },
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "phase7a-granger-causality",
    title: "Phase 7a — Granger causality",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/phase7a_granger_causality.md" },
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "phase7b-hawkes-fit",
    title: "Phase 7b — Hawkes process fit",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/phase7b_hawkes_fit.md" },
    status: "live",
  },
  {
    product: "namesake",
    category: "reports",
    slug: "phase7c-bass-diffusion",
    title: "Phase 7c — Bass diffusion",
    initiative: "cultural-diffusion",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reports/phase7c_bass_diffusion.md" },
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
    status: "live",
  },
  {
    product: "namesake",
    category: "audience-tiers",
    slug: "academic-peer-review",
    title: "Academic peer-review framing",
    audienceTier: "peer-review",
    source: { repo: NAMESAKE_REPO, path: "docs/research/reviews/academic-peer-review.md" },
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
    status: "forthcoming",
  },
  {
    product: "fourth-and-two",
    category: "methodology",
    slug: "methodology",
    title: "Methodology",
    status: "forthcoming",
  },
  {
    product: "fourth-and-two",
    category: "reports",
    slug: "decisions-under-uncertainty",
    title: "Decisions under uncertainty in fantasy",
    summary: "Anticipated thread — Monte Carlo decision support, principal-issues-set framing.",
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
    status: "forthcoming",
  },
  {
    product: "fourth-and-two",
    category: "audience-tiers",
    slug: "peer-review",
    title: "Peer-review framing",
    audienceTier: "peer-review",
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
    status: "forthcoming",
  },
  {
    product: "fourth-and-two",
    category: "preregistrations",
    slug: "preregistration",
    title: "Preregistration(s)",
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
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "methodology",
    slug: "methodology",
    title: "Methodology",
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "reports",
    slug: "principal-issues-thesis",
    title: "The principal-issues thesis",
    summary:
      "Anticipated headline thread — load-bearing analytics, the Three A's, NAV, why most companies cannot do people analytics. Draft v3 exists locally and is being prepared for publication.",
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "reports",
    slug: "hub-and-spoke-as-moat",
    title: "Hub-and-spoke as moat",
    summary:
      "Anticipated thread — architectural defensibility of a single-author people-analytics platform.",
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "reports",
    slug: "rid-sid-adaptive-measurement",
    title: "RID/SID adaptive measurement",
    summary:
      "Anticipated thread — cross-study item-response accumulation without confounding.",
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "audience-tiers",
    slug: "general-audience",
    title: "General-audience explainer",
    audienceTier: "general-audience",
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "audience-tiers",
    slug: "peer-review",
    title: "Peer-review framing",
    audienceTier: "peer-review",
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
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "preregistrations",
    slug: "preregistration",
    title: "Preregistration(s)",
    status: "forthcoming",
  },
  {
    product: "pa-platform",
    category: "pipeline",
    slug: "pipeline-status",
    title: "Pipeline status",
    status: "forthcoming",
  },
];
