# Wotan's House — site institucional

Site de restaurante de carnes, churrasco e bar. Uma única página com
navegação por seções: início, cardápio completo com filtros, história,
galeria com lightbox, localização, horários, reserva e contato.

Restaurante fictício, criado para demonstração. Todos os dados
(telefone, endereço, links) são placeholders e estão centralizados para
troca rápida — veja **Onde alterar cada coisa**.

---

## Tecnologia

HTML, CSS e JavaScript puros, com módulos ES nativos. **Sem build, sem
framework, sem nenhuma dependência instalada.** Fontes, ícones e imagens
são todos locais: o navegador do visitante não faz nenhuma requisição a
servidores de terceiros.

A escolha é proposital: um site institucional de restaurante muda pouco
e precisa carregar rápido em celular modesto. Um framework aqui só
adicionaria peso, etapa de build e superfície de manutenção.

Medido em Chrome, sem compressão no servidor de teste:

| | Bytes | Requisições |
| --- | --- | --- |
| Carga inicial | 241 KB | 25 |
| Página inteira percorrida | 329 KB | 76 |

Desses 241 KB iniciais, 72 KB são as duas fontes (já comprimidas). O
restante é texto — HTML, CSS, JS e SVG — que cai para perto de um quarto
com gzip/brotli, ativados nos exemplos de configuração em `server/`.
Primeira renderização em 376 ms e 1.091 nós no DOM.

---

## Como rodar

Os módulos ES exigem HTTP — abrir o `index.html` com duplo clique
(`file://`) **não funciona**. Use qualquer servidor estático:

```bash
# Python (já vem no Windows/macOS/Linux)
python -m http.server 8080

# ou Node, sem instalar nada permanentemente
npx --yes serve .
```

Depois acesse `http://localhost:8080`.

No VS Code, a extensão Live Server também resolve.

---

## Estrutura

```
wotans-house/
├── index.html                  página única, HTML semântico
├── site.webmanifest            nome/ícones para instalar como app
├── robots.txt / sitemap.xml    SEO (trocar o domínio ao publicar)
├── .gitignore                  impede versionar .env, chaves, dumps
├── .env.example                só nomes de variáveis, sem segredos
├── assets/
│   ├── css/styles.css          design system completo (tokens no topo)
│   ├── fonts/                  Cinzel e Inter (subconjunto latino, OFL)
│   ├── images/
│   │   ├── brand/              favicon e imagem de compartilhamento
│   │   ├── hero/               fundo da primeira tela
│   │   ├── menu/               uma imagem por produto
│   │   ├── gallery/            fotos da galeria
│   │   └── about/              fotos da seção "Nossa História"
│   └── js/
│       ├── config.js           ⭐ CONFIGURAÇÃO CENTRAL
│       ├── main.js             inicialização
│       ├── data/
│       │   ├── menu.js         ⭐ CARDÁPIO (categorias e produtos)
│       │   └── gallery.js      ⭐ GALERIA (lista de fotos)
│       └── modules/
│           ├── dom.js          criação segura de elementos
│           ├── icons.js        ícones SVG
│           ├── nav.js          menu, cabeçalho, seção ativa
│           ├── menu.js         filtros e cards do cardápio
│           ├── gallery.js      grade + lightbox
│           ├── site-info.js    liga config.js ao HTML
│           ├── reservation.js  formulário de reserva
│           └── reveal.js       animações de entrada
└── server/                     cabeçalhos de segurança para produção
```

---

## Onde alterar cada coisa

### WhatsApp
`assets/js/config.js`, constante `WHATSAPP_NUMBER` no topo do arquivo.
Só dígitos, com DDI e DDD: `5547999990000`.

O número exibido na tela fica em `contact.whatsappDisplay`, e as
mensagens automáticas em `contact.whatsappMessage` (contato geral) e
`contact.whatsappReservationMessage` (reservas).

Todos os botões de WhatsApp do site — cabeçalho, hero, cardápio,
localização, contato, rodapé e o botão flutuante — usam esse mesmo
valor. Nenhum deles precisa ser editado individualmente.

### iFood, Instagram e Google Maps
`assets/js/config.js`, objeto `links`:

```js
links: {
  ifood: 'https://www.ifood.com.br/',      // trocar pela loja real
  instagram: 'https://www.instagram.com/', // trocar pelo perfil real
  maps: 'https://www.google.com/maps'      // trocar pelo endereço real
}
```

São propositalmente placeholders genéricos: o restaurante é fictício e
inventar uma URL de estabelecimento real seria errado.

### Telefone, e-mail e @ do Instagram
`assets/js/config.js`, objeto `contact`.

