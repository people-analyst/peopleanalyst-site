#!/usr/bin/env -S npx tsx
/**
 * Interactive Playwright login → storage-state save.
 *
 * Run once to create an authenticated session for a Replit/Clerk-protected
 * app, then use the saved storage state in `capture-screenshots.ts` to
 * capture authed routes without re-logging-in.
 *
 *   npm run portfolio:auth -- fourth-and-two https://mfl-gm-consol.replit.app/sign-in
 *
 * Args:
 *   1. Storage-state slug (becomes `.auth/<slug>.json`)
 *   2. Login URL (where the sign-in form lives)
 *
 * The script opens a visible Chrome window. You log in normally; once the
 * URL changes to a logged-in route, press Enter in the terminal to save
 * the storage state and exit.
 *
 * Output: `.auth/<slug>.json` — gitignored. Treat like a credential.
 */

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { createInterface } from "node:readline";

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

async function main() {
  mkdirSync(dirname(STORAGE_PATH), { recursive: true });

  console.log(`\n🔐 Opening browser at ${loginUrl}`);
  console.log(`   Log in normally. The browser window stays open.\n`);
  console.log(`   When you see your authenticated dashboard, come back here`);
  console.log(`   and press Enter to save the session.\n`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(loginUrl);

  // Wait for the operator to press Enter
  await new Promise<void>((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    rl.question("   [Enter] when logged in (or 'q' + Enter to abort): ", (a) => {
      rl.close();
      if (a.trim().toLowerCase() === "q") {
        console.log("Aborted.");
        process.exit(0);
      }
      resolve();
    });
  });

  await context.storageState({ path: STORAGE_PATH });
  console.log(`\n✓ Storage state saved to ${STORAGE_PATH}`);
  console.log(`   Subsequent runs of capture-screenshots can replay this session.`);

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
