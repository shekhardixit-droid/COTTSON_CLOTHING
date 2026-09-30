// Mannequin mockup templates (public/mockups/mannequin/): schema, parsing, variant selection and
// a browser loader. The ghost templates (types.ts / renderCanvas.ts) are separate and unchanged.
//
// Layer contract (see public/mockups/README.md):
//   mannequin.png  RGBA, drawn first, never recoloured
//   base.png       greyscale shading: R / shading.scale = multiplier S (200 = flat fabric); alpha ignored
//   mask-*.png     white RGB, coverage in ALPHA
//   trims          stripe masks drawn over collar + cuffs (overlap by design)
//   details        RGBA drawn last, never recoloured (zipper)

import type { LogoZone } from "./types";

export type MannequinRegionId = "body" | "yoke" | "pocket" | "sleeve" | "cuff" | "collar" | "placket" | "buttons";
/** Draw order of the regions (only those a template has and the options enable) */
export const REGION_ORDER: MannequinRegionId[] = ["body", "yoke", "pocket", "sleeve", "cuff", "collar", "placket", "buttons"];

export type MannequinView = "front" | "back" | "side-left" | "side-right";
export type Closure = "buttons" | "zip";
export type TrimStyle = "none" | "single" | "double";

export type MannequinRegion = {
  id: MannequinRegionId;
  label: string;
  mask: string;
  /** Hex colour when nothing is picked and there's nothing to inherit */
  default: string;
  inherit?: MannequinRegionId;
  /** Only present when these options hold (e.g. the pocket) */
  when?: { pocket?: boolean };
};

export type MannequinZone = LogoZone & {
  /** Largest print size here, in cm (brochure limits); the finishing limit may be smaller */
  maxCm: { w: number; h: number };
  /** The part the logo is stitched onto */
  target: MannequinRegionId;
  /** Parts the zone must not overlap */
  avoid: MannequinRegionId[];
};

export type MannequinTemplateConfig = {
  version: 2;
  style: "mannequin";
  family: string;
  id: string;
  view: Exclude<MannequinView, "side-right">;
  closure?: Closure;
  width: number;
  height: number;
  groundShadow: boolean;
  pxPerCm: number;
  pxPerCmNote?: string;
  layers: { base: string; mannequin: string };
  shading: { scale: number; foldStrength: number };
  variants?: { pocket?: { base: string } };
  regions: MannequinRegion[];
  trims: { single: string; doubleA: string; doubleB: string };
  details: { file: string }[];
  zones: MannequinZone[];
};

export type MannequinFamily = {
  version: 1;
  family: string;
  style: "mannequin";
  views: {
    front: Record<Closure, string>;
    back: string;
    "side-left": { noArm: string; arm: string };
    "side-right": { mirrorOf: "side-left" };
  };
  sideShowsArm: boolean;
  mirroredZones: Record<string, { from: string; label: string }>;
  prices: {
    closure: Record<Closure, number>;
    pocket: { no: number; yes: number };
    trimStyle: Record<TrimStyle, number>;
  };
};

/** The customer's mannequin options (colours are separate) */
export type MannequinOptions = {
  view: MannequinView;
  closure: Closure;
  pocket: boolean;
  trimStyle: TrimStyle;
};

// ---- Runtime parsing (template files are data; fail loudly on a bad one) --------------------

const fail = (where: string, msg: string): never => {
  throw new Error(`${where}: ${msg}`);
};
const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (o: Record<string, unknown>, k: string, where: string) =>
  typeof o[k] === "string" ? (o[k] as string) : fail(where, `"${k}" must be a string`);
const num = (o: Record<string, unknown>, k: string, where: string) =>
  typeof o[k] === "number" && Number.isFinite(o[k]) ? (o[k] as number) : fail(where, `"${k}" must be a number`);
const REGION_IDS = new Set<string>(REGION_ORDER);
const regionId = (v: unknown, where: string): MannequinRegionId =>
  typeof v === "string" && REGION_IDS.has(v) ? (v as MannequinRegionId) : fail(where, `unknown region "${String(v)}"`);

