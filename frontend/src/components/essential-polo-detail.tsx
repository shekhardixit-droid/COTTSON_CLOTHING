"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { toast } from "sonner";
import { ChevronRight, ImagePlus, Minus, Move, Palette, Plus, X, ZoomIn, ZoomOut } from "lucide-react";
import { type Product, assetUrl, colorById, formatPrice } from "@/lib/catalog";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import {
  FINISHINGS,
  IMAGE_ASPECT,
  finishingById,
  focusOn,
  largestWidthFor,
  maxWidthFor,
  placeAt,
  tierFor,
  type Focus,
  type Placement,
  type PositionId,
} from "@/components/design-studio/placement";
import { LogoLayer } from "@/components/design-studio/logo-layer";
import { PositionDialog } from "@/components/design-studio/position-dialog";
import { GarmentPhoto } from "@/components/design-studio/garment-photo";
import { readLogoFile, useLogoArt, type LogoFile } from "@/components/design-studio/use-logo-artwork";

/** Product detail page for the Essential Polo: wave-sweep trim-color swap, a quick logo
 * preview, and the real catalog (price, sizes, minBulk) + cart. The full editor is /studio. */
export function EssentialPoloDetail({ product, initialColor }: { product: Product; initialColor: string }) {
  const add = useCart((s) => s.add);
  const [colorId, setColorId] = useState(initialColor);
  const [sizes, setSizes] = useState<Record<string, number>>({});
  const [pose, setPose] = useState(0);

  const [logo, setLogo] = useState<LogoFile | null>(null);
  const [placement, setPlacement] = useState<Placement>(placeAt("left-chest", 8, 1));
  const [positionId, setPositionId] = useState<PositionId>("left-chest");
  // Print / Stitched pick the smallest tier of that kind; growing the logo steps the tier up
  const [finishingId, setFinishingId] = useState("dtf-s");
  const [positionOpen, setPositionOpen] = useState(false);
  // Zoomed in on the logo (set on upload / by the zoom button); null = whole garment
  const [focus, setFocus] = useState<Focus | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const finishing = finishingById(finishingId);
  const embroidered = finishing.kind === "embroidery";
  const maxW = logo ? largestWidthFor(finishing.kind, logo.aspect) : 10;
  const logoArt = useLogoArt(logo?.src ?? null, {
    embroidered,
    maxColors: finishing.maxColors,
    color: null,
    widthCm: placement.w,
  }).url;

  const onLogoFile = async (file: File) => {
    try {
      const l = await readLogoFile(file);
      const p = placeAt(positionId, Math.min(8, maxWidthFor(finishing, l.aspect)), l.aspect);
      setLogo(l);
      setPlacement(p);
      setFocus(focusOn(p, l.aspect)); // zoom in on the logo right away
    } catch {
      toast.error("Couldn't read that file — try a PNG, JPG or SVG");
    }
  };

  const onPlacement = (p: Placement) => {
    setPlacement(p);
    if (logo) setFinishingId(tierFor(finishing, p.w, logo.aspect).id);
  };

  const setFinish = (kind: "print" | "embroidery") => {
    if (!logo) return setFinishingId(FINISHINGS.find((f) => f.kind === kind)!.id);
    // Smallest tier of that kind that fits the current size, else shrink to the largest one
    const fits = FINISHINGS.find((f) => f.kind === kind && placement.w <= maxWidthFor(f, logo.aspect) + 1e-6);
    const tier = fits ?? FINISHINGS.filter((f) => f.kind === kind).at(-1)!;
    setFinishingId(tier.id);
    const w = Math.min(placement.w, maxWidthFor(tier, logo.aspect));
    setPlacement((p) => ({ ...p, w, x: p.x + (p.w - w) / 2, y: p.y + (p.w - w) / logo.aspect / 2 }));
  };

  const color = colorById(colorId);
  const totalQty = Object.values(sizes).reduce((n, q) => n + q, 0);
  const setSize = (s: string, qty: number) => setSizes((prev) => ({ ...prev, [s]: Math.max(0, qty) }));

  const selectColor = (id: string) => {
    if (id !== colorId) window.history.replaceState(null, "", `?color=${id}`);
    setColorId(id);
    // Only pose 0 has color-swap variants — jump back to it so the new color is actually visible
    setPose(0);
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
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground hover:underline">Home</Link>
        <ChevronRight className="size-3.5" />
        <Link href="/products" className="hover:text-foreground hover:underline">All Products</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{product.title}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
        {/* Left: alternate-angle thumbnails in a rail beside the main (centered) photo, which
            has the wave-sweep color swap and zooms in on the logo once there is one. Sticky so
            it stays on screen while the (usually longer) options column scrolls. */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
            {product.poses && product.poses > 1 && (
              <div className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:w-20 lg:max-h-[32rem] lg:flex-col lg:overflow-x-visible lg:overflow-y-auto">
                {Array.from({ length: product.poses }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPose(i)}
                    aria-label={`Angle ${i + 1}`}
                    className={cn(
                      "relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-muted lg:w-full",
                      pose === i ? "border-brand" : "border-transparent hover:border-muted-foreground/40"
                    )}
                  >
                    <NextImage
                      src={assetUrl(product.slug, "model-photo.png", i)}
                      alt={`Angle ${i + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            <div className="relative order-1 min-w-0 flex-1 lg:order-2">
              <div
                className="relative w-full overflow-hidden rounded-2xl bg-white"
                style={{ aspectRatio: IMAGE_ASPECT }}
              >
                <GarmentPhoto ref={frameRef} product={product} colorId={colorId} pose={pose} focus={focus}>
                  {logo && logoArt && (
                    <LogoLayer
                      src={logoArt}
                      embroidered={embroidered}
                      placement={placement}
                      aspect={logo.aspect}
                      maxWidth={maxW}
                      onChange={onPlacement}
                      frameRef={frameRef}
                      zoom={focus?.z ?? 1}
                    />
                  )}
                </GarmentPhoto>
              </div>
              {logo && (
                <button
                  type="button"
                  onClick={() => setFocus((f) => (f ? null : focusOn(placement, logo.aspect)))}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-background"
                >
                  {focus ? <ZoomOut className="size-3.5" /> : <ZoomIn className="size-3.5" />}
                  {focus ? "Zoom out" : "Zoom to logo"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: title, design studio CTA, logo, trim color, sizes, price + add to cart */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-brand">{product.title}</h1>
            <Link
              href={`/studio?product=${product.slug}&color=${colorId}`}
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
            {!logo ? (
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
                      onClick={() => setFinish(a)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-semibold capitalize",
                        finishing.kind === a ? "border-brand bg-brand text-white" : "text-muted-foreground hover:border-brand"
                      )}
                    >
                      {a === "embroidery" ? "Stitched (Embroidery)" : "Print"}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPositionOpen(true)}
                    className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-brand"
                  >
                    <Move className="size-3.5" /> Position graphic
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLogo(null);
                      setFocus(null);
                    }}
                    aria-label="Remove logo"
                    className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-muted"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {finishing.label} · max {finishing.maxColors} colors and {finishing.maxCm}×{finishing.maxCm} cm
                  {embroidered && logo.palette.length > finishing.maxColors && ` — your ${logo.palette.length}-color logo was reduced`}
                </p>

                {positionOpen && logoArt && (
                  <PositionDialog
                    logoSrc={logoArt}
                    aspect={logo.aspect}
                    finishing={finishing}
                    placement={placement}
                    positionId={positionId}
                    onClose={() => setPositionOpen(false)}
                    onApply={(p, pos) => {
                      setPlacement(p);
                      setPositionId(pos);
                      setPositionOpen(false);
                      setFocus(focusOn(p, logo.aspect));
                    }}
                  />
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

          <div className="mt-8 border-t pt-6">
            {totalQty > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {product.sizes
                  .filter((s) => (sizes[s] ?? 0) > 0)
                  .map((s) => (
                    <div key={s} className="flex items-center gap-2 rounded-lg bg-[#EAEAEA] px-3 py-2">
                      <span className="text-sm font-semibold">{s}</span>
                      <span className="text-sm tabular-nums text-muted-foreground">{sizes[s]}</span>
                    </div>
                  ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4">
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
    </div>
  );
}
