"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { type Product } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

// Every category we sell in, even ones with no live product yet — so the sidebar reads as a
// real catalog nav rather than growing/shrinking with whatever happens to be in stock.
const CATEGORIES = ["Shirts", "T-Shirts", "Jacket", "Hoodies", "Sweatshirt", "Towels", "Cap", "Trousers"];

export function CategoryFilter({ products }: { products: Product[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of products) m.set(p.category, (m.get(p.category) ?? 0) + 1);
    return m;
  }, [products]);

  const visible = products
    .filter((p) => (active ? p.category === active : true))
    .filter((p) => p.title.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit self-start lg:sticky lg:top-1/2 lg:-translate-y-1/2">
        <h1 className="text-2xl font-bold tracking-tight text-brand">All Products</h1>
        <p className="mt-1 text-sm text-muted-foreground">Browse through all our corporate clothing.</p>

        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="h-11 w-full rounded-[25px] border bg-muted/30 pl-9 pr-3 text-sm outline-none focus:border-brand focus:bg-background"
          />
        </div>

        <ul className="mt-6 space-y-3 text-sm">
          <li>
            <button
              type="button"
              onClick={() => setActive(null)}
              className={cn("font-semibold hover:text-brand", active === null ? "text-brand" : "text-foreground")}
            >
              Show All ({products.length})
            </button>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => setActive(c)}
                className={cn("hover:text-brand", active === c ? "font-semibold text-brand" : "text-foreground")}
              >
                {c} ({counts.get(c) ?? 0})
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div>
        <p className="text-sm text-muted-foreground">{visible.length} results</p>
        {visible.length > 0 ? (
          <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-muted-foreground">No products match yet — check back soon.</p>
        )}
      </div>
    </div>
  );
}
