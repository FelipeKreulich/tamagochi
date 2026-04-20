import { beforeEach, describe, expect, it } from "vitest";
import {
  INITIAL_SAVE_STATE,
  STORAGE_KEY,
  clearSave,
  loadSave,
  migrate,
  saveSave,
  type SaveState,
} from "./index";

describe("storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns INITIAL_SAVE_STATE when nothing is stored", () => {
    expect(loadSave()).toEqual(INITIAL_SAVE_STATE);
  });

  it("persists and reloads a save roundtrip", () => {
    const state: SaveState = {
      ...INITIAL_SAVE_STATE,
      settings: { muted: true, notificationsEnabled: true },
    };
    saveSave(state);
    const loaded = loadSave();
    expect(loaded.settings.muted).toBe(true);
    expect(loaded.settings.notificationsEnabled).toBe(true);
    expect(loaded.updatedAt).toBeGreaterThan(0);
  });

  it("clears the save", () => {
    saveSave({ ...INITIAL_SAVE_STATE });
    clearSave();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("returns INITIAL_SAVE_STATE for corrupt JSON", () => {
    window.localStorage.setItem(STORAGE_KEY, "{{{not-json");
    expect(loadSave()).toEqual(INITIAL_SAVE_STATE);
  });

  it("migrates unknown version back to INITIAL_SAVE_STATE", () => {
    const fake = { version: 999, foo: "bar" };
    expect(migrate(fake)).toEqual(INITIAL_SAVE_STATE);
  });

  it("preserves v1 payload through migrate", () => {
    const v1: SaveState = {
      version: 1,
      pet: null,
      graveyard: [],
      achievements: [],
      settings: { muted: true, notificationsEnabled: false },
      updatedAt: 12345,
    };
    expect(migrate(v1).settings.muted).toBe(true);
  });
});
