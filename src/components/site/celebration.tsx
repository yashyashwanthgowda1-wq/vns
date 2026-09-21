"use client";

import Link from "next/link";
import { Tangerine } from "next/font/google";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Crown,
  Check,
  Facebook,
  Gem,
  HeartHandshake,
  Instagram,
  MapPin,
  Sparkles,
  Star,
  X,
  Youtube,
} from "lucide-react";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { galleryItems, images } from "@/data/images";
import { mapsDirectionsUrl, mapsEmbedSrc, pricingTiers, venue } from "@/data/venue";
import { cn } from "@/lib/utils";

import { HeroVideo } from "./HeroVideo";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const hallInitialFont = Tangerine({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

function HallCardName({ name, featured = false }: { name: string; featured?: boolean }) {
  const [initials, ...rest] = name.split(" ");
  const hallText = rest.join(" ");

  return (
    <h3 className="mt-1 flex items-end gap-1.5 leading-none">
      <span
        className={cn(
          hallInitialFont.className,
          "text-5xl font-bold leading-[0.78] tracking-normal text-gold",
        )}
      >
        {initials}
      </span>
      {hallText && (
        <span
          className={cn(
            "pb-1 text-2xl font-medium leading-none tracking-normal",
            featured ? "text-ivory" : "text-ink",
          )}
        >
          {hallText}
        </span>
      )}
    </h3>
  );
}

/* =========================================================
   NAVIGATION
========================================================= */

const navAnchors = [
  { label: "Home", href: "#home" },
  { label: "Halls", href: "#halls" },
  { label: "Gallery", href: "#gallery" },
  { label: "Packages", href: "#packages" },
  { label: "Stories", href: "#stories" },
  { label: "Contact", href: "#contact" },
];

/* =========================================================
   BLESSINGS
========================================================= */

const blessings = [
  {
    icon: "Om",
    deity: "Ganesha",
    meaning: "Beginnings",
  },
  {
    icon: "Lotus",
    deity: "Lakshmi",
    meaning: "Prosperity",
  },
  {
    icon: "Veena",
    deity: "Saraswati",
    meaning: "Grace",
  },
];

/* =========================================================
   EVENT TAGS
========================================================= */

const eventTags = ["Weddings", "Receptions", "Sangeet", "Corporate", "Festivals"];

const landingCarouselImages = [
  {
    src: "/images/IMG_7889%20(1).PNG",
    alt: "Venus Park event poster 1",
  },
  {
    src: "/images/IMG_7891%20(1).PNG",
    alt: "Venus Park event poster 2",
  },
  {
    src: "/images/IMG_7898%20(1).PNG",
    alt: "Venus Park event poster 3",
  },
  {
    src: "/images/IMG_7899%20(1).PNG",
    alt: "Venus Park event poster 4",
  },
  {
    src: "/images/IMG_7910%20(1).PNG",
    alt: "Venus Park event poster 5",
  },
  {
    src: "/images/IMG_7911%20(1).PNG",
    alt: "Venus Park event poster 6",
  },
  {
    src: "/images/IMG_7912%20(1).PNG",
    alt: "Venus Park event poster 7",
  },
];

const pavilionEvents = [
  {
    title: "Baby Shower",
    pax: "300 Pax",
    description: "Warm decor, family seating and a relaxed setup for blessing ceremonies.",
    image: images.celebrations,
    features: ["Family Seating", "Warm Decor", "Dining", "Photography"],
    gallery: [
      images.celebrations,
      galleryItems[0]?.src ?? images.celebrations,
      galleryItems[2]?.src ?? images.weddings,
    ],
  },
  {
    title: "Naming Ceremony",
    pax: "250 Pax",
    description: "A calm, elegant pavilion arrangement for traditional family rituals.",
    image: images.interior,
    features: ["Ritual Setup", "Stage", "Dining", "Guest Seating"],
    gallery: [
      images.interior,
      galleryItems[1]?.src ?? images.interior,
      galleryItems[6]?.src ?? images.interior,
    ],
  },
  {
    title: "Birthday Celebrations",
    pax: "300 Pax",
    description: "Flexible party layouts for birthdays, milestones and themed celebrations.",
    image: images.celebrations,
    features: ["Party Setup", "Music", "Decoration", "Dining"],
    gallery: [
      images.celebrations,
      galleryItems[7]?.src ?? images.celebrations,
      galleryItems[17]?.src ?? images.celebrations,
    ],
  },
  {
    title: "Haldi Celebrations",
    pax: "400 Pax",
    description: "Bright, festive settings with space for rituals, music and family moments.",
    image: images.weddings,
    features: ["Floral Decor", "Ritual Space", "Music", "Catering"],
    gallery: [
      images.weddings,
      galleryItems[8]?.src ?? images.weddings,
      galleryItems[14]?.src ?? images.weddings,
    ],
  },
  {
    title: "Sangeet Celebrations",
    pax: "600 Pax",
    description: "Stage-ready spaces for performances, dancing and pre-wedding energy.",
    image: images.weddings,
    features: ["Dance Floor", "Stage", "Lighting", "Sound"],
    gallery: [
      images.weddings,
      galleryItems[12]?.src ?? images.weddings,
      galleryItems[19]?.src ?? images.weddings,
    ],
  },
  {
    title: "Pre-Wedding Functions",
    pax: "500 Pax",
    description: "Versatile indoor setups for mehendi, haldi, sangeet and family gatherings.",
    image: images.weddings,
    features: ["Mehendi", "Haldi", "Sangeet", "Dining"],
    gallery: [
      images.weddings,
      galleryItems[20]?.src ?? images.weddings,
      galleryItems[23]?.src ?? images.weddings,
    ],
  },
  {
    title: "Engagement",
    pax: "500 Pax",
    description: "Intimate seating, stage focus and photo-friendly decor for ring ceremonies.",
    image: images.celebrations,
    features: ["Stage", "Lounge", "Photography", "Catering"],
    gallery: [
      images.celebrations,
      galleryItems[24]?.src ?? images.celebrations,
      galleryItems[28]?.src ?? images.celebrations,
    ],
  },
  {
    title: "Pooja & Rituals",
    pax: "200 Pax",
    description: "Respectful arrangements for traditional ceremonies and spiritual occasions.",
    image: images.interior,
    features: ["Ritual Setup", "Seating", "Dining", "Support"],
    gallery: [
      images.interior,
      galleryItems[13]?.src ?? images.interior,
      galleryItems[21]?.src ?? images.interior,
    ],
  },
  {
    title: "Half Saree Function",
    pax: "350 Pax",
    description: "Graceful celebration layouts for family customs and cultural milestones.",
    image: images.celebrations,
    features: ["Stage", "Decor", "Dining", "Photography"],
    gallery: [
      images.celebrations,
      galleryItems[29]?.src ?? images.celebrations,
      galleryItems[35]?.src ?? images.celebrations,
    ],
  },
  {
    title: "Baby Arrival",
    pax: "200 Pax",
    description: "Comfortable, joyful spaces for welcoming the newest family member.",
    image: images.celebrations,
    features: ["Family Lounge", "Decor", "Dining", "Photos"],
    gallery: [
      images.celebrations,
      galleryItems[36]?.src ?? images.celebrations,
      galleryItems[38]?.src ?? images.celebrations,
    ],
  },
  {
    title: "Corporate Meets",
    pax: "700 Pax",
    description: "Professional seating, AV-friendly layouts and smooth guest movement.",
    image: images.corporate,
    features: ["AV Setup", "Stage", "Seating", "Catering"],
    gallery: [
      images.corporate,
      galleryItems[4]?.src ?? images.corporate,
      galleryItems[18]?.src ?? images.corporate,
    ],
  },
  {
    title: "Product Launch",
    pax: "600 Pax",
    description: "Presentation-ready venues for brand reveals, showcases and launches.",
    image: images.corporate,
    features: ["Branding", "AV Setup", "Stage", "Lighting"],
    gallery: [
      images.corporate,
      galleryItems[25]?.src ?? images.corporate,
      galleryItems[32]?.src ?? images.corporate,
    ],
  },
  {
    title: "Potluck Parties",
    pax: "250 Pax",
    description: "Casual dining-friendly setups for communities, families and teams.",
    image: images.dining,
    features: ["Dining", "Buffet", "Seating", "Service"],
    gallery: [
      images.dining,
      galleryItems[3]?.src ?? images.dining,
      galleryItems[10]?.src ?? images.dining,
    ],
  },
  {
    title: "Photo Shoots",
    pax: "100 Pax",
    description: "Styled backdrops and spacious interiors for portrait and event shoots.",
    image: images.interior,
    features: ["Backdrops", "Lighting", "Interiors", "Access"],
    gallery: [
      images.interior,
      galleryItems[34]?.src ?? images.interior,
      galleryItems[41]?.src ?? images.interior,
    ],
  },
  {
    title: "Intimate Gathering",
    pax: "150 Pax",
    description: "Smaller pavilion formats for close-knit celebrations and private events.",
    image: images.celebrations,
    features: ["Private Setup", "Dining", "Decor", "Service"],
    gallery: [
      images.celebrations,
      galleryItems[37]?.src ?? images.celebrations,
      galleryItems[42]?.src ?? images.celebrations,
    ],
  },
  {
    title: "Picnic Experience",
    pax: "200 Pax",
    description: "Easygoing celebration spaces for daytime get-togethers and group outings.",
    image: images.dining,
    features: ["Day Events", "Dining", "Games", "Seating"],
    gallery: [
      images.dining,
      galleryItems[39]?.src ?? images.dining,
      galleryItems[22]?.src ?? images.dining,
    ],
  },
];

/* =========================================================
   HERO STATS
========================================================= */

const heroStats = [
  {
    value: "1.2K+",
    label: "Events Hosted",
  },
  {
    value: "50K+",
    label: "Happy Guests",
  },
  {
    value: "12",
    label: "Premium Halls",
  },
  {
    value: "4.9",
    label: "Star Rating",
  },
  {
    value: "200+",
    label: "Menu Items",
  },
];

/* =========================================================
   HALLS / EVENT TYPES
========================================================= */

const halls = [
  {
    name: "Wedding",
    pax: "1500 Pax",

    description:
      "A majestic setting crafted for grand wedding ceremonies, traditional rituals and unforgettable celebrations.",

    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",

    features: ["Grand Stage", "Bridal Suite", "Valet", "Catering"],

    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1600&q=85",
    ],
  },

  {
    name: "Reception",
    pax: "800 Pax",

    description:
      "An elegant celebration space designed for wedding receptions, sangeet nights and sophisticated evening gatherings.",

    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",

    features: ["Stage", "Chandeliers", "Dining", "Pre-Function"],

    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1600&q=85",
    ],
  },

  {
    name: "Engagement",
    pax: "500 Pax",

    description:
      "A beautifully intimate venue for engagement ceremonies, ring exchanges, family gatherings and pre-wedding celebrations.",

    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",

    features: ["Stage", "Lounge", "Photography", "Catering"],

    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1600&q=85",
    ],
  },

  {
    name: "Birthday",
    pax: "300 Pax",

    description:
      "A lively and versatile space for birthdays, milestone parties and joyful celebrations with family and friends.",

    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",

    features: ["Party Setup", "Music", "Dining", "Decoration"],

    gallery: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1600&q=85",
    ],
  },
];

