function getBusinessConfirmationCopy(companyName = "Your business") {
  return `Thank you. The ${companyName} application has not been sent, and no payment has been taken.`;
}

function initBusinessApplication() {
  const form = document.querySelector("[data-business-form]");
  const preview = document.querySelector("[data-preview-application]");
  const confirmation = document.querySelector("[data-business-confirmation]");
  const confirmationCopy = document.querySelector("[data-business-confirmation-copy]");
  const restart = document.querySelector("[data-business-start-over]");
  if (!form || !preview || !confirmation || !confirmationCopy) return;

  function previewApplication() {
    const requiredFields = [...form.querySelectorAll("[required]")];
    const invalidField = requiredFields.find((field) => !field.checkValidity());
    if (invalidField) {
      invalidField.reportValidity();
      return;
    }

    const companyName = form.querySelector('[name="companyName"]')?.value.trim() || "Your business";
    confirmationCopy.textContent = getBusinessConfirmationCopy(companyName);
    form.hidden = true;
    confirmation.hidden = false;
    confirmation.focus();
  }

  preview.addEventListener("click", previewApplication);
  form.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || !event.target.matches('input:not([type="checkbox"])')) return;
    event.preventDefault();
    previewApplication();
  });

  restart?.addEventListener("click", () => {
    confirmation.hidden = true;
    form.hidden = false;
    form.querySelectorAll("input, select, textarea").forEach((field) => {
      if (field instanceof HTMLInputElement && field.type === "checkbox") {
        field.checked = field.defaultChecked;
      } else if (field instanceof HTMLSelectElement) {
        const defaultIndex = [...field.options].findIndex((option) => option.defaultSelected);
        field.selectedIndex = defaultIndex >= 0 ? defaultIndex : 0;
      } else {
        field.value = field.defaultValue;
      }
    });
    form.querySelector("input")?.focus();
  });
}

function initBusinessReveal() {
  const elements = [...document.querySelectorAll(".business-reveal")];
  if (!elements.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.06, rootMargin: "0px 0px -42px" });

  elements.forEach((element) => observer.observe(element));
}

globalThis.KylyvnykBusiness = Object.freeze({ getBusinessConfirmationCopy });

if (typeof document !== "undefined") {
  document.documentElement.classList.add("business-js");
  document.addEventListener("DOMContentLoaded", () => {
    initBusinessApplication();
    initBusinessReveal();
  });
}
