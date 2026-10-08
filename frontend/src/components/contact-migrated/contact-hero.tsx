"use client";

export function ContactHero() {
  return (
    <section
      className="
        relative flex min-h-screen w-full flex-col justify-center
        overflow-hidden
        bg-[#F7F4EB]
        text-[#113858]
      "
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
        .editorial-script {
          font-family: 'Caveat', cursive, sans-serif;
        }
      `}</style>

      {/* Full-bleed hero image starting from absolute (0,0) and filling the whole tab */}
      <img
        src="/contact-hero-banner.jpg"
        alt="Cottson Corporate Wear: Bring Your Next Project to Life"
        className="
          pointer-events-none absolute inset-0
          h-full w-full
          object-cover object-bottom sm:object-right-bottom
        "
        loading="eager"
        decoding="async"
      />

      {/* Subtle responsive gradient overlay on mobile screens so text stays readable if image wraps */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-r from-[#F7F4EB]/95 via-[#F7F4EB]/80 to-transparent
          lg:hidden
        "
      />

      {/* Left Content Area floating above the background */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-[125px] pb-12 sm:px-10 sm:pt-[135px] sm:pb-16 lg:px-16 lg:pt-[140px] lg:pb-16 xl:px-20">
        <div className="max-w-[560px]">
          {/* Eyebrow */}
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-[#607487] sm:text-[13px]">
            LET&apos;S CONNECT
          </p>

          {/* Main Heading */}
          <h1 className="text-[38px] font-bold leading-[1.08] tracking-[-0.035em] text-[#113858] sm:text-[48px] lg:text-[54px] xl:text-[62px]">
            Bring Your Next
            <br />
            Corporate Wear Project{" "}
            <span className="editorial-script inline-block text-[46px] font-semibold leading-none text-[#113858] tracking-normal -rotate-[1deg] sm:text-[58px] lg:text-[66px] xl:text-[74px]">
              to Life.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="mt-6 mb-9 max-w-[460px] text-[15px] leading-[1.7] text-[#607487] sm:text-[16px] lg:text-[17px]">
            Let&apos;s bring your next corporate wear project to life. Talk to our team
            about your requirements and customisation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            {/* Primary Button */}
            <a
              href="mailto:contact@cottson.com"
              className="
                inline-flex h-[50px] items-center justify-center gap-2.5
                rounded-full bg-[#113858] px-8
                text-[13px] font-semibold uppercase tracking-[0.08em] text-white
                shadow-md transition-all duration-300
                hover:bg-[#0c2847] hover:shadow-lg hover:-translate-y-0.5
                active:translate-y-0 sm:text-[14px]
              "
            >
              <span>EMAIL US</span>
              <span className="text-[16px] leading-none">→</span>
            </a>

            {/* Secondary Button */}
            <a
              href="#query"
              className="
                inline-flex h-[50px] items-center justify-center
                rounded-full border border-[#113858]/35 bg-white
                px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#113858]
                shadow-xs transition-all duration-300
                hover:border-[#113858] hover:bg-[#FAF7F2] hover:shadow-sm
                hover:-translate-y-0.5 active:translate-y-0 sm:text-[14px]
              "
            >
              SEND A QUERY
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactHero;
