/* Tarlo Electrical Connections — interactions (no dependencies) */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header: compact + blurred once scrolled */
  const header = document.querySelector('[data-header]');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* Hero: dot grid revealed around the mouse (touch keeps the soft static glow) */
  const hero = document.querySelector('[data-hero]');
  if (hero && !reduceMotion) {
    let raf = 0, x = 0, y = 0;
    const paint = () => {
      raf = 0;
      hero.style.setProperty('--mx', x + 'px');
      hero.style.setProperty('--my', y + 'px');
    };
    hero.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = hero.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      hero.classList.add('is-active');
      if (!raf) raf = requestAnimationFrame(paint);
    });
    hero.addEventListener('pointerleave', () => hero.classList.remove('is-active'));
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('[data-reveal], .photo');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* Reviews: index + featured quote */
  const reviews = document.querySelector('[data-reviews]');
  if (reviews) {
    const tabs = [...reviews.querySelectorAll('.review-tab')];
    const feature = reviews.querySelector('[data-review-feature]');
    const quote = reviews.querySelector('[data-review-quote]');
    const name = reviews.querySelector('[data-review-name]');
    const meta = reviews.querySelector('[data-review-meta]');
    const count = reviews.querySelector('[data-review-count]');
    const pad = (n) => String(n).padStart(2, '0');
    let current = 0;

    const show = (i) => {
      current = (i + tabs.length) % tabs.length;
      tabs.forEach((t, j) => t.setAttribute('aria-selected', String(j === current)));
      const t = tabs[current];
      feature.classList.add('is-swapping');
      setTimeout(() => {
        quote.textContent = t.dataset.quote;
        name.textContent = t.dataset.name;
        meta.textContent = t.dataset.meta;
        count.textContent = `${pad(current + 1)} / ${pad(tabs.length)}`;
        feature.classList.remove('is-swapping');
      }, reduceMotion ? 0 : 220);
      // Keep the active name visible when the name row is a horizontal swiper (mobile)
      const row = tabs[current].closest('.review-index');
      if (row.scrollWidth > row.clientWidth) {
        const li = tabs[current].parentElement;
        const pad0 = parseFloat(getComputedStyle(row).paddingLeft) || 0;
        row.scrollTo({ left: li.offsetLeft - row.offsetLeft - pad0, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    };

    // Swipe the quote left/right on touch screens
    let startX = 0, startY = 0;
    feature.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    feature.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
    }, { passive: true });

    tabs.forEach((t, i) => t.addEventListener('click', () => show(i)));
    reviews.querySelector('[data-review-prev]').addEventListener('click', () => show(current - 1));
    reviews.querySelector('[data-review-next]').addEventListener('click', () => show(current + 1));
    reviews.addEventListener('keydown', (e) => {
      if (!e.target.closest('.review-tab')) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); tabs[current].focus(); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); tabs[current].focus(); }
    });
  }

  /* FAQ accordion (one open at a time) */
  const faq = document.querySelector('[data-faq]');
  if (faq) {
    const items = [...faq.querySelectorAll('.faq__item')];
    items.forEach((item) => {
      const btn = item.querySelector('.faq__q');
      btn.addEventListener('click', () => {
        const open = !item.classList.contains('is-open');
        items.forEach((other) => {
          other.classList.remove('is-open');
          other.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
        });
        item.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  }

  /* Contact chips + service cards pre-select */
  const chipWrap = document.querySelector('[data-chips]');
  const chipValue = document.querySelector('[data-chips-value]');
  const chips = chipWrap ? [...chipWrap.querySelectorAll('.chip')] : [];
  const syncChips = () => {
    chipValue.value = chips.filter((c) => c.getAttribute('aria-pressed') === 'true').map((c) => c.textContent.trim()).join(', ');
  };
  chips.forEach((c) => c.addEventListener('click', () => {
    c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true'));
    syncChips();
  }));
  document.querySelectorAll('[data-service]').forEach((card) => {
    card.addEventListener('click', () => {
      const chip = chips.find((c) => c.textContent.trim() === card.dataset.service);
      if (chip) { chip.setAttribute('aria-pressed', 'true'); syncChips(); }
    });
  });

  /* Form: placeholder submit until a backend is connected */
  const form = document.querySelector('[data-form]');
  const note = document.querySelector('[data-form-note]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        note.textContent = 'Please add your name and phone number.';
        form.reportValidity();
        return;
      }
      note.textContent = "Thanks — Harry will be in touch the same day.";
      form.reset();
      chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
      syncChips();
    });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
