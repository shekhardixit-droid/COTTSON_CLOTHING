import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/catalog";
import { CategoryFilter } from "@/components/category-filter";

export const metadata: Metadata = {
  title: "All Products · Premium Corporate Apparel & Uniforms | Cottson Clothing",
  description:
    "Explore our full corporate clothing catalogue. Premium polo shirts, executive shirts, tees, jackets, and hoodies customized with your company branding.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F5]">
      <CategoryFilter products={PRODUCTS} />
    </div>
  );
}
