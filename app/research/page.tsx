import Link from "next/link";
import { Masthead } from "@/components/masthead";
import {
  CATEGORIES,
  getEntry,
  getProducts,
  getProductStatus,
} from "@/lib/research";

export const metadata = {
  title: "Research · peopleanalyst",
  description:
    "The research underneath each property — organized by product, normalized across a seven-slot baseline so excellence parity is legible across the portfolio.",
};

export default function ResearchIndex() {
  const products = getProducts();

  return (
    <>
      <Masthead />
      <main className="mx-auto max-w-[1100px] px-6">
        <section className="py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <div className="lg:col-span-8 space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              Research · all properties
            </p>
            <h1 className="text-4xl sm:text-5xl text-ink tracking-tight leading-[1.05] font-medium">
              The research underneath the products.
            </h1>
            <p className="text-lg sm:text-xl text-ink-body leading-relaxed max-w-[60ch]">
              Each property has its own research program. They share a baseline:
              an overview, a methodology, the actual reports, four
              audience-tier framings of the headline work, a bibliography,
              preregistrations, and a pipeline. Where a slot is empty, it is
              shown openly as forthcoming — visible gaps, not papered-over ones.
            </p>
            <p className="text-base text-ink-body leading-relaxed max-w-[60ch]">
              The five programs share a posture. Each treats a domain that
              looks like a product — figurative art, baby naming, fantasy
              decisions, HR analytics, multi-agent coordination — and turns
              it into an instrument the discipline did not have. Vela separates
              desire from preference. Namesake studies cultural diffusion
              through one of its denser corpora. Fourth & Two formalizes
              decisions under uncertainty. The People Analytics Platform names
              the load-bearing measurements most organizations cannot do.
              DevPlane catches the coordination cost that agent-side
              productivity metrics miss. The methods travel because the
              questions underneath are general — measurement under conditions
              where the cleanest evidence is unevenly distributed.
            </p>
          </div>

          <aside className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-3 text-sm font-mono">
            <p className="text-[10px] uppercase tracking-[0.15em] text-ink-muted">
              Baseline categories
            </p>
            {CATEGORIES.map((c) => (
              <div
                key={c.id}
                className="border-b border-paper-divider pb-2 text-xs leading-snug"
              >
                <span className="text-ink">{c.label}</span>
              </div>
            ))}
          </aside>
        </section>

        <section className="border-t border-ink">
          {products.map((p) => {
            const { live, total } = getProductStatus(p.id);
            const featured = p.featuredEntrySlug
              ? getEntry(p.id, p.featuredEntrySlug)
              : undefined;
            const featuredLive = featured?.status === "live";

            return (
              <article
                key={p.id}
                className="border-b border-paper-divider py-12 lg:py-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-5">
                  <header className="lg:col-span-12 flex items-baseline justify-between gap-6 flex-wrap">
                    <h2 className="text-2xl sm:text-3xl text-ink tracking-tight font-medium">
                      <Link
                        href={`/research/${p.id}`}
                        className="hover:text-accent transition-colors"
                      >
                        {p.label}
                      </Link>
                    </h2>
                    <span className="font-mono text-xs text-ink-muted tabular-nums">
                      {live} of {total} slots populated
                    </span>
                  </header>

                  <p className="lg:col-span-8 text-base sm:text-lg leading-relaxed text-ink-body">
                    {p.blurb}
                  </p>

                  <div className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-3">
                    {featuredLive ? (
                      <Link
                        href={`/research/${p.id}/${featured!.slug}`}
                        className="group block"
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                          Read first
                        </p>
                        <p className="mt-1 text-sm text-ink leading-snug group-hover:text-accent transition-colors">
                          {featured!.title}
                        </p>
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                          General audience explainer
                        </span>
                      </Link>
                    ) : (
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                          Read first
                        </p>
                        <p className="mt-1 text-sm text-ink-muted leading-snug italic">
                          General-audience explainer forthcoming.
                        </p>
                      </div>
                    )}
                    <Link
                      href={`/research/${p.id}`}
                      className="block font-mono text-xs uppercase tracking-[0.15em] text-accent hover:underline"
                    >
                      → full research surface
                    </Link>
                  </div>

                  <div className="lg:col-span-12 lg:col-start-1 mt-2 border-t border-paper-divider pt-6 grid grid-cols-1 lg:grid-cols-12 gap-x-8">
                    <p className="lg:col-span-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      Why this matters
                    </p>
                    <p className="lg:col-span-8 text-base text-ink-body leading-relaxed max-w-[65ch]">
                      {p.whyItMatters}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <footer className="border-t border-paper-divider mt-24 py-10 text-sm font-mono text-ink-muted flex flex-wrap items-baseline justify-between gap-3">
          <span>peopleanalyst.com · Mike West · Pittsburgh, PA</span>
          <a
            href="mailto:mike@peopleanalyst.com"
            className="hover:text-accent transition-colors"
          >
            mike@peopleanalyst.com
          </a>
        </footer>
      </main>
    </>
  );
}
