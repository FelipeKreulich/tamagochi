import type { Mood, Species } from "@/lib/game/types";

/**
 * For animations where the sprite body shifts between frames (e.g. Blob's
 * happy wiggle), accessories need to follow the same X shift so they don't
 * appear to float independently.
 *
 * Returns the horizontal offset in *sprite-pixel units* (multiply by pixelSize
 * to get CSS pixels) for a given frame of the given species/mood.
 */
export function frameOffsetX(
  species: Species,
  mood: Mood,
  frameIndex: number
): number {
  if (species === "blob" && mood === "happy" && frameIndex === 1) {
    return 1;
  }
  return 0;
}
