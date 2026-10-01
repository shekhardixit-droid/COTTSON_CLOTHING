"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { type Product, variantUrl, formatPrice } from "@/lib/catalog";
import { ColorSwatches } from "@/components/color-swatches";

/** Listing card: swaps between pre-rendered color images from the CDN (no live rendering here) */
export function ProductCard({ product }: { product: Product }) {
  const [color, setColor] = useState(product.originalColor);
  const href = `/products/${product.slug}?color=${color}`;
  return (
    <div className="group w-full overflow-hidden rounded-lg bg-[#f1f2fb]">
      <div className="relative overflow-hidden">
        <Link href={href} className="block">
          <Image
            src={variantUrl(product, color)}
            alt={`${product.title} in ${color}`}
            width={1080}
            height={1440}
            sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-2 text-sm font-semibold">
          <span className="rounded-md bg-white px-2.5 py-1.5 shadow-sm">{product.productionDays ?? 28} days</span>
          <span className="rounded-md bg-white px-2.5 py-1.5 shadow-sm">Min. {product.minBulk} Units</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-black/20 to-transparent px-3 pb-3 pt-8">
          <ColorSwatches colorIds={product.colors} value={color} onChange={setColor} size="sm" />
        </div>
      </div>
      <div className="px-5 pb-5 pt-4">
        <Link href={href} className="text-lg font-bold text-brand hover:underline">
          {product.title}
        </Link>
        <div className="text-muted-foreground">starting from {formatPrice(product.price, product.currency)}</div>
      </div>
    </div>
  );
}
