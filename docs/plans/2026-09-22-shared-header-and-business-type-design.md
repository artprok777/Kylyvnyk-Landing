# Shared header and business typography design

## Goal

Make navigation predictable across the landing, membership, and business-partner pages, and bring the business page back onto the established Kylyvnyk typography scale.

## Global header

All three pages use the same centered-logo header structure and the same shared header styles.

The left navigation contains exactly three global destinations:

- **The Club** opens `index.html`.
- **Membership** opens `join.html`.
- **Partnership** opens `business.html`.

The current page is indicated in gold and with `aria-current="page"`. The mobile menu repeats the same order. Contextual actions remain on the right: Sign In plus the relevant Join or Apply action. The language selector remains on the localized landing page only.

Page-specific header CSS must not redefine shared navigation font size, letter spacing, container dimensions, or grid spacing.

## Landing-page Join behaviour

Add a dedicated `plans` anchor to the three membership cards. Every landing-page CTA labelled “Join the Club”—desktop header, mobile menu, and hero—scrolls to `#plans`. The cards remain the route selectors: Member opens `join.html`, Business opens `business.html`, and the VIP destination remains unchanged.

The plans anchor uses the existing fixed-header scroll offset.

## Business typography

Reuse the existing type system rather than adding page-specific sizes:

- Hero headline: shared hero scale, maximum `82px`.
- Standard section heading: shared scale, maximum `62px`.
- Centered reference heading: shared scale, maximum `52px`.
- Introductory copy: `18px`.
- Body copy, labels, disclosures, and controls: `14px`.
- Primary card headings: `27px`.
- Compact card and process headings: `20px`.
- FAQ question: inherited shared `19px` component style.
- Plan prices: shared `31px` scale.

Remove business-only headline values such as `29px`, `34px`, `42px`, `58px`, and `72px` where an established shared size exists. Responsive values follow the same breakpoints and hierarchy as `styles.css`.

## Responsive behaviour

At `1050px` and below, the shared desktop navigation collapses to the mobile menu. No header item may overlap the centered logo or right-side actions. At `760px` and `420px`, business typography follows the shared mobile scales and the page must remain free of horizontal overflow.

## Verification

- Regression tests verify all three global headers and the `#plans` CTA targets.
- Business-page tests verify the `82px` hero cap and shared typography values.
- Browser checks cover desktop and 390px mobile layouts, menu behaviour, anchor scrolling, and navigation between all three pages.
