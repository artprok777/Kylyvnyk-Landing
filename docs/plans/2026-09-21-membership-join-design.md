# Kylyvnyk Membership Join Page — Design

## Goal

Create a standalone English membership page that helps a prospective member understand the value of Kylyvnyk Club, compare the two registration routes, and complete a safe demonstration application without sending data or processing payment.

## Direction

The page extends the existing refined black-and-gold visual language. It should feel like a private-club welcome desk rather than a generic checkout: restrained editorial typography, subtle orbital geometry, warm gold rules, a digital membership card, and compact factual sections.

## Information architecture

1. A focused header with a route back to the main site.
2. Hero with the $4.99 monthly price, four core benefits, and a primary application CTA.
3. “Choose your way in” comparison:
   - Direct membership at $4.99 per month.
   - Complimentary registration through a participating business partner and a valid referral code.
4. Detailed membership inclusions: partner offers, verified directory, digital card, international connections, events and learning.
5. Four-step onboarding flow.
6. Practical “Before you join” guidance covering required information, activation, billing clarity, changing partner benefits, cancellation, and support.
7. A compact English application form with membership route, identity, location, professional context, interests, optional referral code, and consent.
8. FAQ and final support CTA.

## Content boundaries

- Use only the price and membership routes shown in the supplied reference.
- Do not claim guaranteed savings, guaranteed introductions, approval times, or a refund policy.
- Present partner benefits as subject to availability and partner terms.
- Treat the phone number and social handles in the image as unverified; do not publish them until confirmed by the user.
- The prototype form stays local, does not transmit data, and does not collect payment details.

## Interaction

Selecting “Direct membership” or “Partner invitation” updates the form state. The referral-code field is required only for the partner route. Submission validates required fields and replaces the form with a clear prototype confirmation explaining that no application or payment was sent. FAQ items use an accessible accordion.

## Responsive behaviour

Desktop uses an editorial two-column hero and a sticky application panel. Tablet reduces the page to one column while preserving the comparison cards. Mobile uses stacked cards, full-width CTAs, readable 16px form controls, and no fixed bottom action that could obscure fields.

## Validation

Node tests verify the required sections, price, two routes, local form behaviour, dynamic referral requirement, CTA rewiring, and absence of external submission. Browser checks cover desktop and mobile layouts, form validation, confirmation state, focus visibility, and console errors.

