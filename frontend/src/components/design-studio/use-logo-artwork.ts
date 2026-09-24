"use client";

import { useEffect, useState } from "react";
import { countLogoColors, renderEmbroidery } from "@/lib/embroidery";

export type LogoFile = { src: string; name: string; aspect: number; colors: number };

/** Read an uploaded logo: data URL, aspect ratio (w / h) and how many colors it has */
export async function readLogoFile(file: File): Promise<LogoFile> {
  const src = await new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
  const img = new Image();
  img.src = src;
  await img.decode();
  // SVGs without intrinsic size report 0; fall back to square
  const aspect = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1;
  const colors = await countLogoColors(src).catch(() => 1);
  return { src, name: file.name, aspect, colors };
}

/** Stitch image for the logo when the finishing is embroidery; re-rendered (debounced) when
 * the thread settings or the logo's real size change, since stitch density depends on size. */
export function useStitchedLogo(
  src: string | null,
  opts: { enabled: boolean; maxColors: number; thread: string | null; widthCm: number }
) {
  const [stitched, setStitched] = useState<{ key: string; url: string } | null>(null);
  const { enabled, maxColors, thread } = opts;
  // Round the size so dragging a corner doesn't re-stitch on every pixel
  const widthCm = Math.round(opts.widthCm);
  const key = `${src?.length}:${src?.slice(-32)}:${maxColors}:${thread}:${widthCm}`;

  useEffect(() => {
    if (!enabled || !src) return;
    let cancelled = false;
    const t = window.setTimeout(() => {
      renderEmbroidery(src, { maxColors, thread, widthCm, width: 1000 })
        .then((url) => !cancelled && setStitched({ key, url }))
        .catch(() => {});
    }, 150);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [enabled, src, maxColors, thread, widthCm, key]);

  if (!enabled || !src) return { url: null, pending: false };
  // Keep showing the previous stitch render while a new one is being made
  return { url: stitched?.url ?? null, pending: stitched?.key !== key };
}
