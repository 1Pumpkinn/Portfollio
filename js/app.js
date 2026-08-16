// ---------------------------------------------------------
// Typewriter effect for the hero "plugin.yml" panel
// ---------------------------------------------------------
(function typewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [
    'name: PumpkinDev',
    'main: saturn.pumpkinDev.PumpkinDev',
    'version: 1.0.0',
    'api-version: "1.21+"',
    'load: STARTUP',
    'authors: PumpkinDev',
    'status: loading...'
  ];
  const text = lines.join('\n');

  if (reduceMotion) {
    el.textContent = text;
    return;
  }

  let i = 0;
  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 18 + Math.random() * 22);
    }
  }
  type();
})();

// ---------------------------------------------------------
// Scroll-triggered reveal for sections
// ---------------------------------------------------------
(function reveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((t) => observer.observe(t));
})();

// ---------------------------------------------------------
// Lightbox for project screenshots
// ---------------------------------------------------------
(function lightbox() {
  const box = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const triggers = document.querySelectorAll('[data-lightbox]');
  if (!box || !img || !triggers.length) return;

  let lastFocused = null;

  function open(src, caption) {
    lastFocused = document.activeElement;
    img.src = src;
    img.alt = caption || '';
    box.classList.add('is-open');
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    box.classList.remove('is-open');
    img.src = '';
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  triggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      open(btn.dataset.lightbox, btn.dataset.caption);
    });
  });

  closeBtn.addEventListener('click', close);
  box.addEventListener('click', (e) => {
    if (e.target === box) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && box.classList.contains('is-open')) close();
  });
})();
