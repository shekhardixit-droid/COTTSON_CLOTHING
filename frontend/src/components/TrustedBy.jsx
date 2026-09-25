import { useState } from "react";

const rowOne = [
  {
    id: 1,
    name: "Client 1",
    image: "/images/clients/client-01.png",
  },
  {
    id: 2,
    name: "Client 2",
    image: "/images/clients/client-02.png",
  },
  {
    id: 3,
    name: "Client 3",
    image: "/images/clients/client-03.png",
  },
  {
    id: 4,
    name: "Client 4",
    image: "/images/clients/client-04.png",
  },
  {
    id: 5,
    name: "Client 5",
    image: "/images/clients/client-05.png",
  },
  {
    id: 6,
    name: "Client 6",
    image: "/images/clients/client-06.png",
  },
];

const rowTwo = [
  {
    id: 7,
    name: "Client 7",
    image: "/images/clients/client-07.png",
  },
  {
    id: 8,
    name: "Client 8",
    image: "/images/clients/client-08.png",
  },
  {
    id: 9,
    name: "Client 9",
    image: "/images/clients/client-09.png",
  },
  {
    id: 10,
    name: "Client 10",
    image: "/images/clients/client-10.png",
  },
  {
    id: 11,
    name: "Client 11",
    image: "/images/clients/client-11.png",
  },
  {
    id: 12,
    name: "Client 12",
    image: "/images/clients/client-12.png",
  },
];

function ClientCard({ client, onEnter, onLeave }) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="
        group
        flex
        h-[110px]
        w-[210px]
        shrink-0
        items-center
        justify-center
        rounded-[20px]
        border
        border-[#113858]/10
        bg-[#F7F9FB]
        px-8

        transition-all
        duration-300

        hover:-translate-y-[2px]
        hover:border-[#113858]/20
        hover:bg-white
        hover:shadow-[0_12px_35px_rgba(17,56,88,0.08)]

        sm:h-[120px]
        sm:w-[230px]

        lg:h-[130px]
        lg:w-[250px]
      "
    >
      <img
        src={client.image}
        alt={client.name}
        draggable="false"
        className="
          max-h-[52px]
          max-w-[145px]
          object-contain

          opacity-65
          grayscale

          transition-all
          duration-300

          group-hover:scale-[1.04]
          group-hover:opacity-100
          group-hover:grayscale-0

          sm:max-h-[58px]
          sm:max-w-[160px]

          lg:max-w-[175px]
        "
      />
    </div>
  );
}

function TrustedRow({
  clients,
  direction = "left",
  duration = 30,
}) {
  const [paused, setPaused] = useState(false);

  const animationName =
    direction === "left"
      ? "trustedMarqueeLeft"
      : "trustedMarqueeRight";

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
          lg:w-[140px]
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
          lg:w-[140px]
        "
      />

      {/* MOVING TRACK */}
      <div
        className="
          flex
          w-max
          gap-3
          will-change-transform

          sm:gap-4
        "
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {/* ORIGINAL */}
        <div className="flex shrink-0 gap-3 sm:gap-4">
          {clients.map((client) => (
            <ClientCard
              key={`first-${client.id}`}
              client={client}
              onEnter={() => setPaused(true)}
              onLeave={() => setPaused(false)}
            />
          ))}
        </div>

        {/* DUPLICATE */}
        <div
          className="flex shrink-0 gap-3 sm:gap-4"
          aria-hidden="true"
        >
          {clients.map((client) => (
            <ClientCard
              key={`second-${client.id}`}
              client={client}
              onEnter={() => setPaused(true)}
              onLeave={() => setPaused(false)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TrustedBy() {
  return (
    <section
      id="clients"
      className="
        overflow-hidden
        bg-white
        py-20

        md:py-24
        lg:py-28
      "
    >
      {/* ================================
          HEADING
      ================================= */}

      <div
        className="
          mx-auto
          mb-12
          max-w-[1120px]
          px-5
          text-center

          sm:px-6
          md:mb-14
        "
      >
        <div
          className="
            mb-4
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
            Trusted By
          </span>
        </div>

        <h2
          className="
            mx-auto
            max-w-[700px]

            text-[34px]
            font-semibold
            leading-[1.08]
            tracking-[-0.045em]
            text-[#113858]

            sm:text-[42px]
            lg:text-[48px]
          "
        >
          Trusted by teams that
          <span className="text-[#113858]/45">
            {" "}care about their identity.
          </span>
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
          Helping companies and teams bring their brand to life
          through thoughtfully customised corporate apparel.
        </p>
      </div>

      {/* ================================
          LOGO MARQUEES
      ================================= */}

      <div className="flex flex-col gap-3 sm:gap-4">

        {/* ROW 1 — LEFT */}
        <TrustedRow
          clients={rowOne}
          direction="left"
          duration={30}
        />

        {/* ROW 2 — RIGHT */}
        <TrustedRow
          clients={rowTwo}
          direction="right"
          duration={34}
        />

      </div>

      {/* ================================
          LOCAL ANIMATIONS
      ================================= */}

      <style>
        {`
          @keyframes trustedMarqueeLeft {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(calc(-50% - 8px));
            }
          }

          @keyframes trustedMarqueeRight {
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

export default TrustedBy;