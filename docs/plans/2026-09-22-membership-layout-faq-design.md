# Membership Layout and FAQ Refinement

## Approved direction

- Fill the unused sixth cell in the membership inclusion grid with the existing `assets/about-boardroom.png` photograph.
- Treat the image as an atmospheric editorial tile: full bleed, darkened, warm, and without extra copy.
- Give every inclusion card the same fixed vertical rhythm between its icon frame and copy instead of bottom-aligning variable-height copy.
- Remove the complete Prototype notice block from the application introduction.
- Reuse the homepage FAQ component contract on the membership page: `.faq`, `.faq-layout`, `.accordion`, `.faq-item`, and `.faq-panel`.
- Preserve the membership-specific questions and answers.
- Share the accordion behaviour through one small `faq.js` component loaded by both pages.

## Responsive behaviour

- Four-column desktop inclusion grid: the photo occupies the final one-column cell.
- Two-column tablet and one-column mobile layouts remain complete with no empty grid cells.
- The photo keeps the same minimum height as neighbouring cards and uses `object-fit: cover`.
- FAQ inherits the homepage breakpoints and card styling directly from `styles.css`.

## Verification

- Static tests assert that the photo tile exists, Prototype notice is absent, and join FAQ uses homepage component classes.
- Interaction checks cover single-open accordion behaviour and ARIA state changes.
- Browser review covers desktop and 390 px mobile layouts, icon/copy spacing, photo crop, console output, and horizontal overflow.
