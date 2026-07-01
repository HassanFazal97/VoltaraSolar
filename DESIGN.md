---
name: Voltara Solar
description: Premium solar energy solutions for Lahore homes and businesses.
colors:
  lahore-night-navy: "#042b58"
  ink-deep: "#011431"
  filament-gold: "#f9ae0e"
  letterpress-cream: "#faf8f3"
  paper-white: "#ffffff"
  whatsapp-green: "#25d366"
  signal-red: "#dc2626"
typography:
  display:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "clamp(1.875rem, 4vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "clamp(1.5rem, 2vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  bodyLarge:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "clamp(1rem, 1.15vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "clamp(0.875rem, 1vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "clamp(0.7rem, 0.85vw, 0.95rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.3em"
  eyebrow:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "0.625rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.35em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  gutter: "clamp(1rem, 3vw, 2.5rem)"
  sectionY: "clamp(4rem, 8vw, 10rem)"
  cardPad: "clamp(1.5rem, 3vw, 3rem)"
  asidePad: "clamp(1.5rem, 2vw, 2.5rem)"
  stackGap: "clamp(2rem, 3vw, 4rem)"
  container: "1600px"
components:
  button-primary:
    backgroundColor: "{colors.lahore-night-navy}"
    textColor: "{colors.letterpress-cream}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "clamp(0.75rem, 1vw, 1.125rem) clamp(1.5rem, 2vw, 2.5rem)"
  button-primary-hover:
    backgroundColor: "{colors.filament-gold}"
    textColor: "{colors.lahore-night-navy}"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp-green}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    padding: "1rem 1.75rem"
  nav-link:
    textColor: "{colors.lahore-night-navy}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.filament-gold}"
  input-field:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.lahore-night-navy}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
  glass-aside:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.lahore-night-navy}"
    rounded: "{rounded.xl}"
    padding: "{spacing.asidePad}"
  footer-surface:
    backgroundColor: "{colors.lahore-night-navy}"
    textColor: "{colors.letterpress-cream}"
    padding: "clamp(2rem, 3vw, 4rem) {spacing.gutter}"
---

# Design System: Voltara Solar

## 1. Overview

**Creative North Star: "The Lahore Letterhead"**

The Voltara visual system is a formal document from an established Lahore firm: classical serif, cream paper, navy ink, a gold seal. Every surface should feel composed, considered, and locally grounded. The serif typography (Libre Baskerville) carries the gravitas; the cream paper backdrop carries the warmth; the navy and gold carry the brand. The system is patient: it pays out trust over a slow scroll rather than shouting for attention.

Voltara is selling a long-term, expensive home upgrade to two cautious audiences (homeowners and small businesses in Lahore). The interface is the firm's letterhead, not a sales sheet. Restraint is not absence: it is a stance. Motion is choreographed, not scattered. Color commitment is deliberate, not decorative. Glass surfaces appear sparingly as a signature, not as a default treatment.

This system explicitly rejects the Tesla / SunRun SaaS-tech aesthetic: no dark hero with neon gradients, no glassy product-card grid scaffolding, no generic "clean energy product page" composition. It also rejects local-installer template tropes (stock panels-on-rooftop photography, builder-grade testimonial sliders) and eco-cliché iconography (leaves, soft green gradients, sunrise stock). The brand voice is direct and specific, not aspirational.

**Key Characteristics:**
- Serif-led identity (Libre Baskerville carries display, headline, body, and label roles).
- Editorial pacing: generous whitespace, deliberate motion, one dominant idea per fold.
- Restrained color commitment: navy + gold + cream as the brand triad; everything else is utility.
- Flat by default, glass as a rare signature on two named surfaces.
- WhatsApp is the primary conversion path, treated as a first-class CTA in its own utility color.

## 2. Colors: The Letterhead Palette

A four-color brand triad plus utility roles. The triad is grounded in the Lahore Letterhead metaphor: cream paper, navy ink, gold seal. No tertiary brand color is required.

### Primary
- **Lahore Night Navy** (`#042b58`): The default ink. Carries every CTA fill, every body heading, every navigation surface, every footer field. The brand's center of gravity.
- **Ink Deep** (`#011431`): A darker navy reserved for the hero lead paragraph and any body copy that needs to push past the default for emphasis. One step further into the ramp than primary navy.

### Secondary
- **Filament Gold** (`#f9ae0e`): The seal. Used for: hover state on primary CTAs, hover state on nav links, the small uppercase eyebrows above sections, the underline that grows on nav link hover, the form's required-field asterisks, the input's focused-border glow. Never used as a CTA fill at rest; the gold appears as response, not invitation.

