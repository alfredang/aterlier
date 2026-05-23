/* ============================================================
   ATELIER — Site interactions
   Vanilla JS, no dependencies. Defer-loaded.
   ============================================================ */
(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     1. Theme toggle (light / dark, persisted)
  ---------------------------------------------------------- */
  (function theme() {
    const root = document.documentElement;
    const btn  = $('#themeToggle');
    const STORE_KEY = 'atelier-theme';

    const saved = localStorage.getItem(STORE_KEY);
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (sysDark ? 'dark' : 'light');
    root.setAttribute('data-theme', initial);

    btn?.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem(STORE_KEY, next);
    });
  })();

  /* ----------------------------------------------------------
     2. Sticky nav scroll state
  ---------------------------------------------------------- */
  (function navScroll() {
    const header = $('#siteHeader');
    if (!header) return;
    const toggle = () => header.classList.toggle('is-scrolled', window.scrollY > 80);
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
  })();

  /* ----------------------------------------------------------
     3. Mobile menu
  ---------------------------------------------------------- */
  (function mobileMenu() {
    const btn   = $('#menuToggle');
    const menu  = $('#mobileMenu');
    const body  = document.body;
    if (!btn || !menu) return;

    const close = () => {
      body.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    };
    const open = () => {
      body.classList.add('menu-open');
      btn.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
    };

    btn.addEventListener('click', () => {
      body.classList.contains('menu-open') ? close() : open();
    });

    $$('#mobileMenu a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) close();
    });
  })();

  /* ----------------------------------------------------------
     4. Smooth scroll with sticky-header offset
  ---------------------------------------------------------- */
  (function smoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id = link.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const headerH = $('#siteHeader')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH + 1;
        window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
      });
    });
  })();

  /* ----------------------------------------------------------
     5. IntersectionObserver reveal
  ---------------------------------------------------------- */
  (function reveal() {
    const items = $$('[data-animate]');
    if (!('IntersectionObserver' in window) || prefersReduced) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    items.forEach(el => {
      const s = el.getAttribute('data-stagger');
      if (s) el.style.setProperty('--stagger', s);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));
  })();

  /* ----------------------------------------------------------
     6. Counter animation (one-shot on enter)
  ---------------------------------------------------------- */
  (function counters() {
    const nums = $$('.stat-num');
    if (!nums.length) return;

    const animate = (el) => {
      const end = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || '';
      const dur = 1600;
      const start = performance.now();
      const easeOut = t => 1 - Math.pow(1 - t, 3);

      if (prefersReduced) { el.textContent = end + suffix; return; }

      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const v = Math.floor(easeOut(p) * end);
        el.textContent = v + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = end + suffix;
      };
      requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      nums.forEach(animate);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    nums.forEach(n => io.observe(n));
  })();

  /* ----------------------------------------------------------
     7. Portfolio filter
  ---------------------------------------------------------- */
  (function portfolioFilter() {
    const btns  = $$('.filter');
    const tiles = $$('#portfolioGrid .tile');
    if (!btns.length || !tiles.length) return;

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const cat = btn.dataset.filter;
        tiles.forEach(t => {
          const match = cat === 'all' || t.dataset.category === cat;
          t.classList.toggle('is-hidden', !match);
        });
      });
    });
  })();

  /* ----------------------------------------------------------
     8. Lightbox
  ---------------------------------------------------------- */
  (function lightbox() {
    const lb       = $('#lightbox');
    const lbImg    = $('#lbImage');
    const lbCap    = $('#lbCaption');
    const closeBtn = $('#lbClose');
    const prevBtn  = $('#lbPrev');
    const nextBtn  = $('#lbNext');
    const tiles    = $$('#portfolioGrid .tile');
    if (!lb || !tiles.length) return;

    let idx = 0;
    let lastFocus = null;

    const visibleTiles = () => tiles.filter(t => !t.classList.contains('is-hidden'));

    const render = () => {
      const list = visibleTiles();
      if (!list.length) return;
      idx = (idx + list.length) % list.length;
      const t = list[idx];
      const img = t.querySelector('img');
      lbImg.src = img.src.replace(/w=\d+/, 'w=1800');
      lbImg.alt = img.alt;
      lbCap.textContent = t.dataset.caption || '';
    };

    const open = (startIdx) => {
      idx = startIdx;
      lastFocus = document.activeElement;
      render();
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    const close = () => {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lastFocus?.focus?.();
    };

    tiles.forEach((tile, i) => {
      tile.addEventListener('click', () => {
        const list = visibleTiles();
        const startIdx = list.indexOf(tile);
        if (startIdx >= 0) open(startIdx);
      });
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => { idx--; render(); });
    nextBtn.addEventListener('click', () => { idx++; render(); });

    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape')      close();
      if (e.key === 'ArrowLeft')  { idx--; render(); }
      if (e.key === 'ArrowRight') { idx++; render(); }
    });
  })();

  /* ----------------------------------------------------------
     9. Testimonial carousel
  ---------------------------------------------------------- */
  (function carousel() {
    const track = $('#carouselTrack');
    const prev  = $('#prevQuote');
    const next  = $('#nextQuote');
    const dotsW = $('#carouselDots');
    const root  = $('#carousel');
    if (!track || !root) return;

    const slides = $$('.quote', track);
    let i = 0;
    let timer = null;
    const AUTO_MS = 7000;

    // build dots
    slides.forEach((_, idx) => {
      const b = document.createElement('button');
      b.className = 'dot';
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `Show testimonial ${idx + 1}`);
      b.addEventListener('click', () => go(idx, true));
      dotsW.appendChild(b);
    });
    const dots = $$('.dot', dotsW);

    const go = (n, user = false) => {
      i = (n + slides.length) % slides.length;
      track.style.transform = `translateX(-${i * 100}%)`;
      dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
      if (user) restart();
    };

    const start = () => { if (!prefersReduced) timer = setInterval(() => go(i + 1), AUTO_MS); };
    const stop  = () => { clearInterval(timer); timer = null; };
    const restart = () => { stop(); start(); };

    prev.addEventListener('click', () => go(i - 1, true));
    next.addEventListener('click', () => go(i + 1, true));
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

    go(0);
    start();
  })();

  /* ----------------------------------------------------------
     10. Enquiry form — fetch to FormSubmit
  ---------------------------------------------------------- */
  (function enquiry() {
    const form    = $('#enquiryForm');
    const submit  = $('#submitBtn');
    const toast   = $('#toast');
    if (!form) return;

    const ENDPOINT = 'https://formsubmit.co/ajax/angch@tertiaryinfotech.com';

    const setError = (name, msg) => {
      const field = form.querySelector(`[name="${name}"]`).closest('.field');
      const err   = form.querySelector(`[data-err-for="${name}"]`);
      field.classList.toggle('has-error', !!msg);
      if (err) err.textContent = msg || '';
    };

    const clearAllErrors = () => ['name','email','phone','message'].forEach(n => setError(n, ''));

    const showToast = (msg, isError = false) => {
      toast.textContent = msg;
      toast.classList.toggle('is-error', isError);
      toast.classList.add('is-visible');
      clearTimeout(showToast._t);
      showToast._t = setTimeout(() => toast.classList.remove('is-visible'), 4200);
    };

    const validate = (data) => {
      let ok = true;
      if (!data.name || data.name.trim().length < 2) {
        setError('name', 'Please share your name.'); ok = false;
      }
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email || !emailRe.test(data.email.trim())) {
        setError('email', 'A valid email helps us reply.'); ok = false;
      }
      if (data.phone && !/^[\d+\s()\-]{6,}$/.test(data.phone.trim())) {
        setError('phone', 'Phone format looks off.'); ok = false;
      }
      if (!data.message || data.message.trim().length < 10) {
        setError('message', 'A sentence or two helps us prepare.'); ok = false;
      }
      return ok;
    };

    // live clear-on-input
    form.addEventListener('input', e => {
      const name = e.target.name;
      if (name) setError(name, '');
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearAllErrors();

      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());

      // honeypot — silently ignore bot submissions
      if (data._honey) return;

      if (!validate(data)) {
        showToast('Please review the highlighted fields.', true);
        return;
      }

      submit.classList.add('is-loading');
      submit.disabled = true;

      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json().catch(() => ({}));
        if (json && (json.success === false || json.success === 'false')) {
          throw new Error(json.message || 'Submission failed');
        }
        form.reset();
        showToast('Thank you — your message has been sent. We\'ll be in touch.');
        if ('speechSynthesis' in window) {
          const utter = new SpeechSynthesisUtterance('HURRAY, YOUR FORM is SUBMITTED SUCCESSFULLY');
          utter.rate = 1;
          utter.pitch = 1;
          speechSynthesis.cancel();
          speechSynthesis.speak(utter);
        }
      } catch (err) {
        console.error('[Enquiry]', err);
        showToast('Something went wrong. Please email us directly at studio@atelier.example.com.', true);
      } finally {
        submit.classList.remove('is-loading');
        submit.disabled = false;
      }
    });
  })();

  /* ----------------------------------------------------------
     11. Back to top
  ---------------------------------------------------------- */
  (function backToTop() {
    const btn = $('#toTop');
    if (!btn) return;
    const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 600);
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  })();

  /* ----------------------------------------------------------
     Footer year
  ---------------------------------------------------------- */
  (function year() {
    const el = $('#year');
    if (el) el.textContent = new Date().getFullYear();
  })();

})();
