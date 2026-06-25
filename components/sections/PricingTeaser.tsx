"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { ArrowRight, Home, Building2 } from "lucide-react";
import Link from "next/link";
import { Section, Container, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

// PLACEHOLDER — client to confirm all rates before launch. Update lib/pricing.ts to change rates.
const serviceSummaries = [
  {
    icon: Home,
    title: "Residential Cleaning",
    pricingNote: "Starting from $110",   // PLACEHOLDER — matches lib/pricing.ts RESIDENTIAL_BASE studio
    period: "per visit",
    description: "Studio to 4-bedroom homes. One-time or recurring.",
    highlights: [
      "Standard & deep clean options",
      "Recurring discount up to 15%",
      "Add-ons: oven, fridge, carpet, windows",
      "Move-in / move-out available",
    ],
    href: "/services/residential",
    highlight: false,
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    pricingNote: "Starting from $150",   // PLACEHOLDER — matches lib/pricing.ts COMMERCIAL_BASE under-1000
    period: "per visit",
    description: "Offices, retail, warehouses & medical facilities.",
    highlights: [
      "Flexible after-hours scheduling",
      "Recurring discount up to 15%",
      "Add-ons: carpet, pressure wash, windows",
      "Post-construction & end-of-lease",
    ],
    href: "/services/commercial",
    highlight: true,
  },
] as const;

export default function PricingTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <Section bg="light">
      <Container ref={ref}>
        <SectionHeader
          eyebrow="Transparent Pricing"
          heading="Simple, Honest Pricing"
          subheading="No hidden fees, no surprises. Get an instant estimate in the quote form — final price confirmed before we book. [PLACEHOLDER — client to confirm rates]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {serviceSummaries.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className={`relative rounded-2xl border-2 p-8 flex flex-col gap-6 ${
                  service.highlight
                    ? "border-green-500 bg-navy-900 shadow-navy-lg"
                    : "border-slate-200 bg-white shadow-card"
                }`}
              >
                {service.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${service.highlight ? "bg-green-500/20" : "bg-navy-50"}`}>
                    <Icon className={`h-5 w-5 ${service.highlight ? "text-green-400" : "text-navy-700"}`} aria-hidden="true" />
                  </div>
                  <h3 className={`text-xl font-bold ${service.highlight ? "text-white" : "text-navy-900"}`}>
                    {service.title}
                  </h3>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-extrabold tracking-tighter ${service.highlight ? "text-green-400" : "text-navy-900"}`}>
                    {service.pricingNote}
                  </span>
                  <span className={service.highlight ? "text-navy-300" : "text-slate-500"}>
                    {" "}{service.period}
                  </span>
                </div>

                <p className={`text-sm ${service.highlight ? "text-navy-200" : "text-slate-600"}`}>
                  {service.description}
                </p>

                <ul className="flex flex-col gap-2.5 flex-1">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <ArrowRight className={`h-4 w-4 mt-0.5 flex-shrink-0 ${service.highlight ? "text-green-400" : "text-green-500"}`} aria-hidden="true" />
                      <span className={service.highlight ? "text-navy-100" : "text-slate-700"}>{item}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild variant={service.highlight ? "primary" : "secondary"} size="md" className="w-full justify-center">
                  <Link href={service.href}>
                    Learn More <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/get-quote"
            className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-green-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
          >
            Get your instant estimate now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
