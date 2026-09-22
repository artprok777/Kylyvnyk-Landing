# Kylyvnyk Membership Join Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a polished English-only membership information and demonstration application page, then route the main-site member CTAs to it.

**Architecture:** Add a standalone semantic HTML page with a page-specific stylesheet layered on the existing design tokens and a small isolated ES module for route selection, validation, prototype submission, and FAQ behaviour. Keep all data client-side and preserve the existing landing-page scripts.

**Tech Stack:** HTML5, CSS, vanilla JavaScript ES modules, Node built-in test runner.

---

### Task 1: Lock the page contract with tests

**Files:**
- Create: `tests/join-page.test.mjs`

1. Write tests that require `join.html`, `join.css`, and `join.js`.
2. Assert the page contains the $4.99 monthly price, four supplied benefit themes, two registration routes, onboarding, preparation, FAQ, and the application form.
3. Assert the form has no remote action and no payment-card inputs.
4. Assert main-site membership CTAs point to `join.html`.
5. Run `node --test tests/join-page.test.mjs` and confirm it fails because the page does not exist.

### Task 2: Implement semantic membership content

**Files:**
- Create: `join.html`
- Modify: `index.html`

1. Build the approved English page structure with semantic landmarks and accessible labels.
2. Add the benefit, route, onboarding, practical guidance, FAQ, support, and form copy.
3. Route member-oriented calls to action from the homepage to `join.html`; keep the Business plan external because it is not a member application.
4. Run the structural test and resolve only markup-related failures.

### Task 3: Implement the visual system and responsive layout

**Files:**
- Create: `join.css`

1. Reuse existing colors, fonts, logo assets, card vocabulary, and background imagery.
2. Create a focused header, editorial hero, four-benefit rail, route cards, feature grid, steps, practical guidance, application panel, FAQ, and footer.
3. Add focus, hover, invalid, selected, confirmation, reduced-motion, tablet, and mobile states.
4. Verify no horizontal overflow at 390px, 768px, and desktop widths.

### Task 4: Add local-only form behaviour

**Files:**
- Create: `join.js`
- Test: `tests/join-page.test.mjs`

1. Test and export pure helpers for route rules and completion messaging.
2. Watch the helper tests fail before implementation.
3. Implement route switching so referral code becomes required for partner invitations.
4. Implement native validation and a local success state that explicitly says no payment was taken and that this prototype did not send data.
5. Add accessible FAQ toggling and return-to-form behaviour.
6. Run the focused tests, then `npm test`.

### Task 5: Browser verification

**Files:**
- Verify: `join.html`

1. Open `http://127.0.0.1:4173/join.html`.
2. Inspect desktop hierarchy and header.
3. Exercise both membership routes, required-field validation, and successful local submission.
4. Inspect the mobile layout at 390×844 and reset the viewport afterward.
5. Check browser console warnings/errors.
6. Run a fresh final `npm test` before reporting completion.

