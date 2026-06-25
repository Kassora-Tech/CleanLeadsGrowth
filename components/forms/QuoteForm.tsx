"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle, ArrowRight, ArrowLeft, Clock, Phone, Send, DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  step1Schema,
  step2ResidentialSchema,
  step2CommercialSchema,
  step3Schema,
  step5Schema,
  bookingRequestSchema,
  type Step1Data,
  type Step2ResData,
  type Step2ComData,
  type Step3Data,
  type Step5Data,

} from "@/lib/schemas";
import {
  estimateResidential,
  estimateCommercial,
  FREQUENCY_LABEL,
} from "@/lib/pricing";
import { getUtmParams } from "@/lib/utils";
import {
  trackQuoteStepStarted,
  trackQuoteStepCompleted,
  trackQuoteSubmitted,
} from "@/lib/tracking";
import { cn } from "@/lib/utils";

interface QuoteFormProps {
  /** "embedded" = inside navy section; "page" = on /get-quote white page */
  variant?: "embedded" | "page";
  /** Pre-select service type from page context */
  defaultServiceType?: "residential" | "commercial";
}

const TOTAL_STEPS = 5;

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({
  label, error, required, children, id, light,
}: {
  label: string; error?: string; required?: boolean;
  children: React.ReactNode; id: string; light?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={cn("text-sm font-semibold", light ? "text-navy-100" : "text-navy-900")}>
        {label}
        {required && <span className="text-green-400 ml-1" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error && (
        <p role="alert" aria-live="polite" className="text-xs text-red-400 flex items-center gap-1">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
}

// ── Radio card ────────────────────────────────────────────────────────────────
function RadioCard({
  value, label, description, checked, light, name, onChange,
}: {
  value: string; label: string; description?: string;
  checked: boolean; light: boolean; name: string;
  onChange: (v: string) => void;
}) {
  return (
    <label
      className={cn(
        "flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-150 text-sm font-medium",
        checked
          ? "border-green-500 bg-green-500/10"
          : light
            ? "border-white/20 hover:border-white/40"
            : "border-slate-200 hover:border-slate-300",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span className={cn(
        "h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5",
        checked ? "border-green-500" : light ? "border-white/30" : "border-slate-300",
      )}>
        {checked && <span className="h-2 w-2 rounded-full bg-green-500" />}
      </span>
      <span>
        <span className={cn("block font-semibold", checked ? "text-green-400" : light ? "text-white" : "text-navy-900")}>
          {label}
        </span>
        {description && (
          <span className={cn("block text-xs mt-0.5", light ? "text-navy-300" : "text-slate-500")}>
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

const inputBase = "w-full h-12 px-4 rounded-xl border text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50";
const inputLight = "bg-white/10 border-white/20 text-white placeholder:text-navy-300 focus:bg-white/15";
const inputDark  = "bg-white border-slate-200 text-navy-900 placeholder:text-slate-400 focus:border-green-500";

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ step, light }: { step: number; light: boolean }) {
  const pct = (step / TOTAL_STEPS) * 100;
  return (
    <div className="mb-8">
      <div className="flex justify-between text-xs font-semibold mb-2">
        <span className={light ? "text-navy-200" : "text-slate-500"}>Step {step} of {TOTAL_STEPS}</span>
        <span className={light ? "text-green-400" : "text-green-600"}>{Math.round(pct)}% complete</span>
      </div>
      <div
        className={cn("h-1.5 rounded-full overflow-hidden", light ? "bg-white/15" : "bg-slate-200")}
        role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={TOTAL_STEPS}
        aria-label={`Step ${step} of ${TOTAL_STEPS}`}
      >
        <motion.div
          className="h-full bg-green-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

const stepVariants = {
  enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

// ── Accumulated form state ────────────────────────────────────────────────────
interface FormState {
  serviceType?: "residential" | "commercial";
  // residential
  bedrooms?: string;
  bathrooms?: string;
  // commercial
  sqft?: string;
  propertyType?: string;
  // shared
  frequency?: string;
  estimatedPrice?: number;
  // contact
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsappOptIn?: boolean;
  // utm
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

// ── Main form ─────────────────────────────────────────────────────────────────
export default function QuoteForm({ variant = "embedded", defaultServiceType }: QuoteFormProps) {
  const light = variant === "embedded";
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState<FormState>(
    defaultServiceType ? { serviceType: defaultServiceType } : {},
  );

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { serviceType: defaultServiceType },
  });
  const form2Res = useForm<Step2ResData>({ resolver: zodResolver(step2ResidentialSchema) });
  const form2Com = useForm<Step2ComData>({ resolver: zodResolver(step2CommercialSchema) });
  const form3 = useForm<Step3Data>({ resolver: zodResolver(step3Schema) });
  const form5 = useForm<Step5Data>({
    resolver: zodResolver(step5Schema),
    defaultValues: { whatsappOptIn: false },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = getUtmParams(new URLSearchParams(window.location.search));
    setFormData((prev) => ({ ...prev, ...params }));
  }, []);

  // Fire step-started on mount for step 1
  useEffect(() => { trackQuoteStepStarted(1, "service_type"); }, []);

  const advance = (data: Partial<FormState>, nextStep: number) => {
    const merged = { ...formData, ...data };
    // Compute estimate when we have all the inputs (after step 3)
    if (nextStep === 4) {
      if (merged.serviceType === "residential" && merged.bedrooms && merged.bathrooms && merged.frequency) {
        merged.estimatedPrice = estimateResidential({
          bedrooms: merged.bedrooms,
          bathrooms: merged.bathrooms,
          frequency: merged.frequency,
        });
      } else if (merged.serviceType === "commercial" && merged.sqft && merged.frequency) {
        merged.estimatedPrice = estimateCommercial({
          sqft: merged.sqft,
          propertyType: merged.propertyType ?? "office",
          frequency: merged.frequency,
        });
      }
    }
    setFormData(merged);
    trackQuoteStepCompleted(step, stepLabel(step));
    setDirection(1);
    setStep(nextStep);
    trackQuoteStepStarted(nextStep, stepLabel(nextStep));
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const stepLabel = (s: number) => {
    const labels = ["service_type", "property_details", "frequency", "estimate", "contact"];
    return labels[s - 1] ?? `step_${s}`;
  };

  const handleFinalSubmit = async (data: Step5Data) => {
    const payload = {
      ...formData,
      ...data,
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    };

    const result = bookingRequestSchema.safeParse(payload);
    if (!result.success) {
      setSubmitError("Some fields are invalid. Please review and try again.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error(await res.text());
      trackQuoteSubmitted({
        service: payload.serviceType,
        frequency: payload.frequency,
        estimated_price: payload.estimatedPrice,
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const cardClass = cn(
    "rounded-2xl p-8 lg:p-10",
    light
      ? "bg-white/10 backdrop-blur border border-white/15"
      : "bg-white border border-slate-200 shadow-navy",
  );

  const h3Class = cn("text-xl font-bold mb-1", light ? "text-white" : "text-navy-900");
  const subClass = cn("text-sm mb-6", light ? "text-navy-200" : "text-slate-500");

  // ── Confirmation screen ───────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className={cardClass}>
        <div className="flex flex-col items-center text-center gap-6 py-4">
          <div className="h-16 w-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-400" aria-hidden="true" />
          </div>
          <div>
            <h3 className={cn("text-2xl font-bold mb-2", light ? "text-white" : "text-navy-900")}>
              Request Received!
            </h3>
            <p className={cn("text-base leading-relaxed", light ? "text-navy-200" : "text-slate-600")}>
              We&apos;ll confirm your booking within 24 hours. Here&apos;s what happens next:
            </p>
          </div>
          <ol className="flex flex-col gap-4 text-left w-full max-w-sm">
            {[
              { icon: Clock, text: "We review your request and confirm availability (usually same day)" },
              { icon: Phone, text: "We call you within 24 hours to lock in your booking" },
              { icon: Send,  text: "Your cleaner arrives at the agreed time — fully equipped" },
            ].map(({ icon: Icon, text }, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="h-7 w-7 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="h-3.5 w-3.5 text-green-400" aria-hidden="true" />
                </div>
                <span className={cn("text-sm", light ? "text-navy-200" : "text-slate-600")}>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClass}>
      <ProgressBar step={step} light={light} />

      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>

          {/* ── Step 1: Service type ── */}
          {step === 1 && (
            <motion.div key="step1" custom={direction} variants={stepVariants}
              initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: "easeOut" }}>
              <form onSubmit={form1.handleSubmit((d) => advance(d as Partial<FormState>, 2))} noValidate>
                <h3 className={h3Class}>What can we clean for you?</h3>
                <p className={subClass}>Choose the service that best fits your needs.</p>
                <Field label="Service Type" id="serviceType" error={form1.formState.errors.serviceType?.message} required light={light}>
                  <div role="radiogroup" aria-labelledby="serviceType" className="flex flex-col gap-2">
                    <RadioCard value="residential" label="Residential" description="Home, apartment, or rental property"
                      checked={form1.watch("serviceType") === "residential"} light={light} name="serviceType"
                      onChange={(v) => form1.setValue("serviceType", v as "residential" | "commercial")} />
                    <RadioCard value="commercial" label="Commercial" description="Office, retail, warehouse, or medical facility"
                      checked={form1.watch("serviceType") === "commercial"} light={light} name="serviceType"
                      onChange={(v) => form1.setValue("serviceType", v as "residential" | "commercial")} />
                  </div>
                </Field>
                <Button type="submit" variant="primary" size="lg" className="w-full mt-6">
                  Continue <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </form>
            </motion.div>
          )}

          {/* ── Step 2a: Residential property details ── */}
          {step === 2 && formData.serviceType === "residential" && (
            <motion.div key="step2res" custom={direction} variants={stepVariants}
              initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: "easeOut" }}>
              <form onSubmit={form2Res.handleSubmit((d) => advance(d, 3))} noValidate>
                <h3 className={h3Class}>Tell us about your home</h3>
                <p className={subClass}>This helps us give you an accurate estimate.</p>
                <div className="flex flex-col gap-5">
                  <Field label="Bedrooms" id="bedrooms" error={form2Res.formState.errors.bedrooms?.message} required light={light}>
                    <div role="radiogroup" aria-labelledby="bedrooms" className="grid grid-cols-3 gap-2">
                      {[["studio","Studio"],["1","1 Bed"],["2","2 Beds"],["3","3 Beds"],["4+","4+ Beds"]].map(([val, lbl]) => {
                        const checked = form2Res.watch("bedrooms") === val;
                        return (
                          <label key={val} className={cn(
                            "flex items-center justify-center p-2.5 rounded-xl border cursor-pointer transition-all duration-150 text-sm font-semibold text-center",
                            checked ? "border-green-500 bg-green-500/10 text-green-400"
                              : light ? "border-white/20 text-navy-200 hover:border-white/40"
                                : "border-slate-200 text-navy-700 hover:border-slate-300",
                          )}>
                            <input type="radio" value={val} className="sr-only" {...form2Res.register("bedrooms")} />
                            {lbl}
                          </label>
                        );
                      })}
                    </div>
                  </Field>
                  <Field label="Bathrooms" id="bathrooms" error={form2Res.formState.errors.bathrooms?.message} required light={light}>
                    <div role="radiogroup" aria-labelledby="bathrooms" className="grid grid-cols-3 gap-2">
                      {[["1","1 Bath"],["2","2 Baths"],["3+","3+ Baths"]].map(([val, lbl]) => {
                        const checked = form2Res.watch("bathrooms") === val;
                        return (
                          <label key={val} className={cn(
                            "flex items-center justify-center p-2.5 rounded-xl border cursor-pointer transition-all duration-150 text-sm font-semibold text-center",
                            checked ? "border-green-500 bg-green-500/10 text-green-400"
                              : light ? "border-white/20 text-navy-200 hover:border-white/40"
                                : "border-slate-200 text-navy-700 hover:border-slate-300",
                          )}>
                            <input type="radio" value={val} className="sr-only" {...form2Res.register("bathrooms")} />
                            {lbl}
                          </label>
                        );
                      })}
                    </div>
                  </Field>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button type="button" variant={light ? "ghost" : "secondary"} size="lg" onClick={back}>
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" /> Back
                  </Button>
                  <Button type="submit" variant="primary" size="lg" className="flex-1">
                    Continue <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ── Step 2b: Commercial property details ── */}
          {step === 2 && formData.serviceType === "commercial" && (
            <motion.div key="step2com" custom={direction} variants={stepVariants}
              initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: "easeOut" }}>
              <form onSubmit={form2Com.handleSubmit((d) => advance(d, 3))} noValidate>
                <h3 className={h3Class}>Tell us about your property</h3>
                <p className={subClass}>Helps us size the job and price it accurately.</p>
                <div className="flex flex-col gap-5">
                  <Field label="Approximate Size" id="sqft" error={form2Com.formState.errors.sqft?.message} required light={light}>
                    <div role="radiogroup" aria-labelledby="sqft" className="grid grid-cols-2 gap-2">
                      {[
                        ["under-1000","Under 1,000 sq ft"],
                        ["1001-3000","1,001–3,000 sq ft"],
                        ["3001-5000","3,001–5,000 sq ft"],
                        ["5001+","5,001+ sq ft"],
                      ].map(([val, lbl]) => {
                        const checked = form2Com.watch("sqft") === val;
                        return (
                          <label key={val} className={cn(
                            "flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all duration-150 text-sm font-medium text-center",
                            checked ? "border-green-500 bg-green-500/10 text-green-400"
                              : light ? "border-white/20 text-navy-200 hover:border-white/40"
                                : "border-slate-200 text-navy-700 hover:border-slate-300",
                          )}>
                            <input type="radio" value={val} className="sr-only" {...form2Com.register("sqft")} />
                            {lbl}
                          </label>
                        );
                      })}
                    </div>
                  </Field>
                  <Field label="Property Type" id="propertyType" error={form2Com.formState.errors.propertyType?.message} required light={light}>
                    <div role="radiogroup" aria-labelledby="propertyType" className="grid grid-cols-3 gap-2">
                      {[
                        ["office","Office"],
                        ["retail","Retail"],
                        ["warehouse","Warehouse"],
                        ["medical","Medical"],
                        ["other","Other"],
                      ].map(([val, lbl]) => {
                        const checked = form2Com.watch("propertyType") === val;
                        return (
                          <label key={val} className={cn(
                            "flex items-center justify-center p-2.5 rounded-xl border cursor-pointer transition-all duration-150 text-sm font-medium text-center",
                            checked ? "border-green-500 bg-green-500/10 text-green-400"
                              : light ? "border-white/20 text-navy-200 hover:border-white/40"
                                : "border-slate-200 text-navy-700 hover:border-slate-300",
                          )}>
                            <input type="radio" value={val} className="sr-only" {...form2Com.register("propertyType")} />
                            {lbl}
                          </label>
                        );
                      })}
                    </div>
                  </Field>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button type="button" variant={light ? "ghost" : "secondary"} size="lg" onClick={back}>
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" /> Back
                  </Button>
                  <Button type="submit" variant="primary" size="lg" className="flex-1">
                    Continue <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ── Step 3: Frequency ── */}
          {step === 3 && (
            <motion.div key="step3" custom={direction} variants={stepVariants}
              initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: "easeOut" }}>
              <form onSubmit={form3.handleSubmit((d) => advance(d, 4))} noValidate>
                <h3 className={h3Class}>How often do you need us?</h3>
                <p className={subClass}>Regular bookings come with a discounted rate.</p>
                <Field label="Cleaning Frequency" id="frequency" error={form3.formState.errors.frequency?.message} required light={light}>
                  <div role="radiogroup" aria-labelledby="frequency" className="flex flex-col gap-2">
                    {[
                      ["one-time",  "One-Time",      "Perfect for a single clean or move-in/move-out"],
                      ["monthly",   "Monthly",       "Save 5% — once a month"],
                      ["biweekly",  "Every 2 Weeks", "Save 10% — most popular for homes"],
                      ["weekly",    "Weekly",        "Save 15% — best for busy households or offices"],
                    ].map(([val, lbl, desc]) => (
                      <RadioCard key={val} value={val} label={lbl} description={desc}
                        checked={form3.watch("frequency") === val} light={light} name="frequency"
                        onChange={(v) => form3.setValue("frequency", v as "one-time" | "weekly" | "biweekly" | "monthly")} />
                    ))}
                  </div>
                </Field>
                <div className="flex gap-3 mt-6">
                  <Button type="button" variant={light ? "ghost" : "secondary"} size="lg" onClick={back}>
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" /> Back
                  </Button>
                  <Button type="submit" variant="primary" size="lg" className="flex-1">
                    See My Estimate <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ── Step 4: Instant estimate display ── */}
          {step === 4 && (
            <motion.div key="step4" custom={direction} variants={stepVariants}
              initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: "easeOut" }}>
              <div>
                <h3 className={h3Class}>Your instant estimate</h3>
                <p className={subClass}>Based on your selections — final price confirmed before booking.</p>

                {/* Estimate card */}
                <div className={cn(
                  "rounded-2xl p-6 mb-6 flex flex-col items-center gap-3",
                  light ? "bg-white/15 border border-white/20" : "bg-green-50 border border-green-200",
                )}>
                  <div className="h-12 w-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <div className="text-center">
                    <p className={cn("text-4xl font-extrabold tracking-tighter", light ? "text-white" : "text-navy-900")}>
                      ${formData.estimatedPrice ?? "—"}
                    </p>
                    <p className={cn("text-sm mt-1", light ? "text-navy-300" : "text-slate-500")}>
                      {FREQUENCY_LABEL[formData.frequency ?? ""] ?? ""} estimate
                      {formData.frequency !== "one-time" && " · per visit"}
                    </p>
                  </div>
                  <p className={cn("text-xs text-center", light ? "text-navy-400" : "text-slate-400")}>
                    This is a starting estimate. Final price confirmed after a quick chat. [CLIENT TO CONFIRM RATES]
                  </p>
                </div>

                {/* Summary */}
                <div className={cn(
                  "rounded-xl p-4 mb-6 text-sm flex flex-col gap-2",
                  light ? "bg-white/10 border border-white/15" : "bg-navy-50 border border-slate-200",
                )}>
                  {[
                    ["Service",    formData.serviceType === "residential" ? "Residential Cleaning" : "Commercial Cleaning"],
                    ...(formData.serviceType === "residential"
                      ? [["Bedrooms", formData.bedrooms ?? "—"], ["Bathrooms", formData.bathrooms ?? "—"]]
                      : [["Size", formData.sqft ?? "—"], ["Property Type", formData.propertyType ?? "—"]]
                    ),
                    ["Frequency", FREQUENCY_LABEL[formData.frequency ?? ""] ?? "—"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <span className={cn("font-semibold flex-shrink-0", light ? "text-navy-300" : "text-slate-500")}>{label}</span>
                      <span className={cn("text-right capitalize", light ? "text-white" : "text-navy-900")}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant={light ? "ghost" : "secondary"} size="lg" onClick={back}>
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" /> Back
                  </Button>
                  <Button type="button" variant="primary" size="lg" className="flex-1"
                    onClick={() => { setDirection(1); setStep(5); trackQuoteStepCompleted(4, "estimate"); trackQuoteStepStarted(5, "contact"); }}>
                    Book This Clean <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 5: Contact details ── */}
          {step === 5 && (
            <motion.div key="step5" custom={direction} variants={stepVariants}
              initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: "easeOut" }}>
              <form onSubmit={form5.handleSubmit(handleFinalSubmit)} noValidate>
                <h3 className={h3Class}>Almost done — where should we clean?</h3>
                <p className={subClass}>We&apos;ll confirm your booking within 24 hours.</p>

                <div className="flex flex-col gap-4">
                  <Field label="Your Name" id="name" error={form5.formState.errors.name?.message} required light={light}>
                    <input id="name" type="text" placeholder="Jane Smith" autoComplete="name"
                      className={cn(inputBase, light ? inputLight : inputDark)}
                      aria-invalid={!!form5.formState.errors.name} {...form5.register("name")} />
                  </Field>

                  <Field label="Phone Number" id="phone" error={form5.formState.errors.phone?.message} required light={light}>
                    <input id="phone" type="tel" placeholder="(555) 000-0000" autoComplete="tel" inputMode="tel"
                      className={cn(inputBase, light ? inputLight : inputDark)}
                      aria-invalid={!!form5.formState.errors.phone} {...form5.register("phone")} />
                  </Field>

                  <Field label="Email Address" id="email" error={form5.formState.errors.email?.message} required light={light}>
                    <input id="email" type="email" placeholder="you@example.com" autoComplete="email" inputMode="email"
                      className={cn(inputBase, light ? inputLight : inputDark)}
                      aria-invalid={!!form5.formState.errors.email} {...form5.register("email")} />
                  </Field>

                  <Field label="Suburb / City" id="address" error={form5.formState.errors.address?.message} required light={light}>
                    <input id="address" type="text" placeholder="e.g. Austin, TX" autoComplete="address-level2"
                      className={cn(inputBase, light ? inputLight : inputDark)}
                      aria-invalid={!!form5.formState.errors.address} {...form5.register("address")} />
                  </Field>

                  <label className={cn("flex items-start gap-3 cursor-pointer text-sm", light ? "text-navy-200" : "text-slate-600")}>
                    <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-slate-300 text-green-500 focus:ring-green-500 flex-shrink-0"
                      {...form5.register("whatsappOptIn")} />
                    <span>
                      Contact me via WhatsApp{" "}
                      <span className={light ? "text-navy-300" : "text-slate-400"}>(optional — uses the phone number above)</span>
                    </span>
                  </label>
                </div>

                {submitError && (
                  <p role="alert" aria-live="assertive" className="text-red-400 text-sm mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    {submitError}
                  </p>
                )}

                <div className="flex gap-3 mt-6">
                  <Button type="button" variant={light ? "ghost" : "secondary"} size="lg" onClick={back} disabled={submitting}>
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" /> Back
                  </Button>
                  <Button type="submit" variant="primary" size="lg" className="flex-1" loading={submitting}>
                    {!submitting && <><Send className="h-5 w-5" aria-hidden="true" /> Confirm Booking</>}
                  </Button>
                </div>

                <p className={cn("text-xs text-center mt-4", light ? "text-navy-300" : "text-slate-400")}>
                  By submitting you agree to be contacted to confirm your booking. No spam — ever.
                </p>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
