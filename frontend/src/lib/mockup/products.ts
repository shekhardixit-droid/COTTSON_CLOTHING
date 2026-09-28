import mockups from "@/data/productMockups.json";
import { COLORS } from "@/lib/catalog";
import type { GarmentType, ProductMockup, RegionColours, RegionId } from "./types";

const table = mockups as unknown as Record<string, ProductMockup | string>;

/** The product's mockup template + default colours (colour ids), or null if unmapped */
export function productMockup(slug: string): ProductMockup | null {
  const m = table[slug];
  return m && typeof m === "object" ? m : null;
}

export const templateTypeFor = (slug: string): GarmentType | null => productMockup(slug)?.template ?? null;

/** Colour ids (or hex values) → hex, per region; unknown ids are dropped */
export function coloursToHex(colours: Partial<Record<RegionId, string>>): RegionColours {
  const out: RegionColours = {};
  for (const [region, v] of Object.entries(colours) as [RegionId, string][]) {
    const hex = v?.startsWith("#") ? v : COLORS.find((c) => c.id === v)?.hex;
    if (hex) out[region] = hex;
  }
  return out;
}

/** Default region colours (hex) for a product */
export const defaultColours = (slug: string): RegionColours => coloursToHex(productMockup(slug)?.colours ?? {});
