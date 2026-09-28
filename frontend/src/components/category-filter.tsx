"use client";

import { useState } from "react";
import { Shirt } from "lucide-react";
import { type Product } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

// Every category we sell in, even ones with no live product yet — so the row reads as a
// real catalog nav rather than growing/shrinking with whatever happens to be in stock.
const CATEGORIES = ["Polos", "Shirts", "T-Shirts", "Hoodies", "Sweatshirts", "Jackets"];

export function CategoryFilter({ products }: { products: Product[] }) {
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? products.filter((p) => p.category === active) : products;

  return (
    <div>
      <h2 className="text-sm font-semibold text-brand">Narrow your search</h2>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
        <button
          type="button"
          onClick={() => setActive(null)}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            active === null ? "border-brand bg-brand text-white" : "hover:border-brand"
          )}
        >
          <span className="grid size-7 place-items-center rounded-full bg-muted text-current">
            <Shirt className="size-4" strokeWidth={1.6} />
          </span>
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === c ? "border-brand bg-brand text-white" : "hover:border-brand"
            )}
          >
            <span className={cn("grid size-7 place-items-center rounded-full", active === c ? "bg-white/20" : "bg-muted")}>
              <Shirt className="size-4" strokeWidth={1.6} />
            </span>
            {c}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-muted-foreground">No products in this category yet — check back soon.</p>
      )}
    </div>
  );
}
