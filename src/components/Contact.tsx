"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { WHATSAPP_URL } from "@/lib/whatsapp";
import { WHATSAPP_CTA_CLASS } from "@/lib/whatsapp-button";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/lib/contact";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { MagneticButton } from "./MagneticButton";
import { WhatsAppIcon } from "./WhatsAppIcon";

type PropertyType = "" | "home" | "business";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  location: string;
  propertyType: PropertyType;
};

type Status = "idle" | "submitting" | "success";

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
  location: "",
  propertyType: "",
};

const validators: Record<keyof FormValues, (v: string) => string | null> = {
  name: (v) => (v.trim() ? null : "Name is required."),
  email: (v) => {
    if (!v.trim()) return "Email is required.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
      ? null
      : "Enter a valid email address.";
  },
  phone: (v) => {
    const digits = v.replace(/\D/g, "");
    if (!digits) return "Phone is required.";
    return digits.length === 10
      ? null
      : "Enter 10 digits, e.g. 3001234567.";
  },
  location: (v) => (v.trim() ? null : "Location is required."),
  propertyType: (v) => (v ? null : "Please pick home or business."),
};

function isFormValid(values: FormValues) {
  return (Object.keys(validators) as (keyof FormValues)[]).every(
    (key) => validators[key](values[key]) === null,
  );
}

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
  validate?: (v: string) => string | null;
  showError?: boolean;
  prefix?: ReactNode;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
};

