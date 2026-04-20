import type { Achievement, GraveyardEntry, Pet } from "@/lib/game/types";

export const STORAGE_VERSION = 1 as const;

export const STORAGE_KEY = "tamagochi:save";

export interface SaveStateV1 {
  version: 1;
  pet: Pet | null;
  graveyard: GraveyardEntry[];
  achievements: Achievement[];
  coins: number;
  settings: {
    muted: boolean;
    notificationsEnabled: boolean;
  };
  updatedAt: number;
}

export type SaveState = SaveStateV1;

export const INITIAL_SAVE_STATE: SaveState = {
  version: 1,
  pet: null,
  graveyard: [],
  achievements: [],
  coins: 0,
  settings: {
    muted: false,
    notificationsEnabled: false,
  },
  updatedAt: 0,
};

export function isSaveStateV1(value: unknown): value is SaveStateV1 {
  if (!value || typeof value !== "object") return false;
  const v = value as { version?: unknown };
  return v.version === 1;
}
