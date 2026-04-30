import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/masthead";
import { MarkdownProse } from "@/components/markdown-prose";
import {
  CATEGORIES,
  MANIFEST,
  getEntry,
  getProduct,
  isRawSource,
  readEntryBody,
} from "@/lib/research";
import { AUDIENCE_TIER_LABELS } from "@/content/research/_taxonomy";

export function generateStaticParams() {
  return MANIFEST.map((e) => ({ product: e.product, slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string; slug: string }>;
}) {
  const { product, slug } = await params;
  const entry = getEntry(product, slug);
  const meta = getProduct(product);
  if (!entry || !meta) return {};
  return {
    title: `${entry.title} · ${meta.label} research`,
    description: entry.summary,
  };
}

export default async function ResearchEntry({
  params,
}: {
  params: Promise<{ product: string; slug: string }>;
}) {
  const { product, slug } = await params;
  const entry = getEntry(product, slug);
  const meta = getProduct(product);
  if (!entry || !meta) notFound();

  const category = CATEGORIES.find((c) => c.id === entry.category);
  const body = readEntryBody(entry);

  return (
    <>
      <Masthead />
      <main className="mx-auto max-w-[1100px] px-6">
        <article className="py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <header className="lg:col-span-9 space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              <Link href="/research" className="hover:text-accent">
                research
              </Link>{" "}
              /{" "}
              <Link href={`/research/${meta.id}`} className="hover:text-accent">
                {meta.id}
              </Link>{" "}
              / {category?.label.toLowerCase() ?? entry.category}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight leading-[1.05] font-medium">
              {entry.title}
            </h1>
            {entry.summary && (
              <p className="text-lg text-ink-secondary leading-relaxed max-w-[65ch]">
                {entry.summary}
              </p>
            )}
            <div className="flex flex-wrap items-baseline gap-4 pt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
              <span>{meta.label}</span>
              <span>·</span>
              <span>{category?.label ?? entry.category}</span>
              {entry.audienceTier && (
                <>
                  <span>·</span>
                  <span>{AUDIENCE_TIER_LABELS[entry.audienceTier]}</span>
                </>
              )}
              {entry.source && (
                <>
                  <span>·</span>
                  <span>
                    source: {entry.source.repo}/{entry.source.path}
                  </span>
                </>
              )}
            </div>
          </header>

          <div className="lg:col-span-9 lg:col-start-1 border-t border-paper-divider pt-8">
            {body ? (
              isRawSource(entry) ? (
                <pre className="research-raw">
                  <code>{body}</code>
                </pre>
              ) : (
                <MarkdownProse>{body}</MarkdownProse>
              )
            ) : (
              <div className="research-prose">
                <p className="italic text-ink-muted">
                  This piece is forthcoming. {entry.summary ? "" : null}
                </p>
                {entry.summary && (
                  <p className="text-ink-secondary">{entry.summary}</p>
                )}
                <p className="text-ink-muted text-sm">
                  An assignment to populate this slot exists in the relevant
                  source repo.
                </p>
              </div>
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
