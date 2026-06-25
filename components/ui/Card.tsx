import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  /** Show left green bar accent on hover */
  greenBar?: boolean;
}

export function Card({ hover = true, greenBar = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden",
        hover && "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 group",
        className,
      )}
      {...props}
    >
      {/* Green left accent bar — slides in on hover */}
      {greenBar && (
        <div
          className={cn(
            "absolute left-0 top-0 w-1 bg-green-500 h-full",
            "origin-top scale-y-0 transition-transform duration-300",
            "group-hover:scale-y-100",
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