/* =========================================================
   SHOWCASE GALLERY
========================================================= */

const showcase = [
  {
    title: "Regal mandap setup",
    image: galleryItems[2]?.src ?? images.weddings,
  },

  {
    title: "Floral stage detailing",
    image: galleryItems[5]?.src ?? images.celebrations,
  },

  {
    title: "Bride at the venue",
    image: galleryItems[7]?.src ?? images.weddings,
  },

  {
    title: "Ceremony glow",
    image: galleryItems[10]?.src ?? images.hero,
  },

  {
    title: "Couple under canopy",
    image: galleryItems[14]?.src ?? images.interior,
  },
];

/* =========================================================
   PACKAGES
========================================================= */

const packages = [
  {
    name: "Silver",
    cardName: "V Hall",
    motif: "",
    note: "8 Hours | 50 to 200 Guests",
    href: "/booking?package=Silver&hall=v-hall",

    features: [
      "Non-AC package",
      "8-hour hall booking",
      "Flexible capacity for 50 to 200 guests",
      "Seating capacity: 120 people",
      "Dining table: 50 members per flow",
    ],
  },

  {
    name: "Gold",
    cardName: "N Hall",
    motif: "Marigold",
    note: "8 Hours | 300 to 1500 Guests",
    href: "/booking?package=Gold&hall=n-hall",

    features: [
      "All Court Non-AC package",
      "8-hour hall booking",
      "Flexible capacity for 300 to 1500 guests",
      "Seating capacity: 500 people",
      "Dining table: 200 members per flow",
      "2 rooms available near the stage",
    ],
  },

  {
    name: "Platinum",
    cardName: "S Hall",
    motif: "Kanchipuram",
    note: "8 Hours | 500 to 2000 Guests",
    href: "/booking?package=Platinum&hall=s-hall",

    features: [
      "Non-AC package",
      "8-hour hall booking",
      "Flexible capacity for 500 to 2000 guests",
      "Seating capacity: 750 to 1,000 people",
      "Dining table: 200 people",
      "4 rooms total: 2 with AC and 2 without AC",
    ],
  },

  {
    name: "Diamond",
    cardName: "VNS Hall",
    motif: "Chola Royal",
    note: "8-Hour Event | V Hall + N Hall + S Hall",
    href: "/booking?package=Diamond&hall=vns-hall",
    featured: true,

    features: [
      "Non-AC package",
      "8-hour event booking",
      "V Hall + N Hall + S Hall",
      "Premium decor and stage setup",
      "Spacious guest seating and dedicated dining",
      "Ample parking",
      "Valet parking available",
    ],
  },
];

