
import React, { useState } from "react";
import {
  Mail,
  Phone,
  PhoneCall,
  Send,
  MapPin,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

const contactCards = [
  {
    icon: Phone,
    title: "Call our team",
    subtitle: "Direct line with our merchandising specialists",
    primary: "+91 9892297764",
    primaryHref: "tel:+919892297764",
    secondary: "022 26627501",
    secondaryHref: "tel:02226627501",
    timing: "Mon – Sat, 9:30 AM – 7:00 PM IST",
  },
  {
    icon: Mail,
    title: "Email us",
    subtitle: "Send your requirements, tech packs, or RFQs",
    primary: "contact@cottson.com",
    primaryHref: "mailto:contact@cottson.com",
    timing: "Fast response within 2 hours",
  },
  {
    icon: MapPin,
    title: "Head Office & Manufacturing",
    subtitle: "Rooted in Mumbai's textile legacy since 1956",
    primary: "Mumbai, Maharashtra, India",
    timing: "Pan-India fulfillment to 500+ pin codes",
  },
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: "Polo T-Shirts",
    quantity: "100 - 500 pcs",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleScrollToInquiry = (e) => {
    e.preventDefault();
    const el = document.getElementById("inquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA] text-[#113858]">
      <Navbar />

      {/* =========================================================
          HERO BANNER SECTION
          ONLY FIXES:
          1. Models positioned toward the right
          2. Removed extra gradient/background layer
      ========================================================= */}
      <section
        className="
          relative flex w-full items-center overflow-hidden
          min-h-[95vh] sm:min-h-[100vh] md:min-h-[105vh] lg:min-h-[108vh]
          pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24
        "
      >
        {/* SINGLE CONTINUOUS BACKGROUND IMAGE */}
        <img
          src="https://res.cloudinary.com/tpxo8m6a/image/upload/f_auto/q_auto/ChatGPT_Image_Sep_26_2026_10_01_39_AM.png"
          alt="Cottson Corporate Clothing"
          className="
            pointer-events-none absolute inset-0
            h-full w-full
            select-none object-cover
            object-right
            sm:object-right
            md:object-right
            lg:object-right
          "
          loading="eager"
        />

        {/* Hero Content Container */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 md:px-14 lg:px-20">
          <div className="max-w-[560px] lg:max-w-[620px]">
            {/* ENLARGED COTTSON LOGO */}
            <a href="/" className="inline-block">
              <img
                src="/cottson_logo.png"
                alt="COTTSON"
                className="
                  h-14 w-auto object-contain drop-shadow-md
                  sm:h-18 md:h-22 lg:h-26 xl:h-32
                "
              />
            </a>

            {/* HEADLINE & VALUE PROP */}
            <div className="mt-5 sm:mt-7">
              <span
                className="
                  inline-flex items-center gap-2 rounded-full
                  border border-[#113858]/20 bg-white/70 px-3.5 py-1
                  text-[11px] font-semibold uppercase tracking-[0.16em]
                  text-[#113858] shadow-sm backdrop-blur-sm
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#113858]" />
                Corporate Apparel & Merchandising
              </span>

              <h1
                className="
                  mt-3 text-[30px] font-bold leading-[1.08] tracking-[-0.04em]
                  text-[#113858] sm:text-[38px] md:text-[46px] lg:text-[52px]
                "
              >
                Custom Corporate
                <br />
                <span className="text-[#113858]/75">
                  Clothing & Uniforms
                </span>
              </h1>

              <p
                className="
                  mt-3.5 text-[14px] leading-relaxed text-[#113858]/90
                  sm:text-[15px] md:text-[16px] max-w-lg font-medium
                "
              >
                Premium executive polo t-shirts, corporate shirts, and
                industrial workwear engineered for teams that value
                uncompromising quality.
              </p>
            </div>

            {/* 2 ACTION BUTTONS */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:mt-9 sm:gap-4">
              <a
                href="mailto:contact@cottson.com"
                className="
                  inline-flex items-center gap-2.5 rounded-full
                  bg-[#113858] px-7 py-3.5 text-[14px] font-semibold
                  text-white shadow-xl shadow-[#113858]/30
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-[#19496f]
                  active:translate-y-0 sm:px-8 sm:py-4 sm:text-[15px]
                "
              >
                <Mail size={18} className="shrink-0" />
                <span>Email</span>
              </a>

              <a
                href="#inquiry"
                onClick={handleScrollToInquiry}
                className="
                  inline-flex items-center gap-2.5 rounded-full
                  border-2 border-[#113858] bg-white/95 px-7 py-3.5
                  text-[14px] font-semibold text-[#113858]
                  shadow-lg shadow-black/5 backdrop-blur-md
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-white
                  active:translate-y-0 sm:px-8 sm:py-4 sm:text-[15px]
                "
              >
                <Send size={17} className="shrink-0" />
                <span>Send a Query</span>
              </a>
            </div>

            {/* DIRECT CONTACT INFO STRIP */}
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#113858]/15 pt-4 text-[12.5px] font-semibold text-[#113858] sm:text-[13px]">
              <a
                href="mailto:contact@cottson.com"
                className="hover:underline underline-offset-4"
              >
                contact@cottson.com
              </a>

              <span className="text-[#113858]/40">•</span>

              <a
                href="tel:+919892297764"
                className="hover:underline underline-offset-4"
              >
                +91 9892297764
              </a>

              <span className="text-[#113858]/40">•</span>

              <span className="font-normal text-[#113858]/75">
                Mon – Sat, 9:30 AM – 7 PM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: CONTACT TOUCHPOINTS & QUERY INQUIRY FORM
      ========================================================= */}
      <section
        id="inquiry"
        className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-24"
      >
        <div className="mx-auto max-w-[1380px]">
          {/* SECTION HEADER */}
          <div className="mb-14 text-center">
            <div
              className="
                mb-4 inline-flex items-center gap-2 rounded-full
                border border-[#113858]/10 bg-white px-3.5 py-[7px]
                shadow-sm
              "
            >
              <span className="h-[6px] w-[6px] rounded-full bg-[#113858]" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#113858]/60">
                Direct Contact
              </span>
            </div>

            <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#113858] sm:text-[40px] lg:text-[44px]">
              Ready to create clothing
              <br />
              <span className="text-[#113858]/45">
                your team is proud to wear?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-[#607487] sm:text-[15px]">
              Whether you need 50 executive polos or custom uniforms for
              thousands of employees across India, we're ready to assist.
            </p>
          </div>

          {/* 3 CONTACT INFO CARDS */}
          <div className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contactCards.map((card, idx) => {
              const Icon = card.icon;

              return (
                <div
                  key={idx}
                  className="
                    flex flex-col justify-between rounded-[24px]
                    border border-[#113858]/[0.08] bg-white
                    p-7 shadow-[0_10px_30px_rgba(17,56,88,0.04)]
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(17,56,88,0.08)]
                  "
                >
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F8FA] text-[#113858]">
                      <Icon size={22} strokeWidth={2} />
                    </div>

                    <h3 className="text-[18px] font-semibold text-[#113858]">
                      {card.title}
                    </h3>

                    <p className="mt-1 text-[13px] text-[#607487]">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[#113858]/[0.08] pt-4">
                    {card.primaryHref ? (
                      <a
                        href={card.primaryHref}
                        className="text-[15px] font-semibold text-[#113858] hover:text-[#0D6E6E]"
                      >
                        {card.primary}
                      </a>
                    ) : (
                      <p className="text-[15px] font-semibold text-[#113858]">
                        {card.primary}
                      </p>
                    )}

                    {card.secondary && (
                      <div className="mt-1">
                        <a
                          href={card.secondaryHref}
                          className="text-[14px] text-[#607487] hover:text-[#113858]"
                        >
                          {card.secondary}
                        </a>
                      </div>
                    )}

                    <p className="mt-2 text-[12px] font-medium text-[#607487]/80">
                      {card.timing}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* INQUIRY FORM & HIGHLIGHTS GRID */}
          <div className="overflow-hidden rounded-[32px] border border-[#113858]/[0.08] bg-white shadow-[0_20px_60px_rgba(17,56,88,0.06)] lg:grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* LEFT: FORM */}
            <div className="p-7 sm:p-10 lg:p-12">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#113858]/60">
                Send a Query
              </span>

              <h3 className="mt-1 text-[24px] font-bold text-[#113858] sm:text-[28px]">
                Request a Custom Quote
              </h3>

              <p className="mt-2 text-[13px] text-[#607487] sm:text-[14px]">
                Share your corporate merchandise requirements below. Our team
                will respond with tailored pricing, fabric options, and digital
                mockups.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-[20px] border border-emerald-200 bg-emerald-50/70 p-7 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 size={26} />
                  </div>

                  <h4 className="text-[18px] font-bold text-[#113858]">
                    Query Received!
                  </h4>

                  <p className="mt-2 text-[13px] text-[#607487]">
                    Thank you, {formData.name || "partner"}. Our merchandising
                    team will review your query and get back to you within 2
                    business hours.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-5 text-[13px] font-semibold text-[#113858] underline underline-offset-4"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#113858]/70">
                        Full Name *
                      </label>

                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        placeholder="e.g. Rahul Sharma"
                        className="
                          w-full rounded-[14px] border border-[#113858]/15
                          bg-[#F5F8FA]/60 px-4 py-3 text-[13.5px] text-[#113858]
                          outline-none transition-all placeholder:text-[#607487]/50
                          focus:border-[#113858] focus:bg-white
                        "
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#113858]/70">
                        Company Name *
                      </label>

                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company: e.target.value,
                          })
                        }
                        placeholder="e.g. Infosys, Zomato"
                        className="
                          w-full rounded-[14px] border border-[#113858]/15
                          bg-[#F5F8FA]/60 px-4 py-3 text-[13.5px] text-[#113858]
                          outline-none transition-all placeholder:text-[#607487]/50
                          focus:border-[#113858] focus:bg-white
                        "
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#113858]/70">
                        Work Email *
                      </label>

                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        placeholder="name@company.com"
                        className="
                          w-full rounded-[14px] border border-[#113858]/15
                          bg-[#F5F8FA]/60 px-4 py-3 text-[13.5px] text-[#113858]
                          outline-none transition-all placeholder:text-[#607487]/50
                          focus:border-[#113858] focus:bg-white
                        "
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#113858]/70">
                        Phone Number *
                      </label>

                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+91 98765 43210"
                        className="
                          w-full rounded-[14px] border border-[#113858]/15
                          bg-[#F5F8FA]/60 px-4 py-3 text-[13.5px] text-[#113858]
                          outline-none transition-all placeholder:text-[#607487]/50
                          focus:border-[#113858] focus:bg-white
                        "
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#113858]/70">
                        Garment Category
                      </label>

                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: e.target.value,
                          })
                        }
                        className="
                          w-full rounded-[14px] border border-[#113858]/15
                          bg-[#F5F8FA]/60 px-4 py-3 text-[13.5px] text-[#113858]
                          outline-none transition-all focus:border-[#113858] focus:bg-white
                        "
                      >
                        <option>Polo T-Shirts</option>
                        <option>Round Neck T-Shirts</option>
                        <option>Corporate Shirts</option>
                        <option>Hoodies & Sweatshirts</option>
                        <option>Industrial Uniforms / Aprons</option>
                        <option>Custom Merchandise Kit</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#113858]/70">
                        Estimated Quantity
                      </label>

                      <select
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quantity: e.target.value,
                          })
                        }
                        className="
                          w-full rounded-[14px] border border-[#113858]/15
                          bg-[#F5F8FA]/60 px-4 py-3 text-[13.5px] text-[#113858]
                          outline-none transition-all focus:border-[#113858] focus:bg-white
                        "
                      >
                        <option>50 – 100 pcs</option>
                        <option>100 – 500 pcs</option>
                        <option>500 – 2,000 pcs</option>
                        <option>2,000+ pcs</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#113858]/70">
                      Query Details / Specifications
                    </label>

                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      placeholder="Mention your requirements, preferred colors, delivery timeline, or questions..."
                      className="
                        w-full resize-none rounded-[14px] border border-[#113858]/15
                        bg-[#F5F8FA]/60 px-4 py-3 text-[13.5px] text-[#113858]
                        outline-none transition-all placeholder:text-[#607487]/50
                        focus:border-[#113858] focus:bg-white
                      "
                    />
                  </div>

                  <button
                    type="submit"
                    className="
                      flex h-[48px] w-full items-center justify-center gap-2
                      rounded-[16px] bg-[#113858] px-6 text-[14px] font-semibold
                      text-white shadow-lg shadow-[#113858]/15
                      transition-all duration-200
                      hover:bg-[#1a4a70] active:scale-[0.99]
                    "
                  >
                    <Send size={15} />
                    <span>Send Query</span>
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT: WHY COTTSON */}
            <div className="flex flex-col justify-between border-t border-[#113858]/[0.08] bg-[#113858] p-7 text-white sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Textile Craftsmanship
                </span>

                <h4 className="mt-2 text-[22px] font-bold text-white sm:text-[26px]">
                  Why Cottson Clothing
                </h4>

                <p className="mt-3 text-[13.5px] leading-relaxed text-white/70">
                  With roots tracing back to 1956 in Mumbai's textile mills,
                  Cottson delivers premium custom apparel with precision
                  tailoring, uncompromising fabric durability, and dedicated
                  support.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="rounded-[18px] bg-white/[0.07] p-4 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                      Rapid Turnaround
                    </p>

                    <p className="mt-1 text-[16px] font-bold text-white">
                      7 – 12 Days Delivery
                    </p>

                    <p className="mt-0.5 text-[12px] text-white/60">
                      Fast sampling and dependable bulk deliveries all across
                      India.
                    </p>
                  </div>

                  <div className="rounded-[18px] bg-white/[0.07] p-4 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                      Branding Options
                    </p>

                    <p className="mt-1 text-[16px] font-bold text-white">
                      Embroidery, Screen & HD Printing
                    </p>

                    <p className="mt-0.5 text-[12px] text-white/60">
                      Pantone-matched fabric dyeing and high-definition logo
                      finishing.
                    </p>
                  </div>

                  <div className="rounded-[18px] bg-white/[0.07] p-4 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                      Direct Relationship
                    </p>

                    <p className="mt-1 text-[16px] font-bold text-white">
                      Dedicated Account Lead
                    </p>

                    <p className="mt-0.5 text-[12px] text-white/60">
                      Personalized consultation from sample creation to final
                      delivery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-[12px] text-white/60">
                  Prefer an immediate phone discussion?
                </p>

                <a
                  href="tel:+919892297764"
                  className="mt-1.5 inline-flex items-center gap-2 text-[18px] font-bold text-white hover:text-white/80"
                >
                  <Phone size={18} />
                  <span>+91 9892297764</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
