"use client";

import { cn } from "@/lib/utils";

const AURORA_GRADIENT_VARS = `
  [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
  [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
  [--aurora:repeating-linear-gradient(100deg,var(--voltara-navy)_10%,var(--blue-400)_18%,var(--voltara-gold)_24%,var(--blue-300)_30%,var(--voltara-navy)_36%)]
  [background-image:var(--white-gradient),var(--aurora)]
  [background-size:300%,_200%]
  [background-position:50%_50%,50%_50%]
`;

type AuroraLayerProps = {
  className?: string;
  showRadialGradient?: boolean;
  /** "overlay" tints the SolarRain photo; "demo" matches the original shadcn look */
  variant?: "overlay" | "demo";
};

export function AuroraLayer({
  className,
  showRadialGradient = true,
  variant = "overlay",
}: AuroraLayerProps) {
  const isOverlay = variant === "overlay";

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none overflow-hidden", className)}
    >
      <div
        className={cn(
          "absolute -inset-[10px] will-change-transform",
          AURORA_GRADIENT_VARS,
          isOverlay
            ? "opacity-40 blur-[12px] after:mix-blend-soft-light"
            : [
                "opacity-50 blur-[10px] invert filter dark:invert-0",
                "dark:[background-image:var(--dark-gradient),var(--aurora)]",
                "after:mix-blend-difference",
                "after:dark:[background-image:var(--dark-gradient),var(--aurora)]",
              ],
          `after:pointer-events-none after:absolute after:inset-0 after:content-[""]
           after:[background-image:var(--white-gradient),var(--aurora)]
           after:[background-size:200%,_100%]
           after:animate-aurora after:[background-attachment:fixed]`,
          showRadialGradient &&
            "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]",
        )}
      />
    </div>
  );
}
