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
import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Footer from "../components/home/Footer";
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
   SECTION 1 — HOW IT ALL BEGAN (SCROLLYTELLING SHOWCASE)
========================================================= */

const storyMilestones = [
  {
    period: "March 1956",
    yearShort: "1956",
    tag: "Textile Roots",
    title: "A Legacy Born in Bombay's Iconic Cotton Mills",
    body: storyParagraphs[0],
    highlight: "Apollo Mills · Kamala Mills · Bombay Textiles",
    image: "https://res.cloudinary.com/tpxo8m6a/image/upload/v1790315520/Mill_Worker.avif",
    caption: "Apollo Mills Loom Artisan, Bombay",
    subtitle: "The formative era of our family's cotton craftsmanship",
    location: "Apollo Mills, Bombay",
  },
  {
    period: "August 2021",
    yearShort: "2021",
    tag: "Digital Genesis",
    title: "Bacoola Apparels & The D2C Inception",
    body: storyParagraphs[1],
    highlight: "Amazon · Flipkart · Peachmode · Nationwide Retail",
    image: "https://res.cloudinary.com/tpxo8m6a/image/upload/v1790315513/Bombay_Dyeing_Mills_Image.avif",
    caption: "Bombay Dyeing Mills Heritage",
    subtitle: "Carrying generational fabric expertise into modern e-commerce",
    location: "Textile District, Mumbai",
  },
  {
    period: "December 2021",
    yearShort: "2021",
    tag: "The Corporate Turning Point",
    title: "Enterprise Demand for Retail-Grade Workwear",
    body: storyParagraphs[2],
    highlight: "Custom corporate apparel · Event merchandise",
    image: "https://res.cloudinary.com/tpxo8m6a/image/upload/v1790315529/Mills_of_Bombay.avif",
    caption: "Historic Mills of Bombay",
    subtitle: "Extending fine retail craftsmanship into corporate uniforms",
    location: "Central Mills, Mumbai",
  },
  {
    period: "May 2022",
    yearShort: "2022",
    tag: "Brand Launch",
    title: "Cottson Clothing Officially Born",
    body: storyParagraphs[3],
    highlight: "Dedicated corporate clothing & uniform manufacturing",
    image: "https://res.cloudinary.com/tpxo8m6a/image/upload/v1790315506/Apollo_Bunder_Image.avif",
    caption: "Apollo Bunder & Gateway Harbour",
    subtitle: "A dedicated brand created exclusively for enterprise apparel",
    location: "Apollo Bunder, Mumbai",
  },
  {
    period: "August 2025 & Beyond",
    yearShort: "2025",
    tag: "National Scale",
    title: "80+ Team Members · 100+ Enterprise Clients",
    body: storyParagraphs[4],
    highlight: "Pan-India presence · Customer-first craftsmanship",
    image: "https://res.cloudinary.com/tpxo8m6a/image/upload/ChatGPT_Image_Sep_25_2026_04_04_13_PM.png",
    caption: "Cottson Clothing Today",
    subtitle: "From a family legacy to a trusted national enterprise partner",
    location: "Pan-India Presence",
    isEmblem: true,
  },
];

