"use client";

import { useState } from "react";
import { Coins, Dice5, Music, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Pet } from "@/lib/game/types";
import { tpl, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { MiniGame } from "./MiniGame";
import { SimonGame } from "./minigames/SimonGame";
import { ReflexGame } from "./minigames/ReflexGame";

type GameKind = "hub" | "guess" | "simon" | "reflex";

interface MinigameHubProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: Pet;
  muted: boolean;
  coins: number;
  onFinishGuess: (won: boolean) => void;
  onFinishGeneric: (result: {
    happiness: number;
    coins: number;
    won: boolean;
  }) => void;
}

export function MinigameHub({
  open,
  onOpenChange,
  pet,
  muted,
  coins,
  onFinishGuess,
  onFinishGeneric,
}: MinigameHubProps) {
  const dict = useT();
  const [kind, setKind] = useState<GameKind>("hub");

  const handleOpenChange = (next: boolean) => {
    if (!next) setKind("hub");
    onOpenChange(next);
  };

  const closeWith = <T extends () => void>(fn: T) => {
    fn();
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-none border-4 border-lcd-light bg-lcd-dark font-pixel text-lcd-light sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[11px] uppercase tracking-widest text-accent-pink">
            {kind === "hub"
              ? dict.minigameHub.title
              : kind === "guess"
              ? dict.minigame.title
              : kind === "simon"
              ? dict.simon.title
              : dict.reflex.title}
          </DialogTitle>
          <DialogDescription className="text-[9px] uppercase tracking-widest text-lcd-light/80">
            {kind === "hub"
              ? tpl(dict.minigameHub.subtitle, { name: pet.name })
              : kind === "guess"
              ? tpl(dict.minigame.subtitle, { name: pet.name })
              : kind === "simon"
              ? dict.simon.subtitle
              : dict.reflex.subtitle}
          </DialogDescription>
        </DialogHeader>

        {kind === "hub" && (
          <>
            <div className="flex items-center justify-between border-2 border-lcd-light/40 bg-lcd-dim/40 p-2">
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-accent-pink" />
                <span className="text-[9px] uppercase tracking-widest text-lcd-light/80">
                  {dict.minigameHub.coins}
                </span>
              </div>
              <span className="text-sm uppercase tracking-widest text-accent-pink">
                {coins}
              </span>
            </div>

            <div className="grid gap-2">
              <HubCard
                icon={Dice5}
                title={dict.minigameHub.guessName}
                desc={dict.minigameHub.guessDesc}
                onClick={() => setKind("guess")}
                accent="green"
              />
              <HubCard
                icon={Music}
                title={dict.minigameHub.simonName}
                desc={dict.minigameHub.simonDesc}
                onClick={() => setKind("simon")}
                accent="pink"
              />
              <HubCard
                icon={Zap}
                title={dict.minigameHub.reflexName}
                desc={dict.minigameHub.reflexDesc}
                onClick={() => setKind("reflex")}
                accent="cyan"
              />
            </div>
          </>
        )}

        {kind === "guess" && (
          <MiniGame
            pet={pet}
            onFinish={(won) => closeWith(() => onFinishGuess(won))}
          />
        )}

        {kind === "simon" && (
          <SimonGame
            muted={muted}
            onFinish={(result) => closeWith(() => onFinishGeneric(result))}
          />
        )}

        {kind === "reflex" && (
          <ReflexGame
            muted={muted}
            onFinish={(result) => closeWith(() => onFinishGeneric(result))}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function HubCard({
  icon: Icon,
  title,
  desc,
  onClick,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  onClick: () => void;
  accent: "green" | "pink" | "cyan";
}) {
  const hover =
    accent === "pink"
      ? "hover:border-accent-pink hover:text-accent-pink"
      : accent === "cyan"
      ? "hover:border-accent-cyan hover:text-accent-cyan"
      : "hover:border-lcd-light";
  const color =
    accent === "pink"
      ? "text-accent-pink"
      : accent === "cyan"
      ? "text-accent-cyan"
      : "text-lcd-light";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex items-start gap-3 border-2 border-lcd-light/50 bg-lcd-dark p-3 text-left transition-colors",
        hover
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0", color)} />
      <div className="min-w-0 space-y-1">
        <p className={cn("text-[10px] uppercase tracking-widest", color)}>
          {title}
        </p>
        <p className="text-[8px] leading-relaxed text-lcd-light/80">{desc}</p>
      </div>
    </button>
  );
}
