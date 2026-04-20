"use client";

import { useEffect, useRef } from "react";

export interface KeyboardHandlers {
  onPrev?: () => void;
  onNext?: () => void;
  onSelect?: () => void;
  onToggleMute?: () => void;
  onToggleNotif?: () => void;
  onCycleLocale?: () => void;
  onToggleHelp?: () => void;
  onDirectAction?: (index: number) => void;
}

export function useKeyboardControls(handlers: KeyboardHandlers) {
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }
      const h = handlersRef.current;
      const k = e.key.toLowerCase();
      switch (k) {
        case "arrowleft":
        case "a":
          h.onPrev?.();
          e.preventDefault();
          break;
        case "arrowright":
        case "d":
          h.onNext?.();
          e.preventDefault();
          break;
        case "enter":
        case " ":
          h.onSelect?.();
          e.preventDefault();
          break;
        case "m":
          h.onToggleMute?.();
          break;
        case "n":
          h.onToggleNotif?.();
          break;
        case "l":
          h.onCycleLocale?.();
          break;
        case "h":
        case "?":
          h.onToggleHelp?.();
          break;
        default:
          if (/^[1-8]$/.test(k)) {
            h.onDirectAction?.(parseInt(k, 10) - 1);
          }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
