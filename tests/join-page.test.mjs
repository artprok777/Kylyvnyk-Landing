import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);

test("join page files exist", () => {
  assert.equal(existsSync(new URL("join.html", root)), true);
  assert.equal(existsSync(new URL("join.css", root)), true);
  assert.equal(existsSync(new URL("join.js", root)), true);
});

test("join page explains the price, benefits, routes and process", () => {
  const html = readFileSync(new URL("join.html", root), "utf8");
  assert.match(html, /\$4\.99/);
  assert.match(html, /Partner savings/i);
  assert.match(html, /Business connections/i);
  assert.match(html, /International community/i);
  assert.match(html, /Events and insight/i);
  assert.match(html, /Direct membership/i);
  assert.match(html, /Partner invitation/i);
  assert.match(html, /How membership works/i);
  assert.match(html, /Before you join/i);
  assert.match(html, /Frequently asked questions/i);
  assert.match(html, /data-membership-form/);
});

test("prototype form cannot transmit data or collect payment details", () => {
  const html = readFileSync(new URL("join.html", root), "utf8");
  assert.doesNotMatch(html, /<form[^>]*data-membership-form/i);
  assert.match(html, /data-membership-form[^>]*role="form"/i);
  assert.match(html, /type="button"[^>]*data-preview-request/i);
  assert.doesNotMatch(html, /type=["'](?:password|tel)["']|card number|cvv|cvc|expiry/i);
  assert.match(html, /no payment|not sent/i);
});

test("member plan card on the landing page points to the local join page", () => {
  const html = readFileSync(new URL("index.html", root), "utf8");
  assert.doesNotMatch(html, /href="https:\/\/www\.kylyvnyk\.club\/en\/register"[^>]*>(?:Join the Club|Join as a Member)/);
  assert.match(html, /href="join\.html" aria-label="Join as a Member"/);
});

test("membership page uses the shared global header", () => {
  const html = readFileSync(new URL("join.html", root), "utf8");
  assert.match(html, /class="site-header"[^>]*data-header/);
  assert.match(html, /href="index\.html">The Club<\/a>/);
  assert.match(html, /href="join\.html" aria-current="page">Membership<\/a>/);
  assert.match(html, /href="business\.html">Partnership<\/a>/);
  assert.match(html, /data-mobile-menu/);
  assert.doesNotMatch(html, /class="join-header"/);
});

test("route helper requires a referral only for partner invitations", async () => {
  await import("../join.js");
  const { getRouteRequirements } = globalThis.KylyvnykJoin;
  assert.deepEqual(getRouteRequirements("direct"), { referralRequired: false });
  assert.deepEqual(getRouteRequirements("partner"), { referralRequired: true });
});

test("prototype confirmation is explicit about data and payment", async () => {
  await import("../join.js");
  const { getConfirmationCopy } = globalThis.KylyvnykJoin;
  const copy = getConfirmationCopy("Alex");
  assert.match(copy, /Alex/);
  assert.match(copy, /not been sent/i);
  assert.match(copy, /no payment/i);
  assert.match(getConfirmationCopy("Олена", "uk"), /Олена.*не надіслан/i);
  assert.match(getConfirmationCopy("Анна", "ru"), /Анна.*не отправлен/i);
});

test("membership CTAs preselect the route they describe", () => {
  const html = readFileSync(new URL("join.html", root), "utf8");
  assert.match(html, /data-select-route="direct"/);
  assert.match(html, /data-select-route="partner"/);
});

test("unverified eligibility and verification claims are avoided", () => {
  const html = readFileSync(new URL("join.html", root), "utf8");
  assert.doesNotMatch(html, /open to everyone|Verified directory/i);
  assert.match(html, /when available/i);
});

test("direct file opening keeps content visible and uses a classic local script", () => {
  const html = readFileSync(new URL("join.html", root), "utf8");
  const css = readFileSync(new URL("join.css", root), "utf8");
  assert.doesNotMatch(html, /<script[^>]+type="module"[^>]+src="join\.js/i);
  assert.match(html, /<script[^>]+src="join\.js[^>]+defer/i);
  assert.match(css, /\.join-reveal\s*\{[^}]*opacity:\s*1/i);
  assert.match(css, /\.join-js\s+\.join-reveal\s*\{[^}]*opacity:\s*0/i);
});

test("membership page omits decorative mini headings", () => {
  const html = readFileSync(new URL("join.html", root), "utf8");
  assert.doesNotMatch(html, /join-kicker|join-route-index|join-route-label/);
});

test("practical network icons are recolored from black to gold", () => {
  const css = readFileSync(new URL("join.css", root), "utf8");
  const iconRule = css.match(/\.join-icon-frame img\s*\{([^}]*)\}/i)?.[1] ?? "";
  assert.match(iconRule, /filter:[^;]*brightness\(0\)[^;]*invert\(/i);
});

test("inclusion grid fills its sixth cell with an editorial photograph", () => {
  const html = readFileSync(new URL("join.html", root), "utf8");
  assert.match(html, /class="join-inclusion-photo join-reveal"/);
  assert.match(html, /src="assets\/about-boardroom\.png"/);
  assert.match(html, /loading="lazy"/);
});

test("inclusion cards use one consistent icon-to-copy gap", () => {
  const css = readFileSync(new URL("join.css", root), "utf8");
  const cardRule = css.match(/\.join-inclusion-card\s*\{([^}]*)\}/i)?.[1] ?? "";
  assert.match(cardRule, /justify-content:\s*flex-start/i);
  assert.match(css, /\.join-inclusion-card\s*>\s*div:last-child\s*\{[^}]*margin-top:/i);
});

test("prototype notice is removed from the application introduction", () => {
  const html = readFileSync(new URL("join.html", root), "utf8");
  const css = readFileSync(new URL("join.css", root), "utf8");
  assert.doesNotMatch(html, /Prototype notice|join-privacy-note/i);
  assert.doesNotMatch(css, /join-privacy-note/i);
});

test("membership FAQ reuses the homepage accordion component", () => {
  const home = readFileSync(new URL("index.html", root), "utf8");
  const join = readFileSync(new URL("join.html", root), "utf8");
  assert.equal(existsSync(new URL("faq.js", root)), true);
  assert.match(home, /<script src="faq\.js" defer><\/script>/);
  assert.match(join, /<script src="faq\.js" defer><\/script>/);
  assert.match(join, /class="faq section join-faq"/);
  assert.match(join, /class="shell faq-layout"/);
  assert.match(join, /class="accordion join-reveal" data-accordion/);
  assert.match(join, /class="faq-item is-open"/);
  assert.match(join, /class="faq-panel"/);
  assert.doesNotMatch(join, /join-faq-grid|join-faq-list|join-faq-item|join-faq-panel|data-join-faq/);
});

test("mobile shells use valid CSS math and stay inside the viewport", () => {
  const styles = readFileSync(new URL("styles.css", root), "utf8");
  const joinStyles = readFileSync(new URL("join.css", root), "utf8");
  assert.match(styles, /--shell:\s*min\(calc\(100% - 30px\),\s*620px\)/i);
  assert.match(joinStyles, /--join-shell:\s*min\(calc\(100% - 30px\),\s*620px\)/i);
  assert.doesNotMatch(styles, /min\(100% - 30px,/i);
  assert.doesNotMatch(joinStyles, /min\(100% - 30px,/i);
});
