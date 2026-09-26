import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Corporate Polos",
    category: "Custom Apparel",
    image: "/images/marquee/polo.png",
    slug: "corporate-polos",
  },
  {
    id: 2,
    name: "Premium T-Shirts",
    category: "Team Essentials",
    image: "/images/marquee/tshirt.png",
    slug: "premium-tshirts",
  },
  {
    id: 3,
    name: "Corporate Shirts",
    category: "Workwear",
    image: "/images/marquee/shirt.png",
    slug: "corporate-shirts",
  },
  {
    id: 4,
    name: "Custom Jackets",
    category: "Outerwear",
    image: "/images/marquee/jacket.png",
    slug: "custom-jackets",
  },
  {
    id: 5,
    name: "Team Hoodies",
    category: "Casual Workwear",
    image: "/images/marquee/hoodie.png",
    slug: "team-hoodies",
  },
  {
    id: 6,
    name: "Sweatshirts",
    category: "Premium Essentials",
    image: "/images/marquee/sweatshirt.png",
    slug: "sweatshirts",
  },
];

function ProductCard({ product, onEnter, onLeave }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.slug}`, {
      state: {
        product,
        from: "/#products",
      },
    });
  };

  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={handleClick}
      className="
        group
        relative block
        h-[340px] w-[260px]
        shrink-0
        cursor-pointer
        overflow-hidden
        rounded-[24px]
        border-0
        bg-[#F3F6F8]
        p-0
        text-left

        sm:h-[390px]
        sm:w-[300px]

        lg:h-[430px]
        lg:w-[330px]
      "
    >
      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        draggable="false"
        className="
          h-full
          w-full
          object-cover

          transition-transform
          duration-700
          ease-out

          group-hover:scale-[1.05]
        "
      />

      {/* OVERLAY */}
      <div
        className="
          pointer-events-none
          absolute inset-0

          bg-gradient-to-t
          from-[#113858]/80
          via-[#113858]/5
          to-transparent

          transition-opacity
          duration-300

          group-hover:from-[#113858]/90
        "
      />

      {/* CONTENT */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0

          flex
          items-end
          justify-between
          gap-4

          p-5
          sm:p-6
        "
      >
        <div className="min-w-0">
          <p
            className="
              mb-1.5
              truncate
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-white/65
            "
          >
            {product.category}
          </p>

          <h3
            className="
              break-words
              text-[17px]
              font-semibold
              tracking-[-0.025em]
              text-white

              sm:text-[19px]
            "
          >
            {product.name}
          </h3>
        </div>

        <div
          className="
            flex
            h-[38px]
            w-[38px]
            shrink-0
            items-center
            justify-center

            rounded-full
            border
            border-white

            bg-white
            text-[#113858]

            transition-all
            duration-300

            group-hover:rotate-45
            group-hover:bg-[#113858]
            group-hover:text-white
          "
        >
          <ArrowUpRight
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>
    </button>
  );
}

function ProductMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      id="products"
      className="
        overflow-hidden
        bg-white
        py-20

        md:py-24
      "
    >
      {/* ======================================
          HEADING
      ====================================== */}

      <div
        className="
          mx-auto
          mb-10
          flex
          max-w-[1120px]
          flex-col
          gap-5
          px-5

          sm:px-6

          md:mb-12
          md:flex-row
          md:items-end
          md:justify-between
        "
      >
        <div className="min-w-0">
          <p
            className="
              mb-3
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#113858]/55
            "
          >
            Explore the range
          </p>

          <h2
            className="
              max-w-[560px]
              break-words
              text-[34px]
              font-semibold
              leading-[1.08]
              tracking-[-0.045em]
              text-[#113858]

              sm:text-[42px]
              lg:text-[48px]
            "
          >
            Made for every
            <br className="hidden sm:block" />
            {" "}
            kind of team.
          </h2>
        </div>

        <p
          className="
            max-w-[390px]
            break-words
            text-[13px]
            leading-[1.75]
            text-[#607487]

            md:text-right
          "
        >
          From everyday polos to premium outerwear, customise every
          piece around your company's identity.
        </p>
      </div>

      {/* ======================================
          MARQUEE
      ====================================== */}

      <div className="relative w-full overflow-hidden">

        {/* LEFT FADE */}
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-20
            h-full
            w-[50px]

            bg-gradient-to-r
            from-white
            to-transparent

            sm:w-[100px]
            lg:w-[140px]
          "
        />

        {/* RIGHT FADE */}
        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-20
            h-full
            w-[50px]

            bg-gradient-to-l
            from-white
            to-transparent

            sm:w-[100px]
            lg:w-[140px]
          "
        />

        {/* MOVING TRACK */}
        <div
          className="
            cottson-marquee-track
            flex
            w-max
            gap-4
            will-change-transform
          "
          style={{
            animation: "cottsonMarquee 32s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {/* ORIGINAL SET */}
          <div className="flex shrink-0 gap-4">
            {products.map((product) => (
              <ProductCard
                key={`original-${product.id}`}
                product={product}
                onEnter={() => setIsPaused(true)}
                onLeave={() => setIsPaused(false)}
              />
            ))}
          </div>

          {/* DUPLICATE SET */}
          <div
            className="flex shrink-0 gap-4"
            aria-hidden="true"
          >
            {products.map((product) => (
              <ProductCard
                key={`duplicate-${product.id}`}
                product={product}
                onEnter={() => setIsPaused(true)}
                onLeave={() => setIsPaused(false)}
              />
            ))}
          </div>
        </div>

        {/* LOCAL CSS */}
        <style>
          {`
            @keyframes cottsonMarquee {
              from {
                transform: translateX(0);
              }

              to {
                transform: translateX(calc(-50% - 8px));
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .cottson-marquee-track {
                animation: none !important;
              }
            }
          `}
        </style>
      </div>
    </section>
  );
}

export default ProductMarquee;