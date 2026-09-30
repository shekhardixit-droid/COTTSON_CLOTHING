"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ImagePlus, Minus, Move, Palette, Plus, Shirt, X, ZoomIn, ZoomOut } from "lucide-react";
import { type Product, colorById, formatPrice, variantUrl } from "@/lib/catalog";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import {
  DEFAULT_LOGO_CM,
  FINISHINGS,
  finishingById,
  focusOn,
  frameFor,
  largestWidthFor,
  maxWidthFor,
  placeAt,
  tierFor,
  type Focus,
  type Placement,
  type PositionId,
} from "@/components/design-studio/placement";
import { LogoLayer, blendFor } from "@/components/design-studio/logo-layer";
import { PositionDialog } from "@/components/design-studio/position-dialog";
import { GarmentPhoto, useFabricColor } from "@/components/design-studio/garment-photo";
import { useFabricUnder, usePhoto } from "@/components/design-studio/use-conformed-art";
import { stitchAngleFor } from "@/lib/conform";
import { readLogoFile, useLogoArt, useStitchability, type LogoFile } from "@/components/design-studio/use-logo-artwork";
import { THREADS } from "@/lib/embroidery";
import { contrastRatio } from "@/lib/contrast";

type ThreadChoice = "auto" | "logo" | (typeof THREADS)[number]["id"];

