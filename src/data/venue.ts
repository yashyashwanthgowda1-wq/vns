/**
 * Central content file — replace these placeholder values with real venue
 * details, pricing and copy. Everything on the site reads from here.
 */

export const venue = {
  name: "Venus Park",
  tagline: " And Convention Hall · Bangalore South",
  phoneDisplay: "+91 96119 12121",
  phone: "+919611912121",
  phoneAltDisplay: "+91 96119 12121",
  phoneAlt: "+919611912121",
  whatsapp: "919611912121",
  email: "vns.park25@gmail.com",
  addressLines: [
    "Venus Park And Convention Centre",

    "#67/1 Munyamma Garden, 7th main road",
    "Sarvabhouma Nagar, Chikkalasandra",
    "Bangalore - 560 061",
  ],
  mapsQuery:
    "Venus Park Convention Centre, Munyamma Garden, 7th Cross, Sarvabhouma Nagar, Chikkalasandra, Bangalore 560061",

  hours: [
    { day: "Monday – Friday", time: "9:00 am – 8:00 pm" },
    { day: "Saturday", time: "9:00 am – 9:00 pm" },
    { day: "Sunday", time: "10:00 am – 6:00 pm" },
  ],
  social: {
    instagram: "https://www.instagram.com/vns.park25/",
    facebook: "https://www.facebook.com/share/1Cw1Lrskar/?mibextid=wwXIfr",
    youtube: "https://youtu.be/3XIFyp-NAEA",
  },
  googleReviewsUrl: "https://www.google.com/maps",
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${venue.whatsapp}?text=${encodeURIComponent(message)}`;

export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  venue.mapsQuery,
)}&output=embed`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  venue.mapsQuery,
)}`;

export const heroHighlights = [
  "Capacity up to 1,000 guests",
  "Spacious dining area",
  "Dedicated parking",
  "Custom decoration",
  "Catering support",
  "Guest rooms",
  "Backup power",
  "Event coordination",
];

export const stats = [
  { value: "1,000", label: "Guest capacity" },
  { value: "650", label: "Dining capacity" },
  { value: "220", label: "Parking spaces" },
  { value: "24", label: "Guest rooms" },
  { value: "18", label: "Years of service" },
  { value: "2,400+", label: "Events hosted" },
];

export type EventCategory = {
  slug: string;
  title: string;
  description: string;
  image: "weddings" | "corporate" | "dining" | "celebrations";
  href: string;
  packageCta: string;
};

export const eventCategories: EventCategory[] = [
  {
    slug: "weddings",
    title: "Weddings",
    description: "Ceremony, muhurtham and reception spaces with a grand stage and bridal suites.",
    image: "weddings",
    href: "/weddings",
    packageCta: "Platinum package",
  },
  {
    slug: "receptions",
    title: "Receptions",
    description: "Evening receptions with layered lighting, live catering and a wide dance floor.",
    image: "dining",
    href: "/packages/platinum",
    packageCta: "Platinum package",
  },
  {
    slug: "engagements",
    title: "Engagements",
    description: "Intimate ring ceremonies with tailored stage decor and family seating.",
    image: "celebrations",
    href: "/packages/gold",
    packageCta: "Gold package",
  },
  {
    slug: "birthdays",
    title: "Birthdays",
    description: "Milestone birthdays and naming ceremonies with themed decoration support.",
    image: "celebrations",
    href: "/packages/gold",
    packageCta: "Gold package",
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    description: "Annual days, product launches and awards nights with full AV support.",
    image: "corporate",
    href: "/corporate-events",
    packageCta: "Diamond package",
  },
  {
    slug: "conferences",
    title: "Conferences",
    description: "Theatre and classroom layouts, breakout rooms and delegate catering.",
    image: "corporate",
    href: "/corporate-events",
    packageCta: "Platinum package",
  },
  {
    slug: "exhibitions",
    title: "Exhibitions",
    description: "Column-free floor, stall marking, loading access and extended venue hours.",
    image: "corporate",
    href: "/packages/diamond",
    packageCta: "Diamond package",
  },
  {
    slug: "college-school-events",
    title: "College & School Events",
    description: "Graduations, cultural days and inter-school competitions at weekday rates.",
    image: "corporate",
    href: "/packages/gold",
    packageCta: "Gold package",
  },
  {
    slug: "community-events",
    title: "Community Events",
    description: "Association meets, festivals and charity dinners with flexible catering.",
    image: "dining",
    href: "/packages/gold",
    packageCta: "Gold package",
  },
];

export type Pkg = {
  slug: "gold" | "platinum" | "diamond";
  name: string;
  badge: string;
  best: string;
  cta: string;
  inherits?: string;
  features: string[];
  featured?: boolean;
};

export const packages: Pkg[] = [
  {
    slug: "gold",
    name: "Gold Package",
    badge: "Essential",
    best: "Best for simple, elegant, budget-conscious celebrations.",
    cta: "Choose Gold",
    features: [
      "Convention hall access",
      "Standard seating arrangement",
      "Basic stage setup",
      "Dining area access",
      "Standard lighting",
      "Basic housekeeping",
      "Power backup",
      "Venue coordinator",
      "Standard parking support",
    ],
  },
  {
    slug: "platinum",
    name: "Platinum Package",
    badge: "Most Popular",
    best: "Best for full-service weddings and large family celebrations.",
    cta: "Choose Platinum",
    inherits: "Everything in Gold, plus:",
    featured: true,
    features: [
      "Premium stage decoration",
      "Enhanced lighting",
      "Standard catering package",
      "Bride and groom rooms",
      "Guest rooms",
      "Welcome drinks",
      "Valet or organised parking support",
      "Event coordination",
      "Custom seating layout",
      "Basic sound system",
      "Photography area setup",
    ],
  },
  {
    slug: "diamond",
    name: "Diamond Package",
    badge: "Luxury Experience",
    best: "Best for luxury weddings, premium receptions and major events.",
    cta: "Choose Diamond",
    inherits: "Everything in Platinum, plus:",
    features: [
      "Luxury custom decoration",
      "Premium catering menu",
      "Premium stage and entrance design",
      "Advanced lighting and sound system",
      "Dedicated event manager",
      "Priority guest-room allocation",
      "VIP guest assistance",
      "Valet parking",
      "Custom branding or monograms",
      "Photography and videography coordination",
      "Live event support",
      "Extended venue access",
      "Complete event execution support",
    ],
  },
];

export type PricingTier = {
  slug: "silver" | "gold" | "platinum" | "diamond";
  name: string;
  price: number;
  tagline: string;
  featured?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    slug: "silver",
    name: "Silver",
    price: 74999,
    tagline: "Intimate celebrations",
  },
  {
    slug: "gold",
    name: "Gold",
    price: 149999,
    tagline: "Essential weddings",
  },
  {
    slug: "platinum",
    name: "Platinum",
    price: 249999,
    tagline: "Full-service events",
    featured: true,
  },
  {
    slug: "diamond",
    name: "Diamond",
    price: 499999,
    tagline: "Luxury experiences",
  },
];

export const comparisonRows: {
  label: string;
  gold: string | boolean;
  platinum: string | boolean;
  diamond: string | boolean;
}[] = [
  { label: "Hall access", gold: "Standard hours", platinum: "Extended hours", diamond: "Full day" },
  { label: "Seating", gold: "Standard", platinum: "Custom layout", diamond: "Custom + VIP zones" },
  { label: "Stage decoration", gold: "Basic setup", platinum: "Premium", diamond: "Luxury custom" },
  { label: "Catering", gold: false, platinum: "Standard menu", diamond: "Premium menu" },
  { label: "Lighting", gold: "Standard", platinum: "Enhanced", diamond: "Advanced" },
  { label: "Sound system", gold: false, platinum: "Basic", diamond: "Advanced" },
  { label: "Guest rooms", gold: false, platinum: true, diamond: "Priority allocation" },
  { label: "Parking support", gold: "Standard", platinum: "Organised / valet", diamond: "Valet" },
  { label: "Event coordinator", gold: true, platinum: true, diamond: true },
  { label: "Dedicated event manager", gold: false, platinum: false, diamond: true },
  { label: "Custom branding", gold: false, platinum: false, diamond: true },
  { label: "Extended venue access", gold: false, platinum: false, diamond: true },
  { label: "VIP support", gold: false, platinum: false, diamond: true },
];

export const facilities = [
  { icon: "Building2", title: "Main convention hall", note: "Column-free, 1,000 guests" },
  { icon: "UtensilsCrossed", title: "Dining hall", note: "650 seated diners" },
  { icon: "Theater", title: "Stage", note: "Modular, up to 12m wide" },
  { icon: "BedDouble", title: "Guest rooms", note: "24 rooms on site" },
  { icon: "Heart", title: "Bride & groom rooms", note: "Private suites with mirrors" },
  { icon: "Car", title: "Parking", note: "220 vehicles" },
  { icon: "KeyRound", title: "Valet support", note: "Available on request" },
  { icon: "ChefHat", title: "Catering kitchen", note: "Commercial-grade" },
  { icon: "Speaker", title: "Sound system", note: "Line array + mics" },
  { icon: "Lightbulb", title: "Lighting", note: "Ambient & stage rigs" },
  { icon: "Zap", title: "Power backup", note: "100% generator cover" },
  { icon: "Accessibility", title: "Accessibility", note: "Ramps & step-free access" },
  { icon: "ShieldCheck", title: "Security", note: "CCTV & trained staff" },
  { icon: "ClipboardList", title: "Event coordination", note: "From planning to wrap-up" },
];

export const layouts = [
  { name: "Theatre style", capacity: "1,000 guests", best: "Conferences, cultural programmes" },
  { name: "Banquet style", capacity: "650 guests", best: "Weddings, receptions, gala dinners" },
  { name: "Classroom style", capacity: "420 guests", best: "Training, workshops, exams" },
  { name: "Reception style", capacity: "850 guests", best: "Receptions, standing cocktails" },
  { name: "Exhibition style", capacity: "60 stalls", best: "Trade shows, expos" },
  { name: "Conference style", capacity: "180 guests", best: "Board meets, AGMs" },
];

export const whyChooseUs = [
  {
    icon: "MapPin",
    title: "Convenient location",
    text: "Ten minutes from the ring road with direct bus and rail links, so out-of-town guests arrive without stress.",
  },
  {
    icon: "Maximize",
    title: "Spacious venue",
    text: "A column-free 18,000 sq ft hall plus a separate dining floor, so dining never interrupts your ceremony.",
  },
  {
    icon: "SlidersHorizontal",
    title: "Flexible packages",
    text: "Gold, Platinum and Diamond tiers that can be adjusted on guest count, menu and decoration.",
  },
  {
    icon: "Handshake",
    title: "Complete event support",
    text: "Decoration, catering, sound, lighting and guest rooms handled under one contract and one point of contact.",
  },
  {
    icon: "UserCheck",
    title: "Professional coordination",
    text: "A named coordinator runs your timeline, vendor access and rehearsals from booking to the final send-off.",
  },
  {
    icon: "Award",
    title: "Trusted by families and businesses",
    text: "2,400+ events hosted since 2008, from 120-guest engagements to 900-delegate annual conferences.",
  },
];

export const testimonials = [
  {
    name: "Priya & Arun Menon",
    event: "Wedding & Reception",
    rating: 5,
    quote:
      "We had 780 guests and the team never lost a beat. The dining hall turned around between sittings in twenty minutes and our coordinator handled every vendor for us.",
  },
  {
    name: "Sandra Whitfield",
    event: "Corporate Annual Day",
    rating: 5,
    quote:
      "AV was faultless for a 600-delegate session, and the breakout catering ran exactly to the minute. We have already booked next year.",
  },
  {
    name: "The Rahman Family",
    event: "60th Birthday",
    rating: 5,
    quote:
      "Elegant hall, honest pricing and no surprise charges. They adjusted the menu twice for us without any fuss.",
  },
  {
    name: "Dr. Nithya Raman",
    event: "Medical Conference",
    rating: 5,
    quote:
      "Theatre layout, registration desk and signage were ready before we arrived. The venue team clearly does this every week.",
  },
  {
    name: "Joseph & Anita",
    event: "Engagement Ceremony",
    rating: 5,
    quote:
      "The bridal suite and photography corner made the day easy for our families. Guests still mention the decoration.",
  },
  {
    name: "St. Aldric's College",
    event: "Graduation Ceremony",
    rating: 5,
    quote:
      "Weekday pricing suited our budget and the stage was set for 400 students and parents without any delay.",
  },
];

export const faqs = [
  {
    q: "What is the maximum guest capacity?",
    a: "The main hall seats up to 1,000 guests theatre style, 850 for a standing reception and 650 for a seated banquet. The dining hall is separate, so guests can be served in sittings without clearing the main hall.",
  },
  {
    q: "Is parking available?",
    a: "Yes. We have 220 on-site parking spaces with marshals during large events, and valet parking is included in the Diamond package or can be added to any other package.",
  },
  {
    q: "Can we bring our own caterer?",
    a: "Yes. You may use our in-house catering or bring an approved external caterer. External caterers pay a kitchen access fee and must provide food-safety documentation ahead of the event.",
  },
  {
    q: "Are decoration services included?",
    a: "Basic stage setup is included in Gold. Platinum includes premium stage decoration and Diamond includes fully custom decoration, entrance design and monogramming. You can also bring your own decorator.",
  },
  {
    q: "Are guest rooms available?",
    a: "We have 24 guest rooms on site, plus dedicated bride and groom suites. Rooms are included from the Platinum package and allocated on priority for Diamond bookings.",
  },
  {
    q: "Can corporate events be hosted?",
    a: "Yes. We regularly host conferences, annual days, product launches, AGMs and exhibitions, with theatre, classroom, conference and exhibition layouts available.",
  },
  {
    q: "Is the venue air-conditioned?",
    a: "The main hall, dining hall, suites and guest rooms are fully air-conditioned and independently zoned.",
  },
  {
    q: "Is backup power available?",
    a: "Yes. Generators cover 100% of the venue load, including air conditioning, kitchen, lighting and AV, with automatic changeover.",
  },
  {
    q: "How much advance is required?",
    a: "Dates are held with a booking advance, with the balance staged before the event. The exact amount depends on the date and package — our team will confirm it in writing with your quote.",
  },
  {
    q: "Can we visit the venue before booking?",
    a: "Absolutely. Guided venue tours run daily and take about 30 minutes. Book a slot and we will set the hall up so you can see your preferred layout.",
  },
  {
    q: "Are weekday packages available?",
    a: "Yes. Monday to Thursday bookings carry reduced rates, which suits conferences, school events and community gatherings.",
  },
  {
    q: "Can packages be customised?",
    a: "Every package is a starting point. Menus, decoration, guest rooms, AV and venue hours can all be adjusted, and your quote will itemise each change.",
  },
];

export const eventTypes = [
  "Wedding",
  "Reception",
  "Engagement",
  "Birthday",
  "Naming ceremony",
  "Anniversary",
  "Corporate event",
  "Conference",
  "Exhibition",
  "School or college event",
  "Community event",
  "Other",
];

export const packageOptions = ["Silver", "Gold", "Platinum", "Diamond", "Not sure"];

export const galleryFilters = [
  "All",
  "Weddings",
  "Receptions",
  "Decorations",
  "Dining",
  "Corporate Events",
  "Stage Setups",
  "Venue Interiors",
] as const;
