"use client";

import { useEffect } from "react";
import { cursorSkinById } from "@/components/tamagotchi/accessories/catalog";

/**
 * Applies the equipped cursor skin as the document's cursor. Removing the
 * override restores the browser default.
 */
export function useCursorOverride(cursorId: string | null | undefined) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const skin = cursorSkinById(cursorId);
    const body = document.body;
    if (skin) {
      body.style.cursor = skin.style.css;
    } else {
      body.style.removeProperty("cursor");
    }
    return () => {
      body.style.removeProperty("cursor");
    };
  }, [cursorId]);
}
