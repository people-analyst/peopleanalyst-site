export type CapabilityType = "ui" | "data" | "algo" | "integration" | "agent" | "infra";

export type CapabilityTier = "recurring" | "single-origin";

export type Capability = {
  slug: string;
  title: string;
  type: CapabilityType;
  status: "written" | "stub";
  origin: string;
  alsoIn: string[];
  alsoInCount?: number;
  blurb: string;
  tier: CapabilityTier;
};

export const CAPABILITY_TYPE_LABEL: Record<CapabilityType, string> = {
  ui: "UI",
  data: "Data",
  algo: "Algorithm",
  integration: "Integration",
  agent: "Agent",
  infra: "Infrastructure",
};

/**
 * Source of truth: people-analyst/devplane → docs/CAPABILITIES/ + the
 * portfolio-capabilities export at docs/exports/portfolio-capabilities.md.
 *
 * Each row mirrors the inventory tables in that export. Written entries
 * point to a synced markdown body in this directory; stubs render as
 * forthcoming with their inventory metadata only.
 */
export const CAPABILITIES: Capability[] = [
  // ===== Clearly recurring (3+ repos) — all written =====
  {
    slug: "data-profile-page",
    title: "Data-driven profile page",
    type: "ui",
    status: "written",
    origin: "baby-namer",
    alsoIn: ["vela", "people-analyst"],
    blurb:
      "Dense single-entity detail page that pulls 6–10 parallel data sources on the server, assembles them into a summary card, tabbed sections, recommendation clusters, and multi-faceted scoring breakdowns — without spinner soup.",
    tier: "recurring",
  },
  {
    slug: "survey-respondent-interface",
    title: "Survey respondent interface",
    type: "ui",
    status: "written",
    origin: "preference-modeler",
    alsoIn: ["baby-namer", "reincarnation"],
    blurb:
      "Token-gated (no-login) interface for a respondent to answer items — ratings, selections, free-text, or pairwise — that flow into a downstream scoring or analysis pipeline. Three live variants: open-ended estimation, tournament voting, adaptive item selection.",
    tier: "recurring",
  },
  {
    slug: "csv-ingestion",
    title: "CSV ingestion + column detection",
    type: "data",
    status: "written",
    origin: "segmentation-studio",
    alsoIn: ["calculus", "conductor", "data-anonymizer", "people-analyst"],
    blurb:
      "Robust CSV ingestion with explicit-vs-flexible column detection, type inference, and canonical-mapping — the front door for every data-import surface in the portfolio.",
    tier: "recurring",
  },
  {
    slug: "segmentation-dimensions",
    title: "Segmentation / dimension management",
    type: "data",
    status: "written",
    origin: "segmentation-studio",
    alsoIn: ["calculus", "conductor", "meta-factory", "people-analyst", "preference-modeler", "reincarnation"],
    alsoInCount: 6,
    blurb:
      "Multi-dimensional segmentation engine with hierarchy mapping, value normalization, and explicit/flexible column adjudication. Six spokes consume it.",
    tier: "recurring",
  },
  {
    slug: "ai-field-mapping",
    title: "AI field mapping → canonical schema",
    type: "data",
    status: "written",
    origin: "conductor",
    alsoIn: ["data-anonymizer", "people-analyst", "preference-modeler", "segmentation-studio"],
    blurb:
      "AI-assisted mapping from raw inbound field names to a canonical schema, with confidence scoring and human-override gates. Used wherever data crosses an organizational boundary.",
    tier: "recurring",
  },
  {
    slug: "compensation-scenarios",
    title: "Compensation scenario modeling",
    type: "data",
    status: "written",
    origin: "anycomp",
    alsoIn: ["calculus", "conductor", "decision-wizard", "meta-factory", "people-analyst", "preference-modeler", "voi-calculator"],
    alsoInCount: 7,
    blurb:
      "Compensation-decision modeling — merit, equity, market-pricing, and total-rewards composed into a single decision surface with scenario diff and policy gate.",
    tier: "recurring",
  },
  {
    slug: "monte-carlo-simulation",
    title: "Monte Carlo simulation engine",
    type: "algo",
    status: "written",
    origin: "voi-calculator",
    alsoIn: ["anycomp", "decision-wizard", "people-analyst"],
    blurb:
      "Monte Carlo simulation as a reusable engine — distribution definitions, correlated draws, surrogate models for expensive functions, structured output for downstream analysis.",
    tier: "recurring",
  },
  {
    slug: "statistical-analysis",
    title: "Statistical analysis engine (HAVE)",
    type: "algo",
    status: "written",
    origin: "calculus",
    alsoIn: ["anycomp", "conductor", "people-analyst"],
    blurb:
      "Significance testing, effect-size calculation, segment-grain comparison, and pre-validated test selection. Where dashboards report numbers, this is the engine that decides which numbers can be trusted.",
    tier: "recurring",
  },
  {
    slug: "realtime-aggregation",
    title: "Realtime vote / response aggregation",
    type: "data",
    status: "written",
    origin: "baby-namer",
    alsoIn: ["reincarnation", "vela"],
    blurb:
      "Realtime fan-out of votes, ratings, and pairwise selections — channel-scoped, low-overhead, suitable for live counters and tournament displays.",
    tier: "recurring",
  },
  {
    slug: "hub-ecosystem-sync",
    title: "Hub ecosystem sync (directives + metrics)",
    type: "integration",
    status: "written",
    origin: "kanbai (hub)",
    alsoIn: [],
    alsoInCount: 12,
    blurb:
      "Hub-and-spoke directive distribution + metric collection — the substrate that lets a central hub coordinate twelve spoke applications without each spoke needing point-to-point integrations.",
    tier: "recurring",
  },
  {
    slug: "github-sync",
    title: "GitHub bi-directional sync",
    type: "integration",
    status: "written",
    origin: "data-anonymizer",
    alsoIn: [],
    alsoInCount: 12,
    blurb:
      "Two-way GitHub sync — pulls upstream metadata into the application, pushes outbound state changes back to issues / PRs / comments. Twelve spokes use it for project-level coordination.",
    tier: "recurring",
  },
  {
    slug: "docs-generation",
    title: "Documentation generation + hub score",
    type: "integration",
    status: "written",
    origin: "shared",
    alsoIn: [],
    alsoInCount: 13,
    blurb:
      "Automated documentation generation with a hub-side score that grades each spoke's documentation completeness and signals updates back to the hub. Thirteen repos contribute.",
    tier: "recurring",
  },
  {
    slug: "kanban-spoke",
    title: "Kanban board + hub sync (spoke)",
    type: "infra",
    status: "written",
    origin: "kanbai",
    alsoIn: [],
    alsoInCount: 11,
    blurb:
      "Spoke-side kanban surface that pulls hub-managed cards, persists local state, and pushes status changes back through the hub. Eleven spokes consume it for project workflow.",
    tier: "recurring",
  },

  // ===== Strong single-origin — adaptive-queue + identity-resolution written =====
  {
    slug: "adaptive-queue",
    title: "Adaptive learning queue / pool ladder",
    type: "algo",
    status: "written",
    origin: "reincarnation",
    alsoIn: ["vela"],
    blurb:
      "Adaptive item selection over a pool ladder — exploration budget, response entropy, pool promotion. The shape behind Reincarnation's psychometrics and Vela's desire-driven sequence engine.",
    tier: "single-origin",
  },
  {
    slug: "identity-resolution",
    title: "Identity resolution + multi-CSV join",
    type: "algo",
    status: "written",
    origin: "conductor",
    alsoIn: [],
    blurb:
      "Probabilistic record linkage across heterogeneous CSV inputs — fuzzy matching, hierarchy-aware tiebreaking, confidence-scored joins. Front door for any pipeline that has to reconcile multiple snapshots of the same population.",
    tier: "single-origin",
  },

  // ===== Stubs (inventory entry only — body forthcoming) =====
  {
    slug: "name-enrichment-scoring",
    title: "Name enrichment + intelligence scoring",
    type: "data",
    status: "stub",
    origin: "baby-namer",
    alsoIn: [],
    blurb: "Multi-source enrichment + composite scoring of named entities (the Namesake-Score shape).",
    tier: "single-origin",
  },
  {
    slug: "lora-style-training",
    title: "LoRA style adapter training",
    type: "algo",
    status: "stub",
    origin: "vela",
    alsoIn: [],
    blurb: "Modal-hosted FLUX/SDXL LoRA training pipeline tuned for stylistic-not-realistic adapters.",
    tier: "single-origin",
  },
  {
    slug: "financial-kpi-panel",
    title: "Financial instrument panel / KPI dashboard",
    type: "ui",
    status: "stub",
    origin: "people-analyst",
    alsoIn: [],
    blurb: "KPI dashboard surface with instrument-style panels — orientation, trend, threshold, drilldown.",
    tier: "single-origin",
  },
  {
    slug: "decision-wizard-kt",
    title: "Decision wizard (Kepner-Tregoe)",
    type: "ui",
    status: "stub",
    origin: "decision-wizard",
    alsoIn: [],
    blurb: "Structured Kepner-Tregoe decision-making flow — situation appraisal, problem analysis, decision analysis, potential-problem analysis.",
    tier: "single-origin",
  },
  {
    slug: "media-asset-library",
    title: "Media asset library + curatorial sequencing",
    type: "data",
    status: "stub",
    origin: "vela",
    alsoIn: [],
    blurb: "Curated media library with attribution discipline, license metadata, and sequence assembly for adaptive playback.",
    tier: "single-origin",
  },
  {
    slug: "psychometric-item-bank",
    title: "Psychometric item bank + adaptive sampling",
    type: "data",
    status: "stub",
    origin: "reincarnation",
    alsoIn: [],
    blurb: "Item bank with reverse-coding, scale anchors, IRT parameters, and adaptive sampling that selects the next item per respondent based on response history.",
    tier: "single-origin",
  },
  {
    slug: "research-vision-analysis",
    title: "Research / census + Modal vision analysis",
    type: "algo",
    status: "stub",
    origin: "vela",
    alsoIn: [],
    blurb: "Modal-hosted vision-LLM pipeline for research census — structured extraction from images at GPU scale.",
    tier: "single-origin",
  },
  {
    slug: "upward-feedback",
    title: "Upward feedback collection + aggregation",
    type: "ui",
    status: "stub",
    origin: "preference-modeler",
    alsoIn: [],
    blurb: "Anonymous-by-construction upward feedback flow with 5+ response gating before aggregate display.",
    tier: "single-origin",
  },
  {
    slug: "strategic-priority-elicitation",
    title: "Strategic priority elicitation",
    type: "ui",
    status: "stub",
    origin: "anycomp",
    alsoIn: [],
    blurb: "Surface for eliciting strategic priorities from a leadership group — pairwise, weighted, and reconciled.",
    tier: "single-origin",
  },
  {
    slug: "metric-definition-registry",
    title: "Metric definition registry + tier classification",
    type: "data",
    status: "stub",
    origin: "conductor",
    alsoIn: [],
    blurb: "Canonical metric definitions with base/derived/compound tiering — the registry behind Calculus and the metric-library surfaces.",
    tier: "single-origin",
  },
  {
    slug: "api-spec-manifest",
    title: "API specification manifest",
    type: "integration",
    status: "stub",
    origin: "shared",
    alsoIn: [],
    blurb: "Machine-readable API contract manifest format used across the spoke ecosystem for SDK generation and integration handshakes.",
    tier: "single-origin",
  },
  {
    slug: "email-safety-switch",
    title: "Email safety switch",
    type: "infra",
    status: "stub",
    origin: "preference-modeler",
    alsoIn: [],
    blurb: "Production-vs-test email gating — a single switch that prevents real-recipient sends in test environments and surfaces the test-mode state to operators.",
    tier: "single-origin",
  },
];

export function capabilitiesByTier(tier: CapabilityTier): Capability[] {
  return CAPABILITIES.filter((c) => c.tier === tier);
}

export function getCapability(slug: string): Capability | undefined {
  return CAPABILITIES.find((c) => c.slug === slug);
}

export function alsoInDisplay(c: Capability): string {
  if (c.alsoIn.length > 0) return c.alsoIn.join(", ");
  if (c.alsoInCount) return `${c.alsoInCount} other repos`;
  return "—";
}
