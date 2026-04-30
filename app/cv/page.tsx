import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Masthead } from "@/components/masthead";
import { MarkdownProse } from "@/components/markdown-prose";
import { PrintButton } from "@/components/print-button";

export const metadata = {
  title: "Mike West · CV",
  description:
    "Product & Technical Leader · AI-Native Analytics Platforms · Applied Decision Science. Pittsburgh, PA.",
};

export default function CVPage() {
  const body = readFileSync(
    join(process.cwd(), "content", "cv", "resume.md"),
    "utf8",
  );

  return (
    <>
      <div className="cv-screen-only">
        <Masthead />
      </div>

      <main className="mx-auto max-w-[900px] px-6">
        <section className="cv-screen-only py-10 flex flex-wrap items-baseline justify-between gap-4 border-b border-paper-divider">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              CV
            </p>
            <p className="text-sm text-ink-secondary mt-1">
              On-page reading version. Use ↓ Save as PDF for a print-styled
              copy, or print from your browser.
            </p>
          </div>
          <PrintButton />
        </section>

        <article className="cv-document py-12">
          <MarkdownProse>{body}</MarkdownProse>
        </article>

        <footer className="cv-screen-only border-t border-paper-divider mt-12 py-10 text-sm font-mono text-ink-muted flex flex-wrap items-baseline justify-between gap-3">
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
