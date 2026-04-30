import Link from "next/link";
import { Masthead } from "@/components/masthead";
import { Footer } from "@/components/footer";
import { getCrossProductPatterns, getPartsProducts } from "@/lib/parts";
import {
  capabilitiesByTier,
  alsoInDisplay,
  CAPABILITY_TYPE_LABEL,
  type Capability,
} from "@/lib/capabilities";

export const metadata = {
  title: "Parts · peopleanalyst",
  description:
    "Reusable building blocks across the portfolio — application-level capabilities (system functions reused across products) and code-level engineering patterns.",
};

export default function PartsIndex() {
  const products = getPartsProducts();
  const crossPatterns = getCrossProductPatterns();
  const recurring = capabilitiesByTier("recurring");
  const singleOrigin = capabilitiesByTier("single-origin");

  return (
    <>
      <Masthead />
      <main className="mx-auto max-w-[1100px] px-6">
        <section className="py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <div className="lg:col-span-8 space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              Parts · all properties
            </p>
            <h1 className="text-4xl sm:text-5xl text-ink tracking-tight leading-[1.05] font-medium">
              The shapes that hardened across products.
            </h1>
            <p className="text-lg sm:text-xl text-ink-body leading-relaxed max-w-[60ch]">
              Two grains of reuse. <strong className="text-ink">Capabilities</strong>{" "}
              are application-level functional building blocks — survey delivery,
              data warehousing, profile pages, Monte Carlo engines. Each one is
              something a PM would put on a feature list.{" "}
              <strong className="text-ink">Patterns</strong> are the
              engineering techniques underneath — domain-agnostic code shapes
              that compose into capabilities. A capability is usually an
              assembly of several patterns.
            </p>
            <p className="font-mono text-xs text-ink-muted">
              <a href="#capabilities" className="hover:text-accent transition-colors">
                ↓ Capabilities
              </a>
              <span className="mx-3 text-ink-muted">·</span>
              <a href="#patterns" className="hover:text-accent transition-colors">
                ↓ Patterns
              </a>
            </p>
          </div>

          <aside className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-3 text-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
              Why this matters
            </p>
            <p className="text-ink-body leading-relaxed text-sm">
              Solo cadence at the scale of seventeen repos is only feasible
              when functional building blocks get named, hardened, and reused.
              Both grains are documented because both are how new apps get
              stood up cheaply — capabilities tell you what whole feature you
              already own; patterns tell you how to assemble one when you
              don't.
            </p>
          </aside>
        </section>

        {/* ============== CAPABILITIES (top) ============== */}
        <section id="capabilities" className="border-t border-ink py-12 lg:py-16 scroll-mt-12">
          <header className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-2 mb-10">
            <div className="lg:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                Capabilities
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl text-ink tracking-tight font-medium leading-tight">
                Application-level building blocks.
              </h2>
            </div>
            <p className="lg:col-span-8 text-base text-ink-body leading-relaxed max-w-[65ch]">
              When standing up a new app in this portfolio, the first
              question is <em>what's already here that I can reuse whole?</em>{" "}
              These are the answers — survey respondent interfaces, profile
              pages, segmentation engines, statistical analysis. Each lives
              in an origin repo and shows up wherever else it's been needed.
              Capabilities can stay domain-aware (unlike patterns); the data
              shape and surface shape are what transfers.
            </p>
          </header>

          {/* Recurring */}
          <article className="mb-12">
            <header className="flex items-baseline justify-between gap-4 flex-wrap mb-4 pb-3 border-b border-paper-divider">
              <h3 className="text-lg text-ink font-medium tracking-tight">
                Recurring across products
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                3+ repos · highest leverage
              </p>
            </header>
            <ul className="space-y-3">
              {recurring.map((c) => (
                <CapabilityRow key={c.slug} capability={c} />
              ))}
            </ul>
          </article>

          {/* Single-origin */}
          <article>
            <header className="flex items-baseline justify-between gap-4 flex-wrap mb-4 pb-3 border-b border-paper-divider">
              <h3 className="text-lg text-ink font-medium tracking-tight">
                Strong single-origin
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                1–2 repos · clearly extractable
              </p>
            </header>
            <ul className="space-y-3">
              {singleOrigin.map((c) => (
                <CapabilityRow key={c.slug} capability={c} />
              ))}
            </ul>
          </article>
        </section>

        {/* ============== PATTERNS (below) ============== */}
        <section id="patterns" className="border-t border-ink py-12 lg:py-16 scroll-mt-12">
          <header className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-2 mb-10">
            <div className="lg:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                Patterns
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl text-ink tracking-tight font-medium leading-tight">
                Engineering techniques.
              </h2>
            </div>
            <p className="lg:col-span-8 text-base text-ink-body leading-relaxed max-w-[65ch]">
              Code-level shapes — domain-agnostic, copy-paste-ready. Each
              repo carries a <code className="font-mono text-[0.95em]">REUSABLE_PATTERNS.md</code>{" "}
              of production-validated techniques stripped of business
              context. The most interesting signal is the overlap: where
              the same shape was independently arrived at across two or
              three codebases. That is where architectural conviction lives.
            </p>
          </header>

          {/* Cross-product convictions */}
          <article className="mb-16">
            <header className="flex items-baseline justify-between gap-4 flex-wrap mb-4 pb-3 border-b border-paper-divider">
              <h3 className="text-lg text-ink font-medium tracking-tight">
                Cross-product convictions
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                Patterns named in 2+ repos
              </p>
            </header>

            <ul className="space-y-6">
              {crossPatterns.map((p) => (
                <li
                  key={p.title}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-3 border-t border-paper-divider pt-6"
                >
                  <div className="lg:col-span-4">
                    <h4 className="text-lg text-ink leading-snug font-medium">
                      {p.title}
                    </h4>
                    <ul className="mt-3 space-y-1.5">
                      {p.appearsIn.map((a) => (
                        <li
                          key={`${a.product}-${a.numberLabel}`}
                          className="font-mono text-[11px] text-ink-secondary leading-snug"
                        >
                          <Link
                            href={`/parts/${a.product}`}
                            className="text-accent hover:underline"
                          >
                            {a.product}
                          </Link>{" "}
                          {a.numberLabel}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="lg:col-span-8 text-base text-ink-body leading-relaxed max-w-[65ch]">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </article>

          {/* Per-product catalogs */}
          <article>
            <header className="flex items-baseline justify-between gap-4 flex-wrap mb-4 pb-3 border-b border-paper-divider">
              <h3 className="text-lg text-ink font-medium tracking-tight">
                Per-product pattern catalogs
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                Full repo pattern documents
              </p>
            </header>

            {products.map((p) => (
              <article
                key={p.id}
                className="border-b border-paper-divider py-8 lg:py-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4">
                  <header className="lg:col-span-12 flex items-baseline justify-between gap-6 flex-wrap">
                    <h4 className="text-xl sm:text-2xl text-ink tracking-tight font-medium">
                      <Link
                        href={`/parts/${p.id}`}
                        className="hover:text-accent transition-colors"
                      >
                        {p.label}
                      </Link>
                    </h4>
                    <span className="font-mono text-xs text-ink-muted tabular-nums">
                      {p.patternCount} patterns
                    </span>
                  </header>

                  <p className="lg:col-span-8 text-base leading-relaxed text-ink-body max-w-[65ch]">
                    {p.blurb}
                  </p>

                  <div className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-6 space-y-2">
                    <Link
                      href={`/parts/${p.id}`}
                      className="block font-mono text-xs uppercase tracking-[0.15em] text-accent hover:underline"
                    >
                      → full pattern catalog
                    </Link>
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                      source: {p.sourceRepoLabel}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </article>
        </section>

        <Footer />
      </main>
    </>
  );
}

function CapabilityRow({ capability }: { capability: Capability }) {
  const isStub = capability.status === "stub";
  const alsoIn = alsoInDisplay(capability);

  const inner = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-1 items-baseline">
      <div className="lg:col-span-5 flex items-baseline gap-3">
        <h4 className="text-base text-ink leading-snug">
          {capability.title}
        </h4>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted shrink-0">
          {CAPABILITY_TYPE_LABEL[capability.type]}
        </span>
        {isStub && (
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted italic shrink-0">
            stub
          </span>
        )}
      </div>
      <p className="lg:col-span-7 text-sm text-ink-body leading-snug">
        {capability.blurb}
      </p>
      <div className="lg:col-span-12 flex items-baseline gap-4 flex-wrap font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted pt-1">
        <span>origin: {capability.origin}</span>
        {alsoIn !== "—" && (
          <>
            <span>·</span>
            <span>also in: {alsoIn}</span>
          </>
        )}
      </div>
    </div>
  );

  return (
    <li className="border-b border-paper-divider pb-3">
      {isStub ? (
        <div className="opacity-60">{inner}</div>
      ) : (
        <Link
          href={`/parts/capabilities/${capability.slug}`}
          className="block group hover:opacity-100"
        >
          {inner}
        </Link>
      )}
    </li>
  );
}
