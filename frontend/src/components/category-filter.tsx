"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  X,
  LayoutGrid,
  List,
  RotateCcw,
  Shield,
  Sparkles,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { type Product } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

// Category definitions with custom line icons
const NAV_CATEGORIES = [
  { id: "ALL", label: "All Products" },
  { id: "Polos", label: "Polos", icon: PoloIcon },
  { id: "T-Shirts", label: "T-Shirts", icon: TShirtIcon },
  { id: "Shirts", label: "Shirts", icon: ShirtIcon },
  { id: "Jackets", label: "Jackets", icon: JacketIcon },
  { id: "Hoodies", label: "Hoodies", icon: HoodieIcon },
  { id: "Sweatshirts", label: "Sweatshirts", icon: SweatshirtIcon },
  { id: "Trousers", label: "Trousers", icon: TrousersIcon },
  { id: "Caps", label: "Caps", icon: CapIcon },
  { id: "Towels", label: "Towels", icon: TowelIcon },
] as const;

// Micro line icons for category pills
function PoloIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M8 3l4 2 4-2 3 5-3 2v11H8V10L5 8l3-5z" />
      <path d="M12 5v5" />
      <path d="M10 7h4" />
    </svg>
  );
}

function TShirtIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M7 4a5 5 0 0 0 10 0l4 4-2.5 3L16 9.5V20H8V9.5L5.5 11 3 8l4-4z" />
    </svg>
  );
}

function ShirtIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M8 3h8l4 5-3 2v11H7V10L4 8l4-5z" />
      <path d="M12 3v18" />
      <circle cx="12" cy="7" r="0.8" fill="currentColor" />
      <circle cx="12" cy="11" r="0.8" fill="currentColor" />
      <circle cx="12" cy="15" r="0.8" fill="currentColor" />
    </svg>
  );
}

function JacketIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M6 4h12l3 5-3 2v10H6V11L3 9l3-5z" />
      <path d="M12 4v17" />
      <path d="M9 7l3 3 3-3" />
    </svg>
  );
}

function HoodieIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M7 6a5 5 0 0 1 10 0l4 4-3 2v9H6v-9L3 10l4-4z" />
      <path d="M9 16h6v4H9z" />
    </svg>
  );
}

function SweatshirtIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M8 4a4 4 0 0 0 8 0l4 4-2.5 3L16 9.5V20H8V9.5L5.5 11 3 8l5-4z" />
      <path d="M8 19h8" />
    </svg>
  );
}

function TrousersIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M7 3h10l2 18h-4.5L12 11l-2.5 10H5L7 3z" />
    </svg>
  );
}

function CapIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M6 14a6 6 0 0 1 12 0H6z" />
      <path d="M16 14c2.5 0 5 1 5 3H3c0-2 2.5-3 5-3" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function TowelIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="5" y="4" width="14" height="5" rx="1.5" />
      <rect x="4" y="9" width="16" height="5" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
    </svg>
  );
}

const PRODUCTION_OPTIONS = [
  { id: "14", label: "Upto 14 days", max: 14 },
  { id: "28", label: "15–28 days", min: 15, max: 28 },
  { id: "more", label: "More than 28 days", min: 29 },
];

const QTY_OPTIONS = [
  { id: "25", label: "Upto 25 units", max: 25 },
  { id: "50", label: "26–50 units", min: 26, max: 50 },
  { id: "100", label: "51–100 units", min: 51, max: 100 },
  { id: "more", label: "100+ units", min: 101 },
];

