"use client";

import { useEffect, useRef } from "react";
import type { Pet } from "@/lib/game/types";
import {
  chirpCry,
  chirpDirty,
  chirpHappy,
  chirpHungry,
  chirpSad,
  chirpSick,
  chirpSleep,
} from "@/lib/audio";

const AMBIENT_BASE_MS = 9000;
const AMBIENT_JITTER_MS = 6000;

const CRY_BASE_MS = 3200;
const CRY_JITTER_MS = 2400;

function pickChirp(pet: Pet): ((opts: { muted: boolean }) => void) | null {
  if (!pet.isAlive) return null;
  switch (pet.mood) {
    case "sleeping":
      return chirpSleep;
    case "sick":
      return chirpSick;
    case "dirty":
      return chirpDirty;
    case "hungry":
      return chirpHungry;
    case "sad":
      return chirpSad;
    case "happy":
      return chirpHappy;
    default:
      return null;
  }
}

function needsCrying(pet: Pet): boolean {
  if (!pet.isAlive || pet.isSleeping) return false;
  return (
    pet.stats.hunger <= 20 ||
    pet.stats.hygiene <= 20 ||
    pet.stats.happiness <= 20 ||
    pet.stats.health <= 30 ||
    pet.isSick
  );
}

export function usePetAmbience(options: {
  pet: Pet | null;
  muted: boolean;
  enabled: boolean;
}) {
  const { pet, muted, enabled } = options;

  // Keep the latest pet in a ref so the long-lived timers read fresh state
  // without having to restart every 3s tick.
  const petRef = useRef<Pet | null>(pet);
  useEffect(() => {
    petRef.current = pet;
  });

  // Ambient chirps — periodic mood-based sound, independent of severity.
  useEffect(() => {
    if (!enabled || muted) return;
    let timeoutId: number | undefined;
    let cancelled = false;

    const schedule = () => {
      const delay = AMBIENT_BASE_MS + Math.random() * AMBIENT_JITTER_MS;
      timeoutId = window.setTimeout(() => {
        if (cancelled) return;
        const p = petRef.current;
        if (p && p.isAlive) {
          const chirp = pickChirp(p);
          chirp?.({ muted });
        }
        schedule();
      }, delay);
    };
    schedule();

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [muted, enabled]);

  // Crying loop — faster cadence, only plays when the pet actually needs help.
  useEffect(() => {
    if (!enabled || muted) return;
    let timeoutId: number | undefined;
    let cancelled = false;

    const schedule = () => {
      const delay = CRY_BASE_MS + Math.random() * CRY_JITTER_MS;
      timeoutId = window.setTimeout(() => {
        if (cancelled) return;
        const p = petRef.current;
        if (p && needsCrying(p)) {
          chirpCry({ muted });
        }
        schedule();
      }, delay);
    };
    schedule();

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [muted, enabled]);
}
