"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { IMAGE_HEIGHT_CM, IMAGE_WIDTH_CM, type Placement } from "./placement";

type Props = {
  /** What to draw: the flat logo (print) or the rendered stitch image (embroidery) */
  src: string;
  embroidered: boolean;
  placement: Placement;
  /** Logo width / height */
  aspect: number;
  maxWidth: number;
  onChange: (p: Placement) => void;
  /** Show the selection box + handles and accept drags */
  editable?: boolean;
  /** Reference element the percentages are measured against (the photo box) */
  frameRef: React.RefObject<HTMLDivElement | null>;
  /** Current photo zoom, so the selection box and handles stay the same size on screen */
  zoom?: number;
};

const MIN_WIDTH_CM = 1.5;

/** The logo as a selectable element on the garment photo: drag to move, corners to resize.
 * Positioned in cm (see placement.ts) so it lines up the same on every trim-color photo. */
export function LogoLayer({ src, embroidered, placement, aspect, maxWidth, onChange, editable = true, frameRef, zoom = 1 }: Props) {
  const { x, y, w, rotation } = placement;
  const h = w / aspect;

  // Pointer delta (px) → cm, measured on the frame's on-screen size (includes any zoom transform)
  const pxToCm = () => {
    const rect = frameRef.current?.getBoundingClientRect();
    return rect ? { x: IMAGE_WIDTH_CM / rect.width, y: IMAGE_HEIGHT_CM / rect.height } : { x: 0, y: 0 };
  };
  const clamp = (p: Placement) => {
    const ph = p.w / aspect;
    return {
      ...p,
      x: Math.min(IMAGE_WIDTH_CM - p.w, Math.max(0, p.x)),
      y: Math.min(IMAGE_HEIGHT_CM - ph, Math.max(0, p.y)),
    };
  };

  const drag = useRef<{ sx: number; sy: number; start: Placement; corner?: string } | null>(null);
  const begin = (corner?: string) => (e: React.PointerEvent) => {
    if (!editable) return;
    e.preventDefault();
    e.stopPropagation();
    drag.current = { sx: e.clientX, sy: e.clientY, start: placement, corner };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const k = pxToCm();
    const dx = (e.clientX - d.sx) * k.x;
    const dy = (e.clientY - d.sy) * k.y;
    const s = d.start;
    if (!d.corner) return onChange(clamp({ ...s, x: s.x + dx, y: s.y + dy }));
    // Corner resize keeps the aspect ratio and anchors the opposite corner
    const grow = d.corner.includes("right") ? dx : -dx;
    const nw = Math.min(maxWidth, Math.max(MIN_WIDTH_CM, s.w + grow));
    const nh = nw / aspect;
    const sh = s.w / aspect;
    onChange(
      clamp({
        ...s,
        w: nw,
        x: d.corner.includes("left") ? s.x + (s.w - nw) : s.x,
        y: d.corner.includes("top") ? s.y + (sh - nh) : s.y,
      })
    );
  };
  const end = () => {
    drag.current = null;
  };

  return (
    <div
      className="absolute touch-none"
      style={{
        left: `${(x / IMAGE_WIDTH_CM) * 100}%`,
        top: `${(y / IMAGE_HEIGHT_CM) * 100}%`,
        width: `${(w / IMAGE_WIDTH_CM) * 100}%`,
        height: `${(h / IMAGE_HEIGHT_CM) * 100}%`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div
        onPointerDown={begin()}
        onPointerMove={move}
        onPointerUp={end}
        className={cn(
          "relative size-full",
          editable && "cursor-grab rounded-[2px] outline-dashed outline-brand/80 active:cursor-grabbing"
        )}
        style={editable ? { outlineWidth: 1 / zoom, outlineOffset: 2 / zoom } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- local data URL */}
        <img
          src={src}
          alt="Your logo"
          draggable={false}
          className="pointer-events-none block size-full select-none"
          // Printed ink sits slightly into the knit, so it's a touch less crisp than thread
          style={embroidered ? undefined : { filter: "saturate(0.95) contrast(0.97)", opacity: 0.94 }}
        />
        {editable &&
          (
            [
              ["top-left", "-top-2.5 -left-2.5", "nwse-resize"],
              ["top-right", "-top-2.5 -right-2.5", "nesw-resize"],
              ["bottom-left", "-bottom-2.5 -left-2.5", "nesw-resize"],
              ["bottom-right", "-bottom-2.5 -right-2.5", "nwse-resize"],
            ] as const
          ).map(([corner, pos, cursor]) => (
            // Invisible 20px grab area around a small visible dot
            <div
              key={corner}
              onPointerDown={begin(corner)}
              onPointerMove={move}
              onPointerUp={end}
              className={cn("absolute grid size-5 place-items-center", pos)}
              style={{ cursor, transform: `scale(${1 / zoom})` }}
            >
              <span className="pointer-events-none size-2 rounded-full border border-brand bg-white shadow" />
            </div>
          ))}
      </div>
    </div>
  );
}
