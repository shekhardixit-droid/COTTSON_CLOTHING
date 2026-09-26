import { useState } from "react";
import {
  ArrowRight,
  Check,
  Scissors,
  Layers,
  ChevronRight,
} from "lucide-react";

// ============================================================================
// 🎨 WE MAKE CUSTOMIZED PRODUCTS — IMAGE SHOWCASE CONFIGURATION
// ----------------------------------------------------------------------------
// YOU CAN EASILY ADD, CHANGE, OR REMOVE IMAGES HERE:
// - Place image files in 'frontend/public/' (e.g. '/polo.png', '/my-jacket.png')
//   OR paste any Cloudinary/web image URL into the 'image' field.
// - Update 'title', 'tag', and 'features' to match your offerings.
// ============================================================================
export const CUSTOMIZED_PRODUCTS = [
  {
    id: "polos",
    title: "Custom Corporate Polos",
    tag: "Best Seller · Low MOQ",
    category: "Piqué & Dry-Fit Cotton",
    image: "/polo.png",
    description: "Bio-washed cotton with custom collar tipping, chest embroidery, and premium buttons.",
    features: [
      "Custom collar & cuff tipping",
      "High-density brand embroidery",
      "50+ Pantone-matched shades",
    ],
    href: "#products",
  },
  {
    id: "shirts",
    title: "Tailored Executive Shirts",
    tag: "Executive & Formal",
    category: "100% Woven Cotton & Oxford",
    image: "/shirt.png",
    description: "Crisp formal shirts with custom monogramming, tailored fits, and brand-engraved buttons.",
    features: [
      "Tailored slim & regular fits",
      "Wrinkle-resistant luxury finish",
      "Custom pocket & cuff embroidery",
    ],
    href: "#products",
  },
  {
    id: "jackets",
    title: "Branded Team Jackets",
    tag: "Outerwear & Winter",
    category: "Softshell, Fleece & Bomber",
    image: "/jacket.png",
    description: "Weatherproof team jackets featuring custom branded zipper pulls, fleece lining, and badges.",
    features: [
      "Water-resistant all-weather shells",
      "Custom branded zipper pullers",
      "Chest, back & sleeve branding",
    ],
    href: "#products",
  },
];

const benefits = [
  "Low MOQ",
  "Custom Branding",
  "Bulk Orders",
  "Pan-India Delivery",
];

