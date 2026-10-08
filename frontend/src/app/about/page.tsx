"use client";

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
import { AboutReels } from "@/components/shared/about-reels";
import { ClientLogoCarousel } from "@/components/shared/client-logo-carousel";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";

/* =========================================================
   HISTORICAL CONTENT & MILESTONES
========================================================= */

const storyParagraphs = [
  "Our story traces back to March 1956, when the founder's great-grandfather arrived in Bombay and began his career at Apollo Mills. His dedication and skill helped him rise through the ranks, eventually contributing to other iconic textile mills such as Kamala Mills and Bombay Textiles. This formative era marked the true beginning of our family's connection to fabric, craftsmanship, and the world of cotton. A legacy rooted in hard work and textile expertise began here.",
  "In August 2021, inspired by the growing wave of e-commerce in India, Bacoola Apparels was launched with a vision to build a strong D2C clothing brand. The brand quickly gained momentum and successfully sold premium apparel across leading marketplaces, including Amazon, Flipkart, Peachmode, and others.",
  "By December 2021, corporate inquiries started pouring in. Clients appreciated the distinctive quality that Bacoola Apparels offered, which matched premium retail standards. When the same craftsmanship was extended to corporate wear and event merchandise, demand grew rapidly, signalling a new opportunity.",
  "May 2022 marked the official launch of Cottson Clothing as a dedicated brand to serve the corporate clothing and uniform segment. This new identity allowed us to create a specialised category separate from retail, focused solely on delivering high-quality, custom-made corporate apparel.",
  "By August 2025, Cottson Clothing expanded to a strong team of more than 80 members, proudly serving over 100 clients across India. What began as a family legacy in textile craftsmanship has now evolved into a trusted national brand known for quality, consistency, and customer-first service.",
];

const storyMilestones = [
  {
    period: "March 1956",
    yearShort: "1956",
    tag: "Textile Roots",
    title: "A Legacy Born in Bombay's Iconic Cotton Mills",
    body: storyParagraphs[0],
    highlight: "Apollo Mills · Kamala Mills · Bombay Textiles",
    image: "/images/about/mill-worker.jpg",
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
    image: "https://res.cloudinary.com/tpxo8m6a/image/upload/f_auto,q_auto,w_800/v1790315513/Bombay_Dyeing_Mills_Image.avif",
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
    image: "/images/about/mills-of-bombay.jpg",
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
    image: "https://res.cloudinary.com/tpxo8m6a/image/upload/f_auto,q_auto,w_800/v1790315506/Apollo_Bunder_Image.avif",
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
    image: "/cottson_logo.png",
    caption: "Cottson Clothing Today",
    subtitle: "From a family legacy to a trusted national enterprise partner",
    location: "Pan-India Presence",
    isEmblem: true,
  },
];

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
    description: "High-quality corporate apparel built around premium standards.",
  },
  {
    id: 2,
    icon: Wrench,
    title: "Custom Manufacturing",
    description: "Made-to-order clothing tailored to each corporate requirement.",
  },
  {
    id: 3,
    icon: PackageCheck,
    title: "Consistent Craftsmanship",
    description: "A textile legacy carried forward through dependable workmanship.",
  },
  {
    id: 4,
    icon: Heart,
    title: "Customer First",
    description: "A service-led approach focused on long-term client relationships.",
  },
];

