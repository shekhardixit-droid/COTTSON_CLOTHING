import { useState } from "react";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products", dropdown: true },
  { label: "Customisation", href: "#customise" },
  { label: "Clients", href: "#clients" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="relative mx-auto max-w-[1120px]">
        {/* Floating pill */}
        <div
          className="
            flex h-[56px] items-center justify-between
            rounded-full bg-[#113858]
            py-[8px] pl-6 pr-[9px]
            shadow-[0_8px_30px_rgba(17,56,88,0.15)]
          "
        >
          {/* Logo */}
          <a
            href="#home"
            className="
              shrink-0 text-[18px] font-bold
              leading-none tracking-[-0.045em] text-white
            "
          >
            COTTSON
            <span className="text-white/45">.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-[25px] lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
                  group flex h-9 items-center gap-[4px]
                  whitespace-nowrap text-[12.5px]
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
                    className="
                      opacity-70 transition-transform
                      duration-200 group-hover:rotate-180
                    "
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-[6px] lg:flex">
            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="
                flex h-[40px] w-[40px]
                items-center justify-center rounded-full
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
                relative flex h-[40px] w-[40px]
                items-center justify-center rounded-full
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
                ml-[2px] flex h-[40px]
                items-center justify-center
                whitespace-nowrap rounded-full
                bg-white px-[19px]
                text-[11.5px] font-semibold
                tracking-[-0.01em] text-[#113858]
                transition duration-200
                hover:bg-[#F2F6F9]
                active:scale-[0.98]
              "
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-[6px] lg:hidden">
            {/* Mobile Search */}
            <button
              type="button"
              aria-label="Search"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full bg-white text-[#113858]
              "
            >
              <Search size={16} strokeWidth={2} />
            </button>

            {/* Mobile Menu */}
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full bg-white text-[#113858]
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
            absolute left-0 right-0 top-[64px]
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
          <nav className="p-3">
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