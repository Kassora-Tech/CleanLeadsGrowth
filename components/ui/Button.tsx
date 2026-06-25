"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base — all buttons
  [
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary CTA — green with shine
        primary: [
          "btn-shine bg-green-500 text-white",
          "hover:bg-green-600 hover:shadow-green hover:-translate-y-0.5 hover:scale-[1.02]",
          "active:translate-y-0 active:scale-100",
        ].join(" "),
        // Secondary — navy outline
        secondary: [
          "border-2 border-navy-900 text-navy-900 bg-transparent",
          "hover:bg-navy-900 hover:text-white hover:shadow-navy",
          "active:bg-navy-950",
        ].join(" "),
        // Ghost on dark backgrounds (e.g. inside navy sections)
        ghost: [
          "border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm",
          "hover:bg-white/20 hover:border-white/50",
        ].join(" "),
        // Utility bar compact
        utility: [
          "bg-white text-navy-900 border border-slate-200 shadow-sm",
          "hover:bg-navy-50 hover:shadow-card",
        ].join(" "),
        // Destructive
        danger: [
          "bg-red-600 text-white",
          "hover:bg-red-700",
        ].join(" "),
      },
      size: {
        sm:   "h-9 px-4 text-sm",
        md:   "h-11 px-6 text-base",
        lg:   "h-13 px-8 text-lg",
        xl:   "h-14 px-10 text-xl",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size:    "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor" strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Loading…</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
