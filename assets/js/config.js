/**
 * WOTAN'S HOUSE — Configuração central do site
 * ------------------------------------------------------------------
 * ESTE É O ÚNICO ARQUIVO QUE PRECISA SER EDITADO PARA ATUALIZAR:
 * WhatsApp, iFood, Instagram, telefone, endereço e horários.
 *
 * IMPORTANTE (segurança): tudo aqui é PÚBLICO — este arquivo é enviado
 * ao navegador do visitante. Coloque somente informações que já são
 * públicas por natureza (nome, endereço comercial, telefone de
 * atendimento, links de redes). NUNCA coloque senhas, tokens, chaves de
 * API, credenciais de painel, dados de clientes ou qualquer segredo.
 */

/** Só dígitos, com DDI + DDD. Ex.: 55 (Brasil) + 47 (DDD) + número. */
const WHATSAPP_NUMBER = '5547999990000';

export const restaurantConfig = Object.freeze({
  /* ---------------------------------------------------------------
   * MARCA
   * --------------------------------------------------------------- */
  brand: {
    name: "Wotan's House",
    shortName: 'Wotan',
    tagline: 'Fogo, sabor e boas histórias à mesa.',
    intro: 'Uma experiência de carnes, brasa, chopp e bons momentos.',
    foundedYear: 2018,
    copyrightYear: 2026
  },

  /* ---------------------------------------------------------------
   * CONTATO
   * --------------------------------------------------------------- */
  contact: {
    /* WhatsApp — trocar apenas o valor de WHATSAPP_NUMBER acima. */
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappDisplay: '+55 (47) 99999-0000',
    whatsappMessage: 'Olá! Gostaria de saber mais sobre o Wotan’s House.',
    whatsappReservationMessage: 'Olá! Gostaria de fazer uma reserva no Wotan’s House.',

    /* Telefone fixo do salão. */
    phoneNumber: '554733330000',
    phoneDisplay: '+55 (47) 3333-0000',

    /* E-mail comercial (público). */
    email: 'contato@wotanshouse.example',

    instagramHandle: '@wotanshouse'
  },

  /* ---------------------------------------------------------------
   * LINKS EXTERNOS
   * Placeholders: substituir pelos links reais quando existirem.
   * Todos abrem em nova aba com rel="noopener noreferrer".
   * --------------------------------------------------------------- */
  links: {
    /* PLACEHOLDER — trocar pela URL da loja no iFood. */
    ifood: 'https://www.ifood.com.br/',
    /* PLACEHOLDER — trocar pelo perfil real do restaurante. */
    instagram: 'https://www.instagram.com/',
    /* PLACEHOLDER — trocar pelo link do Google Maps do endereço real. */
    maps: 'https://www.google.com/maps'
  },

  /* ---------------------------------------------------------------
   * ENDEREÇO
   * --------------------------------------------------------------- */
  address: {
    street: 'Rua Alberto Zanella, 0000',
    reference: 'Em frente ao Castelo',
    city: '',
    region: '',
    country: 'Brasil',
    postalCode: '',
    /** Linha única usada em SEO e no rodapé. */
    get oneLine() {
      return `${this.street} — ${this.reference}`;
    }
  },

  /* ---------------------------------------------------------------
   * HORÁRIO DE FUNCIONAMENTO
   * `days` aparece no site; `schemaDays`/`opens`/`closes` alimentam os
   * dados estruturados (JSON-LD) lidos pelo Google.
   * --------------------------------------------------------------- */
  hours: [
    {
      days: 'Terça a quinta',
      time: '18:00 — 23:00',
      closed: false,
      schemaDays: ['Tuesday', 'Wednesday', 'Thursday'],
      opens: '18:00',
      closes: '23:00'
    },
    {
      days: 'Sexta e sábado',
      time: '18:00 — 00:00',
      closed: false,
      schemaDays: ['Friday', 'Saturday'],
      opens: '18:00',
      closes: '23:59'
    },
    {
      days: 'Domingo',
      time: '11:30 — 22:00',
      closed: false,
      schemaDays: ['Sunday'],
      opens: '11:30',
      closes: '22:00'
    },
    {
      days: 'Segunda',
      time: 'Fechado',
      closed: true,
      schemaDays: ['Monday'],
      opens: null,
      closes: null
    }
  ],

  /* ---------------------------------------------------------------
   * SEO / METADADOS
   * --------------------------------------------------------------- */
  seo: {
    title: "Wotan's House | Carnes, Churrasco, Chopp e Bons Momentos",
    description:
      "Wotan's House — carnes na brasa, chopp gelado, drinks e um ambiente especial para reunir amigos e família.",
    /* PLACEHOLDER — trocar pelo domínio real ao publicar. */
    siteUrl: 'https://www.wotanshouse.example',
    ogImage: 'assets/images/brand/og-image.png',
    priceRange: 'R$$'
  }
});

/* -------------------------------------------------------------------
 * Helpers de link — centralizados para evitar URLs espalhadas no código.
 * ------------------------------------------------------------------- */

/** Limite defensivo: mensagens muito longas quebram o deep link. */
const MAX_WHATSAPP_MESSAGE = 900;

/**
 * Monta um link wa.me seguro.
 * A base é fixa e o texto é sempre codificado, então não há como injetar
 * outro destino a partir do conteúdo da mensagem (evita open redirect).
 * @param {string} [message] Texto pré-preenchido da conversa.
 * @returns {string} URL absoluta do WhatsApp.
 */
export function whatsappUrl(message) {
  const number = String(restaurantConfig.contact.whatsappNumber).replace(/\D/g, '');
  const text = String(message == null ? restaurantConfig.contact.whatsappMessage : message)
    .slice(0, MAX_WHATSAPP_MESSAGE)
    .trim();
  const query = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${number}${query}`;
}

/** Link `tel:` a partir do telefone configurado. */
export function phoneUrl() {
  return `tel:+${String(restaurantConfig.contact.phoneNumber).replace(/\D/g, '')}`;
}

/** Formata um número em Real brasileiro. */
export function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(Number(value) || 0);
}
