import { useState, useEffect } from "react";
import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "#products", dropdown: true },
  { label: "Clients", href: "/clients" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50 px-3 sm:px-4 md:px-6
        transition-all duration-300 ease-out
        ${isScrolled ? "pt-2 sm:pt-2.5" : "pt-3.5 sm:pt-4"}
      `}
    >
      {/* Outer container — width reduces to 80% on scroll */}
      <div
        className={`
          relative mx-auto transition-all duration-300 ease-out
          ${
            isScrolled
              ? "w-[80%] max-w-[940px]"
              : "w-full max-w-[1140px]"
          }
        `}
      >
        {/* Floating pill — maintains full actual size, no shrinking of fonts or buttons */}
        <div
          className={`
            flex min-h-[56px] sm:min-h-[58px] w-full items-center justify-between
            gap-3 rounded-full bg-[#113858]
            py-2 pl-4 pr-2
            sm:pl-5 sm:pr-2.5
            md:pl-6 md:pr-3
            transition-all duration-300 ease-out
            ${
              isScrolled
                ? "shadow-[0_12px_35px_rgba(17,56,88,0.28)]"
                : "shadow-[0_8px_30px_rgba(17,56,88,0.18)]"
            }
          `}
        >
          {/* Logo — constant actual size */}
          <a href="#home" className="flex min-w-0 shrink-0 items-center">
            <img
              src="/cottson.png"
              alt="COTTSON"
              decoding="async"
              className="h-8 w-auto sm:h-9 max-w-[125px] sm:max-w-[140px] object-contain brightness-0 invert"
            />
          </a>

          {/* Desktop nav — constant actual font size, proportional spacing */}
          <nav className="hidden items-center justify-center gap-4 lg:flex lg:gap-5 xl:gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
                  group flex h-9 shrink-0 items-center gap-1.5
                  whitespace-nowrap text-[14px] xl:text-[14.5px]
                  font-semibold tracking-[-0.01em]
                  text-white/85
                  transition-colors duration-200
                  hover:text-white
                "
              >
                <span>{item.label}</span>
                {item.dropdown && (
                  <ChevronDown
                    size={13}
                    strokeWidth={2.4}
                    className="opacity-75 transition-transform duration-200 group-hover:rotate-180 group-hover:opacity-100"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Desktop actions — constant actual size */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="
                flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                bg-white text-[#113858]
                transition duration-200
                hover:bg-[#F2F6F9]
                active:scale-95
              "
            >
              <Search size={15} strokeWidth={2.2} />
            </button>

            {/* Enquiry */}
            <a
              href="#contact"
              aria-label="Enquiry"
              className="
                flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                bg-white text-[#113858]
                transition duration-200
                hover:bg-[#F2F6F9]
                active:scale-95
              "
            >
              <ShoppingBag size={15} strokeWidth={2.2} />
            </a>

            {/* Get a Quote */}
            <a
              href="#quote"
              className="
                ml-1 flex h-[38px] shrink-0 items-center justify-center
                whitespace-nowrap rounded-full
                bg-white px-5
                text-[13px] font-bold
                tracking-[-0.01em] !text-[#113858] text-[#113858]
                shadow-xs
                transition duration-200
                hover:bg-[#F2F6F9] hover:shadow-sm
                active:scale-[0.98]
              "
              style={{ color: "#113858" }}
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile: logo + menu button only (< lg) */}
          <div className="flex shrink-0 items-center lg:hidden">
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
              className="
                flex h-9 w-9 shrink-0 items-center justify-center
                rounded-full bg-white text-[#113858]
                sm:h-10 sm:w-10
                transition active:scale-95
              "
            >
              {menuOpen ? (
                <X size={18} strokeWidth={2} />
              ) : (
                <Menu size={18} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`
            absolute left-0 right-0 top-[calc(100%+8px)]
            overflow-hidden rounded-[22px]
            bg-[#113858]
            shadow-[0_16px_45px_rgba(17,56,88,0.18)]
            transition-all duration-300 lg:hidden
            ${
              menuOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-2 opacity-0"
            }
          `}
        >
          <nav className="max-h-[70vh] overflow-y-auto p-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="
                  flex min-h-[46px] items-center
                  justify-between rounded-xl px-3.5
                  text-[14.5px] font-semibold
                  text-white/85 transition
                  hover:bg-white/10 hover:text-white
                "
              >
                {item.label}
                {item.dropdown && <ChevronDown size={15} />}
              </a>
            ))}

            {/* Search + Bag inside mobile menu */}
            <div className="mt-2 flex items-center gap-2 px-1">
              <button
                type="button"
                aria-label="Search"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 text-[13.5px] font-medium text-white transition hover:bg-white/15"
              >
                <Search size={16} strokeWidth={2.2} />
                Search
              </button>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                aria-label="Enquiry"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 text-[13.5px] font-medium text-white transition hover:bg-white/15"
              >
                <ShoppingBag size={16} strokeWidth={2.2} />
                Enquiry
              </a>
            </div>

            <a
              href="#quote"
              onClick={() => setMenuOpen(false)}
              className="
                mt-3 flex h-[44px]
                items-center justify-center rounded-full
                bg-white text-[13.5px] font-bold
                !text-[#113858] text-[#113858]
              "
              style={{ color: "#113858" }}
            >
              Get a Quote
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}