// Simple dark mode toggle with persistence and system preference fallback
(function() {
  const storageKey = 'theme';
  const toggleId = 'theme-toggle';

  function setTheme(dark, persist=true) {
    const doc = document.documentElement;
    if (dark) {
      doc.setAttribute('data-theme', 'dark');
      doc.classList.add('dark');
      const btn = document.getElementById(toggleId);
      if (btn) btn.textContent = '☀️';
      if (persist) localStorage.setItem(storageKey, 'dark');
    } else {
      doc.removeAttribute('data-theme');
      doc.classList.remove('dark');
      const btn = document.getElementById(toggleId);
      if (btn) btn.textContent = '🌙';
      if (persist) localStorage.setItem(storageKey, 'light');
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById(toggleId);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = localStorage.getItem(storageKey);

    if (stored === 'dark') setTheme(true, false);
    else if (stored === 'light') setTheme(false, false);
    else setTheme(prefersDark, false);

    if (toggle) {
      toggle.addEventListener('click', function() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(!isDark, true);
      });
    }
  });
})();
