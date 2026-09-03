"use client";

import { useEffect, useRef, useState } from "react";
import {
  CircleAlert,
  CircleCheck,
  Info,
  OctagonX,
  X,
  type LucideIcon,
} from "lucide-react";
import { toast as sonner } from "sonner";

import { haptic, type HapticPattern } from "@/lib/haptics";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "warning" | "info";

interface VariantMeta {
  icon: LucideIcon;
  /** Left border is the primary signal; the tint only supports it. */
  border: string;
  iconColor: string;
  tint: string;
  haptic: HapticPattern;
  /** Infinity means it waits to be acknowledged. */
  duration: number;
  role: "status" | "alert";
}

const VARIANTS: Record<ToastVariant, VariantMeta> = {
  success: {
    icon: CircleCheck,
    border: "border-l-emerald-500",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    tint: "bg-emerald-500/5",
    haptic: "success",
    duration: 4000,
    role: "status",
  },
  info: {
    icon: Info,
    border: "border-l-blue-500",
    iconColor: "text-blue-600 dark:text-blue-400",
    tint: "bg-blue-500/5",
    haptic: "tap",
    duration: 4000,
    role: "status",
  },
  warning: {
    icon: CircleAlert,
    border: "border-l-amber-500",
    iconColor: "text-amber-600 dark:text-amber-400",
    tint: "bg-amber-500/5",
    haptic: "warning",
    duration: 7000,
    role: "status",
  },
  error: {
    icon: OctagonX,
    border: "border-l-rose-500",
    iconColor: "text-rose-600 dark:text-rose-400",
    tint: "bg-rose-500/5",
    haptic: "error",
    duration: Number.POSITIVE_INFINITY,
    role: "alert",
  },
};

/** How long an acknowledged error lingers before it leaves on its own. */
const ERROR_LINGER_MS = 10_000;

export interface ToastOptions {
  description?: string;
  action?: { label: string; onClick: () => void };
}

interface ToastCardProps extends ToastOptions {
  id: string | number;
  variant: ToastVariant;
  title: string;
}

function ToastCard({
  id,
  variant,
  title,
  description,
  action,
}: ToastCardProps) {
  const meta = VARIANTS[variant];
  const Icon = meta.icon;
  const [acknowledged, setAcknowledged] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  // An acknowledged error stays readable for a beat, then dismisses itself.
  useEffect(() => {
    if (!acknowledged) return;
    timer.current = window.setTimeout(
      () => sonner.dismiss(id),
      ERROR_LINGER_MS,
    );
    return () => window.clearTimeout(timer.current);
  }, [acknowledged, id]);

  return (
    <div
      role={meta.role}
      className={cn(
        "bg-popover text-popover-foreground border-border pointer-events-auto flex w-full items-start gap-2.5 rounded-md border-2 border-l-8 p-3.5",
        meta.border,
        meta.tint,
      )}
    >
      <Icon
        className={cn("mt-0.5 size-4 shrink-0", meta.iconColor)}
        aria-hidden
      />

      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug font-medium">{title}</p>
        {description && (
          <p className="text-muted-foreground mt-0.5 text-xs leading-snug">
            {description}
          </p>
        )}

        {(action || variant === "error") && (
          <div className="mt-2 flex items-center gap-3">
            {action && (
              <button
                type="button"
                onClick={() => {
                  haptic("tap");
                  action.onClick();
                  sonner.dismiss(id);
                }}
                className="focus-visible:ring-ring/50 rounded-sm text-xs font-medium underline-offset-2 outline-none hover:underline focus-visible:ring-3"
              >
                {action.label}
              </button>
            )}
            {variant === "error" && !acknowledged && (
              <button
                type="button"
                onClick={() => {
                  haptic("tap");
                  setAcknowledged(true);
                }}
                className="focus-visible:ring-ring/50 text-muted-foreground rounded-sm text-xs font-medium underline-offset-2 outline-none hover:underline focus-visible:ring-3"
              >
                Got it
              </button>
            )}
            {variant === "error" && acknowledged && (
              <span className="text-muted-foreground/70 text-xs">
                Dismissing…
              </span>
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => {
          haptic("tap");
          sonner.dismiss(id);
        }}
        className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 -mt-0.5 -mr-0.5 rounded-md p-1 transition-colors outline-none focus-visible:ring-3"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}

function show(
  variant: ToastVariant,
  title: string,
  options: ToastOptions = {},
) {
  const meta = VARIANTS[variant];
  haptic(meta.haptic);

  return sonner.custom(
    (id) => <ToastCard id={id} variant={variant} title={title} {...options} />,
    {
      duration: meta.duration,
      // Errors wait for acknowledgement instead of ticking away behind the user.
      dismissible: true,
    },
  );
}

/** Typed toast API used across the app. */
export const notify = {
  success: (title: string, options?: ToastOptions) =>
    show("success", title, options),
  error: (title: string, options?: ToastOptions) =>
    show("error", title, options),
  warning: (title: string, options?: ToastOptions) =>
    show("warning", title, options),
  info: (title: string, options?: ToastOptions) => show("info", title, options),
  dismiss: (id?: string | number) => sonner.dismiss(id),
};
