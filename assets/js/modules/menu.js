/**
 * Cardápio: filtros por categoria, grade de produtos e destaques da home.
 * Todo o conteúdo vem de assets/js/data/menu.js.
 */
import { el, render, qs, prefersReducedMotion } from './dom.js';
import { icon } from './icons.js';
import { formatPrice } from '../config.js';
import { menuCategories, products, featuredProducts, productsByCategory } from '../data/menu.js';

const ALL = 'todos';
const FADE_MS = 180;

/* -------------------------------------------------------------------
 * Card de produto
 * ------------------------------------------------------------------- */
function productCard(product, index = 0) {
  const media = el('figure', {
    className: 'menu-card__media',
    children: [
      el('img', {
        attrs: {
          src: product.image,
          alt: product.imageAlt || product.name,
          loading: 'lazy',
          decoding: 'async',
          width: '900',
          height: '675'
        }
      })
    ]
  });

  const tags = (product.tags || []).map((tag) => el('li', { className: 'tag', text: tag }));
  if (!product.available) {
    tags.unshift(el('li', { className: 'tag tag--muted', text: 'Indisponível hoje' }));
  }

  const head = el('div', {
    className: 'menu-card__head',
    children: [
      el('h3', { className: 'menu-card__name', text: product.name }),
      el('p', {
        className: 'menu-card__price',
        children: [
          el('span', { className: 'sr-only', text: 'Preço: ' }),
          el('span', { text: formatPrice(product.price) })
        ]
      })
    ]
  });

  const body = el('div', {
    className: 'menu-card__body',
    children: [
      head,
      el('p', { className: 'menu-card__description', text: product.description }),
      tags.length ? el('ul', { className: 'menu-card__tags', children: tags }) : null
    ]
  });

  const card = el('article', {
    className: `menu-card${product.available ? '' : ' is-unavailable'}`,
    dataset: { category: product.category },
    children: [media, body]
  });

  card.style.setProperty('--stagger', String(Math.min(index, 9)));
  return card;
}

/* -------------------------------------------------------------------
 * Grupos por categoria
 * ------------------------------------------------------------------- */
function categoryGroup(category, items) {
  return el('section', {
    className: 'menu-group',
    attrs: { 'aria-labelledby': `grupo-${category.id}` },
    children: [
      el('header', {
        className: 'menu-group__header',
        children: [
          el('h3', { className: 'menu-group__title', attrs: { id: `grupo-${category.id}` }, text: category.label }),
          el('p', { className: 'menu-group__tagline', text: category.tagline }),
          el('span', { className: 'menu-group__rule', attrs: { 'aria-hidden': 'true' } })
        ]
      }),
      el('div', {
        className: 'menu-grid',
        children: items.map((product, i) => productCard(product, i))
      })
    ]
  });
}

function buildGroups(activeCategory) {
  const categories =
    activeCategory === ALL ? menuCategories : menuCategories.filter((c) => c.id === activeCategory);

  return categories
    .map((category) => {
      const items = productsByCategory(category.id);
      return items.length ? categoryGroup(category, items) : null;
    })
    .filter(Boolean);
}

/* -------------------------------------------------------------------
 * Filtros
 * ------------------------------------------------------------------- */
function filterButtons(onSelect) {
  const entries = [{ id: ALL, label: 'Todos' }, ...menuCategories.map((c) => ({ id: c.id, label: c.label }))];

  return entries.map((entry) =>
    el('button', {
      className: 'chip',
      text: entry.label,
      attrs: {
        type: 'button',
        'aria-pressed': entry.id === ALL ? 'true' : 'false',
        'data-filter': entry.id
      },
      on: { click: () => onSelect(entry.id) }
    })
  );
}

/* -------------------------------------------------------------------
 * Inicialização
 * ------------------------------------------------------------------- */
export function initMenu() {
  const filtersContainer = qs('#menu-filters');
  const listContainer = qs('#menu-list');
  const status = qs('#menu-status');
  if (!filtersContainer || !listContainer) return;

  let active = ALL;

  function paint(category) {
    const groups = buildGroups(category);
    render(listContainer, groups);

    if (status) {
      const count = category === ALL ? products.length : productsByCategory(category).length;
      const label = category === ALL ? 'no cardápio completo' : `em ${categoryName(category)}`;
      status.textContent = `${count} ${count === 1 ? 'item' : 'itens'} ${label}.`;
    }
  }

  function select(category) {
    if (category === active) return;
    active = category;

    for (const button of filtersContainer.querySelectorAll('[data-filter]')) {
      button.setAttribute('aria-pressed', button.dataset.filter === category ? 'true' : 'false');
    }

    if (prefersReducedMotion()) {
      paint(category);
      return;
    }

    listContainer.classList.add('is-swapping');
    window.setTimeout(() => {
      paint(category);
      listContainer.classList.remove('is-swapping');
    }, FADE_MS);
  }

  render(filtersContainer, filterButtons(select));
  paint(active);

  // Rolagem horizontal dos filtros com as setas do teclado.
  filtersContainer.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const buttons = Array.from(filtersContainer.querySelectorAll('[data-filter]'));
    const index = buttons.indexOf(document.activeElement);
    if (index === -1) return;
    event.preventDefault();
    const next = event.key === 'ArrowRight' ? (index + 1) % buttons.length : (index - 1 + buttons.length) % buttons.length;
    buttons[next].focus();
  });
}

function categoryName(id) {
  const found = menuCategories.find((c) => c.id === id);
  return found ? found.label : 'nesta categoria';
}

/* -------------------------------------------------------------------
 * Destaques da casa (home)
 * ------------------------------------------------------------------- */
export function initFeatured() {
  const container = qs('#featured-list');
  if (!container) return;

  const cards = featuredProducts(6).map((product, index) => {
    const card = el('article', {
      className: 'featured-card',
      children: [
        el('figure', {
          className: 'featured-card__media',
          children: [
            el('img', {
              attrs: {
                src: product.image,
                alt: product.imageAlt || product.name,
                loading: 'lazy',
                decoding: 'async',
                width: '900',
                height: '675'
              }
            })
          ]
        }),
        el('div', {
          className: 'featured-card__body',
          children: [
            el('p', {
              className: 'featured-card__category',
              children: [icon('flame', { size: 14, className: 'icon' }), el('span', { text: categoryName(product.category) })]
            }),
            el('h3', { className: 'featured-card__name', text: product.name }),
            el('p', { className: 'featured-card__description', text: product.description }),
            el('p', { className: 'featured-card__price', text: formatPrice(product.price) })
          ]
        })
      ]
    });
    card.style.setProperty('--stagger', String(index));
    return card;
  });

  render(container, cards);
}
