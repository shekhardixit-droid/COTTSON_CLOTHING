import React from "react";

const reelVideos = [
  "https://res.cloudinary.com/tpxo8m6a/video/upload/v1790330914/IMG_6707.mp4",
  "https://res.cloudinary.com/tpxo8m6a/video/upload/v1790330941/IMG_5084.mp4",
  "https://res.cloudinary.com/tpxo8m6a/video/upload/v1790330971/IMG_3062.mp4",
  "https://res.cloudinary.com/tpxo8m6a/video/upload/v1790330952/IMG_3583.mp4",
  "https://res.cloudinary.com/tpxo8m6a/video/upload/v1790330928/IMG_5118.mp4",
  "https://res.cloudinary.com/tpxo8m6a/video/upload/v1790330904/IMG_6650.mp4",
  "https://res.cloudinary.com/tpxo8m6a/video/upload/v1790330596/BRAND_PROCESS.mp4",
];

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
      <span className="h-[6px] w-[6px] rounded-full bg-[#113858]" />
      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#113858]/60">
        {text}
      </span>
    </div>
  );
}

export function AboutReels() {
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

export default AboutReels;