### Neutral
- **Letterpress Cream** (`#faf8f3`): The body background and the inverse text color (CTAs filled with navy print onto cream type). Carries warmth without slipping into beige territory.
- **Paper White** (`#ffffff`): Form fields, success card, the "tactile surface" inside a cream page. Used sparingly; cream is the dominant page color.

### Utility (do not use as brand)
- **WhatsApp Green** (`#25d366`): Reserved for WhatsApp CTAs only. The green glow halo around the WhatsApp button is a deliberate brand exception so the platform identity reads instantly. Never use this green for any non-WhatsApp surface.
- **Signal Red** (`#dc2626`): Form validation errors only. Never decorative.

### Named Rules

**The One Seal Rule.** Filament Gold is the brand's seal, not its surface. Total gold coverage on any given screen stays under 8 percent (small glyphs, hover states, underlines, the required-field asterisk). A gold-filled CTA at rest is forbidden; gold appears as response (hover, focus, completion), not invitation.

**The Cream-Or-Navy Rule.** Every surface is either Letterpress Cream or Lahore Night Navy. There is no third surface tone. The footer inverts (navy surface, cream text); the body is cream (with navy text); form fields are Paper White inside a cream parent. Mid-tone surfaces are forbidden.

**The Utility-Green Quarantine.** WhatsApp Green appears only inside WhatsApp CTAs. It is not a brand color and may not creep into accents, dividers, success states, or anywhere else.

## 3. Typography: One Voice, Eight Roles

**Display Font:** Libre Baskerville (with Georgia, serif fallback).
**Body Font:** Libre Baskerville (the same family carries body weight).
**Label/Mono Font:** None. Voltara is a single-family system.

**Character:** A 19th-century transitional serif chosen for the same reason a law firm picks its letterhead face: it reads as established without trying to. The two-weight pairing (Regular 400 and Bold 700, with synthetic extra-bold for the hero only) provides plenty of contrast without introducing a second family. Letter-spacing is uniformly negative on display sizes and uniformly positive on uppercase labels, which is the system's main typographic tension.

### Hierarchy

- **Display** (700 upright + 400 italic, clamp(2.5rem, 6vw, 5.5rem), line-height 1.05, tracking -0.03em): Hero headline. Mixed case. Weight contrast plus serif italic (Libre Baskerville italic, loaded via `style: ["normal", "italic"]` in next/font) carries the emphasis that gradient text used to.
- **Headline** (700, clamp(1.875rem, 4vw, 4rem), line-height 1.1, tracking -0.02em): Section heads. The size used by the Contact section title.
- **Title** (600, clamp(1.5rem, 2vw, 2.25rem), line-height 1.2): Subheads inside cards and asides ("Prefer to chat?").
- **Body Large** (400 or 700, clamp(1rem, 1.15vw, 1.375rem), line-height 1.55): Hero subtitle copy and lead paragraphs under section headlines. Bold 700 in the hero subtitle for assertion; Regular 400 in supporting copy.
- **Body** (400, clamp(0.875rem, 1vw, 1.125rem), line-height 1.6, max line length 65 to 75ch): Default paragraph text. Footer, descriptions, helper copy.
- **Label** (600, clamp(0.7rem, 0.85vw, 0.95rem), tracking 0.3em, uppercase): Section eyebrows, nav links, form field labels, button text. The tracked uppercase voice is the system's secondary typographic gesture.
- **Eyebrow** (600, 0.625rem / 10px, tracking 0.35em, uppercase): The smallest tracked-caps role. Stats carousel chrome, scroll indicator, dense metadata.

### Named Rules

**The Single-Family Rule.** Libre Baskerville is the only family. Adding a second display face, a mono companion, or a sans for "system feel" is forbidden. Contrast comes from weight (400 vs 700 vs 800), size, and case, not from a second typeface.

**The 6rem Ceiling.** No display heading exceeds 6rem (96px) at any viewport. The brand-mark VOLTARA logotype is permitted larger because it's a logo, not a heading. Everything that reads as type caps at the ceiling.

**The Tracked-Caps Quarantine.** Uppercase letter-spaced text is reserved for: button labels, nav links, section eyebrows above headings, form field labels, and the footer's section heads. It does not appear in body copy, in headings, or as decoration. The temptation to put a "01 PROCESS" tracked-caps marker above every section is the SaaS-template reflex and is forbidden by name.

**The Shimmer Reservation.** The `voltara-shimmer` treatment (navy through gold and back, 5.5s loop) is permitted on exactly one accent phrase per page. Current canonical use: the italic "Go solar." in the hero headline, paired with serif italic for letterform contrast. Gradient text on any other word, heading, body element, or section is forbidden. The shimmer is a brand mark, not a typographic style; if it spreads, it stops being one.

