"use client";

import { useEffect, useState } from "react";
import { logoPalette, recolorLogo, renderEmbroidery } from "@/lib/embroidery";

export type LogoFile = { src: string; name: string; aspect: number; palette: string[] };

/** Read an uploaded logo: data URL, aspect ratio (w / h) and its main colors */
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
  const palette = await logoPalette(src).catch(() => []);
  return { src, name: file.name, aspect, palette };
}

/** The artwork to show for the logo: rendered stitches for embroidery, or the flat logo for
 * print (recolored when a single color is chosen). Re-rendered, debounced, when the settings
 * or the logo's real size change, since stitch density depends on size. */
export function useLogoArt(
  src: string | null,
  opts: { embroidered: boolean; maxColors: number; color: string | null; widthCm: number }
) {
  const [art, setArt] = useState<{ key: string; url: string; src: string; embroidered: boolean } | null>(null);
  const { embroidered, maxColors, color } = opts;
  // Round the size so dragging a corner doesn't re-stitch on every pixel
  const widthCm = embroidered ? Math.round(opts.widthCm) : 0;
  const needsRender = !!src && (embroidered || !!color);
  const key = `${src?.length}:${src?.slice(-32)}:${embroidered}:${maxColors}:${color}:${widthCm}`;

  useEffect(() => {
    if (!needsRender || !src) return;
    let cancelled = false;
    const t = window.setTimeout(() => {
      (embroidered
        ? renderEmbroidery(src, { maxColors, thread: color, widthCm, width: 1000 })
        : recolorLogo(src, color!)
      )
        .then((url) => !cancelled && setArt({ key, url, src, embroidered }))
        .catch(() => {});
    }, 150);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [needsRender, src, embroidered, maxColors, color, widthCm, key]);

  if (!src) return { url: null, pending: false };
  if (!needsRender) return { url: src, pending: false };
  // Keep showing the previous render of the same kind (or the plain logo) while a new one is made
  return { url: art && art.src === src && art.embroidered === embroidered ? art.url : src, pending: art?.key !== key };
}