export function parseMannequinTemplate(raw: unknown, where = "template.json"): MannequinTemplateConfig {
  if (!isObj(raw)) return fail(where, "not an object");
  if (raw.version !== 2) fail(where, "version must be 2");
  if (raw.style !== "mannequin") fail(where, 'style must be "mannequin"');
  const view = str(raw, "view", where);
  if (!["front", "back", "side-left"].includes(view)) fail(where, `bad view "${view}"`);
  const closure = raw.closure === undefined ? undefined : str(raw, "closure", where);
  if (closure !== undefined && closure !== "buttons" && closure !== "zip") fail(where, `bad closure "${closure}"`);
  const layers = isObj(raw.layers) ? raw.layers : fail(where, "layers missing");
  const shading = isObj(raw.shading) ? raw.shading : fail(where, "shading missing");
  const trims = isObj(raw.trims) ? raw.trims : fail(where, "trims missing");
  const variants = raw.variants === undefined ? undefined : isObj(raw.variants) ? raw.variants : fail(where, "variants must be an object");
  const pocketVariant = variants && isObj(variants.pocket) ? { base: str(variants.pocket, "base", `${where} variants.pocket`) } : undefined;

  const regions = (Array.isArray(raw.regions) ? raw.regions : fail(where, "regions missing")).map((r, i): MannequinRegion => {
    const w = `${where} regions[${i}]`;
    if (!isObj(r)) return fail(w, "not an object");
    const when = r.when === undefined ? undefined : isObj(r.when) ? { pocket: r.when.pocket === true } : fail(w, "when must be an object");
    return {
      id: regionId(r.id, w),
      label: str(r, "label", w),
      mask: str(r, "mask", w),
      default: str(r, "default", w),
      inherit: r.inherit === undefined ? undefined : regionId(r.inherit, w),
      when,
    };
  });
  if (!regions.some((r) => r.id === "body")) fail(where, 'no "body" region');

  const zones = (Array.isArray(raw.zones) ? raw.zones : fail(where, "zones missing")).map((z, i): MannequinZone => {
    const w = `${where} zones[${i}]`;
    if (!isObj(z)) return fail(w, "not an object");
    const maxCm = isObj(z.maxCm) ? z.maxCm : fail(w, "maxCm missing");
    return {
      id: str(z, "id", w) as LogoZone["id"],
      label: str(z, "label", w),
      x: num(z, "x", w),
      y: num(z, "y", w),
      w: num(z, "w", w),
      h: num(z, "h", w),
      rotation: num(z, "rotation", w),
      maxCm: { w: num(maxCm, "w", w), h: num(maxCm, "h", w) },
      target: regionId(z.target, w),
      avoid: (Array.isArray(z.avoid) ? z.avoid : fail(w, "avoid must be an array")).map((a) => regionId(a, w)),
    };
  });

  const details = (Array.isArray(raw.details) ? raw.details : fail(where, "details must be an array")).map((d, i) =>
    isObj(d) ? { file: str(d, "file", `${where} details[${i}]`) } : fail(`${where} details[${i}]`, "not an object")
  );

  return {
    version: 2,
    style: "mannequin",
    family: str(raw, "family", where),
    id: str(raw, "id", where),
    view: view as MannequinTemplateConfig["view"],
    closure: closure as Closure | undefined,
    width: num(raw, "width", where),
    height: num(raw, "height", where),
    groundShadow: raw.groundShadow === true,
    pxPerCm: num(raw, "pxPerCm", where),
    pxPerCmNote: typeof raw.pxPerCmNote === "string" ? raw.pxPerCmNote : undefined,
    layers: { base: str(layers, "base", `${where} layers`), mannequin: str(layers, "mannequin", `${where} layers`) },
    shading: { scale: num(shading, "scale", `${where} shading`), foldStrength: num(shading, "foldStrength", `${where} shading`) },
    variants: pocketVariant ? { pocket: pocketVariant } : undefined,
    regions,
    trims: { single: str(trims, "single", `${where} trims`), doubleA: str(trims, "doubleA", `${where} trims`), doubleB: str(trims, "doubleB", `${where} trims`) },
    details,
    zones,
  };
}