function HowItAllBegan() {
  const [activeEra, setActiveEra] = useState(0);
  const milestoneRefs = useRef([]);

  const scrollToMilestone = (index) => {
    setActiveEra(index);
    const target = milestoneRefs.current[index];
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-6 lg:px-8">

        {/* =====================================================
            1. SECTION HEADER
        ====================================================== */}
        <div className="mx-auto mb-14 max-w-[840px] text-center md:mb-20">
          <EyebrowPill text="Our Textile Heritage · Est. 1956" />

          <h2
            className="
              text-[36px] font-semibold leading-[1.08]
              tracking-[-0.045em] text-[#113858]
              sm:text-[46px] lg:text-[56px]
            "
          >
            How It All Began
            <span className="block text-[#113858]/40">
              The Cottson Story
            </span>
          </h2>

          <p
            className="
              mx-auto mt-5 max-w-[640px]
              text-[14px] leading-[1.8] text-[#607487]
              sm:text-[15px]
            "
          >
            Seven decades of textile mastery, passed down through generations
            and reimagined for India's leading enterprises.
          </p>

          {/* QUICK-JUMP ERA SELECTOR */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {storyMilestones.map((m, i) => (
              <button
                key={`filter-pill-${i}`}
                onClick={() => scrollToMilestone(i)}
                className={`rounded-full px-4 py-2 text-[11px] font-semibold transition-all duration-300 ${
                  activeEra === i
                    ? "bg-[#113858] text-white shadow-md shadow-[#113858]/15"
                    : "border border-[#113858]/10 bg-[#F5F8FA] text-[#113858]/70 hover:border-[#113858]/20 hover:bg-white hover:text-[#113858]"
                }`}
              >
                {m.yearShort} · {m.tag}
              </button>
            ))}
          </div>
        </div>

        {/* =====================================================
            2. VERTICAL TIMELINE WITH CENTRAL SPINE & ALTERNATING CARDS
        ====================================================== */}
        <div className="relative mx-auto max-w-6xl">

          {/* CENTRAL TIMELINE THREAD (THE WEAVING SPINE) */}
          <div
            className="
              pointer-events-none absolute left-4 top-8 bottom-8
              w-[2px] bg-gradient-to-b from-[#113858]/10 via-[#113858]/25 to-[#113858]/10
              md:left-1/2 md:-translate-x-1/2
            "
          />

          <div className="space-y-16 sm:space-y-24">
            {storyMilestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={`timeline-item-${index}`}
                  ref={(el) => (milestoneRefs.current[index] = el)}
                  className="relative"
                >
                  {/* CENTRAL ILLUMINATED YEAR BADGE */}
                  <div
                    className="
                      absolute left-4 top-0 z-20 -translate-x-1/2
                      md:left-1/2
                    "
                  >
                    <div
                      className="
                        flex h-11 w-11 items-center justify-center rounded-full
                        border-4 border-white bg-[#113858] text-[11px] font-bold text-white
                        shadow-md shadow-[#113858]/20 transition-transform duration-300 hover:scale-110
                        sm:h-12 sm:w-12 sm:text-[12px]
                      "
                    >
                      {item.yearShort}
                    </div>
                  </div>

                  {/* ALTERNATING 2-COLUMN GRID */}
                  <div
                    className={`
                      grid gap-8 pl-12 sm:gap-10 sm:pl-16
                      md:grid-cols-2 md:items-center md:gap-16 md:pl-0
                    `}
                  >
                    {/* COLUMN 1: ARCHIVAL PHOTO */}
                    <div className={`${isEven ? "md:order-1" : "md:order-2"}`}>
                      <div
                        className="
                          group relative overflow-hidden rounded-[26px]
                          border border-[#113858]/10 bg-[#F5F8FA] p-2
                          shadow-[0_12px_36px_rgba(17,56,88,0.06)] transition-all duration-500
                          hover:-translate-y-1 hover:border-[#113858]/20 hover:shadow-[0_20px_50px_rgba(17,56,88,0.12)]
                          sm:rounded-[30px] sm:p-2.5
                        "
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] sm:rounded-[24px]">
                          {item.isEmblem ? (
                            <div className="flex h-full w-full flex-col items-center justify-center bg-[#113858] p-8 text-center text-white">
                              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/[0.08]" />
                              <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full border border-white/[0.06]" />
                              <img
                                src={item.image}
                                alt="Cottson Emblem"
                                className="h-28 w-28 object-contain drop-shadow-[0_10px_30px_rgba(255,255,255,0.15)] transition-transform duration-700 group-hover:scale-105 sm:h-36 sm:w-36"
                              />
                              <span className="mt-4 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
                                Modern Brand Identity
                              </span>
                            </div>
                          ) : (
                            <>
                              <img
                                src={item.image}
                                alt={item.caption}
                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                loading="lazy"
                              />
                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#113858]/85 via-transparent to-transparent opacity-80" />
                            </>
                          )}

                          {/* ARCHIVAL FLOATING CAPTION */}
                          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                            <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-white/70">
                              {item.location}
                            </span>
                            <p className="mt-0.5 text-[13px] font-medium text-white sm:text-[14px]">
                              {item.caption}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* COLUMN 2: STORY NARRATIVE CARD */}
                    <div className={`${isEven ? "md:order-2" : "md:order-1"}`}>
                      <article
                        className="
                          group rounded-[26px] border border-[#113858]/[0.08]
                          bg-[#F5F8FA] p-7 transition-all duration-300
                          hover:-translate-y-1 hover:border-[#113858]/15 hover:bg-white hover:shadow-[0_16px_40px_rgba(17,56,88,0.08)]
                          sm:rounded-[30px] sm:p-9 lg:p-10
                        "
                      >
                        {/* CARD TOP META */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="inline-flex items-center gap-2 rounded-full border border-[#113858]/10 bg-white px-3.5 py-1 text-[11px] font-semibold text-[#113858]">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{item.period}</span>
                          </div>

                          <span className="rounded-full bg-[#113858]/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#113858]/60">
                            {item.tag}
                          </span>
                        </div>

                        {/* HEADLINE */}
                        <h3 className="mt-4 text-[22px] font-semibold leading-[1.25] tracking-[-0.03em] text-[#113858] sm:text-[26px] lg:text-[28px]">
                          {item.title}
                        </h3>

                        {/* STORY BODY */}
                        <p className="mt-4 text-[13.5px] leading-[1.85] text-[#607487] sm:text-[14.5px]">
                          {item.body}
                        </p>

                        {/* FOOTER HIGHLIGHTS */}
                        <div className="mt-6 border-t border-[#113858]/10 pt-4">
                          <span className="inline-flex items-center gap-2 text-[11.5px] font-medium text-[#113858]/70">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#113858]/40" />
                            {item.highlight}
                          </span>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              );
            })}
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
