# Kylyvnyk Static Landing — Design

## Goal

Create a responsive local HTML/CSS/JavaScript interpretation of the current Kylyvnyk Club homepage. Preserve its information architecture and premium black-and-gold identity while using the customer's mobile reference to make smaller screens denser, more practical, and card-driven.

## Visual direction

The page uses a refined luxury aesthetic: near-black surfaces, warm antique gold, hairline borders, editorial serif display type, compact uppercase labels, and a subtle constellation-map background. The memorable visual is a centered globe-clock crest floating above a typographic hero, with gold network points spreading into the page.

## Page structure

1. Sticky desktop header and collapsible mobile menu.
2. Hero with brand crest, positioning statement, benefits, and primary action.
3. Club statistics and country flags.
4. Membership card and three pricing/action cards.
5. Four-step “How it works” sequence.
6. Partner finder with keyword and select filters.
7. Recommended partner cards with category, location, and member benefit.
8. About/mission editorial section.
9. Accessible FAQ accordion.
10. Legal footer and a mobile bottom navigation bar.

## Behaviour

Vanilla JavaScript handles the mobile menu, FAQ accordion, theme switch, and local partner filtering. Filtering is demonstrative and works entirely in the browser. Empty results receive a clear recovery message. Motion respects `prefers-reduced-motion`.

## Responsive model

Desktop uses wide editorial spacing and asymmetrical grids. Tablet reduces columns. Mobile becomes a compact dashboard inspired by the supplied reference: stacked cards, horizontal flag scroller, dense partner list, and fixed bottom navigation.

## Validation

Pure filtering logic is covered with Node's built-in test runner. Markup and scripts receive static checks. The page is visually inspected in Chrome at desktop and mobile dimensions, including interaction checks and console-error review.
