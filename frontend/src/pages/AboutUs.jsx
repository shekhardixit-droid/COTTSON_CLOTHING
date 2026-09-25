import {
  ArrowRight,
  Eye,
  Target,
  Award,
  Wrench,
  Users,
  Heart,
  Building2,
  Clock3,
  Boxes,
  PackageCheck,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import {
  CLIENTS_JSON_URL,
  initialTopClients,
  initialBottomClients,
} from "../data/cottsonClients";

/* =========================================================
   HISTORICAL CONTENT
========================================================= */

const historicalImages = [
  {
    src: "https://res.cloudinary.com/tpxo8m6a/image/upload/v1790315520/Mill_Worker.avif",
    alt: "Mill worker",
  },
  {
    src: "https://res.cloudinary.com/tpxo8m6a/image/upload/v1790315513/Bombay_Dyeing_Mills_Image.avif",
    alt: "Bombay Dyeing Mills",
  },
  {
    src: "https://res.cloudinary.com/tpxo8m6a/image/upload/v1790315529/Mills_of_Bombay.avif",
    alt: "Mills of Bombay",
  },
  {
    src: "https://res.cloudinary.com/tpxo8m6a/image/upload/v1790315506/Apollo_Bunder_Image.avif",
    alt: "Apollo Bunder",
  },
];

const storyParagraphs = [
  "Our story traces back to March 1956, when the founder's great-grandfather arrived in Bombay and began his career at Apollo Mills. His dedication and skill helped him rise through the ranks, eventually contributing to other iconic textile mills such as Kamala Mills and Bombay Textiles. This formative era marked the true beginning of our family's connection to fabric, craftsmanship, and the world of cotton. A legacy rooted in hard work and textile expertise began here.",
  "In August 2021, inspired by the growing wave of e-commerce in India, Bacoola Apparels was launched with a vision to build a strong D2C clothing brand. The brand quickly gained momentum and successfully sold premium apparel across leading marketplaces, including Amazon, Flipkart, Peachmode, and others.",
  "By December 2021, corporate inquiries started pouring in. Clients appreciated the distinctive quality that Bacoola Apparels offered, which matched premium retail standards. When the same craftsmanship was extended to corporate wear and event merchandise, demand grew rapidly, signalling a new opportunity.",
  "May 2022 marked the official launch of Cottson Clothing as a dedicated brand to serve the corporate clothing and uniform segment. This new identity allowed us to create a specialised category separate from retail, focused solely on delivering high-quality, custom-made corporate apparel.",
  "By August 2025, Cottson Clothing expanded to a strong team of more than 80 members, proudly serving over 100 clients across India. What began as a family legacy in textile craftsmanship has now evolved into a trusted national brand known for quality, consistency, and customer-first service.",
];

/* =========================================================
   SHORT REELS / VIDEOS — 7 videos in a marquee
========================================================= */

const reelVideos = [
  "https://res.cloudinary.com/tpxo8m6a/video/upload/v1790330914/IMG_6707.mp4",
  "https://res.cloudinary.com/tpxo8m6a/video/upload/v1790330941/IMG_5084.mp4",
  "https://res.cloudinary.com/tpxo8m6a/video/upload/v1790330971/IMG_3062.mp4",
  "https://res.cloudinary.com/tpxo8m6a/video/upload/v1790330952/IMG_3583.mp4",
  "https://res.cloudinary.com/tpxo8m6a/video/upload/v1790330928/IMG_5118.mp4",
  "https://res.cloudinary.com/tpxo8m6a/video/upload/v1790330904/IMG_6650.mp4",
  "https://res.cloudinary.com/tpxo8m6a/video/upload/v1790330596/BRAND_PROCESS.mp4",
];

/* =========================================================
   EDITABLE STATS
========================================================= */

const stats = [
  {
    id: 1,
    icon: Clock3,
    value: "1956",
    label: "The beginning of our textile legacy",
  },
  {
    id: 2,
    icon: Users,
    value: "80+",
    label: "Team members",
  },
  {
    id: 3,
    icon: Building2,
    value: "100+",
    label: "Clients across India",
  },
  {
    id: 4,
    icon: Boxes,
    value: "2022",
    label: "Cottson Clothing launched",
  },
];

const uniquePoints = [
  {
    id: 1,
    icon: Award,
    title: "Premium Quality",
    description:
      "High-quality corporate apparel built around premium standards.",
  },
  {
    id: 2,
    icon: Wrench,
    title: "Custom Manufacturing",
    description:
      "Made-to-order clothing tailored to each corporate requirement.",
  },
  {
    id: 3,
    icon: PackageCheck,
    title: "Consistent Craftsmanship",
    description:
      "A textile legacy carried forward through dependable workmanship.",
  },
  {
    id: 4,
    icon: Heart,
    title: "Customer First",
    description:
      "A service-led approach focused on long-term client relationships.",
  },
];



/* =========================================================
   EYEBROW PILL — re-usable pattern matching homepage
========================================================= */

function EyebrowPill({ text }) {
  return (
    <div
      className="
        mb-5
        inline-flex
        items-center
        gap-2

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
        {text}
      </span>
    </div>
  );
}

/* =========================================================
   ANIMATED COUNTER — counts up when visible
========================================================= */

function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const numericMatch = value.match(/^(\d+)/);
    if (!numericMatch) {
      setDisplay(value);
      return;
    }

    const target = parseInt(numericMatch[1], 10);
    const suffix = value.slice(numericMatch[1].length);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1800;
          const startTime = performance.now();

          function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.floor(eased * target);
            setDisplay(`${start}${suffix}`);
            if (progress < 1) requestAnimationFrame(step);
          }

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