## 4. Elevation

The system is flat by default. Depth comes from typography weight, color commitment, and the cream-against-navy figure-ground, not from elevation. Two named surfaces are exceptions: the glass aside (Contact panel) and the cream-tinted stats carousel. Everywhere else, drop shadows are subtle and tinted with the brand navy at low opacity, not the generic black-on-white reflex.

### Shadow Vocabulary

- **Card Lift** (`box-shadow: 0 1px 2px 0 rgba(4, 43, 88, 0.08)`): The default-tier shadow under success cards, form panels, and the cream stats card. Almost flat; reads as "lifted, not floating."
- **Brand Lift** (`box-shadow: 0 10px 25px -5px rgba(4, 43, 88, 0.2), 0 8px 10px -6px rgba(4, 43, 88, 0.12)`): The primary CTA's hover-ready lift, also used on the scrolled-state nav. Navy-tinted shadow keeps it on-brand.
- **Glass Lift** (`box-shadow: 0 25px 50px -12px rgba(4, 43, 88, 0.15)`): The Contact aside's glass surface. Soft, atmospheric, paired with backdrop-blur.
- **WhatsApp Glow** (`box-shadow: 0 0 18px rgba(37, 211, 102, 0.42), inset 0 0 18px rgba(37, 211, 102, 0.16)`): The signature WhatsApp button glow. Both outer and inner halos. This is the only neon-style shadow allowed in the system and only on the WhatsApp CTA.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. If a new component needs depth, prove the elevation by asking what state it represents (hover, focus, success): elevation as state, not as decoration.

**The Glass-Is-Signature Rule.** Backdrop-blur and translucent fills appear on the Contact aside ("Prefer to chat?" panel) as the canonical glass surface. The footer also currently uses glass and is queued for review in a forthcoming polish pass (likely retirement to solid navy). Adding glass to any third surface (modals, popovers, generic cards) is forbidden. The signature is rare or it stops being one.

## 5. Components

### Buttons

Buttons are pill-shaped (fully rounded), uppercase-tracked, and animated with a subtle magnetic-cursor follow effect (`MagneticButton` wrapper). The pill is the brand's CTA shape. Rectangular buttons exist only for form submission contexts where the pill would compete with the surrounding form geometry.

- **Primary Pill (rest)**: Lahore Night Navy fill, Letterpress Cream text, 0.2em uppercase tracking, padding clamp(0.75rem, 1vw, 1.125rem) clamp(1.5rem, 2vw, 2.5rem). Brand Lift shadow.
- **Primary Pill (hover)**: Filament Gold fill, Lahore Night Navy text. Color inversion is the hover signal; no scale transform, no translate.
- **Primary Pill (magnetic)**: Cursor proximity within ~50px translates the button up to 30 percent of the cursor offset. Spring physics: stiffness 220, damping 18, mass 0.4. Reduced-motion disables the magnetism entirely (the wrapper detects and renders a static div).
- **WhatsApp CTA**: WhatsApp Green at 35 percent opacity over its own color, white text, 0.15em uppercase tracking, WhatsApp Glow shadow (both outer and inset). Hover deepens the fill to 50 percent and intensifies the glow. The only neon-style component in the system.

### Inputs and Fields

Form fields are Paper White rectangles inside the cream page. The contrast is intentional: the field is the workspace, the page is the document.

- **Field shell**: White background, 1px border at Lahore Night Navy 15 percent opacity, 8px radius (md). Flex container with optional left-side prefix slot (used for the `+92` country-code chip in the phone field).
- **Field focus**: Border swaps to Filament Gold, 2px ring at Filament Gold 20 percent opacity. No scale or position transform.
- **Field error**: Border swaps to Signal Red, 2px ring at Signal Red 15 percent opacity. Inline `role="alert"` message below the field in xs Body weight with `text-red-600`.
- **Field label**: Label scale (xs uppercase tracked 0.2em) at Lahore Night Navy 80 percent opacity. Required indicator: trailing asterisk in Filament Gold.
- **Select field**: Same shell as the input. The empty placeholder option is text-only (no custom chevron); native browser styling carries over for the dropdown surface.

### Navigation

The nav is a translucent bar that crystallizes on scroll. Below 8px scroll: fully transparent over the hero, no shadow. Past 8px: Letterpress Cream at 85 percent opacity, backdrop-blur-md, Card Lift shadow. Transition duration 300ms.

