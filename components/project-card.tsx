import Image from "next/image";
import type { Project, Screenshot } from "@/content/projects";

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

        <div className="lg:col-span-8 space-y-6">
          <p className="text-lg sm:text-xl leading-relaxed text-ink-body">
            {project.tagline}
          </p>
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

        <div className="lg:col-span-12 lg:col-start-1 mt-2 border-t border-paper-divider pt-6">
          <p className="max-w-[65ch] text-ink-body leading-relaxed italic">
            {project.story}
          </p>
        </div>

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="lg:col-span-12 lg:col-start-1 mt-2 border-t border-paper-divider pt-8">
            <Label>Selected surfaces</Label>
            <ScreenshotStrip screenshots={project.screenshots} />
          </div>
        )}
      </div>
    </article>
  );
}

function ScreenshotStrip({ screenshots }: { screenshots: Screenshot[] }) {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {screenshots.map((s) => (
        <a
          key={s.src}
          href={s.src}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="relative aspect-[16/10] overflow-hidden border border-paper-divider bg-paper-card">
            <Image
              src={s.src}
              alt={s.caption}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
              className="object-cover object-top transition-opacity group-hover:opacity-90"
            />
          </div>
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted leading-snug">
            {s.caption}
          </p>
        </a>
      ))}
    </div>
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
