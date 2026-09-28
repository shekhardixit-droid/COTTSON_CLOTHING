import Link from "next/link";
import Image from "next/image";
import type { SVGProps } from "react";

const WHATSAPP = "https://wa.me/919892297764?text=Hi%2C%20I%20have%20a%20requirement";
const ADDRESS = "No. 721, Centura Square IT Park, Road No. 27, Wagle Estate, Thane (W) - 400604, Maharashtra, India";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const PAGES = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Customisation", "/studio"],
  ["Clients", "/clients"],
  ["About Us", "/about"],
  ["Resources", "/resources"],
  ["Contact Us", "#contact"],
];

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" />
      <circle cx="7.5" cy="7.2" r="0.6" fill="currentColor" />
      <path d="M11.5 16.5v-4c0-1.2.9-2 2-2s2 .8 2 2v4" />
      <line x1="11.5" y1="10.7" x2="11.5" y2="16.5" />
    </svg>
  );
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2Z" />
    </svg>
  );
}

function PinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M12 21s7-6.5 7-11.5a7 7 0 1 0-14 0C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

const SOCIAL = [
  ["Instagram", "#", InstagramIcon],
  ["Youtube", "#", YoutubeIcon],
  ["LinkedIn", "#", LinkedinIcon],
] as const;

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-24 scroll-mt-24 bg-brand text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" className="flex w-fit items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-background" aria-hidden />
            <span className="text-lg font-extrabold uppercase leading-tight tracking-tight">
              Cottson
              <br />
              Clothing
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed opacity-75">
            Custom corporate clothing for Mumbai, Thane &amp; Navi Mumbai companies. Branded T-shirts, polos and
            shirts, delivered in 7–10 days.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIAL.map(([label, href, Icon]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-brand-accent"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="text-xs font-semibold uppercase tracking-wider opacity-60">Pages</div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {PAGES.map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="opacity-80 transition-opacity hover:opacity-100">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="pl-[26px] text-xs font-semibold uppercase tracking-wider opacity-60">Location</div>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 grid grid-cols-[16px_1fr] items-start gap-x-2.5 text-sm opacity-80 transition-opacity hover:opacity-100"
          >
            <PinIcon className="mt-0.5 size-4 opacity-60" />
            <span>Registered Office {ADDRESS}.</span>
          </a>
        </div>

        <div className="lg:col-span-3">
          <div className="pl-[26px] text-xs font-semibold uppercase tracking-wider opacity-60">Get in Touch</div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="grid grid-cols-[16px_1fr] items-start gap-x-2.5">
              <MailIcon className="mt-0.5 size-4 opacity-60" />
              <a href="mailto:contact@cottson.com" className="opacity-80 transition-opacity hover:opacity-100">
                contact@cottson.com
              </a>
            </li>
            <li className="grid grid-cols-[16px_1fr] items-start gap-x-2.5 opacity-80">
              <PhoneIcon className="mt-0.5 size-4 opacity-60" />
              <span>
                <a href="tel:+919892297764" className="transition-opacity hover:opacity-100">
                  +91 98922 97764
                </a>{" "}
                / 022 26627501
              </span>
            </li>
          </ul>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-[26px] mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-background px-6 text-sm font-semibold text-brand shadow-sm transition-colors hover:bg-background/90"
          >
            <Image src="/whatsapp.png" alt="" width={20} height={20} className="size-5" />
            WhatsApp Us
          </a>
        </div>
      </div>

      <div className="border-t border-background/15 bg-black/10 px-4 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center text-xs opacity-70 sm:flex-row sm:text-left">
          <span>© {new Date().getFullYear()} by Cottson Clothing. All Rights Reserved</span>
          <span className="text-sm text-background opacity-100">
            Proudly designed by{" "}
            <a
              href="https://app.datacircles.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold italic underline underline-offset-2"
            >
              DataCircles Technology
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
