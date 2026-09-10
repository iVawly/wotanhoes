/**
 * Formulário de reserva.
 *
 * IMPORTANTE: nada é enviado para nenhum servidor e nada é armazenado.
 * O formulário apenas monta o texto de uma mensagem e abre a conversa do
 * WhatsApp do restaurante — quem envia é a pessoa, do próprio aparelho.
 * Se um dia existir um backend recebendo reservas, TODA validação feita
 * aqui precisa ser refeita no servidor: validação de frontend serve para
 * a experiência do usuário, nunca como barreira de segurança.
 */
import { qs, qsa } from './dom.js';
import { whatsappUrl } from '../config.js';

const LIMITS = {
  name: 60,
  notes: 240,
  minPeople: 1,
  maxPeople: 30
};

/** Remove caracteres de controle e espaços repetidos. */
function clean(value, maxLength) {
  return String(value || '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function formatDate(isoDate) {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return '';
  return `${day}/${month}/${year}`;
}

export function initReservation() {
  const form = qs('#reservation-form');
  if (!form) return;

  const feedback = qs('#reservation-feedback');
  const dateInput = qs('#reserva-data', form);

  // Não deixa escolher uma data que já passou.
  if (dateInput) {
    const today = new Date();
    const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = iso;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = clean(data.get('nome'), LIMITS.name);
    const people = Number.parseInt(String(data.get('pessoas') || ''), 10);
    const date = String(data.get('data') || '').slice(0, 10);
    const time = String(data.get('horario') || '').slice(0, 5);
    const notes = clean(data.get('observacoes'), LIMITS.notes);

    const errors = [];
    if (name.length < 2) errors.push('Informe seu nome.');
    if (!Number.isFinite(people) || people < LIMITS.minPeople || people > LIMITS.maxPeople) {
      errors.push(`Informe a quantidade de pessoas (de ${LIMITS.minPeople} a ${LIMITS.maxPeople}).`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.push('Escolha a data da reserva.');
    if (!/^\d{2}:\d{2}$/.test(time)) errors.push('Escolha o horário da reserva.');

    if (errors.length > 0) {
      showFeedback(feedback, errors.join(' '), 'error');
      const firstInvalid = qsa('input, select, textarea', form).find((field) => !field.checkValidity());
      (firstInvalid || form).focus({ preventScroll: false });
      return;
    }

    const lines = [
      'Olá! Gostaria de reservar uma mesa no Wotan’s House.',
      '',
      `Nome: ${name}`,
      `Pessoas: ${people}`,
      `Data: ${formatDate(date)}`,
      `Horário: ${time}`
    ];
    if (notes) lines.push(`Observações: ${notes}`);

    // whatsappUrl já codifica o texto e usa uma base fixa.
    window.open(whatsappUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
    showFeedback(feedback, 'Abrimos o WhatsApp com o seu pedido de reserva. É só enviar a mensagem.', 'success');
    form.reset();
  });
}

function showFeedback(node, message, kind) {
  if (!node) return;
  node.textContent = message;
  node.classList.remove('is-error', 'is-success');
  node.classList.add(kind === 'error' ? 'is-error' : 'is-success');
  node.hidden = false;
}
