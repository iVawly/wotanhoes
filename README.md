# Wotan's House — Site Institucional 

Um site de página única (Single Page) feito para um restaurante/churrascaria fictício. O objetivo deste projeto foi criar uma interface moderna, rápida e totalmente focada em performance e boas práticas.

## O Diferencial: Sem Frameworks, Sem Peso

A escolha de arquitetura aqui foi propositada:
- **100% Vanilla:** Feito apenas com HTML, CSS e JavaScript puros (ES Modules).
- **Zero Dependências:** Não precisas de instalar nada via `npm`. Sem builds complexos.
- **Tudo Local:** Fontes, ícones e imagens correm direto do projeto. O navegador não faz requisições a servidores de terceiros.
- **Leve e Rápido:** O carregamento inicial consome apenas cerca de 241 KB.

## Como Rodar o Projeto

Como o projeto usa módulos nativos do JavaScript (ES Modules), não pode simplesmente dar duplo clique no `index.html`. É necessário rodar um servidor estático local.

Se tens o Python instalado, rode esse comando na pasta do projeto:
```bash
python -m http.server 8080
```
Depois, basta entrar em: `http://localhost:8080`

*(Também podes usar a extensão Live Server no VS Code, que resolve logo).*

## Configuração Rápida (Onde alterar as coisas)

Para facilitar, a maior parte dos dados editáveis do restaurante foi centralizada. Se quiser reutilizar o template, só precisas de mexer nesses pontos:

- **Dados Gerais (WhatsApp, Redes, Horários, Endereço):** Ficam todos no arquivo `assets/js/config.js`. Altera lá e muda no site todo de forma automática.
- **Cardápio:** Para adicionar ou mudar pratos e preços, basta editar o array no arquivo `assets/js/data/menu.js`.
- **Imagens:** As fotos de exibição ficam organizadas na pasta `assets/images/`.

## Segurança & Acessibilidade

Apesar de ser um site estático simples, o projeto foi estruturado com práticas reais de mercado:
- HTML semântico e preparado para leitores de ecran (acessibilidade).
- Suporte para navegação completa via teclado (menus, lightbox, etc.).
- Configuração estrita de Content Security Policy (CSP) para evitar vulnerabilidades básicas.
- Manipulação segura do DOM utilizando `createElement` e `textContent` em vez de `innerHTML`.
