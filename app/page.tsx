import { Masthead } from "@/components/masthead";
import { Footer } from "@/components/footer";
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
              Five products. One conviction.{" "}
              <span className="text-ink-body">Feedback makes people — and A.I. — better. Data workflow is the spine.</span>
            </h1>
            <p className="text-lg sm:text-xl text-ink-body leading-relaxed max-w-[60ch]">
              An AI-native people analytics ecosystem. A multi-agent
              development cockpit. A fantasy football intelligence
              platform. An intentional-baby-naming tool. An adaptive
              figurative-art platform. They look unrelated. They are all
              instances of the same loop — measurement on the way in,
              calibration on the way through, better behavior on the way
              out — applied to whatever domain you take seriously.
            </p>
          </div>

          <aside className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-4 text-sm font-mono">
            <Stat label="products" value="5" />
            <Stat label="spokes underneath" value="20" />
            <Stat label="commits, 12mo" value="5,974" />
            <p className="pt-3 text-xs text-ink-muted leading-relaxed font-sans">
              The five products are the surface. The hub-and-spoke architecture
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

        <Footer />
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
