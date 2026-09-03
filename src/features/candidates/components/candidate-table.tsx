"use client";

import type { Candidate } from "@/types/candidate";

import { CandidateActionsMenu } from "@/features/candidates/components/candidate-actions-menu";
import { RatingStars } from "@/features/candidates/components/rating-stars";
import { StageBadge } from "@/features/candidates/components/stage-badge";
import { formatRelativeTime, initials } from "@/lib/format";

interface CandidateTableProps {
  candidates: Candidate[];
  onOpen: (candidate: Candidate) => void;
  onEdit: (candidate: Candidate) => void;
  onDelete: (candidate: Candidate) => void;
}

export function CandidateTable({
  candidates,
  onOpen,
  onEdit,
  onDelete,
}: CandidateTableProps) {
  return (
    <div className="border-border overflow-x-auto rounded-lg border-2">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-muted text-muted-foreground border-border border-b-2 text-left">
            <th scope="col" className="label-caps px-4 py-3">
              Candidate
            </th>
            <th
              scope="col"
              className="label-caps hidden px-4 py-3 md:table-cell"
            >
              Role
            </th>
            <th scope="col" className="label-caps px-4 py-3">
              Stage
            </th>
            <th
              scope="col"
              className="label-caps hidden px-4 py-3 sm:table-cell"
            >
              Rating
            </th>
            <th
              scope="col"
              className="label-caps hidden px-4 py-3 lg:table-cell"
            >
              Updated
            </th>
            <th scope="col" className="px-4 py-2.5">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr
              key={candidate.id}
              className="border-border hover:bg-muted border-b transition-colors last:border-0"
            >
              <td className="px-4 py-2.5">
                <button
                  type="button"
                  onClick={() => onOpen(candidate)}
                  className="flex items-center gap-3 rounded-sm text-left outline-none"
                >
                  <span className="bg-brand-ink text-background flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-bold">
                    {initials(candidate.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-bold tracking-tight">
                      {candidate.name}
                    </span>
                    <span className="text-muted-foreground block truncate text-xs">
                      {candidate.email}
                    </span>
                    {/* Role rides along with the name once its column is hidden. */}
                    <span className="text-muted-foreground block text-xs md:hidden">
                      {candidate.role}
                    </span>
                  </span>
                </button>
              </td>
              <td className="text-muted-foreground hidden px-4 py-2.5 md:table-cell">
                {candidate.role}
              </td>
              <td className="px-4 py-2.5">
                <StageBadge stage={candidate.stage} />
              </td>
              <td className="hidden px-4 py-2.5 sm:table-cell">
                {candidate.rating > 0 ? (
                  <RatingStars value={candidate.rating} />
                ) : (
                  <span className="text-muted-foreground/60 text-xs">
                    Unrated
                  </span>
                )}
              </td>
              <td className="text-muted-foreground hidden px-4 py-2.5 text-xs whitespace-nowrap lg:table-cell">
                {formatRelativeTime(candidate.updatedAt)}
              </td>
              <td className="px-2 py-2.5">
                <CandidateActionsMenu
                  candidate={candidate}
                  onEdit={() => onEdit(candidate)}
                  onDelete={() => onDelete(candidate)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
