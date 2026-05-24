"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  LOGO_ARC,
  LOGO_FAN_ORIGIN,
  LOGO_SPIKES,
  LOGO_V,
  LOGO_VIEWBOX,
  type LogoShape,
} from "./logoPaths";

const GOLD = "var(--voltara-gold)";

function ShapeGroup({ shapes }: { shapes: LogoShape[] }) {
  return (
    <>
      {shapes.map((shape) => (
        <g key={`${shape.transform}-${shape.d.slice(0, 24)}`} transform={shape.transform}>
          <path d={shape.d} />
        </g>
      ))}
    </>
  );
}

function getTranslateX(transform: string): number {
  const match = transform.match(/translate\(\s*(-?\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

const SPIKE_DURATION = 0.55;
const SPIKE_STAGGER = 0.13;
const SPIKES_ORDERED = [...LOGO_SPIKES]
  .map((shape, originalIndex) => ({
    shape,
    originalIndex,
    x: getTranslateX(shape.transform),
  }))
  .sort((a, b) => a.x - b.x);
const SPIKES_END_TIME =
  (SPIKES_ORDERED.length - 1) * SPIKE_STAGGER + SPIKE_DURATION;
const ARC_DELAY = SPIKES_END_TIME + 0.05;
const V_DELAY = ARC_DELAY + 0.4;
const V_DURATION = 0.5;

export const LOGO_ANIMATION_END = V_DELAY + V_DURATION;
export const TITLE_ANIMATION_DELAY = LOGO_ANIMATION_END;
export const SUBTITLE_ANIMATION_DELAY = LOGO_ANIMATION_END + 0.25;

export function VoltaraLogo({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <svg
        viewBox={LOGO_VIEWBOX}
        fill={GOLD}
        aria-hidden="true"
        className={className}
      >
        <ShapeGroup shapes={LOGO_SPIKES} />
        <ShapeGroup shapes={LOGO_ARC} />
        <ShapeGroup shapes={LOGO_V} />
      </svg>
    );
  }

  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      fill={GOLD}
      aria-hidden="true"
      className={className}
    >
      {SPIKES_ORDERED.map(({ shape, originalIndex }, orderIndex) => (
        <motion.g
          key={`spike-${originalIndex}`}
          initial={{ opacity: 0, scale: 0.35, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: SPIKE_DURATION,
            delay: orderIndex * SPIKE_STAGGER,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            transformOrigin: `${LOGO_FAN_ORIGIN.x}px ${LOGO_FAN_ORIGIN.y + 180}px`,
          }}
        >
          <g transform={shape.transform}>
            <path d={shape.d} />
          </g>
        </motion.g>
      ))}

      <motion.g
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: ARC_DELAY, ease: "easeOut" }}
        style={{
          transformOrigin: `${LOGO_FAN_ORIGIN.x}px ${LOGO_FAN_ORIGIN.y + 180}px`,
        }}
      >
        <ShapeGroup shapes={LOGO_ARC} />
      </motion.g>

      <motion.g
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: V_DURATION, delay: V_DELAY, ease: "easeOut" }}
      >
        <ShapeGroup shapes={LOGO_V} />
      </motion.g>
    </svg>
  );
}
