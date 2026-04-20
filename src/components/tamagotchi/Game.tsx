"use client";

import { useMemo, useState } from "react";
import {
  Apple,
  Bath,
  Candy,
  Gamepad2,
  Moon,
  Pill,
  RotateCcw,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTamagotchi } from "@/hooks/useTamagotchi";
import { useIntroMusic } from "@/hooks/useIntroMusic";
import type { Species } from "@/lib/game/types";
import { StartScreen } from "./StartScreen";
import { TamagotchiCase } from "./TamagotchiCase";
import { PetSprite } from "./PetSprite";
import { HUD } from "./HUD";
import { ActionMenu, type ActionItem } from "./ActionMenu";
import { DeathScreen } from "./DeathScreen";
import { MuteToggle } from "./MuteToggle";
import { MiniGame } from "./MiniGame";
import { Sprite } from "./Sprite";
import { eggFrames } from "./sprites/egg";
import { SPECIES_META } from "./sprites";
import { toast } from "sonner";

export function Game() {
  const tama = useTamagotchi();
  const { pet, hydrated, settings, actions, achievements, graveyard } = tama;

  const onStartScreen = !pet;
  const showIntroMusic = !hydrated || onStartScreen || (pet && !pet.isAlive);

  useIntroMusic({ muted: settings.muted, enabled: !!showIntroMusic });

  const [menuIndex, setMenuIndex] = useState(0);
  const [miniOpen, setMiniOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [graveyardOpen, setGraveyardOpen] = useState(false);

  const actionItems = useMemo<ActionItem[]>(() => {
    if (!pet) return [];
    const sleepDisabled = !pet.isAlive;
    return [
      {
        id: "food",
        label: "COMER",
        icon: Apple,
        onSelect: () => {
          actions.feedFood();
          toast("🍎 Refeição servida!");
        },
        disabled: !pet.isAlive || pet.isSleeping,
      },
      {
        id: "candy",
        label: "DOCE",
        icon: Candy,
        onSelect: () => {
          actions.feedCandy();
          toast("🍬 Um docinho...");
        },
        disabled: !pet.isAlive || pet.isSleeping,
      },
      {
        id: "play",
        label: "BRINCAR",
        icon: Gamepad2,
        onSelect: () => setMiniOpen(true),
        disabled: !pet.isAlive || pet.isSleeping,
      },
      {
        id: "sleep",
        label: pet.isSleeping ? "ACORDAR" : "DORMIR",
        icon: Moon,
        onSelect: () => {
          if (pet.isSleeping) {
            actions.wake();
            toast("☀ Bom dia!");
          } else {
            actions.sleep();
            toast("💤 Boa noite...");
          }
        },
        disabled: sleepDisabled,
      },
      {
        id: "bath",
        label: "BANHO",
        icon: Bath,
        onSelect: () => {
          actions.bath();
          toast("🛁 Limpinho!");
        },
        disabled: !pet.isAlive || pet.isSleeping,
      },
      {
        id: "medicine",
        label: "REMEDIO",
        icon: Pill,
        onSelect: () => {
          if (!pet.isSick) {
            toast.error("Bichinho não está doente.");
          } else {
            actions.medicine();
            toast("💊 Curado!");
          }
        },
        disabled: !pet.isAlive,
      },
      {
        id: "clean",
        label: "LIMPAR",
        icon: Trash2,
        onSelect: () => {
          if (pet.poopCount <= 0) {
            toast.error("Nada para limpar.");
          } else {
            actions.cleanPoop();
            toast("🧹 Sujeira removida");
          }
        },
        disabled: !pet.isAlive,
      },
      {
        id: "reset",
        label: "RESET",
        icon: RotateCcw,
        onSelect: () => setResetOpen(true),
      },
    ];
  }, [pet, actions]);

  const handleA = () => {
    if (!pet) return;
    setMenuIndex((i) => (i - 1 + actionItems.length) % actionItems.length);
  };
  const handleB = () => {
    if (!pet) return;
    const item = actionItems[menuIndex];
    if (item && !item.disabled) item.onSelect();
  };
  const handleC = () => {
    if (!pet) return;
    setMenuIndex((i) => (i + 1) % actionItems.length);
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[10px] uppercase tracking-widest text-lcd-light">
        carregando...
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="flex items-center justify-between gap-2">
        <MuteToggle
          muted={settings.muted}
          onToggle={() => actions.setMuted(!settings.muted)}
          label={settings.muted ? "MUTE" : "SOM"}
        />
        {graveyard.length > 0 && (
          <button
            type="button"
            onClick={() => setGraveyardOpen(true)}
            className="inline-flex items-center gap-1 border-2 border-lcd-light bg-lcd-dark px-3 py-2 text-[9px] uppercase tracking-widest text-lcd-light hover:border-accent-pink hover:text-accent-pink"
          >
            <Sparkles className="h-3 w-3" /> CEMITERIO ({graveyard.length})
          </button>
        )}
      </div>

      <TamagotchiCase
        onA={handleA}
        onB={handleB}
        onC={handleC}
        labelA="◀"
        labelB="OK"
        labelC="▶"
      >
        <div className="flex min-h-[260px] flex-col items-center justify-center gap-3">
          {onStartScreen ? (
            <StartScreen
              onStart={(name, species) => actions.start(name, species as Species)}
            />
          ) : pet && !pet.isAlive ? (
            <DeathScreen pet={pet} onNew={actions.reset} />
          ) : (
            pet && (
              <div className="flex w-full flex-col items-center gap-3">
                <HUD pet={pet} />
                <div className="flex min-h-[110px] items-center justify-center">
                  {pet.stage === "egg" ? (
                    <Sprite
                      frames={eggFrames}
                      palette={SPECIES_META[pet.species].palette}
                      pixelSize={8}
                      frameDurationMs={500}
                    />
                  ) : (
                    <PetSprite pet={pet} pixelSize={8} />
                  )}
                </div>
                <ActionMenu items={actionItems} selectedIndex={menuIndex} />
              </div>
            )
          )}
        </div>
      </TamagotchiCase>

      {achievements.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-1 px-4 text-center text-[8px] uppercase tracking-widest text-accent-cyan">
          <Sparkles className="h-3 w-3" />
          <span>{achievements.length} CONQUISTAS</span>
        </div>
      )}

      <Dialog open={miniOpen} onOpenChange={setMiniOpen}>
        <DialogContent className="rounded-none border-4 border-lcd-light bg-lcd-dark font-pixel text-lcd-light sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-[11px] uppercase tracking-widest text-accent-pink">
              ADIVINHE 1-3
            </DialogTitle>
            <DialogDescription className="text-[9px] uppercase tracking-widest text-lcd-light/80">
              Acerte pra deixar {pet?.name} feliz.
            </DialogDescription>
          </DialogHeader>
          {pet && (
            <MiniGame
              pet={pet}
              onFinish={(won) => {
                actions.playMinigame(won);
                toast(won ? "🎉 Acertou!" : "😢 Errou...");
                setMiniOpen(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent className="rounded-none border-4 border-lcd-light bg-lcd-dark font-pixel text-lcd-light sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-[11px] uppercase tracking-widest text-accent-pink">
              APAGAR BICHINHO?
            </DialogTitle>
            <DialogDescription className="text-[9px] uppercase tracking-widest text-lcd-light/80">
              Isso vai remover {pet?.name} sem ir pro cemitério.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-2">
            <button
              type="button"
              onClick={() => setResetOpen(false)}
              className="flex-1 border-2 border-lcd-light bg-lcd-dark px-3 py-2 text-[9px] uppercase tracking-widest text-lcd-light"
            >
              CANCELAR
            </button>
            <button
              type="button"
              onClick={() => {
                actions.reset();
                setResetOpen(false);
              }}
              className="flex-1 border-2 border-accent-pink bg-accent-pink/20 px-3 py-2 text-[9px] uppercase tracking-widest text-accent-pink"
            >
              APAGAR
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={graveyardOpen} onOpenChange={setGraveyardOpen}>
        <DialogContent className="rounded-none border-4 border-lcd-light bg-lcd-dark font-pixel text-lcd-light sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-[11px] uppercase tracking-widest text-accent-pink">
              CEMITERIO
            </DialogTitle>
            <DialogDescription className="text-[9px] uppercase tracking-widest text-lcd-light/80">
              Bichinhos que partiram...
            </DialogDescription>
          </DialogHeader>
          <ul className="max-h-60 space-y-2 overflow-y-auto pr-1">
            {graveyard.map((g) => (
              <li
                key={g.id}
                className="border-2 border-lcd-light/40 bg-lcd-dim/60 p-2 text-[9px] uppercase tracking-widest"
              >
                <div className="flex justify-between text-lcd-light">
                  <span>{g.name}</span>
                  <span className="text-accent-cyan">{g.species}</span>
                </div>
                <div className="text-[8px] text-lcd-light/70">
                  {g.ageMinutes}min · {g.causeOfDeath}
                </div>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </main>
  );
}
