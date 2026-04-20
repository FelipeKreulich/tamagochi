import type { SaveState } from "@/lib/storage";
import type { Achievement } from "./types";
import type { Dictionary } from "@/lib/i18n";

export type AchievementKey =
  | "firstHatch"
  | "teenReached"
  | "adultReached"
  | "elderReached"
  | "firstWeek"
  | "neverSick"
  | "fullLife"
  | "petCollector";

export interface AchievementDef {
  key: AchievementKey;
  id: string;
  check: (state: SaveState) => boolean;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    key: "firstHatch",
    id: "first-hatch",
    check: (s) => !!s.pet && s.pet.stage !== "egg",
  },
  {
    key: "teenReached",
    id: "teen-reached",
    check: (s) =>
      !!s.pet && ["teen", "adult", "elder"].includes(s.pet.stage),
  },
  {
    key: "adultReached",
    id: "adult-reached",
    check: (s) => !!s.pet && ["adult", "elder"].includes(s.pet.stage),
  },
  {
    key: "elderReached",
    id: "elder-reached",
    check: (s) => !!s.pet && s.pet.stage === "elder",
  },
  {
    key: "firstWeek",
    id: "first-week",
    check: (s) => !!s.pet && s.pet.ageMinutes >= 60,
  },
  {
    key: "neverSick",
    id: "never-sick",
    check: (s) =>
      !!s.pet &&
      !s.pet.isSick &&
      ["adult", "elder"].includes(s.pet.stage),
  },
  {
    key: "fullLife",
    id: "full-life",
    check: (s) => s.graveyard.some((g) => g.causeOfDeath === "oldAge"),
  },
  {
    key: "petCollector",
    id: "pet-collector",
    check: (s) => s.graveyard.length >= 3,
  },
];

export function getAchievementText(
  def: AchievementDef,
  dict: Dictionary
): { title: string; description: string } {
  return dict.achievements[def.key];
}

export function checkAchievements(
  state: SaveState,
  defs: AchievementDef[] = ACHIEVEMENTS
): Achievement[] {
  const unlocked: Achievement[] = [];
  for (const def of defs) {
    const already = state.achievements.find((a) => a.id === def.id);
    if (already?.unlockedAt) continue;
    if (def.check(state)) {
      unlocked.push({
        id: def.id,
        title: def.key,
        description: def.key,
        unlockedAt: Date.now(),
      });
    }
  }
  return unlocked;
}
