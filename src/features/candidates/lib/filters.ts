import type { Candidate, Stage } from "@/types/candidate";

export type SortKey = "recent" | "name" | "rating";

export interface CandidateFilters {
  query: string;
  /** Empty means every stage. */
  stages: Stage[];
  /** 0 means any rating. */
  minRating: number;
  sort: SortKey;
}

export const DEFAULT_FILTERS: CandidateFilters = {
  query: "",
  stages: [],
  minRating: 0,
  sort: "recent",
};

function matchesQuery(candidate: Candidate, query: string) {
  const haystack = [
    candidate.name,
    candidate.email,
    candidate.role,
    candidate.location,
    candidate.source,
    ...candidate.tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // Every term must appear somewhere, so "react lagos" narrows as expected.
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

const SORTERS: Record<SortKey, (a: Candidate, b: Candidate) => number> = {
  recent: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
  name: (a, b) => a.name.localeCompare(b.name),
  rating: (a, b) => b.rating - a.rating || a.name.localeCompare(b.name),
};

export function filterCandidates(
  candidates: Candidate[],
  filters: CandidateFilters,
) {
  return candidates
    .filter((candidate) => {
      if (filters.stages.length && !filters.stages.includes(candidate.stage)) {
        return false;
      }
      if (candidate.rating < filters.minRating) return false;
      if (filters.query && !matchesQuery(candidate, filters.query)) {
        return false;
      }
      return true;
    })
    .sort(SORTERS[filters.sort]);
}

export function hasActiveFilters(filters: CandidateFilters) {
  return (
    filters.query.trim() !== "" ||
    filters.stages.length > 0 ||
    filters.minRating > 0
  );
}
