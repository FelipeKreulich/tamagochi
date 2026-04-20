"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Pet } from "@/lib/game/types";
import { useT } from "@/lib/i18n";
import { Sparkline } from "./Sparkline";

interface HistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: Pet | null;
}

export function HistoryDialog({ open, onOpenChange, pet }: HistoryDialogProps) {
  const dict = useT();
  const samples = pet?.statsHistory ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-none border-4 border-lcd-light bg-lcd-dark font-pixel text-lcd-light sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[11px] uppercase tracking-widest text-accent-pink">
            {dict.status.history}
          </DialogTitle>
          <DialogDescription className="text-[9px] uppercase tracking-widest text-lcd-light/80">
            {dict.status.historySub}
          </DialogDescription>
        </DialogHeader>

        {samples.length === 0 ? (
          <p className="text-center text-[9px] uppercase tracking-widest text-lcd-light/60">
            {dict.status.historyEmpty}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Sparkline
              samples={samples}
              stat="hunger"
              label={dict.stats.hunger}
              color="var(--lcd-light)"
            />
            <Sparkline
              samples={samples}
              stat="happiness"
              label={dict.stats.happiness}
              color="var(--accent-pink)"
            />
            <Sparkline
              samples={samples}
              stat="energy"
              label={dict.stats.energy}
              color="var(--accent-cyan)"
            />
            <Sparkline
              samples={samples}
              stat="hygiene"
              label={dict.stats.hygiene}
              color="var(--lcd-light)"
            />
            <Sparkline
              samples={samples}
              stat="health"
              label={dict.stats.health}
              color="var(--accent-pink)"
              className="col-span-2"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
