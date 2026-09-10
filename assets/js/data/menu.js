/**
 * WOTAN'S HOUSE — Dados do cardápio
 * ------------------------------------------------------------------
 * Para editar o cardápio, altere APENAS este arquivo.
 * A interface monta todos os cards automaticamente a partir daqui.
 *
 * Campos de cada produto:
 *   id          string  identificador único (usado em URL/filtros)
 *   name        string  nome exibido
 *   category    string  precisa existir em `menuCategories`
 *   description string  descrição curta
 *   price       number  em reais (ex.: 89.9 → R$ 89,90)
 *   image       string  caminho relativo da foto
 *   imageAlt    string  texto alternativo (acessibilidade)
 *   tags        array   selos curtos (ex.: 'Serve 2', 'Mais pedido')
 *   featured    boolean aparece na seção "Destaques da casa"
 *   available   boolean false = mostra o item como esgotado
 *
 * As imagens atuais são placeholders locais em SVG. Para usar fotos
 * reais, basta salvar o arquivo em assets/images/menu/ e apontar o
 * campo `image` para ele — nada mais precisa mudar.
 */

/** Ordem das categorias = ordem dos filtros e das seções do cardápio. */
export const menuCategories = Object.freeze([
  {
    id: 'carnes',
    label: 'Carnes',
    tagline: 'Cortes selecionados, fogo alto e ponto no capricho.',
    image: 'assets/images/menu/carnes.svg'
  },
  {
    id: 'hamburgueres',
    label: 'Hambúrgueres',
    tagline: 'Blend da casa, pão brioche e muito sabor de brasa.',
    image: 'assets/images/menu/hamburgueres.svg'
  },
  {
    id: 'porcoes',
    label: 'Porções',
    tagline: 'Feitas para dividir — ou não.',
    image: 'assets/images/menu/porcoes.svg'
  },
  {
    id: 'acompanhamentos',
    label: 'Acompanhamentos',
    tagline: 'O complemento certo para cada corte.',
    image: 'assets/images/menu/acompanhamentos.svg'
  },
  {
    id: 'chopp',
    label: 'Chopp & Cervejas',
    tagline: 'Tirado na pressão certa, sempre gelado.',
    image: 'assets/images/menu/chopp.svg'
  },
  {
    id: 'drinks',
    label: 'Drinks',
    tagline: 'Clássicos bem executados e autorais da casa.',
    image: 'assets/images/menu/drinks.svg'
  },
  {
    id: 'sobremesas',
    label: 'Sobremesas',
    tagline: 'O final que a noite merece.',
    image: 'assets/images/menu/sobremesas.svg'
  }
]);

