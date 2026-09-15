import Link from "next/link";

import { Mail, MapPin, Phone } from "lucide-react";
import { mapsDirectionsUrl, venue, whatsappLink } from "@/data/venue";
import { WhatsAppIcon } from "./WhatsAppIcon";

const columns = [
  {
    title: "Navigate",
    links: [
      { label: "Home", to: "/" },
      { label: "Halls", to: "/#halls" },
      { label: "Gallery", to: "/#gallery" },
      { label: "Packages", to: "/#packages" },
      { label: "Stories", to: "/#stories" },
      { label: "Contact", to: "/#contact" },
    ],
  },
  {
    title: "Packages",
    links: [
      { label: "All packages", to: "/#packages" },
      { label: "V hall", to: "/#packages" },
      { label: "N hall", to: "/#packages" },
      { label: "S hall", to: "/#packages" },
      { label: "VNS hall", to: "/#packages" },
    ],
  },
];

const footerPhoneLinks = [
  { href: `tel:${venue.phone}`, label: venue.phoneDisplay },
  { href: `tel:${venue.phoneAlt}`, label: venue.phoneAltDisplay },
].filter(
  (phoneLink, index, phoneLinks) =>
    phoneLinks.findIndex(
      (item) => item.href === phoneLink.href || item.label === phoneLink.label,
    ) === index,
);

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(2,1fr)] lg:gap-12">
          <div>
            <div className="flex min-w-0 items-center gap-3">
              <img
                src="/logo-vns.png"
                alt={`${venue.name} logo`}
                width={244}
                height={218}
                className="h-11 w-auto shrink-0"
              />
              <span>
                <span className="block font-display text-xl tracking-wide">{venue.name}</span>
                <span className="text-[0.6rem] uppercase tracking-[0.24em] text-ivory/60">
                  {venue.tagline}
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/70">
              A purpose-built convention hall for weddings, receptions, corporate events and
              community gatherings - with decoration, catering, guest rooms and coordination handled
              in one place.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-[0.7rem] uppercase tracking-[0.22em] text-gold">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.to}`}>
                    <Link
                      href={link.to}
                      className="text-sm text-ivory/70 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 grid gap-6 border-t border-ivory/15 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          <div className="flex gap-3 text-sm leading-relaxed text-ivory/70">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <address className="not-italic">
              {venue.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            {footerPhoneLinks.map((phoneLink) => (
              <a
                key={phoneLink.href}
                href={phoneLink.href}
                className="flex items-center gap-3 text-ivory/70 hover:text-gold"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                {phoneLink.label}
              </a>
            ))}
          </div>

          <a
            href={`mailto:${venue.email}`}
            className="flex items-center gap-3 break-all text-sm text-ivory/70 hover:text-gold"
          >
            <Mail className="h-4 w-4 shrink-0 text-gold" />
            {venue.email}
          </a>

          <div className="flex flex-col gap-2 text-sm">
            <a
              href={whatsappLink(`Hello ${venue.name}, I have an event enquiry.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-ivory/70 hover:text-gold"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-gold" />
              WhatsApp us
            </a>
            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-ivory/70 hover:text-gold"
            >
              <MapPin className="h-4 w-4 shrink-0 text-gold" />
              Get directions
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-ivory/15 pt-8 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {venue.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold">
              Terms and Conditions
            </Link>
            <Link href="/cancellation-policy" className="hover:text-gold">
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
