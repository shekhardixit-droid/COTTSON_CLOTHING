import React, { useState, useEffect } from "react";
import {
  CLIENTS_JSON_URL,
  initialTopClients,
  initialBottomClients,
} from "../../data/cottsonClients";

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

export function ClientLogoCarousel() {
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

export default ClientLogoCarousel;