export const products = Object.freeze([
  /* ------------------------------ CARNES ------------------------------ */
  {
    id: 'picanha-na-brasa',
    name: 'Picanha na Brasa',
    category: 'carnes',
    description:
      'Corte selecionado grelhado na brasa, servido no ponto escolhido e acompanhado de molho especial da casa.',
    price: 89.9,
    image: 'assets/images/menu/picanha-na-brasa.svg',
    imageAlt: 'Picanha grelhada na brasa servida em tábua de madeira',
    tags: ['Serve 2', 'Mais pedido'],
    featured: true,
    available: true
  },
  {
    id: 'ancho-wotan',
    name: 'Ancho Wotan',
    category: 'carnes',
    description:
      'Bife ancho maturado, selado em fogo alto com manteiga de ervas e flor de sal. Nosso corte assinatura.',
    price: 96.9,
    image: 'assets/images/menu/ancho-wotan.svg',
    imageAlt: 'Bife ancho maturado selado na chapa quente',
    tags: ['Assinatura'],
    featured: true,
    available: true
  },
  {
    id: 'prime-rib',
    name: 'Prime Rib',
    category: 'carnes',
    description:
      'Costela nobre assada lentamente por seis horas, finalizada na brasa e servida com jus da própria carne.',
    price: 129.9,
    image: 'assets/images/menu/prime-rib.svg',
    imageAlt: 'Prime rib fatiado com crosta dourada',
    tags: ['Serve 2', '6h de forno'],
    featured: true,
    available: true
  },
  {
    id: 'chorizo',
    name: 'Chorizo',
    category: 'carnes',
    description:
      'Contrafilé argentino na parrilla, com marcas do fogo por fora e suculência por dentro. Acompanha chimichurri.',
    price: 84.9,
    image: 'assets/images/menu/chorizo.svg',
    imageAlt: 'Corte chorizo na parrilla com chimichurri',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'costela-defumada',
    name: 'Costela Defumada',
    category: 'carnes',
    description:
      'Doze horas de defumação lenta em madeira nobre, finalizada com barbecue artesanal de café e melado.',
    price: 92.9,
    image: 'assets/images/menu/costela-defumada.svg',
    imageAlt: 'Costela defumada desfiando com molho barbecue',
    tags: ['12h de defumação'],
    featured: true,
    available: true
  },
  {
    id: 'fraldinha-na-brasa',
    name: 'Fraldinha na Brasa',
    category: 'carnes',
    description:
      'Fraldinha grelhada no ponto, fatiada na hora e servida com cebola caramelizada na manteiga.',
    price: 78.9,
    image: 'assets/images/menu/fraldinha-na-brasa.svg',
    imageAlt: 'Fraldinha fatiada com cebola caramelizada',
    tags: ['Serve 2'],
    featured: false,
    available: true
  },
  {
    id: 'parrilla-da-casa',
    name: 'Parrilla da Casa',
    category: 'carnes',
    description:
      'Seleção de três cortes da casa com linguiça artesanal, farofa de bacon, vinagrete e pão de alho.',
    price: 199.9,
    image: 'assets/images/menu/parrilla-da-casa.svg',
    imageAlt: 'Tábua de parrilla com três cortes e acompanhamentos',
    tags: ['Serve 3 a 4'],
    featured: false,
    available: true
  },

  /* --------------------------- HAMBÚRGUERES --------------------------- */
  {
    id: 'wotan-burger',
    name: 'Wotan Burger',
    category: 'hamburgueres',
    description:
      'Blend 180 g da casa na brasa, queijo prato derretido, cebola no fogo, molho Wotan e pão brioche tostado.',
    price: 44.9,
    image: 'assets/images/menu/wotan-burger.svg',
    imageAlt: 'Hambúrguer artesanal com queijo derretido no pão brioche',
    tags: ['Mais pedido'],
    featured: true,
    available: true
  },
  {
    id: 'house-bacon',
    name: 'House Bacon',
    category: 'hamburgueres',
    description:
      'Blend 180 g, cheddar inglês, bacon defumado em casa, maionese de alho tostado e cebola crocante.',
    price: 46.9,
    image: 'assets/images/menu/house-bacon.svg',
    imageAlt: 'Hambúrguer com bacon crocante e cheddar',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'brasa-burger',
    name: 'Brasa Burger',
    category: 'hamburgueres',
    description:
      'Costela desfiada na brasa, queijo coalho grelhado, geleia de pimenta biquinho e rúcula.',
    price: 48.9,
    image: 'assets/images/menu/brasa-burger.svg',
    imageAlt: 'Hambúrguer de costela desfiada com queijo coalho',
    tags: ['Leve picante'],
    featured: false,
    available: true
  },
  {
    id: 'smash-wotan',
    name: 'Smash Wotan',
    category: 'hamburgueres',
    description:
      'Dois discos smash prensados na chapa, queijo americano duplo, picles e molho da casa.',
    price: 36.9,
    image: 'assets/images/menu/smash-wotan.svg',
    imageAlt: 'Smash burger duplo com queijo americano',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'duplo-da-casa',
    name: 'Duplo da Casa',
    category: 'hamburgueres',
    description:
      'Dois blends de 160 g, queijo defumado, bacon, cebola caramelizada e molho barbecue de café.',
    price: 54.9,
    image: 'assets/images/menu/duplo-da-casa.svg',
    imageAlt: 'Hambúrguer duplo com queijo defumado e bacon',
    tags: [],
    featured: false,
    available: true
  },

  /* ------------------------------ PORÇÕES ------------------------------ */
  {
    id: 'batata-rustica',
    name: 'Batata Rústica',
    category: 'porcoes',
    description:
      'Batatas com casca, alecrim, páprica defumada e parmesão ralado na hora. Acompanha maionese verde.',
    price: 34.9,
    image: 'assets/images/menu/batata-rustica.svg',
    imageAlt: 'Porção de batata rústica com alecrim e parmesão',
    tags: ['Serve 2'],
    featured: false,
    available: true
  },
  {
    id: 'aneis-de-cebola',
    name: 'Anéis de Cebola',
    category: 'porcoes',
    description: 'Empanados na cerveja, fritos na hora e servidos com molho ranch da casa.',
    price: 32.9,
    image: 'assets/images/menu/aneis-de-cebola.svg',
    imageAlt: 'Anéis de cebola empanados e crocantes',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'mandioca-frita',
    name: 'Mandioca Frita',
    category: 'porcoes',
    description: 'Cozida no ponto e frita até dourar, finalizada com sal de ervas e limão.',
    price: 29.9,
    image: 'assets/images/menu/mandioca-frita.svg',
    imageAlt: 'Porção de mandioca frita dourada',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'linguica-artesanal',
    name: 'Linguiça Artesanal',
    category: 'porcoes',
    description:
      'Linguiça de pernil feita para a casa, grelhada na brasa e servida com vinagrete e pão de alho.',
    price: 39.9,
    image: 'assets/images/menu/linguica-artesanal.svg',
    imageAlt: 'Linguiça artesanal grelhada fatiada',
    tags: ['Serve 2'],
    featured: true,
    available: true
  },
  {
    id: 'dadinhos-de-queijo',
    name: 'Dadinhos de Queijo',
    category: 'porcoes',
    description: 'Cubos de queijo coalho com tapioca, crocantes por fora, com melado de cana.',
    price: 37.9,
    image: 'assets/images/menu/dadinhos-de-queijo.svg',
    imageAlt: 'Dadinhos de queijo coalho com melado',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'frango-crocante',
    name: 'Frango Crocante',
    category: 'porcoes',
    description: 'Iscas de frango marinadas na cerveja preta, empanadas na hora, com maionese defumada.',
    price: 42.9,
    image: 'assets/images/menu/frango-crocante.svg',
    imageAlt: 'Iscas de frango crocante com molho',
    tags: ['Serve 2'],
    featured: false,
    available: true
  },

  /* -------------------------- ACOMPANHAMENTOS -------------------------- */
  {
    id: 'arroz-branco',
    name: 'Arroz Branco',
    category: 'acompanhamentos',
    description: 'Arroz soltinho preparado na hora, do jeito simples que combina com tudo.',
    price: 12.9,
    image: 'assets/images/menu/arroz-branco.svg',
    imageAlt: 'Porção de arroz branco',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'arroz-biro-biro',
    name: 'Arroz Biro-Biro',
    category: 'acompanhamentos',
    description: 'Arroz salteado com bacon, ovos, batata palha e cheiro-verde.',
    price: 24.9,
    image: 'assets/images/menu/arroz-biro-biro.svg',
    imageAlt: 'Arroz biro-biro com bacon e batata palha',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'farofa-da-casa',
    name: 'Farofa da Casa',
    category: 'acompanhamentos',
    description: 'Farofa na manteiga com bacon, cebola dourada e castanha.',
    price: 14.9,
    image: 'assets/images/menu/farofa-da-casa.svg',
    imageAlt: 'Farofa da casa com bacon e castanha',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'vinagrete',
    name: 'Vinagrete',
    category: 'acompanhamentos',
    description: 'Tomate, cebola e pimentão em corte fino, azeite e um toque de limão.',
    price: 10.9,
    image: 'assets/images/menu/vinagrete.svg',
    imageAlt: 'Vinagrete fresco em cumbuca',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'salada-da-casa',
    name: 'Salada da Casa',
    category: 'acompanhamentos',
    description: 'Folhas verdes, tomate confitado, pepino e vinagrete de mel com mostarda.',
    price: 22.9,
    image: 'assets/images/menu/salada-da-casa.svg',
    imageAlt: 'Salada verde com tomate confitado',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'pure-de-batata',
    name: 'Purê de Batata',
    category: 'acompanhamentos',
    description: 'Purê cremoso de batata asterix com manteiga e noz-moscada.',
    price: 19.9,
    image: 'assets/images/menu/pure-de-batata.svg',
    imageAlt: 'Purê de batata cremoso',
    tags: [],
    featured: false,
    available: true
  },

  /* ------------------------- CHOPP & CERVEJAS ------------------------- */
  {
    id: 'chopp-pilsen',
    name: 'Chopp Pilsen 500 ml',
    category: 'chopp',
    description: 'Leve, refrescante e com colarinho na medida. O clássico da casa.',
    price: 16.9,
    image: 'assets/images/menu/chopp-pilsen.svg',
    imageAlt: 'Caneca de chopp pilsen com colarinho',
    tags: ['Mais pedido'],
    featured: true,
    available: true
  },
  {
    id: 'chopp-ipa',
    name: 'Chopp IPA 500 ml',
    category: 'chopp',
    description: 'Amargor marcante e aroma cítrico de lúpulo. Combina com os cortes mais gordurosos.',
    price: 18.9,
    image: 'assets/images/menu/chopp-ipa.svg',
    imageAlt: 'Copo de chopp IPA âmbar',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'chopp-weiss',
    name: 'Chopp Weiss 500 ml',
    category: 'chopp',
    description: 'Trigo alemão, corpo macio e notas de banana e cravo.',
    price: 17.9,
    image: 'assets/images/menu/chopp-weiss.svg',
    imageAlt: 'Copo alto de chopp weiss',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'torre-de-chopp',
    name: 'Torre de Chopp 3 L',
    category: 'chopp',
    description: 'Três litros do chopp da sua escolha, servidos na torre gelada. Feita para a mesa toda.',
    price: 89.9,
    image: 'assets/images/menu/torre-de-chopp.svg',
    imageAlt: 'Torre de chopp de três litros na mesa',
    tags: ['Serve 4'],
    featured: false,
    available: true
  },
  {
    id: 'long-neck',
    name: 'Cerveja Long Neck',
    category: 'chopp',
    description: 'Garrafa 355 ml sempre gelada. Consulte os rótulos disponíveis no dia.',
    price: 12.9,
    image: 'assets/images/menu/long-neck.svg',
    imageAlt: 'Garrafa long neck gelada',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'cerveja-premium',
    name: 'Cerveja Premium',
    category: 'chopp',
    description: 'Seleção de rótulos especiais nacionais e importados, 600 ml.',
    price: 22.9,
    image: 'assets/images/menu/cerveja-premium.svg',
    imageAlt: 'Garrafa de cerveja premium com taça',
    tags: [],
    featured: false,
    available: true
  },

  /* ------------------------------ DRINKS ------------------------------ */
  {
    id: 'caipirinha',
    name: 'Caipirinha',
    category: 'drinks',
    description: 'Cachaça artesanal, limão taiti macerado na hora e açúcar. Também com frutas da estação.',
    price: 26.9,
    image: 'assets/images/menu/caipirinha.svg',
    imageAlt: 'Caipirinha de limão com gelo',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'moscow-mule',
    name: 'Moscow Mule',
    category: 'drinks',
    description: 'Vodca, espuma de gengibre, limão e gelo, servido na caneca de cobre.',
    price: 34.9,
    image: 'assets/images/menu/moscow-mule.svg',
    imageAlt: 'Moscow mule na caneca de cobre',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'gin-tonica',
    name: 'Gin Tônica',
    category: 'drinks',
    description: 'Gin london dry, tônica premium, zimbro e casca de laranja queimada na brasa.',
    price: 36.9,
    image: 'assets/images/menu/gin-tonica.svg',
    imageAlt: 'Gin tônica com zimbro e laranja',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'wotan-sour',
    name: 'Wotan Sour',
    category: 'drinks',
    description:
      'Autoral da casa: uísque defumado, mel de laranjeira, limão siciliano e um toque de fumaça no copo.',
    price: 38.9,
    image: 'assets/images/menu/wotan-sour.svg',
    imageAlt: 'Drink autoral Wotan Sour com defumação',
    tags: ['Autoral'],
    featured: true,
    available: true
  },
  {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    category: 'drinks',
    description: 'Bourbon, açúcar demerara, angostura e casca de laranja. Clássico, sem atalhos.',
    price: 42.9,
    image: 'assets/images/menu/old-fashioned.svg',
    imageAlt: 'Old fashioned com pedra de gelo e casca de laranja',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'nao-alcoolicos',
    name: 'Drinks Sem Álcool',
    category: 'drinks',
    description: 'Versões sem álcool dos nossos clássicos, com xaropes e frutas frescas da casa.',
    price: 22.9,
    image: 'assets/images/menu/nao-alcoolicos.svg',
    imageAlt: 'Drink sem álcool com frutas frescas',
    tags: ['Sem álcool'],
    featured: false,
    available: true
  },

  /* ---------------------------- SOBREMESAS ---------------------------- */
  {
    id: 'brownie-com-sorvete',
    name: 'Brownie com Sorvete',
    category: 'sobremesas',
    description: 'Brownie de chocolate meio amargo, sorvete de creme e calda quente de doce de leite.',
    price: 28.9,
    image: 'assets/images/menu/brownie-com-sorvete.svg',
    imageAlt: 'Brownie quente com sorvete de creme',
    tags: ['Mais pedido'],
    featured: false,
    available: true
  },
  {
    id: 'petit-gateau',
    name: 'Petit Gateau',
    category: 'sobremesas',
    description: 'Bolinho de chocolate com centro cremoso, servido quente com sorvete de baunilha.',
    price: 32.9,
    image: 'assets/images/menu/petit-gateau.svg',
    imageAlt: 'Petit gateau com centro derretido',
    tags: [],
    featured: true,
    available: true
  },
  {
    id: 'pudim-da-casa',
    name: 'Pudim da Casa',
    category: 'sobremesas',
    description: 'Receita de família, textura sedosa e calda de caramelo queimado.',
    price: 22.9,
    image: 'assets/images/menu/pudim-da-casa.svg',
    imageAlt: 'Fatia de pudim com calda de caramelo',
    tags: [],
    featured: false,
    available: true
  },
  {
    id: 'cheesecake',
    name: 'Cheesecake',
    category: 'sobremesas',
    description: 'Base crocante de biscoito amanteigado, creme suave e geleia de frutas vermelhas.',
    price: 26.9,
    image: 'assets/images/menu/cheesecake.svg',
    imageAlt: 'Fatia de cheesecake com geleia de frutas vermelhas',
    tags: [],
    featured: false,
    available: true
  }
]);

/** Produtos exibidos na seção "Destaques da casa" da página inicial. */
export function featuredProducts(limit = 6) {
  return products.filter((p) => p.featured && p.available).slice(0, limit);
}

/** Produtos de uma categoria (ou todos, quando `categoryId` for 'todos'). */
export function productsByCategory(categoryId) {
  if (!categoryId || categoryId === 'todos') return products.slice();
  return products.filter((p) => p.category === categoryId);
}

/** Rótulo legível de uma categoria. */
export function categoryLabel(categoryId) {
  const found = menuCategories.find((c) => c.id === categoryId);
  return found ? found.label : '';
}
