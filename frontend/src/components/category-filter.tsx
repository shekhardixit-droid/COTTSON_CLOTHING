"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Clock, ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { type Product } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

// Every category we sell in, even ones with no live product yet — so the sidebar reads as a
// real catalog nav rather than growing/shrinking with whatever happens to be in stock.
const CATEGORIES = ["Shirts", "T-Shirts", "Jacket", "Hoodies", "Sweatshirt", "Towels", "Cap", "Trousers"];

const PRODUCTION = [
  { label: "7 days or less", value: 7 },
  { label: "14 days or less", value: 14 },
  { label: "21 days or less", value: 21 },
  { label: "30 days or less", value: 30 },
];
const MIN_QTY = [
  { label: "1 or less", value: 1, exact: false },
  { label: "Min. 25", value: 25, exact: true },
  { label: "50 or less", value: 50, exact: false },
  { label: "100 or less", value: 100, exact: false },
  { label: "250 or less", value: 250, exact: false },
];
const TOGGLES = [
  { key: "customColor", title: "Custom color items only", desc: "Items with no restriction on the base color, we can colour the product to match your exact brand color." },
  { key: "printOnDemand", title: "Print on Demand items only", desc: "Items are made only when ordered—zero upfront investment or stock holding." },
  { key: "livePreview", title: "Live preview items only", desc: "You can explore and design your unique pieces and see the final result instantly." },
  { key: "express", title: "Express items only", desc: "Items finished and ready to ship in days." },
  { key: "promo", title: "Promo items only", desc: "Budget-friendly promotional items." },
] as const;
type ToggleKey = (typeof TOGGLES)[number]["key"];

const CHECK_ICON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2.5'%3E%3Cpath d='M3 8.5l3 3 7-7'/%3E%3C/svg%3E\")";

function CheckList({
  items,
  selected,
  onToggle,
}: {
  items: { label: string; value: number }[];
  selected: number[];
  onToggle: (v: number) => void;
}) {
  return (
    <ul className="space-y-3">
      {items.map((o) => {
        const on = selected.includes(o.value);
        return (
          <li key={o.value}>
            <label className="flex cursor-pointer items-center gap-4">
              <input
                type="checkbox"
                checked={on}
                onChange={() => onToggle(o.value)}
                className={cn("size-6 shrink-0 cursor-pointer appearance-none rounded-md bg-[#f1f2fb]", on && "bg-brand")}
                style={on ? { backgroundImage: CHECK_ICON, backgroundSize: "80%", backgroundPosition: "center", backgroundRepeat: "no-repeat" } : undefined}
              />
              <span>{o.label}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function Switch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn("relative h-8 w-14 shrink-0 rounded-full transition-colors", checked ? "bg-brand" : "bg-gray-300")}
    >
      <span className={cn("absolute top-1 size-6 rounded-full bg-white shadow transition-all", checked ? "left-7" : "left-1")} />
    </button>
  );
}

function PillDropdown({
  icon,
  label,
  count,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-12 items-center gap-2 whitespace-nowrap rounded-lg bg-background px-4 text-sm font-semibold text-brand shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)]",
          count > 0 && "ring-2 ring-brand"
        )}
      >
        {icon}
        {label}
        {count > 0 && <span className="rounded-full bg-brand px-1.5 text-xs text-white">{count}</span>}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 min-w-64 rounded-xl bg-background p-5 shadow-xl ring-1 ring-black/5">
          {children}
        </div>
      )}
    </div>
  );
}

function toggleIn<T>(set: React.Dispatch<React.SetStateAction<T[]>>, v: T) {
  set((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));
}

