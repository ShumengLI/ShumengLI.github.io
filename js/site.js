/* Dependency-free enhancements for the static homepage. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const body = document.body;
  const menu = document.querySelector('#navbar-content');
  const menuToggle = document.querySelector('.navbar-toggler');
  const themeToggle = document.querySelector('.theme-dropdown > a');
  const themeMenu = document.querySelector('.theme-dropdown .dropdown-menu');
  const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
  let theme = '2';
  try { theme = localStorage.getItem('wcTheme') || '2'; } catch { /* Storage can be disabled. */ }
  if (!['0', '1', '2'].includes(theme)) theme = '2';
  function applyTheme() {
    body.classList.toggle('dark', theme === '1' || (theme === '2' && colorScheme.matches));
    ['light', 'dark', 'auto'].forEach((name, index) => {
      document.querySelector(`.js-set-theme-${name}`).classList.toggle('dropdown-item-active', theme === String(index));
    });
  }
  applyTheme();
  colorScheme.addEventListener('change', applyTheme);
  function closeThemeMenu() {
    themeMenu.classList.remove('show');
    themeToggle.setAttribute('aria-expanded', 'false');
  }
  themeToggle.setAttribute('aria-expanded', 'false');
  themeToggle.addEventListener('click', event => {
    event.preventDefault();
    themeToggle.setAttribute('aria-expanded', String(themeMenu.classList.toggle('show')));
  });
  ['light', 'dark', 'auto'].forEach((name, index) => {
    document.querySelector(`.js-set-theme-${name}`).addEventListener('click', event => {
      event.preventDefault();
      theme = String(index);
      try { localStorage.setItem('wcTheme', theme); } catch { /* Applies for this visit. */ }
      applyTheme();
      closeThemeMenu();
    });
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.theme-dropdown')) closeThemeMenu();
  });
  function closeMenu() {
    menu.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  menuToggle.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', String(menu.classList.toggle('show')));
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  const navLinks = [...menu.querySelectorAll('a[href*="#"]')];
  const sections = [...document.querySelectorAll('main > section[id]')];
  let scrollPending = false;
  function updateActiveLink() {
    let current = sections[0]?.id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 110) current = section.id;
    }
    if (current === 'info') current = 'about';
    navLinks.forEach(link => {
      const active = link.hash === `#${current}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollPending) {
      scrollPending = true;
      requestAnimationFrame(updateActiveLink);
    }
  }, { passive: true });
  updateActiveLink();

  // Index visible content so search cannot drift away from the actual homepage.
  const search = document.querySelector('#search');
  const query = document.querySelector('#search-query');
  const hits = document.querySelector('#search-hits');
  const content = [...document.querySelectorAll('[data-searchable]')]
    .filter(element => element.id !== 'publications')
    .map(element => ({
      id: element.id,
      title: (element.querySelector('h1, .publication-title, a')?.textContent || element.id).trim(),
      text: element.textContent.replace(/\s+/g, ' ').trim()
    }));
  let previousFocus = null;
  function renderResults() {
    const terms = query.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    hits.replaceChildren();
    if (!terms.length) return;
    const matches = content.filter(item => terms.every(term => item.text.toLocaleLowerCase().includes(term)));
    const status = document.createElement('p');
    status.textContent = matches.length ? `${matches.length} results found` : 'No results found';
    hits.append(status);
    matches.forEach(item => {
      const result = document.createElement('article');
      result.className = 'search-hit';
      const link = document.createElement('a');
      link.href = `#${item.id}`;
      link.textContent = item.title;
      link.addEventListener('click', () => {
        setSearch(false, false);
        const target = document.getElementById(item.id);
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
      const snippet = document.createElement('p');
      const firstMatch = item.text.toLocaleLowerCase().indexOf(terms[0]);
      const start = Math.max(0, firstMatch - 70);
      snippet.textContent = `${start ? '…' : ''}${item.text.slice(start, start + 260)}${item.text.length > start + 260 ? '…' : ''}`;
      result.append(link, snippet);
      hits.append(result);
    });
  }
  function setSearch(open, restoreFocus = true) {
    if (open) previousFocus = document.activeElement;
    body.classList.toggle('searching', open);
    search.setAttribute('aria-hidden', String(!open));
    document.querySelector('main').inert = open;
    document.querySelector('.page-header').inert = open;
    if (open) { renderResults(); query.focus(); }
    else {
      const url = new URL(location.href);
      url.searchParams.delete('q');
      history.replaceState(null, '', url);
      if (restoreFocus) previousFocus?.focus();
    }
  }
  document.querySelectorAll('.js-search').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    setSearch(!body.classList.contains('searching'));
  }));
  query.addEventListener('input', renderResults);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (body.classList.contains('searching')) setSearch(false);
      closeThemeMenu();
      closeMenu();
    }
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey &&
        !event.target.closest('input, textarea, select, [contenteditable="true"]')) {
      event.preventDefault();
      if (!body.classList.contains('searching')) setSearch(true);
    }
    if (event.key === 'Tab' && body.classList.contains('searching')) {
      const focusable = [...search.querySelectorAll('a[href], input')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  const initialQuery = new URLSearchParams(location.search).get('q');
  if (initialQuery) { query.value = initialQuery; setSearch(true); }
})();
