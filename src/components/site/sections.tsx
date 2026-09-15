"use client";

import Link from "next/link";
import { useState, type ReactElement } from "react";
import * as Icons from "lucide-react";
import { ArrowRight, Star, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { EnquiryForm } from "./EnquiryForm";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { images, galleryItems } from "@/data/images";
import {
  eventCategories,
  facilities,
  faqs,
  galleryFilters,
  layouts,
  mapsDirectionsUrl,
  mapsEmbedSrc,
  stats,
  testimonials,
  venue,
  whatsappLink,
  whyChooseUs,
} from "@/data/venue";
import { cn } from "@/lib/utils";

function Icon({ name, className }: { name: string; className?: string }) {
  const C = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Sparkles;
  return <C className={className} />;
}

/* ---------------------------------------------------------------- About */

export function AboutVenue() {
  return (
    <Section id="about">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="media-zoom border border-border">
          <img
            src={images.interior}
            alt="Interior of the main convention hall in daylight"
            loading="lazy"
            width={1400}
            height={1000}
            className="h-full w-full object-cover"
          />
        </Reveal>
        <Reveal index={1}>
          <SectionHeading
            eyebrow="About the venue"
            title="Designed for Celebrations That Matter"
            description="Venus Park was built as a dedicated event venue, not a converted banquet room. A column-free main hall, a separate dining floor and on-site guest rooms mean weddings, receptions, family functions, corporate events, exhibitions and community gatherings all run without compromise."
          />
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            One coordinator manages decoration, catering, sound, lighting and guest logistics, so
            families and planners deal with a single point of contact from first enquiry to the
            final send-off.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-3xl text-foreground">{s.value}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <Button asChild variant="ink" size="lg" className="mt-10">
            <Link href="/about">
              More about us <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------- Categories */

export function EventCategories() {
  return (
    <Section tone="sand" id="events">
      <SectionHeading
        eyebrow="What we host"
        title="Every Occasion, Given Room to Breathe"
        description="From 120-guest engagements to 900-delegate conferences, each event type has a layout, package and coordination plan already worked out."
        align="center"
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {eventCategories.map((c, i) => (
          <Reveal key={c.slug} index={i % 3}>
            <article className="card-elegant group flex h-full flex-col overflow-hidden">
              <div className="media-zoom aspect-[4/3]">
                <img
                  src={images[c.image]}
                  alt={`${c.title} at ${venue.name}`}
                  loading="lazy"
                  width={1000}
                  height={750}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Link
                    href={c.href}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:text-gold"
                  >
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/packages"
                    className="text-xs uppercase tracking-[0.16em] text-gold hover:underline"
                  >
                    {c.packageCta}
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------- Facilities */

// Facilities are listed in a grid with icons and notes, no images.
export function Facilities() {
  return (
    <Section id="facilities">
      <SectionHeading
        eyebrow="Facilities"
        title="Everything Your Event Needs, On Site"
        align="center"
      />

      <div className="mt-14 flex flex-wrap justify-center gap-px border border-border bg-border">
        {facilities.map((f, i) => (
          <Reveal
            key={f.title}
            index={i % 4}
            className="h-full w-full sm:w-[calc(50%-0.5px)] lg:w-[calc(25%-0.75px)]"
          >
            <div className="h-full bg-card p-7 transition-colors duration-300 hover:bg-sand">
              <Icon name={f.icon} className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-display text-xl">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- Gallery */

export function Gallery({ compact = false }: { compact?: boolean }) {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);
  const items = galleryItems.filter((g) => filter === "All" || g.category === filter);
  const shown = compact ? items.slice(0, 6) : items;

  return (
    <Section tone="sand" id="gallery">
      <SectionHeading
        eyebrow="Gallery"
        title="Inside Recent Celebrations"
        description="Weddings, receptions, corporate sessions and decoration setups photographed in our halls."
        align="center"
      />

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {galleryFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "border px-4 py-2 text-[0.7rem] uppercase tracking-[0.14em] transition-colors",
              filter === f
                ? "border-gold bg-gold text-ink"
                : "border-border bg-card text-muted-foreground hover:border-gold/60 hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {shown.map((g, i) => (
          <button
            key={g.alt + i}
            type="button"
            onClick={() => setActive(i)}
            className="media-zoom block w-full break-inside-avoid border border-border bg-card"
            aria-label={`Open image: ${g.alt}`}
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className={cn("w-full object-cover", g.tall ? "aspect-[3/4]" : "aspect-[4/3]")}
            />
          </button>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Button asChild variant="gold" size="lg">
          <Link href="/contact">Book a Venue Tour</Link>
        </Button>
        {compact && (
          <Button asChild variant="outline" size="lg">
            <Link href="/gallery">View full gallery</Link>
          </Button>
        )}
      </div>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
          {active !== null && shown[active] && (
            <img src={shown[active].src} alt={shown[active].alt} className="w-full" />
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}

/* ------------------------------------------------------ Layout capacity */

export function LayoutCapacity() {
  return (
    <Section id="layouts">
      <SectionHeading
        eyebrow="Layouts & capacity"
        title="Six Ways to Set the Hall"
        description="Tell us your guest count and event style — we will set the hall to the layout that suits it and show you the setup on your venue tour."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {layouts.map((l, i) => (
          <Reveal key={l.name} index={i % 3}>
            <div className="card-elegant h-full p-7">
              <LayoutDiagram name={l.name} />
              <h3 className="mt-6 font-display text-2xl">{l.name}</h3>
              <p className="mt-2 text-sm text-gold">{l.capacity}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l.best}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function LayoutDiagram({ name }: { name: string }) {
  const dot = "fill-gold/70";
  const rows: Record<string, ReactElement> = {
    "Theatre style": (
      <g>
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3, 4, 5, 6].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={10 + c * 16}
              y={30 + r * 14}
              width={10}
              height={7}
              className={dot}
            />
          )),
        )}
      </g>
    ),
    "Banquet style": (
      <g>
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <circle key={`${r}-${c}`} cx={30 + c * 40} cy={38 + r * 26} r={10} className={dot} />
          )),
        )}
      </g>
    ),
    "Classroom style": (
      <g>
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={14 + c * 40}
              y={30 + r * 16}
              width={30}
              height={8}
              className={dot}
            />
          )),
        )}
      </g>
    ),
    "Reception style": (
      <g>
        {Array.from({ length: 16 }).map((_, i) => (
          <circle
            key={i}
            cx={16 + (i % 6) * 22 + (i % 2) * 6}
            cy={30 + Math.floor(i / 6) * 24}
            r={5}
            className={dot}
          />
        ))}
      </g>
    ),
    "Exhibition style": (
      <g>
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={12 + c * 32}
              y={28 + r * 22}
              width={22}
              height={14}
              className={dot}
            />
          )),
        )}
      </g>
    ),
    "Conference style": (
      <g>
        <rect x={35} y={38} width={70} height={26} className="fill-gold/40" />
        {[0, 1, 2, 3].map((c) => (
          <circle key={"t" + c} cx={45 + c * 17} cy={30} r={5} className={dot} />
        ))}
        {[0, 1, 2, 3].map((c) => (
          <circle key={"b" + c} cx={45 + c * 17} cy={72} r={5} className={dot} />
        ))}
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 140 100" className="h-24 w-full" role="img" aria-label={`${name} diagram`}>
      <rect x={1} y={1} width={138} height={98} className="fill-sand stroke-border" />
      <rect x={40} y={6} width={60} height={9} className="fill-ink/80" />
      {rows[name]}
    </svg>
  );
}

/* --------------------------------------------------------- Why choose us */

export function WhyChooseUs() {
  return (
    <Section tone="ink">
      <SectionHeading
        eyebrow="Why choose us"
        title="Reasons Families and Companies Come Back"
        align="center"
        light
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((w, i) => (
          <Reveal key={w.title} index={i % 3}>
            <div className="h-full border border-ivory/15 p-8 transition-colors duration-300 hover:border-gold/60">
              <Icon name={w.icon} className="h-6 w-6 text-gold" />
              <h3 className="mt-5 font-display text-2xl text-ivory">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/70">{w.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------------------------------- Testimonials */

export function Testimonials({ compact = false }: { compact?: boolean }) {
  const list = compact ? testimonials.slice(0, 3) : testimonials;
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Testimonials"
        title="What Our Clients Say"
        description="Reviews from couples, families, colleges and companies who have hosted with us."
        align="center"
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {list.map((t, i) => (
          <Reveal key={t.name} index={i % 3}>
            <figure className="card-elegant flex h-full flex-col p-8">
              <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-xl leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sand font-display text-lg text-gold">
                  {t.name.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{t.name}</span>
                  <span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {t.event}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button asChild variant="outline" size="lg">
          <a href={venue.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
            Read our Google Reviews
          </a>
        </Button>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------- Availability */

export function AvailabilitySection({ defaultPackage }: { defaultPackage?: string }) {
  return (
    <Section tone="sand" id="availability">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Check availability"
            title="Is Your Date Free?"
            description="Send us your date, guest count and preferred package. We will confirm availability and hold the date provisionally while you decide."
          />
          <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <Icons.CalendarCheck className="h-5 w-5 shrink-0 text-gold" />
              Weekend dates in peak season book 9–12 months ahead.
            </li>
            <li className="flex gap-3">
              <Icons.BadgePercent className="h-5 w-5 shrink-0 text-gold" />
              Weekday bookings carry reduced rates for schools and businesses.
            </li>
            <li className="flex gap-3">
              <Icons.MessageSquare className="h-5 w-5 shrink-0 text-gold" />
              Our event team will confirm availability shortly — usually the same working day.
            </li>
          </ul>
        </div>
        <EnquiryForm
          id="availability-form"
          variant="availability"
          submitLabel="Enquiry"
          defaultPackage={defaultPackage}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- Showcase */

export function Showcase() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <img
        src={images.hero}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="eyebrow">This month</p>
        <h2 className="mt-4 text-3xl text-ivory sm:text-4xl lg:text-5xl">
          Visit Our Venue Showcase
        </h2>
        <p className="mt-5 text-base leading-relaxed text-ivory/75">
          Tour the hall, explore decoration options, review catering packages and speak directly
          with our event team.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild variant="gold" size="xl">
            <Link href="/contact">Reserve Your Visit</Link>
          </Button>
          <Button asChild variant="outlineLight" size="xl">
            <a
              href={whatsappLink(`Hello ${venue.name}, I'd like to visit the venue showcase.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="h-4 w-4" /> Contact on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FAQ */

export function FAQSection({ limit }: { limit?: number }) {
  const list = limit ? faqs.slice(0, limit) : faqs;
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions We Are Asked Most"
          description="Cannot find your answer? Call us or send a WhatsApp message — we reply within working hours."
        />
        <Accordion type="single" collapsible className="w-full">
          {list.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-display text-lg">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {limit && (
        <div className="mt-10 lg:pl-[calc(0.4*100%)]">
          <Button asChild variant="outline">
            <Link href="/faq">See all questions</Link>
          </Button>
        </div>
      )}
    </Section>
  );
}

/* -------------------------------------------------------------- Contact */

export function ContactSection() {
  return (
    <Section tone="sand" id="contact">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Speak to Our Event Team"
            description="Call, message or visit us. We will talk through your date, guest count and budget before you commit to anything."
          />
          <div className="mt-10 space-y-6 text-sm">
            <div className="flex gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <address className="not-italic leading-relaxed text-muted-foreground">
                {venue.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <a href={`tel:${venue.phone}`} className="hover:text-gold">
                {venue.phoneDisplay}
              </a>
            </div>
            <div className="flex gap-4">
              <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <a
                href={whatsappLink(`Hello ${venue.name}, I have an event enquiry.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                WhatsApp {venue.phoneDisplay}
              </a>
            </div>
            <div className="flex gap-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <a href={`mailto:${venue.email}`} className="break-all hover:text-gold">
                {venue.email}
              </a>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <dl className="space-y-1 text-muted-foreground">
                {venue.hours.map((h) => (
                  <div key={h.day} className="flex flex-wrap gap-x-3">
                    <dt className="font-medium text-foreground">{h.day}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="gold">
              <a href={`tel:${venue.phone}`}>
                <Phone /> Call Now
              </a>
            </Button>
            <Button asChild variant="whatsapp">
              <a
                href={whatsappLink(`Hello ${venue.name}, I have an event enquiry.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin /> Get Directions
              </a>
            </Button>
            <Button asChild variant="ink">
              <Link href="/booking">Schedule a Visit</Link>
            </Button>
          </div>

          <div className="mt-10 border border-border">
            <iframe
              title={`Map showing ${venue.name}`}
              src={mapsEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full"
            />
          </div>
        </div>

        <EnquiryForm id="contact-form" />
      </div>
    </Section>
  );
}
