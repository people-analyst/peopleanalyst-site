import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  MANIFEST,
  PRODUCT_META,
  type ManifestEntry,
  type ProductId,
} from "@/content/research/_manifest";
import { CATEGORIES, type CategoryId } from "@/content/research/_taxonomy";

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

export { CATEGORIES, MANIFEST };
