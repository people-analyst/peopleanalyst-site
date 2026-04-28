import { Masthead } from "@/components/masthead";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering stack — peopleanalyst",
  description:
    "How I build: hub-and-spoke architecture, custom infrastructure, and a four-S discipline applied to the practice itself.",
};

const STACK = {
  runtime: ["Next.js 16", "React 19", "TypeScript", "Python 3.13"],
  data: ["Postgres + pgvector", "Supabase", "BigQuery", "Drizzle"],
  ai: [
    "Anthropic API (Claude Opus / Sonnet / Haiku)",
    "OpenAI API (where lifted)",
    "Modal (GPU + LoRA training)",
    "FLUX / Stable Diffusion XL",
  ],
  infra: ["Vercel", "Modal", "GitHub Actions", "Stripe", "Playwright"],
  custom: [
    "DevPlane — multi-agent kanban + completion-block protocol",
    "Pill paradigm — typed-transformation flow language",
    "Reincarnation — RID/SID adaptive measurement",
    "Calculus — precomputed metric materialization",
    "Conductor — metadata-grounded SQL/Python codegen",
  ],
};

export default function StackPage() {
  return (
    <>
      <Masthead />

      <main className="mx-auto max-w-[1100px] px-6 pb-24">
        <section className="py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <div className="lg:col-span-8 space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              Engineering stack
            </p>
            <h1 className="text-4xl sm:text-5xl text-ink tracking-tight leading-[1.05] font-medium">
              The stack is hub-and-spoke. The discipline is four-S.
            </h1>
            <p className="text-lg text-ink-body leading-relaxed max-w-[60ch]">
              Twenty applications under one founder is only feasible with shared
              substrate: cross-cutting services consumed by multiple verticals,
              one set of types and tokens, one cadence. The visible apps are the
              spokes; the hub is what makes the cadence possible.
            </p>
          </div>
        </section>

        <section className="border-t border-ink py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10">
          <header className="lg:col-span-12">
            <h2 className="text-2xl sm:text-3xl text-ink tracking-tight font-medium">
              Hub-and-spoke architecture
            </h2>
          </header>

          <div className="lg:col-span-8 space-y-6 text-ink-body leading-relaxed">
            <p>
              <strong className="text-ink">Hub:</strong> a central registry
              (<code className="font-mono text-sm">people-analytics-toolbox</code>)
              for service discovery, shared auth, and cross-spoke navigation.
              Cross-cutting concerns live here once.
            </p>
            <p>
              <strong className="text-ink">Spokes:</strong> domain applications
              that consume hub services and add their own surface — Calculus
              for metric materialization, Conductor for codegen, Reincarnation
              for adaptive measurement, AnyComp for compensation decisions, and
              so on.
            </p>
            <p>
              <strong className="text-ink">Why it matters:</strong> every HR
              product I worked with before kept re-implementing anonymization,
              metric calculation, segmentation, and survey delivery — and
              getting each one slightly wrong. Building them once and letting
              verticals consume them is what makes a single founder productive
              at this scale.
            </p>
          </div>

          <aside className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-3 text-sm">
            <Label>Hub services</Label>
            <ul className="font-mono text-xs text-ink-secondary space-y-1.5">
              <li>data-anonymizer</li>
              <li>metric-engine-calculus</li>
              <li>survey-respondent</li>
              <li>preference-modeler</li>
              <li>segmentation-studio</li>
              <li>conductor</li>
              <li>reincarnation</li>
            </ul>
          </aside>
        </section>

        <section className="border-t border-paper-divider py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8">
          <header className="lg:col-span-12">
            <h2 className="text-2xl sm:text-3xl text-ink tracking-tight font-medium">
              Custom infrastructure
            </h2>
            <p className="mt-3 text-ink-body leading-relaxed max-w-[60ch]">
              The pieces I built when no off-the-shelf primitive was good
              enough. Each is the result of running into the same wall enough
              times to justify it.
            </p>
          </header>

          {STACK.custom.map((line) => {
            const [name, ...rest] = line.split(" — ");
            return (
              <article
                key={name}
                className="lg:col-span-6 border-t border-paper-divider pt-4"
              >
                <h3 className="font-mono text-sm text-ink mb-1">{name}</h3>
                <p className="text-sm text-ink-body leading-relaxed">
                  {rest.join(" — ")}
                </p>
              </article>
            );
          })}
        </section>

        <section className="border-t border-paper-divider py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8">
          <header className="lg:col-span-12">
            <h2 className="text-2xl sm:text-3xl text-ink tracking-tight font-medium">
              Four-S applied to the practice
            </h2>
            <p className="mt-3 text-ink-body leading-relaxed max-w-[60ch]">
              Strategy, Science, Statistics, and Systems are the four
              capabilities I argue need to coexist for analytics to land. They
              also describe how I work.
            </p>
          </header>

          <FourS
            label="Strategy"
            body="Every project gets a 'principal issue' framing — the load-bearing decision the work must make legible. Cards on this site lead with that decision, not with stack logos."
          />
          <FourS
            label="Science"
            body="Behavioral and decision science as primary inputs. Reincarnation is psychometrics in production. VOI Calculator is decision theory in production. The asymmetry thesis is cognitive science applied to AI."
          />
          <FourS
            label="Statistics"
            body="Monte Carlo, regression surrogates, IRT, Bayesian updating — used where they earn their keep. Aggregated dashboards hide variance; segment-grain models recover it."
          />
          <FourS
            label="Systems"
            body="Hub-and-spoke architecture, custom flow language (Pills), multi-agent coordination via DevPlane, deterministic-by-default tests. The system makes the science productive."
          />
        </section>

        <section className="border-t border-paper-divider py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8">
          <header className="lg:col-span-12">
            <h2 className="text-2xl sm:text-3xl text-ink tracking-tight font-medium">
              Standing stack
            </h2>
          </header>

          <StackBlock label="Runtime" items={STACK.runtime} />
          <StackBlock label="Data" items={STACK.data} />
          <StackBlock label="AI" items={STACK.ai} />
          <StackBlock label="Infra" items={STACK.infra} />
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

function FourS({ label, body }: { label: string; body: string }) {
  return (
    <div className="lg:col-span-6 border-t border-paper-divider pt-4">
      <Label>{label}</Label>
      <p className="mt-1 text-ink-body leading-relaxed text-sm">{body}</p>
    </div>
  );
}

function StackBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="lg:col-span-3 space-y-2">
      <Label>{label}</Label>
      <ul className="font-mono text-xs text-ink-secondary space-y-1.5">
        {items.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
      {children}
    </span>
  );
}
