import type { Candidate } from "@/types/candidate";

import { computeStats } from "@/features/candidates/lib/stats";
import { cn } from "@/lib/utils";

interface Tile {
  label: string;
  value: string | number;
  hint: string;
  /** Solid block colour — the tile is the colour, not a card with an accent. */
  className: string;
}

export function PipelineStats({ candidates }: { candidates: Candidate[] }) {
  const stats = computeStats(candidates);

  const tiles: Tile[] = [
    {
      label: "Candidates",
      value: stats.total,
      hint: "in the tracker",
      className: "bg-brand-ink text-background",
    },
    {
      label: "In pipeline",
      value: stats.active,
      hint: "still in play",
      className: "bg-brand-blue text-white",
    },
    {
      label: "Offers out",
      value: stats.byStage.offer,
      hint: "awaiting a decision",
      className: "bg-brand-amber text-brand-ink",
    },
    {
      label: "Hired",
      value: stats.byStage.accepted,
      hint: "accepted an offer",
      className: "bg-brand-emerald text-white",
    },
    {
      label: "Avg rating",
      value: stats.averageRating ? stats.averageRating.toFixed(1) : "—",
      hint: stats.rated ? `across ${stats.rated} rated` : "no ratings yet",
      className: "bg-muted text-foreground",
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {tiles.map((tile, index) => (
        <div
          key={tile.label}
          className={cn(
            "flex flex-col justify-between gap-3 rounded-lg p-4 transition-transform duration-200 hover:scale-[1.02]",
            tile.className,
            // The odd tile out stretches rather than leaving a gap.
            index === tiles.length - 1 && "max-sm:col-span-2",
          )}
        >
          <dt className="label-caps opacity-80">{tile.label}</dt>
          <div>
            <dd className="text-3xl leading-none font-extrabold tracking-tight tabular-nums">
              {tile.value}
            </dd>
            <p className="mt-1 text-xs opacity-70">{tile.hint}</p>
          </div>
        </div>
      ))}
    </dl>
  );
}
