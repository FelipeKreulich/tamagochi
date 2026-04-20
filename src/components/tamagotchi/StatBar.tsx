"use client";

import { cn } from "@/lib/utils";

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  segments?: number;
  accent?: "green" | "pink" | "cyan";
  className?: string;
}

export function StatBar({
  label,
  value,
  max = 100,
  segments = 8,
  accent = "green",
  className,
}: StatBarProps) {
  const filled = Math.round((Math.max(0, Math.min(value, max)) / max) * segments);
  const isCritical = value <= max * 0.2;

  const accentClass =
    accent === "pink"
      ? "bg-accent-pink"
      : accent === "cyan"
      ? "bg-accent-cyan"
      : "bg-lcd-light";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "w-10 text-[8px] uppercase tracking-widest",
          isCritical ? "animate-[pixelshake_0.6s_steps(2)_infinite] text-accent-pink" : "text-lcd-light"
        )}
      >
        {label}
      </span>
      <div
        className="flex h-3 flex-1 gap-[2px] border border-lcd-light/60 bg-lcd-dark p-[2px]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={Math.round(value)}
      >
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex-1",
              i < filled ? accentClass : "bg-lcd-dark"
            )}
          />
        ))}
      </div>
    </div>
  );
}
