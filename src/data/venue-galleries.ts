export type VenueGalleryImage = {
  src: string;
  label: string;
  alt: string;
};

export type VenueGallery = {
  slug: "v-hall" | "n-hall" | "s-hall" | "vns-hall";
  name: string;
  intro: string;
  images: VenueGalleryImage[];
};

export const venueGalleries: Record<VenueGallery["slug"], VenueGallery> = {
  "v-hall": {
    slug: "v-hall",
    name: "V Hall",
    intro:
      "A welcoming indoor-outdoor setting for intimate celebrations, with dedicated support spaces and easy guest access.",
    images: [
      {
        src: "/venues/v-hall/v-hall-details.png",
        label: "V Hall Package Details",
        alt: "V Hall package price, duration, capacity and facilities",
      },
      {
        src: "/venues/v-hall/v-hall-celebration-entrance.webp",
        label: "Celebration Entrance",
        alt: "Draped celebration entrance and dining setup at V Hall",
      },
      {
        src: "/venues/v-hall/v-hall-event-setup.webp",
        label: "Event Setup",
        alt: "Evening event seating and illuminated entrance at V Hall",
      },
      {
        src: "/venues/v-hall/v-hall-kitchen.webp",
        label: "Kitchen",
        alt: "Panoramic view of the V Hall kitchen preparation area",
      },
      {
        src: "/venues/v-hall/v-hall-annexe.webp",
        label: "Annexe",
        alt: "Panoramic view of the V Hall annexe and hand-wash area",
      },
      {
        src: "/venues/v-hall/v-hall-washroom-hand-wash.webp",
        label: "Washroom & Hand Wash",
        alt: "Exterior of the V Hall washroom and hand-wash facilities",
      },
      {
        src: "/venues/v-hall/v-hall-parking.webp",
        label: "Parking",
        alt: "Parking area in front of Venus Park and Convention Centre",
      },
    ],
  },
  "n-hall": {
    slug: "n-hall",
    name: "N Hall",
    intro:
      "An open-air lawn and covered celebration space designed for ceremonies, receptions and flexible guest layouts.",
    images: [
      {
        src: "/venues/n-hall/n-hall-details.png",
        label: "N Hall Package Details",
        alt: "N Hall package price, duration, capacity and facilities",
      },
      {
        src: "/venues/n-hall/n-hall-lawn-stage.webp",
        label: "Lawn Stage",
        alt: "Illuminated lawn stage and ceremony seating at N Hall",
      },
      {
        src: "/venues/n-hall/n-hall-covered-courtyard.webp",
        label: "Covered Courtyard",
        alt: "Covered courtyard with draped canopy at N Hall",
      },
      {
        src: "/venues/n-hall/n-hall-event-seating.webp",
        label: "Event Seating",
        alt: "Guest seating arranged beneath the N Hall canopy",
      },
      {
        src: "/venues/n-hall/n-hall-lawn-dining.webp",
        label: "Lawn Dining",
        alt: "Outdoor dining setup on the N Hall lawn",
      },
      {
        src: "/venues/n-hall/n-hall-ceremony-stage.webp",
        label: "Ceremony Stage",
        alt: "Traditional ceremony stage decorated at N Hall",
      },
      {
        src: "/venues/n-hall/n-hall-entrance-aisle.webp",
        label: "Entrance Aisle",
        alt: "Decorated entrance aisle leading into N Hall",
      },
      {
        src: "/venues/n-hall/n-hall-lawn-reception.webp",
        label: "Lawn Reception",
        alt: "Reception tables arranged across the N Hall lawn",
      },
      {
        src: "/venues/n-hall/n-hall-ceremony-aisle.webp",
        label: "Ceremony Aisle",
        alt: "Ceremony aisle and stage viewed across the N Hall lawn",
      },
      {
        src: "/venues/n-hall/n-hall-washroom-hand-wash.webp",
        label: "Washroom & Hand Wash",
        alt: "Washroom and hand-wash facilities serving N Hall",
      },
      {
        src: "/venues/n-hall/n-hall-parking.webp",
        label: "Parking",
        alt: "Parking area in front of Venus Park and Convention Centre",
      },
    ],
  },
  "s-hall": {
    slug: "s-hall",
    name: "S Hall",
    intro:
      "A grand indoor hall with dramatic chandeliers, an expansive stage and dedicated dining, kitchen and guest facilities.",
    images: [
      {
        src: "/venues/s-hall/s-hall-details.png",
        label: "S Hall Package Details",
        alt: "S Hall package price, duration, capacity and room information",
      },
      {
        src: "/venues/s-hall/s-hall-exterior.webp",
        label: "Grand Exterior",
        alt: "Illuminated glass-front exterior of S Hall",
      },
      {
        src: "/venues/s-hall/s-hall-chandelier-interior.webp",
        label: "Chandelier Interior",
        alt: "Spacious S Hall interior with a row of chandeliers",
      },
      {
        src: "/venues/s-hall/s-hall-stage.webp",
        label: "Main Stage",
        alt: "Main stage and architectural wall detailing inside S Hall",
      },
      {
        src: "/venues/s-hall/s-hall-interior.webp",
        label: "Hall Interior",
        alt: "Polished S Hall interior with chandeliers and glass doors",
      },
      {
        src: "/venues/s-hall/s-hall-event-seating.webp",
        label: "Event Seating",
        alt: "Formal guest seating arranged inside S Hall",
      },
      {
        src: "/venues/s-hall/s-hall-dining.webp",
        label: "Dining",
        alt: "Dining service in progress inside S Hall",
      },
      {
        src: "/venues/s-hall/s-hall-audience.webp",
        label: "Large Gathering",
        alt: "Large seated gathering inside S Hall",
      },
      {
        src: "/venues/s-hall/s-hall-kitchen.webp",
        label: "Kitchen",
        alt: "Panoramic view of the S Hall kitchen preparation area",
      },
      {
        src: "/venues/s-hall/s-hall-washroom-hand-wash.webp",
        label: "Washroom & Hand Wash",
        alt: "Washroom and hand-wash facilities serving S Hall",
      },
      {
        src: "/venues/s-hall/s-hall-parking-aerial.webp",
        label: "Parking Overview",
        alt: "Aerial overview of the S Hall parking area",
      },
    ],
  },
  "vns-hall": {
    slug: "vns-hall",
    name: "VNS Hall",
    intro:
      "The complete Venus Park experience, bringing V Hall, N Hall and S Hall together for an elegant 8-hour event.",
    images: [
      {
        src: "/venues/vns-hall/vns-hall-details.png",
        label: "VNS Hall Package Details",
        alt: "VNS Hall package price, 8-hour event duration and included facilities",
      },
      {
        src: "/venues/vns-hall/vns-hall-entrance-gate.webp",
        label: "Venue Entrance",
        alt: "Main entrance gate to the VNS Hall venue",
      },
      {
        src: "/venues/vns-hall/vns-hall-v-celebration-setup.webp",
        label: "V Hall Celebration Setup",
        alt: "Draped celebration entrance and dining setup in V Hall",
      },
      {
        src: "/venues/vns-hall/vns-hall-n-lawn-stage.webp",
        label: "N Hall Lawn Stage",
        alt: "Illuminated lawn stage and seating in N Hall",
      },
      {
        src: "/venues/vns-hall/vns-hall-n-event-setup.webp",
        label: "N Hall Event Setup",
        alt: "Covered event setup in N Hall",
      },
      {
        src: "/venues/vns-hall/vns-hall-s-exterior.webp",
        label: "S Hall Exterior",
        alt: "Illuminated glass-front exterior of S Hall",
      },
      {
        src: "/venues/vns-hall/vns-hall-s-kitchen.webp",
        label: "S Hall Kitchen",
        alt: "Panoramic view of the S Hall kitchen preparation area",
      },
      {
        src: "/venues/vns-hall/vns-hall-aerial-night.webp",
        label: "Venue at Night",
        alt: "Aerial night view of Venus Park during an event",
      },
      {
        src: "/venues/vns-hall/vns-hall-washroom-hand-wash.webp",
        label: "Washroom & Hand Wash",
        alt: "Venue washroom and hand-wash facilities",
      },
      {
        src: "/venues/vns-hall/vns-hall-parking.webp",
        label: "Parking",
        alt: "Parking area in front of Venus Park and Convention Centre",
      },
    ],
  },
};

const packageToHall: Record<string, VenueGallery["slug"]> = {
  silver: "v-hall",
  gold: "n-hall",
  platinum: "s-hall",
  diamond: "vns-hall",
};

export function getVenueGallery(hall?: string, packageName?: string) {
  const normalizedHall = hall?.trim().toLowerCase() as VenueGallery["slug"] | undefined;
  if (normalizedHall && normalizedHall in venueGalleries) {
    return venueGalleries[normalizedHall];
  }

  const mappedHall = packageName ? packageToHall[packageName.trim().toLowerCase()] : undefined;
  return mappedHall ? venueGalleries[mappedHall] : undefined;
}
