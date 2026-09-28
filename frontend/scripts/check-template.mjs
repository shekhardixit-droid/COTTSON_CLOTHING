// Validate a ghost-mannequin mockup template before shipping it.
//
//   npm run check-template polo          (or: node scripts/check-template.mjs polo)
//   npm run check-template -- --all
//
// Checks public/mockups/<type>/:
// - template.json exists, is version 2, and lists base.png, masks and zones
// - every layer PNG exists and is exactly width × height
// - base.png has a transparent background (it must be a cut-out)
// - every mask is non-empty and sits on the garment (inside base.png's alpha)
// - masks other than `body` don't overlap each other (body may cover the whole garment)
// - every logo zone lies ≥95% inside the mask of the part it's on (sleeve zones: mask-sleeve;
//   chest zones: mask-body, clear of mask-placket and mask-collar), with its centre ≥12 px
//   from that mask's edge
// Exit code 1 if anything fails, so it can gate a commit.
import sharp from "sharp";
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";

const ROOT = "public/mockups";
const ALPHA_ON = 128; // a pixel counts as "in" a mask above this alpha
const OVERLAP_TOLERANCE = 0.002; // fraction of the smaller mask allowed to overlap (feathered edges)
const OFF_GARMENT_TOLERANCE = 0.01; // fraction of a mask allowed outside base.png
const ZONE_INSIDE_MIN = 0.95; // a logo zone must lie at least this much inside its part's mask
const ZONE_EDGE_MIN_PX = 12; // ...with its centre at least this far from that mask's edge
const ZONE_CLASH_MAX = 0.005; // share of a chest zone allowed over the placket / collar (feathered edges)

/** Which part a logo zone is stitched onto, and which parts it must stay off */
const zoneRule = (id) =>
  id.includes("sleeve")
    ? { inside: "sleeve", clear: [] }
    : id.includes("chest")
      ? { inside: "body", clear: ["placket", "collar"] }
      : null;

