# Business Partner page design

## Goal

Create an English Business Partner landing page that turns the supplied promotional themes into a credible, premium partner proposition. The page should help a business understand the value exchange, current advertised price, application requirements, onboarding process, and prototype limitations before starting an application.

## Approved direction

Build a full standalone page at `business.html` with a non-transmitting demonstration application. Reuse the current Kylyvnyk foundations and shared components rather than creating a second design system.

The page should remain editorial, calm, and specific. It may describe access, visibility, introductions, and opportunities, but must not promise guaranteed clients, revenue, international expansion, category exclusivity, referrals, or approval.

## Page architecture

### 1. Header

Reuse the compact subpage header pattern: Back to home, centered Kylyvnyk brand, Sign In, and an Apply now action. The page is English-only, so no language control is required yet.

### 2. Hero

- Heading: “Put your business in front of the right community.”
- Explain that partners can build a credible profile, publish a member offer, and create useful relationships.
- Primary action: “Apply to become a partner.”
- Secondary action: “See what’s included.”
- Present `$19.99/month` as the **current advertised partner plan**, not a complete contract.
- State beside the CTA that applications are reviewed and no payment is taken on this page.
- Use existing business/editorial photography and orbit artwork rather than the supplied flyer as an image.

### 3. Partnership value strip

Show four concrete mechanisms:

- Business profile
- Member offer
- Partner directory
- Community introductions

Do not use illustrative member, lead, revenue, or market counts.

### 4. Benefit grid

Use six cards based on the reference themes, with qualified copy:

1. Reach relevant members
2. Build international relationships
3. Strengthen your brand presence
4. Create a member advantage
5. Invite eligible customers
6. Explore referral opportunities

Referral or co-marketing rewards must be described as optional and subject to a separate written agreement.

### 5. What the plan includes

Use a clear checklist and editorial pricing card. Include:

- Directory profile
- Country, city, and category placement
- Business description and approved contact links
- One active member offer
- Digital partner badge/assets
- Offer update requests
- Selected networking and event announcements when available
- Basic onboarding support

Featured placement, analytics, unlimited offers, guaranteed leads, and category exclusivity are not included unless later confirmed.

### 6. Offer guidance and partner fit

Explain what makes a useful member offer and what information is needed before publication. Examples can include a fixed discount, complimentary consultation, member upgrade, or priority booking. Every offer should define eligibility, redemption, availability, expiry, exclusions, and compatibility with other promotions.

Partners should provide an accurate legal/business name, location, website or social profile, service area, primary contact, clear offer, and fulfilment conditions. Approval is not guaranteed.

### 7. Process

Use four steps:

1. Apply
2. Review
3. Prepare the profile and offer
4. Publish after approval and activation

### 8. Demonstration application

The prototype form should collect only the information required to preview the future flow:

- Company name
- Website or social profile
- Country and city
- Business category
- Contact name and business email
- Business description
- Proposed member offer
- Preferred contact method
- Consent to be contacted about the application

The control must be a button rather than a transmitting form submission. It should validate required fields, then display an explicit confirmation that no information was sent and no payment was taken.

### 9. FAQ

Reuse the shared `.faq` and `[data-accordion]` component. Answer:

- What is currently included in the $19.99/month plan?
- Is every application accepted?
- When can a profile be published?
- What kind of member offer can a partner provide?
- Can an offer be updated or paused?
- Can partners invite customers?
- Are referrals or rewards guaranteed?
- When are billing, renewal, cancellation, taxes, and refunds confirmed?
- Which countries and categories are currently supported?

### 10. Final CTA and footer

Close with “Ready to introduce your business to the club?” and offer both Start partner application and Contact the club actions. Reuse the existing footer structure and keep policy names as labels until real URLs exist.

## Component and file strategy

- Create `business.html` for semantic page markup.
- Create `business.css` after `styles.css` for partner-page layouts only.
- Create `business.js` only for the demonstration application; use `app.js` for header/menu/reveal behaviour and `faq.js` for the accordion.
- Reuse root tokens, `.shell`, `.section`, header/navigation, buttons, `.reference-heading`, `.benefit-list`, process cards, `.faq*`, `.final-cta`, footer, and `.reveal` conventions.
- Reuse `membership-business.jpg`, `about-boardroom.png`, `hero-orbit-gold.png`, brand assets, and Lucide icons.
- Change only the Business membership card on `index.html` to target `business.html`. Individual membership and invitation links remain on `join.html`.

## Responsive behaviour

- At 1050 px: collapse navigation and reduce multi-column areas.
- At 760 px: use the shared 15 px mobile shell, stack hero, pricing, content, form, and FAQ layouts; make primary actions full width where appropriate.
- At 420 px: move dense grids and checklist groups to one column.
- Avoid fixed widths and verify no horizontal overflow at 390 px.

## Accessibility

- Preserve the skip link and visible global focus indicator.
- Use native inputs, selects, textareas, labels, and fieldsets.
- Mark required fields in visible text.
- Keep application confirmation focusable and move focus after preview.
- Maintain accordion ARIA relationships through the shared component.
- Respect `prefers-reduced-motion` and leave content visible if JavaScript fails.
- Keep informative text at least 14 px and verify gold/grey contrast on dark surfaces.

## Content and product safeguards

- `$19.99/month` is a screenshot-supplied current advertised price and needs commercial/legal confirmation before production billing.
- Do not repeat “Registered in USA” without an approved legal entity reference.
- Do not publish “free for up to 10,000 customers,” automatic partner revenue, or referral payouts without complete rules.
- Do not claim verification, guaranteed leads, additional income, market entry, exclusivity, or priority without a real programme and evidence.
- Final checkout must disclose currency, tax, renewal, cancellation, refunds, activation, and effective terms before payment.

## Competitor-informed patterns

The content direction follows mechanisms described on official first-party pages from BNI, Entrepreneurs’ Organization, London Chamber of Commerce and Industry, the U.S. Chamber of Commerce, World Trade Centers Association, and AmCham Luxembourg. These sources support directory/profile visibility, introductions, events, member offers, visitor invitations, and short onboarding flows. They do not establish paid referral rewards as a standard entitlement.

Detailed findings and source links are stored in `docs/research/2026-09-22-business-partner-competitor-patterns.md`.

## Verification

- Add a dedicated `tests/business-page.test.mjs` suite.
- Verify required sections, price qualifiers, form safety, shared components, and local asset references.
- Verify the Business card routes locally while Member and partner-invitation routes remain unchanged.
- Run the full test suite and JavaScript syntax checks.
- Test the page at desktop and 390 px mobile widths.
- Verify direct `file://` opening and server-based opening.
