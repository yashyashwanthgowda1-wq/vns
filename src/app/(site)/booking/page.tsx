import type { Metadata } from "next";
import { CalendarCheck, Clock, Mail, MapPin, Phone, Sparkles } from "lucide-react";

import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero } from "@/components/site/Section";
import { VenueGallery } from "@/components/site/VenueGallery";
import { Button } from "@/components/ui/button";
import { images } from "@/data/images";
import { getVenueGallery } from "@/data/venue-galleries";
import { mapsDirectionsUrl, venue, whatsappLink } from "@/data/venue";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

const allowedPackages = new Set(["Silver", "Gold", "Platinum", "Diamond", "Not sure"]);
const packageAliases: Record<string, string> = {
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
  diamond: "Diamond",
  "not-sure": "Not sure",
};

export const metadata: Metadata = {
  title: "Book Your Celebration | Venus Park",
  description:
    "Send your event type, date, guest count and package preference. Venus Park coordinators will confirm availability and follow up within 24 hours.",
  openGraph: {
    title: "Book Your Celebration - Venus Park",
    description:
      "Share your event details and our coordinators will help reserve the right hall and package.",
    url: "/booking",
  },
  alternates: { canonical: "/booking" },
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string; pkg?: string; hall?: string }>;
}) {
  const params = await searchParams;
  const requestedPackage = params.package ?? params.pkg;
  const selectedGallery = getVenueGallery(params.hall, requestedPackage);
  const normalizedPackage = requestedPackage
    ? (packageAliases[requestedPackage.toLowerCase()] ?? requestedPackage)
    : undefined;
  const defaultPackage =
    normalizedPackage && allowedPackages.has(normalizedPackage) ? normalizedPackage : undefined;

  return (
    <>
      {selectedGallery && <VenueGallery gallery={selectedGallery} />}

      <PageHero
        eyebrow="Begin Your Celebration"
        title="Let's Plan Together"
        description="Share a few details about your event and our coordinators will get in touch within 24 hours."
        image={images.hero}
      />

      <section className="bg-sand px-4 py-16 sm:px-[20px] lg:px-[40px] lg:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <aside className="space-y-8 lg:sticky lg:top-24">
            <div>
              <p className="eyebrow">Booking Details</p>
              <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
                Tell us your date, guests and preferred hall.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                We review your date manually so the team can confirm the right hall, package,
                catering options and site-visit slot before you pay an advance.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                {
                  icon: CalendarCheck,
                  title: "Availability confirmation",
                  text: "Our team checks your preferred date and suggests alternate slots if needed.",
                },
                {
                  icon: Sparkles,
                  title: "Package guidance",
                  text: "Choose Silver, Gold, Platinum or Diamond, then customise decor, menu and access.",
                },
                {
                  icon: Clock,
                  title: "24-hour response",
                  text: "Most enquiries receive a call or WhatsApp follow-up within one working day.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="border border-border bg-card p-5">
                  <Icon className="h-5 w-5 text-gold" />
                  <h3 className="mt-3 font-display text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>

            <div className="border border-border bg-card p-6">
              <h3 className="font-display text-2xl">Visit Us</h3>
              <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-muted-foreground">
                {venue.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="gold">
                  <a href={`tel:${venue.phone}`}>
                    <Phone /> Call
                  </a>
                </Button>
                <Button asChild variant="whatsapp">
                  <a
                    href={whatsappLink(`Hello ${venue.name}, I would like to book a celebration.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin /> Directions
                  </a>
                </Button>
              </div>
              <a
                href={`mailto:${venue.email}`}
                className="mt-5 flex items-center gap-2 text-sm text-muted-foreground hover:text-gold"
              >
                <Mail className="h-4 w-4" />
                {venue.email}
              </a>
            </div>
          </aside>

          <EnquiryForm
            id="booking-form"
            submitLabel="Send Enquiry"
            defaultPackage={defaultPackage}
          />
        </div>
      </section>
    </>
  );
}
