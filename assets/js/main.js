(function () {
  // Mobile nav
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("open");
    });
  }

  // Footer year
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  // Tiny toast for newsletter placeholder buttons
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-toast]");
    if (!btn) return;
    const msg = btn.getAttribute("data-toast") || "Done.";
    showToast(msg);
  });

  function showToast(message) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 250);
    }, 1800);
  }
})();
