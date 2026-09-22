import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);

test("business partner page files exist", () => {
  assert.equal(existsSync(new URL("business.html", root)), true);
  assert.equal(existsSync(new URL("business.css", root)), true);
  assert.equal(existsSync(new URL("business.js", root)), true);
});

test("business page explains the plan, value and application process", () => {
  const html = readFileSync(new URL("business.html", root), "utf8");
  assert.match(html, /\$19\.99/);
  assert.match(html, /Reach relevant members/i);
  assert.match(html, /Build international relationships/i);
  assert.match(html, /Strengthen your brand presence/i);
  assert.match(html, /Create a member advantage/i);
  assert.match(html, /Invite eligible customers/i);
  assert.match(html, /Explore referral opportunities/i);
  assert.match(html, /What the plan includes/i);
  assert.match(html, /Is your business a good fit/i);
  assert.match(html, /How partnership works/i);
  assert.match(html, /Frequently asked questions/i);
  assert.match(html, /data-business-form/);
});

test("business application is a non-transmitting preview", () => {
  const html = readFileSync(new URL("business.html", root), "utf8");
  assert.doesNotMatch(html, /<form[^>]*data-business-form/i);
  assert.match(html, /data-business-form[^>]*role="form"/i);
  assert.match(html, /type="button"[^>]*data-preview-application/i);
  assert.doesNotMatch(html, /type=["'](?:password|tel)["']|card number|cvv|cvc/i);
  assert.match(html, /not sent|no information is sent/i);
  assert.match(html, /no payment/i);
});

test("application collects useful business details without payment data", () => {
  const html = readFileSync(new URL("business.html", root), "utf8");
  for (const field of ["companyName", "website", "country", "city", "serviceArea", "category", "contactName", "businessEmail", "description", "memberOffer", "preferredContact"]) {
    assert.match(html, new RegExp(`name=["']${field}["']`));
  }
  assert.match(html, /name="consent"/);
});

test("business plan link is local while member route stays unchanged", () => {
  const html = readFileSync(new URL("index.html", root), "utf8");
  assert.match(html, /class="plan-card plan-business" href="business\.html"/);
  assert.match(html, /class="plan-card" href="join\.html" aria-label="Join as a Member"/);
});

test("business page reuses shared components and classic scripts", () => {
  const html = readFileSync(new URL("business.html", root), "utf8");
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /class="reference-heading/);
  assert.match(html, /class="faq section business-faq"/);
  assert.match(html, /class="shell faq-layout"/);
  assert.match(html, /class="accordion business-reveal" data-accordion/);
  assert.match(html, /<script src="app\.js" defer><\/script>/);
  assert.match(html, /<script src="faq\.js" defer><\/script>/);
  assert.match(html, /<script src="business\.js" defer><\/script>/);
  assert.doesNotMatch(html, /<script[^>]+type="module"/i);
});

test("business copy avoids unverified outcome and status claims", () => {
  const html = readFileSync(new URL("business.html", root), "utf8");
  assert.doesNotMatch(html, /guaranteed (?:clients|income|leads|revenue)|registered in usa|free (?:for|up to) 10,?000|automatic referral rewards|verified partner|exclusive partner|priority placement/i);
  assert.match(html, /results are not guaranteed/i);
  assert.match(html, /when available/i);
});

test("direct file opening keeps business content visible", () => {
  const css = readFileSync(new URL("business.css", root), "utf8");
  assert.match(css, /\.business-reveal\s*\{[^}]*opacity:\s*1/i);
  assert.match(css, /\.business-js\s+\.business-reveal\s*\{[^}]*opacity:\s*0/i);
});

test("business confirmation helper is explicit about privacy and payment", async () => {
  await import("../business.js");
  const { getBusinessConfirmationCopy } = globalThis.KylyvnykBusiness;
  const copy = getBusinessConfirmationCopy("Northstar Studio");
  assert.match(copy, /Northstar Studio/);
  assert.match(copy, /not been sent/i);
  assert.match(copy, /no payment/i);
});

test("business FAQ uses the shared accessible accordion", () => {
  const html = readFileSync(new URL("business.html", root), "utf8");
  assert.match(html, /class="faq-item is-open"/);
  assert.match(html, /class="faq-panel"/);
  assert.match(html, /aria-expanded="true"/);
  assert.match(html, /What does the current partner plan include/i);
  assert.match(html, /Can I update or pause my offer/i);
  assert.match(html, /Are referrals or rewards guaranteed/i);
  assert.match(html, /How do billing and cancellation work/i);
});

test("business header inherits the shared navigation typography", () => {
  const html = readFileSync(new URL("business.html", root), "utf8");
  const css = readFileSync(new URL("business.css", root), "utf8");
  assert.match(html, /href="index\.html">The Club<\/a>/);
  assert.match(html, /href="join\.html">Membership<\/a>/);
  assert.match(html, /href="business\.html" aria-current="page">Partnership<\/a>/);
  assert.doesNotMatch(css, /\.business-header\s+\.desktop-nav/);
  assert.doesNotMatch(css, /\.business-header\s+\.header-inner/);
});

test("business typography follows the shared type scale", () => {
  const css = readFileSync(new URL("business.css", root), "utf8");
  assert.match(css, /\.business-hero-copy h1\s*\{[^}]*font-size:\s*clamp\(54px,\s*5\.8vw,\s*82px\)/i);
  assert.match(css, /\.business-heading h2,[\s\S]*?font-size:\s*clamp\(40px,\s*4\.5vw,\s*62px\)/i);
  assert.match(css, /\.business-benefit-card h3\s*\{[^}]*font-size:\s*27px/i);
  assert.match(css, /\.business-process-grid h3\s*\{[^}]*font-size:\s*20px/i);
  assert.match(css, /\.business-plan-price strong\s*\{[^}]*font-size:\s*31px/i);
});
