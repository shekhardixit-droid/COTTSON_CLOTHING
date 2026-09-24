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

/** Widest the logo can get with any tier of this kind (embroidery tops out at Premium) */
export const largestWidthFor = (kind: Finishing["kind"], aspect: number) =>
  Math.max(...FINISHINGS.filter((f) => f.kind === kind).map((f) => maxWidthFor(f, aspect)));

/** When the logo is resized past its tier's limit, step up to the smallest tier of the same kind that fits */
export const tierFor = (current: Finishing, w: number, aspect: number) => {
  if (w <= maxWidthFor(current, aspect) + 1e-6) return current;
  return FINISHINGS.find((f) => f.kind === current.kind && w <= maxWidthFor(f, aspect) + 1e-6) ?? current;
};

/** The square print area for a placement: centred on the position, as large as the tier allows */
export const printArea = (pos: PositionId, f: Finishing) => {
  const p = POSITIONS.find((q) => q.id === pos)!;
  return { x: p.cx - f.maxCm / 2, y: p.cy - f.maxCm / 2, size: f.maxCm };
};

/** Where to zoom the photo to show the logo up close: its centre (fractions of the image) and a
 * zoom level that makes small logos readable without magnifying the photo into mush */
export type Focus = { px: number; py: number; z: number };
export const focusOn = (p: Placement, aspect: number): Focus => ({
  px: (p.x + p.w / 2) / IMAGE_WIDTH_CM,
  py: (p.y + p.w / aspect / 2) / IMAGE_HEIGHT_CM,
  z: Math.min(4, Math.max(1.8, 54 / p.w)),
});

export const round1 = (n: number) => Math.round(n * 10) / 10;