### Endereço
`assets/js/config.js`, objeto `address`.

### Horários
`assets/js/config.js`, lista `hours`. Cada item tem o texto exibido
(`days`, `time`) e os campos técnicos (`schemaDays`, `opens`, `closes`)
que alimentam o selo "aberto agora" do hero. Mantenha os dois em
sincronia.

### Produtos e preços
`assets/js/data/menu.js`. Para adicionar um prato, copie um bloco e
ajuste:

```js
{
  id: 'costela-na-brasa',            // único, sem acento nem espaço
  name: 'Costela na Brasa',
  category: 'carnes',                // precisa existir em menuCategories
  description: 'Descrição curta.',
  price: 92.9,                       // número; vira R$ 92,90 na tela
  image: 'assets/images/menu/costela-na-brasa.svg',
  imageAlt: 'Descrição da foto para leitores de tela',
  tags: ['Serve 2'],                 // selos, opcional
  featured: true,                    // aparece em "Destaques da casa"
  available: true                    // false = mostra "indisponível hoje"
}
```

Os filtros, as seções e os cards aparecem sozinhos. Para criar uma
categoria nova, acrescente um item em `menuCategories` — ela vira um
filtro automaticamente.

### Fotos
Substitua os arquivos em `assets/images/` mantendo o mesmo caminho, ou
aponte o campo `image` para o arquivo novo.

As imagens atuais são placeholders em SVG gerados para o projeto
(gradiente escuro com brasa). Servem para o site nunca ficar com imagem
quebrada, mas **devem ser trocadas por fotos reais**:

| Onde | Arquivo | Proporção sugerida |
| --- | --- | --- |
| Primeira tela | `assets/images/hero/hero-brasa.svg` | 16:9, ≥ 1920px |
| Primeira tela (celular) | `assets/images/hero/hero-brasa-mobile.svg` | 2:3, ≥ 800px |
| Cardápio | `assets/images/menu/<id-do-produto>.svg` | 4:3 |
| Galeria | `assets/images/gallery/*.svg` | livre (a grade se adapta) |
| História (fachada) | `assets/images/about/fachada.webp` | 4:5 — **foto real já aplicada** |
| História (demais) | `assets/images/about/*.svg` | 4:5 e 4:3 |
| Compartilhamento | `assets/images/brand/og-image.png` | 1200×630 |

Ao usar JPG/WebP, lembre de atualizar a extensão no campo `image` (ou em
`assets/js/data/gallery.js`) e de manter `width`/`height` coerentes com
o arquivo, para o layout não "pular" durante o carregamento.

> A foto da fachada em `about/fachada.webp` tem 382×510 px e é exibida em
> até 542×678 px no desktop, ou seja, aparece levemente ampliada. Trocar
> por uma versão de pelo menos 1000×1250 px deixa a imagem nítida —
> basta salvar por cima, mantendo o nome, e atualizar `width`/`height`
> no `index.html`.
>
> Atenção ao formato: o arquivo é WebP de verdade, com extensão `.webp`.
> Servir um WebP com extensão `.png` faria o navegador bloquear a imagem
> em produção, por causa do cabeçalho `X-Content-Type-Options: nosniff`.

### Textos do site
Ficam no `index.html`. O texto da seção "Nossa História" está no bloco
`<section id="historia">`.

### Cores e tipografia
`assets/css/styles.css`, bloco `:root` no topo (seção 02). Todas as
cores, tamanhos de fonte e espaçamentos são variáveis CSS.

### SEO
Título, descrição e Open Graph ficam no `<head>` do `index.html`.
Ao publicar, troque `https://www.wotanshouse.example/` pelo domínio real
em: `index.html` (canonical, og:url, og:image), `robots.txt` e
`sitemap.xml`.

> Atenção: o bloco de dados estruturados (JSON-LD) no `index.html` é o
> **único** lugar que repete endereço, telefone e horários do
> `config.js`. Isso é proposital — dados estruturados precisam existir no
> HTML, sem depender de JavaScript. Ao mudar esses dados, atualize os
> dois lugares.

---

## Acessibilidade

- HTML semântico, um único `<h1>`, hierarquia de títulos sem saltos.
- Todas as imagens com `alt` descritivo; ícones decorativos com
  `aria-hidden`.
- Navegação completa por teclado: link "pular para o conteúdo", foco
  visível em dourado, foco preso dentro do menu mobile e do lightbox,
  `Esc` fecha os dois.
- Filtros do cardápio com `aria-pressed` e aviso por região
  `aria-live` ("7 itens em Carnes").
- O estado selecionado não depende só de cor: também muda peso da fonte
  e ganha um traço embaixo.
