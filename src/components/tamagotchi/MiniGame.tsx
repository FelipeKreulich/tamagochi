"use client";

import { useState } from "react";
import type { Pet } from "@/lib/game/types";
import { PetSprite } from "./PetSprite";
import { cn } from "@/lib/utils";

interface MiniGameProps {
  pet: Pet;
  onFinish: (won: boolean) => void;
}

export function MiniGame({ pet, onFinish }: MiniGameProps) {
  const [target] = useState(() => 1 + Math.floor(Math.random() * 3));
  const [picked, setPicked] = useState<number | null>(null);

  const won = picked !== null && picked === target;
  const finished = picked !== null;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={cn(
          "transition-transform",
          finished && won && "animate-[pixelbounce_0.6s_steps(4)_3]",
          finished && !won && "animate-[pixelshake_0.6s_steps(4)_2]"
        )}
      >
        <PetSprite pet={pet} pixelSize={6} />
      </div>
      {!finished ? (
        <>
          <p className="text-[9px] uppercase tracking-widest text-lcd-light/80">
            Em qual mão está o petisco?
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPicked(n)}
                className="flex h-14 w-14 items-center justify-center border-2 border-lcd-light bg-lcd-dark text-sm text-lcd-light hover:border-accent-pink hover:text-accent-pink"
              >
                {n}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p
            className={cn(
              "text-[10px] uppercase tracking-widest",
              won ? "text-accent-cyan" : "text-accent-pink"
            )}
          >
            {won ? "VOCÊ ACERTOU!" : `ERA ${target}`}
          </p>
          <button
            type="button"
            onClick={() => onFinish(won)}
            className="border-2 border-lcd-light bg-lcd-light px-4 py-2 text-[9px] uppercase tracking-widest text-lcd-dark"
          >
            CONTINUAR
          </button>
        </div>
      )}
    </div>
  );
}
