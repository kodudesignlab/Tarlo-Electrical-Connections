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

  /* Hero: dot grid revealed around the mouse.
     Position and intensity are eased every frame (lerp) so the glow glides
     after the cursor instead of snapping. Touch keeps the soft static glow. */
  const hero = document.querySelector('[data-hero]');
  if (hero && !reduceMotion) {
    const rest = { x: 0.5, y: 0.42 };          // resting spot (fraction of hero)
    const cur = { x: 0, y: 0, g: 0.4 };
    const target = { x: 0, y: 0, g: 0.4 };
    let raf = 0;
    const place = () => {
      const r = hero.getBoundingClientRect();
      return { w: r.width, h: r.height, left: r.left, top: r.top };
    };
    const init = () => {
      const { w, h } = place();
      cur.x = target.x = w * rest.x;
      cur.y = target.y = h * rest.y;
      paint();
    };
    const paint = () => {
      hero.style.setProperty('--mx', cur.x.toFixed(1) + 'px');
      hero.style.setProperty('--my', cur.y.toFixed(1) + 'px');
      hero.style.setProperty('--glow', cur.g.toFixed(3));
    };
    const tick = () => {
      const k = 0.12;   // follow speed: lower = floatier
      cur.x += (target.x - cur.x) * k;
      cur.y += (target.y - cur.y) * k;
      cur.g += (target.g - cur.g) * 0.08;
      paint();
      const settled = Math.abs(target.x - cur.x) < 0.3 && Math.abs(target.y - cur.y) < 0.3 && Math.abs(target.g - cur.g) < 0.002;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };

    hero.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const { left, top } = place();
      target.x = e.clientX - left;
      target.y = e.clientY - top;
      target.g = 1;
      wake();
    });
    hero.addEventListener('pointerleave', () => {
      const { w, h } = place();
      target.x = w * rest.x;
      target.y = h * rest.y;
      target.g = 0.4;
      wake();
    });
    window.addEventListener('resize', init, { passive: true });
    init();
  }

  /* Eased anchor scrolling (smoother than the browser default) */
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const scrollOffset = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    const id = a.getAttribute('href');
    const el = id === '#top' ? document.body : document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    const to = id === '#top' ? 0 : el.getBoundingClientRect().top + window.scrollY - scrollOffset() + 1;
    const from = window.scrollY;
    const dist = to - from;
    if (reduceMotion || Math.abs(dist) < 2) { window.scrollTo(0, to); }
    else {
      const dur = Math.min(1400, Math.max(600, Math.abs(dist) * 0.45));
      const t0 = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - t0) / dur);
        window.scrollTo(0, from + dist * easeInOutCubic(t));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    history.replaceState(null, '', id);
  });

  /* Scroll reveal, with a small stagger for cards in the same grid */
  document.querySelectorAll('.bento, .steps').forEach((group) => {
    [...group.querySelectorAll('[data-reveal]')].forEach((el, i) => el.style.setProperty('--d', `${i * 0.06}s`));
  });
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
      }, reduceMotion ? 0 : 260);
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
