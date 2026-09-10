/**
 * WOTAN'S HOUSE — ponto de entrada.
 * Módulos ES nativos, sem build e sem dependências externas.
 */
import { initNav } from './modules/nav.js';
import { initMenu, initFeatured } from './modules/menu.js';
import { initGallery } from './modules/gallery.js';
import { initReveal } from './modules/reveal.js';
import { initSiteInfo, initFloatingWhatsApp } from './modules/site-info.js';
import { initReservation } from './modules/reservation.js';

function boot() {
  // A ordem importa: primeiro a configuração (links e textos), depois o
  // conteúdo gerado e, por último, as animações que observam esse conteúdo.
  initSiteInfo();
  initFeatured();
  initMenu();
  initGallery();
  initNav();
  initReservation();
  initFloatingWhatsApp();
  initReveal();

  document.documentElement.classList.add('js-ready');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
