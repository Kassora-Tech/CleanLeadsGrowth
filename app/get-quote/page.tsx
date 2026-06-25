import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Section";
import QuoteForm from "@/components/forms/QuoteForm";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title:       "Get a Free Quote — Professional Cleaning Services",
  description: `Request a free instant estimate from ${siteConfig.name}. Residential and commercial cleaning — tell us about your property and get a price in under 2 minutes.`,
  alternates:  { canonical: absoluteUrl("/get-quote") },
};

const benefits = [
  "Instant estimate — no waiting, no sales calls",
  "Residential and commercial cleaning covered",
  "Flexible one-time or recurring bookings",
  "100% satisfaction guarantee",
  "Fully insured and background-checked team [CLIENT TO CONFIRM]",
];

export default function GetQuotePage() {
  return (
    <>
      <SiteNav />
      <div className="min-h-[100dvh] bg-gradient-hero pt-24 lg:pt-32">
        <Container className="pb-20 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">

            {/* Left: copy */}
            <div className="text-white pt-4">
              <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">
                Free Quote
              </p>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter mb-6 text-balance">
                Book a Professional Clean in Minutes
              </h1>
              <p className="text-navy-200 text-lg leading-relaxed mb-8">
                Complete the short form — we&apos;ll show you an instant estimate,
                then confirm your booking within 24 hours.
              </p>
              <ul className="flex flex-col gap-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-navy-100 text-sm">
                    <ShieldCheck className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: form */}
            <div>
              <QuoteForm variant="embedded" />
            </div>
          </div>
        </Container>
      </div>
      <SiteFooter />
    </>
  );
}
