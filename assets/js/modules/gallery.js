/**
 * Galeria em masonry (colunas) com lightbox.
 * O lightbox usa <dialog> nativo: foco preso, fundo inerte e Esc já
 * funcionam por padrão, com fallback para navegadores antigos.
 */
import { el, qs, render, lockScroll, unlockScroll, trapFocus } from './dom.js';
import { icon } from './icons.js';
import { galleryImages } from '../data/gallery.js';

export function initGallery() {
  const grid = qs('#gallery-grid');
  if (!grid) return;

  const lightbox = buildLightbox();
  document.body.appendChild(lightbox.root);

  const tiles = galleryImages.map((image, index) => {
    const button = el('button', {
      className: 'gallery-tile',
      attrs: {
        type: 'button',
        'aria-label': `Ampliar imagem: ${image.alt}`,
        'aria-haspopup': 'dialog'
      },
      children: [
        el('img', {
          attrs: {
            src: image.src,
            alt: image.alt,
            loading: 'lazy',
            decoding: 'async',
            width: String(image.width || 1000),
            height: String(image.height || 750)
          }
        }),
        el('span', {
          className: 'gallery-tile__caption',
          attrs: { 'aria-hidden': 'true' },
          children: [icon('flame', { size: 14, className: 'icon' }), el('span', { text: image.caption })]
        })
      ],
      on: { click: () => lightbox.open(index, button) }
    });
    button.style.setProperty('--stagger', String(Math.min(index, 9)));
    return button;
  });

  render(grid, tiles);
}

function buildLightbox() {
  const image = el('img', { className: 'lightbox__image', attrs: { alt: '' } });
  const caption = el('p', { className: 'lightbox__caption' });
  const counter = el('p', { className: 'lightbox__counter' });

  const closeButton = el('button', {
    className: 'lightbox__button lightbox__close',
    attrs: { type: 'button', 'aria-label': 'Fechar galeria' },
    children: [icon('close', { size: 22 })]
  });
  const prevButton = el('button', {
    className: 'lightbox__button lightbox__nav lightbox__nav--prev',
    attrs: { type: 'button', 'aria-label': 'Imagem anterior' },
    children: [icon('arrowLeft', { size: 24 })]
  });
  const nextButton = el('button', {
    className: 'lightbox__button lightbox__nav lightbox__nav--next',
    attrs: { type: 'button', 'aria-label': 'Próxima imagem' },
    children: [icon('arrowRight', { size: 24 })]
  });

  const figure = el('figure', {
    className: 'lightbox__figure',
    children: [image, el('figcaption', { className: 'lightbox__meta', children: [caption, counter] })]
  });

  const root = el('dialog', {
    className: 'lightbox',
    attrs: { 'aria-label': 'Galeria de fotos do Wotan’s House' },
    children: [
      el('div', { className: 'lightbox__inner', children: [closeButton, prevButton, figure, nextButton] })
    ]
  });

  let index = 0;
  let opener = null;
  let releaseFocus = null;
  const supportsDialog = typeof root.showModal === 'function';

  function show(i) {
    index = (i + galleryImages.length) % galleryImages.length;
    const item = galleryImages[index];
    image.classList.remove('is-loaded');
    image.setAttribute('src', item.src);
    image.setAttribute('alt', item.alt);
    image.setAttribute('width', String(item.width || 1000));
    image.setAttribute('height', String(item.height || 750));
    caption.textContent = item.caption;
    counter.textContent = `${index + 1} / ${galleryImages.length}`;
    if (image.complete) image.classList.add('is-loaded');
  }

  image.addEventListener('load', () => image.classList.add('is-loaded'));

  function open(i, trigger) {
    opener = trigger || null;
    show(i);
    if (supportsDialog) root.showModal();
    else root.setAttribute('open', '');
    lockScroll();
    if (!supportsDialog) releaseFocus = trapFocus(root);
    closeButton.focus({ preventScroll: true });
  }

  function close() {
    if (supportsDialog) root.close();
    else root.removeAttribute('open');
    unlockScroll();
    if (releaseFocus) {
      releaseFocus();
      releaseFocus = null;
    }
    if (opener) opener.focus({ preventScroll: true });
  }

  closeButton.addEventListener('click', close);
  prevButton.addEventListener('click', () => show(index - 1));
  nextButton.addEventListener('click', () => show(index + 1));

  root.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(index - 1);
    } else if (event.key === 'Escape' && !supportsDialog) {
      close();
    }
  });

  // clique fora da imagem fecha
  root.addEventListener('click', (event) => {
    if (event.target === root || event.target.classList.contains('lightbox__inner')) close();
  });

  // gesto de arrastar no celular
  let touchStartX = 0;
  let touchStartY = 0;
  root.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
      touchStartY = event.changedTouches[0].clientY;
    },
    { passive: true }
  );
  root.addEventListener(
    'touchend',
    (event) => {
      const dx = event.changedTouches[0].clientX - touchStartX;
      const dy = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
    },
    { passive: true }
  );

  return { root, open };
}
