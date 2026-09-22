# Kylyvnyk Club design handoff

**Status:** Approved static prototype  
**Audience:** Frontend developers, product designers, and content owners  
**Primary references:** `index.html`, `join.html`, `styles.css`, `join.css`, `DESIGN_RULES.md`

## Contents

1. [Experience direction](#experience-direction)
2. [Foundations](#foundations)
3. [Layout and responsive behaviour](#layout-and-responsive-behaviour)
4. [Component inventory](#component-inventory)
5. [Motion and interaction](#motion-and-interaction)
6. [Localization and content](#localization-and-content)
7. [Accessibility](#accessibility)
8. [Assets and provenance](#assets-and-provenance)
9. [Prototype boundaries](#prototype-boundaries)
10. [Recommended production order](#recommended-production-order)

## Experience direction

The visual direction is a refined international business club: dark, editorial, restrained, and premium rather than flashy. Warm gold is used as a controlled signal for hierarchy and action. Photography should feel documentary and credible, with quiet professional environments, natural gestures, and subdued colour.

The page should feel memorable through proportion, typography, and composition—not through decorative clutter. Preserve generous negative space, crisp rules, asymmetrical editorial layouts, and clear card groupings.

### Design principles

- **Editorial confidence:** use Prata headlines, deliberate line breaks, and large areas of negative space.
- **Useful luxury:** gold identifies hierarchy, selection, and action; it is not a general decoration colour.
- **Trust before conversion:** explain membership conditions and keep unverified claims out of the interface.
- **One system, two pages:** reuse shared buttons, typography, FAQ behaviour, and interaction conventions.
- **Progressive enhancement:** core content remains readable when scripts or animation APIs are unavailable.

## Foundations

### Colour tokens

The canonical shared tokens are defined in `:root` in `styles.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#07080a` | Main page background |
| `--ink-soft` | `#0d0f13` | Secondary dark surfaces |
| `--panel` | `#111319` | Cards and accordion items |
| `--panel-2` | `#15171c` | Elevated or alternate panels |
| `--gold` | `#d8b261` | Primary brand accent and focus |
| `--gold-bright` | `#f0d486` | High-emphasis gold text and icons |
| `--gold-dark` | `#87652d` | Quiet rules and separators |
| `--text` | `#f6f1e8` | Primary text |
| `--muted` | `#a6a39e` | Supporting text |
| `--line` | `rgba(216, 178, 97, .23)` | Branded borders |
| `--line-soft` | `rgba(255, 255, 255, .08)` | Neutral separators |
| `--danger` | `#d37561` | Validation and destructive feedback |

The landing page includes a light-theme token mapping, but dark is the approved presentation. Treat light mode as an optional extension until every component has been visually reviewed.

### Typography

| Role | Typeface | Guidance |
| --- | --- | --- |
| Display and section headings | Prata, Georgia fallback | Regular weight, tight letter spacing, editorial line breaks |
| Body and controls | Geist, Helvetica Neue fallback | 14 px minimum for meaningful UI and body copy |
| Section introductions | Geist | Approximately 17–18 px with generous line height |
| Labels and metadata | Geist | Do not reduce below legible mobile sizes or use blanket uppercase |

Do not substitute a generic sans-serif for display headings. Avoid italic text and ornamental microcopy that does not add information.

### Buttons

Use three action tiers consistently:

1. **Primary:** filled warm-gold gradient for the main action in a section.
2. **Secondary:** rectangular gold outline for an important alternative.
3. **Tertiary:** text with an underline or bottom rule for navigation and lower-priority actions.

Buttons should remain rectangular with subtle radii. Avoid pill-shaped marketing buttons and decorative diagonal-arrow glyphs.

### Borders, radii, and depth

- Use one-pixel gold or neutral rules to establish structure.
- Card radii stay restrained, generally 2–8 px; the membership pass is the intentional exception.
- Prefer layered borders, low-opacity gradients, and controlled shadow over bright glow.
- Do not add noise textures to partner-directory cards.

### Photography

- Use darkened, desaturated editorial photography with clear focal subjects.
- Preserve image legibility; overlays should support text rather than obscure the subject.
- Featured partner photography represents the service category unless the business supplies approved photography.
- Maintain meaningful `alt` text when the image communicates content; decorative marks use empty alt text.

## Layout and responsive behaviour

### Shells

- Landing page: maximum 1240 px with 24 px desktop edge space.
- Membership page: maximum 1180 px with 24 px desktop edge space.
- Mobile: 15 px edge space, expressed as `min(calc(100% - 30px), 620px)`.

### Breakpoints

| Breakpoint | Intended behaviour |
| --- | --- |
| `≤ 1050 px` | Collapse desktop navigation, simplify multi-column hero/content grids, reduce large layout gaps |
| `≤ 760 px` | Single-column page sections, stacked actions, mobile menu, compact cards and controls |
| `≤ 420 px` | Simplify dense grids, footer, and process layouts for small phones |
| `≤ 390 px` | Fine-tune membership header and card artwork for narrow devices |

Do not introduce new breakpoints until the existing four have been tested against the proposed change. Avoid fixed component widths that can force horizontal scrolling.

## Component inventory

### Header and navigation

**Status:** Implemented

- Desktop order is Sign In → Join the Club → language selector.
- The logo remains centered independently of the left and right controls.
- At tablet/mobile sizes, navigation moves into the menu panel.
- The membership page uses a compact floating header with Back to home, centered brand, Sign In, and Apply now.
- Keep focus styling visible and close the mobile menu with Escape.

### Language selector

**Status:** Implemented on the landing page

- Options use native names: English, Рус, Українська.
- The chevron is attached to the control through CSS rather than positioned independently.
- Selection stays on the current local page and is stored in `localStorage` when available.
- The membership page remains English-only by the current product decision.

### Hero

**Status:** Implemented

- Preserve the current headline, supporting copy, two-action hierarchy, world/orbit artwork, and club-card visual.
- The three club figures belong at the bottom of the hero and should match real directory data when production content is available.
- Do not reintroduce a separate country strip or a duplicate section title below the hero.

### Membership option cards

**Status:** Implemented

- The entire card is a single pointer and keyboard target.
- Member, VIP Member, and Business options must remain visually distinct.
- Business uses a dedicated photographic panel rather than only an icon or colour variation.

### Featured partners

**Status:** Implemented with illustrative content

- Use exactly three primary cards in the current layout.
- Show the country beside the service information, not as a label over the photo.
- Keep the “View All Partners” action after the cards.
- Replace prototype business names, offers, and photographs only with approved material.

### Partner directory

**Status:** Functional static prototype

- Search combines free text, country, city, and category filters.
- Result count and empty state update without a page reload.
- Countries are selected inside the search form; do not add quick country tabs.
- Member benefits remain visually explicit badges.
- Production data should come from one source of truth rather than duplicated HTML attributes.

### How It Works

**Status:** Implemented

- Preserve logical sequence and use Lucide icons rather than visible decorative step numbers.
- On narrow screens the layout becomes two columns and then one column where necessary.

### FAQ accordion

**Status:** Shared component

- Markup uses `.faq`, `.faq-layout`, `.accordion`, `.faq-item`, and `.faq-panel`.
- `faq.js` initializes every `[data-accordion]` instance on both pages.
- Only one item is open at a time; selecting an open item closes it.
- Keep `aria-expanded`, `aria-controls`, `aria-labelledby`, and `hidden` synchronized.
- Include a visible Get in Touch action on the landing page.

### Membership routes and demonstration form

**Status:** Demonstration only

- Direct membership is presented at `$4.99/month` in the current concept.
- Partner registration requires an invitation and can be complimentary subject to eligibility.
- Route links preselect the matching option in the form.
- The “submit” control previews a confirmation only; it does not transmit data or take payment.
- Do not collect passwords, identity documents, card details, or payment information in this prototype.

### Footer

**Status:** Implemented

- Keep policy names in one compact row below the main footer columns.
- Until real policy URLs exist, policy names remain labels rather than misleading links.
- Provide a visible Back to top action.

## Motion and interaction

- Reveal animations use a single upward fade orchestrated by `IntersectionObserver`.
- Respect `prefers-reduced-motion`; content must appear immediately with no transform.
- Hover motion should be small and structural—minor elevation, colour, or border changes.
- Never make visibility dependent on JavaScript loading. The local-file regression tests protect this requirement.
- Keep transitions in the 200–850 ms range already established by the CSS; use the shared `--ease` curve for larger movements.

## Localization and content

English text in `index.html` is the source language. `locales.js` maps exact source strings to Ukrainian and Russian translations, and `app.js` translates text and relevant attributes at runtime.

When changing visible landing-page copy:

1. Update the English source in `index.html`.
2. Add or update the exact English key in `locales.js`.
3. Provide both Ukrainian and Russian values.
4. Run `npm test`; the localization coverage test reports missing entries.

Names, email addresses, numeric values, and approved brand terms can remain untranslated. Keep native language labels in the selector.

Content owners must confirm claims about verification, reach, membership benefits, prices, refunds, renewals, and offer availability before production release.

## Accessibility

### Already implemented

- Semantic headings, sections, navigation landmarks, buttons, links, and form labels.
- A skip link and visible `:focus-visible` styling.
- Keyboard-operable menus, membership cards, filters, and FAQ controls.
- Reduced-motion support.
- Accessible accordion relationships and synchronized expanded states.
- Meaningful alternative text for content photography.

### Required before production

- Run a complete WCAG 2.2 AA audit with keyboard and screen-reader testing.
- Confirm text and control contrast against final image treatments.
- Add production-grade validation summaries and live error announcements to real forms.
- Define focus management for real authentication, checkout, and confirmation screens.
- Ensure dynamically loaded partner results announce meaningful updates without excessive verbosity.

## Assets and provenance

- Brand assets and local imagery live in `assets/`.
- Lucide SVG icons live in `assets/icons/`; retain `assets/icons/LICENSE`.
- Featured partner and business-category images are based on Unsplash sources listed in `DESIGN_RULES.md` and are illustrative rather than verified business premises.
- `assets/about-boardroom.png` was generated for this concept; its prompt and use are documented in `DESIGN_RULES.md`.
- Replace prototype photography only with licensed, approved assets and preserve crop direction in both desktop and mobile layouts.

## Prototype boundaries

The repository intentionally does not include:

- User authentication or account persistence.
- A backend, database, CMS, or partner API.
- Payment processing, subscription creation, tax calculation, or cancellation workflows.
- Form transmission or email delivery.
- Confirmed legal policies or linked policy pages.
- Verified production partner data, offers, counts, or eligibility rules.
- Production analytics, consent management, SEO schema, or monitoring.

Treat these as product and engineering work, not as missing front-end polish.

## Recommended production order

1. Confirm the product model: membership types, eligibility, pricing, renewal, cancellation, and partner-offer rules.
2. Approve final copy, partner records, imagery, legal policies, and localization ownership.
3. Choose the production architecture and data source for members, partners, offers, and content.
4. Implement authentication and membership state before connecting real forms.
5. Add payments only after price presentation, taxes, renewal, cancellation, and refunds are defined.
6. Replace the static directory data with one validated source of truth.
7. Complete accessibility, security, privacy, performance, and browser testing.
8. Add deployment, preview environments, monitoring, analytics, and rollback procedures.

## Changelog

- **2026-09-22:** Initial developer handoff created from the approved static prototype.
