/**
 * Liga a configuração central (config.js) ao HTML.
 * Qualquer elemento marcado com data-link / data-text recebe o valor
 * correspondente — assim WhatsApp, iFood, Instagram, telefone, endereço
 * e horários existem em um único lugar.
 */
import { el, qs, qsa, render, safeUrl } from './dom.js';
import { icon } from './icons.js';
import { restaurantConfig, whatsappUrl, phoneUrl } from '../config.js';

const cfg = restaurantConfig;

/** Chaves aceitas em data-link. */
const LINKS = {
  whatsapp: () => whatsappUrl(),
  'whatsapp-reserva': () => whatsappUrl(cfg.contact.whatsappReservationMessage),
  ifood: () => cfg.links.ifood,
  instagram: () => cfg.links.instagram,
  maps: () => cfg.links.maps,
  phone: () => phoneUrl(),
  email: () => `mailto:${cfg.contact.email}`
};

/** Chaves aceitas em data-text. */
const TEXTS = {
  'brand.name': () => cfg.brand.name,
  'brand.tagline': () => cfg.brand.tagline,
  'brand.intro': () => cfg.brand.intro,
  'contact.whatsapp': () => cfg.contact.whatsappDisplay,
  'contact.phone': () => cfg.contact.phoneDisplay,
  'contact.email': () => cfg.contact.email,
  'contact.instagram': () => cfg.contact.instagramHandle,
  'address.street': () => cfg.address.street,
  'address.reference': () => cfg.address.reference,
  'address.country': () => cfg.address.country,
  'address.oneLine': () => cfg.address.oneLine,
  'copyright.year': () => String(cfg.brand.copyrightYear)
};

const EXTERNAL = new Set(['whatsapp', 'whatsapp-reserva', 'ifood', 'instagram', 'maps']);

export function initSiteInfo() {
  bindLinks();
  bindTexts();
  renderHours();
  renderOpenState();
}

function bindLinks() {
  for (const node of qsa('[data-link]')) {
    const key = node.dataset.link;
    const resolve = LINKS[key];
    if (!resolve) continue;

    node.setAttribute('href', safeUrl(resolve()));
    if (EXTERNAL.has(key)) {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    }
  }
}

function bindTexts() {
  for (const node of qsa('[data-text]')) {
    const resolve = TEXTS[node.dataset.text];
    if (resolve) node.textContent = resolve();
  }
}

function renderHours() {
  const container = qs('#hours-list');
  if (!container) return;

  const rows = cfg.hours.map((entry) =>
    el('div', {
      className: `hours-row${entry.closed ? ' hours-row--closed' : ''}`,
      children: [
        el('dt', { className: 'hours-row__days', text: entry.days }),
        el('dd', {
          className: 'hours-row__time',
          children: [
            entry.closed ? el('span', { className: 'hours-row__dot', attrs: { 'aria-hidden': 'true' } }) : null,
            el('span', { text: entry.time })
          ]
        })
      ]
    })
  );

  render(container, rows);
}

/**
 * Selo "Aberto agora / Fechado".
 * Cálculo apenas informativo, feito com o relógio do próprio visitante.
 */
function renderOpenState() {
  const badge = qs('#open-state');
  if (!badge) return;

  const state = currentOpenState(new Date());
  badge.classList.toggle('is-open', state.open);
  badge.classList.toggle('is-closed', !state.open);
  render(badge, [
    el('span', { className: 'open-state__dot', attrs: { 'aria-hidden': 'true' } }),
    el('span', { className: 'open-state__label', text: state.label })
  ]);
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function toMinutes(time) {
  const [h, m] = String(time).split(':').map(Number);
  return h * 60 + (m || 0);
}

export function currentOpenState(now) {
  const today = WEEKDAYS[now.getDay()];
  const minutes = now.getHours() * 60 + now.getMinutes();
  const entry = cfg.hours.find((h) => h.schemaDays.includes(today));

  if (!entry || entry.closed || !entry.opens || !entry.closes) {
    return { open: false, label: 'Fechado hoje' };
  }

  const opens = toMinutes(entry.opens);
  const closes = toMinutes(entry.closes);
  const isOpen = closes > opens ? minutes >= opens && minutes < closes : minutes >= opens || minutes < closes;

  return isOpen ? { open: true, label: `Aberto agora até ${entry.closes}` } : { open: false, label: `Hoje das ${entry.opens} às ${entry.closes}` };
}

/**
 * Botão flutuante de WhatsApp: aparece depois que o visitante passa do
 * hero, para não cobrir o conteúdo logo na abertura da página.
 */
export function initFloatingWhatsApp() {
  const floater = qs('#whatsapp-float');
  const hero = qs('#inicio');
  if (!floater) return;

  const label = qs('.whatsapp-float__label', floater);
  if (label && !label.textContent.trim()) label.textContent = 'Fale conosco';
  const iconSlot = qs('.whatsapp-float__icon', floater);
  if (iconSlot && !iconSlot.childElementCount) iconSlot.appendChild(icon('whatsapp', { size: 26 }));

  if (!hero || !('IntersectionObserver' in window)) {
    floater.classList.add('is-visible');
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => floater.classList.toggle('is-visible', !entry.isIntersecting),
    { rootMargin: '-72px 0px 0px 0px', threshold: 0 }
  );
  observer.observe(hero);
}
