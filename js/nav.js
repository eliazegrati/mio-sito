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

/* ── Smooth scroll per anchor (#) con offset header fisso ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const navHeight = (document.getElementById('site-header')?.offsetHeight ?? 64) + 8;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    history.pushState(null, '', `#${id}`);
  });
});
