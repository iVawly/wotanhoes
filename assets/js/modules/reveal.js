/**
 * Animações de entrada ao rolar a página.
 * Leve de propósito: um único IntersectionObserver, sem biblioteca, e
 * cada elemento deixa de ser observado assim que aparece.
 * Quem pediu "menos movimento" no sistema vê tudo já posicionado.
 */
import { qsa, prefersReducedMotion } from './dom.js';

export function initReveal() {
  const targets = qsa('[data-reveal]');
  if (targets.length === 0) return;

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach((node) => node.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
  );

  targets.forEach((node) => observer.observe(node));
}

/**
 * Reobserva conteúdo criado depois da carga inicial (cards do cardápio,
 * por exemplo). Usa a mesma regra de movimento reduzido.
 */
export function revealNow(nodes) {
  nodes.forEach((node) => node.classList.add('is-visible'));
}
