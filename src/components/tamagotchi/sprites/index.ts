import type { Mood, Species, Variant } from "@/lib/game/types";
import type { SpritePalette } from "../Sprite";
import type { PixelGrid } from "../Sprite";
import { eggFrames } from "./egg";
import {
  blobDead,
  blobDirty,
  blobHappyA,
  blobHappyB,
  blobSad,
  blobSick,
  blobSleeping,
} from "./blob";
import {
  dinoDead,
  dinoDirty,
  dinoHappyA,
  dinoHappyB,
  dinoSad,
  dinoSick,
  dinoSleeping,
} from "./dino";
import {
  catDead,
  catDirty,
  catHappyA,
  catHappyB,
  catSad,
  catSick,
  catSleeping,
} from "./cat";
import { poopFrameA, poopFrameB } from "./poop";

export const blobPalette: SpritePalette = {
  0: "transparent",
  1: "var(--lcd-dark)",
  2: "var(--lcd-light)",
  3: "var(--lcd-dark)",
  4: "var(--accent-pink)",
};

export const dinoPalette: SpritePalette = {
  0: "transparent",
  1: "var(--lcd-dark)",
  2: "var(--accent-cyan)",
  3: "var(--lcd-dark)",
  4: "var(--accent-pink)",
};

export const catPalette: SpritePalette = {
  0: "transparent",
  1: "var(--lcd-dark)",
  2: "var(--accent-pink)",
  3: "var(--lcd-dark)",
  4: "var(--lcd-light)",
};

export const eggPalette: SpritePalette = {
  0: "transparent",
  1: "var(--lcd-dark)",
  2: "var(--lcd-light)",
  3: "var(--accent-cyan)",
};

export const poopPalette: SpritePalette = {
  0: "transparent",
  1: "var(--lcd-dark)",
  2: "var(--accent-pink)",
  4: "var(--lcd-dim)",
};

type FrameSet = readonly PixelGrid[];

const blobFrames: Record<Mood, FrameSet> = {
  happy: [blobHappyA, blobHappyB],
  sad: [blobSad],
  sick: [blobSick, blobSad],
  sleeping: [blobSleeping],
  hungry: [blobSad, blobHappyA],
  dirty: [blobDirty, blobSad],
  dead: [blobDead],
};

const dinoFrames: Record<Mood, FrameSet> = {
  happy: [dinoHappyA, dinoHappyB],
  sad: [dinoSad],
  sick: [dinoSick, dinoSad],
  sleeping: [dinoSleeping],
  hungry: [dinoSad, dinoHappyA],
  dirty: [dinoDirty, dinoSad],
  dead: [dinoDead],
};

const catFrames: Record<Mood, FrameSet> = {
  happy: [catHappyA, catHappyB],
  sad: [catSad],
  sick: [catSick, catSad],
  sleeping: [catSleeping],
  hungry: [catSad, catHappyA],
  dirty: [catDirty, catSad],
  dead: [catDead],
};

const allFrames: Record<Species, Record<Mood, FrameSet>> = {
  blob: blobFrames,
  dino: dinoFrames,
  cat: catFrames,
};

const palettes: Record<Species, Record<Variant, SpritePalette>> = {
  blob: {
    normal: blobPalette,
    mega: {
      0: "transparent",
      1: "var(--lcd-dark)",
      2: "var(--accent-cyan)",
      3: "var(--lcd-dark)",
      4: "#ffe14d",
    },
    dark: {
      0: "transparent",
      1: "#14001a",
      2: "#4a1a7a",
      3: "#ff2a4d",
      4: "#8a0028",
    },
  },
  dino: {
    normal: dinoPalette,
    mega: {
      0: "transparent",
      1: "var(--lcd-dark)",
      2: "#ffe14d",
      3: "var(--lcd-dark)",
      4: "var(--accent-cyan)",
    },
    dark: {
      0: "transparent",
      1: "#0a0014",
      2: "#2a4a2a",
      3: "#ff2a4d",
      4: "#1a1a1a",
    },
  },
  cat: {
    normal: catPalette,
    mega: {
      0: "transparent",
      1: "var(--lcd-dark)",
      2: "#ffe14d",
      3: "var(--lcd-dark)",
      4: "var(--accent-cyan)",
    },
    dark: {
      0: "transparent",
      1: "#1a0000",
      2: "#3a1a3a",
      3: "#ff2a4d",
      4: "#7a0028",
    },
  },
};

export function getSpriteFor(
  species: Species,
  mood: Mood,
  stage: "egg" | "post-egg",
  variant: Variant = "normal"
): { frames: FrameSet; palette: SpritePalette } {
  if (stage === "egg") {
    return { frames: eggFrames, palette: eggPalette };
  }
  return {
    frames: allFrames[species][mood],
    palette: palettes[species][variant] ?? palettes[species].normal,
  };
}

export const SPECIES_META: Record<
  Species,
  { label: string; previewFrames: FrameSet; palette: SpritePalette }
> = {
  blob: {
    label: "BLOB",
    previewFrames: blobFrames.happy,
    palette: blobPalette,
  },
  dino: {
    label: "DINO",
    previewFrames: dinoFrames.happy,
    palette: dinoPalette,
  },
  cat: {
    label: "CAT",
    previewFrames: catFrames.happy,
    palette: catPalette,
  },
};

export const poopFrames = [poopFrameA, poopFrameB] as const;
