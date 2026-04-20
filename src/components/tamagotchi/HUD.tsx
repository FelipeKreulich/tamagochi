"use client";

import { useEffect, useState } from "react";
import type { Pet } from "@/lib/game/types";
import { StatBar } from "./StatBar";

const STAGE_LABEL: Record<Pet["stage"], string> = {
  egg: "OVO",
  baby: "BEBE",
  child: "CRIA",
  teen: "ADOL",
  adult: "ADUL",
  elder: "ANCI",
};

function formatAge(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return `${h}h${rem.toString().padStart(2, "0")}`;
}

interface HUDProps {
  pet: Pet;
}

export function HUD({ pet }: HUDProps) {
  const [now, setNow] = useState<number>(() => pet.lastTickAt);
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const ageSec = Math.max(0, Math.floor((now - pet.bornAt) / 1000));

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-lcd-light">
        <span className="truncate">{pet.name}</span>
        <span className="text-accent-cyan">{STAGE_LABEL[pet.stage]}</span>
        <span>{formatAge(ageSec)}</span>
      </div>
      <div className="space-y-1">
        <StatBar label="FOME" value={pet.stats.hunger} accent="green" />
        <StatBar label="FELI" value={pet.stats.happiness} accent="pink" />
        <StatBar label="ENER" value={pet.stats.energy} accent="cyan" />
        <StatBar label="HIGI" value={pet.stats.hygiene} accent="green" />
        <StatBar label="SAUD" value={pet.stats.health} accent="pink" />
      </div>
      <div className="flex flex-wrap items-center gap-1 text-[8px] uppercase tracking-widest text-muted-foreground">
        {pet.isSleeping && <span className="text-accent-cyan">Zzz DORMINDO</span>}
        {pet.isSick && <span className="text-accent-pink">* DOENTE</span>}
        {pet.poopCount > 0 && (
          <span className="text-accent-pink">x{pet.poopCount} SUJEIRA</span>
        )}
      </div>
    </div>
  );
}
