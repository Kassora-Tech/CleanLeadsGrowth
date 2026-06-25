import { cn } from "@/lib/utils";

interface DividerProps {
  /** Direction the wave "points" — down means the next section is below */
  variant?: "down" | "up";
  /** Tailwind fill color class for the wave, e.g. "fill-white" or "fill-navy-900" */
  fill?: string;
  className?: string;
}

/**
 * Reusable double-arc wave SVG divider.
 * Place between sections to create smooth transitions instead of hard borders.
 * The SVG is purely decorative — aria-hidden.
 */
export function Divider({ variant = "down", fill = "fill-white", className }: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "w-full overflow-hidden leading-[0] block",
        variant === "up" && "rotate-180",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={cn("w-full h-[60px] lg:h-[80px]", fill)}
      >
        {/* Double-arc wave — echoes the flyer wave motif */}
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
}
