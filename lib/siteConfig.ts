// PLACEHOLDER — all values below must be confirmed by client before launch.
// To swap brand/domain: edit this file only. NO component may inline these values.

export const siteConfig = {
  // PLACEHOLDER — client to confirm
  name: "CleanLeadsGrowth",
  // PLACEHOLDER — client to confirm
  tagline: "Book a Reliable Clean in Minutes",
  // PLACEHOLDER — client to confirm
  description:
    "Professional residential and commercial cleaning services. Request a free quote online and get an instant estimate — we handle homes, offices, and move-in/move-out cleans across the US.",
  // PLACEHOLDER — client to confirm
  domain: "cleaningleadsgrowth.com",

  // Contact — PLACEHOLDER — client to confirm
  phone: "(555) 123-4567",
  phoneTel: "+15551234567",
  // PLACEHOLDER — client to confirm (WhatsApp number in international format, no +)
  whatsappNumber: "15551234567",
  // PLACEHOLDER — client to confirm
  email: "hello@cleaningleadsgrowth.com",

  // Social — PLACEHOLDER — client to confirm
  social: {
    facebook: "https://facebook.com/cleaningleadsgrowth",
    instagram: "https://instagram.com/cleaningleadsgrowth",
    linkedin: "",
  },

  // Business hours — PLACEHOLDER — client to confirm
  businessHours: "Mon–Fri 9am–6pm EST",

  // Navigation — updated for consumer site
  nav: [
    { label: "Residential",   href: "/services/residential" },
    { label: "Commercial",    href: "/services/commercial" },
    { label: "How It Works",  href: "/#how-it-works" },
    { label: "Reviews",       href: "/#reviews" },
    { label: "Contact",       href: "/contact" },
  ],

  // Stats shown in hero — PLACEHOLDER — client to provide real numbers
  heroStats: [
    { value: 5,    suffix: "+",  label: "Years in Business",         isDecimal: false },
    { value: 1200, suffix: "+",  label: "Jobs Completed",            isDecimal: false },
    { value: 4.9,  suffix: "★",  label: "Avg. Customer Rating",     isDecimal: true  },
  ],

  // Guarantees bar copy — consumer-facing
  guarantees: [
    { icon: "ShieldCheck", text: "Fully Insured & Background-Checked" },
    { icon: "ThumbsUp",    text: "100% Satisfaction Guarantee" },
    { icon: "Unlock",      text: "No Lock-In — Book Once or Recurring" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
