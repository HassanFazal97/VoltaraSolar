"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType } from "react";

type HeadingTag = "h1" | "h2" | "h3";

type AnimatedHeadlineProps = {
  text: string;
  className?: string;
  as?: HeadingTag;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function AnimatedHeadline({
  text,
  className,
  as = "h2",
}: AnimatedHeadlineProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const Static = as as ElementType;
    return <Static className={className}>{text}</Static>;
  }

  const MotionTag =
    as === "h1" ? motion.h1 : as === "h3" ? motion.h3 : motion.h2;

  const words = text.split(" ");

  return (
    <MotionTag className={className} variants={containerVariants}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-flex overflow-hidden align-bottom pb-[0.14em] mr-[0.28em] last:mr-0"
        >
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
