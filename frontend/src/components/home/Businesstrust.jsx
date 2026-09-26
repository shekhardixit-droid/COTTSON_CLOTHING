import {
  ArrowRight,
  Building2,
  Clock3,
  PackageCheck,
  Boxes,
} from "lucide-react";

const stats = [
  {
    id: 1,
    icon: Building2,
    value: "250+",
    label: "Businesses Served",
  },
  {
    id: 2,
    icon: Clock3,
    value: "7–10",
    suffix: "Days",
    label: "Typical Delivery",
  },
  {
    id: 3,
    icon: Boxes,
    value: "8K+",
    label: "Production Capacity",
  },
  {
    id: 4,
    icon: PackageCheck,
    value: "25",
    suffix: "Pieces",
    label: "Minimum Order",
  },
];

function BusinessTrust() {
  return (
    <section
      className="
        bg-white
        px-5
        py-20

        sm:px-6
        md:py-24
        lg:px-8
        lg:py-28
      "
    >
      <div className="mx-auto max-w-[1380px]">

        {/* =========================================
            SECTION HEADING
        ========================================== */}

        <div
          className="
            mx-auto
            mb-12
            max-w-[760px]
            text-center

            md:mb-14
          "
        >
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2

              whitespace-nowrap
              rounded-full
              border
              border-[#113858]/10

              bg-[#F5F8FA]

              px-3.5
              py-[7px]
            "
          >
            <span
              className="
                h-[6px]
                w-[6px]
                shrink-0
                rounded-full
                bg-[#113858]
              "
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#113858]/60
              "
            >
              Built for business
            </span>
          </div>

          <h2
            className="
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
            Made to handle
            <span className="text-[#113858]/45">
              {" "}teams of every size.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[570px]

              text-[13px]
              leading-[1.75]
              text-[#607487]

              sm:text-[14px]
            "
          >
            From growing teams to large corporate requirements,
            our production process is built around reliable quality,
            customisation and delivery.
          </p>
        </div>

        {/* =========================================
            STATS
        ========================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-3

            min-[380px]:grid-cols-2

            md:grid-cols-4
            md:gap-4
          "
        >
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.id}
                className="
                  group

                  flex
                  min-h-[190px]
                  min-w-0
                  flex-col
                  justify-between

                  rounded-[24px]

                  border
                  border-[#113858]/[0.08]

                  bg-[#F5F8FA]

                  p-5

                  transition-all
                  duration-300

                  hover:-translate-y-[3px]
                  hover:border-[#113858]/15
                  hover:bg-white

                  hover:shadow-[0_14px_40px_rgba(17,56,88,0.08)]

                  sm:min-h-[210px]
                  sm:p-6

                  lg:min-h-[225px]
                "
              >
                {/* ICON */}
                <div
                  className="
                    flex
                    h-[42px]
                    w-[42px]
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    bg-[#E9F0F5]
                    text-[#113858]

                    transition-all
                    duration-300

                    group-hover:bg-[#113858]
                    group-hover:text-white
                  "
                >
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                  />
                </div>

                {/* NUMBER */}
                <div className="min-w-0">
                  <div
                    className="
                      flex
                      flex-wrap
                      items-end
                      gap-1.5
                    "
                  >
                    <span
                      className="
                        break-words
                        text-[30px]
                        font-semibold
                        leading-none
                        tracking-[-0.055em]
                        text-[#113858]

                        sm:text-[36px]
                        lg:text-[40px]
                      "
                    >
                      {stat.value}
                    </span>

                    {stat.suffix && (
                      <span
                        className="
                          mb-[3px]
                          text-[11px]
                          font-semibold
                          text-[#113858]/45
                        "
                      >
                        {stat.suffix}
                      </span>
                    )}
                  </div>

                  <p
                    className="
                      mt-2
                      break-words
                      text-[11px]
                      font-medium
                      text-[#607487]

                      sm:text-[12px]
                    "
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================
            CTA PANEL
        ========================================== */}

        <div
          className="
            mt-5
            grid
            overflow-hidden
            rounded-[28px]

            bg-[#113858]

            md:grid-cols-[1.08fr_0.92fr]

            lg:mt-6
            lg:min-h-[480px]
            lg:rounded-[36px]
          "
        >
          {/* =========================================
              IMAGE
          ========================================== */}

          <div
            className="
              group
              relative
              min-h-[280px]
              overflow-hidden

              sm:min-h-[400px]
              md:min-h-full
            "
          >
            <img
              src="/images/business-trust/clothing-rack.jpg"
              alt="Cottson corporate clothing collection"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover

                transition-transform
                duration-[900ms]
                ease-out

                group-hover:scale-[1.035]
              "
            />

            {/* subtle overlay */}
            <div
              className="
                absolute
                inset-0

                bg-gradient-to-r
                from-[#113858]/5
                to-[#113858]/20
              "
            />

            {/* IMAGE LABEL */}
            <div
              className="
                absolute
                bottom-5
                left-5
                right-5

                w-fit
                max-w-[calc(100%-2.5rem)]
                rounded-full

                border
                border-white/25

                bg-white/90

                px-4
                py-2

                backdrop-blur-md
              "
            >
              <p
                className="
                  truncate
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#113858]
                "
              >
                Custom corporate apparel
              </p>
            </div>
          </div>

          {/* =========================================
              CTA CONTENT
          ========================================== */}

          <div
            className="
              relative
              flex
              min-w-0
              items-center

              px-6
              py-12

              sm:px-10

              lg:px-14
              lg:py-16
            "
          >
            {/* BACKGROUND DECORATION */}
            <div
              className="
                pointer-events-none

                absolute
                -right-[100px]
                -top-[100px]

                h-[300px]
                w-[300px]

                rounded-full

                border
                border-white/[0.06]
              "
            />

            <div
              className="
                pointer-events-none

                absolute
                -right-[40px]
                -top-[40px]

                h-[180px]
                w-[180px]

                rounded-full

                border
                border-white/[0.06]
              "
            />

            <div className="relative z-10 min-w-0">

              {/* LABEL */}
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white/45
                "
              >
                Start your project
              </p>

              {/* HEADING */}
              <h3
                className="
                  mt-4
                  max-w-[500px]
                  break-words

                  text-[32px]
                  font-semibold
                  leading-[1.08]
                  tracking-[-0.045em]
                  text-white

                  sm:text-[38px]
                  lg:text-[44px]
                "
              >
                Ready to dress
                <br />

                <span className="text-white/50">
                  your team?
                </span>
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-5
                  max-w-[440px]
                  break-words

                  text-[13px]
                  leading-[1.8]
                  text-white/60

                  sm:text-[14px]
                "
              >
                Tell us what you need and we'll help you choose
                the right garments, colours, branding and
                customisation for your team.
              </p>

              {/* CTA */}
              <a
                href="#contact"
                className="
                  group/button

                  mt-8

                  inline-flex
                  h-[48px]
                  items-center
                  justify-center
                  gap-2

                  whitespace-nowrap
                  rounded-full

                  border
                  border-white

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
                "
              >
                Talk to Our Team

                <ArrowRight
                  size={14}
                  strokeWidth={2}
                  className="
                    transition-transform
                    duration-300

                    group-hover/button:translate-x-1
                  "
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BusinessTrust;