"use client";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import type { Candidate, Stage } from "@/types/candidate";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCandidateActions } from "@/features/candidates/hooks/use-candidate-actions";
import { STAGE_LIST } from "@/features/candidates/lib/stages";
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
  const actions = useCandidateActions();

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
        {/* Base UI requires a group label to live inside a menu group. */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Move to stage</DropdownMenuLabel>
          {STAGE_LIST.map((stage) => (
            <DropdownMenuItem
              key={stage.value}
              disabled={stage.value === candidate.stage}
              onClick={() => actions.move(candidate, stage.value as Stage)}
            >
              <span
                className={cn("size-2 rounded-full", stage.accentClass)}
                aria-hidden
              />
              {stage.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
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
