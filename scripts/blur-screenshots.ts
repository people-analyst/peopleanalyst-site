#!/usr/bin/env -S npx tsx
/**
 * Applies Gaussian blur to specified regions of captured screenshots,
 * for surfaces whose figurative content needs to be obscured for portfolio
 * display. Outputs `<name>-blurred.png` alongside the original.
 *
 * Re-run any time `capture-screenshots.ts` is re-run.
 */

import sharp from "sharp";
import { join } from "node:path";
import { existsSync } from "node:fs";

type Region = { left: number; top: number; width: number; height: number };

type BlurJob = {
  product: string;
  slug: string;
  regions: Region[];
  /** Gaussian blur sigma. Higher = stronger. 18 makes faces/bodies indistinct. */
  sigma: number;
};

const PUBLIC_ROOT = join(__dirname, "..", "public", "portfolio");

// Capture viewport is 1440x900. Coordinates below are in that space.
const JOBS: BlurJob[] = [
  {
    product: "vela",
    slug: "landing-desktop",
    sigma: 24,
    // Blur the entire region below the heading/subheading. Extended up to
    // catch tile tops that were peeking above the prior cutoff.
    regions: [{ left: 0, top: 230, width: 1440, height: 670 }],
  },
  {
    product: "vela",
    slug: "membership-desktop",
    sigma: 24,
    // Blur the figurative tile strip; keep header, "Become a Member" heading,
    // and the pricing cards below. Extended down to fully cover tile bottoms.
    regions: [{ left: 0, top: 160, width: 1440, height: 330 }],
  },
];

async function processJob(job: BlurJob) {
  const src = join(PUBLIC_ROOT, job.product, `${job.slug}.png`);
  const dst = join(PUBLIC_ROOT, job.product, `${job.slug}-blurred.png`);
  if (!existsSync(src)) {
    console.warn(`[skip] ${src} not found`);
    return;
  }

  const base = sharp(src);
  const composites = [];

  for (const region of job.regions) {
    const blurredBuf = await sharp(src)
      .extract(region)
      .blur(job.sigma)
      .toBuffer();
    composites.push({ input: blurredBuf, left: region.left, top: region.top });
  }

  await base.composite(composites).toFile(dst);
  console.log(`[ok] ${job.product}/${job.slug}-blurred.png`);
}

async function main() {
  for (const job of JOBS) {
    await processJob(job);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
