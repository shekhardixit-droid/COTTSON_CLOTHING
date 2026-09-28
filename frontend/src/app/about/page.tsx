import type { Metadata } from "next";
import Image from "next/image";
import { ReelsCarousel } from "@/components/reels-carousel";
import { VisionMission } from "@/components/vision-mission";
import { UniqueStats } from "@/components/unique-stats";
import { ClientLogosMarquee } from "@/components/client-logos-marquee";
import { WhatsappCta } from "@/components/whatsapp-cta";

export const metadata: Metadata = { title: "About Us" };

const STORY = [
  {
    heading: "Who We Are,",
    paragraphs: [
      "Our story traces back to March 1956, when the founder's great-grandfather arrived in Bombay and began his career at Apollo Mills. His dedication and skill helped him rise through the ranks, eventually contributing to other iconic textile mills such as Kamala Mills and Bombay Textiles. This formative era marked the true beginning of our family's connection to fabric, craftsmanship, and the world of cotton. A legacy rooted in hard work and textile expertise began here.",
    ],
  },
  {
    heading: "Where We Came From, and",
    paragraphs: [
      "In August 2021, inspired by the growing wave of e-commerce in India, Bacoola Apparels was launched with a vision to build a strong D2C clothing brand. The brand quickly gained momentum and successfully sold premium apparel across leading marketplaces, including Amazon, Flipkart, Peachmode, and others.",
      "By December 2021, corporate inquiries started pouring in. Clients appreciated the distinctive quality that Bacoola Apparels offered, which matched premium retail standards. When the same craftsmanship was extended to corporate wear and event merchandise, demand grew rapidly, signalling a new opportunity.",
    ],
  },
  {
    heading: "Where We're Headed!",
    paragraphs: [
      "May 2022 marked the official launch of Cottson Clothing as a dedicated brand to serve the corporate clothing and uniform segment. This new identity allowed us to create a specialised category separate from retail, focused solely on delivering high-quality, custom-made corporate apparel.",
      "By August 2025, Cottson Clothing expanded to a strong team of more than 80 members, proudly serving over 100 clients across India. What began as a family legacy in textile craftsmanship has now evolved into a trusted national brand known for quality, consistency, and customer-first service.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <section className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden bg-brand text-center sm:min-h-[480px]">
        <Image src="/hero-bg.jpg" alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-25" />
        <div className="relative mx-auto max-w-3xl px-4">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-background sm:text-5xl md:text-6xl">
            Clothing your team is proud to wear
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm text-background/80 sm:text-base">
            Premium cotton, any color, your logo — made to order for businesses across India.
          </p>
        </div>
      </section>

      {/* How it all began */}
      <section className="mx-auto max-w-6xl space-y-12 px-4 py-16 sm:py-20">
        {STORY.map(({ heading, paragraphs }) => (
          <div key={heading} className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_2fr] sm:gap-12">
            <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-brand sm:text-4xl">{heading}</h2>
            <div className="space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        ))}
      </section>

      <ReelsCarousel />
      <VisionMission />
      <UniqueStats />
      <ClientLogosMarquee />
      <WhatsappCta title="Have a question about us?" body="Reach out on WhatsApp — we're quick to reply." />
    </>
  );
}
