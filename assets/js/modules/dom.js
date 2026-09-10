/**
 * Utilitários de DOM.
 *
 * Segurança: toda a interface é construída com createElement + textContent.
 * Nada usa innerHTML, portanto nenhum dado de configuração ou de cardápio
 * é interpretado como HTML — mesmo que alguém cole um `<script>` dentro de
 * uma descrição de produto, ele aparece como texto puro (defesa contra XSS
 * por dado malformado).
 */

/** Protocolos aceitos em links gerados por JavaScript. */
const SAFE_PROTOCOLS = ['https:', 'http:', 'tel:', 'mailto:'];

/**
 * Devolve a URL apenas se ela for segura; caso contrário, devolve '#'.
 * Bloqueia `javascript:`, `data:` e afins, que poderiam ser introduzidos
 * por engano ao editar a configuração.
 * @param {string} url
 * @returns {string}
 */
export function safeUrl(url) {
  const value = String(url || '').trim();
  if (!value) return '#';
  // Caminhos relativos e âncoras internas são sempre seguros.
  if (/^[./#?]/.test(value)) return value;
  try {
    const parsed = new URL(value, window.location.origin);
    return SAFE_PROTOCOLS.includes(parsed.protocol) ? value : '#';
  } catch {
    return '#';
  }
}

/**
 * Cria um elemento.
 * @param {string} tag
 * @param {Object} [options] className, text, attrs, dataset, children, on
 * @returns {HTMLElement}
 */
export function el(tag, options = {}) {
  const node = document.createElement(tag);

  if (options.className) node.className = options.className;
  if (options.text != null) node.textContent = String(options.text);

  if (options.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) {
      if (value == null || value === false) continue;
      const finalValue = key === 'href' || key === 'src' ? safeUrl(value) : String(value);
      node.setAttribute(key, finalValue === true ? '' : finalValue);
    }
  }

  if (options.dataset) {
    for (const [key, value] of Object.entries(options.dataset)) {
      if (value != null) node.dataset[key] = String(value);
    }
  }

  if (options.on) {
    for (const [event, handler] of Object.entries(options.on)) {
      node.addEventListener(event, handler);
    }
  }

  if (options.children) {
    for (const child of options.children) {
      if (child) node.appendChild(child);
    }
  }

  return node;
}

/** Link externo já com as proteções corretas (tabnabbing / referrer). */
export function externalLink(href, options = {}) {
  return el('a', {
    ...options,
    attrs: {
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
      ...(options.attrs || {})
    }
  });
}

export const qs = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/** Substitui todo o conteúdo de um container por novos nós. */
export function render(container, nodes) {
  container.replaceChildren(...(Array.isArray(nodes) ? nodes.filter(Boolean) : [nodes]));
}

/** Usuário pediu menos movimento no sistema operacional? */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Mantém o foco do teclado dentro de um container (menu mobile, lightbox).
 * @param {HTMLElement} container
 * @returns {() => void} função para liberar o foco
 */
export function trapFocus(container) {
  const SELECTOR =
    'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

  function onKeydown(event) {
    if (event.key !== 'Tab') return;
    const focusable = qsa(SELECTOR, container).filter(
      (node) => node.offsetParent !== null || node === document.activeElement
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  container.addEventListener('keydown', onKeydown);
  return () => container.removeEventListener('keydown', onKeydown);
}

/** Trava o scroll da página sem causar salto de layout. */
let scrollLocks = 0;
export function lockScroll() {
  scrollLocks += 1;
  if (scrollLocks > 1) return;
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbar}px`);
  document.body.classList.add('is-scroll-locked');
}

export function unlockScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks === 0) document.body.classList.remove('is-scroll-locked');
}
