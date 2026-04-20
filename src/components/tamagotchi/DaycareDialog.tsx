"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useT } from "@/lib/i18n";
import {
  DEFAULT_DAYCARE_RULES,
  type DaycareRules,
} from "@/lib/storage/schema";
import { cn } from "@/lib/utils";

interface DaycareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enabled: boolean;
  rules: DaycareRules;
  onToggle: (enabled: boolean) => void;
  onChangeRules: (rules: DaycareRules) => void;
}

interface ThresholdRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  suffix: string;
}

function ThresholdRow({
  label,
  value,
  min,
  max,
  onChange,
  suffix,
}: ThresholdRowProps) {
  return (
    <label className="flex flex-col gap-1 border-2 border-lcd-light/30 bg-lcd-dim/30 p-2">
      <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-lcd-light">
        <span>{label}</span>
        <span className="text-accent-cyan">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none bg-lcd-dark accent-accent-pink"
      />
    </label>
  );
}

export function DaycareDialog({
  open,
  onOpenChange,
  enabled,
  rules,
  onToggle,
  onChangeRules,
}: DaycareDialogProps) {
  const dict = useT();

  const update = <K extends keyof DaycareRules>(key: K, value: DaycareRules[K]) =>
    onChangeRules({ ...rules, [key]: value });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-none border-4 border-lcd-light bg-lcd-dark font-pixel text-lcd-light sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[11px] uppercase tracking-widest text-accent-pink">
            {dict.daycare.title}
          </DialogTitle>
          <DialogDescription className="text-[9px] uppercase tracking-widest text-lcd-light/80">
            {dict.daycare.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => onToggle(!enabled)}
            aria-pressed={enabled}
            className={cn(
              "flex w-full items-center justify-between border-2 p-3 text-left transition-colors",
              enabled
                ? "border-accent-cyan bg-accent-cyan/10"
                : "border-lcd-light/40 bg-lcd-dim/40"
            )}
          >
            <div className="space-y-1">
              <p
                className={cn(
                  "text-[10px] uppercase tracking-widest",
                  enabled ? "text-accent-cyan" : "text-lcd-light"
                )}
              >
                {dict.daycare.enable}
              </p>
              <p className="text-[8px] leading-relaxed text-lcd-light/80">
                {dict.daycare.enableDesc}
              </p>
            </div>
            <span
              className={cn(
                "flex h-5 w-10 items-center border-2 transition-colors",
                enabled
                  ? "justify-end border-accent-cyan bg-accent-cyan/30"
                  : "justify-start border-lcd-light/40 bg-lcd-dark"
              )}
            >
              <span
                className={cn(
                  "h-3 w-3",
                  enabled ? "bg-accent-cyan" : "bg-lcd-light/60"
                )}
              />
            </span>
          </button>

          <section className="space-y-2">
            <h3 className="text-[10px] uppercase tracking-widest text-accent-pink">
              {dict.daycare.rulesTitle}
            </h3>

            <ThresholdRow
              label={dict.daycare.feedLabel}
              value={rules.feedThreshold}
              min={5}
              max={95}
              suffix={dict.daycare.thresholdSuffix}
              onChange={(n) => update("feedThreshold", n)}
            />
            <ThresholdRow
              label={dict.daycare.bathLabel}
              value={rules.bathThreshold}
              min={5}
              max={95}
              suffix={dict.daycare.thresholdSuffix}
              onChange={(n) => update("bathThreshold", n)}
            />
            <ThresholdRow
              label={dict.daycare.cleanLabel}
              value={rules.cleanPoopThreshold}
              min={1}
              max={5}
              suffix=""
              onChange={(n) => update("cleanPoopThreshold", n)}
            />

            <label className="flex items-center justify-between gap-2 border-2 border-lcd-light/30 bg-lcd-dim/30 p-2 text-[9px] uppercase tracking-widest text-lcd-light">
              <span>{dict.daycare.autoMedicine}</span>
              <button
                type="button"
                onClick={() => update("autoMedicine", !rules.autoMedicine)}
                aria-pressed={rules.autoMedicine}
                className={cn(
                  "flex h-5 w-10 items-center border-2 transition-colors",
                  rules.autoMedicine
                    ? "justify-end border-accent-cyan bg-accent-cyan/30"
                    : "justify-start border-lcd-light/40 bg-lcd-dark"
                )}
              >
                <span
                  className={cn(
                    "h-3 w-3",
                    rules.autoMedicine
                      ? "bg-accent-cyan"
                      : "bg-lcd-light/60"
                  )}
                />
              </button>
            </label>

            <ThresholdRow
              label={dict.daycare.sleepLabel}
              value={rules.autoSleepThreshold}
              min={5}
              max={60}
              suffix={dict.daycare.thresholdSuffix}
              onChange={(n) => update("autoSleepThreshold", n)}
            />
            <ThresholdRow
              label={dict.daycare.wakeLabel}
              value={rules.autoWakeThreshold}
              min={50}
              max={100}
              suffix={dict.daycare.thresholdSuffix}
              onChange={(n) => update("autoWakeThreshold", n)}
            />
          </section>
        </div>

        <div className="flex justify-between gap-2">
          <button
            type="button"
            onClick={() => onChangeRules({ ...DEFAULT_DAYCARE_RULES })}
            className="border-2 border-lcd-light bg-lcd-dark px-3 py-2 text-[9px] uppercase tracking-widest text-lcd-light hover:border-accent-pink hover:text-accent-pink"
          >
            {dict.daycare.reset}
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="border-2 border-lcd-light bg-lcd-light px-4 py-2 text-[9px] uppercase tracking-widest text-lcd-dark"
          >
            {dict.daycare.close}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
