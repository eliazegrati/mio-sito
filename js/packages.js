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
      const match = b.dataset.tab === target;
      b.classList.toggle('active', match);
      b.setAttribute('aria-selected', String(match));
    });
    document.querySelectorAll('.tab-pane').forEach(p => {
      p.classList.toggle('active', p.id === `pane-${target}`);
    });
    document.querySelectorAll('.pkg-detail').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.pkg-card').forEach(c => c.classList.remove('selected'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

const isMobileLayout = () => window.matchMedia('(max-width: 860px)').matches;
const NAV_H = 72; // altezza header fisso

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

      if (isMobileLayout()) {
        // Su mobile: attendo fine animazione (450ms) poi porto la card in cima
        setTimeout(() => {
          const top = card.getBoundingClientRect().top + window.scrollY - NAV_H - 12;
          window.scrollTo({ top, behavior: 'smooth' });
        }, 460);
      } else {
        setTimeout(() => detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
      }
    }
  });
});

/* ── Chiudi dettaglio ── */
document.querySelectorAll('.pkg-close-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const detail = btn.closest('.pkg-detail');
    const detailId = detail?.id;
    const card = detailId ? document.querySelector(`[data-detail="${detailId}"]`) : null;

    detail?.classList.remove('open');
    document.querySelectorAll('.pkg-card').forEach(c => c.classList.remove('selected'));

    // Su mobile: torna alla card, non lasciare l'utente nel footer
    if (card && isMobileLayout()) {
      setTimeout(() => {
        const top = card.getBoundingClientRect().top + window.scrollY - NAV_H - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 60);
    }
  });
});
