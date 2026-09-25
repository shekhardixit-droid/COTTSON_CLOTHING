const pageLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Customisation", href: "#customise" },
  { label: "Clients", href: "#clients" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "WhatsApp", href: "#" },
];

function Footer() {
  return (
    <footer
      id="contact"
      className="
        bg-[#113858]
        px-3
        pb-3
        pt-3

        sm:px-5
        sm:pb-5
        sm:pt-5

        lg:px-10
        lg:pb-10
        lg:pt-10
      "
    >
      <div
        className="
          mx-auto
          max-w-[1450px]
          overflow-hidden
          rounded-[28px]
          bg-white

          sm:rounded-[32px]
          lg:rounded-[40px]
        "
      >
        {/* MAIN FOOTER */}
        <div
          className="
            grid
            gap-12
            px-6
            pb-12
            pt-12

            sm:px-9
            sm:py-14

            md:grid-cols-2

            lg:grid-cols-[0.7fr_1.15fr_0.75fr_1fr]
            lg:gap-14
            lg:px-12
            lg:py-16

            xl:px-16
          "
        >
          {/* PAGES */}
          <div>
            <p
              className="
                mb-6
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#113858]/45
              "
            >
              Pages
            </p>

            <nav className="flex flex-col items-start gap-[11px]">
              {pageLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="
                    text-[12.5px]
                    font-medium
                    text-[#113858]/70

                    transition-all
                    duration-200

                    hover:translate-x-[3px]
                    hover:text-[#113858]
                  "
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div>
            <p
              className="
                mb-6
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#113858]/45
              "
            >
              Contact
            </p>

            <div className="flex flex-col gap-6">
              {/* EMAIL */}
              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#607487]
                  "
                >
                  Email
                </p>

                <a
                  href="mailto:contact@cottson.com"
                  className="
                    mt-1.5
                    inline-block
                    text-[12.5px]
                    font-medium
                    text-[#113858]

                    transition-opacity
                    duration-200

                    hover:opacity-60
                  "
                >
                  contact@cottson.com
                </a>
              </div>

              {/* PHONE */}
              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#607487]
                  "
                >
                  Call
                </p>

                <div
                  className="
                    mt-1.5
                    flex
                    flex-col
                    gap-1
                  "
                >
                  <a
                    href="tel:+919892297764"
                    className="
                      text-[12.5px]
                      font-medium
                      text-[#113858]

                      transition-opacity
                      duration-200

                      hover:opacity-60
                    "
                  >
                    +91 9892297764
                  </a>

                  <a
                    href="tel:02226627501"
                    className="
                      text-[12.5px]
                      font-medium
                      text-[#113858]

                      transition-opacity
                      duration-200

                      hover:opacity-60
                    "
                  >
                    022 26627501
                  </a>
                </div>
              </div>

              {/* ADDRESS */}
              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#607487]
                  "
                >
                  Registered Office
                </p>

                <p
                  className="
                    mt-1.5
                    max-w-[300px]

                    text-[11.5px]
                    leading-[1.75]
                    text-[#113858]/65
                  "
                >
                  No. 721, Centura Square IT Park,
                  Road No. 27, Wagle Estate,
                  Thane (W) - 400604,
                  Maharashtra, India.
                </p>
              </div>
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <p
              className="
                mb-6
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#113858]/45
              "
            >
              Social
            </p>

            <div
              className="
                flex
                flex-col
                items-start
                gap-[11px]
              "
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    text-[12.5px]
                    font-medium
                    text-[#113858]/70

                    transition-all
                    duration-200

                    hover:translate-x-[3px]
                    hover:text-[#113858]
                  "
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA + LOGO */}
          <div>
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#113858]/45
              "
            >
              Let's work together
            </p>

            <h3
              className="
                mt-4
                max-w-[320px]

                text-[25px]
                font-semibold
                leading-[1.12]
                tracking-[-0.04em]
                text-[#113858]

                lg:text-[28px]
              "
            >
              Ready to dress
              <span className="text-[#113858]/45">
                {" "}your team?
              </span>
            </h3>

            <p
              className="
                mt-4
                max-w-[300px]

                text-[11.5px]
                leading-[1.75]
                text-[#607487]
              "
            >
              Tell us what you're looking for and we'll help
              you create the right corporate apparel.
            </p>

            {/* WHATSAPP BUTTON */}
            <a
              href="#contact"
              className="
                mt-6

                inline-flex
                h-[44px]
                items-center
                justify-center

                rounded-full

                border
                border-[#113858]

                bg-[#113858]

                px-6

                text-[11.5px]
                font-semibold
                text-white

                transition-all
                duration-300

                hover:-translate-y-[2px]
                hover:bg-white
                hover:text-[#113858]

                hover:shadow-[0_8px_22px_rgba(17,56,88,0.10)]
              "
            >
              WhatsApp Us
            </a>

            {/* LOGO */}
            <div className="mt-9">
              <img
                src="/images/logo/cottson-logo.png"
                alt="Cottson Clothing"
                className="
                  h-auto
                  w-[190px]
                  object-contain

                  sm:w-[210px]
                "
              />
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div
          className="
            px-6

            sm:px-9
            lg:px-12
            xl:px-16
          "
        >
          <div className="h-px w-full bg-[#113858]/10" />

          {/* BOTTOM BAR */}
          <div
            className="
              flex
              flex-col
              gap-4
              py-6

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p
              className="
                text-[10.5px]
                font-medium
                text-[#607487]
              "
            >
              © {new Date().getFullYear()} Cottson Clothing.
              All rights reserved.
            </p>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-2
              "
            >
              <a
                href="#"
                className="
                  text-[10.5px]
                  font-medium
                  text-[#607487]

                  transition-colors
                  duration-200

                  hover:text-[#113858]
                "
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="
                  text-[10.5px]
                  font-medium
                  text-[#607487]

                  transition-colors
                  duration-200

                  hover:text-[#113858]
                "
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM TEXT */}
      <div
        className="
          mx-auto
          flex
          max-w-[1450px]
          justify-center
          py-5
        "
      >
        <p
          className="
            text-center
            text-[9px]
            font-medium
            uppercase
            tracking-[0.16em]
            text-white/40
          "
        >
          Custom corporate clothing for modern teams
        </p>
      </div>
    </footer>
  );
}

export default Footer;