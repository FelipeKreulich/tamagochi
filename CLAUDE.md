# CLAUDE.md — Contexto do projeto para Claude Code

Este arquivo dá contexto ao Claude Code ao trabalhar neste repositório. Leia
antes de sugerir mudanças.

## Visão geral

Jogo estilo **Tamagotchi** na web, com estética retrô dos anos 90. 100%
client-side (sem backend), persistência em `localStorage` com versionamento.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- TailwindCSS v4 (tema via `@theme` em `globals.css`, **sem** `tailwind.config.*`)
- shadcn/ui (preset `base-nova`, baseColor `neutral`, CSS vars habilitadas)
- Fonte `Press Start 2P` via `next/font/google`
- Vitest (jsdom) + Testing Library
- Husky + lint-staged no pre-commit
- Web Audio API para beeps (a ser implementado na Fase 2)

## Diretrizes obrigatórias

### Git / commits

- **NUNCA** incluir `Co-Authored-By: Claude ...` ou qualquer atribuição à
  Anthropic nos commits, PRs ou mensagens de git. Regra global do usuário.
- Mensagens em pt-BR no estilo Conventional Commits
  (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`).
- Branch padrão: **`master`** (remoto: `git@github.com:FelipeKreulich/tamagotchi.git`).
- Commitar em etapas lógicas (ex: "feat: pet stats and decay system",
  "feat: feeding action", "feat: minigame").

### Estilo visual

- **Dark-only**. `className="dark"` é fixo no `<html>`. Não adicionar toggle.
- Paleta LCD verde-escuro com 2 accents (pink e cyan). Manter a limitação.
- Pixel art via CSS (`box-shadow` layering) ou SVG com `image-rendering: pixelated`.
- Fonte `Press Start 2P` em tudo — evitar antialias (`-webkit-font-smoothing: none`).
- Bordas **quadradas** (`--radius: 0px`). Nunca arredondar cantos.
- Animações em `steps(...)`, nunca suaves (estética de console portátil).

### Arquitetura

- Lógica de jogo **pura** (sem JSX) em `src/lib/game/`. Testar com Vitest.
- UI em Client Components (`"use client"`) quando consumir estado/hooks.
- Hook central `useTamagotchi` (a criar na Fase 2) expõe
  `{ pet, stats, actions, isAlive, ... }`.
- Persistir tudo via `src/lib/storage/` com schema versionado. Se encontrar
  `version` antiga no localStorage → migrar, não descartar.
- Decaimento temporal calculado via delta de timestamp (funciona mesmo com
  aba fechada).
- Mobile-first — o "aparelho" deve parecer um Tamagotchi portátil.

## Estrutura de pastas

```
src/
  app/                         # rotas Next (App Router)
  components/
    tamagotchi/                # sprites, HUD, case do aparelho
    ui/                        # shadcn/ui (não editar manualmente)
  lib/
    game/
      types.ts                 # Pet, Stats, LifeStage, Mood, Species, Achievement
      ...                      # decay, tick, life-cycle (Fase 2)
    audio/                     # Web Audio helpers (Fase 2)
    storage/
      schema.ts                # SaveState versionado + INITIAL_SAVE_STATE
      ...                      # load/save/migrate (Fase 2)
    utils.ts                   # cn() do shadcn
  hooks/                       # useTamagotchi, useGameLoop, useAudio (Fase 2)
  types/                       # tipos globais
```

## Status atual

**Fase 1 concluída**: setup do projeto (boilerplate, shadcn, paleta, fonte,
dark mode, folder structure, tipos base, Husky, Vitest).

**Fase 2 pendente** (aguardando confirmação do usuário): mecânicas do jogo,
áudio, telas, conquistas, cemitério. Ver roadmap completo em `README.md`.

## Scripts

```bash
npm run dev          # dev server
npm run build        # build de produção
npm test             # roda Vitest uma vez
npm run test:watch   # Vitest em watch mode
npm run lint         # ESLint
```

## Convenções de teste

- Testes co-localizados (`foo.test.ts` ao lado do `foo.ts`).
- Preferir testar **lógica pura** (em `lib/game/`) sobre DOM.
- Para componentes, usar `@testing-library/react` + `@testing-library/jest-dom`
  (já configurado em `vitest.setup.ts`).

## Coisas que o Claude NÃO deve fazer

- Não iniciar a Fase 2 sem confirmação explícita do usuário.
- Não usar assinatura Claude/Anthropic em commits.
- Não instalar libs pesadas (charts, animation libs, etc) sem necessidade.
- Não adicionar light mode ou theme toggle — é dark-only por design.
- Não criar um backend, API routes para persistência, ou SSR para o estado do
  jogo. Tudo é client-side + `localStorage`.
