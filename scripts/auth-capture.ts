#!/usr/bin/env -S npx tsx
/**
 * Interactive Playwright login → storage-state save.
 *
 * Opens a visible Chrome window at the login URL. The operator logs in
 * normally (any auth method — email/password, OAuth, magic link). The
 * script auto-detects success by polling the URL: it requires the page
 * to return to the *app's own host* (e.g. mfl-gm-consol.replit.app) AND
 * be off any sign-in / sign-up / OAuth path before saving.
 *
 *   npm run portfolio:auth -- <slug> <login-url>
 */

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const slug = process.argv[2];
const loginUrl = process.argv[3];

if (!slug || !loginUrl) {
  console.error(
    "Usage: npm run portfolio:auth -- <slug> <login-url>\n" +
      "Example: npm run portfolio:auth -- fourth-and-two https://mfl-gm-consol.replit.app/sign-in",
  );
  process.exit(1);
}

const STORAGE_PATH = join(__dirname, "..", ".auth", `${slug}.json`);
const APP_HOST = new URL(loginUrl).host;

// Path markers that mean "still mid-login on the app's own domain."
const SIGN_IN_PATH_MARKERS = [
  "/sign-in",
  "/sign-up",
  "/signin",
  "/signup",
  "/login",
  "/oauth",
  "/callback",
  "/sso",
  "/auth/",
];

const SETTLE_MS = 4000;
const POLL_MS = 800;
const MAX_WAIT_MS = 5 * 60 * 1000;

function isPostLogin(url: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  // Must be back on the app's own host (not Google / Clerk / OAuth provider).
  if (parsed.host !== APP_HOST) return false;
  // Must not be on a sign-in path.
  if (SIGN_IN_PATH_MARKERS.some((m) => parsed.pathname.includes(m))) return false;
  return true;
}

async function main() {
  mkdirSync(dirname(STORAGE_PATH), { recursive: true });

  console.log(`\n🔐 Opening browser at ${loginUrl}`);
  console.log(`   App host: ${APP_HOST}`);
  console.log(`   Log in via any method. Auto-saves once you're back on ${APP_HOST}\n`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(loginUrl);

  const startedAt = Date.now();
  let postLoginSince: number | null = null;
  let lastReportedUrl = "";

  while (true) {
    if (Date.now() - startedAt > MAX_WAIT_MS) {
      console.error(`\n⏱ Timed out after ${MAX_WAIT_MS / 1000}s waiting for login.`);
      await browser.close();
      process.exit(1);
    }

    let url = "";
    try {
      url = page.url();
    } catch {
      console.error("\n✗ Browser closed before login completed. No session saved.");
      process.exit(1);
    }

    const post = isPostLogin(url);

    if (!post) {
      if (postLoginSince !== null) {
        console.log(`   ↩ Back on auth flow (URL: ${url}); resetting stability timer.`);
      }
      postLoginSince = null;
      lastReportedUrl = "";
      await page.waitForTimeout(POLL_MS);
      continue;
    }

    if (postLoginSince === null) {
      postLoginSince = Date.now();
      lastReportedUrl = url;
      console.log(`   ↗ Detected app URL post-login: ${url}`);
      console.log(`   Holding ${SETTLE_MS / 1000}s to confirm stability...`);
    } else if (url !== lastReportedUrl) {
      // URL changed within the app — keep timer running, just note it.
      lastReportedUrl = url;
    }

    if (Date.now() - postLoginSince >= SETTLE_MS) {
      console.log(`\n✓ Login confirmed. Final URL: ${url}`);
      break;
    }

    await page.waitForTimeout(POLL_MS);
  }

  await context.storageState({ path: STORAGE_PATH });
  console.log(`✓ Storage state saved to ${STORAGE_PATH}\n`);

  await browser.close();
}

main().catch(async (e) => {
  console.error(e);
  process.exit(1);
});
