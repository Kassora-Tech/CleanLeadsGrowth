"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { fireAndRedirect, trackCallButtonClick, trackWhatsAppClick } from "@/lib/tracking";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCall = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await fireAndRedirect(trackCallButtonClick, `tel:${siteConfig.phoneTel}`);
  };

  const handleWhatsApp = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await fireAndRedirect(
      trackWhatsAppClick,
      `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
        "Hi! I'd like to get a quote for a cleaning service."
      )}`,
    );
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change / resize
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-navy-950/95 backdrop-blur shadow-navy"
          : "bg-transparent",
      )}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo / brand */}
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
          >
            <span className="text-xl font-extrabold text-white tracking-tight">
              {siteConfig.name.replace("Growth", "")}
              <span className="text-green-400">Growth</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 min-w-0" aria-label="Main navigation">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-navy-200 hover:text-white text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA cluster — phone on xl+, WhatsApp + Get Quote from lg+ */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Phone pill — only xl+ to avoid crowding at 1024px */}
            <a
              href={`tel:${siteConfig.phoneTel}`}
              onClick={handleCall}
              className={cn(
                "hidden xl:flex items-center gap-2 h-9 px-3 rounded-full",
                "bg-white/10 backdrop-blur border border-white/20",
                "text-white text-sm font-semibold",
                "hover:bg-white/20 transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
              )}
              aria-label={`Call us at ${siteConfig.phone}`}
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">{siteConfig.phone}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              onClick={handleWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-2 h-9 px-3 rounded-full",
                "bg-green-500 text-white shadow-green",
                "hover:bg-green-600 hover:-translate-y-0.5",
                "transition-all duration-200 text-sm font-semibold",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2",
              )}
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            {/* Get Quote */}
            <Link
              href="/get-quote"
              className={cn(
                "flex items-center gap-2 h-9 px-3 rounded-full",
                "bg-white text-navy-900 shadow-card",
                "hover:bg-navy-50 hover:-translate-y-0.5",
                "transition-all duration-200 text-sm font-semibold",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2",
              )}
            >
              <ClipboardList className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">Get Quote</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-navy-950/98 backdrop-blur border-t border-white/10 overflow-hidden"
          >
            <nav className="container-xl py-6 flex flex-col gap-4" aria-label="Mobile navigation">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-navy-100 hover:text-white font-medium py-2 border-b border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild variant="primary" size="md" className="mt-2 justify-center">
                <Link href="/get-quote" onClick={() => setOpen(false)}>
                  Get a Free Quote
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
