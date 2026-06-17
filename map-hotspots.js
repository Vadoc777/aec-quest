(function () {
  const obj = document.getElementById('questMapObj');
  function hookup() {
    try {
      if (!obj || !obj.contentDocument) return;
      const svgDoc = obj.contentDocument;
      svgDoc.querySelectorAll('.hotspot').forEach(el => {
        // click -> jump to the matching phase element
        el.addEventListener('click', () => {
          const chapterName = el.getAttribute('data-chapter');
          const idx = CHAPTERS.findIndex(c => c.name === chapterName);
          if (idx > -1) jumpPhase('phase-' + idx);
        });
        // keyboard operability
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'button');
        el.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
        });
      });
    } catch (e) {
      // silent fail if cross-origin or not available yet
    }
  }
  if (obj) {
    obj.addEventListener('load', hookup);
    // fallback attempt in case load already fired
    setTimeout(hookup, 300);
  }
})();

