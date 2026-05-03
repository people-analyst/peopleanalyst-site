import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/masthead";
import { Footer } from "@/components/footer";
import {
  CATEGORIES,
  getArc,
  getArcs,
  getEntriesForArcCategory,
  getArcFeaturedEntry,
  getProductsInArc,
} from "@/lib/research";
import { PRODUCT_META } from "@/content/research/_manifest";
import { AUDIENCE_TIER_LABELS } from "@/content/research/_taxonomy";

export function generateStaticParams() {
  return getArcs().map((a) => ({ arc: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ arc: string }>;
}) {
  const { arc } = await params;
  const meta = getArc(arc);
  if (!meta) return {};
  return {
    title: `${meta.label} · research arc · peopleanalyst`,
    description: meta.blurb,
  };
}

export default async function ArcDetail({
  params,
}: {
  params: Promise<{ arc: string }>;
}) {
  const { arc: arcId } = await params;
  const meta = getArc(arcId);
  if (!meta) notFound();

  const featured = getArcFeaturedEntry(meta);
  const products = getProductsInArc(meta.id);

  return (
    <>
      <Masthead />
      <main className="mx-auto max-w-[1100px] px-6">
        <section className="py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4">
          <div className="lg:col-span-9 space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              <Link href="/research" className="hover:text-accent">
                research
              </Link>{" "}
              / arc / {meta.id}
            </p>
            <h1 className="text-4xl sm:text-5xl text-ink tracking-tight leading-[1.05] font-medium">
              {meta.label}
            </h1>
            <p className="text-lg sm:text-xl text-ink-body leading-relaxed max-w-[65ch]">
              {meta.blurb}
            </p>
          </div>
        </section>

        {/* Why this matters — the extrapolation */}
        <section className="border-t border-ink py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4">
          <header className="lg:col-span-4 space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Why this matters
            </p>
            <p className="text-sm text-ink-secondary leading-relaxed max-w-[34ch] italic">
              The portable claim — what this arc lets you understand outside the surface domain.
            </p>
          </header>
          <div className="lg:col-span-8">
            <p className="text-base sm:text-lg leading-relaxed text-ink-body max-w-[65ch]">
              {meta.whyItMatters}
            </p>
          </div>
        </section>

        {/* Spans products */}
        <section className="border-t border-paper-divider py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4">
          <header className="lg:col-span-4 space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Spans
            </p>
            <p className="text-sm text-ink-secondary leading-relaxed max-w-[34ch] italic">
              Products this arc cuts through. Each application is sometimes the lead empirical apparatus, sometimes the funding/data-collection platform.
            </p>
          </header>
          <ul className="lg:col-span-8 flex flex-wrap gap-2">
            {products.map((pid) => (
              <li key={pid}>
                <Link
                  href={`/research/${pid}`}
                  className="inline-block border border-paper-divider px-3 py-1 font-mono text-xs text-ink-secondary hover:border-accent hover:text-accent transition-colors"
                >
                  {PRODUCT_META[pid].label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Featured: read this first */}
        {featured && (
          <section className="border-t border-paper-divider py-10 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4">
              <header className="lg:col-span-4 space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  Read first
                </p>
                <p className="text-sm text-ink-secondary leading-relaxed max-w-[34ch]">
                  The general-audience entry point for this arc. Drill down below for the full set.
                </p>
              </header>
              <Link
                href={`/research/${featured.product}/${featured.slug}`}
                className="lg:col-span-8 block group border border-ink p-6 lg:p-8 hover:bg-paper-card transition-colors"
              >
                <div className="flex items-baseline justify-between gap-4 flex-wrap mb-2">
                  <h2 className="text-2xl sm:text-3xl text-ink tracking-tight font-medium group-hover:text-accent transition-colors">
                    {featured.title}
                  </h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted shrink-0">
                    From {PRODUCT_META[featured.product].label}
                  </span>
                </div>
                {featured.summary && (
                  <p className="text-base text-ink-body leading-relaxed">
                    {featured.summary}
                  </p>
                )}
                <span className="inline-block mt-4 font-mono text-xs uppercase tracking-[0.15em] text-accent group-hover:underline">
                  Read →
                </span>
              </Link>
            </div>
          </section>
        )}

        {/* Seven-slot drill-down — cross-product */}
        <section className="border-t border-ink">
          <header className="py-6 flex items-baseline justify-between gap-4 flex-wrap">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Drill-down — full arc surface
            </p>
            <p className="text-xs text-ink-muted font-mono">
              Cross-product. Source application shown on each entry.
            </p>
          </header>

          {CATEGORIES.map((category) => {
            const entries = getEntriesForArcCategory(meta.id, category.id);
            if (entries.length === 0) return null;
            const live = entries.filter((e) => e.status === "live");
            const forthcoming = entries.filter((e) => e.status === "forthcoming");

            return (
              <article
                key={category.id}
                className="border-t border-paper-divider py-10 lg:py-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4">
                  <header className="lg:col-span-4 space-y-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {category.label}
                    </p>
                    <p className="text-sm text-ink-secondary leading-relaxed max-w-[34ch]">
                      {category.blurb}
                    </p>
                  </header>

                  <ul className="lg:col-span-8 space-y-3">
                    {live.map((e) => (
                      <li
                        key={`${e.product}-${e.slug}`}
                        className="border-b border-paper-divider pb-3"
                      >
                        <Link
                          href={`/research/${e.product}/${e.slug}`}
                          className="group block"
                        >
                          <div className="flex items-baseline justify-between gap-4 flex-wrap">
                            <h3 className="text-lg text-ink leading-snug group-hover:text-accent transition-colors">
                              {e.title}
                            </h3>
                            <div className="flex items-baseline gap-3 shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                              <span className="border border-paper-divider px-1.5 py-0.5">
                                {PRODUCT_META[e.product].label}
                              </span>
                              {e.audienceTier && (
                                <span>{AUDIENCE_TIER_LABELS[e.audienceTier]}</span>
                              )}
                            </div>
                          </div>
                          {e.summary && (
                            <p className="mt-1 text-sm text-ink-secondary leading-relaxed">
                              {e.summary}
                            </p>
                          )}
                        </Link>
                      </li>
                    ))}

                    {forthcoming.map((e) => (
                      <li
                        key={`${e.product}-${e.slug}`}
                        className="border-b border-paper-divider pb-3 opacity-60"
                      >
                        <div className="flex items-baseline justify-between gap-4 flex-wrap">
                          <h3 className="text-lg text-ink-secondary leading-snug">
                            {e.title}
                          </h3>
                          <div className="flex items-baseline gap-3 shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                            <span className="border border-paper-divider px-1.5 py-0.5">
                              {PRODUCT_META[e.product].label}
                            </span>
                            <span>
                              {e.audienceTier
                                ? `${AUDIENCE_TIER_LABELS[e.audienceTier]} · forthcoming`
                                : "forthcoming"}
                            </span>
                          </div>
                        </div>
                        {e.summary && (
                          <p className="mt-1 text-sm text-ink-muted leading-relaxed italic">
                            {e.summary}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
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