export function parseMannequinFamily(raw: unknown, where = "family.json"): MannequinFamily {
  if (!isObj(raw) || raw.version !== 1 || raw.style !== "mannequin") return fail(where, "not a version 1 mannequin family");
  const views = isObj(raw.views) ? raw.views : fail(where, "views missing");
  const front = isObj(views.front) ? views.front : fail(where, "views.front missing");
  const side = isObj(views["side-left"]) ? views["side-left"] : fail(where, "views.side-left missing");
  const right = isObj(views["side-right"]) ? views["side-right"] : fail(where, "views.side-right missing");
  if (right.mirrorOf !== "side-left") fail(where, 'views.side-right must be { "mirrorOf": "side-left" }');
  const mz = isObj(raw.mirroredZones) ? raw.mirroredZones : {};
  const prices = isObj(raw.prices) ? raw.prices : fail(where, "prices missing");
  const p = (k: string) => (isObj(prices[k]) ? (prices[k] as Record<string, unknown>) : fail(where, `prices.${k} missing`));
  return {
    version: 1,
    family: str(raw, "family", where),
    style: "mannequin",
    views: {
      front: { buttons: str(front, "buttons", where), zip: str(front, "zip", where) },
      back: str(views, "back", where),
      "side-left": { noArm: str(side, "noArm", where), arm: str(side, "arm", where) },
      "side-right": { mirrorOf: "side-left" },
    },
    sideShowsArm: raw.sideShowsArm === true,
    mirroredZones: Object.fromEntries(
      Object.entries(mz).map(([id, v]) => [id, isObj(v) ? { from: str(v, "from", where), label: str(v, "label", where) } : fail(where, `mirroredZones.${id}`)])
    ),
    prices: {
      closure: { buttons: num(p("closure"), "buttons", where), zip: num(p("closure"), "zip", where) },
      pocket: { no: num(p("pocket"), "no", where), yes: num(p("pocket"), "yes", where) },
      trimStyle: { none: num(p("trimStyle"), "none", where), single: num(p("trimStyle"), "single", where), double: num(p("trimStyle"), "double", where) },
    },
  };
}

// ---- Variant selection (brief section 4) -----------------------------------------------------

export type ResolvedView = {
  /** Folder under public/mockups/mannequin/ */
  folder: string;
  /** Flip every layer horizontally (virtual side-right) */
  mirrored: boolean;
};

/** Which asset folder a view + options uses */
export function resolveView(family: MannequinFamily, o: Pick<MannequinOptions, "view" | "closure">): ResolvedView {
  if (o.view === "front") return { folder: family.views.front[o.closure], mirrored: false };
  if (o.view === "back") return { folder: family.views.back, mirrored: false };
  const side = family.sideShowsArm ? family.views["side-left"].arm : family.views["side-left"].noArm;
  return { folder: side, mirrored: o.view === "side-right" };
}

/** The shading file for a template + options: base-pocket.png when the pocket is on (front views) */
export const shadingFile = (t: MannequinTemplateConfig, o: Pick<MannequinOptions, "pocket">) =>
  o.pocket && t.variants?.pocket ? t.variants.pocket.base : t.layers.base;

/** Regions drawn for these options, in draw order (pocket only when on; the rest as the template has them) */
export const activeRegions = (t: MannequinTemplateConfig, o: Pick<MannequinOptions, "pocket">) =>
  REGION_ORDER.flatMap((id) => t.regions.filter((r) => r.id === id && (r.when?.pocket === undefined || r.when.pocket === o.pocket)));

/** Trim masks drawn for a trim style: [mask file, which trim colour] in draw order */
export function activeTrims(t: MannequinTemplateConfig, style: TrimStyle): [string, "trim1" | "trim2"][] {
  if (style === "single") return [[t.trims.single, "trim1"]];
  if (style === "double") return [[t.trims.doubleA, "trim1"], [t.trims.doubleB, "trim2"]];
  return [];
}

