"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span";
};

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  as = "div",
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  if (prefersReducedMotion) {
    if (as === "span") {
      return <span className={className}>{children}</span>;
    }
    return <div className={className}>{children}</div>;
  }

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (as === "span") {
    return (
      <motion.span
        className={className}
        style={{ x: sx, y: sy, display: "inline-block" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <motion.div
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
