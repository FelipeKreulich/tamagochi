import type { Achievement, GraveyardEntry, Pet } from "@/lib/game/types";

export const STORAGE_VERSION = 1 as const;

export const STORAGE_KEY = "tamagochi:save";

export interface SaveStateV1 {
  version: typeof STORAGE_VERSION;
  pet: Pet | null;
  graveyard: GraveyardEntry[];
  achievements: Achievement[];
  settings: {
    muted: boolean;
    notificationsEnabled: boolean;
  };
  updatedAt: number;
}

export type SaveState = SaveStateV1;

export const INITIAL_SAVE_STATE: SaveState = {
  version: STORAGE_VERSION,
  pet: null,
  graveyard: [],
  achievements: [],
  settings: {
    muted: false,
    notificationsEnabled: false,
  },
  updatedAt: 0,
};