- **Nav link**: Tracked-caps Label at Lahore Night Navy. The animated underline (gold, growing from left on hover) is the signature interaction: 2px tall, scaled by transform from 0 to 1 over 350ms with the brand easing (`cubic-bezier(0.22, 1, 0.36, 1)`).
- **Nav CTA**: Primary Pill, smaller padding scale (clamp(0.5rem, 0.7vw, 0.75rem) clamp(1rem, 1.3vw, 1.5rem)), magnetic strength 0.35.
- **Mobile menu**: Full-width drawer below the nav bar, cream surface at 95 percent opacity with the same backdrop-blur. Vertical-stacked links with the same tracked-caps treatment. Top border at Lahore Night Navy 10 percent opacity.

### Glass Aside (Signature Component)

The Contact section's "Prefer to chat?" panel. Paper White at 15 percent opacity, backdrop-blur-xl, 24px radius (xl), inset 1px ring at white 20 percent, Glass Lift shadow. A 1px horizontal hairline (white at 70 percent, fading to transparent at both ends) sits across the top of the panel as a top-light effect. The panel hosts the WhatsApp CTA plus phone and email rows.

The Contact aside is the canonical glass surface. Any future glass usage should reference this component as the prototype rather than reinventing a glass treatment.

### Footer Surface

Lahore Night Navy at 70 percent opacity, backdrop-blur-xl, Letterpress Cream text. Three-column grid on desktop (brand + quick links + contact), single column below `md`. Section heads inside the footer use Filament Gold tracked-caps Label. The "border-top" treatment uses white at 15 percent opacity to keep the divider readable on the navy field.

## 6. Do's and Don'ts

### Do

- **Do** use Libre Baskerville for every text role. Weight (400, 700, 800), size, and case carry hierarchy.
- **Do** lead every CTA hierarchy with the WhatsApp button. The page exists to start a WhatsApp conversation; the visual hierarchy must reflect that.
- **Do** keep Filament Gold coverage under 8 percent of any screen. Gold is the seal; gold-as-background is forbidden.
- **Do** wrap primary CTAs in `MagneticButton` for cursor-proximity translation. Always render a reduced-motion fallback (the wrapper handles this).
- **Do** use Card Lift / Brand Lift / Glass Lift shadows from the named vocabulary. Tint every shadow with Lahore Night Navy at low opacity, never raw black.
- **Do** verify body text against its background: `var(--voltara-navy)` on cream reads 11:1; `var(--voltara-navy)/70` on cream reads ~7:1. Stop bumping the opacity any lower than 70 percent for body copy.
- **Do** name dates and quantities specifically ("12 hrs daily load shedding", "4 yrs payback at NEPRA tariffs"). Specifics carry trust; abstractions don't.
- **Do** carry every animation behind a `useReducedMotion` check. The hero choreography and the stats counter are the model.

### Don't

- **Don't** look like Tesla / SunRun / a SaaS product page. Dark hero, neon gradient cards, generic clean-energy composition. PRODUCT.md names this as the primary anti-reference; the entire system is built against it.
- **Don't** ship the local-installer template look: stock panels-on-rooftop photography, three-color WordPress theme, builder-grade testimonial sliders.
- **Don't** ship eco-cliché iconography: leaves, soft green gradients, sunrise stock, "sustainable future" platitudes.
- **Don't** use gradient text anywhere except the single reserved phrase ("Go solar." in the hero) per the Shimmer Reservation. Section headings, body copy, buttons, and any non-reserved hero word are solid color only. Emphasis comes from weight, italic, scale, or color.
- **Don't** add a second font family. The Single-Family Rule is non-negotiable.
- **Don't** put a tracked-caps eyebrow ("ABOUT" / "PROCESS" / "PRICING") above every section. One named eyebrow per page (e.g. "Get in touch" above the Contact headline) is voice; an eyebrow on every section is AI scaffolding.
- **Don't** add `01 ·` / `02 ·` numbered section markers as default scaffolding. Numbers appear only when the section IS a sequence.
- **Don't** use glass on a third surface. The Contact aside and the stats carousel are the only authorized glass components. Adding glass to modals, popovers, cards, or generic containers is forbidden.
- **Don't** use side-stripe borders (`border-left` greater than 1px as a colored accent) on cards, alerts, or callouts. Use full borders, leading numbers, or no border at all.
- **Don't** introduce hard-sell sales-page energy: countdown timers, ALL-CAPS urgency body copy, yellow highlight slabs, multiple competing CTAs above the fold.
- **Don't** use Filament Gold as a CTA fill at rest. Gold appears in hover, focus, and accent contexts only.
- **Don't** let WhatsApp Green creep outside of WhatsApp CTAs. It is platform identity, not brand identity.
- **Don't** ship animation that gates content visibility on a class-triggered transition. The reveal pauses on hidden tabs and headless renderers; the page must render its content as the default state with motion enhancing, not creating, visibility.
- **Don't** use em dashes in copy. Use commas, colons, semicolons, periods, or parentheses.
