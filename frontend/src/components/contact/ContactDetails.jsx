import { Mail, Phone, MapPin } from "lucide-react";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@cottson.com",
    href: "mailto:hello@cottson.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 00000 00000",
    href: "tel:+910000000000",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Mumbai, Maharashtra, India",
    href: "#",
  },
];

export default function ContactDetails() {
  return (
    <section id="query" className="bg-white px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1120px] gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">

        {/* =====================================================
            LEFT — CONTACT DETAILS
        ====================================================== */}
        <div className="rounded-[28px]  bg-white p-8 sm:p-10 lg:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#607487]">
            Get in touch
          </p>

          <h2 className="mt-4 text-[42px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#113858] sm:text-[54px]">
            Let&apos;s start a
            <br />
            conversation.
          </h2>

          <div className="mt-12 space-y-8">
            {contactDetails.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5F8FA] text-[#113858] transition-colors duration-300 group-hover:bg-[#113858] group-hover:text-white">
                    <Icon size={18} strokeWidth={1.6} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#607487]">
                      {item.label}
                    </p>

                    <p className="mt-1 text-[16px] font-medium text-[#113858] sm:text-[18px]">
                      {item.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            RIGHT — CONTACT FORM
        ====================================================== */}
        <div className="rounded-[28px] bg-[#113858] p-8 sm:p-10 lg:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Send a query
          </p>

          <h3 className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.035em] text-white sm:text-[40px]">
            Tell us what you&apos;re looking for.
          </h3>

          <form className="mt-10">
            {/* First Name + Last Name */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="border-b border-white/20">
                <label
                  htmlFor="firstName"
                  className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  className="
                    mt-2 w-full bg-transparent py-3
                    text-[16px] text-white
                    outline-none
                    placeholder:text-white/40
                  "
                />
              </div>

              <div className="border-b border-white/20">
                <label
                  htmlFor="lastName"
                  className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60"
                >
                  Last Name
                </label>

                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  className="
                    mt-2 w-full bg-transparent py-3
                    text-[16px] text-white
                    outline-none
                    placeholder:text-white/40
                  "
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="border-b border-white/20">
                <label
                  htmlFor="email"
                  className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  className="
                    mt-2 w-full bg-transparent py-3
                    text-[16px] text-white
                    outline-none
                    placeholder:text-white/40
                  "
                />
              </div>

              <div className="border-b border-white/20">
                <label
                  htmlFor="phone"
                  className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone number"
                  className="
                    mt-2 w-full bg-transparent py-3
                    text-[16px] text-white
                    outline-none
                    placeholder:text-white/40
                  "
                />
              </div>
            </div>

            {/* Message */}
            <div className="mt-7 border-b border-white/20">
              <label
                htmlFor="message"
                className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60"
              >
                Message
              </label>

              <textarea
                id="message"
                rows="5"
                placeholder="Tell us about your requirement..."
                className="
                  mt-2 w-full resize-none bg-transparent py-3
                  text-[16px] text-white
                  outline-none
                  placeholder:text-white/40
                "
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="
                mt-9 inline-flex h-[54px] min-w-[180px]
                items-center justify-center
                rounded-full
                bg-white
                px-8
                text-[13px] font-semibold uppercase tracking-[0.08em]
                text-[#113858]
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-[#F5F8FA]
              "
            >
              Send Query
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}