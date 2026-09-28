"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useCart, cartCount } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

// Tracks an element's natural in-flow top and reports once the page has scrolled
// past it — so the caller can switch the element to `fixed` and keep it floating
// at the top, without it being fixed from the very start.
function useFloatOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [floating, setFloating] = useState(false);
  const originalTopRef = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el || floating) return;
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) originalTopRef.current = rect.top + window.scrollY;
    };
    const onScroll = () => {
      if (originalTopRef.current == null) measure();
      if (originalTopRef.current != null) setFloating(window.scrollY > originalTopRef.current - 16);
    };
    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [floating]);

  return { ref, floating };
}

const WHATSAPP = "https://wa.me/919892297764?text=Hi%2C%20I%20have%20a%20requirement";

const NAV = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Clients", "/clients"],
  ["About Us", "/about"],
  ["Resources", "/resources"],
  ["Contact Us", "/#contact"],
];

// The cart lives in localStorage, so only show its count after hydration
const useMounted = () => useSyncExternalStore(() => () => {}, () => true, () => false);

export function SiteHeader() {
  const items = useCart((s) => s.items);
  const mounted = useMounted();
  const count = mounted ? cartCount(items) : 0;
  const pathname = usePathname();
  const nav = useFloatOnScroll<HTMLElement>();
  const logo = useFloatOnScroll<HTMLAnchorElement>();

  return (
    <header className="bg-background">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
        {/* Placeholder keeps the nav/icons from jumping once the logo below goes fixed */}
        {logo.floating && (
          <div className="flex shrink-0 items-center gap-2.5" style={{ visibility: "hidden" }}>
            <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-brand" aria-hidden />
            <span className="text-lg font-extrabold uppercase leading-tight tracking-tight">
              Cottson
              <br />
              Clothing
            </span>
          </div>
        )}
        {logo.floating ? (
          <div className="pointer-events-none fixed inset-x-0 top-4 z-40">
            <div className="mx-auto max-w-7xl px-4">
              <Link ref={logo.ref} href="/" className="pointer-events-auto flex w-fit shrink-0 items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-brand" aria-hidden />
                <span className="text-lg font-extrabold uppercase leading-tight tracking-tight text-brand">
                  Cottson
                  <br />
                  Clothing
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <Link ref={logo.ref} href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-brand" aria-hidden />
            <span className="text-lg font-extrabold uppercase leading-tight tracking-tight text-brand">
              Cottson
              <br />
              Clothing
            </span>
          </Link>
        )}

        {/* Placeholder keeps the logo/icons from jumping once the real nav below goes fixed */}
        {nav.floating && (
          <div className="mx-auto hidden w-fit lg:block" style={{ visibility: "hidden" }}>
            <nav className="flex items-center gap-1 rounded-full bg-brand px-2 py-1.5">
              {NAV.map(([label]) => (
                <span key={label} className="whitespace-nowrap px-4 py-2 text-sm font-medium">
                  {label}
                </span>
              ))}
            </nav>
          </div>
        )}

        <nav
          ref={nav.ref}
          className={cn(
            "hidden w-fit items-center gap-1 rounded-full bg-brand px-2 py-1.5 lg:flex",
            nav.floating ? "fixed left-1/2 top-4 z-40 -translate-x-1/2 shadow-lg" : "absolute left-1/2 top-3 -translate-x-1/2"
          )}
        >
          {NAV.map(([label, href]) => {
            const active = href === "/" ? pathname === "/" : pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "bg-background text-brand" : "text-background/90 hover:bg-background/10"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-4">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="grid size-10 place-items-center overflow-hidden hover:opacity-80"
          >
            <Image src="/whatsapp.png" alt="WhatsApp" width={40} height={40} className="size-10 scale-125" />
          </a>
          <Link href="/cart" className="relative grid size-10 place-items-center hover:opacity-80" aria-label={`Basket, ${count} items`}>
            <Image src="/cart.png" alt="Cart" width={40} height={40} className="size-10" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-brand-accent text-[9px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