/* =========================================================
   PACKAGE PRICES
========================================================= */

const packagePrices = new Map(pricingTiers.map((tier) => [tier.name, tier.price]));

const inr = (price: number) => `₹${price.toLocaleString("en-IN")}`;

/* =========================================================
   STORIES
========================================================= */

const stories = [
  {
    quote:
      "From the very first visit, Venus Park felt magical. The team made our daughter's wedding feel like a royal celebration, every petal in place.",

    name: "Priya & Arjun Iyer",

    event: "Wedding | December 2024",
  },

  {
    quote:
      "Our reception had 1200 guests and the team handled it with grace and precision. The South Indian feast was unforgettable. Five stars from our family.",

    name: "Lakshmi & Karthik Raman",

    event: "Reception | October 2024",
  },

  {
    quote:
      "We celebrated my son's first birthday at Ganesha Court. The pastel decor, the kid-friendly menu, the kindness - Venus Park made it priceless.",

    name: "Meera & Vikram",

    event: "Birthday | March 2024",
  },
];

/* =========================================================
   ORNAMENT
========================================================= */

function Ornament({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center gap-2 text-gold", className)}
    >
      <Sparkles className="h-4 w-4" />

      <span className="h-px w-10 bg-gold/40" />

      <Crown className="h-4 w-4" />

      <span className="h-px w-10 bg-gold/40" />

      <Sparkles className="h-4 w-4" />
    </div>
  );
}

/* =========================================================
   INTRO
========================================================= */

