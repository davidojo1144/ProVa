"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

/**
 * Stack of at most three toasts. Sonner handles swipe-to-dismiss and
 * pause-on-hover; the spring transition lives in globals.css.
 */
export function Toaster() {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      position="bottom-right"
      visibleToasts={3}
      gap={10}
      offset={16}
      toastOptions={{ unstyled: true, classNames: { toast: "w-full" } }}
    />
  );
}
