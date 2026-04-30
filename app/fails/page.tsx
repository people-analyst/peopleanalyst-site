import { Masthead } from "@/components/masthead";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fails — peopleanalyst",
  description:
    "Projects that didn't work, the bets that didn't pay off, and the lessons I'm still digesting.",
};

const FAILS = [
  {
    title: "Direct realistic LoRA training on FLUX/SDXL",
    body: [
      "After several failed iterations on small-corpus FLUX/SDXL fine-tuning for realistic figurative work, I stopped tuning knobs. The problem was not parameters — it was scope. With 20–60 images, FLUX wants stylistic identity, not realism. Pushing it the other direction produced drifty adapters that captured pose and crop more than the artist's actual eye.",
      "The corrective: drop direct-realistic LoRAs from the roadmap entirely. Train stylistic adapters on real-then-stylistic-transform corpora that compound at the rate the medium allows. That pivot is now the core LoRA strategy across Vela's image production.",
      "The fail underneath the technical fail: I should have measured cluster coherence before iteration five. Calibrating confidence on new tooling means knowing when to stop iterating and reach for a different abstraction. I have a memory entry against this case so I do not lose the lesson the next time a niche ML tool refuses to do what I want.",
    ],
  },
  {
    title: "Adobe local production fork — engineering shipped, workflow did not",
    body: [
      "Three assignments — face-detection + worklist, Photoshop Actions + droplet, re-upload + provenance — landed end-to-end on paper. The pipeline exists. I have never run the full chain start to finish.",
      "The unblocker is not engineering. It is a runbook I can follow without re-discovering the click sequence each time, and a half-day of operating the chain on real images. Building production tooling without dogfooding the operator-side workflow is a failure mode I keep recreating across the portfolio. Engineers measure ship at code-merge; operators measure ship at runs-without-me-debugging-it.",
    ],
  },
  {
    title: "Third-party integration sprawl in the analytics monorepo",
    body: [
      "A consolidation pass through the people-analytics monorepo added Coda adapters, Slack adapters, a vision-API wrapper, and an api-integration agent. None of them shipped into a flow. They were dropped roughly six months later when I noticed they had never been imported by another package in the workspace.",
      "The lesson: an adapter that does not have a concrete first consumer at the time of merge will not acquire one later. Building generic integration capacity ahead of demand pulls velocity away from the surfaces that have demand. The same energy in the same window could have hardened a flow that already had users waiting.",
    ],
  },
];

export default function FailsPage() {
  return (
    <>
      <Masthead />

      <main className="mx-auto max-w-[1100px] px-6 pb-24">
        <section className="py-16 sm:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <div className="lg:col-span-8 space-y-6">
            <p
              className="font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--accent-warn)" }}
            >
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

        <section className="border-t border-ink">
          {FAILS.map((f) => (
            <article
              key={f.title}
              className="border-b border-paper-divider py-10 lg:py-14"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4">
                <header className="lg:col-span-4">
                  <h2 className="text-xl sm:text-2xl text-ink tracking-tight leading-snug font-medium">
                    {f.title}
                  </h2>
                </header>
                <div className="lg:col-span-8 space-y-4 text-base text-ink-body leading-relaxed max-w-[65ch]">
                  {f.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="border-t border-paper-divider mt-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-2">
          <p className="lg:col-span-4 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
            More forthcoming
          </p>
          <p className="lg:col-span-8 text-sm text-ink-secondary leading-relaxed max-w-[65ch] italic">
            These three are the cases where the lesson is settled. There is a
            longer list in progress — bets where the verdict is not yet in,
            partial pivots whose payoff is still unfolding, and a few outright
            losses that need more distance before I can write them honestly.
          </p>
        </section>

        <footer className="border-t border-paper-divider mt-16 py-10 text-sm font-mono text-ink-muted flex flex-wrap items-baseline justify-between gap-3">
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
