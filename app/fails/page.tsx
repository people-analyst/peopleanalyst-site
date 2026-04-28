import { Masthead } from "@/components/masthead";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fails — peopleanalyst",
  description:
    "Projects that didn't work, the ones I couldn't ship, and the lessons I'm still digesting.",
};

export default function FailsPage() {
  return (
    <>
      <Masthead />

      <main className="mx-auto max-w-[1100px] px-6 pb-24">
        <section className="py-16 sm:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <div className="lg:col-span-8 space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em]"
               style={{ color: "var(--accent-warn)" }}>
              Fails
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.05] font-medium">
              The work I couldn't ship.
            </h1>
            <p className="text-lg text-ink-body leading-relaxed max-w-[60ch]">
              A page for the projects that did not work, the bets that did not
              pay off, and the lessons I am still digesting. Every shipped
              application has a graveyard of attempts behind it; this page is
              where some of that graveyard becomes legible.
            </p>
            <p className="text-sm text-ink-muted leading-relaxed max-w-[60ch] italic">
              In progress. I am writing these out in long form rather than
              putting up a one-line list, because the lessons matter more than
              the headlines.
            </p>
          </div>

          <aside className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-4 text-sm">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                Why publish this
              </span>
              <p className="mt-2 text-ink-body leading-relaxed text-sm">
                Most portfolios are highlight reels. The hiring decision a
                serious team makes is not "can this person ship?" — it is "does
                this person know the difference between a good bet and a bad
                one, and why?" That is in the fails, not the wins.
              </p>
            </div>
          </aside>
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
