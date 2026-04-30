export type PartsProductId = "vela" | "devplane" | "namesake";

export type PartsProduct = {
  id: PartsProductId;
  label: string;
  blurb: string;
  patternCount: number;
  sourceRepoLabel: string;
  productHref?: string;
};

export const PARTS_PRODUCTS: Record<PartsProductId, PartsProduct> = {
  vela: {
    id: "vela",
    label: "Vela",
    blurb:
      "An adaptive figurative-art platform. Heavy on Postgres ergonomics, Supabase tier discipline, async GPU work, and editorial-state machines that survive automated re-runs.",
    patternCount: 31,
    sourceRepoLabel: "people-analyst/vela",
    productHref: "https://vela.study",
  },
  devplane: {
    id: "devplane",
    label: "DevPlane",
    blurb:
      "A multi-agent coordination cockpit. Heavy on file-backed state, signed webhooks, two-phase actor handoffs, and runtime provider registries that plug concrete services into a generic flow engine.",
    patternCount: 20,
    sourceRepoLabel: "people-analyst/devplane",
  },
  namesake: {
    id: "namesake",
    label: "Namesake",
    blurb:
      "An intentional baby-naming platform. Heavy on dense entity pages, weighted-score blending with null-safety, and personalization re-mapping when user preferences are captured at finer granularity than the underlying score components.",
    patternCount: 20,
    sourceRepoLabel: "people-analyst/baby-namer",
    productHref: "https://namesake.baby",
  },
};

/**
 * Patterns that appear in 2+ repos — the architectural convictions that hardened
 * across products. These are *named* in the source files; the cross-references
 * are hand-curated rather than auto-derived because the names diverge slightly
 * across repos (the same idea is "Three-Tier Supabase Client Split" in Vela
 * and "Three-client database factory" in Namesake).
 */
export type CrossProductPattern = {
  title: string;
  body: string;
  appearsIn: { product: PartsProductId; numberLabel: string }[];
};

export const CROSS_PRODUCT_PATTERNS: CrossProductPattern[] = [
  {
    title: "Three-tier database client split",
    body:
      "One DB serves browser, SSR, and trusted scripts — three different credential lifetimes. A single client either over-shares (service-role key reaches public routes) or under-serves (admin operations fail RLS). Both repos that have this surface independently arrived at the same factory split.",
    appearsIn: [
      { product: "vela", numberLabel: "#1 (Three-Tier Supabase Client Split)" },
      { product: "namesake", numberLabel: "#1 (Three-client database factory)" },
    ],
  },
  {
    title: "Idempotent upsert on a composite natural key",
    body:
      "Any pipeline write that may be retried — webhook redelivery, double-submit, mobile reconnect, ingest re-runs after a script crash — needs a unique key the database enforces, not the application. Both repos pin this as the safe-re-ingestion primitive.",
    appearsIn: [
      { product: "vela", numberLabel: "#9 (Idempotent Pipeline Upsert by Natural Key)" },
      { product: "namesake", numberLabel: "#2 (Idempotent upsert with composite conflict key)" },
    ],
  },
  {
    title: "State machine via DB columns + action endpoints",
    body:
      "Editorial / curator / lifecycle workflows do not justify a dedicated state-machine library. A status enum + sticky transitions + per-action endpoint covers most cases without the orchestration tax.",
    appearsIn: [
      { product: "vela", numberLabel: "#8 (Editorial Lifecycle State Machine)" },
      { product: "devplane", numberLabel: "P04 (Discriminated-Union State Machine with Two-Phase Commit)" },
      { product: "namesake", numberLabel: "#13 (State-machine via DB columns + action endpoint)" },
    ],
  },
  {
    title: "Long-running compute on a separate worker",
    body:
      "GPU training, dataset ingest, large LLM batches — anything that outlives a request — needs a worker process, not a serverless function. Both repos formalize the pattern with a status table the frontend polls instead of a webhook the worker fires.",
    appearsIn: [
      { product: "vela", numberLabel: "#2 (Async GPU Job via Webhook-Triggered Spawn)" },
      { product: "namesake", numberLabel: "#19 (Long-running compute on a separate worker)" },
    ],
  },
  {
    title: "Validator at the boundary; trust-the-core within",
    body:
      "Untrusted input — webhooks, browser POSTs, third-party APIs — gets validated once at the perimeter and turned into a typed structure the rest of the system can rely on. The internal layers stop re-validating; they accept the typed input and crash loudly if it is wrong.",
    appearsIn: [
      { product: "devplane", numberLabel: "P05 (Validator-at-the-Boundary for Untrusted Input)" },
      { product: "vela", numberLabel: "#27 (NULL-Safe `.neq` in Postgres Query Builders)" },
    ],
  },
  {
    title: "Public-route allowlist inside an auth-first middleware",
    body:
      "Protect-everything middleware with a small regex allowlist for the few public endpoints. Easier to reason about than the inverse: public-by-default with an explicit list of protected routes.",
    appearsIn: [
      { product: "devplane", numberLabel: "P15 (Public-Route Allowlist in an Auth-First Middleware)" },
      { product: "vela", numberLabel: "#24 (Public-Twin Design Reference Route)" },
    ],
  },
  {
    title: "Cron tick + DB checkpoint over detached processes",
    body:
      "Long-running jobs — ingest pipelines, training queues, recurring sweeps — survive restarts and deploys when their state lives in a status column on the work table, not in `nohup` or `/tmp`. The cron just ticks; the work table remembers.",
    appearsIn: [
      { product: "vela", numberLabel: "#31 (Cron Tick + DB Checkpoint)" },
      { product: "devplane", numberLabel: "P03 (Pull-Mode Event Source via Log Polling)" },
    ],
  },
];
