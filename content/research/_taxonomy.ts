export type CategoryId =
  | "overview"
  | "methodology"
  | "reports"
  | "audience-tiers"
  | "bibliography"
  | "preregistrations"
  | "pipeline";

export type Category = {
  id: CategoryId;
  label: string;
  blurb: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "overview",
    label: "Overview",
    blurb:
      "What this research program is and why it exists. The frame the rest of the work hangs on.",
  },
  {
    id: "methodology",
    label: "Methodology",
    blurb:
      "How the work is done — instruments, protocols, the standards each report inherits.",
  },
  {
    id: "reports",
    label: "Reports",
    blurb:
      "The actual research findings — phased results, research-question briefs, applied analyses.",
  },
  {
    id: "audience-tiers",
    label: "Audience tiers",
    blurb:
      "The same headline research surfaced four ways: peer-review, engineering, general audience, product.",
  },
  {
    id: "bibliography",
    label: "Bibliography",
    blurb:
      "Field positioning — formal references and literature maps grounding the research threads.",
  },
  {
    id: "preregistrations",
    label: "Preregistrations & protocols",
    blurb:
      "Studies and intervention protocols filed before execution.",
  },
  {
    id: "pipeline",
    label: "Pipeline",
    blurb: "What is running, what is queued, what is forthcoming.",
  },
];

export type AudienceTier =
  | "peer-review"
  | "engineering"
  | "general-audience"
  | "product";

export const AUDIENCE_TIER_LABELS: Record<AudienceTier, string> = {
  "peer-review": "Peer-review framing",
  engineering: "Engineering critique",
  "general-audience": "General audience",
  product: "Product implications",
};
