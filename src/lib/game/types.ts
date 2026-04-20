export type Species = "blob" | "dino" | "cat";

export type LifeStage =
  | "egg"
  | "baby"
  | "child"
  | "teen"
  | "adult"
  | "elder";

export type Mood =
  | "happy"
  | "sad"
  | "sick"
  | "sleeping"
  | "hungry"
  | "dirty"
  | "dead";

export interface Stats {
  hunger: number;
  happiness: number;
  energy: number;
  hygiene: number;
  health: number;
}

export interface Counters {
  feed: number;
  candy: number;
  bath: number;
  play: number;
  playWins: number;
  sleep: number;
  medicine: number;
  clean: number;
}

export interface Pet {
  id: string;
  name: string;
  species: Species;
  stage: LifeStage;
  mood: Mood;
  stats: Stats;
  counters: Counters;
  statsHistory: StatSample[];
  lastSampleAt: number;
  bornAt: number;
  ageMinutes: number;
  lastTickAt: number;
  isAlive: boolean;
  diedAt: number | null;
  causeOfDeath: string | null;
  poopCount: number;
  isSleeping: boolean;
  isSick: boolean;
  everSick: boolean;
}

export const EMPTY_COUNTERS: Counters = {
  feed: 0,
  candy: 0,
  bath: 0,
  play: 0,
  playWins: 0,
  sleep: 0,
  medicine: 0,
  clean: 0,
};

export interface StatSample {
  t: number;
  hunger: number;
  happiness: number;
  energy: number;
  hygiene: number;
  health: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: number | null;
}

export interface GraveyardEntry {
  id: string;
  name: string;
  species: Species;
  bornAt: number;
  diedAt: number;
  ageMinutes: number;
  causeOfDeath: string;
}
