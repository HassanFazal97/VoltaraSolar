"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";
import {
  SUBTITLE_ANIMATION_DELAY,
  TITLE_ANIMATION_DELAY,
  VoltaraLogo,
} from "./VoltaraLogo";

type Phase = "intro" | "split";

const PHASE_FLIP_DELAY_MS = (SUBTITLE_ANIMATION_DELAY + 0.7) * 1000;
const SPLIT_SCALE = 0.62;
const TRANSITION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TITLE_CLASS =
  "text-5xl font-bold text-[var(--voltara-navy)] sm:text-6xl md:text-7xl lg:text-8xl";

const SUBTITLE_CLASS =
  "text-lg font-bold uppercase tracking-[0.45em] text-[var(--voltara-gold)] sm:text-xl md:text-2xl";

const LOGO_SIZE_CLASS =
  "h-52 w-52 sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96";

const LOGO_TITLE_OFFSET_CLASS =
  "-mt-6 sm:-mt-8 md:-mt-10 lg:-mt-14";

const LOGO_STACK_OFFSET_CLASS =
  "-mt-10 sm:-mt-12 md:-mt-20 lg:-mt-24";

const PRIMARY_CTA_CLASS =
  "inline-flex items-center justify-center rounded-full bg-[var(--voltara-navy)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--voltara-cream)] transition-colors hover:bg-[var(--voltara-gold)] hover:text-[var(--voltara-navy)]";

const WHATSAPP_CTA_CLASS =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--voltara-whatsapp)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#85b435]";

const BULLETS = [
  "Designed for Lahore's weather, roofs, and energy needs",
  "Ideal for homes, shops, offices, schools, and warehouses",
  "Complete support from survey to installation and net metering",
];

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
        <p className={SUBTITLE_CLASS}>SOLAR</p>
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

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--voltara-gold)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-1 shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[var(--voltara-navy)]">
      <CheckIcon />
      <span className="text-sm md:text-base">{children}</span>
    </li>
  );
}

function LogoStack({ animated }: { animated: boolean }) {
  return (
    <div className={`flex flex-col items-center ${LOGO_STACK_OFFSET_CLASS}`}>
      <VoltaraLogo className={LOGO_SIZE_CLASS} />
      <div className={LOGO_TITLE_OFFSET_CLASS}>
        <BrandText animated={animated} />
      </div>
    </div>
  );
}

function LogoBlock({ phase, animated }: { phase: Phase; animated: boolean }) {
  if (!animated) {
    return (
      <div className="flex w-full justify-center md:scale-[0.62] md:[transform-origin:center]">
        <LogoStack animated={false} />
      </div>
    );
  }

  const introTranslate =
    phase === "intro"
      ? "md:translate-x-[calc(50%+1.5rem)]"
      : "md:translate-x-0";

  return (
    <div
      className={`flex w-full justify-center transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${introTranslate}`}
    >
      <motion.div
        animate={{ scale: phase === "split" ? SPLIT_SCALE : 1 }}
        transition={{ duration: 0.9, ease: TRANSITION_EASE }}
        style={{ transformOrigin: "center center" }}
      >
        <LogoStack animated />
      </motion.div>
    </div>
  );
}

const rightPanelVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const rightItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function CTARow() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 md:items-start">
      <Link href="/contact" className={PRIMARY_CTA_CLASS}>
        Get a free quote
      </Link>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={WHATSAPP_CTA_CLASS}
      >
        <WhatsAppIcon size={20} />
        Contact us
      </a>
    </div>
  );
}

function RightPanel({ phase, animated }: { phase: Phase; animated: boolean }) {
  if (!animated) {
    return (
      <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
        <h2 className="text-4xl font-bold leading-tight text-[var(--voltara-navy)] md:text-5xl lg:text-6xl">
          Beat Rising Electricity Bills with Solar Built for Lahore.
        </h2>
        <p className="max-w-xl text-base text-[var(--voltara-navy)]/70 md:text-lg">
          Switch to a professionally designed solar system for your home or
          business. From consultation to installation and net metering, Voltara
          Solar helps you save more, stay powered, and invest in long-term energy
          independence.
        </p>
        <ul className="flex flex-col gap-3">
          {BULLETS.map((bullet) => (
            <BulletItem key={bullet}>{bullet}</BulletItem>
          ))}
        </ul>
        <CTARow />
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-6 text-center md:items-start md:text-left"
      variants={rightPanelVariants}
      initial="hidden"
      animate={phase === "split" ? "visible" : "hidden"}
    >
      <motion.h2
        variants={rightItemVariants}
        className="text-3xl font-bold leading-tight text-[var(--voltara-navy)] md:text-4xl lg:text-5xl"
      >
        Beat Rising Bills with Solar in Lahore
      </motion.h2>
      <motion.p
        variants={rightItemVariants}
        className="max-w-xl text-base text-[var(--voltara-navy)]/70 md:text-lg"
      >
        Reliable solar systems for homes and businesses across Lahore, built to lower costs and keep you powered. From consultation to installation and net metering, Voltara
        Solar helps you save more, stay powered, and invest in long-term energy
        independence.
      </motion.p>
      <motion.ul variants={rightItemVariants} className="flex flex-col gap-3">
        {BULLETS.map((bullet) => (
          <BulletItem key={bullet}>{bullet}</BulletItem>
        ))}
      </motion.ul>
      <motion.div variants={rightItemVariants}>
        <CTARow />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("split");
      return;
    }
    const timer = window.setTimeout(
      () => setPhase("split"),
      PHASE_FLIP_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-screen w-full bg-[var(--voltara-cream)] px-6 pt-24 pb-12 md:pt-20">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
        <LogoBlock phase={phase} animated={!prefersReducedMotion} />
        <RightPanel phase={phase} animated={!prefersReducedMotion} />
      </div>
    </section>
  );
}
