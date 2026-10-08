"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Palette, Shirt, Upload, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { loadTemplate, renderMockup, type PreparedTemplate } from "@/lib/mockup/renderCanvas";

const steps = [
  {
    step: "1",
    title: "Choose Garment",
    desc: "Select styles, fabrics & colours for your team",
  },
  {
    step: "2",
    title: "Add Branding",
    desc: "Custom embroidery, printing or silicone patches",
  },
  {
    step: "3",
    title: "Approve Sample",
    desc: "Digital preview & physical sample approval",
  },
  {
    step: "4",
    title: "Production & Delivery",
    desc: "Bulk manufacturing with Pan-India dispatch",
  },
];

type Preset = {
  id: string;
  name: string;
  hex: string;
};

// 5 specific whole-garment colours
const PRESETS: Preset[] = [
  { id: "black", name: "Black", hex: "#1c1c1c" },
  { id: "navy", name: "Navy", hex: "#1f2a44" },
  { id: "white", name: "White", hex: "#f5f5f2" },
  { id: "red", name: "Red", hex: "#c8102e" },
  { id: "green", name: "Forest Green", hex: "#1f5a33" },
];

type PlacementId = "left-chest" | "center-chest" | "right-chest";

interface PlacementConfig {
  id: PlacementId;
  label: string;
  shortLabel: string;
  x: string;
  y: string;
}

const PLACEMENTS: PlacementConfig[] = [
  { id: "left-chest", label: "Left Chest", shortLabel: "Left Chest", x: "62%", y: "31%" },
  { id: "center-chest", label: "Center Chest", shortLabel: "Center", x: "50%", y: "41%" },
  { id: "right-chest", label: "Right Chest", shortLabel: "Right Chest", x: "38%", y: "31%" },
];

