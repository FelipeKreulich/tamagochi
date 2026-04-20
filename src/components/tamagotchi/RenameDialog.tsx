"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface RenameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentName: string;
  onSave: (name: string) => void;
}

export function RenameDialog({
  open,
  onOpenChange,
  currentName,
  onSave,
}: RenameDialogProps) {
  const dict = useT();
  const [value, setValue] = useState(currentName.toUpperCase());

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(currentName.toUpperCase());
    }
  }, [open, currentName]);

  const trimmed = value.trim();
  const canSave = trimmed.length >= 2 && trimmed.length <= 12;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-none border-4 border-lcd-light bg-lcd-dark font-pixel text-lcd-light sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-[11px] uppercase tracking-widest text-accent-pink">
            {dict.hud.renameTitle}
          </DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col items-center gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSave) return;
            onSave(trimmed);
            onOpenChange(false);
          }}
        >
          <input
            value={value}
            onChange={(e) =>
              setValue(e.target.value.toUpperCase().slice(0, 12))
            }
            maxLength={12}
            autoFocus
            className="w-full border-2 border-lcd-light bg-lcd-dark px-2 py-2 text-center text-[11px] uppercase tracking-widest text-lcd-light caret-accent-pink outline-none focus:border-accent-pink"
          />
          <button
            type="submit"
            disabled={!canSave}
            className={cn(
              "w-full border-2 border-lcd-light bg-lcd-light px-3 py-2 text-[10px] uppercase tracking-widest text-lcd-dark",
              !canSave && "cursor-not-allowed opacity-40"
            )}
          >
            {dict.hud.renameSave}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
