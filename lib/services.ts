// Single source of truth for all service page content.
// Each slug maps to a complete page data object used by generateStaticParams + generateMetadata.

export interface ServicePage {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sourcingExplainer: string;
  caseStudy: {
    businessName: string; // PLACEHOLDER
    location: string;     // PLACEHOLDER
    result: string;       // PLACEHOLDER
    quote: string;        // PLACEHOLDER
  };
  seoCopy: string;
  relatedSlugs: string[];
}

export const services: ServicePage[] = [
  {
    slug: "residential-cleaning-leads",
    h1: "Residential Cleaning Leads for Cleaning Companies",
    metaTitle: "Residential Cleaning Leads | Exclusive Homeowner Leads — CleanLeadsGrowth",
    metaDescription:
      "Get exclusive residential cleaning leads pre-screened for intent. Real homeowners ready to book — delivered in real time to your cleaning business.",
    intro:
      "Every residential cleaning lead we deliver is a homeowner who has actively requested a cleaning quote — not a casual browser. We verify intent before the lead ever reaches your inbox.",
    sourcingExplainer:
      "Our leads come from targeted digital campaigns and partner networks. Each residential lead is: (1) verified for a real service address, (2) screened for request intent, and (3) delivered exclusively to one contractor — you.",
    caseStudy: {
      businessName: "[PLACEHOLDER — Client Business Name]",
      location:     "[PLACEHOLDER — City, State]",
      result:       "[PLACEHOLDER — e.g., 18 new recurring clients in 60 days]",
      quote:        "[PLACEHOLDER — Client testimonial quote here]",
    },
    seoCopy:
      "Residential cleaning leads are the lifeblood of any house cleaning business. Stop spending hours on cold outreach and let pre-qualified homeowners come to you. Our exclusive lead delivery means no bidding wars — every lead is yours alone.",
    relatedSlugs: [
      "commercial-cleaning-leads",
      "move-in-move-out-leads",
      "carpet-upholstery-leads",
    ],
  },
  {
    slug: "commercial-cleaning-leads",
    h1: "Commercial Cleaning Leads for Cleaning Companies",
    metaTitle: "Commercial Cleaning Leads | Office & Facility Leads — CleanLeadsGrowth",
    metaDescription:
      "Exclusive B2B commercial cleaning leads — offices, retail, warehouses. Pre-screened decision-makers ready to award contracts.",
    intro:
      "Commercial contracts are worth 5–10× a residential job. We connect you with facility managers, office administrators, and business owners actively seeking a commercial cleaning contractor.",
    sourcingExplainer:
      "Commercial leads are sourced through B2B channels and screened for: business type, square footage, contract readiness, and decision-maker authority. You only receive leads from contacts who can actually sign a contract.",
    caseStudy: {
      businessName: "[PLACEHOLDER — Client Business Name]",
      location:     "[PLACEHOLDER — City, State]",
      result:       "[PLACEHOLDER — e.g., 3 office contracts totalling $4,200/month]",
      quote:        "[PLACEHOLDER — Client testimonial quote here]",
    },
    seoCopy:
      "Landing commercial cleaning contracts requires reaching the right decision-makers at the right moment. Our commercial cleaning leads put you in front of facility managers and business owners who are actively evaluating vendors — not just browsing.",
    relatedSlugs: [
      "residential-cleaning-leads",
      "window-pressure-washing-leads",
      "carpet-upholstery-leads",
    ],
  },
  {
    slug: "move-in-move-out-leads",
    h1: "Move-In / Move-Out Cleaning Leads for Cleaning Companies",
    metaTitle: "Move-In Move-Out Cleaning Leads | Exclusive & Pre-Screened — CleanLeadsGrowth",
    metaDescription:
      "Get exclusive move-in/move-out cleaning leads. Tenants and homeowners with firm move dates who need a deep clean — delivered in real time.",
    intro:
      "Move-in/move-out cleans are high-value, time-sensitive jobs. We deliver leads with a confirmed move date so you can quote and book before a competitor even hears about it.",
    sourcingExplainer:
      "Move date proximity is our primary qualification filter. Every lead includes: the property address type (apartment/house), approximate square footage, and a confirmed move date window so you can prioritize your calendar.",
    caseStudy: {
      businessName: "[PLACEHOLDER — Client Business Name]",
      location:     "[PLACEHOLDER — City, State]",
      result:       "[PLACEHOLDER — e.g., 22 move-out cleans booked in one month]",
      quote:        "[PLACEHOLDER — Client testimonial quote here]",
    },
    seoCopy:
      "Move-in and move-out cleaning jobs are among the highest-margin work in the residential cleaning market. Property managers, landlords, and tenants all need reliable cleaners on short notice. Our leads come with confirmed timelines — so you show up prepared, not chasing.",
    relatedSlugs: [
      "residential-cleaning-leads",
      "carpet-upholstery-leads",
      "commercial-cleaning-leads",
    ],
  },
  {
    slug: "carpet-upholstery-leads",
    h1: "Carpet & Upholstery Cleaning Leads for Cleaning Companies",
    metaTitle: "Carpet & Upholstery Cleaning Leads | Exclusive Leads — CleanLeadsGrowth",
    metaDescription:
      "Exclusive carpet and upholstery cleaning leads — homeowners and businesses ready to book. Pre-screened for service type and location.",
    intro:
      "Carpet and upholstery cleaning jobs require specialized equipment and expertise. We filter leads for your specific service capabilities so you're never quoting work you can't execute.",
    sourcingExplainer:
      "Leads are screened for: surface type (carpet, area rug, sofa, auto), approximate square footage or number of pieces, stain severity if applicable, and whether this is a one-time or recurring need.",
    caseStudy: {
      businessName: "[PLACEHOLDER — Client Business Name]",
      location:     "[PLACEHOLDER — City, State]",
      result:       "[PLACEHOLDER — e.g., $8,400 in carpet cleaning revenue in 45 days]",
      quote:        "[PLACEHOLDER — Client testimonial quote here]",
    },
    seoCopy:
      "High-ticket carpet and upholstery cleaning jobs come from customers who know they need a professional — they're just looking for the right one. Our exclusive leads mean you get first call, not 10th.",
    relatedSlugs: [
      "residential-cleaning-leads",
      "move-in-move-out-leads",
      "window-pressure-washing-leads",
    ],
  },
  {
    slug: "window-pressure-washing-leads",
    h1: "Window & Pressure Washing Leads for Cleaning Companies",
    metaTitle: "Window & Pressure Washing Leads | Exclusive — CleanLeadsGrowth",
    metaDescription:
      "Exclusive window cleaning and pressure washing leads for contractors. Homeowners and businesses actively seeking quotes — delivered in real time.",
    intro:
      "Window cleaning and pressure washing are seasonal high-demand services. We time our lead delivery to match your local demand cycles so your calendar fills when the market is hot.",
    sourcingExplainer:
      "Leads are qualified for: service type (window interior/exterior, soft wash, pressure wash, driveway, deck, siding), property type, and urgency. We filter out tire-kickers with a price-expectation screen.",
    caseStudy: {
      businessName: "[PLACEHOLDER — Client Business Name]",
      location:     "[PLACEHOLDER — City, State]",
      result:       "[PLACEHOLDER — e.g., 40 pressure washing jobs booked in spring season]",
      quote:        "[PLACEHOLDER — Client testimonial quote here]",
    },
    seoCopy:
      "Window cleaning and pressure washing contractors succeed on volume and repeat business. Our exclusive leads help you build a dense route in your service area — less drive time, more booked jobs per day.",
    relatedSlugs: [
      "commercial-cleaning-leads",
      "carpet-upholstery-leads",
      "residential-cleaning-leads",
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
