"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/Section";

// PLACEHOLDER — all testimonials below must be replaced with real customer reviews
const testimonials = [
  {
    quote:
      "The team arrived exactly on time and our place was spotless. I've tried three other services before — this is the only one I've kept. Booking online in under 2 minutes was a bonus.",
    name: "[PLACEHOLDER — Customer Name]",
    location: "[PLACEHOLDER — City, State]",
    rating: 5,
  },
  {
    quote:
      "We use them for our office every fortnight. Consistent, professional, and they never miss anything. Having a direct line to call if we ever need a reschedule is exactly what we needed.",
    name: "[PLACEHOLDER — Business Name / Contact]",
    location: "[PLACEHOLDER — City, State]",
    rating: 5,
  },
  {
    quote:
      "Booked a move-out clean at short notice and they fit us in the next day. The property manager was impressed and we got our full bond back. Will absolutely use again.",
    name: "[PLACEHOLDER — Customer Name]",
    location: "[PLACEHOLDER — City, State]",
    rating: 5,
  },
  {
    quote:
      "I was nervous about letting strangers into my home but the background-check process gave me confidence. The clean was thorough and they were respectful of everything. Highly recommend.",
    name: "[PLACEHOLDER — Customer Name]",
    location: "[PLACEHOLDER — City, State]",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className={`h-4 w-4 ${i < rating ? "text-green-500" : "text-slate-300"}`}
          fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <Section id="reviews" bg="navy" className="relative overflow-hidden">
      <Container ref={ref}>
        <SectionHeader
          eyebrow="Customer Reviews"
          heading="What Our Customers Say"
          subheading="Real reviews from real customers. [PLACEHOLDER — replace with actual reviews]"
          light
        />

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div
            className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur border border-white/15"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                className="p-8 lg:p-12"
              >
                <div className="text-green-400 text-6xl font-serif leading-none mb-4 select-none" aria-hidden="true">
                  &ldquo;
                </div>
                <blockquote>
                  <p className="text-white text-lg lg:text-xl leading-relaxed mb-6 italic">
                    {testimonials[current].quote}
                  </p>
                  <footer>
                    <StarRating rating={testimonials[current].rating} />
                    <div className="mt-3">
                      <cite className="font-bold text-white not-italic block">
                        {testimonials[current].name}
                      </cite>
                      <span className="text-navy-200 text-sm">{testimonials[current].location}</span>
                    </div>
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-6">
            <button onClick={prev}
              className="h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              aria-label="Previous review">
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 ${
                    i === current ? "w-6 bg-green-500" : "w-2 bg-white/30"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                />
              ))}
            </div>

            <button onClick={next}
              className="h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              aria-label="Next review">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stat strip */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 pt-12 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { value: "5+",    label: "Years in Business" },          // PLACEHOLDER
            { value: "1,200+", label: "Jobs Completed" },            // PLACEHOLDER
            { value: "4.9★",  label: "Avg. Customer Rating" },       // PLACEHOLDER
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold text-green-400 tracking-tighter">{stat.value}</div>
              <div className="text-navy-200 text-sm mt-1">{stat.label} [PLACEHOLDER]</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
