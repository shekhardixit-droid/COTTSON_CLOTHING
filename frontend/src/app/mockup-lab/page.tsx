import type { Metadata } from "next";
import { getProduct } from "@/lib/catalog";
import { MockupLab } from "./mockup-lab";

// Mockup page (linked as "Mockup" in the navbar): pick a product, recolour each part of the
// garment and preview a logo on the ghost-mannequin template.
export const metadata: Metadata = { title: "Mockup", robots: { index: false } };

// ?product=<slug> opens on that product (e.g. from a product page's "Customize" button)
export default async function MockupLabPage({ searchParams }: PageProps<"/mockup-lab">) {
  const { product } = await searchParams;
  const slug = typeof product === "string" && getProduct(product) ? product : undefined;
  return <MockupLab key={slug} initialSlug={slug} />;
}
