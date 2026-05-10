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
    document.querySelectorAll('.pkg-expand-btn').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.textContent = 'Scopri di più ↓';
      const d = b.closest('.pkg-card')?.querySelector('.pkg-card-detail');
      if (d) d.style.maxHeight = '0';
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ── Card expand / collapse ── */
document.querySelectorAll('.pkg-expand-btn').forEach(expandBtn => {
  expandBtn.addEventListener('click', () => {
    const card = expandBtn.closest('.pkg-card');
    const detail = card.querySelector('.pkg-card-detail');
    const isOpen = expandBtn.getAttribute('aria-expanded') === 'true';

    // close all other cards
    document.querySelectorAll('.pkg-expand-btn').forEach(b => {
      if (b === expandBtn) return;
      b.setAttribute('aria-expanded', 'false');
      b.textContent = 'Scopri di più ↓';
      const d = b.closest('.pkg-card')?.querySelector('.pkg-card-detail');
      if (d) d.style.maxHeight = '0';
    });

    if (!isOpen) {
      expandBtn.setAttribute('aria-expanded', 'true');
      expandBtn.textContent = 'Chiudi ↑';
      // scrollHeight can be 0 on some mobile browsers when max-height:0 is set;
      // fall back to a large value so the transition always fires correctly.
      const h = detail.scrollHeight;
      detail.style.maxHeight = (h > 0 ? h : 9999) + 'px';
    } else {
      expandBtn.setAttribute('aria-expanded', 'false');
      expandBtn.textContent = 'Scopri di più ↓';
      detail.style.maxHeight = '0';
      setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 310);
    }
  });
});
