"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { WHATSAPP_URL } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

const CONTACT_EMAIL = "hello@voltara.solar";
const CONTACT_PHONE_DISPLAY = "+92 300 123 4567";
const CONTACT_PHONE_TEL = "+923001234567";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  location: string;
};

type Status = "idle" | "submitting" | "success";

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
  location: "",
};

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
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

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

function Field({
  id,
  label,
  type = "text",
  required,
  placeholder,
  value,
  onChange,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--voltara-navy)]/80"
      >
        {label}
        {required && (
          <span className="ml-1 text-[var(--voltara-gold)]">*</span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-[var(--voltara-navy)]/15 bg-white px-4 py-3 text-base text-[var(--voltara-navy)] placeholder:text-[var(--voltara-navy)]/30 outline-none transition-all focus:border-[var(--voltara-gold)] focus:ring-2 focus:ring-[var(--voltara-gold)]/20"
      />
    </div>
  );
}

export function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [status, setStatus] = useState<Status>("idle");

  const update = (key: keyof FormValues) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("submitting");
    // TODO: wire to a real backend endpoint (e.g. /api/contact, Formspree, or
    // an email service). For now this just simulates a successful submission.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
  };

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" } as const,
        transition: { duration: 0.6, ease: "easeOut" as const },
      };

  return (
    <section
      id="contact"
      className="w-full bg-[var(--voltara-cream)] py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div className="text-center" {...motionProps}>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--voltara-gold)] md:text-sm">
            Get in touch
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-[var(--voltara-navy)] sm:text-4xl md:text-5xl">
            Let&apos;s power up your home.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--voltara-navy)]/70 md:text-lg">
            Share a few details and we&apos;ll be in touch within 24 hours with
            a free assessment.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-5 lg:gap-10"
          {...motionProps}
        >
          <div className="lg:col-span-3">
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-[var(--voltara-navy)]/10 bg-white p-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--voltara-gold)]/15 text-[var(--voltara-gold)]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-[var(--voltara-navy)]">
                  Thanks, {values.name.split(" ")[0] || "friend"}!
                </h3>
                <p className="mt-3 max-w-md text-[var(--voltara-navy)]/70">
                  We&apos;ve received your details and our team will reach out
                  within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <Field
                  id="name"
                  label="Name"
                  required
                  value={values.name}
                  onChange={update("name")}
                  placeholder="Your full name"
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    required
                    value={values.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                  />
                  <Field
                    id="phone"
                    label="Phone"
                    type="tel"
                    required
                    value={values.phone}
                    onChange={update("phone")}
                    placeholder="+92 300 1234567"
                  />
                </div>
                <Field
                  id="location"
                  label="Location"
                  required
                  value={values.location}
                  onChange={update("location")}
                  placeholder="Area in Lahore"
                />

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--voltara-navy)] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--voltara-cream)] transition-colors hover:bg-[var(--voltara-gold)] hover:text-[var(--voltara-navy)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting"
                    ? "Sending…"
                    : "Request a free quote"}
                </button>
              </form>
            )}
          </div>

          <aside className="flex flex-col gap-6 rounded-2xl bg-[var(--voltara-navy)] p-8 text-[var(--voltara-cream)] lg:col-span-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--voltara-gold)]">
                Reach out to us
              </p>
              <h3 className="mt-3 text-2xl font-semibold md:text-3xl">
                Prefer to chat?
              </h3>
              <p className="mt-3 text-sm text-[var(--voltara-cream)]/70 md:text-base">
                Message us on WhatsApp and we&apos;ll usually reply within
                minutes.
              </p>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 self-start rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-[#25D366]/25 transition-transform duration-200 hover:scale-[1.03]"
            >
              <WhatsAppIcon size={22} />
              <span>Chat on WhatsApp</span>
            </a>

            <div className="mt-auto flex flex-col gap-3 border-t border-[var(--voltara-cream)]/15 pt-6">
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="flex items-center gap-3 text-sm text-[var(--voltara-cream)]/80 transition-colors hover:text-[var(--voltara-gold)]"
              >
                <PhoneIcon />
                <span>{CONTACT_PHONE_DISPLAY}</span>
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 text-sm text-[var(--voltara-cream)]/80 transition-colors hover:text-[var(--voltara-gold)]"
              >
                <MailIcon />
                <span>{CONTACT_EMAIL}</span>
              </a>
            </div>
          </aside>
        </motion.div>
      </div>
    </section>
  );
}
