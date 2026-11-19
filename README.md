# pazetto.net

Site pessoal de Felipe Pazetto: currículo, portfolio, apps da Mellon e blog.
Feito em [Astro](https://astro.build) e hospedado no Firebase Hosting (projeto `website-f42b7`).

## Onde mexer

| O quê | Arquivo |
|---|---|
| Textos do currículo, portfolio e apps | `site/src/data/perfil.ts` |
| Posts do blog | `site/src/content/blog/*.md` |
| Visual da home | `site/src/pages/index.astro` |
| Cabeçalho, rodapé e cores | `site/src/layouts/Base.astro` |
| Redirects e cache | `site/firebase.json` |

### Novo post

Crie `site/src/content/blog/nome-do-post.md`:

```md
---
title: "Título do post"
description: "Resumo de uma ou duas frases."
date: 2026-11-20
tags: [SQL, Protheus]
---

Texto em Markdown.
```

O endereço fica `pazetto.net/blog/nome-do-post`.

## Rodar e publicar

```bash
cd site
npm install
npm run dev      # prévia em http://localhost:4321
```

Publicar: faça push na `main` e o GitHub Actions faz o build e o deploy.
Para publicar manualmente: `npm run build` e depois `firebase deploy --only hosting`.
