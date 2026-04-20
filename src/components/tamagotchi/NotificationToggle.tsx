"use client";

import { Bell, BellOff } from "lucide-react";
import { requestNotificationPermission } from "@/hooks/useCriticalNotifications";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface NotificationToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  className?: string;
}

export function NotificationToggle({
  enabled,
  onChange,
  className,
}: NotificationToggleProps) {
  const Icon = enabled ? Bell : BellOff;

  return (
    <button
      type="button"
      onClick={async () => {
        if (enabled) {
          onChange(false);
          return;
        }
        const ok = await requestNotificationPermission();
        if (ok) {
          onChange(true);
          toast("🔔 Notificações ativadas");
        } else {
          toast.error("Permissão negada pelo navegador");
        }
      }}
      aria-pressed={enabled}
      aria-label={enabled ? "Desativar notificações" : "Ativar notificações"}
      className={cn(
        "inline-flex items-center gap-2 border-2 border-lcd-light bg-lcd-dark px-3 py-2 text-[10px] uppercase tracking-widest text-lcd-light shadow-[4px_4px_0_0] shadow-lcd-light/30 transition-[transform,box-shadow] duration-75 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0]",
        enabled && "border-accent-cyan text-accent-cyan shadow-accent-cyan/30",
        className
      )}
    >
      <Icon className="h-3 w-3" />
      <span>{enabled ? "NOTIF" : "NOTIF OFF"}</span>
    </button>
  );
}
