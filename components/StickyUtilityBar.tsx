"use client";

import { Phone, MessageCircle, ClipboardList } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { fireAndRedirect, trackCallButtonClick, trackWhatsAppClick } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * Sticky utility bar — always visible on scroll, mobile + desktop.
 * On desktop: top-right corner cluster. On mobile: full-width bottom bar.
 * Thumb-reachable placement on mobile (bottom of viewport).
 */
export default function StickyUtilityBar() {
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

  return (
    <>
      {/* ── Mobile: fixed bottom bar ──────────────────────────────────── */}
      <div
        className={cn(
          "lg:hidden fixed bottom-0 left-0 right-0 z-50",
          "flex items-stretch border-t border-slate-200",
          "bg-white/95 backdrop-blur-sm shadow-[0_-4px_20px_rgba(11,42,74,0.12)]",
          // Safe area padding for devices with home indicator
          "pb-safe",
        )}
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        role="navigation"
        aria-label="Quick contact"
      >
        <a
          href={`tel:${siteConfig.phoneTel}`}
          onClick={handleCall}
          className={cn(
            "flex-1 flex flex-col items-center justify-center gap-1 py-3",
            "text-navy-900 text-xs font-semibold",
            "hover:bg-navy-50 transition-colors",
            "min-h-[56px]",
            "focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-green-500",
          )}
          aria-label={`Call ${siteConfig.phone}`}
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span>Call Now</span>
        </a>

        <div className="w-px bg-slate-200 self-stretch" aria-hidden="true" />

        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}`}
          onClick={handleWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex-1 flex flex-col items-center justify-center gap-1 py-3",
            "text-green-600 text-xs font-semibold",
            "hover:bg-green-500/5 transition-colors",
            "min-h-[56px]",
            "focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-green-500",
          )}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        <div className="w-px bg-slate-200 self-stretch" aria-hidden="true" />

        <Link
          href="/get-quote"
          className={cn(
            "flex-1 flex flex-col items-center justify-center gap-1 py-3",
            "bg-green-500 text-white text-xs font-semibold",
            "hover:bg-green-600 transition-colors",
            "min-h-[56px]",
            "focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-white",
          )}
        >
          <ClipboardList className="h-5 w-5" aria-hidden="true" />
          <span>Get Quote</span>
        </Link>
      </div>
    </>
  );
}
