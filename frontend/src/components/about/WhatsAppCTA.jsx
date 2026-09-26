import React from "react";

export function WhatsAppCTA({ whatsappUrl = "https://wa.me/919892297764" } = {}) {
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
              href={whatsappUrl || "https://wa.me/919892297764"}
              target="_blank"
              rel="noopener noreferrer"
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

export default WhatsAppCTA;
