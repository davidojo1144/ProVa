"use client";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import type { Candidate, Stage } from "@/types/candidate";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { STAGE_LIST } from "@/features/candidates/lib/stages";
import { useCandidatesStore } from "@/store/candidates-store";
import { cn } from "@/lib/utils";

interface CandidateActionsMenuProps {
  candidate: Candidate;
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

/** Keyboard-accessible counterpart to dragging a card between columns. */
export function CandidateActionsMenu({
  candidate,
  onEdit,
  onDelete,
  className,
}: CandidateActionsMenuProps) {
  const moveCandidate = useCandidatesStore((state) => state.moveCandidate);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className={cn("text-muted-foreground", className)}
            aria-label={`Actions for ${candidate.name}`}
          />
        }
      >
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Move to stage</DropdownMenuLabel>
        {STAGE_LIST.map((stage) => (
          <DropdownMenuItem
            key={stage.value}
            disabled={stage.value === candidate.stage}
            onClick={() => moveCandidate(candidate.id, stage.value as Stage)}
          >
            <span
              className={cn("size-2 rounded-full", stage.accentClass)}
              aria-hidden
            />
            {stage.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onEdit}>
          <Pencil />
          Edit details
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={onDelete}>
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