/* =========================================================
   SECTION 1 — HOW IT ALL BEGAN & WHO WE ARE
========================================================= */

const storyMilestones = [
  {
    period: "March 1956",
    tag: "Textile Roots",
    title: "A Legacy Born in Bombay's Iconic Cotton Mills",
    body: storyParagraphs[0],
    highlight: "Apollo Mills · Kamala Mills · Bombay Textiles",
  },
  {
    period: "August 2021",
    tag: "Digital Genesis",
    title: "Bacoola Apparels & The D2C Inception",
    body: storyParagraphs[1],
    highlight: "Amazon · Flipkart · Peachmode · Nationwide Retail",
  },
  {
    period: "December 2021",
    tag: "The Corporate Turning Point",
    title: "Enterprise Demand for Retail-Grade Workwear",
    body: storyParagraphs[2],
    highlight: "Custom corporate apparel · Event merchandise",
  },
  {
    period: "May 2022",
    tag: "Brand Launch",
    title: "Cottson Clothing Officially Born",
    body: storyParagraphs[3],
    highlight: "Dedicated corporate clothing & uniform manufacturing",
  },
  {
    period: "August 2025 & Beyond",
    tag: "National Scale",
    title: "80+ Team Members · 100+ Enterprise Clients",
    body: storyParagraphs[4],
    highlight: "Pan-India presence · Customer-first craftsmanship",
  },
];

const archivalCaptions = [
  "Apollo Mills Weaver, Bombay 1956",
  "Bombay Dyeing Mills Complex",
  "The Historic Mills of Bombay",
  "Apollo Bunder & Gateway Harbour",
];

