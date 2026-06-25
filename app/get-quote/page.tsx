import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Section";
import QuoteForm from "@/components/forms/QuoteForm";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title:       "Get a Quote — Exclusive Cleaning Leads",
  description: `Request your exclusive cleaning leads from ${siteConfig.name}. Tell us your service area and lead volume — we'll be in touch within 24 hours.`,
  alternates:  { canonical: absoluteUrl("/get-quote") },
};

const benefits = [
  "Exclusive leads — never shared with another contractor",
  "Pre-screened for genuine booking intent",
  "Delivered in real time to your email or SMS",
  "100% Lead Replacement Guarantee",
  "No long-term contracts — cancel anytime",
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
                Get Your Leads
              </p>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter mb-6 text-balance">
                Start Filling Your Calendar With Booked Jobs
              </h1>
              <p className="text-navy-200 text-lg leading-relaxed mb-8">
                Complete the short form and we&apos;ll review your service area, confirm your lead type,
                and get your first batch of exclusive leads ready — usually within 24 hours.
              </p>
              <ul className="flex flex-col gap-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-navy-100 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
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
