"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section, Container, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

// PLACEHOLDER — all prices, features, and tier names must be confirmed by client
const tiers = [
  {
    name: "Starter",
    price: "[PLACEHOLDER]",
    period: "/month",
    description: "Perfect for solo operators just getting started with lead gen.",
    features: [
      "[PLACEHOLDER] leads per month",
      "1 service type",
      "1 city / zip code target",
      "Email delivery",
      "Lead replacement guarantee",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "[PLACEHOLDER]",
    period: "/month",
    description: "Built for growing cleaning companies ready to scale their bookings.",
    features: [
      "[PLACEHOLDER] leads per month",
      "Up to 3 service types",
      "Up to 3 cities",
      "Email + SMS delivery",
      "Priority lead replacement",
      "Dedicated account rep",
    ],
    cta: "Most Popular — Get Started",
    highlight: true,
  },
  {
    name: "Scale",
    price: "[PLACEHOLDER]",
    period: "/month",
    description: "For established multi-crew companies targeting high lead volume.",
    features: [
      "[PLACEHOLDER] leads per month",
      "All service types",
      "Unlimited coverage area",
      "Email + SMS + CRM push",
      "Instant lead replacement",
      "Dedicated account rep",
      "Monthly strategy call",
    ],
    cta: "Contact for Scale Pricing",
    highlight: false,
  },
] as const;

export default function PricingTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <Section bg="light">
      <Container ref={ref}>
        <SectionHeader
          eyebrow="Simple Pricing"
          heading="Plans That Pay for Themselves"
          subheading="One booked job typically covers your entire monthly investment. Everything else is profit. [PLACEHOLDER — client to confirm pricing]"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              className={`relative rounded-2xl border-2 p-8 flex flex-col gap-6 ${
                tier.highlight
                  ? "border-green-500 bg-navy-900 shadow-navy-lg"
                  : "border-slate-200 bg-white shadow-card"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <h3
                  className={`text-xl font-bold mb-1 ${
                    tier.highlight ? "text-white" : "text-navy-900"
                  }`}
                >
                  {tier.name}
                </h3>
                <p className={`text-sm ${tier.highlight ? "text-navy-200" : "text-slate-500"}`}>
                  {tier.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span
                  className={`text-4xl font-extrabold tracking-tighter ${
                    tier.highlight ? "text-green-400" : "text-navy-900"
                  }`}
                >
                  {tier.price}
                </span>
                <span className={tier.highlight ? "text-navy-300" : "text-slate-500"}>
                  {tier.period}
                </span>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle
                      className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        tier.highlight ? "text-green-400" : "text-green-500"
                      }`}
                      aria-hidden="true"
                    />
                    <span className={tier.highlight ? "text-navy-100" : "text-slate-700"}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={tier.highlight ? "primary" : "secondary"}
                size="md"
                className="w-full justify-center"
              >
                <Link href="/get-quote">
                  {tier.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-green-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
          >
            View full pricing details
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
