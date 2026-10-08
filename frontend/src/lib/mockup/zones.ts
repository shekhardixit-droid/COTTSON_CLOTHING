// Logo-zone maths shared by the canvas renderer and (mirrored in) scripts/generate-mockups.mjs.
import type { LogoOrientation, LogoZone, LogoZoneId, TemplateConfig } from "./types";

export const MIN_LOGO_SCALE = 0.5;
export const MAX_LOGO_SCALE = 1.5;

export const clampScale = (s: number) => Math.min(MAX_LOGO_SCALE, Math.max(MIN_LOGO_SCALE, s));

/** Typical logo size parameters per placement (standard apparel guidelines) */
export const TYPICAL_SIZES: Record<
  string,
  { label: string; defaultCm: number; minCm: number; maxCm: number; note: string }
> = {
  "left-chest": { label: "Left chest – Polo/Shirt", defaultCm: 9.0, minCm: 8.0, maxCm: 10.0, note: "8–10 cm wide × 3–5 cm high" },
  "right-chest": { label: "Right chest", defaultCm: 8.0, minCm: 7.0, maxCm: 9.0, note: "7–9 cm wide × 3–5 cm high" },
  "center-chest": { label: "Center chest", defaultCm: 24.0, minCm: 20.0, maxCm: 28.0, note: "20–28 cm wide" },
  "left-sleeve": { label: "Sleeve", defaultCm: 7.0, minCm: 6.0, maxCm: 8.0, note: "6–8 cm wide" },
  "right-sleeve": { label: "Sleeve", defaultCm: 7.0, minCm: 6.0, maxCm: 8.0, note: "6–8 cm wide" },
  "left-sleeve-upper": { label: "Sleeve", defaultCm: 7.0, minCm: 6.0, maxCm: 8.0, note: "6–8 cm wide" },
  "right-sleeve-upper": { label: "Sleeve", defaultCm: 7.0, minCm: 6.0, maxCm: 8.0, note: "6–8 cm wide" },
  "back-neck": { label: "Back – upper", defaultCm: 27.5, minCm: 25.0, maxCm: 30.0, note: "25–30 cm wide" },
  "back-full": { label: "Back – large", defaultCm: 30.0, minCm: 28.0, maxCm: 32.0, note: "28–32 cm wide" },
  "back": { label: "Back – large", defaultCm: 30.0, minCm: 28.0, maxCm: 32.0, note: "28–32 cm wide" },
  "cap-front": { label: "Cap front", defaultCm: 6.0, minCm: 5.0, maxCm: 7.0, note: "5–7 cm wide" },
};

/** Base scale factor so that scale = 1.0 (100%) produces the typical default apparel size */
export function baseScaleForZone(zoneId: string): number {
  if (zoneId === "left-chest") return 0.88; // ~9 cm on 10.16 cm boundary
  if (zoneId === "right-chest") return 0.80; // ~8 cm on 10.16 cm boundary
  if (zoneId.includes("sleeve")) return 0.70; // ~7 cm on 10.16 cm boundary
  if (zoneId === "center-chest") return 0.90; // ~24 cm on chest
  if (zoneId === "back-neck") return 0.90; // ~27.5 cm
  if (zoneId === "back-full" || zoneId === "back") return 0.95; // ~30 cm
  if (zoneId === "cap-front") return 0.85; // ~6 cm
  return 0.85;
}

/** Starting size: 1.0 represents the default typical size (user can decrease to 0.5 or increase to 1.5) */
export const DEFAULT_LOGO_SCALE = 1.0;
export const defaultScaleFor = (_id?: string) => DEFAULT_LOGO_SCALE;

/** The studio's existing positions map 1:1 onto chest zones */
export const POSITION_TO_ZONE: Record<"left-chest" | "center-chest" | "right-chest", LogoZoneId> = {
  "left-chest": "left-chest",
  "center-chest": "center-chest",
  "right-chest": "right-chest",
};

export const zoneById = (t: TemplateConfig, id: LogoZoneId) => t.zones.find((z) => z.id === id) ?? null;

/** Upper-sleeve zones can be turned: "along" runs the logo down the sleeve, "upright" stands it up */
export const hasOrientation = (id: LogoZoneId) => id.endsWith("-sleeve-upper");

/**
 * The zone a logo is actually placed in. "upright" on an upper-sleeve zone turns the zone 90°
 * back and swaps its width and height, so it covers the same patch of sleeve.
 */
export function placedZone(t: TemplateConfig, id: LogoZoneId, orientation: LogoOrientation = "along") {
  const z = zoneById(t, id);
  if (!z || orientation !== "upright" || !hasOrientation(id)) return z;
  const cx = z.x + z.w / 2, cy = z.y + z.h / 2;
  return { ...z, x: cx - z.h / 2, y: cy - z.w / 2, w: z.h, h: z.w, rotation: z.rotation - 90 };
}

/**
 * The logo's box inside a zone: fitted keeping the logo's aspect ratio, scaled, and centred.
 * Coordinates are relative to the zone centre (the renderer translates + rotates there).
 */
export function fitLogo(zone: LogoZone, logoW: number, logoH: number, scale: number) {
  const s = clampScale(scale);
  const baseFactor = baseScaleForZone(zone.id);
  const effectiveScale = s * baseFactor;
  const k = Math.min(zone.w / logoW, zone.h / logoH) * effectiveScale;
  const w = logoW * k * (zone.scaleX ?? 1), h = logoH * k;
  return { w, h, x: -w / 2, y: -h / 2, cx: zone.x + zone.w / 2, cy: zone.y + zone.h / 2 };
}

/** Real-world size of the fitted logo (for finishing limits / pricing) */
export function logoSizeCm(t: TemplateConfig, zone: LogoZone, logoW: number, logoH: number, scale: number) {
  const { w, h } = fitLogo(zone, logoW, logoH, scale);
  return { w: w / t.pxPerCm, h: h / t.pxPerCm };
}
