"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, ArrowRight, ArrowLeft, Clock, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  leadSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  type LeadFormData,
  type Step1Data,
  type Step2Data,
  type Step3Data,
} from "@/lib/schemas";
import { getUtmParams } from "@/lib/utils";
import { trackLeadFormSubmit, trackQuoteStepCompleted } from "@/lib/tracking";
import { cn } from "@/lib/utils";

interface QuoteFormProps {
  /** "embedded" = inside FinalCTA navy section; "page" = on /get-quote white page */
  variant?: "embedded" | "page";
}

const SERVICE_LABELS: Record<string, string> = {
  "residential-cleaning":     "Residential Cleaning",
  "commercial-cleaning":      "Commercial Cleaning",
  "move-in-move-out":         "Move-In / Move-Out",
  "carpet-upholstery":        "Carpet & Upholstery",
  "window-pressure-washing":  "Window & Pressure Washing",
  "other":                    "Other / Multiple",
};

const VOLUME_LABELS: Record<string, string> = {
  "1-10":  "1–10 leads / month",
  "11-25": "11–25 leads / month",
  "26-50": "26–50 leads / month",
  "50+":   "50+ leads / month",
};

const TOTAL_STEPS = 4;

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({
  label,
  error,
  required,
  children,
  id,
  light,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  id: string;
  light?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={cn(
          "text-sm font-semibold",
          light ? "text-navy-100" : "text-navy-900",
        )}
      >
        {label}
        {required && <span className="text-green-400 ml-1" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="text-xs text-red-400 flex items-center gap-1"
        >
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
}

// ── Input styles ──────────────────────────────────────────────────────────────
const inputBase =
  "w-full h-12 px-4 rounded-xl border text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50";

const inputLight =
  "bg-white/10 border-white/20 text-white placeholder:text-navy-300 focus:bg-white/15";

const inputDark =
  "bg-white border-slate-200 text-navy-900 placeholder:text-slate-400 focus:border-green-500";

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ step, light }: { step: number; light: boolean }) {
  const pct = ((step) / TOTAL_STEPS) * 100;
  return (
    <div className="mb-8">
      <div className="flex justify-between text-xs font-semibold mb-2">
        <span className={light ? "text-navy-200" : "text-slate-500"}>
          Step {step} of {TOTAL_STEPS}
        </span>
        <span className={light ? "text-green-400" : "text-green-600"}>
          {Math.round(pct)}% complete
        </span>
      </div>
      <div
        className={cn("h-1.5 rounded-full overflow-hidden", light ? "bg-white/15" : "bg-slate-200")}
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
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

// ── Step slide animation ──────────────────────────────────────────────────────
const stepVariants = {
  enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

// ── Main form ─────────────────────────────────────────────────────────────────
export default function QuoteForm({ variant = "embedded" }: QuoteFormProps) {
  const light = variant === "embedded";
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState<Partial<LeadFormData>>({});

  // Step-specific forms with per-step schemas
  const form1 = useForm<Step1Data>({ resolver: zodResolver(step1Schema), defaultValues: formData });
  const form2 = useForm<Step2Data>({ resolver: zodResolver(step2Schema), defaultValues: formData });
  const form3 = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: { whatsappOptIn: false, ...formData },
  });

  // Capture UTM params on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = getUtmParams(new URLSearchParams(window.location.search));
    setFormData((prev) => ({ ...prev, ...params }));
  }, []);

  const advance = (data: Partial<LeadFormData>) => {
    const merged = { ...formData, ...data };
    setFormData(merged);
    trackQuoteStepCompleted(step);
    setDirection(1);
    setStep((s) => s + 1);
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const handleFinalSubmit = async (data: Step3Data) => {
    const payload: LeadFormData = {
      ...(formData as LeadFormData),
      ...data,
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    };

    // Client-side final validation
    const result = leadSchema.safeParse(payload);
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
      trackLeadFormSubmit({ service: payload.serviceType });
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
              You&apos;re All Set!
            </h3>
            <p className={cn("text-base leading-relaxed", light ? "text-navy-200" : "text-slate-600")}>
              We&apos;ve received your request. Here&apos;s what happens next:
            </p>
          </div>
          <ol className="flex flex-col gap-4 text-left w-full max-w-sm">
            {[
              { icon: Clock,  text: "We review your service area & lead type (usually same day)" },
              { icon: Phone,  text: "We call you within 24 hours to confirm your setup" },
              { icon: Send,   text: "Your first leads are delivered — ready to quote" },
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
          {/* ── Step 1: Business type ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <form onSubmit={form1.handleSubmit(advance)} noValidate>
                <h3 className={cn("text-xl font-bold mb-1", light ? "text-white" : "text-navy-900")}>
                  What type of cleaning do you offer?
                </h3>
                <p className={cn("text-sm mb-6", light ? "text-navy-200" : "text-slate-500")}>
                  Select your primary service — you can add more later.
                </p>

                <Field
                  label="Service Type"
                  id="serviceType"
                  error={form1.formState.errors.serviceType?.message}
                  required
                  light={light}
                >
                  <div
                    role="radiogroup"
                    aria-labelledby="serviceType"
                    className="grid grid-cols-2 gap-2"
                  >
                    {Object.entries(SERVICE_LABELS).map(([value, label]) => {
                      const checked = form1.watch("serviceType") === value;
                      return (
                        <label
                          key={value}
                          className={cn(
                            "flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all duration-150 text-sm font-medium",
                            checked
                              ? "border-green-500 bg-green-500/10 text-green-400"
                              : light
                                ? "border-white/20 text-navy-200 hover:border-white/40"
                                : "border-slate-200 text-navy-700 hover:border-slate-300",
                          )}
                        >
                          <input
                            type="radio"
                            value={value}
                            className="sr-only"
                            {...form1.register("serviceType")}
                          />
                          <span
                            className={cn(
                              "h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
                              checked ? "border-green-500" : light ? "border-white/30" : "border-slate-300",
                            )}
                          >
                            {checked && <span className="h-2 w-2 rounded-full bg-green-500" />}
                          </span>
                          {label}
                        </label>
                      );
                    })}
                  </div>
                </Field>

                <Button type="submit" variant="primary" size="lg" className="w-full mt-6">
                  Continue <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </form>
            </motion.div>
          )}

          {/* ── Step 2: Service area + volume ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <form onSubmit={form2.handleSubmit(advance)} noValidate>
                <h3 className={cn("text-xl font-bold mb-1", light ? "text-white" : "text-navy-900")}>
                  Where do you clean &amp; how many leads do you need?
                </h3>
                <p className={cn("text-sm mb-6", light ? "text-navy-200" : "text-slate-500")}>
                  We&apos;ll match leads to your exact territory.
                </p>

                <div className="flex flex-col gap-4">
                  <Field
                    label="City or Service Area"
                    id="serviceArea"
                    error={form2.formState.errors.serviceArea?.message}
                    required
                    light={light}
                  >
                    <input
                      id="serviceArea"
                      type="text"
                      placeholder="e.g. Austin, TX or Dallas metro"
                      autoComplete="off"
                      className={cn(inputBase, light ? inputLight : inputDark)}
                      aria-invalid={!!form2.formState.errors.serviceArea}
                      {...form2.register("serviceArea")}
                    />
                  </Field>

                  <Field
                    label="Monthly Lead Volume"
                    id="leadVolume"
                    error={form2.formState.errors.leadVolume?.message}
                    required
                    light={light}
                  >
                    <div role="radiogroup" aria-labelledby="leadVolume" className="grid grid-cols-2 gap-2">
                      {Object.entries(VOLUME_LABELS).map(([value, label]) => {
                        const checked = form2.watch("leadVolume") === value;
                        return (
                          <label
                            key={value}
                            className={cn(
                              "flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all duration-150 text-sm font-medium",
                              checked
                                ? "border-green-500 bg-green-500/10 text-green-400"
                                : light
                                  ? "border-white/20 text-navy-200 hover:border-white/40"
                                  : "border-slate-200 text-navy-700 hover:border-slate-300",
                            )}
                          >
                            <input
                              type="radio"
                              value={value}
                              className="sr-only"
                              {...form2.register("leadVolume")}
                            />
                            <span
                              className={cn(
                                "h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
                                checked ? "border-green-500" : light ? "border-white/30" : "border-slate-300",
                              )}
                            >
                              {checked && <span className="h-2 w-2 rounded-full bg-green-500" />}
                            </span>
                            {label}
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

          {/* ── Step 3: Contact details ── */}
          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <form onSubmit={form3.handleSubmit((d) => advance(d))} noValidate>
                <h3 className={cn("text-xl font-bold mb-1", light ? "text-white" : "text-navy-900")}>
                  Almost there — where should we send your leads?
                </h3>
                <p className={cn("text-sm mb-6", light ? "text-navy-200" : "text-slate-500")}>
                  We&apos;ll call you within 24 hours to get your first batch ready.
                </p>

                <div className="flex flex-col gap-4">
                  <Field label="Your Name" id="name" error={form3.formState.errors.name?.message} required light={light}>
                    <input
                      id="name"
                      type="text"
                      placeholder="Jane Smith"
                      autoComplete="name"
                      className={cn(inputBase, light ? inputLight : inputDark)}
                      aria-invalid={!!form3.formState.errors.name}
                      {...form3.register("name")}
                    />
                  </Field>

                  <Field label="Phone Number" id="phone" error={form3.formState.errors.phone?.message} required light={light}>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      autoComplete="tel"
                      inputMode="tel"
                      className={cn(inputBase, light ? inputLight : inputDark)}
                      aria-invalid={!!form3.formState.errors.phone}
                      {...form3.register("phone")}
                    />
                  </Field>

                  <Field label="Email Address" id="email" error={form3.formState.errors.email?.message} required light={light}>
                    <input
                      id="email"
                      type="email"
                      placeholder="jane@cleaningbiz.com"
                      autoComplete="email"
                      inputMode="email"
                      className={cn(inputBase, light ? inputLight : inputDark)}
                      aria-invalid={!!form3.formState.errors.email}
                      {...form3.register("email")}
                    />
                  </Field>

                  <label className={cn("flex items-start gap-3 cursor-pointer text-sm", light ? "text-navy-200" : "text-slate-600")}>
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-green-500 focus:ring-green-500 flex-shrink-0"
                      {...form3.register("whatsappOptIn")}
                    />
                    <span>
                      Send my leads via WhatsApp too{" "}
                      <span className={light ? "text-navy-300" : "text-slate-400"}>(optional — uses the phone number above)</span>
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button type="button" variant={light ? "ghost" : "secondary"} size="lg" onClick={back}>
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" /> Back
                  </Button>
                  <Button type="submit" variant="primary" size="lg" className="flex-1">
                    Review & Submit <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ── Step 4: Confirm + submit ── */}
          {step === 4 && (
            <motion.div
              key="step4"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <h3 className={cn("text-xl font-bold mb-1", light ? "text-white" : "text-navy-900")}>
                Confirm your request
              </h3>
              <p className={cn("text-sm mb-6", light ? "text-navy-200" : "text-slate-500")}>
                Everything look right? Hit submit and we&apos;ll be in touch within 24 hours.
              </p>

              <div className={cn("rounded-xl p-5 mb-6 text-sm flex flex-col gap-3", light ? "bg-white/10 border border-white/15" : "bg-navy-50 border border-slate-200")}>
                {[
                  { label: "Service",     value: SERVICE_LABELS[formData.serviceType ?? ""] ?? formData.serviceType },
                  { label: "Area",        value: formData.serviceArea },
                  { label: "Lead Volume", value: VOLUME_LABELS[formData.leadVolume ?? ""] ?? formData.leadVolume },
                  { label: "Name",        value: formData.name },
                  { label: "Phone",       value: formData.phone },
                  { label: "Email",       value: formData.email },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className={cn("font-semibold flex-shrink-0", light ? "text-navy-300" : "text-slate-500")}>{label}</span>
                    <span className={cn("text-right", light ? "text-white" : "text-navy-900")}>{value}</span>
                  </div>
                ))}
              </div>

              {submitError && (
                <p role="alert" aria-live="assertive" className="text-red-400 text-sm mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  {submitError}
                </p>
              )}

              <div className="flex gap-3">
                <Button type="button" variant={light ? "ghost" : "secondary"} size="lg" onClick={back} disabled={submitting}>
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" /> Edit
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  loading={submitting}
                  onClick={() => form3.handleSubmit(handleFinalSubmit)()}
                >
                  {!submitting && <><Send className="h-5 w-5" aria-hidden="true" /> Submit Request</>}
                </Button>
              </div>

              <p className={cn("text-xs text-center mt-4", light ? "text-navy-300" : "text-slate-400")}>
                By submitting you agree to be contacted about our lead generation service.
                No spam — ever.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
