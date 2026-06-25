// PLACEHOLDER — all values below must be confirmed by client before launch.
// To swap brand/domain: edit this file only. NO component may inline these values.

export const siteConfig = {
  // PLACEHOLDER — client to confirm
  name: "CleanLeadsGrowth",
  // PLACEHOLDER — client to confirm
  tagline: "More Cleanings. More Clients.",
  // PLACEHOLDER — client to confirm
  description:
    "Exclusive, pre-screened cleaning leads delivered in real time to residential and commercial cleaning businesses across the US.",
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

  // Navigation
  nav: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Services",     href: "/#services" },
    { label: "Pricing",      href: "/pricing" },
    { label: "About",        href: "/about" },
    { label: "Contact",      href: "/contact" },
  ],

  // Stats shown in hero — PLACEHOLDER — client to provide real numbers
  heroStats: [
    { value: 500,  suffix: "+",  label: "Leads Delivered / Month" },
    { value: 92,   suffix: "%",  label: "Lead-to-Quote Rate" },
    { value: 4.8,  suffix: "★",  label: "Avg. Client Rating", isDecimal: true },
  ],

  // Guarantees bar copy
  guarantees: [
    { icon: "RefreshCw",   text: "100% Lead Replacement Guarantee" },
    { icon: "Shield",      text: "Privacy Respected — Your Data Stays Yours" },
    { icon: "Unlock",      text: "No Long-Term Contracts" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
