# Configuração de servidor

Arquivos de exemplo para publicar o site com HTTPS e cabeçalhos de
segurança. **Esta pasta não deve ser servida publicamente** — as duas
configurações já bloqueiam o acesso a `/server/`.

| Arquivo | Onde usar |
| --- | --- |
| `_headers` | Netlify, Cloudflare Pages (copiar para a raiz publicada) |
| `nginx.conf.example` | Nginx (VPS, Docker) |
| `apache.htaccess.example` | Apache / hospedagem compartilhada (renomear para `.htaccess`) |

A mesma política de segurança de conteúdo (CSP) está declarada em uma
meta tag no `index.html`, como defesa em profundidade. O cabeçalho HTTP
é o que vale de verdade: `frame-ancestors` e HSTS só funcionam por
cabeçalho.
