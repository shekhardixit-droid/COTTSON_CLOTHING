"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { loadImage, loadTemplate, renderMockup, type PreparedTemplate } from "@/lib/mockup/renderCanvas";
import { defaultColours, templateTypeFor } from "@/lib/mockup/products";
import { logoSizeCm, placedZone } from "@/lib/mockup/zones";
import { createRealStitchTexture } from "@/lib/mockup/stitchTexture";
import type { LogoPlacement, RegionColours } from "@/lib/mockup/types";

type Props = {
  productSlug: string;
  /** Region colours (hex) on top of the product's defaults */
  colours?: RegionColours;
  logo?: LogoPlacement | null;
  /** Shown when the product has no template (or it fails to load) */
  fallbackSrc?: string;
  alt?: string;
  className?: string;
  /** Called with the loaded template (or null when falling back), e.g. to list supported regions */
  onTemplate?: (t: PreparedTemplate | null) => void;
};

/**
 * Live ghost-mannequin mockup for a product. Renders on a canvas at the template's native size and
 * scales with CSS, so it's responsive. Falls back to the product photo when the garment type
 * has no template in public/mockups/.
 */
export function MockupPreview({ productSlug, colours, logo, fallbackSrc, alt, className, onTemplate }: Props) {
  const type = templateTypeFor(productSlug);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState<{ type: string; t: PreparedTemplate | null } | null>(null);
  const [logoImg, setLogoImg] = useState<{ src: string; img: HTMLImageElement | null } | null>(null);
  const onTemplateRef = useRef(onTemplate);
  useEffect(() => {
    onTemplateRef.current = onTemplate;
  }, [onTemplate]);

  // Load the template for this garment type (cached across instances)
  useEffect(() => {
    let cancelled = false;
    (type ? loadTemplate(type) : Promise.resolve(null)).then((t) => {
      if (cancelled) return;
      setLoaded({ type: type ?? "", t });
      onTemplateRef.current?.(t);
    });
    return () => {
      cancelled = true;
    };
  }, [type]);

  // ?debug=masks overlays every mask in a translucent colour (read after mount: no SSR mismatch)
  const [debugMasks, setDebugMasks] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of the URL
    setDebugMasks(new URLSearchParams(window.location.search).get("debug") === "masks");
  }, []);

  const template = loaded?.type === (type ?? "") ? loaded.t : undefined;

  // Embroidery: real thread texture sewn into the garment; Print: clean flat graphic
  const rawSrc = logo?.src ?? null;
  const isEmbroidery = logo?.finish === "embroidery";
  const [stitched, setStitched] = useState<{ key: string; url: string } | null>(null);
  useEffect(() => {
    if (!rawSrc || !isEmbroidery) return;
    if (rawSrc.startsWith("data:image/png;base64,") && rawSrc.length > 30000) return;
    let cancelled = false;
    createRealStitchTexture(rawSrc)
      .then((url) => !cancelled && setStitched({ key: rawSrc, url }))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [rawSrc, isEmbroidery]);

  const logoSrc = isEmbroidery && stitched?.key === rawSrc ? stitched.url : rawSrc;

  // Load the logo image whenever its (plain or stitched) source changes
  useEffect(() => {
    if (!logoSrc) return;
    let cancelled = false;
    loadImage(logoSrc)
      .then((img) => !cancelled && setLogoImg({ src: logoSrc, img }))
      .catch(() => !cancelled && setLogoImg({ src: logoSrc, img: null }));
    return () => {
      cancelled = true;
    };
  }, [logoSrc]);

  const img = logoSrc && logoImg?.src === logoSrc ? logoImg.img : null;

  // Re-render synchronously on any change: tinted regions are cached, so this is cheap
  useEffect(() => {
    if (!template || !canvasRef.current) return;
    renderMockup(template, { colours: { ...defaultColours(productSlug), ...colours }, logo }, img, canvasRef.current, {
      debugMasks,
      // Transparent: the page shows through; the ground shadow is still drawn
      background: "transparent",
    });
  }, [template, productSlug, colours, logo, img, debugMasks]);

  const loading = template === undefined;
  const aspect = template ? template.config.width / template.config.height : 2 / 3;

  if (template === null) {
    // No template for this garment type: the product photo, as before
    return fallbackSrc ? (
      <div className={cn("relative", className)} style={{ aspectRatio: aspect }}>
        <Image src={fallbackSrc} alt={alt ?? ""} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-contain" />
      </div>
    ) : null;
  }

  return (
    <div className={cn("relative", className)} style={{ aspectRatio: aspect }}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt ?? "Garment mockup"}
        className={cn("block size-full transition-opacity duration-300", loading ? "opacity-0" : "opacity-100")}
      />
      {debugMasks && (
        // Debug tints hide the chosen colours; make that obvious and easy to leave
        <a
          href="?"
          className="absolute right-2 top-2 rounded-md bg-amber-400 px-2.5 py-1 text-xs font-semibold text-black shadow hover:bg-amber-300"
        >
          Mask outlines on · Exit
        </a>
      )}
      {loading && (
        <div className="absolute inset-0 grid place-items-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" aria-label="Loading mockup" />
        </div>
      )}
    </div>
  );
}
