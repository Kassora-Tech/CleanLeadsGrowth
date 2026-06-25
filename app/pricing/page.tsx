import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, X } from "lucide-react";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/siteConfig";
import { Section, Container, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title:       "Pricing — Cleaning Lead Generation Plans",
  description: `Simple, transparent pricing for exclusive cleaning leads. Starter, Growth, and Scale plans. ${siteConfig.name} — no hidden fees, no long-term contracts.`,
  alternates:  { canonical: absoluteUrl("/pricing") },
};

// PLACEHOLDER — all prices, limits, and feature lists must be confirmed by client
const tiers = [
  {
    name: "Starter",
    price: "[PLACEHOLDER]",
    period: "/month",
    tagline: "For solo operators just getting started.",
    highlight: false,
    features: [
      { text: "[PLACEHOLDER] leads / month",     included: true },
      { text: "1 service type",                  included: true },
      { text: "1 city target",                   included: true },
      { text: "Email delivery",                  included: true },
      { text: "Lead replacement guarantee",       included: true },
      { text: "Dedicated account rep",           included: false },
      { text: "SMS delivery",                    included: false },
      { text: "CRM integration",                 included: false },
    ],
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "[PLACEHOLDER]",
    period: "/month",
    tagline: "For growing companies scaling their bookings.",
    highlight: true,
    features: [
      { text: "[PLACEHOLDER] leads / month",     included: true },
      { text: "Up to 3 service types",           included: true },
      { text: "Up to 3 cities",                  included: true },
      { text: "Email + SMS delivery",            included: true },
      { text: "Priority lead replacement",       included: true },
      { text: "Dedicated account rep",           included: true },
      { text: "CRM integration (GoHighLevel)",   included: false },
      { text: "Monthly strategy call",           included: false },
    ],
    cta: "Get Started",
  },
  {
    name: "Scale",
    price: "[PLACEHOLDER]",
    period: "/month",
    tagline: "For multi-crew companies targeting max volume.",
    highlight: false,
    features: [
      { text: "[PLACEHOLDER] leads / month",     included: true },
      { text: "All service types",               included: true },
      { text: "Unlimited service area",          included: true },
      { text: "Email + SMS + CRM push",          included: true },
      { text: "Instant lead replacement",        included: true },
      { text: "Dedicated account rep",           included: true },
      { text: "CRM integration",                 included: true },
      { text: "Monthly strategy call",           included: true },
    ],
    cta: "Contact Us for Scale Pricing",
  },
];

const faqs = [
  {
    q: "Are these leads exclusive?",
    a: "Yes. Every lead is sent to exactly one contractor — you. We never resell the same lead to multiple businesses.",
  },
  {
    q: "What if a lead is bad quality?",
    a: "We have a 100% Lead Replacement Guarantee. If a lead is verified as bad (wrong number, not interested, duplicate), we replace it at no cost.",
  },
  {
    q: "How quickly are leads delivered?",
    a: "In real time. The moment a lead qualifies through our screening, it's pushed to your email and/or SMS — usually within minutes of the customer requesting a quote.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No long-term contracts. You can pause or cancel your plan at the end of any billing cycle.",
  },
  {
    q: "What service areas do you cover?",
    a: "We currently serve major metro areas across the US. [PLACEHOLDER — client to confirm coverage map]",
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteNav />

      <Section bg="navy" className="pt-32 pb-0">
        <Container>
          <div className="max-w-2xl mx-auto text-center pb-16">
            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
            <h1 className="text-5xl font-extrabold text-white tracking-tighter mb-4">
              Plans That Pay for Themselves
            </h1>
            <p className="text-navy-200 text-lg leading-relaxed">
              One booked job typically covers your monthly investment.
              Everything after that is growth. [PLACEHOLDER — client to confirm pricing]
            </p>
          </div>
        </Container>
      </Section>

      <Divider variant="down" fill="fill-navy-50" />

      <Section bg="light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border-2 p-8 flex flex-col gap-6 ${
                  tier.highlight
                    ? "border-green-500 bg-navy-900 shadow-navy-lg"
                    : "border-slate-200 bg-white shadow-card"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}
                <div>
                  <h2 className={`text-2xl font-extrabold mb-1 ${tier.highlight ? "text-white" : "text-navy-900"}`}>
                    {tier.name}
                  </h2>
                  <p className={`text-sm ${tier.highlight ? "text-navy-300" : "text-slate-500"}`}>{tier.tagline}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold tracking-tighter ${tier.highlight ? "text-green-400" : "text-navy-900"}`}>
                    {tier.price}
                  </span>
                  <span className={tier.highlight ? "text-navy-300" : "text-slate-500"}>{tier.period}</span>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2.5 text-sm">
                      {f.included ? (
                        <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-green-400" : "text-green-500"}`} aria-hidden="true" />
                      ) : (
                        <X className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-navy-500" : "text-slate-300"}`} aria-hidden="true" />
                      )}
                      <span className={f.included ? (tier.highlight ? "text-navy-100" : "text-navy-800") : (tier.highlight ? "text-navy-500" : "text-slate-400")}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant={tier.highlight ? "primary" : "secondary"} size="md" className="w-full justify-center">
                  <Link href="/get-quote">
                    {tier.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Guarantee note */}
          <p className="text-center text-slate-500 text-sm mt-8">
            All plans include our{" "}
            <strong className="text-navy-900">100% Lead Replacement Guarantee</strong> and{" "}
            <strong className="text-navy-900">no long-term contracts</strong>.
          </p>
        </Container>
      </Section>

      <Divider variant="down" fill="fill-navy-900" />

      {/* FAQ */}
      <Section bg="navy">
        <Container>
          <SectionHeader eyebrow="FAQ" heading="Common Questions" light center />
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white/10 border border-white/15 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-2">{faq.q}</h3>
                <p className="text-navy-200 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="primary" size="lg">
              <Link href="/get-quote">
                Start Getting Leads <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </>
  );
}
