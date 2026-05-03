import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Masthead } from "@/components/masthead";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/content/projects";

type PortfolioStats = {
  generatedAt: string;
  repoCount: number;
  commitsLast365: number;
  linesOfCode: number;
};

function loadPortfolioStats(): PortfolioStats | null {
  try {
    const raw = readFileSync(
      join(process.cwd(), "content", "stats", "portfolio-stats.json"),
      "utf8",
    );
    return JSON.parse(raw) as PortfolioStats;
  } catch {
    return null;
  }
}

function formatLoc(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return String(n);
}

function formatGeneratedAt(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Home() {
  const stats = loadPortfolioStats();
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
              Many products. One conviction.{" "}
              <span className="text-ink-body">Feedback makes people — and A.I. — better. Data workflow is the spine.</span>
            </h1>
            <p className="text-lg sm:text-xl text-ink-body leading-relaxed max-w-[60ch]">
              A range of products across coding, fantasy decisions, naming,
              figurative art, AI-augmented authorship, performance
              analytics, people analytics, and the cross-portfolio
              infrastructure underneath. They look unrelated. They are all
              instances of the same loop — measurement on the way in,
              calibration on the way through, better decisions on the way
              out — applied to whatever domain you take seriously.
            </p>
          </div>

          <aside className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-4 text-sm font-mono">
            <Stat label="products" value={String(PROJECTS.length)} />
            <Stat label="PA Toolbox spokes" value="Many" />
            <Stat
              label="commits, last 12mo"
              value={stats ? stats.commitsLast365.toLocaleString() : "—"}
            />
            <Stat
              label="lines of code"
              value={stats ? formatLoc(stats.linesOfCode) : "—"}
            />
            <Stat
              label="repos"
              value={stats ? String(stats.repoCount) : "—"}
            />
            {stats && (
              <p className="pt-1 text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                ↻ {formatGeneratedAt(stats.generatedAt)}
              </p>
            )}
            <p className="pt-3 text-xs text-ink-muted leading-relaxed font-sans">
              The platform-level products are the surface. The hub-and-spoke
              architecture underneath — coupled with DevPlane, a kanban-based
              multi-agent multi-platform software-development integration
              layer — is how software development with a small team can be
              so productive.
            </p>
            <p className="text-xs text-ink-muted leading-relaxed font-sans italic">
              Stats refresh manually via{" "}
              <code className="font-mono text-[10px]">npm run portfolio:stats</code>
              {" "}— GitHub-sourced across all live repos under people-analyst.
              LoC is a bytes/40 estimate.
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