function Field({
  id,
  label,
  type = "text",
  required,
  placeholder,
  value,
  onChange,
  validate,
  showError,
  prefix,
  inputMode,
  autoComplete,
}: FieldProps) {
  const [touched, setTouched] = useState(false);
  const error = validate ? validate(value) : null;
  const visible = !!error && (touched || !!showError);
  const describedBy = visible ? `${id}-error` : undefined;

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
      <div
        className={`flex items-stretch overflow-hidden rounded-lg border bg-white transition-all ${
          visible
            ? "border-red-500 ring-2 ring-red-500/15"
            : "border-[var(--voltara-navy)]/15 focus-within:border-[var(--voltara-gold)] focus-within:ring-2 focus-within:ring-[var(--voltara-gold)]/20"
        }`}
      >
        {prefix && (
          <span className="flex items-center border-r border-[var(--voltara-navy)]/10 bg-[var(--voltara-cream)]/40 px-3 text-sm font-medium text-[var(--voltara-navy)]/70 tabular-nums">
            {prefix}
          </span>
        )}
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          inputMode={inputMode}
          autoComplete={autoComplete}
          aria-invalid={visible || undefined}
          aria-describedby={describedBy}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-[var(--voltara-navy)] placeholder:text-[var(--voltara-navy)]/30 outline-none"
        />
      </div>
      {visible && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  validate?: (v: string) => string | null;
  showError?: boolean;
};

function SelectField({
  id,
  label,
  required,
  value,
  onChange,
  options,
  placeholder = "Select one",
  validate,
  showError,
}: SelectFieldProps) {
  const [touched, setTouched] = useState(false);
  const error = validate ? validate(value) : null;
  const visible = !!error && (touched || !!showError);
  const describedBy = visible ? `${id}-error` : undefined;

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
      <select
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={visible || undefined}
        aria-describedby={describedBy}
        className={`rounded-lg border bg-white px-4 py-3 text-base text-[var(--voltara-navy)] outline-none transition-all invalid:text-[var(--voltara-navy)]/30 ${
          visible
            ? "border-red-500 ring-2 ring-red-500/15"
            : "border-[var(--voltara-navy)]/15 focus:border-[var(--voltara-gold)] focus:ring-2 focus:ring-[var(--voltara-gold)]/20"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {visible && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const formVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const asideVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [status, setStatus] = useState<Status>("idle");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const update = (key: keyof FormValues) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    if (!isFormValid(values)) {
      setSubmitAttempted(true);
      return;
    }
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
  };

  const viewport = { once: true, margin: "-80px" } as const;

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-transparent py-[clamp(4rem,8vw,10rem)]"
    >
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-60"
        >
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[var(--voltara-gold)]/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[var(--voltara-navy)]/10 blur-3xl" />
        </div>
      )}

      <div
        aria-hidden="true"
        className="voltara-readability-gradient pointer-events-none absolute inset-0 z-0"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-[clamp(1rem,3vw,2.5rem)]">
        <motion.div
          className="text-center"
          variants={headerVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={viewport}
        >
          <motion.p
            variants={itemVariants}
            className="text-[clamp(0.7rem,0.85vw,0.95rem)] font-semibold uppercase tracking-[0.4em] text-[var(--voltara-gold)]"
          >
            Get in touch
          </motion.p>
          <motion.div variants={itemVariants} className="mt-4">
            <AnimatedHeadline
              as="h2"
              text="Let's power up your home."
              className="text-[clamp(1.875rem,4vw,4rem)] font-bold leading-tight text-[var(--voltara-navy)]"
            />
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-5 max-w-[clamp(32rem,55vw,52rem)] text-[clamp(1rem,1.15vw,1.375rem)] text-[var(--voltara-navy)]/70"
          >
            Share a few details and we&apos;ll be in touch within 24 hours with
            a free assessment.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:gap-10 lg:mt-16 lg:grid-cols-5 lg:gap-12">
          <motion.div
            className="lg:order-2 lg:col-span-3"
            variants={formVariants}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={viewport}
          >
            {status === "success" ? (
              <motion.div
                variants={fieldVariants}
                role="status"
                aria-live="polite"
                className="flex h-full flex-col items-center justify-center rounded-2xl border border-[var(--voltara-navy)]/10 bg-white p-[clamp(1.5rem,3vw,3rem)] text-center shadow-sm"
              >
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
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                <motion.p
                  variants={fieldVariants}
                  className="text-sm text-[var(--voltara-navy)]/70"
                >
                  Free site survey within 48 hours. No obligation.
                </motion.p>
                <motion.div variants={fieldVariants}>
                  <Field
                    id="name"
                    label="Name"
                    required
                    value={values.name}
                    onChange={update("name")}
                    placeholder="Your full name"
                    autoComplete="name"
                    validate={validators.name}
                    showError={submitAttempted}
                  />
                </motion.div>
                <motion.div
                  variants={fieldVariants}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                >
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    required
                    value={values.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                    validate={validators.email}
                    showError={submitAttempted}
                  />
                  <Field
                    id="phone"
                    label="Phone"
                    type="tel"
                    required
                    value={values.phone}
                    onChange={update("phone")}
                    placeholder="300 1234567"
                    autoComplete="tel-national"
                    inputMode="numeric"
                    prefix="+92"
                    validate={validators.phone}
                    showError={submitAttempted}
                  />
                </motion.div>
                <motion.div
                  variants={fieldVariants}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                >
                  <Field
                    id="location"
                    label="Location"
                    required
                    value={values.location}
                    onChange={update("location")}
                    placeholder="Area in Lahore"
                    autoComplete="address-level2"
                    validate={validators.location}
                    showError={submitAttempted}
                  />
                  <SelectField
                    id="propertyType"
                    label="Home or Business"
                    required
                    value={values.propertyType}
                    onChange={update("propertyType")}
                    placeholder="Select home or business"
                    options={[
                      { value: "home", label: "Home" },
                      { value: "business", label: "Business" },
                    ]}
                    validate={validators.propertyType}
                    showError={submitAttempted}
                  />
                </motion.div>

                <motion.div variants={fieldVariants} className="mt-2">
                  <MagneticButton className="inline-block" strength={0.3}>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--voltara-navy)] px-[clamp(1.5rem,2vw,2.5rem)] py-[clamp(0.75rem,1vw,1.125rem)] text-[clamp(0.75rem,0.85vw,0.9rem)] font-semibold uppercase tracking-[0.2em] text-[var(--voltara-cream)] shadow-lg shadow-[var(--voltara-navy)]/20 transition-colors hover:bg-[var(--voltara-gold)] hover:text-[var(--voltara-navy)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "submitting"
                        ? "Sending…"
                        : "Request a free quote"}
                    </button>
                  </MagneticButton>
                </motion.div>
              </form>
            )}
          </motion.div>

          <motion.aside
            className="relative flex flex-col gap-5 self-start overflow-hidden rounded-3xl border border-white/40 bg-white/15 p-[clamp(1.5rem,2vw,2.5rem)] text-[var(--voltara-navy)] shadow-2xl shadow-[var(--voltara-navy)]/15 backdrop-blur-xl ring-1 ring-inset ring-white/20 lg:order-1 lg:col-span-2"
            variants={asideVariants}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={viewport}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--voltara-gold)]">
                Reach out to us
              </p>
              <h3 className="mt-2 text-[clamp(1.5rem,2vw,2.25rem)] font-semibold">
                Prefer to chat?
              </h3>
              <p className="mt-2 text-[clamp(0.875rem,1vw,1.125rem)] text-[var(--voltara-navy)]/70">
                Message us on WhatsApp and we&apos;ll usually reply within
                minutes.
              </p>
            </div>

            <MagneticButton className="block w-full" strength={0.3}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${WHATSAPP_CTA_CLASS} max-w-none`}
              >
                <WhatsAppIcon size={20} />
                <span>Chat on WhatsApp</span>
              </a>
            </MagneticButton>

            <div className="flex flex-col gap-3 border-t border-[var(--voltara-navy)]/15 pt-5">
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="flex items-center gap-3 text-sm text-[var(--voltara-navy)]/75 transition-colors hover:text-[var(--voltara-gold)]"
              >
                <PhoneIcon />
                <span>{CONTACT_PHONE_DISPLAY}</span>
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 text-sm text-[var(--voltara-navy)]/75 transition-colors hover:text-[var(--voltara-gold)]"
              >
                <MailIcon />
                <span>{CONTACT_EMAIL}</span>
              </a>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