function EyebrowPill({ text }: { text: string }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#113858]/10 bg-[#F5F8FA] px-3.5 py-[7px]">
      <span className="h-[6px] w-[6px] rounded-full bg-[#113858]" />
      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#113858]/60">
        {text}
      </span>
    </div>
  );
}

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
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

          function step(now: number) {
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
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

function HowItAllBegan() {
  const [activeStory, setActiveStory] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % storyMilestones.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden bg-[#EBDDC8] min-h-[92vh] sm:min-h-screen flex flex-col justify-center py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36">

      {/* DYNAMIC BACKGROUND ARCHITECTURAL DESIGN (Changes per timeline milestone in sepia/brown sketch color) */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        {/* 1956 · Textile Roots: Apollo Mills & Bombay Heritage */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            activeStory === 0 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg
            viewBox="0 0 1440 600"
            fill="none"
            className="h-full w-full object-cover stroke-[#5A402D] opacity-[0.24]"
            preserveAspectRatio="xMidYMid slice"
          >
            <g strokeWidth="1.3">
              <path d="M40 500 V320 L120 280 L200 320 V500" />
              <path d="M60 480 V360 Q120 310 180 360 V480" />
              <path d="M90 420 Q120 390 150 420 V480 H90 Z" />
              <circle cx="120" cy="350" r="14" />
              <path d="M200 320 H340 V500 H200" />
              <path d="M220 360 Q270 330 320 360 V480 H220 Z" />
              <line x1="270" y1="335" x2="270" y2="480" strokeDasharray="3 3" />
              <path d="M120 280 V220 L160 190 L200 220 V280" />
              <path d="M160 190 V150" strokeWidth="1.5" />
            </g>
            <g strokeWidth="0.9" strokeDasharray="5 4">
              <line x1="0" y1="180" x2="1440" y2="180" />
              <line x1="0" y1="230" x2="1440" y2="230" />
              <line x1="0" y1="460" x2="1440" y2="460" />
              <line x1="0" y1="520" x2="1440" y2="520" />
            </g>
            <g strokeWidth="1.4">
              <path d="M1180 500 V220 L1230 140 L1280 220 V500" />
              <circle cx="1230" cy="250" r="28" strokeWidth="1.5" />
              <circle cx="1230" cy="250" r="18" strokeDasharray="3 3" />
              <line x1="1230" y1="250" x2="1230" y2="238" strokeWidth="2" />
              <line x1="1230" y1="250" x2="1240" y2="250" strokeWidth="2" />
              <path d="M1200 340 Q1230 310 1260 340 V420 H1200 Z" />
              <path d="M1230 140 V90" strokeWidth="2" />
              <path d="M780 480 V380 L850 310 L850 380 L920 310 L920 380 L990 310 L990 380 L1060 310 L1060 380 L1130 310 L1130 480" />
              <line x1="800" y1="360" x2="845" y2="315" strokeDasharray="2 2" />
              <line x1="870" y1="360" x2="915" y2="315" strokeDasharray="2 2" />
              <line x1="940" y1="360" x2="985" y2="315" strokeDasharray="2 2" />
              <line x1="1010" y1="360" x2="1055" y2="315" strokeDasharray="2 2" />
              <path d="M865 440 V400 Q885 380 905 400 V440 H865 Z" />
              <path d="M935 440 V400 Q955 380 975 400 V440 H935 Z" />
              <path d="M1005 440 V400 Q1025 380 1045 400 V440 H1005 Z" />
              <path d="M1075 440 V400 Q1095 380 1115 400 V440 H1075 Z" />
            </g>
          </svg>
        </div>

        {/* 2021 · Digital Genesis: E-Commerce Matrix & Digital Pathways */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            activeStory === 1 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg
            viewBox="0 0 1440 600"
            fill="none"
            className="h-full w-full object-cover stroke-[#5A402D] opacity-[0.24]"
            preserveAspectRatio="xMidYMid slice"
          >
            <g strokeWidth="1.1" strokeDasharray="6 4">
              <line x1="60" y1="120" x2="480" y2="120" />
              <line x1="60" y1="200" x2="480" y2="200" />
              <line x1="60" y1="280" x2="480" y2="280" />
              <line x1="60" y1="360" x2="480" y2="360" />
              <line x1="160" y1="60" x2="160" y2="460" />
              <line x1="260" y1="60" x2="260" y2="460" />
              <line x1="360" y1="60" x2="360" y2="460" />
            </g>
            <g strokeWidth="1.5">
              <circle cx="160" cy="120" r="10" />
              <circle cx="260" cy="200" r="13" />
              <circle cx="360" cy="280" r="15" />
              <circle cx="260" cy="360" r="10" />
              <line x1="160" y1="120" x2="260" y2="200" />
              <line x1="260" y1="200" x2="360" y2="280" />
              <line x1="360" y1="280" x2="260" y2="360" />
            </g>
            <g strokeWidth="1.3">
              <path d="M800 240 Q950 160 1100 240 T1400 240" />
              <path d="M800 300 Q950 220 1100 300 T1400 300" strokeDasharray="4 4" />
              <path d="M800 360 Q950 280 1100 360 T1400 360" />
              <circle cx="950" cy="200" r="30" strokeDasharray="3 3" />
              <circle cx="1100" cy="260" r="42" />
              <circle cx="1250" cy="200" r="26" strokeDasharray="4 4" />
            </g>
          </svg>
        </div>

        {/* 2021 · Corporate Turning Point: Corporate Towers & Tailoring Lines */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            activeStory === 2 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg
            viewBox="0 0 1440 600"
            fill="none"
            className="h-full w-full object-cover stroke-[#5A402D] opacity-[0.24]"
            preserveAspectRatio="xMidYMid slice"
          >
            <g strokeWidth="1.3">
              <path d="M60 480 V180 L180 140 V480" />
              <line x1="100" y1="180" x2="100" y2="480" strokeDasharray="3 3" />
              <line x1="140" y1="180" x2="140" y2="480" strokeDasharray="3 3" />
              <path d="M180 240 H280 V480 H180" />
              <path d="M280 160 H380 V480 H280" />
              <line x1="280" y1="220" x2="380" y2="220" />
              <line x1="280" y1="280" x2="380" y2="280" />
              <line x1="280" y1="340" x2="380" y2="340" />
            </g>
            <g strokeWidth="1.3">
              <path d="M820 450 L940 220 L1060 450" />
              <path d="M860 300 L940 380 L1020 300" strokeWidth="1.6" />
              <path d="M940 220 V480" strokeDasharray="4 4" />
              <path d="M800 480 C 940 380, 1100 380, 1260 480" strokeWidth="1.5" strokeDasharray="6 3" />
              <circle cx="1180" cy="220" r="60" strokeDasharray="4 4" />
              <circle cx="1180" cy="220" r="40" />
              <line x1="1120" y1="220" x2="1240" y2="220" />
              <line x1="1180" y1="160" x2="1180" y2="280" />
            </g>
          </svg>
        </div>

        {/* 2022 · Brand Launch: Cottson Emblem Geometry & Atelier Drafting */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            activeStory === 3 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg
            viewBox="0 0 1440 600"
            fill="none"
            className="h-full w-full object-cover stroke-[#5A402D] opacity-[0.24]"
            preserveAspectRatio="xMidYMid slice"
          >
            <g strokeWidth="1.3">
              <circle cx="240" cy="300" r="140" strokeDasharray="6 4" />
              <circle cx="240" cy="300" r="100" />
              <circle cx="240" cy="300" r="60" strokeDasharray="3 3" />
              <line x1="60" y1="300" x2="420" y2="300" strokeDasharray="4 4" />
              <line x1="240" y1="120" x2="240" y2="480" strokeDasharray="4 4" />
            </g>
            <g strokeWidth="1.4">
              <path d="M840 460 Q940 220 1080 240 T1320 460" />
              <path d="M860 380 Q980 280 1140 320 T1300 380" strokeDasharray="5 3" />
              <polygon points="1120,120 1170,220 1070,220" />
              <circle cx="1120" cy="180" r="30" strokeDasharray="2 3" />
              <path d="M960 480 H1280" strokeWidth="2" />
            </g>
          </svg>
        </div>

        {/* 2025 · National Scale: Pan-India Network Nodes & Horizon */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            activeStory === 4 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg
            viewBox="0 0 1440 600"
            fill="none"
            className="h-full w-full object-cover stroke-[#5A402D] opacity-[0.24]"
            preserveAspectRatio="xMidYMid slice"
          >
            <g strokeWidth="1.4">
              <circle cx="260" cy="300" r="18" strokeWidth="2" />
              <circle cx="260" cy="300" r="36" strokeDasharray="4 4" />
              <circle cx="160" cy="200" r="12" />
              <circle cx="360" cy="180" r="14" />
              <circle cx="140" cy="380" r="12" />
              <circle cx="380" cy="360" r="14" />
              <circle cx="260" cy="460" r="10" />
              <line x1="260" y1="300" x2="160" y2="200" />
              <line x1="260" y1="300" x2="360" y2="180" />
              <line x1="260" y1="300" x2="140" y2="380" />
              <line x1="260" y1="300" x2="380" y2="360" />
              <line x1="260" y1="300" x2="260" y2="460" />
            </g>
            <g strokeWidth="1.3">
              <path d="M800 480 L920 300 L1020 380 L1160 220 L1280 320 L1380 180" strokeWidth="2" />
              <circle cx="920" cy="300" r="8" />
              <circle cx="1020" cy="380" r="8" />
              <circle cx="1160" cy="220" r="10" />
              <circle cx="1280" cy="320" r="8" />
              <circle cx="1380" cy="180" r="12" strokeWidth="2" />
              <path d="M800 480 H1420" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1380px] px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-14">
          {/* LEFT COLUMN: Section Header & Subtitle */}
          <div className="lg:col-span-5">
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#7A5C43]">
              OUR JOURNEY
            </span>

            <h2 className="mt-3 text-[36px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.08] tracking-[-0.035em] text-[#113858]">
              How It All Began
              <span className="block font-semibold text-[#6A8194]">
                The Cottson Story
              </span>
            </h2>

            <p className="mt-5 max-w-[460px] text-[14px] sm:text-[15px] leading-[1.75] text-[#5C4E44]">
              Seven decades of textile mastery, passed down through generations
              and reimagined for India's leading enterprises.
            </p>

            {/* Interactive Timeline Progress Pills */}
            <div
              className="mt-8 flex items-center gap-2"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {storyMilestones.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStory(idx)}
                  className={`group relative h-2 rounded-full transition-all duration-500 ${
                    idx === activeStory
                      ? "w-10 bg-[#113858]"
                      : "w-2.5 bg-[#5A402D]/25 hover:bg-[#5A402D]/50"
                  }`}
                  aria-label={`Jump to ${m.yearShort} · ${m.tag}`}
                  title={`${m.yearShort} · ${m.tag}`}
                />
              ))}
              <span className="ml-2 text-xs font-semibold tracking-wide text-[#7A5C43]">
                {storyMilestones[activeStory].yearShort} · {storyMilestones[activeStory].tag}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Layered Photo + Floating Story Card (Option #6) */}
          <div
            className="relative lg:col-span-7"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div className="grid grid-cols-1 grid-rows-1 relative">
              {storyMilestones.map((item, idx) => {
                const isActive = idx === activeStory;
                return (
                  <div
                    key={idx}
                    className={`col-start-1 row-start-1 relative pb-6 lg:pb-8 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isActive
                        ? "opacity-100 translate-x-0 scale-100 pointer-events-auto z-10"
                        : "opacity-0 translate-x-4 scale-[0.985] pointer-events-none z-0"
                    }`}
                  >
                    {/* Handwritten Year & Milestone Tag with Doodle Arrow */}
                    <div className="absolute -top-10 sm:-top-12 right-4 sm:right-10 lg:right-16 z-30 select-none text-right">
                      <div className="inline-block transform rotate-[-4deg]">
                        <span className="block text-[22px] sm:text-[26px] font-serif font-black italic tracking-wide text-[#5A402D]">
                          {item.yearShort}
                        </span>
                        <span className="block text-[13px] sm:text-[14px] font-medium italic text-[#7A5C43]">
                          {item.tag}
                        </span>
                        {/* Hand-drawn doodle arrow pointing towards the card */}
                        <svg
                          className="ml-auto mt-0.5 h-7 w-12 stroke-[#5A402D]"
                          viewBox="0 0 50 40"
                          fill="none"
                        >
                          <path
                            d="M15 5 Q25 20 20 32 M20 32 L14 26 M20 32 L26 27"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* 1. ARCHIVAL PHOTO (White frame, tilted ~ -3 degrees) */}
                    <div className="relative z-10 w-[88%] sm:w-[82%] md:w-[76%] lg:w-[74%] transform -rotate-2 sm:-rotate-3 transition-transform duration-700 hover:rotate-0">
                      <div className="rounded-[18px] sm:rounded-[24px] border border-[#5A402D]/15 bg-white p-2.5 sm:p-3.5 shadow-[0_20px_50px_rgba(90,64,45,0.18)]">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] sm:rounded-[16px] bg-[#113858]/5">
                          {item.isEmblem ? (
                            <div className="flex h-full w-full flex-col items-center justify-center bg-[#113858] p-8 text-center text-white">
                              <img
                                src={item.image}
                                alt="Cottson Emblem"
                                className="h-24 w-24 object-contain brightness-0 invert"
                              />
                              <span className="mt-3 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                                Modern Brand Identity
                              </span>
                            </div>
                          ) : (
                            <>
                              <img
                                src={item.image}
                                alt={item.caption}
                                className="h-full w-full object-cover transition-transform duration-1000 ease-out"
                                loading="eager"
                                decoding="async"
                              />
                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#113858]/80 via-transparent to-transparent opacity-70" />
                              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
                                  {item.location}
                                </span>
                                <p className="text-[12px] font-medium text-white/95">
                                  {item.caption}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 2. FLOATING EDITORIAL CARD (Overlapping lower right quadrant, without arrow button) */}
                    <div className="relative -mt-20 sm:-mt-28 md:-mt-32 lg:mt-0 z-20 ml-auto w-[92%] sm:w-[82%] md:w-[72%] lg:absolute lg:right-0 lg:bottom-0 lg:w-[62%] xl:w-[58%]">
                      <article className="rounded-[20px] sm:rounded-[24px] border border-[#5A402D]/12 bg-white p-5 sm:p-7 lg:p-8 shadow-[0_20px_45px_rgba(90,64,45,0.16)] transition-all duration-500">
                        {/* Period with Clock icon */}
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-[#7A5C43]">
                          <Clock3 className="h-3.5 w-3.5 text-[#7A5C43]" />
                          <span>{item.period}</span>
                        </div>

                        {/* Headline */}
                        <h3 className="mt-2.5 text-[18px] sm:text-[21px] lg:text-[23px] font-bold leading-[1.25] tracking-[-0.025em] text-[#113858]">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-3 text-[12.5px] sm:text-[13.5px] leading-[1.75] text-[#5C4E44]">
                          {item.body}
                        </p>
                      </article>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionMission() {
  return (
    <section className="bg-white px-5 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1380px]">
        <div className="mx-auto mb-12 max-w-[760px] text-center md:mb-14">
          <EyebrowPill text="What drives us" />

          <h2 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#113858] sm:text-[42px] lg:text-[48px]">
            Our Vision
            <span className="text-[#113858]/45"> & Mission</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[570px] text-[13px] leading-[1.75] text-[#607487] sm:text-[14px]">
            The principles that guide every garment we create and every relationship we build.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="group overflow-hidden rounded-[24px] border border-[#113858]/[0.08] bg-[#F5F8FA] transition-all duration-300 hover:-translate-y-[3px] hover:border-[#113858]/15 hover:bg-white hover:shadow-[0_14px_40px_rgba(17,56,88,0.08)] sm:rounded-[28px]">
            <div className="flex items-center p-8 sm:p-10 lg:p-14">
              <div className="max-w-xl">
                <div className="mb-6 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#E9F0F5] text-[#113858] transition-all duration-300 group-hover:bg-[#113858] group-hover:text-white">
                  <Eye size={20} strokeWidth={1.8} />
                </div>
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#113858]/40">
                  01 / Our Vision
                </p>
                <h3 className="mb-5 text-[28px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#113858] sm:text-[34px] lg:text-[40px]">
                  Our Vision
                </h3>
                <p className="text-[13.5px] leading-[1.8] text-[#607487] sm:text-[14px]">
                  To redefine professional attire for the modern executive through thoughtful design, dependable craftsmanship, and a premium clothing experience.
                </p>
              </div>
            </div>
          </div>

          <div className="group overflow-hidden rounded-[24px] border border-[#113858]/[0.08] bg-[#F5F8FA] transition-all duration-300 hover:-translate-y-[3px] hover:border-[#113858]/15 hover:bg-white hover:shadow-[0_14px_40px_rgba(17,56,88,0.08)] sm:rounded-[28px]">
            <div className="flex items-center p-8 sm:p-10 lg:p-14">
              <div className="max-w-xl">
                <div className="mb-6 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#E9F0F5] text-[#113858] transition-all duration-300 group-hover:bg-[#113858] group-hover:text-white">
                  <Target size={20} strokeWidth={1.8} />
                </div>
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#113858]/40">
                  02 / Our Mission
                </p>
                <h3 className="mb-5 text-[28px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#113858] sm:text-[34px] lg:text-[40px]">
                  Our Mission
                </h3>
                <p className="text-[13.5px] leading-[1.8] text-[#607487] sm:text-[14px]">
                  To deliver high-quality, custom-made corporate apparel while building lasting relationships through consistency, service, and textile expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutStats() {
  return (
    <section className="bg-[#F5F8FA] px-5 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1380px]">
        <div className="mx-auto mb-12 max-w-[760px] text-center md:mb-14">
          <EyebrowPill text="Our journey" />

          <h2 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#113858] sm:text-[42px] lg:text-[48px]">
            Stats
            <span className="text-[#113858]/45"> About Us</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[520px] text-[13px] leading-[1.75] text-[#607487] sm:text-[14px]">
            Key milestones and numbers that define our growth and commitment to quality.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.id}
                className="group flex min-h-[190px] flex-col justify-between rounded-[24px] border border-[#113858]/[0.08] bg-white p-5 transition-all duration-300 hover:-translate-y-[3px] hover:border-[#113858]/15 hover:shadow-[0_14px_40px_rgba(17,56,88,0.08)] sm:min-h-[210px] sm:p-6 lg:min-h-[225px]"
              >
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#E9F0F5] text-[#113858] transition-all duration-300 group-hover:bg-[#113858] group-hover:text-white">
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <span className="text-[30px] font-semibold leading-none tracking-[-0.055em] text-[#113858] sm:text-[36px] lg:text-[40px]">
                    <AnimatedCounter value={stat.value} />
                  </span>

                  <p className="mt-2 text-[11px] font-medium text-[#607487] sm:text-[12px]">
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

function WhatMakesUsUnique() {
  return (
    <section className="bg-white px-5 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1380px]">
        <div className="mx-auto mb-12 max-w-[760px] text-center md:mb-14">
          <EyebrowPill text="The Cottson difference" />

          <h2 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#113858] sm:text-[42px] lg:text-[48px]">
            What Makes Us
            <span className="text-[#113858]/45"> Unique</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[580px] text-[13px] leading-[1.75] text-[#607487] sm:text-[14px]">
            Four pillars that set Cottson Clothing apart in the corporate apparel industry.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {uniquePoints.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group flex flex-col gap-6 rounded-[24px] border border-[#113858]/[0.08] bg-[#F5F8FA] p-6 transition-all duration-300 hover:-translate-y-[3px] hover:border-[#113858]/15 hover:bg-white hover:shadow-[0_14px_40px_rgba(17,56,88,0.08)] sm:p-7 lg:p-8"
              >
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#E9F0F5] text-[#113858] transition-all duration-300 group-hover:bg-[#113858] group-hover:text-white">
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#113858]/40">
                    {String(item.id).padStart(2, "0")}
                  </p>

                  <h3 className="text-[21px] font-semibold leading-[1.2] tracking-[-0.035em] text-[#113858] lg:text-[23px]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[13px] leading-[1.7] text-[#607487]">
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

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#113858]">
      {/* 1. Scrollytelling Heritage Timeline */}
      <HowItAllBegan />

      {/* 2. Video Reels Carousel */}
      <AboutReels />

      {/* 3. Vision & Mission Cards */}
      <VisionMission />

      {/* 4. Stats Counter Row */}
      <AboutStats />

      {/* 5. What Makes Us Unique */}
      <WhatMakesUsUnique />

      {/* 6. Client Logo Carousel */}
      <ClientLogoCarousel />

      {/* 7. WhatsApp Consultation CTA */}
      <WhatsAppCTA />
    </main>
  );
}
