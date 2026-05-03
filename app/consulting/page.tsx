import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Masthead } from "@/components/masthead";
import { Footer } from "@/components/footer";
import { MarkdownProse } from "@/components/markdown-prose";

export const metadata = {
  title: "Consulting · peopleanalyst",
  description:
    "Mike West's people-analytics consulting practice. Decision support under uncertainty, function build, platform selection, custom analytics architecture, compensation modeling, workforce planning, survey strategy, diagnostic research, AI-native augmentation, methodology coaching.",
};

const PRACTICE_STATS: { label: string; value: string }[] = [
  { label: "enterprise clients", value: "25+" },
  { label: "years independent consulting", value: "12+" },
  { label: "years in-house, Fortune 500", value: "10+" },
  { label: "years startup PM / eng (concurrent)", value: "10+" },
  { label: "book (Wiley, 2019)", value: "1" },
  { label: "published articles", value: "97+" },
  { label: "LinkedIn followers", value: "22K" },
];

type IndustryBlock = {
  label: string;
  size: string;
  clients: string[];
};

const INDUSTRY_BLOCKS: IndustryBlock[] = [
  {
    label: "Pharmaceutical / Life sciences",
    size: "Fortune 500",
    clients: ["Merck", "Pfizer", "AstraZeneca", "Otsuka", "Mars (Royal Canin)"],
  },
  {
    label: "Technology / SaaS",
    size: "Fortune 500",
    clients: ["Google", "Atlassian", "Reddit", "Zoom"],
  },
  {
    label: "Technology / SaaS",
    size: "Mid-market",
    clients: ["Instabase", "Articulate", "Udemy", "Pure Storage", "10X Genomics"],
  },
  {
    label: "Specialty retail",
    size: "Fortune 500",
    clients: ["PetSmart", "Nike"],
  },
  {
    label: "Media",
    size: "Fortune 500",
    clients: ["The New York Times"],
  },
  {
    label: "Networking / Infrastructure",
    size: "Fortune 500",
    clients: ["Juniper Networks"],
  },
  {
    label: "Healthcare",
    size: "Mid-market / Growth",
    clients: ["Cityblock Health"],
  },
];

export default function ConsultingPage() {
  const body = readFileSync(
    join(process.cwd(), "content", "consulting", "services.md"),
    "utf8",
  );

  return (
    <>
      <Masthead />

      <main className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 py-8 lg:py-10">
          <article className="lg:col-span-8 py-4">
            <MarkdownProse>{body}</MarkdownProse>
          </article>

          <aside className="lg:col-span-4 lg:border-l lg:border-paper-divider lg:pl-8 py-4">
            <div className="lg:sticky lg:top-8 space-y-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  Practice at a glance
                </p>
                <ul className="mt-3 space-y-1.5 text-sm font-mono">
                  {PRACTICE_STATS.map((s) => (
                    <li
                      key={s.label}
                      className="flex items-baseline justify-between gap-3 border-b border-paper-divider pb-2"
                    >
                      <span className="text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                        {s.label}
                      </span>
                      <span className="text-ink tabular-nums">{s.value}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-ink-muted leading-relaxed font-sans">
                  PeopleAnalyst founded 2012 (Pittsburgh, PA). In-house background
                  spans Merck, PetSmart, Google, AstraZeneca, Otsuka. Concurrent
                  startup PM / engineering at OneModel, OpenComp, AnyComp.AI,
                  Performix.
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  Selected clients by industry
                </p>
                <ul className="mt-3 space-y-3 text-sm">
                  {INDUSTRY_BLOCKS.map((b, idx) => (
                    <li
                      key={`${b.label}-${b.size}-${idx}`}
                      className="border-b border-paper-divider pb-3"
                    >
                      <div className="flex items-baseline justify-between gap-3 flex-wrap">
                        <span className="text-ink leading-snug">{b.label}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted shrink-0">
                          {b.size}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
                        {b.clients.join(" · ")}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-ink-muted leading-relaxed font-sans italic">
                  Partial list. References available on request.
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  Send a note
                </p>
                <p className="mt-2">
                  <a
                    href="mailto:mike@peopleanalyst.com"
                    className="font-mono text-sm text-accent hover:underline"
                  >
                    mike@peopleanalyst.com
                  </a>
                </p>
              </div>
            </div>
          </aside>
        </div>

        <Footer />
      </main>
    </>
  );
}
