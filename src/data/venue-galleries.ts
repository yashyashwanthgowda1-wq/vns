export type VenueGalleryImage = {
  src: string;
  label: string;
  alt: string;
};

export type VenueGalleryVideo = {
  src: string;
  poster: string;
  label: string;
  alt: string;
};

export type VenueGallery = {
  slug: "v-hall" | "n-hall" | "s-hall" | "vns-hall";
  name: string;
  intro: string;
  profilePdf?: string;
  heroVideo?: VenueGalleryVideo;
  images: VenueGalleryImage[];
};

export const venueGalleries: Record<VenueGallery["slug"], VenueGallery> = {
  "v-hall": {
    slug: "v-hall",
    name: "V Hall",
    intro:
      "A welcoming indoor-outdoor setting for intimate celebrations, with dedicated support spaces and easy guest access.",
    heroVideo: {
      src: "/video/v-hall-birthday-reel-1080p.mp4",
      poster: "/video/v-hall-birthday-reel-poster.webp",
      label: "Birthday Celebration Reel",
      alt: "Video highlights of a birthday celebration hosted at V Hall",
    },
    images: [
      {
        src: "/venues/v-hall/v-hall-details.png",
        label: "V Hall Package Details",
        alt: "V Hall package price, duration, capacity and facilities",
      },
      {
        src: "/venues/v-hall/v-hall-birthday-01.webp",
        label: "Illuminated Welcome Pathway",
        alt: "Stone pathway framed by green and ivory drapes and fairy lights, leading to a balloon arch at V Hall",
      },
      {
        src: "/venues/v-hall/v-hall-birthday-02.webp",
        label: "Balloon Arch Entrance",
        alt: "Green, white and gold balloon arch with a welcome board at the V Hall birthday entrance",
      },
      {
        src: "/venues/v-hall/v-hall-birthday-03.webp",
        label: "Birthday Stage & Backdrop",
        alt: "Birthday stage with a printed backdrop and balloon garland styled in green and gold at V Hall",
      },
      {
        src: "/venues/v-hall/v-hall-birthday-04.webp",
        label: "Canopy of Greenery",
        alt: "Birthday stage beneath a ceiling of hanging greenery, woven lanterns and warm lights at V Hall",
      },
      {
        src: "/venues/v-hall/v-hall-birthday-05.webp",
        label: "Children's Celebration",
        alt: "Children gathered near the stage during a birthday celebration at V Hall",
      },
      {
        src: "/venues/v-hall/v-hall-birthday-06.webp",
        label: "Guest Seating",
        alt: "Guests seated on clear chairs facing the stage beneath decorative ceiling lights at V Hall",
      },
      {
        src: "/venues/v-hall/v-hall-birthday-07.webp",
        label: "Seating Aisle",
        alt: "Central aisle between rows of event seating leading to the stage at V Hall",
      },
      {
        src: "/venues/v-hall/v-hall-birthday-08.webp",
        label: "Banquet Table Layout",
        alt: "Long banquet tables with white skirting and gold runners arranged along the V Hall dining area",
      },
      {
        src: "/venues/v-hall/v-hall-birthday-09.webp",
        label: "Dining Hall Interior",
        alt: "Covered V Hall dining interior with parallel banquet tables and patterned carpet",
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
    ],
  },
  "n-hall": {
    slug: "n-hall",
    name: "N Hall",
    intro:
      "An open-air lawn and covered celebration space designed for ceremonies, receptions and flexible guest layouts.",
    profilePdf: "/profiles/venus-park-n-hall-final.pdf",
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
        src: "/venues/n-hall/n-hall-ceremony-stage.webp",
        label: "Outdoor lawn",
        alt: "Outdoor dining setup on the N Hall lawn at Venus Park & Convention Centre",
      },
      {
        src: "/venues/n-hall/n-hall-entrance-aisle.webp",
        label: "Ceremony Stage",
        alt: "Traditional decorated ceremony stage at N Hall at Venus Park & Convention Centre",
      },
      {
        src: "/venues/n-hall/n-hall-washroom-hand-wash.webp",
        label: "Entrance Aisle",
        alt: "Decorated entrance aisle leading toward the N Hall ceremony stage",
      },
      {
        src: "/venues/n-hall/n-hall-ceremony-aisle.webp",
        label: "Open lawn",
        alt: "Reception tables arranged across the N Hall lawn at Venus Park & Convention Centre",
      },
      {
        src: "/venues/n-hall/n-hall-lawn-reception.webp",
        label: "Ceremony Aisle",
        alt: "Ceremony aisle viewed from the decorated N Hall stage",
      },
      {
        src: "/venues/n-hall/n-hall-lawn-dining.webp",
        label: "Washroom & Hand Wash",
        alt: "N Hall washroom and hand-wash facility at Venus Park & Convention Centre",
      },
      {
        src: "/venues/n-hall/n-hall-parking.webp",
        label: "Parking",
        alt: "Parking area in front of Venus Park and Convention Centre",
      },
      {
        src: "/venues/n-hall/n-hall-kitchen.webp",
        label: "Kitchen",
        alt: "Panoramic view of the kitchen serving N Hall",
      },
      {
        src: "/venues/n-hall/n-hall-room-near-stage.webp",
        label: "Room Near the Stage",
        alt: "Guest room near the N Hall stage with an attached restroom",
      },
    ],
  },
  "s-hall": {
    slug: "s-hall",
    name: "S Hall",
    intro:
      "A grand indoor hall with dramatic chandeliers, an expansive stage and dedicated dining, kitchen and guest facilities.",
    profilePdf: "/profiles/venus-park-s-hall-final.pdf",
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
        src: "/venues/s-hall/s-hall-kitchen.webp",
        label: "Large Gathering",
        alt: "Large seated gathering inside S Hall at Venus Park & Convention Centre",
      },
      {
        src: "/venues/s-hall/s-hall-washroom-hand-wash.webp",
        label: "Kitchen",
        alt: "S Hall kitchen facility at Venus Park & Convention Centre",
      },
      {
        src: "/venues/s-hall/s-hall-audience.webp",
        label: "Washroom & Hand Wash",
        alt: "S Hall washroom and hand-wash facility at Venus Park & Convention Centre",
      },
      {
        src: "/venues/s-hall/s-hall-parking-aerial.webp",
        label: "Parking Overview",
        alt: "Aerial overview of the S Hall parking area",
      },
      {
        src: "/venues/s-hall/s-hall-ac-room-near-stage-1.webp",
        label: "AC Room Near the Stage",
        alt: "First view of an air-conditioned guest room near the S Hall stage",
      },
      {
        src: "/venues/s-hall/s-hall-ac-room-near-stage-2.webp",
        label: "AC Room Near the Stage",
        alt: "Second view of an air-conditioned guest room near the S Hall stage",
      },
      {
        src: "/venues/s-hall/s-hall-ac-room-restrooms.webp",
        label: "AC Room Restrooms",
        alt: "Restrooms provided for the two air-conditioned rooms near the S Hall stage",
      },
      {
        src: "/venues/s-hall/s-hall-upper-level-non-ac-room.webp",
        label: "Upper-Level Non-AC Room",
        alt: "Non-air-conditioned guest room on the upper level of S Hall",
      },
    ],
  },
  "vns-hall": {
    slug: "vns-hall",
    name: "VNS Hall",
    intro:
      "The complete Venus Park experience, bringing V Hall, N Hall and S Hall together for an elegant 8-hour event.",
    profilePdf: "/profiles/venus-park-vns-hall-final.pdf",
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
      {
        src: "/venues/vns-hall/vns-hall-n-room-near-stage.webp",
        label: "N Hall Room Near the Stage",
        alt: "Guest room near the N Hall stage included in the VNS Hall profile",
      },
      {
        src: "/venues/vns-hall/vns-hall-s-ac-room-near-stage.webp",
        label: "S Hall AC Room Near the Stage",
        alt: "Air-conditioned guest room near the S Hall stage included in the VNS Hall profile",
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
