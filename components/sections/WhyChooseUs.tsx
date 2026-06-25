"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { ShieldCheck, Clock, Smile, Headphones } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/Section";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Fully Insured & Vetted",
    body: "Every cleaner is background-checked, insured, and trained to our standards before they ever step into a client's property. [CLIENT TO CONFIRM]",
  },
  {
    icon: Clock,
    title: "Reliable & On-Time",
    body: "We show up when we say we will. If anything changes, you'll hear from us with plenty of notice — never a no-show. [CLIENT TO CONFIRM]",
  },
  {
    icon: Smile,
    title: "Satisfaction Guaranteed",
    body: "Not happy with any part of the clean? We'll come back and make it right, free of charge. No arguments, no fine print.",
  },
  {
    icon: Headphones,
    title: "Easy to Reach",
    body: "Call, email, or WhatsApp us — a real person responds. We're here before, during, and after every booking.",
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
          heading="Cleaning You Can Actually Count On"
          subheading="We&apos;re not a marketplace — we&apos;re the cleaning company. One team, one standard, every time."
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
                  <h3 className="font-bold text-navy-900 text-base mb-2 leading-tight">{pillar.title}</h3>
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
