import {
  INITIAL_SAVE_STATE,
  STORAGE_KEY,
  STORAGE_VERSION,
  isSaveStateV1,
  type SaveState,
} from "./schema";

export { INITIAL_SAVE_STATE, STORAGE_KEY, STORAGE_VERSION };
export type { SaveState };

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadSave(): SaveState {
  if (!isBrowser()) return INITIAL_SAVE_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_SAVE_STATE;
    const parsed: unknown = JSON.parse(raw);
    return migrate(parsed);
  } catch {
    return INITIAL_SAVE_STATE;
  }
}

export function saveSave(state: SaveState): void {
  if (!isBrowser()) return;
  try {
    const next: SaveState = { ...state, updatedAt: Date.now() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota / JSON errors */
  }
}

export function clearSave(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function migrate(raw: unknown): SaveState {
  if (isSaveStateV1(raw)) {
    return {
      ...INITIAL_SAVE_STATE,
      ...raw,
      settings: { ...INITIAL_SAVE_STATE.settings, ...raw.settings },
    };
  }
  return INITIAL_SAVE_STATE;
}
