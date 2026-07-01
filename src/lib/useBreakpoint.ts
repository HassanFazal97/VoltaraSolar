"use client";

import { useEffect, useState } from "react";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

const ORDER: { name: Breakpoint; min: number }[] = [
  { name: "xs", min: 0 },
  { name: "sm", min: 640 },
  { name: "md", min: 768 },
  { name: "lg", min: 1024 },
  { name: "xl", min: 1280 },
  { name: "2xl", min: 1536 },
  { name: "3xl", min: 2200 },
];

function pick(w: number): Breakpoint {
  let cur: Breakpoint = "xs";
  for (const b of ORDER) if (w >= b.min) cur = b.name;
  return cur;
}

export function useBreakpoint() {
  const [state, setState] = useState<{ width: number; bp: Breakpoint }>(() => ({
    width: typeof window === "undefined" ? 1280 : window.innerWidth,
    bp:
      typeof window === "undefined"
        ? ("xl" as Breakpoint)
        : pick(window.innerWidth),
  }));

  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = window.innerWidth;
        setState({ width: w, bp: pick(w) });
      });
    };
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return state;
}

export function useIsAtLeast(bp: Breakpoint) {
  const { bp: cur } = useBreakpoint();
  const idx = (b: Breakpoint) => ORDER.findIndex((x) => x.name === b);
  return idx(cur) >= idx(bp);
}
