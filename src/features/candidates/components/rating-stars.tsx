"use client";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingStarsProps {
  value: number;
  /** Omit to render a read-only rating. */
  onChange?: (value: number) => void;
  size?: "sm" | "md";
  className?: string;
}

const SIZES = { sm: "size-3.5", md: "size-5" } as const;

export function RatingStars({
  value,
  onChange,
  size = "sm",
  className,
}: RatingStarsProps) {
  const stars = [1, 2, 3, 4, 5];

  if (!onChange) {
    return (
      <div
        className={cn("flex items-center gap-0.5", className)}
        aria-label={value ? `Rated ${value} out of 5` : "Not rated"}
      >
        {stars.map((star) => (
          <Star
            key={star}
            aria-hidden
            className={cn(
              SIZES[size],
              star <= value
                ? "fill-brand-amber text-brand-amber"
                : "text-foreground/20",
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-0.5", className)} role="group">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          aria-label={star === value ? `Clear rating` : `Rate ${star} out of 5`}
          aria-pressed={star <= value}
          className="rounded-sm p-0.5 transition-transform duration-200 outline-none hover:scale-125"
        >
          <Star
            className={cn(
              SIZES[size],
              star <= value
                ? "fill-brand-amber text-brand-amber"
                : "text-foreground/25",
            )}
          />
        </button>
      ))}
    </div>
  );
}
