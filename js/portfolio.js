/* ── Espandi case study ── */
document.querySelectorAll('.case-toggle').forEach(btn => {
  const card    = btn.closest('.case-card');
  const details = card?.querySelector('.case-details');
  if (!details) return;

  btn.addEventListener('click', () => {
    const isOpen = details.classList.contains('open');
    details.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
    btn.innerHTML = isOpen
      ? 'Leggi il case study <span aria-hidden="true">↓</span>'
      : 'Chiudi <span aria-hidden="true">↑</span>';
  });
});
