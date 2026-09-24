"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { type Product, colorById, variantUrl } from "@/lib/catalog";
import { IMAGE_ASPECT } from "./placement";

/** The polo photo in its own 2:3 box (so cm placement maps 1:1 to the image), with the
 * wave-sweep transition between collar colors. Children (the logo layer) sit on top. */
export const GarmentPhoto = forwardRef<HTMLDivElement, { product: Product; colorId: string; children?: React.ReactNode }>(
  function GarmentPhoto({ product, colorId, children }, ref) {
    const [base, setBase] = useState(colorId);
    const [incoming, setIncoming] = useState<string | null>(null);
    const [swept, setSwept] = useState(false);
    const [shown, setShown] = useState(colorId);

    // A new color starts a sweep: the new photo is revealed left→right over the old one
    if (colorId !== shown) {
      setShown(colorId);
      setIncoming(colorId);
      setSwept(false);
    }
    useEffect(() => {
      if (!incoming) return;
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setSwept(true)));
      const t = window.setTimeout(() => {
        setBase(incoming);
        setIncoming(null);
        setSwept(false);
      }, 650);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(t);
      };
    }, [incoming]);

    const img = (id: string) => (
      <Image
        src={variantUrl(product, id)}
        alt={`${product.title} — ${colorById(id).name}`}
        fill
        sizes="(min-width: 1024px) 700px, 100vw"
        quality={95}
        draggable={false}
        className="pointer-events-none object-cover"
        priority
      />
    );

    return (
      <div ref={ref} className="relative h-full select-none" style={{ aspectRatio: IMAGE_ASPECT }}>
        {img(base)}
        {incoming && (
          <div
            className="absolute inset-0 transition-[clip-path] duration-[650ms] ease-in-out"
            style={{ clipPath: `inset(0 ${swept ? "0%" : "100%"} 0 0)` }}
          >
            {img(incoming)}
          </div>
        )}
        {incoming && (
          <div
            className="pointer-events-none absolute inset-y-0 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent blur-md transition-[left] duration-[650ms] ease-in-out"
            style={{ left: swept ? "100%" : "0%" }}
          />
        )}
        {children}
      </div>
    );
  }
);

/** Average color of the garment photo around a point (fractions of width/height) */
export function useFabricColor(src: string, fx: number, fy: number) {
  const [color, setColor] = useState("#1a1a1a");
  const imgRef = useRef<{ src: string; data: ImageData } | null>(null);
  useEffect(() => {
    let cancelled = false;
    const sample = (data: ImageData) => {
      const cx = Math.round(fx * data.width), cy = Math.round(fy * data.height);
      let r = 0, g = 0, b = 0, n = 0;
      for (let y = cy - 6; y <= cy + 6; y++)
        for (let x = cx - 6; x <= cx + 6; x++) {
          if (x < 0 || y < 0 || x >= data.width || y >= data.height) continue;
          const i = (y * data.width + x) * 4;
          r += data.data[i];
          g += data.data[i + 1];
          b += data.data[i + 2];
          n++;
        }
      if (n && !cancelled) setColor(`rgb(${Math.round(r / n)},${Math.round(g / n)},${Math.round(b / n)})`);
    };
    if (imgRef.current?.src === src) {
      sample(imgRef.current.data);
      return;
    }
    const img = new window.Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = 200;
      c.height = Math.round((200 * img.naturalHeight) / img.naturalWidth);
      const ctx = c.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, c.width, c.height);
      const data = ctx.getImageData(0, 0, c.width, c.height);
      imgRef.current = { src, data };
      sample(data);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src, fx, fy]);
  return color;
}

/** Macro shot of the logo on the fabric: the garment's own color with a pique-knit texture,
 * drawn sharp at any size (magnifying the product photo instead only shows blurry pixels). */
export function FabricCloseup({
  fabric,
  logo,
  aspect,
  rotation,
  embroidered,
}: {
  fabric: string;
  logo: string;
  aspect: number;
  rotation: number;
  embroidered: boolean;
}) {
  // Fill most of the frame, like a macro photo of the stitching
  const w = aspect >= 1 ? 88 : 80 * aspect;
  return (
    <div className="relative size-full overflow-hidden" style={{ background: fabric }}>
      {/* Pique knit: two offset grids of tiny raised cells, lit from the top-left */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 45% 40% at 40% 38%, rgba(255,255,255,0.09), transparent 70%), radial-gradient(ellipse 45% 40% at 40% 38%, rgba(255,255,255,0.07), transparent 70%), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)",
          backgroundSize: "6px 5px, 6px 5px, 3px 100%",
          backgroundPosition: "0 0, 3px 2.5px, 0 0",
        }}
      />
      {/* Soft falloff like a real close-up photo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.35))]" />
      <div className="absolute inset-0 grid place-items-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- local data URL */}
        <img
          src={logo}
          alt="Logo close-up"
          draggable={false}
          className="pointer-events-none select-none"
          style={{
            width: `${w}%`,
            transform: `rotate(${rotation}deg)`,
            // Printed ink lets a little of the knit show through; thread covers it completely
            filter: embroidered ? undefined : "contrast(0.96) saturate(0.95)",
            opacity: embroidered ? 1 : 0.9,
          }}
        />
      </div>
    </div>
  );
}
