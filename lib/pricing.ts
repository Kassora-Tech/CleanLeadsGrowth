// Centralised pricing logic — update rates here only.
// All estimate calculations reference this file so a single edit propagates everywhere.

// ── Residential base rates (USD) ─────────────────────────────────────────────

// PLACEHOLDER — client to confirm all rates before launch

export const RESIDENTIAL_BASE: Record<string, number> = {
  "studio": 110,
  "1":      130,
  "2":      160,
  "3":      195,
  "4+":     230,
};

// Additional charge per bathroom beyond the first
export const BATHROOM_SURCHARGE = 20;

// ── Commercial base rates by sq-ft band ──────────────────────────────────────

export const COMMERCIAL_BASE: Record<string, number> = {
  "under-1000": 150,
  "1001-3000":  260,
  "3001-5000":  390,
  "5001+":      550,
};

// ── Frequency multipliers ────────────────────────────────────────────────────

export const FREQUENCY_MULTIPLIER: Record<string, number> = {
  "one-time":  1.00,
  "monthly":   0.95,
  "biweekly":  0.90,
  "weekly":    0.85,
};

export const FREQUENCY_LABEL: Record<string, string> = {
  "one-time":  "One-Time",
  "monthly":   "Monthly",
  "biweekly":  "Every 2 Weeks",
  "weekly":    "Weekly",
};

// ── Calculation helpers ───────────────────────────────────────────────────────

export interface ResidentialDetails {
  bedrooms: string;    // "studio" | "1" | "2" | "3" | "4+"
  bathrooms: string;   // "1" | "2" | "3+"
  frequency: string;
}

export interface CommercialDetails {
  sqft: string;        // "under-1000" | "1001-3000" | "3001-5000" | "5001+"
  propertyType: string;
  frequency: string;
}

export function estimateResidential(details: ResidentialDetails): number {
  const base   = RESIDENTIAL_BASE[details.bedrooms] ?? RESIDENTIAL_BASE["2"];
  const bathNum = details.bathrooms === "3+" ? 3 : Number(details.bathrooms);
  const bathExtra = Math.max(0, bathNum - 1) * BATHROOM_SURCHARGE;
  const multiplier = FREQUENCY_MULTIPLIER[details.frequency] ?? 1;
  return Math.round((base + bathExtra) * multiplier);
}

export function estimateCommercial(details: CommercialDetails): number {
  const base = COMMERCIAL_BASE[details.sqft] ?? COMMERCIAL_BASE["under-1000"];
  const multiplier = FREQUENCY_MULTIPLIER[details.frequency] ?? 1;
  return Math.round(base * multiplier);
}
