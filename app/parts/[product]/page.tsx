import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/masthead";
import { MarkdownProse } from "@/components/markdown-prose";
import { getPartsProduct, getPartsProducts, readPartsBody } from "@/lib/parts";
import type { PartsProductId } from "@/content/parts/_meta";

export function generateStaticParams() {
  return getPartsProducts().map((p) => ({ product: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const p = getPartsProduct(product);
  if (!p) return {};
  return {
    title: `${p.label} reusable patterns · peopleanalyst`,
    description: p.blurb,
  };
}

export default async function PartsProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const p = getPartsProduct(product);
  if (!p) notFound();

  const body = readPartsBody(p.id as PartsProductId);

  return (
    <>
      <Masthead />
      <main className="mx-auto max-w-[1100px] px-6">
        <article className="py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <header className="lg:col-span-9 space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              <Link href="/parts" className="hover:text-accent">
                parts
              </Link>{" "}
              / {p.id}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight leading-[1.05] font-medium">
              {p.label} — reusable patterns
            </h1>
            <p className="text-lg text-ink-secondary leading-relaxed max-w-[65ch]">
              {p.blurb}
            </p>
            <div className="flex flex-wrap items-baseline gap-4 pt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
              <span>{p.patternCount} patterns</span>
              <span>·</span>
              <span>source: {p.sourceRepoLabel}/docs/REUSABLE_PATTERNS.md</span>
            </div>
          </header>

          <div className="lg:col-span-9 lg:col-start-1 border-t border-paper-divider pt-8">
            {body ? (
              <MarkdownProse>{body}</MarkdownProse>
            ) : (
              <p className="text-ink-muted italic">Pattern document forthcoming.</p>
            )}
          </div>
        </article>

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
