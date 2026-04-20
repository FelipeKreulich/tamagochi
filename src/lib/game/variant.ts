import type { Pet, Variant } from "./types";

/**
 * Given the pet's history at the moment it transitions to adulthood,
 * pick a "branched" evolution: well-cared pets become Mega,
 * neglected ones become Dark, everything else stays Normal.
 */
export function computeVariant(pet: Pet): Variant {
  const stats = pet.stats;
  const avgStats =
    (stats.hunger +
      stats.happiness +
      stats.energy +
      stats.hygiene +
      stats.health) /
    5;

  const history = pet.statsHistory;
  const lowSamples = history.filter(
    (s) =>
      s.hunger <= 25 ||
      s.happiness <= 25 ||
      s.hygiene <= 25 ||
      s.health <= 30
  ).length;
  const sampleRatio = history.length > 0 ? lowSamples / history.length : 0;

  let score = 0;

  if (!pet.everSick) score += 3;
  else score -= 1;

  if (avgStats >= 70) score += 2;
  if (avgStats <= 40) score -= 3;

  if (pet.counters.feed >= 5) score += 1;
  if (pet.counters.bath >= 2) score += 1;
  if (pet.counters.play >= 3) score += 1;
  if (pet.counters.medicine >= 2) score -= 1;

  if (sampleRatio >= 0.3) score -= 3;
  else if (sampleRatio <= 0.1) score += 1;

  if (score >= 5) return "mega";
  if (score <= -3) return "dark";
  return "normal";
}
