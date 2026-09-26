import { useState } from "react";
import { useInView } from "../../hooks/useInView";

const rowOne = [
  "/images/teams/team-01.jpg",
  "/images/teams/team-02.jpg",
  "/images/teams/team-03.jpg",
  "/images/teams/team-04.jpg",
  "/images/teams/team-05.jpg",
];

const rowTwo = [
  "/images/teams/team-06.jpg",
  "/images/teams/team-07.jpg",
  "/images/teams/team-08.jpg",
  "/images/teams/team-09.jpg",
  "/images/teams/team-10.jpg",
];

function TeamImage({ src, index, onEnter, onLeave }) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="
        group
        relative
        h-[210px]
        w-[300px]
        shrink-0
        cursor-pointer
        overflow-hidden
        rounded-[22px]
        bg-[#F3F6F8]

        sm:h-[240px]
        sm:w-[350px]

        lg:h-[270px]
        lg:w-[400px]
      "
    >
      <img
        src={src}
        alt={`Cottson team ${index + 1}`}
        loading="lazy"
        decoding="async"
        draggable="false"
        className="
          h-full
          w-full
          object-cover

          transition-transform
          duration-700
          ease-out

          group-hover:scale-[1.045]
        "
      />

      {/* subtle brand overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[#113858]/0
          transition-colors
          duration-500

          group-hover:bg-[#113858]/10
        "
      />
    </div>
  );
}

function MarqueeRow({
  images,
  direction = "left",
  duration = 32,
  isInView = true,
}) {
  const [paused, setPaused] = useState(false);

  const animationName =
    direction === "left"
      ? "cottsonTeamLeft"
      : "cottsonTeamRight";

  return (
    <div className="relative w-full overflow-hidden">

      {/* LEFT FADE */}
      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-20
          h-full
          w-[40px]

          bg-gradient-to-r
          from-white
          to-transparent

          sm:w-[90px]
          lg:w-[130px]
        "
      />

      {/* RIGHT FADE */}
      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          z-20
          h-full
          w-[40px]

          bg-gradient-to-l
          from-white
          to-transparent

          sm:w-[90px]
          lg:w-[130px]
        "
      />

      {/* TRACK */}
      <div
        className="
          team-marquee-track
          flex
          w-max
          gap-3
          will-change-transform

          sm:gap-4
        "
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
          animationPlayState: !isInView || paused ? "paused" : "running",
        }}
      >
        {/* FIRST COPY */}
        <div className="flex shrink-0 gap-3 sm:gap-4">
          {images.map((image, index) => (
            <TeamImage
              key={`first-${index}`}
              src={image}
              index={index}
              onEnter={() => setPaused(true)}
              onLeave={() => setPaused(false)}
            />
          ))}
        </div>

        {/* DUPLICATE COPY */}
        <div
          className="flex shrink-0 gap-3 sm:gap-4"
          aria-hidden="true"
        >
          {images.map((image, index) => (
            <TeamImage
              key={`second-${index}`}
              src={image}
              index={index}
              onEnter={() => setPaused(true)}
              onLeave={() => setPaused(false)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamMarquee() {
  const { ref: sectionRef, isInView } = useInView({ rootMargin: "250px" });

  return (
    <section
      ref={sectionRef}
      className="
        overflow-hidden
        bg-white
        pb-24
        pt-12

        md:pb-28
        md:pt-16
      "
    >
      {/* HEADER */}
      <div
        className="
          mx-auto
          mb-10
          max-w-[1120px]
          px-5
          text-center

          sm:px-6
          md:mb-12
        "
      >
        <p
          className="
            mb-3
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#113858]/55
          "
        >
          Made for teams
        </p>

        <h2
          className="
            mx-auto
            max-w-[720px]
            break-words

            text-[34px]
            font-semibold
            leading-[1.08]
            tracking-[-0.045em]
            text-[#113858]

            sm:text-[42px]
            lg:text-[48px]
          "
        >
          One team.
          <span className="text-[#113858]/45">
            {" "}One identity.
          </span>
        </h2>

        <p
          className="
            mx-auto
            mt-5
            max-w-[520px]
            break-words

            text-[13px]
            leading-[1.75]
            text-[#607487]

            sm:text-[14px]
          "
        >
          Custom apparel that brings people together and puts your
          brand proudly at the centre of the team.
        </p>
      </div>

      {/* TWO OPPOSITE ROWS */}
      <div className="flex flex-col gap-3 sm:gap-4">

        {/* ROW 1 — RIGHT TO LEFT */}
        <MarqueeRow
          images={rowOne}
          direction="left"
          duration={34}
          isInView={isInView}
        />

        {/* ROW 2 — LEFT TO RIGHT */}
        <MarqueeRow
          images={rowTwo}
          direction="right"
          duration={38}
          isInView={isInView}
        />

      </div>

      {/* COMPONENT-LOCAL ANIMATION */}
      <style>
        {`
          @keyframes cottsonTeamLeft {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(calc(-50% - 8px));
            }
          }

          @keyframes cottsonTeamRight {
            from {
              transform: translateX(calc(-50% - 8px));
            }

            to {
              transform: translateX(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .team-marquee-track {
              animation: none !important;
            }
          }
        `}
      </style>
    </section>
  );
}

export default TeamMarquee;