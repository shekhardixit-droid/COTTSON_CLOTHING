import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/catalog";
import { EssentialPoloDetail } from "@/components/essential-polo-detail";
import { FabricFeatures } from "@/components/fabric-features";
import { TeamShowcase } from "@/components/team-showcase";
import { SimilarProductsCarousel } from "@/components/similar-products-carousel";

export const revalidate = 3600;
export const generateStaticParams = () => PRODUCTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: p.title, description: p.description } : {};
}

export default async function ProductPage({ params, searchParams }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const { color } = await searchParams;
  const initialColor = typeof color === "string" && product.colors.includes(color) ? color : product.originalColor;
  
  const similarProducts = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  
  return (
    <>
      <EssentialPoloDetail product={product} initialColor={initialColor} />

      <FabricFeatures />

      <TeamShowcase />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#00A859]/10 px-6 py-8 sm:flex-row sm:px-10">
          <div>
            <h2 className="text-xl font-bold text-[#00A859] sm:text-2xl">Got a Question?</h2>
            <p className="mt-2 text-sm text-[#00A859]/80 sm:text-base">We're here to help you with sizes, customization, and bulk orders.</p>
          </div>
          <a
            href="https://wa.me/919892297764?text=Hi%2C%20I%20have%20a%20requirement"
            target="_blank"
            rel="noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-full bg-[#00A859] px-6 py-3 font-semibold text-white shadow-sm hover:bg-[#008f4c]"
          >
            <img src="/whatsapp.png" alt="WhatsApp" className="size-6" />
            WhatsApp Us
          </a>
        </div>
      </div>
      <SimilarProductsCarousel products={similarProducts} />
    </>
  );
}
