import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/masthead";
import { Footer } from "@/components/footer";
import { MarkdownProse } from "@/components/markdown-prose";
import {
  getMagazineArticle,
  getMagazineArticles,
} from "@/content/magazine/_meta";

export function generateStaticParams() {
  return getMagazineArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getMagazineArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} · peopleanalyst magazine`,
    description: article.blurb,
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function MagazineArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getMagazineArticle(slug);
  if (!article) notFound();

  let body: string;
  try {
    body = readFileSync(
      join(process.cwd(), "content", "magazine", `${slug}.md`),
      "utf8",
    );
  } catch {
    notFound();
  }

  return (
    <>
      <Masthead />
      <main className="mx-auto max-w-[900px] px-6">
        <section className="py-10 lg:py-12 border-b border-paper-divider">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted mb-3">
            <Link href="/magazine" className="hover:text-accent">
              magazine
            </Link>
            {article.kicker && <span> · {article.kicker}</span>}
          </p>
          {article.subtitle && (
            <p className="text-lg sm:text-xl text-ink-body leading-snug max-w-[60ch] italic mb-3">
              {article.subtitle}
            </p>
          )}
          <div className="flex items-baseline justify-between gap-4 flex-wrap pt-1">
            <p className="font-mono text-xs text-ink-secondary">
              By <span className="text-ink">{article.byline}</span>
            </p>
            <p className="font-mono text-xs text-ink-muted tabular-nums flex items-baseline gap-3">
              {article.draft && (
                <span className="text-accent uppercase tracking-[0.15em] text-[10px]">
                  Draft
                </span>
              )}
              <span>{formatDate(article.date)}</span>
            </p>
          </div>
        </section>

        <article className="py-10 lg:py-14">
          <MarkdownProse>{body}</MarkdownProse>
        </article>

        <section className="border-t border-paper-divider py-8">
          <Link
            href="/magazine"
            className="font-mono text-xs uppercase tracking-[0.15em] text-accent hover:underline"
          >
            ← All magazine pieces
          </Link>
        </section>

        <Footer />
      </main>
    </>
  );
}
