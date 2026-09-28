// Logo-zone maths shared by the canvas renderer and (mirrored in) scripts/generate-mockups.mjs.
import type { LogoZone, LogoZoneId, TemplateConfig } from "./types";

export const MIN_LOGO_SCALE = 0.5;
export const MAX_LOGO_SCALE = 1;

export const clampScale = (s: number) => Math.min(MAX_LOGO_SCALE, Math.max(MIN_LOGO_SCALE, s));

/** Starting size when a zone is picked: sleeve logos look best a little inside their area */
export const defaultScaleFor = (id: LogoZoneId) => (id.includes("sleeve") ? 0.7 : 1);

/** The studio's existing positions map 1:1 onto chest zones */
export const POSITION_TO_ZONE: Record<"left-chest" | "center-chest" | "right-chest", LogoZoneId> = {
  "left-chest": "left-chest",
  "center-chest": "center-chest",
  "right-chest": "right-chest",
};

export const zoneById = (t: TemplateConfig, id: LogoZoneId) => t.zones.find((z) => z.id === id) ?? null;

/**
 * The logo's box inside a zone: fitted keeping the logo's aspect ratio, scaled, and centred.
 * Coordinates are relative to the zone centre (the renderer translates + rotates there).
 */
export function fitLogo(zone: LogoZone, logoW: number, logoH: number, scale: number) {
  const s = clampScale(scale);
  const k = Math.min(zone.w / logoW, zone.h / logoH) * s;
  const w = logoW * k, h = logoH * k;
  return { w, h, x: -w / 2, y: -h / 2, cx: zone.x + zone.w / 2, cy: zone.y + zone.h / 2 };
}

/** Real-world size of the fitted logo (for finishing limits / pricing) */
export function logoSizeCm(t: TemplateConfig, zone: LogoZone, logoW: number, logoH: number, scale: number) {
  const { w, h } = fitLogo(zone, logoW, logoH, scale);
  return { w: w / t.pxPerCm, h: h / t.pxPerCm };
}
