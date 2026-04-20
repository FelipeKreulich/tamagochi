"use client";

import { Sparkles } from "lucide-react";
import type { Achievement } from "@/lib/game/types";
import { ACHIEVEMENTS } from "@/lib/game/achievements";
import { useT } from "@/lib/i18n";

interface AchievementBannerProps {
  achievement: Achievement;
}

export function AchievementBanner({ achievement }: AchievementBannerProps) {
  const dict = useT();

  const def = ACHIEVEMENTS.find((d) => d.id === achievement.id);
  const text = def ? dict.achievements[def.key] : null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-24 z-[120] flex justify-center"
      aria-live="polite"
    >
      <div className="relative flex min-w-[280px] max-w-[90vw] animate-[achievementIn_3.4s_steps(16)_forwards] flex-col items-center gap-2 border-4 border-accent-cyan bg-lcd-dark px-5 py-4 shadow-[8px_8px_0_0] shadow-accent-cyan/50"
        style={{ left: "50%" }}
      >
        <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] text-accent-cyan">
          <Sparkles className="h-3 w-3 animate-[lcdflicker_0.6s_steps(2)_infinite]" />
          {dict.achievementsDialog.unlockedBanner}
          <Sparkles className="h-3 w-3 animate-[lcdflicker_0.6s_steps(2)_infinite]" />
        </div>
        <p className="text-base uppercase tracking-widest text-accent-pink">
          {text?.title ?? achievement.id}
        </p>
        <p className="text-center text-[9px] leading-relaxed text-lcd-light/90">
          {text?.description ?? ""}
        </p>
      </div>
    </div>
  );
}
