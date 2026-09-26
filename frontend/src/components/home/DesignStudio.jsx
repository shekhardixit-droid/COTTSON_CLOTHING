import {
  ArrowRight,
  Check,
  Palette,
  Shirt,
  Sparkles,
} from "lucide-react";

const features = [
  "Preview your brand colours",
  "Position your logo accurately",
  "Review before production",
];

function DesignStudio() {
  return (
    <section
      id="customise"
      className="
        mx-3
        my-10
        overflow-hidden
        rounded-[28px]
        bg-[#E9F0F5]

        sm:mx-5
        sm:rounded-[32px]

        md:mx-7
        md:rounded-[36px]

        lg:mx-10
        lg:rounded-[40px]

        xl:mx-12
      "
    >
      <div
        className="
          mx-auto
          grid
          min-h-[650px]
          max-w-[1450px]
          grid-cols-1

          lg:grid-cols-[0.9fr_1.1fr]
          lg:items-center
        "
      >
        {/* ==========================================
            LEFT CONTENT
        =========================================== */}

        <div
          className="
            relative
            z-10
            px-6
            pb-12
            pt-14

            sm:px-10
            sm:py-16

            lg:px-14
            lg:py-20

            xl:px-16
          "
        >
          {/* LABEL */}
          <div
            className="
              mb-6
              inline-flex
              max-w-full
              items-center
              gap-2

              whitespace-nowrap
              rounded-full
              border
              border-[#113858]/10

              bg-white/70

              px-3.5
              py-[7px]
            "
          >
            <Sparkles
              size={12}
              strokeWidth={2}
              className="shrink-0 text-[#113858]"
            />

            <span
              className="
                truncate
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#113858]/65
              "
            >
              Design before production
            </span>
          </div>

          {/* HEADING */}
          <h2
            className="
              max-w-[610px]
              break-words

              text-[32px]
              font-semibold
              leading-[1.04]
              tracking-[-0.05em]
              text-[#113858]

              min-[380px]:text-[38px]

              sm:text-[48px]

              lg:text-[54px]

              xl:text-[60px]
            "
          >
            See your idea
            <br />

            <span className="text-[#113858]/45">
              before we make it.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-6
              max-w-[530px]
              break-words

              text-[13.5px]
              leading-[1.8]
              text-[#607487]

              sm:text-[14px]
            "
          >
            Visualise your corporate apparel before production.
            Experiment with garment colours, branding and logo
            placement so your team knows exactly what the final
            product will look like.
          </p>

          {/* FEATURES */}
          <div
            className="
              mt-7
              flex
              flex-col
              gap-3
            "
          >
            {features.map((feature) => (
              <div
                key={feature}
                className="
                  flex
                  items-center
                  gap-3

                  text-[12px]
                  font-medium
                  text-[#113858]/75
                "
              >
                <span
                  className="
                    flex
                    h-[22px]
                    w-[22px]
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    bg-[#113858]
                    text-white
                  "
                >
                  <Check
                    size={11}
                    strokeWidth={2.5}
                  />
                </span>

                <span className="break-words">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/customise"
            className="
              group

              mt-9

              inline-flex
              h-[48px]
              max-w-full
              items-center
              justify-center
              gap-2

              whitespace-nowrap
              rounded-full

              border
              border-[#113858]

              bg-[#113858]

              px-6

              text-[12px]
              font-semibold
              text-white

              transition-all
              duration-300

              hover:-translate-y-[2px]
              hover:bg-white
              hover:text-[#113858]

              hover:shadow-[0_10px_30px_rgba(17,56,88,0.12)]
            "
          >
            Start Designing

            <ArrowRight
              size={14}
              strokeWidth={2}
              className="
                shrink-0
                transition-transform
                duration-300

                group-hover:translate-x-1
              "
            />
          </a>
        </div>

        {/* ==========================================
            RIGHT VISUAL
        =========================================== */}

        <div
          className="
            relative
            min-h-[420px]
            overflow-hidden

            sm:min-h-[480px]

            lg:min-h-[650px]
          "
        >
          {/* LARGE BACKGROUND TEXT */}
          <span
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[47%]

              -translate-x-1/2
              -translate-y-1/2

              whitespace-nowrap

              text-[64px]
              font-bold
              tracking-[-0.08em]
              text-[#113858]/[0.035]

              min-[380px]:text-[90px]

              sm:text-[130px]
              lg:text-[150px]
            "
          >
            CUSTOM
          </span>

          {/* BACKGROUND CIRCLE */}
          <div
            className="
              absolute
              left-1/2
              top-1/2

              h-[280px]
              w-[280px]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              border
              border-[#113858]/10

              min-[380px]:h-[360px]
              min-[380px]:w-[360px]

              sm:h-[430px]
              sm:w-[430px]

              lg:h-[480px]
              lg:w-[480px]
            "
          />

          <div
            className="
              absolute
              left-1/2
              top-1/2

              h-[230px]
              w-[230px]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-white/45

              min-[380px]:h-[300px]
              min-[380px]:w-[300px]

              sm:h-[370px]
              sm:w-[370px]

              lg:h-[410px]
              lg:w-[410px]
            "
          />

          {/* ==========================================
              MAIN POLO / T-SHIRT
          =========================================== */}

          <img
            src="/images/design-studio/main-product.png"
            alt="Custom Cottson apparel preview"
            className="
              absolute
              bottom-[15px]
              left-1/2
              z-10

              h-[300px]
              w-[255px]

              -translate-x-[42%]

              object-contain

              drop-shadow-[0_25px_30px_rgba(17,56,88,0.14)]

              min-[380px]:h-[390px]
              min-[380px]:w-[330px]

              sm:h-[440px]
              sm:w-[390px]

              lg:bottom-[35px]
              lg:h-[510px]
              lg:w-[440px]
            "
          />

          {/* ==========================================
              FLOATING CUSTOMISATION PANEL
          =========================================== */}

          <div
            className="
              absolute
              left-[4%]
              top-[15%]
              z-20

              w-[145px]

              rounded-[16px]

              border
              border-white/60

              bg-white/90

              p-3

              shadow-[0_15px_45px_rgba(17,56,88,0.12)]

              backdrop-blur-xl

              min-[380px]:left-[6%]
              min-[380px]:top-[18%]
              min-[380px]:w-[180px]
              min-[380px]:rounded-[20px]
              min-[380px]:p-4

              sm:left-[10%]
              sm:w-[200px]

              lg:left-[3%]
              lg:top-[24%]
            "
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="
                  flex
                  h-[26px]
                  w-[26px]
                  shrink-0
                  items-center
                  justify-center

                  rounded-full

                  bg-[#E9F0F5]
                  text-[#113858]

                  min-[380px]:h-[30px]
                  min-[380px]:w-[30px]
                "
              >
                <Palette
                  size={14}
                  strokeWidth={2}
                />
              </span>

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-[#607487]
                  "
                >
                  Garment colour
                </p>

                <p
                  className="
                    mt-[2px]
                    truncate
                    text-[11px]
                    font-semibold
                    text-[#113858]
                  "
                >
                  Choose your shade
                </p>
              </div>
            </div>

            {/* COLOURS */}
            <div
              className="
                mt-4
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-[22px]
                  w-[22px]
                  shrink-0
                  rounded-full
                  border-[3px]
                  border-white
                  bg-[#113858]
                  shadow-[0_0_0_1px_rgba(17,56,88,0.15)]
                "
              />

              <span
                className="
                  h-[22px]
                  w-[22px]
                  shrink-0
                  rounded-full
                  bg-[#FFFFFF]
                  shadow-[0_0_0_1px_rgba(17,56,88,0.15)]
                "
              />

              <span
                className="
                  h-[22px]
                  w-[22px]
                  shrink-0
                  rounded-full
                  bg-[#9EB3C3]
                "
              />

              <span
                className="
                  h-[22px]
                  w-[22px]
                  shrink-0
                  rounded-full
                  bg-[#D7E1E8]
                "
              />
            </div>
          </div>

          {/* ==========================================
              LOGO PLACEMENT CARD
          =========================================== */}

          <div
            className="
              absolute
              bottom-[10%]
              right-[4%]
              z-20

              flex
              max-w-[68%]
              items-center
              gap-2

              rounded-[14px]

              border
              border-white/60

              bg-white/90

              px-3
              py-2.5

              shadow-[0_15px_45px_rgba(17,56,88,0.12)]

              backdrop-blur-xl

              min-[380px]:bottom-[13%]
              min-[380px]:right-[5%]
              min-[380px]:max-w-none
              min-[380px]:gap-3
              min-[380px]:rounded-[18px]
              min-[380px]:px-4
              min-[380px]:py-3

              sm:right-[10%]

              lg:bottom-[17%]
              lg:right-[5%]
            "
          >
            <span
              className="
                flex
                h-[30px]
                w-[30px]
                shrink-0
                items-center
                justify-center

                rounded-full

                bg-[#113858]
                text-white

                min-[380px]:h-[34px]
                min-[380px]:w-[34px]
              "
            >
              <Shirt
                size={15}
                strokeWidth={2}
              />
            </span>

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-[9px]
                  font-medium
                  text-[#607487]
                "
              >
                Branding
              </p>

              <p
                className="
                  mt-[1px]
                  truncate
                  text-[11px]
                  font-semibold
                  text-[#113858]
                "
              >
                Logo placement
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesignStudio;