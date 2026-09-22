# Membership Layout and FAQ Refinement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the empty inclusion-grid cell, normalize icon-to-copy spacing, remove Prototype notice, and reuse the homepage FAQ component on the membership page.

**Architecture:** Keep the site static and framework-free. Reuse the homepage FAQ CSS contract from `styles.css`, move accordion initialization into a shared classic script for direct `file://` compatibility, and keep join-only layout refinements in `join.css`.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node test runner.

---

### Task 1: Add regression coverage

**Files:**
- Modify: `tests/join-page.test.mjs`

1. Add failing assertions for the boardroom photo tile, absence of Prototype notice, common FAQ classes, shared FAQ script, and normalized inclusion-card spacing.
2. Run `node --test tests/join-page.test.mjs` and confirm the new tests fail for the missing implementation.

### Task 2: Refine the inclusion grid and application introduction

**Files:**
- Modify: `join.html`
- Modify: `join.css`

1. Add a full-bleed photo tile using `assets/about-boardroom.png` with descriptive alt text and lazy loading.
2. Replace `justify-content: space-between` with a consistent icon-to-copy gap.
3. Remove the Prototype notice markup and unused styles.
4. Run the focused tests and confirm these assertions pass.

### Task 3: Share the FAQ component

**Files:**
- Create: `faq.js`
- Modify: `index.html`
- Modify: `join.html`
- Modify: `app.js`
- Modify: `join.js`
- Modify: `join.css`

1. Implement a fail-safe shared accordion initializer for every `[data-accordion]` component.
2. Load `faq.js` from both pages.
3. Convert membership FAQ markup to the homepage `.faq-item` and `.faq-panel` contract.
4. Remove join-only FAQ behaviour and duplicate FAQ CSS.
5. Run the focused tests and confirm they pass.

### Task 4: Verify the finished experience

**Files:**
- Test: `tests/*.test.mjs`

1. Run `npm test` and expect zero failures.
2. Run `node --check app.js`, `node --check join.js`, and `node --check faq.js`.
3. Verify local asset references.
4. Inspect desktop and 390 px mobile layouts in the browser, test accordion ARIA state, confirm no horizontal overflow, and confirm no console errors.
