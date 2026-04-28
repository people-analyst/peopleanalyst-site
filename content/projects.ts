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
  status?: "live" | "private" | "archived";
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
      "385 active works pulled from museum APIs (ARTIC, Met, BnF, Smithsonian, Europeana), licensed and attributed; an adaptive player that learns desire and pool composition; a magazine with original fiction and editorial criticism; a Stripe membership; a Chrome extension for attribution capture; a derivative pipeline that produces new transformative works under license.",
    novel: [
      "Reincarnation engine: per-user desire scoring with pool management and visual-rhyme sequencing",
      "Pill paradigm: 80 admin pages collapsed into ~7 named flows, each a typed pill expression",
      "Adaptive authorship platform underneath — Vela is property #1; siblings reuse the substrate",
      "Museum-grade attribution + license discipline as a first-class feature, not a footnote",
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
      "Live at vela.study. ~1,300 commits since project start, solo. Membership in Stripe live mode. Magazine publishing weekly.",
    role: "Solo founder, designer, engineer.",
    commits: "1,300+",
    story:
      "Vela began as a bet that taste compounds when given a substrate. The substrate is the asymmetry: AI holds the survived corpus, humans hold the unsurvived response. Vela is the place where those two meet — careful sourcing on one side, calibrated human signal on the other, and a magazine for the language in between. It also serves as the reference implementation for an adaptive-authorship platform that future siblings will sit on top of.",
    href: "https://vela.study",
    status: "live",
  },
];
