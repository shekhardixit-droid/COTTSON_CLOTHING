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
<<<<<<< HEAD
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
=======
    <main id="home" className="bg-white">
      <section
        className="
          relative mx-auto w-full max-w-[1600px]
          overflow-hidden px-5 pb-10
          pt-[112px] sm:px-6 sm:pt-[120px]
          md:px-8 md:pt-[130px]
          lg:px-10 lg:pt-[140px]
        "
      >
        <div
          className="
            relative z-20 mx-auto flex w-full max-w-[1500px]
            flex-col items-center
            lg:min-h-[560px]
          "
        >

          {/* =====================================================
              LEFT — CUSTOM T-SHIRT SHOWCASE
          ===================================================== */}
          <div
            className="
              absolute left-[-7%] top-1/2
              hidden h-[620px] w-[400px]
              -translate-y-1/2
              lg:block
              xl:left-[-4%]
              2xl:left-[-2%]
            "
          >
            {/* Soft background */}
            <div
              className="
                absolute left-[35px] top-[90px]
                h-[330px] w-[330px]
                rounded-full
                bg-[#f5f8fa]
              "
            />

            {/* CUSTOM T-SHIRT 1 */}
            <a
              href="#products"
              className="
                group absolute left-[5px] top-[95px]
                z-20
              "
            >
              <img
                src="/custom-tshirt-1.png"
                alt="Custom branded T-shirt"
                decoding="async"
                className="
                  h-[280px] w-[260px]
                  object-contain
                  drop-shadow-[0_18px_20px_rgba(17,56,88,0.09)]
                  transition-transform duration-700 ease-out
                  group-hover:-translate-y-2
                  group-hover:rotate-[-2deg]
                "
              />
            </a>

            {/* CUSTOM T-SHIRT 2 */}
            <a
              href="#products"
              className="
                group absolute right-[0px] top-[20px]
                z-10
              "
            >
              <img
                src="/custom-tshirt-2.png"
                alt="Customized company T-shirt"
                decoding="async"
                className="
                  h-[280px] w-[260px]
                  object-contain
                  drop-shadow-[0_18px_20px_rgba(17,56,88,0.09)]
                  transition-transform duration-700 ease-out
                  group-hover:-translate-y-2
                  group-hover:rotate-[2deg]
                "
              />
            </a>

            {/* CUSTOM T-SHIRT 3 */}
            <a
              href="#products"
              className="
                group absolute bottom-[15px] left-[100px]
                z-30
              "
            >
              <img
                src="/custom-tshirt-3.png"
                alt="Custom printed T-shirt"
                decoding="async"
                className="
                  h-[270px] w-[250px]
                  object-contain
                  drop-shadow-[0_18px_20px_rgba(17,56,88,0.09)]
                  transition-transform duration-700 ease-out
                  group-hover:-translate-y-2
                "
              />
            </a>

            {/* Label */}
            <div
              className="
                absolute bottom-[5px] left-[15px]
                z-40 rounded-full
                border border-[#113858]/10
                bg-white
                px-4 py-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#113858]
                shadow-[0_10px_30px_rgba(17,56,88,0.08)]
              "
            >
              Custom T-Shirts
            </div>
          </div>


          {/* =====================================================
              CENTER — MAIN HERO CONTENT
          ===================================================== */}
          <div
            className="
              relative z-50
              flex w-full max-w-[620px]
              flex-col items-center
              px-8 text-center
              lg:absolute
              lg:left-1/2
              lg:top-1/2
              lg:-translate-x-1/2
              lg:-translate-y-1/2
            "
          >
            {/* Eyebrow */}
            <p
              className="
                mb-4
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#113858]/50
                sm:text-xs
              "
            >
              Custom Apparel for Teams
            </p>

            {/* Main Heading */}
            <h1
              className="
                text-[clamp(2.5rem,5vw,4.7rem)]
                font-semibold
                leading-[0.94]
                tracking-[-0.06em]
                text-[#113858]
              "
            >
              Corporate Clothing
              <br />
              <span className="text-[#113858]/45">
                Made for Your Brand.
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                mx-auto mt-6
                max-w-[500px]
                text-[13px]
                leading-6
                text-[#607487]
                sm:text-[15px]
                sm:leading-7
              "
            >
              Custom clothing for companies, teams and events —
              from branded T-shirts to shirts, polos and jackets.
            </p>

            {/* Buttons */}
            <div
              className="
                mt-7
                flex w-full
                flex-col
                items-center
                justify-center
                gap-3
                sm:w-auto
                sm:flex-row
              "
            >
              {/* View Products */}
              <a
                href="#products"
                className="
                  group flex h-[46px]
                  w-full min-w-[160px]
                  items-center justify-center
                  gap-2
                  rounded-full
                  bg-[#113858]
                  px-6
                  text-[12px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-[2px]
                  hover:shadow-[0_8px_22px_rgba(17,56,88,0.18)]
                  active:scale-[0.98]
                  sm:w-auto
                "
              >
                View Products

                <ArrowRight
                  size={14}
                  strokeWidth={2}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-[4px]
                  "
                />
              </a>

              {/* WhatsApp */}
              <a
                href="#contact"
                className="
                  group flex h-[46px]
                  w-full min-w-[160px]
                  items-center justify-center
                  gap-2
                  rounded-full
                  border border-[#113858]
                  bg-white
                  px-6
                  text-[12px]
                  font-semibold
                  text-[#113858]
                  transition-all
                  duration-300
                  hover:-translate-y-[2px]
                  hover:bg-[#113858]
                  hover:text-white
                  hover:shadow-[0_8px_22px_rgba(17,56,88,0.14)]
                  active:scale-[0.98]
                  sm:w-auto
                "
              >
                <MessageCircle
                  size={15}
                  strokeWidth={2}
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

                WhatsApp Us
              </a>
            </div>
          </div>


          {/* =====================================================
              RIGHT — CORPORATE CLOTHING
              INTERNAL POSITIONS KEPT EXACTLY THE SAME
          ===================================================== */}
          <div
            className="
              absolute right-[-7%] top-1/2
              hidden h-[620px] w-[560px]
              -translate-y-1/2
              lg:block
              xl:right-[-4%]
              2xl:right-[-2%]
            "
          >

            {/* MAIN JACKET */}
            <a
              href="#products"
              className="
                group absolute
                right-[70px] top-[5px]
                z-20
              "
            >
              <div className="relative">

                <div
                  className="
                    absolute bottom-[35px] left-1/2
                    h-[35px] w-[220px]
                    -translate-x-1/2
                    rounded-full
                    bg-[#113858]/10
                    blur-xl
                  "
                />

                <img
                  src="jacket.png"
                  alt="Cottson corporate jacket"
                  decoding="async"
                  className="
                    relative
                    h-[390px] w-[360px]
                    object-contain
                    drop-shadow-[0_18px_20px_rgba(17,56,88,0.09)]
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:-translate-y-2
                    group-hover:scale-[1.02]
                  "
                />

              </div>
            </a>


            {/* BOTTOM SHIRT */}
            <a
              href="#products"
              className="
                group absolute
                bottom-[25px] left-[30px]
                z-30
              "
            >
              <div className="relative">

                <div
                  className="
                    absolute bottom-[25px] left-1/2
                    h-[28px] w-[170px]
                    -translate-x-1/2
                    rounded-full
                    bg-[#113858]/10
                    blur-xl
                  "
                />

                <img
                  src="shirt.png"
                  alt="Cottson corporate shirt"
                  decoding="async"
                  className="
                    relative
                    h-[390px] w-[360px]
                    object-contain
                    drop-shadow-[0_18px_20px_rgba(17,56,88,0.08)]
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:-translate-y-2
                    group-hover:-rotate-1
                  "
                />

              </div>
            </a>


            {/* BOTTOM POLO */}
            <a
              href="#products"
              className="
                group absolute
                bottom-[25px] -right-[60px]
                z-30
              "
            >
              <div className="relative">

                <div
                  className="
                    absolute bottom-[25px] left-1/2
                    h-[28px] w-[170px]
                    -translate-x-1/2
                    rounded-full
                    bg-[#113858]/10
                    blur-xl
                  "
                />

                <img
                  src="polo.png"
                  alt="Cottson custom polo"
                  decoding="async"
                  className="
                    relative
                    h-[390px] w-[360px]
                    object-contain
                    drop-shadow-[0_18px_20px_rgba(17,56,88,0.08)]
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:-translate-y-2
                    group-hover:rotate-1
                  "
                />

              </div>
            </a>

          </div>


          {/* =====================================================
              TABLET
          ===================================================== */}
          <div
            className="
              relative z-10 mx-auto
              hidden w-full max-w-[620px]
              md:grid md:grid-cols-3
              md:items-end md:gap-2
              lg:hidden
            "
          >
            <img
              src="/custom-tshirt-1.png"
              alt="Custom T-shirt"
              decoding="async"
              className="
                h-auto max-h-[210px]
                w-full object-contain
              "
            />

            <img
              src="jacket.png"
              alt="Corporate jacket"
              decoding="async"
              className="
                h-auto max-h-[240px]
                w-full object-contain
              "
            />

            <img
              src="polo.png"
              alt="Corporate polo"
              decoding="async"
              className="
                h-auto max-h-[220px]
                w-full object-contain
              "
            />
          </div>


          {/* =====================================================
              MOBILE
          ===================================================== */}
          <div
            className="
              relative z-10 mx-auto
              grid w-full max-w-[520px]
              grid-cols-4
              items-end gap-1
              md:hidden
            "
          >
            <img
              src="/custom-tshirt-1.png"
              alt="Custom T-shirt"
              decoding="async"
              className="
                h-auto max-h-[125px]
                w-full object-contain
              "
            />

            <img
              src="shirt.png"
              alt="Corporate shirt"
              decoding="async"
              className="
                h-auto max-h-[145px]
                w-full object-contain
              "
            />

            <img
              src="jacket.png"
              alt="Corporate jacket"
              decoding="async"
              className="
                h-auto max-h-[160px]
                w-full object-contain
              "
            />

            <img
              src="polo.png"
              alt="Corporate polo"
              decoding="async"
              className="
                h-auto max-h-[145px]
                w-full object-contain
              "
            />
          </div>

        </div>
      </section>


      {/* =====================================================
          BENEFITS / TRUST STRIP
      ===================================================== */}
      <div className="mx-auto max-w-[1120px] px-5 pb-8">
        <div
          className="
            flex flex-wrap
            items-center justify-center
            gap-x-6 gap-y-3
            border-y border-[#113858]/10
            py-4
            sm:gap-x-10
          "
        >
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="
                flex items-center gap-2
                whitespace-nowrap
                text-[10.5px]
                font-medium
                text-[#113858]/65
              "
            >
              <span
                className="
                  flex h-[17px] w-[17px]
                  shrink-0 items-center
                  justify-center
                  rounded-full
                  bg-[#113858]
                  text-white
                "
              >
                <Check
                  size={9}
                  strokeWidth={2.5}
                />
              </span>

              {benefit}
>>>>>>> f228f51ecacb52f1f0afe12a28a0571c9fc3012d
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