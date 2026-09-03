import type { Candidate } from "@/types/candidate";

import { computeStats } from "@/features/candidates/lib/stats";
import { STAGE_META } from "@/features/candidates/lib/stages";
import { cn } from "@/lib/utils";

export function PipelineStats({ candidates }: { candidates: Candidate[] }) {
  const stats = computeStats(candidates);

  const tiles = [
    { label: "Candidates", value: stats.total, hint: "in the tracker" },
    { label: "In pipeline", value: stats.active, hint: "still in play" },
    {
      label: "Offers out",
      value: stats.byStage.offer,
      hint: "awaiting a decision",
      accent: STAGE_META.offer.accentClass,
    },
    {
      label: "Hired",
      value: stats.byStage.accepted,
      hint: "accepted an offer",
      accent: STAGE_META.accepted.accentClass,
    },
    {
      label: "Avg rating",
      value: stats.averageRating ? stats.averageRating.toFixed(1) : "—",
      hint: stats.rated ? `across ${stats.rated} rated` : "no ratings yet",
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {tiles.map((tile, index) => (
        <div
          key={tile.label}
          className={cn(
            "bg-card ring-foreground/10 flex flex-col gap-0.5 rounded-xl p-3 ring-1",
            // The odd tile out stretches rather than leaving a gap.
            index === tiles.length - 1 && "max-sm:col-span-2",
          )}
        >
          <dt className="text-muted-foreground flex items-center gap-1.5 text-xs">
            {tile.accent && (
              <span
                className={cn("size-1.5 rounded-full", tile.accent)}
                aria-hidden
              />
            )}
            {tile.label}
          </dt>
          <dd className="text-2xl font-semibold tabular-nums">{tile.value}</dd>
          <p className="text-muted-foreground/80 text-xs">{tile.hint}</p>
        </div>
      ))}
    </dl>
  );
}
