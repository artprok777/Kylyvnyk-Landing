# Business Partner Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and publish an English Business Partner landing page that reuses the Kylyvnyk design system, explains the current advertised `$19.99/month` plan responsibly, and provides a non-transmitting application preview.

**Architecture:** Add a standalone `business.html` page that loads shared `styles.css`, `app.js`, and `faq.js`, plus page-specific `business.css` and `business.js`. Reuse the existing header, button, FAQ, reveal, and footer patterns; keep all partner-application behaviour local and non-transmitting.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, Node.js built-in test runner, shared Kylyvnyk static-site components.

---

### Task 1: Define Business page regressions

**Files:**
- Create: `tests/business-page.test.mjs`

**Step 1: Write failing structure and content tests**

Assert that `business.html`, `business.css`, and `business.js` exist and that the page contains:

- `$19.99/month`
- Current advertised partner plan
- The six approved benefit headings
- What the plan includes
- Four onboarding steps
- Partner requirements and offer guidance
- A Business Partner FAQ

**Step 2: Write failing safety tests**

Assert that:

- The application is a `role="form"` container rather than a transmitting `<form>`.
- The preview control uses `type="button"`.
- The page does not collect passwords, identity documents, or payment-card fields.
- The confirmation states that no data was sent and no payment was taken.
- Guaranteed clients, guaranteed income, and the 10,000-client claim are absent.

**Step 3: Write failing component-reuse and routing tests**

Assert that:

- `business.html` loads `styles.css`, `business.css`, `faq.js`, `app.js`, and `business.js`.
- The FAQ uses `.faq`, `.faq-layout`, `.accordion`, `.faq-item`, and `.faq-panel`.
- The Business membership card in `index.html` points to `business.html`.
- Existing Member links still point to `join.html`.

**Step 4: Run the tests to verify RED**

Run: `node --test tests/business-page.test.mjs`

Expected: FAIL because the Business page files do not yet exist.

### Task 2: Build the semantic Business page

**Files:**
- Create: `business.html`
- Modify: `index.html`
- Test: `tests/business-page.test.mjs`

**Step 1: Add the shared document shell**

Use the existing brand assets, skip link, compact subpage header, and footer. Link navigation back to relevant `index.html` sections.

**Step 2: Add the approved content sections**

Implement hero, value strip, six-benefit grid, plan inclusions, offer guidance/partner fit, four-step onboarding, application preview, shared FAQ, and final CTA.

**Step 3: Add the non-transmitting application markup**

Use a `div` with `role="form"`, labelled native controls, visible required guidance, a `type="button"` preview action, and a hidden confirmation panel.

**Step 4: Update the Business membership route**

Change only the Business card in `index.html` from the external registration URL to `business.html`.

**Step 5: Run structure tests**

Run: `node --test tests/business-page.test.mjs`

Expected: markup/content tests pass; styling and interaction-specific tests may remain pending until later tasks.

### Task 3: Apply the existing design system

**Files:**
- Create: `business.css`
- Reference: `styles.css`
- Test: `tests/business-page.test.mjs`

**Step 1: Compose shared foundations**

Use root tokens, shell widths, typography, button tiers, line colours, panel colours, and motion conventions already defined in `styles.css`.

**Step 2: Style page-specific layouts**

Add only `.business-*` rules for the hero composition, pricing treatment, value rail, benefit grid, inclusions, offer guidance, application grid, and confirmation panel.

**Step 3: Add responsive states**

Use the existing 1050, 760, and 420 px breakpoints. Ensure 390 px layouts have no horizontal overflow.

**Step 4: Add progressive reveal support**

Content is visible by default; only hide `.business-reveal` after JavaScript adds a page-ready class. Respect reduced motion.

**Step 5: Run the Business page tests**

Run: `node --test tests/business-page.test.mjs`

Expected: all static Business page tests pass.

### Task 4: Implement the local application preview

**Files:**
- Create: `business.js`
- Test: `tests/business-page.test.mjs`

**Step 1: Add pure helper tests**

Test `getBusinessConfirmationCopy(companyName)` and any small validation helper through `globalThis.KylyvnykBusiness`.

**Step 2: Run the helper tests to verify RED**

Run: `node --test --test-name-pattern="business confirmation" tests/business-page.test.mjs`

Expected: FAIL because the global helper does not exist.

**Step 3: Implement the helpers and form preview**

- Validate visible required controls with native constraint validation.
- Show the confirmation panel only after required controls are valid.
- Confirm that nothing was sent and no payment was taken.
- Provide Start over to reset fields and restore the application.
- Move focus to the confirmation, then back to the first field after reset.
- Add the page-ready class and observe `.business-reveal` elements, while keeping content visible on script failure.

**Step 4: Run the focused and full Business tests**

Run: `node --test tests/business-page.test.mjs`

Expected: all Business page tests pass.

### Task 5: Update developer documentation

**Files:**
- Modify: `README.md`
- Modify: `DESIGN_HANDOFF.md`

**Step 1: Add the page to onboarding documentation**

Document `business.html`, `business.css`, `business.js`, English-only status, and the non-transmitting partner application.

**Step 2: Add the Business Partner component and content rules**

Reference the approved design plan and competitor research, and retain the current product-claim safeguards.

**Step 3: Verify documented paths**

Run: `rg -n "business\.html|business\.css|business\.js" README.md DESIGN_HANDOFF.md`

Expected: all three files are documented.

### Task 6: Verify the completed page

**Files:**
- Verify: `business.html`
- Verify: `business.css`
- Verify: `business.js`
- Verify: `index.html`

**Step 1: Run the complete automated test suite**

Run: `npm test`

Expected: zero failures.

**Step 2: Check JavaScript syntax**

Run: `node --check app.js && node --check locales.js && node --check faq.js && node --check join.js && node --check business.js`

Expected: exit code 0.

**Step 3: Validate local assets**

Check every local `src` and `href` used by all three HTML pages.

Expected: no missing files.

**Step 4: Verify in the browser**

- Open `business.html` through the local server.
- Review desktop hero, pricing, benefits, form, FAQ, and footer.
- Verify application validation, confirmation, Start over, and accordion behaviour.
- Verify 390 × 844 responsive layout with no horizontal overflow.
- Check browser console for errors and warnings.
- Verify direct `file://` opening keeps content visible.

**Step 5: Commit the implementation**

Run: `git add business.html business.css business.js index.html README.md DESIGN_HANDOFF.md tests/business-page.test.mjs docs/plans/2026-09-22-business-partner-page.md`

Run: `git commit -m "feat: add business partner page"`

### Task 7: Publish the verified result

**Files:**
- Verify repository state only

**Step 1: Confirm a clean fast-forward state**

Run: `git fetch origin main && git merge-base --is-ancestor origin/main HEAD`

Expected: exit code 0.

**Step 2: Push main**

Run: `git push origin main`

Expected: `main` updates without rewriting history.

**Step 3: Verify the remote commit and required files**

Use `gh` to confirm the latest `main` commit and the presence of `business.html`, `business.css`, `business.js`, and the new test file.
