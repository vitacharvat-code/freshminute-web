/* =============================================
   FRESH MINUTE — main.js
   - Navbar scroll effect
   - Mobile nav toggle
   - CZ / EN language switcher
   ============================================= */

(function () {
  'use strict';

  /* ── Navbar scroll ─────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── Mobile nav ────────────────────────────── */
  const toggle  = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
  // close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });

  /* ── Language switch ───────────────────────── */
  const LANG_KEY = 'fm_lang';
  let currentLang = localStorage.getItem(LANG_KEY) || 'cs';

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);

    // Show/hide text nodes
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.classList.toggle('visible', el.dataset.lang === lang);
    });

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.set === lang);
    });

    // Update <html lang="">
    document.documentElement.lang = lang === 'cs' ? 'cs' : 'en';
  }

  // Wire up all lang buttons (desktop + mobile)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.set));
  });

  // Init on load
  setLang(currentLang);

  /* ── Smooth scroll for anchor links ────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
