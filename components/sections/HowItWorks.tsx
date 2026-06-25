"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { ClipboardList, Calculator, CalendarCheck, Sparkles } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/Section";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Request Your Quote",
    body: "Fill out our short 5-step form — select your service type, property details, and how often you need us. Takes under 2 minutes.",
  },
  {
    icon: Calculator,
    number: "02",
    title: "Get an Instant Estimate",
    body: "See your estimated price right away. No waiting, no sales calls — just a transparent starting price based on your property.",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Confirm Your Booking",
    body: "We call you within 24 hours to confirm the details, answer any questions, and lock in your preferred date and time.",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "We Clean — You Relax",
    body: "Our professional, insured cleaners arrive on time and get to work. Satisfaction guaranteed or we'll come back and fix it.",
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
          subheading="From quote request to a sparkling clean space — here's exactly what to expect."
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
                {/* Connector line between steps */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-[calc(100%+12px)] h-px bg-white/10"
                    style={{ width: "calc(100% - 32px)" }}
                    aria-hidden="true"
                  />
                )}

                <div className="flex flex-col gap-4">
                  <div className="relative w-16 h-16">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                      <Icon className="h-7 w-7 text-green-400" aria-hidden="true" />
                    </div>
                    <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">
                      {step.number.replace("0", "")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-lg mb-2 leading-tight">{step.title}</h3>
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
