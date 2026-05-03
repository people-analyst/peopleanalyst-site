/**
 * Per-route CTA configuration. The popout reads from this; the universal
 * decline-fallback (newsletter signup) is wired separately in the popout
 * component itself.
 *
 * To add a new per-page CTA, add an entry keyed by pathname-prefix. The
 * matcher uses startsWith() so /research/[anything] picks up the /research
 * config unless a more specific entry exists.
 */
export type CtaConfig = {
  headline: string;
  pitch: string;
  primary: {
    label: string;
    href: string;
  };
  /** Optional override for the decline link text. Defaults to "Not now". */
  declineLabel?: string;
};

const CTA_CONFIGS: Array<{ prefix: string; config: CtaConfig }> = [
  // More-specific paths must come first; matcher returns the first hit.
  {
    prefix: "/consulting",
    config: {
      headline: "Have a problem that fits one of these shapes?",
      pitch:
        "A first conversation is usually 30–45 minutes, unbilled, to scope whether the engagement makes sense before committing time on either side.",
      primary: {
        label: "Send a note",
        href: "mailto:mike@peopleanalyst.com?subject=Consulting%20inquiry",
      },
    },
  },
  {
    prefix: "/cv",
    config: {
      headline: "Like what you're reading?",
      pitch:
        "Open to founder-track placements (SPC, EF, On Deck, YC Visiting Group), senior product roles, and consulting work.",
      primary: {
        label: "Send a note",
        href: "mailto:mike@peopleanalyst.com?subject=From%20CV",
      },
    },
  },
  {
    prefix: "/research",
    config: {
      headline: "A research interest in common?",
      pitch:
        "Collaborations welcome across arcs — adaptive measurement, decision support under uncertainty, AI-human capability development, and the others. The methodology travels.",
      primary: {
        label: "Send a note",
        href: "mailto:mike@peopleanalyst.com?subject=Research%20inquiry",
      },
    },
  },
  {
    prefix: "/parts",
    config: {
      headline: "Working on something with overlapping shapes?",
      pitch:
        "These patterns came out of seven years of building. Happy to compare notes — what worked for you, what didn't, what's still open.",
      primary: {
        label: "Send a note",
        href: "mailto:mike@peopleanalyst.com?subject=Patterns%20inquiry",
      },
    },
  },
  {
    prefix: "/stack",
    config: {
      headline: "Building on a similar stack?",
      pitch:
        "If your architecture overlaps and you've hit a wall — or worked through one — I'd be curious to hear about it.",
      primary: {
        label: "Send a note",
        href: "mailto:mike@peopleanalyst.com?subject=Stack%20discussion",
      },
    },
  },
  {
    prefix: "/fails",
    config: {
      headline: "Curious about more lessons?",
      pitch:
        "The fails are public because they're load-bearing. If you're working through similar terrain, the longer story is in the rest of the site — or a note.",
      primary: {
        label: "Send a note",
        href: "mailto:mike@peopleanalyst.com?subject=From%20fails",
      },
    },
  },
];

const DEFAULT_CTA: CtaConfig = {
  headline: "Open to next steps?",
  pitch:
    "Founder-track placements, senior product roles, and consulting work — the practice is open to all three. The fastest start is a short note.",
  primary: {
    label: "Send a note",
    href: "mailto:mike@peopleanalyst.com?subject=From%20peopleanalyst.com",
  },
};

export function getCtaForRoute(pathname: string): CtaConfig {
  for (const entry of CTA_CONFIGS) {
    if (pathname.startsWith(entry.prefix)) return entry.config;
  }
  return DEFAULT_CTA;
}
