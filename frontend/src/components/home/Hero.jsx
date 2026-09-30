import {
  ArrowRight,
  Check,
  MessageCircle,
} from "lucide-react";

const benefits = [
  "Low MOQ: 25 Pcs",
  "Custom Branding",
  "Bulk Orders",
  "Pan-India Delivery",
];

function Hero() {
  return (
    <main id="home" className="relative bg-white overflow-hidden">
      <section
        className="
          relative mx-auto w-full max-w-[1600px]
          px-4 pb-6 pt-[84px]
          sm:px-6 sm:pb-8 sm:pt-[96px]
          md:px-8 md:pt-[106px]
          lg:min-h-[640px] lg:px-8 lg:pt-[125px] lg:pb-12
          xl:min-h-[680px] xl:px-10 xl:pt-[135px]
          2xl:min-h-[720px] 2xl:pt-[140px]
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
              DESKTOP LEFT — CUSTOM CLIENT SHOWCASE
              Overlapping 3D cluster (DOMS, ICICI, TVS)
          ===================================================== */}
          <div
            className="
              pointer-events-none absolute left-[-6%] top-1/2
              hidden h-[620px] w-[560px]
              -translate-y-1/2 origin-left
              lg:block
              lg:scale-[0.60] lg:left-[-70px]
              xl:scale-[0.78] xl:left-[-35px]
              2xl:scale-[0.95] 2xl:left-[-15px]
            "
          >
            {/* TOP SHIRT — DOMS */}
            <a
              href="#products"
              className="
                pointer-events-auto group absolute
                left-[70px] top-[5px]
                z-20
              "
              title="DOMS Corporate Formal Shirt"
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
                  src="/client-doms.png"
                  alt="Custom DOMS corporate shirt"
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

            {/* BOTTOM LEFT — ICICI POLO */}
            <a
              href="#products"
              className="
                pointer-events-auto group absolute
                bottom-[25px] -left-[40px]
                z-30
              "
              title="ICICI Bank Custom Pique Polo"
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
                  src="/client-icici.png"
                  alt="Custom ICICI Bank polo"
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

            {/* BOTTOM RIGHT — TVS SHIRT */}
            <a
              href="#products"
              className="
                pointer-events-auto group absolute
                bottom-[25px] right-[40px]
                z-30
              "
              title="TVS Motors Executive Formal Shirt"
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
                  src="/client-tvs.png"
                  alt="Custom TVS company shirt"
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
              Enterprise Clients (DOMS · ICICI · TVS)
            </div>
          </div>


          {/* =====================================================
              CENTER — MAIN HERO CONTENT
          ===================================================== */}
          <div
            className="
              relative z-50
              flex w-full
              flex-col items-center
              px-2 text-center
              sm:px-4
              lg:absolute lg:left-1/2 lg:top-1/2
              lg:-translate-x-1/2 lg:-translate-y-1/2
              lg:max-w-[420px]
              xl:max-w-[530px]
              2xl:max-w-[620px]
            "
          >
            {/* Eyebrow */}
            <p
              className="
                mb-3
                text-[10px] sm:text-[11px]
                font-bold
                uppercase
                tracking-[0.24em]
                text-[#113858]/55
              "
            >
              Custom Apparel for Teams
            </p>

            {/* Main Heading */}
            <h1
              className="
                text-[32px] sm:text-[42px]
                md:text-[48px]
                lg:text-[38px]
                xl:text-[48px]
                2xl:text-[56px]
                font-semibold
                leading-[0.98]
                tracking-[-0.05em]
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
                mx-auto mt-4 sm:mt-5
                max-w-[480px]
                text-[13px] sm:text-[14.5px]
                leading-relaxed
                text-[#607487]
              "
            >
              Custom clothing for companies, teams and events —
              from branded T-shirts to shirts, polos and jackets.
            </p>

            {/* Buttons */}
            <div
              className="
                mt-6 sm:mt-7
                flex w-full
                flex-row
                items-center
                justify-center
                gap-2.5 sm:gap-3.5
                max-w-[340px] sm:max-w-none
              "
            >
              {/* View Products */}
              <a
                href="#products"
                className="
                  group flex h-[44px] sm:h-[46px]
                  flex-1 sm:flex-initial
                  min-w-[135px] sm:min-w-[160px]
                  items-center justify-center
                  gap-2
                  rounded-full
                  bg-[#113858]
                  px-5 sm:px-6
                  text-[12px]
                  font-semibold
                  text-white
                  shadow-[0_4px_16px_rgba(17,56,88,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-[2px]
                  hover:shadow-[0_8px_22px_rgba(17,56,88,0.22)]
                  active:scale-[0.98]
                "
              >
                <span>View Products</span>
                <ArrowRight
                  size={14}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-[4px]"
                />
              </a>

              {/* WhatsApp */}
              <a
                href="#contact"
                className="
                  group flex h-[44px] sm:h-[46px]
                  flex-1 sm:flex-initial
                  min-w-[135px] sm:min-w-[160px]
                  items-center justify-center
                  gap-2
                  rounded-full
                  border border-[#113858]
                  bg-white
                  px-5 sm:px-6
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
                "
              >
                <MessageCircle
                  size={15}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>


          {/* =====================================================
              DESKTOP RIGHT — COTTSON ORIGINALS
              Overlapping 3D cluster (Jacket, Shirt, Polo)
          ===================================================== */}
          <div
            className="
              pointer-events-none absolute right-[-6%] top-1/2
              hidden h-[620px] w-[560px]
              -translate-y-1/2 origin-right
              lg:block
              lg:scale-[0.60] lg:right-[-70px]
              xl:scale-[0.78] xl:right-[-35px]
              2xl:scale-[0.95] 2xl:right-[-15px]
            "
          >
            {/* MAIN JACKET */}
            <a
              href="#products"
              className="
                pointer-events-auto group absolute
                right-[70px] top-[5px]
                z-20
              "
              title="Cottson Corporate Bomber Jacket"
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
                pointer-events-auto group absolute
                bottom-[25px] left-[30px]
                z-30
              "
              title="Cottson Tailored Oxford Shirt"
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
                pointer-events-auto group absolute
                bottom-[25px] -right-[60px]
                z-30
              "
              title="Cottson Signature Tipped Polo"
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

            {/* Label */}
            <div
              className="
                absolute bottom-[5px] right-[15px]
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
              Cottson Originals (Polo · Shirt · Jacket)
            </div>
          </div>


          {/* =====================================================
              PHONE & TABLET (< 1024px) — DUAL OVERLAPPING CLUSTERS
              Both Enterprise Clients & Cottson Originals clusters
              presented side-by-side with 3D overlapping depth!
          ===================================================== */}
          <div className="relative z-20 mt-6 sm:mt-8 w-full max-w-[560px] mx-auto lg:hidden">
            <div className="grid grid-cols-2 gap-2 sm:gap-4 items-end">
              
              {/* LEFT CLUSTER: ENTERPRISE CLIENTS (DOMS, ICICI, TVS) */}
              <a
                href="#products"
                className="group relative flex flex-col items-center justify-end rounded-2xl bg-gradient-to-b from-slate-50/70 to-white/95 border border-slate-200/80 p-1.5 sm:p-3 pb-2.5 sm:pb-3 shadow-[0_6px_18px_rgba(17,56,88,0.06)] overflow-visible transition-transform duration-300 hover:-translate-y-1"
                title="Enterprise Clients (DOMS · ICICI · TVS)"
              >
                {/* 3 Overlapping Garments Container */}
                <div className="relative h-[150px] sm:h-[190px] w-full flex items-end justify-center">
                  {/* TOP: DOMS */}
                  <div className="absolute top-[2px] left-1/2 -translate-x-1/2 z-10 w-[95px] sm:w-[130px]">
                    <div className="absolute bottom-[8px] left-1/2 h-[12px] w-[75px] -translate-x-1/2 rounded-full bg-[#113858]/10 blur-md" />
                    <img
                      src="/client-doms.png"
                      alt="Custom DOMS corporate shirt"
                      className="h-[100px] sm:h-[135px] w-full object-contain drop-shadow-[0_10px_14px_rgba(17,56,88,0.10)]"
                    />
                  </div>

                  {/* BOTTOM LEFT: ICICI */}
                  <div className="absolute bottom-[2px] -left-[10px] sm:left-[-4px] z-20 w-[90px] sm:w-[125px]">
                    <div className="absolute bottom-[6px] left-1/2 h-[10px] w-[70px] -translate-x-1/2 rounded-full bg-[#113858]/10 blur-md" />
                    <img
                      src="/client-icici.png"
                      alt="Custom ICICI Bank polo"
                      className="h-[92px] sm:h-[125px] w-full object-contain drop-shadow-[0_10px_14px_rgba(17,56,88,0.12)]"
                    />
                  </div>

                  {/* BOTTOM RIGHT: TVS */}
                  <div className="absolute bottom-[2px] -right-[10px] sm:right-[-4px] z-20 w-[90px] sm:w-[125px]">
                    <div className="absolute bottom-[6px] left-1/2 h-[10px] w-[70px] -translate-x-1/2 rounded-full bg-[#113858]/10 blur-md" />
                    <img
                      src="/client-tvs.png"
                      alt="Custom TVS company shirt"
                      className="h-[92px] sm:h-[125px] w-full object-contain drop-shadow-[0_10px_14px_rgba(17,56,88,0.12)]"
                    />
                  </div>
                </div>

                {/* Pill Badge */}
                <div className="mt-2 z-30 whitespace-nowrap rounded-full border border-[#113858]/10 bg-white px-2 sm:px-3 py-0.5 sm:py-1 text-[7px] sm:text-[9.5px] font-bold uppercase tracking-wider text-[#113858] shadow-sm">
                  <span className="sm:hidden">Clients (DOMS · ICICI · TVS)</span>
                  <span className="hidden sm:inline">Enterprise Clients (DOMS · ICICI · TVS)</span>
                </div>
              </a>


              {/* RIGHT CLUSTER: COTTSON ORIGINALS (JACKET, SHIRT, POLO) */}
              <a
                href="#products"
                className="group relative flex flex-col items-center justify-end rounded-2xl bg-gradient-to-b from-slate-50/70 to-white/95 border border-slate-200/80 p-1.5 sm:p-3 pb-2.5 sm:pb-3 shadow-[0_6px_18px_rgba(17,56,88,0.06)] overflow-visible transition-transform duration-300 hover:-translate-y-1"
                title="Cottson Originals (Polo · Shirt · Jacket)"
              >
                {/* 3 Overlapping Garments Container */}
                <div className="relative h-[150px] sm:h-[190px] w-full flex items-end justify-center">
                  {/* TOP: JACKET */}
                  <div className="absolute top-[2px] left-1/2 -translate-x-1/2 z-10 w-[95px] sm:w-[130px]">
                    <div className="absolute bottom-[8px] left-1/2 h-[12px] w-[75px] -translate-x-1/2 rounded-full bg-[#113858]/10 blur-md" />
                    <img
                      src="jacket.png"
                      alt="Cottson corporate jacket"
                      className="h-[100px] sm:h-[135px] w-full object-contain drop-shadow-[0_10px_14px_rgba(17,56,88,0.10)]"
                    />
                  </div>

                  {/* BOTTOM LEFT: SHIRT */}
                  <div className="absolute bottom-[2px] -left-[10px] sm:left-[-4px] z-20 w-[90px] sm:w-[125px]">
                    <div className="absolute bottom-[6px] left-1/2 h-[10px] w-[70px] -translate-x-1/2 rounded-full bg-[#113858]/10 blur-md" />
                    <img
                      src="shirt.png"
                      alt="Cottson corporate shirt"
                      className="h-[92px] sm:h-[125px] w-full object-contain drop-shadow-[0_10px_14px_rgba(17,56,88,0.12)]"
                    />
                  </div>

                  {/* BOTTOM RIGHT: POLO */}
                  <div className="absolute bottom-[2px] -right-[10px] sm:right-[-4px] z-20 w-[90px] sm:w-[125px]">
                    <div className="absolute bottom-[6px] left-1/2 h-[10px] w-[70px] -translate-x-1/2 rounded-full bg-[#113858]/10 blur-md" />
                    <img
                      src="polo.png"
                      alt="Cottson custom polo"
                      className="h-[92px] sm:h-[125px] w-full object-contain drop-shadow-[0_10px_14px_rgba(17,56,88,0.12)]"
                    />
                  </div>
                </div>

                {/* Pill Badge */}
                <div className="mt-2 z-30 whitespace-nowrap rounded-full border border-[#113858]/10 bg-white px-2 sm:px-3 py-0.5 sm:py-1 text-[7px] sm:text-[9.5px] font-bold uppercase tracking-wider text-[#113858] shadow-sm">
                  <span className="sm:hidden">Cottson (Polo · Shirt · Jacket)</span>
                  <span className="hidden sm:inline">Cottson Originals (Polo · Shirt · Jacket)</span>
                </div>
              </a>

            </div>
          </div>

        </div>
      </section>


      {/* =====================================================
          BENEFITS / TRUST STRIP
      ===================================================== */}
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 pb-8">
        <div
          className="
            flex flex-wrap
            items-center justify-center
            gap-x-5 gap-y-2.5
            border-y border-[#113858]/10
            py-3.5 sm:py-4
            sm:gap-x-10
          "
        >
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="
                flex items-center gap-1.5 sm:gap-2
                whitespace-nowrap
                text-[10px] sm:text-[11.5px]
                font-medium
                text-[#113858]/75
              "
            >
              <span
                className="
                  flex h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]
                  shrink-0 items-center
                  justify-center
                  rounded-full
                  bg-[#113858]
                  text-white
                "
              >
                <Check
                  size={10}
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