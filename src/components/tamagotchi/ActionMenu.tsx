"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface ActionItem {
  id: string;
  label: string;
  icon: LucideIcon;
  onSelect: () => void;
  disabled?: boolean;
}

interface ActionMenuProps {
  items: ActionItem[];
  selectedIndex: number;
}

export function ActionMenu({ items, selectedIndex }: ActionMenuProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((item, i) => {
        const Icon = item.icon;
        const selected = i === selectedIndex;
        return (
          <button
            key={item.id}
            type="button"
            onClick={item.onSelect}
            disabled={item.disabled}
            aria-pressed={selected}
            className={cn(
              "flex flex-col items-center gap-1 border-2 border-lcd-light/50 bg-lcd-dark p-2 text-[7px] uppercase tracking-widest text-lcd-light transition-colors disabled:opacity-40",
              selected && "border-accent-pink bg-accent-pink/10 text-accent-pink",
              !item.disabled && "hover:border-accent-pink hover:text-accent-pink"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
