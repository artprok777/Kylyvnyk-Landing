# GitHub developer handoff design

## Goal

Move the complete Kylyvnyk Club static prototype into the existing public GitHub repository so a developer can clone it, understand the design intent, run it locally, and continue implementation without reconstructing earlier decisions.

## Approved delivery approach

Use the existing `main` branch and preserve its initial commit. Add the complete project in a small number of clear commits instead of force-pushing or replacing repository history. The finished repository should be immediately useful as both a runnable prototype and a design handoff.

## Repository contents

- The complete static site: landing page, membership page, shared scripts, styles, tests, and local assets.
- A root `README.md` that leads with setup, available commands, page entry points, project structure, and current implementation status.
- `DESIGN_HANDOFF.md` as the primary developer-facing design reference.
- `DESIGN_RULES.md` retained as the concise record of already approved visual and content decisions.
- Existing design and implementation notes retained in `docs/plans/` as historical context.
- A minimal `.gitignore` for local operating-system, editor, dependency, coverage, and temporary files.

## Documentation structure

### README

The README should answer the first questions a new developer will have:

1. What is this repository?
2. How do I view it locally?
3. Which files are the main entry points?
4. How do I run the tests?
5. What is production-ready and what remains illustrative?

### Design handoff

The design handoff should document:

- The refined, editorial, dark luxury direction.
- Typography, colour, spacing, border, and motion foundations derived from the CSS.
- Shared components and their states, including header, language selector, buttons, cards, partner directory, FAQ, membership form preview, and footer.
- Desktop, tablet, and mobile behaviour.
- Localization architecture and content rules.
- Asset provenance and replacement guidance.
- Accessibility expectations.
- Known prototype limitations and the recommended production implementation order.

## Safety and repository history

- Do not force-push or rewrite the existing initial commit.
- Do not commit generated screenshots, operating-system metadata, dependency folders, or temporary browser artifacts.
- Do not claim that prototype form submission, authentication, payments, or partner data are production integrations.
- Keep the current repository public, as configured by its owner.

## Verification

Before pushing the finished handoff:

- Run the complete automated test suite.
- Check JavaScript syntax for every shipped script.
- Verify that all local asset references resolve.
- Open both pages through the local server.
- Verify the direct local-file navigation from the membership page back to the landing page.
- Review the final staged file list and confirm that no unrelated or temporary files are included.

## Delivery

Push the completed handoff directly to `main`, then verify the remote branch and provide the repository link and latest commit to the user.
