"use client";

import { SearchX, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

export function NoCandidates({
  onAdd,
  onSeed,
}: {
  onAdd: () => void;
  onSeed: () => void;
}) {
  return (
    <div className="ring-foreground/10 flex flex-col items-center gap-3 rounded-xl px-6 py-16 text-center ring-1">
      <span className="bg-muted text-muted-foreground flex size-11 items-center justify-center rounded-full">
        <Users className="size-5" />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="font-medium">No candidates yet</h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          Add your first applicant, or load a sample pipeline to see how the
          tracker works.
        </p>
      </div>
      <div className="mt-1 flex flex-wrap justify-center gap-2">
        <Button onClick={onAdd}>Add candidate</Button>
        <Button variant="outline" onClick={onSeed}>
          Load sample data
        </Button>
      </div>
    </div>
  );
}

export function NoResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="ring-foreground/10 flex flex-col items-center gap-3 rounded-xl px-6 py-16 text-center ring-1">
      <span className="bg-muted text-muted-foreground flex size-11 items-center justify-center rounded-full">
        <SearchX className="size-5" />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="font-medium">No matches</h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          No candidates match the current search and filters.
        </p>
      </div>
      <Button variant="outline" onClick={onClear}>
        Clear filters
      </Button>
    </div>
  );
}
