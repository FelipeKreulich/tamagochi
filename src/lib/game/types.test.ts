import { describe, it, expect } from "vitest";
import type { Pet, Stats } from "./types";

describe("game types", () => {
  it("allows constructing a valid Stats object with 0-100 values", () => {
    const stats: Stats = {
      hunger: 80,
      happiness: 70,
      energy: 60,
      hygiene: 90,
      health: 100,
    };
    expect(stats.hunger).toBe(80);
    expect(Object.keys(stats)).toHaveLength(5);
  });

  it("allows constructing a Pet in egg stage", () => {
    const pet: Pet = {
      id: "abc",
      name: "Pixel",
      species: "blob",
      variant: "normal",
      stage: "egg",
      mood: "happy",
      stats: {
        hunger: 100,
        happiness: 100,
        energy: 100,
        hygiene: 100,
        health: 100,
      },
      counters: {
        feed: 0,
        candy: 0,
        bath: 0,
        play: 0,
        playWins: 0,
        sleep: 0,
        medicine: 0,
        clean: 0,
      },
      statsHistory: [],
      lastSampleAt: 0,
      bornAt: 0,
      ageMinutes: 0,
      lastTickAt: 0,
      isAlive: true,
      diedAt: null,
      causeOfDeath: null,
      poopCount: 0,
      isSleeping: false,
      isSick: false,
      everSick: false,
    };
    expect(pet.isAlive).toBe(true);
    expect(pet.stage).toBe("egg");
  });
});
