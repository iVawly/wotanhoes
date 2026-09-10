/**
 * Cabeçalho: estado ao rolar, menu mobile acessível e indicação da
 * seção ativa. Os links são âncoras reais no HTML — sem JavaScript a
 * navegação continua funcionando.
 */
import { qs, qsa, trapFocus, lockScroll, unlockScroll } from './dom.js';

const DESKTOP_QUERY = '(min-width: 62rem)';

export function initNav() {
  const header = qs('#site-header');
  const toggle = qs('#nav-toggle');
  const panel = qs('#mobile-nav');
  const backdrop = qs('#nav-backdrop');
  if (!header || !toggle || !panel) return;

  let releaseFocus = null;
  const desktop = window.matchMedia(DESKTOP_QUERY);

  /* ---------------- menu mobile ---------------- */
  function openMenu() {
    panel.hidden = false;
    // força um frame antes da classe para a transição acontecer
    requestAnimationFrame(() => document.body.classList.add('is-nav-open'));
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu de navegação');
    lockScroll();
    releaseFocus = trapFocus(panel);
    const firstLink = qs('a, button', panel);
    if (firstLink) firstLink.focus({ preventScroll: true });
  }

  function closeMenu({ restoreFocus = true } = {}) {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    document.body.classList.remove('is-nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu de navegação');
    unlockScroll();
    if (releaseFocus) {
      releaseFocus();
      releaseFocus = null;
    }
    if (restoreFocus) toggle.focus({ preventScroll: true });

    // esconde de fato só ao fim da animação, para não cortar a transição
    const hide = () => {
      if (toggle.getAttribute('aria-expanded') === 'false') panel.hidden = true;
    };
    panel.addEventListener('transitionend', hide, { once: true });
    window.setTimeout(hide, 400);
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else openMenu();
  });

  if (backdrop) backdrop.addEventListener('click', () => closeMenu());

  panel.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu({ restoreFocus: false });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  // Ao voltar para desktop, o menu mobile não pode ficar preso aberto.
  const onBreakpoint = (event) => {
    if (event.matches) closeMenu({ restoreFocus: false });
  };
  if (typeof desktop.addEventListener === 'function') desktop.addEventListener('change', onBreakpoint);
  else desktop.addListener(onBreakpoint);

  /* ---------------- header ao rolar ---------------- */
  let ticking = false;
  const applyScrollState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(applyScrollState);
    },
    { passive: true }
  );
  applyScrollState();

  /* ---------------- seção ativa ---------------- */
  initScrollSpy();
}

function initScrollSpy() {
  const links = qsa('[data-nav-link]');
  if (links.length === 0 || !('IntersectionObserver' in window)) return;

  const byId = new Map();
  const sections = [];
  for (const link of links) {
    const id = (link.getAttribute('href') || '').replace('#', '');
    const section = id ? document.getElementById(id) : null;
    if (!section) continue;
    if (!byId.has(id)) {
      byId.set(id, []);
      sections.push(section);
    }
    byId.get(id).push(link);
  }

  const visible = new Set();

  const setActive = (id) => {
    for (const [key, group] of byId.entries()) {
      for (const link of group) {
        if (key === id) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      }
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      // a seção ativa é a primeira visível na ordem do documento
      const current = sections.find((section) => visible.has(section.id));
      setActive(current ? current.id : null);
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}
