"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Target, UserCheck, Zap, CalendarCheck } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/Section";

const steps = [
  {
    icon: Target,
    number: "01",
    title: "Exclusive Leads Sourced",
    body: "We run targeted campaigns to attract cleaning customers in your service area. Every lead is captured fresh — never scraped from a list.",
  },
  {
    icon: UserCheck,
    number: "02",
    title: "Pre-Screened for Intent",
    body: "Each lead is verified for a real address, genuine service intent, and budget alignment before it ever reaches you. No tire-kickers.",
  },
  {
    icon: Zap,
    number: "03",
    title: "Real-Time Delivery",
    body: "The moment a lead qualifies, it lands in your inbox and/or CRM. First-mover advantage is the difference between a booked job and a missed one.",
  },
  {
    icon: CalendarCheck,
    number: "04",
    title: "You Get More Bookings",
    body: "Contact the lead while they're still warm. Our clients average a 92% quote rate when they respond within 15 minutes. [CLIENT TO PROVIDE REAL STATS]",
  },
] as const;

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Section id="how-it-works" bg="navy" className="relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #5FBF3F 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <Container ref={ref}>
        <SectionHeader
          eyebrow="Simple Process"
          heading="How It Works"
          subheading="From campaign to confirmed booking — here's exactly what happens when you work with us."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                className="relative"
              >
                {/* Connector line between steps (hidden on last) */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-[calc(100%+12px)] w-full h-px bg-white/10"
                    style={{ width: "calc(100% - 32px)" }}
                    aria-hidden="true"
                  />
                )}

                <div className="flex flex-col gap-4">
                  {/* Icon circle */}
                  <div className="relative w-16 h-16">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                      <Icon className="h-7 w-7 text-green-400" aria-hidden="true" />
                    </div>
                    {/* Step number badge */}
                    <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">
                      {step.number.replace("0", "")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-navy-200 text-sm leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
