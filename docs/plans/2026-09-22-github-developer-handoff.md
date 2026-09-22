# GitHub Developer Handoff Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publish the complete Kylyvnyk Club static prototype to the existing GitHub repository with enough technical and design documentation for a developer to continue work immediately.

**Architecture:** Keep the existing static HTML, CSS, and JavaScript architecture unchanged. Add repository-level onboarding and design handoff documents derived from the implementation, commit the complete project without rewriting history, then push the verified result to `main`.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, Node.js built-in test runner, Python static file server, Git, GitHub CLI.

---

### Task 1: Add repository hygiene

**Files:**
- Create: `.gitignore`

**Step 1: Add ignore rules**

Ignore macOS metadata, editor settings, dependency folders, coverage, logs, environment files, and temporary browser artifacts without excluding any source assets.

**Step 2: Review ignored files**

Run: `git status --short --ignored`

Expected: source files remain untracked and only local or generated artifacts are ignored.

### Task 2: Add developer onboarding

**Files:**
- Modify: `README.md`

**Step 1: Document the project**

Include the two page entry points, quick start commands, direct-file compatibility, test command, repository map, localization overview, implementation status, and links to the design documents.

**Step 2: Validate every documented command and path**

Run: `npm test`

Expected: all tests pass with no failures.

### Task 3: Add the design handoff

**Files:**
- Create: `DESIGN_HANDOFF.md`
- Reference: `DESIGN_RULES.md`
- Reference: `styles.css`
- Reference: `join.css`

**Step 1: Document foundations**

Record the approved visual direction, typography, colour tokens, sizing principles, button hierarchy, spacing, borders, photography treatment, and motion.

**Step 2: Document components and responsive behaviour**

Cover the header, language control, hero, cards, directory, shared FAQ, membership flow, forms, footer, and the breakpoints at 1050 px, 760 px, 420 px, and 390 px.

**Step 3: Document implementation boundaries**

Clearly identify illustrative data, non-production authentication and payments, demonstration-only membership submission, content that still requires confirmation, accessibility expectations, and recommended next steps.

### Task 4: Commit the complete prototype

**Files:**
- Add: all source files, assets, tests, and historical plan documents

**Step 1: Review the full repository contents**

Run: `git status --short`

Expected: no temporary screenshots, browser profiles, secrets, or unrelated files are included.

**Step 2: Commit the runnable project**

Run: `git add .gitignore DESIGN_RULES.md app.js assets docs faq.js index.html join.css join.html join.js locales.js package.json styles.css tests`

Run: `git commit -m "feat: add Kylyvnyk landing prototype"`

**Step 3: Commit the handoff documentation**

Run: `git add README.md DESIGN_HANDOFF.md`

Run: `git commit -m "docs: add developer handoff guide"`

### Task 5: Verify and publish

**Files:**
- Verify: `index.html`
- Verify: `join.html`
- Verify: `app.js`
- Verify: `locales.js`
- Verify: `faq.js`
- Verify: `join.js`

**Step 1: Run the complete test suite**

Run: `npm test`

Expected: all tests pass, with zero failures.

**Step 2: Check shipped JavaScript syntax**

Run: `node --check app.js && node --check locales.js && node --check faq.js && node --check join.js`

Expected: exit code 0 and no syntax errors.

**Step 3: Verify local asset references**

Check every local `src` and `href` referenced by `index.html` and `join.html` exists in the repository.

Expected: no missing assets.

**Step 4: Confirm direct-file navigation**

Open `join.html`, select “Back to home,” and confirm that `index.html` renders visible content with its scripts initialized.

**Step 5: Inspect the final staged and committed tree**

Run: `git status --short --branch`

Expected: clean `main` branch ahead of `origin/main` only by the intended commits.

**Step 6: Push without rewriting history**

Run: `git push origin main`

Expected: `main` updates successfully with a fast-forward push.

**Step 7: Verify the remote**

Run: `gh repo view artprok777/Kylyvnyk-Landing --json url,defaultBranchRef`

Run: `gh api repos/artprok777/Kylyvnyk-Landing/commits/main --jq '.sha + " " + .commit.message'`

Expected: the repository URL is correct and the latest remote commit is the developer handoff documentation commit.
