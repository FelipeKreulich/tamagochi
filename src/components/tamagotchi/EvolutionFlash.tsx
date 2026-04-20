"use client";

import type { LifeStage } from "@/lib/game/types";
import { useT } from "@/lib/i18n";

interface EvolutionFlashProps {
  stage: LifeStage;
}

export function EvolutionFlash({ stage }: EvolutionFlashProps) {
  const dict = useT();
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
      aria-live="polite"
    >
      <div
        className="absolute inset-0 animate-[evoflash_1.6s_steps(8)_forwards]"
        style={{ mixBlendMode: "screen" }}
      />
      <div className="relative flex animate-[evopop_2.2s_ease-out_forwards] flex-col items-center gap-3 border-4 border-accent-pink bg-lcd-dark px-8 py-6 text-center shadow-[10px_10px_0_0] shadow-accent-pink/60">
        <p className="text-[12px] uppercase tracking-[0.4em] text-accent-pink animate-[lcdflicker_0.4s_steps(2)_infinite]">
          ★ EVOLVED ★
        </p>
        <p className="text-2xl uppercase tracking-widest text-lcd-light">
          {dict.stages[stage]}
        </p>
      </div>
    </div>
  );
}
