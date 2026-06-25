"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name:    z.string().min(2, "Please enter your name."),
  email:   z.string().email("Please enter a valid email."),
  phone:   z.string().optional(),
  message: z.string().min(10, "Please enter a message (at least 10 characters).").max(1000),
});
type ContactData = z.infer<typeof contactSchema>;

const inputBase =
  "w-full px-4 rounded-xl border border-slate-200 bg-white text-navy-900 text-sm font-medium placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactData) => {
    setSubmitting(true);
    setError("");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="h-14 w-14 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
          <CheckCircle className="h-7 w-7 text-green-500" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-navy-900">Message Sent!</h3>
        <p className="text-slate-600 text-sm">We&apos;ll get back to you within 1 business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {[
        { id: "name",  label: "Your Name",     type: "text",  placeholder: "Jane Smith",            auto: "name",  required: true },
        { id: "email", label: "Email Address",  type: "email", placeholder: "jane@example.com",      auto: "email", required: true },
        { id: "phone", label: "Phone (optional)", type: "tel",placeholder: "(555) 000-0000",         auto: "tel",   required: false },
      ].map(({ id, label, type, placeholder, auto, required }) => (
        <div key={id} className="flex flex-col gap-1.5">
          <label htmlFor={id} className="text-sm font-semibold text-navy-900">
            {label}
            {required && <span className="text-green-500 ml-1" aria-hidden="true">*</span>}
          </label>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            autoComplete={auto}
            className={cn(inputBase, "h-12")}
            aria-invalid={!!(errors as Record<string, unknown>)[id]}
            {...register(id as keyof ContactData)}
          />
          {(errors as Record<string, { message?: string }>)[id] && (
            <p role="alert" className="text-xs text-red-500">
              {(errors as Record<string, { message?: string }>)[id]?.message}
            </p>
          )}
        </div>
      ))}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold text-navy-900">
          Message <span className="text-green-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us what you need — we'll get back to you within 1 business day."
          className={cn(inputBase, "py-3 resize-none")}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p role="alert" className="text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {error && (
        <p role="alert" aria-live="assertive" className="text-sm text-red-500 p-3 rounded-lg bg-red-50 border border-red-200">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" loading={submitting} className="w-full justify-center">
        <Send className="h-5 w-5" aria-hidden="true" />
        Send Message
      </Button>
    </form>
  );
}