/** A zone mirrored for the virtual side-right view: x' = width - (x + w), rotation negated */
export const mirrorZone = <Z extends LogoZone>(z: Z, width: number, id?: Z["id"], label?: string): Z => ({
  ...z,
  id: id ?? z.id,
  label: label ?? z.label,
  x: width - (z.x + z.w),
  rotation: -z.rotation,
});

/** The zones a view offers: the template's own, or (side-right) the mirrored side-left ones */
export function zonesFor(family: MannequinFamily, t: MannequinTemplateConfig, mirrored: boolean): MannequinZone[] {
  if (!mirrored) return t.zones;
  return Object.entries(family.mirroredZones).flatMap(([id, m]) => {
    const src = t.zones.find((z) => z.id === m.from);
    return src ? [mirrorZone(src, t.width, id as MannequinZone["id"], m.label)] : [];
  });
}

// ---- Browser loader: layers as typed arrays, ready for the compositing core ------------------

export type MannequinLayers = {
  config: MannequinTemplateConfig;
  /** mannequin.png and details, RGBA */
  mannequin: Uint8ClampedArray;
  details: Uint8ClampedArray[];
  /** Shading multipliers' source: base R channel, per variant file */
  shading: Record<string, Uint8Array>;
  /** Mask alpha per file (regions and trims) */
  masks: Record<string, Uint8Array>;
};

const MANNEQUIN_ROOT = "/mockups/mannequin";

async function pixels(url: string, w: number, h: number, mirrored: boolean): Promise<Uint8ClampedArray> {
  const img = new Image();
  img.src = url;
  await img.decode();
  if (img.naturalWidth !== w || img.naturalHeight !== h) throw new Error(`${url} is ${img.naturalWidth}×${img.naturalHeight}, expected ${w}×${h}`);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  if (mirrored) {
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, w, h).data;
}
const channel = (rgba: Uint8ClampedArray, c: number) => {
  const out = new Uint8Array(rgba.length / 4);
  for (let i = 0; i < out.length; i++) out[i] = rgba[i * 4 + c];
  return out;
};

const familyCache = new Map<string, Promise<MannequinFamily>>();
export function loadMannequinFamily(root = MANNEQUIN_ROOT) {
  let p = familyCache.get(root);
  if (!p) {
    p = fetch(`${root}/family.json`).then(async (r) => parseMannequinFamily(await r.json(), `${root}/family.json`));
    familyCache.set(root, p);
  }
  return p;
}

const layerCache = new Map<string, Promise<MannequinLayers>>();
/** Every layer of one view folder (all variants), optionally mirrored; cached per folder + mirror */
export function loadMannequinLayers(folder: string, mirrored: boolean, root = MANNEQUIN_ROOT): Promise<MannequinLayers> {
  const key = `${root}/${folder}:${mirrored}`;
  let p = layerCache.get(key);
  if (!p) {
    p = (async () => {
      const dir = `${root}/${folder}`;
      const config = parseMannequinTemplate(await (await fetch(`${dir}/template.json`)).json(), `${dir}/template.json`);
      const { width: W, height: H } = config;
      const load = (f: string) => pixels(`${dir}/${f}`, W, H, mirrored);
      const shadingFiles = [config.layers.base, ...(config.variants?.pocket ? [config.variants.pocket.base] : [])];
      const maskFiles = [...config.regions.map((r) => r.mask), config.trims.single, config.trims.doubleA, config.trims.doubleB];
      const [mannequin, details, shading, masks] = await Promise.all([
        load(config.layers.mannequin),
        Promise.all(config.details.map((d) => load(d.file))),
        Promise.all(shadingFiles.map(async (f) => [f, channel(await load(f), 0)] as const)),
        Promise.all(maskFiles.map(async (f) => [f, channel(await load(f), 3)] as const)),
      ]);
      return { config, mannequin, details, shading: Object.fromEntries(shading), masks: Object.fromEntries(masks) };
    })();
    layerCache.set(key, p);
  }
  return p;
}
