"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { WHATSAPP_CTA_CLASS } from "@/lib/whatsapp-button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import {
  SUBTITLE_ANIMATION_DELAY,
  TITLE_ANIMATION_DELAY,
  VoltaraLogo,
} from "./VoltaraLogo";

type Phase = "intro" | "exit" | "reveal";

const PHASE_FLIP_DELAY_MS = (SUBTITLE_ANIMATION_DELAY + 0.7) * 1000;
const TRANSITION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LOGO_TITLE_CLASS =
  "font-bold text-[var(--voltara-navy)] text-[clamp(3rem,9vw,8rem)]";

const LOGO_SUBTITLE_CLASS =
  "font-bold uppercase tracking-[0.45em] text-[var(--voltara-gold)] text-[clamp(1rem,1.6vw,1.75rem)]";

const LOGO_SIZE_CLASS =
  "h-[clamp(13rem,28vw,28rem)] w-[clamp(13rem,28vw,28rem)]";

const LOGO_TITLE_OFFSET_CLASS = "-mt-[clamp(1.5rem,2.5vw,4rem)]";

const LOGO_STACK_OFFSET_CLASS = "-mt-[clamp(2.5rem,4vw,7rem)]";

const HEADLINE_CLASS =
  "font-bold tracking-[-0.03em] leading-[1.05] text-[clamp(2.65rem,6vw,5.75rem)] text-balance";

const SAVE_MONEY_CLASS =
  "uppercase text-[var(--voltara-navy)] text-[clamp(2rem,4.5vw,4.25rem)]";

const SUBTITLE_CLASS =
  "w-full max-w-full text-pretty text-[clamp(1.25rem,1.6vw,1.875rem)] font-bold leading-relaxed text-[#011431] md:max-w-[min(36rem,calc(50vw-2rem))]";

const revealContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: 72 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: TRANSITION_EASE },
  },
};

function LetterGroup({ letters }: { letters: string[] }) {
  return (
    <>
      {letters.map((letter, index) => (
        <span key={`${letter}-${index}`}>{letter}</span>
      ))}
    </>
  );
}

function VoltaraTitle({ delay }: { delay: number }) {
  return (
    <motion.h1 className={`relative inline-flex items-baseline ${LOGO_TITLE_CLASS}`}>
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

function BrandText() {
  return (
    <motion.div
      className="flex w-full flex-col items-center gap-3 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: TITLE_ANIMATION_DELAY, ease: "easeOut" }}
    >
      <VoltaraTitle delay={TITLE_ANIMATION_DELAY} />
      <motion.p
        className={LOGO_SUBTITLE_CLASS}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: SUBTITLE_ANIMATION_DELAY, ease: "easeOut" }}
      >
        SOLAR
      </motion.p>
    </motion.div>
  );
}

function LogoStack() {
  return (
    <div className={`flex flex-col items-center ${LOGO_STACK_OFFSET_CLASS}`}>
      <VoltaraLogo className={LOGO_SIZE_CLASS} />
      <div className={LOGO_TITLE_OFFSET_CLASS}>
        <BrandText />
      </div>
    </div>
  );
}

function LogoBlock({
  phase,
  onExitComplete,
}: {
  phase: Phase;
  onExitComplete: () => void;
}) {
  return (
    <div className="flex w-full justify-center">
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={
          phase === "exit"
            ? { scale: 0.08, opacity: 0, filter: "blur(8px)" }
            : { scale: 1, opacity: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.85, ease: TRANSITION_EASE }}
        style={{ transformOrigin: "center center" }}
        onAnimationComplete={() => {
          if (phase === "exit") onExitComplete();
        }}
      >
        <LogoStack />
      </motion.div>
    </div>
  );
}

function HeroRevealContent({ animated }: { animated: boolean }) {
  const contentClassName =
    "flex w-full max-w-[42rem] flex-col items-center gap-7 text-center md:items-start md:text-left";

  if (!animated) {
    return (
      <div className={contentClassName}>
        <h1 className={HEADLINE_CLASS}>
          <span className={SAVE_MONEY_CLASS}>Save money</span>
          <br />
          <span className="voltara-shimmer inline-block font-normal italic text-transparent">
            Go Solar
          </span>
        </h1>
        <h3 className={SUBTITLE_CLASS}>
          Lahore&apos;s trusted solar team for smarter savings, reliable power,
          and long-term energy independence.
        </h3>
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

  return (
    <motion.div
      className={contentClassName}
      variants={revealContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className={HEADLINE_CLASS} variants={revealItemVariants}>
        <span className={SAVE_MONEY_CLASS}>Save money</span>
        <br />
        <span className="voltara-shimmer inline-block font-normal italic text-transparent">
          Go Solar
        </span>
      </motion.h1>
      <motion.h3 className={SUBTITLE_CLASS} variants={revealItemVariants}>
        Lahore&apos;s trusted solar team for smarter savings, reliable power,
        and long-term energy independence.
      </motion.h3>
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={WHATSAPP_CTA_CLASS}
        variants={revealItemVariants}
      >
        <WhatsAppIcon size={20} />
        Contact us
      </motion.a>
    </motion.div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [introCompleted, setIntroCompleted] = useState(false);
  const [exitCompleted, setExitCompleted] = useState(false);

  const phase: Phase = prefersReducedMotion
    ? "reveal"
    : exitCompleted
      ? "reveal"
      : introCompleted
        ? "exit"
        : "intro";

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setTimeout(
      () => setIntroCompleted(true),
      PHASE_FLIP_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-transparent px-[clamp(1rem,3vw,2.5rem)] pb-[clamp(2rem,4vw,4rem)] pt-[calc(var(--navbar-height)+0.5625rem)] sm:pt-[calc(var(--navbar-height)+0.75rem)] md:pt-[calc(var(--navbar-height)+0.9375rem)] xl:pt-[calc(var(--navbar-height)+1.125rem)]">
      <div
        aria-hidden="true"
        className="voltara-readability-gradient pointer-events-none absolute inset-0 z-0"
      />

      {phase !== "reveal" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <LogoBlock
            phase={phase}
            onExitComplete={() => setExitCompleted(true)}
          />
        </div>
      )}

      {phase === "reveal" && (
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-var(--navbar-height))] max-w-[1200px] items-center justify-center md:justify-start">
          <HeroRevealContent animated={!prefersReducedMotion} />
        </div>
      )}
    </section>
  );
}
