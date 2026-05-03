import Link from "next/link";

/**
 * Live sites in the portfolio. Add to this list as new properties launch
 * (Mike's standing direction — the My Work column should grow as more sites
 * push out into the wild).
 */
const MY_WORK_LINKS: { label: string; href: string; note?: string }[] = [
  { label: "Vela", href: "https://vela.study", note: "live" },
  { label: "Namesake", href: "https://namesake.baby", note: "live" },
];

const GET_IN_TOUCH_LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "mike@peopleanalyst.com", href: "mailto:mike@peopleanalyst.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/michaelcwest/", external: true },
  { label: "GitHub — people-analyst", href: "https://github.com/people-analyst", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-paper-divider mt-24">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-8 py-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            My Work
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {MY_WORK_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-body hover:text-accent transition-colors"
                >
                  ↗ {l.label}
                  {l.note && (
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                      {l.note}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            Get in touch
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {GET_IN_TOUCH_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  {...(l.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-ink-body hover:text-accent transition-colors"
                >
                  {l.external ? "↗ " : ""}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            On this site
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>
              <Link href="/research" className="text-ink-body hover:text-accent transition-colors">
                Research
              </Link>
            </li>
            <li>
              <Link href="/magazine" className="text-ink-body hover:text-accent transition-colors">
                Magazine
              </Link>
            </li>
            <li>
              <Link href="/parts" className="text-ink-body hover:text-accent transition-colors">
                Parts
              </Link>
            </li>
            <li>
              <Link href="/consulting" className="text-ink-body hover:text-accent transition-colors">
                Consulting
              </Link>
            </li>
            <li>
              <Link href="/cv" className="text-ink-body hover:text-accent transition-colors">
                CV
              </Link>
            </li>
            <li>
              <Link href="/stack" className="text-ink-body hover:text-accent transition-colors">
                Stack
              </Link>
            </li>
            <li>
              <Link href="/fails" className="text-ink-body hover:text-accent transition-colors">
                Fails
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper-divider py-6 text-sm font-mono text-ink-muted flex flex-wrap items-baseline justify-between gap-3">
        <span>peopleanalyst.com · Mike West · Pittsburgh, PA</span>
        <span>2026</span>
      </div>
    </footer>
  );
}
