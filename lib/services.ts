// Service page data — residential and commercial.
// Each slug maps to a complete page data object used by generateStaticParams + generateMetadata.

export interface ServicePage {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  whatIsIncluded: string[];
  addOns: { name: string; description: string }[];
  testimonial: {
    quote: string;       // PLACEHOLDER
    name: string;        // PLACEHOLDER
    location: string;    // PLACEHOLDER
    rating: number;
  };
  seoCopy: string;
}

export const services: ServicePage[] = [
  {
    slug: "residential",
    h1: "Residential House Cleaning",
    metaTitle: "House Cleaning Services | Residential Cleaning — Book Online",
    metaDescription:
      "Professional residential house cleaning — standard cleans, deep cleans, and move-in/move-out. Get a free instant estimate and book online in minutes.",
    intro:
      "Whether you need a one-time deep clean or a regular recurring service, our professional cleaners arrive on time, fully equipped, and ready to make your home spotless.",
    whatIsIncluded: [
      "Vacuuming and mopping all floors",
      "Kitchen surfaces, sink, and exterior appliances",
      "Bathroom scrub — toilet, shower, vanity, tiles",
      "Dusting surfaces, shelves, and light fixtures",
      "Emptying bins and wiping benchtops",
      "Bedroom tidying and bed linen change (if supplied)",
    ],
    addOns: [
      { name: "Inside Oven",          description: "Deep clean interior oven, racks, and door glass." },
      { name: "Inside Fridge",        description: "Full empty-and-wipe-down of refrigerator interior." },
      { name: "Inside Cabinets",      description: "Empty and wipe all kitchen and bathroom cabinets." },
      { name: "Carpet Steam Clean",   description: "Professional steam cleaning of carpeted areas." },
      { name: "Window Interior",      description: "Clean all interior window glass and tracks." },
      { name: "Move-In / Move-Out",   description: "Full deep clean for property handover or move-in." },
    ],
    testimonial: {
      quote:    "[PLACEHOLDER — client testimonial quote here]",
      name:     "[PLACEHOLDER — Customer Name]",
      location: "[PLACEHOLDER — City, State]",
      rating:   5,
    },
    seoCopy:
      "A clean home shouldn't be a chore you dread. Our residential cleaning team takes the stress off your plate — trusted, insured, and satisfaction-guaranteed. Book once or set up a recurring schedule that works around your life.",
  },
  {
    slug: "commercial",
    h1: "Commercial & Office Cleaning",
    metaTitle: "Commercial Cleaning Services | Office & Facility Cleaning — Book Online",
    metaDescription:
      "Professional commercial cleaning for offices, retail, medical, and industrial facilities. Flexible scheduling, fully insured. Get a free quote today.",
    intro:
      "A clean workplace improves productivity, impresses clients, and keeps your team healthy. We offer flexible after-hours and daytime commercial cleaning contracts tailored to your facility.",
    whatIsIncluded: [
      "Vacuuming and mopping hard floors and carpets",
      "Kitchen and breakroom surfaces, sink, microwave",
      "Bathroom and restroom full clean and restock",
      "Dusting desks, shelves, and common areas",
      "Bin emptying and waste removal",
      "Glass entry doors and internal windows",
    ],
    addOns: [
      { name: "Carpet Steam Clean",     description: "Deep clean of office carpet — ideal for quarterly maintenance." },
      { name: "Window Exterior",        description: "Full exterior window clean on request." },
      { name: "Pressure Washing",       description: "Car park, entry path, or loading dock pressure wash." },
      { name: "Post-Construction",      description: "Builder's clean after renovation or fitout." },
      { name: "End-of-Lease Clean",     description: "Bond clean to full property-management standard." },
      { name: "Medical-Grade Sanitation", description: "Hospital-grade disinfection for medical and allied-health facilities." },
    ],
    testimonial: {
      quote:    "[PLACEHOLDER — client testimonial quote here]",
      name:     "[PLACEHOLDER — Business Name / Contact Name]",
      location: "[PLACEHOLDER — City, State]",
      rating:   5,
    },
    seoCopy:
      "Commercial cleaning contracts don't need to be complicated. We provide transparent pricing, reliable scheduling, and a dedicated point of contact — so you can focus on running your business, not managing cleaners.",
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
