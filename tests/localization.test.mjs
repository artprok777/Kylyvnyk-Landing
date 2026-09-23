import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";
await import("../locales.js");
await import("../app.js");

const app = globalThis.KylyvnykApp;
const { translations } = globalThis.KylyvnykLocales;

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const joinHtml = readFileSync(new URL("../join.html", import.meta.url), "utf8");
const businessHtml = readFileSync(new URL("../business.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const script = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const localeScript = readFileSync(new URL("../locales.js", import.meta.url), "utf8");
const subpageLocaleUrl = new URL("../subpage-locales.js", import.meta.url);
const subpageLocaleScript = existsSync(subpageLocaleUrl) ? readFileSync(subpageLocaleUrl, "utf8") : "";

test("desktop actions show sign in, join, then language in that order", () => {
  const actions = html.split('<div class="header-actions">')[1].split("</div>")[0];
  assert.ok(actions.indexOf("Sign In") < actions.indexOf("Join the Club"));
  assert.ok(actions.indexOf("Join the Club") < actions.indexOf("data-language-select"));
});

test("language choice uses native names and a chevron anchored to its control", () => {
  assert.match(html, /<option value="en"[^>]*>English<\/option>/);
  assert.match(html, /<option value="ru"[^>]*>Рус<\/option>/);
  assert.match(html, /<option value="uk"[^>]*>Українська<\/option>/);
  assert.match(css, /\.language-control::after\s*\{[^}]*border-right:[^}]*border-bottom:/s);
  assert.doesNotMatch(css, /\.language-control::after\s*\{[^}]*content:\s*"⌄"/s);
});

test("Ukrainian and Russian translations cover primary UI and retain English", () => {
  assert.equal(typeof app.getTranslation, "function");
  assert.equal(app.getTranslation("Sign In", "uk"), "Увійти");
  assert.equal(app.getTranslation("Sign In", "ru"), "Войти");
  assert.equal(app.getTranslation("Sign In", "en"), "Sign In");
  assert.equal(app.getTranslation("Find partners", "uk"), "Знайти партнерів");
  assert.equal(app.getTranslation("Find partners", "ru"), "Найти партнёров");
});

test("language selection stays on the local page", () => {
  assert.doesNotMatch(script, /window\.location\.assign\(`https:\/\/www\.kylyvnyk\.club/);
});

test("each localized page keeps its own translated document title", () => {
  assert.match(script, /originalDocumentTitle/);
  assert.match(script, /document\.title\s*=\s*getTranslation\(originalDocumentTitle,\s*locale\)/);
});

test("homepage scripts work when index.html is opened as a local file", () => {
  assert.doesNotMatch(html, /<script[^>]+type="module"[^>]+src="app\.js"/i);
  assert.match(
    html,
    /<script src="locales\.js" defer><\/script>\s*<script src="app\.js" defer><\/script>/i,
  );
});

test("classic locale and app scripts share a page without global name collisions", () => {
  const context = vm.createContext({});
  vm.runInContext(localeScript, context);
  vm.runInContext(script, context);
  assert.equal(typeof context.KylyvnykLocales, "object");
  assert.equal(typeof context.KylyvnykApp, "object");
});

test("all visible copy has Ukrainian and Russian translations", () => {
  const keepUntranslated = /^(?:English|Рус|Українська|\d+\+?|\$[\d.]+|−\d+%|✦|Kylyvnyk Club|Swiss Legal Group|Grand Auto Premium|Noir Webcraft|Aurum Dental Care|Northline Fitness|Atlas Journey|Maple Finance|Skyline Realty|Kyiv Business Bureau|hello@kylyvnyk\.club|© 2026 Kylyvnyk Club)$/;
  const text = [...new Set([...html.matchAll(/>([^<>]+)</g)]
    .map((match) => match[1].trim().replaceAll("&amp;", "&"))
    .filter(Boolean))];
  const missing = text.filter((value) => !keepUntranslated.test(value) && !translations[value]);
  assert.deepEqual(missing, []);
});

test("membership and partnership pages load localization and expose language controls", () => {
  for (const page of [joinHtml, businessHtml]) {
    assert.match(page, /<script src="locales\.js" defer><\/script>\s*<script src="subpage-locales\.js" defer><\/script>\s*<script src="app\.js" defer><\/script>/i);
    assert.equal((page.match(/data-language-select/g) || []).length, 2);
  }
});

test("membership and partnership visible copy has Ukrainian and Russian translations", () => {
  const context = vm.createContext({});
  vm.runInContext(localeScript, context);
  vm.runInContext(subpageLocaleScript, context);
  const pageTranslations = context.KylyvnykLocales.translations;
  const keepUntranslated = /^(?:English|Рус|Українська|\d+\+?|\d{2}|\$[\d.]+|•••• 0499|✓|←|→|↗|↓|Kylyvnyk Club|hello@kylyvnyk\.club|© 2026 Kylyvnyk Club|width=device-width, initial-scale=1\.0|https:\/\/|Worldwide)$/;

  for (const [name, page] of [["membership", joinHtml], ["partnership", businessHtml]]) {
    const visibleText = [...page.matchAll(/>([^<>]+)</g)]
      .map((match) => match[1].trim().replaceAll("&amp;", "&"))
      .filter(Boolean);
    const attributes = [...page.matchAll(/(?:aria-label|alt|placeholder|content)="([^"]+)"/g)]
      .map((match) => match[1]);
    const missing = [...new Set([...visibleText, ...attributes])]
      .filter((value) => !keepUntranslated.test(value) && !pageTranslations[value]);
    assert.deepEqual(missing, [], `${name} page has untranslated copy`);
  }
});

test("partner search recognises localized countries, cities and categories", () => {
  assert.equal(app.matchesPartner({name: "Clinic", country: "ukraine", city: "kyiv", category: "healthcare"}, {query: "Київ медицина"}), true);
  assert.equal(app.matchesPartner({name: "Clinic", country: "ukraine", city: "kyiv", category: "healthcare"}, {query: "Украина Киев"}), true);
});