export function CategoryFilter({ products }: { products: Product[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [days, setDays] = useState<number[]>([]);
  const [qty, setQty] = useState<number[]>([]);
  const [flags, setFlags] = useState<ToggleKey[]>([]);
  const [drawer, setDrawer] = useState(false);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of products) m.set(p.category, (m.get(p.category) ?? 0) + 1);
    return m;
  }, [products]);

  const visible = products
    .filter((p) => (active ? p.category === active : true))
    .filter((p) => p.title.toLowerCase().includes(query.trim().toLowerCase()))
    .filter((p) => days.length === 0 || (p.productionDays ?? 28) <= Math.max(...days))
    .filter(
      (p) =>
        qty.length === 0 ||
        MIN_QTY.some((o) => qty.includes(o.value) && (o.exact ? p.minBulk === o.value : p.minBulk <= o.value))
    )
    .filter((p) => flags.every((f) => p[f] === true));

  return (
    <div>
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-brand">{active ?? "All Products"}</h1>
        <p className="mt-1 text-muted-foreground">
          {active ? `Our ${active.toLowerCase()} range.` : "Browse through all our corporate clothing."}
        </p>
      </header>

      {drawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={() => setDrawer(false)}>
          <aside className="h-full w-full max-w-md overflow-y-auto bg-[#fafafa] p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <h2 className="text-3xl font-bold text-brand">Filters</h2>
              <button type="button" aria-label="Close" onClick={() => setDrawer(false)} className="rounded-lg bg-[#f1f2fb] p-3 shadow">
                <X className="size-5" />
              </button>
            </div>
            <h3 className="mt-8 font-bold">Production time</h3>
            <div className="mt-3">
              <CheckList items={PRODUCTION} selected={days} onToggle={(v) => toggleIn(setDays, v)} />
            </div>
            <h3 className="mt-8 font-bold">Min. quantity</h3>
            <div className="mt-3">
              <CheckList items={MIN_QTY} selected={qty} onToggle={(v) => toggleIn(setQty, v)} />
            </div>
            <div className="mt-8 space-y-6">
              {TOGGLES.map((t) => (
                <div key={t.key} className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold">{t.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                  </div>
                  <Switch checked={flags.includes(t.key)} onChange={() => toggleIn(setFlags, t.key)} />
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      <div className="mt-6 grid gap-10 lg:grid-cols-[300px_1fr]">
        <aside className="h-fit self-start lg:sticky lg:top-24">
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="h-12 w-full rounded-lg bg-muted/50 pl-11 pr-4 text-sm outline-none ring-1 ring-black/5 focus:bg-background focus:ring-brand"
      />
    </div>
          <ul className="mt-6 space-y-4 text-lg">
            <li>
              <button
                type="button"
                onClick={() => setActive(null)}
                className={cn("font-bold hover:text-brand", active === null ? "text-brand" : "text-foreground")}
              >
                Show All ({products.length})
              </button>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => setActive(c)}
                  className={cn("font-bold hover:text-brand", active === c ? "text-brand" : "text-foreground")}
                >
                  {c} ({counts.get(c) ?? 0})
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-end gap-4">
            <div className="flex flex-wrap gap-3 lg:shrink-0 lg:flex-nowrap">
              <PillDropdown icon={<Clock className="size-5" />} label="Production time" count={days.length}>
                <CheckList items={PRODUCTION} selected={days} onToggle={(v) => toggleIn(setDays, v)} />
              </PillDropdown>
              <PillDropdown icon={<ShoppingCart className="size-5" />} label="Min. quantity" count={qty.length}>
                <CheckList items={MIN_QTY} selected={qty} onToggle={(v) => toggleIn(setQty, v)} />
              </PillDropdown>
              <button
                type="button"
                onClick={() => setDrawer(true)}
                className="flex h-12 items-center gap-2 whitespace-nowrap rounded-lg bg-background px-4 text-sm font-semibold text-brand shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
              >
                <SlidersHorizontal className="size-5" />
                More Filters
              </button>
            </div>
          </div>
          <p className="mt-6 text-lg font-bold">{visible.length} results</p>
          {visible.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-sm text-muted-foreground">No products match yet — check back soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}
