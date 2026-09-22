# Kylyvnyk Club landing prototype

A responsive static prototype for the Kylyvnyk Club website. It includes the public landing page, English membership and business-partner pages, a searchable partner directory, shared FAQ behaviour, and Ukrainian and Russian localization for the landing page.

> Status: design-ready prototype. The interface is functional, but authentication, payments, form submission, member accounts, and live partner data are not connected to production services.

## Quick start

There is no build step and no package installation is required.

```bash
git clone https://github.com/artprok777/Kylyvnyk-Landing.git
cd Kylyvnyk-Landing
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173) in a browser.

You can also open `index.html` directly from the filesystem. The scripts intentionally support local `file://` previews so navigation between the landing and membership pages continues to work.

## Pages

| Page | File | Notes |
| --- | --- | --- |
| Landing page | `index.html` | English, Ukrainian, and Russian; partner filters; membership options; shared FAQ |
| Membership page | `join.html` | English-only membership information and a non-transmitting demonstration form |
| Business partner page | `business.html` | English-only partner plan, offer guidance, onboarding details, shared FAQ, and a non-transmitting demonstration application |

## Useful commands

```bash
# Run the complete automated test suite
npm test

# Serve the project through package scripts
npm run serve

# Check the shipped JavaScript files
node --check app.js
node --check locales.js
node --check faq.js
node --check join.js
node --check business.js
```

## Repository map

```text
.
├── index.html              Landing page markup
├── styles.css              Landing page and shared visual system
├── app.js                  Landing interactions, filters, and localization
├── locales.js              Ukrainian and Russian translation dictionary
├── faq.js                  Shared FAQ accordion behaviour
├── join.html               Membership page markup
├── join.css                Membership page styling
├── join.js                 Membership route and demo-form behaviour
├── business.html           Business partner page markup
├── business.css            Business partner page styling
├── business.js             Business partner demo-form and reveal behaviour
├── assets/                 Local photography, brand assets, flags, and icons
├── tests/                  Node.js regression tests
├── DESIGN_HANDOFF.md       Developer-facing design and UX specification
├── DESIGN_RULES.md         Concise record of approved design decisions
└── docs/plans/             Historical design and implementation plans
```

## Implementation notes

- The site uses semantic HTML, vanilla CSS, and dependency-free JavaScript.
- `Prata` is the display face and `Geist` is the body/UI face, loaded from Google Fonts.
- Landing-page copy is translated at runtime from the English HTML source. Language selection is stored in `localStorage` when available.
- Partner search runs entirely in the browser against the cards already present in the HTML.
- `faq.js` initializes every `[data-accordion]` component and is shared by both pages.
- The membership and business-partner forms are deliberately non-transmitting. They preview the experience but send no data and take no payment.

## Handoff documentation

Start with [DESIGN_HANDOFF.md](DESIGN_HANDOFF.md) for foundations, component behaviour, breakpoints, accessibility expectations, asset provenance, known limitations, and recommended production priorities.

[DESIGN_RULES.md](DESIGN_RULES.md) records the approved design decisions that should remain stable unless the product owner explicitly changes them.

## Before production

The implementation team should confirm real partner identities, offers, member counts, pricing, legal copy, privacy requirements, authentication flows, membership lifecycle, payment terms, and final content ownership before launch.
