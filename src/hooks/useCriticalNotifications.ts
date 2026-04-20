"use client";

import { useEffect, useRef } from "react";
import type { Pet } from "@/lib/game/types";
import type { Dictionary } from "@/lib/i18n";
import { tpl } from "@/lib/i18n";

const COOLDOWN_MS = 60 * 1000;

interface Options {
  pet: Pet | null;
  enabled: boolean;
  dict: Dictionary;
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

export function useCriticalNotifications({ pet, enabled, dict }: Options) {
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

    if (pet.stats.hunger <= 15)
      fire("hunger", tpl(dict.notifications.hunger, { name: pet.name }));
    if (pet.stats.happiness <= 15)
      fire("happy", tpl(dict.notifications.happy, { name: pet.name }));
    if (pet.stats.hygiene <= 15)
      fire("hygiene", tpl(dict.notifications.hygiene, { name: pet.name }));
    if (pet.stats.health <= 25)
      fire("health", tpl(dict.notifications.health, { name: pet.name }));
    if (pet.isSick)
      fire("sick", tpl(dict.notifications.sick, { name: pet.name }));
    if (pet.poopCount >= 3)
      fire("poop", tpl(dict.notifications.poop, { name: pet.name }));
  }, [pet, enabled, dict]);
}