export function Hero() {
  const [activeProduct, setActiveProduct] = useState(0);

  return (
    <main id="home" className="relative bg-[#ECE4DC]">
      {/* =======================================================================
          HERO BANNER (Utilizing /contacthero.png with corporate models)
      ======================================================================= */}
      <section className="relative w-full overflow-hidden">
        {/* BACKGROUND PHOTOGRAPHY BANNER */}
        <div className="absolute inset-0 z-0">
          <img
            src="/contacthero.png"
            alt="Cottson Corporate Apparel Models"
            fetchPriority="high"
            decoding="async"
            className="
              h-full w-full object-cover
              object-[82%_center]
              sm:object-[78%_center]
              md:object-[76%_center]
              lg:object-right
            "
          />

          {/* Desktop Left Ambient Gradient: guarantees 100% readable text while seamlessly blending into the studio background */}
          <div
            className="
              absolute inset-0 hidden sm:block
              bg-gradient-to-r
              from-[#EAE0D5] via-[#EAE0D5]/90 via-45% to-transparent
              lg:w-[66%] xl:w-[58%]
            "
          />

          {/* Mobile Tint Overlay: keeps models visible while ensuring crisp text contrast */}
          <div className="absolute inset-0 bg-[#EAE0D5]/88 backdrop-blur-[1px] sm:hidden" />

          {/* Subtle bottom gradient vignette to smoothly merge with the showcase deck */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#EAE0D5] to-transparent pointer-events-none" />
        </div>

        {/* HERO CONTENT CONTAINER */}
        <div
          className="
            relative z-10 mx-auto w-full max-w-[1400px]
            px-5 pt-[108px] pb-12
            sm:px-6 sm:pt-[124px] sm:pb-16
            md:px-8 md:pt-[136px]
            lg:px-10 lg:pt-[150px] lg:pb-20
          "
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            {/* LEFT TEXT & ACTIONS COLUMN */}
            <div className="w-full max-w-[580px] text-left">
              {/* Eyebrow Pill */}
              <div
                className="
                  mb-5 inline-flex items-center gap-2
                  rounded-full border border-[#113858]/15
                  bg-white/80 px-3.5 py-1.5
                  backdrop-blur-md shadow-[0_2px_12px_rgba(17,56,88,0.06)]
                "
              >
                <span className="h-2 w-2 rounded-full bg-[#113858] animate-pulse" />
                <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#113858]">
                  Bespoke Corporate Apparel Manufacturer
                </span>
              </div>

              {/* Main Heading — Content kept exactly the same */}
              <h1
                className="
                  text-[clamp(2.35rem,5.2vw,4.4rem)]
                  font-bold leading-[1.05]
                  tracking-[-0.045em] text-[#113858]
                "
              >
                Dress your team.
                <br />
                <span className="text-[#113858]/55">Build your identity.</span>
              </h1>

              {/* Subtitle — Content kept exactly the same */}
              <p
                className="
                  mt-5 max-w-[500px]
                  text-[clamp(14px,1.25vw,16px)]
                  leading-[1.75] tracking-[-0.01em]
                  text-[#4A5E71]
                "
              >
                Premium corporate apparel customised around your logo, colours
                and identity — made for companies, events and teams.
              </p>

              {/* Action Button — Single 'Shop Now' button opening products section */}
              <div className="mt-8 flex flex-col items-stretch sm:flex-row sm:items-center">
                <a
                  href="#products"
                  className="
                    group inline-flex h-[52px] min-w-[180px]
                    items-center justify-center gap-2.5
                    rounded-full bg-[#113858] px-8
                    text-[13.5px] font-semibold text-white
                    shadow-[0_10px_25px_rgba(17,56,88,0.22)]
                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5 hover:bg-[#0c283f]
                    hover:shadow-[0_14px_30px_rgba(17,56,88,0.3)]
                    active:translate-y-0 active:scale-[0.98]
                    sm:w-auto
                  "
                >
                  Shop Now
                  <ArrowRight
                    size={15}
                    strokeWidth={2.2}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>

              {/* Benefits / Trust Badges Strip — Content kept exactly the same */}
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-medium text-[#113858]/80">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-1.5">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#113858] text-white">
                      <Check size={9} strokeWidth={2.5} />
                    </span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          ✨ "WE MAKE CUSTOMIZED PRODUCTS" SHOWCASE DECK
          -----------------------------------------------------------------------
          Dedicated section where user/admin can add custom product images,
          and visitors can clearly see that Cottson makes custom products!
      ======================================================================= */}
      <section className="relative z-20 mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 pb-12 -mt-4 sm:-mt-6">
        <div
          className="
            overflow-hidden rounded-[26px]
            border border-white/90
            bg-white/85 p-6 sm:p-8 lg:p-10
            backdrop-blur-xl
            shadow-[0_20px_50px_rgba(17,56,88,0.08)]
          "
        >
          {/* SECTION HEADER */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end pb-8 border-b border-[#113858]/10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#113858]/8 px-3.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#113858]">
                <Scissors size={12} strokeWidth={2.5} />
                <span>100% Bespoke Manufacturing</span>
              </div>

              <h2 className="mt-2.5 text-[24px] sm:text-[30px] font-bold tracking-[-0.035em] text-[#113858]">
                We Make Customized Products
              </h2>

              <p className="mt-1 max-w-2xl text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#607487]">
                Every garment is crafted to your specifications — choose your fabric, Pantone-matched colours, custom collars, embroidery, and tailored sizing.
              </p>
            </div>

            <a
              href="#products"
              className="
                group inline-flex shrink-0 items-center gap-2
                rounded-full border border-[#113858]/20
                bg-white px-5 py-2.5 text-[12px] font-semibold text-[#113858]
                transition-all duration-300
                hover:border-[#113858] hover:bg-[#113858] hover:text-white
                hover:shadow-sm
              "
            >
              Explore Full Catalog
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* CUSTOMIZED PRODUCT CARDS GRID */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CUSTOMIZED_PRODUCTS.map((product, index) => (
              <div
                key={product.id}
                onMouseEnter={() => setActiveProduct(index)}
                className={`
                  group relative flex flex-col justify-between
                  rounded-[22px] border bg-[#F8F9FA] p-5 sm:p-6
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:bg-white
                  hover:shadow-[0_16px_36px_rgba(17,56,88,0.1)]
                  ${
                    activeProduct === index
                      ? "border-[#113858]/30 shadow-[0_10px_28px_rgba(17,56,88,0.06)] bg-white"
                      : "border-[#113858]/10"
                  }
                `}
              >
                <div>
                  {/* Top Badge & Category */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block rounded-full bg-[#113858]/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#113858]">
                      {product.tag}
                    </span>
                    <span className="text-[11px] font-medium text-[#607487]">
                      {product.category}
                    </span>
                  </div>

                  {/* Product Image Frame */}
                  <div className="relative my-4 flex h-[200px] w-full items-center justify-center overflow-hidden rounded-2xl bg-white/70 p-4 border border-[#113858]/5">
                    <div className="absolute inset-0 bg-radial from-white via-transparent to-transparent opacity-60" />
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      decoding="async"
                      className="
                        relative h-full w-full object-contain
                        drop-shadow-[0_10px_16px_rgba(17,56,88,0.08)]
                        transition-transform duration-500 ease-out
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-[17px] font-bold tracking-tight text-[#113858]">
                    {product.title}
                  </h3>

                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#607487]">
                    {product.description}
                  </p>

                  {/* Customization Bullet Highlights */}
                  <ul className="mt-4 space-y-1.5 border-t border-[#113858]/8 pt-3.5">
                    {product.features.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-center gap-2 text-[11.5px] font-medium text-[#4A5E71]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#113858]/50 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Link */}
                <div className="mt-5 pt-3 border-t border-[#113858]/5">
                  <a
                    href={product.href}
                    className="
                      inline-flex items-center gap-1.5 text-[12px]
                      font-semibold text-[#113858] transition-colors
                      group-hover:text-[#0b263d]
                    "
                  >
                    <span>Request Custom Quote</span>
                    <ChevronRight
                      size={13}
                      strokeWidth={2.5}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Customization Process Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#113858]/[0.03] px-5 py-3.5 border border-[#113858]/8">
            <div className="flex items-center gap-2.5">
              <Layers size={16} className="text-[#113858]" />
              <span className="text-[12px] font-semibold text-[#113858]">
                How Cottson Customization Works:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11.5px] text-[#607487]">
              <span>1. Choose Style & Fabric</span>
              <span className="text-[#113858]/30">→</span>
              <span>2. Send Logo & Brand Specs</span>
              <span className="text-[#113858]/30">→</span>
              <span>3. Digital Mockup Approval</span>
              <span className="text-[#113858]/30">→</span>
              <span>4. Factory Production & Delivery</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Hero;