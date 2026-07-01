"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FooterLink {
  href: string;
  label: string;
}

interface FooterProps {
  brand: React.ReactNode;
  description?: React.ReactNode;
  contact?: React.ReactNode;
  socialLinks: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;
  mainLinks: FooterLink[];
  legalLinks: FooterLink[];
  copyright: {
    text: string;
    license?: string;
  };
  className?: string;
  linkClassName?: string;
  mutedLinkClassName?: string;
  socialButtonClassName?: string;
}

const TRANSITION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

const viewport = { once: true, margin: "-80px" } as const;

function FooterInner({
  brand,
  description,
  contact,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
  className,
  linkClassName = "text-sm text-primary underline-offset-4 hover:underline",
  mutedLinkClassName = "text-sm text-muted-foreground underline-offset-4 hover:underline",
  socialButtonClassName,
  animated,
}: FooterProps & { animated: boolean }) {
  const socialList = socialLinks.length > 0 && (
    <ul className="mb-6 flex list-none justify-end space-x-3 md:absolute md:top-0 md:right-0 md:mb-0">
      {socialLinks.map((link, i) => (
        <li key={i}>
          <Button
            variant="secondary"
            size="icon"
            className={cn("h-10 w-10 rounded-full", socialButtonClassName)}
            asChild
          >
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              aria-label={link.label}
            >
              {link.icon}
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );

  const brandBlock = (
    <>
      {brand}
      {description}
    </>
  );

  const quickLinks = mainLinks.length > 0 && (
    <>
      <h3 className="text-[clamp(0.7rem,0.8vw,0.9rem)] font-semibold uppercase tracking-[0.3em] text-[var(--voltara-gold)]">
        Quick links
      </h3>
      <ul className="mt-3 flex list-none flex-col gap-2">
        {mainLinks.map((link, i) => (
          <li key={i}>
            <a href={link.href} className={linkClassName}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );

  const copyrightBar = (
    <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-current/10 pt-6 text-center sm:flex-row sm:text-left md:mt-8 md:pt-8">
      <div className="text-[clamp(0.7rem,0.8vw,0.9rem)] leading-6 opacity-70">
        <div>{copyright.text}</div>
        {copyright.license && <div>{copyright.license}</div>}
      </div>
      {legalLinks.length > 0 && (
        <ul className="flex list-none flex-wrap justify-center gap-x-4 gap-y-1 sm:justify-end">
          {legalLinks.map((link, i) => (
            <li key={i}>
              <a href={link.href} className={mutedLinkClassName}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <footer className={cn("pb-6 pt-16 lg:pb-8 lg:pt-24", className)}>
      <div className="px-[clamp(1rem,3vw,2.5rem)] lg:px-8">
        {animated ? (
          <motion.div
            className="relative"
            variants={revealContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {socialList && (
              <motion.ul
                variants={revealItemVariants}
                className="mb-6 flex list-none justify-end space-x-3 md:absolute md:top-0 md:right-0 md:mb-0"
              >
                {socialLinks.map((link, i) => (
                  <li key={i}>
                    <Button
                      variant="secondary"
                      size="icon"
                      className={cn(
                        "h-10 w-10 rounded-full",
                        socialButtonClassName,
                      )}
                      asChild
                    >
                      <a
                        href={link.href}
                        target={
                          link.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        aria-label={link.label}
                      >
                        {link.icon}
                      </a>
                    </Button>
                  </li>
                ))}
              </motion.ul>
            )}

            <div className="grid grid-cols-1 gap-[clamp(1.5rem,2.5vw,3rem)] sm:grid-cols-2 md:grid-cols-[1.5fr_0.8fr_1fr] md:pr-36 lg:pr-40">
              <motion.div
                variants={revealItemVariants}
                className="flex flex-col gap-3 sm:col-span-2 md:col-span-1"
              >
                {brandBlock}
              </motion.div>
              {quickLinks && (
                <motion.nav variants={revealItemVariants}>
                  {quickLinks}
                </motion.nav>
              )}
              {contact && (
                <motion.div variants={revealItemVariants}>{contact}</motion.div>
              )}
            </div>

            <motion.div variants={revealItemVariants}>{copyrightBar}</motion.div>
          </motion.div>
        ) : (
          <>
            <div className="relative">
              {socialList}
              <div className="grid grid-cols-1 gap-[clamp(1.5rem,2.5vw,3rem)] sm:grid-cols-2 md:grid-cols-[1.5fr_0.8fr_1fr] md:pr-36 lg:pr-40">
                <div className="flex flex-col gap-3 sm:col-span-2 md:col-span-1">
                  {brandBlock}
                </div>
                {quickLinks && <nav>{quickLinks}</nav>}
                {contact}
              </div>
            </div>
            {copyrightBar}
          </>
        )}
      </div>
    </footer>
  );
}

export function Footer(props: FooterProps) {
  const prefersReducedMotion = useReducedMotion();
  return <FooterInner {...props} animated={!prefersReducedMotion} />;
}
