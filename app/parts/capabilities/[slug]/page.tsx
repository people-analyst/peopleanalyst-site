import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/masthead";
import { Footer } from "@/components/footer";
import { MarkdownProse } from "@/components/markdown-prose";
import {
  CAPABILITIES,
  CAPABILITY_TYPE_LABEL,
  alsoInDisplay,
  getCapability,
  readCapabilityBody,
} from "@/lib/capabilities";

export function generateStaticParams() {
  return CAPABILITIES.filter((c) => c.status === "written").map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCapability(slug);
  if (!c) return {};
  return {
    title: `${c.title} · capability · peopleanalyst`,
    description: c.blurb,
  };
}

export default async function CapabilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) notFound();

  const body = readCapabilityBody(slug);
  const alsoIn = alsoInDisplay(capability);

  return (
    <>
      <Masthead />
      <main className="mx-auto max-w-[1100px] px-6">
        <article className="py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <header className="lg:col-span-9 space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              <Link href="/parts" className="hover:text-accent">
                parts
              </Link>{" "}
              / capability / {capability.slug}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight leading-[1.05] font-medium">
              {capability.title}
            </h1>
            <p className="text-lg text-ink-secondary leading-relaxed max-w-[65ch]">
              {capability.blurb}
            </p>
            <div className="flex flex-wrap items-baseline gap-4 pt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
              <span>{CAPABILITY_TYPE_LABEL[capability.type]}</span>
              <span>·</span>
              <span>origin: {capability.origin}</span>
              {alsoIn !== "—" && (
                <>
                  <span>·</span>
                  <span>also in: {alsoIn}</span>
                </>
              )}
              <span>·</span>
              <span>source: people-analyst/devplane/docs/CAPABILITIES/{capability.slug}.md</span>
            </div>
          </header>

          <div className="lg:col-span-9 lg:col-start-1 border-t border-paper-divider pt-8">
            {body ? (
              <MarkdownProse>{body}</MarkdownProse>
            ) : (
              <div className="research-prose">
                <p className="italic text-ink-muted">
                  Capability detail document forthcoming. Inventory metadata only.
                </p>
              </div>
            )}
          </div>
        </article>

        <Footer />
      </main>
    </>
  );
}
