function getRouteRequirements(route) {
  return { referralRequired: route === "partner" };
}

function getConfirmationCopy(firstName = "there") {
  return `Thank you, ${firstName}. Your information has not been sent, and no payment has been taken.`;
}

function initRouteChoice() {
  const radios = [...document.querySelectorAll('[name="membershipRoute"]')];
  const referralWrap = document.querySelector("[data-referral-wrap]");
  const referralInput = document.querySelector("[data-referral-input]");
  const routeOptions = document.querySelector("[data-route-options]");
  const application = document.querySelector("#application");
  if (!radios.length || !referralWrap || !referralInput) return;

  function update() {
    const route = radios.find((radio) => radio.checked)?.value || "direct";
    const { referralRequired } = getRouteRequirements(route);
    referralWrap.hidden = !referralRequired;
    referralInput.required = referralRequired;
    referralInput.disabled = !referralRequired;
    if (!referralRequired) referralInput.value = "";
    radios.forEach((radio) => {
      radio.closest(".route-option")?.classList.toggle("is-selected", radio.checked);
    });
  }

  radios.forEach((radio) => radio.addEventListener("change", update));
  document.querySelectorAll("[data-select-route]").forEach((link) => {
    link.addEventListener("click", () => {
      const route = link.dataset.selectRoute;
      const radio = radios.find((candidate) => candidate.value === route);
      if (!radio) return;
      radio.checked = true;
      radio.dispatchEvent(new Event("change", { bubbles: true }));
      application?.scrollIntoView({ block: "start" });
      window.requestAnimationFrame(() => {
        routeOptions?.focus({ preventScroll: true });
      });
    });
  });
  update();
}

function initApplicationForm() {
  const form = document.querySelector("[data-membership-form]");
  const preview = document.querySelector("[data-preview-request]");
  const confirmation = document.querySelector("[data-form-confirmation]");
  const confirmationCopy = document.querySelector("[data-confirmation-copy]");
  const restart = document.querySelector("[data-start-over]");
  if (!form || !preview || !confirmation || !confirmationCopy) return;

  function previewRequest() {
    const requiredFields = [...form.querySelectorAll("[required]")];
    const invalidField = requiredFields.find((field) => !field.checkValidity());
    if (invalidField) {
      invalidField.reportValidity();
      return;
    }
    const firstName = form.querySelector('[name="firstName"]')?.value.trim() || "there";
    confirmationCopy.textContent = getConfirmationCopy(firstName);
    form.hidden = true;
    confirmation.hidden = false;
    confirmation.focus();
  }

  preview.addEventListener("click", previewRequest);
  form.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.target.matches("textarea, button")) return;
    event.preventDefault();
    previewRequest();
  });

  restart?.addEventListener("click", () => {
    confirmation.hidden = true;
    form.hidden = false;
    form.querySelectorAll("input, select, textarea").forEach((field) => {
      if (field instanceof HTMLInputElement && ["radio", "checkbox"].includes(field.type)) {
        field.checked = field.defaultChecked;
      } else if (field instanceof HTMLSelectElement) {
        field.selectedIndex = [...field.options].findIndex((option) => option.defaultSelected);
        if (field.selectedIndex < 0) field.selectedIndex = 0;
      } else {
        field.value = field.defaultValue;
      }
    });
    form.querySelector('[name="membershipRoute"][value="direct"]')?.dispatchEvent(new Event("change", { bubbles: true }));
    form.querySelector("input")?.focus();
  });
}

function initReveal() {
  const elements = [...document.querySelectorAll(".join-reveal")];
  if (!elements.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -50px" });
  elements.forEach((element) => observer.observe(element));
}

globalThis.KylyvnykJoin = Object.freeze({ getRouteRequirements, getConfirmationCopy });

if (typeof document !== "undefined") {
  document.documentElement.classList.add("join-js");
  document.addEventListener("DOMContentLoaded", () => {
    initRouteChoice();
    initApplicationForm();
    initReveal();
  });
}
