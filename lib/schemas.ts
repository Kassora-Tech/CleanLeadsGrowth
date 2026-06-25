import { z } from "zod";

// Shared Zod schemas — used by both client forms and the API route handler.

export const serviceTypes = [
  "residential-cleaning",
  "commercial-cleaning",
  "move-in-move-out",
  "carpet-upholstery",
  "window-pressure-washing",
  "other",
] as const;

export const leadVolumeOptions = [
  "1-10",
  "11-25",
  "26-50",
  "50+",
] as const;

// Step schemas (used per-step for partial validation)
export const step1Schema = z.object({
  serviceType: z.enum(serviceTypes, "Please select your primary service type."),
});

export const step2Schema = z.object({
  serviceArea: z
    .string()
    .min(2, "Please enter your city or service area.")
    .max(100, "Service area too long."),
  leadVolume: z.enum(leadVolumeOptions, "Please select a lead volume."),
});

export const step3Schema = z.object({
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
  whatsappOptIn: z.boolean().optional(),
});

// Full lead schema — includes hidden UTM + metadata fields
export const leadSchema = step1Schema.merge(step2Schema).merge(step3Schema).extend({
  utm_source:   z.string().optional(),
  utm_medium:   z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content:  z.string().optional(),
  utm_term:     z.string().optional(),
  submittedAt:  z.string().datetime().optional(),
  pageUrl:      z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;
export type Step1Data   = z.infer<typeof step1Schema>;
export type Step2Data   = z.infer<typeof step2Schema>;
export type Step3Data   = z.infer<typeof step3Schema>;
