(function initKylyvnykFaqComponent(globalScope) {
  function getNextOpenId(currentId, clickedId) {
    return currentId === clickedId ? null : clickedId;
  }

  function initAccordion(accordion) {
    if (accordion.dataset.accordionReady === "true") return;
    accordion.dataset.accordionReady = "true";

    const items = [...accordion.querySelectorAll(".faq-item")];
    let openId =
      items.find((item) => item.classList.contains("is-open"))?.querySelector("button")
        ?.id || null;

    items.forEach((item) => {
      const button = item.querySelector("button");
      const panel = item.querySelector(".faq-panel");
      if (!button || !panel) return;

      button.addEventListener("click", () => {
        openId = getNextOpenId(openId, button.id);
        items.forEach((candidate) => {
          const candidateButton = candidate.querySelector("button");
          const candidatePanel = candidate.querySelector(".faq-panel");
          const isOpen = candidateButton?.id === openId;
          candidate.classList.toggle("is-open", isOpen);
          candidateButton?.setAttribute("aria-expanded", String(isOpen));
          if (candidatePanel) candidatePanel.hidden = !isOpen;
        });
      });
    });
  }

  function initAccordions(root = document) {
    root.querySelectorAll("[data-accordion]").forEach(initAccordion);
  }

  globalScope.KylyvnykFaq = Object.freeze({ getNextOpenId, initAccordions });

  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => initAccordions());
  }
})(globalThis);
