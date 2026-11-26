(() => {
  const cardSessionKey = "kuronami-card-session";
  const readSessionCard = () => {
    try {
      const savedCard = JSON.parse(sessionStorage.getItem(cardSessionKey) || "null");
      if (
        savedCard &&
        typeof savedCard.holder === "string" &&
        typeof savedCard.brand === "string" &&
        /^\d{4}$/.test(savedCard.lastFour) &&
        /^(0[1-9]|1[0-2])\/\d{2}$/.test(savedCard.expiry)
      ) return savedCard;
    } catch { /* O cadastro funciona apenas em memória se a sessão não estiver disponível. */ }
    return null;
  };

  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  const setMenuOpen = (open, returnFocus = false) => {
    if (!menuToggle || !siteNav) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    siteNav.classList.toggle("is-open", open);
    if (!open && returnFocus) menuToggle.focus();
  };

  menuToggle?.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  siteNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false, true);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) setMenuOpen(false);
  });

  const noticeDialog = document.querySelector(".notice-dialog");
  const noticeTitle = document.querySelector("#notice-title");
  const noticeCopy = document.querySelector("#notice-copy");
  const closeDialogButton = document.querySelector(".dialog-close");
  let lastNoticeTrigger = null;

  const notices = {
    download: {
      title: "Download indisponível no momento",
      copy: "O aplicativo Kuronami ainda está em desenvolvimento. Assim que estiver pronto, esta opção poderá ser usada.",
    },
    market: {
      title: "O mercado online vem depois",
      copy: "A experiência de compras pelo site ainda será construída. Por enquanto, esta página apresenta o conceito do Kuronami.",
    },
  };

  document.querySelectorAll("[data-notice]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const notice = notices[trigger.dataset.notice];
      if (!notice || !noticeDialog || !noticeTitle || !noticeCopy) return;
      lastNoticeTrigger = trigger;
      noticeTitle.textContent = notice.title;
      noticeCopy.textContent = notice.copy;
      noticeDialog.showModal();
      closeDialogButton?.focus();
    });
  });

  closeDialogButton?.addEventListener("click", () => noticeDialog?.close());
  noticeDialog?.addEventListener("click", (event) => {
    if (event.target === noticeDialog) noticeDialog.close();
  });
  noticeDialog?.addEventListener("close", () => lastNoticeTrigger?.focus());

  const cardDialog = document.querySelector("#card-dialog");
  const cardForm = document.querySelector("#card-registration-form");
  const cardNumberInput = document.querySelector("#card-number");
  const cardholderInput = document.querySelector("#cardholder-name");
  const expiryInput = document.querySelector("#card-expiry");
  const cvvInput = document.querySelector("#card-cvv");
  const cardDialogClose = document.querySelector(".card-dialog-close");
  const cardDialogTitle = document.querySelector("#card-dialog-title");
  const cardDialogDescription = document.querySelector("#card-dialog-description");
  const cardDialogGrid = document.querySelector(".card-dialog-grid");
  const cardStatus = document.querySelector("#card-form-status");
  const cardSessionResult = document.querySelector("#card-session-result");
  const cardSessionSummary = document.querySelector("#card-session-summary");
  let lastCardTrigger = null;
  let sessionCard = readSessionCard();

  const getCardBrand = (digits) => {
    if (digits.startsWith("4")) return "VISA";
    const mastercardPrefix = Number(digits.slice(0, 4));
    if (/^5[1-5]/.test(digits) || (digits.startsWith("2") && mastercardPrefix >= 2221 && mastercardPrefix <= 2720)) return "MASTERCARD";
    if (/^(34|37)/.test(digits)) return "AMEX";
    return "KURONAMI";
  };

  const formatCardNumber = (value) =>
    value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const updateCardPreview = () => {
    const digits = cardNumberInput?.value.replace(/\D/g, "") || "";
    const previewNumber = document.querySelector("#demo-card-number");
    const previewName = document.querySelector("#demo-card-holder");
    const previewExpiry = document.querySelector("#demo-card-expiry");
    if (sessionCard) {
      if (previewNumber) previewNumber.textContent = `•••• •••• •••• ${sessionCard.lastFour}`;
      if (previewName) previewName.textContent = sessionCard.holder.toUpperCase();
      if (previewExpiry) previewExpiry.textContent = sessionCard.expiry;
      return;
    }

    const numberSlots = Math.max(16, digits.length);
    const previewDigits = Array.from({ length: numberSlots }, (_, index) => digits[index] || "•");
    const groupedNumber = previewDigits.join("").match(/.{1,4}/g)?.join(" ") || "";

    if (previewNumber) previewNumber.textContent = groupedNumber;
    if (previewName) previewName.textContent = cardholderInput?.value.trim().toUpperCase() || "NOME DO TITULAR";
    if (previewExpiry) previewExpiry.textContent = expiryInput?.value || "MM/AA";
  };

  const syncCardRegistrationUI = () => {
    const hasSessionCard = Boolean(sessionCard);
    if (cardForm) cardForm.hidden = hasSessionCard;
    cardDialogGrid?.classList.toggle("is-saved-card", hasSessionCard);
    cardDialog?.classList.toggle("has-saved-card", hasSessionCard);
    if (cardSessionResult) cardSessionResult.hidden = !hasSessionCard;
    if (cardDialogTitle) cardDialogTitle.textContent = hasSessionCard ? "Meus cartões" : "Seu cartão Kuronami";
    if (cardDialogDescription) {
      cardDialogDescription.textContent = hasSessionCard
        ? "Seu cartão demonstrativo fica disponível somente nesta visita."
        : "Veja como o cadastro poderá funcionar no app.";
    }
    document.querySelectorAll("[data-card-registration]").forEach((trigger) => {
      const label = trigger.querySelector(".card-registration-label");
      if (label) label.textContent = hasSessionCard ? "Meus cartões" : "Cadastrar cartão";
    });
    if (hasSessionCard) updateCardPreview();
  };

  syncCardRegistrationUI();

  const clearFieldError = (input, errorId) => {
    input?.removeAttribute("aria-invalid");
    const error = document.querySelector(`#${errorId}`);
    if (error) error.textContent = "";
  };

  const showFieldError = (input, errorId, message) => {
    input?.setAttribute("aria-invalid", "true");
    const error = document.querySelector(`#${errorId}`);
    if (error) error.textContent = message;
  };

  const openCardDialog = (trigger = null) => {
    if (!cardDialog || cardDialog.open) return;
    lastCardTrigger = trigger;
    syncCardRegistrationUI();
    cardDialog.showModal();
    cardDialogClose?.focus();
  };

  document.querySelectorAll("[data-card-registration]").forEach((trigger) => {
    trigger.addEventListener("click", () => openCardDialog(trigger));
  });

  cardDialogClose?.addEventListener("click", () => cardDialog?.close());
  cardDialog?.addEventListener("click", (event) => {
    if (event.target === cardDialog) cardDialog.close();
  });
  cardDialog?.addEventListener("close", () => lastCardTrigger?.focus());

  cardNumberInput?.addEventListener("input", () => {
    cardNumberInput.value = formatCardNumber(cardNumberInput.value);
    clearFieldError(cardNumberInput, "card-number-error");
    if (cardStatus) cardStatus.textContent = "";
    updateCardPreview();
  });

  expiryInput?.addEventListener("input", () => {
    expiryInput.value = formatExpiry(expiryInput.value);
    clearFieldError(expiryInput, "card-expiry-error");
    if (cardStatus) cardStatus.textContent = "";
    updateCardPreview();
  });

  cvvInput?.addEventListener("input", () => {
    cvvInput.value = cvvInput.value.replace(/\D/g, "").slice(0, 4);
    cvvInput.removeAttribute("aria-invalid");
    const helper = document.querySelector("#card-cvv-help");
    if (helper) helper.textContent = "Nunca será mantido após o cadastro.";
    if (cardStatus) cardStatus.textContent = "";
  });

  cardholderInput?.addEventListener("input", () => {
    const original = cardholderInput.value;
    const cursor = cardholderInput.selectionStart ?? original.length;
    const lettersBeforeCursor = original.slice(0, cursor).replace(/[^\p{L}\p{M}\s'’-]/gu, "").length;
    const sanitized = original.replace(/[^\p{L}\p{M}\s'’-]/gu, "");
    if (sanitized !== original) {
      cardholderInput.value = sanitized;
      cardholderInput.setSelectionRange(lettersBeforeCursor, lettersBeforeCursor);
    }
    clearFieldError(cardholderInput, "cardholder-error");
    if (cardStatus) cardStatus.textContent = "";
    updateCardPreview();
  });

  cardForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!cardNumberInput || !cardholderInput || !expiryInput || !cvvInput) return;

    const digits = cardNumberInput.value.replace(/\D/g, "");
    const holder = cardholderInput.value.trim().replace(/\s+/g, " ");
    const validHolder = /^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u.test(holder);
    const brand = getCardBrand(digits);
    const expiryMatch = expiryInput.value.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    const errors = [];

    clearFieldError(cardholderInput, "cardholder-error");
    clearFieldError(cardNumberInput, "card-number-error");
    clearFieldError(expiryInput, "card-expiry-error");

    if (holder.length < 3 || !validHolder) {
      showFieldError(cardholderInput, "cardholder-error", "Use letras, espaços, hífen e apóstrofo no nome.");
      errors.push(cardholderInput);
    }
    if (!/^\d{13,19}$/.test(digits)) {
      showFieldError(cardNumberInput, "card-number-error", "Use um número fictício com 13 a 19 dígitos.");
      errors.push(cardNumberInput);
    }
    if (!expiryMatch) {
      showFieldError(expiryInput, "card-expiry-error", "Use o formato MM/AA.");
      errors.push(expiryInput);
    } else {
      const month = Number(expiryMatch[1]);
      const year = 2000 + Number(expiryMatch[2]);
      const today = new Date();
      if (year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth() + 1)) {
        showFieldError(expiryInput, "card-expiry-error", "A validade precisa ser futura.");
        errors.push(expiryInput);
      }
    }
    const expectedCvvLength = brand === "AMEX" ? 4 : 3;
    if (!new RegExp(`^\\d{${expectedCvvLength}}$`).test(cvvInput.value)) {
      cvvInput.setAttribute("aria-invalid", "true");
      document.querySelector("#card-cvv-help")?.replaceChildren("Confira o código de segurança fictício.");
      errors.push(cvvInput);
    } else {
      cvvInput.removeAttribute("aria-invalid");
      document.querySelector("#card-cvv-help")?.replaceChildren("Nunca será mantido após o cadastro.");
    }

    if (errors.length) {
      cardStatus.textContent = "Revise os campos destacados para continuar.";
      errors[0].focus();
      return;
    }

    sessionCard = {
      holder,
      brand,
      lastFour: digits.slice(-4),
      expiry: expiryInput.value,
    };
    try {
      sessionStorage.setItem(cardSessionKey, JSON.stringify(sessionCard));
    } catch { /* A cópia em memória permanece enquanto esta página estiver aberta. */ }
    if (cardSessionSummary) {
      cardSessionSummary.textContent = `${sessionCard.holder} · ${sessionCard.brand} · final ${sessionCard.lastFour} · validade ${sessionCard.expiry}. O número completo e o código de segurança não são mantidos.`;
    }

    // Mantém apenas nome, bandeira, validade e os últimos quatro dígitos na memória desta página.
    cardForm.reset();
    cvvInput.value = "";
    document.querySelectorAll("[aria-invalid='true']").forEach((input) => input.removeAttribute("aria-invalid"));
    document.querySelectorAll(".field-error").forEach((error) => { error.textContent = ""; });
    syncCardRegistrationUI();
    cardSessionResult?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });

  if (new URLSearchParams(window.location.search).get("acao") === "cadastro-cartao") {
    openCardDialog();
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.hash}`);
  }

  if (!window.gsap || !window.ScrollTrigger) return;

  const gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);
  const motionMedia = gsap.matchMedia();

  motionMedia.add({ motion: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
    if (!conditions.motion) return;

    const stage = document.querySelector(".entrance-stage");
    if (!stage) return;

    document.documentElement.classList.add("gsap-ready");
    gsap.set(".stage-reveal", { autoAlpha: 0, y: 36 });
    gsap.set(".stage-progress span", { scaleX: 0, transformOrigin: "left center" });

    const doors = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * (window.innerWidth <= 700 ? 0.95 : 1.35))}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    doors
      .to(".door-panel-left", { xPercent: -105, ease: "none" }, 0)
      .to(".door-panel-right", { xPercent: 105, ease: "none" }, 0)
      .to(".interior-scene img", { scale: 1, filter: "brightness(1) saturate(1)", ease: "none" }, 0)
      .to(".stage-logo-frame", { autoAlpha: 0, y: -24, scale: 0.92, ease: "none" }, 0.08)
      .to(".entrance-overline, .door-hint", { autoAlpha: 0, y: -12, ease: "none" }, 0.12)
      .to(".stage-location", { autoAlpha: 0, ease: "none" }, 0.36)
      .to(".stage-reveal", { autoAlpha: 1, y: 0, ease: "none" }, 0.56)
      .to(".stage-progress span", { scaleX: 1, ease: "none" }, 0);

    gsap.utils.toArray("[data-reveal]").forEach((element) => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        },
      );
    });

    return () => document.documentElement.classList.remove("gsap-ready");
  });
})();
