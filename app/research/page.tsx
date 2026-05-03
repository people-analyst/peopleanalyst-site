import Link from "next/link";
import { Masthead } from "@/components/masthead";
import { Footer } from "@/components/footer";
import {
  getArcs,
  getArcStatus,
  getArcFeaturedEntry,
  getProductsInArc,
} from "@/lib/research";
import { PRODUCT_META } from "@/content/research/_manifest";

export const metadata = {
  title: "Research · peopleanalyst",
  description:
    "The research underneath the products — organized by field-level arc. Each arc cuts across one or more applications; the application is sometimes the lead empirical apparatus, sometimes the funding/data-collection platform for the work.",
};

export default function ResearchIndex() {
  const arcs = getArcs();

  return (
    <>
      <Masthead />
      <main className="mx-auto max-w-[1100px] px-6">
        <section className="py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <div className="lg:col-span-8 space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              Research · field-level arcs
            </p>
            <h1 className="text-4xl sm:text-5xl text-ink tracking-tight leading-[1.05] font-medium">
              The research underneath the products.
            </h1>
            <p className="text-lg sm:text-xl text-ink-body leading-relaxed max-w-[60ch]">
              Eight arcs organize the work at field-level rather than by
              application. Each arc spans one or more products; sometimes the
              application is the lead empirical apparatus, sometimes the
              application is the funding and data-collection platform for the
              underlying research. The application–to–research relationship is
              two-way — methods built for one product become substrate for the
              next; questions surfaced in the research drive what gets built.
            </p>
            <p className="text-base text-ink-body leading-relaxed max-w-[60ch]">
              Each arc card below shows the question it asks, why the methods
              generalize, the products it spans, and the entry point to read
              first. Drill into any arc for the full set of papers, methods,
              and protocols organized under it.
            </p>
          </div>

          <aside className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-4 text-sm font-mono">
            <p className="text-[10px] uppercase tracking-[0.15em] text-ink-muted">
              Other axes
            </p>
            <div className="space-y-2">
              <Link
                href="/research/by-product"
                className="block border-b border-paper-divider pb-2 text-xs leading-snug text-ink hover:text-accent transition-colors"
              >
                <span className="text-accent">→</span> Research by product
                <span className="block mt-1 text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                  Same body of work, organized by application
                </span>
              </Link>
            </div>
            <p className="pt-3 text-[10px] uppercase tracking-[0.15em] text-ink-muted">
              Why arcs, not products
            </p>
            <p className="text-xs text-ink-body leading-relaxed font-sans">
              The questions don't fit neatly inside one product. Adaptive
              measurement shows up at Vela, Principia, and Namesake.
              Coordination cost in human–AI systems is DevPlane's whole
              program and now half of the AHI program. Per-product organization
              buries those threads inside marketing-shaped silos. Arcs surface
              them.
            </p>
          </aside>
        </section>

        <section className="border-t border-ink">
          {arcs.map((arc) => {
            const { live, total } = getArcStatus(arc.id);
            const featured = getArcFeaturedEntry(arc);
            const products = getProductsInArc(arc.id);

            return (
              <article
                key={arc.id}
                className="border-b border-paper-divider py-12 lg:py-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-5">
                  <header className="lg:col-span-12 flex items-baseline justify-between gap-6 flex-wrap">
                    <h2 className="text-2xl sm:text-3xl text-ink tracking-tight font-medium">
                      <Link
                        href={`/research/arc/${arc.id}`}
                        className="hover:text-accent transition-colors"
                      >
                        {arc.label}
                      </Link>
                    </h2>
                    <span className="font-mono text-xs text-ink-muted tabular-nums">
                      {live} of {total} entries live
                    </span>
                  </header>

                  <p className="lg:col-span-8 text-base sm:text-lg leading-relaxed text-ink-body">
                    {arc.blurb}
                  </p>

                  <div className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-4">
                    {featured ? (
                      <Link
                        href={`/research/${featured.product}/${featured.slug}`}
                        className="group block"
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                          Read first
                        </p>
                        <p className="mt-1 text-sm text-ink leading-snug group-hover:text-accent transition-colors">
                          {featured.title}
                        </p>
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                          From {PRODUCT_META[featured.product].label}
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

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                        Spans
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {products.map((pid) => (
                          <li key={pid}>
                            <Link
                              href={`/research/${pid}`}
                              className="inline-block border border-paper-divider px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-secondary hover:border-accent hover:text-accent transition-colors"
                            >
                              {PRODUCT_META[pid].label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/research/arc/${arc.id}`}
                      className="block font-mono text-xs uppercase tracking-[0.15em] text-accent hover:underline"
                    >
                      → full arc
                    </Link>
                  </div>

                  <div className="lg:col-span-12 lg:col-start-1 mt-2 border-t border-paper-divider pt-6 grid grid-cols-1 lg:grid-cols-12 gap-x-8">
                    <p className="lg:col-span-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      Why this matters
                    </p>
                    <p className="lg:col-span-8 text-base text-ink-body leading-relaxed max-w-[65ch]">
                      {arc.whyItMatters}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <Footer />
      </main>
    </>
  );
}
