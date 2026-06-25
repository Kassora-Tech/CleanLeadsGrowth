"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { ShieldCheck, ThumbsUp, Unlock } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Section, Container } from "@/components/ui/Section";

const iconMap = {
  ShieldCheck,
  ThumbsUp,
  Unlock,
} as const;

export default function GuaranteesBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Section bg="navy" tight>
      <Container ref={ref}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24">
          {siteConfig.guarantees.map((g, i) => {
            const Icon = iconMap[g.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={g.text}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-3 text-center md:text-left"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <span className="text-white font-semibold text-sm lg:text-base leading-tight">
                  {g.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