const args = process.argv.slice(2);
const types = args.includes("--all")
  ? (await readdir(ROOT, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name)
  : args.filter((a) => !a.startsWith("-"));
if (!types.length) {
  console.error("Usage: npm run check-template <type>   |   npm run check-template -- --all");
  process.exit(2);
}

/** Alpha channel of a PNG as a Uint8Array, plus its size */
async function alphaOf(file) {
  const img = sharp(file).ensureAlpha();
  const { width, height } = await img.metadata();
  const data = await img.extractChannel(3).raw().toBuffer();
  return { width, height, data };
}

let failed = false;
for (const type of types) {
  const dir = path.join(ROOT, type);
  const errors = [], warnings = [];
  const ok = (msg) => console.log(`  ✓ ${msg}`);
  console.log(`\n${type}`);

  let config;
  try {
    config = JSON.parse(await readFile(path.join(dir, "template.json"), "utf8"));
  } catch (e) {
    console.log(`  ✗ template.json: ${e.code === "ENOENT" ? "missing" : e.message}`);
    failed = true;
    continue;
  }
  if (config.version !== 2) errors.push(`template.json version is ${config.version}, expected 2`);
  const { width: W, height: H } = config;
  if (!W || !H) errors.push("template.json needs width and height");
  if (!config.pxPerCm) errors.push("template.json needs pxPerCm");
  if (!config.layers?.base) errors.push("layers.base missing");
  if (!config.regions?.length) errors.push("no regions");
  if (!config.regions?.some((r) => r.id === "body")) errors.push('no "body" region');

  const layer = async (label, file, required) => {
    const p = path.join(dir, file);
    try {
      await access(p);
    } catch {
      (required ? errors : warnings).push(`${label}: ${file} not found`);
      return null;
    }
    const a = await alphaOf(p);
    if (a.width !== W || a.height !== H) {
      errors.push(`${label}: ${file} is ${a.width}×${a.height}, expected ${W}×${H}`);
      return null;
    }
    return a;
  };

  const base = config.layers?.base ? await layer("base", config.layers.base, true) : null;
  if (base) {
    let transparent = 0, opaque = 0;
    for (const v of base.data) {
      if (v < 16) transparent++;
      else if (v > 240) opaque++;
    }
    if (transparent < base.data.length * 0.05) errors.push("base.png has no transparent background — export it as a cut-out");
    else ok(`base.png ${W}×${H}, ${Math.round((opaque / base.data.length) * 100)}% garment`);
  }
  if (config.layers?.details) await layer("details", config.layers.details, false);

  const masks = [];
  for (const r of config.regions ?? []) {
    const a = await layer(r.id, r.mask, false);
    if (!a) continue;
    let count = 0, off = 0;
    for (let i = 0; i < a.data.length; i++)
      if (a.data[i] > ALPHA_ON) {
        count++;
        if (base && base.data[i] <= ALPHA_ON) off++;
      }
    if (!count) {
      errors.push(`${r.id}: ${r.mask} is empty`);
      continue;
    }
    if (off / count > OFF_GARMENT_TOLERANCE)
      errors.push(`${r.id}: ${Math.round((off / count) * 100)}% of ${r.mask} is outside the garment in base.png`);
    masks.push({ id: r.id, file: r.mask, data: a.data, count });
    ok(`${r.id.padEnd(11)} ${r.mask} (${count.toLocaleString()} px)`);
  }

  // Pairwise overlap between parts (body is the underlay and may overlap everything)
  const parts = masks.filter((m) => m.id !== "body");
  for (let i = 0; i < parts.length; i++)
    for (let j = i + 1; j < parts.length; j++) {
      const a = parts[i], b = parts[j];
      let both = 0;
      for (let k = 0; k < a.data.length; k++) if (a.data[k] > ALPHA_ON && b.data[k] > ALPHA_ON) both++;
      if (both / Math.min(a.count, b.count) > OVERLAP_TOLERANCE)
        errors.push(`${a.id} and ${b.id} overlap by ${both.toLocaleString()} px — each pixel should belong to one part`);
    }
  // Garment pixels no part covers would render uncoloured
  const body = masks.find((m) => m.id === "body");
  if (base && body) {
    let uncovered = 0, garment = 0;
    for (let k = 0; k < base.data.length; k++)
      if (base.data[k] > 240) {
        garment++;
        if (!masks.some((m) => m.data[k] > ALPHA_ON)) uncovered++;
      }
    if (uncovered / garment > 0.01) warnings.push(`${Math.round((uncovered / garment) * 100)}% of the garment is in no mask (it won't be coloured)`);
  }

  // Logo zones: each must sit on the part it's printed on, away from that part's edge
  const maskById = Object.fromEntries(masks.map((m) => [m.id, m]));
  const inMask = (m, x, y) => {
    const xi = Math.round(x), yi = Math.round(y);
    return xi >= 0 && yi >= 0 && xi < W && yi < H && m.data[yi * W + xi] > ALPHA_ON;
  };
  for (const z of config.zones ?? []) {
    const rule = zoneRule(z.id);
    if (!rule) {
      errors.push(`zone ${z.id}: no placement rule (ids must contain "chest" or "sleeve")`);
      continue;
    }
    const target = maskById[rule.inside];
    if (!target) {
      errors.push(`zone ${z.id}: needs the "${rule.inside}" mask`);
      continue;
    }
    // Sample the (possibly rotated) box every 2 px in its own coordinates
    const cx = z.x + z.w / 2, cy = z.y + z.h / 2, a = ((z.rotation ?? 0) * Math.PI) / 180;
    const cos = Math.cos(a), sin = Math.sin(a);
    let n = 0, inside = 0;
    const clash = Object.fromEntries(rule.clear.map((id) => [id, 0]));
    for (let v = -z.h / 2 + 1; v < z.h / 2; v += 2)
      for (let u = -z.w / 2 + 1; u < z.w / 2; u += 2, n++) {
        const x = cx + u * cos - v * sin, y = cy + u * sin + v * cos;
        if (inMask(target, x, y)) inside++;
        for (const id of rule.clear) if (maskById[id] && inMask(maskById[id], x, y)) clash[id]++;
      }
    const pct = inside / n;
    // Distance from the zone centre to the nearest pixel outside the target mask
    let edge = Infinity;
    const R = 80;
    for (let dy = -R; dy <= R; dy++)
      for (let dx = -R; dx <= R; dx++) {
        const d = Math.hypot(dx, dy);
        if (d < edge && !inMask(target, cx + dx, cy + dy)) edge = d;
      }
    const where = `centre (${Math.round(cx)}, ${Math.round(cy)}), ${Math.round(z.w)}×${Math.round(z.h)} px`;
    const problems = [];
    if (pct < ZONE_INSIDE_MIN) problems.push(`only ${(pct * 100).toFixed(1)}% inside ${target.file} (needs ${ZONE_INSIDE_MIN * 100}%)`);
    if (edge < ZONE_EDGE_MIN_PX) problems.push(`centre is ${edge.toFixed(1)} px from the edge of ${target.file} (needs ${ZONE_EDGE_MIN_PX})`);
    for (const id of rule.clear)
      if (clash[id] / n > ZONE_CLASH_MAX) problems.push(`${(clash[id] / n * 100).toFixed(1)}% overlaps ${maskById[id].file}`);
    if (problems.length) errors.push(`zone ${z.id} (${where}): ${problems.join("; ")}`);
    else ok(`zone ${z.id.padEnd(12)} ${where}: ${(pct * 100).toFixed(1)}% on ${rule.inside}, centre ${edge === Infinity ? `>${R}` : edge.toFixed(0)} px from its edge`);
  }
  if (!config.zones?.length) warnings.push("no logo zones");

  for (const w of warnings) console.log(`  ! ${w}`);
  for (const e of errors) console.log(`  ✗ ${e}`);
  console.log(errors.length ? `  FAILED (${errors.length} error${errors.length > 1 ? "s" : ""})` : "  OK");
  if (errors.length) failed = true;
}
process.exit(failed ? 1 : 0);
