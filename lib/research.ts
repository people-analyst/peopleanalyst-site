import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  MANIFEST,
  PRODUCT_META,
  type ManifestEntry,
  type ProductId,
} from "@/content/research/_manifest";
import { CATEGORIES, type CategoryId } from "@/content/research/_taxonomy";
import { ARCS, ARC_INDEX, type Arc, type ArcId } from "@/content/research/_arcs";

const CONTENT_ROOT = join(process.cwd(), "content", "research");

export function getProducts() {
  return Object.values(PRODUCT_META);
}

export function getProduct(id: string) {
  return PRODUCT_META[id as ProductId];
}

export function getEntriesForProduct(product: ProductId): ManifestEntry[] {
  return MANIFEST.filter((e) => e.product === product);
}

export function getEntriesForProductCategory(
  product: ProductId,
  category: CategoryId,
): ManifestEntry[] {
  return MANIFEST.filter((e) => e.product === product && e.category === category);
}

export function getEntry(product: string, slug: string): ManifestEntry | undefined {
  return MANIFEST.find((e) => e.product === product && e.slug === slug);
}

export function readEntryBody(entry: ManifestEntry): string | null {
  if (entry.status !== "live") return null;
  const path = join(CONTENT_ROOT, entry.product, `${entry.slug}.md`);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

export function isRawSource(entry: ManifestEntry): boolean {
  return entry.source?.path.endsWith(".bib") === true;
}

export function getCategoryStatus(
  product: ProductId,
  category: CategoryId,
): { live: number; forthcoming: number } {
  const entries = getEntriesForProductCategory(product, category);
  return {
    live: entries.filter((e) => e.status === "live").length,
    forthcoming: entries.filter((e) => e.status === "forthcoming").length,
  };
}

export function getProductStatus(product: ProductId): { live: number; total: number } {
  const entries = getEntriesForProduct(product);
  return {
    live: entries.filter((e) => e.status === "live").length,
    total: entries.length,
  };
}

// ===== Arc helpers =====

export function getArcs(): Arc[] {
  return ARCS;
}

export function getArc(id: string): Arc | undefined {
  return ARC_INDEX[id as ArcId];
}

export function getEntriesForArc(arcId: ArcId): ManifestEntry[] {
  return MANIFEST.filter((e) => e.arcs?.includes(arcId));
}

export function getEntriesForArcCategory(
  arcId: ArcId,
  category: CategoryId,
): ManifestEntry[] {
  return MANIFEST.filter(
    (e) => e.arcs?.includes(arcId) && e.category === category,
  );
}

/**
 * Distinct products represented in an arc, ordered by first appearance in the
 * MANIFEST. Useful for showing product chips on arc cards.
 */
export function getProductsInArc(arcId: ArcId): ProductId[] {
  const seen = new Set<ProductId>();
  const out: ProductId[] = [];
  for (const e of MANIFEST) {
    if (e.arcs?.includes(arcId) && !seen.has(e.product)) {
      seen.add(e.product);
      out.push(e.product);
    }
  }
  return out;
}

export function getArcStatus(arcId: ArcId): { live: number; total: number } {
  const entries = getEntriesForArc(arcId);
  return {
    live: entries.filter((e) => e.status === "live").length,
    total: entries.length,
  };
}

/**
 * Resolve an arc's featured entry to a live ManifestEntry if available.
 * Returns null if the featured slug is not yet live (so the caller can show
 * a "forthcoming" affordance).
 */
export function getArcFeaturedEntry(arc: Arc): ManifestEntry | null {
  if (!arc.featuredEntry) return null;
  const entry = MANIFEST.find(
    (e) => e.product === arc.featuredEntry!.product && e.slug === arc.featuredEntry!.slug,
  );
  return entry && entry.status === "live" ? entry : null;
}

export { CATEGORIES, MANIFEST };
export type { ArcId };
