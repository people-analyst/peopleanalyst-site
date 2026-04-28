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
              Twenty-plus shipped applications under one founder.
            </h1>
            <p className="text-lg sm:text-xl text-ink-body leading-relaxed max-w-[60ch]">
              AI-native people analytics, an adaptive figurative-art platform,
              fantasy football intelligence, intentional baby naming, and the
              research infrastructure that ties them together. Solo build,
              hub-and-spoke architecture, written for production.
            </p>
          </div>

          <aside className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-4 text-sm font-mono">
            <Stat label="active projects" value="20+" />
            <Stat label="commits, 12mo" value="5,974" />
            <Stat label="repos" value="22" />
            <Stat label="team size" value="1" />
            <p className="pt-3 text-xs text-ink-muted leading-relaxed font-sans">
              I build the way most teams of four would. Single-author cadence,
              multi-product ecosystem, decision-science discipline.
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
