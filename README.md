# Cadência — laboratório de efeitos de interface

Coleção de efeitos de scroll, 3D, estética e micro-interação, cada um em uma página isolada com demo ao vivo, ficha técnica, custo declarado e prompt copiável para colar em qualquer LLM.

[![Deploy](https://github.com/fcervan/efeitos-landing-page/actions/workflows/deploy.yml/badge.svg)](https://github.com/fcervan/efeitos-landing-page/actions/workflows/deploy.yml)
[![Site](https://img.shields.io/badge/site-ao%20vivo-FF5A0A?style=flat-square&logo=githubpages&logoColor=white)](https://fcervan.github.io/efeitos-landing-page/)

**🔗 Site:** https://fcervan.github.io/efeitos-landing-page/
**🧪 Índice de efeitos:** https://fcervan.github.io/efeitos-landing-page/lab/

## Stack

![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=flat-square&logo=greensock&logoColor=black)
![Lenis](https://img.shields.io/badge/Lenis-1.3-111111?style=flat-square)
![Three.js](https://img.shields.io/badge/Three.js-0.169-000000?style=flat-square&logo=threedotjs&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/R3F-8.18-000000?style=flat-square&logo=react&logoColor=61DAFB)
![Spline](https://img.shields.io/badge/Spline-4.2-FF2D8A?style=flat-square&logo=spline&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-deploy-222222?style=flat-square&logo=githubpages&logoColor=white)

## Como funciona

- **Home curada** com os 8 efeitos em destaque (A5, B4, C1, C3, D1, E1, E3, E5) — zero WebGL e zero seção pinada.
- **`/lab`** — catálogo dos 29 efeitos com filtros por categoria, custo e peso, busca e ordenação.
- **`/lab/[slug]`** — página isolada por efeito, com demo, ficha técnica (o que é, quando usar, como implementar, cuidados), dependências, nota de performance e prompt copiável.
- **Custo por página, não por site**: cada demo pesada só é carregada na própria rota, com `next/dynamic`, fallback estático e cleanup no unmount.

### Status das demos

| Prontas (9) | Placeholder (20) |
| --- | --- |
| Lenis, Scrollytelling, Scroll-driven, Sticky/Pinned, Kinetic Typography, Tilt 3D, Bento Grid, Glassmorphism, Aurora | WebGL, Spline, Shaders, Film Grain, Spotlight, Magnetic Buttons, Spring Physics, GSAP ScrollTrigger, Reveal em cascata, Parallax, Marquee, Flip card, Count-up, Anel de progresso, Confetti, Acordeão, Pulso, Shake, Hover lift, Máscara por linha |

As rotas em placeholder já exibem palco, dependências, ficha técnica e prompt — falta apenas o componente interativo.

## Rodando local

Requisitos: Node.js 20+.

```bash
npm ci
npm run dev        # http://localhost:3000
```

Outros comandos:

```bash
npm run build      # export estático em out/
npm run preview    # serve o out/ em http://localhost:3000
npm run typecheck  # tsc --noEmit
```

Os scripts `npm run check` e `npm run export:code` ainda dependem de uma pasta `scripts/` que não está neste repositório e não afetam o build.

## Deploy

Hospedado no **GitHub Pages** como site estático (`output: "export"`), com `basePath` configurado para project page.

O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) roda a cada push em `main`:

1. `npm ci`
2. `npm run build` com `NEXT_PUBLIC_BASE_PATH=/efeitos-landing-page`
3. publicação do `out/` no Pages

Para atualizar o site, basta:

```bash
git add -A
git commit -m "sua mudança"
git push
```

## Estrutura

```text
app/
  page.tsx              home curada
  lab/page.tsx          índice com filtros
  lab/[slug]/page.tsx   ficha + demo isolada
components/
  home/                 seções da home
  lab/                  cards, filtros, moldura e prompt
  demos/                uma demo por efeito (DemoKit compartilhado)
  ui/                   primitivos (Reveal, Tilt3D, Aurora, botões)
  layout/               navbar, footer, grain, Lenis
lib/
  effects.ts            registro único dos 29 efeitos
  gsap.ts, lenis.ts     integrações
  weights.ts            pesos medidos no build
```