function Intro({
  eyebrow,
  title,
  description,
  light,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="eyebrow">{eyebrow}</p>

      <h2
        className={cn(
          "mt-3 text-3xl leading-[1.15] sm:text-4xl lg:text-5xl",
          light ? "text-ivory" : "text-foreground",
        )}
      >
        {title}
      </h2>

      <Ornament className="mt-[10px]" />

      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed",
            light ? "text-ivory/70" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

export function DivineHero({ video = false }: { video?: boolean }) {
  if (video) {
    return <HeroVideo poster={images.hero} />;
  }

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <img
        src={images.hero}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-ink/95 via-ink/84 to-ink/78" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
          <div className="order-2 lg:order-1">
            <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {blessings.map((item) => (
                <li
                  key={item.deity}
                  className="flex items-center gap-4 border border-ivory/15 bg-ivory/5 p-4 backdrop-blur"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-gold/40 font-display text-lg text-gold">
                    {item.icon}
                  </span>

                  <span>
                    <span className="block font-display text-xl text-ivory">{item.deity}</span>

                    <span className="text-xs uppercase tracking-[0.18em] text-ivory/55">
                      {item.meaning}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 text-center lg:order-2">
            <p className="eyebrow">Bangalore South&apos;s Most Celebrated Event Destination</p>

            <h1 className="mt-6 text-6xl leading-none text-ivory sm:text-7xl lg:text-8xl">
              Venus <span className="text-gold">Park</span>
            </h1>

            <p className="mt-5 font-display text-sm uppercase tracking-[0.45em] text-ivory/80 sm:text-base">
              And Convention Hall
            </p>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ivory/76">
              Where the colours of South India&apos;s festivals meet the elegance of every cherished
              celebration - your most divine moments begin here.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild variant="gold" size="xl">
                <Link href="/booking">
                  Book Your Celebration
                  <ArrowRight />
                </Link>
              </Button>

              <Button asChild variant="outlineLight" size="xl">
                <a href="#halls">Explore Venue</a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-2.5">
              {eventTags.map((tag) => (
                <span
                  key={tag}
                  className="border border-ivory/25 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-ivory/85"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="#halls"
              className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-ivory/60 transition-colors hover:text-gold"
            >
              Scroll to Explore
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PAVILIONS
   WEDDING / RECEPTION / ENGAGEMENT / BIRTHDAY
========================================================= */

export function Pavilions() {
  const [activeHall, setActiveHall] = useState<string | null>(null);

  const [activeImage, setActiveImage] = useState(0);

  const celebrationEvents = pavilionEvents.map((event) => ({
    ...event,
    name: event.title,
  }));

  const selectedHall = [...celebrationEvents, ...halls].find((event) => event.name === activeHall);

  const galleryImages = selectedHall?.gallery ?? [];

  /* =======================================================
     AUTOMATIC SLIDESHOW
  ======================================================= */

  useEffect(() => {
    if (!activeHall || galleryImages.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveImage((current) => {
        return (current + 1) % galleryImages.length;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeHall, galleryImages.length]);

  /* =======================================================
     ESC KEY
  ======================================================= */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveHall(null);
        setActiveImage(0);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =======================================================
     OPEN GALLERY
  ======================================================= */

  const openGallery = (hallName: string) => {
    setActiveHall(hallName);
    setActiveImage(0);
  };

  /* =======================================================
     CLOSE GALLERY
  ======================================================= */

  const closeGallery = () => {
    setActiveHall(null);
    setActiveImage(0);
  };

  /* =======================================================
     PREVIOUS IMAGE
  ======================================================= */

  const previousImage = () => {
    setActiveImage((current) => {
      return current === 0 ? galleryImages.length - 1 : current - 1;
    });
  };

  /* =======================================================
     NEXT IMAGE
  ======================================================= */

  const nextImage = () => {
    setActiveImage((current) => {
      return (current + 1) % galleryImages.length;
    });
  };

  return (
    <>
      {/* =====================================================
          PAVILIONS SECTION
      ===================================================== */}

      <Section tone="sand" id="halls">
        <Intro
          eyebrow="Our Pavilions"
          title="Halls Crafted for Celebration"
          description="Twelve premium halls. Twelve different moods. From intimate gatherings to grand royal weddings, every space tells a story."
        />

        <div className="mx-auto mt-12 max-w-7xl">
          <ul className="grid gap-6 md:grid-cols-2">
            {pavilionEvents.map((event) => (
              <li
                key={event.title}
                onClick={() => openGallery(event.title)}
                className="
                  group
                  grid
                  h-auto
                  cursor-pointer
                  overflow-hidden
                  border
                  border-border
                  bg-white
                  shadow-sm
                  transition-all
                  duration-500
                  md:h-[300px]
                  md:grid-cols-[0.92fr_1fr]
                  hover:-translate-y-1
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                "
              >
                <div className="media-zoom relative h-[220px] overflow-hidden bg-ink/10 md:h-full">
                  <img
                    src={event.image}
                    alt={`${event.title} at Venus Park`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      bg-black/20
                      transition-all
                      duration-500
                      group-hover:bg-black/35
                    "
                  >
                    <span
                      className="
                        rounded-full
                        border
                        border-white/30
                        bg-black/50
                        px-6
                        py-2.5
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-500
                        group-hover:bg-black/70
                      "
                    >
                      View Gallery
                    </span>
                  </div>
                </div>

                <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-7 text-center md:h-full md:min-h-0">
                  <div className="flex w-full items-start justify-center gap-8">
                    <h3 className="font-display text-3xl leading-none text-foreground">
                      {event.title}
                    </h3>

                    <span className="shrink-0 pt-1 text-base font-bold leading-none text-gold">
                      {event.pax}
                    </span>
                  </div>

                  <p className="mt-5 max-w-[30ch] text-sm leading-6 text-muted-foreground">
                    {event.description}
                  </p>

                  <div className="mt-5 flex max-w-[300px] flex-wrap justify-center gap-2">
                    {event.features.map((feature) => (
                      <span
                        key={feature}
                        className="
                            border
                            border-border
                            bg-sand
                            px-3
                            py-1.5
                            text-[0.68rem]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-muted-foreground
                          "
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-2
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-gold
                    "
                  >
                    Explore {event.title}
                    <ArrowRight
                      size={15}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* =================================================
            HALL CARDS
        ================================================= */}

        <div className="mx-auto mt-14 grid max-w-7xl gap-6 md:grid-cols-2">
          {halls.map((hall, index) => (
            <Reveal key={hall.name} index={index % 4}>
              <article
                onClick={() => openGallery(hall.name)}
                className="
                  group
                  grid
                  h-auto
                  cursor-pointer
                  overflow-hidden
                  border
                  border-border
                  bg-white
                  transition-all
                  duration-500
                  md:h-[300px]
                  hover:-translate-y-1
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                  md:grid-cols-[0.92fr_1fr]
                "
              >
                {/* IMAGE */}

                <div
                  className="
                    media-zoom
                    relative
                    h-[220px]
                    overflow-hidden
                    md:h-full
                  "
                >
                  <img
                    src={hall.image}
                    alt={`${hall.name} at Venus Park`}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  {/* IMAGE OVERLAY */}

                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      bg-black/20
                      transition-all
                      duration-500
                      group-hover:bg-black/35
                    "
                  >
                    <span
                      className="
                        rounded-full
                        border
                        border-white/30
                        bg-black/50
                        px-6
                        py-2.5
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-500
                        group-hover:bg-black/70
                      "
                    >
                      View Gallery
                    </span>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-7 text-center md:h-full md:min-h-0">
                  <div className="flex w-full items-start justify-center gap-8">
                    <h3 className="font-display text-3xl leading-none text-foreground">
                      {hall.name}
                    </h3>

                    <span className="shrink-0 pt-1 text-base font-bold leading-none text-gold">
                      {hall.pax}
                    </span>
                  </div>

                  <p className="mt-5 max-w-[30ch] text-sm leading-6 text-muted-foreground">
                    {hall.description}
                  </p>

                  {/* FEATURES */}

                  <div className="mt-5 flex max-w-[300px] flex-wrap justify-center gap-2">
                    {hall.features.map((feature) => (
                      <span
                        key={feature}
                        className="
                            border
                            border-border
                            bg-sand
                            px-3
                            py-1.5
                            text-[0.68rem]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-muted-foreground
                          "
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* EXPLORE */}

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-2
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-gold
                    "
                  >
                    Explore {hall.name}
                    <ArrowRight
                      size={15}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* =================================================
            BOOKING BUTTON
        ================================================= */}

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/booking">
              Enquire About a Hall
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </Section>

      {/* =====================================================
          FULL SCREEN GALLERY POPUP
      ===================================================== */}

      {activeHall && selectedHall && galleryImages.length > 0 && (
        <div
          className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              bg-black/90
              p-3
              backdrop-blur-md
              sm:p-6
            "
          onClick={closeGallery}
        >
          {/* POPUP */}

          <div
            className="
                relative
                w-full
                max-w-6xl
                overflow-hidden
                rounded-2xl
                bg-black
                shadow-[0_30px_100px_rgba(0,0,0,0.7)]
              "
            onClick={(event) => event.stopPropagation()}
          >
            {/* CLOSE */}

            <button
              type="button"
              onClick={closeGallery}
              aria-label="Close gallery"
              className="
                  absolute
                  right-4
                  top-4
                  z-50
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/60
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:bg-white
                  hover:text-black
                "
            >
              <X size={20} />
            </button>

            {/* TITLE */}

            <div
              className="
                  absolute
                  left-5
                  top-5
                  z-40
                  rounded-full
                  border
                  border-white/20
                  bg-black/50
                  px-5
                  py-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white
                  backdrop-blur-md
                "
            >
              {selectedHall.name}
            </div>

            {/* MAIN IMAGE */}

            <div
              className="
                  relative
                  h-[70vh]
                  min-h-[400px]
                  w-full
                  overflow-hidden
                  sm:h-[75vh]
                "
            >
              <img
                key={galleryImages[activeImage]}
                src={galleryImages[activeImage]}
                alt={`${selectedHall.name} celebration`}
                className="
                    h-full
                    w-full
                    object-cover
                    animate-gallery-slide
                  "
              />

              {/* OVERLAY */}

              <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/70
                    via-transparent
                    to-black/20
                  "
              />
            </div>

            {/* PREVIOUS */}

            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="
                  absolute
                  left-3
                  top-1/2
                  z-40
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/60
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:bg-white
                  hover:text-black
                  sm:left-5
                  sm:h-12
                  sm:w-12
                "
            >
              <ArrowLeft size={20} />
            </button>

            {/* NEXT */}

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="
                  absolute
                  right-3
                  top-1/2
                  z-40
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/60
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:bg-white
                  hover:text-black
                  sm:right-5
                  sm:h-12
                  sm:w-12
                "
            >
              <ArrowRight size={20} />
            </button>

            {/* BOTTOM CONTROLS */}

            <div
              className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  z-30
                  flex
                  flex-col
                  items-center
                  gap-3
                  bg-gradient-to-t
                  from-black
                  to-transparent
                  px-5
                  pb-5
                  pt-16
                "
            >
              {/* COUNTER */}

              <span
                className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-white/70
                  "
              >
                {activeImage + 1} / {galleryImages.length}
              </span>

              {/* DOTS */}

              <div className="flex items-center gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View image ${index + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      index === activeImage ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   LOCATION
========================================================= */

export function Location() {
  return (
    <Section tone="sand" id="location">
      <Intro
        eyebrow="Visit Venus Park"
        title="Find Us & Connect"
        description="Discover Venus Park, connect with us on social media, and find your way to our celebration spaces."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {/* FIND US */}

        <div
          className="
            flex
            h-[300px]
            flex-col
            border
            border-border
            bg-card
            p-5
            shadow-[var(--shadow-soft)]
            sm:p-6
          "
        >
          <p className="eyebrow">Find Us</p>

          <div className="mt-5 flex flex-1 flex-col items-center justify-center gap-4">
            {/* QR CODE */}

            <div className="w-full max-w-[170px] rounded-xl border border-border bg-white p-2 shadow-sm">
              <img
                src="/gallery/Venus_Park_Review_QR (1).png"
                alt="Venus Park QR Code"
                className="mx-auto aspect-square w-full object-contain"
              />
            </div>

            {/* DIRECTIONS */}

            <Button asChild variant="outline" size="lg" className="w-full max-w-[170px]">
              <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin />
                Get Directions
              </a>
            </Button>
          </div>
        </div>

        {/* SOCIAL MEDIA */}

        <div
          className="
            flex
            h-[300px]
            flex-col
            border
            border-border
            bg-card
            p-5
            shadow-[var(--shadow-soft)]
            sm:p-6
          "
        >
          <p className="eyebrow">Social Media</p>

          <div className="mt-5 flex flex-1 flex-col justify-center gap-3">
            {/* INSTAGRAM */}

            <a
              href={venue.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Venus Park on Instagram"
              className="
                group
                flex
                items-center
                gap-4
                border
                border-border
                bg-background
                px-5
                py-2
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-gold
                hover:bg-gold
                hover:text-white
              "
            >
              <span
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-border
                  text-sm
                  font-bold
                  group-hover:border-white/50
                "
              >
                <Instagram size={23} aria-hidden="true" />
              </span>

              <span className="text-sm font-medium">Instagram</span>

              <ArrowRight
                size={17}
                className="ml-auto transition-transform group-hover:translate-x-1"
              />
            </a>

            {/* FACEBOOK */}

            <a
              href={venue.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Venus Park on Facebook"
              className="
                group
                flex
                items-center
                gap-4
                border
                border-border
                bg-background
                px-5
                py-2
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-gold
                hover:bg-gold
                hover:text-white
              "
            >
              <span
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-border
                  text-sm
                  font-bold
                  group-hover:border-white/50
                "
              >
                <Facebook size={23} aria-hidden="true" />
              </span>

              <span className="text-sm font-medium">Facebook</span>

              <ArrowRight
                size={17}
                className="ml-auto transition-transform group-hover:translate-x-1"
              />
            </a>

            {/* YOUTUBE */}

            <a
              href={venue.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Venus Park on YouTube"
              className="
                group
                flex
                items-center
                gap-4
                border
                border-border
                bg-background
                px-5
                py-2
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-gold
                hover:bg-gold
                hover:text-white
              "
            >
              <span
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-border
                  text-sm
                  font-bold
                  group-hover:border-white/50
                "
              >
                <Youtube size={25} aria-hidden="true" />
              </span>

              <span className="text-sm font-medium">YouTube</span>

              <ArrowRight
                size={17}
                className="ml-auto transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* MAP */}

        <div
          className="
            h-[300px]
            overflow-hidden
            border
            border-border
            bg-card
            shadow-[var(--shadow-soft)]
          "
        >
          <iframe
            title={`Map showing ${venue.name}`}
            src={mapsEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="
              h-full
              w-full
              border-0
            "
          />
        </div>
      </div>

      {/* EXPLORE VENUE */}

      {/* <div className="mt-[20px] flex justify-center md:mt-[40px] lg:mt-[60px]">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="
            group
            px-8
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-gold
            hover:bg-gold
            hover:text-white
          "
        >
          <Link
            href="/venus-park"
            className="mt-2 text-xl leading-[1.15] sm:text-2xl lg:text-3xl"
          >
            Explore the Venue&apos;s Park

            <ArrowRight
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Button>
      </div> */}
    </Section>
  );
}

/* =========================================================
   LANDING IMAGE CAROUSEL
========================================================= */

export function LandingImageCarousel() {
  const [activeImage, setActiveImage] = useState(0);
  const visibleImageIndexes = [0, 1, 2].map(
    (offset) => (activeImage + offset) % landingCarouselImages.length,
  );

  const previousImage = () => {
    setActiveImage((current) => (current === 0 ? landingCarouselImages.length - 1 : current - 1));
  };

  const nextImage = () => {
    setActiveImage((current) => (current + 1) % landingCarouselImages.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="moments">
      <Intro
        eyebrow="Venue Moments"
        title="Celebrations in Focus"
        description="A curated look at Venus Park event setups, celebrations and venue experiences."
      />

      <div className="relative mt-10">
        <div className="grid gap-6 md:grid-cols-3">
          {visibleImageIndexes.map((imageIndex) => {
            const image = landingCarouselImages[imageIndex];

            return (
              <article
                key={image.src}
                className="
                  overflow-hidden
                  border
                  border-border
                  bg-card
                  shadow-[var(--shadow-soft)]
                "
              >
                <div className="aspect-[4/5] bg-black">
                  <img src={image.src} alt={image.alt} className="h-full w-full object-contain" />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={previousImage}
            aria-label="Show previous carousel image"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-border
              bg-card
              text-foreground
              shadow-sm
              transition-colors
              hover:border-gold
              hover:text-gold
            "
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex justify-center gap-2">
            {landingCarouselImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Show carousel image ${index + 1}`}
                className={cn(
                  "h-2 rounded-full bg-foreground/25 transition-all hover:bg-gold",
                  index === activeImage ? "w-8 bg-gold" : "w-2",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextImage}
            aria-label="Show next carousel image"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-border
              bg-card
              text-foreground
              shadow-sm
              transition-colors
              hover:border-gold
              hover:text-gold
            "
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </Section>
  );
}

/* =========================================================
   GRAND STAGE / GALLERY
========================================================= */

export function GrandStage() {
  return (
    <Section id="gallery">
      <Intro
        eyebrow="Moments Captured"
        title="A Glimpse of the Magic"
        description="Curated moments from weddings, receptions, sangeets and corporate galas held at Venus Park."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {showcase.map((item, index) => (
          <Reveal
            key={item.title}
            index={index % 5}
            className={cn(index === 0 || index === 4 ? "lg:row-span-2" : "")}
          >
            <figure className="media-zoom relative h-full min-h-72 overflow-hidden border border-border bg-card">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-[100%] w-full object-cover"
              />

              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 font-display text-xl text-ivory">
                {item.title}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* =========================================================
   CURATED PACKAGES
========================================================= */

export function CuratedPackages() {
  return (
    <Section tone="sand" id="packages">
      <Intro
        eyebrow="Curated Tiers"
        title="Packages for Every Dream"
        description="From sweet beginnings to royal grandeur, choose the celebration that matches your vision. All packages are fully customisable."
      />

      <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-4">
        {packages.map((tier, index) => (
          <Reveal key={tier.name} index={index % 4} className="h-full">
            <Link
              href={tier.href}
              aria-label={`View ${tier.name} package`}
              className="group block h-full focus-visible:outline-none"
            >
              <article
                className={cn(
                  "package-card card-elegant relative flex h-full min-h-[30rem] flex-col overflow-hidden p-7",
                  tier.featured &&
                    "badge-card badge-float border-yellow-300/80 bg-gradient-to-br from-gold-soft via-gold to-amber-700 text-ink shadow-gold",
                )}
              >
                {tier.featured && (
                  <>
                    <span className="badge-shine" aria-hidden="true" />
                    <span className="badge-sweep" aria-hidden="true" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-white/10 to-transparent"
                    />
                  </>
                )}

                <div
                  className={cn(
                    "package-price-overlay absolute inset-x-0 bottom-0 z-30 translate-y-full border-t border-gold/35 bg-white/95 p-4 opacity-0 shadow-xl backdrop-blur transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
                    tier.featured ? "text-ink" : "text-foreground",
                  )}
                >
                  <div className="flex flex-col items-start gap-3">
                    <span className="relative inline-flex min-h-8 w-32 items-center drop-shadow-[0_8px_12px_rgba(29,28,38,0.2)]">
                      <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center border-y border-l border-yellow-700/50 bg-gradient-to-br from-yellow-200 via-gold to-amber-700 text-[#071128] [clip-path:polygon(22%_0,100%_0,84%_50%,100%_100%,22%_100%,0_50%)]">
                        <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                      </span>

                      <span className="relative -ml-1 flex h-8 min-w-0 flex-1 items-center border-y border-r border-yellow-700/50 bg-[#101629] px-2 pr-4 text-left [clip-path:polygon(0_0,88%_0,100%_50%,88%_100%,0_100%,8%_50%)]">
                        <span className="absolute left-1/2 top-0 h-px w-6 -translate-x-1/2 bg-white/80 shadow-[0_0_10px_2px_rgba(255,255,255,0.7)]" />
                        <span className="leading-none">
                          <span className="block text-[0.48rem] font-semibold uppercase tracking-[0.08em] text-gold">
                            Opening
                          </span>
                          <span className="block font-display text-[0.8rem] font-bold uppercase leading-none tracking-[0.04em] text-white">
                            Offer
                          </span>
                        </span>
                      </span>
                    </span>

                    <p className="flex w-full items-end justify-center gap-2 text-center text-3xl font-black leading-none tracking-normal text-ink">
                      <span>{inr(packagePrices.get(tier.name) ?? 0)}</span>
                      <span className="pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink/70">
                        + GST
                      </span>
                    </p>
                    <p className="w-full text-right text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/55">
                      <span className="relative inline-block pr-2">
                        Conditions applied
                        <span
                          aria-hidden="true"
                          className="absolute -right-0.5 -top-1 text-[0.7rem] leading-none text-ink/70"
                        >
                          *
                        </span>
                      </span>
                    </p>
                  </div>
                </div>

                {/* {tier.motif && (
                <p className={cn("eyebrow relative z-10", tier.featured && "mt-5 text-center")}>
                  {tier.motif}
                </p>
              )} */}

                <div
                  className={cn(
                    "package-card-header relative z-10 flex min-h-20 items-center",
                    tier.featured ? "justify-center" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "relative inline-flex max-w-full items-center gap-3 border px-4 py-3 shadow-[var(--shadow-soft)]",
                      "before:absolute before:inset-1 before:border before:content-['']",
                      tier.featured
                        ? "border-ink/25 bg-ink text-ivory before:border-gold/45"
                        : "border-gold/50 bg-gradient-to-br from-ivory via-white to-gold-soft/40 text-ink before:border-gold/35",
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-10 h-12 w-12 shrink-0 overflow-hidden border bg-ink",
                        tier.featured ? "border-gold/55" : "border-gold/60",
                      )}
                    >
                      <img
                        src="/Untitled_design__1_-removebg-preview.png"
                        alt=""
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 h-24 w-24 max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
                      />
                    </span>

                    <span className="relative z-10 min-w-0 pb-1">
                      <HallCardName name={tier.cardName} featured={tier.featured} />
                    </span>
                  </div>
                </div>

                <p
                  className={cn(
                    "package-card-note relative z-10 mt-3 text-xs uppercase tracking-[0.14em]",
                    tier.featured ? "text-ink/65" : "text-muted-foreground",
                  )}
                >
                  {tier.note}
                </p>

                <ul className="package-card-features relative z-10 mt-7 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex gap-3 text-sm leading-relaxed",
                        tier.featured ? "text-ink" : "",
                      )}
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* =========================================================
   FAMILY STORIES
========================================================= */

export function FamilyStories() {
  return (
    <Section id="stories">
      <Intro
        eyebrow="Loving Words"
        title="Stories from Our Families"
        description="Every celebration leaves a memory. Here are a few of the kind words our families have shared."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {stories.map((story, index) => (
          <Reveal key={story.name} index={index % 3}>
            <figure className="card-elegant flex h-full flex-col p-8">
              <div className="flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({
                  length: 5,
                }).map((_, star) => (
                  <Star key={star} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>

              <Gem className="mt-8 h-8 w-8 text-gold/60" aria-hidden="true" />

              <blockquote className="mt-4 flex-1 font-display text-xl leading-relaxed text-foreground">
                &quot;{story.quote}&quot;
              </blockquote>

              <figcaption className="mt-7 border-t border-border pt-5">
                <span className="block font-display text-lg">{story.name}</span>

                <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-gold">
                  {story.event}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* =========================================================
   RESERVE CTA
========================================================= */

export function ReserveCta() {
  return (
    <Section tone="ink" id="contact">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="eyebrow">Begin Your Celebration</p>

          <h2 className="mt-3 text-3xl text-ivory sm:text-4xl lg:text-5xl">
            Let&apos;s Plan Together
          </h2>

          <Ornament className="mt-5 justify-start" />

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/70">
            Share a few details about your event and our coordinators will get in touch within 24
            hours.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="xl">
              <Link href="/booking">
                Book Now
                <ArrowRight />
              </Link>
            </Button>

            <Button asChild variant="outlineLight" size="xl">
              <a href={`tel:${venue.phone}`}>{venue.phoneDisplay}</a>
            </Button>
          </div>
        </div>

        <div className="border border-ivory/15 p-7">
          <HeartHandshake className="h-8 w-8 text-gold" />

          <h3 className="mt-4 font-display text-2xl text-ivory">Visit Us</h3>

          <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-ivory/70">
            {venue.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>

          <div className="mt-6 grid gap-4 text-sm text-ivory/70 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gold">Call</p>

              <a href={`tel:${venue.phone}`} className="mt-2 block hover:text-gold">
                {venue.phoneDisplay}
              </a>

              <a href={`tel:${venue.phoneAlt}`} className="mt-1 block hover:text-gold">
                {venue.phoneAltDisplay}
              </a>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gold">Email</p>

              <a href={`mailto:${venue.email}`} className="mt-2 block break-all hover:text-gold">
                {venue.email}
              </a>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.18em] text-gold">Open</p>

              <p className="mt-2">Mon - Sun | 9:00 AM - 9:00 PM</p>

              <p className="mt-1 text-ivory/55">Site visits by appointment</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
