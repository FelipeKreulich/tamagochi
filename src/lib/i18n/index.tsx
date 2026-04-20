"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import ptBR from "./pt-BR";
import ptPT from "./pt-PT";
import en from "./en";
import type { Dictionary, Locale } from "./types";

export const DICTIONARIES: Record<Locale, Dictionary> = {
  "pt-BR": ptBR,
  "pt-PT": ptPT,
  en,
};

export const STORAGE_KEY = "tamagochi:locale";
export const DEFAULT_LOCALE: Locale = "pt-BR";

function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const nav = navigator.language?.toLowerCase() ?? "";
  if (nav.startsWith("pt-pt")) return "pt-PT";
  if (nav.startsWith("pt")) return "pt-BR";
  if (nav.startsWith("en")) return "en";
  return DEFAULT_LOCALE;
}

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw && raw in DICTIONARIES) return raw as Locale;
  } catch {
    /* ignore */
  }
  return null;
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  dict: Dictionary;
  hydrated: boolean;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredLocale();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocaleState(stored ?? detectBrowserLocale());
    setHydrated(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, dict: DICTIONARIES[locale], hydrated }),
    [locale, setLocale, hydrated]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx)
    throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}

export function useT(): Dictionary {
  return useLocale().dict;
}

export function tpl(
  template: string,
  vars: Record<string, string | number> = {}
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`
  );
}

export type { Dictionary, Locale } from "./types";
export { LOCALE_LABEL, LOCALES } from "./types";