export function CategoryFilter({ products }: { products: Product[] }) {
  // Search & Category state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sidebarCategories, setSidebarCategories] = useState<string[]>([]);

  // Filter criteria
  const [priceMin, setPriceMin] = useState(500);
  const [priceMax, setPriceMax] = useState(2000);
  const [selectedProduction, setSelectedProduction] = useState<string[]>([]);
  const [selectedQty, setSelectedQty] = useState<string[]>([]);

  // Sorting & View mode
  const [sortBy, setSortBy] = useState<"featured" | "low" | "high" | "newest">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Accordion collapsed states
  const [openSections, setOpenSections] = useState({
    price: true,
    category: true,
    production: true,
    qty: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryPillClick = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === "ALL") {
      setSidebarCategories([]);
    } else {
      setSidebarCategories([catId]);
    }
  };

  const handleSidebarCategoryToggle = (catId: string) => {
    setSidebarCategories((prev) => {
      let next: string[];
      if (prev.includes(catId)) {
        next = prev.filter((c) => c !== catId);
      } else {
        next = [...prev, catId];
      }
      if (next.length === 1) {
        setSelectedCategory(next[0]);
      } else if (next.length === 0) {
        setSelectedCategory("ALL");
      } else {
        setSelectedCategory("ALL");
      }
      return next;
    });
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setSidebarCategories([]);
    setPriceMin(500);
    setPriceMax(2000);
    setSelectedProduction([]);
    setSelectedQty([]);
    setSortBy("featured");
  };

  // Category counts based on inventory
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of NAV_CATEGORIES) {
      if (cat.id === "ALL") {
        counts["ALL"] = products.length;
        continue;
      }
      counts[cat.id] = products.filter((p) => {
        const pCat = p.category.toLowerCase().replace(/s$/, "");
        const target = cat.id.toLowerCase().replace(/s$/, "");
        return pCat === target;
      }).length;
    }
    return counts;
  }, [products]);

  // Production counts
  const productionCounts = useMemo(() => {
    return {
      "14": products.filter((p) => (p.productionDays ?? 28) <= 14).length,
      "28": products.filter((p) => {
        const d = p.productionDays ?? 28;
        return d >= 15 && d <= 28;
      }).length,
      "more": products.filter((p) => (p.productionDays ?? 28) > 28).length,
    };
  }, [products]);

  // Qty counts
  const qtyCounts = useMemo(() => {
    return {
      "25": products.filter((p) => (p.minBulk ?? 25) <= 25).length,
      "50": products.filter((p) => {
        const q = p.minBulk ?? 25;
        return q >= 26 && q <= 50;
      }).length,
      "100": products.filter((p) => {
        const q = p.minBulk ?? 25;
        return q >= 51 && q <= 100;
      }).length,
      "more": products.filter((p) => (p.minBulk ?? 25) > 100).length,
    };
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // 1. Text Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesDesc = p.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCat && !matchesDesc) return false;
      }

      // 2. Category matching
      if (sidebarCategories.length > 0) {
        const pCat = p.category.toLowerCase().replace(/s$/, "");
        const matchesCategory = sidebarCategories.some(
          (c) => c.toLowerCase().replace(/s$/, "") === pCat
        );
        if (!matchesCategory) return false;
      } else if (selectedCategory !== "ALL") {
        const pCat = p.category.toLowerCase().replace(/s$/, "");
        const target = selectedCategory.toLowerCase().replace(/s$/, "");
        if (pCat !== target) return false;
      }

      // 3. Price Range
      if (p.price < priceMin || p.price > priceMax) return false;

      // 4. Production time
      if (selectedProduction.length > 0) {
        const days = p.productionDays ?? 28;
        const matchesProd = selectedProduction.some((opt) => {
          if (opt === "14") return days <= 14;
          if (opt === "28") return days >= 15 && days <= 28;
          if (opt === "more") return days > 28;
          return false;
        });
        if (!matchesProd) return false;
      }

      // 5. Min Bulk Qty
      if (selectedQty.length > 0) {
        const q = p.minBulk ?? 25;
        const matchesQ = selectedQty.some((opt) => {
          if (opt === "25") return q <= 25;
          if (opt === "50") return q >= 26 && q <= 50;
          if (opt === "100") return q >= 51 && q <= 100;
          if (opt === "more") return q > 100;
          return false;
        });
        if (!matchesQ) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result = [...result].reverse();
    }

    return result;
  }, [
    products,
    searchQuery,
    selectedCategory,
    sidebarCategories,
    priceMin,
    priceMax,
    selectedProduction,
    selectedQty,
    sortBy,
  ]);

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    sidebarCategories.length +
    (priceMin > 500 || priceMax < 2000 ? 1 : 0) +
    selectedProduction.length +
    selectedQty.length;

  return (
    <div className="w-full bg-[#FAF8F5]">
      {/* ========================================================= */}
      {/* 2. PANORAMIC HERO BANNER (NO CARD BORDER)                 */}
      {/* ========================================================= */}
      <section className="relative w-full bg-[#FAF8F5] pt-[74px] sm:pt-[82px]">
        {/* Full-width Panoramic Banner Image with seamless edge fade */}
        <div className="relative w-full overflow-hidden">
          <div className="relative mx-auto max-w-[1440px]">
            <img
              src="/hero/products_hero_banner.png"
              alt="Cottson Clothing - All Products"
              className="w-full h-auto block select-none"
              loading="eager"
            />

            {/* Left-Side Typography & Features (Written in Code) */}
            <div className="absolute inset-y-0 left-6 sm:left-10 md:left-14 lg:left-20 flex flex-col justify-center max-w-[50%] sm:max-w-[46%] md:max-w-[43%] lg:max-w-[41%] z-20 pointer-events-auto select-text">
              <span className="text-[9.5px] sm:text-[10.5px] md:text-xs font-bold uppercase tracking-widest text-[#607487]">
                Custom Corporate Clothing
              </span>
              <h2 className="mt-0.5 sm:mt-1 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[40px] font-extrabold tracking-tight text-[#113858] leading-[1.15]">
                Tailored For Your Brand
              </h2>
              <p className="mt-1 sm:mt-1.5 md:mt-2.5 text-[10.5px] sm:text-xs md:text-[13px] text-slate-600 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none max-w-sm">
                Premium fabrics, custom embroidery, and precision print finishes engineered for companies and corporate teams.
              </p>

              {/* 4 Feature Badges */}
              <div className="mt-2.5 sm:mt-3 md:mt-4 hidden min-[480px]:grid grid-cols-2 gap-x-2 md:gap-x-4 gap-y-1.5 md:gap-y-2 text-[9.5px] sm:text-[10.5px] md:text-[11.5px] font-semibold text-[#113858]">
                <div className="flex items-center gap-1.5">
                  <Shield className="size-3 md:size-3.5 text-[#113858] shrink-0" />
                  <span className="truncate">Premium Quality</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="size-3 md:size-3.5 text-[#113858] shrink-0" />
                  <span className="truncate">Custom Branding</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShoppingBag className="size-3 md:size-3.5 text-[#113858] shrink-0" />
                  <span className="truncate">Bulk Orders</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="size-3 md:size-3.5 text-[#113858] shrink-0" />
                  <span className="truncate">Pan India Delivery</span>
                </div>
              </div>
            </div>

            {/* Left edge soft fade */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 lg:w-32 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/60 to-transparent z-10"
            />

            {/* Right edge soft fade */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 lg:w-32 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/60 to-transparent z-10"
            />

            {/* Top edge soft fade */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-6 sm:h-10 bg-gradient-to-b from-[#FAF8F5] to-transparent z-10"
            />

            {/* Bottom edge soft fade */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-10 sm:h-16 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/70 to-transparent z-10"
            />
          </div>

          {/* Category Navigation Pills ALIGNED DIRECTLY OVER THE BOTTOM OF THE BANNER */}
          <div className="relative -mt-5 sm:-mt-7 md:-mt-9 lg:-mt-10 z-20 flex justify-start lg:justify-center overflow-x-auto px-4 pb-2 scrollbar-none">
            <div className="inline-flex items-center gap-1.5 sm:gap-2.5 px-0.5">
              {NAV_CATEGORIES.map((cat) => {
                const isActive =
                  selectedCategory === cat.id ||
                  (sidebarCategories.length === 1 && sidebarCategories[0] === cat.id);
                const IconComponent = "icon" in cat ? cat.icon : null;
                const count = categoryCounts[cat.id] ?? 0;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryPillClick(cat.id)}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2",
                      "text-[12px] sm:text-[12.5px] font-semibold tracking-wide transition-all duration-200 cursor-pointer",
                      isActive
                        ? "bg-[#0E2C48] text-white shadow-md shadow-[#0E2C48]/30 font-bold"
                        : "bg-white text-[#113858] hover:bg-slate-50 border border-slate-200/80 shadow-md shadow-black/5"
                    )}
                    style={isActive ? { color: "#ffffff" } : {}}
                  >
                    {IconComponent && (
                      <IconComponent
                        className={cn("h-3.5 w-3.5", isActive ? "text-white" : "text-[#113858]")}
                      />
                    )}
                    <span>{cat.label}</span>
                    {cat.id !== "ALL" && count > 0 && (
                      <span
                        className={cn(
                          "ml-0.5 text-[10.5px] font-normal",
                          isActive ? "text-white/80" : "text-[#607487]"
                        )}
                      >
                        ({count})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Container - Compact Spacing to reveal products in initial view */}
      <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8 pb-12 pt-2 sm:pt-3">
        {/* ========================================================= */}
        {/* 4. SLIM & COMPACT CUSTOMIZATION JOURNEY STRIP             */}
        {/* ========================================================= */}
        <section
          className="
            mb-3.5 sm:mb-4
            rounded-xl border border-[#113858]/10 bg-white/95 backdrop-blur-xs
            px-3 py-2 sm:px-4 sm:py-2.5 shadow-2xs
          "
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2.5 lg:gap-4">
            {/* Left compact heading */}
            <div className="flex items-center gap-2 shrink-0 w-full lg:w-auto">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#607487]">
                CUSTOMIZE
              </span>
              <span className="text-[13px] font-bold text-[#113858]">
                YOUR LOOK
              </span>
              <span className="hidden sm:inline text-[11px] text-[#607487] ml-1">
                — 4 simple steps to custom team uniforms
              </span>
            </div>

            {/* 4-step process in single slim horizontal line */}
            <div className="flex items-center justify-between gap-2 sm:gap-3.5 overflow-x-auto w-full lg:w-auto scrollbar-none">
              {/* Step 01 */}
              <div className="flex shrink-0 items-center gap-1.5">
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md bg-[#F8F9FA] p-0.5 border border-slate-100">
                  <Image src="/hero/step1_polo.png" alt="Choose Style" width={28} height={28} className="h-full w-full object-contain" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#113858] text-[8px] font-bold text-white">01</span>
                    <p className="text-[11px] font-bold text-[#113858] whitespace-nowrap">Choose Style</p>
                  </div>
                </div>
              </div>

              <svg className="w-4 h-2.5 text-[#113858]/35 shrink-0 hidden md:block" viewBox="0 0 20 10" fill="none">
                <path d="M1 5 Q 10 1, 18 5 M15 2 L18 5 L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Step 02 */}
              <div className="flex shrink-0 items-center gap-1.5">
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md bg-[#F8F9FA] p-0.5 border border-slate-100">
                  <Image src="/hero/step2_swatches.png" alt="Pick Colours" width={28} height={28} className="h-full w-full object-contain" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#113858] text-[8px] font-bold text-white">02</span>
                    <p className="text-[11px] font-bold text-[#113858] whitespace-nowrap">Pick Colours</p>
                  </div>
                </div>
              </div>

              <svg className="w-4 h-2.5 text-[#113858]/35 shrink-0 hidden md:block" viewBox="0 0 20 10" fill="none">
                <path d="M1 5 Q 10 1, 18 5 M15 2 L18 5 L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Step 03 */}
              <div className="flex shrink-0 items-center gap-1.5">
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md bg-[#F8F9FA] p-0.5 border border-slate-100">
                  <Image src="/hero/step3_logo.png" alt="Add Logo" width={28} height={28} className="h-full w-full object-contain" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#113858] text-[8px] font-bold text-white">03</span>
                    <p className="text-[11px] font-bold text-[#113858] whitespace-nowrap">Add Logo</p>
                  </div>
                </div>
              </div>

              <svg className="w-4 h-2.5 text-[#113858]/35 shrink-0 hidden md:block" viewBox="0 0 20 10" fill="none">
                <path d="M1 5 Q 10 1, 18 5 M15 2 L18 5 L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Step 04 */}
              <div className="flex shrink-0 items-center gap-1.5">
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md bg-[#F8F9FA] p-0.5 border border-slate-100">
                  <Image src="/hero/step4_clipboard.png" alt="Approve & Order" width={28} height={28} className="h-full w-full object-contain" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#113858] text-[8px] font-bold text-white">04</span>
                    <p className="text-[11px] font-bold text-[#113858] whitespace-nowrap">Approve & Order</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. PRODUCT CONTROLS BAR (Compact)                         */}
        {/* ========================================================= */}
        <div className="mb-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Left: Search input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#607487]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, styles, or keywords..."
              className="
                w-full rounded-xl border border-slate-200/90 bg-white
                py-1.5 pl-9 pr-8 text-[12.5px] text-[#113858] placeholder-[#607487]/70
                shadow-2xs transition-all duration-200
                focus:border-[#113858] focus:outline-none focus:ring-1 focus:ring-[#113858]
              "
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#607487] hover:text-[#113858]"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Center: Count */}
          <div className="text-[13px] font-semibold text-[#113858] hidden sm:block">
            <span>
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </span>
          </div>

          {/* Right: Sort & View Toggle + Mobile filter toggle */}
          <div className="flex items-center gap-2 justify-between md:justify-end">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="
                inline-flex lg:hidden items-center gap-1.5
                rounded-xl border border-slate-200 bg-white px-3 py-1.5
                text-[12px] font-semibold text-[#113858] shadow-2xs
              "
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#113858] text-[9px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-1.5">
              <span className="text-[12px] text-[#607487] hidden sm:inline">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort products by"
                  className="
                    appearance-none rounded-xl border border-slate-200/90 bg-white
                    py-1.5 pl-2.5 pr-7 text-[12px] font-semibold text-[#113858]
                    shadow-2xs transition-all duration-200 cursor-pointer
                    focus:border-[#113858] focus:outline-none focus:ring-1 focus:ring-[#113858]
                  "
                >
                  <option value="featured">Featured</option>
                  <option value="low">Price — Low to High</option>
                  <option value="high">Price — High to Low</option>
                  <option value="newest">Newest</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#607487]" />
              </div>
            </div>

            {/* Grid / List View Toggle */}
            <div className="flex items-center rounded-xl border border-slate-200 bg-white p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg transition-colors cursor-pointer",
                  viewMode === "grid" ? "bg-[#113858] text-white" : "text-[#607487] hover:text-[#113858]"
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg transition-colors cursor-pointer",
                  viewMode === "list" ? "bg-[#113858] text-white" : "text-[#607487] hover:text-[#113858]"
                )}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Product Grid */}
        <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-5">
          {/* ========================================================= */}
          {/* 6. FILTER SIDEBAR (Desktop)                              */}
          {/* ========================================================= */}
          <aside
            className="
              hidden lg:block
              w-[240px] xl:w-[250px] shrink-0
              rounded-2xl border border-slate-200/90 bg-white
              p-4 shadow-xs
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4 text-[#113858]" />
                <h3 className="text-[13.5px] font-bold text-[#113858]">Filters</h3>
              </div>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-[11.5px] font-medium text-[#607487] hover:text-[#113858] transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* Filter 1: Price Range */}
            <div className="py-3 border-b border-slate-100">
              <button
                type="button"
                onClick={() => toggleSection("price")}
                className="flex w-full items-center justify-between text-left cursor-pointer"
              >
                <span className="text-[12.5px] font-bold text-[#113858]">Price Range</span>
                <span className="text-[11.5px] font-semibold text-[#113858]">
                  ₹{priceMin} – ₹{priceMax}
                </span>
              </button>

              {openSections.price && (
                <div className="mt-2.5 px-1">
                  <div className="relative flex items-center h-4">
                    <input
                      type="range"
                      min={500}
                      max={2500}
                      step={50}
                      value={priceMin}
                      onChange={(e) => {
                        const val = Math.min(Number(e.target.value), priceMax - 100);
                        setPriceMin(val);
                      }}
                      className="absolute w-full accent-[#113858] cursor-pointer pointer-events-auto"
                    />
                    <input
                      type="range"
                      min={500}
                      max={2500}
                      step={50}
                      value={priceMax}
                      onChange={(e) => {
                        const val = Math.max(Number(e.target.value), priceMin + 100);
                        setPriceMax(val);
                      }}
                      className="absolute w-full accent-[#113858] cursor-pointer pointer-events-auto"
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[10.5px] font-medium text-[#607487]">
                    <span>₹500</span>
                    <span>₹2,500</span>
                  </div>
                </div>
              )}
            </div>

            {/* Filter 2: Category Checkboxes */}
            <div className="py-3 border-b border-slate-100">
              <button
                type="button"
                onClick={() => toggleSection("category")}
                className="flex w-full items-center justify-between text-left cursor-pointer"
              >
                <span className="text-[12.5px] font-bold text-[#113858]">Category</span>
                {openSections.category ? (
                  <ChevronUp className="h-3.5 w-3.5 text-[#607487]" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-[#607487]" />
                )}
              </button>

              {openSections.category && (
                <div className="mt-2 space-y-1">
                  {NAV_CATEGORIES.filter((c) => c.id !== "ALL").map((cat) => {
                    const isChecked = sidebarCategories.includes(cat.id);
                    const count = categoryCounts[cat.id] ?? 0;
                    return (
                      <label
                        key={cat.id}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-1.5 py-0.5 text-[12px] text-[#113858] hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleSidebarCategoryToggle(cat.id)}
                            className="h-3.5 w-3.5 rounded border-slate-300 text-[#113858] focus:ring-[#113858]"
                          />
                          <span>{cat.label}</span>
                        </div>
                        <span className="text-[11px] text-[#607487]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Filter 3: Production Time */}
            <div className="py-3 border-b border-slate-100">
              <button
                type="button"
                onClick={() => toggleSection("production")}
                className="flex w-full items-center justify-between text-left cursor-pointer"
              >
                <span className="text-[12.5px] font-bold text-[#113858]">Production Time</span>
                {openSections.production ? (
                  <ChevronUp className="h-3.5 w-3.5 text-[#607487]" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-[#607487]" />
                )}
              </button>

              {openSections.production && (
                <div className="mt-2 space-y-1">
                  {PRODUCTION_OPTIONS.map((opt) => {
                    const isChecked = selectedProduction.includes(opt.id);
                    const count = productionCounts[opt.id as keyof typeof productionCounts] ?? 0;
                    return (
                      <label
                        key={opt.id}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-1.5 py-0.5 text-[12px] text-[#113858] hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              setSelectedProduction((prev) =>
                                prev.includes(opt.id)
                                  ? prev.filter((x) => x !== opt.id)
                                  : [...prev, opt.id]
                              )
                            }
                            className="h-3.5 w-3.5 rounded border-slate-300 text-[#113858] focus:ring-[#113858]"
                          />
                          <span>{opt.label}</span>
                        </div>
                        <span className="text-[11px] text-[#607487]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Filter 4: Minimum Quantity */}
            <div className="py-3 border-b border-slate-100">
              <button
                type="button"
                onClick={() => toggleSection("qty")}
                className="flex w-full items-center justify-between text-left cursor-pointer"
              >
                <span className="text-[12.5px] font-bold text-[#113858]">Min. Quantity</span>
                {openSections.qty ? (
                  <ChevronUp className="h-3.5 w-3.5 text-[#607487]" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-[#607487]" />
                )}
              </button>

              {openSections.qty && (
                <div className="mt-2 space-y-1">
                  {QTY_OPTIONS.map((opt) => {
                    const isChecked = selectedQty.includes(opt.id);
                    const count = qtyCounts[opt.id as keyof typeof qtyCounts] ?? 0;
                    return (
                      <label
                        key={opt.id}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-1.5 py-0.5 text-[12px] text-[#113858] hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              setSelectedQty((prev) =>
                                prev.includes(opt.id)
                                  ? prev.filter((x) => x !== opt.id)
                                  : [...prev, opt.id]
                              )
                            }
                            className="h-3.5 w-3.5 rounded border-slate-300 text-[#113858] focus:ring-[#113858]"
                          />
                          <span>{opt.label}</span>
                        </div>
                        <span className="text-[11px] text-[#607487]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Apply Filters Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => {}}
                className="
                  w-full rounded-xl bg-[#113858] py-2 text-center
                  text-[12px] font-semibold text-white shadow-sm
                  transition-all duration-200 hover:bg-[#0b243a] cursor-pointer
                "
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* 7 & 8. PRODUCT GRID                                      */}
          {/* ========================================================= */}
          <main className="flex-1 min-w-0">
            {filteredProducts.length > 0 ? (
              <div
                className={cn(
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
                    : "flex flex-col gap-3"
                )}
              >
                {filteredProducts.map((p, idx) => (
                  <ProductCard key={p.slug} product={p} index={idx} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <p className="text-[14px] font-bold text-[#113858]">No products match your filters</p>
                <p className="mt-1 text-[12px] text-[#607487]">
                  Try adjusting the price slider or resetting category checkboxes.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="
                    mt-3 inline-flex items-center gap-1.5
                    rounded-full bg-[#113858] px-3.5 py-1.5
                    text-[11.5px] font-semibold text-white
                    transition-all hover:bg-[#0b243a] cursor-pointer
                  "
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 10. MOBILE FILTER DRAWER                                 */}
      {/* ========================================================= */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[60] flex justify-end bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <aside
            role="dialog"
            aria-label="Filter products"
            className="flex h-full w-full max-w-xs flex-col bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-[14px] font-bold text-[#113858]">Filters</h3>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-full p-1 text-[#607487] hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3.5">
              {/* Price */}
              <div>
                <p className="text-[12px] font-bold text-[#113858]">Price Range</p>
                <p className="text-[11px] text-[#607487] mt-0.5">
                  ₹{priceMin} – ₹{priceMax}
                </p>
                <div className="relative flex items-center h-4 mt-2">
                  <input
                    type="range"
                    min={500}
                    max={2500}
                    step={50}
                    value={priceMin}
                    onChange={(e) => {
                      const val = Math.min(Number(e.target.value), priceMax - 100);
                      setPriceMin(val);
                    }}
                    className="absolute w-full accent-[#113858]"
                  />
                  <input
                    type="range"
                    min={500}
                    max={2500}
                    step={50}
                    value={priceMax}
                    onChange={(e) => {
                      const val = Math.max(Number(e.target.value), priceMin + 100);
                      setPriceMax(val);
                    }}
                    className="absolute w-full accent-[#113858]"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <p className="text-[12px] font-bold text-[#113858] mb-1">Category</p>
                <div className="space-y-1">
                  {NAV_CATEGORIES.filter((c) => c.id !== "ALL").map((cat) => {
                    const isChecked = sidebarCategories.includes(cat.id);
                    return (
                      <label
                        key={cat.id}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-1.5 py-1 text-[11.5px] text-[#113858] hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleSidebarCategoryToggle(cat.id)}
                            className="h-3.5 w-3.5 rounded text-[#113858]"
                          />
                          <span>{cat.label}</span>
                        </div>
                        <span className="text-[10.5px] text-[#607487]">
                          ({categoryCounts[cat.id] ?? 0})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 rounded-xl border border-slate-200 py-2 text-[11.5px] font-semibold text-[#113858]"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex-1 rounded-xl bg-[#113858] py-2 text-[11.5px] font-semibold text-white"
              >
                Apply
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
