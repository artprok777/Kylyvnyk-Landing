(function initKylyvnykApp() {
const localeApi = globalThis.KylyvnykLocales ?? {
  translations: {},
  getTranslation: (source) => source,
};
const { getTranslation, translations } = localeApi;

let currentLocale = "en";
const originalText = new WeakMap();
const originalAttributes = new WeakMap();

function normalizeSearch(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function matchesPartner(partner, filters = {}) {
  const query = normalizeSearch(filters.query);
  const country = normalizeSearch(filters.country);
  const city = normalizeSearch(filters.city);
  const category = normalizeSearch(filters.category);
  const localizedMetadata = [partner.country, partner.city, partner.category]
    .filter(Boolean)
    .flatMap((value) => {
      const source = Object.keys(translations).find(
        (key) => normalizeSearch(key) === normalizeSearch(value),
      );
      return source ? [getTranslation(source, "uk"), getTranslation(source, "ru")] : [];
    });
  const searchable = normalizeSearch(
    [partner.name, partner.country, partner.city, partner.category, partner.keywords, ...localizedMetadata]
      .filter(Boolean)
      .join(" "),
  );
  const queryMatches = query
    .split(" ")
    .filter(Boolean)
    .every((term) => searchable.includes(term));

  return (
    queryMatches &&
    (!country || normalizeSearch(partner.country) === country) &&
    (!city || normalizeSearch(partner.city) === city) &&
    (!category || normalizeSearch(partner.category) === category)
  );
}

function filterPartners(partners, filters = {}) {
  return partners.filter((partner) => matchesPartner(partner, filters));
}

function getNextFaqOpenId(currentId, clickedId) {
  return currentId === clickedId ? null : clickedId;
}

function initPartnerFilters() {
  const form = document.querySelector("[data-partner-form]");
  const cards = [...document.querySelectorAll("[data-partner]")];
  if (!form || cards.length === 0) return;

  const searchInput = form.querySelector("[data-search-input]");
  const countrySelect = form.querySelector("[data-country-filter]");
  const citySelect = form.querySelector("[data-city-filter]");
  const categorySelect = form.querySelector("[data-category-filter]");
  const resultCount = document.querySelector("[data-result-count]");
  const emptyState = document.querySelector("[data-empty-state]");
  const resetButtons = [
    document.querySelector("[data-reset-filters]"),
    document.querySelector("[data-empty-reset]"),
  ].filter(Boolean);

  const partnerRecords = cards.map((card, index) => ({
    id: String(index),
    name: card.dataset.name || "",
    country: card.dataset.country || "",
    city: card.dataset.city || "",
    category: card.dataset.category || "",
    keywords: card.dataset.keywords || "",
    element: card,
  }));

  function currentFilters() {
    return {
      query: searchInput?.value || "",
      country: countrySelect?.value || "",
      city: citySelect?.value || "",
      category: categorySelect?.value || "",
    };
  }

  function render() {
    const visible = new Set(
      filterPartners(partnerRecords, currentFilters()).map(({ id }) => id),
    );

    partnerRecords.forEach(({ id, element }) => {
      element.hidden = !visible.has(id);
    });

    if (resultCount) resultCount.textContent = String(visible.size);
    if (emptyState) emptyState.hidden = visible.size !== 0;
  }

  function reset() {
    form.reset();
    render();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });
  searchInput?.addEventListener("input", render);
  countrySelect?.addEventListener("change", render);
  citySelect?.addEventListener("change", render);
  categorySelect?.addEventListener("change", render);
  resetButtons.forEach((button) => button.addEventListener("click", reset));
}

function initMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (!toggle || !menu) return;

  function setOpen(isOpen) {
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", getTranslation(isOpen ? "Close navigation" : "Open navigation", currentLocale));
    menu.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  }

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

function translateDocument(locale) {
  document.documentElement.lang = locale;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest("[data-language-select]")) continue;
    if (!originalText.has(node)) originalText.set(node, node.textContent);
    const source = originalText.get(node);
    const trimmed = source.trim();
    if (trimmed) node.textContent = source.replace(trimmed, getTranslation(trimmed, locale));
  }

  document.querySelectorAll("[aria-label], [alt], [placeholder], meta[name='description']").forEach((element) => {
    for (const attribute of ["aria-label", "alt", "placeholder", "content"]) {
      if (!element.hasAttribute(attribute) || (element.matches("[data-menu-toggle]") && attribute === "aria-label")) continue;
      let values = originalAttributes.get(element);
      if (!values) {
        values = new Map();
        originalAttributes.set(element, values);
      }
      if (!values.has(attribute)) values.set(attribute, element.getAttribute(attribute));
      element.setAttribute(attribute, getTranslation(values.get(attribute), locale));
    }
  });

  document.title = getTranslation("Kylyvnyk Club — International Business Club", locale);
  const toggle = document.querySelector("[data-menu-toggle]");
  if (toggle) toggle.setAttribute("aria-label", getTranslation(toggle.getAttribute("aria-expanded") === "true" ? "Close navigation" : "Open navigation", locale));
  document.querySelectorAll('a[href^="https://www.kylyvnyk.club/"]').forEach((link) => {
    link.href = link.href.replace(/\/(en|uk|ru)(?=\/)/, `/${locale}`);
  });
}

function initLanguageSelect() {
  const selects = [...document.querySelectorAll("[data-language-select]")];
  if (!selects.length) return;

  try {
    const saved = window.localStorage.getItem("kylyvnyk-language");
    if (["en", "uk", "ru"].includes(saved)) currentLocale = saved;
  } catch {
    // Private browsing and file previews may not expose localStorage.
  }

  function setLocale(locale) {
    if (!["en", "uk", "ru"].includes(locale)) return;
    currentLocale = locale;
    selects.forEach((select) => { select.value = locale; });
    translateDocument(locale);
    try { window.localStorage.setItem("kylyvnyk-language", locale); } catch { /* Optional persistence. */ }
  }

  selects.forEach((select) => select.addEventListener("change", () => {
    setLocale(select.value);
    const menuToggle = document.querySelector("[data-menu-toggle]");
    if (menuToggle?.getAttribute("aria-expanded") === "true") menuToggle.click();
  }));
  setLocale(currentLocale);
}

function initHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initReveal() {
  const elements = [...document.querySelectorAll(".reveal")];
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px" },
  );

  elements.forEach((element) => observer.observe(element));
}

globalThis.KylyvnykApp = Object.freeze({
  getTranslation,
  normalizeSearch,
  matchesPartner,
  filterPartners,
  getNextFaqOpenId,
});

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    initPartnerFilters();
    initMenu();
    initLanguageSelect();
    initHeader();
    initReveal();
  });
}
})();
