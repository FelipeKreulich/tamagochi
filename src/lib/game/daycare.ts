import type { DaycareRules } from "@/lib/storage/schema";
import {
  bath as bathAction,
  cleanPoop as cleanPoopAction,
  feedFood,
  medicine as medicineAction,
  sleep as sleepAction,
  wake as wakeAction,
} from "./actions";
import type { Pet } from "./types";

export interface DaycareEvents {
  fed: boolean;
  bathed: boolean;
  cleaned: boolean;
  medicated: boolean;
  slept: boolean;
  woke: boolean;
}

const emptyEvents = (): DaycareEvents => ({
  fed: false,
  bathed: false,
  cleaned: false,
  medicated: false,
  slept: false,
  woke: false,
});

/**
 * Applies daycare rules in sequence. Each action is idempotent w.r.t. its
 * condition — feeds only while hungry, baths only while dirty, etc — so rules
 * self-throttle across ticks without explicit cooldowns.
 */
export function runDaycare(
  pet: Pet,
  rules: DaycareRules
): { pet: Pet; events: DaycareEvents } {
  if (!pet.isAlive) return { pet, events: emptyEvents() };

  const events = emptyEvents();
  let next = pet;

  // Medicine first: always try to heal sickness.
  if (rules.autoMedicine && next.isSick) {
    const after = medicineAction(next);
    if (after !== next) {
      events.medicated = true;
      next = after;
    }
  }

  // Auto-wake when well-rested enough.
  if (next.isSleeping && next.stats.energy >= rules.autoWakeThreshold) {
    const after = wakeAction(next);
    if (after !== next) {
      events.woke = true;
      next = after;
    }
  }

  // Only awake actions past this point.
  if (!next.isSleeping && next.isAlive) {
    if (next.stats.hunger < rules.feedThreshold) {
      const after = feedFood(next);
      if (after !== next) {
        events.fed = true;
        next = after;
      }
    }
    if (next.stats.hygiene < rules.bathThreshold) {
      const after = bathAction(next);
      if (after !== next) {
        events.bathed = true;
        next = after;
      }
    }
  }

  // Cleaning poops works awake or sleeping (pet isn't involved).
  if (next.poopCount >= rules.cleanPoopThreshold) {
    const after = cleanPoopAction(next);
    if (after !== next) {
      events.cleaned = true;
      next = after;
    }
  }

  // Auto-sleep when exhausted (after feeding so it doesn't block dinner).
  if (
    !next.isSleeping &&
    next.isAlive &&
    next.stats.energy < rules.autoSleepThreshold
  ) {
    const after = sleepAction(next);
    if (after !== next) {
      events.slept = true;
      next = after;
    }
  }

  return { pet: next, events };
}
