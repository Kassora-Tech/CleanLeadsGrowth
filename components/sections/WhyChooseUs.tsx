"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Star, Users, TrendingUp, Headphones } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/Section";

const pillars = [
  {
    icon: Star,
    title: "High-Quality Leads",
    body: "Every lead is verified for intent, location, and contact accuracy before delivery. You're not buying a list — you're buying a booked-job opportunity.",
  },
  {
    icon: Users,
    title: "Trusted by Cleaning Pros",
    body: "Hundreds of residential and commercial cleaning businesses across the US rely on our leads to fill their calendars every single month. [PLACEHOLDER]",
  },
  {
    icon: TrendingUp,
    title: "Affordable & Scalable",
    body: "Start with the volume you can handle. Scale up as your team grows. No minimum commitment, no wasted budget on leads outside your area.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    body: "You'll have a real person to call or WhatsApp when you have questions. We don't disappear after the sale — we're invested in your bookings.",
  },
] as const;

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Section bg="light">
      <Container ref={ref}>
        <SectionHeader
          eyebrow="Why Us"
          heading="Built for Cleaning Businesses, Not Generic Lead Buyers"
          subheading="We don't sell leads to lawyers, roofers, or plumbers. We do one thing: get cleaning businesses more booked jobs."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-6 w-6 text-green-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-base mb-2 leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{pillar.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