function HowItAllBegan() {
  return (
    <section className="bg-white py-20 md:py-24 lg:py-28">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-6 lg:px-8">

        {/* =====================================================
            1. SECTION HEADER
        ====================================================== */}
        <div className="mx-auto mb-16 max-w-[820px] text-center md:mb-20">
          <EyebrowPill text="Our heritage · Est. 1956" />

          <h2
            className="
              text-[36px] font-semibold leading-[1.08]
              tracking-[-0.045em] text-[#113858]
              sm:text-[46px] lg:text-[54px]
            "
          >
            How It All Began
            <span className="block text-[#113858]/40">
              The Cottson Story
            </span>
          </h2>

          <p
            className="
              mx-auto mt-5 max-w-[620px]
              text-[13.5px] leading-[1.8] text-[#607487]
              sm:text-[14.5px]
            "
          >
            Seven decades of textile mastery, passed down through generations
            and reimagined for modern corporate India.
          </p>
        </div>

        {/* =====================================================
            2. "FROM BOMBAY TO MUMBAI" + ARCHIVAL MOSAIC
        ====================================================== */}
        <div className="mb-24 grid gap-6 lg:grid-cols-12 lg:gap-7">

          {/* LEFT: FROM BOMBAY TO MUMBAI FEATURE CARD */}
          <div
            className="
              relative flex flex-col justify-between overflow-hidden
              rounded-[28px] bg-[#113858] p-8 text-white
              sm:rounded-[32px] sm:p-10 lg:col-span-5 lg:p-12
            "
          >
            {/* Ambient decorative circles */}
            <div
              className="
                pointer-events-none absolute -right-20 -top-20
                h-72 w-72 rounded-full border border-white/[0.08]
              "
            />
            <div
              className="
                pointer-events-none absolute -bottom-16 -left-16
                h-60 w-60 rounded-full border border-white/[0.06]
              "
            />

            <div className="relative z-10">
              {/* Badge */}
              <div
                className="
                  mb-6 inline-flex items-center gap-2
                  rounded-full border border-white/20
                  bg-white/10 px-3.5 py-[6px] backdrop-blur-sm
                "
              >
                <span className="h-[6px] w-[6px] rounded-full bg-white" />
                <span
                  className="
                    text-[9px] font-semibold uppercase
                    tracking-[0.2em] text-white/80
                  "
                >
                  From Bombay to Mumbai
                </span>
              </div>

              <h3
                className="
                  text-[30px] font-semibold leading-[1.12]
                  tracking-[-0.04em] text-white
                  sm:text-[36px]
                "
              >
                From Bombay
                <br />
                <span className="text-white/50">to Mumbai</span>
              </h3>

              <p
                className="
                  mt-5 text-[13.5px] leading-[1.85] text-white/70
                  sm:text-[14px]
                "
              >
                Rooted in textile mastery since 1956, Cottson Clothing has
                evolved into a premier high-end corporate manufacturer. Since
                our rebranding in 2021, we have redefined professional attire
                for the modern executive.
              </p>
            </div>

            {/* Bottom highlights strip */}
            <div
              className="
                relative z-10 mt-10 grid grid-cols-3 gap-3
                border-t border-white/15 pt-6
              "
            >
              <div>
                <span className="block text-[22px] font-semibold leading-tight tracking-tight text-white sm:text-[26px]">
                  1956
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-wider text-white/50">
                  Loom Legacy
                </span>
              </div>

              <div>
                <span className="block text-[22px] font-semibold leading-tight tracking-tight text-white sm:text-[26px]">
                  80+
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-wider text-white/50">
                  Team Members
                </span>
              </div>

              <div>
                <span className="block text-[22px] font-semibold leading-tight tracking-tight text-white sm:text-[26px]">
                  100+
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-wider text-white/50">
                  Enterprises
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: 4 HISTORICAL IMAGES IN A CURATED 2x2 GALLERY */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-7">
            {historicalImages.map((image, index) => (
              <div
                key={index}
                className="
                  group relative aspect-[4/3] overflow-hidden
                  rounded-[22px] border border-[#113858]/10
                  bg-[#F5F8FA] sm:rounded-[26px]
                "
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="
                    h-full w-full object-cover
                    transition-all duration-700 ease-out
                    group-hover:scale-[1.05]
                  "
                  loading="lazy"
                  decoding="async"
                />

                {/* Subtle gradient vignette on bottom */}
                <div
                  className="
                    pointer-events-none absolute inset-x-0 bottom-0
                    h-24 bg-gradient-to-t from-[#113858]/80 via-[#113858]/30 to-transparent
                    transition-opacity duration-300
                  "
                />

                {/* Archival caption label */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 sm:bottom-4 sm:left-4 sm:right-4">
                  <p
                    className="
                      truncate text-[11px] font-medium tracking-wide
                      text-white/90 drop-shadow-sm sm:text-[12px]
                    "
                  >
                    {archivalCaptions[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* =====================================================
            3. "WHO WE ARE, WHERE WE CAME FROM..." CHAPTER TIMELINE
        ====================================================== */}
        <div
          className="
            border-t border-[#113858]/10 pt-16
            md:pt-20 lg:pt-24
          "
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

            {/* STICKY LEFT COLUMN */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <EyebrowPill text="Our Evolution" />

                <h2
                  className="
                    text-[32px] font-semibold leading-[1.1]
                    tracking-[-0.045em] text-[#113858]
                    sm:text-[40px] lg:text-[46px]
                  </h2>
                "
                >
                  Who We Are,
                  <br />
                  <span className="text-[#113858]/40">
                    Where We Came From,
                  </span>
                  <br />
                  and Where
                  <br />
                  <span className="text-[#113858]/40">
                    We're Headed!
                  </span>
                </h2>

                <p
                  className="
                    mt-6 max-w-sm text-[13px] leading-[1.75]
                    text-[#607487] sm:text-[14px]
                  "
                >
                  Follow the milestones that transformed an authentic 1956
                  Bombay textile legacy into India's premier corporate clothing manufacturer.
                </p>

                {/* Quote Card */}
                <div
                  className="
                    mt-8 rounded-[22px] border border-[#113858]/10
                    bg-[#F5F8FA] p-6
                  "
                >
                  <p
                    className="
                      text-[12.5px] italic leading-[1.7] text-[#113858]/80
                    "
                  >
                    "What began as a family legacy in textile craftsmanship has
                    evolved into a national brand known for quality, consistency,
                    and customer-first service."
                  </p>
                  <span
                    className="
                      mt-3 block text-[10px] font-semibold uppercase
                      tracking-[0.16em] text-[#113858]/50
                    "
                  >
                    — The Cottson Story
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 5 STRUCTURED CHAPTER CARDS */}
            <div className="space-y-5 lg:col-span-8">
              {storyMilestones.map((item, index) => (
                <article
                  key={index}
                  className="
                    group relative overflow-hidden rounded-[24px]
                    border border-[#113858]/[0.08] bg-[#F5F8FA]
                    p-7 transition-all duration-300
                    hover:-translate-y-1 hover:border-[#113858]/20
                    hover:bg-white hover:shadow-[0_12px_36px_rgba(17,56,88,0.06)]
                    sm:rounded-[28px] sm:p-9
                  "
                >
                  {/* Top Bar: Step Number + Year Pill + Tag */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="
                          flex h-8 w-8 items-center justify-center
                          rounded-full bg-[#113858] text-[11px]
                          font-semibold text-white transition-transform
                          duration-300 group-hover:scale-105
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className="
                          text-[13px] font-semibold tracking-tight
                          text-[#113858] sm:text-[14px]
                        "
                      >
                        {item.period}
                      </span>
                    </div>

                    <span
                      className="
                        rounded-full border border-[#113858]/10
                        bg-white px-3 py-1 text-[10px] font-semibold
                        uppercase tracking-wider text-[#113858]/60
                      "
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      mb-3 text-[19px] font-semibold leading-[1.3]
                      tracking-[-0.03em] text-[#113858]
                      sm:text-[21px]
                    "
                  >
                    {item.title}
                  </h3>

                  {/* Body Paragraph */}
                  <p
                    className="
                      text-[13.5px] leading-[1.8] text-[#607487]
                      sm:text-[14px]
                    "
                  >
                    {item.body}
                  </p>

                  {/* Highlight Footer Pill */}
                  <div className="mt-5 border-t border-[#113858]/[0.08] pt-4">
                    <span
                      className="
                        inline-flex items-center gap-1.5 text-[11px]
                        font-medium text-[#113858]/70
                      "
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#113858]/40" />
                      {item.highlight}
                    </span>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   SECTION 2 — REELS / SHORT VIDEOS
========================================================= */

function AboutReels() {
  const doubled = [...reelVideos, ...reelVideos];

  return (
    <section className="overflow-hidden bg-[#F5F8FA] py-20 md:py-24 lg:py-28">
      {/* HEADER */}
      <div className="mx-auto mb-12 max-w-[1380px] px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <EyebrowPill text="Behind the scenes" />
            <h2
              className="
                text-[34px] font-semibold leading-[1.08]
                tracking-[-0.045em] text-[#113858]
                sm:text-[42px] lg:text-[48px]
              "
            >
              Our Story
              <br />
              <span className="text-[#113858]/45">in Motion</span>
            </h2>
          </div>

          <p
            className="
              max-w-sm text-[13px] leading-[1.75] text-[#607487]
              sm:text-right sm:text-[14px]
            "
          >
            A closer look at the people, process, craftsmanship, and world
            behind Cottson Clothing.
          </p>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="relative">

        <div
          className="flex w-max gap-4 will-change-transform"
          style={{
            animation: "reelMarquee 45s linear infinite",
          }}
        >
          {doubled.map((video, index) => (
            <div
              key={index}
              className="
                group relative
                aspect-[9/16] w-[260px] shrink-0
                overflow-hidden rounded-[24px]
                border border-[#113858]/[0.08]
                bg-white
                sm:w-[280px] sm:rounded-[28px]
              "
            >
              <video
                src={video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="
                  h-full w-full object-cover
                  transition-transform duration-700 ease-out
                  group-hover:scale-[1.04]
                "
              />
              <div
                className="
                  pointer-events-none absolute inset-x-0 bottom-0
                  h-28 bg-gradient-to-t from-[#113858]/25 to-transparent
                  opacity-0 transition-opacity duration-500
                  group-hover:opacity-100
                "
              />
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes reelMarquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  );
}

/* =========================================================
   SECTION 3 — VISION & MISSION
========================================================= */

function VisionMission() {
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
        {/* SECTION HEADER */}
        <div
          className="
            mx-auto
            mb-12
            max-w-[760px]
            text-center

            md:mb-14
          "
        >
          <EyebrowPill text="What drives us" />

          <h2
            className="
              text-[34px]
              font-semibold
              leading-[1.08]
              tracking-[-0.045em]
              text-[#113858]

              sm:text-[42px]
              lg:text-[48px]
            "
          >
            Our Vision
            <span className="text-[#113858]/45"> & Mission</span>
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
            The principles that guide every garment we create and every
            relationship we build.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid gap-5 lg:grid-cols-2">
          {/* VISION */}
          <div
            className="
              group
              overflow-hidden
              rounded-[24px]

              border
              border-[#113858]/[0.08]

              bg-[#F5F8FA]

              transition-all
              duration-300

              hover:-translate-y-[3px]
              hover:border-[#113858]/15
              hover:bg-white
              hover:shadow-[0_14px_40px_rgba(17,56,88,0.08)]

              sm:rounded-[28px]
            "
          >
            <div className="flex items-center p-8 sm:p-10 lg:p-14">
              <div className="max-w-xl">
                <div
                  className="
                    mb-6
                    flex
                    h-[48px]
                    w-[48px]
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
                  <Eye size={20} strokeWidth={1.8} />
                </div>

                <p
                  className="
                    mb-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#113858]/40
                  "
                >
                  01 / Our Vision
                </p>

                <h3
                  className="
                    mb-5

                    text-[28px]
                    font-semibold
                    leading-[1.08]
                    tracking-[-0.045em]
                    text-[#113858]

                    sm:text-[34px]
                    lg:text-[40px]
                  "
                >
                  Our Vision
                </h3>

                <p
                  className="
                    text-[13.5px]
                    leading-[1.8]
                    text-[#607487]

                    sm:text-[14px]
                  "
                >
                  To redefine professional attire for the modern executive
                  through thoughtful design, dependable craftsmanship, and a
                  premium clothing experience.
                </p>
              </div>
            </div>
          </div>

          {/* MISSION */}
          <div
            className="
              group
              overflow-hidden
              rounded-[24px]

              border
              border-[#113858]/[0.08]

              bg-[#F5F8FA]

              transition-all
              duration-300

              hover:-translate-y-[3px]
              hover:border-[#113858]/15
              hover:bg-white
              hover:shadow-[0_14px_40px_rgba(17,56,88,0.08)]

              sm:rounded-[28px]
            "
          >
            <div className="flex items-center p-8 sm:p-10 lg:p-14">
              <div className="max-w-xl">
                <div
                  className="
                    mb-6
                    flex
                    h-[48px]
                    w-[48px]
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
                  <Target size={20} strokeWidth={1.8} />
                </div>

                <p
                  className="
                    mb-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#113858]/40
                  "
                >
                  02 / Our Mission
                </p>

                <h3
                  className="
                    mb-5

                    text-[28px]
                    font-semibold
                    leading-[1.08]
                    tracking-[-0.045em]
                    text-[#113858]

                    sm:text-[34px]
                    lg:text-[40px]
                  "
                >
                  Our Mission
                </h3>

                <p
                  className="
                    text-[13.5px]
                    leading-[1.8]
                    text-[#607487]

                    sm:text-[14px]
                  "
                >
                  To deliver high-quality, custom-made corporate apparel while
                  building lasting relationships through consistency, service,
                  and textile expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 4 — STATS ABOUT US
========================================================= */

function AboutStats() {
  return (
    <section
      className="
        bg-[#F5F8FA]
        px-5
        py-20

        sm:px-6
        md:py-24
        lg:px-8
        lg:py-28
      "
    >
      <div className="mx-auto max-w-[1380px]">
        {/* HEADER */}
        <div
          className="
            mx-auto
            mb-12
            max-w-[760px]
            text-center

            md:mb-14
          "
        >
          <EyebrowPill text="Our journey" />

          <h2
            className="
              text-[34px]
              font-semibold
              leading-[1.08]
              tracking-[-0.045em]
              text-[#113858]

              sm:text-[42px]
              lg:text-[48px]
            "
          >
            Stats
            <span className="text-[#113858]/45"> About Us</span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[520px]

              text-[13px]
              leading-[1.75]
              text-[#607487]

              sm:text-[14px]
            "
          >
            Key milestones and numbers that define
            our growth and commitment to quality.
          </p>
        </div>

        {/* STAT CARDS */}
        <div
          className="
            grid
            grid-cols-2
            gap-3

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
                  flex-col
                  justify-between

                  rounded-[24px]

                  border
                  border-[#113858]/[0.08]

                  bg-white

                  p-5

                  transition-all
                  duration-300

                  hover:-translate-y-[3px]
                  hover:border-[#113858]/15

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
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                {/* NUMBER */}
                <div>
                  <span
                    className="
                      text-[30px]
                      font-semibold
                      leading-none
                      tracking-[-0.055em]
                      text-[#113858]

                      sm:text-[36px]
                      lg:text-[40px]
                    "
                  >
                    <AnimatedCounter value={stat.value} />
                  </span>

                  <p
                    className="
                      mt-2
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
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 5 — WHAT MAKES US UNIQUE
========================================================= */

function WhatMakesUsUnique() {
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
        {/* HEADER */}
        <div
          className="
            mx-auto
            mb-12
            max-w-[760px]
            text-center

            md:mb-14
          "
        >
          <EyebrowPill text="The Cottson difference" />

          <h2
            className="
              text-[34px]
              font-semibold
              leading-[1.08]
              tracking-[-0.045em]
              text-[#113858]

              sm:text-[42px]
              lg:text-[48px]
            "
          >
            What Makes Us
            <span className="text-[#113858]/45"> Unique</span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[580px]

              text-[13px]
              leading-[1.75]
              text-[#607487]

              sm:text-[14px]
            "
          >
            Four pillars that set Cottson Clothing apart in the
            corporate apparel industry.
          </p>
        </div>

        {/* UNIQUE-POINT CARDS */}
        <div
          className="
            grid
            grid-cols-1
            gap-3

            sm:grid-cols-2
            md:gap-4
            lg:grid-cols-4
          "
        >
          {uniquePoints.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="
                  group

                  flex
                  flex-col
                  gap-6

                  rounded-[24px]

                  border
                  border-[#113858]/[0.08]

                  bg-[#F5F8FA]

                  p-6

                  transition-all
                  duration-300

                  hover:-translate-y-[3px]
                  hover:border-[#113858]/15
                  hover:bg-white

                  hover:shadow-[0_14px_40px_rgba(17,56,88,0.08)]

                  sm:p-7
                  lg:p-8
                "
              >
                {/* ICON */}
                <div
                  className="
                    flex
                    h-[42px]
                    w-[42px]
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
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                {/* CONTENT */}
                <div>
                  <p
                    className="
                      mb-2
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-[#113858]/40
                    "
                  >
                    {String(item.id).padStart(2, "0")}
                  </p>

                  <h3
                    className="
                      text-[21px]
                      font-semibold
                      leading-[1.2]
                      tracking-[-0.035em]
                      text-[#113858]

                      lg:text-[23px]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-[13px]
                      leading-[1.7]
                      text-[#607487]
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 6 — CLIENT LOGO CAROUSEL
========================================================= */

function ClientLogoCard({ client }) {
  return (
    <div
      className="
        group
        flex
        h-[110px]
        w-[210px]
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-[20px]
        border
        border-[#113858]/10
        bg-white
        p-2.5
        transition-all
        duration-300
        hover:-translate-y-[2px]
        hover:border-[#113858]/20
        hover:shadow-[0_12px_35px_rgba(17,56,88,0.08)]
        sm:h-[120px]
        sm:w-[230px]
        sm:p-3.5
      "
    >
      <img
        src={client.url}
        alt={client.name || "Client Logo"}
        loading="lazy"
        draggable="false"
        className="
          h-full
          w-full
          object-contain
          transition-transform
          duration-300
          group-hover:scale-105
        "
      />
    </div>
  );
}

function ClientLogoCarousel() {
  const [topClients, setTopClients] = useState(initialTopClients);
  const [bottomClients, setBottomClients] = useState(initialBottomClients);

  useEffect(() => {
    fetch(CLIENTS_JSON_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.resources) && data.resources.length >= 50) {
          const safeExts = ["jpg", "jpeg", "png", "webp", "svg"];
          const formatItem = (item) => {
            const ext = safeExts.includes(item.format ? item.format.toLowerCase() : "")
              ? item.format
              : "png";
            return {
              id: item.public_id,
              name: item.public_id.replace(/[_-]/g, " ").trim(),
              url: `https://res.cloudinary.com/tpxo8m6a/image/upload/v${item.version}/${item.public_id}.${ext}`,
            };
          };

          setTopClients(data.resources.slice(0, 25).map(formatItem));
          setBottomClients(data.resources.slice(25, 50).map(formatItem));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch cottson_clients.json:", err);
      });
  }, []);

  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20">
      {/* HEADER */}
      <div className="mb-10 px-5 text-center sm:px-8">
        <EyebrowPill text="Trusted by" />

        <h2
          className="
            text-[28px]
            font-semibold
            leading-[1.08]
            tracking-[-0.045em]
            text-[#113858]
            sm:text-[34px]
          "
        >
          Our Clients
          <span className="text-[#113858]/45"> Trust Us</span>
        </h2>
      </div>

      {/* MARQUEE ROWS */}
      <div className="relative">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* ROW 1 — LEFT (FIRST 25 CLIENT LOGOS) */}
          <div className="overflow-hidden">
            <div
              className="flex w-max gap-3 will-change-transform hover:[animation-play-state:paused] sm:gap-4"
              style={{
                animation: "aboutMarqueeLeft 80s linear infinite",
              }}
            >
              <div className="flex shrink-0 gap-3 sm:gap-4">
                {topClients.map((client, index) => (
                  <ClientLogoCard key={`top-1-${client.id}-${index}`} client={client} />
                ))}
              </div>
              <div className="flex shrink-0 gap-3 sm:gap-4" aria-hidden="true">
                {topClients.map((client, index) => (
                  <ClientLogoCard key={`top-2-${client.id}-${index}`} client={client} />
                ))}
              </div>
            </div>
          </div>

          {/* ROW 2 — RIGHT (REMAINING 25 CLIENT LOGOS) */}
          <div className="overflow-hidden">
            <div
              className="flex w-max gap-3 will-change-transform hover:[animation-play-state:paused] sm:gap-4"
              style={{
                animation: "aboutMarqueeRight 85s linear infinite",
              }}
            >
              <div className="flex shrink-0 gap-3 sm:gap-4">
                {bottomClients.map((client, index) => (
                  <ClientLogoCard key={`bottom-1-${client.id}-${index}`} client={client} />
                ))}
              </div>
              <div className="flex shrink-0 gap-3 sm:gap-4" aria-hidden="true">
                {bottomClients.map((client, index) => (
                  <ClientLogoCard key={`bottom-2-${client.id}-${index}`} client={client} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes aboutMarqueeLeft {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(calc(-50% - 8px));
            }
          }

          @keyframes aboutMarqueeRight {
            from {
              transform: translateX(calc(-50% - 8px));
            }
            to {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </section>
  );
}

/* =========================================================
   WHATSAPP CTA — KEPT EXACTLY AS-IS (per user request)
========================================================= */

function WhatsAppCTA() {
  const WHATSAPP_URL = "";

  return (
    <section className="px-5 py-16 sm:px-8 md:px-12 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[30px] bg-[#111111] px-7 py-16 text-white sm:px-12 sm:py-20 lg:px-20 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/45">
              Let's Talk
            </p>
            <h2 className="text-[clamp(3.2rem,7vw,8rem)] font-medium leading-[0.88] tracking-[-0.06em]">
              Contact Us on
              <br />
              WhatsApp
            </h2>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              Have a requirement or want to discuss your next clothing project?
              <br className="hidden sm:block" />
              Talk directly with our team.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-6 sm:gap-7">
            <img
              src="https://res.cloudinary.com/tpxo8m6a/image/upload/ChatGPT_Image_Sep_25_2026_04_04_13_PM.png"
              alt="Cottson Emblem"
              className="h-44 w-44 object-contain opacity-95 transition-transform duration-500 hover:scale-105 sm:h-52 sm:w-52 lg:h-60 lg:w-60"
              loading="lazy"
            />
            <a
              href={WHATSAPP_URL || "#"}
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center gap-3 border border-white/25 px-7 py-4 text-sm font-medium uppercase tracking-[0.12em] transition-colors duration-300 hover:bg-white hover:text-black"
            >
              <span aria-hidden="true">◉</span>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

function AboutUs() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#113858]">
      {/* Existing shared components — do not recreate or modify them. */}
      <Navbar />
      <Hero />

      {/* 1. How It All Began — historical content + story paragraphs */}
      <HowItAllBegan />

      {/* 2. Reels / Short Videos */}
      <AboutReels />

      {/* 3. Vision & Mission */}
      <VisionMission />

      {/* 4. Stats About Us */}
      <AboutStats />

      {/* 5. What Makes Us Unique */}
      <WhatMakesUsUnique />

      {/* 6. Client Logo Carousel */}
      <ClientLogoCarousel />

      {/* 7. WhatsApp CTA — kept as-is */}
      <WhatsAppCTA />

      <Footer />
    </main>
  );
}

export default AboutUs;
