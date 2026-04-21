"use client";

import { cn } from "@/lib/utils";
import {
  DEFAULT_BUTTON_STYLE,
  type ButtonSkinStyle,
} from "./accessories/catalog";

interface DpadButtonsProps {
  onA: () => void;
  onB: () => void;
  onC: () => void;
  labelA?: string;
  labelB?: string;
  labelC?: string;
  className?: string;
  style?: ButtonSkinStyle;
}

export function DpadButtons({
  onA,
  onB,
  onC,
  labelA = "◀",
  labelB = "OK",
  labelC = "▶",
  className,
  style = DEFAULT_BUTTON_STYLE,
}: DpadButtonsProps) {
  const defs = [
    { onClick: onA, label: labelA, letter: "A" },
    { onClick: onB, label: labelB, letter: "B" },
    { onClick: onC, label: labelC, letter: "C" },
  ];

  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-center gap-6 sm:gap-10",
        className
      )}
    >
      {defs.map((btn, i) => (
        <button
          key={i}
          type="button"
          onClick={btn.onClick}
          className="group flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest text-lcd-light transition-colors hover:text-accent-pink"
          style={{ ["--btn-hover-border" as string]: style.hoverBorder ?? style.border }}
        >
          <span
            className="relative flex h-16 w-16 items-center justify-center rounded-full border-[3px] text-base font-bold shadow-[6px_6px_0_0] transition-[transform,box-shadow,filter] duration-100 group-hover:-translate-y-[3px] group-hover:shadow-[6px_9px_0_0] group-hover:brightness-110 group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-[0_0_0_0] group-active:brightness-95 sm:h-20 sm:w-20 group-hover:[border-color:var(--btn-hover-border)]"
            style={{
              background: style.background,
              borderColor: style.border,
              color: style.letterColor,
              boxShadow: `6px 6px 0 0 ${style.shadowColor}`,
            }}
          >
            <span
              className="absolute inset-1 rounded-full border transition-colors"
              style={{ borderColor: style.innerRing }}
            />
            <span className="relative z-[1] transition-transform duration-100 group-hover:scale-110 group-active:scale-95">
              {btn.letter}
            </span>
          </span>
          <span>{btn.label}</span>
        </button>
      ))}
    </div>
  );
}
