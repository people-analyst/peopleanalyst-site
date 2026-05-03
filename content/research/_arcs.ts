import type { ProductId } from "./_manifest";

export type ArcId =
  | "adaptive-measurement"
  | "cultural-diffusion"
  | "decision-support"
  | "coordination-cost"
  | "capability-development"
  | "aesthetic-response"
  | "religion-morality"
  | "organizational-measurement";

export type Arc = {
  id: ArcId;
  label: string;
  blurb: string;
  whyItMatters: string;
  spans: ProductId[];
  /**
   * The product+slug pair to surface as the "Read first" entry on the arc card +
   * arc page. Resolved live so a forthcoming entry shows as forthcoming and a
   * later switch to live picks up automatically.
   */
  featuredEntry?: { product: ProductId; slug: string };
};

export const ARCS: Arc[] = [
  {
    id: "adaptive-measurement",
    label: "Adaptive measurement & psychometric architecture",
    blurb:
      "What does it take to do longitudinal measurement that compounds across studies without confounding? Item-response accumulation, adaptive sampling, RID/SID architecture, instrument validation, and the canonical-vocabulary discipline that lets sibling studies share evidence rather than silo it.",
    whyItMatters:
      "Most fields with measurement traditions reinvent instruments per study and pool effect sizes after the fact. The adaptive-measurement arc is a bet that the right substrate — questions as first-class objects with stable IDs, response data accumulating across studies, instrument-quality grading enforced at write-time — is what lets a measurement program actually compound. The technical contribution shows up at Vela (Reincarnation engine), Principia (organizational-measurement registry), and Namesake (within-session preference calibration). The methodology travels: anywhere rigorous measurement is unevenly distributed across the working community is a candidate for the same architectural pattern.",
    spans: ["vela", "namesake", "principia", "ai-human-interaction"],
    featuredEntry: { product: "principia", slug: "overview" },
  },
  {
    id: "cultural-diffusion",
    label: "Cultural diffusion & predictability ceilings",
    blurb:
      "How do cultural objects spread, what predicts breakouts, and where is the predictability ceiling? Hawkes processes, Bass diffusion, phonetic spillover, Granger-causal event chains, the variance decomposition that says how much of a name's trajectory is name-intrinsic versus environment-driven.",
    whyItMatters:
      "Names are the testbed because the corpus is dense and the temporal signal is clean. The findings travel: how marketing campaigns succeed or fail, how misinformation propagates, how innovations diffuse through organizations, why fashion cycles look the way they do, what separates lasting public discourse from brief virality. The arc lives almost entirely in Namesake today; visual-rhyme dynamics in Vela's reincarnation pool are an emerging adjacent surface.",
    spans: ["namesake", "vela"],
    featuredEntry: { product: "namesake", slug: "general-audience-explainer" },
  },
  {
    id: "decision-support",
    label: "Decision support under uncertainty",
    blurb:
      "When the answer exists on a range, how do you make it executable for a decision-maker? Monte Carlo simulation, formal Value-of-Information analysis, regression-based surrogate calculators, scenario modeling at population scale, and the principal-issues framing that names the load-bearing measurement set every decision actually rests on.",
    whyItMatters:
      "The headline question executives bring to a planning cycle is rarely 'what is the answer' — it is 'what is the range of plausible answers, and how confident can I commit before more is known.' This arc is the methodological spine for any forced-choice point where the population, the inputs, or the future are themselves uncertain. Fourth & Two applies it to fantasy decisions; the People Analytics Platform applies it to compensation; the principal-issues thesis names why most domains fail to do this at all.",
    spans: ["fourth-and-two", "pa-platform", "devplane"],
    featuredEntry: { product: "fourth-and-two", slug: "general-audience" },
  },
  {
    id: "coordination-cost",
    label: "Coordination cost in human–AI systems",
    blurb:
      "What does AI actually cost humans operationally — vigilance, compensation effects, capability erosion, handoff loss, instrument blindness? The Ironies of Automation generalized to multi-agent coding, with continuous production telemetry as the apparatus.",
    whyItMatters:
      "AI coding tools' productivity claims rest on agent-side measurements — lines produced, tasks completed, time-to-PR. If operator vigilance falls as agent reliability rises, those measurements systematically overstate net effect. DevPlane's C1 study is a pre-registered field test of that prediction; the AI–Human Interaction program extends it to authorship and capability development. The methodology generalizes to any team running heterogeneous tools through a coordination layer — multi-tool ops dashboards, hospital handoff systems, distributed scientific instruments.",
    spans: ["devplane", "ai-human-interaction"],
    featuredEntry: { product: "devplane", slug: "overview" },
  },
  {
    id: "capability-development",
    label: "AI–human capability development (longitudinal)",
    blurb:
      "What does AI do to human capability over months and years, and what kinds of system design support development rather than dependence? Authorship-system design, the Loom Measurement Framework, the longitudinal test that asks whether a writer is better without the system after six months.",
    whyItMatters:
      "Existing AI–human-interaction research clusters in single-session, individual-level, descriptive studies. Almost no longitudinal work exists. The arc is a bet that capability-development can be measured, and that the design of the interaction structure — not the model on the other side — is what determines whether AI augments or substitutes. Loom (inside Vela) is the lead empirical apparatus; the AHI program owns the published-paper trajectory.",
    spans: ["ai-human-interaction", "vela"],
    featuredEntry: { product: "ai-human-interaction", slug: "loom-paper-01-public" },
  },
  {
    id: "aesthetic-response",
    label: "Aesthetic response & desire",
    blurb:
      "How does desire (move-toward) separate from preference (like) in figurative response? Compositional features, temporal dynamics, individual-difference structure, museum-corpus diversity, and the artist-study programs that take specific bodies of work seriously as research instruments.",
    whyItMatters:
      "On the surface, fine-art figurative response. Underneath, an instrument: the methods generalize to consumer-behavior research, aesthetic measurement methodology, taste calibration in any high-volume domain, and the design of adaptive measurement instruments well outside HR. The corpus is fine art because the signal is rich; the questions are general.",
    spans: ["vela"],
    featuredEntry: { product: "vela", slug: "public-introduction" },
  },
  {
    id: "religion-morality",
    label: "Religion, morality, and sexual norms",
    blurb:
      "How do contested moral traditions about the body get reinterpreted across centuries? The Christianity-sex-shame literature trajectory; Augustine across his works; theological-coherence intervention design; the developmental-theology arc.",
    whyItMatters:
      "The thread takes a particular cluster of inherited moral discomfort seriously enough to do the historical work, the scholarly retrieval, and the experimental-protocol design. Output is editorial; methodology is research-grade. The arc is currently Vela-only; it surfaces questions about how moral arguments persist, mutate, and get re-grounded across institutional contexts that have purchase well outside the figurative-art surface domain.",
    spans: ["vela"],
    featuredEntry: { product: "vela", slug: "christianity-sex-shame-public-introduction" },
  },
  {
    id: "organizational-measurement",
    label: "Organizational measurement",
    blurb:
      "What is the load-bearing measurement set for organizations, and why are most stuck? The principal-issues thesis, construct-family surveys, instrument-grade evidence, queryable measurement registries, and the hub-and-spoke discipline that lets a measurement vocabulary be consumed across many applications without drift.",
    whyItMatters:
      "Load-bearing organizational measurement is unevenly distributed across organizations and disciplines. The same construct gets measured five different ways across five different studies; effect-size tables live scattered through chapters of textbooks. This arc names the measurement set for organizations and builds the substrate for it. The methodology generalizes — clinical psychology, educational measurement, marketing research — anywhere a field has the expertise but not the indexing.",
    spans: ["principia", "pa-platform"],
    featuredEntry: { product: "pa-platform", slug: "principal-issues-thesis" },
  },
];

export const ARC_INDEX: Record<ArcId, Arc> = ARCS.reduce(
  (acc, arc) => {
    acc[arc.id] = arc;
    return acc;
  },
  {} as Record<ArcId, Arc>,
);
