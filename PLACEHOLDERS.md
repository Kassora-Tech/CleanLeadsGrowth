# PLACEHOLDERS — Items Requiring Client Input Before Launch

Every `[PLACEHOLDER]` tag in the codebase is listed here. Grep for `PLACEHOLDER` to find them all.

## Domain & Brand
- [ ] Final domain name → `lib/siteConfig.ts → domain`
- [ ] Final brand name → `lib/siteConfig.ts → name`
- [ ] `.env.local` → `NEXT_PUBLIC_SITE_URL`

## Contact Details
- [ ] Phone number → `lib/siteConfig.ts → phone` + `phoneTel`
- [ ] WhatsApp number → `lib/siteConfig.ts → whatsappNumber`
- [ ] Email address → `lib/siteConfig.ts → email`
- [ ] Business hours → `lib/siteConfig.ts → businessHours`
- [ ] Physical address (if applicable) → `/app/contact/page.tsx`

## Analytics
- [ ] GA4 Measurement ID → `.env.local → NEXT_PUBLIC_GA_ID`
- [ ] Meta Pixel ID → `.env.local → NEXT_PUBLIC_META_PIXEL_ID`

## Hero Stats (all need real data)
- [ ] "500+ Leads Delivered / Month" → `lib/siteConfig.ts → heroStats[0]`
- [ ] "92% Lead-to-Quote Rate" → `lib/siteConfig.ts → heroStats[1]`
- [ ] "4.8★ Avg. Client Rating" → `lib/siteConfig.ts → heroStats[2]`

## Social Proof / Testimonials
- [ ] All testimonials in `components/sections/SocialProof.tsx` are `[PLACEHOLDER]`
- [ ] "Trusted by X cleaning businesses" stat → `SocialProof.tsx`

## Pricing
- [ ] Starter / Growth / Scale tier names, prices, and features → `components/sections/PricingTeaser.tsx` + `/app/pricing/page.tsx`

## Service Page Case Studies
- [ ] All 5 service pages have `[PLACEHOLDER]` case studies in `lib/services.ts`
  - Business name, location, result, and testimonial quote for each

## About Page
- [ ] Founder story → `/app/about/page.tsx`
- [ ] "How we screen leads" process details → `/app/about/page.tsx`
- [ ] Service area coverage map/list → `/app/about/page.tsx`
- [ ] Founder/team photo → `/public/images/`

## Images
- [ ] Hero cleaner photo → `/public/images/hero-cleaner.jpg` (recommended: 900×1100px)
- [ ] All `next/image` src attributes marked `[PLACEHOLDER]` in components

## CRM Integration
- [ ] `/api/lead/route.ts` → webhook URL for GoHighLevel / HubSpot / Zapier / Make

## Legal
- [ ] Privacy Policy page (linked in footer) → create `/app/privacy/page.tsx`
- [ ] Terms of Service (linked in footer) → create `/app/terms/page.tsx`
