import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

function count(pattern) {
  return [...html.matchAll(pattern)].length;
}

test("includes a dedicated three-card top partners section", () => {
  assert.match(html, /data-top-partners/);
  assert.equal(count(/class="[^"]*top-partner-card/g), 3);
});

test("places the three club figures inside the hero", () => {
  const hero = html.split('<section class="hero"')[1].split("</section>")[0];
  assert.equal([...hero.matchAll(/class="hero-stat"/g)].length, 3);
  assert.doesNotMatch(html, /data-country-badge|class="impact section"/);
});

test("includes a city filter in the partner search controls", () => {
  assert.match(html, /data-city-filter/);
});

test("places four policy labels in the footer without placeholder links", () => {
  const footer = html.split('<footer class="site-footer">')[1];
  assert.equal([...footer.matchAll(/class="shell footer-legal"[\s\S]*?<\/div>/g)].length, 1);
  assert.match(footer, /Privacy Policy/);
  assert.match(footer, /Terms &amp; Conditions/);
  assert.match(footer, /Cookie Policy/);
  assert.match(footer, /Disclaimer/);
  assert.doesNotMatch(footer, /class="legal-card"/);
});

test("membership cards are complete links and country tabs are removed", () => {
  assert.equal(count(/<a class="plan-card/g), 3);
  assert.doesNotMatch(html, /data-quick-country/);
  assert.match(html, /data-country-filter/);
});

test("featured partner cards use photos and keep country flags in their copy", () => {
  const featured = html.split('<div class="top-partner-grid">')[1].split('class="top-partners-all"')[0];
  assert.equal([...featured.matchAll(/class="top-partner-image"><img/g)].length, 3);
  assert.equal([...featured.matchAll(/class="top-partner-location"><span class="country-flag/g)].length, 3);
  assert.doesNotMatch(featured, /class="top-flag"/);
});
