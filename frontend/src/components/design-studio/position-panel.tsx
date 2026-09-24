"use client";

import { useState } from "react";
import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Minus,
  Plus,
  RotateCw,
} from "lucide-react";
import { IMAGE_HEIGHT_CM, IMAGE_WIDTH_CM, round1, type Placement } from "./placement";

const STEP_CM = 0.5;

/** Number field in cm that commits on blur / Enter, with −/+ steppers */
function CmField({ label, value, onCommit }: { label: string; value: number; onCommit: (cm: number) => void }) {
  // Text being typed; null when not editing, so the field always shows the live value
  const [draft, setDraft] = useState<string | null>(null);
  const text = draft ?? value.toFixed(2);
  const commit = () => {
    const n = parseFloat(text);
    if (Number.isFinite(n)) onCommit(n);
    setDraft(null);
  };
  return (
    <div>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center gap-1">
        <label className="flex h-9 min-w-0 flex-1 items-center rounded-md bg-muted px-2 text-sm focus-within:ring-2 focus-within:ring-brand/40">
          <input
            inputMode="decimal"
            value={text}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => e.key === "Enter" && commit()}
            className="w-full min-w-0 bg-transparent outline-none"
          />
          <span className="ml-1 text-xs text-muted-foreground">cm</span>
        </label>
        <button type="button" onClick={() => onCommit(value - STEP_CM)} aria-label={`Decrease ${label}`} className="grid size-9 shrink-0 place-items-center rounded-md border bg-white hover:bg-muted">
          <Minus className="size-3.5" />
        </button>
        <button type="button" onClick={() => onCommit(value + STEP_CM)} aria-label={`Increase ${label}`} className="grid size-9 shrink-0 place-items-center rounded-md border bg-white hover:bg-muted">
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

const IconBtn = ({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) => (
  <button type="button" onClick={onClick} aria-label={label} title={label} className="grid size-9 place-items-center rounded-md border bg-white hover:bg-muted">
    {children}
  </button>
);

/** Precise positioning: size, centering, nudging, rotation and distances from the top/left edge */
export function PositionPanel({
  placement,
  aspect,
  maxWidth,
  onChange,
  onApply,
}: {
  placement: Placement;
  aspect: number;
  maxWidth: number;
  onChange: (p: Placement) => void;
  onApply?: () => void;
}) {
  const { x, y, w } = placement;
  const h = w / aspect;
  const set = (p: Partial<Placement>) => {
    const next = { ...placement, ...p };
    next.w = Math.min(maxWidth, Math.max(1.5, next.w));
    const nh = next.w / aspect;
    next.x = Math.min(IMAGE_WIDTH_CM - next.w, Math.max(0, next.x));
    next.y = Math.min(IMAGE_HEIGHT_CM - nh, Math.max(0, next.y));
    onChange(next);
  };
  // Resizing keeps the logo's centre where it is
  const resize = (nw: number) => {
    const cw = Math.min(maxWidth, Math.max(1.5, nw));
    set({ w: cw, x: x + (w - cw) / 2, y: y + (h - cw / aspect) / 2 });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <CmField label="Height" value={round1(h)} onCommit={(cm) => resize(cm * aspect)} />
        <CmField label="Width" value={round1(w)} onCommit={resize} />
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-3">
        <div>
          <div className="text-xs font-medium text-muted-foreground">Centering</div>
          <div className="mt-1 flex gap-1">
            <IconBtn label="Center horizontally" onClick={() => set({ x: IMAGE_WIDTH_CM / 2 - w / 2 })}>
              <AlignCenterVertical className="size-4" />
            </IconBtn>
            <IconBtn label="Center vertically" onClick={() => set({ y: IMAGE_HEIGHT_CM / 2 - h / 2 })}>
              <AlignCenterHorizontal className="size-4" />
            </IconBtn>
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-muted-foreground">Moving</div>
          <div className="mt-1 flex gap-1">
            <IconBtn label="Move left" onClick={() => set({ x: x - STEP_CM })}>
              <ChevronLeft className="size-4" />
            </IconBtn>
            <IconBtn label="Move right" onClick={() => set({ x: x + STEP_CM })}>
              <ChevronRight className="size-4" />
            </IconBtn>
            <IconBtn label="Move up" onClick={() => set({ y: y - STEP_CM })}>
              <ChevronUp className="size-4" />
            </IconBtn>
            <IconBtn label="Move down" onClick={() => set({ y: y + STEP_CM })}>
              <ChevronDown className="size-4" />
            </IconBtn>
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-muted-foreground">Rotate</div>
          <div className="mt-1">
            <IconBtn label="Rotate 15°" onClick={() => set({ rotation: (placement.rotation + 15) % 360 })}>
              <RotateCw className="size-4" />
            </IconBtn>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <CmField label="Top distance" value={round1(y)} onCommit={(cm) => set({ y: cm })} />
        <CmField label="Left distance" value={round1(x)} onCommit={(cm) => set({ x: cm })} />
      </div>
      {onApply && (
        <button type="button" onClick={onApply} className="h-10 w-full rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand/90">
          Apply
        </button>
      )}
    </div>
  );
}
