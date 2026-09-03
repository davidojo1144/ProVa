"use client";

import { MessageSquare, Paperclip } from "lucide-react";

import type { Candidate } from "@/types/candidate";

import { CandidateActionsMenu } from "@/features/candidates/components/candidate-actions-menu";
import { RatingStars } from "@/features/candidates/components/rating-stars";
import { STAGE_META } from "@/features/candidates/lib/stages";
import { formatRelativeTime } from "@/lib/format";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  candidate: Candidate;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  dragging?: boolean;
}

export function CandidateCard({
  candidate,
  onOpen,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
  dragging,
}: CandidateCardProps) {
  const stage = STAGE_META[candidate.stage];

  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", candidate.id);
        event.dataTransfer.effectAllowed = "move";
        haptic("impact");
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      className={cn(
        // A solid edge in the stage colour ties the card to its column.
        "group/card bg-card flex cursor-grab flex-col gap-2 rounded-md border-l-4 p-3 transition-transform duration-200 hover:scale-[1.02] active:cursor-grabbing",
        stage.edgeClass,
        dragging && "scale-95 opacity-40",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={onOpen}
          className="flex-1 rounded-sm text-left outline-none"
        >
          <p className="text-sm leading-tight font-bold tracking-tight">
            {candidate.name}
          </p>
          <p className="text-muted-foreground mt-0.5 text-xs font-medium">
            {candidate.role}
          </p>
        </button>
        <CandidateActionsMenu
          candidate={candidate}
          onEdit={onEdit}
          onDelete={onDelete}
          className="-mt-1 -mr-1 opacity-0 transition-opacity group-hover/card:opacity-100 focus-visible:opacity-100 aria-expanded:opacity-100"
        />
      </div>

      {candidate.rating > 0 && <RatingStars value={candidate.rating} />}

      {candidate.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {candidate.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-muted text-muted-foreground rounded-sm px-1.5 py-0.5 text-[0.7rem] font-medium"
            >
              {tag}
            </span>
          ))}
          {candidate.tags.length > 3 && (
            <span className="text-muted-foreground/70 px-1 py-0.5 text-[0.7rem] font-semibold">
              +{candidate.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="text-muted-foreground flex items-center gap-3 text-[0.7rem] font-medium">
        <span>{formatRelativeTime(candidate.updatedAt)}</span>
        {candidate.notes.length > 0 && (
          <span className="flex items-center gap-1">
            <MessageSquare className="size-3" strokeWidth={2.5} />
            {candidate.notes.length}
          </span>
        )}
        {candidate.resumeUrl && (
          <span className="flex items-center gap-1">
            <Paperclip className="size-3" strokeWidth={2.5} />
            CV
          </span>
        )}
      </div>
    </div>
  );
}
