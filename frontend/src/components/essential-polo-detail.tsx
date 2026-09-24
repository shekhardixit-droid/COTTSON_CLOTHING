"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ImagePlus, Minus, Move, Palette, Plus, X, ZoomIn, ZoomOut } from "lucide-react";
import { type Product, colorById, variantUrl, formatPrice } from "@/lib/catalog";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { IMAGE_HEIGHT_CM, IMAGE_WIDTH_CM, finishingById, maxWidthFor, placeAt, type Placement } from "@/components/design-studio/placement";
import { LogoLayer } from "@/components/design-studio/logo-layer";
import { PositionPanel } from "@/components/design-studio/position-panel";
import { FabricCloseup, GarmentPhoto, useFabricColor } from "@/components/design-studio/garment-photo";
import { readLogoFile, useStitchedLogo, type LogoFile } from "@/components/design-studio/use-logo-artwork";

// The quick Print / Stitched toggle maps onto the studio's finishing tiers
const FINISHING = { print: "dtf-m", embroidery: "emb-standard" } as const;

/** Product detail page for the Essential Polo: wave-sweep trim-color swap, a quick logo
 * preview, and the real catalog (price, sizes, minBulk) + cart. The full editor is /studio. */
export function EssentialPoloDetail({ product, initialColor }: { product: Product; initialColor: string }) {
  const add = useCart((s) => s.add);
  const [colorId, setColorId] = useState(initialColor);
  const [sizes, setSizes] = useState<Record<string, number>>({});

  const [logo, setLogo] = useState<LogoFile | null>(null);
  const [placement, setPlacement] = useState<Placement>(placeAt("left-chest", 8, 1));
  const [application, setApplication] = useState<"print" | "embroidery">("print");
  const [showPositionPanel, setShowPositionPanel] = useState(false);
  const [closeup, setCloseup] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const finishing = finishingById(FINISHING[application]);
  const embroidered = application === "embroidery";
  const maxW = logo ? maxWidthFor(finishing, logo.aspect) : 10;
  const stitched = useStitchedLogo(logo?.src ?? null, {
    enabled: embroidered,
    maxColors: finishing.maxColors,
    thread: null,
    widthCm: placement.w,
  });
  const logoArt = embroidered ? stitched.url ?? logo?.src : logo?.src;
  const fabric = useFabricColor(
    variantUrl(product, colorId),
    (placement.x + placement.w / 2) / IMAGE_WIDTH_CM,
    logo ? (placement.y + placement.w / logo.aspect / 2) / IMAGE_HEIGHT_CM : 0.4
  );

  const onLogoFile = async (file: File) => {
    try {
      const l = await readLogoFile(file);
      setLogo(l);
      setPlacement(placeAt("left-chest", Math.min(8, maxWidthFor(finishing, l.aspect)), l.aspect));
      setCloseup(true); // show the logo up close right away
    } catch {
      toast.error("Couldn't read that file — try a PNG, JPG or SVG");
    }
  };

  const setFinish = (a: "print" | "embroidery") => {
    setApplication(a);
    if (!logo) return;
    // Shrink to the finishing's max size around the same centre if needed
    const w = Math.min(placement.w, maxWidthFor(finishingById(FINISHING[a]), logo.aspect));
    setPlacement((p) => ({ ...p, w, x: p.x + (p.w - w) / 2, y: p.y + (p.w - w) / logo.aspect / 2 }));
  };

  const color = colorById(colorId);
  const totalQty = Object.values(sizes).reduce((n, q) => n + q, 0);
  const setSize = (s: string, qty: number) => setSizes((prev) => ({ ...prev, [s]: Math.max(0, qty) }));

  const selectColor = (id: string) => {
    if (id === colorId) return;
    setColorId(id);
    window.history.replaceState(null, "", `?color=${id}`);
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
        {/* Left: photo with the wave-sweep color swap, or the logo close-up */}
        <div className="relative bg-muted">
          <div className="relative grid aspect-square w-full place-items-center overflow-hidden">
            {closeup && logo && logoArt ? (
              <FabricCloseup fabric={fabric} logo={logoArt} aspect={logo.aspect} rotation={placement.rotation} embroidered={embroidered} />
            ) : (
              <GarmentPhoto ref={frameRef} product={product} colorId={colorId}>
                {logo && logoArt && (
                  <LogoLayer
                    src={logoArt}
                    embroidered={embroidered}
                    placement={placement}
                    aspect={logo.aspect}
                    maxWidth={maxW}
                    onChange={setPlacement}
                    frameRef={frameRef}
                  />
                )}
              </GarmentPhoto>
            )}
          </div>
          {logo && (
            <button
              type="button"
              onClick={() => setCloseup((z) => !z)}
              className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-background"
            >
              {closeup ? <ZoomOut className="size-3.5" /> : <ZoomIn className="size-3.5" />}
              {closeup ? "Full view" : "Close-up"}
            </button>
          )}
        </div>

        {/* Right: title, design studio CTA, logo, trim color, sizes, price + add to cart */}
        <div className="p-6 sm:p-8">
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
                        application === a ? "border-brand bg-brand text-white" : "text-muted-foreground hover:border-brand"
                      )}
                    >
                      {a === "embroidery" ? "Stitched (Embroidery)" : "Print"}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setShowPositionPanel((s) => !s);
                      setCloseup(false);
                    }}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold",
                      showPositionPanel ? "border-brand bg-brand text-white" : "text-muted-foreground hover:border-brand"
                    )}
                  >
                    <Move className="size-3.5" /> Position graphic
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLogo(null);
                      setCloseup(false);
                    }}
                    aria-label="Remove logo"
                    className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-muted"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                {embroidered && logo.colors > finishing.maxColors && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Embroidery stitches up to {finishing.maxColors} thread colors — your {logo.colors}-color logo was reduced. More options in the Design Studio.
                  </p>
                )}

                {showPositionPanel && (
                  <div className="mt-4 rounded-xl border p-4">
                    <PositionPanel
                      placement={placement}
                      aspect={logo.aspect}
                      maxWidth={maxW}
                      onChange={setPlacement}
                      onApply={() => {
                        setShowPositionPanel(false);
                        toast.success("Logo position updated");
                      }}
                    />
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
