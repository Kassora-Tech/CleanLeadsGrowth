import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Builds an absolute URL from a path using NEXT_PUBLIC_SITE_URL env var.
 *  Swap domain = change one env var. */
export function absoluteUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://cleaningleadsgrowth.com";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Reads UTM params from a URLSearchParams object (call on client only). */
export function getUtmParams(search: URLSearchParams) {
  return {
    utm_source:   search.get("utm_source")   ?? "",
    utm_medium:   search.get("utm_medium")   ?? "",
    utm_campaign: search.get("utm_campaign") ?? "",
    utm_content:  search.get("utm_content")  ?? "",
    utm_term:     search.get("utm_term")     ?? "",
  };
}

/** Formats a phone number for display. */
export function formatPhone(raw: string): string {
  return raw;
}
