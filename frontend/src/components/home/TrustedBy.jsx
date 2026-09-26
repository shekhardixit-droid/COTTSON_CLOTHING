import { useInView } from "../../hooks/useInView";
import { ClientMarqueeRows } from "../about/ClientLogoCarousel";

function TrustedBy() {
  const { ref: sectionRef, isInView } = useInView({ rootMargin: "250px" });

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="
        overflow-hidden
        bg-white
        py-20
        md:py-24
        lg:py-28
      "
    >
      {/* ================================
          HEADING
      ================================= */}
      <div
        className="
          mx-auto
          mb-12
          max-w-[1120px]
          px-5
          text-center
          sm:px-6
          md:mb-14
        "
      >
        <div
          className="
            mb-4
            inline-flex
            max-w-full
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
            Trusted By
          </span>
        </div>

        <h2
          className="
            mx-auto
            max-w-[700px]
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
          Trusted by teams that
          <span className="text-[#113858]/45">
            {" "}care about their identity.
          </span>
        </h2>

        <p
          className="
            mx-auto
            mt-5
            max-w-[520px]
            break-words
            text-[13px]
            leading-[1.75]
            text-[#607487]
            sm:text-[14px]
          "
        >
          Helping companies and teams bring their brand to life
          through thoughtfully customised corporate apparel.
        </p>
      </div>

      {/* ================================
          CLIENT MARQUEE TRACKS
      ================================= */}
      <ClientMarqueeRows isInView={isInView} />
    </section>
  );
}

export default TrustedBy;