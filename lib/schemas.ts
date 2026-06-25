import { z } from "zod";

// Shared Zod schemas — used by both the client quote form and the /api/lead route.

// ── Enums ─────────────────────────────────────────────────────────────────────

export const serviceTypes = ["residential", "commercial"] as const;

export const bedroomOptions   = ["studio", "1", "2", "3", "4+"] as const;
export const bathroomOptions  = ["1", "2", "3+"] as const;
export const sqftOptions      = ["under-1000", "1001-3000", "3001-5000", "5001+"] as const;
export const propertyTypes    = ["office", "retail", "warehouse", "medical", "other"] as const;
export const frequencyOptions = ["one-time", "weekly", "biweekly", "monthly"] as const;

// ── Step schemas (per-step partial validation) ────────────────────────────────

export const step1Schema = z.object({
  serviceType: z.enum(serviceTypes, { error: "Please select a service type." }),
});

export const step2ResidentialSchema = z.object({
  bedrooms:  z.enum(bedroomOptions,  { error: "Please select bedroom count." }),
  bathrooms: z.enum(bathroomOptions, { error: "Please select bathroom count." }),
});

export const step2CommercialSchema = z.object({
  sqft:         z.enum(sqftOptions,     { error: "Please select a size range." }),
  propertyType: z.enum(propertyTypes,   { error: "Please select property type." }),
});

export const step3Schema = z.object({
  frequency: z.enum(frequencyOptions, { error: "Please select a frequency." }),
});

// Step 4 is estimate display — no input schema needed.

export const step5Schema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name.")
    .max(80, "Name too long."),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number.")
    .max(20, "Phone number too long.")
    .regex(/^[0-9\s\-\+\(\)\.]+$/, "Invalid phone number format."),
  email: z.string().email("Please enter a valid email address."),
  address: z
    .string()
    .min(2, "Please enter your suburb or city.")
    .max(120, "Address too long."),
  whatsappOptIn: z.boolean().optional(),
});

// ── Full booking-request schema ───────────────────────────────────────────────

const residentialPayload = step1Schema
  .merge(step2ResidentialSchema)
  .merge(step3Schema)
  .merge(step5Schema)
  .extend({
    estimatedPrice: z.number(),
    utm_source:    z.string().optional(),
    utm_medium:    z.string().optional(),
    utm_campaign:  z.string().optional(),
    utm_content:   z.string().optional(),
    utm_term:      z.string().optional(),
    submittedAt:   z.string().datetime().optional(),
    pageUrl:       z.string().optional(),
  });

const commercialPayload = step1Schema
  .merge(step2CommercialSchema)
  .merge(step3Schema)
  .merge(step5Schema)
  .extend({
    estimatedPrice: z.number(),
    utm_source:    z.string().optional(),
    utm_medium:    z.string().optional(),
    utm_campaign:  z.string().optional(),
    utm_content:   z.string().optional(),
    utm_term:      z.string().optional(),
    submittedAt:   z.string().datetime().optional(),
    pageUrl:       z.string().optional(),
  });

// Union — validated by serviceType discriminant at the API route
export const bookingRequestSchema = z.union([residentialPayload, commercialPayload]);

export type BookingRequest    = z.infer<typeof bookingRequestSchema>;
export type Step1Data         = z.infer<typeof step1Schema>;
export type Step2ResData      = z.infer<typeof step2ResidentialSchema>;
export type Step2ComData      = z.infer<typeof step2CommercialSchema>;
export type Step3Data         = z.infer<typeof step3Schema>;
export type Step5Data         = z.infer<typeof step5Schema>;
