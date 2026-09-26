import { useState } from "react";
import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "#products", dropdown: true },
  { label: "Customisation", href: "#customise" },
  { label: "Clients", href: "/clients" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-4 md:px-6">
      <div className="relative mx-auto w-full max-w-[1120px]">
        {/* Floating pill */}
        <div
          className="
            flex min-h-[52px] w-full min-w-0 items-center justify-between
            gap-2 rounded-full bg-[#113858]
            py-2 pl-3.5 pr-1.5
            sm:min-h-[56px] sm:pl-5 sm:pr-2
            md:pl-6 md:pr-[9px]
            shadow-[0_8px_30px_rgba(17,56,88,0.15)]
          "
        >
          {/* Logo */}
          <a href="#home" className="flex min-w-0 shrink items-center">
            <img
              src="/cottson.png"
              alt="COTTSON"
              className="h-8 w-auto max-w-[110px] object-contain brightness-0 invert sm:h-9 sm:max-w-[130px] md:h-10 md:max-w-[150px]"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 xl:flex 2xl:gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
                  group flex h-9 shrink-0 items-center gap-1
                  whitespace-nowrap text-[clamp(12px,0.95vw,15px)]
                  font-medium tracking-[-0.01em]
                  text-white/75
                  transition-colors duration-200
                  hover:text-white
                "
              >
                {item.label}
                {item.dropdown && (
                  <ChevronDown
                    size={12}
                    strokeWidth={2}
                    className="opacity-70 transition-transform duration-200 group-hover:rotate-180"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-1.5 xl:flex">
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
              <Search size={16} strokeWidth={2} />
            </button>

            {/* Shopping bag */}
            <button
              type="button"
              aria-label="Shopping bag"
              className="
                relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                bg-white text-[#113858]
                transition duration-200
                hover:bg-[#F2F6F9]
                active:scale-95
              "
            >
              <ShoppingBag size={16} strokeWidth={2} />
              <span
                className="
                  absolute -right-[1px] -top-[2px]
                  flex h-[14px] min-w-[14px]
                  items-center justify-center
                  rounded-full border-2 border-[#113858]
                  bg-white px-[2px]
                  text-[7px] font-bold text-[#113858]
                "
              >
                0
              </span>
            </button>

            {/* Get a Quote */}
            <a
              href="#quote"
              className="
                ml-0.5 flex h-9 shrink-0 items-center justify-center
                whitespace-nowrap rounded-full
                bg-white px-4
                text-[clamp(10px,0.85vw,11.5px)] font-semibold
                tracking-[-0.01em] text-[#113858]
                transition duration-200
                hover:bg-[#F2F6F9]
                active:scale-[0.98]
              "
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile: logo + menu button only */}
          <div className="flex shrink-0 items-center xl:hidden">
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
            transition-all duration-300 xl:hidden
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
                  flex min-h-[44px] items-center
                  justify-between rounded-xl px-3
                  text-[13.5px] font-medium
                  text-white/80 transition
                  hover:bg-white/10 hover:text-white
                "
              >
                {item.label}
                {item.dropdown && <ChevronDown size={14} />}
              </a>
            ))}

            {/* Search + Bag inside mobile menu since header only shows logo + menu */}
            <div className="mt-2 flex items-center gap-2 px-1">
              <button
                type="button"
                aria-label="Search"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 text-[13px] font-medium text-white transition hover:bg-white/15"
              >
                <Search size={15} strokeWidth={2} />
                Search
              </button>
              <button
                type="button"
                aria-label="Shopping bag"
                className="relative flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 text-[13px] font-medium text-white transition hover:bg-white/15"
              >
                <ShoppingBag size={15} strokeWidth={2} />
                Bag
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-[#113858]">
                  0
                </span>
              </button>
            </div>

            <a
              href="#quote"
              onClick={() => setMenuOpen(false)}
              className="
                mt-3 flex h-[43px]
                items-center justify-center rounded-full
                bg-white text-[12px] font-semibold
                text-[#113858]
              "
            >
              Get a Quote
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}