export function DesignStudioSection() {
  const [selected, setSelected] = useState<Preset>(PRESETS[0]);
  const [base, setBase] = useState<Preset>(PRESETS[0]);
  const [incoming, setIncoming] = useState<Preset | null>(null);
  const [swept, setSwept] = useState(false);

  const [renderedPhotos, setRenderedPhotos] = useState<Record<string, string>>({});
  const initialCanvasRef = useRef<HTMLCanvasElement>(null);

  const [placement, setPlacement] = useState<PlacementId>("left-chest");
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [customLogoName, setCustomLogoName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load template and pre-render all 5 whole-cloth colors for instant 60fps wave sweeps
  useEffect(() => {
    let cancelled = false;

    loadTemplate("polo").then((t: PreparedTemplate | null) => {
      if (!t || cancelled) return;

      const photos: Record<string, string> = {};

      for (const p of PRESETS) {
        // Recolor every region of the polo (body, sleeves, cuffs, collar, placket, tipping) to this color
        const c = renderMockup(
          t,
          {
            colours: {
              body: p.hex,
              sleeve: p.hex,
              collar: p.hex,
              cuff: p.hex,
              placket: p.hex,
              "collar-tip": p.hex,
              "collar-tip-a": p.hex,
              "collar-tip-b": p.hex,
              "sleeve-tip": p.hex,
              "sleeve-tip-a": p.hex,
              "sleeve-tip-b": p.hex,
            } as any,
          },
          null,
          undefined,
          { background: null }
        );
        photos[p.id] = c.toDataURL("image/png");
      }

      if (!cancelled) {
        setRenderedPhotos(photos);
        // Paint immediately onto initial canvas if present
        if (initialCanvasRef.current && photos[PRESETS[0].id]) {
          const ctx = initialCanvasRef.current.getContext("2d");
          const img = new Image();
          img.onload = () => {
            if (initialCanvasRef.current && ctx) {
              initialCanvasRef.current.width = t.config.width;
              initialCanvasRef.current.height = t.config.height;
              ctx.drawImage(img, 0, 0);
            }
          };
          img.src = photos[PRESETS[0].id];
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const selectPreset = (p: Preset) => {
    if (p.id === selected.id) return;
    setSelected(p);
    setIncoming(p);
    setSwept(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSwept(true);
      });
    });
    window.setTimeout(() => {
      setBase(p);
      setIncoming(null);
      setSwept(false);
    }, 650);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setCustomLogo(event.target.result);
        setCustomLogoName(file.name);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleResetLogo = () => {
    setCustomLogo(null);
    setCustomLogoName("");
  };

  const currentPlacement = PLACEMENTS.find((p) => p.id === placement) ?? PLACEMENTS[0];

  return (
    <section
      id="customise"
      className="
        mx-3
        my-10
        overflow-hidden
        rounded-[28px]
        bg-[#E9F0F5]
        sm:mx-5
        sm:rounded-[32px]
        md:mx-7
        md:rounded-[36px]
        lg:mx-10
        lg:rounded-[40px]
        xl:mx-12
      "
    >
      <div
        className="
          mx-auto
          grid
          min-h-[650px]
          max-w-[1450px]
          grid-cols-1
          lg:grid-cols-[0.9fr_1.1fr]
          lg:items-center
        "
      >
        {/* LEFT CONTENT */}
        <div
          className="
            relative
            z-10
            px-6
            pb-12
            pt-14
            sm:px-10
            sm:py-16
            lg:px-14
            lg:py-20
            xl:px-16
          "
        >
          <p className="mb-3 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] text-[#607487]">
            Design before production
          </p>

          <h2
            className="
              max-w-[620px]
              break-words
              text-[34px]
              font-bold
              leading-[1.12]
              tracking-[-0.025em]
              text-[#113858]
              min-[380px]:text-[38px]
              sm:text-[46px]
              lg:text-[52px]
              xl:text-[58px]
            "
          >
            See your idea
            <br />
            <span className="text-[#113858]/45">
              before we make it.
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-[530px]
              break-words
              text-[14px]
              leading-relaxed
              text-[#607487]
              sm:text-[15px]
            "
          >
            Visualise your corporate apparel before production.
            Experiment with garment colours, branding and logo
            placement so your team knows exactly what the final
            product will look like.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {steps.map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-3 rounded-2xl bg-white/70 p-3.5 border border-[#113858]/5 shadow-sm"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#113858] text-[10px] font-bold text-white">
                  {item.step}
                </span>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold text-[#113858]">
                    {item.title}
                  </p>
                  <p className="text-[11px] leading-[1.45] text-[#607487] mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href={`/mockup-lab?product=indus-01&body=${selected.hex.replace("#", "")}&zone=${placement}`}
            className="
              group
              mt-9
              inline-flex
              h-[48px]
              max-w-full
              items-center
              justify-center
              gap-2
              whitespace-nowrap
              rounded-full
              border
              border-[#113858]
              bg-[#113858]
              px-7
              text-[13px]
              font-semibold
              !text-white text-white
              transition-all
              duration-300
              hover:-translate-y-[2px]
              hover:bg-[#0b243a]
              hover:!text-white hover:text-white
              hover:shadow-[0_10px_30px_rgba(17,56,88,0.25)]
            "
            style={{ color: "#ffffff" }}
          >
            <span className="!text-white text-white" style={{ color: "#ffffff" }}>
              Start Your Custom Order
            </span>

            <ArrowRight
              size={15}
              strokeWidth={2.2}
              className="
                shrink-0
                !text-white text-white
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
              style={{ color: "#ffffff" }}
            />
          </Link>
        </div>

        {/* RIGHT VISUAL */}
        <div
          className="
            relative
            min-h-[440px]
            overflow-hidden
            sm:min-h-[500px]
            lg:min-h-[650px]
          "
        >
          <span
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[47%]
              -translate-x-1/2
              -translate-y-1/2
              whitespace-nowrap
              text-[64px]
              font-bold
              tracking-[-0.08em]
              text-[#113858]/[0.035]
              min-[380px]:text-[90px]
              sm:text-[130px]
              lg:text-[150px]
            "
          >
            CUSTOM
          </span>

          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[280px]
              w-[280px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#113858]/10
              min-[380px]:h-[360px]
              min-[380px]:w-[360px]
              sm:h-[430px]
              sm:w-[430px]
              lg:h-[480px]
              lg:w-[480px]
            "
          />

          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[230px]
              w-[230px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white/45
              min-[380px]:h-[300px]
              min-[380px]:w-[300px]
              sm:h-[370px]
              sm:w-[370px]
              lg:h-[410px]
              lg:w-[410px]
            "
          />

          {/* POLO SHIRT PREVIEW */}
          <div
            className="
              absolute
              bottom-[15px]
              left-1/2
              z-10
              h-[300px]
              w-[255px]
              -translate-x-1/2
              min-[380px]:h-[390px]
              min-[380px]:w-[330px]
              sm:h-[440px]
              sm:w-[390px]
              lg:bottom-[25px]
              lg:h-[510px]
              lg:w-[440px]
            "
          >
            <div className="relative h-full w-full select-none">
              {/* Base Garment Photo */}
              <img
                src={renderedPhotos[base.id] || "/mockup/polo-black.png"}
                alt={`Cottson custom apparel — ${base.name}`}
                className="pointer-events-none h-full w-full object-contain drop-shadow-[0_25px_30px_rgba(17,56,88,0.14)]"
              />

              {/* Incoming Garment Photo with Wave Sweep Clip-Path */}
              {incoming && renderedPhotos[incoming.id] && (
                <div
                  className="absolute inset-0 transition-[clip-path] duration-[650ms] ease-in-out"
                  style={{ clipPath: `inset(0 ${swept ? "0%" : "100%"} 0 0)` }}
                >
                  <img
                    src={renderedPhotos[incoming.id]}
                    alt={`Cottson custom apparel — ${incoming.name}`}
                    className="pointer-events-none h-full w-full object-contain drop-shadow-[0_25px_30px_rgba(17,56,88,0.14)]"
                  />
                </div>
              )}

              {/* Soft wave sweep light band on leading edge */}
              {incoming && (
                <div
                  className="pointer-events-none absolute inset-y-0 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent blur-md transition-[left] duration-[650ms] ease-in-out"
                  style={{ left: swept ? "100%" : "0%" }}
                />
              )}

              {/* Active Placed Logo with smooth spring gliding */}
              <div
                style={{
                  left: currentPlacement.x,
                  top: currentPlacement.y,
                }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none select-none"
              >
                <div className="relative">
                  {customLogo ? (
                    <img
                      src={customLogo}
                      alt="Custom corporate logo"
                      className={cn(
                        "h-auto object-contain transition-all duration-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]",
                        placement === "center-chest"
                          ? "max-h-[46px] max-w-[100px] sm:max-h-[56px] sm:max-w-[120px]"
                          : "max-h-[34px] max-w-[65px] sm:max-h-[40px] sm:max-w-[78px]"
                      )}
                    />
                  ) : (
                    <img
                      src="/cottson.png"
                      alt="Cottson embroidery"
                      className={cn(
                        "h-auto object-contain transition-all duration-300",
                        placement === "center-chest"
                          ? "max-h-[34px] max-w-[105px] sm:max-h-[42px] sm:max-w-[125px]"
                          : "max-h-[24px] max-w-[72px] sm:max-h-[30px] sm:max-w-[85px]",
                        selected.id === "white"
                          ? "drop-shadow-[0_1px_3px_rgba(17,56,88,0.2)]"
                          : "brightness-0 invert drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING CUSTOMISATION PANEL (5 WHOLE-CLOTH COLOURS) */}
          <div
            className="
              absolute
              left-[3%]
              top-[4%]
              z-20
              w-[185px]
              rounded-[18px]
              border
              border-white/60
              bg-white/90
              p-3
              shadow-[0_15px_45px_rgba(17,56,88,0.12)]
              backdrop-blur-xl
              min-[380px]:left-[4%]
              min-[380px]:top-[6%]
              min-[380px]:w-[205px]
              min-[380px]:rounded-[20px]
              min-[380px]:p-3.5
              sm:left-[6%]
              sm:top-[8%]
              lg:left-[3%]
              lg:top-[12%]
            "
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="
                  flex
                  h-[26px]
                  w-[26px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E9F0F5]
                  text-[#113858]
                  min-[380px]:h-[30px]
                  min-[380px]:w-[30px]
                "
              >
                <Palette size={14} strokeWidth={2} />
              </span>

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-[#607487]
                  "
                >
                  Garment colour
                </p>

                <p
                  className="
                    mt-[2px]
                    truncate
                    text-[11px]
                    font-semibold
                    text-[#113858]
                  "
                >
                  {selected.name}
                </p>
              </div>
            </div>

            <div className="mt-3.5 flex items-center justify-between gap-1.5 sm:gap-2">
              {PRESETS.map((p) => {
                const isSelected = selected.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => selectPreset(p)}
                    title={p.name}
                    aria-label={p.name}
                    className={cn(
                      "relative size-[24px] sm:size-[26px] shrink-0 rounded-full transition-all duration-200 outline-none flex items-center justify-center cursor-pointer",
                      isSelected
                        ? "ring-2 ring-[#113858] ring-offset-2 scale-110 shadow-sm"
                        : "hover:scale-105 opacity-90 hover:opacity-100 shadow-[0_0_0_1px_rgba(17,56,88,0.15)]"
                    )}
                    style={{ backgroundColor: p.hex }}
                  >
                    {isSelected && (
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          p.id === "white" ? "bg-[#113858]" : "bg-white"
                        )}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FLOATING BRANDING & LOGO PLACEMENT CARD */}
          <div
            className="
              absolute
              bottom-[4%]
              right-[3%]
              z-20
              w-[200px]
              rounded-[18px]
              border
              border-white/60
              bg-white/90
              p-3
              shadow-[0_15px_45px_rgba(17,56,88,0.12)]
              backdrop-blur-xl
              min-[380px]:bottom-[5%]
              min-[380px]:right-[4%]
              min-[380px]:w-[225px]
              min-[380px]:p-3.5
              sm:bottom-[7%]
              sm:right-[6%]
              lg:bottom-[10%]
              lg:right-[4%]
            "
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="
                  flex
                  h-[28px]
                  w-[28px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#113858]
                  text-white
                  min-[380px]:h-[30px]
                  min-[380px]:w-[30px]
                "
              >
                <Shirt size={14} strokeWidth={2} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-[#607487]">
                  Branding
                </p>
                <p className="mt-[1px] truncate text-[11px] font-semibold text-[#113858]">
                  Logo placement: <span className="font-normal text-[#607487]">{currentPlacement.shortLabel}</span>
                </p>
              </div>
            </div>

            {/* Placement Switcher Buttons */}
            <div className="mt-3 grid grid-cols-3 gap-1">
              {PLACEMENTS.map((item) => {
                const active = placement === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPlacement(item.id)}
                    className={cn(
                      "rounded-lg py-1 px-1 text-[10px] font-semibold transition-all duration-200 text-center truncate cursor-pointer",
                      active
                        ? "bg-[#113858] text-white shadow-xs"
                        : "bg-[#E9F0F5]/80 text-[#113858] hover:bg-[#E9F0F5]"
                    )}
                  >
                    {item.shortLabel}
                  </button>
                );
              })}
            </div>

            {/* Custom Logo Upload Action */}
            <div className="mt-2.5 flex items-center justify-between border-t border-[#113858]/8 pt-2">
              {customLogo ? (
                <>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <img src={customLogo} alt="" className="size-3.5 rounded object-contain shrink-0" />
                    <span className="truncate text-[9.5px] font-medium text-[#113858] max-w-[90px]">
                      {customLogoName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetLogo}
                    className="flex items-center gap-0.5 text-[9.5px] font-medium text-[#c8102e] hover:underline cursor-pointer"
                    title="Reset to Cottson logo"
                  >
                    <RotateCcw size={9} /> Reset
                  </button>
                </>
              ) : (
                <>
                  <span className="text-[9.5px] text-[#607487]">Embroidered crest</span>
                  <label className="inline-flex cursor-pointer items-center gap-1 text-[10px] font-semibold text-[#113858] hover:underline">
                    <Upload size={10} strokeWidth={2.2} />
                    <span>Upload Logo</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesignStudioSection;
