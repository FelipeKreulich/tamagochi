"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import type { Pet } from "@/lib/game/types";
import { StatBar } from "./StatBar";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function formatAge(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}min`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return `${h}h${rem.toString().padStart(2, "0")}`;
}

interface HUDProps {
  pet: Pet;
  className?: string;
  onRenameClick?: () => void;
}

export function HUD({ pet, className, onRenameClick }: HUDProps) {
  const dict = useT();
  const [now, setNow] = useState<number>(() => pet.lastTickAt);
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const ageSec = Math.max(0, Math.floor((now - pet.bornAt) / 1000));

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-4 border-4 border-lcd-light bg-lcd-dark p-4 shadow-[6px_6px_0_0] shadow-lcd-dim",
        className
      )}
    >
      <div className="space-y-1 border-b-2 border-dashed border-lcd-light/30 pb-3">
        <p className="text-[8px] uppercase tracking-[0.3em] text-lcd-light/60">
          {dict.hud.pet}
        </p>
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm uppercase tracking-widest text-accent-pink">
            {pet.name}
          </p>
          {onRenameClick && pet.isAlive && (
            <button
              type="button"
              onClick={onRenameClick}
              aria-label={dict.hud.renameAria}
              title={dict.hud.renameAria}
              className="flex h-5 w-5 shrink-0 items-center justify-center border border-lcd-light/40 text-lcd-light/70 transition-colors hover:border-accent-pink hover:text-accent-pink"
            >
              <Pencil className="h-3 w-3" />
            </button>
          )}
        </div>
        <div className="flex items-center justify-between text-[9px] uppercase tracking-widest">
          <span className="flex items-center gap-1 text-accent-cyan">
            {dict.stages[pet.stage]}
            {pet.variant === "mega" && (
              <span className="text-[#ffe14d]">★</span>
            )}
            {pet.variant === "dark" && (
              <span className="text-[#ff2a4d]">☠</span>
            )}
          </span>
          <span className="text-lcd-light">{formatAge(ageSec)}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2">
        <StatBar label={dict.stats.hunger} value={pet.stats.hunger} accent="green" />
        <StatBar label={dict.stats.happiness} value={pet.stats.happiness} accent="pink" />
        <StatBar label={dict.stats.energy} value={pet.stats.energy} accent="cyan" />
        <StatBar label={dict.stats.hygiene} value={pet.stats.hygiene} accent="green" />
        <StatBar label={dict.stats.health} value={pet.stats.health} accent="pink" />
      </div>

      {(pet.isSleeping || pet.isSick || pet.poopCount > 0) && (
        <div className="flex flex-wrap gap-2 border-t-2 border-dashed border-lcd-light/30 pt-3 text-[8px] uppercase tracking-widest">
          {pet.isSleeping && (
            <span className="border-2 border-accent-cyan px-2 py-1 text-accent-cyan">
              {dict.flags.sleeping}
            </span>
          )}
          {pet.isSick && (
            <span className="border-2 border-accent-pink px-2 py-1 text-accent-pink animate-[pixelshake_0.8s_steps(2)_infinite]">
              {dict.flags.sick}
            </span>
          )}
          {pet.poopCount > 0 && (
            <span className="border-2 border-accent-pink px-2 py-1 text-accent-pink">
              x{pet.poopCount} {dict.flags.dirty}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
