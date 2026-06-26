/* =========================================
   script.js  —  BULADEV
   ========================================= */

/* ── 1. Mobile menu ───────────────────────── */
(function () {
  const btn     = document.getElementById('mobile-menu-btn');
  const menu    = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  const close   = document.getElementById('close-menu-btn');

  function openMenu() {
    menu.classList.add('active');
    overlay.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('active');
    overlay.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (btn)     btn.addEventListener('click', openMenu);
  if (close)   close.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close on any mobile-menu link click
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });
})();

/* ── 2. Active nav link on scroll ─────────── */
(function () {
  const sections = document.querySelectorAll('main [id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActive() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 130) current = sec.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

/* ── 3. Navbar shadow on scroll ───────────── */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0,0,0,.1)'
      : '0 1px 2px rgba(0,0,0,.05)';
  }, { passive: true });
})();

/* ── 4. Scroll-reveal (IntersectionObserver) ─ */
(function () {
  /* Elements to animate and their variant */
  const targets = [
    /* Page hero */
    { sel: '.page-hero-text',        cls: 'reveal' },

    /* Land dev intro */
    { sel: '.landdev-intro p',       cls: 'reveal',             stagger: true },

    /* Development services */
    { sel: '.landdev-services .service-card', cls: 'reveal',    stagger: true },

    /* About */
    { sel: '.about-image',           cls: 'reveal reveal-left' },
    { sel: '.about-content',         cls: 'reveal reveal-right' },

    /* Services */
    { sel: '.service-card',          cls: 'reveal',             stagger: true },

    /* Trust / credentials */
    { sel: '.image-column',          cls: 'reveal reveal-left' },
    { sel: '.content-column',        cls: 'reveal reveal-right' },
    { sel: '.features-list .feature-item', cls: 'reveal reveal-scale', stagger: true },

    /* Why choose us */
    { sel: '.feature-card',          cls: 'reveal',             stagger: true },

    /* How we work */
    { sel: '.step-card',             cls: 'reveal',             stagger: true },

    /* Process */
    { sel: '.process-step',          cls: 'reveal',             stagger: true },

    /* CTA */
    { sel: '.cta-title',             cls: 'reveal' },
    { sel: '.cta-desc',              cls: 'reveal' },
    { sel: '.cta-buttons',           cls: 'reveal' },

    /* Section headers */
    { sel: '.section-header',        cls: 'reveal' },
  ];

  /* Apply base classes */
  targets.forEach(({ sel, cls, stagger }) => {
    const els = document.querySelectorAll(sel);
    els.forEach((el, i) => {
      /* Don't double-add */
      if (el.dataset.revealed) return;
      el.dataset.revealed = '1';

      cls.split(' ').forEach(c => el.classList.add(c));

      /* Individual stagger delay */
      if (stagger) {
        el.style.transitionDelay = (i * 90) + 'ms';
      }
    });
  });

  /* Observe */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* ── 5. Footer year ───────────────────────── */
(function () {
  const el = document.getElementById('current-year');
  if (el) el.textContent = new Date().getFullYear();
})();
