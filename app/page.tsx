import { Masthead } from "@/components/masthead";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Masthead />

      <main className="mx-auto max-w-[1100px] px-6">
        <section className="py-16 sm:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <div className="lg:col-span-8 space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              Mike West · Pittsburgh, PA
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.05] font-medium">
              Four products. One engineer. One conviction underneath.
            </h1>
            <p className="text-lg sm:text-xl text-ink-body leading-relaxed max-w-[60ch]">
              An AI-native people analytics ecosystem. A fantasy football
              intelligence platform. An intentional-baby-naming tool. An
              adaptive figurative-art platform. They look unrelated. They
              are all expressions of one bet: that AI should equip the
              human, not replace them — and that bet shows up the same way
              in every domain you take seriously.
            </p>
          </div>

          <aside className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-4 text-sm font-mono">
            <Stat label="products" value="4" />
            <Stat label="spokes underneath" value="20+" />
            <Stat label="commits, 12mo" value="5,974" />
            <Stat label="team size" value="1" />
            <p className="pt-3 text-xs text-ink-muted leading-relaxed font-sans">
              The four products are the surface. The hub-and-spoke architecture
              underneath — anonymization, metric calculation, adaptive
              measurement, codegen — is how solo cadence stays sustainable.
            </p>
          </aside>
        </section>

        <section id="projects">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted mb-2">
            Projects
          </h2>
          {PROJECTS.map((p) => (
            <ProjectCard key={p.slug} project={p} />
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-paper-divider pb-2">
      <span className="text-[10px] uppercase tracking-[0.15em] text-ink-muted">
        {label}
      </span>
      <span className="text-ink tabular-nums">{value}</span>
    </div>
  );
}