- Alvos de toque com no mínimo 44px de altura.
- `prefers-reduced-motion` desliga todas as animações.

## Desempenho

- Imagens abaixo da dobra com `loading="lazy"` e `width`/`height`
  declarados (sem deslocamento de layout).
- Fontes variáveis locais com `font-display: swap` e `preload`.
- Um único `IntersectionObserver` para as animações, que deixa de
  observar cada elemento assim que ele aparece.
- Rolagem observada com `requestAnimationFrame`, sem `setInterval`.
- Zero bibliotecas de terceiros.

---

## Segurança

O site é estático: não há backend, banco de dados, login, upload nem
qualquer dado de visitante sendo armazenado. Isso elimina de saída a
maior parte das vulnerabilidades comuns (SQL injection, autenticação
quebrada, exposição de endpoints). O que foi feito no que sobra:

**Nenhum segredo no repositório.** Não há chave, token ou credencial em
lugar nenhum do projeto. O `config.js` contém apenas informação que já é
pública por natureza (nome, endereço comercial, telefone de atendimento,
links de redes) e o próprio arquivo avisa isso no cabeçalho. O
`.gitignore` bloqueia `.env`, chaves, certificados, dumps e logs; o
`.env.example` tem só nomes de variáveis com valores fictícios.

**Nada de `innerHTML`.** Toda a interface é construída com
`createElement` e `textContent`. Mesmo que alguém cole um `<script>`
dentro da descrição de um produto, ele aparece como texto — não executa.

**Links validados.** `safeUrl()` em `assets/js/modules/dom.js` só aceita
`https:`, `http:`, `tel:` e `mailto:`, bloqueando `javascript:` e
`data:` caso entrem por engano na configuração. Todo link externo leva
`rel="noopener noreferrer"` (evita tabnabbing e vazamento de referrer).

**Deep links do WhatsApp com base fixa.** `whatsappUrl()` monta a URL a
partir de uma base constante e sempre codifica o texto, então não há
como o conteúdo de uma mensagem redirecionar para outro destino (open
redirect).

**Formulário de reserva não envia nada.** Ele monta o texto e abre a
conversa do WhatsApp; quem envia é a pessoa, do próprio aparelho. Nada
é transmitido a nenhum servidor nem guardado no navegador.

**CSP estrita.** Declarada em meta tag no `index.html` e, de verdade,
nos cabeçalhos HTTP em `server/`. Como não existe recurso de terceiros,
a política é `'self'` em tudo, sem `unsafe-inline` — por isso o projeto
não usa nenhum `style="..."` nem `<script>` embutido.

**Cabeçalhos de produção** em `server/`: CSP, `nosniff`, `X-Frame-Options: DENY`
e `frame-ancestors 'none'` (clickjacking), `Referrer-Policy`,
`Permissions-Policy`, COOP/CORP, HSTS e redirecionamento para HTTPS. As
configurações também negam acesso a `.env`, `.git`, dumps, backups e à
própria pasta `server/`, e desligam listagem de diretórios.

### Se um backend for adicionado depois

1. Segredos só em variáveis de ambiente no servidor — nunca no
   JavaScript enviado ao navegador.
2. Revalidar **no servidor** tudo que o formulário valida aqui. A
   validação de frontend existe para a experiência do usuário, não como
   barreira de segurança.
3. Consultas parametrizadas, permissões mínimas no banco, senhas com
   hash moderno (argon2/bcrypt).
4. Autorização decidida pelo servidor, nunca por um campo vindo do
   cliente.
5. Rate limiting e limite de tamanho de payload nos endpoints públicos.
6. Em produção: debug desligado, sem stack trace na resposta, detalhes
   apenas no log do servidor — e sem registrar senha, token ou cookie
   de sessão em log.

---

## Verificações feitas

Testado em Chrome headless (1920, 1440, 1366, 834, 390 e 375 px):

- Console sem erros ou avisos; nenhuma requisição falhando.
- 40 produtos e 12 fotos renderizados a partir dos arquivos de dados.
- Os 8 filtros do cardápio, com contagem e aviso acessível corretos.
- Lightbox: abre, avança, volta pelo teclado, fecha no `Esc` e devolve
  o foco para a foto de origem.
- Menu mobile: abre, prende o foco, fecha ao navegar e libera a rolagem.
- Botão flutuante do WhatsApp só aparece depois da primeira tela.
- Formulário de reserva bloqueia envio incompleto e monta a mensagem.
- Sem rolagem horizontal em nenhuma das larguras testadas.
- Todos os links internos apontam para seções existentes; todos os
  externos abrem em nova aba com `rel="noopener noreferrer"`.
