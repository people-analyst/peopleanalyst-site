import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  PARTS_PRODUCTS,
  CROSS_PRODUCT_PATTERNS,
  type PartsProductId,
  type PartsProduct,
  type CrossProductPattern,
} from "@/content/parts/_meta";

const CONTENT_ROOT = join(process.cwd(), "content", "parts");

export function getPartsProducts(): PartsProduct[] {
  return Object.values(PARTS_PRODUCTS);
}

export function getPartsProduct(id: string): PartsProduct | undefined {
  return PARTS_PRODUCTS[id as PartsProductId];
}

export function readPartsBody(id: PartsProductId): string | null {
  const path = join(CONTENT_ROOT, `${id}.md`);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

export function getCrossProductPatterns(): CrossProductPattern[] {
  return CROSS_PRODUCT_PATTERNS;
}
