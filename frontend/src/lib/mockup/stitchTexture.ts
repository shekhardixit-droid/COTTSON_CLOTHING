"use client";

import { removeBackground } from "@/lib/remove-bg";

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

// In-memory cache so repeated renders of the same logo are instantaneous
const stitchCache = new Map<string, string>();

/**
 * Multi-layer Photorealistic Physical Embroidery Engine.
 * 
 * 1. Embroidery Mask: Uses clean logo alpha as the precise stitch boundary.
 * 2. Directional Stitch Synthesis: Computes stroke gradients so horizontal strokes
 *    get horizontal stitches, vertical strokes get vertical stitches, and curves
 *    follow the curve of each letter.
 * 3. Physical Thread Scale: Realistic ~0.35mm thread pitch with micro-cords and tatami breaks.
 * 4. 3D Raised Depth: Physical thread dome profile, beveled edges, and micro ambient occlusion.
 * 5. Semi-Matte Thread Highlights: Anisotropic specular sheen along cylindrical thread fibers.
 * 6. Natural Color Variation: Inherits logo brand colors with subtle thread-to-thread dye variation.
 * 7. Edge Treatment: Micro thread loops on perimeter while preserving the logo silhouette.
 * 8. Fabric Contact Shadow: Soft micro-shadow lifting stitches physically above the cloth.
 */
