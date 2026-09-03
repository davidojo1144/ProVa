"use client";

import { MessageSquare, Paperclip } from "lucide-react";

import type { Candidate } from "@/types/candidate";

import { Badge } from "@/components/ui/badge";
import { CandidateActionsMenu } from "@/features/candidates/components/candidate-actions-menu";
import { RatingStars } from "@/features/candidates/components/rating-stars";
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
        "group/card bg-card ring-foreground/10 hover:ring-foreground/20 flex cursor-grab flex-col gap-2 rounded-lg p-3 ring-1 transition active:cursor-grabbing",
        dragging && "opacity-40",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={onOpen}
          className="focus-visible:ring-ring/50 flex-1 rounded-sm text-left outline-none focus-visible:ring-3"
        >
          <p className="text-sm leading-tight font-medium">{candidate.name}</p>
          <p className="text-muted-foreground mt-0.5 text-xs">
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
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
          {candidate.tags.length > 3 && (
            <Badge variant="ghost" className="text-muted-foreground">
              +{candidate.tags.length - 3}
            </Badge>
          )}
        </div>
      )}

      <div className="text-muted-foreground flex items-center gap-3 text-xs">
        <span>{formatRelativeTime(candidate.updatedAt)}</span>
        {candidate.notes.length > 0 && (
          <span className="flex items-center gap-1">
            <MessageSquare className="size-3" />
            {candidate.notes.length}
          </span>
        )}
        {candidate.resumeUrl && (
          <span className="flex items-center gap-1">
            <Paperclip className="size-3" />
            CV
          </span>
        )}
      </div>
    </div>
  );
}
