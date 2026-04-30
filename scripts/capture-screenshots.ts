#!/usr/bin/env -S npx tsx
/**
 * Captures screenshots of live product surfaces for the portfolio site.
 *
 * Re-run with `npm run portfolio:capture` after meaningful product updates.
 * Output: /public/portfolio/<product>/<slug>-desktop.png (and -mobile.png if
 * declared in the manifest).
 *
 * NSFW gate: Vela's library includes figurative nudes. Only content-safe
 * surfaces are listed below. The /play surface — premier feature — is
 * blocked pending a safe-image demo mode (see follow-up doc).
 */

import { chromium, type Page } from "playwright";
import { mkdirSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";

type Breakpoint = "desktop" | "mobile";

type Surface = {
  product: "vela" | "namesake";
  slug: string;
  url: string;
  caption: string;
  breakpoints: Breakpoint[];
  /** Wait additional ms after networkidle (for animations, font swap) */
  settleMs?: number;
  /** Optional pre-screenshot action sequence */
  prepare?: (page: Page) => Promise<void>;
};

const VIEWPORTS: Record<Breakpoint, { width: number; height: number }> = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const SURFACES: Surface[] = [
  // ===== VELA — content-safe only =====
  {
    product: "vela",
    slug: "landing",
    url: "https://vela.study/",
    caption: "Vela landing — the contemplative entry point.",
    breakpoints: ["desktop"],
    settleMs: 1200,
  },
  {
    product: "vela",
    slug: "about",
    url: "https://vela.study/about",
    caption: "About — what Vela is for.",
    breakpoints: ["desktop"],
    settleMs: 800,
  },
  // /topics returns 404 in production — removed.
  {
    product: "vela",
    slug: "writers",
    url: "https://vela.study/writers",
    caption: "Writers index.",
    breakpoints: ["desktop"],
    settleMs: 800,
  },
  {
    product: "vela",
    slug: "membership",
    url: "https://vela.study/membership",
    caption: "Membership page — Stripe-backed Member tier.",
    breakpoints: ["desktop"],
    settleMs: 800,
  },

  // ===== NAMESAKE =====
  {
    product: "namesake",
    slug: "landing",
    url: "https://namesake.baby/",
    caption: "Namesake landing.",
    breakpoints: ["desktop"],
    settleMs: 1200,
  },
  {
    product: "namesake",
    slug: "name-wizard",
    url: "https://namesake.baby/name-cascade",
    caption: "Name Wizard — guided 20-minute selection process.",
    breakpoints: ["desktop"],
    settleMs: 1000,
  },
  {
    product: "namesake",
    slug: "names-index",
    url: "https://namesake.baby/names",
    caption: "Names index — 47K names with SSA popularity.",
    breakpoints: ["desktop"],
    settleMs: 1000,
  },
  {
    product: "namesake",
    slug: "name-profile",
    url: "https://namesake.baby/names/rowan",
    caption: "Name profile — per-name AI intelligence with citation chains.",
    breakpoints: ["desktop"],
    settleMs: 1200,
  },
  {
    product: "namesake",
    slug: "tournament",
    url: "https://namesake.baby/tournament",
    caption: "Name Tournament — bracket-style preference elicitation.",
    breakpoints: ["desktop"],
    settleMs: 1000,
  },
  {
    product: "namesake",
    slug: "collections",
    url: "https://namesake.baby/my-names",
    caption: "Collections — saved name lists.",
    breakpoints: ["desktop"],
    settleMs: 800,
  },
];

const PUBLIC_ROOT = join(__dirname, "..", "public", "portfolio");

async function captureSurface(page: Page, surface: Surface, breakpoint: Breakpoint) {
  const viewport = VIEWPORTS[breakpoint];
  await page.setViewportSize(viewport);

  const targetDir = join(PUBLIC_ROOT, surface.product);
  mkdirSync(targetDir, { recursive: true });
  const outPath = join(targetDir, `${surface.slug}-${breakpoint}.png`);

  try {
    await page.goto(surface.url, { waitUntil: "networkidle", timeout: 30000 });
  } catch (e) {
    console.warn(`[skip] ${surface.product}/${surface.slug} (${breakpoint}) — ${(e as Error).message.split("\n")[0]}`);
    return { ok: false };
  }

  if (surface.prepare) await surface.prepare(page);
  if (surface.settleMs) await page.waitForTimeout(surface.settleMs);

  await page.screenshot({ path: outPath, fullPage: false });
  console.log(`[ok]   ${surface.product}/${surface.slug}-${breakpoint}.png`);
  return { ok: true };
}

async function main() {
  if (existsSync(PUBLIC_ROOT)) {
    rmSync(PUBLIC_ROOT, { recursive: true, force: true });
  }
  mkdirSync(PUBLIC_ROOT, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    deviceScaleFactor: 1,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36 PortfolioCapture/1.0",
  });
  const page = await context.newPage();

  let ok = 0;
  let failed = 0;

  for (const surface of SURFACES) {
    for (const bp of surface.breakpoints) {
      const result = await captureSurface(page, surface, bp);
      if (result.ok) ok++;
      else failed++;
    }
  }

  await browser.close();
  console.log(`\nDone. ${ok} captured, ${failed} failed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
