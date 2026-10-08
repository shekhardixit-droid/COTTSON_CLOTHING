"use client";

import Link from "next/link";

export function ClientsHero() {
  return (
    <section
      className="
        relative min-h-[85vh] w-full
        overflow-hidden
        bg-[#F8F4EC]
        px-6 pt-[105px] pb-16
        sm:px-10 sm:pt-[120px] sm:pb-20
        lg:px-16 lg:pt-[130px] lg:pb-24
        text-[#113858]
      "
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
        .editorial-script {
          font-family: 'Caveat', cursive, sans-serif;
        }
      `}</style>

      {/* Ambient warm watercolor texture wash in the background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 80% 30%, #F1E9DC 0%, #F8F4EC 55%, #F4ECE0 100%)",
        }}
      />

      {/* Soft background organic ambient blurs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -left-12 h-96 w-96 rounded-full bg-[#EFE6D8]/50 blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#EAE0D0]/40 blur-3xl -z-10"
      />

      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left Content Column */}
          <div className="z-10 lg:col-span-6 xl:col-span-5">
            {/* Eyebrow */}
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#607487] sm:text-[12px]">
              OUR CLIENTS
            </p>

            {/* Main Heading */}
            <h1 className="text-[38px] font-bold leading-[1.08] tracking-[-0.035em] text-[#113858] sm:text-[50px] lg:text-[54px] xl:text-[60px]">
              Trusted by teams
              <br />
              built to{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="editorial-script inline-block pr-1 text-[48px] font-semibold leading-none text-[#113858] tracking-normal -rotate-[1.5deg] sm:text-[64px] lg:text-[70px] xl:text-[78px]">
                  stand out.
                </span>
                {/* Hand-drawn Navy Brush Underline */}
                <svg
                  className="pointer-events-none absolute -bottom-2 left-0 h-[12px] w-full overflow-visible text-[#113858] sm:-bottom-3 sm:h-[16px]"
                  viewBox="0 0 240 18"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 4 11 C 35 6, 80 5, 130 7 C 175 8.5, 215 10.5, 236 9 C 215 13.5, 165 15.5, 115 14.5 C 65 13.5, 25 14.5, 4 11 Z"
                    fill="currentColor"
                  />
                  <path
                    d="M 10 13.5 C 60 11.5, 120 10.5, 185 11.5 C 215 12, 232 11.5, 238 10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 mb-8 max-w-[500px] text-[15px] leading-[1.7] text-[#55697d] sm:text-[16px]">
              From growing businesses to established organisations, we create corporate
              apparel that brings teams together and keeps every brand looking consistent.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <a
                href="#industries"
                className="
                  inline-flex h-[48px] items-center justify-center gap-2.5
                  rounded-full bg-[#113858] px-7 sm:px-8
                  text-[13px] sm:text-[14px] font-medium text-white
                  shadow-sm transition-all duration-300
                  hover:bg-[#0c2847] hover:shadow-md hover:translate-y-[-1px]
                  active:translate-y-0
                "
              >
                <span>Explore Our Clients</span>
                <span className="text-[16px] leading-none">→</span>
              </a>

              <Link
                href="/contact"
                className="
                  inline-flex h-[48px] items-center justify-center
                  rounded-full border border-[#113858]/35 bg-white
                  px-7 sm:px-8 text-[13px] sm:text-[14px] font-medium text-[#113858]
                  shadow-xs transition-all duration-300
                  hover:border-[#113858] hover:bg-[#FAF7F2] hover:shadow-sm
                  hover:translate-y-[-1px] active:translate-y-0
                "
              >
                Work With Us
              </Link>
            </div>
          </div>

          {/* Right Artistic Collage Column */}
          <div className="flex items-center justify-center lg:col-span-6 lg:justify-end xl:col-span-7">
            <div className="relative w-full max-w-[540px] sm:max-w-[600px] lg:max-w-[680px]">
              <img
                src="/images/clients/clients-hero-collage.jpg"
                alt="Cottson craftsmanship: tailoring pattern drafting, polo technical sketch, and attention to detail"
                className="
                  h-auto w-full object-contain
                  transition-transform duration-700
                  hover:scale-[1.015]
                "
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientsHero;
