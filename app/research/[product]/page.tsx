import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/masthead";
import { Footer } from "@/components/footer";
import {
  CATEGORIES,
  getEntriesForProductCategory,
  getEntry,
  getProduct,
  getProducts,
} from "@/lib/research";
import { AUDIENCE_TIER_LABELS } from "@/content/research/_taxonomy";

export function generateStaticParams() {
  return getProducts().map((p) => ({ product: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const meta = getProduct(product);
  if (!meta) return {};
  return {
    title: `${meta.label} research · peopleanalyst`,
    description: meta.blurb,
  };
}

export default async function ProductResearchIndex({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const meta = getProduct(product);
  if (!meta) notFound();

  const featured = meta.featuredEntrySlug
    ? getEntry(meta.id, meta.featuredEntrySlug)
    : undefined;

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
              / {meta.id}
            </p>
            <h1 className="text-4xl sm:text-5xl text-ink tracking-tight leading-[1.05] font-medium">
              {meta.label} research
            </h1>
            <p className="text-lg sm:text-xl text-ink-body leading-relaxed max-w-[65ch]">
              {meta.blurb}
            </p>
            {meta.href && (
              <p>
                <a
                  href={meta.href}
                  className="font-mono text-xs uppercase tracking-[0.15em] text-accent hover:underline"
                >
                  ↗ {meta.href.replace(/^https?:\/\//, "")}
                </a>
              </p>
            )}
          </div>
        </section>

        {/* Why this matters — the extrapolation */}
        <section className="border-t border-ink py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4">
          <header className="lg:col-span-4 space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Why this matters
            </p>
            <p className="text-sm text-ink-secondary leading-relaxed max-w-[34ch] italic">
              The portable claim — what this research lets you understand outside the surface domain.
            </p>
          </header>
          <div className="lg:col-span-8">
            <p className="text-base sm:text-lg leading-relaxed text-ink-body max-w-[65ch]">
              {meta.whyItMatters}
            </p>
          </div>
        </section>

        {/* Featured: read this first */}
        {featured && featured.status === "live" && (
          <section className="border-t border-paper-divider py-10 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4">
              <header className="lg:col-span-4 space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  Read first
                </p>
                <p className="text-sm text-ink-secondary leading-relaxed max-w-[34ch]">
                  The general-audience explainer is the entry point. Everything below is the drill-down.
                </p>
              </header>
              <Link
                href={`/research/${meta.id}/${featured.slug}`}
                className="lg:col-span-8 block group border border-ink p-6 lg:p-8 hover:bg-paper-card transition-colors"
              >
                <div className="flex items-baseline justify-between gap-4 flex-wrap mb-2">
                  <h2 className="text-2xl sm:text-3xl text-ink tracking-tight font-medium group-hover:text-accent transition-colors">
                    {featured.title}
                  </h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted shrink-0">
                    General audience
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

        {/* Seven-slot drill-down */}
        <section className="border-t border-ink">
          <header className="py-6 flex items-baseline justify-between gap-4 flex-wrap">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Drill-down — full research surface
            </p>
            <p className="text-xs text-ink-muted font-mono">
              Seven-slot baseline. Forthcoming slots shown openly.
            </p>
          </header>

          {CATEGORIES.map((category) => {
            const entries = getEntriesForProductCategory(meta.id, category.id);
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
                        key={e.slug}
                        className="border-b border-paper-divider pb-3"
                      >
                        <Link
                          href={`/research/${meta.id}/${e.slug}`}
                          className="group block"
                        >
                          <div className="flex items-baseline justify-between gap-4 flex-wrap">
                            <h3 className="text-lg text-ink leading-snug group-hover:text-accent transition-colors">
                              {e.title}
                            </h3>
                            <div className="flex items-baseline gap-3 shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                              {e.initiative && <span>{e.initiative}</span>}
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
                        key={e.slug}
                        className="border-b border-paper-divider pb-3 opacity-60"
                      >
                        <div className="flex items-baseline justify-between gap-4 flex-wrap">
                          <h3 className="text-lg text-ink-secondary leading-snug">
                            {e.title}
                          </h3>
                          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted shrink-0">
                            {e.audienceTier
                              ? `${AUDIENCE_TIER_LABELS[e.audienceTier]} · forthcoming`
                              : "forthcoming"}
                          </span>
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
