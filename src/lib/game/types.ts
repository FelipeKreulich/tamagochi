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

export interface Pet {
  id: string;
  name: string;
  species: Species;
  stage: LifeStage;
  mood: Mood;
  stats: Stats;
  bornAt: number;
  ageMinutes: number;
  lastTickAt: number;
  isAlive: boolean;
  diedAt: number | null;
  causeOfDeath: string | null;
  poopCount: number;
  isSleeping: boolean;
  isSick: boolean;
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
