"use client";

import { useState } from "react";
import type { Species } from "@/lib/game/types";
import { Sprite } from "./Sprite";
import { SPECIES_META } from "./sprites";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface StartScreenProps {
  onStart: (name: string, species: Species) => void;
}

const SPECIES_ORDER: Species[] = ["blob", "dino", "cat"];

export function StartScreen({ onStart }: StartScreenProps) {
  const dict = useT();
  const [name, setName] = useState("");
  const [species, setSpecies] = useState<Species>("blob");

  const nameTrim = name.trim();
  const canStart = nameTrim.length >= 2 && nameTrim.length <= 12;

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canStart) return;
        onStart(nameTrim, species);
      }}
    >
      <p className="text-center text-[9px] uppercase tracking-widest text-accent-pink">
        {dict.start.askName}
      </p>
      <label className="flex w-full flex-col items-center gap-2">
        <span className="text-[8px] uppercase tracking-widest text-lcd-light">
          {dict.start.nameLabel}
        </span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase().slice(0, 12))}
          placeholder={dict.start.placeholder}
          maxLength={12}
          autoFocus
          className="w-full border-2 border-lcd-light bg-lcd-dark px-2 py-2 text-center text-[11px] uppercase tracking-widest text-lcd-light caret-accent-pink outline-none focus:border-accent-pink"
        />
      </label>
      <div className="w-full space-y-2">
        <p className="text-center text-[8px] uppercase tracking-widest text-lcd-light/80">
          {dict.start.speciesLabel}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {SPECIES_ORDER.map((s) => {
            const meta = SPECIES_META[s];
            const selected = s === species;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSpecies(s)}
                className={cn(
                  "flex flex-col items-center gap-1 border-2 border-lcd-light/40 bg-lcd-dark p-2 transition-colors",
                  selected && "border-accent-pink bg-accent-pink/10"
                )}
              >
                <Sprite
                  frames={meta.previewFrames}
                  palette={meta.palette}
                  pixelSize={4}
                />
                <span
                  className={cn(
                    "text-[8px] uppercase tracking-widest",
                    selected ? "text-accent-pink" : "text-lcd-light"
                  )}
                >
                  {meta.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <button
        type="submit"
        disabled={!canStart}
        className={cn(
          "mt-1 w-full border-2 border-lcd-light bg-lcd-light px-3 py-2 text-[10px] uppercase tracking-widest text-lcd-dark transition-[transform,box-shadow] active:translate-x-[2px] active:translate-y-[2px]",
          !canStart && "cursor-not-allowed opacity-40"
        )}
      >
        {dict.start.hatch}
      </button>
    </form>
  );
}
