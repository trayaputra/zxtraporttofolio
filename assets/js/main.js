/* ============================================================
   Portfolio — main.js
   Author: Traya Putra
   ============================================================ */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Tahun di footer ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Tema terang/gelap ---------- */
  const root = document.documentElement;
  const themeToggle = $("#themeToggle");
  const STORAGE_KEY = "traya-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
  }

  (function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (_) {}
    if (saved === "light" || saved === "dark") {
      applyTheme(saved);
    } else {
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", dark ? "dark" : "light");
    }
  })();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ---------- Header + progress bar ---------- */
  const header = $("#siteHeader");
  const progress = $("#scrollProgress");

  function onScroll() {
    const y = window.scrollY || 0;
    if (header) header.classList.toggle("is-stuck", y > 12);

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = max > 0 ? ((y / max) * 100).toFixed(2) + "%" : "0%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");

  function closeMenu() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Buka menu");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    });

    $$(".nav-link", navLinks).forEach((a) => a.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) closeMenu();
    });
  }

  /* ---------- Active link saat scroll ---------- */
  const sections = $$("main section[id]");
  const links = $$(".nav-link");

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((l) =>
            l.classList.toggle("is-active", l.getAttribute("href") === "#" + id)
          );
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => navObserver.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$("[data-reveal]");

  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          const delay = prefersReduced ? 0 : Math.min(i * 70, 280);
          window.setTimeout(() => entry.target.classList.add("is-visible"), delay);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Efek mengetik ---------- */
  const typedEl = $("#typed");
  const words = ["antarmuka web.", "design system.", "produk cepat.", "pengalaman mulus."];

  if (typedEl && !prefersReduced) {
    let w = 0, c = 0, deleting = false;

    (function tick() {
      const word = words[w];
      typedEl.textContent = word.slice(0, c);

      if (!deleting && c < word.length) {
        c++;
        setTimeout(tick, 70);
      } else if (!deleting && c === word.length) {
        deleting = true;
        setTimeout(tick, 1600);
      } else if (deleting && c > 0) {
        c--;
        setTimeout(tick, 35);
      } else {
        deleting = false;
        w = (w + 1) % words.length;
        setTimeout(tick, 320);
      }
    })();
  } else if (typedEl) {
    typedEl.textContent = words[0];
  }

  /* ---------- Counter angka ---------- */
  const counters = $$(".count");

  function animateCount(el) {
    const target = parseInt(el.dataset.count || "0", 10);
    if (prefersReduced || !Number.isFinite(target)) {
      el.textContent = String(target);
      return;
    }
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window && counters.length) {
    const countObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => countObserver.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Filter proyek ---------- */
  const filterBtns = $$(".filter-btn");
  const projectCards = $$(".project");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", String(active));
      });

      projectCards.forEach((card) => {
        const match = filter === "all" || card.dataset.cat === filter;
        card.classList.toggle("is-hidden", !match);
        if (match) {
          card.classList.remove("is-visible");
          requestAnimationFrame(() => card.classList.add("is-visible"));
        }
      });
    });
  });

  /* ---------- Form kontak (validasi + mailto) ---------- */
  const form = $("#contactForm");
  const note = $("#formNote");

  function setError(field, message) {
    const wrap = field.closest(".field");
    const errEl = $(`[data-err-for="${field.name}"]`);
    if (wrap) wrap.classList.toggle("has-error", Boolean(message));
    if (errEl) errEl.textContent = message || "";
  }

  function validate() {
    let valid = true;

    const name = $("#name");
    const email = $("#email");
    const message = $("#message");

    if (!name.value.trim() || name.value.trim().length < 2) {
      setError(name, "Nama minimal 2 karakter.");
      valid = false;
    } else setError(name, "");

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRe.test(email.value.trim())) {
      setError(email, "Masukkan email yang valid.");
      valid = false;
    } else setError(email, "");

    if (message.value.trim().length < 10) {
      setError(message, "Pesan minimal 10 karakter.");
      valid = false;
    } else setError(message, "");

    return valid;
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) {
        if (note) {
          note.textContent = "";
          note.style.color = "#f87171";
          note.textContent = "Periksa kembali kolom yang ditandai.";
        }
        return;
      }

      const name = $("#name").value.trim();
      const email = $("#email").value.trim();
      const message = $("#message").value.trim();

      const subject = encodeURIComponent(`Pesan dari ${name} — Portofolio`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:hello@traya.dev?subject=${subject}&body=${body}`;

      if (note) {
        note.style.color = "";
        note.textContent = "Membuka aplikasi email kamu… Terima kasih!";
      }
      form.reset();
    });

    $$("#contactForm input, #contactForm textarea").forEach((el) => {
      el.addEventListener("input", () => setError(el, ""));
    });
  }

  /* ---------- Smooth anchor + tutup menu ---------- */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });
})();
