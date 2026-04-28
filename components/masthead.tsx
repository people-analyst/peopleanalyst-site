import Link from "next/link";

export function Masthead() {
  return (
    <header className="border-b border-ink">
      <div className="mx-auto max-w-[1100px] px-6 py-5 flex items-baseline justify-between gap-6">
        <Link
          href="/"
          className="font-mono text-sm sm:text-base tracking-tight text-ink hover:text-accent transition-colors"
        >
          peopleanalyst
        </Link>

        <nav className="flex items-baseline gap-5 text-xs sm:text-sm font-mono text-ink-secondary">
          <Link href="#projects" className="hover:text-accent transition-colors">
            projects
          </Link>
          <Link href="/stack" className="hover:text-accent transition-colors">
            stack
          </Link>
          <Link href="/fails" className="hover:text-accent transition-colors">
            fails
          </Link>
          <a
            href="mailto:mike@peopleanalyst.com"
            className="hover:text-accent transition-colors"
          >
            contact
          </a>
        </nav>
      </div>
    </header>
  );
}
