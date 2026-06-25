"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Section, Container } from "@/components/ui/Section";
import QuoteForm from "@/components/forms/QuoteForm";

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <Section bg="navy" className="relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #5FBF3F, transparent 70%)" }}
        aria-hidden="true"
      />

      <Container ref={ref}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Get Started Today
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tighter mb-4 text-balance">
              Stop Chasing Leads.{" "}
              <span className="text-green-400">Start Getting Cleanings.</span>
            </h2>
            <p className="text-navy-200 text-lg leading-relaxed">
              Fill out the form below and we&apos;ll review your service area and
              reach out within 24 hours with your first lead batch.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <QuoteForm variant="embedded" />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
