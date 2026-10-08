"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, PenTool, ArrowRight } from "lucide-react";
import { type Product, variantUrl, formatPrice, colorById } from "@/lib/catalog";
import { cn } from "@/lib/utils";

function getProductBadge(product: Product, index?: number): { text: string; className: string } | null {
  const slug = product.slug.toLowerCase();
  // Only keep "Best Seller" on selected top products
  if (slug === "polo-black" || slug === "classic-polo-black" || slug === "crew-tee-black") {
    return { text: "Best Seller", className: "bg-[#113858] text-white font-semibold" };
  }
  return null;
}

export function ProductCard({ product, index }: { product: Product; index?: number }) {
  const [color, setColor] = useState(product.originalColor);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const href = `/products/${product.slug}?color=${color}`;
  const badge = getProductBadge(product, index);

  return (
    <div
      className="
        group relative flex flex-col justify-between
        overflow-hidden rounded-2xl
        border border-slate-200/90 bg-white
        p-2.5 sm:p-3
        transition-all duration-300
        hover:-translate-y-1 hover:border-[#113858]/30
        hover:shadow-xl hover:shadow-[#113858]/8
      "
    >
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#F5F8FA]">
        <Link href={href} className="block h-full w-full" aria-label={product.title}>
          <Image
            src={variantUrl(product, color)}
            alt={`${product.title} in ${color}`}
            width={720}
            height={960}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Top Badges - Only shown for Best Seller */}
        {badge && (
          <div className="pointer-events-none absolute left-2.5 top-2.5 z-10">
            <span
              className={cn(
                "inline-block rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] shadow-xs",
                badge.className
              )}
            >
              {badge.text}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="
            absolute right-2.5 top-2.5 z-10
            flex h-7 w-7 items-center justify-center
            rounded-full bg-white/90 text-[#113858] shadow-xs
            transition-all duration-200
            hover:bg-white hover:scale-110
          "
        >
          <Heart
            className={cn(
              "h-3.5 w-3.5 transition-colors",
              isWishlisted ? "fill-red-500 text-red-500" : "text-[#113858]/70"
            )}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between pt-2.5 pb-0.5 px-0.5 sm:px-1">
        <div>
          {/* Colour Swatches (NOT filters - selectable per product) */}
          <div className="flex items-center gap-1.5 py-1">
            {product.colors.slice(0, 6).map((cId) => {
              const c = colorById(cId);
              const isSelected = cId === color;
              return (
                <button
                  key={cId}
                  type="button"
                  onClick={() => setColor(cId)}
                  title={c?.name || cId}
                  aria-label={c?.name || cId}
                  className={cn(
                    "size-3 sm:size-3.5 rounded-full transition-all hover:scale-125 ring-1 ring-inset ring-black/15",
                    isSelected ? "ring-2 ring-offset-1 ring-[#113858] ring-offset-white" : ""
                  )}
                  style={{ backgroundColor: c?.hex || "#113858" }}
                />
              );
            })}
            {product.colors.length > 6 && (
              <span className="text-[10px] font-medium text-[#607487] ml-0.5">
                +{product.colors.length - 6}
              </span>
            )}
          </div>

          {/* Category */}
          <p className="mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#607487]">
            {product.category}
          </p>

          {/* Title */}
          <Link href={href} className="block mt-0.5 group-hover:text-[#1d5b8c] transition-colors">
            <h3 className="text-[13.5px] sm:text-[15px] font-bold leading-snug tracking-tight text-[#113858] line-clamp-1">
              {product.title}
            </h3>
          </Link>

          {/* Price */}
          <p className="mt-1 text-[12px] sm:text-[13px] text-[#607487]">
            Starting from{" "}
            <span className="font-bold text-[#113858]">
              {formatPrice(product.price, product.currency)}
            </span>
          </p>
        </div>

        {/* Dual Actions: Customize & View Details */}
        <div className="mt-3 grid grid-cols-2 gap-1.5 border-t border-slate-100 pt-2.5">
          <Link
            href={`/studio?product=${product.slug}&color=${color}`}
            className="
              inline-flex h-[34px] sm:h-9 items-center justify-center gap-1.5
              rounded-xl border border-slate-200/90 bg-white px-2
              text-[11px] sm:text-[12px] font-semibold text-[#113858]
              transition-all duration-200
              hover:bg-slate-50 hover:border-[#113858]/30
            "
          >
            <PenTool className="size-3 text-[#113858]" />
            <span>Customize</span>
          </Link>

          <Link
            href={href}
            className="
              inline-flex h-[34px] sm:h-9 items-center justify-center gap-1
              rounded-xl bg-[#113858] px-2
              text-[11px] sm:text-[12px] font-semibold text-white
              transition-all duration-200
              hover:bg-[#0b243a]
            "
          >
            <span>View Details</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
