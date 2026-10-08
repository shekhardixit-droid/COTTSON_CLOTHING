"use client";

/**
 * Professional client-side background removal for logos.
 * Handles:
 * 1. Clean removal of white, off-white, paper-textured, or light/solid backgrounds
 * 2. Complete removal of interior letter holes ("O", "A", "D", "B", etc.)
 * 3. 100% elimination of perimeter boxes / border outlines
 * 4. 1-pixel matte choke to cut off compression ringing
 * 5. Color decontamination: replaces edge pixels with pure logo color so NO white fringe remains
 * 6. Tight bounding-box auto crop
 */

function colorDistance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

/** Detect dominant background color from border margins */
function detectBgColor(data: Uint8ClampedArray, w: number, h: number): [number, number, number] {
  const samples: [number, number, number][] = [];

  for (let x = 0; x < w; x += 2) {
    const iTop = x * 4;
    samples.push([data[iTop], data[iTop + 1], data[iTop + 2]]);
    const iBot = ((h - 1) * w + x) * 4;
    samples.push([data[iBot], data[iBot + 1], data[iBot + 2]]);
  }

  for (let y = 0; y < h; y += 2) {
    const iLeft = y * w * 4;
    samples.push([data[iLeft], data[iLeft + 1], data[iLeft + 2]]);
    const iRight = (y * w + (w - 1)) * 4;
    samples.push([data[iRight], data[iRight + 1], data[iRight + 2]]);
  }

  if (samples.length === 0) return [255, 255, 255];

  const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();
  for (const [r, g, b] of samples) {
    const key = `${(r >> 4) << 4},${(g >> 4) << 4},${(b >> 4) << 4}`;
    const bkt = buckets.get(key);
    if (bkt) {
      bkt.count++;
      bkt.r += r;
      bkt.g += g;
      bkt.b += b;
    } else {
      buckets.set(key, { count: 1, r, g, b });
    }
  }

  let best = { count: 0, r: 255, g: 255, b: 255 };
  for (const bkt of buckets.values()) {
    if (bkt.count > best.count) best = bkt;
  }

  return [
    Math.round(best.r / best.count),
    Math.round(best.g / best.count),
    Math.round(best.b / best.count),
  ];
}

export async function removeBackground(src: string): Promise<string> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = src;
  });

  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  const [bgR, bgG, bgB] = detectBgColor(data, w, h);
  const bgLum = 0.299 * bgR + 0.587 * bgG + 0.114 * bgB;
  const isLightBg = bgLum >= 180;

  // Step 1: Compute raw alpha mask across all pixels
  const rawAlpha = new Uint8Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const a = data[idx + 3];
      if (a === 0) {
        rawAlpha[y * w + x] = 0;
        continue;
      }

      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const dist = colorDistance(r, g, b, bgR, bgG, bgB);

      if (isLightBg) {
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        const maxC = Math.max(r, g, b);
        const minC = Math.min(r, g, b);
        const sat = maxC === 0 ? 0 : (maxC - minC) / maxC;

        // Clear white, off-white, paper texture, and gray compression noise
        if (dist <= 48 || lum >= 210 || (lum >= 170 && sat < 0.22)) {
          rawAlpha[y * w + x] = 0;
        } else if (lum > 135 && sat < 0.25) {
          // Low-saturation light halo around dark artwork: steep ramp
          const factor = Math.max(0, (170 - lum) / 35);
          rawAlpha[y * w + x] = Math.max(0, Math.min(255, Math.round(a * Math.pow(factor, 1.8))));
        } else if (dist < 90) {
          const factor = (dist - 48) / (90 - 48);
          rawAlpha[y * w + x] = Math.max(0, Math.min(255, Math.round(a * Math.pow(factor, 1.5))));
        } else {
          rawAlpha[y * w + x] = a;
        }
      } else {
        // Dark / colored background
        if (dist <= 42) {
          rawAlpha[y * w + x] = 0;
        } else if (dist < 85) {
          const factor = (dist - 42) / (85 - 42);
          rawAlpha[y * w + x] = Math.max(0, Math.min(255, Math.round(a * Math.pow(factor, 1.4))));
        } else {
          rawAlpha[y * w + x] = a;
        }
      }
    }
  }

  // Step 2: 1-pixel Matte Choke / Erosion (ensures zero border line or white halo)
  const chokedAlpha = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      // Border pixels of the canvas are unconditionally transparent (eliminates perimeter box)
      if (x === 0 || x === w - 1 || y === 0 || y === h - 1) {
        chokedAlpha[i] = 0;
        continue;
      }
      const nMin = Math.min(
        rawAlpha[i],
        rawAlpha[i - 1],
        rawAlpha[i + 1],
        rawAlpha[i - w],
        rawAlpha[i + w]
      );
      chokedAlpha[i] = nMin;
    }
  }

  // Step 3: Color Decontamination & Alpha write-back across ALL pixels (0..w-1, 0..h-1)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const a = chokedAlpha[i];
      const pi = i * 4;

      if (a === 0) {
        data[pi] = 0;
        data[pi + 1] = 0;
        data[pi + 2] = 0;
        data[pi + 3] = 0;
        continue;
      }

      if (a < 230) {
        // Find nearest solid foreground neighbor in 7x7 neighborhood
        let bestDist = 999;
        let bestR = data[pi], bestG = data[pi + 1], bestB = data[pi + 2];

        for (let dy = -3; dy <= 3; dy++) {
          for (let dx = -3; dx <= 3; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < h && nx >= 0 && nx < w) {
              const ni = ny * w + nx;
              if (chokedAlpha[ni] >= 230) {
                const d = dx * dx + dy * dy;
                if (d < bestDist) {
                  bestDist = d;
                  const npi = ni * 4;
                  bestR = data[npi];
                  bestG = data[npi + 1];
                  bestB = data[npi + 2];
                }
              }
            }
          }
        }

        data[pi] = bestR;
        data[pi + 1] = bestG;
        data[pi + 2] = bestB;
      }

      data[pi + 3] = a;
    }
  }

  // Step 4: Find tight bounding box of visible graphic
  let minX = w, minY = h, maxX = 0, maxY = 0;
  let hasPixels = false;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      if (data[idx + 3] > 20) {
        hasPixels = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // Auto-crop to exact graphic bounds
  if (hasPixels && maxX > minX && maxY > minY) {
    const pad = 2;
    const cropX = Math.max(0, minX - pad);
    const cropY = Math.max(0, minY - pad);
    const cropW = Math.min(w - cropX, maxX - minX + 1 + pad * 2);
    const cropH = Math.min(h - cropY, maxY - minY + 1 + pad * 2);

    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = cropW;
    croppedCanvas.height = cropH;
    const cropCtx = croppedCanvas.getContext("2d")!;
    cropCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
    return croppedCanvas.toDataURL("image/png");
  }

  return canvas.toDataURL("image/png");
}
