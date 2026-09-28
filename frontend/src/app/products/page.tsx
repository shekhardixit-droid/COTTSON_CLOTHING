import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/catalog";
import { CategoryFilter } from "@/components/category-filter";

export const metadata: Metadata = { title: "Shop" };

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Shop</h1>
      <div className="mt-10">
        <CategoryFilter products={PRODUCTS} />
      </div>
    </div>
  );
}
