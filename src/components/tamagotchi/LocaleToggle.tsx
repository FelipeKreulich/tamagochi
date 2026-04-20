"use client";

import { Languages } from "lucide-react";
import { LOCALE_LABEL, LOCALES, useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LocaleToggleProps {
  className?: string;
}

export function LocaleToggle({ className }: LocaleToggleProps) {
  const { locale, setLocale, dict } = useLocale();

  const cycle = () => {
    const i = LOCALES.indexOf(locale);
    const next = LOCALES[(i + 1) % LOCALES.length];
    setLocale(next);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={dict.header.languageLabel}
      className={cn(
        "inline-flex items-center gap-2 border-2 border-lcd-light bg-lcd-dark px-3 py-2 text-[10px] uppercase tracking-widest text-lcd-light shadow-[4px_4px_0_0] shadow-lcd-light/30 transition-[transform,box-shadow] duration-75 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0]",
        className
      )}
    >
      <Languages className="h-3 w-3 shrink-0" />
      <span className="flex items-center gap-1">
        <span className="text-accent-cyan">{LOCALE_LABEL[locale]}</span>
      </span>
    </button>
  );
}
