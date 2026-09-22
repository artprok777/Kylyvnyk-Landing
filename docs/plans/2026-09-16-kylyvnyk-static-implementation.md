# Kylyvnyk Static Landing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a polished, responsive local clone of the Kylyvnyk Club landing page in vanilla HTML, CSS, and JavaScript.

**Architecture:** A single semantic `index.html` page is styled by one responsive stylesheet and enhanced by a small ES module. Partner data lives in markup while pure exported helpers provide deterministic client-side filtering; browser-only initialization is guarded so those helpers can be tested with Node.

**Tech Stack:** HTML5, modern CSS, vanilla JavaScript ES modules, Node.js built-in test runner, Python static HTTP server for browser verification.

---

### Task 1: Establish the page shell and visual system

**Files:**
- Create: `index.html`
- Create: `styles.css`

**Steps:**
1. Write semantic markup for every approved section and accessible navigation landmarks.
2. Define color, type, spacing, border, radius, and motion tokens in `:root`.
3. Build the desktop compositions and decorative globe/network artwork with CSS and inline SVG.
4. Add tablet and mobile breakpoints, including the fixed mobile navigation.
5. Run `python3 -m http.server 4173` and confirm the document loads without missing local assets.

### Task 2: Add testable partner filtering

**Files:**
- Create: `tests/app.test.mjs`
- Create: `app.js`

**Steps:**
1. Write failing tests for text normalization, multi-field matching, and resetting empty filters.
2. Run `node --test tests/app.test.mjs` and verify failure because helpers do not exist.
3. Implement the smallest exported pure helpers in `app.js`.
4. Run the tests and verify they pass.
5. Wire the helpers to partner cards and the empty-state message in the browser.

### Task 3: Add interface interactions

**Files:**
- Modify: `app.js`
- Modify: `index.html`
- Modify: `styles.css`

**Steps:**
1. Add tests for FAQ state and theme-label behaviour, then verify expected failures.
2. Implement the FAQ accordion, mobile menu, theme toggle, header state, and scroll-reveal observer.
3. Re-run `node --test tests/app.test.mjs` and confirm all tests pass.
4. Confirm keyboard focus styles and `prefers-reduced-motion` behaviour.

### Task 4: Verify the finished page

**Files:**
- Verify: `index.html`
- Verify: `styles.css`
- Verify: `app.js`

**Steps:**
1. Run the full Node test suite.
2. Run lightweight HTML/JS static checks.
3. Serve the project locally and inspect desktop and mobile layouts in Chrome.
4. Exercise navigation, FAQ, search, select filters, theme toggle, and mobile menu.
5. Review browser console output and fix any errors before handoff.
