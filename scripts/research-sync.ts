#!/usr/bin/env -S npx tsx
/**
 * Reads content/research/_manifest.ts and copies each `live` entry's source
 * file into content/research/<product>/<slug>.md.
 *
 * Sources are resolved against absolute filesystem paths. Each repo's local
 * checkout is configured below — adjust if your repos move.
 *
 * Re-run after meaningful research updates in any source repo.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { MANIFEST } from "../content/research/_manifest";

const REPO_ROOTS: Record<string, string> = {
  "people-analyst/vela": "/Users/mikewest/vela",
  "people-analyst/baby-namer": "/Users/mikewest/Vibe Coding Projects/baby-namer",
};

const CONTENT_ROOT = join(__dirname, "..", "content", "research");

function resolveSource(repo: string, path: string): string {
  const root = REPO_ROOTS[repo];
  if (!root) throw new Error(`Unknown repo in manifest: ${repo}`);
  return join(root, path);
}

function targetPath(product: string, slug: string): string {
  return join(CONTENT_ROOT, product, `${slug}.md`);
}

let copied = 0;
let skipped = 0;
let missing = 0;

for (const entry of MANIFEST) {
  if (entry.status !== "live" || !entry.source) {
    skipped++;
    continue;
  }
  const src = resolveSource(entry.source.repo, entry.source.path);
  if (!existsSync(src)) {
    console.warn(`[missing] ${entry.product}/${entry.slug} ← ${src}`);
    missing++;
    continue;
  }
  const dst = targetPath(entry.product, entry.slug);
  mkdirSync(dirname(dst), { recursive: true });
  let body = readFileSync(src, "utf8");

  // BibTeX is preserved as-is; the slug renderer renders it as raw
  // preformatted text rather than running it through markdown.

  writeFileSync(dst, body);
  console.log(`[copied] ${entry.product}/${entry.slug}`);
  copied++;
}

console.log(
  `\nDone. Copied ${copied}, skipped ${skipped} forthcoming, ${missing} missing source files.`,
);
