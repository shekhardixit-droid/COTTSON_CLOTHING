import { ArrowUpRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Polo T-Shirts",
    number: "01",
    image: "/images/showcase/polo.jpg",
  },
  {
    id: 2,
    name: "Corporate Shirts",
    number: "02",
    image: "/images/showcase/shirt.jpg",
  },
  {
    id: 3,
    name: "Round Neck T-Shirts",
    number: "03",
    image: "/images/showcase/tshirt.jpg",
  },
  {
    id: 4,
    name: "Jackets",
    number: "04",
    image: "/images/showcase/jacket.jpg",
  },
  {
    id: 5,
    name: "Hoodies",
    number: "05",
    image: "/images/showcase/hoodie.jpg",
  },
  {
    id: 6,
    name: "Sweatshirts",
    number: "06",
    image: "/images/showcase/sweatshirt.jpg",
  },
];

function ProductCard({ product }) {
  return (
    <a
      href="#products"
      className="
        group relative
        block h-[380px] w-[290px]
        shrink-0 overflow-hidden
        rounded-[24px]
        bg-white/[0.08]

        sm:h-[430px]
        sm:w-[330px]

        lg:h-[470px]
        lg:w-[360px]
      "
    >
      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        draggable="false"
        className="
          h-full w-full object-cover
          transition-transform
          duration-700 ease-out

          group-hover:scale-[1.045]
        "
      />

      {/* DARK OVERLAY */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-[#113858]/90
          via-[#113858]/10
          to-transparent
        "
      />

      {/* NUMBER */}
      <div
        className="
          absolute left-5 top-5
          flex h-[32px] min-w-[32px]
          items-center justify-center
          rounded-full
          border border-white/30
          bg-white/10
          px-2
          text-[9px] font-semibold
          text-white
          backdrop-blur-md
        "
      >
        {product.number}
      </div>

      {/* BOTTOM CONTENT */}
      <div
        className="
          absolute inset-x-0 bottom-0
          flex items-end justify-between
          gap-4 p-5

          sm:p-6
        "
      >
        <h3
          className="
            max-w-[220px]
            text-[20px] font-semibold
            leading-[1.1]
            tracking-[-0.035em]
            text-white

            sm:text-[22px]
          "
        >
          {product.name}
        </h3>

        <div
          className="
            flex h-[40px] w-[40px]
            shrink-0 items-center justify-center
            rounded-full
            bg-white
            text-[#113858]

            transition-all duration-300

            group-hover:rotate-45
            group-hover:bg-[#113858]
            group-hover:text-white
          "
        >
          <ArrowUpRight size={16} strokeWidth={2} />
        </div>
      </div>
    </a>
  );
}

function ProductShowcase() {
  const repeatedProducts = [...products, ...products];

  return (
   <section
  className="
    mx-3
    overflow-hidden
    rounded-[28px]
    bg-[#113858]
    pb-20
    pt-20

    sm:mx-5
    sm:rounded-[32px]

    md:mx-7
    md:rounded-[36px]
    md:pb-24
    md:pt-24

    lg:mx-10
    lg:rounded-[40px]
    lg:pt-28

    xl:mx-12
  "
>
      {/* =====================================
          MAIN BRAND LOGO
      ====================================== */}

      <div
        className="
          mx-auto max-w-[1200px]
          px-5 text-center

          sm:px-6
        "
      >
        <p
          className="
            mb-5
            text-[9px] font-semibold
            uppercase tracking-[0.28em]
            text-white/45
          "
        >
          Corporate clothing by
        </p>

        {/* MAIN LOGO */}
       <div className="flex justify-center">
  <img
    src="cottson-logo.png"
    alt="Cottson Clothing"
    className="
      h-auto
      w-[100px]
      object-contain


      
    "
  />
</div>

        {/* Divider */}
        <div
          className="
            mx-auto mt-10
            h-px max-w-[820px]
            bg-white/15
          "
        />

        {/* =====================================
            PRODUCT INTRODUCTION
        ====================================== */}

        <div
          className="
            mx-auto mt-10
            flex max-w-[820px]
            flex-col items-center
          "
        >
          <p
            className="
              text-[10px]
              font-semibold uppercase
              tracking-[0.2em]
              text-white/45
            "
          >
            Our Products
          </p>

          <h3
            className="
              mt-4 max-w-[720px]
              text-[28px] font-medium
              leading-[1.25]
              tracking-[-0.04em]
              text-white

              sm:text-[34px]
              md:text-[40px]
            "
          >
            Corporate apparel made to
            <span className="text-white/45">
              {" "}represent your brand.
            </span>
          </h3>

          <p
            className="
              mt-5 max-w-[590px]
              text-[13px]
              leading-[1.8]
              text-white/55

              sm:text-[14px]
            "
          >
            From everyday team essentials to premium corporate
            wear, our products can be customised with your colours,
            logo and identity to create clothing your team is proud
            to wear.
          </p>
        </div>
      </div>

      {/* =====================================
          PRODUCT MARQUEE
      ====================================== */}

      <div
        className="
          group/marquee
          relative mt-14
          w-full overflow-hidden

          md:mt-16
        "
      >
        {/* LEFT FADE */}
        <div
          className="
            pointer-events-none
            absolute left-0 top-0
            z-20 h-full
            w-[40px]

            bg-gradient-to-r
            from-[#113858]
            to-transparent

            sm:w-[90px]
            lg:w-[130px]
          "
        />

        {/* RIGHT FADE */}
        <div
          className="
            pointer-events-none
            absolute right-0 top-0
            z-20 h-full
            w-[40px]

            bg-gradient-to-l
            from-[#113858]
            to-transparent

            sm:w-[90px]
            lg:w-[130px]
          "
        />

        {/* MOVING TRACK */}
        <div
          className="
            flex w-max gap-4
            will-change-transform

            group-hover/marquee:[animation-play-state:paused]
          "
          style={{
            animation:
              "cottsonProductShowcase 35s linear infinite",
          }}
        >
          {repeatedProducts.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
            />
          ))}
        </div>
      </div>

      {/* =====================================
          BOTTOM LINK
      ====================================== */}

      <div className="mt-12 flex justify-center">
        <a
          href="#products"
          className="
            group
            flex h-[46px]
            items-center justify-center
            gap-2 rounded-full

            border border-white
            bg-white
            px-6

            text-[12px]
            font-semibold
            text-[#113858]

            transition-all duration-300

            hover:-translate-y-[2px]
            hover:bg-[#113858]
            hover:text-white
          "
        >
          Explore All Products

          <ArrowUpRight
            size={14}
            strokeWidth={2}
            className="
              transition-transform duration-300

              group-hover:translate-x-[2px]
              group-hover:-translate-y-[2px]
            "
          />
        </a>
      </div>

      {/* =====================================
          LOCAL ANIMATION
      ====================================== */}

      <style>
        {`
          @keyframes cottsonProductShowcase {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(calc(-50% - 8px));
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .product-showcase-track {
              animation: none !important;
            }
          }
        `}
      </style>
    </section>
  );
}

export default ProductShowcase;