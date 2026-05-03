"use client";

import { useEffect, useState, useCallback, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { getCtaForRoute } from "@/lib/cta-config";

const STORAGE_KEY = "pa-cta-state";
const TRIGGER_DELAY_MS = 25_000; // Time-based trigger
const TRIGGER_SCROLL_PCT = 60;   // Scroll-based trigger (whichever fires first)

type StoredState = {
  /** ISO of last dismissal. Re-trigger 14 days later for variety. */
  dismissedAt?: string;
  /** ISO of subscription. Suppresses indefinitely. */
  subscribedAt?: string;
};

const SUPPRESS_AFTER_DISMISS_DAYS = 14;

function readState(): StoredState {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredState) : {};
  } catch {
    return {};
  }
}

function writeState(s: StoredState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignore quota / private-mode */
  }
}

function shouldShow(state: StoredState): boolean {
  if (state.subscribedAt) return false;
  if (state.dismissedAt) {
    const d = new Date(state.dismissedAt).getTime();
    const ageMs = Date.now() - d;
    if (ageMs < SUPPRESS_AFTER_DISMISS_DAYS * 24 * 60 * 60 * 1000) return false;
  }
  return true;
}

type Step = "hidden" | "primary" | "newsletter" | "subscribed" | "error";

export function CtaPopout() {
  const pathname = usePathname() ?? "/";
  const [step, setStep] = useState<Step>("hidden");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Trigger logic
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!shouldShow(readState())) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    let fired = false;

    const fire = () => {
      if (fired) return;
      fired = true;
      setStep("primary");
      window.removeEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
      if (timer) clearTimeout(timer);
    };

    const onScroll = () => {
      const scrolled =
        (window.scrollY + window.innerHeight) /
        Math.max(document.documentElement.scrollHeight, 1);
      if (scrolled * 100 >= TRIGGER_SCROLL_PCT) fire();
    };

    timer = setTimeout(fire, TRIGGER_DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    };
  }, [pathname]);

  // Reset when pathname changes (so the popout doesn't carry state across pages
  // — it might re-trigger if the user navigates and the suppression window has
  // not started yet).
  useEffect(() => {
    setStep("hidden");
    setEmail("");
  }, [pathname]);

  const dismiss = useCallback(() => {
    writeState({ ...readState(), dismissedAt: new Date().toISOString() });
    setStep("hidden");
  }, []);

  const declineToNewsletter = useCallback(() => {
    setStep("newsletter");
  }, []);

  const onSubscribe = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const trimmed = email.trim();
      if (!trimmed) return;
      setSubmitting(true);
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed, source: pathname }),
        });
        if (res.ok) {
          writeState({
            ...readState(),
            subscribedAt: new Date().toISOString(),
          });
          setStep("subscribed");
          setTimeout(() => setStep("hidden"), 3000);
        } else {
          setStep("error");
        }
      } catch {
        setStep("error");
      } finally {
        setSubmitting(false);
      }
    },
    [email, pathname],
  );

  if (step === "hidden") return null;

  const cta = getCtaForRoute(pathname);

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-[calc(100vw-2rem)] sm:max-w-[400px] bg-paper-card border border-ink shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
      role="dialog"
      aria-label="Get in touch"
    >
      <div className="p-5 sm:p-6 space-y-4">
        {step === "primary" && (
          <>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-ink-muted hover:text-ink transition-colors font-mono text-base"
            >
              ✕
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
              From Mike
            </p>
            <h3 className="text-base sm:text-lg text-ink leading-snug font-medium">
              {cta.headline}
            </h3>
            <p className="text-sm text-ink-body leading-relaxed">{cta.pitch}</p>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pt-1">
              <a
                href={cta.primary.href}
                onClick={() => {
                  // Subscribing-via-mailto counts as engagement; suppress popup
                  writeState({
                    ...readState(),
                    dismissedAt: new Date().toISOString(),
                  });
                  setStep("hidden");
                }}
                className="inline-block px-4 py-2 bg-ink text-paper font-mono text-xs uppercase tracking-[0.15em] hover:bg-accent transition-colors text-center"
              >
                {cta.primary.label} →
              </a>
              <button
                type="button"
                onClick={declineToNewsletter}
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-secondary hover:text-accent transition-colors"
              >
                {cta.declineLabel ?? "Not now"}
              </button>
            </div>
          </>
        )}

        {step === "newsletter" && (
          <>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-ink-muted hover:text-ink transition-colors font-mono text-base"
            >
              ✕
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
              Stay in the loop
            </p>
            <h3 className="text-base sm:text-lg text-ink leading-snug font-medium">
              Want product + research updates instead?
            </h3>
            <p className="text-sm text-ink-body leading-relaxed">
              Low-frequency. New research, new shipping, occasional notes
              from the field. No marketing.
            </p>
            <form onSubmit={onSubscribe} className="space-y-3 pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 bg-paper border border-paper-divider text-sm text-ink focus:border-accent focus:outline-none font-mono"
                autoComplete="email"
              />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
                <button
                  type="submit"
                  disabled={submitting || !email.trim()}
                  className="inline-block px-4 py-2 bg-ink text-paper font-mono text-xs uppercase tracking-[0.15em] hover:bg-accent transition-colors disabled:opacity-50 text-center"
                >
                  {submitting ? "Subscribing…" : "Subscribe →"}
                </button>
                <button
                  type="button"
                  onClick={dismiss}
                  className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-secondary hover:text-accent transition-colors"
                >
                  No thanks
                </button>
              </div>
            </form>
          </>
        )}

        {step === "subscribed" && (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Subscribed
            </p>
            <h3 className="text-base sm:text-lg text-ink leading-snug font-medium">
              Thanks — you're on the list.
            </h3>
            <p className="text-sm text-ink-body leading-relaxed">
              First note will land when there's something worth saying.
            </p>
          </>
        )}

        {step === "error" && (
          <>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-ink-muted hover:text-ink transition-colors font-mono text-base"
            >
              ✕
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-warn">
              Hiccup
            </p>
            <h3 className="text-base sm:text-lg text-ink leading-snug font-medium">
              Something went wrong on our end.
            </h3>
            <p className="text-sm text-ink-body leading-relaxed">
              Try again in a moment, or send a note directly to{" "}
              <a
                href="mailto:mike@peopleanalyst.com"
                className="text-accent hover:underline"
              >
                mike@peopleanalyst.com
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setStep("newsletter")}
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent hover:underline"
            >
              ← Try again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
