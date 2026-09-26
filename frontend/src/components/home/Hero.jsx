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
            relative z-20 mx-auto flex w-full max-w-[1400px]
            flex-col items-center gap-10
            lg:min-h-[560px] lg:flex-row lg:items-center lg:gap-6
          "
        >
          {/* LEFT CONTENT */}
          <div
            className="
              relative z-30 w-full max-w-[560px]
              text-center lg:ml-[4%] lg:text-left
            "
          >
            <h1
              className="
                text-[clamp(2rem,6vw,4.5rem)]
                font-semibold leading-[1.05]
                tracking-[-0.05em] text-[#113858]
              "
            >
              Dress your team.
              <br />
              <span className="text-[#113858]/50">Build your identity.</span>
            </h1>

            <p
              className="
                mx-auto mt-6 max-w-[500px]
                text-[clamp(13px,1.4vw,15px)]
                leading-[1.8] tracking-[-0.01em]
                text-[#607487]
                lg:mx-0
              "
            >
              Premium corporate apparel customised around your logo,
              colours and identity — made for companies, events and teams.
            </p>

            <div
              className="
                mt-8 flex flex-col items-center justify-center
                gap-3 sm:flex-row lg:justify-start
              "
            >
              <a
                href="#products"
                className="
                  group flex h-[46px] w-full min-w-[160px]
                  max-w-[260px] items-center justify-center gap-2
                  rounded-full border border-[#113858] bg-white
                  px-6 text-[12px] font-semibold tracking-[-0.01em]
                  text-[#113858] transition-all duration-300 ease-out
                  hover:-translate-y-[2px] hover:bg-[#113858] hover:text-white
                  hover:shadow-[0_8px_22px_rgba(17,56,88,0.14)]
                  active:translate-y-0 active:scale-[0.98]
                  sm:w-auto
                "
              >
                View Products
                <ArrowRight
                  size={14}
                  strokeWidth={2}
                  className="transition-transform duration-300 ease-out group-hover:translate-x-[4px]"
                />
              </a>

              <a
                href="#contact"
                className="
                  group flex h-[46px] w-full min-w-[160px]
                  max-w-[260px] items-center justify-center gap-2
                  rounded-full border border-[#113858] bg-white
                  px-6 text-[12px] font-semibold tracking-[-0.01em]
                  text-[#113858] transition-all duration-300 ease-out
                  hover:-translate-y-[2px] hover:bg-[#113858] hover:text-white
                  hover:shadow-[0_8px_22px_rgba(17,56,88,0.14)]
                  active:translate-y-0 active:scale-[0.98]
                  sm:w-auto
                "
              >
                <MessageCircle
                  size={15}
                  strokeWidth={2}
                  className="transition-transform duration-300 ease-out group-hover:scale-110"
                />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* RIGHT PRODUCT COMPOSITION (desktop only — original fixed positions/sizes kept as-is) */}
          <div className="absolute right-[3%] top-1/2 hidden h-[620px] w-[560px] -translate-y-1/2 lg:block xl:right-[5%]">
            {/* MAIN JACKET */}
            <a href="#products" className="group absolute right-[70px] top-[5px] z-20">
              <div className="relative">
                <div className="absolute bottom-[35px] left-1/2 h-[35px] w-[220px] -translate-x-1/2 rounded-full bg-[#113858]/10 blur-xl" />
                <img
                  src="jacket.png"
                  alt="Cottson corporate jacket"
                  decoding="async"
                  className="relative h-[390px] w-[360px] object-contain drop-shadow-[0_18px_20px_rgba(17,56,88,0.09)] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]"
                />
              </div>
            </a>

            {/* BOTTOM SHIRT */}
            <a href="#products" className="group absolute bottom-[25px] left-[30px] z-30">
              <div className="relative">
                <div className="absolute bottom-[25px] left-1/2 h-[28px] w-[170px] -translate-x-1/2 rounded-full bg-[#113858]/10 blur-xl" />
                <img
                  src="shirt.png"
                  alt="Cottson corporate shirt"
                  decoding="async"
                  className="relative h-[390px] w-[360px] object-contain drop-shadow-[0_18px_20px_rgba(17,56,88,0.08)] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:-rotate-1"
                />
              </div>
            </a>

            {/* BOTTOM POLO */}
            <a href="#products" className="group absolute bottom-[25px] -right-[60px] z-30">
              <div className="relative">
                <div className="absolute bottom-[25px] left-1/2 h-[28px] w-[170px] -translate-x-1/2 rounded-full bg-[#113858]/10 blur-xl" />
                <img
                  src="polo.png"
                  alt="Cottson custom polo"
                  decoding="async"
                  className="relative h-[390px] w-[360px] object-contain drop-shadow-[0_18px_20px_rgba(17,56,88,0.08)] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-1"
                />
              </div>
            </a>
          </div>

          {/* TABLET PRODUCT COMPOSITION (fills the md–lg gap, doesn't touch desktop) */}
          <div className="relative z-10 mx-auto hidden w-full max-w-[420px] md:grid md:grid-cols-3 md:items-end md:gap-2 lg:hidden">
            <img src="shirt.png" alt="Corporate shirt" decoding="async" className="h-auto max-h-[220px] w-full object-contain" />
            <img src="jacket.png" alt="Corporate jacket" decoding="async" className="h-auto max-h-[240px] w-full object-contain" />
            <img src="polo.png" alt="Corporate polo" decoding="async" className="h-auto max-h-[220px] w-full object-contain" />
          </div>

          {/* MOBILE PRODUCT COMPOSITION */}
          <div className="relative z-10 mx-auto grid w-full max-w-[500px] grid-cols-3 items-end gap-1 md:hidden">
            <img src="shirt.png" alt="Corporate shirt" decoding="async" className="h-auto max-h-[160px] w-full object-contain" />
            <img src="jacket.png" alt="Corporate jacket" decoding="async" className="h-auto max-h-[175px] w-full object-contain" />
            <img src="polo.png" alt="Corporate polo" decoding="async" className="h-auto max-h-[160px] w-full object-contain" />
          </div>
        </div>
      </section>

      {/* BENEFITS / TRUST STRIP */}
      <div className="mx-auto max-w-[1120px] px-5 pb-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-y border-[#113858]/10 py-4 sm:gap-x-10">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-2 whitespace-nowrap text-[10.5px] font-medium text-[#113858]/65"
            >
              <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full bg-[#113858] text-white">
                <Check size={9} strokeWidth={2.5} />
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