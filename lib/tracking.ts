"use client";

// Typed analytics helpers.
// All functions no-op gracefully when GA/Pixel IDs are absent — dev/build never breaks.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?:  (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

// ── GA4 ──────────────────────────────────────────────────────────────────────

function ga(eventName: string, params?: EventParams) {
  if (typeof window === "undefined" || !window.gtag) return;
  // Dev console log for verification without live GA4
  if (process.env.NODE_ENV === "development") {
    console.log(`[GA4] ${eventName}`, params ?? {});
  }
  window.gtag("event", eventName, params);
}

// ── Meta Pixel ────────────────────────────────────────────────────────────────

function pixel(eventName: string, params?: EventParams) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", eventName, params);
}

// ── Public event helpers ──────────────────────────────────────────────────────

export function trackQuoteStepStarted(step: number, label?: string) {
  ga("quote_step_started", { step, label });
}

export function trackQuoteStepCompleted(step: number, label?: string) {
  ga("quote_step_completed", { step, label });
}

export function trackQuoteSubmitted(params?: EventParams) {
  ga("quote_submitted", params);
  pixel("Lead", params);
}

export function trackCallButtonClick() {
  ga("call_button_click");
  pixel("Contact");
}

export function trackWhatsAppClick() {
  ga("whatsapp_click");
  pixel("Contact");
}

/** Fire event then redirect — won't drop the event. */
export async function fireAndRedirect(
  eventFn: () => void,
  href: string,
) {
  eventFn();
  // Small delay to allow event flush; bail after 300ms max
  await new Promise<void>((resolve) => setTimeout(resolve, 150));
  window.location.href = href;
}
