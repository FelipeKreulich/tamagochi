"use client";

import type { Pet } from "@/lib/game/types";
import { PetSprite } from "./PetSprite";

interface DeathScreenProps {
  pet: Pet;
  onNew: () => void;
}

export function DeathScreen({ pet, onNew }: DeathScreenProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-[10px] uppercase tracking-widest text-accent-pink animate-[pixelshake_1.6s_steps(2)_infinite]">
        R.I.P.
      </p>
      <PetSprite pet={pet} pixelSize={6} />
      <div className="space-y-1 text-[8px] uppercase tracking-widest text-lcd-light">
        <p>{pet.name}</p>
        <p className="text-accent-cyan">{pet.ageMinutes}min de vida</p>
        <p>{pet.causeOfDeath ?? "Causas desconhecidas"}</p>
      </div>
      <button
        type="button"
        onClick={onNew}
        className="mt-2 w-full border-2 border-lcd-light bg-lcd-dark px-3 py-2 text-[9px] uppercase tracking-widest text-lcd-light hover:border-accent-pink hover:text-accent-pink"
      >
        NOVO BICHINHO
      </button>
    </div>
  );
}
