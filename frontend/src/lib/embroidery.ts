// Renders an uploaded logo as embroidery: the logo is reduced to a few thread colors
// (embroidery machines have a limited number of needles), then filled with individual
// satin / tatami stitches drawn one by one on a canvas, each shaded like a round thread.
// The result is a transparent PNG that sits on the garment photo in place of the flat logo.

type RGB = [number, number, number];

export type EmbroideryOptions = {
  /** Max thread colors (Standard = 2, Premium = 4) */
  maxColors: number;
  /** Stitch everything in one thread color instead of the logo's own colors */
  thread?: string | null;
  /** Width of the output in px (height follows the logo's aspect ratio) */
  width?: number;
  /** Real-world width of the logo, used to size stitches like ~0.4 mm thread */
  widthCm?: number;
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const hexToRgb = (hex: string): RGB => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const dist2 = (a: RGB, b: RGB) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
const shade = ([r, g, b]: RGB, f: number) => {
  // f > 0 lightens toward white, f < 0 darkens toward black
  const t = f > 0 ? 255 : 0;
  const k = Math.abs(f);
  return `rgb(${Math.round(r + (t - r) * k)},${Math.round(g + (t - g) * k)},${Math.round(b + (t - b) * k)})`;
};

/** Which pixels belong to the logo: real transparency if the file has it, else "not the background color" */
function logoMask(data: Uint8ClampedArray, w: number, h: number) {
  const n = w * h;
  const mask = new Uint8Array(n);
  let transparent = 0;
  for (let i = 0; i < n; i++) if (data[i * 4 + 3] < 200) transparent++;
  if (transparent > n * 0.02) {
    for (let i = 0; i < n; i++) mask[i] = data[i * 4 + 3] >= 128 ? 1 : 0;
    return mask;
  }
  // Opaque file (JPEG etc.): the background is whatever color the corners share
  const corners = [0, w - 1, (h - 1) * w, h * w - 1].map((i) => [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]] as RGB);
  const bg: RGB = [0, 1, 2].map((c) => corners.reduce((s, p) => s + p[c], 0) / 4) as RGB;
  for (let i = 0; i < n; i++) {
    const p: RGB = [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
    mask[i] = dist2(p, bg) > 45 * 45 ? 1 : 0;
  }
  return mask;
}

/** Reduce the logo's colors to k thread colors (k-means, seeded from the most common colors) */
function threadPalette(data: Uint8ClampedArray, mask: Uint8Array, k: number): RGB[] {
  const counts = new Map<number, { n: number; c: RGB }>();
  const samples: RGB[] = [];
  const step = Math.max(1, Math.floor(mask.length / 20000));
  for (let i = 0; i < mask.length; i += step) {
    if (!mask[i]) continue;
    const c: RGB = [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
    samples.push(c);
    const key = ((c[0] >> 4) << 8) | ((c[1] >> 4) << 4) | (c[2] >> 4);
    const e = counts.get(key);
    if (e) e.n++;
    else counts.set(key, { n: 1, c });
  }
  if (!samples.length) return [[40, 40, 40]];
  // Seeds: most frequent colors that are clearly different from each other (skips anti-aliased edges)
  const seeds: RGB[] = [];
  for (const { c } of [...counts.values()].sort((a, b) => b.n - a.n)) {
    if (seeds.every((s) => dist2(s, c) > 60 * 60)) seeds.push(c);
    if (seeds.length === k) break;
  }
  let centers = seeds;
  for (let iter = 0; iter < 8; iter++) {
    const sum = centers.map(() => [0, 0, 0, 0]);
    for (const s of samples) {
      let best = 0;
      for (let j = 1; j < centers.length; j++) if (dist2(s, centers[j]) < dist2(s, centers[best])) best = j;
      sum[best][0] += s[0];
      sum[best][1] += s[1];
      sum[best][2] += s[2];
      sum[best][3]++;
    }
    centers = centers.map((c, j) => (sum[j][3] ? ([sum[j][0] / sum[j][3], sum[j][1] / sum[j][3], sum[j][2] / sum[j][3]] as RGB) : c));
  }
  return centers;
}

// Tiny deterministic PRNG so the same logo always stitches the same way (no flicker on re-render)
const rng = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};

export async function renderEmbroidery(src: string, opts: EmbroideryOptions): Promise<string> {
  const img = await loadImage(src);
  const W = Math.round(opts.width ?? 1000);
  const H = Math.max(1, Math.round((W * img.naturalHeight) / img.naturalWidth));

  const read = document.createElement("canvas");
  read.width = W;
  read.height = H;
  const rctx = read.getContext("2d", { willReadFrequently: true })!;
  rctx.drawImage(img, 0, 0, W, H);
  const { data } = rctx.getImageData(0, 0, W, H);

  const mask = logoMask(data, W, H);
  const palette = opts.thread ? [hexToRgb(opts.thread)] : threadPalette(data, mask, Math.max(1, opts.maxColors));
  const label = new Uint8Array(W * H);
  for (let i = 0; i < label.length; i++) {
    if (!mask[i]) continue;
    const p: RGB = [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
    let best = 0;
    for (let j = 1; j < palette.length; j++) if (dist2(p, palette[j]) < dist2(p, palette[best])) best = j;
    label[i] = best;
  }

  // Thread spacing: ~0.5 mm per row at the logo's real size, but at least ~1/110 of the
  // width so individual stitches stay visible in the close-up preview
  const pxPerCm = W / (opts.widthCm ?? 9);
  const gap = Math.max(W / 110, pxPerCm * 0.05);
  const maxStitch = gap * 5; // tatami stitch length before the thread goes down and back up

  const out = document.createElement("canvas");
  out.width = W;
  out.height = H;
  const ctx = out.getContext("2d")!;

  // Underlay: flat, darker thread under everything so no fabric shows between stitches
  const under = ctx.createImageData(W, H);
  for (let i = 0; i < mask.length; i++) {
    if (!mask[i]) continue;
    const c = palette[label[i]];
    under.data[i * 4] = c[0] * 0.55;
    under.data[i * 4 + 1] = c[1] * 0.55;
    under.data[i * 4 + 2] = c[2] * 0.55;
    under.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(under, 0, 0);

  // Stitch rows run at 45°: walk each row, split it into runs of one thread color, then
  // lay stitches along each run (staggered row to row like a tatami fill).
  const rand = rng(W * 31 + H);
  const dx = Math.SQRT1_2, dy = Math.SQRT1_2; // along the stitch
  const nx = -Math.SQRT1_2, ny = Math.SQRT1_2; // across rows
  const span = W + H;
  ctx.lineCap = "round";
  let row = 0;
  for (let off = -span; off <= span; off += gap, row++) {
    const ox = W / 2 + nx * off, oy = H / 2 + ny * off;
    // Position along the row where the current color run began (NaN: not in a run; t can be negative)
    let runStart = NaN, runLabel = -1;
    const flush = (endT: number) => {
      if (Number.isNaN(runStart)) return;
      const len = endT - runStart;
      if (len >= 1) {
        const c = palette[runLabel];
        // Short runs are one satin stitch across; long ones are split into staggered stitches
        const pieces = len <= maxStitch * 1.4 ? 1 : Math.round(len / maxStitch);
        const stagger = pieces > 1 ? ((row % 3) / 3) * (len / pieces) : 0;
        let a = runStart;
        for (let p = 0; p < pieces; p++) {
          let b = p === pieces - 1 ? endT : runStart + stagger + ((p + 1) * len) / pieces;
          b = Math.min(b, endT);
          if (b - a >= 0.5) drawStitch(a, b, c);
          a = b;
        }
      }
      runStart = NaN;
    };
    const drawStitch = (a: number, b: number, c: RGB) => {
      const j = () => (rand() - 0.5) * gap * 0.25;
      const x1 = ox + dx * a + j(), y1 = oy + dy * a + j();
      const x2 = ox + dx * b + j(), y2 = oy + dy * b + j();
      const tone = (rand() - 0.5) * 0.12;
      // Thread body, slightly dark at the edges...
      ctx.strokeStyle = shade(c, -0.18 + tone);
      ctx.lineWidth = gap * 1.05;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      // ...and a highlight along its crown, shorter than the stitch so the ends dip in
      const k = Math.min(0.2, (gap * 0.6) / Math.max(1, Math.hypot(x2 - x1, y2 - y1)));
      const hx = nx * gap * -0.18, hy = ny * gap * -0.18;
      ctx.strokeStyle = shade(c, 0.22 + tone);
      ctx.lineWidth = gap * 0.42;
      ctx.beginPath();
      ctx.moveTo(x1 + (x2 - x1) * k + hx, y1 + (y2 - y1) * k + hy);
      ctx.lineTo(x2 - (x2 - x1) * k + hx, y2 - (y2 - y1) * k + hy);
      ctx.stroke();
    };
    for (let t = -span; t <= span; t += 0.7) {
      const x = Math.round(ox + dx * t), y = Math.round(oy + dy * t);
      const inside = x >= 0 && y >= 0 && x < W && y < H;
      const i = y * W + x;
      const l = inside && mask[i] ? label[i] : -1;
      if (l !== runLabel) {
        flush(t);
        if (l >= 0) runStart = t;
        runLabel = l;
      }
    }
    flush(span);
  }

  // Keep stitches inside the logo's outline (round caps and jitter spill over slightly)
  const clip = ctx.createImageData(W, H);
  for (let i = 0; i < mask.length; i++) clip.data[i * 4 + 3] = mask[i] ? 255 : 0;
  const clipCanvas = document.createElement("canvas");
  clipCanvas.width = W;
  clipCanvas.height = H;
  clipCanvas.getContext("2d")!.putImageData(clip, 0, 0);
  ctx.globalCompositeOperation = "destination-in";
  ctx.drawImage(clipCanvas, 0, 0);
  ctx.globalCompositeOperation = "source-over";

  // Raised look: the thread sits on top of the fabric and casts a small, tight shadow
  const final = document.createElement("canvas");
  const pad = Math.ceil(gap * 3);
  final.width = W + pad * 2;
  final.height = H + pad * 2;
  const fctx = final.getContext("2d")!;
  fctx.shadowColor = "rgba(0,0,0,0.55)";
  fctx.shadowBlur = gap * 1.2;
  fctx.shadowOffsetX = gap * 0.35;
  fctx.shadowOffsetY = gap * 0.5;
  fctx.drawImage(out, pad, pad);
  // Crop the padding back off so the image lines up with the logo box exactly
  const crop = document.createElement("canvas");
  crop.width = W;
  crop.height = H;
  crop.getContext("2d")!.drawImage(final, pad, pad, W, H, 0, 0, W, H);
  return crop.toDataURL("image/png");
}

const toHex = (c: RGB) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

/** The logo's main colors (up to 8), most common first, e.g. to show as color chips */
export async function logoPalette(src: string): Promise<string[]> {
  const img = await loadImage(src);
  const W = 200;
  const H = Math.max(1, Math.round((W * img.naturalHeight) / img.naturalWidth));
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, W, H);
  const { data } = ctx.getImageData(0, 0, W, H);
  const mask = logoMask(data, W, H);
  return threadPalette(data, mask, 8)
    .filter((c, i, all) => all.findIndex((d) => dist2(c, d) < 50 * 50) === i)
    .map(toHex);
}

/** The logo in a single color (monochrome / custom color prints), keeping its shape and edges */
export async function recolorLogo(src: string, hex: string, width = 1000): Promise<string> {
  const img = await loadImage(src);
  const W = width;
  const H = Math.max(1, Math.round((W * img.naturalHeight) / img.naturalWidth));
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, W, H);
  const id = ctx.getImageData(0, 0, W, H);
  const mask = logoMask(id.data, W, H);
  const [r, g, b] = hexToRgb(hex);
  for (let i = 0; i < mask.length; i++) {
    id.data[i * 4] = r;
    id.data[i * 4 + 1] = g;
    id.data[i * 4 + 2] = b;
    // Transparent files keep their own (soft-edged) alpha; opaque ones use the background cut-out
    const alpha = id.data[i * 4 + 3];
    id.data[i * 4 + 3] = alpha < 255 ? alpha : mask[i] ? 255 : 0;
  }
  ctx.putImageData(id, 0, 0);
  return c.toDataURL("image/png");
}
