import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Footer as SiteFooter } from "@/components/ui/footer";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/lib/contact";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { VoltaraLogo } from "./VoltaraLogo";
import { WhatsAppIcon } from "./WhatsAppIcon";

const CURRENT_YEAR = new Date().getFullYear();

const FOOTER_LINK_CLASS =
  "text-[clamp(0.75rem,0.85vw,0.95rem)] text-[var(--voltara-cream)]/80 transition-colors hover:text-[var(--voltara-gold)]";

const FOOTER_MUTED_LINK_CLASS =
  "text-[clamp(0.7rem,0.8vw,0.9rem)] text-[var(--voltara-cream)]/50 transition-colors hover:text-[var(--voltara-gold)]";

const SOCIAL_BUTTON_CLASS =
  "border border-[var(--voltara-cream)]/20 bg-[var(--voltara-cream)]/10 text-[var(--voltara-cream)] shadow-none hover:bg-[var(--voltara-gold)]/20 hover:text-[var(--voltara-gold)]";

export function Footer() {
  return (
    <div className="border-t border-white/15 bg-[var(--voltara-navy)]/70 text-[var(--voltara-cream)] shadow-2xl shadow-[var(--voltara-navy)]/20 backdrop-blur-xl">
      <div className="mx-auto max-w-[1600px]">
        <SiteFooter
          className="pt-[clamp(2rem,3vw,4rem)] pb-4 lg:pt-[clamp(2.5rem,3.5vw,4rem)]"
          linkClassName={FOOTER_LINK_CLASS}
          mutedLinkClassName={FOOTER_MUTED_LINK_CLASS}
          socialButtonClassName={SOCIAL_BUTTON_CLASS}
          brand={
            <Link href="/" className="inline-flex items-center gap-2.5">
              <VoltaraLogo className="h-[clamp(2rem,2.2vw,2.75rem)] w-[clamp(2rem,2.2vw,2.75rem)]" />
              <div className="flex flex-col">
                <span className="text-[clamp(0.95rem,1.1vw,1.25rem)] font-bold tracking-[0.25em]">
                  VOLTARA
                </span>
                <span className="text-[clamp(0.625rem,0.7vw,0.8rem)] font-bold uppercase tracking-[0.45em] text-[var(--voltara-gold)]">
                  Solar
                </span>
              </div>
            </Link>
          }
          description={
            <p className="text-[clamp(0.75rem,0.85vw,0.95rem)] leading-relaxed text-[var(--voltara-cream)]/70">
              Premium rooftop solar for homes and businesses in Lahore — from
              survey to installation and net metering.
            </p>
          }
          socialLinks={[
            {
              icon: <WhatsAppIcon size={20} />,
              href: WHATSAPP_URL,
              label: "Contact us on WhatsApp",
            },
            {
              icon: <Phone className="h-5 w-5" />,
              href: `tel:${CONTACT_PHONE_TEL}`,
              label: `Call ${CONTACT_PHONE_DISPLAY}`,
            },
            {
              icon: <Mail className="h-5 w-5" />,
              href: `mailto:${CONTACT_EMAIL}`,
              label: `Email ${CONTACT_EMAIL}`,
            },
          ]}
          mainLinks={[
            { href: "/", label: "Home" },
            { href: "/#contact", label: "Contact" },
          ]}
          contact={
            <div>
              <h3 className="text-[clamp(0.7rem,0.8vw,0.9rem)] font-semibold uppercase tracking-[0.3em] text-[var(--voltara-gold)]">
                Contact
              </h3>
              <ul className="mt-3 flex list-none flex-col gap-2 text-[clamp(0.75rem,0.85vw,0.95rem)]">
                <li>
                  <a
                    href={`tel:${CONTACT_PHONE_TEL}`}
                    className={FOOTER_LINK_CLASS}
                  >
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className={FOOTER_LINK_CLASS}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li className="text-[var(--voltara-cream)]/60">
                  <address className="not-italic">
                    Office&nbsp;1, DHA Phase&nbsp;5
                    <br />
                    Lahore, Pakistan
                  </address>
                </li>
                <li className="text-[var(--voltara-cream)]/60">
                  Mon–Sat, 9:00&nbsp;AM – 7:00&nbsp;PM PKT
                </li>
              </ul>
            </div>
          }
          legalLinks={[{ href: "/privacy", label: "Privacy Policy" }]}
          copyright={{
            text: `© ${CURRENT_YEAR} Voltara Solar. All rights reserved.`,
          }}
        />
      </div>
    </div>
  );
}
