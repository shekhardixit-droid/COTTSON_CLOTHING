import {
  ArrowRight,
  Check,
  MessageCircle,
} from "lucide-react";

const benefits = [
  "Low MOQ",
  "Custom Branding",
  "Bulk Orders",
  "Pan-India Delivery",
];

function Hero() {
  return (
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
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Hero;