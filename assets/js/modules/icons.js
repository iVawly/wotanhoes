/**
 * Ícones SVG inline.
 * Criados via createElementNS (sem innerHTML) e sempre decorativos:
 * recebem aria-hidden, então o texto do botão é o que o leitor de tela lê.
 */

const NS = 'http://www.w3.org/2000/svg';

/** Ícones "line" (traçado). */
const STROKE_PATHS = {
  phone: ['M6.5 3.5h3l1.5 3.8-2 1.4a11.5 11.5 0 0 0 5.3 5.3l1.4-2 3.8 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z'],
  pin: ['M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z', 'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 7.2V12l3.2 2'],
  instagram: [
    'M7.5 3.5h9a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4z',
    'M12 15.6a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2z',
    'M17.2 7.1h.01'
  ],
  bag: ['M5 8h14l-1.1 11.2a2 2 0 0 1-2 1.8H8.1a2 2 0 0 1-2-1.8z', 'M9 8V6.5a3 3 0 0 1 6 0V8'],
  flame: ['M12 2.5c2.9 3.9 4.9 6 4.9 9a4.9 4.9 0 0 1-9.8 0c0-1.2.5-2.3 1.4-3.3.3 1.2 1 2 1.9 2.2C9.9 8.6 10.5 5.6 12 2.5z'],
  steak: ['M4.2 10.4c0-3.4 3.5-6.2 7.8-6.2s7.8 2.8 7.8 6.2-3.5 8.4-7.8 8.4-7.8-5-7.8-8.4z', 'M9 9.5c1.6-1 3.6-1 5.2 0'],
  beer: ['M6 6.6h9.2v12.8H6z', 'M15.2 9h2.4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2.4', 'M6 10.4h9.2'],
  lantern: ['M8.4 4.6h7.2l1.2 3.2v9.4a2.4 2.4 0 0 1-2.4 2.4H9.6a2.4 2.4 0 0 1-2.4-2.4V7.8z', 'M12 2.4v2.2', 'M7.2 8.4h9.6'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  arrowLeft: ['M15 5l-7 7 7 7'],
  arrowRight: ['M9 5l7 7-7 7'],
  arrowDown: ['M12 4v15', 'M6 13.5 12 19.5l6-6'],
  chevronRight: ['M9.5 5.5 16 12l-6.5 6.5'],
  route: ['M6.5 8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', 'M17.5 20.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', 'M6.5 8.5v4a5.5 5.5 0 0 0 5.5 5.5h5.5'],
  mail: ['M4 6h16v12H4z', 'm4.6 6.7 7.4 5.6 7.4-5.6'],
  check: ['m5 12.5 4.5 4.5L19 7.5']
};

/** WhatsApp precisa de um traçado próprio (marca). */
const WHATSAPP_PATH =
  'M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2.1 22l5.36-1.4a9.8 9.8 0 0 0 4.58 1.16h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.03-5.1-2.89-6.96A9.75 9.75 0 0 0 12.04 2zm0 1.8c2.15 0 4.17.84 5.69 2.36a7.98 7.98 0 0 1 2.36 5.68c0 4.44-3.61 8.05-8.06 8.05a8.1 8.1 0 0 1-4.1-1.12l-.3-.18-3.05.8.81-2.98-.19-.31a7.99 7.99 0 0 1-1.23-4.26c0-4.44 3.62-8.04 8.07-8.04zm-3.3 4.3c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.68 4.1 3.66 1.98.8 2.38.64 2.82.6.42-.04 1.38-.56 1.58-1.12.2-.56.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28-.24-.12-1.38-.68-1.6-.76-.22-.08-.38-.12-.54.12-.16.24-.6.76-.74.92-.14.16-.28.18-.52.06-.24-.12-1-.36-1.9-1.16-.7-.62-1.18-1.4-1.32-1.64-.14-.24-.02-.36.1-.48.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.52-1.28-.72-1.76-.2-.46-.4-.4-.54-.4h-.48z';

/**
 * @param {string} name chave em STROKE_PATHS ou 'whatsapp'
 * @param {Object} [options] size, className, strokeWidth
 * @returns {SVGElement}
 */
export function icon(name, options = {}) {
  const size = options.size || 20;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  if (options.className) svg.setAttribute('class', options.className);

  if (name === 'whatsapp') {
    svg.setAttribute('fill', 'currentColor');
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', WHATSAPP_PATH);
    svg.appendChild(path);
    return svg;
  }

  const paths = STROKE_PATHS[name] || STROKE_PATHS.flame;
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', String(options.strokeWidth || 1.6));
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  for (const d of paths) {
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', d);
    svg.appendChild(path);
  }
  return svg;
}
