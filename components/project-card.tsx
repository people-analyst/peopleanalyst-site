import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-t border-ink py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
        <header className="lg:col-span-12 flex items-baseline justify-between gap-6 flex-wrap">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight font-medium">
            {project.headline}
            {project.status === "live" && (
              <a
                href={project.href}
                className="ml-3 align-middle font-mono text-xs text-accent hover:underline"
              >
                ↗ {project.href?.replace(/^https?:\/\//, "")}
              </a>
            )}
          </h2>
          {project.commits && (
            <span className="font-mono text-xs text-ink-muted tabular-nums">
              {project.commits} commits · solo
            </span>
          )}
        </header>

        <p className="lg:col-span-8 text-lg sm:text-xl leading-relaxed text-ink-body">
          {project.tagline}
        </p>

        <aside className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-4 text-sm">
          <Field label="for">{project.audience}</Field>
          <Field label="role">{project.role}</Field>
          <Field label="status">
            <span className="font-mono text-xs uppercase tracking-wider">
              {project.status ?? "private"}
            </span>
          </Field>
          <Field label="stack">
            <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-ink-secondary">
              {project.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </Field>
        </aside>

        <div className="lg:col-span-8 space-y-6">
          <Section label="The problem">{project.problem}</Section>
          <Section label="What I built">{project.built}</Section>

          <div>
            <Label>What's novel</Label>
            <ul className="mt-2 space-y-1.5 text-ink-body leading-relaxed">
              {project.novel.map((n, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-xs text-ink-muted tabular-nums pt-1.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>

          <Section label="Outcome">{project.outcome}</Section>
        </div>

        <div className="lg:col-span-12 lg:col-start-1 mt-2 border-t border-paper-divider pt-6">
          <p className="max-w-[65ch] text-ink-body leading-relaxed italic">
            {project.story}
          </p>
        </div>
      </div>
    </article>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <p className="mt-1 text-ink-body leading-relaxed">{children}</p>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1 text-ink-body">{children}</div>
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
