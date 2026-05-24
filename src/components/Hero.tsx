"use client";

import { motion, useReducedMotion } from "framer-motion";
import { VoltaraLogo, SUBTITLE_ANIMATION_DELAY, TITLE_ANIMATION_DELAY } from "./VoltaraLogo";

const TITLE_CLASS =
  "text-6xl font-bold text-[var(--voltara-navy)] sm:text-7xl md:text-8xl lg:text-9xl";

const SUBTITLE_CLASS =
  "text-xl font-bold uppercase tracking-[0.45em] text-[var(--voltara-gold)] sm:text-2xl md:text-3xl";

function LetterGroup({ letters }: { letters: string[] }) {
  return (
    <>
      {letters.map((letter, index) => (
        <span key={`${letter}-${index}`}>{letter}</span>
      ))}
    </>
  );
}

function VoltaraTitle({ animated, delay }: { animated: boolean; delay: number }) {
  if (!animated) {
    return (
      <h1 className={`relative inline-flex items-baseline ${TITLE_CLASS}`}>
        <span className="absolute right-full top-0 flex gap-[0.35em] pr-[0.35em]">
          <LetterGroup letters={["V", "O", "L"]} />
        </span>
        <span>T</span>
        <span className="absolute left-full top-0 flex gap-[0.35em] pl-[0.35em]">
          <LetterGroup letters={["A", "R", "A"]} />
        </span>
      </h1>
    );
  }

  return (
    <motion.h1 className={`relative inline-flex items-baseline ${TITLE_CLASS}`}>
      <motion.span
        className="absolute right-full top-0 flex"
        initial={{ gap: "0.5em", paddingRight: "0.5em" }}
        animate={{ gap: "0.35em", paddingRight: "0.35em" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
      >
        <LetterGroup letters={["V", "O", "L"]} />
      </motion.span>
      <span>T</span>
      <motion.span
        className="absolute left-full top-0 flex"
        initial={{ gap: "0.5em", paddingLeft: "0.5em" }}
        animate={{ gap: "0.35em", paddingLeft: "0.35em" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
      >
        <LetterGroup letters={["A", "R", "A"]} />
      </motion.span>
    </motion.h1>
  );
}

function BrandText({ animated }: { animated: boolean }) {
  if (!animated) {
    return (
      <div className="flex w-full flex-col items-center gap-3 text-center">
        <VoltaraTitle animated={false} delay={0} />
        <p className={SUBTITLE_CLASS}>
          solar
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex w-full flex-col items-center gap-3 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: TITLE_ANIMATION_DELAY, ease: "easeOut" }}
    >
      <VoltaraTitle animated delay={TITLE_ANIMATION_DELAY} />
      <motion.p
        className={SUBTITLE_CLASS}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: SUBTITLE_ANIMATION_DELAY, ease: "easeOut" }}
      >
        SOLAR
      </motion.p>
    </motion.div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-[var(--voltara-cream)] px-6">
      <div className="flex w-full flex-col items-center -mt-12 sm:-mt-16 md:-mt-24 lg:-mt-32">
        <VoltaraLogo className="h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[28rem] lg:w-[28rem]" />
        <div className="-mt-8 sm:-mt-10 md:-mt-14 lg:-mt-20">
          <BrandText animated={!prefersReducedMotion} />
        </div>
      </div>
    </section>
  );
}