/** Two-way pill toggle over the photo */
function Segmented<T>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly (readonly [string, T])[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex rounded-full bg-background/90 p-0.5 text-xs font-medium shadow-sm" role="group" aria-label={label}>
      {options.map(([text, v]) => (
        <button
          key={text}
          type="button"
          aria-pressed={value === v}
          onClick={() => onChange(v)}
          className={cn("rounded-full px-3 py-1", value === v ? "bg-brand text-white" : "hover:bg-muted")}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

/** Product detail page for the Essential Polo: wave-sweep trim-color swap, a quick logo
 * preview, and the real catalog (price, sizes, minBulk) + cart. The full editor is /studio. */
export function EssentialPoloDetail({ product, initialColor }: { product: Product; initialColor: string }) {
  const add = useCart((s) => s.add);
  const [colorId, setColorId] = useState(initialColor);
  const [sizes, setSizes] = useState<Record<string, number>>({});

  // Real-world size of this product's photo frame, so logos are sized in true cm
  const frame = useMemo(() => frameFor(product.fit), [product.fit]);
  const [logo, setLogo] = useState<LogoFile | null>(null);
  const [placement, setPlacement] = useState<Placement>(() => placeAt(frame, "left-chest", DEFAULT_LOGO_CM, 1));
  const [positionId, setPositionId] = useState<PositionId>("left-chest");
  // Print / Stitched pick the smallest tier of that kind; growing the logo steps the tier up
  const [finishingId, setFinishingId] = useState("dtf-s");
  const [positionOpen, setPositionOpen] = useState(false);
  // Zoomed in on the logo (set on upload / by the zoom button); null = whole garment
  const [focus, setFocus] = useState<Focus | null>(null);
  // Before/after compare in embroidery mode: true shows the uploaded file un-stitched
  const [showFlat, setShowFlat] = useState(false);
  // Flat / Conformed compare: false shows the stitched logo without bending it to the fabric
  const [conformed, setConformed] = useState(true);
  const frameRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const finishing = finishingById(finishingId);
  const embroidered = finishing.kind === "embroidery";
  const maxW = logo ? largestWidthFor(finishing.kind, logo.aspect) : 10;

  // The shirt's actual color right under the logo (sampled from the photo), for thread contrast
  const fabricSrc = variantUrl(product, colorId);
  const fabric = useFabricColor(
    fabricSrc,
    Math.round(((placement.x + placement.w / 2) / frame.w) * 50) / 50,
    Math.round(((placement.y + placement.w / (logo?.aspect ?? 1) / 2) / frame.h) * 50) / 50
  );

  // Thread: "auto" keeps the logo's own colors while they stand out from the shirt (3:1+) and
  // otherwise switches to the stock thread with the best contrast; the customer can override.
  const [threadChoice, setThreadChoice] = useState<ThreadChoice>("auto");
  const logoColors = logo ? logo.palette.slice(0, finishing.maxColors) : [];
  const bestThread = THREADS.reduce((a, b) => (contrastRatio(b.hex, fabric) > contrastRatio(a.hex, fabric) ? b : a));
  const logoReadable = logoColors.length > 0 && contrastRatio(logoColors[0], fabric) >= 3;
  const thread =
    threadChoice === "logo"
      ? null
      : threadChoice === "auto"
        ? logoReadable
          ? null
          : bestThread
        : THREADS.find((t) => t.id === threadChoice)!;
  const threadColors = thread ? [thread.hex] : logoColors;
  // Contrast of the main thread color (the one most of the logo is stitched in) against the shirt
  const threadContrast = threadColors.length ? contrastRatio(threadColors[0], fabric) : 21;
  // The photo at full resolution, and the fabric right under the logo (folds, stripes)
  const photo = usePhoto(fabricSrc);
  const under = useFabricUnder(photo, frame, placement, logo?.aspect ?? 1);
  // Multiply shows the fabric through the thread at full strength: fine for plain fabric, but on
  // stripes / checks the pattern would print straight through the logo, so keep thread opaque
  const blend = under && !under.plain ? "normal" : blendFor(fabric, threadColors);
  // Stitch along clear folds (else the usual 45°)
  const stitchAngle = under ? stitchAngleFor(under.stats) : 45;

  // Too-fine strokes: optionally grown before stitching so the thinnest reach ~1.6 mm
  const stitchCheck = useStitchability(logo?.src ?? null, embroidered, placement.w);
  const [thicken, setThicken] = useState(false);
  const thickenMm = thicken ? Math.min(1, Math.max(0.2, (1.6 - stitchCheck.minStrokeMm) / 2)) : 0;

  const logoArt = useLogoArt(logo?.src ?? null, {
    embroidered,
    maxColors: finishing.maxColors,
    color: embroidered ? (thread?.hex ?? null) : null,
    widthCm: placement.w,
    thickenMm,
    angleDeg: stitchAngle,
  }).url;

  const onLogoFile = async (file: File) => {
    try {
      const l = await readLogoFile(file);
      // Standard left-chest size: the longer side ~8 cm, within the finishing's limit
      const w = Math.min(DEFAULT_LOGO_CM, DEFAULT_LOGO_CM * l.aspect, maxWidthFor(finishing, l.aspect));
      const p = placeAt(frame, positionId, w, l.aspect);
      setLogo(l);
      setPlacement(p);
      setThicken(false);
      // Zoom the photo in on the logo right away
      setFocus(focusOn(frame, p, l.aspect));
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
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left: photo with the wave-sweep color swap, zoomed in on the logo once there is one.
            Sticky so it stays on screen while the (usually longer) options column scrolls. */}
        <div className="relative lg:sticky lg:top-32 lg:self-start">
          <div className="relative grid aspect-[682/1024] w-full max-w-[540px] place-items-center justify-items-start overflow-hidden rounded-2xl bg-white">
              <GarmentPhoto ref={frameRef} product={product} colorId={colorId} focus={focus}>
                {logo && logoArt && (
                  <LogoLayer
                    src={showFlat ? logo.src : logoArt}
                    embroidered={embroidered && !showFlat}
                    fabricSrc={fabricSrc}
                    blend={blend}
                    frame={frame}
                    placement={placement}
                    aspect={logo.aspect}
                    maxWidth={maxW}
                    onChange={onPlacement}
                    frameRef={frameRef}
                    zoom={focus?.z ?? 1}
                    conformed={conformed}
                  />
                )}
              </GarmentPhoto>
          </div>
          {logo && (
            <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-end gap-2">
              {embroidered && (
                // Before/after: the uploaded file as-is vs. the stitched render, same spot and zoom
                <Segmented
                  label="Compare before and after"
                  options={[["Before", true], ["After", false]]}
                  value={showFlat}
                  onChange={setShowFlat}
                />
              )}
              {embroidered && !showFlat && (
                // Flat / Conformed: the stitched logo as-is vs. bent to the fabric's folds and pattern
                <Segmented
                  label="Compare flat and conformed"
                  options={[["Flat", false], ["Conformed", true]]}
                  value={conformed}
                  onChange={setConformed}
                />
              )}
              <button
                type="button"
                aria-pressed={!!focus}
                onClick={() => setFocus((f) => (f ? null : focusOn(frame, placement, logo.aspect)))}
                className="flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-background"
              >
                {focus ? <ZoomOut className="size-3.5" /> : <ZoomIn className="size-3.5" />}
                {focus ? "Zoom out" : "Zoom to logo"}
              </button>
            </div>
          )}
        </div>

        {/* Right: title, design studio CTA, logo, trim color, sizes, price + add to cart */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-brand">{product.title}</h1>
            <div className="flex shrink-0 items-center gap-2">
            <Link
              href={`/studio?product=${product.slug}&color=${colorId}`}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-white hover:bg-brand/90"
            >
              <Shirt className="size-3.5" /> Customize
            </Link>
            <Link
              href={`/mockup-lab?product=${product.slug}`}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-brand px-3 py-2 text-xs font-semibold text-brand hover:bg-muted"
            >
              <Palette className="size-3.5" /> Design Studio
            </Link>
            </div>
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
                  {embroidered && !thread && logo.palette.length > finishing.maxColors && ` — your ${logo.palette.length}-color logo was reduced`}
                </p>

                {embroidered && (
                  <div className="mt-4">
                    <div className="text-xs font-medium text-foreground">
                      Thread — {thread ? thread.name : "Logo colors"}
                      {threadChoice === "auto" && <span className="text-muted-foreground"> (auto)</span>}
                    </div>
                    <div role="radiogroup" aria-label="Thread color" className="mt-2 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={!thread}
                        onClick={() => setThreadChoice("logo")}
                        className={cn(
                          "flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium",
                          !thread ? "border-brand ring-1 ring-brand" : "text-muted-foreground hover:border-brand"
                        )}
                      >
                        <span className="flex -space-x-1" aria-hidden>
                          {logoColors.map((c) => (
                            <span key={c} className="size-3 rounded-full ring-1 ring-black/15" style={{ background: c }} />
                          ))}
                        </span>
                        Logo colors
                      </button>
                      {THREADS.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          role="radio"
                          aria-checked={thread?.id === t.id}
                          aria-label={`${t.name} thread`}
                          title={`${t.name} · ${contrastRatio(t.hex, fabric).toFixed(1)}:1 on this shirt`}
                          onClick={() => setThreadChoice(t.id)}
                          className={cn(
                            "size-7 rounded-full ring-1 ring-inset ring-black/15 transition-transform hover:scale-110",
                            thread?.id === t.id && "ring-2 ring-brand ring-offset-2 ring-offset-background"
                          )}
                          style={{ background: t.hex }}
                        />
                      ))}
                    </div>
                    {threadContrast < 3 && (
                      <p className="mt-2 text-xs text-amber-700">
                        Low contrast ({threadContrast.toFixed(1)}:1) — this thread will be hard to see on this shirt.{" "}
                        {thread?.id !== bestThread.id && (
                          <button type="button" onClick={() => setThreadChoice(bestThread.id)} className="font-semibold underline underline-offset-2">
                            Use {bestThread.name} thread
                          </button>
                        )}
                      </p>
                    )}
                  </div>
                )}

                {stitchCheck.tooFine && !thicken && (
                  <p className="mt-3 text-xs font-medium text-amber-700">
                    Some strokes/text are too fine to stitch cleanly at this size (thinnest ~{stitchCheck.minStrokeMm.toFixed(1)} mm, needs
                    1.5 mm).{" "}
                    <button type="button" onClick={() => setThicken(true)} className="font-semibold underline underline-offset-2">
                      Thicken strokes
                    </button>
                  </p>
                )}
                {embroidered && thicken && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Strokes thickened by {thickenMm.toFixed(1)} mm per side for stitching.{" "}
                    <button type="button" onClick={() => setThicken(false)} className="font-semibold text-brand underline underline-offset-2">
                      Undo
                    </button>
                  </p>
                )}

                {positionOpen && logoArt && (
                  <PositionDialog
                    frame={frame}
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
                      setFocus(focusOn(frame, p, logo.aspect));
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
