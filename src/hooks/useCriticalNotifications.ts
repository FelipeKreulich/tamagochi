"use client";

import { useEffect, useRef } from "react";
import type { Pet } from "@/lib/game/types";

const COOLDOWN_MS = 60 * 1000;

interface Options {
  pet: Pet | null;
  enabled: boolean;
}

function canNotify(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof Notification !== "undefined" &&
    Notification.permission === "granted"
  );
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof Notification === "undefined") return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  return result === "granted";
}

export function useCriticalNotifications({ pet, enabled }: Options) {
  const lastFiredRef = useRef<Record<string, number>>({});

  useEffect(() => {
    if (!enabled || !pet || !pet.isAlive) return;
    if (!canNotify()) return;

    const fire = (key: string, body: string) => {
      const now = Date.now();
      const last = lastFiredRef.current[key] ?? 0;
      if (now - last < COOLDOWN_MS) return;
      lastFiredRef.current[key] = now;
      try {
        new Notification(`Tamagochi — ${pet.name}`, {
          body,
          icon: "/tamagochi.ico",
          tag: `tamagochi-${key}`,
        });
      } catch {
        /* ignore */
      }
    };

    if (pet.stats.hunger <= 15) fire("hunger", `${pet.name} está com fome!`);
    if (pet.stats.happiness <= 15) fire("happy", `${pet.name} está triste!`);
    if (pet.stats.hygiene <= 15) fire("hygiene", `${pet.name} está sujo!`);
    if (pet.stats.health <= 25) fire("health", `${pet.name} está passando mal!`);
    if (pet.isSick) fire("sick", `${pet.name} está doente! Dê remédio.`);
    if (pet.poopCount >= 3) fire("poop", `${pet.name} fez uma bagunça!`);
  }, [pet, enabled]);
}
