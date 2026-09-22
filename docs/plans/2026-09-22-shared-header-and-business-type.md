# Shared Header and Business Type Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make all three page headers share one global navigation model, scroll landing-page Join CTAs to the plan cards, and align business-page typography with the existing design system.

**Architecture:** Keep the site static and dependency-free. Reuse the existing `.site-header`, `.header-inner`, `.desktop-nav`, `.header-actions`, `.mobile-menu`, and shared typography rules; remove page-specific header typography overrides and constrain business selectors to the established size scale.

**Tech Stack:** Semantic HTML, CSS custom properties and media queries, vanilla JavaScript, Node.js test runner.

---

### Task 1: Add regression coverage

**Files:**
- Modify: `tests/reference-sections.test.mjs`
- Modify: `tests/join-page.test.mjs`
- Modify: `tests/business-page.test.mjs`

**Step 1: Write the failing tests**

Add assertions that:

```js
for (const page of [home, join, business]) {
  assert.match(page, />The Club<\/a>/);
  assert.match(page, />Membership<\/a>/);
  assert.match(page, />Partnership<\/a>/);
}

assert.match(home, /href="#plans"[^>]*>Join the Club<\/a>/);
assert.match(home, /id="plans"/);
assert.doesNotMatch(home, /href="join\.html"[^>]*>Join the Club<\/a>/);

assert.match(businessCss, /\.business-hero-copy h1\s*\{[^}]*font-size:\s*clamp\(54px,\s*5\.8vw,\s*82px\)/i);
assert.doesNotMatch(businessCss, /\.business-header \.desktop-nav/);
```

Also verify the active destination uses `aria-current="page"` on each page.

**Step 2: Run tests to verify they fail**

Run: `node --test tests/reference-sections.test.mjs tests/join-page.test.mjs tests/business-page.test.mjs`

Expected: FAIL because the headers and CTA targets still use the previous markup and business typography still has custom values.

**Step 3: Commit the failing tests**

```bash
git add tests/reference-sections.test.mjs tests/join-page.test.mjs tests/business-page.test.mjs
git commit -m "test: define shared header navigation"
```

### Task 2: Route landing Join CTAs to the plan cards

**Files:**
- Modify: `index.html:26-75`
- Modify: `index.html:137`
- Test: `tests/reference-sections.test.mjs`

**Step 1: Add the plans anchor**

Change the card-grid wrapper to:

```html
<div class="shell plan-grid reveal" id="plans">
```

**Step 2: Update every landing-page Join CTA**

Change the desktop header, mobile menu, and hero CTAs labelled `Join the Club` to:

```html
<a class="..." href="#plans">Join the Club</a>
```

Do not change the destinations of the Member, VIP, or Business cards.

**Step 3: Run the focused test**

Run: `node --test tests/reference-sections.test.mjs`

Expected: PASS for plan-anchor assertions; shared-header assertions may remain red until Task 3.

### Task 3: Unify the three headers

**Files:**
- Modify: `index.html:19-62`
- Modify: `join.html:18-33`
- Modify: `business.html:20-48`
- Modify: `join.css`
- Modify: `business.css:15-17`
- Test: `tests/reference-sections.test.mjs`
- Test: `tests/join-page.test.mjs`
- Test: `tests/business-page.test.mjs`

**Step 1: Use the global desktop navigation everywhere**

Use this three-link structure on each page, applying `aria-current="page"` to the current destination:

```html
<nav class="desktop-nav" aria-label="Primary navigation">
  <a href="index.html">The Club</a>
  <a href="join.html">Membership</a>
  <a href="business.html">Partnership</a>
</nav>
```

On the landing page, use `href="#top"` for The Club while preserving the label and active state.

**Step 2: Repeat global links in every mobile menu**

Use the same order and active state. Retain Sign In and the page-specific primary action after the global links.

**Step 3: Convert the membership header to shared markup**

Replace the bespoke `.join-header` structure with `.site-header`, `.header-inner`, centered `.brand`, `.desktop-nav`, `.header-actions`, and `.mobile-menu`. Keep the Membership Apply action connected to `#application` with `data-select-route="direct"`.

**Step 4: Remove page-specific header typography overrides**

Delete business rules that change shared header background, navigation gap, or letter spacing. Remove obsolete join-header layout rules or limit remaining join selectors to page content only.

**Step 5: Run focused tests**

Run: `node --test tests/reference-sections.test.mjs tests/join-page.test.mjs tests/business-page.test.mjs`

Expected: PASS.

**Step 6: Commit header and routing changes**

```bash
git add index.html join.html business.html join.css business.css tests
git commit -m "feat: unify page headers and join routing"
```

### Task 4: Normalize business typography

**Files:**
- Modify: `business.css`
- Test: `tests/business-page.test.mjs`

**Step 1: Map business typography to shared sizes**

Use the established scale:

```css
.business-hero-copy h1 { font-size: clamp(54px, 5.8vw, 82px); }
.business-heading h2,
.business-fit-copy h2,
.business-application-intro h2 { font-size: clamp(40px, 4.5vw, 62px); }
.business-included .reference-heading h2 { font-size: clamp(36px, 4vw, 52px); }
.business-hero-lede,
.business-heading-split > p,
.business-heading-centered > p:last-child,
.business-fit-copy > p:not(.business-overline),
.business-application-intro > p:not(.business-overline) { font-size: 18px; }
.business-benefit-card h3 { font-size: 27px; }
.business-included-list h3,
.business-process-grid h3 { font-size: 20px; }
.business-plan-price strong { font-size: 31px; }
```

Keep body copy, labels, controls, and disclosures at `14px`. Metadata and step numerals may remain smaller only when they are non-essential and adjacent to a readable label.

**Step 2: Align responsive values**

At `≤1050px`, keep the hero under `78px`. At `≤760px`, use the shared landing-page mobile hero scale and section scale. At `≤420px`, remove bespoke sizes that contradict the shared scale.

**Step 3: Run the focused test**

Run: `node --test tests/business-page.test.mjs`

Expected: PASS.

**Step 4: Commit typography changes**

```bash
git add business.css tests/business-page.test.mjs
git commit -m "fix: align business typography with design system"
```

### Task 5: Verify and integrate

**Files:**
- Verify: `index.html`
- Verify: `join.html`
- Verify: `business.html`
- Verify: `styles.css`
- Verify: `join.css`
- Verify: `business.css`

**Step 1: Run complete automated verification**

Run:

```bash
npm test
node --check app.js
node --check locales.js
node --check faq.js
node --check join.js
node --check business.js
git diff --check
```

Expected: all tests and syntax checks pass with no whitespace errors.

**Step 2: Verify in browser**

Check desktop and 390px mobile layouts for all three pages. Confirm:

- centered logo and no navigation overlap;
- identical global link typography and order;
- correct active destination;
- mobile menu operation;
- all landing Join CTAs scroll to the plan cards;
- business hero stays at or below `82px`;
- no horizontal overflow.

**Step 3: Merge and push**

After verification, fast-forward the approved changes into `main`, rerun the test suite there, and push `main` to `origin`.
