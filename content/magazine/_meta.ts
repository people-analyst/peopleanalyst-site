/**
 * PeopleAnalyst Magazine — article registry.
 *
 * Each entry corresponds to a markdown file at
 * `content/magazine/<slug>.md`.
 *
 * The magazine is intentionally not in the main masthead nav (per Mike's
 * direction). It's reachable from the consulting page (where the article
 * topics best fit), the footer "On this site" list, and via direct URL.
 *
 * Eventually this surface will grow into a real editorial publication
 * borrowing the Vela magazine infrastructure pattern, oriented to the
 * principia / AI-human-interaction / portfolio topic domain.
 */
export type MagazineArticle = {
  slug: string;
  title: string;
  /** A one-line subtitle, shown under the title on the article page and in index cards. */
  subtitle?: string;
  /** Index-card blurb. ~1-3 sentences. */
  blurb: string;
  /** ISO date YYYY-MM-DD. */
  date: string;
  byline: string;
  /** Set true if still draft-stage; UI shows a small marker. */
  draft?: boolean;
  /** Optional kicker — the topic/section the piece belongs to (e.g., "Methodology · principia"). */
  kicker?: string;
};

export const MAGAZINE_ARTICLES: MagazineArticle[] = [
  {
    slug: "rapid-collaborative-impact",
    title: "Why People Analytics Is Stuck — and How to Unstick It",
    subtitle:
      "Rapid Collaborative Impact (RCI), the load-bearing set, and why most organizations cannot do people analytics — even though it has been demonstrably valuable for two decades.",
    blurb:
      "Most organizations cannot do people analytics — not for lack of data, but for lack of methodology. The field has stayed stuck at a few elite organizations because most attempts copy Google's *outputs* without the underlying four-S capability that produced them. The principal-issues thesis names the load-bearing set, fast.",
    date: "2026-04-27",
    byline: "Mike West",
    kicker: "Methodology · principia",
    draft: true,
  },
];

export function getMagazineArticle(slug: string): MagazineArticle | undefined {
  return MAGAZINE_ARTICLES.find((a) => a.slug === slug);
}

export function getMagazineArticles(): MagazineArticle[] {
  return [...MAGAZINE_ARTICLES].sort(
    (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0),
  );
}
