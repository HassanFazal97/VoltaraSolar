"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  speed: number;
};

type Orb = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
};

const GOLD_RGB = "249, 174, 14";
const NAVY_RGB = "4, 43, 88";

export function HeroParticles({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let resizeRaf = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let orbs: Orb[] = [];

    const particleCount = () => {
      const w = window.innerWidth;
      if (w < 640) return 28;
      if (w < 1536) return 55;
      if (w < 2200) return 80;
      return 110;
    };

    function resize() {
      if (!canvas || !ctx) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      const count = particleCount();
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -0.08 - Math.random() * 0.28,
        r: 0.5 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.9,
      }));
      const maxDim = Math.max(width, height);
      orbs = [
        {
          x: width * 0.22,
          y: height * 0.32,
          vx: 0.16,
          vy: 0.1,
          r: maxDim * 0.48,
          color: `rgba(${GOLD_RGB}, 0.18)`,
        },
        {
          x: width * 0.78,
          y: height * 0.7,
          vx: -0.13,
          vy: -0.09,
          r: maxDim * 0.42,
          color: `rgba(${NAVY_RGB}, 0.13)`,
        },
        {
          x: width * 0.5,
          y: height * 0.5,
          vx: 0.09,
          vy: 0.15,
          r: maxDim * 0.55,
          color: `rgba(${GOLD_RGB}, 0.09)`,
        },
      ];
    }

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const o of orbs) {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -o.r * 0.4 || o.x > width + o.r * 0.4) o.vx *= -1;
        if (o.y < -o.r * 0.4 || o.y > height + o.r * 0.4) o.vy *= -1;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, o.color);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.025 * p.speed;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;

        const alpha = Math.max(0, 0.35 + Math.sin(p.phase) * 0.3);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD_RGB}, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    }

    resize();
    seed();
    step();

    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resize();
        seed();
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={
        className ??
        "pointer-events-none absolute inset-0 h-full w-full"
      }
    />
  );
}
