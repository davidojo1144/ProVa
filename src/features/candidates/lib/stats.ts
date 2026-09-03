import type { Candidate, Stage } from "@/types/candidate";

import { STAGES } from "@/types/candidate";
import { isActiveStage } from "@/features/candidates/lib/stages";

export interface PipelineStats {
  total: number;
  active: number;
  byStage: Record<Stage, number>;
  averageRating: number;
  rated: number;
}

export function computeStats(candidates: Candidate[]): PipelineStats {
  const byStage = Object.fromEntries(
    STAGES.map((stage) => [stage, 0]),
  ) as Record<Stage, number>;

  let ratingSum = 0;
  let rated = 0;
  let active = 0;

  for (const candidate of candidates) {
    byStage[candidate.stage] += 1;
    if (isActiveStage(candidate.stage)) active += 1;
    if (candidate.rating > 0) {
      ratingSum += candidate.rating;
      rated += 1;
    }
  }

  return {
    total: candidates.length,
    active,
    byStage,
    averageRating: rated ? ratingSum / rated : 0,
    rated,
  };
}
