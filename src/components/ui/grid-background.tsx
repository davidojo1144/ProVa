import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  /** Fades the grid out towards the edges. */
  fade?: boolean;
  /** Grid square size. */
  size?: number;
}

/**
 * Flat grid pattern used as section decoration. Line colour comes from the
 * border token, so it follows the theme instead of hard-coding two palettes.
 */
export function GridBackground({
  className,
  children,
  fade = true,
  size = 40,
}: GridBackgroundProps) {
  return (
    <div className={cn("bg-background relative w-full", className)}>
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]"
        style={{ backgroundSize: `${size}px ${size}px` }}
      />
      {fade && (
        <div
          aria-hidden
          className="bg-background pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
