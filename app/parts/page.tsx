import Link from "next/link";
import { Masthead } from "@/components/masthead";
import { getCrossProductPatterns, getPartsProducts } from "@/lib/parts";

export const metadata = {
  title: "Reusable patterns · peopleanalyst",
  description:
    "Production-validated engineering patterns extracted from the portfolio — cross-product convictions and per-product pattern catalogs.",
};

export default function PartsIndex() {
  const products = getPartsProducts();
  const crossPatterns = getCrossProductPatterns();

  return (
    <>
      <Masthead />
      <main className="mx-auto max-w-[1100px] px-6">
        <section className="py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <div className="lg:col-span-8 space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              Reusable patterns · all properties
            </p>
            <h1 className="text-4xl sm:text-5xl text-ink tracking-tight leading-[1.05] font-medium">
              The shapes that hardened across products.
            </h1>
            <p className="text-lg sm:text-xl text-ink-body leading-relaxed max-w-[60ch]">
              Each repo carries a <code className="font-mono text-base">REUSABLE_PATTERNS.md</code> — production-validated
              shapes stripped of business context, written so they can drop into
              the next project. The interesting signal is in the overlap: where
              the same shape was independently arrived at across two or three
              codebases. That is where architectural conviction lives.
            </p>
          </div>

          <aside className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-3 text-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
              Why this matters
            </p>
            <p className="text-ink-body leading-relaxed text-sm">
              Solo cadence at the scale of four products is only feasible when
              repeated work gets named, hardened, and reused. The patterns
              indexed below are the substrate underneath the visible apps —
              what a hiring engineer would actually want to verify in due
              diligence.
            </p>
          </aside>
        </section>

        {/* Cross-product convictions */}
        <section className="border-t border-ink py-12 lg:py-16">
          <header className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 mb-8">
            <p className="lg:col-span-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Cross-product convictions
            </p>
            <p className="lg:col-span-8 text-base text-ink-secondary leading-relaxed max-w-[65ch]">
              Patterns that show up in two or more repos under different names.
              The names diverge; the shape does not. These are the
              load-bearing architectural choices, validated by independent
              re-discovery.
            </p>
          </header>

          <ul className="space-y-6">
            {crossPatterns.map((p) => (
              <li
                key={p.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-3 border-t border-paper-divider pt-6"
              >
                <div className="lg:col-span-4">
                  <h3 className="text-lg text-ink leading-snug font-medium">
                    {p.title}
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {p.appearsIn.map((a) => (
                      <li
                        key={`${a.product}-${a.numberLabel}`}
                        className="font-mono text-[11px] text-ink-secondary leading-snug"
                      >
                        <Link
                          href={`/parts/${a.product}`}
                          className="text-accent hover:underline"
                        >
                          {a.product}
                        </Link>{" "}
                        {a.numberLabel}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="lg:col-span-8 text-base text-ink-body leading-relaxed max-w-[65ch]">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Per-product catalogs */}
        <section className="border-t border-ink">
          <header className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-x-8">
            <p className="lg:col-span-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Per-product catalogs
            </p>
            <p className="lg:col-span-8 text-base text-ink-secondary leading-relaxed max-w-[65ch]">
              The full pattern document from each repo, rendered here for
              reading. Each entry includes a TypeScript sketch, the design
              decisions behind it, where to find the original implementation,
              and the tradeoffs.
            </p>
          </header>

          {products.map((p) => (
            <article
              key={p.id}
              className="border-t border-paper-divider py-10 lg:py-14"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4">
                <header className="lg:col-span-12 flex items-baseline justify-between gap-6 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl text-ink tracking-tight font-medium">
                    <Link
                      href={`/parts/${p.id}`}
                      className="hover:text-accent transition-colors"
                    >
                      {p.label}
                    </Link>
                  </h2>
                  <span className="font-mono text-xs text-ink-muted tabular-nums">
                    {p.patternCount} patterns
                  </span>
                </header>

                <p className="lg:col-span-8 text-base sm:text-lg leading-relaxed text-ink-body max-w-[65ch]">
                  {p.blurb}
                </p>

                <div className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-3">
                  <Link
                    href={`/parts/${p.id}`}
                    className="block font-mono text-xs uppercase tracking-[0.15em] text-accent hover:underline"
                  >
                    → full pattern catalog
                  </Link>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                    source: {p.sourceRepoLabel}
                  </p>
                </div>
              </div>
            </article>
          ))}
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
