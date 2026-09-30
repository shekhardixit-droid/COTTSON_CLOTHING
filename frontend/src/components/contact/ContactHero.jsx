export default function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="/contacthero.png"
        alt="Contact Cottson"
        className="block min-h-[700px] w-full object-cover object-center sm:min-h-[700px]"
      />

      {/* Left Content */}
      <div className="absolute inset-0">
        <div className="mx-auto flex h-full w-full max-w-[1120px] items-center px-5 sm:px-8 lg:px-12">
          <div className="w-full max-w-[420px]">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <img
                src="/cottson_logo.png"
                alt="Cottson"
                className="h-auto w-[280px] sm:w-[360px] md:w-[400px] lg:w-[450px]"
              />
            </div>

            {/* Paragraph */}
            <p className="max-w-[390px] text-left text-[15px] leading-[1.7] tracking-[-0.01em] text-black sm:text-[16px] md:text-[17px]">
              Let&apos;s bring your next corporate wear project to life.
              <br />
              Talk to our team about your requirements and customisation.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:"
                className="
                  inline-flex h-[54px] w-full min-w-0 items-center justify-center
                  rounded-full
                  border border-white/50
                  bg-white/10 px-7
                  text-[13px] font-semibold uppercase tracking-[0.08em]
                  text-white
                  backdrop-blur-md
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-white
                  hover:bg-white
                  hover:text-[#113858]
                  sm:w-auto sm:min-w-[165px]
                "
              >
                Email Us
              </a>

              <a
                href="#query"
                className="
                  inline-flex h-[54px] w-full min-w-0 items-center justify-center
                  rounded-full
                  border border-white/50
                  bg-white/10 px-7
                  text-[13px] font-semibold uppercase tracking-[0.08em]
                  text-white
                  backdrop-blur-md
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-white
                  hover:bg-white
                  hover:text-[#113858]
                  sm:w-auto sm:min-w-[165px]
                "
              >
                Send a Query
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}