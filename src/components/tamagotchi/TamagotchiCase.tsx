"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TamagotchiCaseProps {
  children: ReactNode;
  onA?: () => void;
  onB?: () => void;
  onC?: () => void;
  labelA?: string;
  labelB?: string;
  labelC?: string;
}

export function TamagotchiCase({
  children,
  onA,
  onB,
  onC,
  labelA = "A",
  labelB = "B",
  labelC = "C",
}: TamagotchiCaseProps) {
  return (
    <div className="relative mx-auto w-[min(92vw,340px)] select-none">
      <div
        className={cn(
          "relative flex flex-col items-center gap-4 border-4 border-lcd-light/80 bg-[linear-gradient(160deg,#14261d,#0a120d_60%,#14261d)] px-5 pt-6 pb-8 shadow-[12px_12px_0_0] shadow-lcd-dim",
          "before:pointer-events-none before:absolute before:-top-3 before:left-1/2 before:h-3 before:w-16 before:-translate-x-1/2 before:border-4 before:border-b-0 before:border-lcd-light/80 before:bg-lcd-dim before:content-['']"
        )}
      >
        <div className="flex w-full items-center justify-between text-[8px] uppercase tracking-[0.3em] text-lcd-light/70">
          <span>TAMA</span>
          <span className="h-2 w-2 animate-[lcdflicker_1.4s_steps(2)_infinite] rounded-full bg-accent-pink" />
          <span>GOCHI</span>
        </div>
        <div className="relative w-full border-2 border-lcd-light/70 bg-lcd-bg p-3 shadow-[inset_0_0_12px_rgba(124,240,116,0.25)]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.25)_0px,rgba(0,0,0,0.25)_1px,transparent_1px,transparent_3px)] opacity-40" />
          <div className="relative">{children}</div>
        </div>
        <div className="grid w-full grid-cols-3 gap-3 pt-1">
          {[
            { onClick: onA, label: labelA },
            { onClick: onB, label: labelB },
            { onClick: onC, label: labelC },
          ].map((btn, i) => (
            <button
              key={i}
              type="button"
              onClick={btn.onClick}
              className={cn(
                "group flex flex-col items-center gap-1 pt-1 text-[9px] uppercase tracking-widest text-lcd-light"
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center border-2 border-lcd-light bg-[radial-gradient(circle_at_30%_25%,#ffa6d3,#ff4fa3_60%,#b8246f)] text-[10px] text-lcd-dark shadow-[4px_4px_0_0] shadow-lcd-light/40 transition-[transform,box-shadow] duration-75 group-active:translate-x-[2px] group-active:translate-y-[2px] group-active:shadow-[2px_2px_0_0]"
                )}
              >
                {["A", "B", "C"][i]}
              </span>
              <span className="truncate">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-3 h-4 w-24 rounded-b-full bg-lcd-dim shadow-[0_4px_0_0] shadow-black/60" />
    </div>
  );
}
