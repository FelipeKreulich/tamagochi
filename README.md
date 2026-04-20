# Tamagochi — Retro Pet

Jogo estilo **Tamagotchi** com estética retrô autêntica dos anos 90, feito para
a web. 100% client-side, persistência em `localStorage` — sem backend.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **TailwindCSS v4** (dark-only, paleta LCD custom)
- **shadcn/ui** (base-nova, tema neutral)
- Fonte pixelada **Press Start 2P** via `next/font`
- **Vitest** + **Testing Library** (jsdom) para testes
- **Husky** + **lint-staged** no pre-commit
- **Web Audio API** para os beeps 8-bit (Fase 2)

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm test         # roda testes unitários
npm run test:watch
```

O hook de pre-commit roda `lint-staged` + `vitest run` automaticamente.

## Estrutura

```
src/
  app/                 # rotas Next (App Router)
  components/
    tamagotchi/        # componentes visuais do jogo
    ui/                # shadcn/ui
  lib/
    game/              # lógica pura: tipos, stats, decay, life-cycle
    audio/             # helpers Web Audio (beeps 8-bit)
    storage/           # wrappers de localStorage com versionamento
  hooks/               # useTamagotchi, useGameLoop, useAudio...
  types/               # tipos globais
```

## Paleta retrô (CSS variables)

| Token           | Uso                                  |
| --------------- | ------------------------------------ |
| `--lcd-dark`    | fundo principal (quase preto)        |
| `--lcd-bg`      | fundo LCD verde-escuro               |
| `--lcd-dim`     | tom médio (divisores, sombras)       |
| `--lcd-light`   | verde fosforescente (texto/sprites)  |
| `--accent-pink` | destaques (títulos, conquistas)      |
| `--accent-cyan` | ações, barras especiais              |

Classes Tailwind correspondentes: `bg-lcd-dark`, `text-lcd-light`,
`bg-accent-pink`, etc.

## Roadmap

### Fase 1 — Setup (concluída)
- Boilerplate Next.js + Tailwind v4 + shadcn/ui
- Paleta LCD + fonte pixelada
- Dark mode forçado
- Folder structure + tipos base
- Husky + Vitest configurados

### Fase 2 — Desenvolvimento
- [ ] Stats (fome, felicidade, energia, higiene, saúde) + decay temporal
- [ ] Game loop (`setInterval` + delta de tempo persistido)
- [ ] Estados visuais (feliz, triste, doente, dormindo, com fome, sujo, morto)
- [ ] Ciclo de vida (ovo → bebê → criança → adolescente → adulto → ancião)
- [ ] Morte permanente com causas
- [ ] Ações: alimentar (comida vs doce), brincar (minigame), dormir, banho,
      remédio, limpar
- [ ] Áudio 8-bit (Web Audio API) + toggle de mute persistente
- [ ] Tela inicial: nomear + escolher espécie (3 sprites)
- [ ] Notificações do navegador em stats críticos
- [ ] Cemitério + conquistas
- [ ] HUD segmentado + relógio/idade
- [ ] Reset com confirmação
- [ ] "Case" do Tamagotchi em CSS com botões A/B/C

## Licença

Uso pessoal / estudos.
