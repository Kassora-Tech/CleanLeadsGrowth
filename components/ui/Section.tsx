import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  /** "navy" = dark bg, "white" = white, "light" = navy-50 tint */
  bg?: "navy" | "white" | "light";
  /** Override the default py-20 lg:py-28 spacing */
  tight?: boolean;
}

export function Section({
  as: Tag = "section",
  bg = "white",
  tight = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "relative w-full",
        {
          "bg-gradient-navy text-white": bg === "navy",
          "bg-white text-navy-900":      bg === "white",
          "bg-navy-50 text-navy-900":    bg === "light",
        },
        tight ? "py-12 lg:py-16" : "py-20 lg:py-28",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("container-xl", className)} {...props}>
    {children}
  </div>
));
Container.displayName = "Container";

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  light = false,
  center = true,
  className,
}: {
  eyebrow?:    string;
  heading:     React.ReactNode;
  subheading?: string;
  light?:      boolean;
  center?:     boolean;
  className?:  string;
}) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16",
        center && "text-center mx-auto max-w-3xl",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-widest mb-3",
            light ? "text-green-400" : "text-green-600",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-4xl lg:text-5xl font-extrabold leading-tight tracking-tighter mb-4",
          light ? "text-white" : "text-navy-900",
        )}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={cn(
            "text-lg leading-relaxed",
            light ? "text-navy-200" : "text-slate-600",
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
