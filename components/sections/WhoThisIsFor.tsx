"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { ArrowRight, Home, Building2, PackageOpen, Sofa, Wind, Plus } from "lucide-react";
import Link from "next/link";
import { Section, Container, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const serviceCards = [
  {
    icon: Home,
    title: "Residential Cleaning",
    description: "Homeowners booking recurring or one-time house cleans in your area.",
    slug: "residential-cleaning-leads",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    description: "Office managers, facility directors, and business owners seeking janitorial contracts.",
    slug: "commercial-cleaning-leads",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: PackageOpen,
    title: "Move-In / Move-Out",
    description: "Tenants and homeowners with confirmed move dates who need a deep clean fast.",
    slug: "move-in-move-out-leads",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Sofa,
    title: "Carpet & Upholstery",
    description: "Customers needing specialized carpet, rug, or furniture cleaning services.",
    slug: "carpet-upholstery-leads",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: Wind,
    title: "Window & Pressure Washing",
    description: "Homeowners and businesses ready to book exterior window or pressure washing.",
    slug: "window-pressure-washing-leads",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    icon: Plus,
    title: "More Service Types",
    description: "Post-construction, Airbnb, hoarding clean-outs, and more. Ask us about custom lead types.",
    slug: null,
    color: "text-green-600",
    bg: "bg-green-50",
  },
] as const;

export default function WhoThisIsFor() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <Section id="services" bg="white">
      <Container ref={ref}>
        <SectionHeader
          eyebrow="Who This Is For"
          heading={<>Leads for Every Type of<br />Cleaning Business</>}
          subheading="Whether you run a solo operation or a multi-crew company, we have leads matched to your specialty and service area."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((card, i) => {
            const Icon = card.icon;
            const inner = (
              <div className="p-6 flex flex-col gap-4 h-full">
                <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-6 w-6 ${card.color}`} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-navy-900 font-bold text-lg mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{card.description}</p>
                </div>
                {card.slug && (
                  <div className="flex items-center gap-1 text-green-600 text-sm font-semibold mt-auto group-hover:gap-2 transition-all duration-200">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                )}
              </div>
            );

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              >
                {card.slug ? (
                  <Link href={`/services/${card.slug}`} className="block h-full" tabIndex={0}>
                    <Card greenBar hover className="h-full group cursor-pointer">
                      {inner}
                    </Card>
                  </Link>
                ) : (
                  <Card greenBar={false} hover={false} className="h-full border-dashed">
                    {inner}
                  </Card>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
