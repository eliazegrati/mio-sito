/* ── Fade-in on scroll ── */
const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Hero parallax ── */
(function () {
  const pL = document.querySelector('.hero-parallax-l');
  const pR = document.querySelector('.hero-parallax-r');
  if (!pL || !pR) return;

  const heroEl = document.querySelector('.hero');
  let heroH = heroEl ? heroEl.offsetHeight : window.innerHeight;

  window.addEventListener('resize', () => {
    heroH = heroEl ? heroEl.offsetHeight : window.innerHeight;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y >= heroH) return;
    /* Copy sale più veloce (0.14), finestra sale più lentamente (0.06) */
    pL.style.transform = `translateY(${y * 0.14}px)`;
    pR.style.transform = `translateY(${y * 0.06}px)`;
  }, { passive: true });
}());
