"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";
import { MagneticButton } from "./MagneticButton";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/#contact" },
];

function NavPhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--voltara-cream)]/85 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="relative mx-auto flex max-w-[1600px] items-center justify-between px-[clamp(1rem,3vw,2.5rem)] py-[clamp(0.625rem,1.2vw,1rem)]">
        <Link href="/" className="relative z-10 flex items-center">
          <Image
            src="/voltaralogosimple.svg"
            alt="Voltara Solar"
            width={180}
            height={48}
            priority
            sizes="(max-width: 768px) 144px, (max-width: 1920px) 180px, 240px"
            className="h-[clamp(2.25rem,2.5vw,3rem)] w-auto"
          />
        </Link>

        <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-[clamp(2rem,3vw,3.5rem)] md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link text-[clamp(0.75rem,0.9vw,0.95rem)] font-medium uppercase tracking-[0.2em] text-[var(--voltara-navy)] transition-colors hover:text-[var(--voltara-gold)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative z-10 flex items-center gap-[clamp(0.5rem,1vw,1rem)]">
        <a
          href={`tel:${CONTACT_PHONE_TEL}`}
          className="hidden md:inline-flex items-center gap-2 text-[clamp(0.75rem,0.85vw,0.95rem)] font-medium text-[var(--voltara-navy)] transition-colors hover:text-[var(--voltara-gold)]"
        >
          <NavPhoneIcon />
          <span className="tabular-nums">{CONTACT_PHONE_DISPLAY}</span>
        </a>
        <MagneticButton className="hidden md:inline-block" strength={0.35}>
          <Link
            href="/#contact"
            className="inline-block rounded-full bg-[var(--voltara-navy)] px-[clamp(1rem,1.3vw,1.5rem)] py-[clamp(0.5rem,0.7vw,0.75rem)] text-[clamp(0.75rem,0.9vw,0.95rem)] font-semibold uppercase tracking-[0.2em] text-[var(--voltara-cream)] shadow-md shadow-[var(--voltara-navy)]/20 transition-colors hover:bg-[var(--voltara-gold)] hover:text-[var(--voltara-navy)]"
          >
            Get a Quote
          </Link>
        </MagneticButton>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-[var(--voltara-navy)] md:hidden"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--voltara-navy)]/10 bg-[var(--voltara-cream)]/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col items-center px-6 py-4 text-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--voltara-navy)] transition-colors hover:text-[var(--voltara-gold)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center gap-2 py-3 text-sm font-medium text-[var(--voltara-navy)] transition-colors hover:text-[var(--voltara-gold)]"
              >
                <NavPhoneIcon />
                <span className="tabular-nums">{CONTACT_PHONE_DISPLAY}</span>
              </a>
            </li>
            <li>
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block rounded-full bg-[var(--voltara-navy)] px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--voltara-cream)] transition-colors hover:bg-[var(--voltara-gold)] hover:text-[var(--voltara-navy)]"
              >
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
