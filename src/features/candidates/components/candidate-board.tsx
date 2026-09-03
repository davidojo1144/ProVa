"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import type { Candidate, Stage } from "@/types/candidate";

import { Button } from "@/components/ui/button";
import { CandidateCard } from "@/features/candidates/components/candidate-card";
import { useCandidateActions } from "@/features/candidates/hooks/use-candidate-actions";
import { STAGE_LIST } from "@/features/candidates/lib/stages";
import { cn } from "@/lib/utils";

interface CandidateBoardProps {
  candidates: Candidate[];
  onOpen: (candidate: Candidate) => void;
  onEdit: (candidate: Candidate) => void;
  onDelete: (candidate: Candidate) => void;
  onAdd: (stage: Stage) => void;
}

export function CandidateBoard({
  candidates,
  onOpen,
  onEdit,
  onDelete,
  onAdd,
}: CandidateBoardProps) {
  const actions = useCandidateActions();
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropStage, setDropStage] = useState<Stage | null>(null);

  const handleDrop = (event: React.DragEvent, stage: Stage) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    if (id) actions.moveById(id, stage);
    setDropStage(null);
    setDraggingId(null);
  };

  return (
    <div className="scroll-area-plain -mx-4 snap-x snap-mandatory overflow-x-auto px-4 pb-2 sm:mx-0 sm:snap-none sm:overflow-visible sm:px-0">
      {/* Phones swipe one stage at a time; from tablets up the board fits the width. */}
      <div className="grid min-w-max auto-cols-[85vw] grid-flow-col gap-3 sm:min-w-0 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-3 xl:grid-cols-6">
        {STAGE_LIST.map((stage) => {
          const stageCandidates = candidates.filter(
            (candidate) => candidate.stage === stage.value,
          );
          const isDropTarget = dropStage === stage.value && Boolean(draggingId);

          return (
            <section
              key={stage.value}
              aria-label={stage.label}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
                setDropStage(stage.value);
              }}
              onDragLeave={(event) => {
                // Ignore bubbling from children leaving inside the column.
                if (event.currentTarget.contains(event.relatedTarget as Node)) {
                  return;
                }
                setDropStage((current) =>
                  current === stage.value ? null : current,
                );
              }}
              onDrop={(event) => handleDrop(event, stage.value)}
              className={cn(
                "bg-muted/40 flex min-h-72 snap-start flex-col gap-3 rounded-xl p-2.5 transition-colors",
                isDropTarget && "bg-primary/5 ring-primary/40 ring-2",
              )}
            >
              <header className="flex items-center gap-2 px-1">
                <span
                  className={cn("size-2 rounded-full", stage.accentClass)}
                  aria-hidden
                />
                <h3 className="text-sm font-medium">{stage.label}</h3>
                <span className="text-muted-foreground text-xs tabular-nums">
                  {stageCandidates.length}
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground ml-auto"
                  aria-label={`Add candidate to ${stage.label}`}
                  onClick={() => onAdd(stage.value)}
                >
                  <Plus />
                </Button>
              </header>

              <div className="flex flex-col gap-2">
                {stageCandidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    dragging={draggingId === candidate.id}
                    onOpen={() => onOpen(candidate)}
                    onEdit={() => onEdit(candidate)}
                    onDelete={() => onDelete(candidate)}
                    onDragStart={() => setDraggingId(candidate.id)}
                    onDragEnd={() => {
                      setDraggingId(null);
                      setDropStage(null);
                    }}
                  />
                ))}

                {stageCandidates.length === 0 && (
                  <p className="text-muted-foreground/70 rounded-lg border border-dashed px-3 py-6 text-center text-xs">
                    {stage.hint}
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
