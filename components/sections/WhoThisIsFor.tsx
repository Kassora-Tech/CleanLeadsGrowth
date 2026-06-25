"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { ArrowRight, Home, Building2, PackageOpen, Sofa, Wind, Star } from "lucide-react";
import Link from "next/link";
import { Section, Container, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const serviceCards = [
  {
    icon: Home,
    title: "House Cleaning",
    description: "Regular or one-time cleans for homes, apartments, and townhouses. We handle it all.",
    href: "/services/residential",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Building2,
    title: "Office & Commercial",
    description: "Flexible commercial cleaning for offices, retail, warehouses, and medical facilities.",
    href: "/services/commercial",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: PackageOpen,
    title: "Move-In / Move-Out",
    description: "Full deep clean for property handover — leave the old place spotless or start fresh.",
    href: "/get-quote",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Sofa,
    title: "Carpet & Upholstery",
    description: "Add-on steam cleaning for carpets, rugs, and furniture during any booked service.",
    href: "/get-quote",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: Wind,
    title: "Window Cleaning",
    description: "Interior and exterior window cleaning available as an add-on to any booking.",
    href: "/get-quote",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    icon: Star,
    title: "Deep Clean",
    description: "First-time or spring-clean? Our deep clean covers every corner — great for a fresh start.",
    href: "/get-quote",
    color: "text-green-600",
    bg: "bg-green-50",
  },
] as const;

export default function ServicesOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <Section id="services" bg="white">
      <Container ref={ref}>
        <SectionHeader
          eyebrow="Our Services"
          heading={<>Everything You Need,<br />Done Right</>}
          subheading="Residential or commercial, one-time or recurring — we have a service that fits your space and schedule."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              >
                <Link href={card.href} className="block h-full" tabIndex={0}>
                  <Card greenBar hover className="h-full group cursor-pointer">
                    <div className="p-6 flex flex-col gap-4 h-full">
                      <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-6 w-6 ${card.color}`} aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-navy-900 font-bold text-lg mb-2 leading-tight">{card.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{card.description}</p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600 text-sm font-semibold mt-auto group-hover:gap-2 transition-all duration-200">
                        <span>Get a quote</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
