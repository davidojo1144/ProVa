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
    <div className="ring-foreground/10 overflow-x-auto rounded-xl ring-1">
      <table className="w-full min-w-max border-collapse text-sm">
        <thead>
          <tr className="text-muted-foreground border-border border-b text-left text-xs">
            <th scope="col" className="px-4 py-2.5 font-medium">
              Candidate
            </th>
            <th scope="col" className="px-4 py-2.5 font-medium">
              Role
            </th>
            <th scope="col" className="px-4 py-2.5 font-medium">
              Stage
            </th>
            <th scope="col" className="px-4 py-2.5 font-medium">
              Rating
            </th>
            <th scope="col" className="px-4 py-2.5 font-medium">
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
              className="border-border hover:bg-muted/40 border-b transition-colors last:border-0"
            >
              <td className="px-4 py-2.5">
                <button
                  type="button"
                  onClick={() => onOpen(candidate)}
                  className="focus-visible:ring-ring/50 flex items-center gap-2.5 rounded-sm text-left outline-none focus-visible:ring-3"
                >
                  <span className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                    {initials(candidate.name)}
                  </span>
                  <span>
                    <span className="block font-medium">{candidate.name}</span>
                    <span className="text-muted-foreground block text-xs">
                      {candidate.email}
                    </span>
                  </span>
                </button>
              </td>
              <td className="text-muted-foreground px-4 py-2.5">
                {candidate.role}
              </td>
              <td className="px-4 py-2.5">
                <StageBadge stage={candidate.stage} />
              </td>
              <td className="px-4 py-2.5">
                {candidate.rating > 0 ? (
                  <RatingStars value={candidate.rating} />
                ) : (
                  <span className="text-muted-foreground/60 text-xs">
                    Unrated
                  </span>
                )}
              </td>
              <td className="text-muted-foreground px-4 py-2.5 text-xs whitespace-nowrap">
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
