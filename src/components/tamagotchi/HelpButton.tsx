"use client";

import { HelpCircle } from "lucide-react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface HelpButtonProps {
  onClick: () => void;
  className?: string;
}

export function HelpButton({ onClick, className }: HelpButtonProps) {
  const dict = useT();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dict.help.helpAria}
      className={cn(
        "inline-flex items-center gap-2 border-2 border-lcd-light bg-lcd-dark px-3 py-2 text-[10px] uppercase tracking-widest text-lcd-light shadow-[4px_4px_0_0] shadow-lcd-light/30 transition-[transform,box-shadow] duration-75 hover:border-accent-cyan hover:text-accent-cyan active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0]",
        className
      )}
    >
      <HelpCircle className="h-3 w-3 shrink-0" />
      <span>?</span>
    </button>
  );
}
