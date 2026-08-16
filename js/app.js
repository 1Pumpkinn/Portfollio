// ---------------------------------------------------------
// Typewriter effect for the hero "plugin.yml" panel
// ---------------------------------------------------------
(function typewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [
    'name: ElementPlugin',
    'main: saturn.elementPlugin.ElementPlugin',
    'version: 1.2.0',
    'api-version: "1.21.10"',
    'load: STARTUP',
    'authors: [ ___Pumpkinn ]',
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
