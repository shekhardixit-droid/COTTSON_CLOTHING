"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ImagePlus,
  Move,
  Palette,
  Plus,
  Minus,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
  AlignCenterHorizontal,
  AlignCenterVertical,
} from "lucide-react";
import { type Product, colorById, variantUrl, formatPrice } from "@/lib/catalog";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

/** Product detail page for the Essential Polo: same wave-sweep trim-color swap as
 * /mockup, but wired to the real catalog (price, sizes, minBulk) and the real cart. */
export function EssentialPoloDetail({ product, initialColor }: { product: Product; initialColor: string }) {
  const add = useCart((s) => s.add);
  const [colorId, setColorId] = useState(initialColor);
  const [baseColorId, setBaseColorId] = useState(initialColor);
  const [incomingColorId, setIncomingColorId] = useState<string | null>(null);
  const [swept, setSwept] = useState(false);
  const [sizes, setSizes] = useState<Record<string, number>>({});

  // Logo overlay: a sibling layer on top of the photo, independent of which color image
  // is showing underneath — so it stays put across color swaps without any extra work.
  // Position/size are tracked as % of the (square, so axis-independent) photo container —
  // resolution-independent, and easy to present as friendly "cm" units in the precise
  // positioning panel via GARMENT_WIDTH_CM below.
  const GARMENT_WIDTH_CM = 40; // assumed real-world chest width the photo frames
  const pctToCm = (pct: number) => Math.round((pct / 100) * GARMENT_WIDTH_CM * 10) / 10;
  const cmToPct = (cm: number) => (cm / GARMENT_WIDTH_CM) * 100;

  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [logoLeft, setLogoLeft] = useState(40); // % from left edge of container
  const [logoTop, setLogoTop] = useState(35); // % from top edge
  const [logoWidth, setLogoWidth] = useState(20); // % of container width
  const [logoHeight, setLogoHeight] = useState(20); // % of container height
  const [rotation, setRotation] = useState(0); // degrees
  const [application, setApplication] = useState<"print" | "embroidery">("print");
  const [showPositionPanel, setShowPositionPanel] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clampPct = (v: number, min = 0, max = 95) => Math.min(max, Math.max(min, v));

  const onLogoFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setLogoSrc(reader.result as string);
      setZoomed(true); // zoom in on the placement area right away, like a stitch close-up
    };
    reader.readAsDataURL(file);
  };

  // Move: drag from inside the box, tracked by pointer delta converted to % of the container.
  const dragRef = useRef<{ startX: number; startY: number; left: number; top: number } | null>(null);
  const onLogoPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragRef.current = { startX: e.clientX, startY: e.clientY, left: logoLeft, top: logoTop };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onLogoPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    const rect = photoRef.current?.getBoundingClientRect();
    if (!drag || !rect) return;
    const dxPct = ((e.clientX - drag.startX) / rect.width) * 100;
    const dyPct = ((e.clientY - drag.startY) / rect.height) * 100;
    setLogoLeft(clampPct(drag.left + dxPct));
    setLogoTop(clampPct(drag.top + dyPct));
  };
  const onLogoPointerUp = () => {
    dragRef.current = null;
  };

  // Resize: each corner drags its own edges, anchoring the opposite corner in place.
  const resizeRef = useRef<{ corner: string; startX: number; startY: number; box: { left: number; top: number; width: number; height: number } } | null>(null);
  const onHandlePointerDown = (corner: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizeRef.current = { corner, startX: e.clientX, startY: e.clientY, box: { left: logoLeft, top: logoTop, width: logoWidth, height: logoHeight } };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onHandlePointerMove = (e: React.PointerEvent) => {
    const rs = resizeRef.current;
    const rect = photoRef.current?.getBoundingClientRect();
    if (!rs || !rect) return;
    const dxPct = ((e.clientX - rs.startX) / rect.width) * 100;
    const dyPct = ((e.clientY - rs.startY) / rect.height) * 100;
    const { corner, box } = rs;
    let { left, top, width, height } = box;
    if (corner.includes("right")) width = Math.max(4, box.width + dxPct);
    if (corner.includes("left")) {
      width = Math.max(4, box.width - dxPct);
      left = box.left + (box.width - width);
    }
    if (corner.includes("bottom")) height = Math.max(4, box.height + dyPct);
    if (corner.includes("top")) {
      height = Math.max(4, box.height - dyPct);
      top = box.top + (box.height - height);
    }
    setLogoLeft(left);
    setLogoTop(top);
    setLogoWidth(width);
    setLogoHeight(height);
  };
  const onHandlePointerUp = () => {
    resizeRef.current = null;
  };

  const nudge = (dx: number, dy: number) => {
    setLogoLeft((v) => clampPct(v + dx));
    setLogoTop((v) => clampPct(v + dy));
  };
  const centerHorizontal = () => setLogoLeft(clampPct(50 - logoWidth / 2));
  const centerVertical = () => setLogoTop(clampPct(50 - logoHeight / 2));

  const color = colorById(colorId);
  const totalQty = Object.values(sizes).reduce((n, q) => n + q, 0);
  const setSize = (s: string, qty: number) => setSizes((prev) => ({ ...prev, [s]: Math.max(0, qty) }));

  const selectColor = (id: string) => {
    if (id === colorId) return;
    setColorId(id);
    window.history.replaceState(null, "", `?color=${id}`);
    setIncomingColorId(id);
    setSwept(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setSwept(true)));
    window.setTimeout(() => {
      setBaseColorId(id);
      setIncomingColorId(null);
      setSwept(false);
    }, 650);
  };

  const addToCart = () => {
    if (totalQty < product.minBulk) {
      toast.error(`Minimum order is ${product.minBulk} pieces (you have ${totalQty})`);
      return;
    }
    for (const [size, qty] of Object.entries(sizes)) {
      if (qty > 0) add({ slug: product.slug, title: product.title, colorId, colorName: color.name, size, qty, basePrice: product.price });
    }
    toast.success(`Added ${totalQty} × ${product.title} (${color.name}) to cart`);
    setSizes({});
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid gap-10 overflow-hidden rounded-2xl border lg:grid-cols-2">
        {/* Left: photo with the wave-sweep color swap */}
        <div className="relative bg-muted">
          <div ref={photoRef} className="relative aspect-square w-full select-none overflow-hidden">
            <div
              className="absolute inset-0 transition-transform duration-500 ease-out"
              style={{
                transform: zoomed ? "scale(2)" : "scale(1)",
                transformOrigin: logoSrc ? `${logoLeft + logoWidth / 2}% ${logoTop + logoHeight / 2}%` : "50% 50%",
              }}
            >
            <Image
              src={variantUrl(product, baseColorId)}
              alt={`${product.title} — ${colorById(baseColorId).name}`}
              fill
              sizes="600px"
              draggable={false}
              className="pointer-events-none object-contain"
            />
            {incomingColorId && (
              <div
                className="absolute inset-0 transition-[clip-path] duration-[650ms] ease-in-out"
                style={{ clipPath: `inset(0 ${swept ? "0%" : "100%"} 0 0)` }}
              >
                <Image
                  src={variantUrl(product, incomingColorId)}
                  alt={`${product.title} — ${colorById(incomingColorId).name}`}
                  fill
                  sizes="600px"
                  draggable={false}
                  className="pointer-events-none object-contain"
                />
              </div>
            )}
            {incomingColorId && (
              <div
                className="pointer-events-none absolute inset-y-0 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-background/70 to-transparent blur-md transition-[left] duration-[650ms] ease-in-out"
                style={{ left: swept ? "100%" : "0%" }}
              />
            )}

            {/* Logo overlay: independent of the color layers below, so it carries over to
                every trim color automatically — never baked into a specific photo. Wrapped
                as a proper selectable element: dashed box + corner handles to resize. */}
            {logoSrc && (
              <div
                className="absolute touch-none"
                style={{ left: `${logoLeft}%`, top: `${logoTop}%`, width: `${logoWidth}%`, height: `${logoHeight}%`, transform: `rotate(${rotation}deg)` }}
              >
                <div
                  onPointerDown={onLogoPointerDown}
                  onPointerMove={onLogoPointerMove}
                  onPointerUp={onLogoPointerUp}
                  className="relative size-full cursor-grab rounded outline-dashed outline-2 outline-offset-4 outline-brand/70 active:cursor-grabbing"
                >
                  <div className="relative">
                    <img
                      src={logoSrc}
                      alt="Your logo"
                      draggable={false}
                      className={cn("pointer-events-none block w-full select-none", application === "embroidery" && "contrast-125 saturate-75")}
                      style={{
                        filter:
                          application === "embroidery"
                            ? // Stitched satin-border: several small offset shadows in a thread color
                              // ring the logo's silhouette, instead of one soft photographic shadow.
                              [0, 45, 90, 135, 180, 225, 270, 315]
                                .map((deg) => `drop-shadow(${Math.cos((deg * Math.PI) / 180)}px ${Math.sin((deg * Math.PI) / 180)}px 0 rgba(15,15,20,0.55))`)
                                .join(" ")
                            : "drop-shadow(0 1px 2px rgba(0,0,0,0.25))",
                      }}
                    />
                    {application === "embroidery" && (
                      // Diagonal thread-line texture, clipped to the logo's own shape via a
                      // luminance mask and blended in — reads as stitched fill, not flat print.
                      <div
                        className="pointer-events-none absolute inset-0 mix-blend-overlay"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1px, rgba(0,0,0,0.5) 1px, rgba(0,0,0,0.5) 2px, transparent 2px, transparent 3px)",
                          WebkitMaskImage: `url(${logoSrc})`,
                          maskImage: `url(${logoSrc})`,
                          WebkitMaskSize: "100% 100%",
                          maskSize: "100% 100%",
                          WebkitMaskRepeat: "no-repeat",
                          maskRepeat: "no-repeat",
                        }}
                      />
                    )}
                  </div>
                  {[
                    ["top-left", "-top-4 -left-4", "nwse-resize"],
                    ["top-right", "-top-4 -right-4", "nesw-resize"],
                    ["bottom-left", "-bottom-4 -left-4", "nesw-resize"],
                    ["bottom-right", "-bottom-4 -right-4", "nwse-resize"],
                  ].map(([corner, pos, cursor]) => (
                    <div
                      key={corner}
                      onPointerDown={onHandlePointerDown(corner)}
                      onPointerMove={onHandlePointerMove}
                      onPointerUp={onHandlePointerUp}
                      className={cn("absolute size-3 rounded-full border-2 border-brand bg-background shadow", pos)}
                      style={{ cursor }}
                    />
                  ))}
                </div>
              </div>
            )}
            </div>
          </div>
          {logoSrc && (
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-background"
            >
              {zoomed ? <ZoomOut className="size-3.5" /> : <ZoomIn className="size-3.5" />}
              {zoomed ? "Zoom out" : "Zoom to logo"}
            </button>
          )}
          <button
            type="button"
            disabled
            className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-background/80 text-muted-foreground shadow-sm disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            disabled
            className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-background/80 text-muted-foreground shadow-sm disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Right: title, design studio CTA, trim color, sizes, price + add to cart */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-brand">{product.title}</h1>
            <Link
              href="/studio"
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-brand px-3 py-2 text-xs font-semibold text-brand hover:bg-muted"
            >
              <Palette className="size-3.5" /> Design Studio
            </Link>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <div className="text-sm font-semibold text-brand">1. Add your logo</div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onLogoFile(f);
                e.target.value = "";
              }}
            />
            {!logoSrc ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 flex items-center gap-2 rounded-lg border border-dashed px-4 py-3 text-sm font-medium text-muted-foreground hover:border-brand hover:text-brand"
              >
                <ImagePlus className="size-4" /> Upload logo
              </button>
            ) : (
              <>
                <p className="mt-2 text-xs text-muted-foreground">Drag the logo on the photo to place it.</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {(["print", "embroidery"] as const).map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setApplication(a)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-semibold capitalize",
                        application === a ? "border-brand bg-brand text-white" : "text-muted-foreground hover:border-brand"
                      )}
                    >
                      {a === "embroidery" ? "Stitched (Embroidery)" : "Print"}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowPositionPanel((s) => !s)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold",
                      showPositionPanel ? "border-brand bg-brand text-white" : "text-muted-foreground hover:border-brand"
                    )}
                  >
                    <Move className="size-3.5" /> Position graphic
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogoSrc(null)}
                    aria-label="Remove logo"
                    className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-muted"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {showPositionPanel && (
                  <div className="mt-4 rounded-xl border p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {(
                        [
                          ["Height", pctToCm(logoHeight), (cm: number) => setLogoHeight(Math.max(4, cmToPct(cm)))],
                          ["Width", pctToCm(logoWidth), (cm: number) => setLogoWidth(Math.max(4, cmToPct(cm)))],
                        ] as const
                      ).map(([label, cm, set]) => (
                        <div key={label}>
                          <div className="text-xs font-medium text-muted-foreground">{label}</div>
                          <div className="mt-1 flex items-center gap-1">
                            <div className="flex h-9 flex-1 items-center rounded-md border px-2 text-sm">
                              {cm.toFixed(2)} <span className="ml-1 text-xs text-muted-foreground">cm</span>
                            </div>
                            <button type="button" onClick={() => set(cm - 0.5)} className="grid size-9 shrink-0 place-items-center rounded-md border hover:bg-muted">
                              <Minus className="size-3.5" />
                            </button>
                            <button type="button" onClick={() => set(cm + 0.5)} className="grid size-9 shrink-0 place-items-center rounded-md border hover:bg-muted">
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs font-medium text-muted-foreground">Centering</div>
                        <div className="mt-1 flex gap-1">
                          <button type="button" onClick={centerHorizontal} aria-label="Center horizontally" className="grid size-9 place-items-center rounded-md border hover:bg-muted">
                            <AlignCenterVertical className="size-4" />
                          </button>
                          <button type="button" onClick={centerVertical} aria-label="Center vertically" className="grid size-9 place-items-center rounded-md border hover:bg-muted">
                            <AlignCenterHorizontal className="size-4" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-muted-foreground">Moving</div>
                        <div className="mt-1 flex gap-1">
                          <button type="button" onClick={() => nudge(-2, 0)} aria-label="Move left" className="grid size-9 place-items-center rounded-md border hover:bg-muted">
                            <ChevronLeft className="size-4" />
                          </button>
                          <button type="button" onClick={() => nudge(2, 0)} aria-label="Move right" className="grid size-9 place-items-center rounded-md border hover:bg-muted">
                            <ChevronRight className="size-4" />
                          </button>
                          <button type="button" onClick={() => nudge(0, -2)} aria-label="Move up" className="grid size-9 place-items-center rounded-md border hover:bg-muted">
                            <ChevronUp className="size-4" />
                          </button>
                          <button type="button" onClick={() => nudge(0, 2)} aria-label="Move down" className="grid size-9 place-items-center rounded-md border hover:bg-muted">
                            <ChevronDown className="size-4" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-muted-foreground">Rotate</div>
                        <button
                          type="button"
                          onClick={() => setRotation((r) => (r + 15) % 360)}
                          aria-label="Rotate"
                          className="mt-1 grid size-9 place-items-center rounded-md border hover:bg-muted"
                        >
                          <RotateCw className="size-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {(
                        [
                          ["Top distance", pctToCm(logoTop), (cm: number) => setLogoTop(clampPct(cmToPct(cm)))],
                          ["Left distance", pctToCm(logoLeft), (cm: number) => setLogoLeft(clampPct(cmToPct(cm)))],
                        ] as const
                      ).map(([label, cm, set]) => (
                        <div key={label}>
                          <div className="text-xs font-medium text-muted-foreground">{label}</div>
                          <div className="mt-1 flex items-center gap-1">
                            <div className="flex h-9 flex-1 items-center rounded-md border px-2 text-sm">
                              {cm.toFixed(2)} <span className="ml-1 text-xs text-muted-foreground">cm</span>
                            </div>
                            <button type="button" onClick={() => set(cm - 0.5)} className="grid size-9 shrink-0 place-items-center rounded-md border hover:bg-muted">
                              <Minus className="size-3.5" />
                            </button>
                            <button type="button" onClick={() => set(cm + 0.5)} className="grid size-9 shrink-0 place-items-center rounded-md border hover:bg-muted">
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowPositionPanel(false);
                        toast.success("Logo position updated");
                      }}
                      className="mt-4 h-10 w-full rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand/90"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-8">
            <div className="text-sm font-semibold text-brand">2. Collar color — {color.name}</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {product.colors.map((id) => {
                const c = colorById(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => selectColor(id)}
                    aria-label={c.name}
                    title={c.name}
                    className={cn(
                      "size-9 rounded-full ring-1 ring-border transition-shadow",
                      colorId === id && "ring-2 ring-offset-2 ring-brand"
                    )}
                    style={{ background: c.hex }}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <div className="text-sm font-semibold text-brand">3. Choose sizes (min. order {product.minBulk})</div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {product.sizes.map((s) => (
                <div key={s} className="flex items-center justify-between rounded-lg border px-3 py-2">
                  <span className="text-sm font-semibold">{s}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSize(s, (sizes[s] ?? 0) - 1)}
                      className="grid size-6 place-items-center rounded-md hover:bg-muted"
                      aria-label={`Fewer ${s}`}
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="w-5 text-center text-sm tabular-nums">{sizes[s] ?? 0}</span>
                    <button
                      type="button"
                      onClick={() => setSize(s, (sizes[s] ?? 0) + 1)}
                      className="grid size-6 place-items-center rounded-md hover:bg-muted"
                      aria-label={`More ${s}`}
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
            <div className="text-sm">
              <div className="text-muted-foreground">Lead time</div>
              <div className="font-semibold text-brand">7–10 business days</div>
              <div className="mt-1 text-muted-foreground">Price</div>
              <div className="font-semibold text-brand">{formatPrice(product.price, product.currency)} per piece</div>
            </div>
            <button
              type="button"
              onClick={addToCart}
              className="h-11 shrink-0 rounded-lg bg-brand px-6 text-sm font-semibold text-white hover:bg-brand/90"
            >
              Add to cart ({totalQty})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
