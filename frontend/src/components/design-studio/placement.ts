// Logo placement on the Essential Polo photo, in real-world centimetres.
// The photos are 682×1024 (2:3); the torso spans ~58% of the image width, and a size-M
// polo is ~52 cm across the chest, so the whole image covers ~90 × 135 cm.

export const IMAGE_ASPECT = 682 / 1024;
export const IMAGE_WIDTH_CM = 90;
export const IMAGE_HEIGHT_CM = IMAGE_WIDTH_CM / IMAGE_ASPECT;

/** Top-left corner + width in cm; height follows the logo's own aspect ratio */
export type Placement = { x: number; y: number; w: number; rotation: number };

export type Finishing = {
  id: string;
  label: string;
  kind: "embroidery" | "print";
  maxColors: number;
  maxCm: number;
};

// Same finishing tiers as the reference studio: embroidery limits thread colors and size,
// digital transfer (printed) allows full color at four sizes.
export const FINISHINGS: Finishing[] = [
  { id: "emb-standard", label: "Embroidery (Standard)", kind: "embroidery", maxColors: 2, maxCm: 10 },
  { id: "emb-premium", label: "Embroidery (Premium)", kind: "embroidery", maxColors: 4, maxCm: 20 },
  { id: "dtf-s", label: "Digital transfer (S)", kind: "print", maxColors: 99, maxCm: 8 },
  { id: "dtf-m", label: "Digital transfer (M)", kind: "print", maxColors: 99, maxCm: 16 },
  { id: "dtf-l", label: "Digital transfer (L)", kind: "print", maxColors: 99, maxCm: 23 },
  { id: "dtf-xl", label: "Digital transfer (XL)", kind: "print", maxColors: 99, maxCm: 32 },
];
export const finishingById = (id: string) => FINISHINGS.find((f) => f.id === id) ?? FINISHINGS[0];
export const finishingHint = (f: Finishing) =>
  `Max ${f.maxColors} colors and ${f.maxCm}×${f.maxCm} cm`;

/** Where on the chest the logo starts; centre points in cm */
export const POSITIONS = [
  { id: "left-chest", label: "Left chest", cx: 0.63 * IMAGE_WIDTH_CM, cy: 0.33 * IMAGE_HEIGHT_CM },
  { id: "center-chest", label: "Center chest", cx: 0.5 * IMAGE_WIDTH_CM, cy: 0.4 * IMAGE_HEIGHT_CM },
  { id: "right-chest", label: "Right chest", cx: 0.37 * IMAGE_WIDTH_CM, cy: 0.33 * IMAGE_HEIGHT_CM },
] as const;
export type PositionId = (typeof POSITIONS)[number]["id"];

/** Largest width that keeps both sides within the finishing's max size */
export const maxWidthFor = (f: Finishing, aspect: number) => Math.min(f.maxCm, f.maxCm * aspect);

export const placeAt = (pos: PositionId, w: number, aspect: number, rotation = 0): Placement => {
  const p = POSITIONS.find((q) => q.id === pos)!;
  return { x: p.cx - w / 2, y: p.cy - w / aspect / 2, w, rotation };
};

export const round1 = (n: number) => Math.round(n * 10) / 10;
