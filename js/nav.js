/* ── Sticky header shadow ── */
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Mobile menu ── */
const toggle = document.getElementById('nav-toggle');
const menu   = document.getElementById('nav-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open', !open);
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!header.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Voce attiva basata su pathname ── */
const path = window.location.pathname.replace(/\/$/, '') || '/index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = (link.getAttribute('href') || '').split('#')[0];
  if (!href) return;
  const norm = href.replace(/^\.?\//, '');
  if (path.endsWith(norm) && norm !== '') link.classList.add('active');
});
