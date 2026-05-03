import Link from "next/link";
import { Masthead } from "@/components/masthead";
import { Footer } from "@/components/footer";
import { getMagazineArticles } from "@/content/magazine/_meta";

export const metadata = {
  title: "Magazine · peopleanalyst",
  description:
    "Long-form essays on the principal-issues thesis, AI–human interaction research, and the methodology spine underneath the PeopleAnalyst portfolio. A working magazine — not yet on the masthead.",
};

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function MagazineIndex() {
  const articles = getMagazineArticles();

  return (
    <>
      <Masthead />
      <main className="mx-auto max-w-[1100px] px-6">
        <section className="py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <div className="lg:col-span-8 space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              Magazine · long-form
            </p>
            <h1 className="text-4xl sm:text-5xl text-ink tracking-tight leading-[1.05] font-medium">
              The work, written long.
            </h1>
            <p className="text-lg sm:text-xl text-ink-body leading-relaxed max-w-[60ch]">
              A working magazine for the principal-issues thesis,
              AI–human-interaction research, and the methodology spine
              underneath the PeopleAnalyst portfolio. Pieces appear when
              they're worth saying. The publication cadence is the slowest
              part of the work; the speed comes from getting the load-bearing
              set right first.
            </p>
            <p className="text-base text-ink-body leading-relaxed max-w-[60ch]">
              Currently a small set of pieces, growing as the program does.
              Borrowing infrastructure (and editorial discipline) from{" "}
              <a
                href="https://vela.study/magazine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Vela's magazine
              </a>
              , oriented to a different topic domain.
            </p>
          </div>

          <aside className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-3 text-sm font-mono">
            <p className="text-[10px] uppercase tracking-[0.15em] text-ink-muted">
              Topics
            </p>
            <div className="space-y-2 text-xs text-ink-body leading-relaxed">
              <div className="border-b border-paper-divider pb-2">
                Methodology — the principal-issues thesis, RCI, the four-S
                synthesis
              </div>
              <div className="border-b border-paper-divider pb-2">
                AI–human interaction — capability development, coordination
                cost, longitudinal effects
              </div>
              <div className="border-b border-paper-divider pb-2">
                Field notes — case-grounded essays from the consulting
                practice
              </div>
            </div>
          </aside>
        </section>

        <section className="border-t border-ink">
          {articles.map((a) => (
            <article
              key={a.slug}
              className="border-b border-paper-divider py-12 lg:py-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4">
                <header className="lg:col-span-12 flex items-baseline justify-between gap-6 flex-wrap">
                  {a.kicker && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {a.kicker}
                    </p>
                  )}
                  <span className="font-mono text-xs text-ink-muted tabular-nums flex items-baseline gap-3">
                    {a.draft && (
                      <span className="text-accent uppercase tracking-[0.15em] text-[10px]">
                        Draft
                      </span>
                    )}
                    <span>{formatDate(a.date)}</span>
                  </span>
                </header>

                <Link
                  href={`/magazine/${a.slug}`}
                  className="lg:col-span-12 group block"
                >
                  <h2 className="text-2xl sm:text-3xl text-ink tracking-tight font-medium group-hover:text-accent transition-colors mb-3 leading-tight">
                    {a.title}
                  </h2>
                  {a.subtitle && (
                    <p className="text-base sm:text-lg text-ink-body leading-relaxed mb-3 max-w-[65ch]">
                      {a.subtitle}
                    </p>
                  )}
                  <p className="text-sm text-ink-secondary leading-relaxed max-w-[65ch]">
                    {a.blurb}
                  </p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-accent group-hover:underline">
                    Read · by {a.byline} →
                  </p>
                </Link>
              </div>
            </article>
          ))}
        </section>

        <Footer />
      </main>
    </>
  );
}
