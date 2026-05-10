/* ── Accessibilità tastiera per pkg-card ── */
document.querySelectorAll('.pkg-card').forEach(card => {
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
  });
});

/* ── Tab switching ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-selected', String(b === btn));
    });
    document.querySelectorAll('.tab-pane').forEach(p => {
      p.classList.toggle('active', p.id === `pane-${target}`);
    });
    document.querySelectorAll('.pkg-detail').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.pkg-card').forEach(c => c.classList.remove('selected'));
  });
});

/* ── Card click → detail panel ── */
document.querySelectorAll('.pkg-card').forEach(card => {
  card.addEventListener('click', () => {
    const detailId = card.dataset.detail;
    if (!detailId) return;
    const detail = document.getElementById(detailId);
    if (!detail) return;

    const isOpen = detail.classList.contains('open');

    document.querySelectorAll('.pkg-detail').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.pkg-card').forEach(c => c.classList.remove('selected'));

    if (!isOpen) {
      detail.classList.add('open');
      card.classList.add('selected');
      setTimeout(() => detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
    }
  });
});

/* ── Chiudi dettaglio ── */
document.querySelectorAll('.pkg-close-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    btn.closest('.pkg-detail')?.classList.remove('open');
    document.querySelectorAll('.pkg-card').forEach(c => c.classList.remove('selected'));
  });
});
