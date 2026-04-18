(function () {
  const root = document.documentElement;

  // --- LANGUAGE TOGGLE ---
  const saved = localStorage.getItem('dopa-lang');
  if (saved === 'en') root.classList.add('lang-en');
  root.setAttribute('data-lang', root.classList.contains('lang-en') ? 'en' : 'es');

  function syncLangButtons() {
    const isEn = root.classList.contains('lang-en');
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === (isEn ? 'en' : 'es'));
    });
  }

  function setLang(lang) {
    if (lang === 'en') root.classList.add('lang-en');
    else root.classList.remove('lang-en');
    root.setAttribute('data-lang', lang);
    localStorage.setItem('dopa-lang', lang);
    syncLangButtons();
  }

  document.addEventListener('click', e => {
    const langBtn = e.target.closest('.lang-toggle button');
    if (langBtn) { setLang(langBtn.dataset.lang); return; }
  });

  // --- MOBILE MENU ---
  window.toggleMenu = function () {
    const menu = document.querySelector('.mobile-menu');
    if (menu) menu.classList.toggle('open');
  };
  document.addEventListener('click', e => {
    if (e.target.closest('.nav-burger')) {
      e.preventDefault();
      window.toggleMenu();
    } else if (e.target.closest('.mobile-menu a')) {
      const menu = document.querySelector('.mobile-menu');
      if (menu) menu.classList.remove('open');
    }
  });

  // --- FAQ ACCORDION ---
  document.addEventListener('click', e => {
    const q = e.target.closest('.faq-q');
    if (!q) return;
    const item = q.parentElement;
    item.classList.toggle('open');
  });

  // --- CHIPS (form) ---
  document.addEventListener('click', e => {
    const chip = e.target.closest('.chips .chip');
    if (!chip) return;
    e.preventDefault();
    const group = chip.parentElement;
    group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  });

  // --- FORM HANDLER ---
  window.handleReserve = function (event) {
    event.preventDefault();
    const form = event.target;
    const confirmation = document.getElementById('confirmation');
    form.style.display = 'none';
    if (confirmation) confirmation.classList.add('visible');
    return false;
  };

  // --- CARTA SECTION TAB HIGHLIGHTING ---
  const cartaTabs = document.querySelectorAll('.carta-nav a');
  if (cartaTabs.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          cartaTabs.forEach(t => t.classList.toggle('active', t.getAttribute('href') === '#' + id));
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.carta-section').forEach(s => observer.observe(s));
  }

  // --- FADE IN ONCE FONTS READY ---
  function ready() { document.body.classList.add('ready'); }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(ready);
    setTimeout(ready, 900);
  } else {
    setTimeout(ready, 200);
  }

  // --- SCROLL REVEAL ---
  function initReveal() {
    const selectors = [
      '.pioneer-title', '.pioneer-body', '.pioneer-stats',
      '.origin-head', '.origin-cell',
      '.trio-head > div', '.trio-note', '.trio-card',
      '.cultura-tease-inner > div', '.cultura-collage .photo',
      '.visit-card', '.visit-map', '.visit-grid', '.marquee',
      '.carta-hero-grid > *', '.carta-note', '.carta-nav',
      '.carta-section-head', '.item', '.legend',
      '.cult-hero-sub', '.program-head', '.prog',
      '.ied-inner > div', '.ied-poster',
      '.walk-head', '.walk-map', '.walk-stops .s',
      '.circulo-inner > div', '.voice',
      '.vis-hero .card', '.bigmap', '.info-card',
      '.transit h2', '.transit-card',
      '.reserve-inner > div', '.faq h2', '.faq-item'
    ];
    const els = document.querySelectorAll(selectors.join(','));
    els.forEach(el => el.classList.add('reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
  }

  // --- IMAGE FALLBACK: display filename in ph-tag when image missing ---
  document.addEventListener('DOMContentLoaded', function () {
    syncLangButtons();
    initReveal();
    document.querySelectorAll('[data-bg]').forEach(el => {
      const src = el.getAttribute('data-bg');
      if (!src) return;
      const test = new Image();
      test.onload = () => { el.style.backgroundImage = `url('${src}')`; };
      test.onerror = () => {};
      test.src = src;
    });
  });
})();
