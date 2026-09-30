import { Check } from "lucide-react";

const trustItems = [
  "LOW MOQ 25",
  "7–10 DAYS DELIVERY",
  "PAN-INDIA DELIVERY",
  "CUSTOM BRANDING",
];

export default function TrustStrip() {
  return (
    <section className="w-full bg-white border-y border-[#113858]/10 py-4 sm:py-5">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12 md:gap-x-16">
          {trustItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2.5 whitespace-nowrap text-[11px] sm:text-[12px] font-semibold tracking-[0.12em] text-[#113858]/80 uppercase"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#113858] text-white">
                <Check size={11} strokeWidth={2.5} />
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
