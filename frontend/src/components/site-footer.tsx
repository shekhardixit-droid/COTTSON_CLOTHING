import Link from "next/link";
import Image from "next/image";
import type { SVGProps } from "react";

const WHATSAPP = "https://wa.me/919892297764?text=Hi%2C%20I%20have%20a%20requirement";

const PAGES = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Customisation", "/studio"],
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

const SOCIAL = [
  ["Instagram", "#", InstagramIcon],
  ["Youtube", "#", YoutubeIcon],
  ["LinkedIn", "#", LinkedinIcon],
] as const;

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-24 scroll-mt-24 bg-brand text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="text-lg font-bold tracking-[0.2em]">COTTSON</div>
          <p className="mt-3 max-w-xs text-sm opacity-75">
            Custom corporate clothing for Mumbai, Thane &amp; Navi Mumbai companies. Branded T-shirts, polos and
            shirts, delivered in 7–10 days.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIAL.map(([label, href, Icon]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-background/20"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider opacity-60">Pages</div>
          <ul className="mt-3 space-y-2 text-sm">
            {PAGES.map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="opacity-80 transition-opacity hover:opacity-100">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider opacity-60">Location</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="mailto:contact@cottson.com" className="opacity-80 transition-opacity hover:opacity-100">
                contact@cottson.com
              </a>
            </li>
            <li className="opacity-80">
              <a href="tel:+919892297764" className="transition-opacity hover:opacity-100">
                +91 98922 97764
              </a>{" "}
              / 022 26627501
            </li>
            <li className="opacity-80">
              Registered Office No. 721, Centura Square IT Park, Road No. 27, Wagle Estate, Thane (W) - 400604,
              Maharashtra, India.
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider opacity-60">Contact our team</div>
          <p className="mt-3 text-sm opacity-80">Tell us about your requirement</p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex h-10 items-center gap-2 rounded-full bg-background px-5 text-sm font-semibold text-brand transition-colors hover:bg-background/90"
          >
            <Image src="/whatsapp.png" alt="" width={20} height={20} className="size-5" />
            WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-background/15 px-4 py-5 text-xs opacity-70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
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
