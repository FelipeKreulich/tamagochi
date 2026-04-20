"use client";

import type { Pet } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { Sprite } from "./Sprite";
import { getSpriteFor, poopFrames, poopPalette } from "./sprites";

interface PetSpriteProps {
  pet: Pet;
  pixelSize?: number;
  onClick?: () => void;
  bouncing?: boolean;
  disabled?: boolean;
  clickable?: boolean;
}

export function PetSprite({
  pet,
  pixelSize = 8,
  onClick,
  bouncing,
  disabled,
  clickable,
}: PetSpriteProps) {
  const stage = pet.stage === "egg" ? "egg" : "post-egg";
  const { frames, palette } = getSpriteFor(
    pet.species,
    pet.mood,
    stage,
    pet.variant
  );

  const interactive = !!onClick && !disabled;

  const variantAura =
    pet.variant === "mega"
      ? "drop-shadow-[0_0_6px_rgba(255,225,77,0.6)]"
      : pet.variant === "dark"
      ? "drop-shadow-[0_0_6px_rgba(255,42,77,0.5)]"
      : "";

  const inner = (
    <div className={cn("relative", variantAura)}>
      <Sprite
        frames={frames}
        palette={palette}
        pixelSize={pixelSize}
        frameDurationMs={pet.mood === "sleeping" ? 1200 : 420}
      />
      {pet.variant === "mega" && pet.stage !== "egg" && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 text-[14px] text-[#ffe14d] animate-[lcdflicker_0.8s_steps(2)_infinite]"
        >
          ★
        </span>
      )}
      {pet.variant === "dark" && pet.stage !== "egg" && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 text-[14px] text-[#ff2a4d] animate-[lcdflicker_0.6s_steps(2)_infinite]"
        >
          ☠
        </span>
      )}
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-3">
      {interactive ? (
        <button
          type="button"
          onClick={onClick}
          aria-label={`Pat ${pet.name}`}
          className={cn(
            "border-0 bg-transparent p-0",
            clickable && "cursor-pointer",
            bouncing && "animate-[pixelbounce_0.5s_steps(4)_2]",
            disabled && "opacity-60"
          )}
        >
          {inner}
        </button>
      ) : (
        <div className={cn(bouncing && "animate-[pixelbounce_0.5s_steps(4)_2]")}>
          {inner}
        </div>
      )}
      {pet.poopCount > 0 && (
        <div className="flex flex-col items-center gap-1">
          {Array.from({ length: Math.min(pet.poopCount, 3) }).map((_, i) => (
            <Sprite
              key={i}
              frames={poopFrames}
              palette={poopPalette}
              pixelSize={Math.max(3, Math.floor(pixelSize / 2))}
              frameDurationMs={600 + i * 100}
              flicker={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
