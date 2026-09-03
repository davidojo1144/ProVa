"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      disabled={!mounted}
      className={cn(className, !mounted && "opacity-0")}
      onClick={() => {
        haptic("tap");
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  );
}
