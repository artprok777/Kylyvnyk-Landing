import test from "node:test";
import assert from "node:assert/strict";

await import("../locales.js");
await import("../app.js");

const {
  filterPartners,
  getNextFaqOpenId,
  matchesPartner,
  normalizeSearch,
} = globalThis.KylyvnykApp;

const partners = [
  {
    id: "aurum",
    name: "Aurum Dental Care",
    country: "ukraine",
    city: "kyiv",
    category: "healthcare",
    keywords: "dentistry clinic medical kyiv",
  },
  {
    id: "webcraft",
    name: "Noir Webcraft",
    country: "united states",
    city: "los angeles",
    category: "technology",
    keywords: "web software design development los angeles",
  },
  {
    id: "maple",
    name: "Maple Finance",
    country: "canada",
    city: "toronto",
    category: "finance",
    keywords: "investment tax planning toronto",
  },
];

test("normalizeSearch trims, lowercases, and removes diacritics", () => {
  assert.equal(normalizeSearch("  ZÜRICH Legal  "), "zurich legal");
});

test("matchesPartner combines keyword, country, and category filters", () => {
  assert.equal(
    matchesPartner(partners[0], {
      query: "dental",
      country: "Ukraine",
      city: "Kyiv",
      category: "Healthcare",
    }),
    true,
  );
  assert.equal(
    matchesPartner(partners[0], {
      query: "dental",
      country: "Canada",
      city: "Kyiv",
      category: "Healthcare",
    }),
    false,
  );
});

test("matchesPartner rejects a partner from a different city", () => {
  assert.equal(
    matchesPartner(partners[1], {
      query: "web",
      country: "united states",
      city: "miami",
      category: "technology",
    }),
    false,
  );
});

test("filterPartners returns every partner when filters are empty", () => {
  assert.deepEqual(
    filterPartners(partners, { query: "", country: "", category: "" }).map(
      ({ id }) => id,
    ),
    ["aurum", "webcraft", "maple"],
  );
});

test("filterPartners searches across names and keywords", () => {
  assert.deepEqual(
    filterPartners(partners, {
      query: "web design",
      country: "",
      category: "technology",
    }).map(({ id }) => id),
    ["webcraft"],
  );
});

test("getNextFaqOpenId closes the active item or opens another item", () => {
  assert.equal(getNextFaqOpenId("faq-1", "faq-1"), null);
  assert.equal(getNextFaqOpenId("faq-1", "faq-2"), "faq-2");
  assert.equal(getNextFaqOpenId(null, "faq-3"), "faq-3");
});
