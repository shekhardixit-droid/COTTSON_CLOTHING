"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Palette,
  Plus,
  Minus,
  Upload,
  X,
  Eraser,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { removeBackground } from "@/lib/remove-bg";

// Fixed set of pre-made collar-trim photos — swapped between directly, no live pixel
// recolor. Only the ones with a photo are wired up; the rest show a placeholder until
// those photos are made.
type Preset = { name: string; hex: string; photo: string | null };

const PRESETS: Preset[] = [
  { name: "Green Trim", hex: "#7ac142", photo: "/mockup/polo-green.png" },
  { name: "Black Trim", hex: "#1c1c1c", photo: "/mockup/polo-black.png" },
  { name: "Navy Trim", hex: "#1f2a44", photo: "/mockup/polo-navy.png" },
  { name: "Red Trim", hex: "#c8102e", photo: "/mockup/polo-red.png" },
  { name: "White Trim", hex: "#f5f5f2", photo: "/mockup/polo-white.png" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const MIN_ORDER = 25;
const UNIT_PRICE = 499;

// Logo placement on the polo: left chest area (fractions of the photo frame)
// These position the logo nicely on the left chest of the polo product photos
const LOGO_AREA = {
  // Position as fraction of the photo dimensions (left-chest placement)
  left: 0.52,
  top: 0.32,
  // Max logo size as fraction of image width
  maxWidthFraction: 0.14,
};

type UploadedLogo = {
  originalSrc: string;
  displaySrc: string; // may be bg-removed version
  name: string;
  aspect: number; // width / height
  bgRemoved: boolean;
};

function TrimPhoto({ preset }: { preset: (typeof PRESETS)[number] }) {
  if (!preset.photo) {
    return (
      <div className="grid size-full place-items-center border-2 border-dashed bg-muted text-muted-foreground">
        <div className="text-center">
          <ImageIcon className="mx-auto size-6" strokeWidth={1.5} />
          <p className="mt-2 text-xs">{preset.name} photo coming soon</p>
        </div>
      </div>
    );
  }
  return (
    <Image src={preset.photo} alt={`Essential Polo — ${preset.name}`} fill sizes="600px" className="object-contain" />
  );
}

export function MockupLiveCustomizer() {
  const [selected, setSelected] = useState<(typeof PRESETS)[number]>(PRESETS[0]);
  // The base photo stays put; `incoming` sweeps in over it left-to-right behind a single
  // soft wave band, then becomes the new base once the sweep finishes.
  const [base, setBase] = useState<(typeof PRESETS)[number]>(PRESETS[0]);
  const [incoming, setIncoming] = useState<(typeof PRESETS)[number] | null>(null);
  const [swept, setSwept] = useState(false);

  const selectPreset = (p: (typeof PRESETS)[number]) => {
    if (p.hex === selected.hex) return;
    setSelected(p);
    setIncoming(p);
    setSwept(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setSwept(true)));
    window.setTimeout(() => {
      setBase(p);
      setIncoming(null);
      setSwept(false);
    }, 650);
  };

  const [sizes, setSizes] = useState<Record<string, number>>({});
  const [logo, setLogo] = useState<UploadedLogo | null>(null);
  const [removingBg, setRemovingBg] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const totalQty = Object.values(sizes).reduce((n, q) => n + q, 0);
  const setSize = (s: string, qty: number) => setSizes((prev) => ({ ...prev, [s]: Math.max(0, qty) }));

  const addToBasket = () => {
    if (totalQty < MIN_ORDER) {
      toast.error(`Minimum order is ${MIN_ORDER} pieces (you have ${totalQty})`);
      return;
    }
    toast.success(`Added ${totalQty} × Essential Polo (${selected.name}) to basket`);
  };

  /** Read an uploaded logo file */
  const handleLogoUpload = async (file: File) => {
    try {
      const src = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.onerror = reject;
        r.readAsDataURL(file);
      });

      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new window.Image();
        i.onload = () => resolve(i);
        i.onerror = reject;
        i.src = src;
      });

      const aspect = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1;

      setLogo({
        originalSrc: src,
        displaySrc: src,
        name: file.name,
        aspect,
        bgRemoved: false,
      });
      toast.success("Logo uploaded! You can remove the background if needed.");
    } catch {
      toast.error("Couldn't read that file — try a PNG, JPG or SVG");
    }
  };

  /** Toggle background removal on/off */
  const toggleBgRemoval = async () => {
    if (!logo) return;

    if (logo.bgRemoved) {
      // Restore original
      setLogo({ ...logo, displaySrc: logo.originalSrc, bgRemoved: false });
      toast.success("Background restored");
      return;
    }

    setRemovingBg(true);
    try {
      const cleaned = await removeBackground(logo.originalSrc);
      setLogo({ ...logo, displaySrc: cleaned, bgRemoved: true });
      toast.success("Background removed!");
    } catch {
      toast.error("Couldn't remove background — try a logo with a solid background");
    } finally {
      setRemovingBg(false);
    }
  };

  /** Remove logo completely */
  const removeLogo = () => {
    setLogo(null);
  };

  // Compute logo overlay style: auto-sized to look good on the polo chest
  const logoStyle = logo
    ? (() => {
        // Max width of the logo as a fraction of the photo
        const maxW = LOGO_AREA.maxWidthFraction;
        // If logo is wider than tall, width-constrain; if taller, height-constrain
        const logoW = logo.aspect >= 1 ? maxW : maxW * logo.aspect;
        const logoH = logoW / logo.aspect;
        return {
          position: "absolute" as const,
          left: `${LOGO_AREA.left * 100}%`,
          top: `${LOGO_AREA.top * 100}%`,
          width: `${logoW * 100}%`,
          height: `${logoH * 100}%`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none" as const,
          zIndex: 10,
        };
      })()
    : null;

  return (
    <div className="grid gap-10 overflow-hidden rounded-2xl border lg:grid-cols-2">
      {/* Left: big product photo with logo overlay */}
      <div className="relative bg-muted">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <TrimPhoto preset={base} />

          {incoming && (
            <div
              className="absolute inset-0 transition-[clip-path] duration-[650ms] ease-in-out"
              style={{ clipPath: `inset(0 ${swept ? "0%" : "100%"} 0 0)` }}
            >
              <TrimPhoto preset={incoming} />
            </div>
          )}

          {/* A single soft wave band rides the sweep's leading edge, instead of blurring the whole photo */}
          {incoming && (
            <div
              className="pointer-events-none absolute inset-y-0 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-background/70 to-transparent blur-md transition-[left] duration-[650ms] ease-in-out"
              style={{ left: swept ? "100%" : "0%" }}
            />
          )}

          {/* Logo overlay on the garment */}
          {logo && logoStyle && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo.displaySrc}
              alt="Your logo"
              style={logoStyle}
              className="object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
            />
          )}
        </div>
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
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          <span className="size-2 rounded-full bg-brand" />
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/20" />
        </div>
      </div>

      {/* Right: title, design studio CTA, logo upload, trim color, sizes, price + add to basket */}
      <div className="p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-brand">
          COTTSON<span className="text-brand-accent">.</span> Essential Polo
        </h2>

        <Link
          href="/studio"
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand/90"
        >
          <Palette className="size-4" /> Design Studio — design it yourself!
        </Link>

        {/* LOGO UPLOAD SECTION */}
        <div className="mt-8">
          <div className="text-sm font-semibold text-brand">Your Logo</div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Upload your company logo to preview it on the garment
          </p>

          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleLogoUpload(f);
              e.target.value = "";
            }}
          />

          {logo ? (
            <div className="mt-3 space-y-2.5">
              {/* Logo preview + filename + remove */}
              <div className="flex items-center gap-3 rounded-lg bg-muted p-2.5">
                <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-md bg-white ring-1 ring-black/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.displaySrc} alt="" className="max-h-full max-w-full object-contain p-0.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-brand">{logo.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {logo.bgRemoved ? "Background removed" : "Original background"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  aria-label="Replace logo"
                  className="grid size-8 shrink-0 place-items-center rounded-md text-brand hover:bg-white"
                  title="Replace logo"
                >
                  <Upload className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={removeLogo}
                  aria-label="Remove logo"
                  className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-white hover:text-destructive"
                  title="Remove logo"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Remove Background toggle button */}
              <button
                type="button"
                onClick={toggleBgRemoval}
                disabled={removingBg}
                className={cn(
                  "flex h-10 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors",
                  logo.bgRemoved
                    ? "bg-brand/10 text-brand ring-1 ring-brand/20 hover:bg-brand/15"
                    : "bg-muted text-brand hover:bg-muted/70"
                )}
              >
                {removingBg ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Removing background…
                  </>
                ) : logo.bgRemoved ? (
                  <>
                    <Eraser className="size-4" />
                    Restore original background
                  </>
                ) : (
                  <>
                    <Eraser className="size-4" />
                    Remove background
                  </>
                )}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-3 flex h-20 w-full flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-brand/20 bg-muted/50 text-brand transition-colors hover:border-brand/40 hover:bg-muted"
            >
              <Upload className="size-5" />
              <span className="text-xs font-semibold">Upload logo — PNG, JPG or SVG</span>
            </button>
          )}
        </div>

        <div className="mt-8">
          <div className="text-sm font-semibold text-brand">1. Collar color — {selected.name}</div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {PRESETS.map((p) => (
              <button
                key={p.hex}
                type="button"
                onClick={() => selectPreset(p)}
                aria-label={p.name}
                title={p.name}
                className={cn(
                  "size-9 rounded-full ring-1 ring-border transition-shadow",
                  selected.hex === p.hex && "ring-2 ring-offset-2 ring-brand"
                )}
                style={{ background: p.hex }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="text-sm font-semibold text-brand">2. Choose sizes (min. order {MIN_ORDER})</div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SIZES.map((s) => (
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
            <div className="font-semibold text-brand">₹{UNIT_PRICE} per piece</div>
          </div>
          <button
            type="button"
            onClick={addToBasket}
            className="h-11 shrink-0 rounded-lg bg-brand px-6 text-sm font-semibold text-white hover:bg-brand/90"
          >
            Add to basket ({totalQty})
          </button>
        </div>
      </div>
    </div>
  );
}
