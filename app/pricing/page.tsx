import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/siteConfig";
import { Section, Container, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title:       "Pricing — Professional Cleaning Services",
  description: `Transparent cleaning service pricing. Residential from $110, commercial from $150. Recurring discounts up to 15%. ${siteConfig.name} — no hidden fees.`,
  alternates:  { canonical: absoluteUrl("/pricing") },
};

// PLACEHOLDER — client to confirm all rates before launch. Update lib/pricing.ts to change rates.
const pricingInfo = [
  {
    title: "Residential Cleaning",
    startingFrom: "$110",
    period: "per visit",
    note: "Studio / 1-bed starting price. Price increases with property size.",
    details: [
      "Studio / 1 bed: from $110",
      "2 bed: from $160",
      "3 bed: from $195",
      "4+ bed: from $230",
      "+$20 per additional bathroom",
    ],
    discounts: "Save up to 15% with a recurring schedule",
    href: "/services/residential",
  },
  {
    title: "Commercial Cleaning",
    startingFrom: "$150",
    period: "per visit",
    note: "Under 1,000 sq ft starting price. Price increases with property size.",
    details: [
      "Under 1,000 sq ft: from $150",
      "1,001–3,000 sq ft: from $260",
      "3,001–5,000 sq ft: from $390",
      "5,001+ sq ft: from $550",
    ],
    discounts: "Save up to 15% with a recurring contract",
    href: "/services/commercial",
  },
];

const faqs = [
  {
    q: "How is my price calculated?",
    a: "Your estimate is based on your property type, size, and how often you need us. You'll see an instant estimate in the quote form — the final price is confirmed before we book.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. The price you see is the price you pay. If you add on services (oven, carpet, windows), those are priced transparently before your booking is confirmed.",
  },
  {
    q: "Do I save money with a recurring booking?",
    a: "Yes — monthly bookings save 5%, every-two-weeks save 10%, and weekly saves 15%. Discounts apply automatically in the quote form.",
  },
  {
    q: "What's included in a standard clean?",
    a: "Vacuuming, mopping, kitchen surfaces, bathroom scrub, dusting, and bin emptying. See the full checklist on our Residential and Commercial service pages.",
  },
  {
    q: "Can I request a one-time deep clean?",
    a: "Absolutely. Select 'One-Time' in the quote form and we'll book a thorough deep clean. Popular for move-ins, spring cleans, and post-construction.",
  },
  {
    q: "What if I'm not happy with the clean?",
    a: "We'll come back and re-clean the areas you're not satisfied with, free of charge. No arguments — that's our satisfaction guarantee.",
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
              Simple, Transparent Pricing
            </h1>
            <p className="text-navy-200 text-lg leading-relaxed">
              No hidden fees, no surprises. Get your instant estimate online and
              we confirm the final price before locking in your booking.
              <br />
              <span className="text-navy-400 text-sm">[PLACEHOLDER — client to confirm rates before launch]</span>
            </p>
          </div>
        </Container>
      </Section>

      <Divider variant="down" fill="fill-navy-50" />

      <Section bg="light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
            {pricingInfo.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border-2 border-slate-200 bg-white shadow-card p-8 flex flex-col gap-5"
              >
                <h2 className="text-2xl font-extrabold text-navy-900">{service.title}</h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tighter text-green-600">
                    {service.startingFrom}
                  </span>
                  <span className="text-slate-500">{service.period}</span>
                </div>
                <p className="text-slate-500 text-sm">{service.note}</p>
                <ul className="flex flex-col gap-2 flex-1">
                  {service.details.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-navy-800">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="text-green-600 text-sm font-semibold">{service.discounts}</p>
                <Button asChild variant="secondary" size="md" className="w-full justify-center">
                  <Link href={service.href}>
                    Learn More <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 text-sm mt-8">
            Use the <Link href="/get-quote" className="text-green-600 font-semibold hover:underline">quote form</Link> to
            see your exact estimate instantly — it takes under 2 minutes.
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
                Get Your Free Estimate <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </>
  );
}
