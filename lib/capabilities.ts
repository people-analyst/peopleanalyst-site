import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  CAPABILITIES,
  CAPABILITY_TYPE_LABEL,
  capabilitiesByTier,
  getCapability,
  alsoInDisplay,
  type Capability,
  type CapabilityType,
  type CapabilityTier,
} from "@/content/capabilities/_meta";

const CONTENT_ROOT = join(process.cwd(), "content", "capabilities");

export function readCapabilityBody(slug: string): string | null {
  const path = join(CONTENT_ROOT, `${slug}.md`);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

export {
  CAPABILITIES,
  CAPABILITY_TYPE_LABEL,
  capabilitiesByTier,
  getCapability,
  alsoInDisplay,
  type Capability,
  type CapabilityType,
  type CapabilityTier,
};
