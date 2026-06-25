"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

// ── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, start = false, isDecimal = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(isDecimal ? Math.round(target * eased * 10) / 10 : Math.floor(target * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, duration, isDecimal]);

  return count;
}

// ── Single stat counter ───────────────────────────────────────────────────────
function StatCounter({
  value, suffix, label, isDecimal, started, delay,
}: {
  value: number; suffix: string; label: string;
  isDecimal?: boolean; started: boolean; delay: number;
}) {
  const [localStart, setLocalStart] = useState(false);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setLocalStart(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);

  const count = useCountUp(value, 1600, localStart, isDecimal);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="text-center lg:text-left"
    >
      <div className="relative inline-block">
        <span className="text-4xl lg:text-5xl font-extrabold text-white tabular-nums tracking-tighter">
          {isDecimal ? count.toFixed(1) : count}
          {suffix}
        </span>
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 bg-green-500 rounded-full"
          initial={{ scaleX: 0 }}
          animate={localStart ? { scaleX: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.7, ease: "easeOut" }}
          style={{ originX: 0, width: "100%" }}
        />
      </div>
      <p className="text-navy-200 text-sm font-medium mt-2 leading-tight">{label}</p>
    </motion.div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const shouldStart = prefersReducedMotion ? true : inView;

  return (
    <section
      className="relative min-h-[100dvh] lg:min-h-0 bg-gradient-hero overflow-hidden pt-24 pb-0 lg:pt-32 lg:pb-0"
      aria-label="Hero"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-xl relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-12 lg:gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col gap-6 lg:gap-8 pb-12 lg:pb-24">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full">
                <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Trusted, Insured & Background-Checked [CLIENT TO CONFIRM]
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tighter text-balance"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Book a Reliable{" "}
              <span className="text-green-400">Clean in Minutes.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg lg:text-xl text-navy-200 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              Professional residential and commercial cleaning — get a free instant
              estimate online and we&apos;ll confirm your booking within 24 hours.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <Button asChild variant="primary" size="lg">
                <Link href="/get-quote">
                  Get a Free Quote
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {siteConfig.heroStats.map((stat, i) => (
                <StatCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  isDecimal={"isDecimal" in stat ? (stat as { isDecimal?: boolean }).isDecimal : false}
                  started={shouldStart}
                  delay={i * 200}
                />
              ))}
            </motion.div>

            <p className="text-2xs text-navy-400 -mt-2">
              [CLIENT TO PROVIDE REAL STATS]
            </p>
          </div>

          {/* ── Right: Hero image + trust badge ── */}
          <motion.div
            className="relative hidden lg:flex justify-end items-end h-full pb-0"
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* PLACEHOLDER — replace src with real hero photo (recommended: 900×1100px) */}
            <div className="relative w-[420px] h-[520px] rounded-t-3xl overflow-hidden bg-navy-800">
              <div className="absolute inset-0 bg-gradient-to-b from-navy-700 to-navy-900 flex items-center justify-center">
                <p className="text-navy-400 text-sm text-center px-4">
                  [PLACEHOLDER — Hero cleaner photo<br />900×1100px recommended]
                </p>
              </div>
              <div
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950/60 to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Floating trust badge */}
            <motion.div
              className={cn(
                "absolute -left-8 top-1/2 -translate-y-1/2",
                "bg-white rounded-2xl shadow-navy-lg p-5 max-w-[220px]",
              )}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-white" aria-hidden="true" />
                </div>
                <p className="text-xs font-bold text-navy-900 leading-tight">
                  Professional.
                  <br />Insured.
                  <br />Guaranteed.
                </p>
              </div>
              <div className="flex items-center gap-1 mt-3 pt-3 border-t border-slate-100">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="h-3.5 w-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-2xs text-slate-500 ml-1 font-medium">4.9/5</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