export async function createRealStitchTexture(
  src: string,
  _widthCm: number = 8
): Promise<string> {
  // Cache check
  const cacheKey = `${src.length}:${src.slice(-32)}`;
  const cached = stitchCache.get(cacheKey);
  if (cached) return cached;

  // Clean any solid or paper background first so only the actual logo graphic is stitched
  const cleanSrc = await removeBackground(src).catch(() => src);
  const origImg = await loadImage(cleanSrc);

  // Target resolution: 1200px width produces fine, authentic ~0.35mm thread scale
  const W = Math.max(800, Math.min(1400, origImg.naturalWidth || 1000));
  const H = Math.max(1, Math.round((W * origImg.naturalHeight) / (origImg.naturalWidth || W)));

  // Source canvas to extract clean artwork pixels
  const srcCanvas = document.createElement("canvas");
  srcCanvas.width = W;
  srcCanvas.height = H;
  const sCtx = srcCanvas.getContext("2d")!;
  sCtx.drawImage(origImg, 0, 0, W, H);
  const srcData = sCtx.getImageData(0, 0, W, H);
  const srcPx = srcData.data;

  // Output canvas
  const outCanvas = document.createElement("canvas");
  outCanvas.width = W;
  outCanvas.height = H;
  const ctx = outCanvas.getContext("2d")!;

  // 1. Layered physical contact drop shadow directly onto garment fabric
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = W;
  shadowCanvas.height = H;
  const shCtx = shadowCanvas.getContext("2d")!;
  // Ambient soft shadow
  shCtx.shadowColor = "rgba(0, 0, 0, 0.45)";
  shCtx.shadowBlur = 4.5;
  shCtx.shadowOffsetX = 1.0;
  shCtx.shadowOffsetY = 2.2;
  shCtx.drawImage(origImg, 0, 0, W, H);
  // Crisp contact occlusion shadow right beneath thread edges
  shCtx.shadowColor = "rgba(0, 0, 0, 0.65)";
  shCtx.shadowBlur = 1.6;
  shCtx.shadowOffsetX = 0.5;
  shCtx.shadowOffsetY = 1.1;
  shCtx.drawImage(origImg, 0, 0, W, H);
  ctx.drawImage(shadowCanvas, 0, 0);

  // 2. Extract alpha mask & compute distance transform for stroke thickness and direction
  const alpha = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    alpha[i] = srcPx[i * 4 + 3];
  }

  // Multi-pass Euclidean distance transform to find stroke thickness & boundaries
  const dist = new Float32Array(W * H);
  const maxR = 9; // stroke dome radius

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = y * W + x;
      if (alpha[idx] < 20) {
        dist[idx] = 0;
        continue;
      }
      let minD = maxR;
      // 5x5 neighborhood distance check
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const ny = y + dy;
          const nx = x + dx;
          if (ny < 0 || ny >= H || nx < 0 || nx >= W || alpha[ny * W + nx] < 20) {
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < minD) minD = d;
          }
        }
      }
      dist[idx] = minD;
    }
  }

  // 3. Directional Stitch Vector Field
  // Compute stroke normal: satin stitches run perpendicular to stroke skeleton
  const stitchAngle = new Float32Array(W * H);
  const defaultAngle = (45 * Math.PI) / 180; // 45-degree tatami fill for broad shapes

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (alpha[i] < 20) continue;

      const dL = x > 0 ? dist[y * W + x - 1] : 0;
      const dR = x < W - 1 ? dist[y * W + x + 1] : 0;
      const dU = y > 0 ? dist[(y - 1) * W + x] : 0;
      const dD = y < H - 1 ? dist[(y + 1) * W + x] : 0;

      const gx = dR - dL;
      const gy = dD - dU;
      const gradLen = Math.sqrt(gx * gx + gy * gy);

      if (gradLen > 0.35 && dist[i] < maxR * 0.85) {
        // Satin stitch across the stroke (aligned with the gradient vector)
        stitchAngle[i] = Math.atan2(gy, gx);
      } else {
        // Inner fill area: blend smoothly to commercial tatami fill angle
        stitchAngle[i] = defaultAngle;
      }
    }
  }

  // 4. Thread physical dimensions
  // Pitch calibrated so thread cords are clearly resolved on screen across chest zones
  const threadPitch = 6.8;
  const stitchLen = 22.0; // Tatami stitch break interval

  // Directional Key Lighting from top-left (135 degrees)
  const lx = -0.58, ly = -0.62, lz = 0.52;
  const lLen = Math.sqrt(lx * lx + ly * ly + lz * lz);
  const nlx = lx / lLen, nly = ly / lLen, nlz = lz / lLen;

  const outData = ctx.createImageData(W, H);
  const outPx = outData.data;

  // Pseudo-random noise for subtle thread fiber dye variation
  const hash = (n: number) => {
    const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return s - Math.floor(s);
  };

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const a = alpha[i];
      if (a < 18) continue;

      const pi = i * 4;
      const baseR = srcPx[pi];
      const baseG = srcPx[pi + 1];
      const baseB = srcPx[pi + 2];

      const ang = stitchAngle[i];
      const cosA = Math.cos(ang);
      const sinA = Math.sin(ang);

      // Coordinate across thread cords (perpendicular to stitch run)
      const u = (x * cosA + y * sinA) / threadPitch;
      const threadIndex = Math.floor(u);
      const phase = u - threadIndex; // 0..1 across each individual thread cylinder

      // Coordinate along thread length (stitch run)
      const v = (-x * sinA + y * cosA) / stitchLen;
      const stitchIndex = Math.floor(v);
      const vPhase = v - stitchIndex;

      // Subtle per-stitch dye batch micro-jitter
      const threadJitter = (hash(threadIndex * 37 + stitchIndex * 17) - 0.5) * 0.04;

      // A. Cylindrical thread crown profile (height peaks at center of thread cord)
      const cordU = (phase - 0.5) * 2.0; // -1 to +1 across thread cord
      const cordRelief = Math.sqrt(Math.max(0, 1.0 - cordU * cordU)); // cylindrical dome

      // B. Overall stroke dome (embroidery is physically raised above fabric)
      const strokeDome = Math.sin(Math.min(1.0, dist[i] / 5.5) * Math.PI * 0.5);

      // C. Surface normal from combined stroke dome + thread cords
      const cordNormalU = -cordU * 0.92; // slope across thread cord
      const cordNx = cosA * cordNormalU;
      const cordNy = sinA * cordNormalU;

      // Stroke edge bevel gradient
      const dL = x > 0 ? dist[y * W + x - 1] : 0;
      const dR = x < W - 1 ? dist[y * W + x + 1] : 0;
      const dU = y > 0 ? dist[(y - 1) * W + x] : 0;
      const dD = y < H - 1 ? dist[(y + 1) * W + x] : 0;
      const edgeNx = (dL - dR) * 0.50;
      const edgeNy = (dU - dD) * 0.50;

      let nx = cordNx + edgeNx;
      let ny = cordNy + edgeNy;
      let nz = 0.82;
      const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nLen;
      ny /= nLen;
      nz /= nLen;

      // D. Diffuse Lighting from key light
      const diffuse = Math.max(0, nx * nlx + ny * nly + nz * nlz);

      // E. Deep thread seam occlusion (shadow in crevices between adjacent stitches)
      // Valleys between threads drop into deep dark shadow (0.24 to 1.0)
      const seamOcclusion = Math.pow(cordRelief, 0.70) * 0.76 + 0.24;

      // F. Needle puncture sink: thread pulls down tightly into garment along stroke contour
      const needleSink = dist[i] < 2.5 ? 0.55 + 0.45 * (dist[i] / 2.5) : 1.0;

      // G. Dense thread dye depth: real sewn thread is optically dense and darker than flat digital print
      const threadDensity = 0.80;

      // Needle depression at stitch breaks
      const needleTuck = (vPhase < 0.08 || vPhase > 0.92) ? 0.72 : 1.0;

      // Overall illumination factor: creates deep dark crevices and rich thread density
      const lightFactor = (0.38 + diffuse * 0.62) * seamOcclusion * needleSink * needleTuck * threadDensity * (1.0 + threadJitter);

      // H. Anisotropic Thread Fiber Sheen:
      // Half-vector between light and camera (0, 0, 1)
      const hx = nlx, hy = nly, hz = nlz + 1.0;
      const hL = Math.sqrt(hx * hx + hy * hy + hz * hz) || 1;
      const specDot = Math.max(0, nx * (hx / hL) + ny * (hy / hL) + nz * (hz / hL));
      const sheen = Math.pow(specDot, 14) * 0.38;

      // Tint specular highlight by the thread's own dye color (NEVER add raw white 255)
      // Dark/black text gets rich obsidian gleam with deep black crevices; colored text gets vibrant luster
      const maxC = Math.max(baseR, baseG, baseB);
      const sheenR = sheen * (baseR * 0.50 + maxC * 0.20 + 16);
      const sheenG = sheen * (baseG * 0.50 + maxC * 0.20 + 16);
      const sheenB = sheen * (baseB * 0.50 + maxC * 0.20 + 16);

      let r = baseR * lightFactor * (1.0 + strokeDome * 0.08) + sheenR;
      let g = baseG * lightFactor * (1.0 + strokeDome * 0.08) + sheenG;
      let b = baseB * lightFactor * (1.0 + strokeDome * 0.08) + sheenB;

      // I. Perimeter micro thread loops (subtle edge scallop instead of flat digital border)
      const edgeScallop = 1.0 - 0.08 * Math.sin(u * Math.PI * 2);
      const finalAlpha = Math.round(a * Math.min(1.0, dist[i] * 1.2) * edgeScallop);

      outPx[pi] = Math.max(0, Math.min(255, Math.round(r)));
      outPx[pi + 1] = Math.max(0, Math.min(255, Math.round(g)));
      outPx[pi + 2] = Math.max(0, Math.min(255, Math.round(b)));
      outPx[pi + 3] = finalAlpha;
    }
  }

  // Draw shaded physical embroidery thread layer over the contact shadow
  const threadLayer = document.createElement("canvas");
  threadLayer.width = W;
  threadLayer.height = H;
  threadLayer.getContext("2d")!.putImageData(outData, 0, 0);
  ctx.drawImage(threadLayer, 0, 0);

  const resultUrl = outCanvas.toDataURL("image/png");
  stitchCache.set(cacheKey, resultUrl);
  if (stitchCache.size > 20) stitchCache.delete(stitchCache.keys().next().value!);

  return resultUrl;
}
