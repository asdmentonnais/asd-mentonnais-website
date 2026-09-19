// ASDM — vanilla interactions for the Nocturne redesign.
// Each block no-ops if its markup isn't on the current page.

// ── Home: training day filter ──────────────────────────────────────────
(function () {
  const bar = document.querySelector('[data-role="training-filters"]');
  if (!bar) return;
  const buttons = bar.querySelectorAll('[data-filter]');
  const days = document.querySelectorAll('[data-role="training-day"]');

  function apply(filter) {
    buttons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.filter === filter));
    days.forEach((day) => {
      const slots = day.querySelectorAll('[data-cat]');
      let visible = 0;
      slots.forEach((slot) => {
        const match = filter === 'tous' || slot.dataset.cat === filter;
        slot.hidden = !match;
        if (match) visible += 1;
      });
      const empty = day.querySelector('[data-role="day-empty"]');
      if (empty) empty.hidden = visible !== 0;
      const count = day.querySelector('[data-role="day-count"]');
      if (count) count.textContent = visible === 0 ? '—' : visible + (visible > 1 ? ' séances' : ' séance');
    });
  }

  buttons.forEach((btn) => btn.addEventListener('click', () => apply(btn.dataset.filter)));
})();

// ── Home: jersey side toggle ────────────────────────────────────────────
(function () {
  const bar = document.querySelector('[data-role="jersey-toggle"]');
  if (!bar) return;
  const buttons = bar.querySelectorAll('[data-side]');
  const images = document.querySelectorAll('[data-role="jersey-img"]');

  function apply(side) {
    buttons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.side === side));
    images.forEach((img) => img.classList.toggle('is-active', img.dataset.side === side));
  }

  buttons.forEach((btn) => btn.addEventListener('click', () => apply(btn.dataset.side)));
})();

// ── Calendrier: discipline filter ──────────────────────────────────────
(function () {
  const bar = document.querySelector('[data-role="cal-filters"]');
  if (!bar) return;
  const buttons = bar.querySelectorAll('[data-kind]');
  const months = document.querySelectorAll('[data-role="cal-month"]');
  const label = document.querySelector('[data-role="cal-result-label"]');

  function apply(kind) {
    buttons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.kind === kind));
    let total = 0;
    months.forEach((month) => {
      const events = month.querySelectorAll('[data-kind-event]');
      let visible = 0;
      events.forEach((ev) => {
        const match = kind === 'Tous' || ev.dataset.kindEvent === kind;
        ev.hidden = !match;
        if (match) visible += 1;
      });
      month.hidden = visible === 0;
      total += visible;
    });
    if (label) {
      const suffix = kind === 'Tous' ? ' sur la saison' : ' · ' + kind;
      label.textContent = total + (total > 1 ? ' événements' : ' événement') + suffix;
    }
  }

  buttons.forEach((btn) => btn.addEventListener('click', () => apply(btn.dataset.kind)));
})();
